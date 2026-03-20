import { TestType, Question } from './types';
import { createPRNG } from '../prng';

// ── Types ──────────────────────────────────────────────────────────────────

interface ShapePrimitive {
  type: 'rect' | 'circle' | 'line' | 'triangle';
  x: number;
  y: number;
  width?: number;
  height?: number;
  radius?: number;
  x2?: number;
  y2?: number;
  fill?: string;
}

interface SpatialQuestionData {
  type: 'rotation' | 'cube_net' | 'wireframe';
  difficulty: 'easy' | 'medium' | 'hard';
  // rotation questions
  shape?: ShapePrimitive[];
  targetRotation?: number;
  // cube_net questions
  netFaces?: NetFace[];
  // wireframe questions
  referenceEdges?: [number, number][];
  referenceVertices?: [number, number][];
}

interface RotationOption {
  shape: ShapePrimitive[];
}

// ── Cube net types ─────────────────────────────────────────────────────────

interface NetFace {
  label: string;
  gridX: number;
  gridY: number;
}

interface CubeOption {
  top: { label: string; rotation: number };
  front: { label: string; rotation: number };
  right: { label: string; rotation: number };
}

// ── Wireframe types ────────────────────────────────────────────────────────

interface WireframeOption {
  vertices: [number, number][];
  edges: [number, number][];
}

// ── Color palette for shapes ───────────────────────────────────────────────

const SHAPE_COLORS = ['#3b82f6', '#ef4444', '#22c55e', '#f59e0b', '#8b5cf6'];

// ── Easy: 2D rotation matching ─────────────────────────────────────────────

function generateAsymmetricShape(
  rng: ReturnType<typeof createPRNG>
): ShapePrimitive[] {
  const primitives: ShapePrimitive[] = [];
  const count = rng.nextInt(3, 6);
  const color = SHAPE_COLORS[rng.nextInt(0, SHAPE_COLORS.length)];

  // Always start with an off-center anchor to guarantee asymmetry
  primitives.push({
    type: 'rect',
    x: rng.nextInt(30, 60),
    y: rng.nextInt(70, 110),
    width: rng.nextInt(20, 50),
    height: rng.nextInt(10, 25),
    fill: color,
  });

  // Add an L-shaped arm (guarantees asymmetry)
  primitives.push({
    type: 'rect',
    x: rng.nextInt(80, 120),
    y: rng.nextInt(40, 70),
    width: rng.nextInt(10, 20),
    height: rng.nextInt(30, 60),
    fill: color,
  });

  const types: ShapePrimitive['type'][] = ['rect', 'circle', 'line', 'triangle'];
  for (let i = 2; i < count; i++) {
    const t = types[rng.nextInt(0, types.length)];
    const p: ShapePrimitive = { type: t, x: rng.nextInt(20, 160), y: rng.nextInt(20, 160), fill: color };
    switch (t) {
      case 'rect':
        p.width = rng.nextInt(10, 40);
        p.height = rng.nextInt(10, 30);
        break;
      case 'circle':
        p.radius = rng.nextInt(5, 18);
        break;
      case 'line':
        p.x2 = rng.nextInt(20, 160);
        p.y2 = rng.nextInt(20, 160);
        break;
      case 'triangle':
        p.width = rng.nextInt(15, 40);
        p.height = rng.nextInt(15, 40);
        break;
    }
    primitives.push(p);
  }

  return primitives;
}

