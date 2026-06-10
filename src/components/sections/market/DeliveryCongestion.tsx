'use client';

import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle } from 'lucide-react';
import { fadeUp, staggerContainer, staggerItem, defaultViewport } from '@/lib/animations';
import { computeCongestionScores, CONGESTION_COLORS, CONGESTION_LABELS, CongestionResult } from '@/lib/congestion';
import type { MarketData } from '@/hooks/useMarketData';

interface DeliveryCongestionProps {
  data?: MarketData;
}

export default function DeliveryCongestion({ data }: DeliveryCongestionProps) {
  const scores = useMemo(() => {
    if (!data) return [];
    return computeCongestionScores(data.filtered);
  }, [data]);

  if (!data || scores.length === 0) return null;

  const geoLabel = data.geoLabel;
  const elevatedOrCrowded = scores.filter((s) => s.level === 'elevated' || s.level === 'crowded');

  return (
    <section className="section-padding bg-charcoal-950">
      <div className="container-luxury">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          className="mb-10"
        >
          <p className="font-body text-xs uppercase tracking-[0.25em] text-gold-500 mb-2">
            Supply Pressure
          </p>
          <h2 className="font-heading text-3xl md:text-4xl text-ivory-50 mb-3">
            Delivery Congestion — {geoLabel}
          </h2>
          <p className="font-body text-charcoal-400 max-w-2xl">
            How crowded each project&apos;s delivery window is, weighted by price tier overlap and
            submarket proximity. Higher scores indicate more competitive pressure at delivery.
          </p>
        </motion.div>

        {/* Chart */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          className="bg-charcoal-900/60 rounded-xl border border-charcoal-700/50 p-6 mb-8"
        >
          {/* Horizontal bar rows */}
          <div className="space-y-2.5">
            {scores.map((item, i) => {
              const color = CONGESTION_COLORS[item.level];
              const label = item.name.length > 22 ? item.name.slice(0, 20) + '...' : item.name;

              return (
                <div key={item.slug} className="flex items-center gap-3">
                  {/* Project name */}
                  <div className="w-[140px] sm:w-[160px] shrink-0 text-right">
                    <span className="text-[11px] sm:text-xs font-body text-charcoal-300 leading-tight">
                      {label}
                    </span>
                  </div>

                  {/* Bar track */}
                  <div className="flex-1 relative h-6 bg-charcoal-800/50 rounded overflow-hidden">
                    <motion.div
                      className="absolute inset-y-0 left-0 rounded"
                      style={{
                        background: `linear-gradient(to right, ${color}cc, ${color})`,
                      }}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${item.score}%` }}
                      viewport={defaultViewport}
                      transition={{
                        duration: 0.8,
                        delay: 0.15 + i * 0.06,
                        ease: [0.25, 0.46, 0.45, 0.94],
                      }}
                    >
                      {/* Inner shimmer */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                    </motion.div>
                  </div>

                  {/* Score label */}
                  <motion.span
                    className="w-9 shrink-0 text-right text-xs font-body font-semibold"
                    style={{ color }}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={defaultViewport}
                    transition={{ duration: 0.3, delay: 0.6 + i * 0.06 }}
                  >
                    {item.score}
                  </motion.span>
                </div>
              );
            })}
          </div>

          {/* Scale markers */}
          <div className="ml-[152px] sm:ml-[172px] mr-11 flex justify-between mt-2 pt-2 border-t border-charcoal-700/30">
            {[0, 25, 50, 75, 100].map((tick) => (
              <span key={tick} className="text-[10px] font-body text-charcoal-600">
                {tick}
              </span>
            ))}
          </div>

          {/* Legend */}
          <div className="flex flex-wrap gap-4 mt-4 pt-4 border-t border-charcoal-700/30">
            {(['low', 'manageable', 'elevated', 'crowded'] as const).map((level) => (
              <div key={level} className="flex items-center gap-2">
                <span
                  className="h-2.5 w-2.5 rounded-full"
                  style={{ backgroundColor: CONGESTION_COLORS[level] }}
                />
                <span className="font-body text-xs text-charcoal-400">
                  {CONGESTION_LABELS[level]}{' '}
                  <span className="text-charcoal-500">
                    ({level === 'low' ? '<25' : level === 'manageable' ? '25-49' : level === 'elevated' ? '50-74' : '75+'})
                  </span>
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Elevated/Crowded Alert Cards */}
        {elevatedOrCrowded.length > 0 && (
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={defaultViewport}
          >
            <h3 className="font-body text-xs uppercase tracking-wider text-charcoal-400 mb-4">
              Projects Facing Delivery Pressure
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {elevatedOrCrowded.map((result: CongestionResult) => (
                <motion.div
                  key={result.slug}
                  variants={staggerItem}
                  className="rounded-xl border border-charcoal-700/50 bg-charcoal-900/60 p-5"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="font-heading text-base text-ivory-100">{result.name}</h4>
                      <p className="font-body text-xs text-charcoal-400 mt-0.5">
                        Delivery: {result.delivery}
                      </p>
                    </div>
                    <span
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-body font-semibold uppercase tracking-wider"
                      style={{
                        backgroundColor: `${CONGESTION_COLORS[result.level]}15`,
                        color: CONGESTION_COLORS[result.level],
                        border: `1px solid ${CONGESTION_COLORS[result.level]}40`,
                      }}
                    >
                      <AlertTriangle className="h-3 w-3" />
                      {CONGESTION_LABELS[result.level]}
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <span className="block font-body text-[10px] uppercase tracking-wider text-charcoal-500">
                        Score
                      </span>
                      <span className="font-body text-lg font-semibold text-ivory-200">
                        {result.score}
                      </span>
                    </div>
                    <div>
                      <span className="block font-body text-[10px] uppercase tracking-wider text-charcoal-500">
                        Competing Units
                      </span>
                      <span className="font-body text-lg font-semibold text-ivory-200">
                        {result.competingUnits.toLocaleString()}
                      </span>
                    </div>
                    <div>
                      <span className="block font-body text-[10px] uppercase tracking-wider text-charcoal-500">
                        Competing Projects
                      </span>
                      <span className="font-body text-lg font-semibold text-ivory-200">
                        {result.competingDevs}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        <p className="font-body text-[10px] text-charcoal-600 mt-6 italic">
          Congestion score weights: same price tier (PSF within 30%) = 2x, same submarket = 2x, same county = 1.5x.
          Scale: 1,000 weighted competing units = 100.
        </p>
      </div>
    </section>
  );
}
