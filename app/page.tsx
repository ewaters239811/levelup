'use client';

import { useState } from 'react';
import { IntakeMode, QuickModeResponse, ArchetypeAnalysis } from '@/types/intake';
import { quickModeQuestions } from '@/data/quickModeQuestions';
import QuickModeFlow from '@/components/quickMode/QuickModeFlow';
import ConfirmationPage from '@/components/ConfirmationPage';
import ResultPage from '@/components/ResultPage';
import PageLayout from '@/components/landing/PageLayout';
import HeroSection from '@/components/landing/HeroSection';
import ModeCard from '@/components/landing/ModeCard';
import DeepModeInput from '@/components/deepMode/DeepModeInput';
import DeepModeQuestions from '@/components/deepMode/DeepModeQuestions';

type AppState = 'landing' | 'quickMode' | 'deepMode' | 'confirmation' | 'result';

export default function Home() {
  const [state, setState] = useState<AppState>('landing');
  const [intakeMode, setIntakeMode] = useState<IntakeMode | null>(null);
  const [quickModeResponses, setQuickModeResponses] = useState<QuickModeResponse[]>([]);
  const [analysis, setAnalysis] = useState<ArchetypeAnalysis | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [deepModeText, setDeepModeText] = useState<string>('');
  const [deepModeInitialAnalysis, setDeepModeInitialAnalysis] = useState<ArchetypeAnalysis | null>(null);
  const [deepModeQuestions, setDeepModeQuestions] = useState<Array<{id: string; text: string}>>([]);
  const [deepModeAnswers, setDeepModeAnswers] = useState<Record<string, string>>({});
  const [isLoadingDeepAnalysis, setIsLoadingDeepAnalysis] = useState(false);

  const handleModeSelect = (mode: IntakeMode) => {
    setIntakeMode(mode);
    setState(mode === 'quick' ? 'quickMode' : 'deepMode');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleQuickModeComplete = async (responses: QuickModeResponse[]) => {
    setQuickModeResponses(responses);
    setIsAnalyzing(true);

    try {
      const response = await fetch('/api/analyze-quick', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          responses,
          questions: quickModeQuestions,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to analyze responses');
      }

      const data = await response.json();
      setAnalysis(data);
      setState('confirmation');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
      console.error('Error analyzing quick mode:', error);
      alert('Failed to analyze responses. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleConfirmation = async (selectedTraits: string[]) => {
    if (!analysis) return;
    setIsAnalyzing(true);
    
    try {
      const response = await fetch('/api/confirm', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          initialAnalysis: analysis,
          selectedTraits,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to confirm analysis');
      }

      const updatedAnalysis = await response.json();
      setAnalysis(updatedAnalysis);
      setState('result');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
      console.error('Error confirming analysis:', error);
      // Proceed to result with initial analysis if confirmation fails
      setState('result');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <PageLayout>
      {/* Landing Section */}
      {state === 'landing' && (
        <section className="min-h-screen flex items-center justify-center px-4 py-20 relative z-10">
          <div className="w-full max-w-6xl mx-auto">
            <HeroSection />

            {/* Mode Selection Cards */}
            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-12">
              <ModeCard variant="quick" onClick={() => handleModeSelect('quick')} />
              <ModeCard variant="deep" onClick={() => handleModeSelect('deep')} />
            </div>

            {/* Footer Note */}
            <div className="text-center">
              <p className="text-sm text-[#826a54]/50 font-light italic">
                Both modes lead to comprehensive archetype insights
              </p>
            </div>
          </div>
        </section>
      )}

      {/* Quick Mode */}
      {state === 'quickMode' && (
        <section className="min-h-screen px-4 py-12 md:py-20 bg-gradient-to-br from-[#0a0a0a] via-[#1a0f1a] to-[#0a0a0a]">
          {isAnalyzing ? (
            <div className="flex items-center justify-center min-h-[60vh]">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 border-4 border-[#d4af37]/30 border-t-[#d4af37] rounded-full animate-spin mx-auto"></div>
                <p className="text-[#826a54] font-light">Analyzing your responses...</p>
              </div>
            </div>
          ) : (
            <QuickModeFlow
              questions={quickModeQuestions}
              onComplete={handleQuickModeComplete}
              onBack={() => {
                setState('landing');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
          )}
        </section>
      )}

      {/* Deep Mode */}
      {state === 'deepMode' && (
        <section className="min-h-screen px-4 py-12 md:py-20 bg-gradient-to-br from-[#0a0a0a] via-[#1a0f1a] to-[#0a0a0a]">
          {!deepModeInitialAnalysis ? (
            <DeepModeInput
              onSubmit={async (textInput) => {
                setDeepModeText(textInput);
                setIsLoadingDeepAnalysis(true);

                try {
                  const response = await fetch('/api/intake-deep', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ text: textInput }),
                  });

                  if (!response.ok) {
                    throw new Error('Failed to analyze story');
                  }

                  const data = await response.json();
                  setDeepModeInitialAnalysis(data);
                  setDeepModeQuestions(data.customQuestions || []);
                  
                  if (data.customQuestions && data.customQuestions.length > 0) {
                    // Stay in deepMode state to show questions
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  } else {
                    // No questions, go directly to confirmation
                    setAnalysis(data);
                    setState('confirmation');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }
                } catch (error) {
                  console.error('Error analyzing deep mode:', error);
                  alert('Failed to analyze your story. Please try again.');
                } finally {
                  setIsLoadingDeepAnalysis(false);
                }
              }}
              onBack={() => {
                setState('landing');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
          ) : deepModeQuestions.length > 0 && !analysis ? (
            <DeepModeQuestions
              questions={deepModeQuestions}
              onComplete={async (answers) => {
                setDeepModeAnswers(answers);
                setIsLoadingDeepAnalysis(true);

                try {
                  // Send text + answers for final analysis
                  const response = await fetch('/api/intake-deep/analyze-final', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                      text: deepModeText,
                      initialAnalysis: deepModeInitialAnalysis,
                      answers,
                    }),
                  });

                  if (!response.ok) {
                    throw new Error('Failed to finalize analysis');
                  }

                  const finalAnalysis = await response.json();
                  setAnalysis(finalAnalysis);
                  setState('confirmation');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                } catch (error) {
                  console.error('Error finalizing analysis:', error);
                  // Use initial analysis if final fails
                  setAnalysis(deepModeInitialAnalysis);
                  setState('confirmation');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                } finally {
                  setIsLoadingDeepAnalysis(false);
                }
              }}
              onBack={() => {
                setDeepModeInitialAnalysis(null);
                setDeepModeQuestions([]);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
          ) : (
            <div className="flex items-center justify-center min-h-[60vh]">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 border-4 border-[#d4af37]/30 border-t-[#d4af37] rounded-full animate-spin mx-auto"></div>
                <p className="text-neutral-300 font-light">Analyzing your story...</p>
              </div>
            </div>
          )}
          
          {isLoadingDeepAnalysis && (
            <div className="fixed inset-0 bg-[#0a0a0a]/80 backdrop-blur-sm flex items-center justify-center z-50">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 border-4 border-[#d4af37]/30 border-t-[#d4af37] rounded-full animate-spin mx-auto"></div>
                <p className="text-neutral-300 font-light">Analyzing your story...</p>
              </div>
            </div>
          )}
        </section>
      )}

      {/* Confirmation Page */}
      {state === 'confirmation' && analysis && (
        <section className="min-h-screen px-4 py-12 md:py-20 bg-gradient-to-br from-[#0a0a0a] via-[#1a0f1a] to-[#0a0a0a]">
          {isAnalyzing ? (
            <div className="flex items-center justify-center min-h-[60vh]">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 border-4 border-[#d4af37]/30 border-t-[#d4af37] rounded-full animate-spin mx-auto"></div>
                <p className="text-[#826a54] font-light">Recalculating your archetype...</p>
              </div>
            </div>
          ) : (
            <ConfirmationPage
              analysis={analysis}
              onConfirm={handleConfirmation}
              onBack={() => {
                setState('quickMode');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
          )}
        </section>
      )}

      {/* Result Page */}
      {state === 'result' && analysis && (
        <section className="min-h-screen px-4 py-12 md:py-20 bg-gradient-to-br from-[#0a0a0a] via-[#1a0f1a] to-[#0a0a0a]">
          <ResultPage
            analysis={analysis}
            onBack={() => {
              setState('confirmation');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        </section>
      )}
    </PageLayout>
  );
}

