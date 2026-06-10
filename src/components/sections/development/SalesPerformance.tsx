'use client';

import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { Development } from '@/types/development';
import SectionHeader from '@/components/ui/SectionHeader';
import Timeline from '@/components/ui/Timeline';

import PricingGrid from '@/components/ui/PricingGrid';

// Dynamic import avoids Recharts SSR dimension warnings during static generation
const AbsorptionChart = dynamic(() => import('@/components/ui/AbsorptionChart'), {
  ssr: false,
  loading: () => (
    <div className="h-[280px] md:h-[320px] bg-ivory-200 animate-pulse rounded-sm" />
  ),
});
import {
  fadeUp,
  slideLeft,
  slideRight,
  staggerContainer,
  staggerItem,
  progressBar,
  defaultViewport,
} from '@/lib/animations';

interface SalesPerformanceProps {
  development: Development;
}

export default function SalesPerformance({ development }: SalesPerformanceProps) {
  const { salesMetrics, timeline, pricePoints, residencePricing } = development;

  if (!salesMetrics || !pricePoints || !timeline) return null;

  const progressPercent = salesMetrics.soldPercentage;

  return (
    <section id="sales-performance" className="section-padding bg-ivory-100">
      <div className="container-luxury">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
        >
          <SectionHeader
            eyebrow="Sales Intelligence"
            title="Absorption & Velocity"
            subtitle="Monthly absorption trends, velocity metrics, and entry pricing — the data behind your next client presentation."
          />
        </motion.div>

        {/* ── Absorption Narrative ────────────────────────────────────────── */}
        <motion.div
          className="mb-10 max-w-3xl"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
        >
          <p className="text-sm font-body text-charcoal-600 leading-relaxed">
            Absorption rate is the single most revealing metric in pre-construction
            analysis — it measures how many units the market is willing to contract per
            month before the building physically exists. Unlike resale inventory where
            buyers tour finished spaces, pre-construction absorption reflects pure
            demand conviction: buyers are committing millions based on floor plans,
            renderings, and brand positioning alone. The chart below tracks monthly
            contract activity from launch through present, while the metrics grid
            distills the pace into velocity benchmarks, peak demand periods, and
            projected sellout timelines. Together, these data points tell you whether
            the market has validated the developer&apos;s pricing thesis — and at what speed.
          </p>
        </motion.div>

        {/* ── Absorption Chart (full-width above the two-column layout) ───── */}
        {salesMetrics.monthlySales && salesMetrics.monthlySales.length > 0 && (
          <motion.div
            className="bg-white border border-ivory-300 rounded-sm p-6 md:p-8 mb-12"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={defaultViewport}
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-6">
              <h3 className="text-sm font-body font-semibold uppercase tracking-widest text-gold-600">
                Monthly Absorption Trend
              </h3>
              <span className="text-xs font-body text-charcoal-400">
                {salesMetrics.launchDate} &mdash; Present
              </span>
            </div>
            <AbsorptionChart
              data={salesMetrics.monthlySales}
              totalUnits={salesMetrics.totalUnits}
            />
          </motion.div>
        )}

        {/* ── Two-Column Layout: Metrics + Timeline ─────────────────────── */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left: Key Metrics */}
          <motion.div
            variants={slideLeft}
            initial="hidden"
            whileInView="visible"
            viewport={defaultViewport}
          >
            {/* Progress Bar */}
            <div className="mb-10">
              <div className="flex justify-between items-end mb-3">
                <span className="text-sm font-body font-semibold text-charcoal-900 uppercase tracking-wider">
                  Absorption Progress
                </span>
                <span className="text-2xl font-heading font-bold text-charcoal-900">
                  {progressPercent}%
                </span>
              </div>
              <div className="h-3 bg-ivory-300 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-gold-600 to-gold-400 rounded-full"
                  variants={progressBar(progressPercent)}
                  initial="hidden"
                  whileInView="visible"
                  viewport={defaultViewport}
                />
              </div>
              <div className="flex justify-between mt-2">
                <span className="text-xs font-body text-charcoal-500">
                  {salesMetrics.soldUnits} sold
                </span>
                <span className="text-xs font-body text-charcoal-500">
                  {salesMetrics.availableUnits} available
                </span>
              </div>
            </div>

            {/* Metrics Grid */}
            <motion.div
              className="grid grid-cols-2 gap-4 mb-10"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={defaultViewport}
            >
              <motion.div variants={staggerItem} className="bg-white border border-ivory-300 rounded-sm p-5">
                <div className="text-2xl font-heading font-bold text-charcoal-900">
                  {salesMetrics.velocity}
                </div>
                <div className="text-xs font-body font-medium uppercase tracking-widest text-charcoal-500 mt-1">
                  Velocity
                </div>
              </motion.div>
              <motion.div variants={staggerItem} className="bg-white border border-ivory-300 rounded-sm p-5">
                <div className="text-2xl font-heading font-bold text-charcoal-900">
                  {salesMetrics.contractValue}
                </div>
                <div className="text-xs font-body font-medium uppercase tracking-widest text-charcoal-500 mt-1">
                  Contracted
                </div>
              </motion.div>
              <motion.div variants={staggerItem} className="bg-white border border-ivory-300 rounded-sm p-5">
                <div className="text-2xl font-heading font-bold text-charcoal-900">
                  {salesMetrics.peakMonth.units}
                </div>
                <div className="text-xs font-body font-medium uppercase tracking-widest text-charcoal-500 mt-1">
                  Peak Month ({salesMetrics.peakMonth.month})
                </div>
              </motion.div>
              <motion.div variants={staggerItem} className="bg-white border border-ivory-300 rounded-sm p-5">
                <div className="text-2xl font-heading font-bold text-charcoal-900">
                  {salesMetrics.selloutEstimate}
                </div>
                <div className="text-xs font-body font-medium uppercase tracking-widest text-charcoal-500 mt-1">
                  Projected Sellout
                </div>
              </motion.div>
            </motion.div>

            {/* Price Points */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={defaultViewport}
            >
              <h3 className="text-sm font-body font-semibold uppercase tracking-widest text-charcoal-700 mb-4">
                Entry Pricing
              </h3>
              <div className="space-y-3">
                {pricePoints.map((pp, i) => (
                  <motion.div
                    key={i}
                    className="flex items-center justify-between bg-white border border-ivory-300 rounded-sm px-5 py-4"
                    variants={staggerItem}
                    whileHover={{ x: 4 }}
                  >
                    <div>
                      <span className="text-sm font-body font-semibold text-charcoal-900">
                        {pp.label}
                      </span>
                    </div>
                    <div className="text-lg font-heading font-bold text-charcoal-900">
                      ${(pp.startingPrice / 1000000).toFixed(2)}M
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Right: Timeline */}
          <motion.div
            variants={slideRight}
            initial="hidden"
            whileInView="visible"
            viewport={defaultViewport}
          >
            <h3 className="text-sm font-body font-semibold uppercase tracking-widest text-charcoal-700 mb-6">
              Sales Timeline
            </h3>
            <Timeline events={timeline} />
          </motion.div>
        </div>

        {/* ── Advisory Insight: What This Velocity Means ──────────────── */}
        <motion.div
          className="mt-16 bg-charcoal-800 border border-charcoal-700 rounded-sm p-8 md:p-12"
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
            What This Velocity Tells You
          </h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-sm font-body font-semibold text-gold-500 uppercase tracking-wider mb-2">
                Demand Signal
              </h4>
              <p className="text-sm font-body text-ivory-300 leading-relaxed">
                {salesMetrics.soldUnits} units sold in {salesMetrics.monthlySales && salesMetrics.monthlySales.length > 0 ? salesMetrics.monthlySales.length : 10} months
                at a {salesMetrics.averageMonthly}-unit monthly pace &mdash; and this is a
                pre-construction project with no model units, no finished amenity deck, and no
                physical building to tour. The buyer is purchasing on brand, floor plan, and
                view alone. That is a conviction trade, not a convenience purchase.
              </p>
            </div>
            <div>
              <h4 className="text-sm font-body font-semibold text-gold-500 uppercase tracking-wider mb-2">
                For Your Listings
              </h4>
              <p className="text-sm font-body text-ivory-300 leading-relaxed">
                If {salesMetrics.contractValue} in contracts can be absorbed at $1,400+ PSF
                pre-construction, your resale inventory at $800&ndash;$1,100 PSF has a
                strengthened pricing floor. Use this absorption data in your CMAs: it validates
                that the downtown St. Petersburg luxury buyer is willing to transact at
                historically unprecedented levels. The velocity here is your evidence.
              </p>
            </div>
          </div>
        </motion.div>

        {/* ── Legacy Pricing Grid ─────────────────────────────────────── */}
        {residencePricing && residencePricing.length > 0 && (
          <motion.div
            className="mt-16"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={defaultViewport}
          >
            <div className="flex items-center gap-3 mb-2">
              <motion.div
                className="h-px w-8 bg-gold-500"
                initial={{ scaleX: 0, originX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={defaultViewport}
                transition={{ duration: 0.6, delay: 0.2 }}
              />
              <span className="text-gold-600 text-xs font-body font-semibold uppercase tracking-[0.2em]">
                Featured Residences
              </span>
            </div>
            <h3 className="text-2xl md:text-3xl font-heading font-bold text-charcoal-900 mb-2">
              Legacy Pricing
            </h3>
            <p className="text-sm font-body text-charcoal-500 mb-4 max-w-2xl">
              Select available residences across 6 floor plan types. Pricing reflects pre-construction legacy rates — subject to change.
            </p>
            <p className="text-sm font-body text-charcoal-600 leading-relaxed mb-8 max-w-3xl">
              Legacy pricing represents the developer&apos;s original pre-construction rate
              structure — the lowest price a unit will ever carry. Each residence type
              has a base entry price that escalates by floor, meaning the grid below is
              not a menu but a ladder: once a lower-floor unit is sold, that price is
              permanently gone and the next available unit on a higher floor will cost
              more. This is the fundamental mechanism of pre-construction value — early
              buyers capture the deepest discount in a building&apos;s entire lifecycle.
              Developers typically reprice remaining inventory upward as construction
              milestones are hit and available units thin out.
            </p>
            <PricingGrid pricing={residencePricing} />
            <div className="mt-6 bg-gold-500/5 border border-gold-500/20 rounded-sm p-4">
              <p className="text-xs font-body text-charcoal-500 leading-relaxed">
                <span className="font-semibold text-gold-600">Advisory: </span>
                Legacy pricing represents the lowest entry point for each residence type — once a floor is sold, that price is gone permanently. Higher floors command premium pricing reflecting elevated views, reduced noise, and increased exclusivity. As construction advances and inventory tightens, developers historically increase pricing across remaining units. Early buyers at pre-construction rates lock in the deepest discount in a building&apos;s lifecycle. Contact the sales office for current availability and real-time pricing before the next price adjustment.
              </p>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
