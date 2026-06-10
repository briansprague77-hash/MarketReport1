import { Development, County, DevelopmentType } from '@/types/development';
import { DevelopmentProfile } from '@/types/development-profile';

// Full analytical developments (Waldorf + Art House + 400 Central + Four Seasons)
import { waldorfAstoria } from './waldorf-astoria';
import { artHouse } from './art-house';
import { residencesAt400CentralDevelopment } from './400-central';
// DELISTED 2026-06-10: Four Seasons St. Pete — PMG vision; 100% pre-sale condition not met, offer dead. File archived.
// import { fourSeasonsStPete } from './four-seasons-stpete';
import { kolter3rdAve } from './kolter-3rd-ave';
import { kolterBayfront } from './kolter-bayfront';

// Mid-tier development profiles (remaining Pinellas)
import { residencesAt400Central } from './400-central';
import { theCade } from './the-cade';
import { rocheBobois } from './roche-bobois';
import { reflection } from './reflection';
import { coreyLandings } from './corey-landings';
import { viceroyClearwater } from './viceroy-clearwater';
import { lakeHouse } from './lake-house';
import { theBeachmaker } from './the-beachmaker';
import { marinaBayResidences } from './marina-bay-residences';

// Mid-tier development profiles (Hillsborough)
import { alturaBayshore } from './altura-bayshore';
import { oneTampa } from './one-tampa';
import { ritzCarltonTowerII } from './ritz-carlton-tower-ii';
import { pendryTampa } from './pendry-tampa';
import { tampaEdition } from './tampa-edition';
import { hotelOra } from './hotel-ora';
import { aquaWestshore } from './aqua-westshore';
// DELISTED 2026-06-10: Marina Pointe sales office closed; Towers 2 (Luna) & 3 (III) not selling at this time. Files archived.
// import { marinaPointeLuna } from './marina-pointe-luna';
// import { marinaPointeIii } from './marina-pointe-iii';

// ─── DevelopmentSummary — shared card/listing type ──────────────────────────
// Canonical definition lives here; market.ts re-exports it.

import { DevelopmentStatus } from '@/types/development';

export interface DevelopmentSummary {
  slug: string;
  name: string;
  location: string;
  county: County;
  status: DevelopmentStatus;
  statusLabel: string;
  units: number;
  soldPercent?: number;
  avgPsf?: number;          // Blended avg (developer + resale)
  developerClosePsf?: number; // Developer bulk closing avg PSF (historical contract prices)
  resalePsf?: number;        // Current market PSF (resale asks or most recent market-rate transactions)
  delivery: string;
  hasPage: boolean;
  // Enriched fields
  price?: string;
  bedrooms?: string;
  bathrooms?: string;
  sqft?: string;
  image?: string;
  type?: DevelopmentType;
  tags?: string[];
  developer?: string;
  architect?: string;
  address?: string;
  description?: string;
  // Extended fields for 21-row comparison grid
  stories?: number;
  hoaPerSqFt?: number;
  rentalPolicy?: string;
  brokerCommission?: string;
  studioPrice?: string;
  oneBedPrice?: string;
  twoBedPrice?: string;
  threeBedPrice?: string;
  fourBedPlusPrice?: string;
  lastUpdated?: string;
  coordinates?: { lat: number; lng: number };
  submarket?: string;
  inventoryPressure?: 'high' | 'medium' | 'low';
  salesTeamName?: string;
  salesGallery?: string;
  velocity?: string;           // Absorption velocity (e.g., "4.8/mo", "Pre-Sales")
}

// ─── Full Developments (Waldorf Astoria + Art House) ─────────────────────────

export const developments: Record<string, Development> = {
  'waldorf-astoria': waldorfAstoria,
  'art-house': artHouse,
  '400-central': residencesAt400CentralDevelopment,
  // DELISTED 2026-06-10: 'four-seasons-stpete' removed from pipeline (dead deal — see import note above).
};

export function getDevelopment(slug: string): Development | undefined {
  return developments[slug];
}

// ─── Development Profiles (Non-Waldorf) ─────────────────────────────────────

export const developmentProfiles: Record<string, DevelopmentProfile> = {
  'the-cade': theCade,
  'roche-bobois': rocheBobois,
  'reflection': reflection,
  'corey-landings': coreyLandings,
  'viceroy-clearwater': viceroyClearwater,
  'lake-house': lakeHouse,
  'kolter-3rd-ave': kolter3rdAve,
  'kolter-bayfront': kolterBayfront,
  'the-beachmaker': theBeachmaker,
  'marina-bay-residences': marinaBayResidences,
  // Hillsborough County
  'altura-bayshore': alturaBayshore,
  'one-tampa': oneTampa,
  'ritz-carlton-tower-ii': ritzCarltonTowerII,
  'pendry-tampa': pendryTampa,
  'tampa-edition': tampaEdition,
  'hotel-ora': hotelOra,
  'aqua-westshore': aquaWestshore,
  // DELISTED 2026-06-10: 'marina-pointe-luna' & 'marina-pointe-iii' removed from pipeline (not selling — see import note above).
};

/**
 * Extract city name from a Development's location string.
 * Location format is typically "275 1st Ave S, St. Petersburg 33701" or "Downtown St. Petersburg".
 * Falls back to 'St. Petersburg' when parsing fails.
 */
function extractCityFromLocation(location: string): string {
  // Try to extract city from "Address, City ZIP" format
  const parts = location.split(',');
  if (parts.length >= 2) {
    // Take the last part after comma, strip ZIP code
    const cityPart = parts[parts.length - 1].trim().replace(/\d{5}(-\d{4})?$/, '').trim();
    if (cityPart) return cityPart;
  }
  return 'St. Petersburg';
}

/**
 * Convert a full Development to a DevelopmentProfile for rendering via ProfilePage.
 * This adapter allows non-Waldorf developments typed as `Development` (e.g. Art House)
 * to render through the clean, generic ProfilePage template instead of the
 * Waldorf-specific analytical template with hardcoded Waldorf content.
 */
