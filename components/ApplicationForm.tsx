'use client';

import { useState } from 'react';
import { ApplicationData } from '@/types/assessment';

interface ApplicationFormProps {
  onSubmit: (data: ApplicationData) => void;
}

export default function ApplicationForm({ onSubmit }: ApplicationFormProps) {
  const [formData, setFormData] = useState<ApplicationData>({
    name: '',
    email: '',
    socialHandle: '',
    currentWork: '',
    stuckAreas: '',
    scoreMeaning: '',
    investmentWillingness: 'Maybe',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRadioChange = (value: 'Yes' | 'Maybe' | 'No') => {
    setFormData((prev) => ({
      ...prev,
      investmentWillingness: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div>
        <label htmlFor="name" className="block text-sm font-light text-gray-700 mb-2">
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 border border-gray-300 rounded-sm focus:outline-none focus:border-gray-900 font-light"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-light text-gray-700 mb-2">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 border border-gray-300 rounded-sm focus:outline-none focus:border-gray-900 font-light"
        />
      </div>

      <div>
        <label htmlFor="socialHandle" className="block text-sm font-light text-gray-700 mb-2">
          Instagram / TikTok handle
        </label>
        <input
          type="text"
          id="socialHandle"
          name="socialHandle"
          value={formData.socialHandle}
          onChange={handleChange}
          placeholder="@username"
          className="w-full px-4 py-3 border border-gray-300 rounded-sm focus:outline-none focus:border-gray-900 font-light"
        />
      </div>

      <div>
        <label htmlFor="currentWork" className="block text-sm font-light text-gray-700 mb-2">
          What are you building or working on right now?
        </label>
        <textarea
          id="currentWork"
          name="currentWork"
          value={formData.currentWork}
          onChange={handleChange}
          required
          rows={4}
          className="w-full px-4 py-3 border border-gray-300 rounded-sm focus:outline-none focus:border-gray-900 font-light resize-none"
        />
      </div>

      <div>
        <label htmlFor="stuckAreas" className="block text-sm font-light text-gray-700 mb-2">
          What currently feels most stuck or misaligned in your life or business?
        </label>
        <textarea
          id="stuckAreas"
          name="stuckAreas"
          value={formData.stuckAreas}
          onChange={handleChange}
          required
          rows={4}
          className="w-full px-4 py-3 border border-gray-300 rounded-sm focus:outline-none focus:border-gray-900 font-light resize-none"
        />
      </div>

      <div>
        <label htmlFor="scoreMeaning" className="block text-sm font-light text-gray-700 mb-2">
          What do you think your Collapse Index score means about your identity?
        </label>
        <textarea
          id="scoreMeaning"
          name="scoreMeaning"
          value={formData.scoreMeaning}
          onChange={handleChange}
          required
          rows={4}
          className="w-full px-4 py-3 border border-gray-300 rounded-sm focus:outline-none focus:border-gray-900 font-light resize-none"
        />
      </div>

      <div>
        <label className="block text-sm font-light text-gray-700 mb-3">
          Are you willing and able to invest financially in this work if we're a fit?
        </label>
        <div className="space-y-2">
          {(['Yes', 'Maybe', 'No'] as const).map((option) => (
            <label
              key={option}
              className="flex items-center space-x-3 cursor-pointer group"
            >
              <input
                type="radio"
                name="investmentWillingness"
                value={option}
                checked={formData.investmentWillingness === option}
                onChange={() => handleRadioChange(option)}
                className="w-4 h-4 text-gray-900 border-gray-300 focus:ring-gray-900"
              />
              <span className="text-gray-700 font-light group-hover:text-gray-900">
                {option}
              </span>
            </label>
          ))}
        </div>
      </div>

      <button
        type="submit"
        className="
          w-full px-8 py-4 bg-gray-900 text-white
          font-light text-lg tracking-wide
          hover:bg-gray-800 transition-colors duration-200
          rounded-sm
        "
      >
        Submit Application
      </button>
    </form>
  );
}

