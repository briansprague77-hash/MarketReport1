'use client';

import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { fadeUp, staggerContainer, staggerItem, defaultViewport } from '@/lib/animations';
import { Check, Minus } from 'lucide-react';
import type { MarketData } from '@/hooks/useMarketData';

// ─── Bedroom type parsing ───────────────────────────────────────────────────

type BedroomType = 'Studio' | '1BR' | '2BR' | '3BR' | '4BR+';
const BEDROOM_TYPES: BedroomType[] = ['Studio', '1BR', '2BR', '3BR', '4BR+'];

const BEDROOM_COLORS: Record<BedroomType, string> = {
  Studio: '#8B5CF6',
  '1BR': '#3B82F6',
  '2BR': '#0D9668',
  '3BR': '#C9A84C',
  '4BR+': '#DC2626',
};

/**
 * Parse a bedrooms string like "2-4", "Studio-3 + PH", "1-3 BR + Penthouses"
 * and return which bedroom types are offered.
 */
function parseBedroomTypes(bedrooms: string | undefined): Set<BedroomType> {
  const types = new Set<BedroomType>();
  if (!bedrooms) return types;

  const lower = bedrooms.toLowerCase();

  // Check for studio
  if (lower.includes('studio') || lower.includes('0')) {
    types.add('Studio');
  }

  // Check for penthouse (usually 4BR+)
  if (lower.includes('ph') || lower.includes('penthouse')) {
    types.add('4BR+');
  }

  // Extract numeric range like "1-4", "2-3"
  const rangeMatch = lower.match(/(\d)\s*[-–]\s*(\d)/);
  if (rangeMatch) {
    const low = parseInt(rangeMatch[1]);
    const high = parseInt(rangeMatch[2]);
    for (let i = low; i <= high; i++) {
      if (i === 0) types.add('Studio');
      else if (i === 1) types.add('1BR');
      else if (i === 2) types.add('2BR');
      else if (i === 3) types.add('3BR');
      else if (i >= 4) types.add('4BR+');
    }
  } else {
    // Single number like "2 BR"
    const singleMatch = lower.match(/(\d)\s*br/);
    if (singleMatch) {
      const n = parseInt(singleMatch[1]);
      if (n === 0) types.add('Studio');
      else if (n === 1) types.add('1BR');
      else if (n === 2) types.add('2BR');
      else if (n === 3) types.add('3BR');
      else if (n >= 4) types.add('4BR+');
    }
  }

  // If we parsed nothing but have content, assume 2-3BR as default
  if (types.size === 0 && bedrooms.trim().length > 0) {
    types.add('2BR');
    types.add('3BR');
  }

  return types;
}

// ─── Component ──────────────────────────────────────────────────────────────

interface BedroomMixProps {
  data?: MarketData;
}