function developmentToProfile(d: Development): DevelopmentProfile {
  const specs = d.specifications;
  const pp = d.pricePoints;

  // Build price range string from pricePoints
  const prices = pp.map((p) => p.startingPrice).sort((a, b) => a - b);
  const fmtPrice = (n: number) =>
    n >= 1_000_000
      ? `$${(n / 1_000_000).toFixed(1).replace(/\.0$/, '')}M`
      : `$${n.toLocaleString()}`;
  const priceRange =
    prices.length > 1
      ? `${fmtPrice(prices[0])} – ${fmtPrice(prices[prices.length - 1])}`
      : prices.length === 1
        ? `From ${fmtPrice(prices[0])}`
        : 'Contact for Pricing';

  // Build bedroom range
  const beds = Array.from(new Set(pp.map((p) => p.bedroomCount))).sort((a, b) => a - b);
  const bedroomRange =
    beds.length > 1
      ? `${beds[0]}–${beds[beds.length - 1]} BR + Penthouses`
      : beds.length === 1
        ? `${beds[0]} BR`
        : '—';

  // Build bathroom range from floorPlanSpecs
  const fpSpecs = specs.floorPlanSpecs ?? [];
  const baths = Array.from(
    new Set(fpSpecs.map((f) => parseFloat(f.bathrooms))),
  )
    .filter((n) => !isNaN(n))
    .sort((a, b) => a - b);
  const bathRange =
    baths.length > 1
      ? `${baths[0]}–${baths[baths.length - 1]} BA`
      : baths.length === 1
        ? `${baths[0]} BA`
        : '—';

  // Build SF range from floorPlanSpecs
  const totalSFs = fpSpecs.map((f) => f.totalSF).sort((a, b) => a - b);
  const fmtSF = (n: number) => n.toLocaleString();
  const sqftRange =
    totalSFs.length > 1
      ? `${fmtSF(totalSFs[0])} – ${fmtSF(totalSFs[totalSFs.length - 1])} SF`
      : totalSFs.length === 1
        ? `${fmtSF(totalSFs[0])} SF`
        : '—';

  // Flatten features from residenceFeatures
  const features: string[] = [
    ...(d.residenceFeatures?.general ?? []),
    ...(d.residenceFeatures?.kitchen ?? []),
    ...(d.residenceFeatures?.bathroom ?? []),
    ...(d.residenceFeatures?.smartHome ?? []),
  ];

  // Flatten amenities from specifications.amenityHighlights
  const amenities: string[] = (specs.amenityHighlights ?? []).map(
    (a) => a.description ? `${a.name} — ${a.description}` : a.name,
  );

  // Gallery images (flatten structured array to simple string[])
  const galleryImages: string[] = (d.images?.gallery ?? []).map((img) => img.src);

  // Map location scores from array format to object format
  const scores = d.locationScores
    ? {
        walkScore: d.locationScores.find((s) => s.label === 'Walk Score')?.score,
        bikeScore: d.locationScores.find((s) => s.label === 'Bike Score')?.score,
        transitScore: d.locationScores.find((s) => s.label === 'Transit Score')?.score,
      }
    : undefined;

  // Derive rental policy from residencePolicies
  const rentalPolicy = d.residencePolicies?.find(
    (p) => p.category === 'Rental Policy',
  )?.headline;

  // Derive broker commission label
  const brokerComm = d.brokerCommission
    ? `${d.brokerCommission.coOpPercent}% co-op`
    : undefined;

  // Derive interior designer from visionaries
  const interiorDesigner = d.visionaries?.find(
    (v) => v.role === 'Interior Designer',
  )?.companies[0]?.name;

  return {
    slug: d.slug,
    name: d.name,
    tagline: d.tagline,
    description: d.description ?? '',
    location: d.location,
    address: d.address,
    city: extractCityFromLocation(d.location),
    county: d.county as 'pinellas' | 'hillsborough' | 'sarasota',
    status: d.status,
    type: (d.type ?? 'Condominium') as 'Condominium' | 'Branded Residence',

    price: priceRange,
    bedrooms: bedroomRange,
    bathrooms: bathRange,
    sqft: sqftRange,
    totalUnits: d.salesMetrics.totalUnits,
    unitSizes: sqftRange,
    deliveryDate: d.deliveryDate ?? 'TBD',

    stories: specs.heightStories,
    hoaPerSqFt: d.hoaPerSqFt,

    developer: d.developer ?? 'TBD',
    architect: d.architect,
    interiorDesigner,
    salesGallery: d.salesTeam?.salesGallery,
    website: d.website,
    phone: d.phone,
    socialMedia: d.socialMedia,
    socialProof: d.socialProof,

    rentalPolicy,
    brokerCommission: brokerComm,

    features,
    amenities,
    galleryImages,

    scores,

    tailInventory: d.tailInventory,

    documents: d.documents,

    seo: d.seo,
  };
}

export function getDevelopmentProfile(slug: string): DevelopmentProfile | undefined {
  // Check explicit profiles first
  if (developmentProfiles[slug]) return developmentProfiles[slug];

  // Fall back: convert full Development → DevelopmentProfile (e.g. Art House)
  // This lets non-Waldorf developments in the `developments` record render
  // through the clean ProfilePage template instead of the Waldorf-specific one.
  const dev = developments[slug];
  if (dev && slug !== 'waldorf-astoria') return developmentToProfile(dev);

  return undefined;
}

// ─── Unified Slug Helpers ───────────────────────────────────────────────────

export function getAllDevelopmentSlugs(): string[] {
  return [
    ...Object.keys(developments),
    ...Object.keys(developmentProfiles),
    // Include Hillsborough & Sarasota stub slugs so generateStaticParams covers all routes
    ...hillsboroughStubs.map((s) => s.slug),
    ...sarasotaStubs.map((s) => s.slug),
  ];
}

export function isFullDevelopment(slug: string): boolean {
  // Developments with complete analytical data get the full 25-component template.
  // As developments gain pricing ladders, competitors, and market evidence, add them here.
  const fullDevelopments = ['waldorf-astoria', 'art-house', '400-central'];
  return fullDevelopments.includes(slug);
}

// ─── Coordinates Lookup ─────────────────────────────────────────────────────
// Geocoded lat/lng for map markers. Keyed by slug.

