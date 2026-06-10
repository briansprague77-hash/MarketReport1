'use client';

import { motion } from 'framer-motion';
import { TailInventoryAnalysis } from '@/types/development';
import {
  fadeUp,
  staggerContainer,
  staggerItem,
  defaultViewport,
} from '@/lib/animations';

interface TailInventoryProps {
  data: TailInventoryAnalysis;
  developmentName: string;
}

export default function TailInventory({ data, developmentName }: TailInventoryProps) {
  const soldUnits = data.totalUnits - data.developerUnitsRemaining;
  const soldPercent = Math.round((soldUnits / data.totalUnits) * 100);

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
          Closeout Analysis
        </span>
      </div>
      <h3 className="font-heading text-xl text-charcoal-900 mb-6">
        {developmentName} Tail Inventory
      </h3>

      {/* Sell-through bar */}
      <div className="mb-6">
        <div className="flex justify-between items-baseline mb-2">
          <span className="font-body text-sm text-charcoal-600">
            {soldUnits} of {data.totalUnits} units closed
          </span>
          <span className="font-heading text-lg text-charcoal-900 font-bold">
            {soldPercent}% sold
          </span>
        </div>
        <div className="w-full h-3 bg-charcoal-100 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gold-500 rounded-full"
            initial={{ width: 0 }}
            whileInView={{ width: `${soldPercent}%` }}
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
        <motion.div
          className="bg-ivory-50 rounded-lg p-4 border border-ivory-300"
          variants={staggerItem}
        >
          <p className="font-body text-xs text-charcoal-400 uppercase tracking-wider mb-1">
            Developer Units Left
          </p>
          <p className="font-heading text-2xl text-charcoal-900">
            {data.developerUnitsRemaining}
          </p>
        </motion.div>

        {data.developerAskingPsf != null && (
          <motion.div
            className="bg-ivory-50 rounded-lg p-4 border border-ivory-300"
            variants={staggerItem}
          >
            <p className="font-body text-xs text-charcoal-400 uppercase tracking-wider mb-1">
              Developer Ask PSF
            </p>
            <p className="font-heading text-2xl text-charcoal-900">
              ${data.developerAskingPsf.toLocaleString()}
            </p>
          </motion.div>
        )}

        <motion.div
          className="bg-ivory-50 rounded-lg p-4 border border-ivory-300"
          variants={staggerItem}
        >
          <p className="font-body text-xs text-charcoal-400 uppercase tracking-wider mb-1">
            Owner Resales Listed
          </p>
          <p className="font-heading text-2xl text-charcoal-900">
            {data.resaleListings}
          </p>
        </motion.div>

        {data.resaleAskingPsf != null && (
          <motion.div
            className="bg-ivory-50 rounded-lg p-4 border border-ivory-300"
            variants={staggerItem}
          >
            <p className="font-body text-xs text-charcoal-400 uppercase tracking-wider mb-1">
              Resale Ask PSF
            </p>
            <p className="font-heading text-2xl text-charcoal-900">
              ${data.resaleAskingPsf.toLocaleString()}
            </p>
          </motion.div>
        )}

        {data.resaleClosedPsf != null && (
          <motion.div
            className="bg-ivory-50 rounded-lg p-4 border border-ivory-300"
            variants={staggerItem}
          >
            <p className="font-body text-xs text-charcoal-400 uppercase tracking-wider mb-1">
              Resale Closed PSF
            </p>
            <p className="font-heading text-2xl text-charcoal-900">
              ${data.resaleClosedPsf.toLocaleString()}
            </p>
          </motion.div>
        )}

        {data.daysOnMarketAvg != null && (
          <motion.div
            className="bg-ivory-50 rounded-lg p-4 border border-ivory-300"
            variants={staggerItem}
          >
            <p className="font-body text-xs text-charcoal-400 uppercase tracking-wider mb-1">
              Avg Days on Market
            </p>
            <p className="font-heading text-2xl text-charcoal-900">
              {data.daysOnMarketAvg}
            </p>
          </motion.div>
        )}
      </motion.div>

      {/* Key Insights */}
      {data.keyInsights.length > 0 && (
        <div className="border-t border-charcoal-100 pt-5">
          <p className="font-body text-xs font-semibold uppercase tracking-wider text-charcoal-400 mb-3">
            Key Insights
          </p>
          <ul className="space-y-2">
            {data.keyInsights.map((insight, i) => (
              <li
                key={i}
                className="flex items-start gap-2.5 font-body text-sm text-charcoal-600 leading-relaxed"
              >
                <span className="text-gold-500 mt-1.5 flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
                    <circle cx="12" cy="12" r="6" />
                  </svg>
                </span>
                {insight}
              </li>
            ))}
          </ul>
        </div>
      )}
    </motion.div>
  );
}
