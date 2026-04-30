'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import type { WeeklyPost } from '@/data/weeklyPost';

type WeeklyViewCountsProps = {
  posts: WeeklyPost[];
  activeSlug: string;
};

type CountMap = Record<string, number | null>;

function getVisitorId() {
  if (typeof window === 'undefined') return '';
  const key = 'weekly_viewer_id_v1';
  const existing = localStorage.getItem(key);
  if (existing) return existing;
  const next = crypto.randomUUID();
  localStorage.setItem(key, next);
  return next;
}

export default function WeeklyViewCounts({
  posts,
  activeSlug,
}: WeeklyViewCountsProps) {
  const [counts, setCounts] = useState<CountMap>({});
  const slugs = useMemo(() => posts.map((p) => p.slug), [posts]);

  useEffect(() => {
    const visitorId = getVisitorId();
    if (!visitorId || !activeSlug) return;

    const run = async () => {
      try {
        const response = await fetch('/api/weekly-view-counts', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ slug: activeSlug, visitorId, slugs }),
        });
        if (!response.ok) return;
        const data = await response.json();
        if (data?.counts) setCounts(data.counts);
      } catch {
        // Non-blocking analytics: ignore failures.
      }
    };

    void run();
  }, [activeSlug, slugs]);

  const activeCount = counts[activeSlug];

  return (
    <>
      <p className="text-[11px] uppercase tracking-wider text-[#8e6242] font-semibold">
        Viewers: {typeof activeCount === 'number' ? activeCount : '-'}
      </p>

      {posts.length > 1 && (
        <section className="space-y-3 border-b border-[#e2c3a4] pb-6">
          <p className="text-xs uppercase tracking-wider text-[#8e6242] font-semibold">
            Previous Notes
          </p>
          <div className="flex flex-wrap gap-2">
            {posts.map((entry) => {
              const isActive = entry.slug === activeSlug;
              const count = counts[entry.slug];
              return (
                <Link
                  key={entry.slug}
                  href={`/weekly?post=${entry.slug}`}
                  className={`px-3 py-1.5 rounded-sm text-xs uppercase tracking-wide transition-colors ${
                    isActive
                      ? 'bg-[#7a4d2d] text-amber-50'
                      : 'bg-[#f4e3cf] text-[#6b4a33] hover:bg-[#ecd3b6]'
                  }`}
                >
                  {entry.weekOfLabel}
                  <span className="ml-2 text-[10px] opacity-80">
                    {typeof count === 'number' ? count : '-'}
                  </span>
                </Link>
              );
            })}
          </div>
        </section>
      )}
    </>
  );
}

