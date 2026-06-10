'use client';

import { useAnimatedCounter, parseStatValue } from '@/hooks/useAnimatedCounter';

interface AnimatedStatProps {
  value: string;
  prefix?: string;
  suffix?: string;
  className?: string;
}

/**
 * AnimatedStat
 *
 * Renders a number that counts up from 0 when it scrolls into view.
 * Handles prefixes ($) and suffixes (B+, %) cleanly — only the
 * numeric portion animates; decorators render static.
 *
 * Usage:
 *   <AnimatedStat value="2.1" prefix="$" suffix="B+" />
 *   → renders: $2.1B+ (with 2.1 counting up)
 */
export default function AnimatedStat({ value, prefix, suffix, className }: AnimatedStatProps) {
  const { target, decimals } = parseStatValue(value);
  const [ref, display] = useAnimatedCounter(target, decimals);

  return (
    <div ref={ref} className={className}>
      {prefix}
      {display}
      {suffix}
    </div>
  );
}
