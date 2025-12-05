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
      <div className="min-h-screen bg-white px-4 py-12">
        <div className="w-full max-w-2xl mx-auto text-center space-y-8">
          <div className="space-y-4">
            <h1 className="text-3xl md:text-4xl font-light text-gray-900">
              Application Received
            </h1>
            <p className="text-lg text-gray-600 font-light leading-relaxed max-w-xl mx-auto">
              If your pattern is a fit, you'll get a message with next steps.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white px-4 py-12">
      <div className="w-full max-w-2xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-3xl md:text-4xl font-light text-gray-900">
            Application
          </h1>
          <p className="text-gray-600 font-light">
            Tell me about yourself and your situation
          </p>
        </div>

        <ApplicationForm onSubmit={handleSubmit} />
      </div>
    </div>
  );
}

