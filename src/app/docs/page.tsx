'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Copy, 
  Check, 
  ChevronRight, 
  ChevronDown, 
  ArrowLeft,
  ArrowRight,
  Briefcase,
  Palette,
  Layout,
  Terminal,
  Database,
  ShieldCheck,
  Gauge,
  TestTube2,
  Film,
  XCircle,
  BookOpen,
  TerminalSquare,
  Layers,
  Cpu,
  Boxes,
  HelpCircle,
  Hash
} from 'lucide-react';
import { GithubIcon } from '@/components/ui/GithubIcon';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { 
  AntigravityIcon, 
  ClaudeIcon, 
  CursorIcon, 
  GeminiCliIcon, 
  CodexIcon, 
  KiroIcon, 
  OpenCodeIcon,
  GrokIcon,
  HermesIcon 
} from '@/components/ui/ToolIcons';

/* ─────────────────────────────────────────────
   Table of Contents structure
   ───────────────────────────────────────────── */

const TOC = [
  { id: 'getting-started', label: 'Getting Started', icon: BookOpen },
  { id: 'installation', label: 'Installation', icon: TerminalSquare },
  { id: 'commands', label: 'Commands', icon: Terminal },
  { id: 'agents', label: 'Agent Personas', icon: Layers },
  { id: 'skills', label: 'Skills', icon: Boxes },
  { id: 'ide-setup', label: 'IDE Setup', icon: Cpu },
  { id: 'architecture', label: 'Architecture', icon: Layers },
  { id: 'configuration', label: 'Configuration', icon: Hash },
  { id: 'anti-ai-rubric', label: 'Anti-AI Rubric', icon: ShieldCheck },
  { id: 'faq', label: 'FAQ', icon: HelpCircle },
];

/* ─────────────────────────────────────────────
   Commands data
   ───────────────────────────────────────────── */

const COMMANDS = {
  'Creation & Architecture': [
    { cmd: '/pixelcrew assemble [prompt]', desc: 'Full shape-then-build multi-agent sprint pipeline. Decomposes a brief into a DAG task graph, assigns agent personas, and executes to production code.' },
    { cmd: '/pixelcrew blueprint [prompt]', desc: 'Plans UX section topologies, wireframes, and dynamic DAG task graphs before any code is written.' },
    { cmd: '/pixelcrew boss-fight <issue>', desc: 'Targeted swarm bug blitz. Spawns a sandbox subagent, generates failing regression tests, and applies a surgical fix.' },
    { cmd: '/pixelcrew manifest', desc: 'Reverse-engineers your active codebase into DESIGN.md and PRODUCT.md architectural specifications.' },
    { cmd: '/pixelcrew retrofit', desc: 'Extracts reusable UI primitives, Tailwind tokens, and CSS variables into a design system.' },
    { cmd: '/pixelcrew init', desc: 'Scans codebase architecture, configures .pixel-crew/ directory, and adapts the agent squad to your stack.' },
  ],
  'Aesthetic & Anti-AI': [
    { cmd: '/pixelcrew render', desc: '6-dimension Anti-AI design review. Scores Originality, Hierarchy, Typography, Layout, Brand, and Slop Penalty. Threshold: ≥ 8.5/10.' },
    { cmd: '/pixelcrew 8bit', desc: 'Web Audio chiptune chimes, CRT scanlines, and tactile pixel-art feedback effects.' },
    { cmd: '/pixelcrew overdrive', desc: 'WebGL/Canvas shaders, interactive terminal shell, and reactive animated backgrounds.' },
    { cmd: '/pixelcrew chromatic [palette]', desc: 'Curated HSL color tokens, dark mode elevation surfaces, and atmospheric accent generation.' },
    { cmd: '/pixelcrew typeset [preset]', desc: 'Mathematical fluid clamp() type scales with expressive typographic hierarchy.' },
    { cmd: '/pixelcrew bento [section]', desc: 'Asymmetric Bento grid layouts with dynamic viewport flow — replaces repetitive 3-card grids.' },
    { cmd: '/pixelcrew de-slop [section]', desc: 'Strips generic AI cliché copywriting and replaces it with grounded technical value propositions.' },
    { cmd: '/pixelcrew bolder', desc: 'Amplifies visual punch: stronger type contrast, bolder accent colors, larger hit targets.' },
    { cmd: '/pixelcrew quieter', desc: 'Restores calm minimalist balance: reduced contrast, muted accents, increased whitespace.' },
  ],
  'Production Hardening & SRE': [
    { cmd: '/pixelcrew sentinel', desc: 'OWASP security checks, SQL injection prevention, RFC 7807 error envelopes, CSP headers, and rate limiting.' },
    { cmd: '/pixelcrew audit', desc: 'WCAG AA/AAA accessibility testing, Core Web Vitals analysis (LCP < 0.6s), and Playwright E2E journeys.' },
    { cmd: '/pixelcrew warp', desc: 'Streaming SSR, bundle minification, AST prompt caching (~72% token savings), and priority hint injection.' },
    { cmd: '/pixelcrew polish', desc: 'Shipping readiness pass: strict type checking, design system token alignment, and dead code elimination.' },
    { cmd: '/pixelcrew calibrate [viewport]', desc: 'Responsive viewport testing from 360px mobile to 4K desktop with breakpoint optimization.' },
  ],
  'Operations': [
    { cmd: '/pixelcrew recap [count]', desc: 'Compact git changelog and diff stats for the last N commits.' },
    { cmd: '/pixelcrew roster', desc: 'Lists active squad workstations, subagent allocation, and telemetry status.' },
    { cmd: '/pixelcrew doctor', desc: 'System diagnostics, environment validation, toolchain compatibility, and provider connectivity checks.' },
  ],
};

/* ─────────────────────────────────────────────
   Agent personas (Icons only, no emojis)
   ───────────────────────────────────────────── */

