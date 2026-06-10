import { DevelopmentProfile } from '@/types/development-profile';

// ONE PARK SARASOTA — The Quay (668 Quay Commons) | 86 units | 18 stories | PMG
export const oneParkSarasota: DevelopmentProfile = {
  slug: 'one-park-sarasota',
  name: 'One Park Sarasota',
  tagline: 'Waterfront High-Rise on The Quay',
  description:
    '86-residence, 18-story luxury tower (One Park Residences) at 668 Quay Commons in The Quay district, by PMG (Property Markets Group — developer of Waldorf Astoria St. Petersburg). Sales by Coldwell Banker. As of June 2026: 4 active Stellar MLS listings (avg ~$1,423/SF) and 1 pending, $2.7M–$6.6M. Delivery 2027.',
  location: 'The Quay', address: '668 Quay Commons, Sarasota, FL 34236', city: 'Sarasota',
  county: 'sarasota', status: 'under-construction', statusLabel: 'Under Construction — 2027', type: 'Condominium',
  price: '$2.7M - $6.6M', bedrooms: '3-5', bathrooms: '3-4.5', sqft: '2,572-3,996 SF',
  totalUnits: 86, unitSizes: '2,572-3,996 SF', deliveryDate: 'Q1-Q2 2027', stories: 18, lastUpdated: '2026-06-10',
  developer: 'PMG (Property Markets Group)', salesGallery: 'Coldwell Banker, Sarasota',
  features: ['Private elevator access', 'Floor-to-ceiling glass', 'Waterfront terraces', 'Premium appliance packages'],
  amenities: ['Waterfront resort pool', 'Fitness & wellness center', 'Resident social lounge', 'Concierge', 'The Quay marina district access'],
  galleryImages: [], scores: { walkScore: 76, bikeScore: 68, culturalScore: 88, restaurantScore: 86 },
  pricingHistory: { currentPsf: 1423, currentPriceRange: '$2.7M - $6.6M', asOfDate: '2026-06-10' },
  mlsSummary: { active: 4, pending: 1, avgActivePsf: 1423, activePriceRange: '$2,700,000 - $6,600,000', primaryListingOffice: 'Coldwell Banker Realty', asOfDate: '2026-06-10' },
  marketEvidence: [
    { metric: 'Active Asking PSF', value: '$1,423/SF', description: 'Average of 4 active Stellar MLS listings (Jun 2026), $2.7M–$6.6M, 3–5BR. By PMG, the same developer as Waldorf Astoria St. Petersburg.' },
    { metric: 'The Quay Position', value: '18 stories', description: 'In The Quay master-planned waterfront district alongside Ritz-Carlton Sarasota Bay and 1000 Boulevard of the Arts — Sarasota\'s densest cluster of new luxury supply.' },
  ],
  advisoryInsights: [
    { title: 'For Buyer Advisors', content: 'A PMG product in The Quay at ~$1,423/SF — below the branded Ritz-Carlton next door but with the same waterfront district access. Good relative value for buyers who want The Quay without the brand premium.' },
  ],
  seo: { title: 'One Park Sarasota | The Quay Waterfront Condos — 668 Quay Commons',
    description: 'One Park Sarasota — 86 waterfront residences in The Quay by PMG. ~$1,423/SF, $2.7M–$6.6M, 2027 delivery. Sourced Stellar MLS data.',
    keywords: ['One Park Sarasota', 'One Park Residences Sarasota', 'The Quay Sarasota condos', 'PMG Sarasota', '668 Quay Commons', 'Sarasota waterfront condos for sale'] },
};
