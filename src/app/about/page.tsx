import type { Metadata } from 'next';
import { AdPlaceholder } from '@/components/ad-placeholder';

export const metadata: Metadata = {
  title: 'About the Test',
  description:
    'Learn about the Raven\'s Progressive Matrices methodology behind CalibratedIQ, how scoring works, and what IQ scores mean.',
  openGraph: {
    title: 'About the Test | CalibratedIQ',
    description:
      'Learn about the Raven\'s Progressive Matrices methodology behind CalibratedIQ.',
    url: 'https://calibratediq.org/about',
  },
};

const classifications = [
  { range: '145+', label: 'Profoundly Gifted', percentile: '99.9+' },
  { range: '130-144', label: 'Highly Gifted', percentile: '98-99.9' },
  { range: '120-129', label: 'Superior', percentile: '91-97' },
  { range: '110-119', label: 'Above Average', percentile: '75-90' },
  { range: '90-109', label: 'Average', percentile: '25-74' },
  { range: '80-89', label: 'Below Average', percentile: '9-24' },
  { range: '70-79', label: 'Borderline', percentile: '2-8' },
  { range: 'Below 70', label: 'Below 70', percentile: 'Below 2' },
];

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10 sm:py-16">
      <div className="flex flex-col lg:flex-row gap-10">
        {/* Main content */}
        <div className="flex-1 max-w-2xl">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mb-8">
            About the test
          </h1>

          {/* Raven's Progressive Matrices */}
          <section className="mb-10">
            <h2 className="text-lg font-semibold mb-3">
              Raven&apos;s Progressive Matrices
            </h2>
            <div className="space-y-3 text-sm leading-relaxed text-muted">
              <p>
                Raven&apos;s Progressive Matrices (RPM) is a nonverbal
                intelligence test originally designed by John C. Raven in
                1936. It is widely regarded as one of the purest measures of
                fluid intelligence (gf), the ability to reason and solve
                novel problems independent of previously acquired knowledge.
              </p>
              <p>
                The test presents a series of visual patterns arranged in a
                matrix, with one element missing. The test-taker must
                identify the underlying rules governing the pattern
                (rotation, color progression, shape transformation, etc.)
                and select the correct missing piece from a set of options.
              </p>
              <p>
                Because RPM relies on abstract geometric patterns rather
                than language or cultural knowledge, it is considered one of
                the most culture-fair intelligence tests available. It has
                been used extensively in research and clinical settings for
                over 80 years.
              </p>
            </div>
          </section>

          {/* How scoring works */}
          <section className="mb-10">
            <h2 className="text-lg font-semibold mb-3">
              How scoring works
            </h2>
            <div className="space-y-3 text-sm leading-relaxed text-muted">
              <p>
                Raw scores (number of correct answers out of 30) are mapped
                onto a normal distribution with a mean of 100 and a standard
                deviation of 15, which is the standard scale used in IQ
                testing (the Wechsler scale).
              </p>
              <p>
                This means approximately 68% of scores fall between 85 and
                115, approximately 95% fall between 70 and 130, and
                approximately 99.7% fall between 55 and 145. Your
                percentile rank indicates the percentage of the general
                population you would be expected to score higher than.
              </p>
            </div>
          </section>

          {/* Classifications */}
          <section className="mb-10">
            <h2 className="text-lg font-semibold mb-3">
              What IQ scores mean
            </h2>
            <div className="border border-border dark:border-border-dark rounded-lg overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-neutral-50 dark:bg-neutral-800/50 border-b border-border dark:border-border-dark">
                    <th className="text-left px-4 py-2.5 font-medium text-muted">
                      IQ Range
                    </th>
                    <th className="text-left px-4 py-2.5 font-medium text-muted">
                      Classification
                    </th>
                    <th className="text-right px-4 py-2.5 font-medium text-muted">
                      Percentile
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {classifications.map((row) => (
                    <tr
                      key={row.range}
                      className="border-b border-border dark:border-border-dark last:border-0"
                    >
                      <td className="px-4 py-2.5 tabular-nums">
                        {row.range}
                      </td>
                      <td className="px-4 py-2.5">{row.label}</td>
                      <td className="px-4 py-2.5 text-right tabular-nums">
                        {row.percentile}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Limitations */}
          <section className="mb-10">
            <h2 className="text-lg font-semibold mb-3">Limitations</h2>
            <div className="space-y-3 text-sm leading-relaxed text-muted">
              <p>
                This is a screening tool, not a clinical assessment.
                Results from this test should be interpreted as an
                approximation and should not be used for diagnostic,
                educational, or employment decisions.
              </p>
              <p>
                Several factors can affect your score: fatigue,
                distraction, test anxiety, familiarity with matrix-style
                puzzles, and the testing environment. A single online test
                cannot account for these variables with the same rigor as a
                proctored clinical assessment.
              </p>
              <p>
                For a clinical assessment of cognitive ability, consult a
                licensed psychologist who can administer a standardized test
                battery (such as the WAIS-IV or Stanford-Binet) under
                controlled conditions.
              </p>
            </div>
          </section>

          {/* References */}
          <section>
            <h2 className="text-lg font-semibold mb-3">References</h2>
            <ul className="space-y-2 text-sm text-muted">
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
                  href="https://en.wikipedia.org/wiki/Fluid_and_crystallized_intelligence"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-text dark:hover:text-text-dark transition-colors"
                >
                  Fluid and Crystallized Intelligence (Wikipedia)
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
            </ul>
          </section>
        </div>

        {/* Sidebar ad */}
        <div className="lg:w-[300px] shrink-0">
          <div className="sticky top-6">
            <AdPlaceholder zone="sidebar" />
          </div>
        </div>
      </div>
    </div>
  );
}
