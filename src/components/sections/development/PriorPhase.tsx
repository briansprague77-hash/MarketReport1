'use client';

import { motion } from 'framer-motion';
import { PriorPhasePerformance } from '@/types/development';
import {
  fadeUp,
  staggerContainer,
  staggerItem,
  defaultViewport,
} from '@/lib/animations';

interface PriorPhaseProps {
  data: PriorPhasePerformance;
}

export default function PriorPhase({ data }: PriorPhaseProps) {
  return (
    <motion.div
      className="bg-white rounded-lg border border-charcoal-200 p-6 shadow-sm"
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={defaultViewport}
    >
      <div className="flex items-center gap-3 mb-1">
        <span className="text-xs font-body font-semibold uppercase tracking-[0.2em] text-gold-600">
          Prior Phase Performance
        </span>
      </div>
      <h3 className="font-heading text-xl text-charcoal-900 mb-6">
        {data.phaseName} Track Record
      </h3>

      {/* Sell-through bar */}
      <div className="mb-6">
        <div className="flex justify-between items-baseline mb-2">
          <span className="font-body text-sm text-charcoal-600">
            {data.soldUnits} of {data.totalUnits} units sold
          </span>
          <span className="font-heading text-lg text-charcoal-900 font-bold">
            {data.soldPercentage}% sold
          </span>
        </div>
        <div className="w-full h-3 bg-charcoal-100 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-emerald-500 rounded-full"
            initial={{ width: 0 }}
            whileInView={{ width: `${Math.min(data.soldPercentage, 100)}%` }}
            viewport={defaultViewport}
            transition={{ duration: 1, ease: 'easeOut', delay: 0.3 }}
          />
        </div>
      </div>

      {/* Metrics grid */}
      <motion.div
        className="grid grid-cols-2 gap-4 mb-6"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={defaultViewport}
      >
        {data.monthsToSellout != null && (
          <motion.div
            className="bg-ivory-50 rounded-lg p-4 border border-ivory-300"
            variants={staggerItem}
          >
            <p className="font-body text-xs text-charcoal-400 uppercase tracking-wider mb-1">
              Months to Sellout
            </p>
            <p className="font-heading text-2xl text-charcoal-900">
              {data.monthsToSellout}
            </p>
          </motion.div>
        )}

        {data.absorptionRate != null && (
          <motion.div
            className="bg-ivory-50 rounded-lg p-4 border border-ivory-300"
            variants={staggerItem}
          >
            <p className="font-body text-xs text-charcoal-400 uppercase tracking-wider mb-1">
              Absorption Rate
            </p>
            <p className="font-heading text-2xl text-charcoal-900">
              {data.absorptionRate} units/mo
            </p>
          </motion.div>
        )}

        {data.averagePsf != null && (
          <motion.div
            className="bg-ivory-50 rounded-lg p-4 border border-ivory-300"
            variants={staggerItem}
          >
            <p className="font-body text-xs text-charcoal-400 uppercase tracking-wider mb-1">
              Average PSF
            </p>
            <p className="font-heading text-2xl text-charcoal-900">
              ${data.averagePsf.toLocaleString()}
            </p>
          </motion.div>
        )}

        {data.priceRange && (
          <motion.div
            className="bg-ivory-50 rounded-lg p-4 border border-ivory-300"
            variants={staggerItem}
          >
            <p className="font-body text-xs text-charcoal-400 uppercase tracking-wider mb-1">
              Price Range
            </p>
            <p className="font-heading text-lg text-charcoal-900">
              ${(data.priceRange.min / 1000).toFixed(0)}K &ndash; ${(data.priceRange.max / 1000000).toFixed(1)}M
            </p>
          </motion.div>
        )}

        {data.deliveryDate && (
          <motion.div
            className="bg-ivory-50 rounded-lg p-4 border border-ivory-300"
            variants={staggerItem}
          >
            <p className="font-body text-xs text-charcoal-400 uppercase tracking-wider mb-1">
              Delivery Date
            </p>
            <p className="font-heading text-2xl text-charcoal-900">
              {data.deliveryDate}
            </p>
          </motion.div>
        )}

        {data.launchDate && (
          <motion.div
            className="bg-ivory-50 rounded-lg p-4 border border-ivory-300"
            variants={staggerItem}
          >
            <p className="font-body text-xs text-charcoal-400 uppercase tracking-wider mb-1">
              Launch Date
            </p>
            <p className="font-heading text-2xl text-charcoal-900">
              {new Date(data.launchDate).toLocaleDateString('en-US', {
                month: 'short',
                year: 'numeric',
              })}
            </p>
          </motion.div>
        )}
      </motion.div>

      {/* Key Takeaways */}
      {data.keyTakeaways.length > 0 && (
        <div className="border-t border-charcoal-100 pt-5">
          <p className="font-body text-xs font-semibold uppercase tracking-wider text-charcoal-400 mb-3">
            Key Takeaways
          </p>
          <ul className="space-y-2">
            {data.keyTakeaways.map((takeaway, i) => (
              <li
                key={i}
                className="flex items-start gap-2.5 font-body text-sm text-charcoal-600 leading-relaxed"
              >
                <span className="text-emerald-500 mt-1.5 flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
                    <circle cx="12" cy="12" r="6" />
                  </svg>
                </span>
                {takeaway}
              </li>
            ))}
          </ul>
        </div>
      )}
    </motion.div>
  );
}
