'use client';

import { DevelopmentProfile } from '@/types/development-profile';

type LifecycleData = NonNullable<DevelopmentProfile['lifecycle']>;

interface MilestoneStep {
  key: keyof LifecycleData;
  label: string;
  order: number;
}

const MILESTONE_ORDER: MilestoneStep[] = [
  { key: 'announcementDate', label: 'Announcement', order: 0 },
  { key: 'siteAcquisitionDate', label: 'Site Acquisition', order: 1 },
  { key: 'salesGalleryOpening', label: 'Sales Gallery', order: 2 },
  { key: 'salesLaunchDate', label: 'Sales Launch', order: 3 },
  { key: 'groundbreakingDate', label: 'Groundbreaking', order: 4 },
  { key: 'constructionStartDate', label: 'Construction Start', order: 5 },
  { key: 'verticalConstructionDate', label: 'Vertical Construction', order: 6 },
  { key: 'toppingOffDate', label: 'Topping Off', order: 7 },
  { key: 'coDate', label: 'CO Issued', order: 8 },
  { key: 'firstClosingDate', label: 'First Closing', order: 9 },
  { key: 'estimatedSelloutDate', label: 'Est. Sellout', order: 10 },
];

// Map development status to approximate lifecycle position
function getStatusOrder(status: string): number {
  const statusMap: Record<string, number> = {
    'reservation': 0,
    'pre-sales': 3,
    'under-construction': 6,
    'delivered': 9,
    'sold-out': 10,
  };
  return statusMap[status] ?? 3;
}

interface Props {
  lifecycle: LifecycleData;
  status: string;
}

export default function LifecycleTimeline({ lifecycle, status }: Props) {
  // Only show milestones that have dates
  const activeMilestones = MILESTONE_ORDER.filter(
    (m) => lifecycle[m.key] !== undefined,
  );

  if (activeMilestones.length === 0) return null;

  const currentOrder = getStatusOrder(status);

  return (
    <div className="bg-charcoal-900/80 border border-charcoal-800 rounded-xl p-6">
      <h3 className="font-heading text-sm font-bold text-ivory-100 uppercase tracking-wider mb-1">
        Project Lifecycle
      </h3>
      <p className="font-body text-xs text-charcoal-400 mb-6">
        Key milestones from announcement through sellout
      </p>

      {/* Timeline */}
      <div className="overflow-x-auto pb-2">
        <div className="flex items-start gap-0 min-w-max">
          {activeMilestones.map((milestone, idx) => {
            const date = lifecycle[milestone.key]!;
            const isPast = milestone.order < currentOrder;
            const isCurrent =
              milestone.order === currentOrder ||
              (idx > 0 &&
                activeMilestones[idx - 1].order < currentOrder &&
                milestone.order > currentOrder &&
                // Find the closest milestone at or after current
                !activeMilestones.some(
                  (m) =>
                    m.order >= currentOrder &&
                    m.order < milestone.order &&
                    m.key !== milestone.key,
                ));
            const isCompleted = isPast;
            const isLast = idx === activeMilestones.length - 1;

            return (
              <div key={milestone.key} className="flex items-start">
                {/* Milestone node */}
                <div className="flex flex-col items-center" style={{ minWidth: 120 }}>
                  {/* Date label above */}
                  <span
                    className={`font-body text-[10px] mb-2 text-center leading-tight ${
                      isCompleted || isCurrent
                        ? 'text-gold-400 font-semibold'
                        : 'text-charcoal-500'
                    }`}
                  >
                    {date}
                  </span>

                  {/* Dot + connector row */}
                  <div className="flex items-center w-full">
                    {/* Left connector */}
                    {idx > 0 && (
                      <div
                        className={`flex-1 h-px ${
                          isCompleted || isCurrent
                            ? 'bg-gold-500'
                            : 'border-t border-dashed border-charcoal-600'
                        }`}
                      />
                    )}
                    {idx === 0 && <div className="flex-1" />}

                    {/* Dot */}
                    <div className="relative flex-shrink-0">
                      <div
                        className={`w-3 h-3 rounded-full border-2 ${
                          isCurrent
                            ? 'bg-gold-500 border-gold-400 shadow-[0_0_8px_rgba(212,168,83,0.6)]'
                            : isCompleted
                              ? 'bg-gold-500 border-gold-500'
                              : 'bg-charcoal-700 border-charcoal-600'
                        }`}
                      />
                      {isCurrent && (
                        <div className="absolute inset-0 rounded-full bg-gold-500/40 animate-ping" />
                      )}
                    </div>

                    {/* Right connector */}
                    {!isLast && (
                      <div
                        className={`flex-1 h-px ${
                          isCompleted
                            ? 'bg-gold-500'
                            : 'border-t border-dashed border-charcoal-600'
                        }`}
                      />
                    )}
                    {isLast && <div className="flex-1" />}
                  </div>

                  {/* Label below */}
                  <span
                    className={`font-body text-[10px] mt-2 text-center leading-tight max-w-[100px] ${
                      isCompleted || isCurrent
                        ? 'text-ivory-200'
                        : 'text-charcoal-500'
                    }`}
                  >
                    {milestone.label}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
