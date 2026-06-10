'use client';

import { motion } from 'framer-motion';
import { fadeUp, defaultViewport } from '@/lib/animations';
import type { MarketData } from '@/hooks/useMarketData';
import type { DevelopmentSummary } from '@/data/developments';
import { developmentProfiles, getDevelopment, getDevelopmentProfile } from '@/data/developments';
import InventoryPressureBadge from '@/components/ui/InventoryPressureBadge';
import RiskFlags from '@/components/ui/RiskFlags';

// ─── Status Badge Colors ────────────────────────────────────────────────────

const STATUS_BADGE: Record<string, { bg: string; text: string; label: string }> = {
  'reservation':        { bg: 'bg-indigo-100', text: 'text-indigo-700', label: 'Reservation' },
  'pre-sales':          { bg: 'bg-gold-100',   text: 'text-gold-700',   label: 'Pre-Sales' },
  'under-construction': { bg: 'bg-emerald-100',text: 'text-emerald-700',label: 'Under Construction' },
  'delivered':          { bg: 'bg-charcoal-100',text: 'text-charcoal-600',label: 'Delivered' },
  'sold-out':           { bg: 'bg-pink-100',   text: 'text-pink-700',   label: 'Sold Out' },
};

// ─── Amenity extraction helper ──────────────────────────────────────────────

function getAmenities(slug: string): string[] {
  // Try profile first
  const profile = developmentProfiles[slug];
  if (profile?.amenities?.length) return profile.amenities;

  // Try full development
  const dev = getDevelopment(slug);
  if (dev?.specifications?.amenityHighlights?.length) {
    return dev.specifications.amenityHighlights.map((a) =>
      a.description ? `${a.name} — ${a.description}` : a.name,
    );
  }

  return [];
}

// ─── Premium amenity tags for HOA justification ─────────────────────────────

const PREMIUM_TAGS = [
  'Branded Residence', 'Concierge', 'Valet', 'Pool', 'Spa', 'Beach Access',
  'Rooftop', 'Fitness Center', 'Wine Room', 'Theater', 'Dog Park', 'Marina',
  'Restaurant', 'Room Service', 'Housekeeping', 'Private Elevator',
];

function extractPremiumAmenities(amenities: string[], tags?: string[]): string[] {
  const found: string[] = [];

  // Add qualifying tags
  if (tags) {
    for (const t of PREMIUM_TAGS) {
      if (tags.includes(t)) found.push(t);
    }
  }

  // Scan amenities for keyword matches
  for (const a of amenities) {
    const lower = a.toLowerCase();
    if (lower.includes('pool') && !found.includes('Pool')) found.push('Pool');
    if (lower.includes('spa') && !found.includes('Spa')) found.push('Spa');
    if (lower.includes('concierge') && !found.includes('Concierge')) found.push('Concierge');
    if (lower.includes('valet') && !found.includes('Valet')) found.push('Valet');
    if (lower.includes('fitness') && !found.includes('Fitness Center')) found.push('Fitness Center');
    if (lower.includes('rooftop') && !found.includes('Rooftop')) found.push('Rooftop');
    if (lower.includes('wine') && !found.includes('Wine Room')) found.push('Wine Room');
    if (lower.includes('theater') && !found.includes('Theater')) found.push('Theater');
    if (lower.includes('dog') && !found.includes('Dog Park')) found.push('Dog Park');
    if (lower.includes('marina') && !found.includes('Marina')) found.push('Marina');
    if (lower.includes('restaurant') && !found.includes('Restaurant')) found.push('Restaurant');
    if (lower.includes('room service') && !found.includes('Room Service')) found.push('Room Service');
    if (lower.includes('housekeeping') && !found.includes('Housekeeping')) found.push('Housekeeping');
    if (lower.includes('private elevator') && !found.includes('Private Elevator')) found.push('Private Elevator');
    if (lower.includes('beach') && !found.includes('Beach Access')) found.push('Beach Access');
  }

  return found;
}

// ─── Row definitions ────────────────────────────────────────────────────────

interface RowDef {
  label: string;
  getValue: (d: DevelopmentSummary) => string;
}

