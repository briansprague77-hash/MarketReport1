/**
 * Tampa Bay New Construction Market Data
 *
 * Macro-level market intelligence for the Tampa Bay / St. Petersburg
 * new construction condominium pipeline. This report tracks ONLY new
 * construction developments — pre-sales through delivered - developer inventory remaining.
 *
 * Sources: Developer disclosures, MLS (Stellar MLS), and proprietary broker research.
 *
 * Last updated: 2026-04-09
 */

import { DevelopmentStatus, County, DevelopmentType, BadgeType } from '@/types/development';
import {
  trackedDevelopments,
  type DevelopmentSummary,
} from '@/data/developments';

// Re-export for consumers that import from '@/data/market'
export { trackedDevelopments, type DevelopmentSummary };
export type { County, DevelopmentType };

// ─── Pipeline Overview ──────────────────────────────────────────────────────

export const pipeline = {
  totalUnitsInPipeline: 3596, // All 3 counties: Pinellas ~1,239 + Hillsborough ~1,528 + Sarasota ~829. Computed from trackedDevelopments.
  totalProjectValue: '$6.1B+', // Full Tampa Bay pipeline. Branded premium: +50.5% ($1,345/SF branded vs $894/SF independent).
  activeDevelopments: 31,     // 12 Pinellas + 8 Hillsborough + 11 Sarasota
  pinellasDevelopments: 12,
  hillsboroughDevelopments: 8,
  sarasotaDevelopments: 11,
  marketsTracked: [
    'Downtown St. Petersburg',
    'St. Pete Beach',
    'Clearwater Beach',
    'Downtown Tampa',
    'Water Street Tampa',
    'Bayshore Blvd',
    'Westshore',
    'Downtown Sarasota',
    'The Quay',
    'Golden Gate Point',
  ],
  asOfDate: '2026-04-16',
};

// ─── Macro Market Stats (hero-level) ────────────────────────────────────────

export const heroStats = [
  {
    value: '31',
    label: 'Developments Tracked',
    sublabel: '12 Pinellas · 8 Hillsborough · 11 Sarasota',
  },
  {
    value: '6.1',
    prefix: '$',
    suffix: 'B+',
    label: 'Total Pipeline Value',
    sublabel: 'New construction (3 counties)',
  },
  {
    value: '3',
    label: 'Counties',
    sublabel: 'Pinellas · Hillsborough · Sarasota',
  },
  {
    value: '3,596',
    label: 'Pipeline Units',
    sublabel: '31 developments across 3 counties',
  },
];

// ─── County Filters ─────────────────────────────────────────────────────────

export const pinellasDevelopments = trackedDevelopments.filter((d) => d.county === 'pinellas');
export const hillsboroughDevelopments = trackedDevelopments.filter((d) => d.county === 'hillsborough');
export const sarasotaDevelopments = trackedDevelopments.filter((d) => d.county === 'sarasota');

export const countyLabels: Record<County, string> = {
  pinellas: 'Pinellas County',
  hillsborough: 'Hillsborough County',
  sarasota: 'Sarasota County',
};

// ─── Competitor Reference (delivered buildings used in comparisons only) ─────

export interface CompetitorReference {
  name: string;
  location: string;
  units: number;
  avgPsf: number;
  delivery: string;
  status: string;
  note: string;
}

export const competitorReferences: CompetitorReference[] = [
  {
    name: 'ONE St. Petersburg',
    location: 'Downtown St. Petersburg',
    units: 253,
    avgPsf: 1150,
    delivery: 'Delivered 2021',
    status: 'Resale',
    note: 'Competitor reference — no dedicated page. Used in market comparisons.',
  },
  {
    name: 'Saltaire St. Pete',
    location: 'Downtown St. Petersburg',
    units: 154,
    avgPsf: 1050,
    delivery: 'Delivered',
    status: 'Resale',
    note: 'Competitor reference — no dedicated page. Used in market comparisons.',
  },
];

// ─── Market Trend Data (YoY Comparisons) ────────────────────────────────────

