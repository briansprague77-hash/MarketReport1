'use client';

import { Fragment, useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Development, UnitPricingLedger, PriceTrend, UnitStatus } from '@/types/development';
import SectionHeader from '@/components/ui/SectionHeader';
import {
  fadeUp,
  staggerContainer,
  staggerItem,
  defaultViewport,
} from '@/lib/animations';

interface PricingLadderProps {
  development: Development;
}

type SortField = 'unit' | 'floor' | 'price' | 'psfLiving' | 'residenceType';
type SortDir = 'asc' | 'desc';
type FilterResidence = 'all' | string;

const formatPrice = (n: number) =>
  '$' + n.toLocaleString('en-US', { maximumFractionDigits: 0 });

const formatPsf = (n: number) =>
  '$' + n.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 });

const trendIcon = (trend: PriceTrend) => {
  switch (trend) {
    case 'up':
      return '▲';
    case 'down':
      return '▼';
    case 'stable':
      return '●';
    case 'new':
      return '★';
  }
};

const trendColor = (trend: PriceTrend) => {
  switch (trend) {
    case 'up':
      return 'text-emerald-600';
    case 'down':
      return 'text-red-500';
    case 'stable':
      return 'text-charcoal-400';
    case 'new':
      return 'text-gold-600';
  }
};

const trendLabel = (trend: PriceTrend, pct?: number) => {
  switch (trend) {
    case 'up':
      return `+${pct?.toFixed(1)}%`;
    case 'down':
      return `${pct?.toFixed(1)}%`;
    case 'stable':
      return 'No Change';
    case 'new':
      return 'New Entry';
  }
};

const statusBadge = (status?: string) => {
  if (!status) return null;
  const colors: Record<string, string> = {
    available: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    active: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    'under-contract': 'bg-amber-50 text-amber-700 border-amber-200',
    pending: 'bg-amber-50 text-amber-700 border-amber-200',
    sold: 'bg-charcoal-100 text-charcoal-600 border-charcoal-200',
    closed: 'bg-charcoal-100 text-charcoal-600 border-charcoal-200',
    withdrawn: 'bg-red-50 text-red-600 border-red-200',
    expired: 'bg-charcoal-50 text-charcoal-400 border-charcoal-200',
  };
  const labels: Record<string, string> = {
    'under-contract': 'Under Contract',
  };
  return (
    <span
      className={`inline-block px-2 py-0.5 text-[10px] font-body font-semibold uppercase tracking-wider rounded border ${
        colors[status] || 'bg-charcoal-50 text-charcoal-500 border-charcoal-200'
      }`}
    >
      {labels[status] || status}
    </span>
  );
};

