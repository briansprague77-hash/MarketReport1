# Homepage Redesign Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Transform the homepage from a second directory of building cards into a market-intelligence front door (editorial feed + dashboard + narrative thesis + proof + CTA), while moving all building-card browsing to `/developments` without losing data.

**Architecture:** Seven new client components under `src/components/sections/home/`, one pure helper `src/lib/computeMarketEvents.ts`, refactor of `src/app/(marketing)/page.tsx`, and merge of Pinellas/Hillsborough/Sarasota card grids into `src/app/(marketing)/developments/page.tsx`.

**Tech Stack:** Next.js 14 App Router, TypeScript strict, Tailwind (charcoal `#1a1a2e`, gold `#d4a853`, ivory `#faf8f5`), Framer Motion animations, Recharts for charts.

**Verification model:** This project has no unit-test framework. Each task is verified with (a) `npm run build` — catches TypeScript + Next.js errors, (b) `npm run lint`, and (c) Playwright MCP `browser_navigate` + `browser_take_screenshot` for visual check.

**Design doc:** `docs/plans/2026-04-20-homepage-redesign-design.md`

**Additive-only constraint** (Brian 2026-02-25): Do NOT delete any data from the codebase. Moving markup from homepage → developments page is fine (it still renders). Deleting a data field, copy block, or section entirely is NOT fine without explicit approval.

---

## Task 1: Create `computeMarketEvents` helper

**Files:**
- Create: `src/lib/computeMarketEvents.ts`

**Why this first:** The `ThisWeekFeed` component (Task 3) depends on it. A pure function is easier to reason about in isolation.

**Step 1: Create the file with full implementation**

```ts
// src/lib/computeMarketEvents.ts
import { trackedDevelopments, DevelopmentSummary } from '@/data/developments';
import { developmentProfiles, developments } from '@/data/developments';
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
  return Math.floor((today.getTime() - d.getTime()) / 86_400_000);
}

function recencyScore(daysAgo: number): number {
  // 90-day decay window; after 90 days returns 0
  return Math.max(0, 90 - daysAgo);
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
    const devName = summary?.name ?? p.name ?? slug;

    // 1. Milestones from lifecycle
    if (p.lifecycle) {
      for (const [key, iso] of Object.entries(p.lifecycle)) {
        if (!iso || typeof iso !== 'string') continue;
        const daysAgo = daysSince(iso, today);
        if (daysAgo > 90 || daysAgo < 0) continue;
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
      if (daysAgo <= 90 && daysAgo >= 0) {
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
      if (daysAgo <= 90 && daysAgo >= 0) {
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

  // Sort by score descending, take top N
  events.sort((a, b) => b.score - a.score);
  return events.slice(0, topN);
}
```

**Step 2: Sanity check — run `npm run build`**

Run: `cd /Users/briansprague/Desktop/marketreport && npm run build`
Expected: Build succeeds. No TypeScript errors from the new file.
If fails: read the error, fix the types. Common gotcha: `developmentProfiles` exports location — confirm with `grep 'export.*developmentProfiles' src/data/developments/index.ts`.

**Step 3: Sanity check — print 5 events to verify logic**

Create `/tmp/check-events.ts`:
```ts
import { computeMarketEvents } from './src/lib/computeMarketEvents';
console.log(JSON.stringify(computeMarketEvents(5), null, 2));
```
Run: `cd /Users/briansprague/Desktop/marketreport && npx tsx /tmp/check-events.ts 2>&1 | head -60`
Expected: 0-5 JSON objects with shape matching `MarketEvent`. If 0 events returned, it's because no lifecycle dates fall within 90 days of today — that's fine; the feed component will show a graceful empty state.

**Step 4: Commit**

```bash
git add src/lib/computeMarketEvents.ts
git commit -m "feat: add computeMarketEvents helper for homepage editorial feed"
```

Do NOT commit without user approval (per project convention).

---

## Task 2: Create `ThisWeekFeed` component

**Files:**
- Create: `src/components/sections/home/ThisWeekFeed.tsx`

**Step 1: Write the component**

```tsx
'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { computeMarketEvents, type MarketEvent } from '@/lib/computeMarketEvents';
import { fadeUp, staggerContainer, staggerItem, defaultViewport } from '@/lib/animations';
import Badge from '@/components/ui/Badge';

const TYPE_STYLE: Record<MarketEvent['type'], { label: string; color: string }> = {
  'milestone':     { label: 'Milestone',     color: '#10B981' },
  'price-change':  { label: 'Price Move',    color: '#F59E0B' },
  'incentive':     { label: 'Incentive',     color: '#8B5CF6' },
  'risk-flag':     { label: 'Risk Flag',     color: '#EF4444' },
};

function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

export default function ThisWeekFeed() {
  const events = computeMarketEvents(5);
  const [headline, ...rest] = events;

  if (!headline) {
    // Graceful empty state — still prints the section so the page doesn't collapse
    return (
      <section className="py-20 bg-charcoal-950 border-t border-ivory-100/5">
        <div className="container-luxury">
          <Badge label="This Week in Tampa Bay" variant="gold" />
          <p className="mt-6 text-ivory-400/60 max-w-2xl">
            No new market events in the last 90 days. Check back as deliveries, price moves, and sales launches ship.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-charcoal-950 border-t border-ivory-100/5">
      <div className="container-luxury">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          variants={fadeUp}
          className="mb-10"
        >
          <Badge label="This Week in Tampa Bay" variant="gold" />
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white mt-4 mb-2">
            What Moved
          </h2>
          <p className="text-ivory-400/60 max-w-2xl">
            Auto-computed from lifecycle milestones, price-history entries, and incentive updates across the 26-building pipeline. Last 90 days.
          </p>
        </motion.div>

        {/* Headline story */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          variants={fadeUp}
          className="mb-8"
        >
          <Link href={`/developments/${headline.devSlug}`}>
            <div className="group rounded-2xl border border-gold-500/30 bg-gradient-to-br from-charcoal-900/80 to-charcoal-950 p-8 hover:border-gold-500/60 transition-all">
              <div className="flex items-center gap-3 mb-4">
                <span
                  className="text-xs font-medium uppercase tracking-wider px-2.5 py-1 rounded-full"
                  style={{
                    color: TYPE_STYLE[headline.type].color,
                    backgroundColor: `${TYPE_STYLE[headline.type].color}20`,
                  }}
                >
                  {TYPE_STYLE[headline.type].label}
                </span>
                <span className="text-xs text-ivory-400/50">{formatDate(headline.date)}</span>
              </div>
              <h3 className="font-heading text-2xl sm:text-3xl font-bold text-white group-hover:text-gold-400 transition-colors mb-2">
                {headline.headline}
              </h3>
              <p className="text-ivory-400/70">{headline.body}</p>
            </div>
          </Link>
        </motion.div>

        {/* Shift cards */}
        {rest.length > 0 && (
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={defaultViewport}
            variants={staggerContainer}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4"
          >
            {rest.map((ev, i) => (
              <motion.div key={`${ev.devSlug}-${ev.type}-${i}`} variants={staggerItem}>
                <Link href={`/developments/${ev.devSlug}`}>
                  <div className="group h-full rounded-xl border border-ivory-100/10 bg-charcoal-900/60 hover:bg-charcoal-800/80 transition-all p-5">
                    <div className="flex items-center justify-between mb-3">
                      <span
                        className="text-[10px] font-medium uppercase tracking-wider"
                        style={{ color: TYPE_STYLE[ev.type].color }}
                      >
                        {TYPE_STYLE[ev.type].label}
                      </span>
                      <span className="text-[10px] text-ivory-400/40">{formatDate(ev.date)}</span>
                    </div>
                    <h4 className="font-heading text-base font-semibold text-white group-hover:text-gold-400 transition-colors mb-1 line-clamp-2">
                      {ev.headline}
                    </h4>
                    <p className="text-xs text-ivory-400/60 line-clamp-2">{ev.body}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}
```

