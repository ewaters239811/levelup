'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import ScoreSlider from '@/components/ScoreSlider';

const QUESTIONS = [
  {
    id: 'fearOfVisibility',
    label: 'Fear of Visibility',
    text: 'I avoid being fully seen, judged, or recognized for my capabilities.',
  },
  {
    id: 'avoidanceOfResponsibility',
    label: 'Avoidance of Responsibility',
    text: 'I avoid environments where my actions directly determine outcomes.',
  },
  {
    id: 'emotionalSafetyLooping',
    label: 'Emotional Safety Looping',
    text: 'I repeat familiar patterns because they feel safe, even when they block growth.',
  },
  {
    id: 'successIdentityRejection',
    label: 'Success Identity Rejection',
    text: 'Success feels incompatible with who I currently believe I am.',
  },
];

export default function AssessmentPage() {
  const router = useRouter();
  const [scores, setScores] = useState({
    fearOfVisibility: 0,
    avoidanceOfResponsibility: 0,
    emotionalSafetyLooping: 0,
    successIdentityRejection: 0,
  });

  const handleScoreChange = (questionId: string, value: number) => {
    setScores((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  };

  const handleCalculate = () => {
    const totalScore =
      scores.fearOfVisibility +
      scores.avoidanceOfResponsibility +
      scores.emotionalSafetyLooping +
      scores.successIdentityRejection;

    router.push(`/result?score=${totalScore}`);
  };

  const allAnswered = Object.values(scores).some((score) => score > 0);

  return (
    <div className="min-h-screen bg-black px-4 py-12">
      <div className="w-full max-w-2xl mx-auto space-y-12">
        <div className="text-center space-y-3">
          <h1 className="text-3xl md:text-4xl font-light text-white">
            Identity Collapse Index
          </h1>
          <p className="text-sm text-gray-500 font-light">
            Rate each: 0 (not at all) → 10 (completely)
          </p>
        </div>

        <div className="space-y-10">
          {QUESTIONS.map((question, index) => (
            <div key={question.id} className="space-y-2">
              <div className="flex items-start gap-3">
                <span className="text-gray-600 font-light text-sm mt-1 min-w-[2rem]">
                  {index + 1}
                </span>
                <div className="flex-1 space-y-4">
                  <div>
                    <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">
                      {question.label}
                    </h3>
                    <p className="text-base font-light text-gray-300 leading-relaxed">
                      {question.text}
                    </p>
                  </div>
                  <ScoreSlider
                    value={scores[question.id as keyof typeof scores]}
                    onChange={(value) => handleScoreChange(question.id, value)}
                    label=""
                    questionId={question.id}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="pt-8 border-t border-gray-900">
          <button
            onClick={handleCalculate}
            disabled={!allAnswered}
            className="
              w-full px-8 py-3 bg-white text-black
              font-medium text-sm tracking-wide uppercase
              hover:bg-gray-200 transition-colors duration-200
              disabled:bg-gray-900 disabled:text-gray-600 disabled:cursor-not-allowed
            "
          >
            Calculate Index
          </button>
        </div>
      </div>
    </div>
  );
}
