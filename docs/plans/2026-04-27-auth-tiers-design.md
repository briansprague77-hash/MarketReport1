# Auth + Tier Gating Design

**Date:** 2026-04-27
**Status:** Approved — ready for implementation plan

## Context

The site currently has a self-declared three-tier system (`consumer`, `realtor`, `sales-agent`) stored in `localStorage`. Anyone can flip the tier dropdown to see "gated" content — there is no real verification. 13 components across the app read the tier via `useAudience()`.

Goal: replace the self-declared system with **real authentication + verified tiers**, while preserving public access to brand-trust-critical analytical content (homepage, market report, dev pages, /about). Gating applies only to realtor utilities (group chat, full realtor-resources, sales-agent portal, document downloads).

## Decisions made

| Question | Choice |
|---|---|
| **Gating model** | A — Public content + verified pro tier |
| **Tier model** | Option 3 — Reader + Realtor + Sales Agent (3 tiers) |
| **Realtor verification** | (c) Hybrid: brokerage-domain auto-approve + manual fallback |
| **Sales Agent verification** | Email-domain auto-approve via dev-specific domains, OR per-broker code redemption |
| **Auth tech** | Approach 1 — Supabase Auth (already in stack) |
| **Session length** | 30 days + auto-refresh (silent renew on activity) |
| **Tier picker today** | Delete; replace with Sign in / Sign up CTA |
| **Escape hatch** | `AUTH_ENFORCE=shadow` env var keeps old behavior alongside new |
| **Day-1 target** | Phases 1-3 day 1; phases 4-7 over 1-2 days |

## Database schema

Four tables in Supabase:

```sql
-- Custom user data linked to Supabase auth.users
profiles (
  id uuid PK references auth.users,
  email text,
  full_name text,
  tier text DEFAULT 'reader' CHECK (tier IN ('reader','pending-realtor','realtor','sales-agent')),
  realtor_license text,
  brokerage_name text,
  brokerage_email_domain text,
  approved_at timestamptz,
  approved_by text,                    -- 'auto-domain'|'auto-dev-domain'|'admin:<email>'
  sales_agent_code text,
  sales_agent_dev_slug text,
  created_at timestamptz DEFAULT now(),
  last_seen_at timestamptz DEFAULT now()
)

-- Brokerage domains that auto-promote to 'realtor'
approved_brokerage_domains (
  domain text PK,
  brokerage_name text,
  added_at timestamptz, added_by text
)

-- Development domains that auto-promote to 'sales-agent' for that dev
approved_development_domains (
  domain text PK,
  development_slug text,
  added_at timestamptz, added_by text
)

-- Audit log
tier_change_log (
  id bigserial PK,
  user_id uuid references auth.users,
  from_tier text, to_tier text,
  reason text,
  changed_at timestamptz
)
```

**Auto-tier resolution at signup** via `handle_new_user()` trigger on `auth.users` INSERT. Precedence:
1. Email domain in `approved_development_domains` → `sales-agent` (with dev slug)
2. Email domain in `approved_brokerage_domains` → `realtor`
3. Otherwise → `reader`

**RLS** on `profiles`: users see/edit own row; service-role full access. Whitelist tables and audit log: service-role only.

**Seeded brokerage domains** (12): Smith & Associates, Michael Saunders, KW corporate + KWSPR, Coldwell Banker, Compass, Redfin, SERHANT, Related, Sotheby's, Coastal Properties Group.

**Seeded dev domains** (14): viceroycwb.com, residences400central.com, rocheboboistower.com, reflectionstpete.com, arthousestpete.com, waldorfastoriastpetersburg.com, thecadestpete.com, lakehousestpete.com, coreyavenuestpete.com, onetampacondos.com, pendrytampa.com, alturabayshore.com, marinapointetampa.com, aquawestshore.com.

## Auth UI + session model

**Pages**: `/signup`, `/signin`, `/signin/verify`, `/forgot-password`, `/reset-password`, `/profile`, `/admin/users`, `/api/auth/callback`, `/api/admin/approve-realtor`.

