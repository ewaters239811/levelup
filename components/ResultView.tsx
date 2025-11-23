'use client';

import { Archetype } from '@/types';

interface ResultViewProps {
  archetype: Archetype;
}

export default function ResultView({ archetype }: ResultViewProps) {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-16 relative z-10">
      <div className="text-center space-y-8">
        <p className="text-xs uppercase tracking-[0.3em] text-neutral-500 font-medium">
          Analysis Complete
        </p>
        <p className="text-sm uppercase tracking-[0.2em] text-neutral-500 font-light mb-4">
          Your Dominant Pattern
        </p>
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-extralight leading-[1.1] tracking-tight">
          <span className="gradient-text">{archetype.name}</span>
        </h1>
        <div className="max-w-2xl mx-auto pt-4">
          <p className="text-xl md:text-2xl text-neutral-400 italic font-light leading-relaxed">
            {archetype.tagline}
          </p>
        </div>
      </div>

      <div className="space-y-6 text-lg text-neutral-300 leading-relaxed max-w-3xl mx-auto">
        <p className="font-light">{archetype.description}</p>
      </div>

      <div className="space-y-8 pt-12 border-t border-neutral-800">
        <h2 className="text-2xl font-extralight text-neutral-100 uppercase tracking-[0.1em] mb-6">
          What's Holding You Back
        </h2>
        <ul className="space-y-4 max-w-3xl">
          {archetype.mainBlocks.map((block, index) => (
            <li key={index} className="flex items-start gap-6 border-b border-neutral-800 pb-4 last:border-0">
              <span className="text-neutral-600 text-sm font-medium mt-1 min-w-[24px]">
                {String(index + 1).padStart(2, '0')}
              </span>
              <span className="leading-relaxed text-neutral-300 flex-1 font-light">{block}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="space-y-8 pt-12 border-t border-neutral-800">
        <h2 className="text-2xl font-extralight text-neutral-100 uppercase tracking-[0.1em] mb-6">
          This Week's Moves
        </h2>
        <ul className="space-y-4 max-w-3xl">
          {archetype.weeklyMoves.map((move, index) => (
            <li key={index} className="flex items-start gap-6 border-b border-neutral-800 pb-4 last:border-0">
              <span className="text-white text-sm font-medium mt-1 min-w-[24px]">
                →
              </span>
              <span className="leading-relaxed text-neutral-300 flex-1 font-light">{move}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="space-y-8 pt-12 border-t border-neutral-800">
        <h2 className="text-2xl font-extralight text-neutral-100 uppercase tracking-[0.1em] mb-6">
          Scripture for Reflection
        </h2>
        <div className="space-y-5 max-w-3xl">
          {archetype.bibleVerses.map((verse, index) => (
            <div key={index} className="p-6 border border-neutral-800 bg-neutral-900/20 hover:border-neutral-700 transition-colors">
              <p className="text-neutral-300 leading-relaxed italic font-light">{verse}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="pt-12 text-center border-t border-neutral-800">
        <p className="text-neutral-500 text-sm font-light italic tracking-wide max-w-2xl mx-auto">
          You're not broken. You're just patterned. Patterns can be rewritten.
        </p>
      </div>
    </div>
  );
}

