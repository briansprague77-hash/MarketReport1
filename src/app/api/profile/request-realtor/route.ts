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
