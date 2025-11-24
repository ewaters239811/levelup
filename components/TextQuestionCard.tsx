'use client';

import { Question } from '@/types';

interface TextQuestionCardProps {
  question: Question;
  answer: string;
  onAnswerChange: (value: string) => void;
}

export default function TextQuestionCard({ question, answer, onAnswerChange }: TextQuestionCardProps) {
  return (
    <div className="w-full max-w-3xl mx-auto">
      <h2 className="text-3xl md:text-4xl font-extralight mb-12 text-center text-neutral-100 leading-relaxed tracking-tight">
        {question.text}
      </h2>
      <div className="space-y-4">
        <textarea
          value={answer}
          onChange={(e) => onAnswerChange(e.target.value)}
          placeholder="Share your thoughts here..."
          className="
            w-full min-h-[200px] p-6 bg-transparent border border-neutral-800
            text-neutral-100 placeholder-neutral-600 font-light text-lg leading-relaxed
            resize-y focus:outline-none focus:border-neutral-700 focus:bg-neutral-900/30
            transition-all duration-300
          "
          style={{ fontFamily: 'inherit' }}
        />
        <p className="text-xs text-neutral-500 text-center font-light italic">
          Take a moment to reflect. Your answer will be interpreted to provide personalized insights.
        </p>
      </div>
    </div>
  );
}

