# McKinsey-Level Market Report Upgrade

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add geographic filter tabs (Tampa Bay / Pinellas / Hillsborough / Sarasota / Downtown St Pete) to the market report, compute all metrics dynamically from trackedDevelopments, add McKinsey-grade analytics sections, and fix all remaining accuracy issues.

**Architecture:** The MarketReportClient becomes stateful with a `selectedGeo` state variable. A new `useMarketData(geo)` hook filters `trackedDevelopments` and computes all metrics dynamically. All existing section components are refactored to accept a `developments` prop instead of importing `trackedDevelopments` directly. New analytics components are added for supply forecasting, price tier segmentation, and developer concentration.

**Tech Stack:** Next.js 14, TypeScript, Recharts, Framer Motion, Tailwind CSS. No new dependencies.

---

## Task 1: Create `useMarketData` Hook

**Files:**
- Create: `src/hooks/useMarketData.ts`

**Step 1: Create the hook file**

This hook accepts a geographic filter and returns all computed metrics. It replaces hardcoded values throughout the market report.

```typescript
// src/hooks/useMarketData.ts
'use client';

import { useMemo } from 'react';
import { trackedDevelopments, type DevelopmentSummary } from '@/data/developments';

export type GeoFilter = 'tampa-bay' | 'pinellas' | 'hillsborough' | 'sarasota' | 'downtown-stpete';

const DOWNTOWN_STPETE_SLUGS = [
  'waldorf-astoria', 'art-house', '400-central', 'roche-bobois',
  'reflection', 'the-cade', 'lake-house',
];

function filterByGeo(devs: DevelopmentSummary[], geo: GeoFilter): DevelopmentSummary[] {
  switch (geo) {
    case 'tampa-bay': return devs;
    case 'pinellas': return devs.filter(d => d.county === 'pinellas');
    case 'hillsborough': return devs.filter(d => d.county === 'hillsborough');
    case 'sarasota': return devs.filter(d => d.county === 'sarasota');
    case 'downtown-stpete': return devs.filter(d => DOWNTOWN_STPETE_SLUGS.includes(d.slug));
  }
}

function parseDeliveryYear(delivery: string | undefined): number | null {
  if (!delivery) return null;
  const match = delivery.match(/20\d{2}/);
  return match ? parseInt(match[0], 10) : null;
}

export function useMarketData(geo: GeoFilter) {
  return useMemo(() => {
    const filtered = filterByGeo(trackedDevelopments, geo);
    const totalUnits = filtered.reduce((sum, d) => sum + (d.units ?? 0), 0);
    const totalDevs = filtered.length;

    // Units by status
    const statusGroups: Record<string, number> = {};
    for (const d of filtered) {
      const status = d.status ?? 'unknown';
      statusGroups[status] = (statusGroups[status] ?? 0) + (d.units ?? 0);
    }

    // Units by county
    const countyGroups: Record<string, { units: number; devs: number }> = {};
    for (const d of filtered) {
      const c = d.county ?? 'unknown';
      if (!countyGroups[c]) countyGroups[c] = { units: 0, devs: 0 };
      countyGroups[c].units += d.units ?? 0;
      countyGroups[c].devs += 1;
    }

    // Units by delivery year
    const yearGroups: Record<number, number> = {};
    for (const d of filtered) {
      const year = parseDeliveryYear(d.delivery);
      if (year) {
        yearGroups[year] = (yearGroups[year] ?? 0) + (d.units ?? 0);
      }
    }

    // Developer market share
    const devShare: Record<string, number> = {};
    for (const d of filtered) {
      const dev = d.developer ?? 'Unknown';
      devShare[dev] = (devShare[dev] ?? 0) + (d.units ?? 0);
    }
    const developerData = Object.entries(devShare)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value);

    // HHI (developer concentration)
    const hhi = developerData.reduce((sum, d) => {
      const share = totalUnits > 0 ? d.value / totalUnits : 0;
      return sum + share * share;
    }, 0);

    // Price tier segmentation
    const tiers = { value: 0, mid: 0, premium: 0, ultra: 0 };
    for (const d of filtered) {
      const psf = d.avgPsf;
      if (!psf || psf === 0) continue;
      if (psf < 700) tiers.value += d.units ?? 0;
      else if (psf < 1000) tiers.mid += d.units ?? 0;
      else if (psf < 1300) tiers.premium += d.units ?? 0;
      else tiers.ultra += d.units ?? 0;
    }

    // Branded vs independent
    const branded = filtered.filter(d => d.tags?.includes('Branded Residence'));
    const independent = filtered.filter(d => !d.tags?.includes('Branded Residence'));
    const brandedUnits = branded.reduce((s, d) => s + (d.units ?? 0), 0);
    const independentUnits = independent.reduce((s, d) => s + (d.units ?? 0), 0);

    // PSF stats (only where available)
    const withPsf = filtered.filter(d => d.avgPsf && d.avgPsf > 0);
    const avgPsf = withPsf.length > 0
      ? Math.round(withPsf.reduce((s, d) => s + (d.avgPsf ?? 0), 0) / withPsf.length)
      : null;
    const minPsf = withPsf.length > 0 ? Math.min(...withPsf.map(d => d.avgPsf!)) : null;
    const maxPsf = withPsf.length > 0 ? Math.max(...withPsf.map(d => d.avgPsf!)) : null;

    // Status chart data
    const statusChartData = [
      { name: 'Pre-Sales', units: (statusGroups['pre-sales'] ?? 0) + (statusGroups['coming-soon'] ?? 0) + (statusGroups['reservation'] ?? 0), fill: '#3B82F6' },
      { name: 'Pre-Construction', units: (statusGroups['pre-construction'] ?? 0), fill: '#C9A84C' },
      { name: 'Under Construction', units: (statusGroups['under-construction'] ?? 0), fill: '#8B5CF6' },
      { name: 'Delivering', units: (statusGroups['delivering'] ?? 0), fill: '#0D9668' },
      { name: 'Delivered', units: (statusGroups['delivered'] ?? 0), fill: '#6B7280' },
    ].filter(d => d.units > 0);

    // PSF comparison data (sorted ascending)
    const psfChartData = withPsf
      .map(d => ({ name: d.name, pps: d.avgPsf! }))
      .sort((a, b) => a.pps - b.pps);

    // Delivery forecast data (sorted by year)
    const deliveryForecast = Object.entries(yearGroups)
      .map(([year, units]) => ({ year: parseInt(year), units }))
      .sort((a, b) => a.year - b.year);

    return {
      filtered,
      totalUnits,
      totalDevs,
      statusGroups,
      countyGroups,
      yearGroups,
      developerData,
      hhi,
      tiers,
      brandedUnits,
      independentUnits,
      brandedCount: branded.length,
      independentCount: independent.length,
      avgPsf,
      minPsf,
      maxPsf,
      statusChartData,
      psfChartData,
      deliveryForecast,
      geoLabel: {
        'tampa-bay': 'Tampa Bay',
        'pinellas': 'Pinellas County',
        'hillsborough': 'Hillsborough County',
        'sarasota': 'Sarasota County',
        'downtown-stpete': 'Downtown St. Petersburg',
      }[geo],
    };
  }, [geo]);
}
```

