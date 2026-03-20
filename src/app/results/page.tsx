'use client';

import React, { Suspense, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

function ResultsRedirect() {
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const seedParam = searchParams.get('s');
    const answersParam = searchParams.get('a');

    if (seedParam && answersParam) {
      // Has result params - backward compatibility: redirect to /results/matrix with same params
      const params = searchParams.toString();
      router.replace(`/results/matrix?${params}`);
    } else {
      // No params - redirect to test selector
      router.replace('/tests');
    }
  }, [searchParams, router]);

  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <p className="text-sm text-muted">Redirecting...</p>
    </div>
  );
}

export default function ResultsPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-[60vh]">
          <p className="text-sm text-muted">Loading...</p>
        </div>
      }
    >
      <ResultsRedirect />
    </Suspense>
  );
}