**Step 2: Verify build**

Run: `npm run build 2>&1 | tail -30`
Expected: Build succeeds.

**Step 3: Commit**

```bash
git add src/components/sections/home/ThisWeekFeed.tsx
git commit -m "feat: add ThisWeekFeed component — editorial auto-computed event feed"
```

---

## Task 3: Create `SubmarketPulse` component

**Files:**
- Create: `src/components/sections/home/SubmarketPulse.tsx`

**Step 1: Write the component**

```tsx
'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { trackedDevelopments } from '@/data/market';
import { fadeUp, staggerContainer, staggerItem, defaultViewport } from '@/lib/animations';
import Badge from '@/components/ui/Badge';

interface SubmarketStat {
  submarket: string;
  activeDevs: number;
  activeUnits: number;
  avgPsf: number;
  avgSoldPct: number;
}

function computeSubmarketStats(): SubmarketStat[] {
  const groups: Record<string, typeof trackedDevelopments> = {};
  for (const d of trackedDevelopments) {
    if (!d.submarket) continue;
    if (d.status === 'sold-out' || d.status === 'shadow-inventory') continue;
    if (!groups[d.submarket]) groups[d.submarket] = [];
    groups[d.submarket].push(d);
  }

  return Object.entries(groups).map(([submarket, devs]) => {
    const activeUnits = devs.reduce((s, d) => s + (d.units ?? 0), 0);
    const withPsf = devs.filter((d) => (d.resalePsf ?? d.developerClosePsf ?? d.avgPsf ?? 0) > 0);
    const avgPsf = withPsf.length
      ? Math.round(withPsf.reduce((s, d) => s + (d.resalePsf ?? d.developerClosePsf ?? d.avgPsf ?? 0), 0) / withPsf.length)
      : 0;
    const withSold = devs.filter((d) => d.soldPercent != null);
    const avgSoldPct = withSold.length
      ? Math.round(withSold.reduce((s, d) => s + (d.soldPercent ?? 0), 0) / withSold.length)
      : 0;
    return { submarket, activeDevs: devs.length, activeUnits, avgPsf, avgSoldPct };
  }).sort((a, b) => b.activeUnits - a.activeUnits);
}

export default function SubmarketPulse() {
  const stats = computeSubmarketStats();
  return (
    <section className="py-20 bg-charcoal-900/40">
      <div className="container-luxury">
        <motion.div
          initial="hidden" whileInView="visible" viewport={defaultViewport} variants={fadeUp}
          className="mb-10"
        >
          <Badge label="Submarket Pulse" variant="gold" />
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white mt-4 mb-2">
            Where Tampa Bay Is Building
          </h2>
          <p className="text-ivory-400/60 max-w-2xl">
            Active units, average $/SF, and sell-through across every tracked submarket. Click any tile to filter the developments page.
          </p>
        </motion.div>

        <motion.div
          initial="hidden" whileInView="visible" viewport={defaultViewport} variants={staggerContainer}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3"
        >
          {stats.map((s) => (
            <motion.div key={s.submarket} variants={staggerItem}>
              <Link href={`/developments?submarket=${encodeURIComponent(s.submarket)}`}>
                <div className="group rounded-xl border border-ivory-100/10 bg-charcoal-900/60 hover:border-gold-500/30 hover:bg-charcoal-800/80 transition-all p-5 h-full">
                  <div className="text-xs text-ivory-400/50 mb-2">{s.submarket}</div>
                  <div className="text-2xl font-heading font-bold text-white mb-3">
                    {s.activeUnits.toLocaleString()}
                    <span className="text-xs text-ivory-400/40 font-body font-normal ml-1">units</span>
                  </div>
                  <div className="space-y-1 text-xs">
                    <div className="flex justify-between">
                      <span className="text-ivory-400/50">Devs</span>
                      <span className="text-ivory-200">{s.activeDevs}</span>
                    </div>
                    {s.avgPsf > 0 && (
                      <div className="flex justify-between">
                        <span className="text-ivory-400/50">Avg $/SF</span>
                        <span className="text-gold-400">${s.avgPsf.toLocaleString()}</span>
                      </div>
                    )}
                    {s.avgSoldPct > 0 && (
                      <div className="flex justify-between">
                        <span className="text-ivory-400/50">Sold</span>
                        <span className="text-ivory-200">{s.avgSoldPct}%</span>
                      </div>
                    )}
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
```

**Step 2: Verify build** — `npm run build 2>&1 | tail -10`. Expected: success.

**Step 3: Commit**

```bash
git add src/components/sections/home/SubmarketPulse.tsx
git commit -m "feat: add SubmarketPulse component — submarket aggregation tiles"
```

---

## Task 4: Create `VelocityLeaderboard` component

**Files:**
- Create: `src/components/sections/home/VelocityLeaderboard.tsx`

**Step 1: Write the component**