const developmentCoordinates: Record<string, { lat: number; lng: number }> = {
  // Pinellas County — Downtown St. Petersburg
  'waldorf-astoria': { lat: 27.7694, lng: -82.6348 },    // 150 2nd Ave S — geocoded
  'art-house': { lat: 27.7704, lng: -82.6367 },          // 275 1st Ave S — geocoded
  '400-central': { lat: 27.7711, lng: -82.6386 },        // 400 Central Ave — geocoded
  'the-cade': { lat: 27.7745, lng: -82.6441 },           // 749 Burlington Ave N / Mirror Lake — geocoded
  'roche-bobois': { lat: 27.7676, lng: -82.6384 },       // 344 4th St S — geocoded
  'reflection': { lat: 27.7754, lng: -82.6445 },         // 777 3rd Ave N — geocoded
  'lake-house': { lat: 27.7737, lng: -82.6438 },         // 200 Mirror Lake Dr N — geocoded (was Indian Shores)
  'four-seasons-stpete': { lat: 27.7771, lng: -82.6313 }, // Beach Drive NE area — approximate
  'kolter-3rd-ave': { lat: 27.7750, lng: -82.6361 },     // 235 3rd Ave N — geocoded
  'kolter-bayfront': { lat: 27.7675, lng: -82.6347 },    // 333 1st St SE (Hilton Bayfront) — geocoded
  // Pinellas County — Beaches
  'corey-landings': { lat: 27.7442, lng: -82.7464 },     // 75 Corey Ave, St Pete Beach — geocoded
  'viceroy-clearwater': { lat: 27.9750, lng: -82.8285 }, // 805 S Gulfview Blvd — geocoded
  'the-beachmaker': { lat: 27.7953, lng: -82.7999 },      // 15000 Madeira Way, Madeira Beach — geocoded
  // Pinellas County — South St. Pete
  'marina-bay-residences': { lat: 27.7089, lng: -82.6906 }, // 4598 54th Ave S — geocoded
  // Hillsborough County — Downtown Tampa / Water Street
  'pendry-tampa': { lat: 27.9448, lng: -82.4584 },       // 111 S Ashley Dr — geocoded
  'one-tampa': { lat: 27.9483, lng: -82.4593 },          // 520 N Tampa St — geocoded
  'tampa-edition': { lat: 27.9438, lng: -82.4509 },      // 1000 Water St — geocoded
  'hotel-ora': { lat: 27.9492, lng: -82.4507 },          // 1101 E Jackson St — geocoded
  // Hillsborough County — Bayshore Blvd
  'ritz-carlton-tower-ii': { lat: 27.9190, lng: -82.4907 }, // 3101 Bayshore Blvd — geocoded
  'altura-bayshore': { lat: 27.9201, lng: -82.4911 },    // 2907 S Ysabella Ave — geocoded
  // Hillsborough County — Westshore
  'aqua-westshore-yacht-club': { lat: 27.8829, lng: -82.5281 },
  'aqua-westshore': { lat: 27.8829, lng: -82.5281 },     // 5505 Bowen Daniel Dr — geocoded
  'marina-pointe-luna': { lat: 27.8933, lng: -82.5297 }, // 4900 Bridge St — geocoded
  'marina-pointe-iii': { lat: 27.8940, lng: -82.5303 },  // 5344 Bridge St, most westerly of the 3 MP towers — geocoded
  // Sarasota County — The Quay
  'one-park-sarasota': { lat: 27.3392, lng: -82.5406 },       // 20 N Lemon Ave — Downtown Sarasota (NOT The Quay as previously mapped)
  'ritz-carlton-sarasota-bay': { lat: 27.3420, lng: -82.5440 }, // 475 Quay Commons — corrected from 555
  '1000-boulevard-of-the-arts': { lat: 27.3415, lng: -82.5452 }, // Near Quay Commons & Boulevard of the Arts — approximate
  // Sarasota County — Downtown
  'the-edge-sarasota': { lat: 27.3365, lng: -82.5385 },
  'waldorf-astoria-sarasota': { lat: 27.3358, lng: -82.5340 },
  'sota-residences': { lat: 27.3352, lng: -82.5348 },
  'six88-residences': { lat: 27.3290, lng: -82.5470 },
  'mira-mar-sarasota': { lat: 27.3372, lng: -82.5368 },
  'adagio-sarasota': { lat: 27.3378, lng: -82.5362 },
  'high-line-sarasota': { lat: 27.3356, lng: -82.5308 },
  'the-palm-625': { lat: 27.3325, lng: -82.5398 },
  'peninsula-sarasota': { lat: 27.3368, lng: -82.5375 },
};

// ─── Derivation: Development → DevelopmentSummary ───────────────────────────
// Single source of truth — no more hand-maintained duplicates.

// Submarket assignments by slug
const SUBMARKET_MAP: Record<string, string> = {
  // Pinellas — Downtown St Pete
  'waldorf-astoria': 'Downtown St Pete',
  'art-house': 'Downtown St Pete',
  '400-central': 'Downtown St Pete',
  'roche-bobois': 'Downtown St Pete',
  'reflection': 'Downtown St Pete',
  // Pinellas — Mirror Lake
  'the-cade': 'Mirror Lake',
  'lake-house': 'Mirror Lake',
  'four-seasons-stpete': 'Downtown St Pete',
  'kolter-3rd-ave': 'Downtown St Pete',
  'kolter-bayfront': 'Downtown St Pete',
  // Pinellas — St. Pete Beach
  'corey-landings': 'St. Pete Beach',
  // Pinellas — Madeira Beach
  'the-beachmaker': 'Madeira Beach',
  // Pinellas — South St. Pete (Maximo / Skyway area)
  'marina-bay-residences': 'South St Pete',
  // Pinellas — Clearwater Beach
  'viceroy-clearwater': 'Clearwater Beach',
  // Hillsborough — Downtown Tampa / Riverwalk
  'pendry-tampa': 'Downtown Tampa',
  'one-tampa': 'Downtown Tampa',
  'tampa-edition': 'Water Street',
  'hotel-ora': 'Channel District',
  // Hillsborough — Bayshore
  'ritz-carlton-tower-ii': 'Bayshore Blvd',
  'altura-bayshore': 'Bayshore Blvd',
  // Hillsborough — Westshore
  'aqua-westshore-yacht-club': 'Westshore',
  'aqua-westshore': 'Westshore',
  'marina-pointe-luna': 'Westshore',
  'marina-pointe-iii': 'Westshore',
  // Sarasota — The Quay
  'one-park-sarasota': 'Downtown Sarasota',
  'ritz-carlton-sarasota-bay': 'The Quay',
  '1000-boulevard-of-the-arts': 'The Quay',
  // Sarasota — Downtown
  'the-edge-sarasota': 'Downtown Sarasota',
  'waldorf-astoria-sarasota': 'Downtown Sarasota',
  'sota-residences': 'Downtown Sarasota',     // Main Street corridor merged into Downtown
  'six88-residences': 'Golden Gate Point',
  'mira-mar-sarasota': 'Downtown Sarasota',
  'adagio-sarasota': 'Downtown Sarasota',
  'high-line-sarasota': 'Downtown Sarasota',  // Main & Osprey merged into Downtown
  'the-palm-625': 'Downtown Sarasota',
  'peninsula-sarasota': 'Golden Gate Point',
};

