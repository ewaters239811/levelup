import Link from 'next/link';

type PageBackProps = {
  /** Defaults to home. */
  href?: string;
  className?: string;
};

export default function PageBack({
  href = '/',
  className = '',
}: PageBackProps) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center gap-2 text-sm font-light text-gray-500 hover:text-gray-300 transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-gray-500 rounded-sm ${className}`}
    >
      <span aria-hidden="true">←</span>
      Back
    </Link>
  );
}
