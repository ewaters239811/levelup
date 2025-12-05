'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useEffect, useState, Suspense } from 'react';

const ARCHETYPES = {
  stable: {
    name: 'Stable Identity',
    diagnosis: 'Your identity foundation is solid. You can hold success and navigate challenges.',
  },
  fragile: {
    name: 'Fragile Identity',
    diagnosis: 'Your identity holds some success but fractures under pressure or visibility.',
  },
  collapsed: {
    name: 'Collapsed Identity',
    diagnosis: 'Your identity structure has collapsed. You sabotage opportunities and avoid responsibility.',
  },
  void: {
    name: 'Identity Void',
    diagnosis: 'You operate from an identity void. Success feels impossible without a stable self-concept.',
  },
};

function ResultContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [score, setScore] = useState<number | null>(null);

  useEffect(() => {
    const scoreParam = searchParams.get('score');
    if (scoreParam) {
      const parsedScore = parseInt(scoreParam, 10);
      if (!isNaN(parsedScore) && parsedScore >= 0 && parsedScore <= 40) {
        setScore(parsedScore);
      } else {
        router.push('/');
      }
    } else {
      router.push('/');
    }
  }, [searchParams, router]);

  if (score === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="text-gray-500">Loading...</div>
      </div>
    );
  }

  let archetype;
  if (score >= 0 && score <= 10) {
    archetype = ARCHETYPES.stable;
  } else if (score >= 11 && score <= 20) {
    archetype = ARCHETYPES.fragile;
  } else if (score >= 21 && score <= 30) {
    archetype = ARCHETYPES.collapsed;
  } else {
    archetype = ARCHETYPES.void;
  }

  return (
    <div className="min-h-screen bg-black px-4 py-12 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
      </div>

      <div className="w-full max-w-2xl mx-auto space-y-12 relative z-10">
        {/* Clearpth Branding */}
        <div className="absolute top-0 left-0">
          <p className="text-xs text-gray-600 font-light tracking-widest uppercase">
            Clearpth
          </p>
        </div>

        <div className="text-center space-y-6 pt-8">
          <div className="space-y-2">
            <p className="text-xs text-gray-500 font-light uppercase tracking-wider">
              Your Identity Collapse Index
            </p>
            <h1 className="text-6xl md:text-7xl font-light text-white">
              {score} <span className="text-gray-600">/ 40</span>
            </h1>
          </div>

          <div className="pt-8 space-y-4">
            <h2 className="text-2xl md:text-3xl font-light text-white">
              {archetype.name}
            </h2>
            <p className="text-base text-gray-400 font-light leading-relaxed max-w-lg mx-auto">
              {archetype.diagnosis}
            </p>
          </div>
        </div>

        {/* Identity Diagnosis Section */}
        <div className="pt-12 space-y-6 max-w-2xl mx-auto">
          <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider text-center">
            Identity Diagnosis
          </h3>
          
          <div className="space-y-5 text-gray-300 font-light leading-relaxed text-sm md:text-base">
            <p>
              Your Collapse Index score doesn't measure your potential — it measures the identity you're currently loyal to.
            </p>
            <p>
              Right now, your results are not a reflection of your ability. They are a reflection of the identity you've been operating from.
            </p>
            <p>
              Until your identity is reconstructed, your behavior will continue to default to the same patterns regardless of how much you know, want, or try.
            </p>
            <div className="space-y-3 pt-2">
              <p>
                The question is no longer:
              </p>
              <p className="text-gray-400 italic pl-4">
                "Can I do it?"
              </p>
              <p>
                The real question is:
              </p>
              <p className="text-gray-400 italic pl-4">
                "Is the identity I'm using capable of holding the life I'm asking for?"
              </p>
            </div>
          </div>
        </div>

        <div className="pt-12 space-y-6">
          <p className="text-sm text-gray-500 font-light text-center max-w-xl mx-auto">
            If you want to know whether your current identity structure qualifies you for identity reconstruction work, continue below.
          </p>

          <div className="border-t border-gray-900 pt-8">
            <Link
              href="/apply"
              className="
                block w-full text-center px-8 py-3 bg-white text-black
                font-medium text-sm tracking-wide uppercase
                hover:bg-gray-200 transition-all duration-200
                relative overflow-hidden group
              "
            >
              <span className="relative z-10">See If I'm Qualified</span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ResultPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="text-gray-500">Loading...</div>
      </div>
    }>
      <ResultContent />
    </Suspense>
  );
}
