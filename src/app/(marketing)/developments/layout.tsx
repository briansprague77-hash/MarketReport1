import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'New Construction Developments | Tampa Bay Condos for Sale',
  description:
    '31 luxury new construction condos tracked across St. Petersburg, Tampa, and Sarasota. Filter by county, price, delivery date, and tier. Waldorf Astoria, Ritz-Carlton, Pendry, Viceroy, and 27 more. Updated April 2026.',
  keywords: [
    'new construction condos Tampa Bay',
    'luxury condos St Petersburg FL',
    'Tampa new condo towers',
    'Sarasota condos for sale',
    'pre-construction condos Florida',
    'branded residence Tampa Bay',
    'Waldorf Astoria St Petersburg condos',
    'Ritz-Carlton Tampa condos',
    'Pendry Tampa residences',
    'waterfront condos Tampa Bay',
  ],
  openGraph: {
    title: 'New Construction Developments — Tampa Bay',
    description: '37 developments tracked. Every price sourced. Filter by status, county, price range, delivery year.',
  },
};

export default function DevelopmentsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
