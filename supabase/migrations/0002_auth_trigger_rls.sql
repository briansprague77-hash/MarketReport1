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
  -- Phone-only signups have no email — skip profile creation here.
  -- (Future: if phone auth is enabled, add a separate flow that creates
  -- profile from new.phone instead.)
  if new.email is null then
    return new;
  end if;

  user_email_domain := lower(split_part(new.email, '@', 2));

  -- Check development domain first. Sales-agent tier (granted by dev
  -- domain match) outranks realtor tier (granted by brokerage domain).
  -- The two whitelist tables are not constrained against overlap; if
  -- a domain ever appears in both, the dev-domain assignment wins.
  -- Today's seeded data has no overlap. If overlap is added later,
  -- this comment documents the intentional precedence.
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
  with check (
    auth.uid() = id
    -- Tier cannot be changed by users directly. The auto-tier trigger
    -- (handle_new_user) sets it on signup; admin actions go through
    -- service-role API routes. Subquery returns the current tier (visible
    -- via SELECT policy), so any user attempt to change tier fails.
    and tier = (select tier from public.profiles where id = auth.uid())
  );

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
