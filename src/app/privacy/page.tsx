import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  robots: { index: false, follow: false },
};

export default function PrivacyPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-10 sm:py-16">
      <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mb-8">
        Privacy Policy
      </h1>

      <div className="space-y-8 text-sm leading-relaxed text-muted">
        <p>Last updated: April 2026</p>

        <section>
          <h2 className="text-base font-semibold text-text dark:text-text-dark mb-2">
            Data Collection
          </h2>
          <p>
            CalibratedIQ does not collect, store, or transmit personal data
            to its servers. Test questions, your answers, and resulting
            scores are generated and computed entirely in your browser. Test
            parameters are encoded in URL query strings (which exist only in
            your browser history and any links you choose to share) and
            additionally persisted to your browser&apos;s localStorage so
            that your composite score can be reconstructed across sessions.
            Clearing site data, or using the &quot;Clear saved results&quot;
            action on the composite page, removes the localStorage records
            from your device.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-text dark:text-text-dark mb-2">
            Result Signing
          </h2>
          <p>
            When you complete a test, your browser requests a cryptographic
            signature over the seed, answers, test type, and completion
            timestamp from our signing endpoint. The signature is appended to
            your share link so that tampering with the URL produces an
            invalid result on the shared page. The signing request does not
            include any personal identifiers, and no results are retained
            server-side.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-text dark:text-text-dark mb-2">
            Cookies
          </h2>
          <p>
            We use a single first-party cookie (cookie_consent) to remember
            your cookie preference. It contains no personal information and
            expires after 365 days. If you accept cookies, third-party
            advertising cookies may also be set (see below).
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-text dark:text-text-dark mb-2">
            Third-Party Advertising
          </h2>
          <p>
            This site displays advertisements served by Monetag and its
            advertising partners. When you accept cookies, these third
            parties may use cookies, web beacons, and similar technologies to
            collect information about your browsing activity across websites
            for the purpose of delivering targeted advertising. For details
            of Monetag&apos;s data practices, refer to their privacy policy.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-text dark:text-text-dark mb-2">
            Analytics
          </h2>
          <p>
            We use privacy-respecting analytics to understand aggregate usage
            patterns such as page views and test completion rates. No
            personally identifiable information is collected through
            analytics.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-text dark:text-text-dark mb-2">
            GDPR Compliance
          </h2>
          <p>
            If you are located in the European Union or European Economic
            Area, you have the right to decline non-essential cookies. Use
            the consent banner that appears on your first visit to accept or
            decline. If you decline, no third-party advertising cookies will
            be set. Because we do not retain personal data server-side,
            there is no account or profile to request, modify, or delete.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-text dark:text-text-dark mb-2">
            Children&apos;s Privacy
          </h2>
          <p>
            CalibratedIQ is not directed at children under the age of 13, and
            we do not knowingly collect personal information from children.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-text dark:text-text-dark mb-2">
            Changes to This Policy
          </h2>
          <p>
            We may update this privacy policy from time to time. Any changes
            will appear on this page with a revised &quot;Last updated&quot;
            date.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-text dark:text-text-dark mb-2">
            Contact
          </h2>
          <p>
            For questions about this privacy policy, contact{' '}
            <a
              href="mailto:privacy@calibratediq.org"
              className="underline hover:text-text dark:hover:text-text-dark transition-colors"
            >
              privacy@calibratediq.org
            </a>
            .
          </p>
        </section>
      </div>
    </div>
  );
}
