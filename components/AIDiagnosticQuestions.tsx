'use client';

import { useState } from 'react';

interface Question {
  id: string;
  text: string;
}

interface AIDiagnosticQuestionsProps {
  questions: Question[];
  onComplete: (answers: Record<string, string>) => void;
  onBack?: () => void;
}

export default function AIDiagnosticQuestions({ questions, onComplete, onBack }: AIDiagnosticQuestionsProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [currentAnswer, setCurrentAnswer] = useState('');

  const currentQuestion = questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === questions.length - 1;
  const canProceed = currentAnswer.trim().length > 0;

  const handleNext = () => {
    if (currentAnswer.trim()) {
      const newAnswers = {
        ...answers,
        [currentQuestion.id]: currentAnswer.trim()
      };
      setAnswers(newAnswers);

      if (isLastQuestion) {
        onComplete(newAnswers);
      } else {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setCurrentAnswer(newAnswers[questions[currentQuestionIndex + 1].id] || '');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      const prevQuestionId = questions[currentQuestionIndex - 1].id;
      setCurrentAnswer(answers[prevQuestionId] || '');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      onBack?.();
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto space-y-12">
      {onBack && currentQuestionIndex === 0 && (
        <div className="mb-8">
          <button
            onClick={onBack}
            className="
              px-8 py-3 border border-neutral-800 text-neutral-400 font-medium text-sm
              transition-all duration-300 uppercase tracking-[0.1em]
              hover:border-neutral-700 hover:text-neutral-300 hover:bg-neutral-900/50
              active:scale-[0.98]
            "
          >
            ← Back
          </button>
        </div>
      )}

      {/* Progress */}
      <div className="text-center space-y-2">
        <p className="text-xs uppercase tracking-[0.2em] text-neutral-500 font-medium">
          Question {currentQuestionIndex + 1} of {questions.length}
        </p>
        <div className="w-full h-1 bg-neutral-900 border border-neutral-800">
          <div
            className="h-full bg-white transition-all duration-300"
            style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Question */}
      <div className="space-y-8">
        <h2 className="text-3xl md:text-4xl font-extralight mb-12 text-center text-neutral-100 leading-relaxed tracking-tight">
          {currentQuestion.text}
        </h2>

        <div className="space-y-4">
          <textarea
            value={currentAnswer}
            onChange={(e) => setCurrentAnswer(e.target.value)}
            rows={8}
            placeholder="Type your answer here..."
            className="
              w-full p-6 bg-transparent border border-neutral-800 text-neutral-100 text-lg font-light
              focus:outline-none focus:border-white transition-colors resize-y min-h-[200px]
              placeholder:text-neutral-600 leading-relaxed
            "
          />
          <p className="text-right text-sm text-neutral-500">
            {currentAnswer.length} characters
          </p>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between pt-8 border-t border-neutral-800">
        <button
          onClick={handleBack}
          className="
            px-8 py-4 border border-neutral-800 text-neutral-400 font-medium text-sm
            transition-all duration-300 uppercase tracking-[0.1em]
            hover:border-neutral-700 hover:text-neutral-300 hover:bg-neutral-900/50
            active:scale-[0.98]
          "
        >
          Back
        </button>
        <button
          onClick={handleNext}
          disabled={!canProceed}
          className={`
            px-10 py-4 bg-white text-black font-medium text-sm
            transition-all duration-300 border border-white uppercase tracking-[0.1em]
            ${canProceed
              ? 'hover:bg-neutral-100 hover:scale-[1.01] active:scale-[0.98] hover:shadow-[0_0_30px_rgba(6,182,212,0.3)]'
              : 'opacity-30 cursor-not-allowed bg-neutral-800 border-neutral-800'
            }
          `}
        >
          {isLastQuestion ? 'Get My Insights' : 'Next'}
        </button>
      </div>
    </div>
  );
}

