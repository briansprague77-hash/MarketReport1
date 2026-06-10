'use client';

import { useState, useEffect, useCallback } from 'react';
import type { MarketEvent } from '@/data/events';

const STORAGE_KEY = 'tbmr-agent-events';

/**
 * Hook for managing locally-created events (sales-agent tier).
 * Events are stored in localStorage and scoped to a development.
 * They merge with the static events array for display.
 */
export function useLocalEvents() {
  const [localEvents, setLocalEvents] = useState<MarketEvent[]>([]);
  const [mounted, setMounted] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setLocalEvents(JSON.parse(stored));
      }
    } catch {
      // Ignore parse errors
    }
    setMounted(true);
  }, []);

  // Persist to localStorage whenever events change
  const persist = useCallback((events: MarketEvent[]) => {
    setLocalEvents(events);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(events));
  }, []);

  const addEvent = useCallback(
    (event: Omit<MarketEvent, 'id'>) => {
      const newEvent: MarketEvent = {
        ...event,
        id: Date.now(), // Use timestamp as unique ID to avoid collisions with static events
      };
      persist([...localEvents, newEvent]);
      return newEvent;
    },
    [localEvents, persist],
  );

  const removeEvent = useCallback(
    (id: number) => {
      persist(localEvents.filter((e) => e.id !== id));
    },
    [localEvents, persist],
  );

  const getEventsForDevelopment = useCallback(
    (slug: string) => localEvents.filter((e) => e.developmentSlug === slug),
    [localEvents],
  );

  return {
    localEvents: mounted ? localEvents : [],
    addEvent,
    removeEvent,
    getEventsForDevelopment,
    mounted,
  };
}
