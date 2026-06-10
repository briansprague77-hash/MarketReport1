'use client';

import { useState, useMemo } from 'react';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import DevelopmentCard from '@/components/DevelopmentCard';
import AnimatedCounter from '@/components/ui/AnimatedCounter';
import AnimatedStat from '@/components/ui/AnimatedStat';
import Badge from '@/components/ui/Badge';
import Callout from '@/components/ui/Callout';
import GoldDivider from '@/components/ui/GoldDivider';
import {
  trackedDevelopments,
  countyLabels,
  demandDrivers,
  marketTrends,
  type County,
  type DevelopmentSummary,
} from '@/data/market';
import {
  fadeUp,
  fadeIn,
  scaleIn,
  staggerContainer,
  staggerItem,
  heroTitle,
  heroSubtitle,
  defaultViewport,
} from '@/lib/animations';

// Dynamic import — Leaflet needs window/DOM, no SSR
const DevelopmentMap = dynamic(() => import('@/components/DevelopmentMap'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[600px] bg-charcoal-900 border border-charcoal-800 rounded-sm flex items-center justify-center">
      <div className="text-charcoal-500 text-sm font-body">Loading map...</div>
    </div>
  ),
});

type ViewMode = 'grid' | 'map';

// ─── Market Segment Ordering ────────────────────────────────────────────────
const COUNTY_ORDER: County[] = ['pinellas', 'hillsborough', 'sarasota'];
const COUNTY_DISPLAY_NAMES: Record<County, string> = {
  pinellas: 'Pinellas County',
  hillsborough: 'Hillsborough County',
  sarasota: 'Sarasota County',
};

const SUBMARKET_ORDER: Record<County, string[]> = {
  pinellas: ['Downtown St Pete', 'Mirror Lake', 'St. Pete Beach', 'Clearwater Beach'],
  hillsborough: ['Downtown Tampa', 'Water Street', 'Channel District', 'Bayshore Blvd', 'Westshore'],
  sarasota: ['The Quay', 'Downtown Sarasota', 'Golden Gate Point'],
};

// ─── Filter Definitions ────────────────────────────────────────────────────

const STATUS_FILTERS = [
  { key: 'all', label: 'All', color: '#C9A84C' },
  { key: 'Reservation', label: 'Reservation', color: '#AB47BC' },
  { key: 'Pre-Sales', label: 'Pre-Sales', color: '#C9A84C' },
  { key: 'Under Construction', label: 'Under Construction', color: '#2196F3' },
  { key: 'Delivered', label: 'Delivered', color: '#0D9668' },
];

const PRICE_FILTERS = [
  { key: 'all', label: 'All Prices' },
  { key: 'under1m', label: 'Under $1M' },
  { key: '1m-2m', label: '$1M – $2M' },
  { key: '2m-5m', label: '$2M – $5M' },
  { key: '5m+', label: '$5M+' },
];

const DELIVERY_FILTERS = [
  { key: 'all', label: 'Any' },
  { key: '2026', label: '2026' },
  { key: '2027', label: '2027' },
  { key: '2028', label: '2028' },
  { key: '2029+', label: '2029+' },
  { key: 'now', label: 'Now' },
];

// ─── Helpers ────────────────────────────────────────────────────────────────

function parseEntryPrice(price?: string): number {
  if (!price) return 0;
  const clean = price.replace(/[^0-9.MKk]/g, '');
  if (clean.includes('M')) return parseFloat(clean) * 1_000_000;
  if (clean.toLowerCase().includes('k')) return parseFloat(clean) * 1_000;
  return parseFloat(clean) || 0;
}

function matchesPriceFilter(dev: DevelopmentSummary, filter: string): boolean {
  if (filter === 'all') return true;
  const price = parseEntryPrice(dev.price);
  if (price <= 0) return true; // show TBD in all filters
  switch (filter) {
    case 'under1m': return price < 1_000_000;
    case '1m-2m': return price >= 1_000_000 && price < 2_000_000;
    case '2m-5m': return price >= 2_000_000 && price < 5_000_000;
    case '5m+': return price >= 5_000_000;
    default: return true;
  }
}

