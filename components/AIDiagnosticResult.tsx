'use client';

interface AIDiagnosticResultProps {
  insights: string;
  onBack?: () => void;
}

export default function AIDiagnosticResult({ insights, onBack }: AIDiagnosticResultProps) {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-12">
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

      <div className="text-center space-y-6 pb-12 border-b border-neutral-800">
        <h1 className="text-4xl md:text-5xl font-extralight text-neutral-100 tracking-tight">
          <span className="gradient-text">Your Personal Insights</span>
        </h1>
        <p className="text-lg text-neutral-400 font-light max-w-2xl mx-auto leading-relaxed">
          Based on your story, life path, and responses
        </p>
      </div>

      <div className="space-y-8">
        <div className="p-10 border border-cyan-400/30 bg-cyan-400/5 rounded-lg">
          <div className="prose prose-invert max-w-none">
            <div className="text-lg md:text-xl text-neutral-200 leading-relaxed font-light whitespace-pre-line">
              {insights}
            </div>
          </div>
        </div>

        <div className="pt-8 text-center border-t border-neutral-800">
          <p className="text-neutral-500 text-sm font-light italic tracking-wide max-w-2xl mx-auto">
            These insights are meant to guide your reflection. The patterns you recognize are the first step toward transformation.
          </p>
        </div>
      </div>
    </div>
  );
}

