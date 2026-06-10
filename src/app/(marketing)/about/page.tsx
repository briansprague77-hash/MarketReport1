import { Metadata } from 'next';
import AboutContent from './AboutContent';

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://developercertified.com';

export const metadata: Metadata = {
  title: 'About',
  description:
    'Meet Brian Sprague — licensed Realtor and market analyst behind the Tampa Bay Market Report. Learn our methodology for sourcing, verifying, and publishing new-development data.',
  openGraph: {
    title: 'About — Tampa Bay Market Report',
    description:
      'Market intelligence, not marketing. Learn how we source, verify, and publish Tampa Bay new-development data.',
    url: `${siteUrl}/about`,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About — Tampa Bay Market Report',
    description:
      'Market intelligence, not marketing. Learn how we source and verify Tampa Bay new-development data.',
  },
};

export default function AboutPage() {
  return <AboutContent />;
}
