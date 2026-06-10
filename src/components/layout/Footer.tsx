'use client';

import { pinellasDevelopments, hillsboroughDevelopments } from '@/data/market';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-charcoal-950 text-ivory-300">
      {/* Ready to Stay Ahead CTA */}
      <div className="border-b border-charcoal-800">
        <div className="container-luxury py-16 md:py-20">
          <div className="max-w-2xl mx-auto text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-px w-8 bg-gold-500" />
              <span className="text-gold-500 text-xs font-body font-semibold uppercase tracking-[0.2em]">
                Stay Ahead
              </span>
              <div className="h-px w-8 bg-gold-500" />
            </div>
            <h3 className="text-2xl md:text-3xl font-heading font-bold text-ivory-50 mb-8">
              Ready to Stay Ahead of the Market?
            </h3>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="/developments"
                className="px-8 py-3.5 bg-gold-500 text-charcoal-900 text-sm font-body font-semibold uppercase tracking-wide rounded-sm hover:bg-gold-400 transition-all"
              >
                Browse Developments
              </a>
              <a
                href="/contact"
                className="px-8 py-3.5 border border-ivory-400 text-ivory-200 text-sm font-body font-semibold uppercase tracking-wide rounded-sm hover:bg-ivory-50/10 hover:border-gold-500/50 transition-all"
              >
                Get Report Access
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Grid */}
      <div className="container-luxury py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="mb-4">
              <span className="text-lg font-heading font-bold text-ivory-50">Tampa Bay</span>
              <br />
              <span className="text-xs font-body text-gold-500 uppercase tracking-[0.25em]">
                Market Report
              </span>
            </div>
            <p className="text-xs font-body text-charcoal-500 leading-relaxed">
              Cutting through the noise. Your centralized resource for Tampa Bay new development
              market intelligence.
            </p>
          </div>

          {/* Pinellas Developments */}
          <div>
            <h4 className="text-xs font-body font-semibold uppercase tracking-widest text-ivory-50 mb-4">
              Pinellas County
            </h4>
            <ul className="space-y-2.5">
              {pinellasDevelopments.map((dev) => (
                <li key={dev.slug}>
                  {dev.hasPage ? (
                    <a
                      href={`/developments/${dev.slug}`}
                      className="text-sm font-body text-ivory-400 hover:text-gold-500 transition-colors"
                    >
                      {dev.name}
                    </a>
                  ) : (
                    <span className="text-sm font-body text-charcoal-600 flex items-center gap-2">
                      {dev.name}
                      <span className="text-[10px] font-body uppercase tracking-wider text-charcoal-600 border border-charcoal-700 rounded-sm px-1.5 py-0.5">
                        {dev.statusLabel}
                      </span>
                    </span>
                  )}
                </li>
              ))}
            </ul>

            <h4 className="text-xs font-body font-semibold uppercase tracking-widest text-ivory-50 mb-4 mt-8">
              Hillsborough County
            </h4>
            <ul className="space-y-2.5">
              {hillsboroughDevelopments.map((dev) => (
                <li key={dev.slug}>
                  {dev.hasPage ? (
                    <a
                      href={`/developments/${dev.slug}`}
                      className="text-sm font-body text-ivory-400 hover:text-gold-500 transition-colors"
                    >
                      {dev.name}
                    </a>
                  ) : (
                    <span className="text-sm font-body text-charcoal-600 flex items-center gap-2">
                      {dev.name}
                      <span className="text-[10px] font-body uppercase tracking-wider text-charcoal-600 border border-charcoal-700 rounded-sm px-1.5 py-0.5">
                        {dev.statusLabel}
                      </span>
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-xs font-body font-semibold uppercase tracking-widest text-ivory-50 mb-4">
              Resources
            </h4>
            <ul className="space-y-2.5">
              <li>
                <a href="/#market-data" className="text-sm font-body text-ivory-400 hover:text-gold-500 transition-colors">
                  Market Data
                </a>
              </li>
              <li>
                <a href="/#methodology" className="text-sm font-body text-ivory-400 hover:text-gold-500 transition-colors">
                  Methodology
                </a>
              </li>
              <li>
                <a href="/about" className="text-sm font-body text-ivory-400 hover:text-gold-500 transition-colors">
                  About
                </a>
              </li>
              <li>
                <a href="/contact" className="text-sm font-body text-ivory-400 hover:text-gold-500 transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs font-body font-semibold uppercase tracking-widest text-ivory-50 mb-4">
              Connect
            </h4>
            <p className="text-sm font-body text-ivory-400 mb-2">Brian Sprague</p>
            <p className="text-sm font-body text-ivory-400 mb-4">Tampa Bay Real Estate</p>
            <a
              href="/contact"
              className="inline-block text-sm font-body font-semibold text-gold-500 hover:text-gold-400 transition-colors uppercase tracking-wide"
            >
              Get In Touch &rarr;
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-charcoal-800">
        <div className="container-luxury py-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs font-body text-charcoal-600">
            &copy; {currentYear} Tampa Bay Market Report. All rights reserved.
          </p>
          <p className="text-[10px] font-body text-charcoal-700 leading-relaxed max-w-2xl text-center md:text-right">
            Market data is compiled from MLS (Stellar MLS), developer disclosures,
            and proprietary broker research for informational
            purposes only. This content does not constitute a solicitation, offering, or investment
            advice. All figures should be independently verified before making purchase decisions.
            Market conditions are subject to change. Brian Sprague is a licensed Florida real estate
            professional.
          </p>
        </div>
      </div>
    </footer>
  );
}
