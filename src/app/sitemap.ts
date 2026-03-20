import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://calibratediq.org';
  const learnArticles = [
    'what-is-iq',
    'iq-scale',
    'fluid-vs-crystallized-intelligence',
    'ravens-progressive-matrices',
    'how-iq-is-calculated',
    'iq-percentile-calculator',
    'mensa-iq-score',
    'average-iq',
    'is-iq-genetic',
    'iq-test-accuracy',
  ];

  const testTypes = ['matrix', 'spatial', 'numerical', 'logical', 'verbal', 'memory'];

  return [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'monthly', priority: 1.0 },
    { url: `${baseUrl}/test`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${baseUrl}/tests`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    ...testTypes.map((slug) => ({
      url: `${baseUrl}/test/${slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
    { url: `${baseUrl}/composite`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/learn`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    ...learnArticles.map((slug) => ({
      url: `${baseUrl}/learn/${slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
    { url: `${baseUrl}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/privacy`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
    { url: `${baseUrl}/terms`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
  ];
}
