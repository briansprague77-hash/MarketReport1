'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Development } from '@/types/development';
import SectionHeader from '@/components/ui/SectionHeader';
import {
  fadeUp,
  staggerContainer,
  staggerItem,
  defaultViewport,
} from '@/lib/animations';

interface AmenityHighlightsProps {
  development: Development;
}

/** Keyword-based icon matching — finds best emoji for any amenity name */
function getAmenityIcon(name: string): string {
  const lower = name.toLowerCase();
  if (lower.includes('pool') || lower.includes('swim')) return '\uD83C\uDFCA';
  if (lower.includes('lounge') || lower.includes('sky') || lower.includes('rooftop') || lower.includes('club room')) return '\u2728';
  if (lower.includes('wellness') || lower.includes('spa') || lower.includes('yoga')) return '\uD83E\uDDD8';
  if (lower.includes('fitness') || lower.includes('gym')) return '\uD83C\uDFCB\uFE0F';
  if (lower.includes('kids') || lower.includes('youth') || lower.includes('entertainment')) return '\uD83C\uDFAE';
  if (lower.includes('golf') || lower.includes('simulator')) return '\u26F3';
  if (lower.includes('pet') || lower.includes('dog')) return '\uD83D\uDC3E';
  if (lower.includes('ev') || lower.includes('charging') || lower.includes('electric')) return '\u26A1';
  if (lower.includes('dining') || lower.includes('restaurant') || lower.includes('kitchen') || lower.includes('chef')) return '\uD83C\uDF7D\uFE0F';
  if (lower.includes('lobby') || lower.includes('concierge') || lower.includes('porte')) return '\uD83C\uDFE8';
  if (lower.includes('theater') || lower.includes('cinema') || lower.includes('screening')) return '\uD83C\uDFAC';
  if (lower.includes('business') || lower.includes('cowork') || lower.includes('hub')) return '\uD83D\uDCBC';
  if (lower.includes('guest') || lower.includes('suite')) return '\uD83D\uDECF\uFE0F';
  if (lower.includes('garden') || lower.includes('courtyard') || lower.includes('terrace')) return '\uD83C\uDF3F';
  if (lower.includes('bike') || lower.includes('cycling')) return '\uD83D\uDEB4';
  if (lower.includes('valet') || lower.includes('parking')) return '\uD83C\uDD7F\uFE0F';
  return '\u2B50';
}

export default function AmenityHighlights({ development }: AmenityHighlightsProps) {
  const amenities = development.specifications?.amenityHighlights;

  if (!amenities || amenities.length === 0) return null;

  // Use gallery images for featured amenity cards when available
  const galleryImages = development.images?.gallery || [];
  // First N amenities with matching gallery images become "featured" cards
  const featured: { amenity: typeof amenities[0]; img: { src: string; alt: string } }[] = [];
  const standard: typeof amenities = [];
  for (const amenity of amenities) {
    if (featured.length < galleryImages.length && featured.length < 4) {
      featured.push({ amenity, img: galleryImages[featured.length] });
    } else {
      standard.push(amenity);
    }
  }

  // Build dynamic subtitle from amenity data
  const totalAmenitySF = development.specifications?.amenitySpaceSF;
  const poolDeckSF = development.specifications?.poolDeckSF;
  const subtitleParts: string[] = [];
  if (totalAmenitySF) subtitleParts.push(`${totalAmenitySF.toLocaleString()} SF of amenity space`);
  if (poolDeckSF) subtitleParts.push(`${poolDeckSF.toLocaleString()} SF pool deck`);
  const subtitle = subtitleParts.length > 0
    ? `Signature amenity spaces spanning ${subtitleParts.join(' including a ')}.`
    : `${amenities.length} curated amenity spaces designed for residents.`;

  return (
    <section id="amenities" className="section-padding bg-charcoal-950">
      <div className="container-luxury">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
        >
          <SectionHeader
            eyebrow={`${development.name} Living`}
            title="World-Class Amenities"
            subtitle={subtitle}
            variant="dark"
          />
        </motion.div>

        {/* Featured Amenities — large cards with hero images */}
        <motion.div
          className="grid md:grid-cols-2 gap-4 mb-4"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
        >
          {featured.map(({ amenity, img }, i) => (
              <motion.div
                key={i}
                className="group relative bg-charcoal-900 border border-charcoal-700 rounded-sm overflow-hidden hover:border-gold-500/30 transition-all duration-300"
                variants={staggerItem}
                whileHover={{ y: -4 }}
              >
                {/* Image */}
                <div className="relative h-56 md:h-64 overflow-hidden">
                  <Image
                    src={img.src}
                    alt={img.alt || `${amenity.name} at ${development.name}`}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900 via-charcoal-900/40 to-transparent" />

                  {/* Badges on image */}
                  {(amenity.level || amenity.sqft) && (
                    <div className="absolute top-4 right-4 flex items-center gap-2">
                      {amenity.level && (
                        <span className="text-[10px] font-body font-semibold uppercase tracking-widest text-gold-500 bg-charcoal-900/80 backdrop-blur-sm px-2.5 py-1 rounded-sm">
                          {amenity.level}
                        </span>
                      )}
                      {amenity.sqft && (
                        <span className="text-[10px] font-body font-semibold uppercase tracking-widest text-ivory-300 bg-charcoal-900/80 backdrop-blur-sm px-2.5 py-1 rounded-sm">
                          {amenity.sqft}
                        </span>
                      )}
                    </div>
                  )}
                </div>

                {/* Content overlay */}
                <div className="p-6">
                  <div className="flex items-start gap-3 mb-2">
                    <span className="text-2xl shrink-0">
                      {getAmenityIcon(amenity.name)}
                    </span>
                    <h3 className="text-lg font-heading font-bold text-ivory-50">
                      {amenity.name}
                    </h3>
                  </div>
                  <p className="text-sm font-body text-ivory-400 leading-relaxed pl-9">
                    {amenity.description}
                  </p>
                </div>
              </motion.div>
          ))}
        </motion.div>

        {/* Standard Amenities — compact cards */}
        {standard.length > 0 && (
          <motion.div
            className="grid md:grid-cols-2 gap-4"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={defaultViewport}
          >
            {standard.map((amenity, i) => (
              <motion.div
                key={i}
                className="group bg-charcoal-900/50 border border-charcoal-700 rounded-sm p-6 hover:border-gold-500/30 transition-all duration-300"
                variants={staggerItem}
                whileHover={{ y: -4 }}
              >
                <div className="flex items-start gap-4">
                  <span className="text-3xl shrink-0 mt-0.5">
                    {getAmenityIcon(amenity.name)}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <h3 className="text-lg font-heading font-bold text-ivory-50">
                        {amenity.name}
                      </h3>
                      {(amenity.level || amenity.sqft) && (
                        <div className="flex items-center gap-2 shrink-0">
                          {amenity.level && (
                            <span className="text-[10px] font-body font-semibold uppercase tracking-widest text-gold-500 bg-gold-500/10 px-2 py-1 rounded-sm">
                              {amenity.level}
                            </span>
                          )}
                          {amenity.sqft && (
                            <span className="text-[10px] font-body font-semibold uppercase tracking-widest text-charcoal-400 bg-charcoal-800 px-2 py-1 rounded-sm">
                              {amenity.sqft}
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                    <p className="text-sm font-body text-ivory-400 leading-relaxed">
                      {amenity.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}
