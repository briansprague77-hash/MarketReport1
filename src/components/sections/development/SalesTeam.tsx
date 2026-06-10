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
import { Building2, User, MapPin, Phone, Mail } from 'lucide-react';

interface SalesTeamProps {
  development: Development;
}

export default function SalesTeam({ development }: SalesTeamProps) {
  const { salesTeam, salesAgents } = development;

  if (!salesTeam && (!salesAgents || salesAgents.length === 0)) return null;

  return (
    <section id="sales-team" className="section-padding bg-charcoal-950">
      <div className="container-luxury">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
        >
          <SectionHeader
            eyebrow="Sales Information"
            title="Sales Team & Gallery"
            subtitle="Connect with the exclusive listing team to schedule private tours and access current availability."
            variant="dark"
          />
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          className="max-w-4xl"
        >
          <div className="rounded-2xl border border-charcoal-700/50 bg-charcoal-900/60 p-8 md:p-10">
            <div className="space-y-6">
              {/* Firm */}
              {salesTeam && (
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-xl bg-gold-500/10 flex items-center justify-center flex-shrink-0">
                    <Building2 className="h-5 w-5 text-gold-500" />
                  </div>
                  <div>
                    <div className="text-xs font-body font-semibold uppercase tracking-wider text-charcoal-400 mb-1">
                      Exclusive Listing Broker
                    </div>
                    <div className="text-xl font-heading font-bold text-ivory-50">
                      {salesTeam.firm}
                    </div>
                  </div>
                </div>
              )}

              {/* Sales Gallery */}
              {salesTeam?.salesGallery && (
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-xl bg-charcoal-800 flex items-center justify-center flex-shrink-0">
                    <MapPin className="h-5 w-5 text-ivory-300" />
                  </div>
                  <div>
                    <div className="text-xs font-body font-semibold uppercase tracking-wider text-charcoal-400 mb-1">
                      Sales Gallery Location
                    </div>
                    <div className="text-base font-body font-medium text-ivory-200">
                      {salesTeam.salesGallery}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* ─── Individual Agent Cards ──────────────────────────────── */}
            {salesAgents && salesAgents.length > 0 && (
              <motion.div
                className="mt-8 pt-6 border-t border-charcoal-700/40"
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={defaultViewport}
              >
                <p className="text-xs font-body font-semibold uppercase tracking-wider text-charcoal-400 mb-4">
                  Sales Executives — Direct Contact
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {salesAgents.map((agent) => (
                    <motion.div
                      key={agent.name}
                      variants={staggerItem}
                      className="rounded-xl border border-charcoal-700/40 bg-charcoal-800/40 p-4 flex items-start gap-3"
                    >
                      {/* Avatar placeholder */}
                      <div className="w-10 h-10 rounded-full bg-charcoal-700 flex items-center justify-center flex-shrink-0">
                        <User className="h-5 w-5 text-charcoal-400" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-heading font-bold text-ivory-50 truncate">
                          {agent.name}
                        </p>
                        <p className="text-[10px] font-body text-charcoal-400 uppercase tracking-wider">
                          {agent.title} — {agent.brokerage}
                        </p>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {agent.phone && (
                            <a
                              href={`tel:${agent.phone}`}
                              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-gold-500/10 text-gold-400 text-xs font-body font-medium hover:bg-gold-500/20 transition-colors"
                            >
                              <Phone className="h-3 w-3" />
                              {agent.phone}
                            </a>
                          )}
                          {agent.email && (
                            <a
                              href={`mailto:${agent.email}`}
                              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-charcoal-700/60 text-charcoal-300 text-xs font-body font-medium hover:bg-charcoal-700 transition-colors"
                            >
                              <Mail className="h-3 w-3" />
                              Email
                            </a>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* CTA */}
            <div className="mt-8 pt-6 border-t border-charcoal-700/40 flex flex-col sm:flex-row gap-3">
              {development.phone && (
                <a
                  href={`tel:${development.phone}`}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-sm bg-gold-500 text-charcoal-900 font-body font-semibold uppercase tracking-wide text-sm hover:bg-gold-400 transition-colors"
                >
                  <Phone className="h-4 w-4" />
                  Call Sales Gallery
                </a>
              )}
              <a
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-sm border border-charcoal-600 text-ivory-200 font-body font-semibold uppercase tracking-wide text-sm hover:border-gold-500/50 hover:text-gold-400 transition-colors"
              >
                <Mail className="h-4 w-4" />
                Request Info
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
