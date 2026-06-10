'use client';

import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { fadeUp, defaultViewport } from '@/lib/animations';
import {
  trackedDevelopments,
  type DevelopmentSummary,
} from '@/data/developments';
import { statusBadgeConfig, countyLabels } from '@/data/market';
import type { County } from '@/types/development';

// ─── Status sort order (pipeline progression) ────────────────────────────────
const STATUS_ORDER: Record<string, number> = {
  'reservation': 0,
  'pre-sales': 1,
  'under-construction': 2,
  'delivered': 3,
  'sold-out': 4,
};

// ─── Row definitions ─────────────────────────────────────────────────────────
type RowItem =
  | { kind: 'category'; label: string }
  | { kind: 'metric'; label: string; key: string; align: 'left' | 'right' | 'center'; format: (dev: DevelopmentSummary) => React.ReactNode };

function formatCurrency(n: number | undefined): string {
  if (!n) return '—';
  return `$${n.toLocaleString()}`;
}

function formatPercent(n: number | undefined): string {
  if (n === undefined || n === null) return '—';
  return `${n}%`;
}

function formatUnits(n: number): string {
  if (!n) return '—';
  return n.toLocaleString();
}

function formatStories(n: number | undefined): string {
  if (!n) return '—';
  return n.toLocaleString();
}

// ─── Delivery Timeline Badge ────────────────────────────────────────────────

interface DeliveryBadge {
  label: string;
  color: string;
  bgColor: string;
  /** Relative descriptor shown below the date */
  proximity?: string;
}

const CURRENT_YEAR = 2026;

function getDeliveryBadge(delivery: string | undefined): DeliveryBadge | null {
  if (!delivery || delivery === '—') return null;

  const lower = delivery.toLowerCase().trim();

  // ── Available Now / Delivered ──
  if (lower.includes('available') || lower.includes('delivered') || lower.includes('move-in')) {
    return {
      label: delivery,
      color: '#16A34A',
      bgColor: 'rgba(22,163,74,0.12)',
      proximity: 'Now',
    };
  }

  // ── TBD / Unknown ──
  if (lower === 'tbd' || lower === 'to be determined') {
    return {
      label: 'TBD',
      color: '#9CA3AF',
      bgColor: 'rgba(156,163,175,0.12)',
    };
  }

  // ── Extract year from string (e.g. "Q3 2026", "2027", "Q4 2030") ──
  const yearMatch = delivery.match(/\b(20\d{2})\b/);
  if (!yearMatch) {
    return {
      label: delivery,
      color: '#6B7280',
      bgColor: 'rgba(107,114,128,0.10)',
    };
  }

  const year = parseInt(yearMatch[1], 10);
  const delta = year - CURRENT_YEAR;

  // This year (2026)
  if (delta <= 0) {
    return {
      label: delivery,
      color: '#16A34A',
      bgColor: 'rgba(22,163,74,0.12)',
      proximity: delta === 0 ? 'This Year' : 'Imminent',
    };
  }

  // Next year (2027)
  if (delta === 1) {
    return {
      label: delivery,
      color: '#2563EB',
      bgColor: 'rgba(37,99,235,0.12)',
      proximity: 'Next Year',
    };
  }

  // 2–3 years out (2028–2029)
  if (delta <= 3) {
    return {
      label: delivery,
      color: '#D97706',
      bgColor: 'rgba(217,119,6,0.12)',
      proximity: `${delta} Years`,
    };
  }

  // 4+ years out (2030+)
  return {
    label: delivery,
    color: '#7C3AED',
    bgColor: 'rgba(124,58,237,0.12)',
    proximity: `${delta}+ Years`,
  };
}

