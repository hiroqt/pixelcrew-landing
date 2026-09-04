'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { 
  Tag, 
  ArrowRight, 
  Sparkles, 
  ExternalLink,
  CheckCircle2,
  Calendar
} from 'lucide-react';
import { ChangelogResponse } from '@/types/changelog';
import { FALLBACK_RELEASES } from '@/data/changelog-fallback';
import { playChiptuneSound } from '@/lib/pixelcrew';

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
    source: 'fallback'
  });

  // Real-time synchronization on both local and production
  useEffect(() => {
    let isMounted = true;

    async function syncRealtime() {
      try {
        const res = await fetch(`/api/changelog?refresh=true&t=${Date.now()}`);
        if (res.ok && isMounted) {
          const fresh: ChangelogResponse = await res.json();
          if (fresh.releases && fresh.releases.length > 0) {
            setData(fresh);
          }
        }
      } catch {
        // Retain current data gracefully if network is temporarily unavailable
      }
    }

    syncRealtime();

    // Auto-sync every 45s while user stays on landing page
    const interval = setInterval(syncRealtime, 45000);

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  const latestRelease = data.releases[0] || FALLBACK_RELEASES[0];
  const priorReleases = data.releases.slice(1, 3);

  // Dynamic capabilities extractor
  const keyCapabilities = useMemo(() => {
    const fromFirstGroup = latestRelease.changeGroups?.[0]?.items?.slice(0, 3);
    if (fromFirstGroup && fromFirstGroup.length > 0) return fromFirstGroup;

    if (latestRelease.highlights && latestRelease.highlights.length > 0) {
      return latestRelease.highlights.slice(0, 3).map((h, i) => ({
        title: `Capability ${i + 1}`,
        description: h
      }));
    }

    return [
      { title: 'Release Update', description: latestRelease.summary }
    ];
  }, [latestRelease]);

  return (
    <section className="py-20 bg-[var(--panel-bg)] border-t border-b border-[var(--panel-border)] relative overflow-hidden transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header with Version Pill & Real-time Live Badge */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#111523] border border-[#1e263c] font-pixel text-[10px] text-[#00f0ff] shadow-[2px_2px_0px_#000]">
                <Sparkles className="w-3 h-3 text-[#00f0ff]" />
                <span>[ VERSION HISTORY // LATEST RELEASES ]</span>
              </div>

              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-[#00ff88]/10 border border-[#00ff88]/30 font-mono text-[10px] text-[#00ff88] rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00ff88] animate-pulse" />
                <span>LIVE SYNCED WITH GITHUB</span>
              </div>
            </div>

            <h2 className="text-2xl sm:text-4xl font-extrabold font-display uppercase tracking-tight text-white text-theme-primary">
              WHAT&apos;S NEW IN PIXEL CREW
            </h2>
            <p className="text-slate-300 text-theme-secondary text-sm sm:text-base max-w-xl leading-relaxed">
              Explore the latest capabilities, architectural milestones, and reliability improvements synced directly from GitHub.
            </p>
          </div>

          <Link
            href="/changelog"
            onClick={() => playChiptuneSound('click')}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#38bdf8] hover:bg-[#0284c7] text-[#07080c] font-mono text-xs font-bold rounded-md transition-all self-start md:self-end shadow-sm group"
          >
            <span>BROWSE ALL RELEASES</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Asymmetric Dual Panel: Latest Release on Left, Prior Releases on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left Panel: Latest Release Spotlight (7 cols) */}
          <div className="lg:col-span-7 bg-[#0f1320] border-2 border-[#1e263c] hover:border-[#38bdf8]/50 rounded-xl p-6 sm:p-8 flex flex-col justify-between space-y-6 relative group transition-all shadow-[0_4px_20px_rgb(0,0,0,0.3)]">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="font-pixel text-xs text-[#ffd700] bg-[#ffd700]/10 border border-[#ffd700]/30 px-3 py-1 rounded flex items-center gap-1.5">
                    <Tag className="w-3 h-3" />
                    <span>{latestRelease.tagName}</span>
                  </span>
                  <span className="text-[10px] font-pixel text-[#00f0ff] bg-[#00f0ff]/10 border border-[#00f0ff]/30 px-2 py-0.5 rounded">
                    LATEST RELEASE
                  </span>
                </div>

                <span className="font-mono text-xs text-slate-400">
                  {latestRelease.relativeTime}
                </span>
              </div>

              <div>
                <h3 className="font-display font-bold text-xl sm:text-2xl text-white tracking-tight">
                  {latestRelease.name}
                </h3>
                <p className="font-mono text-xs text-slate-400 mt-1 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-[#38bdf8]" />
                  <span>Published {latestRelease.formattedDate} by @{latestRelease.author.username}</span>
                </p>
              </div>

              <p className="font-sans text-xs sm:text-sm text-slate-200 leading-relaxed bg-[#141929] p-4 rounded-lg border border-[#1e263c]">
                {latestRelease.summary}
              </p>

              {/* Metrics preview if present */}
              {latestRelease.metrics && latestRelease.metrics.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 font-mono text-xs pt-1">
                  {latestRelease.metrics.map((m, idx) => (
                    <div key={idx} className="bg-[#111523] border border-[#1e263c] px-3 py-2 rounded">
                      <span className="text-[10px] text-slate-400 block">{m.label}</span>
                      <span className="text-white font-bold text-xs">{m.value}</span>
                    </div>
                  ))}
                </div>
              )}

              <div className="space-y-2 pt-1">
                <span className="font-mono text-[11px] uppercase tracking-wider text-slate-400 font-bold block">
                  Key Capabilities Added:
                </span>
                <ul className="space-y-2 font-sans text-xs sm:text-sm text-slate-200">
                  {keyCapabilities.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 bg-[#111523] p-2.5 rounded border border-[#1e263c]">
                      <CheckCircle2 className="w-4 h-4 text-[#34d399] shrink-0 mt-0.5" />
                      <span className="leading-snug">
                        <strong className="text-white font-medium">{item.title}:</strong>{' '}
                        <span className="text-slate-300">{item.description}</span>
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="pt-4 border-t border-[#1e263c] flex items-center justify-between font-mono text-xs">
              <Link
                href="/changelog"
                onClick={() => playChiptuneSound('select')}
                className="text-[#38bdf8] hover:underline inline-flex items-center gap-1 font-semibold"
              >
                <span>Read Full Changelog</span>
                <span>→</span>
              </Link>

              <a
                href={latestRelease.htmlUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => playChiptuneSound('click')}
                className="text-slate-400 hover:text-white inline-flex items-center gap-1"
              >
                <span>GitHub Release Notes</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Right Panel: Previous Milestones (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
            <div className="space-y-4">
              <span className="font-display font-bold text-sm uppercase tracking-wider text-slate-300 flex items-center gap-2">
                <span>Recent Milestone Releases</span>
              </span>

              {priorReleases.map((rel) => (
                <div 
                  key={rel.id}
                  className="bg-[#0f1320] border-2 border-[#1e263c] hover:border-[#38bdf8]/40 rounded-xl p-5 space-y-2.5 transition-all"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-pixel text-[11px] text-[#ffd700] bg-[#ffd700]/10 border border-[#ffd700]/30 px-2 py-0.5 rounded">
                      {rel.tagName}
                    </span>
                    <span className="font-mono text-[11px] text-slate-400">
                      {rel.relativeTime}
                    </span>
                  </div>

                  <h4 className="font-display font-bold text-base text-white">
                    {rel.name}
                  </h4>

                  <p className="font-sans text-xs text-slate-300 line-clamp-2 leading-relaxed">
                    {rel.summary}
                  </p>
                </div>
              ))}
            </div>

            <Link
              href="/changelog"
              onClick={() => playChiptuneSound('click')}
              className="bg-[#111523] border border-[#1e263c] hover:border-[#38bdf8] text-slate-300 hover:text-white p-4 rounded-xl text-center font-mono text-xs block transition-all group"
            >
              <span>View full version timeline and download archives </span>
              <span className="text-[#38bdf8] group-hover:translate-x-1 inline-block transition-transform">→</span>
            </Link>
          </div>

        </div>

      </div>
    </section>
  );
}