function rotatePrimitive(
  p: ShapePrimitive,
  degrees: number,
  cx: number,
  cy: number
): ShapePrimitive {
  const rad = (degrees * Math.PI) / 180;
  const cos = Math.cos(rad);
  const sin = Math.sin(rad);

  function rotPoint(x: number, y: number): [number, number] {
    const dx = x - cx;
    const dy = y - cy;
    return [
      Math.round(cx + dx * cos - dy * sin),
      Math.round(cy + dx * sin + dy * cos),
    ];
  }

  const [nx, ny] = rotPoint(p.x, p.y);
  const result: ShapePrimitive = { ...p, x: nx, y: ny };

  if (p.x2 !== undefined && p.y2 !== undefined) {
    const [nx2, ny2] = rotPoint(p.x2, p.y2);
    result.x2 = nx2;
    result.y2 = ny2;
  }

  // For rects, we need to rotate the corner and potentially swap width/height
  if (p.type === 'rect' && p.width !== undefined && p.height !== undefined) {
    // Rotate from center of rect
    const rcx = p.x + p.width / 2;
    const rcy = p.y + p.height / 2;
    const [nrcx, nrcy] = rotPoint(rcx, rcy);
    if (degrees === 90 || degrees === 270) {
      result.width = p.height;
      result.height = p.width;
    }
    result.x = Math.round(nrcx - (result.width ?? 0) / 2);
    result.y = Math.round(nrcy - (result.height ?? 0) / 2);
  }

  if (p.type === 'circle') {
    // circle just moves center
  }

  if (p.type === 'triangle' && p.width !== undefined && p.height !== undefined) {
    // Triangle: rotate the tip point around base center
    const tcx = p.x + p.width / 2;
    const tcy = p.y + p.height / 2;
    const [ntcx, ntcy] = rotPoint(tcx, tcy);
    if (degrees === 90 || degrees === 270) {
      result.width = p.height;
      result.height = p.width;
    }
    result.x = Math.round(ntcx - (result.width ?? 0) / 2);
    result.y = Math.round(ntcy - (result.height ?? 0) / 2);
  }

  return result;
}

function reflectPrimitive(
  p: ShapePrimitive,
  cx: number
): ShapePrimitive {
  const result: ShapePrimitive = { ...p };
  result.x = Math.round(2 * cx - p.x - (p.width ?? 0));
  if (p.x2 !== undefined) {
    result.x2 = Math.round(2 * cx - p.x2);
  }
  return result;
}

function perturbPrimitive(
  p: ShapePrimitive,
  rng: ReturnType<typeof createPRNG>
): ShapePrimitive {
  const result: ShapePrimitive = { ...p };
  // Slightly shift position or size
  const which = rng.nextInt(0, 3);
  if (which === 0) {
    result.x += rng.nextInt(-15, 16);
    result.y += rng.nextInt(-15, 16);
  } else if (which === 1 && result.width !== undefined) {
    result.width = Math.max(5, result.width + rng.nextInt(-10, 11));
  } else if (result.height !== undefined) {
    result.height = Math.max(5, result.height + rng.nextInt(-10, 11));
  }
  return result;
}

function rotateShape(
  shape: ShapePrimitive[],
  degrees: number
): ShapePrimitive[] {
  const cx = 100;
  const cy = 100;
  return shape.map((p) => rotatePrimitive(p, degrees, cx, cy));
}

function reflectShape(shape: ShapePrimitive[]): ShapePrimitive[] {
  return shape.map((p) => reflectPrimitive(p, 100));
}

function perturbShape(
  shape: ShapePrimitive[],
  rng: ReturnType<typeof createPRNG>
): ShapePrimitive[] {
  // Pick one primitive to perturb
  const idx = rng.nextInt(0, shape.length);
  return shape.map((p, i) => (i === idx ? perturbPrimitive(p, rng) : { ...p }));
}

function generateRotationQuestion(
  rng: ReturnType<typeof createPRNG>
): Question {
  const shape = generateAsymmetricShape(rng);
  const rotations = [90, 180, 270];
  const targetRotation = rotations[rng.nextInt(0, rotations.length)];

  // Correct answer: shape rotated by targetRotation
  const correctShape = rotateShape(shape, targetRotation);

  // Generate 5 distractors
  const distractors: ShapePrimitive[][] = [];
  const usedAngles = new Set<string>();
  usedAngles.add(`rot_${targetRotation}`);

  // Wrong rotations
  for (const r of rotations) {
    if (r !== targetRotation && distractors.length < 5) {
      distractors.push(rotateShape(shape, r));
      usedAngles.add(`rot_${r}`);
    }
  }

  // Reflected versions
  if (distractors.length < 5) {
    distractors.push(reflectShape(rotateShape(shape, targetRotation)));
  }
  if (distractors.length < 5) {
    distractors.push(reflectShape(shape));
  }

  // Perturbed version of correct rotation
  while (distractors.length < 5) {
    distractors.push(perturbShape(rotateShape(shape, targetRotation), rng));
  }

  const options: RotationOption[] = [
    { shape: correctShape },
    ...distractors.slice(0, 5).map((s) => ({ shape: s })),
  ];
  rng.shuffle(options);
  const correctIndex = options.findIndex((o) => o.shape === correctShape);

  const data: SpatialQuestionData = {
    type: 'rotation',
    difficulty: 'easy',
    shape,
    targetRotation,
  };

  return { data, options, correctIndex };
}

