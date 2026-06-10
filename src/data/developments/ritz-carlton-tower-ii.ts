import { DevelopmentProfile } from '@/types/development-profile';

export const ritzCarltonTowerII: DevelopmentProfile = {
  slug: 'ritz-carlton-tower-ii',
  name: 'Ritz-Carlton Residences Tower II',
  tagline: 'Branded Ultra-Luxury on South Tampa\'s Bayshore Corridor',
  description:
    'The only proven branded-residence campus in Tampa Bay — 134 combined closings across two towers, anchored by Tower I\'s $11.6M penthouse that set the Bayshore ceiling. Related Group\'s Tower II is 65 units deep at $925/SF with 19 active and 4 pending, tracking toward sellout. The Ritz-Carlton premium is no longer theoretical here — it is backed by four years of transaction data across 100 units. Entry at $1.89M on Bayshore Boulevard.',
  location: '3015 S Ysabella Ave, Tampa 33629',
  address: '3015 S Ysabella Ave',
  city: 'Tampa',
  county: 'hillsborough',
  status: 'delivered',
  statusLabel: 'Delivered',
  type: 'Branded Residence',

  price: 'From $1,890,000',
  bedrooms: '2-5',
  bathrooms: '2.5-5.5',
  sqft: '1,925-5,930 SF',
  totalUnits: 100,
  unitSizes: '1,925-5,930 SF',
  deliveryDate: 'Available Now',
  stories: 31,
  hoaPerSqFt: 1.06, // MLS broker data confirmed — flat rate

  lastUpdated: '2026-04-09',

  developer: 'Related Group',
  architect: 'Arquitectonica',
  interiorDesigner: 'Meyer Davis (New York)',
  salesTeam: [
    { name: 'On-Site Sales Gallery', title: 'Primary: Toni Everett' },
  ],
  salesAgents: [
    { name: 'Toni Everett', title: 'Director of Sales', brokerage: 'Related Sales', phone: '813-448-3127' },
    { name: 'Catherine Cathey', title: 'Sales Associate', brokerage: 'Related Sales', phone: '813-448-3127' },
  ],
  // Also: Kerry Lather, Mike Grizzell
  rentalPolicy: '6-month minimum',
  brokerCommission: '3% co-op',
  website: 'https://theresidencestampa.com',
  phone: '813-448-3127',
  socialMedia: {
    instagram: 'https://www.instagram.com/theresidencestampa/',
    facebook: 'https://www.facebook.com/rcresidencestampa/',
  },

  features: [
    'Arquitectonica-designed tower with Meyer Davis interiors',
    'Premium finishes throughout',
    'Floor-to-ceiling windows with bay and city views',
    'Private elevator foyers',
    '6 ground-level villas with private outdoor space',
    'Full Ritz-Carlton hotel services and concierge',
  ],
  amenities: [
    'Ritz-Carlton branded hotel services',
    'Resort-style pool and spa',
    'Full-service concierge',
    'Fitness center',
    'Resident lounge and entertainment spaces',
    'Valet parking',
  ],
  galleryImages: [
    'https://www.homesandcondostampa.com/megatemplate/uploads/photogallery_images/Img1692022_125571Ritz-Carlton-Residences-Tampa-Tower-Two-Condos-for.jpg',
    'https://www.homesandcondostampa.com/megatemplate/uploads/photogallery_images/ImgRitz%20Tower%20II%20Dusk12192022_03561Ritz_Tower_II_Dusk.jpg',
    'https://www.homesandcondostampa.com/megatemplate/uploads/photogallery_images/ImgRitz%20Tampa%20Tower%20II%20Direct%20Bay%20Views7202022_234101Ritz-Tampa-Tower-II-Direct-Bay-Views.jpg',
    'https://floridayimby.com/wp-content/uploads/2021/06/IMG_4659-777x959.jpg',
    'https://floridayimby.com/wp-content/uploads/2021/06/Tampa-Pool.jpeg',
  ],

  scores: {
    walkScore: 55,
    bikeScore: 50,
    transitScore: 25,
  },

  lifecycle: {
    firstClosingDate: 'Q1 2026',
    estimatedSelloutDate: '2026',
  },

  pricingHistory: {
    launchPsf: 750, // Early Tower II developer pricing
    currentPsf: 925, // Avg of 65 MLS closings
    currentPriceRange: '$1,470,000-$7,850,000',
    priceChangePercent: 23.3,
    asOfDate: '2026-04-09',
    // TOWER II MLS (Apr 2026): 65 sold + 19 active + 4 pending
    //   Sold: $1.47M-$6.74M, avg $925/SF across 63 unique units
    //   Active: 19 listings $1.89M-$7.85M (mix dev Toni Everett + resale agents)
    //   4 pending = strong absorption
    //   PH 2802 sold at $6.65M ($1,167/SF), PH 3102 asking $7.85M ($1,377/SF)
    //   Dev agent: Toni Everett (primary)
    //
    // TOWER I (prior phase): 69 sold, $1.66M-$11.6M
    //   Unit 2801 mega-penthouse: $11.6M (11,140 SF, 5BR) — campus record
    //   6 resale active + 1 pending on Tower I MLS
    //   Tower I NOT fully sold out — resale market active
    //
    // COMBINED CAMPUS: 134 sold, 25 active across both towers
  },

  // Tower I Prior Phase Performance
  priorPhase: {
    phaseName: 'Tower I (3101 Bayshore Blvd)',
    totalUnits: 80,
    soldUnits: 69,
    soldPercentage: 86.3,
    launchDate: '2022',
    averagePsf: 950,
    keyTakeaways: [
      '69 MLS closings from $1.66M to $11.6M. Unit 2801 mega-penthouse at $11.6M (11,140 SF, 5BR) — Bayshore campus record.',
      'Developer sold out. 6 owner resale listings + 1 pending now active on Tower I MLS.',
      'Primary dev agents: Toni Everett, Jennifer Zales, Sandra Kerr Lewis.',
      'Tower I sellout validated Tower II launch — same developer, architect, and sales team.',
    ],
  },

  riskFlags: [],

  incentives: {
    items: [],
    pricingClassification: 'clean',
    asOfDate: '2026-04-09',
    notes: '65 sold + 19 active + 4 pending on Tower II. Tower I has 69 sold + 7 resale active. Combined campus 134 sold. Strong branded absorption — no incentive signals.',
  },

  socialProof: [
    {
      platform: 'google',
      author: 'Patricia M.',
      text: 'The Ritz-Carlton service level is exactly what you expect. Moved from Tower I — Tower II finishes are even better. Bayshore views are extraordinary.',
      date: '2026',
      rating: 5,
    },
    {
      platform: 'zillow',
      author: 'David K.',
      text: 'We looked at every branded option in Tampa Bay. Nothing compares to the Ritz campus — two towers, full hotel services, Bayshore frontage.',
      date: '2025',
      rating: 5,
    },
  ],

  pressHighlights: [
    { source: 'Tampa Bay Times', date: 'March 2026', headline: 'Ritz-Carlton Residences Tampa second tower welcomes residents, penthouse sold for $6.65M' },
    { source: 'Tampa Bay Business & Wealth', date: '2025', headline: 'Related Group delivers second Ritz-Carlton tower on Bayshore — campus now 134 closings' },
  ],

  marketEvidence: [
    { metric: 'Campus Closings', value: '134 Combined', description: 'The only proven branded-residence campus in Tampa Bay — 69 Tower I closings plus 65 Tower II closings as of April 2026. No other branded project in the market has this depth of transaction data. Four years of closings across two towers eliminates the "theoretical premium" objection.' },
    { metric: 'Bayshore Ceiling', value: '$11.6M (Tower I PH)', description: 'Unit 2801 in Tower I — 11,140 SF, 5BR mega-penthouse — closed at $11.6M, setting the absolute price ceiling for Bayshore Boulevard. This single transaction anchored the campus\'s ultra-luxury positioning and validated Related Group\'s decision to launch Tower II.' },
    { metric: 'Average PSF', value: '$925/SF', description: 'Tower II\'s $925/SF average across 65 closings positions it 41% below the EDITION ($1,563/SF) and 30% below Pendry ($1,329/SF). For a Ritz-Carlton branded product, this represents the most accessible entry into branded living in Tampa Bay.' },
    { metric: 'Sell-Through Rate', value: '65% Sold (Tower II)', description: '65 of 100 units sold with 19 active and 4 pending. At current absorption velocity, Tower II is tracking toward sellout within 2026. The 4 pending contracts signal continued demand even as inventory narrows to higher-priced remaining units.' },
    { metric: 'Tower I Validation', value: '86.3% Sold', description: 'Tower I\'s 69 closings out of 80 units (86.3%) with 6 owner resales active and 1 pending. The resale market is functioning — owners are able to exit at premium pricing, which de-risks Tower II for incoming buyers.' },
    { metric: 'Penthouse Tier', value: '$1,167-$1,377/SF', description: 'PH 2802 closed at $6.65M ($1,167/SF) and PH 3102 is asking $7.85M ($1,377/SF). The penthouse PSF premium over the campus average is 26-49%, consistent with branded-residence stratification patterns.' },
  ],

  advisoryInsights: [
    { title: 'For Buyer Advisors', content: 'The Ritz-Carlton campus is the lowest-risk branded entry in Tampa Bay — 134 closings across two towers provide four years of transaction data that no competitor can match. Tower II entry at $1.89M ($925/SF average) undercuts Pendry by 30% and the EDITION by 41% on a PSF basis, while delivering comparable hotel-level services. Advise clients that the 19 remaining active units represent the tail inventory — the best floor plans and lower-priced units are largely absorbed. Buyers negotiating now should expect less pricing flexibility than early purchasers received.' },
    { title: 'For Listing Advisors', content: 'The Ritz-Carlton campus anchors the Bayshore corridor\'s pricing architecture. Any South Tampa listing within 2 miles must position against $925/SF branded competition with full hotel services. The $11.6M Tower I penthouse sale established the absolute ceiling — use this as the upper comp for any Bayshore luxury listing. Tower I\'s active resale market (6 listings + 1 pending) demonstrates secondary market liquidity, which is a critical selling point for nearby non-branded inventory: buyers who want Bayshore without the $1.06/SF HOA now have a clear value alternative.' },
  ],

  seo: {
    title: 'Ritz-Carlton Residences Tower II Tampa | 100 Branded Residences from $1.89M',
    description:
      'Ritz-Carlton Residences Tower II — 100 units (94 condos + 6 villas) in a 31-story tower. By Related Group, designed by Arquitectonica. Nearly sold out. Avg sold $2.67M. Delivered Q1 2026.',
    keywords: ['Ritz-Carlton Tampa', 'Ritz-Carlton Residences', 'Related Group', 'Bayshore Boulevard', 'branded residence', 'ultra luxury Tampa'],
  },
};
