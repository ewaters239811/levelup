'use client';

interface ScoreSliderProps {
  value: number;
  onChange: (value: number) => void;
  label: string;
  questionId: string;
}

export default function ScoreSlider({ value, onChange, label, questionId }: ScoreSliderProps) {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <label htmlFor={questionId} className="text-lg font-light text-gray-900">
          {label}
        </label>
        <span className="text-2xl font-light text-gray-600 min-w-[3rem] text-right">
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
        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-gray-900"
        style={{
          background: `linear-gradient(to right, #111 0%, #111 ${(value / 10) * 100}%, #e5e7eb ${(value / 10) * 100}%, #e5e7eb 100%)`
        }}
      />
      <div className="flex justify-between text-xs text-gray-400 font-light">
        <span>Not at all</span>
        <span>Completely</span>
      </div>
    </div>
  );
}

