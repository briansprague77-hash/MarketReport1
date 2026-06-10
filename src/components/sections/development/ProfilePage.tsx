'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { DevelopmentProfile } from '@/types/development-profile';
import { Development } from '@/types/development';
import Badge from '@/components/ui/Badge';
import { statusBadgeConfig } from '@/data/market';
import { useAudience } from '@/lib/audience';
import TailInventory from './TailInventory';
import PriorPhase from './PriorPhase';
import TowerHeatmap from './TowerHeatmap';
import PricingLadder from './PricingLadder';
import CompetitivePosition from './CompetitivePosition';
import SalesPerformance from './SalesPerformance';
import ResidenceOverview from './ResidenceOverview';
import BuildingSpecs from './BuildingSpecs';
import Timeline from './Timeline';
import FinancingSection from './FinancingSection';
import BrokerCommissionSection from './BrokerCommissionSection';
import Visionaries from './Visionaries';
import SalesTeam from './SalesTeam';
import SourceNotes from './SourceNotes';
import SocialProof from './SocialProof';
import StickyTabNav, { TabDef } from '@/components/layout/StickyTabNav';
import LifecycleTimeline from '@/components/ui/LifecycleTimeline';
import PricingTrendBadge from '@/components/ui/PricingTrendBadge';
import RiskFlags from '@/components/ui/RiskFlags';
import IncentiveTracker from '@/components/ui/IncentiveTracker';
import {
  fadeUp,
  fadeIn,
  staggerContainer,
  staggerItem,
  heroTitle,
  heroSubtitle,
  defaultViewport,
} from '@/lib/animations';

interface ProfilePageProps {
  profile: DevelopmentProfile;
  development?: Development;  // Full data for progressive analytics (heatmap, pricing ladder, etc.)
}

