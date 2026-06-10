export type DevelopmentStatus =
  | 'shadow-inventory'   // Not announced to market yet — known pipeline, no public sales
  | 'reservation'        // Announced, accepting reservations / deposits
  | 'pre-sales'          // Active pre-sales — contracts being signed
  | 'under-construction' // Active construction underway
  | 'delivered'          // Delivered — units closing or closed, resale active
  | 'sold-out';          // Developer sold out — resale only
export type DevelopmentTier = 'ultra-luxury' | 'luxury' | 'premium' | 'attainable-luxury';
export type BadgeType =
  | 'Tier 1 Luxury'
  | 'Tier 2 Luxury'
  | 'Tier 3 Luxury'
  | 'Hospitality Brand'
  | 'Lifestyle Brand'
  | 'Waterfront'
  | 'Beachfront'
  | 'Boutique'
  | 'Mixed-Use'
  | 'Short-Term Rental'
  | 'New to Market';

export interface PricePoint {
  bedroomCount: number;
  label: string;
  startingPrice: number;
  pricePerSqFt?: { min: number; max: number };
}

export interface MonthlySalesData {
  month: string;
  unitsSold: number;
  cumulative: number;
  cumulativePercent: number;
}

export interface SalesMetrics {
  totalUnits: number;
  soldUnits: number;
  availableUnits: number;
  soldPercentage: number;
  /** Average units/month across the full sales period since launchDate */
  absorptionRate: number;
  /** Display string for the headline sales pace (e.g., "~4.6/mo since 2022") */
  velocity: string;
  /** Optional: recent delivery-wave closing pace, distinct from sales pace */
  deliveryPaceRecent?: string;
  selloutEstimate: string;
  contractValue: string;
  launchDate: string;
  peakMonth: { month: string; units: number };
  averageMonthly: number;
  monthlySales?: MonthlySalesData[];
}

/** Orientation tag for floor plan position within the tower */
export type FloorPlanOrientation = 'east' | 'west' | 'north' | 'south' | 'flowthrough' | 'corner';

/** Segment grouping for filtering (e.g., "2 Bed", "3 Bed East", "3 Bed Flowthrough") */
export type FloorPlanSegment = string;

/** Per-residence-type floor plan specifications */
export interface FloorPlanSpec {
  residenceType: string;
  levels: string;
  bedrooms: number;
  bathrooms: string;
  livingSF: number;
  terraceSF: number;
  totalSF: number;
  orientation?: FloorPlanOrientation;
  segment?: FloorPlanSegment;
  /** URL to floor plan image (rendering, layout diagram, etc.) */
  floorPlanImage?: string;
}

export interface AmenityHighlight {
  name: string;
  description: string;
  level?: string;
  sqft?: string;
}

export interface AirportDistance {
  name: string;
  code?: string;
  driveTime: string;
  /** FBO / private terminal services description */
  fbo?: string;
  /** Notable developments or upcoming changes */
  note?: string;
}

export interface BuildingSpecifications {
  totalFloors: number;
  residentialFloors: { from: number; to: number };
  totalResidences: number;
  heightFeet: number;
  heightStories: number;
  unitMix: string;
  floorPlans: { typical: number; penthouse: number };
  ceilingHeight: { typical: string; penthouse?: string };
  pricePerSqFt: { average: number; min: number; max: number };
  totalProjectCost?: string;
  constructionLender?: string;
  officeSpaceSF?: number;
  retailSpaceSF?: number;
  amenitySpaceSF?: number;
  poolDeckSF?: number;
  constructionTimeline?: string;
  stormResiliency?: string[];
  floorPlanSpecs?: FloorPlanSpec[];
  amenityHighlights?: AmenityHighlight[];
  airports?: AirportDistance[];
}

export interface ResidencePolicy {
  category: string;
  icon: string;
  headline: string;
  details: string[];
  advisory?: string;
}

export interface FinancingInfo {
  preConstruction: {
    depositPercent: number;
    balancePercent: number;
    closingPhase: string;
    preApprovalStrategy: string;
    developerFeePercent?: number;
    hoaCapitalContribution?: string;
  };
  jumboLoanParams: {
    minDownPayment: string;
    creditScoreMin: string;
    dtiRatio: string;
    cashReserves: string;
  };
  lenders: {
    name: string;
    specialty: string;
  }[];
  advisory: string;
}

