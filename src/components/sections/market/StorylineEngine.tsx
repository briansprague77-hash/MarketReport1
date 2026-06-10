'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { fadeUp, staggerContainer, staggerItem, defaultViewport } from '@/lib/animations';
import { generateStoryline, sortByStorylinePriority } from '@/lib/storyline';
import { classifyTimingWindow, TIMING_WINDOW_META } from '@/lib/timing';
import type { MarketData } from '@/hooks/useMarketData';

interface StorylineEngineProps {
  data?: MarketData;
}

export default function StorylineEngine({ data }: StorylineEngineProps) {
  const [expandedSlug, setExpandedSlug] = useState<string | null>(null);

  if (!data) return null;

  const sorted = sortByStorylinePriority(data.filtered);
  const geoLabel = data.geoLabel;

  return (
    <section className="section-padding bg-charcoal-950">
      <div className="container-luxury">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          className="mb-10"
        >
          <p className="font-body text-xs uppercase tracking-[0.25em] text-gold-500 mb-2">
            AI-Generated Analysis
          </p>
          <h2 className="font-heading text-3xl md:text-4xl text-ivory-50 mb-3">
            Project Storylines — {geoLabel}
          </h2>
          <p className="font-body text-charcoal-400 max-w-2xl">
            Analytical narratives for each tracked development based on status, pricing,
            absorption, and competitive positioning data.
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          className="space-y-3"
        >
          {sorted.map((dev) => {
            const storyline = generateStoryline(dev);
            const window = classifyTimingWindow(dev);
            const meta = TIMING_WINDOW_META[window];
            const isExpanded = expandedSlug === dev.slug;
            const firstSentence = storyline.fullNarrative.split('.')[0] + '.';

            return (
              <motion.div
                key={dev.slug}
                variants={staggerItem}
                className="rounded-xl border border-charcoal-700/50 bg-charcoal-900/60 overflow-hidden"
              >
                {/* Accordion Header */}
                <button
                  onClick={() => setExpandedSlug(isExpanded ? null : dev.slug)}
                  className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left hover:bg-charcoal-800/30 transition-colors"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-body font-semibold uppercase tracking-wider ${meta.bgClass} ${meta.textClass} border ${meta.borderClass} whitespace-nowrap`}
                    >
                      {meta.label}
                    </span>
                    <div className="min-w-0">
                      <h3 className="font-heading text-base text-ivory-100 truncate">
                        {dev.name}
                      </h3>
                      <p className="font-body text-xs text-charcoal-400 truncate mt-0.5">
                        {firstSentence}
                      </p>
                    </div>
                  </div>
                  <ChevronDown
                    className={`h-4 w-4 text-charcoal-500 transition-transform flex-shrink-0 ${
                      isExpanded ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {/* Expanded Content */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-5 pt-1 border-t border-charcoal-700/30">
                        {/* Narrative Paragraphs */}
                        <div className="space-y-4 mt-3">
                          {storyline.fullNarrative.split('\n\n').map((paragraph, i) => (
                            <p
                              key={i}
                              className="font-body text-sm text-charcoal-300 leading-relaxed"
                            >
                              {paragraph}
                            </p>
                          ))}
                        </div>

                        {/* Quick stats footer */}
                        <div className="flex flex-wrap gap-4 mt-5 pt-4 border-t border-charcoal-700/30">
                          <div>
                            <span className="block font-body text-[10px] uppercase tracking-wider text-charcoal-500">
                              Units
                            </span>
                            <span className="font-body text-sm text-ivory-200 font-medium">
                              {dev.units.toLocaleString()}
                            </span>
                          </div>
                          {dev.avgPsf && (
                            <div>
                              <span className="block font-body text-[10px] uppercase tracking-wider text-charcoal-500">
                                Avg PSF
                              </span>
                              <span className="font-body text-sm text-ivory-200 font-medium">
                                ${dev.avgPsf.toLocaleString()}
                              </span>
                            </div>
                          )}
                          {dev.soldPercent !== undefined && (
                            <div>
                              <span className="block font-body text-[10px] uppercase tracking-wider text-charcoal-500">
                                Sold
                              </span>
                              <span className="font-body text-sm text-ivory-200 font-medium">
                                {dev.soldPercent}%
                              </span>
                            </div>
                          )}
                          <div>
                            <span className="block font-body text-[10px] uppercase tracking-wider text-charcoal-500">
                              Delivery
                            </span>
                            <span className="font-body text-sm text-ivory-200 font-medium">
                              {dev.delivery}
                            </span>
                          </div>
                          <div>
                            <span className="block font-body text-[10px] uppercase tracking-wider text-charcoal-500">
                              Developer
                            </span>
                            <span className="font-body text-sm text-ivory-200 font-medium">
                              {dev.developer ?? '—'}
                            </span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Disclaimer */}
        <p className="font-body text-[10px] text-charcoal-600 mt-6 italic">
          Narratives are algorithmically generated from tracked data fields — not editorial opinion.
          Verify all claims against primary sources before advising clients.
        </p>
      </div>
    </section>
  );
}
