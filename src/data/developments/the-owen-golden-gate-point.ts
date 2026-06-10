import { DevelopmentProfile } from '@/types/development-profile';

// THE OWEN GOLDEN GATE POINT — (325 Golden Gate Point) | 29 units | 10 floors | Ronto / Wheelock
export const theOwenGoldenGatePoint: DevelopmentProfile = {
  slug: 'the-owen-golden-gate-point',
  name: 'The Owen Golden Gate Point',
  tagline: 'Boutique Waterfront on Golden Gate Point',
  description:
    '29-residence boutique luxury mid-rise (10 floors) at 325 Golden Gate Point, by The Ronto Group with Wheelock Street Capital. Broke ground June 2024; Q2 2026 delivery. As of June 2026: 4 active Stellar MLS listings (avg ~$1,225/SF), 3 pending, and 1 closed at ~$1,236/SF — $2.54M–$3.74M, 3BR.',
  location: 'Golden Gate Point', address: '325 Golden Gate Point, Sarasota, FL 34236', city: 'Sarasota',
  county: 'sarasota', status: 'under-construction', statusLabel: 'Under Construction — Q2 2026', type: 'Condominium',
  price: '$2.54M - $3.74M', bedrooms: '3', bathrooms: '3-3.5', sqft: '~2,200-3,000 SF',
  totalUnits: 29, unitSizes: '~2,200-3,000 SF', deliveryDate: 'Q2 2026', stories: 10, lastUpdated: '2026-06-10',
  developer: 'The Ronto Group / Wheelock Street Capital',
  features: ['Private elevator access', 'Floor-to-ceiling glass', 'Waterfront terraces', 'Designer kitchens'],
  amenities: ['Waterfront pool deck', 'Fitness & wellness', 'Resident lounge', 'Concierge', 'Golden Gate Point bayfront access'],
  galleryImages: [], scores: { walkScore: 72, bikeScore: 66, culturalScore: 86, restaurantScore: 84 },
  lifecycle: { groundbreakingDate: 'June 2024' },
  pricingHistory: { currentPsf: 1225, currentPriceRange: '$2.54M - $3.74M', asOfDate: '2026-06-10' },
  mlsSummary: { active: 4, pending: 3, sold: 1, avgActivePsf: 1225, avgSoldPsf: 1236, activePriceRange: '$2,540,000 - $3,360,000', asOfDate: '2026-06-10' },
  marketEvidence: [
    { metric: 'Active + Pending', value: '4 active · 3 pending', description: 'On a 29-unit building (Jun 2026), with the first closing at ~$1,236/SF — healthy absorption ahead of Q2 2026 delivery on Golden Gate Point.' },
    { metric: 'Developer', value: 'Ronto / Wheelock', description: 'Same team as Rosewood Lido Key and The Owen\'s Golden Gate Point neighbor Amara — Ronto is the dominant developer on the Point.' },
  ],
  advisoryInsights: [
    { title: 'For Buyer Advisors', content: 'A boutique 29-unit Ronto product on Golden Gate Point at ~$1,225/SF — below Amara next door. With 3 already pending and delivery imminent, remaining inventory is limited.' },
  ],
  seo: { title: 'The Owen Golden Gate Point | Boutique Sarasota Waterfront Condos',
    description: 'The Owen Golden Gate Point — 29 boutique residences by Ronto/Wheelock. ~$1,225/SF, $2.54M–$3.74M, Q2 2026 delivery. Sourced Stellar MLS data.',
    keywords: ['The Owen Golden Gate Point', 'The Owen Sarasota', 'Golden Gate Point condos for sale', 'Ronto Group Sarasota', 'Sarasota waterfront condos', '325 Golden Gate Point'] },
};
