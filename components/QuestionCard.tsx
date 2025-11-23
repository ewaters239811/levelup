'use client';

import { Question } from '@/types';

interface QuestionCardProps {
  question: Question;
  selectedAnswer: string | null;
  onAnswerSelect: (optionId: string) => void;
}

export default function QuestionCard({ question, selectedAnswer, onAnswerSelect }: QuestionCardProps) {
  return (
    <div className="w-full max-w-3xl mx-auto">
      <h2 className="text-3xl md:text-4xl font-extralight mb-12 text-center text-neutral-100 leading-relaxed tracking-tight">
        {question.text}
      </h2>
      <div className="space-y-3">
        {question.options.map((option) => {
          const isSelected = selectedAnswer === option.id;
          return (
            <button
              key={option.id}
              onClick={() => onAnswerSelect(option.id)}
              className={`
                w-full text-left p-6 border transition-all duration-300
                relative overflow-hidden group
                ${isSelected
                  ? 'border-white bg-white/5 text-white'
                  : 'border-neutral-800 bg-transparent text-neutral-400 hover:border-neutral-700 hover:text-neutral-300 hover:bg-neutral-900/30'
                }
              `}
            >
              <div className="flex items-start gap-5 relative z-10">
                <span className={`
                  flex-shrink-0 w-12 h-12 border flex items-center justify-center font-medium text-sm
                  transition-all duration-300
                  ${isSelected
                    ? 'border-white bg-white text-black'
                    : 'border-neutral-700 text-neutral-500 group-hover:border-neutral-600'
                  }
                `}>
                  {option.id}
                </span>
                <span className="flex-1 text-base md:text-lg leading-relaxed font-light pt-1">
                  {option.label}
                </span>
              </div>
              {isSelected && (
                <div className="absolute top-0 right-0 w-1 h-full bg-white"></div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

