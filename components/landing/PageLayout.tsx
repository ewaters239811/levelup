'use client';

import { ReactNode } from 'react';

export default function PageLayout({ children }: { children: ReactNode }) {
  return (
    <main className="
      min-h-screen
      bg-gradient-to-br from-[#0a0a0a] via-[#1a0f1a] to-[#0a0a0a]
      relative overflow-hidden
    ">
      {/* Mystical background pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: `
              radial-gradient(circle at 20% 30%, rgba(212, 175, 55, 0.15) 0%, transparent 50%),
              radial-gradient(circle at 80% 70%, rgba(139, 92, 246, 0.1) 0%, transparent 50%),
              radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.08) 0%, transparent 50%)
            `,
          }}
        />
      </div>

      {/* Subtle grid overlay */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{
        backgroundImage: `
          linear-gradient(rgba(212, 175, 55, 0.1) 1px, transparent 1px),
          linear-gradient(90deg, rgba(212, 175, 55, 0.1) 1px, transparent 1px)
        `,
        backgroundSize: '60px 60px'
      }}></div>

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </main>
  );
}

