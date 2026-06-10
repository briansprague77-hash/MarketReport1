import type { Metadata } from 'next';
import EventsClient from './EventsClient';

export const metadata: Metadata = {
  title: 'Events | Tampa Bay New Construction Calendar',
  description:
    'Upcoming broker events, grand openings, and virtual tours across Tampa Bay new construction developments.',
  openGraph: {
    title: 'Events Calendar — Tampa Bay New Construction',
    description:
      'Exclusive events across Tampa Bay premier developments. Grand openings, broker previews, and virtual tours.',
  },
};

export default function EventsPage() {
  return <EventsClient />;
}
