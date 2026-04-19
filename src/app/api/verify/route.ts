import { verifyPayload, type SignPayload } from '@/lib/signing';
import { allow, clientIp } from '@/lib/rate-limit';

export const runtime = 'edge';

export async function GET(request: Request): Promise<Response> {
  const secret = process.env.RESULT_SIGNING_SECRET;
  if (!secret) {
    return Response.json({ valid: false, error: 'server_misconfigured' }, { status: 500 });
  }

  const ip = clientIp(request);
  if (!allow(ip, 'verify')) {
    return Response.json({ valid: false, error: 'rate_limited' }, { status: 429 });
  }

  const url = new URL(request.url);
  const seed = url.searchParams.get('s');
  const answers = url.searchParams.get('a');
  const testType = url.searchParams.get('t');
  const completedAt = url.searchParams.get('ct');
  const signature = url.searchParams.get('sig');

  if (!seed || !answers || !testType || !completedAt || !signature) {
    return Response.json({ valid: false }, { status: 200 });
  }

  const payload: SignPayload = { seed, answers, testType, completedAt };
  const valid = await verifyPayload(secret, payload, signature);
  return Response.json({ valid }, { status: 200 });
}
