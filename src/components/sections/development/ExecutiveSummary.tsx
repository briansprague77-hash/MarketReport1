'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Development } from '@/types/development';
import SectionHeader from '@/components/ui/SectionHeader';
import {
  fadeUp,
  slideLeft,
  slideRight,
  staggerContainer,
  staggerItem,
  defaultViewport,
} from '@/lib/animations';

interface ExecutiveSummaryProps {
  development: Development;
}

export default function ExecutiveSummary({ development }: ExecutiveSummaryProps) {
  const { executiveSummary, brandedValue, salesMetrics, specifications, penthouse } = development;

  if (!executiveSummary || !brandedValue || !salesMetrics || !specifications) return null;

  return (
    <section id="overview" className="section-padding bg-ivory-50">
      <div className="container-luxury">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
        >
          <SectionHeader
            eyebrow="Executive Summary"
            title={executiveSummary.title || `${development.name} Overview`}
            subtitle={executiveSummary.subtitle || `Market intelligence and sales performance for ${development.name}.`}
          />
        </motion.div>

        {/* ── Lobby Image + Lead Narrative ───────────────────────────── */}
        <motion.div
          className="mb-16"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
        >
          {/* Full-bleed hero image */}
          {development.images?.hero?.src && (
          <div className="relative h-64 md:h-80 lg:h-96 rounded-sm overflow-hidden mb-10">
            <Image
              src={development.images.hero.src}
              alt={development.images.hero.alt || `${development.name} exterior`}
              fill
              className="object-cover"
              sizes="100vw"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ivory-50 via-transparent to-transparent" />
            <div className="absolute bottom-0 inset-x-0 p-6 md:p-8">
              {development.images.hero.credit && (
              <span className="text-[10px] font-body font-semibold uppercase tracking-[0.2em] text-ivory-200/80">
                {development.images.hero.credit}
              </span>
              )}
            </div>
          </div>
          )}

          {(executiveSummary.leadNarrative || executiveSummary.leadNarrativeFollowup) && (
            <div className="max-w-4xl">
              {executiveSummary.leadNarrative && (
                <p className="text-xl md:text-2xl font-heading font-medium text-charcoal-800 leading-relaxed mb-6">
                  {executiveSummary.leadNarrative}
                </p>
              )}
              {executiveSummary.leadNarrativeFollowup && (
                <p className="text-base md:text-lg font-body text-charcoal-600 leading-relaxed">
                  {executiveSummary.leadNarrativeFollowup}
                </p>
              )}
            </div>
          )}
        </motion.div>

        {/* ── Two-Column: Deep Narrative + Sidebar ────────────────────── */}
        <div className="grid lg:grid-cols-3 gap-12 lg:gap-16">
          {/* Main Content — Editorial Layout */}
          <motion.div
            className="lg:col-span-2 space-y-10"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={defaultViewport}
          >
            {/* Market Overview */}
            <motion.div variants={staggerItem}>
              <div className="flex items-center gap-3 mb-4">
                <div className="h-px w-8 bg-gold-500" />
                <span className="text-gold-600 text-xs font-body font-semibold uppercase tracking-[0.2em]">
                  Market Overview
                </span>
              </div>
              <p className="text-base font-body text-charcoal-600 leading-relaxed">
                {executiveSummary.overview}
              </p>
            </motion.div>

            {/* Pullquote */}
            {executiveSummary.pullquote && (
            <motion.div
              variants={staggerItem}
              className="relative pl-6 md:pl-8 border-l-2 border-gold-500/60 py-2"
            >
              <p className="text-lg md:text-xl font-heading italic text-charcoal-800 leading-relaxed">
                &ldquo;{executiveSummary.pullquote.text
                  .replace('{contractValue}', salesMetrics.contractValue)
                  .replace('{months}', String(salesMetrics.monthlySales && salesMetrics.monthlySales.length > 0 ? salesMetrics.monthlySales.length : ''))
                }&rdquo;
              </p>
              <p className="mt-3 text-xs font-body font-semibold text-charcoal-500 uppercase tracking-widest">
                &mdash; {executiveSummary.pullquote.attribution}
              </p>
            </motion.div>
            )}

            {/* Market Significance */}
            <motion.div variants={staggerItem}>
              <div className="flex items-center gap-3 mb-4">
                <div className="h-px w-8 bg-gold-500" />
                <span className="text-gold-600 text-xs font-body font-semibold uppercase tracking-[0.2em]">
                  Market Significance
                </span>
              </div>
              <p className="text-base font-body text-charcoal-600 leading-relaxed mb-4">
                {executiveSummary.marketSignificance}
              </p>
              {/* Key stat highlights inline */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-6">
                <div className="bg-charcoal-800 rounded-sm p-4 text-center">
                  <div className="text-2xl font-heading font-bold text-gold-500">
                    {specifications.heightStories}
                  </div>
                  <div className="text-[10px] font-body font-semibold text-ivory-300 uppercase tracking-widest mt-1">
                    Stories
                  </div>
                </div>
                <div className="bg-charcoal-800 rounded-sm p-4 text-center">
                  <div className="text-2xl font-heading font-bold text-gold-500">
                    {specifications.totalResidences}
                  </div>
                  <div className="text-[10px] font-body font-semibold text-ivory-300 uppercase tracking-widest mt-1">
                    Residences
                  </div>
                </div>
                {penthouse && (
                  <div className="bg-charcoal-800 rounded-sm p-4 text-center col-span-2 md:col-span-1">
                    <div className="text-2xl font-heading font-bold text-gold-500">
                      {penthouse.price}
                    </div>
                    <div className="text-[10px] font-body font-semibold text-ivory-300 uppercase tracking-widest mt-1">
                      Record Penthouse
                    </div>
                  </div>
                )}
              </div>
            </motion.div>

            {/* Sales Performance Narrative */}
            <motion.div variants={staggerItem}>
              <div className="flex items-center gap-3 mb-4">
                <div className="h-px w-8 bg-gold-500" />
                <span className="text-gold-600 text-xs font-body font-semibold uppercase tracking-[0.2em]">
                  Sales Performance
                </span>
              </div>
              <p className="text-base font-body text-charcoal-600 leading-relaxed">
                {executiveSummary.salesPerformance}
              </p>
            </motion.div>

            {/* Price Decrease Transparency Note — shown when pricingLadder has a transparencyNote */}
            {development.pricingLadder?.transparencyNote && (
            <motion.div
              variants={staggerItem}
              className="bg-ivory-100 border border-ivory-300 rounded-sm p-6"
            >
              <div className="flex items-start gap-3">
                <div className="w-1 h-full min-h-[1rem] bg-gold-500/40 rounded-full flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-body font-semibold text-charcoal-800 mb-2">
                    Pricing Transparency Note
                  </h4>
                  <p className="text-sm font-body text-charcoal-500 leading-relaxed">
                    {development.pricingLadder.transparencyNote}
                  </p>
                </div>
              </div>
            </motion.div>
            )}
          </motion.div>

          {/* ── Sidebar — Branded Value ────────────────────────────────── */}
          <motion.div
            className="lg:col-span-1"
            variants={slideRight}
            initial="hidden"
            whileInView="visible"
            viewport={defaultViewport}
          >
            <div className="bg-charcoal-800 rounded-sm p-8 sticky top-32">
              {/* Sidebar hero image — use card image, hero, or first gallery image */}
              {(development.images?.card?.src || development.images?.hero?.src || development.images?.gallery?.[0]?.src) && (
              <div className="relative h-40 rounded-sm overflow-hidden mb-6 -mx-2 -mt-2">
                <Image
                  src={development.images?.card?.src || development.images?.hero?.src || development.images!.gallery![0].src}
                  alt={`${development.name} residence`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal-800 via-transparent to-transparent" />
              </div>
              )}

              <div className="flex items-center gap-3 mb-6">
                <div className="h-px w-6 bg-gold-500" />
                <span className="text-gold-500 text-xs font-body font-semibold uppercase tracking-[0.2em]">
                  Branded Value
                </span>
              </div>
              <h3 className="text-xl font-heading font-bold text-ivory-50 mb-6">
                {brandedValue.title}
              </h3>
              <div className="space-y-6">
                {brandedValue.propositions.map((prop, i) => (
                  <div key={i} className="border-l-2 border-gold-500/40 pl-4">
                    <h4 className="text-sm font-body font-semibold text-gold-500 uppercase tracking-wider mb-1.5">
                      {prop.title}
                    </h4>
                    <p className="text-sm font-body text-ivory-300 leading-relaxed">
                      {prop.description}
                    </p>
                  </div>
                ))}
              </div>

              {/* Key Metric Callout */}
              <div className="mt-8 pt-6 border-t border-charcoal-700">
                <div className="text-center mb-6">
                  <div className="text-3xl font-heading font-bold text-gold-500">
                    {salesMetrics.soldPercentage}%
                  </div>
                  <div className="text-xs font-body font-semibold text-ivory-400 uppercase tracking-widest mt-1">
                    Sold in {salesMetrics.monthlySales && salesMetrics.monthlySales.length > 0 ? salesMetrics.monthlySales.length : 10} Months
                  </div>
                  <p className="text-xs font-body text-ivory-500 mt-2 leading-relaxed">
                    {salesMetrics.soldUnits} of {salesMetrics.totalUnits} units contracted
                    pre-construction
                  </p>
                </div>
              </div>

              {/* CTA */}
              <div className="pt-4">
                <a
                  href="#"
                  className="block text-center text-sm font-body font-semibold text-charcoal-900 bg-gold-500 hover:bg-gold-400 py-3 rounded-sm uppercase tracking-wide transition-all"
                >
                  Get Full Market Report
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
