import { redirect } from 'next/navigation';
import { getSupabaseServer } from '@/lib/supabase-server';
import { getSupabase as getServiceSupabase } from '@/lib/supabase';

export const metadata = { title: 'Leads · Admin' };
export const dynamic = 'force-dynamic';

interface LeadRow {
  email: string;
  name: string | null;
  phone: string | null;
  source: string | null;
  development: string | null;
  interest: string | null;
  message: string | null;
  created_at: string;
}

// Pull the audience role (buyer / realtor / sales-agent) out of the tagged source/interest
function roleOf(lead: LeadRow): string {
  const hay = `${lead.source ?? ''} ${lead.interest ?? ''}`.toLowerCase();
  if (hay.includes('realtor')) return 'Realtor';
  if (hay.includes('sales-agent') || hay.includes('developer')) return 'Developer Sales';
  if (hay.includes('consumer') || hay.includes('buyer')) return 'Buyer';
  return '—';
}

export default async function AdminLeadsPage() {
  // ── Gate: signed-in admin only ──
  const supabase = getSupabaseServer();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/signin?next=/admin/leads');
  const adminEmail = process.env.ADMIN_EMAIL ?? 'brian@tampabaymarketreport.com';
  if ((user.email ?? '').toLowerCase() !== adminEmail.toLowerCase()) {
    redirect('/'); // not the admin
  }

  // ── Read leads (service role — bypasses RLS) ──
  const service = getServiceSupabase();
  const { data } = await service
    .from('leads')
    .select('email, name, phone, source, development, interest, message, created_at')
    .order('created_at', { ascending: false })
    .limit(500);
  const leads = (data ?? []) as LeadRow[];

  // ── Aggregates ──
  const byRole: Record<string, number> = {};
  const byBuilding: Record<string, number> = {};
  for (const l of leads) {
    const r = roleOf(l);
    byRole[r] = (byRole[r] ?? 0) + 1;
    if (l.development) byBuilding[l.development] = (byBuilding[l.development] ?? 0) + 1;
  }
  const topBuildings = Object.entries(byBuilding).sort((a, b) => b[1] - a[1]).slice(0, 8);

  return (
    <main className="min-h-screen bg-charcoal-950 text-ivory-100 px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-6xl mx-auto">
        <h1 className="font-heading text-3xl font-bold text-ivory-50 mb-1">Leads</h1>
        <p className="text-sm text-charcoal-400 mb-8">{leads.length} most recent captured leads.</p>

        {/* Summary */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {['Buyer', 'Realtor', 'Developer Sales', '—'].map((r) => (
            <div key={r} className="rounded-xl border border-charcoal-800 bg-charcoal-900/60 p-4">
              <div className="text-2xl font-heading font-bold text-gold-400">{byRole[r] ?? 0}</div>
              <div className="text-xs text-charcoal-400 mt-1">{r === '—' ? 'Unknown role' : r}</div>
            </div>
          ))}
        </div>

        {topBuildings.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xs font-semibold uppercase tracking-widest text-gold-500 mb-3">Top buildings by lead volume</h2>
            <div className="flex flex-wrap gap-2">
              {topBuildings.map(([b, n]) => (
                <span key={b} className="rounded-full border border-charcoal-700 bg-charcoal-900/60 px-3 py-1 text-xs">
                  {b} <span className="text-gold-400 font-semibold">{n}</span>
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Table */}
        <div className="overflow-x-auto rounded-xl border border-charcoal-800">
          <table className="w-full text-sm">
            <thead className="bg-charcoal-900 text-charcoal-400">
              <tr>
                {['Date', 'Role', 'Email', 'Name', 'Phone', 'Building', 'Source'].map((h) => (
                  <th key={h} className="px-3 py-2 text-left font-medium whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {leads.map((l, i) => (
                <tr key={i} className="border-t border-charcoal-800/70 hover:bg-charcoal-900/40">
                  <td className="px-3 py-2 whitespace-nowrap text-charcoal-400">
                    {new Date(l.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </td>
                  <td className="px-3 py-2 whitespace-nowrap">
                    <span className="rounded-full bg-gold-500/10 text-gold-300 px-2 py-0.5 text-xs">{roleOf(l)}</span>
                  </td>
                  <td className="px-3 py-2 whitespace-nowrap">
                    <a href={`mailto:${l.email}`} className="text-gold-400 hover:underline">{l.email}</a>
                  </td>
                  <td className="px-3 py-2 whitespace-nowrap">{l.name ?? '—'}</td>
                  <td className="px-3 py-2 whitespace-nowrap">{l.phone ?? '—'}</td>
                  <td className="px-3 py-2 whitespace-nowrap text-ivory-200">{l.development ?? '—'}</td>
                  <td className="px-3 py-2 whitespace-nowrap text-charcoal-400">{l.source ?? '—'}</td>
                </tr>
              ))}
              {leads.length === 0 && (
                <tr><td colSpan={7} className="px-3 py-8 text-center text-charcoal-500">No leads yet.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
