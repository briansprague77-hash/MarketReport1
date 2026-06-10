# Deploy Notes — DeveloperCertified.com on Vercel

## Prerequisites

1. Vercel account with access to the GitHub repo
2. GoDaddy admin access (DNS for `developercertified.com`)
3. Resend account with `tampabaymarketreport.com` verified (or `developercertified.com` once added)
4. Supabase project (URL + service-role key)
5. WhatsApp Business number (E.164 format) and group invite URL

## Environment variables (set in Vercel Project Settings → Environment Variables)

All target the **Production** environment unless noted.

| Variable | Value | Notes |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | `https://developercertified.com` | Drives canonical URLs, sitemap, OG meta. **Required.** |
| `NEXT_PUBLIC_SUPABASE_URL` | `https://<project>.supabase.co` | Public, read-safe |
| `SUPABASE_SERVICE_ROLE_KEY` | `eyJ...` (long key) | **Server-only — never expose**. Used by `/api/broker-update` and `/api/lead` for inserts. |
| `RESEND_API_KEY` | `re_...` | Server-only. Used by `/api/broker-update` and `/api/lead`. |
| `NEXT_PUBLIC_BROKER_WA_NUMBER` | `17275551234` | E.164 without `+`. Powers `/brokers/[code]` WhatsApp deep-link. Optional — feature degrades to "not configured" if missing. |
| `NEXT_PUBLIC_BROKER_WA_GROUP_INVITE` | `https://chat.whatsapp.com/XYZ123` | Realtor group invite. Powers `/brokers` page. Optional — page shows "not configured" if missing. |

## Vercel deploy steps

1. **Import the GitHub repo** in Vercel:
   ```
   New Project → Import Git Repository → marketreport
   Framework: Next.js (auto-detected)
   Root directory: ./
   ```

2. **Add the env vars above** before the first deploy. Skipping public-key vars will not break the build but will yield non-functional pages (e.g., contact form throws on submit).

3. **Deploy** — Vercel will run `next build` and publish to `<project>.vercel.app`.

4. **Verify the preview URL**:
   - `/` (homepage)
   - `/market-report`
   - `/developments`
   - `/developments/400-central` (and several others)
   - `/realtor-resources`
   - `/about` (test the correction form)
   - `/brokers` (should render the WhatsApp group hub)
   - `/contact` (test the lead form)

## Custom domain — DeveloperCertified.com

1. **In Vercel**: Settings → Domains → Add → `developercertified.com` and `www.developercertified.com`. Vercel will generate DNS records to add at GoDaddy.

2. **In GoDaddy** (DNS Management for developercertified.com):
   - Delete any existing `A` and `CNAME` records pointing to GoDaddy parking
   - Add `A` record: `@` → `76.76.21.21` (Vercel's anycast IP)
   - Add `CNAME` record: `www` → `cname.vercel-dns.com`
   - TTL: 600 seconds (10 min) for both, or default

3. **Wait 5–60 min** for DNS propagation. Vercel auto-issues a Let's Encrypt SSL cert once DNS resolves.

4. **Set `developercertified.com` as the production primary domain** in Vercel so all preview deploys use it.

## Post-deploy verification

- [ ] HTTPS green padlock on the live domain
- [ ] `/sitemap.xml` returns valid XML and uses the production domain
- [ ] `/robots.txt` allows crawling and references `developercertified.com`
- [ ] Contact form submission triggers a Resend email to your inbox
- [ ] `/brokers/<code>` 404s for all unknown codes (broker registry is empty by design until you add real entries)
- [ ] Image optimization works on external sources (next/image converts to AVIF/WebP)

## Updating data after deploy

Per current update workflow:
- **Data updates** (price, sold %, new dev): chat with Claude → edit TS file → commit → push → Vercel auto-deploys in ~2 min
- **Editorial events** (milestones, press): same flow, edit `src/data/editorialPins.ts`
- **Realtor/buyer corrections**: surfaces via `/about` form → email to brian@…
- **Broker submissions**: `/brokers/[code]` form for sales execs
- **Adding broker codes**: edit `src/data/brokerCodes.ts`, commit, push

## Rollback

Vercel keeps every deploy. To roll back:
- Vercel dashboard → Deployments → click prior deploy → "Promote to Production"
- Or via CLI: `vercel rollback <deployment-url>`

No DNS changes needed for rollbacks.