// ─── Sold Percent Overrides (non-PCPAO sources) ─────────────────────────────
// For buildings without pcpaoSummary.sellThrough, provide manual sell-through %
const SOLD_PERCENT: Record<string, number> = {
  'the-cade': 53.3,
  'roche-bobois': 0,
  'viceroy-clearwater': 0,
  'corey-landings': 0,
  'lake-house': 0,
  'four-seasons-stpete': 0,
  'kolter-3rd-ave': 0,
  'kolter-bayfront': 0,
  // Hillsborough County
  'altura-bayshore': 100,       // MLS confirms 81 sold + resales. Developer sold out. 2 active + 1 pending are resale only.
  'one-tampa': 0,               // Under construction, no closings
  'ritz-carlton-tower-ii': 65,  // 65 of 100 sold
  'pendry-tampa': 0,            // Under construction
  'tampa-edition': 100,         // Developer sold out 2022-2023, resale only
  'hotel-ora': 0,               // 1 sold of 658
  'aqua-westshore': 0,          // Under construction
  'marina-pointe-luna': 0,      // Pre-sales
};

// ─── Inventory Pressure Assignments ──────────────────────────────────────────
const INVENTORY_PRESSURE: Record<string, 'high' | 'medium' | 'low'> = {
  'waldorf-astoria': 'medium',     // 35.6% sold, 105 remaining, pre-construction ($175M+ secured)
  'art-house': 'low',              // 86.9% sold, 32 remaining
  '400-central': 'low',            // 72.4% sold, 83 remaining (was medium)
  'the-cade': 'low',               // 53.3% under contract, boutique 15 units
  'roche-bobois': 'high',          // Pre-sales, 164 units
  'reflection': 'low',             // 92% sold, 7 remaining
  'viceroy-clearwater': 'high',    // Pre-sales, 86 units, desperation signals
  'corey-landings': 'high',        // Coming soon, 133 units
  'lake-house': 'medium',          // Shadow inventory, 45 units
  'four-seasons-stpete': 'low',    // Shadow inventory, highly exploratory — no units confirmed
  'kolter-3rd-ave': 'low',          // Shadow inventory, site demolished, site plan imminent
  'kolter-bayfront': 'low',         // Shadow inventory, $96M acquired, design phase
  // Hillsborough County
  'altura-bayshore': 'low',        // Delivered 2024, low resale inventory
  'one-tampa': 'high',             // Under construction, 225 units, 7 active
  'ritz-carlton-tower-ii': 'medium', // 65% sold, 19 active + 4 pending
  'pendry-tampa': 'high',          // Under construction, 207 units
  'tampa-edition': 'low',          // Developer sold out 2022-2023, resale only
  'hotel-ora': 'high',             // 29 active listings, pre-construction
  'aqua-westshore': 'medium',      // Under construction, 6 active + 3 pending
  'marina-pointe-luna': 'high',    // Pre-sales, 151 units
  'marina-pointe-iii': 'high',     // Pre-sales, 105 units, delivery pushed 2027->2028
  // Pinellas County — new inline stubs
  'the-beachmaker': 'medium',      // Pre-sales, 161 units, 50%+ sold
  'marina-bay-residences': 'high', // Pre-sales, 96 units
  // Sarasota County — new inline stubs
  '1000-boulevard-of-the-arts': 'medium', // Pre-sales, 117 units, $40M in first 45 days
};

// ─── Per-Bedroom Starting Prices (profile buildings) ────────────────────────
// Full Developments derive these from pricePoints[]. Profiles need manual overrides.
const BEDROOM_PRICES: Record<string, { studio?: string; oneBed?: string; twoBed?: string; threeBed?: string; fourBedPlus?: string }> = {
  // Pinellas
  'the-cade':            { threeBed: '$1.9M' },                                  // 3BR from $1,917,800
  'roche-bobois':        { studio: '$545K', oneBed: '$845K', twoBed: '$1.4M', threeBed: '$2.0M' }, // MLS listings — Unit 608 1BR $844,500, Unit 1503 2BR $1,379,500, Unit 2009 3BR $1,972,500
  'reflection':          { oneBed: '$899K', twoBed: '$1.1M', threeBed: '$1.6M' }, // MLS-confirmed ranges
  'viceroy-clearwater':  { twoBed: '$2.0M', threeBed: '$3.5M' },                // MLS active listings
  'corey-landings':      {},                                                      // TBD — pricing not released
  'lake-house':          { oneBed: '$800K', twoBed: '$1.2M' },                   // Estimated from "From $800,000s"
  // Hillsborough
  'altura-bayshore':     { twoBed: '$1.7M', threeBed: '$2.4M' },                // MLS resale range
  'one-tampa':           { oneBed: '$958K', twoBed: '$1.4M', threeBed: '$2.9M' }, // MLS active listings
  'ritz-carlton-tower-ii': { twoBed: '$1.9M', threeBed: '$3.2M' },              // MLS active listings
  'pendry-tampa':        { oneBed: '$1.9M', twoBed: '$2.7M', threeBed: '$3.9M' }, // MLS developer pricing
  'tampa-edition':       { twoBed: '$3.0M', threeBed: '$4.6M' },                // MLS resale
  'hotel-ora':           { studio: '$871K', oneBed: '$1.1M', twoBed: '$1.6M' }, // Phase 2 pricing
  'aqua-westshore':      { twoBed: '$1.9M', threeBed: '$2.5M' },                // MLS active
  'marina-pointe-luna':  { oneBed: '$1.2M', twoBed: '$1.5M', threeBed: '$2.3M' }, // MLS active
};

// ─── Sales Brokerage Overrides (profile buildings) ──────────────────────────
// Full Developments derive salesTeamName from d.salesTeam.firm.
// Profiles often have salesTeam[0].name which may be the team, not the brokerage.
const SALES_BROKERAGE: Record<string, string> = {
  'the-cade':               'Wittner Wollman Group',
  'roche-bobois':           'SERHANT',
  'reflection':             'Keller Williams St Pete Realty',
  'viceroy-clearwater':     'Waypoint Real Estate',
  'corey-landings':         'Kolter Urban',
  'lake-house':             'TBD',
  'kolter-3rd-ave':         'TBD',
  'kolter-bayfront':        'TBD',
  // Hillsborough
  'altura-bayshore':        'Smith & Associates',
  'one-tampa':              'Smith & Associates',
  'ritz-carlton-tower-ii':  'Related Sales',
  'pendry-tampa':           'Smith & Associates',
  'tampa-edition':          'Smith & Associates',
  'hotel-ora':              'ARC Realty Group',
  'aqua-westshore':         'Smith & Associates',
  'marina-pointe-luna':     'BTI Partners',
};

