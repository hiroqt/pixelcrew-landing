'use client';

import { useState } from 'react';
import { playChiptuneSound } from '@/lib/pixelcrew';
import { Terminal, Copy, Check, Sparkles, Layers, ShieldCheck, Zap, ArrowRight, FileCheck, RefreshCw } from 'lucide-react';

interface SwarmCommand {
  name: string;
  category: 'architecture' | 'aesthetic' | 'hardening';
  persona: string;
  summary: string;
  intervention: string;
  rubricScore: string;
  outputArtifact: string;
  samplePrompt: string;
}

const SWARM_COMMANDS: SwarmCommand[] = [
  {
    name: 'assemble',
    category: 'architecture',
    persona: 'Orchestrator',
    summary: 'Full shape-then-build multi-agent sprint pipeline from brief to production code.',
    intervention: 'Compiles dynamic DAG task graph with 0 cycles, assigns 9 specialized agent roles, and verifies output.',
    rubricScore: 'Score: 9.6/10.0',
    outputArtifact: '.pixel-crew/sprint.json',
    samplePrompt: '/pixelcrew assemble "Build multi-tenant SaaS analytics with Supabase RLS"'
  },
  {
    name: 'blueprint',
    category: 'architecture',
    persona: 'UX Planner',
    summary: 'Plans UX section topologies, wireframes, and dynamic DAG task graphs before writing code.',
    intervention: 'Deconstructs user flow, eliminates horizontal overflow, and locks section hierarchy.',
    rubricScore: 'Hierarchy: 9.8/10.0',
    outputArtifact: 'BLUEPRINT.md',
    samplePrompt: '/pixelcrew blueprint "Design onboarding experience for high-security vault"'
  },
  {
    name: 'boss-fight',
    category: 'architecture',
    persona: 'QA Critic & SRE',
    summary: 'Targeted swarm bug blitz to isolate, repair, and verify breaking production issues.',
    intervention: 'Spawns sandbox subagent, generates failing regression tests, and applies surgical fix.',
    rubricScore: 'Verification: 100% Pass',
    outputArtifact: 'TESTING.md',
    samplePrompt: '/pixelcrew boss-fight "Fix hydration mismatch in client navigation"'
  },
  {
    name: 'manifest',
    category: 'architecture',
    persona: 'Design System Architect',
    summary: 'Reverse-engineers active project code into DESIGN.md and PRODUCT.md specifications.',
    intervention: 'Extracts tokens, color ramps, fluid type scales, and component interfaces into Stitch format.',
    rubricScore: 'Cohesion: 9.4/10.0',
    outputArtifact: 'DESIGN.md',
    samplePrompt: '/pixelcrew manifest'
  },
  {
    name: 'render',
    category: 'aesthetic',
    persona: 'Creative Director',
    summary: '6-dimension Anti-AI design review enforcing threshold >= 8.5/10.',
    intervention: 'Evaluates originality, typographic contrast, layout asymmetry, and slop penalties.',
    rubricScore: 'Current: 9.3/10.0',
    outputArtifact: '.pixel-crew/render-audit.json',
    samplePrompt: '/pixelcrew render'
  },
  {
    name: 'typeset',
    category: 'aesthetic',
    persona: 'Creative Director',
    summary: 'Applies mathematical fluid clamp() type scales and establishes clear typographic hierarchy.',
    intervention: 'Replaces generic font defaults with high-contrast display serif and clean mono accents.',
    rubricScore: 'Typography: 9.7/10.0',
    outputArtifact: 'src/app/globals.css',
    samplePrompt: '/pixelcrew typeset editorial'
  },
  {
    name: 'bento',
    category: 'aesthetic',
    persona: 'Frontend Builder',
    summary: 'Reorganizes repetitive sections into asymmetric Bento grids and dynamic viewport flow.',
    intervention: 'Replaces identical 3-column repetitive cards with 8:4 and 7:5 staggered visual rhythms.',
    rubricScore: 'Layout: 9.5/10.0',
    outputArtifact: 'src/components/ui/BentoGrid.tsx',
    samplePrompt: '/pixelcrew bento hero'
  },
  {
    name: 'de-slop',
    category: 'aesthetic',
    persona: 'QA & Visual Critic',
    summary: 'Strips AI cliché copywriting and replaces it with grounded technical truth.',
    intervention: 'Replaces generic hype ("Revolutionize your workflow") with concrete architectural metrics.',
    rubricScore: 'Slop Penalty: 0.0',
    outputArtifact: 'src/app/page.tsx',
    samplePrompt: '/pixelcrew de-slop'
  },
  {
    name: 'chromatic',
    category: 'aesthetic',
    persona: 'Design System Architect',
    summary: 'Injects curated HSL color tokens, dark mode elevation surfaces, and atmospheric accents.',
    intervention: 'Removes blinding neon rainbow clashes, establishing an obsidian palette with warm architectural gold.',
    rubricScore: 'Brand: 9.4/10.0',
    outputArtifact: 'src/styles/tokens.css',
    samplePrompt: '/pixelcrew chromatic obsidian'
  },
  {
    name: 'sentinel',
    category: 'hardening',
    persona: 'Security Sentinel',
    summary: 'OWASP checks, SQL injection prevention, RFC 7807 error envelopes, and rate limiting.',
    intervention: 'Audits inputs, injects CSP headers, and configures sliding-window token buckets.',
    rubricScore: 'OWASP: Clean',
    outputArtifact: 'src/middleware.ts',
    samplePrompt: '/pixelcrew sentinel'
  },
  {
    name: 'audit',
    category: 'hardening',
    persona: 'QA Automation',
    summary: 'WCAG AA/AAA accessibility, Core Web Vitals (LCP < 0.6s), and Playwright journeys.',
    intervention: 'Validates keyboard navigation, contrast ratios, and performs automated E2E testing.',
    rubricScore: 'WCAG: AAA Passed',
    outputArtifact: '.pixel-crew/audit-report.md',
    samplePrompt: '/pixelcrew audit'
  },
  {
    name: 'warp',
    category: 'hardening',
    persona: 'Performance Profiler',
    summary: 'Streaming SSR, bundle minification, and AST prompt caching (~72% token savings).',
    intervention: 'Extracts symbol graphs, prunes dead context, and maximizes LLM prompt cache hits.',
    rubricScore: 'LCP: 0.38s',
    outputArtifact: 'next.config.ts',
    samplePrompt: '/pixelcrew warp'
  }
];

