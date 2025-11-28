'use client';

import { QuickModeQuestion, QuickModeResponse } from '@/types/intake';
import { useState } from 'react';

interface MultipleChoiceQuestionProps {
  question: QuickModeQuestion;
  response: QuickModeResponse | null;
  onResponseChange: (response: QuickModeResponse) => void;
}

export default function MultipleChoiceQuestion({ question, response, onResponseChange }: MultipleChoiceQuestionProps) {
  const [selectedOption, setSelectedOption] = useState<string | null>(
    response?.selectedOptions?.[0] || null
  );

  const handleSelectOption = (optionId: string) => {
    setSelectedOption(optionId);
    onResponseChange({
      questionId: question.id,
      type: 'multiple_choice',
      selectedOptions: [optionId],
    });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl md:text-3xl font-light text-[#463b32] leading-relaxed">
        {question.text}
      </h2>
      <div className="space-y-3">
        {question.options?.map((option) => {
          const isSelected = selectedOption === option.id;
          return (
            <button
              key={option.id}
              type="button"
              onClick={() => handleSelectOption(option.id)}
              className={`
                w-full text-left p-5 rounded-xl border-2 transition-all duration-200
                ${isSelected
                  ? 'border-[#826a54] bg-[#826a54]/10 shadow-sm'
                  : 'border-[#e8dfd5] bg-white hover:border-[#d4c4b5] hover:bg-[#faf8f6]'
                }
              `}
            >
              <div className="flex items-center gap-4">
                <div className={`
                  w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0
                  ${isSelected
                    ? 'border-[#826a54] bg-[#826a54]'
                    : 'border-[#d4c4b5] bg-white'
                  }
                `}>
                  {isSelected && (
                    <div className="w-3 h-3 rounded-full bg-white" />
                  )}
                </div>
                <span className={`
                  font-light text-lg
                  ${isSelected ? 'text-[#463b32]' : 'text-[#826a54]'}
                `}>
                  {option.label}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

