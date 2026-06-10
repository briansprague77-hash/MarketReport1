'use client';

import { useState, type FormEvent } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Button from '@/components/ui/Button';
import { fadeUp, staggerContainer, staggerItem, defaultViewport } from '@/lib/animations';
import { useAudience } from '@/lib/audience';

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

export default function ContactPage() {
  const { ctaLabel, isPro, tier } = useAudience();
  const [status, setStatus] = useState<FormStatus>('idle');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    interest: '',
    message: '',
  });

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus('submitting');

    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          source: 'contact-page',
        }),
      });

      if (!res.ok) throw new Error('Submission failed');
      setStatus('success');
      setFormData({ name: '', email: '', phone: '', interest: '', message: '' });
    } catch {
      setStatus('error');
    }
  }

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
                Get In Touch
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-ivory-50 leading-tight mb-4">
              {isPro ? (
                <>Schedule a <span className="text-gradient-gold">Broker Preview</span></>
              ) : (
                <>Schedule a <span className="text-gradient-gold">Presentation</span></>
              )}
            </h1>
            <p className="text-lg font-body text-ivory-300 leading-relaxed max-w-2xl">
              {isPro
                ? 'Whether you\'re advising a buyer, evaluating a development for your clients, or need project-specific market intelligence — let\'s talk.'
                : 'Explore Tampa Bay\'s newest luxury residences with a personalized market presentation. Get pricing, availability, and development insights tailored to your search.'}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Form + Info */}
      <section className="section-padding bg-ivory-50">
        <div className="container-luxury">
          <div className="grid md:grid-cols-5 gap-12 lg:gap-20">
            {/* Left: Form (3 cols) */}
            <motion.div
              className="md:col-span-3"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={defaultViewport}
            >
              {status === 'success' ? (
                <div className="bg-white border border-ivory-300 rounded-sm p-10 text-center">
                  <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gold-500/10 flex items-center justify-center">
                    <svg className="w-8 h-8 text-gold-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-heading font-bold text-charcoal-900 mb-3">
                    Thank You
                  </h3>
                  <p className="text-base font-body text-charcoal-500 leading-relaxed">
                    We&apos;ll be in touch within 24 hours. In the meantime, explore the
                    latest development reports.
                  </p>
                  <div className="mt-6">
                    <Button variant="primary" href="/developments/waldorf-astoria">
                      View Waldorf Astoria Report
                    </Button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-body font-semibold uppercase tracking-widest text-charcoal-500 mb-2">
                        Full Name
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData((f) => ({ ...f, name: e.target.value }))}
                        className="w-full px-4 py-3 bg-white border border-ivory-300 rounded-sm text-sm font-body text-charcoal-900 placeholder:text-charcoal-400 focus:outline-none focus:border-gold-500 transition-colors"
                        placeholder="Jane Smith"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-body font-semibold uppercase tracking-widest text-charcoal-500 mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData((f) => ({ ...f, email: e.target.value }))}
                        className="w-full px-4 py-3 bg-white border border-ivory-300 rounded-sm text-sm font-body text-charcoal-900 placeholder:text-charcoal-400 focus:outline-none focus:border-gold-500 transition-colors"
                        placeholder="jane@brokerage.com"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-body font-semibold uppercase tracking-widest text-charcoal-500 mb-2">
                        Phone
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData((f) => ({ ...f, phone: e.target.value }))}
                        className="w-full px-4 py-3 bg-white border border-ivory-300 rounded-sm text-sm font-body text-charcoal-900 placeholder:text-charcoal-400 focus:outline-none focus:border-gold-500 transition-colors"
                        placeholder="(727) 555-0100"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-body font-semibold uppercase tracking-widest text-charcoal-500 mb-2">
                        Interest
                      </label>
                      <select
                        value={formData.interest}
                        onChange={(e) => setFormData((f) => ({ ...f, interest: e.target.value }))}
                        className="w-full px-4 py-3 bg-white border border-ivory-300 rounded-sm text-sm font-body text-charcoal-900 focus:outline-none focus:border-gold-500 transition-colors"
                      >
                        <option value="">Select...</option>
                        {isPro ? (
                          <>
                            <option value="broker-preview">Schedule Broker Preview</option>
                            <option value="buyer-advisor">Advising a Buyer</option>
                            <option value="market-data">Market Data Request</option>
                            <option value="development-specific">Development-Specific Intel</option>
                            <option value="monthly-updates">Monthly Market Updates</option>
                            <option value="commission-info">Commission &amp; Co-Op Details</option>
                          </>
                        ) : (
                          <>
                            <option value="schedule-presentation">Schedule Presentation</option>
                            <option value="pricing-availability">Pricing &amp; Availability</option>
                            <option value="development-specific">Specific Development</option>
                            <option value="general-inquiry">General Inquiry</option>
                          </>
                        )}
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-body font-semibold uppercase tracking-widest text-charcoal-500 mb-2">
                      Message
                    </label>
                    <textarea
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData((f) => ({ ...f, message: e.target.value }))}
                      className="w-full px-4 py-3 bg-white border border-ivory-300 rounded-sm text-sm font-body text-charcoal-900 placeholder:text-charcoal-400 focus:outline-none focus:border-gold-500 transition-colors resize-none"
                      placeholder="Tell us about your needs..."
                    />
                  </div>

                  {status === 'error' && (
                    <p className="text-sm font-body text-red-600">
                      Something went wrong. Please try again or email directly.
                    </p>
                  )}

                  <Button type="submit" variant="primary" size="lg" fullWidth disabled={status === 'submitting'}>
                    {status === 'submitting' ? 'Sending...' : 'Submit Inquiry'}
                  </Button>

                  <p className="text-xs font-body text-charcoal-400 text-center">
                    Your information is kept confidential and will not be shared with third parties.
                  </p>
                </form>
              )}
            </motion.div>

            {/* Right: Info (2 cols) */}
            <motion.div
              className="md:col-span-2"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={defaultViewport}
            >
              {/* Featured image */}
              <motion.div variants={staggerItem} className="mb-10 overflow-hidden rounded-sm">
                <div className="relative h-[200px] md:h-[240px]">
                  <Image
                    src="/images/developments/waldorf-astoria/renderings/wa-lobby.jpg"
                    alt="Waldorf Astoria Residences lobby"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 40vw"
                    quality={85}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <span className="text-xs font-body font-semibold text-gold-400 uppercase tracking-[0.2em]">
                      Featured
                    </span>
                    <p className="text-sm font-heading font-medium text-ivory-50 mt-1">
                      Waldorf Astoria Residences, St. Petersburg
                    </p>
                  </div>
                </div>
              </motion.div>

              <motion.div variants={staggerItem} className="mb-10">
                <h3 className="text-lg font-heading font-bold text-charcoal-900 mb-4">
                  What to Expect
                </h3>
                <ul className="space-y-3">
                  {[
                    'Response within 24 hours',
                    'Customized market briefing for your client profile',
                    'Access to proprietary absorption and pricing data',
                    'No sales pitch — realtor-to-realtor intelligence',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-gold-500 shrink-0" />
                      <span className="text-sm font-body text-charcoal-600">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              <motion.div variants={staggerItem} className="mb-10">
                <h3 className="text-lg font-heading font-bold text-charcoal-900 mb-4">
                  Featured Reports
                </h3>
                <div className="space-y-3">
                  <a
                    href="/developments/waldorf-astoria"
                    className="block bg-white border border-ivory-300 rounded-sm p-4 hover:border-gold-500/30 hover:shadow-sm transition-all"
                  >
                    <div className="text-sm font-body font-semibold text-charcoal-900">
                      Waldorf Astoria Residences
                    </div>
                    <div className="text-xs font-body text-charcoal-500 mt-1">
                      163 units &middot; 20.2% sold &middot; $1,449 avg PSF
                    </div>
                  </a>
                </div>
              </motion.div>

              <motion.div
                variants={staggerItem}
                className="bg-charcoal-950 rounded-sm p-6"
              >
                <h3 className="text-base font-heading font-bold text-ivory-50 mb-3">
                  Brian Sprague
                </h3>
                <p className="text-sm font-body text-ivory-400 mb-1">
                  Licensed Florida Real Estate Broker FL BK3221171 &middot; Development Marketing Consultant
                </p>
                <p className="text-sm font-body text-ivory-400 mb-4">
                  Tampa Bay Real Estate
                </p>
                <p className="text-xs font-body text-charcoal-500 leading-relaxed">
                  Licensed Florida Real Estate Professional. Specializing in new
                  development market intelligence across the Tampa Bay metro.
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