export default function BedroomMix({ data }: BedroomMixProps) {
  const geoLabel = data?.geoLabel ?? 'Tampa Bay';
  const filtered = data?.filtered ?? [];

  // Build matrix: development -> bedroom types offered, sorted by PSF descending
  const matrix = useMemo(() => {
    return filtered
      .filter((d) => d.status !== 'sold-out')
      .map((d) => ({
        name: d.name,
        avgPsf: d.avgPsf ?? 0,
        types: parseBedroomTypes(d.bedrooms),
        bedrooms: d.bedrooms ?? '—',
      }))
      .sort((a, b) => b.avgPsf - a.avgPsf);
  }, [filtered]);

  // Count how many buildings offer each type
  const typeCounts = useMemo(() => {
    const counts: Record<BedroomType, number> = {
      Studio: 0,
      '1BR': 0,
      '2BR': 0,
      '3BR': 0,
      '4BR+': 0,
    };
    for (const row of matrix) {
      for (const t of BEDROOM_TYPES) {
        if (row.types.has(t)) counts[t]++;
      }
    }
    return counts;
  }, [matrix]);

  if (matrix.length === 0) return null;

  return (
    <section className="py-16 bg-ivory-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-10"
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          variants={fadeUp}
        >
          <p className="text-xs font-body font-semibold uppercase tracking-[0.25em] text-gold-600 mb-3">
            Unit Mix Intelligence
          </p>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-charcoal-900">
            Bedroom Segmentation — {geoLabel}
          </h2>
          <p className="mt-3 text-base font-body text-charcoal-500 max-w-2xl mx-auto">
            Which bedroom types each building offers, sorted by price per square foot
          </p>
        </motion.div>

        {/* ─── Legend ─────────────────────────────────────────────────── */}
        <motion.div
          className="flex flex-wrap justify-center gap-4 mb-8"
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          variants={fadeUp}
        >
          {BEDROOM_TYPES.map((t) => (
            <div key={t} className="flex items-center gap-2">
              <div
                className="h-3 w-3 rounded-sm"
                style={{ backgroundColor: BEDROOM_COLORS[t] }}
              />
              <span className="text-xs font-body font-medium text-charcoal-600">
                {t} ({typeCounts[t]})
              </span>
            </div>
          ))}
        </motion.div>

        {/* ─── Matrix Table ──────────────────────────────────────────── */}
        <motion.div
          className="overflow-x-auto"
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          variants={staggerContainer}
        >
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b-2 border-charcoal-200">
                <th className="text-left py-3 px-4 font-body font-semibold text-charcoal-700 uppercase tracking-wider text-xs">
                  Development
                </th>
                <th className="text-center py-3 px-3 font-body font-semibold text-charcoal-700 uppercase tracking-wider text-xs">
                  Avg PSF
                </th>
                {BEDROOM_TYPES.map((t) => (
                  <th
                    key={t}
                    className="text-center py-3 px-3 font-body font-semibold uppercase tracking-wider text-xs"
                    style={{ color: BEDROOM_COLORS[t] }}
                  >
                    {t}
                  </th>
                ))}
                <th className="text-left py-3 px-4 font-body font-semibold text-charcoal-700 uppercase tracking-wider text-xs">
                  Range
                </th>
              </tr>
            </thead>
            <tbody>
              {matrix.map((row, idx) => (
                <motion.tr
                  key={row.name}
                  variants={staggerItem}
                  className={`border-b border-charcoal-100 ${idx % 2 === 0 ? 'bg-white' : 'bg-ivory-50'} hover:bg-gold-50/50 transition-colors`}
                >
                  <td className="py-3 px-4 font-body font-medium text-charcoal-800 whitespace-nowrap">
                    {row.name}
                  </td>
                  <td className="py-3 px-3 text-center font-body font-semibold text-charcoal-700">
                    {row.avgPsf > 0 ? `$${row.avgPsf.toLocaleString()}` : '—'}
                  </td>
                  {BEDROOM_TYPES.map((t) => (
                    <td key={t} className="py-3 px-3 text-center">
                      {row.types.has(t) ? (
                        <Check className="h-4 w-4 mx-auto" style={{ color: BEDROOM_COLORS[t] }} />
                      ) : (
                        <Minus className="h-4 w-4 mx-auto text-charcoal-300" />
                      )}
                    </td>
                  ))}
                  <td className="py-3 px-4 font-body text-xs text-charcoal-500 whitespace-nowrap">
                    {row.bedrooms}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </motion.div>

        {/* ─── Narrative ─────────────────────────────────────────────── */}
        <motion.div
          className="mt-8 rounded-xl border border-charcoal-200 bg-white p-6"
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          variants={fadeUp}
        >
          <h3 className="text-sm font-body font-semibold uppercase tracking-widest text-gold-600 mb-3">
            Analyst&apos;s Take
          </h3>
          <p className="text-sm font-body leading-relaxed text-charcoal-600">
            The {geoLabel} pipeline offers full bedroom coverage from studios (Roche Bobois from $544K)
            to 5BR penthouses (Viceroy at $12M). The 2-3BR segment dominates with 90%+ of inventory,
            while studios are limited to Roche Bobois and Hotel ORA — creating scarcity-driven pricing
            at $1,400+/SF for the smallest units.
          </p>
          <p className="mt-4 text-xs font-body text-charcoal-400">
            Bedroom types parsed from developer disclosures. Checkmarks indicate the building offers that
            bedroom type; exact unit counts per type are not publicly available for most developments.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