const ROWS: RowDef[] = [
  { label: 'Address', getValue: (d) => d.address ?? d.location },
  { label: 'Status', getValue: (d) => d.statusLabel },
  { label: 'Units', getValue: (d) => d.units.toLocaleString() },
  { label: 'Stories', getValue: (d) => d.stories ? String(d.stories) : '\u2014' },
  { label: 'Waterfront', getValue: (d) => d.tags?.includes('Waterfront') ? 'Yes' : 'No' },
  { label: 'Type', getValue: (d) => d.type ?? 'Condominium' },
  { label: 'Price Range', getValue: (d) => d.price ?? '\u2014' },
  { label: 'Avg PSF', getValue: (d) => d.avgPsf ? `$${d.avgPsf.toLocaleString()}` : '\u2014' },
  { label: 'Est. HOA', getValue: (d) => d.hoaPerSqFt ? `$${d.hoaPerSqFt.toFixed(2)} PSF` : 'TBD' },
  { label: 'Delivery', getValue: (d) => d.delivery },
  { label: 'Developer', getValue: (d) => d.developer ?? '\u2014' },
  { label: 'Architect', getValue: (d) => d.architect ?? '\u2014' },
];

// ─── Component ──────────────────────────────────────────────────────────────

interface Props {
  data?: MarketData;
}

