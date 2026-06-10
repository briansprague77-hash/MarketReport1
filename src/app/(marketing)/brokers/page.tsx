import type { Metadata } from 'next';
import BrokerChatHub from '@/components/sections/realtor/BrokerChatHub';

// Don't index or crawl the broker group chat hub
export const metadata: Metadata = {
  robots: { index: false, follow: false, nocache: true },
  title: 'Broker Group Chat · Tampa Bay Market Report',
  description:
    'Private WhatsApp group for realtors, developer sales execs, and brokers actively selling in Tampa Bay new construction.',
};

export default function BrokersIndexPage() {
  return (
    <main className="min-h-screen bg-charcoal-950 text-ivory-100">
      <div className="pt-24">
        <BrokerChatHub />
      </div>
    </main>
  );
}
