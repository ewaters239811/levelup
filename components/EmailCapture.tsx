'use client';

import { useState } from 'react';

interface EmailCaptureProps {
  archetype: string;
  onSubmit: (email: string) => void;
  onSkip: () => void;
}

export default function EmailCapture({ archetype, onSubmit, onSkip }: EmailCaptureProps) {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email.trim()) {
      setError('Please enter your email address');
      return;
    }

    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setIsSubmitting(true);

    try {
      // Send results to email
      const response = await fetch('/api/send-results', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          archetypeKey: archetype,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send email');
      }

      // Show success message
      setSuccess(true);
      
      // Save email locally (stored in localStorage via analytics)
      // Small delay to show success message
      setTimeout(() => {
        onSubmit(email);
      }, 1500);
    } catch (err) {
      console.error('Error sending email:', err);
      setError('Failed to send email. You can still view your results below.');
      setIsSubmitting(false);
      // Still allow them to proceed even if email fails
      setTimeout(() => {
        onSubmit(email);
      }, 2000);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <h2 className="text-3xl md:text-4xl font-extralight text-neutral-100 tracking-tight">
          Get Your Personalized Results
        </h2>
        <p className="text-lg text-neutral-400 font-light max-w-xl mx-auto">
          Enter your email to receive your archetype analysis and weekly insights tailored to your pattern.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setError('');
            }}
            placeholder="your.email@example.com"
            className="
              w-full px-6 py-4 bg-transparent border border-neutral-800 
              text-neutral-100 text-lg font-light
              focus:outline-none focus:border-white transition-colors
              placeholder:text-neutral-600
            "
            disabled={isSubmitting}
          />
          {error && (
            <p className="mt-2 text-sm text-red-400">{error}</p>
          )}
          {success && (
            <p className="mt-2 text-sm text-cyan-400">✓ Email sent! Check your inbox.</p>
          )}
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="
              flex-1 px-10 py-4 bg-white text-black font-medium text-sm
              transition-all duration-300 border border-white uppercase tracking-[0.1em]
              hover:bg-neutral-100 hover:scale-[1.01] active:scale-[0.98] 
              hover:shadow-[0_0_30px_rgba(6,182,212,0.3)]
              disabled:opacity-50 disabled:cursor-not-allowed
            "
          >
            {isSubmitting ? 'Sending...' : 'Get My Results'}
          </button>
          <button
            type="button"
            onClick={onSkip}
            className="
              px-10 py-4 border border-neutral-800 text-neutral-400 font-medium text-sm
              transition-all duration-300 uppercase tracking-[0.1em]
              hover:border-neutral-700 hover:text-neutral-300 hover:bg-neutral-900/50
              active:scale-[0.98]
            "
          >
            Skip
          </button>
        </div>

        <p className="text-xs text-neutral-600 text-center font-light">
          Your results and intro class will be sent to your email. We respect your privacy.
        </p>
      </form>
    </div>
  );
}