export interface MarketEvidence {
  metric: string;
  value: string;
  description: string;
}

export interface Competitor {
  name: string;
  height: string;
  units: number;
  avgPsf: string;
  delivery: string;
  status: string;
  isFeatured?: boolean;
}

export interface LocationCategory {
  name: string;
  icon: string;
  venues: {
    name: string;
    description: string;
    distance?: string;
    walkTime?: string;
  }[];
}

export interface LocationScore {
  label: string;
  score: number;
  descriptor: string;
}

export interface Visionary {
  role: string;
  companies: {
    name: string;
    description: string;
    quote?: string;
    quoteAttribution?: string;
  }[];
}

export interface TimelineEvent {
  date: string;
  title: string;
  description: string;
  absorption?: string;
  status: 'completed' | 'active' | 'upcoming';
}

/** Source type for price data provenance tracking */
export type PriceSource =
  | 'developer-price-sheet'           // Official developer pricing (Legacy Pricing Sheet, current sheet)
  | 'developer-featured-availability' // Developer Featured Availability list (post-MLS re-pricing)
  | 'mls-listing'                     // Active MLS listing (Stellar MLS, etc.)
  | 'mls-pending'                     // Under contract / pending on MLS
  | 'mls-closed'                      // Closed sale recorded on MLS
  | 'property-appraiser'              // County property appraiser records (official closing)
  | 'press'                           // Press-reported price (Bloomberg, Forbes, etc.)
  | 'broker-reported'                 // Broker-confirmed price (not yet on MLS)
  | 'assignment'                      // Pre-construction contract assignment / resale
  | 'estimate';                       // Calculated / estimated (interpolation, etc.)

/** Trend direction computed from price history */
export type PriceTrend = 'up' | 'down' | 'stable' | 'new';

/** Single immutable price entry — append-only, never overwritten */
export interface PriceEntry {
  price: number;                      // Price in USD at this point in time
  psfLiving: number;                  // $/SF based on living SF (interior only)
  psfTotal: number;                   // $/SF based on total SF (living + terrace)
  source: PriceSource;                // Provenance category
  sourceDetail: string;               // Human-readable source note (e.g., "Legacy Pricing Sheet — April 2025")
  dateRecorded: string;               // ISO date when this price was recorded/observed (YYYY-MM-DD)
  dateEffective?: string;             // ISO date when price took effect (if different from recorded)
  mlsNumber?: string;                 // MLS listing ID if applicable
  status?: 'active' | 'pending' | 'closed' | 'withdrawn' | 'expired';
  daysOnMarket?: number;              // DOM if MLS-sourced
  pricePerFloor?: number;             // Computed: price delta per floor from lowest comparable
  notes?: string;                     // Optional context (e.g., "Launch day pricing", "Seller concession")
}

/** A single unit's full price history — unit IDs are permanent, prices are appended */
export type UnitStatus = 'available' | 'under-contract' | 'sold' | 'withdrawn' | 'resale' | 'pending';

export interface UnitPricingLedger {
  unit: string;                       // Unit number (e.g., "2301") — immutable identifier
  floor: number;                      // Floor number — immutable
  residenceType: string;              // Residence plan type (e.g., "Residence 01") — immutable
  bedrooms: number;                   // Bed count from floor plan — immutable
  bathrooms: string;                  // Bath count from floor plan — immutable
  livingSF: number;                   // Interior living SF from floor plan — immutable
  terraceSF: number;                  // Terrace SF from floor plan — immutable
  totalSF: number;                    // Total SF (living + terrace) — immutable
  currentPrice: number;               // Most recent known price (convenience field, always = last entry)
  currentPsfLiving: number;           // Most recent PSF on living SF
  currentPsfTotal: number;            // Most recent PSF on total SF
  trend: PriceTrend;                  // Computed from price history
  trendPercent?: number;              // % change from first to latest price (null if only 1 entry)
  status?: UnitStatus;                // Unit disposition — defaults to 'available' if omitted
  priceHistory: PriceEntry[];         // Append-only ledger — oldest first, newest last. NEVER delete entries.
}

/** Floor premium analysis for a residence type */
export interface FloorPremiumAnalysis {
  residenceType: string;
  basePricePerFloor: number;          // Average $/floor premium across sampled floors
  accelerationFactor?: number;        // If premium increases on higher floors (>1.0 = accelerating)
  sampleRange: { lowFloor: number; highFloor: number };
  premiumPerFloor: { fromFloor: number; toFloor: number; perFloor: number }[];
}

