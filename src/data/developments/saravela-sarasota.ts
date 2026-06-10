import { DevelopmentProfile } from '@/types/development-profile';

// SARAVELA SARASOTA — Downtown (430 N Tamiami Trail) | 293 residences | two towers to 19 stories | GSP
export const saravelaSarasota: DevelopmentProfile = {
  slug: 'saravela-sarasota',
  name: 'Saravela Sarasota',
  tagline: 'Attainable Luxury With Rental Flexibility',
  description:
    '293 residences (282 condominiums + 11 street-level townhomes) across two towers up to 19 stories at 430 N Tamiami Trail, downtown Sarasota, by GSP Development. Kimmich Smith Architecture; interiors by ID & Design International; 47,000+ SF of amenities; rental flexibility. As of June 2026: 4 active Stellar MLS listings (avg ~$1,348/SF), $998K–$3.45M — among the most attainable new construction downtown. Delivery 2027.',
  location: 'Downtown Sarasota', address: '430 N Tamiami Trail, Sarasota, FL 34236', city: 'Sarasota',
  county: 'sarasota', status: 'pre-sales', statusLabel: 'Pre-Sales — 2027', type: 'Condominium',
  price: '$998K - $3.45M', bedrooms: '1-3', bathrooms: '1-3.5', sqft: '~600-2,100 SF',
  totalUnits: 293, unitSizes: '~600-2,100 SF', deliveryDate: '2027', stories: 19, lastUpdated: '2026-06-10',
  developer: 'GSP Development', architect: 'Kimmich Smith Architecture', interiorDesigner: 'ID & Design International (IDDI)',
  rentalPolicy: 'Flexible — short-term rental friendly',
  features: ['Floor-to-ceiling glass', 'Designer kitchens', 'Private balconies', 'Smart-home pre-wiring'],
  amenities: ['47,000+ SF of amenities across six levels', 'Resort pool deck', 'Fitness & wellness center', 'Co-working & social lounges', 'Street-level retail'],
  galleryImages: [], scores: { walkScore: 88, bikeScore: 76, culturalScore: 90, restaurantScore: 88 },
  pricingHistory: { currentPsf: 1348, currentPriceRange: '$998K - $3.45M', asOfDate: '2026-06-10' },
  mlsSummary: { active: 4, avgActivePsf: 1348, activePriceRange: '$998,000 - $3,445,000', primaryListingOffice: "Premier Sotheby's International Realty", asOfDate: '2026-06-10' },
  marketEvidence: [
    { metric: 'Entry Point', value: 'From $998K', description: 'Active Stellar MLS listings from $998K (Jun 2026) — the most attainable downtown Sarasota new-construction entry, with rental flexibility that appeals to investor buyers.' },
    { metric: 'Scale', value: '293 residences', description: 'Two towers up to 19 stories, 282 condos + 11 townhomes — the largest downtown Sarasota condo project, broadening the buyer pool beyond the ultra-luxury tier.' },
  ],
  advisoryInsights: [
    { title: 'For Buyer/Investment Advisors', content: 'Saravela\'s rental flexibility + sub-$1M entry make it the rare downtown new-construction play that pencils for investors. Watch absorption velocity on a 293-unit pipeline as a downtown supply signal.' },
  ],
  seo: { title: 'Saravela Sarasota | Downtown Condos From $998K — Rental Flexibility',
    description: 'Saravela Sarasota — 293 residences by GSP Development, two towers, 47,000+ SF amenities, rental flexibility. From $998K, ~$1,348/SF. Sourced Stellar MLS data.',
    keywords: ['Saravela Sarasota', 'Saravela condos', 'downtown Sarasota condos for sale', 'GSP Development Sarasota', 'Tamiami Trail Sarasota condos', 'Sarasota condos rental flexibility'] },
};
