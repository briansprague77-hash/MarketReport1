'use client';

import { motion } from 'framer-motion';
import { fadeUp, defaultViewport } from '@/lib/animations';
import type { MarketData } from '@/hooks/useMarketData';
import AnimatedBar from '@/components/ui/AnimatedBar';
import AnimatedCounter from '@/components/ui/AnimatedCounter';
import { useRef } from 'react';
import { useInView } from 'framer-motion';

/* ─── Status Row — uses inline style for dynamic hex color ──────────── */
function StatusRow({
  name,
  units,
  max,
  fill,
  delay,
}: {
  name: string;
  units: number;
  max: number;
  fill: string;
  delay: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const pct = max > 0 ? (units / max) * 100 : 0;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay }}
      className="mb-4"
    >
      <div className="flex items-baseline justify-between mb-1.5">
        <span className="text-sm font-body font-semibold text-ivory-100">{name}</span>
        <AnimatedCounter
          value={units}
          className="text-sm font-heading font-bold text-gold-500"
        />
      </div>
      <div className="w-full bg-charcoal-800/60 rounded-full overflow-hidden h-3">
        <motion.div
          className="h-3 rounded-full"
          style={{ backgroundColor: fill }}
          initial={{ width: 0 }}
          animate={isInView ? { width: `${pct}%` } : { width: 0 }}
          transition={{ duration: 1.2, delay: delay + 0.3, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
    </motion.div>
  );
}

/* ─── old PIE_COLORS kept for reference (no longer used) ─── */
// const PIE_COLORS = ['#C9A84C','#0D9668','#3B82F6','#EC4899','#8B5CF6','#F59E0B','#6B7280'];

const DEV_COLORS = [
  'from-gold-600 to-gold-400',
  'from-emerald-500 to-emerald-400',
  'from-blue-500 to-blue-400',
  'from-pink-500 to-pink-400',
  'from-violet-500 to-violet-400',
  'from-amber-500 to-amber-400',
  'from-cyan-500 to-cyan-400',
  'from-rose-500 to-rose-400',
];

interface MarketChartsProps {
  data?: MarketData;
}

/* ─── PSF Row with dual bars ─────────────────────────────────────────────── */
function PsfRow({
  name,
  pps,
  developerClose,
  maxPps,
  delay,
}: {
  name: string;
  pps: number;
  developerClose?: number;
  maxPps: number;
  delay: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const pctCurrent = maxPps > 0 ? (pps / maxPps) * 100 : 0;
  const pctClose =
    developerClose && developerClose > 0 && maxPps > 0
      ? (developerClose / maxPps) * 100
      : 0;
  const showClose = developerClose && developerClose > 0 && developerClose !== pps;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay }}
      className="mb-5"
    >
      <div className="flex items-baseline justify-between mb-2">
        <span className="text-sm font-body font-semibold text-ivory-100 truncate mr-3">
          {name}
        </span>
        <div className="flex items-baseline gap-3 flex-shrink-0">
          {showClose && (
            <span className="text-xs font-body text-charcoal-400">
              Close{' '}
              <AnimatedCounter
                value={developerClose}
                prefix="$"
                suffix="/SF"
                className="text-xs font-heading font-semibold text-charcoal-400"
              />
            </span>
          )}
          <AnimatedCounter
            value={pps}
            prefix="$"
            suffix="/SF"
            className="text-sm font-heading font-bold text-gold-500"
          />
        </div>
      </div>

      {/* Developer Close bar (thin, charcoal) */}
      {showClose && (
        <div className="w-full bg-charcoal-800/40 rounded-full overflow-hidden h-1.5 mb-1">
          <motion.div
            className="h-1.5 rounded-full bg-charcoal-500"
            initial={{ width: 0 }}
            animate={isInView ? { width: `${pctClose}%` } : { width: 0 }}
            transition={{
              duration: 1.0,
              delay: delay + 0.2,
              ease: [0.22, 1, 0.36, 1],
            }}
          />
        </div>
      )}

      {/* Current Market PSF bar (thick, gold) */}
      <div className="w-full bg-charcoal-800/60 rounded-full overflow-hidden h-3">
        <motion.div
          className="h-3 rounded-full bg-gradient-to-r from-gold-600 to-gold-400"
          initial={{ width: 0 }}
          animate={isInView ? { width: `${pctCurrent}%` } : { width: 0 }}
          transition={{
            duration: 1.2,
            delay: delay + 0.3,
            ease: [0.22, 1, 0.36, 1],
          }}
        />
      </div>
    </motion.div>
  );
}

