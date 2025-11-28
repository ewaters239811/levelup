'use client';

import { useState, useEffect } from 'react';

interface Question {
  id: string;
  text: string;
}

interface DeepModeQuestionsProps {
  questions: Question[];
  onComplete: (answers: Record<string, string>) => void;
  onBack?: () => void;
}

export default function DeepModeQuestions({ questions, onComplete, onBack }: DeepModeQuestionsProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [currentAnswer, setCurrentAnswer] = useState('');

  const currentQuestion = questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === questions.length - 1;
  const canProceed = currentAnswer.trim().length > 0;

  useEffect(() => {
    // Load existing answer if available
    setCurrentAnswer(answers[currentQuestion.id] || '');
  }, [currentQuestionIndex, currentQuestion.id, answers]);

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
    <div className="w-full max-w-3xl mx-auto space-y-8">
      {onBack && currentQuestionIndex === 0 && (
        <div className="mb-8">
          <button
            onClick={onBack}
            className="
              px-6 py-3 rounded-xl border-2 border-[#2a1f3a]/50 text-neutral-300
              font-light hover:border-[#d4af37]/50 hover:text-[#d4af37]
              transition-all duration-200
            "
          >
            ← Back
          </button>
        </div>
      )}

      {/* Progress */}
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-sm text-neutral-400 font-light">
            Question {currentQuestionIndex + 1} of {questions.length}
          </span>
          <span className="text-sm text-neutral-400 font-light">
            {Math.round(((currentQuestionIndex + 1) / questions.length) * 100)}%
          </span>
        </div>
        <div className="w-full h-1.5 bg-[#1a0f1a] rounded-full overflow-hidden border border-[#2a1f3a]/50">
          <div
            className="h-full bg-gradient-to-r from-[#d4af37] to-[#f4d03f] transition-all duration-300 rounded-full"
            style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Question Card */}
      <div className="card p-8 md:p-10 min-h-[400px] bg-gradient-to-br from-[#1a0f1a] via-[#1a0f2a] to-[#0a0a0a] border-2 border-[#2a1f3a]/50">
        <div className="space-y-8">
          <h2 className="text-3xl md:text-4xl font-light mb-12 text-white leading-relaxed">
            {currentQuestion.text}
          </h2>

          <div className="space-y-4">
            <textarea
              value={currentAnswer}
              onChange={(e) => setCurrentAnswer(e.target.value)}
              rows={10}
              placeholder="Share your thoughts in detail..."
              className="
                w-full p-6 rounded-xl border-2 border-[#2a1f3a]/50 bg-[#0a0a0a]/50
                text-white placeholder-neutral-500 font-light text-lg leading-relaxed
                focus:outline-none focus:border-[#d4af37]/50 focus:bg-[#0a0a0a]/70
                transition-all duration-300 resize-y
                backdrop-blur-sm
              "
            />
            <p className="text-right text-sm text-neutral-500">
              {currentAnswer.length} characters
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between pt-8 border-t border-[#2a1f3a]/50">
        <button
          onClick={handleBack}
          className="
            px-6 py-3 rounded-xl border-2 border-[#2a1f3a]/50 text-neutral-300
            font-light hover:border-[#d4af37]/50 hover:text-[#d4af37]
            transition-all duration-200
          "
        >
          Back
        </button>
        <button
          onClick={handleNext}
          disabled={!canProceed}
          className={`
            px-10 py-4 rounded-xl font-light text-lg transition-all duration-300
            ${canProceed
              ? 'bg-gradient-to-r from-[#d4af37] to-[#f4d03f] text-black hover:shadow-lg hover:shadow-[#d4af37]/50 hover:scale-105'
              : 'bg-[#2a1f3a] text-neutral-500 cursor-not-allowed'
            }
          `}
        >
          {isLastQuestion ? 'Get My Insights' : 'Next'}
        </button>
      </div>
    </div>
  );
}

