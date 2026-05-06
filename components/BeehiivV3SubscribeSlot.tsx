const BEEHIIV_FORMS_ORIGIN = 'https://subscribe-forms.beehiiv.com';

type BeehiivFormApiResponse = {
  form?: {
    id?: string;
    url?: string;
  };
};

async function resolveSubscribeHref(): Promise<string | null> {
  const formId =
    process.env.BEEHIIV_FORM_ID?.trim() ||
    process.env.NEXT_PUBLIC_BEEHIIV_FORM_ID?.trim() ||
    '';
  if (!formId) return null;

  let subscribeHref = `${BEEHIIV_FORMS_ORIGIN}/v3/forms/${encodeURIComponent(formId)}`;
  try {
    const res = await fetch(
      `${BEEHIIV_FORMS_ORIGIN}/api/v3/forms/${encodeURIComponent(formId)}`,
      {
        next: { revalidate: 300 },
      },
    );
    if (res.ok) {
      const data = (await res.json()) as BeehiivFormApiResponse;
      const u = data.form?.url?.trim();
      if (u?.startsWith('https://')) subscribeHref = u;
    }
  } catch {
    /* use fallback */
  }
  return subscribeHref;
}

function SubscribeButton({
  href,
  size = 'normal',
}: {
  href: string;
  size?: 'normal' | 'small';
}) {
  const sz =
    size === 'small'
      ? 'w-full rounded-sm border border-[#5c3a22] bg-[#7a4d2d] px-2.5 py-2 text-[11px] font-semibold min-h-[2.25rem] sm:w-auto sm:min-h-0 sm:py-1'
      : 'w-full rounded-sm border border-[#5c3a22] bg-[#7a4d2d] px-3 py-2 text-xs font-medium sm:w-auto sm:min-w-[6.5rem] sm:py-1.5';
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex shrink-0 items-center justify-center text-center text-amber-50 shadow-sm shadow-amber-900/10 transition-colors hover:bg-[#693f27] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#c2905e] focus-visible:ring-offset-1 focus-visible:ring-offset-[#fffaf2] ${sz}`}
    >
      Subscribe
    </a>
  );
}

/**
 * beehiiv signup opens in new tab (`X-Frame-Options`).
 *
 * Env: `BEEHIIV_FORM_ID` or `NEXT_PUBLIC_BEEHIIV_FORM_ID`.
 *
 * - `strip` — above-the-fold ribbon (skimmers).
 * - `compact` — end-of-article row (completion / before next CTA).
 * - default — larger card if used elsewhere.
 */
export default async function BeehiivV3SubscribeSlot({
  variant = 'default',
}: {
  variant?: 'default' | 'compact' | 'strip';
} = {}) {
  const subscribeHref = await resolveSubscribeHref();
  if (!subscribeHref) return null;

  if (variant === 'strip') {
    return (
      <aside aria-label="Newsletter signup">
        <div className="flex flex-col gap-2.5 rounded-lg border border-[#dcc8a8] bg-gradient-to-r from-[#faf3e9] to-[#f7ecde] px-3 py-2.5 shadow-sm shadow-amber-900/5 sm:flex-row sm:items-center sm:justify-between sm:gap-3 sm:py-2">
          <p className="text-center text-[11px] font-medium leading-snug text-[#5b3d2a] sm:text-left sm:text-xs">
            Get weekly notes like this—in your inbox.
          </p>
          <SubscribeButton href={subscribeHref} size="small" />
        </div>
      </aside>
    );
  }

  if (variant === 'compact') {
    return (
      <aside aria-label="Newsletter signup">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between sm:gap-3">
          <p className="text-center text-xs font-normal leading-snug text-[#6b4a33] sm:text-left">
            Subscribe for weekly newsletters here.
          </p>
          <SubscribeButton href={subscribeHref} size="normal" />
        </div>
      </aside>
    );
  }

  return (
    <aside
      aria-label="Newsletter signup"
      className="rounded-lg border border-[#e2c3a4] bg-[#fffdf8] px-4 py-4 shadow-sm shadow-amber-900/5"
    >
      <p className="mb-4 text-sm font-normal leading-relaxed text-[#6b4a33]">
        Subscribe for weekly newsletters here.
      </p>
      <a
        href={subscribeHref}
        target="_blank"
        rel="noopener noreferrer"
        className="
          inline-flex w-full items-center justify-center rounded-sm border border-[#5c3a22] bg-[#7a4d2d]
          px-4 py-2.5 text-sm font-medium tracking-wide text-amber-50 shadow-sm shadow-amber-900/15
          transition-colors hover:bg-[#693f27] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#c2905e]
          focus-visible:ring-offset-2 focus-visible:ring-offset-[#fffdf8]
        "
      >
        Subscribe
      </a>
    </aside>
  );
}
