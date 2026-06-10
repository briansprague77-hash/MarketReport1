'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { heroTitle, heroSubtitle, heroCtas, defaultViewport } from '@/lib/animations';
import { pipeline } from '@/data/market';
import { useMarketData, GEO_DEV_COUNTS } from '@/hooks/useMarketData';
import type { GeoFilter } from '@/hooks/useMarketData';
import {
  ExecutiveDashboard,
  GeographicCoverage,
  MarketTrends,
  DemandDrivers,
  MarketCharts,
  PriceTierAnalysis,
  EconomistCommentary,
  SupplyForecast,
  DeliveryTimeline,
  ComparisonTable,
  CompetitivePositioning,
  AbsorptionAnalysis,
  MarketInsights,
  Methodology,
  Disclaimers,
  DevelopmentOverview,
  CollisionEngine,
  ShadowRadar,
  ResaleCrossover,
  PowerRankings,
  StorylineEngine,
  DeliveryCongestion,
  BedroomMix,
  SellThroughRankings,
  PsfAppreciation,
  HoaCostLadder,
  BrandedComparison,
  AbsorptionWave,
  FlipProfitChart,
  CrossMarketIntelligence,
} from '@/components/sections/market';
import ComparisonMatrix from '@/components/sections/market/ComparisonMatrix';
import HoaAmenityGrid from '@/components/sections/market/HoaAmenityGrid';
import InsightKeyLegend from '@/components/ui/InsightKeyLegend';
import LeadGate from '@/components/ui/LeadGate';

// ─── Tab Configuration ───────────────────────────────────────────────────────

const GEO_TABS: { key: GeoFilter; label: string }[] = [
  { key: 'tampa-bay', label: 'Tampa Bay' },
  { key: 'pinellas', label: 'Pinellas' },
  { key: 'hillsborough', label: 'Hillsborough' },
  { key: 'sarasota', label: 'Sarasota' },
];

const PINELLAS_MICROMARKET_TABS: { key: GeoFilter; label: string }[] = [
  { key: 'pinellas', label: 'All Pinellas' },
  { key: 'downtown-stpete', label: 'Downtown St Pete' },
  { key: 'mirror-lake', label: 'Mirror Lake' },
  { key: 'stpete-beach', label: 'St. Pete Beach' },
  { key: 'clearwater-beach', label: 'Clearwater Beach' },
];

const HILLSBOROUGH_MICROMARKET_TABS: { key: GeoFilter; label: string }[] = [
  { key: 'hillsborough', label: 'All Hillsborough' },
  { key: 'downtown-tampa', label: 'Downtown Tampa' },
  { key: 'water-street', label: 'Water Street' },
  { key: 'channel-district', label: 'Channel District' },
  { key: 'bayshore-blvd', label: 'Bayshore Blvd' },
  { key: 'westshore', label: 'Westshore' },
];

const SARASOTA_MICROMARKET_TABS: { key: GeoFilter; label: string }[] = [
  { key: 'sarasota', label: 'All Sarasota' },
  { key: 'the-quay', label: 'The Quay' },
  { key: 'downtown-sarasota', label: 'Downtown Sarasota' },
  { key: 'golden-gate-point', label: 'Golden Gate Point' },
];

// All GeoFilter values that represent Pinellas (county + micromarkets)
const PINELLAS_GEO_KEYS: GeoFilter[] = [
  'pinellas', 'downtown-stpete', 'mirror-lake', 'stpete-beach', 'clearwater-beach',
];
const HILLSBOROUGH_GEO_KEYS: GeoFilter[] = [
  'hillsborough', 'downtown-tampa', 'water-street', 'channel-district', 'bayshore-blvd', 'westshore',
];
const SARASOTA_GEO_KEYS: GeoFilter[] = [
  'sarasota', 'the-quay', 'downtown-sarasota', 'golden-gate-point',
];

