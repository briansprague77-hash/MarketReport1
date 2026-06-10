'use client';

import { useEffect, useRef, useState } from 'react';

interface ScoreGaugeProps {
  label: string;
  score: number;
  descriptor: string;
  maxScore?: number;
}

export default function ScoreGauge({ label, score, descriptor, maxScore = 100 }: ScoreGaugeProps) {
  const [animatedScore, setAnimatedScore] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (animatedScore / maxScore) * circumference;

  const getColor = (s: number) => {
    if (s >= 90) return '#C9A84C'; // gold
    if (s >= 70) return '#0D9668'; // emerald
    if (s >= 50) return '#F59E0B'; // amber
    return '#EF4444'; // red
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const duration = 1200;
          const steps = 30;
          const increment = score / steps;
          let current = 0;
          let step = 0;

          const timer = setInterval(() => {
            step++;
            current = Math.min(current + increment, score);
            setAnimatedScore(Math.round(current));
            if (step >= steps) {
              clearInterval(timer);
              setAnimatedScore(score);
            }
          }, duration / steps);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [score]);

  return (
    <div ref={ref} className="flex flex-col items-center gap-3 p-6">
      <div className="relative w-32 h-32">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
          <circle
            cx="60"
            cy="60"
            r={radius}
            stroke="currentColor"
            className="text-charcoal-100"
            strokeWidth="8"
            fill="none"
          />
          <circle
            cx="60"
            cy="60"
            r={radius}
            stroke={getColor(animatedScore)}
            strokeWidth="8"
            fill="none"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            className="transition-all duration-300"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-2xl font-heading font-bold text-charcoal-900">
            {animatedScore}
          </span>
        </div>
      </div>
      <div className="text-center">
        <div className="text-sm font-body font-semibold uppercase tracking-wider text-charcoal-700">
          {label}
        </div>
        <div className="text-xs font-body text-charcoal-500 mt-1">{descriptor}</div>
      </div>
    </div>
  );
}
