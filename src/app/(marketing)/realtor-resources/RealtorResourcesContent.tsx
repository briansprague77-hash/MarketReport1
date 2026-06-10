'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import ShareButton from '@/components/ui/ShareButton';
import CopyButton from '@/components/ui/CopyButton';
import { author } from '@/data/market';
import { waldorfAstoria } from '@/data/developments/waldorf-astoria';
import { artHouse } from '@/data/developments/art-house';
import { residencesAt400CentralDevelopment } from '@/data/developments/400-central';
import { fourSeasonsStPete } from '@/data/developments/four-seasons-stpete';
import { theCade } from '@/data/developments/the-cade';
import { rocheBobois } from '@/data/developments/roche-bobois';
import { reflection } from '@/data/developments/reflection';
import { viceroyClearwater } from '@/data/developments/viceroy-clearwater';
import { coreyLandings } from '@/data/developments/corey-landings';
import { lakeHouse } from '@/data/developments/lake-house';
import { kolter3rdAve } from '@/data/developments/kolter-3rd-ave';
import { kolterBayfront } from '@/data/developments/kolter-bayfront';
import { alturaBayshore } from '@/data/developments/altura-bayshore';
import { oneTampa } from '@/data/developments/one-tampa';
import { ritzCarltonTowerII } from '@/data/developments/ritz-carlton-tower-ii';
import { pendryTampa } from '@/data/developments/pendry-tampa';
import { tampaEdition } from '@/data/developments/tampa-edition';
import { hotelOra } from '@/data/developments/hotel-ora';
import { aquaWestshore } from '@/data/developments/aqua-westshore';
import { marinaPointeLuna } from '@/data/developments/marina-pointe-luna';
import { Development } from '@/types/development';
import { DevelopmentProfile } from '@/types/development-profile';
import RealtorBuildingCard from '@/components/ui/RealtorBuildingCard';
import type { RealtorCardData } from '@/components/ui/RealtorBuildingCard';
import {
  fadeUp,
  staggerContainer,
  staggerItem,
  defaultViewport,
} from '@/lib/animations';
import { useAudience } from '@/lib/audience';
import { buildUTMUrl, buildShareUrl } from '@/lib/utm';

// ─── Developments available for the tabbed view ──────────────────────────────
// Add new developments here as they get full data (commission, floor plans, etc.)
const realtorDevelopments: Development[] = [waldorfAstoria, artHouse, residencesAt400CentralDevelopment, fourSeasonsStPete];

const pinellasProfiles: DevelopmentProfile[] = [
  theCade, rocheBobois, reflection, viceroyClearwater, coreyLandings, lakeHouse,
  kolter3rdAve, kolterBayfront
];

const hillsboroughProfiles: DevelopmentProfile[] = [
  alturaBayshore, oneTampa, ritzCarltonTowerII, pendryTampa,
  tampaEdition, hotelOra, aquaWestshore, marinaPointeLuna
];

// ─── Policy Icons ────────────────────────────────────────────────────────────
function PolicyIcon({ icon }: { icon: string }) {
  if (icon === 'paw' || icon === '🐾')
    return (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V3.25a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904M14.25 9h2.25M5.904 18.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 0 1-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 9.953 4.167 9.5 5 9.5h1.053c.472 0 .745.556.5.96a8.958 8.958 0 0 0-1.302 4.665c0 1.194.232 2.333.654 3.375Z" />
      </svg>
    );
  if (icon === 'key' || icon === '🔑')
    return (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 0 1 3 3m3 0a6 6 0 0 1-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1 1 21.75 8.25Z" />
      </svg>
    );
  if (icon === 'car' || icon === '🅿️')
    return (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
      </svg>
    );
  // deposit / money icon fallback
  return (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
    </svg>
  );
}