/* ─── Main Component ─────────────────────────────────────────────────────── */

export default function MarketCharts({ data }: MarketChartsProps) {
  if (!data) {
    return (
      <section className="py-16 bg-ivory-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-charcoal-500 font-body">Loading chart data...</p>
        </div>
      </section>
    );
  }

  const activeStatusData = [...data.statusChartData].sort(
    (a, b) => b.units - a.units,
  );
  const maxStatusUnits =
    activeStatusData.length > 0 ? activeStatusData[0].units : 1;

  // Developer share — top 8 + "Others"
  const allDevData = [...data.developerData].sort((a, b) => b.value - a.value);
  const totalDevUnits = allDevData.reduce((s, d) => s + d.value, 0);
  const top8 = allDevData.slice(0, 8);
  const othersValue = allDevData.slice(8).reduce((s, d) => s + d.value, 0);
  const devDisplay =
    othersValue > 0
      ? [...top8, { name: 'Others', value: othersValue }]
      : top8;
  const maxDevValue = devDisplay.length > 0 ? devDisplay[0].value : 1;

  // PSF data sorted ascending (cheapest on top)
  const activePsfData = [...data.psfChartData].sort((a, b) => a.pps - b.pps);
  const maxPps =
    activePsfData.length > 0
      ? Math.max(...activePsfData.map((d) => Math.max(d.pps, d.developerClose ?? 0)))
      : 1;

  const geoLabel = data.geoLabel;
  const totalUnits = data.totalUnits;
  const totalDevs = data.totalDevs;
  const minPsf = data.minPsf;
  const maxPsf = data.maxPsf;

  return (
    <section className="py-16 bg-charcoal-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          variants={fadeUp}
        >
          <p className="text-xs font-body font-semibold uppercase tracking-[0.25em] text-gold-600 mb-3">
            Data Visualizations
          </p>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-ivory-50">
            {geoLabel} Market Analytics
          </h2>
        </motion.div>

        {/* ─── Grid: Status + Developer (side-by-side on desktop) ─── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* ─── Section 1: Inventory by Status ──────────────────── */}
          <motion.div
            className="bg-charcoal-900/80 border border-charcoal-800 rounded-xl p-6 md:p-8"
            initial="hidden"
            whileInView="visible"
            viewport={defaultViewport}
            variants={fadeUp}
          >
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-1">
                <div className="w-8 h-0.5 bg-gold-600 rounded-full" />
                <h3 className="text-lg font-heading font-bold text-ivory-50">
                  Inventory by Status
                </h3>
              </div>
              <p className="text-xs font-body text-charcoal-400 ml-11">
                {geoLabel} &mdash;{' '}
                <AnimatedCounter
                  value={totalUnits}
                  suffix=" units"
                  className="text-xs font-body text-charcoal-400"
                />
              </p>
            </div>

            {activeStatusData.length > 0 ? (
              <div>
                {activeStatusData.map((entry, i) => (
                  <StatusRow
                    key={entry.name}
                    name={entry.name}
                    units={entry.units}
                    max={maxStatusUnits}
                    fill={entry.fill}
                    delay={i * 0.08}
                  />
                ))}
              </div>
            ) : (
              <div className="h-[200px] flex items-center justify-center text-charcoal-500 font-body text-sm">
                No status data available for {geoLabel}
              </div>
            )}
          </motion.div>

          {/* ─── Section 2: Developer Market Share ───────────────── */}
          <motion.div
            className="bg-charcoal-900/80 border border-charcoal-800 rounded-xl p-6 md:p-8"
            initial="hidden"
            whileInView="visible"
            viewport={defaultViewport}
            variants={fadeUp}
          >
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-1">
                <div className="w-8 h-0.5 bg-gold-600 rounded-full" />
                <h3 className="text-lg font-heading font-bold text-ivory-50">
                  Developer Market Share
                </h3>
              </div>
              <p className="text-xs font-body text-charcoal-400 ml-11">
                {geoLabel} &mdash; {totalDevs} developments
              </p>
            </div>

            {devDisplay.length > 0 ? (
              <div>
                {devDisplay.map((entry, i) => {
                  const pct =
                    totalDevUnits > 0
                      ? ((entry.value / totalDevUnits) * 100).toFixed(1)
                      : '0';
                  return (
                    <AnimatedBar
                      key={entry.name}
                      label={entry.name}
                      sublabel={`${entry.value.toLocaleString()} units`}
                      value={entry.value}
                      max={maxDevValue}
                      valueLabel={`${pct}%`}
                      color={DEV_COLORS[i % DEV_COLORS.length]}
                      delay={i * 0.1}
                      height="h-2.5"
                    />
                  );
                })}
              </div>
            ) : (
              <div className="h-[200px] flex items-center justify-center text-charcoal-500 font-body text-sm">
                No developer data available for {geoLabel}
              </div>
            )}
          </motion.div>
        </div>

        {/* ─── Section 3: PSF Ladder (full width) ───────────────── */}
        <motion.div
          className="mt-8 bg-charcoal-900/80 border border-charcoal-800 rounded-xl p-6 md:p-8"
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          variants={fadeUp}
        >
          <div className="mb-6">
            <div className="flex items-center gap-3 mb-1">
              <div className="w-8 h-0.5 bg-gold-600 rounded-full" />
              <h3 className="text-lg font-heading font-bold text-ivory-50">
                Price Per Square Foot Ladder
              </h3>
            </div>
            <p className="text-xs font-body text-charcoal-400 ml-11">
              {geoLabel} New Construction &mdash; sorted by current market PSF
            </p>
          </div>

          {activePsfData.length > 0 ? (
            <>
              <div>
                {activePsfData.map((entry, i) => (
                  <PsfRow
                    key={entry.name}
                    name={entry.name}
                    pps={entry.pps}
                    developerClose={entry.developerClose}
                    maxPps={maxPps}
                    delay={i * 0.08}
                  />
                ))}
              </div>

              {/* Legend */}
              {activePsfData.some(
                (d) =>
                  (d.developerClose ?? 0) > 0 && d.developerClose !== d.pps,
              ) && (
                <div className="flex items-center gap-5 mt-5 pt-4 border-t border-charcoal-800">
                  <span className="flex items-center gap-2 text-xs font-body text-charcoal-400">
                    <span className="inline-block w-6 h-3 rounded-sm bg-gradient-to-r from-gold-600 to-gold-400" />
                    Current Market PSF
                  </span>
                  <span className="flex items-center gap-2 text-xs font-body text-charcoal-400">
                    <span className="inline-block w-6 h-1.5 rounded-sm bg-charcoal-500" />
                    Developer Close PSF
                  </span>
                </div>
              )}
            </>
          ) : (
            <div className="h-[200px] flex items-center justify-center text-charcoal-500 font-body text-sm">
              No PSF data available for {geoLabel}
            </div>
          )}
        </motion.div>

        {/* ─── Chart Narrative ─────────────────────────────────── */}
        <motion.div
          className="mt-10 rounded-xl bg-charcoal-900/60 border border-charcoal-800 shadow-sm p-6 md:p-8"
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          variants={fadeUp}
        >
          <h3 className="text-sm font-body font-semibold uppercase tracking-widest text-gold-600 mb-3">
            Reading the Charts
          </h3>
          <div className="space-y-3 text-sm font-body leading-relaxed text-charcoal-300">
            <p>
              <span className="font-semibold text-ivory-100">
                Inventory by Status:
              </span>{' '}
              The {geoLabel} pipeline totals{' '}
              {totalUnits.toLocaleString()} units across {totalDevs}{' '}
              developments. The status breakdown above shows how inventory is
              distributed from pre-sales through delivery &mdash; helping buyers
              and advisors gauge immediate availability versus future supply.
            </p>
            <p>
              <span className="font-semibold text-ivory-100">
                Developer Market Share:
              </span>{' '}
              {data.developerData.length} distinct developer groups are active in{' '}
              {geoLabel} &mdash;{' '}
              {data.developerData.length >= 5
                ? 'broad institutional confidence in the submarket rather than single-developer concentration risk'
                : 'a focused developer landscape shaping this submarket'}
              .
            </p>
            <p>
              <span className="font-semibold text-ivory-100">
                PSF Ladder:
              </span>{' '}
              {minPsf > 0 && maxPsf > 0 ? (
                <>
                  The spread from ${minPsf.toLocaleString()}/SF to $
                  {maxPsf.toLocaleString()}/SF illustrates the market&apos;s
                  depth across buyer segments.
                </>
              ) : (
                <>
                  The PSF spread illustrates the market&apos;s depth across
                  buyer segments.
                </>
              )}{' '}
              Importantly, each tier has limited direct competition &mdash; most
              projects occupy distinct PSF bands with minimal overlap, reducing
              head-to-head pricing pressure.
            </p>
          </div>
          <p className="mt-4 text-xs font-body text-charcoal-500">
            Chart data compiled from developer price sheets, Stellar MLS (Feb
            2026), and proprietary broker research. PSF figures represent average
            or starting price per living square foot.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
