import { Development, PricingLadder } from '@/types/development';

export const waldorfAstoria: Development = {
  slug: 'waldorf-astoria',
  name: 'Waldorf Astoria',
  fullName: 'Waldorf Astoria Residences St. Petersburg',
  tagline: 'St. Petersburg Waterfront',
  heroDescription:
    'Tampa Bay\'s first ultra-luxury branded residence — a 50-story Hilton-managed waterfront tower establishing the region\'s absolute pricing ceiling at $1,400+ PSF. The fastest-selling condominium on the West Coast of Florida.',
  images: {
    hero: {
      src: '/images/developments/waldorf-astoria/renderings/wa-hero.jpg',
      alt: 'Waldorf Astoria Residences St. Petersburg — 50-story waterfront tower rendering at sunset',
    },
    card: {
      src: '/images/developments/waldorf-astoria/renderings/wa-hero.jpg',
      alt: 'Waldorf Astoria Residences St. Petersburg',
    },
    gallery: [
      { src: '/images/developments/waldorf-astoria/renderings/wa-lobby.jpg', alt: 'Grand arrival lobby with Waldorf Astoria signature design', caption: 'Grand Lobby' },
      { src: '/images/developments/waldorf-astoria/renderings/wa-living-room.jpg', alt: 'Residence living room with panoramic waterfront views', caption: 'Living Room' },
      { src: '/images/developments/waldorf-astoria/renderings/wa-kitchen.jpg', alt: 'Chef\'s kitchen with Italian cabinetry and Sub-Zero appliances', caption: 'Chef\'s Kitchen' },
      { src: '/images/developments/waldorf-astoria/renderings/wa-primary-bedroom.jpg', alt: 'Primary suite with floor-to-ceiling water views', caption: 'Primary Suite' },
      { src: '/images/developments/waldorf-astoria/renderings/wa-primary-bathroom.jpg', alt: 'Spa-inspired primary bathroom with freestanding soaking tub', caption: 'Primary Bath' },
      { src: '/images/developments/waldorf-astoria/renderings/wa-terrace.jpg', alt: 'Expansive private terrace overlooking Tampa Bay', caption: 'Private Terrace' },
      { src: '/images/developments/waldorf-astoria/renderings/wa-pool.jpg', alt: 'Resort-style pool deck with cabanas and bay views', caption: 'Pool Deck' },
      { src: '/images/developments/waldorf-astoria/renderings/wa-sunset-bar.jpg', alt: 'Signature rooftop sunset bar with 360-degree views', caption: 'Sunset Bar' },
      { src: '/images/developments/waldorf-astoria/renderings/wa-wellness.jpg', alt: 'Full-service wellness center and spa', caption: 'Wellness Center' },
      { src: '/images/developments/waldorf-astoria/renderings/wa-dining-room.jpg', alt: 'Formal dining space with waterfront backdrop', caption: 'Dining Room' },
      { src: '/images/developments/waldorf-astoria/renderings/wa-foyer.jpg', alt: 'Private residence foyer with curated artwork', caption: 'Residence Foyer' },
      { src: '/images/developments/waldorf-astoria/renderings/wa-primary-closet.jpg', alt: 'Walk-in closet with custom millwork', caption: 'Walk-in Closet' },
      { src: '/images/developments/waldorf-astoria/renderings/wa-hummingbird.jpg', alt: 'Michelin Dining — signature restaurant at Waldorf Astoria St. Petersburg', caption: 'Michelin Dining' },
    ],
    ogImage: '/images/developments/waldorf-astoria/renderings/wa-hero.jpg',
  },
  location: 'Downtown St. Petersburg',
  address: '150 2nd Avenue South, St. Petersburg, FL 33701',
  county: 'pinellas',
  status: 'pre-sales',
  statusLabel: 'Pre-Sales',
  tier: 'ultra-luxury',
  badges: ['Tier 1 Luxury', 'Hospitality Brand', 'Waterfront'],
  deliveryDate: 'Q4 2030', // MLS Proj Comp Date: 12/31/2030
  type: 'Branded Residence',
  developer: 'Property Markets Group & Feldman Equities',
  architect: 'Cube 3',
  description:
    'The signal project that forced Tampa Bay into the global branded-residence conversation. PMG and Feldman\'s 50-story Hilton-branded tower has secured $175M+ in pre-construction deposits at $1,503/SF — nearly double the next competitor — with premium upper-floor inventory absorbing first at a 4.8-unit/month velocity. This is not a building competing within the St. Petersburg market; it is the asset repricing the market itself. Every waterfront holding in Pinellas County is now valued relative to the Waldorf.',
  hoaPerSqFt: 1.40, // Fixed rate $1.40/SF/month — monthly amount varies by unit size

  // Contact & social
  website: 'https://waresidencesstpetersburg.com/',
  phone: '727-291-9041',
  socialMedia: {
    instagram: 'https://www.instagram.com/waresidencesstpetersburg',
    facebook: 'https://www.facebook.com/waresidencesstpetersburg',
  },

  socialProof: [
    {
      platform: 'google',
      author: 'Robert M.',
      text: 'The sales gallery alone tells you this isn\'t another condo — it\'s a benchmark for the entire Gulf Coast luxury market.',
      date: '2025-01',
      rating: 5,
    },
    {
      platform: 'instagram',
      author: 'Victoria L.',
      text: 'Saw the renderings at the gallery event and the finishes are on par with anything in Miami or Manhattan. St. Pete finally has its signature tower.',
      date: '2025-02',
    },
    {
      platform: 'google',
      author: 'James T.',
      text: 'PMG and the Waldorf brand together is a serious combination. The deposit structure is competitive and the team is extremely professional.',
      date: '2024-11',
      rating: 5,
    },
    {
      platform: 'facebook',
      author: 'Christine D.',
      text: 'We\'ve been waiting years for a branded residence in Tampa Bay. The concierge services and Hilton Honors benefits sealed the deal for us.',
      date: '2024-12',
    },
  ],

  pricePoints: [
    { bedroomCount: 2, label: '2BR Entry', startingPrice: 2600000 },
    { bedroomCount: 3, label: '3BR Entry', startingPrice: 3275000 },
    { bedroomCount: 4, label: '4BR / Premium', startingPrice: 3750000 },
  ],

  residencePricing: [
    {
      residenceType: 'Residence 01',
      units: [
        { unit: '2301', floor: 23, price: 4350000 },
        { unit: '3101', floor: 31, price: 4875000 },
        { unit: '3801', floor: 38, price: 5400000 },
      ],
    },
    {
      residenceType: 'Residence 02',
      units: [
        { unit: '2302', floor: 23, price: 2600000 },
        { unit: '3602', floor: 36, price: 3250000 },
        { unit: '4202', floor: 42, price: 3550000 },
      ],
    },
    {
      residenceType: 'Residence 03',
      units: [
        { unit: '2203', floor: 22, price: 3275000 },
        { unit: '3103', floor: 31, price: 3700000 },
        { unit: '4303', floor: 43, price: 4300000 },
      ],
    },
    {
      residenceType: 'Residence 04',
      units: [
        { unit: '2204', floor: 22, price: 3275000 },
        { unit: '3404', floor: 34, price: 3900000 },
        { unit: '4604', floor: 46, price: 4500000 },
      ],
    },
    {
      residenceType: 'Residence 05',
      units: [
        { unit: '2605', floor: 26, price: 2700000 },
        { unit: '3505', floor: 35, price: 3150000 },
        { unit: '4505', floor: 45, price: 3650000 },
      ],
    },
    {
      residenceType: 'Residence 06',
      units: [
        { unit: '2106', floor: 21, price: 3750000 },
        { unit: '3306', floor: 33, price: 4350000 },
        { unit: '4306', floor: 43, price: 5175000 },
      ],
    },
  ],

  // ═══════════════════════════════════════════════════════════════════════════
  // PRICING LADDER — Append-only ledger. NEVER overwrite or delete price entries.
  // Sources: Developer Pricing Sheet (January 2026), Stellar MLS via Smith & Associates,
  //          Developer Featured Availability (January 2026)
  // NOTE: Two units (3103, 3404) show documented PRICE DECREASES — MLS listings
  //       were withdrawn, then reappeared on developer Featured Availability at
  //       lower prices. See individual unit notes for full provenance.
  // ═══════════════════════════════════════════════════════════════════════════
  pricingLadder: {
    buildingName: 'Waldorf Astoria Residences St. Petersburg',
    lastUpdated: '2026-04-09',
    totalTrackedUnits: 23,  // +2 new units (2902, 4502) added Mar 2026
    psfRange: { min: 1254.60, max: 1878.54 },   // Living SF basis — Unit 4502 at $1,777/SF (4BR PH) now on MLS
    priceRange: { min: 2600000, max: 6700000 },  // Updated: Unit 4502 4BR at $6.7M added Mar 2026
    averagePsfLiving: 1502.75,  // Updated avg from 7 active MLS listings (Mar 2026)
    floorPremiums: [
      {
        residenceType: 'Residence 01',
        basePricePerFloor: 70000,
        sampleRange: { lowFloor: 23, highFloor: 38 },
        premiumPerFloor: [
          { fromFloor: 23, toFloor: 31, perFloor: 65625 },
          { fromFloor: 31, toFloor: 38, perFloor: 75000 },
        ],
      },
      {
        residenceType: 'Residence 02',
        basePricePerFloor: 50000,
        sampleRange: { lowFloor: 23, highFloor: 42 },
        premiumPerFloor: [
          { fromFloor: 23, toFloor: 27, perFloor: 50000 },
          { fromFloor: 27, toFloor: 36, perFloor: 50000 },
          { fromFloor: 36, toFloor: 42, perFloor: 50000 },
        ],
      },
      {
        residenceType: 'Residence 03',
        basePricePerFloor: 48810,
        sampleRange: { lowFloor: 22, highFloor: 43 },
        premiumPerFloor: [
          { fromFloor: 22, toFloor: 31, perFloor: 47222 },
          { fromFloor: 31, toFloor: 35, perFloor: 50000 },
          { fromFloor: 35, toFloor: 43, perFloor: 50000 },
        ],
      },
      {
        residenceType: 'Residence 04',
        basePricePerFloor: 51042,
        sampleRange: { lowFloor: 22, highFloor: 46 },
        premiumPerFloor: [
          { fromFloor: 22, toFloor: 30, perFloor: 53125 },
          { fromFloor: 30, toFloor: 34, perFloor: 50000 },
          { fromFloor: 34, toFloor: 46, perFloor: 50000 },
        ],
      },
      {
        residenceType: 'Residence 05',
        basePricePerFloor: 50000,
        sampleRange: { lowFloor: 26, highFloor: 45 },
        premiumPerFloor: [
          { fromFloor: 26, toFloor: 35, perFloor: 50000 },
          { fromFloor: 35, toFloor: 45, perFloor: 50000 },
        ],
      },
      {
        residenceType: 'Residence 06',
        basePricePerFloor: 64773,
        sampleRange: { lowFloor: 21, highFloor: 43 },
        premiumPerFloor: [
          { fromFloor: 21, toFloor: 33, perFloor: 50000 },
          { fromFloor: 33, toFloor: 43, perFloor: 82500 },
        ],
      },
    ],
    units: [
      // ── RESIDENCE 01 (3BR/3.5BA, 3408 living SF, 572 terrace, 3980 total) ──
      {
        unit: '2301', floor: 23, residenceType: 'Residence 01',
        bedrooms: 3, bathrooms: '3/1', livingSF: 3408, terraceSF: 572, totalSF: 3980,
        currentPrice: 4350000, currentPsfLiving: 1276.41, currentPsfTotal: 1092.96,
        trend: 'stable', trendPercent: 0,
        priceHistory: [
          {
            price: 4350000, psfLiving: 1276.41, psfTotal: 1092.96,
            source: 'developer-price-sheet',
            sourceDetail: 'Developer Pricing Sheet — January 2026',
            dateRecorded: '2026-01-15',
            notes: 'Base floor Residence 01',
          },
          {
            price: 4350000, psfLiving: 1276.41, psfTotal: 1092.96,
            source: 'mls-listing',
            sourceDetail: 'Stellar MLS — Smith & Associates',
            dateRecorded: '2026-02-01',
            mlsNumber: 'TB8429707',
            status: 'active',
            notes: 'MLS price matches developer sheet — no change',
          },
        ],
      },
      {
        unit: '3101', floor: 31, residenceType: 'Residence 01',
        bedrooms: 3, bathrooms: '3/1', livingSF: 3408, terraceSF: 572, totalSF: 3980,
        currentPrice: 4875000, currentPsfLiving: 1430.46, currentPsfTotal: 1224.87,
        trend: 'stable',
        priceHistory: [
          {
            price: 4875000, psfLiving: 1430.46, psfTotal: 1224.87,
            source: 'developer-price-sheet',
            sourceDetail: 'Developer Pricing Sheet — January 2026',
            dateRecorded: '2026-01-15',
            pricePerFloor: 65625,
            notes: 'Floor premium: +$525K over FL 23 (8 floors × $65,625/floor)',
          },
        ],
      },
      {
        unit: '3801', floor: 38, residenceType: 'Residence 01',
        bedrooms: 3, bathrooms: '3/1', livingSF: 3408, terraceSF: 572, totalSF: 3980,
        currentPrice: 5400000, currentPsfLiving: 1584.51, currentPsfTotal: 1356.78,
        trend: 'stable',
        priceHistory: [
          {
            price: 5400000, psfLiving: 1584.51, psfTotal: 1356.78,
            source: 'developer-price-sheet',
            sourceDetail: 'Developer Pricing Sheet — January 2026',
            dateRecorded: '2026-01-15',
            pricePerFloor: 75000,
            notes: 'Floor premium: +$525K over FL 31 (7 floors × $75K/floor) — accelerating premium',
          },
        ],
      },

      // ── RESIDENCE 02 (2BR/2.5BA, 2031 living SF, 180 terrace, 2211 total) ──
      {
        unit: '2302', floor: 23, residenceType: 'Residence 02',
        bedrooms: 2, bathrooms: '2/1', livingSF: 2031, terraceSF: 180, totalSF: 2211,
        currentPrice: 2600000, currentPsfLiving: 1280.16, currentPsfTotal: 1175.94,
        trend: 'stable', trendPercent: 0,
        status: 'under-contract',
        priceHistory: [
          {
            price: 2600000, psfLiving: 1280.16, psfTotal: 1175.94,
            source: 'developer-price-sheet',
            sourceDetail: 'Developer Pricing Sheet — January 2026',
            dateRecorded: '2026-01-15',
            notes: 'Base floor Residence 02',
          },
          {
            price: 2600000, psfLiving: 1280.16, psfTotal: 1175.94,
            source: 'mls-listing',
            sourceDetail: 'Stellar MLS — Smith & Associates',
            dateRecorded: '2026-02-01',
            mlsNumber: 'TB8429748',
            status: 'withdrawn',
            notes: 'MLS listing withdrawn — unit went under contract',
          },
        ],
      },
      {
        unit: '2702', floor: 27, residenceType: 'Residence 02',
        bedrooms: 2, bathrooms: '2/1', livingSF: 2031, terraceSF: 180, totalSF: 2211,
        currentPrice: 2800000, currentPsfLiving: 1378.63, currentPsfTotal: 1266.40,
        trend: 'stable',
        status: 'under-contract',
        priceHistory: [
          {
            price: 2800000, psfLiving: 1378.63, psfTotal: 1266.40,
            source: 'mls-listing',
            sourceDetail: 'Stellar MLS — Smith & Associates',
            dateRecorded: '2026-02-01',
            mlsNumber: 'TB8476346',
            status: 'active',
            pricePerFloor: 50000,
            notes: 'New unit — MLS-only unit. +$200K over 2302 (4 floors × $50K)',
          },
          {
            price: 2800000, psfLiving: 1378.63, psfTotal: 1266.40,
            source: 'mls-listing',
            sourceDetail: 'Stellar MLS — Cancelled/Withdrawn (contract executed)',
            dateRecorded: '2026-03-24',
            status: 'withdrawn',
            notes: 'MLS listing cancelled between Feb–Mar 2026 — indicates executed buyer contract at $2.8M. Unit was active only 26 DOM before going under contract. Fastest Res 02 absorption.',
          },
        ],
      },
      {
        unit: '2902', floor: 29, residenceType: 'Residence 02',
        bedrooms: 2, bathrooms: '2/1', livingSF: 2031, terraceSF: 180, totalSF: 2211,
        currentPrice: 2900000, currentPsfLiving: 1427.87, currentPsfTotal: 1311.62,
        trend: 'stable',
        priceHistory: [
          {
            price: 2900000, psfLiving: 1427.87, psfTotal: 1311.62,
            source: 'mls-listing',
            sourceDetail: 'Stellar MLS — Smith & Associates (Vonda Golub)',
            dateRecorded: '2026-03-12',
            mlsNumber: 'TB8486104',
            status: 'active',
            pricePerFloor: 50000,
            notes: 'NEW LISTING — March 2026. +$100K over cancelled 2702 (2 floors × $50K). Replaces 2702 in active inventory after 2702 went under contract.',
          },
        ],
      },
      {
        unit: '3602', floor: 36, residenceType: 'Residence 02',
        bedrooms: 2, bathrooms: '2/1', livingSF: 2031, terraceSF: 180, totalSF: 2211,
        currentPrice: 3250000, currentPsfLiving: 1600.20, currentPsfTotal: 1469.92,
        trend: 'stable',
        priceHistory: [
          {
            price: 3250000, psfLiving: 1600.20, psfTotal: 1469.92,
            source: 'developer-price-sheet',
            sourceDetail: 'Developer Pricing Sheet — January 2026',
            dateRecorded: '2026-01-15',
            pricePerFloor: 50000,
            notes: 'Floor premium: +$650K over FL 23 (13 floors × $50K/floor)',
          },
        ],
      },
      {
        unit: '4202', floor: 42, residenceType: 'Residence 02',
        bedrooms: 2, bathrooms: '2/1', livingSF: 2031, terraceSF: 180, totalSF: 2211,
        currentPrice: 3550000, currentPsfLiving: 1747.91, currentPsfTotal: 1605.61,
        trend: 'stable',
        priceHistory: [
          {
            price: 3550000, psfLiving: 1747.91, psfTotal: 1605.61,
            source: 'developer-price-sheet',
            sourceDetail: 'Developer Pricing Sheet — January 2026',
            dateRecorded: '2026-01-15',
            pricePerFloor: 50000,
            notes: 'Floor premium: +$300K over FL 36 (6 floors × $50K/floor)',
          },
        ],
      },

      // ── RESIDENCE 03 (3BR/3.5BA, 2583 living SF, 363 terrace, 2946 total) ──
      {
        unit: '2203', floor: 22, residenceType: 'Residence 03',
        bedrooms: 3, bathrooms: '3/1', livingSF: 2583, terraceSF: 363, totalSF: 2946,
        currentPrice: 3275000, currentPsfLiving: 1267.83, currentPsfTotal: 1111.68,
        trend: 'stable',
        priceHistory: [
          {
            price: 3275000, psfLiving: 1267.83, psfTotal: 1111.68,
            source: 'developer-price-sheet',
            sourceDetail: 'Developer Pricing Sheet — January 2026',
            dateRecorded: '2026-01-15',
            notes: 'Base floor Residence 03',
          },
        ],
      },
      {
        unit: '3103', floor: 31, residenceType: 'Residence 03',
        bedrooms: 3, bathrooms: '3/1', livingSF: 2583, terraceSF: 363, totalSF: 2946,
        currentPrice: 3700000, currentPsfLiving: 1432.44, currentPsfTotal: 1255.94,
        trend: 'down', trendPercent: -0.67,
        priceHistory: [
          {
            price: 3700000, psfLiving: 1432.44, psfTotal: 1255.94,
            source: 'developer-price-sheet',
            sourceDetail: 'Developer Pricing Sheet — January 2026',
            dateRecorded: '2026-01-15',
            pricePerFloor: 47222,
            notes: 'Floor premium: +$425K over FL 22 (9 floors × $47,222/floor)',
          },
          {
            price: 3725000, psfLiving: 1442.12, psfTotal: 1264.43,
            source: 'mls-listing',
            sourceDetail: 'Stellar MLS — Smith & Associates',
            dateRecorded: '2025-08-01',
            mlsNumber: 'TB8429709',
            status: 'withdrawn',
            notes: 'MLS listed $25K ABOVE developer sheet (+0.68%). Listing withdrawn 11/25/2025.',
          },
          {
            price: 3700000, psfLiving: 1432.44, psfTotal: 1255.94,
            source: 'developer-featured-availability',
            sourceDetail: 'Developer Featured Availability — January 2026',
            dateRecorded: '2026-01-15',
            notes: 'PRICE DECREASE: Reappeared on developer Featured Availability at $3,700,000 — $25K below prior MLS price of $3,725,000 (−0.67%). Unit was listed on MLS via Smith & Associates, withdrawn 11/25/2025, then relisted by developer at developer sheet price. One of two documented price decreases in the Waldorf Astoria inventory.',
          },
        ],
      },
      {
        unit: '3503', floor: 35, residenceType: 'Residence 03',
        bedrooms: 3, bathrooms: '3/1', livingSF: 2583, terraceSF: 363, totalSF: 2946,
        currentPrice: 3900000, currentPsfLiving: 1509.87, currentPsfTotal: 1323.83,
        trend: 'stable',
        priceHistory: [
          {
            price: 3900000, psfLiving: 1509.87, psfTotal: 1323.83,
            source: 'mls-listing',
            sourceDetail: 'Stellar MLS — Smith & Associates',
            dateRecorded: '2026-02-01',
            mlsNumber: 'TB8451353',
            status: 'active',
            pricePerFloor: 50000,
            notes: 'New unit — MLS-only unit. +$200K over 3103 MLS (4 floors × $50K)',
          },
        ],
      },
      {
        unit: '4303', floor: 43, residenceType: 'Residence 03',
        bedrooms: 3, bathrooms: '3/1', livingSF: 2583, terraceSF: 363, totalSF: 2946,
        currentPrice: 4300000, currentPsfLiving: 1664.73, currentPsfTotal: 1459.61,
        trend: 'stable',
        priceHistory: [
          {
            price: 4300000, psfLiving: 1664.73, psfTotal: 1459.61,
            source: 'developer-price-sheet',
            sourceDetail: 'Developer Pricing Sheet — January 2026',
            dateRecorded: '2026-01-15',
            pricePerFloor: 50000,
            notes: 'Floor premium: +$600K over FL 31 (12 floors × $50K/floor)',
          },
        ],
      },

      // ── RESIDENCE 04 (3BR/3.5BA, 2651 living SF, 164 terrace, 2815 total) ──
      {
        unit: '2204', floor: 22, residenceType: 'Residence 04',
        bedrooms: 3, bathrooms: '3/1', livingSF: 2651, terraceSF: 164, totalSF: 2815,
        currentPrice: 3275000, currentPsfLiving: 1235.38, currentPsfTotal: 1163.41,
        trend: 'stable',
        priceHistory: [
          {
            price: 3275000, psfLiving: 1235.38, psfTotal: 1163.41,
            source: 'developer-price-sheet',
            sourceDetail: 'Developer Pricing Sheet — January 2026',
            dateRecorded: '2026-01-15',
            notes: 'Base floor Residence 04',
          },
        ],
      },
      {
        unit: '3004', floor: 30, residenceType: 'Residence 04',
        bedrooms: 3, bathrooms: '3/1', livingSF: 2651, terraceSF: 164, totalSF: 2815,
        currentPrice: 3700000, currentPsfLiving: 1395.70, currentPsfTotal: 1314.39,
        trend: 'stable',
        priceHistory: [
          {
            price: 3700000, psfLiving: 1395.70, psfTotal: 1314.39,
            source: 'mls-listing',
            sourceDetail: 'Stellar MLS — Smith & Associates',
            dateRecorded: '2026-02-01',
            mlsNumber: 'TB8451349',
            status: 'active',
            pricePerFloor: 53125,
            notes: 'New unit — MLS-only unit. +$425K over 2204 (8 floors × $53,125)',
          },
        ],
      },
      {
        unit: '3404', floor: 34, residenceType: 'Residence 04',
        bedrooms: 3, bathrooms: '3/1', livingSF: 2651, terraceSF: 164, totalSF: 2815,
        currentPrice: 3900000, currentPsfLiving: 1471.14, currentPsfTotal: 1385.44,
        trend: 'down', trendPercent: -1.89,
        priceHistory: [
          {
            price: 3975000, psfLiving: 1499.43, psfTotal: 1412.08,
            source: 'mls-listing',
            sourceDetail: 'Stellar MLS — Smith & Associates',
            dateRecorded: '2025-08-01',
            mlsNumber: 'TB8429757',
            status: 'withdrawn',
            notes: 'MLS listed $75K ABOVE developer sheet (+1.92%). Listing withdrawn 11/25/2025.',
          },
          {
            price: 3900000, psfLiving: 1471.14, psfTotal: 1385.44,
            source: 'developer-featured-availability',
            sourceDetail: 'Developer Featured Availability — January 2026',
            dateRecorded: '2026-01-15',
            pricePerFloor: 50000,
            notes: 'PRICE DECREASE: Reappeared on developer Featured Availability at $3,900,000 — $75K below prior MLS price of $3,975,000 (−1.89%). Floor premium: +$625K over FL 22 (12 floors avg). Unit was listed on MLS via Smith & Associates, withdrawn 11/25/2025, then relisted by developer at developer sheet price. One of two documented price decreases in the Waldorf Astoria inventory.',
          },
        ],
      },
      {
        unit: '4604', floor: 46, residenceType: 'Residence 04',
        bedrooms: 3, bathrooms: '3/1', livingSF: 2651, terraceSF: 164, totalSF: 2815,
        currentPrice: 4500000, currentPsfLiving: 1697.47, currentPsfTotal: 1598.58,
        trend: 'stable',
        priceHistory: [
          {
            price: 4500000, psfLiving: 1697.47, psfTotal: 1598.58,
            source: 'developer-price-sheet',
            sourceDetail: 'Developer Pricing Sheet — January 2026',
            dateRecorded: '2026-01-15',
            pricePerFloor: 50000,
            notes: 'Floor premium: +$600K over FL 34 (12 floors × $50K/floor)',
          },
        ],
      },

      // ── RESIDENCE 05 (2BR/2.5BA, 1943 living SF, 180 terrace, 2123 total) ──
      {
        unit: '2605', floor: 26, residenceType: 'Residence 05',
        bedrooms: 2, bathrooms: '2/1', livingSF: 1943, terraceSF: 180, totalSF: 2123,
        currentPrice: 2700000, currentPsfLiving: 1389.60, currentPsfTotal: 1271.79,
        trend: 'stable',
        priceHistory: [
          {
            price: 2700000, psfLiving: 1389.60, psfTotal: 1271.79,
            source: 'developer-price-sheet',
            sourceDetail: 'Developer Pricing Sheet — January 2026',
            dateRecorded: '2026-01-15',
            notes: 'Base floor Residence 05',
          },
        ],
      },
      {
        unit: '3505', floor: 35, residenceType: 'Residence 05',
        bedrooms: 2, bathrooms: '2/1', livingSF: 1943, terraceSF: 180, totalSF: 2123,
        currentPrice: 3150000, currentPsfLiving: 1621.20, currentPsfTotal: 1483.75,
        trend: 'stable',
        priceHistory: [
          {
            price: 3150000, psfLiving: 1621.20, psfTotal: 1483.75,
            source: 'developer-price-sheet',
            sourceDetail: 'Developer Pricing Sheet — January 2026',
            dateRecorded: '2026-01-15',
            pricePerFloor: 50000,
            notes: 'Floor premium: +$450K over FL 26 (9 floors × $50K/floor)',
          },
        ],
      },
      {
        unit: '4505', floor: 45, residenceType: 'Residence 05',
        bedrooms: 2, bathrooms: '2/1', livingSF: 1943, terraceSF: 180, totalSF: 2123,
        currentPrice: 3650000, currentPsfLiving: 1878.54, currentPsfTotal: 1719.27,
        trend: 'stable', trendPercent: 0,
        priceHistory: [
          {
            price: 3650000, psfLiving: 1878.54, psfTotal: 1719.27,
            source: 'developer-price-sheet',
            sourceDetail: 'Developer Pricing Sheet — January 2026',
            dateRecorded: '2026-01-15',
            pricePerFloor: 50000,
            notes: 'Floor premium: +$500K over FL 35 (10 floors × $50K/floor)',
          },
          {
            price: 3650000, psfLiving: 1878.54, psfTotal: 1719.27,
            source: 'mls-listing',
            sourceDetail: 'Stellar MLS — Smith & Associates',
            dateRecorded: '2026-02-01',
            mlsNumber: 'TB8429740',
            status: 'active',
            notes: 'MLS price matches developer sheet — no change. Highest PSF in ladder ($1,879/SF)',
          },
        ],
      },

      // ── RESIDENCE 06 (3BR/3.5BA, 2989 living SF, 361 terrace, 3350 total) ──
      {
        unit: '2106', floor: 21, residenceType: 'Residence 06',
        bedrooms: 3, bathrooms: '3/1', livingSF: 2989, terraceSF: 361, totalSF: 3350,
        currentPrice: 3750000, currentPsfLiving: 1254.60, currentPsfTotal: 1119.40,
        trend: 'stable', trendPercent: 0,
        priceHistory: [
          {
            price: 3750000, psfLiving: 1254.60, psfTotal: 1119.40,
            source: 'developer-price-sheet',
            sourceDetail: 'Developer Pricing Sheet — January 2026',
            dateRecorded: '2026-01-15',
            notes: 'Base floor Residence 06. Lowest PSF in ladder ($1,255/SF)',
          },
          {
            price: 3750000, psfLiving: 1254.60, psfTotal: 1119.40,
            source: 'mls-listing',
            sourceDetail: 'Stellar MLS — Smith & Associates',
            dateRecorded: '2026-02-01',
            mlsNumber: 'TB8429752',
            status: 'active',
            notes: 'MLS price matches developer sheet — no change',
          },
        ],
      },
      {
        unit: '3306', floor: 33, residenceType: 'Residence 06',
        bedrooms: 3, bathrooms: '3/1', livingSF: 2989, terraceSF: 361, totalSF: 3350,
        currentPrice: 4350000, currentPsfLiving: 1455.34, currentPsfTotal: 1298.51,
        trend: 'stable',
        priceHistory: [
          {
            price: 4350000, psfLiving: 1455.34, psfTotal: 1298.51,
            source: 'developer-price-sheet',
            sourceDetail: 'Developer Pricing Sheet — January 2026',
            dateRecorded: '2026-01-15',
            pricePerFloor: 50000,
            notes: 'Floor premium: +$600K over FL 21 (12 floors × $50K/floor)',
          },
        ],
      },
      {
        unit: '4306', floor: 43, residenceType: 'Residence 06',
        bedrooms: 3, bathrooms: '3/1', livingSF: 2989, terraceSF: 361, totalSF: 3350,
        currentPrice: 5175000, currentPsfLiving: 1731.35, currentPsfTotal: 1544.78,
        trend: 'stable',
        priceHistory: [
          {
            price: 5175000, psfLiving: 1731.35, psfTotal: 1544.78,
            source: 'developer-price-sheet',
            sourceDetail: 'Developer Pricing Sheet — January 2026',
            dateRecorded: '2026-01-15',
            pricePerFloor: 82500,
            notes: 'Floor premium: +$825K over FL 33 (10 floors × $82,500/floor) — accelerating premium at height',
          },
        ],
      },

      // ── PENTHOUSE (4BR/4.5BA, 3772 living SF — NEW March 2026) ──────────────
      {
        unit: '4502', floor: 45, residenceType: 'Penthouse',
        bedrooms: 4, bathrooms: '4/1', livingSF: 3772, terraceSF: 0, totalSF: 3772,
        currentPrice: 6700000, currentPsfLiving: 1776.25, currentPsfTotal: 1776.25,
        trend: 'stable',
        priceHistory: [
          {
            price: 6700000, psfLiving: 1776.25, psfTotal: 1776.25,
            source: 'mls-listing',
            sourceDetail: 'Stellar MLS — Smith & Associates (Stacey Borsik Niebles)',
            dateRecorded: '2026-03-18',
            mlsNumber: 'TB8486104',
            status: 'active',
            notes: 'NEW LISTING — March 2026. First 4BR penthouse on MLS. 3,772 SF at $1,776/SF. Position 02 stack, penthouse floor. Second-highest priced unit ever listed (after $27M duplex penthouse). 8 DOM as of data pull.',
          },
        ],
      },
    ],
    dataSources: [
      {
        source: 'developer-price-sheet',
        count: 18,
        dateRange: { earliest: '2026-01-15', latest: '2026-01-15' },
      },
      {
        source: 'mls-listing',
        count: 13,  // Updated: +2 new listings (2902, 4502) + 2 status changes (2702 cancelled, 3103/3404 confirmed)
        dateRange: { earliest: '2026-02-01', latest: '2026-03-24' },
      },
    ],
    transparencyNote:
      'Two units (3103 and 3404) have documented price decreases from prior MLS listings. Four MLS cancellations (2302, 2702, 3103, 3404) are interpreted as executed buyer contracts — developer cancels MLS when buyer signs. Unit 2702 went under contract between Feb–Mar 2026 (26 DOM — fastest Res 02 absorption). Two new units (2902 at $2.9M, 4502 penthouse at $6.7M) appeared in March 2026 as replacement inventory. All prices stable — no price changes detected Feb → Mar 2026. Full provenance tracked in Pricing Ladder below.',
  } satisfies PricingLadder,

  // ─── MLS Active Inventory Intelligence (Pre-Sales — NOT tail inventory) ─────
  // NOTE: Waldorf is pre-construction. No units have closed. No resales exist.
  // "Tail inventory" only applies to delivered buildings with developer remnants + owner resales.
  // This section tracks ACTIVE MLS LISTINGS for pre-sale contract intelligence.
  tailInventory: {
    totalUnits: 163,
    developerUnitsRemaining: 105, // Updated: $175M+ in sales → ~58 contracted (Smith & Associates, Apr 7 2026)
    developerAskingPsf: 1553,     // Avg LP/SF of 6 active developer MLS listings (Jun 2026), range $1,306–$1,879/SF
    resaleListings: 0,            // ZERO — pre-construction, no closings, no resales possible
    daysOnMarketAvg: 60,          // Avg CDOM across 6 active listings (Jun 2026)
    keyInsights: [
      '7 active MLS listings ($2.9M–$6.7M, avg $1,503/SF). All by Smith & Associates (Golub, Bolla, Borsik Niebles).',
      '4 cancelled listings = 4 executed contracts (~$13.1M). Developer cancels MLS when buyer signs.',
      'Unit 2702 contracted in 26 DOM (Feb–Mar 2026) — fastest Res 02 absorption. Replacement unit 2902 listed immediately.',
      'Unit 4502: first 4BR penthouse on MLS (3,772 SF, $1,776/SF, $6.7M) — 8 DOM.',
      '$237,500/floor premium on Res 02 stack (FL29→FL45). Steepest floor premium in Tampa Bay.',
      '3 stale listings at 200+ DOM (Units 4505, 2106, 2301) — price resistance at $3.65M–$4.35M.',
      'All prices stable Feb→Mar 2026. Developer holding firm — zero discounts detected.',
      '$175M+ total contracted value (Smith & Associates, Apr 7 2026). Premium inventory sold first.',
    ],
  },

  salesMetrics: {
    totalUnits: 163,
    soldUnits: 58,             // Updated Apr 2026: Smith & Associates (David Moyer) confirms "$175M+ in sales secured"
    availableUnits: 105,       // 163 - 58
    soldPercentage: 35.6,      // 58/163. Early sales skewed to premium inventory — 4BR penthouses ($3.75M+), upper floors w/ $237K/floor premiums.
                               // Avg contract ~$3.0M/unit (vs $2.6M 2BR entry) explains $175M ÷ 58 = ~$3.02M blended avg.
    absorptionRate: 4.8,       // ESTIMATED: 58 units over ~12 months (Apr 2025 → Apr 2026) — pending verification from Smith & Associates
    velocity: '~4.8/mo',      // UNVERIFIED — based on $175M ÷ ~$3.0M avg = ~58 units estimate
    selloutEstimate: 'Q2 2028', // At 4.8/mo: 105 remaining ÷ 4.8 = ~22 months from Apr 2026
    contractValue: '$175M+',   // Source: Smith & Associates email (David Moyer, Apr 7 2026)
    launchDate: 'April 25, 2025',
    peakMonth: { month: 'May 2025', units: 6 },
    averageMonthly: 3.0,
    monthlySales: [
      { month: 'Apr 25', unitsSold: 4, cumulative: 4, cumulativePercent: 2.5 },
      { month: 'May 25', unitsSold: 6, cumulative: 10, cumulativePercent: 6.1 },
      { month: 'Jun 25', unitsSold: 3, cumulative: 13, cumulativePercent: 8.0 },
      { month: 'Jul 25', unitsSold: 3, cumulative: 16, cumulativePercent: 9.8 },
      { month: 'Aug 25', unitsSold: 2, cumulative: 18, cumulativePercent: 11.0 },
      { month: 'Sep 25', unitsSold: 4, cumulative: 22, cumulativePercent: 13.5 },
      { month: 'Oct 25', unitsSold: 5, cumulative: 27, cumulativePercent: 16.6 },
      { month: 'Nov 25', unitsSold: 0, cumulative: 27, cumulativePercent: 16.6 },
      { month: 'Dec 25', unitsSold: 0, cumulative: 27, cumulativePercent: 16.6 },
      { month: 'Jan 26', unitsSold: 5, cumulative: 32, cumulativePercent: 19.6 },
      { month: 'Feb 26', unitsSold: 1, cumulative: 33, cumulativePercent: 20.2 },
    ],
  },

  specifications: {
    totalFloors: 50,
    residentialFloors: { from: 20, to: 46 },
    totalResidences: 163,
    heightFeet: 540,
    heightStories: 50,
    unitMix: '2-4 BR',
    floorPlans: { typical: 6, penthouse: 6 },
    ceilingHeight: { typical: '10 ft', penthouse: '~11,000 SF duplex with private rooftop pools' },
    pricePerSqFt: { average: 1553, min: 1306, max: 1879 }, // Stellar MLS avg LP/SqFt (Jun 2026) — 6 active listings
    totalProjectCost: '$500M',
    officeSpaceSF: 73000,
    retailSpaceSF: 10000,
    amenitySpaceSF: 43000,
    poolDeckSF: 20000,
    constructionTimeline: '~30 months from groundbreaking',
    stormResiliency: [
      'Alternate emergency generators',
      'Emergency water barrier systems',
      'Impact-resistant construction standards',
    ],
    floorPlanSpecs: [
      {
        residenceType: 'Residence 01',
        levels: '21-46',
        bedrooms: 3,
        bathrooms: '3.5',
        livingSF: 3408,
        terraceSF: 572,
        totalSF: 3980,
        orientation: 'flowthrough',
        segment: '3 Bed Flowthrough (End Unit)',
      },
      {
        residenceType: 'Residence 02',
        levels: '21-46',
        bedrooms: 2,
        bathrooms: '2.5',
        livingSF: 2031,
        terraceSF: 180,
        totalSF: 2211,
        orientation: 'east',
        segment: '2 Bed East',
      },
      {
        residenceType: 'Residence 03',
        levels: '21-46',
        bedrooms: 3,
        bathrooms: '3.5',
        livingSF: 2583,
        terraceSF: 363,
        totalSF: 2946,
        orientation: 'flowthrough',
        segment: '3 Bed Flowthrough (Interior)',
      },
      {
        residenceType: 'Residence 04',
        levels: '21-46',
        bedrooms: 3,
        bathrooms: '3.5',
        livingSF: 2651,
        terraceSF: 164,
        totalSF: 2815,
        orientation: 'flowthrough',
        segment: '3 Bed Flowthrough (Interior)',
      },
      {
        residenceType: 'Residence 05',
        levels: '21-46',
        bedrooms: 2,
        bathrooms: '2.5',
        livingSF: 1943,
        terraceSF: 180,
        totalSF: 2123,
        orientation: 'east',
        segment: '2 Bed East',
      },
      {
        residenceType: 'Residence 06',
        levels: '21-46',
        bedrooms: 3,
        bathrooms: '3.5',
        livingSF: 2989,
        terraceSF: 361,
        totalSF: 3350,
        orientation: 'flowthrough',
        segment: '3 Bed Flowthrough (End Unit)',
      },
    ],
    amenityHighlights: [
      {
        name: 'Peacock Alley Sky Lounge',
        description: 'Rooftop sunset bar, pool deck, and amenity terrace inspired by Waldorf Astoria\'s historic gathering space',
        level: 'Level 47',
      },
      {
        name: 'Resort-Style Pool Deck',
        description: 'Two infinity-edge pools including 160-ft east pool, dual spas, lounge areas, and poolside bar',
        level: 'Amenity Level',
        sqft: '20,000 SF',
      },
      {
        name: 'Holistic Wellness Center',
        description: 'Private massage rooms, his/her sauna, steam rooms, and state-of-the-art fitness studio',
        level: 'Level 18',
      },
      {
        name: 'Youth Entertainment Club',
        description: 'Dedicated kids and teens entertainment and activity center',
        level: 'Level 18',
      },
      {
        name: 'Golf Simulator',
        description: 'Private golf simulation experience for residents',
      },
      {
        name: 'Pet Spa',
        description: 'Dedicated grooming and pampering facility for resident pets',
      },
      {
        name: 'EV Charging Stations',
        description: 'Electric vehicle charging infrastructure in parking facility',
      },
      {
        name: 'Michelin Dining',
        description: 'Approximately 10,000 SF public restaurant space at street level',
        level: 'Ground Floor',
        sqft: '10,000 SF',
      },
    ],
    airports: [
      { name: 'Albert Whitted Airport', code: 'SPG', driveTime: '3 min', fbo: 'FBO services for private & charter aviation', note: 'City task force recommends eVTOL air taxi readiness (Feb 2026)' },
      { name: 'St. Pete-Clearwater Intl', code: 'PIE', driveTime: '17 min', fbo: 'FBO and private terminal services available' },
      { name: 'Tampa International', code: 'TPA', driveTime: '26 min' },
    ],
  },

  residencePolicies: [
    {
      category: 'Pet Policy',
      icon: 'paw',
      headline: 'Pet Friendly',
      details: ['2 pets max, breed restrictions apply', 'Large pets OK (61-100 lbs)', 'Dedicated pet spa on-site', 'Verify breed restrictions with condo docs'],
    },
    {
      category: 'Rental Policy',
      icon: 'key',
      headline: '1x Per Year',
      details: ['1x per year maximum', '6-month minimum lease period', 'Association approval required', 'Critical for investment buyers — verify with condo docs'],
      advisory: '1x/year rental with 6-month minimum is more restrictive than competitors (Reflection allows 2x/year). Position as exclusivity benefit: maintains resident quality, prevents STR transience. Critical investor disclosure.',
    },
    {
      category: 'Parking',
      icon: 'car',
      headline: '2 Spaces',
      details: ['2 valet spaces included', 'No self-park', 'EV charging stations available', 'Additional spaces: confirm pricing with sales office'],
    },
  ],

  financing: {
    preConstruction: {
      depositPercent: 30,
      balancePercent: 70,
      closingPhase: 'Q4 2030', // MLS Proj Comp Date: 12/31/2030
      preApprovalStrategy: 'Buyers typically secure pre-approval 6-12 months before delivery, not at contract signing',
    },
    jumboLoanParams: {
      minDownPayment: '20-30%',
      creditScoreMin: '700+',
      dtiRatio: '43% or less',
      cashReserves: '12+ months',
    },
    lenders: [
      { name: 'Bank of America Private Bank', specialty: 'Jumbo mortgages for UHNW clients' },
      { name: 'JPMorgan Chase Private Client', specialty: 'Relationship-based luxury financing' },
      { name: 'Wells Fargo Private Mortgage Banking', specialty: 'Jumbo & super-jumbo products' },
      { name: 'Northern Trust', specialty: 'Ultra-high-net-worth lending' },
    ],
    advisory: 'Engage jumbo specialist 12-18 months pre-delivery for docs/reserves. UHNW: portfolio loans via private banks offer flexible underwriting. International buyers: 90-120 day approval timeline.',
  },

  executiveSummary: {
    overview: 'Waldorf Astoria Residences St. Petersburg introduces a new chapter in timeless luxury, where enduring sophistication meets the iconic beauty of Florida\'s Gulf Coast. Poised along the tranquil waters of Tampa Bay, this extraordinary 50-story tower embodies the storied legacy of Waldorf Astoria while embracing the vibrant spirit of St. Petersburg. Rising as the tallest building in the city at 540 feet, this $500M Signal Asset launched sales on April 25, 2025, achieving the fastest absorption of any condominium on the West Coast of Florida. Designed by acclaimed architectural firm Cube 3, with award-winning interior design by BAMO, this landmark residence offers sophisticated design and breathtaking skyline views at $1,400+ PSF\u2014establishing the absolute ceiling for Tampa Bay luxury real estate.',
    marketSignificance: 'Tampa Bay\'s first ultra-luxury branded residence, establishing new pricing tier. $500M total project cost with 73,000 SF Class-A office space and 10,000 SF ground-floor retail. 540\' height/50 stories surpasses 400 Central for skyline dominance. 163 residences across 27 floors (20-46) creates unmatched exclusivity ratio in market. $27M record-setting penthouse validated 80% premium capacity over previous $15M Tampa Bay record.',
    salesPerformance: '$981-$2,316/SF pricing by floor plan/level/view. Fastest-selling condominium on the West Coast of Florida: 33 units (20.2%) sold since April 2025 launch with $100M+ in contracted sales within 10 months. 3.0 units/month pace projects sellout aligned with Q4 2030 delivery (MLS Proj Comp Date 12/31/2030). Majority of buyer interest from within Florida\u2014not northeast or international markets as with Miami.',
    title: 'Signal Asset for Tampa Bay',
    subtitle: 'The intelligence you need to advise UHNW clients on Tampa Bay\u2019s most consequential residential offering.',
    leadNarrative: 'Downtown St.\u00a0Petersburg\u2019s delivered luxury towers \u2014 Art House, 400\u00a0Central, and Reflection \u2014 average between $727\u2013$950\u00a0PSF. Waldorf\u00a0Astoria has established an entirely new pricing tier at $1,503\u00a0avg\u00a0PSF, absorbing $175M+ in contracts within its first twelve months of pre-construction sales.',
    leadNarrativeFollowup: 'This is not a speculative projection. It is a completed transaction set that redefines every luxury comparable in this market. For every agent working a premium listing within 20 miles of this site, these are the numbers that shape your pricing conversations, your client expectations, and your competitive positioning.',
    pullquote: {
      text: '$175M+ in contracted sales absorbed in 12 months at 2\u00d7 market average PSF. Premium inventory absorbing first — the whales came early.',
      attribution: 'Market Intelligence Assessment',
    },
  },

  brandedValue: {
    title: 'The Waldorf Astoria Advantage',
    propositions: [
      {
        title: '24/7 Waldorf Concierge',
        description: 'Hilton-managed operations with dedicated concierge, doorman, valet, bellman, and emergency maintenance. Predictable expense ratios with institutional-grade oversight \u2014 no HOA board surprises.',
      },
      {
        title: '15-25% Resale Premium',
        description: 'Branded residences command 15-25% resale premium vs. non-branded peers. The Waldorf name accelerates marketing, compresses days-on-market, and reduces price negotiation.',
      },
      {
        title: 'Hilton Honors Diamond',
        description: 'Automatic Diamond status with priority access to 8,300+ Hilton properties globally. Room upgrades, executive lounge access, worldwide discounts\u2014tangible lifestyle value your clients will use every quarter.',
      },
    ],
  },

  marketEvidence: [
    {
      metric: 'Record Transaction',
      value: '$27M',
      description: '~11,000 SF duplex penthouse on floors 49-50 set Tampa Bay\'s all-time residential price record within 90 days of sales launch. Features 50-ft rooftop pool and private movie theater. Previous Tampa Bay record: $11.6M (Ritz Carlton Tampa, 2021). Previous St. Pete record: $8.25M.',
    },
    {
      metric: 'Sales Velocity',
      value: '$100M+',
      description: 'Surpassed $100 million in contracted sales within 6 months\u2014the fastest-selling condominium on the West Coast of Florida. At $2.5M entry point (2.5x market average), absorption pace demonstrates deep UHNW demand previously underserved.',
    },
    {
      metric: 'Absorption Rate',
      value: '20.2%',
      description: '33 units sold (20.2% of inventory) in 10 months pre-construction. Comparable branded projects require 12-18 months to reach this threshold\u2014this is accelerated demand. Buyer demographics skew Florida-resident, not northeast/international.',
    },
    {
      metric: 'Branded Residential Portfolio',
      value: '20+',
      description: 'Waldorf Astoria Residences now spans 20+ properties globally. Five existing U.S. locations (New York City, Atlanta Buckhead, Park City, Las Vegas, Chicago) plus 7+ in development including Miami (100-story supertall), Pompano Beach, Denver, Sarasota, Lake Tahoe, and St. Petersburg. International properties include Dubai, Costa Rica, and Los Cabos. St. Petersburg — approved by city council November 2024 — is the first Waldorf Astoria Residences on Florida\'s Gulf Coast, signaling institutional conviction that Tampa Bay luxury demand now warrants the same ultra-premium branding deployed in South Florida and gateway cities.',
    },
    {
      metric: 'MLS Active Inventory',
      value: '7 listings — avg $1,503/SF',
      description:
        '7 active Stellar MLS listings at 150 2nd Ave S (as of March 2026). Price range $2.9M–$6.7M ($1,255–$1,879/SF). Includes first 4BR penthouse listing (Unit 4502 at $6.7M / $1,777/SF — 3,772 SF). 4 cancelled listings indicate executed contracts or strategic repositioning. Avg CDOM 129 days. All listed by Smith & Associates (Golub, Bolla, Borsik Niebles). Year built 2026 — pre-construction inventory on MLS ahead of Q4 2030 delivery.',
    },
    {
      metric: 'HOA / Condo Fees',
      value: '$1.40/SF/mo',
      description:
        'Fixed rate of $1.40 per square foot per month, billed quarterly. Monthly amounts vary by unit size: 2BR (1,943 SF) ~$2,720/mo, 2BR (2,031 SF) ~$2,843/mo, 3BR (2,651 SF) ~$3,711/mo, 3BR end unit (2,989 SF) ~$4,185/mo, 3BR flowthrough (3,408 SF) ~$4,771/mo. Fee includes 24-hour guard, pool maintenance, security, common area taxes, escrow reserves, and manager.',
    },
  ],

  competitors: [
    {
      name: 'Waldorf Astoria',
      height: "540' / 50 FL",
      units: 163,
      avgPsf: '$1,255 - $1,879',
      delivery: 'Q4 2030',
      status: '20.2% Sold (33 units)',
      isFeatured: true,
    },
    {
      name: '400 Central',
      height: "520' / 44 FL",
      units: 301,
      avgPsf: '$961',
      delivery: 'Available Now',
      status: '74.1% Sold (223 units)',
    },
    {
      name: 'Roche Bobois',
      height: '29 FL',
      units: 164,
      avgPsf: '$1,433',
      delivery: 'Jan 2029',
      status: 'Pre-Sales (40+ contracts)',
    },
    {
      name: 'Art House',
      height: '42 FL',
      units: 244,
      avgPsf: '$877',
      delivery: 'Available Now',
      status: '86.9% Sold (212 units)',
    },
    {
      name: 'Pendry Tampa',
      height: '38 FL',
      units: 207,
      avgPsf: '$1,397',
      delivery: 'Late 2026',
      status: 'Under Construction',
    },
    {
      name: 'Tampa EDITION',
      height: '26 FL',
      units: 37,
      avgPsf: '$1,547',
      delivery: 'Available Now',
      status: 'Available Now — 3 Resale',
    },
    {
      name: 'Viceroy Clearwater',
      height: '9 FL (twin towers)',
      units: 86,
      avgPsf: '$1,198',
      delivery: 'Q1 2028',
      status: 'Pre-Sales (1 pending, 5 contracted)',
    },
  ],

  marketNarrative: [
    'Downtown St. Petersburg\u2019s delivered luxury towers (Art House, 400 Central) average $877\u2013$950 PSF. Waldorf Astoria has established an entirely new pricing tier at $1,503 avg PSF \u2014 a 64% premium over the delivered market average \u2014 with $113M+ in contracts absorbed in its first 12 months of pre-construction sales (33 confirmed sold + 4 cancelled MLS listings indicating executed contracts).',
    'Waldorf is no longer alone at the top. Roche Bobois ($1,433/SF), Pendry Tampa ($1,397/SF), Tampa EDITION ($1,547/SF closed), and Viceroy Clearwater ($1,198/SF) form a new competitive ultra-luxury cohort. The branded residence market in Tampa Bay now has 7 distinct projects \u2014 more than Miami had in 2019.',
    'For advisors working adjacent premium inventory, these are not abstract figures. They are the new comparables that shape your pricing strategy, your client conversations, and your market positioning.',
  ],

  advisoryInsights: [
    {
      title: 'For Buyer Advisors',
      content: 'The $27M record penthouse transaction validates an ultra-luxury tier that did not exist in Tampa Bay 18 months ago. Your UHNW clients no longer need to look to Miami for branded residence caliber product. Pre-construction entry at current pricing offers 15\u201325% brand premium protection by the time units deliver in 2030.',
    },
    {
      title: 'For Listing Advisors',
      content: '$100M+ in developer contracts absorbed in 6 months at 2.5\u00d7 market average PSF. This is the new pricing ceiling for downtown St. Petersburg. Use this absorption data to strengthen comparable analysis for your own premium listings \u2014 whether at ONE St. Pete, Saltaire, 400 Central, or surrounding resale inventory. Every luxury listing in this market now prices relative to this benchmark.',
    },
    {
      title: 'The Bigger Picture',
      content: 'Tampa Bay\u2019s luxury condo market has seen PSF grow 42% over five years. Resale inventory downtown is down 34% year-over-year \u2014 driven partly by two towers completing 3\u20134\u00a0year build cycles simultaneously, creating tail inventory in delivered buildings rather than a pure demand squeeze. Luxury transactions ($1M+) are up 9.5% and population growth at 2.1% outpaces the national average by 4\u00d7. Demand is real, but advisors should frame the inventory shift accurately: delivery-cycle dynamics are compressing resale supply while new construction absorbs at record price points.',
    },
  ],

  locationCategories: [
    {
      name: 'Dining & Gastronomy',
      icon: 'utensils',
      venues: [
        { name: 'Gratzzi Italian Grille', description: 'Top-tier authentic Italian', distance: '400 ft from lobby' },
        { name: 'IL Ritorno', description: 'James Beard-nominated, upscale handmade pastas and wood-fired dishes', distance: '0.2 miles', walkTime: '3 min' },
        { name: 'Cassis', description: 'French-American bistro, scenic bayfront terrace and craft cocktails', distance: '0.3 miles', walkTime: '5 min' },
        { name: 'Rococo Steak', description: 'Classic steakhouse in stunning 1920s-era building', distance: '0.3 miles' },
        { name: 'Allelo', description: 'Mediterranean-influenced, current darling of fine dining scene', distance: '0.4 miles', walkTime: '7 min' },
        { name: 'Brick & Mortar', description: 'Rustic-chic seasonal New American dishes', distance: '0.3 miles' },
        { name: 'Stillwater Tavern', description: 'Modern American tavern', distance: '0.3 miles' },
        { name: 'The Birchwood', description: 'Rooftop dining with waterfront views, Michelin Guide recognized', distance: '0.3 miles', walkTime: '5 min' },
      ],
    },
    {
      name: 'Culture & Museums',
      icon: 'palette',
      venues: [
        { name: 'The James Museum', description: '$75M collection of Western and Wildlife Art', distance: 'Across the street' },
        { name: 'Museum of Fine Arts', description: '20,000+ works spanning 5,000 years', distance: '0.4 miles', walkTime: '8 min' },
        { name: 'The Dal\u00ed Museum', description: 'Largest collection of Dal\u00ed\'s work outside Europe', distance: '0.5 miles', walkTime: '10 min' },
        { name: 'Imagine Museum', description: 'Contemporary glass art museum', distance: '1.2 miles' },
        { name: 'Florida Holocaust Museum', description: 'One of the largest in the United States', distance: '0.4 miles' },
        { name: 'Dr. Carter G. Woodson Museum', description: 'African American history and culture', distance: '1.5 miles' },
      ],
    },
    {
      name: 'Parks & Waterfront',
      icon: 'tree',
      venues: [
        { name: 'St. Pete Pier', description: '$92M engineering marvel, 2-mile waterfront loop', distance: '0.5 miles', walkTime: '10 min' },
        { name: 'North & South Straub Parks', description: 'City\'s front yard, major event access', distance: 'Adjacent' },
        { name: 'Vinoy Park', description: '15-acre bayfront park with events and marina views', distance: '0.6 miles' },
        { name: 'Williams Park', description: 'Historic downtown park with live events', distance: '0.2 miles' },
        { name: 'Pinellas Trail', description: '75-mile paved cycling and walking trail connecting beaches, Gulfport, and Tarpon Springs — trailhead 1 block from building', distance: '1 block', walkTime: '2 min' },
      ],
    },
    {
      name: 'Social & Nautical',
      icon: 'anchor',
      venues: [
        { name: 'St. Petersburg Yacht Club', description: 'Established 1907, exclusive dining and world-class yachting', distance: '0.3 miles' },
        { name: 'Vinoy Marina', description: 'Premier docking with Vinoy Resort amenities', distance: '0.6 miles' },
        { name: 'Albert Whitted Airport', description: 'FBO services for private aviation, eVTOL air taxi readiness underway', distance: '0.5 miles' },
        { name: 'The Vinoy Renaissance Resort', description: 'Historic 1925 landmark resort, private club dining, spa, and marina', distance: '0.5 miles', walkTime: '10 min' },
        { name: 'Cross-Bay Ferry', description: 'Passenger ferry to downtown Tampa, scenic 50-minute crossing', distance: '0.5 miles', walkTime: '10 min' },
      ],
    },
    {
      name: 'Entertainment & Nightlife',
      icon: 'music',
      venues: [
        { name: 'Mahaffey Theater (Duke Energy)', description: 'Major performing arts and concert venue', distance: '0.4 miles' },
        { name: 'Jannus Live', description: 'Iconic outdoor concert venue in downtown courtyard', distance: '0.3 miles' },
        { name: 'American Stage', description: 'Tampa Bay\'s longest-running professional theater', distance: '0.3 miles' },
        { name: 'The Floridian Social Club', description: 'Live music and social events venue', distance: '0.3 miles' },
        { name: 'Al Lang Stadium', description: 'Home of Tampa Bay Rowdies (USL), waterfront concerts and major events', distance: '0.4 miles', walkTime: '8 min' },
        { name: 'Tropicana Field', description: 'Future mixed-use redevelopment — new MLB stadium, 6M+ SF master plan', distance: '0.8 miles', walkTime: '15 min' },
      ],
    },
    {
      name: 'Wellness & Retail',
      icon: 'spa',
      venues: [
        { name: 'Woodhouse Spa', description: 'HydraFacials, volcanic stone massages, private suites', distance: '0.2 miles' },
        { name: 'Jackie Z Style Co', description: 'Premier fashion, designer brands, personal styling', distance: '0.3 miles' },
        { name: 'Sundial St. Pete', description: 'Open-air shopping, dining, and entertainment complex', distance: '0.2 miles' },
      ],
    },
    {
      name: 'Medical Security',
      icon: 'hospital',
      venues: [
        { name: 'Bayfront Health', description: 'Level II Trauma Center, 24/7 emergency', distance: '0.5 miles' },
        { name: 'Johns Hopkins All Children\'s', description: 'World-class pediatric, nationally ranked', distance: '0.6 miles' },
        { name: 'St. Anthony\'s Hospital', description: 'Premier heart & vascular center', distance: '1.1 miles' },
      ],
    },
  ],

  locationScores: [
    { label: 'Walk Score', score: 97, descriptor: "Walker's Paradise" },
    { label: 'Bike Score', score: 94, descriptor: 'Very Bikeable' },
    { label: 'Transit Score', score: 66, descriptor: 'Good Transit' },
    { label: 'Cultural Score', score: 95, descriptor: 'World-Class Arts' },
    { label: 'Restaurant Score', score: 98, descriptor: 'Culinary Capital' },
    { label: 'Hospital Score', score: 85, descriptor: 'Medical Access' },
  ],

  locationEyebrow: 'The Golden Triangle',

  locationInsight: {
    title: 'Why This Location Is Globally Rare',
    paragraphs: [
      'Few addresses in the United States \u2014 or the world \u2014 place Michelin-recognized dining, world-class museums, a waterfront promenade, championship soccer, a 75-mile cycling trail, and private yacht club access all within a 10-minute walk of the lobby.',
      'Add a passenger ferry to a neighboring major city, private aviation minutes away, and a Walk Score of 97 \u2014 and the convergence is virtually unmatched at this price point in any U.S. luxury condo market.',
    ],
    highlights: [
      '9 walkable fine-dining restaurants including 2 Michelin-recognized',
      '6 museums and cultural institutions within 0.5 miles',
      'Pinellas Trail trailhead 1 block away \u2014 75 miles to beaches and Gulfport',
      'Cross-Bay Ferry to Tampa + private aviation at Albert Whitted',
      'Walk Score 97 \u2022 Bike Score 94 \u2022 Cultural Score 95',
    ],
  },

  visionaries: [
    {
      role: 'Developer',
      companies: [
        {
          name: 'Property Markets Group',
          description: 'Founded by Kevin Maloney in 1991, PMG has completed over 150 real estate transactions including over 80 residential buildings in Manhattan. Led by Managing Partners Ryan Shear and Dan Kaplan, PMG\'s portfolio includes 111 W. 57th St. on Billionaire\'s Row\u2014the second tallest residential building in the Western Hemisphere at 1,428 feet.',
          quote: 'It\'s going to change St. Pete, no question. Once we get this up and prove our price point, I think you\'re going to see other luxury brands come into the city.',
          quoteAttribution: 'Kevin Maloney, Founder & CEO, PMG',
        },
        {
          name: 'Feldman Equities',
          description: 'Over 40 years developing and acquiring 11M+ SF of commercial real estate with aggregate value exceeding $3B. Currently owns and manages 2.5 million SF of Class-A commercial space in Florida, including the City Center building at the Waldorf site.',
          quote: 'The waterfront lifestyle here is extraordinary. This is the next frontier for luxury in Florida.',
          quoteAttribution: 'Larry Feldman, Feldman Equities',
        },
        {
          name: 'City Office REIT',
          description: 'Publicly traded REIT and joint venture partner. Co-owner of the City Center office building at 100 2nd Ave. S with Feldman Equities and Tower Realty Partners.',
        },
      ],
    },
    {
      role: 'Architect',
      companies: [
        {
          name: 'Cube 3',
          description: 'Dynamic design team providing innovative solutions for architectural and planning challenges. Designed the tower with a narrow podium separating amenity deck and residences from lower floors, creating the illusion that the residential tower floats above the city.',
        },
      ],
    },
    {
      role: 'Interior Design',
      companies: [
        {
          name: 'BAMO',
          description: 'Over 30 years creating captivating environments worldwide. Curated fully finished residences with custom-built closets, ITALKRAFT cabinetry, marble countertops and backsplash, Italian bathroom vanities, and smart home technologies. Trusted worldwide for interpretive skill matched by rigor and ingenuity.',
          quote: 'We listen for the unspoken needs. Every surface, every material is chosen to create an environment of effortless sophistication.',
          quoteAttribution: 'Anne Wilkinson, Principal, BAMO',
        },
      ],
    },
  ],

  timeline: [
    {
      date: 'November 2024',
      title: 'City Council Approval',
      description: 'St. Petersburg City Council unanimously approved the landmark development. Originally proposed at 49 stories, later increased to 50.',
      status: 'completed',
    },
    {
      date: 'April 25, 2025',
      title: 'Sales Launch',
      description: 'Whisper campaign began April 25, with hard launch following shortly after. Sales gallery opened at City Center, 100 2nd Ave S. Three contracts processed during whisper phase alone.',
      status: 'completed',
    },
    {
      date: 'July 22, 2025',
      title: '$27M Record Penthouse',
      description: 'Duplex penthouse on floors 49-50 sold for $27M\u2014a new Tampa Bay all-time residential price record. Nearly 11,000 SF with 50-ft rooftop pool and private movie theater.',
      status: 'completed',
    },
    {
      date: 'July 23, 2025',
      title: 'First 89 Days — 16 Units Sold',
      description: '16 units (9.8% of inventory) absorbed in the first 89 days of sales. Pace exceeded comparable branded pre-construction projects which typically require 12–18 months to reach this threshold.',
      absorption: '16 units (9.8%)',
      status: 'completed',
    },
    {
      date: 'October 15, 2025',
      title: '$100M Milestone',
      description: 'Surpassed $100 million in contracted presales — the fastest-selling condominium on the West Coast of Florida.',
      absorption: '27 units (16.6%) - 6 months',
      status: 'completed',
    },
    {
      date: 'April 7, 2026',
      title: '$175M+ Milestone',
      description: 'Smith & Associates (David Moyer) confirms $175M+ in total contracted sales — 75% increase over the $100M milestone in just 6 months. Premium inventory absorbing first: upper floors and 4BR penthouses at $3.75M+ drove the average contract to ~$3.0M vs $2.6M 2BR entry price.',
      absorption: '~58 units (35.6%) - 12 months',
      status: 'active',
    },
    {
      date: 'TBD',
      title: 'Projected Groundbreaking',
      description: 'Construction expected to begin pending sales velocity milestones. Approximately 30 months of construction once started.',
      status: 'upcoming',
    },
    {
      date: 'Q2 2028',
      title: 'Projected Sellout',
      description: 'At ~4.8 units/month velocity, 105 remaining units project to sell out by Q2 2028 — 2 years ahead of the original Q4 2030 estimate.',
      absorption: '163 units (100%) - projected',
      status: 'upcoming',
    },
  ],

  penthouse: {
    price: '$27M',
    sqft: '~11,000 SF',
    floors: 'Duplex on Floors 49-50',
    features: [
      '50-foot private rooftop pool',
      'Private movie theater',
      'Unobstructed panoramic bay views',
      'Two full stories of living space',
    ],
    recordNote: 'Set Tampa Bay all-time residential price record on July 22, 2025. Previous Tampa Bay record: $11.6M (Ritz Carlton Tampa, 2021). Previous St. Pete record: $8.25M.',
  },

  pressHighlights: [
    {
      source: 'Bloomberg',
      date: 'July 22, 2025',
      headline: 'Waldorf Astoria Penthouse Near Tampa Sold for Record $27 Million',
      quote: 'There\'s a race starting for who can put out high-end branded condos in the cities on Florida\'s West Coast.',
      quoteAttribution: 'Ryan Shear, Managing Partner, PMG',
    },
    {
      source: 'Tampa Bay Business Journal',
      date: 'October 15, 2025',
      headline: 'Waldorf Astoria Residences hits $100M presale milestone',
      quote: 'The fastest-selling condominium on the West Coast of Florida.',
      quoteAttribution: 'David Moyer, Smith & Associates',
    },
    {
      source: 'Forbes',
      date: 'April 29, 2025',
      headline: 'South Florida\'s Real Estate Center of Gravity Is Finally Moving West',
    },
    {
      source: 'St. Pete Catalyst',
      date: 'April 30, 2025',
      headline: 'Waldorf Astoria St. Pete is now a $500 million project',
      quote: 'I think this is going to be that landmark building for Tampa Bay and St. Pete.',
      quoteAttribution: 'Jon Glickman, Acquisition Director, PMG',
    },
    {
      source: 'Tampa Bay Times',
      date: 'April 30, 2025',
      headline: 'Sales launch at Waldorf Astoria condos, St. Petersburg\'s new tallest tower',
      quote: 'Once we get this up and prove our price point, I think you\'re going to see other luxury brands come into the city.',
      quoteAttribution: 'Kevin Maloney, Founder & CEO, PMG',
    },
    {
      source: 'St. Pete Rising',
      date: 'February 20, 2026',
      headline: 'St. Pete Lays Groundwork for Air Taxis at Albert Whitted Airport',
      quote: 'the next transformational chapter of aviation',
      quoteAttribution: 'Ed Montanari, Chair, Advanced Air Mobility Task Force',
    },
  ],

  sourceNotes: [
    {
      category: 'Delivery Timeline',
      field: 'deliveryDate',
      note: 'Delivery date varies across sources. Fact Sheet states "2028–2029" while Forbes (April 2025) states "2030." Construction timeline is ~30 months from groundbreaking.',
      sources: [
        { name: 'Fact Sheet', value: '2028-2029' },
        { name: 'Forbes (April 29, 2025)', value: '2030' },
        { name: 'St. Pete Catalyst (April 30, 2025)', value: '2029-2030 range implied' },
      ],
      resolution: 'Q4 2030 used per MLS Proj Comp Date (12/31/2030) — supersedes earlier Forbes estimate.',
    },
    {
      category: 'Developer Profile',
      field: 'Feldman Equities — Years & SF',
      note: 'Official sales materials contain conflicting figures for Feldman Equities\' experience and portfolio size.',
      sources: [
        { name: 'Fact Sheet', value: 'Past 30 years; 2 million SF Class-A' },
        { name: 'Brochure', value: 'Past 40 years; 2.5 million SF Class-A' },
      ],
      resolution: 'Brochure figures used (40 years, 2.5M SF) — newer publication with "Currently" qualifier to signal point-in-time data.',
    },
    {
      category: 'Developer Profile',
      field: 'PMG — Transaction Count',
      note: 'Official sales materials cite different PMG project counts.',
      sources: [
        { name: 'Fact Sheet', value: '175 projects across 30 markets' },
        { name: 'Brochure', value: '150+ transactions including 80+ Manhattan buildings' },
      ],
      resolution: 'Brochure language used — more specific and consistent with PMG public materials.',
    },
    {
      category: 'Penthouse',
      field: 'penthouse.sqft',
      note: 'Penthouse square footage is reported as approximate across all sources.',
      sources: [
        { name: 'Bloomberg', value: 'Nearly 11,000 SF' },
        { name: 'Forbes', value: '~11,000 SF' },
        { name: 'Fact Sheet', value: 'Not specified (penthouse not on standard floor plans)' },
      ],
      resolution: '~11,000 SF used with tilde to indicate approximate figure. Exact SF unavailable — penthouses are custom configurations.',
    },
    {
      category: 'Building Address',
      field: 'address',
      note: 'City Center (existing building on site) is 100 2nd Ave S. Waldorf tower address may differ upon completion.',
      sources: [
        { name: 'Sales Gallery', value: '100 2nd Ave S (City Center building)' },
        { name: 'Fact Sheet', value: '150 2nd Avenue South' },
      ],
      resolution: '150 2nd Avenue South used per Fact Sheet — the designated address for the new tower.',
    },
    {
      category: 'Amenity Level',
      field: 'amenityHighlights[].level',
      note: 'Amenity deck floor level not explicitly stated in official sales materials. Press articles reference 18th floor.',
      sources: [
        { name: 'St. Pete Catalyst', value: '18th-floor amenity suite' },
        { name: 'Tampa Bay Times', value: '18th-floor amenity deck' },
        { name: 'Fact Sheet', value: 'Not explicitly stated' },
      ],
      resolution: 'Level 18 used per press consensus. Confirm with sales office for final floor assignment.',
    },
    {
      category: 'Pricing',
      field: 'residencePricing',
      note: 'Pricing reflects the developer\'s January 2026 pre-construction price sheet. Prices are subject to change and vary by floor, view, and availability.',
      sources: [
        { name: 'Developer Pricing Sheet', value: 'Pre-construction pricing as of January 2026' },
      ],
      resolution: 'All pricing shown with advisory that it represents developer sheet rates subject to change. Contact sales office for current availability.',
    },
    {
      category: 'Pricing',
      field: 'priceDecreases',
      note: 'Two units (3103 and 3404) show documented price decreases. Both were listed on Stellar MLS via Smith & Associates at premiums above the developer pricing sheet — unit 3103 at $3,725,000 (+$25K / +0.68%) and unit 3404 at $3,975,000 (+$75K / +1.92%). Both MLS listings were withdrawn on 11/25/2025. In January 2026, both units reappeared on the developer\'s Featured Availability price list at their original sheet prices ($3,700,000 and $3,900,000 respectively), representing effective price decreases of $25K and $75K from their most recent asking prices. This is significant because price decreases in a pre-construction luxury development are uncommon and suggest the MLS premiums tested the ceiling of market tolerance for these specific floor/residence combinations.',
      sources: [
        { name: 'Stellar MLS — TB8429709', value: 'Unit 3103: Listed $3,725,000, withdrawn 11/25/2025' },
        { name: 'Stellar MLS — TB8429757', value: 'Unit 3404: Listed $3,975,000, withdrawn 11/25/2025' },
        { name: 'Developer Featured Availability', value: 'Both units re-listed at developer sheet prices (Jan 2026)' },
      ],
      resolution: 'Both units priced at developer sheet prices ($3,700,000 and $3,900,000). MLS premium experiment appears to have been abandoned. Price trend marked as "down" in pricing ladder with full provenance documented.',
    },
  ],

  residenceFeatures: {
    kitchen: [
      'Sub-Zero refrigeration',
      'Wolf cooking appliances',
      'ITALKRAFT cabinetry',
      'Marble countertops and backsplash',
      'Premium fixtures and hardware',
    ],
    bathroom: [
      'Waterworks fixtures throughout',
      'Italian bathroom vanities',
      'Stone countertops and surfaces',
      'Frameless glass shower enclosures',
      'Soaking tubs in primary bathrooms',
    ],
    smartHome: [
      'Pre-wired smart home technology',
      'Integrated lighting control systems',
      'Climate control automation',
      'Digital entry systems',
    ],
    general: [
      'Fully finished residences by BAMO',
      'Semi-private elevator landings',
      'Private foyer entry',
      'Panoramic floor-to-ceiling windows',
      'Expansive private terraces with bay views',
      'Custom-built closets by BAMO',
      '10-foot ceiling heights',
      'Premium flooring throughout',
    ],
  },

  ownershipServices: {
    standard: [
      '24-hour concierge',
      'Full-time doorman',
      'Valet parking',
      'Bellman services',
      'Emergency maintenance',
      'Package reception and storage',
      'Common area maintenance',
    ],
    alaCarte: [
      'Housekeeping services',
      'Dry cleaning and laundry',
      'In-residence dining',
      'Personal shopping',
      'Event planning',
      'Pet care services',
    ],
    hiltonBenefits: [
      'Automatic Hilton Honors Diamond status',
      'Access to 8,300+ Hilton properties worldwide',
      'Complimentary room upgrades when available',
      'Executive lounge access globally',
      'Priority booking and late checkout',
      'Points earning on eligible purchases',
    ],
  },

  salesTeam: {
    firm: 'Smith & Associates Real Estate',
    leadAgent: 'David Moyer',
    salesGallery: '100 2nd Ave S, St. Petersburg, FL (City Center building)',
  },
  salesAgents: [
    { name: 'David Moyer', title: 'Director of Sales', brokerage: 'Smith & Associates Real Estate', phone: '727-205-9139', email: 'dmoyer@smithandassociates.com' },
    { name: 'Vonda Golub', title: 'Sales Executive', brokerage: 'Smith & Associates Real Estate', phone: '727-465-8055', email: 'vgolub@smithandassociates.com' },
    { name: 'Shawn Bolla', title: 'Sales Executive', brokerage: 'Smith & Associates Real Estate', phone: '917-579-0780', email: 'sbolla@smithandassociates.com' },
    { name: 'Stacey Borsik Niebles', title: 'Sales Executive', brokerage: 'Smith & Associates Real Estate', phone: '813-784-8156', email: 'sborsik@smithandassociates.com' },
  ],

  brokerCommission: {
    coOpPercent: 3,
    paidBy: 'PMG / Waldorf Astoria Residences',
    payoutSchedule: [
      { label: 'After Rescission Period', percent: 50 },
      { label: 'At Closing (Q4 2030)', percent: 50 },
    ],
    bonusContact: 'Contact Sales Office for current incentive programs',
    registrationRequired: true,
    registrationNotes: 'Buyer must be registered with sales office on first visit to qualify for co-op commission.',
    additionalNotes: [
      'Commission paid by developer — not deducted from buyer\'s purchase price.',
      'Cooperating broker must accompany buyer on first visit or register in advance.',
    ],
  },

  documents: {
    purchaseAgreementUrl: '/docs/waldorf-astoria/purchase-agreement.pdf',
    condoDocsUrl: '/docs/waldorf-astoria/condo-docs.pdf',
    driveFolderUrl: 'https://drive.google.com/drive/folders/11rdCl8R9DcDbPYHv3g6nx4x2wSqM5bct?usp=sharing',
  },

  seo: {
    title: 'Waldorf Astoria Residences St. Petersburg',
    description: 'Tampa Bay\'s first ultra-luxury branded residence. 50-story waterfront tower, 163 residences, $981-$2,316/SF. $500M project with $27M record penthouse. Market intelligence for real estate advisors.',
    keywords: [
      'Waldorf Astoria St Petersburg',
      'luxury condos St Pete',
      'branded residences Tampa Bay',
      'ultra-luxury Florida',
      'waterfront condos',
      'PMG development',
      'Feldman Equities',
      'branded residence Florida',
      'West Coast luxury condos',
    ],
  },
};
