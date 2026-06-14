import { NextResponse } from 'next/server';
import { getSupabaseServer } from '@/lib/supabase-server';
import { getSupabase as getServiceSupabase } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

function csvCell(v: unknown): string {
  const s = v == null ? '' : String(v);
  return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
}

// GET /api/admin/leads-export → CSV of all leads (admin only)
export async function GET() {
  const supabase = getSupabaseServer();
  const { data: { user } } = await supabase.auth.getUser();
  const adminEmail = process.env.ADMIN_EMAIL ?? 'Brian@CorcoranDwellings.com';
  if (!user || (user.email ?? '').toLowerCase() !== adminEmail.toLowerCase()) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  const service = getServiceSupabase();
  const { data } = await service
    .from('leads')
    .select('created_at, email, name, phone, source, development, interest, message')
    .order('created_at', { ascending: false })
    .limit(5000);

  const headers = ['created_at', 'email', 'name', 'phone', 'source', 'development', 'interest', 'message'];
  const rows = (data ?? []).map((l) =>
    headers.map((h) => csvCell((l as Record<string, unknown>)[h])).join(','),
  );
  const csv = [headers.join(','), ...rows].join('\n');

  return new NextResponse(csv, {
    status: 200,
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': `attachment; filename="leads-${new Date().toISOString().slice(0, 10)}.csv"`,
    },
  });
}
