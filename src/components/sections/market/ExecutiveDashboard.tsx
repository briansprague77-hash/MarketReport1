'use client';

import { motion } from 'framer-motion';
import { staggerContainer, staggerItem, defaultViewport } from '@/lib/animations';
import {
  Building2,
  DollarSign,
  TrendingUp,
  BarChart3,
  Clock,
  Flame,
  Trophy,
  Crown,
  Zap,
} from 'lucide-react';
import type { MarketData } from '@/hooks/useMarketData';

interface MetricCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  sublabel: string;
  accent: string;
  extra?: React.ReactNode;
}

function MetricCard({ icon, label, value, sublabel, accent, extra }: MetricCardProps) {
  return (
    <motion.div
      variants={staggerItem}
      className="relative overflow-hidden rounded-xl border border-charcoal-800 bg-charcoal-900/80 p-6 backdrop-blur-sm"
    >
      {/* Accent top bar */}
      <div className="absolute inset-x-0 top-0 h-1" style={{ backgroundColor: accent }} />

      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-body font-semibold uppercase tracking-widest text-charcoal-400 mb-2">
            {label}
          </p>
          <p className="text-3xl font-heading font-bold text-ivory-50">
            {value}
          </p>
          <p className="mt-1 text-sm font-body text-charcoal-400">
            {sublabel}
          </p>
          {extra}
        </div>
        <div
          className="flex h-12 w-12 items-center justify-center rounded-lg"
          style={{ backgroundColor: `${accent}20` }}
        >
          <div style={{ color: accent }}>{icon}</div>
        </div>
      </div>
    </motion.div>
  );
}

// ─── HHI Interpretation ──────────────────────────────────────────────────────
function hhiLabel(hhi: number): string {
  if (hhi < 1500) return 'Competitive';
  if (hhi < 2500) return 'Moderate';
  return 'Concentrated';
}

function hhiSublabel(hhi: number): string {
  if (hhi < 1500) return 'Fragmented developer landscape';
  if (hhi < 2500) return 'Moderate concentration';
  return 'Highly concentrated market';
}

// ─── Component ───────────────────────────────────────────────────────────────

interface ExecutiveDashboardProps {
  data?: MarketData;
}