export default function MarketReportClient() {
  const [geo, setGeo] = useState<GeoFilter>('tampa-bay');
  const data = useMarketData(geo);

  return (
    <main className="min-h-screen">
      {/* ─── Hero ────────────────────────────────────────────────────────── */}
      <section className="relative pt-32 pb-20 bg-charcoal-950 overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                'radial-gradient(circle at 25% 25%, rgba(201,168,76,0.15) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(201,168,76,0.1) 0%, transparent 50%)',
            }}
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.p
            initial="hidden"
            animate="visible"
            variants={heroCtas}
            className="text-xs font-body font-semibold uppercase tracking-[0.3em] text-gold-500 mb-4"
          >
            Tampa Bay New Construction Intelligence
          </motion.p>

          <motion.h1
            initial="hidden"
            animate="visible"
            variants={heroTitle}
            className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-ivory-50 mb-6 leading-tight"
          >
            Market Report
          </motion.h1>

          <motion.p
            initial="hidden"
            animate="visible"
            variants={heroSubtitle}
            className="text-lg md:text-xl font-body text-charcoal-400 max-w-3xl mx-auto mb-4 leading-relaxed"
          >
            {data.totalDevs} developments tracked across{' '}
            {pipeline.marketsTracked.length} submarkets. Real-time pipeline
            analytics, pricing trends, and delivery timelines for listing
            advisors.
          </motion.p>

          <motion.p
            initial="hidden"
            animate="visible"
            variants={heroSubtitle}
            className="text-sm font-body italic text-charcoal-500 max-w-2xl mx-auto mb-10"
          >
            No spin. No luxury lifestyle filler. Just sourced data.
          </motion.p>

          {/* Hero stat pills */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={heroCtas}
            className="flex flex-wrap justify-center gap-3 mb-8"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gold-500/30 bg-gold-500/10 text-sm font-body font-medium text-gold-400">
              <span className="h-2 w-2 rounded-full bg-gold-500" />
              {data.totalUnits.toLocaleString()} Units
            </span>
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-charcoal-700 bg-charcoal-800/50 text-sm font-body font-medium text-charcoal-300">
              <span className="h-2 w-2 rounded-full bg-charcoal-500" />
              {data.totalDevs} Developments
            </span>
            {data.brandedCount > 0 && (
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-sm font-body font-medium text-emerald-400">
                {data.brandedCount} Branded
              </span>
            )}
          </motion.div>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={heroCtas}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gold-500/20 bg-gold-500/5"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold-400 opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-gold-500" />
            </span>
            <span className="text-xs font-body font-medium text-gold-400 tracking-wide">
              LIVE DATA &mdash; as of {pipeline.asOfDate}
            </span>
          </motion.div>
        </div>
      </section>

      {/* ─── Geographic Filter Tabs ───────────────────────────────────── */}
      <div className="sticky top-16 z-30 bg-charcoal-950/95 backdrop-blur-md border-b border-charcoal-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Primary county-level tabs */}
          <div className="flex items-center gap-2 py-3 overflow-x-auto scrollbar-hide">
            {GEO_TABS.map((tab) => {
              const isActive = tab.key === geo || (tab.key === 'pinellas' && PINELLAS_GEO_KEYS.includes(geo));
              return (
                <button
                  key={tab.key}
                  onClick={() => setGeo(tab.key)}
                  className={`
                    flex items-center gap-2 whitespace-nowrap rounded-lg px-4 py-2 text-sm font-body font-medium transition-all
                    ${
                      isActive
                        ? 'bg-gold-500/20 text-gold-400 border border-gold-500/30'
                        : 'text-charcoal-400 hover:text-ivory-200 hover:bg-charcoal-800/50 border border-transparent'
                    }
                  `}
                >
                  {tab.label}
                  <span
                    className={`
                      inline-flex items-center justify-center rounded-full px-1.5 py-0.5 text-xs font-semibold min-w-[1.25rem]
                      ${
                        isActive
                          ? 'bg-gold-500/30 text-gold-300'
                          : 'bg-charcoal-800 text-charcoal-500'
                      }
                    `}
                  >
                    {GEO_DEV_COUNTS[tab.key]}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Micromarket sub-tabs — visible when county is active */}
          {(() => {
            const microTabs = PINELLAS_GEO_KEYS.includes(geo)
              ? PINELLAS_MICROMARKET_TABS
              : HILLSBOROUGH_GEO_KEYS.includes(geo)
              ? HILLSBOROUGH_MICROMARKET_TABS
              : SARASOTA_GEO_KEYS.includes(geo)
              ? SARASOTA_MICROMARKET_TABS
              : null;
            if (!microTabs) return null;
            return (
              <div className="flex items-center gap-1.5 pb-3 pl-2 overflow-x-auto scrollbar-hide">
                {microTabs.map((sub) => {
                  const isSubActive = geo === sub.key;
                  return (
                    <button
                      key={sub.key}
                      onClick={() => setGeo(sub.key)}
                      className={`
                        flex items-center gap-1.5 whitespace-nowrap rounded-md px-3 py-1.5 text-xs font-body font-medium transition-all
                        ${
                          isSubActive
                            ? 'bg-gold-500/15 text-gold-400 border border-gold-500/25'
                            : 'text-charcoal-500 hover:text-ivory-300 hover:bg-charcoal-800/40 border border-transparent'
                        }
                      `}
                    >
                      {sub.label}
                      <span
                        className={`
                          inline-flex items-center justify-center rounded-full px-1 py-0.5 text-[10px] font-semibold min-w-[1rem]
                          ${
                            isSubActive
                              ? 'bg-gold-500/25 text-gold-300'
                              : 'bg-charcoal-800/60 text-charcoal-600'
                          }
                        `}
                      >
                        {GEO_DEV_COUNTS[sub.key]}
                      </span>
                    </button>
                  );
                })}
              </div>
            );
          })()}
        </div>
      </div>

      {/* ═══ CHAPTER 1: EXECUTIVE OVERVIEW ═══════════════════════════════ */}
      <ExecutiveDashboard data={data} />
      <GeographicCoverage />
      <MarketTrends data={data} />
      <DemandDrivers />

      {/* ═══ CHAPTERS 2-6: DEEP ANALYTICS (gated) ════════════════════════
          Soft email-wall — top dashboard + trends stay open as the SEO teaser;
          the deep analytics unlock with one email (captured as a lead). */}
      <LeadGate
        id="market-report-deep"
        source="market-report"
        title="Unlock the full Tampa Bay market report"
        subtitle="Pricing tiers, absorption, supply forecast, sell-through rankings, flip profit, and cross-market intel — sourced from Stellar MLS. Enter your email to read the full report."
      >
      {/* ═══ CHAPTER 2: MARKET ANALYTICS ═════════════════════════════════ */}
      <div className="relative py-8 bg-charcoal-950">
        <div className="absolute inset-0 flex items-center" aria-hidden="true">
          <div className="w-full border-t border-gold-500/20" />
        </div>
        <div className="relative flex justify-center">
          <span className="bg-charcoal-950 px-6 text-sm font-medium text-gold-400 tracking-widest uppercase">
            Market Analytics
          </span>
        </div>
      </div>

      <MarketCharts data={data} />
      <PriceTierAnalysis data={data} />
      <BedroomMix data={data} />
      <SellThroughRankings data={data} />
      <PsfAppreciation data={data} />
      <HoaCostLadder data={data} />
      <EconomistCommentary data={data} />

      {/* ═══ CHAPTER 3: SUPPLY & DELIVERY ════════════════════════════════ */}
      <div className="relative py-8 bg-charcoal-950">
        <div className="absolute inset-0 flex items-center" aria-hidden="true">
          <div className="w-full border-t border-gold-500/20" />
        </div>
        <div className="relative flex justify-center">
          <span className="bg-charcoal-950 px-6 text-sm font-medium text-gold-400 tracking-widest uppercase">
            Supply &amp; Delivery Pipeline
          </span>
        </div>
      </div>

      <SupplyForecast data={data} />
      <AbsorptionAnalysis data={data} />
      <DeliveryTimeline />
      <DeliveryCongestion data={data} />
      <AbsorptionWave />

      {/* ═══ CHAPTER 4: DEVELOPMENT INTELLIGENCE ═════════════════════════ */}
      <div className="relative py-8 bg-charcoal-950">
        <div className="absolute inset-0 flex items-center" aria-hidden="true">
          <div className="w-full border-t border-gold-500/20" />
        </div>
        <div className="relative flex justify-center">
          <span className="bg-charcoal-950 px-6 text-sm font-medium text-gold-400 tracking-widest uppercase">
            Development Intelligence
          </span>
        </div>
      </div>

      <DevelopmentOverview data={data} />
      <ComparisonTable developments={data.filtered} />
      <StorylineEngine data={data} />
      <PowerRankings data={data} />
      <CompetitivePositioning data={data} />
      <CollisionEngine data={data} />
      <BrandedComparison data={data} />

      {/* ═══ CHAPTER 5: CROSS-MARKET INTELLIGENCE ══════════════════════════ */}
      <div className="relative py-8 bg-charcoal-950">
        <div className="absolute inset-0 flex items-center" aria-hidden="true">
          <div className="w-full border-t border-gold-500/20" />
        </div>
        <div className="relative flex justify-center">
          <span className="bg-charcoal-950 px-6 text-sm font-medium text-gold-400 tracking-widest uppercase">
            Cross-Market Intelligence
          </span>
        </div>
      </div>

      <CrossMarketIntelligence />

      {/* Development Scorecard Matrix — scored comparison of all buildings */}
      <ComparisonMatrix />

      {/* HOA & Amenity Comparison Grid */}
      <HoaAmenityGrid />

      {/* Buyer Origin — Where are 33701 condo owners coming from? */}
      <section className="py-16 bg-charcoal-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <p className="text-xs font-body font-semibold uppercase tracking-[0.25em] text-gold-500 mb-2">
              Demand Intelligence
            </p>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-ivory-50 mb-3">
              Buyer Origin — Where Is Capital Coming From?
            </h2>
            <p className="text-sm font-body text-charcoal-400 max-w-2xl mx-auto">
              1,700 condo owners in ZIP 33701 (Downtown St. Petersburg), deduplicated to primary residence ZIP.
              This is not survey data — it is tax-record-verified ownership origin.
            </p>
          </div>
          <div className="rounded-xl border border-charcoal-700/50 bg-charcoal-900/60 overflow-hidden">
            <iframe
              src="https://flo.uri.sh/visualisation/25577033/embed"
              title="Buyer Origin — 33701 Condo Owners by Primary Residence ZIP"
              className="w-full border-0"
              style={{ height: '600px' }}
              allowFullScreen
              loading="lazy"
            />
          </div>
          <p className="mt-3 text-[10px] font-body text-charcoal-600 italic text-center">
            Source: Pinellas County Property Appraiser ownership records, deduplicated by owner mailing address ZIP code. Visualization by Flourish.
          </p>
        </div>
      </section>

      {/* ═══ CHAPTER 6: RISK & OUTLOOK ═══════════════════════════════════ */}
      <div className="relative py-8 bg-charcoal-950">
        <div className="absolute inset-0 flex items-center" aria-hidden="true">
          <div className="w-full border-t border-gold-500/20" />
        </div>
        <div className="relative flex justify-center">
          <span className="bg-charcoal-950 px-6 text-sm font-medium text-gold-400 tracking-widest uppercase">
            Risk &amp; Market Outlook
          </span>
        </div>
      </div>

      <ShadowRadar data={data} />
      <ResaleCrossover data={data} />
      <FlipProfitChart />
      <MarketInsights data={data} />
      </LeadGate>

      {/* ═══ APPENDIX ════════════════════════════════════════════════════ */}
      <section className="section-padding bg-ivory-50">
        <div className="container-luxury">
          <div className="max-w-3xl mx-auto">
            <h3 className="text-sm font-body font-semibold uppercase tracking-widest text-charcoal-700 mb-6">
              How to Read This Report
            </h3>
            <InsightKeyLegend />
          </div>
        </div>
      </section>

      <Disclaimers />
      <Methodology />
    </main>
  );
}
