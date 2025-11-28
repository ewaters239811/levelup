'use client';

import { useState } from 'react';
import { QuickModeQuestion, QuickModeResponse } from '@/types/intake';
import MultiSelectQuestion from './MultiSelectQuestion';
import RankOrderQuestion from './RankOrderQuestion';
import MultipleChoiceQuestion from './MultipleChoiceQuestion';
import OptionalTextQuestion from './OptionalTextQuestion';

interface QuickModeFlowProps {
  questions: QuickModeQuestion[];
  onComplete: (responses: QuickModeResponse[]) => void;
  onBack: () => void;
}

export default function QuickModeFlow({ questions, onComplete, onBack }: QuickModeFlowProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [responses, setResponses] = useState<Record<string, QuickModeResponse>>({});

  const currentQuestion = questions[currentQuestionIndex];
  const currentResponse = responses[currentQuestion.id] || null;
  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  const handleResponseChange = (response: QuickModeResponse) => {
    setResponses(prev => ({
      ...prev,
      [response.questionId]: response,
    }));
  };

  const canProceed = () => {
    if (!currentQuestion.required) return true;
    
    const response = responses[currentQuestion.id];
    if (!response) return false;

    switch (currentQuestion.type) {
      case 'multi_select':
        return response.selectedOptions && response.selectedOptions.length > 0;
      case 'rank_order':
        return response.rankedOptions && response.rankedOptions.length > 0;
      case 'multiple_choice':
        return response.selectedOptions && response.selectedOptions.length > 0;
      case 'optional_text':
        return true; // Always optional
      default:
        return true;
    }
  };

  const handleNext = () => {
    if (isLastQuestion) {
      // Collect all responses in order
      const allResponses = questions.map(q => responses[q.id]).filter(Boolean) as QuickModeResponse[];
      onComplete(allResponses);
    } else {
      setCurrentQuestionIndex(prev => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      onBack();
    }
  };

  const renderQuestion = () => {
    switch (currentQuestion.type) {
      case 'multi_select':
        return (
          <MultiSelectQuestion
            question={currentQuestion}
            response={currentResponse}
            onResponseChange={handleResponseChange}
          />
        );
      case 'rank_order':
        return (
          <RankOrderQuestion
            question={currentQuestion}
            response={currentResponse}
            onResponseChange={handleResponseChange}
          />
        );
      case 'multiple_choice':
        return (
          <MultipleChoiceQuestion
            question={currentQuestion}
            response={currentResponse}
            onResponseChange={handleResponseChange}
          />
        );
      case 'optional_text':
        return (
          <OptionalTextQuestion
            question={currentQuestion}
            response={currentResponse}
            onResponseChange={handleResponseChange}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto space-y-8">
      {/* Progress Bar */}
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-sm text-[#826a54]/70 font-light">
            Question {currentQuestionIndex + 1} of {questions.length}
          </span>
          <span className="text-sm text-[#826a54]/70 font-light">
            {Math.round(((currentQuestionIndex + 1) / questions.length) * 100)}%
          </span>
        </div>
        <div className="w-full h-2 bg-[#e8dfd5] rounded-full overflow-hidden">
          <div
            className="h-full bg-[#826a54] transition-all duration-300 rounded-full"
            style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Question Content */}
      <div className="card p-8 md:p-10 min-h-[400px]">
        {renderQuestion()}
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between pt-6">
        <button
          onClick={handleBack}
          className="
            px-6 py-3 rounded-xl border-2 border-[#e8dfd5] text-[#826a54]
            font-light hover:border-[#d4c4b5] hover:bg-[#faf8f6]
            transition-all duration-200
          "
        >
          Back
        </button>
        <button
          onClick={handleNext}
          disabled={!canProceed()}
          className={`
            px-8 py-3 rounded-xl font-light transition-all duration-200
            ${canProceed()
              ? 'bg-[#826a54] text-white hover:bg-[#9d8169] shadow-sm'
              : 'bg-[#e8dfd5] text-[#826a54]/50 cursor-not-allowed'
            }
          `}
        >
          {isLastQuestion ? 'Complete Assessment' : 'Next'}
        </button>
      </div>
    </div>
  );
}

