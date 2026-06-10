# Auth + Tier Gating Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add real authentication to DeveloperCertified.com with three verified tiers (Reader, Realtor, Sales Agent), replacing the current self-declared `useAudience` localStorage system. Public analytical content stays public; realtor utilities require sign-up.

**Architecture:** Supabase Auth (already in stack) provides email/password sign-up with magic-link option. A `profiles` table linked to `auth.users` stores tier + brokerage metadata. Auto-tier resolution at signup via DB trigger checking email-domain whitelists. Server-side session validation via `@supabase/ssr` cookies, gated routes via Next.js middleware, inline gating via a new `<TierGate>` component. Parallel-system migration with a feature-flag escape hatch (`AUTH_ENFORCE` env var) so the site stays live at every commit.

**Tech Stack:** Next.js 14 App Router · Supabase Auth + Postgres · `@supabase/ssr` · Resend (for branded auth emails) · TypeScript strict mode.

**Verification model:** No unit-test framework in this codebase. Each task is verified with (a) `npm run build` (catches TypeScript + Next.js errors), (b) `npm run lint`, and (c) Playwright MCP `browser_navigate` + screenshot for visual checks. Auth-flow tasks add a (d) end-to-end browser walkthrough.

**Design doc:** `docs/plans/2026-04-27-auth-tiers-design.md`

**Additive-only constraint** (Brian 2026-02-25): no data deletion. Old `useAudience` localStorage path stays functional through phase 6; only stripped in phase 7 cutover.

---

## Pre-flight checklist

Before Task 1, confirm:

1. Supabase project URL and `service_role` key are in env (`NEXT_PUBLIC_SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`)
2. Resend API key in env (`RESEND_API_KEY`)
3. You can access the Supabase dashboard for this project to run SQL migrations
4. Working from `/Users/briansprague/Desktop/marketreport`
5. Build is currently green: `npm run build` passes

---

## Task 1: Create core auth tables

**Files:**
- Create: `supabase/migrations/0001_auth_profiles.sql`

**Why this first:** Schema is the foundation. Other tasks reference these tables.

**Step 1: Create the migration directory + file**

```bash
mkdir -p supabase/migrations
```

**Step 2: Write `supabase/migrations/0001_auth_profiles.sql`**

```sql
-- ─────────────────────────────────────────────────────────────────
-- Auth + Tier Gating: profiles, whitelists, audit log
-- See: docs/plans/2026-04-27-auth-tiers-design.md
-- ─────────────────────────────────────────────────────────────────

-- Custom user data linked to auth.users
create table if not exists public.profiles (
  id              uuid primary key references auth.users on delete cascade,
  email           text not null,
  full_name       text,
  tier            text not null default 'reader'
                    check (tier in ('reader', 'pending-realtor', 'realtor', 'sales-agent')),
  realtor_license text,
  brokerage_name  text,
  brokerage_email_domain text,
  approved_at     timestamptz,
  approved_by     text,
  sales_agent_code text,
  sales_agent_dev_slug text,
  created_at      timestamptz default now(),
  last_seen_at    timestamptz default now()
);

-- Brokerage domains that auto-promote new signups to 'realtor' tier
create table if not exists public.approved_brokerage_domains (
  domain         text primary key,
  brokerage_name text not null,
  added_at       timestamptz default now(),
  added_by       text
);

-- Development domains that auto-promote new signups to 'sales-agent' tier
create table if not exists public.approved_development_domains (
  domain           text primary key,
  development_slug text not null,
  added_at         timestamptz default now(),
  added_by         text
);

-- Audit log of all tier changes
create table if not exists public.tier_change_log (
  id          bigserial primary key,
  user_id     uuid references auth.users on delete cascade,
  from_tier   text,
  to_tier     text,
  reason      text,
  changed_at  timestamptz default now()
);

-- Seed brokerage domains (Tampa Bay major firms)
insert into public.approved_brokerage_domains (domain, brokerage_name) values
  ('smithandassociates.com',     'Smith & Associates Real Estate'),
  ('michaelsaunders.com',        'Michael Saunders & Company'),
  ('kw.com',                     'Keller Williams (corporate)'),
  ('kellerwilliams.com',         'Keller Williams (corporate)'),
  ('kwspr.com',                  'Keller Williams St Pete'),
  ('coldwellbanker.com',         'Coldwell Banker'),
  ('compass.com',                'Compass'),
  ('redfin.com',                 'Redfin'),
  ('serhant.com',                'SERHANT'),
  ('related.com',                'Related Sales'),
  ('sothebysrealty.com',         'Premier Sotheby''s'),
  ('coastalpropertiesgroup.com', 'Coastal Properties Group')
on conflict (domain) do nothing;

-- Seed development domains
insert into public.approved_development_domains (domain, development_slug) values
  ('viceroycwb.com',                  'viceroy-clearwater'),
  ('residences400central.com',        '400-central'),
  ('rocheboboistower.com',            'roche-bobois'),
  ('reflectionstpete.com',            'reflection'),
  ('arthousestpete.com',              'art-house'),
  ('waldorfastoriastpetersburg.com',  'waldorf-astoria'),
  ('thecadestpete.com',               'the-cade'),
  ('lakehousestpete.com',             'lake-house'),
  ('coreyavenuestpete.com',           'corey-landings'),
  ('onetampacondos.com',              'one-tampa'),
  ('pendrytampa.com',                 'pendry-tampa'),
  ('alturabayshore.com',              'altura-bayshore'),
  ('marinapointetampa.com',           'marina-pointe-luna'),
  ('aquawestshore.com',               'aqua-westshore')
on conflict (domain) do nothing;

-- Indexes
create index if not exists idx_profiles_tier on public.profiles (tier);
create index if not exists idx_profiles_email on public.profiles (email);
create index if not exists idx_profiles_brokerage_domain on public.profiles (brokerage_email_domain);
create index if not exists idx_tier_change_log_user on public.tier_change_log (user_id);
```

**Step 3: Apply the migration via Supabase dashboard**

1. Open Supabase project → SQL Editor → New Query
2. Paste the entire contents of `0001_auth_profiles.sql`
3. Click "Run". Verify no errors.
4. In Table Editor, confirm 4 new tables visible: `profiles`, `approved_brokerage_domains`, `approved_development_domains`, `tier_change_log`. Brokerage table should have 12 rows; dev table 14 rows.

**Step 4: Commit**

```bash
git add supabase/migrations/0001_auth_profiles.sql
git commit -m "db: profiles + brokerage/dev domain whitelists + tier_change_log

Initial schema for auth + tier gating system. Four tables:
- profiles: custom user data linked to auth.users (id FK), tier column
- approved_brokerage_domains: 12 seed entries (Tampa Bay major firms)
- approved_development_domains: 14 seed entries (dev-specific email
  domains for sales-agent auto-promotion)
- tier_change_log: audit log

See docs/plans/2026-04-27-auth-tiers-design.md for full schema rationale.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

## Task 2: Add auto-tier resolution trigger + RLS policies

**Files:**
- Create: `supabase/migrations/0002_auth_trigger_rls.sql`

**Step 1: Write the migration**

```sql
-- ─────────────────────────────────────────────────────────────────
-- Auto-tier resolution at signup + Row Level Security
-- ─────────────────────────────────────────────────────────────────

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  user_email_domain text;
  matched_brokerage text;
  matched_dev_slug  text;
  resolved_tier     text;
  approval_source   text;
begin
  user_email_domain := lower(split_part(new.email, '@', 2));

  -- Check development domain first (sales-agent has higher priority)
  select development_slug into matched_dev_slug
  from public.approved_development_domains
  where domain = user_email_domain;

  if matched_dev_slug is not null then
    resolved_tier := 'sales-agent';
    approval_source := 'auto-dev-domain';
  else
    select brokerage_name into matched_brokerage
    from public.approved_brokerage_domains
    where domain = user_email_domain;
    if matched_brokerage is not null then
      resolved_tier := 'realtor';
      approval_source := 'auto-brokerage-domain';
    else
      resolved_tier := 'reader';
      approval_source := null;
    end if;
  end if;

  insert into public.profiles (
    id, email, brokerage_email_domain, brokerage_name,
    sales_agent_dev_slug, tier, approved_at, approved_by
  ) values (
    new.id,
    new.email,
    user_email_domain,
    matched_brokerage,
    matched_dev_slug,
    resolved_tier,
    case when resolved_tier <> 'reader' then now() else null end,
    approval_source
  );

  if resolved_tier <> 'reader' then
    insert into public.tier_change_log (user_id, from_tier, to_tier, reason)
    values (new.id, null, resolved_tier, approval_source);
  end if;

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- RLS: profiles
alter table public.profiles enable row level security;

