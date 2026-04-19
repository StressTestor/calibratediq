import type { Metadata } from 'next';
import Link from 'next/link';
import { AdPlaceholder } from '@/components/ad-placeholder';

export const metadata: Metadata = {
  title: 'What IQ Score Do You Need for Mensa?',
  description:
    'Learn what IQ score is required for Mensa membership, which tests are accepted, how to join, and what the Mensa admissions test is actually like.',
  keywords: ['Mensa IQ score', 'Mensa requirements', 'IQ for Mensa', 'Mensa test', 'top 2 percent IQ'],
  alternates: {
    canonical: 'https://calibratediq.org/learn/mensa-iq-score',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'What IQ Score Do You Need for Mensa?',
  description:
    'A detailed guide to Mensa membership requirements: the IQ threshold, accepted tests, how to join, what the test involves, and common misconceptions.',
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
  mainEntityOfPage: 'https://calibratediq.org/learn/mensa-iq-score',
};

export default function MensaIQScorePage() {
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
              What IQ Score Do You Need for Mensa?
            </h1>

            {/* Introduction */}
            <section className="mb-10">
              <div className="space-y-3 text-sm leading-relaxed text-muted">
                <p>
                  Mensa is the oldest and largest high-IQ society in the world. Founded in 1946 in
                  Oxford, England by Roland Berrill and Lancelot Ware, it exists as a non-political
                  organization whose sole qualification for membership is a demonstrated score at or
                  above the 98th percentile on a standardized intelligence test. As of 2024, Mensa
                  has approximately 145,000 members across more than 90 countries.
                </p>
                <p>
                  The name &quot;Mensa&quot; is Latin for &quot;table,&quot; reflecting the
                  organization&apos;s founding principle of a round-table society where all members
                  meet as equals regardless of background, age, or profession. Membership is based
                  exclusively on cognitive test performance; no other criteria apply.
                </p>
              </div>
            </section>

            {/* CTA 1 */}
            <div className="mb-10 text-center">
              <Link
                href="/tests"
                className="inline-flex items-center justify-center px-6 py-3 text-sm font-medium text-white bg-primary hover:bg-primary-light rounded-lg transition-colors"
              >
                Practice with a Free Mensa-Style Test
              </Link>
            </div>

            {/* The requirement */}
            <section className="mb-10">
              <h2 className="text-lg font-semibold mb-3">
                The 98th Percentile Requirement
              </h2>
              <div className="space-y-3 text-sm leading-relaxed text-muted">
                <p>
                  Mensa requires a score at or above the 98th percentile on an approved,
                  standardized intelligence test. What this translates to in IQ points depends on
                  which test&apos;s scoring scale is used:
                </p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>
                    <strong>Wechsler scales (WAIS, WISC):</strong> IQ 130 or above (SD = 15)
                  </li>
                  <li>
                    <strong>Stanford-Binet 5:</strong> IQ 130 or above (SD = 15)
                  </li>
                  <li>
                    <strong>Cattell III B:</strong> IQ 148 or above (SD = 24)
                  </li>
                  <li>
                    <strong>Raven&apos;s Progressive Matrices:</strong> Score at or above the 95th percentile on the raw score distribution (exact IQ equivalent varies by norming edition)
                  </li>
                </ul>
                <p>
                  The critical point is that the requirement is always the top 2% of the population,
                  regardless of the numerical score. A score of 148 on the Cattell is equivalent to
                  130 on the Wechsler; both represent the same position on the distribution. For
                  a full breakdown of how different scoring scales compare, see the{' '}
                  <Link
                    href="/learn/iq-scale"
                    className="underline hover:text-text dark:hover:text-text-dark transition-colors"
                  >
                    IQ scale and score chart
                  </Link>.
                </p>
              </div>
            </section>

            {/* Ad between sections */}
            <div className="mb-10">
              <AdPlaceholder zone="banner" />
            </div>

            {/* Accepted tests */}
            <section className="mb-10">
              <h2 className="text-lg font-semibold mb-3">
                Which Tests Does Mensa Accept?
              </h2>
              <div className="space-y-3 text-sm leading-relaxed text-muted">
                <p>
                  Mensa accepts scores from a wide range of standardized, professionally administered
                  intelligence tests. Each national Mensa chapter maintains its own list of approved
                  tests, but commonly accepted instruments include:
                </p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Wechsler Adult Intelligence Scale (WAIS-IV)</li>
                  <li>Wechsler Intelligence Scale for Children (WISC-V)</li>
                  <li>Stanford-Binet Intelligence Scales, Fifth Edition</li>
                  <li>Cattell Culture Fair Intelligence Test (Cattell III B)</li>
                  <li>
                    <Link
                      href="/learn/ravens-progressive-matrices"
                      className="underline hover:text-text dark:hover:text-text-dark transition-colors"
                    >
                      Raven&apos;s Progressive Matrices
                    </Link>{' '}
                    (Standard and Advanced)
                  </li>
                  <li>Reynolds Intellectual Assessment Scales (RIAS)</li>
                  <li>Cognitive Assessment System (CAS)</li>
                </ul>
                <p>
                  Tests must have been administered by a qualified psychologist or through a
                  recognized testing program. Self-administered or online tests are not accepted for
                  membership purposes, though they can be useful for practice and self-assessment.
                </p>
              </div>
            </section>

            {/* How to join */}
            <section className="mb-10">
              <h2 className="text-lg font-semibold mb-3">
                How to Join Mensa
              </h2>
              <div className="space-y-3 text-sm leading-relaxed text-muted">
                <p>
                  There are two pathways to Mensa membership:
                </p>
                <h3 className="text-sm font-semibold mt-4 mb-2 text-text dark:text-text-dark">
                  1. Submit Prior Qualifying Scores
                </h3>
                <p>
                  If you have already taken an approved standardized intelligence test and scored at
                  or above the 98th percentile, you can submit your score documentation directly to
                  your national Mensa organization. They will verify the test, the administering
                  professional, and the score before granting membership.
                </p>
                <h3 className="text-sm font-semibold mt-4 mb-2 text-text dark:text-text-dark">
                  2. Take the Mensa Admissions Test
                </h3>
                <p>
                  Most national Mensa chapters offer their own supervised admissions test. In the
                  United States, American Mensa administers a test battery at proctored sessions held
                  at various locations throughout the year. The test fee is typically around $40-60
                  USD. The battery generally consists of two tests: one culture-fair (non-verbal,
                  pattern-based) and one verbal or general reasoning assessment. Qualifying on either
                  test is sufficient for admission.
                </p>
                <p>
                  Testing sessions must be supervised. Remote or at-home testing is generally not
                  available. Check your national Mensa website for upcoming test dates and locations.
                </p>
              </div>
            </section>

            {/* What the test is like */}
            <section className="mb-10">
              <h2 className="text-lg font-semibold mb-3">
                What the Mensa Admissions Test Is Like
              </h2>
              <div className="space-y-3 text-sm leading-relaxed text-muted">
                <p>
                  The specific content of the Mensa admissions test varies by country, but most
                  versions share common characteristics. The tests are timed, typically lasting
                  20-40 minutes each. Questions are multiple-choice. No specialized knowledge is
                  required; the tests measure reasoning ability, not learned information.
                </p>
                <p>
                  The culture-fair component usually consists of non-verbal pattern recognition tasks
                  similar to{' '}
                  <Link
                    href="/learn/ravens-progressive-matrices"
                    className="underline hover:text-text dark:hover:text-text-dark transition-colors"
                  >
                    Raven&apos;s Progressive Matrices
                  </Link>
                  : you are shown a series of geometric patterns with a missing element and must
                  identify the correct completion from a set of options. These tasks primarily assess{' '}
                  <a
                    href="https://en.wikipedia.org/wiki/Fluid_intelligence"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:text-text dark:hover:text-text-dark transition-colors"
                  >
                    fluid intelligence
                  </a>
                  , the capacity to reason through novel problems independent of prior knowledge.
                </p>
                <p>
                  You cannot study for the test in the traditional sense, since it does not test
                  factual knowledge. However, becoming familiar with the format of matrix reasoning
                  problems can help reduce test anxiety and improve time management during the
                  actual assessment.
                </p>
              </div>
            </section>

            {/* Common misconceptions */}
            <section className="mb-10">
              <h2 className="text-lg font-semibold mb-3">
                Common Misconceptions About Mensa
              </h2>
              <div className="space-y-3 text-sm leading-relaxed text-muted">
                <p>
                  <strong>&quot;You need an IQ of 140 to join Mensa.&quot;</strong> This is
                  incorrect. The threshold is the 98th percentile, which corresponds to an IQ of 130
                  on the Wechsler and Stanford-Binet scales (SD = 15). The confusion often arises
                  from the Cattell scale, where the equivalent score is 148. Some online sources
                  incorrectly conflate these numbers.
                </p>
                <p>
                  <strong>&quot;Mensa members are all geniuses.&quot;</strong> The 98th percentile
                  threshold means roughly 1 in 50 people qualifies. In a country of 330 million,
                  that is approximately 6.6 million potentially eligible individuals. Qualifying for
                  Mensa indicates above-average cognitive test performance, not genius in any
                  colloquial sense.
                </p>
                <p>
                  <strong>&quot;You can use an online IQ test to get into Mensa.&quot;</strong> No
                  online test is accepted for Mensa membership. All qualifying scores must come from
                  supervised, professionally administered tests. Online tests, including ours, can
                  serve as useful practice tools to gauge whether you are likely to qualify, but they
                  are not substitutes for the official admissions process.
                </p>
                <p>
                  <strong>&quot;Mensa membership means you are smarter than everyone else.&quot;</strong>{' '}
                  IQ tests measure a specific set of cognitive abilities. They do not capture
                  creativity, emotional intelligence, practical skills, or domain expertise. Many
                  accomplished individuals have never taken an IQ test and would have no reason to
                  join Mensa.
                </p>
              </div>
            </section>

            {/* Practice tests vs official tests */}
            <section className="mb-10">
              <h2 className="text-lg font-semibold mb-3">
                Practice Tests vs Official Tests
              </h2>
              <div className="space-y-3 text-sm leading-relaxed text-muted">
                <p>
                  There is a meaningful distinction between practice tests and official tests, and
                  understanding it is important for setting realistic expectations.
                </p>
                <p>
                  Practice tests, including the one offered on this site, use similar question
                  formats and scoring methodologies to estimate your cognitive ability. They provide
                  a reasonable approximation but lack the controlled conditions of a supervised test:
                  standardized timing, distraction-free environment, and verified identity. Scores
                  from practice tests tend to be slightly higher than supervised results, partly
                  because of practice effects and partly because of uncontrolled testing conditions.
                </p>
                <p>
                  If you score at or above 130 on a well-designed practice test, you have a
                  reasonable chance of qualifying on the official Mensa admissions test, but it
                  is not guaranteed. Conversely, scoring slightly below 130 on a practice test does
                  not mean you will fail the official test. Use the{' '}
                  <Link
                    href="/learn/iq-percentile-calculator"
                    className="underline hover:text-text dark:hover:text-text-dark transition-colors"
                  >
                    IQ percentile calculator
                  </Link>{' '}
                  to understand exactly what your score means in statistical terms.
                </p>
              </div>
            </section>

            {/* CTA 2 */}
            <div className="mb-10 text-center">
              <p className="text-sm text-muted mb-4">
                Curious whether you would qualify? Our test uses the same type of matrix reasoning
                problems found on the Mensa admissions test.
              </p>
              <Link
                href="/tests"
                className="inline-flex items-center justify-center px-6 py-3 text-sm font-medium text-white bg-primary hover:bg-primary-light rounded-lg transition-colors"
              >
                Try a Free Mensa-Style Practice Test
              </Link>
            </div>

            {/* References */}
            <section>
              <h2 className="text-lg font-semibold mb-3">References</h2>
              <ul className="space-y-2 text-sm text-muted">
                <li>
                  <a
                    href="https://en.wikipedia.org/wiki/Mensa_International"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:text-text dark:hover:text-text-dark transition-colors"
                  >
                    Mensa International (Wikipedia)
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.mensa.org/join/testing"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:text-text dark:hover:text-text-dark transition-colors"
                  >
                    Mensa Testing Information (mensa.org)
                  </a>
                </li>
                <li>
                  <a
                    href="https://en.wikipedia.org/wiki/Wechsler_Adult_Intelligence_Scale"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:text-text dark:hover:text-text-dark transition-colors"
                  >
                    Wechsler Adult Intelligence Scale (Wikipedia)
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
                    href="https://en.wikipedia.org/wiki/Cattell_Culture_Fair_Intelligence_Test"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:text-text dark:hover:text-text-dark transition-colors"
                  >
                    Cattell Culture Fair Intelligence Test (Wikipedia)
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
