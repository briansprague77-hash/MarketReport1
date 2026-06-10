'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  heroTitle,
  heroSubtitle,
  heroCtas,
  staggerContainer,
  staggerItem,
  fadeUp,
  defaultViewport,
} from '@/lib/animations';
import { events as staticEvents, type MarketEvent } from '@/data/events';
import { useAudience } from '@/lib/audience';
import { useLocalEvents } from '@/lib/useLocalEvents';
import AddEventModal from '@/components/events/AddEventModal';
import {
  Calendar,
  MapPin,
  Users,
  Gift,
  PartyPopper,
  Briefcase,
  Video,
  Star,
  Search,
  Plus,
  Trash2,
} from 'lucide-react';

/* ─── Color mapping ─────────────────────────────────────────────────────────── */
const colorMap: Record<
  MarketEvent['color'],
  {
    card: string;
    badge: string;
    icon: string;
    stat: string;
  }
> = {
  gold: {
    card: 'border-gold-500/40 bg-gold-500/5',
    badge: 'bg-gold-500 text-charcoal-900',
    icon: 'bg-gold-500/15 text-gold-600',
    stat: 'text-gold-600',
  },
  blue: {
    card: 'border-blue-400/40 bg-blue-500/5',
    badge: 'bg-blue-600 text-white',
    icon: 'bg-blue-500/15 text-blue-600',
    stat: 'text-blue-500',
  },
  emerald: {
    card: 'border-emerald-500/40 bg-emerald-500/5',
    badge: 'bg-emerald-600 text-white',
    icon: 'bg-emerald-500/15 text-emerald-600',
    stat: 'text-emerald-500',
  },
  burgundy: {
    card: 'border-burgundy-500/40 bg-burgundy-500/5',
    badge: 'bg-burgundy-500 text-white',
    icon: 'bg-burgundy-500/15 text-burgundy-500',
    stat: 'text-burgundy-500',
  },
};

function getEventIcon(type: MarketEvent['type']) {
  switch (type) {
    case 'grand-opening':
      return PartyPopper;
    case 'broker-vip':
      return Briefcase;
    case 'virtual':
      return Video;
    default:
      return Star;
  }
}

