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
    <div className="w-full max-w-4xl mx-auto space-y-12 relative z-10">
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
      <div className="text-center space-y-6 pb-8 border-b border-neutral-800">
        <div className="flex items-center justify-center gap-3">
          <span className="text-xs uppercase tracking-[0.3em] text-cyan-400 font-medium">
            {pillarNames[lesson.pillar]}
          </span>
          <span className="text-neutral-600">•</span>
          <span className="text-xs text-neutral-500">
            Difficulty: {lesson.difficulty}/5
          </span>
        </div>
        <h1 className="text-4xl md:text-5xl font-extralight text-neutral-100 tracking-tight">
          <span className="gradient-text">{lesson.title}</span>
        </h1>
        <p className="text-lg text-neutral-400 italic font-light max-w-2xl mx-auto">
          {lesson.summary}
        </p>
      </div>

      {/* Coaching Message */}
      <div className="p-6 border border-cyan-400/30 bg-cyan-400/5 rounded">
        <p className="text-neutral-200 leading-relaxed font-light">
          {recommendation.coaching_message}
        </p>
      </div>

      {/* Reasoning */}
      <div className="text-sm text-neutral-500 font-light italic">
        <p>{recommendation.reasoning_summary}</p>
      </div>

      {/* Navigation Tabs */}
      <div className="flex gap-4 border-b border-neutral-800">
        <button
          onClick={() => setCurrentStep('teaching')}
          className={`
            px-6 py-3 text-sm uppercase tracking-[0.1em] font-medium transition-colors
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
            px-6 py-3 text-sm uppercase tracking-[0.1em] font-medium transition-colors
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
            px-6 py-3 text-sm uppercase tracking-[0.1em] font-medium transition-colors
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
      <div className="min-h-[400px]">
        {currentStep === 'teaching' && (
          <div className="space-y-6">
            <div className="prose prose-invert max-w-none">
              <p className="text-lg text-neutral-300 leading-relaxed font-light">
                {lesson.teaching}
              </p>
            </div>
            <div className="pt-8 border-t border-neutral-800">
              <p className="text-neutral-400 italic font-light text-center">
                "{lesson.integration_affirmation}"
              </p>
            </div>
          </div>
        )}

        {currentStep === 'exercise' && (
          <div className="space-y-6">
            <div className="p-6 border border-neutral-800 bg-neutral-900/30">
              <h3 className="text-lg font-light text-cyan-400 mb-4 uppercase tracking-[0.1em]">
                Exercise Steps
              </h3>
              <ol className="space-y-4">
                {lesson.exercise.steps.map((step, index) => (
                  <li key={index} className="flex gap-4">
                    <span className="flex-shrink-0 w-8 h-8 border border-neutral-700 flex items-center justify-center text-sm text-neutral-400">
                      {index + 1}
                    </span>
                    <span className="text-neutral-300 leading-relaxed font-light flex-1">
                      {step}
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        )}

        {currentStep === 'reflection' && (
          <div className="space-y-6">
            <h3 className="text-lg font-light text-cyan-400 mb-6 uppercase tracking-[0.1em]">
              Reflection Questions
            </h3>
            <div className="space-y-6">
              {lesson.reflection_questions.map((question, index) => (
                <div key={index} className="space-y-3">
                  <p className="text-neutral-300 font-light">
                    {question}
                  </p>
                  <textarea
                    value={reflectionAnswers[index] || ''}
                    onChange={(e) => setReflectionAnswers(prev => ({ ...prev, [index]: e.target.value }))}
                    placeholder="Your reflection..."
                    className="
                      w-full min-h-[100px] p-4 bg-transparent border border-neutral-800
                      text-neutral-100 placeholder-neutral-600 font-light leading-relaxed
                      resize-y focus:outline-none focus:border-neutral-700 focus:bg-neutral-900/30
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
      <div className="flex items-center justify-between pt-8 border-t border-neutral-800">
        {currentStep !== 'teaching' && (
          <button
            onClick={() => {
              if (currentStep === 'exercise') {
                setCurrentStep('teaching');
              } else if (currentStep === 'reflection') {
                setCurrentStep('exercise');
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
        <button
          onClick={() => {
            if (currentStep === 'teaching') {
              setCurrentStep('exercise');
            } else if (currentStep === 'exercise') {
              setCurrentStep('reflection');
            } else if (currentStep === 'reflection') {
              handleComplete();
            }
          }}
          className="
            px-8 py-4 bg-white text-black font-medium text-sm uppercase tracking-[0.1em]
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