drop policy if exists "Users see own profile" on public.profiles;
create policy "Users see own profile"
  on public.profiles for select
  using (auth.uid() = id);

drop policy if exists "Users update own profile" on public.profiles;
create policy "Users update own profile"
  on public.profiles for update
  using (auth.uid() = id)
  with check (auth.uid() = id);

drop policy if exists "Service role full access on profiles" on public.profiles;
create policy "Service role full access on profiles"
  on public.profiles for all
  using (auth.role() = 'service_role');

-- RLS: whitelists (service role only)
alter table public.approved_brokerage_domains enable row level security;
drop policy if exists "Service role full access on brokerage domains" on public.approved_brokerage_domains;
create policy "Service role full access on brokerage domains"
  on public.approved_brokerage_domains for all
  using (auth.role() = 'service_role');

alter table public.approved_development_domains enable row level security;
drop policy if exists "Service role full access on dev domains" on public.approved_development_domains;
create policy "Service role full access on dev domains"
  on public.approved_development_domains for all
  using (auth.role() = 'service_role');

-- RLS: audit log (service role only)
alter table public.tier_change_log enable row level security;
drop policy if exists "Service role full access on audit log" on public.tier_change_log;
create policy "Service role full access on audit log"
  on public.tier_change_log for all
  using (auth.role() = 'service_role');
```

**Step 2: Apply via Supabase SQL Editor.** Run the migration. Verify no errors.

**Step 3: Test the trigger end-to-end** in the Supabase dashboard:

1. Authentication → Users → "Add user" → enter `test@kw.com` (a whitelisted brokerage). Click Create.
2. Table Editor → `profiles` → confirm a row exists with `tier = 'realtor'`, `brokerage_email_domain = 'kw.com'`, `approved_by = 'auto-brokerage-domain'`.
3. `tier_change_log` should have one row: `to_tier = 'realtor'`, `reason = 'auto-brokerage-domain'`.
4. Add another user `test@viceroycwb.com`. Verify `tier = 'sales-agent'`, `sales_agent_dev_slug = 'viceroy-clearwater'`.
5. Add `test@gmail.com`. Verify `tier = 'reader'`.
6. Delete the three test users from Authentication → Users (cascades to profiles).

**Step 4: Commit**

```bash
git add supabase/migrations/0002_auth_trigger_rls.sql
git commit -m "db: handle_new_user trigger + RLS policies

Adds the auto-tier resolution trigger that fires on every auth.users
INSERT. Resolution precedence:
  1. email domain in approved_development_domains -> 'sales-agent'
  2. email domain in approved_brokerage_domains -> 'realtor'
  3. otherwise -> 'reader'

RLS:
- profiles: users see/edit own row, service role full access
- whitelists + audit log: service role only

Tested end-to-end in dashboard with 3 test signups (KW.com → realtor,
viceroycwb.com → sales-agent, gmail.com → reader).

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

## Task 3: Install Supabase SSR helper + types

**Files:**
- Modify: `package.json`

**Step 1: Install dependencies**

```bash
cd /Users/briansprague/Desktop/marketreport
npm install @supabase/ssr@latest
```

This installs the Next.js App Router cookie-aware Supabase helper. `supabase-js` is already a dependency.

**Step 2: Verify build passes**

```bash
npm run build 2>&1 | tail -3
```

Expected: build succeeds with no new errors.

**Step 3: Commit**

```bash
git add package.json package-lock.json
git commit -m "chore: install @supabase/ssr for App Router cookie auth

@supabase/ssr is the official Next.js helper for Supabase Auth in
App Router. Provides cookie-aware createServerClient() and
createBrowserClient() factories that handle session refresh + JWT
storage in HTTP-only cookies.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

## Task 4: Create Supabase server + browser client helpers

**Files:**
- Create: `src/lib/supabase-server.ts`
- Create: `src/lib/supabase-browser.ts`
- Modify: `src/lib/supabase.ts` (add comment pointer to new files)

**Step 1: Create `src/lib/supabase-server.ts`**

```ts
// src/lib/supabase-server.ts
//
// Server-side Supabase client for App Router server components,
// route handlers, and middleware. Reads/writes the auth cookie.
//
// IMPORTANT: This client uses the user's JWT (RLS enforced).
// For service-role operations (e.g., admin actions), use the
// existing getSupabase() in src/lib/supabase.ts instead.

import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { cookies } from 'next/headers';

export function getSupabaseServer() {
  const cookieStore = cookies();
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value, ...options });
          } catch {
            // Called from a Server Component; cookies cannot be set there.
            // Silently ignore — middleware refreshes the session instead.
          }
        },
        remove(name: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value: '', ...options });
          } catch {
            // see comment above
          }
        },
      },
    }
  );
}
```

**Step 2: Create `src/lib/supabase-browser.ts`**

```ts
// src/lib/supabase-browser.ts
//
// Client-side Supabase singleton for browser components.
// Reads the auth cookie via document.cookie under the hood.

import { createBrowserClient } from '@supabase/ssr';

let _client: ReturnType<typeof createBrowserClient> | null = null;

export function getSupabaseBrowser() {
  if (!_client) {
    _client = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );
  }
  return _client;
}
```

**Step 3: Add a pointer comment to existing `src/lib/supabase.ts`**

Replace the file header with:

```ts
import { createClient, SupabaseClient } from '@supabase/supabase-js';

/**
 * SERVICE-ROLE Supabase client. Bypasses RLS. Server-only.
 *
 * For user-aware queries (RLS enforced), use:
 *   - server components / route handlers: getSupabaseServer() in supabase-server.ts
 *   - browser components:                  getSupabaseBrowser() in supabase-browser.ts
 *
 * Use THIS client only for:
 *   - admin operations (approve/reject realtor, change tier)
 *   - inserting public form submissions (lead capture, broker updates)
 *   - any DB write that should bypass user-level RLS
 */

let _supabase: SupabaseClient | null = null;

export function getSupabase(): SupabaseClient {
  if (!_supabase) {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!url || !key) {
      throw new Error(
        'Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY env vars',
      );
    }
    _supabase = createClient(url, key);
  }
  return _supabase;
}
```

**Step 4: Set the new env var if not already present**

Check `process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY` is set. If not, add it to your local `.env.local` AND in Vercel project settings:

```
NEXT_PUBLIC_SUPABASE_ANON_KEY=<anon key from Supabase dashboard → Settings → API>
```

**Step 5: Verify build**

```bash
npm run build 2>&1 | tail -3
```

**Step 6: Commit**

```bash
git add src/lib/supabase-server.ts src/lib/supabase-browser.ts src/lib/supabase.ts
git commit -m "feat: Supabase server + browser auth-aware clients

Three Supabase clients now coexist in src/lib:
- supabase.ts        : SERVICE-ROLE (admin ops, public form writes)
- supabase-server.ts : user-aware via cookies (server components)
- supabase-browser.ts: user-aware via cookies (client components)

Adds NEXT_PUBLIC_SUPABASE_ANON_KEY env var requirement.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

## Task 5: Build /signup page

**Files:**
- Create: `src/app/(marketing)/signup/page.tsx`
- Create: `src/app/(marketing)/signup/SignupForm.tsx`

**Step 1: Server-component page wrapper**

