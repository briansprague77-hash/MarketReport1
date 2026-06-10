import { Metadata } from 'next';
import MarketReportClient from './MarketReportClient';

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://developercertified.com';

export const metadata: Metadata = {
  title: 'Market Report',
  description:
    'Tampa Bay new-construction market intelligence — pipeline analytics, pricing trends, absorption, and delivery timelines across Pinellas, Hillsborough, and Sarasota. Sourced from Stellar MLS. No spin, just data.',
  openGraph: {
    title: 'Market Report — Tampa Bay New Construction Intelligence',
    description:
      'Real-time pipeline analytics, pricing trends, and delivery timelines for Tampa Bay new construction. Sourced data with attribution.',
    url: `${siteUrl}/market-report`,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Market Report — Tampa Bay New Construction Intelligence',
    description:
      'Real-time pipeline analytics, pricing trends, and delivery timelines for Tampa Bay new construction.',
  },
};

export default function MarketReportPage() {
  return <MarketReportClient />;
}
