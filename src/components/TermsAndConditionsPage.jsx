import Header from "./Header";
import Footer from "./Footer";

function TermsAndConditionsPage() {
  return (
    <div className="home-page">
      <Header />

      <main className="container legal-container">
        <section className="card legal-card">
          <h1 className="legal-title">HyprTip Terms & Conditions</h1>

          <h2 className="legal-section-title legal-section-title--tight">
            OVERVIEW
          </h2>

          <p className="legal-p">
            This website is operated by HyprTip. Throughout the site, the
            terms "we", "us", and "our" refer to HyprTip. HyprTip provides
            digital tipping infrastructure, creator monetization tools,
            payment integrations, and stream support services for creators
            and supporters.
          </p>

          <p className="legal-p">
            By accessing or using HyprTip, you agree to be bound by these
            Terms & Conditions, including all policies referenced herein.
            These Terms apply to creators, supporters, visitors, merchants,
            and all users of the platform.
          </p>

          <p className="legal-p">
            If you do not agree with these Terms, you may not use the
            platform or its services.
          </p>

          <h2 className="legal-section-title">
            SECTION 1 - ACCOUNT REGISTRATION & CREATOR OBLIGATIONS
          </h2>

          <p className="legal-p">
            By using HyprTip, you confirm that you are legally eligible to
            use digital payment services in your jurisdiction.
          </p>

          <ul className="legal-ul">
            <li>
              <b>Account Accuracy:</b> Users must provide accurate,
              complete, and updated information during registration.
            </li>

            <li>
              <b>KYC Compliance:</b> Creators are responsible for
              completing all KYC requirements required by payment
              providers.
            </li>

            <li>
              <b>Identity Verification:</b> HyprTip may request additional
              verification documents to comply with fraud prevention,
              AML, or payment partner policies.
            </li>

            <li>
              <b>Tax Responsibility:</b> Creators are solely responsible
              for taxes applicable to earnings received through HyprTip.
            </li>
          </ul>

          <h2 className="legal-section-title">
            SECTION 2 - GENERAL CONDITIONS
          </h2>

          <p className="legal-p">
            We reserve the right to refuse service, suspend accounts, or
            restrict platform access at any time.
          </p>

          <p className="legal-p">
            Users may not reproduce, copy, resell, exploit, or misuse any
            part of the HyprTip platform without written permission.
          </p>

          <h2 className="legal-section-title">
            SECTION 3 - PAYMENTS & PLATFORM FEES
          </h2>

          <ul className="legal-ul">
            <li>
              <b>Payment Authorization:</b> By connecting payment
              gateways, creators authorize HyprTip to facilitate payment
              processing.
            </li>

            <li>
              <b>Platform Fees:</b> Platform fees may apply to completed
              transactions.
            </li>

            <li>
              <b>Third-Party Providers:</b> Payment processing is handled
              through third-party payment providers.
            </li>
          </ul>

          <h2 className="legal-section-title">
            SECTION 4 - PROHIBITED CONTENT POLICY
          </h2>

          <p className="legal-p">
            Users may not use HyprTip for activities involving:
          </p>

          <ul className="legal-ul">
            <li>Gambling or betting services</li>
            <li>Adult or sexual content</li>
            <li>Hate speech or harassment</li>
            <li>Illegal goods or services</li>
            <li>Fraudulent fundraising</li>
            <li>Copyright infringement</li>
          </ul>

          <h2 className="legal-section-title">
            SECTION 5 - REFUNDS & CHARGEBACKS
          </h2>

          <ul className="legal-ul">
            <li>
              <b>Final Transactions:</b> All tips and creator support
              payments are generally final and non-refundable.
            </li>

            <li>
              <b>Chargebacks:</b> Unauthorized payment disputes or
              fraudulent chargebacks may result in account suspension.
            </li>

            <li>
              <b>Fraud Investigation:</b> HyprTip reserves the right to
              investigate suspicious transactions.
            </li>
          </ul>

          <h2 className="legal-section-title">
            SECTION 6 - FRAUD PREVENTION
          </h2>

          <p className="legal-p">
            HyprTip may delay, reverse, hold, or suspend payouts if
            suspicious activity, payment abuse, spam donations, fake
            transactions, or fraud attempts are detected.
          </p>

          <h2 className="legal-section-title">
            SECTION 7 - ACCOUNT SECURITY
          </h2>

          <p className="legal-p">
            Users are responsible for maintaining the confidentiality of
            their login credentials and account activity.
          </p>

          <p className="legal-p">
            HyprTip is not liable for losses caused by weak passwords,
            phishing, credential sharing, or unauthorized access.
          </p>

          <h2 className="legal-section-title">
            SECTION 8 - THIRD-PARTY SERVICES
          </h2>

          <p className="legal-p">
            HyprTip may integrate with third-party services such as
            payment gateways, streaming tools, and creator platforms.
            We are not responsible for downtime or failures caused by
            third-party providers.
          </p>

          <h2 className="legal-section-title">
            SECTION 9 - LIMITATION OF LIABILITY
          </h2>

          <p className="legal-p">
            HyprTip is provided on an "as is" and "as available" basis.
            We do not guarantee uninterrupted or error-free service.
          </p>

          <p className="legal-p">
            In no event shall HyprTip or its affiliates be liable for any
            indirect, incidental, consequential, or special damages,
            including loss of revenue, data, profits, or business.
          </p>

          <h2 className="legal-section-title">
            SECTION 10 - TERMINATION
          </h2>

          <p className="legal-p">
            We reserve the right to suspend or permanently terminate
            accounts that violate these Terms or pose risks to the
            platform.
          </p>

          <h2 className="legal-section-title">
            SECTION 11 - GOVERNING LAW
          </h2>

          <p className="legal-p">
            These Terms shall be governed by the laws of India.
          </p>

          <h2 className="legal-section-title">
            SECTION 12 - CHANGES TO TERMS
          </h2>

          <p className="legal-p">
            HyprTip may modify or update these Terms at any time without
            prior notice. Continued use of the platform constitutes
            acceptance of the updated Terms.
          </p>

          <h2 className="legal-section-title">
            SECTION 13 - CONTACT INFORMATION
          </h2>

          <p className="legal-p">
            Questions regarding these Terms & Conditions may be sent to:
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

export default TermsAndConditionsPage;
