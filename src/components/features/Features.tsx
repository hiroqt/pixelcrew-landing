'use client';

import { useState, useEffect, useRef } from 'react';
import { 
  Layers, 
  ShieldCheck, 
  GitBranch, 
  Cpu, 
  Play, 
  Terminal, 
  CheckCircle2, 
  ArrowRight,
  Code2,
  Lock,
  Zap,
  Activity,
  Check
} from 'lucide-react';
import Link from 'next/link';
import { playChiptuneSound } from '@/lib/pixelcrew';

interface PipelineStep {
  stepNumber: string;
  name: string;
  role: string;
  persona: string;
  command: string;
  accentColor: string;
  scopeSummary: string;
  detailedSpecs: string[];
  terminalLogs: string[];
  outputArtifact: string;
  metrics: {
    label1: string;
    val1: string;
    label2: string;
    val2: string;
  };
}

const PIPELINE_STEPS: PipelineStep[] = [
  {
    stepNumber: '01',
    name: 'SPRINT BLUEPRINT',
    role: 'Decomposition & Task Topology',
    persona: 'Lead Orchestrator + UX Planner',
    command: '/blueprint',
    accentColor: '#38bdf8',
    scopeSummary: 'Decomposes user brief into a Directed Acyclic Graph (DAG), mapping UI routes, data models, and subagent assignments with zero circular deadlocks.',
    detailedSpecs: [
      'AST topology analyzer extracts existing project frameworks and ORM targets',
      'Wireframes 3-stage asymmetric onboarding layout with zero horizontal overflow',
      'Compiles Directed Acyclic Graph: uxPlanner -> frontendBuilder -> securitySentinel'
    ],
    terminalLogs: [
      '[BLUEPRINT] Ingested user brief: "Multi-tenant SaaS dashboard with Supabase RLS".',
      '[DAG COMPILER] 5 execution nodes scheduled. 0 circular deadlocks found.',
      '[ORCHESTRATION] Assigning database schema to WS-02 and UI components to WS-03.',
      '✓ Architectural blueprint compiled in DESIGN.md.'
    ],
    outputArtifact: 'DESIGN.md + Directed Acyclic Graph Task Nodes',
    metrics: {
      label1: 'DAG Nodes',
      val1: '5 Nodes',
      label2: 'Compilation',
      val2: '1.2s'
    }
  },
  {
    stepNumber: '02',
    name: 'DATA & RLS ISOLATION',
    role: 'Schema & Row-Level Security',
    persona: 'Database Architect',
    command: '/assemble',
    accentColor: '#a78bfa',
    scopeSummary: 'Generates type-safe relational schemas with strict Row-Level Security (RLS) policies, preventing unauthorized tenant data cross-leakage.',
    detailedSpecs: [
      'Compiles primary key architecture using UUIDv7 timestamps for index locality',
      'Configures multi-tenant Row-Level Security policies with automated tenant_isolation_audit',
      'Optimizes composite B-Tree indexes and covering indexes for sub-10ms queries'
    ],
    terminalLogs: [
      '[SCHEMA] Compiling Drizzle/Prisma schema with UUIDv7 primary keys.',
      '[RLS] Applying multi-tenant isolation policy: auth.uid() = tenant_id.',
      '[INDEX] Generated covering index on (tenant_id, created_at DESC).',
      '✓ Database isolation verified. Zero cross-tenant data leaks.'
    ],
    outputArtifact: 'src/db/schema.ts + RLS Migration Policies',
    metrics: {
      label1: 'RLS Policies',
      val1: 'Enforced',
      label2: 'Query Latency',
      val2: '< 10ms'
    }
  },
  {
    stepNumber: '03',
    name: 'FRONTEND & BENTO',
    role: 'Asymmetric UI & Fluid Types',
    persona: 'Frontend Builder',
    command: '/bento',
    accentColor: '#38bdf8',
    scopeSummary: 'Constructs responsive UI components adhering to the anti-AI design system: mathematical fluid clamp() scales and zero 3-card repetition.',
    detailedSpecs: [
      'Restructures uniform card grids into dynamic 12-column Asymmetric Bento layouts',
      'Applies mathematical fluid typography: clamp(1.125rem, 0.9rem + 1.2vw, 1.875rem)',
      'Verifies WCAG 2.1 AA/AAA contrast ratios across both Dark and Light elevation surfaces'
    ],
    terminalLogs: [
      '[FRONTEND] Building asymmetric Bento layout: 7-col hero span + 5-col KPI metric.',
      '[TYPOGRAPHY] Injected mathematical fluid clamp() typography with -0.02em tracking.',
      '[ACCESSIBILITY] Calculating contrast ratios: 14.2:1 against light and dark surfaces.',
      '✓ Production Next.js 15 client components compiled.'
    ],
    outputArtifact: 'src/components/ui/ + Centralized CSS Tokens',
    metrics: {
      label1: 'Type Scaling',
      val1: 'clamp()',
      label2: 'WCAG Standard',
      val2: 'AA / AAA'
    }
  },
  {
    stepNumber: '04',
    name: 'SECURITY SENTINEL',
    role: 'OWASP Defense & RFC 7807',
    persona: 'Security Sentinel',
    command: '/sentinel',
    accentColor: '#34d399',
    scopeSummary: 'Scans all route handlers for OWASP vulnerabilities, parameterizes SQL operations, and wraps all API responses in RFC 7807 error envelopes.',
    detailedSpecs: [
      'Eliminates raw string SQL concatenation with parameterized query compilers',
      'Implements sliding window token bucket rate limiting (100 req/min per IP)',
      'Enforces standard RFC 7807 problem details error envelopes for 4xx and 5xx responses'
    ],
    terminalLogs: [
      '[SENTINEL] Running OWASP Top 10 security scan on route handlers.',
      '[SQL INJECTION] Parameterized database queries verified. 0 raw concatenations.',
      '[ENVELOPES] RFC 7807 Problem Details envelopes configured for all error routes.',
      '✓ Zero critical vulnerabilities. Production defense verified.'
    ],
    outputArtifact: 'src/lib/security.ts + RFC 7807 Error Handlers',
    metrics: {
      label1: 'OWASP Scan',
      val1: 'Passed',
      label2: 'RFC 7807',
      val2: 'Standard'
    }
  },
  {
    stepNumber: '05',
    name: 'PLAYWRIGHT VERIFY',
    role: 'E2E & Hydration Assertion',
    persona: 'QA Critic & SRE',
    command: '/audit',
    accentColor: '#f59e0b',
    scopeSummary: 'Executes headless browser test suites, verifying that hydration states, keyboard accessibility, and user journeys pass with zero regressions.',
    detailedSpecs: [
      'Executes synthetic SSR hydration verification test: 0 console errors or DOM mismatches',
      'Validates keyboard navigation, ARIA attributes, and WCAG AA color contrast ratios',
      'Runs 18 automated Playwright end-to-end simulated user journeys'
    ],
    terminalLogs: [
      '[QA] Launching headless browser test suite across 5 breakpoints.',
      '[HYDRATION] Synthetic SSR hydration verification: 100% parity confirmed.',
      '[JOURNEYS] 18 Playwright end-to-end user journeys executed: 18/18 passed.',
      '✓ All quality gates cleared. Code ready for production PR.'
    ],
    outputArtifact: 'e2e/sprint.spec.ts + Playwright Test Artifacts',
    metrics: {
      label1: 'E2E Journeys',
      val1: '18 / 18',
      label2: 'Hydration',
      val2: '0 Errors'
    }
  }
];

