'use client';

import { useState, useEffect } from 'react';
import PageBack from '@/components/PageBack';
import { getResults, getArchetypeCounts } from '@/lib/analytics';

interface CompletionRow {
  archetype: string;
  date: string;
}

interface ArchetypeCountRow {
  archetype: string;
  count: number;
}

export default function AdminPage() {
  const [rows, setRows] = useState<CompletionRow[]>([]);
  const [counts, setCounts] = useState<ArchetypeCountRow[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [selectedArchetype, setSelectedArchetype] = useState<string>('all');

  useEffect(() => {
    loadData();
  }, [selectedArchetype]);

  const loadData = () => {
    setLoading(true);
    try {
      const allResults = getResults();
      const archetypeCounts = getArchetypeCounts();

      let list: CompletionRow[] = allResults.map((r) => ({
        archetype: r.archetype,
        date: r.date,
      }));
      if (selectedArchetype !== 'all') {
        list = list.filter((r) => r.archetype === selectedArchetype);
      }
      list.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

      const countsArray: ArchetypeCountRow[] = Object.entries(archetypeCounts).map(
        ([archetype, count]) => ({
          archetype,
          count,
        })
      );

      setRows(list);
      setCounts(countsArray);
      setTotal(allResults.length);
    } catch (error) {
      console.error('Error loading completions:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleExport = () => {
    const csv = [
      ['Archetype', 'Date'],
      ...rows.map((r) => [
        archetypeNames[r.archetype] || r.archetype,
        new Date(r.date).toLocaleString(),
      ]),
    ]
      .map((row) => row.join(','))
      .join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `quiz-completions-${new Date().toISOString().split('T')[0]}.csv`;
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
    lone_wolf_thinker: 'The Lone Wolf Thinker',
    impulsive_firestarter: 'The Impulsive Firestarter',
    doubt_ridden_strategist: 'The Doubt-Ridden Strategist',
  };

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-neutral-100 px-4 py-20">
      <div className="w-full max-w-6xl mx-auto space-y-8">
        <nav className="-mt-4 mb-2">
          <PageBack />
        </nav>
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-extralight mb-2">Quiz completions</h1>
            <p className="text-neutral-400 font-light">
              Local browser storage only — archetype and time per completion.
            </p>
          </div>
          <div className="flex gap-4">
            <button
              onClick={handleExport}
              className="px-6 py-3 bg-white text-black font-medium text-sm uppercase tracking-[0.1em] hover:bg-neutral-100 transition-all"
            >
              Export CSV
            </button>
            <button
              onClick={loadData}
              className="px-6 py-3 border border-neutral-800 text-neutral-400 font-medium text-sm uppercase tracking-[0.1em] hover:border-neutral-700 hover:text-neutral-300 transition-all"
            >
              Refresh
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="bg-neutral-900 border border-neutral-800 p-6">
            <h3 className="text-sm text-neutral-400 mb-2 uppercase tracking-[0.1em] font-light">
              Total completions
            </h3>
            <p className="text-3xl font-extralight text-neutral-100">{total}</p>
          </div>
          {counts.map((c) => (
            <div key={c.archetype} className="bg-neutral-900 border border-neutral-800 p-6">
              <h3 className="text-sm text-neutral-400 mb-2 uppercase tracking-[0.1em] font-light">
                {archetypeNames[c.archetype] || c.archetype}
              </h3>
              <p className="text-3xl font-extralight text-neutral-100">{c.count}</p>
              <p className="text-xs text-neutral-500 mt-2 font-light">
                {total > 0 ? Math.round((c.count / total) * 100) : 0}%
              </p>
            </div>
          ))}
        </div>

        <div className="bg-neutral-900 border border-neutral-800 p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-extralight uppercase tracking-[0.1em]">All completions</h2>
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
              <option value="lone_wolf_thinker">Lone Wolf Thinker</option>
              <option value="impulsive_firestarter">Impulsive Firestarter</option>
              <option value="doubt_ridden_strategist">Doubt-Ridden Strategist</option>
            </select>
          </div>

          {loading ? (
            <p className="text-neutral-400 text-center py-8">Loading...</p>
          ) : rows.length === 0 ? (
            <p className="text-neutral-400 text-center py-8">No completions in this filter.</p>
          ) : (
            <div className="space-y-2">
              {rows.map((row, index) => (
                <div
                  key={`${row.archetype}-${row.date}-${index}`}
                  className="flex justify-between items-center p-4 bg-neutral-950 border border-neutral-800 hover:border-neutral-700 transition-colors"
                >
                  <div className="flex-1">
                    <p className="text-neutral-100 font-light">
                      {archetypeNames[row.archetype] || row.archetype}
                    </p>
                    <span className="text-xs text-neutral-600">
                      {new Date(row.date).toLocaleString()}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      const line = `${archetypeNames[row.archetype] || row.archetype}\t${new Date(row.date).toLocaleString()}`;
                      void navigator.clipboard.writeText(line);
                    }}
                    className="text-xs text-cyan-400 hover:text-cyan-300 px-3 py-1 border border-cyan-400/30 rounded hover:border-cyan-400 transition-colors font-light"
                  >
                    Copy row
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
