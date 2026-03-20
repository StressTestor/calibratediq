'use client';

import React, { useEffect, useState, ReactNode, use } from 'react';
import Link from 'next/link';
import { TestShell } from '@/components/test-shell';
import { isValidTestSlug } from '@/lib/tests/registry';
import { TestType } from '@/lib/tests/types';
import { PuzzleGrid, CellRenderer } from '@/components/puzzle-renderer';
import { CellState } from '@/lib/constants';
import type { SpatialQuestionData, ShapePrimitive, RotationOption, CubeOption, WireframeOption, NetFace } from '@/lib/tests/spatial';
import type { LogicalQuestionData } from '@/lib/tests/logical';
import type { VerbalQuestionData } from '@/lib/tests/verbal';
import type { MemoryQuestionData } from '@/lib/tests/memory';
import { TimedReveal } from '@/components/timed-reveal';

// ── Spatial SVG renderers ──────────────────────────────────────────────────

function renderShapePrimitive(p: ShapePrimitive, i: number): ReactNode {
  const fill = p.fill ?? '#3b82f6';
  const stroke = fill;
  switch (p.type) {
    case 'rect':
      return (
        <rect
          key={i}
          x={p.x}
          y={p.y}
          width={p.width ?? 20}
          height={p.height ?? 20}
          fill={fill}
          stroke={stroke}
          strokeWidth={1.5}
          fillOpacity={0.8}
        />
      );
    case 'circle':
      return (
        <circle
          key={i}
          cx={p.x}
          cy={p.y}
          r={p.radius ?? 10}
          fill={fill}
          stroke={stroke}
          strokeWidth={1.5}
          fillOpacity={0.8}
        />
      );
    case 'line':
      return (
        <line
          key={i}
          x1={p.x}
          y1={p.y}
          x2={p.x2 ?? p.x + 30}
          y2={p.y2 ?? p.y + 30}
          stroke={stroke}
          strokeWidth={3}
          strokeLinecap="round"
        />
      );
    case 'triangle': {
      const w = p.width ?? 20;
      const h = p.height ?? 20;
      const points = `${p.x + w / 2},${p.y} ${p.x},${p.y + h} ${p.x + w},${p.y + h}`;
      return (
        <polygon
          key={i}
          points={points}
          fill={fill}
          stroke={stroke}
          strokeWidth={1.5}
          fillOpacity={0.8}
        />
      );
    }
  }
}

function renderShapeSvg(shape: ShapePrimitive[], size: number = 200): ReactNode {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      xmlns="http://www.w3.org/2000/svg"
      className="block"
    >
      <rect width="200" height="200" fill="none" />
      {shape.map((p, i) => renderShapePrimitive(p, i))}
    </svg>
  );
}

