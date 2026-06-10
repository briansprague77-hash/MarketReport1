'use client';

import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { fadeUp, defaultViewport, staggerContainer } from '@/lib/animations';
import type { MarketData } from '@/hooks/useMarketData';

interface CompetitivePositioningProps {
  data?: MarketData;
}

// Status color mapping
const STATUS_COLORS: Record<string, string> = {
  'reservation': '#d4a853',
  'pre-sales': '#d4a853',
  'under-construction': '#10B981',
  'delivering': '#3B82F6',
  'delivered': '#6B7280',
  'sold-out': '#6B7280',
};

const STATUS_BG: Record<string, string> = {
  'reservation': 'bg-gold-500/15 border-gold-500/30',
  'pre-sales': 'bg-gold-500/15 border-gold-500/30',
  'under-construction': 'bg-emerald-500/15 border-emerald-500/30',
  'delivering': 'bg-blue-500/15 border-blue-500/30',
  'delivered': 'bg-charcoal-600/20 border-charcoal-600/30',
  'sold-out': 'bg-charcoal-600/20 border-charcoal-600/30',
};

interface PlotPoint {
  name: string;
  deliveryYear: number;
  avgPsf: number;
  units: number;
  developer: string;
  status: string;
  statusLabel: string;
  fill: string;
}

