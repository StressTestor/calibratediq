import type { Metadata } from 'next';
import Link from 'next/link';
import { AdPlaceholder } from '@/components/ad-placeholder';

export const metadata: Metadata = {
  title: 'IQ Scale and Score Chart — What Your Score Means',
  description:
    'Complete IQ scale with score ranges, classifications, percentile ranks, and rarity. Understand what each IQ score means in practical terms.',
  keywords: [
    'IQ scale',
    'IQ chart',
    'IQ score range',
    'IQ percentile chart',
    'IQ classification',
    'IQ bell curve',
  ],
  alternates: {
    canonical: 'https://calibratediq.org/learn/iq-scale',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'IQ Scale and Score Chart — What Your Score Means',
  description:
    'A detailed IQ classification table with score ranges, percentile ranks, rarity statistics, and practical interpretations of each level.',
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
  mainEntityOfPage: 'https://calibratediq.org/learn/iq-scale',
};

const classifications = [
  { range: '145+', label: 'Profoundly Gifted', percentile: '99.87+', rarity: '1 in 741', sd: '+3.0 SD and above' },
  { range: '130-144', label: 'Highly Gifted', percentile: '97.7-99.87', rarity: '1 in 44', sd: '+2.0 to +3.0 SD' },
  { range: '120-129', label: 'Superior', percentile: '90.9-97.7', rarity: '1 in 11', sd: '+1.3 to +2.0 SD' },
  { range: '110-119', label: 'High Average', percentile: '74.8-90.9', rarity: '1 in 4', sd: '+0.67 to +1.3 SD' },
  { range: '90-109', label: 'Average', percentile: '25.2-74.8', rarity: '1 in 2', sd: '-0.67 to +0.67 SD' },
  { range: '80-89', label: 'Low Average', percentile: '9.1-25.2', rarity: '1 in 4', sd: '-1.3 to -0.67 SD' },
  { range: '70-79', label: 'Borderline', percentile: '2.3-9.1', rarity: '1 in 11', sd: '-2.0 to -1.3 SD' },
  { range: 'Below 70', label: 'Extremely Low', percentile: 'Below 2.3', rarity: '1 in 44', sd: 'Below -2.0 SD' },
];

export default function IQScalePage() {
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
              IQ Scale and Score Chart. What Your Score Means
            </h1>

            {/* Introduction */}
            <section className="mb-10">
              <div className="space-y-3 text-sm leading-relaxed text-muted">
                <p>
                  IQ scores are not arbitrary numbers. They are standardized values placed on a
                  well-defined statistical distribution, allowing any individual score to be
                  compared against the performance of the general population. Understanding the
                  IQ scale requires understanding the{' '}
                  <a
                    href="https://en.wikipedia.org/wiki/Normal_distribution"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:text-text dark:hover:text-text-dark transition-colors"
                  >
                    normal distribution
                  </a>
                  , standard deviations, and percentile ranks.
                </p>
                <p>
                  The standard IQ scale, used by the Wechsler tests and most modern instruments,
                  sets the population mean at 100 and the standard deviation at 15. This means
                  that each 15-point increment above or below 100 represents one standard
                  deviation from the average. For a detailed explanation of{' '}
                  <Link
                    href="/learn/what-is-iq"
                    className="underline hover:text-text dark:hover:text-text-dark transition-colors"
                  >
                    what IQ is and how it developed
                  </Link>
                  , see our companion article.
                </p>
              </div>
            </section>

            {/* CTA 1 */}
            <div className="mb-10 text-center">
              <Link
                href="/tests"
                className="inline-flex items-center justify-center px-6 py-3 text-sm font-medium text-white bg-primary hover:bg-primary-light rounded-lg transition-colors"
              >
                Take a Test
              </Link>
            </div>

            {/* Full classification table */}
            <section className="mb-10">
              <h2 className="text-lg font-semibold mb-3">
                IQ Classification Table
              </h2>
              <div className="space-y-3 text-sm leading-relaxed text-muted mb-6">
                <p>
                  The following table shows the standard IQ classifications, the corresponding
                  percentile ranges, how many standard deviations each range sits from the mean,
                  and an approximate rarity figure indicating how many people in the general
                  population fall into each category.
                </p>
              </div>
              <div className="border border-border dark:border-border-dark rounded-lg overflow-hidden overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-neutral-50 dark:bg-neutral-800/50 border-b border-border dark:border-border-dark">
                      <th className="text-left px-4 py-2.5 font-medium text-muted">
                        IQ Range
                      </th>
                      <th className="text-left px-4 py-2.5 font-medium text-muted">
                        Classification
                      </th>
                      <th className="text-left px-4 py-2.5 font-medium text-muted">
                        Standard Deviation
                      </th>
                      <th className="text-right px-4 py-2.5 font-medium text-muted">
                        Percentile
                      </th>
                      <th className="text-right px-4 py-2.5 font-medium text-muted">
                        Rarity
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {classifications.map((row) => (
                      <tr
                        key={row.range}
                        className="border-b border-border dark:border-border-dark last:border-0"
                      >
                        <td className="px-4 py-2.5 tabular-nums font-medium">
                          {row.range}
                        </td>
                        <td className="px-4 py-2.5">{row.label}</td>
                        <td className="px-4 py-2.5 tabular-nums text-xs">
                          {row.sd}
                        </td>
                        <td className="px-4 py-2.5 text-right tabular-nums">
                          {row.percentile}
                        </td>
                        <td className="px-4 py-2.5 text-right tabular-nums">
                          {row.rarity}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* Ad between sections */}
            <div className="mb-10">
              <AdPlaceholder zone="banner" />
            </div>

            {/* Bell curve explanation */}
            <section className="mb-10">
              <h2 className="text-lg font-semibold mb-3">
                The Bell Curve Explained
              </h2>
              <div className="space-y-3 text-sm leading-relaxed text-muted">
                <p>
                  When a large, representative sample of people takes an IQ test, the
                  distribution of their scores forms a symmetrical bell-shaped curve. The peak
                  of the curve sits at the mean (100), and scores become progressively rarer
                  as they move further from the center in either direction.
                </p>
                <p>
                  The key property of this distribution is predictability. Exactly 34.13% of
                  scores fall between the mean and one standard deviation above it (100-115),
                  and the same percentage falls between the mean and one standard deviation
                  below (85-100). Combined, 68.26% of all scores fall within one standard
                  deviation of the mean.
                </p>
                <p>
                  At two standard deviations (70-130), the coverage rises to 95.44%. At three
                  standard deviations (55-145), it reaches 99.73%. Scores beyond three standard
                  deviations in either direction are exceptionally rare, occurring in fewer
                  than 3 people per 1,000.
                </p>
                <p>
                  For the mathematical details of how raw test scores are converted into this
                  distribution, see{' '}
                  <Link
                    href="/learn/how-iq-is-calculated"
                    className="underline hover:text-text dark:hover:text-text-dark transition-colors"
                  >
                    how IQ is calculated
                  </Link>.
                </p>
              </div>
            </section>

            {/* Practical meaning */}
            <section className="mb-10">
              <h2 className="text-lg font-semibold mb-3">
                What Each Range Means in Practice
              </h2>
              <div className="space-y-3 text-sm leading-relaxed text-muted">
                <h3 className="text-sm font-semibold text-text dark:text-text-dark mt-4">
                  Average (90-109)
                </h3>
                <p>
                  Roughly half of the population falls within this range. Individuals here
                  typically handle the cognitive demands of most occupations and educational
                  paths without significant difficulty. An IQ of 100 places a person at the
                  50th percentile, meaning they score higher than half the population.
                </p>

                <h3 className="text-sm font-semibold text-text dark:text-text-dark mt-4">
                  High Average to Superior (110-129)
                </h3>
                <p>
                  Scores in this range indicate above-average cognitive ability. Individuals
                  scoring 120 and above (the 91st percentile) often excel in academic settings
                  and are overrepresented in competitive professions. This range encompasses
                  roughly 25% of the population.
                </p>

                <h3 className="text-sm font-semibold text-text dark:text-text-dark mt-4">
                  Gifted (130+)
                </h3>
                <p>
                  A score of 130 or above places a person in the top 2.3% of the population.
                  This is the threshold used by many gifted education programs and by{' '}
                  <a
                    href="https://en.wikipedia.org/wiki/Mensa_International"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:text-text dark:hover:text-text-dark transition-colors"
                  >
                    Mensa International
                  </a>{' '}
                  for membership eligibility (typically the 98th percentile on an approved
                  test). Scores of 145 and above are achieved by approximately 1 in 741 people.
                </p>

                <h3 className="text-sm font-semibold text-text dark:text-text-dark mt-4">
                  Below Average and Borderline (70-89)
                </h3>
                <p>
                  Scores between 80 and 89 are classified as low average. Individuals may
                  benefit from additional support in certain academic or occupational contexts.
                  Scores between 70 and 79 are classified as borderline and may warrant further
                  clinical assessment, particularly if accompanied by difficulties in adaptive
                  functioning.
                </p>

                <h3 className="text-sm font-semibold text-text dark:text-text-dark mt-4">
                  Below 70
                </h3>
                <p>
                  Scores below 70 are classified as extremely low. When combined with
                  significant limitations in adaptive behavior, this range may meet the
                  diagnostic criteria for intellectual disability as defined by the{' '}
                  <a
                    href="https://en.wikipedia.org/wiki/DSM-5"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:text-text dark:hover:text-text-dark transition-colors"
                  >
                    DSM-5
                  </a>
                  . A clinical assessment by a licensed psychologist is essential for any
                  diagnostic determination.
                </p>
              </div>
            </section>

            {/* Important context */}
            <section className="mb-10">
              <h2 className="text-lg font-semibold mb-3">
                Important Context
              </h2>
              <div className="space-y-3 text-sm leading-relaxed text-muted">
                <p>
                  IQ classifications are statistical categories, not judgments of human value.
                  A score reflects performance on a specific set of cognitive tasks under
                  specific conditions. Multiple factors influence test performance, including
                  fatigue, anxiety, familiarity with the test format, and the testing
                  environment.
                </p>
                <p>
                  Different IQ tests may also yield slightly different scores for the same
                  individual, because each test emphasizes different cognitive abilities and
                  uses a different norming sample. A score of 115 on the WAIS does not
                  necessarily correspond to 115 on the Stanford-Binet or on a matrix reasoning
                  test. The{' '}
                  <Link
                    href="/learn/how-iq-is-calculated"
                    className="underline hover:text-text dark:hover:text-text-dark transition-colors"
                  >
                    calculation methodology
                  </Link>{' '}
                  explains why these discrepancies occur.
                </p>
              </div>
            </section>

            {/* CTA 2 */}
            <div className="mb-10 text-center">
              <p className="text-sm text-muted mb-4">
                See where your score falls on the scale. Our test uses Raven&apos;s Progressive
                Matrices methodology to estimate your fluid intelligence.
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
                    href="https://en.wikipedia.org/wiki/IQ_classification"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:text-text dark:hover:text-text-dark transition-colors"
                  >
                    IQ Classification (Wikipedia)
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
                    href="https://en.wikipedia.org/wiki/Mensa_International"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:text-text dark:hover:text-text-dark transition-colors"
                  >
                    Mensa International (Wikipedia)
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
