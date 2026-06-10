'use client';

import { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { useAudience, type AudienceTier } from '@/lib/audience';

const CHOSEN_KEY = 'tbmr-audience-chosen';

const OPTIONS: { tier: AudienceTier; label: string }[] = [
  { tier: 'consumer', label: "I'm Buying" },
  { tier: 'realtor', label: "I'm a Realtor" },
  { tier: 'sales-agent', label: 'Developer Sales' },
];

/**
 * Slim, dismissible bar prompting visitors to self-identify (buyer / realtor /
 * developer sales). Sets the audience tier — which personalizes content AND is
 * captured into analytics + tags every lead, so we can see who's on the site.
 * Shows once until a choice is made or dismissed (persisted in localStorage).
 */
export default function AudienceBar() {
  const { setTier } = useAudience();
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem(CHOSEN_KEY)) setShow(true);
  }, []);

  function choose(tier: AudienceTier) {
    setTier(tier);
    localStorage.setItem(CHOSEN_KEY, tier);
    setShow(false);
  }

  function dismiss() {
    localStorage.setItem(CHOSEN_KEY, 'dismissed');
    setShow(false);
  }

  if (!show) return null;

  return (
    <div className="fixed bottom-0 inset-x-0 z-[60] border-t border-gold-500/30 bg-charcoal-950/95 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-5">
        <span className="text-sm font-body text-ivory-200">
          Tailor this report to you —
        </span>
        <div className="flex flex-wrap items-center justify-center gap-2">
          {OPTIONS.map((o) => (
            <button
              key={o.tier}
              onClick={() => choose(o.tier)}
              className="rounded-lg border border-gold-500/40 bg-gold-500/10 px-4 py-1.5 text-sm font-body font-semibold text-gold-300 hover:bg-gold-500/20 hover:text-gold-200 transition-colors"
            >
              {o.label}
            </button>
          ))}
        </div>
        <button
          onClick={dismiss}
          aria-label="Dismiss"
          className="absolute right-3 top-3 sm:static text-charcoal-500 hover:text-ivory-300 transition-colors"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
