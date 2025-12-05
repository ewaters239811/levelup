'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const ARCHETYPES = {
  stable: {
    name: 'Stable Identity',
    diagnosis: 'Your identity foundation is solid, allowing you to hold success and navigate challenges with resilience.',
  },
  fragile: {
    name: 'Fragile Identity',
    diagnosis: 'Your identity can hold some success, but it fractures under pressure or when visibility increases.',
  },
  collapsed: {
    name: 'Collapsed Identity',
    diagnosis: 'Your identity structure has collapsed, causing you to sabotage opportunities and avoid responsibility.',
  },
  void: {
    name: 'Identity Void',
    diagnosis: 'You are operating from an identity void, where success feels impossible because there is no stable self-concept to anchor it.',
  },
};

export default function ResultPage() {
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
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-gray-400">Loading...</div>
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
    <div className="min-h-screen bg-white px-4 py-12">
      <div className="w-full max-w-2xl mx-auto space-y-12">
        <div className="text-center space-y-6">
          <div className="space-y-2">
            <p className="text-sm text-gray-500 font-light uppercase tracking-wide">
              Your Identity Collapse Index
            </p>
            <h1 className="text-5xl md:text-6xl font-light text-gray-900">
              {score} <span className="text-gray-400">/ 40</span>
            </h1>
          </div>

          <div className="pt-8 space-y-4">
            <h2 className="text-2xl md:text-3xl font-light text-gray-900">
              {archetype.name}
            </h2>
            <p className="text-lg text-gray-600 font-light leading-relaxed max-w-xl mx-auto">
              {archetype.diagnosis}
            </p>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-200">
          <Link
            href="/apply"
            className="
              block w-full text-center px-8 py-4 bg-gray-900 text-white
              font-light text-lg tracking-wide
              hover:bg-gray-800 transition-colors duration-200
              rounded-sm
            "
          >
            See if I'm Qualified to Work With Elijah
          </Link>
        </div>
      </div>
    </div>
  );
}

