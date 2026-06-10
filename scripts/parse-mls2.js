const fs = require("fs");
const text = fs.readFileSync("/Users/briansprague/.claude/projects/-Users-briansprague-Desktop-marketreport/e63dec43-c1a9-4c04-841d-bed84326948f/tool-results/mcp-Docling_MCP-export_docling_document_to_markdown-1771459697135.txt", "utf8");

// The 9 MLS numbers
const mlsNumbers = ['TB8451353', 'TB8429709', 'TB8429707', 'TB8476346', 'TB8429740', 'TB8429748', 'TB8451349', 'TB8429752', 'TB8429757'];

// For each MLS number, extract the surrounding context (2000 chars before and after)
mlsNumbers.forEach(mls => {
  const idx = text.indexOf(mls);
  if (idx === -1) {
    console.log(`\n=== ${mls}: NOT FOUND ===`);
    return;
  }

  const start = Math.max(0, idx - 1500);
  const end = Math.min(text.length, idx + 2000);
  const context = text.substring(start, end);

  // Find unit
  const unitMatch = context.match(/UNIT\s+(\d{4})/);
  const unit = unitMatch ? unitMatch[1] : "??";

  // Find price (first $ amount >= 1M near the MLS)
  const priceMatch = context.match(/\$([\d,]{7,})/);
  const price = priceMatch ? priceMatch[1] : "??";

  // Find bedrooms
  const bedMatch = context.match(/(?:Bedrooms?\s*(?:Total)?|Beds?)\s*:?\s*(\d)/i);
  const beds = bedMatch ? bedMatch[1] : "??";

  // Find bathrooms
  const bathMatch = context.match(/(?:Bathrooms?\s*(?:Total)?|Baths?|Full Baths?)\s*:?\s*([\d.]+)/i);
  const baths = bathMatch ? bathMatch[1] : "??";

  // Find half baths
  const halfBathMatch = context.match(/Half Baths?\s*:?\s*(\d)/i);
  const halfBaths = halfBathMatch ? halfBathMatch[1] : "0";

  // Find heated sqft
  const heatedMatch = context.match(/(?:Heated|Living\s*Area|Interior)\s*(?:Sq\.?\s*Ft|SF|Area)?\s*:?\s*([\d,]{3,})/i);
  const heatedSF = heatedMatch ? heatedMatch[1] : "??";

  // Find total sqft
  const totalMatch = context.match(/Total\s*(?:Sq\.?\s*Ft|SF|Area)\s*:?\s*([\d,]{3,})/i);
  const totalSF = totalMatch ? totalMatch[1] : "??";

  // Find status
  const statusMatch = context.match(/Status:?\s*(Active|Pending|Closed|Withdrawn|Expired)/i);
  const status = statusMatch ? statusMatch[1] : "??";

  // Find DOM
  const domMatch = context.match(/(?:DOM|Days\s*(?:on\s*Market)?)\s*:?\s*(\d+)/i);
  const dom = domMatch ? domMatch[1] : "??";

  // Find CDOM
  const cdomMatch = context.match(/CDOM\s*:?\s*(\d+)/i);
  const cdom = cdomMatch ? cdomMatch[1] : "??";

  // Find listing date
  const dateMatch = context.match(/(?:List\s*Date|Listing\s*Date|Date\s*Listed)\s*:?\s*([\d\/\-]+)/i);
  const listDate = dateMatch ? dateMatch[1] : "??";

  // Find PSF
  const psfMatch = context.match(/(?:Price.*?Sq\s*Ft|PSF|Price\/SF)\s*:?\s*\$?([\d,.]+)/i);
  const psf = psfMatch ? psfMatch[1] : "??";

  console.log(`\n=== MLS ${mls} ===`);
  console.log(`  Unit: ${unit}`);
  console.log(`  Price: $${price}`);
  console.log(`  Beds: ${beds}`);
  console.log(`  Baths: ${baths} full + ${halfBaths} half`);
  console.log(`  Heated SF: ${heatedSF}`);
  console.log(`  Total SF: ${totalSF}`);
  console.log(`  Status: ${status}`);
  console.log(`  DOM: ${dom}`);
  console.log(`  CDOM: ${cdom}`);
  console.log(`  List Date: ${listDate}`);
  console.log(`  PSF: $${psf}`);
});

// Now let's extract ALL the specific listing summary data by looking at each listing's
// opening block. MLS listings in Stellar format typically have a header block.
console.log("\n\n=== DEEPER EXTRACTION ===");

// Let's find each MLS number and grab a wider context to get more data
mlsNumbers.forEach(mls => {
  const indices = [];
  let searchStart = 0;
  while (true) {
    const idx = text.indexOf(mls, searchStart);
    if (idx === -1) break;
    indices.push(idx);
    searchStart = idx + 1;
  }

  console.log(`\n${mls} appears at ${indices.length} positions: ${indices.join(', ')}`);

  // The first occurrence typically has the header data
  if (indices.length > 0) {
    const firstIdx = indices[0];
    // Get text BEFORE the MLS number (listing header is usually before)
    const beforeStart = Math.max(0, firstIdx - 500);
    const before = text.substring(beforeStart, firstIdx);

    // Get text AFTER
    const after = text.substring(firstIdx, Math.min(text.length, firstIdx + 500));

    console.log("--- BEFORE MLS# ---");
    console.log(before.replace(/\n/g, " ").trim().substring(before.length - 300));
    console.log("--- AFTER MLS# ---");
    console.log(after.replace(/\n/g, " ").trim().substring(0, 300));
  }
});
