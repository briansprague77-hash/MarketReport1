#!/usr/bin/env node

/**
 * scaffold-development.js — Generate a new development data file + register it
 *
 * Usage:
 *   node scripts/scaffold-development.js <slug> <name> [--tier profile|full]
 *
 * Examples:
 *   node scripts/scaffold-development.js marina-pointe-luna "Marina Pointe Luna"
 *   node scripts/scaffold-development.js pendry-tampa "Pendry Residences Tampa" --tier full
 *
 * Defaults to --tier profile (DevelopmentProfile).
 * Creates:
 *   1. src/data/developments/<slug>.ts  (data file with template)
 *   2. public/images/developments/<slug>/  (empty image directory)
 *   3. Auto-registers import + record entry in src/data/developments/index.ts
 */

const fs = require('fs');
const path = require('path');

// ─── Parse CLI args ─────────────────────────────────────────────────────────

const args = process.argv.slice(2);

if (args.length < 2) {
  console.error(
    'Usage: node scripts/scaffold-development.js <slug> <name> [--tier profile|full]\n' +
      'Example: node scripts/scaffold-development.js marina-pointe-luna "Marina Pointe Luna"'
  );
  process.exit(1);
}

const slug = args[0];
const name = args[1];
const tierIdx = args.indexOf('--tier');
const tier = tierIdx !== -1 && args[tierIdx + 1] ? args[tierIdx + 1] : 'profile';

if (!['profile', 'full'].includes(tier)) {
  console.error('Error: --tier must be "profile" or "full"');
  process.exit(1);
}

// Derive camelCase variable name from slug
const camelName = slug
  .split('-')
  .map((part, i) => (i === 0 ? part : part.charAt(0).toUpperCase() + part.slice(1)))
  .join('');

const ROOT = path.resolve(__dirname, '..');
const DATA_DIR = path.join(ROOT, 'src/data/developments');
const INDEX_FILE = path.join(DATA_DIR, 'index.ts');
const DATA_FILE = path.join(DATA_DIR, `${slug}.ts`);
const IMAGE_DIR = path.join(ROOT, `public/images/developments/${slug}`);

// ─── Guard: don't overwrite existing files ──────────────────────────────────

if (fs.existsSync(DATA_FILE)) {
  console.error(`Error: ${DATA_FILE} already exists. Aborting.`);
  process.exit(1);
}

// ─── Templates ──────────────────────────────────────────────────────────────

function profileTemplate() {
  return `import { DevelopmentProfile } from '@/types/development-profile';

export const ${camelName}: DevelopmentProfile = {
  slug: '${slug}',
  name: '${name}',
  tagline: 'TODO — tagline',
  description: 'TODO — one-paragraph description',
  location: 'TODO — neighborhood or submarket',
  address: 'TODO — street address',
  city: 'TODO — city name',
  county: 'pinellas',
  status: 'pre-sales',
  type: 'Condominium',

  // Pricing & units
  price: 'From $TODO',
  bedrooms: 'TODO',
  bathrooms: 'TODO',
  sqft: 'TODO SF',
  totalUnits: 0,
  unitSizes: 'TODO SF',
  deliveryDate: 'TBD',

  // Team
  developer: 'TODO — developer name',
  architect: 'TODO — architect name',

  // Content
  features: [
    'TODO — feature 1',
    'TODO — feature 2',
  ],
  amenities: [
    'TODO — amenity 1',
    'TODO — amenity 2',
  ],
  galleryImages: [],

  // SEO
  seo: {
    title: '${name} | Tampa Bay Market Report',
    description: 'TODO — SEO description for ${name}',
    keywords: ['${name.toLowerCase()}', 'tampa bay', 'luxury condos'],
  },
};
`;
}