```tsx
// src/app/(marketing)/signup/page.tsx
import { redirect } from 'next/navigation';
import { getSupabaseServer } from '@/lib/supabase-server';
import SignupForm from './SignupForm';

export const metadata = {
  title: 'Sign Up · DeveloperCertified',
  description: 'Create your account to access realtor utilities and the broker group chat.',
};

export default async function SignupPage({ searchParams }: { searchParams: { next?: string } }) {
  const supabase = getSupabaseServer();
  const { data: { user } } = await supabase.auth.getUser();
  if (user) redirect(searchParams.next ?? '/profile');

  return (
    <main className="min-h-screen bg-charcoal-950 flex items-center justify-center px-4 py-24">
      <div className="w-full max-w-md">
        <h1 className="font-heading text-3xl text-white mb-2">Create your account</h1>
        <p className="text-ivory-400/70 mb-8">
          Free. No marketing fluff.
        </p>
        <SignupForm next={searchParams.next} />
      </div>
    </main>
  );
}
```

**Step 2: Client form**

```tsx
// src/app/(marketing)/signup/SignupForm.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import { getSupabaseBrowser } from '@/lib/supabase-browser';

export default function SignupForm({ next }: { next?: string }) {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isRealtor, setIsRealtor] = useState(false);
  const [license, setLicense] = useState('');
  const [brokerage, setBrokerage] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'check-email' | 'error'>('idle');
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('submitting');
    setError('');
    const supabase = getSupabaseBrowser();
    const { error: authErr } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: name,
          self_declared_realtor: isRealtor,
          realtor_license: license || undefined,
          brokerage_name: brokerage || undefined,
        },
        emailRedirectTo: `${window.location.origin}/api/auth/callback?next=${encodeURIComponent(next ?? '/profile')}`,
      },
    });
    if (authErr) {
      setStatus('error');
      setError(authErr.message);
      return;
    }
    setStatus('check-email');
  }

  if (status === 'check-email') {
    return (
      <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/5 p-6">
        <p className="text-emerald-300 mb-2">Check your email</p>
        <p className="text-sm text-ivory-400/70">
          We sent a verification link to <strong>{email}</strong>. Click the link to finish creating your account.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        className="w-full rounded-lg border border-ivory-100/10 bg-charcoal-900 px-4 py-3 text-ivory-100 placeholder-ivory-400/50 focus:border-gold-500/60 focus:outline-none"
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="w-full rounded-lg border border-ivory-100/10 bg-charcoal-900 px-4 py-3 text-ivory-100 placeholder-ivory-400/50 focus:border-gold-500/60 focus:outline-none"
      />
      <input
        type="password"
        placeholder="Password (8+ characters)"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        minLength={8}
        required
        className="w-full rounded-lg border border-ivory-100/10 bg-charcoal-900 px-4 py-3 text-ivory-100 placeholder-ivory-400/50 focus:border-gold-500/60 focus:outline-none"
      />
      <label className="flex items-center gap-2 text-sm text-ivory-300">
        <input
          type="checkbox"
          checked={isRealtor}
          onChange={(e) => setIsRealtor(e.target.checked)}
          className="rounded"
        />
        I&rsquo;m a Florida-licensed realtor
      </label>
      {isRealtor && (
        <>
          <input
            type="text"
            placeholder="FL DBPR license # (optional)"
            value={license}
            onChange={(e) => setLicense(e.target.value)}
            className="w-full rounded-lg border border-ivory-100/10 bg-charcoal-900 px-4 py-3 text-ivory-100 placeholder-ivory-400/50 focus:border-gold-500/60 focus:outline-none"
          />
          <input
            type="text"
            placeholder="Your brokerage (optional)"
            value={brokerage}
            onChange={(e) => setBrokerage(e.target.value)}
            className="w-full rounded-lg border border-ivory-100/10 bg-charcoal-900 px-4 py-3 text-ivory-100 placeholder-ivory-400/50 focus:border-gold-500/60 focus:outline-none"
          />
        </>
      )}
      {error && (
        <div className="rounded-lg border border-red-500/30 bg-red-500/5 p-3 text-sm text-red-300">{error}</div>
      )}
      <Button type="submit" variant="primary" size="md" disabled={status === 'submitting'}>
        {status === 'submitting' ? 'Creating account…' : 'Create account'}
      </Button>
      <p className="text-sm text-ivory-400/60 text-center">
        Already have an account? <Link href="/signin" className="text-gold-400 underline underline-offset-4">Sign in</Link>
      </p>
    </form>
  );
}
```

**Step 3: Verify build**

```bash
npm run build 2>&1 | tail -3
```

**Step 4: Commit**

```bash
git add src/app/\(marketing\)/signup/
git commit -m "feat: /signup page with email + password + optional realtor opt-in

Server component checks for existing session and redirects to /profile.
Client form calls supabase.auth.signUp() with verification email
redirect to /api/auth/callback. Realtor opt-in fields (license + brokerage)
saved to user_metadata; auto-tier resolution still happens via the
DB trigger from Task 2.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

## Task 6: Build /signin page + magic-link option + auth callback route

**Files:**
- Create: `src/app/(marketing)/signin/page.tsx`
- Create: `src/app/(marketing)/signin/SigninForm.tsx`
- Create: `src/app/api/auth/callback/route.ts`

**Step 1: Auth callback route handler**

```ts
// src/app/api/auth/callback/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseServer } from '@/lib/supabase-server';

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');
  const next = searchParams.get('next') ?? '/profile';

  if (code) {
    const supabase = getSupabaseServer();
    await supabase.auth.exchangeCodeForSession(code);
  }

  return NextResponse.redirect(`${origin}${next}`);
}
```

**Step 2: /signin page (server)**

```tsx
// src/app/(marketing)/signin/page.tsx
import { redirect } from 'next/navigation';
import { getSupabaseServer } from '@/lib/supabase-server';
import SigninForm from './SigninForm';

export const metadata = {
  title: 'Sign In · DeveloperCertified',
};

export default async function SigninPage({ searchParams }: { searchParams: { next?: string; redirect?: string } }) {
  const supabase = getSupabaseServer();
  const { data: { user } } = await supabase.auth.getUser();
  const redirectTo = searchParams.next ?? searchParams.redirect ?? '/profile';
  if (user) redirect(redirectTo);

  return (
    <main className="min-h-screen bg-charcoal-950 flex items-center justify-center px-4 py-24">
      <div className="w-full max-w-md">
        <h1 className="font-heading text-3xl text-white mb-8">Welcome back</h1>
        <SigninForm next={redirectTo} />
      </div>
    </main>
  );
}
```

**Step 3: SigninForm (client) — provide both password and magic-link options**

```tsx
// src/app/(marketing)/signin/SigninForm.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import { getSupabaseBrowser } from '@/lib/supabase-browser';

type Mode = 'password' | 'magic';

export default function SigninForm({ next }: { next: string }) {
  const [mode, setMode] = useState<Mode>('password');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'sent' | 'error'>('idle');
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('submitting');
    setError('');
    const supabase = getSupabaseBrowser();

    if (mode === 'password') {
      const { error: err } = await supabase.auth.signInWithPassword({ email, password });
      if (err) {
        setStatus('error');
        setError(err.message);
        return;
      }
      // Browser auth listener will redirect on session change
      window.location.href = next;
    } else {
      const { error: err } = await supabase.auth.signInWithOtp({
        email,
        options: { emailRedirectTo: `${window.location.origin}/api/auth/callback?next=${encodeURIComponent(next)}` },
      });
      if (err) {
        setStatus('error');
        setError(err.message);
        return;
      }
      setStatus('sent');
    }
  }

  if (status === 'sent') {
    return (
      <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/5 p-6">
        <p className="text-emerald-300 mb-2">Magic link sent</p>
        <p className="text-sm text-ivory-400/70">Check <strong>{email}</strong> for a link to sign in.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="w-full rounded-lg border border-ivory-100/10 bg-charcoal-900 px-4 py-3 text-ivory-100 placeholder-ivory-400/50 focus:border-gold-500/60 focus:outline-none"
      />
      {mode === 'password' && (
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full rounded-lg border border-ivory-100/10 bg-charcoal-900 px-4 py-3 text-ivory-100 placeholder-ivory-400/50 focus:border-gold-500/60 focus:outline-none"
        />
      )}
      {error && (
        <div className="rounded-lg border border-red-500/30 bg-red-500/5 p-3 text-sm text-red-300">{error}</div>
      )}
      <Button type="submit" variant="primary" size="md" disabled={status === 'submitting'}>
        {status === 'submitting' ? 'Signing in…' : (mode === 'password' ? 'Sign in' : 'Send magic link')}
      </Button>
      <button
        type="button"
        onClick={() => { setMode(mode === 'password' ? 'magic' : 'password'); setStatus('idle'); setError(''); }}
        className="block mx-auto text-sm text-gold-400 underline underline-offset-4"
      >
        {mode === 'password' ? 'Use magic link instead' : 'Use password instead'}
      </button>
      <p className="text-sm text-ivory-400/60 text-center">
        New here? <Link href="/signup" className="text-gold-400 underline underline-offset-4">Create account</Link>
      </p>
    </form>
  );
}
```

**Step 4: Verify build, then test the flow**

```bash
npm run build 2>&1 | tail -3
```

If build passes:

1. `npm run dev`
2. Visit http://localhost:3000/signup
3. Sign up with `test-realtor@kw.com`. Confirm "check your email" page renders.
4. Open Supabase dashboard → Authentication → Users → confirm user exists.
5. Click verification link in email (use Supabase's "Send magic link from dashboard" option if SMTP isn't configured yet).
6. Should land on `/profile` (not built yet — will 404; that's fine).

**Step 5: Commit**

```bash
git add src/app/\(marketing\)/signin/ src/app/api/auth/callback/
git commit -m "feat: /signin page + magic-link mode + /api/auth/callback

