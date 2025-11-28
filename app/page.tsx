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

type AppState = 'landing' | 'quickMode' | 'deepMode' | 'confirmation' | 'result';

export default function Home() {
  const [state, setState] = useState<AppState>('landing');
  const [intakeMode, setIntakeMode] = useState<IntakeMode | null>(null);
  const [quickModeResponses, setQuickModeResponses] = useState<QuickModeResponse[]>([]);
  const [analysis, setAnalysis] = useState<ArchetypeAnalysis | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

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
        <section className="min-h-screen px-4 py-12 md:py-20 bg-gradient-to-br from-[#faf8f6] via-[#f5f1ec] to-[#faf8f6]">
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

      {/* Deep Mode - Placeholder */}
      {state === 'deepMode' && (
        <section className="min-h-screen px-4 py-20 bg-gradient-to-br from-[#faf8f6] via-[#f5f1ec] to-[#faf8f6]">
          <div className="w-full max-w-4xl mx-auto">
            <p className="text-center text-[#826a54]">Deep Mode - Coming Soon</p>
            <button
              onClick={() => setState('landing')}
              className="mt-8 px-6 py-3 bg-[#826a54] text-white rounded-lg hover:bg-[#9d8169] transition-colors"
            >
              Back to Home
            </button>
          </div>
        </section>
      )}

      {/* Confirmation Page */}
      {state === 'confirmation' && analysis && (
        <section className="min-h-screen px-4 py-12 md:py-20 bg-gradient-to-br from-[#faf8f6] via-[#f5f1ec] to-[#faf8f6]">
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
        <section className="min-h-screen px-4 py-12 md:py-20 bg-gradient-to-br from-[#faf8f6] via-[#f5f1ec] to-[#faf8f6]">
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

