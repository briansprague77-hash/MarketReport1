/**
 * DevelopmentProfile — Mid-tier data type for development detail pages
 *
 * This type is used for developments that do NOT have the full analytical
 * `Development` type (pricing ladders, sales metrics, floor premiums, etc.).
 * It captures the rich descriptive data available from developer disclosures:
 * features, amenities, gallery images, construction progress, and contact info.
 *
 * Waldorf Astoria uses the full `Development` type.
 * All other developments use `DevelopmentProfile`.
 */

import { DevelopmentStatus, PriorPhasePerformance, TailInventoryAnalysis, PressHighlight } from './development';

export interface ConstructionMilestone {
  title: string;
  date: string;
  completed: boolean;
}

export interface ConstructionProgress {
  percent: number;
  status: string;
  milestones: ConstructionMilestone[];
}

export interface SalesTeamMember {
  name: string;
  title: string;
}

/** Individual sales agent with direct contact info */
export interface SalesAgent {
  name: string;
  title: string;           // e.g., "Sales Executive", "Lead Agent"
  brokerage: string;       // e.g., "Smith & Associates Real Estate"
  phone?: string;
  email?: string;
  photo?: string;          // URL to headshot
}

export interface SocialMediaLinks {
  instagram?: string;
  facebook?: string;
  youtube?: string;
  linkedin?: string;
  tiktok?: string;
}

/** Curated social proof — hand-picked buyer/resident quotes from reviews, social media, etc. */
export interface SocialProofItem {
  /** Platform source: 'google', 'instagram', 'facebook', 'yelp', 'realtor' */
  platform: 'google' | 'instagram' | 'facebook' | 'yelp' | 'realtor' | 'zillow';
  /** Display name (first name + last initial, e.g. "Michael T.") */
  author: string;
  /** The quote / review excerpt (keep under 200 chars for display) */
  text: string;
  /** Approximate date of the review (YYYY-MM or "2024") */
  date?: string;
  /** Star rating if applicable (1-5) */
  rating?: number;
}

export interface LocationScores {
  walkScore?: number;
  bikeScore?: number;
  transitScore?: number;
  culturalScore?: number;
  restaurantScore?: number;
  hospitalScore?: number;
}

export interface DevelopmentProfile {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  location: string;
  address: string;
  city: string;
  county: 'pinellas' | 'hillsborough' | 'sarasota';
  status: DevelopmentStatus;
  statusLabel?: string; // e.g. "Available Now — 83 Remain", "Delivered — 7 Remain"
  type: 'Condominium' | 'Branded Residence';

  // Pricing & units
  price: string;
  bedrooms: string;
  bathrooms: string;
  sqft: string;
  totalUnits: number;
  unitSizes: string;
  deliveryDate: string;

  // Building
  stories?: number;
  hoaPerSqFt?: number;           // Monthly HOA fee per square foot (e.g. 0.55 = $0.55/SF)

  // Data freshness
  lastUpdated?: string;          // ISO date of most recent data update (YYYY-MM-DD)

  // Team
  developer: string;
  architect?: string;
  interiorDesigner?: string;
  salesGallery?: string;
  salesTeam?: SalesTeamMember[];
  /** Structured agent contacts with phone + email for development pages */
  salesAgents?: SalesAgent[];
  website?: string;
  phone?: string;
  socialMedia?: SocialMediaLinks;

  // Policies
  rentalPolicy?: string;        // e.g. "No restrictions", "1-year minimum"
  brokerCommission?: string;    // e.g. "3% co-op", "4% co-op"

  // Content
  features: string[];
  amenities: string[];
  services?: string[];
  galleryImages: string[];

  // Social proof — curated buyer quotes
  socialProof?: SocialProofItem[];

  // Press highlights — notable media mentions
  pressHighlights?: PressHighlight[];

  // Scores
  scores?: LocationScores;

  // Construction
  constructionProgress?: ConstructionProgress;

  // Prior phase performance (for Tower 2 / Phase 2 developments)
  priorPhase?: PriorPhasePerformance;

  // Tail inventory analysis (developer closeout vs. owner resales)
  tailInventory?: TailInventoryAnalysis;

