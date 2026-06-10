'use client';

import { useMemo, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import AnimatedCounter from '@/components/ui/AnimatedCounter';
import { fadeUp, defaultViewport } from '@/lib/animations';
import type { MarketData } from '@/hooks/useMarketData';

// PSF appreciation from launch to current — ONLY buildings with real price movement
// Roche Bobois excluded: brand new to market, no appreciation (launch = current = $1,433)
const APPRECIATION: Record<string, { launch: number; current: number; pct: number }> = {
  'reflection': { launch: 450, current: 727, pct: 61.6 },
  '400-central': { launch: 585, current: 950, pct: 62.4 },
  'tampa-edition': { launch: 1035, current: 1563, pct: 51.0 },
  'one-tampa': { launch: 764, current: 970, pct: 27.0 },
  'viceroy-clearwater': { launch: 960, current: 1198, pct: 24.8 },
  'ritz-carlton-tower-ii': { launch: 750, current: 925, pct: 23.3 },
  'aqua-westshore': { launch: 776, current: 956, pct: 23.2 },
  'pendry-tampa': { launch: 1085, current: 1329, pct: 22.5 },
  'hotel-ora': { launch: 1207, current: 1466, pct: 21.5 },
};

interface Props {
  data?: MarketData;
}

function AppreciationRow({ name, launch, current, pct, maxPsf, delay }: {
  name: string;
  launch: number;
  current: number;
  pct: number;
  maxPsf: number;
  delay: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const launchWidth = maxPsf > 0 ? (launch / maxPsf) * 100 : 0;
  const currentWidth = maxPsf > 0 ? (current / maxPsf) * 100 : 0;
  const isPositive = pct >= 0;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay }}
      className="mb-6 last:mb-0"
    >
      <div className="flex items-baseline justify-between mb-2">
        <span className="text-sm font-body font-semibold text-charcoal-800">{name}</span>
        <div className="flex items-center gap-3">
          <span className="text-xs font-body text-charcoal-400">
            ${launch.toLocaleString()} &rarr; ${current.toLocaleString()}/SF
          </span>
          <AnimatedCounter
            value={pct}
            prefix={isPositive ? '+' : ''}
            suffix="%"
            decimals={1}
            duration={1.8}
            className={`text-sm font-heading font-bold ${isPositive ? 'text-emerald-600' : 'text-red-600'}`}
          />
        </div>
      </div>
      {/* Dual bar */}
      <div className="relative space-y-1">
        {/* Launch bar (thin, gray) */}
        <div className="w-full bg-charcoal-100 rounded-full overflow-hidden h-2">
          <motion.div
            className="h-2 rounded-full bg-charcoal-300/60"
            initial={{ width: 0 }}
            animate={isInView ? { width: `${launchWidth}%` } : { width: 0 }}
            transition={{ duration: 1, delay: delay + 0.2, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>
        {/* Current bar (thick, gold) */}
        <div className="w-full bg-charcoal-100 rounded-full overflow-hidden h-3.5">
          <motion.div
            className={`h-3.5 rounded-full bg-gradient-to-r ${isPositive ? 'from-emerald-500 to-emerald-400' : 'from-red-500 to-red-400'}`}
            initial={{ width: 0 }}
            animate={isInView ? { width: `${currentWidth}%` } : { width: 0 }}
            transition={{ duration: 1.2, delay: delay + 0.4, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>
      </div>
    </motion.div>
  );
}

export default function PsfAppreciation({ data }: Props) {
  const chartData = useMemo(() => {
    if (!data) return [];
    return data.filtered
      .filter((d) => APPRECIATION[d.slug])
      .map((d) => {
        const a = APPRECIATION[d.slug];
        return {
          name: d.name,
          pct: a.pct,
          launch: a.launch,
          current: a.current,
        };
      })
      .sort((a, b) => b.pct - a.pct);
  }, [data]);

  if (chartData.length === 0) return null;

  const maxPsf = Math.max(...chartData.map((d) => d.current), 1);

  return (
    <section className="py-16 bg-ivory-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          variants={fadeUp}
        >
          <p className="text-xs font-body font-semibold uppercase tracking-[0.25em] text-charcoal-500 mb-3">
            Price Growth
          </p>
          <h2 className="text-2xl md:text-3xl font-heading font-bold text-charcoal-900 mb-2">
            PSF Appreciation Since Launch
          </h2>
          <div className="w-16 h-0.5 bg-gradient-to-r from-emerald-500 to-emerald-300 mb-6" />
          <p className="text-sm font-body text-charcoal-500 mb-10 max-w-2xl">
            Price per square foot growth from initial launch pricing to current ask/close pricing. Thin gray bar = launch PSF, thick colored bar = current PSF.
          </p>

          <div className="rounded-xl border border-charcoal-200 bg-white p-6 md:p-8 shadow-sm">
            {/* Legend */}
            <div className="flex items-center gap-6 mb-6 pb-4 border-b border-charcoal-100">
              <div className="flex items-center gap-2">
                <div className="w-8 h-2 rounded-full bg-charcoal-300/60" />
                <span className="text-xs font-body text-charcoal-400">Launch PSF</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-3.5 rounded-full bg-gradient-to-r from-emerald-500 to-emerald-400" />
                <span className="text-xs font-body text-charcoal-400">Current PSF</span>
              </div>
            </div>

            {chartData.map((entry, index) => (
              <AppreciationRow
                key={entry.name}
                name={entry.name}
                launch={entry.launch}
                current={entry.current}
                pct={entry.pct}
                maxPsf={maxPsf}
                delay={index * 0.08}
              />
            ))}
          </div>

          <p className="mt-4 text-xs font-body text-charcoal-400">
            Source: Developer price sheets (launch), Stellar MLS current listings (current). Appreciation reflects list-price growth, not closed-sale growth.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