```tsx
'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { trackedDevelopments } from '@/data/market';
import { fadeUp, defaultViewport } from '@/lib/animations';
import Badge from '@/components/ui/Badge';

function parseVelocity(v?: string): number {
  if (!v) return 0;
  const m = v.match(/([\d.]+)/);
  return m ? parseFloat(m[1]) : 0;
}

export default function VelocityLeaderboard() {
  const fastest = [...trackedDevelopments]
    .filter((d) => parseVelocity(d.velocity) > 0)
    .sort((a, b) => parseVelocity(b.velocity) - parseVelocity(a.velocity))
    .slice(0, 5);

  const pressured = trackedDevelopments
    .filter((d) => d.inventoryPressure === 'high' && d.units > 0 && d.status !== 'sold-out')
    .sort((a, b) => b.units - a.units)
    .slice(0, 5);

  return (
    <section className="py-20 bg-charcoal-950">
      <div className="container-luxury">
        <motion.div initial="hidden" whileInView="visible" viewport={defaultViewport} variants={fadeUp} className="mb-10">
          <Badge label="Velocity & Pressure" variant="gold" />
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white mt-4 mb-2">
            Who&rsquo;s Moving, Who&rsquo;s Stuck
          </h2>
          <p className="text-ivory-400/60 max-w-2xl">
            Absorption leaders versus buildings under high inventory pressure.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          <Column title="Fastest Absorbing" items={fastest.map((d) => ({
            slug: d.slug, name: d.name, submarket: d.submarket, right: d.velocity ?? '—',
          }))} accent="emerald" />
          <Column title="Most Inventory Pressure" items={pressured.map((d) => ({
            slug: d.slug, name: d.name, submarket: d.submarket, right: `${d.units} units`,
          }))} accent="red" />
        </div>
      </div>
    </section>
  );
}

function Column({
  title,
  items,
  accent,
}: {
  title: string;
  items: { slug: string; name: string; submarket?: string; right: string }[];
  accent: 'emerald' | 'red';
}) {
  const color = accent === 'emerald' ? 'text-emerald-400' : 'text-red-400';
  return (
    <div className="rounded-xl border border-ivory-100/10 bg-charcoal-900/60 p-6">
      <h3 className={`font-heading text-lg font-semibold mb-5 ${color}`}>{title}</h3>
      <ul className="space-y-3">
        {items.length === 0 && <li className="text-ivory-400/40 text-sm">No qualifying data.</li>}
        {items.map((it, i) => (
          <li key={it.slug}>
            <Link href={`/developments/${it.slug}`}>
              <div className="flex items-center justify-between gap-4 py-2 border-b border-ivory-100/5 last:border-0 hover:bg-charcoal-800/40 rounded px-2 -mx-2 transition-colors">
                <div className="flex items-center gap-3 min-w-0">
                  <span className="text-xs text-ivory-400/40 w-5 tabular-nums">{i + 1}</span>
                  <div className="min-w-0">
                    <div className="text-sm font-medium text-ivory-100 truncate">{it.name}</div>
                    {it.submarket && <div className="text-[11px] text-ivory-400/50 truncate">{it.submarket}</div>}
                  </div>
                </div>
                <span className={`text-sm font-semibold ${color} shrink-0`}>{it.right}</span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
```

**Step 2: Verify build** — `npm run build 2>&1 | tail -10`. Expected: success.

**Step 3: Commit**

```bash
git add src/components/sections/home/VelocityLeaderboard.tsx
git commit -m "feat: add VelocityLeaderboard component — fastest absorbing vs pressured"
```

---

## Task 5: Create `DeliveryCalendar` component

**Files:**
- Create: `src/components/sections/home/DeliveryCalendar.tsx`

**Step 1: Write the component**

```tsx
'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { trackedDevelopments } from '@/data/market';
import { fadeUp, staggerContainer, staggerItem, defaultViewport } from '@/lib/animations';
import Badge from '@/components/ui/Badge';

// Parse "Q2 2026" / "Q4 2026" / "2027" / "Late 2026" / "~2029" into a (year, quarter) pair.
// Returns null if not parseable (e.g. "TBD").
function parseDelivery(delivery?: string): { year: number; quarter: number } | null {
  if (!delivery) return null;
  const qMatch = delivery.match(/Q([1-4]).*?(\d{4})/);
  if (qMatch) return { year: +qMatch[2], quarter: +qMatch[1] };
  const yearMatch = delivery.match(/(\d{4})/);
  if (yearMatch) {
    const year = +yearMatch[1];
    // Guess quarter from words
    if (/early|Q1|spring/i.test(delivery)) return { year, quarter: 1 };
    if (/summer|Q2/i.test(delivery)) return { year, quarter: 2 };
    if (/fall|autumn|Q3/i.test(delivery)) return { year, quarter: 3 };
    if (/winter|late|Q4/i.test(delivery)) return { year, quarter: 4 };
    return { year, quarter: 2 }; // default mid-year
  }
  return null;
}

interface QuarterBucket {
  label: string;
  year: number;
  quarter: number;
  devs: typeof trackedDevelopments;
  units: number;
}

export default function DeliveryCalendar() {
  // Build next 6 quarters starting from current one
  const now = new Date();
  const currentQ = Math.floor(now.getMonth() / 3) + 1;
  const currentYear = now.getFullYear();

  const buckets: QuarterBucket[] = [];
  for (let i = 0; i < 6; i++) {
    const q = ((currentQ - 1 + i) % 4) + 1;
    const y = currentYear + Math.floor((currentQ - 1 + i) / 4);
    buckets.push({ label: `Q${q} ${y}`, year: y, quarter: q, devs: [], units: 0 });
  }

  for (const d of trackedDevelopments) {
    if (d.status === 'sold-out' || d.status === 'shadow-inventory') continue;
    const parsed = parseDelivery(d.delivery);
    if (!parsed) continue;
    const bucket = buckets.find((b) => b.year === parsed.year && b.quarter === parsed.quarter);
    if (bucket) {
      bucket.devs.push(d);
      bucket.units += d.units ?? 0;
    }
  }

  const maxUnits = Math.max(1, ...buckets.map((b) => b.units));

  return (
    <section className="py-20 bg-charcoal-900/40">
      <div className="container-luxury">
        <motion.div initial="hidden" whileInView="visible" viewport={defaultViewport} variants={fadeUp} className="mb-10">
          <Badge label="Delivery Calendar" variant="gold" />
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white mt-4 mb-2">
            Next 18 Months
          </h2>
          <p className="text-ivory-400/60 max-w-2xl">
            Units hitting market each quarter. Click a quarter to filter the developments page.
          </p>
        </motion.div>

        <motion.div
          initial="hidden" whileInView="visible" viewport={defaultViewport} variants={staggerContainer}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3"
        >
          {buckets.map((b) => (
            <motion.div key={b.label} variants={staggerItem}>
              <Link href={`/developments?delivery=${encodeURIComponent(b.label)}`}>
                <div className="group rounded-xl border border-ivory-100/10 bg-charcoal-900/60 hover:border-gold-500/30 transition-all p-5 h-full">
                  <div className="text-xs text-ivory-400/50 mb-2">{b.label}</div>
                  <div className="text-2xl font-heading font-bold text-gold-400 mb-1">
                    {b.devs.length}
                  </div>
                  <div className="text-xs text-ivory-400/60 mb-3">
                    {b.devs.length === 1 ? 'delivery' : 'deliveries'}
                  </div>
                  <div className="text-sm text-ivory-200 mb-2">{b.units.toLocaleString()} units</div>
                  {/* Bar proportion */}
                  <div className="h-1.5 rounded-full bg-charcoal-800 overflow-hidden">
                    <div className="h-full bg-gold-500/60" style={{ width: `${(b.units / maxUnits) * 100}%` }} />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
```

