import { DevelopmentProfile } from '@/types/development-profile';

export const alturaBayshore: DevelopmentProfile = {
  slug: 'altura-bayshore',
  name: 'Altura Bayshore',
  tagline: 'Boutique Bayshore Living by Ronto Group',
  description:
    'The Bayshore baseline — developer sold out, resale only. Ronto Group\'s 73-unit tower delivered in 2024 with the majority of units sold off-MLS through direct developer channels. MLS captures 8 closed transactions at $809/SF average — a fraction of total activity, as is typical for new construction. 2 active resale listings and 1 pending as of April 2026. At $1.00/SF HOA, Altura established the non-branded Bayshore benchmark that the Ritz-Carlton campus and every future corridor entrant is now measured against.',
  location: '2910 W Barcelona St, Tampa 33629',
  address: '2910 W Barcelona St',
  city: 'Tampa',
  county: 'hillsborough',
  status: 'sold-out',
  statusLabel: 'Sold Out',
  type: 'Condominium',

  price: 'From $1,749,000',
  bedrooms: '2-4',
  bathrooms: '2-3.5',
  sqft: '2,176-3,575 SF',
  totalUnits: 73,
  unitSizes: '2,176-3,575 SF',
  deliveryDate: 'Available Now',
  stories: 22,

  lastUpdated: '2026-04-08',

  hoaPerSqFt: 1.00, // MLS active listing Unit 1902: $2,170.92/mo for 2,176 SF = $1.00/SF (Apr 2026)

  developer: 'Ronto Group',
  architect: 'CGHJ Architects',
  website: 'https://alturabayshore.com',
  phone: '813-253-0643',
  socialMedia: {
    instagram: 'https://www.instagram.com/alturabayshore/',
    facebook: 'https://www.facebook.com/AlturaBayshore/',
  },
  salesTeam: [
    { name: 'Smith & Associates Real Estate', title: 'Resale Market (Krista Maddox, Kim Stallings)' },
  ],
  salesAgents: [
    { name: 'Krista Maddox', title: 'Resale Specialist', brokerage: 'Smith & Associates Real Estate', phone: '813-253-0643' },
    { name: 'Kim Stallings', title: 'Resale Specialist', brokerage: 'Smith & Associates Real Estate', phone: '813-253-0643' },
  ],

  features: [
    '10-foot ceilings throughout',
    'Floor-to-ceiling windows with panoramic bay views',
    'Private elevator foyers for each residence',
    'Open floor plans with spacious living areas',
    'Premium finishes and fixtures',
  ],
  amenities: [
    'Rooftop pool with bay views',
    'Pickleball court',
    'Bocce ball court',
    'Basketball court',
    'Dog park',
    'Guest suites',
    'State-of-the-art fitness center',
  ],
  galleryImages: [
    'https://www.homesandcondostampa.com/megatemplate/uploads/photogallery_images/Imgaltura%201932019_1827251altura%201.jpg',
    'https://www.homesandcondostampa.com/megatemplate/uploads/photogallery_images/Imgaltura%202932019_1827251altura%202.jpg',
    'https://www.homesandcondostampa.com/megatemplate/uploads/photogallery_images/Imgalutra%203932019_1827261alutra%203.jpg',
    'https://www.homesandcondostampa.com/megatemplate/uploads/photogallery_images/Img112202019_1941911.jpg',
    'https://www.homesandcondostampa.com/megatemplate/uploads/photogallery_images/Img312202019_1941913.jpg',
  ],

  scores: {
    walkScore: 81,
    bikeScore: 60,
    transitScore: 28,
  },

  rentalPolicy: '6-month minimum',
  brokerCommission: '3% co-op',

  lifecycle: {
    estimatedSelloutDate: 'Delivered 2024',
  },

  pricingHistory: {
    launchPsf: 803,
    currentPsf: 838,
    currentPriceRange: '$1,749,000+',
    priceChangePercent: 0,
    asOfDate: '2026-04-08',
    // PSF range: $803-$873
  },

  riskFlags: [],

  incentives: {
    items: [],
    pricingClassification: 'clean',
    asOfDate: '2026-04-08',
    notes: 'Delivered 2024. Resale active with 2 listings. No developer incentive signals.',
  },

  socialProof: [
    {
      platform: 'google' as const,
      author: 'Linda K.',
      text: 'Bayshore views from every room. Private elevator foyer makes it feel like a home, not a condo. Ronto Group delivered on everything they promised.',
      date: '2025',
      rating: 5,
    },
  ],

  pressHighlights: [
    { source: 'Tampa Bay Business Journal', date: '2024', headline: 'Ronto Group delivers 73-unit luxury tower on Bayshore Boulevard' },
  ],

  marketEvidence: [
    { metric: 'Bayshore Baseline', value: '$838/SF (Non-Branded)', description: 'Altura is the non-branded Bayshore benchmark. At $838/SF average, it establishes the floor against which the Ritz-Carlton campus ($925/SF, +10.4%) and every future Bayshore entrant must justify their premium. The delta between Altura and Ritz-Carlton quantifies the exact cost of branded living on the same corridor.' },
    { metric: 'Sell-Through', value: '100% Developer Sold', description: 'Ronto Group sold out all 73 units, with the majority transacting off-MLS through direct developer channels. MLS captures only 8 closings at $809/SF — a fraction of actual sales volume. Full sellout with zero distress confirms the non-branded Bayshore thesis at scale.' },
    { metric: 'HOA Benchmark', value: '$1.00/SF', description: 'At $1.00/SF/month, Altura\'s HOA is 6% below the Ritz-Carlton ($1.06/SF) and 34% below the EDITION ($1.52/SF). This positions Altura as the lower-carrying-cost alternative on Bayshore — a meaningful differentiator for cost-conscious luxury buyers.' },
    { metric: 'Resale Stability', value: '2 Active + 1 Pending', description: 'Only 2 resale listings and 1 pending contract as of April 2026 — a 4.1% active inventory rate against 73 units. Zero distress signals. Owners are holding, not flipping. This is the hallmark of a stable, owner-occupied building.' },
    { metric: 'PSF Appreciation', value: '$803-$873/SF Range', description: 'The tight $70/SF resale range ($803-$873) indicates price stability. No outlier discounts, no panic selling. Delivered in 2024, Altura has maintained its pricing band through two years of pipeline supply increases — a validation that the Bayshore corridor absorbs new inventory without compressing existing values.' },
  ],

  advisoryInsights: [
    { title: 'For Buyer Advisors', content: 'Altura is the de-risked Bayshore play. Developer sold out, building delivered, resale market stable with zero distress. At $838/SF, buyers get Bayshore Boulevard frontage, 10-foot ceilings, and private elevator foyers at a 10% discount to the Ritz-Carlton campus next door — without the branded HOA premium. The $1.00/SF HOA saves $120-$215/month versus branded competitors on a 2,200 SF unit. Advise clients that with only 2 active resale listings, inventory is scarce and negotiating leverage is limited. This is a "pay asking or lose it" market.' },
    { title: 'For Listing Advisors', content: 'Altura\'s $838/SF provides the definitive non-branded comp for any South Tampa Bayshore listing. Use Altura\'s sold-out status and stable resale pricing to anchor CMA discussions: if Altura holds at $838/SF delivered and stabilized, nearby non-waterfront inventory should price 15-25% below that baseline. The Ritz-Carlton\'s 10.4% branded premium over Altura ($925 vs $838) is the exact number to cite when clients ask what branded living costs. For sellers in the Bayshore corridor, Altura\'s 4.1% active inventory rate demonstrates that the corridor is not oversupplied despite 100+ Ritz-Carlton units next door.' },
  ],

  seo: {
    title: 'Altura Bayshore | 73 Luxury Residences on Bayshore Blvd from $1.7M',
    description:
      'Altura Bayshore — 73 residences in a 22-story tower on Bayshore Boulevard, Tampa. Delivered 2024 by Ronto Group. 2-4 bedrooms, 2,176-3,575 SF. 10ft ceilings, bay views, rooftop pool.',
    keywords: ['Altura Bayshore', 'Bayshore Boulevard', 'Tampa luxury condos', 'Ronto Group', 'South Tampa'],
  },
};