function matchesDeliveryFilter(dev: DevelopmentSummary, filter: string): boolean {
  if (filter === 'all') return true;
  const d = dev.delivery.toLowerCase();
  if (filter === 'now') return d.includes('now') || d.includes('available') || dev.status === 'delivered' || dev.status === 'sold-out';
  if (filter === '2029+') {
    const match = dev.delivery.match(/(\d{4})/);
    return match ? parseInt(match[1]) >= 2029 : false;
  }
  return dev.delivery.includes(filter);
}

interface SubmarketGroup {
  county: County;
  countyLabel: string;
  submarket: string;
  developments: DevelopmentSummary[];
}

// Sort within each group: shadow inventory last
const STATUS_SORT: Record<string, number> = {
  'pre-sales': 1, 'under-construction': 2, 'delivered': 3, 'reservation': 4, 'shadow-inventory': 5, 'sold-out': 6,
};

function groupBySubmarket(devs: DevelopmentSummary[]): SubmarketGroup[] {
  const groups: SubmarketGroup[] = [];
  for (const county of COUNTY_ORDER) {
    const countyDevs = devs.filter((d) => d.county === county);
    if (countyDevs.length === 0) continue;
    const orderedSubmarkets = SUBMARKET_ORDER[county] ?? [];
    const buckets: Record<string, DevelopmentSummary[]> = {};
    for (const d of countyDevs) {
      const sm = d.submarket || 'Other';
      if (!buckets[sm]) buckets[sm] = [];
      buckets[sm].push(d);
    }
    // Sort each bucket: active first, shadow inventory last
    for (const sm of Object.keys(buckets)) {
      buckets[sm].sort((a, b) => (STATUS_SORT[a.status] ?? 3) - (STATUS_SORT[b.status] ?? 3));
    }
    const emitted = new Set<string>();
    for (const sm of orderedSubmarkets) {
      if (buckets[sm]?.length > 0) {
        groups.push({ county, countyLabel: COUNTY_DISPLAY_NAMES[county], submarket: sm, developments: buckets[sm] });
        emitted.add(sm);
      }
    }
    for (const sm of Object.keys(buckets)) {
      if (!emitted.has(sm)) {
        groups.push({ county, countyLabel: COUNTY_DISPLAY_NAMES[county], submarket: sm, developments: buckets[sm] });
      }
    }
  }
  return groups;
}

// ─── Filter Chip Component ──────────────────────────────────────────────────

