import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import { Analytics } from '@vercel/analytics/react';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://developercertified.com';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Tampa Bay New Development Market Report',
    template: '%s | Tampa Bay Market Report',
  },
  description:
    'Tampa Bay new construction market intelligence — 31 luxury developments tracked across St. Petersburg, Tampa, and Sarasota. Price per square foot, absorption velocity, flip analysis, and HOA comparison for every building. Sourced data, not marketing flyers.',
  keywords: [
    // Core terms
    'Tampa Bay new construction', 'Tampa Bay luxury condos', 'Tampa Bay market report',
    'St Petersburg condos for sale', 'Tampa condos for sale', 'Sarasota condos for sale',
    'new construction Florida Gulf Coast', 'pre-construction condos Florida',
    // Pinellas buildings
    'Waldorf Astoria St Petersburg', 'Waldorf Astoria Residences price', 'Waldorf Astoria PSF',
    'Art House St Petersburg', 'Art House condos for sale',
    '400 Central St Petersburg', '400 Central condos price',
    'Roche Bobois Maison St Petersburg', 'Roche Bobois tower',
    'Viceroy Clearwater Beach', 'Viceroy Residences Clearwater',
    'Reflection St Petersburg', 'The Cade St Petersburg',
    'Corey Landings St Pete Beach', 'SALTAIRE II St Petersburg',
    // Hillsborough buildings
    'Pendry Tampa', 'Pendry Residences Tampa', 'ONE Tampa condos',
    'Ritz-Carlton Tampa', 'Ritz-Carlton Residences Tampa Bayshore',
    'Tampa EDITION Residences', 'Hotel ORA Tampa',
    'Aqua Westshore Tampa', 'Altura Bayshore Tampa',
    // Sarasota buildings
    'Ritz-Carlton Sarasota Bay', 'Waldorf Astoria Sarasota',
    'Rosewood Residences Lido Key', 'St Regis Longboat Key', 'Amara Sarasota', 'Saravela Sarasota', 'The Owen Sarasota',
    'One Park Sarasota', 'Peninsula Sarasota', 'SIX88 Sarasota',
    'Mira Mar Sarasota', 'The Edge Sarasota',
    // Long-tail
    'best new construction condo Tampa Bay 2026', 'luxury condo price per square foot Tampa',
    'branded residence Tampa Bay', 'hospitality branded condo Florida',
    'new condo St Petersburg price', 'downtown Tampa condo tower',
    'Bayshore Boulevard condos Tampa', 'Golden Gate Point Sarasota condos',
    'Tampa Bay real estate broker', 'new development market intelligence Florida',
  ],
  authors: [{ name: 'Brian Sprague', url: siteUrl }],
  creator: 'Brian Sprague',
  publisher: 'Tampa Bay Market Report',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    siteName: 'Tampa Bay Market Report',
    title: 'Tampa Bay New Development Market Report',
    description:
      'Cutting through the noise — your centralized resource for Tampa Bay new development market intelligence.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tampa Bay New Development Market Report',
    description:
      'Realtor-to-realtor market intelligence for Tampa Bay luxury developments.',
    creator: '@tampabaymarket',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

// JSON-LD structured data for the overall site
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'RealEstateAgent',
  name: 'Tampa Bay Market Report',
  description:
    'Data-driven new construction market intelligence for Tampa Bay — 37 developments tracked across Pinellas, Hillsborough, and Sarasota counties. Every price sourced. Every claim cited.',
  url: siteUrl,
  telephone: '+1-727-205-9139',
  areaServed: [
    { '@type': 'AdministrativeArea', name: 'Pinellas County', containedInPlace: { '@type': 'State', name: 'Florida' } },
    { '@type': 'AdministrativeArea', name: 'Hillsborough County', containedInPlace: { '@type': 'State', name: 'Florida' } },
    { '@type': 'AdministrativeArea', name: 'Sarasota County', containedInPlace: { '@type': 'State', name: 'Florida' } },
  ],
  founder: {
    '@type': 'Person',
    name: 'Brian Sprague',
    jobTitle: 'Licensed Florida Real Estate Broker',
    identifier: 'FL BK3221171',
  },
  knowsAbout: [
    'Luxury Condominiums', 'New Development Sales', 'Pre-Construction Real Estate',
    'Branded Residences', 'Hospitality Branded Real Estate',
    'Tampa Bay Real Estate Market', 'St. Petersburg Florida Condos',
    'Downtown Tampa Condos', 'Sarasota Luxury Condos',
    'Waldorf Astoria Residences', 'Ritz-Carlton Residences',
    'Pendry Residences', 'Viceroy Residences',
    'Price Per Square Foot Analysis', 'MLS Market Data',
  ],
  sameAs: [],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