**Step 2: Verify build.** Expected: success.

**Step 3: Commit**

```bash
git add src/components/sections/home/DeliveryCalendar.tsx
git commit -m "feat: add DeliveryCalendar component — 6-quarter delivery outlook"
```

---

## Task 6: Create `MarketThesisActs` component

**Files:**
- Create: `src/components/sections/home/MarketThesisActs.tsx`

**Design notes:** Three full-width bands: Supply → Demand → Ceiling. Each has eyebrow, headline, 1-paragraph thesis, and one chart or stat panel. Supply uses pipeline status counts. Demand reuses `demandDrivers`. Ceiling shows a PSF ladder from Art House (~$654) to Roche Bobois Sky PH ($2,727).

**Step 1: Write the component**

```tsx
'use client';

import { motion } from 'framer-motion';
import { trackedDevelopments, demandDrivers } from '@/data/market';
import { fadeUp, staggerContainer, staggerItem, defaultViewport } from '@/lib/animations';
import Badge from '@/components/ui/Badge';

function Act({ number, eyebrow, title, thesis, children }: {
  number: string; eyebrow: string; title: string; thesis: string; children: React.ReactNode;
}) {
  return (
    <motion.div
      initial="hidden" whileInView="visible" viewport={defaultViewport} variants={fadeUp}
      className="grid md:grid-cols-2 gap-10 items-center py-14 border-b border-ivory-100/5 last:border-0"
    >
      <div>
        <div className="flex items-center gap-3 mb-4">
          <span className="text-5xl font-heading font-bold text-gold-500/30">{number}</span>
          <div>
            <div className="text-xs font-body font-semibold uppercase tracking-[0.25em] text-gold-500">{eyebrow}</div>
            <h3 className="font-heading text-2xl sm:text-3xl font-bold text-white">{title}</h3>
          </div>
        </div>
        <p className="text-ivory-400/70 leading-relaxed">{thesis}</p>
      </div>
      <div>{children}</div>
    </motion.div>
  );
}

export default function MarketThesisActs() {
  // Act 1: pipeline status counts
  const active = trackedDevelopments.filter((d) => d.status !== 'sold-out' && d.units > 0);
  const totalUnits = active.reduce((s, d) => s + d.units, 0);

  // Act 3: PSF ladder — pick buildings with distinct PSF tiers
  const psfLadder = [...trackedDevelopments]
    .filter((d) => (d.resalePsf ?? d.developerClosePsf ?? d.avgPsf ?? 0) > 0)
    .map((d) => ({
      name: d.name,
      psf: d.resalePsf ?? d.developerClosePsf ?? d.avgPsf ?? 0,
      submarket: d.submarket,
    }))
    .sort((a, b) => a.psf - b.psf);
  const maxPsf = Math.max(...psfLadder.map((p) => p.psf));

  return (
    <section className="py-20 bg-charcoal-950">
      <div className="container-luxury">
        <motion.div
          initial="hidden" whileInView="visible" viewport={defaultViewport} variants={fadeUp}
          className="mb-14 text-center"
        >
          <Badge label="Market Thesis" variant="gold" />
          <h2 className="font-heading text-3xl sm:text-5xl font-bold text-white mt-4 mb-3">
            Tampa Bay in Three Acts
          </h2>
          <p className="text-ivory-400/60 max-w-2xl mx-auto">
            Supply, demand, and the ceiling. What the data says — not the brochures.
          </p>
        </motion.div>

        {/* Act 1 — Supply */}
        <Act number="01" eyebrow="Act One" title="Supply" thesis={`${active.length} active buildings, ${totalUnits.toLocaleString()} units in pipeline. More than a third are branded residences. The wave is concentrated — not distributed evenly across the bay.`}>
          <div className="rounded-xl border border-ivory-100/10 bg-charcoal-900/60 p-6">
            <div className="text-xs text-ivory-400/50 mb-4">Pipeline by Status</div>
            <motion.div initial="hidden" whileInView="visible" viewport={defaultViewport} variants={staggerContainer} className="space-y-3">
              {['pre-sales', 'under-construction', 'reservation', 'delivered', 'shadow-inventory'].map((status) => {
                const group = trackedDevelopments.filter((d) => d.status === status);
                const units = group.reduce((s, d) => s + d.units, 0);
                const label = status.replace(/-/g, ' ');
                const pct = totalUnits > 0 ? (units / totalUnits) * 100 : 0;
                return (
                  <motion.div key={status} variants={staggerItem}>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="capitalize text-ivory-300">{label}</span>
                      <span className="text-ivory-400/50">{units.toLocaleString()} units</span>
                    </div>
                    <div className="h-2 rounded-full bg-charcoal-800 overflow-hidden">
                      <div className="h-full bg-gold-500/60" style={{ width: `${pct}%` }} />
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </Act>

        {/* Act 2 — Demand */}
        <Act number="02" eyebrow="Act Two" title="Demand" thesis="Florida migration hasn't slowed. Corporate relocations, state income-tax advantage, and Gulf-coast second-home buyers drive absorption — but the $2M+ tier is thinner than developer pro-formas assume.">
          <div className="grid grid-cols-2 gap-3">
            {demandDrivers.slice(0, 4).map((d, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={defaultViewport}
                transition={{ delay: i * 0.1 }}
                className="rounded-lg border border-ivory-100/10 bg-charcoal-900/60 p-4"
              >
                <div className="text-xl font-heading font-bold text-gold-400 mb-1">{d.stat}</div>
                <div className="text-xs text-ivory-300 font-medium mb-1">{d.title}</div>
                <div className="text-[11px] text-ivory-400/50 leading-snug line-clamp-3">{d.description}</div>
              </motion.div>
            ))}
          </div>
        </Act>

        {/* Act 3 — Ceiling */}
        <Act number="03" eyebrow="Act Three" title="The Ceiling" thesis={`The spread from lowest to highest PSF is a live stress test. Art House cleared the low end; Roche Bobois's Sky Penthouse sets the ceiling at $2,727/SF. Where the ceiling holds — or breaks — sets the next three years of pricing.`}>
          <div className="rounded-xl border border-ivory-100/10 bg-charcoal-900/60 p-6">
            <div className="text-xs text-ivory-400/50 mb-4">PSF Ladder — Active Priced Buildings</div>
            <div className="space-y-2 max-h-80 overflow-y-auto pr-2">
              {psfLadder.map((p) => (
                <div key={p.name} className="flex items-center gap-3">
                  <div className="text-xs text-ivory-300 truncate w-40 shrink-0">{p.name}</div>
                  <div className="flex-1 h-1.5 rounded-full bg-charcoal-800 overflow-hidden">
                    <div className="h-full bg-gold-500/50" style={{ width: `${(p.psf / maxPsf) * 100}%` }} />
                  </div>
                  <div className="text-xs text-gold-400 tabular-nums w-16 text-right">${p.psf.toLocaleString()}</div>
                </div>
              ))}
            </div>
          </div>
        </Act>
      </div>
    </section>
  );
}
```

**Step 2: Verify build.** Expected: success.

**Step 3: Commit**

```bash
git add src/components/sections/home/MarketThesisActs.tsx
git commit -m "feat: add MarketThesisActs component — supply/demand/ceiling narrative"
```

---

## Task 7: Create `FeaturedBuilding` component

**Files:**
- Create: `src/components/sections/home/FeaturedBuilding.tsx`

**Design notes:** Picks the dev associated with the top-scored event from `computeMarketEvents`. Falls back to Waldorf if no events. Shows hero image, headline stats, and a single primary CTA.

**Step 1: Write the component**

```tsx
'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { computeMarketEvents } from '@/lib/computeMarketEvents';
import { trackedDevelopments } from '@/data/market';
import { fadeUp, defaultViewport } from '@/lib/animations';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';

