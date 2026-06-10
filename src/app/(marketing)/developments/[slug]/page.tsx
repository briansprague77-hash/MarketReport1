import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import {
  getDevelopment,
  getDevelopmentProfile,
  getAllDevelopmentSlugs,
  isFullDevelopment,
} from '@/data/developments';
import { profileToDevelopment } from '@/lib/profileAdapter';
import type { Development } from '@/types/development';

// Unified detail-page sections
import HeroSection from '@/components/sections/development/HeroSection';
import StickyTabNav, { TabDef } from '@/components/layout/StickyTabNav';
import ExecutiveSummary from '@/components/sections/development/ExecutiveSummary';
import MarketAnalysis from '@/components/sections/development/MarketAnalysis';
import SalesPerformance from '@/components/sections/development/SalesPerformance';
import CompetitivePosition from '@/components/sections/development/CompetitivePosition';
import LocationIntelligence from '@/components/sections/development/LocationIntelligence';
import BuildingSpecs from '@/components/sections/development/BuildingSpecs';
import FinancingSection from '@/components/sections/development/FinancingSection';
import Visionaries from '@/components/sections/development/Visionaries';
import SourceNotes from '@/components/sections/development/SourceNotes';
import PricingLadder from '@/components/sections/development/PricingLadder';
import TowerHeatmap from '@/components/sections/development/TowerHeatmap';
import BedroomSegmentAnalysis from '@/components/sections/development/BedroomSegmentAnalysis';
import ResidenceFeatures from '@/components/sections/development/ResidenceFeatures';
import ResidenceOverview from '@/components/sections/development/ResidenceOverview';
import OwnerBenefits from '@/components/sections/development/OwnerBenefits';
import Timeline from '@/components/sections/development/Timeline';
import PressHighlights from '@/components/sections/development/PressHighlights';
import SalesTeam from '@/components/sections/development/SalesTeam';
import AmenityHighlights from '@/components/sections/development/AmenityHighlights';
import ImageGallery from '@/components/sections/development/ImageGallery';
import BrokerCommissionSection from '@/components/sections/development/BrokerCommissionSection';
import DocumentLinksSection from '@/components/sections/development/DocumentLinksSection';
import SocialProof from '@/components/sections/development/SocialProof';
import TailInventory from '@/components/sections/development/TailInventory';

interface DevelopmentPageProps {
  params: { slug: string };
}

export async function generateStaticParams() {
  return getAllDevelopmentSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: DevelopmentPageProps): Promise<Metadata> {
  // Try full development first, then profile
  const development = getDevelopment(params.slug);
  if (development) {
    return {
      title: development.seo.title,
      description: development.seo.description,
      keywords: development.seo.keywords,
      openGraph: {
        title: development.seo.title,
        description: development.seo.description,
        type: 'article',
      },
    };
  }

  const profile = getDevelopmentProfile(params.slug);
  if (profile) {
    return {
      title: profile.seo.title,
      description: profile.seo.description,
      keywords: profile.seo.keywords,
      openGraph: {
        title: profile.seo.title,
        description: profile.seo.description,
        type: 'article',
      },
    };
  }

  return {};
}

/**
 * Unified tab definition used across ALL detail pages — Waldorf, Art House,
 * 400 Central, and every DevelopmentProfile. Sections that lack data simply
 * return null, so profile buildings render fewer sections without breaking
 * the template shell.
 */
const unifiedTabs: TabDef[] = [
  { id: 'overview', label: 'Overview' },
  { id: 'market-analysis', label: 'Market' },
  { id: 'sales-performance', label: 'Sales' },
  { id: 'pricing-ladder', label: 'Pricing', covers: ['pricing-ladder'] },
  { id: 'competitive-position', label: 'Comps' },
  { id: 'location', label: 'Location' },
  {
    id: 'building',
    label: 'Building',
    covers: ['building', 'amenities', 'residences', 'features', 'gallery'],
  },
  { id: 'owner-benefits', label: 'Ownership' },
  {
    id: 'timeline',
    label: 'Details',
    covers: ['timeline', 'financing', 'sales-team', 'source-notes'],
  },
];

export default function DevelopmentPage({ params }: DevelopmentPageProps) {
  // 1) Try full analytical Development first (Waldorf, Art House, 400 Central).
  // 2) Fall back to DevelopmentProfile and adapt it to a partial Development.
  // 3) If neither exists → 404.
  const fullDevelopment = getDevelopment(params.slug);
  const profile = getDevelopmentProfile(params.slug);

  if (!fullDevelopment && !profile) {
    notFound();
  }

  // Build the devData that every section consumes. When only a profile
  // exists we cast the partial to Development — section components are
  // responsible for null-guarding any field they require.
  const devData: Development =
    fullDevelopment ??
    (profileToDevelopment(profile!) as Development);

  return (
    <>
      <StickyTabNav tabs={unifiedTabs} title={devData.name} />
      <HeroSection development={devData} />
      <ExecutiveSummary development={devData} />
      <MarketAnalysis development={devData} />
      <SalesPerformance development={devData} />
      {/* Tail Inventory — only for delivered/sold-out buildings with resale market */}
      {devData.tailInventory && (devData.status === 'delivered' || devData.status === 'sold-out') && (
        <TailInventory data={devData.tailInventory} developmentName={devData.name} />
      )}
      <PricingLadder development={devData} />
      <TowerHeatmap development={devData} />
      <BedroomSegmentAnalysis development={devData} />
      <CompetitivePosition development={devData} />
      <LocationIntelligence development={devData} />
      <BuildingSpecs development={devData} />
      <AmenityHighlights development={devData} />
      <ResidenceOverview development={devData} />
      <ResidenceFeatures development={devData} />
      <ImageGallery development={devData} />
      <OwnerBenefits development={devData} />
      <Timeline development={devData} />
      <PressHighlights development={devData} />
      {devData.socialProof && devData.socialProof.length > 0 && (
        <SocialProof socialProof={devData.socialProof} variant="section" />
      )}
      <FinancingSection development={devData} />
      <BrokerCommissionSection development={devData} />
      <DocumentLinksSection development={devData} />
      <SalesTeam development={devData} />
      <SourceNotes development={devData} />
      <Visionaries development={devData} />
    </>
  );
}

// Silence unused-import lint for helpers kept for future use
void isFullDevelopment;
