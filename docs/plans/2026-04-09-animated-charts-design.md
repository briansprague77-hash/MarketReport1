# Animated Data Visualizations Design

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Replace all 6 new chart components + demand drivers with custom animated visualizations using Framer Motion + custom SVG. Apple Keynote meets Bloomberg Terminal aesthetic.

**Architecture:** Custom React components using Framer Motion's `useInView`, `animate`, `motion.div`, and `useMotionValue` for scroll-triggered animations. No new dependencies — stays in existing stack (React + Framer Motion + Tailwind).

**Tech Stack:** React 18, Framer Motion 11, Tailwind CSS, Lucide React, custom SVG

---

## Design System: Animated Primitives

### AnimatedCounter
- Counts from 0 to target value on scroll into view
- Supports prefix ($), suffix (%, /SF, B+, M+)
- Duration: 1.5-2s with easeOut curve
- Large heading text (text-3xl to text-5xl)
- Gold color for primary metrics

### AnimatedBar
- Horizontal bar that grows from 0% to target width on scroll
- Gradient fill (gold-600 to gold-400, or custom)
- Staggered delay per row (0.1s increments)
- Rounded end cap
- Label on left, value on right, bar in middle

### AnimatedRing
- SVG circular progress ring
- Stroke-dashoffset animation from full circumference to target
- Center text shows percentage
- Pulsing glow on the filled portion
- Used for sell-through percentages

### AnimatedDot
- Small pulsing circle for "live" indicators
- Green pulse = active/selling, Gold pulse = data fresh, Red pulse = alert

---

## Task 1: Create Animated Primitives

**File:** `src/components/ui/AnimatedCounter.tsx`
- Props: `value: number`, `prefix?: string`, `suffix?: string`, `duration?: number`, `className?: string`
- Uses `useInView` + `useMotionValue` + `useTransform` + `animate`
- Counts up when scrolled into view, stays at final value

**File:** `src/components/ui/AnimatedBar.tsx`
- Props: `value: number`, `max: number`, `label: string`, `sublabel?: string`, `color?: string`, `delay?: number`
- Horizontal bar with animated width growth
- Label left, percentage right

**File:** `src/components/ui/AnimatedRing.tsx`
- Props: `value: number`, `size?: number`, `strokeWidth?: number`, `color?: string`, `label?: string`
- SVG circle with animated stroke-dashoffset
- Center text

---

## Task 2: Rebuild SellThroughRankings

Replace the Recharts horizontal bar chart with:
- Each building as a row with `AnimatedBar`
- Building name + PSF on left
- Gradient gold bar growing to soldPercent width
- Percentage counter on right using `AnimatedCounter`
- Staggered reveal (0.1s delay per row)
- Sort descending by soldPercent
- Dark card background with subtle border

---

## Task 3: Rebuild PsfAppreciation

Replace with animated "before/after" visualization:
- Each building shows a horizontal bar pair:
  - Gray thin bar = launch PSF
  - Gold thick bar = current PSF (animated growth)
- Appreciation percentage as `AnimatedCounter` with green color and + prefix
- Sort by appreciation % descending
- Staggered reveal
- Light background

---

## Task 4: Rebuild HoaCostLadder

Replace with animated stepped visualization:
- Each building as a row with `AnimatedBar`
- Teal/blue gradient bar
- Right side shows monthly cost for 2,000 SF unit as `AnimatedCounter` with $ prefix
- Sort ascending (cheapest first)
- Dark background

---

## Task 5: Rebuild BrandedComparison

Replace 3 static cards with animated head-to-head:
- Two large columns: "Branded" vs "Independent"
- 3 metrics each with `AnimatedCounter`:
  - Avg PSF (gold)
  - Avg Units (white)
  - Avg HOA (teal)
- Center column shows "Brand Premium" percentage with `AnimatedRing`
- Gold vs charcoal color scheme
- Staggered counter animations

---

## Task 6: Rebuild AbsorptionWave

Replace Recharts line chart with custom SVG path animation:
- SVG viewBox with animated path drawing (stroke-dasharray)
- Art House path in gold, 400 Central path in blue
- Dots appear at each data point with staggered fade-in
- Labels appear after path draws
- Peak month highlighted with pulsing dot
- Dark background with grid lines

---

## Task 7: Rebuild FlipProfitChart

Replace with hero-style animated stat display:
- Large "19 for 19" animated counter (0→19) with green glow
- "ZERO LOSERS" text that fades in after counter
- 3 animated counters in a row: Avg Markup %, Total $ Gains, Highest Single Flip
- Each counter triggers on scroll with staggered delay
- Green accent color throughout
- Light background

---

## Task 8: Rebuild Demand Drivers

Replace the 8 static cards with animated stat reveals:
- Each card's stat number uses `AnimatedCounter`
- Icon pulses once on reveal
- Cards stagger in from bottom (0.1s delay each)
- 2x4 grid on desktop, 1 column on mobile
- Gold left border accent with gradient fade
- Description text fades in 0.3s after stat counter completes

---

## Verification
- `npx next build` — 0 errors
- All animations trigger on scroll (not on page load)
- Animations only play once (not on every scroll)
- Mobile responsive
- No layout shift during animation