SigninForm supports both email+password and passwordless magic-link.
The callback route exchanges the OAuth code for a session cookie and
redirects to ?next= or /profile.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

## Task 7: Build /profile page (view tier, sign out, request realtor)

**Files:**
- Create: `src/app/(marketing)/profile/page.tsx`
- Create: `src/app/(marketing)/profile/ProfileContent.tsx`
- Create: `src/app/api/auth/signout/route.ts`
- Create: `src/app/api/profile/request-realtor/route.ts`

**Step 1: Sign-out route handler**

```ts
// src/app/api/auth/signout/route.ts
import { NextResponse } from 'next/server';
import { getSupabaseServer } from '@/lib/supabase-server';

export async function POST(request: Request) {
  const { origin } = new URL(request.url);
  const supabase = getSupabaseServer();
  await supabase.auth.signOut();
  return NextResponse.redirect(`${origin}/`, { status: 303 });
}
```

**Step 2: Request-realtor route handler**

```ts
// src/app/api/profile/request-realtor/route.ts
import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { getSupabaseServer } from '@/lib/supabase-server';
import { getSupabase as getServiceSupabase } from '@/lib/supabase';

export async function POST(request: Request) {
  const supabase = getSupabaseServer();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });

  const body = await request.json();
  const { license, brokerage } = body as { license?: string; brokerage?: string };

  // Update profile with pending status + provided info
  const service = getServiceSupabase();
  await service
    .from('profiles')
    .update({
      tier: 'pending-realtor',
      realtor_license: license,
      brokerage_name: brokerage,
    })
    .eq('id', user.id);
  await service.from('tier_change_log').insert({
    user_id: user.id,
    from_tier: 'reader',
    to_tier: 'pending-realtor',
    reason: 'user-request',
  });

  // Email Brian for review
  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const adminEmail = process.env.ADMIN_EMAIL ?? 'brian@tampabaymarketreport.com';
    await resend.emails.send({
      from: 'DeveloperCertified <noreply@updates.tampabaymarketreport.com>',
      to: [adminEmail],
      subject: `[Realtor Approval] ${user.email} requesting verification`,
      html: `
        <div style="font-family: -apple-system, sans-serif;">
          <h2>Realtor verification request</h2>
          <p><strong>Email:</strong> ${user.email}</p>
          <p><strong>License:</strong> ${license ?? '(not provided)'}</p>
          <p><strong>Brokerage:</strong> ${brokerage ?? '(not provided)'}</p>
          <p>Verify on <a href="https://www.myfloridalicense.com/wl11.asp">DBPR</a> then approve at /admin/users.</p>
        </div>
      `,
    });
  } catch (e) {
    // Non-fatal
    console.error('Resend error:', e);
  }

  return NextResponse.json({ success: true });
}
```

**Step 3: /profile page (server) + ProfileContent (client)**

```tsx
// src/app/(marketing)/profile/page.tsx
import { redirect } from 'next/navigation';
import { getSupabaseServer } from '@/lib/supabase-server';
import ProfileContent from './ProfileContent';

export const metadata = { title: 'Your Profile · DeveloperCertified' };

export default async function ProfilePage() {
  const supabase = getSupabaseServer();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/signin?next=/profile');

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  return (
    <main className="min-h-screen bg-charcoal-950 px-4 py-24">
      <div className="max-w-2xl mx-auto">
        <h1 className="font-heading text-3xl text-white mb-8">Your account</h1>
        <ProfileContent
          email={user.email!}
          fullName={profile?.full_name ?? null}
          tier={profile?.tier ?? 'reader'}
          brokerageName={profile?.brokerage_name ?? null}
          realtorLicense={profile?.realtor_license ?? null}
          salesAgentDevSlug={profile?.sales_agent_dev_slug ?? null}
        />
      </div>
    </main>
  );
}
```

```tsx
// src/app/(marketing)/profile/ProfileContent.tsx
'use client';

import { useState } from 'react';
import Button from '@/components/ui/Button';

interface Props {
  email: string;
  fullName: string | null;
  tier: 'reader' | 'pending-realtor' | 'realtor' | 'sales-agent';
  brokerageName: string | null;
  realtorLicense: string | null;
  salesAgentDevSlug: string | null;
}

const TIER_LABEL: Record<Props['tier'], string> = {
  'reader': 'Reader',
  'pending-realtor': 'Realtor (pending verification)',
  'realtor': 'Realtor',
  'sales-agent': 'Sales Agent',
};

export default function ProfileContent({ email, fullName, tier, brokerageName, realtorLicense, salesAgentDevSlug }: Props) {
  const [showRequestForm, setShowRequestForm] = useState(false);
  const [license, setLicense] = useState('');
  const [brokerage, setBrokerage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [requested, setRequested] = useState(false);

  async function submitRealtorRequest(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    const res = await fetch('/api/profile/request-realtor', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ license, brokerage }),
    });
    setSubmitting(false);
    if (res.ok) setRequested(true);
  }

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-ivory-100/10 bg-charcoal-900/60 p-6">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="text-ivory-400/70">Email</div>
          <div className="text-ivory-100">{email}</div>
          {fullName && (
            <>
              <div className="text-ivory-400/70">Name</div>
              <div className="text-ivory-100">{fullName}</div>
            </>
          )}
          <div className="text-ivory-400/70">Tier</div>
          <div className="text-gold-400 font-medium">{TIER_LABEL[tier]}</div>
          {brokerageName && (
            <>
              <div className="text-ivory-400/70">Brokerage</div>
              <div className="text-ivory-100">{brokerageName}</div>
            </>
          )}
          {realtorLicense && (
            <>
              <div className="text-ivory-400/70">License #</div>
              <div className="text-ivory-100">{realtorLicense}</div>
            </>
          )}
          {salesAgentDevSlug && (
            <>
              <div className="text-ivory-400/70">Selling at</div>
              <div className="text-ivory-100">{salesAgentDevSlug}</div>
            </>
          )}
        </div>
      </div>

      {tier === 'reader' && !showRequestForm && !requested && (
        <Button variant="outline" size="md" onClick={() => setShowRequestForm(true)}>
          Request Realtor Verification
        </Button>
      )}

      {showRequestForm && !requested && (
        <form onSubmit={submitRealtorRequest} className="rounded-xl border border-gold-500/20 bg-charcoal-900/60 p-6 space-y-4">
          <h3 className="font-heading text-lg text-white">Verify as a realtor</h3>
          <input
            type="text"
            placeholder="FL DBPR license #"
            value={license}
            onChange={(e) => setLicense(e.target.value)}
            required
            className="w-full rounded-lg border border-ivory-100/10 bg-charcoal-900 px-4 py-3 text-ivory-100 focus:border-gold-500/60 focus:outline-none"
          />
          <input
            type="text"
            placeholder="Your brokerage"
            value={brokerage}
            onChange={(e) => setBrokerage(e.target.value)}
            required
            className="w-full rounded-lg border border-ivory-100/10 bg-charcoal-900 px-4 py-3 text-ivory-100 focus:border-gold-500/60 focus:outline-none"
          />
          <Button type="submit" variant="primary" size="md" disabled={submitting}>
            {submitting ? 'Submitting…' : 'Submit for verification'}
          </Button>
        </form>
      )}

      {requested && (
        <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/5 p-6">
          <p className="text-emerald-300">Request submitted. Brian will review within 24 hours.</p>
        </div>
      )}

      <form action="/api/auth/signout" method="POST">
        <Button type="submit" variant="ghost" size="md">Sign out</Button>
      </form>
    </div>
  );
}
```

