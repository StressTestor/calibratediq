import React from 'react';

interface RadarChartProps {
  scores: Partial<Record<string, number>>; // slug -> IQ score (55-145)
  labels: Record<string, string>; // slug -> display name
}

const IQ_MIN = 55;
const IQ_MAX = 145;
const IQ_AVG = 100;
const IQ_RANGE = IQ_MAX - IQ_MIN;

// Convert an IQ value to a 0-1 fraction within the display range
function iqToFraction(iq: number): number {
  return Math.max(0, Math.min(1, (iq - IQ_MIN) / IQ_RANGE));
}

// Average fraction (IQ 100 position)
const AVG_FRACTION = iqToFraction(IQ_AVG);

export function RadarChart({ scores, labels }: RadarChartProps): React.ReactNode {
  const svgSize = 400;
  const cx = svgSize / 2;
  const cy = svgSize / 2;
  const maxRadius = 140;
  const labelOffset = 28;

  const axes = Object.keys(labels);
  const n = axes.length;
  if (n < 3) return null;

  const angleStep = (2 * Math.PI) / n;
  // Start from top (-PI/2) so first axis points up
  const startAngle = -Math.PI / 2;

  function polarToXY(angle: number, radius: number): [number, number] {
    return [
      cx + radius * Math.cos(angle),
      cy + radius * Math.sin(angle),
    ];
  }

  // Build polygon points for a given set of fractions
  function buildPolygon(fractions: number[]): string {
    return fractions
      .map((f, i) => {
        const angle = startAngle + i * angleStep;
        const [x, y] = polarToXY(angle, f * maxRadius);
        return `${x.toFixed(2)},${y.toFixed(2)}`;
      })
      .join(' ');
  }

  // Reference hexagons at 25%, 50% (avg), 75%, 100%
  const referenceRings = [0.25, AVG_FRACTION, 0.75, 1.0];

  // Build score fractions (missing tests placed at average)
  const scoreFractions = axes.map((slug) => {
    const iq = scores[slug];
    return iq !== undefined ? iqToFraction(iq) : AVG_FRACTION;
  });

  const scorePolygon = buildPolygon(scoreFractions);

  return (
    <div className="w-full max-w-sm mx-auto">
      <svg
        viewBox={`0 0 ${svgSize} ${svgSize}`}
        className="w-full h-auto"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Reference rings */}
        {referenceRings.map((frac, ri) => {
          const pts = axes.map((_, i) => {
            const angle = startAngle + i * angleStep;
            const [x, y] = polarToXY(angle, frac * maxRadius);
            return `${x.toFixed(2)},${y.toFixed(2)}`;
          });
          const isAvg = frac === AVG_FRACTION;
          return (
            <polygon
              key={ri}
              points={pts.join(' ')}
              fill="none"
              stroke="currentColor"
              className="text-neutral-200 dark:text-neutral-700"
              strokeWidth={isAvg ? 1.5 : 0.75}
              strokeDasharray={isAvg ? '6 3' : 'none'}
            />
          );
        })}

        {/* Axis lines */}
        {axes.map((_, i) => {
          const angle = startAngle + i * angleStep;
          const [x, y] = polarToXY(angle, maxRadius);
          return (
            <line
              key={`axis-${i}`}
              x1={cx}
              y1={cy}
              x2={x}
              y2={y}
              stroke="currentColor"
              className="text-neutral-200 dark:text-neutral-700"
              strokeWidth={0.75}
            />
          );
        })}

        {/* Score polygon */}
        <polygon
          points={scorePolygon}
          fill="currentColor"
          className="text-teal-500/25 dark:text-teal-400/25"
          stroke="currentColor"
          strokeWidth={2}
          style={{ color: 'inherit' }}
        />
        {/* Need separate stroke polygon since fill and stroke can't use different currentColor classes */}
        <polygon
          points={scorePolygon}
          fill="none"
          stroke="currentColor"
          className="text-teal-600 dark:text-teal-400"
          strokeWidth={2}
          strokeLinejoin="round"
        />

        {/* Score dots and values */}
        {axes.map((slug, i) => {
          const angle = startAngle + i * angleStep;
          const frac = scoreFractions[i];
          const [x, y] = polarToXY(angle, frac * maxRadius);
          const iq = scores[slug];
          const completed = iq !== undefined;

          return (
            <g key={`dot-${i}`}>
              <circle
                cx={x}
                cy={y}
                r={completed ? 5 : 4}
                fill={completed ? 'currentColor' : 'none'}
                stroke="currentColor"
                strokeWidth={completed ? 0 : 2}
                className={completed
                  ? 'text-teal-600 dark:text-teal-400'
                  : 'text-neutral-400 dark:text-neutral-500'
                }
              />
              {completed && (
                <text
                  x={x}
                  y={y - 12}
                  textAnchor="middle"
                  fontSize={11}
                  fontWeight="bold"
                  fill="currentColor"
                  className="text-teal-700 dark:text-teal-300"
                >
                  {iq}
                </text>
              )}
            </g>
          );
        })}

        {/* Labels */}
        {axes.map((slug, i) => {
          const angle = startAngle + i * angleStep;
          const [x, y] = polarToXY(angle, maxRadius + labelOffset);

          // Determine text anchor based on position
          let anchor: 'start' | 'middle' | 'end' = 'middle';
          const xDelta = x - cx;
          if (xDelta > 5) anchor = 'start';
          else if (xDelta < -5) anchor = 'end';

          // Nudge labels that are at the very top or bottom
          let dy = 0;
          if (y < cy - maxRadius) dy = -4;
          if (y > cy + maxRadius) dy = 8;

          return (
            <text
              key={`label-${i}`}
              x={x}
              y={y + dy}
              textAnchor={anchor}
              dominantBaseline="central"
              fontSize={11}
              fill="currentColor"
              className="text-neutral-600 dark:text-neutral-400"
            >
              {labels[slug]}
            </text>
          );
        })}

        {/* IQ 100 label */}
        <text
          x={cx + 8}
          y={cy - AVG_FRACTION * maxRadius + 12}
          fontSize={9}
          fill="currentColor"
          className="text-neutral-400 dark:text-neutral-500"
        >
          IQ 100
        </text>
      </svg>
    </div>
  );
}