export default function FeaturedBuilding() {
  const events = computeMarketEvents(1);
  const featuredSlug = events[0]?.devSlug ?? 'waldorf-astoria';
  const dev = trackedDevelopments.find((d) => d.slug === featuredSlug);
  if (!dev) return null;

  const psf = dev.resalePsf ?? dev.developerClosePsf ?? dev.avgPsf;

  return (
    <section className="py-20 bg-charcoal-950 border-t border-ivory-100/5">
      <div className="container-luxury">
        <motion.div initial="hidden" whileInView="visible" viewport={defaultViewport} variants={fadeUp} className="mb-8">
          <Badge label="Building in Focus" variant="gold" />
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white mt-4">
            {events[0] ? `Why ${dev.name} This Week` : 'Featured Building'}
          </h2>
        </motion.div>

        <motion.div
          initial="hidden" whileInView="visible" viewport={defaultViewport} variants={fadeUp}
          className="grid md:grid-cols-2 gap-8 items-stretch rounded-2xl border border-gold-500/20 bg-gradient-to-br from-charcoal-900/80 to-charcoal-950 overflow-hidden"
        >
          {dev.image && (
            <div className="relative min-h-[320px]">
              <img src={dev.image} alt={dev.name} className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-charcoal-950/40" />
            </div>
          )}
          <div className="p-8">
            <div className="text-xs font-body font-semibold uppercase tracking-wider text-gold-500 mb-3">{dev.statusLabel}</div>
            <h3 className="font-heading text-2xl sm:text-3xl font-bold text-white mb-2">{dev.name}</h3>
            <p className="text-ivory-400/60 mb-6">{dev.location}</p>

            {events[0] && (
              <div className="mb-6 p-4 rounded-lg bg-gold-500/5 border border-gold-500/20">
                <div className="text-xs text-gold-400 uppercase tracking-wider mb-1">This Week</div>
                <div className="text-ivory-100 font-medium">{events[0].headline}</div>
                <div className="text-xs text-ivory-400/60 mt-1">{events[0].body}</div>
              </div>
            )}

            <div className="grid grid-cols-3 gap-4 mb-6">
              {dev.units > 0 && <Stat label="Units" value={dev.units.toLocaleString()} />}
              {psf && <Stat label="$/SF" value={`$${psf.toLocaleString()}`} />}
              {dev.soldPercent != null && <Stat label="Sold" value={`${dev.soldPercent}%`} />}
            </div>

            <Link href={`/developments/${dev.slug}`}>
              <Button variant="primary" size="md">View Full Report</Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-xs text-ivory-400/50 mb-1">{label}</div>
      <div className="text-xl font-heading font-bold text-white">{value}</div>
    </div>
  );
}
```

**Step 2: Verify build.** Expected: success.

**Step 3: Commit**

```bash
git add src/components/sections/home/FeaturedBuilding.tsx
git commit -m "feat: add FeaturedBuilding component — rotating deep-dive tile"
```

---

## Task 8: Create `AudienceCTASplit` component

**Files:**
- Create: `src/components/sections/home/AudienceCTASplit.tsx`

**Step 1: Write the component**

```tsx
'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { fadeUp, defaultViewport } from '@/lib/animations';

