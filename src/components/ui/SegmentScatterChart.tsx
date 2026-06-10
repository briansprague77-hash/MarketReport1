'use client';

import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

/* ── Data shape expected from BedroomSegmentAnalysis ─────────────── */
export interface ScatterDatum {
  floor: number;
  price: number;
  psfLiving: number;
  segment: string;
  color: string;
  unit: string;
  residenceType: string;
  livingSF: number;
}

export interface SegmentMeta {
  name: string;
  color: string;
}

interface SegmentScatterChartProps {
  data: ScatterDatum[];
  segments: SegmentMeta[];
}

/* ── Formatters ─────────────────────────────────────────────────── */
const fmtPrice = (n: number) =>
  '$' + n.toLocaleString('en-US', { maximumFractionDigits: 0 });

const fmtPsf = (n: number) =>
  '$' + n.toLocaleString('en-US', { maximumFractionDigits: 0 });

/* ── Custom Tooltip ─────────────────────────────────────────────── */
interface TooltipProps {
  active?: boolean;
  payload?: Array<{
    payload: ScatterDatum;
  }>;
}

function CustomTooltip({ active, payload }: TooltipProps) {
  if (!active || !payload?.length) return null;

  const d = payload[0].payload;
  return (
    <div className="bg-charcoal-900 border border-charcoal-700 rounded-sm px-4 py-3 shadow-lg min-w-[200px]">
      <p className="text-xs font-body font-semibold text-gold-500 uppercase tracking-wider mb-2">
        Unit {d.unit}
      </p>

      <div className="space-y-1.5">
        <div className="flex justify-between gap-4">
          <span className="text-xs font-body text-ivory-400">Segment</span>
          <span className="text-xs font-body font-semibold text-ivory-100">
            {d.segment}
          </span>
        </div>
        <div className="flex justify-between gap-4">
          <span className="text-xs font-body text-ivory-400">Floor</span>
          <span className="text-xs font-body font-semibold text-ivory-100">
            {d.floor}
          </span>
        </div>
        <div className="flex justify-between gap-4">
          <span className="text-xs font-body text-ivory-400">Price</span>
          <span className="text-xs font-body font-semibold text-ivory-100">
            {fmtPrice(d.price)}
          </span>
        </div>
        <div className="flex justify-between gap-4">
          <span className="text-xs font-body text-ivory-400">$/SF (Living)</span>
          <span className="text-xs font-body font-semibold text-ivory-100">
            {fmtPsf(d.psfLiving)}
          </span>
        </div>
        <div className="flex justify-between gap-4">
          <span className="text-xs font-body text-ivory-400">Living SF</span>
          <span className="text-xs font-body font-semibold text-ivory-100">
            {d.livingSF.toLocaleString()}
          </span>
        </div>
        <div className="flex justify-between gap-4">
          <span className="text-xs font-body text-ivory-400">Plan</span>
          <span className="text-xs font-body font-semibold text-ivory-100">
            {d.residenceType}
          </span>
        </div>
      </div>
    </div>
  );
}

/* ── Custom Legend ───────────────────────────────────────────────── */
interface LegendPayloadEntry {
  value: string;
  color?: string;
}

function CustomLegend({ payload }: { payload?: LegendPayloadEntry[] }) {
  if (!payload?.length) return null;
  return (
    <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mt-4">
      {payload.map((entry) => (
        <div key={entry.value} className="flex items-center gap-2">
          <span
            className="inline-block w-3 h-3 rounded-full"
            style={{ backgroundColor: entry.color }}
          />
          <span className="text-xs font-body text-charcoal-600">
            {entry.value}
          </span>
        </div>
      ))}
    </div>
  );
}

/* ── Main Chart Component ───────────────────────────────────────── */
export default function SegmentScatterChart({
  data,
  segments,
}: SegmentScatterChartProps) {
  // Group data by segment for separate Scatter series
  const seriesMap = new Map<string, ScatterDatum[]>();
  for (const d of data) {
    const arr = seriesMap.get(d.segment) ?? [];
    arr.push(d);
    seriesMap.set(d.segment, arr);
  }

  // Compute axis domains with comfortable padding
  const floors = data.map((d) => d.floor);
  const prices = data.map((d) => d.price);
  const minFloor = Math.min(...floors);
  const maxFloor = Math.max(...floors);
  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);

  const floorPad = Math.max(1, Math.round((maxFloor - minFloor) * 0.08));
  const pricePad = Math.round((maxPrice - minPrice) * 0.08);

  return (
    <div className="w-full">
      <div className="h-[320px] md:h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart
            margin={{ top: 12, right: 16, left: 8, bottom: 4 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#F0EBE0"
              vertical={false}
            />
            <XAxis
              type="number"
              dataKey="floor"
              name="Floor"
              domain={[minFloor - floorPad, maxFloor + floorPad]}
              tick={{
                fill: '#66666B',
                fontSize: 11,
                fontFamily: 'var(--font-inter)',
              }}
              tickLine={false}
              axisLine={{ stroke: '#F0EBE0' }}
              label={{
                value: 'Floor',
                position: 'insideBottomRight',
                offset: -4,
                style: {
                  fill: '#66666B',
                  fontSize: 10,
                  fontFamily: 'var(--font-inter)',
                  textTransform: 'uppercase' as const,
                  letterSpacing: '0.1em',
                },
              }}
            />
            <YAxis
              type="number"
              dataKey="price"
              name="Price"
              domain={[minPrice - pricePad, maxPrice + pricePad]}
              tickFormatter={(v: number) =>
                `$${(v / 1_000_000).toFixed(1)}M`
              }
              tick={{
                fill: '#66666B',
                fontSize: 11,
                fontFamily: 'var(--font-inter)',
              }}
              tickLine={false}
              axisLine={{ stroke: '#F0EBE0' }}
              width={72}
            />
            <Tooltip
              content={<CustomTooltip />}
              cursor={{ strokeDasharray: '3 3', stroke: '#C9A84C' }}
            />
            <Legend content={<CustomLegend />} />

            {segments.map((seg) => {
              const segData = seriesMap.get(seg.name) ?? [];
              return (
                <Scatter
                  key={seg.name}
                  name={seg.name}
                  data={segData}
                  fill={seg.color}
                  fillOpacity={0.85}
                  stroke={seg.color}
                  strokeWidth={1.5}
                  r={6}
                />
              );
            })}
          </ScatterChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
