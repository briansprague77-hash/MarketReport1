import { DevelopmentProfile } from '@/types/development-profile';

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// ROSEWOOD RESIDENCES LIDO KEY — Lido Key Beach
// 65 beachfront residences | 11 stories | The Ronto Group + Wheelock Street Capital
// First stand-alone residential project under the Rosewood brand
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export const rosewoodResidencesLidoKey: DevelopmentProfile = {
  slug: 'rosewood-residences-lido-key',
  name: 'Rosewood Residences Lido Key',
  tagline: 'The Ultra-Luxury Ceiling of the Sarasota Market',
  description:
    '65 beachfront residences in an 11-story tower on Lido Key — the first stand-alone residential project under the Rosewood brand — developed by The Ronto Group with Wheelock Street Capital. Topped out November 2024. As of June 2026 this is the pricing ceiling of the entire Sarasota market: 6 active Stellar MLS listings averaging ~$2,213/SF (to $14.15M) and 5 pending. Direct Gulf frontage with Rosewood-branded service.',
  location: 'Lido Key',
  address: '1000 Benjamin Franklin Dr, Sarasota, FL 34236',
  city: 'Sarasota',
  county: 'sarasota',
  status: 'under-construction',
  statusLabel: 'Under Construction — Topped Out',
  type: 'Branded Residence',

  price: '$6.8M - $14.15M',
  bedrooms: '3-4',
  bathrooms: '3.5-5',
  sqft: '~3,000-6,000 SF',
  totalUnits: 65,
  unitSizes: '~3,000-6,000 SF',
  deliveryDate: '2026',
  stories: 11,
  lastUpdated: '2026-06-10',

  developer: 'The Ronto Group / Wheelock Street Capital',
  architect: 'Rosewood Hotels & Resorts (brand)',

  features: [
    'Direct Gulf-front exposure',
    'Private elevator entry',
    'Floor-to-ceiling impact glass',
    'Expansive beachfront terraces',
    'Designer chef\'s kitchens',
  ],
  amenities: [
    'Rosewood-branded concierge & residential services',
    'Beachfront resort pool',
    'Wellness & spa facilities',
    'Private dining & social lounges',
    'Direct beach access',
  ],
  galleryImages: [],

  scores: { walkScore: 55, bikeScore: 58, culturalScore: 80, restaurantScore: 75 },

  lifecycle: {
    toppingOffDate: 'November 2024',
    estimatedSelloutDate: '2027',
  },

  pricingHistory: {
    currentPsf: 2213,
    currentPriceRange: '$6.8M - $14.15M',
    asOfDate: '2026-06-10',
  },

  mlsSummary: {
    active: 6,
    pending: 5,
    avgActivePsf: 2213,
    activePriceRange: '$6,800,000 - $14,150,000',
    primaryListingOffice: 'Ronto Realty',
    asOfDate: '2026-06-10',
  },

  marketEvidence: [
    {
      metric: 'Market Pricing Ceiling',
      value: '$2,213/SF',
      description:
        'Average of 6 active Stellar MLS listings (Jun 2026), to $14.15M — the highest active asking PSF of any tracked development across all three counties. Rosewood sets the Sarasota ultra-luxury ceiling.',
    },
    {
      metric: 'Under Contract',
      value: '5 pending',
      description:
        '5 residences pending (avg ~$2,330/SF) — demonstrating depth of demand at the very top of the market even before completion.',
    },
    {
      metric: 'Brand Rarity',
      value: 'First Rosewood Residential',
      description:
        'The first stand-alone residential property under the Rosewood brand, on direct Lido Key Gulf frontage — a scarcity story that supports the premium.',
    },
  ],

  advisoryInsights: [
    {
      title: 'For Buyer Advisors',
      content:
        'At $2,200+/SF, Rosewood is a brand-and-scarcity play, not a value play. Buyers are paying for direct Gulf-front Lido Key and the debut Rosewood residential flag. With only 65 units and 5 already pending, beachfront stacks will be the first to clear.',
    },
    {
      title: 'For Listing Advisors',
      content:
        'Rosewood resets the Sarasota ceiling. When pricing other Gulf-front or branded product (St. Regis Longboat Key, Amara), anchor against Rosewood\'s ~$2,213/SF active to calibrate the top of the market.',
    },
  ],

  seo: {
    title: 'Rosewood Residences Lido Key | Sarasota Ultra-Luxury Beachfront Condos',
    description:
      'Rosewood Residences Lido Key — 65 beachfront residences by The Ronto Group & Wheelock. ~$2,213/SF, $6.8M–$14.15M — the Sarasota market\'s pricing ceiling. Sourced Stellar MLS data.',
    keywords: [
      'Rosewood Residences Lido Key',
      'Rosewood Sarasota',
      'Lido Key condos for sale',
      'Sarasota beachfront condos',
      'Ronto Group Sarasota',
      'ultra luxury Sarasota condos',
      'Benjamin Franklin Drive condos',
    ],
  },
};