**Step 4: Build + commit**

```bash
npm run build 2>&1 | tail -3
git add src/app/\(marketing\)/profile/ src/app/api/auth/signout/ src/app/api/profile/
git commit -m "feat: /profile page + sign-out + request-realtor route

User dashboard showing tier, email, brokerage; request-realtor flow
emails Brian via Resend with the user's claimed license + brokerage
plus a link to the FL DBPR verification site.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

## Task 8: UserProvider + rewired useAudience hook

**Files:**
- Create: `src/lib/userContext.tsx`
- Modify: `src/lib/audience.tsx` (delegates to UserProvider for logged-in users; falls back to localStorage in shadow mode)
- Modify: `src/app/layout.tsx` (wraps the tree in UserProvider)

**Step 1: Create the UserProvider**

```tsx
// src/lib/userContext.tsx
'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { getSupabaseBrowser } from '@/lib/supabase-browser';

export type Tier = 'reader' | 'pending-realtor' | 'realtor' | 'sales-agent';

interface User {
  id: string;
  email: string;
  fullName: string | null;
  tier: Tier;
  salesAgentDevSlug: string | null;
}

interface UserContextValue {
  user: User | null;
  isLoading: boolean;
  refresh: () => Promise<void>;
}

const UserContext = createContext<UserContextValue>({
  user: null,
  isLoading: true,
  refresh: async () => {},
});

export function UserProvider({ children, initialUser }: { children: React.ReactNode; initialUser: User | null }) {
  const [user, setUser] = useState<User | null>(initialUser);
  const [isLoading, setIsLoading] = useState(false);

  async function refresh() {
    setIsLoading(true);
    const supabase = getSupabaseBrowser();
    const { data: { user: authUser } } = await supabase.auth.getUser();
    if (!authUser) {
      setUser(null);
      setIsLoading(false);
      return;
    }
    const { data: profile } = await supabase
      .from('profiles')
      .select('email, full_name, tier, sales_agent_dev_slug')
      .eq('id', authUser.id)
      .single();
    if (profile) {
      setUser({
        id: authUser.id,
        email: profile.email,
        fullName: profile.full_name,
        tier: profile.tier,
        salesAgentDevSlug: profile.sales_agent_dev_slug,
      });
    }
    setIsLoading(false);
  }

  useEffect(() => {
    const supabase = getSupabaseBrowser();
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) refresh();
      else setUser(null);
    });
    return () => subscription.unsubscribe();
  }, []);

  return (
    <UserContext.Provider value={{ user, isLoading, refresh }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}
```

**Step 2: Rewire `src/lib/audience.tsx`** (preserves the existing API surface for the 13 components currently using it)

Modify the existing useAudience to:
1. First, try to read tier from `useUser()`
2. If logged in, use server tier
3. If not logged in (or `AUTH_ENFORCE === 'shadow'`), fall back to localStorage as today

The existing `audience.tsx` exports `AudienceTier`, `useAudience`, `AudienceProvider`. Update the provider to subscribe to `useUser()` AND localStorage:

```tsx
// Inside AudienceProvider:
const { user } = useUser();

// Effective tier resolution:
function resolveTier(): AudienceTier {
  if (user) {
    // Map server tier to old enum (server uses 'reader', old uses 'consumer')
    if (user.tier === 'reader' || user.tier === 'pending-realtor') return 'consumer';
    if (user.tier === 'realtor') return 'realtor';
    if (user.tier === 'sales-agent') return 'sales-agent';
  }
  // Shadow-mode fallback: read localStorage
  if (process.env.NEXT_PUBLIC_AUTH_ENFORCE !== 'strict') {
    return localStorageTier;
  }
  return 'consumer';
}
```

**Step 3: Wrap the tree in `src/app/layout.tsx`**

Read the current root user via the server client, pass to `<UserProvider initialUser={...}>`, wrap above `<AudienceProvider>`:

```tsx
import { getSupabaseServer } from '@/lib/supabase-server';
import { UserProvider } from '@/lib/userContext';

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const supabase = getSupabaseServer();
  const { data: { user: authUser } } = await supabase.auth.getUser();
  let initialUser = null;
  if (authUser) {
    const { data: profile } = await supabase
      .from('profiles').select('*').eq('id', authUser.id).single();
    if (profile) initialUser = {
      id: authUser.id, email: profile.email, fullName: profile.full_name,
      tier: profile.tier, salesAgentDevSlug: profile.sales_agent_dev_slug,
    };
  }
  return (
    <html>
      <body>
        <UserProvider initialUser={initialUser}>
          <AudienceProvider>
            {children}
          </AudienceProvider>
        </UserProvider>
      </body>
    </html>
  );
}
```

**Step 4: Build + verify nothing broke**

```bash
npm run build 2>&1 | tail -5
```

Test in browser:
1. Logged-out: site should look identical to today
2. Logged-in (after Task 7): tier picker should still work BUT useAudience returns server tier when there's a user

**Step 5: Commit**

```bash
git add src/lib/userContext.tsx src/lib/audience.tsx src/app/layout.tsx
git commit -m "feat: UserProvider + rewired useAudience to read server tier

UserProvider fetches profile.tier from Supabase on mount (initial user
hydrated from server component) and subscribes to onAuthStateChange.

useAudience now first checks useUser(). If logged in, uses server tier
(mapped to old AudienceTier enum). If not logged in, falls back to
localStorage tier as today (shadow mode). NEXT_PUBLIC_AUTH_ENFORCE='strict'
disables the localStorage fallback in phase 7.

13 existing useAudience consumers untouched — they get server tier for
free once a user logs in.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

## Task 9: Middleware — gate /brokers/* and /admin/*

**Files:**
- Create: `src/middleware.ts`

**Step 1: Write middleware**

```ts
// src/middleware.ts
import { NextResponse, type NextRequest } from 'next/server';
import { createServerClient, type CookieOptions } from '@supabase/ssr';

const PROTECTED_PREFIXES = ['/admin'];
// Note: /brokers index page is realtor+ via TierGate (allows the gated UI to render with
// upgrade prompts for reader-tier users); only /admin gets a hard middleware redirect.

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (!PROTECTED_PREFIXES.some(p => pathname.startsWith(p))) {
    return NextResponse.next();
  }

  // Hard-gate /admin routes — must be authenticated AND admin
  let response = NextResponse.next({ request: { headers: request.headers } });
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) { return request.cookies.get(name)?.value; },
        set(name: string, value: string, options: CookieOptions) {
          request.cookies.set({ name, value, ...options });
          response = NextResponse.next({ request: { headers: request.headers } });
          response.cookies.set({ name, value, ...options });
        },
        remove(name: string, options: CookieOptions) {
          request.cookies.set({ name, value: '', ...options });
          response = NextResponse.next({ request: { headers: request.headers } });
          response.cookies.set({ name, value: '', ...options });
        },
      },
    },
  );

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    const signinUrl = new URL('/signin', request.url);
    signinUrl.searchParams.set('next', pathname);
    return NextResponse.redirect(signinUrl);
  }

  // For /admin: also check ADMIN_EMAIL match
  if (pathname.startsWith('/admin')) {
    const adminEmail = process.env.ADMIN_EMAIL;
    if (!adminEmail || user.email !== adminEmail) {
      return NextResponse.rewrite(new URL('/404', request.url));
    }
  }

  return response;
}

export const config = {
  matcher: ['/admin/:path*'],
};
```

**Step 2: Verify build**

