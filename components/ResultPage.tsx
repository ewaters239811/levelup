'use client';

import { ArchetypeAnalysis } from '@/types/intake';
import { BREAKTHROUGH_MAP } from '@/data/breakthroughMap';

interface ResultPageProps {
  analysis: ArchetypeAnalysis;
  onBack?: () => void;
}

const archetypeNames: Record<string, string> = {
  UNFOCUSED_VISIONARY: 'The Unfocused Visionary',
  SILENT_GRINDER: 'The Silent Grinder',
  OVERGIVER: 'The Overgiver',
  CAGED_POTENTIAL: 'The Caged Potential',
  lone_wolf_thinker: 'The Lone Wolf Thinker',
  impulsive_firestarter: 'The Impulsive Firestarter',
  doubt_ridden_strategist: 'The Doubt-Ridden Strategist',
};

// Activation Messages - exported for reuse
export const activationMessages: Record<string, string> = {
  UNFOCUSED_VISIONARY: "Your visions are powerful, but your attention is scattered — and attention is the true currency of transformation. You don't need more ideas; you need to anchor your awareness into the present moment, because action is only born from presence, not fantasies of the future. Today begins your shift from drifting into the future to owning the moment in front of you. When your focus gathers, your destiny unlocks.",
  SILENT_GRINDER: "You've carried the weight quietly, working hard in the shadows, but life mirrors the way you see yourself — and it's time to see your own value clearly. Recognition doesn't come from doing more; it comes from being someone who believes their work deserves to be seen. When you shift your perception of yourself, the world shifts with you. Your grind is real — now claim the stage it was meant for.",
  OVERGIVER: "You've given so much of your energy away that you've forgotten your power lives in your inner world first. Life reflects your internal state, and the world cannot pour into someone who constantly empties themselves. Today is the day you reclaim your energy, your boundaries, and your worth. When you start receiving with the same openness you give, abundance finally has room to flow toward you.",
  CAGED_POTENTIAL: "Your potential is undeniable, but your perspective has kept you trapped — not your ability. A single shift in viewpoint can dissolve the confusion, stagnation, and hesitation that's been holding you back. You don't need motivation; you need a new angle, a new way of seeing yourself. Today marks the moment you break the mental cage and step into the version of you that has always been waiting to emerge.",
  lone_wolf_thinker: "Your mind is deep, sharp, and full of fire — but even the greatest insights need air to breathe. Isolation has kept your brilliance hidden, and your next evolution requires expression, connection, and shared presence. Your inner world is strong; now it's time to let it meet the outer world. When your thoughts stop living only inside you, your life will expand in ways you've never experienced.",
  impulsive_firestarter: "Your speed, passion, and instinct are gifts — but without grounding, your fire burns out before it becomes something real. Consistency, not intensity, is what transforms sparks into empires. Today you shift from uncontrolled motion to intentional momentum. When your fire meets focus, you become unstoppable.",
  doubt_ridden_strategist: "Your mind is brilliant, your plans are sharp, and your insight is real — but doubt has been stealing the life out of your execution. The world doesn't respond to perfect strategy; it responds to identity and frequency. Today is your moment to embody the version of you who already succeeds, to act from belief instead of hesitation. One imperfect move forward will break the paralysis and activate your true power.",
};

const defaultActivationMessage = "Your journey of transformation begins with awareness. Recognize your patterns, honor your strengths, and take the first step toward the version of you that's waiting to emerge.";

