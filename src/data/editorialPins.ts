// src/data/editorialPins.ts
//
// Editorial overrides for the homepage "What Moved" feed.
//
// Use this file to pin manually-written or approved broker-submitted events
// that should always appear in the feed (they prepend to the auto-computed
// events list, ranked by score).
//
// After a broker submits an update via /brokers/[code] and you approve it,
// paste the MarketEvent object into the array below. The score 9999 keeps
// it above auto-computed events; the diversity pass still caps at 1 event
// per devSlug and 2 per type.

import type { MarketEvent } from '@/lib/computeMarketEvents';

export const editorialPins: MarketEvent[] = [
  // Example (commented out):
  // {
  //   date: '2026-04-22',
  //   devSlug: 'waldorf-astoria',
  //   devName: 'Waldorf Astoria Residences',
  //   type: 'milestone',
  //   headline: 'Waldorf begins foundation pour',
  //   body: 'Developer-confirmed start of structural concrete phase',
  //   magnitude: 100,
  //   score: 9999,
  // },
];