  // Downloadable documents — broker tools, fact sheets, brochures, etc.
  documents?: {
    purchaseAgreementUrl?: string;
    condoDocsUrl?: string;
    /** Google Drive (or similar) folder URL for all developer materials */
    driveFolderUrl?: string;
    /** Flexible: any additional doc URLs */
    [key: string]: string | undefined;
  };

  // Project Lifecycle
  lifecycle?: {
    announcementDate?: string;
    siteAcquisitionDate?: string;
    salesGalleryOpening?: string;
    salesLaunchDate?: string;
    groundbreakingDate?: string;
    constructionStartDate?: string;
    verticalConstructionDate?: string;
    toppingOffDate?: string;
    coDate?: string;           // Certificate of Occupancy
    firstClosingDate?: string;
    estimatedSelloutDate?: string;
  };

  // Pricing History
  pricingHistory?: {
    launchPsf?: number;       // PSF at sales launch
    currentPsf?: number;      // Current average PSF
    launchPriceRange?: string; // e.g., "$450K-$1.2M"
    currentPriceRange?: string; // e.g., "$816K-$2.05M"
    priceChangePercent?: number; // e.g., 12.5 for +12.5%
    asOfDate?: string;
  };

  // Risk Assessment
  riskFlags?: Array<'construction-delay' | 'slow-sales' | 'high-price-positioning' | 'competitive-supply-pressure' | 'developer-change' | 'permitting-risk' | 'unconventional-capital-structure'>;

  // MLS Sales Intelligence
  mlsSummary?: {
    totalRecords?: number;
    sold?: number;
    active?: number;
    pending?: number;
    cancelled?: number;
    withdrawn?: number;
    expired?: number;
    avgSoldPrice?: number;
    medianSoldPrice?: number;
    avgSoldPsf?: number;
    medianSoldPsf?: number;
    soldPriceRange?: string;
    avgActivePrice?: number;
    avgActivePsf?: number;
    activePriceRange?: string;
    avgActiveDom?: number;
    firstClosing?: string;
    latestClosing?: string;
    avgClosingsPerMonth?: number;
    primaryListingAgent?: string;
    primaryListingOffice?: string;
    cancelledNote?: string;
    asOfDate?: string;
    developerActiveCount?: number;
    resaleActiveCount?: number;
    developerActiveUnits?: string;
    resaleActiveUnits?: string;
    uniqueUnitsSoldViaMls?: number;
    resaleTransactions?: number;
    resaleUnits?: string;
  };

  // PCPAO Ownership Intelligence
  pcpaoSummary?: {
    totalUnits?: number;
    unitsWithDeeds?: number;
    unsoldDeveloperUnits?: number;
    sellThrough?: number;
    residentialFloors?: string;
    unitsPerFloor?: number;
    stacks?: number;
    stackNames?: string;
    websiteAvailableUnits?: number;
    websiteAvailableDetails?: string;
    asOfDate?: string;
  };

  // Floor Plans (for profiles without full Development floorPlanSpecs)
  floorPlans?: Array<{
    name: string;
    bedrooms: number;
    bathrooms: string;
    den?: boolean;
    sfRange: string;
    floors?: string;
  }>;

  // Incentive Tracking
  incentives?: {
    items: Array<{
      type: 'hoa-credit' | 'parking-included' | 'storage-included' | 'finish-upgrade' | 'closing-cost-credit' | 'broker-bonus' | 'rate-buydown' | 'furniture-package' | 'other';
      description: string;
      estimatedValue?: number; // dollar amount
      scope?: string; // e.g., "all remaining units", "penthouses only"
    }>;
    effectiveDiscountRate?: number; // percentage, e.g., 3.5 for 3.5% effective discount
    pricingClassification?: 'clean' | 'mild-incentives' | 'moderate-incentives' | 'heavy-incentives';
    asOfDate?: string;
    notes?: string;
  };

  // Market Evidence — sourced metrics with analytical context
  marketEvidence?: Array<{
    metric: string;
    value: string;
    description: string;
  }>;

  // Advisory Insights — actionable intelligence for buyer and listing agents
  advisoryInsights?: Array<{
    title: string;
    content: string;
  }>;

  // SEO
  seo: {
    title: string;
    description: string;
    keywords: string[];
  };
}