// ─── Absorption Velocity (profile buildings) ────────────────────────────────
// ONLY real, verifiable units/month numbers. If we don't have the data, don't show it.
// Full Developments derive velocity from salesMetrics.velocity.
const VELOCITY: Record<string, string> = {
  // Pinellas — verified from MLS data
  'ritz-carlton-tower-ii': '~5/mo',           // 65 of 100 sold, sales launched ~2024 = ~13 months
  'hotel-ora':             '~23/mo',          // Phase 1: 31 units in ~40 days (developer reported)
};

function developmentToSummary(d: Development): DevelopmentSummary {
  const specs = d.specifications;
  const sales = d.salesMetrics;
  const pp = d.pricePoints;

  // Build price range string from pricePoints
  const prices = pp.map((p) => p.startingPrice).sort((a, b) => a - b);
  const fmtPrice = (n: number) =>
    n >= 1_000_000
      ? `$${(n / 1_000_000).toFixed(1).replace(/\.0$/, '')}M`
      : `$${n.toLocaleString()}`;
  const priceRange =
    prices.length > 1
      ? `${fmtPrice(prices[0])} - ${fmtPrice(prices[prices.length - 1])}`
      : prices.length === 1
        ? `From ${fmtPrice(prices[0])}`
        : undefined;

  // Build bedroom range from pricePoints
  const beds = Array.from(new Set(pp.map((p) => p.bedroomCount))).sort((a, b) => a - b);
  const bedroomRange =
    beds.length > 1
      ? `${beds[0]}-${beds[beds.length - 1]} BR + Penthouses`
      : beds.length === 1
        ? `${beds[0]} BR`
        : undefined;

  // Build bathroom range from floorPlanSpecs
  const fpSpecs = specs.floorPlanSpecs ?? [];
  const baths = Array.from(
    new Set(fpSpecs.map((f) => parseFloat(f.bathrooms))),
  )
    .filter((n) => !isNaN(n))
    .sort((a, b) => a - b);
  const bathRange =
    baths.length > 1
      ? `${baths[0]}-${baths[baths.length - 1]} BA`
      : baths.length === 1
        ? `${baths[0]} BA`
        : undefined;

  // Build SF range from floorPlanSpecs
  const totalSFs = fpSpecs.map((f) => f.totalSF).sort((a, b) => a - b);
  const fmtSF = (n: number) => n.toLocaleString();
  const sqftRange =
    totalSFs.length > 1
      ? `${fmtSF(totalSFs[0])} - ${fmtSF(totalSFs[totalSFs.length - 1])} SF`
      : totalSFs.length === 1
        ? `${fmtSF(totalSFs[0])} SF`
        : undefined;

  // Derive per-bedroom starting prices from pricePoints
  const bedroomPrice = (count: number): string | undefined => {
    const pp_match = pp.find((p) => p.bedroomCount === count);
    return pp_match ? fmtPrice(pp_match.startingPrice) : undefined;
  };

  // Derive rental policy from residencePolicies array
  const rentalPolicy = d.residencePolicies?.find(
    (p) => p.category === 'Rental Policy',
  )?.headline;

  // Derive broker commission
  const brokerComm = d.brokerCommission
    ? `${d.brokerCommission.coOpPercent}% co-op`
    : undefined;

  return {
    slug: d.slug,
    name: d.fullName?.replace(/\s+St\.?\s*Petersburg.*$/i, '') || d.name,
    location: d.location,
    county: d.county ?? 'pinellas',
    status: d.status,
    statusLabel: d.statusLabel ?? d.status,
    units: sales.totalUnits,
    soldPercent: sales.soldPercentage,
    avgPsf: specs.pricePerSqFt.average,
    developerClosePsf: d.tailInventory?.developerAskingPsf || specs.pricePerSqFt.average,
    resalePsf: d.tailInventory?.resaleAskingPsf || undefined,
    delivery: d.deliveryDate,
    hasPage: true,
    price: priceRange,
    bedrooms: bedroomRange,
    bathrooms: bathRange,
    sqft: sqftRange,
    type: d.type,
    tags: d.badges as string[],
    developer: d.developer,
    architect: d.architect,
    address: d.address,
    image: d.images?.card?.src,
    description: d.description,
    stories: specs.heightStories,
    coordinates: developmentCoordinates[d.slug],
    hoaPerSqFt: d.hoaPerSqFt,
    rentalPolicy,
    brokerCommission: brokerComm,
    studioPrice: bedroomPrice(0),
    oneBedPrice: bedroomPrice(1),
    twoBedPrice: bedroomPrice(2),
    threeBedPrice: bedroomPrice(3),
    fourBedPlusPrice: bedroomPrice(4),
    submarket: SUBMARKET_MAP[d.slug],
    inventoryPressure: INVENTORY_PRESSURE[d.slug],
    salesTeamName: d.salesTeam?.firm,
    salesGallery: d.salesTeam?.salesGallery,
    velocity: d.salesMetrics.velocity,
  };
}

// ─── Tags for DevelopmentProfile buildings ──────────────────────────────────
const profileTags: Record<string, string[]> = {
  // Pinellas
  'the-cade':            ['Tier 2 Luxury', 'Boutique', 'Waterfront'],
  'roche-bobois':        ['Tier 2 Luxury', 'Lifestyle Brand', 'Short-Term Rental'],
  'reflection':          ['Tier 3 Luxury', 'Waterfront'],
  'corey-landings':      ['Tier 2 Luxury', 'Beachfront', 'Waterfront', 'New to Market'],
  'viceroy-clearwater':  ['Tier 1 Luxury', 'Hospitality Brand', 'Beachfront'],
  'lake-house':          ['Tier 3 Luxury', 'Boutique', 'Waterfront'],
  'four-seasons-stpete': ['Tier 1 Luxury', 'Hospitality Brand', 'Waterfront'],
  'kolter-3rd-ave':      ['Tier 2 Luxury', 'New to Market'],
  'kolter-bayfront':     ['Tier 2 Luxury', 'Waterfront', 'New to Market'],
  // Hillsborough
  'altura-bayshore':        ['Tier 2 Luxury', 'Waterfront'],
  'one-tampa':              ['Tier 2 Luxury', 'Waterfront'],
  'ritz-carlton-tower-ii':  ['Tier 1 Luxury', 'Hospitality Brand', 'Waterfront'],
  'pendry-tampa':           ['Tier 1 Luxury', 'Hospitality Brand'],
  'tampa-edition':          ['Tier 1 Luxury', 'Hospitality Brand'],
  'hotel-ora':              ['Tier 2 Luxury', 'Lifestyle Brand', 'Mixed-Use', 'Short-Term Rental'],
  'aqua-westshore':         ['Tier 2 Luxury', 'Waterfront'],
  'marina-pointe-luna':     ['Tier 2 Luxury', 'Waterfront'],
};