// ── Medium: Cube net folding ───────────────────────────────────────────────

// Standard cross-shaped nets. Each net is an array of 6 [gridX, gridY] positions.
// The cross pattern:
//     [1,0]
// [0,1][1,1][2,1][3,1]
//     [1,2]
const CROSS_NET: [number, number][] = [
  [1, 0], // top
  [0, 1], // left
  [1, 1], // center
  [2, 1], // right
  [3, 1], // far right
  [1, 2], // bottom
];

// Alternative nets for variety
const T_NET: [number, number][] = [
  [0, 0], // top-left
  [1, 0], // top-center
  [2, 0], // top-right
  [1, 1], // middle
  [1, 2], // lower
  [1, 3], // bottom
];

const L_NET: [number, number][] = [
  [0, 0],
  [0, 1],
  [0, 2],
  [0, 3],
  [1, 3],
  [2, 3],
];

const NET_LAYOUTS: [number, number][][] = [CROSS_NET, T_NET, L_NET];

// Face symbols (simple and distinct)
const FACE_SYMBOLS = [
  '\u25CF', // filled circle
  '\u2716', // heavy X
  '\u2014', // horizontal line
  '\u25B2', // triangle
  '\u25A0', // filled square
  '\u2605', // star
];

// When the cross-shaped net folds into a cube:
// Face 0 (top of cross) = top of cube
// Face 1 (left) = left of cube
// Face 2 (center) = front of cube
// Face 3 (right) = right of cube
// Face 4 (far right) = back of cube
// Face 5 (bottom of cross) = bottom of cube
//
// From a standard front-top-right viewing angle:
// Visible faces: top (0), front (2), right (3)

interface CubeFolding {
  // indices into net faces: [top, front, right]
  visible: [number, number, number];
  // rotation of each visible face (0, 90, 180, 270)
  rotations: [number, number, number];
}

const CROSS_FOLDING: CubeFolding = {
  visible: [0, 2, 3],
  rotations: [0, 0, 0],
};

const T_FOLDING: CubeFolding = {
  visible: [0, 3, 2],
  rotations: [0, 0, 90],
};

const L_FOLDING: CubeFolding = {
  visible: [0, 1, 2],
  rotations: [0, 90, 0],
};

const FOLDINGS: CubeFolding[] = [CROSS_FOLDING, T_FOLDING, L_FOLDING];

