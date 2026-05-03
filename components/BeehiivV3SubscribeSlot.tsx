const BEEHIIV_FORMS_ORIGIN = 'https://subscribe-forms.beehiiv.com';

type BeehiivFormApiResponse = {
  form?: {
    id?: string;
    url?: string;
  };
};

function resolveFormId(): string {
  return (
    process.env.BEEHIIV_FORM_ID?.trim() ||
    process.env.NEXT_PUBLIC_BEEHIIV_FORM_ID?.trim() ||
    ''
  );
}

function configUrl(formId: string): string {
  return `${BEEHIIV_FORMS_ORIGIN}/api/v3/forms/${encodeURIComponent(formId)}`;
}

function fallbackSubscribeUrl(formId: string): string {
  return `${BEEHIIV_FORMS_ORIGIN}/v3/forms/${encodeURIComponent(formId)}`;
}

/**
 * beehiiv blocks cross-site iframes (`X-Frame-Options: SAMEORIGIN`), so the form
 * cannot appear inside your page. We load the canonical signup URL from their
 * API and send visitors to that page in a new tab — reliable and supported.
 *
 * Env: `BEEHIIV_FORM_ID` or `NEXT_PUBLIC_BEEHIIV_FORM_ID` (UUID from embed code).
 */
export default async function BeehiivV3SubscribeSlot() {
  const formId = resolveFormId();
  if (!formId) return null;

  let subscribeHref = fallbackSubscribeUrl(formId);
  try {
    const res = await fetch(configUrl(formId), {
      next: { revalidate: 300 },
    });
    if (res.ok) {
      const data = (await res.json()) as BeehiivFormApiResponse;
      const u = data.form?.url?.trim();
      if (u?.startsWith('https://')) subscribeHref = u;
    }
  } catch {
    /* use fallbackSubscribeUrl */
  }

  return (
    <aside
      aria-label="Newsletter signup"
      className="rounded-lg border border-[#e2c3a4] bg-[#fffdf8] px-4 py-4 shadow-sm shadow-amber-900/5"
    >
      <p className="text-xs font-semibold uppercase tracking-wider text-[#8e6242] mb-2">
        Subscribe by email
      </p>
      <p className="text-sm text-[#6b4a33] font-light leading-relaxed mb-4">
        beehiiv only allows this form on their own domain, so signup opens in a
        new tab.
      </p>
      <a
        href={subscribeHref}
        target="_blank"
        rel="noopener noreferrer"
        className="
          inline-flex w-full items-center justify-center px-4 py-2.5 rounded-sm text-sm font-medium uppercase tracking-wide
          bg-[#7a4d2d] text-amber-50 border border-[#5c3a22] shadow-sm shadow-amber-900/15
          transition-colors hover:bg-[#693f27] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#c2905e] focus-visible:ring-offset-2 focus-visible:ring-offset-[#fffdf8]
        "
      >
        Open subscribe form
      </a>
    </aside>
  );
}
