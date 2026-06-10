'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Development } from '@/types/development';
import SectionHeader from '@/components/ui/SectionHeader';
import ScoreGauge from '@/components/ui/ScoreGauge';
import {
  fadeUp,
  staggerContainer,
  staggerItem,
  staggerFast,
  defaultViewport,
} from '@/lib/animations';
import { useAudience } from '@/lib/audience';

interface LocationIntelligenceProps {
  development: Development;
}

const iconMap: Record<string, string> = {
  utensils: '\uD83C\uDF7D\uFE0F',
  palette: '\uD83C\uDFA8',
  tree: '\uD83C\uDF33',
  anchor: '\u2693',
  music: '\uD83C\uDFB5',
  spa: '\uD83D\uDC86',
  hospital: '\uD83C\uDFE5',
};

export default function LocationIntelligence({ development }: LocationIntelligenceProps) {
  const { locationCategories, locationScores, address, specifications } = development;
  const airports = specifications?.airports;
  const { ctaLabel } = useAudience();

  if (!locationCategories || !locationScores) return null;

  return (
    <section id="location" className="section-padding bg-ivory-50">
      <div className="container-luxury">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
        >
          <SectionHeader
            eyebrow={development.locationEyebrow || `${development.name} Location`}
            title="Location Intelligence"
            subtitle={(() => {
              const walkScore = locationScores.find(s => s.label === 'Walk Score');
              const scoreStr = walkScore ? `Walk Score ${walkScore.score}` : '';
              return `${address}${scoreStr ? ` — ${scoreStr} in` : ' —'} ${development.location}. Every amenity your clients expect, within minutes of the lobby.`;
            })()}
          />
        </motion.div>

        {/* Location panoramic + score gauges */}
        <div className="grid lg:grid-cols-5 gap-6 mb-16">
          {/* Location image — lifestyle context */}
          {(() => {
            const locImg = development.images?.gallery?.[0] || development.images?.hero;
            return locImg ? (
              <motion.div
                className="lg:col-span-2 relative h-56 lg:h-auto min-h-[240px] rounded-sm overflow-hidden"
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={defaultViewport}
              >
                <Image
                  src={locImg.src}
                  alt={locImg.alt || `${development.name} location view`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-ivory-50/20 to-transparent" />
                {locImg.caption && (
                  <div className="absolute bottom-4 left-4">
                    <span className="text-[10px] font-body font-semibold uppercase tracking-[0.2em] text-ivory-100 bg-charcoal-900/60 backdrop-blur-sm px-2.5 py-1 rounded-sm">
                      {locImg.caption}
                    </span>
                  </div>
                )}
              </motion.div>
            ) : null;
          })()}

          {/* Score Gauges — 3 cols */}
          <motion.div
            className="lg:col-span-3 grid grid-cols-2 md:grid-cols-3 gap-4"
            variants={staggerFast}
            initial="hidden"
            whileInView="visible"
            viewport={defaultViewport}
          >
            {locationScores.map((score, i) => (
              <motion.div key={i} variants={staggerItem}>
                <ScoreGauge
                  label={score.label}
                  score={score.score}
                  descriptor={score.descriptor}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Category Grid */}
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
        >
          {locationCategories.map((cat, i) => (
            <motion.div
              key={i}
              className="bg-white border border-ivory-300 rounded-sm p-6 hover:shadow-md hover:border-gold-500/20 transition-all duration-300"
              variants={staggerItem}
              whileHover={{ y: -4 }}
            >
              <div className="flex items-center gap-3 mb-5">
                <span className="text-2xl">{iconMap[cat.icon] || '\uD83D\uDCCD'}</span>
                <h3 className="text-base font-body font-semibold text-charcoal-900 uppercase tracking-wider">
                  {cat.name}
                </h3>
              </div>
              <div className="space-y-4">
                {cat.venues.map((venue, j) => (
                  <div key={j} className="border-l-2 border-ivory-300 pl-4">
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="text-sm font-body font-semibold text-charcoal-800">
                        {venue.name}
                      </h4>
                      {venue.distance && (
                        <span className="text-[10px] font-body font-medium text-charcoal-400 uppercase tracking-wider shrink-0">
                          {venue.distance}
                        </span>
                      )}
                    </div>
                    <p className="text-xs font-body text-charcoal-500 mt-0.5 leading-relaxed">
                      {venue.description}
                    </p>
                    {venue.walkTime && (
                      <span className="text-[10px] font-body text-gold-600 mt-1 inline-block">
                        {venue.walkTime} walk
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Airport Access */}
        {airports && airports.length > 0 && (
          <motion.div
            className="mt-12"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={defaultViewport}
          >
            <h3 className="text-sm font-body font-semibold uppercase tracking-widest text-charcoal-500 mb-6">
              Airport Access
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {airports.map((airport, i) => (
                <motion.div
                  key={i}
                  className="bg-white border border-ivory-300 rounded-sm p-5 hover:shadow-md hover:border-gold-500/20 transition-all duration-300"
                  variants={staggerItem}
                  whileHover={{ y: -2 }}
                >
                  <div className="flex items-center gap-4">
                    <span className="text-2xl shrink-0">{'\u2708\uFE0F'}</span>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-body font-semibold text-charcoal-900">
                        {airport.name}
                      </div>
                      {airport.code && (
                        <span className="text-[10px] font-body font-medium text-charcoal-400 uppercase tracking-wider">
                          ({airport.code})
                        </span>
                      )}
                    </div>
                    <div className="text-right shrink-0">
                      <div className="text-lg font-heading font-bold text-gold-600">
                        {airport.driveTime}
                      </div>
                      <div className="text-[10px] font-body text-charcoal-400 uppercase tracking-wider">
                        drive
                      </div>
                    </div>
                  </div>
                  {(airport.fbo || airport.note) && (
                    <div className="mt-3 pt-3 border-t border-ivory-200 space-y-1.5">
                      {airport.fbo && (
                        <p className="text-xs font-body text-charcoal-500 leading-relaxed">
                          {airport.fbo}
                        </p>
                      )}
                      {airport.note && (
                        <p className="text-[11px] font-body text-gold-600 leading-relaxed">
                          {airport.note}
                        </p>
                      )}
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Advisory Insight — conditional on development.locationInsight */}
        {development.locationInsight && (
          <motion.div
            className="mt-16 bg-charcoal-900 rounded-sm p-8 md:p-10"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={defaultViewport}
          >
            <div className="flex items-start gap-4 mb-6">
              <span className="text-2xl shrink-0">{'\uD83D\uDCA1'}</span>
              <div>
                <h3 className="text-sm font-body font-semibold uppercase tracking-widest text-gold-500 mb-1">
                  Advisory Insight
                </h3>
                <h4 className="text-lg font-heading font-bold text-ivory-100">
                  {development.locationInsight.title}
                </h4>
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                {development.locationInsight.paragraphs.map((para, i) => (
                  <p key={i} className="text-sm font-body text-ivory-300 leading-relaxed">
                    {para}
                  </p>
                ))}
              </div>
              {development.locationInsight.highlights.length > 0 && (
                <div className="space-y-3">
                  {development.locationInsight.highlights.map((hl, i) => (
                    <div key={i} className="flex items-center gap-3 px-4 py-3 bg-ivory-100/5 rounded-sm">
                      <span className="text-gold-500 text-sm">{'\u2713'}</span>
                      <span className="text-sm font-body text-ivory-200">{hl}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* CTA */}
        <motion.div
          className="mt-12 text-center"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
        >
          <a
            href="#"
            className="inline-block text-sm font-body font-semibold text-charcoal-900 bg-gold-500 hover:bg-gold-400 px-8 py-3.5 rounded-sm uppercase tracking-wide transition-all"
          >
            {ctaLabel}
          </a>
        </motion.div>
      </div>
    </section>
  );
}
