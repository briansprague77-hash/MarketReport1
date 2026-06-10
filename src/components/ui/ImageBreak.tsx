'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { fadeIn, defaultViewport } from '@/lib/animations';

interface ImageBreakProps {
  /** Path to the image in /public */
  src: string;
  alt: string;
  /** Optional overlay text */
  caption?: string;
  /** Optional small label above caption */
  eyebrow?: string;
  /** Height treatment */
  height?: 'sm' | 'md' | 'lg';
  /** Overlay darkness */
  overlay?: 'none' | 'light' | 'medium' | 'heavy';
}

const heights = {
  sm: 'h-[280px] md:h-[360px]',
  md: 'h-[360px] md:h-[480px]',
  lg: 'h-[480px] md:h-[600px]',
};

const overlays = {
  none: '',
  light: 'bg-charcoal-950/20',
  medium: 'bg-charcoal-950/40',
  heavy: 'bg-gradient-to-t from-charcoal-950/80 via-charcoal-950/30 to-charcoal-950/10',
};

/**
 * ImageBreak — Full-width image divider with parallax scroll effect.
 *
 * The parallax works by tracking the section's scroll position within
 * the viewport. As the user scrolls, the image translates vertically
 * at a slower rate than the page, creating a depth illusion.
 *
 * The image is scaled up (110%) to provide room for the translate
 * without exposing gaps at the edges.
 */
export default function ImageBreak({
  src,
  alt,
  caption,
  eyebrow,
  height = 'md',
  overlay = 'medium',
}: ImageBreakProps) {
  const sectionRef = useRef<HTMLElement>(null);

  // Track this element from viewport entry to exit
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  // Map scroll progress 0→1 to a vertical translate of -40px → +40px
  // This creates a subtle parallax: image moves slower than the page
  const y = useTransform(scrollYProgress, [0, 1], ['-4%', '4%']);

  return (
    <motion.section
      ref={sectionRef}
      variants={fadeIn}
      initial="hidden"
      whileInView="visible"
      viewport={defaultViewport}
      className={`relative w-full ${heights[height]} overflow-hidden`}
    >
      {/* Parallax image container — scaled up to prevent edge gaps */}
      <motion.div
        className="absolute inset-0 scale-110"
        style={{ y }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          sizes="100vw"
          quality={85}
        />
      </motion.div>

      {/* Overlay */}
      {overlay !== 'none' && (
        <div className={`absolute inset-0 ${overlays[overlay]}`} />
      )}

      {/* Caption */}
      {(caption || eyebrow) && (
        <div className="absolute inset-0 flex flex-col items-center justify-end pb-12 md:pb-16 px-6">
          {eyebrow && (
            <div className="flex items-center gap-3 mb-3">
              <div className="h-px w-6 bg-gold-500/60" />
              <span className="text-gold-400 text-xs font-body font-semibold uppercase tracking-[0.25em]">
                {eyebrow}
              </span>
              <div className="h-px w-6 bg-gold-500/60" />
            </div>
          )}
          {caption && (
            <p className="text-lg md:text-xl font-heading font-medium text-ivory-50 text-center max-w-2xl leading-snug">
              {caption}
            </p>
          )}
        </div>
      )}
    </motion.section>
  );
}
