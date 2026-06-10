'use client';

import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Building2, TrendingUp, KeyRound } from 'lucide-react';
import {
  heroTitle,
  heroSubtitle,
  heroCtas,
  fadeUp,
  staggerContainer,
  staggerItem,
  defaultViewport,
} from '@/lib/animations';
import { competitorReferences, trackedDevelopments } from '@/data/market';

// ─── Resale-only / completed building model ──────────────────────────────────
// A building belongs here when the developer has sold out and the only way in is
// the resale market. Distinct from "delivering" towers (Reflection, 400 Central,
// Art House) that still hold developer inventory — those live in the pipeline.

interface ResaleBuilding {
  name: string;
  location: string;
  units?: number;
  resalePsf?: number;
  delivered?: string;
  note: string;
}

function buildResaleSet(): ResaleBuilding[] {
  // 1. Competitor references flagged resale-only (Saltaire, ONE St. Pete)
  const fromRefs: ResaleBuilding[] = competitorReferences.map((c) => ({
    name: c.name,
    location: c.location,
    units: c.units,
    resalePsf: c.avgPsf,
    delivered: c.delivery,
    note: c.note,
  }));

  // 2. Tracked developments that are sold out → resale-only (Tampa EDITION, Altura)
  const fromTracked: ResaleBuilding[] = trackedDevelopments
    .filter((d) => d.status === 'sold-out')
    .map((d) => ({
      name: d.name,
      location: d.submarket ?? d.location,
      units: d.units,
      resalePsf: d.resalePsf ?? d.avgPsf,
      delivered: d.delivery,
      note:
        d.description?.split('. ').slice(0, 1).join('. ') ||
        'Developer sold out — resale market only.',
    }));

  // Dedupe by name, sort by resale PSF desc
  const seen = new Set<string>();
  return [...fromRefs, ...fromTracked]
    .filter((b) => (seen.has(b.name) ? false : (seen.add(b.name), true)))
    .sort((a, b) => (b.resalePsf ?? 0) - (a.resalePsf ?? 0));
}

