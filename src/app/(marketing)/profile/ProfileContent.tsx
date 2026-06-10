'use client';

import { useState } from 'react';
import Button from '@/components/ui/Button';

interface Props {
  email: string;
  fullName: string | null;
  tier: 'reader' | 'pending-realtor' | 'realtor' | 'sales-agent';
  brokerageName: string | null;
  realtorLicense: string | null;
  salesAgentDevSlug: string | null;
}

const TIER_LABEL: Record<Props['tier'], string> = {
  'reader': 'Reader',
  'pending-realtor': 'Realtor (pending verification)',
  'realtor': 'Realtor',
  'sales-agent': 'Sales Agent',
};

export default function ProfileContent({ email, fullName, tier, brokerageName, realtorLicense, salesAgentDevSlug }: Props) {
  const [showRequestForm, setShowRequestForm] = useState(false);
  const [license, setLicense] = useState('');
  const [brokerage, setBrokerage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [requested, setRequested] = useState(false);

  async function submitRealtorRequest(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    const res = await fetch('/api/profile/request-realtor', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ license, brokerage }),
    });
    setSubmitting(false);
    if (res.ok) setRequested(true);
  }

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-ivory-100/10 bg-charcoal-900/60 p-6">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="text-ivory-400/70">Email</div>
          <div className="text-ivory-100">{email}</div>
          {fullName && (
            <>
              <div className="text-ivory-400/70">Name</div>
              <div className="text-ivory-100">{fullName}</div>
            </>
          )}
          <div className="text-ivory-400/70">Tier</div>
          <div className="text-gold-400 font-medium">{TIER_LABEL[tier]}</div>
          {brokerageName && (
            <>
              <div className="text-ivory-400/70">Brokerage</div>
              <div className="text-ivory-100">{brokerageName}</div>
            </>
          )}
          {realtorLicense && (
            <>
              <div className="text-ivory-400/70">License #</div>
              <div className="text-ivory-100">{realtorLicense}</div>
            </>
          )}
          {salesAgentDevSlug && (
            <>
              <div className="text-ivory-400/70">Selling at</div>
              <div className="text-ivory-100">{salesAgentDevSlug}</div>
            </>
          )}
        </div>
      </div>

      {tier === 'reader' && !showRequestForm && !requested && (
        <Button variant="outline" size="md" onClick={() => setShowRequestForm(true)}>
          Request Realtor Verification
        </Button>
      )}

      {showRequestForm && !requested && (
        <form onSubmit={submitRealtorRequest} className="rounded-xl border border-gold-500/20 bg-charcoal-900/60 p-6 space-y-4">
          <h3 className="font-heading text-lg text-white">Verify as a realtor</h3>
          <input
            type="text"
            placeholder="FL DBPR license #"
            value={license}
            onChange={(e) => setLicense(e.target.value)}
            required
            className="w-full rounded-lg border border-ivory-100/10 bg-charcoal-900 px-4 py-3 text-ivory-100 focus:border-gold-500/60 focus:outline-none"
          />
          <input
            type="text"
            placeholder="Your brokerage"
            value={brokerage}
            onChange={(e) => setBrokerage(e.target.value)}
            required
            className="w-full rounded-lg border border-ivory-100/10 bg-charcoal-900 px-4 py-3 text-ivory-100 focus:border-gold-500/60 focus:outline-none"
          />
          <Button type="submit" variant="primary" size="md" disabled={submitting}>
            {submitting ? 'Submitting…' : 'Submit for verification'}
          </Button>
        </form>
      )}

      {requested && (
        <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/5 p-6">
          <p className="text-emerald-300">Request submitted. Brian will review within 24 hours.</p>
        </div>
      )}

      <form action="/api/auth/signout" method="POST">
        <Button type="submit" variant="ghost" size="md">Sign out</Button>
      </form>
    </div>
  );
}
