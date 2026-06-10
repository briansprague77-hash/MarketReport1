'use client';

import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { fadeUp, defaultViewport } from '@/lib/animations';
import { trackedDevelopments } from '@/data/developments';
import { Check, Minus, ChevronDown } from 'lucide-react';

// ─── Comprehensive amenity categories ───────────────────────────────────────
const AMENITY_CATEGORIES = [
  // Aquatics & Outdoor
  { key: 'pool', label: 'Pool', group: 'Aquatics', keywords: ['pool', 'swim'] },
  { key: 'infinity-pool', label: 'Infinity Pool', group: 'Aquatics', keywords: ['infinity pool', 'infinity-edge', '160-ft'] },
  { key: 'jacuzzi', label: 'Jacuzzi/Hot Tub', group: 'Aquatics', keywords: ['jacuzzi', 'hot tub', 'spa', 'dual spa'] },
  { key: 'cabanas', label: 'Cabanas', group: 'Aquatics', keywords: ['cabana'] },
  { key: 'beach-access', label: 'Beach Access', group: 'Aquatics', keywords: ['beach access', 'beach', 'gulf-front', 'beachfront'] },
  // Wellness
  { key: 'spa', label: 'Full-Service Spa', group: 'Wellness', keywords: ['full-service spa', 'spa with', 'spa and'] },
  { key: 'sauna', label: 'Sauna/Steam', group: 'Wellness', keywords: ['sauna', 'steam'] },
  { key: 'massage', label: 'Massage Rooms', group: 'Wellness', keywords: ['massage'] },
  { key: 'fitness', label: 'Fitness Center', group: 'Wellness', keywords: ['fitness', 'gym', 'workout'] },
  { key: 'yoga', label: 'Yoga/Pilates', group: 'Wellness', keywords: ['yoga', 'pilates'] },
  // Dining & Social
  { key: 'restaurant', label: 'Restaurant', group: 'Dining', keywords: ['restaurant', 'dining'] },
  { key: 'bar', label: 'Bar/Lounge', group: 'Dining', keywords: ['bar', 'lounge', 'sky lounge', 'sunset'] },
  { key: 'cafe', label: 'Café', group: 'Dining', keywords: ['café', 'cafe', 'coffee'] },
  { key: 'summer-kitchen', label: 'Summer Kitchen', group: 'Dining', keywords: ['summer kitchen', 'outdoor kitchen'] },
  { key: 'fire-pit', label: 'Fire Pit', group: 'Dining', keywords: ['fire pit', 'fireside'] },
  // Services
  { key: 'concierge', label: '24/7 Concierge', group: 'Services', keywords: ['concierge', '24/7', '24-hour'] },
  { key: 'valet', label: 'Valet Parking', group: 'Services', keywords: ['valet'] },
  { key: 'hotel-services', label: 'Hotel Services', group: 'Services', keywords: ['hotel service', 'hotel-caliber', 'edition', 'ritz-carlton', 'pendry', 'viceroy', 'waldorf'] },
  { key: 'package-mgmt', label: 'Package/Cold Storage', group: 'Services', keywords: ['package', 'cold storage'] },
  // Entertainment
  { key: 'club', label: 'Club/Game Room', group: 'Entertainment', keywords: ['club', 'game room', 'game'] },
  { key: 'cinema', label: 'Theater/Cinema', group: 'Entertainment', keywords: ['cinema', 'theater', 'theatre', 'movie'] },
  { key: 'golf-sim', label: 'Golf Simulator', group: 'Entertainment', keywords: ['golf'] },
  { key: 'kids', label: 'Kids/Teen', group: 'Entertainment', keywords: ['kid', 'teen', 'youth', 'children'] },
  // Outdoor & Lifestyle
  { key: 'pet', label: 'Pet Amenities', group: 'Lifestyle', keywords: ['pet', 'dog'] },
  { key: 'ev', label: 'EV Charging', group: 'Lifestyle', keywords: ['ev charging', 'electric vehicle'] },
  { key: 'marina', label: 'Marina/Docks', group: 'Lifestyle', keywords: ['marina', 'dock', 'boat', 'yacht', 'slip'] },
  { key: 'rooftop', label: 'Rooftop Terrace', group: 'Lifestyle', keywords: ['rooftop', 'roof deck', 'sky deck'] },
  { key: 'retail', label: 'On-Site Retail', group: 'Lifestyle', keywords: ['retail', 'shop'] },
] as const;