export default function ResaleMarketClient() {
  const buildings = useMemo(buildResaleSet, []);

  // ── Lead form state ──
  const [form, setForm] = useState({ name: '', email: '', phone: '', building: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'done' | 'error'>('idle');

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.email) return;
    setStatus('sending');
    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: form.email,
          name: form.name,
          phone: form.phone,
          development: form.building || undefined,
          source: 'resale-market',
          interest: 'resale',
          message: form.message || undefined,
        }),
      });
      setStatus(res.ok ? 'done' : 'error');
    } catch {
      setStatus('error');
    }
  }

  return (
    <main className="min-h-screen">
      {/* ─── Hero ────────────────────────────────────────────────────────── */}
      <section className="relative pt-32 pb-16 bg-charcoal-950 overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                'radial-gradient(circle at 30% 20%, rgba(201,168,76,0.15) 0%, transparent 50%)',
            }}
          />
        </div>
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.p
            initial="hidden" animate="visible" variants={heroCtas}
            className="text-xs font-body font-semibold uppercase tracking-[0.3em] text-gold-500 mb-4"
          >
            Completed Towers — Resale Market
          </motion.p>
          <motion.h1
            initial="hidden" animate="visible" variants={heroTitle}
            className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-ivory-50 mb-6 leading-tight"
          >
            The Resale Market
          </motion.h1>
          <motion.p
            initial="hidden" animate="visible" variants={heroSubtitle}
            className="text-lg md:text-xl font-body text-charcoal-400 max-w-3xl mx-auto mb-4 leading-relaxed"
          >
            Tampa Bay&rsquo;s sold-out, delivered towers — where the developer is gone
            and the only way in is the resale market. Benchmark pricing, sourced from
            Stellar MLS. No spin.
          </motion.p>
          <motion.p
            initial="hidden" animate="visible" variants={heroSubtitle}
            className="text-sm font-body italic text-charcoal-500 max-w-2xl mx-auto"
          >
            Buying or selling in one of these buildings? Get a sourced CMA — not a flyer.
          </motion.p>
        </div>
      </section>

      {/* ─── Resale Building Cards ───────────────────────────────────────── */}
      <section className="py-16 bg-ivory-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            initial="hidden" whileInView="visible" viewport={defaultViewport}
            variants={staggerContainer}
          >
            {buildings.map((b) => (
              <motion.div
                key={b.name}
                variants={staggerItem}
                className="bg-white rounded-xl border border-charcoal-100 shadow-lg p-6 flex flex-col hover:shadow-xl transition-shadow"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-lg font-heading font-bold text-charcoal-900">{b.name}</h3>
                    <p className="text-sm font-body text-charcoal-500">{b.location}</p>
                  </div>
                  <span className="shrink-0 inline-flex items-center gap-1 rounded-full bg-charcoal-100 px-2.5 py-1 text-[10px] font-body font-bold uppercase tracking-wider text-charcoal-600">
                    Resale Only
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-3 my-4">
                  <Stat icon={<TrendingUp className="h-4 w-4" />} label="Resale $/SF" value={b.resalePsf ? `$${b.resalePsf.toLocaleString()}` : '—'} />
                  <Stat icon={<Building2 className="h-4 w-4" />} label="Units" value={b.units ? b.units.toLocaleString() : '—'} />
                  <Stat icon={<KeyRound className="h-4 w-4" />} label="Status" value={b.delivered || 'Delivered'} />
                </div>

                <p className="text-xs font-body text-charcoal-500 leading-relaxed flex-1">{b.note}</p>

                <button
                  onClick={() => {
                    setForm((f) => ({ ...f, building: b.name }));
                    document.getElementById('resale-lead')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="mt-5 w-full rounded-lg bg-charcoal-900 hover:bg-charcoal-800 text-ivory-50 text-sm font-body font-semibold py-2.5 transition-colors"
                >
                  Get resale intel on {b.name.split(' ').slice(0, 2).join(' ')}
                </button>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── Lead Capture ────────────────────────────────────────────────── */}
      <section id="resale-lead" className="py-20 bg-charcoal-950 border-t border-ivory-100/5">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden" whileInView="visible" viewport={defaultViewport} variants={fadeUp}
            className="text-center mb-8"
          >
            <p className="text-xs font-body font-semibold uppercase tracking-[0.25em] text-gold-500 mb-3">
              Work With a Broker, Not a Flyer
            </p>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-ivory-50 mb-3">
              Resale CMA &amp; Market Intel
            </h2>
            <p className="text-sm font-body text-charcoal-400 max-w-xl mx-auto">
              Tell me which building you&rsquo;re watching. I&rsquo;ll send sourced resale
              comps, current active/pending listings, and where pricing is actually clearing.
            </p>
          </motion.div>

          {status === 'done' ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              className="rounded-xl border border-gold-500/30 bg-gold-500/5 p-8 text-center"
            >
              <h3 className="text-xl font-heading font-bold text-ivory-50 mb-2">Got it — thank you.</h3>
              <p className="text-sm font-body text-charcoal-400">
                Your request is in. Brian reads every one and will follow up with sourced data.
              </p>
            </motion.div>
          ) : (
            <motion.form
              onSubmit={submit}
              initial="hidden" whileInView="visible" viewport={defaultViewport} variants={fadeUp}
              className="space-y-4"
            >
              <div className="grid sm:grid-cols-2 gap-4">
                <input
                  type="text" placeholder="Name"
                  value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full rounded-lg border border-charcoal-700 bg-charcoal-900/60 px-4 py-3 text-sm font-body text-ivory-100 placeholder-charcoal-500 focus:border-gold-500/50 focus:outline-none"
                />
                <input
                  type="email" required placeholder="Email *"
                  value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full rounded-lg border border-charcoal-700 bg-charcoal-900/60 px-4 py-3 text-sm font-body text-ivory-100 placeholder-charcoal-500 focus:border-gold-500/50 focus:outline-none"
                />
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <input
                  type="tel" placeholder="Phone"
                  value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="w-full rounded-lg border border-charcoal-700 bg-charcoal-900/60 px-4 py-3 text-sm font-body text-ivory-100 placeholder-charcoal-500 focus:border-gold-500/50 focus:outline-none"
                />
                <select
                  value={form.building} onChange={(e) => setForm({ ...form, building: e.target.value })}
                  className="w-full rounded-lg border border-charcoal-700 bg-charcoal-900/60 px-4 py-3 text-sm font-body text-ivory-100 focus:border-gold-500/50 focus:outline-none"
                >
                  <option value="">Building of interest…</option>
                  {buildings.map((b) => (
                    <option key={b.name} value={b.name}>{b.name}</option>
                  ))}
                </select>
              </div>
              <textarea
                placeholder="Buying, selling, or just tracking? (optional)" rows={3}
                value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full rounded-lg border border-charcoal-700 bg-charcoal-900/60 px-4 py-3 text-sm font-body text-ivory-100 placeholder-charcoal-500 focus:border-gold-500/50 focus:outline-none"
              />
              {status === 'error' && (
                <p className="text-sm font-body text-red-400">Something went wrong — try again or email brian@historicstpete.com.</p>
              )}
              <button
                type="submit" disabled={status === 'sending'}
                className="w-full rounded-lg bg-gold-500 hover:bg-gold-400 disabled:opacity-60 text-charcoal-950 text-sm font-body font-bold uppercase tracking-wide py-3.5 transition-colors"
              >
                {status === 'sending' ? 'Sending…' : 'Request Resale Intel'}
              </button>
            </motion.form>
          )}
        </div>
      </section>
    </main>
  );
}

function Stat({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="text-center">
      <div className="flex items-center justify-center text-gold-600 mb-1">{icon}</div>
      <div className="text-sm font-heading font-bold text-charcoal-900 leading-tight">{value}</div>
      <div className="text-[10px] font-body uppercase tracking-wide text-charcoal-400">{label}</div>
    </div>
  );
}
