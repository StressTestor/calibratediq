import type { Metadata } from 'next';
import Link from 'next/link';
import { AdPlaceholder } from '@/components/ad-placeholder';
import { PercentileCalculator } from '@/components/percentile-calculator';

export const metadata: Metadata = {
  title: 'IQ Percentile Calculator — Find Your Ranking',
  description:
    'Use this free IQ percentile calculator to find out what percentile your IQ score falls in, what classification it corresponds to, and how you compare to the general population.',
  keywords: ['IQ percentile', 'IQ percentile calculator', 'what percentile is my IQ', 'IQ ranking', 'IQ bell curve'],
  alternates: {
    canonical: 'https://calibratediq.org/learn/iq-percentile-calculator',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'IQ Percentile Calculator — Find Your Ranking',
  description:
    'A free interactive tool to calculate your IQ percentile, along with an explanation of how IQ percentiles work, what they mean, and why the relationship between IQ and percentile is non-linear.',
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
  mainEntityOfPage: 'https://calibratediq.org/learn/iq-percentile-calculator',
};

export default function IQPercentileCalculatorPage() {
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
              IQ Percentile Calculator: Find Your Ranking
            </h1>

            {/* Introduction */}
            <section className="mb-10">
              <div className="space-y-3 text-sm leading-relaxed text-muted">
                <p>
                  An IQ score on its own is a number. What gives that number meaning is its position
                  relative to the rest of the population. Percentiles provide this context: they tell
                  you the percentage of people who scored at or below a given value. If you are in
                  the 85th percentile, 85 percent of the norming population scored at or below your level.
                </p>
                <p>
                  Use the calculator below to convert any IQ score into its corresponding percentile,
                  classification, and population comparison. The results are based on the standard
                  normal distribution with a mean of 100 and a standard deviation of 15, which is the
                  scoring model used by the{' '}
                  <a
                    href="https://en.wikipedia.org/wiki/Wechsler_Adult_Intelligence_Scale"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:text-text dark:hover:text-text-dark transition-colors"
                  >
                    Wechsler Adult Intelligence Scale
                  </a>{' '}
                  and most modern IQ tests.
                </p>
              </div>
            </section>

            {/* Calculator widget */}
            <section className="mb-10">
              <PercentileCalculator />
            </section>

            {/* CTA 1 */}
            <div className="mb-10 text-center">
              <p className="text-sm text-muted mb-4">
                Want to find out your actual percentile? Our test uses matrix reasoning to
                estimate your fluid intelligence score and place you on the distribution.
              </p>
              <Link
                href="/tests"
                className="inline-flex items-center justify-center px-6 py-3 text-sm font-medium text-white bg-primary hover:bg-primary-light rounded-lg transition-colors"
              >
                Get Your Real Percentile
              </Link>
            </div>

            {/* What percentiles mean */}
            <section className="mb-10">
              <h2 className="text-lg font-semibold mb-3">
                What Percentiles Mean
              </h2>
              <div className="space-y-3 text-sm leading-relaxed text-muted">
                <p>
                  A percentile is a statistical measure indicating the value below which a given
                  percentage of observations fall. In the context of IQ testing, the 50th percentile
                  corresponds to an IQ of exactly 100, the population mean. Half of all test-takers
                  score above this point, and half score below.
                </p>
                <p>
                  Percentiles are not the same as percentages correct on a test. Getting 90% of
                  questions right does not mean you are in the 90th percentile. Percentile rank is
                  determined by comparing your score to the distribution of scores in the norming
                  sample, not by the raw number of items answered correctly.
                </p>
                <p>
                  Percentiles are also distinct from standard scores. While an IQ score is a standard
                  score (with defined mean and standard deviation), the percentile is its cumulative
                  probability equivalent. The two convey the same underlying information in different
                  formats, but percentiles are often more intuitive for non-specialists to interpret.
                </p>
              </div>
            </section>

            {/* Ad between sections */}
            <div className="mb-10">
              <AdPlaceholder zone="banner" />
            </div>

            {/* Non-linear relationship */}
            <section className="mb-10">
              <h2 className="text-lg font-semibold mb-3">
                The Non-Linear Relationship Between IQ and Percentile
              </h2>
              <div className="space-y-3 text-sm leading-relaxed text-muted">
                <p>
                  One of the most important features of the IQ-percentile relationship is that it
                  is non-linear, especially at the tails of the distribution. Near the center of the
                  bell curve, where most people cluster, small changes in IQ correspond to large
                  changes in percentile. Moving from IQ 100 to IQ 105 shifts you from the 50th
                  percentile to roughly the 63rd, a jump of 13 percentile points from just 5 IQ
                  points.
                </p>
                <p>
                  At the extremes, the opposite occurs. Moving from IQ 135 to IQ 140 shifts you
                  from approximately the 99.0th percentile to the 99.6th, a difference of only
                  0.6 percentile points for the same 5-point IQ increase. This is because the{' '}
                  <a
                    href="https://en.wikipedia.org/wiki/Normal_distribution"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:text-text dark:hover:text-text-dark transition-colors"
                  >
                    normal distribution
                  </a>{' '}
                  has thin tails: very few people score in the extreme ranges, so each additional
                  point represents a vanishingly small segment of the population.
                </p>
                <p>
                  This non-linearity means that percentile comparisons become less meaningful at the
                  extremes. The difference between the 50th and 60th percentile is far more
                  practically significant than the difference between the 99th and 99.5th percentile.
                  For a detailed breakdown of score ranges, see the{' '}
                  <Link
                    href="/learn/iq-scale"
                    className="underline hover:text-text dark:hover:text-text-dark transition-colors"
                  >
                    IQ scale and score chart
                  </Link>.
                </p>
              </div>
            </section>

            {/* How percentiles are calculated */}
            <section className="mb-10">
              <h2 className="text-lg font-semibold mb-3">
                How Percentiles Are Calculated
              </h2>
              <div className="space-y-3 text-sm leading-relaxed text-muted">
                <p>
                  The percentile for a given IQ score is derived from the{' '}
                  <a
                    href="https://en.wikipedia.org/wiki/Cumulative_distribution_function"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:text-text dark:hover:text-text-dark transition-colors"
                  >
                    cumulative distribution function
                  </a>{' '}
                  (CDF) of the normal distribution. The process involves converting the IQ score
                  to a z-score using the formula: z = (IQ - 100) / 15. The z-score represents how
                  many standard deviations the score is from the mean. The CDF then gives the
                  probability that a randomly selected person from the population would score at
                  or below that z-value.
                </p>
                <p>
                  For example, an IQ of 115 yields a z-score of 1.0. The CDF at z = 1.0 is
                  approximately 0.8413, so an IQ of 115 falls at the 84th percentile. An IQ of 130
                  yields z = 2.0, and the CDF gives approximately 0.9772, the 98th percentile.
                  For a deeper exploration of the mathematics, see{' '}
                  <Link
                    href="/learn/how-iq-is-calculated"
                    className="underline hover:text-text dark:hover:text-text-dark transition-colors"
                  >
                    how IQ is calculated
                  </Link>.
                </p>
              </div>
            </section>

            {/* Practical significance */}
            <section className="mb-10">
              <h2 className="text-lg font-semibold mb-3">
                Practical Significance of Percentile Rankings
              </h2>
              <div className="space-y-3 text-sm leading-relaxed text-muted">
                <p>
                  Percentiles provide a frame of reference, but they should not be over-interpreted.
                  A percentile ranking tells you where a score falls in a distribution. It does not
                  tell you what a person can or cannot do. The difference between the 70th and 75th
                  percentile is statistically real but practically negligible in most real-world
                  contexts.
                </p>
                <p>
                  Percentile rankings are most useful at the extremes, where they can inform
                  clinical or educational decisions. Scores below the 2nd percentile (IQ below 70)
                  may indicate intellectual disability and warrant further assessment. Scores above
                  the 98th percentile (IQ 130 or higher) may qualify an individual for gifted
                  education programs or membership in organizations like{' '}
                  <Link
                    href="/learn/mensa-iq-score"
                    className="underline hover:text-text dark:hover:text-text-dark transition-colors"
                  >
                    Mensa
                  </Link>.
                </p>
                <p>
                  It is also worth noting that percentiles from different tests are only comparable
                  when both tests use the same norming model (mean 100, SD 15). Some tests, such
                  as the Cattell III B, use a standard deviation of 24, which produces numerically
                  higher scores for the same percentile. Always check the scoring scale before
                  comparing results across tests. For more on how different scales relate, see{' '}
                  <Link
                    href="/learn/what-is-iq"
                    className="underline hover:text-text dark:hover:text-text-dark transition-colors"
                  >
                    what is IQ
                  </Link>.
                </p>
              </div>
            </section>

            {/* Common percentile reference table */}
            <section className="mb-10">
              <h2 className="text-lg font-semibold mb-3">
                IQ to Percentile Reference Table
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left border-collapse">
                  <thead>
                    <tr className="border-b border-neutral-200 dark:border-neutral-700">
                      <th className="py-2 pr-4 font-medium text-muted">IQ Score</th>
                      <th className="py-2 pr-4 font-medium text-muted">Percentile</th>
                      <th className="py-2 font-medium text-muted">Rarity</th>
                    </tr>
                  </thead>
                  <tbody className="text-muted">
                    <tr className="border-b border-neutral-100 dark:border-neutral-800">
                      <td className="py-2 pr-4">70</td>
                      <td className="py-2 pr-4">2nd</td>
                      <td className="py-2">1 in 44</td>
                    </tr>
                    <tr className="border-b border-neutral-100 dark:border-neutral-800">
                      <td className="py-2 pr-4">85</td>
                      <td className="py-2 pr-4">16th</td>
                      <td className="py-2">1 in 6</td>
                    </tr>
                    <tr className="border-b border-neutral-100 dark:border-neutral-800">
                      <td className="py-2 pr-4">100</td>
                      <td className="py-2 pr-4">50th</td>
                      <td className="py-2">1 in 2</td>
                    </tr>
                    <tr className="border-b border-neutral-100 dark:border-neutral-800">
                      <td className="py-2 pr-4">115</td>
                      <td className="py-2 pr-4">84th</td>
                      <td className="py-2">1 in 6</td>
                    </tr>
                    <tr className="border-b border-neutral-100 dark:border-neutral-800">
                      <td className="py-2 pr-4">130</td>
                      <td className="py-2 pr-4">98th</td>
                      <td className="py-2">1 in 44</td>
                    </tr>
                    <tr>
                      <td className="py-2 pr-4">145</td>
                      <td className="py-2 pr-4">99.9th</td>
                      <td className="py-2">1 in 741</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* CTA 2 */}
            <div className="mb-10 text-center">
              <p className="text-sm text-muted mb-4">
                A calculator gives you theory. An actual test gives you data.
                Find out where you really fall on the curve.
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
                    href="https://en.wikipedia.org/wiki/Percentile"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:text-text dark:hover:text-text-dark transition-colors"
                  >
                    Percentile (Wikipedia)
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
