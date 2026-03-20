'use client';

import React, { useEffect, useState, use } from 'react';
import Link from 'next/link';
import { ResultsShell } from '@/components/results-shell';
import { isValidTestSlug } from '@/lib/tests/registry';
import { TestType } from '@/lib/tests/types';

interface ResultsTypePageProps {
  params: Promise<{ type: string }>;
}

export default function ResultsTypePage({ params }: ResultsTypePageProps) {
  const resolvedParams = use(params);
  const typeSlug = resolvedParams.type;
  const [testType, setTestType] = useState<TestType | null>(null);
  const [loading, setLoading] = useState(true);
  const [invalid, setInvalid] = useState(false);

  useEffect(() => {
    if (!isValidTestSlug(typeSlug)) {
      setInvalid(true);
      setLoading(false);
      return;
    }

    import(`@/lib/tests/${typeSlug}`)
      .then((mod) => {
        setTestType(mod.default);
        setLoading(false);
      })
      .catch(() => {
        setInvalid(true);
        setLoading(false);
      });
  }, [typeSlug]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <p className="text-sm text-muted">Loading results...</p>
      </div>
    );
  }

  if (invalid || !testType) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <p className="text-lg font-medium mb-2">Test not found</p>
          <p className="text-sm text-muted mb-6">
            &quot;{typeSlug}&quot; is not a valid test type.
          </p>
          <Link
            href="/tests"
            className="inline-flex items-center justify-center px-6 py-2 text-sm font-medium text-white bg-primary hover:bg-primary-light rounded-lg transition-colors"
          >
            Browse all tests
          </Link>
        </div>
      </div>
    );
  }

  return (
    <ResultsShell
      testSlug={testType.slug}
      testName={testType.name}
      generateQuestion={testType.generateQuestion.bind(testType)}
      totalQuestions={testType.totalQuestions}
    />
  );
}
