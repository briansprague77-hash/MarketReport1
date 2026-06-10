const fs = require("fs");
const text = fs.readFileSync("/Users/briansprague/.claude/projects/-Users-briansprague-Desktop-marketreport/e63dec43-c1a9-4c04-841d-bed84326948f/tool-results/mcp-Docling_MCP-export_docling_document_to_markdown-1771459697135.txt", "utf8");

// Find all dollar amounts >= $1M
const pricePattern = /\$([\d,]{7,})/g;
let match;
const prices = [];
while ((match = pricePattern.exec(text)) !== null) {
  prices.push({ price: match[1], index: match.index });
}
console.log("=== All dollar amounts >= $1M ===");
prices.forEach(p => {
  const start = Math.max(0, p.index - 300);
  const end = Math.min(text.length, p.index + 100);
  const ctx = text.substring(start, end).replace(/\n/g, " ").trim();
  // Find UNIT reference near this price
  const unitMatch = ctx.match(/UNIT\s+(\d{4})/);
  const unit = unitMatch ? unitMatch[1] : "??";
  console.log(`  UNIT ${unit}: $${p.price}`);
});

// Find MLS numbers (Stellar MLS format)
console.log("\n=== MLS Numbers ===");
const mlsPattern = /[A-Z]{1,2}\d{7,}/g;
let mlsMatch;
const mlsNums = new Set();
while ((mlsMatch = mlsPattern.exec(text)) !== null) {
  mlsNums.add(mlsMatch[0]);
}
console.log([...mlsNums]);

// Find listing header blocks - they typically have: price, beds, baths, sqft together
console.log("\n=== Listing Headers ===");
// Look for patterns like "3 Beds | 3.5 Baths | 2,583 Sq Ft" or similar
const headerPattern = /(\d)\s*(?:Beds?|BR).*?(\d[\d.]*)\s*(?:Baths?|BA).*?([\d,]+)\s*(?:Sq\.?\s*Ft|sqft|SF)/gi;
let hm;
while ((hm = headerPattern.exec(text)) !== null) {
  console.log(`  ${hm[1]} bed / ${hm[2]} bath / ${hm[3]} sqft`);
}

// Look for "Heated Sq Ft" or "Living Area" values
console.log("\n=== Heated/Living SF ===");
const heatedPattern = /(?:Heated|Living)[\s\w]*?:?\s*([\d,]{3,})/gi;
let heatMatch;
while ((heatMatch = heatedPattern.exec(text)) !== null) {
  const ctx = text.substring(Math.max(0, heatMatch.index - 200), heatMatch.index + 50);
  const unitMatch = ctx.match(/UNIT\s+(\d{4})/);
  const unit = unitMatch ? unitMatch[1] : "??";
  console.log(`  UNIT ${unit}: ${heatMatch[1]} SF`);
}

// Now extract per-listing summary - find the listing header with price/beds/baths/sqft
console.log("\n=== Per-Listing Summary Extraction ===");

// Try to find the structured listing header that appears before each detailed listing
// These usually look like:
// $3,900,000 | 3 Beds | 3.5 Baths | 2,583 Sq.Ft.
// or they may be in table format
const listingHeaders = text.match(/\$[\d,]+\s*\|?\s*\d\s*Bed.*?(?:Sq\.?\s*Ft|SF)/gi);
if (listingHeaders) {
  listingHeaders.forEach(h => console.log("  " + h));
} else {
  console.log("  No standard listing headers found, trying alternative patterns...");

  // Try: "List Price" near a dollar amount
  const lpPattern = /List\s*Price[:\s]*\$?([\d,]+)/gi;
  let lp;
  while ((lp = lpPattern.exec(text)) !== null) {
    console.log("  List Price: $" + lp[1]);
  }
}

// Look for Bedrooms/Bathrooms fields
console.log("\n=== Bedroom/Bathroom Counts ===");
const bedrooms = /Bedrooms\s*(?:Total)?:?\s*(\d+)/gi;
let br;
while ((br = bedrooms.exec(text)) !== null) {
  const ctx = text.substring(Math.max(0, br.index - 300), br.index + 20);
  const unitMatch = ctx.match(/UNIT\s+(\d{4})/);
  const unit = unitMatch ? unitMatch[1] : "??";
  console.log(`  UNIT ${unit}: ${br[1]} bedrooms`);
}

const bathrooms = /Bathrooms\s*(?:Total)?:?\s*([\d.]+)/gi;
let ba;
while ((ba = bathrooms.exec(text)) !== null) {
  const ctx = text.substring(Math.max(0, ba.index - 300), ba.index + 20);
  const unitMatch = ctx.match(/UNIT\s+(\d{4})/);
  const unit = unitMatch ? unitMatch[1] : "??";
  console.log(`  UNIT ${unit}: ${ba[1]} bathrooms`);
}

// Extract PSF values
console.log("\n=== PSF Values ===");
const psfPattern = /\$([\d,]+\.?\d*)\s*\/\s*(?:Sq\.?\s*Ft|SF)/gi;
let psfMatch;
while ((psfMatch = psfPattern.exec(text)) !== null) {
  const ctx = text.substring(Math.max(0, psfMatch.index - 300), psfMatch.index + 20);
  const unitMatch = ctx.match(/UNIT\s+(\d{4})/);
  const unit = unitMatch ? unitMatch[1] : "??";
  console.log(`  UNIT ${unit}: $${psfMatch[1]}/SF`);
}

// Try broader PSF pattern
const psfPattern2 = /Price.*?Sq\s*Ft:?\s*\$?([\d,.]+)/gi;
let psf2;
while ((psf2 = psfPattern2.exec(text)) !== null) {
  const ctx = text.substring(Math.max(0, psf2.index - 300), psf2.index + 20);
  const unitMatch = ctx.match(/UNIT\s+(\d{4})/);
  const unit = unitMatch ? unitMatch[1] : "??";
  console.log(`  UNIT ${unit}: $${psf2[1]}/SF (pattern2)`);
}
