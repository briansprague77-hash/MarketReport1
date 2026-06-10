'use client';

import { motion } from 'framer-motion';
import { SocialProofItem } from '@/types/development-profile';
import {
  fadeUp,
  staggerContainer,
  staggerItem,
  defaultViewport,
} from '@/lib/animations';

/* ─── Platform icon paths (inline SVG for zero dependencies) ──────────────── */

const platformConfig: Record<
  SocialProofItem['platform'],
  { label: string; color: string; icon: React.ReactNode }
> = {
  google: {
    label: 'Google',
    color: 'text-[#4285F4]',
    icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
      </svg>
    ),
  },
  instagram: {
    label: 'Instagram',
    color: 'text-[#E4405F]',
    icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
      </svg>
    ),
  },
  facebook: {
    label: 'Facebook',
    color: 'text-[#1877F2]',
    icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
  yelp: {
    label: 'Yelp',
    color: 'text-[#D32323]',
    icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
        <path d="M20.16 12.594l-4.995 1.433c-.96.276-1.74-.8-1.176-1.63l2.905-4.308a1.073 1.073 0 0 1 1.997.59l-.731 3.915zm-3.1 5.756l-3.656-3.453c-.742-.7.035-1.89.948-1.671l4.31 1.03c.613.147.846.845.44 1.324l-1.35 1.462a.727.727 0 0 1-.692.308zM12.45 20.9l-1.473-4.63c-.29-.916-1.553-.916-1.843 0L7.66 20.9c-.195.613.28 1.238.921 1.182l3.948-.339c.641-.056 1.116-.681.92-1.293v.35zm-6.11-7.31l4.31 1.03c.913.219 1.69-.971.948-1.67L7.942 9.497c-.492-.463-1.308-.12-1.349.566l-.252 3.237a.727.727 0 0 0 .6.79zM11.11 2.813v5.14c0 1.022-1.455 1.294-1.82.34L6.49 1.563c-.244-.636.19-1.326.87-1.38l2.53-.213c.672-.057 1.22.485 1.22 1.16v1.683z" />
      </svg>
    ),
  },
  realtor: {
    label: 'Realtor.com',
    color: 'text-[#D92228]',
    icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
        <path d="M12 2L2 7v10l10 5 10-5V7L12 2zm0 2.18L20 8.5v7l-8 4-8-4v-7l8-4.32z" />
        <path d="M12 6.5L6 9.5v5l6 3 6-3v-5l-6-3zm0 2l3.5 1.75L12 12l-3.5-1.75L12 8.5z" />
      </svg>
    ),
  },
  zillow: {
    label: 'Zillow',
    color: 'text-[#006AFF]',
    icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
        <path d="M12.114 5.011L2 12.364l.637.842L12.114 6.09l9.249 6.622.637-.615-9.886-7.085zm-.228 3.07L4.593 13.59v6.862h14.585V13.87l-7.292-5.79zm-4.767 7.31h9.534v1.36H7.12v-1.36zm0-2.5h9.534v1.36H7.12v-1.36z" />
      </svg>
    ),
  },
};

/* ─── Star Rating ──────────────────────────────────────────────────────────── */

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          className={`w-3.5 h-3.5 ${
            star <= rating ? 'text-gold-500' : 'text-charcoal-200'
          }`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

/* ─── Review Card ──────────────────────────────────────────────────────────── */

function ReviewCard({ item }: { item: SocialProofItem }) {
  const platform = platformConfig[item.platform];

  return (
    <motion.div
      variants={staggerItem}
      className="bg-white rounded-lg border border-charcoal-200 p-5 shadow-sm hover:shadow-md transition-shadow duration-300"
    >
      {/* Header: Platform + Rating */}
      <div className="flex items-center justify-between mb-3">
        <div className={`flex items-center gap-2 ${platform.color}`}>
          {platform.icon}
          <span className="font-body text-xs text-charcoal-400 uppercase tracking-wider">
            {platform.label}
          </span>
        </div>
        {item.rating && <StarRating rating={item.rating} />}
      </div>

      {/* Quote */}
      <blockquote className="font-body text-charcoal-700 text-sm leading-relaxed mb-3 italic">
        &ldquo;{item.text}&rdquo;
      </blockquote>

      {/* Attribution */}
      <div className="flex items-center justify-between">
        <span className="font-body text-charcoal-500 text-xs font-medium">
          — {item.author}
        </span>
        {item.date && (
          <span className="font-body text-charcoal-300 text-xs">
            {item.date}
          </span>
        )}
      </div>
    </motion.div>
  );
}

/* ─── Main Component ──────────────────────────────────────────────────────── */

interface SocialProofProps {
  socialProof: SocialProofItem[];
  /** Use 'section' for full-width standalone (Waldorf), 'inline' for ProfilePage main content */
  variant?: 'section' | 'inline';
}

export default function SocialProof({
  socialProof,
  variant = 'inline',
}: SocialProofProps) {
  if (!socialProof || socialProof.length === 0) return null;

  const content = (
    <motion.div
      id="social-proof"
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={defaultViewport}
    >
      <h2 className="font-heading text-2xl text-charcoal-900 mb-2">
        What Buyers Are Saying
        <div className="w-12 h-0.5 bg-gold-500 mt-3" />
      </h2>
      <p className="font-body text-charcoal-400 text-sm mb-8">
        Curated reviews from verified buyers and residents
      </p>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={defaultViewport}
      >
        {socialProof.map((item, i) => (
          <ReviewCard key={`${item.author}-${i}`} item={item} />
        ))}
      </motion.div>
    </motion.div>
  );

  /* section variant wraps in full-width container matching other analytical sections */
  if (variant === 'section') {
    return (
      <section className="bg-ivory-50 py-20">
        <div className="max-w-7xl mx-auto px-6">{content}</div>
      </section>
    );
  }

  /* inline variant drops directly into the ProfilePage 2/3 content column */
  return content;
}
