'use client';

import { useState } from 'react';
import PageBack from '@/components/PageBack';

export default function WeeklySubscribersAdminPage() {
  const [secret, setSecret] = useState('');
  const [emails, setEmails] = useState<string[] | null>(null);
  const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const load = async () => {
    setStatus('loading');
    setMessage('');
    setEmails(null);
    try {
      const response = await fetch('/api/weekly-subscribers', {
        headers: { 'x-weekly-admin-secret': secret.trim() },
      });
      const data = await response.json();
      if (!response.ok) {
        const hint =
          typeof data?.hint === 'string' && data.hint.trim()
            ? `\n\n${data.hint.trim()}`
            : '';
        throw new Error((data?.error || 'Failed to load') + hint);
      }
      setEmails(data.emails || []);
      setStatus('idle');
    } catch (e) {
      setStatus('error');
      setMessage(e instanceof Error ? e.message : 'Failed to load');
    }
  };

  const copyText = (text: string) => {
    void navigator.clipboard.writeText(text);
  };

  const csv =
    emails && emails.length
      ? ['email', ...emails.map((e) => `"${e.replace(/"/g, '""')}"`)].join('\n')
      : '';

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-neutral-100 px-4 py-16">
      <div className="mx-auto max-w-3xl space-y-8">
        <nav>
          <PageBack />
        </nav>

        <header className="space-y-2">
          <h1 className="text-3xl font-extralight tracking-tight">Weekly blog subscribers</h1>
          <p className="text-sm text-neutral-400 font-light">
            Private list — only you should have the admin secret. Copy emails and send your weekly
            note manually from your inbox or tool of choice.
          </p>
        </header>

        <div className="space-y-3 rounded-lg border border-neutral-800 bg-neutral-900/50 p-4">
          <label className="block text-xs uppercase tracking-wider text-neutral-500">
            Admin secret
          </label>
          <input
            type="password"
            value={secret}
            onChange={(e) => setSecret(e.target.value)}
            placeholder="Same value as WEEKLY_ADMIN_SECRET on the server"
            className="w-full rounded-sm border border-neutral-700 bg-neutral-950 px-3 py-2 text-sm text-neutral-100 placeholder:text-neutral-600 focus:outline-none focus:ring-1 focus:ring-neutral-500"
            autoComplete="off"
          />
          <button
            type="button"
            onClick={() => void load()}
            disabled={!secret.trim() || status === 'loading'}
            className="rounded-sm bg-white px-4 py-2 text-sm font-medium uppercase tracking-wide text-black hover:bg-neutral-200 disabled:opacity-50"
          >
            {status === 'loading' ? 'Loading…' : 'Load list'}
          </button>
          {status === 'error' && message ? (
            <p className="whitespace-pre-wrap text-sm text-red-400">{message}</p>
          ) : null}
        </div>

        {emails && (
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => copyText(emails.join('\n'))}
                className="rounded-sm border border-neutral-700 px-3 py-2 text-xs uppercase tracking-wide text-neutral-300 hover:border-neutral-500"
              >
                Copy all (one per line)
              </button>
              {csv ? (
                <button
                  type="button"
                  onClick={() => copyText(csv)}
                  className="rounded-sm border border-neutral-700 px-3 py-2 text-xs uppercase tracking-wide text-neutral-300 hover:border-neutral-500"
                >
                  Copy as CSV
                </button>
              ) : null}
            </div>
            <p className="text-sm text-neutral-500">
              {emails.length} address{emails.length === 1 ? '' : 'es'}
            </p>
            {emails.length === 0 ? (
              <p className="text-neutral-500 text-sm">No signups yet.</p>
            ) : (
              <ul className="max-h-[60vh] overflow-auto rounded border border-neutral-800 bg-neutral-950 text-sm divide-y divide-neutral-800">
                {emails.map((e) => (
                  <li key={e} className="px-3 py-2 font-mono text-neutral-200">
                    {e}
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
