'use client';

import { useState } from 'react';

type PressureLevel = 'high' | 'medium' | 'low';

const PRESSURE_CONFIG: Record<PressureLevel, {
  dotColor: string;
  label: string;
  tooltip: string;
  textColor: string;
  bgColor: string;
}> = {
  high: {
    dotColor: 'bg-orange-500',
    label: 'High Inventory',
    tooltip: 'Many units available. Competitive pressure from large supply — buyers have negotiating leverage.',
    textColor: 'text-orange-700',
    bgColor: 'bg-orange-50 border-orange-200',
  },
  medium: {
    dotColor: 'bg-gold-500',
    label: 'Moderate',
    tooltip: 'Balanced inventory. Steady sales pace with reasonable selection remaining.',
    textColor: 'text-gold-700',
    bgColor: 'bg-gold-50 border-gold-200',
  },
  low: {
    dotColor: 'bg-emerald-500',
    label: 'Low Inventory',
    tooltip: 'Limited availability. Scarcity pricing likely — fewer negotiation opportunities for buyers.',
    textColor: 'text-emerald-700',
    bgColor: 'bg-emerald-50 border-emerald-200',
  },
};

interface Props {
  level: PressureLevel;
}

export default function InventoryPressureBadge({ level }: Props) {
  const [showTooltip, setShowTooltip] = useState(false);
  const config = PRESSURE_CONFIG[level];

  return (
    <div
      className="relative inline-flex"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      <span
        className={`inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[10px] font-body font-semibold border ${config.bgColor} ${config.textColor}`}
      >
        <span className={`w-1.5 h-1.5 rounded-full ${config.dotColor}`} />
        {config.label}
      </span>

      {/* Tooltip */}
      {showTooltip && (
        <div className="absolute z-50 bottom-full left-1/2 -translate-x-1/2 mb-2 w-52 rounded-lg bg-charcoal-900 text-ivory-100 text-[10px] font-body p-2.5 shadow-lg leading-relaxed pointer-events-none">
          {config.tooltip}
          <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-charcoal-900" />
        </div>
      )}
    </div>
  );
}
