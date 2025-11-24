'use client';

import { useState, useEffect, useRef } from 'react';
import { quizData } from '@/data/quizData';
import { archetypes } from '@/data/archetypes';
import { ArchetypeKey, AIInterpretation } from '@/types';
import QuestionCard from '@/components/QuestionCard';
import TextQuestionCard from '@/components/TextQuestionCard';
import ProgressBar from '@/components/ProgressBar';
import ResultView from '@/components/ResultView';
import EmailCapture from '@/components/EmailCapture';
import IntroClassView from '@/components/IntroClassView';
import { saveResult } from '@/lib/analytics';
import { archetypeIntroClasses } from '@/data/archetypeIntroClasses';

type AppState = 'landing' | 'quiz' | 'email' | 'result' | 'introClass';

export default function Home() {
  const [state, setState] = useState<AppState>('landing');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [result, setResult] = useState<ArchetypeKey | null>(null);
  const [userEmail, setUserEmail] = useState<string>('');
  const [aiInterpretation, setAiInterpretation] = useState<AIInterpretation | null>(null);
  const [isInterpreting, setIsInterpreting] = useState(false);
  const quizRef = useRef<HTMLDivElement>(null);

  const handleStartQuiz = () => {
    setState('quiz');
    setTimeout(() => {
      quizRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  const handleAnswerSelect = (optionId: string) => {
    setAnswers((prev) => ({
      ...prev,
      [quizData[currentQuestionIndex].id]: optionId,
    }));
  };

  const handleTextAnswerChange = (value: string) => {
    setAnswers((prev) => ({
      ...prev,
      [quizData[currentQuestionIndex].id]: value,
    }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < quizData.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      calculateResult();
    }
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const calculateResult = async () => {
    // Calculate archetype from multiple choice questions
    const archetypeCounts: Record<ArchetypeKey, number> = {
      UNFOCUSED_VISIONARY: 0,
      SILENT_GRINDER: 0,
      OVERGIVER: 0,
      CAGED_POTENTIAL: 0,
      lone_wolf_thinker: 0,
      impulsive_firestarter: 0,
      doubt_ridden_strategist: 0,
    };

    // Only count multiple choice questions (exclude open-ended question 11)
    quizData.forEach((question) => {
      if (!question.isOpenEnded) {
        const selectedOptionId = answers[question.id];
        if (selectedOptionId) {
          const selectedOption = question.options.find((opt) => opt.id === selectedOptionId);
          if (selectedOption) {
            archetypeCounts[selectedOption.archetype]++;
          }
        }
      }
    });

    let maxCount = 0;
    let dominantArchetype: ArchetypeKey = 'UNFOCUSED_VISIONARY';

    (Object.keys(archetypeCounts) as ArchetypeKey[]).forEach((key) => {
      if (archetypeCounts[key] > maxCount) {
        maxCount = archetypeCounts[key];
        dominantArchetype = key;
      }
    });

    setResult(dominantArchetype);

    // Get AI interpretation for the open-ended question (question 11)
    const openEndedAnswer = answers[11];
    if (openEndedAnswer && openEndedAnswer.trim().length > 0) {
      setIsInterpreting(true);
      try {
        const response = await fetch('/api/interpret-answer', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ answer: openEndedAnswer }),
        });

        if (response.ok) {
          const interpretation = await response.json();
          setAiInterpretation(interpretation);
        } else {
          console.error('Failed to get AI interpretation');
        }
      } catch (error) {
        console.error('Error getting AI interpretation:', error);
      } finally {
        setIsInterpreting(false);
      }
    }
    
    // Move to email capture before showing results
    setState('email');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleEmailBack = () => {
    // Go back to last quiz question (question 11)
    setState('quiz');
    setCurrentQuestionIndex(quizData.length - 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleEmailSubmit = (email: string) => {
    setUserEmail(email);
    // Save result with email for analytics
    if (result) {
      saveResult(result, answers, email);
    }
    setState('result');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleEmailSkip = () => {
    // Save result without email
    if (result) {
      saveResult(result, answers);
    }
    setState('result');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleResultBack = () => {
    setState('email');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStartIntroClass = () => {
    setState('introClass');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleIntroClassComplete = () => {
    // Could navigate back to result or to a completion page
    // For now, just scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentQuestion = quizData[currentQuestionIndex];
  const selectedAnswer = answers[currentQuestion?.id] || null;
  const isOpenEnded = currentQuestion?.isOpenEnded || false;
  const canProceed = isOpenEnded 
    ? selectedAnswer !== null && selectedAnswer.trim().length > 0
    : selectedAnswer !== null;
  const isLastQuestion = currentQuestionIndex === quizData.length - 1;


  return (
    <main className="min-h-screen bg-[#0a0a0a] text-neutral-100 relative overflow-hidden">
      {/* Subtle grid overlay */}
      <div className="fixed inset-0 opacity-[0.02] pointer-events-none" style={{
        backgroundImage: `
          linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)
        `,
        backgroundSize: '60px 60px'
      }}></div>

      {/* Landing Section */}
      {state === 'landing' && (
        <section className="min-h-screen flex items-center justify-center px-4 py-20 relative z-10">
          <div className="w-full max-w-4xl mx-auto text-center space-y-10">
            <div className="space-y-3">
              <p className="text-xs uppercase tracking-[0.3em] text-neutral-500 font-medium letter-spacing-wide">
                ELIJAH PRESENTS
              </p>
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extralight leading-[1.1] tracking-tight">
              <span className="gradient-text">What's Really</span>
              <br />
              <span className="text-white">Blocking Your</span>
              <br />
              <span className="gradient-text">Next Level?</span>
            </h1>
            <p className="text-lg md:text-xl text-neutral-400 max-w-2xl mx-auto leading-relaxed font-light">
              Answer 11 questions and discover the dominant pattern that's slowing your money, confidence, and momentum.
            </p>
            <div className="space-y-5 pt-6">
              <button
                onClick={handleStartQuiz}
                className="
                  group px-12 py-5 bg-white text-black font-medium text-base 
                  rounded-none border border-neutral-800
                  transition-all duration-300 hover:bg-neutral-100 
                  hover:scale-[1.01] active:scale-[0.99] 
                  hover:shadow-[0_0_30px_rgba(6,182,212,0.3)]
                  relative overflow-hidden uppercase tracking-[0.1em]
                  hover:border-cyan-400
                "
              >
                <span className="relative z-10">Start Diagnostic</span>
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/10 via-blue-400/10 to-purple-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
              <p className="text-xs text-neutral-600 tracking-wide font-light">
                Takes about 2 minutes
              </p>
            </div>
          </div>
        </section>
      )}

      {/* Quiz Section */}
      {state === 'quiz' && (
        <section ref={quizRef} className="min-h-screen px-4 py-20 relative z-10">
          <div className="w-full max-w-4xl mx-auto">
            <ProgressBar current={currentQuestionIndex + 1} total={quizData.length} />
            <div className="mb-16">
              {isOpenEnded ? (
                <TextQuestionCard
                  question={currentQuestion}
                  answer={selectedAnswer || ''}
                  onAnswerChange={handleTextAnswerChange}
                />
              ) : (
                <QuestionCard
                  question={currentQuestion}
                  selectedAnswer={selectedAnswer}
                  onAnswerSelect={handleAnswerSelect}
                />
              )}
            </div>
            <div className="flex justify-between gap-6 w-full max-w-2xl mx-auto">
              <button
                onClick={handleBack}
                disabled={currentQuestionIndex === 0}
                className={`
                  px-10 py-4 border border-neutral-800 text-neutral-400 font-medium text-sm
                  transition-all duration-300 uppercase tracking-[0.1em]
                  ${currentQuestionIndex === 0
                    ? 'opacity-20 cursor-not-allowed'
                    : 'hover:border-neutral-600 hover:text-neutral-300 hover:bg-neutral-900/50 active:scale-[0.98]'
                  }
                `}
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
                {isLastQuestion ? 'View Result' : 'Next'}
              </button>
            </div>
          </div>
        </section>
      )}

      {/* Email Capture Section */}
      {state === 'email' && result && (
        <section className="min-h-screen px-4 py-20 relative z-10 flex items-center justify-center">
          <div className="w-full max-w-4xl mx-auto">
            <EmailCapture
              archetype={result}
              onSubmit={handleEmailSubmit}
              onSkip={handleEmailSkip}
              onBack={handleEmailBack}
            />
          </div>
        </section>
      )}

      {/* Result Section */}
      {state === 'result' && result && (
        <section className="min-h-screen px-4 py-20 relative z-10">
          <div className="w-full max-w-4xl mx-auto">
            <ResultView 
              archetype={archetypes[result]} 
              onStartIntroClass={handleStartIntroClass}
              aiInterpretation={aiInterpretation}
              isInterpreting={isInterpreting}
              onBack={handleResultBack}
            />
          </div>
        </section>
      )}

      {/* Intro Class Section */}
      {state === 'introClass' && result && archetypeIntroClasses[result] && (
        <section className="min-h-screen px-4 py-20 relative z-10">
          <div className="w-full max-w-4xl mx-auto">
            <IntroClassView
              introClass={archetypeIntroClasses[result]}
              onComplete={handleIntroClassComplete}
              onBack={handleResultBack}
            />
          </div>
        </section>
      )}
    </main>
  );
}

