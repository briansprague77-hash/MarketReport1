'use client';

import { motion } from 'framer-motion';
import { fadeUp, defaultViewport } from '@/lib/animations';
import type { MarketData } from '@/hooks/useMarketData';

interface SupplyForecastProps {
  data?: MarketData;
}

const ABSORPTION_BASELINE = 192;

export default function SupplyForecast({ data }: SupplyForecastProps) {
  const forecast = data?.deliveryForecast ?? [];
  const geoLabel = data?.geoLabel ?? 'Tampa Bay';

  const maxUnits = Math.max(...forecast.map((d) => d.units), ABSORPTION_BASELINE + 50);

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
            Delivery Pipeline
          </p>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-ivory-50">
            Supply Pipeline Forecast — {geoLabel}
          </h2>
        </motion.div>

        <motion.div
          className="rounded-2xl border border-charcoal-800 bg-charcoal-900/80 p-6 backdrop-blur-sm"
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          variants={fadeUp}
        >
          {forecast.length > 0 ? (
            <div className="relative">
              {/* Y-axis scale markers */}
              <div className="absolute left-0 top-0 bottom-8 w-12 flex flex-col justify-between text-right pr-2">
                {[maxUnits, Math.round(maxUnits * 0.75), Math.round(maxUnits * 0.5), Math.round(maxUnits * 0.25), 0].map(
                  (tick) => (
                    <span key={tick} className="text-[11px] font-body text-charcoal-500 leading-none">
                      {tick}
                    </span>
                  ),
                )}
              </div>

              {/* Chart area */}
              <div className="ml-14 relative" style={{ height: 320 }}>
                {/* Horizontal grid lines */}
                {[0, 0.25, 0.5, 0.75, 1].map((pct) => (
                  <div
                    key={pct}
                    className="absolute left-0 right-0 border-t border-charcoal-800/60"
                    style={{ bottom: `${pct * 100}%` }}
                  />
                ))}

                {/* Absorption baseline reference line */}
                <div
                  className="absolute left-0 right-0 z-10 flex items-center"
                  style={{ bottom: `${(ABSORPTION_BASELINE / maxUnits) * 100}%` }}
                >
                  <div className="flex-1 border-t-2 border-dashed border-emerald-600/70" />
                  <span className="ml-2 shrink-0 text-[10px] font-body font-semibold text-emerald-500 bg-charcoal-900/90 px-1.5 py-0.5 rounded">
                    ~192/yr absorption baseline
                  </span>
                </div>

                {/* Bars */}
                <div className="absolute inset-0 flex items-end justify-around gap-2 px-1">
                  {forecast.map((item, i) => {
                    const heightPct = (item.units / maxUnits) * 100;
                    const isAboveBaseline = item.units > ABSORPTION_BASELINE;

                    return (
                      <div
                        key={item.year}
                        className="flex-1 flex flex-col items-center justify-end h-full max-w-[80px]"
                      >
                        {/* Unit count label */}
                        <motion.span
                          className="text-xs font-body font-semibold text-ivory-200 mb-1.5"
                          initial={{ opacity: 0, y: 8 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={defaultViewport}
                          transition={{ duration: 0.4, delay: 0.6 + i * 0.1 }}
                        >
                          {item.units.toLocaleString()}
                        </motion.span>

                        {/* Animated bar */}
                        <motion.div
                          className="w-full rounded-t-md relative overflow-hidden cursor-default"
                          style={{
                            background: isAboveBaseline
                              ? 'linear-gradient(to top, #b8952f, #d4a853, #e0be7a)'
                              : 'linear-gradient(to top, #b8952f, #d4a853)',
                          }}
                          initial={{ height: 0 }}
                          whileInView={{ height: `${heightPct}%` }}
                          viewport={defaultViewport}
                          transition={{
                            duration: 0.9,
                            delay: 0.3 + i * 0.1,
                            ease: [0.25, 0.46, 0.45, 0.94],
                          }}
                        >
                          {/* Shimmer overlay */}
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                        </motion.div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* X-axis labels */}
              <div className="ml-14 flex justify-around gap-2 px-1 mt-2">
                {forecast.map((item) => (
                  <div key={item.year} className="flex-1 text-center max-w-[80px]">
                    <span className="text-[13px] font-body font-semibold text-charcoal-400">
                      {item.year}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-48 text-charcoal-500 font-body text-sm">
              No delivery forecast data available for this filter.
            </div>
          )}

          {/* Narrative */}
          <div className="mt-6 pt-5 border-t border-charcoal-800">
            <p className="text-sm font-body leading-relaxed text-charcoal-400">
              The delivery wave pattern reveals when new supply enters the market relative
              to estimated absorption capacity. The ~192 unit/year baseline reflects
              Pinellas&apos; trailing absorption rate of ~16 contracts per month. Years where
              scheduled deliveries exceed this baseline signal potential supply pressure,
              while gaps between waves represent windows of tighter inventory and stronger
              pricing leverage for existing projects.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
