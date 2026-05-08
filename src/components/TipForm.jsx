import { useMemo, useRef, useState } from "react";
import { CREATOR_NAME, DEFAULT_FORM_STATE, MAX_CHARS } from "../constants";
import { openRazorpayCheckout } from "../utils/razorpay";

function TipForm() {
  const [amount, setAmount] = useState(DEFAULT_FORM_STATE.amount);
  const [name, setName] = useState(DEFAULT_FORM_STATE.name);
  const [currency, setCurrency] = useState(DEFAULT_FORM_STATE.currency);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(DEFAULT_FORM_STATE.message);
  const [hasAcknowledged, setHasAcknowledged] = useState(false);
  const [isOpeningPayment, setIsOpeningPayment] = useState(false);
  const nameInputRef = useRef(null);

  const charsLeft = useMemo(() => MAX_CHARS - message.length, [message]);

  const handleAmountKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      nameInputRef.current?.focus();
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const parsedAmount = Number(amount);
    const finalName = (name || "").trim() || "Anonymous";
    const finalCurrency = (currency || "INR").trim();
    const finalMessage = (message || "").trim();
    const finalEmail = (email || "").trim();

    if (!parsedAmount || Number.isNaN(parsedAmount) || parsedAmount <= 0) {
      alert("Please enter a valid amount (greater than 0).");
      return;
    }

    if (!hasAcknowledged) {
      alert("Please acknowledge the Terms & Refund Policy to proceed.");
      return;
    }

    setIsOpeningPayment(true);
    try {
      await openRazorpayCheckout({
        amount: parsedAmount,
        name: finalName,
        currency: finalCurrency,
        email: finalEmail || undefined,
        message: finalMessage,
        onSuccess: () => setMessage(""),
        onFailure: () => {},
      });
    } catch (error) {
      alert(error.message || "Could not initiate payment.");
    } finally {
      setIsOpeningPayment(false);
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <label className="field-label" htmlFor="amount">
        Amount:
      </label>
      <div className="amount-row">
        <input
          id="amount"
          type="number"
          min="1"
          step="1"
          className="input amount-input"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          onKeyDown={handleAmountKeyDown}
        />
        <select
          id="currency"
          className="input currency-select"
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
        >
          <option>INR</option>
          
        </select>
      </div>

      <label className="field-label" htmlFor="email">
        Email for Payment Receipts:
      </label>
      <input
        id="email"
        className="input"
        type="email"
        placeholder="Your Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <label className="field-label" htmlFor="name">
        Name:
      </label>
      <input
        id="name"
        className="input"
        type="text"
        placeholder="Your Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        ref={nameInputRef}
      />

      <label className="field-label" htmlFor="message">
        Message:
      </label>
      <textarea
        id="message"
        className="input textarea"
        placeholder={`Message for ${CREATOR_NAME}`}
        maxLength={MAX_CHARS}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <div className="charrow">{charsLeft} characters left</div>

      <label className="legal-ack" htmlFor="acknowledge">
        <input
          id="acknowledge"
          type="checkbox"
          className="legal-ack-checkbox"
          checked={hasAcknowledged}
          onChange={(e) => setHasAcknowledged(e.target.checked)}
          required
        />
        <span className="legal-ack-text">
          I acknowledge this is a non-refundable transaction, fully rendered once displayed to{" "}
          {CREATOR_NAME}. I also agree to the{" "}
          <a className="legal-link" href="/terms-and-conditions">
            Terms
          </a>{" "}
          &{" "}
          <a className="legal-link" href="/refund-policy">
            Refund Policy
          </a>
          .
        </span>
      </label>

      <button id="send" className="btn" disabled={isOpeningPayment || !hasAcknowledged}>
        {isOpeningPayment ? "Opening payment..." : "Send HyprTip"}
      </button>
    </form>
  );
}

export default TipForm;
