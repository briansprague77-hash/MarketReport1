import { Metadata } from 'next';
import ResaleMarketClient from './ResaleMarketClient';

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://developercertified.com';

export const metadata: Metadata = {
  title: 'Resale Market — Completed Towers',
  description:
    'Tampa Bay’s sold-out, delivered luxury towers — Saltaire, ONE St. Pete, Tampa EDITION, and more. Resale benchmark pricing sourced from Stellar MLS, plus a sourced CMA for buyers and sellers.',
  openGraph: {
    title: 'Resale Market — Completed Tampa Bay Towers',
    description:
      'Sold-out, delivered luxury towers and where resale pricing is actually clearing. Sourced data, not flyers.',
    url: `${siteUrl}/resale-market`,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Resale Market — Completed Tampa Bay Towers',
    description:
      'Sold-out, delivered luxury towers and where resale pricing is actually clearing.',
  },
};

export default function ResaleMarketPage() {
  return <ResaleMarketClient />;
}
