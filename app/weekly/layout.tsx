import type { Metadata } from 'next';
import { Newsreader } from 'next/font/google';

const newsreader = Newsreader({
  subsets: ['latin'],
  weight: ['400', '600'],
  variable: '--font-newsreader',
});

export const metadata: Metadata = {
  title: 'Weekly | Identity Collapse Index',
  description:
    'This week’s note before the Identity Collapse Index assessment.',
};

export default function WeeklyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className={newsreader.variable}>{children}</div>;
}
