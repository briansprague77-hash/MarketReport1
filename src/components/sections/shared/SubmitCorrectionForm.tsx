'use client';

import { useState } from 'react';
import Button from '@/components/ui/Button';
import { trackedDevelopments } from '@/data/market';

interface Props {
  /** If provided, submissions are attributed to this broker code and
   *  development-slug selector is locked. Omit for anonymous corrections. */
  brokerCode?: string;
  /** Pre-lock the development selector to this slug. Omit for the general form. */
  lockedDevelopmentSlug?: string;
  /** Page context shown in the submission so Brian knows where it came from. */
  sourceContext?: string;
  /** Heading + sub-copy override for different placements (broker portal vs About). */
  heading?: string;
  subheading?: string;
  /** Primary-action label override. */
  submitLabel?: string;
}

const UPDATE_TYPES = [
  { value: 'milestone', label: 'Milestone (topping off, CO, first closing, etc.)' },
  { value: 'price', label: 'Price change' },
  { value: 'incentive', label: 'New incentive or concession' },
  { value: 'news', label: 'General news / announcement' },
] as const;

export default function SubmitCorrectionForm({
  brokerCode,
  lockedDevelopmentSlug,
  sourceContext,
  heading,
  subheading,
  submitLabel,
}: Props) {
  const [type, setType] = useState<string>('milestone');
  const [headline, setHeadline] = useState('');
  const [details, setDetails] = useState('');
  const [email, setEmail] = useState('');
  const [eventDate, setEventDate] = useState<string>(() =>
    new Date().toISOString().slice(0, 10)
  );
  const [devSlug, setDevSlug] = useState<string>(lockedDevelopmentSlug ?? '');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');

  // Sort development list for the picker (used when not locked)
  const devOptions = lockedDevelopmentSlug
    ? []
    : [...trackedDevelopments].sort((a, b) => a.name.localeCompare(b.name));

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!headline.trim()) {
      setErrorMessage('Headline is required.');
      setStatus('error');
      return;
    }
    if (!brokerCode && !email.trim()) {
      setErrorMessage('Email is required so we can credit the correction.');
      setStatus('error');
      return;
    }
    setStatus('submitting');
    setErrorMessage('');
    try {
      const res = await fetch('/api/broker-update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          code: brokerCode,
          type,
          headline: headline.trim(),
          details: details.trim() || undefined,
          eventDate,
          devSlug: devSlug || undefined,
          email: email.trim() || undefined,
          sourceContext,
        }),
      });
      if (!res.ok) {
        const payload = await res.json().catch(() => ({}));
        throw new Error(payload.error || `Request failed (${res.status})`);
      }
      setStatus('success');
      setHeadline('');
      setDetails('');
      setEmail('');
    } catch (err) {
      setStatus('error');
      setErrorMessage(err instanceof Error ? err.message : 'Submission failed');
    }
  }

  const defaultHeading = brokerCode ? 'Submit a Development Update' : 'Submit a Correction';
  const defaultSubheading = brokerCode
    ? 'Updates are emailed to Brian for review before appearing on the site.'
    : 'See something wrong, outdated, or missing? Flag it. Brian reviews every submission.';

  return (
    <section className="rounded-xl border border-ivory-100/10 bg-charcoal-900/60 p-6 md:p-8">
      <h3 className="font-heading text-lg md:text-xl font-semibold text-white mb-1">
        {heading ?? defaultHeading}
      </h3>
      <p className="text-sm text-ivory-400/70 mb-6">{subheading ?? defaultSubheading}</p>

      {status === 'success' ? (
        <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/5 p-4">
          <p className="text-sm text-emerald-300">
            {brokerCode
              ? 'Update submitted. Brian will review and publish when approved.'
              : 'Thanks — Brian will look into it and respond if needed.'}
          </p>
          <button
            type="button"
            className="mt-3 text-xs text-emerald-400 underline"
            onClick={() => setStatus('idle')}
          >
            Submit another
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="sc-type" className="block text-xs text-ivory-400/70 uppercase tracking-wider mb-2">
              Type
            </label>
            <select
              id="sc-type"
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full rounded-lg border border-ivory-100/10 bg-charcoal-950 px-3 py-2 text-sm text-ivory-100 focus:border-gold-500/60 focus:outline-none"
            >
              {UPDATE_TYPES.map((t) => (
                <option key={t.value} value={t.value}>
                  {t.label}
                </option>
              ))}
            </select>
          </div>

          {!lockedDevelopmentSlug && (
            <div>
              <label htmlFor="sc-dev" className="block text-xs text-ivory-400/70 uppercase tracking-wider mb-2">
                Development (optional)
              </label>
              <select
                id="sc-dev"
                value={devSlug}
                onChange={(e) => setDevSlug(e.target.value)}
                className="w-full rounded-lg border border-ivory-100/10 bg-charcoal-950 px-3 py-2 text-sm text-ivory-100 focus:border-gold-500/60 focus:outline-none"
              >
                <option value="">— not specific to a development —</option>
                {devOptions.map((d) => (
                  <option key={d.slug} value={d.slug}>
                    {d.name}
                  </option>
                ))}
              </select>
            </div>
          )}

          <div>
            <label htmlFor="sc-headline" className="block text-xs text-ivory-400/70 uppercase tracking-wider mb-2">
              Headline
            </label>
            <input
              id="sc-headline"
              type="text"
              value={headline}
              onChange={(e) => setHeadline(e.target.value)}
              placeholder={brokerCode ? 'e.g. 400 Central Unit 4102 went pending at $1,221/SF' : 'Short description of what needs fixing'}
              required
              maxLength={160}
              className="w-full rounded-lg border border-ivory-100/10 bg-charcoal-950 px-3 py-2 text-sm text-ivory-100 focus:border-gold-500/60 focus:outline-none"
            />
          </div>

          <div>
            <label htmlFor="sc-details" className="block text-xs text-ivory-400/70 uppercase tracking-wider mb-2">
              Details (optional)
            </label>
            <textarea
              id="sc-details"
              rows={4}
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              placeholder="Source, numbers, links — whatever helps Brian verify and act on it"
              maxLength={800}
              className="w-full rounded-lg border border-ivory-100/10 bg-charcoal-950 px-3 py-2 text-sm text-ivory-100 focus:border-gold-500/60 focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="sc-date" className="block text-xs text-ivory-400/70 uppercase tracking-wider mb-2">
                Event date (optional)
              </label>
              <input
                id="sc-date"
                type="date"
                value={eventDate}
                onChange={(e) => setEventDate(e.target.value)}
                className="w-full rounded-lg border border-ivory-100/10 bg-charcoal-950 px-3 py-2 text-sm text-ivory-100 focus:border-gold-500/60 focus:outline-none"
              />
            </div>

            {!brokerCode && (
              <div>
                <label htmlFor="sc-email" className="block text-xs text-ivory-400/70 uppercase tracking-wider mb-2">
                  Your email
                </label>
                <input
                  id="sc-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="so Brian can follow up"
                  required
                  className="w-full rounded-lg border border-ivory-100/10 bg-charcoal-950 px-3 py-2 text-sm text-ivory-100 focus:border-gold-500/60 focus:outline-none"
                />
              </div>
            )}
          </div>

          {status === 'error' && errorMessage && (
            <div className="rounded-lg border border-red-500/30 bg-red-500/5 p-3 text-sm text-red-300">
              {errorMessage}
            </div>
          )}

          <div>
            <Button variant="primary" size="md" type="submit" disabled={status === 'submitting'}>
              {status === 'submitting' ? 'Submitting…' : (submitLabel ?? (brokerCode ? 'Submit for Review' : 'Send Correction'))}
            </Button>
          </div>
        </form>
      )}
    </section>
  );
}