**Sign-up form**: email, password (8+ chars), name, optional realtor opt-in (license # + brokerage). On submit, Supabase sends verification email. Trigger fires immediately to resolve tier.

**Session**: 30-day refresh tokens with silent auto-refresh on activity. Browser-close behavior: cookie persists. After 30 days dormant, user re-authenticates ("force signin on stale return" intent met).

**Three layers of access enforcement**:
1. **Middleware** (`src/middleware.ts`) — early redirect for `/brokers/*` and `/admin/*` if no session
2. **Server components** — read session via `@supabase/ssr` cookies, render unauthorized if tier insufficient
3. **Client components** — `<TierGate min="...">...</TierGate>` for inline conditional gating

**Returning visitor UX**:
- Valid session: auto-logged in, no friction
- Expired session on gated page: modal "Welcome back, sign in to continue"
- New visitor on gated page: modal "This is for Tampa Bay realtors. Sign up free."
- ANY visitor on public pages: no gate ever

## TierGate component API

```tsx
<TierGate min="realtor">
  <ElevatorPitch dev={waldorf} />
</TierGate>

<TierGate min="sales-agent" devSlug="400-central">
  <DeveloperPriceSheet />
</TierGate>

<TierGate min="realtor" fallback={<CustomUpgradePrompt />}>
  <SalesAgentContacts dev={dev} />
</TierGate>
```

Default fallback: clean upgrade card with "Sign up free →" + "Sign in →" CTAs in site theme.

## Sales-agent code redemption flow

`/brokers/[code]` URL becomes auth-aware:
- Logged in + valid code → server upgrades `profiles.tier = 'sales-agent'`, sets `sales_agent_dev_slug`, logs to audit, shows portal
- Not logged in → redirect to `/signup?next=/brokers/[code]`, code redeems on landing back

`brokerCodes.ts` schema gains `tier: 'realtor' | 'sales-agent'` (codes can grant either tier), `expiresAt?`, `maxRedemptions?`. Defaults to reusable.

## Admin moderation

`/admin/users` route gated to `process.env.ADMIN_EMAIL` (single admin = Brian).

UI shows: pending realtor approvals (with "Verify on DBPR" button + Approve/Reject), all users with tier dropdown for manual change, brokerage domain whitelist editor.

POST endpoints: `/api/admin/approve-realtor`, `/api/admin/reject-realtor`, `/api/admin/change-tier`, `/api/admin/add-domain`. All require `ADMIN_EMAIL` match + service-role for DB writes.

Approve action: updates `profiles.tier`, audit-logs, sends confirmation email via Resend.

## Email branding via Resend

Supabase Auth → Resend SMTP:
- From: `noreply@developercertified.com`
- SMTP host: `smtp.resend.com`, port 587, user `resend`, password = `RESEND_API_KEY`
- Customized templates in Supabase dashboard (charcoal/gold theme)

Prerequisite: verify `developercertified.com` in Resend (SPF + DKIM + DMARC at GoDaddy — folds into the same DNS pass for the domain itself).

## Migration: parallel-system cutover

Build the new auth system alongside the existing self-selected tier. At every commit the site continues to work as-is. Phases:

| Phase | What | Site state after |
|---|---|---|
| 1 | DB schema + auth library install | Identical to today |
| 2 | Auth pages exist (signup/signin/profile) | Identical (but accounts can be created) |
| 3 | `<UserProvider>` + rewired `useAudience` | Logged-in users get server tier; anonymous still uses localStorage |
| 4 | `<TierGate>` rolled out to 13 components | Server-verified tier drives gating for logged-in users |
| 5 | Admin route + manual approval flow | Brian can verify pending realtors |
| 6 | `/brokers/[code]` rewired for auth | Codes redeem against the user account |
| 7 | Cutover: localStorage path stripped | Anonymous = `reader` only |

`AUTH_ENFORCE` env var (`shadow` default during migration | `strict` after phase 7) provides instant rollback to old behavior without code revert.

## Build sequence

16 commits, ~6-8 hours total. See [implementation plan](#) for task-by-task detail.

## Verification model

No test framework in this codebase. Each commit verified via:
1. `npm run build` (TypeScript + Next.js)
2. `npm run lint`
3. Playwright MCP browser checks of auth flows (signup → verify → login → gated route → signed-in tier match)

## Rollback

| Scope | Action |
|---|---|
| One commit | `git revert <sha>` |
| Whole auth migration | `AUTH_ENFORCE=shadow` — instant revert to today's behavior |
| Database | `DROP TABLE profiles, approved_brokerage_domains, approved_development_domains, tier_change_log CASCADE` (forward-compatible — won't affect existing `leads`, `broker_updates`) |

## Out of scope

- OAuth (Google/Apple) — fold in post-launch
- MFA — not launch-critical
- Organizations / team accounts
- Saved comparisons / personalized dashboard
- Email preferences / newsletter
- Custom password complexity beyond default 8-char minimum
- Account deletion UI (Supabase has it; we'll add a button in phase 2 if quick)