function fullTemplate() {
  return `import { Development } from '@/types/development';

export const ${camelName}: Development = {
  // ─── Identity ───────────────────────────────────────────────────────
  slug: '${slug}',
  name: '${name}',
  fullName: '${name}',
  description: 'TODO — one-paragraph description',
  location: 'TODO — neighborhood or submarket',
  address: 'TODO — street address',
  city: 'TODO — city name',
  county: 'pinellas',
  status: 'pre-construction',
  statusLabel: 'Pre-Construction',
  type: 'Condominium',
  developer: 'TODO — developer name',
  architect: 'TODO — architect name',
  deliveryDate: 'TBD',

  // ─── Badges ─────────────────────────────────────────────────────────
  badges: ['New'],

  // ─── Executive Summary ──────────────────────────────────────────────
  executiveSummary: {
    marketPosition: 'TODO — one-liner market position',
    investmentThesis: [
      'TODO — thesis point 1',
      'TODO — thesis point 2',
      'TODO — thesis point 3',
    ],
    criticalDates: [
      { event: 'Sales Launch', date: 'TBD' },
      { event: 'Groundbreaking', date: 'TBD' },
      { event: 'Estimated Delivery', date: 'TBD' },
    ],
  },

  // ─── Specifications ─────────────────────────────────────────────────
  specifications: {
    stories: 0,
    totalResidences: 0,
    residenceRange: 'TODO SF',
    priceRange: 'From $TODO',
    pricePerSqFt: {
      low: 0,
      average: 0,
      high: 0,
    },
    parking: 'TODO',
    ceilingHeights: 'TODO',
    finishes: 'TODO',
    views: 'TODO',
    completion: 'TBD',
    floorPlanSpecs: [],
    amenityHighlights: [],
  },

  // ─── Sales Metrics ──────────────────────────────────────────────────
  salesMetrics: {
    totalUnits: 0,
    soldUnits: 0,
    availableUnits: 0,
    soldPercentage: 0,
    velocity: '0/mo',
    averageMonthly: 0,
    contractValue: '$0M',
    launchDate: 'TBD',
    peakMonth: { month: 'TBD', units: 0 },
    selloutEstimate: 'TBD',
    monthlySales: [],
  },

  // ─── Price Points ───────────────────────────────────────────────────
  pricePoints: [],

  // ─── Timeline ───────────────────────────────────────────────────────
  timeline: [
    {
      date: 'TBD',
      title: 'Sales Launch',
      description: 'TODO',
      status: 'upcoming' as const,
    },
  ],

  // ─── Branded Value ──────────────────────────────────────────────────
  brandedValue: {
    title: 'TODO — Branded Residence Value',
    propositions: [],
  },

  // ─── Ownership Services ─────────────────────────────────────────────
  ownershipServices: {
    standard: [],
    alaCarte: [],
    hiltonBenefits: [],
  },

  // ─── Market Evidence ────────────────────────────────────────────────
  marketEvidence: [],

  // ─── Competitors ────────────────────────────────────────────────────
  competitors: [],

  // ─── Location ───────────────────────────────────────────────────────
  locationCategories: [],
  locationScores: {
    walkScore: 0,
    transitScore: 0,
    bikeScore: 0,
  },

  // ─── Residence Policies ─────────────────────────────────────────────
  residencePolicies: {
    rentalRestrictions: 'TODO',
    petPolicy: 'TODO',
    reservationDeposit: 'TODO',
    contractDeposit: 'TODO',
    closingCosts: 'TODO',
    hoaEstimate: 'TODO',
    taxBenefits: 'TODO',
  },
};
`;
}

// ─── 1. Write the data file ─────────────────────────────────────────────────

const template = tier === 'full' ? fullTemplate() : profileTemplate();
fs.writeFileSync(DATA_FILE, template, 'utf-8');
console.log(`Created ${path.relative(ROOT, DATA_FILE)}`);

// ─── 2. Create the image directory ──────────────────────────────────────────

fs.mkdirSync(IMAGE_DIR, { recursive: true });
console.log(`Created ${path.relative(ROOT, IMAGE_DIR)}/`);

// ─── 3. Register in index.ts ────────────────────────────────────────────────

let indexContent = fs.readFileSync(INDEX_FILE, 'utf-8');

if (tier === 'full') {
  // Add import after existing full development imports
  const fullImportMarker = "// Mid-tier development profiles";
  const importLine = `import { ${camelName} } from './${slug}';\n`;

  if (indexContent.includes(`'./${slug}'`)) {
    console.log('Import already exists in index.ts — skipping import.');
  } else {
    indexContent = indexContent.replace(
      fullImportMarker,
      importLine + '\n' + fullImportMarker
    );
  }

  // Add to developments record
  const devRecordEnd = /};\s*\nexport function getDevelopment/;
  const match = indexContent.match(devRecordEnd);
  if (match) {
    const insertBefore = match.index;
    const recordEntry = `  '${slug}': ${camelName},\n`;
    // Check if already registered
    if (indexContent.includes(`'${slug}': ${camelName}`)) {
      console.log('Already registered in developments record — skipping.');
    } else {
      indexContent =
        indexContent.slice(0, insertBefore) +
        recordEntry +
        indexContent.slice(insertBefore);
    }
  }
} else {
  // Profile tier — add import after existing profile imports
  const profileImportEnd = "// ─── DevelopmentSummary";
  const importLine = `import { ${camelName} } from './${slug}';\n`;

  if (indexContent.includes(`'./${slug}'`)) {
    console.log('Import already exists in index.ts — skipping import.');
  } else {
    indexContent = indexContent.replace(
      profileImportEnd,
      importLine + '\n' + profileImportEnd
    );
  }

  // Add to developmentProfiles record
  const profileRecordEnd = /};\s*\nexport function getDevelopmentProfile/;
  const match = indexContent.match(profileRecordEnd);
  if (match) {
    const insertBefore = match.index;
    const recordEntry = `  '${slug}': ${camelName},\n`;
    if (indexContent.includes(`'${slug}': ${camelName}`)) {
      console.log('Already registered in developmentProfiles record — skipping.');
    } else {
      indexContent =
        indexContent.slice(0, insertBefore) +
        recordEntry +
        indexContent.slice(insertBefore);
    }
  }
}

fs.writeFileSync(INDEX_FILE, indexContent, 'utf-8');
console.log(`Registered '${slug}' in index.ts (${tier} tier)`);

// ─── Done ───────────────────────────────────────────────────────────────────

console.log(`\nScaffold complete! Next steps:`);
console.log(`  1. Fill in TODO fields in src/data/developments/${slug}.ts`);
console.log(`  2. Add images to public/images/developments/${slug}/`);
console.log(`  3. Run: npx next build`);
