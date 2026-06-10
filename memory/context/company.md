# Company Context

## About
Tampa Bay New Development Market Report — independently produced market intelligence for new construction condominiums in Tampa Bay / St. Petersburg. Not sponsored or endorsed by any developer.

## Author
- **Brian Sprague** — Market Analyst & Licensed Realtor
- **Firm:** Tampa Bay Real Estate
- **Email:** brian@historicstpete.com
- **Speciality:** New development sales across Tampa Bay metro
- **Credentials:** Licensed FL Real Estate Professional, New Development Sales Specialist, 10+ years Tampa Bay experience

## Tools & Systems
| Tool | Used For | Config Notes |
|------|----------|--------------|
| Next.js 14 | Web framework | App Router, TypeScript strict |
| Tailwind CSS | Styling | Custom theme in tailwind.config |
| Recharts | Data visualization | Market charts |
| Framer Motion | Animation | Page transitions, scroll reveals |
| Lucide React | Icons | Throughout UI |
| Supabase | Backend/DB | Lazy-init — won't crash without env vars |
| Resend | Transactional email | Lead capture API route |
| Stellar MLS | Listing data | Primary data source for pricing |
| Vercel (assumed) | Hosting | Next.js deployment |

## Data Sources (for market report content)
| Source | What It Provides | Update Frequency |
|--------|------------------|------------------|
| Stellar MLS | Listings, sales, pricing | Weekly |
| Developer Disclosures | Price sheets, sales reports | As released |
| County Property Appraiser | Closing prices, deeds | As recorded |
| Proprietary Broker Research | First-hand insights | Ongoing |
| Sales Gallery Visits | Absorption data, buyer profiles | As visited |
| Personal Industry Network | Early pricing, off-market intel | Ongoing |
| Developer Websites | Pricing updates, availability | Monitored |
| Pinellas County Government | Permits, zoning, site plans | As filed |
| DBPR | Condo filings, prospectus | As filed |
| Trusted News | Announcements, trend validation | As published |

## Markets Tracked
| Submarket | County |
|-----------|--------|
| Downtown St. Petersburg | Pinellas |
| St. Pete Beach | Pinellas |
| Clearwater Beach | Pinellas |
| Downtown Tampa | Hillsborough |
| Water Street Tampa | Hillsborough |
| South Tampa | Hillsborough |
| Westshore | Hillsborough |

## Brand Voice
- **Tone:** Direct, authoritative, data-first
- **Anti-pattern:** No marketing fluff, no lifestyle filler, no unsourced claims
- **Key phrases:**
  - "No spin. No luxury lifestyle filler. Just sourced data."
  - "The Market Report Your Buyers Deserve"
  - "Every price point sourced. Every claim cited."
  - "Built by a broker who got tired of sending clients marketing flyers instead of real data."
- **Audience:** Primary = realtors with buyers; Secondary = direct buyers
- **AudienceContext:** `isPro` flag toggles realtor vs consumer content

## Build & Deploy
- Project builds successfully — all pages compile to `.next/server/app/`
- Environment variables: `NEXT_PUBLIC_SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `RESEND_API_KEY`, `NEXT_PUBLIC_SITE_URL`
- Supabase lazy-init means missing env vars won't crash the build
