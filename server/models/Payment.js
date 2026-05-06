import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
  {
    razorpayOrderId: String,
    razorpayPaymentId: {
      type: String,
      unique: true,
    },
    razorpaySignature: String,
    amountInPaise: Number,
    amount: Number,
    currency: {
      type: String,
      default: "INR",
    },
    name: {
      type: String,
      default: "Anonymous",
    },
    message: {
      type: String,
      default: "",
    },
    postVerificationMessage: {
      type: String,
      default: "",
    },
    postVerificationData: {
      type: Object,
      default: {},
    },
    verifiedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

const Payment = mongoose.model("Payment", paymentSchema);

export default Payment;
