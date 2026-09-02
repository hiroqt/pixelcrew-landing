'use client';

import { useState } from 'react';
import { playChiptuneSound } from '@/lib/pixelcrew';
import { ShieldAlert, CheckCircle2, AlertTriangle, Eye, EyeOff, Sparkles, Ban } from 'lucide-react';

interface SlopItem {
  id: string;
  name: string;
  category: string;
  tell: string;
  command: string;
  mockPreview: {
    badge?: string;
    title: string;
    body: string;
    tag?: string;
  };
  remedy: string;
}

const SLOP_ITEMS: SlopItem[] = [
  {
    id: 'beige-serif',
    name: 'AI Beige & Italic Serif',
    category: 'Typography & Color',
    tell: 'Italic display serif on an AI beige palette',
    command: '/typeset',
    mockPreview: {
      title: 'Beautifully crafted for modern teams.',
      body: 'Elevate your daily operations with intelligent synergy.'
    },
    remedy: 'Deep obsidian base, Space Grotesk display font, and mathematical fluid clamp scales.'
  },
  {
    id: 'soft-card',
    name: 'Soft Card with ✦ Icon',
    category: 'UI Components',
    tell: 'Rounded rectangle with generic drop shadow and sparkle',
    command: '/render',
    mockPreview: {
      badge: '✦ Core Feature',
      title: 'Everything in one place',
      body: 'Plan, create, and collaborate with effortless ease.'
    },
    remedy: 'Asymmetric layout, bespoke hairline borders, and zero generic sparkle iconography.'
  },
  {
    id: 'status-soup',
    name: 'Status-Chip Soup',
    category: 'Layout Clutter',
    tell: 'Hero eyebrow pill chip with random emoji badges',
    command: '/de-slop',
    mockPreview: {
      badge: '⚡ Introducing v2.0 • AI-Native',
      title: 'The future of development',
      body: 'Accelerate output with automated intelligence.'
    },
    remedy: 'Minimalist monochrome micro-eyebrow without noisy pill badges or pulsing fake dots.'
  },
  {
    id: 'nested-cards',
    name: 'Cards Inside Cards',
    category: 'Spatial Hierarchy',
    tell: 'Nested rounded containers creating muddy padding layers',
    command: '/bento',
    mockPreview: {
      badge: 'Workspace Layer',
      title: 'Analytics Overview',
      body: 'Card nested inside card inside container with redundant borders.'
    },
    remedy: 'Single flat architectural plane with clean typographic separation.'
  },
  {
    id: 'pulsing-dot',
    name: 'Decorative Pulsing Dot',
    category: 'Gimmicks',
    tell: 'Fake breathing status dot giving false sense of activity',
    command: '/sentinel',
    mockPreview: {
      badge: '● AI is thinking...',
      title: 'Autonomous Synthesis',
      body: 'Simulated activity dots without real telemetry or websocket state.'
    },
    remedy: 'Real SSE streaming connection on port 4747 or quiet static indicator.'
  },
  {
    id: 'cliche-copy',
    name: 'Cliché Marketing Hype',
    category: 'Copywriting',
    tell: 'Generic SaaS phrases that convey zero technical truth',
    command: '/de-slop',
    mockPreview: {
      title: 'Revolutionize your entire business',
      body: 'Unlock 10x developer leverage and supercharge your team effortlessly.'
    },
    remedy: 'Concrete technical value propositions: RFC 7807, LCP < 0.4s, 0 npm dependencies.'
  },
  {
    id: 'repetitive-3card',
    name: 'Identical 3-Card Grid',
    category: 'Composition',
    tell: 'Three identical 33% width cards repeated down the page',
    command: '/bento',
    mockPreview: {
      title: 'Automate · Integrate · Scale',
      body: 'Three identical cards with identical icons and identical character counts.'
    },
    remedy: 'Dynamic Asymmetric Bento grid with staggered 8:4 and 7:5 span rhythms.'
  },
  {
    id: 'uniform-radii',
    name: '16px Radius Monoculture',
    category: 'Visual Design',
    tell: 'Every single button, tag, card, and modal using uniform 16px curves',
    command: '/retrofit',
    mockPreview: {
      badge: 'Pill tag',
      title: 'Rounded UI Everywhere',
      body: 'Lack of hierarchy between small interactive tags and outer containers.'
    },
    remedy: 'Strict radius hierarchy: buttons 4px, containers 8px, code chips 2px.'
  }
];

