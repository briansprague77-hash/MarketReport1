import type { DevelopmentSummary } from '@/data/developments';
import { classifyTimingWindow, TimingWindow, TIMING_WINDOW_META } from './timing';

export interface ProjectStoryline {
  phase: string;
  window: TimingWindow;
  strengths: string;
  risks: string;
  watchItems: string;
  fullNarrative: string;
}

export function generateStoryline(dev: DevelopmentSummary): ProjectStoryline {
  const window = classifyTimingWindow(dev);
  const meta = TIMING_WINDOW_META[window];

  // Phase + Position (Paragraph 1)
  const phaseIntro = buildPhaseIntro(dev, window, meta.label);

  // Strengths + Momentum (Paragraph 2)
  const strengths = buildStrengths(dev, window);

  // Risks + Watch Items (Paragraph 3)
  const { risks, watchItems } = buildRisks(dev, window);

  const fullNarrative = `${phaseIntro}\n\n${strengths}\n\n${risks}`;

  return {
    phase: meta.label,
    window,
    strengths,
    risks,
    watchItems,
    fullNarrative,
  };
}

function buildPhaseIntro(dev: DevelopmentSummary, window: TimingWindow, label: string): string {
  const unitCount = dev.units;
  const psfNote = dev.avgPsf ? ` at avg $${dev.avgPsf.toLocaleString()}/SF` : '';
  const soldNote = dev.soldPercent !== undefined ? ` with ${dev.soldPercent}% sold` : '';
  const deliveryNote = dev.delivery ? ` targeting ${dev.delivery} delivery` : '';
  const devName = dev.developer ? ` by ${dev.developer}` : '';
  const subNote = dev.submarket ? ` in ${dev.submarket}` : ` in ${dev.county.charAt(0).toUpperCase() + dev.county.slice(1)} County`;

  switch (window) {
    case 'discovery':
      return `${dev.name} is in the Discovery phase — announced but not yet actively selling. The ${unitCount}-unit project${devName}${subNote} is positioning${psfNote}${deliveryNote}. Market participants should monitor for sales launch timing and initial pricing signals.`;

    case 'launch':
      return `${dev.name} has entered the Launch phase with ${unitCount} units${psfNote}${subNote}. ${dev.developer ? `${dev.developer} is` : 'The developer is'} building initial absorption momentum${soldNote}. Early-stage velocity will set the pricing trajectory for the balance of the project.`;

    case 'acceleration':
      return `${dev.name} is in Acceleration mode — ${unitCount} units${psfNote}${soldNote}${subNote}. Absorption is tracking positively${deliveryNote}. The project has moved past launch risk and into a growth-stage pricing environment.`;

    case 'escalation':
      return `${dev.name} (${unitCount} units${psfNote}) is in Escalation${subNote}${soldNote}. Pricing power is evident with steady pace. ${dev.developer ?? 'The developer'} has pricing leverage as the project matures toward delivery${deliveryNote}.`;

    case 'resistance':
      return `${dev.name} has entered a Resistance phase — ${unitCount} units${psfNote}${soldNote}${subNote}. Pace has decelerated at current price levels${deliveryNote}. The developer may need to reassess pricing strategy or deploy targeted incentives.`;

    case 'incentive':
      return `${dev.name} (${unitCount} units${psfNote}) is showing Incentive signals${subNote}${soldNote}. The developer has introduced concessions to maintain absorption velocity${deliveryNote}. This warrants careful monitoring of effective PSF trends.`;

    case 'closeout':
      return `${dev.name} is in Closeout — fewer than 10% of ${unitCount} units remain${psfNote}${subNote}. The project is in final sell-through mode${deliveryNote}. Remaining inventory typically commands premium or discount depending on unit quality.`;

    case 'resale-crossover':
      return `${dev.name} has entered Resale Crossover territory — owner resales now compete directly with developer inventory (${unitCount} units${psfNote}${soldNote}). This dual supply channel can compress developer pricing power${subNote}.`;

    case 'delivered':
      return `${dev.name} has been Delivered — ${unitCount} units${psfNote}${subNote}${soldNote}. Pricing is now market-led rather than developer-controlled. Performance depends on resale activity and comparable transactions.`;

    default:
      return `${dev.name} — ${unitCount} units${psfNote}${subNote}${deliveryNote}.`;
  }
}

