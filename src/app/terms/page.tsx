import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Use',
  robots: { index: false, follow: false },
};

export default function TermsPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-10 sm:py-16">
      <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mb-8">
        Terms of Use
      </h1>

      <div className="space-y-8 text-sm leading-relaxed text-muted">
        <p>Last updated: March 2026</p>

        <section>
          <h2 className="text-base font-semibold text-text dark:text-text-dark mb-2">
            Disclaimer
          </h2>
          <p>
            CalibratedIQ is provided for entertainment and educational
            purposes only. It is not a clinical diagnostic tool. The
            results of this test should not be interpreted as a definitive
            measure of your intelligence or cognitive ability. Do not use
            results from this test for medical, educational, employment, or
            legal decisions.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-text dark:text-text-dark mb-2">
            No warranties
          </h2>
          <p>
            This test is provided &quot;as is&quot; without warranties of
            any kind, either express or implied. We make no representations
            or warranties regarding the accuracy, reliability, or
            completeness of the test results. Individual scores may vary
            based on testing conditions, familiarity with the test format,
            and other factors outside our control.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-text dark:text-text-dark mb-2">
            No affiliation
          </h2>
          <p>
            CalibratedIQ is not affiliated with, endorsed by, or associated
            with Mensa International, the Raven family, Pearson
            Assessments, or any other psychological testing body. References
            to Mensa qualification thresholds are provided for informational
            context only. For official Mensa testing, visit{' '}
            <a
              href="https://www.mensa.org"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-text dark:hover:text-text-dark transition-colors"
            >
              mensa.org
            </a>
            .
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-text dark:text-text-dark mb-2">
            Intellectual property
          </h2>
          <p>
            The progressive matrices methodology is a well-established
            psychometric technique that has been in the public domain for
            decades. The specific puzzle generation algorithms, visual
            design, and website content of CalibratedIQ are original works.
            You may share your results freely, but you may not reproduce,
            distribute, or create derivative works from the test content
            without permission.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-text dark:text-text-dark mb-2">
            Limitation of liability
          </h2>
          <p>
            To the fullest extent permitted by applicable law, CalibratedIQ
            and its operators shall not be liable for any indirect,
            incidental, special, consequential, or punitive damages, or any
            loss of profits or revenues, whether incurred directly or
            indirectly, or any loss of data, use, goodwill, or other
            intangible losses, resulting from (a) your use of or inability
            to use the test; (b) any interpretation or reliance on test
            results; or (c) any unauthorized access to or alteration of
            your data.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-text dark:text-text-dark mb-2">
            Acceptable use
          </h2>
          <p>
            You agree to use this test for personal, non-commercial
            purposes only. You may not attempt to reverse-engineer the
            puzzle generation algorithm for the purpose of artificially
            inflating scores. You may not use automated tools or scripts to
            take the test. You may not misrepresent your test results as
            official clinical or psychometric assessments.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-text dark:text-text-dark mb-2">
            Changes to these terms
          </h2>
          <p>
            We reserve the right to modify these terms at any time.
            Continued use of the site after changes constitutes acceptance
            of the revised terms.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-text dark:text-text-dark mb-2">
            Contact
          </h2>
          <p>
            For questions about these terms, contact us at
            legal@calibratediq.org.
          </p>
        </section>
      </div>
    </div>
  );
}
