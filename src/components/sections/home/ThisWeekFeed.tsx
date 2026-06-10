'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { computeMarketEvents, type MarketEvent } from '@/lib/computeMarketEvents';
import { fadeUp, staggerContainer, staggerItem, defaultViewport } from '@/lib/animations';
import Badge from '@/components/ui/Badge';

const TYPE_STYLE: Record<MarketEvent['type'], { label: string; color: string }> = {
  'milestone':     { label: 'Milestone',     color: '#10B981' },
  'price-change':  { label: 'Price Move',    color: '#F59E0B' },
  'incentive':     { label: 'Incentive',     color: '#8B5CF6' },
  'risk-flag':     { label: 'Risk Flag',     color: '#EF4444' },
};

function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

export default function ThisWeekFeed() {
  const events = computeMarketEvents(5);
  const [headline, ...rest] = events;

  if (!headline) {
    // Graceful empty state — still prints the section so the page doesn't collapse
    return (
      <section className="py-20 bg-charcoal-950 border-t border-ivory-100/5">
        <div className="container-luxury">
          <p className="text-ivory-400/60 max-w-2xl">
            No new market events in the last 90 days. Check back as deliveries, price moves, and sales launches ship.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-charcoal-950 border-t border-ivory-100/5">
      <div className="container-luxury">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          variants={fadeUp}
          className="mb-10"
        >
          <Badge label="This Week in Tampa Bay" variant="gold" />
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white mt-4 mb-2">
            What Moved
          </h2>
          <p className="text-ivory-400/60 max-w-2xl">
            Auto-computed from lifecycle milestones, price-history entries, and incentive updates across the 26-building pipeline. Last 90 days.
          </p>
        </motion.div>

        {/* Headline story */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          variants={fadeUp}
          className="mb-8"
        >
          <Link href={`/developments/${headline.devSlug}`}>
            <div className="group rounded-2xl border border-gold-500/30 bg-gradient-to-br from-charcoal-900/80 to-charcoal-950 p-8 hover:border-gold-500/60 transition-all">
              <div className="flex items-center gap-3 mb-4">
                <span
                  className="text-xs font-medium uppercase tracking-wider px-2.5 py-1 rounded-full"
                  style={{
                    color: TYPE_STYLE[headline.type].color,
                    backgroundColor: `${TYPE_STYLE[headline.type].color}20`,
                  }}
                >
                  {TYPE_STYLE[headline.type].label}
                </span>
                <span className="text-xs text-ivory-400/50">{formatDate(headline.date)}</span>
              </div>
              <h3 className="font-heading text-2xl sm:text-3xl font-bold text-white group-hover:text-gold-400 transition-colors mb-2">
                {headline.headline}
              </h3>
              <p className="text-ivory-400/70">{headline.body}</p>
            </div>
          </Link>
        </motion.div>

        {/* Shift cards */}
        {rest.length > 0 && (
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={defaultViewport}
            variants={staggerContainer}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4"
          >
            {rest.map((ev) => (
              <motion.div key={`${ev.devSlug}-${ev.type}-${ev.date}`} variants={staggerItem}>
                <Link href={`/developments/${ev.devSlug}`}>
                  <div className="group h-full rounded-xl border border-ivory-100/10 bg-charcoal-900/60 hover:bg-charcoal-800/80 transition-all p-5">
                    <div className="flex items-center justify-between mb-3">
                      <span
                        className="text-[10px] font-medium uppercase tracking-wider"
                        style={{ color: TYPE_STYLE[ev.type].color }}
                      >
                        {TYPE_STYLE[ev.type].label}
                      </span>
                      <span className="text-[10px] text-ivory-400/40">{formatDate(ev.date)}</span>
                    </div>
                    <h4 className="font-heading text-base font-semibold text-white group-hover:text-gold-400 transition-colors mb-1 line-clamp-2">
                      {ev.headline}
                    </h4>
                    <p className="text-xs text-ivory-400/60 line-clamp-2">{ev.body}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}
