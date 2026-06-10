'use client';

import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { fadeUp, defaultViewport, staggerContainer } from '@/lib/animations';
import type { MarketData } from '@/hooks/useMarketData';

interface AbsorptionAnalysisProps {
  data?: MarketData;
}

interface ChartRow {
  year: string;
  delivered: number;
  cumulativeSupply: number;
  cumulativeAbsorption: number;
  surplus: number;
}

const ABSORPTION_PER_YEAR = 192; // 16/mo x 12

export default function AbsorptionAnalysis({ data }: AbsorptionAnalysisProps) {
  const geoLabel = data?.geoLabel ?? 'Tampa Bay';
  const forecast = data?.deliveryForecast ?? [];
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const chartData = useMemo(() => {
    const numericYears = forecast
      .filter((f) => f.year !== 'TBD')
      .sort((a, b) => a.year.localeCompare(b.year));

    if (numericYears.length === 0) return [];

    let cumulativeSupply = 0;
    const firstYear = parseInt(numericYears[0].year);

    return numericYears.map((f) => {
      cumulativeSupply += f.units;
      const yearDiff = parseInt(f.year) - firstYear + 1;
      const cumulativeAbsorption = ABSORPTION_PER_YEAR * yearDiff;

      return {
        year: f.year,
        delivered: f.units,
        cumulativeSupply,
        cumulativeAbsorption,
        surplus: cumulativeSupply - cumulativeAbsorption,
      } as ChartRow;
    });
  }, [forecast]);

  const hasOversupply = chartData.some((d) => d.surplus > 0);
  const equilibriumYear = chartData.find((d) => d.surplus >= 0)?.year;

  // Calculate scale factors
  const maxDelivered = Math.max(...chartData.map((d) => d.delivered), 1);
  const maxCumulative = Math.max(
    ...chartData.map((d) => Math.max(d.cumulativeSupply, d.cumulativeAbsorption)),
    1
  );

  return (
    <section className="py-16 bg-charcoal-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          variants={fadeUp}
        >
          <p className="text-xs font-body font-semibold uppercase tracking-[0.25em] text-gold-500 mb-3">
            Absorption Intelligence
          </p>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-ivory-50">
            Supply vs. Absorption Analysis &mdash; {geoLabel}
          </h2>
        </motion.div>

        <motion.div
          className="rounded-2xl border border-charcoal-800 bg-charcoal-900/80 p-6 backdrop-blur-sm"
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          variants={fadeUp}
        >
          {chartData.length > 0 ? (
            <div className="space-y-1">
              {/* Column headers */}
              <div className="grid grid-cols-[72px_1fr_200px] md:grid-cols-[80px_1fr_280px] items-center gap-3 mb-3 px-1">
                <span className="text-xs font-body font-semibold text-charcoal-400 uppercase tracking-wider">Year</span>
                <span className="text-xs font-body font-semibold text-charcoal-400 uppercase tracking-wider">Units Delivered</span>
                <span className="text-xs font-body font-semibold text-charcoal-400 uppercase tracking-wider text-right hidden md:block">
                  Cumulative Supply vs. Absorption
                </span>
              </div>

              <motion.div
                className="space-y-2"
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={defaultViewport}
              >
                {chartData.map((row, i) => {
                  const barPercent = (row.delivered / maxDelivered) * 100;
                  const supplyPercent = (row.cumulativeSupply / maxCumulative) * 100;
                  const absorbPercent = (row.cumulativeAbsorption / maxCumulative) * 100;
                  const isHovered = hoveredIndex === i;
                  const isOversupply = row.surplus > 0;

                  return (
                    <motion.div
                      key={row.year}
                      className="group grid grid-cols-[72px_1fr_200px] md:grid-cols-[80px_1fr_280px] items-center gap-3 rounded-lg px-1 py-2 transition-colors hover:bg-charcoal-800/40"
                      variants={{
                        hidden: { opacity: 0, x: -20 },
                        visible: {
                          opacity: 1,
                          x: 0,
                          transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
                        },
                      }}
                      onMouseEnter={() => setHoveredIndex(i)}
                      onMouseLeave={() => setHoveredIndex(null)}
                    >
                      {/* Year label */}
                      <span className="text-sm md:text-base font-heading font-bold text-ivory-100 tabular-nums">
                        {row.year}
                      </span>

                      {/* Delivered bar */}
                      <div className="relative h-10 flex items-center">
                        <div className="relative w-full h-8 rounded-md bg-charcoal-800/60 overflow-hidden">
                          <motion.div
                            className="absolute inset-y-0 left-0 rounded-md"
                            style={{
                              background: isOversupply
                                ? 'linear-gradient(90deg, #d4a853 0%, #b8860b 100%)'
                                : 'linear-gradient(90deg, #d4a853 0%, #e6c47a 100%)',
                            }}
                            initial={{ width: 0 }}
                            whileInView={{ width: `${barPercent}%` }}
                            viewport={{ once: true, margin: '-40px' }}
                            transition={{
                              duration: 1.2,
                              ease: [0.25, 0.46, 0.45, 0.94],
                              delay: i * 0.15,
                            }}
                          />
                          {/* Unit count label inside bar */}
                          <motion.span
                            className="absolute inset-y-0 flex items-center text-xs font-body font-bold tabular-nums"
                            style={{
                              left: `${Math.min(barPercent, 92)}%`,
                              color: barPercent > 30 ? '#1a1a2e' : '#faf8f5',
                              paddingLeft: barPercent > 30 ? 0 : '8px',
                              transform: barPercent > 30 ? 'translateX(-100%)' : 'none',
                              paddingRight: barPercent > 30 ? '8px' : 0,
                            }}
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: i * 0.15 + 0.8 }}
                          >
                            {row.delivered.toLocaleString()} units
                          </motion.span>
                        </div>

                        {/* Oversupply warning marker */}
                        {isOversupply && (
                          <motion.div
                            className="absolute -right-0.5 top-0 h-full flex items-center"
                            initial={{ opacity: 0, scale: 0.5 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.3, delay: i * 0.15 + 1.0 }}
                          >
                            <span className="inline-block h-2 w-2 rounded-full bg-red-500 ring-2 ring-red-500/20" />
                          </motion.div>
                        )}
                      </div>

                      {/* Cumulative supply vs absorption */}
                      <div className="hidden md:block space-y-1.5">
                        {/* Supply bar */}
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-body text-charcoal-500 w-8 text-right shrink-0">S</span>
                          <div className="relative flex-1 h-2.5 rounded-full bg-charcoal-800/60 overflow-hidden">
                            <motion.div
                              className="absolute inset-y-0 left-0 rounded-full bg-amber-500"
                              initial={{ width: 0 }}
                              whileInView={{ width: `${supplyPercent}%` }}
                              viewport={{ once: true, margin: '-40px' }}
                              transition={{
                                duration: 1.0,
                                ease: [0.25, 0.46, 0.45, 0.94],
                                delay: i * 0.15 + 0.3,
                              }}
                            />
                          </div>
                          <span className="text-[10px] font-body text-charcoal-400 tabular-nums w-10 text-right shrink-0">
                            {row.cumulativeSupply.toLocaleString()}
                          </span>
                        </div>
                        {/* Absorption bar */}
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-body text-charcoal-500 w-8 text-right shrink-0">A</span>
                          <div className="relative flex-1 h-2.5 rounded-full bg-charcoal-800/60 overflow-hidden">
                            <motion.div
                              className="absolute inset-y-0 left-0 rounded-full bg-emerald-500"
                              initial={{ width: 0 }}
                              whileInView={{ width: `${absorbPercent}%` }}
                              viewport={{ once: true, margin: '-40px' }}
                              transition={{
                                duration: 1.0,
                                ease: [0.25, 0.46, 0.45, 0.94],
                                delay: i * 0.15 + 0.4,
                              }}
                            />
                          </div>
                          <span className="text-[10px] font-body text-charcoal-400 tabular-nums w-10 text-right shrink-0">
                            {row.cumulativeAbsorption.toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>

              {/* Hover detail card */}
              {hoveredIndex !== null && chartData[hoveredIndex] && (
                <motion.div
                  className="mt-4 rounded-lg border border-charcoal-700 bg-charcoal-800/90 backdrop-blur-sm px-5 py-3 flex flex-wrap items-center gap-x-6 gap-y-2"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <span className="text-sm font-heading font-bold text-ivory-50">
                    {chartData[hoveredIndex].year}
                  </span>
                  <span className="text-xs font-body text-charcoal-300">
                    Delivered: <span className="text-ivory-200 font-semibold">{chartData[hoveredIndex].delivered.toLocaleString()}</span>
                  </span>
                  <span className="text-xs font-body text-charcoal-300">
                    Cumulative Supply: <span className="text-amber-400 font-semibold">{chartData[hoveredIndex].cumulativeSupply.toLocaleString()}</span>
                  </span>
                  <span className="text-xs font-body text-charcoal-300">
                    Cumulative Absorption: <span className="text-emerald-400 font-semibold">{chartData[hoveredIndex].cumulativeAbsorption.toLocaleString()}</span>
                  </span>
                  <span className={`text-xs font-body font-semibold ${chartData[hoveredIndex].surplus > 0 ? 'text-red-400' : 'text-emerald-400'}`}>
                    {chartData[hoveredIndex].surplus > 0 ? '+' : ''}{chartData[hoveredIndex].surplus.toLocaleString()} surplus
                  </span>
                </motion.div>
              )}

              {/* Equilibrium callout */}
              {equilibriumYear && (
                <motion.div
                  className="mt-4 flex items-center gap-3 rounded-lg border border-red-500/20 bg-red-500/5 px-4 py-2.5"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: chartData.length * 0.15 + 0.5 }}
                >
                  <span className="inline-block h-2 w-2 rounded-full bg-red-500 animate-pulse" />
                  <p className="text-xs font-body text-red-300">
                    Supply overtakes absorption capacity in <span className="font-bold text-red-200">{equilibriumYear}</span> — potential oversupply territory.
                  </p>
                </motion.div>
              )}
            </div>
          ) : (
            <div className="flex items-center justify-center h-48 text-charcoal-500 font-body text-sm">
              No delivery forecast data available for this filter.
            </div>
          )}

          {/* Legend */}
          <div className="flex flex-wrap items-center gap-5 mt-4 pt-4 border-t border-charcoal-800">
            <span className="flex items-center gap-1.5 text-xs font-body text-charcoal-400">
              <span className="inline-block h-3 w-6 rounded bg-gold-500" />
              Units Delivered (annual)
            </span>
            <span className="flex items-center gap-1.5 text-xs font-body text-charcoal-400">
              <span className="inline-block h-2.5 w-6 rounded-full bg-amber-500" />
              Cumulative Supply
            </span>
            <span className="flex items-center gap-1.5 text-xs font-body text-charcoal-400">
              <span className="inline-block h-2.5 w-6 rounded-full bg-emerald-500" />
              Cumulative Absorption (~192/yr)
            </span>
            {hasOversupply && (
              <span className="flex items-center gap-1.5 text-xs font-body text-charcoal-400">
                <span className="inline-block h-2 w-2 rounded-full bg-red-500" />
                Oversupply
              </span>
            )}
          </div>

          {/* Narrative */}
          <div className="mt-5 pt-5 border-t border-charcoal-800">
            <p className="text-sm font-body leading-relaxed text-charcoal-400">
              When cumulative deliveries exceed cumulative absorption capacity, the market enters
              oversupply territory. The absorption baseline of ~192 units/year reflects Pinellas&apos;
              trailing rate of ~16 contracts per month.{' '}
              {hasOversupply
                ? 'The chart indicates periods where scheduled supply may outpace absorption — developers in the pipeline should monitor velocity closely and consider phased release strategies.'
                : 'Current projections suggest absorption capacity can keep pace with scheduled deliveries, though delivery clustering in any single year warrants monitoring.'}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
