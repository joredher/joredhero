// A plain, one-off check (not a React hook) — nothing here subscribes to changes,
// callers just need the current value at a specific moment (inside an effect or
// event handler). Safe to call anywhere, including during a build-time SSR render,
// where `window` doesn't exist.
export function prefersReducedMotion() {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}
