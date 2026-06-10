const fs = require("fs");
const text = fs.readFileSync("/Users/briansprague/.claude/projects/-Users-briansprague-Desktop-marketreport/e63dec43-c1a9-4c04-841d-bed84326948f/tool-results/mcp-Docling_MCP-export_docling_document_to_markdown-1771459697135.txt", "utf8");

// Known MLS listings from parsing above
const listings = [
  { mls: 'TB8451353', unit: '3503', price: 3900000, beds: 3, baths: '3/1', status: 'Active' },
  { mls: 'TB8429709', unit: '3103', price: 3725000, beds: 3, baths: '3/1', status: 'Canceled' },
  { mls: 'TB8429707', unit: '2301', price: 4350000, beds: 3, baths: '3/1', status: 'Active' },
  { mls: 'TB8476346', unit: '2702', price: 2800000, beds: 2, baths: '2/1', status: 'Active' },
  { mls: 'TB8429740', unit: '4505', price: 3650000, beds: 2, baths: '2/1', status: 'Active' },
  { mls: 'TB8429748', unit: '2302', price: 2600000, beds: 2, baths: '2/1', status: 'Canceled' },
  { mls: 'TB8451349', unit: '3004', price: 3700000, beds: 3, baths: '3/1', status: 'Active' },
  { mls: 'TB8429752', unit: '2106', price: 3750000, beds: 3, baths: '3/1', status: 'Active' },
  { mls: 'TB8429757', unit: '3404', price: 3975000, beds: 3, baths: '3/1', status: 'Canceled' },
];

// For each listing, extract SF data from the wider context
listings.forEach(listing => {
  const mlsIdx = text.indexOf(listing.mls);
  if (mlsIdx === -1) return;

  // Get a big block after the MLS number for this listing
  const block = text.substring(mlsIdx, Math.min(text.length, mlsIdx + 8000));

  // Find heated SF
  const heatedPatterns = [
    /Heated\s*Sq\s*Ft:?\s*([\d,]+)/i,
    /Living\s*Area:?\s*([\d,]+)/i,
    /Heated\s*Area:?\s*([\d,]+)/i,
    /Interior\s*(?:Sq\.?\s*Ft|Area):?\s*([\d,]+)/i,
  ];

  let heatedSF = null;
  for (const p of heatedPatterns) {
    const m = block.match(p);
    if (m) {
      heatedSF = parseInt(m[1].replace(/,/g, ''));
      break;
    }
  }

  // Find total SF
  const totalPatterns = [
    /Total\s*Sq\s*Ft:?\s*([\d,]+)/i,
    /Total\s*Area:?\s*([\d,]+)/i,
    /Total\s*Living:?\s*([\d,]+)/i,
  ];

  let totalSF = null;
  for (const p of totalPatterns) {
    const m = block.match(p);
    if (m) {
      totalSF = parseInt(m[1].replace(/,/g, ''));
      break;
    }
  }

  // Find PSF from listing
  const psfPatterns = [
    /Price\/Sq\s*Ft:?\s*\$?([\d,.]+)/i,
    /\$\/(Sq\.?\s*Ft|SF):?\s*\$?([\d,.]+)/i,
    /PSF:?\s*\$?([\d,.]+)/i,
  ];

  let psf = null;
  for (const p of psfPatterns) {
    const m = block.match(p);
    if (m) {
      psf = m[1] || m[2];
      break;
    }
  }

  // DOM
  const adomMatch = block.match(/ADOM:?\s*(\d+)/i);
  const adom = adomMatch ? parseInt(adomMatch[1]) : null;

  const cdomMatch = block.match(/CDOM:?\s*(\d+)/i);
  const cdom = cdomMatch ? parseInt(cdomMatch[1]) : null;

  // List date
  const listDateMatch = block.match(/List\s*Date:?\s*([\d\/]+)/i);
  const listDate = listDateMatch ? listDateMatch[1] : null;

  // Original List Price
  const origPriceMatch = block.match(/Orig\s*(?:List)?\s*Price:?\s*\$([\d,]+)/i);
  const origPrice = origPriceMatch ? origPriceMatch[1] : null;

  // Approx Year Built
  const yearMatch = block.match(/Year\s*Built:?\s*(\d{4})/i);
  const yearBuilt = yearMatch ? yearMatch[1] : null;

  // Look for specific SF numbers near "2,583" "2,031" etc patterns
  const sfNumbers = block.match(/([\d,]{3,5})\s*(?:Sq\.?\s*Ft|SF)/gi);

  console.log(`\n=== ${listing.mls} — UNIT ${listing.unit} ===`);
  console.log(`  Price: $${listing.price.toLocaleString()}`);
  console.log(`  Status: ${listing.status}`);
  console.log(`  Beds: ${listing.beds} | Baths: ${listing.baths}`);
  console.log(`  Heated SF: ${heatedSF || '??'}`);
  console.log(`  Total SF: ${totalSF || '??'}`);
  console.log(`  PSF: ${psf || '??'}`);
  console.log(`  ADOM: ${adom || '??'} | CDOM: ${cdom || '??'}`);
  console.log(`  List Date: ${listDate || '??'}`);
  console.log(`  Orig Price: ${origPrice || '??'}`);
  console.log(`  Year Built: ${yearBuilt || '??'}`);
  console.log(`  SF mentions: ${sfNumbers ? sfNumbers.join(', ') : 'none'}`);
});

// Also check for # before unit name - typically "150 2ND AVE S, #UNIT"
// This confirms unit numbers. Let's also check for 2302 vs 2702 specifics
console.log("\n\n=== UNIT ADDRESS VERIFICATION ===");
const addrPattern = /150\s*2ND\s*AVE\s*S[,.]?\s*#(\d{4})/gi;
let addrMatch;
const unitAddrs = {};
while ((addrMatch = addrPattern.exec(text)) !== null) {
  const unit = addrMatch[1];
  unitAddrs[unit] = (unitAddrs[unit] || 0) + 1;
}
console.log("Units found by address:", unitAddrs);
