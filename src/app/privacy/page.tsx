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
        <p>Last updated: March 2026</p>

        <section>
          <h2 className="text-base font-semibold text-text dark:text-text-dark mb-2">
            Data collection
          </h2>
          <p>
            CalibratedIQ does not collect, store, or transmit any personal
            data to our servers. All test data, including your answers and
            results, is processed entirely in your browser. Your test seed,
            answers, and score are encoded in the URL parameters, which
            means they exist only in your browser history and any links you
            choose to share.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-text dark:text-text-dark mb-2">
            Cookies
          </h2>
          <p>
            We use a single first-party cookie (cookie_consent) to remember
            your cookie preference. This cookie contains no personal
            information and expires after 365 days. If you accept cookies,
            third-party advertising cookies may also be set (see below).
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-text dark:text-text-dark mb-2">
            Third-party advertising
          </h2>
          <p>
            This site displays advertisements served by Monetag and its
            advertising partners. When you accept cookies, these third
            parties may use cookies, web beacons, and similar technologies
            to collect information about your browsing activity across
            websites. This information is used to provide targeted
            advertising. For more information about Monetag&apos;s data
            practices, please refer to their privacy policy.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-text dark:text-text-dark mb-2">
            Analytics
          </h2>
          <p>
            We may use privacy-respecting analytics to understand aggregate
            usage patterns (such as page views and test completion rates).
            No personally identifiable information is collected through
            analytics.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-text dark:text-text-dark mb-2">
            GDPR compliance
          </h2>
          <p>
            If you are located in the European Union or European Economic
            Area, you have the right to decline non-essential cookies. Use
            the cookie consent banner that appears on your first visit to
            accept or decline cookies. If you decline, no third-party
            advertising cookies will be set. Since we do not store personal
            data server-side, there is no personal data to request, modify,
            or delete.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-text dark:text-text-dark mb-2">
            Children&apos;s privacy
          </h2>
          <p>
            This site is not directed at children under the age of 13. We
            do not knowingly collect any personal information from children.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-text dark:text-text-dark mb-2">
            Changes to this policy
          </h2>
          <p>
            We may update this privacy policy from time to time. Any
            changes will be reflected on this page with an updated
            revision date.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-text dark:text-text-dark mb-2">
            Contact
          </h2>
          <p>
            For questions about this privacy policy, contact us at
            privacy@calibratediq.org.
          </p>
        </section>
      </div>
    </div>
  );
}
