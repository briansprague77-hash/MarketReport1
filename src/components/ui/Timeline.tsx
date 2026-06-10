import { TimelineEvent } from '@/types/development';

interface TimelineProps {
  events: TimelineEvent[];
}

const statusStyles: Record<string, { dot: string; line: string; bg: string }> = {
  completed: {
    dot: 'bg-gold-500 ring-4 ring-gold-500/20',
    line: 'bg-gold-500',
    bg: 'bg-gold-500/5',
  },
  active: {
    dot: 'bg-emerald-500 ring-4 ring-emerald-500/20 animate-pulse',
    line: 'bg-charcoal-200',
    bg: 'bg-emerald-500/5',
  },
  upcoming: {
    dot: 'bg-charcoal-300 ring-4 ring-charcoal-100',
    line: 'bg-charcoal-200',
    bg: 'bg-transparent',
  },
};

export default function Timeline({ events }: TimelineProps) {
  return (
    <div className="relative">
      {events.map((event, i) => {
        const style = statusStyles[event.status];
        const isLast = i === events.length - 1;

        return (
          <div key={i} className="relative flex gap-6 pb-10 last:pb-0">
            {/* Vertical line */}
            <div className="flex flex-col items-center">
              <div className={`w-4 h-4 rounded-full shrink-0 ${style.dot}`} />
              {!isLast && (
                <div className={`w-0.5 flex-1 mt-2 ${style.line}`} />
              )}
            </div>

            {/* Content */}
            <div className={`flex-1 rounded-sm p-5 -mt-1 ${style.bg}`}>
              <div className="flex items-center gap-3 mb-2">
                <span className="text-xs font-body font-semibold uppercase tracking-widest text-gold-500">
                  {event.date}
                </span>
                {event.status === 'active' && (
                  <span className="text-[10px] font-body font-bold uppercase tracking-widest text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-sm">
                    Current
                  </span>
                )}
              </div>
              <h4 className="text-lg font-heading font-bold text-charcoal-900 mb-1">
                {event.title}
              </h4>
              <p className="text-sm font-body text-charcoal-600 leading-relaxed">
                {event.description}
              </p>
              {event.absorption && (
                <div className="mt-3 text-xs font-body font-medium text-charcoal-500 bg-ivory-100 px-3 py-1.5 rounded-sm inline-block">
                  {event.absorption}
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
