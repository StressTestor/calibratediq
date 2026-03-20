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
    title: 'what is IQ?',
    desc: 'The history and meaning of the intelligence quotient, from Binet to modern testing.',
  },
  {
    href: '/learn/iq-scale',
    title: 'IQ scale and score chart',
    desc: 'What each IQ range means, with percentiles, classifications, and rarity statistics.',
  },
  {
    href: '/learn/fluid-vs-crystallized-intelligence',
    title: 'fluid vs crystallized intelligence',
    desc: 'Two types of cognitive ability, how they change with age, and why matrix tests measure one over the other.',
  },
  {
    href: '/learn/ravens-progressive-matrices',
    title: "Raven's Progressive Matrices",
    desc: 'The gold standard culture-fair IQ test, created in 1936 and still used worldwide.',
  },
  {
    href: '/learn/how-iq-is-calculated',
    title: 'how IQ scores are calculated',
    desc: 'The math behind the number: normal distributions, z-scores, percentiles, and the Flynn effect.',
  },
  {
    href: '/learn/iq-percentile-calculator',
    title: 'IQ percentile calculator',
    desc: 'Enter any IQ score and instantly see your percentile rank, classification, and bell curve position.',
  },
  {
    href: '/learn/mensa-iq-score',
    title: 'what IQ do you need for Mensa?',
    desc: 'Mensa requirements, accepted tests, how to join, and what the test is actually like.',
  },
  {
    href: '/learn/average-iq',
    title: 'average IQ scores',
    desc: 'How IQ varies by age and population, the Flynn effect, and why cross-country comparisons are misleading.',
  },
  {
    href: '/learn/is-iq-genetic',
    title: 'is IQ genetic?',
    desc: 'Twin studies, heritability estimates, environmental factors, and why nature vs nurture is the wrong framing.',
  },
  {
    href: '/learn/iq-test-accuracy',
    title: 'are online IQ tests accurate?',
    desc: 'What makes a good test vs a bad one, and how to evaluate whether your score means anything.',
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

      <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mb-3">
        learn about IQ testing
      </h1>
      <p className="text-sm text-muted mb-6">
        Free guides on intelligence testing, scoring methodology, and cognitive
        science.
      </p>

      <Link
        href="/test"
        className="inline-block px-5 py-2.5 text-sm font-medium bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors mb-10"
      >
        Take the test
      </Link>

      {/* First 5 cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        {firstHalf.map((article) => (
          <Link
            key={article.href}
            href={article.href}
            className="group block p-5 rounded-lg border border-border dark:border-border-dark hover:border-primary/40 dark:hover:border-primary-light/40 transition-colors"
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
            className="group block p-5 rounded-lg border border-border dark:border-border-dark hover:border-primary/40 dark:hover:border-primary-light/40 transition-colors"
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
