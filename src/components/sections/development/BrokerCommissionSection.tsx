'use client';

import { motion } from 'framer-motion';
import { Development } from '@/types/development';
import SectionHeader from '@/components/ui/SectionHeader';
import { useAudience } from '@/lib/audience';
import {
  fadeUp,
  staggerContainer,
  staggerItem,
  defaultViewport,
} from '@/lib/animations';

interface BrokerCommissionSectionProps {
  development: Development;
}

export default function BrokerCommissionSection({ development }: BrokerCommissionSectionProps) {
  const { isPro } = useAudience();
  const commission = development.brokerCommission;

  // Only visible to realtors and sales agents — hidden from consumers
  if (!isPro || !commission) return null;

  const totalPercent = commission.payoutSchedule.reduce((sum, p) => sum + p.percent, 0);

  return (
    <section id="broker-commission" className="section-padding bg-ivory-100">
      <div className="container-luxury">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
        >
          <SectionHeader
            eyebrow="Broker Intelligence"
            title="Commission & Payout Structure"
            subtitle="Co-op commission details, payout schedule, and registration requirements for cooperating brokers."
          />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Co-Op Commission Card */}
          <motion.div
            className="bg-white border border-ivory-300 rounded-sm p-8"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={defaultViewport}
          >
            <h3 className="text-sm font-body font-semibold uppercase tracking-widest text-gold-600 mb-6">
              Co-Op Commission
            </h3>
            <div className="flex items-center gap-6 mb-6">
              <div className="w-20 h-20 rounded-full bg-charcoal-800 flex items-center justify-center shrink-0">
                <span className="text-gold-500 text-2xl font-heading font-bold">
                  {commission.coOpPercent}%
                </span>
              </div>
              <div>
                <p className="text-lg font-heading font-bold text-charcoal-900">
                  {commission.coOpPercent}% Co-Op Commission
                </p>
                <p className="text-sm font-body text-charcoal-500 mt-1">
                  Paid by {commission.paidBy}
                </p>
              </div>
            </div>
            {commission.additionalNotes && commission.additionalNotes.length > 0 && (
              <div className="space-y-2">
                {commission.additionalNotes.map((note, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <span className="text-gold-500 mt-0.5 shrink-0">•</span>
                    <p className="text-xs font-body text-charcoal-600 leading-relaxed">{note}</p>
                  </div>
                ))}
              </div>
            )}
          </motion.div>

          {/* Payout Schedule Card */}
          <motion.div
            className="bg-white border border-ivory-300 rounded-sm p-8"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={defaultViewport}
          >
            <h3 className="text-sm font-body font-semibold uppercase tracking-widest text-gold-600 mb-6">
              Payout Schedule
            </h3>
            <motion.div
              className="space-y-4 mb-6"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={defaultViewport}
            >
              {commission.payoutSchedule.map((payout, i) => (
                <motion.div
                  key={i}
                  className="flex items-center justify-between py-3 border-b border-ivory-200"
                  variants={staggerItem}
                >
                  <span className="text-sm font-body text-charcoal-600">{payout.label}</span>
                  <span className="text-lg font-heading font-bold text-charcoal-900">
                    {payout.percent}%
                  </span>
                </motion.div>
              ))}
              <div className="flex items-center justify-between py-3 border-b border-ivory-200">
                <span className="text-sm font-body font-semibold text-charcoal-700">Total</span>
                <span className="text-lg font-heading font-bold text-gold-600">
                  {totalPercent}%
                </span>
              </div>
            </motion.div>

            {/* Visual payout bar */}
            <div className="h-3 bg-ivory-200 rounded-full overflow-hidden flex">
              {commission.payoutSchedule.map((payout, i) => (
                <div
                  key={i}
                  className={`h-full ${i === 0 ? 'bg-gold-500' : 'bg-charcoal-800'}`}
                  style={{ width: `${payout.percent}%` }}
                />
              ))}
            </div>
            <div className="flex justify-between mt-2">
              {commission.payoutSchedule.map((payout, i) => (
                <span key={i} className="text-[10px] font-body text-charcoal-400">
                  {payout.label}
                </span>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Registration & Bonus Info */}
        <motion.div
          className="bg-white border border-ivory-300 rounded-sm p-8"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
        >
          <div className="grid md:grid-cols-2 gap-8">
            {/* Registration Requirements */}
            {commission.registrationRequired && (
              <div>
                <h3 className="text-sm font-body font-semibold uppercase tracking-widest text-gold-600 mb-4">
                  Registration Requirements
                </h3>
                <div className="flex items-start gap-3 p-4 bg-ivory-50 border border-ivory-200 rounded-sm">
                  <div className="w-8 h-8 rounded-full bg-gold-500/10 flex items-center justify-center shrink-0 mt-0.5">
                    <svg className="w-4 h-4 text-gold-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-body font-semibold text-charcoal-900 mb-1">
                      Registration Required
                    </p>
                    {commission.registrationNotes && (
                      <p className="text-xs font-body text-charcoal-600 leading-relaxed">
                        {commission.registrationNotes}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Bonus / Incentive Programs */}
            {(commission.bonusProgram || commission.bonusContact) && (
              <div>
                <h3 className="text-sm font-body font-semibold uppercase tracking-widest text-gold-600 mb-4">
                  Incentive Programs
                </h3>
                <div className="flex items-start gap-3 p-4 bg-ivory-50 border border-ivory-200 rounded-sm">
                  <div className="w-8 h-8 rounded-full bg-gold-500/10 flex items-center justify-center shrink-0 mt-0.5">
                    <svg className="w-4 h-4 text-gold-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    {commission.bonusProgram && (
                      <p className="text-sm font-body font-semibold text-charcoal-900 mb-1">
                        {commission.bonusProgram}
                      </p>
                    )}
                    {commission.bonusContact && (
                      <p className="text-xs font-body text-charcoal-600 leading-relaxed">
                        {commission.bonusContact}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