export default function CompetitivePositioning({ data }: CompetitivePositioningProps) {
  const geoLabel = data?.geoLabel ?? 'Tampa Bay';
  const [hoveredPoint, setHoveredPoint] = useState<PlotPoint | null>(null);

  const scatterData = useMemo(() => {
    if (!data) return [];
    return data.filtered
      .filter((d) => (d.avgPsf ?? 0) > 0)
      .map((d) => {
        const match = d.delivery.match(/(\d{4})/);
        const year = match ? parseInt(match[1]) : null;
        if (!year) return null;
        return {
          name: d.name,
          deliveryYear: year,
          avgPsf: d.avgPsf!,
          units: d.units,
          developer: d.developer ?? 'TBD',
          status: d.status,
          statusLabel: d.statusLabel,
          fill: STATUS_COLORS[d.status] ?? '#6B7280',
        } as PlotPoint;
      })
      .filter(Boolean) as PlotPoint[];
  }, [data]);

  // Axis ranges
  const years = scatterData.map((d) => d.deliveryYear);
  const psfs = scatterData.map((d) => d.avgPsf);
  const minYear = years.length > 0 ? Math.min(...years) : 2024;
  const maxYear = years.length > 0 ? Math.max(...years) : 2030;
  const minPsf = psfs.length > 0 ? Math.min(...psfs) : 0;
  const maxPsf = psfs.length > 0 ? Math.max(...psfs) : 2000;
  const maxUnits = Math.max(...scatterData.map((d) => d.units), 1);

  // Group by delivery year for the horizontal row layout
  const yearGroups = useMemo(() => {
    const groups: Record<number, PlotPoint[]> = {};
    for (const point of scatterData) {
      if (!groups[point.deliveryYear]) groups[point.deliveryYear] = [];
      groups[point.deliveryYear].push(point);
    }
    // Sort each group by PSF descending
    for (const year of Object.keys(groups)) {
      groups[Number(year)].sort((a, b) => b.avgPsf - a.avgPsf);
    }
    return Object.entries(groups)
      .map(([year, points]) => ({ year: Number(year), points }))
      .sort((a, b) => a.year - b.year);
  }, [scatterData]);

  // PSF tier label
  const getPsfTier = (psf: number) => {
    if (psf >= 1300) return { label: 'Ultra-Luxury', color: 'text-amber-300' };
    if (psf >= 1000) return { label: 'Premium', color: 'text-gold-400' };
    if (psf >= 700) return { label: 'Mid-Luxury', color: 'text-blue-400' };
    return { label: 'Value', color: 'text-emerald-400' };
  };

  // Calculate bar width for PSF — scaled relative to max in dataset
  const psfBarPercent = (psf: number) => {
    const range = maxPsf - (minPsf * 0.8);
    return Math.max(8, ((psf - minPsf * 0.8) / range) * 100);
  };

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
            Competitive Landscape
          </p>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-ivory-50">
            Competitive Positioning Matrix &mdash; {geoLabel}
          </h2>
        </motion.div>

        <motion.div
          className="rounded-2xl border border-charcoal-800 bg-charcoal-900/80 p-6 backdrop-blur-sm"
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          variants={fadeUp}
        >
          {scatterData.length > 0 ? (
            <div className="space-y-6">
              {yearGroups.map((group, gi) => (
                <motion.div
                  key={group.year}
                  variants={staggerContainer}
                  initial="hidden"
                  whileInView="visible"
                  viewport={defaultViewport}
                >
                  {/* Year header */}
                  <motion.div
                    className="flex items-center gap-3 mb-3"
                    variants={{
                      hidden: { opacity: 0, x: -16 },
                      visible: {
                        opacity: 1,
                        x: 0,
                        transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
                      },
                    }}
                  >
                    <span className="text-lg font-heading font-bold text-ivory-100">{group.year}</span>
                    <div className="flex-1 h-px bg-charcoal-800" />
                    <span className="text-xs font-body text-charcoal-500">
                      {group.points.length} project{group.points.length !== 1 ? 's' : ''} &middot;{' '}
                      {group.points.reduce((s, p) => s + p.units, 0).toLocaleString()} units
                    </span>
                  </motion.div>

                  {/* Projects in this year */}
                  <div className="space-y-2">
                    {group.points.map((point, pi) => {
                      const tier = getPsfTier(point.avgPsf);
                      const barWidth = psfBarPercent(point.avgPsf);
                      const sizePercent = Math.max(20, (point.units / maxUnits) * 100);
                      const isHovered = hoveredPoint?.name === point.name;
                      const statusBg = STATUS_BG[point.status] ?? 'bg-charcoal-600/20 border-charcoal-600/30';

                      return (
                        <motion.div
                          key={point.name}
                          className={`relative rounded-xl border px-4 py-3 transition-all duration-200 cursor-default ${
                            isHovered
                              ? 'border-gold-500/40 bg-charcoal-800/70 shadow-lg shadow-gold-500/5'
                              : 'border-charcoal-800 bg-charcoal-800/20 hover:border-charcoal-700'
                          }`}
                          variants={{
                            hidden: { opacity: 0, y: 16 },
                            visible: {
                              opacity: 1,
                              y: 0,
                              transition: {
                                duration: 0.5,
                                ease: [0.25, 0.46, 0.45, 0.94],
                                delay: pi * 0.08,
                              },
                            },
                          }}
                          onMouseEnter={() => setHoveredPoint(point)}
                          onMouseLeave={() => setHoveredPoint(null)}
                        >
                          <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-3 items-center">
                            {/* Left: name + PSF bar */}
                            <div className="space-y-2">
                              <div className="flex items-center gap-2 flex-wrap">
                                <span className="text-sm font-heading font-bold text-ivory-50">{point.name}</span>
                                <span className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-body font-medium ${statusBg}`}>
                                  {point.statusLabel}
                                </span>
                                <span className={`text-[10px] font-body font-semibold ${tier.color}`}>
                                  {tier.label}
                                </span>
                              </div>

                              {/* PSF bar */}
                              <div className="flex items-center gap-3">
                                <div className="relative flex-1 h-5 rounded bg-charcoal-800/60 overflow-hidden">
                                  <motion.div
                                    className="absolute inset-y-0 left-0 rounded"
                                    style={{
                                      background: `linear-gradient(90deg, ${point.fill}33 0%, ${point.fill}aa 100%)`,
                                    }}
                                    initial={{ width: 0 }}
                                    whileInView={{ width: `${barWidth}%` }}
                                    viewport={{ once: true, margin: '-40px' }}
                                    transition={{
                                      duration: 1.0,
                                      ease: [0.25, 0.46, 0.45, 0.94],
                                      delay: gi * 0.2 + pi * 0.1,
                                    }}
                                  />
                                  <span className="absolute inset-0 flex items-center px-2 text-xs font-body font-bold text-ivory-100 tabular-nums">
                                    ${point.avgPsf.toLocaleString()} /SF
                                  </span>
                                </div>
                              </div>
                            </div>

                            {/* Right: unit count + developer */}
                            <div className="flex items-center gap-4 md:text-right">
                              {/* Unit indicator */}
                              <div className="flex items-center gap-2">
                                <motion.div
                                  className="relative rounded-full overflow-hidden"
                                  style={{
                                    width: `${Math.max(28, sizePercent * 0.5)}px`,
                                    height: `${Math.max(28, sizePercent * 0.5)}px`,
                                  }}
                                  initial={{ scale: 0, opacity: 0 }}
                                  whileInView={{ scale: 1, opacity: 1 }}
                                  viewport={{ once: true }}
                                  transition={{
                                    duration: 0.5,
                                    ease: [0.25, 0.46, 0.45, 0.94],
                                    delay: gi * 0.2 + pi * 0.1 + 0.3,
                                  }}
                                >
                                  <div
                                    className="absolute inset-0 rounded-full"
                                    style={{
                                      backgroundColor: point.fill,
                                      opacity: 0.15,
                                    }}
                                  />
                                  <div
                                    className="absolute inset-[2px] rounded-full border"
                                    style={{
                                      borderColor: `${point.fill}60`,
                                    }}
                                  />
                                </motion.div>
                                <div className="flex flex-col">
                                  <span className="text-sm font-body font-bold text-ivory-100 tabular-nums">
                                    {point.units.toLocaleString()}
                                  </span>
                                  <span className="text-[10px] font-body text-charcoal-500">units</span>
                                </div>
                              </div>

                              {/* Developer */}
                              <div className="hidden md:block min-w-[120px]">
                                <p className="text-[10px] font-body text-charcoal-500 uppercase tracking-wider">Developer</p>
                                <p className="text-xs font-body text-charcoal-300 truncate max-w-[160px]">
                                  {point.developer}
                                </p>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </motion.div>
              ))}

              {/* Hover tooltip overlay */}
              <AnimatePresence>
                {hoveredPoint && (
                  <motion.div
                    className="mt-2 rounded-lg border border-charcoal-700 bg-charcoal-800/95 backdrop-blur-sm px-5 py-3"
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 4 }}
                    transition={{ duration: 0.15 }}
                  >
                    <div className="flex flex-wrap items-center gap-x-6 gap-y-1.5">
                      <span className="text-sm font-heading font-bold text-ivory-50">{hoveredPoint.name}</span>
                      <span className="text-xs font-body text-charcoal-300">
                        PSF: <span className="text-ivory-200 font-semibold">${hoveredPoint.avgPsf.toLocaleString()}</span>
                      </span>
                      <span className="text-xs font-body text-charcoal-300">
                        Units: <span className="text-ivory-200 font-semibold">{hoveredPoint.units.toLocaleString()}</span>
                      </span>
                      <span className="text-xs font-body text-charcoal-300">
                        Delivery: <span className="text-ivory-200 font-semibold">{hoveredPoint.deliveryYear}</span>
                      </span>
                      <span className="text-xs font-body text-charcoal-300">
                        Developer: <span className="text-ivory-200 font-semibold">{hoveredPoint.developer}</span>
                      </span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <div className="flex items-center justify-center h-48 text-charcoal-500 font-body text-sm">
              Insufficient data to render competitive positioning for this filter. Requires developments with known PSF and delivery year.
            </div>
          )}

          {/* Legend */}
          <div className="flex flex-wrap items-center gap-4 mt-4 pt-4 border-t border-charcoal-800">
            {[
              { label: 'Pre-Sales', color: '#d4a853' },
              { label: 'Under Construction', color: '#10B981' },
              { label: 'Delivering', color: '#3B82F6' },
              { label: 'Delivered', color: '#6B7280' },
            ].map((item) => (
              <span key={item.label} className="flex items-center gap-1.5 text-xs font-body text-charcoal-400">
                <span
                  className="inline-block h-3 w-3 rounded-full"
                  style={{ backgroundColor: item.color, opacity: 0.7 }}
                />
                {item.label}
              </span>
            ))}
            <span className="text-xs font-body text-charcoal-500 ml-auto">Circle size = total units</span>
          </div>

          {/* Narrative */}
          <div className="mt-5 pt-5 border-t border-charcoal-800">
            <p className="text-sm font-body leading-relaxed text-charcoal-400">
              Projects positioned in the upper-right quadrant (high PSF, later delivery) represent
              premium pre-construction bets with longer capital commitment timelines. Lower-left
              quadrant projects offer immediate value with delivered or near-term inventory.
              Bubble size reflects total unit count — larger projects carry more market weight
              and influence submarket pricing dynamics.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
