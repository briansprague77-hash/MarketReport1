'use client';

import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { DevelopmentProfile } from '@/types/development-profile';

type PricingHistory = NonNullable<DevelopmentProfile['pricingHistory']>;

interface Props {
  pricingHistory: PricingHistory;
  compact?: boolean;
}

export default function PricingTrendBadge({ pricingHistory, compact = false }: Props) {
  const { launchPsf, currentPsf, priceChangePercent } = pricingHistory;

  const isUp = priceChangePercent !== undefined && priceChangePercent > 0;
  const isDown = priceChangePercent !== undefined && priceChangePercent < 0;
  const isFlat = !isUp && !isDown;

  const trendColor = isUp
    ? 'text-emerald-500'
    : isDown
      ? 'text-red-500'
      : 'text-charcoal-400';

  const trendBg = isUp
    ? 'bg-emerald-500/10 border-emerald-500/20'
    : isDown
      ? 'bg-red-500/10 border-red-500/20'
      : 'bg-charcoal-500/10 border-charcoal-500/20';

  const TrendIcon = isUp ? TrendingUp : isDown ? TrendingDown : Minus;

  if (compact) {
    return (
      <span
        className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-body font-semibold border ${trendBg} ${trendColor}`}
      >
        <TrendIcon className="w-3 h-3" />
        {priceChangePercent !== undefined && priceChangePercent !== 0
          ? `${isUp ? '+' : ''}${priceChangePercent.toFixed(1)}%`
          : '\u2014'}
      </span>
    );
  }

  return (
    <div className={`inline-flex flex-col gap-1 rounded-lg border p-3 ${trendBg}`}>
      {/* Trend badge */}
      <div className={`flex items-center gap-1.5 ${trendColor}`}>
        <TrendIcon className="w-4 h-4" />
        <span className="font-body text-sm font-bold">
          {priceChangePercent !== undefined && priceChangePercent !== 0
            ? `${isUp ? '+' : ''}${priceChangePercent.toFixed(1)}%`
            : 'No Change'}
        </span>
      </div>

      {/* PSF comparison */}
      {launchPsf && currentPsf && (
        <span className="font-body text-[10px] text-charcoal-400">
          Launch: ${launchPsf}/SF → Current: ${currentPsf}/SF
        </span>
      )}
    </div>
  );
}
