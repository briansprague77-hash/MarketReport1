'use client';

import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { Development, FloorPlanSpec, UnitPricingLedger } from '@/types/development';
import SectionHeader from '@/components/ui/SectionHeader';
import {
  fadeUp,
  staggerContainer,
  staggerItem,
  defaultViewport,
} from '@/lib/animations';
import {
  BedDouble,
  Maximize,
  TrendingUp,
  TrendingDown,
  Minus,
  Layers,
  ArrowUpRight,
} from 'lucide-react';

// Dynamically import the chart to avoid Recharts SSR dimension warnings
const SegmentScatterChart = dynamic(
  () => import('@/components/ui/SegmentScatterChart'),
  {
    ssr: false,
    loading: () => (
      <div className="h-[320px] md:h-[400px] bg-ivory-200 animate-pulse rounded-sm" />
    ),
  }
);

// ── Segment Definitions ──────────────────────────────────────────────────────

interface SegmentData {
  name: string;
  color: string;          // Hex color for chart
  colorClass: string;     // Tailwind text-* class
  bgClass: string;        // Tailwind bg-* class
  borderClass: string;    // Tailwind border-* class
  floorPlans: FloorPlanSpec[];
  units: UnitPricingLedger[];
  // Computed analytics
  priceRange: { min: number; max: number };
  psfRange: { min: number; max: number };
  sizeRange: { min: number; max: number };
  avgFloorPremium: number;
  avgPsf: number;
  unitCount: number;
  stacks: {
    residenceType: string;
    units: UnitPricingLedger[];
    livingSF: number;
    avgPsf: number;
    premiumPerFloor: number;
  }[];
}

const SEGMENT_COLORS: Record<string, { color: string; colorClass: string; bgClass: string; borderClass: string }> = {
  // ── Waldorf Astoria segments ────────────────────────────────
  '2 Bed East': {
    color: '#B8860B',
    colorClass: 'text-gold-600',
    bgClass: 'bg-gold-500/10',
    borderClass: 'border-gold-500/30',
  },
  '3 Bed East': {
    color: '#2D7A4F',
    colorClass: 'text-emerald-600',
    bgClass: 'bg-emerald-500/10',
    borderClass: 'border-emerald-500/30',
  },
  '3 Bed Flowthrough': {
    color: '#8B2252',
    colorClass: 'text-burgundy-600',
    bgClass: 'bg-burgundy-500/10',
    borderClass: 'border-burgundy-500/30',
  },
  '3 Bed Flowthrough (End Unit)': {
    color: '#8B2252',
    colorClass: 'text-burgundy-600',
    bgClass: 'bg-burgundy-500/10',
    borderClass: 'border-burgundy-500/30',
  },
  '3 Bed Flowthrough (Interior)': {
    color: '#4A5BA6',
    colorClass: 'text-blue-600',
    bgClass: 'bg-blue-500/10',
    borderClass: 'border-blue-500/30',
  },
  // ── Art House segments (west = sunset/skyline, east = Tampa Bay) ──
  '2 Bed West': {
    color: '#B8860B',
    colorClass: 'text-gold-600',
    bgClass: 'bg-gold-500/10',
    borderClass: 'border-gold-500/30',
  },
  '3 Bed West': {
    color: '#2D7A4F',
    colorClass: 'text-emerald-600',
    bgClass: 'bg-emerald-500/10',
    borderClass: 'border-emerald-500/30',
  },
  '2 Bed + Den East': {
    color: '#4A5BA6',
    colorClass: 'text-blue-600',
    bgClass: 'bg-blue-500/10',
    borderClass: 'border-blue-500/30',
  },
  '3 Bed + Den East': {
    color: '#8B2252',
    colorClass: 'text-burgundy-600',
    bgClass: 'bg-burgundy-500/10',
    borderClass: 'border-burgundy-500/30',
  },
  // ── Generic fallbacks (penthouses, unlabeled) ─────────────
  '1 Bed': {
    color: '#7C6B9B',
    colorClass: 'text-purple-600',
    bgClass: 'bg-purple-500/10',
    borderClass: 'border-purple-500/30',
  },
  '2 Bed': {
    color: '#B8860B',
    colorClass: 'text-gold-600',
    bgClass: 'bg-gold-500/10',
    borderClass: 'border-gold-500/30',
  },
  '3 Bed': {
    color: '#2D7A4F',
    colorClass: 'text-emerald-600',
    bgClass: 'bg-emerald-500/10',
    borderClass: 'border-emerald-500/30',
  },
};

// ── Helpers ──────────────────────────────────────────────────────────────────

const fmtPrice = (n: number) =>
  '$' + (n / 1_000_000).toFixed(2) + 'M';