export function SwarmProofStudio() {
  const [selectedCat, setSelectedCat] = useState<'all' | 'architecture' | 'aesthetic' | 'hardening'>('all');
  const [activeCmd, setActiveCmd] = useState<SwarmCommand>(SWARM_COMMANDS[0]);
  const [copied, setCopied] = useState(false);

  const filteredCommands = selectedCat === 'all' 
    ? SWARM_COMMANDS 
    : SWARM_COMMANDS.filter(c => c.category === selectedCat);

  const handleCopyPrompt = () => {
    playChiptuneSound('click');
    navigator.clipboard.writeText(activeCmd.samplePrompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="commands" className="py-24 bg-[#07080c] border-b border-white/[0.08] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="space-y-4 max-w-3xl">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#f59e0b]" />
            <span className="font-mono text-xs uppercase tracking-widest text-slate-400">
              Floor 42 // Shared Engineering Vocabulary
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold font-display tracking-tight text-white">
            Give direction in chat. Refine the result in source.
          </h2>
          <p className="text-sm sm:text-base text-slate-300 font-sans leading-relaxed">
            23 specialized commands give you precise control over every architectural and visual layer. Pick any command to inspect its active persona and transformation specification.
          </p>
        </div>

        {/* Filter Category Tabs */}
        <div className="flex flex-wrap items-center gap-2 border-b border-white/[0.08] pb-4">
          {[
            { id: 'all', label: 'All 23 Commands' },
            { id: 'architecture', label: 'Creation & Architecture' },
            { id: 'aesthetic', label: 'Aesthetic & Anti-AI' },
            { id: 'hardening', label: 'Production Hardening & SRE' }
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => {
                playChiptuneSound('click');
                setSelectedCat(tab.id as any);
              }}
              className={`px-3.5 py-1.5 rounded text-xs font-medium transition-all ${
                selectedCat === tab.id
                  ? 'bg-white text-[#07080c] font-semibold'
                  : 'text-slate-400 hover:text-white bg-[#0e1117] border border-white/[0.06]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Interactive Studio Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column (Span 6): Command Matrix Chips */}
          <div className="lg:col-span-6 grid grid-cols-2 sm:grid-cols-3 gap-2.5">
            {filteredCommands.map((cmd) => {
              const isActive = activeCmd.name === cmd.name;
              return (
                <button
                  key={cmd.name}
                  type="button"
                  onClick={() => {
                    playChiptuneSound('select');
                    setActiveCmd(cmd);
                  }}
                  className={`p-3 rounded text-left transition-all craft-card flex flex-col justify-between space-y-2 ${
                    isActive
                      ? 'border-[#f59e0b] bg-[#141822] shadow-[0_0_15px_rgba(245,158,11,0.15)]'
                      : 'hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center justify-between font-mono text-xs">
                    <span className="font-bold text-white">/{cmd.name}</span>
                    <span className="text-[10px] text-slate-500">
                      {cmd.category === 'architecture' ? 'ARCH' : cmd.category === 'aesthetic' ? 'STYLE' : 'SRE'}
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-400 line-clamp-1">
                    {cmd.persona}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Column (Span 6): Command Spec & Live Transform Inspector */}
          <div className="lg:col-span-6">
            <div className="craft-card rounded-lg p-6 sm:p-8 space-y-6 border border-white/10 bg-[#0e1117] shadow-xl">
              
              {/* Header */}
              <div className="flex items-start justify-between gap-4 border-b border-white/[0.08] pb-5">
                <div>
                  <div className="flex items-center gap-2 font-mono text-xs text-[#f59e0b]">
                    <span>ASSIGNED PERSONA:</span>
                    <span className="font-bold text-white">{activeCmd.persona}</span>
                  </div>
                  <h3 className="text-2xl font-display font-extrabold text-white mt-1">
                    /{activeCmd.name}
                  </h3>
                </div>

                <span className="px-3 py-1 rounded bg-[#34d399]/10 border border-[#34d399]/30 text-[#34d399] font-mono text-xs font-bold">
                  {activeCmd.rubricScore}
                </span>
              </div>

              {/* Summary */}
              <div className="space-y-2">
                <span className="font-mono text-xs text-slate-400 font-semibold uppercase">
                  OPERATIONAL GOAL:
                </span>
                <p className="text-sm text-slate-200 font-sans leading-relaxed">
                  {activeCmd.summary}
                </p>
              </div>

              {/* Architectural Intervention */}
              <div className="p-4 rounded bg-[#07080c] border border-white/[0.08] space-y-2">
                <span className="font-mono text-xs text-[#38bdf8] font-semibold flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  CANONICAL INTERVENTION SPEC:
                </span>
                <p className="text-xs text-slate-300 font-mono leading-relaxed">
                  {activeCmd.intervention}
                </p>
                <div className="pt-2 flex items-center justify-between text-[11px] font-mono text-slate-500 border-t border-white/[0.06]">
                  <span>Artifact Created/Updated:</span>
                  <code className="text-[#f59e0b]">{activeCmd.outputArtifact}</code>
                </div>
              </div>

              {/* Quick-Run Prompt Box */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                  <span>SAMPLE CHAT COMMAND:</span>
                  <button
                    type="button"
                    onClick={handleCopyPrompt}
                    className="text-[#38bdf8] hover:underline flex items-center gap-1"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-[#34d399]" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? 'Copied!' : 'Copy Command'}</span>
                  </button>
                </div>
                <div className="p-3 bg-[#131722] rounded border border-white/10 font-mono text-xs text-slate-100 flex items-center justify-between">
                  <code>{activeCmd.samplePrompt}</code>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
