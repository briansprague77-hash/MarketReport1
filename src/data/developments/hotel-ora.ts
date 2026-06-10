import { DevelopmentProfile } from '@/types/development-profile';

export const hotelOra: DevelopmentProfile = {
  slug: 'hotel-ora',
  name: 'Hotel ORA + Private Residences',
  tagline: 'Condo-Hotel Tower with Short-Term Rental Allowed',
  description:
    'The structural outlier in Tampa Bay\'s pipeline: 658 units with zero rental restrictions. Airbnb, VRBO, Booking.com — day one. Phase 1 sold out in 40 days at $84M to yield-driven capital treating condos as income vehicles, not residences. At $1,466/SF average on 29 active listings, ORA is pricing above most traditional condos — and the market is paying it, because no other building in the pipeline offers unrestricted short-term rental rights. This is the income play.',
  location: '1107 E Jackson St, Tampa 33602',
  address: '1107 E Jackson St',
  city: 'Tampa',
  county: 'hillsborough',
  status: 'pre-sales',
  statusLabel: 'Pre-Sales',
  type: 'Condominium',

  price: 'From $870,616',
  bedrooms: 'Studio-4',
  bathrooms: '1-4.5',
  sqft: '479-3,070 SF',
  totalUnits: 658, // 31 private + 627 hotel-condos
  unitSizes: '479-3,070 SF',
  deliveryDate: '2027-2029', // Phased: 12/29/2027, 12/29/2028, 12/29/2029
  stories: 39,
  hoaPerSqFt: 1.03, // MLS broker data confirmed

  lastUpdated: '2026-04-09',

  developer: 'ARC Realty Group / Prosper Group',
  architect: 'Adache Group Architects',
  salesTeam: [
    { name: 'ARC Realty Group', title: 'Developer Sales (Marisol Horner — primary)' },
  ],
  salesAgents: [
    { name: 'Marisol Horner', title: 'Director of Sales', brokerage: 'ARC Realty Group', phone: '813-321-7357' },
    { name: 'Regina Sotomayor', title: 'Sales Associate', brokerage: 'Homescene Real Estate' },
    { name: 'Lance Peterson', title: 'Sales Associate', brokerage: 'Corcoran Reverie' },
  ],
  // Multiple outside brokers allowed on MLS — same pattern as Viceroy
  website: 'https://ora-hotel.com',
  phone: '813-321-7357',
  socialMedia: {
    instagram: 'https://www.instagram.com/hoteloraprivateresidences/',
    facebook: 'https://www.facebook.com/people/Hotel-ORA-and-Private-Residences/61571735057512/',
  },

  rentalPolicy: 'No minimum lease — short-term rental allowed (Airbnb/VRBO/Booking.com/lease-back)',
  brokerCommission: '3% co-op',

  features: [
    'Adache Group-designed 39-story tower',
    'Penthouse residences $1,768K-$10M',
    'Short-term rental allowed — Airbnb, VRBO, and lease-back program',
    '627 hotel suites + 31 private residences',
    'Premium finishes throughout',
    'Floor-to-ceiling windows with downtown and bay views',
  ],
  amenities: [
    'Full-service hotel operations',
    'Resort-style pool deck',
    'Spa and fitness center',
    'Restaurant and bar',
    'Concierge services',
    'Valet parking',
  ],
  galleryImages: [
    'https://s41951.pcdn.co/wp-content/uploads/2025/03/Arc-Ora-03-C_Pedestrian_03-02-scaled.jpg',
    'https://s41951.pcdn.co/wp-content/uploads/2025/03/Arc-Ora-01-Pool_dusk-02-scaled.jpg',
    'https://s41951.pcdn.co/wp-content/uploads/2025/03/Arc-Ora-01-Lobby_Int_Cam02-03-scaled.jpg',
    'https://s41951.pcdn.co/wp-content/uploads/2025/03/Arc-Ora-01-PH_Balcony-01-scaled.jpg',
    'https://s41951.pcdn.co/wp-content/uploads/2025/03/Arc-Ora-03-C_Lobby_01-02-scaled.jpg',
  ],

  scores: {
    walkScore: 80,
    bikeScore: 62,
    transitScore: 40,
  },

  lifecycle: {
    salesLaunchDate: '2025',
    estimatedSelloutDate: 'December 2029',
  },

  pricingHistory: {
    launchPsf: 1207,
    currentPsf: 1466, // Avg of 29 active MLS listings (Apr 2026)
    currentPriceRange: '$870,616-$4,212,863',
    priceChangePercent: 21.5, // $1,207 launch → $1,466 current avg
    asOfDate: '2026-04-09',
    // MLS Active (Apr 2026): 29 listings — massive MLS presence
    //   Studios (479-578 SF): $871K-$961K ($1,591-$1,752/SF) — 7 listings
    //   1BR (772-803 SF): $1,195K ($1,548/SF) — 1 listing
    //   2BR (878-1,902 SF): $1,213K-$2,466K ($1,207-$1,487/SF) — 17 listings
    //   3BR (2,484-2,742 SF): $3,458K-$3,939K ($1,392-$1,437/SF) — 2 listings
    //   4BR (3,070 SF): $4,213K ($1,372/SF) — 1 listing (dual-listed ARC + Homescene)
    // 1 SOLD: Unit 1901, 1BR 803 SF, $977,236 ($1,217/SF), 15 DOM — actual closing
    // 5 cancelled + 6 expired + 2 TOM = developer inventory cycling
    // Primary: Marisol Horner (ARC Realty Group — developer brokerage)
    // Outside brokers: Regina Sotomayor (Homescene), Lance Peterson (Corcoran), Compass agents
  },

  riskFlags: [],

  incentives: {
    items: [],
    pricingClassification: 'clean',
    asOfDate: '2026-04-09',
    notes: '29 active MLS listings = largest MLS presence in Tampa Bay pipeline. 1 confirmed sale at $1,217/SF. Phase 1 sold out in 40 days ($84M). Multiple outside brokers allowed on developer listings.',
  },

  socialProof: [
    {
      platform: 'google',
      author: 'James R.',
      text: 'Phase 1 sold out before I could get in. Got on the waitlist for Phase 2 immediately. The rental flexibility is unmatched in Tampa.',
      date: '2025',
      rating: 5,
    },
  ],

  pressHighlights: [
    { source: 'Tampa Bay Business & Wealth', date: 'November 2025', headline: 'Hotel ORA surpasses $200M in sales — Phase 1 sold out in 40 days ($84M)' },
    { source: 'Tampa Bay Business & Wealth', date: 'March 2025', headline: 'Hotel ORA first phase sells out in 40 days — fastest pre-sale in Tampa Bay history' },
  ],

  marketEvidence: [
    { metric: 'Phase 1 Velocity', value: 'Sold Out in 40 Days', description: '$84M absorbed in 40 days — the fastest pre-sale in Tampa Bay history. This velocity confirms that yield-driven capital is actively seeking STR-eligible condo inventory at scale, a demand segment that no other Tampa Bay project addresses.' },
    { metric: 'STR Eligibility', value: 'Unrestricted', description: 'The only condo in Tampa Bay\'s active pipeline with zero rental restrictions. Airbnb, VRBO, Booking.com, and developer lease-back program all permitted from day one. Every other project in the pipeline enforces 6-month minimums. This structural advantage is the entire investment thesis.' },
    { metric: 'Average PSF', value: '$1,466/SF', description: 'At $1,466/SF average across 29 active MLS listings, ORA prices above most traditional condos in the pipeline despite being a condo-hotel. Studios command $1,591-$1,752/SF — the highest per-unit PSF tier in the building — driven by yield optimization on smaller footprints.' },
    { metric: 'MLS Presence', value: '29 Active Listings', description: 'The largest MLS footprint in the Tampa Bay pipeline by a factor of 3x. Multiple outside brokers (Homescene, Corcoran, Compass) are co-listing alongside the developer brokerage. This open-distribution model maximizes exposure but creates price competition among agents.' },
    { metric: 'Unit Mix', value: '31 Private + 627 Hotel', description: 'The 31 private residences ($1.76M-$10M) are the premium tier; the 627 hotel-condos (studios to 2BR) are the yield vehicles. Buyers must understand which product they are purchasing — the risk/reward profiles are fundamentally different.' },
    { metric: 'Confirmed Close', value: '$1,217/SF (Unit 1901)', description: 'The first MLS-recorded closing: 1BR, 803 SF, $977K at $1,217/SF with 15 DOM. This is the baseline transaction that validates ORA\'s pricing in the secondary market. One data point is not a trend, but it confirms buyers are executing at these levels.' },
  ],

  advisoryInsights: [
    { title: 'For Buyer Advisors', content: 'ORA is a yield play, not a lifestyle play. Advise investor clients to underwrite the short-term rental economics independently — projected hotel rental income is not guaranteed, and condo-hotel structures carry unique risks including HOA special assessments, hotel management fees, and occupancy volatility. The $1,466/SF average is a premium over traditional condos, justified entirely by the STR optionality. For clients seeking a primary residence, the 627 hotel-condo units will create a transient environment unlike any traditional residential tower. The 31 private residences above $1.76M are the only units designed for permanent living.' },
    { title: 'For Listing Advisors', content: 'ORA\'s unrestricted STR policy creates a unique comp problem for nearby Channel District listings. Traditional condos with 6-month rental minimums cannot compete on yield, but they offer residential stability that ORA\'s hotel-condo model does not. Position nearby listings as "residential-first" alternatives for buyers who want ownership without transient hotel traffic. The 29 active MLS listings at $1,466/SF average may create an artificial pricing ceiling for the Channel District — monitor whether ORA\'s volume compresses or lifts surrounding PSF benchmarks as closings accumulate.' },
  ],

  seo: {
    title: 'Hotel ORA Tampa | 31 Private Residences + 627 Hotel Suites from $1.76M',
    description:
      'Hotel ORA — 31 private residences + 627 hotel suites in a 39-story tower. By ARC Realty Group. PSF $1,207-$1,752. Phase 1 sold out in 40 days. Short-term rentals allowed. Dec 2029 delivery.',
    keywords: ['Hotel ORA', 'ORA Tampa', 'ARC Realty Group', 'Channel District', 'condo-hotel Tampa', 'short-term rental'],
  },
};
