import { screenMessage, defangUrls } from './screening.js';

// The path a visitor's "talk to Jorge" request takes. Only 'allow' reaches deliver(); 'review'
// is parked via hold() for a human look; 'block' goes nowhere. To the visitor, delivered,
// held and blocked look identical, so a bot cannot learn which wording gets through.
// Rate limiting runs first and counts every attempt, so spamming costs the sender, not you.
export function createHandoff({ deliver, hold, limiter, globalLimiter, screen = screenMessage }) {
  const thanks = { ok: true };
  return async function submit(request) {
    const { ip = 'unknown', name = '', contact = '', message = '' } = request;
    if (!limiter.take(ip) || !globalLimiter.take('all')) return { status: 'rate_limited', response: { ok: false, retry: true } };

    const result = screen(request);
    if (result.decision === 'block') return { status: 'rejected', reasons: result.reasons, response: thanks };

    // Visitor text is data: links are defanged, and the screening verdict travels with it.
    const payload = {
      name: name.slice(0, 80), contact: contact.slice(0, 120), message: defangUrls(result.clean),
      screening: { decision: result.decision, score: result.score, reasons: result.reasons, injection: result.injection },
    };
    if (result.decision === 'review') { await hold(payload); return { status: 'held', response: thanks }; }
    await deliver(payload);
    return { status: 'delivered', response: thanks };
  };
}
