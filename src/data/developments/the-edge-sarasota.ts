import { DevelopmentProfile } from '@/types/development-profile';

// THE EDGE SARASOTA — Downtown (290 Cocoanut Ave) | 27 units | 10 stories | JEBCO/ORE
export const theEdgeSarasota: DevelopmentProfile = {
  slug: 'the-edge-sarasota',
  name: 'The Edge Sarasota',
  tagline: 'Boutique Downtown Tower — Near Sellout',
  description:
    '27 residences across 10 stories at Cocoanut & Fruitville in downtown Sarasota, by JEBCO Ventures and ORE Development; BDG Architects. Topped out December 2025; fall 2026 move-in. As of June 2026 it is near sellout — only 2 active Stellar MLS listings (avg ~$1,032/SF) and 1 pending remain. Units 3,145–3,553 SF, 2–3BR.',
  location: 'Downtown Sarasota', address: '290 Cocoanut Ave, Sarasota, FL 34236', city: 'Sarasota',
  county: 'sarasota', status: 'under-construction', statusLabel: 'Near Sellout — Fall 2026', type: 'Condominium',
  price: '$3.27M - $4.6M', bedrooms: '2-3', bathrooms: '2.5-3.5', sqft: '3,145-3,553 SF',
  totalUnits: 27, unitSizes: '3,145-3,553 SF', deliveryDate: 'Fall 2026', stories: 10, lastUpdated: '2026-06-10',
  developer: 'JEBCO Ventures / ORE Development', architect: 'BDG Architects',
  features: ['Private elevator access', 'Floor-to-ceiling glass', 'Smart-home systems', 'Large terraces'],
  amenities: ['Rooftop lounge', 'Concierge services', 'Fitness center', 'Secure structured parking'],
  galleryImages: [], scores: { walkScore: 90, bikeScore: 78, culturalScore: 92, restaurantScore: 90 },
  lifecycle: { toppingOffDate: 'December 2025', coDate: '2026' },
  pricingHistory: { currentPsf: 1032, currentPriceRange: '$3.27M - $4.6M', asOfDate: '2026-06-10' },
  mlsSummary: { active: 2, pending: 1, avgActivePsf: 1032, activePriceRange: '$3,295,000 - $3,570,000', asOfDate: '2026-06-10' },
  riskFlags: ['slow-sales'],
  marketEvidence: [
    { metric: 'Near Sellout', value: '2 active', description: 'Only 2 active Stellar MLS listings + 1 pending remain on a 27-unit building (Jun 2026) — a strong absorption signal ahead of fall 2026 delivery.' },
    { metric: 'Walkability', value: 'Walk Score ~90', description: 'Corner of Cocoanut and Fruitville — among the most walkable addresses in downtown Sarasota.' },
  ],
  advisoryInsights: [
    { title: 'For Buyer Advisors', content: 'With the building nearly sold out, the few remaining residences carry scarcity value. Buyers wanting The Edge should expect to transact on developer terms with little negotiating room.' },
  ],
  seo: { title: 'The Edge Sarasota | Boutique Downtown Luxury Condos — 290 Cocoanut',
    description: 'The Edge Sarasota — 27 boutique residences downtown by JEBCO/ORE. Near sellout, ~$1,032/SF, fall 2026 delivery. Sourced Stellar MLS data.',
    keywords: ['The Edge Sarasota', 'Edge Sarasota condos', 'downtown Sarasota luxury condos', 'JEBCO Ventures', 'Cocoanut Avenue Sarasota', 'Sarasota new construction condos'] },
};
