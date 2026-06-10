import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { trackedDevelopments } from '@/data/developments';
import { getSupabase as getServiceSupabase } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

/**
 * Scheduled alerts job (Vercel Cron).
 *
 * Diffs the current development data (trackedDevelopments) against the last
 * snapshot stored in Supabase. For any development whose PSF, status, or price
 * changed, it emails every user watching that building, then updates the
 * snapshot. First run just seeds snapshots (no diffs → no emails).
 *
 * Secured by CRON_SECRET — Vercel automatically sends
 * `Authorization: Bearer $CRON_SECRET` to cron requests when the env var is set.
 */
export async function GET(request: Request) {
  const secret = process.env.CRON_SECRET;
  if (secret) {
    const auth = request.headers.get('authorization');
    if (auth !== `Bearer ${secret}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
  }

  const service = getServiceSupabase();

  // 1. Load previous snapshots
  const { data: snaps } = await service
    .from('development_snapshots')
    .select('dev_slug, avg_psf, status, price');
  const prev = new Map((snaps ?? []).map((s) => [s.dev_slug, s]));

  // 2. Compute changes vs current data
  type Change = { slug: string; name: string; lines: string[] };
  const changes: Change[] = [];
  const upserts: { dev_slug: string; avg_psf: number | null; status: string; price: string }[] = [];

  for (const d of trackedDevelopments) {
    const cur = { avg_psf: d.avgPsf ?? null, status: d.status, price: d.price ?? '' };
    upserts.push({ dev_slug: d.slug, ...cur });
    const p = prev.get(d.slug);
    if (!p) continue; // new/seed — no alert
    const lines: string[] = [];
    if (p.avg_psf != null && cur.avg_psf != null && p.avg_psf !== cur.avg_psf) {
      const dir = cur.avg_psf > p.avg_psf ? '▲' : '▼';
      lines.push(`PSF ${dir} $${p.avg_psf.toLocaleString()} → $${cur.avg_psf.toLocaleString()}`);
    }
    if (p.status !== cur.status) lines.push(`Status: ${p.status} → ${cur.status}`);
    if ((p.price ?? '') !== cur.price) lines.push(`Pricing: ${p.price || '—'} → ${cur.price || '—'}`);
    if (lines.length) changes.push({ slug: d.slug, name: d.name, lines });
  }

  // 3. Always refresh snapshots
  await service.from('development_snapshots').upsert(
    upserts.map((u) => ({ ...u, updated_at: new Date().toISOString() })),
  );

  if (changes.length === 0) {
    return NextResponse.json({ ok: true, changes: 0, message: prev.size === 0 ? 'seeded' : 'no changes' });
  }

  // 4. For each change, email watchers
  const resend = new Resend(process.env.RESEND_API_KEY);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://developercertified.com';
  let emailsSent = 0;

  for (const ch of changes) {
    const { data: watchers } = await service
      .from('watched_developments')
      .select('user_id')
      .eq('dev_slug', ch.slug);
    if (!watchers || watchers.length === 0) continue;

    const ids = watchers.map((w) => w.user_id);
    const { data: profiles } = await service
      .from('profiles')
      .select('email')
      .in('id', ids);
    const emails = (profiles ?? []).map((p) => p.email).filter(Boolean) as string[];
    if (emails.length === 0) continue;

    try {
      await resend.emails.send({
        from: 'Tampa Bay Market Report <alerts@updates.tampabaymarketreport.com>',
        to: emails,
        subject: `Market update: ${ch.name}`,
        html: `
          <div style="font-family:-apple-system,sans-serif;max-width:560px;margin:0 auto;">
            <h2 style="color:#1a1a2e;margin-bottom:4px;">${ch.name} — what changed</h2>
            <ul style="font-size:14px;color:#2d2d3a;line-height:1.7;">
              ${ch.lines.map((l) => `<li>${l}</li>`).join('')}
            </ul>
            <p style="margin-top:16px;">
              <a href="${siteUrl}/developments/${ch.slug}"
                 style="color:#d4a853;font-weight:600;">See the full report →</a>
            </p>
            <hr style="border:none;border-top:1px solid #e5e5e5;margin:20px 0;" />
            <p style="font-size:12px;color:#999;">
              You're receiving this because you're tracking ${ch.name} on the Tampa Bay Market Report.
              Sourced from Stellar MLS. Manage alerts in your profile.
            </p>
          </div>`,
      });
      emailsSent += emails.length;
    } catch (e) {
      console.error('Alert email error:', e);
    }
  }

  return NextResponse.json({ ok: true, changes: changes.length, emailsSent });
}
