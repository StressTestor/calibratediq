/**
 * HMAC-SHA256 signing for result URLs. Uses Web Crypto (available in both
 * the Vercel edge runtime and Node 18+ test environment).
 *
 * Signature format: `v1:<64-char hex>`. The `v1:` prefix lets future secret
 * rotations ship a `v2:` variant while still verifying old links during a
 * grace period.
 */

export interface SignPayload {
  seed: string;
  answers: string;
  testType: string;
  completedAt: string;
}

export function buildMessage(p: SignPayload): string {
  return `${p.seed}|${p.answers}|${p.testType}|${p.completedAt}`;
}

function bufferToHex(buf: ArrayBuffer): string {
  const bytes = new Uint8Array(buf);
  let out = '';
  for (const b of bytes) out += b.toString(16).padStart(2, '0');
  return out;
}

function hexToBuffer(hex: string): ArrayBuffer {
  const clean = hex.toLowerCase();
  if (clean.length % 2 !== 0 || !/^[0-9a-f]*$/.test(clean)) {
    throw new Error('invalid hex');
  }
  const out = new Uint8Array(clean.length / 2);
  for (let i = 0; i < out.length; i++) {
    out[i] = parseInt(clean.slice(i * 2, i * 2 + 2), 16);
  }
  return out.buffer;
}

async function importKey(secret: string, usage: KeyUsage[]): Promise<CryptoKey> {
  return crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    usage
  );
}

export async function signPayload(secret: string, p: SignPayload): Promise<string> {
  const key = await importKey(secret, ['sign']);
  const sig = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(buildMessage(p)));
  return `v1:${bufferToHex(sig)}`;
}

export async function verifyPayload(
  secret: string,
  p: SignPayload,
  signature: string,
): Promise<boolean> {
  if (!signature.startsWith('v1:')) return false;
  const hex = signature.slice('v1:'.length);
  let sigBuf: ArrayBuffer;
  try {
    sigBuf = hexToBuffer(hex);
  } catch {
    return false;
  }
  const key = await importKey(secret, ['verify']);
  try {
    return await crypto.subtle.verify('HMAC', key, sigBuf, new TextEncoder().encode(buildMessage(p)));
  } catch {
    return false;
  }
}
