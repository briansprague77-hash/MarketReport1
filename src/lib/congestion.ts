import type { DevelopmentSummary } from '@/data/developments';

// ─── Congestion Score Types ─────────────────────────────────────────────────

export type CongestionLevel = 'low' | 'manageable' | 'elevated' | 'crowded';

export interface CongestionResult {
  slug: string;
  name: string;
  score: number;          // 0-100
  level: CongestionLevel;
  competingUnits: number;
  competingDevs: number;
  delivery: string;
}

// ─── Classification ─────────────────────────────────────────────────────────

export function classifyCongestion(score: number): CongestionLevel {
  if (score < 25) return 'low';
  if (score < 50) return 'manageable';
  if (score < 75) return 'elevated';
  return 'crowded';
}

export const CONGESTION_COLORS: Record<CongestionLevel, string> = {
  low: '#10B981',         // emerald-500
  manageable: '#F59E0B',  // amber-500
  elevated: '#F97316',    // orange-500
  crowded: '#EF4444',     // red-500
};

export const CONGESTION_LABELS: Record<CongestionLevel, string> = {
  low: 'Low',
  manageable: 'Manageable',
  elevated: 'Elevated',
  crowded: 'Crowded',
};

// ─── Delivery Year Extraction ───────────────────────────────────────────────

function extractDeliveryYear(delivery: string): number | null {
  // Match 4-digit year
  const match = delivery.match(/\b(20\d{2})\b/);
  if (match) return parseInt(match[1], 10);

  // Handle "Available Now" or "Delivered" as current year
  if (/available|delivered|complete/i.test(delivery)) return 2026;

  return null;
}

// ─── PSF Tier Check ─────────────────────────────────────────────────────────

function samePriceTier(psfA: number | undefined, psfB: number | undefined): boolean {
  if (!psfA || !psfB) return false;
  const ratio = Math.min(psfA, psfB) / Math.max(psfA, psfB);
  return ratio >= 0.7; // within 30%
}

// ─── Compute Congestion Scores ──────────────────────────────────────────────

export function computeCongestionScores(devs: DevelopmentSummary[]): CongestionResult[] {
  const results: CongestionResult[] = [];

  // Filter out reservation-phase buildings, sold-out, 0-unit placeholders, and TBD deliveries
  const activeDevs = devs.filter((d) =>
    d.status !== 'shadow-inventory' &&
    d.status !== 'reservation' &&
    d.status !== 'sold-out' &&
    d.units > 0 &&
    extractDeliveryYear(d.delivery) !== null,
  );

  for (const dev of activeDevs) {
    const devYear = extractDeliveryYear(dev.delivery);
    if (devYear === null) continue; // shouldn't happen after filter, but safe

    let weightedCompetition = 0;
    let competingUnits = 0;
    let competingDevs = 0;

    for (const other of activeDevs) {
      if (other.slug === dev.slug) continue;

      const otherYear = extractDeliveryYear(other.delivery);
      if (otherYear === null) continue;

      // Within +/- 1 year
      if (Math.abs(devYear - otherYear) > 1) continue;

      competingDevs++;
      let weight = 1;

      // Same price tier: 2x weight
      if (samePriceTier(dev.avgPsf, other.avgPsf)) {
        weight *= 2;
      }

      // Same submarket: 2x weight
      if (dev.submarket && other.submarket && dev.submarket === other.submarket) {
        weight *= 2;
      } else if (dev.county === other.county) {
        weight *= 1.5; // Same county but different submarket
      }

      competingUnits += other.units;
      weightedCompetition += other.units * weight;
    }

    // Normalize to 0-100 scale
    // Baseline: 3000 weighted competing units = score of 100 (scaled for 31-building pipeline)
    const rawScore = Math.min(100, (weightedCompetition / 3000) * 100);
    const score = Math.round(rawScore);

    results.push({
      slug: dev.slug,
      name: dev.name,
      score,
      level: classifyCongestion(score),
      competingUnits,
      competingDevs,
      delivery: dev.delivery,
    });
  }

  // Sort by score descending
  return results.sort((a, b) => b.score - a.score);
}
