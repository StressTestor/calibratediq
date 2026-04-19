import { describe, it, expect } from 'vitest';
import { signPayload, verifyPayload, buildMessage, type SignPayload } from '@/lib/signing';

const SECRET = 'test-secret-32-bytes-of-material-x';

function samplePayload(overrides: Partial<SignPayload> = {}): SignPayload {
  return {
    seed: 'abc123',
    answers: '012345012345012345012345012345',
    testType: 'matrix',
    completedAt: '2026-04-18T03:00:00.000Z',
    ...overrides,
  };
}

describe('buildMessage', () => {
  it('joins fields with |', () => {
    const msg = buildMessage(samplePayload());
    expect(msg).toBe('abc123|012345012345012345012345012345|matrix|2026-04-18T03:00:00.000Z');
  });
});

describe('signPayload', () => {
  it('produces a v1: prefixed hex string', async () => {
    const sig = await signPayload(SECRET, samplePayload());
    expect(sig).toMatch(/^v1:[0-9a-f]{64}$/);
  });

  it('is deterministic (same input → same output)', async () => {
    const a = await signPayload(SECRET, samplePayload());
    const b = await signPayload(SECRET, samplePayload());
    expect(a).toBe(b);
  });

  it('changes when any field changes', async () => {
    const base = await signPayload(SECRET, samplePayload());
    const diffSeed = await signPayload(SECRET, samplePayload({ seed: 'xyz789' }));
    const diffAns = await signPayload(SECRET, samplePayload({ answers: '123450123450123450123450123450' }));
    const diffType = await signPayload(SECRET, samplePayload({ testType: 'spatial' }));
    const diffTime = await signPayload(SECRET, samplePayload({ completedAt: '2026-04-18T03:00:00.001Z' }));
    expect(diffSeed).not.toBe(base);
    expect(diffAns).not.toBe(base);
    expect(diffType).not.toBe(base);
    expect(diffTime).not.toBe(base);
  });

  it('produces different output for different secrets', async () => {
    const a = await signPayload(SECRET, samplePayload());
    const b = await signPayload('different-secret-also-32-bytes-yay', samplePayload());
    expect(a).not.toBe(b);
  });
});

describe('verifyPayload', () => {
  it('returns true for a self-signed payload', async () => {
    const p = samplePayload();
    const sig = await signPayload(SECRET, p);
    expect(await verifyPayload(SECRET, p, sig)).toBe(true);
  });

  it('returns false when seed is tampered', async () => {
    const p = samplePayload();
    const sig = await signPayload(SECRET, p);
    expect(await verifyPayload(SECRET, { ...p, seed: 'evilseed' }, sig)).toBe(false);
  });

  it('returns false when answers are tampered', async () => {
    const p = samplePayload();
    const sig = await signPayload(SECRET, p);
    expect(await verifyPayload(SECRET, { ...p, answers: '000000000000000000000000000000' }, sig)).toBe(false);
  });

  it('returns false when testType is swapped', async () => {
    const p = samplePayload();
    const sig = await signPayload(SECRET, p);
    expect(await verifyPayload(SECRET, { ...p, testType: 'spatial' }, sig)).toBe(false);
  });

  it('returns false when completedAt is changed', async () => {
    const p = samplePayload();
    const sig = await signPayload(SECRET, p);
    expect(await verifyPayload(SECRET, { ...p, completedAt: '2026-04-18T04:00:00.000Z' }, sig)).toBe(false);
  });

  it('returns false when signature is tampered', async () => {
    const p = samplePayload();
    const sig = await signPayload(SECRET, p);
    const tampered = 'v1:' + '0'.repeat(64);
    expect(await verifyPayload(SECRET, p, tampered)).toBe(false);
  });

  it('returns false when the v1: prefix is missing', async () => {
    const p = samplePayload();
    const sig = await signPayload(SECRET, p);
    const noPrefix = sig.slice('v1:'.length);
    expect(await verifyPayload(SECRET, p, noPrefix)).toBe(false);
  });

  it('returns false on malformed hex', async () => {
    const p = samplePayload();
    expect(await verifyPayload(SECRET, p, 'v1:not-hex-content!!')).toBe(false);
  });

  it('returns false when the secret differs', async () => {
    const p = samplePayload();
    const sig = await signPayload(SECRET, p);
    expect(await verifyPayload('different-secret-also-32-bytes-yay', p, sig)).toBe(false);
  });

  it('returns false when signature is an empty string (Fix 1 placeholder)', async () => {
    expect(await verifyPayload(SECRET, samplePayload(), '')).toBe(false);
  });
});
