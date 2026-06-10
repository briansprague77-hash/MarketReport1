import { DevelopmentProfile } from '@/types/development-profile';

export const kolter3rdAve: DevelopmentProfile = {
  slug: 'kolter-3rd-ave',
  name: 'Kolter 235 3rd Ave N',
  tagline: 'Shadow Inventory — Kolter Group\'s Next Downtown St. Pete Tower',
  description:
    'Kolter Group (developer of Art House, ONE Tampa, Corey Landing) demolished a nearly 90-year-old building at 235 3rd Ave N in late March 2026 and is preparing a site plan amendment for a luxury condo tower. The site was purchased in 2021 for $7.5M and was previously approved for a 14-story, 192-room Hilton hotel (2023). Kolter Regional President Brian Van Slyke confirmed the pivot to condos, citing "strong demand from both local buyers and out-of-state transplants." Pricing expected to be more accessible than the ultra-high-end market (likely below Waldorf\'s $1,503/SF). Unit count and height not yet disclosed. Site plan submission imminent (April 2026).',
  location: '235 3rd Ave N, St. Petersburg 33701',
  address: '235 3rd Ave N',
  city: 'St. Petersburg',
  county: 'pinellas',
  status: 'shadow-inventory',
  statusLabel: 'Shadow Inventory',
  type: 'Condominium',

  price: 'TBD',
  bedrooms: 'TBD',
  bathrooms: 'TBD',
  sqft: 'TBD',
  totalUnits: 0,
  unitSizes: 'TBD',
  deliveryDate: 'TBD',

  lastUpdated: '2026-04-13',

  developer: 'Kolter Group',
  // Brian Van Slyke — Regional President, Florida West Coast
  // Same developer as Art House (244 units, 86.9% sold), ONE Tampa (225 units), Corey Landing (133 units)

  features: [
    'Kolter Group — developer of Art House, ONE Tampa, Saltaire, ONE St. Petersburg, Corey Landing',
    'Site purchased 2021 for $7.5M — previously approved for 14-story Hilton hotel',
    'Nearly 90-year-old building demolished March 2026',
    'Site plan amendment to be submitted April 2026',
    '"More accessible" luxury pricing — likely positioning below Waldorf/Roche Bobois tier',
    'Downtown St. Pete location — walkable to Central Ave, Beach Drive, Pier',
  ],
  amenities: [
    'TBD — Kolter standard includes pool, fitness, concierge, resident lounge',
  ],
  galleryImages: [
    '/images/developments/kolter-3rd-ave/kolter-3rd-hero.jpg',
  ],

  scores: {
    walkScore: 94,
    bikeScore: 90,
    transitScore: 55,
  },

  lifecycle: {
    siteAcquisitionDate: '2021',
    announcementDate: 'March 2026',
  },

  pricingHistory: {
    launchPsf: 0,
    currentPsf: 0,
    currentPriceRange: 'TBD — Kolter\'s Art House averaged $877/SF, expect similar mid-luxury positioning',
    priceChangePercent: 0,
    asOfDate: '2026-04-13',
  },

  riskFlags: [],

  incentives: {
    items: [],
    pricingClassification: 'clean',
    asOfDate: '2026-04-13',
    notes: 'Shadow inventory. Site demolished, site plan imminent. No sales activity yet.',
  },

  pressHighlights: [
    { source: 'Tampa Bay Times', date: 'March 30, 2026', headline: 'Kolter to build two new condos in downtown St. Petersburg' },
  ],

  marketEvidence: [
    { metric: 'Land Basis', value: '$7.5M (purchased 2021)', description: 'Kolter acquired the site for $7.5M in 2021 — a pre-pandemic-peak price that gives the developer a cost basis well below current market land values in downtown St. Petersburg. This advantageous basis allows Kolter to price aggressively against competitors who acquired sites at 2024-2026 valuations (Viceroy at $24.75M, SALTAIRE II at $96M).' },
    { metric: 'Hotel-to-Condo Pivot', value: '192-room Hilton to luxury condos', description: 'The site was previously approved for a 14-story, 192-room Hilton hotel in 2023. Kolter\'s pivot to condominiums signals a fundamental assessment that for-sale residential generates higher risk-adjusted returns than hospitality on this site. This is the second hotel-to-condo conversion in Kolter\'s Pinellas portfolio (after SALTAIRE II).' },
    { metric: 'Developer Concentration', value: '3rd Kolter project in Pinellas', description: 'This is Kolter\'s third active Pinellas County project alongside Art House (86.9% sold) and Corey Landings (133 units, St. Pete Beach). No other developer operates at this scale in the submarket. Kolter\'s willingness to deploy capital across three concurrent projects reflects deep conviction in St. Petersburg\'s demand trajectory.' },
    { metric: 'Location Premium', value: 'Between Art House and Waldorf on 3rd Ave', description: 'The site at 235 3rd Ave N sits between Art House (3 blocks south) and Waldorf Astoria (2 blocks east). This corridor has the highest concentration of luxury product in downtown St. Petersburg. Proximity to two established projects provides built-in comp data and neighborhood validation — but also means direct competition for the same buyer pool.' },
    { metric: 'Pricing Signal', value: '"More accessible" luxury — likely below $1,000/SF', description: 'Regional President Brian Van Slyke described the positioning as "more accessible" than ultra-high-end. With Art House at $877/SF as the internal benchmark, expect pricing in the $850-1,000/SF range — below Waldorf ($1,503/SF) and Roche Bobois ($1,433/SF) but above Reflection ($727/SF). This positions the project squarely in Tier 2 alongside 400 Central.' },
  ],

  advisoryInsights: [
    { title: 'For Buyer Advisors', content: 'No unit count, floor plans, or pricing have been disclosed. The site plan amendment is expected April 2026, which will reveal height, density, and positioning. Buyers considering 400 Central resales ($950/SF) or Reflection closeout ($727/SF) should be aware that Kolter\'s entry will add competitive supply at a similar price tier within 12-18 months. If your client can wait, this project may offer pre-construction pricing advantages. If they cannot, existing delivered product de-risks the construction timeline.' },
    { title: 'For Listing Advisors', content: 'When Kolter discloses pricing, it will directly impact every downtown St. Pete listing between $800-1,100/SF. Art House resales, 400 Central resales, and Reflection resales all compete in this band. The demolition is complete and site plan is imminent — this is no longer speculative. Begin positioning your current listings against the future Kolter supply by emphasizing delivered status, established HOA budgets, and no construction risk. The window to sell existing inventory before Kolter\'s launch narrows with each month.' },
  ],

  seo: {
    title: 'Kolter 235 3rd Ave N | Shadow Inventory — Downtown St. Pete Condos',
    description: 'Kolter Group preparing luxury condo tower at 235 3rd Ave N in downtown St. Petersburg. Former Fit2Run site demolished March 2026. Site plan imminent. Same developer as Art House and ONE Tampa.',
    keywords: ['Kolter Group', 'St. Petersburg condos', 'downtown St Pete', 'new construction', 'shadow inventory'],
  },
};
