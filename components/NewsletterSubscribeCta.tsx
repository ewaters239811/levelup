import { getBeehiivSubscribeUrl } from '@/lib/beehiivSubscribeUrl';

type NewsletterSubscribeCtaProps = {
  /** `weekly` = card; `landing` = slim link on home; `compact` = one line at page foot. */
  variant?: 'weekly' | 'landing' | 'compact';
};

/** Hides when `NEXT_PUBLIC_BEEHIIV_SUBSCRIBE_URL` is unset. */
export default function NewsletterSubscribeCta({
  variant = 'weekly',
}: NewsletterSubscribeCtaProps) {
  const href = getBeehiivSubscribeUrl();
  if (!href) return null;

  if (variant === 'compact') {
    return (
      <p className="text-center text-[11px] text-[#8e6242]/90 font-normal">
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-2 decoration-[#c2905e]/40 hover:text-[#5b3a24]"
        >
          Newsletter on beehiiv
        </a>
      </p>
    );
  }

  if (variant === 'landing') {
    return (
      <p className="text-xs text-center text-amber-200/65 font-light">
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-amber-100/90 hover:text-amber-50 underline underline-offset-4 decoration-amber-400/40 hover:decoration-amber-200/70 transition-colors"
        >
          Subscribe to weekly notes · beehiiv
        </a>
      </p>
    );
  }

  return (
    <aside
      className="rounded-lg border border-[#e2c3a4] bg-[#fffdf8] px-4 py-4 shadow-sm shadow-amber-900/5"
      aria-label="Newsletter signup"
    >
      <p className="text-xs font-semibold uppercase tracking-wider text-[#8e6242] mb-2">
        Get notes by email
      </p>
      <p className="text-sm text-[#6b4a33] font-normal leading-relaxed mb-3">
        Your beehiiv subscribe page opens in a new tab.
      </p>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="
          inline-flex w-full items-center justify-center px-4 py-2.5 rounded-sm text-sm font-medium uppercase tracking-wide
          bg-[#7a4d2d] text-amber-50 border border-[#5c3a22] shadow-sm shadow-amber-900/15
          transition-colors hover:bg-[#693f27] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#c2905e] focus-visible:ring-offset-2 focus-visible:ring-offset-[#fffdf8]
        "
      >
        Subscribe on beehiiv
      </a>
    </aside>
  );
}
