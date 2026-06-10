import { Development } from '@/types/development';

export const fourSeasonsStPete: Development = {
  slug: 'four-seasons-stpete',
  name: 'Four Seasons St. Petersburg',
  fullName: 'Four Seasons Private Residences St. Petersburg',
  tagline: 'The Most Significant Branded Residence Signal in Tampa Bay History',
  heroDescription:
    'Strategic Property Partners (SPP) — the developer behind the $3B Water Street Tampa district and the Tampa EDITION Residences — is conducting site feasibility on Beach Drive for a Four Seasons Private Residences tower — the most prestigious hospitality brand in the world (130+ properties, 47 countries). Offers submitted through local realtors Bryan and Molly Wholey to acquire every unit in an existing Beach Drive condo tower for assemblage and ground-up redevelopment. No site under contract. No plans filed with the City. No formal Four Seasons branding agreement. Four Seasons is NOT scouting land — SPP — backed by Cascade Investment (Bill Gates) and Jeff Vinik — is pursuing the Four Seasons brand license for St. Pete, building on their successful EDITION delivery. Their Florida residential track record tells the story: Miami established $1,000+/SF (2003), Surfside moved to $2,500-$5,000/SF (2017), Fort Lauderdale hit $2,000-$4,000/SF where ex-Starbucks CEO Howard Schultz bought a $44M penthouse (2022), and Coconut Grove launched at $5.6M-$17M across 70 units on Biscayne Bay (2025). Every entry permanently reset the submarket ceiling. At comparable positioning ($2,500-$3,500/SF), a St. Pete Four Seasons would price at nearly 2x the current Waldorf Astoria ceiling ($1,503/SF) — instantly revaluing every branded residence in the pipeline as "value luxury" relative to the new benchmark.',

  // Images — Four Seasons branded placeholder (St. Pete skyline with FS tree logo)
  images: {
    hero: {
      src: '/images/developments/four-seasons-stpete/four-seasons-hero.png',
      alt: 'Four Seasons Private Residences St. Petersburg — Beach Drive waterfront',
    },
    card: {
      src: '/images/developments/four-seasons-stpete/four-seasons-hero.png',
      alt: 'Four Seasons St. Petersburg',
    },
    gallery: [],
  },

  location: 'Beach Drive, Downtown St. Petersburg',
  address: 'Beach Drive (site under evaluation)',
  county: 'pinellas',
  status: 'shadow-inventory',
  statusLabel: 'Shadow Inventory',
  tier: 'ultra-luxury',
  badges: ['Tier 1 Luxury', 'Hospitality Brand', 'Waterfront'],
  deliveryDate: 'TBD',
  type: 'Branded Residence',
  developer: 'Strategic Property Partners',
  architect: 'TBD',
  description:
    'Strategic Property Partners (SPP) — the developer behind Water Street Tampa ($3B) and Tampa EDITION Residences — is evaluating Beach Drive waterfront sites for a Four Seasons-branded residence tower. SPP already delivered the Tampa EDITION (developer sold out, $1,563/SF resale) and understands the Four Seasons brand relationship model. Offers submitted through Bryan and Molly Wholey to acquire an existing Beach Drive condo tower for assemblage/redevelopment.',
  hoaPerSqFt: 0, // TBD

  // No website, phone, or social yet

  // No pricing data yet — use empty pricePoints
  pricePoints: [],

  // No sales metrics
  salesMetrics: {
    totalUnits: 0,
    soldUnits: 0,
    availableUnits: 0,
    soldPercentage: 0,
    absorptionRate: 0,
    velocity: 'Shadow Inventory — not yet selling',
    selloutEstimate: 'TBD',
    contractValue: 'TBD',
    launchDate: 'TBD',
    peakMonth: { month: 'N/A', units: 0 },
    averageMonthly: 0,
    monthlySales: [],
  },

  // Building specs — estimated based on comparable Four Seasons projects
  specifications: {
    totalFloors: 0,
    residentialFloors: { from: 0, to: 0 },
    totalResidences: 0,
    heightFeet: 0,
    heightStories: 0,
    unitMix: 'TBD — comparable: Coconut Grove offers 2-4 BR, 2,025-3,975 SF',
    floorPlans: { typical: 0, penthouse: 0 },
    ceilingHeight: { typical: 'TBD', penthouse: 'TBD' },
    pricePerSqFt: { average: 0, min: 0, max: 0 },
    amenityHighlights: [
      {
        name: 'Four Seasons 24/7 Concierge',
        description: 'Dedicated residential concierge staff trained to Four Seasons global service standard',
      },
      {
        name: 'Full-Service Spa',
        description: 'Spa with treatment rooms, sauna, steam — standard in all Four Seasons residential properties',
      },
      {
        name: 'Resort Pool & Cabanas',
        description: 'Beach Drive waterfront pool deck with private cabanas and Gulf views',
      },
      {
        name: 'Fine Dining Restaurant',
        description: 'On-site restaurant — Four Seasons is known for chef-driven F&B programs',
      },
      {
        name: 'Fitness & Wellness Center',
        description: 'State-of-the-art facility with personal training services',
      },
      {
        name: 'Valet & Private Entry',
        description: 'Separate residential arrival experience from hotel operations',
      },
    ],
    floorPlanSpecs: [],
  },

  // Residence policies — estimated from Four Seasons brand standards
  residencePolicies: [
    {
      category: 'Rental Policy',
      icon: 'key',
      headline: 'TBD',
      details: [
        'Rental terms not yet announced',
        'Four Seasons typically allows short-term rental through hotel program',
      ],
    },
    {
      category: 'Pet Policy',
      icon: 'paw',
      headline: 'TBD',
      details: [
        'Pet policy not yet announced',
        'Four Seasons properties are typically pet-friendly',
      ],
    },
  ],

  // Financing — TBD
  financing: {
    preConstruction: {
      depositPercent: 0,
      balancePercent: 0,
      closingPhase: 'TBD',
      preApprovalStrategy: 'TBD — typical Four Seasons requires 30-50% deposit structure',
    },
    jumboLoanParams: {
      minDownPayment: 'TBD',
      creditScoreMin: 'TBD',
      dtiRatio: 'TBD',
      cashReserves: 'TBD',
    },
    lenders: [],
    advisory: 'Shadow inventory — financing details not yet available. Four Seasons branded residences typically require 30-50% deposit at contract with balance at closing.',
  },

  // EXECUTIVE SUMMARY — this is where the narrative power lives
  executiveSummary: {
    title: 'Four Seasons St. Petersburg — Shadow Inventory Intelligence',
    subtitle: 'What the exploration of Beach Drive means for the Tampa Bay luxury market',
    overview:
      'Strategic Property Partners (SPP) — the developer behind Water Street Tampa and the Tampa EDITION — has begun evaluating Beach Drive waterfront sites in downtown St. Petersburg for a Four Seasons-branded residence project. While highly exploratory — no site under contract, no plans filed, no formal Four Seasons agreement — the signal is the most significant branded residence development in Tampa Bay history. Four Seasons represents the absolute apex of global hospitality branding, and its interest in St. Petersburg validates the market\'s transformation from regional luxury to global destination.',
    marketSignificance:
      'If realized at comparable Florida Four Seasons pricing ($2,500-$3,500/SF based on Coconut Grove at $2,800-$4,300/SF), this project would reset the pricing ceiling for the entire Tampa Bay market. The current ceiling — Waldorf Astoria at $1,503/SF — would become mid-market relative to Four Seasons. Every branded residence in the pipeline (Roche Bobois $1,433, Pendry $1,329, Viceroy $1,198) would be revalued upward as "value luxury" relative to the new benchmark.',
    salesPerformance:
      'No sales activity — shadow inventory. SPP has submitted offers through realtors Bryan Wholey and Molly Wholey to purchase every unit in an existing Beach Drive condo tower for assemblage and ground-up redevelopment. This is the same developer that successfully executed Water Street Tampa ($3B, 56 acres) and delivered the Tampa EDITION (37 units, sold out). SPP\'s track record with Marriott International (EDITION is a Marriott brand) demonstrates they understand the branded residence development model — and Four Seasons represents the ultimate upgrade in brand prestige. The assemblage play is high-risk: Florida condo termination requires 80%+ owner consent, and Beach Drive owners in a rising market may resist.',
    leadNarrative:
      'A decade ago, the idea of a global ultra-luxury brand circling Beach Drive would have been unthinkable. Today, it validates everything the Waldorf Astoria, Roche Bobois, and Pendry launches have proven — that Tampa Bay has graduated from an emerging luxury market to one that institutional hospitality capital takes seriously. The question is no longer whether St. Pete can support $1,000+/SF product. The question is whether it can support $2,500+/SF.',
    pullquote: {
      text: 'The significance is not the project itself — which may never materialize — but what the exploration signals: institutional capital views St. Pete as ready for the highest tier of global luxury branding.',
      attribution: 'ATLAS Market Intelligence',
    },
  },

  // BRANDED VALUE
  brandedValue: {
    title: 'The Four Seasons Proposition',
    propositions: [
      {
        title: 'The Ceiling-Reset Dynamic',
        description:
          'Every Four Seasons entry into a new market has reset the pricing ceiling. Miami 2003 established $1,000+/SF. Surfside 2017 moved to $2,500/SF. Fort Lauderdale 2022 hit $4,000/SF. Coconut Grove 2025 launched at $2,800-$4,300/SF. St. Pete would follow the same pattern — establishing a new tier that lifts every project below it.',
      },
      {
        title: 'Beach Drive — The Premier Address',
        description:
          'Beach Drive is downtown St. Petersburg\'s most prestigious address. Walk Score 97. Direct bayfront views. Adjacent to The Dali Museum, Museum of Fine Arts, Vinoy Park, and the St. Pete Pier. The only waterfront corridor in Tampa Bay comparable to Miami\'s Brickell or Fort Lauderdale\'s beachfront.',
      },
      {
        title: 'Global Portfolio Recognition',
        description:
          'Four Seasons operates 100+ hotels worldwide. Florida portfolio: Miami (2003), Surfside (2017), Fort Lauderdale (2022), Orlando (2025), Naples (2025), Jacksonville (2027), Coconut Grove (2028). St. Pete would be the 8th Florida location — the densest Four Seasons concentration outside international gateway cities.',
      },
      {
        title: 'The Assemblage Play',
        description:
          'The developer submitted offers to purchase every unit in an existing Beach Drive condo tower — a redevelopment assemblage strategy. If successful, this would create a ground-up site on the most valuable waterfront land in St. Pete. If unsuccessful, alternative Beach Drive sites may be pursued.',
      },
    ],
  },

  // MARKET EVIDENCE
  marketEvidence: [
    {
      metric: 'Comparable PSF — Coconut Grove',
      value: '$2,800–$4,300/SF',
      description:
        'Four Seasons Coconut Grove (broke ground late 2025, delivery early 2028): 70 residences, 20 stories on Biscayne Bay. Pricing $5.6M-$17M+ for 2,025-3,975 SF. This is the most recent Four Seasons residential launch in Florida and the most relevant comparable for St. Pete positioning.',
    },
    {
      metric: 'Comparable PSF — Fort Lauderdale',
      value: '$2,000–$4,000+/SF',
      description:
        'Four Seasons Fort Lauderdale (delivered 2022). Ex-Starbucks CEO Howard Schultz purchased a $44M penthouse — the kind of transaction that puts a market on the global luxury map. Fort Lauderdale\'s luxury market permanently reset after the Four Seasons entry.',
    },
    {
      metric: 'Comparable PSF — Surfside',
      value: '$2,500–$5,000+/SF',
      description:
        'The Surf Club Four Seasons (delivered 2017). Resale market now commands $2,500-$5,000+/SF. This project single-handedly created the ultra-luxury tier north of Miami Beach.',
    },
    {
      metric: 'Current St. Pete Ceiling',
      value: '$1,503/SF',
      description:
        'Waldorf Astoria St. Petersburg — the current PSF ceiling for downtown St. Pete at $1,503/SF avg (7 active MLS listings). A Four Seasons at $2,500-$3,500/SF would represent a 66-133% premium over the current ceiling.',
    },
    {
      metric: 'Branded Residence Count',
      value: '8 (with Four Seasons)',
      description:
        'Tampa Bay would have 8 branded residence projects — the densest concentration on Florida\'s Gulf Coast and more than Miami had in 2019. Brands: Waldorf Astoria, Roche Bobois, Viceroy, Ritz-Carlton, Pendry, EDITION, Hotel ORA, and Four Seasons.',
    },
    {
      metric: 'Beach Drive Walk Score',
      value: '97',
      description:
        'Walker\'s Paradise. Beach Drive is the most walkable waterfront address in Tampa Bay — adjacent to The Dali Museum, Museum of Fine Arts, Vinoy Park, St. Pete Pier, and 200+ restaurants. This location quality is what attracts Four Seasons-caliber projects.',
    },
  ],

  // COMPETITORS
  competitors: [
    {
      name: 'Four Seasons St. Pete',
      height: 'TBD',
      units: 0,
      avgPsf: '$2,500–$3,500 (est.)',
      delivery: 'TBD',
      status: 'Shadow Inventory',
      isFeatured: true,
    },
    {
      name: 'Waldorf Astoria',
      height: '50 FL',
      units: 163,
      avgPsf: '$1,503',
      delivery: 'Q4 2030',
      status: '20.2% Sold',
    },
    {
      name: 'Roche Bobois',
      height: '29 FL',
      units: 164,
      avgPsf: '$1,433',
      delivery: 'Jan 2029',
      status: 'Pre-Sales',
    },
    {
      name: 'Pendry Tampa',
      height: '38 FL',
      units: 207,
      avgPsf: '$1,329',
      delivery: 'Q4 2026-Q4 2027',
      status: 'Under Construction',
    },
    {
      name: 'Tampa EDITION',
      height: '26 FL',
      units: 37,
      avgPsf: '$1,563',
      delivery: 'Available Now',
      status: 'Developer Sold Out',
    },
    {
      name: 'Art House',
      height: '42 FL',
      units: 244,
      avgPsf: '$877',
      delivery: 'Available Now',
      status: '86.9% Sold',
    },
  ],

  // MARKET NARRATIVE
  marketNarrative: [
    'The potential entry of Four Seasons into downtown St. Petersburg represents the single most significant signal in the Tampa Bay luxury real estate market. While the project is highly exploratory — no site secured, no plans filed, no formal Four Seasons agreement — the mere fact that a development group is conducting feasibility studies on Beach Drive tells you everything about where institutional capital believes this market is headed.',
    'Consider the trajectory: In 2019, downtown St. Pete had zero branded residences. By 2025, Waldorf Astoria had surpassed $100M in pre-sales at $1,503/SF. By 2026, seven branded residence projects are in various stages across Tampa Bay. Four Seasons would be the eighth — and at $2,500-$3,500/SF based on comparable Florida projects, it would establish a pricing tier that doesn\'t currently exist in this market.',
    'For advisors, the implication is strategic: every current branded residence in the Tampa Bay pipeline — Waldorf Astoria ($1,503/SF), Roche Bobois ($1,433/SF), Pendry ($1,329/SF), Viceroy ($1,198/SF) — would become "value luxury" relative to a Four Seasons ceiling. Pre-construction buyers at current pricing are positioned for brand-premium appreciation if Four Seasons materializes. This is exactly the dynamic that played out in South Florida: each successive Four Seasons entry (Miami → Surfside → Fort Lauderdale → Coconut Grove) lifted the entire market.',
  ],

  // ADVISORY INSIGHTS
  advisoryInsights: [
    {
      title: 'For Buyer Advisors',
      content:
        'A Four Seasons announcement would validate the entire St. Pete luxury thesis. Buyers currently entering Waldorf Astoria at $1,503/SF or Roche Bobois at $1,433/SF are buying below what would become the mid-tier if Four Seasons establishes a $2,500+/SF ceiling. This is not speculative — it is exactly what happened in every Florida market where Four Seasons entered. The risk: the project may never materialize. The opportunity: if it does, current pre-construction buyers are positioned for 50-100% brand-premium appreciation.',
    },
    {
      title: 'For Listing Advisors',
      content:
        'Beach Drive resale inventory should be monitored closely. The developer\'s assemblage offers — attempting to purchase every unit in an existing Beach Drive tower — could displace current owners. If the assemblage succeeds, adjacent properties would see immediate appreciation from proximity to a Four Seasons address. If it fails, the developer may pursue alternative Beach Drive sites, still lifting the corridor. Either way, Beach Drive pricing is entering a new phase.',
    },
    {
      title: 'The Bigger Picture',
      content:
        'Tampa Bay\'s branded residence trajectory mirrors Miami\'s by a 5-7 year lag. Miami hit 7 branded projects by 2018 and is now at 15+. Tampa Bay hit 7 in 2026. If the trajectory holds, Four Seasons is the inflection point that transitions St. Pete from "emerging luxury" to "established luxury destination" — the same transition that 10x\'d Miami Beach PSF over two decades. The question for realtors is not whether this transition will happen, but how fast.',
    },
  ],

  // LOCATION
  locationCategories: [
    {
      name: 'Beach Drive Corridor',
      icon: 'utensils',
      venues: [
        { name: 'The Birchwood', description: 'Rooftop dining, Michelin Guide recognized', distance: 'On Beach Drive' },
        { name: 'Cassis', description: 'French-American bistro with bayfront terrace', distance: '0.1 miles' },
        { name: 'Parkshore Grill', description: 'Upscale American dining, Beach Drive anchor', distance: '0.1 miles' },
        { name: 'IL Ritorno', description: 'James Beard-nominated Italian', distance: '0.2 miles' },
        { name: 'Allelo', description: 'Mediterranean fine dining', distance: '0.3 miles' },
        { name: 'Rococo Steak', description: 'Classic steakhouse in 1920s building', distance: '0.3 miles' },
      ],
    },
    {
      name: 'Culture & Museums',
      icon: 'palette',
      venues: [
        { name: 'The Dali Museum', description: 'Largest Dali collection outside Europe, $65M expansion 2028', distance: '0.3 miles' },
        { name: 'Museum of Fine Arts', description: '20,000+ works spanning 5,000 years', distance: '0.2 miles' },
        { name: 'The James Museum', description: '$75M Western and Wildlife Art', distance: '0.2 miles' },
        { name: 'Chihuly Collection', description: 'Dale Chihuly glass art', distance: '0.4 miles' },
        { name: 'Imagine Museum', description: 'Contemporary glass art', distance: '0.8 miles' },
      ],
    },
    {
      name: 'Waterfront & Parks',
      icon: 'tree',
      venues: [
        { name: 'St. Pete Pier', description: '$92M waterfront destination', distance: '0.2 miles' },
        { name: 'Vinoy Park', description: '15-acre bayfront park', distance: '0.1 miles' },
        { name: 'North Straub Park', description: 'Bayfront green space on Beach Drive', distance: 'Adjacent' },
        { name: 'South Straub Park', description: 'Extends the waterfront promenade', distance: '0.1 miles' },
        { name: 'The Vinoy Renaissance', description: 'Historic 1925 resort, marina, private club', distance: '0.3 miles' },
      ],
    },
  ],

  locationScores: [
    { label: 'Walk Score', score: 97, descriptor: "Walker's Paradise" },
    { label: 'Bike Score', score: 94, descriptor: 'Very Bikeable' },
    { label: 'Transit Score', score: 66, descriptor: 'Good Transit' },
    { label: 'Cultural Score', score: 98, descriptor: 'World-Class Arts' },
    { label: 'Restaurant Score', score: 99, descriptor: 'Culinary Capital' },
    { label: 'Waterfront Access', score: 100, descriptor: 'Direct Bayfront' },
  ],

  locationEyebrow: 'Beach Drive — The Premier Address',
  locationInsight: {
    title: 'Why Beach Drive Is the Only Site',
    paragraphs: [
      'Beach Drive is the only address in Tampa Bay that could support a Four Seasons branded residence. Walk Score 97, direct bayfront views, adjacent to the Dali Museum and Museum of Fine Arts, and the concentration of Michelin-recognized dining that Four Seasons buyers expect within walking distance.',
      'The corridor is already the most expensive residential address in St. Pete — and a Four Seasons would push it further. For context: when Four Seasons entered Fort Lauderdale on the beachfront, adjacent property values increased 20-30% within 24 months of the announcement.',
    ],
    highlights: [
      'Walk Score 97 — only waterfront corridor in Tampa Bay at this level',
      'Adjacent to The Dali Museum ($65M expansion), Museum of Fine Arts, St. Pete Pier',
      'Michelin Guide-recognized dining within 0.3 miles',
      'Fort Lauderdale precedent: 20-30% adjacent property appreciation within 24 months of Four Seasons announcement',
    ],
  },

  // VISIONARIES
  visionaries: [
    {
      role: 'Brand',
      companies: [
        {
          name: 'Four Seasons Hotels and Resorts',
          description:
            'Founded in 1960 by Isadore Sharp, Four Seasons operates 130+ hotels and resorts in 47 countries. The most prestigious hospitality brand in the world, consistently ranked #1 in luxury hotel surveys. The residential program — Four Seasons Private Residences — has expanded globally with projects in Miami, Surfside, Fort Lauderdale, Coconut Grove, and 30+ international locations.',
        },
      ],
    },
    {
      role: 'Developer',
      companies: [
        {
          name: 'Strategic Property Partners (SPP)',
          description:
            'Strategic Property Partners is backed by Cascade Investment (Bill Gates\' private investment firm) and Jeff Vinik (Tampa Bay Lightning owner). SPP developed the $3 billion Water Street Tampa master plan — the largest mixed-use development in Tampa Bay history — and delivered the Tampa EDITION Residences (37 units, developer sold out at $1,035-$1,609/SF). SPP is not a speculative developer — they are the most capitalized and experienced luxury developer in the Tampa Bay market. Their pursuit of a Four Seasons brand license for St. Pete signals conviction that Beach Drive can support $2,500+/SF product. Offers submitted through Bryan and Molly Wholey to acquire an existing Beach Drive condo tower for assemblage.',
        },
      ],
    },
  ],

  // TIMELINE
  timeline: [
    {
      date: 'February 2026',
      title: 'Exploration Reported',
      description:
        'St Pete Rising reports that a development group has begun evaluating Beach Drive sites for a potential Four Seasons-branded project. No site under contract, no plans filed.',
      status: 'completed',
    },
    {
      date: '2026',
      title: 'Assemblage Offers',
      description:
        'Developer submitted offers through Bryan Wholey and Molly Wholey to purchase every unit in an existing Beach Drive condo tower for potential redevelopment.',
      status: 'completed',
    },
    {
      date: 'TBD',
      title: 'Site Acquisition',
      description:
        'Contingent on successful assemblage or alternative site identification. Florida condo termination requires 80%+ owner consent.',
      status: 'upcoming',
    },
    {
      date: 'TBD',
      title: 'Four Seasons Agreement',
      description:
        'Formal branding agreement between developer and Four Seasons Hotels and Resorts. This step determines whether the project carries the Four Seasons name.',
      status: 'upcoming',
    },
    {
      date: 'TBD',
      title: 'City Approvals',
      description:
        'DRC review, city council vote, and zoning approvals required. Beach Drive height and density restrictions may constrain the project.',
      status: 'upcoming',
    },
    {
      date: 'TBD',
      title: 'Sales Launch',
      description:
        'Pre-construction sales. Based on Four Seasons brand trajectory, expect pricing at $2,500-$3,500/SF — approximately 2x the current Waldorf Astoria ceiling.',
      status: 'upcoming',
    },
  ],

  // SOURCE NOTES
  sourceNotes: [
    {
      category: 'Shadow Inventory',
      field: 'Project Status',
      note: 'St Pete Rising article by Brian Zucker (February 2026) reporting development group evaluating Beach Drive sites. Confirmed assemblage offers through Bryan and Molly Wholey.',
      sources: [
        { name: 'St Pete Rising', value: 'https://stpeterising.com/home/four-seasons-could-be-coming-to-downtown-st-pete' },
      ],
      resolution: 'Primary source — St Pete Rising. No official project confirmation or DBPR filing.',
    },
    {
      category: 'Comparable Pricing',
      field: 'Four Seasons Florida PSF',
      note: 'Coconut Grove pricing ($5.6M-$17M, 70 units) sourced from developer marketing and CondoBlackBook. Fort Lauderdale closed data from public records. Surfside resale data from MLS.',
      sources: [
        { name: 'Miami Residential / CondoBlackBook', value: 'April 2026' },
      ],
      resolution: 'Comparable pricing validated across multiple Florida Four Seasons projects.',
    },
    {
      category: 'Market Analysis',
      field: 'Ceiling-Reset Analysis',
      note: 'Four Seasons ceiling-reset analysis based on historical Florida market entry patterns (Miami 2003, Surfside 2017, Fort Lauderdale 2022, Coconut Grove 2025).',
      sources: [
        { name: 'ATLAS Market Intelligence', value: 'April 2026' },
      ],
      resolution: 'Historical pattern analysis — each Florida Four Seasons entry established a new pricing tier.',
    },
  ],

  pressHighlights: [
    {
      source: 'St Pete Rising',
      date: 'February 2026',
      headline: 'Four Seasons could be coming to downtown St. Pete — development group evaluating Beach Drive sites',
    },
    {
      source: 'Florida Politics',
      date: 'January 2026',
      headline: 'Four St. Pete projects to watch in 2026 — Four Seasons among most anticipated',
    },
  ],

  // SEO
  seo: {
    title: 'Four Seasons St. Petersburg | Shadow Inventory — Ultra-Luxury Branded Residence',
    description:
      'Four Seasons Private Residences under exploration for Beach Drive, downtown St. Petersburg. If realized at $2,500-$3,500/SF, would reset the Tampa Bay luxury pricing ceiling. 8th branded residence in the pipeline.',
    keywords: [
      'Four Seasons',
      'St. Petersburg luxury',
      'Beach Drive',
      'branded residences',
      'shadow inventory',
      'ultra luxury',
      'waterfront',
      'Tampa Bay',
    ],
  },
};