export default function AudienceCTASplit() {
  return (
    <section className="py-20 bg-charcoal-900/40 border-t border-ivory-100/5">
      <div className="container-luxury">
        <motion.div
          initial="hidden" whileInView="visible" viewport={defaultViewport} variants={fadeUp}
          className="text-center mb-10"
        >
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white mb-3">
            Pick Your Path
          </h2>
          <p className="text-ivory-400/60">One site, two workflows.</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          <Link href="/realtor-resources">
            <motion.div
              initial="hidden" whileInView="visible" viewport={defaultViewport} variants={fadeUp}
              className="group rounded-2xl border border-gold-500/20 bg-charcoal-900/60 hover:border-gold-500/50 hover:bg-charcoal-800/80 transition-all p-10 h-full"
            >
              <div className="text-xs font-body font-semibold uppercase tracking-[0.25em] text-gold-500 mb-3">For Realtors</div>
              <h3 className="font-heading text-2xl font-bold text-white mb-3 group-hover:text-gold-400 transition-colors">I&rsquo;m an Agent</h3>
              <p className="text-ivory-400/70 mb-6 leading-relaxed">Co-op splits, developer sales team contacts, client-ready comps, and share/export tools.</p>
              <div className="text-sm text-gold-400 font-medium">Realtor Resources →</div>
            </motion.div>
          </Link>

          <Link href="/developments">
            <motion.div
              initial="hidden" whileInView="visible" viewport={defaultViewport} variants={fadeUp}
              className="group rounded-2xl border border-ivory-100/10 bg-charcoal-900/60 hover:border-ivory-100/30 hover:bg-charcoal-800/80 transition-all p-10 h-full"
            >
              <div className="text-xs font-body font-semibold uppercase tracking-[0.25em] text-ivory-400 mb-3">For Buyers</div>
              <h3 className="font-heading text-2xl font-bold text-white mb-3 group-hover:text-ivory-100 transition-colors">I&rsquo;m Buying</h3>
              <p className="text-ivory-400/70 mb-6 leading-relaxed">Filter by price, submarket, and delivery window. See sold %, HOA, and what the developer&rsquo;s actually asking.</p>
              <div className="text-sm text-ivory-200 font-medium">Browse Developments →</div>
            </motion.div>
          </Link>
        </div>
      </div>
    </section>
  );
}
```

**Step 2: Verify build.** Expected: success.

**Step 3: Commit**

```bash
git add src/components/sections/home/AudienceCTASplit.tsx
git commit -m "feat: add AudienceCTASplit component — realtor vs buyer branching CTAs"
```

---

## Task 9: Create `src/components/sections/home/index.ts` barrel export

**Files:**
- Create: `src/components/sections/home/index.ts`

**Step 1: Write the barrel**

```ts
export { default as ThisWeekFeed } from './ThisWeekFeed';
export { default as SubmarketPulse } from './SubmarketPulse';
export { default as VelocityLeaderboard } from './VelocityLeaderboard';
export { default as DeliveryCalendar } from './DeliveryCalendar';
export { default as MarketThesisActs } from './MarketThesisActs';
export { default as FeaturedBuilding } from './FeaturedBuilding';
export { default as AudienceCTASplit } from './AudienceCTASplit';
```

**Step 2: Commit**

```bash
git add src/components/sections/home/index.ts
git commit -m "chore: add home sections barrel export"
```

---

## Task 10: Refactor `src/app/(marketing)/page.tsx` — new layout

**Files:**
- Modify: `src/app/(marketing)/page.tsx` (full rewrite)

**Critical additive-only note:** The three county card grids (Pinellas/Hillsborough/Sarasota) and the "Tampa Bay Pipeline — Live Data" block MUST be preserved in the repo — they move to `/developments` in Task 11. Do NOT delete them from the repo; you will re-add them to developments/page.tsx next.

**Step 1: Save the current homepage as a reference backup (non-committed)**

Run: `cp src/app/\(marketing\)/page.tsx /tmp/homepage-before-redesign.tsx`
This keeps a readable copy for cross-reference during Task 11, without polluting git.

**Step 2: Rewrite `page.tsx` with the new layout**

Replace file contents with:

```tsx
'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import {
  trackedDevelopments,
  pinellasDevelopments,
  hillsboroughDevelopments,
  sarasotaDevelopments,
} from '@/data/market';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import ImageBreak from '@/components/ui/ImageBreak';
import AnimatedCounter from '@/components/ui/AnimatedCounter';
import GoldDivider from '@/components/ui/GoldDivider';
import { motion } from 'framer-motion';
import {
  fadeUp,
  heroTitle,
  heroSubtitle,
  heroCtas,
  heroStats,
  heroStatItem,
  scaleIn,
  defaultViewport,
} from '@/lib/animations';
import {
  ThisWeekFeed,
  SubmarketPulse,
  VelocityLeaderboard,
  DeliveryCalendar,
  MarketThesisActs,
  FeaturedBuilding,
  AudienceCTASplit,
} from '@/components/sections/home';

// ─── Hero Images — building exteriors only ─────────────────────────────────
const HERO_IMAGES = [
  { src: '/images/developments/waldorf-astoria/renderings/wa-hero.jpg', name: 'Waldorf Astoria Residences', caption: '50-Story Waterfront Tower — Downtown St. Petersburg' },
  { src: '/images/developments/viceroy-clearwater/hero.jpg', name: 'Viceroy Residences', caption: '86 Branded Residences — Clearwater Beach' },
];

// ─── Below-the-fold image break ─────────────────────────────────────────────
const BREAK_IMAGES = [
  { src: '/images/developments/waldorf-astoria/renderings/wa-pool.jpg', caption: 'Waldorf Astoria — Rooftop Pool Deck with Bay Views' },
  { src: '/images/developments/waldorf-astoria/renderings/wa-lobby.jpg', caption: 'Waldorf Astoria — Residential Lobby by BAMO Design' },
  { src: '/images/developments/waldorf-astoria/renderings/wa-living-room.jpg', caption: 'Waldorf Astoria — Great Room with Floor-to-Ceiling Glass' },
  { src: '/images/developments/waldorf-astoria/renderings/wa-terrace.jpg', caption: 'Waldorf Astoria — Private Dining Terrace at Sunset' },
  { src: '/images/developments/waldorf-astoria/renderings/wa-primary-bedroom.jpg', caption: 'Waldorf Astoria — Primary Suite with Panoramic City Views' },
  { src: '/images/developments/waldorf-astoria/renderings/wa-kitchen.jpg', caption: "Waldorf Astoria — Chef's Kitchen with Marble Island" },
  { src: '/images/developments/viceroy-clearwater/pool.jpg', caption: 'Viceroy Clearwater Beach — Resort Pool with Gulf Views' },
  { src: '/images/developments/viceroy-clearwater/club-house.jpg', caption: "Viceroy Clearwater Beach — Residents' Lounge" },
  { src: '/images/developments/viceroy-clearwater/spa.jpg', caption: 'Viceroy Clearwater Beach — Beachfront Terrace & Wellness Deck' },
];

