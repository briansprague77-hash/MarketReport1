'use client';

import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { fadeUp, staggerContainer, staggerItem, defaultViewport } from '@/lib/animations';
import type { MarketData } from '@/hooks/useMarketData';
import type { DevelopmentSummary } from '@/data/developments';
import { getDevelopment, getDevelopmentProfile } from '@/data/developments';

interface ShadowRadarProps {
  data?: MarketData;
}

// ─── Shadow Supply Estimation ───────────────────────────────────────────────

interface ShadowEstimate {
  name: string;
  slug: string;
  totalUnits: number;
  developerRemaining: number;
  resaleActive: number;
  shadowSupply: number;
  shadowScore: number;
  status: string;
}

function estimateShadowInventory(dev: DevelopmentSummary): ShadowEstimate {
  const totalUnits = dev.units;

  // Estimate developer remaining from inventoryPressure
  let developerRemainingPct = 0.15; // default
  if (dev.inventoryPressure === 'high') developerRemainingPct = 0.30;
  else if (dev.inventoryPressure === 'medium') developerRemainingPct = 0.15;
  else if (dev.inventoryPressure === 'low') developerRemainingPct = 0.05;

  // Check for real data from development or profile
  let resaleActive = 0;
  const fullDev = getDevelopment(dev.slug);
  const profile = getDevelopmentProfile(dev.slug);

  if (fullDev?.tailInventory) {
    const tail = fullDev.tailInventory;
    developerRemainingPct = tail.developerUnitsRemaining / totalUnits;
    resaleActive = tail.resaleListings ?? 0;
  } else if (profile?.mlsSummary) {
    const mls = profile.mlsSummary;
    resaleActive = mls.resaleActiveCount ?? mls.active ?? 0;
  }

  const developerRemaining = Math.round(totalUnits * developerRemainingPct);
  const soldUnits = totalUnits - developerRemaining;
  const shadowSupply = Math.round(soldUnits * 0.12); // 12% flip estimate

  // Shadow Supply Score (0-100)
  const devRemainingScore = Math.min(40, Math.round(developerRemainingPct * 100 * 0.6));
  const resaleScore = Math.min(30, resaleActive * 5);
  const isDelivered = dev.status === 'delivered';
  const ageScore = isDelivered ? 20 : 0;
  const shadowScore = Math.min(100, devRemainingScore + resaleScore + ageScore);

  return {
    name: dev.name,
    slug: dev.slug,
    totalUnits,
    developerRemaining,
    resaleActive,
    shadowSupply,
    shadowScore,
    status: dev.status,
  };
}

// ─── Score Badge ────────────────────────────────────────────────────────────

