'use client';

import React, { Suspense, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

function TestRedirect() {
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const seedParam = searchParams.get('s');

    if (seedParam) {
      // Has seed params - backward compatibility: redirect to /test/matrix with same params
      const params = searchParams.toString();
      router.replace(`/test/matrix?${params}`);
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

export default function TestPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-[60vh]">
          <p className="text-sm text-muted">Loading...</p>
        </div>
      }
    >
      <TestRedirect />
    </Suspense>
  );
}