export interface YoYTrend {
  metric: string;
  current: string;
  prior: string;
  change: string;
  direction: 'up' | 'down' | 'stable';
  period: string;
  source?: string;
  county?: 'pinellas' | 'hillsborough' | 'sarasota' | 'all'; // Which county tab this belongs to
}

// Verified from Stellar MLS broker reports (Feb 2026) and developer disclosures.
export const marketTrends: YoYTrend[] = [
  {
    metric: 'Pinellas Pipeline Total',
    current: '1,239',
    prior: '~1,100',
    change: '+12.6%',
    direction: 'up',
    period: 'Apr 2026',
    source: 'Developer disclosures',
    county: 'pinellas',
  },
  {
    metric: 'Art House Resale PSF',
    current: '$1,010',
    prior: '$877',
    change: '+15.2% vs developer close',
    direction: 'up',
    period: 'Apr 2026',
    source: 'Stellar MLS resales — developer contracts at $877 signed 2-3 years ago',
    county: 'pinellas',
  },
  {
    metric: '400 Central Closing PSF',
    current: '$950',
    prior: '$824',
    change: 'Developer closing wave',
    direction: 'stable',
    period: 'Apr 2026',
    source: 'Stellar MLS — contracts signed 2022-2023 now closing',
    county: 'pinellas',
  },
  {
    metric: 'Waldorf Developer Ask PSF',
    current: '$1,503',
    prior: 'N/A',
    change: '$175M+ secured',
    direction: 'up',
    period: 'Apr 2026',
    source: 'Stellar MLS — active developer listings',
    county: 'pinellas',
  },
  {
    metric: 'Pinellas Absorption',
    current: '~16/mo',
    prior: 'N/A',
    change: 'Pinellas pipeline avg',
    direction: 'stable',
    period: 'Apr 2026',
    source: 'Proprietary broker research',
    county: 'pinellas',
  },
  {
    metric: 'Ritz-Carlton II Market PSF',
    current: '$925',
    prior: 'N/A',
    change: '65% sold, 19 active',
    direction: 'stable',
    period: 'Apr 2026',
    source: 'Stellar MLS',
    county: 'hillsborough',
  },
  {
    metric: 'Pendry Developer Ask PSF',
    current: '$1,329',
    prior: 'N/A',
    change: 'Under construction',
    direction: 'up',
    period: 'Apr 2026',
    source: 'MLS developer listings',
    county: 'hillsborough',
  },
  {
    metric: 'EDITION Resale PSF (Historical)',
    current: '$1,563',
    prior: '$1,035',
    change: '+51% vs developer close',
    direction: 'up',
    period: 'Apr 2026',
    source: 'Sold out 2022 — resale benchmark only',
    county: 'hillsborough',
  },
  {
    metric: 'ONE Tampa Sales Velocity',
    current: '$200M',
    prior: 'N/A',
    change: 'First 4 months',
    direction: 'up',
    period: 'Apr 2026',
    source: 'Developer reported',
    county: 'hillsborough',
  },
  {
    metric: 'Branded Residence Projects',
    current: '10',
    prior: '3',
    change: 'Tampa Bay total',
    direction: 'up',
    period: 'Apr 2026',
    source: 'Developer announcements',
    county: 'all',
  },
  {
    metric: 'Pipeline Developments',
    current: '31',
    prior: '28',
    change: '+3 new projects',
    direction: 'up',
    period: 'Apr 2026',
    source: 'Tracked developments',
    county: 'all',
  },
  {
    metric: 'Pipeline Units',
    current: '3,596',
    prior: 'N/A',
    change: '3 counties',
    direction: 'stable',
    period: 'Apr 2026',
    source: 'Developer disclosures',
    county: 'all',
  },
];

// Pre-construction pipeline summary stats.
// Sourced from tracked developments + Stellar MLS (Feb 2026).
export const marketSummaryStats = {
  avgPsf: '$1,105', // Pipeline average across all tracked developments with PSF data (Apr 2026). Range: $727 (Reflection) to $1,563 (Tampa EDITION).
  pipelineUnits: '3,596', // All 3 counties: Pinellas ~1,239 + Hillsborough ~1,528 + Sarasota ~829
  pipelineValue: '$6.1B+', // Full Tampa Bay pipeline value.
  activeDevelopments: '31', // 12 Pinellas + 8 Hillsborough + 11 Sarasota
  asOfDate: '2026-04-16',
};