export function Features() {
  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [simulatedLogs, setSimulatedLogs] = useState<string[]>(PIPELINE_STEPS[0].terminalLogs);
  const simTimerRef = useRef<NodeJS.Timeout | null>(null);

  const current = PIPELINE_STEPS[activeStepIndex];

  const handleNextStep = () => {
    if (simTimerRef.current) clearInterval(simTimerRef.current);
    setIsSimulating(false);
    const next = (activeStepIndex + 1) % PIPELINE_STEPS.length;
    setActiveStepIndex(next);
    setSimulatedLogs(PIPELINE_STEPS[next].terminalLogs);
    playChiptuneSound('select');
  };

  const handleStepSelect = (idx: number) => {
    if (simTimerRef.current) clearInterval(simTimerRef.current);
    setIsSimulating(false);
    setActiveStepIndex(idx);
    setSimulatedLogs(PIPELINE_STEPS[idx].terminalLogs);
    playChiptuneSound('click');
  };

  const handleSimulate = () => {
    if (simTimerRef.current) clearInterval(simTimerRef.current);
    setIsSimulating(true);
    setSimulatedLogs([]);
    playChiptuneSound('assemble');

    let idx = 0;
    const logs = current.terminalLogs;

    simTimerRef.current = setInterval(() => {
      idx++;
      setSimulatedLogs(logs.slice(0, idx));
      playChiptuneSound('blip');
      if (idx >= logs.length) {
        if (simTimerRef.current) clearInterval(simTimerRef.current);
        setIsSimulating(false);
        playChiptuneSound('success');
      }
    }, 130);
  };

  useEffect(() => {
    return () => {
      if (simTimerRef.current) clearInterval(simTimerRef.current);
    };
  }, []);

  return (
    <section id="features" className="py-20 sm:py-24 border-t border-white/[0.06] border-theme relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12 space-y-3">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-display tracking-tight text-white text-theme-primary uppercase">
            Engineered For Production
          </h2>
          <p className="text-sm sm:text-base text-slate-300 text-theme-secondary leading-relaxed max-w-2xl mx-auto font-sans">
            PixelCrew coordinates 9 specialized engineering workstations across Directed Acyclic Graphs, 
            enforcing strict anti-AI quality standards with zero runtime dependencies.
          </p>
        </div>

        {/* ── STAGE 1: Interactive 5-Stage Swarm Pipeline DAG ── */}
        <div className="mb-6">
          <div className="flex items-center justify-between pb-3 border-b border-white/[0.06] border-theme">
            <span className="font-mono text-xs text-slate-400 text-theme-muted uppercase tracking-wider font-semibold">
              Autonomous Swarm Pipeline DAG
            </span>
            <span className="font-mono text-xs text-[#38bdf8]">
              Step {current.stepNumber} of 05
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 pt-3">
            {PIPELINE_STEPS.map((step, idx) => {
              const isCurrent = idx === activeStepIndex;
              return (
                <button
                  key={step.name}
                  type="button"
                  onClick={() => handleStepSelect(idx)}
                  className={`p-3 rounded-lg border text-left transition-all cursor-pointer flex flex-col gap-1 ${
                    isCurrent
                      ? 'bg-white/[0.08] bg-theme-card border-[#38bdf8] shadow-lg shadow-[#38bdf8]/10'
                      : 'bg-white/[0.02] bg-theme-card border-white/[0.06] border-theme hover:border-white/[0.15] opacity-75 hover:opacity-100'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className={`font-pixel text-[9px] ${isCurrent ? 'text-[#38bdf8]' : 'text-slate-400 text-theme-muted'}`}>
                      {step.stepNumber}
                    </span>
                    <span 
                      className="font-mono text-[9px] font-bold"
                      style={{ color: step.accentColor }}
                    >
                      {step.command}
                    </span>
                  </div>
                  <div className={`font-mono text-xs font-bold truncate ${isCurrent ? 'text-white text-theme-primary' : 'text-slate-300 text-theme-secondary'}`}>
                    {step.name}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* ── STAGE 2: Active Station Blueprint Console ── */}
        <div className="rounded-xl bg-white/[0.02] bg-theme-card border border-white/[0.08] border-theme p-6 sm:p-8 space-y-6 shadow-xl">
          
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/[0.06] border-theme">
            <div>
              <div className="flex items-center gap-2 font-mono text-xs">
                <span className="font-pixel text-[10px] text-[#38bdf8] uppercase">
                  STAGE {current.stepNumber} // {current.name}
                </span>
                <span className="text-slate-500 text-theme-muted">•</span>
                <span className="text-slate-400 text-theme-muted">
                  Persona: <span className="text-white font-bold">{current.persona}</span>
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold font-display text-white text-theme-primary mt-1">
                {current.role}
              </h3>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={handleSimulate}
                disabled={isSimulating}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#38bdf8] text-[#07080c] font-pixel text-[9px] uppercase font-bold hover:bg-[#7dd3fc] transition-all cursor-pointer disabled:opacity-60 shadow-md shadow-[#38bdf8]/15"
              >
                <Play className={`w-3 h-3 fill-current ${isSimulating ? 'animate-pulse' : ''}`} />
                <span>{isSimulating ? 'Running...' : 'Simulate'}</span>
              </button>
              <button
                type="button"
                onClick={handleNextStep}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded bg-white/[0.06] hover:bg-white/[0.1] text-white text-theme-primary font-mono text-xs border border-white/[0.08] transition-colors cursor-pointer"
              >
                <span>Next Stage</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Body Split */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Left Blueprint Details (8 cols) */}
            <div className="lg:col-span-8 space-y-4">
              <p className="text-sm text-slate-300 text-theme-secondary leading-relaxed font-sans">
                {current.scopeSummary}
              </p>

              {/* Execution Checklist */}
              <ul className="space-y-2 pt-1">
                {current.detailedSpecs.map((spec, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-300 text-theme-secondary leading-relaxed font-sans">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{spec}</span>
                  </li>
                ))}
              </ul>

              {/* Live Terminal Log */}
              <div className="rounded-lg bg-[#07080c] code-theme border border-white/[0.08] border-theme p-4 font-mono text-xs space-y-1.5 overflow-x-auto min-h-[140px]">
                <div className="text-[10px] text-slate-400 text-theme-muted uppercase mb-2 flex items-center justify-between">
                  <span>Stage Execution Output</span>
                  <span className={isSimulating ? 'text-[#38bdf8] font-bold animate-pulse' : 'text-emerald-400'}>
                    {isSimulating ? '● EXECUTING STAGE...' : 'STATUS: PASSED'}
                  </span>
                </div>
                {simulatedLogs.map((log, idx) => (
                  <div key={idx} className={`leading-relaxed ${log.includes('✓') ? 'text-emerald-300' : 'text-slate-300'}`}>
                    {log}
                  </div>
                ))}
                {isSimulating && (
                  <div className="flex items-center gap-1.5 text-[#38bdf8] pt-1">
                    <span className="w-1.5 h-3 bg-[#38bdf8] animate-pulse inline-block" />
                    <span className="text-[10px]">Processing stage consensus...</span>
                  </div>
                )}
              </div>
            </div>

            {/* Right Telemetry Column (4 cols) */}
            <div className="lg:col-span-4 space-y-4 flex flex-col justify-between">
              
              {/* Telemetry Cards */}
              <div className="space-y-3">
                <div className="p-3.5 rounded-lg bg-black/40 border border-white/[0.06] border-theme space-y-1 font-mono">
                  <div className="text-[10px] text-slate-400 text-theme-muted uppercase">{current.metrics.label1}</div>
                  <div className="text-lg font-bold text-[#38bdf8]">{current.metrics.val1}</div>
                </div>

                <div className="p-3.5 rounded-lg bg-black/40 border border-white/[0.06] border-theme space-y-1 font-mono">
                  <div className="text-[10px] text-slate-400 text-theme-muted uppercase">{current.metrics.label2}</div>
                  <div className="text-lg font-bold text-emerald-400">{current.metrics.val2}</div>
                </div>

                <div className="p-3.5 rounded-lg bg-black/40 border border-white/[0.06] border-theme space-y-1 font-mono">
                  <div className="text-[10px] text-slate-400 text-theme-muted uppercase">Target Output Artifact</div>
                  <div className="text-xs font-semibold text-white text-theme-primary leading-tight mt-1">
                    {current.outputArtifact}
                  </div>
                </div>
              </div>

              {/* Static Skills Architecture Badge */}
              <div className="p-3.5 rounded-lg bg-[#38bdf8]/5 border border-[#38bdf8]/20 font-mono text-xs space-y-1 text-slate-300 text-theme-secondary">
                <div className="text-[10px] text-[#38bdf8] font-bold uppercase">Zero Runtime Footprint</div>
                <div className="text-[11px] text-slate-400 text-theme-muted">
                  Lives purely in .agents/ markdown skills. Zero npm packages installed.
                </div>
              </div>

            </div>

          </div>

        </div>

        {/* ── STAGE 3: Three Architectural Pillars ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <div className="p-5 rounded-lg bg-white/[0.02] bg-theme-card border border-white/[0.06] border-theme space-y-2">
            <div className="w-8 h-8 rounded bg-[#38bdf8]/10 border border-[#38bdf8]/20 flex items-center justify-center text-[#38bdf8]">
              <Cpu className="w-4 h-4" />
            </div>
            <h4 className="text-sm font-bold font-display text-white text-theme-primary">
              Zero Runtime Overhead
            </h4>
            <p className="text-xs text-slate-400 text-theme-secondary leading-relaxed">
              No npm dependencies, zero bundle weight, and zero security attack vectors. Runs purely inside IDE context.
            </p>
          </div>

          <div className="p-5 rounded-lg bg-white/[0.02] bg-theme-card border border-white/[0.06] border-theme space-y-2">
            <div className="w-8 h-8 rounded bg-[#a78bfa]/10 border border-[#a78bfa]/20 flex items-center justify-center text-[#a78bfa]">
              <Zap className="w-4 h-4" />
            </div>
            <h4 className="text-sm font-bold font-display text-white text-theme-primary">
              AST Prompt Caching
            </h4>
            <p className="text-xs text-slate-400 text-theme-secondary leading-relaxed">
              AST symbol-graph extraction reduces LLM token consumption by up to ~73.4%, eliminating memory churn.
            </p>
          </div>

          <div className="p-5 rounded-lg bg-white/[0.02] bg-theme-card border border-white/[0.06] border-theme space-y-2">
            <div className="w-8 h-8 rounded bg-[#34d399]/10 border border-[#34d399]/20 flex items-center justify-center text-[#34d399]">
              <GitBranch className="w-4 h-4" />
            </div>
            <h4 className="text-sm font-bold font-display text-white text-theme-primary">
              Multi-IDE Universal Protocol
            </h4>
            <p className="text-xs text-slate-400 text-theme-secondary leading-relaxed">
              Instant drop-in support across Claude Code, Cursor, Antigravity, Gemini CLI, Kiro, Codex, and OpenCode.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
