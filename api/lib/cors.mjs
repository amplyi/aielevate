const DEFAULT_ORIGINS = [
  'https://aielevate.xyz',
  'https://www.aielevate.xyz',
  'http://localhost:5500',
  'http://127.0.0.1:5500',
  'http://localhost:3000',
];

export function applyCors(req, res) {
  const origin = req.headers.origin || '';
  const allowed = process.env.DECISION_ROOM_ALLOWED_ORIGINS
    ? process.env.DECISION_ROOM_ALLOWED_ORIGINS.split(',').map((s) => s.trim())
    : DEFAULT_ORIGINS;
  if (allowed.includes(origin) || origin.endsWith('.vercel.app')) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, X-Session-Token');
  res.setHeader('Access-Control-Expose-Headers', 'X-Session-Token');
}

export function readJsonBody(req) {
  return new Promise((resolve, reject) => {
    let data = '';
    req.on('data', (chunk) => {
      data += chunk;
      if (data.length > 1e6) reject(new Error('Body too large'));
    });
    req.on('end', () => {
      try {
        resolve(data ? JSON.parse(data) : {});
      } catch (e) {
        reject(e);
      }
    });
    req.on('error', reject);
  });
}
