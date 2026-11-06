'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ChangelogResponse } from '@/types/changelog';
import { FALLBACK_RELEASES } from '@/data/changelog-fallback';

interface ChangelogTeaserProps {
  initialData?: ChangelogResponse;
}

export function ChangelogTeaser({ initialData }: ChangelogTeaserProps) {
  const [data, setData] = useState<ChangelogResponse>(() => initialData || {
    repository: 'hiroqt/PixelCrew',
    repoUrl: 'https://github.com/hiroqt/PixelCrew',
    releases: FALLBACK_RELEASES,
    lastUpdated: new Date().toISOString(),
    cached: true,
    source: 'fallback',
  });

  useEffect(() => {
    let isMounted = true;

    const sync = async () => {
      try {
        const response = await fetch(`/api/changelog?refresh=true&t=${Date.now()}`);
        if (!response.ok) return;
        const fresh: ChangelogResponse = await response.json();
        if (isMounted && fresh.releases?.length) setData(fresh);
      } catch {
        // Keep the current release if the update request fails.
      }
    };

    sync();
    const interval = setInterval(sync, 45000);

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  const latest = data.releases[0] || FALLBACK_RELEASES[0];

  return (
    <section className="py-16 sm:py-20 border-t border-white/[0.06] border-theme">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <h2 className="font-pixel text-base sm:text-lg md:text-xl tracking-tight uppercase text-white text-theme-primary">What’s new</h2>
          <p className="mt-3 font-sans text-sm sm:text-base text-slate-400 text-theme-secondary">The latest PixelCrew update.</p>
          <div className="mt-6 border-t border-white/[0.1] border-theme pt-5">
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <h3 className="font-sans font-semibold text-white text-theme-primary line-clamp-1 sm:line-clamp-2">{latest.name}</h3>
              <span className="font-mono text-xs text-slate-500">{latest.tagName}</span>
              <span className="text-xs text-slate-500">{latest.relativeTime}</span>
            </div>
            <p className="mt-2 font-sans text-sm text-slate-400 text-theme-secondary leading-relaxed line-clamp-2">{latest.summary}</p>
            <Link href="/changelog" className="inline-block mt-4 text-sm text-[#38bdf8] hover:underline">
              See all updates
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
