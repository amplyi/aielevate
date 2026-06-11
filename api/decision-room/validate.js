import { verifySession } from '../lib/session-token.mjs';
import { applyCors, readJsonBody } from '../lib/cors.mjs';

export default async function handler(req, res) {
  applyCors(req, res);
  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const secret = process.env.DECISION_ROOM_SESSION_SECRET;
  if (!secret) return res.status(503).json({ error: 'Decision Room API not configured' });

  try {
    const body = await readJsonBody(req);
    const token = body.token || req.headers['x-session-token'];
    if (!token) return res.status(400).json({ error: 'Missing session token' });

    const session = verifySession(token, secret);
    if (!session) return res.status(401).json({ error: 'Invalid or expired session token' });

    const remaining = Math.max(0, (session.maxApiCalls || 15) - (session.apiCalls || 0));
    return res.status(200).json({
      ok: true,
      session: {
        sessionId: session.sub,
        industry: session.industry || '',
        role: session.role || '',
        apiCalls: session.apiCalls || 0,
        maxApiCalls: session.maxApiCalls || 15,
        maxTurns: session.maxTurns || 6,
        expiresAt: session.exp,
        callsRemaining: remaining,
      },
    });
  } catch (e) {
    return res.status(400).json({ error: e.message || 'Bad request' });
  }
}
