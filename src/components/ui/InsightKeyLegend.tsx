'use client';

import { badgeTypeConfig, statusBadgeConfig } from '@/data/market';
import type { BadgeType } from '@/types/development';

/**
 * InsightKeyLegend
 *
 * A compact legend that explains the badge system used across the market report.
 * Shows both development status badges and feature/classification badges
 * so realtors can quickly decode what each label means.
 */
export default function InsightKeyLegend() {
  const badgeTypes = Object.entries(badgeTypeConfig) as [BadgeType, typeof badgeTypeConfig[BadgeType]][];
  const statuses = Object.entries(statusBadgeConfig);

  return (
    <div className="space-y-6">
      {/* Status Legend */}
      <div>
        <h4 className="text-xs font-semibold uppercase tracking-wider text-charcoal/50 mb-3">
          Development Status
        </h4>
        <div className="flex flex-wrap gap-2">
          {statuses.map(([, config]) => (
            <span
              key={config.label}
              className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium"
              style={{ color: config.color, backgroundColor: config.bgColor }}
            >
              <span
                className="h-1.5 w-1.5 rounded-full"
                style={{ backgroundColor: config.color }}
              />
              {config.label}
            </span>
          ))}
        </div>
      </div>

      {/* Classification Legend */}
      <div>
        <h4 className="text-xs font-semibold uppercase tracking-wider text-charcoal/50 mb-3">
          Classification Badges
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {badgeTypes.map(([key, config]) => (
            <div
              key={key}
              className="flex items-start gap-2.5 rounded-lg px-3 py-2"
              style={{ backgroundColor: config.bgColor }}
            >
              <span className="text-base leading-none mt-0.5">{config.icon}</span>
              <div>
                <p className="text-xs font-semibold" style={{ color: config.color }}>
                  {config.label}
                </p>
                <p className="text-[11px] text-charcoal/60 leading-snug">
                  {config.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
