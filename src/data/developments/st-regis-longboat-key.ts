import { DevelopmentProfile } from '@/types/development-profile';

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// ST. REGIS RESIDENCES LONGBOAT KEY — Gulf of Mexico Drive
// 69 branded residences within the $376M St. Regis Resort | Unicorp / SB Architects
// Delivered 2024 — branded resale market now forming
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export const stRegisLongboatKey: DevelopmentProfile = {
  slug: 'st-regis-longboat-key',
  name: 'St. Regis Residences Longboat Key',
  tagline: 'Delivered Branded Beachfront — Resale Market Forming',
  description:
    '69 private branded residences within the completed $376M St. Regis Longboat Key Resort — five six-story buildings across 18 acres, by Unicorp National Developments with architecture by SB Architects. Delivered 2024. As of June 2026 a branded resale market is forming: 5 active Stellar MLS listings (avg ~$2,147/SF) and 3 recent closings at ~$1,815/SF. Full St. Regis hospitality services, butler service, and direct Gulf access.',
  location: 'Longboat Key',
  address: '1620 Gulf of Mexico Dr, Longboat Key, FL 34228',
  city: 'Longboat Key',
  county: 'sarasota',
  status: 'delivered',
  statusLabel: 'Delivered 2024 — Resale Market',
  type: 'Branded Residence',

  price: '$2.4M - $13M',
  bedrooms: '1-3',
  bathrooms: '1.5-4',
  sqft: '1,553-5,895 SF',
  totalUnits: 69,
  unitSizes: '1,553-5,895 SF',
  deliveryDate: 'Available Now',
  stories: 6,
  lastUpdated: '2026-06-10',

  developer: 'Unicorp National Developments',
  architect: 'SB Architects',

  features: [
    'Floor-to-ceiling impact glass',
    'Private terraces with Gulf or bay exposure',
    'Gas cooktops & premium appliance packages',
    'Smart-home integration',
  ],
  amenities: [
    'St. Regis Butler Service',
    'Full-service St. Regis Resort (168 rooms) on site',
    'Beachfront resort pools & lagoon',
    'St. Regis Spa & fitness',
    'Multiple resort dining venues',
    'Direct Gulf beach access',
  ],
  galleryImages: [],

  scores: { walkScore: 30, bikeScore: 40, culturalScore: 65, restaurantScore: 70 },

  lifecycle: {
    coDate: '2024',
    firstClosingDate: '2024',
  },

  pricingHistory: {
    currentPsf: 2147,
    currentPriceRange: '$2.4M - $13M',
    asOfDate: '2026-06-10',
  },

  mlsSummary: {
    active: 5,
    sold: 3,
    avgActivePsf: 2147,
    avgSoldPsf: 1815,
    activePriceRange: '$2,400,000 - $13,000,000',
    soldPriceRange: '$2,975,000 - $6,400,000',
    asOfDate: '2026-06-10',
  },

  marketEvidence: [
    {
      metric: 'Resale Asking PSF',
      value: '$2,147/SF',
      description:
        'Average of 5 active Stellar MLS resale listings (Jun 2026), $2.4M–$13M. A delivered, fully-branded St. Regis product commanding among the highest resale asks on the Gulf Coast.',
    },
    {
      metric: 'Recent Closings',
      value: '$1,815/SF avg',
      description:
        '3 recent closings averaging ~$1,815/SF ($2.98M–$6.40M) — the realized resale benchmark for branded Longboat Key product, ~16% below current asks.',
    },
    {
      metric: 'Delivered & Branded',
      value: '$376M Resort',
      description:
        'Part of the completed $376M St. Regis Resort (Unicorp, SB Architects) — no construction risk, full hospitality services, and the only St. Regis-branded residences on Florida\'s west coast.',
    },
  ],

  advisoryInsights: [
    {
      title: 'For Buyer Advisors',
      content:
        'A delivered, branded asset with an emerging resale market — buyers tour finished residences, not renderings. The ~16% gap between asks ($2,147/SF) and recent closings ($1,815/SF) is real negotiating room; lead with closed comps.',
    },
    {
      title: 'For Listing Advisors',
      content:
        'St. Regis Longboat Key is the delivered-branded resale comp for the barrier islands. Use its $1,815/SF realized closings to ground valuations for Rosewood Lido Key and other Gulf-front branded inventory.',
    },
  ],

  seo: {
    title: 'St. Regis Residences Longboat Key | Delivered Branded Gulf-Front Condos',
    description:
      'St. Regis Residences Longboat Key — 69 delivered branded residences in the $376M St. Regis Resort. Resale asks ~$2,147/SF; recent closings ~$1,815/SF. Sourced Stellar MLS data.',
    keywords: [
      'St. Regis Residences Longboat Key',
      'St Regis Longboat Key for sale',
      'Longboat Key luxury condos',
      'Sarasota branded residences',
      'Unicorp Longboat Key',
      'Gulf of Mexico Drive condos',
      'St Regis resort residences Florida',
    ],
  },
};
