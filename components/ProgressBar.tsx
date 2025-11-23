'use client';

interface ProgressBarProps {
  current: number;
  total: number;
}

export default function ProgressBar({ current, total }: ProgressBarProps) {
  const percentage = (current / total) * 100;

  return (
    <div className="w-full max-w-3xl mx-auto mb-12">
      <div className="flex justify-between items-center mb-4">
        <span className="text-xs text-neutral-500 uppercase tracking-[0.2em] font-medium">
          Question {current} of {total}
        </span>
        <span className="text-xs text-neutral-500 font-light">
          {Math.round(percentage)}%
        </span>
      </div>
      <div className="w-full h-[1px] bg-neutral-800 overflow-hidden relative">
        <div
          className="h-full bg-white transition-all duration-500 ease-out relative"
          style={{ width: `${percentage}%` }}
        >
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white"></div>
        </div>
      </div>
    </div>
  );
}

