'use client';

import Link from 'next/link';

export default function LandingPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-black relative overflow-hidden">
      {/* Background gradient effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
      </div>

      <div className="w-full max-w-2xl mx-auto text-center space-y-8 relative z-10">
        {/* Clearpth Branding */}
        <div className="absolute top-0 left-0 right-0">
          <p className="text-xs text-gray-600 font-light tracking-widest uppercase">
            Clearpth
          </p>
        </div>

        <div className="space-y-4 pt-12">
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
              hover:bg-gray-200 transition-all duration-200
              relative overflow-hidden group
            "
          >
            <span className="relative z-10">Start Assessment</span>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
          </Link>
        </div>

        <p className="text-xs text-gray-600 font-light">
          2 minutes
        </p>
      </div>
    </div>
  );
}
