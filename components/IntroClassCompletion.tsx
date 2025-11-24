'use client';

import { useEffect, useState } from 'react';

interface IntroClassCompletionProps {
  archetypeName: string;
  onClose?: () => void;
}

export default function IntroClassCompletion({ archetypeName, onClose }: IntroClassCompletionProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [showCheckmark, setShowCheckmark] = useState(false);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Stagger animations
    setIsVisible(true);
    setTimeout(() => setShowCheckmark(true), 300);
    setTimeout(() => setShowContent(true), 800);
  }, []);

  return (
    <div className="fixed inset-0 bg-[#0a0a0a] z-50 flex items-center justify-center px-4">
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-cyan-400/10"
              style={{
                width: `${Math.random() * 4 + 2}px`,
                height: `${Math.random() * 4 + 2}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${Math.random() * 3 + 2}s`,
              }}
              className="animate-float"
          />
        ))}
      </div>

      <div
        className={`
          relative z-10 w-full max-w-3xl text-center space-y-8
          transition-all duration-1000 ease-out
          ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
        `}
      >
        {/* Animated checkmark */}
        <div className="flex justify-center">
          <div
            className={`
              relative w-24 h-24 md:w-32 md:h-32
              transition-all duration-700 ease-out
              ${showCheckmark ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}
            `}
          >
            {/* Outer ring animation */}
            <div className="absolute inset-0 rounded-full border-4 border-cyan-400/30 animate-ping" />
            <div className="absolute inset-2 rounded-full border-4 border-cyan-400/50 animate-pulse" />
            
            {/* Checkmark circle */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center shadow-[0_0_40px_rgba(6,182,212,0.5)]">
              <svg
                className="w-12 h-12 md:w-16 md:h-16 text-black"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="3"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div
          className={`
            space-y-6
            transition-all duration-1000 ease-out delay-300
            ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}
          `}
        >
          <div className="space-y-4">
            <p className="text-sm uppercase tracking-[0.3em] text-cyan-400 font-medium">
              Class Complete
            </p>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extralight text-white leading-tight">
              <span className="gradient-text">You Did It</span>
            </h1>
            <p className="text-xl md:text-2xl text-neutral-300 font-light max-w-2xl mx-auto leading-relaxed">
              You've completed the Intro Class for{' '}
              <span className="text-cyan-400 italic">{archetypeName}</span>
            </p>
          </div>

          {/* Gratitude message */}
          <div className="pt-8 space-y-6 max-w-2xl mx-auto">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/10 to-transparent blur-xl" />
              <p className="relative text-lg md:text-xl text-neutral-200 leading-relaxed font-light">
                Thank you for investing this time in yourself. The patterns you're learning to recognize are the first step toward real transformation.
              </p>
            </div>

            {/* Coming soon section */}
            <div className="pt-8 space-y-4 border-t border-neutral-800">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-400/10 border border-cyan-400/30 rounded-full">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-400"></span>
                </span>
                <span className="text-xs uppercase tracking-[0.2em] text-cyan-400 font-medium">Coming Soon</span>
              </div>
              
              <h2 className="text-3xl md:text-4xl font-extralight text-white">
                <span className="gradient-text">The Full Course</span>
              </h2>
              
              <p className="text-neutral-300 leading-relaxed font-light max-w-xl mx-auto">
                This intro class is just the beginning. The full course is launching soon with deeper teachings, advanced practices, and a complete transformation system designed specifically for your archetype.
              </p>

              <div className="pt-6 space-y-4">
                <p className="text-sm text-neutral-400 font-light uppercase tracking-[0.1em]">
                  What You'll Get:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl mx-auto">
                  <div className="flex items-start gap-3 px-5 py-4 bg-neutral-900/50 border border-neutral-800 rounded hover:border-cyan-400/30 transition-colors">
                    <svg className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    <div>
                      <p className="text-neutral-200 font-medium text-sm">Early Access</p>
                      <p className="text-neutral-500 text-xs mt-1">Be among the first</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 px-5 py-4 bg-neutral-900/50 border border-neutral-800 rounded hover:border-cyan-400/30 transition-colors">
                    <svg className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                      <p className="text-neutral-200 font-medium text-sm">Exclusive Content</p>
                      <p className="text-neutral-500 text-xs mt-1">Advanced teachings</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA section */}
            <div className="pt-8 space-y-4">
              <button
                onClick={onClose}
                className="
                  group relative px-10 py-5 bg-white text-black font-medium text-sm uppercase tracking-[0.1em]
                  transition-all duration-300 border border-white
                  hover:bg-neutral-100 hover:scale-[1.02] active:scale-[0.98]
                  hover:shadow-[0_0_50px_rgba(6,182,212,0.4)]
                  overflow-hidden
                "
              >
                <span className="relative z-10">Continue Your Journey</span>
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 via-blue-400/20 to-purple-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </button>
              
              <p className="text-xs text-neutral-500 font-light italic">
                Your results are saved. You can access them anytime.
              </p>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

