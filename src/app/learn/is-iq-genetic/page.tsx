import type { Metadata } from 'next';
import Link from 'next/link';
import { AdPlaceholder } from '@/components/ad-placeholder';

export const metadata: Metadata = {
  title: 'Is IQ Genetic? Nature vs Nurture in Intelligence',
  description:
    'An even-handed review of the research on genetics and intelligence: twin studies, heritability estimates, environmental factors, gene-environment interaction, and why the nature vs nurture framing is misleading.',
  keywords: ['is IQ genetic', 'nature vs nurture intelligence', 'heritability of IQ', 'twin studies IQ', 'Wilson effect'],
  alternates: {
    canonical: 'https://calibratediq.org/learn/is-iq-genetic',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Is IQ Genetic? Nature vs Nurture in Intelligence',
  description:
    'A balanced examination of the genetic and environmental contributions to intelligence, including twin studies, heritability, the Wilson effect, and gene-environment interaction.',
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
  mainEntityOfPage: 'https://calibratediq.org/learn/is-iq-genetic',
};

export default function IsIQGeneticPage() {
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
              is IQ genetic? nature vs nurture in intelligence
            </h1>

            {/* Introduction */}
            <section className="mb-10">
              <div className="space-y-3 text-sm leading-relaxed text-muted">
                <p>
                  Few questions in psychology have generated as much research, debate, and
                  misunderstanding as the relative contributions of genes and environment to
                  intelligence. The short answer is that both matter substantially, they interact
                  in complex ways, and the framing of &quot;nature versus nurture&quot; as an
                  either-or question is itself misleading.
                </p>
                <p>
                  This page summarizes the evidence from behavioral genetics, twin studies, adoption
                  studies, and molecular genetics. The research does not support extreme positions
                  on either side. Intelligence is neither purely inherited nor purely environmental.
                  Understanding the interplay between genetic predisposition and environmental
                  influence is essential for interpreting what IQ scores actually represent.
                </p>
              </div>
            </section>

            {/* CTA 1 */}
            <div className="mb-10 text-center">
              <Link
                href="/test"
                className="inline-flex items-center justify-center px-6 py-3 text-sm font-medium text-white bg-primary hover:bg-primary-light rounded-lg transition-colors"
              >
                Genetics or not, find out where you stand
              </Link>
            </div>

            {/* Twin studies */}
            <section className="mb-10">
              <h2 className="text-lg font-semibold mb-3">
                twin studies
              </h2>
              <div className="space-y-3 text-sm leading-relaxed text-muted">
                <p>
                  The most powerful tool for disentangling genetic and environmental influences on
                  intelligence has been the study of twins. Identical (monozygotic) twins share 100%
                  of their DNA, while fraternal (dizygotic) twins share approximately 50%, the same
                  as any pair of siblings. By comparing the correlation of IQ scores between these
                  two types of twins, researchers can estimate the proportion of IQ variation
                  attributable to genetic factors.
                </p>
                <p>
                  The results have been remarkably consistent across decades and countries.{' '}
                  <a
                    href="https://en.wikipedia.org/wiki/Twin_study"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:text-text dark:hover:text-text-dark transition-colors"
                  >
                    Twin studies
                  </a>{' '}
                  find that the IQ correlation for identical twins raised together is approximately
                  0.85-0.90, while the correlation for fraternal twins raised together is
                  approximately 0.55-0.60. The higher correlation for identical twins, who share
                  more genetic material, suggests a substantial genetic component.
                </p>
                <p>
                  Even more informative are studies of identical twins raised apart. The landmark{' '}
                  <a
                    href="https://en.wikipedia.org/wiki/Minnesota_Twin_Family_Study"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:text-text dark:hover:text-text-dark transition-colors"
                  >
                    Minnesota Study of Twins Reared Apart
                  </a>{' '}
                  (MISTRA), led by Thomas Bouchard, found that identical twins separated at birth
                  and raised in different families had IQ correlations of approximately 0.75 — lower
                  than identical twins raised together (0.85), but far higher than fraternal twins
                  raised together (0.55). This pattern indicates that genetic factors play a major
                  role, but shared environment also contributes.
                </p>
              </div>
            </section>

            {/* Ad between sections */}
            <div className="mb-10">
              <AdPlaceholder zone="banner" />
            </div>

            {/* Heritability estimates */}
            <section className="mb-10">
              <h2 className="text-lg font-semibold mb-3">
                heritability estimates
              </h2>
              <div className="space-y-3 text-sm leading-relaxed text-muted">
                <p>
                  Based on twin and adoption studies, the{' '}
                  <a
                    href="https://en.wikipedia.org/wiki/Heritability_of_IQ"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:text-text dark:hover:text-text-dark transition-colors"
                  >
                    heritability of IQ
                  </a>{' '}
                  is estimated at approximately 50-80% in adults. This figure varies by age and
                  population, with heritability being lower in children (approximately 40-50%) and
                  higher in adults (60-80%).
                </p>
                <p>
                  The increase in heritability with age appears paradoxical at first: if anything,
                  older individuals have been exposed to more diverse environmental influences,
                  which might be expected to increase the environmental contribution. The explanation
                  lies in gene-environment correlation, discussed below.
                </p>
                <h3 className="text-sm font-semibold mt-4 mb-2 text-text dark:text-text-dark">
                  what heritability actually means
                </h3>
                <p>
                  Heritability is frequently misunderstood, and getting the definition right is
                  essential. Heritability is a population-level statistic. It describes the
                  proportion of variation in IQ scores within a given population that can be
                  attributed to genetic differences between individuals in that population.
                </p>
                <p>
                  It does not mean that X% of any individual&apos;s IQ is determined by their genes.
                  It does not mean that IQ is &quot;X% genetic.&quot; It does not apply across
                  populations or across different environments. Heritability can change if the
                  environment changes. In a hypothetical society where everyone received identical
                  education, nutrition, and stimulation, the heritability of IQ would approach 100%
                  — because all remaining variation would be genetic. Conversely, in environments
                  with extreme inequality, environmental factors account for more variance, and
                  heritability is lower.
                </p>
              </div>
            </section>

            {/* Environmental factors */}
            <section className="mb-10">
              <h2 className="text-lg font-semibold mb-3">
                environmental factors
              </h2>
              <div className="space-y-3 text-sm leading-relaxed text-muted">
                <p>
                  The environmental component of IQ variation is well-documented. Key factors
                  include:
                </p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    <strong>Education:</strong> Access to quality education is consistently
                    associated with higher IQ scores. Each additional year of schooling is estimated
                    to add 1-5 IQ points, depending on the study. Missing school, conversely,
                    is associated with measurable declines.
                  </li>
                  <li>
                    <strong>Nutrition:</strong> Childhood malnutrition, particularly protein
                    deficiency and micronutrient shortages (iodine, iron, zinc), is associated with
                    lower cognitive development. Iodine supplementation programs in iodine-deficient
                    regions have produced measurable IQ gains.
                  </li>
                  <li>
                    <strong>Socioeconomic status:</strong> Children raised in poverty score lower
                    on IQ tests on average, and adoption studies show that children adopted from
                    low-SES families into high-SES families show IQ gains of 12-18 points.
                  </li>
                  <li>
                    <strong>Lead exposure:</strong> Childhood lead exposure is one of the most
                    well-established environmental toxins affecting IQ. Studies estimate that each
                    10 &#956;g/dL increase in blood lead level is associated with a 2-5 point
                    decrease in IQ.
                  </li>
                  <li>
                    <strong>Prenatal environment:</strong> Maternal health, exposure to alcohol or
                    drugs, infections during pregnancy, and birth complications can all affect
                    cognitive development.
                  </li>
                </ul>
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
                  — the observation that average IQ scores have risen approximately 3 points per
                  decade across the 20th century — provides further evidence that environmental
                  factors can produce large shifts in measured intelligence at the population level.
                  For more on this phenomenon, see{' '}
                  <Link
                    href="/learn/average-iq"
                    className="underline hover:text-text dark:hover:text-text-dark transition-colors"
                  >
                    average IQ scores
                  </Link>.
                </p>
              </div>
            </section>

            {/* Gene-environment interaction */}
            <section className="mb-10">
              <h2 className="text-lg font-semibold mb-3">
                gene-environment interaction and the Wilson effect
              </h2>
              <div className="space-y-3 text-sm leading-relaxed text-muted">
                <p>
                  One of the most important findings in intelligence research is that genes and
                  environment do not operate independently. They interact in ways that make the
                  nature-nurture dichotomy fundamentally misleading.
                </p>
                <p>
                  <a
                    href="https://en.wikipedia.org/wiki/Gene%E2%80%93environment_interaction"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:text-text dark:hover:text-text-dark transition-colors"
                  >
                    Gene-environment correlation
                  </a>{' '}
                  occurs when genetic predispositions lead individuals to select, modify, or evoke
                  particular environments. A child with a genetic predisposition for high cognitive
                  ability may seek out intellectually stimulating activities, be placed in advanced
                  educational programs, and receive more encouraging responses from teachers — all
                  of which further develop their cognitive skills. This active gene-environment
                  correlation increases with age as individuals gain more control over their
                  environments.
                </p>
                <p>
                  This mechanism explains the{' '}
                  <a
                    href="https://en.wikipedia.org/wiki/Heritability_of_IQ#Heritability_and_age"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:text-text dark:hover:text-text-dark transition-colors"
                  >
                    Wilson effect
                  </a>
                  : the observation that the heritability of IQ increases from childhood to
                  adulthood. As children grow into adults, they increasingly shape their own
                  environments in ways that amplify genetic predispositions. The result is that
                  genetic influence on IQ appears to grow over time — not because the genes change,
                  but because the environment becomes increasingly correlated with the genotype.
                </p>
              </div>
            </section>

            {/* Epigenetics */}
            <section className="mb-10">
              <h2 className="text-lg font-semibold mb-3">
                epigenetics and molecular genetics
              </h2>
              <div className="space-y-3 text-sm leading-relaxed text-muted">
                <p>
                  <a
                    href="https://en.wikipedia.org/wiki/Epigenetics"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:text-text dark:hover:text-text-dark transition-colors"
                  >
                    Epigenetics
                  </a>{' '}
                  adds another layer of complexity. Environmental experiences can modify gene
                  expression without changing the underlying DNA sequence, through mechanisms such
                  as DNA methylation and histone modification. Stress, nutrition, and toxin exposure
                  can all produce epigenetic changes that affect cognitive development, and some of
                  these changes may be transmissible across generations.
                </p>
                <p>
                  Genome-wide association studies (GWAS) have identified thousands of genetic
                  variants associated with intelligence, each with a very small individual effect.
                  The largest studies to date suggest that no single gene accounts for more than a
                  tiny fraction of IQ variation. Intelligence is highly polygenic — influenced by
                  many thousands of genetic variants, each contributing a negligible amount
                  individually but summing to a substantial collective effect.
                </p>
                <p>
                  These findings undercut any simplistic &quot;gene for intelligence&quot; narrative.
                  The genetic architecture of intelligence is distributed across the genome, and
                  its expression is modulated by environmental context at every stage of development.
                </p>
              </div>
            </section>

            {/* Why the framing is misleading */}
            <section className="mb-10">
              <h2 className="text-lg font-semibold mb-3">
                why &quot;nature vs nurture&quot; is the wrong question
              </h2>
              <div className="space-y-3 text-sm leading-relaxed text-muted">
                <p>
                  The nature versus nurture framing implies a competition between two independent
                  forces. In reality, genes and environment are deeply intertwined. Genes influence
                  which environments a person encounters. Environments influence which genes are
                  expressed. The same genetic predisposition can produce different outcomes in
                  different environments, and the same environment can produce different outcomes
                  in individuals with different genetic profiles.
                </p>
                <p>
                  A more accurate framing is: intelligence develops through the continuous
                  interaction of genetic potential with environmental input. Genes set a range of
                  possible outcomes; environment determines where within that range a person ends
                  up. Neither factor can be meaningfully separated from the other in any individual
                  case.
                </p>
                <p>
                  Understanding this interaction is important for interpreting IQ scores correctly.
                  A score reflects current cognitive performance, shaped by both genetic endowment
                  and lifetime environmental exposure. It is not a measure of innate, fixed
                  potential. For more on what IQ tests actually measure, see{' '}
                  <Link
                    href="/learn/what-is-iq"
                    className="underline hover:text-text dark:hover:text-text-dark transition-colors"
                  >
                    what is IQ
                  </Link>. For information on the different types of cognitive ability assessed, see{' '}
                  <Link
                    href="/learn/fluid-vs-crystallized-intelligence"
                    className="underline hover:text-text dark:hover:text-text-dark transition-colors"
                  >
                    fluid vs crystallized intelligence
                  </Link>.
                </p>
              </div>
            </section>

            {/* CTA 2 */}
            <div className="mb-10 text-center">
              <p className="text-sm text-muted mb-4">
                Whatever the mix of genes and environment, the result is measurable. Our test uses
                matrix reasoning to estimate your fluid intelligence score.
              </p>
              <Link
                href="/test"
                className="inline-flex items-center justify-center px-6 py-3 text-sm font-medium text-white bg-primary hover:bg-primary-light rounded-lg transition-colors"
              >
                Take the free IQ test
              </Link>
            </div>

            {/* References */}
            <section>
              <h2 className="text-lg font-semibold mb-3">references</h2>
              <ul className="space-y-2 text-sm text-muted">
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
                    href="https://en.wikipedia.org/wiki/Twin_study"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:text-text dark:hover:text-text-dark transition-colors"
                  >
                    Twin Study (Wikipedia)
                  </a>
                </li>
                <li>
                  <a
                    href="https://en.wikipedia.org/wiki/Minnesota_Twin_Family_Study"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:text-text dark:hover:text-text-dark transition-colors"
                  >
                    Minnesota Study of Twins Reared Apart (Wikipedia)
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
                    href="https://en.wikipedia.org/wiki/Gene%E2%80%93environment_interaction"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:text-text dark:hover:text-text-dark transition-colors"
                  >
                    Gene-Environment Interaction (Wikipedia)
                  </a>
                </li>
                <li>
                  <a
                    href="https://en.wikipedia.org/wiki/Epigenetics"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:text-text dark:hover:text-text-dark transition-colors"
                  >
                    Epigenetics (Wikipedia)
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
