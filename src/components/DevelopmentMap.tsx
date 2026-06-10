'use client';

import { useEffect, useRef } from 'react';
import { type DevelopmentSummary } from '@/data/developments/index';

// County color coding for markers
const countyColors: Record<string, string> = {
  pinellas: '#d4a853',      // gold
  hillsborough: '#6bb5e0',  // blue
  sarasota: '#7dd3a8',      // green
};

interface DevelopmentMapProps {
  developments: DevelopmentSummary[];
}

export default function DevelopmentMap({ developments }: DevelopmentMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);

  // Filter to developments with coordinates
  const mapped = developments.filter((d) => d.coordinates);

  // Calculate center from all coordinates
  const center: [number, number] = mapped.length > 0
    ? [
        mapped.reduce((sum, d) => sum + d.coordinates!.lat, 0) / mapped.length,
        mapped.reduce((sum, d) => sum + d.coordinates!.lng, 0) / mapped.length,
      ]
    : [27.77, -82.64]; // Default: St. Petersburg

  useEffect(() => {
    if (!mapRef.current) return;

    // Guard against React Strict Mode double-mount race condition.
    // The async import can resolve after cleanup runs, so we track
    // cancellation with a local flag the closure captures.
    let cancelled = false;

    // Inject Leaflet CSS if not already present
    if (!document.querySelector('link[href*="leaflet"]')) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
      document.head.appendChild(link);
    }

    // Dynamic import of leaflet only (no react-leaflet)
    import('leaflet').then((L) => {
      // If cleanup already ran (Strict Mode unmount), bail out
      if (cancelled || !mapRef.current) return;

      // If the map was already created (unlikely but defensive), skip
      if (mapInstanceRef.current) return;

      const map = L.default.map(mapRef.current, {
        center: center,
        zoom: 9,
        scrollWheelZoom: true,
      });

      mapInstanceRef.current = map;

      // Dark tile layer (CartoDB dark — free, no API key required)
      L.default.tileLayer(
        'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
        {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> &copy; <a href="https://carto.com/">CARTO</a>',
          subdomains: 'abcd',
          maxZoom: 19,
        },
      ).addTo(map);

      // Add markers for each development
      mapped.forEach((dev) => {
        const color = countyColors[dev.county] ?? '#d4a853';
        const radius = dev.hasPage ? 8 : 6;
        const weight = dev.hasPage ? 2 : 1;

        const marker = L.default.circleMarker(
          [dev.coordinates!.lat, dev.coordinates!.lng],
          {
            radius,
            color,
            fillColor: color,
            fillOpacity: 0.85,
            weight,
            opacity: 1,
          },
        ).addTo(map);

        // Build popup content
        let popupHtml = `<div style="min-width:200px">`;
        popupHtml += `<p style="font-family:'Playfair Display',serif;font-weight:700;font-size:14px;color:#1a1a2e;margin-bottom:4px;line-height:1.3">${dev.name}</p>`;
        popupHtml += `<p style="font-family:'Inter',sans-serif;font-size:11px;color:#666;margin-bottom:6px">${dev.location} &bull; ${dev.statusLabel}</p>`;

        if (dev.price) {
          popupHtml += `<p style="font-family:'Inter',sans-serif;font-weight:600;font-size:12px;color:#b8942f;margin-bottom:4px">${dev.price}</p>`;
        }

        if (dev.units > 0) {
          popupHtml += `<p style="font-family:'Inter',sans-serif;font-size:11px;color:#888">${dev.units} units &bull; Delivery: ${dev.delivery}</p>`;
        }

        if (dev.hasPage) {
          popupHtml += `<a href="/developments/${dev.slug}" style="display:inline-block;margin-top:8px;padding:4px 10px;background-color:#d4a853;color:#1a1a2e;font-family:'Inter',sans-serif;font-size:10px;font-weight:600;text-transform:uppercase;letter-spacing:0.05em;text-decoration:none;border-radius:2px">View Report</a>`;
        }

        popupHtml += `</div>`;
        marker.bindPopup(popupHtml);
      });
    });

    // Cleanup on unmount
    return () => {
      cancelled = true;
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="w-full h-[600px] rounded-sm overflow-hidden border border-charcoal-800 relative">
      {/* Legend */}
      <div className="absolute top-3 right-3 z-[1000] bg-charcoal-900/95 backdrop-blur-sm border border-charcoal-700 rounded-sm p-3">
        <p className="text-[10px] font-body font-semibold uppercase tracking-widest text-charcoal-400 mb-2">
          Counties
        </p>
        {Object.entries({ pinellas: 'Pinellas', hillsborough: 'Hillsborough', sarasota: 'Sarasota' }).map(
          ([key, label]) => (
            <div key={key} className="flex items-center gap-2 mb-1 last:mb-0">
              <div
                className="w-2.5 h-2.5 rounded-full"
                style={{ backgroundColor: countyColors[key] }}
              />
              <span className="text-xs font-body text-ivory-200">{label}</span>
            </div>
          ),
        )}
      </div>

      {/* Map container */}
      <div ref={mapRef} style={{ height: '100%', width: '100%' }} />
    </div>
  );
}
