'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { trackedDevelopments } from '@/data/market';
import { fadeUp, staggerContainer, staggerItem, defaultViewport } from '@/lib/animations';
import Badge from '@/components/ui/Badge';

interface SubmarketStat {
  submarket: string;
  activeDevs: number;
  activeUnits: number;
  avgPsf: number;
  avgSoldPct: number;
}

function computeSubmarketStats(): SubmarketStat[] {
  const groups: Record<string, typeof trackedDevelopments> = {};
  for (const d of trackedDevelopments) {
    if (!d.submarket) continue;
    if (d.status === 'sold-out' || d.status === 'shadow-inventory') continue;
    if (!groups[d.submarket]) groups[d.submarket] = [];
    groups[d.submarket].push(d);
  }

  return Object.entries(groups).map(([submarket, devs]) => {
    const activeUnits = devs.reduce((s, d) => s + (d.units ?? 0), 0);
    const withPsf = devs.filter((d) => (d.resalePsf ?? d.developerClosePsf ?? d.avgPsf ?? 0) > 0);
    const avgPsf = withPsf.length
      ? Math.round(withPsf.reduce((s, d) => s + (d.resalePsf ?? d.developerClosePsf ?? d.avgPsf ?? 0), 0) / withPsf.length)
      : 0;
    const withSold = devs.filter((d) => d.soldPercent != null);
    const avgSoldPct = withSold.length
      ? Math.round(withSold.reduce((s, d) => s + (d.soldPercent ?? 0), 0) / withSold.length)
      : 0;
    return { submarket, activeDevs: devs.length, activeUnits, avgPsf, avgSoldPct };
  }).sort((a, b) => b.activeUnits - a.activeUnits);
}

export default function SubmarketPulse() {
  const stats = computeSubmarketStats();
  return (
    <section className="py-20 bg-charcoal-900/40">
      <div className="container-luxury">
        <motion.div
          initial="hidden" whileInView="visible" viewport={defaultViewport} variants={fadeUp}
          className="mb-10"
        >
          <Badge label="Submarket Pulse" variant="gold" />
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white mt-4 mb-2">
            Where Tampa Bay Is Building
          </h2>
          <p className="text-ivory-400/60 max-w-2xl">
            Active units, average $/SF, and sell-through across every tracked submarket. Click any tile to filter the developments page.
          </p>
        </motion.div>

        <motion.div
          initial="hidden" whileInView="visible" viewport={defaultViewport} variants={staggerContainer}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3"
        >
          {stats.map((s) => (
            <motion.div key={s.submarket} variants={staggerItem} className="h-full">
              <Link href={`/developments?submarket=${encodeURIComponent(s.submarket)}`} className="flex h-full">
                <div className="group flex flex-col w-full rounded-xl border border-ivory-100/10 bg-charcoal-900/60 hover:border-gold-500/30 hover:bg-charcoal-800/80 transition-all p-5 h-full">
                  <div className="text-xs text-ivory-400/50 mb-2 group-hover:text-ivory-200 transition-colors">{s.submarket}</div>
                  <div className="text-2xl font-heading font-bold text-white mb-3">
                    {s.activeUnits.toLocaleString()}
                    <span className="text-xs text-ivory-400/40 font-body font-normal ml-1">units</span>
                  </div>
                  <div className="space-y-1 text-xs">
                    <div className="flex justify-between">
                      <span className="text-ivory-400/50">Devs</span>
                      <span className="text-ivory-200">{s.activeDevs}</span>
                    </div>
                    {s.avgPsf > 0 && (
                      <div className="flex justify-between">
                        <span className="text-ivory-400/50">Avg $/SF</span>
                        <span className="text-gold-400">${s.avgPsf.toLocaleString()}</span>
                      </div>
                    )}
                    {s.avgSoldPct > 0 && (
                      <div className="flex justify-between">
                        <span className="text-ivory-400/50">Sold</span>
                        <span className="text-ivory-200">{s.avgSoldPct}%</span>
                      </div>
                    )}
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
