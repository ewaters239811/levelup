'use client';

import { QuickModeQuestion, QuickModeResponse } from '@/types/intake';
import { useState } from 'react';

interface RankOrderQuestionProps {
  question: QuickModeQuestion;
  response: QuickModeResponse | null;
  onResponseChange: (response: QuickModeResponse) => void;
}

export default function RankOrderQuestion({ question, response, onResponseChange }: RankOrderQuestionProps) {
  // Use deterministic shuffle based on question ID so it's consistent but balanced
  const getShuffledDefault = () => {
    const ids = question.options?.map(opt => opt.id) || [];
    if (ids.length === 0) return [];
    
    // Use question ID as seed for consistent shuffling per question
    const seed = question.id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    
    // Deterministic shuffle using seed
    const shuffled = [...ids];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = (seed + i) % (i + 1);
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const [rankedOptions, setRankedOptions] = useState<string[]>(
    response?.rankedOptions || getShuffledDefault()
  );

  const handleDragStart = (e: React.DragEvent, index: number) => {
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', String(index));
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault();
    const dragIndex = parseInt(e.dataTransfer.getData('text/html'));
    
    if (dragIndex === dropIndex) return;
    
    const newRanked = [...rankedOptions];
    const [removed] = newRanked.splice(dragIndex, 1);
    newRanked.splice(dropIndex, 0, removed);
    
    setRankedOptions(newRanked);
    onResponseChange({
      questionId: question.id,
      type: 'rank_order',
      rankedOptions: newRanked,
    });
  };

  const handleMoveUp = (index: number) => {
    if (index === 0) return;
    const newRanked = [...rankedOptions];
    [newRanked[index - 1], newRanked[index]] = [newRanked[index], newRanked[index - 1]];
    setRankedOptions(newRanked);
    onResponseChange({
      questionId: question.id,
      type: 'rank_order',
      rankedOptions: newRanked,
    });
  };

  const handleMoveDown = (index: number) => {
    if (index === rankedOptions.length - 1) return;
    const newRanked = [...rankedOptions];
    [newRanked[index], newRanked[index + 1]] = [newRanked[index + 1], newRanked[index]];
    setRankedOptions(newRanked);
    onResponseChange({
      questionId: question.id,
      type: 'rank_order',
      rankedOptions: newRanked,
    });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl md:text-3xl font-light text-white leading-relaxed">
        {question.text}
      </h2>
      <div className="space-y-3">
        {rankedOptions.map((optionId, index) => {
          const option = question.options?.find(opt => opt.id === optionId);
          if (!option) return null;
          
          return (
            <div
              key={optionId}
              draggable
              onDragStart={(e) => handleDragStart(e, index)}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, index)}
              className="
                p-4 md:p-5 rounded-xl border-2 border-[#2a1f3a]/50 bg-[#1a0f1a]/50
                cursor-move hover:border-[#d4af37]/50 hover:bg-[#1a0f1a]/70 hover:shadow-lg hover:shadow-[#d4af37]/10
                transition-all duration-200
                flex items-center gap-3 md:gap-4
              "
            >
              <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-[#d4af37]/10 border border-[#d4af37]/30 flex items-center justify-center">
                <span className="text-[#d4af37] font-medium text-sm">{index + 1}</span>
              </div>
              <div className="flex-1 min-w-0">
                <span className="font-light text-base md:text-lg text-white">{option.label}</span>
              </div>
              
              {/* Mobile-friendly up/down buttons */}
              <div className="flex flex-col gap-1 flex-shrink-0 md:hidden">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleMoveUp(index);
                  }}
                  disabled={index === 0}
                  className="
                    w-8 h-8 rounded-lg border border-[#2a1f3a]/50 bg-[#0a0a0a]/50
                    flex items-center justify-center
                    disabled:opacity-30 disabled:cursor-not-allowed
                    hover:border-[#d4af37]/50 hover:bg-[#d4af37]/10
                    transition-all duration-200
                    active:scale-95
                  "
                >
                  <svg className="w-4 h-4 text-[#d4af37]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleMoveDown(index);
                  }}
                  disabled={index === rankedOptions.length - 1}
                  className="
                    w-8 h-8 rounded-lg border border-[#2a1f3a]/50 bg-[#0a0a0a]/50
                    flex items-center justify-center
                    disabled:opacity-30 disabled:cursor-not-allowed
                    hover:border-[#d4af37]/50 hover:bg-[#d4af37]/10
                    transition-all duration-200
                    active:scale-95
                  "
                >
                  <svg className="w-4 h-4 text-[#d4af37]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </div>

              {/* Desktop drag handle */}
              <svg className="w-5 h-5 text-neutral-400 flex-shrink-0 hidden md:block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16M4 16h16" />
              </svg>
            </div>
          );
        })}
      </div>
      <div className="space-y-2">
        <p className="text-sm text-neutral-400 font-light italic">
          <span className="hidden md:inline">Drag items to reorder.</span>
          <span className="md:hidden">Use ↑↓ buttons to reorder.</span> Most important at the top.
        </p>
      </div>
    </div>
  );
}

