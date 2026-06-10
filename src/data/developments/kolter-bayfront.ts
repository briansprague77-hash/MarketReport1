import { DevelopmentProfile } from '@/types/development-profile';

export const kolterBayfront: DevelopmentProfile = {
  slug: 'kolter-bayfront',
  name: 'SALTAIRE II',
  tagline: 'Shadow Inventory — $96M Hilton Bayfront Acquisition for Luxury Condos',
  description:
    'Kolter Group closed on the Hilton Bayfront St. Petersburg hotel at 333 First St SE for $96 million in March 2026 — the most significant land acquisition in downtown St. Pete history. The current 15-story 1970s-era hotel will be demolished and replaced with a luxury condo tower taller than the existing structure to maximize water views. Kolter is seeking a hospitality brand partnership for the project, suggesting a potential branded residence (following the Four Seasons pattern). Regional President Brian Van Slyke confirmed plans for "high-end amenities and service levels." Site plan submission planned for later in 2026. Unit count, height, and pricing not yet disclosed. The bayfront location at the foot of the St. Pete Pier is arguably the most valuable waterfront site in downtown St. Petersburg.',
  location: '333 1st St SE, St. Petersburg 33701',
  address: '333 1st St SE',
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
  // Seeking hospitality brand partnership — potential branded residence
  // Same developer as Art House, ONE Tampa, Saltaire, ONE St. Petersburg, Corey Landing
  // Brian Van Slyke — Regional President, Florida West Coast

  features: [
    '$96 million acquisition — most significant land deal in downtown St. Pete history',
    'Current Hilton Bayfront hotel (15 stories, 1970s era) to be demolished',
    'New tower will be TALLER than 15 stories — maximizing bayfront water views',
    'Seeking hospitality brand partnership — potential branded residence',
    'Bayfront location at foot of St. Pete Pier — arguably the most valuable waterfront site in downtown',
    'Kolter track record: Art House ($877/SF, 86.9% sold), ONE Tampa ($200M in 4 months), Saltaire, ONE St. Pete',
    '"High-end amenities and service levels" — Brian Van Slyke, Kolter Regional President',
  ],
  amenities: [
    'TBD — "high-end amenities and service levels" confirmed by developer',
    'Potential hotel-branded services if hospitality partnership secured',
  ],
  galleryImages: [
    '/images/developments/saltaire-ii/saltaire-ii-hero.png',
  ],

  scores: {
    walkScore: 97, // Bayfront/Pier district — same as Beach Drive
    bikeScore: 94,
    transitScore: 66,
  },

  lifecycle: {
    siteAcquisitionDate: 'March 2026',
    announcementDate: 'March 30, 2026',
  },

  pricingHistory: {
    launchPsf: 0,
    currentPsf: 0,
    currentPriceRange: 'TBD — site cost of $96M suggests premium positioning; if branded, expect $1,500-$2,500/SF',
    priceChangePercent: 0,
    asOfDate: '2026-04-13',
    // The $96M land cost is extraordinary. For context:
    //   Waldorf Astoria site (2nd Ave S): purchased for significantly less
    //   Roche Bobois site (4th St S): purchased for significantly less
    //   Kolter's own Art House site: purchased for significantly less
    // At $96M land cost, Kolter MUST price aggressively to achieve returns.
    // If 150 units at $2M avg = $300M total revenue. Land = 32% of revenue.
    // This math only works at $1,200+/SF minimum.
    // If branded (Four Seasons, Rosewood, Aman level): $2,000+/SF is possible.
  },

  riskFlags: ['high-price-positioning'],
  // $96M land cost creates pricing floor pressure — must achieve premium PSF to justify basis
  // Hospitality brand partnership not yet secured
  // Demolition of existing hotel required (environmental + permitting timeline)

  incentives: {
    items: [],
    pricingClassification: 'clean',
    asOfDate: '2026-04-13',
    notes: 'Shadow inventory. $96M site acquired March 2026. Existing Hilton Bayfront to be demolished. Seeking hospitality brand partnership. Site plan later in 2026.',
  },

  pressHighlights: [
    { source: 'Tampa Bay Times', date: 'March 30, 2026', headline: 'Kolter to build two new condos in downtown St. Petersburg — $96M Hilton Bayfront acquisition' },
    { source: 'Tampa Bay Times', date: 'March 24, 2026', headline: 'A condo developer just bought this St. Petersburg hotel for $96 million' },
  ],

  marketEvidence: [
    { metric: 'Land Acquisition Cost', value: '$96M — downtown St. Pete record', description: 'The $96M purchase of the Hilton Bayfront is the most expensive land deal in downtown St. Petersburg history. At this basis, Kolter cannot build a mid-market product. The math requires premium pricing: assuming 150 units at $2M average ($300M revenue), land alone represents 32% of gross revenue — roughly double the typical 15-18% land-to-revenue ratio for luxury condos.' },
    { metric: 'Implied Pricing Floor', value: '$1,200-$2,500/SF depending on branding', description: 'The $96M land cost creates an inescapable pricing floor. Without a hospitality brand, expect $1,200-1,500/SF minimum. With a Four Seasons, Rosewood, or Aman-tier partnership, $2,000-2,500/SF becomes the target range. For context, Waldorf Astoria prices at $1,503/SF and Roche Bobois at $1,433/SF. A branded SALTAIRE II would be the most expensive residential product in Tampa Bay history.' },
    { metric: 'Location Quality', value: 'Bayfront at St. Pete Pier — Walk Score 97', description: 'The site at 333 1st St SE occupies the bayfront position at the foot of the St. Pete Pier — arguably the most valuable waterfront address in downtown St. Petersburg. Walk Score 97 and Bike Score 94 are the highest of any development in the pipeline. No other parcel offers this combination of water frontage, walkability, and proximity to the Pier district.' },
    { metric: 'Hospitality Brand Search', value: 'Active — no partner announced', description: 'Kolter is actively seeking a hospitality brand partnership, suggesting a branded residence model. If secured, this would make SALTAIRE II the second branded residence in downtown St. Pete (after Waldorf Astoria) and the third in Pinellas County (after Viceroy Clearwater). The brand partner will determine pricing tier, service model, and buyer demographic.' },
    { metric: 'Demolition Requirement', value: '15-story 1970s-era Hilton to be razed', description: 'The existing 1970s-era Hilton Bayfront must be demolished before construction — adding 12-18 months and $8-15M to the project timeline and budget versus a vacant site. Environmental remediation of a 50-year-old hotel adds further cost and regulatory complexity. Delivery is unlikely before 2029-2030 at the earliest.' },
    { metric: 'Kolter Track Record at Scale', value: 'ONE Tampa: $200M in 4 months', description: 'Kolter\'s ONE Tampa (225 units) generated $200M in sales within 4 months of launch — the fastest absorption in Tampa Bay high-rise history. SALTAIRE (Sarasota) and ONE St. Petersburg also sold out. This track record is the single strongest argument for SALTAIRE II\'s viability, but none of those projects carried a $96M land cost.' },
  ],

  advisoryInsights: [
    { title: 'For Buyer Advisors', content: 'SALTAIRE II is the most speculative project in the Pinellas pipeline — no site plan, no unit count, no pricing, no brand partner, and a 2029-2030 delivery at the earliest. There is nothing to buy today. However, if your client is a qualified ultra-luxury buyer ($3M+ budget) with a 3-4 year time horizon, request to be placed on Kolter\'s interest list. The bayfront location is irreplaceable, and early reservations at branded residences historically capture 15-25% pre-construction discounts. Compare to Waldorf Astoria (delivering now, $1,503/SF) for clients who want certainty over speculation.' },
    { title: 'For Listing Advisors', content: 'SALTAIRE II is a long-term market signal, not an immediate competitive threat. But when it launches, it will redefine the pricing ceiling for downtown St. Petersburg. If branded at $2,000+/SF, every existing building benefits from the halo effect — Waldorf at $1,503/SF suddenly looks like relative value, and even 400 Central at $950/SF gains upward pricing justification. Use the $96M acquisition in your market narrative today: "The largest developer in Florida just bet $96 million that downtown St. Pete is a top-tier luxury market." That is the comp conversation you want to be having with sellers.' },
  ],

  seo: {
    title: 'SALTAIRE II St. Petersburg | $96M Hilton Bayfront Site — Luxury Condos by Kolter',
    description: 'SALTAIRE II — Kolter Group acquired the Hilton Bayfront St. Petersburg for $96M. Plans for luxury condo tower. Seeking hospitality brand partner. Most valuable waterfront site in downtown St. Pete.',
    keywords: ['SALTAIRE II', 'Kolter Group', 'Hilton Bayfront', 'St. Petersburg condos', 'bayfront', 'branded residence', 'shadow inventory', '$96 million'],
  },
};
