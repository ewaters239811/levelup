'use client';

import { useLayoutEffect, useRef } from 'react';

function normalizeBeehiivScriptUrl(raw: string | undefined): string | null {
  if (!raw) return null;
  let u = raw.trim();
  if (
    (u.startsWith('"') && u.endsWith('"')) ||
    (u.startsWith("'") && u.endsWith("'"))
  ) {
    u = u.slice(1, -1).trim();
  }
  if (!u.startsWith('http')) return null;
  // Common mistake: use the form embed URL, not attribution.js
  if (u.includes('attribution.js')) return null;
  return u;
}

const SCRIPT_URL = normalizeBeehiivScriptUrl(
  process.env.NEXT_PUBLIC_BEEHIIV_SUBSCRIBE_SCRIPT_URL,
);

/**
 * Inline Beehiiv subscribe form.
 *
 * In Beehiiv: Subscribers → Subscribe forms → your form → Get embed code.
 * Set layout to **Inline** if you want the form in this box. Copy the script’s
 * `src` URL and put it in `NEXT_PUBLIC_BEEHIIV_SUBSCRIBE_SCRIPT_URL`.
 *
 * Popup / slide / sticky layouts still use the same script; Beehiiv positions
 * them on the page — you can place this component near the bottom of the page.
 *
 * When `NEXT_PUBLIC_BEEHIIV_SUBSCRIBE_SCRIPT_URL` is set, `app/layout.tsx` also
 * loads Beehiiv’s attribution script (`subscribe-forms.beehiiv.com/attribution.js`)
 * for UTM forwarding.
 */
export default function BeehiivSubscribeEmbed() {
  const containerRef = useRef<HTMLDivElement>(null);

  // useLayoutEffect + no cleanup: Beehiiv's embed.js sets a global singleton
  // (`beehiivEmbedLoaded`). React Strict Mode runs effects twice; removing the
  // script in cleanup can abort the first load so the second load skips init.
  useLayoutEffect(() => {
    const url = normalizeBeehiivScriptUrl(
      process.env.NEXT_PUBLIC_BEEHIIV_SUBSCRIBE_SCRIPT_URL,
    );
    if (!url || typeof window === 'undefined') return;

    const el = containerRef.current;
    if (!el) return;

    if (el.querySelector('script[src*="beehiiv.com"]')) return;

    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.async = true;
    script.src = url;
    el.appendChild(script);
  }, []);

  if (!SCRIPT_URL?.trim()) {
    return null;
  }

  return (
    <section
      className="rounded-lg border border-[#e2c3a4] bg-[#fffdf8] px-4 py-4 shadow-sm shadow-amber-900/5"
      aria-label="Newsletter signup"
    >
      <p className="text-xs font-semibold uppercase tracking-wider text-[#8e6242] mb-3">
        Get the weekly note by email
      </p>
      <div
        ref={containerRef}
        className="min-h-[12rem] w-full overflow-visible"
        data-beehiiv-inline-host
      />
    </section>
  );
}
