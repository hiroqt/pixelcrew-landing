'use client';

import { useState, useMemo, useTransition, useEffect } from 'react';
import Link from 'next/link';
import { 
  ExternalLink, 
  RotateCcw, 
  Search, 
  Download, 
  Sparkles, 
  Zap, 
  ShieldCheck, 
  Calendar, 
  Layers, 
  Check 
} from 'lucide-react';
import { ChangelogResponse } from '@/types/changelog';
import { FALLBACK_RELEASES } from '@/data/changelog-fallback';
import { playChiptuneSound } from '@/lib/pixelcrew';
import { GithubIcon } from '@/components/ui/GithubIcon';

interface ChangelogViewProps {
  initialData?: ChangelogResponse;
}

export function ChangelogView({ initialData }: ChangelogViewProps) {
  const [data, setData] = useState<ChangelogResponse>(() => initialData || {
    repository: 'hiroqt/PixelCrew',
    repoUrl: 'https://github.com/hiroqt/PixelCrew',
    releases: FALLBACK_RELEASES,
    lastUpdated: new Date().toISOString(),
    cached: true,
    source: 'fallback'
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedVersion, setSelectedVersion] = useState<string>('all');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [, startTransition] = useTransition();

  // Background real-time sync on mount
  useEffect(() => {
    let isMounted = true;
    async function syncRealtime() {
      try {
        const res = await fetch(`/api/changelog?refresh=true&t=${Date.now()}`);
        if (res.ok && isMounted) {
          const freshData: ChangelogResponse = await res.json();
          if (freshData.releases && freshData.releases.length > 0) {
            startTransition(() => {
              setData(freshData);
            });
          }
        }
      } catch {
        // Keep current data
      }
    }
    syncRealtime();
    return () => { isMounted = false; };
  }, []);

  // Client-side refresh fetcher
  const handleRefresh = async () => {
    playChiptuneSound('click');
    setIsRefreshing(true);
    try {
      const res = await fetch('/api/changelog?refresh=true');
      if (res.ok) {
        const freshData: ChangelogResponse = await res.json();
        startTransition(() => {
          setData(freshData);
        });
        playChiptuneSound('success');
      } else {
        playChiptuneSound('alert');
      }
    } catch {
      playChiptuneSound('alert');
    } finally {
      setIsRefreshing(false);
    }
  };

  // Filtered Releases
  const filteredReleases = useMemo(() => {
    return data.releases.filter(release => {
      // Version tab filter
      if (selectedVersion !== 'all' && release.tagName !== selectedVersion) {
        return false;
      }

      // Search query filter
      if (!searchQuery.trim()) return true;
      const query = searchQuery.toLowerCase();

      const matchTag = release.tagName.toLowerCase().includes(query);
      const matchName = release.name.toLowerCase().includes(query);
      const matchSummary = release.summary.toLowerCase().includes(query);
      const matchGroups = release.changeGroups.some(g => 
        g.label.toLowerCase().includes(query) ||
        g.items.some(item => 
          item.title.toLowerCase().includes(query) || 
          item.description.toLowerCase().includes(query)
        )
      );

      return matchTag || matchName || matchSummary || matchGroups;
    });
  }, [data.releases, selectedVersion, searchQuery]);

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] py-12 px-4 sm:px-6 lg:px-8 transition-colors">
      <div className="max-w-6xl mx-auto space-y-12">
        
        {/* Top Back Nav & Repository Status */}
        <div className="flex items-center justify-between font-mono text-xs text-slate-400 text-theme-secondary">
          <Link 
            href="/"
            onClick={() => playChiptuneSound('click')}
            className="inline-flex items-center gap-2 text-slate-300 hover:text-[#38bdf8] transition-colors group"
          >
            <span className="group-hover:-translate-x-1 transition-transform">←</span>
            <span>BACK TO HOME</span>
          </Link>

          <div className="flex items-center gap-2 bg-[#111523] border border-[#1e263c] px-3 py-1 rounded-full text-[11px]">
            <span className="w-2 h-2 rounded-full bg-[#00ff88] animate-pulse" />
            <span className="text-slate-200 text-theme-primary font-medium">
              SOURCE: HIROQT/PIXELCREW
            </span>
          </div>
        </div>

        {/* Editorial Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-[#111523] border border-[#1e263c] font-pixel text-[10px] text-[#00f0ff] shadow-[2px_2px_0px_#000]">
            <Sparkles className="w-3 h-3 text-[#00f0ff]" />
            <span>[ SYSTEM // OFFICIAL VERSION CHANGELOG ]</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold font-display uppercase tracking-tight text-white text-theme-primary">
            WHAT&apos;S NEW IN PIXEL CREW
          </h1>

          <p className="text-slate-300 text-theme-secondary text-sm sm:text-base leading-relaxed">
            A clean, human-readable breakdown of every feature, architectural upgrade, and reliability improvement across released versions.
          </p>
        </div>

        {/* Telemetry Summary & Quick Controls Bar */}
        <div className="bg-[#111523] border-2 border-[#1e263c] rounded-xl p-4 sm:p-5 flex flex-col md:flex-row items-center justify-between gap-4 font-mono text-xs">
          
          {/* Left stats */}
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-slate-300">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#00ff88]" />
              <span className="text-slate-400">Latest:</span>
              <strong className="text-[#38bdf8] font-pixel text-[11px]">
                {data.releases[0]?.tagName || 'v0.2.4'}
              </strong>
            </span>

            <span className="text-slate-600 hidden sm:inline">•</span>

            <span className="flex items-center gap-1.5 text-slate-400">
              <span>Total Releases:</span>
              <strong className="text-white font-bold">{data.releases.length}</strong>
            </span>

            <span className="text-slate-600 hidden sm:inline">•</span>

            <span className="text-slate-400">
              Synced: <span className="text-slate-300">{new Date(data.lastUpdated).toLocaleDateString()}</span>
            </span>
          </div>

          {/* Right Action buttons */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#0a0c14] border border-[#1e263c] hover:border-[#38bdf8] text-slate-300 hover:text-white transition-colors disabled:opacity-50"
              title="Check GitHub for newer releases"
            >
              <RotateCcw className={`w-3 h-3 ${isRefreshing ? 'animate-spin text-[#38bdf8]' : ''}`} />
              <span>{isRefreshing ? 'Checking...' : 'Check Updates'}</span>
            </button>

            <a
              href={`${data.repoUrl}/releases`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => playChiptuneSound('click')}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded bg-white/[0.08] hover:bg-white/[0.14] border border-white/[0.12] text-white font-medium transition-colors"
            >
              <GithubIcon className="w-3.5 h-3.5" />
              <span>GitHub Releases</span>
              <ExternalLink className="w-3 h-3 opacity-60" />
            </a>
          </div>

        </div>

        {/* Filter & Quick-Jump Bar */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
            
            {/* Version Quick Jump Pills */}
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => {
                  playChiptuneSound('select');
                  setSelectedVersion('all');
                }}
                className={`px-3 py-1.5 rounded font-pixel text-[10px] uppercase transition-all ${
                  selectedVersion === 'all'
                    ? 'bg-[#38bdf8] text-[#07080c] font-bold shadow-sm'
                    : 'bg-[#111523] text-slate-300 border border-[#1e263c] hover:border-slate-500'
                }`}
              >
                ALL RELEASES
              </button>

              {data.releases.map((rel, idx) => (
                <button
                  key={rel.id}
                  onClick={() => {
                    playChiptuneSound('select');
                    setSelectedVersion(rel.tagName);
                  }}
                  className={`px-3 py-1.5 rounded font-pixel text-[10px] uppercase transition-all flex items-center gap-1.5 ${
                    selectedVersion === rel.tagName
                      ? 'bg-[#38bdf8] text-[#07080c] font-bold shadow-sm'
                      : 'bg-[#111523] text-slate-300 border border-[#1e263c] hover:border-slate-500'
                  }`}
                >
                  <span>{rel.tagName}</span>
                  {idx === 0 && (
                    <span className="text-[8px] px-1 rounded bg-[#ffd700]/20 text-[#ffd700] border border-[#ffd700]/40">
                      NEW
                    </span>
                  )}
                </button>
              ))}
            </div>

            {/* Live Search Input */}
            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search features or updates..."
                className="w-full bg-[#111523] border border-[#1e263c] focus:border-[#38bdf8] focus:outline-none rounded-md pl-9 pr-8 py-2 font-mono text-xs text-white placeholder:text-slate-500 transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white text-xs font-mono"
                >
                  ✕
                </button>
              )}
            </div>

          </div>
        </div>

        {/* Release Timeline List */}
        <div className="space-y-10 relative">
          
          {filteredReleases.length === 0 ? (
            <div className="p-12 text-center bg-[#111523] border-2 border-[#1e263c] rounded-xl font-mono text-xs text-slate-300 space-y-3">
              <p className="text-base font-bold text-white">No releases match your search.</p>
              <p className="text-slate-400">Try searching for &ldquo;DAG&rdquo;, &ldquo;Anti-AI&rdquo;, or reset the filter.</p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedVersion('all');
                }}
                className="px-4 py-2 bg-[#38bdf8] text-[#07080c] font-bold rounded font-pixel text-[10px]"
              >
                RESET FILTERS
              </button>
            </div>
          ) : (
            filteredReleases.map((release) => (
              <article 
                key={release.id}
                className="bg-[#0f1320] border-2 border-[#1e263c] hover:border-[#38bdf8]/50 rounded-2xl p-6 sm:p-9 space-y-8 transition-all shadow-[0_8px_30px_rgb(0,0,0,0.35)] relative overflow-hidden"
              >
                {/* Top Corner Ribbon for Latest Release */}
                {release.isLatest && (
                  <div className="absolute top-0 right-0 bg-gradient-to-l from-[#00f0ff] to-[#38bdf8] text-[#07080c] font-pixel text-[9px] font-bold px-4 py-1.5 uppercase rounded-bl-lg shadow-md flex items-center gap-1.5">
                    <Sparkles className="w-3 h-3" />
                    <span>LATEST VERSION</span>
                  </div>
                )}

                {/* Release Card Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pt-1">
                  <div className="space-y-2">
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="font-pixel text-sm sm:text-base text-[#ffd700] bg-[#ffd700]/10 border border-[#ffd700]/30 px-3.5 py-1 rounded shadow-sm">
                        {release.tagName}
                      </span>
                      <h2 className="font-display font-extrabold text-xl sm:text-2xl text-white tracking-tight">
                        {release.name}
                      </h2>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 font-mono text-xs text-slate-400">
                      <span className="flex items-center gap-1.5 text-slate-300">
                        <Calendar className="w-3.5 h-3.5 text-[#38bdf8]" />
                        <span>Released on {release.formattedDate}</span>
                      </span>
                      <span>•</span>
                      <span>{release.relativeTime}</span>
                      <span>•</span>
                      <span>by @{release.author.username}</span>
                    </div>
                  </div>

                  {/* Direct GitHub Links */}
                  <div className="flex items-center gap-2 self-start md:self-center font-mono text-xs">
                    <a
                      href={release.zipballUrl}
                      download
                      onClick={() => playChiptuneSound('click')}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#0a0c14] border border-[#1e263c] hover:border-slate-400 rounded text-slate-300 hover:text-white transition-colors"
                      title="Download source code archive (zip)"
                    >
                      <Download className="w-3.5 h-3.5 text-[#38bdf8]" />
                      <span>zip</span>
                    </a>

                    <a
                      href={release.tarballUrl}
                      download
                      onClick={() => playChiptuneSound('click')}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#0a0c14] border border-[#1e263c] hover:border-slate-400 rounded text-slate-300 hover:text-white transition-colors"
                      title="Download source code archive (tar.gz)"
                    >
                      <Download className="w-3.5 h-3.5 text-[#38bdf8]" />
                      <span>tar.gz</span>
                    </a>

                    <a
                      href={release.htmlUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => playChiptuneSound('click')}
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-white/[0.08] hover:bg-white/[0.14] border border-white/[0.12] rounded text-white font-medium transition-colors"
                    >
                      <span>GitHub</span>
                      <ExternalLink className="w-3 h-3 opacity-70" />
                    </a>
                  </div>
                </div>

                {/* Release Summary Callout */}
                <div className="bg-[#141929] border border-[#1e263c] rounded-xl p-5 sm:p-6 space-y-2">
                  <span className="font-mono text-xs uppercase tracking-wider text-[#38bdf8] font-bold block">
                    Release Overview:
                  </span>
                  <p className="font-sans text-sm sm:text-base text-slate-200 leading-relaxed">
                    {release.summary}
                  </p>
                </div>

                {/* Impact Metrics (If present) */}
                {release.metrics && release.metrics.length > 0 && (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono">
                    {release.metrics.map((metric, mIdx) => (
                      <div key={mIdx} className="bg-[#0a0c14] border border-[#1e263c] p-3 rounded-lg flex items-center justify-between">
                        <span className="text-[11px] text-slate-400">{metric.label}:</span>
                        <span className="text-xs font-bold text-[#00ff88]">{metric.value}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Categorized Changes Section (Clean & User Friendly!) */}
                <div className="space-y-6 pt-2">
                  <span className="font-display font-bold text-sm uppercase tracking-wider text-slate-300 flex items-center gap-2">
                    <Layers className="w-4 h-4 text-[#ffd700]" />
                    <span>Summary of What Changed:</span>
                  </span>

                  <div className="grid grid-cols-1 gap-6">
                    {release.changeGroups.map((group, gIdx) => (
                      <div key={gIdx} className="space-y-3">
                        
                        {/* Group Header Badge */}
                        <div className="flex items-center gap-2">
                          {group.category === 'feature' && (
                            <span className="px-2.5 py-0.5 rounded text-[11px] font-mono font-bold uppercase tracking-wider bg-[#38bdf8]/15 border border-[#38bdf8]/40 text-[#38bdf8] flex items-center gap-1.5">
                              <Sparkles className="w-3 h-3" />
                              <span>{group.label}</span>
                            </span>
                          )}

                          {group.category === 'improvement' && (
                            <span className="px-2.5 py-0.5 rounded text-[11px] font-mono font-bold uppercase tracking-wider bg-[#f59e0b]/15 border border-[#f59e0b]/40 text-[#f59e0b] flex items-center gap-1.5">
                              <Zap className="w-3 h-3" />
                              <span>{group.label}</span>
                            </span>
                          )}

                          {group.category === 'fix' && (
                            <span className="px-2.5 py-0.5 rounded text-[11px] font-mono font-bold uppercase tracking-wider bg-[#34d399]/15 border border-[#34d399]/40 text-[#34d399] flex items-center gap-1.5">
                              <ShieldCheck className="w-3 h-3" />
                              <span>{group.label}</span>
                            </span>
                          )}
                        </div>

                        {/* List of Changes */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {group.items.map((item, iIdx) => (
                            <div 
                              key={iIdx}
                              className="bg-[#111523] border border-[#1e263c] hover:border-slate-500 rounded-lg p-4 space-y-1.5 transition-colors"
                            >
                              <div className="flex items-start gap-2">
                                <Check className="w-4 h-4 text-[#00ff88] shrink-0 mt-0.5" />
                                <h3 className="font-display font-bold text-sm text-white leading-snug">
                                  {item.title}
                                </h3>
                              </div>
                              <p className="font-sans text-xs text-slate-300 leading-relaxed pl-6">
                                {item.description}
                              </p>
                            </div>
                          ))}
                        </div>

                      </div>
                    ))}
                  </div>
                </div>

              </article>
            ))
          )}

        </div>

      </div>
    </div>
  );
}
