'use client';

import { useState } from 'react';
import { 
  AlertTriangle, 
  ShieldCheck, 
  X, 
  Check, 
  RefreshCw,
  Terminal,
  Activity,
  Layers,
  ArrowRight
} from 'lucide-react';
import { playChiptuneSound } from '@/lib/pixelcrew';

interface IncidentCase {
  id: string;
  step: string;
  category: string;
  title: string;
  summary: string;
  problem: {
    status: string;
    score: string;
    errorHeader: string;
    errorMessage: string;
    codeSnippet: string;
    slopTags: string[];
  };
  solution: {
    status: string;
    score: string;
    persona: string;
    resolution: string;
    codeSnippet: string;
    testAssertion: string;
    craftTags: string[];
  };
}

const INCIDENTS: IncidentCase[] = [
  {
    id: 'hydration',
    step: '01',
    category: 'REACT 19 // SSR',
    title: 'SSR Hydration Crash vs. Deterministic Boundary',
    summary: 'Single-prompt models render non-deterministic timestamps directly inside server components, causing catastrophic client hydration mismatch crashes.',
    problem: {
      status: 'CRITICAL FAILURE',
      score: '3.4 / 10.0',
      errorHeader: 'REACT DOM EXCEPTION // HYDRATION MISMATCH',
      errorMessage: 'Error: Text content does not match server-rendered HTML. Server: "1725324000" !== Client: "1725324001"',
      codeSnippet: `// ⚠️ UNCHECKED RAW LLM OUTPUT
export default function SessionView() {
  // Non-deterministic execution inside SSR tree
  const seed = Date.now() + Math.random();
  return <div id={seed}>User Session</div>;
}`,
      slopTags: ['Hydration Crash', 'Client/Server Drift', 'Broken React DOM']
    },
    solution: {
      status: 'PRODUCTION VERIFIED',
      score: '9.9 / 10.0',
      persona: 'Lead Orchestrator + SRE Sentinel',
      resolution: 'Strict deterministic hydration boundaries with Playwright synthetic SSR regression verification.',
      codeSnippet: `// ✓ PIXELCREW SWARM SPECIFICATION
export const dynamic = 'force-static';

export function SessionView({ token }: { token: string }) {
  // Pure deterministic rendering with guaranteed SSR parity
  return <div id={token} className="font-mono text-xs">Verified</div>;
}`,
      testAssertion: 'Playwright synthetic SSR test: 12/12 routes verified with 0 hydration warnings.',
      craftTags: ['100% Deterministic', 'Zero Hydration Crash', 'Playwright Verified']
    }
  },
  {
    id: 'cliche',
    step: '02',
    category: 'AESTHETIC // ANTI-AI',
    title: 'Generic AI Purple Blur vs. Asymmetric Bento Grid',
    summary: 'Standard AI models output monotonous 3-column cards, arbitrary cards-in-cards nesting, and generic purple neon blur circles with zero brand purpose.',
    problem: {
      status: 'AESTHETIC REJECTION',
      score: '3.8 / 10.0',
      errorHeader: 'ANTI-AI RUBRIC // SLOP PENALTY TRIGGERED',
      errorMessage: 'Design Critic: Uniform 3-card grid and generic purple blur blobs detected. Cliché density: 92%.',
      codeSnippet: `/* ⚠️ UNCHECKED RAW LLM OUTPUT */
.card-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* 3-card repetition */
  background: radial-gradient(#a855f7 0%, transparent 70%);
  filter: blur(80px); /* Meaningless AI blur blob */
}`,
      slopTags: ['Purple Blur Blob', 'Cards-in-Cards', 'Monotonous Repetition']
    },
    solution: {
      status: 'ORIGINALITY VERIFIED',
      score: '9.6 / 10.0',
      persona: 'Creative Director + Frontend Builder',
      resolution: 'Asymmetric Bento grid layout with mathematical fluid clamp() typography and authentic retro pixel brand tokens.',
      codeSnippet: `/* ✓ PIXELCREW SWARM SPECIFICATION */
.bento-master {
  display: grid;
  grid-template-columns: repeat(12, minmax(0, 1fr));
  font-size: clamp(1.125rem, 0.9rem + 1.2vw, 1.875rem);
  /* Asymmetric hierarchy, zero fake blur blobs */
}`,
      testAssertion: '6-dimension Anti-AI review: 9.6/10.0 score passed. Slop penalty: 0.0.',
      craftTags: ['Asymmetric Bento', 'Fluid clamp() Scale', 'Zero Slop Penalty']
    }
  },
  {
    id: 'context',
    step: '03',
    category: 'TOKEN ECONOMY',
    title: '75% Context Rot vs. AST Prompt Caching',
    summary: 'Multi-turn coding agents dump thousands of irrelevant lines into context windows, exhausting token limits and causing catastrophic memory degradation.',
    problem: {
      status: 'CONTEXT ROT EXHAUSTION',
      score: '4.0 / 10.0',
      errorHeader: 'API 429 EXCEPTION // CONTEXT SATURATED',
      errorMessage: 'API Error: 84,200 prompt tokens. Instruction degradation after turn 4. Circular retry loop triggered.',
      codeSnippet: `// ⚠️ UNCHECKED RAW LLM OUTPUT
// Full 80,000 token workspace dumped into prompt
// Repetitive history re-reading 40 identical files
// Model hallucinates outdated API signature
// Latency: 14.8s per message | 75% token waste`,
      slopTags: ['75% Token Waste', 'Context Rot', 'Circular Retry Loop']
    },
    solution: {
      status: 'AST CACHE VERIFIED',
      score: '9.8 / 10.0',
      persona: 'Performance SRE + Token Architect',
      resolution: 'AST symbol-graph extraction injects only exact function interfaces, reducing context consumption by up to 73.4%.',
      codeSnippet: `// ✓ PIXELCREW SWARM SPECIFICATION
// AST-pruned symbol graph: 2,140 tokens (-73.4%)
// Exact interface signatures preserved persistently
// Zero circular retry loops | Latency: 1.1s streaming`,
      testAssertion: 'AST Prompt Cache: 73.4% token reduction verified with persistent Knowledge Items.',
      craftTags: ['-73.4% Tokens Saved', 'Zero Context Rot', 'Sub-1.5s Streaming']
    }
  },
  {
    id: 'security',
    step: '04',
    category: 'SECURITY // RESILIENCE',
    title: 'SQL String Injection vs. RFC 7807 Resilience',
    summary: 'Single-prompt models generate raw SQL string interpolation, leak internal stack traces to clients, and neglect API rate limiting.',
    problem: {
      status: 'OWASP SECURITY ALERT',
      score: '2.9 / 10.0',
      errorHeader: 'STATIC SECURITY SCAN // HIGH VULNERABILITY',
      errorMessage: 'OWASP Sentinel Alert: Unsanitized SQL string concatenation and unhandled 500 error leak detected.',
      codeSnippet: `// ⚠️ UNCHECKED RAW LLM OUTPUT
app.get('/api/users', async (req, res) => {
  // Raw string concatenation: High-risk SQL injection
  const query = \`SELECT * FROM users WHERE id = '\${req.query.id}'\`;
  return db.execute(query);
});`,
      slopTags: ['SQL Injection Risk', 'Missing Rate Limit', 'Leaked Stack Trace']
    },
    solution: {
      status: 'OWASP DEFENSE VERIFIED',
      score: '10.0 / 10.0',
      persona: 'Security Sentinel',
      resolution: 'Parameterized queries, sliding window token bucket rate limiting, and standard RFC 7807 error envelopes.',
      codeSnippet: `// ✓ PIXELCREW SWARM SPECIFICATION
export async function GET(req: Request) {
  // Parameterized query with sliding window rate limit
  const user = await db.query.users.findFirst({
    where: eq(users.id, sanitizedId),
  });
  return Response.json(user, { headers: securityHeaders });
}`,
      testAssertion: 'OWASP Top 10 security audit: 0 critical vulnerabilities found across all route handlers.',
      craftTags: ['Parameterized SQL', 'RFC 7807 Envelopes', 'Sliding Window Rate Limit']
    }
  }
];

