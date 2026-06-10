'use client';

import { useMemo } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  fadeUp,
  staggerContainer,
  staggerItem,
  defaultViewport,
} from '@/lib/animations';
import { trackedDevelopments, type DevelopmentSummary } from '@/data/developments';
import { Calendar, Building2, CheckCircle2, HardHat, Clock } from 'lucide-react';

// ─── Constants ──────────────────────────────────────────────────────────────

const CURRENT_YEAR = 2026;
const TIMELINE_START = 2024;
const TIMELINE_END = 2031;
const TOTAL_YEARS = TIMELINE_END - TIMELINE_START;

// ─── Color System (matches ComparisonTable delivery badges) ─────────────────

interface TimelineBadge {
  color: string;       // text/dot color
  bgColor: string;     // pill background
  barColor: string;    // swim-lane bar
  label: string;       // proximity label
}

function getTimelineBadge(delivery: string): TimelineBadge {
  const lower = delivery.toLowerCase().trim();

  // Delivered / Available Now → Green
  if (lower.includes('available') || lower.includes('delivered') || lower.includes('move-in')) {
    return { color: '#16A34A', bgColor: 'rgba(22,163,74,0.12)', barColor: 'rgba(22,163,74,0.35)', label: 'Delivered' };
  }

  // TBD → Gray
  if (lower === 'tbd' || lower === 'to be determined') {
    return { color: '#9CA3AF', bgColor: 'rgba(156,163,175,0.10)', barColor: 'rgba(156,163,175,0.20)', label: 'TBD' };
  }

  // Extract year
  const yearMatch = delivery.match(/\b(20\d{2})\b/);
  if (!yearMatch) {
    return { color: '#6B7280', bgColor: 'rgba(107,114,128,0.10)', barColor: 'rgba(107,114,128,0.20)', label: '' };
  }

  const year = parseInt(yearMatch[1], 10);
  const delta = year - CURRENT_YEAR;

  // This Year (2026) → Green
  if (delta <= 0) {
    return { color: '#16A34A', bgColor: 'rgba(22,163,74,0.12)', barColor: 'rgba(22,163,74,0.35)', label: delta === 0 ? 'This Year' : 'Delivered' };
  }

  // Next Year (2027) → Blue
  if (delta === 1) {
    return { color: '#2563EB', bgColor: 'rgba(37,99,235,0.12)', barColor: 'rgba(37,99,235,0.30)', label: 'Next Year' };
  }

  // 2-3 Years (2028-2029) → Amber
  if (delta <= 3) {
    return { color: '#D97706', bgColor: 'rgba(217,119,6,0.12)', barColor: 'rgba(217,119,6,0.30)', label: `${delta} Years` };
  }

  // 4+ Years (2030+) → Purple
  return { color: '#7C3AED', bgColor: 'rgba(124,58,237,0.12)', barColor: 'rgba(124,58,237,0.25)', label: `${delta}+ Years` };
}

// ─── Date Parsing ───────────────────────────────────────────────────────────

interface ParsedDate {
  year: number;
  quarter: number; // 1-4
}

/**
 * Parse a delivery string like "Q3 2026", "Available Now", "2027" into a
 * sortable { year, quarter } structure.
 */
function parseDelivery(delivery: string): ParsedDate | null {
  const lower = delivery.toLowerCase().trim();

  // Already delivered → position at start
  if (lower.includes('available') || lower.includes('delivered') || lower.includes('move-in')) {
    return { year: 2025, quarter: 1 };
  }

  // TBD → null (won't position on axis but shows in list)
  if (lower === 'tbd' || lower === 'to be determined') {
    return null;
  }

  // Extract quarter + year: "Q3 2026"
  const qMatch = delivery.match(/Q(\d)\s*(20\d{2})/i);
  if (qMatch) {
    return { year: parseInt(qMatch[2], 10), quarter: parseInt(qMatch[1], 10) };
  }

  // Year only: "2027"
  const yMatch = delivery.match(/\b(20\d{2})\b/);
  if (yMatch) {
    return { year: parseInt(yMatch[1], 10), quarter: 2 }; // default to Q2
  }

  return null;
}

/**
 * Convert a parsed date to a percentage position on the horizontal timeline.
 * 0% = TIMELINE_START, 100% = TIMELINE_END
 */
function dateToPercent(pd: ParsedDate): number {
  const yearOffset = pd.year - TIMELINE_START;
  const quarterFraction = (pd.quarter - 1) / 4;
  const pct = ((yearOffset + quarterFraction) / TOTAL_YEARS) * 100;
  return Math.max(0, Math.min(100, pct));
}

