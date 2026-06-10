'use client';

import { useMemo } from 'react';
import { motion } from 'framer-motion';
import AnimatedCounter from '@/components/ui/AnimatedCounter';
import { fadeUp, defaultViewport } from '@/lib/animations';
import type { MarketData } from '@/hooks/useMarketData';

interface Props {
  data?: MarketData;
}

export default function HoaCostLadder({ data }: Props) {
  const chartData = useMemo(() => {
    if (!data) return [];
    return data.filtered
      .filter((d) => d.hoaPerSqFt != null && d.hoaPerSqFt > 0)
      .sort((a, b) => (a.hoaPerSqFt ?? 0) - (b.hoaPerSqFt ?? 0))
      .map((d) => ({
        name: d.name,
        hoaPerSqFt: d.hoaPerSqFt ?? 0,
        monthly2000: Math.round((d.hoaPerSqFt ?? 0) * 2000),
      }));
  }, [data]);

  if (chartData.length === 0) return null;

  const maxHoa = Math.max(...chartData.map((d) => d.hoaPerSqFt), 0.01);
  const lowestIdx = 0;
  const highestIdx = chartData.length - 1;

  return (
    <section className="py-16 bg-charcoal-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          variants={fadeUp}
        >
          <p className="text-xs font-body font-semibold uppercase tracking-[0.25em] text-gold-500 mb-3">
            Cost of Ownership
          </p>
          <h2 className="text-2xl md:text-3xl font-heading font-bold text-ivory-50 mb-2">
            HOA Cost of Ownership — {data?.geoLabel}
          </h2>
          <div className="w-16 h-0.5 bg-gradient-to-r from-blue-500 to-teal-400 mb-6" />
          <p className="text-sm font-body text-charcoal-400 mb-10 max-w-2xl">
            Monthly HOA rate per square foot, sorted lowest to highest. Secondary label shows estimated monthly cost for a 2,000 SF unit. HOA is a flat rate per SF across all unit types.
          </p>

          <div className="rounded-xl border border-charcoal-800 bg-charcoal-900/80 backdrop-blur-sm p-6 md:p-8">
            {chartData.map((entry, index) => {
              const isLowest = index === lowestIdx;
              const isHighest = index === highestIdx;

              return (
                <motion.div
                  key={entry.name}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                  className="mb-5 last:mb-0"
                >
                  <div className="flex items-baseline justify-between mb-1.5">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-body font-semibold text-ivory-100">{entry.name}</span>
                      {isLowest && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-body font-bold uppercase tracking-wider bg-emerald-500/15 text-emerald-400 border border-emerald-500/20">
                          Lowest
                        </span>
                      )}
                      {isHighest && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-body font-bold uppercase tracking-wider bg-red-500/15 text-red-400 border border-red-500/20">
                          Highest
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-body text-charcoal-500">${entry.hoaPerSqFt.toFixed(2)}/SF</span>
                      <AnimatedCounter
                        value={entry.monthly2000}
                        prefix="$"
                        suffix="/mo"
                        duration={1.8}
                        className="text-sm font-heading font-bold text-teal-400"
                      />
                    </div>
                  </div>
                  <div className="w-full bg-charcoal-800/60 rounded-full overflow-hidden h-3">
                    <motion.div
                      className="h-3 rounded-full bg-gradient-to-r from-blue-500 to-teal-400"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${(entry.hoaPerSqFt / maxHoa) * 100}%` }}
                      viewport={{ once: true, margin: '-50px' }}
                      transition={{ duration: 1.2, delay: index * 0.08 + 0.3, ease: [0.22, 1, 0.36, 1] }}
                    />
                  </div>
                </motion.div>
              );
            })}
          </div>

          <p className="mt-4 text-xs font-body text-charcoal-500">
            Source: Developer disclosures, MLS HOA fields, condo association budgets. Monthly estimate based on 2,000 SF reference unit.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
