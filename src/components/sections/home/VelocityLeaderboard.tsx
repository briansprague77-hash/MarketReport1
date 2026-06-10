'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { trackedDevelopments } from '@/data/market';
import { developmentProfiles } from '@/data/developments';
import { fadeUp, defaultViewport } from '@/lib/animations';
import Badge from '@/components/ui/Badge';

interface PriceMove {
  slug: string;
  name: string;
  submarket?: string;
  pct: number;        // signed percentage change
}

function gatherPriceMoves(): PriceMove[] {
  const moves: PriceMove[] = [];
  for (const [slug, profile] of Object.entries(developmentProfiles)) {
    const pct = profile.pricingHistory?.priceChangePercent;
    if (pct == null || pct === 0) continue;
    const summary = trackedDevelopments.find((d) => d.slug === slug);
    if (!summary) continue;
    // Exclude sold-out buildings — their priceChangePercent reflects resale
    // premium vs launch price, not an active pipeline signal.
    if (summary.status === 'sold-out' || profile.status === 'sold-out') continue;
    moves.push({
      slug,
      name: summary.name,
      submarket: summary.submarket,
      pct,
    });
  }
  // Sort by magnitude descending
  moves.sort((a, b) => Math.abs(b.pct) - Math.abs(a.pct));
  return moves;
}

function formatPct(pct: number): string {
  const sign = pct > 0 ? '+' : '';
  return `${sign}${pct.toFixed(1)}%`;
}

export default function VelocityLeaderboard() {
  const priceMoves = gatherPriceMoves().slice(0, 5);

  const pressured = trackedDevelopments
    .filter((d) => d.inventoryPressure === 'high' && d.units > 0 && d.status !== 'sold-out')
    .sort((a, b) => b.units - a.units)
    .slice(0, 5);

  return (
    <section className="py-20 bg-charcoal-950">
      <div className="container-luxury">
        <motion.div initial="hidden" whileInView="visible" viewport={defaultViewport} variants={fadeUp} className="mb-10">
          <Badge label="Price Action & Pressure" variant="gold" />
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white mt-4 mb-2">
            Who&rsquo;s Moving on Price, Who&rsquo;s Pressured
          </h2>
          <p className="text-ivory-400/60 max-w-2xl">
            Biggest PSF changes since launch versus buildings under high inventory pressure.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          <Column
            title="Biggest Price Moves"
            items={priceMoves.map((m) => ({
              slug: m.slug,
              name: m.name,
              submarket: m.submarket,
              right: formatPct(m.pct),
              rightTone: m.pct >= 0 ? 'up' : 'down',
            }))}
            accent="emerald"
          />
          <Column
            title="Most Inventory Pressure"
            items={pressured.map((d) => ({
              slug: d.slug,
              name: d.name,
              submarket: d.submarket,
              right: `${d.units} units`,
              rightTone: 'neutral',
            }))}
            accent="red"
          />
        </div>
      </div>
    </section>
  );
}

type RightTone = 'up' | 'down' | 'neutral';

function Column({
  title,
  items,
  accent,
}: {
  title: string;
  items: { slug: string; name: string; submarket?: string; right: string; rightTone?: RightTone }[];
  accent: 'emerald' | 'red';
}) {
  const headingColor = accent === 'emerald' ? 'text-emerald-400' : 'text-red-400';
  const toneColor = (tone?: RightTone) => {
    if (tone === 'up') return 'text-emerald-400';
    if (tone === 'down') return 'text-red-400';
    return headingColor;
  };
  return (
    <div className="rounded-xl border border-ivory-100/10 bg-charcoal-900/60 p-6">
      <h3 className={`font-heading text-lg font-semibold mb-5 ${headingColor}`}>{title}</h3>
      <ul className="space-y-3">
        {items.length === 0 && <li className="text-ivory-400/40 text-sm">No qualifying data.</li>}
        {items.map((it, i) => (
          <li key={it.slug}>
            <Link href={`/developments/${it.slug}`}>
              <div className="flex items-center justify-between gap-4 py-2 border-b border-ivory-100/5 last:border-0 hover:bg-charcoal-800/40 rounded px-2 -mx-2 transition-colors">
                <div className="flex items-center gap-3 min-w-0">
                  <span className="text-xs text-ivory-400/40 w-5 tabular-nums">{i + 1}</span>
                  <div className="min-w-0">
                    <div className="text-sm font-medium text-ivory-100 truncate">{it.name}</div>
                    {it.submarket && <div className="text-[11px] text-ivory-400/50 truncate">{it.submarket}</div>}
                  </div>
                </div>
                <span className={`text-sm font-semibold shrink-0 ${toneColor(it.rightTone)}`}>{it.right}</span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
