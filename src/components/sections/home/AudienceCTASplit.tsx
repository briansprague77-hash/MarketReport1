'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { fadeUp, defaultViewport } from '@/lib/animations';

export default function AudienceCTASplit() {
  return (
    <section className="py-20 bg-charcoal-900/40 border-t border-ivory-100/5">
      <div className="container-luxury">
        <motion.div
          initial="hidden" whileInView="visible" viewport={defaultViewport} variants={fadeUp}
          className="text-center mb-10"
        >
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white mb-3">
            Pick Your Path
          </h2>
          <p className="text-ivory-400/60">One site, two workflows.</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          <Link href="/realtor-resources" className="flex h-full">
            <motion.div
              initial="hidden" whileInView="visible" viewport={defaultViewport} variants={fadeUp}
              className="group flex flex-col w-full rounded-2xl border border-gold-500/20 bg-charcoal-900/60 hover:border-gold-500/50 hover:bg-charcoal-800/80 transition-all p-10 h-full"
            >
              <div className="text-xs font-body font-semibold uppercase tracking-[0.25em] text-gold-500 mb-3">For Realtors</div>
              <h3 className="font-heading text-2xl font-bold text-white mb-3 group-hover:text-gold-400 transition-colors">I&rsquo;m an Agent</h3>
              <p className="text-ivory-400/70 mb-6 leading-relaxed flex-1">Co-op splits, developer sales team contacts, client-ready comps, and share/export tools.</p>
              <div className="text-sm text-gold-400 font-medium">Realtor Resources →</div>
            </motion.div>
          </Link>

          <Link href="/developments" className="flex h-full">
            <motion.div
              initial="hidden" whileInView="visible" viewport={defaultViewport} variants={fadeUp}
              className="group flex flex-col w-full rounded-2xl border border-ivory-100/10 bg-charcoal-900/60 hover:border-ivory-100/30 hover:bg-charcoal-800/80 transition-all p-10 h-full"
            >
              <div className="text-xs font-body font-semibold uppercase tracking-[0.25em] text-ivory-400 mb-3">For Buyers</div>
              <h3 className="font-heading text-2xl font-bold text-white mb-3 group-hover:text-ivory-100 transition-colors">I&rsquo;m Buying</h3>
              <p className="text-ivory-400/70 mb-6 leading-relaxed flex-1">Filter by price, submarket, and delivery window. See sold %, HOA, and what the developer&rsquo;s actually asking.</p>
              <div className="text-sm text-ivory-200 font-medium">Browse Developments →</div>
            </motion.div>
          </Link>
        </div>
      </div>
    </section>
  );
}