// ─── Commission Section ──────────────────────────────────────────────────────
function CommissionSection({ dev }: { dev: Development }) {
  const commission = dev.brokerCommission;
  if (!commission) return null;

  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={defaultViewport}
    >
      <div className="bg-white border border-ivory-300 rounded-sm overflow-hidden">
        <div className="bg-charcoal-950 px-6 py-4 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-heading font-bold text-ivory-50">
              {dev.fullName}
            </h3>
            <p className="text-xs font-body text-ivory-400 mt-0.5">
              {dev.location} &bull; {dev.specifications.totalResidences} Residences
            </p>
          </div>
          <div className="flex items-center gap-3">
            <ShareButton
              url={buildShareUrl(dev.slug, 'realtor-resources')}
              title={`${dev.fullName} — Commission & Pricing`}
              description={`Commission structure, floor plans, and pricing for ${dev.fullName} in ${dev.location}.`}
              variant="icon"
            />
            <Badge label={dev.statusLabel ?? dev.status} variant="gold" />
          </div>
        </div>

        <div className="p-6 md:p-8">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-ivory-100 border border-ivory-200 rounded-sm p-5">
              <div className="flex items-start justify-between">
                <p className="text-xs font-body font-semibold text-gold-500 uppercase tracking-widest mb-2">
                  Co-Op Commission
                </p>
                <CopyButton
                  text={`${dev.fullName}: ${commission.coOpPercent}% co-op commission`}
                  label={`Copy ${dev.name} commission`}
                />
              </div>
              <p className="text-2xl font-heading font-bold text-charcoal-900 mb-1">
                {commission.coOpPercent}%
              </p>
              <p className="text-xs font-body text-charcoal-500">
                Paid by {commission.paidBy} to cooperating broker.
              </p>
            </div>

            <div className="bg-ivory-100 border border-ivory-200 rounded-sm p-5">
              <p className="text-xs font-body font-semibold text-gold-500 uppercase tracking-widest mb-2">
                When Paid
              </p>
              <p className="text-2xl font-heading font-bold text-charcoal-900 mb-1">
                {commission.payoutSchedule.map((p) => `${p.percent}%`).join(' / ')}
              </p>
              <p className="text-xs font-body text-charcoal-500">
                {commission.payoutSchedule.map((p) => `${p.percent}% ${p.label.toLowerCase()}`).join('. ')}.
              </p>
            </div>

            <div className="bg-ivory-100 border border-ivory-200 rounded-sm p-5">
              <p className="text-xs font-body font-semibold text-gold-500 uppercase tracking-widest mb-2">
                Bonuses &amp; Incentives
              </p>
              <p className="text-2xl font-heading font-bold text-charcoal-900 mb-1">
                {commission.bonusProgram || 'Contact Sales Office'}
              </p>
              <p className="text-xs font-body text-charcoal-500">
                {commission.bonusContact || 'Contact the sales team directly for any active broker bonuses or incentives.'}
              </p>
            </div>
          </div>

          {commission.additionalNotes && commission.additionalNotes.length > 0 && (
            <div className="mt-5 p-4 bg-gold-500/5 border border-gold-500/20 rounded-sm">
              {commission.additionalNotes.map((note) => (
                <p key={note} className="text-xs font-body text-charcoal-600 leading-relaxed">
                  <span className="font-semibold text-gold-600">Note:</span> {note}
                </p>
              ))}
            </div>
          )}

          {/* ─── Commission Motivation Calculator ────────────────────── */}
          {dev.pricePoints && dev.pricePoints.length > 0 && (
            <div className="mt-8 border-t border-ivory-200 pt-8">
              <h4 className="text-sm font-body font-semibold uppercase tracking-widest text-gold-600 mb-2">
                What This Means for Your Business
              </h4>
              <p className="text-xs font-body text-charcoal-500 mb-5">
                Estimated co-op commissions based on {commission.coOpPercent}% of starting list prices. Actual
                commission amounts depend on final negotiated sale price.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {dev.pricePoints.map((tier) => {
                  const commissionDollars = tier.startingPrice * (commission.coOpPercent / 100);
                  const fmt = (n: number) =>
                    '$' + n.toLocaleString('en-US', { maximumFractionDigits: 0 });
                  return (
                    <div
                      key={tier.label}
                      className="rounded-lg border border-charcoal-100 bg-charcoal-950 p-5"
                    >
                      <p className="text-xs font-body font-semibold text-charcoal-400 uppercase tracking-wider mb-1">
                        {tier.label}
                      </p>
                      <p className="text-xs font-body text-charcoal-500 mb-3">
                        From {fmt(tier.startingPrice)}
                      </p>
                      <p className="text-2xl font-heading font-bold text-gold-500 mb-3">
                        {fmt(commissionDollars)}
                      </p>
                      <div className="space-y-1.5">
                        {commission.payoutSchedule.map((p) => {
                          const payoutAmount = commissionDollars * (p.percent / 100);
                          return (
                            <div
                              key={p.label}
                              className="flex items-center justify-between text-xs font-body"
                            >
                              <span className="text-charcoal-400">
                                {p.percent}% — {p.label}
                              </span>
                              <span className="font-semibold text-ivory-200">
                                {fmt(payoutAmount)}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>

              <p className="mt-4 text-xs font-body text-charcoal-400 leading-relaxed">
                Commission estimates are for illustrative purposes only and assume the starting list price as the sale price.
                Verify all commission terms directly with the developer&apos;s sales team before representing buyers.
                Terms, percentages, and payout schedules are subject to change.
              </p>
            </div>
          )}

          <div className="mt-6 flex flex-wrap items-center gap-4">
            <Button variant="primary" href={buildUTMUrl('/contact', { source: 'realtor-resources', medium: 'direct', campaign: 'broker-preview', content: dev.slug })}>
              Schedule Broker Preview
            </Button>
            {dev.salesTeam && (
              <div className="text-sm font-body text-charcoal-500">
                <span className="font-semibold text-charcoal-700">Sales Office:</span>{' '}
                {dev.salesTeam.firm}{dev.salesTeam.leadAgent ? ` \u2022 ${dev.salesTeam.leadAgent}` : ''}
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Helpers: compute PSF ranges per residence type from the pricing ledger ──
function getPsfByResidence(dev: Development) {
  const units = dev.pricingLadder?.units;
  if (!units || units.length === 0) return new Map<string, { min: number; max: number; priceMin: number; priceMax: number }>();

  const map = new Map<string, { min: number; max: number; priceMin: number; priceMax: number }>();
  for (const u of units) {
    const existing = map.get(u.residenceType);
    if (existing) {
      existing.min = Math.min(existing.min, u.currentPsfLiving);
      existing.max = Math.max(existing.max, u.currentPsfLiving);
      existing.priceMin = Math.min(existing.priceMin, u.currentPrice);
      existing.priceMax = Math.max(existing.priceMax, u.currentPrice);
    } else {
      map.set(u.residenceType, {
        min: u.currentPsfLiving,
        max: u.currentPsfLiving,
        priceMin: u.currentPrice,
        priceMax: u.currentPrice,
      });
    }
  }
  return map;
}

function formatPsfRange(range: { min: number; max: number } | undefined) {
  if (!range) return '—';
  const minStr = `$${Math.round(range.min).toLocaleString()}`;
  const maxStr = `$${Math.round(range.max).toLocaleString()}`;
  return range.min === range.max ? minStr : `${minStr}–${maxStr}`;
}

function formatPriceRange(range: { priceMin: number; priceMax: number } | undefined) {
  if (!range) return '—';
  const fmt = (n: number) => n >= 1000000 ? `$${(n / 1000000).toFixed(n % 100000 === 0 ? 1 : 2)}M` : `$${n.toLocaleString()}`;
  return range.priceMin === range.priceMax ? fmt(range.priceMin) : `${fmt(range.priceMin)}–${fmt(range.priceMax)}`;
}

// ─── Floor Plan Table ────────────────────────────────────────────────────────
function FloorPlanSection({ dev }: { dev: Development }) {
  const floorPlans = dev.specifications.floorPlanSpecs;
  if (!floorPlans || floorPlans.length === 0) return null;

  const psfMap = getPsfByResidence(dev);
  const hasPsf = psfMap.size > 0;

  return (
    <>
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={defaultViewport}
        className="overflow-x-auto"
      >
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-charcoal-950">
              <th className="px-4 py-3 text-xs font-body font-semibold text-gold-500 uppercase tracking-widest">Residence</th>
              <th className="px-4 py-3 text-xs font-body font-semibold text-gold-500 uppercase tracking-widest">Floors</th>
              <th className="px-4 py-3 text-xs font-body font-semibold text-gold-500 uppercase tracking-widest text-right">Bed / Bath</th>
              <th className="px-4 py-3 text-xs font-body font-semibold text-gold-500 uppercase tracking-widest text-right">Living SF</th>
              <th className="px-4 py-3 text-xs font-body font-semibold text-gold-500 uppercase tracking-widest text-right">Terrace SF</th>
              <th className="px-4 py-3 text-xs font-body font-semibold text-gold-500 uppercase tracking-widest text-right">Total SF</th>
              {hasPsf && (
                <>
                  <th className="px-4 py-3 text-xs font-body font-semibold text-gold-500 uppercase tracking-widest text-right">$/SF Range</th>
                  <th className="px-4 py-3 text-xs font-body font-semibold text-gold-500 uppercase tracking-widest text-right">Price Range</th>
                </>
              )}
            </tr>
          </thead>
          <tbody>
            {floorPlans.map((fp, i) => {
              const psfData = psfMap.get(fp.residenceType);
              return (
                <tr
                  key={fp.residenceType}
                  className={i % 2 === 0 ? 'bg-white border-b border-ivory-200' : 'bg-ivory-50 border-b border-ivory-200'}
                >
                  <td className="px-4 py-3 text-sm font-body font-semibold text-charcoal-900">{fp.residenceType}</td>
                  <td className="px-4 py-3 text-sm font-body text-charcoal-600">{fp.levels}</td>
                  <td className="px-4 py-3 text-sm font-body text-charcoal-600 text-right">{fp.bedrooms}BR / {fp.bathrooms}BA</td>
                  <td className="px-4 py-3 text-sm font-body text-charcoal-600 text-right tabular-nums">{fp.livingSF.toLocaleString()}</td>
                  <td className="px-4 py-3 text-sm font-body text-charcoal-600 text-right tabular-nums">{fp.terraceSF.toLocaleString()}</td>
                  <td className="px-4 py-3 text-sm font-body font-semibold text-charcoal-900 text-right tabular-nums">{fp.totalSF.toLocaleString()}</td>
                  {hasPsf && (
                    <>
                      <td className="px-4 py-3 text-sm font-body font-semibold text-gold-700 text-right tabular-nums">
                        {formatPsfRange(psfData)}
                      </td>
                      <td className="px-4 py-3 text-sm font-body text-charcoal-700 text-right tabular-nums">
                        {formatPriceRange(psfData)}
                      </td>
                    </>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      </motion.div>

      {/* Overall PSF stats when pricing ladder exists */}
      {dev.pricingLadder && (
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          <div className="bg-charcoal-800 rounded-sm p-4 text-center">
            <p className="text-xs font-body text-ivory-400 uppercase tracking-widest mb-1">Avg $/SF</p>
            <p className="text-xl font-heading font-bold text-gold-500 tabular-nums">
              ${Math.round(dev.pricingLadder.averagePsfLiving).toLocaleString()}
            </p>
          </div>
          <div className="bg-charcoal-800 rounded-sm p-4 text-center">
            <p className="text-xs font-body text-ivory-400 uppercase tracking-widest mb-1">$/SF Range</p>
            <p className="text-xl font-heading font-bold text-ivory-50 tabular-nums">
              ${Math.round(dev.pricingLadder.psfRange.min).toLocaleString()}–${Math.round(dev.pricingLadder.psfRange.max).toLocaleString()}
            </p>
          </div>
          <div className="bg-charcoal-800 rounded-sm p-4 text-center">
            <p className="text-xs font-body text-ivory-400 uppercase tracking-widest mb-1">Price Range</p>
            <p className="text-xl font-heading font-bold text-ivory-50 tabular-nums">
              ${(dev.pricingLadder.priceRange.min / 1000000).toFixed(1)}M–${(dev.pricingLadder.priceRange.max / 1000000).toFixed(1)}M
            </p>
          </div>
          <div className="bg-charcoal-800 rounded-sm p-4 text-center">
            <p className="text-xs font-body text-ivory-400 uppercase tracking-widest mb-1">Units Tracked</p>
            <p className="text-xl font-heading font-bold text-ivory-50 tabular-nums">
              {dev.pricingLadder.totalTrackedUnits}
            </p>
          </div>
        </motion.div>
      )}

      <motion.p
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={defaultViewport}
        className="mt-4 text-xs font-body text-charcoal-400"
      >
        Source: Developer disclosures{dev.pricingLadder ? ` and pricing data as of ${dev.pricingLadder.lastUpdated}` : ''}. Square footages are approximate and subject to change.{hasPsf ? ' $/SF is based on living (interior) square footage.' : ''}
      </motion.p>
    </>
  );
}

// ─── Floor Premium Analysis ─────────────────────────────────────────────────
function FloorPremiumSection({ dev }: { dev: Development }) {
  const premiums = dev.pricingLadder?.floorPremiums;
  if (!premiums || premiums.length === 0) return null;

  return (
    <>
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={defaultViewport}
        className="overflow-x-auto"
      >
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-charcoal-950">
              <th className="px-4 py-3 text-xs font-body font-semibold text-gold-500 uppercase tracking-widest">Residence</th>
              <th className="px-4 py-3 text-xs font-body font-semibold text-gold-500 uppercase tracking-widest text-right">Avg Premium / Floor</th>
              <th className="px-4 py-3 text-xs font-body font-semibold text-gold-500 uppercase tracking-widest text-right">Sample Range</th>
              <th className="px-4 py-3 text-xs font-body font-semibold text-gold-500 uppercase tracking-widest">Floor Band Breakdown</th>
            </tr>
          </thead>
          <tbody>
            {premiums.map((fp, i) => (
              <tr
                key={fp.residenceType}
                className={i % 2 === 0 ? 'bg-white border-b border-ivory-200' : 'bg-ivory-50 border-b border-ivory-200'}
              >
                <td className="px-4 py-3 text-sm font-body font-semibold text-charcoal-900">
                  {fp.residenceType}
                </td>
                <td className="px-4 py-3 text-sm font-body font-semibold text-gold-700 text-right tabular-nums">
                  ${fp.basePricePerFloor.toLocaleString()}
                </td>
                <td className="px-4 py-3 text-sm font-body text-charcoal-600 text-right tabular-nums">
                  FL {fp.sampleRange.lowFloor}–{fp.sampleRange.highFloor}
                </td>
                <td className="px-4 py-3">
                  <div className="flex flex-wrap gap-2">
                    {fp.premiumPerFloor.map((band) => (
                      <span
                        key={`${band.fromFloor}-${band.toFloor}`}
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-ivory-100 border border-ivory-200 rounded text-xs font-body text-charcoal-600 tabular-nums"
                      >
                        <span className="font-semibold text-charcoal-800">FL {band.fromFloor}–{band.toFloor}:</span>
                        <span className="text-gold-700 font-semibold">${band.perFloor.toLocaleString()}</span>/floor
                      </span>
                    ))}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </motion.div>

      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={defaultViewport}
        className="mt-6 p-4 bg-gold-500/5 border border-gold-500/20 rounded-sm"
      >
        <p className="text-xs font-body text-charcoal-600 leading-relaxed">
          <span className="font-semibold text-gold-600">How to read this:</span> Floor premiums show the
          approximate price increase per floor for each residence type. For example, if Residence 03 shows
          $50,000/floor between floors 31–35, moving up 4 floors adds ~$200,000 to the unit price. These are
          derived from the developer pricing ladder and may vary by unit availability.
        </p>
      </motion.div>

      <motion.p
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={defaultViewport}
        className="mt-4 text-xs font-body text-charcoal-400"
      >
        Source: Computed from developer pricing data as of {dev.pricingLadder?.lastUpdated}. Premiums are approximate and reflect sampled floor-to-floor price deltas.
      </motion.p>
    </>
  );
}

// ─── Documents / Downloads Section ───────────────────────────────────────────
function DocumentsSection({ dev }: { dev: Development }) {
  const docs = dev.documents;
  const deposit = dev.financing?.preConstruction;

  // Build download items dynamically from available data
  const downloadItems: { title: string; desc: string; href?: string; action: string }[] = [];

  // Google Drive folder link (primary)
  if (docs?.driveFolderUrl) {
    downloadItems.push({
      title: 'Developer Materials Folder',
      desc: 'Floor plans, renderings, brochure, and all available developer materials in one place.',
      href: docs.driveFolderUrl,
      action: 'Open Drive Folder',
    });
  }

  // Purchase agreement
  if (docs?.purchaseAgreementUrl && !docs.purchaseAgreementUrl.startsWith('/docs/')) {
    downloadItems.push({
      title: 'Purchase Agreement',
      desc: 'Review the purchase agreement for this development.',
      href: docs.purchaseAgreementUrl,
      action: 'View Document',
    });
  }

  // Condo docs
  if (docs?.condoDocsUrl && !docs.condoDocsUrl.startsWith('/docs/')) {
    downloadItems.push({
      title: 'Condo Documents',
      desc: 'Condominium documents, declarations, and disclosures.',
      href: docs.condoDocsUrl,
      action: 'View Document',
    });
  }

  // Always add generic request items
  downloadItems.push(
    {
      title: 'Digital Brochure',
      desc: 'Full developer brochure with renderings, amenity details, and project overview.',
      action: 'Request Brochure',
    },
    {
      title: 'Price Sheet',
      desc: 'Current availability and pricing by residence type and floor level.',
      action: 'Request Price Sheet',
    },
  );

  if (deposit) {
    downloadItems.push({
      title: 'Deposit Schedule',
      desc: `${deposit.depositPercent}% deposit at contract, ${deposit.balancePercent}% balance at closing (${deposit.closingPhase}). Full breakdown available.`,
      action: 'Request Details',
    });
  }

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={defaultViewport}
      className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      {downloadItems.map((item) => (
        <motion.div
          key={item.title}
          variants={staggerItem}
          className="bg-white border border-ivory-300 rounded-sm p-6 hover:shadow-md transition-shadow flex flex-col"
        >
          <div className="flex items-start gap-3 mb-3">
            <svg
              className="w-5 h-5 text-gold-500 shrink-0 mt-0.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              {item.href ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m9.86-2.54a4.5 4.5 0 0 0-1.242-7.244l-4.5-4.5a4.5 4.5 0 0 0-6.364 6.364L5.25 9.879"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
                />
              )}
            </svg>
            <h4 className="text-base font-heading font-bold text-charcoal-900">
              {item.title}
            </h4>
          </div>
          <p className="text-sm font-body text-charcoal-500 leading-relaxed mb-4 flex-1">
            {item.desc}
          </p>
          {item.href ? (
            <a
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 border border-ivory-300 rounded-sm text-sm font-body font-medium text-charcoal-700 hover:border-gold-500/40 hover:text-charcoal-900 transition-all"
            >
              {item.action}
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
              </svg>
            </a>
          ) : (
            <Button variant="outline" size="sm" href={buildUTMUrl('/contact', { source: 'realtor-resources', medium: 'direct', campaign: 'material-request', content: item.title.toLowerCase().replace(/\s+/g, '-') })}>
              {item.action}
            </Button>
          )}
        </motion.div>
      ))}
    </motion.div>
  );
}

// ─── Financing Section ───────────────────────────────────────────────────────
function FinancingSection({ dev }: { dev: Development }) {
  const deposit = dev.financing?.preConstruction;
  const jumboParams = dev.financing?.jumboLoanParams;
  const lenders = dev.financing?.lenders ?? [];
  if (!deposit) return null;

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={defaultViewport}
      className="grid md:grid-cols-2 gap-8"
    >
      {/* Deposit Structure */}
      <motion.div
        variants={staggerItem}
        className="bg-charcoal-800 border border-charcoal-700 rounded-sm p-6 md:p-8"
      >
        <h3 className="text-xl font-heading font-bold text-ivory-50 mb-6">
          Deposit Structure
        </h3>
        <div className="space-y-4">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-sm bg-gold-500/10 border border-gold-500/30 flex items-center justify-center shrink-0">
              <span className="text-lg font-heading font-bold text-gold-500">
                {deposit.depositPercent}%
              </span>
            </div>
            <div>
              <p className="text-sm font-body font-semibold text-ivory-50">Deposit at Contract</p>
              <p className="text-xs font-body text-ivory-400 mt-0.5">Due upon execution of purchase agreement</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-sm bg-charcoal-700 border border-charcoal-600 flex items-center justify-center shrink-0">
              <span className="text-lg font-heading font-bold text-ivory-300">
                {deposit.balancePercent}%
              </span>
            </div>
            <div>
              <p className="text-sm font-body font-semibold text-ivory-50">Balance at Closing</p>
              <p className="text-xs font-body text-ivory-400 mt-0.5">
                Due at closing &mdash; estimated {deposit.closingPhase}
              </p>
            </div>
          </div>
        </div>
        <p className="mt-6 text-xs font-body text-ivory-500 leading-relaxed">
          {deposit.preApprovalStrategy}
        </p>
      </motion.div>

      {/* Jumbo Loan Parameters */}
      {jumboParams && (
        <motion.div
          variants={staggerItem}
          className="bg-charcoal-800 border border-charcoal-700 rounded-sm p-6 md:p-8"
        >
          <h3 className="text-xl font-heading font-bold text-ivory-50 mb-6">
            Jumbo Loan Parameters
          </h3>
          <div className="space-y-4">
            {[
              { label: 'Minimum Down Payment', value: jumboParams.minDownPayment },
              { label: 'Credit Score Minimum', value: jumboParams.creditScoreMin },
              { label: 'Debt-to-Income Ratio', value: jumboParams.dtiRatio },
              { label: 'Cash Reserves', value: jumboParams.cashReserves },
            ].map((param) => (
              <div key={param.label} className="flex items-center justify-between py-2 border-b border-charcoal-700 last:border-0">
                <span className="text-sm font-body text-ivory-400">{param.label}</span>
                <span className="text-sm font-body font-semibold text-ivory-50">{param.value}</span>
              </div>
            ))}
          </div>

          {lenders.length > 0 && (
            <>
              <h4 className="text-xs font-body font-semibold text-gold-500 uppercase tracking-widest mt-6 mb-3">
                Preferred Lenders
              </h4>
              <ul className="space-y-2">
                {lenders.map((lender) => (
                  <li key={lender.name} className="flex items-start gap-2">
                    <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-gold-500 shrink-0" />
                    <div>
                      <span className="text-sm font-body font-semibold text-ivory-200">{lender.name}</span>
                      <span className="text-xs font-body text-ivory-500 ml-2">{lender.specialty}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </>
          )}

          {dev.financing?.advisory && (
            <p className="mt-6 text-xs font-body text-ivory-500 leading-relaxed">
              {dev.financing.advisory}
            </p>
          )}
        </motion.div>
      )}
    </motion.div>
  );
}

// ─── Policies Section ────────────────────────────────────────────────────────
function PoliciesSection({ dev }: { dev: Development }) {
  const policies = dev.residencePolicies;
  if (!policies || policies.length === 0) return null;

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={defaultViewport}
      className="grid md:grid-cols-3 gap-6"
    >
      {policies.map((policy) => (
        <motion.div
          key={policy.category}
          variants={staggerItem}
          className="bg-white border border-ivory-300 rounded-sm p-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-sm bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-gold-500">
              <PolicyIcon icon={policy.icon} />
            </div>
            <div>
              <p className="text-xs font-body text-charcoal-500 uppercase tracking-widest">{policy.category}</p>
              <p className="text-base font-heading font-bold text-charcoal-900">{policy.headline}</p>
            </div>
          </div>
          <ul className="space-y-2">
            {policy.details.map((detail) => (
              <li key={detail} className="flex items-start gap-2">
                <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-gold-500 shrink-0" />
                <span className="text-sm font-body text-charcoal-600">{detail}</span>
              </li>
            ))}
          </ul>
          {policy.advisory && (
            <div className="mt-4 p-3 bg-gold-500/5 border border-gold-500/20 rounded-sm">
              <p className="text-xs font-body text-charcoal-600 leading-relaxed">
                <span className="font-semibold text-gold-600">Advisor Note:</span> {policy.advisory}
              </p>
            </div>
          )}
        </motion.div>
      ))}
    </motion.div>
  );
}

// ─── Sales Velocity Dashboard ────────────────────────────────────────────────
function SalesVelocitySection({ dev }: { dev: Development }) {
  const sm = dev.salesMetrics;
  if (!sm || sm.totalUnits === 0) return null;

  const hasMonthlySales = sm.monthlySales && sm.monthlySales.length > 0;
  // Find the max unitsSold for scaling the mini bar chart
  const maxUnits = hasMonthlySales
    ? Math.max(...sm.monthlySales!.map((m) => m.unitsSold), 1)
    : 1;

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={defaultViewport}
    >
      {/* KPI Strip */}
      <motion.div variants={staggerItem} className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Total Units', value: sm.totalUnits.toLocaleString() },
          { label: 'Sold / Under Contract', value: sm.soldUnits > 0 ? sm.soldUnits.toLocaleString() : '—' },
          { label: 'Sold %', value: sm.soldPercentage > 0 ? `${sm.soldPercentage}%` : '—', highlight: true },
          { label: 'Velocity', value: sm.velocity !== '—' ? sm.velocity : '—' },
        ].map((kpi) => (
          <div
            key={kpi.label}
            className="bg-charcoal-800 border border-charcoal-700 rounded-sm p-4 text-center"
          >
            <p className="text-xs font-body text-ivory-400 uppercase tracking-widest mb-1">
              {kpi.label}
            </p>
            <p
              className={`text-xl font-heading font-bold tabular-nums ${
                kpi.highlight ? 'text-gold-500' : 'text-ivory-50'
              }`}
            >
              {kpi.value}
            </p>
          </div>
        ))}
      </motion.div>

      {/* Secondary Metrics */}
      <motion.div variants={staggerItem} className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Contract Value', value: sm.contractValue !== '—' ? sm.contractValue : undefined },
          { label: 'Launch Date', value: sm.launchDate !== '—' ? sm.launchDate : undefined },
          { label: 'Peak Month', value: sm.peakMonth.month !== '—' ? `${sm.peakMonth.month} (${sm.peakMonth.units} units)` : undefined },
          { label: 'Sellout Estimate', value: sm.selloutEstimate !== '—' ? sm.selloutEstimate : undefined },
        ]
          .filter((m) => m.value)
          .map((m) => (
            <div
              key={m.label}
              className="bg-ivory-100 border border-ivory-200 rounded-sm p-4 text-center"
            >
              <p className="text-xs font-body font-semibold text-gold-500 uppercase tracking-widest mb-1">
                {m.label}
              </p>
              <p className="text-base font-heading font-bold text-charcoal-900 tabular-nums">
                {m.value}
              </p>
            </div>
          ))}
      </motion.div>

      {/* Mini Bar Chart (only when monthlySales data exists) */}
      {hasMonthlySales && (
        <motion.div variants={staggerItem}>
          <h4 className="text-xs font-body font-semibold text-charcoal-500 uppercase tracking-widest mb-4">
            Monthly Absorption
          </h4>
          <div className="bg-white border border-ivory-300 rounded-sm p-6">
            <div className="flex items-end gap-1.5 h-32">
              {sm.monthlySales!.map((m) => {
                const heightPct = Math.max((m.unitsSold / maxUnits) * 100, 4);
                return (
                  <div key={m.month} className="flex-1 flex flex-col items-center gap-1">
                    <span className="text-[10px] font-body font-semibold text-charcoal-700 tabular-nums">
                      {m.unitsSold > 0 ? m.unitsSold : ''}
                    </span>
                    <div
                      className={`w-full rounded-t-sm transition-all ${
                        m.unitsSold === 0
                          ? 'bg-ivory-200'
                          : 'bg-gradient-to-t from-gold-600 to-gold-400'
                      }`}
                      style={{ height: `${heightPct}%` }}
                    />
                    <span className="text-[9px] font-body text-charcoal-400 whitespace-nowrap">
                      {m.month}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Cumulative line underneath */}
            <div className="mt-4 pt-3 border-t border-ivory-200 flex items-center justify-between">
              <span className="text-xs font-body text-charcoal-400">Cumulative:</span>
              <div className="flex gap-3">
                {sm.monthlySales!
                  .filter((_, i) => i === 0 || i === Math.floor(sm.monthlySales!.length / 2) || i === sm.monthlySales!.length - 1)
                  .map((m) => (
                    <span key={m.month} className="text-xs font-body font-semibold text-charcoal-600 tabular-nums">
                      {m.month}: {m.cumulative} ({m.cumulativePercent}%)
                    </span>
                  ))}
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* No monthly data disclaimer */}
      {!hasMonthlySales && sm.soldPercentage > 0 && (
        <motion.div variants={staggerItem} className="p-4 bg-gold-500/5 border border-gold-500/20 rounded-sm">
          <p className="text-xs font-body text-charcoal-600 leading-relaxed">
            <span className="font-semibold text-gold-600">Note:</span> Detailed monthly sales velocity data
            is pending developer disclosure. Summary metrics are based on available public records and developer reports.
          </p>
        </motion.div>
      )}
    </motion.div>
  );
}

// ─── Competitive Landscape ───────────────────────────────────────────────────
function CompetitiveLandscapeSection({ dev }: { dev: Development }) {
  const comps = dev.competitors;
  if (!comps || comps.length === 0) return null;

  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={defaultViewport}
      className="overflow-x-auto"
    >
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-charcoal-950">
            <th className="px-4 py-3 text-xs font-body font-semibold text-gold-500 uppercase tracking-widest">Project</th>
            <th className="px-4 py-3 text-xs font-body font-semibold text-gold-500 uppercase tracking-widest text-right">Height</th>
            <th className="px-4 py-3 text-xs font-body font-semibold text-gold-500 uppercase tracking-widest text-right">Units</th>
            <th className="px-4 py-3 text-xs font-body font-semibold text-gold-500 uppercase tracking-widest text-right">Avg $/SF</th>
            <th className="px-4 py-3 text-xs font-body font-semibold text-gold-500 uppercase tracking-widest text-right">Delivery</th>
            <th className="px-4 py-3 text-xs font-body font-semibold text-gold-500 uppercase tracking-widest">Status</th>
          </tr>
        </thead>
        <tbody>
          {comps.map((comp, i) => (
            <tr
              key={comp.name}
              className={`border-b border-ivory-200 ${
                comp.isFeatured
                  ? 'bg-gold-500/5 border-l-2 border-l-gold-500'
                  : i % 2 === 0
                  ? 'bg-white'
                  : 'bg-ivory-50'
              }`}
            >
              <td className="px-4 py-3 text-sm font-body text-charcoal-900">
                <span className={comp.isFeatured ? 'font-bold' : 'font-medium'}>
                  {comp.name}
                </span>
                {comp.isFeatured && (
                  <span className="ml-2 inline-flex items-center px-1.5 py-0.5 bg-gold-500/10 border border-gold-500/30 rounded text-[10px] text-gold-600 font-semibold uppercase tracking-wider">
                    Subject
                  </span>
                )}
              </td>
              <td className="px-4 py-3 text-sm font-body text-charcoal-600 text-right tabular-nums">{comp.height}</td>
              <td className="px-4 py-3 text-sm font-body text-charcoal-600 text-right tabular-nums">{comp.units.toLocaleString()}</td>
              <td className="px-4 py-3 text-sm font-body font-semibold text-charcoal-700 text-right tabular-nums">{comp.avgPsf}</td>
              <td className="px-4 py-3 text-sm font-body text-charcoal-600 text-right">{comp.delivery}</td>
              <td className="px-4 py-3">
                <span className={`inline-flex items-center px-2.5 py-1 rounded-sm text-xs font-body font-semibold ${
                  comp.status.toLowerCase().includes('sold')
                    ? 'bg-green-50 text-green-700 border border-green-200'
                    : comp.status.toLowerCase().includes('resale') || comp.status.toLowerCase().includes('delivered')
                    ? 'bg-charcoal-100 text-charcoal-600 border border-charcoal-200'
                    : 'bg-gold-500/10 text-gold-700 border border-gold-500/30'
                }`}>
                  {comp.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="mt-4 text-xs font-body text-charcoal-400">
        Source: Developer disclosures, MLS records, and public filings. $/SF figures may reflect list, asking, or closed pricing depending on project status.
      </p>
    </motion.div>
  );
}

// ─── Market Position / Key Stats ─────────────────────────────────────────────
function MarketPositionSection({ dev }: { dev: Development }) {
  const evidence = dev.marketEvidence;
  if (!evidence || evidence.length === 0) return null;

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={defaultViewport}
      className="grid md:grid-cols-2 gap-6"
    >
      {evidence.map((item) => (
        <motion.div
          key={item.metric}
          variants={staggerItem}
          className="bg-white border border-ivory-300 rounded-sm p-6 hover:shadow-md transition-shadow"
        >
          <div className="flex items-start gap-4">
            <div className="shrink-0 w-14 h-14 rounded-sm bg-charcoal-950 flex items-center justify-center">
              <span className="text-sm font-heading font-bold text-gold-500 leading-tight text-center px-1">
                {item.value.length <= 6 ? item.value : item.value.split('/')[0]}
              </span>
            </div>
            <div className="min-w-0">
              <p className="text-xs font-body font-semibold text-gold-500 uppercase tracking-widest mb-1">
                {item.metric}
              </p>
              {item.value.length > 6 && (
                <p className="text-lg font-heading font-bold text-charcoal-900 mb-1 tabular-nums">
                  {item.value}
                </p>
              )}
              <p className="text-sm font-body text-charcoal-500 leading-relaxed">
                {item.description}
              </p>
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}

// ─── HOA Estimator ───────────────────────────────────────────────────────────
function HoaEstimatorSection({ dev }: { dev: Development }) {
  const hoaRate = dev.hoaPerSqFt;
  const floorPlans = dev.specifications.floorPlanSpecs;
  if (!hoaRate || !floorPlans || floorPlans.length === 0) return null;

  // Deduplicate by residenceType (some have multiple segments)
  const seen = new Set<string>();
  const uniquePlans = floorPlans.filter((fp) => {
    if (seen.has(fp.residenceType)) return false;
    seen.add(fp.residenceType);
    return true;
  });

  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={defaultViewport}
    >
      {/* Rate callout */}
      <div className="flex items-center gap-4 mb-6">
        <div className="w-16 h-16 rounded-sm bg-charcoal-950 flex items-center justify-center">
          <span className="text-lg font-heading font-bold text-gold-500">
            ${hoaRate.toFixed(2)}
          </span>
        </div>
        <div>
          <p className="text-base font-heading font-bold text-charcoal-900">Per SF / Month</p>
          <p className="text-sm font-body text-charcoal-500">
            Applied to interior living square footage per developer/HOA estimates.
          </p>
        </div>
      </div>

      {/* Estimate table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-charcoal-950">
              <th className="px-4 py-3 text-xs font-body font-semibold text-gold-500 uppercase tracking-widest">
                Residence
              </th>
              <th className="px-4 py-3 text-xs font-body font-semibold text-gold-500 uppercase tracking-widest text-right">
                Bed / Bath
              </th>
              <th className="px-4 py-3 text-xs font-body font-semibold text-gold-500 uppercase tracking-widest text-right">
                Living SF
              </th>
              <th className="px-4 py-3 text-xs font-body font-semibold text-gold-500 uppercase tracking-widest text-right">
                Est. Monthly HOA
              </th>
              <th className="px-4 py-3 text-xs font-body font-semibold text-gold-500 uppercase tracking-widest text-right">
                Est. Annual HOA
              </th>
            </tr>
          </thead>
          <tbody>
            {uniquePlans.map((fp, i) => {
              const monthly = Math.round(fp.livingSF * hoaRate);
              const annual = monthly * 12;
              return (
                <tr
                  key={fp.residenceType}
                  className={
                    i % 2 === 0
                      ? 'bg-white border-b border-ivory-200'
                      : 'bg-ivory-50 border-b border-ivory-200'
                  }
                >
                  <td className="px-4 py-3 text-sm font-body font-semibold text-charcoal-900">
                    {fp.residenceType}
                  </td>
                  <td className="px-4 py-3 text-sm font-body text-charcoal-600 text-right">
                    {fp.bedrooms}BR / {fp.bathrooms}BA
                  </td>
                  <td className="px-4 py-3 text-sm font-body text-charcoal-600 text-right tabular-nums">
                    {fp.livingSF.toLocaleString()}
                  </td>
                  <td className="px-4 py-3 text-sm font-body font-semibold text-gold-700 text-right tabular-nums">
                    ${monthly.toLocaleString()}
                  </td>
                  <td className="px-4 py-3 text-sm font-body text-charcoal-700 text-right tabular-nums">
                    ${annual.toLocaleString()}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="mt-4 p-4 bg-gold-500/5 border border-gold-500/20 rounded-sm">
        <p className="text-xs font-body text-charcoal-600 leading-relaxed">
          <span className="font-semibold text-gold-600">Important:</span> HOA estimates are based on
          ${hoaRate.toFixed(2)}/SF/month applied to living (interior) square footage. Actual assessments
          may differ from projections. These are pre-construction estimates — verify with the
          developer&apos;s budget disclosures before quoting to buyers. Annual special assessments are
          not included.
        </p>
      </div>
    </motion.div>
  );
}

// ─── Elevator Pitch / Talking Points ─────────────────────────────────────────
function ElevatorPitchSection({ dev }: { dev: Development }) {
  const summary = dev.executiveSummary;
  if (!summary) return null;

  const points = [
    { label: 'Overview', text: summary.overview },
    { label: 'Market Significance', text: summary.marketSignificance },
    { label: 'Sales Performance', text: summary.salesPerformance },
  ];

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={defaultViewport}
      className="space-y-6"
    >
      {points.map((pt) => (
        <motion.div
          key={pt.label}
          variants={staggerItem}
          className="bg-white border border-ivory-300 rounded-sm p-6"
        >
          <div className="flex items-start gap-4">
            <div className="shrink-0 mt-0.5">
              <div className="w-10 h-10 rounded-sm bg-charcoal-950 flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-gold-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  {pt.label === 'Overview' ? (
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
                  ) : pt.label === 'Market Significance' ? (
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
                  )}
                </svg>
              </div>
            </div>
            <div className="min-w-0">
              <p className="text-xs font-body font-semibold text-gold-500 uppercase tracking-widest mb-2">
                {pt.label}
              </p>
              <p className="text-sm font-body text-charcoal-600 leading-relaxed">
                {pt.text}
              </p>
            </div>
          </div>
        </motion.div>
      ))}

      <motion.div variants={staggerItem} className="p-4 bg-charcoal-950 rounded-sm">
        <p className="text-xs font-body text-ivory-400 leading-relaxed">
          <span className="font-semibold text-gold-500">Pro Tip:</span> Use these talking points during
          buyer consultations or open house presentations. Each section is sourced from developer
          disclosures, MLS data, and public records — no marketing fluff.
        </p>
      </motion.div>
    </motion.div>
  );
}

// ─── Buyer Registration Requirements ─────────────────────────────────────────
function RegistrationSection({ dev }: { dev: Development }) {
  const commission = dev.brokerCommission;
  if (!commission?.registrationRequired) return null;

  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={defaultViewport}
    >
      <div className="bg-gradient-to-br from-red-50 to-ivory-50 border-2 border-red-200 rounded-sm overflow-hidden">
        <div className="bg-red-600 px-6 py-3 flex items-center gap-3">
          <svg
            className="w-5 h-5 text-white shrink-0"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
            />
          </svg>
          <span className="text-sm font-body font-bold text-white uppercase tracking-wider">
            Registration Required
          </span>
        </div>
        <div className="p-6 md:p-8">
          <h3 className="text-lg font-heading font-bold text-charcoal-900 mb-3">
            {dev.name} — Buyer Registration Policy
          </h3>
          <p className="text-sm font-body text-charcoal-700 leading-relaxed mb-4">
            {commission.registrationNotes || 'Buyer registration with the sales office is required for commission eligibility.'}
          </p>
          <div className="grid sm:grid-cols-3 gap-4 mb-6">
            <div className="bg-white border border-ivory-300 rounded-sm p-4 text-center">
              <p className="text-xs font-body text-charcoal-500 uppercase tracking-widest mb-1">
                Co-Op Commission
              </p>
              <p className="text-xl font-heading font-bold text-charcoal-900">
                {commission.coOpPercent}%
              </p>
            </div>
            <div className="bg-white border border-ivory-300 rounded-sm p-4 text-center">
              <p className="text-xs font-body text-charcoal-500 uppercase tracking-widest mb-1">
                Registration
              </p>
              <p className="text-xl font-heading font-bold text-red-600">
                Required
              </p>
            </div>
            <div className="bg-white border border-ivory-300 rounded-sm p-4 text-center">
              <p className="text-xs font-body text-charcoal-500 uppercase tracking-widest mb-1">
                Payout
              </p>
              <p className="text-xl font-heading font-bold text-charcoal-900">
                {commission.payoutSchedule.map((p) => `${p.percent}%`).join(' / ')}
              </p>
            </div>
          </div>
          <div className="p-4 bg-red-50 border border-red-200 rounded-sm">
            <p className="text-xs font-body text-red-800 leading-relaxed">
              <span className="font-bold">Action Required:</span> Register your buyer with the sales
              office before or during the first site visit. Failure to register may result in
              forfeiture of the cooperating broker commission. Contact the sales team to confirm
              current registration requirements.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Development Tab Content ─────────────────────────────────────────────────
function DevelopmentTab({ dev }: { dev: Development }) {
  const hasCommission = !!dev.brokerCommission;
  const hasFloorPlans = (dev.specifications.floorPlanSpecs?.length ?? 0) > 0;
  const hasFloorPremiums = (dev.pricingLadder?.floorPremiums?.length ?? 0) > 0;
  const hasFinancing = !!dev.financing;
  const hasPolicies = dev.residencePolicies.length > 0;
  const hasSalesMetrics = !!dev.salesMetrics && dev.salesMetrics.totalUnits > 0;
  const hasCompetitors = (dev.competitors?.length ?? 0) > 0;
  const hasMarketEvidence = (dev.marketEvidence?.length ?? 0) > 0;
  const hasHoa = typeof dev.hoaPerSqFt === 'number' && dev.hoaPerSqFt > 0 && hasFloorPlans;
  const hasElevatorPitch = !!dev.executiveSummary;
  const hasRegistration = !!dev.brokerCommission?.registrationRequired;

  return (
    <div>
      {/* Registration Alert — top of tab for visibility */}
      {hasRegistration && (
        <section className="py-8 bg-red-50 border-b-2 border-red-200">
          <div className="container-luxury">
            <RegistrationSection dev={dev} />
          </div>
        </section>
      )}

      {/* Elevator Pitch / Talking Points */}
      {hasElevatorPitch && (
        <section className="section-padding bg-ivory-50">
          <div className="container-luxury">
            <SectionIntro
              eyebrow="Talking Points"
              title={`${dev.name} — Elevator Pitch`}
              subtitle="Key narratives for buyer conversations. Data-backed, no marketing fluff."
            />
            <ElevatorPitchSection dev={dev} />
          </div>
        </section>
      )}

      {/* Sales Velocity Dashboard */}
      {hasSalesMetrics && (
        <section className="section-padding bg-charcoal-950">
          <div className="container-luxury">
            <SectionIntro
              eyebrow="Sales Velocity"
              title={`${dev.name} — Absorption & Velocity`}
              subtitle="Real-time sales data: units sold, absorption rate, and monthly velocity trends."
              variant="dark"
            />
            <SalesVelocitySection dev={dev} />
          </div>
        </section>
      )}

      {/* Commission */}
      {hasCommission && (
        <section className="section-padding bg-ivory-50">
          <div className="container-luxury">
            <SectionIntro
              eyebrow="Commissions"
              title={`${dev.name} — Commission Structure`}
              subtitle="Co-op commission, payment timing, and broker incentives. Contact the sales team directly for the most current terms."
            />
            <CommissionSection dev={dev} />
          </div>
        </section>
      )}

      {/* Floor Plans + PSF */}
      {hasFloorPlans && (
        <section className="section-padding bg-ivory-100 border-t border-ivory-300">
          <div className="container-luxury">
            <SectionIntro
              eyebrow="Floor Plans"
              title={`${dev.name} — Residence Specs & Pricing`}
              subtitle={dev.pricingLadder
                ? `All specs from developer disclosures. Price-per-SF ranges computed from ${dev.pricingLadder.totalTrackedUnits} tracked units across the pricing ladder.`
                : 'All specs are from developer disclosures and subject to change.'
              }
            />
            <FloorPlanSection dev={dev} />
          </div>
        </section>
      )}

      {/* Floor Premium Analysis */}
      {hasFloorPremiums && (
        <section className="section-padding bg-ivory-50 border-t border-ivory-300">
          <div className="container-luxury">
            <SectionIntro
              eyebrow="Floor Premiums"
              title={`${dev.name} — Price Escalation by Floor`}
              subtitle="How much more does each floor cost? Floor premiums show the dollar amount added per floor for each residence type — critical for advising buyers on floor selection."
            />
            <FloorPremiumSection dev={dev} />
          </div>
        </section>
      )}

      {/* HOA Estimator */}
      {hasHoa && (
        <section className="section-padding bg-ivory-100 border-t border-ivory-300">
          <div className="container-luxury">
            <SectionIntro
              eyebrow="HOA Estimates"
              title={`${dev.name} — Monthly HOA by Floor Plan`}
              subtitle="Estimated monthly and annual HOA dues per residence type. Essential for buyer qualification and carrying-cost conversations."
            />
            <HoaEstimatorSection dev={dev} />
          </div>
        </section>
      )}

      {/* Documents / Downloads */}
      <section className="section-padding bg-ivory-50 border-t border-ivory-300">
        <div className="container-luxury">
          <SectionIntro
            eyebrow="Downloads"
            title={`${dev.name} — Developer Materials`}
            subtitle="Brochures, floor plans, and price sheets. Contact us or the sales team directly to request materials."
          />
          <DocumentsSection dev={dev} />
        </div>
      </section>

      {/* Financing */}
      {hasFinancing && (
        <section className="section-padding bg-charcoal-950">
          <div className="container-luxury">
            <SectionIntro
              eyebrow="Financing"
              title={`${dev.name} — Deposit & Financing`}
              subtitle="Pre-construction deposit structure and jumbo loan parameters."
              variant="dark"
            />
            <FinancingSection dev={dev} />
          </div>
        </section>
      )}

      {/* Competitive Landscape */}
      {hasCompetitors && (
        <section className="section-padding bg-ivory-50 border-t border-ivory-300">
          <div className="container-luxury">
            <SectionIntro
              eyebrow="Competitive Set"
              title={`${dev.name} — Competitive Landscape`}
              subtitle="How this development compares to its direct competitors on height, unit count, and price-per-square-foot."
            />
            <CompetitiveLandscapeSection dev={dev} />
          </div>
        </section>
      )}

      {/* Market Position / Key Stats */}
      {hasMarketEvidence && (
        <section className="section-padding bg-charcoal-950">
          <div className="container-luxury">
            <SectionIntro
              eyebrow="Market Position"
              title={`${dev.name} — Key Market Data`}
              subtitle="The numbers that define this development's position in the market."
              variant="dark"
            />
            <MarketPositionSection dev={dev} />
          </div>
        </section>
      )}

      {/* Policies */}
      {hasPolicies && (
        <section className="section-padding bg-ivory-50 border-t border-ivory-300">
          <div className="container-luxury">
            <SectionIntro
              eyebrow="Policies"
              title={`${dev.name} — Residence Policies`}
              subtitle="Key policy details that impact buyer decisions. These are the questions your buyers will ask."
            />
            <PoliciesSection dev={dev} />
          </div>
        </section>
      )}
    </div>
  );
}

// ─── Section Intro Helper ────────────────────────────────────────────────────
function SectionIntro({
  eyebrow,
  title,
  subtitle,
  variant = 'light',
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
  variant?: 'light' | 'dark';
}) {
  const isDark = variant === 'dark';
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={defaultViewport}
      className="max-w-3xl mb-12"
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="h-px w-8 bg-gold-500" />
        <span className="text-gold-500 text-xs font-body font-semibold uppercase tracking-[0.2em]">
          {eyebrow}
        </span>
      </div>
      <h2 className={`text-3xl md:text-4xl font-heading font-bold mb-4 ${isDark ? 'text-ivory-50' : 'text-charcoal-900'}`}>
        {title}
      </h2>
      <p className={`text-base font-body leading-relaxed ${isDark ? 'text-ivory-400' : 'text-charcoal-500'}`}>
        {subtitle}
      </p>
    </motion.div>
  );
}

// ─── Profile Resource Card (for DevelopmentProfile-type buildings) ───────────
function ProfileResourceCard({ profile }: { profile: DevelopmentProfile }) {
  return (
    <div className="bg-white rounded-xl border border-ivory-200 shadow-sm overflow-hidden">
      {/* Header with name + status badge */}
      <div className="p-6 border-b border-ivory-200">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-xl font-heading font-bold text-charcoal-900">{profile.name}</h3>
          <div className="flex items-center gap-2">
            <Badge label={profile.status} variant={profile.status === 'delivered' ? 'success' : profile.status === 'pre-sales' ? 'gold' : 'outline'} />
            <ShareButton
              url={buildShareUrl(profile.slug, 'realtor-resources')}
              title={`${profile.name} — Realtor Resources`}
              variant="icon"
            />
          </div>
        </div>
        <p className="text-sm text-charcoal-500 font-body">{profile.address}, {profile.city}</p>
      </div>

      {/* Key Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-ivory-200">
        {[
          { label: 'Units', value: profile.totalUnits?.toString() || 'TBD' },
          { label: 'Stories', value: profile.stories?.toString() || 'TBD' },
          { label: 'Price', value: profile.price || 'TBD' },
          { label: 'Delivery', value: profile.deliveryDate || 'TBD' },
        ].map((stat) => (
          <div key={stat.label} className="bg-white p-4 text-center">
            <p className="text-xs font-body text-charcoal-400 uppercase tracking-wider">{stat.label}</p>
            <p className="text-sm font-body font-semibold text-charcoal-900 mt-1">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* PSF + HOA Metrics Row */}
      {(profile.pricingHistory?.currentPsf || profile.hoaPerSqFt) && (
        <div className="grid grid-cols-2 gap-px bg-ivory-200">
          {profile.pricingHistory?.currentPsf ? (
            <div className="bg-white p-4 text-center">
              <p className="text-xs font-body text-gold-600 uppercase tracking-wider font-semibold">Avg PSF</p>
              <p className="text-lg font-body font-bold text-gold-600 mt-1">${profile.pricingHistory.currentPsf.toLocaleString()}</p>
            </div>
          ) : (
            <div className="bg-white p-4 text-center">
              <p className="text-xs font-body text-charcoal-400 uppercase tracking-wider">Avg PSF</p>
              <p className="text-sm font-body text-charcoal-400 mt-1">TBD</p>
            </div>
          )}
          {profile.hoaPerSqFt ? (
            <div className="bg-white p-4 text-center">
              <p className="text-xs font-body text-charcoal-400 uppercase tracking-wider">HOA</p>
              <p className="text-lg font-body font-bold text-charcoal-900 mt-1">${profile.hoaPerSqFt}/SF</p>
            </div>
          ) : (
            <div className="bg-white p-4 text-center">
              <p className="text-xs font-body text-charcoal-400 uppercase tracking-wider">HOA</p>
              <p className="text-sm font-body text-charcoal-400 mt-1">TBD</p>
            </div>
          )}
        </div>
      )}

      {/* Details */}
      <div className="p-6 space-y-4">
        {/* Developer + Architect */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-xs font-body text-charcoal-400 uppercase tracking-wider">Developer</p>
            <p className="text-sm font-body font-semibold text-charcoal-900">{profile.developer || 'TBD'}</p>
          </div>
          <div>
            <p className="text-xs font-body text-charcoal-400 uppercase tracking-wider">Architect</p>
            <p className="text-sm font-body font-semibold text-charcoal-900">{profile.architect || 'TBD'}</p>
          </div>
        </div>

        {/* Rental Policy if available */}
        {profile.rentalPolicy && (
          <div className="bg-ivory-50 rounded-lg p-3 border border-ivory-200">
            <p className="text-xs font-body text-charcoal-400 uppercase tracking-wider">Rental Policy</p>
            <p className="text-sm font-body text-charcoal-700">{profile.rentalPolicy}</p>
          </div>
        )}

        {/* Broker Commission if available */}
        {profile.brokerCommission && (
          <div className="bg-gold-50 rounded-lg p-3 border border-gold-200">
            <p className="text-xs font-body text-gold-700 uppercase tracking-wider">Co-Op Commission</p>
            <p className="text-lg font-body font-bold text-charcoal-900">{profile.brokerCommission}</p>
          </div>
        )}

        {/* Amenities (top 6) */}
        {profile.amenities && profile.amenities.length > 0 && (
          <div>
            <p className="text-xs font-body text-charcoal-400 uppercase tracking-wider mb-2">Key Amenities</p>
            <div className="flex flex-wrap gap-1.5">
              {profile.amenities.slice(0, 6).map((amenity) => (
                <span key={amenity} className="text-xs bg-ivory-100 text-charcoal-600 px-2 py-1 rounded-full font-body">
                  {amenity}
                </span>
              ))}
              {profile.amenities.length > 6 && (
                <span className="text-xs text-charcoal-400 px-2 py-1 font-body">+{profile.amenities.length - 6} more</span>
              )}
            </div>
          </div>
        )}

        {/* Contact Actions */}
        <div className="flex flex-wrap gap-2 pt-2">
          {profile.phone && (
            <a
              href={`tel:${profile.phone}`}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-charcoal-900 text-ivory-50 text-xs font-body font-semibold rounded-md hover:bg-charcoal-800 transition-colors"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
              </svg>
              {profile.phone}
            </a>
          )}
          {profile.website && (
            <a
              href={profile.website}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-ivory-100 text-charcoal-700 text-xs font-body font-semibold rounded-md border border-ivory-200 hover:bg-ivory-200 transition-colors"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
              </svg>
              Website
            </a>
          )}
          {profile.documents?.driveFolderUrl && (
            <a href={profile.documents.driveFolderUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-ivory-100 text-charcoal-700 text-xs font-body font-semibold rounded-md border border-ivory-200 hover:bg-ivory-200 transition-colors">
              Google Drive
            </a>
          )}
        </div>

        {/* Social Media Icons */}
        {profile.socialMedia && (
          <div className="flex items-center gap-3 pt-1">
            <span className="text-xs font-body text-charcoal-400 uppercase tracking-wider">Social:</span>
            {profile.socialMedia.instagram && (
              <a href={profile.socialMedia.instagram} target="_blank" rel="noopener noreferrer" className="text-charcoal-400 hover:text-gold-500 transition-colors" aria-label="Instagram">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/></svg>
              </a>
            )}
            {profile.socialMedia.facebook && (
              <a href={profile.socialMedia.facebook} target="_blank" rel="noopener noreferrer" className="text-charcoal-400 hover:text-gold-500 transition-colors" aria-label="Facebook">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
            )}
            {profile.socialMedia.linkedin && (
              <a href={profile.socialMedia.linkedin} target="_blank" rel="noopener noreferrer" className="text-charcoal-400 hover:text-gold-500 transition-colors" aria-label="LinkedIn">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              </a>
            )}
            {profile.socialMedia.youtube && (
              <a href={profile.socialMedia.youtube} target="_blank" rel="noopener noreferrer" className="text-charcoal-400 hover:text-gold-500 transition-colors" aria-label="YouTube">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814z"/><polygon fill="#fff" points="9.545,15.568 15.818,12 9.545,8.432"/></svg>
              </a>
            )}
          </div>
        )}

        {/* Status-specific CTA */}
        {profile.status === 'reservation' ? (
          <a
            href={buildUTMUrl('/contact', { source: 'realtor-resources', medium: 'profile-card', campaign: profile.slug, content: 'reservation-list' })}
            className="block w-full text-center py-2.5 bg-gold-500 text-charcoal-900 text-sm font-body font-semibold rounded-lg hover:bg-gold-400 transition-colors"
          >
            Join Reservation List
          </a>
        ) : (
          <a href={`/developments/${profile.slug}`} className="block w-full text-center py-2.5 bg-charcoal-900 text-ivory-50 text-sm font-body font-semibold rounded-lg hover:bg-charcoal-800 transition-colors">
            View Full Profile →
          </a>
        )}
      </div>
    </div>
  );
}

// ─── Normalize Development → RealtorCardData ───────────────────────────────
function developmentToCard(dev: Development): RealtorCardData {
  const rentalPolicy = dev.residencePolicies?.find(
    (p) => p.category === 'Rental Policy',
  )?.headline ?? '';

  return {
    slug: dev.slug,
    name: dev.name,
    address: dev.address ?? dev.location,
    city: dev.location.includes(',')
      ? dev.location.split(',').pop()?.trim().replace(/\d{5}(-\d{4})?$/, '').trim() ?? ''
      : '',
    county: (dev.county ?? 'pinellas') as 'pinellas' | 'hillsborough' | 'sarasota',
    status: dev.status,
    statusLabel: dev.statusLabel ?? dev.status,
    currentPsf: dev.specifications.pricePerSqFt.average,
    soldPercent: dev.salesMetrics.soldPercentage,
    hoaPerSqFt: dev.hoaPerSqFt ?? 0,
    totalUnits: dev.salesMetrics.totalUnits || dev.specifications.totalResidences,
    deliveryDate: dev.deliveryDate ?? 'TBD',
    commission: dev.brokerCommission ? `${dev.brokerCommission.coOpPercent}% co-op` : '',
    commissionPayout: COMMISSION_PAYOUT[dev.slug] ?? 'At closing',
    topListingPrice: BEST_PRICED_LISTING[dev.slug] ?? 0,
    salesTeam: dev.salesTeam?.firm ?? '',
    salesPhone: dev.phone ?? '',
    developer: dev.developer ?? '',
    architect: dev.architect ?? '',
    rentalPolicy,
    website: dev.website ?? '',
    phone: dev.phone ?? '',
    instagram: dev.socialMedia?.instagram ?? '',
    facebook: dev.socialMedia?.facebook ?? '',
    hasPage: true,
  };
}

// ─── Sold Percent lookup for profiles without pcpaoSummary ─────────────────
const PROFILE_SOLD_PERCENT: Record<string, number> = {
  'the-cade': 53.3,
  'roche-bobois': 0,
  'viceroy-clearwater': 0,
  'corey-landings': 0,
  'lake-house': 0,
  'four-seasons-stpete': 0,
  'altura-bayshore': 90,
  'one-tampa': 0,
  'ritz-carlton-tower-ii': 65,
  'pendry-tampa': 0,
  'tampa-edition': 100,
  'hotel-ora': 0,
  'aqua-westshore': 0,
  'marina-pointe-luna': 0,
};

// ─── Best Priced Listing (entry-level — most likely sale for a realtor) ─────
// The listing a realtor will actually close. Entry price per building.
// Source: MLS active listings or developer price sheets as of April 2026
const BEST_PRICED_LISTING: Record<string, number> = {
  // Pinellas — Full Developments
  'waldorf-astoria': 2600000,     // 2BR entry — $2.6M
  'art-house': 350000,            // Studio/1BR resale entry — ~$350K
  '400-central': 775000,          // 2BR entry resale — ~$775K
  'four-seasons-stpete': 0,       // Shadow inventory — TBD
  // Pinellas — Profiles
  'the-cade': 1917800,            // 3BR entry — $1,917,800
  'roche-bobois': 544500,         // Studio entry — $544,500
  'reflection': 899000,           // 1BR entry — $899,000
  'viceroy-clearwater': 1995000,  // 2BR entry — $1,995,000
  'corey-landings': 0,            // TBD — pricing not released
  'lake-house': 800000,           // 1BR entry — ~$800K
  'kolter-3rd-ave': 0,            // Shadow inventory
  'kolter-bayfront': 0,           // Shadow inventory (SALTAIRE II)
  // Hillsborough
  'altura-bayshore': 1749000,     // 2BR entry — $1,749,000
  'one-tampa': 958000,            // 1BR entry — $958,000
  'ritz-carlton-tower-ii': 1890000, // 2BR entry — $1,890,000
  'pendry-tampa': 1875000,        // 1BR entry — $1,875,000
  'tampa-edition': 2990000,       // Active resale entry — $2,990,000
  'hotel-ora': 870616,            // Studio entry — $870,616
  'aqua-westshore': 1870000,      // 2BR entry — $1,870,000
  'marina-pointe-luna': 1199000,  // 1BR entry — $1,199,000
};

// ─── Commission Payout Schedule ─────────────────────────────────────────────
// Standard in Tampa Bay new construction: paid at closing
const COMMISSION_PAYOUT: Record<string, string> = {
  'waldorf-astoria': 'At closing',
  'art-house': 'At closing',
  '400-central': 'At closing',
  'four-seasons-stpete': 'TBD',
  'the-cade': 'At closing',
  'roche-bobois': 'At closing',
  'reflection': 'At closing',
  'viceroy-clearwater': 'At closing',
  'corey-landings': 'At closing',
  'lake-house': 'TBD',
  'kolter-3rd-ave': 'TBD',
  'kolter-bayfront': 'TBD',
  'altura-bayshore': 'At closing',
  'one-tampa': 'At closing',
  'ritz-carlton-tower-ii': 'At closing',
  'pendry-tampa': 'At closing',
  'tampa-edition': 'At closing',
  'hotel-ora': 'At closing',
  'aqua-westshore': 'At closing',
  'marina-pointe-luna': 'At closing',
};

// ─── Normalize DevelopmentProfile → RealtorCardData ─────────────────────────
function profileToCard(profile: DevelopmentProfile): RealtorCardData {
  return {
    slug: profile.slug,
    name: profile.name,
    address: profile.address ?? profile.location,
    city: profile.city ?? '',
    county: profile.county,
    status: profile.status,
    statusLabel: profile.statusLabel ?? profile.status,
    currentPsf: profile.pricingHistory?.currentPsf ?? 0,
    soldPercent: profile.pcpaoSummary?.sellThrough ?? PROFILE_SOLD_PERCENT[profile.slug] ?? 0,
    hoaPerSqFt: profile.hoaPerSqFt ?? 0,
    totalUnits: profile.totalUnits ?? 0,
    deliveryDate: profile.deliveryDate ?? 'TBD',
    commission: profile.brokerCommission ?? '',
    commissionPayout: COMMISSION_PAYOUT[profile.slug] ?? 'At closing',
    topListingPrice: BEST_PRICED_LISTING[profile.slug] ?? 0,
    salesTeam: profile.salesTeam?.[0]?.name ?? '',
    salesPhone: profile.phone ?? '',
    developer: profile.developer ?? '',
    architect: profile.architect ?? '',
    rentalPolicy: profile.rentalPolicy ?? '',
    website: profile.website ?? '',
    phone: profile.phone ?? '',
    instagram: profile.socialMedia?.instagram ?? '',
    facebook: profile.socialMedia?.facebook ?? '',
    hasPage: true,
  };
}

// ─── Build unified card array from all buildings ────────────────────────────
// Import Sarasota from trackedDevelopments since they're inline stubs
import { trackedDevelopments } from '@/data/developments';

const sarasotaCards: RealtorCardData[] = trackedDevelopments
  .filter((d) => d.county === 'sarasota')
  .map((d) => ({
    slug: d.slug,
    name: d.name,
    address: d.address ?? d.location,
    city: d.location?.split(',')[0] ?? '',
    county: d.county as 'pinellas' | 'hillsborough' | 'sarasota',
    status: d.status,
    statusLabel: d.statusLabel ?? d.status,
    currentPsf: d.resalePsf ?? d.developerClosePsf ?? d.avgPsf ?? 0,
    soldPercent: d.soldPercent ?? 0,
    hoaPerSqFt: d.hoaPerSqFt ?? 0,
    totalUnits: d.units ?? 0,
    deliveryDate: d.delivery ?? 'TBD',
    commission: '3% co-op',
    commissionPayout: 'At closing',
    topListingPrice: 0,
    salesTeam: d.salesTeamName ?? '',
    salesPhone: '',
    developer: d.developer ?? '',
    architect: '',
    rentalPolicy: '',
    website: '',
    phone: '',
    instagram: '',
    facebook: '',
    hasPage: d.hasPage,
  }));

const allBuildingCards: RealtorCardData[] = [
  // 4 full developments
  ...realtorDevelopments.map(developmentToCard),
  // 8 Pinellas profiles
  ...pinellasProfiles.map(profileToCard),
  // 8 Hillsborough profiles
  ...hillsboroughProfiles.map(profileToCard),
  // 11 Sarasota stubs
  ...sarasotaCards,
];

// ─── Main Page Component ─────────────────────────────────────────────────────
export default function RealtorResourcesContent() {
  const { ctaLabel } = useAudience();
  const [countyFilter, setCountyFilter] = useState<'all' | 'pinellas' | 'hillsborough' | 'sarasota'>('all');

  // Separate active from shadow/sold-out
  const activeCards = allBuildingCards.filter((c) => c.status !== 'shadow-inventory' && c.status !== 'sold-out');
  const shadowCards = allBuildingCards.filter((c) => c.status === 'shadow-inventory');
  const soldOutCards = allBuildingCards.filter((c) => c.status === 'sold-out');

  const filteredActive = countyFilter === 'all'
    ? activeCards
    : activeCards.filter((c) => c.county === countyFilter);
  const filteredShadow = countyFilter === 'all'
    ? shadowCards
    : shadowCards.filter((c) => c.county === countyFilter);
  const filteredSoldOut = countyFilter === 'all'
    ? soldOutCards
    : soldOutCards.filter((c) => c.county === countyFilter);

  const pinellasCount = activeCards.filter((c) => c.county === 'pinellas').length;
  const hillsboroughCount = activeCards.filter((c) => c.county === 'hillsborough').length;
  const sarasotaCount = activeCards.filter((c) => c.county === 'sarasota').length;

  return (
    <>
      {/* ─── Hero ──────────────────────────────────────────────────────────── */}
      <section className="relative bg-charcoal-950 pt-32 pb-16">
        <div className="absolute inset-0 bg-gradient-to-br from-charcoal-950 via-charcoal-800 to-charcoal-950" />
        <div className="relative container-luxury">
          <motion.div variants={fadeUp} initial="hidden" animate="visible">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-8 bg-gold-500" />
              <span className="text-gold-500 text-xs font-body font-semibold uppercase tracking-[0.25em]">
                Realtor Resources
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-ivory-50 leading-tight mb-4">
              Everything You Need <br />
              <span className="text-gradient-gold">to Sell New Construction</span>
            </h1>
            <p className="text-lg font-body text-ivory-300 leading-relaxed max-w-2xl mb-6">
              Commission structures, deposit schedules, floor plan specs, and
              developer downloads — organized for listing advisors actively
              working Tampa Bay new construction.
            </p>
            <ShareButton
              url={buildUTMUrl('/realtor-resources', { source: 'realtor-resources', medium: 'clipboard', campaign: 'page-share', content: 'hero' })}
              title="Realtor Resources — Tampa Bay New Construction"
              description="Commission structures, deposit schedules, floor plan specs, and developer downloads for Tampa Bay new construction."
              variant="button"
            />
          </motion.div>
        </div>
      </section>

      {/* ─── Buyer Broker Agreement CTA ──────────────────────────────────── */}
      <div className="bg-gold-500/10 border-y border-gold-500/20 py-4">
        <div className="container-luxury flex items-center justify-between">
          <div>
            <p className="text-sm font-heading font-bold text-ivory-50">Buyer Broker Agreement</p>
            <p className="text-xs font-body text-charcoal-400">Required before showing new construction</p>
          </div>
          <a
            href="#"
            className="px-5 py-2.5 bg-gold-500 text-charcoal-900 text-sm font-body font-semibold uppercase tracking-wide rounded-sm hover:bg-gold-400 transition-all"
          >
            Sign Agreement &rarr;
          </a>
        </div>
      </div>

      {/* ─── All Developments — Unified Grid ───────────────────────────────── */}
      <section className="section-padding bg-ivory-50">
        <div className="container-luxury">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={defaultViewport}>
            <div className="flex items-center gap-3 mb-2">
              <div className="h-px w-8 bg-gold-500" />
              <span className="text-gold-500 text-xs font-body font-semibold uppercase tracking-[0.2em]">
                All Developments
              </span>
            </div>
            <h2 className="text-2xl md:text-3xl font-heading font-bold text-charcoal-900 mb-2">
              Development Quick Reference
            </h2>
            <p className="text-sm font-body text-charcoal-500 mb-6">
              Commission, PSF, sales team, and contact info for every tracked new construction development across Tampa Bay.
            </p>
          </motion.div>

          {/* County Filter */}
          <div className="flex flex-wrap items-center gap-2 mb-8">
            {([
              { key: 'all' as const, label: `All (${activeCards.length})` },
              { key: 'pinellas' as const, label: `Pinellas (${pinellasCount})` },
              { key: 'hillsborough' as const, label: `Hillsborough (${hillsboroughCount})` },
              { key: 'sarasota' as const, label: `Sarasota (${sarasotaCount})` },
            ]).map((opt) => (
              <button
                key={opt.key}
                onClick={() => setCountyFilter(opt.key)}
                className={`px-4 py-2 text-sm font-body font-semibold rounded-lg transition-all ${
                  countyFilter === opt.key
                    ? 'bg-charcoal-900 text-ivory-50 shadow-sm'
                    : 'bg-white text-charcoal-600 border border-ivory-200 hover:border-charcoal-300 hover:text-charcoal-900'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>

          {/* Active Pipeline Cards */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={defaultViewport}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredActive.map((card) => (
              <motion.div key={card.slug} variants={staggerItem}>
                <RealtorBuildingCard data={card} />
              </motion.div>
            ))}
          </motion.div>

          {/* Shadow Inventory */}
          {filteredShadow.length > 0 && (
            <div className="mt-16">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-8 w-1 bg-charcoal-400 rounded-full" />
                <h3 className="text-xl font-heading font-bold text-charcoal-900">Shadow Inventory</h3>
                <span className="text-xs font-body text-charcoal-400 bg-charcoal-100 px-2 py-1 rounded-full">{filteredShadow.length} projects</span>
              </div>
              <p className="text-sm font-body text-charcoal-500 mb-6 max-w-xl">
                Not yet announced to market. Join the waitlist to be notified when sales launch.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 opacity-70">
                {filteredShadow.map((card) => (
                  <div key={card.slug}>
                    <RealtorBuildingCard data={card} />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Sold Out / Historical */}
          {filteredSoldOut.length > 0 && (
            <div className="mt-16">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-8 w-1 bg-charcoal-300 rounded-full" />
                <h3 className="text-xl font-heading font-bold text-charcoal-900">Sold Out — Historical</h3>
                <span className="text-xs font-body text-charcoal-400 bg-charcoal-100 px-2 py-1 rounded-full">{filteredSoldOut.length} projects</span>
              </div>
              <p className="text-sm font-body text-charcoal-500 mb-6 max-w-xl">
                Developer sold out. Included for PSF benchmarking and historical performance comparison.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 opacity-60">
                {filteredSoldOut.map((card) => (
                  <div key={card.slug}>
                    <RealtorBuildingCard data={card} />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ─── Commission Quick Reference ──────────────────────────────────── */}
      <section className="section-padding bg-ivory-50">
        <div className="container-luxury">
          <div className="flex items-center gap-3 mb-2">
            <div className="h-px w-8 bg-gold-600" />
            <span className="text-gold-600 text-xs font-body font-semibold uppercase tracking-[0.2em]">
              Commission Intelligence
            </span>
          </div>
          <h2 className="text-2xl md:text-3xl font-heading font-bold text-charcoal-900 mb-6">
            Co-Op Commission Quick Reference
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-sm font-body">
              <thead>
                <tr className="border-b-2 border-charcoal-200">
                  <th className="text-left py-3 px-4 text-charcoal-500 uppercase tracking-wider text-xs">Building</th>
                  <th className="text-left py-3 px-4 text-charcoal-500 uppercase tracking-wider text-xs">County</th>
                  <th className="text-left py-3 px-4 text-charcoal-500 uppercase tracking-wider text-xs">Co-Op %</th>
                  <th className="text-left py-3 px-4 text-charcoal-500 uppercase tracking-wider text-xs">Sales Team</th>
                  <th className="text-left py-3 px-4 text-charcoal-500 uppercase tracking-wider text-xs">Phone</th>
                  <th className="text-left py-3 px-4 text-charcoal-500 uppercase tracking-wider text-xs">Status</th>
                </tr>
              </thead>
              <tbody>
                {allBuildingCards.map((card) => (
                  <tr key={card.slug} className="border-b border-ivory-200 hover:bg-ivory-100 transition-colors">
                    <td className="py-3 px-4 font-semibold text-charcoal-900">{card.name}</td>
                    <td className="py-3 px-4 text-charcoal-600 capitalize">{card.county}</td>
                    <td className="py-3 px-4">
                      {card.commission ? (
                        <span className="text-gold-600 font-bold">{card.commission}</span>
                      ) : (
                        <span className="text-charcoal-400 italic">Contact for details</span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-charcoal-600">{card.salesTeam || 'Contact for details'}</td>
                    <td className="py-3 px-4">
                      {card.phone ? (
                        <a href={`tel:${card.phone}`} className="text-gold-600 hover:text-gold-700 font-semibold">{card.phone}</a>
                      ) : (
                        <span className="text-charcoal-400 italic">TBD</span>
                      )}
                    </td>
                    <td className="py-3 px-4">
                      <Badge
                        label={card.statusLabel}
                        variant={
                          card.status === 'delivered'
                            ? 'success'
                            : card.status === 'pre-sales'
                            ? 'gold'
                            : 'outline'
                        }
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ─── Sales Team Contact ───────────────────────────────────────────── */}
      <section className="section-padding bg-ivory-100 border-t border-ivory-300">
        <div className="container-luxury">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={defaultViewport}
            className="max-w-2xl mx-auto text-center"
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-px w-8 bg-gold-500" />
              <span className="text-gold-500 text-xs font-body font-semibold uppercase tracking-[0.2em]">
                Connect
              </span>
              <div className="h-px w-8 bg-gold-500" />
            </div>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-charcoal-900 mb-4">
              Need Something Specific?
            </h2>
            <p className="text-base font-body text-charcoal-500 leading-relaxed mb-8">
              Request a private briefing, commission details, or a custom
              comparison report. Realtor-to-realtor — no marketing fluff.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
              <Button variant="primary" size="lg" href={buildUTMUrl('/contact', { source: 'realtor-resources', medium: 'direct', campaign: 'cta-primary', content: 'schedule-presentation' })}>
                {ctaLabel}
              </Button>
              <Button variant="outline" size="lg" href={buildUTMUrl('/contact', { source: 'realtor-resources', medium: 'direct', campaign: 'cta-secondary', content: 'request-materials' })}>
                Request Materials
              </Button>
            </div>
            <div className="text-sm font-body text-charcoal-500">
              <p className="font-semibold text-charcoal-700">{author.name}</p>
              <p>{author.title} &bull; {author.firm}</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── Floating Share FAB ──────────────────────────────────────────── */}
      <div className="fixed bottom-6 right-6 z-50">
        <ShareButton
          url={buildUTMUrl('/realtor-resources', { source: 'realtor-resources', medium: 'clipboard', campaign: 'page-share', content: 'fab' })}
          title="Realtor Resources — Tampa Bay New Construction"
          description="Commission structures, deposit schedules, floor plan specs, and developer downloads for Tampa Bay new construction."
          variant="button"
        />
      </div>
    </>
  );
}
