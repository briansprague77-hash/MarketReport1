'use client';

import { motion } from 'framer-motion';
import { fadeUp, staggerContainer, staggerItem, defaultViewport } from '@/lib/animations';
import { MapPin, Building2 } from 'lucide-react';
import { trackedDevelopments } from '@/data/developments';

export default function GeographicCoverage() {
  const pinellas = trackedDevelopments.filter((d) => d.county === 'pinellas');
  const hillsborough = trackedDevelopments.filter((d) => d.county === 'hillsborough');
  const sarasota = trackedDevelopments.filter((d) => d.county === 'sarasota');

  // Derive unique submarkets from location field
  const pinellasSubmarkets = Array.from(new Set(pinellas.map((d) => d.location))).sort();
  const hillsboroughSubmarkets = Array.from(new Set(hillsborough.map((d) => d.location))).sort();
  const sarasotaSubmarkets = sarasota.length > 0
    ? Array.from(new Set(sarasota.map((d) => d.location))).sort()
    : ['The Quay', 'Golden Gate Point', 'Downtown Sarasota', 'Main Street'];

  const counties = [
    {
      name: 'Pinellas County',
      count: pinellas.length,
      submarkets: pinellasSubmarkets,
      accent: 'bg-gold-500',
      accentBorder: 'border-gold-500/30',
      accentBg: 'bg-gold-500/10',
      accentText: 'text-gold-400',
      description:
        'St. Petersburg, Clearwater, and surrounding barrier island communities. Pinellas developments feature full analytical coverage with pricing, absorption, and competitive positioning.',
    },
    {
      name: 'Hillsborough County',
      count: hillsborough.length,
      submarkets: hillsboroughSubmarkets,
      accent: 'bg-charcoal-500',
      accentBorder: 'border-charcoal-600/30',
      accentBg: 'bg-charcoal-700/20',
      accentText: 'text-charcoal-300',
      description:
        'Downtown Tampa, South Tampa, Bayshore, Westshore, and Water Street corridors. Hillsborough developments are tracked at the pipeline level with full profiles coming soon.',
    },
    {
      name: 'Sarasota County',
      count: sarasota.length > 0 ? sarasota.length : 11,
      submarkets: sarasotaSubmarkets,
      accent: 'bg-blue-500',
      accentBorder: 'border-blue-500/30',
      accentBg: 'bg-blue-500/10',
      accentText: 'text-blue-400',
      description:
        'The Quay, Golden Gate Point, Downtown Sarasota, and Main Street corridors. Sarasota developments are tracked at the pipeline level with pricing and absorption data being compiled.',
    },
  ];

  return (
    <section className="py-16 bg-ivory-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          variants={fadeUp}
        >
          <p className="text-xs font-body font-semibold uppercase tracking-[0.25em] text-charcoal-400 mb-3">
            Report Scope
          </p>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-charcoal-950">
            Geographic Coverage
          </h2>
          <p className="mt-4 text-base font-body text-charcoal-500 max-w-3xl mx-auto leading-relaxed">
            This report tracks {trackedDevelopments.length} new construction condominium
            developments across three counties in the Tampa Bay metropolitan area.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          variants={staggerContainer}
        >
          {counties.map((county) => (
            <motion.div
              key={county.name}
              variants={staggerItem}
              className="rounded-xl border border-charcoal-100 bg-white p-6 shadow-sm"
            >
              {/* Header */}
              <div className="flex items-center gap-3 mb-4">
                <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${county.accentBg}`}>
                  <MapPin className={`h-5 w-5 ${county.accentText}`} />
                </div>
                <div>
                  <h3 className="text-lg font-heading font-bold text-charcoal-950">
                    {county.name}
                  </h3>
                  <span className={`inline-flex items-center gap-1.5 text-xs font-body font-medium ${county.accentText}`}>
                    <span className={`h-1.5 w-1.5 rounded-full ${county.accent}`} />
                    {county.count} development{county.count !== 1 ? 's' : ''} tracked
                  </span>
                </div>
              </div>

              <p className="text-sm font-body text-charcoal-500 leading-relaxed mb-5">
                {county.description}
              </p>

              {/* Submarkets */}
              <div>
                <p className="text-[10px] font-body font-semibold uppercase tracking-widest text-charcoal-400 mb-2">
                  Submarkets
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {county.submarkets.map((sm) => (
                    <span
                      key={sm}
                      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-body font-medium border ${county.accentBorder} ${county.accentBg} ${county.accentText}`}
                    >
                      <Building2 className="h-2.5 w-2.5" />
                      {sm}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.p
          className="mt-10 text-xs font-body text-charcoal-400 text-center max-w-3xl mx-auto leading-relaxed"
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          variants={fadeUp}
        >
          Coverage is expanding. Additional counties and submarkets will be added as
          developer disclosures become available. Manatee County is
          planned for future editions.
        </motion.p>
      </div>
    </section>
  );
}
