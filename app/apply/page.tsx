'use client';

import { useState } from 'react';
import PageBack from '@/components/PageBack';
import ApplicationForm from '@/components/ApplicationForm';
import { ApplicationData } from '@/types/assessment';

export default function ApplyPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (data: ApplicationData) => {
    console.log('Application Data:', data);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="bronze-shell min-h-screen px-4 py-12 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-amber-500/20 rounded-full blur-3xl"></div>
        </div>
        <div className="bronze-panel w-full max-w-2xl mx-auto text-center space-y-6 relative z-10 rounded-3xl px-6 py-8 md:px-10">
          <div className="flex justify-start pt-8">
            <PageBack />
          </div>
          <div className="space-y-3">
            <h1 className="text-3xl md:text-4xl font-light text-amber-50 text-glow">
              Application Received
            </h1>
            <p className="text-base text-amber-100/75 font-light max-w-lg mx-auto">
              If your pattern is a fit, you'll get a message with next steps.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bronze-shell min-h-screen px-4 py-12 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-500/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-orange-400/15 rounded-full blur-3xl"></div>
      </div>
      <div className="bronze-panel w-full max-w-2xl mx-auto space-y-8 relative z-10 rounded-3xl px-6 py-8 md:px-10">
        <div className="flex items-start justify-between gap-4 pt-8">
          <PageBack />
          <p className="text-xs text-amber-200/60 font-light tracking-widest uppercase shrink-0 pt-0.5">
            Clearpth
          </p>
        </div>

        <div className="text-center space-y-3">
          <h1 className="text-3xl md:text-4xl font-light text-amber-50 text-glow">
            Application
          </h1>
          <p className="text-sm text-amber-100/65 font-light">
            Tell me about yourself and your situation
          </p>
        </div>

        <ApplicationForm onSubmit={handleSubmit} />
      </div>
    </div>
  );
}
