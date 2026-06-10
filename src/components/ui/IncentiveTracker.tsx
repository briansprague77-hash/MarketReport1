'use client';

import { motion } from 'framer-motion';
import { fadeUp, defaultViewport } from '@/lib/animations';

interface IncentiveItem {
  type: string;
  description: string;
  estimatedValue?: number;
  scope?: string;
}

interface IncentivesData {
  items: IncentiveItem[];
  effectiveDiscountRate?: number;
  pricingClassification?: 'clean' | 'mild-incentives' | 'moderate-incentives' | 'heavy-incentives';
  asOfDate?: string;
  notes?: string;
}

interface IncentiveTrackerProps {
  incentives: IncentivesData;
  name: string;
}

const CLASSIFICATION_CONFIG: Record<string, { label: string; color: string; bgClass: string; textClass: string; borderClass: string; dotClass: string }> = {
  clean: {
    label: 'Clean Pricing',
    color: 'green',
    bgClass: 'bg-emerald-500/10',
    textClass: 'text-emerald-400',
    borderClass: 'border-emerald-500/30',
    dotClass: 'bg-emerald-500',
  },
  'mild-incentives': {
    label: 'Mild Incentives',
    color: 'yellow',
    bgClass: 'bg-yellow-500/10',
    textClass: 'text-yellow-400',
    borderClass: 'border-yellow-500/30',
    dotClass: 'bg-yellow-500',
  },
  'moderate-incentives': {
    label: 'Moderate Incentives',
    color: 'orange',
    bgClass: 'bg-orange-500/10',
    textClass: 'text-orange-400',
    borderClass: 'border-orange-500/30',
    dotClass: 'bg-orange-500',
  },
  'heavy-incentives': {
    label: 'Heavy Incentives',
    color: 'red',
    bgClass: 'bg-red-500/10',
    textClass: 'text-red-400',
    borderClass: 'border-red-500/30',
    dotClass: 'bg-red-500',
  },
};

const TYPE_LABELS: Record<string, string> = {
  'hoa-credit': 'HOA Credit',
  'parking-included': 'Parking Included',
  'storage-included': 'Storage Included',
  'finish-upgrade': 'Finish Upgrade',
  'closing-cost-credit': 'Closing Cost Credit',
  'broker-bonus': 'Broker Bonus',
  'rate-buydown': 'Rate Buydown',
  'furniture-package': 'Furniture Package',
  other: 'Other',
};

export default function IncentiveTracker({ incentives, name }: IncentiveTrackerProps) {
  const classification = incentives.pricingClassification ?? 'clean';
  const config = CLASSIFICATION_CONFIG[classification] ?? CLASSIFICATION_CONFIG.clean;

  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={defaultViewport}
      className="mt-4 rounded-xl border border-charcoal-700/50 bg-charcoal-800/30 p-5"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <h4 className="font-body text-xs uppercase tracking-wider text-charcoal-400">
          Incentive Monitor
        </h4>
        {incentives.asOfDate && (
          <span className="font-body text-[10px] text-charcoal-500">
            As of {incentives.asOfDate}
          </span>
        )}
      </div>

      {/* Classification Badge */}
      <div className="flex items-center gap-2 mb-3">
        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-body font-medium ${config.bgClass} ${config.textClass} border ${config.borderClass}`}>
          <span className={`h-1.5 w-1.5 rounded-full ${config.dotClass}`} />
          {config.label}
        </span>
        {incentives.effectiveDiscountRate !== undefined && incentives.effectiveDiscountRate > 0 && (
          <span className="font-body text-xs text-charcoal-400">
            ~{incentives.effectiveDiscountRate}% effective discount
          </span>
        )}
      </div>

      {/* Incentive Items */}
      {incentives.items.length > 0 && (
        <div className="space-y-2 mb-3">
          {incentives.items.map((item, i) => (
            <div key={i} className="flex items-start justify-between gap-3 py-1.5 border-t border-charcoal-700/30">
              <div>
                <span className="font-body text-xs font-medium text-ivory-200">
                  {TYPE_LABELS[item.type] ?? item.type}
                </span>
                <p className="font-body text-xs text-charcoal-400 mt-0.5">{item.description}</p>
                {item.scope && (
                  <p className="font-body text-[10px] text-charcoal-500 mt-0.5 italic">{item.scope}</p>
                )}
              </div>
              {item.estimatedValue !== undefined && (
                <span className="font-body text-xs font-medium text-gold-400 whitespace-nowrap">
                  ~${item.estimatedValue.toLocaleString()}
                </span>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Notes */}
      {incentives.notes && (
        <p className="font-body text-xs text-charcoal-400 leading-relaxed">
          {incentives.notes}
        </p>
      )}
    </motion.div>
  );
}
