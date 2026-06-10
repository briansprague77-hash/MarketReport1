'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Bell, BellRing } from 'lucide-react';
import { getSupabaseBrowser } from '@/lib/supabase-browser';

/**
 * Account-gated "Track this building" control (the retention loop).
 * - Signed out → prompts sign-in (returns here).
 * - Signed in → toggles a watch via /api/watch. Watched buildings trigger
 *   price/listing-change email alerts from the daily cron.
 */
export default function WatchBuildingButton({
  slug,
  name,
}: {
  slug: string;
  name: string;
}) {
  const [authed, setAuthed] = useState<boolean | null>(null);
  const [watching, setWatching] = useState(false);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    let active = true;
    (async () => {
      const { data } = await getSupabaseBrowser().auth.getUser();
      if (!active) return;
      const isAuthed = !!data.user;
      setAuthed(isAuthed);
      if (isAuthed) {
        try {
          const res = await fetch('/api/watch');
          const json = await res.json();
          setWatching((json.watched ?? []).some((w: { dev_slug: string }) => w.dev_slug === slug));
        } catch {
          /* ignore */
        }
      }
    })();
    return () => {
      active = false;
    };
  }, [slug]);

  async function toggle() {
    setBusy(true);
    try {
      const res = await fetch('/api/watch', {
        method: watching ? 'DELETE' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ devSlug: slug, devName: name }),
      });
      if (res.ok) setWatching((w) => !w);
    } finally {
      setBusy(false);
    }
  }

  if (authed === null) return null; // resolving

  if (!authed) {
    return (
      <Link
        href={`/signin?next=/developments/${slug}`}
        className="inline-flex items-center gap-2 rounded-lg border border-gold-500/40 bg-gold-500/10 px-4 py-2 text-sm font-body font-semibold text-gold-300 hover:bg-gold-500/20 transition-colors"
      >
        <Bell className="h-4 w-4" />
        Track this building — get price alerts
      </Link>
    );
  }

  return (
    <button
      onClick={toggle}
      disabled={busy}
      className={`inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-body font-semibold transition-colors disabled:opacity-60 ${
        watching
          ? 'border border-emerald-500/40 bg-emerald-500/10 text-emerald-300'
          : 'border border-gold-500/40 bg-gold-500/10 text-gold-300 hover:bg-gold-500/20'
      }`}
    >
      {watching ? <BellRing className="h-4 w-4" /> : <Bell className="h-4 w-4" />}
      {watching ? 'Tracking — alerts on' : 'Track this building'}
    </button>
  );
}