// ─── Data Preparation ───────────────────────────────────────────────────────

interface TimelineEntry extends DevelopmentSummary {
  parsed: ParsedDate | null;
  badge: TimelineBadge;
  pct: number | null; // null if TBD
}

function prepareEntries(county: 'pinellas' | 'hillsborough'): TimelineEntry[] {
  return trackedDevelopments
    .filter((d) => d.county === county)
    .map((d) => {
      const parsed = parseDelivery(d.delivery);
      return {
        ...d,
        parsed,
        badge: getTimelineBadge(d.delivery),
        pct: parsed ? dateToPercent(parsed) : null,
      };
    })
    // Sort by delivery: earliest first, TBD last
    .sort((a, b) => {
      if (a.pct === null && b.pct === null) return 0;
      if (a.pct === null) return 1;
      if (b.pct === null) return -1;
      return a.pct - b.pct;
    });
}

// ─── "Now" marker position ──────────────────────────────────────────────────

const NOW_PCT = dateToPercent({ year: CURRENT_YEAR, quarter: 1 });

// ─── Pipeline Stats ─────────────────────────────────────────────────────────

function computeStats(entries: TimelineEntry[]) {
  const total = entries.length;
  const totalUnits = entries.reduce((sum, e) => sum + (e.units || 0), 0);
  const delivered = entries.filter(
    (e) => e.badge.label === 'Delivered' || e.delivery.toLowerCase().includes('available'),
  ).length;
  const underConstruction = entries.filter(
    (e) =>
      e.status === 'under-construction',
  ).length;
  const pipeline = total - delivered;

  return { total, totalUnits, delivered, underConstruction, pipeline };
}

// ─── Year Axis Markers ──────────────────────────────────────────────────────

const YEAR_MARKERS = Array.from({ length: TOTAL_YEARS + 1 }, (_, i) => TIMELINE_START + i);

// ─── Phase Summary ──────────────────────────────────────────────────────────

interface PhaseSummary {
  label: string;
  count: number;
  color: string;
  icon: React.ReactNode;
}

function computePhases(entries: TimelineEntry[]): PhaseSummary[] {
  const deliveredCount = entries.filter(
    (e) => e.badge.label === 'Delivered' || e.delivery.toLowerCase().includes('available'),
  ).length;
  const thisYearCount = entries.filter((e) => e.badge.label === 'This Year').length;
  const nextYearCount = entries.filter((e) => e.badge.label === 'Next Year').length;
  const midTermCount = entries.filter((e) => e.badge.label.includes('Years') && !e.badge.label.includes('+')).length;
  const longTermCount = entries.filter((e) => e.badge.label.includes('+')).length;
  const tbdCount = entries.filter((e) => e.badge.label === 'TBD').length;

  const phases: PhaseSummary[] = [];

  if (deliveredCount > 0) {
    phases.push({ label: 'Delivered', count: deliveredCount, color: '#16A34A', icon: <CheckCircle2 className="h-4 w-4" /> });
  }
  if (thisYearCount > 0) {
    phases.push({ label: 'This Year', count: thisYearCount, color: '#16A34A', icon: <Calendar className="h-4 w-4" /> });
  }
  if (nextYearCount > 0) {
    phases.push({ label: '2027', count: nextYearCount, color: '#2563EB', icon: <HardHat className="h-4 w-4" /> });
  }
  if (midTermCount > 0) {
    phases.push({ label: '2028-2029', count: midTermCount, color: '#D97706', icon: <Building2 className="h-4 w-4" /> });
  }
  if (longTermCount > 0) {
    phases.push({ label: '2030+', count: longTermCount, color: '#7C3AED', icon: <Clock className="h-4 w-4" /> });
  }
  if (tbdCount > 0) {
    phases.push({ label: 'TBD', count: tbdCount, color: '#9CA3AF', icon: <Clock className="h-4 w-4" /> });
  }

  return phases;
}

// ─── Legend ──────────────────────────────────────────────────────────────────

const LEGEND_ITEMS = [
  { label: 'Delivered / This Year', color: '#16A34A' },
  { label: 'Next Year', color: '#2563EB' },
  { label: '2-3 Years', color: '#D97706' },
  { label: '4+ Years', color: '#7C3AED' },
  { label: 'TBD', color: '#9CA3AF' },
];

// ─── Swim Lane Row ──────────────────────────────────────────────────────────

