/**
 * AnalyticalProfile — Middle-tier data type between DevelopmentProfile and Development
 *
 * Extends DevelopmentProfile with optional analytical fields (competitors,
 * sales snapshots, price points, market evidence, timeline, press highlights).
 *
 * Because every new field is optional, existing DevelopmentProfile data files
 * remain valid — no breaking changes, no registry updates needed.
 *
 * ProfilePage conditionally renders analytical sections when these fields
 * are present in the data.
 */

import { DevelopmentProfile } from './development-profile';
import {
  PricePoint,
  Competitor,
  MarketEvidence,
  TimelineEvent,
  PressHighlight,
  LocationCategory,
} from './development';

// ─── Sales Snapshot — lightweight subset of SalesMetrics ─────────────────────
// Not every profile needs monthly absorption curves. This captures the headline
// numbers that matter for positioning without requiring the full SalesMetrics.

export interface SalesSnapshot {
  totalUnits: number;
  soldUnits: number;
  availableUnits: number;
  soldPercentage: number;
  velocity?: string;            // e.g., "4.2/mo"
  launchDate?: string;
  contractValue?: string;       // e.g., "$185M"
  selloutEstimate?: string;     // e.g., "Q3 2027"
}

// ─── AnalyticalProfile — progressive enhancement over DevelopmentProfile ─────

export interface AnalyticalProfile extends DevelopmentProfile {
  // Sales performance
  salesSnapshot?: SalesSnapshot;

  // Pricing tiers
  pricePoints?: PricePoint[];

  // Competitive landscape
  competitors?: Competitor[];

  // Market evidence / supporting data points
  marketEvidence?: MarketEvidence[];

  // Development timeline
  timeline?: TimelineEvent[];

  // Press coverage
  pressHighlights?: PressHighlight[];

  // Location intelligence (detailed venues, not just scores)
  locationCategories?: LocationCategory[];
}

// ─── Type guard ──────────────────────────────────────────────────────────────

export function isAnalyticalProfile(
  profile: DevelopmentProfile,
): profile is AnalyticalProfile {
  const p = profile as AnalyticalProfile;
  return !!(
    p.salesSnapshot ||
    p.pricePoints ||
    p.competitors ||
    p.marketEvidence ||
    p.timeline ||
    p.pressHighlights ||
    p.locationCategories
  );
}
