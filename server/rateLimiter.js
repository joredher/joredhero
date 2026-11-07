// A small sliding-window limiter. `now` is injectable so tests never wait for real time.
// In production this state must live somewhere shared (a Worker's KV/Durable Object, a
// database row), because each request may run in a fresh process.
export function createRateLimiter({ max, windowMs, now = Date.now }) {
  const hits = new Map();
  return {
    // Records an attempt and returns false when `key` has used up its allowance.
    take(key) {
      const t = now();
      const recent = (hits.get(key) ?? []).filter(time => t - time < windowMs);
      if (recent.length >= max) { hits.set(key, recent); return false; }
      recent.push(t);
      hits.set(key, recent);
      return true;
    },
  };
}
