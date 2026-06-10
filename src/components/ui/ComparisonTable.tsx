import { Competitor } from '@/types/development';

interface ComparisonTableProps {
  competitors: Competitor[];
}

export default function ComparisonTable({ competitors }: ComparisonTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b-2 border-charcoal-200">
            <th className="py-4 px-4 text-xs font-body font-semibold uppercase tracking-widest text-charcoal-500">
              Development
            </th>
            <th className="py-4 px-4 text-xs font-body font-semibold uppercase tracking-widest text-charcoal-500">
              Height
            </th>
            <th className="py-4 px-4 text-xs font-body font-semibold uppercase tracking-widest text-charcoal-500">
              Units
            </th>
            <th className="py-4 px-4 text-xs font-body font-semibold uppercase tracking-widest text-charcoal-500">
              Avg PSF
            </th>
            <th className="py-4 px-4 text-xs font-body font-semibold uppercase tracking-widest text-charcoal-500">
              Delivery
            </th>
            <th className="py-4 px-4 text-xs font-body font-semibold uppercase tracking-widest text-charcoal-500">
              Status
            </th>
          </tr>
        </thead>
        <tbody>
          {competitors.map((comp, i) => (
            <tr
              key={i}
              className={`border-b border-ivory-300 transition-colors ${
                comp.isFeatured
                  ? 'bg-gold-500/5 border-l-4 border-l-gold-500'
                  : 'hover:bg-ivory-100'
              }`}
            >
              <td className="py-4 px-4">
                <div className="flex items-center gap-2">
                  <span
                    className={`font-body font-semibold ${
                      comp.isFeatured ? 'text-gold-600' : 'text-charcoal-900'
                    }`}
                  >
                    {comp.name}
                  </span>
                  {comp.isFeatured && (
                    <span className="text-[10px] font-body font-bold uppercase tracking-widest text-gold-500 bg-gold-500/10 px-2 py-0.5 rounded-sm">
                      Featured
                    </span>
                  )}
                </div>
              </td>
              <td className="py-4 px-4 text-sm font-body text-charcoal-700">
                {comp.height}
              </td>
              <td className="py-4 px-4 text-sm font-body text-charcoal-700">
                {comp.units}
              </td>
              <td className="py-4 px-4 text-sm font-body font-medium text-charcoal-900">
                {comp.avgPsf}
              </td>
              <td className="py-4 px-4 text-sm font-body text-charcoal-700">
                {comp.delivery}
              </td>
              <td className="py-4 px-4">
                <span
                  className={`text-xs font-body font-semibold uppercase tracking-wider px-2 py-1 rounded-sm ${
                    comp.status.includes('Sold')
                      ? 'bg-gold-500/10 text-gold-600'
                      : comp.status === 'Delivering'
                      ? 'bg-emerald-500/10 text-emerald-500'
                      : 'bg-charcoal-100 text-charcoal-600'
                  }`}
                >
                  {comp.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
