import { describe, it, expect, beforeEach, vi } from 'vitest';
import { saveResult, loadResults, clearResults, STORAGE_KEY } from '@/lib/results-store';
import type { StoredResult } from '@/lib/results-store';

// Minimal localStorage mock for Node test environment
class MemoryStorage {
  private data = new Map<string, string>();
  getItem(k: string) { return this.data.get(k) ?? null; }
  setItem(k: string, v: string) { this.data.set(k, v); }
  removeItem(k: string) { this.data.delete(k); }
  clear() { this.data.clear(); }
}

beforeEach(() => {
  const ls = new MemoryStorage();
  const ss = new MemoryStorage();
  vi.stubGlobal('localStorage', ls);
  vi.stubGlobal('sessionStorage', ss);
});

function makeResult(overrides: Partial<StoredResult> = {}): StoredResult {
  return {
    testType: 'matrix',
    iq: 120,
    percentile: 90,
    rawScore: 22,
    completedAt: '2026-04-18T03:00:00.000Z',
    seed: 'abc123',
    answers: '012345012345012345012345012345',
    signature: '',
    ...overrides,
  };
}

describe('saveResult — happy path', () => {
  it('writes a record and returns success', () => {
    const r = makeResult();
    const outcome = saveResult(r);
    expect(outcome.success).toBe(true);
    if (outcome.success) expect(outcome.usedFallback).toBe(false);
    const loaded = loadResults();
    expect(loaded).toHaveLength(1);
    expect(loaded[0]).toEqual(r);
  });

  it('persists under STORAGE_KEY in localStorage', () => {
    saveResult(makeResult());
    const raw = localStorage.getItem(STORAGE_KEY);
    expect(raw).not.toBeNull();
    const parsed = JSON.parse(raw!);
    expect(parsed.version).toBe(1);
    expect(Array.isArray(parsed.results)).toBe(true);
  });
});

describe('saveResult — dedupe', () => {
  it('replaces earlier record for the same testType', () => {
    const first = makeResult({ testType: 'matrix', iq: 100, completedAt: '2026-04-18T03:00:00.000Z' });
    const second = makeResult({ testType: 'matrix', iq: 120, completedAt: '2026-04-18T04:00:00.000Z' });
    saveResult(first);
    saveResult(second);
    const loaded = loadResults();
    expect(loaded).toHaveLength(1);
    expect(loaded[0].iq).toBe(120);
  });

  it('keeps records for different testTypes', () => {
    saveResult(makeResult({ testType: 'matrix', iq: 100 }));
    saveResult(makeResult({ testType: 'spatial', iq: 110 }));
    saveResult(makeResult({ testType: 'numerical', iq: 115 }));
    const loaded = loadResults();
    expect(loaded).toHaveLength(3);
    expect(loaded.map(r => r.testType).sort()).toEqual(['matrix', 'numerical', 'spatial']);
  });
});

describe('saveResult — fallback on quota error', () => {
  it('falls back to sessionStorage when localStorage throws', () => {
    const throwingLs = {
      getItem: () => null,
      setItem: () => { throw new Error('QuotaExceededError'); },
      removeItem: () => {},
      clear: () => {},
      length: 0,
      key: () => null,
    };
    vi.stubGlobal('localStorage', throwingLs);

    const r = makeResult();
    const outcome = saveResult(r);
    expect(outcome.success).toBe(true);
    if (outcome.success) expect(outcome.usedFallback).toBe(true);

    const loaded = loadResults();
    expect(loaded).toHaveLength(1);
    expect(loaded[0]).toEqual(r);
  });

  it('returns failure when both storages throw', () => {
    const throwing = {
      getItem: () => null,
      setItem: () => { throw new Error('blocked'); },
      removeItem: () => {},
      clear: () => {},
      length: 0,
      key: () => null,
    };
    vi.stubGlobal('localStorage', throwing);
    vi.stubGlobal('sessionStorage', throwing);

    const outcome = saveResult(makeResult());
    expect(outcome.success).toBe(false);
    if (!outcome.success) expect(outcome.reason).toBe('both_quotas_exceeded');
  });
});

describe('loadResults — corruption tolerance', () => {
  it('returns [] when stored JSON is malformed', () => {
    localStorage.setItem(STORAGE_KEY, 'not json at all');
    expect(loadResults()).toEqual([]);
  });

  it('returns [] when version mismatches', () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ version: 99, results: [makeResult()] }));
    expect(loadResults()).toEqual([]);
  });
});

describe('clearResults', () => {
  it('empties both storages', () => {
    saveResult(makeResult());
    clearResults();
    expect(loadResults()).toEqual([]);
  });
});

describe('TestShell integration — result shape matches what composite reads', () => {
  it('saved record has all fields composite/page.tsx needs', () => {
    const r = makeResult({ testType: 'matrix', iq: 127 });
    saveResult(r);
    const [loaded] = loadResults();
    // These fields are read by composite/page.tsx
    expect(loaded.testType).toBeDefined();
    expect(loaded.iq).toBeTypeOf('number');
    expect(loaded.seed).toBeTypeOf('string');
    expect(loaded.answers).toBeTypeOf('string');
    expect(loaded.answers.length).toBe(30);
    expect(loaded.completedAt).toMatch(/^\d{4}-\d{2}-\d{2}T/);
    expect(loaded).toHaveProperty('signature');
  });
});
