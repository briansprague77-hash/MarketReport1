import { DevelopmentProfile } from '@/types/development-profile';

// ─── REFLECTION Floor Plans (reflectionstpete.com + MLS cross-reference) ────
// 8 floor plans across 8 stacks × 11 residential floors (FL7-17):
//
//   Name       | Bed/Bath       | SF Range          | Floors
//   -----------|----------------|-------------------|--------
//   Amber      | 2BR/2BA        | 1,551 SF (FL8-17) | 7-17
//              |                | 1,849 SF (FL7)     |
//   Azurite    | 2BR/2.5BA+Den  | 2,021 SF (FL8-17) | 8-17
//   Citrine    | 2BR/2BA        | 2,213 SF (FL8-17) | 8-17
//   Jade       | 2BR/2BA        | 1,885 SF (FL8-17) | 8-17
//   Lapis      | 2BR/2BA+Den    | 2,473 SF (FL8-17) | 8-17
//   Amethyst   | 3BR/2.5BA      | 2,183 SF (FL8-17) | 8-17
//   Opal       | 1BR/1.5BA+Den  | 1,811 SF (FL7)    | 7 only
//   Quartz     | 1BR/1.5BA+Den  | 1,408 SF (FL7)    | 7 only
//
// FL7 is the podium floor with larger footprints for Amber and unique 1BR plans (Opal, Quartz).
// FL8-17 are the standard tower floors with 8 units each.
// Total: 88 residential units + 2 ground-floor retail.

