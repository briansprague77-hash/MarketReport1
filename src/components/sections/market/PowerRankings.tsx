'use client';

import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { fadeUp, defaultViewport } from '@/lib/animations';
import type { MarketData } from '@/hooks/useMarketData';
import type { DevelopmentSummary } from '@/data/developments';
import TimingWindowBadge from '@/components/ui/TimingWindowBadge';
import { computeCollisionScores, getAverageCollisionScore } from '@/lib/collision';
import { ChevronUp, ChevronDown } from 'lucide-react';

interface PowerRankingsProps {
  data?: MarketData;
}

// ─── Sort Configuration ─────────────────────────────────────────────────────

type SortKey = 'rank' | 'name' | 'status' | 'units' | 'avgPsf' | 'pressure' | 'collision' | 'submarket';

const PRESSURE_ORDER: Record<string, number> = {
  high: 3,
  medium: 2,
  low: 1,
};

interface RankedDevelopment extends DevelopmentSummary {
  collisionRisk: number;
}

// ─── Pressure Badge ─────────────────────────────────────────────────────────

function PressureBadge({ pressure }: { pressure?: 'high' | 'medium' | 'low' }) {
  if (!pressure) {
    return <span className="text-[11px] font-body text-charcoal-600">—</span>;
  }
  const styles: Record<string, string> = {
    high: 'bg-red-500/15 text-red-400 border-red-500/30',
    medium: 'bg-amber-500/15 text-amber-400 border-amber-500/30',
    low: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
  };
  return (
    <span className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-semibold capitalize ${styles[pressure]}`}>
      {pressure}
    </span>
  );
}

// ─── Component ──────────────────────────────────────────────────────────────

export default function PowerRankings({ data }: PowerRankingsProps) {
  const filtered = data?.filtered ?? [];
  const geoLabel = data?.geoLabel ?? 'Tampa Bay';

  const [sortKey, setSortKey] = useState<SortKey>('avgPsf');
  const [sortAsc, setSortAsc] = useState(false);

  // Compute collision scores for all filtered developments
  const collisionScores = useMemo(
    () => computeCollisionScores(filtered),
    [filtered],
  );

  // Enrich each development with collision risk
  const ranked: RankedDevelopment[] = useMemo(
    () =>
      filtered.map((d) => ({
        ...d,
        collisionRisk: getAverageCollisionScore(d.slug, collisionScores),
      })),
    [filtered, collisionScores],
  );

  // Sort
  const sorted = useMemo(() => {
    const arr = [...ranked];
    arr.sort((a, b) => {
      let cmp = 0;
      switch (sortKey) {
        case 'name':
          cmp = a.name.localeCompare(b.name);
          break;
        case 'status':
          cmp = a.status.localeCompare(b.status);
          break;
        case 'units':
          cmp = a.units - b.units;
          break;
        case 'avgPsf':
          cmp = (a.avgPsf ?? 0) - (b.avgPsf ?? 0);
          break;
        case 'pressure':
          cmp = (PRESSURE_ORDER[a.inventoryPressure ?? ''] ?? 0) - (PRESSURE_ORDER[b.inventoryPressure ?? ''] ?? 0);
          break;
        case 'collision':
          cmp = a.collisionRisk - b.collisionRisk;
          break;
        case 'submarket':
          cmp = (a.submarket ?? '').localeCompare(b.submarket ?? '');
          break;
        default:
          cmp = (a.avgPsf ?? 0) - (b.avgPsf ?? 0);
      }
      return sortAsc ? cmp : -cmp;
    });
    return arr;
  }, [ranked, sortKey, sortAsc]);

  // Top 3 indices for gold highlight
  const top3Slugs = useMemo(
    () => new Set(sorted.slice(0, 3).map((d) => d.slug)),
    [sorted],
  );

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortAsc(!sortAsc);
    } else {
      setSortKey(key);
      setSortAsc(false);
    }
  };

  if (filtered.length === 0) return null;

  const SortHeader = ({ label, column, className = '' }: { label: string; column: SortKey; className?: string }) => (
    <th
      className={`px-3 py-3 text-left text-[11px] font-body font-semibold uppercase tracking-wider text-charcoal-600 cursor-pointer hover:text-gold-400 transition-colors select-none ${className}`}
      onClick={() => handleSort(column)}
    >
      <span className="inline-flex items-center gap-1">
        {label}
        {sortKey === column && (
          sortAsc ? <ChevronUp className="w-3 h-3 text-gold-400" /> : <ChevronDown className="w-3 h-3 text-gold-400" />
        )}
      </span>
    </th>
  );

  return (
    <section className="section-padding bg-ivory-50">
      <div className="container-luxury">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          variants={fadeUp}
        >
          {/* Header */}
          <div className="mb-8">
            <p className="text-xs font-body font-semibold uppercase tracking-[0.3em] text-gold-600 mb-2">
              Pipeline Intelligence
            </p>
            <h2 className="text-2xl md:text-3xl font-heading font-bold text-charcoal-900 mb-3">
              Pipeline Power Rankings — {geoLabel}
            </h2>
            <p className="text-sm font-body text-charcoal-600 max-w-3xl leading-relaxed">
              Every tracked development ranked by price positioning, competitive pressure, and market timing.
              Click any column header to re-sort. Top 3 highlighted with gold border.
            </p>
          </div>

          {/* Table */}
          <div className="overflow-x-auto -mx-4 px-4">
            <table className="min-w-full">
              <thead>
                <tr className="border-b-2 border-charcoal-200">
                  <SortHeader label="#" column="rank" className="w-10" />
                  <SortHeader label="Development" column="name" />
                  <SortHeader label="Status" column="status" />
                  <SortHeader label="Units" column="units" />
                  <SortHeader label="Avg PSF" column="avgPsf" />
                  <SortHeader label="Inventory" column="pressure" />
                  <SortHeader label="Collision" column="collision" />
                  <SortHeader label="Submarket" column="submarket" />
                </tr>
              </thead>
              <tbody>
                {sorted.map((dev, i) => {
                  const isTop3 = top3Slugs.has(dev.slug);
                  return (
                    <tr
                      key={dev.slug}
                      className={`
                        border-b border-charcoal-200/50 transition-colors hover:bg-gold-50/50
                        ${isTop3 ? 'border-l-2 border-l-gold-500 bg-gold-50/30' : ''}
                      `}
                    >
                      {/* Rank */}
                      <td className="px-3 py-3">
                        <span className={`text-sm font-heading font-bold ${isTop3 ? 'text-gold-600' : 'text-charcoal-400'}`}>
                          {i + 1}
                        </span>
                      </td>

                      {/* Name */}
                      <td className="px-3 py-3">
                        <span className="text-sm font-body font-semibold text-charcoal-900">
                          {dev.name}
                        </span>
                      </td>

                      {/* Status + Timing Window */}
                      <td className="px-3 py-3">
                        <TimingWindowBadge dev={dev} />
                      </td>

                      {/* Units */}
                      <td className="px-3 py-3">
                        <span className="text-sm font-body text-charcoal-700">
                          {dev.units}
                        </span>
                      </td>

                      {/* Avg PSF */}
                      <td className="px-3 py-3">
                        <span className="text-sm font-body font-semibold text-charcoal-900">
                          {dev.avgPsf ? `$${dev.avgPsf.toLocaleString()}` : '—'}
                        </span>
                      </td>

                      {/* Inventory Pressure */}
                      <td className="px-3 py-3">
                        <PressureBadge pressure={dev.inventoryPressure} />
                      </td>

                      {/* Collision Risk */}
                      <td className="px-3 py-3">
                        <span
                          className={`text-sm font-body font-semibold ${
                            dev.collisionRisk > 40
                              ? 'text-red-600'
                              : dev.collisionRisk > 25
                              ? 'text-amber-600'
                              : 'text-charcoal-500'
                          }`}
                        >
                          {dev.collisionRisk}
                        </span>
                      </td>

                      {/* Submarket */}
                      <td className="px-3 py-3">
                        <span className="text-[11px] font-body text-charcoal-500 capitalize">
                          {dev.submarket ?? dev.county}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
