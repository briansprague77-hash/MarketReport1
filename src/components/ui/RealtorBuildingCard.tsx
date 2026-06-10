'use client';

import Badge from '@/components/ui/Badge';
import ShareButton from '@/components/ui/ShareButton';
import { buildShareUrl, buildUTMUrl } from '@/lib/utm';

// ─── Normalized data for all buildings ────────────────────────────────────────
export interface RealtorCardData {
  slug: string;
  name: string;
  address: string;
  city: string;
  county: 'pinellas' | 'hillsborough' | 'sarasota';
  status: string;
  statusLabel: string;
  currentPsf: number;
  soldPercent: number;
  hoaPerSqFt: number;
  totalUnits: number;
  deliveryDate: string;
  commission: string;
  commissionPayout: string;       // When commission is paid (e.g., "At closing", "50% at contract, 50% at closing")
  topListingPrice: number;        // Highest priced active/available unit — for potential commission calc
  salesTeam: string;
  salesPhone: string;
  developer: string;
  architect: string;
  rentalPolicy: string;
  website: string;
  phone: string;
  instagram: string;
  facebook: string;
  hasPage: boolean;
}

function statusBadgeVariant(status: string): 'gold' | 'success' | 'outline' {
  const s = status.toLowerCase();
  if (s.includes('deliver') || s.includes('sold') || s.includes('available')) return 'success';
  if (s.includes('pre-sales') || s.includes('under construction')) return 'gold';
  return 'outline';
}

