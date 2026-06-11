import { verifySession, bumpApiCalls } from '../lib/session-token.mjs';
import { applyCors, readJsonBody } from '../lib/cors.mjs';

export default async function handler(req, res) {
  applyCors(req, res);
  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const secret = process.env.DECISION_ROOM_SESSION_SECRET;
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!secret || !apiKey) return res.status(503).json({ error: 'Decision Room API not configured' });

  try {
    const body = await readJsonBody(req);
    const token = body.token || req.headers['x-session-token'];
    if (!token) return res.status(400).json({ error: 'Missing session token' });

    const session = verifySession(token, secret);
    if (!session) return res.status(401).json({ error: 'Invalid or expired session token' });

    const maxCalls = session.maxApiCalls || 15;
    if ((session.apiCalls || 0) >= maxCalls) {
      return res.status(429).json({ error: 'Session API limit reached' });
    }

    const { messages, system, type } = body;
    if (!Array.isArray(messages) || !system) {
      return res.status(400).json({ error: 'Missing messages or system prompt' });
    }

    const model = process.env.ANTHROPIC_MODEL || 'claude-sonnet-4-20250514';
    const upstream = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model,
        max_tokens: type === 'debrief' ? 2500 : 2000,
        system,
        messages,
      }),
    });

    const data = await upstream.json();
    if (!upstream.ok) {
      return res.status(upstream.status).json({
        error: data.error?.message || `Anthropic error (${upstream.status})`,
      });
    }

    const text = (data.content || []).map((c) => c.text || '').join('');
    const bumped = bumpApiCalls(session, secret);
    res.setHeader('X-Session-Token', bumped.token);

    return res.status(200).json({
      text,
      usage: {
        apiCalls: bumped.payload.apiCalls,
        maxApiCalls: bumped.payload.maxApiCalls,
        callsRemaining: Math.max(0, bumped.payload.maxApiCalls - bumped.payload.apiCalls),
      },
    });
  } catch (e) {
    return res.status(500).json({ error: e.message || 'Server error' });
  }
}
