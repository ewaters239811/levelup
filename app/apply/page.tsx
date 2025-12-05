'use client';

import { useState } from 'react';
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
      <div className="min-h-screen bg-black px-4 py-12 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
        </div>
        <div className="w-full max-w-2xl mx-auto text-center space-y-6 relative z-10">
          <div className="space-y-3">
            <h1 className="text-3xl md:text-4xl font-light text-white">
              Application Received
            </h1>
            <p className="text-base text-gray-400 font-light max-w-lg mx-auto">
              If your pattern is a fit, you'll get a message with next steps.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black px-4 py-12 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-white/3 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-white/3 rounded-full blur-3xl"></div>
      </div>
      <div className="w-full max-w-2xl mx-auto space-y-8 relative z-10">
        {/* Clearpth Branding */}
        <div className="absolute top-0 left-0">
          <p className="text-xs text-gray-600 font-light tracking-widest uppercase">
            Clearpth
          </p>
        </div>

        <div className="text-center space-y-3 pt-8">
          <h1 className="text-3xl md:text-4xl font-light text-white">
            Application
          </h1>
          <p className="text-sm text-gray-500 font-light">
            Tell me about yourself and your situation
          </p>
        </div>

        <ApplicationForm onSubmit={handleSubmit} />
      </div>
    </div>
  );
}
