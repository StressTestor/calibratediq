'use client';

import React from 'react';
import { type CellState, COLORS, type Scale } from '@/lib/constants';

const SCALE_FACTORS: Record<Scale, number> = {
  small: 0.6,
  medium: 0.8,
  large: 1.0,
};

function getShapePath(
  shape: CellState['shape'],
  cx: number,
  cy: number,
  r: number,
): React.ReactElement {
  switch (shape) {
    case 'circle':
      return <circle cx={cx} cy={cy} r={r} />;

    case 'square': {
      const half = r * 0.85;
      return <rect x={cx - half} y={cy - half} width={half * 2} height={half * 2} />;
    }

    case 'triangle': {
      const pts = [
        [cx, cy - r],
        [cx - r * 0.866, cy + r * 0.5],
        [cx + r * 0.866, cy + r * 0.5],
      ];
      return <polygon points={pts.map(p => p.join(',')).join(' ')} />;
    }

    case 'diamond': {
      const pts = [
        [cx, cy - r],
        [cx + r * 0.7, cy],
        [cx, cy + r],
        [cx - r * 0.7, cy],
      ];
      return <polygon points={pts.map(p => p.join(',')).join(' ')} />;
    }

    case 'star': {
      const outerR = r;
      const innerR = r * 0.4;
      const pts: [number, number][] = [];
      for (let i = 0; i < 5; i++) {
        const outerAngle = (Math.PI / 2) * -1 + (2 * Math.PI * i) / 5;
        pts.push([
          cx + outerR * Math.cos(outerAngle),
          cy + outerR * Math.sin(outerAngle),
        ]);
        const innerAngle = outerAngle + Math.PI / 5;
        pts.push([
          cx + innerR * Math.cos(innerAngle),
          cy + innerR * Math.sin(innerAngle),
        ]);
      }
      return <polygon points={pts.map(p => p.join(',')).join(' ')} />;
    }

    case 'hexagon': {
      const pts: [number, number][] = [];
      for (let i = 0; i < 6; i++) {
        const angle = (Math.PI / 3) * i - Math.PI / 6;
        pts.push([
          cx + r * Math.cos(angle),
          cy + r * Math.sin(angle),
        ]);
      }
      return <polygon points={pts.map(p => p.join(',')).join(' ')} />;
    }

    default:
      return <circle cx={cx} cy={cy} r={r} />;
  }
}

function getOverlayIndicator(overlay: CellState['overlay'], size: number): React.ReactNode {
  if (overlay === 'none') return null;

  const s = size * 0.12;
  const offset = size * 0.85;

  const labels: Record<string, string> = {
    and: '\u2229',
    or: '\u222A',
    subtract: '\u2212',
  };

  return (
    <text
      x={offset}
      y={s + 2}
      fontSize={s * 1.6}
      fill="currentColor"
      opacity={0.4}
      textAnchor="end"
      dominantBaseline="hanging"
      fontFamily="serif"
    >
      {labels[overlay]}
    </text>
  );
}

function getPositions(count: number, cx: number, cy: number, spacing: number): [number, number][] {
  switch (count) {
    case 1:
      return [[cx, cy]];
    case 2:
      return [
        [cx - spacing, cy],
        [cx + spacing, cy],
      ];
    case 3:
      return [
        [cx, cy - spacing * 0.7],
        [cx - spacing, cy + spacing * 0.5],
        [cx + spacing, cy + spacing * 0.5],
      ];
    case 4:
      return [
        [cx - spacing, cy - spacing],
        [cx + spacing, cy - spacing],
        [cx - spacing, cy + spacing],
        [cx + spacing, cy + spacing],
      ];
    default:
      return [[cx, cy]];
  }
}

export function CellRenderer({ cell, size }: { cell: CellState; size: number }): React.ReactNode {
  const viewSize = 100;
  const color = COLORS[cell.fill % COLORS.length];
  const scaleFactor = SCALE_FACTORS[cell.scale];

  // Base radius for a single shape
  const baseR = viewSize * 0.35;
  // Shrink radius when rendering multiple shapes
  const countScale = cell.count === 1 ? 1 : cell.count === 2 ? 0.65 : cell.count === 3 ? 0.55 : 0.48;
  const r = baseR * scaleFactor * countScale;
  const spacing = viewSize * 0.22;

  // Center offset from position (position shifts the center within the cell)
  const posOffsetX = (cell.position[1] - 1) * viewSize * 0.15;
  const posOffsetY = (cell.position[0] - 1) * viewSize * 0.15;
  const centerX = viewSize / 2 + posOffsetX;
  const centerY = viewSize / 2 + posOffsetY;

  const positions = getPositions(cell.count, centerX, centerY, spacing);

  // Build transform string
  const transforms: string[] = [];
  if (cell.reflected) {
    transforms.push(`translate(${viewSize}, 0) scale(-1, 1)`);
  }
  if (cell.rotation !== 0) {
    transforms.push(`rotate(${cell.rotation}, ${viewSize / 2}, ${viewSize / 2})`);
  }

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${viewSize} ${viewSize}`}
      xmlns="http://www.w3.org/2000/svg"
      className="block"
    >
      <g
        transform={transforms.join(' ')}
        fill={color}
        stroke={color}
        strokeWidth={1.5}
        fillOpacity={0.85}
      >
        {positions.map((pos, i) => (
          <g key={i}>
            {getShapePath(cell.shape, pos[0], pos[1], r)}
          </g>
        ))}
      </g>
      {getOverlayIndicator(cell.overlay, viewSize)}
    </svg>
  );
}

export function PuzzleGrid({
  grid,
  gridSize,
}: {
  grid: (CellState | null)[][];
  gridSize: number;
}): React.ReactNode {
  const cellSize = gridSize <= 2 ? 140 : 110;

  return (
    <div
      className="inline-grid border border-neutral-300 dark:border-neutral-600 rounded-md overflow-hidden"
      style={{
        gridTemplateColumns: `repeat(${gridSize}, ${cellSize}px)`,
        gridTemplateRows: `repeat(${gridSize}, ${cellSize}px)`,
      }}
    >
      {grid.flat().map((cell, i) => {
        if (cell === null) {
          return (
            <div
              key={i}
              className="flex items-center justify-center border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800/50"
              style={{ width: cellSize, height: cellSize }}
            >
              <svg
                width={cellSize * 0.6}
                height={cellSize * 0.6}
                viewBox="0 0 60 60"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  x={4}
                  y={4}
                  width={52}
                  height={52}
                  rx={6}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeDasharray="6 4"
                  opacity={0.3}
                />
                <text
                  x={30}
                  y={34}
                  textAnchor="middle"
                  fontSize={24}
                  fontWeight="bold"
                  fill="currentColor"
                  opacity={0.35}
                >
                  ?
                </text>
              </svg>
            </div>
          );
        }

        return (
          <div
            key={i}
            className="flex items-center justify-center border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900"
            style={{ width: cellSize, height: cellSize }}
          >
            <CellRenderer cell={cell} size={cellSize - 8} />
          </div>
        );
      })}
    </div>
  );
}
