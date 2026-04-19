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
        <p>Last updated: April 2026</p>

        <section>
          <h2 className="text-base font-semibold text-text dark:text-text-dark mb-2">
            Disclaimer
          </h2>
          <p>
            CalibratedIQ is provided for entertainment and educational
            purposes only. It is not a clinical diagnostic tool. Results
            should not be interpreted as a definitive measure of
            intelligence or cognitive ability, and must not be used for
            medical, educational, employment, or legal decisions.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-text dark:text-text-dark mb-2">
            No Warranties
          </h2>
          <p>
            The site is provided &quot;as is&quot; without warranties of any
            kind, express or implied. We make no representations regarding
            the accuracy, reliability, or completeness of test results.
            Individual scores may vary with testing conditions, familiarity
            with the item format, and other factors outside our control.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-text dark:text-text-dark mb-2">
            No Affiliation
          </h2>
          <p>
            CalibratedIQ is an independent project and is not affiliated
            with, endorsed by, or associated with Mensa International, the
            Raven family, Pearson Assessments, or any other psychological
            testing body. References to Mensa qualification thresholds are
            provided for informational context only. For official Mensa
            testing, visit{' '}
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
            Intellectual Property
          </h2>
          <p>
            The psychometric methodologies referenced on this site (progressive
            matrices, spatial reasoning, number sequences, and related
            techniques) are long-established and in the public domain. The
            question-generation algorithms, visual design, and written
            content of CalibratedIQ are original works. You may share your
            results freely, but you may not reproduce, distribute, or create
            derivative works from the test content without permission.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-text dark:text-text-dark mb-2">
            Limitation of Liability
          </h2>
          <p>
            To the fullest extent permitted by applicable law, CalibratedIQ
            and its operators shall not be liable for any indirect,
            incidental, special, consequential, or punitive damages, or for
            any loss of profits, revenues, data, goodwill, or other
            intangibles, arising from (a) your use of or inability to use
            the site; (b) any interpretation of or reliance on test
            results; or (c) any unauthorized access to, or alteration of,
            your data.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-text dark:text-text-dark mb-2">
            Acceptable Use
          </h2>
          <p>
            You agree to use this site for personal, non-commercial purposes
            only. You may not attempt to reverse-engineer any
            question-generation algorithm for the purpose of inflating
            scores. You may not use automated tools or scripts to take the
            tests. You may not misrepresent your results as official clinical
            or psychometric assessments.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-text dark:text-text-dark mb-2">
            Changes to These Terms
          </h2>
          <p>
            We reserve the right to modify these terms at any time.
            Continued use of the site following any change constitutes
            acceptance of the revised terms.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-text dark:text-text-dark mb-2">
            Contact
          </h2>
          <p>
            For questions about these terms, contact{' '}
            <a
              href="mailto:legal@calibratediq.org"
              className="underline hover:text-text dark:hover:text-text-dark transition-colors"
            >
              legal@calibratediq.org
            </a>
            .
          </p>
        </section>
      </div>
    </div>
  );
}
