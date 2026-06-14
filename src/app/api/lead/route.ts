import { NextRequest, NextResponse } from 'next/server';
import { getSupabase } from '@/lib/supabase';
import { Resend } from 'resend';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, name, phone, source, development, interest, message } = body;

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    const timestamp = new Date().toISOString();

    // ── 0. Optional enrichment (Apollo) — title + company from email ─────────
    let enriched = '';
    if (process.env.APOLLO_API_KEY) {
      try {
        const r = await fetch('https://api.apollo.io/api/v1/people/match', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache',
            'X-Api-Key': process.env.APOLLO_API_KEY,
          },
          body: JSON.stringify({ email }),
        });
        if (r.ok) {
          const j = await r.json();
          const person = j?.person;
          const title = person?.title || '';
          const org = person?.organization?.name || '';
          if (title || org) enriched = `[Apollo: ${[title, org].filter(Boolean).join(' @ ')}]`;
        }
      } catch {
        /* enrichment is best-effort — never block the lead */
      }
    }
    const storedMessage = [message, enriched].filter(Boolean).join(' ') || null;

    // ── 1. Store lead in Supabase ────────────────────────────────────────────
    const resend = new Resend(process.env.RESEND_API_KEY);
    const supabase = getSupabase();

    const { error: dbError } = await supabase.from('leads').insert({
      email,
      name: name || null,
      phone: phone || null,
      source: source || 'unknown',
      development: development || null,
      interest: interest || null,
      message: storedMessage,
      created_at: timestamp,
    });

    if (dbError) {
      console.error('Supabase insert error:', dbError);
      // Don't fail the request — still send notification and return success
    }

    // ── 2. Send email notification via Resend ────────────────────────────────
    try {
      await resend.emails.send({
        from: 'Tampa Bay Market Report <leads@updates.tampabaymarketreport.com>',
        to: [process.env.ADMIN_EMAIL ?? 'Brian@CorcoranDwellings.com'],
        subject: `New Lead: ${name || email} — ${source || 'Website'}`,
        html: `
          <div style="font-family: -apple-system, sans-serif; max-width: 560px; margin: 0 auto;">
            <h2 style="color: #1F1F24; margin-bottom: 4px;">New Lead Captured</h2>
            <p style="color: #666; font-size: 14px; margin-top: 0;">
              ${new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
            <hr style="border: none; border-top: 1px solid #e5e5e5; margin: 20px 0;" />
            <table style="width: 100%; font-size: 14px; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; color: #999; width: 120px;">Name</td>
                <td style="padding: 8px 0; color: #1F1F24; font-weight: 500;">${name || '—'}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #999;">Email</td>
                <td style="padding: 8px 0;"><a href="mailto:${email}" style="color: #C9A84C;">${email}</a></td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #999;">Phone</td>
                <td style="padding: 8px 0; color: #1F1F24;">${phone || '—'}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #999;">Source</td>
                <td style="padding: 8px 0; color: #1F1F24;">${source || '—'}</td>
              </tr>
              ${development ? `<tr><td style="padding: 8px 0; color: #999;">Development</td><td style="padding: 8px 0; color: #1F1F24;">${development}</td></tr>` : ''}
              ${interest ? `<tr><td style="padding: 8px 0; color: #999;">Interest</td><td style="padding: 8px 0; color: #1F1F24;">${interest}</td></tr>` : ''}
              ${enriched ? `<tr><td style="padding: 8px 0; color: #999;">Enriched</td><td style="padding: 8px 0; color: #1F1F24;">${enriched.replace(/^\[Apollo: |\]$/g, '')}</td></tr>` : ''}
            </table>
            ${message ? `<hr style="border: none; border-top: 1px solid #e5e5e5; margin: 20px 0;" /><p style="font-size: 14px; color: #1F1F24; line-height: 1.6;">${message}</p>` : ''}
            <hr style="border: none; border-top: 1px solid #e5e5e5; margin: 20px 0;" />
            <p style="font-size: 12px; color: #999;">
              Tampa Bay Market Report — Lead Notification
            </p>
          </div>
        `,
      });
    } catch (emailErr) {
      console.error('Resend email error:', emailErr);
      // Don't fail the request if email fails — lead is already stored
    }

    return NextResponse.json(
      { success: true, message: 'Thank you. We will be in touch.' },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 }
    );
  }
}
