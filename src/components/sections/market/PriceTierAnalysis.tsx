'use client';

import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { fadeUp, defaultViewport, staggerContainer, staggerItem } from '@/lib/animations';
import type { MarketData } from '@/hooks/useMarketData';
import AnimatedCounter from '@/components/ui/AnimatedCounter';
import AnimatedRing from '@/components/ui/AnimatedRing';

interface PriceTierAnalysisProps {
  data?: MarketData;
}

const TIER_CONFIG = [
  {
    tag: 'Tier 1 Luxury',
    label: 'Tier 1 Luxury',
    range: 'Hospitality-branded ultra-luxury',
    color: '#C9A84C',
    accent: 'border-l-gold-500',
    glow: 'shadow-gold-500/10',
  },
  {
    tag: 'Tier 2 Luxury',
    label: 'Tier 2 Luxury',
    range: 'Premium positioning',
    color: '#3B82F6',
    accent: 'border-l-blue-500',
    glow: 'shadow-blue-500/10',
  },
  {
    tag: 'Tier 3 Luxury',
    label: 'Tier 3 Luxury',
    range: 'Attainable luxury',
    color: '#0D9668',
    accent: 'border-l-emerald-500',
    glow: 'shadow-emerald-500/10',
  },
];

export default function PriceTierAnalysis({ data }: PriceTierAnalysisProps) {
  const geoLabel = data?.geoLabel ?? 'Tampa Bay';
  const filtered = data?.filtered ?? [];

  // Group by Tier tag
  const tierData = useMemo(() => {
    return TIER_CONFIG.map((tier) => {
      const buildings = filtered.filter((d) => d.tags?.includes(tier.tag));
      const units = buildings.reduce((s, d) => s + d.units, 0);
      const names = buildings.map((d) => d.name);
      const withPsf = buildings.filter((d) => (d.resalePsf ?? d.developerClosePsf ?? d.avgPsf ?? 0) > 0);
      const psfValues = withPsf.map((d) => d.resalePsf ?? d.developerClosePsf ?? d.avgPsf ?? 0);
      const minPsf = psfValues.length > 0 ? Math.min(...psfValues) : 0;
      const maxPsf = psfValues.length > 0 ? Math.max(...psfValues) : 0;
      const avgPsf = psfValues.length > 0 ? Math.round(psfValues.reduce((s, v) => s + v, 0) / psfValues.length) : 0;
      return { ...tier, buildings: names, units, count: buildings.length, minPsf, maxPsf, avgPsf };
    });
  }, [filtered]);

  const totalUnits = tierData.reduce((s, t) => s + t.units, 0);
  const maxTierUnits = Math.max(...tierData.map((t) => t.units));

  // Untagged buildings
  const untaggedCount = filtered.filter((d) => !d.tags?.some((t) => t.startsWith('Tier'))).length;

  return (
    <section className="py-16 bg-ivory-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          variants={fadeUp}
        >
          <p className="text-xs font-body font-semibold uppercase tracking-[0.25em] text-charcoal-400 mb-3">
            Market Segmentation
          </p>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-charcoal-950">
            Luxury Tier Distribution &mdash; {geoLabel}
          </h2>
          <p className="mt-3 text-sm font-body text-charcoal-500">
            {tierData.reduce((s, t) => s + t.count, 0)} buildings classified across 3 tiers
            {untaggedCount > 0 && ` (${untaggedCount} unclassified)`}
          </p>
        </motion.div>

        {/* 3 Tier Cards */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          variants={staggerContainer}
        >
          {tierData.map((tier) => {
            const pct = totalUnits > 0 ? parseFloat(((tier.units / totalUnits) * 100).toFixed(1)) : 0;
            const isMax = tier.units === maxTierUnits && tier.units > 0;

            return (
              <motion.div
                key={tier.tag}
                variants={staggerItem}
                className={`
                  relative rounded-xl bg-charcoal-900 border-l-4 ${tier.accent}
                  border border-charcoal-800 p-6 md:p-8
                  shadow-lg ${tier.glow}
                `}
                style={isMax ? { boxShadow: `0 0 20px ${tier.color}22, 0 0 40px ${tier.color}11` } : undefined}
              >
                {isMax && (
                  <motion.div
                    className="absolute inset-0 rounded-xl pointer-events-none"
                    style={{ border: `1px solid ${tier.color}`, borderLeftWidth: '4px' }}
                    animate={{ opacity: [0.3, 0.7, 0.3] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                  />
                )}

                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-2xl font-heading font-bold text-ivory-50 mb-1">
                      {tier.label}
                    </h3>
                    <p className="text-sm font-body text-charcoal-400 mb-4">
                      {tier.range}
                    </p>

                    <div className="flex items-baseline gap-2 mb-1">
                      <AnimatedCounter value={tier.units} className="text-3xl font-heading font-bold text-ivory-50" duration={1.8} />
                      <span className="text-sm font-body text-charcoal-400">units</span>
                    </div>

                    <p className="text-xs font-body text-charcoal-500">
                      <AnimatedCounter value={pct} suffix="%" decimals={1} className="text-xs font-body text-charcoal-500" duration={1.8} />{' '}
                      of pipeline &middot; {tier.count} buildings
                    </p>

                    {/* PSF range */}
                    {tier.avgPsf > 0 && (
                      <div className="mt-3 pt-3 border-t border-charcoal-800">
                        <p className="text-[10px] font-body font-semibold uppercase tracking-wider text-charcoal-500 mb-1">
                          PSF Range
                        </p>
                        <p className="text-sm font-heading font-bold text-ivory-100">
                          ${tier.minPsf.toLocaleString()} – ${tier.maxPsf.toLocaleString()}/SF
                        </p>
                        <p className="text-[10px] font-body text-charcoal-500">
                          Avg ${tier.avgPsf.toLocaleString()}/SF
                        </p>
                      </div>
                    )}

                    {/* Building names */}
                    {tier.buildings.length > 0 && (
                      <div className="mt-3 pt-3 border-t border-charcoal-800">
                        <p className="text-[10px] font-body font-semibold uppercase tracking-wider text-charcoal-500 mb-1.5">
                          Buildings
                        </p>
                        <div className="flex flex-wrap gap-1.5">
                          {tier.buildings.map((name) => (
                            <span
                              key={name}
                              className="inline-block px-2 py-0.5 rounded-sm text-[10px] font-body font-medium border"
                              style={{
                                backgroundColor: `${tier.color}10`,
                                borderColor: `${tier.color}30`,
                                color: tier.color,
                              }}
                            >
                              {name}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {tier.units === 0 && (
                      <p className="mt-3 text-[10px] font-body italic text-charcoal-600">
                        No buildings in this tier for current filter
                      </p>
                    )}
                  </div>

                  <div className="flex-shrink-0">
                    <AnimatedRing value={pct} size={100} strokeWidth={7} color={tier.color} label="share" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
