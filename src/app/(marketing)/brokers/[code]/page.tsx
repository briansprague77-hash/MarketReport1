import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getBrokerByCode, brokerCodes } from '@/data/brokerCodes';
import { trackedDevelopments } from '@/data/market';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import BrokerUpdateForm from './BrokerUpdateForm';

// Don't index or crawl broker portal pages
export const metadata: Metadata = {
  robots: { index: false, follow: false, nocache: true },
  title: 'Broker Portal · Tampa Bay Market Report',
};

export function generateStaticParams() {
  return Object.keys(brokerCodes).map((code) => ({ code }));
}

interface PageProps {
  params: { code: string };
}

export default function BrokerPortalPage({ params }: PageProps) {
  const broker = getBrokerByCode(params.code);
  if (!broker) notFound();

  const dev = trackedDevelopments.find((d) => d.slug === broker.developmentSlug);

  const waNumber = process.env.NEXT_PUBLIC_BROKER_WA_NUMBER ?? '';
  const waMessage = encodeURIComponent(
    `Hi Brian — this is ${broker.name} from ${broker.firm}` +
      (dev ? ` (${dev.name})` : '') +
      `. `
  );
  const waHref = waNumber
    ? `https://wa.me/${waNumber}?text=${waMessage}`
    : '';

  return (
    <main className="min-h-screen bg-charcoal-950 text-ivory-100">
      <div className="container-luxury py-16">
        {/* Header */}
        <div className="mb-10 max-w-3xl">
          <Badge label={`Broker Portal · ${broker.firm}`} variant="gold" />
          <h1 className="font-heading text-3xl sm:text-5xl font-bold text-white mt-4 mb-3">
            Welcome, {broker.name}
          </h1>
          <p className="text-ivory-400/70 leading-relaxed">
            Private dashboard for {dev?.name ?? broker.developmentSlug}. Use
            the buttons below to reach Brian directly via WhatsApp Business,
            or submit a development update for review.
          </p>
        </div>

        {/* Dev snapshot tile */}
        {dev && (
          <div className="mb-10 rounded-2xl border border-gold-500/20 bg-gradient-to-br from-charcoal-900/80 to-charcoal-950 p-8">
            <div className="text-xs font-body font-semibold uppercase tracking-wider text-gold-500 mb-2">
              {dev.statusLabel}
            </div>
            <h2 className="font-heading text-2xl font-bold text-white mb-1">
              {dev.name}
            </h2>
            <p className="text-sm text-ivory-400/60 mb-6">{dev.location}</p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
              {dev.units > 0 && (
                <Stat label="Units" value={dev.units.toLocaleString()} />
              )}
              {dev.soldPercent != null && (
                <Stat label="Sold" value={`${dev.soldPercent}%`} />
              )}
              {(dev.resalePsf ?? dev.developerClosePsf ?? dev.avgPsf) && (
                <Stat
                  label="$/SF"
                  value={`$${(dev.resalePsf ?? dev.developerClosePsf ?? dev.avgPsf ?? 0).toLocaleString()}`}
                />
              )}
              {dev.delivery && <Stat label="Delivery" value={dev.delivery} />}
            </div>
          </div>
        )}

        {/* WhatsApp button */}
        <div className="mb-12 rounded-xl border border-ivory-100/10 bg-charcoal-900/60 p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="text-xs font-body font-semibold uppercase tracking-wider text-gold-500 mb-1">
              Direct Line
            </div>
            <h3 className="font-heading text-lg font-semibold text-white">
              WhatsApp Business with Brian
            </h3>
            <p className="text-sm text-ivory-400/60 mt-1">
              Prefilled with your name and development. Opens in WhatsApp.
            </p>
          </div>
          {waHref ? (
            <a href={waHref} target="_blank" rel="noopener noreferrer">
              <Button variant="primary" size="md">
                Open WhatsApp
              </Button>
            </a>
          ) : (
            <span className="text-xs text-ivory-400/40">
              WhatsApp number not configured — set NEXT_PUBLIC_BROKER_WA_NUMBER.
            </span>
          )}
        </div>

        {/* Update submission form */}
        <BrokerUpdateForm
          code={broker.code}
          brokerName={broker.name}
          firm={broker.firm}
          developmentSlug={broker.developmentSlug}
          developmentName={dev?.name ?? broker.developmentSlug}
        />

        <p className="mt-12 text-xs text-ivory-400/40 max-w-2xl">
          This portal is invite-only. Submissions are reviewed by Brian before
          appearing on the public site. Your visit also unlocks the sales-agent
          audience tier on your device so broker-specific CTAs appear across
          the site.
        </p>
      </div>
    </main>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-xs text-ivory-400/50 mb-1">{label}</div>
      <div className="text-base font-heading font-bold text-white">{value}</div>
    </div>
  );
}
