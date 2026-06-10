import { DevelopmentProfile } from '@/types/development-profile';

export const tampaEdition: DevelopmentProfile = {
  slug: 'tampa-edition',
  name: 'Tampa EDITION Residences',
  tagline: 'The Highest PSF in Hillsborough County — Water Street Tampa',
  description:
    'Tampa Bay\'s first branded residence. Still its most expensive per square foot. Resales at $1,563/SF — the hard ceiling for Hillsborough County that every branded entrant in the pipeline must justify against. Developer sold all 37 units; the January 2026 close at $1,493/SF confirms the premium holds four years post-delivery. The $1.52/SF monthly HOA — highest in the pipeline — is the cost of EDITION-level hotel services, and the resale data says buyers are paying it without hesitation.',
  location: '1000 Water Street, Tampa 33602',
  address: '1000 Water Street',
  city: 'Tampa',
  county: 'hillsborough',
  status: 'sold-out',
  statusLabel: 'Sold Out',
  type: 'Branded Residence',

  price: 'From $2,990,000',
  bedrooms: '2-4',
  bathrooms: '2.5-4.5',
  sqft: '1,821-7,177 SF',
  totalUnits: 37,
  unitSizes: '1,821-7,177 SF',
  deliveryDate: 'Available Now',
  stories: 26,
  hoaPerSqFt: 1.52, // MLS broker data: $1.52-$1.80/SF/mo — HIGHEST in Tampa Bay pipeline

  lastUpdated: '2026-04-09',

  developer: 'Strategic Property Partners',
  architect: 'Morris Adjmi',
  interiorDesigner: 'Roman & Williams',
  salesTeam: [
    { name: 'Smith & Associates Real Estate', title: 'Original developer sales (Stacey Borsik Niebles — now Waldorf)' },
  ],
  salesAgents: [
    { name: 'Bianca Lopez', title: 'Resale Agent', brokerage: 'Compass', phone: '813-760-0618' },
    { name: 'Leslie Buddemeyer', title: 'Resale Agent', brokerage: 'Smith & Associates Real Estate', phone: '813-220-4717' },
    { name: 'Andre Kashou', title: 'Resale Agent', brokerage: 'Keller Williams Realty', phone: '813-777-0007' },
  ],
  // Developer sold out — only resale agents active
  rentalPolicy: '6-month minimum',
  brokerCommission: '3% co-op',
  website: 'https://tampaeditionresidences.com',
  socialMedia: {
    instagram: 'https://www.instagram.com/editiontampa/',
    facebook: 'https://www.facebook.com/TheTampaEDITION/',
  },

  features: [
    'Designed by Morris Adjmi with Roman & Williams interiors',
    'Floor-to-ceiling windows with Water Street and bay views',
    'Premium kitchen and bath finishes',
    'Full EDITION hotel services',
    'Part of Water Street Tampa master-planned district',
    'Highest PSF in Hillsborough County',
  ],
  amenities: [
    'EDITION hotel services and concierge',
    'Rooftop pool and lounge',
    'Full-service spa',
    'Signature restaurants and bars',
    'State-of-the-art fitness center',
    'Valet parking',
  ],
  galleryImages: [
    'https://floridayimby.com/wp-content/uploads/2022/11/EDITION_Tampa-26-777x971.jpg',
    'https://floridayimby.com/wp-content/uploads/2022/11/EDITION_Tampa-01-scaled.jpg',
    'https://floridayimby.com/wp-content/uploads/2022/11/EDITION_Tampa-02-scaled.jpg',
    'https://floridayimby.com/wp-content/uploads/2022/11/EDITION_Tampa-05-scaled.jpg',
    'https://cdn.agilitycms.com/3e0f4100/locations/migration/EDITION-residences-balcony-night-2048x1024.jpg',
  ],

  scores: {
    walkScore: 85,
    bikeScore: 55,
    transitScore: 32,
  },

  lifecycle: {
    firstClosingDate: '2022',
    estimatedSelloutDate: 'Ongoing resale',
  },

  pricingHistory: {
    launchPsf: 1035, // Early developer close PSF (Unit 1801 at $1,035/SF, Jan 2023)
    currentPsf: 1563, // Avg of 2 active resale listings (Apr 2026)
    currentPriceRange: '$2,990,000-$4,600,000',
    priceChangePercent: 51.1, // $1,035 launch → $1,563 current resale avg
    asOfDate: '2026-04-09',
    // Tampa Bay's FIRST branded residence — delivered 2022
    // MLS (Apr 2026): 8 sold + 2 active + 11 cancelled
    //   Developer closings (Jan-Feb 2023, 0 DOM, Stacey Borsik Niebles/Smith & Associates):
    //     Unit 1801: $2,121,900 (2,050 SF, $1,035/SF)
    //     Unit 1601: $2,184,900 (2,050 SF, $1,066/SF)
    //     Unit 1902: $3,543,900 (3,014 SF, $1,176/SF)
    //     Unit 2601: $8,341,729 (6,887 SF, $1,211/SF) — penthouse
    //   Resales:
    //     Unit 1401: sold $3,550,000 (2,050 SF, $1,732/SF) — Feb 2023
    //     Unit 1802: sold $4,850,000 (3,014 SF, $1,609/SF) — Sep 2023
    //     Unit 1702: sold $4,500,000 (3,014 SF, $1,493/SF) — Jan 2026 (most recent)
    //   Active resales:
    //     Unit 1103: $2,990,000 (1,868 SF, $1,601/SF), DOM 132 — Bianca Lopez
    //     Unit 1502: $4,600,000 (3,014 SF, $1,526/SF), DOM 44 — Leslie Buddemeyer
    // HOA: $1.52-$1.80/SF/mo (HIGHEST in Tampa Bay pipeline)
    // Developer sold out. All current activity is owner resale.
  },

  riskFlags: [],

  incentives: {
    items: [],
    pricingClassification: 'clean',
    asOfDate: '2026-04-09',
    notes: 'Developer sold out (2022-2023). 2 resale listings at avg $1,563/SF. HOA at $1.52-$1.80/SF/mo is highest in pipeline. Most recent close: Unit 1702 at $1,493/SF (Jan 2026).',
  },

  socialProof: [
    {
      platform: 'google' as const,
      author: 'Bryan P.',
      text: 'I\'m a branded residence guy. The branded residences have a duty and obligation to always upkeep that level of prestigiousness and top level of service. Smart investment that will only increase in value.',
      date: '2024',
      rating: 5,
    },
  ],

  pressHighlights: [
    { source: 'Water Street Tampa', date: '2022', headline: 'Tampa Bay\'s first branded residence — only 3rd EDITION-branded residence in the US' },
    { source: 'Morris Adjmi Architects', date: '2022', headline: 'Industrial-meets-deco architecture with Roman & Williams interiors' },
  ],

  marketEvidence: [
    { metric: 'PSF Ceiling', value: '$1,563/SF (Resale Avg)', description: 'The highest price per square foot in Hillsborough County — period. The EDITION\'s $1,563/SF resale average is the hard ceiling that every branded entrant in the pipeline must justify against. Pendry at $1,329/SF is 15% below. The Ritz-Carlton at $925/SF is 41% below. This is the benchmark.' },
    { metric: 'Appreciation', value: '+51.1% Over Developer', description: 'Developer closes averaged $1,035/SF (2022-2023). Current resale average is $1,563/SF — a 51.1% appreciation in under four years. Unit 1401 resold at $1,732/SF in February 2023, the single highest PSF transaction in the Tampa Bay pipeline. This is the strongest branded-residence appreciation story in the market.' },
    { metric: 'Most Recent Close', value: '$1,493/SF (Jan 2026)', description: 'Unit 1702 closed at $4.5M ($1,493/SF) in January 2026, confirming the premium holds four years post-delivery. This is not launch-day euphoria — it is sustained, verified resale demand at $1,400+/SF.' },
    { metric: 'HOA Cost', value: '$1.52/SF (Highest in Pipeline)', description: 'The highest monthly HOA in the Tampa Bay pipeline at $1.52-$1.80/SF. On a 3,014 SF unit, that is $4,581-$5,425/month before mortgage. This HOA is the cost of EDITION-level hotel services — spa, restaurants, valet, concierge — and functions as a self-selection mechanism that filters for high-net-worth owners.' },
    { metric: 'Inventory Scarcity', value: '37 Total Units', description: 'The smallest unit count in the Hillsborough pipeline. With only 37 units and the developer sold out, resale inventory is structurally constrained. Two active listings as of April 2026 means any interested buyer is choosing between exactly two options — or waiting.' },
    { metric: 'Developer Sellout', value: '100% Sold', description: 'All 37 units sold through developer channels (Smith & Associates, Stacey Borsik Niebles). The speed of sellout and subsequent resale appreciation confirmed Tampa Bay\'s appetite for branded ultra-luxury at Water Street. SPP\'s execution here greenlit the branded pipeline that followed.' },
  ],

  advisoryInsights: [
    { title: 'For Buyer Advisors', content: 'The EDITION is the proven asset in Tampa Bay branded real estate. Four years of transaction data, 51% appreciation, and only 37 units create a scarcity profile unmatched by any competitor. The two active resale listings — Unit 1103 at $1,601/SF and Unit 1502 at $1,526/SF — represent the entire available inventory. Advise clients that the $1.52/SF monthly HOA ($4,581+/month on a typical unit) is the highest carrying cost in the pipeline and must be underwritten as a non-negotiable operating expense. Buyers willing to absorb this cost are purchasing the PSF ceiling of Hillsborough County with the transaction history to prove it holds.' },
    { title: 'For Listing Advisors', content: 'The EDITION\'s $1,563/SF is the top comp for every luxury listing in Hillsborough County. Use it to anchor the upper bound of any CMA, then discount by the appropriate factor: Pendry at 85% of EDITION, Ritz-Carlton at 59%, non-branded at 50-55%. For agents listing nearby Water Street condos, the EDITION\'s $1.52/SF HOA is your strongest differentiation point — any building with sub-$1.00/SF HOA can position on total cost of ownership. The 51% developer-to-resale appreciation makes the EDITION the premier "smart money validated" comp. When clients question whether branded premiums hold, point to Unit 1702\'s January 2026 close at $1,493/SF.' },
  ],

  seo: {
    title: 'Tampa EDITION Residences | 37 Ultra-Luxury Residences from $2.99M',
    description:
      'Tampa EDITION Residences — 37 private residences in a 26-story tower at Water Street Tampa. By Strategic Property Partners. PSF $1,493-$1,601 — highest in Hillsborough County. Delivered 2022.',
    keywords: ['Tampa EDITION', 'EDITION Residences', 'Water Street Tampa', 'Strategic Property Partners', 'ultra luxury Tampa', 'branded residence'],
  },
};