function SwimLaneRow({ entry, index }: { entry: TimelineEntry; index: number }) {
  const isEven = index % 2 === 0;

  const nameContent = (
    <span className="text-sm font-heading font-semibold text-charcoal-900 group-hover:text-gold-700 transition-colors truncate">
      {entry.name}
    </span>
  );

  return (
    <motion.div
      variants={staggerItem}
      className={`group flex items-center gap-0 min-h-[48px] ${isEven ? 'bg-white' : 'bg-ivory-50/50'} rounded-lg`}
    >
      {/* Label column */}
      <div className="w-[160px] sm:w-[190px] flex-shrink-0 px-4 py-2.5 flex flex-col">
        {entry.hasPage ? (
          <Link href={`/developments/${entry.slug}`} className="hover:underline underline-offset-2 decoration-gold-500/40">
            {nameContent}
          </Link>
        ) : (
          nameContent
        )}
        <span className="text-[10px] font-body text-charcoal-400 truncate">{entry.location}</span>
      </div>

      {/* Timeline bar area */}
      <div className="flex-1 relative h-[48px] mr-4">
        {/* Year grid lines */}
        {YEAR_MARKERS.map((yr) => {
          const x = ((yr - TIMELINE_START) / TOTAL_YEARS) * 100;
          return (
            <div
              key={yr}
              className="absolute top-0 bottom-0 w-px bg-charcoal-100/50"
              style={{ left: `${x}%` }}
            />
          );
        })}

        {/* "Now" marker line */}
        <div
          className="absolute top-0 bottom-0 w-px bg-gold-500/40"
          style={{ left: `${NOW_PCT}%` }}
        />

        {entry.pct !== null ? (
          <>
            {/* Horizontal bar from "now" to delivery date */}
            <motion.div
              className="absolute top-1/2 -translate-y-1/2 h-2 rounded-full"
              style={{
                left: `${Math.min(NOW_PCT, entry.pct)}%`,
                backgroundColor: entry.badge.barColor,
              }}
              initial={{ width: 0 }}
              whileInView={{
                width: `${Math.abs(entry.pct - NOW_PCT)}%`,
              }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94], delay: index * 0.06 }}
            />

            {/* Delivery date dot */}
            <motion.div
              className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 z-10"
              style={{ left: `${entry.pct}%` }}
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.4, delay: 0.4 + index * 0.06 }}
            >
              <div
                className="h-4 w-4 rounded-full border-[2.5px] border-white shadow-sm"
                style={{ backgroundColor: entry.badge.color }}
              />
            </motion.div>

            {/* Delivery label (shows on hover or always for fewer entries) */}
            <div
              className="absolute top-1/2 translate-y-[14px] -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-20"
              style={{ left: `${entry.pct}%` }}
            >
              <span
                className="text-[10px] font-body font-semibold whitespace-nowrap px-1.5 py-0.5 rounded-md"
                style={{ color: entry.badge.color, backgroundColor: entry.badge.bgColor }}
              >
                {entry.delivery}
              </span>
            </div>
          </>
        ) : (
          /* TBD indicator */
          <div className="absolute inset-0 flex items-center justify-end pr-3">
            <span className="text-[10px] font-body font-medium text-charcoal-300 italic">
              TBD
            </span>
          </div>
        )}
      </div>

      {/* Delivery date column */}
      <div className="w-[100px] flex-shrink-0 pr-4 py-2 text-right">
        <span
          className="inline-flex items-center gap-1 text-xs font-body font-semibold px-2 py-0.5 rounded-full"
          style={{ color: entry.badge.color, backgroundColor: entry.badge.bgColor }}
        >
          {entry.delivery}
        </span>
      </div>
    </motion.div>
  );
}

// ─── Mobile Card ────────────────────────────────────────────────────────────

function MobileCard({ entry }: { entry: TimelineEntry }) {
  const cardContent = (
    <div
      className="bg-white rounded-xl p-4 shadow-sm border border-charcoal-100 border-l-4 hover:shadow-md transition-shadow"
      style={{ borderLeftColor: entry.badge.color }}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <h3 className="text-sm font-heading font-bold text-charcoal-900 truncate">
            {entry.name}
          </h3>
          <p className="text-xs font-body text-charcoal-400 mt-0.5 truncate">
            {entry.location}
          </p>
        </div>
        <span
          className="inline-flex items-center gap-1 text-[11px] font-body font-semibold px-2.5 py-1 rounded-full flex-shrink-0"
          style={{ color: entry.badge.color, backgroundColor: entry.badge.bgColor }}
        >
          <Calendar className="h-3 w-3" />
          {entry.delivery}
        </span>
      </div>

      {/* Mini stat bar */}
      <div className="flex items-center gap-3 mt-3 pt-2.5 border-t border-charcoal-50">
        {entry.units > 0 && (
          <span className="text-[11px] font-body text-charcoal-500">
            <span className="font-semibold text-charcoal-700">{entry.units}</span> units
          </span>
        )}
        {entry.statusLabel && (
          <span
            className="text-[10px] font-body font-semibold uppercase tracking-wide"
            style={{ color: entry.badge.color }}
          >
            {entry.statusLabel}
          </span>
        )}
        {entry.badge.label && entry.badge.label !== 'TBD' && entry.badge.label !== 'Delivered' && (
          <span className="text-[10px] font-body text-charcoal-400 ml-auto">
            {entry.badge.label}
          </span>
        )}
      </div>
    </div>
  );

  if (entry.hasPage) {
    return (
      <Link href={`/developments/${entry.slug}`}>
        {cardContent}
      </Link>
    );
  }
  return cardContent;
}