function profileToSummary(slug: string, p: DevelopmentProfile): DevelopmentSummary {
  return {
    slug,
    name: p.name,
    location: p.location,
    county: p.county,
    status: p.status,
    statusLabel: p.statusLabel || statusLabelFromStatus(p.status),
    units: p.totalUnits,
    delivery: p.deliveryDate,
    hasPage: true,
    price: p.price,
    bedrooms: p.bedrooms,
    bathrooms: p.bathrooms,
    sqft: p.sqft,
    image: p.galleryImages?.[0],
    type: p.type,
    developer: p.developer,
    architect: p.architect,
    address: p.address,
    description: p.description,
    stories: p.stories,
    hoaPerSqFt: p.hoaPerSqFt,
    rentalPolicy: p.rentalPolicy,
    brokerCommission: p.brokerCommission,
    lastUpdated: p.lastUpdated,
    coordinates: developmentCoordinates[slug],
    tags: profileTags[slug] ?? [],
    submarket: SUBMARKET_MAP[slug],
    inventoryPressure: INVENTORY_PRESSURE[slug],
    avgPsf: p.pricingHistory?.currentPsf || undefined,
    developerClosePsf: p.pricingHistory?.launchPsf || undefined,
    resalePsf: p.tailInventory?.resaleAskingPsf || p.pricingHistory?.currentPsf || undefined,
    soldPercent: p.pcpaoSummary?.sellThrough || SOLD_PERCENT[slug] || undefined,
    salesTeamName: SALES_BROKERAGE[slug] || p.salesTeam?.[0]?.name,
    salesGallery: p.salesGallery,
    velocity: VELOCITY[slug],
    // Per-bedroom pricing from BEDROOM_PRICES lookup
    studioPrice: BEDROOM_PRICES[slug]?.studio,
    oneBedPrice: BEDROOM_PRICES[slug]?.oneBed,
    twoBedPrice: BEDROOM_PRICES[slug]?.twoBed,
    threeBedPrice: BEDROOM_PRICES[slug]?.threeBed,
    fourBedPlusPrice: BEDROOM_PRICES[slug]?.fourBedPlus,
  };
}

function statusLabelFromStatus(status: DevelopmentStatus): string {
  const labels: Record<DevelopmentStatus, string> = {
    'shadow-inventory': 'Shadow Inventory',
    'reservation': 'Reservation',
    'pre-sales': 'Pre-Sales',
    'under-construction': 'Under Construction',
    'delivered': 'Delivered',
    'sold-out': 'Sold Out',
  };
  return labels[status] ?? status;
}

// ─── Hillsborough County Stubs ──────────────────────────────────────────────
// All 8 Hillsborough developments now have DevelopmentProfile data files.
// Stubs replaced by profiles in developmentProfiles record above.
// Legacy stub array kept empty for compatibility with getAllDevelopmentSlugs.

// Hillsborough stubs: previously held Marina Pointe III as inline; now promoted to full profile.
// Empty array preserved for getAllDevelopmentSlugs compatibility and future stub additions.
const hillsboroughStubs: DevelopmentSummary[] = [];

// ─── Sarasota County Stubs ──────────────────────────────────────────────────
// These developments have NO data files — inline stubs with hasPage: false.
// They will get full data files as the report expands.