const AGENTS = [
  { icon: Briefcase, color: '#f59e0b', name: 'Orchestrator', role: 'Staff Swarm Architect & Project Lead', desc: 'Decomposes prompts into DAG tasks, resolves dependencies, coordinates multi-agent sprints, and enforces quality gates.' },
  { icon: Palette, color: '#38bdf8', name: 'Creative Director', role: 'Lead Aesthetic Strategist', desc: 'Defines visual personality, asymmetric layouts, fluid typography scales, and anti-AI visual constraints.' },
  { icon: Layout, color: '#34d399', name: 'Frontend Builder', role: 'Senior UI/UX Engineer', desc: 'React 19, Next.js App Router, Tailwind v4 tokens, Bento grids, and WCAG AA/AAA accessibility.' },
  { icon: Terminal, color: '#f43f5e', name: 'Backend Engineer', role: 'Principal API & Systems Engineer', desc: 'OpenAPI 3.1, RFC 7807 errors, OAuth 2.1/OIDC, token bucket rate limiting, and idempotency keys.' },
  { icon: Database, color: '#fbbf24', name: 'Database Architect', role: 'Principal DBA & Query Tuner', desc: 'Schema design, composite indexing, Row-Level Security, connection pooling, and pgvector.' },
  { icon: ShieldCheck, color: '#ef4444', name: 'Security Sentinel', role: 'InfoSec Lead & OWASP Auditor', desc: 'Input validation, XSS/CSRF sanitization, OWASP Top 10 audits, dependency scanning, and rate limiting.' },
  { icon: Gauge, color: '#10b981', name: 'Performance Profiler', role: 'Core Web Vitals Optimizer', desc: 'LCP < 0.6s, SSR streaming, main thread yielding, multi-tier caching, and k6 load testing.' },
  { icon: TestTube2, color: '#a855f7', name: 'QA & Visual Critic', role: 'Anti-AI Rubric Guardian', desc: 'Automated test generation, Playwright E2E journeys, 6-dimension visual rubric scoring (≥ 8.5/10).' },
  { icon: Film, color: '#06b6d4', name: 'Motion Specialist', role: 'Kinetic Choreographer', desc: 'Micro-interactions, CSS/Framer Motion transitions, canvas rendering, and Web Audio synthesis.' },
];

/* ─────────────────────────────────────────────
   IDE configs
   ───────────────────────────────────────────── */

const IDE_CONFIGS = [
  { name: 'Antigravity (Google)', icon: AntigravityIcon, dir: '.gemini/', file: 'GEMINI.md', desc: 'Reads AGENTS.md and GEMINI.md from your project root. Skills are loaded from .agents/skills/.' },
  { name: 'Claude Code', icon: ClaudeIcon, dir: '.claude/', file: 'CLAUDE.md', desc: 'Reads AGENTS.md and loads skills from .agents/skills/. Project rules go in .claude/rules/.' },
  { name: 'Cursor', icon: CursorIcon, dir: '.cursor/', file: '.cursorrules', desc: 'Reads .cursorrules for agent instructions. Skills load from .agents/skills/ or .cursor/skills/.' },
  { name: 'Gemini CLI', icon: GeminiCliIcon, dir: '.gemini/', file: 'GEMINI.md', desc: 'Same config as Antigravity. Place AGENTS.md at project root and skills in .agents/skills/.' },
  { name: 'Codex CLI', icon: CodexIcon, dir: '.agents/', file: 'AGENTS.md', desc: 'Reads AGENTS.md directly. All skills in .agents/skills/ are auto-discovered.' },
  { name: 'Kiro', icon: KiroIcon, dir: '.kiro/', file: 'AGENTS.md', desc: 'Reads AGENTS.md from .kiro/ or project root. Skills in .agents/skills/ are auto-loaded.' },
  { name: 'OpenCode', icon: OpenCodeIcon, dir: '.agents/', file: 'AGENTS.md', desc: 'Standard .agents/ directory layout with AGENTS.md and skills/ subdirectory.' },
  { name: 'Grok', icon: GrokIcon, dir: '.grok/', file: 'AGENTS.md', desc: 'Reads AGENTS.md and loads skills from .agents/skills/ for xAI Grok agent tooling.' },
  { name: 'Hermes', icon: HermesIcon, dir: '.hermes/', file: 'AGENTS.md', desc: 'NousResearch Hermes open-weights agent execution with function calling and .agents/ skills.' },
];

/* ─────────────────────────────────────────────
   FAQ Data
   ───────────────────────────────────────────── */

const FAQ_ITEMS = [
  {
    q: 'Does PixelCrew require an API key?',
    a: 'No. PixelCrew ships as markdown skill files that your existing AI IDE reads directly. It utilizes whatever LLM backend your IDE is already configured with — whether Anthropic, Google Gemini, OpenAI, or local models.'
  },
  {
    q: 'Can I use PixelCrew with multiple IDEs simultaneously?',
    a: 'Yes. The .agents/ directory structure is standardized and read by all supported IDEs. You can have Cursor, Claude Code, and Antigravity all operating on the same repository using the unified PixelCrew swarm configuration.'
  },
  {
    q: 'What happens if I don\'t have a database in my project?',
    a: 'Set "database": false in .pixel-crew/context.json. The Database Architect persona will be automatically disabled, preventing redundant context injection and conserving token budget.'
  },
  {
    q: 'How do I add a custom skill?',
    a: 'Create a new directory under .agents/skills/your-skill-name/ with a SKILL.md file containing YAML frontmatter and markdown instructions. The swarm auto-discovers and indexes any skill in that directory.'
  },
  {
    q: 'Does PixelCrew work with non-JavaScript projects?',
    a: 'Yes. The skill files cover Python (FastAPI, Django), Go, Rust, and general backend architectures. The codebase-intelligence engine auto-detects your primary languages and toolchains during init.'
  },
  {
    q: 'How do I update PixelCrew?',
    a: 'Simply run `npx pixelcrew init` again. It will update the canonical skill specifications while safely preserving your custom skills and .pixel-crew/context.json overrides.'
  },
];

