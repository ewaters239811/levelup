'use client';

import { useState } from 'react';

interface AIDiagnosticInputProps {
  onSubmit: (paragraph: string, birthday: string) => void;
  onBack?: () => void;
}

export default function AIDiagnosticInput({ onSubmit, onBack }: AIDiagnosticInputProps) {
  const [paragraph, setParagraph] = useState('');
  const [birthday, setBirthday] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateBirthday = (date: string): boolean => {
    const regex = /^\d{2}\/\d{2}\/\d{4}$/;
    if (!regex.test(date)) return false;
    
    const [month, day, year] = date.split('/').map(Number);
    const dateObj = new Date(year, month - 1, day);
    
    return (
      dateObj.getMonth() === month - 1 &&
      dateObj.getDate() === day &&
      dateObj.getFullYear() === year &&
      year >= 1900 &&
      year <= new Date().getFullYear()
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!paragraph.trim() || paragraph.trim().length < 50) {
      setError('Please write at least 50 characters about your life, career, dreams, and challenges.');
      return;
    }
    
    if (!birthday.trim()) {
      setError('Please enter your birthday.');
      return;
    }
    
    if (!validateBirthday(birthday)) {
      setError('Please enter a valid birthday in mm/dd/yyyy format (e.g., 01/15/1990).');
      return;
    }
    
    setIsSubmitting(true);
    onSubmit(paragraph.trim(), birthday.trim());
  };

  const formatBirthday = (value: string) => {
    // Remove all non-digits
    const digits = value.replace(/\D/g, '');
    
    // Format as mm/dd/yyyy
    if (digits.length <= 2) {
      return digits;
    } else if (digits.length <= 4) {
      return `${digits.slice(0, 2)}/${digits.slice(2)}`;
    } else {
      return `${digits.slice(0, 2)}/${digits.slice(2, 4)}/${digits.slice(4, 8)}`;
    }
  };

  const handleBirthdayChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatBirthday(e.target.value);
    setBirthday(formatted);
  };

  return (
    <div className="w-full max-w-3xl mx-auto space-y-8">
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
            ← Back
          </button>
        </div>
      )}

      <div className="text-center space-y-6 pb-8 border-b border-neutral-800">
        <h1 className="text-4xl md:text-5xl font-extralight text-neutral-100 tracking-tight">
          <span className="gradient-text">AI Diagnostic</span>
        </h1>
        <p className="text-lg text-neutral-400 font-light max-w-2xl mx-auto leading-relaxed">
          Share your story and receive personalized insights about your patterns, tendencies, and path forward.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="space-y-4">
          <label className="block">
            <span className="text-sm uppercase tracking-[0.1em] text-neutral-400 font-medium mb-3 block">
              Tell Us About Yourself
            </span>
            <textarea
              value={paragraph}
              onChange={(e) => setParagraph(e.target.value)}
              rows={10}
              placeholder="Write a paragraph about your life, career, dreams, challenges, and what you want to improve on. Be as detailed as you'd like..."
              className="
                w-full p-6 bg-transparent border border-neutral-800 text-neutral-100 text-lg font-light
                focus:outline-none focus:border-white transition-colors resize-y min-h-[200px]
                placeholder:text-neutral-600 leading-relaxed
              "
              required
            />
            <p className="text-xs text-neutral-500 mt-2 font-light">
              {paragraph.length} characters (minimum 50)
            </p>
          </label>
        </div>

        <div className="space-y-4">
          <label className="block">
            <span className="text-sm uppercase tracking-[0.1em] text-neutral-400 font-medium mb-3 block">
              Your Birthday
            </span>
            <input
              type="text"
              value={birthday}
              onChange={handleBirthdayChange}
              placeholder="mm/dd/yyyy (e.g., 01/15/1990)"
              maxLength={10}
              className="
                w-full p-6 bg-transparent border border-neutral-800 text-neutral-100 text-lg font-light
                focus:outline-none focus:border-white transition-colors
                placeholder:text-neutral-600
              "
              required
            />
            <p className="text-xs text-neutral-500 mt-2 font-light">
              Used to calculate your life path number for deeper insights
            </p>
          </label>
        </div>

        {error && (
          <div className="p-4 border border-red-500/30 bg-red-500/10 text-red-400 text-sm">
            {error}
          </div>
        )}

        <div className="flex items-center justify-between pt-8 border-t border-neutral-800">
          {onBack && (
            <button
              type="button"
              onClick={onBack}
              className="
                px-8 py-4 border border-neutral-800 text-neutral-400 font-medium text-sm
                transition-all duration-300 uppercase tracking-[0.1em]
                hover:border-neutral-700 hover:text-neutral-300 hover:bg-neutral-900/50
                active:scale-[0.98]
              "
            >
              Back
            </button>
          )}
          <button
            type="submit"
            disabled={isSubmitting || paragraph.length < 50 || !birthday}
            className="
              px-10 py-4 bg-white text-black font-medium text-sm uppercase tracking-[0.1em]
              transition-all duration-300 border border-white
              hover:bg-neutral-100 hover:scale-[1.01] active:scale-[0.98]
              hover:shadow-[0_0_30px_rgba(6,182,212,0.3)]
              disabled:opacity-50 disabled:cursor-not-allowed
            "
          >
            {isSubmitting ? 'Processing...' : 'Generate Questions'}
          </button>
        </div>
      </form>
    </div>
  );
}

