import type { Development } from '@/types/development';
import type { DevelopmentProfile } from '@/types/development-profile';
import { fourHundredCentralPricingLadder, fourHundredCentralMonthlySales, fourHundredCentralTailInventory } from './400-central-pricing';

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// RESIDENCES AT 400 CENTRAL — Full Development
// Downtown St. Petersburg | 301 Condominiums | 44 Stories
// Developer: Red Apple Group | Architect: Arquitectonica
// Status: Delivering (move-in ready)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export const residencesAt400CentralDevelopment: Development = {
  slug: '400-central',
  name: 'Residences at 400 Central',
  fullName: 'Residences at 400 Central',
  tagline: 'Iconic Downtown Living at the Heart of St. Petersburg',
  heroDescription:
    'Move-in ready condominiums in downtown St. Petersburg presenting immediate inventory opportunity. Current 2BR entry around $1.0M targets professional couples and downsizers — the most attainable downtown new construction relative to Art House and Waldorf pre-sales ($1.5M+). The delivery wave continues: 49 closings Mar–May 2026 averaged $1,086/SF; 29 active MLS listings (Jun 2026, avg ask ~$1,020/SF).',
  location: '400 Central Ave., St. Petersburg 33701',
  address: '400 Central Ave.',
  county: 'pinellas',
  status: 'delivered',
  statusLabel: 'Delivered',
  tier: 'luxury',
  badges: ['Tier 2 Luxury'],
  deliveryDate: 'Available Now',
  type: 'Condominium',
  developer: 'Red Apple Group',
  architect: 'Arquitectonica',
  description:
    'The largest delivered condo inventory in downtown St. Petersburg — 301 units across 44 stories — and the only building with enough transaction volume to generate a statistically meaningful comp set. 74.1% sold (223 of 301 parcels per PCPAO) at $961/SF with simultaneous developer and resale channels active, giving buyers and agents the clearest read on where mid-luxury product actually clears. If you want to know the real market, look at 400 Central\'s closing data.',

  hoaPerSqFt: 0.73, // $0.73/SF/month per Brian

  // ─── Contact & Social ─────────────────────────────────────────────────────
  website: 'https://www.residences400central.com/',
  phone: '727-914-5422',
  socialMedia: {
    instagram: 'https://www.instagram.com/residences400central/',
    facebook: 'https://www.facebook.com/residences400central/',
  },
  socialProof: [
    {
      platform: 'google' as const,
      author: 'Rachel T.',
      text: 'Move-in ready downtown with Central Ave at your doorstep. The Sky Lounge views are worth every penny. Best value in new construction St. Pete.',
      date: '2026',
      rating: 5,
    },
  ],

  // ─── Documents ─────────────────────────────────────────────────────────────
  documents: {
    purchaseAgreementUrl: '/docs/400-central/purchase-agreement.pdf',
    condoDocsUrl: '/docs/400-central/condo-docs.pdf',
    driveFolderUrl:
      'https://drive.google.com/drive/folders/11rdCl8R9DcDbPYHv3g6nx4x2wSqM5bct?usp=sharing',
  },

  // ─── Pricing Ladder (MLS data) ─────────────────────────────────────────────
  pricingLadder: fourHundredCentralPricingLadder,
  tailInventory: fourHundredCentralTailInventory,

  // ─── Images ──────────────────────────────────────────────────────────────
  images: {
    hero: {
      src: 'https://media.stpetecatalyst.com/uploads/2021/10/400-Central_Hero_ObservationF.jpg',
      alt: 'Residences at 400 Central — 44-story tower in Downtown St. Petersburg',
    },
    card: {
      src: 'https://media.stpetecatalyst.com/uploads/2021/10/400Central_HeroDayF.jpg',
      alt: 'Residences at 400 Central',
    },
    gallery: [
      { src: 'https://media.stpetecatalyst.com/uploads/2021/10/400-Central_Hero-DuskF.jpg', alt: '400 Central dusk exterior', caption: '44-story tower at dusk in Downtown St. Petersburg' },
      { src: 'https://media.stpetecatalyst.com/uploads/2021/10/400Central_SkyLounge_ObservationDeckF.jpg', alt: 'Sky Lounge observation deck', caption: 'Sky Lounge and observation deck' },
      { src: 'https://images.squarespace-cdn.com/content/v1/55467dc6e4b0ebaf8fab24a0/14fc1f2c-5649-4099-a179-38c4beb2156f/AB3_400+Central-15.jpg', alt: '400 Central rising above downtown', caption: 'Tower rising above the downtown St. Petersburg skyline' },
      { src: 'https://images.squarespace-cdn.com/content/v1/55467dc6e4b0ebaf8fab24a0/75b9bc94-1e85-4553-8b18-50da09f7da7e/AB3_400+Central-2.jpg', alt: '400 Central exterior establishing shot', caption: 'Street-level view from Central Avenue' },
      { src: 'https://www.residences400central.com/wp-content/uploads/2021/09/400Central_77_Living-Room-560x380.webp', alt: 'Living room rendering', caption: 'Living room with panoramic bay views' },
      { src: 'https://www.residences400central.com/wp-content/uploads/2020/08/47-Plan-20-Kitchen-R03HR-560x380.webp', alt: 'Kitchen rendering', caption: 'Chef\'s kitchen with premium finishes' },
      { src: 'https://www.residences400central.com/wp-content/uploads/2021/09/27_400-Central-Plan-18-Owner-Bedroom-560x380.webp', alt: 'Owner bedroom', caption: 'Owner\'s suite with floor-to-ceiling views' },
      { src: 'https://www.residences400central.com/wp-content/uploads/2021/09/400Central_OwnersBathroom_R05HR-560x380.webp', alt: 'Owner bathroom', caption: 'Spa-inspired owner\'s bathroom' },
      { src: 'https://www.residences400central.com/wp-content/uploads/2021/09/400Central_TropicalOasisPool-560x380.webp', alt: 'Pool amenity deck', caption: 'Tropical oasis pool deck' },
      { src: 'https://media.stpetecatalyst.com/uploads/2021/10/400Central_BalconyViewF.jpg', alt: 'Penthouse balcony view', caption: 'Penthouse balcony overlooking Tampa Bay' },
      { src: 'https://www.residences400central.com/wp-content/uploads/2021/09/400-Central_KitchenPenthouse-560x380.webp', alt: 'Penthouse kitchen', caption: 'Penthouse kitchen with custom cabinetry' },
      { src: 'https://s41951.pcdn.co/wp-content/uploads/2024/04/04-400-Central-Zoom-In-Observation-Deck_R04.png', alt: 'Observation deck detail', caption: 'Observation deck — designed by Vincent Celano' },
    ],
  },

  // ─── Broker Commission ───────────────────────────────────────────────────
  brokerCommission: {
    coOpPercent: 3,
    paidBy: 'Red Apple Group',
    payoutSchedule: [
      { label: 'At Closing', percent: 100 },
    ],
    registrationRequired: false,
  },

  salesTeam: {
    firm: 'Michael Saunders & Company',
    leadAgent: 'Marijke White',
    salesGallery: '400 Central Ave, St. Petersburg, FL 33701 (on-site)',
  },
  salesAgents: [
    { name: 'Marijke White', title: 'Lead Sales Agent', brokerage: 'Michael Saunders & Company', phone: '727-501-3294' },
    { name: 'Andrew Warren', title: 'Sales Agent', brokerage: 'Michael Saunders & Company', phone: '727-501-3294' },
    { name: 'Tina Borges-Druth', title: 'Sales Agent', brokerage: 'Michael Saunders & Company', phone: '727-501-3294' },
    { name: 'Bennett Eppinger', title: 'Sales Agent', brokerage: 'Michael Saunders & Company', phone: '727-501-3294' },
  ],
  // Non-developer resale agents also active: Paul Simon (Coastal Properties), Mac Roopani, Jing Nimchuk (IVY United)

  // ─── Price Points ─────────────────────────────────────────────────────────
  pricePoints: [
    {
      bedroomCount: 2,
      label: '2 Bedroom',
      startingPrice: 807000,
      pricePerSqFt: { min: 585, max: 1032 }, // MLS closed range for 2BR (1,277-1,380 SF)
    },
    {
      bedroomCount: 3,
      label: '3 Bedroom',
      startingPrice: 1387000,
      pricePerSqFt: { min: 820, max: 1366 }, // MLS closed range for 3BR (1,732-2,658 SF)
    },
    {
      bedroomCount: 4,
      label: '4 Bedroom / Penthouse',
      startingPrice: 3391000,
      pricePerSqFt: { min: 771, max: 1418 }, // MLS closed range for 4BR (3,927-4,399 SF)
    },
  ],

  // ─── Sales Metrics ─────────────────────────────────────────────────────────
  // Source: PCPAO ownership records (2026-04-22) + Stellar MLS agent single-line
  // PCPAO: 301 residential unit parcels. 223 held by third parties (74.1%
  // sell-through). 78 retained by developer CATS Red Apple St Pete LLC
  // (37 delivered+unsold + 41 upper-floor pre-CO parcels).
  salesMetrics: {
    totalUnits: 301,
    soldUnits: 223,
    availableUnits: 78,
    soldPercentage: 74.1,
    // Sales-from-launch pace: 223 sold over ~48 months since 2022 launch = ~4.6/mo.
    // The 43.6/mo figure was the Dec 2025–Apr 2026 delivery-wave closing pace, not
    // new-contract pace — now exposed as deliveryPaceRecent for clarity.
    absorptionRate: 4.6,
    velocity: '~4.6/mo since 2022 launch',
    deliveryPaceRecent: '~43.6/mo (Dec 2025 – Apr 2026 delivery wave)',
    selloutEstimate: 'TBD',
    // Contract value estimate: 223 PCPAO-verified sold units × median MLS
    // developer-close price ($1.13M from 57 closings Dec 2025–Apr 2026) = $252M.
    // Conservative lower bound since some upper-floor units priced higher.
    contractValue: '$252M+ (est.)',
    launchDate: '2022',
    peakMonth: { month: 'Feb 2026', units: 79 },
    averageMonthly: 4.6,
    monthlySales: fourHundredCentralMonthlySales,
  },

  // ─── Building Specifications ───────────────────────────────────────────────
  specifications: {
    totalFloors: 44,
    residentialFloors: { from: 3, to: 44 },
    totalResidences: 301,
    heightFeet: 520,
    heightStories: 44,
    unitMix: '1BR to 3BR',
    floorPlans: { typical: 9, penthouse: 0 },
    ceilingHeight: { typical: "9'6\"" },
    pricePerSqFt: { average: 961, min: 585, max: 1418 },
    amenityHighlights: [
      {
        name: 'Rooftop Pool Deck',
        description:
          'Elevated pool and sun deck with city skyline and waterfront views.',
        level: '12th Floor',
      },
      {
        name: 'Fitness Center',
        description:
          'State-of-the-art fitness facility with cardio and strength equipment.',
        level: 'Ground Level',
      },
      {
        name: 'Resident Lounge',
        description:
          'Private lounge with kitchen and entertainment area for resident gatherings.',
        level: 'Ground Level',
      },
      {
        name: 'Covered Parking',
        description:
          'Structured parking garage with secure resident access.',
        level: 'Below Grade',
      },
    ],
    // ── Floor Plan Specs (derived from MLS Heated Area data) ─────────
    // Positions 01-09 per floor. Upper floors have larger variants for 03/05/06.
    // Brian: Replace "Type XX" with named residence types from developer docs.
    floorPlanSpecs: [
      // ── Standard plans (lower/mid floors ~5-19) ──────────────────
      {
        residenceType: 'Type 01',
        levels: '5-42',
        bedrooms: 3,
        bathrooms: '3.5',
        livingSF: 2658,
        terraceSF: 0,
        totalSF: 2658,
        segment: '3 Bed',
      },
      {
        residenceType: 'Type 02',
        levels: '5-42',
        bedrooms: 3,
        bathrooms: '2.5',
        livingSF: 1762,
        terraceSF: 0,
        totalSF: 1762,
        segment: '3 Bed',
      },
      {
        residenceType: 'Type 03',
        levels: '5-25',
        bedrooms: 2,
        bathrooms: '2.5',
        livingSF: 1358,
        terraceSF: 0,
        totalSF: 1358,
        segment: '2 Bed',
      },
      {
        residenceType: 'Type 04',
        levels: '5-42',
        bedrooms: 2,
        bathrooms: '2.5',
        livingSF: 1311,
        terraceSF: 0,
        totalSF: 1311,
        segment: '2 Bed',
      },
      {
        residenceType: 'Type 05',
        levels: '5-21',
        bedrooms: 3,
        bathrooms: '3',
        livingSF: 1732,
        terraceSF: 0,
        totalSF: 1732,
        segment: '3 Bed',
      },
      {
        residenceType: 'Type 06',
        levels: '5-19',
        bedrooms: 2,
        bathrooms: '2.5',
        livingSF: 1277,
        terraceSF: 0,
        totalSF: 1277,
        segment: '2 Bed',
      },
      {
        residenceType: 'Type 07',
        levels: '5-42',
        bedrooms: 3,
        bathrooms: '3.5',
        livingSF: 2606,
        terraceSF: 0,
        totalSF: 2606,
        segment: '3 Bed',
      },
      {
        residenceType: 'Type 08',
        levels: '5-42',
        bedrooms: 2,
        bathrooms: '2.5',
        livingSF: 1348,
        terraceSF: 0,
        totalSF: 1348,
        segment: '2 Bed',
      },
      {
        residenceType: 'Type 09',
        levels: '5-42',
        bedrooms: 2,
        bathrooms: '2.5',
        livingSF: 1380,
        terraceSF: 0,
        totalSF: 1380,
        segment: '2 Bed',
      },
      // ── Upper-floor variants (tower step-back reconfiguration) ───
      {
        residenceType: 'Type 03 Upper',
        levels: '26-42',
        bedrooms: 3,
        bathrooms: '3',
        livingSF: 1782,
        terraceSF: 0,
        totalSF: 1782,
        segment: '3 Bed',
      },
      {
        residenceType: 'Type 05 Upper',
        levels: '22-42',
        bedrooms: 3,
        bathrooms: '3',
        livingSF: 1921,
        terraceSF: 0,
        totalSF: 1921,
        segment: '3 Bed',
      },
      {
        residenceType: 'Type 06 Upper',
        levels: '20-42',
        bedrooms: 3,
        bathrooms: '3',
        livingSF: 1948,
        terraceSF: 0,
        totalSF: 1948,
        segment: '3 Bed',
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

  // ─── Residence Policies ────────────────────────────────────────────────────
  residencePolicies: [
    {
      category: 'Rental Policy',
      icon: '🏠',
      headline: 'Rentals Permitted',
      details: [
        'Owner rentals permitted with condo association approval',
        '6-month minimum lease period (MLS broker data confirmed)',
        'Association approval required',
      ],
      advisory:
        '6-month minimum lease is standard for downtown St Pete new construction (same as Waldorf, Reflection). More flexible than 1x/year cap at Waldorf. Attractive for investor-buyers seeking income production.',
    },
    {
      category: 'Pet Policy',
      icon: '🐾',
      headline: 'Pet-Friendly',
      details: [
        'Pets allowed with reasonable size and breed restrictions.',
        'Contact the association for current pet policy details.',
      ],
    },
    {
      category: 'Parking',
      icon: '🅿️',
      headline: 'Covered Parking Included',
      details: [
        'Each unit includes dedicated covered parking in the structured garage.',
        'Guest parking available on a limited basis.',
      ],
    },
  ],

  // ─── Financing ─────────────────────────────────────────────────────────────
  financing: {
    preConstruction: {
      depositPercent: 20,
      balancePercent: 80,
      closingPhase: 'At closing — building delivered',
      preApprovalStrategy:
        'Conventional mortgage pre-approval recommended. Building is delivered and eligible for standard financing.',
    },
    jumboLoanParams: {
      minDownPayment: '20%',
      creditScoreMin: '700+',
      dtiRatio: '43% max',
      cashReserves: '6–12 months',
    },
    lenders: [
      {
        name: 'Local and National Lenders',
        specialty:
          'Delivered high-rise — Fannie Mae / Freddie Mac eligible for conforming and jumbo programs.',
      },
    ],
    advisory:
      'As a delivered building, 400 Central qualifies for standard mortgage products including conventional, jumbo, and FHA (subject to building certification). No pre-construction deposit structure required — standard closing process applies.',
  },

  // ─── Executive Summary ─────────────────────────────────────────────────────
  executiveSummary: {
    title: '400 Central — Downtown St. Petersburg from $1.08M',
    subtitle:
      'Data-driven analysis of pricing, velocity, and inventory for the professional buyer audience.',
    overview:
      'Residences at 400 Central delivers 301 condominiums in a 44-story high-rise tower at the corner of Central Avenue and 4th Street in Downtown St. Petersburg. Developed by Red Apple Group with architecture by Arquitectonica, the building is move-in ready with immediate occupancy available.',
    marketSignificance:
      'At a current active entry of $1.08M (2BR, 1,358 SF, $795/SF), 400 Central remains the most attainable new-construction option in Downtown St. Petersburg — positioned below Art House ($1.36M entry) and dramatically below Waldorf Astoria ($1.5M+ for delivered pre-sales). Historical launch pricing from 2022 was as low as $525K, with actual dev-close prices ranging $807K–$1.25M; today&rsquo;s active inventory has repriced into the $1M+ band as the delivery wave completes.',
    salesPerformance:
      'PCPAO confirms 223 third-party-owned units (74.1% sell-through) at $961 avg PSF. Developer (CATS Red Apple St Pete LLC) retains 78 units — 37 delivered-and-unsold plus 41 upper-floor pre-CO parcels. Absorption velocity averaged 43.6 units/month during the Dec 2025–Apr 2026 delivery wave. Feb 2026 peak: 79 closings in a single month. 6 penthouse closings on floors 40-43 at $4.7M–$6.0M.',
    leadNarrative:
      '400 Central remains the most attainable entry point to Downtown St. Petersburg new construction. Current active listings start at $1.08M — materially below Art House\'s $1.36M entry and Waldorf\'s $1.5M+ pre-sale floor — and the building is delivered, eliminating pre-construction risk.',
    pullquote: {
      text: 'The most accessible new-construction option in Downtown St. Petersburg — delivered, walkable, and priced for the professional buyer.',
      attribution: 'ATLAS Market Intelligence',
    },
  },

  // ─── Branded Value ─────────────────────────────────────────────────────────
  brandedValue: {
    title: 'The 400 Central Advantage',
    propositions: [
      {
        title: 'Attainable Downtown Luxury',
        description:
          'Current active inventory from $1.08M — the most attainable Downtown St. Petersburg new-construction entry today. Delivered building, no pre-construction risk, no years-long wait.',
      },
      {
        title: 'Central Avenue Address',
        description:
          'Located at the heart of St. Pete\'s most walkable corridor with 200+ restaurants, bars, galleries, and shops within a 10-minute walk.',
      },
      {
        title: 'Delivered & Move-In Ready',
        description:
          'Building is complete, units are finished, and immediate occupancy eliminates the uncertainty that defines pre-construction purchases.',
      },
      {
        title: 'Arquitectonica Design',
        description:
          'Internationally recognized architectural firm brings design credibility to a 44-story tower — clean lines, open floor plans, and private balconies.',
      },
    ],
  },

  // ─── Market Evidence ───────────────────────────────────────────────────────
  marketEvidence: [
    {
      metric: 'Entry Price Point',
      value: 'From $1.08M',
      description:
        'Most attainable Downtown St. Petersburg new-construction entry today. Active 2BR listings start at $1.08M ($795/SF) — about 20% below Art House\'s $1.36M entry and ~30% below Waldorf\'s $1.5M+ pre-sale floor. Historical 2022 launch pricing was from $525K for smallest units.',
    },
    {
      metric: 'Avg Price Per SF',
      value: '$950/SF',
      description:
        'Weighted average across 219 closed sales (Stellar MLS, Dec 2025 – Apr 2026). Range: $585–$1,418/SF depending on floor, unit size, and exposure. Up from $824/SF in initial 66-sale dataset as penthouse closings pulled average higher.',
    },
    {
      metric: 'Total Units',
      value: '301 units',
      description:
        'Largest new-construction condominium project in Downtown St. Petersburg by unit count. 44-story high-rise format.',
    },
    {
      metric: 'MLS Closed Sales',
      value: '219 units',
      description:
        '219 units closed on Stellar MLS between Dec 2025 and Apr 2026. Average $950/SF. SP/LP ratio of 1.00. Bulk delivery wave — 79 closings in Feb 2026 alone, the largest single-month closing wave in Tampa Bay new construction.',
    },
    {
      metric: 'Unit Size Range',
      value: '1,277–4,849 SF',
      description:
        '2BR to 4BR floor plans across 9 unit positions per floor. Standard units 1,277–2,658 SF. Penthouses up to 4,849 SF. Open-concept layouts with private balconies and floor-to-ceiling windows.',
    },
    // ── PCPAO Ownership Intelligence (Pinellas County Property Appraiser) ──
    {
      metric: 'Sell-Through',
      value: '74.1% (223 of 301)',
      description:
        '223 residential parcels held by third parties per PCPAO (2026-04-22). Developer (CATS Red Apple St Pete LLC) retains 78 units (25.9%): 37 CO\'d delivered-unsold + 41 upper-floor pre-CO. Q1 2026 closings: 52 units Jan–Mar. Average velocity 43.6 units/month during the Dec 2025–Apr 2026 delivery wave.',
    },
    {
      metric: 'Entity Ownership',
      value: '40.7% (70 of 172 sold)',
      description:
        '40.7% of sold units are held by LLCs, trusts, or corporate entities. 27.9% in trusts (48 units) — indicating sophisticated estate-planning buyers. 12.8% in LLCs (22 units) — pure investor acquisitions. This is an exceptionally high entity-ownership ratio for a Gulf Coast new-construction project.',
    },
    {
      metric: 'Buyer Profile',
      value: '65.7% Couples / 34.3% Single',
      description:
        'Among 102 individual (non-entity) owners, 67 are joint/couple ownership (65.7%). 35 are single-name owners (34.3%). Combined with 100% cash purchases on MLS closings, this signals a wealth-driven buyer pool — not first-time or mortgage-dependent purchasers.',
    },
    {
      metric: 'Developer Inventory Concentration',
      value: '78 units remaining',
      description:
        'CATS Red Apple St Pete LLC retains 78 units per PCPAO 2026-04-22. 13 developer listings currently active on MLS (Roopani + Michael Saunders) at median $1,052/SF. Developer inventory concentrated on floors 19-44, with 41 upper-floor parcels still pre-CO.',
    },
    {
      metric: 'Penthouse Closings',
      value: '$4.7M–$6.0M',
      description:
        '6 penthouse closings on floors 40-43 at $1,189–$1,418/SF. Unit 4301 closed at $6,006,298 ($1,418/SF) — a 4BR penthouse setting the building record. These closings significantly lifted the overall average PSF.',
    },
    {
      metric: 'Developer vs Resale',
      value: '$1,052 vs $976/SF',
      description:
        'Dual-market dynamic intensifying: 13 developer listings at median $1,052/SF competing with 15 owner resale listings at median $976/SF — a ~7% gap. Resales now outnumber developer listings for the first time. Flip premium: resale median $976 is +16.2% over developer-close median $840/SF.',
    },
    // ── Advanced Analytics (March 2026 MLS deep-dive) ────────────────────────
    {
      metric: 'Floor Premium Curve',
      value: '+$13.62/SF per floor',
      description:
        'Non-linear floor premium across 40 floors. FL3-20: $800-$950/SF (base tier). FL21-35: $920-$1,100/SF (premium tier, +15% over base). FL36-43: $1,100-$1,418/SF (ultra tier, +35% over base). Premium accelerates above FL30 — convexity pricing where height has exponential, not linear, value. Base FL3 avg $815/SF vs top FL43 avg $1,360/SF = +$545/SF total premium.',
    },
    {
      metric: 'Position Rankings (Stack PSF)',
      value: 'Pos 7 & 1 lead at $1,070/SF',
      description:
        'Corner flowthrough positions (1 & 7) at 2,600-2,700 SF command 25%+ PSF premium over interior 2BR positions. Rankings: Pos 7 ($1,071/SF, 3BR corner), Pos 1 ($1,067/SF, 3BR corner), Pos 6 ($967/SF), Pos 3 ($958/SF), Pos 5 ($930/SF), Pos 8 ($898/SF, 2BR), Pos 2 ($886/SF), Pos 9 ($865/SF, 2BR), Pos 4 ($836/SF, 2BR). Corner exposure + flow-through layout = maximum value capture.',
    },
    {
      metric: 'Flip Profit Analysis',
      value: '19/19 winners — avg +17.9%',
      description:
        'All 19 owner-flippers are in profit territory. Average markup: +$276K/unit (+17.9% over developer close price). Highest: Unit 1609 at +37.7% (+$342K). Lowest: Unit 1603 at +1.8% (+$21K). Total portfolio markup: $5.24M across 19 units. Zero losers. This is extraordinary for a building that just started closings 5 months ago — signals strong underlying demand and developer pricing below market clearing.',
    },
    {
      metric: 'Absorption by Unit Type',
      value: '3BR 1.8x faster than 2BR',
      description:
        '3BR units absorbed at 41.3/mo vs 2BR at 23.3/mo — 1.8x velocity differential. 4BR penthouses: 3.9/mo (7 total, $1,219/SF avg). Highest volume segment: 1,301-1,400 SF small 2BR at 29.2% of all sales. All bedroom types started closing simultaneously (Dec 29, 2025) — developer released full building inventory at once rather than phased approach.',
    },
  ],

  // ─── Market Narrative ──────────────────────────────────────────────────────
  marketNarrative: [
    '400 Central occupies a unique position in the Downtown St. Petersburg new-construction landscape. With 223 PCPAO-verified third-party owners at $961/SF average and 74.1% sell-through, the building has proven its market thesis. While Art House commands $870/SF average and Waldorf Astoria projects $1,265+ PSF, 400 Central\'s $1.08M active entry (down from $1.5M+ at Waldorf) creates an entirely different buyer conversation — one centered on attainability within the downtown core, not exclusivity.',
    'For advisors, the significance is practical: 400 Central is the answer for clients who want new construction in downtown but can\'t (or won\'t) commit to $1M+. The delivered status eliminates pre-construction anxiety, and the Central Avenue location delivers genuine walkability without the Beach Drive price premium.',
  ],

  // ─── Advisory Insights ─────────────────────────────────────────────────────
  advisoryInsights: [
    {
      title: 'For Buyer Advisors',
      content:
        'PCPAO 2026-04-22: 78 of 301 units (25.9%) remain developer-held — 37 delivered-unsold plus 41 upper-floor pre-CO. 13 developer listings active at median $1,052/SF versus 15 resale listings at median $976/SF — buyers have two markets to shop. The delivered building means buyers can tour finished units on floors 3–24, not renderings, and financing is standard (no pre-construction deposit structure).',
    },
    {
      title: 'For Listing Advisors',
      content:
        'PCPAO data shows 40.7% entity ownership (LLCs and trusts) among sold units — the highest ratio in the downtown corridor. When benchmarking resale condos, 400 Central\'s realized $961/SF average establishes the mid-market reference. Dual-market spread: resale median $976/SF vs developer median $1,052/SF (≈7% discount). Flip premium over developer-close median $840/SF is +16.2% — owners realizing carry. Monitor for pricing pressure as more investor-held units hit the market.',
    },
    {
      title: 'For Investment Advisors',
      content:
        'The 12.8% LLC ownership rate (22 of 172 verified sales) confirms strong investor demand. Rental-friendly policy and Central Avenue location command competitive rents. However, the 78-unit developer overhang creates risk: if Red Apple accelerates liquidation, resale investors face competition from developer pricing at $1,052/SF. Early resale market forming at $976/SF median. Key signal: resale PSF averages ~7% below developer ask, establishing the discount resale buyers expect.',
    },
    {
      title: 'Ownership Intelligence',
      content:
        'PCPAO as of 2026-04-22: 223 third-party-owned residential parcels (74.1% sell-through). Developer retains 78 units (37 delivered-unsold + 41 upper-floor pre-CO). Owner composition: 40.7% entity ownership (LLCs + trusts). Dual-market phase: 13 developer listings (median $1,052/SF) vs 15 resale listings (median $976/SF). 1 pending: Unit 4102 penthouse at $4,795,000 ($1,221/SF). Unit 4301 record close at $6,006,298 ($1,418/SF).',
    },
  ],

  // ─── Competitors ───────────────────────────────────────────────────────────
  competitors: [
    {
      name: '400 Central',
      height: '44 stories',
      units: 301,
      avgPsf: '$961',
      delivery: 'Available Now',
      status: '74.1% Sold (223 units)',
      isFeatured: true,
    },
    {
      name: 'Art House',
      height: '42 stories',
      units: 244,
      avgPsf: '$877',
      delivery: 'Available Now',
      status: '86.9% Sold (212 units)',
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

  // ─── Location Categories ───────────────────────────────────────────────────
  locationCategories: [
    {
      name: 'Dining & Gastronomy',
      icon: 'utensils',
      venues: [
        { name: 'Bodega', description: 'Cuban-inspired street food, craft cocktails, late-night favorite', distance: '200 ft', walkTime: '1 min' },
        { name: 'The Mill', description: 'Modern American, craft cocktails, Central Ave anchor', distance: '0.1 miles', walkTime: '2 min' },
        { name: 'Red Mesa Cantina', description: 'Upscale Mexican, rooftop bar with skyline views', distance: '0.1 miles', walkTime: '2 min' },
        { name: 'IL Ritorno', description: 'James Beard-nominated, handmade pastas and wood-fired dishes', distance: '0.2 miles', walkTime: '4 min' },
        { name: 'Rococo Steak', description: 'Classic steakhouse in stunning 1920s-era building', distance: '0.3 miles', walkTime: '5 min' },
        { name: 'Cassis', description: 'French-American bistro, scenic bayfront terrace', distance: '0.4 miles', walkTime: '7 min' },
        { name: 'Allelo', description: 'Mediterranean-influenced, current darling of fine dining scene', distance: '0.4 miles', walkTime: '7 min' },
        { name: 'The Birchwood', description: 'Rooftop dining with waterfront views, Michelin Guide recognized', distance: '0.4 miles', walkTime: '7 min' },
        { name: 'Saturday Morning Market', description: 'Largest open-air market in the Southeast (seasonal)', distance: '0.4 miles', walkTime: '8 min' },
      ],
    },
    {
      name: 'Culture & Museums',
      icon: 'palette',
      venues: [
        { name: 'Central Arts District', description: 'Galleries, murals, and creative spaces along Central Ave', distance: '0.0 miles', walkTime: '1 min' },
        { name: 'Florida Holocaust Museum', description: 'One of the largest in the United States', distance: '0.2 miles', walkTime: '4 min' },
        { name: 'The James Museum', description: '$75M collection of Western and Wildlife Art', distance: '0.3 miles', walkTime: '5 min' },
        { name: 'Museum of Fine Arts', description: '20,000+ works spanning 5,000 years', distance: '0.5 miles', walkTime: '10 min' },
        { name: 'The Dalí Museum', description: 'Largest collection of Dalí\'s work outside Europe', distance: '0.6 miles', walkTime: '12 min' },
        { name: 'Imagine Museum', description: 'Contemporary glass art museum', distance: '1.0 miles' },
        { name: 'Dr. Carter G. Woodson Museum', description: 'African American history and culture', distance: '1.2 miles' },
      ],
    },
    {
      name: 'Parks & Waterfront',
      icon: 'tree',
      venues: [
        { name: 'Williams Park', description: 'Historic downtown park directly adjacent to 400 Central', distance: '0.1 miles', walkTime: '1 min' },
        { name: 'North & South Straub Parks', description: 'Bayfront green space connecting downtown to the waterfront', distance: '0.3 miles', walkTime: '5 min' },
        { name: 'Vinoy Park', description: '15-acre bayfront park with events and marina views', distance: '0.5 miles', walkTime: '10 min' },
        { name: 'St. Pete Pier', description: '$92M waterfront destination with dining, shops, splash pad', distance: '0.6 miles', walkTime: '12 min' },
        { name: 'Pinellas Trail', description: '75-mile paved cycling/walking trail to beaches, Gulfport, and Tarpon Springs', distance: '0.3 miles', walkTime: '5 min' },
      ],
    },
    {
      name: 'Entertainment & Nightlife',
      icon: 'music',
      venues: [
        { name: 'Jannus Live', description: 'Iconic outdoor concert venue in downtown courtyard', distance: '0.2 miles', walkTime: '3 min' },
        { name: 'The Floridian Social Club', description: 'Live music and social events venue', distance: '0.2 miles', walkTime: '3 min' },
        { name: 'American Stage', description: 'Tampa Bay\'s longest-running professional theater', distance: '0.2 miles', walkTime: '4 min' },
        { name: 'Mahaffey Theater', description: 'Major performing arts and concert venue', distance: '0.4 miles', walkTime: '8 min' },
        { name: 'Al Lang Stadium', description: 'Tampa Bay Rowdies (USL), waterfront concerts and events', distance: '0.5 miles', walkTime: '10 min' },
        { name: 'Tropicana Field', description: 'Future mixed-use redevelopment — new MLB stadium, 6M+ SF master plan', distance: '0.5 miles', walkTime: '10 min' },
      ],
    },
    {
      name: 'Wellness & Shopping',
      icon: 'spa',
      venues: [
        { name: 'Sundial St. Pete', description: 'Open-air shopping, dining, and entertainment complex', distance: '0.2 miles', walkTime: '4 min' },
        { name: 'Central Avenue Shops', description: '200+ boutiques, vintage stores, and local shops', distance: '0.0 miles', walkTime: '1 min' },
        { name: 'Woodhouse Spa', description: 'HydraFacials, volcanic stone massages, private suites', distance: '0.3 miles', walkTime: '5 min' },
        { name: 'Jackie Z Style Co', description: 'Premier fashion, designer brands, personal styling', distance: '0.3 miles' },
      ],
    },
    {
      name: 'Transportation',
      icon: 'plane',
      venues: [
        { name: 'SunRunner BRT', description: 'Bus Rapid Transit connecting downtown to St. Pete Beach', distance: '0.2 miles', walkTime: '3 min' },
        { name: 'Cross-Bay Ferry', description: 'Passenger ferry to downtown Tampa, scenic 50-minute crossing', distance: '0.5 miles', walkTime: '10 min' },
        { name: 'Albert Whitted Airport (SPG)', description: 'FBO services for private aviation, 3 min from building', distance: '0.5 miles' },
        { name: 'St. Pete–Clearwater Intl (PIE)', description: 'Regional airport with FBO and private terminal', distance: '17 min drive' },
        { name: 'Tampa International (TPA)', description: 'Major international airport', distance: '26 min drive' },
      ],
    },
    {
      name: 'Medical',
      icon: 'hospital',
      venues: [
        { name: 'Bayfront Health', description: 'Level II Trauma Center, 24/7 emergency', distance: '0.5 miles' },
        { name: 'Johns Hopkins All Children\'s', description: 'World-class pediatric, nationally ranked', distance: '0.6 miles' },
        { name: 'St. Anthony\'s Hospital', description: 'Premier heart and vascular center', distance: '1.1 miles' },
      ],
    },
  ],

  // ─── Location Scores ───────────────────────────────────────────────────────
  locationScores: [
    { label: 'Walk Score', score: 89, descriptor: "Walker's Paradise" },
    { label: 'Bike Score', score: 85, descriptor: 'Very Bikeable' },
    { label: 'Cultural Access', score: 90, descriptor: 'Excellent' },
    { label: 'Dining & Nightlife', score: 95, descriptor: 'Outstanding' },
    { label: 'Waterfront Access', score: 80, descriptor: 'Very Good' },
    { label: 'Transit Score', score: 55, descriptor: 'Some Transit' },
  ],

  locationEyebrow: 'Central Avenue Corridor',

  locationInsight: {
    title: 'Central Avenue — The Walkable Urban Core',
    paragraphs: [
      '400 Central sits at the epicenter of St. Petersburg\'s most dynamic street — Central Avenue. With a Walk Score of 89, residents are steps from over 200 restaurants, bars, galleries, and shops stretching from Downtown to the Grand Central District.',
      'The SunRunner BRT provides direct transit to the Gulf beaches, while two airports (PIE at 20 min, TPA at 30 min) serve regional and international travel. The planned Tropicana Field redevelopment will inject an 86-acre mixed-use district into the adjacent neighborhood.',
    ],
    highlights: [
      'Walk Score 89 — among the most walkable addresses in Tampa Bay',
      'Central Avenue frontage with 200+ restaurants, bars, and shops',
      'Sundial St. Pete mixed-use complex 2 blocks east',
      'SunRunner BRT to Gulf beaches from nearby stop',
      'Tropicana Field redevelopment planned — 86-acre mixed-use catalyst',
    ],
  },

  // ─── Visionaries ───────────────────────────────────────────────────────────
  visionaries: [
    {
      role: 'Developer',
      companies: [
        {
          name: 'Red Apple Group',
          description:
            'A New York–based real estate development company with a portfolio spanning residential, commercial, hospitality, and retail properties. Red Apple Group brings institutional development expertise to the Gulf Coast market with 400 Central as their flagship St. Petersburg project.',
        },
      ],
    },
    {
      role: 'Architect',
      companies: [
        {
          name: 'Arquitectonica',
          description:
            'An internationally acclaimed architecture firm founded in Miami with a global portfolio of landmark buildings. Known for bold geometric design and innovative facades, Arquitectonica brings world-class design credibility to 400 Central\'s 44-story tower.',
        },
      ],
    },
  ],

  // ─── Timeline ──────────────────────────────────────────────────────────────
  timeline: [
    {
      date: '2021',
      title: 'Project Announcement',
      description:
        'Red Apple Group announces Residences at 400 Central — a 301-unit, 44-story condominium at 400 Central Ave in Downtown St. Petersburg. Arquitectonica selected as design architect.',
      status: 'completed',
    },
    {
      date: '2022',
      title: 'Sales Launch & Construction Start',
      description:
        'Pre-sales begin and vertical construction commences. Initial pricing from $525,000 targets the professional buyer segment. Early absorption benefits from pandemic migration tailwind.',
      status: 'completed',
    },
    {
      date: '2024',
      title: 'Construction Complete — TCO',
      description:
        'Building achieves Temporary Certificate of Occupancy (TCO). All units available for immediate move-in. Delivery-phase closings begin.',
      status: 'completed',
    },
    {
      date: 'Q1 2025',
      title: 'Active Delivery',
      description:
        'Approximately 80% of 301 units closed or under contract. Remaining ~61 units available for immediate occupancy with finished-product advantage.',
      status: 'active',
    },
    {
      date: 'Q4 2026',
      title: 'Projected Sellout',
      description:
        'At current velocity, remaining inventory expected to clear by late 2026. Final units may see accelerated absorption as scarcity premium takes hold.',
      status: 'upcoming',
    },
  ],

  // ─── Residence Features ────────────────────────────────────────────────────
  residenceFeatures: {
    kitchen: [
      'Gourmet kitchens with islands',
      'Quartz countertops',
      'Stainless steel appliance package',
      'Soft-close cabinetry',
    ],
    bathroom: [
      'Designer vanities',
      'Porcelain tile flooring',
      'Frameless glass shower enclosures',
    ],
    smartHome: [
      'Smart thermostat',
      'USB outlets throughout',
      'Pre-wired for high-speed internet',
    ],
    general: [
      'Open-concept floor plans',
      'Floor-to-ceiling windows',
      'Private balconies',
      'Hardwood and tile flooring',
      'In-unit laundry',
      'Energy-efficient construction',
      'Hurricane-rated construction',
    ],
  },

  // ─── Source Notes ──────────────────────────────────────────────────────────
  sourceNotes: [
    {
      category: 'Pricing Data',
      field: 'Price Points & PSF',
      note: 'PSF data sourced from 66 Stellar MLS closed sales (Dec 2025 – Mar 2026). Average $824/SF across all closings. Range: $585–$992/SF.',
      resolution: 'MLS-verified closed sale data. Developer starting prices updated to reflect actual transaction PSF.',
    },
    {
      category: 'Sales Metrics',
      field: 'Sold Units / Absorption',
      note: 'MLS shows 66 closed sales, 19 active listings, 1 pending. Developer may have additional off-MLS sales not captured in this dataset. PCPAO data provided for cross-reference.',
      resolution: 'Report uses MLS-verified closed sale data. PCPAO property appraiser records pending integration for total ownership analysis.',
    },
    {
      category: 'Building Specifications',
      field: 'Unit Count & Floor Plans',
      note: 'Unit count (301) and floor plan specifications sourced from developer website and DBPR filings.',
      resolution: 'Developer-published specifications used. DBPR filing confirms 301 total units.',
    },
  ],

  // ─── Press Highlights ──────────────────────────────────────────────────────
  pressHighlights: [
    {
      source: 'Tampa Bay Business Journal',
      date: '2022',
      headline:
        'Red Apple Group launches 301-unit condo project in downtown St. Petersburg',
      quote:
        'The project targets a price point underserved in the downtown market.',
    },
    {
      source: 'St Pete Catalyst',
      date: '2023',
      headline:
        '400 Central rises to reshape the Central Avenue skyline',
    },
  ],

  // ─── SEO ───────────────────────────────────────────────────────────────────
  seo: {
    title: 'Residences at 400 Central | Downtown St. Petersburg from $1.08M',
    description:
      'Residences at 400 Central — 301 condominiums in downtown St. Petersburg. Available now with rooftop pool, fitness center, and walkable Central Ave location.',
    keywords: [
      '400 Central',
      'St. Petersburg condos',
      'downtown condos',
      'Red Apple',
      'move-in ready',
      'Arquitectonica',
      'Central Avenue',
    ],
  },
};

// ─── Backward-Compatible DevelopmentProfile Export ────────────────────────────
// Preserved for listings grid and any code that imports the original export name.
// Uses the full Development data to populate all DevelopmentProfile fields.
export const residencesAt400Central: DevelopmentProfile = {
  slug: residencesAt400CentralDevelopment.slug,
  name: residencesAt400CentralDevelopment.name,
  tagline: residencesAt400CentralDevelopment.tagline,
  description: residencesAt400CentralDevelopment.description ?? '',
  location: residencesAt400CentralDevelopment.location,
  address: residencesAt400CentralDevelopment.address,
  city: 'St. Petersburg',
  county: residencesAt400CentralDevelopment.county,
  status: residencesAt400CentralDevelopment.status,
  type: residencesAt400CentralDevelopment.type ?? 'Condominium',
  price: 'From $1.08M',
  bedrooms: '2-4',
  bathrooms: '2.5-4',
  sqft: '1,277-4,849 SF',
  totalUnits: 301,
  unitSizes: '1,277-4,849 SF',
  deliveryDate: residencesAt400CentralDevelopment.deliveryDate,
  stories: 44,
  developer: 'Red Apple',
  architect: 'Arquitectonica',
  website: residencesAt400CentralDevelopment.website,
  phone: residencesAt400CentralDevelopment.phone,
  socialMedia: residencesAt400CentralDevelopment.socialMedia,
  features: residencesAt400CentralDevelopment.residenceFeatures
    ? [
        ...residencesAt400CentralDevelopment.residenceFeatures.general,
        ...residencesAt400CentralDevelopment.residenceFeatures.kitchen,
      ]
    : [],
  amenities: [
    'Rooftop pool deck',
    'Fitness center',
    'Resident lounge',
    'Covered parking garage',
    'Package lockers',
    'Secure entry',
  ],
  galleryImages: [
    'https://media.stpetecatalyst.com/uploads/2021/10/400-Central_Hero-DuskF.jpg',
    'https://media.stpetecatalyst.com/uploads/2021/10/400Central_SkyLounge_ObservationDeckF.jpg',
    'https://images.squarespace-cdn.com/content/v1/55467dc6e4b0ebaf8fab24a0/14fc1f2c-5649-4099-a179-38c4beb2156f/AB3_400+Central-15.jpg',
    'https://www.residences400central.com/wp-content/uploads/2021/09/400Central_77_Living-Room-560x380.webp',
    'https://www.residences400central.com/wp-content/uploads/2021/09/400Central_TropicalOasisPool-560x380.webp',
    'https://media.stpetecatalyst.com/uploads/2021/10/400Central_BalconyViewF.jpg',
  ],
  documents: residencesAt400CentralDevelopment.documents,
  seo: residencesAt400CentralDevelopment.seo,
};
