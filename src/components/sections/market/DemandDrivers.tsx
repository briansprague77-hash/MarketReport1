'use client';

import { motion } from 'framer-motion';
import AnimatedCounter from '@/components/ui/AnimatedCounter';
import {
  fadeUp,
  defaultViewport,
} from '@/lib/animations';
import { demandDrivers } from '@/data/market';

// Parse stat strings into structured data for AnimatedCounter
function parseStat(stat: string): { prefix: string; value: number; suffix: string; decimals: number } | null {
  // "$20.65B" → prefix=$, value=20.65, suffix=B
  const match = stat.match(/^([+\-$]*)([\d,.]+)(.*)$/);
  if (!match) return null;
  const prefix = match[1];
  const numStr = match[2].replace(/,/g, '');
  const value = parseFloat(numStr);
  if (isNaN(value)) return null;
  const suffix = match[3];
  const decimals = numStr.includes('.') ? numStr.split('.')[1].length : 0;
  return { prefix, value, suffix, decimals };
}

export default function DemandDrivers() {
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
            Why Tampa Bay
          </p>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-ivory-50">
            Demand Drivers
          </h2>
          <div className="w-16 h-0.5 bg-gradient-to-r from-gold-500 to-gold-700 mx-auto mt-4 mb-3" />
          <p className="mt-3 text-lg font-body text-charcoal-400 max-w-2xl mx-auto">
            Fundamental market forces supporting new construction demand
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {demandDrivers.map((driver, index) => {
            const parsed = parseStat(driver.stat);

            return (
              <motion.div
                key={driver.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: index * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="relative overflow-hidden rounded-xl border border-charcoal-800 bg-charcoal-900/80 p-8 backdrop-blur-sm"
              >
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0">
                    <motion.div
                      initial={{ scale: 1 }}
                      whileInView={{ scale: [1, 1.1, 1] }}
                      viewport={{ once: true, margin: '-50px' }}
                      transition={{ duration: 0.6, delay: index * 0.08 + 0.3 }}
                      className="flex h-16 w-16 items-center justify-center rounded-xl bg-gold-500/10 border border-gold-500/20"
                    >
                      {parsed ? (
                        <AnimatedCounter
                          value={parsed.value}
                          prefix={parsed.prefix}
                          suffix={parsed.suffix}
                          decimals={parsed.decimals}
                          duration={2}
                          className="text-lg font-heading font-bold text-gold-500"
                        />
                      ) : (
                        <span className="text-lg font-heading font-bold text-gold-500">
                          {driver.stat}
                        </span>
                      )}
                    </motion.div>
                  </div>
                  <div>
                    <h3 className="text-lg font-heading font-bold text-ivory-50 mb-2">
                      {driver.title}
                    </h3>
                    <motion.p
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true, margin: '-50px' }}
                      transition={{ duration: 0.5, delay: index * 0.08 + 0.6 }}
                      className="text-sm font-body leading-relaxed text-charcoal-400"
                    >
                      {driver.description}
                    </motion.p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* ─── Demand Narrative ───────────────────────────────────────── */}
        <motion.div
          className="mt-10 rounded-xl border border-charcoal-800 bg-charcoal-900/60 backdrop-blur-sm p-6 md:p-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <h3 className="text-sm font-body font-semibold uppercase tracking-widest text-gold-500 mb-3">
            The Bigger Picture
          </h3>
          <div className="space-y-3 text-sm font-body leading-relaxed text-charcoal-300">
            <p>
              These demand drivers are <span className="text-ivory-50 font-semibold">structural, not cyclical</span> — $20.65 billion in verified IRS wealth migration,
              $12+ billion in infrastructure investment, and 7 branded residence commitments represent institutional conviction. Tampa Bay&apos;s Top 5 HQ relocation
              ranking and 80.3% hotel occupancy (#1 nationally) confirm this market has graduated from &apos;emerging&apos; to &apos;established&apos;.
            </p>
            <p>
              Average PSF of <span className="text-ivory-50 font-semibold">$1,105</span> with a range of <span className="text-ivory-50 font-semibold">$727–$1,563</span>.
              The pricing landscape reflects the diversity of product types across the Tampa Bay pipeline — from attainable luxury through ultra-premium branded
              residences. New construction carries a quantifiable insurance advantage: 40%+ wind mitigation discounts vs older stock, with FL average rate hikes
              dropping from 21% to 0.2% post-reform.
            </p>
            <p>
              For realtors, the takeaway is direct: developers release inventory to MLS strategically — <span className="text-ivory-50 font-semibold">Waldorf
              currently shows 7 active listings with 33 units sold (20.2%)</span> and 4 MLS cancellations indicating executed contracts. The developer
              controls the pace of release, so MLS inventory is a fraction of total availability. With $113M+ in implied contracted value, each closing
              establishes a new comparable that defines the PSF floor for this entire submarket.
            </p>
          </div>
          <p className="mt-4 text-xs font-body text-charcoal-500">
            Sources: IRS SOI Tax Data (2023), Site Selection Magazine (2026), Visit Tampa Bay (FY2025), FL Governor&apos;s Office (2025), Michelin Guide (2024-2025), Stellar MLS (April 2026).
          </p>
        </motion.div>
      </div>
    </section>
  );
}
