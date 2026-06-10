'use client';

import { motion } from 'framer-motion';
import Button from '@/components/ui/Button';
import ImageBreak from '@/components/ui/ImageBreak';
import Callout from '@/components/ui/Callout';
import SubmitCorrectionForm from '@/components/sections/shared/SubmitCorrectionForm';
import { author, methodology } from '@/data/market';
import { fadeUp, staggerContainer, staggerItem, defaultViewport } from '@/lib/animations';
import { useAudience } from '@/lib/audience';

export default function AboutPage() {
  const { ctaLabel } = useAudience();
  return (
    <>
      {/* Hero */}
      <section className="relative bg-charcoal-950 pt-32 pb-16">
        <div className="absolute inset-0 bg-gradient-to-br from-charcoal-950 via-charcoal-800 to-charcoal-950" />
        <div className="relative container-luxury">
          <motion.div variants={fadeUp} initial="hidden" animate="visible">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-8 bg-gold-500" />
              <span className="text-gold-500 text-xs font-body font-semibold uppercase tracking-[0.25em]">
                About
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-ivory-50 leading-tight mb-4">
              Market Intelligence, <br />
              <span className="text-gradient-gold">Not Marketing</span>
            </h1>
            <p className="text-lg font-body text-ivory-300 leading-relaxed max-w-2xl">
              The Tampa Bay Market Report exists to give real estate professionals
              the data they need — sourced, cited, and updated continuously.
            </p>
          </motion.div>
        </div>
      </section>

      {/* About Content */}
      <section className="section-padding bg-ivory-50">
        <div className="container-luxury">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-20">
            {/* Left: Bio */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={defaultViewport}
            >
              <h2 className="text-2xl md:text-3xl font-heading font-bold text-charcoal-900 mb-6">
                {author.name}
              </h2>
              <p className="text-sm font-body text-charcoal-500 uppercase tracking-widest mb-4">
                {author.title}
              </p>
              <p className="text-base font-body text-charcoal-600 leading-relaxed mb-6">
                {author.bio}
              </p>
              <ul className="space-y-3 mb-8">
                {author.credentials.map((cred) => (
                  <li key={cred} className="flex items-start gap-3">
                    <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-gold-500 shrink-0" />
                    <span className="text-sm font-body text-charcoal-700">{cred}</span>
                  </li>
                ))}
              </ul>
              <Button variant="primary" href="/contact">
                {ctaLabel}
              </Button>
            </motion.div>

            {/* Right: Philosophy */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={defaultViewport}
            >
              <div className="bg-charcoal-950 rounded-sm p-8 md:p-10">
                <h3 className="text-xl font-heading font-bold text-ivory-50 mb-6">
                  Our Approach
                </h3>
                <div className="space-y-6">
                  {[
                    {
                      title: 'Source Everything',
                      desc: 'Every data point has a cited source. MLS, developer disclosures, county records. No unsourced claims.',
                    },
                    {
                      title: 'Say It Out Loud',
                      desc: 'The things realtors discuss privately but rarely put in writing. Commission structures, absorption realities, and pricing soft spots.',
                    },
                    {
                      title: 'Cross-Reference',
                      desc: 'When sources disagree, we disclose the discrepancy. Transparency over spin.',
                    },
                    {
                      title: 'Update Continuously',
                      desc: 'Markets move fast. Our data is refreshed with each new MLS entry, closing, or developer update.',
                    },
                  ].map((item) => (
                    <div key={item.title}>
                      <h4 className="text-sm font-body font-semibold text-gold-500 uppercase tracking-wide mb-1">
                        {item.title}
                      </h4>
                      <p className="text-sm font-body text-ivory-400 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Visual break — terrace lifestyle */}
      <ImageBreak
        src="/images/developments/waldorf-astoria/renderings/wa-terrace.jpg"
        alt="Luxury waterfront terrace overlooking Tampa Bay"
        eyebrow="Our Standard"
        caption="Every data point sourced. Every claim verified. Intelligence you can stake your reputation on."
        height="md"
        overlay="heavy"
      />

      {/* Philosophy callout */}
      <Callout
        variant="quote"
        theme="dark"
        eyebrow="Our Mission"
        attribution="Tampa Bay Market Report"
      >
        The things realtors discuss privately but rarely put in writing — we put in writing.
      </Callout>

      {/* Methodology */}
      <section className="section-padding bg-ivory-100 border-t border-ivory-300">
        <div className="container-luxury">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={defaultViewport}
            className="max-w-3xl mx-auto text-center mb-12"
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-px w-8 bg-gold-500" />
              <span className="text-gold-500 text-xs font-body font-semibold uppercase tracking-[0.2em]">
                Methodology
              </span>
              <div className="h-px w-8 bg-gold-500" />
            </div>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-charcoal-900 mb-4">
              How We Get Our Data
            </h2>
            <p className="text-base font-body text-charcoal-500 leading-relaxed">
              {methodology.overview}
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={defaultViewport}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {methodology.sources.map((source, i) => (
              <motion.div
                key={source.name}
                variants={staggerItem}
                className="bg-white border border-ivory-300 rounded-sm p-6 hover:shadow-md transition-shadow"
              >
                <div className="text-xs font-body font-semibold text-gold-500 uppercase tracking-widest mb-3">
                  Source {i + 1}
                </div>
                <h4 className="text-base font-heading font-bold text-charcoal-900 mb-2">
                  {source.name}
                </h4>
                <p className="text-sm font-body text-charcoal-500 leading-relaxed">
                  {source.description}
                </p>
              </motion.div>
            ))}
          </motion.div>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={defaultViewport}
            className="mt-10 text-center text-xs font-body text-charcoal-400 max-w-2xl mx-auto leading-relaxed"
          >
            {methodology.disclaimer}
          </motion.p>
        </div>
      </section>

      {/* ─── Submit a Correction ───────────────────────────────────────── */}
      <section className="bg-charcoal-950 py-20 border-t border-ivory-100/5">
        <div className="container-luxury max-w-3xl">
          <motion.div
            initial="hidden" whileInView="visible" viewport={defaultViewport} variants={fadeUp}
            className="mb-8 text-center"
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-px w-8 bg-gold-500" />
              <span className="text-gold-500 text-xs font-body font-semibold uppercase tracking-[0.25em]">
                Help Us Get It Right
              </span>
              <div className="h-px w-8 bg-gold-500" />
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white mb-3">
              Spotted Something Wrong?
            </h2>
            <p className="text-ivory-400/70 max-w-2xl mx-auto">
              Prices shift, closings happen, phone trees drop developers&rsquo; names.
              If you see a data point that&rsquo;s stale, wrong, or missing, flag it.
              Brian reads every submission.
            </p>
          </motion.div>
          <SubmitCorrectionForm sourceContext="about-page" />
        </div>
      </section>
    </>
  );
}
