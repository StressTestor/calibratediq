export type TestType = 'matrix' | 'spatial' | 'numerical' | 'logical' | 'verbal' | 'memory';

export interface StoredResult {
  testType: TestType;
  iq: number;
  percentile: number;
  rawScore: number;
  completedAt: string;
  seed: string;
  answers: string;
  signature: string;
}

export interface SaveResult { success: true; usedFallback: boolean; }
export interface SaveError { success: false; reason: 'both_quotas_exceeded' | 'storage_unavailable'; }
export type SaveOutcome = SaveResult | SaveError;

export const STORAGE_KEY = 'calibratediq:results';
const SCHEMA_VERSION = 1;

interface StoredShape {
  version: number;
  results: StoredResult[];
}

function readRaw(storage: Storage | undefined): StoredShape | null {
  if (!storage) return null;
  try {
    const raw = storage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (parsed?.version !== SCHEMA_VERSION || !Array.isArray(parsed.results)) return null;
    return parsed as StoredShape;
  } catch {
    return null;
  }
}

function writeRaw(storage: Storage, shape: StoredShape): void {
  storage.setItem(STORAGE_KEY, JSON.stringify(shape));
}

export function saveResult(result: StoredResult): SaveOutcome {
  const shape = readRaw(typeof localStorage !== 'undefined' ? localStorage : undefined)
    ?? { version: SCHEMA_VERSION, results: [] };
  // dedupe by testType (most-recent wins)
  const filtered = shape.results.filter(r => r.testType !== result.testType);
  const next: StoredShape = { version: SCHEMA_VERSION, results: [...filtered, result] };

  try {
    writeRaw(localStorage, next);
    return { success: true, usedFallback: false };
  } catch {
    try {
      writeRaw(sessionStorage, next);
      return { success: true, usedFallback: true };
    } catch {
      return { success: false, reason: 'both_quotas_exceeded' };
    }
  }
}

export function loadResults(): StoredResult[] {
  const ls = readRaw(typeof localStorage !== 'undefined' ? localStorage : undefined);
  if (ls) return ls.results;
  const ss = readRaw(typeof sessionStorage !== 'undefined' ? sessionStorage : undefined);
  if (ss) return ss.results;
  return [];
}

export function clearResults(): void {
  try { localStorage.removeItem(STORAGE_KEY); } catch { /* best-effort */ }
  try { sessionStorage.removeItem(STORAGE_KEY); } catch { /* best-effort */ }
}
