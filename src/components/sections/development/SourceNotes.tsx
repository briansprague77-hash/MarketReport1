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

interface SourceNotesProps {
  development: Development;
}

export default function SourceNotes({ development }: SourceNotesProps) {
  const { sourceNotes } = development;
  if (!sourceNotes || sourceNotes.length === 0) return null;

  return (
    <section id="source-notes" className="section-padding bg-ivory-100">
      <div className="container-luxury">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
        >
          <SectionHeader
            eyebrow="Data Integrity"
            title="Source Notes & Advisories"
            subtitle="Transparency for trusted advisors — documented discrepancies between official sources with our resolution methodology."
          />
        </motion.div>

        <motion.div
          className="space-y-6"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
        >
          {sourceNotes.map((note, i) => (
            <motion.div
              key={i}
              className="bg-white border border-ivory-300 rounded-sm overflow-hidden"
              variants={staggerItem}
            >
              {/* Header */}
              <div className="flex items-center gap-3 px-6 py-4 border-b border-ivory-200 bg-ivory-50">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-sm text-xs font-body font-semibold uppercase tracking-wider bg-gold-500/10 text-gold-700 border border-gold-500/20">
                  {note.category}
                </span>
                <span className="text-sm font-body font-medium text-charcoal-600">
                  {note.field}
                </span>
              </div>

              {/* Body */}
              <div className="px-6 py-5">
                <p className="text-sm font-body text-charcoal-700 leading-relaxed mb-4">
                  {note.note}
                </p>

                {/* Sources comparison */}
                {note.sources && note.sources.length > 0 && (
                  <div className="mb-4">
                    <h4 className="text-xs font-body font-semibold uppercase tracking-widest text-charcoal-500 mb-2">
                      Source Comparison
                    </h4>
                    <div className="space-y-1.5">
                      {note.sources.map((src, j) => (
                        <div
                          key={j}
                          className="flex items-start gap-3 text-sm font-body"
                        >
                          <span className="text-charcoal-400 shrink-0 w-48 font-medium">
                            {src.name}
                          </span>
                          <span className="text-charcoal-700">{src.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Resolution */}
                <div className="bg-gold-500/5 border border-gold-500/15 rounded-sm px-4 py-3">
                  <p className="text-xs font-body text-charcoal-600 leading-relaxed">
                    <span className="font-semibold text-gold-700">Resolution: </span>
                    {note.resolution}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Methodology footer */}
        <motion.div
          className="mt-8 text-center"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
        >
          <p className="text-xs font-body text-charcoal-400 max-w-2xl mx-auto leading-relaxed">
            All data sourced from official sales materials, floor plans, and verified press coverage.
            Where sources conflict, resolution methodology prioritizes the most recent official publication.
            Contact the sales office to confirm current pricing, availability, and specifications.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
