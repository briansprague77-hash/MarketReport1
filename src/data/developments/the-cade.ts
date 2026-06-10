import { DevelopmentProfile } from '@/types/development-profile';

export const theCade: DevelopmentProfile = {
  slug: 'the-cade',
  name: 'The Cade',
  tagline: 'Boutique Luxury in St. Petersburg\'s Old Northeast',
  description:
    'Fifteen residences. By invitation only. 53.3% under contract before ground breaks in April 2026. Backstreets Capital — the team behind The Salvador and Nolen — is deliberately constraining supply on Mirror Lake\'s last developable waterfront parcel, pricing at $907/SF with zero MLS exposure. In a market dominated by 100+ unit towers, The Cade is the scarcity play: boutique scale, lakefront, and selling without advertising.',
  location: '250 Mirror Lake Dr. N, St. Petersburg 33701',
  address: '250 Mirror Lake Dr. N',
  city: 'St. Petersburg',
  county: 'pinellas',
  status: 'pre-sales',
  statusLabel: 'Pre-Sales',
  type: 'Condominium',

  price: 'From $1,917,800',
  bedrooms: '3-4',
  bathrooms: '3-3.5',
  sqft: '2,027-3,241 SF', // Brochure: Res A 2,027-2,167, Res B 2,029, PH 3,241
  totalUnits: 15,
  unitSizes: '2,027-3,241 SF',
  deliveryDate: '2028',
  stories: 7,

  lastUpdated: '2026-04-08',

  developer: 'Backstreets Capital',
  architect: 'PLACE Architecture',
  salesTeam: [
    { name: 'Wittner Wollman Group', title: 'Exclusive Sales — By Invitation Only' },
  ],
  salesAgents: [
    { name: 'Robert Wittner', title: 'Principal', brokerage: 'Wittner Wollman Group', phone: '727-339-1777', email: 'info@caderesidences.com' },
    { name: 'Noah Wollman', title: 'Principal', brokerage: 'Wittner Wollman Group', phone: '727-339-1777', email: 'info@caderesidences.com' },
  ],
  salesGallery: '600 1st Ave North, Suite #110, St. Petersburg',
  website: 'https://caderesidences.com/',
  phone: '727-339-1777',
  brokerCommission: '3% co-op',
  socialMedia: {
    instagram: 'https://www.instagram.com/cadeonthelake',
  },

  features: [
    'All residences face east over Mirror Lake — upper floors with Tampa Bay views',
    'Natural gas cooktops with electric ovens',
    'A&B Residences: Thermador appliance suite with 42" French door refrigerator',
    'Penthouses: Sub-Zero 48" French door refrigerator + Wolf appliances',
    'Freestanding soaking tubs, double vanities, frameless glass showers',
    'Large walk-in closets in every primary bedroom',
    '9-10 foot ceilings depending on floor plan',
    'Hurricane impact-rated windows, sliding glass, and patio swing doors',
    'EV charging hookup at each assigned parking space',
    'Car lift enabled parking (optional for designated spaces)',
    'Air-conditioned storage beside each residence',
    'Historic Cade Allen House reclaimed granite in entryway',
    '2 parking spaces per residence',
  ],
  amenities: [
    'Level 2 amenity deck with covered seating',
    'Temperature-controlled plunge pool with integral fountain',
    'Gas fireplace with built-in seating area',
    'Fitness center (stationary bike, elliptical, treadmill, strength equipment)',
    'Resident lounge with full catering kitchen, coffee/beverage bar, workstations',
    'Reading room and living area with large screen TV',
    'Dedicated package and receiving room',
    'Resident Steward on-site Monday-Friday',
    'State-of-the-art controlled access and camera systems',
  ],
  galleryImages: [
    'https://images.squarespace-cdn.com/content/v1/55467dc6e4b0ebaf8fab24a0/1a43db48-e353-480f-a927-234198ea00f6/The+Cade.jpeg',
    'https://images.squarespace-cdn.com/content/v1/55467dc6e4b0ebaf8fab24a0/651616bc-1d69-4776-a42a-1010fd057850/MW-1-1-2048x1151.jpg',
    'https://images.squarespace-cdn.com/content/v1/55467dc6e4b0ebaf8fab24a0/1770821366180-DBC4ABB50QVTTVJHLV1Z/07-The+Cade-Penthouse+Kitchen-R03A.jpg',
    'https://images.squarespace-cdn.com/content/v1/55467dc6e4b0ebaf8fab24a0/1770821370327-IVOX8O3FKB2X58O7F4EV/13-The+Cade-Unit+A+Great+Room-R03.jpg',
    'https://images.squarespace-cdn.com/content/v1/55467dc6e4b0ebaf8fab24a0/1770821119015-BVR2OEOO0Q4F7MJ53PW3/11-The-Cade-Penthouse-Primary-Bathroom-R03A-2048x2048.jpeg',
    'https://images.squarespace-cdn.com/content/v1/55467dc6e4b0ebaf8fab24a0/1770821163203-C7EP3IVZV02YVCAYASUX/home2-1.jpeg',
    'https://images.squarespace-cdn.com/content/v1/55467dc6e4b0ebaf8fab24a0/1770821186596-RJ8W0ZT5Q2167H866NOJ/05-The-Cade-Fitness-R02-2k_0004_Background.jpeg',
    'https://images.squarespace-cdn.com/content/v1/55467dc6e4b0ebaf8fab24a0/1770821184189-HLJLAMSW1EZQYYA0T5JR/05-The-Cade-Fitness-R02-2k_0001_Layer-3.jpeg',
  ],

  scores: {
    walkScore: 94,
    bikeScore: 90,
    transitScore: 55,
  },

  documents: {
    exclusivePreviewUrl: '/docs/the-cade/exclusive-preview.pdf',
  },

  lifecycle: {
    salesGalleryOpening: 'February 2026',
    groundbreakingDate: 'April 2026', // Brian: breaks ground end of April 2026
    estimatedSelloutDate: '2028',
  },

  pricingHistory: {
    launchPsf: 907, // Unit 300 (L3, 2,118 SF): $1,917,800 / 2,118 = $906/SF
    currentPsf: 907,
    currentPriceRange: '$1,917,800-$3,607,800',
    priceChangePercent: 0,
    asOfDate: '2026-04-08',
    // Developer availability (April 2026 — from elevation map):
    //   Unit 200 (A South Terrace, L2, 2,167 SF): $2,053,000 ($948/SF) — garden terrace unit
    //   Unit 300 (A South, L3, 2,118 SF): $1,917,800 ($906/SF) — lowest-priced available
    //   Unit 600 (Penthouse South, L6-7 duplex, 3,241 SF): $3,607,800 ($1,113/SF)
    //   8 units under contract (entire A North stack + B Stack + A South L5)
    //   Sell-through: 8 of 15 under contract = 53.3%
    //   PSF range: $906/SF (L3 standard) to $1,113/SF (PH duplex)
  },

  riskFlags: [],

  incentives: {
    items: [],
    pricingClassification: 'clean',
    asOfDate: '2026-04-08',
    notes: '8 of 15 units under contract (53.3%). 3 available. Strong velocity for boutique by-invitation project. No incentive signals.',
  },

  // ─── Floor Plans (from developer brochure) ─────────────────────────────
  // Residence A South (Level 2): 3BR/3.5BA, 2,167 interior + 609 terrace SF (garden terrace)
  // Residence A North (Level 2): 3BR/3.5BA, 2,165 interior + 609 terrace SF (garden terrace)
  // Residence A South (Levels 3-5): 3BR/3.5BA, 2,118 interior + 176 balcony SF
  // Residence A North (Levels 3-5): 3BR/3.5BA, 2,027 interior + 172 balcony SF
  // Residence B (Levels 3-5): 3BR/3BA, 2,029 interior + 237 balcony SF
  // Penthouse South (Levels 6-7): 4BR/3.5BA, 3,241 interior + 248 balcony SF (duplex)
  // Penthouse North (Levels 6-7): 4BR/3.5BA, 3,241 interior + 244 balcony SF (duplex)
  //
  // Building layout: 2 units per floor (A South + A North or A + B), 2 penthouses on top
  // Level 2: 2 garden-level residences with 609 SF terraces (largest outdoor spaces)
  // Levels 3-5: 6 standard residences (mix of A and B plans)
  // Levels 6-7: 2 duplex penthouses (south and north)
  // Total: ~10 standard + 2 garden + 2 penthouses + 1 = 15 residences

  pressHighlights: [
    { source: 'St Pete Rising', date: 'February 2026', headline: 'Seven-story boutique condo building The Cade launches sales on Mirror Lake' },
    { source: 'St Pete Rising', date: 'February 2026', headline: 'Sales gallery opened at 600 1st Ave North with Wittner Wollman Group' },
  ],

  marketEvidence: [
    { metric: 'Sell-Through Rate', value: '53.3% pre-groundbreaking', description: 'Eight of 15 units under contract before construction begins in April 2026. For a project with zero MLS exposure and a by-invitation-only sales model, this velocity is exceptional. It validates that scarcity-driven positioning can outperform broadcast marketing in a saturated pipeline.' },
    { metric: 'Price Per SF', value: '$907/SF (standard) to $1,113/SF (PH)', description: 'The Cade prices 40% below Waldorf Astoria ($1,503/SF) while targeting a similar buyer demographic — owner-occupants seeking lakefront, low-density living. The 23% PSF premium from Level 3 to penthouse duplex reflects the vertical value curve in a 7-story building with only two penthouses.' },
    { metric: 'Unit Density', value: '15 units / 7 stories', description: 'Lowest unit count of any active project in downtown St. Petersburg. Two units per floor with no shared walls on three sides. This density profile has no comparable in the current pipeline — the next smallest is Lake House at 45 units.' },
    { metric: 'MLS Exposure', value: '0 listings', description: 'Zero MLS listings as of April 2026. Every contract originated through the Wittner Wollman Group\'s private network. This is the only active Pinellas development selling exclusively off-MLS, which means absorption data is invisible to agents relying on MLS feeds.' },
    { metric: 'Developer Track Record', value: 'The Salvador + Nolen', description: 'Backstreets Capital\'s prior St. Petersburg projects (The Salvador, Nolen) both sold out. The developer is deliberately constraining scale — 15 units vs. the 88-244 unit towers dominating the pipeline — to maintain pricing power and avoid the closeout drag visible at Reflection and 400 Central.' },
    { metric: 'Land Scarcity', value: 'Last developable Mirror Lake parcel', description: 'Mirror Lake\'s waterfront is fully entitled between The Cade and Lake House. No additional lakefront parcels remain for new development. This is a non-replicable location advantage that underpins the scarcity thesis.' },
  ],

  advisoryInsights: [
    { title: 'For Buyer Advisors', content: 'Three units remain available: Unit 200 ($2.05M, garden terrace), Unit 300 ($1.92M, lowest entry), and the Penthouse South ($3.6M, duplex). There is no MLS listing to pull — contact Wittner Wollman Group directly at 727-339-1777. Buyers comparing to tower product (Waldorf, 400 Central) should understand the trade-off: no resort amenities, no concierge program, but 2 units per floor, lakefront orientation, and a $600/SF discount to Waldorf. The 53% contract rate means remaining inventory will not last through construction.' },
    { title: 'For Listing Advisors', content: 'The Cade establishes a new pricing floor for boutique lakefront product on Mirror Lake at $907/SF. If you hold listings at Reflection (3 blocks north, $727/SF) or nearby resale condos, The Cade\'s absorption validates demand for owner-occupied product in the $1.9-3.6M range without resort branding. Use this as a comp anchor for any Mirror Lake-adjacent listing. The by-invitation model also means your buyers will not find this project through standard MLS searches — proactive outreach is required.' },
  ],

  seo: {
    title: 'The Cade | Boutique Lakefront Residences on Mirror Lake from $1.9M',
    description:
      'The Cade — 15 exclusive lakefront residences on Mirror Lake, St. Petersburg. 8 under contract, 3 available from $1,917,800. 3-4 bedrooms, 2,027-3,241 SF. Duplex penthouses at $3.6M. By Backstreets Capital.',
    keywords: ['The Cade', 'Mirror Lake', 'St. Petersburg luxury', 'boutique condos', 'Backstreets Capital', 'lakefront'],
  },
};
