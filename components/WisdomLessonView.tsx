'use client';

import { Lesson, LessonRecommendation } from '@/types/wisdom';
import { useState } from 'react';

interface WisdomLessonViewProps {
  recommendation: LessonRecommendation;
  onComplete?: (reflection: string) => void;
  onBack?: () => void;
}

export default function WisdomLessonView({ recommendation, onComplete, onBack }: WisdomLessonViewProps) {
  const [currentStep, setCurrentStep] = useState<'teaching' | 'exercise' | 'reflection'>('teaching');
  const [reflectionAnswers, setReflectionAnswers] = useState<Record<number, string>>({});
  const lesson = recommendation.chosen_lesson;

  const pillarNames: Record<string, string> = {
    bible: 'Esoteric Bible',
    jung: 'Jungian Psychology',
    alchemy: 'Hermetic Alchemy',
    rosicrucian: 'Rosicrucian Wisdom',
    masonry: 'Masonic Character'
  };

  const handleComplete = () => {
    const reflection = Object.values(reflectionAnswers).join('\n\n');
    onComplete?.(reflection);
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-16 relative z-10">
      {onBack && (
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

      {/* Header */}
      <div className="text-center space-y-6 pb-12 border-b border-neutral-800">
        <div className="flex items-center justify-center gap-3 mb-4">
          <span className="text-xs uppercase tracking-[0.3em] text-cyan-400 font-medium">
            {pillarNames[lesson.pillar]}
          </span>
          <span className="text-neutral-600">•</span>
          <span className="text-xs text-neutral-500 font-light">
            Difficulty: {lesson.difficulty}/5
          </span>
        </div>
        <h1 className="text-4xl md:text-5xl font-extralight text-neutral-100 tracking-tight leading-tight">
          <span className="gradient-text">{lesson.title}</span>
        </h1>
        <p className="text-lg md:text-xl text-neutral-400 italic font-light max-w-2xl mx-auto leading-relaxed pt-4">
          {lesson.summary}
        </p>
      </div>

      {/* Coaching Message */}
      <div className="p-8 border border-cyan-400/30 bg-cyan-400/5 rounded-lg">
        <p className="text-neutral-200 leading-relaxed font-light text-lg">
          {recommendation.coaching_message}
        </p>
      </div>

      {/* Navigation Tabs */}
      <div className="flex gap-2 border-b border-neutral-800">
        <button
          onClick={() => setCurrentStep('teaching')}
          className={`
            px-6 py-4 text-sm uppercase tracking-[0.1em] font-medium transition-all duration-200
            ${currentStep === 'teaching'
              ? 'border-b-2 border-white text-white'
              : 'text-neutral-500 hover:text-neutral-300'
            }
          `}
        >
          Teaching
        </button>
        <button
          onClick={() => setCurrentStep('exercise')}
          className={`
            px-6 py-4 text-sm uppercase tracking-[0.1em] font-medium transition-all duration-200
            ${currentStep === 'exercise'
              ? 'border-b-2 border-white text-white'
              : 'text-neutral-500 hover:text-neutral-300'
            }
          `}
        >
          Exercise ({lesson.exercise.duration_minutes} min)
        </button>
        <button
          onClick={() => setCurrentStep('reflection')}
          className={`
            px-6 py-4 text-sm uppercase tracking-[0.1em] font-medium transition-all duration-200
            ${currentStep === 'reflection'
              ? 'border-b-2 border-white text-white'
              : 'text-neutral-500 hover:text-neutral-300'
            }
          `}
        >
          Reflection
        </button>
      </div>

      {/* Content */}
      <div className="min-h-[500px] py-8">
        {currentStep === 'teaching' && (
          <div className="space-y-8 max-w-3xl mx-auto">
            <div className="prose prose-invert max-w-none">
              <div className="text-lg md:text-xl text-neutral-300 leading-relaxed font-light whitespace-pre-line">
                {lesson.teaching}
              </div>
            </div>
            <div className="pt-12 border-t border-neutral-800">
              <p className="text-neutral-400 italic font-light text-center text-lg">
                "{lesson.integration_affirmation}"
              </p>
            </div>
          </div>
        )}

        {currentStep === 'exercise' && (
          <div className="space-y-8 max-w-3xl mx-auto">
            <div className="p-8 border border-neutral-800 bg-neutral-900/30 rounded-lg">
              <h3 className="text-xl font-light text-cyan-400 mb-6 uppercase tracking-[0.1em]">
                Exercise Steps
              </h3>
              <ol className="space-y-6">
                {lesson.exercise.steps.map((step, index) => (
                  <li key={index} className="flex gap-6">
                    <span className="flex-shrink-0 w-10 h-10 border border-neutral-700 flex items-center justify-center text-sm text-neutral-400 font-medium">
                      {index + 1}
                    </span>
                    <span className="text-neutral-300 leading-relaxed font-light flex-1 text-lg">
                      {step}
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        )}

        {currentStep === 'reflection' && (
          <div className="space-y-8 max-w-3xl mx-auto">
            <h3 className="text-xl font-light text-cyan-400 mb-8 uppercase tracking-[0.1em]">
              Reflection Questions
            </h3>
            <div className="space-y-8">
              {lesson.reflection_questions.map((question, index) => (
                <div key={index} className="space-y-4">
                  <p className="text-neutral-300 font-light text-lg leading-relaxed">
                    {index + 1}. {question}
                  </p>
                  <textarea
                    value={reflectionAnswers[index] || ''}
                    onChange={(e) => setReflectionAnswers(prev => ({ ...prev, [index]: e.target.value }))}
                    placeholder="Type your reflection here..."
                    rows={6}
                    className="
                      w-full p-6 bg-transparent border border-neutral-800
                      text-neutral-100 placeholder-neutral-600 font-light leading-relaxed text-lg
                      resize-y focus:outline-none focus:border-cyan-400/50 focus:bg-neutral-900/30
                      transition-all duration-300
                    "
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between pt-12 border-t border-neutral-800">
        <div className="flex-1">
          {currentStep !== 'teaching' && (
            <button
              onClick={() => {
                if (currentStep === 'exercise') {
                  setCurrentStep('teaching');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                } else if (currentStep === 'reflection') {
                  setCurrentStep('exercise');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }
              }}
              className="
                px-8 py-4 border border-neutral-800 text-neutral-400 font-medium text-sm
                transition-all duration-300 uppercase tracking-[0.1em]
                hover:border-neutral-700 hover:text-neutral-300 hover:bg-neutral-900/50
                active:scale-[0.98]
              "
            >
              Back
            </button>
          )}
        </div>
        <button
          onClick={() => {
            if (currentStep === 'teaching') {
              setCurrentStep('exercise');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            } else if (currentStep === 'exercise') {
              setCurrentStep('reflection');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            } else if (currentStep === 'reflection') {
              handleComplete();
            }
          }}
          className="
            px-10 py-4 bg-white text-black font-medium text-sm uppercase tracking-[0.1em]
            transition-all duration-300 border border-white
            hover:bg-neutral-100 hover:scale-[1.01] active:scale-[0.98]
            hover:shadow-[0_0_30px_rgba(6,182,212,0.3)]
            disabled:opacity-50 disabled:cursor-not-allowed
          "
          disabled={currentStep === 'reflection' && Object.keys(reflectionAnswers).length === 0}
        >
          {currentStep === 'reflection' ? 'Complete Lesson' : 'Next'}
        </button>
      </div>
    </div>
  );
}

