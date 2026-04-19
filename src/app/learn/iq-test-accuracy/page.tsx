import type { Metadata } from 'next';
import Link from 'next/link';
import { AdPlaceholder } from '@/components/ad-placeholder';

export const metadata: Metadata = {
  title: 'Are Online IQ Tests Accurate? What to Look For',
  description:
    'Learn what makes an IQ test reliable and valid, how to distinguish good tests from bad ones, what standard error of measurement means, and why matrix-based tests are more trustworthy than trivia quizzes.',
  keywords: ['are online IQ tests accurate', 'IQ test accuracy', 'can you trust online IQ tests', 'IQ test reliability', 'IQ test validity'],
  alternates: {
    canonical: 'https://calibratediq.org/learn/iq-test-accuracy',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Are Online IQ Tests Accurate? What to Look For',
  description:
    'An honest assessment of online IQ test accuracy: what makes a test psychometrically sound, the difference between screening tools and clinical diagnostics, and how to evaluate any IQ test you encounter.',
  author: {
    '@type': 'Organization',
    name: 'CalibratedIQ',
    url: 'https://calibratediq.org',
  },
  publisher: {
    '@type': 'Organization',
    name: 'CalibratedIQ',
    url: 'https://calibratediq.org',
  },
  mainEntityOfPage: 'https://calibratediq.org/learn/iq-test-accuracy',
};

export default function IQTestAccuracyPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="max-w-4xl mx-auto px-4 py-10 sm:py-16">
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Main content */}
          <article className="flex-1 max-w-2xl">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mb-8">
              Are Online IQ Tests Accurate? What to Look For
            </h1>

            {/* Introduction */}
            <section className="mb-10">
              <div className="space-y-3 text-sm leading-relaxed text-muted">
                <p>
                  The honest answer is: it depends entirely on the test. Most online IQ tests are
                  poorly designed entertainment products that inflate scores to make users feel good
                  and share their results. A smaller number use established psychometric methodology
                  and can provide meaningful estimates of cognitive ability. Knowing the difference
                  requires understanding what makes an IQ test valid in the first place.
                </p>
                <p>
                  This page examines the criteria that separate legitimate cognitive assessments
                  from unreliable ones, explains the key psychometric concepts (reliability,
                  validity, standard error of measurement), and provides a framework for evaluating
                  any IQ test you encounter online.
                </p>
              </div>
            </section>

            {/* CTA 1 */}
            <div className="mb-10 text-center">
              <Link
                href="/tests"
                className="inline-flex items-center justify-center px-6 py-3 text-sm font-medium text-white bg-primary hover:bg-primary-light rounded-lg transition-colors"
              >
                See How a Properly Calibrated Test Works
              </Link>
            </div>

            {/* What makes a good IQ test */}
            <section className="mb-10">
              <h2 className="text-lg font-semibold mb-3">
                What Makes a Good IQ Test
              </h2>
              <div className="space-y-3 text-sm leading-relaxed text-muted">
                <p>
                  A legitimate IQ test, whether administered in a clinic or online, must satisfy
                  several psychometric criteria. Without these, a score is essentially meaningless:
                  a number without a valid referent.
                </p>
                <h3 className="text-sm font-semibold mt-4 mb-2 text-text dark:text-text-dark">
                  Standardized Norming
                </h3>
                <p>
                  IQ scores are relative measures. A score of 115 means &quot;one standard deviation
                  above the mean of the norming sample.&quot; If the test has not been administered
                  to a large, representative sample and its scoring model fitted to the resulting
                  distribution, the numbers it produces have no interpretive basis. Clinical tests
                  like the{' '}
                  <a
                    href="https://en.wikipedia.org/wiki/Wechsler_Adult_Intelligence_Scale"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:text-text dark:hover:text-text-dark transition-colors"
                  >
                    WAIS
                  </a>{' '}
                  are normed on thousands of individuals stratified by age, gender, education, and
                  ethnicity. A well-designed online test should at minimum use a normal distribution
                  scoring model (mean 100, SD 15) and have been calibrated against a sufficiently
                  large sample.
                </p>
                <h3 className="text-sm font-semibold mt-4 mb-2 text-text dark:text-text-dark">
                  Culture-Fair Design
                </h3>
                <p>
                  Tests that rely on vocabulary, general knowledge, or culturally specific reasoning
                  patterns advantage test-takers from particular backgrounds. Culture-fair tests
                  minimize this bias by using non-verbal, abstract reasoning tasks: geometric
                  patterns, matrix completion, series continuation. The gold standard for
                  culture-fair testing is{' '}
                  <Link
                    href="/learn/ravens-progressive-matrices"
                    className="underline hover:text-text dark:hover:text-text-dark transition-colors"
                  >
                    Raven&apos;s Progressive Matrices
                  </Link>
                  , which has been used across dozens of countries and language groups with consistent
                  psychometric properties.
                </p>
                <h3 className="text-sm font-semibold mt-4 mb-2 text-text dark:text-text-dark">
                  Proper Statistical Calibration
                </h3>
                <p>
                  The test&apos;s scoring algorithm should produce a distribution that approximates
                  the normal curve. If a test gives 80% of takers a score above 120, it is not
                  measuring what it claims. Proper calibration means the test discriminates
                  effectively across the full range of ability, with items that range from easy
                  (solvable by most) to difficult (solvable by very few).
                </p>
              </div>
            </section>

            {/* Ad between sections */}
            <div className="mb-10">
              <AdPlaceholder zone="banner" />
            </div>

            {/* Red flags */}
            <section className="mb-10">
              <h2 className="text-lg font-semibold mb-3">
                Red Flags: Signs of a Bad IQ Test
              </h2>
              <div className="space-y-3 text-sm leading-relaxed text-muted">
                <p>
                  The majority of online IQ tests fail basic psychometric standards. Here are the
                  most common warning signs:
                </p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    <strong>Trivia and knowledge questions:</strong> Any test that asks factual
                    questions (&quot;Who painted the Mona Lisa?&quot;) is testing crystallized
                    knowledge, not general intelligence. These items are heavily influenced by
                    education and cultural background, making them poor measures of cognitive ability.
                  </li>
                  <li>
                    <strong>Inflated scores:</strong> If the test tells most users they have an IQ
                    of 120-140, the scoring is not calibrated to a real population distribution.
                    This is a deliberate design choice to encourage social sharing and repeat visits.
                  </li>
                  <li>
                    <strong>Pay-to-see results:</strong> Tests that require payment to view your
                    score after you have already taken the test are using your investment of time
                    as leverage. This business model incentivizes flattering scores over accurate
                    ones.
                  </li>
                  <li>
                    <strong>Fixed question pools:</strong> If every test-taker sees the same
                    questions in the same order, the answers can be memorized and shared. A test
                    with a fixed item bank becomes progressively less valid as its questions
                    circulate online.
                  </li>
                  <li>
                    <strong>No time limit or extremely generous timing:</strong> Cognitive ability
                    testing includes a speed component. Tests with no time pressure may measure
                    persistence or willingness to look up answers rather than cognitive ability.
                  </li>
                  <li>
                    <strong>Language-dependent items:</strong> If the test requires fluent reading
                    comprehension in a specific language, it is confounding language ability with
                    cognitive ability.
                  </li>
                </ul>
              </div>
            </section>

            {/* Reliability and validity */}
            <section className="mb-10">
              <h2 className="text-lg font-semibold mb-3">
                Reliability, Validity, and Standard Error
              </h2>
              <div className="space-y-3 text-sm leading-relaxed text-muted">
                <h3 className="text-sm font-semibold mt-4 mb-2 text-text dark:text-text-dark">
                  Reliability
                </h3>
                <p>
                  <a
                    href="https://en.wikipedia.org/wiki/Reliability_(statistics)"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:text-text dark:hover:text-text-dark transition-colors"
                  >
                    Reliability
                  </a>{' '}
                  refers to the consistency of a test&apos;s results. A reliable IQ test produces
                  similar scores when the same person takes it on different occasions (test-retest
                  reliability). Major clinical tests like the WAIS achieve test-retest correlations
                  of 0.90-0.95, meaning scores are highly stable across administrations.
                </p>
                <p>
                  For online tests, reliability is typically lower due to uncontrolled testing
                  conditions: distractions, fatigue, varying effort levels, and device differences
                  all introduce noise. A well-constructed online test might achieve test-retest
                  reliability in the 0.75-0.85 range, which is respectable but lower than clinical
                  instruments.
                </p>
                <h3 className="text-sm font-semibold mt-4 mb-2 text-text dark:text-text-dark">
                  Validity
                </h3>
                <p>
                  <a
                    href="https://en.wikipedia.org/wiki/Validity_(statistics)"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:text-text dark:hover:text-text-dark transition-colors"
                  >
                    Validity
                  </a>{' '}
                  asks whether the test actually measures what it claims to measure. For IQ tests,
                  this is typically assessed through correlation with other established intelligence
                  tests (concurrent validity) and through correlation with outcomes that IQ is known
                  to predict, such as academic performance (predictive validity). Matrix reasoning
                  tasks, like those used in{' '}
                  <Link
                    href="/learn/ravens-progressive-matrices"
                    className="underline hover:text-text dark:hover:text-text-dark transition-colors"
                  >
                    Raven&apos;s Progressive Matrices
                  </Link>
                  , have been extensively validated and consistently load heavily on the{' '}
                  <a
                    href="https://en.wikipedia.org/wiki/G_factor_(psychometrics)"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:text-text dark:hover:text-text-dark transition-colors"
                  >
                    g factor
                  </a>{' '}
                  of general intelligence.
                </p>
                <h3 className="text-sm font-semibold mt-4 mb-2 text-text dark:text-text-dark">
                  Standard Error of Measurement
                </h3>
                <p>
                  Every test score includes some degree of measurement error. The{' '}
                  <a
                    href="https://en.wikipedia.org/wiki/Standard_error_of_measurement"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:text-text dark:hover:text-text-dark transition-colors"
                  >
                    standard error of measurement
                  </a>{' '}
                  (SEM) quantifies this uncertainty. For clinical IQ tests, the SEM is typically
                  3-5 points, meaning a true score of 115 might produce an observed score anywhere
                  between 110 and 120 on a given administration. For online tests, the SEM is likely
                  somewhat larger. This is why IQ scores should always be interpreted as ranges
                  rather than exact values. For a deeper discussion of the mathematics, see{' '}
                  <Link
                    href="/learn/how-iq-is-calculated"
                    className="underline hover:text-text dark:hover:text-text-dark transition-colors"
                  >
                    how IQ is calculated
                  </Link>.
                </p>
              </div>
            </section>

            {/* Screening tools vs clinical diagnostics */}
            <section className="mb-10">
              <h2 className="text-lg font-semibold mb-3">
                Screening Tools vs Clinical Diagnostics
              </h2>
              <div className="space-y-3 text-sm leading-relaxed text-muted">
                <p>
                  It is important to be clear about what online tests can and cannot do. Even a
                  well-designed online IQ test is a screening tool, not a clinical diagnostic. The
                  distinction matters.
                </p>
                <p>
                  A clinical IQ assessment is administered one-on-one by a trained psychologist in
                  a controlled environment. It typically takes 60-90 minutes, covers multiple
                  cognitive domains (verbal, perceptual, working memory, processing speed), and
                  includes qualitative observations about the test-taker&apos;s behavior, engagement,
                  and strategy use. The resulting report contextualizes scores within the
                  individual&apos;s history and clinical profile.
                </p>
                <p>
                  An online test offers none of this context. What it can offer is a reasonable
                  estimate of one dimension of cognitive ability, particularly{' '}
                  <Link
                    href="/learn/fluid-vs-crystallized-intelligence"
                    className="underline hover:text-text dark:hover:text-text-dark transition-colors"
                  >
                    fluid intelligence
                  </Link>
                  , when it uses proven methodology. A matrix-based online test with proper scoring
                  calibration is far more meaningful than a trivia quiz claiming to measure IQ, even
                  though neither replaces a clinical assessment.
                </p>
              </div>
            </section>

            {/* What differentiates a good online test */}
            <section className="mb-10">
              <h2 className="text-lg font-semibold mb-3">
                What to Look for in an Online IQ Test
              </h2>
              <div className="space-y-3 text-sm leading-relaxed text-muted">
                <p>
                  If you are going to take an online IQ test, here are the features that indicate
                  a test is at least attempting to provide meaningful results:
                </p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    <strong>Matrix reasoning format:</strong> The test should use non-verbal,
                    pattern-based questions. This is the single most validated format for measuring
                    fluid intelligence and the closest analog to clinically used instruments.
                  </li>
                  <li>
                    <strong>Procedurally generated items:</strong> Tests that generate unique
                    questions for each session are resistant to answer sharing and memorization,
                    maintaining validity over time.
                  </li>
                  <li>
                    <strong>Proper scoring distribution:</strong> The test should produce scores
                    centered around 100 with meaningful spread. If most users score above 120,
                    the scoring is inflated.
                  </li>
                  <li>
                    <strong>Timed administration:</strong> A time limit ensures the test measures
                    cognitive processing ability, not just willingness to persist or ability to look
                    things up.
                  </li>
                  <li>
                    <strong>Free results:</strong> A test that shows your score without payment has
                    no financial incentive to inflate results. Pay-to-see models are structurally
                    incentivized to flatter.
                  </li>
                  <li>
                    <strong>Transparent methodology:</strong> The test should explain what it
                    measures, how scoring works, and what its limitations are. Any test that claims
                    to be a definitive measure of intelligence without caveats should not be trusted.
                  </li>
                </ul>
              </div>
            </section>

            {/* CTA 2 */}
            <div className="mb-10 text-center">
              <p className="text-sm text-muted mb-4">
                Our test uses procedurally generated matrix reasoning problems, a normal distribution
                scoring model, and provides free results with full methodology transparency.
              </p>
              <Link
                href="/tests"
                className="inline-flex items-center justify-center px-6 py-3 text-sm font-medium text-white bg-primary hover:bg-primary-light rounded-lg transition-colors"
              >
                Try the Calibrated IQ Test
              </Link>
            </div>

            {/* CTA 3 */}
            <div className="mb-10 text-center">
              <p className="text-sm text-muted mb-4">
                Curious about other aspects of IQ testing? Learn about the{' '}
                <Link
                  href="/learn/ravens-progressive-matrices"
                  className="underline hover:text-text dark:hover:text-text-dark transition-colors"
                >
                  methodology behind matrix reasoning
                </Link>{' '}
                or explore{' '}
                <Link
                  href="/learn/fluid-vs-crystallized-intelligence"
                  className="underline hover:text-text dark:hover:text-text-dark transition-colors"
                >
                  the types of intelligence these tests measure
                </Link>.
              </p>
            </div>

            {/* References */}
            <section>
              <h2 className="text-lg font-semibold mb-3">References</h2>
              <ul className="space-y-2 text-sm text-muted">
                <li>
                  <a
                    href="https://en.wikipedia.org/wiki/Intelligence_quotient"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:text-text dark:hover:text-text-dark transition-colors"
                  >
                    Intelligence Quotient (Wikipedia)
                  </a>
                </li>
                <li>
                  <a
                    href="https://en.wikipedia.org/wiki/Psychometrics"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:text-text dark:hover:text-text-dark transition-colors"
                  >
                    Psychometrics (Wikipedia)
                  </a>
                </li>
                <li>
                  <a
                    href="https://en.wikipedia.org/wiki/Reliability_(statistics)"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:text-text dark:hover:text-text-dark transition-colors"
                  >
                    Reliability (Wikipedia)
                  </a>
                </li>
                <li>
                  <a
                    href="https://en.wikipedia.org/wiki/Validity_(statistics)"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:text-text dark:hover:text-text-dark transition-colors"
                  >
                    Validity (Wikipedia)
                  </a>
                </li>
                <li>
                  <a
                    href="https://en.wikipedia.org/wiki/Standard_error_of_measurement"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:text-text dark:hover:text-text-dark transition-colors"
                  >
                    Standard Error of Measurement (Wikipedia)
                  </a>
                </li>
                <li>
                  <a
                    href="https://en.wikipedia.org/wiki/Raven%27s_Progressive_Matrices"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:text-text dark:hover:text-text-dark transition-colors"
                  >
                    Raven&apos;s Progressive Matrices (Wikipedia)
                  </a>
                </li>
                <li>
                  <a
                    href="https://en.wikipedia.org/wiki/G_factor_(psychometrics)"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:text-text dark:hover:text-text-dark transition-colors"
                  >
                    g Factor (Wikipedia)
                  </a>
                </li>
              </ul>
            </section>

            {/* Bottom ad */}
            <div className="mt-10">
              <AdPlaceholder zone="banner" />
            </div>
          </article>

          {/* Sidebar ad */}
          <div className="lg:w-[300px] shrink-0">
            <div className="sticky top-6">
              <AdPlaceholder zone="sidebar" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
