'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { trackedDevelopments } from '@/data/market';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import ImageBreak from '@/components/ui/ImageBreak';
import AnimatedCounter from '@/components/ui/AnimatedCounter';
import GoldDivider from '@/components/ui/GoldDivider';
import { motion } from 'framer-motion';
import {
  fadeUp,
  heroTitle,
  heroSubtitle,
  heroCtas,
  heroStats,
  heroStatItem,
  scaleIn,
  defaultViewport,
} from '@/lib/animations';
import {
  ThisWeekFeed,
  SubmarketPulse,
  VelocityLeaderboard,
  DeliveryCalendar,
  MarketThesisActs,
  FeaturedBuilding,
  AudienceCTASplit,
} from '@/components/sections/home';

// ─── Hero Images — building exteriors only ─────────────────────────────────
const HERO_IMAGES = [
  { src: '/images/developments/waldorf-astoria/renderings/wa-hero.jpg', name: 'Waldorf Astoria Residences', caption: '50-Story Waterfront Tower — Downtown St. Petersburg' },
  { src: '/images/developments/viceroy-clearwater/hero.jpg', name: 'Viceroy Residences', caption: '86 Branded Residences — Clearwater Beach' },
];

// ─── Below-the-fold image break ─────────────────────────────────────────────
const BREAK_IMAGES = [
  { src: '/images/developments/waldorf-astoria/renderings/wa-pool.jpg', caption: 'Waldorf Astoria — Rooftop Pool Deck with Bay Views' },
  { src: '/images/developments/waldorf-astoria/renderings/wa-lobby.jpg', caption: 'Waldorf Astoria — Residential Lobby by BAMO Design' },
  { src: '/images/developments/waldorf-astoria/renderings/wa-living-room.jpg', caption: 'Waldorf Astoria — Great Room with Floor-to-Ceiling Glass' },
  { src: '/images/developments/waldorf-astoria/renderings/wa-terrace.jpg', caption: 'Waldorf Astoria — Private Dining Terrace at Sunset' },
  { src: '/images/developments/waldorf-astoria/renderings/wa-primary-bedroom.jpg', caption: 'Waldorf Astoria — Primary Suite with Panoramic City Views' },
  { src: '/images/developments/waldorf-astoria/renderings/wa-kitchen.jpg', caption: "Waldorf Astoria — Chef's Kitchen with Marble Island" },
  { src: '/images/developments/viceroy-clearwater/pool.jpg', caption: 'Viceroy Clearwater Beach — Resort Pool with Gulf Views' },
  { src: '/images/developments/viceroy-clearwater/club-house.jpg', caption: "Viceroy Clearwater Beach — Residents' Lounge" },
  { src: '/images/developments/viceroy-clearwater/spa.jpg', caption: 'Viceroy Clearwater Beach — Beachfront Terrace & Wellness Deck' },
];

