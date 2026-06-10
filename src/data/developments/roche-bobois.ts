import { DevelopmentProfile } from '@/types/development-profile';

export const rocheBobois: DevelopmentProfile = {
  slug: 'roche-bobois',
  name: 'Roche Bobois Maison',
  tagline: 'French-Branded Luxury in Downtown St. Petersburg',
  description:
    'A lifestyle-branded tower that demands scrutiny. VALOR Capital reports "40+ contracts" — but 39 are internal investor allocations used as an equity raise mechanism with reassignment rights back to developer inventory. That is not market absorption. That is financing. Zero confirmed arm\'s-length sales as of April 2026. The $1,433/SF 2BR ask and $13.2M Sky Penthouse ($2,727/SF — a Tampa Bay record) remain untested against actual buyer demand. No other developer in this market uses this capital structure.',
  location: '344 4th St. S, St. Petersburg 33701',
  address: '344 4th St. S',
  city: 'St. Petersburg',
  county: 'pinellas',
  status: 'pre-sales',
  statusLabel: 'Pre-Sales',
  type: 'Branded Residence',

  price: 'From $544,500',
  bedrooms: 'Studio-3 + PH',
  bathrooms: '1-4.5',
  sqft: '370-4,840 SF', // MLS confirms studios at 370 SF, penthouses to 4,840 SF
  totalUnits: 164,
  unitSizes: '370-4,840 SF',
  deliveryDate: 'Jan 2029', // MLS Proj Comp Date: 01/31/2029
  stories: 29,

  lastUpdated: '2026-04-08',

  developer: 'VALOR Capital',
  architect: 'Gomez Vazquez International',
  interiorDesigner: 'Niz + Chauvet Arquitectos',
  salesTeam: [
    { name: 'Ryan Serhant', title: 'SERHANT. New Development — Lead Brokerage' },
  ],
  salesAgents: [
    { name: 'Ryan Serhant', title: 'Lead Agent', brokerage: 'SERHANT.', phone: '212-620-7200', email: 'info@serhant.com' },
    { name: 'David Cook III', title: 'Sales Executive', brokerage: 'SERHANT.', phone: '727-615-4440' },
    { name: 'Val Garcia', title: 'Sales Executive', brokerage: 'SERHANT.', phone: '727-615-4440' },
    { name: 'Katia Fernandez PA', title: 'Sales Executive', brokerage: 'SERHANT.', phone: '727-615-4440' },
  ],
  website: 'https://rocheboboistower.com/',
  phone: '727-615-4440',
  // HOA: Not disclosed in MLS listings. SERHANT listings omit HOA fee data — unusual for Tampa Bay new construction.
  // Every other active building in the pipeline discloses HOA in MLS. This is a red flag for buyer due diligence.
  rentalPolicy: '1-month minimum — most flexible in downtown St. Pete. Pets allowed.',
  brokerCommission: '3% co-op',
  socialMedia: {
    instagram: 'https://www.instagram.com/valorcapitalusa',
    facebook: 'https://www.facebook.com/valorcapitalusa',
    linkedin: 'https://www.linkedin.com/company/valor-capital-real-estate-development/',
  },

  features: [
    'Floor-to-ceiling glass windows',
    'Private terraces with city views',
    'Premium Italian cabinetry',
    'Spa-inspired bathrooms',
    'Wine storage',
    'Smart home integration',
    'High-end appliances',
  ],
  amenities: [
    'Resort-style heated pool with swim lane and sun shelf',
    'Glass-edge cantilevered jacuzzi',
    'Poolside cabanas and summer kitchens',
    'Fire pit and fireside lounge',
    'Fitness studio and spa with sauna and aquatic therapy',
    '24/7 concierge services',
    'VIP Owner\'s Lounge',
    '4,000 SF signature restaurant',
    '5,000 SF Public Arts Plaza',
    'Pet park',
    'EV charging stations',
    'Cold storage and package management',
  ],
  galleryImages: [
    'https://images.squarespace-cdn.com/content/v1/55467dc6e4b0ebaf8fab24a0/37e731a4-33b1-4fa1-9fb3-8e86633e617b/rbspt_gallery_exterior_2_d001521301.jpeg',
    'https://images.squarespace-cdn.com/content/v1/55467dc6e4b0ebaf8fab24a0/5db56b22-f6e8-485f-8d00-3f637ea41ae9/rbspt_gallery_exterior_4_f8d6a0461c.jpeg',
    'https://images.squarespace-cdn.com/content/v1/55467dc6e4b0ebaf8fab24a0/4503a95f-4bb6-4381-96d1-dc1cc9de82f1/rbspt_gallery_exterior_11_4047538593.jpeg',
    'https://admin.rocheboboistower.com/uploads/rbspt_residences_interiors_1_b65c0a91cf.jpg',
    'https://admin.rocheboboistower.com/uploads/rbspt_residences_interiors_2_ecc4c777e5.jpg',
    'https://admin.rocheboboistower.com/uploads/rbspt_residences_penthouses_1s_9bcf5c47ec.jpg',
    'https://admin.rocheboboistower.com/uploads/rbspt_residences_penthouses_2s_2438966d84.jpg',
    'https://admin.rocheboboistower.com/uploads/rbspt_home_amenities_gallery_1s_1638d1e962.jpg',
    'https://admin.rocheboboistower.com/uploads/rbspt_home_amenities_gallery_3b_7e814a75bf.jpg',
    'https://admin.rocheboboistower.com/uploads/rbspt_residences_services_details_d4c6a09506.jpg',
  ],

  scores: {
    walkScore: 96,
    bikeScore: 89,
    transitScore: 56,
  },

  documents: {
    executiveReportUrl: '/docs/roche-bobois/executive-report.pdf',
    pitchDeckUrl: '/docs/roche-bobois/pitch-deck.pdf',
  },

  lifecycle: {
    announcementDate: '2024',
    salesLaunchDate: '2025',
    groundbreakingDate: 'March 2026',
    constructionStartDate: 'Summer 2026',
    estimatedSelloutDate: '2029',
  },

  pricingHistory: {
    launchPsf: 1433,   // 2BR comparable PSF — launch and current are the same (brand new to market, just launched)
    currentPsf: 1433,  // 2BR MLS LP/SF ($1,433) — best comparable to other buildings. Studios inflate avg to $1,632 due to small SF denominator.
    launchPriceRange: 'From $544,500',
    currentPriceRange: '$544,500-$13,200,000',
    priceChangePercent: 0, // Brand new to market — no appreciation yet (just launched)
    asOfDate: '2026-04-08',
    // PSF by unit type (MLS Apr 2026):
    //   Studios (370 SF): $1,472-$1,993/SF — inflated by small denominator, not comparable
    //   1BR (565 SF): $1,495-$1,762/SF — still inflated
    //   2BR (963 SF): $1,433/SF — best apples-to-apples comparable
    //   3BR (1,205 SF): $1,637/SF — premium positioning
    // CAUTION: Avg PSF across all units ($1,632) is misleading for market comparison.
    // Use 2BR+ PSF ($1,433-$1,637) for peer comparison to Waldorf ($1,503), 400 Central ($950).
  },

  // ─── MLS Active Inventory (April 2026) ─────────────────────────────────
  // 6 active listings — all SERHANT. Avg $1,632/SF. Highest PSF in Tampa Bay pipeline.
  // Unit 605: Studio, 370 SF, $544,500 ($1,472/SF), DOM 40, David Cook III
  // Unit 1805: Studio, 370 SF, $737,500 ($1,993/SF), DOM 21, David Cook III
  // Unit 608: 1BR, 565 SF, $844,500 ($1,495/SF), DOM 40, Val Garcia
  // Unit 808: 1BR, 565 SF, $995,500 ($1,762/SF), DOM 21, Val Garcia
  // Unit 1503: 2BR, 963 SF, $1,379,500 ($1,433/SF), DOM 40, Katia Fernandez PA
  // Unit 2009: 3BR, 1,205 SF, $1,972,500 ($1,637/SF), DOM 40, Ryan Serhant
  // Rental: 1-month minimum (most flexible in downtown St Pete). Pets allowed.
  // Floor premium: FL6 studio $544K → FL18 studio $738K = +$16K/floor
  // Proj Comp Date: 01/31/2029. Year built: 2027 (construction timeline).

  riskFlags: ['competitive-supply-pressure', 'unconventional-capital-structure'],
  // RISK: 39 of "40+ contracts" are internal VALOR Capital investor allocations — equity raise, NOT market demand.
  // These carry reassignment rights back to developer inventory. No other Tampa Bay developer uses this structure.
  // True market absorption is 0 as of April 2026. Investors may flood resale market if reassigned.

  incentives: {
    items: [],
    pricingClassification: 'clean',
    asOfDate: '2026-04-13',
    notes: 'Pre-sales via SERHANT. 6 MLS listings at avg $1,632/SF. Developer-reported "40+ contracts" are primarily internal VALOR Capital investor allocations (39 units) used as equity raise — NOT arm\'s-length market sales. True market demand: 0 confirmed closed. These investors hold reassignment rights to return units to developer inventory.',
  },

  pressHighlights: [
    { source: 'Tampa Bay Times', date: 'February 2026', headline: '$13.2M Sky Penthouse sets Tampa Bay pre-sale record at $2,727/SF' },
    { source: 'Tampa Bay Business & Wealth', date: 'February 2026', headline: 'Ryan Serhant leads sales for Roche Bobois St. Pete Tower' },
    { source: 'Bay News 9', date: 'February 2026', headline: 'Pink-painted buildings catch public eye before Roche Bobois tower demolition' },
  ],

  marketEvidence: [
    { metric: 'Confirmed Arm\'s-Length Sales', value: '0', description: 'Despite developer claims of "40+ contracts," 39 are internal VALOR Capital investor allocations functioning as an equity raise mechanism with reassignment rights back to developer inventory. Zero confirmed arm\'s-length sales from unaffiliated buyers as of April 2026. No other developer in the Tampa Bay pipeline uses this capital structure.' },
    { metric: 'Price Per SF (2BR Basis)', value: '$1,433/SF', description: 'The 2BR comparable PSF is $1,433 — the only apples-to-apples metric for peer comparison. Studios inflate the average to $1,632/SF due to the small square footage denominator (370 SF). At $1,433/SF, Roche Bobois prices 5% below Waldorf ($1,503/SF) but without hospitality brand services, without a track record, and without disclosed HOA fees.' },
    { metric: 'Sky Penthouse Ask', value: '$13.2M ($2,727/SF)', description: 'The 4,840 SF Sky Penthouse at $2,727/SF would set a Tampa Bay record if it closes. This price point has never been tested in this market. The nearest comparable is Waldorf\'s penthouse tier at ~$1,800/SF. A $900/SF premium over Waldorf requires extraordinary justification that a lifestyle furniture brand — not a hospitality operator — may not provide.' },
    { metric: 'HOA Disclosure', value: 'Not disclosed', description: 'SERHANT listings omit HOA fee data in MLS — the only active building in the downtown St. Petersburg pipeline to do so. Every peer (Waldorf at $1.40/SF, Reflection at $0.85/SF, 400 Central at $0.73/SF) discloses HOA. Non-disclosure is a material due diligence red flag for buyers and their advisors.' },
    { metric: 'Capital Structure Risk', value: '39 investor allocations with reassignment rights', description: 'Internal investors hold contractual rights to reassign units back to developer inventory. If the project underperforms or market conditions shift, these 39 units could flood back as developer inventory simultaneously — creating a sudden supply shock that would undercut any genuine buyer who purchased at full ask.' },
    { metric: 'Brand Category', value: 'Lifestyle (furniture) vs. Hospitality', description: 'Roche Bobois is a French furniture brand, not a hotel operator. There is no concierge infrastructure, no loyalty program, no global reservation network. Buyers paying branded-residence premiums should understand the distinction: this is a licensing deal for interiors, not a Four Seasons or Waldorf-class service commitment.' },
  ],

  advisoryInsights: [
    { title: 'For Buyer Advisors', content: 'Three diligence items are non-negotiable before any client writes a contract here. First, request the HOA budget and reserve study — the refusal to disclose HOA in MLS is without precedent in this market. Second, demand written clarification on the 39 investor contracts: what triggers reassignment, what is the timeline, and what happens to pricing if 39 units re-enter inventory simultaneously. Third, compare the $1,433/SF 2BR ask to Waldorf ($1,503/SF with Hilton concierge and loyalty program) and 400 Central ($950/SF delivered and closed). The burden of proof is on VALOR Capital to justify the premium.' },
    { title: 'For Listing Advisors', content: 'If you hold inventory at Waldorf, 400 Central, or Reflection, Roche Bobois is not yet a competitive threat — it has zero confirmed closings and a January 2029 delivery date. However, the $544K studio entry point could siphon investor-buyer inquiries from 400 Central resales. Monitor SERHANT\'s MLS activity for price reductions or incentive signals. If the 39 internal contracts begin reassigning, expect a pricing disruption event that would affect every downtown St. Pete listing above $1,000/SF.' },
  ],

  seo: {
    title: 'Roche Bobois Maison St. Petersburg | Branded Residences from $544,500',
    description:
      'Roche Bobois Maison — 164 branded residences in a 29-story tower in downtown St. Petersburg. Studios to 4BR penthouses, $13.2M Sky Penthouse, 2029 delivery by VALOR Capital.',
    keywords: ['Roche Bobois', 'St. Petersburg luxury', 'branded residences', 'VALOR Capital', 'downtown St Pete'],
  },
};
