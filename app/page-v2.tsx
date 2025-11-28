'use client';

import { useState } from 'react';
import { IntakeMode } from '@/types/intake';

type AppState = 'landing' | 'quickMode' | 'deepMode' | 'confirmation' | 'result';

export default function Home() {
  const [state, setState] = useState<AppState>('landing');
  const [intakeMode, setIntakeMode] = useState<IntakeMode | null>(null);

  const handleModeSelect = (mode: IntakeMode) => {
    setIntakeMode(mode);
    setState(mode === 'quick' ? 'quickMode' : 'deepMode');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <main className="min-h-screen bg-[#faf8f6] text-[#463b32] relative overflow-hidden">
      {/* Landing Section */}
      {state === 'landing' && (
        <section className="min-h-screen flex items-center justify-center px-4 py-20 relative z-10">
          <div className="w-full max-w-5xl mx-auto">
            {/* Header */}
            <div className="text-center space-y-6 mb-16">
              <div className="inline-block px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-[#e8dfd5] mb-4">
                <p className="text-xs uppercase tracking-[0.3em] text-[#826a54] font-medium">
                  CLEARPTH.IO
                </p>
              </div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-light leading-tight tracking-tight">
                <span className="text-[#463b32]">Intake System</span>
                <br />
                <span className="text-[#826a54]">2.0</span>
              </h1>
              <p className="text-lg md:text-xl text-[#826a54]/80 max-w-2xl mx-auto leading-relaxed font-light">
                Discover your archetype through two powerful pathways
              </p>
            </div>

            {/* Mode Selection Cards */}
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {/* Quick Mode Card */}
              <div className="card card-hover p-8 cursor-pointer group" onClick={() => handleModeSelect('quick')}>
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-[#826a54]/10 flex items-center justify-center group-hover:bg-[#826a54]/20 transition-colors">
                    <svg className="w-6 h-6 text-[#826a54]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-light text-[#463b32]">Quick Mode</h2>
                  <p className="text-[#826a54]/80 font-light leading-relaxed">
                    Fast, structured assessment with multi-select and rank-order questions. Perfect for a quick archetype determination.
                  </p>
                  <div className="pt-4">
                    <span className="text-sm text-[#826a54] font-medium group-hover:translate-x-1 transition-transform inline-block">
                      Start Quick Mode →
                    </span>
                  </div>
                </div>
              </div>

              {/* Deep Mode Card */}
              <div className="card card-hover p-8 cursor-pointer group" onClick={() => handleModeSelect('deep')}>
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-[#826a54]/10 flex items-center justify-center group-hover:bg-[#826a54]/20 transition-colors">
                    <svg className="w-6 h-6 text-[#826a54]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-light text-[#463b32]">Deep Mode</h2>
                  <p className="text-[#826a54]/80 font-light leading-relaxed">
                    AI-powered conversation analysis with voice-to-text support. Comprehensive archetype mapping with shadow work and alchemical stages.
                  </p>
                  <div className="pt-4">
                    <span className="text-sm text-[#826a54] font-medium group-hover:translate-x-1 transition-transform inline-block">
                      Start Deep Mode →
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer Note */}
            <div className="text-center mt-16">
              <p className="text-sm text-[#826a54]/60 font-light">
                Both modes lead to comprehensive archetype insights
              </p>
            </div>
          </div>
        </section>
      )}

      {/* Quick Mode - Placeholder */}
      {state === 'quickMode' && (
        <section className="min-h-screen px-4 py-20">
          <div className="w-full max-w-4xl mx-auto">
            <p className="text-center text-[#826a54]">Quick Mode - Coming Soon</p>
            <button
              onClick={() => setState('landing')}
              className="mt-8 px-6 py-3 bg-[#826a54] text-white rounded-lg hover:bg-[#9d8169] transition-colors"
            >
              Back to Home
            </button>
          </div>
        </section>
      )}

      {/* Deep Mode - Placeholder */}
      {state === 'deepMode' && (
        <section className="min-h-screen px-4 py-20">
          <div className="w-full max-w-4xl mx-auto">
            <p className="text-center text-[#826a54]">Deep Mode - Coming Soon</p>
            <button
              onClick={() => setState('landing')}
              className="mt-8 px-6 py-3 bg-[#826a54] text-white rounded-lg hover:bg-[#9d8169] transition-colors"
            >
              Back to Home
            </button>
          </div>
        </section>
      )}
    </main>
  );
}

