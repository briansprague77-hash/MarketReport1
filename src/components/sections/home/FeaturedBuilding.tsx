'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { computeMarketEvents } from '@/lib/computeMarketEvents';
import { trackedDevelopments } from '@/data/market';
import { fadeUp, defaultViewport } from '@/lib/animations';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';

export default function FeaturedBuilding() {
  const events = computeMarketEvents(1);
  const featuredSlug = events[0]?.devSlug ?? 'waldorf-astoria';
  const dev = trackedDevelopments.find((d) => d.slug === featuredSlug);
  if (!dev) return null;

  const psf = dev.resalePsf ?? dev.developerClosePsf ?? dev.avgPsf;

  return (
    <section className="py-20 bg-charcoal-950 border-t border-ivory-100/5">
      <div className="container-luxury">
        <motion.div initial="hidden" whileInView="visible" viewport={defaultViewport} variants={fadeUp} className="mb-8">
          <Badge label="Building in Focus" variant="gold" />
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white mt-4">
            {events[0] ? `Why ${dev.name} This Week` : 'Featured Building'}
          </h2>
        </motion.div>

        <motion.div
          initial="hidden" whileInView="visible" viewport={defaultViewport} variants={fadeUp}
          className={`grid ${dev.image ? 'md:grid-cols-2' : 'md:grid-cols-1'} gap-8 items-stretch rounded-2xl border border-gold-500/20 bg-gradient-to-br from-charcoal-900/80 to-charcoal-950 overflow-hidden`}
        >
          {dev.image && (
            <div className="relative min-h-[320px]">
              <img src={dev.image} alt={dev.name} className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-charcoal-950/40" />
            </div>
          )}
          <div className="p-8">
            <div className="text-xs font-body font-semibold uppercase tracking-wider text-gold-500 mb-3">{dev.statusLabel}</div>
            <h3 className="font-heading text-2xl sm:text-3xl font-bold text-white mb-2">{dev.name}</h3>
            <p className="text-ivory-400/60 mb-6">{dev.location}</p>

            {events[0] && (
              <div className="mb-6 p-4 rounded-lg bg-gold-500/5 border border-gold-500/20">
                <div className="text-xs text-gold-400 uppercase tracking-wider mb-1">This Week</div>
                <div className="text-ivory-100 font-medium">{events[0].headline}</div>
                <div className="text-xs text-ivory-400/60 mt-1">{events[0].body}</div>
              </div>
            )}

            <div className="grid grid-cols-3 gap-4 mb-6">
              {dev.units > 0 && <Stat label="Units" value={dev.units.toLocaleString()} />}
              {psf && <Stat label="$/SF" value={`$${psf.toLocaleString()}`} />}
              {dev.soldPercent != null && <Stat label="Sold" value={`${dev.soldPercent}%`} />}
            </div>

            <Link href={`/developments/${dev.slug}`}>
              <Button variant="primary" size="md">View Full Report</Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-xs text-ivory-400/50 mb-1">{label}</div>
      <div className="text-xl font-heading font-bold text-white">{value}</div>
    </div>
  );
}
