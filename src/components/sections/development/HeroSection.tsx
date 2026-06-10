'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Development } from '@/types/development';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import StatCard from '@/components/ui/StatCard';
import {
  fadeIn,
  heroTitle,
  heroSubtitle,
  heroCtas,
  heroStats,
  heroStatItem,
} from '@/lib/animations';
import { statusBadgeConfig } from '@/data/market';

interface HeroSectionProps {
  development: Development;
}

export default function HeroSection({ development }: HeroSectionProps) {
  const { fullName, tagline, heroDescription, images, status, tier, badges, salesMetrics, specifications, deliveryDate, penthouse } = development;

  // Every page gets a hero — profiles without analytical data still render
  // with core identity (name, tagline, image, status, delivery).
  if (!fullName) return null;

  const badge = statusBadgeConfig[status];
  const statusLabel = badge?.label ?? status;
  const heroImage = images?.hero;
  const safeBadges = badges ?? [];

  return (
    <section className="relative min-h-screen flex items-end overflow-hidden">
      {/* Background with Ken Burns Effect */}
      <motion.div
        className="absolute inset-0 bg-charcoal-950"
        initial={{ scale: 1.08 }}
        animate={{ scale: 1 }}
        transition={{ duration: 12, ease: 'easeOut' }}
      >
        {/* Property hero image or fallback gradient */}
        {heroImage ? (
          <Image
            src={heroImage.src}
            alt={heroImage.alt}
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
            quality={85}
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-charcoal-950 via-charcoal-800 to-charcoal-950" />
        )}
        {/* Gradient overlays for text legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950 via-charcoal-950/70 to-charcoal-950/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal-950/60 via-transparent to-transparent" />
      </motion.div>

      {/* Content */}
      <div className="relative container-luxury pb-16 md:pb-24 pt-32 md:pt-40 w-full">
        {/* Badges */}
        <motion.div
          className="flex flex-wrap gap-2 mb-6"
          variants={fadeIn}
          initial="hidden"
          animate="visible"
        >
          <Badge label={statusLabel} variant="gold" />
          {tier === 'ultra-luxury' && <Badge label="Tier 1 Luxury" variant="dark" />}
          {safeBadges.includes('Hospitality Brand') && (
            <Badge label="Hospitality Brand" variant="dark" />
          )}
          {safeBadges.includes('Lifestyle Brand') && (
            <Badge label="Lifestyle Brand" variant="dark" />
          )}
          {safeBadges.includes('Waterfront') && <Badge label="Waterfront" variant="dark" />}
        </motion.div>

        {/* Title Block */}
        <div className="max-w-3xl mb-10">
          <motion.div
            className="flex items-center gap-3 mb-3"
            variants={fadeIn}
            initial="hidden"
            animate="visible"
          >
            <div className="h-px w-10 bg-gold-500" />
            <span className="text-gold-500 text-xs font-body font-semibold uppercase tracking-[0.25em]">
              {tagline}
            </span>
          </motion.div>
          <motion.h1
            className="text-5xl md:text-6xl lg:text-7xl font-heading font-bold text-ivory-50 leading-[1.05] mb-4"
            variants={heroTitle}
            initial="hidden"
            animate="visible"
          >
            {fullName}
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl font-body text-ivory-300 leading-relaxed max-w-2xl mb-3"
            variants={heroSubtitle}
            initial="hidden"
            animate="visible"
          >
            {heroDescription ||
              (specifications
                ? `A ${specifications.heightStories}-story, ${specifications.totalResidences}-residence tower in ${development.location}.`
                : development.location)}
          </motion.p>
          {penthouse && (
            <motion.p
              className="text-sm font-body text-gold-500/80 leading-relaxed max-w-2xl"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.6 }}
            >
              Record-setting {penthouse.price} penthouse &bull; {penthouse.sqft} SF &bull; Tampa Bay&apos;s all-time residential price record
            </motion.p>
          )}
        </div>

        {/* CTA Row */}
        <motion.div
          className="flex flex-wrap gap-4 mb-14"
          variants={heroCtas}
          initial="hidden"
          animate="visible"
        >
          <Button variant="primary" size="lg">
            Schedule Private Showing
          </Button>
          <Button variant="outline" size="lg">
            Request Full Report
          </Button>
        </motion.div>

        {/* Hero Stats Grid — only renders when full analytical data is available */}
        {specifications && salesMetrics && (
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-4"
            variants={heroStats}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={heroStatItem}>
              <StatCard
                value={specifications.totalResidences.toString()}
                label="Total Residences"
                sublabel={`${specifications.heightFeet}' / ${specifications.heightStories} Stories`}
                variant="glass"
              />
            </motion.div>
            <motion.div variants={heroStatItem}>
              <StatCard
                value={salesMetrics.soldPercentage.toString()}
                label="Sold"
                suffix="%"
                sublabel={`${salesMetrics.soldUnits} of ${salesMetrics.totalUnits} units`}
                variant="glass"
              />
            </motion.div>
            <motion.div variants={heroStatItem}>
              <StatCard
                value={salesMetrics.contractValue}
                label="Contracted Sales"
                sublabel={`Since ${salesMetrics.launchDate}`}
                animate={false}
                variant="glass"
              />
            </motion.div>
            <motion.div variants={heroStatItem}>
              <StatCard
                value={deliveryDate}
                label="Delivery"
                sublabel={`Velocity: ${salesMetrics.velocity}`}
                animate={false}
                variant="glass"
              />
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
