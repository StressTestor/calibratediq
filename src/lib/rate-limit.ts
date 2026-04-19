// Shared in-memory per-instance rate limiter.
// Vercel edge spins up multiple instances, so this is best-effort: an attacker
// could spread requests across instances and exceed the limit in aggregate.
// That's acceptable — this limiter exists for DoS shaping, not as a security
// boundary. Upgrade to Upstash if abuse materializes.

export const DEFAULT_WINDOW_MS = 60_000;
export const DEFAULT_LIMIT = 60;

// Single global store keyed by `${bucket}:${ip}` so different endpoints get
// independent buckets (a flood on /api/sign cannot starve /api/verify).
const store = new Map<string, number[]>();

export function allow(
  ip: string,
  bucket: string,
  windowMs: number = DEFAULT_WINDOW_MS,
  limit: number = DEFAULT_LIMIT,
): boolean {
  const key = `${bucket}:${ip}`;
  const now = Date.now();
  const arr = (store.get(key) ?? []).filter((t) => now - t < windowMs);
  if (arr.length >= limit) {
    store.set(key, arr);
    return false;
  }
  arr.push(now);
  store.set(key, arr);
  return true;
}

export function clientIp(request: Request): string {
  // Vercel's trusted real-IP header. Do NOT trust X-Forwarded-For (spoofable).
  const real = request.headers.get('x-real-ip');
  if (real) return real;
  // Fallback for local dev without Vercel headers.
  return 'unknown';
}

// Test-only helper so unit tests can clear state between cases.
export function __resetRateLimitStore(): void {
  store.clear();
}
