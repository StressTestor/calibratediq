import type { Metadata } from 'next';
import Link from 'next/link';
import { AdPlaceholder } from '@/components/ad-placeholder';

export const metadata: Metadata = {
  title: 'What is IQ? Understanding the Intelligence Quotient',
  description:
    'Learn what IQ means, how it was developed by Binet, Stern, and Wechsler, what it measures and what it does not, and how scores are distributed across the population.',
  keywords: ['what is IQ', 'IQ meaning', 'intelligence quotient', 'IQ definition', 'IQ history'],
  alternates: {
    canonical: 'https://calibratediq.org/learn/what-is-iq',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'What is IQ? Understanding the Intelligence Quotient',
  description:
    'A comprehensive guide to the intelligence quotient: its history, what it measures, how scores are distributed, and common misconceptions.',
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
  mainEntityOfPage: 'https://calibratediq.org/learn/what-is-iq',
};

export default function WhatIsIQPage() {
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
              What Is IQ? Understanding the Intelligence Quotient
            </h1>

            {/* Introduction */}
            <section className="mb-10">
              <div className="space-y-3 text-sm leading-relaxed text-muted">
                <p>
                  IQ, or intelligence quotient, is a standardized score derived from a set of
                  cognitive tests designed to assess human intellectual ability. It is one of the
                  most widely studied and debated constructs in psychology, used in clinical
                  diagnosis, educational placement, and research into the nature of human cognition.
                </p>
                <p>
                  Despite its ubiquity, IQ is frequently misunderstood. It is not a measure of
                  total human worth, creativity, or potential. It is a specific metric that
                  quantifies performance on a narrow set of cognitive tasks relative to the
                  general population. Understanding what IQ actually represents, and what it
                  does not, is essential for interpreting any score you receive.
                </p>
              </div>
            </section>

            {/* CTA 1 */}
            <div className="mb-10 text-center">
              <Link
                href="/tests"
                className="inline-flex items-center justify-center px-6 py-3 text-sm font-medium text-white bg-primary hover:bg-primary-light rounded-lg transition-colors"
              >
                Find Out Yours
              </Link>
            </div>

            {/* History */}
            <section className="mb-10">
              <h2 className="text-lg font-semibold mb-3">
                A Brief History of IQ Testing
              </h2>
              <div className="space-y-3 text-sm leading-relaxed text-muted">
                <p>
                  The concept of measuring intelligence has roots in the early 20th century. In
                  1905, French psychologist{' '}
                  <a
                    href="https://en.wikipedia.org/wiki/Alfred_Binet"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:text-text dark:hover:text-text-dark transition-colors"
                  >
                    Alfred Binet
                  </a>
                  , along with Theodore Simon, developed the first practical intelligence test.
                  The French government had commissioned the work to identify children who needed
                  additional educational support. The Binet-Simon scale assessed a range of
                  cognitive abilities, including memory, attention, and problem-solving, and
                  produced a &quot;mental age&quot; score.
                </p>
                <p>
                  In 1912, German psychologist{' '}
                  <a
                    href="https://en.wikipedia.org/wiki/William_Stern_(psychologist)"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:text-text dark:hover:text-text-dark transition-colors"
                  >
                    William Stern
                  </a>{' '}
                  proposed the term &quot;intelligence quotient.&quot; His original formula was
                  simple: divide the mental age by the chronological age and multiply by 100.
                  A ten-year-old performing at the level of a twelve-year-old would receive an
                  IQ of 120. This ratio IQ worked reasonably well for children but broke down
                  for adults, since cognitive development plateaus while chronological age
                  continues to increase.
                </p>
                <p>
                  The modern approach to IQ scoring was established by{' '}
                  <a
                    href="https://en.wikipedia.org/wiki/David_Wechsler"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:text-text dark:hover:text-text-dark transition-colors"
                  >
                    David Wechsler
                  </a>{' '}
                  in 1939 with the Wechsler-Bellevue Intelligence Scale. Wechsler abandoned the
                  ratio method entirely and instead used a deviation IQ. In this system, scores
                  are compared to the performance of a norming sample of the same age group.
                  The resulting distribution has a mean of 100 and a standard deviation of 15.
                  This is the system still used by all major IQ tests today, including the
                  Wechsler Adult Intelligence Scale (WAIS), the Stanford-Binet, and{' '}
                  <Link
                    href="/learn/ravens-progressive-matrices"
                    className="underline hover:text-text dark:hover:text-text-dark transition-colors"
                  >
                    Raven&apos;s Progressive Matrices
                  </Link>.
                </p>
              </div>
            </section>

            {/* Ad between sections */}
            <div className="mb-10">
              <AdPlaceholder zone="banner" />
            </div>

            {/* What IQ measures */}
            <section className="mb-10">
              <h2 className="text-lg font-semibold mb-3">
                What IQ Measures
              </h2>
              <div className="space-y-3 text-sm leading-relaxed text-muted">
                <p>
                  Modern IQ tests assess several cognitive domains. Verbal comprehension covers
                  vocabulary, general knowledge, and the ability to explain concepts. Perceptual
                  reasoning involves visual-spatial processing and pattern recognition. Working
                  memory tests the capacity to hold and manipulate information in short-term
                  memory. Processing speed measures how quickly a person can perform simple
                  cognitive tasks.
                </p>
                <p>
                  These domains collectively load onto a general factor of intelligence,
                  commonly referred to as{' '}
                  <a
                    href="https://en.wikipedia.org/wiki/G_factor_(psychometrics)"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:text-text dark:hover:text-text-dark transition-colors"
                  >
                    Spearman&apos;s g
                  </a>
                  . The g factor is a statistical construct: people who score well on one type
                  of cognitive test tend to score well on others. IQ scores are best understood
                  as an approximation of g, not as a complete portrait of cognitive ability.
                </p>
                <p>
                  Some tests, like Raven&apos;s Progressive Matrices, focus specifically on{' '}
                  <Link
                    href="/learn/fluid-vs-crystallized-intelligence"
                    className="underline hover:text-text dark:hover:text-text-dark transition-colors"
                  >
                    fluid intelligence
                  </Link>{' '}
                  , the capacity to reason through novel problems without relying on prior
                  knowledge. Others, like the WAIS, measure a broader composite including both
                  fluid and crystallized intelligence.
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
                  IQ scores follow a{' '}
                  <a
                    href="https://en.wikipedia.org/wiki/Normal_distribution"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:text-text dark:hover:text-text-dark transition-colors"
                  >
                    normal distribution
                  </a>{' '}
                  (bell curve) with a mean of 100 and a standard deviation of 15. This means
                  that roughly 68% of the population scores between 85 and 115, approximately
                  95% scores between 70 and 130, and about 99.7% falls between 55 and 145.
                </p>
                <p>
                  A score of 100 is, by definition, average. This does not mean it is
                  &quot;mediocre&quot;; it means that 50% of the population scores above this
                  point and 50% scores below. The further a score deviates from 100, the rarer
                  it is. A score of 130 (two standard deviations above the mean) is achieved by
                  roughly 2.3% of the population. A score of 145 (three standard deviations) is
                  achieved by approximately 0.1%.
                </p>
                <p>
                  For a detailed breakdown of what each score range means, see the{' '}
                  <Link
                    href="/learn/iq-scale"
                    className="underline hover:text-text dark:hover:text-text-dark transition-colors"
                  >
                    IQ scale and score chart
                  </Link>. For the mathematics behind converting raw scores to IQ, see{' '}
                  <Link
                    href="/learn/how-iq-is-calculated"
                    className="underline hover:text-text dark:hover:text-text-dark transition-colors"
                  >
                    how IQ is calculated
                  </Link>.
                </p>
              </div>
            </section>

            {/* What IQ does not measure */}
            <section className="mb-10">
              <h2 className="text-lg font-semibold mb-3">
                What IQ Does Not Measure
              </h2>
              <div className="space-y-3 text-sm leading-relaxed text-muted">
                <p>
                  IQ tests capture a specific slice of cognitive ability. They do not measure
                  creativity, which involves divergent thinking and the generation of novel ideas
                  outside structured problem formats. They do not measure emotional intelligence,
                  the ability to perceive, understand, and manage emotions in oneself and others.
                  They do not measure practical intelligence, often described as &quot;street
                  smarts,&quot; which involves adapting to and shaping real-world environments.
                </p>
                <p>
                  IQ also does not account for motivation, persistence, curiosity, or social
                  skills, all of which play significant roles in academic and professional
                  achievement. Research has consistently shown that IQ is a meaningful predictor
                  of certain outcomes (academic performance, job training success) but far from
                  the only factor. Personality traits, socioeconomic background, education
                  quality, and health all contribute independently.
                </p>
                <p>
                  It is also important to recognize that IQ scores are influenced by
                  environmental factors. Nutrition, education access, test-taking experience,
                  and even the{' '}
                  <a
                    href="https://en.wikipedia.org/wiki/Flynn_effect"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:text-text dark:hover:text-text-dark transition-colors"
                  >
                    Flynn effect
                  </a>{' '}
                  (the observed rise in average IQ scores over generations) all demonstrate that
                  IQ is not a fixed, immutable property.
                </p>
              </div>
            </section>

            {/* Common misconceptions */}
            <section className="mb-10">
              <h2 className="text-lg font-semibold mb-3">
                Common Misconceptions
              </h2>
              <div className="space-y-3 text-sm leading-relaxed text-muted">
                <p>
                  <strong>&quot;IQ measures how smart you are.&quot;</strong> IQ measures
                  performance on a specific set of cognitive tests. &quot;Smartness&quot; is a
                  colloquial term with no precise scientific definition. A person with a high IQ
                  may struggle in areas that require emotional regulation or creative thinking,
                  while a person with an average IQ may excel in practical or artistic domains.
                </p>
                <p>
                  <strong>&quot;IQ is fixed at birth.&quot;</strong> While genetics contribute
                  significantly to IQ variation (heritability estimates range from 50-80% in
                  adults), environmental factors matter considerably, especially in childhood.
                  Education, nutrition, and cognitive stimulation can all influence IQ scores.
                  For more on the genetic and environmental contributions, see{' '}
                  <Link
                    href="/learn/fluid-vs-crystallized-intelligence"
                    className="underline hover:text-text dark:hover:text-text-dark transition-colors"
                  >
                    fluid vs crystallized intelligence
                  </Link>.
                </p>
                <p>
                  <strong>&quot;Online IQ tests are accurate.&quot;</strong> Most online IQ
                  tests lack proper norming, standardized administration, and psychometric
                  validation. A well-designed online test can provide a reasonable estimate,
                  particularly for fluid intelligence measures like matrix reasoning, but it
                  should not be treated as a clinical diagnosis. For a clinical assessment,
                  consult a licensed psychologist.
                </p>
              </div>
            </section>

            {/* CTA 2 */}
            <div className="mb-10 text-center">
              <p className="text-sm text-muted mb-4">
                Curious where you fall on the distribution? Our test uses matrix reasoning
                to estimate your fluid intelligence score.
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
                    href="https://en.wikipedia.org/wiki/Binet%E2%80%93Simon_scale"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:text-text dark:hover:text-text-dark transition-colors"
                  >
                    Binet-Simon Scale (Wikipedia)
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
                    href="https://en.wikipedia.org/wiki/G_factor_(psychometrics)"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:text-text dark:hover:text-text-dark transition-colors"
                  >
                    g Factor (Wikipedia)
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
