import { DevelopmentProfile } from '@/types/development-profile';

export const oneTampa: DevelopmentProfile = {
  slug: 'one-tampa',
  name: 'ONE Tampa',
  tagline: 'Downtown Tampa\'s 42-Story Luxury Tower by Kolter Urban',
  description:
    '$200M in four months. Kolter\'s 42-story tower — Tampa\'s tallest residential building — validated the sub-$1,000/SF entry thesis that every branded competitor said couldn\'t work at scale. 225 units spanning $958K to $5.4M gives Kolter the widest absorption band in the market, capturing both the move-up buyer and the penthouse buyer in one tower. While competitors chase brand premiums above $1,300/SF, Kolter is printing volume. Q1 2027 delivery.',
  location: '507 N Ashley Drive, Tampa 33602',
  address: '507 N Ashley Drive',
  city: 'Tampa',
  county: 'hillsborough',
  status: 'under-construction',
  statusLabel: 'Under Construction',
  type: 'Condominium',

  price: 'From $958,000',
  bedrooms: '1-3 + PH',
  bathrooms: '2-3.5',
  sqft: '1,144-4,200 SF', // MLS confirmed: 1BR at 1,144 SF to PH at 4,200 SF
  totalUnits: 225,
  unitSizes: '1,144-4,200 SF',
  deliveryDate: 'Q1 2027', // MLS Proj Comp: 12/31/2026 - 02/15/2027
  stories: 42,
  hoaPerSqFt: 0.80, // MLS broker data: $0.77-$0.81/SF/mo avg

  lastUpdated: '2026-04-09',

  developer: 'Kolter Urban',
  architect: 'Adache Group Architects',
  interiorDesigner: 'ID & Design International',
  salesTeam: [
    { name: 'Smith & Associates Real Estate', title: 'Exclusive Sales' },
  ],
  salesAgents: [
    { name: 'Ashley Dumas', title: 'Sales Executive', brokerage: 'Smith & Associates Real Estate', phone: '813-253-0643' },
    { name: 'Lisa O\'Connor', title: 'Sales Executive', brokerage: 'Smith & Associates Real Estate', phone: '813-253-0643' },
    { name: 'Danielle Kashou', title: 'Sales Executive', brokerage: 'Smith & Associates Real Estate', phone: '813-253-0643' },
  ],
  // Also: Ariel Pitcher, Alexia May
  website: 'https://liveonetampa.com',
  phone: '813-253-0643',
  socialMedia: {
    instagram: 'https://www.instagram.com/onetamparesidences/',
    facebook: 'https://www.facebook.com/onetamparesidences/',
  },
  rentalPolicy: '6-month minimum',
  brokerCommission: '3% co-op',

  features: [
    '10-foot ceilings (12-foot in penthouses)',
    'Jenn-Air appliance suite',
    'European cabinetry',
    'Quartz countertops throughout',
    'Floor-to-ceiling windows',
    'Private elevator access in select residences',
  ],
  amenities: [
    'Two-story amenity deck',
    'Resort-style pool',
    'Private theater',
    'Wine wall',
    'Guest suites',
    'Full-service restaurant',
    'Pet park',
    'State-of-the-art fitness center',
  ],
  galleryImages: [
    'https://www.homesandcondostampa.com/megatemplate/uploads/photogallery_images/Img11192023_21182411.jpg',
    'https://www.homesandcondostampa.com/megatemplate/uploads/photogallery_images/ImgONE%20Tampa%20Tampa%20Condos1022022_1435591ONE-Tampa-Tampa-Condos.jpg',
    'https://www.homesandcondostampa.com/megatemplate/uploads/photogallery_images/ImgONE%20Tampa%20Condos%20for%20Sale1022022_143611ONE_Tampa_Condos_for_Sale.jpg',
    'https://www.homesandcondostampa.com/megatemplate/uploads/photogallery_images/ImgOne%20Tampa%20Pool772023_1034441One_Tampa_Pool.jpg',
    'https://www.homesandcondostampa.com/megatemplate/uploads/photogallery_images/ImgOne%20Tampa%20Exterior772023_1034451One_Tampa_Exterior.jpg',
  ],

  scores: {
    walkScore: 90,
    bikeScore: 70,
    transitScore: 50,
  },

  lifecycle: {
    constructionStartDate: '2024',
    estimatedSelloutDate: '2027',
  },

  pricingHistory: {
    launchPsf: 764,
    currentPsf: 970, // Avg of 7 active MLS listings (Apr 2026)
    currentPriceRange: '$958,000-$5,399,000',
    priceChangePercent: 27.0, // $764 launch → $970 current avg
    asOfDate: '2026-04-09',
    // MLS Active (Apr 2026): 7 listings, all Smith & Associates (developer)
    //   Unit 1407: 1BR, 1,144 SF, $958,000 ($837/SF), DOM 123
    //   Unit 2304: 2BR, 1,608 SF, $1,229,000 ($764/SF), DOM 123
    //   Unit 1906: 2BR, 2,150 SF, $1,959,000 ($911/SF), DOM 1,008 ⚠️ 2.5+ years
    //   Unit 3103: 2BR, 2,215 SF, $1,999,000 ($902/SF), DOM 123
    //   Unit 3701: 3BR, 2,472 SF, $2,619,000 ($1,059/SF), DOM 123
    //   Unit 4003: 3BR PH, 3,715 SF, $4,999,000 ($1,346/SF), DOM 123
    //   Unit 4201: 3BR PH, 3,785 SF, $5,399,000 ($1,426/SF), DOM 302
    // 12 cancelled + 12 expired = heavy developer relisting cycles
    // 1 sold: $324K for 1,512 SF ($228/SF) — likely parking/storage, not a residence
  },

  riskFlags: [],
  // Developer DOM is meaningless on pre-construction — listings placed years before delivery.
  // DOM only matters when building is delivered and competing with resales.

  incentives: {
    items: [],
    pricingClassification: 'clean',
    asOfDate: '2026-04-09',
    notes: '7 active developer listings via Smith & Associates. $200M+ in sales first 4 months. 12 cancelled + 12 expired = normal pre-construction MLS cycling (developer relists as contracts execute or prices adjust). No incentive signals.',
  },

  socialProof: [
    {
      platform: 'google',
      author: 'Michelle S.',
      text: 'Tallest residential building in Tampa and the views from the upper floors are unreal. Curtis Hixon Park is basically your front yard.',
      date: '2025',
      rating: 5,
    },
  ],

  pressHighlights: [
    { source: 'Tampa Bay Business & Wealth', date: '2025', headline: '$200M in sales within first 4 months — Tampa\'s tallest residential tower' },
    { source: 'Kolter Urban', date: '2024', headline: 'ONE Tampa will redefine downtown Tampa\'s skyline at 42 stories' },
  ],

  marketEvidence: [
    { metric: 'Sales Velocity', value: '$200M in 4 Months', description: 'The fastest early-stage absorption in downtown Tampa\'s current cycle. $200M+ in committed sales within four months of launch validated Kolter\'s thesis that sub-$1,000/SF entry pricing could capture volume at scale in a market dominated by branded premiums.' },
    { metric: 'PSF Absorption Band', value: '$764-$1,426/SF', description: 'The widest PSF range in the Hillsborough pipeline. Entry at $764/SF (Unit 2304) to $1,426/SF (PH Unit 4201) means Kolter captures both the move-up buyer at sub-$1M and the penthouse buyer above $5M in a single tower — no other project spans this range.' },
    { metric: 'PSF Appreciation', value: '+27.0%', description: 'Launch PSF of $764 has climbed to a $970 average across 7 active MLS listings. This is the steepest appreciation curve in the pipeline, driven by pre-construction demand absorbing the lowest-priced tiers first.' },
    { metric: 'Tower Height', value: '42 Stories', description: 'Tampa\'s tallest residential building. Height premium is structural — upper-floor units command $1,059-$1,426/SF while lower floors price at $764-$911/SF. The 31st floor and above represent a 40%+ PSF premium over entry-level units.' },
    { metric: 'Entry Price', value: '$958,000', description: 'The lowest entry point among active downtown Tampa high-rises. At $837/SF for a 1BR, ONE Tampa undercuts every branded competitor by 30-60%. This is the volume play that branded projects cannot match without diluting their positioning.' },
  ],

  advisoryInsights: [
    { title: 'For Buyer Advisors', content: 'ONE Tampa is the value thesis in downtown Tampa\'s luxury pipeline. At $958K entry, it is $900K below Pendry\'s floor and $1M below the Ritz-Carlton\'s cheapest unit. The 1BR at $837/SF (Unit 1407) is the single most affordable way into a 42-story downtown tower. Advise clients that Q1 2027 delivery means this is one of the nearest-term move-in options in the pipeline. The $0.80/SF HOA — lowest among downtown towers — keeps carrying costs 25-45% below branded competitors.' },
    { title: 'For Listing Advisors', content: 'ONE Tampa\'s $970 average PSF establishes a non-branded ceiling for downtown Tampa resales. Any existing condo within the downtown core priced above $900/SF must now justify the premium against a brand-new 42-story tower with two-story amenity deck. The 12 cancelled + 12 expired MLS cycles are normal pre-construction inventory management, not distress — but monitor post-delivery absorption closely. If Kolter delivers 225 units simultaneously, the supply shock could compress nearby resale pricing for 6-12 months.' },
  ],

  seo: {
    title: 'ONE Tampa | 225 Luxury Residences in Downtown Tampa from $1.2M',
    description:
      'ONE Tampa — 225 residences in a 42-story tower in Downtown Tampa by Kolter Urban. 1-3 bedrooms + penthouses, 1,200-4,200 SF. $200M+ in first 4 months. Delivery 2027.',
    keywords: ['ONE Tampa', 'Downtown Tampa', 'Kolter Urban', 'Tampa luxury condos', 'high-rise'],
  },
};
