import { DevelopmentProfile } from '@/types/development-profile';

export const marinaPointeIii: DevelopmentProfile = {
  slug: 'marina-pointe-iii',
  name: 'Marina Pointe III',
  tagline: 'Westernmost Bayfront Tower in the Marina Pointe Trio',
  description:
    '105 residences across 15 stories at 5344 Bridge Street — the most westerly of the three Marina Pointe towers, with full western unobstructed bay views and semi-private elevators. Unit sizes 1,917–3,300 SF, 2–3 bedroom layouts. Wolf and Sub-Zero appliances, Italian cabinetry. Development includes a private marina with 149 deep-water slips (40\'–90\' vessels). Delivery pushed from 2027 to 2028. By BTI Partners (same developer as Marina Pointe Luna), architecture by Kobi Karp.',
  location: '5344 Bridge Street, Tampa, FL 33611',
  address: '5344 Bridge Street',
  city: 'Tampa',
  county: 'hillsborough',
  status: 'pre-sales',
  statusLabel: 'Pre-Sales',
  type: 'Condominium',

  price: 'TBD',
  bedrooms: '2-3',
  bathrooms: '2-3',
  sqft: '1,917-3,300 SF',
  totalUnits: 105,
  unitSizes: '1,917-3,300 SF',
  deliveryDate: '2028',
  stories: 15,

  lastUpdated: '2026-04-22',

  developer: 'BTI Partners',
  architect: 'Kobi Karp',
  brokerCommission: '3% co-op',
  salesTeam: [
    { name: 'TBD — sales team contacts pending', title: 'Pending' },
  ],

  features: [
    'Most westerly position in Marina Pointe trio (best sunsets)',
    'Full western unobstructed bay views',
    'Semi-private elevators',
    'Wolf and Sub-Zero appliances',
    'Italian cabinetry',
    'Larger windows than Towers I and II',
  ],
  amenities: [
    'Private marina (149 deep-water slips)',
    'Slips accommodate 40\'–90\' vessels',
    'Resort-style pool deck',
    'Fitness center',
    'Pet amenities (dog spa, run)',
    'Concierge services',
  ],

  galleryImages: [],  // Pending — developer marketing imagery not yet released

  scores: {
    walkScore: 30,    // Westshore Marina District — approximate
    bikeScore: 45,
    transitScore: 20,
  },

  lifecycle: {
    announcementDate: '2024',
    groundbreakingDate: 'TBD',
    estimatedSelloutDate: '2028',
  },

  pricingHistory: {
    launchPsf: 0,           // Pricing not yet disclosed
    currentPsf: 0,
    currentPriceRange: 'TBD',
    priceChangePercent: 0,
    asOfDate: '2026-04-22',
  },

  riskFlags: ['construction-delay'],  // Delivery pushed from 2027 to 2028

  incentives: {
    items: [],
    pricingClassification: 'clean',
    asOfDate: '2026-04-22',
    notes: 'Pre-construction — pricing not yet disclosed publicly. Update when sales gallery opens.',
  },

  documents: {},

  seo: {
    title: 'Marina Pointe III | Westernmost Tower at Tampa\'s Marina Pointe',
    description:
      'Marina Pointe III — 105 bayfront condos in the westernmost of three Marina Pointe towers. By BTI Partners, design by Kobi Karp. 2028 delivery.',
    keywords: ['Marina Pointe III', 'Tampa', 'Westshore', 'BTI Partners', 'Kobi Karp', 'bayfront condo'],
  },
};
