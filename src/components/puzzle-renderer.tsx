'use client';

import React from 'react';
import { type CellState, COLORS } from '@/lib/constants';
import { CELL_VIEW_SIZE, cellPrimitives, cellTransform, type Primitive } from '@/lib/cell-geometry';

function renderPrimitive(p: Primitive, key: number): React.ReactElement {
  if (p.kind === 'circle') {
    return <circle key={key} cx={p.cx} cy={p.cy} r={p.r} />;
  }
  return <polygon key={key} points={p.points.map(pt => pt.join(',')).join(' ')} />;
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

export function CellRenderer({ cell, size }: { cell: CellState; size: number }): React.ReactNode {
  const viewSize = CELL_VIEW_SIZE;
  const color = COLORS[cell.fill % COLORS.length];

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${viewSize} ${viewSize}`}
      xmlns="http://www.w3.org/2000/svg"
      className="block"
    >
      <g
        transform={cellTransform(cell)}
        fill={color}
        stroke={color}
        strokeWidth={1.5}
        fillOpacity={0.85}
      >
        {cellPrimitives(cell).map(renderPrimitive)}
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