function generateCubeNetQuestion(
  rng: ReturnType<typeof createPRNG>
): Question {
  const netIdx = rng.nextInt(0, NET_LAYOUTS.length);
  const netLayout = NET_LAYOUTS[netIdx];
  const folding = FOLDINGS[netIdx];

  // Assign random symbols to faces
  const symbols = [...FACE_SYMBOLS];
  rng.shuffle(symbols);
  const faceLabels = symbols.slice(0, 6);

  const netFaces: NetFace[] = netLayout.map((pos, i) => ({
    label: faceLabels[i],
    gridX: pos[0],
    gridY: pos[1],
  }));

  // Correct cube: shows the right 3 visible faces
  const correctCube: CubeOption = {
    top: { label: faceLabels[folding.visible[0]], rotation: folding.rotations[0] },
    front: { label: faceLabels[folding.visible[1]], rotation: folding.rotations[1] },
    right: { label: faceLabels[folding.visible[2]], rotation: folding.rotations[2] },
  };

  // Generate 5 distractors with wrong face arrangements
  const distractors: CubeOption[] = [];

  // Distractor strategies:
  // 1. Swap two visible faces
  // 2. Replace one visible face with a hidden face
  // 3. Correct faces but wrong rotation on one
  // 4. All different faces from the hidden ones

  const hiddenIndices = [0, 1, 2, 3, 4, 5].filter(
    (i) => !folding.visible.includes(i)
  );

  // Strategy 1: Swap front and right
  distractors.push({
    top: { ...correctCube.top },
    front: { label: correctCube.right.label, rotation: 0 },
    right: { label: correctCube.front.label, rotation: 0 },
  });

  // Strategy 2: Replace top with a hidden face
  if (hiddenIndices.length > 0) {
    distractors.push({
      top: { label: faceLabels[hiddenIndices[0]], rotation: 0 },
      front: { ...correctCube.front },
      right: { ...correctCube.right },
    });
  }

  // Strategy 3: Replace right with a hidden face
  if (hiddenIndices.length > 1) {
    distractors.push({
      top: { ...correctCube.top },
      front: { ...correctCube.front },
      right: { label: faceLabels[hiddenIndices[1]], rotation: 0 },
    });
  }

  // Strategy 4: Correct faces, wrong rotation
  distractors.push({
    top: { label: correctCube.top.label, rotation: 180 },
    front: { label: correctCube.front.label, rotation: 90 },
    right: { ...correctCube.right },
  });

  // Strategy 5: Two hidden faces visible
  if (hiddenIndices.length >= 2) {
    distractors.push({
      top: { label: faceLabels[hiddenIndices[0]], rotation: 0 },
      front: { label: faceLabels[hiddenIndices[1]], rotation: 0 },
      right: { ...correctCube.right },
    });
  } else {
    // Fallback: all shuffled
    const shuffled = [...faceLabels];
    rng.shuffle(shuffled);
    distractors.push({
      top: { label: shuffled[0], rotation: 0 },
      front: { label: shuffled[1], rotation: 0 },
      right: { label: shuffled[2], rotation: 0 },
    });
  }

  // Ensure we have exactly 5 distractors
  while (distractors.length < 5) {
    const shuffled = [...faceLabels];
    rng.shuffle(shuffled);
    distractors.push({
      top: { label: shuffled[0], rotation: rng.nextInt(0, 4) * 90 },
      front: { label: shuffled[1], rotation: rng.nextInt(0, 4) * 90 },
      right: { label: shuffled[2], rotation: rng.nextInt(0, 4) * 90 },
    });
  }

  const options: CubeOption[] = [correctCube, ...distractors.slice(0, 5)];
  rng.shuffle(options);
  const correctIndex = options.indexOf(correctCube);

  const data: SpatialQuestionData = {
    type: 'cube_net',
    difficulty: 'medium',
    netFaces,
  };

  return { data, options, correctIndex };
}

// ── Hard: 3D wireframe comparison ──────────────────────────────────────────

interface Vertex3D {
  x: number;
  y: number;
  z: number;
}

