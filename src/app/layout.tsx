import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Script from 'next/script';
import Link from 'next/link';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { CookieConsent } from '@/components/cookie-consent';
import { BrandMark } from '@/components/brand-mark';
import './globals.css';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'CalibratedIQ - Free Online IQ Tests with Composite Scoring',
    template: '%s | CalibratedIQ',
  },
  other: {
    monetag: 'ea3318283a4679bd550669792643d35d',
  },
  description:
    'Six free cognitive tests scored on a normal-distribution IQ scale. Complete three or more for a composite IQ and cognitive profile. No signup required.',
  keywords: [
    'free IQ test',
    'IQ test online',
    'cognitive assessment',
    'composite IQ',
    'pattern recognition test',
    'spatial reasoning test',
    'working memory test',
    'verbal reasoning test',
    'logical reasoning test',
    'numerical reasoning test',
    'fluid intelligence test',
  ],
  metadataBase: new URL('https://calibratediq.org'),
  alternates: {
    canonical: 'https://calibratediq.org',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://calibratediq.org',
    siteName: 'CalibratedIQ',
    title: 'CalibratedIQ - Free Online IQ Tests',
    description:
      'Six cognitive domain tests on a normal-distribution IQ scale, plus a weighted composite score.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CalibratedIQ - Free Online IQ Tests',
    description:
      'Six cognitive domain tests on a normal-distribution IQ scale, plus a weighted composite score.',
  },
};

const monetagSiteId = process.env.NEXT_PUBLIC_MONETAG_SITE_ID?.trim();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-bg dark:bg-bg-dark text-text dark:text-text-dark">
        {/* Header */}
        <header className="sticky top-0 z-40 w-full border-b border-border/70 dark:border-border-dark/70 bg-bg/80 dark:bg-bg-dark/75 backdrop-blur-md">
          <div className="max-w-4xl mx-auto px-4 h-14 flex items-center justify-between">
            <Link
              href="/"
              className="flex items-center gap-2 group"
              aria-label="CalibratedIQ home"
            >
              <BrandMark className="h-7 w-7 shrink-0" />
              <span className="text-base font-semibold tracking-tight text-text dark:text-text-dark">
                Calibrated<span className="text-primary dark:text-primary-light">IQ</span>
              </span>
            </Link>
            <nav className="flex items-center gap-1">
              <Link
                href="/tests"
                className="px-3 py-1.5 rounded-md text-sm text-muted hover:text-text dark:hover:text-text-dark hover:bg-surface-2 dark:hover:bg-surface-2-dark transition-colors"
              >
                Tests
              </Link>
              <Link
                href="/learn"
                className="px-3 py-1.5 rounded-md text-sm text-muted hover:text-text dark:hover:text-text-dark hover:bg-surface-2 dark:hover:bg-surface-2-dark transition-colors"
              >
                Learn
              </Link>
            </nav>
          </div>
        </header>

        {/* Main content */}
        <main className="flex-1">{children}</main>

        {/* Footer */}
        <footer className="w-full border-t border-border dark:border-border-dark mt-auto">
          <div className="max-w-4xl mx-auto px-4 py-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-2">
              <BrandMark className="h-6 w-6 shrink-0" />
              <div className="flex flex-col">
                <span className="text-sm font-semibold tracking-tight">
                  Calibrated<span className="text-primary dark:text-primary-light">IQ</span>
                </span>
                <span className="text-xs text-muted">
                  For education and entertainment. Not a clinical diagnostic.
                </span>
              </div>
            </div>
            <nav className="flex flex-wrap gap-x-5 gap-y-2">
              <Link
                href="/tests"
                className="text-xs text-muted hover:text-text dark:hover:text-text-dark transition-colors"
              >
                Tests
              </Link>
              <Link
                href="/learn"
                className="text-xs text-muted hover:text-text dark:hover:text-text-dark transition-colors"
              >
                Learn
              </Link>
              <Link
                href="/about"
                className="text-xs text-muted hover:text-text dark:hover:text-text-dark transition-colors"
              >
                About
              </Link>
              <Link
                href="/privacy"
                className="text-xs text-muted hover:text-text dark:hover:text-text-dark transition-colors"
              >
                Privacy
              </Link>
              <Link
                href="/terms"
                className="text-xs text-muted hover:text-text dark:hover:text-text-dark transition-colors"
              >
                Terms
              </Link>
            </nav>
          </div>
        </footer>

        <CookieConsent />
        <Analytics />
        <SpeedInsights />

        {monetagSiteId && (
          <>
            {/* Monetag multi-tag: handles popunder, vignette, in-page push */}
            <Script
              src={`https://alwingore.com/js/site/${monetagSiteId}.js`}
              strategy="afterInteractive"
            />
            {/* Monetag anti-adblock fallback */}
            <Script
              src="https://quge5.com/88/tag.min.js"
              data-zone={process.env.NEXT_PUBLIC_MONETAG_MULTITAG_ZONE?.trim()}
              strategy="afterInteractive"
            />
          </>
        )}
      </body>
    </html>
  );
}
