import type { Metadata } from 'next';
import Link from 'next/link';
import { AdPlaceholder } from '@/components/ad-placeholder';

export const metadata: Metadata = {
  title: "Raven's Progressive Matrices — The Gold Standard IQ Test",
  description:
    "Learn about Raven's Progressive Matrices (RPM): its history, how it works, the three versions (Standard, Advanced, Coloured), why it's culture-fair, and its relationship to general intelligence.",
  keywords: [
    "Raven's progressive matrices",
    'RPM test',
    'matrix reasoning test',
    'culture-fair IQ test',
    'nonverbal intelligence test',
  ],
  alternates: {
    canonical: 'https://calibratediq.org/learn/ravens-progressive-matrices',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: "Raven's Progressive Matrices — The Gold Standard IQ Test",
  description:
    "A comprehensive guide to Raven's Progressive Matrices: its origins, methodology, three versions, and why it remains one of the most widely used intelligence tests in the world.",
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
  mainEntityOfPage: 'https://calibratediq.org/learn/ravens-progressive-matrices',
};

export default function RavensProgressiveMatricesPage() {
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
              Raven&apos;s Progressive Matrices — the gold standard IQ test
            </h1>

            {/* Introduction */}
            <section className="mb-10">
              <div className="space-y-3 text-sm leading-relaxed text-muted">
                <p>
                  Raven&apos;s Progressive Matrices (RPM) is one of the most widely used and
                  extensively researched nonverbal intelligence tests in psychology. Since its
                  creation in 1936, it has been administered to millions of people across
                  dozens of countries and has become a foundational tool in both clinical
                  assessment and cognitive research.
                </p>
                <p>
                  Its enduring popularity stems from a combination of psychometric strength
                  and practical simplicity. The test requires no language, no cultural
                  knowledge, and no formal education to attempt. It measures pure reasoning
                  ability — the capacity to perceive patterns, infer rules, and apply logic
                  to novel visual problems. This makes it one of the strongest available
                  measures of{' '}
                  <Link
                    href="/learn/fluid-vs-crystallized-intelligence"
                    className="underline hover:text-text dark:hover:text-text-dark transition-colors"
                  >
                    fluid intelligence
                  </Link>{' '}
                  and{' '}
                  <a
                    href="https://en.wikipedia.org/wiki/G_factor_(psychometrics)"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:text-text dark:hover:text-text-dark transition-colors"
                  >
                    Spearman&apos;s g factor
                  </a>.
                </p>
              </div>
            </section>

            {/* CTA 1 */}
            <div className="mb-10 text-center">
              <Link
                href="/test"
                className="inline-flex items-center justify-center px-6 py-3 text-sm font-medium text-white bg-primary hover:bg-primary-light rounded-lg transition-colors"
              >
                Take a free RPM-based assessment
              </Link>
            </div>

            {/* History */}
            <section className="mb-10">
              <h2 className="text-lg font-semibold mb-3">
                history and origins
              </h2>
              <div className="space-y-3 text-sm leading-relaxed text-muted">
                <p>
                  The test was created by{' '}
                  <a
                    href="https://en.wikipedia.org/wiki/John_C._Raven"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:text-text dark:hover:text-text-dark transition-colors"
                  >
                    John C. Raven
                  </a>
                  , a British psychologist, in 1936. Raven developed the test as part of his
                  research into the genetic and environmental contributions to intelligence,
                  conducted under the supervision of{' '}
                  <a
                    href="https://en.wikipedia.org/wiki/Charles_Spearman"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:text-text dark:hover:text-text-dark transition-colors"
                  >
                    Charles Spearman
                  </a>{' '}
                  at University College London.
                </p>
                <p>
                  Spearman had proposed the existence of a general factor of intelligence (g)
                  based on the observation that people who perform well on one type of cognitive
                  test tend to perform well on others. Raven set out to create a test that
                  would measure this general factor as directly as possible, with minimal
                  contamination from language ability, educational background, or cultural
                  familiarity.
                </p>
                <p>
                  The result was a test consisting entirely of visual pattern completion
                  problems. The original version, known as the Standard Progressive Matrices
                  (SPM), was first published in 1938. It rapidly gained acceptance in both
                  clinical and military settings, and was used extensively during World War II
                  for personnel selection in the British armed forces.
                </p>
              </div>
            </section>

            {/* Ad between sections */}
            <div className="mb-10">
              <AdPlaceholder zone="banner" />
            </div>

            {/* How it works */}
            <section className="mb-10">
              <h2 className="text-lg font-semibold mb-3">
                how the test works
              </h2>
              <div className="space-y-3 text-sm leading-relaxed text-muted">
                <p>
                  Each item in Raven&apos;s Progressive Matrices presents a visual pattern
                  arranged in a matrix format, typically a 3x3 grid with the bottom-right
                  element missing. The patterns follow specific rules governing attributes
                  such as shape, size, color, orientation, number, and position. The
                  test-taker must analyze the rows and columns of the matrix, identify the
                  governing rules, and select the correct missing element from a set of
                  six to eight options.
                </p>
                <p>
                  The test is &quot;progressive&quot; in that items increase in difficulty
                  as the test proceeds. Early items may involve a single, straightforward
                  rule (such as a shape that rotates 90 degrees in each cell). Later items
                  involve multiple simultaneous rules that must be identified and applied
                  together — for example, a shape that both rotates and changes color
                  while a separate element follows an independent numerical progression.
                </p>
                <p>
                  This progressive structure means the test spans a wide difficulty range
                  and can discriminate effectively across most of the IQ distribution,
                  from below average to highly gifted. For details on how raw scores from
                  such tests are converted to IQ scores, see{' '}
                  <Link
                    href="/learn/how-iq-is-calculated"
                    className="underline hover:text-text dark:hover:text-text-dark transition-colors"
                  >
                    how IQ is calculated
                  </Link>.
                </p>
              </div>
            </section>

            {/* Three versions */}
            <section className="mb-10">
              <h2 className="text-lg font-semibold mb-3">
                the three versions
              </h2>
              <div className="space-y-3 text-sm leading-relaxed text-muted">
                <h3 className="text-sm font-semibold text-text dark:text-text-dark mt-4">
                  standard progressive matrices (SPM)
                </h3>
                <p>
                  The original version, containing 60 items organized in five sets of 12
                  (Sets A through E). It is suitable for the general population aged 6 to 80
                  and covers the full range of intellectual ability from the 5th to the 95th
                  percentile. The SPM is the most commonly administered version in educational
                  and occupational settings.
                </p>

                <h3 className="text-sm font-semibold text-text dark:text-text-dark mt-4">
                  coloured progressive matrices (CPM)
                </h3>
                <p>
                  A simplified version designed for young children (ages 5 to 11), elderly
                  adults, and individuals with moderate or severe learning difficulties.
                  It contains 36 items in three sets (A, Ab, B), with colored backgrounds
                  to make the patterns more visually engaging and accessible. Items from
                  the CPM correspond to the easier sections of the SPM.
                </p>

                <h3 className="text-sm font-semibold text-text dark:text-text-dark mt-4">
                  advanced progressive matrices (APM)
                </h3>
                <p>
                  A more difficult version designed for individuals of above-average ability,
                  typically used with university students, professionals, and in high-stakes
                  selection contexts. It contains 48 items in two sets and provides better
                  discrimination at the upper end of the ability distribution. The APM is
                  particularly useful for identifying giftedness and for research into
                  high-level cognitive processes.
                </p>
              </div>
            </section>

            {/* Culture-fairness */}
            <section className="mb-10">
              <h2 className="text-lg font-semibold mb-3">
                why it is considered culture-fair
              </h2>
              <div className="space-y-3 text-sm leading-relaxed text-muted">
                <p>
                  A test is considered{' '}
                  <a
                    href="https://en.wikipedia.org/wiki/Culture-fair_intelligence_test"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:text-text dark:hover:text-text-dark transition-colors"
                  >
                    culture-fair
                  </a>{' '}
                  when its content does not advantage or disadvantage test-takers based on
                  their cultural background, language, or educational experience.
                  Raven&apos;s Progressive Matrices achieves this through several design
                  choices.
                </p>
                <p>
                  The test uses only abstract geometric patterns. There are no words, numbers,
                  or culturally specific symbols. The instructions can be communicated through
                  demonstration rather than verbal explanation. The reasoning required is
                  inductive and spatial, drawing on cognitive processes that are not
                  contingent on specific educational curricula.
                </p>
                <p>
                  No intelligence test is perfectly culture-free. Familiarity with
                  multiple-choice formats, experience with timed testing, and comfort with
                  abstract visual stimuli can all vary across populations. However, RPM
                  minimizes these biases more effectively than most alternatives, which is
                  why it has been the instrument of choice for cross-cultural intelligence
                  research for nearly a century.
                </p>
              </div>
            </section>

            {/* Relationship to g */}
            <section className="mb-10">
              <h2 className="text-lg font-semibold mb-3">
                relationship to Spearman&apos;s g factor
              </h2>
              <div className="space-y-3 text-sm leading-relaxed text-muted">
                <p>
                  Factor-analytic studies consistently show that Raven&apos;s Progressive
                  Matrices has one of the highest g-loadings of any single test. In other
                  words, performance on RPM is more strongly correlated with the general
                  factor of intelligence than performance on most other cognitive measures.
                </p>
                <p>
                  This makes RPM an efficient tool: a single test, taking 20 to 45 minutes,
                  can provide a reasonably accurate estimate of general cognitive ability.
                  Full IQ batteries like the WAIS-IV take several hours and assess multiple
                  domains (verbal, perceptual, working memory, processing speed), but the
                  composite score they produce correlates very highly (typically r = 0.7 to
                  0.8) with RPM scores.
                </p>
                <p>
                  For a broader discussion of{' '}
                  <Link
                    href="/learn/what-is-iq"
                    className="underline hover:text-text dark:hover:text-text-dark transition-colors"
                  >
                    what IQ measures
                  </Link>{' '}
                  and how different tests approach the same underlying construct, see our
                  introductory article.
                </p>
              </div>
            </section>

            {/* Use in research and clinical settings */}
            <section className="mb-10">
              <h2 className="text-lg font-semibold mb-3">
                use in research and clinical settings
              </h2>
              <div className="space-y-3 text-sm leading-relaxed text-muted">
                <p>
                  In research, RPM is used to study group differences in intelligence,
                  the heritability of cognitive ability, the effects of environmental
                  interventions on IQ, and the neurological underpinnings of reasoning.
                  The{' '}
                  <a
                    href="https://en.wikipedia.org/wiki/Flynn_effect"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:text-text dark:hover:text-text-dark transition-colors"
                  >
                    Flynn effect
                  </a>{' '}
                  — the observed rise in IQ scores over generations — was first documented
                  using RPM data, among other tests.
                </p>
                <p>
                  In clinical settings, RPM is used for cognitive screening, educational
                  placement, giftedness identification, and as part of neuropsychological
                  assessment batteries. It is particularly useful when testing individuals
                  with language disorders, hearing impairments, or limited English
                  proficiency, because it requires no verbal response.
                </p>
                <p>
                  The test has been normed and validated in dozens of countries, with
                  population-specific percentile tables available for most major
                  demographics. For an explanation of how these norms translate raw scores
                  into standard IQ scores, see the{' '}
                  <Link
                    href="/learn/iq-scale"
                    className="underline hover:text-text dark:hover:text-text-dark transition-colors"
                  >
                    IQ scale and score chart
                  </Link>.
                </p>
              </div>
            </section>

            {/* CTA 2 */}
            <div className="mb-10 text-center">
              <p className="text-sm text-muted mb-4">
                Our test uses the same matrix reasoning methodology as Raven&apos;s
                Progressive Matrices to estimate your fluid intelligence score.
              </p>
              <Link
                href="/test"
                className="inline-flex items-center justify-center px-6 py-3 text-sm font-medium text-white bg-primary hover:bg-primary-light rounded-lg transition-colors"
              >
                Take the free assessment
              </Link>
            </div>

            {/* References */}
            <section>
              <h2 className="text-lg font-semibold mb-3">references</h2>
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
                    href="https://en.wikipedia.org/wiki/John_C._Raven"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:text-text dark:hover:text-text-dark transition-colors"
                  >
                    John C. Raven (Wikipedia)
                  </a>
                </li>
                <li>
                  <a
                    href="https://en.wikipedia.org/wiki/Charles_Spearman"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:text-text dark:hover:text-text-dark transition-colors"
                  >
                    Charles Spearman (Wikipedia)
                  </a>
                </li>
                <li>
                  <a
                    href="https://en.wikipedia.org/wiki/Culture-fair_intelligence_test"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:text-text dark:hover:text-text-dark transition-colors"
                  >
                    Culture-Fair Intelligence Test (Wikipedia)
                  </a>
                </li>
                <li>
                  Raven, J. C. (1936). <em>Mental Tests Used in Genetic Studies: The
                  Performance of Related Individuals on Tests Mainly Educative and Mainly
                  Reproductive</em>. MSc Thesis, University of London.
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