export default function ResultPage({ analysis, onBack }: ResultPageProps) {
  const primaryName = archetypeNames[analysis.primaryArchetype] || analysis.primaryArchetype;
  const breakthroughMap = BREAKTHROUGH_MAP[analysis.primaryArchetype as keyof typeof BREAKTHROUGH_MAP] || BREAKTHROUGH_MAP.UNFOCUSED_VISIONARY;

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      {onBack && (
        <div className="mb-8">
          <button
            onClick={onBack}
            className="
              px-6 py-3 rounded-xl border-2 border-[#e8dfd5] text-[#826a54]
              font-light hover:border-[#d4c4b5] hover:bg-[#faf8f6]
              transition-all duration-200
            "
          >
            ← Back
          </button>
        </div>
      )}

      {/* Header */}
      <div className="text-center space-y-6 pb-8 border-b border-[#e8dfd5]">
        <h1 className="text-4xl md:text-5xl font-light text-[#463b32]">
          Your Archetype Profile
        </h1>
        <p className="text-lg text-[#826a54]/80 font-light">
          Comprehensive insights into your patterns and path forward
        </p>
      </div>

      {/* Primary Archetype Card */}
      <div className="card p-8 md:p-10 space-y-4 bg-gradient-to-br from-[#826a54]/5 to-white">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-[#826a54] flex items-center justify-center">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <h2 className="text-2xl md:text-3xl font-light text-[#463b32]">Primary Archetype</h2>
            <p className="text-xl text-[#826a54] font-light">{primaryName}</p>
          </div>
        </div>
      </div>

      {/* Activation Message */}
      <div className="card p-8 md:p-10 space-y-4 bg-gradient-to-br from-[#826a54]/10 to-white animate-fade-in">
        <p className="text-lg md:text-xl text-[#463b32] font-medium leading-relaxed">
          {activationMessages[analysis.primaryArchetype] || defaultActivationMessage}
        </p>
      </div>

      {/* Key Insights Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Sub-Archetype */}
        <div className="card p-6 space-y-3">
          <h3 className="text-sm uppercase tracking-[0.1em] text-[#826a54] font-medium">Sub-Archetype</h3>
          <p className="text-lg text-[#463b32] font-light">{analysis.subArchetype}</p>
        </div>

        {/* Shadow */}
        <div className="card p-6 space-y-3">
          <h3 className="text-sm uppercase tracking-[0.1em] text-[#826a54] font-medium">Shadow Pattern</h3>
          <p className="text-lg text-[#463b32] font-light">{analysis.shadow}</p>
        </div>

        {/* Strength */}
        <div className="card p-6 space-y-3">
          <h3 className="text-sm uppercase tracking-[0.1em] text-[#826a54] font-medium">Core Strength</h3>
          <p className="text-lg text-[#463b32] font-light">{analysis.strength}</p>
        </div>

        {/* Root Blockage */}
        <div className="card p-6 space-y-3">
          <h3 className="text-sm uppercase tracking-[0.1em] text-[#826a54] font-medium">Root Blockage</h3>
          <p className="text-lg text-[#463b32] font-light">{analysis.rootBlockage}</p>
        </div>
      </div>

      {/* Spiritual/Mystical Insights */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="card p-6 space-y-3">
          <h3 className="text-sm uppercase tracking-[0.1em] text-[#826a54] font-medium">Alchemical Stage</h3>
          <p className="text-lg text-[#463b32] font-light">{analysis.alchemicalStage}</p>
        </div>
        <div className="card p-6 space-y-3">
          <h3 className="text-sm uppercase tracking-[0.1em] text-[#826a54] font-medium">Biblical Equivalent</h3>
          <p className="text-lg text-[#463b32] font-light">{analysis.biblicalEquivalent}</p>
        </div>
      </div>

      {/* State of Consciousness */}
      <div className="card p-8 space-y-4">
        <h3 className="text-xl font-light text-[#463b32]">State of Consciousness</h3>
        <p className="text-lg text-[#826a54]/80 font-light leading-relaxed">
          Your current state reflects the patterns and beliefs that shape your experience. 
          Recognizing this state is the first step toward transformation.
        </p>
      </div>

      {/* Your Archetypal Breakthrough Map */}
      <div className="card p-8 md:p-10 space-y-6">
        <div>
          <h2 className="text-2xl md:text-3xl font-light text-[#463b32] mb-2">
            Your Archetypal Breakthrough Map
          </h2>
          <p className="text-[#826a54]/80 font-light">
            This is your personalized path to break the pattern and step into your next level.
          </p>
        </div>

        <div className="space-y-5 text-[#463b32]">
          <div>
            <p className="font-medium text-lg mb-1">Pattern:</p>
            <p className="text-[#826a54]/90 font-light leading-relaxed">
              {breakthroughMap.patternSummary}
            </p>
          </div>

          <div>
            <p className="font-medium text-lg mb-1">Root Driver:</p>
            <p className="text-[#826a54]/90 font-light leading-relaxed">
              {breakthroughMap.rootDriver}
            </p>
          </div>

          <div>
            <p className="font-medium text-lg mb-1">Identity Shift:</p>
            <p className="text-[#826a54]/90 font-light leading-relaxed italic">
              {breakthroughMap.identityShift}
            </p>
          </div>

          <div>
            <p className="font-medium text-lg mb-3">Key Practices:</p>
            <ul className="space-y-2 pl-5">
              {breakthroughMap.keyPractices.map((practice, index) => (
                <li key={index} className="text-[#826a54]/90 font-light leading-relaxed list-disc">
                  {practice}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-medium text-lg mb-1">When This Integrates:</p>
            <p className="text-[#826a54]/90 font-light leading-relaxed">
              {breakthroughMap.futureVision}
            </p>
          </div>

          {breakthroughMap.scriptureAnchor && (
            <div className="pt-4 border-t border-[#e8dfd5]">
              <p className="text-sm text-[#826a54]/70 font-light italic leading-relaxed">
                {breakthroughMap.scriptureAnchor}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* CTA - Work with Elijah 1:1 */}
      <div className="card p-8 md:p-10 space-y-4 bg-gradient-to-br from-[#463b32] to-[#57473b] text-white">
        <h3 className="text-xl md:text-2xl font-light">
          Want a faster breakthrough?
        </h3>
        <p className="text-white/90 font-light leading-relaxed">
          If you want personal guidance applying this map to your real life,
          you can work with me 1:1. I'll decode your pattern, refine your plan,
          and hold you accountable to the identity you're stepping into.
        </p>
        <button
          onClick={() => {
            // Navigate to 1:1 application (placeholder)
            window.open('https://clearpth.io/apply', '_blank');
          }}
          className="
            inline-flex items-center justify-center
            px-6 py-3 rounded-xl bg-white text-[#463b32] 
            font-light text-lg hover:bg-[#faf8f6] 
            shadow-md hover:shadow-lg
            transition-all duration-200
          "
        >
          Work with Elijah 1:1
        </button>
      </div>
    </div>
  );
}

