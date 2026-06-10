import { DevelopmentProfile } from '@/types/development-profile';

export const theBeachmaker: DevelopmentProfile = {
  slug: 'the-beachmaker',
  name: 'The Beachmaker',
  tagline: 'Marriott-Branded Condo-Hotel on Madeira Beach',
  description:
    '161-unit Marriott-branded condo-hotel across 8 stories on a 2.5-acre Madeira Beach site. Units are privately owned and may be lived in by the owner or placed into a short-term rental program. Hotel suites start at $700K; ten eighth-floor penthouses start at $4M. More than 50% of the 161 units already pre-sold. Site purchased in 2022 for $13.5M. Demolition began March 2026; opening targeted 2027. Sister project Beachmaker Marina (former Bowden\'s Marina, acquired December 2024 for $5.6M) renovates the adjacent waterfront property.',
  location: '15000 Madeira Way, Madeira Beach, FL 33708',
  address: '15000 Madeira Way',
  city: 'Madeira Beach',
  county: 'pinellas',
  status: 'pre-sales',
  statusLabel: 'Pre-Sales',
  type: 'Branded Residence',

  price: '$700K - $4M+',
  bedrooms: '1-3 + PH',
  bathrooms: '1-3',
  sqft: 'Hotel suites + PH',
  totalUnits: 161,
  unitSizes: 'TBD — Hotel suites + 10 PH',
  deliveryDate: '2027',
  stories: 8,

  lastUpdated: '2026-04-22',

  developer: 'Boca Ciega Land Co. LLC',
  // Lead principals: Bill Karns, Marcus Winters (Caddy\'s owner), Jeff Beggins (Century 21)
  architect: 'TBD',
  brokerCommission: '3% co-op',
  salesTeam: [
    { name: 'TBD — sales team contacts pending', title: 'Pending' },
  ],

  features: [
    'Marriott hospitality brand affiliation',
    'Owner-occupied or short-term rental flexibility',
    'Private 8th-floor penthouses (10 total)',
    'Beachfront positioning on Madeira Beach',
  ],
  amenities: [
    '30,000 SF ground-floor retail with three hotel restaurants',
    'Two parking levels (floors 2-3)',
    '25,000 SF amenity deck (pools, fire pits, cabanas)',
    '250-person banquet hall',
    'Skybridge to Archibald Park and the beach',
    'On-site Beachmaker Marina (sister project, in renovation)',
  ],

  galleryImages: [],  // Pending — developer marketing imagery not yet released

  scores: {
    walkScore: 70,    // Madeira Beach commercial corridor — approximate
    bikeScore: 65,
    transitScore: 30,
  },

  lifecycle: {
    siteAcquisitionDate: '2022',
    announcementDate: '2024',
    groundbreakingDate: 'March 2026',  // Demolition began
    estimatedSelloutDate: '2027',
  },

  pricingHistory: {
    launchPsf: 0,           // PSF not disclosed publicly
    currentPsf: 0,
    currentPriceRange: '$700K - $4M+',
    priceChangePercent: 0,
    asOfDate: '2026-04-22',
  },

  pcpaoSummary: {
    sellThrough: 50,        // "More than 50% of 161 units pre-sold" per developer
  },

  riskFlags: ['unconventional-capital-structure'],

  incentives: {
    items: [],
    pricingClassification: 'clean',
    asOfDate: '2026-04-22',
    notes: 'No public incentive disclosure yet — pre-construction pricing only. Update when sales gallery formalizes.',
  },

  pressHighlights: [
    {
      source: 'St Pete Rising',
      date: '2026-04-22',
      headline: 'Eight-Story Marriott Hotel to Break Ground Next Month in Madeira Beach',
    },
  ],

  documents: {},

  seo: {
    title: 'The Beachmaker | Marriott-Branded Condos on Madeira Beach',
    description:
      'The Beachmaker — 161-unit Marriott-branded condo-hotel on Madeira Beach. Hotel suites from $700K, penthouses from $4M. 50%+ pre-sold.',
    keywords: ['The Beachmaker', 'Madeira Beach', 'Marriott', 'condo hotel', 'short-term rental', 'beachfront condo'],
  },
};
