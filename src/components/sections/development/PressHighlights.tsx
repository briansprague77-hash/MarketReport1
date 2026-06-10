'use client';

import { motion } from 'framer-motion';
import { Development } from '@/types/development';
import SectionHeader from '@/components/ui/SectionHeader';
import {
  fadeUp,
  staggerContainer,
  staggerItem,
  defaultViewport,
} from '@/lib/animations';
import { Quote, Newspaper, Crown } from 'lucide-react';

interface PressHighlightsProps {
  development: Development;
}

export default function PressHighlights({ development }: PressHighlightsProps) {
  const { pressHighlights, penthouse } = development;

  if (!pressHighlights || pressHighlights.length === 0) return null;

  return (
    <section id="press" className="section-padding bg-charcoal-900">
      <div className="container-luxury">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
        >
          <SectionHeader
            eyebrow="Market Validation"
            title="Press & Market Evidence"
            subtitle="Major press coverage and market milestones validating the development's positioning and pricing power."
            variant="dark"
          />
        </motion.div>

        {/* ─── Record Penthouse Callout ────────────────────────────────── */}
        {penthouse && (
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={defaultViewport}
            className="mb-12 rounded-2xl border border-gold-500/30 bg-gradient-to-br from-gold-500/10 via-charcoal-900/60 to-charcoal-900/80 p-8 md:p-10 relative overflow-hidden"
          >
            <div className="absolute -top-16 -right-16 w-48 h-48 bg-gold-500/5 rounded-full blur-3xl" />
            <div className="relative">
              <div className="flex items-center gap-3 mb-4">
                <Crown className="h-6 w-6 text-gold-500" />
                <span className="text-xs font-body font-bold uppercase tracking-[0.2em] text-gold-400">
                  Tampa Bay Record
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div>
                  <div className="text-4xl md:text-5xl font-heading font-bold text-gold-400">
                    {penthouse.price}
                  </div>
                  <div className="text-sm font-body text-charcoal-400 mt-1">
                    Record Transaction
                  </div>
                </div>
                <div>
                  <div className="text-2xl font-heading font-bold text-ivory-100">
                    {penthouse.sqft}
                  </div>
                  <div className="text-sm font-body text-charcoal-400 mt-1">
                    {penthouse.floors}
                  </div>
                </div>
                <div>
                  <ul className="space-y-1.5">
                    {penthouse.features.map((f) => (
                      <li
                        key={f}
                        className="text-sm font-body text-ivory-300 flex items-start gap-2"
                      >
                        <span className="text-gold-500 mt-0.5">•</span>
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <p className="text-sm font-body text-charcoal-400 leading-relaxed border-t border-charcoal-700/40 pt-4">
                {penthouse.recordNote}
              </p>
            </div>
          </motion.div>
        )}

        {/* ─── Press Cards ────────────────────────────────────────────── */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
        >
          {pressHighlights.map((item, index) => (
            <motion.div
              key={index}
              variants={staggerItem}
              className="rounded-xl border border-charcoal-700/50 bg-charcoal-800/40 p-6 flex flex-col"
            >
              <div className="flex items-center gap-3 mb-4">
                <Newspaper className="h-4 w-4 text-charcoal-500" />
                <span className="text-xs font-body font-bold uppercase tracking-wider text-charcoal-400">
                  {item.source}
                </span>
                <span className="text-xs font-body text-charcoal-500 ml-auto">
                  {item.date}
                </span>
              </div>

              <h3 className="text-base font-heading font-bold text-ivory-100 mb-3 leading-snug">
                {item.headline}
              </h3>

              {item.quote && (
                <div className="flex-1 flex items-start gap-3 mt-auto pt-4 border-t border-charcoal-700/30">
                  <Quote className="h-4 w-4 text-gold-500/60 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-body text-ivory-300 italic leading-relaxed">
                      &ldquo;{item.quote}&rdquo;
                    </p>
                    {item.quoteAttribution && (
                      <p className="text-xs font-body text-charcoal-400 mt-2">
                        — {item.quoteAttribution}
                      </p>
                    )}
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
