'use client';

import React from 'react';
import Script from 'next/script';

interface AdPlaceholderProps {
  zone: 'banner' | 'sidebar' | 'interstitial' | 'native';
  className?: string;
}

const ZONE_SIZES: Record<AdPlaceholderProps['zone'], { width: string; height: string }> = {
  banner: { width: '100%', height: '90px' },
  sidebar: { width: '300px', height: '250px' },
  interstitial: { width: '100%', height: '250px' },
  native: { width: '100%', height: '100px' },
};

const ZONE_ENV_MAP: Record<AdPlaceholderProps['zone'], string | undefined> = {
  banner: process.env.NEXT_PUBLIC_MONETAG_BANNER_ZONE,
  sidebar: process.env.NEXT_PUBLIC_MONETAG_BANNER_ZONE,
  interstitial: process.env.NEXT_PUBLIC_MONETAG_INTERSTITIAL_ZONE,
  native: process.env.NEXT_PUBLIC_MONETAG_NATIVE_ZONE,
};

export function AdPlaceholder({ zone, className = '' }: AdPlaceholderProps): React.ReactNode {
  const siteId = process.env.NEXT_PUBLIC_MONETAG_SITE_ID?.trim();
  const zoneId = ZONE_ENV_MAP[zone]?.trim();
  const { width, height } = ZONE_SIZES[zone];

  if (!siteId || !zoneId) {
    return (
      <div
        className={`flex items-center justify-center border-2 border-dashed border-neutral-300 dark:border-neutral-600 rounded text-neutral-400 dark:text-neutral-500 text-sm select-none ${className}`}
        style={{ width, height }}
      >
        Ad ({zone})
      </div>
    );
  }

  return (
    <div className={`w-full ${className}`}>
      <div id={`container-${zoneId}`} style={{ width, minHeight: height }} />
      <Script
        src={`https://alwingore.com/js/${zoneId}/invoke.js`}
        strategy="afterInteractive"
      />
    </div>
  );
}
