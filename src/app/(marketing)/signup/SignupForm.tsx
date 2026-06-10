'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import { getSupabaseBrowser } from '@/lib/supabase-browser';

export default function SignupForm({ next }: { next?: string }) {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isRealtor, setIsRealtor] = useState(false);
  const [license, setLicense] = useState('');
  const [brokerage, setBrokerage] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'check-email' | 'error'>('idle');
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('submitting');
    setError('');
    const supabase = getSupabaseBrowser();
    const { error: authErr } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: name,
          self_declared_realtor: isRealtor,
          realtor_license: license || undefined,
          brokerage_name: brokerage || undefined,
        },
        emailRedirectTo: `${window.location.origin}/api/auth/callback?next=${encodeURIComponent(next ?? '/profile')}`,
      },
    });
    if (authErr) {
      setStatus('error');
      setError(authErr.message);
      return;
    }
    setStatus('check-email');
  }

  if (status === 'check-email') {
    return (
      <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/5 p-6">
        <p className="text-emerald-300 mb-2">Check your email</p>
        <p className="text-sm text-ivory-400/70">
          We sent a verification link to <strong>{email}</strong>. Click the link to finish creating your account.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        className="w-full rounded-lg border border-ivory-100/10 bg-charcoal-900 px-4 py-3 text-ivory-100 placeholder-ivory-400/50 focus:border-gold-500/60 focus:outline-none"
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="w-full rounded-lg border border-ivory-100/10 bg-charcoal-900 px-4 py-3 text-ivory-100 placeholder-ivory-400/50 focus:border-gold-500/60 focus:outline-none"
      />
      <input
        type="password"
        placeholder="Password (8+ characters)"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        minLength={8}
        required
        className="w-full rounded-lg border border-ivory-100/10 bg-charcoal-900 px-4 py-3 text-ivory-100 placeholder-ivory-400/50 focus:border-gold-500/60 focus:outline-none"
      />
      <label className="flex items-center gap-2 text-sm text-ivory-300">
        <input
          type="checkbox"
          checked={isRealtor}
          onChange={(e) => setIsRealtor(e.target.checked)}
          className="rounded"
        />
        I&rsquo;m a Florida-licensed realtor
      </label>
      {isRealtor && (
        <>
          <input
            type="text"
            placeholder="FL DBPR license # (optional)"
            value={license}
            onChange={(e) => setLicense(e.target.value)}
            className="w-full rounded-lg border border-ivory-100/10 bg-charcoal-900 px-4 py-3 text-ivory-100 placeholder-ivory-400/50 focus:border-gold-500/60 focus:outline-none"
          />
          <input
            type="text"
            placeholder="Your brokerage (optional)"
            value={brokerage}
            onChange={(e) => setBrokerage(e.target.value)}
            className="w-full rounded-lg border border-ivory-100/10 bg-charcoal-900 px-4 py-3 text-ivory-100 placeholder-ivory-400/50 focus:border-gold-500/60 focus:outline-none"
          />
        </>
      )}
      {error && (
        <div className="rounded-lg border border-red-500/30 bg-red-500/5 p-3 text-sm text-red-300">{error}</div>
      )}
      <Button type="submit" variant="primary" size="md" disabled={status === 'submitting'}>
        {status === 'submitting' ? 'Creating account…' : 'Create account'}
      </Button>
      <p className="text-sm text-ivory-400/60 text-center">
        Already have an account? <Link href="/signin" className="text-gold-400 underline underline-offset-4">Sign in</Link>
      </p>
    </form>
  );
}