// ─── 21-Row Comparison Grid ─────────────────────────────────────────────────
function buildRows(): RowItem[] {
  return [
    // ── Overview ──────────────────────────────────────────────────
    { kind: 'category', label: 'Overview' },
    {
      kind: 'metric',
      label: 'Sales Status',
      key: 'status',
      align: 'center',
      format: (d) => {
        const badge = statusBadgeConfig[d.status];
        return (
          <span
            className="inline-block whitespace-nowrap rounded-full px-2.5 py-0.5 text-[11px] font-semibold leading-tight"
            style={{ color: badge.color, backgroundColor: badge.bgColor }}
          >
            {badge.label}
          </span>
        );
      },
    },
    {
      kind: 'metric',
      label: '% Sold / Reserved',
      key: 'soldPercent',
      align: 'right',
      format: (d) => formatPercent(d.soldPercent),
    },

    // ── Location & Team ──────────────────────────────────────────
    { kind: 'category', label: 'Location & Team' },
    {
      kind: 'metric',
      label: 'Address',
      key: 'address',
      align: 'left',
      format: (d) => d.address || '—',
    },
    {
      kind: 'metric',
      label: 'Location',
      key: 'location',
      align: 'left',
      format: (d) => d.location || '—',
    },
    {
      kind: 'metric',
      label: 'Developer',
      key: 'developer',
      align: 'left',
      format: (d) => d.developer || '—',
    },
    {
      kind: 'metric',
      label: 'Architect',
      key: 'architect',
      align: 'left',
      format: (d) => d.architect || '—',
    },

    // ── Building ─────────────────────────────────────────────────
    { kind: 'category', label: 'Building' },
    {
      kind: 'metric',
      label: 'Number of Units',
      key: 'units',
      align: 'right',
      format: (d) => formatUnits(d.units),
    },
    {
      kind: 'metric',
      label: 'Number of Stories',
      key: 'stories',
      align: 'right',
      format: (d) => formatStories(d.stories),
    },
    {
      kind: 'metric',
      label: 'Est. Completion',
      key: 'delivery',
      align: 'center',
      format: (d) => {
        const badge = getDeliveryBadge(d.delivery);
        if (!badge) return '—';
        return (
          <span className="inline-flex flex-col items-center gap-0.5">
            <span
              className="inline-block whitespace-nowrap rounded-full px-2.5 py-0.5 text-[11px] font-semibold leading-tight"
              style={{ color: badge.color, backgroundColor: badge.bgColor }}
            >
              {badge.label}
            </span>
            {badge.proximity && (
              <span
                className="text-[9px] font-body font-medium uppercase tracking-wider leading-none"
                style={{ color: badge.color, opacity: 0.7 }}
              >
                {badge.proximity}
              </span>
            )}
          </span>
        );
      },
    },

    // ── Unit Details ─────────────────────────────────────────────
    { kind: 'category', label: 'Unit Details' },
    {
      kind: 'metric',
      label: 'Unit Type Range',
      key: 'bedrooms',
      align: 'left',
      format: (d) => (d.bedrooms ? `${d.bedrooms} BR` : '—'),
    },
    {
      kind: 'metric',
      label: 'Unit Size Range',
      key: 'sqft',
      align: 'right',
      format: (d) => d.sqft || '—',
    },

    // ── Pricing ──────────────────────────────────────────────────
    { kind: 'category', label: 'Pricing' },
    {
      kind: 'metric',
      label: 'Price Range',
      key: 'price',
      align: 'right',
      format: (d) => d.price || '—',
    },
    {
      kind: 'metric',
      label: 'Avg Price / SF',
      key: 'avgPsf',
      align: 'right',
      format: (d) => formatCurrency(d.avgPsf),
    },
    {
      kind: 'metric',
      label: 'Starting Price (Studio)',
      key: 'studioPrice',
      align: 'right',
      format: (d) => d.studioPrice || '—',
    },
    {
      kind: 'metric',
      label: 'Starting Price (1 BR)',
      key: 'oneBedPrice',
      align: 'right',
      format: (d) => d.oneBedPrice || '—',
    },
    {
      kind: 'metric',
      label: 'Starting Price (2 BR)',
      key: 'twoBedPrice',
      align: 'right',
      format: (d) => d.twoBedPrice || '—',
    },
    {
      kind: 'metric',
      label: 'Starting Price (3 BR)',
      key: 'threeBedPrice',
      align: 'right',
      format: (d) => d.threeBedPrice || '—',
    },
    {
      kind: 'metric',
      label: 'Starting Price (4 BR+)',
      key: 'fourBedPlusPrice',
      align: 'right',
      format: (d) => d.fourBedPlusPrice || '—',
    },

    // ── Policies ─────────────────────────────────────────────────
    { kind: 'category', label: 'Policies' },
    {
      kind: 'metric',
      label: 'Rental Policy',
      key: 'rentalPolicy',
      align: 'left',
      format: (d) => d.rentalPolicy || '—',
    },
    {
      kind: 'metric',
      label: 'Outside Broker Commission',
      key: 'brokerCommission',
      align: 'left',
      format: (d) => d.brokerCommission || '—',
    },
    {
      kind: 'metric',
      label: 'Type',
      key: 'type',
      align: 'left',
      format: (d) => d.type || '—',
    },
  ];
}

