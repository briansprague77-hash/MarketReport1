import { DevelopmentProfile } from '@/types/development-profile';

// THE GALLERY SARASOTA — Rosemary District (1305 4th St) | 60 units | 6 levels | Palm One / Simpson
export const theGallerySarasota: DevelopmentProfile = {
  slug: 'the-gallery-sarasota',
  name: 'The Gallery Sarasota',
  tagline: 'The Most Attainable Downtown New Construction',
  description:
    '60-residence, 6-level mixed-use condominium in the Rosemary District at 1305 4th St, by Palm One Real Estate & Development with The Simpson Organization. 1–3BR with a rooftop pool terrace, fitness center, and social lounge. As of June 2026: 9 active Stellar MLS listings (avg ~$942/SF), $795K–$1.995M — the most attainable entry in the downtown Sarasota new-construction set.',
  location: 'Rosemary District, Downtown Sarasota', address: '1305 4th St, Sarasota, FL 34236', city: 'Sarasota',
  county: 'sarasota', status: 'delivered', statusLabel: 'Delivered — Available Now', type: 'Condominium',
  price: '$795K - $1.995M', bedrooms: '1-3', bathrooms: '1-3', sqft: '~700-1,800 SF',
  totalUnits: 60, unitSizes: '~700-1,800 SF', deliveryDate: 'Available Now', stories: 6, lastUpdated: '2026-06-10',
  developer: 'Palm One Real Estate & Development / The Simpson Organization',
  features: ['Open-concept layouts', 'Designer finishes', 'Private balconies', 'In-unit laundry'],
  amenities: ['Rooftop pool terrace', 'Fitness center', 'Social lounge', 'Ground-floor retail'],
  galleryImages: [], scores: { walkScore: 89, bikeScore: 80, culturalScore: 88, restaurantScore: 85 },
  pricingHistory: { currentPsf: 942, currentPriceRange: '$795K - $1.995M', asOfDate: '2026-06-10' },
  mlsSummary: { active: 9, avgActivePsf: 942, activePriceRange: '$795,000 - $1,995,000', primaryListingOffice: 'Coldwell Banker Realty', asOfDate: '2026-06-10' },
  marketEvidence: [
    { metric: 'Entry PSF', value: '$942/SF avg', description: 'Average of 9 active Stellar MLS listings (Jun 2026), from $795K — the lowest PSF of any tracked downtown Sarasota new-construction building.' },
    { metric: 'Delivered', value: 'Move-in ready', description: 'Completed and available now in the Rosemary District — buyers tour finished units with no construction risk.' },
  ],
  advisoryInsights: [
    { title: 'For Buyer Advisors', content: 'The Gallery is the entry point to downtown Sarasota new construction — delivered, walkable, and well under $1M at the low end. Ideal for first-in-market buyers priced out of the Quay/Golden Gate towers.' },
  ],
  seo: { title: 'The Gallery Sarasota | Downtown Condos From $795K — Rosemary District',
    description: 'The Gallery Sarasota — 60 delivered residences in the Rosemary District. From $795K, ~$942/SF — the most attainable downtown new construction. Sourced Stellar MLS data.',
    keywords: ['The Gallery Sarasota', 'Gallery Sarasota condos', 'Rosemary District Sarasota', 'downtown Sarasota condos for sale', 'affordable Sarasota new construction', '1305 4th Street Sarasota'] },
};
