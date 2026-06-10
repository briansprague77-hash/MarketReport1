import { NextResponse } from 'next/server';
import { getSupabaseServer } from '@/lib/supabase-server';
import { getSupabase as getServiceSupabase } from '@/lib/supabase';

// GET — list the signed-in user's watched developments
export async function GET() {
  const supabase = getSupabaseServer();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ watched: [] }, { status: 200 });

  const service = getServiceSupabase();
  const { data } = await service
    .from('watched_developments')
    .select('dev_slug, dev_name, created_at')
    .eq('user_id', user.id);
  return NextResponse.json({ watched: data ?? [] });
}

// POST { devSlug, devName } — start watching a development (requires login)
export async function POST(request: Request) {
  const supabase = getSupabaseServer();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });

  const { devSlug, devName } = (await request.json()) as { devSlug?: string; devName?: string };
  if (!devSlug) return NextResponse.json({ error: 'devSlug required' }, { status: 400 });

  const service = getServiceSupabase();
  const { error } = await service
    .from('watched_developments')
    .upsert({ user_id: user.id, dev_slug: devSlug, dev_name: devName ?? null });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true, watching: true });
}

// DELETE { devSlug } — stop watching
export async function DELETE(request: Request) {
  const supabase = getSupabaseServer();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });

  const { devSlug } = (await request.json()) as { devSlug?: string };
  if (!devSlug) return NextResponse.json({ error: 'devSlug required' }, { status: 400 });

  const service = getServiceSupabase();
  await service
    .from('watched_developments')
    .delete()
    .eq('user_id', user.id)
    .eq('dev_slug', devSlug);
  return NextResponse.json({ success: true, watching: false });
}
