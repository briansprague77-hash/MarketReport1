'use client';

import { motion } from 'framer-motion';
import { fadeUp, staggerContainer, staggerItem, defaultViewport } from '@/lib/animations';
import {
  TrendingUp,
  BarChart3,
  Users,
  Percent,
  AlertTriangle,
} from 'lucide-react';
import type { MarketData } from '@/hooks/useMarketData';

interface EconomistCommentaryProps {
  data?: MarketData;
}

// ─── HHI Interpretation ──────────────────────────────────────────────────────
function hhiInterpretation(hhi: number): string {
  if (hhi < 1000) return 'competitive';
  if (hhi < 1800) return 'moderately competitive';
  return 'concentrated';
}

export default function EconomistCommentary({ data }: EconomistCommentaryProps) {
  const totalUnits = data?.totalUnits ?? 0;
  const totalDevs = data?.totalDevs ?? 0;
  const avgPsf = data?.avgPsf ?? 0;
  const minPsf = data?.minPsf ?? 0;
  const maxPsf = data?.maxPsf ?? 0;
  const hhi = data?.hhi ?? 0;
  const geoLabel = data?.geoLabel ?? 'Tampa Bay';
  const tiers = data?.tiers ?? { value: 0, mid: 0, premium: 0, ultra: 0 };
  const deliveredUnits = data?.statusGroups?.['delivered'] ?? 0;

  const ABSORPTION_RATE = 16;
  const inventoryMonths = totalUnits > 0 ? Math.round(totalUnits / ABSORPTION_RATE) : 0;
  const ultraPct = totalUnits > 0 ? Math.round((tiers.ultra / totalUnits) * 100) : 0;

  const blocks = [
    {
      icon: <TrendingUp className="h-6 w-6" />,
      title: 'Absorption Efficiency & Market Velocity',
      paragraphs: [
        `The Absorption Efficiency Score (AES) measures how quickly a development converts available inventory into executed contracts relative to its total unit count. It is the single most reliable leading indicator of pricing power — developments with high AES can raise prices; those with declining AES face pressure to offer concessions.`,
        totalUnits > 0
          ? `At ~${ABSORPTION_RATE} contracts/month absorption rate, the ${totalUnits.toLocaleString()}-unit ${geoLabel} pipeline represents approximately ${inventoryMonths} months of inventory. Markets with 12\u201318 months of inventory are considered balanced. Above 24 months signals oversupply risk.`
          : `Insufficient data to calculate absorption metrics for the selected geography.`,
        `Monitoring AES on a per-project basis reveals which developments are gaining momentum and which are stalling. A declining AES in a rising-price environment often precedes price corrections or increased developer incentives.`,
      ],
    },
    {
      icon: <BarChart3 className="h-6 w-6" />,
      title: 'Price Per Square Foot Analysis',
      paragraphs: [
        avgPsf > 0
          ? `The ${geoLabel} market spans $${minPsf.toLocaleString()}\u2013$${maxPsf.toLocaleString()}/SF, with an average of $${avgPsf.toLocaleString()}/SF. This positioning reflects the region\u2019s emergence as a nationally competitive luxury market — no longer just a Florida secondary city.`
          : `Insufficient PSF data available for the selected geography to perform comparative analysis.`,
        `By comparison, Miami Brickell averages ~$1,550/SF, Fort Lauderdale ~$950/SF, and the national luxury average ~$1,100/SF. Tampa Bay positions as a \u201Cvalue luxury\u201D market — premium amenities at below-Miami pricing. This spread creates a compelling arbitrage for Northeast relocators and Miami overflow buyers.`,
        tiers.ultra > 0
          ? `The ${tiers.ultra.toLocaleString()}-unit ultra-premium segment (>$1,300/SF) represents ${ultraPct}% of inventory, signaling market maturity. The presence of ultra-premium product validates the submarket\u2019s ability to support institutional-grade pricing.`
          : `No ultra-premium inventory (>$1,300/SF) is tracked in the current selection, suggesting the market remains in an earlier stage of luxury pricing maturation.`,
      ],
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: 'Developer Concentration Risk',
      paragraphs: [
        `The Herfindahl-Hirschman Index (HHI) quantifies market concentration by summing squared market shares. An HHI below 1,000 indicates a competitive market; 1,000\u20131,800 is moderately competitive; above 1,800 is concentrated. Federal regulators use HHI to evaluate merger risk — the same framework applies to real estate supply dynamics.`,
        totalDevs > 0
          ? `${totalDevs} developers compete in the ${geoLabel} market. HHI of ${Math.round(hhi).toLocaleString()} indicates a ${hhiInterpretation(hhi)} market structure. ${hhi < 1000 ? 'This fragmentation benefits buyers through price discipline and reduces the risk of coordinated supply withholding.' : hhi < 1800 ? 'Several developers hold meaningful market share, creating a balanced dynamic between competition and pricing coordination.' : 'Dominant developers may exercise pricing power through controlled inventory release and coordinated pricing strategies.'}`
          : `No developer concentration data available for the selected geography.`,
        `A competitive market benefits buyers through price discipline and diverse product options. Concentrated markets risk coordinated pricing, where a single developer\u2019s incentive program or price reduction can cascade across the submarket.`,
      ],
    },
    {
      icon: <Percent className="h-6 w-6" />,
      title: 'Interest Rate Sensitivity',
      paragraphs: [
        `At current 30-year fixed rates (~7.25%), a $500,000 purchase at 80% LTV costs approximately $2,730/month (P&I only). Adding taxes, insurance, and HOA fees typical of luxury condominiums pushes total housing costs to $4,200\u2013$5,500/month — a significant threshold for qualification.`,
        `HOA fees across the ${geoLabel} pipeline range from $0.73\u2013$1.40/SF/month. For a 2,000 SF unit, that translates to $1,460\u2013$2,800/month in HOA alone — a material carrying cost that buyers frequently underestimate. Buildings with branded management (Waldorf, Ritz-Carlton) cluster at the high end of this range, while independent developments like The Cade and Reflection offer lower ongoing costs.`,
        `Each 0.5% rate increase adds ~$170/month — equivalent to approximately $30,000 in reduced purchasing power at the same monthly payment. For the luxury segment, where average purchase prices exceed $800,000, rate sensitivity compounds: a 1% increase effectively removes $60,000\u2013$80,000 of buying power.`,
        `Pre-construction buyers with 2027\u20132029 delivery dates are exposed to rate uncertainty. Locked deposit structures (typically 20\u201330% non-refundable) partially mitigate this risk for developers but transfer closing risk to buyers. Monitor rate lock availability and developer financing partnerships as leading indicators of deal execution confidence.`,
      ],
    },
    {
      icon: <AlertTriangle className="h-6 w-6" />,
      title: 'Shadow Inventory & Delivery Risk',
      paragraphs: [
        `Delivered buildings typically carry 10\u201315% shadow inventory — unsold developer units, staging or model units not yet listed, and units strategically held off MLS. This inventory does not appear in MLS until formally listed, creating a data gap that can mislead absorption analysis.`,
        `At current absorption rates, shadow inventory clears within 6\u201312 months post-delivery in a healthy market. Extended clearance timelines (>18 months) may indicate pricing misalignment or weakening demand fundamentals.`,
        deliveredUnits > 0
          ? `The pipeline shows ${deliveredUnits.toLocaleString()} units in \u201Cdelivered\u201D status across ${geoLabel}. Monitoring these for price reductions, extended days on market, or increased concessions provides a leading indicator of market stress. Conversely, rapid sellthrough of delivered inventory validates pricing and supports future pre-construction launches.`
          : `No delivered inventory is currently tracked in ${geoLabel}. As projects reach completion, monitoring shadow inventory dynamics will become critical for market health assessment.`,
        `Note on MLS Cancellations: In new construction, cancelled MLS listings reflect developer inventory management — not deal failure. Developers control listing velocity by drip-feeding units onto MLS, cancelling listings when contracts are executed, and relisting at adjusted prices. Analysts should interpret high cancellation rates as a sign of active sales velocity, not market distress. This is fundamentally different from resale market cancellations, where a cancelled listing typically signals a deal that fell through.`,
      ],
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
            Expert Analysis
          </p>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-ivory-50">
            Market Economist&apos;s Analysis
          </h2>
          <p className="mt-3 text-lg font-body text-charcoal-400 max-w-2xl mx-auto">
            MAI-level commentary on the {geoLabel} new construction market
          </p>
        </motion.div>

        <motion.div
          className="space-y-6"
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          variants={staggerContainer}
        >
          {blocks.map((block) => (
            <motion.div
              key={block.title}
              variants={staggerItem}
              className="bg-charcoal-900/80 border border-charcoal-800 rounded-xl p-6 md:p-8"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-gold-500/10 text-gold-500">
                  {block.icon}
                </div>
                <h3 className="text-xl font-heading font-bold text-ivory-50 pt-2">
                  {block.title}
                </h3>
              </div>
              <div className="space-y-4 pl-0 md:pl-16">
                {block.paragraphs.map((paragraph, i) => (
                  <p
                    key={i}
                    className="text-sm font-body leading-relaxed text-charcoal-300"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.p
          className="mt-8 text-center text-xs font-body text-charcoal-500"
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          variants={fadeUp}
        >
          Analysis reflects market conditions as of March 2026. Interest rate assumptions based on Freddie Mac PMMS.
          HHI calculations use developer unit share methodology. Absorption estimates are market-wide averages and may vary by submarket.
        </motion.p>
      </div>
    </section>
  );
}
