import { signPayload, type SignPayload } from '@/lib/signing';
import { allow, clientIp } from '@/lib/rate-limit';

export const runtime = 'edge';

const ALLOWED_TEST_TYPES = new Set([
  'matrix', 'spatial', 'numerical', 'logical', 'verbal', 'memory',
]);

export async function POST(request: Request): Promise<Response> {
  const secret = process.env.RESULT_SIGNING_SECRET;
  if (!secret) {
    return Response.json({ error: 'server_misconfigured' }, { status: 500 });
  }

  // Rate limit before doing any crypto work so a flood can't DoS the endpoint.
  const ip = clientIp(request);
  if (!allow(ip, 'sign')) {
    return Response.json({ error: 'rate_limited' }, { status: 429 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: 'invalid_json' }, { status: 400 });
  }

  if (
    !body ||
    typeof body !== 'object' ||
    typeof (body as Record<string, unknown>).seed !== 'string' ||
    typeof (body as Record<string, unknown>).answers !== 'string' ||
    typeof (body as Record<string, unknown>).testType !== 'string' ||
    typeof (body as Record<string, unknown>).completedAt !== 'string'
  ) {
    return Response.json({ error: 'missing_fields' }, { status: 400 });
  }

  const payload = body as SignPayload;
  if (!ALLOWED_TEST_TYPES.has(payload.testType)) {
    return Response.json({ error: 'invalid_test_type' }, { status: 400 });
  }
  // Guardrails: answers must be 30 digit-characters in [0-5]
  if (!/^[0-5]{30}$/.test(payload.answers)) {
    return Response.json({ error: 'invalid_answers' }, { status: 400 });
  }
  // seed is base36 up to reasonable length
  if (!/^[0-9a-z]{1,16}$/.test(payload.seed)) {
    return Response.json({ error: 'invalid_seed' }, { status: 400 });
  }
  // completedAt must parse as a date
  if (Number.isNaN(Date.parse(payload.completedAt))) {
    return Response.json({ error: 'invalid_completed_at' }, { status: 400 });
  }

  const sig = await signPayload(secret, payload);
  return Response.json({ sig }, { status: 200 });
}
