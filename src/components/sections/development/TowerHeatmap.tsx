'use client';

import { useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Development, UnitPricingLedger } from '@/types/development';
import {
  fadeUp,
  staggerContainer,
  staggerItem,
  defaultViewport,
} from '@/lib/animations';

interface TowerHeatmapProps {
  development: Development;
}

/* ── Helpers ─────────────────────────────────────────────────── */

const formatPrice = (n: number) =>
  '$' + n.toLocaleString('en-US', { maximumFractionDigits: 0 });

const formatPsf = (n: number) =>
  '$' + n.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 });

/** Map PSF value to heat color.
 *  Low PSF  → deep teal/blue  (cool — value end)
 *  Mid PSF  → gold            (warm — mid-market)
 *  High PSF → deep rose/red   (hot  — premium end) */
function psfToColor(psf: number, min: number, max: number): string {
  const t = max === min ? 0.5 : (psf - min) / (max - min);

  // 3-stop gradient: teal → gold → rose
  if (t < 0.5) {
    const s = t / 0.5; // 0-1 within first half
    const r = Math.round(45 + s * (196 - 45));
    const g = Math.round(160 + s * (163 - 160));
    const b = Math.round(150 + s * (52 - 150));
    return `rgb(${r}, ${g}, ${b})`;
  } else {
    const s = (t - 0.5) / 0.5; // 0-1 within second half
    const r = Math.round(196 + s * (190 - 196));
    const g = Math.round(163 + s * (60 - 163));
    const b = Math.round(52 + s * (70 - 52));
    return `rgb(${r}, ${g}, ${b})`;
  }
}

/** Lighter version for text readability check */
function textColorForBg(psf: number, min: number, max: number): string {
  const t = max === min ? 0.5 : (psf - min) / (max - min);
  return t > 0.65 ? '#FFF7ED' : '#1C1917'; // ivory-50 or charcoal-900
}

const trendLabel = (trend: string) => {
  switch (trend) {
    case 'up': return '▲ Up';
    case 'down': return '▼ Down';
    case 'stable': return '● Stable';
    case 'new': return '★ New';
    default: return '';
  }
};

/* ── Component ───────────────────────────────────────────────── */

