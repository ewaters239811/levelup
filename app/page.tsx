'use client';

import Link from 'next/link';

export default function LandingPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-white">
      <div className="w-full max-w-3xl mx-auto text-center space-y-8">
        <div className="space-y-6">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-gray-900 leading-tight">
            Identity Collapse Index
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 font-light max-w-2xl mx-auto">
            A 4-question diagnostic to reveal where your identity is blocking your next level
          </p>
        </div>

        <div className="max-w-xl mx-auto space-y-4 text-gray-500 font-light leading-relaxed">
          <p>
            Most people don't realize that their identity—the story they tell themselves about who they are—is the invisible force shaping every outcome in their life.
          </p>
          <p>
            When your identity collapses, you can't hold success, visibility, or responsibility. You sabotage yourself without knowing why.
          </p>
          <p>
            This assessment reveals your Identity Collapse Index and shows you exactly where your identity is blocking you.
          </p>
        </div>

        <div className="pt-8">
          <Link
            href="/assessment"
            className="
              inline-block px-8 py-4 bg-gray-900 text-white
              font-light text-lg tracking-wide
              hover:bg-gray-800 transition-colors duration-200
              rounded-sm
            "
          >
            Start the 4-Question Assessment
          </Link>
        </div>

        <p className="text-sm text-gray-400 font-light pt-4">
          Takes 2 minutes • No email required
        </p>
      </div>
    </div>
  );
}