// Simple 3D shapes defined by vertices and edges
function generateSimple3DObject(
  rng: ReturnType<typeof createPRNG>
): { vertices: Vertex3D[]; edges: [number, number][] } {
  const shapeType = rng.nextInt(0, 5);

  switch (shapeType) {
    case 0: {
      // L-shape (two connected cuboids)
      const s = 40;
      const vertices: Vertex3D[] = [
        { x: 0, y: 0, z: 0 },
        { x: s, y: 0, z: 0 },
        { x: s, y: s, z: 0 },
        { x: 0, y: s, z: 0 },
        { x: 0, y: 0, z: s },
        { x: s, y: 0, z: s },
        { x: s, y: s * 0.5, z: s },
        { x: 0, y: s * 0.5, z: s },
      ];
      const edges: [number, number][] = [
        [0, 1], [1, 2], [2, 3], [3, 0],
        [4, 5], [5, 6], [6, 7], [7, 4],
        [0, 4], [1, 5], [2, 6], [3, 7],
      ];
      return { vertices, edges };
    }
    case 1: {
      // Pyramid
      const s = 40;
      const vertices: Vertex3D[] = [
        { x: -s, y: -s, z: 0 },
        { x: s, y: -s, z: 0 },
        { x: s, y: s, z: 0 },
        { x: -s, y: s, z: 0 },
        { x: 0, y: 0, z: s * 1.2 },
      ];
      const edges: [number, number][] = [
        [0, 1], [1, 2], [2, 3], [3, 0],
        [0, 4], [1, 4], [2, 4], [3, 4],
      ];
      return { vertices, edges };
    }
    case 2: {
      // T-shape (two connected blocks)
      const s = 30;
      const vertices: Vertex3D[] = [
        // Vertical bar
        { x: -s * 0.3, y: 0, z: 0 },
        { x: s * 0.3, y: 0, z: 0 },
        { x: s * 0.3, y: s * 2, z: 0 },
        { x: -s * 0.3, y: s * 2, z: 0 },
        { x: -s * 0.3, y: 0, z: s * 0.6 },
        { x: s * 0.3, y: 0, z: s * 0.6 },
        // Top bar
        { x: -s, y: s * 2, z: 0 },
        { x: s, y: s * 2, z: 0 },
        { x: s, y: s * 2, z: s * 0.6 },
        { x: -s, y: s * 2, z: s * 0.6 },
      ];
      const edges: [number, number][] = [
        [0, 1], [1, 2], [2, 3], [3, 0],
        [4, 5], [0, 4], [1, 5],
        [6, 7], [7, 8], [8, 9], [9, 6],
        [3, 6], [2, 7],
      ];
      return { vertices, edges };
    }
    case 3: {
      // Wedge / triangular prism
      const s = 40;
      const vertices: Vertex3D[] = [
        { x: -s, y: -s * 0.5, z: 0 },
        { x: s, y: -s * 0.5, z: 0 },
        { x: 0, y: s * 0.8, z: 0 },
        { x: -s, y: -s * 0.5, z: s * 0.7 },
        { x: s, y: -s * 0.5, z: s * 0.7 },
        { x: 0, y: s * 0.8, z: s * 0.7 },
      ];
      const edges: [number, number][] = [
        [0, 1], [1, 2], [2, 0],
        [3, 4], [4, 5], [5, 3],
        [0, 3], [1, 4], [2, 5],
      ];
      return { vertices, edges };
    }
    default: {
      // Irregular hexahedron (skewed box)
      const s = 35;
      const skew = rng.nextInt(10, 25);
      const vertices: Vertex3D[] = [
        { x: 0, y: 0, z: 0 },
        { x: s, y: 0, z: 0 },
        { x: s + skew, y: s, z: 0 },
        { x: skew, y: s, z: 0 },
        { x: 0, y: 0, z: s * 0.8 },
        { x: s, y: 0, z: s * 0.8 },
        { x: s + skew, y: s, z: s * 0.8 },
        { x: skew, y: s, z: s * 0.8 },
      ];
      const edges: [number, number][] = [
        [0, 1], [1, 2], [2, 3], [3, 0],
        [4, 5], [5, 6], [6, 7], [7, 4],
        [0, 4], [1, 5], [2, 6], [3, 7],
      ];
      return { vertices, edges };
    }
  }
}

function projectTo2D(
  vertices: Vertex3D[],
  angleX: number,
  angleY: number
): [number, number][] {
  const cosX = Math.cos(angleX);
  const sinX = Math.sin(angleX);
  const cosY = Math.cos(angleY);
  const sinY = Math.sin(angleY);

  return vertices.map((v) => {
    // Rotate around Y axis
    let x = v.x * cosY + v.z * sinY;
    const z1 = -v.x * sinY + v.z * cosY;
    // Rotate around X axis
    let y = v.y * cosX - z1 * sinX;
    // Simple orthographic projection (ignore z after rotation)

    // Center in 200x200 viewport
    x = Math.round(x + 100);
    y = Math.round(-y + 100); // flip y for SVG coordinates

    return [x, y] as [number, number];
  });
}

function mirrorObject(obj: {
  vertices: Vertex3D[];
  edges: [number, number][];
}): { vertices: Vertex3D[]; edges: [number, number][] } {
  return {
    vertices: obj.vertices.map((v) => ({ x: -v.x, y: v.y, z: v.z })),
    edges: [...obj.edges],
  };
}

