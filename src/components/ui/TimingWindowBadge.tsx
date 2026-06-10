'use client';

import { classifyTimingWindow, TIMING_WINDOW_META, type TimingWindow } from '@/lib/timing';
import type { DevelopmentSummary } from '@/data/developments';

interface TimingWindowBadgeProps {
  dev?: DevelopmentSummary;
  window?: TimingWindow;
  showTooltip?: boolean;
  className?: string;
}

export default function TimingWindowBadge({
  dev,
  window: windowProp,
  showTooltip = true,
  className = '',
}: TimingWindowBadgeProps) {
  const tw = windowProp ?? (dev ? classifyTimingWindow(dev) : 'discovery');
  const meta = TIMING_WINDOW_META[tw];

  const isOutline = tw === 'resale-crossover';

  return (
    <span
      className={`
        inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[11px] font-body font-semibold
        ${isOutline
          ? `bg-transparent border-2 ${meta.borderClass} ${meta.textClass}`
          : `${meta.bgClass} ${meta.textClass} border border-transparent`
        }
        ${className}
      `}
      title={showTooltip ? meta.description : undefined}
    >
      <span
        className={`inline-block h-1.5 w-1.5 rounded-full ${
          isOutline ? 'bg-red-500' : `bg-${meta.color}-500`
        }`}
        style={
          !isOutline
            ? { backgroundColor: getColorHex(meta.color) }
            : undefined
        }
      />
      {meta.label}
    </span>
  );
}

function getColorHex(color: string): string {
  const map: Record<string, string> = {
    gray: '#6B7280',
    blue: '#3B82F6',
    emerald: '#10B981',
    gold: '#C9A84C',
    orange: '#F97316',
    red: '#EF4444',
    purple: '#8B5CF6',
    charcoal: '#6B7280',
  };
  return map[color] ?? '#6B7280';
}