// ─── Main Component ─────────────────────────────────────────────────────────

export default function DeliveryTimeline() {
  const pinellasEntries = useMemo(() => prepareEntries('pinellas'), []);
  const stats = useMemo(() => computeStats(pinellasEntries), [pinellasEntries]);
  const phases = useMemo(() => computePhases(pinellasEntries), [pinellasEntries]);

  return (
    <section className="py-16 bg-ivory-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ── Section Header ── */}
        <motion.div
          className="text-center mb-10"
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          variants={fadeUp}
        >
          <p className="text-xs font-body font-semibold uppercase tracking-[0.25em] text-gold-600 mb-3">
            Project Pipeline
          </p>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-charcoal-900">
            Delivery Timeline
          </h2>
          <p className="mt-3 text-lg font-body text-charcoal-500 max-w-3xl mx-auto">
            Projected completion dates across the Pinellas new construction pipeline
          </p>
        </motion.div>

        {/* ── Pipeline Stats ── */}
        <motion.div
          className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8"
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          variants={staggerContainer}
        >
          {[
            { label: 'Total Projects', value: stats.total, icon: <Building2 className="h-4 w-4 text-charcoal-400" /> },
            { label: 'Total Units', value: stats.totalUnits.toLocaleString(), icon: <Building2 className="h-4 w-4 text-charcoal-400" /> },
            { label: 'Delivered', value: stats.delivered, icon: <CheckCircle2 className="h-4 w-4 text-emerald-500" /> },
            { label: 'In Pipeline', value: stats.pipeline, icon: <HardHat className="h-4 w-4 text-amber-500" /> },
          ].map((s) => (
            <motion.div
              key={s.label}
              variants={staggerItem}
              className="bg-white rounded-xl px-4 py-3 shadow-sm border border-charcoal-100 flex items-center gap-3"
            >
              <div className="flex-shrink-0 p-2 rounded-lg bg-ivory-50">
                {s.icon}
              </div>
              <div>
                <div className="text-xl font-heading font-bold text-charcoal-900">{s.value}</div>
                <div className="text-[10px] font-body font-semibold uppercase tracking-wider text-charcoal-400">{s.label}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* ── Desktop: Swim-Lane Timeline ── */}
        <motion.div
          className="hidden md:block bg-white rounded-xl shadow-sm border border-charcoal-100 overflow-hidden"
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          variants={staggerContainer}
        >
          {/* Year axis header */}
          <div className="flex items-center border-b border-charcoal-100 bg-charcoal-950">
            <div className="w-[160px] sm:w-[190px] flex-shrink-0 px-4 py-2.5">
              <span className="text-[10px] font-body font-semibold uppercase tracking-widest text-ivory-400">
                Development
              </span>
            </div>
            <div className="flex-1 relative h-9 mr-4">
              {YEAR_MARKERS.map((yr) => {
                const x = ((yr - TIMELINE_START) / TOTAL_YEARS) * 100;
                return (
                  <div
                    key={yr}
                    className="absolute top-0 bottom-0 flex flex-col items-center justify-center"
                    style={{ left: `${x}%`, transform: 'translateX(-50%)' }}
                  >
                    <span
                      className={`text-[10px] font-body font-semibold tracking-wide ${
                        yr === CURRENT_YEAR ? 'text-gold-400' : 'text-charcoal-400'
                      }`}
                    >
                      {yr}
                    </span>
                  </div>
                );
              })}
            </div>
            <div className="w-[100px] flex-shrink-0 pr-4 py-2 text-right">
              <span className="text-[10px] font-body font-semibold uppercase tracking-widest text-ivory-400">
                Delivery
              </span>
            </div>
          </div>

          {/* "Now" indicator label */}
          <div className="flex items-center">
            <div className="w-[160px] sm:w-[190px] flex-shrink-0" />
            <div className="flex-1 relative h-5 mr-4">
              <div
                className="absolute top-0 flex flex-col items-center"
                style={{ left: `${NOW_PCT}%`, transform: 'translateX(-50%)' }}
              >
                <span className="text-[8px] font-body font-bold uppercase tracking-widest text-gold-600 bg-gold-50 px-1.5 py-0.5 rounded-sm">
                  Now
                </span>
              </div>
            </div>
            <div className="w-[100px] flex-shrink-0" />
          </div>

          {/* Swim lane rows */}
          <div className="px-0 pb-2">
            {pinellasEntries.map((entry, i) => (
              <SwimLaneRow key={entry.slug} entry={entry} index={i} />
            ))}
          </div>

          {/* Legend */}
          <div className="flex items-center gap-5 px-4 py-2.5 border-t border-charcoal-100 bg-ivory-50/50">
            {LEGEND_ITEMS.map((item) => (
              <div key={item.label} className="flex items-center gap-1.5">
                <div
                  className="h-2.5 w-2.5 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-[10px] font-body text-charcoal-500 font-medium">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ── Mobile: Card List ── */}
        <motion.div
          className="md:hidden space-y-3"
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          variants={staggerContainer}
        >
          {pinellasEntries.map((entry) => (
            <motion.div key={entry.slug} variants={staggerItem}>
              <MobileCard entry={entry} />
            </motion.div>
          ))}
        </motion.div>

        {/* ── Phase Summary Cards ── */}
        <motion.div
          className="mt-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3"
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          variants={staggerContainer}
        >
          {phases.map((phase) => (
            <motion.div
              key={phase.label}
              variants={staggerItem}
              className="rounded-xl px-4 py-3.5 bg-white border border-charcoal-100 shadow-sm text-center"
            >
              <div
                className="inline-flex items-center justify-center h-8 w-8 rounded-lg mb-2"
                style={{ backgroundColor: `${phase.color}15`, color: phase.color }}
              >
                {phase.icon}
              </div>
              <div className="text-2xl font-heading font-bold text-charcoal-900">
                {phase.count}
              </div>
              <div className="text-[10px] font-body font-semibold uppercase tracking-wider text-charcoal-400">
                {phase.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* ─── Timeline Narrative ───────────────────────────────────────── */}
        <motion.div
          className="mt-10 rounded-xl bg-white border border-charcoal-100 shadow-sm p-6 md:p-8"
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          variants={fadeUp}
        >
          <h3 className="text-sm font-body font-semibold uppercase tracking-widest text-gold-600 mb-3">
            Pipeline Forecast
          </h3>
          <div className="space-y-3 text-sm font-body leading-relaxed text-charcoal-600">
            <p>
              <span className="font-semibold text-charcoal-900">The delivery wave is staggered, not simultaneous:</span> Art
              House (244 units) has delivered at 86.9% sold, 400 Central (301 units) is closing at 74.1% sold, and Reflection
              (88 units) is approaching sellout at 92%. Waldorf Astoria (163 units) remains in pre-sales with $175M+ secured.
              The <span className="font-semibold text-charcoal-900">delivery wave spans 2025–2027</span> with staggered
              absorption. Because these projects are absorbing at different
              rates, buyers have negotiating leverage right now that will tighten as inventory clears and attention
              shifts to pre-construction projects with 2028+ timelines.
            </p>
            <p>
              <span className="font-semibold text-charcoal-900">The mid-cycle gap matters:</span> After the
              current delivery wave, the pipeline thins — projects like Roche Bobois and The Cade are still in
              pre-construction with estimated deliveries in 2028–2029. This 18–24 month gap between delivery
              waves historically creates pricing inflection points as available inventory tightens before the
              next supply arrives.
            </p>
            <p>
              <span className="font-semibold text-charcoal-900">For realtors, timing is the variable:</span> Clients
              targeting move-in-ready units have a finite window with the current delivery cohort. Clients
              comfortable with a 2–3 year horizon can lock pre-construction pricing at projects like Roche
              Bobois ($800–$1,100/SF est.) before delivery-cycle comparables push asking prices higher. The
              swim-lane view above illustrates why &quot;when&quot; matters as much as &quot;what&quot; in this market.
            </p>
          </div>
          <p className="mt-4 text-xs font-body text-charcoal-400">
            Delivery estimates from developer disclosures and DBPR filings. Actual delivery dates subject to
            construction progress, permitting, and market conditions.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