export function SlopDetectorBoard() {
  const [detectorActive, setDetectorActive] = useState(true);
  const [selectedSlop, setSelectedSlop] = useState<SlopItem | null>(SLOP_ITEMS[0]);

  const toggleDetector = () => {
    playChiptuneSound('click');
    setDetectorActive(prev => !prev);
  };

  return (
    <section id="slop-detector" className="py-24 bg-[#07080c] border-b border-white/[0.08] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header with Live Detector Toggle */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 pb-6 border-b border-white/[0.08]">
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#f43f5e]" />
              <span className="font-mono text-xs uppercase tracking-widest text-[#f43f5e]">
                Strict Anti-AI Quality Rubric
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold font-display tracking-tight text-white">
              Detects and eliminates AI slop.
            </h2>
            <p className="text-sm sm:text-base text-slate-300 font-sans leading-relaxed">
              PixelCrew runs an automated 6-dimension aesthetic and technical rubric to catch synthetic tropes before they reach your repository.
            </p>
          </div>

          {/* Detector Toggle Switch */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={toggleDetector}
              className={`flex items-center gap-2.5 px-4 py-2 rounded font-mono text-xs font-semibold transition-all ${
                detectorActive
                  ? 'bg-[#f43f5e]/15 border border-[#f43f5e] text-[#f43f5e] shadow-[0_0_15px_rgba(244,63,94,0.2)]'
                  : 'bg-[#131722] border border-white/10 text-slate-400 hover:text-white'
              }`}
            >
              {detectorActive ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
              <span>{detectorActive ? 'Slop Detector: ACTIVE' : 'Detector Paused'}</span>
            </button>
          </div>
        </div>

        {/* 8-Item Interactive Slop Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {SLOP_ITEMS.map((item) => {
            const isSelected = selectedSlop?.id === item.id;
            return (
              <div
                key={item.id}
                onClick={() => {
                  playChiptuneSound('select');
                  setSelectedSlop(item);
                }}
                className={`craft-card p-5 rounded-lg cursor-pointer transition-all flex flex-col justify-between space-y-4 relative ${
                  isSelected
                    ? 'border-[#f59e0b] bg-[#0e121a] shadow-[0_0_20px_rgba(245,158,11,0.1)]'
                    : 'hover:border-white/20'
                }`}
              >
                {/* Slop Detection Tag Flag */}
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] text-slate-400">
                    {item.category}
                  </span>
                  {detectorActive && (
                    <span className="px-2 py-0.5 rounded bg-[#f43f5e]/10 border border-[#f43f5e]/30 text-[#f43f5e] font-mono text-[9px] flex items-center gap-1 font-bold">
                      <Ban className="w-2.5 h-2.5" />
                      FLAGGED
                    </span>
                  )}
                </div>

                {/* Mock Visual Specimen Box */}
                <div className={`p-3 rounded border font-sans text-xs space-y-2 transition-all ${
                  detectorActive 
                    ? 'bg-[#1f1719] border-[#f43f5e]/40' 
                    : 'bg-[#0a0c10] border-white/[0.06]'
                }`}>
                  {item.mockPreview.badge && (
                    <span className="inline-block px-1.5 py-0.5 rounded bg-amber-200/20 text-amber-300 text-[10px] font-mono">
                      {item.mockPreview.badge}
                    </span>
                  )}
                  <div className={`font-semibold ${item.id === 'beige-serif' ? 'font-serif italic text-amber-200' : 'text-slate-200'}`}>
                    {item.mockPreview.title}
                  </div>
                  <div className="text-[11px] text-slate-400 line-clamp-2">
                    {item.mockPreview.body}
                  </div>
                </div>

                {/* Footer Command Pill */}
                <div className="pt-2 border-t border-white/[0.06] flex items-center justify-between font-mono text-[11px]">
                  <span className="text-slate-400">{item.name}</span>
                  <span className="text-[#38bdf8] font-bold">{item.command}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Deep Dive Remedy Inspector Panel */}
        {selectedSlop && (
          <div className="craft-card p-6 sm:p-8 rounded-lg border border-[#f59e0b]/40 bg-[#0c0f16] space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/[0.08] pb-4">
              <div>
                <div className="font-mono text-xs text-[#f59e0b] font-medium flex items-center gap-2">
                  <span>RULE DETECTOR // SPECIFICATION</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-display font-bold text-white mt-1">
                  {selectedSlop.name}
                </h3>
              </div>
              
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 rounded bg-[#38bdf8]/10 text-[#38bdf8] border border-[#38bdf8]/30 font-mono text-xs font-bold">
                  Remedy Command: {selectedSlop.command}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              <div className="space-y-2">
                <span className="font-mono text-xs text-[#f43f5e] font-bold flex items-center gap-1.5">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  THE SYNTHETIC AI TELL:
                </span>
                <p className="text-xs text-slate-300 font-sans leading-relaxed bg-[#140e10] p-3 rounded border border-[#f43f5e]/20">
                  {selectedSlop.tell}
                </p>
              </div>

              <div className="space-y-2">
                <span className="font-mono text-xs text-[#34d399] font-bold flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  PIXELCREW ARCHITECTURAL REMEDY:
                </span>
                <p className="text-xs text-slate-200 font-sans leading-relaxed bg-[#0b1411] p-3 rounded border border-[#34d399]/20">
                  {selectedSlop.remedy}
                </p>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
