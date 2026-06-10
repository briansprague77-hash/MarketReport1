# Memory

## Me
Brian Sprague, Market Analyst & Licensed Realtor at Tampa Bay Real Estate. I build data-driven new construction market intelligence for Tampa Bay — no spin, sourced data only.

## Tech Stack
| Tool | Purpose |
|------|---------|
| **Next.js 14** | App Router framework |
| **TypeScript** | Language (strict mode) |
| **Tailwind CSS** | Styling — charcoal `#1a1a2e`, gold `#d4a853`, ivory `#faf8f5` |
| **Recharts** | Charts |
| **Framer Motion** | Animation |
| **Lucide React** | Icons |
| **Supabase** | Backend (lazy-init in `src/lib/supabase.ts`) |
| **Resend** | Email (API at `src/app/api/leads/route.ts`) |
| **Fonts** | Inter (body) + Playfair Display (headings) |
→ Path alias: `@/*` → `./src/*`

## Project Structure
| Path | What |
|------|------|
| `src/app/(marketing)/` | Route group — all public pages with shared nav/footer |
| `src/app/(marketing)/page.tsx` | Homepage |
| `src/app/(marketing)/market-report/` | Market report page |
| `src/app/(marketing)/developments/[slug]/` | Development detail pages |
| `src/components/sections/market/` | 8 market section components |
| `src/components/sections/development/` | 25 development section components |
| `src/data/developments/` | **Directory** — 10 files (individual dev data + index.ts) |
| `src/data/market.ts` | **Single file** — all market data (pipeline, trends, velocity) |
| `src/context/AudienceContext.tsx` | `isPro` flag for realtor vs consumer |

## Terms
| Term | Meaning |
|------|---------|
| **PSF** | Price per square foot |
| **AES** | Absorption Efficiency Score (sell-through speed) |
| **DVR** | Delivery velocity range (months to sell out) |
| **DOM** | Days on market |
| **MLS** | Stellar MLS — primary listing data source |
| **DBPR** | FL Dept. of Business & Professional Regulation |
| **P/SF range** | List price per square foot range |
| **Pipeline** | All new construction: pre-sales through delivered |
→ Full glossary: memory/glossary.md

## Developments (28 tracked)
| Name | County | Status | Has Page |
|------|--------|--------|----------|
| **Waldorf Astoria** | Pinellas | Delivering | ✓ |
| **Art House** | Pinellas | Delivered | ✓ |
| **400 Central** | Pinellas | Delivering | ✓ |
| **The Cade** | Pinellas | Pre-Sales | ✓ |
| **Roche Bobois** | Pinellas | Pre-Construction | ✓ |
| **Reflection** | Pinellas | Under Construction | ✓ |
| **Corey Landings** | Pinellas | Pre-Sales | ✓ |
| **Viceroy Clearwater** | Pinellas | Pre-Sales | ✓ |
| **Lake House** | Pinellas | Pre-Sales | ✗ |
| 8 Hillsborough devs | Hillsborough | Various | ✗ |
| 11 Sarasota devs | Sarasota | Various | ✗ |
→ Details: memory/glossary.md, src/data/developments/

## Data Model
| Type | Example | Notes |
|------|---------|-------|
| **Full Development** | Waldorf Astoria | Complete `Development` type, all fields |
| **DevelopmentProfile** | Art House, 400 Central, etc. | Lighter type with detail pages |
| **Inline stubs** | 19 Hillsborough + Sarasota devs | `hasPage: false`, no detail pages yet |

## Brand Voice
- Direct, no-nonsense, data-driven
- Anti-marketing-fluff: "No spin. No luxury lifestyle filler. Just sourced data."
- Every claim cited, every price sourced
- Tagline: "Built by a broker who got tired of sending clients marketing flyers instead of real data."

## Preferences
- Do NOT audit entire codebase — too large, exhausts context
- Supabase lazy-init means missing env vars won't crash build
- Build verified successful — all pages compile
