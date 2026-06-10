'use client';

import { motion } from 'framer-motion';
import {
  staggerContainer,
  staggerItem,
  fadeUp,
  defaultViewport,
} from '@/lib/animations';
import {
  TrendingUp,
  Flame,
  Clock,
  DollarSign,
  BarChart3,
  AlertTriangle,
} from 'lucide-react';
import type { MarketData } from '@/hooks/useMarketData';

interface MarketInsightsProps {
  data?: MarketData;
}

export default function MarketInsights({ data }: MarketInsightsProps) {
  const totalUnits = data?.totalUnits ?? 0;
  const totalDevs = data?.totalDevs ?? 0;
  const geoLabel = data?.geoLabel ?? 'Tampa Bay';
  const avgPsf = data?.avgPsf ?? 0;
  const minPsf = data?.minPsf ?? 0;
  const maxPsf = data?.maxPsf ?? 0;

  // Dynamic status-based values
  const deliveredUnits = data?.statusGroups?.['delivered'] ?? 0;
  const preSalesUnits =
    (data?.statusGroups?.['pre-sales'] ?? 0) +
    (data?.statusGroups?.['reservation'] ?? 0);
  const brandedCount = data?.brandedCount ?? 0;

  // Build dynamic opportunity text from filtered data
  const buildOpportunityText = (): string => {
    if (!data || data.filtered.length === 0) return 'No data available for selected geography.';
    const delivered = data.filtered.filter((d) => d.status === 'delivered');
    const preSales = data.filtered.filter(
      (d) => d.status === 'pre-sales' || d.status === 'reservation'
    );
    const parts: string[] = [];
    if (delivered.length > 0) {
      parts.push(
        `${delivered.map((d) => d.name).join(' and ')} ${delivered.length === 1 ? 'is' : 'are'} fully delivered`
      );
    }
    if (preSales.length > 0) {
      parts.push(
        `early-stage opportunities remain at ${preSales.slice(0, 3).map((d) => d.name).join(', ')}${preSales.length > 3 ? ` and ${preSales.length - 3} others` : ''}`
      );
    }
    return parts.join('. ') + '.';
  };

  // Build dynamic delivery text
  const buildDeliveryText = (): string => {
    if (!data) return 'No delivery data available.';
    const forecast = data.deliveryForecast;
    if (forecast.length === 0) return 'No delivery timeline data available.';
    const futureDeliveries = forecast.filter((f) => f.year !== 'TBD' && parseInt(f.year) >= 2026);
    if (futureDeliveries.length === 0 && deliveredUnits > 0) {
      return `${deliveredUnits.toLocaleString()} units currently in the delivering phase with active closings underway.`;
    }
    const deliveryParts = futureDeliveries
      .slice(0, 3)
      .map((f) => `${f.units.toLocaleString()} units targeting ${f.year}`);
    return `${deliveredUnits.toLocaleString()} units currently delivering. Long-term pipeline includes ${deliveryParts.join(', ')}.`;
  };

  // Build dynamic price text
  const buildPriceText = (): string => {
    if (avgPsf <= 0) return 'Insufficient pricing data for selected geography.';
    const topDev = data?.filtered
      .filter((d) => (d.avgPsf ?? 0) > 0)
      .sort((a, b) => (b.avgPsf ?? 0) - (a.avgPsf ?? 0))[0];
    const floorDevs = data?.filtered
      .filter((d) => (d.avgPsf ?? 0) >= 800 && (d.avgPsf ?? 0) < 1100)
      .slice(0, 2);

    let text = `Average new construction PSF at $${avgPsf.toLocaleString()} across the ${geoLabel} pipeline (range: $${minPsf.toLocaleString()}–$${maxPsf.toLocaleString()}).`;
    if (topDev) {
      text += ` ${topDev.name} anchors the top of market at $${(topDev.avgPsf ?? 0).toLocaleString()} PSF`;
    }
    if (floorDevs && floorDevs.length > 0) {
      text += ` while ${floorDevs.map((d) => d.name).join(' and ')} establish${floorDevs.length === 1 ? 'es' : ''} the $1,000+ PSF floor for downtown.`;
    } else {
      text += '.';
    }
    return text;
  };

  const insights = [
    {
      icon: <TrendingUp className="h-6 w-6" />,
      title: 'Market Overview',
      description:
        totalUnits > 0
          ? `${totalUnits.toLocaleString()} units across ${totalDevs} active ${geoLabel} developments.${brandedCount > 0 ? ` Includes ${brandedCount} branded residence project${brandedCount !== 1 ? 's' : ''}.` : ''} New construction represents a significant share of all luxury condo sales in the region.`
          : 'No data available for selected geography.',
      accent: '#C9A84C',
    },
    {
      icon: <Flame className="h-6 w-6" />,
      title: 'Hot Opportunities',
      description: buildOpportunityText(),
      accent: '#0D9668',
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: 'Upcoming Deliveries',
      description: buildDeliveryText(),
      accent: '#3B82F6',
    },
    {
      icon: <DollarSign className="h-6 w-6" />,
      title: 'Price Trends',
      description: buildPriceText(),
      accent: '#EC4899',
    },
    {
      icon: <BarChart3 className="h-6 w-6" />,
      title: 'Investment Outlook',
      description:
        totalUnits > 0
          ? `${preSalesUnits.toLocaleString()} units in active pre-sales across the ${geoLabel} pipeline. Population growth and sustained Northeast migration continue to support new construction demand. Monitor delivered inventory (${deliveredUnits.toLocaleString()} units) for absorption velocity signals.`
          : 'No data available for selected geography.',
      accent: '#8B5CF6',
    },
    {
      icon: <AlertTriangle className="h-6 w-6" />,
      title: 'Key Considerations',
      description:
        'Insurance costs and HOA fees ($1,200-$4,500+/month in luxury towers) remain significant carrying cost headwinds for buyers. Delivery clustering may temporarily increase supply. Interest rate environment continues to influence financing terms and buyer qualification.',
      accent: '#F59E0B',
    },
  ];

  return (
    <section className="py-16 bg-charcoal-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          variants={fadeUp}
        >
          <p className="text-xs font-body font-semibold uppercase tracking-[0.25em] text-gold-500 mb-3">
            Analysis
          </p>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-ivory-50">
            Market Insights
          </h2>
          <p className="mt-3 text-lg font-body text-charcoal-400 max-w-2xl mx-auto">
            Key observations for listing agents advising on {geoLabel} new construction
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          variants={staggerContainer}
        >
          {insights.map((insight) => (
            <motion.div
              key={insight.title}
              variants={staggerItem}
              className="relative overflow-hidden rounded-xl border border-charcoal-800 bg-charcoal-900/80 p-6 backdrop-blur-sm hover:border-charcoal-700 transition-colors"
            >
              <div className="absolute inset-x-0 top-0 h-1" style={{ backgroundColor: insight.accent }} />
              <div
                className="flex h-12 w-12 items-center justify-center rounded-lg mb-4"
                style={{ backgroundColor: `${insight.accent}20`, color: insight.accent }}
              >
                {insight.icon}
              </div>
              <h3 className="text-lg font-heading font-bold text-ivory-50 mb-2">
                {insight.title}
              </h3>
              <p className="text-sm font-body leading-relaxed text-charcoal-400">
                {insight.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
