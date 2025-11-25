'use client';

import { useState } from 'react';
import { ArchetypeIntroClass } from '@/types/introClass';
import IntroClassLesson from './IntroClassLesson';
import IntroClassCompletion from './IntroClassCompletion';

interface IntroClassViewProps {
  introClass: ArchetypeIntroClass;
  onComplete?: () => void;
  onBack?: () => void;
  onStartWisdom?: () => void;
}

export default function IntroClassView({ introClass, onComplete, onBack, onStartWisdom }: IntroClassViewProps) {
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
  const [showCompletion, setShowCompletion] = useState(false);
  const currentLesson = introClass.lessons[currentLessonIndex];
  const isFirstLesson = currentLessonIndex === 0;
  const isLastLesson = currentLessonIndex === introClass.lessons.length - 1;

  const handleNext = () => {
    if (isLastLesson) {
      setShowCompletion(true);
    } else {
      setCurrentLessonIndex(currentLessonIndex + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleCompletionClose = () => {
    setShowCompletion(false);
    onComplete?.();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Show completion screen
  if (showCompletion) {
    return <IntroClassCompletion archetypeName={introClass.name} onClose={handleCompletionClose} onStartWisdom={onStartWisdom} />;
  }

  const handleBack = () => {
    if (!isFirstLesson) {
      setCurrentLessonIndex(currentLessonIndex - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
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
            ← Back to Results
          </button>
        </div>
      )}
      {/* Header */}
      <div className="text-center space-y-6 pb-8 border-b border-neutral-800">
        <p className="text-xs uppercase tracking-[0.3em] text-neutral-500 font-medium">
          Intro Class
        </p>
        <h1 className="text-4xl md:text-5xl font-extralight text-neutral-100 tracking-tight">
          <span className="gradient-text">{introClass.name}</span>
        </h1>
        <p className="text-xl text-neutral-400 italic font-light max-w-2xl mx-auto">
          {introClass.tagline}
        </p>
        <div className="pt-4">
          <div className="flex items-center justify-center gap-2">
            {introClass.lessons.map((_, index) => (
              <div
                key={index}
                className={`h-1 transition-all duration-300 ${
                  index <= currentLessonIndex
                    ? 'bg-white w-8'
                    : 'bg-neutral-800 w-2'
                }`}
              />
            ))}
          </div>
          <p className="text-xs text-neutral-500 mt-3 font-light">
            {currentLessonIndex + 1} of {introClass.lessons.length} lessons
          </p>
        </div>
      </div>

      {/* Current Lesson */}
      <div className="min-h-[60vh]">
        <IntroClassLesson
          lesson={currentLesson}
          lessonNumber={currentLessonIndex + 1}
          totalLessons={introClass.lessons.length}
        />
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between pt-8 border-t border-neutral-800">
        <button
          onClick={handleBack}
          disabled={isFirstLesson}
          className={`
            px-8 py-4 border font-medium text-sm uppercase tracking-[0.1em]
            transition-all duration-300
            ${
              isFirstLesson
                ? 'border-neutral-800 text-neutral-700 cursor-not-allowed'
                : 'border-neutral-800 text-neutral-400 hover:border-neutral-700 hover:text-neutral-300 hover:bg-neutral-900/50 active:scale-[0.98]'
            }
          `}
        >
          Back
        </button>

        <button
          onClick={handleNext}
          className="
            px-8 py-4 bg-white text-black font-medium text-sm uppercase tracking-[0.1em]
            transition-all duration-300 border border-white
            hover:bg-neutral-100 hover:scale-[1.01] active:scale-[0.98]
            hover:shadow-[0_0_30px_rgba(6,182,212,0.3)]
          "
        >
          {isLastLesson ? 'Complete Class' : 'Next Lesson'}
        </button>
      </div>

      {/* Footer Note */}
      <div className="pt-8 text-center border-t border-neutral-800">
        <p className="text-neutral-500 text-sm font-light italic tracking-wide max-w-2xl mx-auto">
          This is a spiritual and psychological orientation. Take your time with each lesson.
        </p>
      </div>
    </div>
  );
}

