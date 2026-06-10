import { createClient, SupabaseClient } from '@supabase/supabase-js';

/**
 * SERVICE-ROLE Supabase client. Bypasses RLS. Server-only.
 *
 * For user-aware queries (RLS enforced), use:
 *   - server components / route handlers: getSupabaseServer() in supabase-server.ts
 *   - browser components:                  getSupabaseBrowser() in supabase-browser.ts
 *
 * Use THIS client only for:
 *   - admin operations (approve/reject realtor, change tier)
 *   - inserting public form submissions (lead capture, broker updates)
 *   - any DB write that should bypass user-level RLS
 */
let _supabase: SupabaseClient | null = null;

export function getSupabase(): SupabaseClient {
  if (!_supabase) {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!url || !key) {
      throw new Error(
        'Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY env vars',
      );
    }
    _supabase = createClient(url, key);
  }
  return _supabase;
}
