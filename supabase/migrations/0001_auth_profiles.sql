-- ─────────────────────────────────────────────────────────────────
-- Auth + Tier Gating: profiles, whitelists, audit log
-- See: docs/plans/2026-04-27-auth-tiers-design.md
-- ─────────────────────────────────────────────────────────────────

-- Custom user data linked to auth.users
create table if not exists public.profiles (
  id              uuid primary key references auth.users on delete cascade,
  -- Snapshot at signup; not synced if user changes email in Supabase Auth.
  -- For canonical email always join to auth.users. (Worth revisiting if
  -- email-change UX is added.)
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
  user_id     uuid references auth.users on delete set null,
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
create index if not exists idx_tier_change_log_changed_at on public.tier_change_log (changed_at desc);
