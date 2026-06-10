'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { fadeUp, defaultViewport } from '@/lib/animations';
import { trackedDevelopments } from '@/data/developments';
import { scoreDevelopments, scoreColor, gradeColor, type DevelopmentScores } from '@/lib/scoring';
import { ArrowUpDown, Filter } from 'lucide-react';

type SortKey = keyof DevelopmentScores;

const SCORE_COLUMNS: { key: SortKey; label: string; short: string }[] = [
  { key: 'buyerGrade', label: 'Grade', short: 'Grade' },
  { key: 'buyerScore', label: 'Buyer Score', short: 'Buyer' },
  { key: 'entryPrice', label: 'Entry Price', short: 'Price' },
  { key: 'psfValue', label: 'PSF Value', short: 'PSF' },
  { key: 'salesMomentum', label: 'Sales Momentum', short: 'Sales' },
  { key: 'hoaBurden', label: 'HOA Burden', short: 'HOA' },
  { key: 'brandPremium', label: 'Brand Premium', short: 'Brand' },
  { key: 'deliveryCertainty', label: 'Delivery Certainty', short: 'Delivery' },
  { key: 'investorFit', label: 'Investor Fit', short: 'Investor' },
  { key: 'commissionAppeal', label: 'Commission', short: 'Comm' },
];

function ScorePill({ score }: { score: number }) {
  return (
    <span
      className="inline-block px-2 py-0.5 rounded-sm text-xs font-body font-bold tabular-nums"
      style={{
        backgroundColor: `${scoreColor(score)}18`,
        color: scoreColor(score),
        border: `1px solid ${scoreColor(score)}30`,
      }}
    >
      {score.toFixed(1)}
    </span>
  );
}

function GradeBadge({ grade }: { grade: string }) {
  return (
    <span
      className="inline-block px-2.5 py-1 rounded-md text-sm font-heading font-bold"
      style={{
        backgroundColor: `${gradeColor(grade)}18`,
        color: gradeColor(grade),
        border: `1px solid ${gradeColor(grade)}40`,
      }}
    >
      {grade}
    </span>
  );
}

