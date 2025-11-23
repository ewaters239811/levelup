'use client';

import { useState, useEffect } from 'react';
import { getResults, getArchetypeCounts, exportResults, clearResults } from '@/lib/analytics';

export default function AnalyticsPage() {
  const [results, setResults] = useState<any[]>([]);
  const [counts, setCounts] = useState<Record<string, number>>({});
  const [exportData, setExportData] = useState<string>('');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    const allResults = getResults();
    const archetypeCounts = getArchetypeCounts();
    setResults(allResults);
    setCounts(archetypeCounts);
    setExportData(exportResults());
  };

  const handleExport = () => {
    const data = exportResults();
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `level-up-diagnostic-analytics-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleClear = () => {
    if (confirm('Are you sure you want to clear all analytics data? This cannot be undone.')) {
      clearResults();
      loadData();
    }
  };

  const archetypeNames: Record<string, string> = {
    UNFOCUSED_VISIONARY: 'The Unfocused Visionary',
    SILENT_GRINDER: 'The Silent Grinder',
    OVERGIVER: 'The Overgiver',
    CAGED_POTENTIAL: 'The Caged Potential',
  };

  return (
    <main className="min-h-screen bg-black text-neutral-100 px-4 py-20">
      <div className="w-full max-w-6xl mx-auto space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-4xl font-bold">Analytics Dashboard</h1>
          <div className="flex gap-4">
            <button
              onClick={handleExport}
              className="px-6 py-3 bg-neutral-100 text-black font-semibold rounded-lg hover:bg-neutral-200 transition-all"
            >
              Export Data
            </button>
            <button
              onClick={handleClear}
              className="px-6 py-3 border-2 border-red-500 text-red-500 font-semibold rounded-lg hover:bg-red-500 hover:text-white transition-all"
            >
              Clear Data
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-neutral-900 rounded-lg p-6 border border-neutral-800">
            <h3 className="text-sm text-neutral-400 mb-2">Total Completions</h3>
            <p className="text-3xl font-bold text-neutral-100">{results.length}</p>
          </div>
          {Object.entries(counts).map(([key, count]) => (
            <div key={key} className="bg-neutral-900 rounded-lg p-6 border border-neutral-800">
              <h3 className="text-sm text-neutral-400 mb-2">{archetypeNames[key] || key}</h3>
              <p className="text-3xl font-bold text-neutral-100">{count}</p>
              <p className="text-sm text-neutral-500 mt-2">
                {results.length > 0 ? Math.round((count / results.length) * 100) : 0}%
              </p>
            </div>
          ))}
        </div>

        <div className="bg-neutral-900 rounded-lg p-6 border border-neutral-800">
          <h2 className="text-2xl font-semibold mb-4">Recent Results</h2>
          {results.length === 0 ? (
            <p className="text-neutral-400">No results yet. Complete the quiz to see data here.</p>
          ) : (
            <div className="space-y-3">
              {results.slice(-10).reverse().map((result, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center p-4 bg-neutral-950 rounded border border-neutral-800"
                >
                  <div>
                    <p className="font-semibold text-neutral-100">
                      {archetypeNames[result.archetype] || result.archetype}
                    </p>
                    <p className="text-sm text-neutral-400">
                      {new Date(result.date).toLocaleString()}
                    </p>
                  </div>
                  <span className="text-xs text-neutral-500">{result.archetype}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="bg-neutral-900 rounded-lg p-6 border border-neutral-800">
          <h2 className="text-2xl font-semibold mb-4">Export Data</h2>
          <p className="text-neutral-400 mb-4 text-sm">
            Copy this JSON data or use the Export button above to download as a file.
          </p>
          <textarea
            readOnly
            value={exportData}
            className="w-full h-64 p-4 bg-neutral-950 text-neutral-300 rounded border border-neutral-800 font-mono text-xs"
          />
        </div>
      </div>
    </main>
  );
}

