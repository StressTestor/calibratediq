import { ImageResponse } from 'next/og';
import { generateTest } from '@/lib/puzzle-generator';
import { computeScore } from '@/lib/scoring';

export const runtime = 'edge';

function decodeAnswersLocal(str: string): number[] {
  return str.split('').map(Number);
}

function decodeSeedLocal(str: string): number {
  return parseInt(str, 36);
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const seedParam = searchParams.get('s');
  const answersParam = searchParams.get('a');

  if (!seedParam || !answersParam || answersParam.length !== 30) {
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

  const seed = decodeSeedLocal(seedParam);
  const answers = decodeAnswersLocal(answersParam);

  const puzzles = generateTest(seed);
  const correctAnswers = puzzles.map(p => p.correctOptionIndex);
  const result = computeScore(answers, correctAnswers);

  const iq = result.iq;
  const percentile = result.percentile;
  const classification = result.classification;

  // Bell curve points (simplified for OG image)
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
        <div style={{ fontSize: 32, color: '#a0a0a0', marginBottom: 8, display: 'flex' }}>
          CalibratedIQ.org
        </div>

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
