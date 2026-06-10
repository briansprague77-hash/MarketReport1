'use client';

import { motion } from 'framer-motion';
import { ResidencePricing } from '@/types/development';
import {
  staggerContainer,
  staggerItem,
  defaultViewport,
} from '@/lib/animations';

interface PricingGridProps {
  pricing: ResidencePricing[];
}

function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(price);
}

export default function PricingGrid({ pricing }: PricingGridProps) {
  return (
    <motion.div
      className="grid md:grid-cols-2 lg:grid-cols-3 gap-4"
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={defaultViewport}
    >
      {pricing.map((res, i) => {
        const minPrice = Math.min(...res.units.map((u) => u.price));
        const maxPrice = Math.max(...res.units.map((u) => u.price));
        const minFloor = Math.min(...res.units.map((u) => u.floor));
        const maxFloor = Math.max(...res.units.map((u) => u.floor));

        return (
          <motion.div
            key={i}
            className="bg-white border border-ivory-300 rounded-sm p-5 hover:border-gold-500/30 hover:shadow-md transition-all duration-300"
            variants={staggerItem}
            whileHover={{ y: -3 }}
          >
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-sm font-body font-semibold text-charcoal-900 uppercase tracking-wider">
                {res.residenceType}
              </h4>
              <span className="text-[10px] font-body font-medium text-charcoal-400 uppercase tracking-wider">
                FL {minFloor}-{maxFloor}
              </span>
            </div>

            <div className="space-y-2.5 mb-4">
              {res.units.map((unit, j) => (
                <div
                  key={j}
                  className="flex items-center justify-between py-1.5 border-b border-ivory-200 last:border-0"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-body font-medium text-charcoal-400 w-10">
                      #{unit.unit}
                    </span>
                    <span className="text-[10px] font-body text-charcoal-400 uppercase tracking-wider">
                      FL {unit.floor}
                    </span>
                  </div>
                  <span className="text-sm font-heading font-bold text-charcoal-900">
                    {formatPrice(unit.price)}
                  </span>
                </div>
              ))}
            </div>

            <div className="pt-3 border-t border-ivory-200">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-body text-charcoal-400 uppercase tracking-wider">
                  Range
                </span>
                <span className="text-xs font-body font-semibold text-gold-600">
                  {formatPrice(minPrice)} &mdash; {formatPrice(maxPrice)}
                </span>
              </div>
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
