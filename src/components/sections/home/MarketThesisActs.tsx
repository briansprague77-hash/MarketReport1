'use client';

import { motion } from 'framer-motion';
import { trackedDevelopments, demandDrivers } from '@/data/market';
import { fadeUp, staggerContainer, staggerItem, defaultViewport } from '@/lib/animations';
import Badge from '@/components/ui/Badge';

function Act({ number, eyebrow, title, thesis, children }: {
  number: string; eyebrow: string; title: string; thesis: string; children: React.ReactNode;
}) {
  return (
    <motion.div
      initial="hidden" whileInView="visible" viewport={defaultViewport} variants={fadeUp}
      className="grid md:grid-cols-2 gap-10 items-center py-14 border-b border-ivory-100/5 last:border-0"
    >
      <div>
        <div className="flex items-center gap-3 mb-4">
          <span className="text-5xl font-heading font-bold text-gold-500/30">{number}</span>
          <div>
            <div className="text-xs font-body font-semibold uppercase tracking-[0.25em] text-gold-500">{eyebrow}</div>
            <h3 className="font-heading text-2xl sm:text-3xl font-bold text-white">{title}</h3>
          </div>
        </div>
        <p className="text-ivory-400/70 leading-relaxed">{thesis}</p>
      </div>
      <div>{children}</div>
    </motion.div>
  );
}

export default function MarketThesisActs() {
  // Act 1: pipeline status counts
  const active = trackedDevelopments.filter((d) => d.status !== 'sold-out' && d.units > 0);
  const totalUnits = active.reduce((s, d) => s + d.units, 0);

  // Act 3: PSF ladder — pick buildings with distinct PSF tiers
  const psfLadder = [...trackedDevelopments]
    .filter((d) => d.status !== 'sold-out')
    .filter((d) => (d.resalePsf ?? d.developerClosePsf ?? d.avgPsf ?? 0) > 0)
    .map((d) => ({
      name: d.name,
      psf: d.resalePsf ?? d.developerClosePsf ?? d.avgPsf ?? 0,
      submarket: d.submarket,
    }))
    .sort((a, b) => a.psf - b.psf);
  const maxPsf = psfLadder.length > 0 ? Math.max(...psfLadder.map((p) => p.psf)) : 0;

  return (
    <section className="py-20 bg-charcoal-950">
      <div className="container-luxury">
        <motion.div
          initial="hidden" whileInView="visible" viewport={defaultViewport} variants={fadeUp}
          className="mb-14 text-center"
        >
          <Badge label="Market Thesis" variant="gold" />
          <h2 className="font-heading text-3xl sm:text-5xl font-bold text-white mt-4 mb-3">
            Tampa Bay in Three Acts
          </h2>
          <p className="text-ivory-400/60 max-w-2xl mx-auto">
            Supply, demand, and the ceiling. What the data says — not the brochures.
          </p>
        </motion.div>

        {/* Act 1 — Supply */}
        <Act number="01" eyebrow="Act One" title="Supply" thesis={`${active.length} active buildings, ${totalUnits.toLocaleString()} units in pipeline. More than a third are branded residences. The wave is concentrated — not distributed evenly across the bay.`}>
          <div className="rounded-xl border border-ivory-100/10 bg-charcoal-900/60 p-6">
            <div className="text-xs text-ivory-400/50 mb-4">Pipeline by Status</div>
            <motion.div initial="hidden" whileInView="visible" viewport={defaultViewport} variants={staggerContainer} className="space-y-3">
              {['pre-sales', 'under-construction', 'reservation', 'delivered', 'shadow-inventory'].map((status) => {
                const group = trackedDevelopments.filter((d) => d.status === status && d.units > 0);
                const units = group.reduce((s, d) => s + d.units, 0);
                const label = status.replace(/-/g, ' ');
                const pct = totalUnits > 0 ? (units / totalUnits) * 100 : 0;
                return (
                  <motion.div key={status} variants={staggerItem}>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="capitalize text-ivory-300">{label}</span>
                      <span className="text-ivory-400/50">{units.toLocaleString()} units</span>
                    </div>
                    <div className="h-2 rounded-full bg-charcoal-800 overflow-hidden">
                      <div className="h-full bg-gold-500/60" style={{ width: `${pct}%` }} />
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
            <div className="text-[10px] text-ivory-400/30 mt-3">Sold-out buildings excluded.</div>
          </div>
        </Act>

        {/* Act 2 — Demand */}
        <Act number="02" eyebrow="Act Two" title="Demand" thesis="Florida migration hasn't slowed. Corporate relocations, state income-tax advantage, and Gulf-coast second-home buyers drive absorption — but the $2M+ tier is thinner than developer pro-formas assume.">
          <div className="grid grid-cols-2 gap-3">
            {demandDrivers.slice(0, 4).map((d, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={defaultViewport}
                transition={{ delay: i * 0.1 }}
                className="rounded-lg border border-ivory-100/10 bg-charcoal-900/60 p-4"
              >
                <div className="text-xl font-heading font-bold text-gold-400 mb-1">{d.stat}</div>
                <div className="text-xs text-ivory-300 font-medium mb-1">{d.title}</div>
                <div className="text-[11px] text-ivory-400/50 leading-snug line-clamp-3">{d.description}</div>
              </motion.div>
            ))}
          </div>
        </Act>

        {/* Act 3 — Ceiling */}
        <Act number="03" eyebrow="Act Three" title="The Ceiling" thesis={`The spread from lowest to highest PSF is a live stress test. Art House cleared the low end; Roche Bobois's Sky Penthouse sets the ceiling at $2,727/SF. Where the ceiling holds — or breaks — sets the next three years of pricing.`}>
          <div className="rounded-xl border border-ivory-100/10 bg-charcoal-900/60 p-6">
            <div className="text-xs text-ivory-400/50 mb-4">PSF Ladder — Active Priced Buildings</div>
            <div className="space-y-2 max-h-80 overflow-y-auto pr-2">
              {psfLadder.map((p) => (
                <div key={p.name} className="flex items-center gap-3">
                  <div className="text-xs text-ivory-300 truncate w-40 shrink-0">{p.name}</div>
                  <div className="flex-1 h-1.5 rounded-full bg-charcoal-800 overflow-hidden">
                    <div className="h-full bg-gold-500/50" style={{ width: `${(p.psf / maxPsf) * 100}%` }} />
                  </div>
                  <div className="text-xs text-gold-400 tabular-nums w-16 text-right">${p.psf.toLocaleString()}</div>
                </div>
              ))}
            </div>
          </div>
        </Act>
      </div>
    </section>
  );
}