export default function ExecutiveDashboard({ data }: ExecutiveDashboardProps) {
  // Compute derived values — use 0/null defaults instead of hardcoded stale numbers
  const totalUnits = data?.totalUnits ?? 0;
  const totalDevs = data?.totalDevs ?? 0;
  const avgPsf = data?.avgPsf ?? 0;
  const minPsf = data?.minPsf ?? 0;
  const maxPsf = data?.maxPsf ?? 0;
  const avgResalePsf = data?.avgResalePsf ?? 0;
  const avgDeveloperClosePsf = data?.avgDeveloperClosePsf ?? 0;
  const brandedCount = data?.brandedCount ?? 0;
  const brandedUnits = data?.brandedUnits ?? 0;
  const hhi = data?.hhi ?? 0;
  const geoLabel = data?.geoLabel ?? 'Tampa Bay';

  const preSalesUnits =
    data
      ? (data.statusGroups['pre-sales'] ?? 0) +
        (data.statusGroups['reservation'] ?? 0)
      : 0;

  const deliveredUnits = data
    ? (data.statusGroups['delivered'] ?? 0)
    : 0;

  const brandedPct =
    totalUnits > 0 ? Math.round((brandedUnits / totalUnits) * 100) : 0;

  // Absorption estimate (~16 contracts/month market-wide)
  const ABSORPTION_RATE = 16;
  const inventoryMonths = totalUnits > 0 ? Math.round(totalUnits / ABSORPTION_RATE) : 0;

  const metrics: MetricCardProps[] = [
    {
      icon: <Building2 className="h-6 w-6" />,
      label: `Total ${geoLabel} Units`,
      value: totalUnits > 0 ? totalUnits.toLocaleString() : 'N/A',
      sublabel: totalDevs > 0 ? `${totalDevs} active development${totalDevs !== 1 ? 's' : ''}` : 'No developments tracked',
      accent: '#C9A84C',
    },
    {
      icon: <DollarSign className="h-6 w-6" />,
      label: 'Avg Price / SF',
      value: avgPsf > 0 ? `$${avgPsf.toLocaleString()}` : 'N/A',
      sublabel:
        minPsf > 0 && maxPsf > 0
          ? `Range: $${minPsf.toLocaleString()} \u2013 $${maxPsf.toLocaleString()}`
          : 'Insufficient PSF data',
      accent: '#0D9668',
      extra: avgResalePsf > 0 ? (
        <div className="mt-2 space-y-0.5">
          <p className="text-xs font-body font-semibold" style={{ color: '#C9A84C' }}>
            Current Market: ${avgResalePsf.toLocaleString()}/SF
          </p>
          {avgDeveloperClosePsf > 0 && avgDeveloperClosePsf !== avgResalePsf && (
            <p className="text-xs font-body text-charcoal-400">
              Developer Close: ${avgDeveloperClosePsf.toLocaleString()}/SF
            </p>
          )}
        </div>
      ) : undefined,
    },
    {
      icon: <TrendingUp className="h-6 w-6" />,
      label: 'Branded Residences',
      value: String(brandedCount),
      sublabel: brandedCount > 0 ? `${brandedPct}% of units (${brandedUnits.toLocaleString()})` : 'No branded projects in selection',
      accent: '#3B82F6',
    },
    {
      icon: <BarChart3 className="h-6 w-6" />,
      label: 'Developer Concentration',
      value: totalDevs > 0 ? hhiLabel(hhi) : 'N/A',
      sublabel: totalDevs > 0 ? `HHI ${Math.round(hhi).toLocaleString()} \u2014 ${hhiSublabel(hhi)}` : 'Insufficient data',
      accent: '#EC4899',
    },
    {
      icon: <Clock className="h-6 w-6" />,
      label: 'Pre-Sales Active',
      value: preSalesUnits.toLocaleString(),
      sublabel: 'Units actively selling today',
      accent: '#8B5CF6',
    },
    {
      icon: <Flame className="h-6 w-6" />,
      label: 'Delivered',
      value: deliveredUnits.toLocaleString(),
      sublabel: 'Units in delivered buildings',
      accent: '#F59E0B',
    },
  ];

  // Narrative helpers
  const devsWord = totalDevs <= 20
    ? ['zero','one','two','three','four','five','six','seven','eight','nine','ten',
       'eleven','twelve','thirteen','fourteen','fifteen','sixteen','seventeen','eighteen','nineteen','twenty'][totalDevs] ?? String(totalDevs)
    : String(totalDevs);

  return (
    <section className="py-16 bg-charcoal-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          variants={staggerItem}
        >
          <p className="text-xs font-body font-semibold uppercase tracking-[0.25em] text-gold-500 mb-3">
            Market Snapshot
          </p>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-ivory-50">
            Executive Dashboard
          </h2>
          <p className="mt-3 text-lg font-body text-charcoal-400 max-w-2xl mx-auto">
            Key market indicators for the {geoLabel} new construction pipeline
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          variants={staggerContainer}
        >
          {metrics.map((m) => (
            <MetricCard key={m.label} {...m} />
          ))}
        </motion.div>

        {/* ─── Market Highlights ─────────────────────────────────────── */}
        <motion.div
          className="mt-10 mb-6"
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          variants={staggerItem}
        >
          <h3 className="text-sm font-body font-semibold uppercase tracking-widest text-gold-500 mb-4">
            Market Highlights
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                icon: <TrendingUp className="h-5 w-5 text-gold-500" />,
                title: '$615M+ Closed',
                text: '472 MLS closings across 3 delivered Pinellas buildings in 4 months (Dec 2025 \u2013 Apr 2026). Largest bulk delivery wave in Tampa Bay history.',
              },
              {
                icon: <Trophy className="h-5 w-5 text-gold-500" />,
                title: '37 Flippers, Zero Losers',
                text: 'Every single owner who bought from a developer and relisted is above water. Avg markup: +17.9% ($276K/unit). First flip data ever in Tampa Bay new construction.',
              },
              {
                icon: <Crown className="h-5 w-5 text-gold-500" />,
                title: '7 Branded Residences',
                text: '788 units across Waldorf Astoria, Roche Bobois, Viceroy, Ritz-Carlton, Pendry, EDITION, ORA. More branded projects than Miami had in 2019.',
              },
              {
                icon: <BarChart3 className="h-5 w-5 text-gold-500" />,
                title: '$571\u2013$2,727/SF Spread',
                text: '4.7x PSF spread from Luna Marina Pointe to Roche Bobois Sky Penthouse \u2014 signals mature market segmentation across all buyer tiers.',
              },
              {
                icon: <Zap className="h-5 w-5 text-gold-500" />,
                title: 'ORA Phase 1: 40 Days',
                text: '$84M sold out in 40 days. Hotel ORA\u2019s first phase is the fastest pre-sale in Tampa Bay history.',
              },
              {
                icon: <TrendingUp className="h-5 w-5 text-gold-500" />,
                title: 'Downtown Tampa > St Pete',
                text: '$1,332 avg PSF in Downtown Tampa vs $1,098 in Downtown St Pete. First time Tampa has priced above St Pete in the luxury segment.',
              },
              {
                icon: <BarChart3 className="h-5 w-5 text-gold-500" />,
                title: '8.6% Flip Rate',
                text: '37 of 430 buyers flipped within 4 months. ALL in profit. First-ever flip data in Tampa Bay new construction.',
              },
              {
                icon: <DollarSign className="h-5 w-5 text-gold-500" />,
                title: '$6.1B Pipeline',
                text: 'Total estimated pipeline value across 15 priced buildings. Institutional-scale capital commitment.',
              },
            ].map((finding) => (
              <div
                key={finding.title}
                className="flex gap-3 rounded-lg border-l-2 border-gold-500 bg-charcoal-900/80 border border-charcoal-800 p-4"
                style={{ borderLeftColor: '#C9A84C', borderLeftWidth: '3px' }}
              >
                <div className="shrink-0 mt-0.5">{finding.icon}</div>
                <div>
                  <p className="text-sm font-body font-bold text-ivory-50 mb-1">
                    {finding.title}
                  </p>
                  <p className="text-xs font-body leading-relaxed text-charcoal-400">
                    {finding.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ─── Analyst Narrative ───────────────────────────────────────── */}
        <motion.div
          className="mt-10 rounded-xl border border-charcoal-800 bg-charcoal-900/60 backdrop-blur-sm p-6 md:p-8"
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          variants={staggerItem}
        >
          <h3 className="text-sm font-body font-semibold uppercase tracking-widest text-gold-500 mb-3">
            Analyst&apos;s Take
          </h3>
          <div className="space-y-3 text-sm font-body leading-relaxed text-charcoal-300">
            <p>
              The {geoLabel} new construction pipeline comprises{' '}
              <span className="text-ivory-50 font-semibold">
                {totalUnits.toLocaleString()} units
              </span>{' '}
              across {devsWord} active developments
              {brandedCount > 0 && (
                <>. {brandedCount} branded residence project{brandedCount !== 1 ? 's' : ''} account{brandedCount === 1 ? 's' : ''} for {brandedUnits.toLocaleString()} units ({brandedPct}% of pipeline)</>
              )}
              . With {preSalesUnits.toLocaleString()} units in active pre-sales and{' '}
              {deliveredUnits.toLocaleString()} delivered, the market is positioned across
              multiple delivery windows.
            </p>
            {avgPsf > 0 && (
              <p>
                Average PSF of{' '}
                <span className="text-ivory-50 font-semibold">
                  ${avgPsf.toLocaleString()}
                </span>{' '}
                with a range of ${minPsf.toLocaleString()} \u2013 ${maxPsf.toLocaleString()}.
                The pricing landscape reflects the diversity of product types across
                the {geoLabel} pipeline — from attainable luxury through ultra-premium branded residences.
              </p>
            )}
            <p>
              Developer concentration{' '}
              (HHI: <span className="text-ivory-50 font-semibold">{Math.round(hhi).toLocaleString()}</span>) indicates a{' '}
              <span className="text-ivory-50 font-semibold">{hhiLabel(hhi).toLowerCase()}</span>{' '}
              market — {hhi < 1500
                ? 'a fragmented landscape with no single developer dominating supply. This benefits buyers through price discipline and optionality.'
                : hhi < 2500
                  ? 'moderate developer influence on pricing and inventory release timing.'
                  : 'significant developer pricing power and supply control.'}
            </p>
            {inventoryMonths > 0 && (
              <p>
                At current absorption rates (~{ABSORPTION_RATE} contracts/month), the pipeline represents approximately{' '}
                <span className="text-ivory-50 font-semibold">{inventoryMonths} months</span>{' '}
                of inventory.{' '}
                {inventoryMonths <= 18
                  ? 'This is consistent with a balanced market.'
                  : inventoryMonths <= 24
                    ? 'This suggests adequate but watchful supply levels.'
                    : 'Above 24 months signals potential oversupply risk worth monitoring.'}
              </p>
            )}
          </div>
          <p className="mt-4 text-xs font-body text-charcoal-500">
            Sources: Stellar MLS, developer disclosures, proprietary broker research. Metrics computed from {geoLabel} developments only.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