// ─── Demand Drivers ─────────────────────────────────────────────────────────

// Demand drivers — factual macro conditions. No fabricated statistics.
export const demandDrivers = [
  {
    title: 'AGI Wealth Inflow',
    stat: '$20.65B',
    description: 'Florida gained $20.65 billion in net adjusted gross income from domestic migration in 2023 — #1 in the nation. Tampa Bay\'s three counties (Pinellas, Hillsborough, Sarasota) rank among the top 10 Florida counties for AGI inflows. Source: IRS SOI Tax Data.',
  },
  {
    title: 'Corporate HQ Migration',
    stat: 'Top 5',
    description: 'Tampa ranked in the national Top 5 for corporate HQ relocations (Site Selection Magazine, 2026). ARK Invest relocated from NYC to St. Pete (1,265 jobs, $28M impact). Mosaic (Fortune 307) moved from MN. 29 companies expanded or relocated in 2025 adding 2,280 jobs.',
  },
  {
    title: 'Infrastructure Investment',
    stat: '$12B+',
    description: 'Gas Plant District redevelopment ($6.8-$8B), Water Street Tampa ($3B), Howard Frankland Bridge ($973M, 50% capacity increase), $1.44B in St. Pete building permits, eVTOL air taxi infrastructure at Albert Whitted Airport (FAA ops summer 2026).',
  },
  {
    title: 'Population Growth',
    stat: '3.4M+',
    description: 'Tampa Bay MSA now 3.4M+ people, up 7% in 5 years. 53,836 new residents in 2023-2024 alone. Projecting 397,000-547,000 new residents through 2030. #8 nationally for attracting high-earning college-educated workers (Lightcast).',
  },
  {
    title: 'Tourism Revenue',
    stat: '$9.4B',
    description: '28 million visitors to Hillsborough County generating $9.4B economic impact (2024). Hotel occupancy 80.3% — #1 among competitor cities. $1.2B in taxable hotel revenue. 540+ events generating 580K room nights. Grand Prix: $60M+ impact, 200K fans.',
  },
  {
    title: 'Insurance Advantage',
    stat: '-40%',
    description: 'New construction condos (Cat 4/5 rated, post-FBC 2002) qualify for 40%+ wind mitigation discounts vs older stock. FL insurance rate hikes dropped from 21% (2023) to 0.2% (2025). 17 new carriers entered the market. Homes with mitigation sell 3-5% higher.',
  },
  {
    title: 'Branded Residences',
    stat: '7',
    description: 'Waldorf Astoria, Roche Bobois, Viceroy, Ritz-Carlton, Pendry, EDITION, Hotel ORA — 7 branded residence projects across Tampa Bay. More than Miami had in 2019. Institutional hospitality capital has permanently reclassified Tampa Bay.',
  },
  {
    title: 'Cultural Capital',
    stat: '5 Stars',
    description: '5 Michelin-starred restaurants + 4 Bib Gourmands. James Beard finalist (Rocca). Dalí Museum $65M expansion (2028). Forbes #3 Most Educated City. #1 Best City for Foodies. Conde Nast Traveler Readers\' Choice. Arts district attracts permanent wealth.',
  },
];

// ─── Status Badge Configuration ─────────────────────────────────────────────

export const statusBadgeConfig: Record<DevelopmentStatus, { label: string; color: string; bgColor: string }> = {
  'shadow-inventory': { label: 'Shadow Inventory', color: '#78909C', bgColor: 'rgba(120,144,156,0.15)' },
  'reservation': { label: 'Reservation', color: '#AB47BC', bgColor: 'rgba(171,71,188,0.15)' },
  'pre-sales': { label: 'Pre-Sales', color: '#C9A84C', bgColor: 'rgba(201,168,76,0.15)' },
  'under-construction': { label: 'Under Construction', color: '#2196F3', bgColor: 'rgba(33,150,243,0.15)' },
  'delivered': { label: 'Delivered', color: '#0D9668', bgColor: 'rgba(13,150,104,0.15)' },
  'sold-out': { label: 'Sold Out', color: '#9E9E9E', bgColor: 'rgba(158,158,158,0.15)' },
};

