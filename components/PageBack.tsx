import Link from 'next/link';

type PageBackProps = {
  /** Defaults to home. */
  href?: string;
  className?: string;
  /** `light` for reader-style (pale) pages so contrast stays strong. */
  tone?: 'dark' | 'light';
};

const toneClasses: Record<NonNullable<PageBackProps['tone']>, string> = {
  dark: 'text-amber-200/60 hover:text-amber-100 focus-visible:ring-amber-300/70',
  light:
    'text-neutral-600 hover:text-neutral-950 focus-visible:ring-neutral-400',
};

export default function PageBack({
  href = '/',
  className = '',
  tone = 'dark',
}: PageBackProps) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center gap-2 text-sm font-light transition-colors focus:outline-none focus-visible:ring-1 rounded-sm ${toneClasses[tone]} ${className}`}
    >
      <span aria-hidden="true">←</span>
      Back
    </Link>
  );
}