/** The complete pricing ladder for a development — append-only architecture */
export interface PricingLadder {
  buildingName: string;                           // Building this ladder belongs to
  lastUpdated: string;                            // ISO date of most recent data point
  totalTrackedUnits: number;                      // Count of units in the ledger
  psfRange: { min: number; max: number };         // Overall PSF range (living SF basis)
  priceRange: { min: number; max: number };       // Overall price range
  averagePsfLiving: number;                       // Weighted average PSF (living SF)
  floorPremiums: FloorPremiumAnalysis[];          // Floor premium analysis per residence type
  units: UnitPricingLedger[];                     // The master ledger — every unit ever priced
  dataSources: {                                  // Summary of all data sources feeding this ladder
    source: PriceSource;
    count: number;
    dateRange: { earliest: string; latest: string };
  }[];
  transparencyNote?: string;                       // Optional note about pricing anomalies (e.g., documented price decreases)
}

/** Legacy format preserved for backward compatibility */
export interface ResidencePricing {
  residenceType: string;
  units: {
    unit: string;
    floor: number;
    price: number;
  }[];
}

export interface DevelopmentImage {
  src: string;
  alt: string;
  caption?: string;
  credit?: string;
}

export interface DevelopmentImages {
  hero: DevelopmentImage;
  card: DevelopmentImage;           // Thumbnail for listing cards / index pages
  gallery?: DevelopmentImage[];     // Interior/amenity renderings
  ogImage?: string;                // Open Graph share image path
}

export interface PenthouseDetails {
  price: string;
  sqft: string;
  floors: string;
  features: string[];
  recordNote: string;
}

export interface PressHighlight {
  source: string;
  date: string;
  headline: string;
  quote?: string;
  quoteAttribution?: string;
}

/** Source discrepancy or data advisory for transparency in the report */
export interface SourceNote {
  category: string;
  field: string;
  note: string;
  sources?: { name: string; value: string }[];
  resolution: string;
}

/** Residence features — kitchens, bathrooms, smart home, finishes */
export interface ResidenceFeatures {
  kitchen: string[];
  bathroom: string[];
  smartHome: string[];
  general: string[];
}

/** Services included with ownership */
export interface OwnershipServices {
  standard: string[];
  alaCarte: string[];
  hiltonBenefits: string[];
}

/** Tail inventory analysis — when a building is nearing sellout, track developer vs. resale dynamics */
export interface TailInventoryAnalysis {
  totalUnits: number;
  developerUnitsRemaining: number;
  developerAskingPsf?: number;          // Developer's current asking $/SF for remaining
  resaleListings: number;               // Owner resales currently listed on MLS
  resaleAskingPsf?: number;             // Average $/SF of owner resale listings
  resaleClosedPsf?: number;             // Average $/SF of closed resales
  closedResales?: number;               // Count of closed resale transactions
  psfPremiumVsDeveloper?: number;       // % premium (or discount) resales command vs original developer price
  daysOnMarketAvg?: number;             // Average DOM for resales
  lastDeveloperClose?: string;          // ISO date of most recent developer closing
  lastResaleClose?: string;             // ISO date of most recent resale closing
  keyInsights: string[];                // Narrative bullets about the tail market dynamics
}

/** Prior phase / Tower 1 performance data for multi-phase developments */
export interface PriorPhasePerformance {
  phaseName: string;              // e.g., "Tower I", "Marina Pointe Sol"
  totalUnits: number;
  soldUnits: number;
  soldPercentage: number;
  launchDate: string;             // ISO date
  selloutDate?: string;           // ISO date — when it sold out (if applicable)
  monthsToSellout?: number;       // Months from launch to sellout
  absorptionRate?: number;        // Units/month average
  averagePsf?: number;            // Avg $/SF at close
  psfRange?: { min: number; max: number };
  priceRange?: { min: number; max: number };
  deliveryDate?: string;          // When Tower 1 delivered
  keyTakeaways: string[];         // Narrative bullets about T1 performance
}

/** Broker commission and co-op payout structure for a development */
export interface CommissionPayout {
  label: string;           // e.g., "After Rescission Period", "At Closing"
  percent: number;         // e.g., 50 (meaning 50% of total commission)
}

