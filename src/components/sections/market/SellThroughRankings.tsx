'use client';

import { useMemo } from 'react';
import { motion } from 'framer-motion';
import AnimatedBar from '@/components/ui/AnimatedBar';
import AnimatedCounter from '@/components/ui/AnimatedCounter';
import { fadeUp, defaultViewport } from '@/lib/animations';
import type { MarketData } from '@/hooks/useMarketData';

interface Props {
  data?: MarketData;
}

export default function SellThroughRankings({ data }: Props) {
  const chartData = useMemo(() => {
    if (!data) return [];
    return data.filtered
      .filter((d) => d.soldPercent != null && d.soldPercent > 0)
      .sort((a, b) => (b.soldPercent ?? 0) - (a.soldPercent ?? 0))
      .map((d) => ({
        name: d.name,
        soldPercent: d.soldPercent ?? 0,
      }));
  }, [data]);

  if (chartData.length === 0) return null;

  const maxPct = Math.max(...chartData.map((d) => d.soldPercent), 100);

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
            Absorption
          </p>
          <h2 className="text-2xl md:text-3xl font-heading font-bold text-ivory-50 mb-2">
            Sell-Through Rankings — {data?.geoLabel}
          </h2>
          <div className="w-16 h-0.5 bg-gradient-to-r from-gold-500 to-gold-700 mb-6" />
          <p className="text-sm font-body text-charcoal-400 mb-10 max-w-2xl">
            Percentage of total units sold or under contract per development. Higher sell-through indicates stronger buyer demand relative to supply.
          </p>

          <div className="rounded-xl border border-charcoal-800 bg-charcoal-900/80 backdrop-blur-sm p-6 md:p-8">
            {chartData.map((entry, index) => {
              const tier =
                entry.soldPercent >= 75 ? 'from-gold-500 to-gold-300' :
                entry.soldPercent >= 50 ? 'from-gold-600 to-gold-500' :
                'from-charcoal-500 to-charcoal-400';

              return (
                <div key={entry.name} className="mb-5 last:mb-0">
                  <div className="flex items-baseline justify-between mb-1.5">
                    <span className="text-sm font-body font-semibold text-ivory-100">{entry.name}</span>
                    <AnimatedCounter
                      value={entry.soldPercent}
                      suffix="%"
                      decimals={1}
                      duration={1.8}
                      className="text-sm font-heading font-bold text-gold-500"
                    />
                  </div>
                  <div className="w-full bg-charcoal-800/60 rounded-full overflow-hidden h-3">
                    <motion.div
                      className={`h-3 rounded-full bg-gradient-to-r ${tier}`}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${(entry.soldPercent / maxPct) * 100}%` }}
                      viewport={{ once: true, margin: '-50px' }}
                      transition={{ duration: 1.2, delay: index * 0.08 + 0.3, ease: [0.22, 1, 0.36, 1] }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Narrative */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-6 rounded-xl border border-charcoal-800 bg-charcoal-900/60 backdrop-blur-sm p-5"
          >
            <p className="text-sm font-body leading-relaxed text-charcoal-300">
              {chartData[0] && (
                <>
                  <span className="text-ivory-50 font-semibold">{chartData[0].name}</span> leads sell-through at{' '}
                  <span className="text-gold-400 font-semibold">{chartData[0].soldPercent.toFixed(1)}%</span>.
                </>
              )}{' '}
              Buildings above 75% are in their final absorption phase, while those below 50% indicate early-stage sales or slower market reception.
            </p>
          </motion.div>

          <p className="mt-4 text-xs font-body text-charcoal-500">
            Source: Stellar MLS, developer disclosures, county records. Sold % includes closed + under-contract units.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
