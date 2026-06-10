'use client';

import { useEffect, useRef, useState } from 'react';
import { useInView, useMotionValue, useSpring, MotionValue } from 'framer-motion';

/**
 * useAnimatedCounter
 *
 * Animates a number from 0 to `target` when the ref element enters the viewport.
 * Uses Framer Motion's spring physics for a natural feel — numbers accelerate
 * and then ease into the final value rather than linear interpolation.
 *
 * @param target  The final number to display
 * @param decimals Number of decimal places (default 0)
 * @returns [ref, displayValue] — attach ref to the container, use displayValue for rendering
 */
export function useAnimatedCounter(
  target: number,
  decimals: number = 0
): [React.RefObject<HTMLDivElement | null>, string] {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    stiffness: 80,
    damping: 25,
    restDelta: 0.01,
  });
  const [display, setDisplay] = useState('0');

  useEffect(() => {
    if (isInView) {
      motionValue.set(target);
    }
  }, [isInView, target, motionValue]);

  useEffect(() => {
    const unsubscribe = springValue.on('change', (latest: number) => {
      setDisplay(
        decimals > 0
          ? latest.toFixed(decimals)
          : Math.round(latest).toLocaleString()
      );
    });
    return unsubscribe;
  }, [springValue, decimals]);

  return [ref, display];
}

/**
 * Parses hero stat values like "28", "2.1", "1,449" into a numeric target.
 * Strips commas for proper parsing.
 */
export function parseStatValue(value: string): { target: number; decimals: number } {
  const cleaned = value.replace(/,/g, '');
  const num = parseFloat(cleaned);
  const decimals = cleaned.includes('.') ? (cleaned.split('.')[1]?.length || 0) : 0;
  return { target: isNaN(num) ? 0 : num, decimals };
}
