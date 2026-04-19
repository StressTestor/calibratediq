import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { allow, clientIp, __resetRateLimitStore, DEFAULT_LIMIT } from '@/lib/rate-limit';

describe('allow', () => {
  beforeEach(() => {
    __resetRateLimitStore();
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-04-18T00:00:00.000Z'));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('returns true while under the limit', () => {
    for (let i = 0; i < DEFAULT_LIMIT; i++) {
      expect(allow('1.2.3.4', 'verify')).toBe(true);
    }
  });

  it('returns false once the limit is reached', () => {
    for (let i = 0; i < DEFAULT_LIMIT; i++) {
      allow('1.2.3.4', 'verify');
    }
    expect(allow('1.2.3.4', 'verify')).toBe(false);
  });

  it('allows again after the window expires', () => {
    for (let i = 0; i < DEFAULT_LIMIT; i++) {
      allow('1.2.3.4', 'verify');
    }
    expect(allow('1.2.3.4', 'verify')).toBe(false);

    // Advance past the window (default 60s).
    vi.advanceTimersByTime(60_001);

    expect(allow('1.2.3.4', 'verify')).toBe(true);
  });

  it('tracks different IPs independently', () => {
    for (let i = 0; i < DEFAULT_LIMIT; i++) {
      allow('1.2.3.4', 'verify');
    }
    expect(allow('1.2.3.4', 'verify')).toBe(false);
    // A different IP still has a fresh bucket.
    expect(allow('5.6.7.8', 'verify')).toBe(true);
  });

  it('tracks different buckets independently so one endpoint cannot starve another', () => {
    for (let i = 0; i < DEFAULT_LIMIT; i++) {
      allow('1.2.3.4', 'sign');
    }
    // sign bucket for this IP is exhausted...
    expect(allow('1.2.3.4', 'sign')).toBe(false);
    // ...but verify bucket for the same IP is untouched.
    expect(allow('1.2.3.4', 'verify')).toBe(true);
  });

  it('respects a custom limit and window', () => {
    expect(allow('9.9.9.9', 'custom', 1_000, 2)).toBe(true);
    expect(allow('9.9.9.9', 'custom', 1_000, 2)).toBe(true);
    expect(allow('9.9.9.9', 'custom', 1_000, 2)).toBe(false);

    vi.advanceTimersByTime(1_001);

    expect(allow('9.9.9.9', 'custom', 1_000, 2)).toBe(true);
  });
});

describe('clientIp', () => {
  it('reads x-real-ip when present', () => {
    const req = new Request('https://example.com/', {
      headers: { 'x-real-ip': '203.0.113.7' },
    });
    expect(clientIp(req)).toBe('203.0.113.7');
  });

  it("falls back to 'unknown' when the header is missing", () => {
    const req = new Request('https://example.com/');
    expect(clientIp(req)).toBe('unknown');
  });

  it('ignores x-forwarded-for (spoofable)', () => {
    const req = new Request('https://example.com/', {
      headers: { 'x-forwarded-for': '198.51.100.1' },
    });
    expect(clientIp(req)).toBe('unknown');
  });
});