export default function HomePage() {
  const [heroImage, setHeroImage] = useState(HERO_IMAGES[0]);
  const [breakImage, setBreakImage] = useState(BREAK_IMAGES[0]);
  useEffect(() => {
    setHeroImage(HERO_IMAGES[Math.floor(Math.random() * HERO_IMAGES.length)]);
    setBreakImage(BREAK_IMAGES[Math.floor(Math.random() * BREAK_IMAGES.length)]);
  }, []);

  const liveStats = useMemo(() => {
    const active = trackedDevelopments.filter((d) => d.status !== 'sold-out' && d.units > 0);
    const totalUnits = active.reduce((s, d) => s + d.units, 0);
    const branded = active.filter((d) => d.tags?.includes('Hospitality Brand') || d.tags?.includes('Lifestyle Brand'));
    const brandedUnits = branded.reduce((s, d) => s + d.units, 0);
    const withPsf = active.filter((d) => (d.resalePsf ?? d.developerClosePsf ?? d.avgPsf ?? 0) > 0);
    const avgPsf = withPsf.length
      ? Math.round(withPsf.reduce((s, d) => s + (d.resalePsf ?? d.developerClosePsf ?? d.avgPsf ?? 0), 0) / withPsf.length)
      : 0;
    const maxPsf = 2727;
    const statusCounts: Record<string, { units: number; color: string }> = {};
    const statusColors: Record<string, string> = {
      'shadow-inventory': '#78909C',
      'reservation': '#8B5CF6',
      'pre-sales': '#3B82F6',
      'under-construction': '#F59E0B',
      'delivered': '#10B981',
      'sold-out': '#6B7280',
    };
    for (const d of active) {
      if (!statusCounts[d.status]) statusCounts[d.status] = { units: 0, color: statusColors[d.status] || '#6B7280' };
      statusCounts[d.status].units += d.units;
    }
    return { totalUnits, brandedUnits, brandedPct: Math.round((brandedUnits / totalUnits) * 100), avgPsf, maxPsf, statusCounts, activeCount: active.length };
  }, []);

  const totalTracked = pinellasDevelopments.length + hillsboroughDevelopments.length + sarasotaDevelopments.length;

  return (
    <>
      {/* ─── Hero ───────────────────────────────────────────────── */}
      <section className="relative min-h-[90vh] flex items-center bg-charcoal-950 overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroImage.src} alt={`${heroImage.name} — ${heroImage.caption}`} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-charcoal-950 via-charcoal-950/85 to-charcoal-950/60" />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950 via-transparent to-charcoal-950/40" />
        </div>

        <div className="relative container-luxury py-32">
          <motion.div className="max-w-4xl" initial="hidden" animate="visible">
            <motion.div variants={fadeUp} className="mb-6">
              <Badge label="Tampa Bay New Construction Intelligence" variant="gold" size="md" />
            </motion.div>
            <motion.h1 variants={heroTitle} className="font-heading text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-[1.1] mb-6">
              Tampa Bay
              <span className="block text-gold-400 mt-2">New Construction Intelligence</span>
            </motion.h1>
            <motion.p variants={heroSubtitle} className="text-xl sm:text-2xl text-ivory-300/80 max-w-2xl mb-4 leading-relaxed">
              {totalTracked} developments tracked. Every price sourced. Every claim cited. No spin.
            </motion.p>
            <motion.p variants={heroSubtitle} className="text-base text-ivory-400/60 max-w-xl mb-10">
              Real data for buyers, realtors, and developers — not marketing flyers.
            </motion.p>
            <motion.div variants={heroCtas} className="flex flex-wrap gap-4 mb-16">
              <Link href="/market-report"><Button variant="primary" size="lg">View Market Report</Button></Link>
              <Link href="/developments"><Button variant="outline" size="lg">Explore Developments</Button></Link>
            </motion.div>
          </motion.div>

          <motion.div variants={heroStats} initial="hidden" animate="visible" className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            <motion.div variants={heroStatItem} className="relative p-6 rounded-xl border border-ivory-100/10 bg-charcoal-900/50 backdrop-blur-sm">
              <AnimatedCounter value={liveStats.totalUnits} className="text-3xl sm:text-4xl font-heading font-bold text-white" duration={2} />
              <div className="text-sm text-gold-400 font-medium mt-1">Units in Active Pipeline</div>
              <div className="text-xs text-ivory-400/50 mt-0.5">{liveStats.activeCount} developments</div>
            </motion.div>
            <motion.div variants={heroStatItem} className="relative p-6 rounded-xl border border-ivory-100/10 bg-charcoal-900/50 backdrop-blur-sm">
              <AnimatedCounter value={liveStats.brandedPct} suffix="%" className="text-3xl sm:text-4xl font-heading font-bold text-white" duration={2} />
              <div className="text-sm text-gold-400 font-medium mt-1">Branded Residences</div>
              <div className="text-xs text-ivory-400/50 mt-0.5">{liveStats.brandedUnits.toLocaleString()} units across 7 brands</div>
            </motion.div>
            <motion.div variants={heroStatItem} className="relative p-6 rounded-xl border border-ivory-100/10 bg-charcoal-900/50 backdrop-blur-sm">
              <div className="text-3xl sm:text-4xl font-heading font-bold text-white">
                $<AnimatedCounter value={liveStats.avgPsf} className="text-3xl sm:text-4xl font-heading font-bold text-white" duration={2} />
              </div>
              <div className="text-sm text-gold-400 font-medium mt-1">Avg Market $/SF</div>
              <div className="text-xs text-ivory-400/50 mt-0.5">Across {trackedDevelopments.filter((d) => (d.avgPsf ?? 0) > 0).length} priced buildings</div>
            </motion.div>
            <motion.div variants={heroStatItem} className="relative p-6 rounded-xl border border-gold-500/20 bg-gold-500/5 backdrop-blur-sm">
              <div className="text-3xl sm:text-4xl font-heading font-bold text-gold-400">
                $<AnimatedCounter value={liveStats.maxPsf} className="text-3xl sm:text-4xl font-heading font-bold text-gold-400" duration={2} />
              </div>
              <div className="text-sm text-gold-400 font-medium mt-1">PSF Ceiling</div>
              <div className="text-xs text-ivory-400/50 mt-0.5">Roche Bobois Maison</div>
            </motion.div>
          </motion.div>

          <motion.div variants={fadeUp} initial="hidden" animate="visible" className="mt-6">
            <div className="flex h-3 rounded-full overflow-hidden border border-ivory-100/10">
              {Object.entries(liveStats.statusCounts).sort((a, b) => b[1].units - a[1].units).map(([status, data]) => (
                <div key={status} className="h-full transition-all duration-1000"
                  style={{ width: `${(data.units / liveStats.totalUnits) * 100}%`, backgroundColor: data.color }}
                  title={`${status}: ${data.units} units`} />
              ))}
            </div>
            <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2">
              {Object.entries(liveStats.statusCounts).sort((a, b) => b[1].units - a[1].units).map(([status, data]) => (
                <div key={status} className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full" style={{ backgroundColor: data.color }} />
                  <span className="text-[10px] font-body text-ivory-400/50 capitalize">{status.replace(/-/g, ' ')} ({data.units})</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <ThisWeekFeed />
      <SubmarketPulse />
      <VelocityLeaderboard />

      <ImageBreak src={breakImage.src} alt={breakImage.caption} caption={breakImage.caption} height="md" overlay="medium" />

      <DeliveryCalendar />
      <MarketThesisActs />

      <GoldDivider variant="gradient" />

      <FeaturedBuilding />

      {/* ─── Straight Talk (kept from original homepage) ─────────── */}
      <section id="methodology" className="py-24 bg-charcoal-900/30">
        <div className="container-luxury">
          <motion.div initial="hidden" whileInView="visible" viewport={defaultViewport} variants={fadeUp} className="max-w-3xl mx-auto text-center mb-14">
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white mb-4">Straight Talk</h2>
            <p className="text-lg text-ivory-400/70">Three things you should know about this report before you share it.</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {[
              { title: "This Isn't Marketing", body: "No developer paid for placement here. No listings are promoted. If the numbers are bad, the numbers are bad. You'll see it." },
              { title: "We Get It Wrong Sometimes", body: "Market data moves fast. If you spot an error, tell us. We'll fix it, credit you, and move on. No ego." },
              { title: "Built for Working Agents", body: "This report exists because sending a client a developer's glossy PDF isn't due diligence. Sourced data is." },
            ].map((card, i) => (
              <motion.div key={i} initial="hidden" whileInView="visible" viewport={defaultViewport} variants={fadeUp}
                className="rounded-xl border border-ivory-100/10 bg-charcoal-950/60 p-8">
                <h3 className="font-heading text-lg font-semibold text-white mb-3">{card.title}</h3>
                <p className="text-sm text-ivory-400/60 leading-relaxed">{card.body}</p>
              </motion.div>
            ))}
          </div>

          <motion.div initial="hidden" whileInView="visible" viewport={defaultViewport} variants={scaleIn} className="max-w-2xl mx-auto text-center">
            <p className="text-ivory-400/50 text-sm mb-4">Compiled by</p>
            <h3 className="font-heading text-2xl font-bold text-white mb-2">Brian Sprague</h3>
            <p className="text-ivory-400/60 mb-6">Licensed Florida Real Estate Broker FL BK3221171 &middot; Development Marketing Consultant</p>
            <div className="flex justify-center gap-4">
              <Link href="/contact"><Button variant="outline" size="md">Get in Touch</Button></Link>
              <Link href="/about"><Button variant="ghost" size="md">About This Report</Button></Link>
            </div>
          </motion.div>
        </div>
      </section>

      <AudienceCTASplit />

      {/* ─── Disclaimer ──────────────────────────────────────────── */}
      <section className="py-12 bg-charcoal-950 border-t border-ivory-100/5">
        <div className="container-luxury">
          <p className="text-xs text-ivory-400/30 max-w-4xl mx-auto text-center leading-relaxed">
            This report is compiled for informational purposes only and does not constitute a solicitation, offering, or investment advice. All data is sourced from Stellar MLS, developer disclosures, and proprietary broker research. Figures should be independently verified before making purchase decisions. Market conditions are subject to change. Equal Housing Opportunity.
          </p>
        </div>
      </section>
    </>
  );
}
```

**Step 3: Verify build**
Run: `npm run build 2>&1 | tail -30`. Expected: success. The three county card grids, demand drivers, market trends snapshot, and "Tampa Bay Pipeline — Live Data" block are intentionally absent from this file — they move to developments page in Task 11.

**Step 4: Verify in browser**
- Dev server should already be running on :3000.
- Playwright: `browser_navigate` to `http://localhost:3000`, then `browser_take_screenshot` fullPage=true.
- Expected: hero renders, "This Week in Tampa Bay" section below, submarket pulse tiles, velocity leaderboard, delivery calendar, three-act thesis, featured building, Straight Talk, audience CTA split, disclaimer.

**Step 5: Commit**

```bash
git add src/app/\(marketing\)/page.tsx
git commit -m "refactor: homepage new layout — editorial + dashboard + thesis + proof"
```

---

## Task 11: Move county card grids to `/developments` page

**Files:**
- Modify: `src/app/(marketing)/developments/page.tsx`

**Context:** The existing developments page has a filter bar + grid/map toggle that already lists buildings. The card grid markup from the homepage does not duplicate this — it adds the county-grouped + demand-drivers context. Two integration options:

**Option A (recommended):** Replace the current undifferentiated grid with three county-grouped grids, reusing the rich card markup from `/tmp/homepage-before-redesign.tsx`.

**Option B:** Keep current filter-driven grid; add the demand-drivers + market-trends-snapshot blocks below the grid so nothing is lost.

**Step 1: Open both files side by side**

Read `src/app/(marketing)/developments/page.tsx` in full — note where the grid renders (around line 456 per earlier grep).
Read `/tmp/homepage-before-redesign.tsx` — the three county sections live between lines 260-590 and the demand-drivers + market-trends-snapshot + "Tampa Bay Pipeline — Live Data" block live between lines 592-755.

**Step 2: Decide A or B**

Check in with user before proceeding — show them the two options with a 1-sentence summary of the trade-off. Wait for answer.

Default if pressing forward: **Option B** — more conservative; it guarantees the developments page's existing filter/map workflow is untouched, and just appends the market-context blocks below.

**Step 3: Implement Option B (append-only)**

Add these imports at the top of `src/app/(marketing)/developments/page.tsx`:

```ts
import { demandDrivers, marketTrends } from '@/data/market';
import AnimatedStat from '@/components/ui/AnimatedStat';
```

Before the closing `</main>` or final `</div>` of the developments page's return, insert a new section that contains the copied markup from `/tmp/homepage-before-redesign.tsx` (lines 604-755: "Market Intelligence" section with `demandDrivers.map(...)` + `marketTrends.map(...)` + "Tampa Bay Pipeline — Live Data" block). Remove the homepage-specific framing (eyebrow/h2) or leave it per the existing developments page's voice.

**Step 4: Verify build**
Run: `npm run build 2>&1 | tail -20`. Expected: success.

**Step 5: Verify in browser**
- `browser_navigate` to `http://localhost:3000/developments`.
- `browser_take_screenshot` fullPage=true.
- Expected: existing filter bar + grid/map toggle at top (unchanged), market context blocks (demand drivers, trends, pipeline live data) at bottom.

**Step 6: Commit**

```bash
git add src/app/\(marketing\)/developments/page.tsx
git commit -m "feat: add market-context sections to developments page"
```

---

## Task 12: End-to-end visual verification + console check

**Files:** None.

**Step 1: Check homepage console for errors**

- Dev server running on :3000.
- `browser_navigate` to `http://localhost:3000`
- `browser_console_messages` level=error
- Expected: zero errors.

**Step 2: Check developments page console**

- `browser_navigate` to `http://localhost:3000/developments`
- `browser_console_messages` level=error
- Expected: zero errors.

**Step 3: Screenshots for the user**

- Full-page screenshot of `/` saved to `homepage-after-redesign.png`.
- Full-page screenshot of `/developments` saved to `developments-after-redesign.png`.

**Step 4: Sanity checks**

- Hero still shows 4 KPIs and pipeline status bar.
- No duplicate stats blocks on homepage.
- No building card grids on homepage.
- Developments page still has filter bar + grid/map at the top.
- demandDrivers/marketTrends/pipeline-live-data blocks visible on developments page.

**Step 5: Commit (if any cleanup edits were made)**

```bash
git add -A
git commit -m "chore: visual verification pass"
```

Only commit if edits were required. No edits = no commit.

---

## Out of Scope

- Admin/CMS for editorial events (auto-computed only)
- Personalization beyond the audience CTA split
- Changes to individual development detail pages (`/developments/[slug]`)
- Changes to `/market-report` page
- Responsive mobile optimization beyond what Tailwind gives for free
- A11y audit / keyboard navigation improvements
- Performance optimization (bundle splitting, image lazy-loading beyond current)

## Rollback

Each task commits separately. To undo:
- Individual task: `git revert <sha>`
- Full redesign: `git revert` the range of SHAs for tasks 1-11.

No database migrations, no config changes, no external services touched.
