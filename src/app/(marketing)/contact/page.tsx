import { Metadata } from 'next';
import ContactContent from './ContactContent';

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://developercertified.com';

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Schedule a private briefing, request a comparison report, or connect with Brian Sprague for Tampa Bay new-development market intelligence.',
  openGraph: {
    title: 'Contact — Tampa Bay Market Report',
    description:
      'Schedule a private briefing or request Tampa Bay new-development market intelligence.',
    url: `${siteUrl}/contact`,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact — Tampa Bay Market Report',
    description:
      'Connect with Brian Sprague for Tampa Bay new-development market intelligence.',
  },
};

export default function ContactPage() {
  return <ContactContent />;
}
