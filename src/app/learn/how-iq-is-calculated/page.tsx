import type { Metadata } from 'next';
import Link from 'next/link';
import { AdPlaceholder } from '@/components/ad-placeholder';

export const metadata: Metadata = {
  title: 'How IQ Scores Are Calculated — The Math Behind the Number',
  description:
    'Learn how raw test scores become IQ scores through z-score transformation, the normal distribution, percentile ranks, and why different tests can give different results.',
  keywords: [
    'how IQ is calculated',
    'IQ normal distribution',
    'standard deviation IQ',
    'IQ formula',
    'z-score IQ',
    'Flynn effect',
  ],
  alternates: {
    canonical: 'https://calibratediq.org/learn/how-iq-is-calculated',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'How IQ Scores Are Calculated — The Math Behind the Number',
  description:
    'A technical explanation of IQ score calculation: raw scores, z-score transformation, the normal distribution, percentile conversion, and sources of score variation.',
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
  mainEntityOfPage: 'https://calibratediq.org/learn/how-iq-is-calculated',
};

const percentileTable = [
  { iq: 145, z: '+3.0', percentile: '99.87', rarity: '1 in 741' },
  { iq: 140, z: '+2.67', percentile: '99.62', rarity: '1 in 261' },
  { iq: 135, z: '+2.33', percentile: '99.01', rarity: '1 in 101' },
  { iq: 130, z: '+2.0', percentile: '97.72', rarity: '1 in 44' },
  { iq: 125, z: '+1.67', percentile: '95.25', rarity: '1 in 21' },
  { iq: 120, z: '+1.33', percentile: '90.88', rarity: '1 in 11' },
  { iq: 115, z: '+1.0', percentile: '84.13', rarity: '1 in 6' },
  { iq: 110, z: '+0.67', percentile: '74.86', rarity: '1 in 4' },
  { iq: 105, z: '+0.33', percentile: '63.06', rarity: '1 in 3' },
  { iq: 100, z: '0', percentile: '50.00', rarity: '1 in 2' },
  { iq: 95, z: '-0.33', percentile: '36.94', rarity: '1 in 3' },
  { iq: 90, z: '-0.67', percentile: '25.14', rarity: '1 in 4' },
  { iq: 85, z: '-1.0', percentile: '15.87', rarity: '1 in 6' },
  { iq: 80, z: '-1.33', percentile: '9.12', rarity: '1 in 11' },
  { iq: 75, z: '-1.67', percentile: '4.75', rarity: '1 in 21' },
  { iq: 70, z: '-2.0', percentile: '2.28', rarity: '1 in 44' },
];

export default function HowIQIsCalculatedPage() {
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
              How IQ Scores Are Calculated. The Math Behind the Number
            </h1>

            {/* Introduction */}
            <section className="mb-10">
              <div className="space-y-3 text-sm leading-relaxed text-muted">
                <p>
                  An IQ score is not simply the number of questions you answered correctly.
                  It is a derived score that places your raw performance on a standardized
                  scale, allowing direct comparison against a reference population. The
                  process involves several steps: collecting raw scores, transforming them
                  using a statistical formula, and mapping the result onto a normal
                  distribution.
                </p>
                <p>
                  Understanding this process helps clarify why IQ scores behave the way they
                  do: why 100 is always average, why the same raw score can produce different
                  IQ values on different tests, and why scores at the extremes (very high or
                  very low) are inherently less precise. For background on{' '}
                  <Link
                    href="/learn/what-is-iq"
                    className="underline hover:text-text dark:hover:text-text-dark transition-colors"
                  >
                    what IQ is
                  </Link>{' '}
                  and how the concept developed, see our introductory article.
                </p>
              </div>
            </section>

            {/* CTA 1 */}
            <div className="mb-10 text-center">
              <Link
                href="/tests"
                className="inline-flex items-center justify-center px-6 py-3 text-sm font-medium text-white bg-primary hover:bg-primary-light rounded-lg transition-colors"
              >
                See Your Score Calculated Live
              </Link>
            </div>

            {/* Raw scores vs standard scores */}
            <section className="mb-10">
              <h2 className="text-lg font-semibold mb-3">
                Raw Scores vs Standard Scores
              </h2>
              <div className="space-y-3 text-sm leading-relaxed text-muted">
                <p>
                  A raw score is the most basic measurement: how many items you answered
                  correctly. On a 30-item test, a raw score might be 22 out of 30. On a
                  60-item test, it might be 47 out of 60. These numbers are not directly
                  comparable, because the tests have different numbers of items, different
                  difficulty levels, and different populations taking them.
                </p>
                <p>
                  A standard score solves this comparability problem. It expresses your
                  performance relative to a specific reference group (the norming sample),
                  using a consistent scale. The most common standard score in IQ testing
                  uses a mean of 100 and a standard deviation of 15. This is sometimes
                  called the Wechsler scale, after{' '}
                  <a
                    href="https://en.wikipedia.org/wiki/David_Wechsler"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:text-text dark:hover:text-text-dark transition-colors"
                  >
                    David Wechsler
                  </a>
                  , who introduced it.
                </p>
              </div>
            </section>

            {/* The normal distribution */}
            <section className="mb-10">
              <h2 className="text-lg font-semibold mb-3">
                The Normal Distribution
              </h2>
              <div className="space-y-3 text-sm leading-relaxed text-muted">
                <p>
                  IQ score calculation relies on the{' '}
                  <a
                    href="https://en.wikipedia.org/wiki/Normal_distribution"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:text-text dark:hover:text-text-dark transition-colors"
                  >
                    normal distribution
                  </a>{' '}
                  (also called the Gaussian distribution or bell curve). When a large,
                  representative sample of people takes a well-designed cognitive test,
                  their scores tend to form this characteristic symmetrical shape: most
                  scores cluster near the center, and scores become progressively rarer
                  toward the extremes.
                </p>
                <p>
                  The normal distribution is fully defined by two parameters: the mean
                  (the center point) and the standard deviation (a measure of how spread
                  out the scores are). For IQ, the mean is set at 100 and the standard
                  deviation at 15.
                </p>
                <p>
                  The standard deviation determines the width of the curve. One standard
                  deviation above the mean is 115; one below is 85. Two standard deviations
                  above is 130; two below is 70. These boundaries define the familiar IQ
                  classification ranges described in the{' '}
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

            {/* The formula */}
            <section className="mb-10">
              <h2 className="text-lg font-semibold mb-3">
                The Formula: From Raw Score to IQ
              </h2>
              <div className="space-y-3 text-sm leading-relaxed text-muted">
                <p>
                  The conversion from a raw score to an IQ score proceeds in two steps.
                  First, the raw score is converted to a z-score, which expresses how many
                  standard deviations the score falls above or below the mean of the
                  norming sample.
                </p>
                <div className="bg-neutral-50 dark:bg-neutral-800/50 border border-border dark:border-border-dark rounded-lg p-4 my-4 font-mono text-sm">
                  <p className="mb-2">z = (X - M) / S</p>
                  <p className="text-xs text-muted">
                    where X = raw score, M = mean of norming sample, S = standard deviation
                    of norming sample
                  </p>
                </div>
                <p>
                  Then, the z-score is transformed onto the IQ scale:
                </p>
                <div className="bg-neutral-50 dark:bg-neutral-800/50 border border-border dark:border-border-dark rounded-lg p-4 my-4 font-mono text-sm">
                  <p className="mb-2">IQ = 100 + 15z</p>
                  <p className="text-xs text-muted">
                    where 100 is the IQ mean and 15 is the IQ standard deviation
                  </p>
                </div>
                <p>
                  For example, suppose a norming sample of 1,000 people takes a 30-item test.
                  The mean raw score is 18 and the standard deviation is 5. A person who
                  scores 23 out of 30 has a z-score of (23 - 18) / 5 = 1.0. Their IQ would
                  be 100 + 15(1.0) = 115, placing them one standard deviation above the
                  mean, at approximately the 84th percentile.
                </p>
              </div>
            </section>

            {/* Percentile ranks from z-scores */}
            <section className="mb-10">
              <h2 className="text-lg font-semibold mb-3">
                Percentile Ranks From z-Scores
              </h2>
              <div className="space-y-3 text-sm leading-relaxed text-muted mb-6">
                <p>
                  Once an IQ score is calculated, its corresponding percentile rank can be
                  determined using the cumulative distribution function (CDF) of the normal
                  distribution. The percentile indicates the percentage of the reference
                  population that a person scores equal to or above.
                </p>
                <p>
                  The following table shows the relationship between IQ scores, z-scores,
                  percentile ranks, and rarity.
                </p>
              </div>
              <div className="border border-border dark:border-border-dark rounded-lg overflow-hidden overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-neutral-50 dark:bg-neutral-800/50 border-b border-border dark:border-border-dark">
                      <th className="text-left px-4 py-2.5 font-medium text-muted">IQ</th>
                      <th className="text-left px-4 py-2.5 font-medium text-muted">z-score</th>
                      <th className="text-right px-4 py-2.5 font-medium text-muted">Percentile</th>
                      <th className="text-right px-4 py-2.5 font-medium text-muted">Rarity</th>
                    </tr>
                  </thead>
                  <tbody>
                    {percentileTable.map((row) => (
                      <tr
                        key={row.iq}
                        className="border-b border-border dark:border-border-dark last:border-0"
                      >
                        <td className="px-4 py-2.5 tabular-nums font-medium">{row.iq}</td>
                        <td className="px-4 py-2.5 tabular-nums">{row.z}</td>
                        <td className="px-4 py-2.5 text-right tabular-nums">{row.percentile}</td>
                        <td className="px-4 py-2.5 text-right tabular-nums">{row.rarity}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* Ceiling and floor effects */}
            <section className="mb-10">
              <h2 className="text-lg font-semibold mb-3">
                Ceiling and Floor Effects
              </h2>
              <div className="space-y-3 text-sm leading-relaxed text-muted">
                <p>
                  Every test has a maximum possible raw score (the ceiling) and a minimum
                  (the floor, typically zero). These boundaries create measurement
                  limitations at the extremes.
                </p>
                <p>
                  A <strong>ceiling effect</strong> occurs when the test is not difficult
                  enough to differentiate among very high-ability individuals. If several
                  test-takers achieve a perfect or near-perfect raw score, the test cannot
                  distinguish between them, even though their true abilities may differ
                  considerably. This is why the Standard Progressive Matrices is less
                  effective for assessing giftedness than the Advanced version. For the
                  differences between these versions, see{' '}
                  <Link
                    href="/learn/ravens-progressive-matrices"
                    className="underline hover:text-text dark:hover:text-text-dark transition-colors"
                  >
                    Raven&apos;s Progressive Matrices
                  </Link>.
                </p>
                <p>
                  A <strong>floor effect</strong> is the inverse: when the test is too
                  difficult for very low-ability individuals, many achieve zero or near-zero
                  scores, and the test cannot discriminate within this group. Ceiling and
                  floor effects mean that IQ estimates at the extremes (below 70 or above
                  145) are inherently less reliable than those near the center of the
                  distribution.
                </p>
              </div>
            </section>

            {/* Why different tests give different scores */}
            <section className="mb-10">
              <h2 className="text-lg font-semibold mb-3">
                Why Different Tests Give Different Scores
              </h2>
              <div className="space-y-3 text-sm leading-relaxed text-muted">
                <p>
                  It is common for a person to receive different IQ scores from different
                  tests. This is not an error; it reflects several legitimate sources of
                  variation.
                </p>
                <p>
                  <strong>Different norming samples.</strong> Each test is normed on a
                  specific population sample. If the norming sample is more or less
                  cognitively able than the general population, all derived scores will
                  be systematically shifted. A score of 120 on one test may correspond
                  to 115 or 125 on another, depending on who was in the norming sample.
                </p>
                <p>
                  <strong>Different cognitive domains.</strong> Tests that emphasize{' '}
                  <Link
                    href="/learn/fluid-vs-crystallized-intelligence"
                    className="underline hover:text-text dark:hover:text-text-dark transition-colors"
                  >
                    fluid intelligence
                  </Link>{' '}
                  (like matrix reasoning) may produce different scores for the same person
                  than tests that emphasize crystallized intelligence (like vocabulary or
                  general knowledge). A person with strong reasoning but limited formal
                  education might score higher on RPM than on the WAIS Verbal Comprehension
                  Index.
                </p>
                <p>
                  <strong>Measurement error.</strong> Every psychological test has a standard
                  error of measurement (SEM). For most IQ tests, the SEM is approximately
                  3 to 5 points. This means a &quot;true&quot; IQ of 115 might produce
                  observed scores ranging from 110 to 120 across multiple administrations.
                  A single test administration is always an estimate, not an exact value.
                </p>
              </div>
            </section>

            {/* The Flynn effect */}
            <section className="mb-10">
              <h2 className="text-lg font-semibold mb-3">
                The Flynn Effect
              </h2>
              <div className="space-y-3 text-sm leading-relaxed text-muted">
                <p>
                  The{' '}
                  <a
                    href="https://en.wikipedia.org/wiki/Flynn_effect"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:text-text dark:hover:text-text-dark transition-colors"
                  >
                    Flynn effect
                  </a>
                  , named after researcher{' '}
                  <a
                    href="https://en.wikipedia.org/wiki/James_Flynn_(academic)"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:text-text dark:hover:text-text-dark transition-colors"
                  >
                    James Flynn
                  </a>
                  , is the well-documented observation that average IQ scores have risen
                  substantially over the 20th century, at a rate of approximately 3 points
                  per decade. This effect is most pronounced on tests of fluid intelligence,
                  including Raven&apos;s Progressive Matrices.
                </p>
                <p>
                  The Flynn effect has practical consequences for IQ calculation. Because
                  norming samples become outdated over time, a person taking a test normed
                  20 years ago will appear to score higher than they would on a recently
                  normed test, because the older norms reflect a less-skilled reference
                  population. This is why IQ tests are periodically re-normed, and why the
                  specific edition of a test matters when interpreting scores.
                </p>
                <p>
                  The causes of the Flynn effect remain debated. Proposed explanations
                  include improved nutrition, greater access to education, increased exposure
                  to abstract reasoning through technology, and reduced environmental
                  toxins. More recently, some researchers have reported a reversal of the
                  Flynn effect in certain developed countries, with scores plateauing or
                  declining since the 1990s.
                </p>
              </div>
            </section>

            {/* CTA 2 */}
            <div className="mb-10 text-center">
              <p className="text-sm text-muted mb-4">
                Our test applies the same statistical methodology described above to
                convert your matrix reasoning performance into a calibrated IQ estimate.
              </p>
              <Link
                href="/tests"
                className="inline-flex items-center justify-center px-6 py-3 text-sm font-medium text-white bg-primary hover:bg-primary-light rounded-lg transition-colors"
              >
                Take a Free IQ Test
              </Link>
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
                    href="https://en.wikipedia.org/wiki/Normal_distribution"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:text-text dark:hover:text-text-dark transition-colors"
                  >
                    Normal Distribution (Wikipedia)
                  </a>
                </li>
                <li>
                  <a
                    href="https://en.wikipedia.org/wiki/Standard_score"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:text-text dark:hover:text-text-dark transition-colors"
                  >
                    Standard Score (Wikipedia)
                  </a>
                </li>
                <li>
                  <a
                    href="https://en.wikipedia.org/wiki/Flynn_effect"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:text-text dark:hover:text-text-dark transition-colors"
                  >
                    Flynn Effect (Wikipedia)
                  </a>
                </li>
                <li>
                  Flynn, J. R. (1987). Massive IQ gains in 14 nations: What IQ tests really
                  measure. <em>Psychological Bulletin</em>, 101(2), 171-191.
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