const fmtPsf = (n: number) =>
  '$' + n.toLocaleString('en-US', { maximumFractionDigits: 0 });

const fmtSF = (n: number) =>
  n.toLocaleString('en-US', { maximumFractionDigits: 0 });

const fmtFloorPrem = (n: number) =>
  '$' + (n / 1000).toFixed(1) + 'K';

function TrendIcon({ trend }: { trend: string }) {
  if (trend === 'up') return <TrendingUp className="h-3.5 w-3.5 text-emerald-500" />;
  if (trend === 'down') return <TrendingDown className="h-3.5 w-3.5 text-red-500" />;
  return <Minus className="h-3.5 w-3.5 text-charcoal-400" />;
}

// ── Main Component ───────────────────────────────────────────────────────────

interface BedroomSegmentAnalysisProps {
  development: Development;
}

export default function BedroomSegmentAnalysis({ development }: BedroomSegmentAnalysisProps) {
  const { specifications, pricingLadder } = development;
  const floorPlans = specifications?.floorPlanSpecs;
  const units = pricingLadder?.units;
  const floorPremiums = pricingLadder?.floorPremiums;

  if (!floorPlans || !units || floorPlans.length === 0 || units.length === 0) return null;

  // ── Group by Segment ─────────────────────────────────────────────────────
  const segmentMap = new Map<string, { plans: FloorPlanSpec[]; units: UnitPricingLedger[] }>();

  for (const fp of floorPlans) {
    const seg = fp.segment || `${fp.bedrooms} Bed`;
    if (!segmentMap.has(seg)) segmentMap.set(seg, { plans: [], units: [] });
    segmentMap.get(seg)!.plans.push(fp);
  }

  for (const u of units) {
    const fp = floorPlans.find((fp) => fp.residenceType === u.residenceType);
    const seg = fp?.segment || `${u.bedrooms} Bed`;
    if (!segmentMap.has(seg)) segmentMap.set(seg, { plans: [], units: [] });
    segmentMap.get(seg)!.units.push(u);
  }

  // ── Build Segment Analytics ──────────────────────────────────────────────
  const segments: SegmentData[] = Array.from(segmentMap.entries())
    .map(([name, { plans, units: segUnits }]) => {
      const colors = SEGMENT_COLORS[name] || {
        color: '#6B7280',
        colorClass: 'text-charcoal-500',
        bgClass: 'bg-charcoal-100',
        borderClass: 'border-charcoal-200',
      };

      const prices = segUnits.map((u) => u.currentPrice);
      const psfs = segUnits.map((u) => u.currentPsfLiving);
      const sizes = plans.map((fp) => fp.livingSF);

      // Per-stack detail
      const stackMap = new Map<string, UnitPricingLedger[]>();
      for (const u of segUnits) {
        if (!stackMap.has(u.residenceType)) stackMap.set(u.residenceType, []);
        stackMap.get(u.residenceType)!.push(u);
      }

      const stacks = Array.from(stackMap.entries()).map(([resType, stackUnits]) => {
        const fp = plans.find((p) => p.residenceType === resType);
        const stackPsfs = stackUnits.map((u) => u.currentPsfLiving);
        const avgPsf = stackPsfs.reduce((a, b) => a + b, 0) / stackPsfs.length;
        const premium = floorPremiums?.find((fp) => fp.residenceType === resType);

        return {
          residenceType: resType,
          units: stackUnits.sort((a, b) => a.floor - b.floor),
          livingSF: fp?.livingSF || 0,
          avgPsf: Math.round(avgPsf),
          premiumPerFloor: premium?.basePricePerFloor || 0,
        };
      });

      const avgPsf = psfs.length > 0
        ? Math.round(psfs.reduce((a, b) => a + b, 0) / psfs.length)
        : 0;

      const premiums = stacks.map((s) => s.premiumPerFloor).filter((p) => p > 0);
      const avgFloorPremium = premiums.length > 0
        ? Math.round(premiums.reduce((a, b) => a + b, 0) / premiums.length)
        : 0;

      return {
        name,
        ...colors,
        floorPlans: plans,
        units: segUnits,
        priceRange: {
          min: prices.length > 0 ? Math.min(...prices) : 0,
          max: prices.length > 0 ? Math.max(...prices) : 0,
        },
        psfRange: {
          min: psfs.length > 0 ? Math.min(...psfs) : 0,
          max: psfs.length > 0 ? Math.max(...psfs) : 0,
        },
        sizeRange: {
          min: sizes.length > 0 ? Math.min(...sizes) : 0,
          max: sizes.length > 0 ? Math.max(...sizes) : 0,
        },
        avgFloorPremium,
        avgPsf,
        unitCount: segUnits.length,
        stacks,
      };
    })
    // Sort: smallest bedrooms first, then alphabetically within same bed count
    .sort((a, b) => {
      // Extract bedroom count from segment name (e.g., "2 Bed East" → 2, "3 Bed" → 3)
      const bedA = parseInt(a.name.match(/(\d+)\s*Bed/)?.[1] || '99');
      const bedB = parseInt(b.name.match(/(\d+)\s*Bed/)?.[1] || '99');
      if (bedA !== bedB) return bedA - bedB;
      return a.name.localeCompare(b.name);
    });

  if (segments.length === 0) return null;

  // ── Prepare Scatter Data ─────────────────────────────────────────────────
  const scatterData = segments.flatMap((seg) =>
    seg.units.map((u) => ({
      floor: u.floor,
      price: u.currentPrice,
      psfLiving: u.currentPsfLiving,
      segment: seg.name,
      color: seg.color,
      unit: u.unit,
      residenceType: u.residenceType,
      livingSF: u.livingSF,
    }))
  );

  return (
    <section id="segment-analysis" className="section-padding bg-ivory-100">
      <div className="container-luxury">
        {/* ── Section Header ─────────────────────────────────────────── */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
        >
          <SectionHeader
            eyebrow="Segment Intelligence"
            title="Bedroom & Stack Analysis"
            subtitle="Pricing dynamics across three market segments — comparing east-facing stacks against premium flowthrough residences by floor, size, and price-per-square-foot."
          />
        </motion.div>

        {/* ── Segment Summary Cards ──────────────────────────────────── */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
        >
          {segments.map((seg) => (
            <motion.div
              key={seg.name}
              variants={staggerItem}
              className={`rounded-sm border ${seg.borderClass} ${seg.bgClass} p-6`}
            >
              {/* Segment header */}
              <div className="flex items-center justify-between mb-4">
                <h3 className={`text-lg font-heading font-bold ${seg.colorClass}`}>
                  {seg.name}
                </h3>
                <span className="text-xs font-body font-semibold text-charcoal-400 bg-white/60 px-2.5 py-1 rounded-full">
                  {seg.unitCount} units tracked
                </span>
              </div>

              {/* Key metrics */}
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-body text-charcoal-500 uppercase tracking-wider">Price Range</span>
                  <span className="text-sm font-heading font-bold text-charcoal-900">
                    {fmtPrice(seg.priceRange.min)} – {fmtPrice(seg.priceRange.max)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs font-body text-charcoal-500 uppercase tracking-wider">Avg $/SF</span>
                  <span className="text-sm font-heading font-bold text-charcoal-900">
                    {fmtPsf(seg.avgPsf)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs font-body text-charcoal-500 uppercase tracking-wider">Size Range</span>
                  <span className="text-sm font-heading font-bold text-charcoal-900">
                    {fmtSF(seg.sizeRange.min)} – {fmtSF(seg.sizeRange.max)} SF
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs font-body text-charcoal-500 uppercase tracking-wider">Floor Premium</span>
                  <span className="text-sm font-heading font-bold text-charcoal-900">
                    {fmtFloorPrem(seg.avgFloorPremium)}/floor
                  </span>
                </div>
              </div>

              {/* Stacks in this segment */}
              <div className="mt-5 pt-4 border-t border-charcoal-100/50">
                <span className="text-[10px] font-body font-semibold uppercase tracking-widest text-charcoal-400">
                  Stacks
                </span>
                <div className="mt-2 space-y-1.5">
                  {seg.stacks.map((stack) => (
                    <div key={stack.residenceType} className="flex items-center justify-between">
                      <span className="text-xs font-body text-charcoal-600">
                        {stack.residenceType}
                      </span>
                      <span className="text-xs font-body font-medium text-charcoal-700">
                        {fmtSF(stack.livingSF)} SF · {fmtPsf(stack.avgPsf)}/SF
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* ── Price vs Floor Scatter Chart ───────────────────────────── */}
        <motion.div
          className="bg-white border border-ivory-300 rounded-sm p-6 md:p-8 mb-12"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-6">
            <h3 className="text-sm font-body font-semibold uppercase tracking-widest text-gold-600">
              Price by Floor &amp; Segment
            </h3>
            <div className="flex items-center gap-4">
              {segments.map((seg) => (
                <div key={seg.name} className="flex items-center gap-1.5">
                  <div
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: seg.color }}
                  />
                  <span className="text-[10px] font-body text-charcoal-500">{seg.name}</span>
                </div>
              ))}
            </div>
          </div>
          <SegmentScatterChart data={scatterData} segments={segments.map((s) => ({ name: s.name, color: s.color }))} />
        </motion.div>

        {/* ── Stack Detail Tables ────────────────────────────────────── */}
        {segments.map((seg) => (
          <motion.div
            key={seg.name}
            className="mb-10"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={defaultViewport}
          >
            <div className="flex items-center gap-3 mb-4">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: seg.color }}
              />
              <h3 className="text-lg font-heading font-bold text-charcoal-900">
                {seg.name} — Stack Detail
              </h3>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {seg.stacks.map((stack) => (
                <div
                  key={stack.residenceType}
                  className="bg-white border border-ivory-300 rounded-sm overflow-hidden"
                >
                  {/* Stack Header */}
                  <div className="px-5 py-3 bg-charcoal-50 border-b border-ivory-300 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Layers className="h-4 w-4 text-charcoal-400" />
                      <span className="text-sm font-heading font-bold text-charcoal-900">
                        {stack.residenceType}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-body text-charcoal-500">
                        <Maximize className="inline h-3 w-3 mr-1" />
                        {fmtSF(stack.livingSF)} SF
                      </span>
                      <span className="text-xs font-body text-charcoal-500">
                        <ArrowUpRight className="inline h-3 w-3 mr-1" />
                        {fmtFloorPrem(stack.premiumPerFloor)}/fl
                      </span>
                    </div>
                  </div>

                  {/* Unit Rows */}
                  <div className="divide-y divide-ivory-200">
                    {stack.units.map((unit) => (
                      <div
                        key={unit.unit}
                        className="px-5 py-3 flex items-center justify-between hover:bg-ivory-50 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-xs font-body font-semibold text-charcoal-500 bg-charcoal-100 px-2 py-0.5 rounded">
                            FL {unit.floor}
                          </span>
                          <span className="text-xs font-body text-charcoal-400">
                            Unit {unit.unit}
                          </span>
                          {unit.status === 'under-contract' && (
                            <span className="text-[10px] font-body font-semibold uppercase tracking-wider text-gold-600 bg-gold-500/10 px-1.5 py-0.5 rounded">
                              UC
                            </span>
                          )}
                          {unit.status === 'sold' && (
                            <span className="text-[10px] font-body font-semibold uppercase tracking-wider text-emerald-600 bg-emerald-500/10 px-1.5 py-0.5 rounded">
                              Sold
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="text-xs font-body text-charcoal-500">
                            {fmtPsf(unit.currentPsfLiving)}/SF
                          </span>
                          <div className="flex items-center gap-1">
                            <TrendIcon trend={unit.trend} />
                            <span className="text-sm font-heading font-bold text-charcoal-900">
                              {fmtPrice(unit.currentPrice)}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        ))}

        {/* ── Advisory Insight ───────────────────────────────────────── */}
        <motion.div
          className="mt-6 bg-charcoal-800 border border-charcoal-700 rounded-sm p-8 md:p-12"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
        >
          <div className="flex items-center gap-3 mb-6">
            <motion.div
              className="h-px w-8 bg-gold-500"
              initial={{ scaleX: 0, originX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={defaultViewport}
              transition={{ duration: 0.6, delay: 0.3 }}
            />
            <span className="text-gold-500 text-xs font-body font-semibold uppercase tracking-[0.2em]">
              Advisory Insight
            </span>
          </div>
          <h3 className="text-2xl md:text-3xl font-heading font-bold text-ivory-50 mb-4">
            What the Segment Data Reveals
          </h3>
          <div className={`grid gap-8 ${segments.length >= 3 ? 'md:grid-cols-3' : segments.length === 2 ? 'md:grid-cols-2' : ''}`}>
            {segments.map((seg, i) => {
              const isSmallest = i === 0;
              const isLargest = i === segments.length - 1;
              const midSegment = !isSmallest && !isLargest && segments.length >= 3;
              return (
                <div key={seg.name}>
                  <h4 className="text-sm font-body font-semibold text-gold-500 uppercase tracking-wider mb-2">
                    {seg.name}{isSmallest && segments.length > 1 ? ' — Entry Point' : isLargest && segments.length > 1 ? ' — Peak Value' : midSegment ? ' — Core Demand' : ''}
                  </h4>
                  <p className="text-sm font-body text-ivory-300 leading-relaxed">
                    {seg.unitCount} units averaging {fmtPsf(seg.avgPsf)}/SF
                    across a {fmtPrice(seg.priceRange.min)}–{fmtPrice(seg.priceRange.max)} price range.
                    {seg.avgFloorPremium > 0 && (
                      <> Floor premiums of {fmtFloorPrem(seg.avgFloorPremium)}/floor
                      make higher-floor units incrementally more compelling.</>
                    )}
                    {seg.stacks.length > 1 && (
                      <> Spans {seg.stacks.length} stacks ({seg.stacks.map((s) => s.residenceType).join(', ')}).</>
                    )}
                  </p>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