function ScoreBadge({ score }: { score: number }) {
  let color = 'text-emerald-400 bg-emerald-500/15 border-emerald-500/30';
  let label = 'Low Risk';
  if (score > 60) {
    color = 'text-red-400 bg-red-500/15 border-red-500/30';
    label = 'High Risk';
  } else if (score > 35) {
    color = 'text-amber-400 bg-amber-500/15 border-amber-500/30';
    label = 'Moderate';
  }

  return (
    <span className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-semibold ${color}`}>
      {score}
      <span className="font-normal opacity-70">— {label}</span>
    </span>
  );
}

// ─── Component ──────────────────────────────────────────────────────────────

export default function ShadowRadar({ data }: ShadowRadarProps) {
  const filtered = data?.filtered ?? [];
  const geoLabel = data?.geoLabel ?? 'Tampa Bay';

  // Only delivered/delivering buildings
  const eligible = useMemo(
    () => filtered.filter((d) => d.status === 'delivered'),
    [filtered],
  );

  const estimates = useMemo(
    () => eligible.map(estimateShadowInventory).sort((a, b) => b.shadowScore - a.shadowScore),
    [eligible],
  );

  if (estimates.length === 0) return null;

  const maxUnits = Math.max(...estimates.map((e) => e.totalUnits));

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
              Shadow Inventory Radar — {geoLabel}
            </h2>
            <p className="text-sm font-body text-charcoal-400 max-w-3xl leading-relaxed">
              Three sources of supply compete in delivered buildings:{' '}
              <span className="text-gold-400 font-medium">developer inventory</span> (unsold units),{' '}
              <span className="text-blue-400 font-medium">active resale</span> (owner listings on MLS), and{' '}
              <span className="text-orange-400 font-medium">shadow supply</span> (early buyers likely to flip — estimated at 10-15% of sold units).
            </p>
          </div>

          {/* Stacked Bar Cards */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={defaultViewport}
            className="space-y-4"
          >
            {estimates.map((est) => {
              const totalVisible = est.developerRemaining + est.resaleActive + est.shadowSupply;
              const barWidthPct = (est.totalUnits / maxUnits) * 100;

              return (
                <motion.div
                  key={est.slug}
                  variants={staggerItem}
                  className="bg-charcoal-900 rounded-xl border border-charcoal-800 p-5"
                >
                  {/* Top Row: Name + Score */}
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h3 className="text-sm font-body font-semibold text-ivory-100">
                        {est.name}
                      </h3>
                      <p className="text-[11px] font-body text-charcoal-500">
                        {est.totalUnits} total units &middot;{' '}
                        {est.status === 'delivered' ? 'Delivered' : 'Delivering'}
                      </p>
                    </div>
                    <ScoreBadge score={est.shadowScore} />
                  </div>

                  {/* Stacked Horizontal Bar */}
                  <div className="relative mb-3" style={{ width: `${barWidthPct}%`, minWidth: '200px' }}>
                    <div className="flex h-5 rounded-full overflow-hidden bg-charcoal-800">
                      {/* Developer Remaining (Gold) */}
                      {est.developerRemaining > 0 && (
                        <div
                          className="h-full bg-gold-500"
                          style={{ width: `${(est.developerRemaining / totalVisible) * 100}%` }}
                          title={`Developer: ${est.developerRemaining} units`}
                        />
                      )}
                      {/* Resale Active (Blue) */}
                      {est.resaleActive > 0 && (
                        <div
                          className="h-full bg-blue-500"
                          style={{ width: `${(est.resaleActive / totalVisible) * 100}%` }}
                          title={`Resale: ${est.resaleActive} units`}
                        />
                      )}
                      {/* Shadow Supply (Orange, dashed effect via gradient) */}
                      {est.shadowSupply > 0 && (
                        <div
                          className="h-full"
                          style={{
                            width: `${(est.shadowSupply / totalVisible) * 100}%`,
                            background: 'repeating-linear-gradient(90deg, #F97316 0px, #F97316 4px, #1a1a2e 4px, #1a1a2e 7px)',
                          }}
                          title={`Shadow: ${est.shadowSupply} units (est.)`}
                        />
                      )}
                    </div>
                  </div>

                  {/* Labels */}
                  <div className="flex flex-wrap gap-4 text-[11px] font-body">
                    <span className="flex items-center gap-1.5 text-charcoal-400">
                      <span className="inline-block w-2.5 h-2.5 rounded-full bg-gold-500" />
                      Developer: {est.developerRemaining}
                    </span>
                    <span className="flex items-center gap-1.5 text-charcoal-400">
                      <span className="inline-block w-2.5 h-2.5 rounded-full bg-blue-500" />
                      Resale: {est.resaleActive}
                    </span>
                    <span className="flex items-center gap-1.5 text-charcoal-400">
                      <span className="inline-block w-2.5 h-2.5 rounded-full"
                        style={{ background: 'repeating-linear-gradient(90deg, #F97316 0px, #F97316 2px, transparent 2px, transparent 4px)' }}
                      />
                      Shadow: ~{est.shadowSupply} (est.)
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
