'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { fadeUp, defaultViewport } from '@/lib/animations';

const ABSORPTION_DATA = [
  { building: 'Art House', color: '#C9A84C', data: [
    { month: 'Dec 25', closings: 89 },
    { month: 'Jan 26', closings: 56 },
    { month: 'Feb 26', closings: 45 },
    { month: 'Mar 26', closings: 24 },
  ]},
  { building: '400 Central', color: '#3b82f6', data: [
    { month: 'Dec 25', closings: 16 },
    { month: 'Jan 26', closings: 52 },
    { month: 'Feb 26', closings: 79 },
    { month: 'Mar 26', closings: 54 },
    { month: 'Apr 26', closings: 18 },
  ]},
];

const allMonths = ['Dec 25', 'Jan 26', 'Feb 26', 'Mar 26', 'Apr 26'];

// SVG chart dimensions
const W = 700;
const H = 320;
const PAD_L = 50;
const PAD_R = 30;
const PAD_T = 30;
const PAD_B = 50;
const CHART_W = W - PAD_L - PAD_R;
const CHART_H = H - PAD_T - PAD_B;

const maxClosings = 100; // nice round ceiling above 89

function monthX(idx: number): number {
  return PAD_L + (idx / (allMonths.length - 1)) * CHART_W;
}

function valueY(val: number): number {
  return PAD_T + CHART_H - (val / maxClosings) * CHART_H;
}

