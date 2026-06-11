#!/usr/bin/env node
/**
 * Issue a Decision Room session token after payment.
 * Usage:
 *   DECISION_ROOM_SESSION_SECRET=your-secret node scripts/issue-decision-room-token.mjs
 *   node scripts/issue-decision-room-token.mjs --days 7 --industry "Healthcare" --role "CFO"
 */
import { createSession } from '../api/lib/session-token.mjs';

const secret = process.env.DECISION_ROOM_SESSION_SECRET;
if (!secret) {
  console.error('Set DECISION_ROOM_SESSION_SECRET in the environment.');
  process.exit(1);
}

const args = process.argv.slice(2);
const opts = { ttlHours: 48, maxApiCalls: 15, industry: '', role: '' };
for (let i = 0; i < args.length; i++) {
  if (args[i] === '--days') opts.ttlHours = Number(args[++i]) * 24;
  else if (args[i] === '--hours') opts.ttlHours = Number(args[++i]);
  else if (args[i] === '--industry') opts.industry = args[++i] || '';
  else if (args[i] === '--role') opts.role = args[++i] || '';
  else if (args[i] === '--max-calls') opts.maxApiCalls = Number(args[++i]);
}

const { token, payload } = createSession(secret, opts);
console.log('Session ID:', payload.sub);
console.log('Expires (unix):', payload.exp);
console.log('');
console.log('Access URL:');
console.log(`https://aielevate.xyz/?token=${encodeURIComponent(token)}#decision-room`);
console.log('');
console.log('Token (for email / Make.com):');
console.log(token);
