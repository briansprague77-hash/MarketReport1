import type { DevelopmentSummary } from '@/data/developments';

// ─── Timing Window Types ────────────────────────────────────────────────────

export type TimingWindow =
  | 'discovery'        // announced, no sales yet
  | 'launch'           // sales just started
  | 'acceleration'     // strong absorption, rising prices
  | 'escalation'       // prices rising, pace steady
  | 'resistance'       // pace slowing, prices high
  | 'incentive'        // developer offering incentives
  | 'closeout'         // <10% remaining
  | 'resale-crossover' // resales competing with developer
  | 'delivered';       // fully delivered, market-led

// ─── Classification Logic ───────────────────────────────────────────────────

export function classifyTimingWindow(dev: DevelopmentSummary): TimingWindow {
  const status = dev.status;
  const pressure = dev.inventoryPressure;

  switch (status) {
    case 'reservation':
      return 'discovery';

    case 'pre-sales':
      if (pressure === 'high') return 'launch';
      if (pressure === 'medium') return 'acceleration';
      if (pressure === 'low') return 'escalation';
      return 'launch'; // default for pre-sales without pressure data

    case 'under-construction':
      return 'acceleration';

    case 'delivered':
      if (pressure === 'high') return 'resistance';
      if (pressure === 'medium') return 'escalation';
      if (pressure === 'low') return 'closeout';
      return 'delivered';

    default:
      return 'discovery';
  }
}

// ─── Window Metadata ────────────────────────────────────────────────────────

export interface TimingWindowMeta {
  label: string;
  description: string;
  color: string;       // Tailwind class name base (e.g., 'gray')
  bgClass: string;
  textClass: string;
  borderClass: string;
}

export const TIMING_WINDOW_META: Record<TimingWindow, TimingWindowMeta> = {
  discovery: {
    label: 'Discovery',
    description: 'Announced — no active sales yet',
    color: 'gray',
    bgClass: 'bg-gray-100',
    textClass: 'text-gray-700',
    borderClass: 'border-gray-300',
  },
  launch: {
    label: 'Launch',
    description: 'Sales just started — high inventory available',
    color: 'blue',
    bgClass: 'bg-blue-100',
    textClass: 'text-blue-700',
    borderClass: 'border-blue-300',
  },
  acceleration: {
    label: 'Acceleration',
    description: 'Strong absorption — prices rising',
    color: 'emerald',
    bgClass: 'bg-emerald-100',
    textClass: 'text-emerald-700',
    borderClass: 'border-emerald-300',
  },
  escalation: {
    label: 'Escalation',
    description: 'Prices rising — pace steady',
    color: 'gold',
    bgClass: 'bg-gold-100',
    textClass: 'text-gold-700',
    borderClass: 'border-gold-300',
  },
  resistance: {
    label: 'Resistance',
    description: 'Pace slowing — prices high',
    color: 'orange',
    bgClass: 'bg-orange-100',
    textClass: 'text-orange-700',
    borderClass: 'border-orange-300',
  },
  incentive: {
    label: 'Incentive',
    description: 'Developer offering incentives',
    color: 'red',
    bgClass: 'bg-red-100',
    textClass: 'text-red-700',
    borderClass: 'border-red-300',
  },
  closeout: {
    label: 'Closeout',
    description: 'Less than 10% remaining',
    color: 'purple',
    bgClass: 'bg-purple-100',
    textClass: 'text-purple-700',
    borderClass: 'border-purple-300',
  },
  'resale-crossover': {
    label: 'Resale Crossover',
    description: 'Resales competing with developer',
    color: 'red',
    bgClass: 'bg-red-50',
    textClass: 'text-red-600',
    borderClass: 'border-red-400',
  },
  delivered: {
    label: 'Delivered',
    description: 'Fully delivered — market-led pricing',
    color: 'charcoal',
    bgClass: 'bg-charcoal-100',
    textClass: 'text-charcoal-600',
    borderClass: 'border-charcoal-300',
  },
};
