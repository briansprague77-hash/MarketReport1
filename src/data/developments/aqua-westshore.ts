import { DevelopmentProfile } from '@/types/development-profile';

export const aquaWestshore: DevelopmentProfile = {
  slug: 'aqua-westshore',
  name: 'Aqua at Westshore Yacht Club',
  tagline: 'Waterfront Living at Westshore Yacht Club',
  description:
    'Tampa Bay\'s only gated yacht club community — and the scarcity is working. Three pending contracts plus six active listings at $956/SF in a 77-unit tower with Spring 2026 delivery. The cancelled penthouse at $5.68M likely contracted off-market. Westshore Group\'s three-tower, 230-unit master plan means Tower 1 is the price-discovery phase for a submarket with no comparable. There is nothing else like this on Tampa Bay\'s waterfront.',
  location: '5713 Bowen Daniel Dr, Tampa 33616',
  address: '5713 Bowen Daniel Dr',
  city: 'Tampa',
  county: 'hillsborough',
  status: 'under-construction',
  statusLabel: 'Under Construction',
  type: 'Condominium',

  price: 'From $1,870,000',
  bedrooms: '2-4',
  bathrooms: '2.5-4.5',
  sqft: '2,344-4,993 SF', // MLS: standard 2,344-2,666 SF, PH 4,993 SF
  totalUnits: 77,
  unitSizes: '2,344-4,993 SF',
  deliveryDate: 'Spring-Summer 2026', // MLS: 04/30 - 07/01/2026 phased
  stories: 15,
  hoaPerSqFt: 0.91, // MLS broker data: $0.89-$0.94/SF/mo

  lastUpdated: '2026-04-09',

  developer: 'Westshore Group LLC',
  architect: 'CGHJ Architects',
  interiorDesigner: 'IDDI (Fort Lauderdale)',
  salesTeam: [
    { name: 'Smith & Associates Real Estate', title: 'Exclusive Sales (Bridget Cortes, Inna Sych)' },
  ],
  salesAgents: [
    { name: 'Bridget Cortes', title: 'Sales Executive', brokerage: 'Smith & Associates Real Estate', phone: '813-536-5804' },
    { name: 'Inna Sych', title: 'Sales Executive', brokerage: 'Smith & Associates Real Estate', phone: '813-536-5804' },
  ],
  website: 'https://aquaresidencestampa.com',
  phone: '813-536-5804',
  socialMedia: {
    instagram: 'https://www.instagram.com/aquaresidencestampa/',
    facebook: 'https://www.facebook.com/aquaresidencestampa/',
  },
  rentalPolicy: '6-month minimum',
  brokerCommission: '3% co-op',

  features: [
    'CGHJ Architects-designed 15-story tower',
    'Waterfront location within Westshore Yacht Club',
    'Marina access and boat slips',
    'Premium finishes throughout',
    'Floor-to-ceiling windows with water views',
    'Spacious residences from 2,319 to 5,000 SF',
  ],
  amenities: [
    'Resort-style pool',
    'Fitness center',
    'Westshore Yacht Club membership amenities',
    'Marina and boat slips',
    'Clubhouse',
    'Tennis and pickleball courts',
  ],
  galleryImages: [
    'https://www.homesandcondostampa.com/megatemplate/uploads/photogallery_images/Img412122022_116214.jpg',
    'https://www.homesandcondostampa.com/megatemplate/uploads/photogallery_images/Imgaqua%20tower%20112122022_112541aqua-tower-1.jpg',
    'https://www.homesandcondostampa.com/megatemplate/uploads/photogallery_images/Img312122022_1154913.jpg',
    'https://s41951.pcdn.co/wp-content/uploads/2025/06/02-AQUA-Exterior-scaled.jpg',
    'https://s41951.pcdn.co/wp-content/uploads/2025/06/0-Rooftop-Pool-Sunset_e-scaled.jpg',
  ],

  scores: {
    walkScore: 30,
    bikeScore: 35,
    transitScore: 15,
  },

  constructionProgress: {
    percent: 70,
    status: 'Under construction — Spring 2026 delivery',
    milestones: [
      { title: 'Groundbreaking', date: '2024', completed: true },
      { title: 'Vertical construction', date: '2024', completed: true },
      { title: 'Topping off', date: '2025', completed: true },
      { title: 'Delivery', date: 'Spring 2026', completed: false },
    ],
  },

  lifecycle: {
    constructionStartDate: '2024',
    estimatedSelloutDate: 'Spring 2026',
  },

  pricingHistory: {
    launchPsf: 776,
    currentPsf: 898, // Avg of 8 active MLS listings (Jun 2026); +4 pending avg $995/SF, all Smith & Associates
    currentPriceRange: '$1,650,000-$3,040,000',
    priceChangePercent: 15.7, // $776 launch → $898 current avg
    asOfDate: '2026-06-10',
    // MLS Active (Apr 2026): 6 active + 3 pending, all Smith & Associates
    //   Unit 503: 3BR, 2,411 SF, $1,870,000 ($776/SF), DOM 73 — Bridget Cortes
    //   Unit 604: 3BR, 2,411 SF, $1,960,000 ($813/SF), DOM 2 — Inna Sych
    //   Unit 1505: 2BR, 2,344 SF, $2,320,000 ($990/SF), DOM 75 — Bridget Cortes
    //   Unit 1602: 2BR, 2,344 SF, $2,370,000 ($1,011/SF), DOM 2 — Inna Sych
    //   Unit 801: 4BR, 2,666 SF, $2,690,000 ($1,009/SF), DOM 229 — Bridget Cortes
    //   Unit 1406: 4BR, 2,666 SF, $3,040,000 ($1,140/SF), DOM 2 — Inna Sych
    // Pending (3 contracts — 0 DOM back-entered):
    //   Unit 1103: 3BR, 2,411 SF, $2,300,000 ($954/SF) — Bridget Cortes
    //   Unit 1201: 4BR, 2,666 SF, $2,715,000 ($1,018/SF) — Bridget Cortes
    //   Unit 1606: 4BR, 2,666 SF, $2,770,000 ($1,039/SF) — Bridget Cortes
    // Cancelled: PH-1701 at $5,680,000 (4,993 SF, $1,138/SF) — likely contracted
    // HOA: $0.89-$0.94/SF/mo | Lease: 6-month min | Delivery: phased Apr-Jul 2026
  },

  riskFlags: [],

  incentives: {
    items: [],
    pricingClassification: 'clean',
    asOfDate: '2026-04-09',
    notes: '6 active + 3 pending + 1 PH cancelled (likely contracted). Strong absorption with 4 contracts. No incentive signals.',
  },

  pressHighlights: [
    { source: 'homesandcondostampa.com', date: '2025', headline: 'Aqua at Westshore Yacht Club — only gated waterfront yacht club community in Tampa Bay. 3-tower master plan.' },
  ],

  marketEvidence: [
    { metric: 'Scarcity Position', value: 'Only Gated Yacht Club', description: 'The sole gated waterfront yacht club community in Tampa Bay. No comparable exists in the active pipeline or delivered inventory. This structural scarcity eliminates direct comps and forces appraisals to reference dissimilar product — a challenge for financed buyers but a tailwind for cash purchasers seeking irreplaceable positioning.' },
    { metric: 'Average PSF', value: '$956/SF', description: 'Tower 1\'s $956/SF average across 6 active MLS listings positions Aqua between the Ritz-Carlton campus ($925/SF) and ONE Tampa ($970/SF). For a gated yacht club product with marina access, this PSF represents a scarcity premium that the market is validating through 3 pending contracts.' },
    { metric: 'Absorption Signal', value: '3 Pending + 6 Active', description: 'Three pending contracts against six active listings — a 33% pending-to-active ratio — signals strong demand. The cancelled penthouse at $5.68M ($1,138/SF) likely contracted off-market, further tightening available inventory in the premium tier.' },
    { metric: 'Master Plan Scale', value: '3 Towers / 230 Units', description: 'Westshore Group\'s three-tower, 230-unit master plan means Tower 1 (77 units) is the price-discovery phase. Tower 1 buyers are establishing the PSF baseline for 153 additional units across Towers 2 and 3. Early entry pricing typically appreciates 15-25% by the time subsequent phases launch.' },
    { metric: 'PSF Range', value: '$776-$1,140/SF', description: 'The $776/SF entry (Unit 503, 3BR) to $1,140/SF ceiling (Unit 1406, 4BR) shows clear floor-premium stratification. Lower floors offer 30% PSF discounts to upper floors — the widest spread in the Westshore submarket.' },
    { metric: 'Delivery Timeline', value: 'Spring-Summer 2026', description: 'Phased delivery April-July 2026. At 70% construction progress with topping-off complete, execution risk is materially lower than pre-construction projects. Buyers are purchasing a near-complete product, not a rendering.' },
  ],

  advisoryInsights: [
    { title: 'For Buyer Advisors', content: 'Aqua\'s scarcity thesis is straightforward: there is no other gated yacht club condo in Tampa Bay. Period. The $1.87M entry buys marina access, boat slips, and yacht club amenities that cannot be replicated by downtown towers regardless of price point. Unit 503 at $776/SF is the most aggressive entry in the building — advise clients that lower-floor units carry the steepest discount but also the least water-view premium. The 3 pending contracts indicate the window for negotiated pricing is closing. With Spring 2026 delivery, this is a move-in-ready product for clients who cannot wait for 2027-2028 pipeline deliveries.' },
    { title: 'For Listing Advisors', content: 'Aqua creates a new submarket category — gated waterfront yacht club — that has no precedent in Tampa Bay. For South Tampa listings near Westshore, Aqua\'s $956/SF establishes a premium ceiling that nearby non-gated, non-waterfront condos cannot reach. However, Aqua\'s Walk Score of 30 and Transit Score of 15 are the lowest in the Hillsborough pipeline — position nearby listings with higher walkability scores as the urban alternative for clients who prioritize accessibility over waterfront exclusivity. The three-tower master plan means additional supply is coming; existing South Tampa waterfront sellers should price ahead of Towers 2 and 3 launch announcements.' },
  ],

  seo: {
    title: 'Aqua at Westshore Yacht Club | 77 Waterfront Residences from $1.87M',
    description:
      'Aqua at Westshore Yacht Club — 77 residences in a 15-story tower. By Westshore Group LLC, designed by CGHJ Architects. 2-4 bedrooms, 2,319-5,000 SF. PSF $776-$1,138. Spring 2026 delivery.',
    keywords: ['Aqua Westshore', 'Westshore Yacht Club', 'Tampa waterfront condos', 'CGHJ Architects', 'South Tampa'],
  },
};
