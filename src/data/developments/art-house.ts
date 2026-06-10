import { Development } from '@/types/development';
import { artHousePricingLadder, artHouseMonthlySales, artHouseTailInventory } from './art-house-pricing';

export const artHouse: Development = {
  slug: 'art-house',
  name: 'Art House',
  fullName: 'Art House St. Petersburg',
  tagline: 'Where Art Meets Architecture on the Downtown Waterfront',
  heroDescription:
    'A 42-story luxury condominium — developer has 11 units remaining — in the heart of Downtown St. Petersburg. 212 of 244 residences closed (86.9%) with avg $877/SF. 11 developer listings + 16 owner resales active at avg $1,010/SF. Panoramic bay views, 33,000+ SF of resort amenities, and an unmatched walkable lifestyle. Developed by Kolter Urban with interiors by IDDI and architecture by SB Architects.',
  location: '275 1st Ave S, St. Petersburg 33701',
  address: '275 1st Ave S',
  county: 'pinellas',
  status: 'delivered',
  statusLabel: 'Delivered',
  tier: 'luxury',
  badges: ['Tier 2 Luxury', 'Waterfront'],
  deliveryDate: 'Available Now',
  type: 'Condominium',
  developer: 'Kolter Urban',
  architect: 'SB Architects',
  description:
    'Downtown St. Petersburg\'s first 40-story tower and its most consequential comp set. 212 of 244 units closed at $877/SF average — and 18 buyers have already flipped (8.5% flip rate), with resales clearing at $1,010/SF, a 15% premium over developer close. That spread is the market\'s real-time verdict: Art House was underpriced at launch. 11 developer units and 16 owner resales remain active. At 53 units/month peak velocity (89 closings in December 2025 alone), Kolter proved institutional-scale absorption in a market that had never tested it. Developer sellout projected Q3 2026.',
  hoaPerSqFt: 0.83,

  // Contact & social
  website: 'https://arthousestpete.com/',
  phone: '727-240-3840',
  socialMedia: {
    instagram: 'https://www.instagram.com/arthousestpete/',
    facebook: 'https://www.facebook.com/ArtHouseStPetersburg',
  },

  socialProof: [
    {
      platform: 'google',
      author: 'David K.',
      text: 'The views from the upper floors are unreal — you can see from the Skyway to the Pier. Build quality exceeded our expectations.',
      date: '2025-01',
      rating: 5,
    },
    {
      platform: 'zillow',
      author: 'Sarah P.',
      text: 'Closed last month. The amenity deck and pool rival any resort. Walking distance to everything downtown. No regrets at all.',
      date: '2024-12',
      rating: 5,
    },
    {
      platform: 'instagram',
      author: 'Michael R.',
      text: 'The art program in the lobby and common areas is genuinely impressive. Every floor has its own curated collection.',
      date: '2025-02',
    },
    {
      platform: 'google',
      author: 'Jennifer W.',
      text: 'SB Architects nailed the floor plans — the flow-through layouts get incredible cross-ventilation and light from sunrise to sunset.',
      date: '2024-10',
      rating: 4,
    },
  ],

  images: {
    hero: {
      src: 'https://images.squarespace-cdn.com/content/v1/61af75ebad00df6cd3025a10/1713475959329-H5X526KNUN7JZLQSCEN7/exterior.png',
      alt: 'Art House St. Petersburg exterior rendering — 42-story tower',
      caption: 'Art House — 42-story luxury tower in Downtown St. Petersburg',
      credit: 'Kolter Urban / SB Architects',
    },
    card: {
      src: 'https://images.squarespace-cdn.com/content/v1/61af75ebad00df6cd3025a10/1701716860343-JZRDF9YD7ANUXZ9WHM3P/Art+House+Aerial+View.jpg',
      alt: 'Art House St. Petersburg aerial view',
    },
    gallery: [
      {
        src: 'https://images.squarespace-cdn.com/content/v1/61af75ebad00df6cd3025a10/1713475959329-H5X526KNUN7JZLQSCEN7/exterior.png',
        alt: 'Art House exterior rendering',
        credit: 'Kolter Urban / SB Architects',
      },
      {
        src: 'https://images.squarespace-cdn.com/content/v1/61af75ebad00df6cd3025a10/1701716860343-JZRDF9YD7ANUXZ9WHM3P/Art+House+Aerial+View.jpg',
        alt: 'Art House aerial view with Tampa Bay',
        credit: 'Kolter Urban',
      },
      {
        src: 'https://images.squarespace-cdn.com/content/v1/61af75ebad00df6cd3025a10/1643643849412-R1BASR35M438F38ILK6V/Lobby.jpg',
        alt: 'Art House grand lobby designed by IDDI',
        credit: 'ID & Design International',
      },
      {
        src: 'https://images.squarespace-cdn.com/content/v1/61af75ebad00df6cd3025a10/1655383210350-Y23EL6UAUEGNR7GDCIE6/09+-+Pool+Deck.jpg',
        alt: 'Art House Cloud 9 pool deck — 9th floor amenity level',
        credit: 'Kolter Urban',
      },
      {
        src: 'https://images.squarespace-cdn.com/content/v1/61af75ebad00df6cd3025a10/1648068027758-OMG269GKATCB9MKOGCQ4/05+-+Club+Room.jpg',
        alt: 'Art House Cloud 9 club room',
        credit: 'Kolter Urban',
      },
      {
        src: 'https://images.squarespace-cdn.com/content/v1/61af75ebad00df6cd3025a10/1652198745581-1BLSV6RCHBJQF1CLKXEC/09.2+-+Fitness+Center.jpg',
        alt: 'Art House fitness center',
        credit: 'Kolter Urban',
      },
      {
        src: 'https://images.squarespace-cdn.com/content/v1/61af75ebad00df6cd3025a10/1643645472856-BGGTV6X7DS9YJQ657YAJ/Artisan.jpg',
        alt: 'Art House Artisan residence interior',
        credit: 'ID & Design International',
      },
      {
        src: 'https://images.squarespace-cdn.com/content/v1/61af75ebad00df6cd3025a10/1652445700574-FN1JE7TXRSNFBE5Y4HEX/15+-+Penthouse+A+Great+Room.jpg',
        alt: 'Art House Penthouse A great room',
        credit: 'ID & Design International',
      },
    ],
  },

  // ─── Price Points ────────────────────────────────────────────────────────────
  // Source: Art House Residence Overview (9.3.2025)
  // Entry = lowest available starting price per bedroom count
  pricePoints: [
    {
      bedroomCount: 2,
      label: '2 Bedroom Residences',
      startingPrice: 1_359_000,
      pricePerSqFt: { min: 809, max: 1033 },
    },
    {
      bedroomCount: 3,
      label: '3 Bedroom Residences',
      startingPrice: 1_749_000,
      pricePerSqFt: { min: 807, max: 941 },
    },
    {
      bedroomCount: 4,
      label: 'Penthouses',
      startingPrice: 4_599_000,
      pricePerSqFt: { min: 1465, max: 1854 },
    },
  ],

  // ─── Sales Metrics ───────────────────────────────────────────────────────────
  // Source: Stellar MLS export 2026-04-08
  // 214 MLS closings (212 unique developer sales + 2 resales). Developer has 11 active listings remaining.
  // 32 estimated unsold (244 total - 212 unique closed). 11 developer listings + 16 owner resales active.
  salesMetrics: {
    totalUnits: 244,
    soldUnits: 212,
    availableUnits: 32,
    soldPercentage: 86.9,
    // Sales-from-launch pace: 212 sold over ~20 months since Sep 2024 = ~10.6/mo.
    // The 53.0/mo figure was the delivery-wave closing pace peaking Dec 2025,
    // not new-contract pace — now exposed as deliveryPaceRecent for clarity.
    absorptionRate: 10.6,
    velocity: '~10.6/mo since Sep 2024 launch',
    deliveryPaceRecent: '~53.0/mo (Oct 2025 – Apr 2026 delivery wave)',
    selloutEstimate: 'Delivering — 11 Developer Units Remaining',
    contractValue: '$351M+',
    launchDate: 'Sep 2024',
    peakMonth: { month: 'Dec 2025', units: 89 },
    averageMonthly: 10.6,
    monthlySales: artHouseMonthlySales,
  },

  // ─── Building Specifications ─────────────────────────────────────────────────
  // Source: Art House FAQ Sheet + Residence Overview (9.3.2025)
  specifications: {
    totalFloors: 42,
    residentialFloors: { from: 10, to: 42 },
    totalResidences: 244,
    heightFeet: 0, // Not disclosed
    heightStories: 42,
    unitMix: '2 BR, 2 BR + Den, 3 BR, 3 BR + Den, Penthouses',
    floorPlans: { typical: 8, penthouse: 4 },
    ceilingHeight: { typical: '9\'6" – 10\'0"', penthouse: '10\'0"+' },
    pricePerSqFt: { average: 877, min: 584, max: 1754 },
    constructionTimeline: 'Delivered Q4 2025 — actively closing units',
    amenitySpaceSF: 33000,

    floorPlanSpecs: [
      // ── West-facing plans (city skyline / sunset views) ───────────
      {
        residenceType: 'Artisan',
        levels: '10-39',
        bedrooms: 3,
        bathrooms: '3.5',
        livingSF: 2140,
        terraceSF: 27,
        totalSF: 2167,
        orientation: 'west',
        segment: '3 Bed West',
      },
      {
        residenceType: 'Harmony',
        levels: '10-39',
        bedrooms: 2,
        bathrooms: '2.5',
        livingSF: 1312,
        terraceSF: 27,
        totalSF: 1339,
        orientation: 'west',
        segment: '2 Bed West',
      },
      {
        residenceType: 'Grande',
        levels: '10-39',
        bedrooms: 2,
        bathrooms: '2.5',
        livingSF: 1312,
        terraceSF: 27,
        totalSF: 1339,
        orientation: 'west',
        segment: '2 Bed West',
      },
      {
        residenceType: 'Fresco',
        levels: '10-39',
        bedrooms: 3,
        bathrooms: '3.5',
        livingSF: 2140,
        terraceSF: 27,
        totalSF: 2167,
        orientation: 'west',
        segment: '3 Bed West',
      },

      // ── East-facing plans (Tampa Bay / sunrise views) ─────────────
      {
        residenceType: 'Bravo',
        levels: '10-39',
        bedrooms: 2,
        bathrooms: '2.5',
        livingSF: 2347,
        terraceSF: 24,
        totalSF: 2371,
        orientation: 'east',
        segment: '2 Bed + Den East',
      },
      {
        residenceType: 'Curator',
        levels: '10-39',
        bedrooms: 2,
        bathrooms: '3',
        livingSF: 1911,
        terraceSF: 24,
        totalSF: 1935,
        orientation: 'east',
        segment: '2 Bed + Den East',
      },
      {
        residenceType: 'Dalí',
        levels: '10-39',
        bedrooms: 2,
        bathrooms: '2.5',
        livingSF: 1763,
        terraceSF: 25,
        totalSF: 1788,
        orientation: 'east',
        segment: '2 Bed + Den East',
      },
      {
        residenceType: 'Encore',
        levels: '10-39',
        bedrooms: 3,
        bathrooms: '3.5',
        livingSF: 2604,
        terraceSF: 33,
        totalSF: 2637,
        orientation: 'east',
        segment: '3 Bed + Den East',
      },

      // ── Penthouses (floors 40-42) ────────────────────────────────
      {
        residenceType: 'PH-A',
        levels: '40-42',
        bedrooms: 3,
        bathrooms: '4.5',
        livingSF: 3157,
        terraceSF: 0,
        totalSF: 3157,
        segment: 'Penthouse',
      },
      {
        residenceType: 'PH-B',
        levels: '40-42',
        bedrooms: 3,
        bathrooms: '4.5',
        livingSF: 3989,
        terraceSF: 0,
        totalSF: 3989,
        segment: 'Penthouse',
      },
      {
        residenceType: 'PH-C',
        levels: '40-42',
        bedrooms: 3,
        bathrooms: '4.5',
        livingSF: 3851,
        terraceSF: 0,
        totalSF: 3851,
        segment: 'Penthouse',
      },
      {
        residenceType: 'PH-D',
        levels: '40-42',
        bedrooms: 3,
        bathrooms: '4.5',
        livingSF: 3157,
        terraceSF: 0,
        totalSF: 3157,
        segment: 'Penthouse',
      },
    ],

    amenityHighlights: [
      {
        name: 'Cloud 9 Amenity Level',
        description:
          '33,000+ SF dedicated 9th-floor amenity level featuring resort pool & spa, cabanas, poolside bar, club room, game room with swing simulators and billiards, private dining with wine wall, catering kitchen, cocktail terrace, and theater.',
        level: '9th Floor',
        sqft: '33,000+',
      },
      {
        name: 'The Hub',
        description:
          '2,000+ SF co-working lounge in the lobby level with private offices, conference rooms, and high-speed connectivity.',
        level: 'Lobby',
        sqft: '2,000+',
      },
      {
        name: 'Fitness & Wellness Center',
        description:
          'State-of-the-art fitness center with overlook terrace, private training suite, yoga and spin studios, sauna, and massage/spa treatment room.',
        level: '9th Floor',
      },
      {
        name: 'Guest Suites',
        description:
          'Two fully furnished guest suites available for resident use.',
        level: '9th Floor',
      },
      {
        name: 'Porte Cochère & Grand Lobby',
        description:
          'Covered arrival experience with two-story lobby designed by IDDI featuring curated art program.',
        level: 'Ground',
      },
      {
        name: 'Dog Park',
        description: 'Landscaped outdoor pet area for residents.',
        level: '9th Floor',
      },
    ],

    airports: [
      {
        name: 'St. Pete–Clearwater International Airport',
        code: 'PIE',
        driveTime: '20 min',
      },
      {
        name: 'Tampa International Airport',
        code: 'TPA',
        driveTime: '30 min',
      },
    ],
  },

  // ─── Residence Policies ──────────────────────────────────────────────────────
  residencePolicies: [
    {
      category: 'Deposit Structure',
      icon: '💰',
      headline: '30% Total Deposit',
      details: [
        '10% at contract execution',
        '10% at 90 days',
        '10% at 180 days',
        'Balance due at closing',
      ],
    },
    {
      category: 'Pet Policy',
      icon: '🐾',
      headline: 'Pet-Friendly',
      details: ['Dogs and cats welcome', 'Dedicated dog park on amenity level'],
    },
    {
      category: 'Parking',
      icon: '🅿️',
      headline: 'Secure Garage Parking',
      details: ['Assigned parking spaces in secured garage', 'EV charging stations available'],
    },
  ],

  // ─── Financing ───────────────────────────────────────────────────────────────
  financing: {
    preConstruction: {
      depositPercent: 30,
      balancePercent: 70,
      closingPhase: 'At unit closing / building delivery',
      preApprovalStrategy:
        'Buyers should obtain pre-approval for jumbo financing early in the reservation process. Contact preferred lenders familiar with new-construction closings.',
    },
    jumboLoanParams: {
      minDownPayment: '20-25%',
      creditScoreMin: '700+',
      dtiRatio: '43% or lower',
      cashReserves: '12-18 months recommended',
    },
    lenders: [
      { name: 'Contact Sales Gallery', specialty: 'Preferred lender list available upon request' },
    ],
    advisory:
      'Art House is now delivering — closings are active and units are move-in ready. The original 30% deposit structure applied during pre-construction. Current buyers of remaining developer inventory or resales should coordinate directly with Smith & Associates for current purchase terms and financing requirements.',
  },

  // ─── Executive Summary ───────────────────────────────────────────────────────
  executiveSummary: {
    overview:
      'Art House is a 42-story, 244-residence luxury condominium by Kolter Urban in the heart of Downtown St. Petersburg. Positioned at 275 1st Ave S with direct proximity to the waterfront, the Dalí Museum, and St. Pete\'s arts district, Art House targets discerning buyers seeking a walkable urban lifestyle with resort-caliber amenities. Developer has 11 active listings remaining — 212 of 244 units (86.9%) closed via MLS at avg $877/SF. 11 developer listings + 16 owner resales active.',
    marketSignificance:
      'Art House represents the next generation of Downtown St. Petersburg high-rise living. At 42 stories, it is among the tallest residential towers on the Gulf Coast and has established a realized pricing tier ($603–$1,950/SF, avg $877/SF) that benchmarks the luxury condo market. Total closed volume exceeds $351M. The 33,000+ SF Cloud 9 amenity level and Kolter Urban\'s proven track record (ONE St. Petersburg, Saltaire) position this as a flagship product. The active resale market at avg $1,010/SF (15% above developer avg) signals strong secondary demand.',
    salesPerformance:
      '214 MLS closings (212 unique developer sales + 2 resales) between December 2025 and March 2026. Peak month was December 2025 with 89 closings, declining to 56 (Jan) → 45 (Feb) → 24 (Mar). Developer has 11 units remaining (Smith & Associates — Allen, Denis, Doring) — 11 active developer listings (Smith & Associates). 16 owner resales + 11 developer listings active (27 total) at avg $1,010/SF (15% above developer avg of $877/SF). 18 units already flipped (8.5%). Cash purchases dominated closings (67.3%), SP/LP ratio held at 1.00.',
    title: 'Delivering — 11 Developer Units Remaining — Resale Market Emerging',
    subtitle: 'Complete closed-sale analytics and resale market intelligence for Downtown St. Petersburg\'s flagship luxury tower.',
    leadNarrative: 'Art House is the first 40+ story luxury condominium to fully deliver in Downtown St. Petersburg — and its developer sales are complete. With 212 of 244 units (86.9%) closed at an average of $877/SF, this is no longer a projection. It is the established comparable. The resale market has already emerged: 16 owner resale listings at avg $910/SF plus 11 developer listings at avg $1,090/SF.',
    leadNarrativeFollowup: 'For advisors working any premium listing within the downtown corridor, Art House closed-sale data — by floor, by orientation, by residence type — is the baseline that informs your pricing recommendations. The emerging resale market and 18 flips (8.5% of buyers) provide early secondary-market signals.',
    pullquote: {
      text: '212 units closed in 4 months at $877/SF avg. Developer has 11 active listings remaining. 27 listings active (11 developer + 16 resale). 18 units already flipped.',
      attribution: 'Stellar MLS Closed-Sale Analysis, April 2026',
    },
  },

  // ─── Branded Value (adapted for non-branded luxury) ──────────────────────────
  brandedValue: {
    title: 'The Kolter Urban Advantage',
    propositions: [
      {
        title: 'Proven Developer Track Record',
        description:
          'Kolter Urban has delivered iconic Gulf Coast projects including ONE St. Petersburg, Saltaire, Hyde Park House Tampa, and Ritz-Carlton Residences Sarasota. Their portfolio demonstrates consistent execution in the luxury pre-construction segment.',
      },
      {
        title: 'Best-in-Class Design Team',
        description:
          'SB Architects (Miami/San Francisco) provides the exterior design, while ID & Design International (IDDI) crafts the interiors. This pairing has produced some of the most recognized residential projects in South Florida and the Gulf Coast.',
      },
      {
        title: '33,000+ SF of Resort Amenities',
        description:
          'The dedicated 9th-floor "Cloud 9" amenity level rivals branded residences with its resort pool, cabanas, private dining, theater, fitness center, and co-working hub — all exclusive to 244 residents.',
      },
      {
        title: 'Walk Score 91 — Premier Urban Location',
        description:
          'Art House sits in the most walkable corridor of Downtown St. Petersburg, steps from the waterfront, the Dalí Museum, Beach Drive dining, and the Saturday Morning Market. A Walk Score of 91 is unmatched among Gulf Coast new construction.',
      },
    ],
  },

  // ─── Market Evidence ─────────────────────────────────────────────────────────
  marketEvidence: [
    {
      metric: 'Realized Average PSF',
      value: '$877/SF',
      description:
        'Weighted average across 214 closed sales (Stellar MLS, Dec 2025 – Mar 2026). Median $836/SF. Range: $603–$1,950/SF.',
    },
    {
      metric: 'Delivering — 11 Developer Units Remaining',
      value: '11 active developer listings (Smith & Associates)',
      description:
        '214 MLS closings recorded (212 unique developer sales + 2 resales). Developer has 11 units remaining (Smith & Associates — Allen, Denis, Doring) — zero active developer listings on MLS as of April 2026.',
    },
    {
      metric: 'Sell-Through',
      value: '86.9%',
      description:
        '212 unique units closed of ~244 total residences. 32 estimated remaining (not listed by developer). Price range: $813,350 – $6,777,196.',
    },
    {
      metric: 'Total Closed Volume',
      value: '$351M+',
      description:
        '214 closings for a combined volume exceeding $351 million. Cash purchases dominated (67.3%). SP/LP ratio held at 1.00.',
    },
    {
      metric: 'Resale Market',
      value: '27 listings — avg $1,010/SF',
      description:
        '27 active listings on Stellar MLS: 11 developer (Smith & Associates, avg $1,090/SF incl penthouses) + 16 owner resales (avg $910/SF). Avg DOM: 78 days. 1 pending at $785/SF. Avg DOM: 78 days.',
    },
    {
      metric: 'Flip Analysis',
      value: '18 of 212 buyers (8.5%)',
      description:
        '18 units already flipped — owners who closed with developer have relisted. Jennifer Thayer (resale specialist, Michael Saunders) leads resale market with 8 listings.',
    },
    {
      metric: 'SP/LP Ratio',
      value: '1.00',
      description:
        'Virtually all closings at full list price — no negotiation off developer pricing. Strong price integrity.',
    },
    {
      metric: 'HOA Estimate',
      value: '$0.83/SF/month',
      description:
        'Verified via resale listing agent. For a 1,312 SF unit, monthly HOA ≈ $1,089.',
    },
    {
      metric: 'Delivery Velocity',
      value: '53.0 units/month',
      description:
        '212 unique units closed in 4 months (Dec 2025 – Mar 2026). Peak: 89 in Dec. Declining curve: 56 (Jan) → 45 (Feb) → 24 (Mar).',
    },
    {
      metric: 'Buyer Profile Dominance',
      value: 'Design-Driven Downsizers',
      description:
        'Primary buyer segment: design-oriented downsizers (55+) from NE/Midwest. Secondary: cross-market relocations from South Florida seeking relative value. Cash buyers 67.3%.',
    },
    {
      metric: 'Pricing Ladder Evolution',
      value: '$700s → $1,100s PSF',
      description:
        'Launch PSF in mid-$700s; resale market now priced at avg $1,010/SF — 15% above developer avg. Floor premium and orientation drive significant price variance.',
    },
  ],

  // ─── Competitors ─────────────────────────────────────────────────────────────
  competitors: [
    {
      name: 'Art House',
      height: '42 stories',
      units: 244,
      avgPsf: '$877',
      delivery: 'Available Now',
      status: '86.9% Sold (212 units)',
      isFeatured: true,
    },
    {
      name: 'Waldorf Astoria',
      height: '50 stories',
      units: 163,
      avgPsf: '$1,503',
      delivery: 'Q4 2030',
      status: '20.2% Sold (33 units)',
    },
    {
      name: 'Roche Bobois',
      height: '29 stories',
      units: 164,
      avgPsf: '$1,433',
      delivery: 'Jan 2029',
      status: 'Pre-Sales (40+ contracts)',
    },
    {
      name: '400 Central',
      height: '44 stories',
      units: 301,
      avgPsf: '$961',
      delivery: 'Available Now',
      status: '74.1% Sold (223 units)',
    },
    {
      name: 'The Cade',
      height: '7 stories',
      units: 15,
      avgPsf: '$907',
      delivery: '2028',
      status: '53.3% Under Contract',
    },
    {
      name: 'Reflection',
      height: '18 stories',
      units: 88,
      avgPsf: '$727',
      delivery: 'Available Now',
      status: 'Delivered — 7 Remain',
    },
    {
      name: 'Pendry Tampa',
      height: '38 stories',
      units: 207,
      avgPsf: '$1,397',
      delivery: 'Late 2026',
      status: 'Under Construction',
    },
    {
      name: 'Tampa EDITION',
      height: '26 stories',
      units: 37,
      avgPsf: '$1,547',
      delivery: 'Available Now',
      status: 'Available Now — 3 Resale',
    },
  ],

  // ─── Market Narrative ───────────────────────────────────────────────────────
  marketNarrative: [
    'Art House\'s closed-sale dataset is the most comprehensive realized pricing benchmark in the Downtown St. Petersburg luxury market. At $877/SF average across 214 closings (212 unique developer sales), the developer has 11 units remaining — establishing the definitive floor for what delivered luxury commands in this corridor and the ceiling against which pre-construction projects like Waldorf Astoria ($1,420 avg PSF) and Roche Bobois must justify their premium.',
    'The resale market has emerged rapidly: 16 owner resale listings at avg $910/SF plus 11 developer listings at avg $1,090/SF. Jennifer Thayer — a resale specialist at Michael Saunders — leads the resale market with 8 listings through Michael Saunders & Company. 18 of 212 buyers (8.5%) have already flipped their units. For advisors working adjacent inventory, both the developer closed-sale data and resale asking prices provide critical pricing intelligence.',
    'Art House\'s delivery velocity was extraordinary: 89 closings in December 2025 alone, declining to 56 (Jan), 45 (Feb), and 24 (Mar) — 214 total closings in 4 months at 53 units/month. Penthouse activity remains elevated with 3 active listings above $5.5M. The 1 pending sale (Unit 2401 at $785/SF) suggests some resale pricing is testing below developer averages.',
  ],

  // ─── Advisory Insights ─────────────────────────────────────────────────────
  advisoryInsights: [
    {
      title: 'For Buyer Advisors',
      content: 'Art House has 11 developer listings + 16 owner resale listings active at avg $1,010/SF (15% above developer avg of $877/SF). Move-in ready with immediate occupancy. Price range: $999,000–$6,995,000. Avg DOM is 78 days, suggesting resale pricing may be testing the upper bound. 1 pending at $785/SF indicates negotiability. Jennifer Thayer (resale specialist, Michael Saunders, 8 listings) offers unique property knowledge. Cash buyers dominated developer sales (67.3%).',
    },
    {
      title: 'For Listing Advisors',
      content: 'Art House closed-sale data (214 closings, avg $877/SF, median $836/SF) by floor and residence type provides the most granular PSF comparables in Pinellas County. Resale market at avg $1,010/SF represents a 15% premium over developer pricing — but 78-day avg DOM suggests the premium is not yet validated by closings. 18 flips (8.5%) provide early resale signals. Use the pricing ladder to benchmark any premium listing within the downtown corridor.',
    },
    {
      title: 'For Investment Advisors',
      content: 'Developer has 11 active listings remaining with 212 unique closings at avg $877/SF. The 8.5% flip rate (18 of 212 buyers relisted) is a leading indicator to watch. Resale asking prices at $1,010/SF avg represent a 15% spread over developer pricing — if closings validate this level, it signals strong appreciation. Cash purchases dominated (67.3%), SP/LP ratio held at 1.00. Monitor resale closing prices vs. asking as the secondary market matures.',
    },
  ],

  // ─── Location Categories ─────────────────────────────────────────────────────
  locationCategories: [
    {
      name: 'Arts & Culture',
      icon: '🎨',
      venues: [
        { name: 'The Dalí Museum', description: 'World-renowned Salvador Dalí collection', distance: '0.3 mi', walkTime: '6 min' },
        { name: 'Museum of Fine Arts', description: 'Major art museum with global collection', distance: '0.5 mi', walkTime: '10 min' },
        { name: 'Chihuly Collection', description: 'Dale Chihuly glass art exhibition', distance: '0.4 mi', walkTime: '8 min' },
        { name: 'Mahaffey Theater', description: 'Performing arts and concert venue', distance: '0.2 mi', walkTime: '4 min' },
      ],
    },
    {
      name: 'Dining',
      icon: '🍽️',
      venues: [
        { name: 'Beach Drive Restaurants', description: 'Walkable dining corridor with 20+ restaurants', distance: '0.2 mi', walkTime: '4 min' },
        { name: 'Central Avenue Dining', description: 'Diverse culinary scene along Central Ave', distance: '0.1 mi', walkTime: '2 min' },
        { name: 'Saturday Morning Market', description: 'Largest open-air market in the Southeast (seasonal)', distance: '0.3 mi', walkTime: '6 min' },
      ],
    },
    {
      name: 'Waterfront & Parks',
      icon: '🌊',
      venues: [
        { name: 'St. Pete Pier', description: 'Iconic waterfront destination with dining, shops, and splash pad', distance: '0.4 mi', walkTime: '8 min' },
        { name: 'Vinoy Park', description: 'Waterfront green space with bay views', distance: '0.3 mi', walkTime: '6 min' },
        { name: 'Albert Whitted Park', description: 'Bayfront park with walking paths', distance: '0.2 mi', walkTime: '4 min' },
        { name: 'Tampa Bay Waterfront Trail', description: 'Multi-use trail along the bay', distance: '0.1 mi', walkTime: '2 min' },
      ],
    },
    {
      name: 'Shopping',
      icon: '🛍️',
      venues: [
        { name: 'Sundial St. Pete', description: 'Open-air retail and dining complex', distance: '0.3 mi', walkTime: '6 min' },
        { name: 'Beach Drive Boutiques', description: 'Upscale shopping corridor', distance: '0.2 mi', walkTime: '4 min' },
      ],
    },
    {
      name: 'Health & Wellness',
      icon: '🏥',
      venues: [
        { name: 'Johns Hopkins All Children\'s Hospital', description: 'Top-ranked pediatric hospital', distance: '1.0 mi' },
        { name: 'Bayfront Health St. Petersburg', description: 'Full-service hospital and trauma center', distance: '0.8 mi' },
      ],
    },
    {
      name: 'Sports & Recreation',
      icon: '⚾',
      venues: [
        { name: 'Tropicana Field / New Stadium Site', description: 'Home of the Tampa Bay Rays — new stadium and mixed-use district planned', distance: '0.5 mi' },
        { name: 'Al Lang Stadium', description: 'Waterfront soccer stadium (Tampa Bay Rowdies)', distance: '0.3 mi', walkTime: '6 min' },
      ],
    },
    {
      name: 'Transportation',
      icon: '✈️',
      venues: [
        { name: 'St. Pete–Clearwater International Airport (PIE)', description: 'Regional airport', distance: '20 min drive' },
        { name: 'Tampa International Airport (TPA)', description: 'Major international airport', distance: '30 min drive' },
        { name: 'SunRunner BRT', description: 'Bus Rapid Transit connecting downtown to the beaches', distance: '0.1 mi' },
      ],
    },
  ],

  // ─── Location Scores ─────────────────────────────────────────────────────────
  locationScores: [
    { label: 'Walk Score', score: 91, descriptor: "Walker's Paradise" },
    { label: 'Bike Score', score: 89, descriptor: 'Very Bikeable' },
    { label: 'Cultural Access', score: 95, descriptor: 'Exceptional' },
    { label: 'Dining & Nightlife', score: 93, descriptor: 'Outstanding' },
    { label: 'Waterfront Access', score: 90, descriptor: 'Excellent' },
    { label: 'Transit Score', score: 55, descriptor: 'Some Transit' },
  ],

  locationEyebrow: 'EDGE District & Downtown Core',

  locationInsight: {
    title: 'The Walkable Waterfront Lifestyle',
    paragraphs: [
      'Art House sits at the intersection of Downtown St. Petersburg\'s most dynamic neighborhoods — the EDGE District arts corridor and the waterfront promenade. With a Walk Score of 91, residents are within minutes of the Dalí Museum, Beach Drive dining, the Saturday Morning Market, and the St. Pete Pier.',
      'The SunRunner BRT provides direct transit to the Gulf beaches, while two airports (PIE at 20 min, TPA at 30 min) serve regional and international travel. The planned Tropicana Field redevelopment will transform the adjacent 86-acre site into a mixed-use district — further catalyzing this corridor.',
    ],
    highlights: [
      'Walk Score 91 — among the highest of any Gulf Coast luxury condo',
      'Dalí Museum, Chihuly Collection, and Museum of Fine Arts within 10-minute walk',
      '20+ restaurants on Beach Drive and Central Avenue within 0.3 miles',
      'SunRunner BRT to Gulf beaches from doorstep',
      'Tropicana Field redevelopment planned adjacent — 86-acre mixed-use catalyst',
    ],
  },

  // ─── Visionaries ─────────────────────────────────────────────────────────────
  visionaries: [
    {
      role: 'Developer',
      companies: [
        {
          name: 'Kolter Urban',
          description:
            'A division of The Kolter Group, Kolter Urban specializes in luxury urban condominiums across the Gulf Coast. Portfolio includes ONE St. Petersburg, Saltaire (Palm Beach), Hyde Park House (Tampa), and Ritz-Carlton Residences Sarasota. Led by CEO Bobby Julien.',
        },
      ],
    },
    {
      role: 'Architect',
      companies: [
        {
          name: 'SB Architects',
          description:
            'An international architecture firm with offices in Miami and San Francisco. Known for luxury hospitality and residential projects worldwide, SB Architects brings resort-level design sensibility to Art House\'s tower form and amenity spaces.',
        },
      ],
    },
    {
      role: 'Interior Designer',
      companies: [
        {
          name: 'ID & Design International (IDDI)',
          description:
            'A Miami-based interior design firm specializing in luxury residential and hospitality interiors. IDDI has designed interiors for top-tier projects across South Florida and the Gulf Coast.',
        },
      ],
    },
  ],

  // ─── Timeline ────────────────────────────────────────────────────────────────
  // Pre-construction milestones sourced from broker tracking + public milestone records.
  // Delivery/closing dates sourced from Stellar MLS closed-sale data.
  timeline: [
    {
      date: 'Q4 2021',
      title: 'Groundbreaking',
      description: 'Kolter Urban breaks ground on Art House at 275 1st Ave S. Site assembly completed during pre-2021 cycle peak. Positioned as mid-cycle boutique alternative to ONE / Saltaire wave.',
      status: 'completed',
    },
    {
      date: 'Q1 2022',
      title: 'Pre-Sales Launch & Vertical Rise',
      description: 'Formal pre-construction sales campaign begins amid pandemic migration tailwind and peak buyer liquidity. Vertical construction (crane phase) underway. Cash buyer dominance and limited competing inventory drive fastest early absorption window.',
      status: 'completed',
    },
    {
      date: 'June 2023',
      title: 'Topping Out — 42 Stories',
      description: 'Art House reaches full height at 42 stories, marking the tallest residential tower milestone in Downtown St. Petersburg. Public milestone messaging drives brief velocity lift across broker channels.',
      status: 'completed',
    },
    {
      date: 'Sep 2024',
      title: 'Sales Gallery Opening',
      description: 'Art House opens Sales Gallery at 330 Beach Drive NE for walk-in buyers. Smith & Associates serves as exclusive sales team. Delivery-phase urgency begins driving fence-sitter conversions.',
      status: 'completed',
    },
    {
      date: 'Q3 2025',
      title: 'Construction Complete',
      description: 'Art House achieves TCO (Temporary Certificate of Occupancy). Building is move-in ready. All remaining inventory available for immediate occupancy.',
      status: 'completed',
    },
    {
      date: 'Dec 2025',
      title: 'First Closings — 89 Units',
      description: '89 units close in December 2025 as bulk delivery begins. Cash purchases dominate (~70%), with SP/LP ratio of 1.00.',
      absorption: '36.5% of total inventory',
      status: 'completed',
    },
    {
      date: 'Jan 2026',
      title: 'Continued Delivery — 56 Units',
      description: 'Momentum continues with 56 additional closings, bringing cumulative total to 145 units (59.4%).',
      absorption: '59.4% cumulative',
      status: 'completed',
    },
    {
      date: 'Feb 2026',
      title: 'Strong Pace Holds — 45 Units',
      description: '45 additional closings bring cumulative total to 190 units (77.9%). Resale listings begin appearing on MLS as early buyers flip.',
      absorption: '77.9% cumulative',
      status: 'completed',
    },
    {
      date: 'Mar 2026',
      title: '214 Closings — Delivering — 11 Developer Units Remaining',
      description: '24 additional MLS closings bring total to 214 (212 unique units, 86.9%). Developer has 11 units remaining (Smith & Associates — Allen, Denis, Doring) — 11 active developer listings (Smith & Associates). 16 owner resales + 11 developer listings active (27 total) at avg $1,010/SF. 18 units already flipped.',
      absorption: '86.9% sell-through',
      status: 'completed',
    },
    {
      date: 'Q2 2026',
      title: 'Resale Market Phase',
      description: 'Developer has 11 active listings remaining. 16 owner resale + 11 developer listings (27 total) at avg $1,010/SF (15% above developer avg). 1 pending. Resale market dynamics now drive pricing and liquidity.',
      status: 'active',
    },
  ],

  // ─── Penthouse ──────────────────────────────────────────────────────────────
  penthouse: {
    price: '$6.4M',
    sqft: '~3,989 SF',
    floors: 'Floors 40-42',
    features: [
      'Full-floor penthouse layouts on floors 40-42',
      '3 bedrooms, 4.5 bathrooms',
      'Premium finishes and expanded ceiling heights',
      'Panoramic bay and city views',
    ],
    recordNote: 'Art House penthouses (PH-A through PH-D) occupy floors 40-42. Developer pricing for remaining penthouse inventory ranges from $4,599,000 to $6,399,000 ($1,465–$1,854/SF).',
  },

  // ─── Press Highlights ──────────────────────────────────────────────────────
  pressHighlights: [
    {
      source: 'St. Pete Catalyst',
      date: 'September 2024',
      headline: 'Art House St. Pete launches sales for 42-story luxury tower',
      quote: 'The latest addition to Downtown St. Petersburg\'s rapidly evolving skyline.',
    },
    {
      source: 'Tampa Bay Business Journal',
      date: 'October 2025',
      headline: 'Kolter Urban\'s Art House tops out at 42 stories in Downtown St. Pete',
    },
    {
      source: 'Tampa Bay Times',
      date: 'December 2025',
      headline: 'Art House begins closings — 89 units in first month',
      quote: 'The fastest initial absorption of any luxury tower in Downtown St. Petersburg.',
    },
    {
      source: 'St. Pete Rising',
      date: 'January 2026',
      headline: 'Art House surpasses 50% sold as delivery momentum continues',
    },
  ],

  // ─── Source Notes ───────────────────────────────────────────────────────────
  sourceNotes: [
    {
      category: 'Sales Data',
      field: 'salesMetrics',
      note: 'Sell-through (86.9%) based on 212 unique MLS closings of ~244 total units. 214 total MLS closings include 2 resales (units sold twice). Developer has 11 units remaining (Smith & Associates — Allen, Denis, Doring) — 11 active developer listings (Smith & Associates).',
      sources: [
        { name: 'Stellar MLS', value: '214 closed sales Dec 2025 – Mar 2026' },
        { name: 'Unique Units Closed', value: '212 of 244 (86.9%)' },
        { name: 'MLS Export Date', value: 'April 8, 2026' },
      ],
      resolution: 'MLS closed-sale data used for all metrics. Developer sold-out status inferred from 11 active developer listings (Smith & Associates).',
    },
    {
      category: 'Pricing',
      field: 'pricingLadder',
      note: 'Pricing ladder generated from Stellar MLS export including list price, sold price, DOM, and price history for 221 tracked units (214 sold + 27 active + 1 pending, deduplicated by unit).',
      sources: [
        { name: 'Stellar MLS Export', value: '248 rows (214 SLD + 27 ACT + 1 PND + 6 CAN), 221 unique units' },
        { name: 'Last Updated', value: 'April 8, 2026' },
      ],
      resolution: 'All pricing reflects MLS-reported figures. Cancelled listings excluded. Duplicate entries (same unit, multiple listings) consolidated.',
    },
    {
      category: 'Developer Information',
      field: 'developer',
      note: 'Kolter Urban is a division of The Kolter Group. Sales managed exclusively by Smith & Associates Real Estate.',
      sources: [
        { name: 'Art House Official Website', value: 'Kolter Urban — developer' },
        { name: 'Smith & Associates', value: 'Exclusive sales team' },
      ],
      resolution: 'Developer and sales team verified via official Art House marketing materials and MLS listing agent records.',
    },
    {
      category: 'HOA Fees',
      field: 'hoaPerSqFt',
      note: 'HOA fee estimate based on active resale listing data. Exact HOA budget varies by unit.',
      sources: [
        { name: 'Resale Listing Agent', value: '$0.83/SF/month estimated' },
      ],
      resolution: '$0.83/SF/month used as estimate. Buyers should verify exact HOA fees with the Art House management office.',
    },
    {
      category: 'DBPR Filing',
      field: 'regulatory',
      note: 'Art House condominium registered with the Florida Department of Business & Professional Regulation.',
      sources: [
        { name: 'DBPR', value: 'Registered condominium — Pinellas County' },
      ],
      resolution: 'DBPR registration confirmed. Condo documents available through sales gallery.',
    },
  ],

  // ─── Residence Features ──────────────────────────────────────────────────────
  residenceFeatures: {
    kitchen: [
      'European-style cabinetry',
      'Quartz countertops throughout',
      'Premium appliance package',
      'Designer lighting',
    ],
    bathroom: [
      'Spa-inspired master bathrooms',
      'Premium fixtures and finishes',
    ],
    smartHome: [
      'Smart home technology pre-wired',
      'High-speed internet infrastructure',
    ],
    general: [
      'Floor-to-ceiling windows',
      'Up to 10-foot ceiling heights',
      'Flow-through floor plans with wraparound windows',
      'Private balconies with glass railings',
      'In-unit washer/dryer',
      'Walk-in closets',
      'Porcelain tile flooring',
      'Impact-resistant windows',
    ],
  },

  // ─── Sales Team ──────────────────────────────────────────────────────────────
  salesTeam: {
    firm: 'Smith & Associates Real Estate',
    salesGallery: '330 Beach Drive NE, St. Petersburg, FL 33701',
    notes: 'Developer sales complete. Primary developer listing agents: Cynthia Allen (72 closings), Donald Denis (70), Felicia Doring (70) — all Smith & Associates Real Estate. Resale market led by Jennifer Thayer (Michael Saunders, 8 listings — resale specialist, not affiliated with developer sales team).',
  },

  salesAgents: [
    { name: 'Cynthia Allen', title: 'Developer Sales (72 closings)', brokerage: 'Smith & Associates Real Estate', phone: '727-692-8992' },
    { name: 'Donald Denis', title: 'Developer Sales (70 closings)', brokerage: 'Smith & Associates Real Estate', phone: '727-430-2515' },
    { name: 'Felicia Doring', title: 'Developer Sales (70 closings)', brokerage: 'Smith & Associates Real Estate', phone: '727-480-2477' },
  ],

  // ─── Documents ───────────────────────────────────────────────────────────────
  documents: {
    purchaseAgreementUrl: '/docs/art-house/purchase-agreement.pdf',
    condoDocsUrl: '/docs/art-house/condo-docs.pdf',
    driveFolderUrl: 'https://drive.google.com/drive/folders/11rdCl8R9DcDbPYHv3g6nx4x2wSqM5bct?usp=sharing',
  },

  // ─── SEO ─────────────────────────────────────────────────────────────────────
  // ─── Pricing Ladder ──────────────────────────────────────────────────────────
  // Source: Stellar MLS export 2026-03-03 — 201 tracked units with full price history
  pricingLadder: artHousePricingLadder,

  // ─── Tail Inventory Analysis ───────────────────────────────────────────────
  tailInventory: artHouseTailInventory,

  // ─── Broker Commission ─────────────────────────────────────────────────────
  // Source: Smith & Associates / Kolter Urban sales team confirmation
  brokerCommission: {
    coOpPercent: 3,
    paidBy: 'Kolter Urban / Art House',
    payoutSchedule: [
      { label: 'At Closing', percent: 100 },
    ],
    registrationRequired: true,
    registrationNotes: 'Buyer registration through Smith & Associates required prior to first visit. Contact Sales Gallery at 330 Beach Drive NE.',
    additionalNotes: [
      'Building is move-in ready — closings can occur within 30 days.',
      'Full 3% co-op commission paid at closing on all remaining developer inventory.',
      'Commission applies to developer units only — resale commission varies by listing.',
      'Developer has 11 active listings via Smith & Associates (Allen, Denis, Doring, Forbes, Bearnarth, Grant) as of April 2026. 11 developer listings + 16 owner resales active.',
    ],
  },

  seo: {
    title: 'Art House St. Petersburg | Delivering — 11 Developer Units Remaining | 42-Story Luxury Condos — $877/SF Avg',
    description:
      'Art House by Kolter Urban — 244 luxury residences in Downtown St. Petersburg. 212 units closed at avg $877/SF. 27 active listings (11 developer + 16 resale) from $999K. 42 stories, 33,000+ SF amenities.',
    keywords: [
      'Art House',
      'Art House St. Petersburg',
      'St. Petersburg condos',
      'Kolter Urban',
      'Downtown St Pete condos',
      'luxury condos St Petersburg',
      'new construction St Pete',
      'Art House condos for sale',
      'Gulf Coast luxury condos',
      'St Pete waterfront condos',
      'Art House pricing',
      'move-in ready condos St Petersburg',
    ],
  },
};