export default function PricingLadder({ development }: PricingLadderProps) {
  const ladder = development.pricingLadder;

  // ── Hooks MUST run unconditionally on every render — declare them first,
  // then early-return below when data is missing.
  const [sortField, setSortField] = useState<SortField>('floor');
  const [sortDir, setSortDir] = useState<SortDir>('asc');
  const [filterRes, setFilterRes] = useState<FilterResidence>('all');
  const [expandedUnit, setExpandedUnit] = useState<string | null>(null);

  // Unique residence types for filter
  const residenceTypes = useMemo(() => {
    if (!ladder) return [] as string[];
    const types = new Set(ladder.units.map((u) => u.residenceType));
    return Array.from(types).sort();
  }, [ladder]);

  // Sorted + filtered units
  const sortedUnits = useMemo(() => {
    if (!ladder) return [];
    let units = [...ladder.units];

    // Filter
    if (filterRes !== 'all') {
      units = units.filter((u) => u.residenceType === filterRes);
    }

    // Sort
    units.sort((a, b) => {
      let cmp = 0;
      switch (sortField) {
        case 'unit':
          cmp = a.unit.localeCompare(b.unit);
          break;
        case 'floor':
          cmp = a.floor - b.floor;
          break;
        case 'price':
          cmp = a.currentPrice - b.currentPrice;
          break;
        case 'psfLiving':
          cmp = a.currentPsfLiving - b.currentPsfLiving;
          break;
        case 'residenceType':
          cmp = a.residenceType.localeCompare(b.residenceType);
          break;
      }
      return sortDir === 'asc' ? cmp : -cmp;
    });

    return units;
  }, [ladder, sortField, sortDir, filterRes]);

  if (!ladder) return null;

  const toggleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortField(field);
      setSortDir('asc');
    }
  };

  const sortIndicator = (field: SortField) => {
    if (sortField !== field) return '';
    return sortDir === 'asc' ? ' ↑' : ' ↓';
  };

  // Stats
  const mlsUnits = ladder.units.filter(
    (u) => u.priceHistory.some((h) => h.source === 'mls-listing')
  );
  const unitsWithTrend = ladder.units.filter((u) => u.trend === 'up' || u.trend === 'down');
  const activeListings = mlsUnits.filter(
    (u) => u.priceHistory[u.priceHistory.length - 1]?.status === 'active'
  );

  return (
    <section id="pricing-ladder" className="section-padding bg-white">
      <div className="container-luxury">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
        >
          <SectionHeader
            eyebrow="Price Intelligence"
            title="Unit Pricing Ladder"
            subtitle="Append-only pricing ledger tracking every known price point across all 6 residence types — sourced from developer sheets, MLS listings, and broker reports."
          />
        </motion.div>

        {/* ── Pricing Transparency Note (data-driven) ── */}
        {ladder.transparencyNote && (
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={defaultViewport}
            className="mb-8 rounded-lg border border-amber-200/60 bg-amber-50/40 px-5 py-4"
          >
            <p className="text-sm font-semibold text-charcoal mb-1">Pricing Transparency Note</p>
            <p className="text-sm text-charcoal/80 leading-relaxed">
              {ladder.transparencyNote}
            </p>
          </motion.div>
        )}

        {/* ── Pricing Ladder Narrative ── */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          className="mb-10 max-w-3xl"
        >
          <p className="text-sm font-body text-charcoal-600 leading-relaxed">
            The pricing ladder below is an append-only ledger — every price point we
            have ever sourced for this building is recorded and never overwritten. This
            means you can see not just where each unit is priced today, but how it got
            there: original developer sheet pricing, subsequent MLS listings, broker-reported
            adjustments, and closed sale records all coexist in a single timeline per unit.
            When you expand a row, you see the full provenance chain. This methodology
            matters because standard market reports show you a snapshot; the ladder shows
            you direction, velocity, and whether a unit has been repriced up, down, or
            stayed flat since launch. The summary cards below capture the aggregate picture,
            while the sortable table lets you drill into individual units by floor, type,
            price, or PSF.
          </p>
        </motion.div>

        {/* ── Summary Cards ── */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10"
        >
          {[
            {
              label: 'Tracked Units',
              value: ladder.totalTrackedUnits.toString(),
              sub: `${ladder.dataSources.length} data sources`,
            },
            {
              label: 'PSF Range',
              value: `${formatPsf(ladder.psfRange.min)} – ${formatPsf(ladder.psfRange.max)}`,
              sub: 'Living SF basis',
            },
            {
              label: 'Price Range',
              value: `${formatPrice(ladder.priceRange.min)} – ${formatPrice(ladder.priceRange.max)}`,
              sub: '2BR–3BR residences',
            },
            {
              label: 'Avg PSF',
              value: formatPsf(ladder.averagePsfLiving),
              sub: `${activeListings.length} active on MLS`,
            },
          ].map((card) => (
            <motion.div
              key={card.label}
              variants={staggerItem}
              className="bg-ivory-50 border border-ivory-200 rounded-sm p-5"
            >
              <div className="text-[11px] font-body font-semibold uppercase tracking-wider text-charcoal-400 mb-2">
                {card.label}
              </div>
              <div className="text-lg md:text-xl font-heading font-bold text-charcoal-900">
                {card.value}
              </div>
              <div className="text-xs font-body text-charcoal-400 mt-1">{card.sub}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* ── Filter Controls ── */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          className="flex flex-wrap items-center gap-2 mb-6"
        >
          <span className="text-xs font-body font-semibold uppercase tracking-wider text-charcoal-400 mr-2">
            Filter:
          </span>
          <button
            onClick={() => setFilterRes('all')}
            className={`px-3 py-1.5 text-xs font-body font-medium rounded-sm border transition-colors ${
              filterRes === 'all'
                ? 'bg-charcoal-900 text-ivory-50 border-charcoal-900'
                : 'bg-white text-charcoal-600 border-charcoal-200 hover:border-charcoal-400'
            }`}
          >
            All ({ladder.totalTrackedUnits})
          </button>
          {residenceTypes.map((rt) => {
            const count = ladder.units.filter((u) => u.residenceType === rt).length;
            return (
              <button
                key={rt}
                onClick={() => setFilterRes(rt)}
                className={`px-3 py-1.5 text-xs font-body font-medium rounded-sm border transition-colors ${
                  filterRes === rt
                    ? 'bg-charcoal-900 text-ivory-50 border-charcoal-900'
                    : 'bg-white text-charcoal-600 border-charcoal-200 hover:border-charcoal-400'
                }`}
              >
                {rt.replace('Residence ', 'Res ')} ({count})
              </button>
            );
          })}
        </motion.div>

        {/* ── Pricing Table (Desktop) ── */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          className="hidden md:block overflow-x-auto"
        >
          <table className="w-full text-sm font-body">
            <thead>
              <tr className="border-b-2 border-charcoal-200">
                {[
                  { field: 'unit' as SortField, label: 'Unit' },
                  { field: 'floor' as SortField, label: 'Floor' },
                  { field: 'residenceType' as SortField, label: 'Type' },
                  { field: 'price' as SortField, label: 'Price' },
                  { field: 'psfLiving' as SortField, label: '$/SF (Living)' },
                ].map((col) => (
                  <th
                    key={col.field}
                    onClick={() => toggleSort(col.field)}
                    className="text-left py-3 px-3 text-[11px] font-semibold uppercase tracking-wider text-charcoal-500 cursor-pointer hover:text-charcoal-900 select-none"
                  >
                    {col.label}
                    {sortIndicator(col.field)}
                  </th>
                ))}
                <th className="text-left py-3 px-3 text-[11px] font-semibold uppercase tracking-wider text-charcoal-500">
                  Layout
                </th>
                <th className="text-left py-3 px-3 text-[11px] font-semibold uppercase tracking-wider text-charcoal-500">
                  Trend
                </th>
                <th className="text-left py-3 px-3 text-[11px] font-semibold uppercase tracking-wider text-charcoal-500">
                  Sources
                </th>
              </tr>
            </thead>
            <tbody>
              {sortedUnits.map((unit) => {
                const isExpanded = expandedUnit === unit.unit;
                const latestEntry = unit.priceHistory[unit.priceHistory.length - 1];
                const displayStatus = unit.status || latestEntry?.status;

                return (
                  <Fragment key={unit.unit}>
                    <tr
                      onClick={() => setExpandedUnit(isExpanded ? null : unit.unit)}
                      className={`border-b border-ivory-200 cursor-pointer transition-colors ${
                        isExpanded ? 'bg-ivory-100' : 'hover:bg-ivory-50'
                      }`}
                    >
                      <td className="py-3 px-3 font-semibold text-charcoal-900">
                        #{unit.unit}
                        {displayStatus && (
                          <span className="ml-2">{statusBadge(displayStatus)}</span>
                        )}
                      </td>
                      <td className="py-3 px-3 text-charcoal-700">FL {unit.floor}</td>
                      <td className="py-3 px-3 text-charcoal-600">
                        {unit.residenceType.replace('Residence ', 'Res ')}
                      </td>
                      <td className="py-3 px-3 font-semibold text-charcoal-900">
                        {formatPrice(unit.currentPrice)}
                      </td>
                      <td className="py-3 px-3 text-charcoal-700">
                        {formatPsf(unit.currentPsfLiving)}/SF
                      </td>
                      <td className="py-3 px-3 text-charcoal-600">
                        {unit.bedrooms}BR/{unit.bathrooms}BA
                        <br />
                        <span className="text-xs text-charcoal-400">
                          {unit.livingSF.toLocaleString()} SF
                        </span>
                      </td>
                      <td className="py-3 px-3">
                        <span className={`font-semibold ${trendColor(unit.trend)}`}>
                          {trendIcon(unit.trend)}{' '}
                          {trendLabel(unit.trend, unit.trendPercent)}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-charcoal-400">
                        {unit.priceHistory.length} entry
                        {unit.priceHistory.length > 1 ? 'ies' : 'y'}
                        <span className="ml-1 text-charcoal-300">▸</span>
                      </td>
                    </tr>
                    {isExpanded && (
                      <tr key={`${unit.unit}-detail`} className="bg-ivory-100">
                        <td colSpan={8} className="px-6 py-4">
                          <div className="text-xs font-body space-y-3">
                            <div className="font-semibold text-charcoal-700 mb-2">
                              Price History — #{unit.unit} ({unit.residenceType}, FL{' '}
                              {unit.floor})
                            </div>
                            {unit.priceHistory.map((entry, i) => (
                              <div
                                key={i}
                                className="flex items-start gap-4 bg-white border border-ivory-200 rounded-sm p-3"
                              >
                                <div className="shrink-0 w-24">
                                  <div className="text-[10px] uppercase tracking-wider text-charcoal-400">
                                    {entry.dateRecorded}
                                  </div>
                                  {entry.mlsNumber && (
                                    <div className="text-[10px] text-gold-600 font-semibold mt-0.5">
                                      {entry.mlsNumber}
                                    </div>
                                  )}
                                </div>
                                <div className="flex-1">
                                  <div className="font-semibold text-charcoal-900">
                                    {formatPrice(entry.price)}{' '}
                                    <span className="text-charcoal-400 font-normal">
                                      ({formatPsf(entry.psfLiving)}/SF living •{' '}
                                      {formatPsf(entry.psfTotal)}/SF total)
                                    </span>
                                  </div>
                                  <div className="text-charcoal-500 mt-0.5">
                                    {entry.sourceDetail}
                                  </div>
                                  {entry.notes && (
                                    <div className="text-charcoal-400 italic mt-0.5">
                                      {entry.notes}
                                    </div>
                                  )}
                                </div>
                                <div className="shrink-0">
                                  {entry.status && statusBadge(entry.status)}
                                </div>
                              </div>
                            ))}
                          </div>
                        </td>
                      </tr>
                    )}
                  </Fragment>
                );
              })}
            </tbody>
          </table>
        </motion.div>

        {/* ── Pricing Cards (Mobile) ── */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          className="md:hidden space-y-3"
        >
          {sortedUnits.map((unit) => {
            const latestEntry = unit.priceHistory[unit.priceHistory.length - 1];
            const isExpanded = expandedUnit === unit.unit;
            const displayStatus = unit.status || latestEntry?.status;

            return (
              <motion.div
                key={unit.unit}
                variants={staggerItem}
                onClick={() => setExpandedUnit(isExpanded ? null : unit.unit)}
                className="border border-ivory-200 rounded-sm bg-ivory-50 p-4 cursor-pointer"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-heading font-bold text-charcoal-900">
                      #{unit.unit}
                    </span>
                    <span className="text-xs text-charcoal-400">FL {unit.floor}</span>
                    {displayStatus && statusBadge(displayStatus)}
                  </div>
                  <span className={`text-sm font-semibold ${trendColor(unit.trend)}`}>
                    {trendIcon(unit.trend)}{' '}
                    {trendLabel(unit.trend, unit.trendPercent)}
                  </span>
                </div>
                <div className="flex items-baseline justify-between">
                  <div>
                    <div className="text-lg font-heading font-bold text-charcoal-900">
                      {formatPrice(unit.currentPrice)}
                    </div>
                    <div className="text-xs text-charcoal-500">
                      {formatPsf(unit.currentPsfLiving)}/SF • {unit.residenceType.replace('Residence ', 'Res ')}
                    </div>
                  </div>
                  <div className="text-right text-xs text-charcoal-400">
                    <div>
                      {unit.bedrooms}BR/{unit.bathrooms}BA
                    </div>
                    <div>{unit.livingSF.toLocaleString()} SF</div>
                  </div>
                </div>

                {isExpanded && (
                  <div className="mt-3 pt-3 border-t border-ivory-200 space-y-2">
                    {unit.priceHistory.map((entry, i) => (
                      <div
                        key={i}
                        className="bg-white border border-ivory-200 rounded-sm p-3 text-xs"
                      >
                        <div className="flex justify-between items-start mb-1">
                          <span className="font-semibold text-charcoal-900">
                            {formatPrice(entry.price)}
                          </span>
                          <span className="text-[10px] text-charcoal-400">
                            {entry.dateRecorded}
                          </span>
                        </div>
                        <div className="text-charcoal-500">{entry.sourceDetail}</div>
                        {entry.mlsNumber && (
                          <div className="text-gold-600 font-semibold mt-0.5">
                            MLS: {entry.mlsNumber}
                          </div>
                        )}
                        {entry.notes && (
                          <div className="text-charcoal-400 italic mt-0.5">
                            {entry.notes}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            );
          })}
        </motion.div>

        {/* ── Floor Premium Narrative ── */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          className="mt-12 mb-6 max-w-3xl"
        >
          <p className="text-sm font-body text-charcoal-600 leading-relaxed">
            Floor premiums are the silent multiplier in every pre-construction tower
            — identical floor plans on different floors carry materially different
            prices, and the premium per floor is not uniform. Lower floors typically
            command a modest per-floor increment, while upper floors accelerate as
            views clear neighboring rooflines and scarcity compounds. The analysis
            below breaks each residence type into floor bands so you can see exactly
            where the premium curve steepens. For buyers, this reveals where the
            value inflection points are. For agents, it&apos;s the data you need to
            explain why two units with the same layout are priced $200K apart.
          </p>
        </motion.div>

        {/* ── Floor Premium Analysis ── */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
        >
          <h3 className="text-xl font-heading font-bold text-charcoal-900 mb-6">
            Floor Premium Analysis
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {ladder.floorPremiums.map((fp) => (
              <div
                key={fp.residenceType}
                className="bg-ivory-50 border border-ivory-200 rounded-sm p-5"
              >
                <div className="text-xs font-body font-semibold uppercase tracking-wider text-gold-600 mb-1">
                  {fp.residenceType}
                </div>
                <div className="text-2xl font-heading font-bold text-charcoal-900 mb-1">
                  {formatPrice(fp.basePricePerFloor)}
                  <span className="text-sm font-body font-normal text-charcoal-400">
                    /floor
                  </span>
                </div>
                <div className="text-xs text-charcoal-400 mb-3">
                  FL {fp.sampleRange.lowFloor}–{fp.sampleRange.highFloor}
                </div>
                <div className="space-y-1">
                  {fp.premiumPerFloor.map((p, i) => (
                    <div key={i} className="flex items-center justify-between text-xs">
                      <span className="text-charcoal-500">
                        FL {p.fromFloor} → {p.toFloor}
                      </span>
                      <span className="font-semibold text-charcoal-700">
                        {formatPrice(p.perFloor)}/fl
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ── Data Sources Footer ── */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          className="mt-8 flex flex-wrap items-center gap-4 text-xs text-charcoal-400 font-body"
        >
          <span className="font-semibold uppercase tracking-wider">Sources:</span>
          {ladder.dataSources.map((ds) => (
            <span key={ds.source} className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-gold-500" />
              {ds.source.replace(/-/g, ' ')} ({ds.count} entries, {ds.dateRange.earliest})
            </span>
          ))}
          <span className="ml-auto text-[10px]">
            Updated {ladder.lastUpdated}
          </span>
        </motion.div>
      </div>
    </section>
  );
}