const sarasotaStubs: DevelopmentSummary[] = [
  // ── The Quay District ───────────────────────────────────────────────────────
  {
    slug: '1000-boulevard-of-the-arts',
    name: '1000 Boulevard of the Arts',
    location: 'The Quay',
    county: 'sarasota',
    status: 'pre-sales',
    statusLabel: statusLabelFromStatus('pre-sales'),
    units: 117,
    delivery: 'H2 2028',
    hasPage: false,
    type: 'Condominium',
    tags: ['Tier 1 Luxury', 'Waterfront', 'Mixed-Use', 'New to Market'],
    developer: 'Kolter Urban',
    address: 'Near Quay Commons & Boulevard of the Arts, Sarasota, FL',
    price: 'From $1.5M',
    bedrooms: '1-3',
    sqft: '1,200-3,000+ SF',
    description: '117 residences in a 20-story tower at the former Hyatt Regency site, part of a mixed-use development including a Hyatt Centric Harborside hotel and ground-level restaurant. Units 1,200–3,000+ SF, 1-3 bedroom layouts, pricing from $1.5M. Passed $40M in sales within first 45 days of pre-construction offering. Reservation-to-contract conversion began February 1, 2026; site cleared February 2026. Construction start targeted Q3 2026; delivery H2 2028. By Kolter Urban. Sales by Premier Sotheby\'s International Realty at 50 Central Ave, Suite 100, Sarasota. "Selective pricing" available on six units through end of April 2026.',
    stories: 20,
  },
  {
    slug: 'one-park-sarasota',
    name: 'One Park Sarasota',
    location: 'Downtown Sarasota',
    county: 'sarasota',
    status: 'under-construction',
    statusLabel: statusLabelFromStatus('under-construction'),
    units: 86,
    delivery: 'Q1-Q2 2027',
    hasPage: false,
    type: 'Condominium',
    tags: ['Tier 2 Luxury'],
    developer: 'PMG',
    address: '20 N Lemon Ave, Sarasota, FL 34236',
    description: '86-unit, 18-story luxury tower in Downtown Sarasota by PMG (Property Markets Group — same developer as Waldorf Astoria St. Petersburg). Sales by Coldwell Banker Global Luxury. Under construction with Q1-Q2 2027 delivery. Contact: (941) 225-4775.',
    stories: 18,
  },
  {
    slug: 'ritz-carlton-sarasota-bay',
    name: 'Ritz-Carlton Residences Sarasota Bay',
    location: 'The Quay',
    county: 'sarasota',
    status: 'under-construction',
    statusLabel: statusLabelFromStatus('under-construction'),
    units: 78,
    delivery: 'Q4 2026',
    hasPage: false,
    type: 'Condominium',
    tags: ['Tier 1 Luxury', 'Hospitality Brand', 'Waterfront'],
    developer: 'Kolter Urban',
    address: '475 Quay Commons, Sarasota, FL 34236',
    sqft: '3,500-6,000 SF',
    description: '78 waterfront residences (3,500–6,000 SF) across 20 stories in The Quay district. Structure reached full height April 2026. By Kolter Urban, sales by Premier Sotheby\'s International Realty. Amenities include 20,000 SF Harbor Club, Ritz-Carlton Spa, wellness facilities, on-site dining, and concierge. Q4 2026 delivery. Contact: info@theresidencessarasotabay.com, (941) 499-8704.',
    stories: 20,
  },

  // ── Downtown Sarasota ───────────────────────────────────────────────────────
  {
    slug: 'the-edge-sarasota',
    name: 'The Edge Sarasota',
    location: 'Downtown Sarasota',
    county: 'sarasota',
    status: 'under-construction',
    statusLabel: statusLabelFromStatus('under-construction'),
    units: 27,
    delivery: 'Fall 2026',
    hasPage: false,
    type: 'Condominium',
    tags: ['Tier 1 Luxury', 'Boutique'],
    developer: 'JEBCO Ventures / ORE Development',
    architect: 'BDG Architects',
    address: '290 Cocoanut Ave, Sarasota, FL 34236',
    price: '$3.27M - $3.57M',
    bedrooms: '2-3',
    sqft: '3,145-3,553 SF',
    avgPsf: 1040,
    description: '27 residences across 10 stories at the corner of Cocoanut and Fruitville by JEBCO Ventures and ORE Development. Units range 3,145–3,553 SF with two- and three-bedroom layouts, pricing from $3.27M to $3.57M ($948–$1,131 PSF). Topped out December 2025 with buyers signing the commemorative final concrete pour. $46M construction loan closed December 2024. BDG Architects (architecture), DSDG Architects (interiors), Voeller Construction (GC), McWilliams Ballard (sales/marketing). Rooftop lounge, concierge services, smart home systems. On schedule for fall 2026 move-in.',
    stories: 10,
  },
  {
    slug: 'waldorf-astoria-sarasota',
    name: 'Waldorf Astoria Residences Sarasota',
    location: 'Downtown Sarasota',
    county: 'sarasota',
    status: 'pre-sales',
    statusLabel: statusLabelFromStatus('pre-sales'),
    units: 86,
    delivery: '~2029',
    hasPage: false,
    type: 'Condominium',
    tags: ['Tier 1 Luxury', 'Hospitality Brand'],
    developer: 'WMG',
    address: '1390 Main St, Sarasota, FL',
    description: '86-unit, 18-story Waldorf Astoria branded tower by WMG (not PMG — Sarasota Waldorf has different ownership than St. Petersburg Waldorf). Construction start late 2026, estimated delivery ~2029.',
    stories: 18,
  },
  {
    slug: 'sota-residences',
    name: 'SOTA Residences',
    location: 'Downtown Sarasota',
    county: 'sarasota',
    status: 'under-construction',
    statusLabel: statusLabelFromStatus('under-construction'),
    units: 35,
    delivery: '2026',
    hasPage: false,
    type: 'Condominium',
    tags: ['Tier 2 Luxury', 'Lifestyle Brand', 'Mixed-Use'],
    developer: 'TBD',
    address: '1703 Main St, Sarasota, FL 34236',
    price: 'From $1.8M',
    description: '35 private residences + boutique hotel component in a 16-story mixed-use tower at 1703 Main Street. Residences from $1.8M. Positions as "curated urban living" with resort-style amenities integrated with downtown walkability. Sales contact: Brian Wacnik (The Sarasota Real Estate Guy), (941) 206-8794. 2026 opening. NOTE: Developer company not publicly disclosed — update when confirmed.',
    stories: 16,
  },
  {
    slug: 'six88-residences',
    name: 'SIX88 Residences',
    location: 'Golden Gate Point',
    county: 'sarasota',
    status: 'under-construction',
    statusLabel: statusLabelFromStatus('under-construction'),
    units: 10,
    delivery: 'June 2026',
    hasPage: false,
    type: 'Condominium',
    tags: ['Tier 1 Luxury', 'Waterfront', 'Boutique'],
    developer: 'Vandyk Properties',
    architect: 'DSDG Architects',
    address: '688 Golden Gate Point, Sarasota, FL 34236',
    price: '$2.48M - $11.88M',
    sqft: '1,990-6,267 SF',
    avgPsf: 1896,
    description: '10 full-floor residences across 9 stories on Golden Gate Point by Vandyk Properties (sequel to their ONE88 project). Unit sizes 1,990–6,267 SF; pricing from $2.48M for lower floors to $11.88M for the 6,267 SF penthouse (~$1,896/SF). DSDG Architects (Mark Sultana) designed the dramatic sail-like triangular structure to maximize 360-degree bay views from a unique land plot. Originally projected for 2023, delivery was delayed significantly — now scheduled June 2026. Amenities: club room, pool, rooftop terrace, fitness center, dog grooming, marina lounge with boat slips and paddleboard launch, jetted swim spa. 2 secure parking spaces per unit.',
    stories: 9,
  },
  {
    slug: 'mira-mar-sarasota',
    name: 'Mira Mar Residences',
    location: 'Downtown Sarasota',
    county: 'sarasota',
    status: 'pre-sales',
    statusLabel: statusLabelFromStatus('pre-sales'),
    units: 70,
    delivery: '2028',
    hasPage: false,
    type: 'Condominium',
    tags: ['Tier 1 Luxury', 'New to Market'],
    developer: 'Seaward Development',
    architect: 'Nichols Architects',
    address: '65 S Palm Ave, Sarasota, FL',
    price: '$3.8M - $7M+',
    description: '70-unit luxury tower across twin 18-story buildings (35 units per tower) behind the historic 1922 Mira Mar Plaza. Pricing from $3.8M with penthouses to $7M+. City Commission unanimously approved the comprehensive plan amendment May 2025. Sales gallery opened October 2025. Architecture by Nichols Architects, interiors by Clear pH Design, GC: Suffolk Construction. Sales exclusively by Coldwell Banker Realty (Nicholle DiPinto McKiernan, Georgia Kopelousos). The project includes a ~$30M restoration of the historic Mediterranean Revival Mira Mar Plaza, funded by condo sales revenue. End of 2028 delivery.',
    stories: 18,
  },
  {
    slug: 'adagio-sarasota',
    name: 'Adagio Sarasota',
    location: 'Downtown Sarasota',
    county: 'sarasota',
    status: 'reservation',
    statusLabel: statusLabelFromStatus('reservation'),
    units: 172,
    delivery: 'TBD',
    hasPage: false,
    type: 'Condominium',
    tags: ['Tier 2 Luxury', 'Mixed-Use', 'New to Market'],
    developer: 'Lutgert Companies / R&P Holdings / Barron Collier',
    architect: 'Kobi Karp Architecture',
    address: '1360 Ringling Blvd, Sarasota, FL 34236',
    bedrooms: '2-5',
    sqft: '2,000-4,500 SF',
    description: '172 units (103 market-rate luxury condos in an 18-story west tower + 69 attainable rental units in a 9-10 story east tower) by a three-way partnership: Lutgert Companies, R&P Holdings, and Barron Collier. Kobi Karp Architecture (Miami). Units range 2,000–4,500 SF with 2-5 bedroom layouts. Developed under Florida\'s Live Local Act, requiring the affordable housing component to access height/density allowances. $26M land assemblage across 5 parcels. 18,000–32,000 SF of street-level retail. STALLED at Development Review Committee — required fourth DRC submittal, no construction start date. Pricing not yet released. Presentation gallery was planned to open winter 2025/26.',
    stories: 18,
  },
  {
    slug: 'high-line-sarasota',
    name: 'The High Line Sarasota',
    location: 'Downtown Sarasota',
    county: 'sarasota',
    status: 'reservation',
    statusLabel: statusLabelFromStatus('reservation'),
    units: 142,
    delivery: 'Late 2026',
    hasPage: false,
    type: 'Condominium',
    tags: ['Tier 3 Luxury', 'Mixed-Use', 'New to Market'],
    developer: 'JEBCO Ventures / Omnium Real Estate',
    architect: 'Hoyt Architects',
    address: '40 N Osprey Ave, Sarasota, FL 34236',
    price: 'High $700K - under $2M',
    bedrooms: '1-3',
    sqft: '~1,250 SF avg',
    description: '142 units (126 market-rate + 16 attainable under Live Local Act) in an 11-story mixed-use tower at Main & Osprey — the former Michael Saunders & Co. office site. Same team as The Edge Sarasota (JEBCO Ventures + Omnium Real Estate). Unit sizes average 1,250 SF with 1–3 bedroom layouts. Pricing from the high $700,000s to under $2M — the most affordably priced of the 11 Sarasota luxury projects, deliberately targeting a broader market than the ultra-luxury segment. Rooftop amenity deck with pool, fitness center, gathering areas. 6,600+ SF ground-floor retail. Estimated late 2026 delivery. By Hoyt Architects.',
    stories: 11,
  },
  {
    slug: 'the-palm-625',
    name: 'The Palm 625',
    location: 'Downtown Sarasota',
    county: 'sarasota',
    status: 'under-construction',
    statusLabel: statusLabelFromStatus('under-construction'),
    units: 12,
    delivery: 'Mid-2026',
    hasPage: false,
    type: 'Condominium',
    tags: ['Tier 1 Luxury', 'Boutique'],
    developer: 'LV7 Investment Group',
    architect: 'Hoyt Architects',
    address: '625 S Palm Ave, Sarasota, FL 34236',
    price: 'From ~$2.5M',
    bedrooms: '2-3',
    sqft: '2,439-4,451 SF',
    avgPsf: 1025,
    description: '12 boutique residences across 5 stories at 625 S Palm Avenue by LV7 Investment Group (V.J. Chukkapalli). Three units per floor, 2-3 bedroom layouts, 2,439–4,451 SF. Pricing from ~$2.5M (~$1,025/SF entry). Broke ground November 2024; 18-month construction timeline targets mid-2026 delivery. Italian cabinetry, Wolf and Sub-Zero appliances, private terraces. Amenities: heated saltwater pool, rooftop fire pits, whole-building generator for storm resilience. Hoyt Architects (Sarasota). Sister project: The Point at 621 Golden Gate Point (same developer, similar boutique concept). Coldwell Banker sales representation.',
    stories: 5,
  },
  {
    slug: 'peninsula-sarasota',
    name: 'Peninsula Sarasota',
    location: 'Golden Gate Point',
    county: 'sarasota',
    status: 'delivered',
    statusLabel: statusLabelFromStatus('delivered'),
    units: 22,
    delivery: '2025',
    hasPage: false,
    type: 'Condominium',
    tags: ['Tier 1 Luxury', 'Waterfront', 'Boutique'],
    developer: 'Gault Family Companies',
    architect: 'Hoyt Architects',
    address: '253 Golden Gate Point, Sarasota, FL 34236',
    price: 'From $3.75M',
    bedrooms: '3',
    sqft: '2,400-3,000+ SF',
    avgPsf: 1531,
    soldPercent: 86,
    description: '22 residences across twin flanking towers at 253 Golden Gate Point, surrounded by Sarasota Bay, by Gault Family Companies (6th-generation, 160-year homebuilding legacy based in Westport, CT). Nearing completion — only 3-4 residences remain (B residence on 8th floor at 2,670 SF remaining as of April 2026). Unit sizes 2,400–3,000+ SF, 3-bedroom configurations. Starting prices escalated from $2M to $2.6M to $3.7M to current $3.75M+ ($1,500–$1,563/SF). No shared walls between any units. Tower A has one residence per floor with 360-degree views; larger tower has two residences per floor with service-hallway separation. Weathered Hurricane Milton (October 2024) with minimal impact. Hoyt Architects, Gilbane Building Company (GC). Shared raised pool deck connecting the two towers. Sales by Coldwell Banker Realty (Georgia Salaverri, Steven Windsor).',
    stories: 9,
  },
];