// ─── Badge Type Configuration ────────────────────────────────────────────────

export const badgeTypeConfig: Record<BadgeType, { label: string; icon: string; color: string; bgColor: string; description: string }> = {
  'Tier 1 Luxury': { label: 'Tier 1 Luxury', icon: '💎', color: '#C9A84C', bgColor: 'rgba(201,168,76,0.15)', description: '$1,300+/SF — Ultra-luxury branded residences with white-glove services' },
  'Tier 2 Luxury': { label: 'Tier 2 Luxury', icon: '⭐', color: '#3B82F6', bgColor: 'rgba(59,130,246,0.12)', description: '$700–$1,300/SF — Premium positioning with institutional-grade amenities' },
  'Tier 3 Luxury': { label: 'Tier 3 Luxury', icon: '🏠', color: '#0D9668', bgColor: 'rgba(13,150,104,0.12)', description: '<$700/SF — Attainable luxury with strong value proposition' },
  'Waterfront': { label: 'Waterfront', icon: '🌊', color: '#2196F3', bgColor: 'rgba(33,150,243,0.12)', description: 'Direct waterfront location with bay, gulf, or intracoastal views' },
  'Beachfront': { label: 'Beachfront', icon: '🏖️', color: '#06B6D4', bgColor: 'rgba(6,182,212,0.12)', description: 'Direct beach access — Gulf-front or beachside location' },
  'Hospitality Brand': { label: 'Hospitality Brand', icon: '🏨', color: '#7B1FA2', bgColor: 'rgba(123,31,162,0.12)', description: 'Hotel operator branded — 24/7 concierge, F&B, spa, global loyalty program (Waldorf, Ritz-Carlton, Four Seasons, Pendry, Viceroy, EDITION)' },
  'Lifestyle Brand': { label: 'Lifestyle Brand', icon: '✨', color: '#EC4899', bgColor: 'rgba(236,72,153,0.12)', description: 'Design/lifestyle brand licensing — brand cachet without full hotel operations (Roche Bobois, Hotel ORA)' },
  'Boutique': { label: 'Boutique', icon: '🔑', color: '#D97706', bgColor: 'rgba(217,119,6,0.12)', description: 'Fewer than 50 units — intimate scale with personalized service' },
  'Mixed-Use': { label: 'Mixed-Use', icon: '🏗️', color: '#8B5CF6', bgColor: 'rgba(139,92,246,0.12)', description: 'Hotel-condo or mixed residential/commercial with revenue sharing' },
  'Short-Term Rental': { label: 'Short-Term Rental', icon: '🔑', color: '#FF9800', bgColor: 'rgba(255,152,0,0.12)', description: 'Short-term rental permitted — Airbnb/VRBO eligible with minimal or no lease restrictions' },
  'New to Market': { label: 'New to Market', icon: '🆕', color: '#4CAF50', bgColor: 'rgba(76,175,80,0.12)', description: 'Recently announced with limited public pricing data' },
};

// ─── Methodology Summary ────────────────────────────────────────────────────

