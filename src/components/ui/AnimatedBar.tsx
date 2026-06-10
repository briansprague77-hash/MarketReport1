'use client';
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface AnimatedBarProps {
  value: number;
  max: number;
  label: string;
  sublabel?: string;
  valueLabel?: string;
  color?: string;
  delay?: number;
  height?: string;
}

export default function AnimatedBar({ value, max, label, sublabel, valueLabel, color = 'from-gold-600 to-gold-400', delay = 0, height = 'h-3' }: AnimatedBarProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const pct = max > 0 ? (value / max) * 100 : 0;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay }}
      className="mb-4"
    >
      <div className="flex items-baseline justify-between mb-1.5">
        <div>
          <span className="text-sm font-body font-semibold text-ivory-100">{label}</span>
          {sublabel && <span className="text-xs font-body text-charcoal-400 ml-2">{sublabel}</span>}
        </div>
        <span className="text-sm font-heading font-bold text-gold-500">{valueLabel ?? value.toLocaleString()}</span>
      </div>
      <div className={`w-full bg-charcoal-800/60 rounded-full overflow-hidden ${height}`}>
        <motion.div
          className={`${height} rounded-full bg-gradient-to-r ${color}`}
          initial={{ width: 0 }}
          animate={isInView ? { width: `${pct}%` } : { width: 0 }}
          transition={{ duration: 1.2, delay: delay + 0.3, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
    </motion.div>
  );
}