export const reflection: DevelopmentProfile = {
  slug: 'reflection',
  name: 'REFLECTION',
  tagline: 'Attainable Urban Living in Downtown St. Petersburg',
  description:
    'Proof that demand runs deep below $900/SF. HP Capital and DeNunzio\'s 88-unit mid-rise is 92% sold at $727/SF — roughly half the Waldorf\'s ask — with only 7 developer units remaining on floors 15-17. The absorption story here is not about luxury; it is about depth. Reflection proved downtown St. Petersburg can move attainable product at velocity, anchoring the bottom of the price ladder and setting the floor for every Tier 3 entrant.',
  location: '777 3rd Ave. N, St. Petersburg 33701',
  address: '777 3rd Ave. N',
  city: 'St. Petersburg',
  county: 'pinellas',
  status: 'delivered', // 7 developer units remaining (Mirror Lake Place LLC)
  statusLabel: 'Delivered',
  type: 'Condominium',

  price: 'From $899,000',
  bedrooms: '1-3',
  bathrooms: '1.5-2.5',
  sqft: '1,168-2,285 SF',
  totalUnits: 88,
  unitSizes: '1,168-2,285 SF',
  deliveryDate: 'Available Now',
  stories: 18,
  // HOA: $0.85/SF midpoint. MLS broker listings show a $0.80–$0.89/SF/mo range
  // ($21,912–$22,044/yr). Confirmation from HOA docs still pending as of 2026-04-22.
  hoaPerSqFt: 0.85,

  lastUpdated: '2026-04-09',

  developer: 'HP Capital / DeNunzio Group',
  architect: 'SMP Architecture',
  website: 'https://reflectionstpete.com/',
  phone: '727-655-9100',

  rentalPolicy: 'After 1st year only; 6-month minimum; max 2x/year',
  brokerCommission: '3% co-op',
  socialMedia: {
    instagram: 'https://www.instagram.com/reflectionstpete',
    facebook: 'https://www.facebook.com/Reflection-St-Pete-104019061351861/',
  },

  features: [
    'Open floor plans',
    'Modern kitchens',
    'Private balconies',
    'In-unit laundry',
    'Energy-efficient windows',
    'Quartz countertops',
  ],
  amenities: [
    '12,000 SF rooftop amenity deck',
    'Rooftop pool',
    'Fitness center',
    'Resident lounge',
    'Bike storage',
    'Package lockers',
    'Secure entry',
    '2,800 SF ground-floor retail',
    'Climate-controlled storage locker per unit',
  ],
  galleryImages: [
    'https://images.squarespace-cdn.com/content/v1/55467dc6e4b0ebaf8fab24a0/6529c010-2e99-4978-991e-ded45db7175b/449312697_873738501438956_5899501765862508003_n.jpg',
    'https://images.squarespace-cdn.com/content/v1/55467dc6e4b0ebaf8fab24a0/1721096355503-NTDIKKBCY502QS7XZXEV/AB3_Reflection+Drone-3.jpg',
    'https://images.squarespace-cdn.com/content/v1/55467dc6e4b0ebaf8fab24a0/1721096355437-DLBOE8D901ZY7V2RQFBR/AB3_Reflection+Drone-4.jpg',
    'https://images.squarespace-cdn.com/content/v1/55467dc6e4b0ebaf8fab24a0/a072edb7-1561-4ba4-b370-5c63b130974c/Reflection%2Btower%2B2.jpg',
    'https://images.squarespace-cdn.com/content/v1/55467dc6e4b0ebaf8fab24a0/5bd9d8e6-c584-4369-8fc3-af076400f5c6/Reflection%2Bview.jpg',
    'https://images.squarespace-cdn.com/content/v1/55467dc6e4b0ebaf8fab24a0/dc60ff7c-e731-4848-9484-974e16152a1d/reflection%2Bgym%2B+2.jpg',
    'https://images.squarespace-cdn.com/content/v1/55467dc6e4b0ebaf8fab24a0/6c36d922-243b-47b7-a6da-ad24e2159bfb/REFLECTION%2BLAPIS%2B+2.jpg',
    'https://reflectionstpete.com/wp-content/uploads/2020/09/MW-5-scaled.jpg',
  ],

  scores: {
    walkScore: 89,
    bikeScore: 98,
    transitScore: 55,
  },

  documents: {
    visionReportUrl: '/docs/reflection/vision-report.pdf',
  },

  // ── MLS Sales Intelligence (Stellar MLS, as of 2026-03-24) ─────────
  // NOTE: MLS captures only PART of developer sales. 42 off-MLS sales not reflected here.
  mlsSummary: {
    totalRecords: 97,
    // 42 SLD records = 39 unique first-time sales + 3 resale transactions (1206, 1305, 1406)
    sold: 42,
    uniqueUnitsSoldViaMls: 39,
    resaleTransactions: 3,
    resaleUnits: '1206 (sold $789K→resold $975K), 1305 (sold $1.595M→resold $1.77M), 1406 (sold $1.1M→resold $925K)',
    active: 13,
    pending: 2,
    cancelled: 37,
    withdrawn: 2,
    expired: 1,
    avgSoldPrice: 1136069,
    medianSoldPrice: 1104500,
    avgSoldPsf: 623.22,
    medianSoldPsf: 600.69,
    soldPriceRange: '$699,000-$1,920,000',
    avgActivePrice: 1437538,
    avgActivePsf: 727.10,
    activePriceRange: '$925,000-$2,055,000',
    avgActiveDom: 211,
    firstClosing: '2024-08-06',
    latestClosing: '2025-12-17',
    avgClosingsPerMonth: 2.5,
    primaryListingAgent: 'Rachael Manzanares',
    primaryListingOffice: 'Keller Williams St Pete Realty',
    cancelledNote: 'Cancelled listings reflect developer inventory management — relisting after contracts or price adjustments — not failed sales.',
    asOfDate: '2026-03-24',
    // Active: 3 developer + 4 resales (previously sold) + 6 never-sold-on-MLS owners (sold off-MLS)
    developerActiveCount: 3,
    developerActiveUnits: '1603 ($1.65M), 1703 ($1.75M), 1605 ($2.055M) — Rachael Manzanares/KW',
    resaleActiveCount: 4,
    resaleActiveUnits: '806, 908, 1203, 1208 — previously closed on MLS, now relisted by new owners',
    // 6 active units never sold on MLS before: 1104, 1106, 1202, 1205, 1403, 1504
    // These were likely sold off-MLS (pre-construction) and are now owner resales
  },

  // ── Ownership Intelligence (PCPAO + Developer, 2026-03-24) ─────────
  pcpaoSummary: {
    totalUnits: 88,
    unitsWithDeeds: 47,
    // PCPAO shows 47 recorded deeds; remaining 34 sold units have deed recording lag or still in developer entity.
    // Developer entity: Mirror Lake Place LLC (deed 22016/2661)
    unsoldDeveloperUnits: 7,
    sellThrough: 92.0,
    residentialFloors: '7-17 (11 floors)',
    unitsPerFloor: 8,
    stacks: 8,
    stackNames: '01, 02, 03, 04, 05, 06, 07, 08',
    websiteAvailableUnits: 7,
    websiteAvailableDetails: 'Developer holds 7 residential units (1503, 1601, 1603, 1605, 1703, 1704, 1708 — all floors 15-17) + 2 ground-floor retail units. 3 of 7 listed on MLS (1603, 1703, 1605); 4 held back (1503, 1601, 1704, 1708).',
    asOfDate: '2026-03-24',
  },

  // ── Floor Plans (from reflectionstpete.com + MLS cross-reference) ──
  floorPlans: [
    { name: 'Opal', bedrooms: 1, bathrooms: '1.5', den: true, sfRange: '1,408-1,811 SF', floors: '7 only' },
    { name: 'Quartz', bedrooms: 1, bathrooms: '1.5', den: true, sfRange: '1,408 SF', floors: '7 only' },
    { name: 'Amber', bedrooms: 2, bathrooms: '2', den: false, sfRange: '1,551-1,849 SF', floors: '7-17' },
    { name: 'Jade', bedrooms: 2, bathrooms: '2', den: false, sfRange: '1,885-2,678 SF', floors: '7-17' },
    { name: 'Azurite', bedrooms: 2, bathrooms: '2.5', den: true, sfRange: '2,021-2,546 SF', floors: '7-17' },
    { name: 'Citrine', bedrooms: 2, bathrooms: '2', den: false, sfRange: '2,213-4,054 SF', floors: '7-17' },
    { name: 'Lapis', bedrooms: 2, bathrooms: '2', den: true, sfRange: '2,473-3,655 SF', floors: '7-17' },
    { name: 'Amethyst', bedrooms: 3, bathrooms: '2.5', den: false, sfRange: '2,183-2,435 SF', floors: '7-17' },
  ],

  // ── Sales Team ─────────────────────────────────────────────────────
  salesTeam: [
    { name: 'Rachael Manzanares', title: 'Primary Developer Agent — Keller Williams St Pete Realty' },
    { name: 'Amber Bennett', title: 'Developer Agent — Keller Williams St Pete Realty' },
    { name: 'Michelle Menke Fife', title: 'Developer Agent — Keller Williams St Pete Realty' },
  ],
  salesAgents: [
    { name: 'Rachael Manzanares', title: 'Primary Developer Agent', brokerage: 'Keller Williams St Pete Realty', phone: '727-515-4111', email: 'rachael@kwstpete.com' },
    { name: 'Amber Bennett', title: 'Developer Agent', brokerage: 'Keller Williams St Pete Realty', phone: '727-403-3131' },
    { name: 'Michelle Menke Fife', title: 'Developer Agent', brokerage: 'Keller Williams St Pete Realty', phone: '727-515-4111' },
  ],

  salesGallery: '600 1st Ave North, Suite #110, St. Petersburg FL 33701',

  lifecycle: {
    constructionStartDate: '2022',
    coDate: '2024',
    firstClosingDate: 'August 6, 2024',
    salesGalleryOpening: '2024',
  },

  pricingHistory: {
    launchPsf: 450,
    currentPsf: 727, // Avg of 10 active MLS listings (Apr 2026)
    launchPriceRange: 'From $450,000',
    currentPriceRange: '$899,000-$2,055,000', // Unit 1106 reduced from $925K to $899K
    priceChangePercent: 61.6,
    asOfDate: '2026-04-08',
    // MLS Active (Apr 2026): 10 listings (3 developer + 7 resale). Down from 13+2 pending.
    // Price reductions detected:
    //   Unit 1106: $925,000 → $899,000 (-$26K, -2.8%) — 174 DOM
    //   Unit 1104: $1,359,999 → $1,299,999 (-$60K, -4.4%) — 229 DOM
    //   Unit 1202: $1,325,000 → $1,240,000 (-$85K, -6.4%) — 33 DOM (relisted lower)
    // Developer (Rachael Manzanares/KW): Units 1603 ($1.65M), 1703 ($1.75M), 1605 ($2.055M)
    // Resale agents: Herzwurm (Compass), Baird, Devine (Coastal), Coderre (Revere), Thayer (M.Saunders), Jamison (Real Broker)
    // Unit 908 at 607 DOM — most stale listing in building
    // Min lease: 6 months confirmed via broker full
    // Annual HOA fees: $21,912-$22,044 ($0.80-$0.89/SF/mo) per MLS broker data
  },

  riskFlags: ['slow-sales'],

  incentives: {
    items: [],
    pricingClassification: 'clean',
    asOfDate: '2026-03-24',
    notes: '3 developer units on MLS (Rachael Manzanares/KW) at full ask. 4 additional developer units held back (PCPAO: Mirror Lake Place LLC). 3 price reductions on resale listings (Units 1106, 1104, 1202) — absorption friction signal.',
  },

  socialProof: [
    {
      platform: 'google' as const,
      author: 'Mark M.',
      text: 'The Mirror Lake neighborhood is a small, historical crown jewel. With only 8 units per floor, REFLECTION creates a more private and personal living experience.',
      date: '2025',
      rating: 5,
    },
  ],

  pressHighlights: [
    { source: 'St Pete Rising', date: 'July 2024', headline: 'Inside the newly completed 18-story Reflection tower near Mirror Lake' },
    { source: 'Reflection St Pete', date: 'April 2025', headline: '50 closings in 60 days — $65 million in total sales reported' },
  ],

  marketEvidence: [
    { metric: 'Sell-Through Rate', value: '92.0% (81 of 88 sold)', description: 'Reflection has sold 81 of 88 units with only 7 developer units remaining — all concentrated on floors 15-17. At $727/SF average active ask, this is the strongest absorption story below $900/SF in downtown St. Petersburg and proves demand depth exists well below the Waldorf/Roche Bobois tier.' },
    { metric: 'Price Appreciation', value: '+61.6% from launch ($450 to $727/SF)', description: 'Launch PSF of $450 has appreciated to a $727/SF current active average — a 61.6% increase from pre-construction to delivered product. This appreciation curve validates the attainable luxury thesis: buyers who entered at pre-construction pricing captured significant equity. Late buyers are paying a substantial premium for delivered, de-risked product.' },
    { metric: 'Remaining Developer Inventory', value: '7 units (floors 15-17)', description: 'All remaining developer units are on the top three residential floors: 1503, 1601, 1603, 1605, 1703, 1704, 1708. Three are listed on MLS ($1.65-2.055M); four are held back. This is a classic closeout pattern — top-floor inventory is always last to move because it carries the highest price points in the building.' },
    { metric: 'Resale Activity', value: '3 completed flips + 7 active resales', description: 'Three units have already resold (1206, 1305, 1406), with Unit 1305 appreciating from $1.595M to $1.77M (+11%). Seven owner resales are active, with three showing price reductions (Units 1106, 1104, 1202 — cuts of 2.8% to 6.4%). The price reduction pattern on resales signals that secondary market liquidity requires patience at current ask prices.' },
    { metric: 'HOA Cost', value: '$0.85/SF/mo ($21,912-$22,044/yr)', description: 'At $0.85/SF monthly, Reflection carries the lowest HOA rate among mid-rise and high-rise buildings in the pipeline. Compare to Waldorf at $1.40/SF and Viceroy at $1.40/SF. This HOA advantage is a meaningful differentiator for cost-conscious buyers calculating total monthly carry.' },
  ],

  advisoryInsights: [
    { title: 'For Buyer Advisors', content: 'The closeout opportunity is real but narrow. Seven developer units remain on floors 15-17 at $899K-$2.055M. These are the best views in the building — unobstructed upper-floor positions that were priced last for a reason. Buyers seeking delivered, move-in-ready product below $900/SF in downtown St. Pete have no other option at this scale. Compare the $727/SF ask to Waldorf ($1,503/SF, delivering 2026) and Roche Bobois ($1,433/SF, delivering 2029). The trade-off is clear: no branded services, but delivered product at half the PSF with proven resale comps.' },
    { title: 'For Listing Advisors', content: 'If you hold resale listings at Reflection, the 3 active price reductions (Units 1106, 1104, 1202) are setting a competitive ceiling. Unit 908 at 607 DOM is the most stale listing in the building — if your client is considering listing, price below 908\'s ask to avoid the same fate. The developer still holds 4 unlisted units that could enter MLS at any time, adding supply pressure. Position resales against the $727/SF developer benchmark and emphasize the delivered, no-construction-risk advantage over pre-sales at Roche Bobois and The Cade.' },
  ],

  seo: {
    title: 'REFLECTION St. Petersburg | Urban Condos from $899K',
    description:
      'REFLECTION — 88 residences across 18 stories in downtown St. Petersburg. Delivered 2024. 42 MLS closings at avg $623/SF. 8 floor plans. 12,000 SF rooftop deck. Walk Score 89.',
    keywords: ['REFLECTION', 'St. Petersburg condos', 'affordable luxury', 'HP Capital', 'downtown condos'],
  },
};
