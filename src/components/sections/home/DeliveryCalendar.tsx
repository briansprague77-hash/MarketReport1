'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { trackedDevelopments } from '@/data/market';
import { fadeUp, staggerContainer, staggerItem, defaultViewport } from '@/lib/animations';
import Badge from '@/components/ui/Badge';

// Parse "Q2 2026" / "Q4 2026" / "2027" / "Late 2026" / "~2029" into a (year, quarter) pair.
// For range strings like "Q1-Q2 2027" or "Spring-Summer 2026", returns the STARTING quarter
// (the quarter in which delivery begins). Returns null if not parseable (e.g. "TBD").
function parseDelivery(delivery?: string): { year: number; quarter: number } | null {
  if (!delivery) return null;
  const qMatch = delivery.match(/Q([1-4]).*?(\d{4})/);
  if (qMatch) return { year: +qMatch[2], quarter: +qMatch[1] };
  const yearMatch = delivery.match(/(\d{4})/);
  if (yearMatch) {
    const year = +yearMatch[1];
    // Guess quarter from words
    if (/early|Q1|spring/i.test(delivery)) return { year, quarter: 1 };
    if (/summer|Q2/i.test(delivery)) return { year, quarter: 2 };
    if (/fall|autumn|Q3/i.test(delivery)) return { year, quarter: 3 };
    if (/winter|late|Q4/i.test(delivery)) return { year, quarter: 4 };
    return { year, quarter: 2 }; // default mid-year
  }
  return null;
}

interface QuarterBucket {
  label: string;
  year: number;
  quarter: number;
  devs: typeof trackedDevelopments;
  units: number;
}

export default function DeliveryCalendar() {
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => {
    setNow(new Date());
  }, []);

  if (!now) {
    // Placeholder skeleton — prevents hydration mismatch while we resolve "now" on client.
    return (
      <section className="py-20 bg-charcoal-900/40">
        <div className="container-luxury">
          <div className="h-32" />
        </div>
      </section>
    );
  }

  const currentQ = Math.floor(now.getMonth() / 3) + 1;
  const currentYear = now.getFullYear();

  const buckets: QuarterBucket[] = [];
  for (let i = 0; i < 6; i++) {
    const q = ((currentQ - 1 + i) % 4) + 1;
    const y = currentYear + Math.floor((currentQ - 1 + i) / 4);
    buckets.push({ label: `Q${q} ${y}`, year: y, quarter: q, devs: [], units: 0 });
  }

  for (const d of trackedDevelopments) {
    if (d.status === 'sold-out' || d.status === 'shadow-inventory') continue;
    const parsed = parseDelivery(d.delivery);
    if (!parsed) continue;
    const bucket = buckets.find((b) => b.year === parsed.year && b.quarter === parsed.quarter);
    if (bucket) {
      bucket.devs.push(d);
      bucket.units += d.units ?? 0;
    }
  }

  const maxUnits = Math.max(1, ...buckets.map((b) => b.units));

  return (
    <section className="py-20 bg-charcoal-900/40">
      <div className="container-luxury">
        <motion.div initial="hidden" whileInView="visible" viewport={defaultViewport} variants={fadeUp} className="mb-10">
          <Badge label="Delivery Calendar" variant="gold" />
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white mt-4 mb-2">
            Next 18 Months
          </h2>
          <p className="text-ivory-400/60 max-w-2xl">
            Units hitting market each quarter. Click a quarter to filter the developments page.
          </p>
        </motion.div>

        <motion.div
          initial="hidden" whileInView="visible" viewport={defaultViewport} variants={staggerContainer}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3"
        >
          {buckets.map((b) => (
            <motion.div key={b.label} variants={staggerItem} className="h-full">
              <Link href={`/developments?delivery=${encodeURIComponent(b.label)}`} className="flex h-full">
                <div className="group flex flex-col w-full rounded-xl border border-ivory-100/10 bg-charcoal-900/60 hover:border-gold-500/30 transition-all p-5 h-full">
                  <div className="text-xs text-ivory-400/50 mb-2 group-hover:text-ivory-200 transition-colors">{b.label}</div>
                  <div className="text-2xl font-heading font-bold text-gold-400 mb-1">
                    {b.devs.length}
                  </div>
                  <div className="text-xs text-ivory-400/60 mb-3">
                    {b.devs.length === 1 ? 'delivery' : 'deliveries'}
                  </div>
                  <div className="text-sm text-ivory-200 mb-2">{b.units.toLocaleString()} units</div>
                  {/* Bar proportion */}
                  <div className="h-1.5 rounded-full bg-charcoal-800 overflow-hidden mt-auto">
                    <div className="h-full bg-gold-500/60" style={{ width: `${(b.units / maxUnits) * 100}%` }} />
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
