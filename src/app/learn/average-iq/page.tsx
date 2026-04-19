import type { Metadata } from 'next';
import Link from 'next/link';
import { AdPlaceholder } from '@/components/ad-placeholder';

export const metadata: Metadata = {
  title: 'Average IQ Scores — By Age, Country, and Population',
  description:
    'Understand what the average IQ score is, how averages differ across age groups and countries, what the Flynn effect is, and why cross-national IQ comparisons require careful interpretation.',
  keywords: ['average IQ', 'average IQ by country', 'average IQ by age', 'Flynn effect', 'IQ statistics'],
  alternates: {
    canonical: 'https://calibratediq.org/learn/average-iq',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Average IQ Scores — By Age, Country, and Population',
  description:
    'A detailed examination of average IQ scores: what they mean statistically, how they vary by age and geography, the Flynn effect, and the limitations of cross-national comparisons.',
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
  mainEntityOfPage: 'https://calibratediq.org/learn/average-iq',
};

export default function AverageIQPage() {
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
              Average IQ Scores: By Age, Country, and Population
            </h1>

            {/* Introduction */}
            <section className="mb-10">
              <div className="space-y-3 text-sm leading-relaxed text-muted">
                <p>
                  The average IQ score is 100. This is not an empirical discovery but a mathematical
                  certainty. IQ tests are specifically designed and periodically re-normed so that
                  the mean score in the general population is always 100, with a standard deviation
                  of 15. Roughly 50% of the population scores between 90 and 109, the range
                  classified as &quot;average&quot; on most{' '}
                  <Link
                    href="/learn/iq-scale"
                    className="underline hover:text-text dark:hover:text-text-dark transition-colors"
                  >
                    IQ classification scales
                  </Link>.
                </p>
                <p>
                  But &quot;average&quot; is more nuanced than a single number. IQ scores vary
                  systematically with age, differ across norming populations, and have been rising
                  over historical time. Understanding these patterns requires distinguishing between
                  the statistical properties of the test and the underlying cognitive abilities being
                  measured.
                </p>
              </div>
            </section>

            {/* CTA 1 */}
            <div className="mb-10 text-center">
              <Link
                href="/tests"
                className="inline-flex items-center justify-center px-6 py-3 text-sm font-medium text-white bg-primary hover:bg-primary-light rounded-lg transition-colors"
              >
                See How You Compare
              </Link>
            </div>

            {/* What average means statistically */}
            <section className="mb-10">
              <h2 className="text-lg font-semibold mb-3">
                What &quot;Average&quot; Means Statistically
              </h2>
              <div className="space-y-3 text-sm leading-relaxed text-muted">
                <p>
                  In the context of IQ testing, &quot;average&quot; refers to the central region
                  of the{' '}
                  <a
                    href="https://en.wikipedia.org/wiki/Normal_distribution"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:text-text dark:hover:text-text-dark transition-colors"
                  >
                    normal distribution
                  </a>
                  . A score of 100 is at the 50th percentile, exactly the median. The &quot;average
                  range&quot; (90-109) encompasses roughly half the population, and these individuals
                  represent the broad middle of cognitive ability as measured by standardized tests.
                </p>
                <p>
                  It is important to understand that scoring &quot;average&quot; on an IQ test is not
                  a negative result. The norming sample includes adults of all educational levels,
                  professions, and backgrounds. An IQ of 100 means performing at the median of the
                  entire adult population, which includes college graduates, skilled professionals,
                  and experts in various fields.
                </p>
                <p>
                  For more on how norming works and how raw scores are converted to IQ, see{' '}
                  <Link
                    href="/learn/how-iq-is-calculated"
                    className="underline hover:text-text dark:hover:text-text-dark transition-colors"
                  >
                    how IQ is calculated
                  </Link>.
                </p>
              </div>
            </section>

            {/* Ad between sections */}
            <div className="mb-10">
              <AdPlaceholder zone="banner" />
            </div>

            {/* IQ across age groups */}
            <section className="mb-10">
              <h2 className="text-lg font-semibold mb-3">
                IQ Across Age Groups
              </h2>
              <div className="space-y-3 text-sm leading-relaxed text-muted">
                <p>
                  Cognitive abilities do not remain constant throughout life, and the trajectory
                  differs depending on the type of intelligence being measured. The{' '}
                  <a
                    href="https://en.wikipedia.org/wiki/Cattell%E2%80%93Horn%E2%80%93Carroll_theory"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:text-text dark:hover:text-text-dark transition-colors"
                  >
                    Cattell-Horn-Carroll theory
                  </a>{' '}
                  distinguishes between two primary forms:
                </p>
                <p>
                  <strong>Fluid intelligence</strong>, the ability to reason through novel problems,
                  identify patterns, and think abstractly, tends to peak in the late twenties and
                  begins a gradual decline thereafter. This is the type of intelligence primarily
                  measured by matrix reasoning tests like{' '}
                  <Link
                    href="/learn/ravens-progressive-matrices"
                    className="underline hover:text-text dark:hover:text-text-dark transition-colors"
                  >
                    Raven&apos;s Progressive Matrices
                  </Link>.
                </p>
                <p>
                  <strong>Crystallized intelligence</strong>, accumulated knowledge, vocabulary,
                  and learned problem-solving strategies, continues to increase well into middle
                  age and often remains stable or even grows into the sixties and seventies. For a
                  detailed comparison, see{' '}
                  <Link
                    href="/learn/fluid-vs-crystallized-intelligence"
                    className="underline hover:text-text dark:hover:text-text-dark transition-colors"
                  >
                    fluid vs crystallized intelligence
                  </Link>.
                </p>
                <p>
                  Because IQ tests are normed within age groups, a 60-year-old who scores 100 has
                  performed at the median for 60-year-olds, not for the population as a whole. This
                  age-norming ensures that the natural decline in fluid intelligence does not
                  artificially deflate older adults&apos; scores.
                </p>
              </div>
            </section>

            {/* The Flynn Effect */}
            <section className="mb-10">
              <h2 className="text-lg font-semibold mb-3">
                The Flynn Effect
              </h2>
              <div className="space-y-3 text-sm leading-relaxed text-muted">
                <p>
                  In the 1980s, political scientist{' '}
                  <a
                    href="https://en.wikipedia.org/wiki/James_Flynn_(academic)"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:text-text dark:hover:text-text-dark transition-colors"
                  >
                    James Flynn
                  </a>{' '}
                  documented a consistent phenomenon: average IQ scores had been rising across
                  generations in every country where data was available. The increase averaged
                  approximately 3 points per decade, though it varied by test type and country.
                </p>
                <p>
                  The gains were largest on tests of fluid intelligence, particularly matrix
                  reasoning tasks, and smallest on tests of crystallized intelligence like
                  vocabulary. This pattern suggests that the increase is not primarily driven by
                  improved education (which would boost crystallized scores more), but rather by
                  environmental changes that affect abstract reasoning capacity.
                </p>
                <p>
                  Proposed explanations include improved nutrition and healthcare, reduced exposure
                  to environmental toxins (especially lead), increased cognitive stimulation from
                  modern environments (visual media, technology, complex systems), smaller family
                  sizes allowing more parental investment, and greater familiarity with standardized
                  testing formats.
                </p>
                <p>
                  The{' '}
                  <a
                    href="https://en.wikipedia.org/wiki/Flynn_effect"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:text-text dark:hover:text-text-dark transition-colors"
                  >
                    Flynn effect
                  </a>{' '}
                  has important implications: it means raw scores from different eras are not
                  directly comparable without re-norming, and it demonstrates that IQ is responsive
                  to environmental conditions at the population level. Some researchers have reported
                  a slowing or reversal of the Flynn effect in certain developed countries since the
                  1990s, though the reasons remain debated.
                </p>
              </div>
            </section>

            {/* Cross-national comparisons */}
            <section className="mb-10">
              <h2 className="text-lg font-semibold mb-3">
                Cross-National IQ Comparisons
              </h2>
              <div className="space-y-3 text-sm leading-relaxed text-muted">
                <p>
                  Researchers have conducted IQ testing across many countries, and these studies
                  show meaningful variation in average scores between nations. However, interpreting
                  these differences requires substantial caution and context.
                </p>
                <p>
                  The most critical factor is that cross-national IQ differences correlate strongly
                  with environmental variables: access to quality education, childhood nutrition,
                  healthcare infrastructure, economic development, and exposure to environmental
                  toxins. Countries with higher GDP per capita, better educational systems, and
                  lower rates of childhood malnutrition consistently produce higher average test
                  scores.
                </p>
                <p>
                  These correlations point to environmental causation, not innate differences between
                  populations. The Flynn effect itself demonstrates this: countries that have
                  undergone rapid economic development have seen their average IQ scores rise
                  dramatically within a single generation, far too quickly to reflect genetic
                  change. For example, gains of 15-20 points over 30 years have been documented
                  in countries experiencing rapid industrialization.
                </p>
                <p>
                  Additional methodological concerns include: sample representativeness (many studies
                  used small, non-representative samples), test cultural bias (items designed in
                  Western contexts may not translate equivalently), language effects, and differences
                  in test-taking motivation and familiarity with testing formats.
                </p>
              </div>
            </section>

            {/* Criticisms */}
            <section className="mb-10">
              <h2 className="text-lg font-semibold mb-3">
                Criticisms of Cross-Country IQ Data
              </h2>
              <div className="space-y-3 text-sm leading-relaxed text-muted">
                <p>
                  The most widely cited cross-national IQ dataset, compiled by Richard Lynn and Tatu
                  Vanhanen, has drawn significant criticism from the psychometric community.
                  Methodological objections include the use of small and non-representative samples,
                  the extrapolation of scores for countries where no testing data existed, and the
                  conflation of scores from different test instruments without proper equating.
                </p>
                <p>
                  Developmental psychologist{' '}
                  <a
                    href="https://en.wikipedia.org/wiki/Richard_Nisbett"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:text-text dark:hover:text-text-dark transition-colors"
                  >
                    Richard Nisbett
                  </a>{' '}
                  and others have argued that cross-national IQ differences are best explained by
                  environmental factors, noting that within-country improvements following
                  environmental changes (better nutrition, expanded education) often match or exceed
                  the between-country differences observed in cross-sectional studies.
                </p>
                <p>
                  The responsible interpretation of cross-national IQ data is that it reflects
                  current environmental conditions and opportunities, not fixed or inherent
                  characteristics of populations. For more on what determines IQ, see{' '}
                  <Link
                    href="/learn/is-iq-genetic"
                    className="underline hover:text-text dark:hover:text-text-dark transition-colors"
                  >
                    is IQ genetic? nature vs nurture in intelligence
                  </Link>.
                </p>
              </div>
            </section>

            {/* CTA 2 */}
            <div className="mb-10 text-center">
              <p className="text-sm text-muted mb-4">
                The average is 100. Where do you fall? Our test uses matrix reasoning to
                measure fluid intelligence and place you on the distribution.
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
                    href="https://en.wikipedia.org/wiki/Flynn_effect"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:text-text dark:hover:text-text-dark transition-colors"
                  >
                    Flynn Effect (Wikipedia)
                  </a>
                </li>
                <li>
                  <a
                    href="https://en.wikipedia.org/wiki/Cattell%E2%80%93Horn%E2%80%93Carroll_theory"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:text-text dark:hover:text-text-dark transition-colors"
                  >
                    Cattell-Horn-Carroll Theory (Wikipedia)
                  </a>
                </li>
                <li>
                  <a
                    href="https://en.wikipedia.org/wiki/Heritability_of_IQ"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:text-text dark:hover:text-text-dark transition-colors"
                  >
                    Heritability of IQ (Wikipedia)
                  </a>
                </li>
                <li>
                  <a
                    href="https://en.wikipedia.org/wiki/Nations_and_intelligence"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:text-text dark:hover:text-text-dark transition-colors"
                  >
                    Nations and Intelligence (Wikipedia)
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
