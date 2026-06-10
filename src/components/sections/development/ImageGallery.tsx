'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Development } from '@/types/development';
import SectionHeader from '@/components/ui/SectionHeader';
import {
  fadeUp,
  fadeIn,
  staggerContainer,
  staggerItem,
  defaultViewport,
} from '@/lib/animations';

interface ImageGalleryProps {
  development: Development;
}

export default function ImageGallery({ development }: ImageGalleryProps) {
  const gallery = development.images?.gallery;
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  if (!gallery || gallery.length === 0) return null;

  const handlePrev = () => {
    if (selectedIndex === null) return;
    setSelectedIndex(selectedIndex === 0 ? gallery.length - 1 : selectedIndex - 1);
  };

  const handleNext = () => {
    if (selectedIndex === null) return;
    setSelectedIndex(selectedIndex === gallery.length - 1 ? 0 : selectedIndex + 1);
  };

  return (
    <section id="gallery" className="section-padding bg-ivory-50">
      <div className="container-luxury">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
        >
          <SectionHeader
            eyebrow="Visual Story"
            title="Residence & Amenity Gallery"
            subtitle={`${gallery.length} renderings showcasing the interiors, amenity spaces, and lifestyle of ${development.name}.`}
          />
        </motion.div>

        {/* Gallery Grid */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
        >
          {gallery.map((image, i) => (
            <motion.button
              key={i}
              className="group relative aspect-[4/3] rounded-sm overflow-hidden cursor-pointer focus:outline-none focus:ring-2 focus:ring-gold-500 focus:ring-offset-2"
              variants={staggerItem}
              whileHover={{ y: -4 }}
              onClick={() => setSelectedIndex(i)}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              {image.caption && (
                <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <span className="text-xs font-body font-semibold text-ivory-50 uppercase tracking-wider">
                    {image.caption}
                  </span>
                </div>
              )}
            </motion.button>
          ))}
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-charcoal-950/95 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedIndex(null)}
          >
            {/* Close button */}
            <button
              className="absolute top-6 right-6 text-ivory-50 hover:text-gold-500 transition-colors z-10"
              onClick={() => setSelectedIndex(null)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
            </button>

            {/* Prev button */}
            <button
              className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 text-ivory-50 hover:text-gold-500 transition-colors z-10 p-2"
              onClick={(e) => { e.stopPropagation(); handlePrev(); }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m15 18-6-6 6-6" />
              </svg>
            </button>

            {/* Next button */}
            <button
              className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 text-ivory-50 hover:text-gold-500 transition-colors z-10 p-2"
              onClick={(e) => { e.stopPropagation(); handleNext(); }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m9 18 6-6-6-6" />
              </svg>
            </button>

            {/* Image */}
            <motion.div
              className="relative w-[90vw] h-[80vh] max-w-6xl"
              variants={fadeIn}
              initial="hidden"
              animate="visible"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={gallery[selectedIndex].src}
                alt={gallery[selectedIndex].alt}
                fill
                className="object-contain"
                sizes="90vw"
                priority
              />
            </motion.div>

            {/* Caption & Counter */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-center z-10">
              {gallery[selectedIndex].caption && (
                <p className="font-heading text-lg text-ivory-50 mb-1">
                  {gallery[selectedIndex].caption}
                </p>
              )}
              <p className="text-xs font-body text-charcoal-400 uppercase tracking-widest">
                {selectedIndex + 1} of {gallery.length}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
