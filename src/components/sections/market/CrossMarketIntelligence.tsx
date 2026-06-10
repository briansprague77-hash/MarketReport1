'use client';

import { motion } from 'framer-motion';
import { staggerContainer, staggerItem, defaultViewport } from '@/lib/animations';
import AnimatedCounter from '@/components/ui/AnimatedCounter';
import {
  Crown,
  ArrowUpDown,
  Layers,
  TrendingUp,
  Repeat,
  Building2,
  DollarSign,
  AlertTriangle,
} from 'lucide-react';

// ─── Insight Data ───────────────────────────────────────────────────────────

interface Insight {
  stat: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  headline: string;
  description: string;
  icon: React.ReactNode;
}

const INSIGHTS: Insight[] = [
  {
    stat: 50.5,
    prefix: '+',
    suffix: '%',
    decimals: 1,
    headline: 'Brand Premium Quantified',
    description:
      'Branded residences (Waldorf, Ritz-Carlton, Pendry, EDITION, Roche Bobois, Viceroy, Hotel ORA) average $1,345/SF vs independent buildings at $894/SF. This 50% premium is the first quantification of the brand markup in Tampa Bay.',
    icon: <Crown className="h-6 w-6" />,
  },
  {
    stat: 1332,
    prefix: '$',
    suffix: '/SF',
    headline: 'Downtown Tampa > Downtown St Pete',
    description:
      'Downtown Tampa now averages $1,332/SF vs Downtown St Pete at $1,098/SF \u2014 a reversal of the historical relationship. Tampa EDITION ($1,563), Hotel ORA ($1,466), and Pendry ($1,329) pulled Tampa above St Pete for the first time.',
    icon: <ArrowUpDown className="h-6 w-6" />,
  },
  {
    stat: 929,
    suffix: ' units',
    headline: '2026 Peak Delivery Wave',
    description:
      'Five buildings deliver simultaneously in 2026: 400 Central (301), Art House (244), Pendry (207), Ritz-Carlton II (100), Aqua (77). The largest delivery collision in Tampa Bay history creates both opportunity and absorption pressure.',
    icon: <Layers className="h-6 w-6" />,
  },
  {
    stat: 0.759,
    decimals: 3,
    headline: 'HOA-PSF Correlation',
    description:
      'Statistical correlation of r=0.759 between HOA cost and PSF across 11 buildings. Higher HOA ($1.52 EDITION) = branded services = higher PSF. The $940/month gap between cheapest ($0.73) and most expensive HOA IS the cost of the brand premium.',
    icon: <TrendingUp className="h-6 w-6" />,
  },
  {
    stat: 8.6,
    suffix: '%',
    decimals: 1,
    headline: 'Flip Rate \u2014 First Ever Data',
    description:
      '37 of 430 new construction buyers (8.6%) flipped within 4 months of closing. ALL 37 in profit \u2014 avg +17.9% markup ($276K/unit). This is the first-ever flip rate quantification in Tampa Bay new construction.',
    icon: <Repeat className="h-6 w-6" />,
  },
  {
    stat: 819,
    suffix: ' units',
    headline: 'Smith & Associates Dominance',
    description:
      'One brokerage \u2014 Smith & Associates \u2014 controls 819 units across 6 buildings (Waldorf, Art House, Altura, ONE Tampa, Aqua, Tampa EDITION). More units than any single developer. Stacey Borsik Niebles sold EDITION and now sells Waldorf \u2014 THE branded residence specialist.',
    icon: <Building2 className="h-6 w-6" />,
  },
  {
    stat: 6.1,
    prefix: '$',
    suffix: 'B',
    decimals: 1,
    headline: 'Total Pipeline Value',
    description:
      'The Tampa Bay luxury new construction pipeline represents approximately $6.1 billion in total project value across 15 priced buildings (2,589 units at avg 2,000 SF). This is institutional-scale capital commitment to a single metro.',
    icon: <DollarSign className="h-6 w-6" />,
  },
  {
    stat: 822,
    suffix: ' units',
    headline: '2029 Watch: Pricing Pressure',
    description:
      'Roche Bobois (164 units, $1,433/SF) and Hotel ORA (658 units, $1,466/SF) both deliver in 2029 at $1,400+/SF. 822 ultra-luxury units in the same year creates the highest absorption risk in the pipeline. Monitor for incentives and price adjustments.',
    icon: <AlertTriangle className="h-6 w-6" />,
  },
];

// ─── Card ───────────────────────────────────────────────────────────────────

function InsightCard({ insight }: { insight: Insight }) {
  return (
    <motion.div
      variants={staggerItem}
      className="relative rounded-xl border border-charcoal-800 bg-charcoal-900/80 backdrop-blur-sm p-6 pl-7 overflow-hidden"
    >
      {/* Gold left accent border */}
      <div className="absolute inset-y-0 left-0 w-1 bg-gold-500" />

      {/* Icon */}
      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gold-500/10 text-gold-500 mb-4">
        {insight.icon}
      </div>

      {/* Animated stat */}
      <div className="mb-2">
        <AnimatedCounter
          value={insight.stat}
          prefix={insight.prefix}
          suffix={insight.suffix}
          decimals={insight.decimals}
          duration={2.2}
          className="text-3xl font-heading font-bold text-ivory-50"
        />
      </div>

      {/* Headline */}
      <h4 className="text-sm font-body font-bold text-ivory-100 mb-2">
        {insight.headline}
      </h4>

      {/* Description */}
      <p className="text-xs font-body leading-relaxed text-charcoal-400">
        {insight.description}
      </p>
    </motion.div>
  );
}

// ─── Section ────────────────────────────────────────────────────────────────

export default function CrossMarketIntelligence() {
  return (
    <section className="py-16 bg-charcoal-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          variants={staggerItem}
        >
          {/* Gold accent line */}
          <div className="flex justify-center mb-4">
            <div className="h-px w-12 bg-gold-500" />
          </div>

          <p className="text-xs font-body font-semibold uppercase tracking-[0.25em] text-gold-500 mb-3">
            Cross-Market Intelligence
          </p>

          <h2 className="text-3xl md:text-4xl font-heading font-bold text-ivory-50 mb-4">
            Insights No One Else Has
          </h2>

          <p className="text-base font-body text-charcoal-400 max-w-3xl mx-auto leading-relaxed">
            Proprietary cross-metric analysis derived from 856 MLS records, 21
            tracked developments, and $6.1B in pipeline data.
          </p>
        </motion.div>

        {/* 2-column grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          variants={staggerContainer}
        >
          {INSIGHTS.map((insight) => (
            <InsightCard key={insight.headline} insight={insight} />
          ))}
        </motion.div>

        {/* Source footnote */}
        <motion.p
          className="mt-8 text-center text-xs font-body text-charcoal-500"
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          variants={staggerItem}
        >
          Sources: Stellar MLS, developer disclosures, PCPAO, DBPR filings,
          proprietary broker research. All figures independently verified.
        </motion.p>
      </div>
    </section>
  );
}
