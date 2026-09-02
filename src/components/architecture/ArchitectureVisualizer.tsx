'use client';

import { useState } from 'react';
import { playChiptuneSound } from '@/lib/pixelcrew';
import { Layers, ShieldCheck, Cpu, GitBranch, Sparkles, FileText, CheckCircle2, ArrowRight } from 'lucide-react';

export function ArchitectureVisualizer() {
  return (
    <section id="architecture" className="py-24 bg-[#07080c] border-b border-white/[0.08] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="space-y-4 max-w-3xl">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#34d399]" />
            <span className="font-mono text-xs uppercase tracking-widest text-slate-400">
              Floor 42 // Architectural Foundations
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold font-display tracking-tight text-white">
            Engineered for high craft. Zero runtime bloat.
          </h2>
          <p className="text-sm sm:text-base text-slate-300 font-sans leading-relaxed">
            PixelCrew transforms any codebase into an observable, multi-agent workspace without adding a single third-party package to your production bundle.
          </p>
        </div>

        {/* Asymmetric Bento Grid (5 Bespoke Tiles) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Tile 1 (Span 8): Zero Runtime Dependencies */}
          <article className="lg:col-span-8 craft-card rounded-lg p-6 sm:p-8 space-y-6 flex flex-col justify-between border border-white/10 bg-[#0c0f16]">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-[#f59e0b] font-bold">01 // RUNTIME PHILOSOPHY</span>
                <span className="px-2 py-0.5 rounded bg-[#34d399]/10 text-[#34d399] font-mono text-[10px] border border-[#34d399]/20">
                  0 NPM DEPS
                </span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-display font-bold text-white">
                Zero runtime dependencies.
              </h3>
              <p className="text-sm text-slate-300 font-sans leading-relaxed max-w-2xl">
                PixelCrew operates strictly at the agent harness layer. Canonical markdown skills, prompt caching, and AST code transformers live in your local environment, keeping your production deployment lightning fast and clean.
              </p>
            </div>

            {/* Visual: File Inspection Sandbox */}
            <div className="p-4 rounded bg-[#07080c] border border-white/[0.08] font-mono text-xs space-y-2">
              <div className="text-slate-400 text-[11px] pb-1 border-b border-white/[0.06] flex items-center justify-between">
                <span>/pixelcrew init : codebase inspection</span>
                <span className="text-[#34d399]">100% Native</span>
              </div>
              <div className="space-y-1 text-[11px] text-slate-300">
                <div className="flex items-center gap-2">
                  <span className="text-[#34d399]">✓</span>
                  <span className="text-white font-semibold">.agents/skills/</span>
                  <span className="text-slate-500">— 8 canonical software engineering skills loaded</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[#34d399]">✓</span>
                  <span className="text-white font-semibold">package.json</span>
                  <span className="text-slate-500">— 0 runtime packages injected into dependencies</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[#34d399]">✓</span>
                  <span className="text-white font-semibold">DESIGN.md</span>
                  <span className="text-slate-500">— Google Stitch design system synchronized</span>
                </div>
              </div>
            </div>
          </article>

          {/* Tile 2 (Span 4): Real Product Context (PRODUCT.md) */}
          <article className="lg:col-span-4 craft-card rounded-lg p-6 sm:p-8 space-y-6 flex flex-col justify-between border border-white/10 bg-[#0c0f16]">
            <div className="space-y-3">
              <span className="font-mono text-xs text-[#38bdf8] font-bold">02 // ARCHITECTURAL CONTEXT</span>
              <h3 className="text-xl sm:text-2xl font-display font-bold text-white">
                Real product context.
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed">
                Captures the brief once in <code>PRODUCT.md</code>. Every persona reads domain requirements and anti-references before generating code.
              </p>
            </div>

            {/* Visual: PRODUCT.md Card */}
            <div className="p-3.5 rounded bg-[#07080c] border border-white/[0.08] font-mono text-[11px] space-y-2">
              <div className="text-slate-400 text-[10px] pb-1 border-b border-white/[0.06] flex items-center justify-between">
                <span>PRODUCT.md</span>
                <span className="text-[#38bdf8]">Active</span>
              </div>
              <div className="space-y-1 text-slate-300">
                <div><span className="text-slate-500">Audience: </span>Senior engineers</div>
                <div><span className="text-slate-500">Voice: </span>Direct, technical, calm</div>
                <div><span className="text-slate-500">Anti-refs: </span>Purple gradients, status-soup</div>
              </div>
            </div>
          </article>

          {/* Tile 3 (Span 4): Travels as DESIGN.md */}
          <article className="lg:col-span-4 craft-card rounded-lg p-6 sm:p-8 space-y-6 flex flex-col justify-between border border-white/10 bg-[#0c0f16]">
            <div className="space-y-3">
              <span className="font-mono text-xs text-[#f59e0b] font-bold">03 // DESIGN SYSTEM</span>
              <h3 className="text-xl sm:text-2xl font-display font-bold text-white">
                Travels as DESIGN.md.
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed">
                Written in the Google Stitch specification. Color ramps, fluid type scales, and component interfaces become completely portable.
              </p>
            </div>

            {/* Visual: Color Ramp Swatches */}
            <div className="p-3.5 rounded bg-[#07080c] border border-white/[0.08] space-y-2 font-mono text-[11px]">
              <div className="flex justify-between text-[10px] text-slate-400 pb-1 border-b border-white/[0.06]">
                <span>Obsidian & Kinpaku</span>
                <span>oklch(78% .12 82)</span>
              </div>
              <div className="grid grid-cols-6 gap-1 h-6 rounded overflow-hidden">
                <div className="bg-[#07080c]" />
                <div className="bg-[#131722]" />
                <div className="bg-[#38bdf8]" />
                <div className="bg-[#34d399]" />
                <div className="bg-[#f59e0b]" />
                <div className="bg-[#f43f5e]" />
              </div>
            </div>
          </article>

          {/* Tile 4 (Span 4): 6-Dimension Anti-AI Rubric */}
          <article className="lg:col-span-4 craft-card rounded-lg p-6 sm:p-8 space-y-6 flex flex-col justify-between border border-white/10 bg-[#0c0f16]">
            <div className="space-y-3">
              <span className="font-mono text-xs text-[#f43f5e] font-bold">04 // QUALITY GATE</span>
              <h3 className="text-xl sm:text-2xl font-display font-bold text-white">
                Automated Rubric &gt;= 8.5.
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed">
                Every generated UI file must pass 6 quantitative dimensions before committing to your active branch.
              </p>
            </div>

            {/* Visual: Rubric Score Breakdown */}
            <div className="p-3.5 rounded bg-[#07080c] border border-white/[0.08] font-mono text-[11px] space-y-1.5">
              <div className="flex justify-between">
                <span className="text-slate-400">Originality</span>
                <span className="text-white font-bold">9.2 / 10</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Visual Hierarchy</span>
                <span className="text-white font-bold">9.5 / 10</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Slop Penalty</span>
                <span className="text-[#34d399] font-bold">0.0 (Clean)</span>
              </div>
            </div>
          </article>

          {/* Tile 5 (Span 4): Cross-IDE Distribution */}
          <article className="lg:col-span-4 craft-card rounded-lg p-6 sm:p-8 space-y-6 flex flex-col justify-between border border-white/10 bg-[#0c0f16]">
            <div className="space-y-3">
              <span className="font-mono text-xs text-[#34d399] font-bold">05 // PROVIDER ECOSYSTEM</span>
              <h3 className="text-xl sm:text-2xl font-display font-bold text-white">
                Syncs across all IDEs.
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed">
                One command installs canonical capabilities into Antigravity, Claude Code, Cursor, Gemini CLI, Codex, and Kiro simultaneously.
              </p>
            </div>

            {/* Visual: Cross-IDE targets */}
            <div className="p-3.5 rounded bg-[#07080c] border border-white/[0.08] font-mono text-[11px] space-y-1">
              <div className="text-slate-400 text-[10px] pb-1 border-b border-white/[0.06]">
                Target Directory Tree
              </div>
              <div className="text-slate-300"><code>.agents/skills/</code> → Antigravity</div>
              <div className="text-slate-300"><code>.claude/skills/</code> → Claude Code</div>
              <div className="text-slate-300"><code>.cursor/rules/</code> → Cursor IDE</div>
            </div>
          </article>

        </div>

      </div>
    </section>
  );
}
