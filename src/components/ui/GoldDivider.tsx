'use client';

import { motion } from 'framer-motion';
import { drawLine, defaultViewport } from '@/lib/animations';

interface GoldDividerProps {
  /** Visual treatment */
  variant?: 'line' | 'diamond' | 'gradient';
  /** Custom class names for additional spacing */
  className?: string;
}

/**
 * GoldDivider — Animated section divider in the gold brand color.
 *
 * Three variants:
 * - `line`: A simple animated line that draws from left to right
 * - `diamond`: Line with a centered diamond accent
 * - `gradient`: Full-width gradient fade (most subtle)
 *
 * Each animates on scroll into view for a polished reveal effect.
 */
export default function GoldDivider({ variant = 'diamond', className = '' }: GoldDividerProps) {
  if (variant === 'gradient') {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={defaultViewport}
        transition={{ duration: 1 }}
        className={`w-full h-px bg-gradient-to-r from-transparent via-gold-500/40 to-transparent ${className}`}
      />
    );
  }

  if (variant === 'line') {
    return (
      <div className={`flex justify-center ${className}`}>
        <motion.div
          variants={drawLine}
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          className="w-24 h-px bg-gold-500/50"
        />
      </div>
    );
  }

  // Diamond variant (default)
  return (
    <div className={`flex items-center justify-center gap-4 ${className}`}>
      <motion.div
        variants={drawLine}
        initial="hidden"
        whileInView="visible"
        viewport={defaultViewport}
        className="w-16 md:w-24 h-px bg-gradient-to-r from-transparent to-gold-500/50"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0, rotate: 45 }}
        whileInView={{ opacity: 1, scale: 1, rotate: 45 }}
        viewport={defaultViewport}
        transition={{ duration: 0.5, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="w-2 h-2 bg-gold-500/60 flex-shrink-0"
      />
      <motion.div
        variants={drawLine}
        initial="hidden"
        whileInView="visible"
        viewport={defaultViewport}
        className="w-16 md:w-24 h-px bg-gradient-to-l from-transparent to-gold-500/50"
      />
    </div>
  );
}