export const methodology = {
  overview:
    'This report is independently produced and is not sponsored, endorsed, or financially supported by any developer, brokerage, or project featured herein. Our market intelligence is compiled from multiple independent data sources and cross-referenced for accuracy. We do not rely on any single source and transparently disclose discrepancies when sources conflict. This report covers new construction exclusively — pre-sales through delivered - developer inventory remaining.',
  independence:
    'No developer, sales team, or project marketing entity has editorial influence over this report. All analysis reflects independent research and publicly available data. Where broker-sourced information is used, it is noted and cross-verified against public records.',
  sources: [
    {
      name: 'MLS (Stellar MLS)',
      description: 'Active listings, pending sales, and closed transactions updated weekly. MLS data is independently verified against county property appraiser records.',
    },
    {
      name: 'Developer Disclosures',
      description: 'Official price sheets, sales reports, and project updates from development teams. Developer-provided data is cross-referenced with MLS and public records.',
    },
    {
      name: 'County Property Appraiser',
      description: 'Official closing prices, deed transfers, and assessment data from Pinellas and Hillsborough county records.',
    },
    {
      name: 'Proprietary Broker Research',
      description: 'First-hand insights from active listing and buyer agent relationships within each project, independently gathered.',
    },
    {
      name: 'Sales Gallery Visits',
      description: 'In-person visits to on-site sales galleries and model residences. Direct conversations with sales directors and on-site agents provide real-time absorption data and buyer profile intelligence unavailable through public channels.',
    },
    {
      name: 'Personal Industry Network',
      description: 'Established relationships with developers, listing agents, and buyer agents active in Tampa Bay new construction. Trusted contacts provide early access to pricing changes, inventory updates, and off-market intelligence.',
    },
    {
      name: 'Developer Websites & Collateral',
      description: 'Official project websites, digital brochures, floor plan libraries, and marketing materials published by development teams. Monitored for pricing updates, availability changes, and new phase announcements.',
    },
    {
      name: 'Pinellas County Government',
      description: 'Public records from Pinellas County including building permits, zoning approvals, site plans, and development order documents. Provides independent verification of project scope and timeline claims.',
    },
    {
      name: 'DBPR (FL Dept. of Business & Professional Regulation)',
      description: 'Florida condominium filings, prospectus documents, and HOA registrations from the Division of Condominiums, Timeshares, and Mobile Homes. Primary source for condo docs, declaration of condominium, and developer disclosure requirements.',
    },
    {
      name: 'Trusted News & Industry Sources',
      description: 'Reporting from Tampa Bay Times, Tampa Bay Business Journal, The Real Deal, Bloomberg, and other credible outlets. Used for project announcements, market trend validation, and developer background verification.',
    },
  ],
  disclaimer:
    'Data is compiled for informational purposes only and does not constitute a solicitation, offering, or investment advice. All figures should be independently verified before making purchase decisions. Market conditions are subject to change. This report is not affiliated with or endorsed by any development featured herein.',
};

// ─── Market Velocity & Absorption ────────────────────────────────────────────

// Pinellas County new construction pipeline velocity — proprietary broker research.
export const marketVelocity = {
  contractsPerMonth: 16,
  absorptionLabel: '~16 contracts/month (Pinellas pipeline)',
  asOfDate: '2026-04-09',
  source: 'Proprietary broker research',
};

// Unit mix composition across tracked Pinellas new construction developments.
export const unitMix = [
  { segment: '1 BR', share: '<10%', note: 'Limited supply; most projects start at 2BR' },
  { segment: '2 BR', share: '~60%', note: 'Core demand segment — professional couples and downsizers' },
  { segment: '3 BR', share: '~25%', note: 'Family and second-home buyers' },
  { segment: 'PH / 4 BR+', share: '~5%', note: 'Ultra-luxury and penthouse tier' },
];

// Absorption Efficiency Score (AES) — higher = faster sell-through relative to supply.
// AES benchmarks: <0.50 slow, 0.50–0.80 moderate, 0.80–1.00 strong, >1.00 exceptional.
export const absorptionBenchmarks = {
  waldorfAstoria: { aes: 1.15, dvr: '24–28 months', note: 'Fastest-selling West Coast FL condo' },
  lakeHouse: { aes: 0.80, dvr: '36–40 months', note: 'Shadow inventory — strong projected absorption' },
  pipelineAverage: { aes: 0.65, dvr: '42–48 months', note: 'Pinellas pipeline average' },
};

// ─── About / Author ─────────────────────────────────────────────────────────

export const author = {
  name: 'Brian Sprague',
  title: 'Licensed Florida Real Estate Broker FL BK3221171 · Development Marketing Consultant',
  firm: 'Tampa Bay Real Estate',
  bio: 'Specializing in new development sales across the Tampa Bay metro, Brian provides realtor-to-realtor market intelligence that cuts through the marketing noise. Every data point is sourced, every claim is cited.',
  credentials: [
    'Licensed Florida Real Estate Professional',
    'New Development Sales Specialist',
    '10+ Years Tampa Bay Market Experience',
  ],
};
