import React from 'react';
import { IQ_MEAN, IQ_SD } from '@/lib/scoring';

interface BellCurveProps {
  iq: number;
  percentile: number;
}

// Normal PDF
function normalPDF(x: number, mean: number, sd: number): number {
  const exp = -0.5 * Math.pow((x - mean) / sd, 2);
  return (1 / (sd * Math.sqrt(2 * Math.PI))) * Math.exp(exp);
}

export function BellCurve({ iq, percentile }: BellCurveProps): React.ReactNode {
  const svgW = 600;
  const svgH = 260;
  const pad = { top: 20, right: 30, bottom: 50, left: 30 };

  const plotW = svgW - pad.left - pad.right;
  const plotH = svgH - pad.top - pad.bottom;

  const iqMin = 55;
  const iqMax = 145;

  function xPos(iqVal: number): number {
    return pad.left + ((iqVal - iqMin) / (iqMax - iqMin)) * plotW;
  }

  function yPos(density: number, maxDensity: number): number {
    return pad.top + plotH - (density / maxDensity) * plotH;
  }

  // Compute curve points
  const step = 0.5;
  const points: [number, number][] = [];
  const maxDensity = normalPDF(IQ_MEAN, IQ_MEAN, IQ_SD);

  for (let v = iqMin; v <= iqMax; v += step) {
    const d = normalPDF(v, IQ_MEAN, IQ_SD);
    points.push([xPos(v), yPos(d, maxDensity)]);
  }

  // Build the main curve path
  const curvePath =
    'M ' + points.map(p => `${p[0].toFixed(2)},${p[1].toFixed(2)}`).join(' L ');

  // Build the shaded area path (from left edge to user's IQ)
  const clampedIQ = Math.max(iqMin, Math.min(iqMax, iq));
  const shadedPoints: [number, number][] = [];
  for (let v = iqMin; v <= clampedIQ; v += step) {
    const d = normalPDF(v, IQ_MEAN, IQ_SD);
    shadedPoints.push([xPos(v), yPos(d, maxDensity)]);
  }
  // Close the shaded area down to the baseline
  const baseline = pad.top + plotH;
  const shadedPath =
    'M ' +
    shadedPoints.map(p => `${p[0].toFixed(2)},${p[1].toFixed(2)}`).join(' L ') +
    ` L ${xPos(clampedIQ).toFixed(2)},${baseline} L ${xPos(iqMin).toFixed(2)},${baseline} Z`;

  // Axis labels
  const tickValues = [70, 85, 100, 115, 130, 145];
  const sdLabels = [
    { val: 55, label: '-3\u03C3' },
    { val: 70, label: '-2\u03C3' },
    { val: 85, label: '-1\u03C3' },
    { val: 100, label: '\u03BC' },
    { val: 115, label: '+1\u03C3' },
    { val: 130, label: '+2\u03C3' },
    { val: 145, label: '+3\u03C3' },
  ];

  // User marker
  const userX = xPos(clampedIQ);
  const userY = yPos(normalPDF(clampedIQ, IQ_MEAN, IQ_SD), maxDensity);

  return (
    <div className="w-full max-w-2xl">
      <svg
        viewBox={`0 0 ${svgW} ${svgH}`}
        className="w-full h-auto"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Shaded area */}
        <path
          d={shadedPath}
          fill="currentColor"
          className="text-teal-500/20 dark:text-teal-400/20"
        />

        {/* Curve */}
        <path
          d={curvePath}
          fill="none"
          stroke="currentColor"
          className="text-neutral-600 dark:text-neutral-300"
          strokeWidth={2}
          strokeLinejoin="round"
        />

        {/* Baseline */}
        <line
          x1={pad.left}
          y1={baseline}
          x2={svgW - pad.right}
          y2={baseline}
          stroke="currentColor"
          className="text-neutral-300 dark:text-neutral-600"
          strokeWidth={1}
        />

        {/* IQ tick marks and labels */}
        {tickValues.map(v => (
          <g key={v}>
            <line
              x1={xPos(v)}
              y1={baseline}
              x2={xPos(v)}
              y2={baseline + 6}
              stroke="currentColor"
              className="text-neutral-400 dark:text-neutral-500"
              strokeWidth={1}
            />
            <text
              x={xPos(v)}
              y={baseline + 18}
              textAnchor="middle"
              fontSize={11}
              fill="currentColor"
              className="text-neutral-500 dark:text-neutral-400"
            >
              {v}
            </text>
          </g>
        ))}

        {/* SD labels below */}
        {sdLabels.map(({ val, label }) => (
          <text
            key={val}
            x={xPos(val)}
            y={baseline + 34}
            textAnchor="middle"
            fontSize={9}
            fill="currentColor"
            className="text-neutral-400 dark:text-neutral-500"
          >
            {label}
          </text>
        ))}

        {/* User score marker line */}
        <line
          x1={userX}
          y1={userY}
          x2={userX}
          y2={baseline}
          stroke="currentColor"
          className="text-teal-600 dark:text-teal-400"
          strokeWidth={2}
          strokeDasharray="4 2"
        />

        {/* User score dot */}
        <circle
          cx={userX}
          cy={userY}
          r={4}
          fill="currentColor"
          className="text-teal-600 dark:text-teal-400"
        />

        {/* User score label */}
        <text
          x={userX}
          y={userY - 12}
          textAnchor="middle"
          fontSize={12}
          fontWeight="bold"
          fill="currentColor"
          className="text-teal-700 dark:text-teal-300"
        >
          IQ {iq}
        </text>

        {/* Percentile label */}
        <text
          x={userX}
          y={userY - 26}
          textAnchor="middle"
          fontSize={9}
          fill="currentColor"
          className="text-neutral-500 dark:text-neutral-400"
        >
          {percentile}th percentile
        </text>
      </svg>
    </div>
  );
}
