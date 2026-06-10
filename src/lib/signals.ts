// Thin wrapper over the Common Room Signals queue (window.signals).
// Safe no-op when Signals isn't loaded (e.g. key unset or SSR).

type SignalsQueue = { identify?: (p: Record<string, unknown>) => void };

/**
 * Tie a known email (and optional traits) to the current anonymous visitor,
 * so Common Room links the session to a person/company.
 */
export function identifyVisitor(email: string, traits?: Record<string, unknown>) {
  if (typeof window === 'undefined' || !email) return;
  try {
    (window as unknown as { signals?: SignalsQueue }).signals?.identify?.({ email, ...traits });
  } catch {
    /* never block UX */
  }
}
