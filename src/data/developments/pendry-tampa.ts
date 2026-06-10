import { DevelopmentProfile } from '@/types/development-profile';

export const pendryTampa: DevelopmentProfile = {
  slug: 'pendry-tampa',
  name: 'Pendry Residences Tampa',
  tagline: 'Branded Luxury on Tampa\'s Waterfront by Two Roads Development',
  description:
    'The $45.5M penthouse — Tampa Bay\'s most expensive residential listing ever — tells you where Two Roads Development believes the ceiling is. 207 units at $1,329/SF average, positioned between the EDITION\'s proven $1,563/SF floor and the Ritz-Carlton\'s Bayshore bid. Superstructure rising at 17 stories with Q4 2027 delivery. This is the execution bet that defines downtown Tampa\'s ultra-luxury corridor: if Pendry sells through, it confirms a hospitality-branded market at $1,300+/SF. If it doesn\'t, the pipeline behind it reprices.',
  location: '111 S Ashley Drive, Tampa 33602',
  address: '111 S Ashley Drive',
  city: 'Tampa',
  county: 'hillsborough',
  status: 'under-construction',
  statusLabel: 'Under Construction',
  type: 'Branded Residence',

  price: 'From $1,875,000',
  bedrooms: '1-3',
  bathrooms: '2-3.5',
  sqft: '1,378-3,219 SF',
  totalUnits: 207,
  unitSizes: '1,378-3,219 SF',
  deliveryDate: 'Q4 2026 – Q4 2027', // MLS split: some units 12/31/2026, others 12/31/2027 — phased delivery
  stories: 38,
  hoaPerSqFt: 1.04, // MLS broker data: $1.01-$1.07/SF/mo

  lastUpdated: '2026-04-09',

  developer: 'Two Roads Development',
  architect: 'Arquitectonica',
  interiorDesigner: 'Studio Munge',
  salesTeam: [
    { name: 'Smith & Associates Real Estate', title: 'Exclusive Sales (Sarena Irwin, Kat Haynes)' },
  ],
  salesAgents: [
    { name: 'Sarena Irwin', title: 'Sales Executive', brokerage: 'Smith & Associates Real Estate', phone: '813-250-3800' },
    { name: 'Kat Haynes', title: 'Sales Executive', brokerage: 'Smith & Associates Real Estate', phone: '813-250-3800' },
  ],
  website: 'https://pendryresidencestampa.com',
  phone: '727-746-5575',
  socialMedia: {
    instagram: 'https://www.instagram.com/pendryresidencestampa',
    facebook: 'https://www.facebook.com/pendryresidencestampa/',
  },

  rentalPolicy: '6-month minimum',
  brokerCommission: '3% co-op',

  features: [
    'Arquitectonica-designed 38-story tower',
    'Interiors by Studio Munge',
    'Floor-to-ceiling windows',
    'Premium kitchen and bath finishes',
    'Full Pendry hotel services and concierge',
    '$45.5M penthouse — most expensive listing in Tampa Bay history',
  ],
  amenities: [
    'Pendry hotel services and concierge',
    'Resort-style pool deck',
    'Full-service spa and fitness center',
    'Signature restaurant and bar',
    'Private residents-only amenity spaces',
    'Valet parking',
  ],
  galleryImages: [
    'https://www.homesandcondostampa.com/megatemplate/uploads/photogallery_images/ImgPendry%20Tampa%20Condos%20for%20Sale11102021_2211391Pendry-Tampa-Condos-for-Sale.jpg',
    'https://www.homesandcondostampa.com/megatemplate/uploads/photogallery_images/ImgPendry%20Residences%20Tampa11102021_2211421Pendry-Residences-Tampa.jpg',
    'https://www.homesandcondostampa.com/megatemplate/uploads/photogallery_images/ImgPendry%20Residences%20Tampa%20Evening11102021_2219471Pendry-Residences-Tampa-Evening.jpg',
    'https://www.homesandcondostampa.com/megatemplate/uploads/photogallery_images/ImgPendry%20Residences%20RoofTop%20Pool552022_2325521Pendry-Residences-RoofTop-Pool.jpg',
    'https://www.homesandcondostampa.com/megatemplate/uploads/photogallery_images/ImgPendry%20Tampa%20Dusk12212022_221381Pendry%20Tampa%20Dusk.jpg',
  ],

  scores: {
    walkScore: 85,
    bikeScore: 68,
    transitScore: 48,
  },

  constructionProgress: {
    percent: 45,
    status: 'Superstructure at ~16-17 stories',
    milestones: [
      { title: 'Groundbreaking', date: '2024', completed: true },
      { title: 'Superstructure rising', date: '2025', completed: true },
      { title: 'Topping off', date: '2026', completed: false },
      { title: 'Delivery', date: 'Late 2026', completed: false },
    ],
  },

  lifecycle: {
    constructionStartDate: '2024',
    estimatedSelloutDate: 'Late 2026',
  },

  pricingHistory: {
    launchPsf: 1085,
    currentPsf: 1329, // Avg of 9 active MLS listings (Apr 2026)
    currentPriceRange: '$1,875,000-$5,500,000 (+ $45.5M PH)',
    priceChangePercent: 22.5, // $1,085 launch → $1,329 current avg
    asOfDate: '2026-04-09',
    // MLS Active (Apr 2026): 9 listings, all Smith & Associates (Sarena Irwin, Kat Haynes)
    //   Unit 3303: 1BR, 1,378 SF, $1,875,000 ($1,361/SF), DOM 75
    //   Unit 3107: 2BR, 1,697 SF, $2,107,000 ($1,242/SF), DOM 31
    //   Unit 2809: 2BR, 2,259 SF, $2,285,000 ($1,012/SF), DOM 20
    //   Unit 2705: 2BR, 1,930 SF, $2,595,000 ($1,345/SF), DOM 75
    //   Unit 3606: 2BR, 2,222 SF, $2,930,000 ($1,319/SF), DOM 75
    //   Unit 2504: 2BR, 2,218 SF, $3,125,000 ($1,409/SF), DOM 199
    //   Unit 1608: 3BR, 2,953 SF, $3,450,000 ($1,168/SF), DOM 155
    //   Unit 2702: 3BR, 3,216 SF, $4,500,000 ($1,399/SF), DOM 75
    //   Unit 1501: 3BR, 3,218 SF, $5,500,000 ($1,709/SF), DOM 74
    // 23 cancelled + 5 expired = normal pre-construction MLS cycling
    // PSF range: $1,012-$1,709
  },

  riskFlags: [],

  incentives: {
    items: [],
    pricingClassification: 'clean',
    asOfDate: '2026-04-08',
    notes: 'Under construction, superstructure at ~16-17 stories. $45.5M penthouse listing. No incentive signals.',
  },

  pressHighlights: [
    { source: 'Tampa Bay Business & Wealth', date: 'March 2026', headline: '$45.5M penthouse listing — most expensive residential listing in Tampa Bay history' },
    { source: 'Florida YIMBY', date: 'March 2026', headline: 'Pendry Tampa superstructure rises above podium levels along downtown Riverwalk' },
  ],

  marketEvidence: [
    { metric: 'Average PSF', value: '$1,329/SF', description: 'Positioned between the EDITION\'s proven $1,563/SF resale floor and the Ritz-Carlton\'s $925/SF campus average. This is the mid-corridor bet: if Pendry sells through at $1,300+, it confirms a three-tier branded market in Tampa Bay.' },
    { metric: 'Penthouse Ceiling', value: '$45.5M', description: 'The most expensive residential listing in Tampa Bay history. This single unit redefines the top of the market and signals Two Roads\' conviction that ultra-luxury demand exists at a price point never tested here.' },
    { metric: 'PSF Appreciation', value: '+22.5%', description: 'Launch PSF of $1,085 has climbed to a $1,329 average across 9 active MLS listings. The $1,012-$1,709 PSF range reflects floor-premium stratification — lower floors discount to sub-$1,100, upper floors command $1,400+.' },
    { metric: 'Construction Financing', value: '$520M', description: 'Among the largest single-tower construction loans in Tampa Bay history. Lender confidence at this scale implies substantial pre-sale commitments and underwriting conviction in the branded-residence thesis.' },
    { metric: 'Active Inventory', value: '9 MLS Listings', description: 'All 9 listings through Smith & Associates (Sarena Irwin, Kat Haynes). DOM ranges from 2 to 199 days — the 199-day Unit 2504 at $1,409/SF is the price-discovery ceiling for the 2BR tier.' },
    { metric: 'Execution Timeline', value: 'Q4 2026-Q4 2027', description: 'Phased delivery across 12+ months. Superstructure at 16-17 stories with topping off targeted for 2026. Buyers should model 18-24 months to close from contract date.' },
  ],

  advisoryInsights: [
    { title: 'For Buyer Advisors', content: 'Pendry\'s $1,329/SF average sits in a narrow band — 15% below the EDITION\'s proven resale floor and 44% above the Ritz-Carlton campus average. The lower-floor units at $1,012-$1,168/SF represent the best entry into a hospitality-branded tower in downtown Tampa. Unit 2809 at $1,012/SF and Unit 1608 at $1,168/SF are the two most aggressive PSF options remaining. Advise clients that the $45.5M penthouse listing creates an aspirational ceiling that benefits all owners by anchoring the brand at ultra-luxury positioning.' },
    { title: 'For Listing Advisors', content: 'Any resale within a 10-block radius of Pendry must now price against $1,329/SF branded competition with hotel services. Non-branded inventory below $900/SF should emphasize value positioning — Pendry\'s HOA at $1.04/SF and hotel service costs create ongoing carrying cost that favors the price-conscious buyer. If Pendry absorption slows post-delivery, it creates a pricing ceiling that protects nearby resale sellers from upward pressure. Monitor the 23 cancelled + 5 expired MLS cycles for signs of developer repricing.' },
  ],

  seo: {
    title: 'Pendry Residences Tampa | 207 Branded Residences from $1.87M',
    description:
      'Pendry Residences Tampa — 207 residences + 220 hotel rooms in a 38-story tower. By Two Roads Development, designed by Arquitectonica. PSF $1,085-$1,709. $45.5M penthouse. Late 2026 delivery.',
    keywords: ['Pendry Tampa', 'Pendry Residences', 'Two Roads Development', 'Downtown Tampa', 'branded residence', 'luxury condos Tampa'],
  },
};
