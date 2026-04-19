import type { Metadata } from 'next';

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
  return children;
}