/* ─────────────────────────────────────────────
   Copy button helper
   ───────────────────────────────────────────── */

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button
      type="button"
      onClick={handleCopy}
      className="absolute top-2 right-2 p-1.5 rounded bg-white/[0.06] hover:bg-white/[0.1] text-slate-400 hover:text-white transition-all"
      title="Copy to clipboard"
      aria-label="Copy to clipboard"
    >
      {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
    </button>
  );
}

/* ─────────────────────────────────────────────
   Code block helper
   ───────────────────────────────────────────── */

function CodeBlock({ code, lang = 'bash' }: { code: string; lang?: string }) {
  return (
    <div className="relative rounded-md code-theme bg-[#0a0c12] border border-white/[0.06] overflow-hidden my-3">
      <div className="px-3 py-1.5 border-b border-white/[0.06] text-[10px] font-mono text-slate-500 uppercase flex items-center justify-between">
        <span>{lang}</span>
      </div>
      <pre className="p-4 overflow-x-auto text-xs sm:text-sm font-mono text-slate-200 leading-relaxed">
        <code>{code}</code>
      </pre>
      <CopyButton text={code} />
    </div>
  );
}

/* ─────────────────────────────────────────────
   Main Documentation Page
   ───────────────────────────────────────────── */

export default function DocsPage() {
  const [activeTab, setActiveTab] = useState<string>('getting-started');
  const [openFaq, setOpenFaq] = useState<Record<number, boolean>>({ 0: true });

  // Sync with initial URL hash if present
  useEffect(() => {
    if (typeof window !== 'undefined' && window.location.hash) {
      const hash = window.location.hash.replace('#', '');
      const valid = TOC.find(t => t.id === hash);
      if (valid) {
        setActiveTab(valid.id);
      }
    }
  }, []);

  const selectTab = (id: string) => {
    setActiveTab(id);
    if (typeof window !== 'undefined') {
      window.location.hash = id;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const toggleFaq = (index: number) => {
    setOpenFaq(prev => ({ ...prev, [index]: !prev[index] }));
  };

  const currentTabIdx = TOC.findIndex(t => t.id === activeTab);
  const currentTocItem = TOC[currentTabIdx] || TOC[0];
  const prevTab = currentTabIdx > 0 ? TOC[currentTabIdx - 1] : null;
  const nextTab = currentTabIdx < TOC.length - 1 ? TOC[currentTabIdx + 1] : null;

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] transition-colors duration-150">
      
      {/* Sticky Header Bar */}
      <header className="sticky top-0 z-50 header-theme bg-[var(--background)]/90 backdrop-blur-md border-b border-white/[0.06] transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
          
          <div className="flex items-center gap-4">
            <Link 
              href="/" 
              className="flex items-center gap-2 text-slate-400 hover:text-white text-theme-secondary transition-colors text-xs font-medium"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Home</span>
            </Link>
            <span className="text-white/10 hidden sm:inline">|</span>
            <div className="flex items-center gap-2">
              <Image 
                src="/Pixelcrew_logo.png" 
                alt="PixelCrew" 
                width={22} 
                height={22} 
                className="rounded" 
              />
              <span className="font-pixel text-xs text-white text-theme-primary uppercase">
                PixelCrew Docs
              </span>
            </div>
          </div>

          {/* Controls: Active tab indicator, Theme Toggle, GitHub */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            <div className="hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded bg-white/[0.04] border border-white/[0.06] font-mono text-[11px] text-slate-400 text-theme-muted">
              <span className="w-1.5 h-1.5 rounded-full bg-[#34d399]" />
              <span>Tab: {currentTocItem.label}</span>
            </div>

            <ThemeToggle />

            <a
              href="https://github.com/hiroqt/PixelCrew"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-white/[0.06] border border-white/[0.08] hover:bg-white/[0.1] text-slate-200 text-theme-primary text-xs font-medium transition-all"
            >
              <GithubIcon className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">GitHub</span>
            </a>
          </div>

        </div>
      </header>

      {/* Mobile Tab Scroller */}
      <div className="lg:hidden border-b border-white/[0.06] bg-white/[0.02] bg-theme-subtle px-4 py-2.5 overflow-x-auto flex gap-1.5 scrollbar-none">
        {TOC.map((item) => {
          const isActive = activeTab === item.id;
          const IconComp = item.icon;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => selectTab(item.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-xs whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-white/[0.1] bg-theme-card text-white text-theme-primary font-bold border border-white/[0.1]'
                  : 'text-slate-400 text-theme-secondary hover:text-white'
              }`}
            >
              <IconComp className="w-3 h-3 shrink-0" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>

      {/* Main Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex gap-10">

          {/* Sticky Sidebar Navigation Tabs */}
          <aside className="hidden lg:block w-64 shrink-0">
            <nav className="sticky top-24 space-y-1">
              
              <div className="px-3 pb-3 mb-2 border-b border-white/[0.06] border-theme flex items-center justify-between">
                <span className="font-mono text-[10px] text-slate-500 text-theme-muted uppercase tracking-widest font-semibold">
                  Documentation Sections
                </span>
                <span className="font-mono text-[10px] text-[#34d399]">
                  {currentTabIdx + 1} / {TOC.length}
                </span>
              </div>

              {TOC.map((item) => {
                const isActive = activeTab === item.id;
                const IconComponent = item.icon;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => selectTab(item.id)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-md text-xs transition-all text-left group ${
                      isActive
                        ? 'text-white text-theme-primary bg-white/[0.08] bg-theme-card font-semibold border-l-2 border-[#a78bfa] shadow-sm'
                        : 'text-slate-400 text-theme-secondary hover:text-white hover:bg-white/[0.03]'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <IconComponent className={`w-3.5 h-3.5 shrink-0 ${isActive ? 'text-[#a78bfa]' : 'text-slate-500'}`} />
                      <span className="truncate">{item.label}</span>
                    </div>
                    {isActive && (
                      <span className="w-1.5 h-1.5 rounded-full bg-[#a78bfa] shrink-0" />
                    )}
                  </button>
                );
              })}

              {/* Quick CLI Reference Box */}
              <div className="mt-8 p-3.5 rounded-md bg-white/[0.02] bg-theme-card border border-white/[0.06] border-theme space-y-2">
                <span className="font-mono text-[10px] text-slate-400 text-theme-muted uppercase tracking-wider block">
                  CLI Quick Start
                </span>
                <code className="text-[11px] font-mono text-[#f59e0b] block">
                  npx pixelcrew init
                </code>
              </div>

            </nav>
          </aside>

          {/* Tab Content Display Area (Only active tab rendered) */}
          <main className="flex-1 min-w-0 max-w-3xl">

            {/* ── TAB 1: Getting Started ────────────────────── */}
            {activeTab === 'getting-started' && (
              <section className="space-y-6">
                <div>
                  <div className="flex items-center gap-2 font-mono text-xs text-[#a78bfa] mb-2 uppercase tracking-wider">
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>Overview & Capabilities</span>
                  </div>
                  <h1 className="text-2xl sm:text-3xl lg:text-4xl font-pixel tracking-tight text-white text-theme-primary mb-4 uppercase leading-snug">
                    PixelCrew Docs
                  </h1>
                  <p className="text-base text-slate-300 text-theme-secondary leading-relaxed">
                    PixelCrew is an autonomous multi-agent engineering swarm that orchestrates 9 specialized
                    AI agent personas across 23 commands to ship production-grade, high-craft software. It works
                    natively with Antigravity, Claude Code, Cursor, Gemini CLI, Codex CLI, Kiro, OpenCode, Grok, and Hermes — with
                    zero runtime npm dependencies.
                  </p>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                  <div className="p-4 rounded-md bg-white/[0.02] bg-theme-card border border-white/[0.06] border-theme">
                    <div className="flex items-center gap-2 text-slate-500 mb-1">
                      <Layers className="w-3.5 h-3.5 text-[#a78bfa]" />
                      <span className="font-mono text-[11px]">Personas</span>
                    </div>
                    <p className="font-pixel text-xl font-bold text-white text-theme-primary">9</p>
                    <p className="text-xs text-slate-500 text-theme-muted mt-1">Specialized engineering roles</p>
                  </div>

                  <div className="p-4 rounded-md bg-white/[0.02] bg-theme-card border border-white/[0.06] border-theme">
                    <div className="flex items-center gap-2 text-slate-500 mb-1">
                      <Terminal className="w-3.5 h-3.5 text-[#38bdf8]" />
                      <span className="font-mono text-[11px]">Commands</span>
                    </div>
                    <p className="font-pixel text-xl font-bold text-white text-theme-primary">23</p>
                    <p className="text-xs text-slate-500 text-theme-muted mt-1">Architectural & style tools</p>
                  </div>

                  <div className="p-4 rounded-md bg-white/[0.02] bg-theme-card border border-white/[0.06] border-theme">
                    <div className="flex items-center gap-2 text-slate-500 mb-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#34d399]" />
                      <span className="font-mono text-[11px]">Runtime Deps</span>
                    </div>
                    <p className="font-pixel text-xl font-bold text-white text-theme-primary">0</p>
                    <p className="text-xs text-slate-500 text-theme-muted mt-1">Pure markdown instruction skills</p>
                  </div>
                </div>

                {/* Core Pillars */}
                <div className="pt-6 border-t border-white/[0.06] border-theme space-y-4">
                  <h3 className="text-sm font-semibold text-white text-theme-primary font-display">
                    Core Design Pillars
                  </h3>
                  <div className="space-y-3">
                    <div className="p-3.5 rounded-md bg-white/[0.02] bg-theme-card border border-white/[0.06] border-theme">
                      <span className="text-xs font-bold text-white text-theme-primary font-display block mb-1">
                        1. Anti-AI Slop Enforcement
                      </span>
                      <p className="text-xs text-slate-400 text-theme-secondary leading-relaxed">
                        Rejects monotonous 3-card repetition, AI beige palettes, italic serif displays, fake sparkles, and cliché copywriting.
                      </p>
                    </div>
                    <div className="p-3.5 rounded-md bg-white/[0.02] bg-theme-card border border-white/[0.06] border-theme">
                      <span className="text-xs font-bold text-white text-theme-primary font-display block mb-1">
                        2. Coordinated Swarm Topology
                      </span>
                      <p className="text-xs text-slate-400 text-theme-secondary leading-relaxed">
                        Decomposes prompts into parallel Directed Acyclic Graphs (DAGs), ensuring subagents collaborate without collisions.
                      </p>
                    </div>
                    <div className="p-3.5 rounded-md bg-white/[0.02] bg-theme-card border border-white/[0.06] border-theme">
                      <span className="text-xs font-bold text-white text-theme-primary font-display block mb-1">
                        3. Universal Portability
                      </span>
                      <p className="text-xs text-slate-400 text-theme-secondary leading-relaxed">
                        Ships static skill files into .agents/ that work identically across Cursor, Claude Code, Antigravity, and Gemini CLI.
                      </p>
                    </div>
                  </div>
                </div>
              </section>
            )}

            {/* ── TAB 2: Installation ────────────────────── */}
            {activeTab === 'installation' && (
              <section className="space-y-6">
                <div>
                  <div className="flex items-center gap-2 font-mono text-xs text-[#38bdf8] mb-2 uppercase tracking-wider">
                    <TerminalSquare className="w-3.5 h-3.5" />
                    <span>Quick Start</span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold font-display text-white text-theme-primary mb-3">
                    Installation & Setup
                  </h2>
                  <p className="text-sm text-slate-400 text-theme-secondary leading-relaxed">
                    Run the init command in any project root. PixelCrew will scan your codebase, detect your stack
                    (framework, ORM, test runner), and generate a <code className="text-slate-300 text-theme-primary bg-white/[0.06] bg-theme-subtle px-1.5 py-0.5 rounded text-xs">.pixel-crew/</code> configuration directory.
                  </p>
                </div>

                <CodeBlock code="npx pixelcrew init" />

                <div>
                  <h3 className="text-sm font-semibold text-white text-theme-primary mb-3 font-display">
                    Generated Directory Structure
                  </h3>
                  <CodeBlock
                    lang="text"
                    code={`your-project/
├── .pixel-crew/
│   ├── context.json        # Detected stack, ORM, framework, test runner
│   └── sprint.json         # Active DAG task graph (created on /assemble)
├── .agents/
│   ├── AGENTS.md           # Master agent instructions
│   └── skills/
│       ├── pixelcrew/SKILL.md
│       ├── anti-ai-patterns/SKILL.md
│       ├── frontend-engineering/SKILL.md
│       ├── backend-engineering/SKILL.md
│       ├── database-engineering/SKILL.md
│       ├── performance-engineering/SKILL.md
│       └── token-efficiency/SKILL.md
├── DESIGN.md               # Visual design specification
└── PRODUCT.md              # Product requirements document`}
                  />
                </div>

                <div className="pt-4 border-t border-white/[0.06] border-theme">
                  <h3 className="text-sm font-semibold text-white text-theme-primary mb-3 font-display">
                    System Requirements
                  </h3>
                  <ul className="space-y-2 text-sm text-slate-400 text-theme-secondary">
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-400 mt-0.5">•</span>
                      <span>Node.js ≥ 18 (required for npx CLI runner)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-400 mt-0.5">•</span>
                      <span>Any supported AI coding IDE or agent (Antigravity, Claude Code, Cursor, Gemini, Kiro, Codex, OpenCode, Grok, Hermes)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-400 mt-0.5">•</span>
                      <span>Zero runtime npm dependencies — ships as static markdown instructions</span>
                    </li>
                  </ul>
                </div>
              </section>
            )}

            {/* ── TAB 3: Commands ────────────────────── */}
            {activeTab === 'commands' && (
              <section className="space-y-6">
                <div>
                  <div className="flex items-center gap-2 font-mono text-xs text-[#a78bfa] mb-2 uppercase tracking-wider">
                    <Terminal className="w-3.5 h-3.5" />
                    <span>Slash Commands</span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold font-display text-white text-theme-primary mb-3">
                    23 Commands Reference
                  </h2>
                  <p className="text-sm text-slate-400 text-theme-secondary leading-relaxed">
                    PixelCrew provides 23 slash commands organized into four wings. Type any command into your AI IDE chat
                    to activate specialized agent personas and execution pipelines.
                  </p>
                </div>

                <div className="space-y-8 pt-2">
                  {Object.entries(COMMANDS).map(([category, cmds]) => (
                    <div key={category}>
                      <h3 className="text-sm font-semibold text-white text-theme-primary mb-3 font-display border-b border-white/[0.06] border-theme pb-2">
                        {category}
                      </h3>
                      <div className="space-y-2">
                        {cmds.map((c) => (
                          <div 
                            key={c.cmd} 
                            className="p-3 rounded-md bg-white/[0.02] bg-theme-card border border-white/[0.06] border-theme hover:border-white/[0.12] transition-colors"
                          >
                            <code className="text-xs font-mono text-[#a78bfa] font-bold block">{c.cmd}</code>
                            <p className="text-xs text-slate-400 text-theme-secondary mt-1.5 leading-relaxed">{c.desc}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* ── TAB 4: Agent Personas ────────────────────── */}
            {activeTab === 'agents' && (
              <section className="space-y-6">
                <div>
                  <div className="flex items-center gap-2 font-mono text-xs text-[#34d399] mb-2 uppercase tracking-wider">
                    <Layers className="w-3.5 h-3.5" />
                    <span>Specialized Roles</span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold font-display text-white text-theme-primary mb-3">
                    9 Agent Personas
                  </h2>
                  <p className="text-sm text-slate-400 text-theme-secondary leading-relaxed">
                    PixelCrew coordinates 9 specialized engineering roles. The Orchestrator automatically parses requirements,
                    constructs a dependency DAG, and assigns tasks to the matching persona.
                  </p>
                </div>

                <div className="space-y-3 pt-2">
                  {AGENTS.map((agent) => {
                    const AgentIcon = agent.icon;
                    return (
                      <div 
                        key={agent.name} 
                        className="flex gap-4 p-4 rounded-md bg-white/[0.02] bg-theme-card border border-white/[0.06] border-theme items-start"
                      >
                        <div 
                          className="w-9 h-9 rounded-md flex items-center justify-center shrink-0 border border-white/[0.08] border-theme bg-white/[0.04] bg-theme-subtle"
                          style={{ color: agent.color }}
                        >
                          <AgentIcon className="w-4.5 h-4.5" />
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-baseline gap-2 flex-wrap">
                            <span className="text-sm font-semibold text-white text-theme-primary">{agent.name}</span>
                            <span className="text-[11px] font-mono text-slate-500 text-theme-muted">{agent.role}</span>
                          </div>
                          <p className="text-xs text-slate-400 text-theme-secondary mt-1 leading-relaxed">{agent.desc}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>
            )}

            {/* ── TAB 5: Skills ────────────────────── */}
            {activeTab === 'skills' && (
              <section className="space-y-6">
                <div>
                  <div className="flex items-center gap-2 font-mono text-xs text-[#fbbf24] mb-2 uppercase tracking-wider">
                    <Boxes className="w-3.5 h-3.5" />
                    <span>Modular Capabilities</span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold font-display text-white text-theme-primary mb-3">
                    Skills Architecture
                  </h2>
                  <p className="text-sm text-slate-400 text-theme-secondary leading-relaxed">
                    Skills are structured markdown files (<code className="text-slate-300 text-theme-primary bg-white/[0.06] bg-theme-subtle px-1.5 py-0.5 rounded text-xs">SKILL.md</code>)
                    defining domain-specific engineering workflows and design guardrails.
                  </p>
                </div>

                <div className="overflow-x-auto rounded-md border border-white/[0.06] border-theme">
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="border-b border-white/[0.08] border-theme bg-white/[0.02] bg-theme-subtle">
                        <th className="text-left py-2.5 px-4 text-slate-400 text-theme-muted font-mono font-normal">Skill</th>
                        <th className="text-left py-2.5 px-4 text-slate-400 text-theme-muted font-mono font-normal">Domain</th>
                        <th className="text-left py-2.5 px-4 text-slate-400 text-theme-muted font-mono font-normal">Trigger</th>
                      </tr>
                    </thead>
                    <tbody className="text-slate-300 text-theme-secondary divide-y divide-white/[0.04]">
                      <tr><td className="py-2.5 px-4 font-medium text-white text-theme-primary">anti-ai-patterns</td><td className="py-2.5 px-4">Frontend & UX</td><td className="py-2.5 px-4 font-mono text-[#a78bfa]">/pixelcrew render</td></tr>
                      <tr><td className="py-2.5 px-4 font-medium text-white text-theme-primary">frontend-engineering</td><td className="py-2.5 px-4">Frontend & UX</td><td className="py-2.5 px-4 font-mono text-[#a78bfa]">/pixelcrew craft</td></tr>
                      <tr><td className="py-2.5 px-4 font-medium text-white text-theme-primary">design-director</td><td className="py-2.5 px-4">Frontend & UX</td><td className="py-2.5 px-4 font-mono text-[#a78bfa]">/pixelcrew chromatic</td></tr>
                      <tr><td className="py-2.5 px-4 font-medium text-white text-theme-primary">backend-engineering</td><td className="py-2.5 px-4">Backend & APIs</td><td className="py-2.5 px-4 font-mono text-[#a78bfa]">/pixelcrew sentinel</td></tr>
                      <tr><td className="py-2.5 px-4 font-medium text-white text-theme-primary">database-engineering</td><td className="py-2.5 px-4">Database & Data</td><td className="py-2.5 px-4 font-mono text-[#a78bfa]">/pixelcrew retrofit</td></tr>
                      <tr><td className="py-2.5 px-4 font-medium text-white text-theme-primary">codebase-intelligence</td><td className="py-2.5 px-4">Orchestration</td><td className="py-2.5 px-4 font-mono text-[#a78bfa]">/pixelcrew init</td></tr>
                      <tr><td className="py-2.5 px-4 font-medium text-white text-theme-primary">performance-engineering</td><td className="py-2.5 px-4">Performance & SRE</td><td className="py-2.5 px-4 font-mono text-[#a78bfa]">/pixelcrew warp</td></tr>
                      <tr><td className="py-2.5 px-4 font-medium text-white text-theme-primary">token-efficiency</td><td className="py-2.5 px-4">Orchestration</td><td className="py-2.5 px-4 font-mono text-[#a78bfa]">npx pixelcrew sync</td></tr>
                    </tbody>
                  </table>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-white text-theme-primary mb-3 font-display">
                    Creating a Custom Skill
                  </h3>
                  <CodeBlock
                    lang="markdown"
                    code={`---
name: my-custom-skill
description: Automated workflow for domain-specific tasks
---

# My Custom Skill

## Trigger Conditions
Define when this skill should be automatically loaded by agents.

## Step-by-Step Instructions
1. Inspect active schemas and dependencies.
2. Formulate DAG subtasks.
3. Validate output against test suites.`}
                  />
                </div>
              </section>
            )}

            {/* ── TAB 6: IDE Setup ────────────────────── */}
            {activeTab === 'ide-setup' && (
              <section className="space-y-6">
                <div>
                  <div className="flex items-center gap-2 font-mono text-xs text-[#38bdf8] mb-2 uppercase tracking-wider">
                    <Cpu className="w-3.5 h-3.5" />
                    <span>Harness Support</span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold font-display text-white text-theme-primary mb-3">
                    IDE Setup & Integration
                  </h2>
                  <p className="text-sm text-slate-400 text-theme-secondary leading-relaxed">
                    PixelCrew is model and harness agnostic. Run <code className="text-slate-300 text-theme-primary bg-white/[0.06] bg-theme-subtle px-1.5 py-0.5 rounded text-xs">npx pixelcrew init</code> once
                    and the necessary configuration files will be linked across your development environments.
                  </p>
                </div>

                <div className="space-y-2.5 pt-2">
                  {IDE_CONFIGS.map((ide) => {
                    const IconComponent = ide.icon;
                    return (
                      <div key={ide.name} className="p-4 rounded-md bg-white/[0.02] bg-theme-card border border-white/[0.06] border-theme flex items-start gap-4">
                        <div className="mt-0.5 text-slate-300 text-theme-primary shrink-0">
                          <IconComponent className="w-5 h-5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-baseline gap-3 flex-wrap">
                            <span className="text-sm font-semibold text-white text-theme-primary">{ide.name}</span>
                            <code className="text-[11px] font-mono text-[#38bdf8]">{ide.dir}{ide.file}</code>
                          </div>
                          <p className="text-xs text-slate-400 text-theme-secondary mt-1.5 leading-relaxed">{ide.desc}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>
            )}

            {/* ── TAB 7: Architecture ────────────────────── */}
            {activeTab === 'architecture' && (
              <section className="space-y-6">
                <div>
                  <div className="flex items-center gap-2 font-mono text-xs text-[#a78bfa] mb-2 uppercase tracking-wider">
                    <Layers className="w-3.5 h-3.5" />
                    <span>System Design</span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold font-display text-white text-theme-primary mb-3">
                    Swarm Architecture
                  </h2>
                  <p className="text-sm text-slate-400 text-theme-secondary leading-relaxed">
                    PixelCrew uses a prompt-driven orchestration model. There is no daemon process, no background
                    server, and no npm runtime dependency. The entire system is encoded as markdown skill files
                    that AI coding agents read and execute.
                  </p>
                </div>

                <div className="space-y-3 pt-2">
                  {[
                    { step: '01', title: 'Context Profiling', desc: 'npx pixelcrew init inspects your framework, ORM, and test runner, generating a tailored context.json profile.' },
                    { step: '02', title: 'Command Parsing', desc: 'You trigger a command (e.g. /pixelcrew assemble "Build SaaS auth with Supabase").' },
                    { step: '03', title: 'DAG Task Compilation', desc: 'The Orchestrator breaks the prompt into parallel task nodes with zero circular dependencies.' },
                    { step: '04', title: 'Persona Assignment', desc: 'Each task node is dispatched to the corresponding agent role with scoped skills.' },
                    { step: '05', title: 'Synthesis & Execution', desc: 'Agents generate production code, inject security envelopes, and optimize bundle footprint.' },
                    { step: '06', title: 'Anti-AI Quality Gate', desc: 'The QA Critic verifies the Anti-AI rubric score (≥ 8.5/10) and ensures test suites pass.' },
                  ].map((s) => (
                    <div key={s.step} className="flex gap-4 p-3.5 rounded-md bg-white/[0.02] bg-theme-card border border-white/[0.06] border-theme items-start">
                      <span className="font-mono text-xs text-[#f59e0b] font-bold mt-0.5">{s.step}</span>
                      <div>
                        <h4 className="text-xs font-bold text-white text-theme-primary font-display">{s.title}</h4>
                        <p className="text-xs text-slate-400 text-theme-secondary mt-0.5 leading-relaxed">{s.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* ── TAB 8: Configuration ────────────────────── */}
            {activeTab === 'configuration' && (
              <section className="space-y-6">
                <div>
                  <div className="flex items-center gap-2 font-mono text-xs text-[#34d399] mb-2 uppercase tracking-wider">
                    <Hash className="w-3.5 h-3.5" />
                    <span>Context & Tuning</span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold font-display text-white text-theme-primary mb-3">
                    Configuration (.pixel-crew/context.json)
                  </h2>
                  <p className="text-sm text-slate-400 text-theme-secondary leading-relaxed">
                    After init, PixelCrew generates <code className="text-slate-300 text-theme-primary bg-white/[0.06] bg-theme-subtle px-1.5 py-0.5 rounded text-xs">.pixel-crew/context.json</code>.
                    You can override detected settings or disable specific agents to conserve token budget.
                  </p>
                </div>

                <CodeBlock
                  lang="json"
                  code={`{
  "project": "my-app",
  "framework": "next",
  "frameworkVersion": "16.3",
  "language": "typescript",
  "orm": "prisma",
  "database": "postgresql",
  "testRunner": "vitest",
  "styling": "tailwindcss-v4",
  "packageManager": "npm",
  "agents": {
    "orchestrator": true,
    "creativeDirector": true,
    "frontend": true,
    "backend": true,
    "database": false,
    "security": true,
    "performance": true,
    "qa": true,
    "motion": true
  }
}`}
                />
              </section>
            )}

            {/* ── TAB 9: Anti-AI Rubric ────────────────────── */}
            {activeTab === 'anti-ai-rubric' && (
              <section className="space-y-6">
                <div>
                  <div className="flex items-center gap-2 font-mono text-xs text-[#ef4444] mb-2 uppercase tracking-wider">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Design Quality Gates</span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold font-display text-white text-theme-primary mb-3">
                    Anti-AI Design Rubric
                  </h2>
                  <p className="text-sm text-slate-400 text-theme-secondary leading-relaxed">
                    PixelCrew enforces a 6-dimension scoring rubric on all visual output. The minimum passing
                    threshold is 8.5/10.0. Any generated interface falling below is flagged and rewritten.
                  </p>
                </div>

                <div className="overflow-x-auto rounded-md border border-white/[0.06] border-theme mb-6">
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="border-b border-white/[0.08] border-theme bg-white/[0.02] bg-theme-subtle">
                        <th className="text-left py-2.5 px-4 text-slate-400 text-theme-muted font-mono font-normal">Dimension</th>
                        <th className="text-left py-2.5 px-4 text-slate-400 text-theme-muted font-mono font-normal">Measurement</th>
                        <th className="text-left py-2.5 px-4 text-slate-400 text-theme-muted font-mono font-normal">Weight</th>
                      </tr>
                    </thead>
                    <tbody className="text-slate-300 text-theme-secondary divide-y divide-white/[0.04]">
                      <tr><td className="py-2 px-4 text-white text-theme-primary font-medium">Originality</td><td className="py-2 px-4">Unique visual signature, rejecting default templates</td><td className="py-2 px-4 font-mono">20%</td></tr>
                      <tr><td className="py-2 px-4 text-white text-theme-primary font-medium">Hierarchy</td><td className="py-2 px-4">Clear focal path and intentional scale balance</td><td className="py-2 px-4 font-mono">20%</td></tr>
                      <tr><td className="py-2 px-4 text-white text-theme-primary font-medium">Typography</td><td className="py-2 px-4">Mathematical fluid clamp() type scales</td><td className="py-2 px-4 font-mono">15%</td></tr>
                      <tr><td className="py-2 px-4 text-white text-theme-primary font-medium">Layout</td><td className="py-2 px-4">Asymmetric Bento rhythms; no 3-card monoculture</td><td className="py-2 px-4 font-mono">15%</td></tr>
                      <tr><td className="py-2 px-4 text-white text-theme-primary font-medium">Brand</td><td className="py-2 px-4">Tailored HSL palette and dark/light elevation</td><td className="py-2 px-4 font-mono">15%</td></tr>
                      <tr><td className="py-2 px-4 text-white text-theme-primary font-medium">Slop Penalty</td><td className="py-2 px-4">Strips beige backgrounds, fake sparkles, cliché copy</td><td className="py-2 px-4 font-mono">15%</td></tr>
                    </tbody>
                  </table>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-white text-theme-primary mb-3 font-display">
                    Patterns Flagged & Rejected
                  </h3>
                  <ul className="space-y-2 text-sm text-slate-400 text-theme-secondary">
                    <li className="flex items-start gap-2.5">
                      <XCircle className="w-3.5 h-3.5 text-rose-500 shrink-0 mt-0.5" />
                      <span>AI beige backgrounds with italic serif display headlines</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <XCircle className="w-3.5 h-3.5 text-rose-500 shrink-0 mt-0.5" />
                      <span>Monotonous identical 3-card grids with 16px uniform radius</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <XCircle className="w-3.5 h-3.5 text-rose-500 shrink-0 mt-0.5" />
                      <span>Decorative purple & cyan blurry radiant mesh blobs</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <XCircle className="w-3.5 h-3.5 text-rose-500 shrink-0 mt-0.5" />
                      <span>Status-chip soup (excessive decorative colored pill badges)</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <XCircle className="w-3.5 h-3.5 text-rose-500 shrink-0 mt-0.5" />
                      <span>Cards nested arbitrarily inside other cards</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <XCircle className="w-3.5 h-3.5 text-rose-500 shrink-0 mt-0.5" />
                      <span>Marketing clichés: &ldquo;Revolutionize your workflow&rdquo;, &ldquo;Unlock 10x potential&rdquo;</span>
                    </li>
                  </ul>
                </div>
              </section>
            )}

            {/* ── TAB 10: FAQ ────────────────────── */}
            {activeTab === 'faq' && (
              <section className="space-y-6">
                <div>
                  <div className="flex items-center gap-2 font-mono text-xs text-[#a78bfa] mb-2 uppercase tracking-wider">
                    <HelpCircle className="w-3.5 h-3.5" />
                    <span>Frequently Asked Questions</span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold font-display text-white text-theme-primary mb-3">
                    FAQ & Common Questions
                  </h2>
                  <p className="text-sm text-slate-400 text-theme-secondary leading-relaxed">
                    Answers to common questions regarding local IDE setup, token consumption, and customization.
                  </p>
                </div>

                <div className="space-y-3 pt-2">
                  {FAQ_ITEMS.map((item, idx) => {
                    const isOpen = !!openFaq[idx];
                    return (
                      <div
                        key={item.q}
                        className="rounded-lg bg-white/[0.02] bg-theme-card border border-white/[0.06] border-theme transition-colors overflow-hidden"
                      >
                        <button
                          type="button"
                          onClick={() => toggleFaq(idx)}
                          className="w-full px-5 py-4 flex items-center justify-between text-left hover:bg-white/[0.02] transition-colors"
                          aria-expanded={isOpen}
                        >
                          <span className="text-sm font-semibold text-white text-theme-primary font-display pr-4">
                            {item.q}
                          </span>
                          <ChevronDown 
                            className={`w-4 h-4 text-slate-400 text-theme-muted transition-transform duration-200 shrink-0 ${
                              isOpen ? 'rotate-180 text-[#a78bfa]' : ''
                            }`} 
                          />
                        </button>

                        {isOpen && (
                          <div className="px-5 pb-4 pt-1 border-t border-white/[0.04] border-theme">
                            <p className="text-xs sm:text-sm text-slate-400 text-theme-secondary leading-relaxed">
                              {item.a}
                            </p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </section>
            )}

            {/* Previous & Next Tab Navigation Buttons */}
            <div className="mt-14 pt-6 border-t border-white/[0.06] border-theme flex items-center justify-between gap-4">
              {prevTab ? (
                <button
                  type="button"
                  onClick={() => selectTab(prevTab.id)}
                  className="flex items-center gap-2 px-3.5 py-2 rounded-md bg-white/[0.04] bg-theme-card border border-white/[0.08] border-theme text-xs font-medium text-slate-300 text-theme-primary hover:bg-white/[0.08] transition-all group"
                >
                  <ArrowLeft className="w-3.5 h-3.5 text-slate-500 group-hover:text-white transition-colors" />
                  <div className="text-left">
                    <span className="text-[10px] text-slate-500 text-theme-muted block font-mono">Previous</span>
                    <span>{prevTab.label}</span>
                  </div>
                </button>
              ) : <div />}

              {nextTab ? (
                <button
                  type="button"
                  onClick={() => selectTab(nextTab.id)}
                  className="flex items-center gap-2 px-3.5 py-2 rounded-md bg-white/[0.04] bg-theme-card border border-white/[0.08] border-theme text-xs font-medium text-slate-300 text-theme-primary hover:bg-white/[0.08] transition-all group text-right"
                >
                  <div className="text-right">
                    <span className="text-[10px] text-slate-500 text-theme-muted block font-mono">Next</span>
                    <span>{nextTab.label}</span>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-white transition-colors" />
                </button>
              ) : <div />}
            </div>

            {/* Bottom spacer */}
            <div className="h-16" />

          </main>
        </div>
      </div>
    </div>
  );
}
