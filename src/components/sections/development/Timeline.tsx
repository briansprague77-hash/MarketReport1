'use client';

import { motion } from 'framer-motion';
import { Development } from '@/types/development';
import SectionHeader from '@/components/ui/SectionHeader';
import {
  fadeUp,
  staggerContainer,
  staggerItem,
  defaultViewport,
} from '@/lib/animations';
import { CheckCircle2, Clock, ArrowRight } from 'lucide-react';

interface TimelineProps {
  development: Development;
}

const statusStyles: Record<
  string,
  { dot: string; line: string; badge: string; badgeText: string }
> = {
  completed: {
    dot: 'bg-emerald-500',
    line: 'bg-emerald-500/30',
    badge: 'bg-emerald-500/10 border-emerald-500/30',
    badgeText: 'text-emerald-600',
  },
  active: {
    dot: 'bg-gold-500 ring-4 ring-gold-500/20',
    line: 'bg-gold-500/30',
    badge: 'bg-gold-500/10 border-gold-500/30',
    badgeText: 'text-gold-600',
  },
  upcoming: {
    dot: 'bg-charcoal-300',
    line: 'bg-charcoal-200',
    badge: 'bg-charcoal-100 border-charcoal-200',
    badgeText: 'text-charcoal-500',
  },
};

export default function Timeline({ development }: TimelineProps) {
  const { timeline } = development;

  if (!timeline || timeline.length === 0) return null;

  return (
    <section id="timeline" className="section-padding bg-ivory-50">
      <div className="container-luxury">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
        >
          <SectionHeader
            eyebrow="Development Timeline"
            title="Project Milestones"
            subtitle="Key milestones from approval through projected delivery — the narrative your clients need to understand this project's trajectory."
          />
        </motion.div>

        <motion.div
          className="relative"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
        >
          {/* Vertical line */}
          <div className="absolute left-[18px] md:left-[22px] top-0 bottom-0 w-px bg-charcoal-200" />

          <div className="space-y-0">
            {timeline.map((event, index) => {
              const styles = statusStyles[event.status] || statusStyles.upcoming;
              const StatusIcon =
                event.status === 'completed'
                  ? CheckCircle2
                  : event.status === 'active'
                    ? Clock
                    : ArrowRight;

              return (
                <motion.div
                  key={index}
                  variants={staggerItem}
                  className="relative flex gap-5 md:gap-8 pb-10 last:pb-0"
                >
                  {/* Dot */}
                  <div className="relative z-10 flex-shrink-0 mt-1">
                    <div
                      className={`w-[10px] h-[10px] md:w-[12px] md:h-[12px] rounded-full ${styles.dot}`}
                      style={{ marginLeft: '13px' }}
                    />
                  </div>

                  {/* Content card */}
                  <div
                    className={`flex-1 rounded-xl border p-5 md:p-6 ${
                      event.status === 'active'
                        ? 'border-gold-500/30 bg-gold-500/5 shadow-sm'
                        : 'border-charcoal-200/60 bg-white'
                    }`}
                  >
                    <div className="flex flex-wrap items-center gap-3 mb-2">
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-body font-semibold border ${styles.badge} ${styles.badgeText}`}
                      >
                        <StatusIcon className="h-3 w-3" />
                        {event.status === 'completed'
                          ? 'Completed'
                          : event.status === 'active'
                            ? 'Current'
                            : 'Upcoming'}
                      </span>
                      <span className="text-sm font-body font-semibold text-charcoal-600">
                        {event.date}
                      </span>
                    </div>

                    <h3 className="text-lg font-heading font-bold text-charcoal-900 mb-2">
                      {event.title}
                    </h3>
                    <p className="text-charcoal-600 font-body text-sm leading-relaxed">
                      {event.description}
                    </p>

                    {event.absorption && (
                      <div className="mt-3 inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-charcoal-100/60 border border-charcoal-200/40">
                        <span className="text-xs font-body font-bold text-charcoal-700">
                          Absorption:
                        </span>
                        <span className="text-xs font-body text-charcoal-600">
                          {event.absorption}
                        </span>
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