// ─── Pinellas County Stubs (beach submarkets without full data files yet) ───
// Pinellas stubs: previously held The Beachmaker + Marina Bay Residences as
// inline; now promoted to full profile files. Empty array preserved for
// getAllDevelopmentSlugs compatibility and future net-new additions.
const pinellasStubs: DevelopmentSummary[] = [];

// ─── Computed trackedDevelopments — single source of truth ───────────────────
// Pinellas entries are DERIVED from data files, plus net-new inline stubs.
// Hillsborough & Sarasota are inline stubs. No more hand-maintained duplicates.

// Helper: inject coordinates and submarket from lookup maps into inline stubs
function injectCoordinates(stubs: DevelopmentSummary[]): DevelopmentSummary[] {
  return stubs.map((s) => ({
    ...s,
    coordinates: developmentCoordinates[s.slug] ?? s.coordinates,
    submarket: SUBMARKET_MAP[s.slug] ?? s.submarket,
  }));
}

export const trackedDevelopments: DevelopmentSummary[] = [
  // Pinellas — derived from source data files
  ...Object.entries(developments).map(([, d]) => developmentToSummary(d)),
  ...Object.entries(developmentProfiles).map(([slug, p]) => profileToSummary(slug, p)),
  // Pinellas — inline stubs (no data files yet)
  ...injectCoordinates(pinellasStubs),
  // Hillsborough — inline stubs (no data files yet)
  ...injectCoordinates(hillsboroughStubs),
  // Sarasota — inline stubs (no data files yet)
  ...injectCoordinates(sarasotaStubs),
];
