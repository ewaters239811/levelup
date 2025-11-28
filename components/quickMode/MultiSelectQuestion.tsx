'use client';

import { QuickModeQuestion, QuickModeResponse } from '@/types/intake';
import { useState } from 'react';

interface MultiSelectQuestionProps {
  question: QuickModeQuestion;
  response: QuickModeResponse | null;
  onResponseChange: (response: QuickModeResponse) => void;
}

export default function MultiSelectQuestion({ question, response, onResponseChange }: MultiSelectQuestionProps) {
  const [selectedOptions, setSelectedOptions] = useState<string[]>(
    response?.selectedOptions || []
  );

  const handleToggleOption = (optionId: string) => {
    const newSelected = selectedOptions.includes(optionId)
      ? selectedOptions.filter(id => id !== optionId)
      : [...selectedOptions, optionId];
    
    setSelectedOptions(newSelected);
    onResponseChange({
      questionId: question.id,
      type: 'multi_select',
      selectedOptions: newSelected,
    });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl md:text-3xl font-light text-[#463b32] leading-relaxed">
        {question.text}
      </h2>
      <div className="space-y-3">
        {question.options?.map((option) => {
          const isSelected = selectedOptions.includes(option.id);
          return (
            <button
              key={option.id}
              type="button"
              onClick={() => handleToggleOption(option.id)}
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
                  w-6 h-6 rounded-lg border-2 flex items-center justify-center flex-shrink-0
                  ${isSelected
                    ? 'border-[#826a54] bg-[#826a54]'
                    : 'border-[#d4c4b5] bg-white'
                  }
                `}>
                  {isSelected && (
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
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
      {selectedOptions.length > 0 && (
        <p className="text-sm text-[#826a54]/70 font-light">
          {selectedOptions.length} selected
        </p>
      )}
    </div>
  );
}