**Step 2: Verify build compiles**

Run: `npx next build 2>&1 | tail -5`
Expected: Build succeeds (hook isn't used yet)

**Step 3: Commit**

```bash
git add src/hooks/useMarketData.ts
git commit -m "feat: add useMarketData hook for dynamic geo-filtered analytics"
```

---

## Task 2: Add Geographic Filter Tabs to MarketReportClient

**Files:**
- Modify: `src/app/(marketing)/market-report/MarketReportClient.tsx`

**Step 1: Add state + tab bar to MarketReportClient**

Add `useState` for geographic filter and render tab buttons below the hero. Pass `geo` state down to all section components.

Replace the hero stat pills section and add the tab bar:

```typescript
// Add to imports at top:
import { useState } from 'react';
import { useMarketData, type GeoFilter } from '@/hooks/useMarketData';

// Inside the component, add state:
const [geo, setGeo] = useState<GeoFilter>('tampa-bay');
const data = useMarketData(geo);

// Add tab bar constants:
const geoTabs: { key: GeoFilter; label: string }[] = [
  { key: 'tampa-bay', label: 'Tampa Bay' },
  { key: 'pinellas', label: 'Pinellas' },
  { key: 'hillsborough', label: 'Hillsborough' },
  { key: 'sarasota', label: 'Sarasota' },
  { key: 'downtown-stpete', label: 'Downtown St Pete' },
];
```

Add tab bar UI after the hero section, before ExecutiveDashboard:

```tsx
{/* ─── Geographic Filter Tabs ─────────────────────────────── */}
<div className="sticky top-16 z-30 bg-charcoal-950/95 backdrop-blur-md border-b border-charcoal-800">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="flex gap-1 overflow-x-auto py-3 scrollbar-hide">
      {geoTabs.map((tab) => (
        <button
          key={tab.key}
          onClick={() => setGeo(tab.key)}
          className={`px-4 py-2 rounded-lg text-sm font-body font-medium whitespace-nowrap transition-all ${
            geo === tab.key
              ? 'bg-gold-500/20 text-gold-400 border border-gold-500/30'
              : 'text-charcoal-400 hover:text-ivory-200 hover:bg-charcoal-800/50'
          }`}
        >
          {tab.label}
          <span className="ml-2 text-xs opacity-60">
            {useMarketData(tab.key).totalDevs}
          </span>
        </button>
      ))}
    </div>
  </div>
</div>
```

Update hero stat pills to use computed data:

```tsx
{/* Update hero stat pills to be dynamic */}
<span>... {data.totalDevs} developments · {data.totalUnits.toLocaleString()} units</span>
```

**Step 2: Pass data prop to section components**

Update section rendering to pass `data`:

```tsx
<ExecutiveDashboard data={data} />
<MarketTrends />
<MarketCharts data={data} />
<DemandDrivers />
<DeliveryTimeline developments={data.filtered} />
<ComparisonTable developments={data.filtered} />
```

**Step 3: Verify build compiles**

Run: `npx next build 2>&1 | tail -10`
Expected: Type errors for components not yet accepting props — that's expected, fix in next tasks.

**Step 4: Commit**

```bash
git add src/app/\(marketing\)/market-report/MarketReportClient.tsx
git commit -m "feat: add geographic filter tabs to market report"
```

---

## Task 3: Refactor ExecutiveDashboard to Accept Dynamic Data

**Files:**
- Modify: `src/components/sections/market/ExecutiveDashboard.tsx`

**Step 1: Add props interface and replace hardcoded values**

Replace the hardcoded metrics array with computed values from the `data` prop:

```typescript
// Add at top of file:
import type { useMarketData } from '@/hooks/useMarketData';

interface ExecutiveDashboardProps {
  data: ReturnType<typeof useMarketData>;
}

export default function ExecutiveDashboard({ data }: ExecutiveDashboardProps) {
  const metrics: MetricCardProps[] = [
    {
      icon: <Building2 className="h-6 w-6" />,
      label: `${data.geoLabel} Units`,
      value: data.totalUnits.toLocaleString(),
      sublabel: `${data.totalDevs} developments`,
      accent: '#C9A84C',
    },
    {
      icon: <DollarSign className="h-6 w-6" />,
      label: 'Avg PSF',
      value: data.avgPsf ? `$${data.avgPsf.toLocaleString()}` : 'N/A',
      sublabel: data.minPsf && data.maxPsf ? `$${data.minPsf}–$${data.maxPsf} range` : 'Limited pricing data',
      accent: '#0D9668',
    },
    {
      icon: <TrendingUp className="h-6 w-6" />,
      label: 'Branded Residences',
      value: data.brandedCount.toString(),
      sublabel: `${data.brandedUnits.toLocaleString()} branded units (${data.totalUnits > 0 ? Math.round(data.brandedUnits / data.totalUnits * 100) : 0}%)`,
      accent: '#3B82F6',
    },
    {
      icon: <BarChart3 className="h-6 w-6" />,
      label: 'Developer Concentration',
      value: data.hhi < 0.15 ? 'Competitive' : data.hhi < 0.25 ? 'Moderate' : 'Concentrated',
      sublabel: `HHI: ${(data.hhi * 10000).toFixed(0)} — ${data.developerData.length} developers`,
      accent: '#EC4899',
    },
    {
      icon: <Clock className="h-6 w-6" />,
      label: 'Pre-Sales Pipeline',
      value: (data.statusGroups['pre-sales'] ?? 0 + data.statusGroups['coming-soon'] ?? 0).toLocaleString(),
      sublabel: 'Units in pre-sales/coming-soon',
      accent: '#8B5CF6',
    },
    {
      icon: <Flame className="h-6 w-6" />,
      label: 'Delivered',
      value: (data.statusGroups['delivered'] ?? 0).toLocaleString(),
      sublabel: 'Units available now',
      accent: '#F59E0B',
    },
  ];
  // ... rest of component unchanged
```

**Step 2: Update analyst narrative to use dynamic data**

Replace hardcoded narrative text with template literals using `data` values.

**Step 3: Build verify**

Run: `npx next build 2>&1 | tail -5`

**Step 4: Commit**

```bash
git add src/components/sections/market/ExecutiveDashboard.tsx
git commit -m "refactor: ExecutiveDashboard accepts dynamic data prop"
```

---

## Task 4: Refactor MarketCharts to Accept Dynamic Data

**Files:**
- Modify: `src/components/sections/market/MarketCharts.tsx`

**Step 1: Replace hardcoded arrays with data prop**

Remove the 3 hardcoded `const` arrays (statusData, developerData, psfData) and use `data.statusChartData`, `data.developerData`, `data.psfChartData` from the prop instead.

```typescript
import type { useMarketData } from '@/hooks/useMarketData';

interface MarketChartsProps {
  data: ReturnType<typeof useMarketData>;
}

export default function MarketCharts({ data }: MarketChartsProps) {
  // Use data.statusChartData, data.developerData, data.psfChartData
  // directly in the Recharts components
```

**Step 2: Update chart narrative to reference dynamic counts**

**Step 3: Build verify + commit**

---

## Task 5: Refactor ComparisonTable to Accept Filtered Developments

**Files:**
- Modify: `src/components/sections/market/ComparisonTable.tsx`

**Step 1: Accept developments prop instead of importing directly**

```typescript
interface ComparisonTableProps {
  developments?: DevelopmentSummary[];
}

export default function ComparisonTable({ developments }: ComparisonTableProps) {
  // Use developments prop if provided, fallback to trackedDevelopments
  const devs = developments ?? trackedDevelopments;
  // Replace all references to trackedDevelopments with devs
```

**Step 2: Build verify + commit**

---

## Task 6: Add Supply Forecast Chart (New McKinsey Component)

**Files:**
- Create: `src/components/sections/market/SupplyForecast.tsx`
- Modify: `src/components/sections/market/index.ts` (add export)
- Modify: `src/app/(marketing)/market-report/MarketReportClient.tsx` (add to page)

**Step 1: Create SupplyForecast component**

Stacked bar chart showing units by delivery year, colored by status. Uses `data.deliveryForecast`.

```typescript
// Renders a vertical bar chart with years on X axis, units on Y
// Each bar is colored by county (if Tampa Bay view) or status
// Includes annotation line for "absorption capacity" at ~16 units/month = ~192/year
```

**Step 2: Add to barrel export and MarketReportClient**

**Step 3: Build verify + commit**

---

## Task 7: Add Price Tier Segmentation (New McKinsey Component)

**Files:**
- Create: `src/components/sections/market/PriceTierAnalysis.tsx`
- Modify: `src/components/sections/market/index.ts`
- Modify: `src/app/(marketing)/market-report/MarketReportClient.tsx`

**Step 1: Create PriceTierAnalysis component**

Horizontal stacked bar or treemap showing units by price tier:
- Value (<$700/SF): Reflection
- Mid ($700–$1,000/SF): 400 Central, Art House, The Cade
- Premium ($1,000–$1,300/SF): Roche Bobois, Viceroy
- Ultra ($1,300+/SF): Waldorf Astoria

Uses `data.tiers`. Includes narrative about market depth.

**Step 2: Add to barrel export and page**

**Step 3: Build verify + commit**

---

## Task 8: Fix MarketInsights Hardcoded Data

**Files:**
- Modify: `src/components/sections/market/MarketInsights.tsx`

**Step 1: Replace hardcoded strings with dynamic values**

- "1,198 units across 8 active Pinellas developments" → computed
- "400 Central (95% sold)" → remove specific claim (actual is 57.1%)
- "545 units delivering through Q1 2026" → computed
- "$1,449 PSF" → use dynamic avg PSF

**Step 2: Build verify + commit**

---

## Task 9: Fix Remaining Accuracy Issues

**Files:**
- Modify: `src/data/market.ts` — update asOfDate to '2026-03-23'
- Modify: `src/components/sections/market/GeographicCoverage.tsx` — add Sarasota display

**Step 1: Update all date references**

```typescript
// market.ts
asOfDate: '2026-03-23',
```

**Step 2: Add Sarasota to GeographicCoverage**

The component currently only shows Pinellas + Hillsborough. Add Sarasota section with its 11 developments.

**Step 3: Build verify + commit**

---

## Task 10: Final Integration + Build Verification

**Files:**
- All modified files

**Step 1: Full build**

Run: `npx next build 2>&1 | tail -20`
Expected: 39 pages, 0 errors

**Step 2: Visual review**

Start dev server, verify:
- [ ] Tab bar renders with 5 tabs
- [ ] Switching tabs updates all sections
- [ ] Tampa Bay shows all 28 devs / 1,949 units
- [ ] Pinellas shows 9 devs / 1,239 units
- [ ] Hillsborough shows 8 devs / 895 units
- [ ] Sarasota shows 11 devs / 751 units
- [ ] Downtown St Pete shows 7 devs
- [ ] Charts re-render with filtered data
- [ ] Comparison table filters correctly
- [ ] No hardcoded numbers remain in visible UI
- [ ] Supply forecast chart renders
- [ ] Price tier analysis renders

**Step 3: Final commit**

```bash
git add -A
git commit -m "feat: McKinsey-level market report with geographic tabs and dynamic analytics"
```
