'use client';

import { useMemo } from 'react';
import { trackedDevelopments, DevelopmentSummary } from '@/data/developments';

// ─── Geographic Filter Types ─────────────────────────────────────────────────

export type GeoFilter =
  | 'tampa-bay'
  // Pinellas
  | 'pinellas'
  | 'downtown-stpete'
  | 'mirror-lake'
  | 'stpete-beach'
  | 'clearwater-beach'
  // Hillsborough
  | 'hillsborough'
  | 'downtown-tampa'
  | 'water-street'
  | 'channel-district'
  | 'bayshore-blvd'
  | 'westshore'
  // Sarasota
  | 'sarasota'
  | 'the-quay'
  | 'downtown-sarasota'
  | 'golden-gate-point';

// Micromarket slug mappings — keyed by GeoFilter, valued by development slugs
const MICROMARKET_SLUGS: Record<string, string[]> = {
  // Pinellas
  'downtown-stpete': ['waldorf-astoria', 'art-house', '400-central', 'roche-bobois', 'reflection', 'kolter-3rd-ave', 'kolter-bayfront'],
  'mirror-lake': ['the-cade', 'lake-house'],
  'stpete-beach': ['corey-landings'],
  'clearwater-beach': ['viceroy-clearwater'],
  // Hillsborough
  'downtown-tampa': ['pendry-tampa', 'one-tampa'],
  'water-street': ['tampa-edition'],
  'channel-district': ['hotel-ora'],
  'bayshore-blvd': ['ritz-carlton-tower-ii', 'altura-bayshore'],
  'westshore': ['aqua-westshore'],
  // Sarasota
  'the-quay': ['ritz-carlton-sarasota-bay', 'one-park-sarasota', '1000-boulevard-of-the-arts'],
  'downtown-sarasota': ['the-edge-sarasota', 'waldorf-astoria-sarasota', 'sota-residences', 'mira-mar-sarasota', 'adagio-sarasota', 'high-line-sarasota', 'the-palm-625', 'saravela-sarasota', 'the-gallery-sarasota'],
  'golden-gate-point': ['six88-residences', 'peninsula-sarasota', 'amara-sarasota-bay', 'the-owen-golden-gate-point'],
};

const GEO_LABELS: Record<GeoFilter, string> = {
  'tampa-bay': 'Tampa Bay',
  // Pinellas
  pinellas: 'Pinellas County',
  'downtown-stpete': 'Downtown St. Petersburg',
  'mirror-lake': 'Mirror Lake',
  'stpete-beach': 'St. Pete Beach',
  'clearwater-beach': 'Clearwater Beach',
  // Hillsborough
  hillsborough: 'Hillsborough County',
  'downtown-tampa': 'Downtown Tampa',
  'water-street': 'Water Street',
  'channel-district': 'Channel District',
  'bayshore-blvd': 'Bayshore Blvd',
  'westshore': 'Westshore',
  // Sarasota
  sarasota: 'Sarasota County',
  'the-quay': 'The Quay',
  'downtown-sarasota': 'Downtown Sarasota',
  'golden-gate-point': 'Golden Gate Point',
};

// Status colors
const STATUS_COLORS: Record<string, string> = {
  'shadow-inventory': '#78909C',
  'reservation': '#8B5CF6',
  'pre-sales': '#3B82F6',
  'under-construction': '#F59E0B',
  'delivered': '#0D9668',
  'sold-out': '#6B7280',
};

// ─── Return type ─────────────────────────────────────────────────────────────

export interface MarketData {
  filtered: DevelopmentSummary[];
  totalUnits: number;
  totalDevs: number;
  statusGroups: Record<string, number>;
  countyGroups: Record<string, { units: number; devs: number }>;
  developerData: { name: string; value: number }[];
  hhi: number;
  tiers: { value: number; mid: number; premium: number; ultra: number };
  tierBuildings: { value: string[]; mid: string[]; premium: string[]; ultra: string[] };
  brandedUnits: number;
  independentUnits: number;
  brandedCount: number;
  independentCount: number;
  avgPsf: number;
  minPsf: number;
  maxPsf: number;
  avgResalePsf: number;        // Current market — what a buyer pays today
  avgDeveloperClosePsf: number; // Historical contract closes — deflated prices
  statusChartData: { name: string; units: number; fill: string }[];
  psfChartData: { name: string; pps: number; developerClose?: number }[];
  deliveryForecast: { year: string; units: number }[];
  geoLabel: string;
}