export default function DevelopmentOverview({ data }: Props) {
  if (!data || data.filtered.length === 0) return null;

  const devs = data.filtered;
  const geoLabel = data.geoLabel;

  // Gather HOA data for justification cards
  const devsWithHoa = devs.filter((d) => d.hoaPerSqFt && d.hoaPerSqFt > 0);

  return (
    <section className="section-padding bg-ivory-50">
      <div className="container-luxury">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          variants={fadeUp}
        >
          {/* Section Header */}
          <div className="mb-8">
            <p className="text-xs font-body font-semibold uppercase tracking-[0.2em] text-gold-600 mb-2">
              Side-by-Side Comparison
            </p>
            <h2 className="text-2xl md:text-3xl font-heading font-bold text-charcoal-900">
              Development Overview{' '}
              <span className="text-charcoal-400 font-normal">&mdash; {geoLabel}</span>
            </h2>
            <p className="mt-2 text-sm font-body text-charcoal-500">
              {devs.length} development{devs.length !== 1 ? 's' : ''} in the current view. Scroll horizontally to compare.
            </p>
          </div>

          {/* ─── Comparison Grid ──────────────────────────────────────── */}
          <div className="overflow-x-auto rounded-xl border border-charcoal-200 bg-white shadow-sm">
            <table className="w-full min-w-[640px]">
              {/* Header row — development names */}
              <thead>
                <tr className="border-b border-charcoal-200">
                  <th className="sticky left-0 z-10 bg-charcoal-900 text-left px-4 py-3 text-xs font-body font-semibold uppercase tracking-wider text-ivory-100 min-w-[140px]">
                    Attribute
                  </th>
                  {devs.map((d) => (
                    <th
                      key={d.slug}
                      className="bg-charcoal-900 text-left px-4 py-3 text-xs font-body font-semibold text-ivory-100 min-w-[180px] max-w-[220px]"
                    >
                      <span className="block truncate">{d.name}</span>
                      {d.submarket && (
                        <span className="block text-[10px] font-normal text-charcoal-400 mt-0.5">
                          {d.submarket}
                        </span>
                      )}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {ROWS.map((row, idx) => (
                  <tr
                    key={row.label}
                    className={`border-b border-charcoal-100 ${idx % 2 === 0 ? 'bg-white' : 'bg-ivory-50/60'}`}
                  >
                    <td className="sticky left-0 z-10 px-4 py-2.5 text-xs font-body font-semibold text-charcoal-700 bg-inherit border-r border-charcoal-100 min-w-[140px]">
                      {row.label}
                    </td>
                    {devs.map((d) => {
                      const val = row.getValue(d);
                      const isStatus = row.label === 'Status';
                      const badge = isStatus ? STATUS_BADGE[d.status] : null;

                      return (
                        <td
                          key={d.slug}
                          className="px-4 py-2.5 text-xs font-body text-charcoal-600 min-w-[180px] max-w-[220px]"
                        >
                          {isStatus && badge ? (
                            <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold ${badge.bg} ${badge.text}`}>
                              {badge.label}
                            </span>
                          ) : row.label === 'Waterfront' ? (
                            <span className={val === 'Yes' ? 'text-emerald-600 font-semibold' : 'text-charcoal-400'}>
                              {val}
                            </span>
                          ) : (
                            <span className={val === '\u2014' || val === 'TBD' ? 'text-charcoal-400' : ''}>
                              {val}
                            </span>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}

                {/* Inventory Pressure row */}
                <tr className={`border-b border-charcoal-100 ${ROWS.length % 2 === 0 ? 'bg-white' : 'bg-ivory-50/60'}`}>
                  <td className="sticky left-0 z-10 px-4 py-2.5 text-xs font-body font-semibold text-charcoal-700 bg-inherit border-r border-charcoal-100 min-w-[140px]">
                    Inventory Pressure
                  </td>
                  {devs.map((d) => (
                    <td key={d.slug} className="px-4 py-2.5 text-xs font-body text-charcoal-600 min-w-[180px] max-w-[220px]">
                      {d.inventoryPressure ? (
                        <InventoryPressureBadge level={d.inventoryPressure} />
                      ) : (
                        <span className="text-charcoal-400">{'\u2014'}</span>
                      )}
                    </td>
                  ))}
                </tr>

                {/* Risk Flags row */}
                <tr className={`border-b border-charcoal-100 ${(ROWS.length + 1) % 2 === 0 ? 'bg-white' : 'bg-ivory-50/60'}`}>
                  <td className="sticky left-0 z-10 px-4 py-2.5 text-xs font-body font-semibold text-charcoal-700 bg-inherit border-r border-charcoal-100 min-w-[140px]">
                    Risk Flags
                  </td>
                  {devs.map((d) => {
                    const profile = getDevelopmentProfile(d.slug);
                    const flags = profile?.riskFlags ?? [];
                    return (
                      <td key={d.slug} className="px-4 py-2.5 text-xs font-body text-charcoal-600 min-w-[180px] max-w-[220px]">
                        {flags.length > 0 ? (
                          <RiskFlags flags={flags} />
                        ) : (
                          <span className="text-emerald-500 text-[10px] font-semibold">Clean</span>
                        )}
                      </td>
                    );
                  })}
                </tr>
              </tbody>
            </table>
          </div>

          {/* ─── HOA Value Justification Cards ────────────────────────── */}
          {devsWithHoa.length > 0 && (
            <div className="mt-10">
              <h3 className="text-lg font-heading font-bold text-charcoal-900 mb-1">
                HOA Value Justification
              </h3>
              <p className="text-xs font-body text-charcoal-500 mb-5">
                What amenities and services justify each building&apos;s monthly HOA assessment.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {devsWithHoa.map((d) => {
                  const amenities = getAmenities(d.slug);
                  const premiums = extractPremiumAmenities(amenities, d.tags);

                  return (
                    <div
                      key={d.slug}
                      className="rounded-xl border border-charcoal-200 bg-white p-5 shadow-sm"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h4 className="text-sm font-heading font-bold text-charcoal-900">
                            {d.name}
                          </h4>
                          {d.submarket && (
                            <p className="text-[10px] font-body text-charcoal-400 mt-0.5">
                              {d.submarket}
                            </p>
                          )}
                        </div>
                        <span className="inline-flex items-center rounded-full bg-gold-100 px-2.5 py-1 text-xs font-body font-bold text-gold-700">
                          ${d.hoaPerSqFt!.toFixed(2)} PSF
                        </span>
                      </div>

                      {/* Premium amenity tags */}
                      {premiums.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mb-3">
                          {premiums.map((tag) => (
                            <span
                              key={tag}
                              className="inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-body font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Amenity bullet list */}
                      {amenities.length > 0 ? (
                        <ul className="space-y-1 max-h-32 overflow-y-auto">
                          {amenities.slice(0, 8).map((a, i) => (
                            <li key={i} className="flex items-start gap-1.5 text-[11px] font-body text-charcoal-600">
                              <span className="mt-1 h-1 w-1 rounded-full bg-gold-500 shrink-0" />
                              <span className="line-clamp-2">{a}</span>
                            </li>
                          ))}
                          {amenities.length > 8 && (
                            <li className="text-[10px] font-body text-charcoal-400 italic pl-3">
                              +{amenities.length - 8} more amenities
                            </li>
                          )}
                        </ul>
                      ) : (
                        <p className="text-[11px] font-body text-charcoal-400 italic">
                          Amenity details coming soon
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
