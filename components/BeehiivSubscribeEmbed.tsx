'use client';

import { useEffect, useRef } from 'react';

const SCRIPT_URL = process.env.NEXT_PUBLIC_BEEHIIV_SUBSCRIBE_SCRIPT_URL;

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

  useEffect(() => {
    const url = process.env.NEXT_PUBLIC_BEEHIIV_SUBSCRIBE_SCRIPT_URL;
    if (!url || typeof window === 'undefined') return;

    const el = containerRef.current;
    if (!el) return;

    const already = el.querySelector('script[data-beehiiv-app-embed]');
    if (already) return;

    const script = document.createElement('script');
    script.async = true;
    script.src = url;
    script.dataset.beehiivAppEmbed = '1';
    el.appendChild(script);

    return () => {
      el.replaceChildren();
    };
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
      <div ref={containerRef} className="min-h-[4rem] w-full" />
    </section>
  );
}
