const fs = require("fs");
const text = fs.readFileSync("/Users/briansprague/.claude/projects/-Users-briansprague-Desktop-marketreport/e63dec43-c1a9-4c04-841d-bed84326948f/tool-results/mcp-Docling_MCP-export_docling_document_to_markdown-1771459697135.txt", "utf8");

// Complete MLS data with SF from previous extraction:
// Format: [mls, unit, price, beds, bathsFull/half, status, livingSF, totalSF]
const listings = [
  { mls: 'TB8451353', unit: '3503', price: 3900000, beds: 3, baths: '3/1', status: 'Active',   livingSF: 2583, totalSF: 2815 },
  { mls: 'TB8429709', unit: '3103', price: 3725000, beds: 3, baths: '3/1', status: 'Canceled', livingSF: 2583, totalSF: 2815 },
  { mls: 'TB8429707', unit: '2301', price: 4350000, beds: 3, baths: '3/1', status: 'Active',   livingSF: 3408, totalSF: 3980 },
  { mls: 'TB8476346', unit: '2702', price: 2800000, beds: 2, baths: '2/1', status: 'Active',   livingSF: 2031, totalSF: 2211 },
  { mls: 'TB8429740', unit: '4505', price: 3650000, beds: 2, baths: '2/1', status: 'Active',   livingSF: 1943, totalSF: 2123 },
  { mls: 'TB8429748', unit: '2302', price: 2600000, beds: 2, baths: '2/1', status: 'Canceled', livingSF: 2031, totalSF: 2211 },
  { mls: 'TB8451349', unit: '3004', price: 3700000, beds: 3, baths: '3/1', status: 'Active',   livingSF: 2651, totalSF: 2815 },
  { mls: 'TB8429752', unit: '2106', price: 3750000, beds: 3, baths: '3/1', status: 'Active',   livingSF: 2989, totalSF: 3350 },
  { mls: 'TB8429757', unit: '3404', price: 3975000, beds: 3, baths: '3/1', status: 'Canceled', livingSF: 2651, totalSF: 2815 },
];

// Now find DOM, CDOM, listing date, PSF more aggressively by looking at the raw text around each listing
listings.forEach(listing => {
  const mlsIdx = text.indexOf(listing.mls);
  const block = text.substring(mlsIdx, Math.min(text.length, mlsIdx + 10000));

  // ADOM
  const adomMatch = block.match(/ADOM\s*:?\s*(\d+)/);
  listing.adom = adomMatch ? parseInt(adomMatch[1]) : null;

  // CDOM
  const cdomMatch = block.match(/CDOM\s*:?\s*(\d+)/);
  listing.cdom = cdomMatch ? parseInt(cdomMatch[1]) : null;

  // List Date
  const listDateMatch = block.match(/List\s*Date\s*:?\s*([\d\/]+)/);
  listing.listDate = listDateMatch ? listDateMatch[1] : null;

  // Price/SqFt
  const psfMatch = block.match(/Price\/SqFt\s*:?\s*\$?([\d,.]+)/);
  listing.mlsPsf = psfMatch ? parseFloat(psfMatch[1].replace(/,/g, '')) : null;

  // Original Price
  const origMatch = block.match(/Orig(?:inal)?\s*(?:List\s*)?Price\s*:?\s*\$([\d,]+)/);
  listing.origPrice = origMatch ? parseInt(origMatch[1].replace(/,/g, '')) : null;

  // Compute PSF
  listing.psfLiving = Math.round((listing.price / listing.livingSF) * 100) / 100;
  listing.psfTotal = Math.round((listing.price / listing.totalSF) * 100) / 100;

  // Determine residence type from unit number
  const unitLast = listing.unit.slice(-2);
  const floorNum = parseInt(listing.unit.slice(0, -2));

  if (unitLast === '01') listing.residenceType = 'Residence 01';
  else if (unitLast === '02') listing.residenceType = 'Residence 02';
  else if (unitLast === '03') listing.residenceType = 'Residence 03';
  else if (unitLast === '04') listing.residenceType = 'Residence 04';
  else if (unitLast === '05') listing.residenceType = 'Residence 05';
  else if (unitLast === '06') listing.residenceType = 'Residence 06';
  else listing.residenceType = 'Unknown';

  listing.floor = floorNum;

  console.log(`UNIT ${listing.unit} (${listing.residenceType}, FL ${listing.floor})`);
  console.log(`  MLS: ${listing.mls} | Status: ${listing.status}`);
  console.log(`  Price: $${listing.price.toLocaleString()} | PSF Living: $${listing.psfLiving} | PSF Total: $${listing.psfTotal}`);
  console.log(`  ${listing.beds}BR/${listing.baths} BA | ${listing.livingSF} SF living | ${listing.totalSF} SF total`);
  console.log(`  ADOM: ${listing.adom || '??'} | CDOM: ${listing.cdom || '??'} | List Date: ${listing.listDate || '??'} | MLS PSF: ${listing.mlsPsf || '??'}`);
  console.log(`  Orig Price: ${listing.origPrice ? '$' + listing.origPrice.toLocaleString() : '??'}`);
  console.log('');
});

// Check: is there a 4202 in the MLS? We saw it in address verification but not in listings
console.log("\n=== LOOKING FOR 4202 ===");
const idx4202 = text.indexOf('#4202');
if (idx4202 >= 0) {
  console.log("Found #4202 at index", idx4202);
  console.log("Context:", text.substring(Math.max(0, idx4202 - 200), idx4202 + 400).replace(/\n/g, " ").trim());
}

// Also check what 2302 MLS listing says (it's not on legacy pricing sheet as 2302, but we have 2302 on legacy as Res 02 floor 23)
console.log("\n=== CROSS-REFERENCE: MLS vs LEGACY ===");
console.log("MLS 2302 at $2,600,000 = Legacy 2302 at $2,600,000? Yes - Residence 02, Floor 23");
console.log("MLS 2301 at $4,350,000 = Legacy 2301 at $4,350,000? Yes - Residence 01, Floor 23");
console.log("MLS 3103 at $3,725,000 vs Legacy 3103 at $3,700,000? Different! +$25,000");
console.log("MLS 4505 at $3,650,000 = Legacy 4505 at $3,650,000? Yes - Residence 05, Floor 45");
console.log("MLS 2106 at $3,750,000 = Legacy 2106 at $3,750,000? Yes - Residence 06, Floor 21");
console.log("MLS 3404 at $3,975,000 vs Legacy 3404 at $3,900,000? Different! +$75,000");
console.log("");
console.log("NEW units NOT on Legacy Pricing Sheet:");
console.log("  3503 (Res 03, FL 35) at $3,900,000 - PSF $1,509.49/living");
console.log("  2702 (Res 02, FL 27) at $2,800,000 - PSF $1,378.63/living");
console.log("  3004 (Res 04, FL 30) at $3,700,000 - PSF $1,395.70/living");
