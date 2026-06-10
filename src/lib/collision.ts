import type { DevelopmentSummary } from '@/data/developments';

// ─── Collision Score Types ──────────────────────────────────────────────────

export interface CollisionScore {
  projectA: string; // slug
  projectB: string; // slug
  nameA: string;
  nameB: string;
  deliveryOverlap: number;
  priceBandOverlap: number;
  unitMixOverlap: number;
  locationOverlap: number;
  typeOverlap: number;
  totalScore: number; // 0-100
  classification: 'direct' | 'secondary' | 'low';
}

// ─── Helpers ────────────────────────────────────────────────────────────────

function extractYear(delivery: string): number | null {
  const match = delivery.match(/(\d{4})/);
  return match ? parseInt(match[1], 10) : null;
}

function classifyCollision(score: number): 'direct' | 'secondary' | 'low' {
  if (score > 60) return 'direct';
  if (score > 30) return 'secondary';
  return 'low';
}

// ─── Score Computation ──────────────────────────────────────────────────────

function computePairScore(a: DevelopmentSummary, b: DevelopmentSummary): CollisionScore {
  // 1. Delivery overlap (0-25)
  let deliveryOverlap = 0;
  const yearA = extractYear(a.delivery);
  const yearB = extractYear(b.delivery);
  if (yearA && yearB) {
    const diff = Math.abs(yearA - yearB);
    if (diff === 0) deliveryOverlap = 25;
    else if (diff === 1) deliveryOverlap = 15;
    else if (diff === 2) deliveryOverlap = 5;
  }

  // 2. Price band overlap (0-25)
  let priceBandOverlap = 0;
  const psfA = a.avgPsf ?? 0;
  const psfB = b.avgPsf ?? 0;
  if (psfA > 0 && psfB > 0) {
    const maxPsf = Math.max(psfA, psfB);
    const minPsf = Math.min(psfA, psfB);
    const ratio = (maxPsf - minPsf) / maxPsf;
    if (ratio <= 0.2) priceBandOverlap = 25;
    else if (ratio <= 0.4) priceBandOverlap = 15;
    else if (ratio <= 0.6) priceBandOverlap = 5;
  }

  // 3. Unit mix overlap (0-15)
  let unitMixOverlap = 5;
  const uA = a.units;
  const uB = b.units;
  if ((uA < 50 && uB < 50)) unitMixOverlap = 15;
  else if ((uA >= 50 && uA <= 200) && (uB >= 50 && uB <= 200)) unitMixOverlap = 10;
  else if ((uA > 200 && uB > 200)) unitMixOverlap = 10;

  // 4. Location overlap (0-20)
  let locationOverlap = 0;
  if (a.submarket && b.submarket && a.submarket === b.submarket) {
    locationOverlap = 20;
  } else if (a.county === b.county) {
    locationOverlap = 10;
  }

  // 5. Type overlap (0-15)
  let typeOverlap = 5;
  const aIsBranded = a.tags?.includes('Branded Residence') ?? false;
  const bIsBranded = b.tags?.includes('Branded Residence') ?? false;
  if (aIsBranded && bIsBranded) typeOverlap = 15;
  else if (!aIsBranded && !bIsBranded) typeOverlap = 10;

  const totalScore = deliveryOverlap + priceBandOverlap + unitMixOverlap + locationOverlap + typeOverlap;

  return {
    projectA: a.slug,
    projectB: b.slug,
    nameA: a.name,
    nameB: b.name,
    deliveryOverlap,
    priceBandOverlap,
    unitMixOverlap,
    locationOverlap,
    typeOverlap,
    totalScore,
    classification: classifyCollision(totalScore),
  };
}

// ─── Public API ─────────────────────────────────────────────────────────────

export function computeCollisionScores(developments: DevelopmentSummary[]): CollisionScore[] {
  const scores: CollisionScore[] = [];
  for (let i = 0; i < developments.length; i++) {
    for (let j = i + 1; j < developments.length; j++) {
      scores.push(computePairScore(developments[i], developments[j]));
    }
  }
  return scores.sort((a, b) => b.totalScore - a.totalScore);
}

export function getTopCompetitors(
  slug: string,
  scores: CollisionScore[],
  limit = 5,
): CollisionScore[] {
  return scores
    .filter((s) => s.projectA === slug || s.projectB === slug)
    .sort((a, b) => b.totalScore - a.totalScore)
    .slice(0, limit);
}

export function getAverageCollisionScore(
  slug: string,
  scores: CollisionScore[],
): number {
  const relevant = scores.filter((s) => s.projectA === slug || s.projectB === slug);
  if (relevant.length === 0) return 0;
  return Math.round(relevant.reduce((sum, s) => sum + s.totalScore, 0) / relevant.length);
}
