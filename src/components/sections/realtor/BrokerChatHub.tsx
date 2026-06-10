'use client';

import { motion } from 'framer-motion';
import { QRCodeSVG } from 'qrcode.react';
import { fadeUp, defaultViewport } from '@/lib/animations';
import { useAudience } from '@/lib/audience';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';

/**
 * Group-chat hub for active Tampa Bay new-construction realtors.
 *
 * Gated: only renders the full join card for audience tier 'realtor' or
 * 'sales-agent' (isPro). Consumer tier sees a short teaser inviting them
 * to switch tiers (already supported by the existing AudienceContext).
 *
 * WhatsApp doesn't permit iframe embedding of groups, so the UX is:
 *   - Explain the group
 *   - "Open Group Chat" button → deep-links to WhatsApp (mobile) or web
 *   - QR code (rendered client-side via qrcode.react, no URL leakage)
 *     for desktop users to scan with their phone
 *
 * Env var: NEXT_PUBLIC_BROKER_WA_GROUP_INVITE — set to the full
 *   chat.whatsapp.com/XYZ invite URL before deploying.
 */
export default function BrokerChatHub() {
  const { isPro } = useAudience();
  const inviteUrl = process.env.NEXT_PUBLIC_BROKER_WA_GROUP_INVITE ?? '';

  if (!isPro) {
    return (
      <section className="py-12 bg-charcoal-950 border-y border-ivory-100/5">
        <div className="container-luxury">
          <motion.div
            initial="hidden" whileInView="visible" viewport={defaultViewport} variants={fadeUp}
            className="max-w-2xl mx-auto text-center"
          >
            <Badge label="Broker Group Chat · Realtors Only" variant="gold" />
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-white mt-4 mb-3">
              This section is for active Tampa Bay realtors
            </h2>
            <p className="text-ivory-400/70 leading-relaxed">
              Switch your audience tier (top-right) to &ldquo;Realtor&rdquo; or
              &ldquo;Sales Agent&rdquo; to access the private WhatsApp group
              where developer sales execs, listing agents, and brokers actively
              selling in the pipeline share updates, pricing tips, and tour access.
            </p>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-14 bg-charcoal-950 border-y border-gold-500/10">
      <div className="container-luxury">
        <motion.div
          initial="hidden" whileInView="visible" viewport={defaultViewport} variants={fadeUp}
          className="mb-8"
        >
          <Badge label="Private Realtor Group Chat" variant="gold" />
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white mt-4 mb-2">
            Tampa Bay New Construction · WhatsApp Group
          </h2>
          <p className="text-ivory-400/70 max-w-2xl leading-relaxed">
            A working channel for the realtors, sales execs, and developers actively
            moving units in the pipeline. Real-time access to floor plan changes,
            showing coordination, incentive drops, and off-market resale leads.
          </p>
        </motion.div>

        {inviteUrl ? (
          <motion.div
            initial="hidden" whileInView="visible" viewport={defaultViewport} variants={fadeUp}
            className="grid md:grid-cols-[1fr_280px] gap-8 items-start rounded-2xl border border-gold-500/20 bg-gradient-to-br from-charcoal-900/80 to-charcoal-950 p-8"
          >
            <div>
              <div className="text-xs font-body font-semibold uppercase tracking-[0.25em] text-gold-500 mb-3">
                Join the Group
              </div>
              <p className="text-ivory-200 leading-relaxed mb-5">
                Tap &ldquo;Open Group Chat&rdquo; from mobile to join directly,
                or scan the QR from your desktop.
              </p>
              <ul className="space-y-2 mb-6 text-sm text-ivory-400/70">
                <li>▸ Share MLS updates the moment they hit</li>
                <li>▸ Coordinate showings across overlapping buyer pools</li>
                <li>▸ Flag incentive drops before they appear on the site</li>
                <li>▸ Escalate questions directly to Brian</li>
              </ul>
              <div className="flex flex-wrap gap-3">
                <a href={inviteUrl} target="_blank" rel="noopener noreferrer">
                  <Button variant="primary" size="md">
                    Open Group Chat
                  </Button>
                </a>
                <a
                  href={inviteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-sm text-gold-400 underline underline-offset-4 hover:text-gold-300"
                >
                  Copy invite link →
                </a>
              </div>
            </div>

            <div className="justify-self-center md:justify-self-end">
              <div className="rounded-xl bg-ivory-50 p-3 shadow-lg">
                <QRCodeSVG
                  value={inviteUrl}
                  size={240}
                  marginSize={2}
                  level="M"
                  bgColor="#faf8f5"
                  fgColor="#1a1a2e"
                />
              </div>
              <p className="text-[11px] text-ivory-400/50 text-center mt-2">
                Scan with your phone to join
              </p>
            </div>
          </motion.div>
        ) : (
          <div className="rounded-2xl border border-ivory-100/10 bg-charcoal-900/60 p-8">
            <p className="text-ivory-400/70">
              The group chat invite link is not configured yet. Set
              <code className="mx-1 px-1.5 py-0.5 rounded bg-charcoal-800 text-gold-400 text-xs">
                NEXT_PUBLIC_BROKER_WA_GROUP_INVITE
              </code>
              in your environment to the full WhatsApp group invite URL (starts with
              <code className="mx-1 px-1.5 py-0.5 rounded bg-charcoal-800 text-gold-400 text-xs">
                https://chat.whatsapp.com/
              </code>
              ) to activate this panel.
            </p>
          </div>
        )}

        <p className="mt-6 text-xs text-ivory-400/40 max-w-3xl leading-relaxed">
          Private group. Membership is at Brian&rsquo;s discretion — agents who
          aren&rsquo;t actively selling Tampa Bay new construction will be removed.
          Messages remain in WhatsApp&rsquo;s end-to-end encrypted channel; this page
          only provides the join link.
        </p>
      </div>
    </section>
  );
}
