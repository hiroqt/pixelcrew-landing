'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Check, Copy, ArrowRight, Star } from 'lucide-react';
import { GithubIcon } from '@/components/ui/GithubIcon';
import { PixelWaveBackground } from '@/components/ui/PixelWaveBackground';
import { PixelCrewBot } from '@/components/hero/PixelCrewBot';
import { 
  AntigravityIcon, 
  ClaudeIcon, 
  CursorIcon, 
  GeminiCliIcon, 
  CodexIcon, 
  KiroIcon, 
  OpenCodeIcon 
} from '@/components/ui/ToolIcons';

export function Hero() {
  const [copied, setCopied] = useState(false);

  const copyInstall = () => {
    navigator.clipboard.writeText('npx pixelcrew init');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="relative pt-20 pb-16 overflow-hidden">
      {/* Animated Pixel Dotted Wave (Hero only) */}
      <PixelWaveBackground />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Centered Content */}
        <div className="text-center max-w-3xl mx-auto space-y-6">
          
          {/* Headline */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-pixel tracking-tight text-white text-theme-primary leading-[1.4] sm:leading-[1.35] uppercase">
            Multi-agent engineering
            <br />
            <span className="shining-text">
              for high-craft software
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-sm sm:text-base text-slate-400 text-theme-secondary leading-relaxed max-w-lg mx-auto">
            Autonomous multi-agent sprints that ship verified production code, not prototypes. Zero runtime dependencies.
          </p>

          {/* CTA Row */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            {/* Install command */}
            <button
              onClick={copyInstall}
              className="flex items-center gap-2 bg-white/[0.06] hover:bg-white/[0.12] bg-theme-card-hover border border-white/[0.1] border-theme-border px-4 py-2.5 rounded-md font-mono text-sm text-white text-theme-primary transition-all group cursor-pointer"
            >
              <span className="opacity-50 text-theme-muted">$</span>
              <span>npx pixelcrew init</span>
              {copied ? (
                <Check className="w-4 h-4 text-emerald-400 ml-1" />
              ) : (
                <Copy className="w-3.5 h-3.5 opacity-40 group-hover:opacity-80 transition-opacity ml-1" />
              )}
            </button>

            {/* Docs link */}
            <Link
              href="/docs"
              className="flex items-center gap-1.5 text-sm text-slate-400 hover:text-white text-theme-secondary hover:text-theme-primary transition-colors"
            >
              Read the docs
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* GitHub star */}
          <div className="pt-1">
            <a
              href="https://github.com/hiroqt/PixelCrew"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-white/[0.08] hover:border-white/[0.16] bg-white/[0.02] hover:bg-white/[0.06] text-xs text-slate-400 hover:text-white text-theme-muted hover:text-theme-primary transition-all group"
            >
              <GithubIcon className="w-4 h-4" />
              <span>Star on GitHub</span>
              <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400/20 group-hover:fill-amber-400 transition-all ml-0.5" />
            </a>
          </div>

          {/* Tool Icons */}
          <div className="pt-4">
            <p className="text-[10px] uppercase tracking-[0.2em] text-slate-600 text-theme-muted mb-3">
              Works with
            </p>
            <div className="flex items-center justify-center gap-5 sm:gap-6 pt-1">
              {[
                { icon: AntigravityIcon, name: 'Antigravity' },
                { icon: ClaudeIcon, name: 'Claude Code' },
                { icon: CursorIcon, name: 'Cursor' },
                { icon: GeminiCliIcon, name: 'Gemini CLI' },
                { icon: CodexIcon, name: 'Codex CLI' },
                { icon: KiroIcon, name: 'Kiro' },
                { icon: OpenCodeIcon, name: 'OpenCode' },
              ].map((tool) => (
                <div
                  key={tool.name}
                  title={tool.name}
                  aria-label={tool.name}
                  className="transition-all duration-200 hover:scale-125 opacity-70 hover:opacity-100 flex items-center justify-center text-slate-400 hover:text-white text-theme-secondary hover:text-theme-primary cursor-pointer"
                >
                  <tool.icon className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Banner Image with PixelCrew Scout Bots */}
        <div className="mt-14 relative rounded-lg overflow-visible border border-white/[0.08] shadow-2xl shadow-black/40">
          {/* Scout Bots perched on banner corners */}
          <PixelCrewBot position="top-right" variant="purple" />
          <PixelCrewBot position="top-left" variant="teal" />

          <div className="rounded-lg overflow-hidden">
            <Image
              src="/banner.png"
              alt="PixelCrew — Autonomous Agents. Real Impact."
              width={1920}
              height={600}
              className="w-full h-auto block"
              priority
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#07080c] via-transparent to-transparent opacity-60 pointer-events-none rounded-lg" />
        </div>

      </div>
    </section>
  );
}
