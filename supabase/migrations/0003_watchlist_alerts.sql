-- ─────────────────────────────────────────────────────────────────
-- Retention loop: watched developments + price/listing alerts
-- ─────────────────────────────────────────────────────────────────

-- Buildings a signed-in user is tracking (for alerts)
create table if not exists public.watched_developments (
  user_id    uuid not null references auth.users on delete cascade,
  dev_slug   text not null,
  dev_name   text,
  created_at timestamptz default now(),
  primary key (user_id, dev_slug)
);

alter table public.watched_developments enable row level security;

-- Users manage only their own watchlist
create policy "watch_select_own" on public.watched_developments
  for select using (auth.uid() = user_id);
create policy "watch_insert_own" on public.watched_developments
  for insert with check (auth.uid() = user_id);
create policy "watch_delete_own" on public.watched_developments
  for delete using (auth.uid() = user_id);

-- Last-known metrics per development — the cron diffs against this to detect
-- price / status / inventory changes. Service-role only (RLS on, no policies).
create table if not exists public.development_snapshots (
  dev_slug    text primary key,
  avg_psf     integer,
  status      text,
  price       text,
  updated_at  timestamptz default now()
);

alter table public.development_snapshots enable row level security;
-- (no policies → only the service-role key can read/write)
