// src/lib/supabase-server.ts
//
// Server-side Supabase client for App Router server components,
// route handlers, and middleware. Reads/writes the auth cookie.
//
// IMPORTANT: This client uses the user's JWT (RLS enforced).
// For service-role operations (e.g., admin actions), use the
// existing getSupabase() in src/lib/supabase.ts instead.

import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { cookies } from 'next/headers';

export function getSupabaseServer() {
  const cookieStore = cookies();
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value, ...options });
          } catch {
            // Called from a Server Component; cookies cannot be set there.
            // Silently ignore — middleware refreshes the session instead.
          }
        },
        remove(name: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value: '', ...options });
          } catch {
            // see comment above
          }
        },
      },
    }
  );
}
