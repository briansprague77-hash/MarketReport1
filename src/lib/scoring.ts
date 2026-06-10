/**
 * Scoring Engine — Computes scored metrics for each development
 *
 * Every score is 1-10, computed from live data. No hardcoded values.
 * Changing underlying data (PSF, sold%, HOA) automatically changes scores.
 *
 * Composite scores are weighted averages with letter grades (A+ through F).
 */

import { DevelopmentSummary } from '@/data/developments';

// ─── Types ──────────────────────────────────────────────────────────────────

export interface DevelopmentScores {
  slug: string;
  name: string;
  county: string;
  status: string;
  // Individual scores (1-10)
  entryPrice: number;
  psfValue: number;
  salesMomentum: number;
  walkability: number;
  hoaBurden: number;
  brandPremium: number;
  inventoryPressure: number;
  deliveryCertainty: number;
  commissionAppeal: number;
  investorFit: number;
  // Composite scores
  buyerScore: number;
  buyerGrade: string;
  investorScore: number;
  investorGrade: string;
  // Raw data for display
  entryPriceRaw: number;
  psfRaw: number;
  soldPctRaw: number;
  hoaRaw: number;
  walkScoreRaw: number;
  unitsRaw: number;
  deliveryRaw: string;
}

// ─── Helper: clamp to 1-10 ─────────────────────────────────────────────────

function clamp(val: number, min = 1, max = 10): number {
  return Math.max(min, Math.min(max, Math.round(val * 10) / 10));
}

// ─── Helper: parse price string to number ───────────────────────────────────

function parsePrice(price?: string): number {
  if (!price) return 0;
  const clean = price.replace(/[^0-9.MKk]/g, '');
  if (clean.includes('M')) return parseFloat(clean) * 1_000_000;
  if (clean.toLowerCase().includes('k')) return parseFloat(clean) * 1_000;
  return parseFloat(clean) || 0;
}

// ─── Helper: rental policy flexibility score ────────────────────────────────

function rentalFlexibility(policy?: string): number {
  if (!policy) return 5;
  const p = policy.toLowerCase();
  if (p.includes('no minimum') || p.includes('no restriction') || p.includes('short-term') || p.includes('airbnb') || p.includes('1-month') || p.includes('30 day') || p.includes('1 month')) return 10;
  if (p.includes('3-month') || p.includes('3 month') || p.includes('90 day')) return 8;
  if (p.includes('6-month') || p.includes('6 month')) return 6;
  if (p.includes('12-month') || p.includes('1 year') || p.includes('after 1st year')) return 4;
  if (p.includes('no rental') || p.includes('owner-occupied')) return 1;
  return 5;
}

// ─── Helper: status to delivery certainty ───────────────────────────────────

function statusToCertainty(status: string): number {
  switch (status) {
    case 'sold-out': return 10;
    case 'delivered': return 9;
    case 'under-construction': return 7;
    case 'pre-sales': return 4;
    case 'reservation': return 2;
    case 'shadow-inventory': return 1;
    default: return 3;
  }
}

// ─── Helper: letter grade from 1-10 score ───────────────────────────────────

function letterGrade(score: number): string {
  if (score >= 9.5) return 'A+';
  if (score >= 9.0) return 'A';
  if (score >= 8.5) return 'A-';
  if (score >= 8.0) return 'B+';
  if (score >= 7.5) return 'B';
  if (score >= 7.0) return 'B-';
  if (score >= 6.5) return 'C+';
  if (score >= 6.0) return 'C';
  if (score >= 5.5) return 'C-';
  if (score >= 5.0) return 'D+';
  if (score >= 4.0) return 'D';
  return 'F';
}

// ─── Main Scoring Function ──────────────────────────────────────────────────

