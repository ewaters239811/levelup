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
        className="w-full h-1 bg-gray-900 rounded-lg appearance-none cursor-pointer accent-white"
        style={{
          background: `linear-gradient(to right, #fff 0%, #fff ${(value / 10) * 100}%, #1a1a1a ${(value / 10) * 100}%, #1a1a1a 100%)`
        }}
      />
      <div className="flex justify-between text-xs text-gray-600 font-light">
        <span>Not at all</span>
        <span>Completely</span>
      </div>
    </div>
  );
}
