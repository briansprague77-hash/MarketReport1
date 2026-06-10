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

interface MarketAnalysisProps {
  development: Development;
}

export default function MarketAnalysis({ development }: MarketAnalysisProps) {
  const { marketEvidence } = development;

  if (!marketEvidence || marketEvidence.length === 0) return null;

  return (
    <section id="market-analysis" className="section-padding bg-charcoal-800">
      <div className="container-luxury">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
        >
          <SectionHeader
            eyebrow="Market Evidence"
            title="What The Numbers Say"
            subtitle="Validated demand signals that redefine the comparable landscape for every luxury listing in the Tampa Bay metro."
            variant="dark"
          />
        </motion.div>

        {/* Market Context Narrative — data-driven from development.marketNarrative */}
        {development.marketNarrative && development.marketNarrative.length > 0 && (
        <motion.div
          className="mb-16 max-w-3xl"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
        >
          {development.marketNarrative.map((para, i) => (
            <p
              key={i}
              className={`text-base font-body leading-relaxed ${
                i === 0 ? 'md:text-lg text-ivory-300 mb-6' : 'text-ivory-400'
              }`}
            >
              {para}
            </p>
          ))}
        </motion.div>
        )}

        {/* Evidence Cards */}
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
        >
          {marketEvidence.map((evidence, i) => (
            <motion.div
              key={i}
              className="bg-charcoal-900/50 border border-charcoal-700 rounded-sm p-8 hover:border-gold-500/30 transition-all duration-300 group"
              variants={staggerItem}
              whileHover={{ y: -4 }}
            >
              <div className="text-4xl md:text-5xl font-heading font-bold text-gold-500 mb-3 group-hover:text-gold-400 transition-colors">
                {evidence.value}
              </div>
              <div className="text-sm font-body font-semibold uppercase tracking-widest text-ivory-200 mb-4">
                {evidence.metric}
              </div>
              <motion.div
                className="h-px w-12 bg-gold-500/30 mb-4"
                initial={{ scaleX: 0, originX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={defaultViewport}
                transition={{ duration: 0.8, delay: 0.2 + i * 0.1 }}
              />
              <p className="text-sm font-body text-ivory-400 leading-relaxed">
                {evidence.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* What This Means Section — data-driven from development.advisoryInsights */}
        {development.advisoryInsights && development.advisoryInsights.length > 0 && (
        <motion.div
          className="bg-charcoal-900/30 border border-charcoal-700 rounded-sm p-8 md:p-12"
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
            What This Means For Your Practice
          </h3>

          {/* First two insights side-by-side */}
          {development.advisoryInsights.length >= 2 && (
          <div className="grid md:grid-cols-2 gap-8">
            {development.advisoryInsights.slice(0, 2).map((insight, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: i === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={defaultViewport}
                transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
              >
                <h4 className="text-sm font-body font-semibold text-gold-500 uppercase tracking-wider mb-2">
                  {insight.title}
                </h4>
                <p className="text-sm font-body text-ivory-300 leading-relaxed">
                  {insight.content}
                </p>
              </motion.div>
            ))}
          </div>
          )}

          {/* Remaining insights — full-width blocks below */}
          {development.advisoryInsights.slice(2).map((insight, i) => (
            <motion.div
              key={i}
              className="mt-8 pt-8 border-t border-charcoal-700/50"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={defaultViewport}
              transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
            >
              <h4 className="text-sm font-body font-semibold text-gold-500 uppercase tracking-wider mb-2">
                {insight.title}
              </h4>
              <p className="text-sm font-body text-ivory-300 leading-relaxed max-w-3xl">
                {insight.content}
              </p>
            </motion.div>
          ))}

          <div className="mt-8 pt-6 border-t border-charcoal-700 flex flex-wrap gap-4">
            <a
              href="#"
              className="text-sm font-body font-semibold text-charcoal-900 bg-gold-500 hover:bg-gold-400 px-6 py-3 rounded-sm uppercase tracking-wide transition-all"
            >
              Receive Monthly Market Updates
            </a>
            <a
              href="#competitive-position"
              className="text-sm font-body font-semibold text-ivory-300 border border-ivory-500/30 hover:border-gold-500/50 hover:text-gold-400 px-6 py-3 rounded-sm uppercase tracking-wide transition-all"
            >
              View Competitive Comparison
            </a>
          </div>
        </motion.div>
        )}
      </div>
    </section>
  );
}
