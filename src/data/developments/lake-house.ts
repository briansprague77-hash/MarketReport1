import { DevelopmentProfile } from '@/types/development-profile';

export const lakeHouse: DevelopmentProfile = {
  slug: 'lake-house',
  name: 'Lake House',
  tagline: 'Boutique Waterfront Living on Mirror Lake',
  description:
    '45 condominiums in a 13-story tower (11 residential floors above 3-story parking podium) on Mirror Lake. $90M project by Skyward Living (Hudson Harr), designed by PLACE Architecture (Tim Clemmons, AIA) — same architect as The Cade next door. 6 units per floor (FL5-10), 4 penthouses (FL11), 1 unit each (FL2-3). Unit sizes: 980-2,280 SF standard, penthouses 1,650-2,800 SF. 72 parking spaces + 86 bicycle spaces. Contemporary brick façade with curved balconies, gold accents, and multi-pane windows. 840 SF ground-floor café with local artist sculpture by Ya La\'Ford. Delivery 2027. Delivery 2027.',
  location: '200 Mirror Lake Dr N, St. Petersburg 33701',
  address: '200 Mirror Lake Dr N',
  city: 'St. Petersburg',
  county: 'pinellas',
  status: 'shadow-inventory',
  statusLabel: 'Shadow Inventory',
  type: 'Condominium',

  price: 'From $800,000s',
  bedrooms: '1-3 + PH',
  bathrooms: '1-3',
  sqft: '980-2,800 SF',
  totalUnits: 45,
  unitSizes: '980-2,800 SF',
  deliveryDate: '2027',
  stories: 13, // 11 residential + 3-story parking podium

  lastUpdated: '2026-04-09',

  developer: 'Skyward Living',
  architect: 'PLACE Architecture (Tim Clemmons, AIA)',
  // Sales contact TBD — developer has not announced public sales team
  salesTeam: [
    { name: 'TBD', title: 'Sales not yet announced' },
  ],
  brokerCommission: '3% co-op',

  features: [
    'Unobstructed Mirror Lake views from every residence',
    'Contemporary brick façade with curved balconies',
    'Gold accents and multi-pane windows',
    '6 units per floor (FL5-10), 4 penthouses (FL11)',
    'Penthouses: 1,650-2,800 SF',
    '72 parking spaces + 86 bicycle spaces',
    'Same architect as The Cade (PLACE Architecture)',
  ],
  amenities: [
    'Rooftop terrace with lake and skyline views',
    'Swimming pool',
    'State-of-the-art fitness center',
    '840 SF café with local artist sculpture',
    'Lobby and event space',
    'Ground-floor retail space',
    '3-story parking podium',
  ],
  scores: {
    walkScore: 94, // Same neighborhood as The Cade — 200 Mirror Lake Dr N
    bikeScore: 90,
    transitScore: 55,
  },

  galleryImages: [
    '/images/developments/lake-house/lake-house-hero.png',
    'https://www.homesandcondostampa.com/megatemplate/uploads/photogallery_images/ImgLake%20House%20Condos%20for%20Sale%20St%20Pete12202022_1625571Lake_House_Condos_for_Sale_St.Pete.jpg',
    'https://www.homesandcondostampa.com/megatemplate/uploads/photogallery_images/ImgLake%20House%20Condo%20St%20Pete12202022_162681Lake_House_Condo_St.Pete.jpg',
    'https://www.homesandcondostampa.com/megatemplate/uploads/photogallery_images/ImgLake%20House%20Condo%20Aerial%20St%20Petersburg12202022_1626351Lake_House_Condo_Aerial_St_Petersburg.jpg',
    'https://www.homesandcondostampa.com/megatemplate/uploads/photogallery_images/ImgLake%20House%20Condos%20for%20Sale382024_119241Lake%20House%20Condos%20for%20Sale.jpg',
    'https://www.homesandcondostampa.com/megatemplate/uploads/photogallery_images/ImgLake%20House%20Schematic382024_119251Lake%20House%20Schematic.jpg',
  ],

  lifecycle: {
    announcementDate: '2024',
    groundbreakingDate: 'TBD',
    estimatedSelloutDate: '2027',
  },

  pricingHistory: {
    launchPsf: 0,
    currentPsf: 0,
    currentPriceRange: 'From $800,000s',
    priceChangePercent: 0,
    asOfDate: '2026-04-09',
  },

  riskFlags: ['developer-change'],

  incentives: {
    items: [],
    pricingClassification: 'clean',
    asOfDate: '2026-03-24',
    notes: 'Pre-construction stage. No pricing or incentive data yet. Update when sales launch.',
  },

  pressHighlights: [
    { source: 'St Pete Catalyst', date: 'April 2024', headline: 'Dramatically altered Mirror Lake project receives unanimous DRC approval — 40% reduction from original 18-story, 77-unit plan' },
    { source: 'St Pete Rising', date: 'March 2024', headline: 'Development Review Commission approves 11-story Mirror Lake condo tower' },
    { source: 'Florida YIMBY', date: 'March 2024', headline: 'Developer reveals downsized plans for Mirror Lake condominium tower' },
  ],

  marketEvidence: [
    { metric: 'Project Scale Reduction', value: '40% cut from original plans', description: 'The original proposal was an 18-story, 77-unit tower. DRC approval came only after a dramatic reduction to 13 stories and 45 units — a 40% cut in unit count. This is not a design choice; it reflects regulatory pushback on density at Mirror Lake. The reduced scale limits revenue potential but positions Lake House as boutique rather than mid-rise commodity.' },
    { metric: 'Project Cost', value: '$90M ($2M/unit average)', description: 'At $90M total project cost across 45 units, the developer must average $2M per unit to break even before profit margin. With entry pricing from $800K for 980 SF units, the math requires penthouses and upper-floor 3BRs to carry the revenue load at $2.5-3M+. This cost structure leaves limited room for pricing concessions.' },
    { metric: 'Architect Overlap', value: 'PLACE Architecture (same as The Cade)', description: 'Tim Clemmons of PLACE Architecture designed both Lake House and The Cade — the only two new developments on Mirror Lake. Same architect, same lake, adjacent parcels. This is not coincidental: PLACE has deep entitlement knowledge of the Mirror Lake district\'s design review requirements, which gives both projects a permitting advantage over outside firms.' },
    { metric: 'Boutique Lakefront Scarcity', value: '45 units — 2nd smallest in pipeline', description: 'At 45 units, Lake House is the second-smallest project in the active Pinellas pipeline after The Cade (15 units). Combined, these two projects add only 60 units to the Mirror Lake submarket. This constrained supply supports pricing power — there is no other lakefront product available at this scale in downtown St. Petersburg.' },
    { metric: 'Shadow Inventory Status', value: 'DRC approved, no sales launched', description: 'Lake House has DRC approval but has not announced a sales team, launched pricing, or entered MLS. The project remains shadow inventory — it will impact market supply calculations when it activates, but the timeline is uncertain. Skyward Living (Hudson Harr) has not disclosed a groundbreaking date or construction lender.' },
  ],

  advisoryInsights: [
    { title: 'For Buyer Advisors', content: 'Lake House fills a gap in the pipeline: lakefront product at $800K entry, below The Cade\'s $1.92M floor but above Reflection\'s closeout inventory. The 980 SF 1BR units are the smallest in any boutique Pinellas project — suitable for pied-a-terre or downsizer buyers, not primary family residences. No sales team has been announced, so there is no one to contact yet. Monitor St Pete Rising and Florida YIMBY for launch announcements. Buyers interested in Mirror Lake should also evaluate The Cade\'s three remaining units — they are selling now while Lake House remains speculative.' },
    { title: 'For Listing Advisors', content: 'When Lake House activates, it will directly compete with Reflection\'s remaining developer inventory (7 units, $899K-$2.055M) and The Cade\'s unsold units. The $800K entry point undercuts Reflection\'s current floor and could pull demand from resale listings in the Mirror Lake corridor. If you hold Reflection resales, consider pricing adjustments before Lake House launches. The 45-unit supply injection will be modest in absolute terms but concentrated in a micro-submarket (Mirror Lake) where every new unit has outsized pricing impact.' },
  ],

  seo: {
    title: 'Lake House St. Petersburg | Boutique Waterfront Residences from $800Ks',
    description:
      'Lake House — 45 condominiums in a 13-story tower on Mirror Lake. 980-2,800 SF, from $800Ks. 4 penthouses. $90M by Skyward Living, designed by PLACE Architecture. Delivery 2027.',
    keywords: ['Lake House', 'Mirror Lake', 'St. Petersburg condos', 'boutique', 'Skyward Living', 'PLACE Architecture'],
  },
};
