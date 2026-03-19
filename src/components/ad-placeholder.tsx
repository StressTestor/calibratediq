import React from 'react';

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
  sidebar: process.env.NEXT_PUBLIC_MONETAG_NATIVE_ZONE,
  interstitial: process.env.NEXT_PUBLIC_MONETAG_INTERSTITIAL_ZONE,
  native: process.env.NEXT_PUBLIC_MONETAG_NATIVE_ZONE,
};

export function AdPlaceholder({ zone, className = '' }: AdPlaceholderProps): React.ReactNode {
  const siteId = process.env.NEXT_PUBLIC_MONETAG_SITE_ID;
  const zoneId = ZONE_ENV_MAP[zone];
  const { width, height } = ZONE_SIZES[zone];

  // Dev mode - no site ID configured
  if (!siteId) {
    return (
      <div
        className={`flex items-center justify-center border-2 border-dashed border-neutral-300 dark:border-neutral-600 rounded text-neutral-400 dark:text-neutral-500 text-sm select-none ${className}`}
        style={{ width, height }}
      >
        Ad ({zone})
      </div>
    );
  }

  // Production mode - render Monetag container
  return (
    <div
      className={className}
      style={{ width, height }}
      data-monetag-site={siteId}
      data-monetag-zone={zoneId}
      data-monetag-type={zone}
    />
  );
}