// ─── Component ───────────────────────────────────────────────────────────────
interface ComparisonTableProps {
  developments?: DevelopmentSummary[];
}

export default function ComparisonTable({ developments }: ComparisonTableProps) {
  const source = developments ?? trackedDevelopments;

  // Group and sort developments by county
  const grouped = useMemo(() => {
    const counties: County[] = ['pinellas', 'hillsborough', 'sarasota'];
    return counties.map((county) => ({
      county,
      label: countyLabels[county],
      developments: source
        .filter((d) => d.county === county)
        .sort(
          (a, b) =>
            (STATUS_ORDER[a.status] ?? 99) - (STATUS_ORDER[b.status] ?? 99),
        ),
    }));
  }, [source]);

  // Flatten for column rendering
  const allDevs = useMemo(
    () => grouped.flatMap((g) => g.developments),
    [grouped],
  );

  const rows = useMemo(() => buildRows(), []);

  // Determine which column indices belong to each county group
  const columnGroups = useMemo(() => {
    let offset = 0;
    return grouped.map((g) => {
      const start = offset;
      offset += g.developments.length;
      return { ...g, startIdx: start, count: g.developments.length };
    });
  }, [grouped]);

  const totalCols = allDevs.length + 1; // +1 for sticky label column
  const isWaldorf = (dev: DevelopmentSummary) =>
    dev.slug === 'waldorf-astoria';

  // Precompute metric-row stripe indices (skip category rows for striping)
  const metricIndices = useMemo(() => {
    let idx = 0;
    return rows.map((r) => (r.kind === 'metric' ? idx++ : -1));
  }, [rows]);

  return (
    <section className="py-16 bg-ivory-50">
      <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          className="text-center mb-10"
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          variants={fadeUp}
        >
          <p className="text-xs font-body font-semibold uppercase tracking-[0.25em] text-gold-600 mb-3">
            Pipeline at a Glance
          </p>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-charcoal-900">
            Development Comparison
          </h2>
          <p className="mt-3 text-sm font-body text-charcoal-500 max-w-xl mx-auto">
            All {allDevs.length} tracked developments across Pinellas,
            Hillsborough &amp; Sarasota counties. Scroll horizontally to compare.
          </p>
        </motion.div>

        {/* Table card */}
        <motion.div
          className="bg-white rounded-xl shadow-sm border border-charcoal-100 overflow-hidden"
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          variants={fadeUp}
        >
          <div className="overflow-x-auto">
            <table
              className="w-full border-collapse"
              style={{ minWidth: allDevs.length * 150 + 160 }}
            >
              {/* Column sizing */}
              <colgroup>
                <col className="w-44" />
                {allDevs.map((dev) => (
                  <col key={dev.slug} style={{ minWidth: 140 }} />
                ))}
              </colgroup>

              <thead>
                {/* County group header row */}
                <tr className="border-b border-charcoal-200">
                  <th
                    className="sticky left-0 z-20 bg-charcoal-50 border-r border-charcoal-200 px-4 py-2"
                    aria-label="County group"
                  />
                  {columnGroups.map((group) => (
                    <th
                      key={group.county}
                      colSpan={group.count}
                      className="bg-charcoal-50 px-4 py-2.5 text-left border-l-4 border-l-gold-600"
                    >
                      <span className="text-[11px] font-body font-bold uppercase tracking-[0.2em] text-charcoal-600">
                        {group.label}
                      </span>
                      <span className="ml-2 text-[11px] font-body text-charcoal-400">
                        ({group.count})
                      </span>
                    </th>
                  ))}
                </tr>

                {/* Development names row */}
                <tr className="bg-charcoal-950">
                  <th className="sticky left-0 z-20 bg-charcoal-950 border-r border-charcoal-800 px-4 py-3 text-left">
                    <span className="text-[11px] font-body font-semibold uppercase tracking-[0.15em] text-charcoal-400">
                      Development
                    </span>
                  </th>
                  {allDevs.map((dev) => (
                    <th
                      key={dev.slug}
                      className={`px-3 py-3 text-center ${
                        isWaldorf(dev) ? 'bg-gold-700' : ''
                      }`}
                    >
                      {dev.hasPage ? (
                        <a
                          href={`/developments/${dev.slug}`}
                          className={`text-xs font-heading font-bold leading-tight transition-colors ${
                            isWaldorf(dev)
                              ? 'text-white hover:text-gold-100'
                              : 'text-ivory-50 hover:text-gold-400'
                          }`}
                        >
                          {dev.name}
                        </a>
                      ) : (
                        <span className="text-xs font-heading font-bold text-charcoal-400 leading-tight">
                          {dev.name}
                        </span>
                      )}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {rows.map((row, rowIdx) => {
                  // ── Category sub-header row ──
                  if (row.kind === 'category') {
                    return (
                      <tr
                        key={`cat-${row.label}`}
                        className="bg-charcoal-50 border-b border-charcoal-100"
                      >
                        <td
                          colSpan={totalCols}
                          className="sticky left-0 z-10 px-4 py-2"
                        >
                          <span className="text-[10px] font-body font-semibold uppercase tracking-[0.25em] text-charcoal-400">
                            {row.label}
                          </span>
                        </td>
                      </tr>
                    );
                  }

                  // ── Metric data row ──
                  const currentMetricIdx = metricIndices[rowIdx];
                  const stripeBg =
                    currentMetricIdx % 2 === 0 ? 'bg-ivory-50' : 'bg-white';

                  return (
                    <tr
                      key={row.key}
                      className={`${stripeBg} border-b border-charcoal-50`}
                    >
                      {/* Sticky label column */}
                      <td
                        className={`sticky left-0 z-10 ${stripeBg} border-r border-charcoal-100 px-4 py-2.5`}
                      >
                        <span className="text-[11px] font-body font-semibold uppercase tracking-[0.15em] text-charcoal-500 whitespace-nowrap">
                          {row.label}
                        </span>
                      </td>
                      {/* Data cells */}
                      {allDevs.map((dev) => {
                        const value = row.format(dev);
                        const isEmpty = value === '—' || value === 'TBD';
                        return (
                          <td
                            key={dev.slug}
                            className={`px-3 py-2.5 ${
                              row.align === 'right'
                                ? 'text-right'
                                : row.align === 'center'
                                  ? 'text-center'
                                  : 'text-left'
                            } ${isWaldorf(dev) ? 'bg-gold-50/30' : ''}`}
                          >
                            <span
                              className={`text-xs font-body ${
                                isEmpty
                                  ? 'text-charcoal-300'
                                  : 'text-charcoal-700'
                              }`}
                            >
                              {value}
                            </span>
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Footer note */}
          <div className="px-6 py-3 bg-charcoal-50 border-t border-charcoal-100">
            <p className="text-[11px] font-body text-charcoal-400">
              Sources: Developer disclosures, Stellar MLS, proprietary broker
              research. Hillsborough &amp; Sarasota data is preliminary — full
              profiles forthcoming. &quot;—&quot; indicates data not yet confirmed.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
