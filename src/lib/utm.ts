/**
 * UTM Link Generator Utility
 *
 * Generates UTM-tracked URLs for share links, development pages,
 * and market report pages on tampabaynewconstruction.com.
 */

const BASE_URL = 'https://tampabaynewconstruction.com';

export type UTMParams = {
  source: string;    // e.g. 'realtor-resources', 'market-report', 'agent-share'
  medium: string;    // e.g. 'email', 'social', 'direct', 'clipboard'
  campaign: string;  // e.g. 'q1-2026-pipeline', 'waldorf-launch'
  content?: string;  // e.g. 'commission-table', 'floor-plan-card'
  term?: string;     // optional search term
};

/**
 * Appends UTM parameters to any path, returning a full URL.
 */
export function buildUTMUrl(path: string, params: UTMParams): string {
  const url = new URL(path.startsWith('http') ? path : `${BASE_URL}${path}`);

  url.searchParams.set('utm_source', params.source);
  url.searchParams.set('utm_medium', params.medium);
  url.searchParams.set('utm_campaign', params.campaign);

  if (params.content) {
    url.searchParams.set('utm_content', params.content);
  }
  if (params.term) {
    url.searchParams.set('utm_term', params.term);
  }

  return url.toString();
}

/**
 * Creates a full URL to `/developments/{slug}` with UTM params.
 */
export function buildShareUrl(developmentSlug: string, source: string): string {
  return buildUTMUrl(`/developments/${developmentSlug}`, {
    source,
    medium: 'clipboard',
    campaign: 'agent-share',
    content: developmentSlug,
  });
}

/**
 * Creates a full URL to `/market-report` with optional geo filter and UTM.
 */
export function buildMarketReportUrl(geo?: string, source?: string): string {
  const path = geo ? `/market-report?geo=${encodeURIComponent(geo)}` : '/market-report';
  return buildUTMUrl(path, {
    source: source ?? 'direct',
    medium: 'clipboard',
    campaign: 'market-report-share',
    content: geo ?? 'full-report',
  });
}
