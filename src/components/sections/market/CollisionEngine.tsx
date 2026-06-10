'use client';

import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { fadeUp, staggerContainer, staggerItem, defaultViewport } from '@/lib/animations';
import type { MarketData } from '@/hooks/useMarketData';
import { computeCollisionScores, type CollisionScore } from '@/lib/collision';

interface CollisionEngineProps {
  data?: MarketData;
}

// ─── Classification colors ──────────────────────────────────────────────────

const CLASSIFICATION_STYLES: Record<string, { bg: string; text: string; label: string }> = {
  direct:    { bg: 'bg-red-500/20', text: 'text-red-400', label: 'Direct Competitor' },
  secondary: { bg: 'bg-amber-500/20', text: 'text-amber-400', label: 'Secondary' },
  low:       { bg: 'bg-emerald-500/20', text: 'text-emerald-400', label: 'Low Overlap' },
};

function getHeatColor(score: number): string {
  if (score > 60) return 'bg-red-500';
  if (score > 45) return 'bg-orange-500';
  if (score > 30) return 'bg-amber-500';
  if (score > 15) return 'bg-emerald-500';
  return 'bg-charcoal-700';
}

function getHeatOpacity(score: number): number {
  return Math.max(0.15, score / 100);
}

// ─── Score Breakdown Bar ────────────────────────────────────────────────────

function ScoreBreakdown({ score }: { score: CollisionScore }) {
  const segments = [
    { label: 'Delivery', value: score.deliveryOverlap, max: 25, color: '#3B82F6' },
    { label: 'Price', value: score.priceBandOverlap, max: 25, color: '#C9A84C' },
    { label: 'Units', value: score.unitMixOverlap, max: 15, color: '#10B981' },
    { label: 'Location', value: score.locationOverlap, max: 20, color: '#8B5CF6' },
    { label: 'Type', value: score.typeOverlap, max: 15, color: '#F97316' },
  ];

  return (
    <div className="space-y-1.5 mt-3">
      {segments.map((seg) => (
        <div key={seg.label} className="flex items-center gap-2">
          <span className="text-[10px] font-body text-charcoal-500 w-14 text-right">
            {seg.label}
          </span>
          <div className="flex-1 h-1.5 rounded-full bg-charcoal-800 overflow-hidden">
            <div
              className="h-full rounded-full transition-all"
              style={{
                width: `${(seg.value / seg.max) * 100}%`,
                backgroundColor: seg.color,
              }}
            />
          </div>
          <span className="text-[10px] font-body font-semibold text-charcoal-400 w-8">
            {seg.value}/{seg.max}
          </span>
        </div>
      ))}
    </div>
  );
}

// ─── Component ──────────────────────────────────────────────────────────────