function buildPath(data: { month: string; closings: number }[]): string {
  const points = data.map((d) => {
    const idx = allMonths.indexOf(d.month);
    return { x: monthX(idx), y: valueY(d.closings) };
  });

  if (points.length < 2) return '';

  // Build smooth curve using catmull-rom-like approach
  let path = `M ${points[0].x} ${points[0].y}`;
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[Math.max(0, i - 1)];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[Math.min(points.length - 1, i + 2)];

    const cp1x = p1.x + (p2.x - p0.x) / 6;
    const cp1y = p1.y + (p2.y - p0.y) / 6;
    const cp2x = p2.x - (p3.x - p1.x) / 6;
    const cp2y = p2.y - (p3.y - p1.y) / 6;

    path += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p2.x} ${p2.y}`;
  }
  return path;
}

// Grid lines
const gridValues = [0, 25, 50, 75, 100];

export default function AbsorptionWave() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section className="py-16 bg-charcoal-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          variants={fadeUp}
        >
          <p className="text-xs font-body font-semibold uppercase tracking-[0.25em] text-gold-500 mb-3">
            Delivery Analytics
          </p>
          <h2 className="text-2xl md:text-3xl font-heading font-bold text-ivory-50 mb-2">
            Monthly Absorption Wave — Delivery Closings
          </h2>
          <div className="w-16 h-0.5 bg-gradient-to-r from-gold-500 to-blue-500 mb-6" />
          <p className="text-sm font-body text-charcoal-400 mb-8 max-w-3xl">
            Tracking monthly closing volume for Tampa Bay&apos;s two delivered buildings. Both projects exhibit the classic bell-curve pattern: a spike at initial delivery as the bulk of pre-sale contracts close, followed by a gradual decline as remaining inventory is absorbed at market pace.
          </p>

          <div ref={ref} className="rounded-xl border border-charcoal-800 bg-charcoal-900/80 backdrop-blur-sm p-6">
            <svg
              viewBox={`0 0 ${W} ${H}`}
              className="w-full h-auto"
              preserveAspectRatio="xMidYMid meet"
            >
              {/* Grid lines */}
              {gridValues.map((v) => (
                <g key={v}>
                  <line
                    x1={PAD_L}
                    y1={valueY(v)}
                    x2={W - PAD_R}
                    y2={valueY(v)}
                    stroke="rgba(255,255,255,0.06)"
                    strokeWidth={1}
                  />
                  <text
                    x={PAD_L - 10}
                    y={valueY(v) + 4}
                    textAnchor="end"
                    className="fill-charcoal-500"
                    fontSize={11}
                    fontFamily="Inter, sans-serif"
                  >
                    {v}
                  </text>
                </g>
              ))}

              {/* Month labels */}
              {allMonths.map((m, i) => (
                <text
                  key={m}
                  x={monthX(i)}
                  y={H - 12}
                  textAnchor="middle"
                  className="fill-charcoal-400"
                  fontSize={12}
                  fontFamily="Inter, sans-serif"
                >
                  {m}
                </text>
              ))}

              {/* Y axis label */}
              <text
                x={14}
                y={PAD_T + CHART_H / 2}
                textAnchor="middle"
                className="fill-charcoal-500"
                fontSize={11}
                fontFamily="Inter, sans-serif"
                transform={`rotate(-90, 14, ${PAD_T + CHART_H / 2})`}
              >
                Closings
              </text>

              {/* Animated paths */}
              {ABSORPTION_DATA.map((building) => {
                const d = buildPath(building.data);
                const peakData = building.data.reduce((max, curr) => curr.closings > max.closings ? curr : max, building.data[0]);
                const peakIdx = allMonths.indexOf(peakData.month);

                return (
                  <g key={building.building}>
                    {/* Path */}
                    <motion.path
                      d={d}
                      fill="none"
                      stroke={building.color}
                      strokeWidth={3}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      initial={{ pathLength: 0 }}
                      animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
                      transition={{ duration: 1.5, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    />

                    {/* Data points */}
                    {building.data.map((point, dotIdx) => {
                      const mIdx = allMonths.indexOf(point.month);
                      const isPeak = point === peakData;
                      return (
                        <g key={point.month}>
                          <motion.circle
                            cx={monthX(mIdx)}
                            cy={valueY(point.closings)}
                            r={isPeak ? 7 : 5}
                            fill={building.color}
                            stroke="#141418"
                            strokeWidth={2}
                            initial={{ opacity: 0, scale: 0 }}
                            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
                            transition={{ duration: 0.4, delay: 1.5 + dotIdx * 0.15 }}
                          />
                          {/* Peak pulse ring */}
                          {isPeak && (
                            <motion.circle
                              cx={monthX(mIdx)}
                              cy={valueY(point.closings)}
                              r={12}
                              fill="none"
                              stroke={building.color}
                              strokeWidth={1.5}
                              initial={{ opacity: 0, scale: 0 }}
                              animate={isInView ? {
                                opacity: [0, 0.6, 0],
                                scale: [0.5, 1.5, 2],
                              } : { opacity: 0 }}
                              transition={{
                                duration: 2,
                                delay: 2.2,
                                repeat: Infinity,
                                ease: 'easeOut',
                              }}
                            />
                          )}
                          {/* Peak label */}
                          {isPeak && (
                            <motion.text
                              x={monthX(mIdx)}
                              y={valueY(point.closings) - 16}
                              textAnchor="middle"
                              fill={building.color}
                              fontSize={12}
                              fontWeight={700}
                              fontFamily="Inter, sans-serif"
                              initial={{ opacity: 0, y: valueY(point.closings) - 8 }}
                              animate={isInView ? { opacity: 1, y: valueY(point.closings) - 16 } : { opacity: 0 }}
                              transition={{ duration: 0.4, delay: 2.0 }}
                            >
                              {point.closings}
                            </motion.text>
                          )}
                        </g>
                      );
                    })}
                  </g>
                );
              })}
            </svg>

            {/* Legend */}
            <div className="flex items-center justify-center gap-8 mt-4 pt-4 border-t border-charcoal-800/50">
              {ABSORPTION_DATA.map((b) => (
                <div key={b.building} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: b.color }} />
                  <span className="text-sm font-body text-charcoal-300">{b.building}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Narrative */}
          <div className="mt-6 rounded-xl border border-charcoal-800 bg-charcoal-900/60 backdrop-blur-sm p-6">
            <h3 className="text-sm font-body font-semibold uppercase tracking-widest text-gold-500 mb-3">
              The Bell Curve Pattern
            </h3>
            <div className="space-y-2 text-sm font-body leading-relaxed text-charcoal-300">
              <p>
                <span className="text-gold-400 font-semibold">Art House</span> peaked at 89 closings in its first delivery month (Dec 2025), declining to 24 in March 2026 — a textbook front-loaded absorption curve driven by pre-sale contract settlements. The bulk of buyer commitments close within the first 90 days of CO.
              </p>
              <p>
                <span className="text-blue-400 font-semibold">400 Central</span> shows a delayed peak at 79 closings in February 2026, two months after initial delivery — likely reflecting a phased CO schedule and staggered contract settlements. The April decline to 18 signals the transition from pre-sale closeouts to market-rate absorption.
              </p>
            </div>
          </div>

          <p className="mt-4 text-xs font-body text-charcoal-500">
            Source: Stellar MLS closed transactions by month. Includes developer closings only (excludes resale).
          </p>
        </motion.div>
      </div>
    </section>
  );
}
