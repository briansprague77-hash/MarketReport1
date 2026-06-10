'use client';

import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { fadeUp, staggerContainer, staggerItem, defaultViewport } from '@/lib/animations';
import type { MarketData } from '@/hooks/useMarketData';
import type { DevelopmentSummary } from '@/data/developments';
import { getDevelopment, getDevelopmentProfile } from '@/data/developments';
import { AlertTriangle, CheckCircle, AlertCircle, HelpCircle } from 'lucide-react';

interface ResaleCrossoverProps {
  data?: MarketData;
}

// ─── Crossover Status Types ─────────────────────────────────────────────────

type CrossoverStatus = 'active' | 'warning' | 'controlled' | 'insufficient';

interface CrossoverAnalysis {
  name: string;
  slug: string;
  status: CrossoverStatus;
  developerPsf: number | null;
  resalePsf: number | null;
  spreadPercent: number | null;
  label: string;
  description: string;
}

// ─── Status Config ──────────────────────────────────────────────────────────

const STATUS_CONFIG: Record<CrossoverStatus, {
  icon: typeof AlertTriangle;
  bg: string;
  border: string;
  text: string;
  dot: string;
  label: string;
}> = {
  active: {
    icon: AlertTriangle,
    bg: 'bg-red-500/10',
    border: 'border-red-500/30',
    text: 'text-red-400',
    dot: 'bg-red-500',
    label: 'Crossover Active',
  },
  warning: {
    icon: AlertCircle,
    bg: 'bg-amber-500/10',
    border: 'border-amber-500/30',
    text: 'text-amber-400',
    dot: 'bg-amber-500',
    label: 'Crossover Warning',
  },
  controlled: {
    icon: CheckCircle,
    bg: 'bg-emerald-500/10',
    border: 'border-emerald-500/30',
    text: 'text-emerald-400',
    dot: 'bg-emerald-500',
    label: 'Developer Controls',
  },
  insufficient: {
    icon: HelpCircle,
    bg: 'bg-charcoal-800/50',
    border: 'border-charcoal-700',
    text: 'text-charcoal-500',
    dot: 'bg-charcoal-600',
    label: 'Insufficient Data',
  },
};

// ─── Analysis Logic ─────────────────────────────────────────────────────────

function analyzeCrossover(dev: DevelopmentSummary): CrossoverAnalysis {
  let developerPsf: number | null = dev.avgPsf ?? null;
  let resalePsf: number | null = null;

  // Try to get real MLS / tail data
  const fullDev = getDevelopment(dev.slug);
  const profile = getDevelopmentProfile(dev.slug);

  if (fullDev?.tailInventory) {
    const tail = fullDev.tailInventory;
    if (tail.developerAskingPsf) developerPsf = tail.developerAskingPsf;
    if (tail.resaleAskingPsf) resalePsf = tail.resaleAskingPsf;
  }

  if (profile?.mlsSummary) {
    const mls = profile.mlsSummary;
    if (mls.avgActivePsf) resalePsf = mls.avgActivePsf;
    else if (mls.avgSoldPsf) resalePsf = mls.avgSoldPsf;
  }

  // No resale data
  if (resalePsf === null || developerPsf === null) {
    return {
      name: dev.name,
      slug: dev.slug,
      status: 'insufficient',
      developerPsf,
      resalePsf,
      spreadPercent: null,
      label: 'Insufficient Data',
      description: 'No MLS resale data available for comparison.',
    };
  }

  const spreadPercent = ((resalePsf - developerPsf) / developerPsf) * 100;

  if (spreadPercent < 0) {
    return {
      name: dev.name,
      slug: dev.slug,
      status: 'active',
      developerPsf,
      resalePsf,
      spreadPercent,
      label: 'Crossover Active',
      description: `Resale pricing undercuts developer by ${Math.abs(spreadPercent).toFixed(1)}%. Buyers can find lower prices on the secondary market.`,
    };
  }

  if (spreadPercent < 10) {
    return {
      name: dev.name,
      slug: dev.slug,
      status: 'warning',
      developerPsf,
      resalePsf,
      spreadPercent,
      label: 'Crossover Warning',
      description: `Resale pricing within ${spreadPercent.toFixed(1)}% of developer ask. Crossover risk is elevated.`,
    };
  }

  return {
    name: dev.name,
    slug: dev.slug,
    status: 'controlled',
    developerPsf,
    resalePsf,
    spreadPercent,
    label: 'Developer Controls Narrative',
    description: `Developer pricing holds ${spreadPercent.toFixed(1)}% premium over resale. Market narrative intact.`,
  };
}

// ─── Component ──────────────────────────────────────────────────────────────