export function ProblemSolution() {
  const [activeId, setActiveId] = useState<string>('hydration');

  const active = INCIDENTS.find(i => i.id === activeId) || INCIDENTS[0];

  return (
    <section id="problem-solution" className="py-20 sm:py-24 border-t border-white/[0.06] border-theme relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12 space-y-3">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-display tracking-tight text-white text-theme-primary uppercase">
            The Problem & The Solution
          </h2>
          <p className="text-sm sm:text-base text-slate-300 text-theme-secondary leading-relaxed max-w-2xl mx-auto font-sans">
            Raw LLM generation inevitably produces synthetic design clichés, fragile code, and token exhaustion. 
            PixelCrew introduces architectural rigor, multi-agent coordination, and automated design gates.
          </p>
        </div>

        {/* Horizontal Incident Selector Ribbon */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 mb-8">
          {INCIDENTS.map((item) => {
            const isSelected = item.id === active.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  setActiveId(item.id);
                  playChiptuneSound('click');
                }}
                className={`p-3 rounded-lg border text-left transition-all cursor-pointer flex flex-col gap-1 ${
                  isSelected
                    ? 'bg-white/[0.08] bg-theme-card border-[#38bdf8] shadow-lg shadow-[#38bdf8]/10'
                    : 'bg-white/[0.02] bg-theme-card border-white/[0.06] border-theme hover:border-white/[0.15] opacity-75 hover:opacity-100'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className={`font-pixel text-[9px] ${isSelected ? 'text-[#38bdf8]' : 'text-slate-400 text-theme-muted'}`}>
                    {item.step}
                  </span>
                  <span className="font-mono text-[9px] text-slate-400 text-theme-muted uppercase">
                    {item.category}
                  </span>
                </div>
                <div className={`font-mono text-xs font-bold truncate ${isSelected ? 'text-white text-theme-primary' : 'text-slate-300 text-theme-secondary'}`}>
                  {item.title.split(' vs. ')[0]}
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Incident Headline Strip */}
        <div className="mb-6 p-4 rounded-lg bg-white/[0.02] bg-theme-card border border-white/[0.06] border-theme flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <span className="font-mono text-[11px] text-[#38bdf8] font-bold uppercase tracking-wider block">
              DIAGNOSTIC CASE {active.step} // {active.category}
            </span>
            <h3 className="text-base sm:text-lg font-bold font-display text-white text-theme-primary mt-0.5">
              {active.title}
            </h3>
          </div>
          <p className="text-xs text-slate-400 text-theme-secondary max-w-md leading-relaxed">
            {active.summary}
          </p>
        </div>

        {/* Side-by-Side Dual Diagnostic Diff Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
          
          {/* ── CARD A: The Problem (Raw LLM Failure) ── */}
          <div className="rounded-xl bg-[#090b10] bg-theme-card border border-rose-500/30 p-5 sm:p-7 flex flex-col justify-between space-y-5 shadow-xl relative overflow-hidden">
            <div className="space-y-4">
              
              {/* Card Header */}
              <div className="flex items-center justify-between border-b border-rose-500/20 pb-3">
                <div className="flex items-center gap-2 text-rose-400 font-mono text-xs font-bold uppercase tracking-wider">
                  <AlertTriangle className="w-4 h-4 text-rose-500" />
                  <span>The Problem: Raw LLM Output</span>
                </div>
                <span className="px-2 py-0.5 rounded font-pixel text-[8px] bg-rose-500/10 text-rose-400 border border-rose-500/30">
                  {active.problem.status}
                </span>
              </div>

              {/* Rubric Score */}
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-slate-400 text-theme-muted">Anti-AI Rubric Score:</span>
                <span className="font-bold text-rose-400">{active.problem.score} (REJECTED)</span>
              </div>

              {/* Terminal Exception Box */}
              <div className="rounded-lg bg-black/60 border border-rose-500/25 p-3.5 space-y-2 font-mono text-[11px] text-rose-300 overflow-x-auto">
                <div className="text-[9px] font-pixel text-rose-400/80 uppercase">
                  [{active.problem.errorHeader}]
                </div>
                <div className="text-rose-400/90 text-[10px] leading-relaxed">
                  {active.problem.errorMessage}
                </div>
                <pre className="text-rose-200/90 whitespace-pre pt-2 border-t border-rose-500/20">
                  {active.problem.codeSnippet}
                </pre>
              </div>

            </div>

            {/* Slop Vector Tags */}
            <div className="pt-3 border-t border-rose-500/20">
              <div className="text-[10px] font-mono text-slate-400 text-theme-muted mb-2">Detected AI Slop Factors:</div>
              <div className="flex flex-wrap gap-1.5">
                {active.problem.slopTags.map((tag) => (
                  <span key={tag} className="px-2 py-0.5 rounded font-mono text-[10px] text-rose-400 bg-rose-500/10 border border-rose-500/20">
                    ⚠ {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* ── CARD B: The Solution (PixelCrew Swarm Craft) ── */}
          <div className="rounded-xl bg-[#070d12] bg-theme-card border border-emerald-500/30 p-5 sm:p-7 flex flex-col justify-between space-y-5 shadow-xl relative overflow-hidden">
            <div className="space-y-4">
              
              {/* Card Header */}
              <div className="flex items-center justify-between border-b border-emerald-500/20 pb-3">
                <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs font-bold uppercase tracking-wider">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>The Solution: PixelCrew Swarm</span>
                </div>
                <span className="px-2 py-0.5 rounded font-pixel text-[8px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                  {active.solution.status}
                </span>
              </div>

              {/* Rubric Score & Assigned Persona */}
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-slate-400 text-theme-muted">Persona: <span className="text-white font-bold">{active.solution.persona}</span></span>
                <span className="font-bold text-emerald-400">{active.solution.score} (PASSED)</span>
              </div>

              {/* Terminal Verified Box */}
              <div className="rounded-lg bg-black/60 border border-emerald-500/25 p-3.5 space-y-2 font-mono text-[11px] text-emerald-300 overflow-x-auto">
                <div className="text-[9px] font-pixel text-emerald-400/80 uppercase">
                  [DETERMINISTIC PRODUCTION ARTIFACT]
                </div>
                <div className="text-emerald-400/90 text-[10px] leading-relaxed">
                  ✓ {active.solution.testAssertion}
                </div>
                <pre className="text-emerald-200 whitespace-pre pt-2 border-t border-emerald-500/20">
                  {active.solution.codeSnippet}
                </pre>
              </div>

            </div>

            {/* Craft Verification Badges */}
            <div className="pt-3 border-t border-emerald-500/20">
              <div className="text-[10px] font-mono text-slate-400 text-theme-muted mb-2">Automated Quality Standard:</div>
              <div className="flex flex-wrap gap-1.5">
                {active.solution.craftTags.map((tag) => (
                  <span key={tag} className="px-2 py-0.5 rounded font-mono text-[10px] text-emerald-300 bg-emerald-500/10 border border-emerald-500/20">
                    ✓ {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Comparative Telemetry Strip */}
        <div className="mt-6 p-4 rounded-lg bg-white/[0.02] bg-theme-card border border-white/[0.06] border-theme grid grid-cols-2 md:grid-cols-4 gap-4 text-center font-mono">
          <div>
            <div className="text-[10px] text-slate-400 text-theme-muted uppercase">Hydration Reliability</div>
            <div className="text-xs sm:text-sm font-bold text-emerald-400 mt-0.5">100% Deterministic</div>
          </div>
          <div>
            <div className="text-[10px] text-slate-400 text-theme-muted uppercase">Context Reduction</div>
            <div className="text-xs sm:text-sm font-bold text-[#38bdf8] mt-0.5">-73.4% LLM Tokens</div>
          </div>
          <div>
            <div className="text-[10px] text-slate-400 text-theme-muted uppercase">Runtime Overhead</div>
            <div className="text-xs sm:text-sm font-bold text-emerald-400 mt-0.5">0 Dependencies</div>
          </div>
          <div>
            <div className="text-[10px] text-slate-400 text-theme-muted uppercase">Quality Gate</div>
            <div className="text-xs sm:text-sm font-bold text-white text-theme-primary mt-0.5">≥ 8.5 / 10 Standard</div>
          </div>
        </div>

      </div>
    </section>
  );
}
