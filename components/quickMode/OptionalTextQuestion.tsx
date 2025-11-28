'use client';

import { QuickModeQuestion, QuickModeResponse } from '@/types/intake';
import { useState } from 'react';

interface OptionalTextQuestionProps {
  question: QuickModeQuestion;
  response: QuickModeResponse | null;
  onResponseChange: (response: QuickModeResponse) => void;
}

export default function OptionalTextQuestion({ question, response, onResponseChange }: OptionalTextQuestionProps) {
  const [text, setText] = useState(response?.textResponse || '');

  const handleChange = (value: string) => {
    setText(value);
    onResponseChange({
      questionId: question.id,
      type: 'optional_text',
      textResponse: value,
    });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl md:text-3xl font-light text-[#463b32] leading-relaxed">
        {question.text}
      </h2>
      <div className="space-y-2">
        <textarea
          value={text}
          onChange={(e) => handleChange(e.target.value)}
          placeholder={question.placeholder || 'Type your answer here...'}
          rows={6}
          className="
            w-full p-5 rounded-xl border-2 border-[#e8dfd5] bg-white
            text-[#463b32] font-light text-lg leading-relaxed
            placeholder:text-[#826a54]/50
            focus:outline-none focus:border-[#826a54] focus:shadow-sm
            transition-all duration-200 resize-y
          "
        />
        <p className="text-sm text-[#826a54]/70 font-light italic">
          Optional - feel free to skip if you prefer
        </p>
      </div>
    </div>
  );
}