export interface BrokerCommission {
  coOpPercent: number;                    // Co-op commission % (e.g., 3)
  paidBy: string;                        // Who pays (e.g., "PMG / Waldorf Astoria Residences")
  payoutSchedule: CommissionPayout[];     // How commission is split across milestones
  bonusProgram?: string;                  // Current bonus/incentive description, if any
  bonusContact?: string;                  // Where to inquire about bonuses
  registrationRequired?: boolean;         // Whether buyer registration is required for commission
  registrationNotes?: string;             // Details about registration requirements
  additionalNotes?: string[];             // Any other commission-related advisories
}

export type County = 'pinellas' | 'hillsborough' | 'sarasota';
export type DevelopmentType = 'Condominium' | 'Branded Residence';

export interface Development {
  slug: string;
  name: string;
  fullName: string;
  tagline: string;
  heroDescription?: string;
  images?: DevelopmentImages;
  location: string;
  address: string;
  county: County;
  status: DevelopmentStatus;
  statusLabel?: string;
  tier: DevelopmentTier;
  badges: BadgeType[];
  deliveryDate: string;
  type?: DevelopmentType;
  developer?: string;
  architect?: string;
  description?: string;
  hoaPerSqFt?: number;
  pricePoints: PricePoint[];
  residencePricing?: ResidencePricing[];
  pricingLadder?: PricingLadder;
  salesMetrics: SalesMetrics;
  specifications: BuildingSpecifications;
  residencePolicies: ResidencePolicy[];
  financing: FinancingInfo;
  executiveSummary: {
    overview: string;
    marketSignificance: string;
    salesPerformance: string;
    /** Optional custom title for the Executive Summary section header */
    title?: string;
    /** Optional custom subtitle for the Executive Summary section header */
    subtitle?: string;
    /** Opening narrative paragraph (development-specific market positioning) */
    leadNarrative?: string;
    /** Follow-up paragraph to lead narrative */
    leadNarrativeFollowup?: string;
    /** Styled pullquote block */
    pullquote?: {
      text: string;
      attribution: string;
    };
  };
  brandedValue: {
    title: string;
    propositions: {
      title: string;
      description: string;
    }[];
  };
  marketEvidence: MarketEvidence[];
  competitors: Competitor[];
  /** Custom narrative paragraphs for the Market Analysis section */
  marketNarrative?: string[];
  /** Advisory insight blocks for Market Analysis — for buyer advisors, listing advisors, etc. */
  advisoryInsights?: {
    title: string;
    content: string;
  }[];
  locationCategories: LocationCategory[];
  locationScores: LocationScore[];
  /** Custom eyebrow text for the Location Intelligence section */
  locationEyebrow?: string;
  /** Advisory insight block for Location Intelligence — custom per development */
  locationInsight?: {
    title: string;
    paragraphs: string[];
    highlights: string[];
  };
  visionaries: Visionary[];
  timeline: TimelineEvent[];
  penthouse?: PenthouseDetails;
  pressHighlights?: PressHighlight[];
  sourceNotes?: SourceNote[];
  residenceFeatures?: ResidenceFeatures;
  ownershipServices?: OwnershipServices;
  priorPhase?: PriorPhasePerformance;
  tailInventory?: TailInventoryAnalysis;
  salesTeam?: {
    firm: string;
    leadAgent?: string;
    salesGallery?: string;
    notes?: string;
  };
  /** Structured agent contacts with phone + email for development pages */
  salesAgents?: import('@/types/development-profile').SalesAgent[];
  brokerCommission?: BrokerCommission;

  // Contact & social
  website?: string;
  phone?: string;
  socialMedia?: {
    instagram?: string;
    facebook?: string;
    youtube?: string;
  };

  /** Curated social proof — hand-picked buyer/resident quotes */
  socialProof?: import('@/types/development-profile').SocialProofItem[];

  /** Downloadable documents — broker tools, fact sheets, brochures, etc. */
  documents?: {
    purchaseAgreementUrl?: string;
    condoDocsUrl?: string;
    /** Google Drive (or similar) folder URL for all developer materials */
    driveFolderUrl?: string;
    /** Flexible: any additional doc URLs */
    [key: string]: string | undefined;
  };
  seo: {
    title: string;
    description: string;
    keywords: string[];
  };
}
