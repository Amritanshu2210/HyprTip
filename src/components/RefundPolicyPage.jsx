import Header from "./Header";
import Footer from "./Footer";
function RefundPolicyPage() {
  return (
    <div className="home-page">
      <Header />
      <main className="container legal-container">
        <section className="card legal-card">
          <h1 className="legal-title">
            HyprTip Refund & Cancellation Policy
          </h1>
          <div className="legal-strong">
            ALL TRANSACTIONS ARE FINAL
          </div>
          <p className="legal-p">
            Thank you for using HyprTip. By using our platform to send
            tips, donations, or creator support payments, you acknowledge
            and agree to the terms outlined in this Refund & Cancellation
            Policy.
          </p>
          <h2 className="legal-section-title">
            1. NO REFUNDS
          </h2>
          <p className="legal-p">
            HyprTip is a digital platform that facilitates instant creator
            support transactions and stream alert processing.
          </p>
          <p className="legal-p">
            All completed transactions processed through HyprTip are final
            and non-refundable.
          </p>
          <ul className="legal-ul">
            <li>
              Funds are transferred directly to the creator’s connected
              payment account.
            </li>
            <li>
              Once processed, transactions cannot be cancelled, reversed,
              or refunded by HyprTip.
            </li>
          </ul>
          <h2 className="legal-section-title">
            2. DIGITAL SERVICE DELIVERY
          </h2>
          <p className="legal-p">
            HyprTip provides a real-time digital support and stream alert
            service.
          </p>
          <ul className="legal-ul">
            <li>
              The service is considered delivered immediately after
              successful transaction processing.
            </li>
            <li>
              Delivery may include stream alerts, creator dashboard
              notifications, payment confirmation, or message transmission.
            </li>
            <li>
              Since the service is consumed instantly, refunds are not
              possible after successful processing.
            </li>
          </ul>
          <h2 className="legal-section-title">
            3. CHARGEBACK & PAYMENT DISPUTE POLICY
          </h2>
          <p className="legal-p">
            Users agree not to initiate fraudulent chargebacks or payment
            disputes for successfully processed transactions.
          </p>
          <ul className="legal-ul">
            <li>
              Fraudulent disputes may result in permanent account
              suspension.
            </li>
            <li>
              HyprTip reserves the right to cooperate with payment
              processors, banks, fraud prevention services, and law
              enforcement agencies.
            </li>
            <li>
              Abuse of the dispute system may result in financial recovery
              actions where permitted by law.
            </li>
          </ul>
          <h2 className="legal-section-title">
            4. BLOCKED CONTENT & POLICY VIOLATIONS
          </h2>
          <p className="legal-p">
            If messages, usernames, or content are blocked due to spam,
            abuse, hate speech, prohibited content, or policy violations,
            users are not eligible for refunds.
          </p>
          <p className="legal-p">
            Technical processing costs and moderation systems are still
            utilized even if content is restricted or removed.
          </p>
          <h2 className="legal-section-title">
            5. ACCIDENTAL PAYMENTS
          </h2>
          <p className="legal-p">
            Users are responsible for reviewing payment details carefully
            before confirming transactions.
          </p>
          <p className="legal-p">
            HyprTip cannot guarantee refunds for accidental payments,
            incorrect amounts, or typing mistakes.
          </p>
          <h2 className="legal-section-title">
            6. CREATOR RESPONSIBILITY
          </h2>
          <p className="legal-p">
            HyprTip acts as a platform intermediary and does not directly
            control creator decisions, content, or external agreements.
          </p>
          <p className="legal-p">
            Refund requests related to creator conduct or external promises
            must be resolved directly with the creator.
          </p>
          <h2 className="legal-section-title">
            7. TECHNICAL ERRORS
          </h2>
          <p className="legal-p">
            If you experience duplicate charges or technical payment
            failures caused by system errors, please contact us
            immediately with transaction details.
          </p>
          <p className="legal-p">
            Verified duplicate charges caused by technical failures may be
            reviewed on a case-by-case basis.
          </p>
          <h2 className="legal-section-title">
            CONTACT US
          </h2>
          <p className="legal-p">
            For refund-related support or technical payment issues, contact:
          </p>
          <a
            className="legal-link"
            href="mailto:amritanshu2k24@gmail.com"
          >
            amritanshu2k24@gmail.com
          </a>
        </section>
      </main>
      <Footer />
    </div>
  );
}
export default RefundPolicyPage;