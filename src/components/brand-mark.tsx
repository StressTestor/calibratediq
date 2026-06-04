import React from 'react';

/**
 * CalibratedIQ brand mark: a normal-distribution curve with a score marker,
 * set in a rounded teal tile. Reused in the header and footer.
 */
export function BrandMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      className={className}
      role="img"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="cq-brand" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#14b8a6" />
          <stop offset="100%" stopColor="#0f766e" />
        </linearGradient>
      </defs>
      <rect width="32" height="32" rx="8" fill="url(#cq-brand)" />
      <path
        d="M4 23 C 10 23 11 10 16 10 C 21 10 22 23 28 23"
        fill="none"
        stroke="#ffffff"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <line
        x1="16"
        y1="10.5"
        x2="16"
        y2="23"
        stroke="#ffffff"
        strokeOpacity="0.55"
        strokeWidth="1.5"
        strokeDasharray="2 2"
      />
      <circle cx="16" cy="10" r="2.1" fill="#ffffff" />
    </svg>
  );
}
