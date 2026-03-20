import { ImageResponse } from 'next/og';
import { generateTest } from '@/lib/puzzle-generator';
import { computeScore, calculatePercentile, getClassification } from '@/lib/scoring';
import { TestSlug } from '@/lib/tests/types';

export const runtime = 'edge';

function decodeAnswersLocal(str: string): number[] {
  return str.split('').map(Number);
}

function decodeSeedLocal(str: string): number {
  return parseInt(str, 36);
}

// Test type display names for OG
const TYPE_NAMES: Record<TestSlug, string> = {
  matrix: 'Pattern Recognition',
  spatial: 'Spatial Reasoning',
  numerical: 'Number Sequences',
  logical: 'Logical Reasoning',
  verbal: 'Verbal Reasoning',
  memory: 'Working Memory',
};

function renderScoreImage(iq: number, percentile: number, classification: string, subtitle?: string) {
  const barData = [
    { label: '55', pct: 2 },
    { label: '70', pct: 8 },
    { label: '85', pct: 25 },
    { label: '100', pct: 50 },
    { label: '115', pct: 25 },
    { label: '130', pct: 8 },
    { label: '145', pct: 2 },
  ];

  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          height: '100%',
          backgroundColor: '#0a0a0a',
          color: '#fafafa',
          fontFamily: 'system-ui, sans-serif',
          padding: 48,
        }}
      >
        <div style={{ fontSize: 32, color: '#a0a0a0', marginBottom: 4, display: 'flex' }}>
          CalibratedIQ.org
        </div>

        {subtitle && (
          <div style={{ fontSize: 22, color: '#5eead4', marginBottom: 8, display: 'flex' }}>
            {subtitle}
          </div>
        )}

        <div style={{ fontSize: 120, fontWeight: 700, lineHeight: 1, marginBottom: 4, display: 'flex' }}>
          {iq}
        </div>

        <div style={{ fontSize: 36, fontWeight: 600, color: '#60a5fa', marginBottom: 8, display: 'flex' }}>
          {classification}
        </div>

        <div style={{ fontSize: 28, color: '#a0a0a0', marginBottom: 40, display: 'flex' }}>
          Scored higher than {percentile}% of the population
        </div>

        {/* Simplified bell curve as bars */}
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8, height: 120 }}>
          {barData.map((bar) => {
            const isActive = Math.abs(iq - parseInt(bar.label)) <= 7;
            return (
              <div
                key={bar.label}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 4,
                }}
              >
                <div
                  style={{
                    width: 80,
                    height: bar.pct * 2,
                    backgroundColor: isActive ? '#60a5fa' : '#333',
                    borderRadius: 4,
                    display: 'flex',
                  }}
                />
                <div style={{ fontSize: 16, color: isActive ? '#60a5fa' : '#666', display: 'flex' }}>
                  {bar.label}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}

function renderDefaultImage() {
  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          height: '100%',
          backgroundColor: '#0a0a0a',
          color: '#fafafa',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        <div style={{ fontSize: 64, fontWeight: 700, marginBottom: 16, display: 'flex' }}>
          CalibratedIQ.org
        </div>
        <div style={{ fontSize: 28, color: '#a0a0a0', display: 'flex' }}>
          Free Scientific IQ Assessment
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const seedParam = searchParams.get('s');
  const answersParam = searchParams.get('a');
  const typeParam = searchParams.get('type');

  // Check for composite params
  const compositeShorts: Record<string, TestSlug> = {
    mx: 'matrix', sp: 'spatial', nm: 'numerical',
    lg: 'logical', vb: 'verbal', mm: 'memory',
  };
  const hasCompositeParams = Object.keys(compositeShorts).some(k => searchParams.has(k));

  if (hasCompositeParams) {
    // Composite OG image - compute a simple average of provided IQs
    // We can't import all test generators in edge runtime easily,
    // so accept a pre-computed 'iq' param for composite
    const iqParam = searchParams.get('iq');
    const countParam = searchParams.get('n');

    if (iqParam) {
      const compositeIQ = parseInt(iqParam, 10);
      if (!isNaN(compositeIQ) && compositeIQ >= 55 && compositeIQ <= 145) {
        const percentile = calculatePercentile(compositeIQ);
        const classification = getClassification(compositeIQ);
        const count = countParam ? parseInt(countParam, 10) : 0;
        const subtitle = count > 0 ? `Composite IQ (${count} tests)` : 'Composite IQ';
        return renderScoreImage(compositeIQ, percentile, classification, subtitle);
      }
    }

    return renderDefaultImage();
  }

  // Single test OG image
  if (!seedParam || !answersParam || answersParam.length !== 30) {
    return renderDefaultImage();
  }

  const seed = decodeSeedLocal(seedParam);
  const answers = decodeAnswersLocal(answersParam);

  // For now, all test types use the same scoring math (raw score -> IQ)
  // The matrix test uses puzzle-generator; others use their own generateQuestion.
  // In edge runtime, we can only reliably use the matrix generator.
  // For other types, we accept a pre-computed 'iq' param.
  if (typeParam && typeParam !== 'matrix') {
    const iqParam = searchParams.get('iq');
    if (iqParam) {
      const iq = parseInt(iqParam, 10);
      if (!isNaN(iq) && iq >= 55 && iq <= 145) {
        const percentile = calculatePercentile(iq);
        const classification = getClassification(iq);
        const typeName = TYPE_NAMES[typeParam as TestSlug] ?? typeParam;
        return renderScoreImage(iq, percentile, classification, typeName);
      }
    }
    return renderDefaultImage();
  }

  // Default: matrix test (original behavior)
  const puzzles = generateTest(seed);
  const correctAnswers = puzzles.map(p => p.correctOptionIndex);
  const result = computeScore(answers, correctAnswers);

  const subtitle = typeParam === 'matrix' ? TYPE_NAMES.matrix : undefined;
  return renderScoreImage(result.iq, result.percentile, result.classification, subtitle);
}
