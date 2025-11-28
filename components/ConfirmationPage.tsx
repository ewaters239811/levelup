'use client';

import { useState } from 'react';
import { ArchetypeAnalysis } from '@/types/intake';

interface ConfirmationPageProps {
  analysis: ArchetypeAnalysis;
  onConfirm: (selectedTraits: string[]) => void;
  onBack: () => void;
}

const availableTraits = [
  { id: 'trait1', label: 'Perfectionist tendencies', archetype: 'doubt_ridden_strategist' },
  { id: 'trait2', label: 'Struggles with follow-through', archetype: 'UNFOCUSED_VISIONARY' },
  { id: 'trait3', label: 'Preference for working alone', archetype: 'lone_wolf_thinker' },
  { id: 'trait4', label: 'High energy bursts', archetype: 'impulsive_firestarter' },
  { id: 'trait5', label: 'Over-giving to others', archetype: 'OVERGIVER' },
  { id: 'trait6', label: 'Quiet consistency', archetype: 'SILENT_GRINDER' },
  { id: 'trait7', label: 'Self-doubt patterns', archetype: 'CAGED_POTENTIAL' },
  { id: 'trait8', label: 'Visionary thinking', archetype: 'UNFOCUSED_VISIONARY' },
  { id: 'trait9', label: 'Strategic overthinking', archetype: 'doubt_ridden_strategist' },
  { id: 'trait10', label: 'Difficulty setting boundaries', archetype: 'OVERGIVER' },
];

export default function ConfirmationPage({ analysis, onConfirm, onBack }: ConfirmationPageProps) {
  const [selectedTraits, setSelectedTraits] = useState<string[]>([]);

  const handleToggleTrait = (traitId: string) => {
    setSelectedTraits(prev =>
      prev.includes(traitId)
        ? prev.filter(id => id !== traitId)
        : [...prev, traitId]
    );
  };

  return (
    <div className="w-full max-w-3xl mx-auto space-y-8">
      <div className="text-center space-y-4 pb-8 border-b border-[#e8dfd5]">
        <h1 className="text-4xl md:text-5xl font-light text-[#463b32]">
          Refine Your Profile
        </h1>
        <p className="text-lg text-[#826a54]/80 font-light max-w-2xl mx-auto">
          Select any additional traits that may apply to you. This helps us refine your archetype analysis.
        </p>
      </div>

      <div className="card p-8 md:p-10 space-y-6">
        <div>
          <h2 className="text-xl font-light text-[#463b32] mb-2">Your Primary Archetype:</h2>
          <p className="text-lg text-[#826a54] font-light">{analysis.primaryArchetype.replace(/_/g, ' ')}</p>
        </div>

        <div className="pt-6 border-t border-[#e8dfd5]">
          <h3 className="text-lg font-light text-[#463b32] mb-4">
            Select additional traits that apply:
          </h3>
          <div className="space-y-3">
            {availableTraits.map((trait) => {
              const isSelected = selectedTraits.includes(trait.id);
              return (
                <button
                  key={trait.id}
                  type="button"
                  onClick={() => handleToggleTrait(trait.id)}
                  className={`
                    w-full text-left p-4 rounded-xl border-2 transition-all duration-200
                    ${isSelected
                      ? 'border-[#826a54] bg-[#826a54]/10 shadow-sm'
                      : 'border-[#e8dfd5] bg-white hover:border-[#d4c4b5] hover:bg-[#faf8f6]'
                    }
                  `}
                >
                  <div className="flex items-center gap-4">
                    <div className={`
                      w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0
                      ${isSelected
                        ? 'border-[#826a54] bg-[#826a54]'
                        : 'border-[#d4c4b5] bg-white'
                      }
                    `}>
                      {isSelected && (
                        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>
                    <span className={`
                      font-light text-base
                      ${isSelected ? 'text-[#463b32]' : 'text-[#826a54]'}
                    `}>
                      {trait.label}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between pt-6">
        <button
          onClick={onBack}
          className="
            px-6 py-3 rounded-xl border-2 border-[#e8dfd5] text-[#826a54]
            font-light hover:border-[#d4c4b5] hover:bg-[#faf8f6]
            transition-all duration-200
          "
        >
          Back
        </button>
        <button
          onClick={() => onConfirm(selectedTraits)}
          className="
            px-8 py-3 rounded-xl bg-[#826a54] text-white font-light
            hover:bg-[#9d8169] shadow-sm transition-all duration-200
          "
        >
          Continue to Results
        </button>
      </div>
    </div>
  );
}

