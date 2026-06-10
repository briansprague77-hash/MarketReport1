'use client';

import { motion } from 'framer-motion';
import { type DevelopmentSummary, statusBadgeConfig } from '@/data/market';

interface DevelopmentCardProps {
  development: DevelopmentSummary;
}

export default function DevelopmentCard({ development }: DevelopmentCardProps) {
  const statusConfig = statusBadgeConfig[development.status];

  const href = development.hasPage
    ? `/developments/${development.slug}`
    : undefined;

  const Wrapper = href ? 'a' : 'div';

  // Per-bedroom pricing
  const bedroomPrices: { label: string; price: string }[] = [];
  if (development.studioPrice) bedroomPrices.push({ label: 'Studio', price: development.studioPrice });
  if (development.oneBedPrice) bedroomPrices.push({ label: '1BR', price: development.oneBedPrice });
  if (development.twoBedPrice) bedroomPrices.push({ label: '2BR', price: development.twoBedPrice });
  if (development.threeBedPrice) bedroomPrices.push({ label: '3BR', price: development.threeBedPrice });
  if (development.fourBedPlusPrice) bedroomPrices.push({ label: '4BR+', price: development.fourBedPlusPrice });

  const currentPsf = development.resalePsf ?? development.developerClosePsf ?? development.avgPsf;
  const tierTag = development.tags?.find((t) => t.startsWith('Tier'));

  // PSF position relative to market (1800 = max for scale)
  const psfBarWidth = currentPsf && currentPsf > 0 ? Math.min((currentPsf / 1800) * 100, 100) : 0;

  return (
    <Wrapper href={href} className={`group block h-full ${href ? 'cursor-pointer' : ''}`}>
      <motion.div
        className="bg-charcoal-900 border border-charcoal-800 rounded-sm overflow-hidden h-full flex flex-col transition-colors hover:border-charcoal-700"
        whileHover={{ y: -4 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
      >
        {/* Image */}
        <div className="relative h-48 overflow-hidden bg-charcoal-800">
          {development.image ? (
            <motion.img
              src={development.image}
              alt={development.name}
              className="w-full h-full object-cover object-[center_30%]"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-charcoal-900 via-charcoal-850 to-charcoal-950 flex items-center justify-center">
              <p className="font-heading text-sm font-bold text-ivory-100/30">Coming Soon</p>
            </div>
          )}

          {/* Hover overlay */}
          {href && (
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          )}

          {/* No status badge on image — moved to card body for readability */}

          {/* Tier + Type badges — top right */}
          <div className="absolute top-3 right-3 flex flex-col gap-1 items-end">
            {tierTag && (
              <span className="inline-block px-2 py-0.5 rounded-sm text-[10px] font-body font-bold uppercase tracking-wider bg-charcoal-900/90 text-gold-400 border border-gold-500/30 backdrop-blur-sm">
                {tierTag}
              </span>
            )}
            {development.tags?.includes('Hospitality Brand') && (
              <span className="inline-block px-2 py-0.5 rounded-sm text-[10px] font-body font-bold uppercase tracking-wider bg-charcoal-900/90 text-purple-400 border border-purple-500/30 backdrop-blur-sm">
                Hospitality Brand
              </span>
            )}
            {development.tags?.includes('Lifestyle Brand') && (
              <span className="inline-block px-2 py-0.5 rounded-sm text-[10px] font-body font-bold uppercase tracking-wider bg-charcoal-900/90 text-pink-400 border border-pink-500/30 backdrop-blur-sm">
                Lifestyle Brand
              </span>
            )}
          </div>

          {/* View Report hover */}
          {href && (
            <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-300">
              <span className="inline-flex items-center gap-1.5 bg-gold-500 text-charcoal-900 px-3 py-1.5 text-xs font-body font-semibold uppercase tracking-wide rounded-sm">
                View Report
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4 flex flex-col flex-1">
          {/* Status badge — in card body for readability */}
          <div className="mb-2">
            <span
              className="inline-block px-2.5 py-1 rounded-sm text-[11px] font-body font-bold uppercase tracking-wider"
              style={{
                backgroundColor: statusConfig?.bgColor || 'rgba(201,168,76,0.15)',
                color: statusConfig?.color || '#C9A84C',
                border: `1px solid ${statusConfig?.color || '#C9A84C'}30`,
              }}
            >
              {development.statusLabel}
            </span>
          </div>

          {/* Name */}
          <h3 className="text-base font-heading font-bold text-ivory-50 mb-0.5 group-hover:text-gold-500 transition-colors leading-snug">
            {development.name}
          </h3>

          {/* Location */}
          <p className="text-xs font-body text-charcoal-400 mb-2 truncate">{development.location}</p>

          {/* Developer + Sales + Stories — compact 3-col */}
          <div className="grid grid-cols-3 gap-1.5 mb-3 text-[10px] font-body">
            {development.developer && (
              <div>
                <p className="text-charcoal-500 uppercase tracking-wider">Developer</p>
                <p className="text-ivory-200 font-medium truncate">{development.developer}</p>
              </div>
            )}
            {development.salesTeamName && development.salesTeamName !== 'TBD' && (
              <div>
                <p className="text-charcoal-500 uppercase tracking-wider">Sales</p>
                <p className="text-ivory-200 font-medium truncate">{development.salesTeamName}</p>
              </div>
            )}
            {development.stories && development.stories > 0 && (
              <div>
                <p className="text-charcoal-500 uppercase tracking-wider">Stories</p>
                <p className="text-ivory-200 font-medium">{development.stories}</p>
              </div>
            )}
          </div>

          {/* Price + Specs */}
          {development.price && development.price !== 'TBD' && (
            <p className="text-sm font-heading font-bold text-gold-500 mb-0.5">{development.price}</p>
          )}
          {(development.bedrooms || development.sqft) && (
            <p className="text-[11px] font-body text-charcoal-400 mb-2">
              {development.bedrooms}{development.sqft ? ` · ${development.sqft}` : ''}
            </p>
          )}

          {/* Per-Bedroom Prices */}
          {bedroomPrices.length > 0 && (
            <div className="flex flex-wrap gap-x-2.5 gap-y-0.5 mb-3">
              {bedroomPrices.map((bp) => (
                <span key={bp.label} className="text-[11px] font-body">
                  <span className="text-charcoal-500">{bp.label}</span>{' '}
                  <span className="text-ivory-100 font-semibold">{bp.price}</span>
                </span>
              ))}
            </div>
          )}

          {/* Spacer */}
          <div className="flex-1" />

          {/* PSF Bar — visual wow */}
          {currentPsf && currentPsf > 0 && (
            <div className="mb-3">
              <div className="flex items-baseline justify-between mb-1">
                <p className="text-[10px] font-body text-charcoal-500 uppercase tracking-wider">$/SF</p>
                <p className="text-sm font-heading font-bold text-gold-500">${currentPsf.toLocaleString()}</p>
              </div>
              <div className="h-1.5 bg-charcoal-800 rounded-full overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  style={{
                    width: `${psfBarWidth}%`,
                    background: `linear-gradient(90deg, #C9A84C, ${currentPsf > 1300 ? '#F59E0B' : currentPsf > 700 ? '#3B82F6' : '#10B981'})`,
                  }}
                  initial={{ width: 0 }}
                  whileInView={{ width: `${psfBarWidth}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.2 }}
                />
              </div>
            </div>
          )}

          {/* Sold % bar */}
          {development.soldPercent != null && development.soldPercent > 0 && (
            <div className="mb-3">
              <div className="flex items-baseline justify-between mb-1">
                <p className="text-[10px] font-body text-charcoal-500 uppercase tracking-wider">Sold</p>
                <p className="text-sm font-heading font-bold text-gold-500">{development.soldPercent.toFixed(1)}%</p>
              </div>
              <div className="h-1.5 bg-charcoal-800 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-gold-600 to-gold-400 rounded-full"
                  initial={{ width: 0 }}
                  whileInView={{ width: `${Math.min(development.soldPercent, 100)}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.3 }}
                />
              </div>
            </div>
          )}

          {/* Bottom row: Units · Velocity · Delivery · HOA */}
          <div className="flex items-center justify-between pt-2.5 border-t border-charcoal-800 text-[10px] font-body">
            {development.units > 0 && (
              <div>
                <p className="text-charcoal-500 uppercase tracking-wider">Units</p>
                <p className="text-xs font-semibold text-ivory-200">{development.units}</p>
              </div>
            )}
            {development.velocity && development.velocity !== '—' && (
              <div className="text-center">
                <p className="text-charcoal-500 uppercase tracking-wider">Velocity</p>
                <p className="text-xs font-semibold text-gold-400">{development.velocity}</p>
              </div>
            )}
            <div className="text-center">
              <p className="text-charcoal-500 uppercase tracking-wider">Delivery</p>
              <p className="text-xs font-semibold text-ivory-200">{development.delivery}</p>
            </div>
            {development.hoaPerSqFt && development.hoaPerSqFt > 0 && (
              <div className="text-right">
                <p className="text-charcoal-500 uppercase tracking-wider">HOA/SF</p>
                <p className="text-xs font-semibold text-ivory-200">${development.hoaPerSqFt.toFixed(2)}</p>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </Wrapper>
  );
}
