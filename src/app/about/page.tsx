import type { Metadata } from 'next';
import { AdPlaceholder } from '@/components/ad-placeholder';

export const metadata: Metadata = {
  title: 'About CalibratedIQ',
  description:
    'CalibratedIQ offers six cognitive domain tests on a normal-distribution IQ scale. Learn how scoring works, what the classifications mean, and the limitations of any online IQ test.',
  openGraph: {
    title: 'About CalibratedIQ',
    description:
      'How CalibratedIQ scores its six cognitive domain tests, what the classifications mean, and where the methodology comes from.',
    url: 'https://calibratediq.org/about',
  },
  alternates: {
    canonical: 'https://calibratediq.org/about',
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
            About CalibratedIQ
          </h1>

          {/* What this is */}
          <section className="mb-10">
            <h2 className="text-lg font-semibold mb-3">What This Is</h2>
            <div className="space-y-3 text-sm leading-relaxed text-muted">
              <p>
                CalibratedIQ is an independent project that offers six
                cognitive domain tests, each scored on the standard
                normal-distribution IQ scale (mean 100, standard deviation 15).
                Completing three or more tests produces a weighted composite
                IQ and a radar chart of your cognitive profile.
              </p>
              <p>
                The project exists because most free online IQ tests either
                require an email to see your score, rely on trivia questions
                unrelated to established psychometrics, or both. Every test
                here runs entirely in your browser, stores results in local
                storage only, and reports scores using the same scale used in
                standardized clinical assessment.
              </p>
            </div>
          </section>

          {/* Cognitive domains covered */}
          <section className="mb-10">
            <h2 className="text-lg font-semibold mb-3">
              Cognitive Domains Measured
            </h2>
            <div className="space-y-3 text-sm leading-relaxed text-muted">
              <p>
                Six tests cover distinct facets of general intelligence (g):
                pattern recognition (Raven-style progressive matrices),
                spatial reasoning, number sequences, logical reasoning,
                verbal reasoning, and working memory. Each test is 30
                questions drawn from a seeded procedural generator, so the
                same seed always produces the same test.
              </p>
              <p>
                Pattern recognition uses matrices modeled on John C.
                Raven&apos;s Progressive Matrices (1936), widely regarded as
                one of the purest measures of fluid intelligence (gf) because
                it relies on abstract geometric patterns rather than language
                or cultural knowledge.
              </p>
            </div>
          </section>

          {/* How scoring works */}
          <section className="mb-10">
            <h2 className="text-lg font-semibold mb-3">How Scoring Works</h2>
            <div className="space-y-3 text-sm leading-relaxed text-muted">
              <p>
                Raw scores (number correct out of 30) are mapped onto a normal
                distribution with a mean of 100 and a standard deviation of
                15, the scale used by the Wechsler Adult Intelligence Scale
                and most modern IQ instruments.
              </p>
              <p>
                On this scale, roughly 68% of scores fall between 85 and 115,
                95% fall between 70 and 130, and 99.7% fall between 55 and
                145. The percentile rank indicates the proportion of the
                general population a given score would be expected to exceed.
              </p>
              <p>
                The composite IQ is computed as a weighted average of the
                individual domain scores, with weights reflecting each
                domain&apos;s contribution to general intelligence as
                reported in the psychometric literature.
              </p>
            </div>
          </section>

          {/* Classifications */}
          <section className="mb-10">
            <h2 className="text-lg font-semibold mb-3">
              IQ Classifications
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
                CalibratedIQ is a screening tool, not a clinical instrument.
                Scores should be read as approximations and are not
                appropriate for diagnostic, educational, or employment
                decisions.
              </p>
              <p>
                Fatigue, distraction, test anxiety, familiarity with the item
                format, and environmental variables all affect performance.
                No online instrument can match the rigor of a proctored
                clinical assessment administered by a licensed psychologist.
              </p>
              <p>
                For a full clinical evaluation of cognitive ability, seek a
                psychologist who can administer a standardized battery such
                as the WAIS-IV or Stanford-Binet under controlled conditions.
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
