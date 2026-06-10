'use client';

import Script from 'next/script';

/**
 * Common Room "Signals" web-tracking — de-anonymizes site visitors (resolves
 * anonymous traffic to people/companies via Common Room's identity graph) and
 * records page visits + form/identify events.
 *
 * Set NEXT_PUBLIC_COMMONROOM_SIGNALS_KEY (from Common Room → Settings → Signals)
 * to turn it on. Unset → renders nothing.
 */
export default function CommonRoomSignals() {
  const key = process.env.NEXT_PUBLIC_COMMONROOM_SIGNALS_KEY;
  if (!key) return null;

  return (
    <Script
      id="commonroom-signals"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `(function(){
  if (typeof window === 'undefined') return;
  if (typeof window.signals !== 'undefined') return;
  var s = document.createElement('script');
  s.src = 'https://cdn.cr-relay.com/v1/site/${key}/signals.js';
  s.async = true;
  window.signals = Object.assign(
    [],
    ['page','identify','form'].reduce(function (acc, m) {
      acc[m] = function () { window.signals.push([m, arguments]); return window.signals; };
      return acc;
    }, {})
  );
  document.head.appendChild(s);
})();`,
      }}
    />
  );
}
