'use client';

import { ArchetypeAnalysis } from '@/types/intake';

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

// 6-Week Plan templates
const sixWeekPlans: Record<string, string[]> = {
  UNFOCUSED_VISIONARY: [
    'Week 1: Choose ONE primary goal and write it down daily',
    'Week 2: Create a single daily non-negotiable action for that goal',
    'Week 3: Build a tracking system and commit to daily completion',
    'Week 4: Eliminate or defer all non-essential projects',
    'Week 5: Deepen focus by saying "not now" to new ideas',
    'Week 6: Celebrate small wins and build momentum through consistency',
  ],
  SILENT_GRINDER: [
    'Week 1: Document your work and create visibility for your contributions',
    'Week 2: Share progress updates with key stakeholders',
    'Week 3: Practice articulating your value and achievements',
    'Week 4: Seek feedback and recognition for your consistent work',
    'Week 5: Build strategic relationships that amplify your impact',
    'Week 6: Position yourself for opportunities that match your reliability',
  ],
  OVERGIVER: [
    'Week 1: Identify where you give beyond your capacity',
    'Week 2: Set one clear boundary and communicate it',
    'Week 3: Practice saying "no" to non-essential requests',
    'Week 4: Prioritize your own goals alongside helping others',
    'Week 5: Create space for your personal projects',
    'Week 6: Balance giving with receiving and self-care',
  ],
  CAGED_POTENTIAL: [
    'Week 1: Name your biggest fear blocking your potential',
    'Week 2: Take one small action despite the fear',
    'Week 3: Challenge limiting beliefs with evidence',
    'Week 4: Increase your risk tolerance with calculated steps',
    'Week 5: Build confidence through incremental wins',
    'Week 6: Step into your power and share your gifts',
  ],
  lone_wolf_thinker: [
    'Week 1: Identify one area where collaboration could help',
    'Week 2: Reach out to one person for a small collaboration',
    'Week 3: Practice sharing ideas before they\'re fully formed',
    'Week 4: Build trust through small, regular exchanges',
    'Week 5: Leverage others\' strengths to amplify your work',
    'Week 6: Balance independence with strategic partnerships',
  ],
  impulsive_firestarter: [
    'Week 1: Commit to finishing one project before starting another',
    'Week 2: Create systems that sustain momentum',
    'Week 3: Build consistency through daily micro-actions',
    'Week 4: Manage energy cycles instead of burning out',
    'Week 5: Develop follow-through rituals',
    'Week 6: Transform quick starts into lasting completions',
  ],
  doubt_ridden_strategist: [
    'Week 1: Set a deadline for research and move to action',
    'Week 2: Take one imperfect action daily',
    'Week 3: Practice making decisions with 70% information',
    'Week 4: Embrace learning through doing',
    'Week 5: Reduce analysis time by 50%',
    'Week 6: Trust your preparation and take bold action',
  ],
};

export default function ResultPage({ analysis, onBack }: ResultPageProps) {
  const primaryName = archetypeNames[analysis.primaryArchetype] || analysis.primaryArchetype;
  const sixWeekPlan = sixWeekPlans[analysis.primaryArchetype] || sixWeekPlans['UNFOCUSED_VISIONARY'];

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

      {/* 6-Week Plan */}
      <div className="card p-8 md:p-10 space-y-6">
        <div>
          <h3 className="text-2xl font-light text-[#463b32] mb-2">Your 6-Week Transformation Plan</h3>
          <p className="text-[#826a54]/80 font-light">
            A step-by-step path to address your patterns and unlock your potential
          </p>
        </div>
        <div className="space-y-4">
          {sixWeekPlan.map((week, index) => (
            <div
              key={index}
              className="flex gap-4 p-5 rounded-xl border-2 border-[#e8dfd5] bg-white/50"
            >
              <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-[#826a54]/10 flex items-center justify-center">
                <span className="text-[#826a54] font-medium">{index + 1}</span>
              </div>
              <p className="text-[#463b32] font-light text-lg flex-1">{week}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Button */}
      <div className="text-center pt-8 border-t border-[#e8dfd5]">
        <button
          onClick={() => {
            // Navigate to ClearPath Mastery (placeholder)
            window.open('https://clearpth.io/mastery', '_blank');
          }}
          className="
            px-10 py-4 rounded-xl bg-[#826a54] text-white font-light text-lg
            hover:bg-[#9d8169] shadow-md hover:shadow-lg
            transition-all duration-200
          "
        >
          Access ClearPath Mastery
        </button>
        <p className="text-sm text-[#826a54]/70 font-light mt-4">
          Deep dive into your archetype with advanced teachings and practices
        </p>
      </div>
    </div>
  );
}

