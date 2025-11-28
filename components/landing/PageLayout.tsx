'use client';

import { ReactNode } from 'react';

interface PageLayoutProps {
  children: ReactNode;
}

export default function PageLayout({ children }: PageLayoutProps) {
  return (
    <main className="
      min-h-screen
      bg-gradient-to-br from-[#faf8f6] via-[#f5f1ec] to-[#faf8f6]
      relative overflow-hidden
    ">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none">
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: `
              radial-gradient(circle at 20% 30%, rgba(212, 175, 55, 0.1) 0%, transparent 50%),
              radial-gradient(circle at 80% 70%, rgba(130, 106, 84, 0.1) 0%, transparent 50%),
              radial-gradient(circle at 50% 50%, rgba(212, 175, 55, 0.05) 0%, transparent 50%)
            `,
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </main>
  );
}

