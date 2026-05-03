'use client';

import { useLayoutEffect, useRef } from 'react';

type BeehiivV3SubscribeEmbedProps = {
  formId: string;
  loaderHref: string;
};

/**
 * beehiiv V3: `<script src="loader.js" data-beehiiv-form="…">` in-document.
 *
 * Dynamically injected async scripts often leave `document.currentScript` unset
 * when the loader runs, which breaks `API_BASE` inside beehiiv’s bundle
 * (`fetch('/api/v3/forms/…')` against your domain). **`async = false`** keeps
 * the executing script identifiable so config loads from subscribe-forms hosts.
 *
 * Props are supplied by {@link BeehiivV3SubscribeSlot} so IDs don’t rely on
 * client-only env inlining quirks.
 */
export default function BeehiivV3SubscribeEmbed({
  formId,
  loaderHref,
}: BeehiivV3SubscribeEmbedProps) {
  const hostRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const id = formId.trim();
    const el = hostRef.current;
    if (!id || !el) return;

    if (el.querySelector(`script[data-beehiiv-form="${id}"]`)) return;

    const script = document.createElement('script');
    script.type = 'text/javascript';
    /** See note above — required for beehiiv’s `document.currentScript` usage. */
    script.async = false;
    script.src = loaderHref;
    script.setAttribute('data-beehiiv-form', id);
    el.appendChild(script);
  }, [formId, loaderHref]);

  return (
    <aside
      aria-label="Newsletter signup form"
      className="rounded-lg border border-[#e2c3a4] bg-[#fffdf8] px-4 py-4 shadow-sm shadow-amber-900/5"
    >
      <p className="text-xs font-semibold uppercase tracking-wider text-[#8e6242] mb-3">
        Subscribe by email
      </p>
      {/* Don’t clip: inline iframe starts height 0 until postMessage */}
      <div ref={hostRef} className="w-full min-h-[6rem]" />
    </aside>
  );
}
