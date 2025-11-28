'use client';

import { useState, useRef, useEffect } from 'react';

interface DeepModeInputProps {
  onSubmit: (text: string, voiceTranscript?: string) => void;
  onBack: () => void;
}

export default function DeepModeInput({ onSubmit, onBack }: DeepModeInputProps) {
  const [text, setText] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isSupported, setIsSupported] = useState(false);
  const [error, setError] = useState('');
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    // Check if browser supports speech recognition
    if (typeof window !== 'undefined') {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      setIsSupported(!!SpeechRecognition);
      
      if (SpeechRecognition) {
        const recognition = new SpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = 'en-US';

        recognition.onresult = (event: any) => {
          let transcript = '';
          for (let i = event.resultIndex; i < event.results.length; i++) {
            transcript += event.results[i][0].transcript;
          }
          setText(prev => prev + (prev ? ' ' : '') + transcript);
        };

        recognition.onerror = (event: any) => {
          console.error('Speech recognition error:', event.error);
          setError(`Speech recognition error: ${event.error}`);
          setIsRecording(false);
        };

        recognition.onend = () => {
          setIsRecording(false);
        };

        recognitionRef.current = recognition;
      }
    }
  }, []);

  const handleStartRecording = () => {
    if (!recognitionRef.current) {
      setError('Speech recognition not available in this browser');
      return;
    }

    setError('');
    try {
      recognitionRef.current.start();
      setIsRecording(true);
    } catch (err) {
      console.error('Error starting recognition:', err);
      setError('Failed to start voice recording');
    }
  };

  const handleStopRecording = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsRecording(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim().length < 50) {
      setError('Please write or speak at least 50 characters about yourself');
      return;
    }
    onSubmit(text.trim());
  };

  return (
    <div className="w-full max-w-3xl mx-auto space-y-8">
      {/* Back Button */}
      <div className="mb-8">
        <button
          onClick={onBack}
          className="
            px-6 py-3 rounded-xl border-2 border-[#2a1f3a]/50 text-neutral-300
            font-light hover:border-[#d4af37]/50 hover:text-[#d4af37]
            transition-all duration-200
          "
        >
          ← Back
        </button>
      </div>

      {/* Header */}
      <div className="text-center space-y-6 pb-8 border-b border-[#2a1f3a]/50">
        <h1 className="text-4xl md:text-5xl font-light text-white">
          <span className="bg-gradient-to-r from-[#d4af37] via-[#f4d03f] to-[#d4af37] bg-clip-text text-transparent">
            Deep Mode
          </span>
        </h1>
        <p className="text-lg text-neutral-300/80 font-light max-w-2xl mx-auto leading-relaxed">
          Share your story through text or voice. Our AI will analyze your patterns, behaviors, and shadow traits to provide comprehensive archetype insights.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Text Input */}
        <div className="space-y-4">
          <label className="block">
            <span className="text-sm uppercase tracking-[0.1em] text-neutral-400 font-medium mb-3 block">
              Tell Us Your Story
            </span>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              rows={12}
              placeholder="Share about your life, career, dreams, challenges, patterns, relationships, fears, desires... Be as detailed and authentic as you'd like. This will help us understand your true archetype."
              className="
                w-full p-6 rounded-xl border-2 border-[#2a1f3a]/50 bg-[#1a0f1a]/50
                text-white placeholder-neutral-500 font-light text-lg leading-relaxed
                focus:outline-none focus:border-[#d4af37]/50 focus:bg-[#1a0f1a]/70
                transition-all duration-300 resize-y
                backdrop-blur-sm
              "
              required
            />
            <p className="text-xs text-neutral-500 mt-2 font-light">
              {text.length} characters (minimum 50)
            </p>
          </label>
        </div>

        {/* Voice Input */}
        {isSupported && (
          <div className="space-y-4 p-6 rounded-xl border-2 border-[#2a1f3a]/50 bg-[#1a0f1a]/30 backdrop-blur-sm">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm uppercase tracking-[0.1em] text-neutral-400 font-medium mb-1">
                  Voice Input
                </h3>
                <p className="text-xs text-neutral-500 font-light">
                  Speak your story instead of typing
                </p>
              </div>
              {!isRecording ? (
                <button
                  type="button"
                  onClick={handleStartRecording}
                  className="
                    px-6 py-3 rounded-xl bg-gradient-to-r from-[#d4af37]/20 to-[#8b5cf6]/20
                    border border-[#d4af37]/30 text-[#d4af37] font-light
                    hover:from-[#d4af37]/30 hover:to-[#8b5cf6]/30
                    transition-all duration-300
                    flex items-center gap-2
                  "
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                  </svg>
                  Start Recording
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleStopRecording}
                  className="
                    px-6 py-3 rounded-xl bg-gradient-to-r from-red-500/20 to-red-600/20
                    border border-red-500/30 text-red-400 font-light
                    hover:from-red-500/30 hover:to-red-600/30
                    transition-all duration-300
                    flex items-center gap-2 animate-pulse
                  "
                >
                  <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse"></div>
                  Stop Recording
                </button>
              )}
            </div>
            {isRecording && (
              <div className="mt-4 p-4 rounded-lg bg-[#d4af37]/10 border border-[#d4af37]/30">
                <p className="text-sm text-[#d4af37] font-light flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#d4af37] animate-pulse"></span>
                  Listening... Speak now
                </p>
              </div>
            )}
          </div>
        )}

        {error && (
          <div className="p-4 rounded-xl border-2 border-red-500/30 bg-red-500/10 text-red-400 text-sm">
            {error}
          </div>
        )}

        {/* Submit Button */}
        <div className="flex items-center justify-between pt-8 border-t border-[#2a1f3a]/50">
          <button
            type="button"
            onClick={onBack}
            className="
              px-6 py-3 rounded-xl border-2 border-[#2a1f3a]/50 text-neutral-300
              font-light hover:border-[#d4af37]/50 hover:text-[#d4af37]
              transition-all duration-200
            "
          >
            Back
          </button>
          <button
            type="submit"
            disabled={text.length < 50}
            className={`
              px-10 py-4 rounded-xl font-light text-lg transition-all duration-300
              ${text.length >= 50
                ? 'bg-gradient-to-r from-[#d4af37] to-[#f4d03f] text-black hover:shadow-lg hover:shadow-[#d4af37]/50 hover:scale-105'
                : 'bg-[#2a1f3a] text-neutral-500 cursor-not-allowed'
              }
            `}
          >
            Analyze My Story
          </button>
        </div>
      </form>
    </div>
  );
}

