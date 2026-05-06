import cors from "cors";
import crypto from "crypto";
import dotenv from "dotenv";
import express from "express";
import jwt from "jsonwebtoken";
import Razorpay from "razorpay";

import connectDB from "./config/db.js";
import Payment from "./models/Payment.js";

dotenv.config();

connectDB();

const app = express();
const PORT = process.env.PORT || 5000;
const pendingOrders = new Map();

const RAZORPAY_KEY_ID = process.env.RAZORPAY_KEY_ID;
const RAZORPAY_KEY_SECRET = process.env.RAZORPAY_KEY_SECRET;
const ADMIN_USERNAME = process.env.ADMIN_USERNAME || "admin";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin123";
const ADMIN_JWT_SECRET = process.env.ADMIN_JWT_SECRET || "change-this-secret";

if (!RAZORPAY_KEY_ID || !RAZORPAY_KEY_SECRET) {
  console.error("Missing Razorpay env vars");
  process.exit(1);
}

const razorpay = new Razorpay({
  key_id: RAZORPAY_KEY_ID,
  key_secret: RAZORPAY_KEY_SECRET,
});

app.use(cors());
app.use(express.json());

function signAdminToken() {
  return jwt.sign(
    { role: "admin", username: ADMIN_USERNAME },
    ADMIN_JWT_SECRET,
    { expiresIn: "12h" }
  );
}

function requireAdmin(req, res, next) {
  const authHeader = req.headers.authorization || "";
  const token = authHeader.startsWith("Bearer ")
    ? authHeader.slice(7)
    : "";

  if (!token) {
    return res.status(401).json({ error: "Missing admin token" });
  }

  try {
    req.admin = jwt.verify(token, ADMIN_JWT_SECRET);
    return next();
  } catch (_error) {
    return res.status(401).json({
      error: "Invalid or expired admin token",
    });
  }
}

app.get("/api/health", (_req, res) => {
  res.json({ ok: true });
});

app.post("/api/admin/login", (req, res) => {
  const username = String(req.body?.username || "");
  const password = String(req.body?.password || "");

  if (
    username !== ADMIN_USERNAME ||
    password !== ADMIN_PASSWORD
  ) {
    return res.status(401).json({
      error: "Invalid username or password",
    });
  }

  return res.json({ token: signAdminToken() });
});

app.get(
  "/api/admin/payments",
  requireAdmin,
  async (_req, res) => {
    try {
      const paymentDocs = await Payment.find().sort({
        createdAt: -1,
      });

      const payments = paymentDocs.map((paymentDoc) => {
        const payment = paymentDoc.toObject();
        const { amountInPaise: _amountInPaise, ...paymentWithoutPaise } =
          payment;
        const amount =
          Number(paymentWithoutPaise.amount || 0) > 0
            ? Number(paymentWithoutPaise.amount || 0)
            : Number((Number(payment.amountInPaise || 0) / 100).toFixed(2));

        return {
          ...paymentWithoutPaise,
          amount,
        };
      });

      const totalAmount = payments.reduce(
        (sum, payment) => sum + Number(payment.amount || 0),
        0
      );

      return res.json({
        totals: {
          paymentCount: payments.length,
          totalAmount: Number(totalAmount.toFixed(2)),
          currency: "INR",
        },
        payments,
      });
    } catch (error) {
      console.error(
        "Admin payments fetch error:",
        error
      );

      return res
        .status(500)
        .json({ error: "Could not fetch payments" });
    }
  }
);

app.post("/api/payment/orders", async (req, res) => {
  try {
    const amount = Number(req.body?.amount);
    const currency = (
      req.body?.currency || "INR"
    ).toUpperCase();

    const name = String(
      req.body?.name || "Anonymous"
    );

    const message = String(req.body?.message || "");

    if (!amount || Number.isNaN(amount) || amount <= 0) {
      return res
        .status(400)
        .json({ error: "Invalid amount" });
    }

    const options = {
      amount: Math.round(amount * 100),
      currency,
      receipt: `rcpt_${Date.now()}`,
      notes: {
        name,
        message,
      },
    };

    const order = await razorpay.orders.create(
      options
    );

    pendingOrders.set(order.id, {
      amountInPaise: order.amount,
      amount,
      currency,
      name,
      message,
      createdAt: new Date().toISOString(),
    });

    return res.json({
      key: RAZORPAY_KEY_ID,
      order,
    });
  } catch (error) {
    console.error("Create order error:", error);

    return res.status(500).json({
      error: "Could not create Razorpay order",
    });
  }
});

app.post("/api/payment/verify", async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      verificationMessage,
      verificationData,
    } = req.body || {};

    if (
      !razorpay_order_id ||
      !razorpay_payment_id ||
      !razorpay_signature
    ) {
      return res.status(400).json({
        verified: false,
        error: "Missing payment fields",
      });
    }

    const body = `${razorpay_order_id}|${razorpay_payment_id}`;

    const expectedSignature = crypto
      .createHmac("sha256", RAZORPAY_KEY_SECRET)
      .update(body)
      .digest("hex");

    const verified =
      expectedSignature === razorpay_signature;

    if (!verified) {
      return res.status(400).json({
        verified: false,
        error: "Invalid signature",
      });
    }

    const alreadySaved = await Payment.findOne({
      razorpayPaymentId: razorpay_payment_id,
    });

    if (!alreadySaved) {
      const pendingOrder =
        pendingOrders.get(razorpay_order_id) || {};

      await Payment.create({
        razorpayOrderId: razorpay_order_id,
        razorpayPaymentId: razorpay_payment_id,
        razorpaySignature: razorpay_signature,
        amountInPaise: Number(
          pendingOrder.amountInPaise || 0
        ),
        amount: Number(pendingOrder.amount || 0),
        currency: pendingOrder.currency || "INR",
        name: pendingOrder.name || "Anonymous",
        message: pendingOrder.message || "",
        postVerificationMessage:
          typeof verificationMessage === "string"
            ? verificationMessage
            : pendingOrder.message || "",
        postVerificationData:
          verificationData &&
          typeof verificationData === "object"
            ? verificationData
            : {},
        verifiedAt: new Date().toISOString(),
      });
    }

    pendingOrders.delete(razorpay_order_id);

    return res.json({ verified: true });
  } catch (error) {
    console.error("Verify payment error:", error);

    return res.status(500).json({
      verified: false,
      error: "Verification failed",
    });
  }
});

app.listen(PORT, () => {
  console.log(
    `Server listening on http://localhost:${PORT}`
  );
});
