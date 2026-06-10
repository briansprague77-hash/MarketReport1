'use client';

import { motion } from 'framer-motion';
import { fadeUp, defaultViewport } from '@/lib/animations';

type CalloutVariant = 'stat' | 'quote' | 'insight';

interface CalloutProps {
  variant?: CalloutVariant;
  /** Main text — the stat value, quote, or insight */
  children: React.ReactNode;
  /** Attribution line — source, author, or context */
  attribution?: string;
  /** Small label above the content */
  eyebrow?: string;
  /** Background treatment */
  theme?: 'light' | 'dark' | 'gold';
}

export default function Callout({
  variant = 'quote',
  children,
  attribution,
  eyebrow,
  theme = 'light',
}: CalloutProps) {
  const themes = {
    light: 'bg-ivory-100 border-t border-b border-ivory-300',
    dark: 'bg-charcoal-950',
    gold: 'bg-gradient-to-r from-charcoal-950 via-charcoal-900 to-charcoal-950',
  };

  const textColor = theme === 'light' ? 'text-charcoal-900' : 'text-ivory-50';
  const subColor = theme === 'light' ? 'text-charcoal-500' : 'text-ivory-400';
  const accentColor = 'text-gold-500';

  return (
    <section className={`${themes[theme]} py-16 md:py-20`}>
      <div className="container-luxury">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          className="max-w-4xl mx-auto text-center"
        >
          {/* Eyebrow */}
          {eyebrow && (
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="h-px w-8 bg-gold-500" />
              <span className={`${accentColor} text-xs font-body font-semibold uppercase tracking-[0.25em]`}>
                {eyebrow}
              </span>
              <div className="h-px w-8 bg-gold-500" />
            </div>
          )}

          {/* Main content by variant */}
          {variant === 'stat' && (
            <div className={`text-5xl md:text-6xl lg:text-7xl font-heading font-bold tracking-tight ${textColor}`}>
              {children}
            </div>
          )}

          {variant === 'quote' && (
            <div className="relative">
              <div className={`absolute -top-4 left-1/2 -translate-x-1/2 text-6xl font-heading leading-none ${accentColor} opacity-30 select-none`}>
                &ldquo;
              </div>
              <blockquote className={`text-xl md:text-2xl lg:text-3xl font-heading font-medium leading-snug ${textColor} italic`}>
                {children}
              </blockquote>
            </div>
          )}

          {variant === 'insight' && (
            <div className="flex items-start justify-center gap-4 text-left max-w-2xl mx-auto">
              <div className="shrink-0 mt-1">
                <div className="w-8 h-8 rounded-full bg-gold-500/10 flex items-center justify-center">
                  <svg className="w-4 h-4 text-gold-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              <p className={`text-lg md:text-xl font-body leading-relaxed ${textColor}`}>
                {children}
              </p>
            </div>
          )}

          {/* Attribution */}
          {attribution && (
            <p className={`mt-6 text-sm font-body ${subColor} tracking-wide`}>
              {variant === 'quote' && '— '}
              {attribution}
            </p>
          )}
        </motion.div>
      </div>
    </section>
  );
}
