'use client';

import { useState } from 'react';
import { Clock, TrendingDown, DollarSign, Layers, UserX, AlertTriangle } from 'lucide-react';

type RiskFlag =
  | 'construction-delay'
  | 'slow-sales'
  | 'high-price-positioning'
  | 'competitive-supply-pressure'
  | 'developer-change'
  | 'permitting-risk';

const FLAG_CONFIG: Record<RiskFlag, {
  icon: React.ElementType;
  label: string;
  tooltip: string;
  color: string;
  bg: string;
  border: string;
}> = {
  'construction-delay': {
    icon: Clock,
    label: 'Delay Risk',
    tooltip: 'Construction timeline may be subject to delays due to permitting, weather, or supply chain issues.',
    color: 'text-orange-600',
    bg: 'bg-orange-50',
    border: 'border-orange-200',
  },
  'slow-sales': {
    icon: TrendingDown,
    label: 'Slow Sales',
    tooltip: 'Absorption pace is below market average. Developer may offer incentives or price adjustments.',
    color: 'text-red-600',
    bg: 'bg-red-50',
    border: 'border-red-200',
  },
  'high-price-positioning': {
    icon: DollarSign,
    label: 'Premium Price',
    tooltip: 'Priced at or above the top of the submarket. Higher entry point may limit buyer pool.',
    color: 'text-gold-600',
    bg: 'bg-gold-50',
    border: 'border-gold-200',
  },
  'competitive-supply-pressure': {
    icon: Layers,
    label: 'Supply Pressure',
    tooltip: 'Multiple competing projects in the same submarket may fragment demand.',
    color: 'text-blue-600',
    bg: 'bg-blue-50',
    border: 'border-blue-200',
  },
  'developer-change': {
    icon: UserX,
    label: 'Developer Change',
    tooltip: 'Development has undergone a developer or ownership change, which may affect timeline or design.',
    color: 'text-purple-600',
    bg: 'bg-purple-50',
    border: 'border-purple-200',
  },
  'permitting-risk': {
    icon: AlertTriangle,
    label: 'Permitting Risk',
    tooltip: 'Project requires additional permits or zoning approvals. Timeline may shift pending government review.',
    color: 'text-yellow-600',
    bg: 'bg-yellow-50',
    border: 'border-yellow-200',
  },
};

interface Props {
  flags: string[];
}

function FlagPill({ flag }: { flag: RiskFlag }) {
  const [showTooltip, setShowTooltip] = useState(false);
  const config = FLAG_CONFIG[flag];
  if (!config) return null;

  const Icon = config.icon;

  return (
    <div
      className="relative inline-flex"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      <span
        className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-body font-semibold border ${config.bg} ${config.border} ${config.color}`}
      >
        <Icon className="w-3 h-3" />
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

export default function RiskFlags({ flags }: Props) {
  const validFlags = flags.filter((f) => f in FLAG_CONFIG) as RiskFlag[];
  if (validFlags.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-1.5">
      {validFlags.map((flag) => (
        <FlagPill key={flag} flag={flag} />
      ))}
    </div>
  );
}
