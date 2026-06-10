/**
 * profileAdapter.ts
 *
 * Converts a lightweight `DevelopmentProfile` into a partial `Development`
 * shape so every section component on the unified detail page template can
 * consume either data source with identical props.
 *
 * Section components are expected to early-return null when required fields
 * are missing. This adapter therefore only maps fields that exist on the
 * profile — everything analytical (pricingLadder, salesMetrics, competitors,
 * specifications, etc.) is intentionally left undefined.
 *
 * Additive-only: this file adds a new capability without mutating or deleting
 * any existing data-mapping logic.
 */

import type { Development, DevelopmentImage } from '@/types/development';
import type { DevelopmentProfile } from '@/types/development-profile';

/**
 * Map a DevelopmentProfile to a partial Development.
 *
 * The return value is intentionally typed as `Partial<Development>` —
 * consumers must cast to `Development` knowing that many required fields
 * will be undefined. Section components already guard for this.
 */
export function profileToDevelopment(profile: DevelopmentProfile): Partial<Development> {
  // Build DevelopmentImages from the flat galleryImages string array
  const heroImageSrc = profile.galleryImages?.[0];
  const hero: DevelopmentImage | undefined = heroImageSrc
    ? { src: heroImageSrc, alt: profile.name }
    : undefined;

  const card: DevelopmentImage | undefined = heroImageSrc
    ? { src: heroImageSrc, alt: profile.name }
    : undefined;

  const gallery: DevelopmentImage[] | undefined = profile.galleryImages?.length
    ? profile.galleryImages.map((src) => ({ src, alt: profile.name }))
    : undefined;

  const images = hero
    ? {
        hero,
        card: card!,
        gallery,
      }
    : undefined;

  // Adapt salesTeam: profile.salesTeam is an array of members, full Development.salesTeam is a single object with firm + leadAgent
  const salesTeam =
    profile.salesTeam && profile.salesTeam.length > 0
      ? {
          firm: profile.salesTeam[0].title?.includes('Sales') ? profile.salesTeam[0].name : profile.developer,
          leadAgent:
            profile.salesTeam.length === 1
              ? profile.salesTeam[0].name
              : profile.salesTeam.map((m) => m.name).join(', '),
          salesGallery: profile.salesGallery,
        }
      : profile.salesGallery
        ? {
            firm: profile.developer,
            salesGallery: profile.salesGallery,
          }
        : undefined;

  const partial: Partial<Development> = {
    slug: profile.slug,
    name: profile.name,
    fullName: profile.name,
    tagline: profile.tagline,
    heroDescription: profile.description,
    images,
    location: profile.location,
    address: profile.address,
    county: profile.county,
    status: profile.status,
    statusLabel: profile.statusLabel,
    deliveryDate: profile.deliveryDate,
    type: profile.type,
    developer: profile.developer,
    architect: profile.architect,
    description: profile.description,
    hoaPerSqFt: profile.hoaPerSqFt,
    website: profile.website,
    phone: profile.phone,
    socialMedia: profile.socialMedia
      ? {
          instagram: profile.socialMedia.instagram,
          facebook: profile.socialMedia.facebook,
          youtube: profile.socialMedia.youtube,
        }
      : undefined,
    socialProof: profile.socialProof,
    documents: profile.documents,
    seo: profile.seo,
    tailInventory: profile.tailInventory,
    salesTeam,
    salesAgents: profile.salesAgents,
    // Intentionally undefined — section components return null when missing:
    //   specifications, salesMetrics, pricingLadder, pricePoints, competitors,
    //   locationCategories, locationScores, financing, executiveSummary,
    //   brandedValue, marketEvidence, timeline, visionaries, residenceFeatures,
    //   ownershipServices, pressHighlights, sourceNotes, brokerCommission,
    //   residencePolicies, badges, tier.
  };

  return partial;
}
