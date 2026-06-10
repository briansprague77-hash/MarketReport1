'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

const navLinks = [
  { href: '/developments', label: 'Developments', matchPaths: ['/developments'] },
  { href: '/market-report', label: 'Market Data', matchPaths: ['/market-report'] },
  { href: '/resale-market', label: 'Resale Market', matchPaths: ['/resale-market'] },
  { href: '/realtor-resources', label: 'Realtor Resources', matchPaths: ['/realtor-resources'] },
  { href: '/events', label: 'Events', matchPaths: ['/events'] },
  { href: '/about', label: 'About', matchPaths: ['/about'] },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  function isActive(link: (typeof navLinks)[number]): boolean {
    if (pathname === link.href) return true;
    return link.matchPaths.some((p) => pathname.startsWith(p));
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-charcoal-950/95 backdrop-blur-lg shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <div className="container-luxury flex items-center justify-between h-18 md:h-20">
        {/* Logo */}
        <a href="/" className="flex items-center gap-3">
          <div className="flex flex-col">
            <span className="text-sm md:text-base font-heading font-bold text-ivory-50 tracking-wide leading-tight">
              Tampa Bay
            </span>
            <span className="text-[10px] md:text-xs font-body font-medium text-gold-500 uppercase tracking-[0.25em]">
              Market Report
            </span>
          </div>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`text-sm font-body font-medium transition-colors tracking-wide ${
                isActive(link)
                  ? 'text-gold-500'
                  : 'text-ivory-300 hover:text-gold-500'
              }`}
            >
              {link.label}
              {isActive(link) && (
                <span className="block h-0.5 mt-0.5 bg-gold-500 rounded-full" />
              )}
            </a>
          ))}

          <a
            href="/contact"
            className={`text-sm font-body font-semibold px-5 py-2.5 rounded-sm transition-all tracking-wide uppercase ${
              pathname === '/contact'
                ? 'bg-gold-400 text-charcoal-900 shadow-glow-gold'
                : 'text-charcoal-900 bg-gold-500 hover:bg-gold-400'
            }`}
          >
            Contact
          </a>
        </nav>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-ivory-50 p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {mobileOpen ? (
              <path d="M6 6l12 12M6 18L18 6" />
            ) : (
              <path d="M3 6h18M3 12h18M3 18h18" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-charcoal-950/98 backdrop-blur-xl border-t border-charcoal-800">
          <nav className="container-luxury py-6 flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`text-base font-body py-2 transition-colors ${
                  isActive(link)
                    ? 'text-gold-500 font-semibold'
                    : 'text-ivory-200 hover:text-gold-500'
                }`}
              >
                {link.label}
              </a>
            ))}

            <a
              href="/contact"
              className={`text-base font-body font-semibold px-5 py-3 rounded-sm text-center mt-2 uppercase tracking-wide ${
                pathname === '/contact'
                  ? 'bg-gold-400 text-charcoal-900'
                  : 'text-charcoal-900 bg-gold-500'
              }`}
            >
              Contact
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
