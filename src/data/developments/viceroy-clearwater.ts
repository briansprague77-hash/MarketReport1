import { DevelopmentProfile } from '@/types/development-profile';

export const viceroyClearwater: DevelopmentProfile = {
  slug: 'viceroy-clearwater',
  name: 'Viceroy Clearwater Beach',
  tagline: 'Branded Resort Residences on Clearwater Beach',
  description:
    'The only Gulf-front hospitality-branded residence in Pinellas County — 86 units on Clearwater Beach\'s most expensive vacant parcel ($24.75M). BH3 is pricing at $1,400+/SF against a $250M total basis, but MLS data shows friction: price reductions up to 9% and the developer opening listing rights beyond its exclusive Waypoint agreement. When a developer breaks exclusivity, it signals urgency. The demand thesis for ultra-luxury on Clearwater Beach — historically a tourism market, not a residence market — is being tested in real time.',
  location: '805 S Gulfview Blvd, Clearwater Beach 33767',
  address: '805 S Gulfview Blvd',
  city: 'Clearwater Beach',
  county: 'pinellas',
  status: 'pre-sales',
  statusLabel: 'Pre-Sales',
  type: 'Condominium',

  price: 'From $1,995,000',
  bedrooms: '2-5',
  bathrooms: '2.5-5.5',
  sqft: '2,173-6,124 SF', // MLS confirmed: 2BR at 2,173 SF to PH at 6,124 SF
  totalUnits: 86,
  unitSizes: '2,173-6,124 SF',
  deliveryDate: 'Q1 2028', // MLS Proj Comp Date: 01/01/2028
  stories: 9,
  hoaPerSqFt: 1.40,

  lastUpdated: '2026-04-09',

  developer: 'BH3 Management / U.S. Development',
  architect: 'Randall Stofft Architects',
  interiorDesigner: 'Interiors by Steven G',
  salesGallery: '805 S Gulfview Blvd, Clearwater Beach (on-site, $5M presentation center)',
  salesTeam: [
    { name: 'Waypoint Resort Real Estate', title: 'Lead Sales Brokerage' },
  ],
  salesAgents: [
    { name: 'Naftali Gur', title: 'Director of Sales', brokerage: 'Waypoint Resort Real Estate', phone: '727-615-3248', email: 'naftali@viceroycwb.com' },
    { name: 'Amanda Bybee', title: 'Sales Executive', brokerage: 'Waypoint Resort Real Estate', phone: '727-615-3248' },
  ],
  website: 'https://viceroycwb.com/',
  phone: '727-615-3248',
  socialMedia: {
    instagram: 'https://www.instagram.com/viceroyresidencescwb/',
    facebook: 'https://www.facebook.com/ViceroyResidencesClearwaterBeach',
    linkedin: 'https://www.linkedin.com/company/viceroycwb',
  },

  features: [
    'Gulf-front views from every residence',
    'Category 5-rated impact glass (165 mph)',
    'Elevated 18.6 ft NAVD (exceeds 500-year flood level)',
    'Smart home systems',
    'Flow-through layouts (2,078-3,443 SF)',
    'Summer kitchens on private terraces',
    'Interiors by Steven G',
    'Dual gas-powered backup generators',
  ],
  amenities: [
    '270-ft private beach guarded by jetties',
    'Resort infinity pool',
    'Full-service spa',
    'Signature restaurant',
    'Valet parking',
    '24/7 concierge',
    '100,000-gallon stormwater retention',
    'On-site sales gallery ($5M presentation center)',
  ],
  galleryImages: [
    '/images/developments/viceroy-clearwater/hero.jpg',
    'https://bh-3.com/wp-content/uploads/CLEARWATER-BEACH_805-GULFVIEW_BEACH-1-scaled.jpg',
    'https://bh-3.com/wp-content/uploads/CLEARWATER-BEACH_805-GULFVIEW_WATER_VF-1-scaled.jpg',
    'https://bh-3.com/wp-content/uploads/Clearwater_greatroomview.jpg',
    'https://bh-3.com/wp-content/uploads/CLEARWATER-BEACH_805-GULFVIEW_INTERIOR-scaled.jpg',
    'https://bh-3.com/wp-content/uploads/CLEARWATER-BEACH_805-GULFVIEW_BAR_VF_02-scaled.jpg',
    'https://viceroycwb.com/wp-content/uploads/2025/01/homepageslider5.jpg',
    'https://viceroycwb.com/wp-content/uploads/2025/01/homepageslider7.jpg',
    'https://viceroycwb.com/wp-content/uploads/2025/01/Restaurant.jpg',
  ],

  rentalPolicy: '3-month minimum, 2x per year',
  brokerCommission: '3% co-op',

  scores: {
    walkScore: 55,
    bikeScore: 50,
    transitScore: 30,
  },

  documents: {
    dealSheetUrl: '/docs/viceroy-clearwater/deal-sheet.pdf',
    factSheetUrl: '/docs/viceroy-clearwater/fact-sheet.pdf',
    faqUrl: '/docs/viceroy-clearwater/faq.pdf',
    pricingOverviewUrl: '/docs/viceroy-clearwater/pricing-overview.pdf',
    siteplanUrl: '/docs/viceroy-clearwater/site-plan.pdf',
    amenitiesUrl: '/docs/viceroy-clearwater/amenities.pdf',
    digitalBrochureUrl: '/docs/viceroy-clearwater/digital-brochure.pdf',
  },

  lifecycle: {
    siteAcquisitionDate: '2024',
    salesGalleryOpening: 'January 2025',
    salesLaunchDate: 'January 2025',
    verticalConstructionDate: '2026',
    estimatedSelloutDate: 'Late 2027',
  },

  pricingHistory: {
    launchPsf: 960,
    currentPsf: 1189, // MLS avg LP/SF of 6 active listings (Jun 2026). 2BR $918/SF, 3BR $1,118-$1,425/SF; +1 pending at $1,575/SF.
    launchPriceRange: 'From $1,995,000',
    currentPriceRange: '$1,995,000-$4,245,000',
    priceChangePercent: 23.9, // $960 launch → $1,189 current avg
    asOfDate: '2026-06-10',
    // MLS Active (Apr 2026): 14 total listings — 6 active, 1 pending, 7 cancelled
    // Sales team change: Waypoint Resort Real Estate (Myles Newell primary, Regina Sotomayor)
    //   Previously Nicoleta Forbes, Ty Joslyn, Inna Sych
    // Active inventory:
    //   Unit 305B: 2BR/2.5BA, 2,173 SF, $1,995,000 ($918/SF), DOM 71
    //   Unit 407A: 3BR/3.5BA, 2,392 SF, $2,675,000 ($1,118/SF), DOM 71
    //   Unit 506A: 3BR/3.5BA, 2,419 SF, $2,900,000 ($1,199/SF), DOM 77
    //   Unit 605A: 3BR/3.5BA, 2,558 SF, $3,100,000 ($1,212/SF), DOM 37
    //   Unit 401B: 3BR/3.5BA, 2,965 SF, $3,750,000 ($1,265/SF), DOM 77
    //   Unit 603A: 3BR/3.5BA, 2,980 SF, $4,245,000 ($1,425/SF), DOM 76
    // Pending:
    //   Unit 606A: 3BR/3.5BA, 2,419 SF, $3,050,000 ($1,261/SF), DOM 0
    //   ⚠️ 0 DOM + pending = back-entered off-market sale. Not true MLS demand.
    //   Entered to MLS simultaneously with pending status to create appearance of activity.
    //   Additionally: Regina Sotomayor (Homescene — outside brokerage) was allowed to enter
    //   her own MLS listing under the developer's agreement with Waypoint. This breaks normal
    //   exclusive listing convention — signals desperation. Developer opening listing rights
    //   beyond their contracted sales team to generate activity.
    // Cancelled (likely contracted):
    //   PH-1B: 5BR/5.5BA, 6,124 SF, $12,048,000 ($1,967/SF) — penthouse contracted!
    //   Unit 701B: 3BR, 2,965 SF, $5,371,000 ($1,811/SF)
    //   Unit 602A: 3BR, 2,911 SF, $4,795,000 ($1,647/SF)
    //   Unit 304A: 3BR, 3,443 SF, $3,984,000 ($1,157/SF)
    //   Unit 402B: 3BR, 2,927 SF, $3,547,000 ($1,212/SF)
    //   Unit 506A: 3BR, 2,419 SF, $2,995,000 ($1,238/SF) — relisted at $2,900,000
    //   Unit 305B: 2BR, 2,173 SF, $2,195,000 ($1,010/SF) — relisted at $1,995,000
    // Price reductions: Unit 506A (-$95K), Unit 305B (-$200K, -9.1%)
    // Implied contracts: ~$32.7M across 5 cancelled units (excl relisted)
    // Rental: 3-month minimum, 2x/year (most flexible branded residence in Tampa Bay)
    // Proj Comp: 01/01/2028
  },

  riskFlags: ['high-price-positioning', 'construction-delay', 'slow-sales'],

  incentives: {
    items: [],
    pricingClassification: 'clean',
    asOfDate: '2026-04-08',
    notes: '2 price reductions (Units 506A -$95K, 305B -$200K/-9.1%). Unit 606A pending at 0 DOM = back-entered off-market sale. Outside broker (Homescene) allowed to enter own listing — signals developer opening listing rights beyond exclusive Waypoint agreement. Multiple desperation indicators.',
  },

  pressHighlights: [
    { source: 'Tampa Bay Business & Wealth', date: 'December 2024', headline: 'Viceroy Residences Clearwater Beach unveils $250M beachfront condo project' },
    { source: 'Tampa Bay Business & Wealth', date: 'February 2025', headline: 'Viceroy launches sales from $5M on-site presentation gallery' },
  ],

  marketEvidence: [
    { metric: 'Price Reductions', value: '2 cuts, up to -9.1%', description: 'Unit 305B reduced $200K (from $2.195M to $1.995M, -9.1%) and Unit 506A reduced $95K (from $2.995M to $2.9M, -3.2%). Price reductions of this magnitude during pre-sales — before a single unit is delivered — signal demand friction at the $1,400/SF ask on Clearwater Beach. The developer is testing price elasticity in real time.' },
    { metric: 'Broken Listing Exclusivity', value: 'Outside broker entered own listing', description: 'Unit 606A appeared as pending at 0 DOM — a back-entered off-market sale — listed by Regina Sotomayor of Homescene, an outside brokerage, not the exclusive Waypoint team. When a developer allows non-exclusive agents to enter their own MLS listings, it breaks the normal sales team exclusivity convention. This is a desperation indicator: the developer is expanding the sales funnel beyond contracted channels to generate activity.' },
    { metric: 'Price Per SF Range', value: '$918/SF (2BR) to $1,425/SF (3BR)', description: 'The 2BR entry at $918/SF is competitive with delivered downtown product (400 Central at $950/SF, Reflection at $727/SF). But 3BR units at $1,118-$1,425/SF are testing unproven territory for Clearwater Beach, which has historically been a tourism and rental market — not a $3-4M primary residence market.' },
    { metric: 'Sales Team Turnover', value: '3 agents replaced', description: 'The original MLS listing agents (Nicoleta Forbes, Ty Joslyn, Inna Sych) have been replaced by Myles Newell and Regina Sotomayor under Waypoint. Sales team turnover during pre-sales is a friction signal — it suggests the original team\'s velocity did not meet developer expectations.' },
    { metric: 'Land Basis', value: '$24.75M site + $250M total project cost', description: 'BH3 paid $24.75M for the last vacant Gulf-front parcel on Clearwater Beach. At $250M total project cost across 86 units, the developer needs an average close of $2.9M per unit to achieve returns. With the entry point at $1.995M and 6 active listings averaging $3.1M, the math is tight — any meaningful price concessions compress margins rapidly.' },
    { metric: 'Buyer Profile Mismatch Risk', value: 'Tourism market vs. residence market', description: 'Clearwater Beach draws 4.5M+ annual visitors but has never sustained a $1,400/SF primary residence market. The buyer for a $3-4M beachfront condo is typically a second-home or seasonal resident — a fundamentally different demand profile than downtown St. Pete\'s owner-occupant base. Viceroy is testing whether this buyer exists at scale on this beach.' },
  ],

  advisoryInsights: [
    { title: 'For Buyer Advisors', content: 'The Unit 305B reduction to $1.995M ($918/SF) is the most compelling entry in the project — it prices below the 3BR tier by $700K+ and offers beachfront at a PSF competitive with delivered downtown product. Advise clients to negotiate aggressively: two price reductions, broken exclusivity, and sales team turnover are leverage points. Request a full HOA budget at the $1.40/SF rate — on a 2,173 SF unit, that is $3,042/month before mortgage, insurance, or taxes. Also verify the construction timeline: Q1 2028 delivery with vertical construction not yet started introduces schedule risk.' },
    { title: 'For Listing Advisors', content: 'If you hold beachfront listings on Clearwater Beach or Sand Key, Viceroy\'s price reductions establish a softening signal at $1,400+/SF. The 305B reduction to $918/SF provides a direct comp for any 2BR beachfront listing below $2M. For agents working downtown St. Pete inventory, Viceroy competes for the same ultra-luxury buyer but with a fundamentally different lifestyle proposition — beach vs. urban. Use the friction signals (price cuts, broken exclusivity, DOM averaging 68 days) to position downtown product as having stronger demonstrated demand.' },
  ],

  seo: {
    title: 'Viceroy Clearwater Beach | Branded Residences from $1.995M',
    description:
      'Viceroy Clearwater Beach — 86 branded resort residences. 6 active MLS listings at avg $1,198/SF. 1 pending, 5 contracted. Q1 2028 delivery. $250M by BH3 Management.',
    keywords: ['Viceroy', 'Clearwater Beach', 'branded residences', 'Gulf-front', 'resort living'],
  },
};
