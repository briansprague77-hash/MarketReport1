'use client';

import { useMemo } from 'react';
import { motion } from 'framer-motion';
import AnimatedCounter from '@/components/ui/AnimatedCounter';
import AnimatedRing from '@/components/ui/AnimatedRing';
import { fadeUp, defaultViewport } from '@/lib/animations';
import type { MarketData } from '@/hooks/useMarketData';

interface Props {
  data?: MarketData;
}

function avg(nums: number[]): number {
  if (nums.length === 0) return 0;
  return nums.reduce((s, n) => s + n, 0) / nums.length;
}

export default function BrandedComparison({ data }: Props) {
  const metrics = useMemo(() => {
    if (!data) return null;

    const branded = data.filtered.filter((d) => d.tags?.includes('Branded Residence'));
    const independent = data.filtered.filter((d) => !d.tags?.includes('Branded Residence'));

    if (branded.length === 0 || independent.length === 0) return null;

    const brandedPsf = avg(branded.filter((d) => d.avgPsf).map((d) => d.avgPsf!));
    const independentPsf = avg(independent.filter((d) => d.avgPsf).map((d) => d.avgPsf!));

    const brandedUnits = avg(branded.map((d) => d.units));
    const independentUnits = avg(independent.map((d) => d.units));

    const brandedHoa = avg(branded.filter((d) => d.hoaPerSqFt).map((d) => d.hoaPerSqFt!));
    const independentHoa = avg(independent.filter((d) => d.hoaPerSqFt).map((d) => d.hoaPerSqFt!));

    const psfPremium = independentPsf > 0 ? Math.round(((brandedPsf - independentPsf) / independentPsf) * 100) : 0;

    return {
      brandedCount: branded.length,
      independentCount: independent.length,
      brandedPsf: Math.round(brandedPsf),
      independentPsf: Math.round(independentPsf),
      brandedUnits: Math.round(brandedUnits),
      independentUnits: Math.round(independentUnits),
      brandedHoa: brandedHoa,
      independentHoa: independentHoa,
      psfPremium,
    };
  }, [data]);

  if (!metrics) return null;

  return (
    <section className="py-16 bg-charcoal-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          variants={fadeUp}
          className="mb-10"
        >
          <p className="text-xs font-body font-semibold uppercase tracking-[0.25em] text-gold-500 mb-3">
            Brand Premium
          </p>
          <h2 className="text-2xl md:text-3xl font-heading font-bold text-ivory-50 mb-2">
            Branded vs Independent — The Premium
          </h2>
          <div className="w-16 h-0.5 bg-gradient-to-r from-gold-500 to-gold-700 mb-6" />
          <p className="text-sm font-body text-charcoal-400 max-w-2xl">
            Side-by-side comparison of {metrics.brandedCount} branded residence{metrics.brandedCount !== 1 ? 's' : ''} vs {metrics.independentCount} independent development{metrics.independentCount !== 1 ? 's' : ''} across key metrics.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-6 lg:gap-4 items-center">
          {/* Branded Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="rounded-xl border-2 border-gold-500/40 bg-charcoal-900/80 backdrop-blur-sm p-8"
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="h-4 w-4 rounded-full bg-gold-500" />
              <h3 className="text-lg font-heading font-bold text-gold-400 uppercase tracking-wider">
                Branded
              </h3>
              <span className="ml-auto text-xs font-body text-charcoal-500">{metrics.brandedCount} developments</span>
            </div>

            <div className="space-y-6">
              <div>
                <p className="text-xs font-body font-semibold uppercase tracking-wider text-charcoal-400 mb-1">Avg PSF</p>
                <AnimatedCounter
                  value={metrics.brandedPsf}
                  prefix="$"
                  duration={2}
                  className="text-3xl font-heading font-bold text-gold-400"
                />
              </div>
              <div>
                <p className="text-xs font-body font-semibold uppercase tracking-wider text-charcoal-400 mb-1">Avg Units</p>
                <AnimatedCounter
                  value={metrics.brandedUnits}
                  duration={2}
                  className="text-3xl font-heading font-bold text-ivory-100"
                />
              </div>
              <div>
                <p className="text-xs font-body font-semibold uppercase tracking-wider text-charcoal-400 mb-1">Avg HOA</p>
                {metrics.brandedHoa > 0 ? (
                  <AnimatedCounter
                    value={metrics.brandedHoa}
                    prefix="$"
                    suffix="/SF"
                    decimals={2}
                    duration={2}
                    className="text-3xl font-heading font-bold text-ivory-100"
                  />
                ) : (
                  <span className="text-3xl font-heading font-bold text-charcoal-500">N/A</span>
                )}
              </div>
            </div>
          </motion.div>

          {/* Center Ring */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex justify-center py-4 lg:py-0"
          >
            <AnimatedRing
              value={Math.min(Math.abs(metrics.psfPremium), 100)}
              size={140}
              strokeWidth={10}
              color="#C9A84C"
              label="Premium"
              sublabel={`${metrics.psfPremium >= 0 ? '+' : ''}${metrics.psfPremium}% PSF`}
            />
          </motion.div>

          {/* Independent Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="rounded-xl border-2 border-charcoal-700/60 bg-charcoal-900/80 backdrop-blur-sm p-8"
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="h-4 w-4 rounded-full bg-charcoal-500" />
              <h3 className="text-lg font-heading font-bold text-charcoal-300 uppercase tracking-wider">
                Independent
              </h3>
              <span className="ml-auto text-xs font-body text-charcoal-500">{metrics.independentCount} developments</span>
            </div>

            <div className="space-y-6">
              <div>
                <p className="text-xs font-body font-semibold uppercase tracking-wider text-charcoal-400 mb-1">Avg PSF</p>
                <AnimatedCounter
                  value={metrics.independentPsf}
                  prefix="$"
                  duration={2}
                  className="text-3xl font-heading font-bold text-ivory-200"
                />
              </div>
              <div>
                <p className="text-xs font-body font-semibold uppercase tracking-wider text-charcoal-400 mb-1">Avg Units</p>
                <AnimatedCounter
                  value={metrics.independentUnits}
                  duration={2}
                  className="text-3xl font-heading font-bold text-ivory-200"
                />
              </div>
              <div>
                <p className="text-xs font-body font-semibold uppercase tracking-wider text-charcoal-400 mb-1">Avg HOA</p>
                {metrics.independentHoa > 0 ? (
                  <AnimatedCounter
                    value={metrics.independentHoa}
                    prefix="$"
                    suffix="/SF"
                    decimals={2}
                    duration={2}
                    className="text-3xl font-heading font-bold text-ivory-200"
                  />
                ) : (
                  <span className="text-3xl font-heading font-bold text-charcoal-500">N/A</span>
                )}
              </div>
            </div>
          </motion.div>
        </div>

        <p className="mt-6 text-xs font-body text-charcoal-500">
          Branded Residence = hospitality-branded with hotel-caliber services. Averages weighted equally per development.
        </p>
      </div>
    </section>
  );
}