function Chip({
  active,
  onClick,
  children,
  color,
  count,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
  color?: string;
  count?: number;
}) {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-body font-semibold transition-all whitespace-nowrap ${
        active
          ? 'text-charcoal-900 shadow-md'
          : 'bg-charcoal-800/60 text-charcoal-400 hover:bg-charcoal-700/60 hover:text-ivory-200 border border-charcoal-700/50'
      }`}
      style={active ? { backgroundColor: color || '#C9A84C' } : undefined}
    >
      {active && color && (
        <span className="h-1.5 w-1.5 rounded-full bg-charcoal-900/40" />
      )}
      {children}
      {count != null && count > 0 && (
        <span className={`text-[10px] ${active ? 'text-charcoal-900/60' : 'text-charcoal-500'}`}>
          {count}
        </span>
      )}
    </button>
  );
}

// ─── Main Component ─────────────────────────────────────────────────────────

export default function DevelopmentsPage() {
  const [selectedCounty, setSelectedCounty] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedPrice, setSelectedPrice] = useState<string>('all');
  const [selectedDelivery, setSelectedDelivery] = useState<string>('all');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [filtersOpen, setFiltersOpen] = useState(false);

  // Three tiers: active market, shadow inventory, sold-out
  const activePipeline = useMemo(() => trackedDevelopments.filter((d) => d.status !== 'sold-out' && d.status !== 'shadow-inventory'), []);
  const allShadowInventory = useMemo(() => trackedDevelopments.filter((d) => d.status === 'shadow-inventory'), []);
  const allSoldOutProjects = useMemo(() => trackedDevelopments.filter((d) => d.status === 'sold-out'), []);

  // Apply county filter to shadow + sold-out sections too
  const shadowInventory = useMemo(() =>
    selectedCounty === 'all' ? allShadowInventory : allShadowInventory.filter((d) => d.county === selectedCounty),
  [allShadowInventory, selectedCounty]);
  const soldOutProjects = useMemo(() =>
    selectedCounty === 'all' ? allSoldOutProjects : allSoldOutProjects.filter((d) => d.county === selectedCounty),
  [allSoldOutProjects, selectedCounty]);

  // Extract unique tags
  const allTags = useMemo(() => {
    const set = new Set<string>();
    activePipeline.forEach((d) => d.tags?.forEach((tag) => set.add(tag)));
    return Array.from(set).sort();
  }, [activePipeline]);

  // Extract unique submarkets
  const allSubmarkets = useMemo(() => {
    const set = new Set<string>();
    activePipeline.forEach((d) => { if (d.submarket) set.add(d.submarket); });
    return Array.from(set).sort();
  }, [activePipeline]);

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
    );
  };

  const clearAllFilters = () => {
    setSelectedCounty('all');
    setSelectedStatus('all');
    setSelectedPrice('all');
    setSelectedDelivery('all');
    setSelectedTags([]);
  };

  const hasActiveFilters =
    selectedCounty !== 'all' ||
    selectedStatus !== 'all' ||
    selectedPrice !== 'all' ||
    selectedDelivery !== 'all' ||
    selectedTags.length > 0;

  const filtered = useMemo(() => {
    return activePipeline.filter((d) => {
      if (selectedCounty !== 'all' && d.county !== selectedCounty) return false;
      if (selectedStatus !== 'all' && d.statusLabel !== selectedStatus) return false;
      if (!matchesPriceFilter(d, selectedPrice)) return false;
      if (!matchesDeliveryFilter(d, selectedDelivery)) return false;
      if (selectedTags.length > 0 && !selectedTags.some((tag) => d.tags?.includes(tag))) return false;
      return true;
    });
  }, [activePipeline, selectedCounty, selectedStatus, selectedPrice, selectedDelivery, selectedTags]);

  // Count per status for chips
  const statusCounts = useMemo(() => {
    const counts: Record<string, number> = { all: activePipeline.length };
    for (const s of STATUS_FILTERS) {
      if (s.key !== 'all') counts[s.key] = activePipeline.filter((d) => d.statusLabel === s.key).length;
    }
    return counts;
  }, [activePipeline]);

  const submarketGroups = useMemo(() => groupBySubmarket(filtered), [filtered]);

  // Live stats
  const totalUnits = useMemo(() => filtered.reduce((s, d) => s + d.units, 0), [filtered]);

  // Pipeline-wide stats (independent of filters) — used by market-context blocks
  const pipelineStats = useMemo(() => {
    const active = trackedDevelopments.filter((d) => d.status !== 'sold-out' && d.units > 0);
    const totalUnits = active.reduce((s, d) => s + d.units, 0);
    const branded = active.filter((d) => d.tags?.includes('Hospitality Brand') || d.tags?.includes('Lifestyle Brand'));
    const brandedUnits = branded.reduce((s, d) => s + d.units, 0);
    const withPsf = active.filter((d) => (d.resalePsf ?? d.developerClosePsf ?? d.avgPsf ?? 0) > 0);
    const avgPsf = withPsf.length
      ? Math.round(withPsf.reduce((s, d) => s + (d.resalePsf ?? d.developerClosePsf ?? d.avgPsf ?? 0), 0) / withPsf.length)
      : 0;
    return {
      totalUnits,
      brandedUnits,
      brandedPct: totalUnits > 0 ? Math.round((brandedUnits / totalUnits) * 100) : 0,
      avgPsf,
    };
  }, []);

  return (
    <>
      {/* ─── Hero ──────────────────────────────────────────────── */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-20 bg-charcoal-950 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-charcoal-950 via-charcoal-900 to-charcoal-950" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
        <div className="relative container-luxury text-center">
          <motion.div initial="hidden" animate="visible" variants={fadeIn} className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-8 bg-gold-500" />
            <span className="text-gold-500 text-xs font-body font-semibold uppercase tracking-[0.2em]">Market Pipeline</span>
            <div className="h-px w-8 bg-gold-500" />
          </motion.div>
          <motion.h1 initial="hidden" animate="visible" variants={heroTitle} className="text-3xl md:text-5xl font-heading font-bold text-ivory-50 mb-4">
            New Construction Developments
          </motion.h1>
          <motion.p initial="hidden" animate="visible" variants={heroSubtitle} className="text-base md:text-lg font-body text-ivory-400 max-w-2xl mx-auto mb-6">
            {activePipeline.length} active developments across Pinellas, Hillsborough &amp; Sarasota
          </motion.p>

          {/* Live pipeline stats — always show total + filtered */}
          <motion.div initial="hidden" animate="visible" variants={heroSubtitle} className="flex flex-wrap justify-center gap-6">
            <div className="text-center">
              <AnimatedCounter value={activePipeline.length + allShadowInventory.length} className="text-2xl font-heading font-bold text-ivory-100" duration={1} />
              <p className="text-[10px] font-body text-charcoal-500 uppercase tracking-wider">Total Developments</p>
            </div>
            <div className="text-center">
              <AnimatedCounter value={activePipeline.reduce((s, d) => s + d.units, 0) + allShadowInventory.reduce((s, d) => s + d.units, 0)} className="text-2xl font-heading font-bold text-ivory-100" duration={1.5} />
              <p className="text-[10px] font-body text-charcoal-500 uppercase tracking-wider">Total Units</p>
            </div>
            {hasActiveFilters && (
              <>
                <div className="h-8 w-px bg-charcoal-700" />
                <div className="text-center">
                  <AnimatedCounter value={filtered.length} className="text-2xl font-heading font-bold text-gold-400" duration={1} />
                  <p className="text-[10px] font-body text-charcoal-500 uppercase tracking-wider">Filtered</p>
                </div>
                <div className="text-center">
                  <AnimatedCounter value={totalUnits} className="text-2xl font-heading font-bold text-gold-400" duration={1} />
                  <p className="text-[10px] font-body text-charcoal-500 uppercase tracking-wider">Filtered Units</p>
                </div>
              </>
            )}
          </motion.div>
        </div>
      </section>

      {/* ─── Filter Bar (collapsible) ──────────────────────────── */}
      <div className="bg-charcoal-900/95 backdrop-blur-lg border-b border-charcoal-800 sticky top-[72px] md:top-[80px] z-40">
        <div className="container-luxury py-3">
          {/* Always visible: Status chips + expand toggle */}
          <div className="flex items-center justify-between">
            <div className="flex flex-wrap items-center gap-2">
              {STATUS_FILTERS.map((s) => (
                <Chip
                  key={s.key}
                  active={selectedStatus === (s.key === 'all' ? 'all' : s.label)}
                  onClick={() => setSelectedStatus(s.key === 'all' ? 'all' : s.label)}
                  color={s.color}
                  count={statusCounts[s.key]}
                >
                  {s.label}
                </Chip>
              ))}
            </div>
            <div className="flex items-center gap-2">
              {hasActiveFilters && (
                <button
                  onClick={clearAllFilters}
                  className="text-[10px] font-body font-semibold uppercase tracking-wider text-gold-500 hover:text-gold-400 transition-colors"
                >
                  Clear ×
                </button>
              )}
              <button
                onClick={() => setFiltersOpen(!filtersOpen)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-sm text-xs font-body font-semibold text-charcoal-400 hover:text-ivory-200 bg-charcoal-800/60 border border-charcoal-700/50 transition-all"
              >
                <svg className={`w-3.5 h-3.5 transition-transform ${filtersOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
                Filters
              </button>
            </div>
          </div>

          {/* Expandable: County, Price, Delivery, Tags */}
          {filtersOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-3 pt-3 border-t border-charcoal-800/50 space-y-2.5"
            >
              {/* County */}
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="text-[10px] font-body font-semibold uppercase tracking-widest text-charcoal-500 w-14">County</span>
                {[{ key: 'all', label: 'All' }, { key: 'pinellas', label: 'Pinellas' }, { key: 'hillsborough', label: 'Hillsborough' }, { key: 'sarasota', label: 'Sarasota' }].map((c) => (
                  <Chip key={c.key} active={selectedCounty === c.key} onClick={() => setSelectedCounty(c.key)} color="#3B82F6">
                    {c.label}
                  </Chip>
                ))}
              </div>

              {/* Price Range */}
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="text-[10px] font-body font-semibold uppercase tracking-widest text-charcoal-500 w-14">Price</span>
                {PRICE_FILTERS.map((p) => (
                  <Chip key={p.key} active={selectedPrice === p.key} onClick={() => setSelectedPrice(p.key)} color="#0D9668">
                    {p.label}
                  </Chip>
                ))}
              </div>

              {/* Delivery */}
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="text-[10px] font-body font-semibold uppercase tracking-widest text-charcoal-500 w-14">Delivery</span>
                {DELIVERY_FILTERS.map((d) => (
                  <Chip key={d.key} active={selectedDelivery === d.key} onClick={() => setSelectedDelivery(d.key)} color="#F59E0B">
                    {d.label}
                  </Chip>
                ))}
              </div>

              {/* Tags */}
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="text-[10px] font-body font-semibold uppercase tracking-widest text-charcoal-500 w-14">Tags</span>
                {allTags.map((tag) => (
                  <Chip key={tag} active={selectedTags.includes(tag)} onClick={() => toggleTag(tag)} color="#AB47BC">
                    {tag}
                  </Chip>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* ─── View Toggle + Results ─────────────────────────────── */}
      <section className="bg-charcoal-950 py-12 md:py-16">
        <div className="container-luxury">
          {/* View Mode Toggle */}
          <div className="flex items-center justify-between mb-6">
            <p className="text-xs font-body text-charcoal-400">
              {filtered.length} result{filtered.length !== 1 ? 's' : ''}
              {hasActiveFilters && <span className="text-gold-500 ml-1">(filtered)</span>}
            </p>
            <div className="flex items-center bg-charcoal-900 border border-charcoal-800 rounded-sm overflow-hidden">
              <button
                onClick={() => setViewMode('grid')}
                className={`flex items-center gap-1.5 px-3 py-2 text-xs font-body font-medium transition-all ${
                  viewMode === 'grid' ? 'bg-gold-500 text-charcoal-900' : 'text-charcoal-400 hover:text-ivory-200'
                }`}
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
                Grid
              </button>
              <button
                onClick={() => setViewMode('map')}
                className={`flex items-center gap-1.5 px-3 py-2 text-xs font-body font-medium transition-all ${
                  viewMode === 'map' ? 'bg-gold-500 text-charcoal-900' : 'text-charcoal-400 hover:text-ivory-200'
                }`}
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
                Map
              </button>
            </div>
          </div>

          {/* Grid or Map */}
          {viewMode === 'map' ? (
            <DevelopmentMap developments={filtered} />
          ) : submarketGroups.length > 0 ? (
            <div className="space-y-12">
              {(() => {
                let lastCounty: County | null = null;
                return submarketGroups.map((group, idx) => {
                  const showCountyHeader = group.county !== lastCounty;
                  lastCounty = group.county;
                  return (
                    <div key={`${group.county}-${group.submarket}`}>
                      {showCountyHeader && (
                        <div className={`relative ${idx > 0 ? 'pt-8' : ''} mb-8`}>
                          {idx > 0 && (
                            <div className="absolute inset-x-0 top-0 flex items-center" aria-hidden="true">
                              <div className="w-full border-t border-gold-500/20" />
                            </div>
                          )}
                          <div className={`flex items-center gap-4 ${idx > 0 ? 'pt-4' : ''}`}>
                            <div className="flex items-center gap-3">
                              <div className="h-8 w-1 bg-gold-500 rounded-full" />
                              <h2 className="text-xl md:text-2xl font-heading font-bold text-ivory-50">{group.countyLabel}</h2>
                            </div>
                            <div className="flex-1 h-px bg-charcoal-800" />
                            <span className="text-xs font-body font-semibold text-charcoal-500 uppercase tracking-wider">
                              {filtered.filter((d) => d.county === group.county).length} developments
                            </span>
                          </div>
                        </div>
                      )}
                      <div className="flex items-center gap-3 mb-5">
                        <div className="h-px w-4 bg-gold-500/40" />
                        <h3 className="text-sm font-body font-semibold uppercase tracking-[0.15em] text-gold-400">{group.submarket}</h3>
                        <div className="flex-1 h-px bg-charcoal-800/60" />
                        <span className="text-[10px] font-body text-charcoal-600 uppercase tracking-wider">
                          {group.developments.length} {group.developments.length === 1 ? 'project' : 'projects'}
                        </span>
                      </div>
                      <motion.div
                        initial="hidden" whileInView="visible" viewport={defaultViewport} variants={staggerContainer}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                      >
                        {group.developments.map((dev) => (
                          <motion.div key={dev.slug} variants={staggerItem}>
                            <DevelopmentCard development={dev} />
                          </motion.div>
                        ))}
                      </motion.div>
                    </div>
                  );
                });
              })()}
            </div>
          ) : (
            <motion.div initial="hidden" animate="visible" variants={fadeUp} className="text-center py-20">
              <div className="max-w-md mx-auto">
                <div className="w-16 h-16 bg-charcoal-800 border border-charcoal-700 rounded-sm flex items-center justify-center mx-auto mb-5">
                  <svg className="w-8 h-8 text-charcoal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <h3 className="text-xl font-heading font-bold text-ivory-50 mb-2">No developments match</h3>
                <p className="text-sm font-body text-charcoal-400 mb-6">Adjust your filters to see more results.</p>
                <button onClick={clearAllFilters} className="px-5 py-2.5 bg-gold-500 text-charcoal-900 text-sm font-body font-semibold uppercase tracking-wide rounded-sm hover:bg-gold-400 transition-all">
                  Reset Filters
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* ─── Shadow Inventory — by county with Join Waitlist ──── */}
      {shadowInventory.length > 0 && (
        <section className="py-16 bg-charcoal-900/20 border-t border-charcoal-800">
          <div className="container-luxury">
            <motion.div initial="hidden" whileInView="visible" viewport={defaultViewport} variants={fadeUp} className="mb-10">
              <div className="flex items-center gap-3 mb-3">
                <div className="h-8 w-1 bg-charcoal-600 rounded-full" />
                <h2 className="text-xl md:text-2xl font-heading font-bold text-ivory-50">Shadow Inventory</h2>
              </div>
              <p className="text-sm font-body text-charcoal-500 max-w-2xl">
                Not yet announced to market. These projects are in various stages of site acquisition, planning, or feasibility.
                Join the waitlist to be notified when sales launch.
              </p>
            </motion.div>

            {COUNTY_ORDER.map((county) => {
              const countyShadow = shadowInventory.filter((d) => d.county === county);
              if (countyShadow.length === 0) return null;
              return (
                <div key={`shadow-${county}`} className="mb-10">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="h-px w-4 bg-charcoal-600/40" />
                    <h3 className="text-sm font-body font-semibold uppercase tracking-[0.15em] text-charcoal-400">
                      {COUNTY_DISPLAY_NAMES[county]}
                    </h3>
                    <div className="flex-1 h-px bg-charcoal-800/40" />
                    <span className="text-[10px] font-body text-charcoal-600 uppercase tracking-wider">
                      {countyShadow.length} {countyShadow.length === 1 ? 'project' : 'projects'}
                    </span>
                  </div>
                  <motion.div
                    initial="hidden" whileInView="visible" viewport={defaultViewport} variants={staggerContainer}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                  >
                    {countyShadow.map((dev) => (
                      <motion.div key={dev.slug} variants={staggerItem}>
                        <div className="bg-charcoal-900 border border-charcoal-800 rounded-sm overflow-hidden flex flex-col">
                          {/* Image */}
                          {dev.image ? (
                            <div className="relative h-40 overflow-hidden">
                              <img src={dev.image} alt={dev.name} className="w-full h-full object-cover opacity-60" />
                              <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/80 to-transparent" />
                              <div className="absolute top-3 left-3">
                                <span className="inline-block px-2.5 py-1 rounded-sm text-[11px] font-body font-bold uppercase tracking-wider bg-charcoal-900/90 text-charcoal-400 border border-charcoal-700/50">
                                  Shadow Inventory
                                </span>
                              </div>
                            </div>
                          ) : (
                            <div className="h-24 bg-charcoal-800 flex items-center justify-center">
                              <span className="text-[10px] font-body font-bold uppercase tracking-wider text-charcoal-600">Not Yet Announced</span>
                            </div>
                          )}
                          <div className="p-4 flex flex-col flex-1">
                            <h3 className="text-base font-heading font-bold text-ivory-50 mb-1">{dev.name}</h3>
                            <p className="text-xs font-body text-charcoal-400 mb-1">{dev.location}</p>
                            {dev.developer && <p className="text-[10px] font-body text-charcoal-500 mb-3">{dev.developer}</p>}
                            {dev.units > 0 && (
                              <p className="text-xs font-body text-charcoal-400 mb-3">{dev.units} units · {dev.delivery || 'TBD'}</p>
                            )}
                            <div className="flex-1" />
                            <a
                              href={`/contact?development=${dev.slug}&interest=waitlist`}
                              className="block w-full text-center py-2.5 bg-gold-500 text-charcoal-900 text-sm font-body font-semibold uppercase tracking-wide rounded-sm hover:bg-gold-400 transition-colors"
                            >
                              Join Waitlist
                            </a>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* ─── Closed Projects — Historical Performance ─────────── */}
      {soldOutProjects.length > 0 && (
        <section className="py-16 bg-charcoal-900/30 border-t border-charcoal-800">
          <div className="container-luxury">
            <motion.div initial="hidden" whileInView="visible" viewport={defaultViewport} variants={fadeUp} className="mb-8">
              <div className="flex items-center gap-3 mb-3">
                <div className="h-8 w-1 bg-charcoal-600 rounded-full" />
                <h2 className="text-xl md:text-2xl font-heading font-bold text-ivory-50">Closed Projects</h2>
              </div>
              <p className="text-sm font-body text-charcoal-500 max-w-xl">
                Developer sold out — included for historical performance comparison and PSF benchmarking only.
              </p>
            </motion.div>
            <motion.div
              initial="hidden" whileInView="visible" viewport={defaultViewport} variants={staggerContainer}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 opacity-70"
            >
              {soldOutProjects.map((dev) => (
                <motion.div key={dev.slug} variants={staggerItem}>
                  <DevelopmentCard development={dev} />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      )}

      {/* ─── Callout: Market Stat ─────────────────────────────────── */}
      <Callout
        variant="stat"
        eyebrow="Tampa Bay New Development Pipeline"
        theme="gold"
        attribution={`${trackedDevelopments.length} developments tracked across Pinellas, Hillsborough & Sarasota counties`}
      >
        {pipelineStats.totalUnits.toLocaleString()} Residences in Active Pipeline
      </Callout>

      <GoldDivider variant="gradient" />

      {/* ─── Market Intelligence ──────────────────────────────────── */}
      <section id="market-data" className="py-24 bg-charcoal-950">
        <div className="container-luxury">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={defaultViewport}
            variants={fadeUp}
            className="mb-14"
          >
            <div className="mb-4">
              <Badge label="Market Data" variant="gold" />
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white mb-3">
              What&rsquo;s Actually Happening
            </h2>
            <p className="text-ivory-400/70 max-w-2xl">
              No spin. No &ldquo;luxury lifestyle&rdquo; filler. Just sourced data
              from Stellar MLS and developer disclosures.
            </p>
          </motion.div>

          {/* Demand Drivers */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={defaultViewport}
            variants={staggerContainer}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
          >
            {demandDrivers.map((driver, i) => (
              <motion.div
                key={i}
                variants={staggerItem}
                className="rounded-xl border border-ivory-100/10 bg-charcoal-900/60 p-6"
              >
                <AnimatedStat
                  value={driver.stat.replace(/[^0-9.,]/g, '')}
                  prefix={driver.stat.startsWith('$') ? '$' : undefined}
                  suffix={driver.stat.endsWith('+') ? '+' : driver.stat.endsWith('%') ? '%' : undefined}
                  className="text-3xl font-heading font-bold text-gold-400 mb-2"
                />
                <h3 className="text-base font-semibold text-white mb-2">
                  {driver.title}
                </h3>
                <p className="text-sm text-ivory-400/60 leading-relaxed">
                  {driver.description}
                </p>
              </motion.div>
            ))}
          </motion.div>

          {/* MLS Snapshot — clearly labeled as Waldorf-specific */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={defaultViewport}
            variants={fadeUp}
            className="mb-10"
          >
            <div className="flex items-center gap-3 mb-6">
              <h3 className="font-heading text-2xl font-bold text-white">
                Market Trends Snapshot
              </h3>
              <span className="text-xs text-ivory-400/40 border border-ivory-100/10 rounded px-2 py-0.5">
                Stellar MLS + Developer Data &middot; Apr 2026
              </span>
            </div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={defaultViewport}
            variants={staggerContainer}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-16"
          >
            {marketTrends.map((trend, i) => (
              <motion.div
                key={i}
                variants={staggerItem}
                className="rounded-lg border border-ivory-100/8 bg-charcoal-900/40 p-5"
              >
                <div className="text-xs text-ivory-400/50 mb-1.5">
                  {trend.metric.replace('Waldorf Astoria ', '').replace('Waldorf ', '')}
                </div>
                <div className="text-2xl font-heading font-bold text-white mb-1">
                  {trend.current}
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className={`text-xs font-medium ${
                      trend.direction === 'up'
                        ? 'text-emerald-400'
                        : trend.direction === 'down'
                        ? 'text-red-400'
                        : 'text-ivory-400/50'
                    }`}
                  >
                    {trend.change}
                  </span>
                  {trend.source && (
                    <span className="text-[10px] text-ivory-400/30">
                      {trend.source}
                    </span>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Pipeline summary stats — LIVE COMPUTED */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={defaultViewport}
            variants={scaleIn}
            className="rounded-2xl border border-gold-500/20 bg-gradient-to-br from-charcoal-900/80 to-charcoal-950 p-8 sm:p-10"
          >
            <h3 className="font-heading text-xl font-bold text-white mb-6">
              Tampa Bay Pipeline — Live Data
            </h3>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              <div>
                <AnimatedCounter value={trackedDevelopments.length} className="text-3xl font-heading font-bold text-gold-400" duration={1.5} />
                <div className="text-sm text-ivory-400/60 mt-1">Developments Tracked</div>
                <div className="text-xs text-ivory-400/30 mt-0.5">3 counties</div>
              </div>
              <div>
                <AnimatedCounter value={pipelineStats.totalUnits} className="text-3xl font-heading font-bold text-gold-400" duration={1.8} />
                <div className="text-sm text-ivory-400/60 mt-1">Units in Active Pipeline</div>
                <div className="text-xs text-ivory-400/30 mt-0.5">Excluding shadow inventory</div>
              </div>
              <div>
                <div className="text-3xl font-heading font-bold text-gold-400">
                  $<AnimatedCounter value={pipelineStats.avgPsf} className="text-3xl font-heading font-bold text-gold-400" duration={1.8} />
                </div>
                <div className="text-sm text-ivory-400/60 mt-1">Avg Market $/SF</div>
                <div className="text-xs text-ivory-400/30 mt-0.5">All priced buildings</div>
              </div>
              <div>
                <AnimatedCounter value={pipelineStats.brandedPct} suffix="%" className="text-3xl font-heading font-bold text-gold-400" duration={1.5} />
                <div className="text-sm text-ivory-400/60 mt-1">Branded Residences</div>
                <div className="text-xs text-ivory-400/30 mt-0.5">{pipelineStats.brandedUnits.toLocaleString()} branded units</div>
              </div>
            </div>
            <div className="text-xs text-ivory-400/30 mt-6">
              Computed from {trackedDevelopments.length} tracked developments &middot; Stellar MLS + developer disclosures
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