function generateWireframeQuestion(
  rng: ReturnType<typeof createPRNG>
): Question {
  const referenceObj = generateSimple3DObject(rng);

  // Reference projection angle
  const refAngleX = 0.4 + rng.next() * 0.3;
  const refAngleY = 0.5 + rng.next() * 0.4;

  const referenceVertices = projectTo2D(
    referenceObj.vertices,
    refAngleX,
    refAngleY
  );

  // Correct answer: same object from a different angle
  const correctAngleX = refAngleX + 0.3 + rng.next() * 0.5;
  const correctAngleY = refAngleY + 0.4 + rng.next() * 0.6;

  const correctVertices = projectTo2D(
    referenceObj.vertices,
    correctAngleX,
    correctAngleY
  );

  const correctOption: WireframeOption = {
    vertices: correctVertices,
    edges: referenceObj.edges,
  };

  // Generate 5 distractors
  const distractors: WireframeOption[] = [];

  // Distractor 1: Mirror image from same angle
  const mirrored = mirrorObject(referenceObj);
  distractors.push({
    vertices: projectTo2D(mirrored.vertices, correctAngleX, correctAngleY),
    edges: mirrored.edges,
  });

  // Distractor 2: Different object entirely
  const diffObj1 = generateSimple3DObject(rng);
  const da1 = 0.3 + rng.next() * 0.6;
  const da2 = 0.4 + rng.next() * 0.6;
  distractors.push({
    vertices: projectTo2D(diffObj1.vertices, da1, da2),
    edges: diffObj1.edges,
  });

  // Distractor 3: Another different object
  const diffObj2 = generateSimple3DObject(rng);
  const da3 = 0.5 + rng.next() * 0.4;
  const da4 = 0.3 + rng.next() * 0.5;
  distractors.push({
    vertices: projectTo2D(diffObj2.vertices, da3, da4),
    edges: diffObj2.edges,
  });

  // Distractor 4: Mirror of a different object
  const mirroredDiff = mirrorObject(diffObj1);
  distractors.push({
    vertices: projectTo2D(mirroredDiff.vertices, da1 + 0.3, da2 + 0.2),
    edges: mirroredDiff.edges,
  });

  // Distractor 5: Reference object from very different angle (almost flat)
  distractors.push({
    vertices: projectTo2D(referenceObj.vertices, 0.05, correctAngleY + 1.2),
    edges: referenceObj.edges,
  });

  const options: WireframeOption[] = [
    correctOption,
    ...distractors.slice(0, 5),
  ];
  rng.shuffle(options);
  const correctIndex = options.indexOf(correctOption);

  const data: SpatialQuestionData = {
    type: 'wireframe',
    difficulty: 'hard',
    referenceEdges: referenceObj.edges,
    referenceVertices,
  };

  return { data, options, correctIndex };
}

// ── Main generator ─────────────────────────────────────────────────────────

function generateSpatialQuestion(
  seed: number,
  questionIndex: number
): Question {
  const rng = createPRNG(seed * 41843 + questionIndex * 6571);

  if (questionIndex < 10) {
    return generateRotationQuestion(rng);
  } else if (questionIndex < 22) {
    return generateCubeNetQuestion(rng);
  } else {
    return generateWireframeQuestion(rng);
  }
}

// ── Test definition ────────────────────────────────────────────────────────

const spatialTest: TestType = {
  slug: 'spatial',
  name: 'Spatial Reasoning',
  shortName: 'sp',
  description:
    'Mental rotation, cube net folding, and 3D wireframe comparison.',
  icon: '\u2B21',
  totalQuestions: 30,
  learnMoreUrl: '/learn/fluid-vs-crystallized-intelligence',
  generateQuestion: generateSpatialQuestion,
  renderQuestion() {
    return null;
  },
  renderOption() {
    return null;
  },
};

export default spatialTest;

export type { ShapePrimitive, SpatialQuestionData, RotationOption, CubeOption, WireframeOption, NetFace };
