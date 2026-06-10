'use client';

import { useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  staggerContainer,
  staggerItem,
  fadeUp,
  defaultViewport,
} from '@/lib/animations';
import { marketTrends } from '@/data/market';
import type { MarketData } from '@/hooks/useMarketData';
import { TrendingUp, TrendingDown, Minus, ArrowRight } from 'lucide-react';

interface MarketTrendsProps {
  data?: MarketData;
}

function DirectionIcon({ direction }: { direction: 'up' | 'down' | 'stable' }) {
  if (direction === 'up') return <TrendingUp className="h-5 w-5 text-emerald-500" />;
  if (direction === 'down') return <TrendingDown className="h-5 w-5 text-red-400" />;
  return <Minus className="h-5 w-5 text-charcoal-400" />;
}

function changeColor(direction: 'up' | 'down' | 'stable') {
  if (direction === 'up') return 'text-emerald-500';
  if (direction === 'down') return 'text-red-400';
  return 'text-charcoal-400';
}

export default function MarketTrends({ data }: MarketTrendsProps) {
  const geoLabel = data?.geoLabel ?? 'Tampa Bay';

  // Determine which county the current geo filter belongs to
  const activeCounty = useMemo(() => {
    const label = geoLabel.toLowerCase();
    if (label.includes('pinellas') || label.includes('st. pete') || label.includes('mirror lake') || label.includes('clearwater'))
      return 'pinellas';
    if (label.includes('hillsborough') || label.includes('tampa') || label.includes('water street') || label.includes('bayshore') || label.includes('westshore') || label.includes('channel'))
      return 'hillsborough';
    if (label.includes('sarasota') || label.includes('quay') || label.includes('golden gate'))
      return 'sarasota';
    return 'all';
  }, [geoLabel]);

  // Filter trends: show county-specific + 'all' trends. On Tampa Bay tab show everything.
  const filteredTrends = useMemo(() => {
    if (activeCounty === 'all') return marketTrends;
    return marketTrends.filter((t) => t.county === activeCounty || t.county === 'all');
  }, [activeCounty]);

  if (filteredTrends.length === 0) return null;

  return (
    <section className="py-16 bg-ivory-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          variants={fadeUp}
        >
          <p className="text-xs font-body font-semibold uppercase tracking-[0.25em] text-gold-600 mb-3">
            Market Trends
          </p>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-charcoal-900">
            Key Metrics — {geoLabel}
          </h2>
          <p className="mt-3 text-sm font-body text-charcoal-500 max-w-2xl mx-auto">
            Sourced data with attribution. {filteredTrends.length} metrics for this view.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          variants={staggerContainer}
        >
          {filteredTrends.map((trend) => (
            <motion.div
              key={trend.metric}
              variants={staggerItem}
              className="bg-white rounded-xl p-6 shadow-lg border border-charcoal-100 hover:shadow-xl transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-sm font-body font-semibold text-charcoal-900 leading-snug pr-4">
                  {trend.metric}
                </h3>
                <DirectionIcon direction={trend.direction} />
              </div>

              <div className="flex items-end gap-3 mb-3">
                <span className="text-3xl font-heading font-bold text-charcoal-900">
                  {trend.current}
                </span>
                <span className={`text-sm font-body font-bold ${changeColor(trend.direction)}`}>
                  {trend.change}
                </span>
              </div>

              {trend.prior !== 'N/A' && (
                <div className="flex items-center gap-2 text-xs font-body text-charcoal-400 mb-1">
                  <span>{trend.prior}</span>
                  <ArrowRight className="h-3 w-3" />
                  <span>{trend.current}</span>
                </div>
              )}

              <div className="mt-3 pt-3 border-t border-charcoal-100 flex items-center justify-between">
                <span className="text-xs font-body text-charcoal-400">
                  {trend.period}
                </span>
                {trend.source && (
                  <span className="text-[10px] font-body text-charcoal-400 text-right max-w-[60%] leading-tight">
                    {trend.source}
                  </span>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
