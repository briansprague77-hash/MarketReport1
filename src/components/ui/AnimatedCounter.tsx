'use client';
import { useEffect, useRef, useState } from 'react';
import { useInView, useMotionValue, useTransform, animate, motion } from 'framer-motion';

interface AnimatedCounterProps {
  value: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  className?: string;
  decimals?: number;
  /**
   * If true (default), animation triggers on mount — appropriate for KPIs
   * above the fold that are already visible on first paint. If false, uses
   * scroll-into-view detection — appropriate for counters deeper in the page.
   */
  immediate?: boolean;
}

export default function AnimatedCounter({
  value,
  prefix = '',
  suffix = '',
  duration = 2,
  className = '',
  decimals = 0,
  immediate = true,
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => {
    const formatted = decimals > 0 ? v.toFixed(decimals) : Math.round(v).toLocaleString();
    return `${prefix}${formatted}${suffix}`;
  });

  // Shadow display value for immediate render fallback. If framer-motion's
  // animation pipeline never fires (which happens in some production builds
  // when motion-value subscriptions race with hydration), we still show the
  // final value as plain text via this fallback.
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const shouldAnimate = immediate || isInView;
    if (!shouldAnimate) return;

    const controls = animate(count, value, {
      duration,
      ease: 'easeOut',
      onComplete: () => setHasAnimated(true),
    });
    // Safety fallback: ensure final value is shown even if motion-value
    // subscription is broken (some prod builds hydrate before the transform
    // subscribes and the span shows '0' indefinitely).
    const timeout = setTimeout(() => setHasAnimated(true), duration * 1000 + 200);
    return () => {
      controls.stop();
      clearTimeout(timeout);
    };
  }, [immediate, isInView, value, count, duration]);

  if (hasAnimated) {
    // Final state — render the value as plain formatted text (no motion sub).
    const formatted = decimals > 0 ? value.toFixed(decimals) : Math.round(value).toLocaleString();
    return <span ref={ref} className={className}>{`${prefix}${formatted}${suffix}`}</span>;
  }

  return <motion.span ref={ref} className={className}>{rounded}</motion.span>;
}
