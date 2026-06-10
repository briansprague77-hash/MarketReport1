import { DevelopmentProfile } from '@/types/development-profile';

export const marinaBayResidences: DevelopmentProfile = {
  slug: 'marina-bay-residences',
  name: 'Marina Bay Residences',
  tagline: 'Bayfront Luxury with a Private 42-Slip Marina',
  description:
    '96 residences across a 12-story bayfront tower at 4598 54th Ave S in South St. Petersburg, with an exclusive 42-slip deep-water marina. Unit mix: 2-4 bedroom layouts spanning 1,500–3,050 SF. Pricing: luxury condos from $1.5M, estate villas from $2M, two-story penthouses from $7M. Architecture by BDG Architects (same firm as The Edge Sarasota). Delivery targeted 2028.',
  location: '4598 54th Ave S, Saint Petersburg, FL 33711',
  address: '4598 54th Ave S',
  city: 'Saint Petersburg',
  county: 'pinellas',
  status: 'pre-sales',
  statusLabel: 'Pre-Sales',
  type: 'Condominium',

  price: '$1.5M - $7M',
  bedrooms: '2-4 + PH',
  bathrooms: '2-4',
  sqft: '1,500-3,050 SF',
  totalUnits: 96,
  unitSizes: '1,500-3,050 SF',
  deliveryDate: '2028',
  stories: 12,

  lastUpdated: '2026-04-22',

  developer: 'Reza Yazdani',
  architect: 'BDG Architects',
  brokerCommission: '3% co-op',
  salesTeam: [
    { name: 'TBD — sales team contacts pending', title: 'Pending' },
  ],

  features: [
    'Direct deep-water bayfront access',
    'Two-story penthouses on top floors',
    'Estate villa configurations (lower floors)',
    'Private boat slip availability with residence purchase',
    'BDG Architects design — same firm as The Edge Sarasota',
  ],
  amenities: [
    'Resort-style rooftop pool',
    'State-of-the-art fitness center',
    'Concierge and valet services',
    '24-hour gated security',
    'Business center',
    'Hurricane-use parking facility',
    'Exclusive 42-slip deep-water marina',
  ],

  galleryImages: [],  // Pending — developer marketing imagery not yet released

  scores: {
    walkScore: 35,    // South St Pete suburban — approximate
    bikeScore: 50,
    transitScore: 25,
  },

  lifecycle: {
    announcementDate: '2025',
    groundbreakingDate: 'TBD',
    estimatedSelloutDate: '2028',
  },

  pricingHistory: {
    launchPsf: 0,           // PSF not yet released; price ranges only
    currentPsf: 0,
    currentPriceRange: '$1.5M - $7M',
    priceChangePercent: 0,
    asOfDate: '2026-04-22',
  },

  riskFlags: ['permitting-risk'],

  incentives: {
    items: [],
    pricingClassification: 'clean',
    asOfDate: '2026-04-22',
    notes: 'Pre-construction phase — no public incentive disclosure. Update when developer publishes pricing matrix.',
  },

  documents: {},

  seo: {
    title: 'Marina Bay Residences | Bayfront Condos in South St. Petersburg',
    description:
      'Marina Bay Residences — 96 bayfront condos with a private 42-slip marina. From $1.5M, two-story penthouses from $7M. 2028 delivery.',
    keywords: ['Marina Bay Residences', 'South St. Petersburg', 'bayfront condo', 'deep-water marina', 'St Pete waterfront'],
  },
};
