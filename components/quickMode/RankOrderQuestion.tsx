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
                p-5 rounded-xl border-2 border-[#2a1f3a]/50 bg-[#1a0f1a]/50
                cursor-move hover:border-[#d4af37]/50 hover:bg-[#1a0f1a]/70 hover:shadow-lg hover:shadow-[#d4af37]/10
                transition-all duration-200
                flex items-center gap-4
              "
            >
              <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-[#d4af37]/10 border border-[#d4af37]/30 flex items-center justify-center">
                <span className="text-[#d4af37] font-medium text-sm">{index + 1}</span>
              </div>
              <div className="flex-1">
                <span className="font-light text-lg text-white">{option.label}</span>
              </div>
              <svg className="w-5 h-5 text-neutral-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16M4 16h16" />
              </svg>
            </div>
          );
        })}
      </div>
      <p className="text-sm text-neutral-400 font-light italic">
        Drag items to reorder. Most important at the top.
      </p>
    </div>
  );
}

