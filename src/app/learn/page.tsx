import type { Metadata } from 'next';
import Link from 'next/link';
import { AdPlaceholder } from '@/components/ad-placeholder';

export const metadata: Metadata = {
  title: 'Learn About IQ Testing',
  description:
    'Explore our guides on IQ testing, intelligence research, scoring methodology, and cognitive science. Free educational resources from CalibratedIQ.',
  keywords: [
    'IQ testing guide',
    'intelligence research',
    'IQ explained',
    'cognitive science',
  ],
  alternates: { canonical: 'https://calibratediq.org/learn' },
};

const articles = [
  {
    href: '/learn/what-is-iq',
    title: 'What Is IQ?',
    desc: 'The history and meaning of the intelligence quotient, from Binet to modern psychometric testing.',
  },
  {
    href: '/learn/iq-scale',
    title: 'IQ Scale and Score Chart',
    desc: 'What each IQ range means, with percentiles, classifications, and rarity statistics.',
  },
  {
    href: '/learn/fluid-vs-crystallized-intelligence',
    title: 'Fluid vs Crystallized Intelligence',
    desc: 'Two components of cognitive ability, how they change with age, and which domains measure which.',
  },
  {
    href: '/learn/ravens-progressive-matrices',
    title: "Raven's Progressive Matrices",
    desc: 'The gold-standard culture-fair intelligence test, created in 1936 and still used worldwide.',
  },
  {
    href: '/learn/how-iq-is-calculated',
    title: 'How IQ Scores Are Calculated',
    desc: 'The math behind the number: normal distributions, z-scores, percentiles, and the Flynn effect.',
  },
  {
    href: '/learn/iq-percentile-calculator',
    title: 'IQ Percentile Calculator',
    desc: 'Enter any IQ score to see the percentile rank, classification, and position on the bell curve.',
  },
  {
    href: '/learn/mensa-iq-score',
    title: 'IQ Requirements for Mensa',
    desc: 'Mensa entry criteria, accepted tests, the application process, and what the proctored test is like.',
  },
  {
    href: '/learn/average-iq',
    title: 'Average IQ Scores',
    desc: 'How IQ varies by age and population, the Flynn effect, and why cross-country comparisons mislead.',
  },
  {
    href: '/learn/is-iq-genetic',
    title: 'Is IQ Genetic?',
    desc: 'Twin studies, heritability estimates, environmental factors, and why nature-versus-nurture is the wrong framing.',
  },
  {
    href: '/learn/iq-test-accuracy',
    title: 'Are Online IQ Tests Accurate?',
    desc: 'What separates a reliable test from a novelty one, and how to evaluate whether a given score means anything.',
  },
];

// Static JSON-LD structured data (no user input, safe to serialize)
const jsonLd = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'Learn About IQ Testing',
  description:
    'Free guides on intelligence testing, scoring methodology, and cognitive science.',
  url: 'https://calibratediq.org/learn',
  publisher: {
    '@type': 'Organization',
    name: 'CalibratedIQ',
    url: 'https://calibratediq.org',
  },
  mainEntity: {
    '@type': 'ItemList',
    numberOfItems: articles.length,
    itemListElement: articles.map((article, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      url: `https://calibratediq.org${article.href}`,
      name: article.title,
    })),
  },
});

export default function LearnPage() {
  const firstHalf = articles.slice(0, 5);
  const secondHalf = articles.slice(5);

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 sm:py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd }}
      />

      <span className="cq-badge mb-4">Research &amp; methodology</span>
      <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3">
        Learn about IQ testing
      </h1>
      <p className="text-sm sm:text-base text-muted mb-6 max-w-2xl leading-relaxed">
        Reference material on intelligence testing, scoring methodology, and
        the research behind each cognitive domain.
      </p>

      <Link
        href="/tests"
        className="inline-flex items-center justify-center px-6 py-2.5 text-sm font-semibold bg-primary text-white rounded-xl hover:bg-primary-light transition-colors shadow-sm mb-10"
      >
        Take a test
      </Link>

      {/* First 5 cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        {firstHalf.map((article) => (
          <Link
            key={article.href}
            href={article.href}
            className="group block cq-card-link p-5"
          >
            <h2 className="text-base font-semibold mb-1.5 group-hover:text-primary dark:group-hover:text-primary-light transition-colors">
              {article.title}
            </h2>
            <p className="text-sm text-muted leading-relaxed mb-2">
              {article.desc}
            </p>
            <span className="text-xs font-medium text-primary dark:text-primary-light">
              Read more &rarr;
            </span>
          </Link>
        ))}
      </div>

      <AdPlaceholder zone="banner" className="mb-6" />

      {/* Last 5 cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
        {secondHalf.map((article) => (
          <Link
            key={article.href}
            href={article.href}
            className="group block cq-card-link p-5"
          >
            <h2 className="text-base font-semibold mb-1.5 group-hover:text-primary dark:group-hover:text-primary-light transition-colors">
              {article.title}
            </h2>
            <p className="text-sm text-muted leading-relaxed mb-2">
              {article.desc}
            </p>
            <span className="text-xs font-medium text-primary dark:text-primary-light">
              Read more &rarr;
            </span>
          </Link>
        ))}
      </div>

      <AdPlaceholder zone="banner" />
    </div>
  );
}
