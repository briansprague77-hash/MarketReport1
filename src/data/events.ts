/**
 * Events data for Tampa Bay new construction calendar.
 * Sources: Developer sales teams, broker networks, and public announcements.
 */

export interface MarketEvent {
  id: number;
  developmentSlug: string;
  developmentName: string;
  type: 'grand-opening' | 'broker-vip' | 'virtual' | 'private';
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  address: string;
  registered?: number;
  bonus?: string;
  badge: string;
  color: 'gold' | 'emerald' | 'blue' | 'burgundy';
}

export const events: MarketEvent[] = [
  {
    id: 1,
    developmentSlug: 'art-house',
    developmentName: 'Art House',
    type: 'grand-opening',
    title: 'Model Home Grand Opening',
    description:
      'Be among the first to tour our fully furnished model units and experience the lifestyle.',
    date: 'Saturday, March 15, 2025',
    time: '10:00 AM – 4:00 PM EST',
    location: 'Sales Gallery',
    address: 'Downtown St. Petersburg',
    registered: 42,
    badge: 'Grand Opening',
    color: 'gold',
  },
  {
    id: 2,
    developmentSlug: 'art-house',
    developmentName: 'Art House',
    type: 'broker-vip',
    title: 'Exclusive Broker Preview',
    description:
      'Special pre-launch pricing and bonus incentives for early client registrations.',
    date: 'Thursday, March 20, 2025',
    time: '5:30 PM – 8:00 PM EST',
    location: 'Rooftop Terrace',
    address: 'Cocktails & canapés provided',
    bonus: 'Up to 3% commission + bonus',
    badge: 'Broker VIP Event',
    color: 'blue',
  },
  {
    id: 3,
    developmentSlug: '400-central',
    developmentName: '400 Central',
    type: 'virtual',
    title: 'Virtual Open House',
    description:
      'Live walkthrough with our sales team. Ask questions in real-time via chat.',
    date: 'Wednesday, March 27, 2025',
    time: '12:00 PM – 1:00 PM EST',
    location: 'Zoom Webinar',
    address: 'Link sent after registration',
    registered: 128,
    badge: 'Virtual Tour',
    color: 'emerald',
  },
];

/** Get events for a specific development */
export function getEventsByDevelopment(slug: string): MarketEvent[] {
  return events.filter((e) => e.developmentSlug === slug);
}

/** Quick stats derived from events data */
export const eventStats = {
  upcoming: events.length,
  developments: new Set(events.map((e) => e.developmentSlug)).size,
  totalRegistered: events.reduce((sum, e) => sum + (e.registered ?? 0), 0),
};