export default function CollisionEngine({ data }: CollisionEngineProps) {
  const filtered = data?.filtered ?? [];
  const geoLabel = data?.geoLabel ?? 'Tampa Bay';

  const scores = useMemo(() => computeCollisionScores(filtered), [filtered]);

  // Build name list for matrix
  const devNames = useMemo(
    () => filtered.map((d) => ({ slug: d.slug, name: d.name })),
    [filtered],
  );

  // Score lookup map
  const scoreMap = useMemo(() => {
    const map: Record<string, number> = {};
    for (const s of scores) {
      map[`${s.projectA}|${s.projectB}`] = s.totalScore;
      map[`${s.projectB}|${s.projectA}`] = s.totalScore;
    }
    return map;
  }, [scores]);

  const topPairs = scores.slice(0, 5);

  if (filtered.length < 2) return null;

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
              Competitive Collision Analysis — {geoLabel}
            </h2>
            <p className="text-sm font-body text-charcoal-400 max-w-3xl leading-relaxed">
              Projects with collision scores above 60 compete directly for the same buyer pool.
              This analysis compares delivery timing, price positioning, unit counts, geography,
              and product type to quantify competitive overlap.
            </p>
          </div>

          {/* Heatmap Matrix */}
          {devNames.length <= 12 && (
            <div className="overflow-x-auto mb-10 -mx-4 px-4">
              <div className="inline-block min-w-full">
                <table className="border-collapse">
                  <thead>
                    <tr>
                      <th className="p-1" />
                      {devNames.map((d) => (
                        <th
                          key={d.slug}
                          className="p-1 text-[9px] font-body font-medium text-charcoal-500 writing-mode-vertical max-w-8"
                          style={{
                            writingMode: 'vertical-rl',
                            transform: 'rotate(180deg)',
                            height: '80px',
                          }}
                        >
                          {d.name.length > 15 ? d.name.slice(0, 14) + '...' : d.name}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {devNames.map((row) => (
                      <tr key={row.slug}>
                        <td className="p-1 text-[9px] font-body font-medium text-charcoal-500 whitespace-nowrap pr-2 text-right">
                          {row.name.length > 18 ? row.name.slice(0, 17) + '...' : row.name}
                        </td>
                        {devNames.map((col) => {
                          if (row.slug === col.slug) {
                            return (
                              <td key={col.slug} className="p-0.5">
                                <div className="w-7 h-7 bg-charcoal-800 rounded-sm" />
                              </td>
                            );
                          }
                          const score = scoreMap[`${row.slug}|${col.slug}`] ?? 0;
                          return (
                            <td key={col.slug} className="p-0.5">
                              <div
                                className={`w-7 h-7 rounded-sm flex items-center justify-center ${getHeatColor(score)}`}
                                style={{ opacity: getHeatOpacity(score) }}
                                title={`${row.name} vs ${col.name}: ${score}`}
                              >
                                <span className="text-[8px] font-mono font-bold text-white mix-blend-difference">
                                  {score}
                                </span>
                              </div>
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Legend */}
              <div className="flex items-center gap-4 mt-3">
                <span className="text-[10px] font-body text-charcoal-600">Collision Score:</span>
                <div className="flex items-center gap-1">
                  <div className="w-4 h-3 rounded-sm bg-charcoal-700 opacity-30" />
                  <span className="text-[9px] font-body text-charcoal-600">0</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-4 h-3 rounded-sm bg-amber-500 opacity-50" />
                  <span className="text-[9px] font-body text-charcoal-600">30</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-4 h-3 rounded-sm bg-red-500 opacity-80" />
                  <span className="text-[9px] font-body text-charcoal-600">60+</span>
                </div>
              </div>
            </div>
          )}

          {/* Top Collision Pairs */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={defaultViewport}
          >
            <h3 className="text-lg font-heading font-semibold text-ivory-100 mb-4">
              Highest Collision Pairs
            </h3>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {topPairs.map((pair, i) => {
                const style = CLASSIFICATION_STYLES[pair.classification];
                return (
                  <motion.div
                    key={`${pair.projectA}-${pair.projectB}`}
                    variants={staggerItem}
                    className="bg-charcoal-900 rounded-xl border border-charcoal-800 p-5 hover:border-gold-500/30 transition-colors"
                  >
                    {/* Rank + Score */}
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono font-bold text-charcoal-600">
                          #{i + 1}
                        </span>
                        <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold ${style.bg} ${style.text}`}>
                          {style.label}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="text-2xl font-heading font-bold text-gold-400">
                          {pair.totalScore}
                        </span>
                        <span className="text-[10px] font-body text-charcoal-600">/100</span>
                      </div>
                    </div>

                    {/* Names */}
                    <div className="mb-1">
                      <p className="text-sm font-body font-semibold text-ivory-100">
                        {pair.nameA}
                      </p>
                      <p className="text-xs font-body text-charcoal-500 my-0.5">vs</p>
                      <p className="text-sm font-body font-semibold text-ivory-100">
                        {pair.nameB}
                      </p>
                    </div>

                    {/* Breakdown */}
                    <ScoreBreakdown score={pair} />
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