// Group labels for display
const AMENITY_GROUPS = ['Aquatics', 'Wellness', 'Dining', 'Services', 'Entertainment', 'Lifestyle'] as const;

// ─── Amenity data by slug ───────────────────────────────────────────────────
// Compiled from each building's amenities[] + amenityHighlights[] + features[]
const AMENITY_DATA: Record<string, string[]> = {
  'waldorf-astoria': [
    'Peacock Alley Sky Lounge — rooftop sunset bar',
    'Resort-Style Pool Deck — two infinity-edge pools including 160-ft east pool, dual spas, poolside bar',
    'Holistic Wellness Center — private massage rooms, sauna, steam rooms, fitness studio',
    'Youth Entertainment Club — kids and teens activity center',
    'Golf Simulator', 'Pet Spa — dedicated grooming facility',
    'Private cinema', '24/7 Concierge', 'Valet parking',
    'EV charging stations', 'Cold storage and package management',
    'Hilton hotel services — in-residence dining, personal shopping, event planning',
    'Cabanas', 'Summer kitchens on terraces',
  ],
  'art-house': [
    'Resort pool with cabanas and sun shelf — 33,000 SF amenity level',
    'Fitness center with yoga studio', 'Social club lounge',
    'Outdoor summer kitchen and fire pit', 'Pet park',
    'Concierge', 'Valet parking', 'EV charging',
    'Game room', 'Children\'s playroom', 'Package management',
    'Rooftop terrace',
  ],
  '400-central': [
    'Resort pool deck with cabanas', 'Fitness center',
    'Resident lounge and social room', 'Dog park', 'Concierge',
    'Fire pit terrace', 'Package management', 'Yoga studio',
    'Retail at ground floor',
  ],
  'roche-bobois': [
    'Resort-style heated pool with swim lane and sun shelf',
    'Glass-edge cantilevered jacuzzi',
    'Poolside cabanas and summer kitchens', 'Fire pit and fireside lounge',
    'Fitness studio and spa with sauna and aquatic therapy',
    '24/7 Concierge services', 'VIP Owner\'s Lounge',
    '4,000 SF signature restaurant', '5,000 SF Public Arts Plaza',
    'Pet park', 'EV charging stations', 'Cold storage and package management',
  ],
  'reflection': [
    'Rooftop pool deck with lake views', 'Fitness center',
    'Resident lounge', 'Dog park', 'Lobby and event space',
    'Ground-floor retail',
  ],
  'the-cade': [
    'Infinity-edge pool — east-facing lake views',
    'Private fitness center', 'Resident Steward on-site (concierge)',
    'Private storage and wine lockers', 'Rooftop terrace',
    'EV charging', 'Pet amenities',
  ],
  'viceroy-clearwater': [
    'Resort infinity pool', 'Full-service spa', 'Fitness center with yoga',
    'Signature restaurant and bar', 'Valet parking',
    '24/7 Viceroy concierge — hotel services',
    'Private beach access', 'Club house and game room',
    'Teen lounge', 'Summer kitchens on terraces',
    'Cabanas', 'On-site sales gallery ($5M presentation center)',
  ],
  'corey-landings': [
    'Resort pool', 'Marina — 31 private slips + 8 public docks',
    'Kayak launch and water taxi dock', '11,000 SF retail/restaurant space',
    'Fitness center', 'Rooftop terrace',
    'Direct beach access',
  ],
  'pendry-tampa': [
    'Resort-style pool deck', 'Full-service Pendry spa',
    'Fitness center', 'Pendry concierge 24/7 — hotel services',
    'Signature restaurant and bar', 'Valet parking',
    'Private residents-only amenity spaces',
  ],
  'one-tampa': [
    'Resort pool deck with cabanas', 'Fitness center',
    'Resident lounge and social room', 'Dog park',
    'Concierge', 'Game room', 'Fire pit terrace',
    'EV charging', 'Package management',
  ],
  'ritz-carlton-tower-ii': [
    'Resort pool — dual pool campus shared with Tower I',
    'Full-service Ritz-Carlton spa with sauna and steam',
    'Fitness center with yoga', 'Ritz-Carlton concierge 24/7 — hotel services',
    'Restaurant and bar', 'Valet parking',
    'Marina and yacht access on Bayshore',
    'Cinema room', 'Kids play area', 'Fire pit',
  ],
  'tampa-edition': [
    'Rooftop pool and lounge', 'Full-service spa',
    'Fitness center', 'EDITION concierge — full hotel services',
    'Signature restaurants and bars', 'Valet parking',
  ],
  'hotel-ora': [
    'Resort pool deck', 'Fitness center',
    'Hotel lobby bar and restaurant', 'Concierge',
    'Rooftop terrace', 'Package management',
    'Short-term rental services — Airbnb/VRBO/Booking.com management',
  ],
  'aqua-westshore': [
    'Resort pool', 'Fitness center',
    'Westshore Yacht Club membership — marina access',
    'Dog park', 'Concierge', 'Fire pit terrace',
    'Kayak and paddleboard launch', 'Valet parking',
  ],
  'marina-pointe-luna': [
    'Resort pool deck with cabanas', 'Fitness center',
    'Marina — private dock access', 'Dog park',
    'Concierge', 'Fire pit', 'Package management',
    'Kayak launch', 'Rooftop terrace',
  ],
  'altura-bayshore': [
    'Pool with Bayshore views', 'Fitness center with yoga',
    'Resident lounge', 'Dog park', 'Concierge',
    'Rooftop terrace', 'Package management', 'EV charging',
  ],
  'lake-house': [
    'Rooftop terrace with lake and skyline views',
    'Swimming pool', 'Fitness center',
    '840 SF café', 'Lobby and event space',
    'Ground-floor retail', 'Pet amenities',
  ],
};