function buildStrengths(dev: DevelopmentSummary, window: TimingWindow): string {
  const points: string[] = [];

  if (dev.developer) {
    points.push(`Developer track record: ${dev.developer}`);
  }

  if (dev.type) {
    const typeLabel = dev.type === 'Branded Residence' ? 'branded residence' : dev.type.toLowerCase();
    points.push(`${typeLabel} product type provides differentiation`);
  }

  if (dev.avgPsf && dev.avgPsf > 800) {
    points.push(`premium PSF positioning ($${dev.avgPsf.toLocaleString()}/SF) signals luxury-tier demand`);
  } else if (dev.avgPsf && dev.avgPsf < 500) {
    points.push(`attainable PSF ($${dev.avgPsf.toLocaleString()}/SF) broadens buyer pool`);
  }

  if (dev.soldPercent !== undefined && dev.soldPercent > 70) {
    points.push(`${dev.soldPercent}% sell-through demonstrates strong market acceptance`);
  }

  if (dev.tags?.includes('branded')) {
    points.push('brand affiliation provides marketing leverage and buyer confidence');
  }

  if (dev.stories && dev.stories > 20) {
    points.push(`${dev.stories}-story tower commands skyline presence and view premiums`);
  }

  if (dev.submarket) {
    points.push(`${dev.submarket} submarket position`);
  }

  if (points.length === 0) {
    points.push('early-stage project with positioning potential');
  }

  return `Key strengths: ${points.join('; ')}. ${window === 'acceleration' || window === 'escalation' ? 'Momentum indicators are positive.' : window === 'resistance' || window === 'incentive' ? 'These advantages are being tested by current market conditions.' : 'Market positioning will become clearer as the project advances.'}`;
}

function buildRisks(dev: DevelopmentSummary, window: TimingWindow): { risks: string; watchItems: string } {
  const riskPoints: string[] = [];
  const watchPoints: string[] = [];

  // Inventory pressure
  if (dev.inventoryPressure === 'high') {
    riskPoints.push('high inventory pressure — significant unsold supply');
    watchPoints.push('monthly absorption rate');
  } else if (dev.inventoryPressure === 'medium') {
    watchPoints.push('inventory-to-sales ratio trends');
  }

  // Status-based risks
  if (window === 'discovery') {
    riskPoints.push('pre-sales pricing uncertainty');
    watchPoints.push('launch pricing vs. comparable projects');
  }

  if (window === 'resistance') {
    riskPoints.push('price resistance at current levels');
    watchPoints.push('DOM trends and price reductions');
  }

  if (window === 'incentive') {
    riskPoints.push('active incentives signal absorption challenges');
    watchPoints.push('effective PSF vs. list PSF divergence');
  }

  // Supply risk
  watchPoints.push('competitive supply in delivery window');

  // PSF risk
  if (dev.avgPsf && dev.avgPsf > 1000) {
    riskPoints.push(`ultra-luxury PSF ($${dev.avgPsf.toLocaleString()}/SF) narrows buyer pool`);
  }

  if (riskPoints.length === 0) {
    riskPoints.push('standard execution risk appropriate for project phase');
  }

  const risks = `Risk factors: ${riskPoints.join('; ')}. Watch items: ${watchPoints.join('; ')}.`;
  const watchItems = watchPoints.join('; ');

  return { risks, watchItems };
}

// Sorting priority for storylines
const WINDOW_SORT_ORDER: Record<TimingWindow, number> = {
  resistance: 0,
  closeout: 1,
  incentive: 2,
  'resale-crossover': 3,
  acceleration: 4,
  escalation: 5,
  launch: 6,
  discovery: 7,
  delivered: 8,
};

export function sortByStorylinePriority(devs: DevelopmentSummary[]): DevelopmentSummary[] {
  return [...devs].sort((a, b) => {
    const aWindow = classifyTimingWindow(a);
    const bWindow = classifyTimingWindow(b);
    return (WINDOW_SORT_ORDER[aWindow] ?? 99) - (WINDOW_SORT_ORDER[bWindow] ?? 99);
  });
}
