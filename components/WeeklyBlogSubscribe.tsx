'use client';

import { useState } from 'react';

export default function WeeklyBlogSubscribe() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>(
    'idle'
  );
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('loading');
    setMessage('');

    try {
      const response = await fetch('/api/subscribe-weekly', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      if (!response.ok) {
        const base = data?.error || 'Failed to subscribe';
        const hint =
          typeof data?.hint === 'string' && data.hint.trim()
            ? `\n\n${data.hint.trim()}`
            : '';
        throw new Error(`${base}${hint}`);
      }

      setStatus('success');
      setMessage(
        "You're on the list. You'll get the weekly note when it's sent out."
      );
      setEmail('');
    } catch (error) {
      setStatus('error');
      setMessage(
        error instanceof Error
          ? error.message
          : 'Could not subscribe right now. Please try again.'
      );
    }
  };

  return (
    <section className="rounded-lg border border-stone-200 bg-white/70 p-4 space-y-3">
      <h2 className="text-sm font-medium text-neutral-700 uppercase tracking-wider">
        Get This Weekly By Email
      </h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          className="w-full rounded-sm border border-stone-300 bg-white px-4 py-2.5 text-sm text-neutral-900 placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-neutral-400"
          disabled={status === 'loading'}
        />
        <button
          type="submit"
          disabled={status === 'loading'}
          className="w-full rounded-sm bg-neutral-900 px-4 py-2.5 text-sm font-medium uppercase tracking-wide text-white transition-colors hover:bg-neutral-800 disabled:opacity-60"
        >
          {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
        </button>
      </form>
      {message ? (
        <p
          className={`text-xs font-light ${
            status === 'success' ? 'text-emerald-700' : 'text-red-700'
          } ${status === 'error' ? 'whitespace-pre-wrap' : ''}`}
        >
          {message}
        </p>
      ) : null}
      <p className="text-xs text-neutral-500 font-light">
        Your email is only used for this list. Reply to any weekly message if you want off.
      </p>
    </section>
  );
}
