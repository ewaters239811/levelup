'use client';

import Link from 'next/link';

export default function LandingPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-black">
      <div className="w-full max-w-2xl mx-auto text-center space-y-8">
        <div className="space-y-4">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-light text-white leading-tight tracking-tight">
            Identity Collapse Index
          </h1>
          <p className="text-lg md:text-xl text-gray-400 font-light max-w-xl mx-auto">
            Where your identity is blocking your next level
          </p>
        </div>

        <div className="max-w-lg mx-auto space-y-3 text-gray-500 font-light text-sm leading-relaxed">
          <p>
            Your identity shapes every outcome. When it collapses, you sabotage success without knowing why.
          </p>
          <p>
            This 4-question diagnostic reveals your Identity Collapse Index.
          </p>
        </div>

        <div className="pt-6">
          <Link
            href="/assessment"
            className="
              inline-block px-8 py-3 bg-white text-black
              font-medium text-sm tracking-wide uppercase
              hover:bg-gray-200 transition-colors duration-200
            "
          >
            Start Assessment
          </Link>
        </div>

        <p className="text-xs text-gray-600 font-light">
          2 minutes
        </p>
      </div>
    </div>
  );
}