function renderCubeNetSvg(netFaces: NetFace[], size: number = 200): ReactNode {
  // Find bounding box of grid positions
  let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
  for (const f of netFaces) {
    minX = Math.min(minX, f.gridX);
    minY = Math.min(minY, f.gridY);
    maxX = Math.max(maxX, f.gridX);
    maxY = Math.max(maxY, f.gridY);
  }
  const cols = maxX - minX + 1;
  const rows = maxY - minY + 1;
  const cellSize = Math.min(40, Math.floor(180 / Math.max(cols, rows)));
  const offsetX = Math.floor((200 - cols * cellSize) / 2);
  const offsetY = Math.floor((200 - rows * cellSize) / 2);

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      xmlns="http://www.w3.org/2000/svg"
      className="block"
    >
      {netFaces.map((face, i) => {
        const x = offsetX + (face.gridX - minX) * cellSize;
        const y = offsetY + (face.gridY - minY) * cellSize;
        return (
          <g key={i}>
            <rect
              x={x}
              y={y}
              width={cellSize}
              height={cellSize}
              fill="white"
              stroke="#374151"
              strokeWidth={2}
            />
            <text
              x={x + cellSize / 2}
              y={y + cellSize / 2}
              textAnchor="middle"
              dominantBaseline="central"
              fontSize={cellSize * 0.5}
              fill="#1f2937"
              fontWeight="bold"
            >
              {face.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

function renderCubeOptionSvg(cube: CubeOption, size: number = 200): ReactNode {
  // Isometric cube showing top, front, and right faces
  // Using a simple isometric projection
  const cx = 100;
  const cy = 100;
  const s = 50; // half-size of face

  // Isometric transforms
  const dx = s * 0.866; // cos(30)
  const dy = s * 0.5;   // sin(30)

  // Face vertices (isometric projection)
  // Front face (facing viewer-left)
  const frontPath = `M ${cx - dx},${cy} L ${cx},${cy + dy} L ${cx},${cy + dy + s} L ${cx - dx},${cy + s} Z`;
  // Right face (facing viewer-right)
  const rightPath = `M ${cx},${cy + dy} L ${cx + dx},${cy} L ${cx + dx},${cy + s} L ${cx},${cy + dy + s} Z`;
  // Top face
  const topPath = `M ${cx - dx},${cy} L ${cx},${cy - dy} L ${cx + dx},${cy} L ${cx},${cy + dy} Z`;

  const faces = [
    { path: topPath, label: cube.top.label, cx: cx, cy: cy, fill: '#dbeafe' },
    { path: frontPath, label: cube.front.label, cx: cx - dx / 2, cy: cy + dy / 2 + s / 2, fill: '#bfdbfe' },
    { path: rightPath, label: cube.right.label, cx: cx + dx / 2, cy: cy + dy / 2 + s / 2, fill: '#93c5fd' },
  ];

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      xmlns="http://www.w3.org/2000/svg"
      className="block"
    >
      {faces.map((f, i) => (
        <g key={i}>
          <path d={f.path} fill={f.fill} stroke="#374151" strokeWidth={2} />
          <text
            x={f.cx}
            y={f.cy}
            textAnchor="middle"
            dominantBaseline="central"
            fontSize={20}
            fill="#1f2937"
            fontWeight="bold"
          >
            {f.label}
          </text>
        </g>
      ))}
    </svg>
  );
}

function renderWireframeSvg(
  vertices: [number, number][],
  edges: [number, number][],
  size: number = 200
): ReactNode {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      xmlns="http://www.w3.org/2000/svg"
      className="block"
    >
      {edges.map((e, i) => {
        const v1 = vertices[e[0]];
        const v2 = vertices[e[1]];
        if (!v1 || !v2) return null;
        return (
          <line
            key={i}
            x1={v1[0]}
            y1={v1[1]}
            x2={v2[0]}
            y2={v2[1]}
            stroke="#3b82f6"
            strokeWidth={2}
            strokeLinecap="round"
          />
        );
      })}
      {vertices.map((v, i) => (
        <circle key={`v${i}`} cx={v[0]} cy={v[1]} r={3} fill="#1e40af" />
      ))}
    </svg>
  );
}

// ── Memory stimulus renderers ────────────────────────────────────────────

const SHAPE_COLORS: Record<string, string> = {
  red: '#ef4444',
  blue: '#3b82f6',
  green: '#22c55e',
  yellow: '#eab308',
  purple: '#a855f7',
  orange: '#f97316',
  pink: '#ec4899',
  teal: '#14b8a6',
};

const SHAPE_NAMES_DISPLAY: Record<string, string> = {
  circle: '\u25CF',
  square: '\u25A0',
  triangle: '\u25B2',
  diamond: '\u25C6',
  star: '\u2605',
};

function renderDigitStimulus(digits: number[]): ReactNode {
  return (
    <div className="flex items-center justify-center py-8">
      <div className="flex gap-3 sm:gap-5">
        {digits.map((d, i) => (
          <span
            key={i}
            className="text-4xl sm:text-5xl font-mono font-bold text-neutral-800 dark:text-neutral-100"
          >
            {d}
          </span>
        ))}
      </div>
    </div>
  );
}

function renderGridStimulus(gridSize: number, highlighted: [number, number][]): ReactNode {
  const cellSize = gridSize === 5 ? 40 : 48;
  const gap = 3;
  const total = gridSize * (cellSize + gap) - gap;
  const highlightSet = new Set(highlighted.map(([r, c]) => `${r},${c}`));

  return (
    <div className="flex items-center justify-center py-6">
      <svg
        width={total}
        height={total}
        viewBox={`0 0 ${total} ${total}`}
        xmlns="http://www.w3.org/2000/svg"
        className="block"
      >
        {Array.from({ length: gridSize }, (_, r) =>
          Array.from({ length: gridSize }, (_, c) => {
            const x = c * (cellSize + gap);
            const y = r * (cellSize + gap);
            const isHighlighted = highlightSet.has(`${r},${c}`);
            return (
              <rect
                key={`${r}-${c}`}
                x={x}
                y={y}
                width={cellSize}
                height={cellSize}
                rx={4}
                fill={isHighlighted ? '#14b8a6' : '#e5e7eb'}
                className={isHighlighted ? '' : 'dark:fill-neutral-700'}
              />
            );
          })
        )}
      </svg>
    </div>
  );
}

function renderShapeStimulus(shapes: { shape: string; color: string; position: number }[]): ReactNode {
  return (
    <div className="flex items-center justify-center py-6">
      <div className="flex gap-6 sm:gap-8">
        {shapes.map((s, i) => (
          <div key={i} className="flex flex-col items-center gap-1">
            <span
              className="text-4xl sm:text-5xl"
              style={{ color: SHAPE_COLORS[s.color] ?? s.color }}
            >
              {SHAPE_NAMES_DISPLAY[s.shape] ?? '?'}
            </span>
            <span className="text-xs font-medium text-neutral-400 dark:text-neutral-500">
              #{s.position}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function renderGridOption(gridSize: number, cells: [number, number][], size: number = 72): ReactNode {
  const cellSz = Math.floor((size - (gridSize - 1) * 2) / gridSize);
  const gap = 2;
  const total = gridSize * (cellSz + gap) - gap;
  const highlightSet = new Set(cells.map(([r, c]) => `${r},${c}`));

  return (
    <svg
      width={total}
      height={total}
      viewBox={`0 0 ${total} ${total}`}
      xmlns="http://www.w3.org/2000/svg"
      className="block mx-auto"
    >
      {Array.from({ length: gridSize }, (_, r) =>
        Array.from({ length: gridSize }, (_, c) => {
          const x = c * (cellSz + gap);
          const y = r * (cellSz + gap);
          const isHighlighted = highlightSet.has(`${r},${c}`);
          return (
            <rect
              key={`${r}-${c}`}
              x={x}
              y={y}
              width={cellSz}
              height={cellSz}
              rx={2}
              fill={isHighlighted ? '#14b8a6' : '#e5e7eb'}
              className={isHighlighted ? '' : 'dark:fill-neutral-700'}
            />
          );
        })
      )}
    </svg>
  );
}

// Static renderers per test type
// Each test type has a question renderer and option renderer
function getRenderers(slug: string): {
  question: (data: unknown, isRevealing?: boolean) => ReactNode;
  option: (opt: unknown, i: number) => ReactNode;
} | null {
  switch (slug) {
    case 'matrix':
      return {
        question: (data: unknown) => {
          const d = data as { grid: (CellState | null)[][]; gridSize: number };
          return <PuzzleGrid grid={d.grid} gridSize={d.gridSize} />;
        },
        option: (opt: unknown) => {
          return <CellRenderer cell={opt as CellState} size={80} />;
        },
      };
    case 'numerical':
      return {
        question: (data: unknown) => {
          const d = data as { sequence: number[] };
          return (
            <div className="text-center">
              <p className="text-2xl sm:text-3xl font-mono font-semibold tracking-wide text-neutral-800 dark:text-neutral-100">
                {d.sequence.join(', ')}, <span className="text-teal-500">?</span>
              </p>
            </div>
          );
        },
        option: (opt: unknown) => {
          return (
            <span className="text-lg sm:text-xl font-mono font-medium text-neutral-800 dark:text-neutral-100">
              {opt as number}
            </span>
          );
        },
      };
    case 'spatial':
      return {
        question: (data: unknown) => {
          const d = data as SpatialQuestionData;
          switch (d.type) {
            case 'rotation':
              return (
                <div className="text-center">
                  <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-3">
                    Which option matches this shape rotated {d.targetRotation}&deg;?
                  </p>
                  {renderShapeSvg(d.shape ?? [], 180)}
                </div>
              );
            case 'cube_net':
              return (
                <div className="text-center">
                  <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-3">
                    Which cube could this net fold into?
                  </p>
                  {renderCubeNetSvg(d.netFaces ?? [], 200)}
                </div>
              );
            case 'wireframe':
              return (
                <div className="text-center">
                  <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-3">
                    Which option shows the same object from a different angle?
                  </p>
                  {renderWireframeSvg(
                    d.referenceVertices ?? [],
                    d.referenceEdges ?? [],
                    180
                  )}
                </div>
              );
            default:
              return null;
          }
        },
        option: (opt: unknown) => {
          // Determine option type by checking its shape
          const o = opt as Record<string, unknown>;
          if ('shape' in o && Array.isArray(o.shape)) {
            // Rotation option
            const ro = opt as unknown as RotationOption;
            return renderShapeSvg(ro.shape, 80);
          }
          if ('top' in o && 'front' in o && 'right' in o) {
            // Cube option
            const co = opt as unknown as CubeOption;
            return renderCubeOptionSvg(co, 80);
          }
          if ('vertices' in o && 'edges' in o) {
            // Wireframe option
            const wo = opt as unknown as WireframeOption;
            return renderWireframeSvg(wo.vertices, wo.edges, 80);
          }
          return null;
        },
      };
    case 'logical':
      return {
        question: (data: unknown) => {
          const d = data as LogicalQuestionData;
          return (
            <div className="text-center max-w-lg mx-auto">
              <div className="border border-neutral-200 dark:border-neutral-700 rounded-lg p-4 mb-4 bg-neutral-50 dark:bg-neutral-800/50">
                {d.premises.map((premise, i) => (
                  <p
                    key={i}
                    className="text-base sm:text-lg font-medium text-neutral-800 dark:text-neutral-100 leading-relaxed"
                  >
                    {premise}
                  </p>
                ))}
              </div>
              <p className="text-sm text-neutral-500 dark:text-neutral-400">
                {d.questionText}
              </p>
            </div>
          );
        },
        option: (opt: unknown) => {
          return (
            <span className="text-sm sm:text-base font-medium text-neutral-800 dark:text-neutral-100 leading-snug">
              {opt as string}
            </span>
          );
        },
      };
    case 'verbal':
      return {
        question: (data: unknown) => {
          const d = data as VerbalQuestionData;
          if (d.type === 'odd_one_out') {
            return (
              <div className="text-center max-w-lg mx-auto">
                <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-4">
                  {d.instruction}
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {d.pairs?.map((pair, i) => (
                    <div
                      key={i}
                      className="border border-neutral-200 dark:border-neutral-700 rounded-lg px-3 py-2 bg-neutral-50 dark:bg-neutral-800/50"
                    >
                      <span className="text-xs font-medium text-neutral-400 dark:text-neutral-500 mr-1">
                        {String.fromCharCode(65 + i)}.
                      </span>
                      <span className="text-sm sm:text-base font-medium text-neutral-800 dark:text-neutral-100">
                        {pair[0]} : {pair[1]}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            );
          }
          // analogy type
          return (
            <div className="text-center">
              <p className="text-2xl sm:text-3xl font-semibold tracking-wide text-neutral-800 dark:text-neutral-100">
                {d.promptPair?.[0]}{' '}
                <span className="text-neutral-400 dark:text-neutral-500">:</span>{' '}
                {d.promptPair?.[1]}{' '}
                <span className="text-neutral-400 dark:text-neutral-500">::</span>{' '}
                {d.targetFirst}{' '}
                <span className="text-neutral-400 dark:text-neutral-500">:</span>{' '}
                <span className="text-teal-500">?</span>
              </p>
            </div>
          );
        },
        option: (opt: unknown) => {
          const val = opt as string | number;
          if (typeof val === 'number') {
            // odd-one-out: option is an index, render as letter label
            return (
              <span className="text-lg sm:text-xl font-semibold text-neutral-800 dark:text-neutral-100">
                {String.fromCharCode(65 + (val as number))}
              </span>
            );
          }
          // analogy: option is a word
          return (
            <span className="text-base sm:text-lg font-medium text-neutral-800 dark:text-neutral-100">
              {val as string}
            </span>
          );
        },
      };
    case 'memory':
      return {
        question: (data: unknown, isRevealing?: boolean) => {
          const d = data as MemoryQuestionData;

          // During reveal phase: show the stimulus
          if (isRevealing) {
            switch (d.type) {
              case 'digit_span':
                return renderDigitStimulus(d.stimulus.digits ?? []);
              case 'grid_pattern':
                return renderGridStimulus(
                  d.stimulus.gridSize ?? 4,
                  d.stimulus.highlightedCells ?? []
                );
              case 'dual_task':
                return renderShapeStimulus(d.stimulus.shapes ?? []);
              default:
                return null;
            }
          }

          // After reveal: show the question text
          return (
            <div className="text-center">
              <p className="text-lg sm:text-xl font-medium text-neutral-800 dark:text-neutral-100">
                {d.question}
              </p>
            </div>
          );
        },
        option: (opt: unknown) => {
          // digit span: array of numbers
          if (Array.isArray(opt) && typeof opt[0] === 'number') {
            return (
              <span className="text-sm sm:text-base font-mono font-medium text-neutral-800 dark:text-neutral-100 tracking-wider">
                {(opt as number[]).join(' ')}
              </span>
            );
          }
          // grid pattern: array of [row, col] pairs
          if (Array.isArray(opt) && Array.isArray(opt[0])) {
            return renderGridOption(4, opt as [number, number][], 64);
          }
          // dual task: string (color or shape name)
          return (
            <span className="text-sm sm:text-base font-medium text-neutral-800 dark:text-neutral-100 capitalize">
              {opt as string}
            </span>
          );
        },
      };
    default:
      return null;
  }
}

interface TestTypePageProps {
  params: Promise<{ type: string }>;
}

export default function TestTypePage({ params }: TestTypePageProps) {
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

    // Dynamic import of the test type module
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
        <p className="text-sm text-muted">Loading test...</p>
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

  const renderers = getRenderers(typeSlug);

  if (!renderers) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <p className="text-lg font-medium mb-2">{testType.name}</p>
          <p className="text-sm text-muted mb-6">
            This test is coming soon. Check back later.
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
    <TestShell
      testSlug={testType.slug}
      testName={testType.name}
      questionRenderer={renderers.question}
      optionRenderer={renderers.option}
      generateQuestion={testType.generateQuestion.bind(testType)}
      totalQuestions={testType.totalQuestions}
      revealDuration={testType.revealDuration}
    />
  );
}