export default function ProfilePage({ profile, development }: ProfilePageProps) {
  const { ctaLabel, isPro } = useAudience();
  const badge = statusBadgeConfig[profile.status];
  const statusLabel = badge?.label ?? profile.status;
  const heroImage = profile.galleryImages[0];

  // Build dynamic tab list based on available data
  const tabs: TabDef[] = (() => {
    const t: TabDef[] = [{ id: 'overview', label: 'Overview' }];

    if (profile.features.length > 0 || profile.amenities.length > 0) {
      const covers: string[] = [];
      if (profile.features.length > 0) covers.push('features');
      if (profile.amenities.length > 0) covers.push('amenities');
      t.push({ id: covers[0], label: 'Features', covers });
    }

    if (profile.galleryImages.length > 1) {
      t.push({ id: 'gallery', label: 'Gallery' });
    }

    if (profile.socialProof && profile.socialProof.length > 0) {
      t.push({ id: 'social-proof', label: 'Reviews' });
    }

    if (profile.scores) {
      t.push({ id: 'location-scores', label: 'Location' });
    }

    if (development?.salesMetrics) {
      t.push({ id: 'sales-performance', label: 'Sales' });
    }

    if (development?.pricingLadder) {
      t.push({ id: 'pricing-ladder', label: 'Pricing' });
    }

    if (development?.specifications) {
      t.push({ id: 'building', label: 'Building' });
    }

    if (development?.competitors && development.competitors.length > 0) {
      t.push({ id: 'competitive-position', label: 'Comps' });
    }

    // Group remaining analytical sections under "Details"
    const detailCovers: string[] = [];
    if (development?.timeline && development.timeline.length > 0) detailCovers.push('timeline');
    if (development?.financing) detailCovers.push('financing');
    if (development?.salesTeam || (development?.salesAgents && development.salesAgents.length > 0)) detailCovers.push('sales-team');
    if (development?.sourceNotes && development.sourceNotes.length > 0) detailCovers.push('source-notes');
    if (detailCovers.length > 0) {
      t.push({ id: detailCovers[0], label: 'Details', covers: detailCovers });
    }

    return t;
  })();

  return (
    <>
      {/* ─── Sticky Section Nav ─── */}
      {tabs.length > 2 && <StickyTabNav tabs={tabs} title={profile.name} />}

      {/* ─── Hero Section ─────────────────────────────────────────── */}
      <section className="relative min-h-[70vh] flex items-end overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-charcoal-950"
          initial={{ scale: 1.05 }}
          animate={{ scale: 1 }}
          transition={{ duration: 10, ease: 'easeOut' }}
        >
          {heroImage ? (
            <Image
              src={heroImage}
              alt={profile.name}
              fill
              className="object-cover opacity-50"
              priority
              sizes="100vw"
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-charcoal-900 via-charcoal-800 to-charcoal-950">
              {/* Branded Coming Soon placeholder — architectural grid pattern */}
              <div className="absolute inset-0 opacity-[0.04]" style={{
                backgroundImage: 'linear-gradient(rgba(212,168,83,1) 1px, transparent 1px), linear-gradient(90deg, rgba(212,168,83,1) 1px, transparent 1px)',
                backgroundSize: '60px 60px',
              }} />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none select-none">
                <div className="w-16 h-px bg-gold-500/30 mx-auto mb-4" />
                <p className="font-body text-xs uppercase tracking-[0.3em] text-charcoal-500">
                  {profile.status === 'delivered'
                    ? 'Photos Coming Soon'
                    : 'Renderings Coming Soon'}
                </p>
                <div className="w-16 h-px bg-gold-500/30 mx-auto mt-4" />
              </div>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950 via-charcoal-950/60 to-transparent" />
        </motion.div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 pb-16 pt-32 w-full">
          <Link
            href="/developments"
            className="inline-flex items-center gap-2 text-gold-500 hover:text-gold-400 transition-colors mb-8 text-sm font-body uppercase tracking-widest"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m15 18-6-6 6-6" />
            </svg>
            All Developments
          </Link>

          <motion.div variants={heroTitle} initial="hidden" animate="visible">
            <Badge label={statusLabel} variant="gold" />
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl text-ivory-50 mt-4 mb-3">
              {profile.name}
            </h1>
          </motion.div>

          <motion.p
            className="font-body text-lg text-charcoal-300 max-w-2xl"
            variants={heroSubtitle}
            initial="hidden"
            animate="visible"
          >
            {profile.tagline}
          </motion.p>

          {/* Quick Stats Row */}
          <motion.div
            className="flex flex-wrap gap-8 mt-10"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            <QuickStat label="Total Units" value={String(profile.totalUnits)} />
            <QuickStat label="Unit Sizes" value={profile.unitSizes} />
            <QuickStat label="Starting From" value={profile.price} />
            <QuickStat label="Delivery" value={profile.deliveryDate} />
          </motion.div>
        </div>
      </section>

      {/* ─── Content Section ──────────────────────────────────────── */}
      <section className="bg-ivory-50 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content (2/3) */}
            <div className="lg:col-span-2 space-y-16">
              {/* Overview */}
              <motion.div
                id="overview"
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={defaultViewport}
              >
                <SectionHeading>Overview</SectionHeading>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-8">
                  <InfoCard label="Bedrooms" value={profile.bedrooms} />
                  <InfoCard label="Bathrooms" value={profile.bathrooms} />
                  <InfoCard label="Living Space" value={profile.sqft} />
                  <InfoCard label="Developer" value={profile.developer} />
                </div>
                <p className="font-body text-charcoal-600 leading-relaxed text-[15px]">
                  {profile.description}
                </p>

                {/* Pricing Trend Badge */}
                {profile.pricingHistory && (
                  <div className="mt-6">
                    <PricingTrendBadge pricingHistory={profile.pricingHistory} />
                  </div>
                )}

                {/* Risk Flags */}
                {profile.riskFlags && profile.riskFlags.length > 0 && (
                  <div className="mt-4">
                    <span className="block font-body text-[10px] uppercase tracking-wider text-charcoal-400 mb-2">Risk Indicators</span>
                    <RiskFlags flags={profile.riskFlags} />
                  </div>
                )}

                {/* Incentive Tracker */}
                {profile.incentives && (
                  <IncentiveTracker incentives={profile.incentives} name={profile.name} />
                )}
              </motion.div>

              {/* Lifecycle Timeline */}
              {profile.lifecycle && Object.keys(profile.lifecycle).length > 0 && (
                <motion.div
                  id="lifecycle"
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={defaultViewport}
                >
                  <LifecycleTimeline lifecycle={profile.lifecycle} status={profile.status} />
                </motion.div>
              )}

              {/* Features */}
              {profile.features.length > 0 && (
                <motion.div
                  id="features"
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={defaultViewport}
                >
                  <SectionHeading>Residence Features</SectionHeading>
                  <motion.div
                    className="grid grid-cols-1 sm:grid-cols-2 gap-3"
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={defaultViewport}
                  >
                    {profile.features.map((feature) => (
                      <motion.div
                        key={feature}
                        className="flex items-start gap-3 py-2"
                        variants={staggerItem}
                      >
                        <span className="text-gold-500 mt-0.5 flex-shrink-0">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M20 6 9 17l-5-5" />
                          </svg>
                        </span>
                        <span className="font-body text-charcoal-700 text-sm">{feature}</span>
                      </motion.div>
                    ))}
                  </motion.div>
                </motion.div>
              )}

              {/* Amenities */}
              {profile.amenities.length > 0 && (
                <motion.div
                  id="amenities"
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={defaultViewport}
                >
                  <SectionHeading>Building Amenities</SectionHeading>
                  <motion.div
                    className="grid grid-cols-1 sm:grid-cols-2 gap-3"
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={defaultViewport}
                  >
                    {profile.amenities.map((amenity) => (
                      <motion.div
                        key={amenity}
                        className="flex items-start gap-3 py-2"
                        variants={staggerItem}
                      >
                        <span className="text-gold-500 mt-0.5 flex-shrink-0">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
                          </svg>
                        </span>
                        <span className="font-body text-charcoal-700 text-sm">{amenity}</span>
                      </motion.div>
                    ))}
                  </motion.div>
                </motion.div>
              )}

              {/* Gallery */}
              {profile.galleryImages.length > 1 && (
                <motion.div
                  id="gallery"
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={defaultViewport}
                >
                  <SectionHeading>Gallery</SectionHeading>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {profile.galleryImages.slice(1).map((img, i) => (
                      <motion.div
                        key={i}
                        className="relative aspect-[4/3] rounded-lg overflow-hidden"
                        variants={fadeIn}
                      >
                        <Image
                          src={img}
                          alt={`${profile.name} — Gallery ${i + 2}`}
                          fill
                          className="object-cover"
                          sizes="(max-width: 640px) 100vw, 50vw"
                        />
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Social Proof — curated buyer reviews */}
              {profile.socialProof && profile.socialProof.length > 0 && (
                <SocialProof socialProof={profile.socialProof} variant="inline" />
              )}

              {/* Location Scores */}
              {profile.scores && (
                <motion.div
                  id="location-scores"
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={defaultViewport}
                >
                  <SectionHeading>Location Scores</SectionHeading>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {profile.scores.walkScore != null && (
                      <ScoreCard label="Walk Score" value={profile.scores.walkScore} />
                    )}
                    {profile.scores.bikeScore != null && (
                      <ScoreCard label="Bike Score" value={profile.scores.bikeScore} />
                    )}
                    {profile.scores.transitScore != null && (
                      <ScoreCard label="Transit Score" value={profile.scores.transitScore} />
                    )}
                  </div>
                </motion.div>
              )}

              {/* Prior Phase Performance (for Tower 2 / Phase 2 developments) */}
              {profile.priorPhase && (
                <motion.div
                  id="prior-phase"
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={defaultViewport}
                >
                  <SectionHeading>Prior Phase</SectionHeading>
                  <PriorPhase data={profile.priorPhase} />
                </motion.div>
              )}

              {/* Tail Inventory Analysis — ONLY for delivered buildings with active resale market */}
              {profile.tailInventory && (profile.status === 'delivered' || profile.status === 'sold-out') && (
                <motion.div
                  id="closeout"
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={defaultViewport}
                >
                  <SectionHeading>Closeout Analysis</SectionHeading>
                  <TailInventory
                    data={profile.tailInventory}
                    developmentName={profile.name}
                  />
                </motion.div>
              )}
            </div>

            {/* Sidebar (1/3) */}
            <div className="lg:col-span-1">
              <motion.div
                className="sticky top-24 space-y-6"
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={defaultViewport}
              >
                {/* Contact Card */}
                <div className="bg-white rounded-lg border border-charcoal-200 p-6 shadow-sm">
                  <h3 className="font-heading text-xl text-charcoal-900 mb-4">
                    Project Details
                  </h3>
                  <div className="space-y-4 font-body text-sm">
                    <DetailRow label="Location" value={profile.location} />
                    <DetailRow label="Type" value={profile.type} />
                    <DetailRow label="Developer" value={profile.developer} />
                    {profile.architect && (
                      <DetailRow label="Architect" value={profile.architect} />
                    )}
                    {profile.interiorDesigner && (
                      <DetailRow label="Interior Design" value={profile.interiorDesigner} />
                    )}
                    <DetailRow label="Total Units" value={String(profile.totalUnits)} />
                    <DetailRow label="Unit Sizes" value={profile.unitSizes} />
                    <DetailRow label="Delivery" value={profile.deliveryDate} />
                  </div>
                </div>

                {/* Contact Info */}
                {(profile.phone || profile.website || profile.salesGallery || profile.socialMedia) && (
                  <div className="bg-white rounded-lg border border-charcoal-200 p-6 shadow-sm">
                    <h3 className="font-heading text-xl text-charcoal-900 mb-4">
                      Contact
                    </h3>
                    <div className="space-y-3 font-body text-sm">
                      {profile.phone && (
                        <a
                          href={`tel:${profile.phone}`}
                          className="flex items-center gap-3 text-charcoal-600 hover:text-gold-500 transition-colors"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                          </svg>
                          {profile.phone}
                        </a>
                      )}
                      {profile.website && (
                        <a
                          href={profile.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-3 text-charcoal-600 hover:text-gold-500 transition-colors"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="10" />
                            <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
                            <path d="M2 12h20" />
                          </svg>
                          Website
                        </a>
                      )}
                      {profile.salesGallery && (
                        <div className="flex items-start gap-3 text-charcoal-600">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 flex-shrink-0">
                            <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                            <circle cx="12" cy="10" r="3" />
                          </svg>
                          <span className="text-charcoal-600">
                            <span className="block text-charcoal-400 text-xs uppercase tracking-wider mb-0.5">Sales Gallery</span>
                            {profile.salesGallery}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Social Media Links */}
                    {profile.socialMedia && (
                      <div className="mt-4 pt-4 border-t border-charcoal-100">
                        <span className="block text-charcoal-400 text-xs uppercase tracking-wider mb-3">Follow</span>
                        <div className="flex gap-3">
                          {profile.socialMedia.instagram && (
                            <a
                              href={profile.socialMedia.instagram}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center justify-center w-9 h-9 rounded-full bg-charcoal-50 text-charcoal-500 hover:bg-gold-500 hover:text-white transition-all duration-200"
                              aria-label="Instagram"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                              </svg>
                            </a>
                          )}
                          {profile.socialMedia.facebook && (
                            <a
                              href={profile.socialMedia.facebook}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center justify-center w-9 h-9 rounded-full bg-charcoal-50 text-charcoal-500 hover:bg-gold-500 hover:text-white transition-all duration-200"
                              aria-label="Facebook"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                              </svg>
                            </a>
                          )}
                          {profile.socialMedia.youtube && (
                            <a
                              href={profile.socialMedia.youtube}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center justify-center w-9 h-9 rounded-full bg-charcoal-50 text-charcoal-500 hover:bg-gold-500 hover:text-white transition-all duration-200"
                              aria-label="YouTube"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
                                <path d="m10 15 5-3-5-3z" />
                              </svg>
                            </a>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Realtor Resources */}
                <div className="bg-white rounded-lg border border-charcoal-200 p-6 shadow-sm">
                  <h3 className="font-heading text-xl text-charcoal-900 mb-1">
                    Realtor Resources
                  </h3>
                  <p className="font-body text-xs text-charcoal-400 mb-5">
                    Request materials for your clients
                  </p>
                  <div className="space-y-3">
                    {[
                      { label: 'Digital Brochure', icon: 'M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20' },
                      { label: 'Floor Plans PDF', icon: 'M2 7v10M6 5v14M18 5v14M22 7v10M14 5v14M10 5v14' },
                      { label: 'Price Sheet', icon: 'M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6' },
                      { label: 'Availability Report', icon: 'M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2 M15 2H9a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1Z' },
                    ].map((item) => (
                      <Link
                        key={item.label}
                        href="/contact"
                        className="flex items-center gap-3 p-3 rounded-sm border border-ivory-300 hover:border-gold-500/30 hover:bg-ivory-50 transition-all group"
                      >
                        <span className="text-charcoal-400 group-hover:text-gold-500 transition-colors flex-shrink-0">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d={item.icon} />
                          </svg>
                        </span>
                        <span className="font-body text-sm text-charcoal-700 group-hover:text-charcoal-900 transition-colors">
                          {item.label}
                        </span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-auto text-charcoal-300 group-hover:text-gold-500 transition-colors flex-shrink-0">
                          <path d="M5 12h14" />
                          <path d="m12 5 7 7-7 7" />
                        </svg>
                      </Link>
                    ))}
                  </div>
                  <Link
                    href="/realtor-resources"
                    className="inline-flex items-center gap-2 mt-4 text-xs font-body font-semibold text-gold-600 hover:text-gold-500 uppercase tracking-wider transition-colors"
                  >
                    View All Resources
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14" />
                      <path d="m12 5 7 7-7 7" />
                    </svg>
                  </Link>
                </div>

                {/* Document Downloads */}
                {profile.documents && (profile.documents.purchaseAgreementUrl || profile.documents.condoDocsUrl) && (
                  <div className="bg-white rounded-lg border border-charcoal-200 p-6 shadow-sm">
                    <h3 className="font-heading text-xl text-charcoal-900 mb-1">
                      Documents
                    </h3>
                    <p className="font-body text-xs text-charcoal-400 mb-5">
                      Review purchase &amp; condo documents
                    </p>
                    <div className="space-y-3">
                      {profile.documents.purchaseAgreementUrl && (
                        <a
                          href={profile.documents.purchaseAgreementUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-3 p-3 rounded-sm border border-ivory-300 hover:border-gold-500/30 hover:bg-ivory-50 transition-all group"
                        >
                          <span className="text-charcoal-400 group-hover:text-gold-500 transition-colors flex-shrink-0">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" />
                              <path d="M14 2v6h6" />
                              <path d="M12 18v-6" />
                              <path d="m9 15 3 3 3-3" />
                            </svg>
                          </span>
                          <span className="font-body text-sm text-charcoal-700 group-hover:text-charcoal-900 transition-colors">
                            Purchase Agreement
                          </span>
                          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-auto text-charcoal-300 group-hover:text-gold-500 transition-colors flex-shrink-0">
                            <path d="M12 5v14" />
                            <path d="m19 12-7 7-7-7" />
                          </svg>
                        </a>
                      )}
                      {profile.documents.condoDocsUrl && (
                        <a
                          href={profile.documents.condoDocsUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-3 p-3 rounded-sm border border-ivory-300 hover:border-gold-500/30 hover:bg-ivory-50 transition-all group"
                        >
                          <span className="text-charcoal-400 group-hover:text-gold-500 transition-colors flex-shrink-0">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
                              <path d="M12 13V7" />
                              <path d="m9 10 3-3 3 3" />
                            </svg>
                          </span>
                          <span className="font-body text-sm text-charcoal-700 group-hover:text-charcoal-900 transition-colors">
                            Condo Documents
                          </span>
                          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-auto text-charcoal-300 group-hover:text-gold-500 transition-colors flex-shrink-0">
                            <path d="M12 5v14" />
                            <path d="m19 12-7 7-7-7" />
                          </svg>
                        </a>
                      )}
                    </div>
                  </div>
                )}

                {/* CTA */}
                <div className="bg-charcoal-950 rounded-lg p-6 text-center">
                  <p className="font-heading text-ivory-50 text-lg mb-2">
                    {isPro ? `Preview ${profile.name}` : `Interested in ${profile.name}?`}
                  </p>
                  <p className="font-body text-charcoal-400 text-sm mb-4">
                    {isPro
                      ? 'Schedule a private broker preview for you or your clients.'
                      : 'Contact our team for pricing, availability, and private showings.'}
                  </p>
                  <a
                    href="/contact"
                    className="inline-flex items-center justify-center w-full px-6 py-3 bg-gold-500 text-charcoal-900 font-body font-semibold text-sm uppercase tracking-wide rounded-sm hover:bg-gold-400 transition-colors"
                  >
                    {ctaLabel}
                  </a>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Progressive Analytics ─────────────────────────────────
           Conditionally rendered when full Development data is
           available. Each component has its own null-check, so
           sections appear only when the underlying data exists.

           Order: Sales → Pricing → Floor Plans → Specs →
                  Competitive → Timeline → Financing → Broker →
                  Visionaries → Sales Team → Sources
           ──────────────────────────────────────────────────────── */}

      {/* Sales Performance — monthly absorption, contract velocity */}
      {development?.salesMetrics && (
        <SalesPerformance development={development} />
      )}

      {/* Tower Heatmap + Pricing Ladder — unit-level pricing visualization */}
      {development?.pricingLadder && (
        <>
          <TowerHeatmap development={development} />
          <PricingLadder development={development} />
        </>
      )}

      {/* Residence Overview — floor plans, layouts, starting prices */}
      {development?.specifications?.floorPlanSpecs && (
        <ResidenceOverview development={development} />
      )}

      {/* Building Specs — height, construction, policies */}
      {development?.specifications && (
        <BuildingSpecs development={development} />
      )}

      {/* Competitive Position — PSF comparison vs. nearby developments */}
      {development?.competitors && development.competitors.length > 0 && (
        <CompetitivePosition development={development} />
      )}

      {/* Timeline — development milestones from groundbreaking to delivery */}
      {development?.timeline && development.timeline.length > 0 && (
        <Timeline development={development} />
      )}

      {/* Financing — deposit structure, lending options */}
      {development?.financing && (
        <FinancingSection development={development} />
      )}

      {/* Broker Commission — co-op details (pro-only via AudienceContext) */}
      {development?.brokerCommission && (
        <BrokerCommissionSection development={development} />
      )}

      {/* Visionaries — architect, interior designer, developer principals */}
      {development?.visionaries && development.visionaries.length > 0 && (
        <Visionaries development={development} />
      )}

      {/* Sales Team — brokerage, agents with phone/email, gallery location */}
      {(development?.salesTeam || (development?.salesAgents && development.salesAgents.length > 0)) && (
        <SalesTeam development={development} />
      )}

      {/* Source Notes — data provenance and methodology (always last) */}
      {development?.sourceNotes && development.sourceNotes.length > 0 && (
        <SourceNotes development={development} />
      )}
    </>
  );
}

// ─── Sub-Components ───────────────────────────────────────────────────────

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-heading text-2xl text-charcoal-900 mb-6">
      {children}
      <div className="w-12 h-0.5 bg-gold-500 mt-3" />
    </h2>
  );
}

function QuickStat({ label, value }: { label: string; value: string }) {
  return (
    <motion.div variants={staggerItem}>
      <p className="font-body text-xs text-charcoal-400 uppercase tracking-wider mb-1">{label}</p>
      <p className="font-heading text-xl text-ivory-50">{value}</p>
    </motion.div>
  );
}

function InfoCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-white rounded-lg border border-charcoal-200 p-4 text-center">
      <p className="font-body text-xs text-charcoal-400 uppercase tracking-wider mb-1">{label}</p>
      <p className="font-heading text-lg text-charcoal-900">{value}</p>
    </div>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between items-start gap-4">
      <span className="text-charcoal-400 whitespace-nowrap">{label}</span>
      <span className="text-charcoal-800 text-right font-medium">{value}</span>
    </div>
  );
}

function ScoreCard({ label, value }: { label: string; value: number }) {
  const getColor = (score: number) => {
    if (score >= 70) return 'text-emerald-600';
    if (score >= 50) return 'text-amber-600';
    return 'text-charcoal-500';
  };

  return (
    <div className="bg-white rounded-lg border border-charcoal-200 p-4 text-center">
      <p className={`font-heading text-3xl ${getColor(value)} mb-1`}>{value}</p>
      <p className="font-body text-xs text-charcoal-400 uppercase tracking-wider">{label}</p>
    </div>
  );
}
