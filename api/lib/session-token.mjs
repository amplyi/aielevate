import crypto from 'crypto';

function b64urlEncode(str) {
  return Buffer.from(str, 'utf8').toString('base64url');
}

function b64urlDecode(str) {
  return Buffer.from(str, 'base64url').toString('utf8');
}

export function signSession(payload, secret) {
  const body = b64urlEncode(JSON.stringify(payload));
  const sig = crypto.createHmac('sha256', secret).update(body).digest('base64url');
  return `${body}.${sig}`;
}

export function verifySession(token, secret) {
  if (!token || typeof token !== 'string') return null;
  const parts = token.split('.');
  if (parts.length !== 2) return null;
  const [body, sig] = parts;
  const expected = crypto.createHmac('sha256', secret).update(body).digest('base64url');
  const sigBuf = Buffer.from(sig);
  const expBuf = Buffer.from(expected);
  if (sigBuf.length !== expBuf.length || !crypto.timingSafeEqual(sigBuf, expBuf)) return null;
  try {
    const payload = JSON.parse(b64urlDecode(body));
    if (!payload.exp || payload.exp * 1000 < Date.now()) return null;
    return payload;
  } catch {
    return null;
  }
}

export function createSession(secret, opts = {}) {
  const now = Math.floor(Date.now() / 1000);
  const payload = {
    sub: opts.sessionId || crypto.randomUUID(),
    product: 'decision-room',
    industry: opts.industry || '',
    role: opts.role || '',
    apiCalls: 0,
    maxApiCalls: opts.maxApiCalls ?? 15,
    maxTurns: opts.maxTurns ?? 6,
    exp: now + (opts.ttlHours ?? 48) * 3600,
    iat: now,
  };
  return { token: signSession(payload, secret), payload };
}

export function bumpApiCalls(payload, secret) {
  const next = { ...payload, apiCalls: (payload.apiCalls || 0) + 1 };
  return { payload: next, token: signSession(next, secret) };
}
