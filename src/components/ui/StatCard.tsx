'use client';

import { useEffect, useRef, useState } from 'react';

interface StatCardProps {
  value: string;
  label: string;
  sublabel?: string;
  prefix?: string;
  suffix?: string;
  animate?: boolean;
  variant?: 'light' | 'dark' | 'glass';
}

const variantStyles: Record<string, string> = {
  light: 'bg-white border border-ivory-300 text-charcoal-900',
  dark: 'bg-charcoal-800 border border-charcoal-700 text-ivory-50',
  glass: 'backdrop-blur-md bg-white/10 border border-white/20 text-white',
};

export default function StatCard({
  value,
  label,
  sublabel,
  prefix = '',
  suffix = '',
  animate = true,
  variant = 'light',
}: StatCardProps) {
  const [displayValue, setDisplayValue] = useState(animate ? '0' : value);
  const ref = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!animate) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const numericValue = parseFloat(value.replace(/[^0-9.]/g, ''));
          if (isNaN(numericValue)) {
            setDisplayValue(value);
            return;
          }

          const duration = 1500;
          const steps = 40;
          const increment = numericValue / steps;
          let current = 0;
          let step = 0;

          const timer = setInterval(() => {
            step++;
            current = Math.min(current + increment, numericValue);
            const isDecimal = value.includes('.');
            const formatted = isDecimal
              ? current.toFixed(1)
              : Math.round(current).toLocaleString();
            setDisplayValue(formatted);

            if (step >= steps) {
              clearInterval(timer);
              setDisplayValue(
                isDecimal
                  ? numericValue.toFixed(1)
                  : numericValue.toLocaleString()
              );
            }
          }, duration / steps);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [animate, value]);

  return (
    <div
      ref={ref}
      className={`rounded-sm p-6 transition-all duration-300 hover:shadow-lg ${variantStyles[variant]}`}
    >
      <div className="text-3xl md:text-4xl font-heading font-bold tracking-tight">
        {prefix}
        {displayValue}
        {suffix}
      </div>
      <div
        className={`mt-2 text-sm font-body font-medium uppercase tracking-widest ${
          variant === 'light' ? 'text-charcoal-500' : 'text-ivory-300'
        }`}
      >
        {label}
      </div>
      {sublabel && (
        <div
          className={`mt-1 text-xs font-body ${
            variant === 'light' ? 'text-charcoal-400' : 'text-ivory-400'
          }`}
        >
          {sublabel}
        </div>
      )}
    </div>
  );
}
