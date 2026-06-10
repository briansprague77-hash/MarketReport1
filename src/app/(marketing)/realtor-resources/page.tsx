import { Metadata } from 'next';
import RealtorResourcesContent from './RealtorResourcesContent';

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://developercertified.com';

export const metadata: Metadata = {
  title: 'Realtor Resources',
  description:
    'Commission structures, broker incentives, floor plan specs, deposit schedules, and developer downloads for Tampa Bay new construction developments.',
  openGraph: {
    title: 'Realtor Resources — Tampa Bay Market Report',
    description:
      'Commission structures, floor plans, and developer resources for Tampa Bay new construction.',
    url: `${siteUrl}/realtor-resources`,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Realtor Resources — Tampa Bay Market Report',
    description:
      'Commission structures, floor plans, and developer resources for Tampa Bay new construction.',
  },
};

export default function RealtorResourcesPage() {
  return <RealtorResourcesContent />;
}
