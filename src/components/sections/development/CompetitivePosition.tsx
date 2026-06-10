'use client';

import { motion } from 'framer-motion';
import { Development } from '@/types/development';
import SectionHeader from '@/components/ui/SectionHeader';
import ComparisonTable from '@/components/ui/ComparisonTable';
import {
  fadeUp,
  scaleIn,
  staggerContainer,
  staggerItem,
  defaultViewport,
} from '@/lib/animations';

interface CompetitivePositionProps {
  development: Development;
}

export default function CompetitivePosition({ development }: CompetitivePositionProps) {
  const { competitors, name, specifications, deliveryDate } = development;

  if (!competitors || competitors.length === 0) return null;

  const avgPsf = specifications?.pricePerSqFt?.average;
  const featuredComp = competitors.find(c => c.isFeatured);
  const peerCompetitors = competitors.filter(c => !c.isFeatured);

  return (
    <section id="competitive-position" className="section-padding bg-ivory-50">
      <div className="container-luxury">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
        >
          <SectionHeader
            eyebrow="Competitive Landscape"
            title="Market Positioning"
            subtitle={`How ${name} compares to the premium tower inventory — the data your clients will ask for.`}
          />
        </motion.div>

        {/* Desktop Table */}
        <motion.div
          className="hidden md:block bg-white border border-ivory-300 rounded-sm overflow-hidden"
          variants={scaleIn}
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
        >
          <ComparisonTable competitors={competitors} />
        </motion.div>

        {/* Mobile Cards */}
        <motion.div
          className="md:hidden space-y-4"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
        >
          {competitors.map((comp, i) => (
            <motion.div
              key={i}
              className={`bg-white border rounded-sm p-5 ${
                comp.isFeatured
                  ? 'border-gold-500 ring-1 ring-gold-500/20'
                  : 'border-ivory-300'
              }`}
              variants={staggerItem}
              whileHover={{ y: -2 }}
            >
              <div className="flex items-center justify-between mb-3">
                <h3
                  className={`text-base font-body font-semibold ${
                    comp.isFeatured ? 'text-gold-600' : 'text-charcoal-900'
                  }`}
                >
                  {comp.name}
                </h3>
                <span
                  className={`text-[10px] font-body font-bold uppercase tracking-widest px-2 py-0.5 rounded-sm ${
                    comp.isFeatured
                      ? 'bg-gold-500/10 text-gold-600'
                      : comp.status === 'Delivering'
                      ? 'bg-emerald-500/10 text-emerald-500'
                      : 'bg-charcoal-100 text-charcoal-600'
                  }`}
                >
                  {comp.status}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-y-2 text-sm font-body">
                <div className="text-charcoal-500">Height</div>
                <div className="text-charcoal-900 font-medium">{comp.height}</div>
                <div className="text-charcoal-500">Units</div>
                <div className="text-charcoal-900 font-medium">{comp.units}</div>
                <div className="text-charcoal-500">Avg PSF</div>
                <div className="text-charcoal-900 font-medium">{comp.avgPsf}</div>
                <div className="text-charcoal-500">Delivery</div>
                <div className="text-charcoal-900 font-medium">{comp.delivery}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* ── Advisory Insight: Competitive Implications ─────────────── */}
        <motion.div
          className="mt-12 bg-charcoal-800 border border-charcoal-700 rounded-sm p-8 md:p-12"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
        >
          <div className="flex items-center gap-3 mb-6">
            <motion.div
              className="h-px w-8 bg-gold-500"
              initial={{ scaleX: 0, originX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={defaultViewport}
              transition={{ duration: 0.6, delay: 0.3 }}
            />
            <span className="text-gold-500 text-xs font-body font-semibold uppercase tracking-[0.2em]">
              Advisory Insight
            </span>
          </div>
          <h3 className="text-2xl md:text-3xl font-heading font-bold text-ivory-50 mb-4">
            How This Reshapes Your Comparables
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h4 className="text-sm font-body font-semibold text-gold-500 uppercase tracking-wider mb-2">
                Pricing Ceiling Reset
              </h4>
              <p className="text-sm font-body text-ivory-300 leading-relaxed">
                {avgPsf ? (
                  <>{name} has established a new pricing tier at ${avgPsf.toLocaleString()}&nbsp;avg&nbsp;PSF
                  {peerCompetitors.length > 0 && (
                    <>, compared to peer buildings ranging from {peerCompetitors.map(c => c.avgPsf).join(' to ')}</>
                  )}. Every luxury listing in this market now has a higher
                  benchmark to reference &mdash; and every CMA you produce should reflect
                  this shift.</>
                ) : (
                  <>{name} is establishing a new pricing tier in the luxury tower market.
                  Every comparable you reference should account for this positioning shift.</>
                )}
              </p>
            </div>
            <div>
              <h4 className="text-sm font-body font-semibold text-gold-500 uppercase tracking-wider mb-2">
                Competitive Spread
              </h4>
              <p className="text-sm font-body text-ivory-300 leading-relaxed">
                {peerCompetitors.length > 0 ? (
                  <>The competitive set includes {peerCompetitors.map((c, i) => (
                    <span key={i}>{c.name} ({c.avgPsf}){i < peerCompetitors.length - 2 ? ', ' : i === peerCompetitors.length - 2 ? ', and ' : ''}</span>
                  ))}. {avgPsf ? <>At ${avgPsf.toLocaleString()}&nbsp;PSF, {name} commands
                  a premium over delivered product.</> : <>{name} commands a premium
                  over delivered product.</>} For clients holding inventory in peer buildings,
                  the spread between delivered pricing and a {deliveryDate} delivery creates a
                  compelling narrative for motivated buyers.</>
                ) : (
                  <>{name} is positioned as a premium offering with a {deliveryDate} delivery
                  timeline. The pricing spread relative to delivered buildings creates opportunity
                  for advisors on both sides of the transaction.</>
                )}
              </p>
            </div>
            <div>
              <h4 className="text-sm font-body font-semibold text-gold-500 uppercase tracking-wider mb-2">
                Supply Dynamics
              </h4>
              <p className="text-sm font-body text-ivory-300 leading-relaxed">
                With {competitors.length} premium towers in the competitive set
                {competitors.filter(c => c.status === 'Delivering' || c.status === 'Delivered').length > 0 && (
                  <> &mdash; {competitors.filter(c => c.status === 'Delivering' || c.status === 'Delivered').length} already
                  delivering or delivered &mdash;</>
                )} buyers have a defined set of options at this price point.
                For your clients, this means understanding which buildings have remaining
                developer inventory versus resale, and how {name}&apos;s {deliveryDate} delivery
                timeline positions it against available alternatives.
              </p>
            </div>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          className="mt-8 text-center"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
        >
          <a
            href="#"
            className="inline-block text-sm font-body font-semibold text-charcoal-900 bg-gold-500 hover:bg-gold-400 px-8 py-3.5 rounded-sm uppercase tracking-wide transition-all"
          >
            Request Detailed Comparison Report
          </a>
        </motion.div>
      </div>
    </section>
  );
}