```bash
npm run build 2>&1 | tail -3
```

**Step 3: Manual test**

```bash
npm run dev
```

Visit /admin/users (doesn't exist yet — 404 fine for now). With no session: should redirect to /signin?next=/admin/users.

**Step 4: Commit**

```bash
git add src/middleware.ts
git commit -m "feat: middleware gates /admin/* with auth + ADMIN_EMAIL check

Hard gate for /admin routes: redirect to /signin if no session, 404
if signed in but email doesn't match ADMIN_EMAIL env var.

/brokers/* intentionally NOT in middleware — TierGate at the page
level handles inline upgrade prompts (better UX than blanket redirects
for content visible to lower tiers with degraded views).

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

## Task 10: TierGate component + roll out to gated regions

**Files:**
- Create: `src/components/auth/TierGate.tsx`
- Modify: each of the 13 components currently using `useAudience` (varies; only the ones with truly gated content get rewrapped — most just adjust their existing tier check to call useUser instead of useAudience, OR continue using useAudience which now reads server tier under the hood)

**Step 1: Create TierGate**

```tsx
// src/components/auth/TierGate.tsx
'use client';

import Link from 'next/link';
import { useUser, type Tier } from '@/lib/userContext';

const TIER_RANK: Record<Tier, number> = {
  'reader': 0,
  'pending-realtor': 0,
  'realtor': 1,
  'sales-agent': 2,
};

interface Props {
  min: Tier;
  children: React.ReactNode;
  fallback?: React.ReactNode;
  /** For sales-agent: only allow if user.salesAgentDevSlug matches */
  devSlug?: string;
}

export default function TierGate({ min, children, fallback, devSlug }: Props) {
  const { user, isLoading } = useUser();
  if (isLoading) return null;

  const userRank = user ? TIER_RANK[user.tier] : -1;
  const minRank = TIER_RANK[min];

  if (userRank < minRank) {
    return <>{fallback ?? <DefaultUpgrade min={min} />}</>;
  }
  if (devSlug && min === 'sales-agent' && user?.salesAgentDevSlug !== devSlug) {
    return <>{fallback ?? <DefaultUpgrade min={min} devSlug={devSlug} />}</>;
  }

  return <>{children}</>;
}

function DefaultUpgrade({ min, devSlug }: { min: Tier; devSlug?: string }) {
  const label = min === 'realtor' ? 'verified realtors' :
                min === 'sales-agent' ? `the ${devSlug ?? 'this development'} sales team` :
                'signed-in users';
  return (
    <div className="rounded-xl border border-gold-500/20 bg-charcoal-900/60 p-6 text-center">
      <p className="text-sm uppercase tracking-wider text-gold-500 mb-2">🔒 Restricted</p>
      <p className="text-ivory-100 mb-4">This is for {label}.</p>
      <div className="flex justify-center gap-3">
        <Link href="/signup" className="px-4 py-2 bg-gold-500 text-charcoal-900 rounded text-sm font-semibold">Sign up free</Link>
        <Link href="/signin" className="px-4 py-2 border border-ivory-100/20 text-ivory-100 rounded text-sm">Sign in</Link>
      </div>
    </div>
  );
}
```

**Step 2: Identify the 13 useAudience consumers**

```bash
grep -rln "useAudience" /Users/briansprague/Desktop/marketreport/src/
```

For each, decide:
- **Keep useAudience** — if the component just uses `isPro` for cosmetic conditional rendering (e.g., showing different ctaLabel). No change needed; it now reads server tier under the hood.
- **Wrap in TierGate** — if the component shows truly gated content that should be hidden / replaced with upgrade prompt.

For the launch, target the 4 most-impactful gates:

1. **`src/components/sections/realtor/BrokerChatHub.tsx`** — already gates by `isPro`. Replace the gating conditional with `<TierGate min="realtor">` at the section root.
2. **`src/components/sections/development/FinancingSection.tsx`** — financing details for serious buyers. Wrap detailed sections in `<TierGate min="realtor">`.
3. **`src/app/(marketing)/realtor-resources/RealtorResourcesContent.tsx`** — full realtor data. Wrap commission tables, sales-team rolodex, doc downloads in `<TierGate min="realtor">`.
4. **`src/components/sections/development/BrokerCommissionSection.tsx`** — commission data is inherently realtor-only. Wrap entirely.

**Step 3: Build + verify**

```bash
npm run build 2>&1 | tail -3
```

Test in browser:
- Anonymous: gated regions show upgrade card; non-gated content unchanged
- Reader: same as anonymous (reader has rank 0, same as no user)
- Realtor: full content
- Sales-agent: full content

**Step 4: Commit**

```bash
git add src/components/auth/TierGate.tsx src/components/sections/
git commit -m "feat: TierGate component + roll out to 4 gated regions

TierGate is a client wrapper that conditionally renders children
based on the user's server-verified tier. Default fallback is a
clean upgrade card with Sign up / Sign in CTAs.

Wrapped four key gated regions:
- BrokerChatHub (realtor+)
- FinancingSection detail (realtor+)
- RealtorResourcesContent commission/contacts/docs (realtor+)
- BrokerCommissionSection (realtor+)

Other useAudience consumers left alone — they now read server tier
through the rewired hook.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

## Task 11: Admin dashboard at /admin/users

**Files:**
- Create: `src/app/(marketing)/admin/users/page.tsx`
- Create: `src/app/(marketing)/admin/users/AdminUsersContent.tsx`

**Step 1: Server page** (gated by middleware Task 9)

```tsx
// src/app/(marketing)/admin/users/page.tsx
import { getSupabaseServer } from '@/lib/supabase-server';
import { getSupabase as getServiceSupabase } from '@/lib/supabase';
import AdminUsersContent from './AdminUsersContent';

export const dynamic = 'force-dynamic';
export const metadata = { title: 'Admin · Users · DeveloperCertified', robots: { index: false } };

export default async function AdminUsersPage() {
  // Middleware ensures we're authenticated + admin email
  const service = getServiceSupabase();
  const { data: profiles } = await service
    .from('profiles')
    .select('*')
    .order('created_at', { ascending: false });

  const { data: brokerageDomains } = await service
    .from('approved_brokerage_domains')
    .select('*')
    .order('domain');

  return <AdminUsersContent profiles={profiles ?? []} brokerageDomains={brokerageDomains ?? []} />;
}
```

**Step 2: Client content** (full table + actions)

```tsx
// src/app/(marketing)/admin/users/AdminUsersContent.tsx
'use client';

import { useState } from 'react';

interface Profile {
  id: string;
  email: string;
  full_name: string | null;
  tier: string;
  realtor_license: string | null;
  brokerage_name: string | null;
  approved_at: string | null;
  approved_by: string | null;
  created_at: string;
}

interface Props {
  profiles: Profile[];
  brokerageDomains: { domain: string; brokerage_name: string }[];
}

export default function AdminUsersContent({ profiles, brokerageDomains }: Props) {
  const [filter, setFilter] = useState<'all' | 'pending' | 'realtor' | 'sales-agent' | 'reader'>('all');
  const filtered = filter === 'all' ? profiles :
                   filter === 'pending' ? profiles.filter(p => p.tier === 'pending-realtor') :
                   profiles.filter(p => p.tier === filter);

  async function action(endpoint: string, body: object) {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    if (res.ok) window.location.reload();
    else alert('Action failed: ' + (await res.text()));
  }

  return (
    <main className="min-h-screen bg-charcoal-950 px-4 py-12">
      <div className="max-w-5xl mx-auto">
        <h1 className="font-heading text-3xl text-white mb-8">User Management</h1>

        <div className="mb-4 flex gap-2">
          {['all', 'pending', 'realtor', 'sales-agent', 'reader'].map(t => (
            <button
              key={t}
              onClick={() => setFilter(t as typeof filter)}
              className={`px-3 py-1 rounded text-sm ${filter === t ? 'bg-gold-500 text-charcoal-900' : 'bg-charcoal-800 text-ivory-300'}`}
            >
              {t} ({t === 'all' ? profiles.length :
                    t === 'pending' ? profiles.filter(p => p.tier === 'pending-realtor').length :
                    profiles.filter(p => p.tier === t).length})
            </button>
          ))}
        </div>

        <table className="w-full text-sm">
          <thead className="bg-charcoal-900 text-ivory-300">
            <tr>
              <th className="text-left p-3">Email</th>
              <th className="text-left p-3">Name</th>
              <th className="text-left p-3">Tier</th>
              <th className="text-left p-3">License / Brokerage</th>
              <th className="text-left p-3">Created</th>
              <th className="text-left p-3">Actions</th>
            </tr>
          </thead>
          <tbody className="text-ivory-200">
            {filtered.map(p => (
              <tr key={p.id} className="border-b border-ivory-100/5">
                <td className="p-3">{p.email}</td>
                <td className="p-3">{p.full_name ?? '—'}</td>
                <td className="p-3 text-gold-400">{p.tier}</td>
                <td className="p-3 text-xs text-ivory-400/70">
                  {p.realtor_license && <div>Lic: {p.realtor_license}</div>}
                  {p.brokerage_name && <div>{p.brokerage_name}</div>}
                </td>
                <td className="p-3 text-xs text-ivory-400/70">{new Date(p.created_at).toLocaleDateString()}</td>
                <td className="p-3 space-x-2">
                  {p.tier === 'pending-realtor' && (
                    <>
                      <a target="_blank" rel="noopener" href="https://www.myfloridalicense.com/wl11.asp" className="text-blue-400 underline text-xs">DBPR ↗</a>
                      <button onClick={() => action('/api/admin/approve-realtor', { userId: p.id })} className="px-2 py-1 bg-emerald-600 text-white rounded text-xs">Approve</button>
                      <button onClick={() => action('/api/admin/change-tier', { userId: p.id, tier: 'reader' })} className="px-2 py-1 bg-red-600 text-white rounded text-xs">Reject</button>
                    </>
                  )}
                  {p.tier === 'realtor' && (
                    <button onClick={() => action('/api/admin/change-tier', { userId: p.id, tier: 'reader' })} className="px-2 py-1 bg-yellow-600 text-white rounded text-xs">Demote</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="mt-8">
          <h2 className="font-heading text-xl text-white mb-3">Brokerage Domain Whitelist</h2>
          <div className="text-sm text-ivory-400/70">
            {brokerageDomains.length} domains. Add via Supabase dashboard SQL editor for now.
          </div>
        </div>
      </div>
    </main>
  );
}
```

**Step 3: Build + commit**

```bash
npm run build 2>&1 | tail -3
git add src/app/\(marketing\)/admin/users/
git commit -m "feat: /admin/users dashboard

Server-rendered table of all profiles with filter chips and per-row
actions: Approve (pending-realtor → realtor), Demote (realtor → reader),
DBPR verification link. Middleware enforces admin-only access.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

## Task 12: Admin API endpoints

**Files:**
- Create: `src/app/api/admin/approve-realtor/route.ts`
- Create: `src/app/api/admin/change-tier/route.ts`

**Step 1: Shared admin auth helper**

Add to `src/lib/supabase-server.ts`:

```ts
import { redirect } from 'next/navigation';
// ... existing imports ...

export async function requireAdmin() {
  const supabase = getSupabaseServer();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user || user.email !== process.env.ADMIN_EMAIL) {
    return null;
  }
  return user;
}
```

**Step 2: Approve route**

```ts
// src/app/api/admin/approve-realtor/route.ts
import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { requireAdmin } from '@/lib/supabase-server';
import { getSupabase } from '@/lib/supabase';