function hasAmenity(amenityList: string[], keywords: readonly string[]): boolean {
  const joined = amenityList.join(' ').toLowerCase();
  return keywords.some((kw) => joined.includes(kw));
}

function computeAmenities(slug: string): { checks: Record<string, boolean>; count: number } {
  const amenities = AMENITY_DATA[slug] || [];
  const checks: Record<string, boolean> = {};
  let count = 0;
  for (const cat of AMENITY_CATEGORIES) {
    const has = hasAmenity(amenities, cat.keywords);
    checks[cat.key] = has;
    if (has) count++;
  }
  return { checks, count };
}

export default function HoaAmenityGrid() {
  const [expandedGroup, setExpandedGroup] = useState<string | null>(null);

  const rows = useMemo(() => {
    return trackedDevelopments
      .filter((d) => d.hoaPerSqFt && d.hoaPerSqFt > 0 && d.status !== 'shadow-inventory')
      .map((d) => {
        const { checks, count } = computeAmenities(d.slug);
        return {
          slug: d.slug,
          name: d.name,
          county: d.county,
          submarket: d.submarket || '',
          hoaPerSqFt: d.hoaPerSqFt!,
          amenityCount: count,
          totalCategories: AMENITY_CATEGORIES.length,
          amenities: checks,
          status: d.status,
        };
      })
      .sort((a, b) => b.hoaPerSqFt - a.hoaPerSqFt);
  }, []);

  const avgHoa = rows.length > 0 ? rows.reduce((s, r) => s + r.hoaPerSqFt, 0) / rows.length : 0;
  const maxAmenities = Math.max(...rows.map((r) => r.amenityCount));

  return (
    <section className="py-16 bg-charcoal-950" id="hoa-amenity-grid">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={defaultViewport} className="mb-8">
          <p className="text-xs font-body font-semibold uppercase tracking-[0.25em] text-gold-500 mb-2">
            Ownership Cost Intelligence
          </p>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-ivory-50 mb-3">
            HOA &amp; Amenity Comparison
          </h2>
          <p className="text-sm font-body text-charcoal-400 max-w-2xl">
            {AMENITY_CATEGORIES.length} amenity categories tracked across {rows.length} buildings.
            Sorted by HOA cost per square foot. Market average: <span className="text-gold-400 font-semibold">${avgHoa.toFixed(2)}/SF/mo</span>.
          </p>
        </motion.div>

        {/* Amenity group toggles */}
        <div className="flex flex-wrap gap-2 mb-6">
          <button
            onClick={() => setExpandedGroup(null)}
            className={`px-3 py-1.5 rounded-full text-xs font-body font-semibold transition-all ${
              expandedGroup === null ? 'bg-gold-500 text-charcoal-900' : 'bg-charcoal-800 text-charcoal-400 hover:text-ivory-200'
            }`}
          >
            All ({AMENITY_CATEGORIES.length})
          </button>
          {AMENITY_GROUPS.map((group) => {
            const count = AMENITY_CATEGORIES.filter((c) => c.group === group).length;
            return (
              <button
                key={group}
                onClick={() => setExpandedGroup(expandedGroup === group ? null : group)}
                className={`px-3 py-1.5 rounded-full text-xs font-body font-semibold transition-all ${
                  expandedGroup === group ? 'bg-gold-500 text-charcoal-900' : 'bg-charcoal-800 text-charcoal-400 hover:text-ivory-200'
                }`}
              >
                {group} ({count})
              </button>
            );
          })}
        </div>

        {/* Scrollable table */}
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={defaultViewport} className="overflow-x-auto rounded-xl border border-charcoal-700/50">
          <table className="w-full">
            <thead>
              <tr className="bg-charcoal-900/80">
                <th className="sticky left-0 z-10 bg-charcoal-900 px-4 py-3 text-left text-[10px] font-body font-semibold uppercase tracking-wider text-charcoal-400 border-b border-charcoal-700/50 min-w-[160px]">
                  Building
                </th>
                <th className="px-3 py-3 text-center text-[10px] font-body font-semibold uppercase tracking-wider text-charcoal-400 border-b border-charcoal-700/50 min-w-[70px]">
                  HOA/SF
                </th>
                {AMENITY_CATEGORIES
                  .filter((cat) => expandedGroup === null || cat.group === expandedGroup)
                  .map((cat) => (
                    <th key={cat.key} className="px-1.5 py-3 text-center text-[9px] font-body font-semibold uppercase tracking-wider text-charcoal-500 border-b border-charcoal-700/50 min-w-[50px]">
                      <span className="block leading-tight">{cat.label}</span>
                    </th>
                  ))}
                <th className="px-3 py-3 text-center text-[10px] font-body font-semibold uppercase tracking-wider text-charcoal-400 border-b border-charcoal-700/50 min-w-[60px]">
                  Total
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => {
                const isAboveAvg = row.hoaPerSqFt > avgHoa;
                const filteredCats = AMENITY_CATEGORIES.filter((cat) => expandedGroup === null || cat.group === expandedGroup);
                const filteredCount = filteredCats.filter((cat) => row.amenities[cat.key]).length;

                return (
                  <tr
                    key={row.slug}
                    className={`${i % 2 === 0 ? 'bg-charcoal-900/40' : 'bg-charcoal-900/20'} hover:bg-charcoal-800/60 transition-colors`}
                  >
                    <td className="sticky left-0 z-10 bg-inherit px-4 py-2.5 border-b border-charcoal-800/30">
                      <a href={`/developments/${row.slug}`} className="text-sm font-heading font-bold text-ivory-100 hover:text-gold-400 transition-colors">
                        {row.name}
                      </a>
                      <p className="text-[10px] font-body text-charcoal-500 capitalize">{row.submarket}</p>
                    </td>

                    <td className="px-3 py-2.5 text-center border-b border-charcoal-800/30">
                      <span className={`text-sm font-heading font-bold tabular-nums ${isAboveAvg ? 'text-amber-400' : 'text-emerald-400'}`}>
                        ${row.hoaPerSqFt.toFixed(2)}
                      </span>
                    </td>

                    {filteredCats.map((cat) => (
                      <td key={cat.key} className="px-1.5 py-2.5 text-center border-b border-charcoal-800/30">
                        {row.amenities[cat.key] ? (
                          <Check className="h-3.5 w-3.5 text-emerald-400 mx-auto" />
                        ) : (
                          <Minus className="h-3 w-3 text-charcoal-700 mx-auto" />
                        )}
                      </td>
                    ))}

                    <td className="px-3 py-2.5 text-center border-b border-charcoal-800/30">
                      <div className="flex items-center justify-center gap-1.5">
                        <span className={`text-sm font-heading font-bold tabular-nums ${row.amenityCount === maxAmenities ? 'text-gold-400' : 'text-ivory-100'}`}>
                          {expandedGroup ? filteredCount : row.amenityCount}
                        </span>
                        <span className="text-[10px] text-charcoal-500">/{expandedGroup ? filteredCats.length : AMENITY_CATEGORIES.length}</span>
                      </div>
                      {/* Mini bar */}
                      <div className="h-1 bg-charcoal-800 rounded-full overflow-hidden mt-1 mx-auto w-12">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-gold-600 to-gold-400"
                          style={{ width: `${((expandedGroup ? filteredCount : row.amenityCount) / (expandedGroup ? filteredCats.length : AMENITY_CATEGORIES.length)) * 100}%` }}
                        />
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </motion.div>

        {/* Summary cards */}
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={defaultViewport} className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="rounded-xl border border-charcoal-700/50 bg-charcoal-900/60 p-5">
            <p className="text-[10px] font-body text-charcoal-500 uppercase tracking-wider mb-1">Most Amenity-Rich</p>
            <p className="text-lg font-heading font-bold text-gold-400">{rows.find((r) => r.amenityCount === maxAmenities)?.name}</p>
            <p className="text-xs font-body text-charcoal-400 mt-1">{maxAmenities}/{AMENITY_CATEGORIES.length} categories at ${rows.find((r) => r.amenityCount === maxAmenities)?.hoaPerSqFt.toFixed(2)}/SF</p>
          </div>
          <div className="rounded-xl border border-charcoal-700/50 bg-charcoal-900/60 p-5">
            <p className="text-[10px] font-body text-charcoal-500 uppercase tracking-wider mb-1">Market Average HOA</p>
            <p className="text-lg font-heading font-bold text-ivory-100">${avgHoa.toFixed(2)}/SF/mo</p>
            <p className="text-xs font-body text-charcoal-400 mt-1">Across {rows.length} buildings with confirmed HOA data</p>
          </div>
          <div className="rounded-xl border border-charcoal-700/50 bg-charcoal-900/60 p-5">
            <p className="text-[10px] font-body text-charcoal-500 uppercase tracking-wider mb-1">Best Value (Amenities per $)</p>
            {(() => {
              const best = [...rows].sort((a, b) => (b.amenityCount / b.hoaPerSqFt) - (a.amenityCount / a.hoaPerSqFt))[0];
              return best ? (
                <>
                  <p className="text-lg font-heading font-bold text-emerald-400">{best.name}</p>
                  <p className="text-xs font-body text-charcoal-400 mt-1">{best.amenityCount} amenities at ${best.hoaPerSqFt.toFixed(2)}/SF</p>
                </>
              ) : null;
            })()}
          </div>
        </motion.div>

        <p className="mt-4 text-[10px] font-body text-charcoal-600 italic">
          HOA rates are flat per-SF — same rate for studios and penthouses. Amenity coverage sourced from developer disclosures, MLS broker remarks, and property websites. {AMENITY_CATEGORIES.length} categories across {AMENITY_GROUPS.length} groups. Updated April 2026.
        </p>
      </div>
    </section>
  );
}