export default function RealtorBuildingCard({ data }: { data: RealtorCardData }) {
  const fmt = (n: number) => '$' + n.toLocaleString('en-US', { maximumFractionDigits: 0 });

  return (
    <div className="bg-white rounded-xl border border-ivory-200 shadow-sm hover:shadow-md transition-shadow flex flex-col h-full">
      {/* Header */}
      <div className="p-5 pb-3">
        <div className="flex items-start justify-between mb-1">
          <Badge
            label={data.statusLabel || data.status}
            variant={statusBadgeVariant(data.statusLabel || data.status)}
          />
          <ShareButton
            url={buildShareUrl(data.slug, 'realtor-resources')}
            title={`${data.name} — Realtor Quick Sheet`}
            variant="icon"
          />
        </div>
        <h3 className="text-xl font-heading font-bold text-charcoal-900 mt-2">
          {data.name}
        </h3>
        <p className="text-sm font-body text-charcoal-500 mt-0.5">
          {data.address}{data.city ? `, ${data.city}` : ''}
        </p>
      </div>

      {/* 4-metric grid */}
      <div className="grid grid-cols-4 gap-px bg-ivory-200 mx-5 rounded-lg overflow-hidden">
        {[
          { label: '$/SF', value: data.currentPsf > 0 ? fmt(data.currentPsf) : 'TBD', highlight: true },
          { label: '% Sold', value: data.soldPercent > 0 ? `${data.soldPercent}%` : '0%', highlight: false },
          { label: 'HOA/SF', value: data.hoaPerSqFt > 0 ? `$${data.hoaPerSqFt.toFixed(2)}` : 'TBD', highlight: false },
          { label: 'Units', value: data.totalUnits > 0 ? data.totalUnits.toString() : 'TBD', highlight: false },
        ].map((m) => (
          <div key={m.label} className={`p-3 text-center ${m.highlight ? 'bg-gold-50' : 'bg-ivory-50'}`}>
            <p className="text-[10px] font-body text-charcoal-400 uppercase tracking-wider leading-tight">{m.label}</p>
            <p className={`text-sm font-heading font-bold mt-0.5 tabular-nums ${m.highlight && data.currentPsf > 0 ? 'text-gold-700' : 'text-charcoal-900'}`}>
              {m.value}
            </p>
          </div>
        ))}
      </div>

      {/* Details section */}
      <div className="p-5 pt-4 flex-1 flex flex-col">
        {/* Commission highlight */}
        <div className="bg-gold-50 border border-gold-200 rounded-lg p-3 mb-4">
          <div className="flex items-start justify-between mb-2">
            <div>
              <p className="text-[10px] font-body text-gold-700 uppercase tracking-wider font-semibold">Co-Op Commission</p>
              <p className="text-lg font-heading font-bold text-charcoal-900">{data.commission || 'Contact for details'}</p>
            </div>
            {data.commissionPayout && (
              <div className="text-right">
                <p className="text-[10px] font-body text-charcoal-400 uppercase tracking-wider">Payout</p>
                <p className="text-xs font-body font-medium text-charcoal-700">{data.commissionPayout}</p>
              </div>
            )}
          </div>
          {data.topListingPrice > 0 && data.commission && (() => {
            const rateMatch = data.commission.match(/([\d.]+)%/);
            const rate = rateMatch ? parseFloat(rateMatch[1]) / 100 : 0.03;
            const potentialComm = data.topListingPrice * rate;
            return (
              <div className="pt-2 border-t border-gold-200">
                <p className="text-[10px] font-body text-charcoal-500 uppercase tracking-wider">Your Commission — Best Priced Listing</p>
                <div className="flex items-baseline gap-2 mt-0.5">
                  <span className="text-xl font-heading font-bold text-gold-700">
                    ${potentialComm >= 1_000_000
                      ? (potentialComm / 1_000_000).toFixed(2) + 'M'
                      : potentialComm.toLocaleString('en-US', { maximumFractionDigits: 0 })}
                  </span>
                  <span className="text-xs font-body text-charcoal-400">
                    on ${data.topListingPrice >= 1_000_000
                      ? (data.topListingPrice / 1_000_000).toFixed(1).replace(/\.0$/, '') + 'M'
                      : data.topListingPrice.toLocaleString()} listing
                  </span>
                </div>
              </div>
            );
          })()}
        </div>

        {/* Info rows */}
        <div className="space-y-2.5 text-sm font-body flex-1">
          <div className="flex items-start gap-2">
            <span className="text-charcoal-400 shrink-0 w-20 text-xs uppercase tracking-wider pt-0.5">Sales Team</span>
            <span className="text-charcoal-700 font-medium">{data.salesTeam || 'Contact for details'}</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-charcoal-400 shrink-0 w-20 text-xs uppercase tracking-wider pt-0.5">Developer</span>
            <span className="text-charcoal-700 font-medium">{data.developer || 'TBD'}</span>
          </div>
          {data.architect && (
            <div className="flex items-start gap-2">
              <span className="text-charcoal-400 shrink-0 w-20 text-xs uppercase tracking-wider pt-0.5">Architect</span>
              <span className="text-charcoal-700 font-medium">{data.architect}</span>
            </div>
          )}
          <div className="flex items-start gap-2">
            <span className="text-charcoal-400 shrink-0 w-20 text-xs uppercase tracking-wider pt-0.5">Rental</span>
            <span className="text-charcoal-700 font-medium">{data.rentalPolicy || 'Contact for details'}</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-charcoal-400 shrink-0 w-20 text-xs uppercase tracking-wider pt-0.5">Delivery</span>
            <span className="text-charcoal-700 font-medium">{data.deliveryDate || 'TBD'}</span>
          </div>
        </div>

        {/* Contact actions */}
        <div className="flex flex-wrap items-center gap-2 mt-4 pt-3 border-t border-ivory-200">
          {data.phone && (
            <a
              href={`tel:${data.phone}`}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-charcoal-900 text-ivory-50 text-xs font-body font-semibold rounded-md hover:bg-charcoal-800 transition-colors"
              title="Call sales office"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
              </svg>
              Call
            </a>
          )}
          {data.website && (
            <a
              href={data.website}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-ivory-100 text-charcoal-700 text-xs font-body font-semibold rounded-md border border-ivory-200 hover:bg-ivory-200 transition-colors"
              title="Visit website"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
              </svg>
              Web
            </a>
          )}
          {data.instagram && (
            <a
              href={data.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-ivory-100 text-charcoal-700 text-xs font-body font-semibold rounded-md border border-ivory-200 hover:bg-ivory-200 transition-colors"
              title="Instagram"
            >
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
              </svg>
              IG
            </a>
          )}
          {data.facebook && (
            <a
              href={data.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-ivory-100 text-charcoal-700 text-xs font-body font-semibold rounded-md border border-ivory-200 hover:bg-ivory-200 transition-colors"
              title="Facebook"
            >
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
              FB
            </a>
          )}
          <ShareButton
            url={buildShareUrl(data.slug, 'realtor-resources')}
            title={`${data.name} — Realtor Quick Sheet`}
            description={`Commission, PSF, and contact info for ${data.name}.`}
            variant="icon"
          />
        </div>

        {/* View Full Profile CTA */}
        {data.hasPage ? (
          <a
            href={`/developments/${data.slug}`}
            className="block w-full text-center py-2.5 mt-3 bg-charcoal-900 text-ivory-50 text-sm font-body font-semibold rounded-lg hover:bg-charcoal-800 transition-colors"
          >
            View Full Profile &rarr;
          </a>
        ) : (
          <a
            href={buildUTMUrl('/contact', { source: 'realtor-resources', medium: 'building-card', campaign: data.slug, content: 'request-info' })}
            className="block w-full text-center py-2.5 mt-3 bg-gold-500 text-charcoal-900 text-sm font-body font-semibold rounded-lg hover:bg-gold-400 transition-colors"
          >
            Request Info
          </a>
        )}
      </div>
    </div>
  );
}
