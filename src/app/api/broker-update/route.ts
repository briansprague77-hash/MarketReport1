import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { getSupabase } from '@/lib/supabase';
import { getBrokerByCode } from '@/data/brokerCodes';

const ALLOWED_TYPES = ['milestone', 'price', 'incentive', 'news'] as const;
type UpdateType = (typeof ALLOWED_TYPES)[number];

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { code, type, headline, details, eventDate, devSlug, email, sourceContext } = body as {
      code?: string;
      type?: string;
      headline?: string;
      details?: string;
      eventDate?: string;
      devSlug?: string;
      email?: string;
      sourceContext?: string;
    };

    // ── Validate required fields ──────────────────────────────────────────
    if (!headline || !type) {
      return NextResponse.json(
        { error: 'type and headline are required' },
        { status: 400 }
      );
    }
    if (!ALLOWED_TYPES.includes(type as UpdateType)) {
      return NextResponse.json(
        { error: `type must be one of: ${ALLOWED_TYPES.join(', ')}` },
        { status: 400 }
      );
    }

    // ── Broker code is optional. If provided, must be valid. ──────────────
    const broker = code ? getBrokerByCode(code) : null;
    if (code && !broker) {
      return NextResponse.json(
        { error: 'Invalid broker code' },
        { status: 403 }
      );
    }

    // Anonymous submissions (no code) require an email so Brian can follow up
    if (!broker && !email) {
      return NextResponse.json(
        { error: 'email is required for non-broker submissions' },
        { status: 400 }
      );
    }

    const timestamp = new Date().toISOString();
    const resolvedEventDate = eventDate || timestamp.slice(0, 10);
    const resolvedDevSlug = broker?.developmentSlug ?? devSlug ?? null;

    // ── 1. Log to Supabase (graceful degradation) ─────────────────────────
    try {
      const supabase = getSupabase();
      const { error: dbError } = await supabase.from('broker_updates').insert({
        broker_code: broker?.code ?? null,
        broker_name: broker?.name ?? null,
        firm: broker?.firm ?? null,
        submitter_email: email ?? null,
        source_context: sourceContext ?? null,
        development_slug: resolvedDevSlug,
        update_type: type,
        headline,
        details: details || null,
        event_date: resolvedEventDate,
        created_at: timestamp,
      });
      if (dbError) {
        console.error('Supabase broker_updates insert error:', dbError);
      }
    } catch (dbErr) {
      // Supabase env not configured or table missing — continue
      console.error('Supabase broker_updates unavailable:', dbErr);
    }

    // ── 2. Email Brian for review ─────────────────────────────────────────
    try {
      const resend = new Resend(process.env.RESEND_API_KEY);
      const subjectPrefix = broker ? '[Broker Update]' : '[Correction]';
      const subjectSubject = resolvedDevSlug ?? 'general';
      await resend.emails.send({
        from: 'Tampa Bay Market Report <leads@updates.tampabaymarketreport.com>',
        to: [process.env.ADMIN_EMAIL ?? 'Brian@CorcoranDwellings.com'],
        subject: `${subjectPrefix} ${subjectSubject} — ${headline}`,
        html: `
          <div style="font-family: -apple-system, sans-serif; max-width: 560px; margin: 0 auto;">
            <h2 style="color: #1F1F24; margin-bottom: 4px;">
              ${broker ? 'New Broker Update — Awaiting Review' : 'Correction Submitted'}
            </h2>
            <p style="color: #666; font-size: 14px; margin-top: 0;">
              ${new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
            <hr style="border: none; border-top: 1px solid #e5e5e5; margin: 20px 0;" />
            <table style="width: 100%; font-size: 14px; border-collapse: collapse;">
              ${broker
                ? `
                <tr><td style="padding: 8px 0; color: #999; width: 140px;">Submitted by</td><td style="padding: 8px 0; color: #1F1F24; font-weight: 500;">${broker.name} (${broker.firm})</td></tr>
                <tr><td style="padding: 8px 0; color: #999;">Role</td><td style="padding: 8px 0; color: #1F1F24;">${broker.role}</td></tr>
                <tr><td style="padding: 8px 0; color: #999;">Code</td><td style="padding: 8px 0; color: #1F1F24;"><code>${broker.code}</code></td></tr>
                `
                : `
                <tr><td style="padding: 8px 0; color: #999; width: 140px;">Submitter</td><td style="padding: 8px 0; color: #1F1F24;"><a href="mailto:${email}" style="color: #C9A84C;">${email}</a></td></tr>
                `
              }
              <tr><td style="padding: 8px 0; color: #999;">Development</td><td style="padding: 8px 0; color: #1F1F24;">${resolvedDevSlug ?? '—'}</td></tr>
              <tr><td style="padding: 8px 0; color: #999;">Type</td><td style="padding: 8px 0; color: #1F1F24;">${type}</td></tr>
              <tr><td style="padding: 8px 0; color: #999;">Event date</td><td style="padding: 8px 0; color: #1F1F24;">${resolvedEventDate}</td></tr>
              <tr><td style="padding: 8px 0; color: #999;">Headline</td><td style="padding: 8px 0; color: #1F1F24; font-weight: 500;">${headline}</td></tr>
              ${sourceContext ? `<tr><td style="padding: 8px 0; color: #999;">Source</td><td style="padding: 8px 0; color: #1F1F24;">${sourceContext}</td></tr>` : ''}
            </table>
            ${details ? `<hr style="border: none; border-top: 1px solid #e5e5e5; margin: 20px 0;" /><p style="font-size: 14px; color: #1F1F24; line-height: 1.6;">${details}</p>` : ''}
            <hr style="border: none; border-top: 1px solid #e5e5e5; margin: 20px 0;" />
            <p style="font-size: 12px; color: #999;">
              ${broker
                ? 'To publish, paste into <code>src/data/editorialPins.ts</code> as a MarketEvent with <code>score: 9999</code>.'
                : 'Anonymous correction — verify and apply manually if valid.'
              }
            </p>
          </div>
        `,
      });
    } catch (emailErr) {
      console.error('Resend broker-update email error:', emailErr);
      // Non-fatal — submission was logged
    }

    return NextResponse.json(
      { success: true, message: broker ? 'Update submitted for review.' : 'Correction sent.' },
      { status: 200 }
    );
  } catch (err) {
    console.error('broker-update route error:', err);
    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 }
    );
  }
}