export default function TowerHeatmap({ development }: TowerHeatmapProps) {
  const { pricingLadder } = development;
  const hasData = !!pricingLadder && pricingLadder.units.length > 0;

  const [activeUnit, setActiveUnit] = useState<UnitPricingLedger | null>(null);

  // Derive floor + residence grid from unit data
  const { floors, residenceTypes, unitMap, psfMin, psfMax } = useMemo(() => {
    if (!hasData) return { floors: [] as number[], residenceTypes: [] as string[], unitMap: {} as Record<string, UnitPricingLedger>, psfMin: 0, psfMax: 0 };
    const units = pricingLadder!.units;

    // Unique residence types in order
    const resTypesSet: string[] = [];
    units.forEach((u) => {
      if (resTypesSet.indexOf(u.residenceType) === -1) resTypesSet.push(u.residenceType);
    });

    // All unique floors, sorted descending (top of building first)
    const floorSet = Array.from(new Set(units.map((u) => u.floor))).sort((a, b) => b - a);

    // PSF range
    const psfs = units.map((u) => u.currentPsfLiving);
    const minPsf = Math.min(...psfs);
    const maxPsf = Math.max(...psfs);

    // Build lookup: `${floor}-${residenceType}` → unit
    const map: Record<string, UnitPricingLedger> = {};
    units.forEach((u) => {
      map[`${u.floor}-${u.residenceType}`] = u;
    });

    return {
      floors: floorSet,
      residenceTypes: resTypesSet,
      unitMap: map,
      psfMin: minPsf,
      psfMax: maxPsf,
    };
  }, [hasData, pricingLadder]);

  const handleCellHover = useCallback(
    (unit: UnitPricingLedger) => {
      setActiveUnit(unit);
    },
    []
  );

  const handleCellLeave = useCallback(() => {
    setActiveUnit(null);
  }, []);

  // Short residence label: "Res 01" etc.
  const shortLabel = (rt: string) => rt.replace('Residence ', 'Res ');

  if (!hasData) return null;

  // Bed count from first unit of that type
  const bedCountFor = (rt: string): string => {
    const unit = pricingLadder!.units.find((u) => u.residenceType === rt);
    return unit ? `${unit.bedrooms}BR` : '';
  };

  return (
    <section className="py-12 bg-ivory-50">
      <div className="container-luxury">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="h-px w-8 bg-gold-500" />
            <span className="text-gold-600 text-xs font-body font-semibold uppercase tracking-[0.2em]">
              Interactive Visualization
            </span>
            <div className="h-px w-8 bg-gold-500" />
          </div>
          <h3 className="text-2xl md:text-3xl font-heading font-bold text-charcoal-900 mb-2">
            Tower Pricing Heatmap
          </h3>
          <p className="text-sm font-body text-charcoal-500 mb-8 max-w-2xl">
            Each cell represents a tracked unit. Color intensity reflects price-per-square-foot
            — cooler tones are entry-level, gold is mid-market, and warm tones indicate premium
            positioning. Hover for unit details.
          </p>
        </motion.div>

        {/* Legend */}
        <motion.div
          className="flex flex-wrap items-center gap-6 mb-8"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
        >
          <div className="flex items-center gap-2">
            <div className="w-24 h-3 rounded-full" style={{
              background: `linear-gradient(to right, ${psfToColor(psfMin, psfMin, psfMax)}, ${psfToColor((psfMin + psfMax) / 2, psfMin, psfMax)}, ${psfToColor(psfMax, psfMin, psfMax)})`
            }} />
            <span className="text-[10px] font-body text-charcoal-400 uppercase tracking-wider">
              PSF Heat
            </span>
          </div>
          <div className="flex items-center gap-4 text-[10px] font-body text-charcoal-500 uppercase tracking-wider">
            <span>{formatPsf(psfMin)}/SF</span>
            <span className="text-charcoal-300">→</span>
            <span>{formatPsf(psfMax)}/SF</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-sm border-2 border-dashed border-charcoal-300 flex items-center justify-center">
              <span className="text-charcoal-300 text-[10px]">—</span>
            </div>
            <span className="text-[10px] font-body text-charcoal-400 uppercase tracking-wider">
              No Data
            </span>
          </div>
        </motion.div>

        {/* Tower Grid */}
        <motion.div
          className="relative"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
        >
          {/* Column Headers — Residence Types */}
          <motion.div
            className="grid gap-1.5 mb-2"
            style={{ gridTemplateColumns: `64px repeat(${residenceTypes.length}, 1fr)` }}
            variants={staggerItem}
          >
            <div className="text-[10px] font-body font-semibold text-charcoal-400 uppercase tracking-wider text-center self-end pb-1">
              Floor
            </div>
            {residenceTypes.map((rt) => (
              <div
                key={rt}
                className="text-center pb-1"
              >
                <div className="text-xs font-body font-semibold text-charcoal-800 uppercase tracking-wider">
                  {shortLabel(rt)}
                </div>
                <div className="text-[10px] font-body text-charcoal-400">
                  {bedCountFor(rt)}
                </div>
              </div>
            ))}
          </motion.div>

          {/* Floor Rows — top of building first */}
          {floors.map((floor, fi) => (
            <motion.div
              key={floor}
              className="grid gap-1.5 mb-1.5"
              style={{ gridTemplateColumns: `64px repeat(${residenceTypes.length}, 1fr)` }}
              variants={staggerItem}
            >
              {/* Floor number */}
              <div className="flex items-center justify-center">
                <span className="text-xs font-heading font-bold text-charcoal-600">
                  {floor}
                </span>
              </div>

              {/* Unit cells */}
              {residenceTypes.map((rt) => {
                const unit = unitMap[`${floor}-${rt}`];

                if (!unit) {
                  // Empty cell — no tracked unit at this floor/type
                  return (
                    <div
                      key={`${floor}-${rt}`}
                      className="h-14 md:h-16 rounded-sm border border-dashed border-ivory-300 bg-ivory-100/50"
                    />
                  );
                }

                const bg = psfToColor(unit.currentPsfLiving, psfMin, psfMax);
                const fg = textColorForBg(unit.currentPsfLiving, psfMin, psfMax);
                const isActive = activeUnit?.unit === unit.unit;
                const hasDecrease = unit.trend === 'down';

                return (
                  <motion.div
                    key={`${floor}-${rt}`}
                    className={`
                      relative h-14 md:h-16 rounded-sm cursor-pointer
                      flex flex-col items-center justify-center
                      transition-all duration-200
                      ${isActive ? 'ring-2 ring-gold-500 ring-offset-2 ring-offset-ivory-50 z-10 scale-105' : 'hover:scale-[1.03]'}
                      ${hasDecrease ? 'ring-1 ring-red-400/50' : ''}
                    `}
                    style={{ backgroundColor: bg }}
                    onMouseEnter={() => handleCellHover(unit)}
                    onMouseLeave={handleCellLeave}
                    whileHover={{ y: -2 }}
                  >
                    <span
                      className="text-sm md:text-base font-heading font-bold leading-none"
                      style={{ color: fg }}
                    >
                      {formatPsf(unit.currentPsfLiving)}
                    </span>
                    <span
                      className="text-[9px] md:text-[10px] font-body mt-0.5 opacity-80"
                      style={{ color: fg }}
                    >
                      {unit.unit}
                    </span>
                    {hasDecrease && (
                      <div className="absolute top-1 right-1">
                        <span className="text-[8px]" title="Price decrease documented">▼</span>
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </motion.div>
          ))}
        </motion.div>

        {/* Tooltip Card (fixed position below grid for mobile-friendly approach) */}
        <AnimatePresence>
          {activeUnit && (
            <motion.div
              className="mt-6 bg-charcoal-800 rounded-sm p-6 border border-charcoal-700"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <span className="text-lg font-heading font-bold text-ivory-50">
                      Unit {activeUnit.unit}
                    </span>
                    <span className="text-[10px] font-body font-semibold uppercase tracking-wider text-charcoal-400">
                      Floor {activeUnit.floor}
                    </span>
                    <span className="text-[10px] font-body font-medium text-gold-500 uppercase tracking-wider">
                      {activeUnit.residenceType}
                    </span>
                  </div>
                  <div className="text-sm font-body text-ivory-400">
                    {activeUnit.bedrooms}BR / {activeUnit.bathrooms}BA &middot;{' '}
                    {activeUnit.livingSF.toLocaleString()} SF living &middot;{' '}
                    {activeUnit.terraceSF.toLocaleString()} SF terrace
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-heading font-bold text-gold-500">
                    {formatPrice(activeUnit.currentPrice)}
                  </div>
                  <div className="text-sm font-body text-ivory-400">
                    {formatPsf(activeUnit.currentPsfLiving)}/SF living
                  </div>
                </div>
              </div>

              {/* Trend + price history count */}
              <div className="flex items-center gap-4 mt-4 pt-4 border-t border-charcoal-700">
                <span className={`text-xs font-body font-semibold uppercase tracking-wider ${
                  activeUnit.trend === 'down' ? 'text-red-400' :
                  activeUnit.trend === 'up' ? 'text-emerald-400' :
                  activeUnit.trend === 'new' ? 'text-sky-400' :
                  'text-charcoal-400'
                }`}>
                  {trendLabel(activeUnit.trend)}
                  {activeUnit.trendPercent && activeUnit.trendPercent !== 0
                    ? ` ${activeUnit.trendPercent > 0 ? '+' : ''}${activeUnit.trendPercent.toFixed(1)}%`
                    : ''}
                </span>
                <span className="text-[10px] font-body text-charcoal-500">
                  {activeUnit.priceHistory.length} price record{activeUnit.priceHistory.length !== 1 ? 's' : ''}
                </span>
                {activeUnit.trend === 'down' && (
                  <span className="text-[10px] font-body text-red-400/80 italic">
                    Documented price decrease — see Pricing Ladder for full provenance
                  </span>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Heatmap Interpretation Narrative ── */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          className="mt-8 mb-6 max-w-3xl"
        >
          <p className="text-sm font-body text-charcoal-600 leading-relaxed">
            The heatmap above visualizes price-per-square-foot across every unit in
            the tower — each cell represents one residence, positioned by floor and
            plan type. Cool tones (teal) mark the lowest PSF in the building; warm
            tones (gold through rose) mark the highest. The pattern reveals where
            developers have placed the most aggressive premiums and where relative
            value still exists. Horizontal bands of color shift indicate floor
            premium acceleration — when the jump from one row to the next deepens
            in color, the per-floor premium is steepening. Vertical clusters of
            warm color highlight which residence types command the highest PSF
            regardless of floor. Hover any cell for full pricing detail. The floor
            premium cards below quantify the exact per-floor increment by residence
            type.
          </p>
        </motion.div>

        {/* Floor Premium Summary */}
        {pricingLadder.floorPremiums && pricingLadder.floorPremiums.length > 0 && (
          <motion.div
            className="mt-10"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={defaultViewport}
          >
            <h4 className="text-xs font-body font-semibold uppercase tracking-widest text-charcoal-500 mb-4">
              Floor Premium by Residence Type
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {pricingLadder.floorPremiums.map((fp, i) => (
                <div
                  key={i}
                  className="bg-white border border-ivory-300 rounded-sm p-4 hover:border-gold-500/30 transition-all"
                >
                  <div className="text-[10px] font-body font-semibold uppercase tracking-wider text-charcoal-400 mb-2">
                    {shortLabel(fp.residenceType)}
                  </div>
                  <div className="text-lg font-heading font-bold text-charcoal-900 mb-1">
                    {formatPrice(fp.basePricePerFloor)}
                    <span className="text-xs font-body font-normal text-charcoal-400 ml-1">base / floor</span>
                  </div>
                  {fp.premiumPerFloor.length > 0 && (
                    <div className="space-y-1 mt-2 pt-2 border-t border-ivory-200">
                      {fp.premiumPerFloor.map((range, j) => (
                        <div key={j} className="flex justify-between text-[11px] font-body text-charcoal-500">
                          <span>Floors {range.fromFloor}–{range.toFloor}</span>
                          <span className="font-semibold text-charcoal-700">{formatPrice(range.perFloor)}/fl</span>
                        </div>
                      ))}
                    </div>
                  )}
                  {fp.accelerationFactor && (
                    <div className="text-[10px] font-body text-gold-600 mt-1">
                      {fp.accelerationFactor}× acceleration
                    </div>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