// ─── Static dev counts per geo (avoids computing useMarketData for every tab) ─

// Build counts dynamically from MICROMARKET_SLUGS
const _microCounts = Object.fromEntries(
  Object.entries(MICROMARKET_SLUGS).map(([key, slugs]) => [
    key,
    trackedDevelopments.filter((d) => slugs.includes(d.slug)).length,
  ]),
) as Record<string, number>;

export const GEO_DEV_COUNTS: Record<GeoFilter, number> = {
  'tampa-bay': trackedDevelopments.length,
  pinellas: trackedDevelopments.filter((d) => d.county === 'pinellas').length,
  hillsborough: trackedDevelopments.filter((d) => d.county === 'hillsborough').length,
  sarasota: trackedDevelopments.filter((d) => d.county === 'sarasota').length,
  ..._microCounts,
} as Record<GeoFilter, number>;

// ─── Hook ────────────────────────────────────────────────────────────────────

export function useMarketData(geo: GeoFilter): MarketData {
  return useMemo(() => {
    // 1. Filter
    const filtered = trackedDevelopments.filter((d) => {
      switch (geo) {
        case 'tampa-bay':
          return true;
        case 'pinellas':
          return d.county === 'pinellas';
        case 'hillsborough':
          return d.county === 'hillsborough';
        case 'sarasota':
          return d.county === 'sarasota';
        case 'downtown-stpete':
        case 'mirror-lake':
        case 'stpete-beach':
        case 'clearwater-beach':
          return MICROMARKET_SLUGS[geo].includes(d.slug);
      }
    });

    // Exclude shadow inventory and sold-out from active market metrics
    // (still included in filtered for display — pages remain)
    const activeMarket = filtered.filter((d) =>
      d.status !== 'sold-out' && d.status !== 'shadow-inventory',
    );
    const totalUnits = activeMarket.reduce((s, d) => s + d.units, 0);
    const totalDevs = activeMarket.length;

    // 2. Status groups
    const statusGroups: Record<string, number> = {};
    for (const d of activeMarket) {
      statusGroups[d.status] = (statusGroups[d.status] ?? 0) + d.units;
    }

    // 3. County groups
    const countyGroups: Record<string, { units: number; devs: number }> = {};
    for (const d of activeMarket) {
      const c = d.county;
      if (!countyGroups[c]) countyGroups[c] = { units: 0, devs: 0 };
      countyGroups[c].units += d.units;
      countyGroups[c].devs += 1;
    }

    // 4. Developer data + HHI
    const devMap: Record<string, number> = {};
    for (const d of activeMarket) {
      const dev = d.developer ?? 'Unknown';
      devMap[dev] = (devMap[dev] ?? 0) + d.units;
    }
    const developerData = Object.entries(devMap)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value);

    const hhi =
      totalUnits > 0
        ? developerData.reduce((sum, d) => {
            const share = (d.value / totalUnits) * 100;
            return sum + share * share;
          }, 0)
        : 0;

    // 5. PSF tiers — only bucket buildings with known PSF data
    const tiers = { value: 0, mid: 0, premium: 0, ultra: 0 };
    const tierBuildings: { value: string[]; mid: string[]; premium: string[]; ultra: string[] } = {
      value: [], mid: [], premium: [], ultra: [],
    };
    for (const d of activeMarket) {
      const psf = d.resalePsf ?? d.developerClosePsf ?? d.avgPsf ?? 0;
      if (psf <= 0) continue; // Skip buildings with no PSF data — don't pollute tiers
      if (psf < 700) {
        tiers.value += d.units;
        tierBuildings.value.push(d.name);
      } else if (psf < 1000) {
        tiers.mid += d.units;
        tierBuildings.mid.push(d.name);
      } else if (psf < 1300) {
        tiers.premium += d.units;
        tierBuildings.premium.push(d.name);
      } else {
        tiers.ultra += d.units;
        tierBuildings.ultra.push(d.name);
      }
    }

    // 6. Branded vs independent (hospitality + lifestyle brands)
    const branded = activeMarket.filter((d) =>
      d.tags?.includes('Hospitality Brand') || d.tags?.includes('Lifestyle Brand'),
    );
    const brandedUnits = branded.reduce((s, d) => s + d.units, 0);
    const independentUnits = totalUnits - brandedUnits;
    const brandedCount = branded.length;
    const independentCount = totalDevs - brandedCount;

    // 7. PSF stats (only from devs with avgPsf > 0)
    const withPsf = activeMarket.filter((d) => (d.avgPsf ?? 0) > 0);
    const psfValues = withPsf.map((d) => d.avgPsf!);
    const avgPsf =
      psfValues.length > 0
        ? Math.round(psfValues.reduce((s, v) => s + v, 0) / psfValues.length)
        : 0;
    const minPsf = psfValues.length > 0 ? Math.min(...psfValues) : 0;
    const maxPsf = psfValues.length > 0 ? Math.max(...psfValues) : 0;

    // 7b. Developer close PSF vs Current market (resale) PSF
    // Developer close = historical contract prices (deflated — buyers signed 2-3 years ago)
    // Resale PSF = what a buyer would pay TODAY on the open market
    const withResale = activeMarket.filter((d) => (d.resalePsf ?? 0) > 0);
    const resaleValues = withResale.map((d) => d.resalePsf!);
    const avgResalePsf =
      resaleValues.length > 0
        ? Math.round(resaleValues.reduce((s, v) => s + v, 0) / resaleValues.length)
        : 0;

    const withDevClose = activeMarket.filter((d) => (d.developerClosePsf ?? 0) > 0);
    const devCloseValues = withDevClose.map((d) => d.developerClosePsf!);
    const avgDeveloperClosePsf =
      devCloseValues.length > 0
        ? Math.round(devCloseValues.reduce((s, v) => s + v, 0) / devCloseValues.length)
        : 0;

    // 8. Status chart data
    const statusLabels: Record<string, string> = {
      'shadow-inventory': 'Shadow Inventory',
      'reservation': 'Reservation',
      'pre-sales': 'Pre-Sales',
      'under-construction': 'Under Construction',
      'delivered': 'Delivered',
      'sold-out': 'Sold Out',
    };
    const statusChartData = Object.entries(statusGroups)
      .map(([status, units]) => ({
        name: statusLabels[status] ?? status,
        units,
        fill: STATUS_COLORS[status] ?? '#6B7280',
      }))
      .sort((a, b) => b.units - a.units);

    // 9. PSF chart data — shows current market (resale) PSF when available, falls back to avgPsf
    const psfChartData = withPsf
      .map((d) => ({
        name: d.name,
        pps: d.resalePsf ?? d.avgPsf!,           // Current market price (resale or current ask)
        developerClose: d.developerClosePsf ?? 0,  // Historical contract price
      }))
      .sort((a, b) => a.pps - b.pps);

    // 10. Delivery forecast — exclude delivered/sold-out buildings
    const COMPLETED_STATUSES = ['delivered', 'sold-out'];
    const futureSupply = activeMarket.filter((d) =>
      !COMPLETED_STATUSES.includes(d.status) &&
      d.units > 0, // exclude 0-unit placeholders
    );
    const yearMap: Record<string, number> = {};
    for (const d of futureSupply) {
      const match = d.delivery.match(/(\d{4})/);
      if (!match) continue; // Skip TBD deliveries entirely — they don't belong in a forecast chart
      const year = match[1];
      yearMap[year] = (yearMap[year] ?? 0) + d.units;
    }
    const deliveryForecast = Object.entries(yearMap)
      .map(([year, units]) => ({ year, units }))
      .sort((a, b) => a.year.localeCompare(b.year));

    const geoLabel = GEO_LABELS[geo];

    return {
      filtered,
      totalUnits,
      totalDevs,
      statusGroups,
      countyGroups,
      developerData,
      hhi,
      tiers,
      tierBuildings,
      brandedUnits,
      independentUnits,
      brandedCount,
      independentCount,
      avgPsf,
      minPsf,
      maxPsf,
      avgResalePsf,
      avgDeveloperClosePsf,
      statusChartData,
      psfChartData,
      deliveryForecast,
      geoLabel,
    };
  }, [geo]);
}
