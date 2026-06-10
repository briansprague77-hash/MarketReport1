'use client';

import { useState, useEffect, useRef, useMemo } from 'react';

/* ─── Public Types ──────────────────────────────────────────────── */
export interface TabDef {
  /** Primary section id — used as scroll-to target */
  id: string;
  /** Short label shown in the tab bar (keep ≤ 10 chars) */
  label: string;
  /** Additional section ids this tab "covers" for active-state detection.
   *  Example: a "Building" tab can cover ['building','amenities','features'] */
  covers?: string[];
}

interface StickyTabNavProps {
  /** Ordered list of tabs to render */
  tabs: TabDef[];
  /** Optional: development name shown on the left (desktop only) */
  title?: string;
}

/* ─── Component ─────────────────────────────────────────────────── */
export default function StickyTabNav({ tabs, title }: StickyTabNavProps) {
  const [activeTab, setActiveTab] = useState(tabs[0]?.id ?? '');
  const [isVisible, setIsVisible] = useState(false);
  const scrollRef = useRef<HTMLElement>(null);

  // Build a reverse-map: sectionId → tabId (for IntersectionObserver)
  const sectionToTab = useMemo(() => {
    const map: Record<string, string> = {};
    tabs.forEach((t) => {
      map[t.id] = t.id;
      t.covers?.forEach((sec) => {
        map[sec] = t.id;
      });
    });
    return map;
  }, [tabs]);

  /* ── Scroll spy + visibility ── */
  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 500);
    };

    const observerCallback: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const tabId = sectionToTab[entry.target.id];
          if (tabId) setActiveTab(tabId);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      rootMargin: '-20% 0px -60% 0px',
      threshold: 0,
    });

    // Observe all section IDs (primary + covers)
    Object.keys(sectionToTab).forEach((secId) => {
      const el = document.getElementById(secId);
      if (el) observer.observe(el);
    });

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // check initial position

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, [sectionToTab]);

  /* ── Auto-scroll nav to keep active tab centred ── */
  useEffect(() => {
    if (!scrollRef.current) return;
    const btn = scrollRef.current.querySelector(`[data-tab="${activeTab}"]`) as HTMLElement | null;
    if (!btn) return;
    const nav = scrollRef.current;
    nav.scrollTo({
      left: btn.offsetLeft - nav.offsetWidth / 2 + btn.offsetWidth / 2,
      behavior: 'smooth',
    });
  }, [activeTab]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  if (tabs.length === 0) return null;

  return (
    <div
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        isVisible
          ? 'translate-y-[72px] md:translate-y-[80px] opacity-100'
          : '-translate-y-full opacity-0 pointer-events-none'
      }`}
    >
      <div className="bg-white/95 backdrop-blur-lg border-b border-charcoal-200/60 shadow-[0_1px_3px_rgba(0,0,0,0.06)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center gap-6">
          {/* Development name — desktop only */}
          {title && (
            <span className="hidden lg:block shrink-0 font-heading text-sm text-charcoal-900 tracking-wide border-r border-charcoal-200/60 pr-6 py-3">
              {title}
            </span>
          )}

          {/* Tab bar */}
          <nav
            ref={scrollRef}
            className="flex items-center gap-0.5 overflow-x-auto scrollbar-hide -mx-1 flex-1"
          >
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  data-tab={tab.id}
                  onClick={() => scrollToSection(tab.id)}
                  className={`
                    shrink-0 px-3.5 py-3 text-[11px] font-body font-semibold uppercase tracking-wider
                    transition-all duration-200 border-b-2 whitespace-nowrap
                    ${isActive
                      ? 'text-gold-600 border-gold-500'
                      : 'text-charcoal-400 border-transparent hover:text-charcoal-700 hover:border-charcoal-200'
                    }
                  `}
                >
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>
      </div>
    </div>
  );
}
