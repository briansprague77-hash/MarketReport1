'use client';

import {
  BarChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ComposedChart,
  Area,
} from 'recharts';
import { MonthlySalesData } from '@/types/development';

interface AbsorptionChartProps {
  data: MonthlySalesData[];
  totalUnits: number;
}

/* ── Custom Tooltip ──────────────────────────────────────────────────── */
function CustomTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: Array<{ value: number; dataKey: string }>;
  label?: string;
}) {
  if (!active || !payload?.length) return null;

  const unitsSold = payload.find((p) => p.dataKey === 'unitsSold')?.value ?? 0;
  const cumulative = payload.find((p) => p.dataKey === 'cumulative')?.value ?? 0;
  const cumulativePercent =
    payload.find((p) => p.dataKey === 'cumulativePercent')?.value ?? 0;

  return (
    <div className="bg-charcoal-900 border border-charcoal-700 rounded-sm px-4 py-3 shadow-lg">
      <p className="text-xs font-body font-semibold text-gold-500 uppercase tracking-wider mb-2">
        {label}
      </p>
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-sm bg-gold-500 inline-block" />
          <span className="text-xs font-body text-ivory-300">
            {unitsSold} units sold
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
          <span className="text-xs font-body text-ivory-300">
            {cumulative} cumulative ({cumulativePercent}%)
          </span>
        </div>
      </div>
    </div>
  );
}

/* ── Main Chart Component ────────────────────────────────────────────── */
export default function AbsorptionChart({ data, totalUnits }: AbsorptionChartProps) {
  // Max Y axis for bar chart — find the max unitsSold and add headroom
  const maxUnits = Math.max(...data.map((d) => d.unitsSold));
  const barMax = Math.ceil(maxUnits * 1.3);

  return (
    <div className="w-full">
      {/* Legend */}
      <div className="flex items-center gap-6 mb-4">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-sm bg-gold-500 inline-block" />
          <span className="text-xs font-body text-charcoal-500">Monthly Sales</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block" />
          <span className="text-xs font-body text-charcoal-500">
            Cumulative (of {totalUnits})
          </span>
        </div>
      </div>

      {/* Chart */}
      <div className="h-[280px] md:h-[320px]">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart
            data={data}
            margin={{ top: 8, right: 8, left: -16, bottom: 0 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#F0EBE0"
              vertical={false}
            />
            <XAxis
              dataKey="month"
              tick={{ fill: '#66666B', fontSize: 11, fontFamily: 'var(--font-inter)' }}
              tickLine={false}
              axisLine={{ stroke: '#F0EBE0' }}
            />
            {/* Left Y axis — monthly units */}
            <YAxis
              yAxisId="left"
              domain={[0, barMax]}
              tick={{ fill: '#66666B', fontSize: 11, fontFamily: 'var(--font-inter)' }}
              tickLine={false}
              axisLine={false}
              allowDecimals={false}
            />
            {/* Right Y axis — cumulative units */}
            <YAxis
              yAxisId="right"
              orientation="right"
              domain={[0, totalUnits]}
              tick={{ fill: '#66666B', fontSize: 11, fontFamily: 'var(--font-inter)' }}
              tickLine={false}
              axisLine={false}
              allowDecimals={false}
            />

            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(201, 168, 76, 0.06)' }} />

            {/* Cumulative area (behind bars) */}
            <Area
              yAxisId="right"
              type="monotone"
              dataKey="cumulative"
              fill="rgba(13, 150, 104, 0.08)"
              stroke="none"
            />

            {/* Monthly sales bars */}
            <Bar
              yAxisId="left"
              dataKey="unitsSold"
              fill="#C9A84C"
              radius={[3, 3, 0, 0]}
              maxBarSize={36}
            />

            {/* Cumulative line */}
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="cumulative"
              stroke="#0D9668"
              strokeWidth={2.5}
              dot={{ r: 4, fill: '#0D9668', strokeWidth: 2, stroke: '#fff' }}
              activeDot={{ r: 6, fill: '#0D9668', strokeWidth: 2, stroke: '#fff' }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      {/* Summary Strip */}
      <div className="grid grid-cols-3 gap-3 mt-4">
        <div className="text-center py-2 bg-ivory-50 border border-ivory-300 rounded-sm">
          <div className="text-sm font-heading font-bold text-charcoal-900">
            {data[data.length - 1]?.cumulative ?? 0}
          </div>
          <div className="text-[10px] font-body text-charcoal-500 uppercase tracking-wider">
            Total Sold
          </div>
        </div>
        <div className="text-center py-2 bg-ivory-50 border border-ivory-300 rounded-sm">
          <div className="text-sm font-heading font-bold text-charcoal-900">
            {data[data.length - 1]?.cumulativePercent ?? 0}%
          </div>
          <div className="text-[10px] font-body text-charcoal-500 uppercase tracking-wider">
            Absorbed
          </div>
        </div>
        <div className="text-center py-2 bg-ivory-50 border border-ivory-300 rounded-sm">
          <div className="text-sm font-heading font-bold text-charcoal-900">
            {totalUnits - (data[data.length - 1]?.cumulative ?? 0)}
          </div>
          <div className="text-[10px] font-body text-charcoal-500 uppercase tracking-wider">
            Remaining
          </div>
        </div>
      </div>
    </div>
  );
}
