'use client';

import { useState } from 'react';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import { getSupabaseBrowser } from '@/lib/supabase-browser';

type Mode = 'password' | 'magic';

export default function SigninForm({ next }: { next: string }) {
  const [mode, setMode] = useState<Mode>('password');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'sent' | 'error'>('idle');
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('submitting');
    setError('');
    const supabase = getSupabaseBrowser();

    if (mode === 'password') {
      const { error: err } = await supabase.auth.signInWithPassword({ email, password });
      if (err) {
        setStatus('error');
        setError(err.message);
        return;
      }
      // Browser auth listener will redirect on session change
      window.location.href = next;
    } else {
      const { error: err } = await supabase.auth.signInWithOtp({
        email,
        options: { emailRedirectTo: `${window.location.origin}/api/auth/callback?next=${encodeURIComponent(next)}` },
      });
      if (err) {
        setStatus('error');
        setError(err.message);
        return;
      }
      setStatus('sent');
    }
  }

  if (status === 'sent') {
    return (
      <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/5 p-6">
        <p className="text-emerald-300 mb-2">Magic link sent</p>
        <p className="text-sm text-ivory-400/70">Check <strong>{email}</strong> for a link to sign in.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="w-full rounded-lg border border-ivory-100/10 bg-charcoal-900 px-4 py-3 text-ivory-100 placeholder-ivory-400/50 focus:border-gold-500/60 focus:outline-none"
      />
      {mode === 'password' && (
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full rounded-lg border border-ivory-100/10 bg-charcoal-900 px-4 py-3 text-ivory-100 placeholder-ivory-400/50 focus:border-gold-500/60 focus:outline-none"
        />
      )}
      {error && (
        <div className="rounded-lg border border-red-500/30 bg-red-500/5 p-3 text-sm text-red-300">{error}</div>
      )}
      <Button type="submit" variant="primary" size="md" disabled={status === 'submitting'}>
        {status === 'submitting' ? 'Signing in…' : (mode === 'password' ? 'Sign in' : 'Send magic link')}
      </Button>
      <button
        type="button"
        onClick={() => { setMode(mode === 'password' ? 'magic' : 'password'); setStatus('idle'); setError(''); }}
        className="block mx-auto text-sm text-gold-400 underline underline-offset-4"
      >
        {mode === 'password' ? 'Use magic link instead' : 'Use password instead'}
      </button>
      <p className="text-sm text-ivory-400/60 text-center">
        New here? <Link href="/signup" className="text-gold-400 underline underline-offset-4">Create account</Link>
      </p>
    </form>
  );
}
