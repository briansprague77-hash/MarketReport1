# Glossary

Workspace shorthand, acronyms, and internal language for Tampa Bay New Development Market Report.

## Market Acronyms
| Term | Meaning | Context |
|------|---------|---------|
| PSF | Price per square foot | Core pricing metric |
| AES | Absorption Efficiency Score | Higher = faster sell-through; <0.50 slow, 0.50–0.80 moderate, 0.80–1.00 strong, >1.00 exceptional |
| DVR | Delivery velocity range | Months to sell out inventory |
| DOM | Days on market | Avg time listings stay active |
| LP/SqFt | List price per square foot | MLS pricing metric |
| YoY | Year over year | Trend comparisons |
| P0/P1/P2 | Priority levels | P0 = drop everything |

## Data Source Abbreviations
| Term | Full Name | What It Provides |
|------|-----------|------------------|
| MLS | Stellar MLS | Active listings, pending sales, closed transactions |
| DBPR | FL Dept. of Business & Professional Regulation | Condo filings, prospectus docs, HOA registrations |
| CPA | County Property Appraiser | Closing prices, deed transfers, assessments |
| SF / CRM | Salesforce | (Not currently used — noted for future) |

## Development Statuses
| Status Key | Label | Color |
|------------|-------|-------|
| pre-sales | Pre-Sales | Gold #C9A84C |
| reservation | Reservation | Gold #C9A84C |
| contract | Contract | Green #4CAF50 |
| pre-construction | Pre-Construction | Green #4CAF50 |
| under-construction | Under Construction | Blue #2196F3 |
| delivering | Delivering | Orange #FF9800 |
| delivered | Delivered | Gray #9E9E9E |

## Badge Types
| Badge | Icon | Color | Meaning |
|-------|------|-------|---------|
| Ultra Luxury | 💎 | Gold #C9A84C | Above $1,500/SF, best-in-class |
| Tier 1 Premium | ⭐ | Gold #C9A84C | Premium positioning & amenities |
| Waterfront | 🌊 | Blue #2196F3 | Direct waterfront location |
| Branded Residence | 🏨 | Purple #7B1FA2 | Hotel-caliber services |
| Short-Term Rental | 🔑 | Orange #FF9800 | Hotel revenue sharing program |
| New to Market | 🆕 | Green #4CAF50 | Recently announced, limited data |

## Development Names
| Name | County | Location | Status | Units | Has Page |
|------|--------|----------|--------|-------|----------|
| Waldorf Astoria | Pinellas | Downtown St. Petersburg | Delivering | 163 | ✓ |
| Art House | Pinellas | Downtown St. Petersburg | Under Construction | — | ✓ |
| 400 Central | Pinellas | Downtown St. Petersburg | Delivering | — | ✓ |
| The Cade | Pinellas | Downtown St. Petersburg | Pre-Sales | — | ✓ |
| Roche Bobois | Pinellas | Downtown St. Petersburg | Pre-Construction | — | ✓ |
| Reflection | Pinellas | St. Pete Beach | Under Construction | — | ✓ |
| Corey Landings | Pinellas | St. Pete Beach | Pre-Sales | — | ✓ |
| Viceroy Clearwater | Pinellas | Clearwater Beach | Pre-Sales | — | ✓ |
| Lake House | Pinellas | Downtown St. Petersburg | Pre-Sales | 45 | ✗ |

### Hillsborough Developments (stubs — no detail pages yet)
8 developments tracked in Hillsborough County across Downtown Tampa, Water Street Tampa, South Tampa, and Westshore submarkets. All have `hasPage: false` in the data model.

## Competitor References (delivered — used in comparisons only)
| Name | Location | Units | Avg PSF | Status |
|------|----------|-------|---------|--------|
| ONE St. Petersburg | DTSP | 253 | $1,150 | Resale (delivered 2021) |
| Saltaire St. Pete | DTSP | 154 | $1,050 | Resale (delivered) |

## Key Market Stats (as of 2026-02-20)
| Metric | Value | Source |
|--------|-------|--------|
| Pipeline units | 1,243 | Pinellas confirmed |
| Pipeline value | $2.1B+ | Pinellas confirmed |
| Developments tracked | 17 | 9 Pinellas + 8 Hillsborough |
| Waldorf avg LP/SqFt | $1,449 | Stellar MLS Feb 2026 |
| Waldorf avg list price | $3.69M | Stellar MLS Feb 2026 |
| Contracts/month | ~16 | Pinellas pipeline |
| Unit mix (core) | ~60% 2BR | Pipeline-wide |

## Theme Colors
| Name | Hex | Usage |
|------|-----|-------|
| Charcoal | #1a1a2e | Primary background |
| Gold | #d4a853 | Accent, CTAs, badges |
| Ivory | #faf8f5 | Light backgrounds |

## Tech Stack Terms
| Term | Meaning |
|------|---------|
| App Router | Next.js 14 routing system (src/app/) |
| Route group | `(marketing)` folder — shared layout, no URL segment |
| Path alias | `@/*` maps to `./src/*` in tsconfig |
| Lazy-init | Supabase client only connects when env vars present |
| isPro | AudienceContext flag — realtor vs consumer content |
