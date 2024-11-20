// src/app/privacy-policy/page.tsx
'use client';
import React from 'react';

const PrivacyPolicyPage = () => {
  return (
    <div className="privacy-policy-container px-6 py-12">
      <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>
      <p className="text-gray-700 mb-4">Last Modified: November 19, 2024</p>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">1. Introduction</h2>
        <p>
          This is the Privacy Policy of [Your Company Name] (“we”, “us”, or “our”). We operate the [Your Platform/Service Name], including web extensions, dashboard applications, and mobile applications (collectively, the “Services”). This Privacy Policy explains how we collect, use, and disclose personal information and your rights regarding your data.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">2. Consent from users outside the EEA, UK, Switzerland, and [Your Jurisdiction]</h2>
        <p>
          By accessing or using our Services, you agree to this Privacy Policy. If you are based in the EEA, UK, Switzerland, or [Other Jurisdictions], additional provisions may apply (see below).
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">3. What is personal information?</h2>
        <p>
          Personal information is any information relating to an identified or identifiable individual, such as an email address, username, or IP address.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">4. Information that we collect</h2>
        <p>
          We may collect personal information including, but not limited to:
        </p>
        <ul className="list-disc pl-6">
          <li>Account Information: email, username, password, wallet address.</li>
          <li>Technical Information: IP address, device identifiers.</li>
          <li>Information provided when you contact us: additional details you choose to provide.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">5. Use of your personal information</h2>
        <p>
          We use your personal information to:
        </p>
        <ul className="list-disc pl-6">
          <li>Manage and provide Services.</li>
          <li>Analyze usage and improve functionality.</li>
          <li>Communicate updates and promotional content (with consent).</li>
          <li>Ensure security and prevent fraud.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">6. Promotional and transactional communications</h2>
        <p>
          You may opt-out of promotional communications at any time. However, transactional communications related to your account and activity are mandatory.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">7. Disclosure and transfers of personal information</h2>
        <p>
          We may disclose personal information to service providers, legal entities, or during business transactions. Your data may be transferred internationally, subject to applicable laws.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">8. Aggregated data</h2>
        <p>
          Non-personal, aggregated data may be shared for analysis or marketing purposes.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">9. Retention of personal information</h2>
        <p>
          We retain personal information for as long as necessary for the purposes described in this policy or as required by law.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">10. Security and protection of personal information</h2>
        <p>
          We use industry-standard measures to safeguard your personal information. However, no method of transmission or storage is 100% secure.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">11. Your rights related to your personal information</h2>
        <p>
          Depending on your jurisdiction, you may have rights such as accessing, correcting, or deleting your personal data. Contact us to exercise your rights.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">12. Consent; withdrawal of consent</h2>
        <p>
          You can withdraw consent to data processing by contacting us. Note that this may affect the availability of our Services.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">13. Links to third-party resources</h2>
        <p>
          Our Services may contain links to external sites. We are not responsible for their privacy practices and encourage you to review their policies.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">14. Cookies</h2>
        <p>
          Please refer to our Cookie Policy for more information on the cookies and tracking technologies we use.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">15. Changes to this Privacy Policy</h2>
        <p>
          We may update this Privacy Policy from time to time. Changes will be posted on this page, and significant updates may be communicated to you directly.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-2">16. Contact information</h2>
        <p>
          If you have any questions about this Privacy Policy, please contact us at privacy@[yourdomain].com.
        </p>
      </section>
    </div>
  );
};

export default PrivacyPolicyPage;
