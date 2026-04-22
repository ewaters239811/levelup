'use client';

interface ScoreSliderProps {
  value: number;
  onChange: (value: number) => void;
  label: string;
  questionId: string;
}

export default function ScoreSlider({ value, onChange, label, questionId }: ScoreSliderProps) {
  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center">
        {label && (
          <label htmlFor={questionId} className="text-sm font-light text-gray-300">
            {label}
          </label>
        )}
        <span className="text-2xl font-light text-white min-w-[3rem] text-right">
          {value}
        </span>
      </div>
      <input
        type="range"
        id={questionId}
        min="0"
        max="10"
        value={value}
        onChange={(e) => onChange(parseInt(e.target.value))}
        className="w-full h-1 rounded-lg appearance-none cursor-pointer accent-amber-400"
        style={{
          background: `linear-gradient(to right, #fbbf24 0%, #fbbf24 ${(value / 10) * 100}%, #3f2a1f ${(value / 10) * 100}%, #3f2a1f 100%)`
        }}
      />
      <div className="flex justify-between text-xs text-amber-200/55 font-light">
        <span>Not at all</span>
        <span>Completely</span>
      </div>
    </div>
  );
}
