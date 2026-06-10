'use client';

import { motion } from 'framer-motion';
import { fadeUp, staggerContainer, staggerItem, defaultViewport } from '@/lib/animations';
import { AlertTriangle, Scale, FileText, Home } from 'lucide-react';

const disclaimers = [
  {
    icon: FileText,
    title: 'Informational Purposes Only',
    body: 'This report is compiled for informational purposes only and does not constitute a solicitation, offering, or investment advice. All figures, pricing, availability, and project details should be independently verified before making purchase decisions.',
  },
  {
    icon: AlertTriangle,
    title: 'Subject to Change',
    body: 'Pricing, floor plans, specifications, amenities, and availability are subject to change without notice at the sole discretion of each developer. Market conditions, interest rates, and regulatory environments may shift between publication and closing.',
  },
  {
    icon: Scale,
    title: 'No Developer Affiliation',
    body: 'This report is not affiliated with, endorsed by, or officially sanctioned by any developer, sales team, or project featured herein. All data is independently gathered from public records, developer disclosures, and proprietary broker research.',
  },
  {
    icon: Home,
    title: 'Equal Housing Opportunity',
    body: 'All properties featured in this report are offered in compliance with the Fair Housing Act. We are committed to providing equal professional service without regard to race, color, religion, sex, handicap, familial status, national origin, sexual orientation, or gender identity.',
  },
];

export default function Disclaimers() {
  return (
    <section className="py-16 bg-charcoal-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-10"
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          variants={fadeUp}
        >
          <p className="text-xs font-body font-semibold uppercase tracking-[0.25em] text-gold-500 mb-3">
            Important Notices
          </p>
          <h2 className="text-2xl md:text-3xl font-heading font-bold text-ivory-50">
            Disclaimers & Disclosures
          </h2>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-5xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          variants={staggerContainer}
        >
          {disclaimers.map((d) => {
            const Icon = d.icon;
            return (
              <motion.div
                key={d.title}
                variants={staggerItem}
                className="rounded-xl border border-charcoal-800 bg-charcoal-950/60 p-6"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gold-500/10">
                    <Icon className="h-4 w-4 text-gold-500" />
                  </div>
                  <div>
                    <h3 className="text-sm font-heading font-bold text-ivory-50 mb-2">
                      {d.title}
                    </h3>
                    <p className="text-xs font-body text-charcoal-400 leading-relaxed">
                      {d.body}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        <motion.p
          className="mt-8 text-[10px] font-body text-charcoal-600 text-center max-w-3xl mx-auto leading-relaxed"
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          variants={fadeUp}
        >
          Data as of February 2025. Broker cooperation and commission rates are set
          by individual developers and are subject to change. Always confirm current
          terms directly with each project&apos;s sales office before advising clients.
        </motion.p>
      </div>
    </section>
  );
}
