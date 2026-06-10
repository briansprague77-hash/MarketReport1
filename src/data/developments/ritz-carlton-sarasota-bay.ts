import { DevelopmentProfile } from '@/types/development-profile';

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// RITZ-CARLTON RESIDENCES SARASOTA BAY — The Quay
// 78 branded waterfront residences | 20 stories | Kolter Urban
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export const ritzCarltonSarasotaBay: DevelopmentProfile = {
  slug: 'ritz-carlton-sarasota-bay',
  name: 'Ritz-Carlton Residences Sarasota Bay',
  tagline: 'Branded Waterfront Living in The Quay',
  description:
    '78 waterfront residences across 20 stories in The Quay district by Kolter Urban — the developer behind ONE St. Petersburg and Saltaire. Structure reached full height April 2026; Q4 2026 delivery. Amenities include a 20,000 SF Harbor Club, Ritz-Carlton Spa, wellness facilities, on-site dining, and 24/7 concierge. As of June 2026, the strongest-absorbing branded tower in the Sarasota market: 8 active listings and 13 pending on Stellar MLS.',
  location: 'The Quay',
  address: '555 Quay Commons, Sarasota, FL 34236',
  city: 'Sarasota',
  county: 'sarasota',
  status: 'under-construction',
  statusLabel: 'Under Construction — Q4 2026',
  type: 'Branded Residence',

  price: '$4.03M - $12.5M',
  bedrooms: '3-4',
  bathrooms: '3.5-4.5',
  sqft: '3,500-6,000 SF',
  totalUnits: 78,
  unitSizes: '3,500-6,000 SF',
  deliveryDate: 'Q4 2026',
  stories: 20,
  lastUpdated: '2026-06-10',

  developer: 'Kolter Urban',
  salesGallery: 'Premier Sotheby\'s International Realty — The Quay, Sarasota',

  features: [
    'Private elevator access',
    'Floor-to-ceiling impact glass',
    'Expansive waterfront terraces',
    'Gas cooktops and premium appliance packages',
    'Smart-home pre-wiring',
  ],
  amenities: [
    '20,000 SF Harbor Club',
    'Ritz-Carlton Spa & wellness facilities',
    'Waterfront resort pool',
    'On-site dining',
    '24/7 concierge & valet',
    'Private marina access (The Quay)',
  ],
  galleryImages: [],

  scores: { walkScore: 78, bikeScore: 70, culturalScore: 90, restaurantScore: 88 },

  lifecycle: {
    salesLaunchDate: '2023',
    toppingOffDate: 'April 2026',
    estimatedSelloutDate: '2027',
  },

  pricingHistory: {
    currentPsf: 1713,
    currentPriceRange: '$4.03M - $12.5M',
    asOfDate: '2026-06-10',
  },

  mlsSummary: {
    active: 8,
    pending: 13,
    avgActivePsf: 1713,
    activePriceRange: '$4,829,000 - $10,999,000',
    primaryListingOffice: "Premier Sotheby's International Realty",
    asOfDate: '2026-06-10',
  },

  marketEvidence: [
    {
      metric: 'Active Asking PSF',
      value: '$1,713/SF',
      description:
        'Average of 8 active Stellar MLS listings (Jun 2026), ranging $4.83M–$11.0M. Among the highest realized asks in The Quay district.',
    },
    {
      metric: 'Under Contract',
      value: '13 pending',
      description:
        '13 residences pending on Stellar MLS (avg ~$1,529/SF, to $12.5M) — the deepest pending pipeline of any tracked Sarasota tower, signaling strong pre-delivery absorption ahead of the Q4 2026 completion.',
    },
    {
      metric: 'Brand & Developer',
      value: 'Ritz-Carlton · Kolter',
      description:
        'Ritz-Carlton hospitality branding on a Kolter Urban build (ONE St. Petersburg, Saltaire, Hyde Park House). Institutional execution credibility plus a global luxury-brand premium.',
    },
  ],

  advisoryInsights: [
    {
      title: 'For Buyer Advisors',
      content:
        'With 13 pending against only 8 active (Jun 2026), inventory is tightening ahead of the Q4 2026 delivery. Buyers seeking specific stacks or upper-floor exposures should move before completion, when remaining inventory typically reprices upward.',
    },
    {
      title: 'For Listing Advisors',
      content:
        'Ritz-Carlton Sarasota Bay sets the branded-waterfront benchmark in The Quay at ~$1,713/SF active. Use it to frame pricing for nearby Quay-district product (One Park, 1000 Boulevard of the Arts) and to justify brand premiums in CMAs.',
    },
  ],

  seo: {
    title: 'Ritz-Carlton Residences Sarasota Bay | The Quay — Branded Waterfront Condos',
    description:
      'Ritz-Carlton Residences Sarasota Bay — 78 branded waterfront residences in The Quay by Kolter Urban. ~$1,713/SF, $4.03M–$12.5M, Q4 2026 delivery. Sourced Stellar MLS data.',
    keywords: [
      'Ritz-Carlton Residences Sarasota Bay',
      'Ritz-Carlton Sarasota',
      'The Quay Sarasota condos',
      'Sarasota branded residences',
      'Kolter Urban Sarasota',
      'Sarasota waterfront condos for sale',
      'Quay Commons Sarasota',
    ],
  },
};