function fmtPrice(n: number): string {
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(1).replace(/\.0$/, '')}M`;
  if (n >= 1_000) return `$${Math.round(n / 1000)}K`;
  return `$${n.toLocaleString()}`;
}

export default function ComparisonMatrix() {
  const [sortKey, setSortKey] = useState<SortKey>('buyerScore');
  const [sortDesc, setSortDesc] = useState(true);
  const [countyFilter, setCountyFilter] = useState<string>('all');

  const allScores = useMemo(() => scoreDevelopments(trackedDevelopments), []);

  const filtered = useMemo(() => {
    let data = countyFilter === 'all'
      ? allScores
      : allScores.filter((d) => d.county === countyFilter);

    return [...data].sort((a, b) => {
      const aVal = a[sortKey];
      const bVal = b[sortKey];
      if (typeof aVal === 'number' && typeof bVal === 'number') {
        return sortDesc ? bVal - aVal : aVal - bVal;
      }
      return sortDesc
        ? String(bVal).localeCompare(String(aVal))
        : String(aVal).localeCompare(String(bVal));
    });
  }, [allScores, sortKey, sortDesc, countyFilter]);

  const handleSort = (key: SortKey) => {
    if (key === sortKey) {
      setSortDesc(!sortDesc);
    } else {
      setSortKey(key);
      setSortDesc(true);
    }
  };

  return (
    <section className="py-16 bg-charcoal-950" id="comparison-matrix">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          className="mb-8"
        >
          <p className="text-xs font-body font-semibold uppercase tracking-[0.25em] text-gold-500 mb-2">
            Proprietary Analytics
          </p>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-ivory-50 mb-3">
            Development Scorecard Matrix
          </h2>
          <p className="text-sm font-body text-charcoal-400 max-w-2xl">
            Every building scored on 10 dimensions — computed from live MLS data, not estimates.
            Click any column header to sort. Scores auto-update when underlying data changes.
          </p>
        </motion.div>

        {/* Filters */}
        <div className="flex items-center gap-3 mb-6">
          <Filter className="h-4 w-4 text-charcoal-500" />
          {['all', 'pinellas', 'hillsborough'].map((county) => (
            <button
              key={county}
              onClick={() => setCountyFilter(county)}
              className={`px-3 py-1.5 rounded-sm text-xs font-body font-semibold uppercase tracking-wider transition-all ${
                countyFilter === county
                  ? 'bg-gold-500 text-charcoal-900'
                  : 'bg-charcoal-800 text-charcoal-400 hover:text-ivory-200'
              }`}
            >
              {county === 'all' ? 'All Counties' : county === 'pinellas' ? 'Pinellas' : 'Hillsborough'}
            </button>
          ))}
          <span className="ml-auto text-xs font-body text-charcoal-600">
            {filtered.length} buildings scored
          </span>
        </div>

        {/* Scrollable Table */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          className="overflow-x-auto rounded-xl border border-charcoal-700/50"
        >
          <table className="w-full min-w-[900px]">
            <thead>
              <tr className="bg-charcoal-900/80">
                <th className="sticky left-0 z-10 bg-charcoal-900 px-4 py-3 text-left text-[10px] font-body font-semibold uppercase tracking-wider text-charcoal-400 border-b border-charcoal-700/50">
                  Building
                </th>
                <th className="px-3 py-3 text-center text-[10px] font-body font-semibold uppercase tracking-wider text-charcoal-400 border-b border-charcoal-700/50">
                  Entry
                </th>
                <th className="px-3 py-3 text-center text-[10px] font-body font-semibold uppercase tracking-wider text-charcoal-400 border-b border-charcoal-700/50">
                  $/SF
                </th>
                <th className="px-3 py-3 text-center text-[10px] font-body font-semibold uppercase tracking-wider text-charcoal-400 border-b border-charcoal-700/50">
                  Sold
                </th>
                {SCORE_COLUMNS.map((col) => (
                  <th
                    key={col.key}
                    className="px-2 py-3 text-center text-[10px] font-body font-semibold uppercase tracking-wider text-charcoal-400 border-b border-charcoal-700/50 cursor-pointer hover:text-gold-400 transition-colors select-none"
                    onClick={() => handleSort(col.key)}
                  >
                    <div className="flex items-center justify-center gap-1">
                      {col.short}
                      {sortKey === col.key && (
                        <ArrowUpDown className="h-3 w-3 text-gold-500" />
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((dev, i) => (
                <tr
                  key={dev.slug}
                  className={`${i % 2 === 0 ? 'bg-charcoal-900/40' : 'bg-charcoal-900/20'} hover:bg-charcoal-800/60 transition-colors`}
                >
                  {/* Building name — sticky */}
                  <td className="sticky left-0 z-10 bg-inherit px-4 py-3 border-b border-charcoal-800/30">
                    <a
                      href={`/developments/${dev.slug}`}
                      className="text-sm font-heading font-bold text-ivory-100 hover:text-gold-400 transition-colors"
                    >
                      {dev.name}
                    </a>
                    <p className="text-[10px] font-body text-charcoal-500 capitalize">{dev.county}</p>
                  </td>

                  {/* Raw data columns */}
                  <td className="px-3 py-3 text-center text-xs font-body text-ivory-200 tabular-nums border-b border-charcoal-800/30">
                    {dev.entryPriceRaw > 0 ? fmtPrice(dev.entryPriceRaw) : '—'}
                  </td>
                  <td className="px-3 py-3 text-center text-xs font-body text-ivory-200 tabular-nums border-b border-charcoal-800/30">
                    {dev.psfRaw > 0 ? `$${dev.psfRaw.toLocaleString()}` : '—'}
                  </td>
                  <td className="px-3 py-3 text-center text-xs font-body text-ivory-200 tabular-nums border-b border-charcoal-800/30">
                    {dev.soldPctRaw > 0 ? `${dev.soldPctRaw}%` : '—'}
                  </td>

                  {/* Score columns */}
                  {SCORE_COLUMNS.map((col) => (
                    <td key={col.key} className="px-2 py-3 text-center border-b border-charcoal-800/30">
                      {col.key === 'buyerGrade' ? (
                        <GradeBadge grade={dev.buyerGrade} />
                      ) : (
                        <ScorePill score={dev[col.key] as number} />
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>

        {/* Legend */}
        <div className="flex flex-wrap items-center gap-4 mt-4 text-[10px] font-body text-charcoal-500">
          <span className="uppercase tracking-wider">Score Scale:</span>
          {[
            { range: '8-10', color: '#10B981', label: 'Strong' },
            { range: '6-7.9', color: '#F59E0B', label: 'Moderate' },
            { range: '4-5.9', color: '#F97316', label: 'Weak' },
            { range: '1-3.9', color: '#EF4444', label: 'Risk' },
          ].map((tier) => (
            <div key={tier.range} className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full" style={{ backgroundColor: tier.color }} />
              <span>{tier.range} = {tier.label}</span>
            </div>
          ))}
        </div>

        <p className="mt-3 text-[10px] font-body text-charcoal-600 italic">
          Scores computed from live data: MLS listings, PCPAO records, developer disclosures. Entry Price and PSF Value
          scored relative to Tampa Bay market median. HOA Burden inverse-scored against market average. Updated {new Date().toLocaleDateString()}.
        </p>
      </div>
    </section>
  );
}
