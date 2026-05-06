const API_URL = import.meta.env.VITE_API_URL;

async function readJsonSafely(response) {
  const text = await response.text();
  if (!text) {
    return {};
  }

  try {
    return JSON.parse(text);
  } catch (_error) {
    throw new Error("Server returned an invalid response. Check backend server.");
  }
}

async function createOrder({ amount, currency, name, message }) {
  const response = await fetch(`${API_URL}/api/payment/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      amount,
      currency,
      name,
      message,
    }),
  });

  const data = await readJsonSafely(response);
  if (!response.ok) {
    throw new Error(data.error || "Failed to create order");
  }

  return data;
}

async function verifyPayment(payload) {
  const response = await fetch(`${API_URL}/api/payment/verify`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const data = await readJsonSafely(response);
  if (!response.ok || !data.verified) {
    throw new Error(data.error || "Payment verification failed");
  }
}

export async function openRazorpayCheckout({ amount, name, currency, message, onSuccess, onFailure }) {
  if (!window.Razorpay) {
    alert("Razorpay SDK is not loaded. Please refresh and try again.");
    return false;
  }

  const { key, order } = await createOrder({
    amount,
    currency,
    name,
    message,
  });

  const options = {
    key,
    order_id: order.id,
    amount: order.amount,
    currency,
    name: "HyprTip - Amritanshu",
    description: message || "Supertip",
    async handler(response) {
      try {
        await verifyPayment({
          ...response,
          verificationMessage: message,
          verificationData: {
            displayName: name,
            displayAmount: amount,
            displayCurrency: currency,
            verifiedOnClientAt: new Date().toISOString(),
          },
        });
        alert(`✅ Payment Successful! Thank you ${name} for your support ❤️`);
        onSuccess?.();
      } catch (error) {
        alert(error.message || "Payment verification failed.");
        onFailure?.(error);
      }
    },
    modal: {
      escape: true,
      backdropclose: false,
    },
    prefill: {
      name,
    },
    theme: {
      color: "#F37254",
    },
  };

  try {
    const rzp = new window.Razorpay(options);
    rzp.on("payment.failed", (response) => {
      const err = response.error || {};
      const description = err.description || JSON.stringify(err);
      alert("Payment Failed: " + description);
      onFailure?.(err);
    });
    rzp.open();
    return true;
  } catch (error) {
    console.error("Razorpay open error", error);
    alert("Could not open Razorpay Checkout. Check console for details.");
    onFailure?.(error);
    return false;
  }
}