/* ─── Filter pill component ─────────────────────────────────────────────────── */
function FilterPill({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-body font-medium transition-all ${
        active
          ? 'bg-gold-500 text-charcoal-900 shadow-md'
          : 'bg-charcoal-800/60 text-charcoal-300 hover:bg-charcoal-700/60 hover:text-ivory-100'
      }`}
    >
      {children}
    </button>
  );
}

/* ─── Main Component ────────────────────────────────────────────────────────── */
export default function EventsClient() {
  const [filterType, setFilterType] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

  const { tier, selectedDevelopment, selectedDevelopmentName } = useAudience();
  const { localEvents, addEvent, removeEvent } = useLocalEvents();

  const isSalesAgent = tier === 'sales-agent';
  const localEventIds = useMemo(() => new Set(localEvents.map((e) => e.id)), [localEvents]);

  // Merge static + local events
  const allEvents = useMemo(() => [...staticEvents, ...localEvents], [localEvents]);

  // Stats derived from merged events
  const stats = useMemo(
    () => ({
      upcoming: allEvents.length,
      developments: new Set(allEvents.map((e) => e.developmentSlug)).size,
      totalRegistered: allEvents.reduce((sum, e) => sum + (e.registered ?? 0), 0),
    }),
    [allEvents],
  );

  const filteredEvents = allEvents.filter((event) => {
    const matchesType = filterType === 'all' || event.type === filterType;
    const matchesSearch =
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.developmentName.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesType && matchesSearch;
  });

  return (
    <main className="min-h-screen">
      {/* ─── Hero ──────────────────────────────────────────────────────── */}
      <section className="relative pt-32 pb-20 bg-charcoal-950 overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                'radial-gradient(circle at 30% 20%, rgba(201,168,76,0.15) 0%, transparent 50%), radial-gradient(circle at 70% 80%, rgba(201,168,76,0.1) 0%, transparent 50%)',
            }}
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.p
            initial="hidden"
            animate="visible"
            variants={heroCtas}
            className="text-xs font-body font-semibold uppercase tracking-[0.3em] text-gold-500 mb-4"
          >
            Tampa Bay New Construction
          </motion.p>

          <motion.h1
            initial="hidden"
            animate="visible"
            variants={heroTitle}
            className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-ivory-50 mb-6 leading-tight"
          >
            Events Calendar
          </motion.h1>

          <motion.p
            initial="hidden"
            animate="visible"
            variants={heroSubtitle}
            className="text-lg md:text-xl font-body text-charcoal-400 max-w-3xl mx-auto mb-10 leading-relaxed"
          >
            Exclusive broker events, grand openings, and virtual tours across
            Tampa Bay&apos;s premier developments.
          </motion.p>

          {/* Quick Stats */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={heroCtas}
            className="flex flex-wrap justify-center gap-3"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gold-500/30 bg-gold-500/10 text-sm font-body font-medium text-gold-400">
              <Calendar className="h-4 w-4" />
              {stats.upcoming} Upcoming
            </span>
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-charcoal-700 bg-charcoal-800/50 text-sm font-body font-medium text-charcoal-300">
              {stats.developments} Developments
            </span>
            {stats.totalRegistered > 0 && (
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-sm font-body font-medium text-emerald-400">
                <Users className="h-4 w-4" />
                {stats.totalRegistered}+ Registered
              </span>
            )}
          </motion.div>
        </div>
      </section>

      {/* ─── Filters ──────────────────────────────────────────────────── */}
      <section className="py-6 bg-charcoal-900 border-b border-charcoal-800 sticky top-[72px] md:top-[80px] z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex gap-2 flex-wrap justify-center">
              <FilterPill
                active={filterType === 'all'}
                onClick={() => setFilterType('all')}
              >
                All Events ({allEvents.length})
              </FilterPill>
              <FilterPill
                active={filterType === 'grand-opening'}
                onClick={() => setFilterType('grand-opening')}
              >
                <PartyPopper className="h-3.5 w-3.5" />
                Grand Openings
              </FilterPill>
              <FilterPill
                active={filterType === 'broker-vip'}
                onClick={() => setFilterType('broker-vip')}
              >
                <Briefcase className="h-3.5 w-3.5" />
                Broker Events
              </FilterPill>
              <FilterPill
                active={filterType === 'virtual'}
                onClick={() => setFilterType('virtual')}
              >
                <Video className="h-3.5 w-3.5" />
                Virtual Events
              </FilterPill>
            </div>

            <div className="flex items-center gap-3">
              {/* Add Event button — sales-agent only */}
              {isSalesAgent && selectedDevelopment && (
                <button
                  onClick={() => setShowAddModal(true)}
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-sm bg-gold-500 text-charcoal-900 text-xs font-body font-semibold uppercase tracking-wide hover:bg-gold-400 transition-colors whitespace-nowrap"
                >
                  <Plus className="h-3.5 w-3.5" />
                  Add Event
                </button>
              )}

              <div className="relative w-full md:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-charcoal-500" />
                <input
                  type="text"
                  placeholder="Search events..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-charcoal-800 border border-charcoal-700 text-ivory-100 placeholder:text-charcoal-500 text-sm font-body focus:outline-none focus:ring-2 focus:ring-gold-500/50 focus:border-gold-500/50"
                />
              </div>
            </div>
          </div>

          {/* Nudge for sales-agent without building selected */}
          {isSalesAgent && !selectedDevelopment && (
            <div className="mt-3 px-4 py-2 rounded-sm bg-gold-500/10 border border-gold-500/30 text-center">
              <p className="text-xs font-body text-gold-400">
                Select your building in the navbar to add events for your development.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* ─── Events Grid ──────────────────────────────────────────────── */}
      <section className="py-16 bg-ivory-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredEvents.length === 0 ? (
            <div className="text-center py-16">
              <Calendar className="h-16 w-16 text-charcoal-300 mx-auto mb-4" />
              <h3 className="text-xl font-heading font-bold text-charcoal-900 mb-2">
                No events found
              </h3>
              <p className="text-charcoal-500 font-body">
                Try adjusting your filters or search term
              </p>
            </div>
          ) : (
            <motion.div
              className="grid grid-cols-1 lg:grid-cols-2 gap-6"
              initial="hidden"
              whileInView="visible"
              viewport={defaultViewport}
              variants={staggerContainer}
            >
              {filteredEvents.map((event) => {
                const colors = colorMap[event.color];
                const EventIcon = getEventIcon(event.type);
                const isLocal = localEventIds.has(event.id);

                return (
                  <motion.div
                    key={event.id}
                    variants={staggerItem}
                    className={`rounded-2xl p-6 border-2 ${colors.card} bg-white shadow-lg relative overflow-hidden hover:shadow-xl transition-shadow`}
                  >
                    {/* Decorative circle */}
                    <div
                      className={`absolute top-0 right-0 w-32 h-32 ${colors.icon.split(' ')[0]} rounded-full -mr-16 -mt-16 opacity-30`}
                    />

                    {/* Development link + local badge */}
                    <div className="flex items-center justify-between mb-2">
                      <a
                        href={`/developments/${event.developmentSlug}`}
                        className="inline-block text-sm font-body font-semibold text-charcoal-600 hover:text-gold-600 transition-colors"
                      >
                        {event.developmentName} &rarr;
                      </a>

                      {isLocal && (
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-body font-semibold uppercase tracking-wider text-gold-600 bg-gold-500/10 border border-gold-500/30 px-2 py-0.5 rounded-full">
                            My Event
                          </span>
                          <button
                            onClick={() => removeEvent(event.id)}
                            className="text-charcoal-400 hover:text-red-500 transition-colors p-1"
                            title="Remove event"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Badge */}
                    <div className="mb-4">
                      <span
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-body font-bold ${colors.badge}`}
                      >
                        <EventIcon className="h-3 w-3" />
                        {event.badge}
                      </span>
                    </div>

                    <h3 className="text-2xl font-heading font-bold text-charcoal-900 mb-2">
                      {event.title}
                    </h3>
                    {event.description && (
                      <p className="text-charcoal-600 font-body mb-5 leading-relaxed">
                        {event.description}
                      </p>
                    )}

                    {/* Details rows */}
                    <div className="space-y-3 mb-6">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-10 h-10 rounded-full ${colors.icon} flex items-center justify-center flex-shrink-0`}
                        >
                          <Calendar className="h-5 w-5" />
                        </div>
                        <div>
                          <div className="font-body font-bold text-charcoal-900 text-sm">
                            {event.date}
                          </div>
                          <div className="text-xs font-body text-charcoal-500">
                            {event.time}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <div
                          className={`w-10 h-10 rounded-full ${colors.icon} flex items-center justify-center flex-shrink-0`}
                        >
                          <MapPin className="h-5 w-5" />
                        </div>
                        <div>
                          <div className="font-body font-bold text-charcoal-900 text-sm">
                            {event.location}
                          </div>
                          {event.address && (
                            <div className="text-xs font-body text-charcoal-500">
                              {event.address}
                            </div>
                          )}
                        </div>
                      </div>

                      {event.registered != null && (
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-10 h-10 rounded-full ${colors.icon} flex items-center justify-center flex-shrink-0`}
                          >
                            <Users className="h-5 w-5" />
                          </div>
                          <div>
                            <div className="font-body font-bold text-charcoal-900 text-sm">
                              {event.registered} Registered
                            </div>
                            <div className="text-xs font-body text-charcoal-500">
                              Limited spots remaining
                            </div>
                          </div>
                        </div>
                      )}

                      {event.bonus && (
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-10 h-10 rounded-full ${colors.icon} flex items-center justify-center flex-shrink-0`}
                          >
                            <Gift className="h-5 w-5" />
                          </div>
                          <div>
                            <div className="font-body font-bold text-charcoal-900 text-sm">
                              Broker Incentives
                            </div>
                            <div className="text-xs font-body text-charcoal-500">
                              {event.bonus}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* CTA */}
                    <div className="flex gap-3">
                      <a
                        href="/contact"
                        className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-sm bg-gold-500 text-charcoal-900 text-sm font-body font-semibold uppercase tracking-wide hover:bg-gold-400 transition-colors"
                      >
                        RSVP Now
                      </a>
                      <a
                        href={`/developments/${event.developmentSlug}`}
                        className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-sm border border-charcoal-300 text-charcoal-700 text-sm font-body font-semibold hover:bg-charcoal-100 transition-colors"
                      >
                        Details
                      </a>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          )}
        </div>
      </section>

      {/* ─── CTA Section ──────────────────────────────────────────────── */}
      <section className="py-16 bg-charcoal-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={defaultViewport}
            variants={fadeUp}
          >
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-ivory-50 mb-4">
              Don&apos;t Miss Exclusive Events
            </h2>
            <p className="text-lg font-body text-charcoal-400 mb-8 max-w-2xl mx-auto">
              Get notified about new broker events, grand openings, and VIP
              previews across Tampa Bay new construction.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-sm bg-gold-500 text-charcoal-900 font-body font-semibold uppercase tracking-wide hover:bg-gold-400 transition-colors"
              >
                Subscribe to Calendar
              </a>
              <a
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-sm border border-charcoal-600 text-ivory-200 font-body font-semibold uppercase tracking-wide hover:border-gold-500/50 hover:text-gold-400 transition-colors"
              >
                Contact Sales Team
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── Add Event Modal ────────────────────────────────────────── */}
      {showAddModal && selectedDevelopment && selectedDevelopmentName && (
        <AddEventModal
          developmentSlug={selectedDevelopment}
          developmentName={selectedDevelopmentName}
          onAdd={addEvent}
          onClose={() => setShowAddModal(false)}
        />
      )}
    </main>
  );
}
