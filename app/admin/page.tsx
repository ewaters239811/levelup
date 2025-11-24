'use client';

import { useState, useEffect } from 'react';
import { getResults, getArchetypeCounts } from '@/lib/analytics';

interface EmailRecord {
  email: string;
  archetype: string;
  created_at: string | Date;
}

interface EmailCount {
  archetype: string;
  count: number;
}

export default function AdminPage() {
  const [emails, setEmails] = useState<EmailRecord[]>([]);
  const [counts, setCounts] = useState<EmailCount[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [selectedArchetype, setSelectedArchetype] = useState<string>('all');

  useEffect(() => {
    loadEmails();
  }, [selectedArchetype]);

  const loadEmails = () => {
    setLoading(true);
    try {
      const allResults = getResults();
      const archetypeCounts = getArchetypeCounts();
      
      // Filter results with emails
      const allEmailsWithData = allResults
        .filter((r) => r.email)
        .map((r) => ({
          email: r.email!,
          archetype: r.archetype,
          created_at: r.date,
        }));

      // Filter by archetype if selected
      let emailResults = allEmailsWithData;
      if (selectedArchetype !== 'all') {
        emailResults = allEmailsWithData.filter((e) => e.archetype === selectedArchetype);
      }

      // Convert counts to array format (only for emails)
      const emailCountsByArchetype: Record<string, number> = {};
      allEmailsWithData.forEach((e) => {
        emailCountsByArchetype[e.archetype] = (emailCountsByArchetype[e.archetype] || 0) + 1;
      });

      const countsArray: EmailCount[] = Object.entries(emailCountsByArchetype).map(([archetype, count]) => ({
        archetype,
        count,
      }));

      setEmails(emailResults);
      setCounts(countsArray);
      setTotal(allEmailsWithData.length); // Total emails across all archetypes
    } catch (error) {
      console.error('Error loading emails:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleExport = () => {
    const csv = [
      ['Email', 'Archetype', 'Date'],
      ...emails.map(e => [e.email, e.archetype, new Date(e.created_at).toLocaleString()])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `emails-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const archetypeNames: Record<string, string> = {
    UNFOCUSED_VISIONARY: 'The Unfocused Visionary',
    SILENT_GRINDER: 'The Silent Grinder',
    OVERGIVER: 'The Overgiver',
    CAGED_POTENTIAL: 'The Caged Potential',
  };

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-neutral-100 px-4 py-20">
      <div className="w-full max-w-6xl mx-auto space-y-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-extralight mb-2">Email Database</h1>
            <p className="text-neutral-400 font-light">View and manage all collected emails (stored locally in your browser)</p>
          </div>
          <div className="flex gap-4">
            <button
              onClick={handleExport}
              className="px-6 py-3 bg-white text-black font-medium text-sm uppercase tracking-[0.1em] hover:bg-neutral-100 transition-all"
            >
              Export CSV
            </button>
            <button
              onClick={loadEmails}
              className="px-6 py-3 border border-neutral-800 text-neutral-400 font-medium text-sm uppercase tracking-[0.1em] hover:border-neutral-700 hover:text-neutral-300 transition-all"
            >
              Refresh
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="bg-neutral-900 border border-neutral-800 p-6">
            <h3 className="text-sm text-neutral-400 mb-2 uppercase tracking-[0.1em] font-light">Total Emails</h3>
            <p className="text-3xl font-extralight text-neutral-100">{total}</p>
          </div>
          {counts.map((count) => (
            <div key={count.archetype} className="bg-neutral-900 border border-neutral-800 p-6">
              <h3 className="text-sm text-neutral-400 mb-2 uppercase tracking-[0.1em] font-light">
                {archetypeNames[count.archetype] || count.archetype}
              </h3>
              <p className="text-3xl font-extralight text-neutral-100">{count.count}</p>
              <p className="text-xs text-neutral-500 mt-2 font-light">
                {total > 0 ? Math.round((count.count / total) * 100) : 0}%
              </p>
            </div>
          ))}
        </div>

        <div className="bg-neutral-900 border border-neutral-800 p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-extralight uppercase tracking-[0.1em]">All Emails</h2>
            <select
              value={selectedArchetype}
              onChange={(e) => setSelectedArchetype(e.target.value)}
              className="px-4 py-2 bg-transparent border border-neutral-800 text-neutral-100 font-light"
            >
              <option value="all">All Archetypes</option>
              <option value="UNFOCUSED_VISIONARY">Unfocused Visionary</option>
              <option value="SILENT_GRINDER">Silent Grinder</option>
              <option value="OVERGIVER">Overgiver</option>
              <option value="CAGED_POTENTIAL">Caged Potential</option>
            </select>
          </div>

          {loading ? (
            <p className="text-neutral-400 text-center py-8">Loading...</p>
          ) : emails.length === 0 ? (
            <p className="text-neutral-400 text-center py-8">No emails found.</p>
          ) : (
            <div className="space-y-2">
              {emails.map((email, index) => (
                <div
                  key={`${email.email}-${index}`}
                  className="flex justify-between items-center p-4 bg-neutral-950 border border-neutral-800 hover:border-neutral-700 transition-colors"
                >
                  <div className="flex-1">
                    <p className="text-neutral-100 font-light">{email.email}</p>
                    <div className="flex gap-4 mt-2">
                      <span className="text-xs text-neutral-500">
                        {archetypeNames[email.archetype] || email.archetype}
                      </span>
                      <span className="text-xs text-neutral-600">
                        {new Date(email.created_at).toLocaleString()}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(email.email);
                      alert('Email copied!');
                    }}
                    className="text-xs text-cyan-400 hover:text-cyan-300 px-3 py-1 border border-cyan-400/30 rounded hover:border-cyan-400 transition-colors font-light"
                  >
                    Copy
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

