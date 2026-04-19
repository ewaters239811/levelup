'use client';

import { useCallback, useEffect, useState } from 'react';

type Mode = 'idle' | 'playing' | 'paused';

type BlogListenControlsProps = {
  text: string;
};

export default function BlogListenControls({ text }: BlogListenControlsProps) {
  const [mode, setMode] = useState<Mode>('idle');
  const [supported, setSupported] = useState(true);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    setSupported('speechSynthesis' in window);
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined' || !window.speechSynthesis) return;
    const synth = window.speechSynthesis;
    const primeVoices = () => synth.getVoices();
    primeVoices();
    synth.onvoiceschanged = primeVoices;
    return () => {
      synth.onvoiceschanged = null;
      synth.cancel();
    };
  }, []);

  const start = useCallback(() => {
    if (typeof window === 'undefined' || !window.speechSynthesis) return;
    const synth = window.speechSynthesis;
    synth.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.rate = 0.92;
    u.onend = () => setMode('idle');
    u.onerror = () => setMode('idle');
    synth.speak(u);
    setMode('playing');
  }, [text]);

  const pause = useCallback(() => {
    if (typeof window === 'undefined' || !window.speechSynthesis) return;
    window.speechSynthesis.pause();
    setMode('paused');
  }, []);

  const resume = useCallback(() => {
    if (typeof window === 'undefined' || !window.speechSynthesis) return;
    window.speechSynthesis.resume();
    setMode('playing');
  }, []);

  const stop = useCallback(() => {
    if (typeof window === 'undefined' || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    setMode('idle');
  }, []);

  const btnBase =
    'inline-flex items-center justify-center px-4 py-2 text-sm font-medium uppercase tracking-wide rounded-sm transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 focus-visible:ring-offset-2 focus-visible:ring-offset-stone-50';

  if (!supported) {
    return (
      <p className="text-xs text-neutral-500 font-light">
        Listening is not available in this browser.
      </p>
    );
  }

  return (
    <div
      className="rounded-lg border border-stone-200 bg-white/70 px-4 py-3 space-y-3"
      role="region"
      aria-label="Listen to article"
    >
      <div className="flex items-center justify-between gap-2 flex-wrap">
        <p className="text-xs font-medium text-neutral-600 uppercase tracking-wider">
          Listen instead of reading
        </p>
      </div>
      <div className="flex flex-wrap gap-2">
        {mode === 'idle' && (
          <button
            type="button"
            onClick={start}
            className={`${btnBase} bg-neutral-900 text-white hover:bg-neutral-800`}
          >
            Play
          </button>
        )}
        {mode === 'playing' && (
          <>
            <button
              type="button"
              onClick={pause}
              className={`${btnBase} border border-stone-300 text-neutral-800 hover:bg-stone-100`}
            >
              Pause
            </button>
            <button
              type="button"
              onClick={stop}
              className={`${btnBase} border border-stone-300 text-neutral-800 hover:bg-stone-100`}
            >
              Stop
            </button>
          </>
        )}
        {mode === 'paused' && (
          <>
            <button
              type="button"
              onClick={resume}
              className={`${btnBase} bg-neutral-900 text-white hover:bg-neutral-800`}
            >
              Resume
            </button>
            <button
              type="button"
              onClick={stop}
              className={`${btnBase} border border-stone-300 text-neutral-800 hover:bg-stone-100`}
            >
              Stop
            </button>
          </>
        )}
      </div>
      <p className="text-xs text-neutral-500 font-light leading-relaxed">
        Uses your device&apos;s built-in voice. Sound and quality depend on your browser and
        operating system.
      </p>
    </div>
  );
}
