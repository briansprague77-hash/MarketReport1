'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Development } from '@/types/development';
import SectionHeader from '@/components/ui/SectionHeader';
import {
  fadeUp,
  staggerContainer,
  staggerItem,
  defaultViewport,
} from '@/lib/animations';
import {
  BedDouble,
  Bath,
  Maximize,
  TreePalm,
  Layers,
  X,
  ZoomIn,
} from 'lucide-react';

interface ResidenceOverviewProps {
  development: Development;
}

const formatPrice = (n: number) =>
  '$' + n.toLocaleString('en-US', { maximumFractionDigits: 0 });

const formatSF = (n: number) =>
  n.toLocaleString('en-US', { maximumFractionDigits: 0 });

export default function ResidenceOverview({ development }: ResidenceOverviewProps) {
  // ── Hooks MUST run unconditionally on every render — declare first.
  const [expandedImage, setExpandedImage] = useState<string | null>(null);

  const { specifications, residencePricing } = development;
  const floorPlans = specifications?.floorPlanSpecs;

  if (!floorPlans || floorPlans.length === 0) return null;

  // Merge floor plan specs with starting prices from residencePricing
  const plans = floorPlans.map((fp) => {
    const pricing = residencePricing?.find(
      (rp) => rp.residenceType === fp.residenceType
    );
    const startingPrice = pricing?.units?.length
      ? Math.min(...pricing.units.map((u) => u.price))
      : undefined;
    return { ...fp, startingPrice };
  });

  return (
    <section id="residences" className="section-padding bg-ivory-50">
      <div className="container-luxury">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
        >
          <SectionHeader
            eyebrow="Floor Plans"
            title="Residence Collection"
            subtitle="Six distinctive floor plans across levels 21–46, each with private terraces and floor-to-ceiling bay views."
            variant="light"
          />
        </motion.div>

        {/* ─── Floor Plan Cards ───────────────────────────────────────── */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
        >
          {plans.map((plan) => (
            <motion.div
              key={plan.residenceType}
              variants={staggerItem}
              className="rounded-2xl border border-charcoal-200 bg-white shadow-sm hover:shadow-md transition-shadow overflow-hidden flex flex-col"
            >
              {/* Floor Plan Image */}
              {plan.floorPlanImage && (
                <div
                  className="relative bg-charcoal-50 border-b border-charcoal-100 cursor-pointer group"
                  onClick={() => setExpandedImage(plan.floorPlanImage!)}
                >
                  <div className="relative w-full aspect-[4/3]">
                    <Image
                      src={plan.floorPlanImage}
                      alt={`${plan.residenceType} floor plan`}
                      fill
                      className="object-contain p-3"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                  <div className="absolute inset-0 bg-charcoal-900/0 group-hover:bg-charcoal-900/10 transition-colors flex items-center justify-center">
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity bg-charcoal-900/70 text-ivory-50 text-xs font-body font-medium px-3 py-1.5 rounded-full flex items-center gap-1.5">
                      <ZoomIn className="h-3.5 w-3.5" />
                      View Full Plan
                    </span>
                  </div>
                </div>
              )}

              {/* Card Content */}
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-heading font-bold text-charcoal-900">
                    {plan.residenceType}
                  </h3>
                  <span className="text-xs font-body font-semibold uppercase tracking-wider text-charcoal-400 bg-charcoal-100 px-2.5 py-1 rounded-full">
                    FL {plan.levels}
                  </span>
                </div>

                {plan.startingPrice && (
                  <div className="mb-5">
                    <div className="text-2xl font-heading font-bold text-gold-600">
                      {formatPrice(plan.startingPrice)}
                    </div>
                    <div className="text-xs font-body text-charcoal-400 mt-0.5">
                      Starting from
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-3">
                  <div className="flex items-center gap-2">
                    <BedDouble className="h-4 w-4 text-charcoal-400" />
                    <span className="text-sm font-body text-charcoal-700">
                      {plan.bedrooms} BR
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Bath className="h-4 w-4 text-charcoal-400" />
                    <span className="text-sm font-body text-charcoal-700">
                      {plan.bathrooms} BA
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Maximize className="h-4 w-4 text-charcoal-400" />
                    <span className="text-sm font-body text-charcoal-700">
                      {formatSF(plan.livingSF)} SF
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <TreePalm className="h-4 w-4 text-charcoal-400" />
                    <span className="text-sm font-body text-charcoal-700">
                      {formatSF(plan.terraceSF)} SF terrace
                    </span>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-charcoal-100 flex items-center gap-2">
                  <Layers className="h-4 w-4 text-charcoal-400" />
                  <span className="text-sm font-body text-charcoal-500">
                    {formatSF(plan.totalSF)} SF total
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* ─── Lightbox Overlay ───────────────────────────────────────── */}
      <AnimatePresence>
        {expandedImage && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-charcoal-950/90 backdrop-blur-sm p-4 md:p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setExpandedImage(null)}
          >
            <button
              className="absolute top-4 right-4 md:top-6 md:right-6 text-ivory-50 hover:text-gold-500 transition-colors z-10"
              onClick={() => setExpandedImage(null)}
              aria-label="Close floor plan"
            >
              <X className="h-8 w-8" />
            </button>
            <motion.div
              className="relative w-full max-w-4xl max-h-[85vh]"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={expandedImage}
                alt="Floor plan detail"
                width={1200}
                height={900}
                className="w-full h-auto max-h-[85vh] object-contain rounded-lg"
                sizes="(max-width: 1024px) 100vw, 80vw"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