export default function HomePage() {
  const [heroImage, setHeroImage] = useState(HERO_IMAGES[0]);
  const [breakImage, setBreakImage] = useState(BREAK_IMAGES[0]);
  useEffect(() => {
    setHeroImage(HERO_IMAGES[Math.floor(Math.random() * HERO_IMAGES.length)]);
    setBreakImage(BREAK_IMAGES[Math.floor(Math.random() * BREAK_IMAGES.length)]);
  }, []);

  const liveStats = useMemo(() => {
    const active = trackedDevelopments.filter((d) => d.status !== 'sold-out' && d.units > 0);
    const totalUnits = active.reduce((s, d) => s + d.units, 0);
    const branded = active.filter((d) => d.tags?.includes('Hospitality Brand') || d.tags?.includes('Lifestyle Brand'));
    const brandedUnits = branded.reduce((s, d) => s + d.units, 0);
    const withPsf = active.filter((d) => (d.resalePsf ?? d.developerClosePsf ?? d.avgPsf ?? 0) > 0);
    const avgPsf = withPsf.length
      ? Math.round(withPsf.reduce((s, d) => s + (d.resalePsf ?? d.developerClosePsf ?? d.avgPsf ?? 0), 0) / withPsf.length)
      : 0;
    // PSF ceiling: highest PSF across tracked developments. Derived from the same
    // coalesce chain as avgPsf so both stats use consistent sources. Sold-out
    // buildings are excluded — their PSF reflects today's resale premium,
    // not the active pipeline's ceiling.
    const psfPairs = trackedDevelopments
      .filter((d) => d.status !== 'sold-out')
      .map((d) => ({ dev: d, psf: d.resalePsf ?? d.developerClosePsf ?? d.avgPsf ?? 0 }))
      .filter((p) => p.psf > 0)
      .sort((a, b) => b.psf - a.psf);
    const maxPsf = psfPairs[0]?.psf ?? 0;
    const maxPsfDevName = psfPairs[0]?.dev.name ?? 'Top building';
    const statusCounts: Record<string, { units: number; color: string }> = {};
    const statusColors: Record<string, string> = {
      'shadow-inventory': '#78909C',
      'reservation': '#8B5CF6',
      'pre-sales': '#3B82F6',
      'under-construction': '#F59E0B',
      'delivered': '#10B981',
      'sold-out': '#6B7280',
    };
    for (const d of active) {
      if (!statusCounts[d.status]) statusCounts[d.status] = { units: 0, color: statusColors[d.status] || '#6B7280' };
      statusCounts[d.status].units += d.units;
    }
    const pricedCount = trackedDevelopments.filter((d) => (d.avgPsf ?? 0) > 0).length;
    return { totalUnits, brandedUnits, brandedPct: Math.round((brandedUnits / totalUnits) * 100), avgPsf, maxPsf, maxPsfDevName, statusCounts, activeCount: active.length, pricedCount };
  }, []);

  const totalTracked = trackedDevelopments.length;

  return (
    <>
      {/* ─── Hero ───────────────────────────────────────────────── */}
      <section className="relative min-h-[90vh] flex items-center bg-charcoal-950 overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroImage.src} alt={`${heroImage.name} — ${heroImage.caption}`} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-charcoal-950 via-charcoal-950/85 to-charcoal-950/60" />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950 via-transparent to-charcoal-950/40" />
        </div>

        <div className="relative container-luxury py-32">
          <motion.div className="max-w-4xl" initial="hidden" animate="visible">
            <motion.div variants={fadeUp} className="mb-6">
              <Badge label="Tampa Bay New Construction Intelligence" variant="gold" size="md" />
            </motion.div>
            <motion.h1 variants={heroTitle} className="font-heading text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-[1.1] mb-6">
              Tampa Bay
              <span className="block text-gold-400 mt-2">New Construction Intelligence</span>
            </motion.h1>
            <motion.p variants={heroSubtitle} className="text-xl sm:text-2xl text-ivory-300/80 max-w-2xl mb-4 leading-relaxed">
              {totalTracked} developments tracked. Every price sourced. Every claim cited. No spin.
            </motion.p>
            <motion.p variants={heroSubtitle} className="text-base text-ivory-400/60 max-w-xl mb-10">
              Real data for buyers, realtors, and developers — not marketing flyers.
            </motion.p>
            <motion.div variants={heroCtas} className="flex flex-wrap gap-4 mb-16">
              <Link href="/market-report"><Button variant="primary" size="lg">View Market Report</Button></Link>
              <Link href="/developments"><Button variant="outline" size="lg">Explore Developments</Button></Link>
            </motion.div>
          </motion.div>

          <motion.div variants={heroStats} initial="hidden" animate="visible" className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            <motion.div variants={heroStatItem} className="relative p-6 rounded-xl border border-ivory-100/10 bg-charcoal-900/50 backdrop-blur-sm">
              <AnimatedCounter value={liveStats.totalUnits} className="text-3xl sm:text-4xl font-heading font-bold text-white" duration={2} />
              <div className="text-sm text-gold-400 font-medium mt-1">Units in Active Pipeline</div>
              <div className="text-xs text-ivory-400/50 mt-0.5">{liveStats.activeCount} developments</div>
            </motion.div>
            <motion.div variants={heroStatItem} className="relative p-6 rounded-xl border border-ivory-100/10 bg-charcoal-900/50 backdrop-blur-sm">
              <AnimatedCounter value={liveStats.brandedPct} suffix="%" className="text-3xl sm:text-4xl font-heading font-bold text-white" duration={2} />
              <div className="text-sm text-gold-400 font-medium mt-1">Branded Residences</div>
              <div className="text-xs text-ivory-400/50 mt-0.5">{liveStats.brandedUnits.toLocaleString()} units across 7 brands</div>
            </motion.div>
            <motion.div variants={heroStatItem} className="relative p-6 rounded-xl border border-ivory-100/10 bg-charcoal-900/50 backdrop-blur-sm">
              <div className="text-3xl sm:text-4xl font-heading font-bold text-white">
                $<AnimatedCounter value={liveStats.avgPsf} className="text-3xl sm:text-4xl font-heading font-bold text-white" duration={2} />
              </div>
              <div className="text-sm text-gold-400 font-medium mt-1">Avg Market $/SF</div>
              <div className="text-xs text-ivory-400/50 mt-0.5">Across {liveStats.pricedCount} priced buildings</div>
            </motion.div>
            <motion.div variants={heroStatItem} className="relative p-6 rounded-xl border border-gold-500/20 bg-gold-500/5 backdrop-blur-sm">
              <div className="text-3xl sm:text-4xl font-heading font-bold text-gold-400">
                $<AnimatedCounter value={liveStats.maxPsf} className="text-3xl sm:text-4xl font-heading font-bold text-gold-400" duration={2} />
              </div>
              <div className="text-sm text-gold-400 font-medium mt-1">PSF Ceiling</div>
              <div className="text-xs text-ivory-400/50 mt-0.5">{liveStats.maxPsfDevName}</div>
            </motion.div>
          </motion.div>

          <motion.div variants={fadeUp} initial="hidden" animate="visible" className="mt-6">
            <div className="flex h-3 rounded-full overflow-hidden border border-ivory-100/10">
              {Object.entries(liveStats.statusCounts).sort((a, b) => b[1].units - a[1].units).map(([status, data]) => (
                <div key={status} className="h-full transition-all duration-1000"
                  style={{ width: `${(data.units / liveStats.totalUnits) * 100}%`, backgroundColor: data.color }}
                  title={`${status}: ${data.units} units`} />
              ))}
            </div>
            <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2">
              {Object.entries(liveStats.statusCounts).sort((a, b) => b[1].units - a[1].units).map(([status, data]) => (
                <div key={status} className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full" style={{ backgroundColor: data.color }} />
                  <span className="text-[10px] font-body text-ivory-400/50 capitalize">{status.replace(/-/g, ' ')} ({data.units})</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <ThisWeekFeed />
      <SubmarketPulse />
      <VelocityLeaderboard />

      <ImageBreak src={breakImage.src} alt={breakImage.caption} caption={breakImage.caption} height="md" overlay="medium" />

      <DeliveryCalendar />
      <MarketThesisActs />

      <GoldDivider variant="gradient" />

      <FeaturedBuilding />

      {/* ─── Straight Talk (kept from original homepage) ─────────── */}
      <section id="methodology" className="py-24 bg-charcoal-900/30">
        <div className="container-luxury">
          <motion.div initial="hidden" whileInView="visible" viewport={defaultViewport} variants={fadeUp} className="max-w-3xl mx-auto text-center mb-14">
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white mb-4">Straight Talk</h2>
            <p className="text-lg text-ivory-400/70">Three things you should know about this report before you share it.</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {[
              { title: "This Isn't Marketing", body: "No developer paid for placement here. No listings are promoted. If the numbers are bad, the numbers are bad. You'll see it." },
              { title: "We Get It Wrong Sometimes", body: "Market data moves fast. If you spot an error, tell us. We'll fix it, credit you, and move on. No ego." },
              { title: "Built for Working Agents", body: "This report exists because sending a client a developer's glossy PDF isn't due diligence. Sourced data is." },
            ].map((card, i) => (
              <motion.div key={i} initial="hidden" whileInView="visible" viewport={defaultViewport} variants={fadeUp}
                className="rounded-xl border border-ivory-100/10 bg-charcoal-950/60 p-8">
                <h3 className="font-heading text-lg font-semibold text-white mb-3">{card.title}</h3>
                <p className="text-sm text-ivory-400/60 leading-relaxed">{card.body}</p>
              </motion.div>
            ))}
          </div>

          <motion.div initial="hidden" whileInView="visible" viewport={defaultViewport} variants={scaleIn} className="max-w-2xl mx-auto text-center">
            <p className="text-ivory-400/50 text-sm mb-4">Compiled by</p>
            <h3 className="font-heading text-2xl font-bold text-white mb-2">Brian Sprague</h3>
            <p className="text-ivory-400/60 mb-6">Licensed Florida Real Estate Broker FL BK3221171 &middot; Development Marketing Consultant</p>
            <div className="flex justify-center gap-4">
              <Link href="/contact"><Button variant="outline" size="md">Get in Touch</Button></Link>
              <Link href="/about"><Button variant="ghost" size="md">About This Report</Button></Link>
            </div>
          </motion.div>
        </div>
      </section>

      <AudienceCTASplit />

      {/* ─── Disclaimer ──────────────────────────────────────────── */}
      <section className="py-12 bg-charcoal-950 border-t border-ivory-100/5">
        <div className="container-luxury">
          <p className="text-xs text-ivory-400/30 max-w-4xl mx-auto text-center leading-relaxed">
            This report is compiled for informational purposes only and does not constitute a solicitation, offering, or investment advice. All data is sourced from Stellar MLS, developer disclosures, and proprietary broker research. Figures should be independently verified before making purchase decisions. Market conditions are subject to change. Equal Housing Opportunity.
          </p>
        </div>
      </section>
    </>
  );
}
