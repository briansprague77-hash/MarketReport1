// src/lib/computeMarketEvents.ts
import { trackedDevelopments } from '@/data/market';
import { developmentProfiles } from '@/data/developments';
import { editorialPins } from '@/data/editorialPins';
import type { DevelopmentProfile } from '@/types/development-profile';

export type MarketEventType =
  | 'milestone'
  | 'price-change'
  | 'incentive'
  | 'risk-flag';

export interface MarketEvent {
  date: string;              // ISO yyyy-mm-dd
  devSlug: string;
  devName: string;
  type: MarketEventType;
  headline: string;
  body: string;
  magnitude: number;          // 0-100 intrinsic severity
  score: number;              // recency-decayed, used for sort
}

const RECENCY_WINDOW_DAYS = 90;

function isWithinWindow(daysAgo: number): boolean {
  return daysAgo >= 0 && daysAgo <= RECENCY_WINDOW_DAYS;
}

const MILESTONE_WEIGHTS: Record<string, number> = {
  announcementDate: 40,
  siteAcquisitionDate: 50,
  salesGalleryOpening: 55,
  salesLaunchDate: 70,
  groundbreakingDate: 65,
  constructionStartDate: 65,
  verticalConstructionDate: 70,
  toppingOffDate: 80,
  coDate: 100,
  firstClosingDate: 90,
};

const MILESTONE_LABEL: Record<string, string> = {
  announcementDate: 'announced',
  siteAcquisitionDate: 'site acquired',
  salesGalleryOpening: 'sales gallery opened',
  salesLaunchDate: 'sales launched',
  groundbreakingDate: 'broke ground',
  constructionStartDate: 'construction started',
  verticalConstructionDate: 'vertical construction began',
  toppingOffDate: 'topped off',
  coDate: 'received certificate of occupancy',
  firstClosingDate: 'held first closing',
};

function daysSince(isoDate: string, today = new Date()): number {
  const d = new Date(isoDate);
  if (isNaN(d.getTime())) return Infinity;
  // Normalize today to UTC midnight so it matches ISO date-only parsing
  const todayUtc = Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate());
  return Math.floor((todayUtc - d.getTime()) / 86_400_000);
}

function recencyScore(daysAgo: number): number {
  // 90-day decay window; after 90 days returns 0
  return Math.max(0, RECENCY_WINDOW_DAYS - daysAgo);
}

export function computeMarketEvents(
  topN = 5,
  today = new Date(),
): MarketEvent[] {
  const events: MarketEvent[] = [];

  // Iterate all profile-backed developments (they have lifecycle/pricingHistory/etc.)
  const profileEntries: Array<[string, DevelopmentProfile]> = [];
  for (const [slug, p] of Object.entries(developmentProfiles)) {
    profileEntries.push([slug, p]);
  }

  for (const [slug, p] of profileEntries) {
    const summary = trackedDevelopments.find((d) => d.slug === slug);
    // Skip sold-out developments — their pricingHistory reflects resale market
    // signal, not primary-market activity. Editorial feed is about the pipeline.
    if (summary?.status === 'sold-out' || p.status === 'sold-out') continue;
    const devName = summary?.name ?? p.name ?? slug;

    // 1. Milestones from lifecycle
    if (p.lifecycle) {
      for (const [key, iso] of Object.entries(p.lifecycle)) {
        if (!(key in MILESTONE_WEIGHTS)) continue;
        if (!iso || typeof iso !== 'string') continue;
        const daysAgo = daysSince(iso, today);
        if (!isWithinWindow(daysAgo)) continue;
        const magnitude = MILESTONE_WEIGHTS[key] ?? 50;
        const label = MILESTONE_LABEL[key] ?? key;
        events.push({
          date: iso,
          devSlug: slug,
          devName,
          type: 'milestone',
          headline: `${devName} ${label}`,
          body: `${daysAgo === 0 ? 'today' : `${daysAgo} day${daysAgo === 1 ? '' : 's'} ago`}`,
          magnitude,
          score: recencyScore(daysAgo) * magnitude,
        });
      }
    }

    // 2. Price change from pricingHistory
    if (p.pricingHistory?.asOfDate && p.pricingHistory.priceChangePercent != null) {
      const iso = p.pricingHistory.asOfDate;
      const daysAgo = daysSince(iso, today);
      if (isWithinWindow(daysAgo)) {
        const pct = p.pricingHistory.priceChangePercent;
        const magnitude = Math.min(100, Math.abs(pct) * 5);
        const direction = pct > 0 ? 'raised' : 'cut';
        events.push({
          date: iso,
          devSlug: slug,
          devName,
          type: 'price-change',
          headline: `${devName} ${direction} PSF ${Math.abs(pct).toFixed(1)}%`,
          body: `Launch $${p.pricingHistory.launchPsf ?? '—'} → current $${p.pricingHistory.currentPsf ?? '—'} per SF`,
          magnitude,
          score: recencyScore(daysAgo) * magnitude,
        });
      }
    }

    // 3. Incentives
    if (p.incentives?.asOfDate && p.incentives.effectiveDiscountRate != null) {
      const iso = p.incentives.asOfDate;
      const daysAgo = daysSince(iso, today);
      if (isWithinWindow(daysAgo)) {
        const rate = p.incentives.effectiveDiscountRate;
        const magnitude = Math.min(100, rate * 10);
        events.push({
          date: iso,
          devSlug: slug,
          devName,
          type: 'incentive',
          headline: `${devName} offering ${rate.toFixed(1)}% effective discount`,
          body: p.incentives.notes ?? `${p.incentives.items.length} incentive items active`,
          magnitude,
          score: recencyScore(daysAgo) * magnitude,
        });
      }
    }
  }

  // Prepend editorial pins (Brian-curated overrides / approved broker submissions)
  events.push(...editorialPins);

  // Sort by score descending
  events.sort((a, b) => b.score - a.score);

  // Diversity pass: enforce feed variety before slicing top N.
  //   - Max 1 event per development (prevents one dev from dominating)
  //   - Max MAX_PER_TYPE events of the same type (mixes milestones / prices / incentives)
  const MAX_PER_TYPE = 2;
  const seenSlugs = new Set<string>();
  const typeCount: Record<MarketEventType, number> = {
    milestone: 0,
    'price-change': 0,
    incentive: 0,
    'risk-flag': 0,
  };
  const diversified: MarketEvent[] = [];

  for (const ev of events) {
    if (seenSlugs.has(ev.devSlug)) continue;
    if (typeCount[ev.type] >= MAX_PER_TYPE) continue;
    diversified.push(ev);
    seenSlugs.add(ev.devSlug);
    typeCount[ev.type]++;
    if (diversified.length >= topN) break;
  }

  return diversified;
}
