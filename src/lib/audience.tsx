'use client';

import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { track } from '@vercel/analytics';
import { trackedDevelopments } from '@/data/market';

// ─── Tier Definitions ─────────────────────────────────────────────
// consumer      → buyer / lead funnel (public-facing)
// realtor       → cooperating broker wanting market data
// sales-agent   → developer's listing agent (picks a specific building)
export type AudienceTier = 'consumer' | 'realtor' | 'sales-agent';

interface AudienceContextValue {
  tier: AudienceTier;
  setTier: (tier: AudienceTier) => void;
  /** CTA label for scheduling */
  ctaLabel: string;
  /** Whether the user has pro access (realtor or sales-agent) */
  isPro: boolean;
  /** Selected development slug — only relevant for sales-agent tier */
  selectedDevelopment: string | null;
  /** Set the selected development slug (sales-agent tier) */
  setSelectedDevelopment: (slug: string | null) => void;
  /** Display name of the selected development, if any */
  selectedDevelopmentName: string | null;
}

const AudienceContext = createContext<AudienceContextValue | undefined>(undefined);

const STORAGE_KEY = 'tbmr-audience-tier';
const DEV_STORAGE_KEY = 'tbmr-selected-development';

const CTA_LABELS: Record<AudienceTier, string> = {
  consumer: 'Schedule Presentation',
  realtor: 'Schedule Broker Preview',
  'sales-agent': 'Schedule Broker Preview',
};

export function AudienceProvider({ children }: { children: ReactNode }) {
  const [tier, setTierState] = useState<AudienceTier>('consumer');
  const [selectedDev, setSelectedDevState] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as AudienceTier | null;
    if (stored && ['consumer', 'realtor', 'sales-agent'].includes(stored)) {
      setTierState(stored);
    }
    const storedDev = localStorage.getItem(DEV_STORAGE_KEY);
    if (storedDev) {
      setSelectedDevState(storedDev);
    }
    setMounted(true);
  }, []);

  function setTier(newTier: AudienceTier) {
    setTierState(newTier);
    localStorage.setItem(STORAGE_KEY, newTier);
    // Capture audience identity in analytics (consumer vs realtor vs sales-agent)
    try {
      track('audience_tier', { tier: newTier });
    } catch {
      /* analytics optional — never block UX */
    }
    // Clear selected development if switching away from sales-agent
    if (newTier !== 'sales-agent') {
      setSelectedDevState(null);
      localStorage.removeItem(DEV_STORAGE_KEY);
    }
  }

  function setSelectedDevelopment(slug: string | null) {
    setSelectedDevState(slug);
    if (slug) {
      localStorage.setItem(DEV_STORAGE_KEY, slug);
    } else {
      localStorage.removeItem(DEV_STORAGE_KEY);
    }
  }

  // Prevent hydration mismatch — render with default until mounted
  const activeTier = mounted ? tier : 'consumer';
  const activeDev = mounted ? selectedDev : null;

  // Resolve the development name from slug
  const selectedDevelopmentName = activeDev
    ? trackedDevelopments.find((d) => d.slug === activeDev)?.name ?? null
    : null;

  return (
    <AudienceContext.Provider
      value={{
        tier: activeTier,
        setTier,
        ctaLabel: CTA_LABELS[activeTier],
        isPro: activeTier === 'realtor' || activeTier === 'sales-agent',
        selectedDevelopment: activeDev,
        setSelectedDevelopment,
        selectedDevelopmentName,
      }}
    >
      {children}
    </AudienceContext.Provider>
  );
}

export function useAudience() {
  const ctx = useContext(AudienceContext);
  if (!ctx) {
    throw new Error('useAudience must be used within an AudienceProvider');
  }
  return ctx;
}

/**
 * Returns the appropriate CTA label without requiring the context.
 * Useful for server components or static defaults.
 */
export function getDefaultCtaLabel(tier: AudienceTier = 'consumer'): string {
  return CTA_LABELS[tier];
}
