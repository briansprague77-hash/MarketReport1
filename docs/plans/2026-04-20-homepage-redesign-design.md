# Homepage Redesign — Market Intelligence Front Door

**Date:** 2026-04-20
**Status:** Design approved — ready for implementation plan

## Problem

Homepage and `/developments` duplicate the same job — indexing 26 building cards. Three of four hero KPIs repeat lower in the "Tampa Bay Pipeline — Live Data" block. The page reads like a second directory instead of a front door.

## Goal

Make the homepage a live market-intelligence front door that blends four jobs — editorial, dashboard, narrative, pitch — and moves all building-card browsing to `/developments`.

**Additive-only constraint:** no data deleted. Everything the homepage currently shows either stays, or moves to `/developments` without loss.

## Layout

Top to bottom:

1. **Hero** — keep current (tagline, 4 live KPIs, pipeline status bar)
2. **★ This Week in Tampa Bay** — editorial feed, auto-computed
3. **★ Submarket Pulse** — dashboard strip, ~9 submarket tiles
4. **★ Velocity Leaderboard** — dashboard, 2-col (fastest absorbing / most pressure)
5. **★ Delivery Calendar Strip** — dashboard, 6 quarter tiles
6. **★ Three-Act Market Thesis** — narrative: Supply → Demand → Ceiling
7. **★ Featured Building** — proof, one rotating deep-dive
8. **Straight Talk** — keep
9. **★ Audience CTA Split** — "I'm a Realtor" / "I'm a Buyer" branching CTAs
10. **Disclaimer** — keep

Sections marked ★ are new or enhanced.

## New components

| Component | Purpose | Data source |
|---|---|---|
| `ThisWeekFeed` | Editorial — most recent & significant events across pipeline | `lifecycle.*Date`, `pricingHistory.asOfDate` + `priceChangePercent`, `incentives.asOfDate`, `riskFlags` |
| `SubmarketPulse` | Horizontal tiles — avg PSF, active units, sold %, trend per submarket | `SUBMARKET_MAP` + `trackedDevelopments` aggregation |
| `VelocityLeaderboard` | 2-col table — top 5 velocity / top 5 inventory pressure | `velocity`, `inventoryPressure` fields on `DevelopmentSummary` |
| `DeliveryCalendar` | 6 quarter tiles — delivery count + units per quarter | `delivery` field parsed into quarters |
| `MarketThesisActs` | 3 narrative acts with charts | `pipelineStatus`, `demandDrivers`, PSF ladder computed |
| `FeaturedBuilding` | Rotating deep-dive of one development | Highest-scoring event from `ThisWeekFeed` |
| `AudienceCTASplit` | Branched CTA (realtor vs buyer) | Static |

## New helper

`src/lib/computeMarketEvents.ts` — scans all 26 developments and returns a scored list of events.

```ts
type MarketEvent = {
  date: string;          // ISO
  devSlug: string;
  devName: string;
  type: 'milestone' | 'price-change' | 'incentive' | 'risk-flag';
  headline: string;      // auto-generated, e.g. "Pendry topped off"
  body: string;          // one-line context
  magnitude: number;     // 0-100 for sort scoring
};

// Scoring:
//   score = max(0, 90 - daysSinceEvent) * magnitude
//   magnitude = type-specific weight × data-specific multiplier
//     milestone → { toppingOff: 80, coDate: 100, firstClosing: 90, ... }
//     price-change → abs(priceChangePercent) × 5
//     incentive → effectiveDiscountRate × 10
//     risk-flag → 60
```

Returns top N events (default 5) sorted by score.

## What moves to /developments

| From homepage | To developments page |
|---|---|
| Pinellas card grid (7) | Merge into existing grid |
| Hillsborough card grid (8) | Merge into existing grid |
| Sarasota card grid (11) | Merge into existing grid |
| "Tampa Bay Pipeline — Live Data" block | Absorbed into developments hero |

Developments page already has filter bar + grid/map toggle + shadow inventory + closed projects. Cards naturally belong there.

## What stays on homepage

- Hero + 4 KPIs + pipeline status bar
- `demandDrivers` (used in Act 2)
- `marketTrends` (used in Act 3)
- Straight Talk
- Disclaimer

Nothing is deleted.

## Build sequence

1. `src/lib/computeMarketEvents.ts` — helper with unit test
2. New components under `src/components/sections/home/`:
   - `ThisWeekFeed.tsx`
   - `SubmarketPulse.tsx`
   - `VelocityLeaderboard.tsx`
   - `DeliveryCalendar.tsx`
   - `MarketThesisActs.tsx`
   - `FeaturedBuilding.tsx`
   - `AudienceCTASplit.tsx`
3. Refactor `src/app/(marketing)/page.tsx` to new layout
4. Move card grids → `src/app/(marketing)/developments/page.tsx` hero/grid
5. Verify homepage + developments page in browser

## Out of scope

- Admin/CMS for events (auto-computed only)
- Personalization beyond the audience CTA split
- Changes to individual development detail pages
- Changes to `/market-report` page