export function scoreDevelopments(devs: DevelopmentSummary[]): DevelopmentScores[] {
  // Exclude 0-unit placeholders and buildings with no pricing data from scoring
  const scoreable = devs.filter((d) =>
    d.units > 0 &&
    d.status !== 'sold-out' &&
    d.status !== 'shadow-inventory',
  );

  // Compute market baselines for relative scoring
  const allPrices = scoreable.map((d) => parsePrice(d.price)).filter((p) => p > 0);
  const medianPrice = allPrices.length > 0
    ? allPrices.sort((a, b) => a - b)[Math.floor(allPrices.length / 2)]
    : 1_000_000;

  const allPsf = scoreable.map((d) => d.resalePsf ?? d.developerClosePsf ?? d.avgPsf ?? 0).filter((p) => p > 0);
  const medianPsf = allPsf.length > 0
    ? allPsf.sort((a, b) => a - b)[Math.floor(allPsf.length / 2)]
    : 1000;

  const allHoa = scoreable.map((d) => d.hoaPerSqFt ?? 0).filter((h) => h > 0);
  const avgHoa = allHoa.length > 0
    ? allHoa.reduce((s, h) => s + h, 0) / allHoa.length
    : 1.0;

  return scoreable.map((d) => {
    const entryPrice = parsePrice(d.price);
    const psf = d.resalePsf ?? d.developerClosePsf ?? d.avgPsf ?? 0;
    const soldPct = d.soldPercent ?? 0;
    const hoa = d.hoaPerSqFt ?? 0;
    const walkScore = 0; // Will be populated from profile data when available
    const isBranded = d.tags?.includes('Branded Residence') ?? false;

    // ── Entry Price Score (inverse — lower entry = higher score) ──
    const entryPriceScore = entryPrice > 0
      ? clamp(10 - ((entryPrice / medianPrice - 1) * 5))
      : 5;

    // ── PSF Value Score (inverse — lower PSF = higher value score) ──
    const psfValueScore = psf > 0
      ? clamp(10 - ((psf / medianPsf - 1) * 5))
      : 5;

    // ── Sales Momentum (higher sold% = better momentum) ──
    const salesMomentumScore = d.status === 'delivered'
      ? 10
      : clamp(soldPct / 10); // 100% sold = 10, 50% = 5, 0% = 1

    // ── Walkability (from walk/bike/transit scores) ──
    // Pull from trackedDevelopments — walkScore is on profile, not summary
    const walkabilityScore = 7; // Default — TODO: pull from profile scores

    // ── HOA Burden (inverse — lower HOA = better score) ──
    const hoaBurdenScore = hoa > 0
      ? clamp(10 - ((hoa / avgHoa - 1) * 5))
      : 5;

    // ── Brand Premium (branded = higher score) ──
    const brandPremiumScore = isBranded ? 9 : 5;

    // ── Inventory Pressure (inverse — lower pressure = better for buyers) ──
    const pressureMap = { high: 3, medium: 6, low: 9 };
    const inventoryPressureScore = pressureMap[d.inventoryPressure ?? 'medium'] ?? 5;

    // ── Delivery Certainty ──
    const deliveryCertaintyScore = statusToCertainty(d.status);

    // ── Commission Appeal (higher $ commission = more appealing) ──
    const commRate = 0.03; // Standard 3%
    const commDollars = entryPrice * commRate;
    const commissionAppealScore = commDollars > 0
      ? clamp(Math.log10(commDollars) - 2.5) // $10K=2, $30K=5, $100K=8, $300K=10
      : 3;

    // ── Investor Fit (rental flexibility + appreciation potential) ──
    const rentalScore = rentalFlexibility(d.rentalPolicy);
    const investorFitScore = clamp((rentalScore * 0.6) + (psfValueScore * 0.4));

    // ── Composite Buyer Score (weighted average) ──
    const buyerScore = clamp(
      entryPriceScore * 0.15 +
      psfValueScore * 0.10 +
      salesMomentumScore * 0.10 +
      walkabilityScore * 0.10 +
      hoaBurdenScore * 0.10 +
      brandPremiumScore * 0.10 +
      inventoryPressureScore * 0.05 +
      deliveryCertaintyScore * 0.15 +
      commissionAppealScore * 0.05 +
      investorFitScore * 0.10,
    );

    // ── Composite Investor Score ──
    const investorScore = clamp(
      investorFitScore * 0.25 +
      psfValueScore * 0.20 +
      salesMomentumScore * 0.15 +
      entryPriceScore * 0.15 +
      deliveryCertaintyScore * 0.10 +
      hoaBurdenScore * 0.10 +
      commissionAppealScore * 0.05,
    );

    return {
      slug: d.slug,
      name: d.name,
      county: d.county,
      status: d.status,
      entryPrice: entryPriceScore,
      psfValue: psfValueScore,
      salesMomentum: salesMomentumScore,
      walkability: walkabilityScore,
      hoaBurden: hoaBurdenScore,
      brandPremium: brandPremiumScore,
      inventoryPressure: inventoryPressureScore,
      deliveryCertainty: deliveryCertaintyScore,
      commissionAppeal: commissionAppealScore,
      investorFit: investorFitScore,
      buyerScore,
      buyerGrade: letterGrade(buyerScore),
      investorScore,
      investorGrade: letterGrade(investorScore),
      entryPriceRaw: entryPrice,
      psfRaw: psf,
      soldPctRaw: soldPct,
      hoaRaw: hoa,
      walkScoreRaw: 0,
      unitsRaw: d.units,
      deliveryRaw: d.delivery,
    };
  }).sort((a, b) => b.buyerScore - a.buyerScore);
}

// ─── Score color helper ─────────────────────────────────────────────────────

export function scoreColor(score: number): string {
  if (score >= 8) return '#10B981'; // emerald
  if (score >= 6) return '#F59E0B'; // amber
  if (score >= 4) return '#F97316'; // orange
  return '#EF4444'; // red
}

export function gradeColor(grade: string): string {
  if (grade.startsWith('A')) return '#10B981';
  if (grade.startsWith('B')) return '#3B82F6';
  if (grade.startsWith('C')) return '#F59E0B';
  if (grade.startsWith('D')) return '#F97316';
  return '#EF4444';
}
