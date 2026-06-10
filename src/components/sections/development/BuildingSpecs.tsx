'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Development } from '@/types/development';
import SectionHeader from '@/components/ui/SectionHeader';
import {
  fadeUp,
  staggerContainer,
  staggerFast,
  staggerItem,
  defaultViewport,
} from '@/lib/animations';

interface BuildingSpecsProps {
  development: Development;
}

export default function BuildingSpecs({ development }: BuildingSpecsProps) {
  const { specifications, residencePolicies } = development;

  if (!specifications || !residencePolicies) return null;

  const specItems = [
    { label: 'Total Height', value: `${specifications.heightFeet}'`, sub: `${specifications.heightStories} Stories` },
    { label: 'Total Residences', value: specifications.totalResidences.toString(), sub: `Floors ${specifications.residentialFloors.from}-${specifications.residentialFloors.to}` },
    { label: 'Unit Mix', value: specifications.unitMix, sub: `${specifications.floorPlans.typical} typical + ${specifications.floorPlans.penthouse} penthouse plans` },
    { label: 'Avg PSF', value: `$${specifications.pricePerSqFt.average.toLocaleString()}`, sub: `$${specifications.pricePerSqFt.min} - $${specifications.pricePerSqFt.max}` },
    { label: 'Ceiling Height', value: specifications.ceilingHeight.typical, sub: 'Typical residences' },
    { label: 'Penthouses', value: specifications.floorPlans.penthouse.toString(), sub: specifications.ceilingHeight.penthouse || 'Premium floor plans' },
  ];

  const policyIcons: Record<string, string> = {
    paw: '\uD83D\uDC3E',
    key: '\uD83D\uDD11',
    car: '\uD83D\uDE97',
  };

  return (
    <section id="building" className="section-padding bg-charcoal-800">
      <div className="container-luxury">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
        >
          <SectionHeader
            eyebrow="Building Intelligence"
            title="Specifications & Policies"
            subtitle="The specifications and residence policies you need to qualify buyers and set expectations."
            variant="dark"
          />
        </motion.div>

        {/* ── Specs Narrative ── */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          className="mb-10 max-w-3xl"
        >
          <p className="text-sm font-body text-ivory-300 leading-relaxed">
            Building specifications are where marketing narratives meet structural
            reality — ceiling heights, floor counts, unit mix ratios, and average
            PSF tell you whether a development is positioned to compete or to lead.
            The data below captures the engineering and design commitments that are
            locked in at construction: these are not aspirational bullet points,
            they are contractual deliverables filed with the DBPR. Residence policies
            (pets, rentals, parking) follow the specs because they directly affect
            resale liquidity and rental income — two factors every buyer and agent
            should evaluate before contract.
          </p>
        </motion.div>

        {/* Hero terrace image + specs grid side-by-side on desktop */}
        <div className="grid lg:grid-cols-5 gap-6 mb-16">
          {/* Terrace image — spans 2 cols */}
          <motion.div
            className="lg:col-span-2 relative h-64 lg:h-auto min-h-[280px] rounded-sm overflow-hidden"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={defaultViewport}
          >
            <Image
              src={development.images?.gallery?.[0]?.src || development.images?.hero?.src || '/images/developments/waldorf-astoria/renderings/wa-terrace.jpg'}
              alt={development.images?.gallery?.[0]?.alt || development.images?.hero?.alt || `${development.name} terrace view`}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 40vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal-800/60 to-transparent" />
            <div className="absolute bottom-4 left-4">
              <span className="text-[10px] font-body font-semibold uppercase tracking-[0.2em] text-ivory-200/80 bg-charcoal-900/60 backdrop-blur-sm px-2.5 py-1 rounded-sm">
                Private Terrace View
              </span>
            </div>
          </motion.div>

          {/* Specs Bento Grid — spans 3 cols */}
          <motion.div
            className="lg:col-span-3 grid grid-cols-2 md:grid-cols-3 gap-4"
            variants={staggerFast}
            initial="hidden"
            whileInView="visible"
            viewport={defaultViewport}
          >
            {specItems.map((item, i) => (
              <motion.div
                key={i}
                className="bg-charcoal-900/50 border border-charcoal-700 rounded-sm p-6 hover:border-gold-500/30 transition-all"
                variants={staggerItem}
                whileHover={{ y: -4 }}
              >
                <div className="text-xs font-body font-semibold uppercase tracking-widest text-charcoal-400 mb-2">
                  {item.label}
                </div>
                <div className="text-2xl md:text-3xl font-heading font-bold text-ivory-50">
                  {item.value}
                </div>
                <div className="text-xs font-body text-ivory-400 mt-1">{item.sub}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Mixed-Use Program & Construction */}
        {(specifications.totalProjectCost || specifications.constructionTimeline) && (
          <>
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={defaultViewport}
            >
              <h3 className="text-sm font-body font-semibold uppercase tracking-widest text-gold-500 mb-6">
                Mixed-Use Program
              </h3>
            </motion.div>
            <motion.div
              className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-16"
              variants={staggerFast}
              initial="hidden"
              whileInView="visible"
              viewport={defaultViewport}
            >
              {specifications.totalProjectCost && (
                <motion.div
                  className="bg-charcoal-900/50 border border-charcoal-700 rounded-sm p-6 hover:border-gold-500/30 transition-all"
                  variants={staggerItem}
                  whileHover={{ y: -4 }}
                >
                  <div className="text-xs font-body font-semibold uppercase tracking-widest text-charcoal-400 mb-2">
                    Total Project Cost
                  </div>
                  <div className="text-2xl md:text-3xl font-heading font-bold text-ivory-50">
                    {specifications.totalProjectCost}
                  </div>
                </motion.div>
              )}
              {specifications.amenitySpaceSF && (
                <motion.div
                  className="bg-charcoal-900/50 border border-charcoal-700 rounded-sm p-6 hover:border-gold-500/30 transition-all"
                  variants={staggerItem}
                  whileHover={{ y: -4 }}
                >
                  <div className="text-xs font-body font-semibold uppercase tracking-widest text-charcoal-400 mb-2">
                    Amenity Space
                  </div>
                  <div className="text-2xl md:text-3xl font-heading font-bold text-ivory-50">
                    {specifications.amenitySpaceSF.toLocaleString()} SF
                  </div>
                </motion.div>
              )}
              {specifications.poolDeckSF && (
                <motion.div
                  className="bg-charcoal-900/50 border border-charcoal-700 rounded-sm p-6 hover:border-gold-500/30 transition-all"
                  variants={staggerItem}
                  whileHover={{ y: -4 }}
                >
                  <div className="text-xs font-body font-semibold uppercase tracking-widest text-charcoal-400 mb-2">
                    Pool Deck
                  </div>
                  <div className="text-2xl md:text-3xl font-heading font-bold text-ivory-50">
                    {specifications.poolDeckSF.toLocaleString()} SF
                  </div>
                </motion.div>
              )}
              {specifications.officeSpaceSF && (
                <motion.div
                  className="bg-charcoal-900/50 border border-charcoal-700 rounded-sm p-6 hover:border-gold-500/30 transition-all"
                  variants={staggerItem}
                  whileHover={{ y: -4 }}
                >
                  <div className="text-xs font-body font-semibold uppercase tracking-widest text-charcoal-400 mb-2">
                    Office Space
                  </div>
                  <div className="text-2xl md:text-3xl font-heading font-bold text-ivory-50">
                    {specifications.officeSpaceSF.toLocaleString()} SF
                  </div>
                </motion.div>
              )}
              {specifications.retailSpaceSF && (
                <motion.div
                  className="bg-charcoal-900/50 border border-charcoal-700 rounded-sm p-6 hover:border-gold-500/30 transition-all"
                  variants={staggerItem}
                  whileHover={{ y: -4 }}
                >
                  <div className="text-xs font-body font-semibold uppercase tracking-widest text-charcoal-400 mb-2">
                    Retail Space
                  </div>
                  <div className="text-2xl md:text-3xl font-heading font-bold text-ivory-50">
                    {specifications.retailSpaceSF.toLocaleString()} SF
                  </div>
                </motion.div>
              )}
              {specifications.constructionTimeline && (
                <motion.div
                  className="bg-charcoal-900/50 border border-charcoal-700 rounded-sm p-6 hover:border-gold-500/30 transition-all"
                  variants={staggerItem}
                  whileHover={{ y: -4 }}
                >
                  <div className="text-xs font-body font-semibold uppercase tracking-widest text-charcoal-400 mb-2">
                    Construction Timeline
                  </div>
                  <div className="text-xl font-heading font-bold text-ivory-50">
                    {specifications.constructionTimeline}
                  </div>
                </motion.div>
              )}
            </motion.div>
          </>
        )}

        {/* Storm Resiliency */}
        {specifications.stormResiliency && specifications.stormResiliency.length > 0 && (
          <>
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={defaultViewport}
            >
              <h3 className="text-sm font-body font-semibold uppercase tracking-widest text-gold-500 mb-6">
                Storm Resiliency
              </h3>
            </motion.div>
            <motion.div
              className="grid md:grid-cols-3 gap-4 mb-16"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={defaultViewport}
            >
              {specifications.stormResiliency.map((item, i) => (
                <motion.div
                  key={i}
                  className="bg-charcoal-900/50 border border-charcoal-700 rounded-sm p-6 hover:border-gold-500/30 transition-all duration-300 flex items-start gap-3"
                  variants={staggerItem}
                  whileHover={{ y: -2 }}
                >
                  <span className="text-xl shrink-0 mt-0.5">{'\uD83D\uDEE1\uFE0F'}</span>
                  <span className="text-sm font-body text-ivory-300 leading-relaxed">
                    {item}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </>
        )}

        {/* Residence Policies */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
        >
          <h3 className="text-sm font-body font-semibold uppercase tracking-widest text-gold-500 mb-6">
            Residence Policies
          </h3>
        </motion.div>
        <motion.div
          className="grid md:grid-cols-3 gap-4"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
        >
          {residencePolicies.map((policy, i) => (
            <motion.div
              key={i}
              className="bg-charcoal-900/50 border border-charcoal-700 rounded-sm p-6 hover:border-gold-500/30 transition-all duration-300"
              variants={staggerItem}
              whileHover={{ y: -2 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl">{policyIcons[policy.icon] || '\u2139\uFE0F'}</span>
                <div>
                  <div className="text-xs font-body font-semibold uppercase tracking-widest text-charcoal-400">
                    {policy.category}
                  </div>
                  <div className="text-lg font-heading font-bold text-ivory-50">
                    {policy.headline}
                  </div>
                </div>
              </div>
              <ul className="space-y-2">
                {policy.details.map((detail, j) => (
                  <li
                    key={j}
                    className="text-sm font-body text-ivory-300 leading-relaxed flex items-start gap-2"
                  >
                    <span className="text-gold-500 mt-1 shrink-0">&bull;</span>
                    {detail}
                  </li>
                ))}
              </ul>
              {policy.advisory && (
                <div className="mt-4 pt-4 border-t border-charcoal-700">
                  <p className="text-xs font-body text-gold-500/80 italic leading-relaxed">
                    <span className="font-semibold not-italic">Advisory: </span>
                    {policy.advisory}
                  </p>
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