export async function POST(request: Request) {
  const admin = await requireAdmin();
  if (!admin) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

  const { userId } = await request.json() as { userId: string };
  const service = getSupabase();

  const { data: profile } = await service.from('profiles').select('email, tier').eq('id', userId).single();
  if (!profile) return NextResponse.json({ error: 'User not found' }, { status: 404 });

  await service.from('profiles').update({
    tier: 'realtor',
    approved_at: new Date().toISOString(),
    approved_by: `admin:${admin.email}`,
  }).eq('id', userId);

  await service.from('tier_change_log').insert({
    user_id: userId, from_tier: profile.tier, to_tier: 'realtor', reason: `admin-approve:${admin.email}`,
  });

  // Confirmation email
  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    await resend.emails.send({
      from: 'DeveloperCertified <noreply@updates.tampabaymarketreport.com>',
      to: [profile.email],
      subject: 'You\'re verified — full Realtor access unlocked',
      html: `<p>Welcome to the verified Realtor tier on DeveloperCertified.com. You now have access to the broker group chat, full realtor resources, and document downloads.</p>`,
    });
  } catch (e) {
    console.error('Email error:', e);
  }

  return NextResponse.json({ success: true });
}
```

**Step 3: Change-tier route**

```ts
// src/app/api/admin/change-tier/route.ts
import { NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/supabase-server';
import { getSupabase } from '@/lib/supabase';

const VALID_TIERS = ['reader', 'pending-realtor', 'realtor', 'sales-agent'];

export async function POST(request: Request) {
  const admin = await requireAdmin();
  if (!admin) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

  const { userId, tier } = await request.json() as { userId: string; tier: string };
  if (!VALID_TIERS.includes(tier)) {
    return NextResponse.json({ error: 'Invalid tier' }, { status: 400 });
  }

  const service = getSupabase();
  const { data: profile } = await service.from('profiles').select('tier').eq('id', userId).single();
  if (!profile) return NextResponse.json({ error: 'User not found' }, { status: 404 });

  await service.from('profiles').update({ tier }).eq('id', userId);
  await service.from('tier_change_log').insert({
    user_id: userId, from_tier: profile.tier, to_tier: tier, reason: `admin-manual:${admin.email}`,
  });

  return NextResponse.json({ success: true });
}
```

**Step 4: Build + commit**

```bash
npm run build 2>&1 | tail -3
git add src/lib/supabase-server.ts src/app/api/admin/
git commit -m "feat: admin API endpoints (approve-realtor, change-tier)

Shared requireAdmin() helper checks session + ADMIN_EMAIL match.
Approve sends a confirmation email via Resend. All tier changes log
to tier_change_log.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

## Task 13: Auth-aware /brokers/[code] redemption

**Files:**
- Modify: `src/app/(marketing)/brokers/[code]/page.tsx`
- Modify: `src/data/brokerCodes.ts` (add `tier` field, optional `expiresAt`, `maxRedemptions`)
- Create: `src/app/api/brokers/redeem/route.ts`

**Step 1: Update brokerCodes.ts schema**

```ts
// src/data/brokerCodes.ts
export interface BrokerAccess {
  code: string;
  name: string;
  firm: string;
  role: 'sales-exec' | 'developer' | 'broker';
  developmentSlug: string;
  tier: 'realtor' | 'sales-agent';   // NEW
  email?: string;
  phone?: string;
  expiresAt?: string;
  maxRedemptions?: number;
}

export const brokerCodes: Record<string, BrokerAccess> = {
  // Brian: add real codes here. Each code redeems once per user but
  // can be reused across users.
};

export function getBrokerByCode(code: string): BrokerAccess | null {
  const access = brokerCodes[code];
  if (!access) return null;
  if (access.expiresAt && new Date(access.expiresAt) < new Date()) return null;
  return access;
}
```

**Step 2: Redemption route handler**

```ts
// src/app/api/brokers/redeem/route.ts
import { NextResponse } from 'next/server';
import { getSupabaseServer } from '@/lib/supabase-server';
import { getSupabase } from '@/lib/supabase';
import { getBrokerByCode } from '@/data/brokerCodes';

export async function POST(request: Request) {
  const supabase = getSupabaseServer();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });

  const { code } = await request.json() as { code: string };
  const access = getBrokerByCode(code);
  if (!access) return NextResponse.json({ error: 'Invalid or expired code' }, { status: 400 });

  const service = getSupabase();
  const { data: profile } = await service.from('profiles').select('tier').eq('id', user.id).single();

  await service.from('profiles').update({
    tier: access.tier,
    sales_agent_code: code,
    sales_agent_dev_slug: access.developmentSlug,
    approved_at: new Date().toISOString(),
    approved_by: 'broker-code-redeemed',
  }).eq('id', user.id);

  await service.from('tier_change_log').insert({
    user_id: user.id, from_tier: profile?.tier ?? null, to_tier: access.tier,
    reason: `broker-code:${code}`,
  });

  return NextResponse.json({ success: true });
}
```

**Step 3: Update /brokers/[code]/page.tsx to redirect to signup if not logged in**

In the existing page, add at the top:

```tsx
const supabase = getSupabaseServer();
const { data: { user } } = await supabase.auth.getUser();
if (!user) {
  redirect(`/signup?next=/brokers/${params.code}`);
}
// On render, fire the redemption client-side via useEffect calling /api/brokers/redeem
```

(The existing localStorage tier-unlock in `BrokerUpdateForm.tsx` should be removed — replaced by the API call.)

**Step 4: Build + commit**

```bash
npm run build 2>&1 | tail -3
git add src/data/brokerCodes.ts src/app/\(marketing\)/brokers/ src/app/api/brokers/
git commit -m "feat: /brokers/[code] auth-aware redemption flow

Visiting /brokers/[code] without a session now redirects to /signup
with next=/brokers/[code]. Once logged in, a server-side API call
upgrades the user's tier to the code's mapped target (realtor or
sales-agent) and records the dev slug.

brokerCodes.ts gains tier (per-code), optional expiresAt, optional
maxRedemptions. localStorage-based tier unlock removed.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

## Task 14: Branded auth emails via Resend SMTP

**Files:**
- None (configured in Supabase dashboard, not code)
- Modify: `docs/deploy.md` to capture the SMTP setup

**Step 1: In Supabase Dashboard → Authentication → Settings → SMTP Settings:**

```
Enable Custom SMTP:  ON
Sender email:        noreply@updates.tampabaymarketreport.com  (or @developercertified.com once verified)
Sender name:         DeveloperCertified
Host:                smtp.resend.com
Port:                587
Username:            resend
Password:            <RESEND_API_KEY value>
```

**Step 2: Customize each email template** (Authentication → Email Templates):

Replace each template's HTML with the branded version. Three templates to update:
- Confirm signup
- Magic link
- Reset password

Template HTML (apply same shell to all three, vary the message + CTA):

```html
<div style="background: #1a1a2e; padding: 40px 20px; font-family: -apple-system, sans-serif;">
  <div style="max-width: 480px; margin: 0 auto; background: #faf8f5; padding: 32px; border-radius: 12px;">
    <h1 style="font-family: 'Playfair Display', serif; color: #1a1a2e; margin: 0 0 16px;">DeveloperCertified</h1>
    <p style="color: #1a1a2e; font-size: 16px; line-height: 1.6;">
      <!-- Confirm: --> Click below to verify your email and finish creating your account.
      <!-- Magic: --> Click below to sign in. Link expires in 1 hour.
      <!-- Reset: --> Click below to set a new password.
    </p>
    <a href="{{ .ConfirmationURL }}" style="display: inline-block; padding: 12px 24px; background: #d4a853; color: #1a1a2e; text-decoration: none; border-radius: 6px; font-weight: 600; margin: 16px 0;">
      <!-- Verify email → / Sign in → / Reset password → -->
    </a>
    <p style="color: #666; font-size: 12px; margin-top: 24px;">Tampa Bay new construction market intelligence. No spin. No marketing fluff.</p>
  </div>
</div>
```

**Step 3: Test by signing up with a new email** — confirm the verification email arrives in your inbox with the branded template.

**Step 4: Document in deploy.md + commit**

```bash
# Edit docs/deploy.md to add a "Supabase Auth SMTP" section
git add docs/deploy.md
git commit -m "docs: Supabase Auth SMTP via Resend setup

Documents the Supabase dashboard → Authentication → SMTP Settings
configuration to route auth emails through Resend with branded
templates. Three templates updated (confirm, magic-link, reset).

No code changes — configuration lives in the Supabase dashboard.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

## Task 15: Strict-mode cutover

**Files:**
- Modify: `src/lib/audience.tsx` (require auth — remove localStorage fallback under strict mode)
- Modify: top nav / header component (remove tier picker; replace with Sign in/Sign up CTA)

**Step 1: Update audience.tsx to honor `NEXT_PUBLIC_AUTH_ENFORCE`**

The existing fallback to localStorage already checks `NEXT_PUBLIC_AUTH_ENFORCE !== 'strict'`. Just confirm the env var is wired and the localStorage fallback path is gone when strict.

**Step 2: Find and update the tier picker**

```bash
grep -rln "setTier\|setAudience" src/
```

Locate the dropdown component (likely in a layout file or header). Replace with:

```tsx
{user ? (
  <Link href="/profile" className="text-ivory-200 text-sm">
    {user.fullName ?? user.email}
  </Link>
) : (
  <div className="flex gap-3">
    <Link href="/signin" className="text-ivory-200 text-sm">Sign in</Link>
    <Link href="/signup" className="px-3 py-1.5 bg-gold-500 text-charcoal-900 rounded text-sm font-semibold">Sign up</Link>
  </div>
)}
```

**Step 3: Set `NEXT_PUBLIC_AUTH_ENFORCE=strict` in Vercel** (production environment only — keep `shadow` in preview/dev).

**Step 4: Verify all key pages still render correctly**

Browser walkthrough:
- Anonymous: homepage, /developments, /market-report, /about all show without sign-in. /brokers shows TierGate upgrade card. /admin redirects to /signin.
- Reader (signed in, no brokerage email): same as anonymous BUT can see "Request Realtor" button on /profile.
- Realtor: /brokers full content, /realtor-resources unlocked details.
- Sales-agent: /brokers/[code] flow + dev-specific portal.

**Step 5: Commit**

```bash
git add src/lib/audience.tsx src/components/layout/
git commit -m "feat(launch): cutover to strict auth — anonymous = reader only

Enables NEXT_PUBLIC_AUTH_ENFORCE='strict' in production:
- Anonymous users cannot self-select higher tiers via localStorage
- Tier picker removed from header; replaced with Sign in / Sign up CTA
- Logged-in users see name + link to /profile in header instead

Set NEXT_PUBLIC_AUTH_ENFORCE='strict' in Vercel production env vars
to activate. Set 'shadow' in preview/dev for friction-free testing.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

## Task 16: Final docs

**Files:**
- Modify: `docs/deploy.md` (auth env vars + Supabase setup)
- Create: `docs/auth.md` (developer reference)

**Step 1: Update deploy.md** — add to the env-var table:

```
| NEXT_PUBLIC_SUPABASE_ANON_KEY | (from Supabase API settings) | Browser-safe key for client auth |
| NEXT_PUBLIC_AUTH_ENFORCE      | 'strict' (prod) / 'shadow' (preview, dev) | Toggle migration mode |
| ADMIN_EMAIL                   | brian@tampabaymarketreport.com | Admin route + approval emails |
```

**Step 2: Create docs/auth.md** with overview of:
- Tier model (Reader / Realtor / Sales Agent)
- How auto-tier resolution works (DB trigger)
- How to manually approve a realtor (/admin/users)
- How to add a new brokerage / dev domain (Supabase SQL)
- How `/brokers/[code]` redemption works
- Adding a new broker code

**Step 3: Commit**

```bash
git add docs/deploy.md docs/auth.md
git commit -m "docs: auth documentation + deploy.md updates

Captures the full auth system for future reference: tier model,
auto-tier resolution, manual approval flow, broker code redemption,
domain whitelist management.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

## Out of scope

- OAuth providers (Google, Apple)
- Multi-factor authentication
- Organizations / team accounts
- Saved comparisons / personalized dashboard
- Newsletter / email-preferences UI
- Password complexity beyond 8-char minimum
- Account deletion UI (Supabase has it; add a button later)
- Audit log viewer / export

## Rollback

| Scope | Action |
|---|---|
| Single commit | `git revert <sha>` |
| Whole auth migration (after phase 7) | Set `NEXT_PUBLIC_AUTH_ENFORCE=shadow` in Vercel — instant revert to old self-selected tier |
| Schema | Drop tables in this order: `tier_change_log`, `profiles`, `approved_brokerage_domains`, `approved_development_domains` (forward-compatible — won't affect `leads` or `broker_updates`) |
