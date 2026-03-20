import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Script from 'next/script';
import Link from 'next/link';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { CookieConsent } from '@/components/cookie-consent';
import './globals.css';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'CalibratedIQ - Free IQ Test Based on Raven\'s Progressive Matrices',
    template: '%s | CalibratedIQ',
  },
  other: {
    monetag: 'ea3318283a4679bd550669792643d35d',
  },
  description:
    'Take a free IQ test based on Raven\'s Progressive Matrices. 30 pattern recognition puzzles measuring fluid intelligence. Get your IQ score, percentile rank, and shareable results instantly.',
  keywords: [
    'free IQ test',
    'IQ test online',
    'Raven\'s Progressive Matrices',
    'pattern recognition IQ test',
    'fluid intelligence test',
    'IQ score',
    'intelligence test',
    'cognitive assessment',
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
    title: 'CalibratedIQ - Free IQ Test',
    description:
      'A free, scientifically-grounded IQ assessment based on Raven\'s Progressive Matrices methodology.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CalibratedIQ - Free IQ Test',
    description:
      'A free, scientifically-grounded IQ assessment based on Raven\'s Progressive Matrices methodology.',
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
        <header className="w-full border-b border-border dark:border-border-dark">
          <div className="max-w-4xl mx-auto px-4 py-4">
            <Link
              href="/"
              className="text-lg font-semibold tracking-tight text-text dark:text-text-dark hover:text-primary dark:hover:text-primary-light transition-colors"
            >
              CalibratedIQ
            </Link>
          </div>
        </header>

        {/* Main content */}
        <main className="flex-1">{children}</main>

        {/* Footer */}
        <footer className="w-full border-t border-border dark:border-border-dark mt-auto">
          <div className="max-w-4xl mx-auto px-4 py-6 flex flex-col gap-3">
            <p className="text-xs text-muted">
              For entertainment and educational purposes. Not a clinical diagnostic tool.
            </p>
            <nav className="flex gap-4">
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
