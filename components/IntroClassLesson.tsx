'use client';

import { IntroLesson } from '@/types/introClass';
import { useState } from 'react';

interface IntroClassLessonProps {
  lesson: IntroLesson;
  lessonNumber: number;
  totalLessons: number;
}

export default function IntroClassLesson({ lesson, lessonNumber, totalLessons }: IntroClassLessonProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="w-full space-y-6">
      {/* Lesson Header */}
      <div className="space-y-3">
        <div className="flex items-center gap-4">
          <span className="text-xs uppercase tracking-[0.2em] text-neutral-500 font-medium">
            Lesson {lessonNumber} of {totalLessons}
          </span>
          {lesson.completionMarker && (
            <span className="text-xs text-cyan-400/60 font-light italic">
              {lesson.completionMarker}
            </span>
          )}
        </div>
        <h3 className="text-3xl md:text-4xl font-extralight text-neutral-100 tracking-tight">
          {lesson.title}
        </h3>
        {lesson.subtitle && (
          <p className="text-lg text-neutral-400 italic font-light">
            {lesson.subtitle}
          </p>
        )}
      </div>

      {/* Main Content */}
      <div className="prose prose-invert max-w-none">
        <div className="text-neutral-300 leading-relaxed font-light space-y-4 whitespace-pre-line">
          {lesson.content.split('\n\n').map((paragraph, index) => (
            <p key={index} className="text-lg">
              {paragraph}
            </p>
          ))}
        </div>
      </div>

      {/* Reflection Questions */}
      {lesson.reflectionQuestions && lesson.reflectionQuestions.length > 0 && (
        <div className="pt-6 border-t border-neutral-800">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-full flex items-center justify-between text-left"
          >
            <h4 className="text-xl font-extralight text-neutral-100 uppercase tracking-[0.1em]">
              Reflection Questions
            </h4>
            <span className="text-neutral-500 text-sm">
              {isExpanded ? '−' : '+'}
            </span>
          </button>
          {isExpanded && (
            <div className="mt-6 space-y-4">
              {lesson.reflectionQuestions.map((question, index) => (
                <div
                  key={index}
                  className="p-5 border border-neutral-800 bg-neutral-900/20 hover:border-neutral-700 transition-colors"
                >
                  <p className="text-neutral-300 font-light leading-relaxed">
                    {question}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Daily Practices */}
      {lesson.dailyPractices && lesson.dailyPractices.length > 0 && (
        <div className="pt-6 border-t border-neutral-800">
          <h4 className="text-xl font-extralight text-neutral-100 uppercase tracking-[0.1em] mb-4">
            Daily Practices
          </h4>
          <ul className="space-y-3">
            {lesson.dailyPractices.map((practice, index) => (
              <li key={index} className="flex items-start gap-4">
                <span className="text-cyan-400 text-sm font-medium mt-1 min-w-[20px]">
                  →
                </span>
                <span className="text-neutral-300 leading-relaxed font-light flex-1">
                  {practice}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

