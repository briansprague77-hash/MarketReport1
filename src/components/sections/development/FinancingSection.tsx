'use client';

import { motion } from 'framer-motion';
import { Development } from '@/types/development';
import SectionHeader from '@/components/ui/SectionHeader';
import { useAudience } from '@/lib/audience';
import {
  fadeUp,
  slideLeft,
  slideRight,
  staggerContainer,
  staggerItem,
  defaultViewport,
} from '@/lib/animations';

interface FinancingSectionProps {
  development: Development;
}

export default function FinancingSection({ development }: FinancingSectionProps) {
  const { tier } = useAudience();
  const { financing } = development;

  // Profile-only developments don't carry a FinancingInfo block — skip gracefully
  if (!financing || !financing.preConstruction || !financing.jumboLoanParams || !financing.lenders) {
    return null;
  }

  const showJumboParams = development.status === 'delivered';
  const isConsumer = tier === 'consumer';

  return (
    <section id="financing" className="section-padding bg-ivory-100">
      <div className="container-luxury">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
        >
          <SectionHeader
            eyebrow="Financing Intelligence"
            title="Transaction Structure"
            subtitle={showJumboParams
              ? isConsumer
                ? "Deposit structure, jumbo qualification parameters, and institutional lender contacts — everything for a smooth close."
                : "Deposit structure and jumbo qualification parameters — everything your client needs for a smooth close."
              : isConsumer
                ? "Deposit structure and institutional lender contacts — everything for a smooth pre-construction close."
                : "Deposit structure and pre-approval strategy — everything your client needs for a smooth pre-construction close."
            }
          />
        </motion.div>

        {/* ── Financing Narrative ── */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          className="mb-10 max-w-3xl"
        >
          <p className="text-sm font-body text-charcoal-600 leading-relaxed">
            Pre-construction financing operates on a fundamentally different
            structure than a standard resale purchase. There is no mortgage at
            contract — buyers put down a deposit (typically 20-30% of the purchase
            price) in stages over the construction period, and the balance isn&apos;t
            due until closing, which can be 18-36 months out. This means the buyer
            needs liquidity for the deposit schedule but does not need a mortgage
            commitment until the building is ready to deliver. For properties in
            this price tier, closing will typically require a jumbo loan with
            stricter qualification parameters: higher credit scores, lower
            debt-to-income ratios, and significant cash reserves. The data below
            breaks down the exact deposit schedule, qualification benchmarks, and
            institutional lenders experienced with this building — the operational
            detail you need to structure a smooth transaction.
          </p>
        </motion.div>

        <div className={`grid ${showJumboParams ? 'lg:grid-cols-2' : 'lg:grid-cols-1 max-w-2xl'} gap-8 mb-12`}>
          {/* Pre-Construction Terms */}
          <motion.div
            className="bg-white border border-ivory-300 rounded-sm p-8"
            variants={slideLeft}
            initial="hidden"
            whileInView="visible"
            viewport={defaultViewport}
          >
            <h3 className="text-sm font-body font-semibold uppercase tracking-widest text-gold-600 mb-6">
              Pre-Construction Deposit Structure
            </h3>
            <div className="space-y-5">
              <div className="flex items-center justify-between py-3 border-b border-ivory-200">
                <span className="text-sm font-body text-charcoal-600">Deposit Required</span>
                <span className="text-lg font-heading font-bold text-charcoal-900">
                  {financing.preConstruction.depositPercent}%
                </span>
              </div>
              <div className="flex items-center justify-between py-3 border-b border-ivory-200">
                <span className="text-sm font-body text-charcoal-600">Balance at Closing</span>
                <span className="text-lg font-heading font-bold text-charcoal-900">
                  {financing.preConstruction.balancePercent}%
                </span>
              </div>
              <div className="flex items-center justify-between py-3 border-b border-ivory-200">
                <span className="text-sm font-body text-charcoal-600">Closing Phase</span>
                <span className="text-lg font-heading font-bold text-charcoal-900">
                  {financing.preConstruction.closingPhase}
                </span>
              </div>
            </div>
            <div className="mt-6 bg-gold-500/5 border border-gold-500/20 rounded-sm p-4">
              <p className="text-xs font-body text-charcoal-600 leading-relaxed">
                <span className="font-semibold text-gold-600">Strategy: </span>
                {financing.preConstruction.preApprovalStrategy}
              </p>
            </div>
          </motion.div>

          {/* Jumbo Loan Parameters — only shown for delivering/delivered buildings */}
          {showJumboParams && (
            <motion.div
              className="bg-white border border-ivory-300 rounded-sm p-8"
              variants={slideRight}
              initial="hidden"
              whileInView="visible"
              viewport={defaultViewport}
            >
              <h3 className="text-sm font-body font-semibold uppercase tracking-widest text-gold-600 mb-6">
                Jumbo Loan Parameters
              </h3>
              <div className="space-y-5">
                <div className="flex items-center justify-between py-3 border-b border-ivory-200">
                  <span className="text-sm font-body text-charcoal-600">Min Down Payment</span>
                  <span className="text-lg font-heading font-bold text-charcoal-900">
                    {financing.jumboLoanParams.minDownPayment}
                  </span>
                </div>
                <div className="flex items-center justify-between py-3 border-b border-ivory-200">
                  <span className="text-sm font-body text-charcoal-600">Credit Score Min</span>
                  <span className="text-lg font-heading font-bold text-charcoal-900">
                    {financing.jumboLoanParams.creditScoreMin}
                  </span>
                </div>
                <div className="flex items-center justify-between py-3 border-b border-ivory-200">
                  <span className="text-sm font-body text-charcoal-600">DTI Ratio</span>
                  <span className="text-lg font-heading font-bold text-charcoal-900">
                    {financing.jumboLoanParams.dtiRatio}
                  </span>
                </div>
                <div className="flex items-center justify-between py-3 border-b border-ivory-200">
                  <span className="text-sm font-body text-charcoal-600">Cash Reserves</span>
                  <span className="text-lg font-heading font-bold text-charcoal-900">
                    {financing.jumboLoanParams.cashReserves}
                  </span>
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {/* Institutional Lenders — consumer-facing only */}
        {isConsumer && (
          <motion.div
            className="bg-white border border-ivory-300 rounded-sm p-8"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={defaultViewport}
          >
            <h3 className="text-sm font-body font-semibold uppercase tracking-widest text-gold-600 mb-6">
              Institutional Lender Relationships
            </h3>
            <motion.div
              className="grid md:grid-cols-2 gap-4 mb-6"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={defaultViewport}
            >
              {financing.lenders.map((lender, i) => (
                <motion.div
                  key={i}
                  className="flex items-start gap-4 p-4 bg-ivory-50 border border-ivory-200 rounded-sm hover:border-gold-500/20 transition-all duration-300"
                  variants={staggerItem}
                  whileHover={{ x: 4 }}
                >
                  <div className="w-10 h-10 rounded-full bg-charcoal-800 flex items-center justify-center shrink-0">
                    <span className="text-gold-500 text-sm font-heading font-bold">
                      {lender.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <h4 className="text-sm font-body font-semibold text-charcoal-900">
                      {lender.name}
                    </h4>
                    <p className="text-xs font-body text-charcoal-500 mt-0.5">{lender.specialty}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
            <div className="bg-gold-500/5 border border-gold-500/20 rounded-sm p-4">
              <p className="text-xs font-body text-charcoal-600 leading-relaxed">
                <span className="font-semibold text-gold-600">Advisory: </span>
                {financing.advisory}
              </p>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
