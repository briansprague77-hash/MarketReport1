'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Lock } from 'lucide-react';
import { useAudience } from '@/lib/audience';

interface LeadGateProps {
  /** Unique id for this gate — unlock state is remembered per id (localStorage). */
  id: string;
  /** Headline shown on the lock card. */
  title?: string;
  /** Sub-copy explaining the value exchange. */
  subtitle?: string;
  /** Building/context tag stored with the lead. */
  development?: string;
  /** Analytics/CRM source tag. */
  source?: string;
  /** The gated (premium) content. */
  children: React.ReactNode;
}

/**
 * Soft email-wall. Renders a teaser of the premium content (blurred) with an
 * email capture overlay. On submit it POSTs to /api/lead — tagged with the
 * visitor's audience tier (buyer / realtor / developer) and building — then
 * unlocks the content and remembers the unlock so they're never re-gated.
 *
 * Top-of-funnel (SEO) content stays open; only premium data sits behind this.
 */
export default function LeadGate({
  id,
  title = 'Unlock the full data',
  subtitle = 'Enter your email to see full pricing, sold comps, and the market report — sourced, no spin.',
  development,
  source = 'lead-gate',
  children,
}: LeadGateProps) {
  const { tier } = useAudience();
  const [unlocked, setUnlocked] = useState(false);
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'error'>('idle');

  const storageKey = `tbmr-gate-${id}`;

  useEffect(() => {
    if (localStorage.getItem(storageKey) || localStorage.getItem('tbmr-gate-global')) {
      setUnlocked(true);
    }
  }, [storageKey]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setStatus('sending');
    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          development,
          source: `${source} · ${tier}`,
          interest: `unlock:${id} · ${tier}`,
        }),
      });
      if (!res.ok) throw new Error();
      // Unlock everywhere for this visitor (one email unlocks the site's gates)
      localStorage.setItem(storageKey, email);
      localStorage.setItem('tbmr-gate-global', email);
      setUnlocked(true);
    } catch {
      setStatus('error');
    }
  }

  if (unlocked) return <>{children}</>;

  return (
    <div className="relative overflow-hidden rounded-2xl border border-gold-500/20">
      {/* Blurred teaser of the real content */}
      <div className="pointer-events-none max-h-[420px] overflow-hidden blur-[6px] opacity-40 select-none" aria-hidden="true">
        {children}
      </div>

      {/* Capture overlay */}
      <div className="absolute inset-0 flex items-center justify-center bg-charcoal-950/80 backdrop-blur-sm p-6">
        <motion.div
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md text-center"
        >
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gold-500/15 text-gold-400">
            <Lock className="h-5 w-5" />
          </div>
          <h3 className="font-heading text-2xl font-bold text-ivory-50 mb-2">{title}</h3>
          <p className="text-sm font-body text-charcoal-300 mb-6">{subtitle}</p>
          <form onSubmit={submit} className="flex flex-col sm:flex-row gap-3">
            <input
              type="email" required placeholder="you@email.com"
              value={email} onChange={(e) => setEmail(e.target.value)}
              className="flex-1 rounded-lg border border-charcoal-700 bg-charcoal-900/80 px-4 py-3 text-sm font-body text-ivory-100 placeholder-charcoal-500 focus:border-gold-500/50 focus:outline-none"
            />
            <button
              type="submit" disabled={status === 'sending'}
              className="rounded-lg bg-gold-500 hover:bg-gold-400 disabled:opacity-60 text-charcoal-950 text-sm font-body font-bold uppercase tracking-wide px-6 py-3 transition-colors whitespace-nowrap"
            >
              {status === 'sending' ? 'Unlocking…' : 'Unlock'}
            </button>
          </form>
          {status === 'error' && (
            <p className="mt-3 text-xs font-body text-red-400">Something went wrong — try again.</p>
          )}
          <p className="mt-3 text-[11px] font-body text-charcoal-500">
            One email unlocks every report on the site. No spam — just data.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