export default function ResaleCrossover({ data }: ResaleCrossoverProps) {
  const filtered = data?.filtered ?? [];
  const geoLabel = data?.geoLabel ?? 'Tampa Bay';

  const eligible = useMemo(
    () => filtered.filter((d) => d.status === 'delivered'),
    [filtered],
  );

  const analyses = useMemo(
    () => eligible.map(analyzeCrossover),
    [eligible],
  );

  if (analyses.length === 0) return null;

  // Count by status
  const counts = useMemo(() => {
    const c: Record<CrossoverStatus, number> = { active: 0, warning: 0, controlled: 0, insufficient: 0 };
    for (const a of analyses) c[a.status]++;
    return c;
  }, [analyses]);

  return (
    <section className="section-padding bg-charcoal-950">
      <div className="container-luxury">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          variants={fadeUp}
        >
          {/* Header */}
          <div className="mb-8">
            <p className="text-xs font-body font-semibold uppercase tracking-[0.3em] text-gold-500 mb-2">
              Pipeline Intelligence
            </p>
            <h2 className="text-2xl md:text-3xl font-heading font-bold text-ivory-50 mb-3">
              Resale Crossover Monitor — {geoLabel}
            </h2>
            <p className="text-sm font-body text-charcoal-400 max-w-3xl leading-relaxed">
              When resale pricing undercuts the developer, buyers gain negotiating leverage.
              This monitor tracks the spread between developer ask prices and active resale listings
              for delivered and delivering buildings.
            </p>
          </div>

          {/* Summary Pills */}
          <div className="flex flex-wrap gap-3 mb-8">
            {counts.active > 0 && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-red-500/10 border border-red-500/30 text-xs font-body font-medium text-red-400">
                <span className="h-2 w-2 rounded-full bg-red-500" />
                {counts.active} Crossover Active
              </span>
            )}
            {counts.warning > 0 && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-xs font-body font-medium text-amber-400">
                <span className="h-2 w-2 rounded-full bg-amber-500" />
                {counts.warning} Warning
              </span>
            )}
            {counts.controlled > 0 && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-xs font-body font-medium text-emerald-400">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                {counts.controlled} Controlled
              </span>
            )}
            {counts.insufficient > 0 && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-charcoal-800/50 border border-charcoal-700 text-xs font-body font-medium text-charcoal-500">
                <span className="h-2 w-2 rounded-full bg-charcoal-600" />
                {counts.insufficient} No Data
              </span>
            )}
          </div>

          {/* Cards */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={defaultViewport}
            className="grid gap-4 md:grid-cols-2 lg:grid-cols-3"
          >
            {analyses.map((a) => {
              const config = STATUS_CONFIG[a.status];
              const Icon = config.icon;

              return (
                <motion.div
                  key={a.slug}
                  variants={staggerItem}
                  className={`rounded-xl border p-5 ${config.bg} ${config.border}`}
                >
                  {/* Status Indicator */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Icon className={`w-4 h-4 ${config.text}`} />
                      <span className={`text-[11px] font-body font-semibold uppercase tracking-wide ${config.text}`}>
                        {config.label}
                      </span>
                    </div>
                    <span className={`h-3 w-3 rounded-full ${config.dot} ${a.status === 'active' ? 'animate-pulse' : ''}`} />
                  </div>

                  {/* Name */}
                  <h3 className="text-sm font-body font-semibold text-ivory-100 mb-2">
                    {a.name}
                  </h3>

                  {/* PSF Comparison */}
                  {a.developerPsf !== null && (
                    <div className="space-y-1 mb-3">
                      <div className="flex items-center justify-between text-[11px] font-body">
                        <span className="text-charcoal-500">Developer Ask</span>
                        <span className="text-ivory-200 font-semibold">${a.developerPsf.toLocaleString()}/SF</span>
                      </div>
                      {a.resalePsf !== null && (
                        <div className="flex items-center justify-between text-[11px] font-body">
                          <span className="text-charcoal-500">Resale Ask</span>
                          <span className={`font-semibold ${a.status === 'active' ? 'text-red-400' : a.status === 'warning' ? 'text-amber-400' : 'text-ivory-200'}`}>
                            ${a.resalePsf.toLocaleString()}/SF
                          </span>
                        </div>
                      )}
                      {a.spreadPercent !== null && (
                        <div className="flex items-center justify-between text-[11px] font-body pt-1 border-t border-charcoal-800">
                          <span className="text-charcoal-500">Spread</span>
                          <span className={`font-semibold ${a.spreadPercent < 0 ? 'text-red-400' : a.spreadPercent < 10 ? 'text-amber-400' : 'text-emerald-400'}`}>
                            {a.spreadPercent > 0 ? '+' : ''}{a.spreadPercent.toFixed(1)}%
                          </span>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Description */}
                  <p className="text-[11px] font-body text-charcoal-500 leading-relaxed">
                    {a.description}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
