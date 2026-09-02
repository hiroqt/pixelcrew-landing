'use client';

import { useState, useEffect, useRef } from 'react';
import { 
  Play, 
  RotateCcw, 
  Copy, 
  Check, 
  Activity, 
  Plus,
  ChevronUp,
  ChevronDown
} from 'lucide-react';
import { playChiptuneSound } from '@/lib/pixelcrew';

interface CommandData {
  name: string;
  category: 'architecture' | 'aesthetic' | 'hardening' | 'operations';
  categoryLabel: string;
  categoryColor: string;
  persona: string;
  summary: string;
  samplePrompt: string;
  combinesWith: string[];
  telemetry: {
    duration: string;
    tokensSaved: string;
    gateScore: string;
  };
  outputLines: string[];
}

const COMMANDS: CommandData[] = [
  // ── Architecture (6)
  {
    name: 'init',
    category: 'architecture',
    categoryLabel: 'CREATION & ARCHITECTURE',
    categoryColor: '#38bdf8',
    persona: 'Lead Orchestrator',
    summary: 'Scans codebase architecture, configures .pixel-crew/, and adapts the agent squad to your framework.',
    samplePrompt: 'npx pixelcrew init',
    combinesWith: ['assemble', 'manifest'],
    telemetry: { duration: '1.2s', tokensSaved: '3.4k', gateScore: '10/10' },
    outputLines: [
      '[INIT] Scanning repository topology: Next.js 15 App Router + Tailwind v4.',
      '[INIT] Identified ORM: Prisma Client + PostgreSQL target.',
      '[CONFIG] Generating .pixel-crew/context.json profile with zero runtime dependencies.',
      '[ORCHESTRATOR] 9 specialized engineering skills linked to .agents/skills/ successfully.',
      '✓ Swarm ready across Cursor, Claude Code, Antigravity, and Gemini CLI.'
    ]
  },
  {
    name: 'assemble',
    category: 'architecture',
    categoryLabel: 'CREATION & ARCHITECTURE',
    categoryColor: '#38bdf8',
    persona: 'Lead Orchestrator',
    summary: 'Full shape-then-build multi-agent sprint pipeline from brief to verified production code.',
    samplePrompt: '/pixelcrew assemble "Build multi-tenant SaaS analytics with Supabase RLS"',
    combinesWith: ['blueprint', 'sentinel', 'audit'],
    telemetry: { duration: '4.8s', tokensSaved: '18.2k', gateScore: '9.5/10' },
    outputLines: [
      '[ORCHESTRATOR] Ingested brief: "Multi-tenant SaaS analytics with Supabase RLS".',
      '[DAG] Compiling Directed Acyclic Graph: 5 nodes, 0 circular dependencies.',
      '[DATABASE] Generating tenant_id RLS policies with tenant_isolation_audit.',
      '[FRONTEND] Constructing responsive dashboard with fluid clamp() data tables.',
      '[QA] Running Playwright E2E simulation for tenant boundary isolation: 12/12 passed.',
      '✓ Production sprint verified and ready for pull request.'
    ]
  },
  {
    name: 'blueprint',
    category: 'architecture',
    categoryLabel: 'CREATION & ARCHITECTURE',
    categoryColor: '#38bdf8',
    persona: 'UX Planner',
    summary: 'Plans UX section topologies, wireframes, and compiles dynamic DAG task graphs before writing code.',
    samplePrompt: '/pixelcrew blueprint "Design onboarding experience for high-security vault"',
    combinesWith: ['assemble', 'bento'],
    telemetry: { duration: '2.1s', tokensSaved: '8.7k', gateScore: '9.2/10' },
    outputLines: [
      '[UX PLANNER] Analyzing user activation criteria for high-security vault flow.',
      '[SPEC] Generating Section Topology: Identity Proof -> MFA Enrollment -> Key Generation.',
      '[WIREFRAME] Drafted 3-stage asymmetric onboarding layout with zero horizontal overflow.',
      '[DAG] Exported task graph: uxPlanner -> frontendBuilder -> securitySentinel.',
      '✓ Architectural blueprint compiled in DESIGN.md.'
    ]
  },
  {
    name: 'boss-fight',
    category: 'architecture',
    categoryLabel: 'CREATION & ARCHITECTURE',
    categoryColor: '#38bdf8',
    persona: 'QA Critic & SRE',
    summary: 'Targeted swarm bug blitz to isolate, repair, and verify breaking production issues with regression tests.',
    samplePrompt: '/pixelcrew boss-fight "Fix hydration mismatch in client navigation"',
    combinesWith: ['sentinel', 'audit'],
    telemetry: { duration: '3.4s', tokensSaved: '11.5k', gateScore: '9.8/10' },
    outputLines: [
      '[BOSS-FIGHT] Target issue: Hydration mismatch triggered during client navigation.',
      '[ISOLATION] Spawning headless browser sandbox with React DOM reconciler trace.',
      '[ROOT CAUSE] Discovered Date.now() rendered directly inside server SSR component.',
      '[PATCH] Converted to suppressHydrationWarning wrapper + useEffect synchronization.',
      '[TEST] Validated with synthetic SSR hydration test: 0 console warnings.',
      '✓ Bug obliterated. Regression test committed.'
    ]
  },
  {
    name: 'manifest',
    category: 'architecture',
    categoryLabel: 'CREATION & ARCHITECTURE',
    categoryColor: '#38bdf8',
    persona: 'Design System Architect',
    summary: 'Reverse-engineers active project code into comprehensive DESIGN.md and PRODUCT.md specifications.',
    samplePrompt: '/pixelcrew manifest',
    combinesWith: ['retrofit', 'blueprint'],
    telemetry: { duration: '2.9s', tokensSaved: '9.1k', gateScore: '9.4/10' },
    outputLines: [
      '[MANIFEST] Reverse-engineering active component graph and routing topology.',
      '[EXTRACT] Parsed 24 UI components, 6 layout routes, and 4 CSS token registries.',
      '[DOCS] Synthesizing DESIGN.md: Color elevation surfaces, typography, and layout rules.',
      '[DOCS] Synthesizing PRODUCT.md: Core user journeys and API boundary specs.',
      '✓ Architectural specifications synchronized with active code.'
    ]
  },
  {
    name: 'retrofit',
    category: 'architecture',
    categoryLabel: 'CREATION & ARCHITECTURE',
    categoryColor: '#38bdf8',
    persona: 'Design System Architect',
    summary: 'Extracts reusable UI primitives, Tailwind tokens, and CSS variables into the centralized design system.',
    samplePrompt: '/pixelcrew retrofit',
    combinesWith: ['chromatic', 'typeset'],
    telemetry: { duration: '2.5s', tokensSaved: '7.8k', gateScore: '9.1/10' },
    outputLines: [
      '[RETROFIT] Scanning for duplicate hardcoded hex values and ad-hoc paddings.',
      '[TOKENIZE] Extracted 8 recurring color shades into semantic CSS tokens: --surface-elevated.',
      '[REFACTOR] Unified 14 button variants into centralized <Button /> primitive.',
      '✓ Codebase sanitized: 120 lines of redundant ad-hoc styles eliminated.'
    ]
  },

  // ── Aesthetic & Anti-AI (9)
  {
    name: 'render',
    category: 'aesthetic',
    categoryLabel: 'AESTHETIC & ANTI-AI',
    categoryColor: '#a78bfa',
    persona: 'Creative Director',
    summary: '6-dimension Anti-AI design & UX review enforcing quality threshold score >= 8.5/10.0.',
    samplePrompt: '/pixelcrew render',
    combinesWith: ['de-slop', 'typeset', 'bento'],
    telemetry: { duration: '3.1s', tokensSaved: '14.0k', gateScore: '9.4/10' },
    outputLines: [
      '[RENDER] Initiating 6-Dimension Anti-AI Design Audit...',
      '  ├─ Originality:   9.6/10 (Distinctive character, zero AI cliché tropes)',
      '  ├─ Hierarchy:     9.2/10 (Clear focal anchor, intentional type scaling)',
      '  ├─ Typography:    9.5/10 (Mathematical fluid clamp scales active)',
      '  ├─ Layout Rhythm: 9.0/10 (Asymmetric Bento structure, no 3-card repetition)',
      '  ├─ Brand Soul:    9.7/10 (Authentic retro pixel engineering aesthetic)',
      '  └─ Slop Penalty:  0.0/10 (Zero fake sparkles or generic blur blobs)',
      '✓ Overall Rubric Score: 9.4/10.0 — PASSED (Standard: >= 8.5/10).'
    ]
  },
  {
    name: '8bit',
    category: 'aesthetic',
    categoryLabel: 'AESTHETIC & ANTI-AI',
    categoryColor: '#a78bfa',
    persona: 'Motion Specialist',
    summary: 'Adds retro arcade delight: procedural Web Audio chimes, CRT phosphor scanlines, and tactile feedback.',
    samplePrompt: '/pixelcrew 8bit',
    combinesWith: ['overdrive', 'render'],
    telemetry: { duration: '1.4s', tokensSaved: '4.2k', gateScore: '9.6/10' },
    outputLines: [
      '[8BIT] Synthesizing Web Audio procedural square-wave audio synthesizer...',
      '[8BIT] Injecting retro chime frequencies: 440Hz -> 880Hz envelope.',
      '[CRT] Activating subtle phosphor scanline canvas overlay (opacity 0.03).',
      '[INTERACTION] Bound keyboard sound effects to slash command executions.',
      '✓ Retro arcade delight active. Play chimes with sound toggle!'
    ]
  },
  {
    name: 'overdrive',
    category: 'aesthetic',
    categoryLabel: 'AESTHETIC & ANTI-AI',
    categoryColor: '#a78bfa',
    persona: 'Motion Specialist',
    summary: 'Injects high-end technical effects: WebGL/Canvas shaders, interactive terminal shell, and reactive backgrounds.',
    samplePrompt: '/pixelcrew overdrive',
    combinesWith: ['8bit', 'bolder'],
    telemetry: { duration: '2.8s', tokensSaved: '6.9k', gateScore: '9.3/10' },
    outputLines: [
      '[OVERDRIVE] Initializing WebGL canvas shader with GLSL particle field.',
      '[SHADER] Compiling fragment shader: responsive mouse-reactive cursor field.',
      '[PERF] Enforcing 60 FPS requestAnimationFrame loop with RAF throttling.',
      '✓ Technical visual overdrive compiled without frame drops.'
    ]
  },
  {
    name: 'chromatic',
    category: 'aesthetic',
    categoryLabel: 'AESTHETIC & ANTI-AI',
    categoryColor: '#a78bfa',
    persona: 'Design System Architect',
    summary: 'Injects curated HSL color tokens, dark mode elevation surfaces, and atmospheric accent tiers.',
    samplePrompt: '/pixelcrew chromatic obsidian',
    combinesWith: ['retrofit', 'typeset'],
    telemetry: { duration: '1.9s', tokensSaved: '5.1k', gateScore: '9.5/10' },
    outputLines: [
      '[CHROMATIC] Selected Palette Preset: "Obsidian Slate".',
      '[HSL] Generating mathematical tint and shade ramps with WCAG AAA contrast ratio.',
      '[THEME] Injected CSS variables: --bg: hsl(230, 25%, 4%) / --accent: hsl(258, 90%, 66%).',
      '✓ Theme tokens deployed across dark and light elevation surfaces.'
    ]
  },
  {
    name: 'typeset',
    category: 'aesthetic',
    categoryLabel: 'AESTHETIC & ANTI-AI',
    categoryColor: '#a78bfa',
    persona: 'Creative Director',
    summary: 'Fixes font pairings, applies mathematical fluid clamp() type scales, and establishes expressive hierarchy.',
    samplePrompt: '/pixelcrew typeset editorial',
    combinesWith: ['render', 'bento'],
    telemetry: { duration: '2.2s', tokensSaved: '6.3k', gateScore: '9.4/10' },
    outputLines: [
      '[TYPESET] Calculating fluid type scale based on viewport widths (360px -> 1440px).',
      '[FORMULA] H1: clamp(2rem, 1.5rem + 2.5vw, 3.75rem) with -0.025em tracking.',
      '[PAIRING] Harmonized display font (Press Start 2P) with modern body typography.',
      '✓ Mathematical fluid typography applied with zero horizontal overflow.'
    ]
  },
  {
    name: 'bento',
    category: 'aesthetic',
    categoryLabel: 'AESTHETIC & ANTI-AI',
    categoryColor: '#a78bfa',
    persona: 'Frontend Builder',
    summary: 'Reorganizes repetitive sections into asymmetric Bento grids, dynamic viewport flow, and zero horizontal overflow.',
    samplePrompt: '/pixelcrew bento hero',
    combinesWith: ['render', 'calibrate'],
    telemetry: { duration: '2.7s', tokensSaved: '8.4k', gateScore: '9.2/10' },
    outputLines: [
      '[BENTO] Analyzing section geometry for repetitive uniform card grids.',
      '[RESTRUCTURE] Converted monotonous 3-column block into 8/4 asymmetric Bento layout.',
      '[FOCUS] Elevated primary KPI metrics to dominant 2-row span with interactive sparkline.',
      '✓ Layout restructured with dynamic editorial visual rhythm.'
    ]
  },
  {
    name: 'de-slop',
    category: 'aesthetic',
    categoryLabel: 'AESTHETIC & ANTI-AI',
    categoryColor: '#a78bfa',
    persona: 'QA & Visual Critic',
    summary: 'Strips AI cliché copywriting and replaces it with grounded technical value propositions.',
    samplePrompt: '/pixelcrew de-slop',
    combinesWith: ['render', 'manifest'],
    telemetry: { duration: '1.8s', tokensSaved: '5.9k', gateScore: '9.7/10' },
    outputLines: [
      '[DE-SLOP] Scanning marketing copy for synthetic AI cliches...',
      '  [-] Removed: "Revolutionize your enterprise workflow with game-changing synergy"',
      '  [-] Removed: "Elevate your productivity to unprecedented heights"',
      '  [+] Injected: "Zero runtime dependencies across Cursor, Claude Code, and Antigravity."',
      '  [+] Injected: "Deterministic DAG task orchestration verified by Playwright tests."',
      '✓ Cliché density reduced by 100%. Technical credibility restored.'
    ]
  },
  {
    name: 'bolder',
    category: 'aesthetic',
    categoryLabel: 'AESTHETIC & ANTI-AI',
    categoryColor: '#a78bfa',
    persona: 'Creative Director',
    summary: 'Amplifies visual punch: stronger typographic contrast, bolder accent colors, and larger hit targets.',
    samplePrompt: '/pixelcrew bolder',
    combinesWith: ['typeset', 'overdrive'],
    telemetry: { duration: '1.6s', tokensSaved: '4.8k', gateScore: '9.1/10' },
    outputLines: [
      '[BOLDER] Amplifying visual hierarchy and contrast ratios.',
      '[CONTRAST] Increased heading font weight to 800 with tighter letter spacing.',
      '[ACCENT] Boosted primary accent vibrancy by +18% saturation.',
      '✓ Visual punch elevated for high-impact display.'
    ]
  },
  {
    name: 'quieter',
    category: 'aesthetic',
    categoryLabel: 'AESTHETIC & ANTI-AI',
    categoryColor: '#a78bfa',
    persona: 'Creative Director',
    summary: 'Restores calm minimalist balance: reduced contrast, muted accents, and increased whitespace.',
    samplePrompt: '/pixelcrew quieter',
    combinesWith: ['typeset', 'chromatic'],
    telemetry: { duration: '1.6s', tokensSaved: '4.8k', gateScore: '9.1/10' },
    outputLines: [
      '[QUIETER] Softening interface contrast and expanding negative space.',
      '[SPACE] Expanded vertical section padding from py-16 to py-24.',
      '[SURFACE] Switched borders to subtle 6% opacity with muted monochrome tones.',
      '✓ Calm minimalist equilibrium restored.'
    ]
  },

  // ── Hardening (5)
  {
    name: 'sentinel',
    category: 'hardening',
    categoryLabel: 'PRODUCTION HARDENING & SRE',
    categoryColor: '#34d399',
    persona: 'Security Sentinel',
    summary: 'Security & resilience pass: OWASP checks, SQL injection prevention, RFC 7807 error envelopes, and rate limiting.',
    samplePrompt: '/pixelcrew sentinel',
    combinesWith: ['audit', 'warp'],
    telemetry: { duration: '3.6s', tokensSaved: '13.1k', gateScore: '9.9/10' },
    outputLines: [
      '[SENTINEL] Running OWASP Top 10 security & static analysis audit...',
      '  [✓] SQL Injection: Parameterized queries verified. Zero string concatenation.',
      '  [✓] Error Standards: RFC 7807 problem details envelops configured for all 4xx/5xx.',
      '  [✓] Rate Limiting: Sliding window token bucket active (100 req/min per IP).',
      '  [✓] Headers: CSP, X-Frame-Options, and HSTS verified.',
      '✓ Zero high-severity vulnerabilities found. Production defense locked.'
    ]
  },
  {
    name: 'audit',
    category: 'hardening',
    categoryLabel: 'PRODUCTION HARDENING & SRE',
    categoryColor: '#34d399',
    persona: 'QA Automation',
    summary: 'Runs technical quality checks: a11y WCAG AA/AAA, Core Web Vitals (LCP < 0.6s), and Playwright E2E journeys.',
    samplePrompt: '/pixelcrew audit',
    combinesWith: ['sentinel', 'calibrate', 'warp'],
    telemetry: { duration: '4.1s', tokensSaved: '15.4k', gateScore: '9.8/10' },
    outputLines: [
      '[AUDIT] Launching automated accessibility & performance test suite...',
      '  [✓] Accessibility: WCAG 2.1 AA/AAA compliant (0 color contrast or ARIA errors).',
      '  [✓] Keyboard Nav: Full focus trap and tab order verification passed.',
      '  [✓] Core Web Vitals: LCP 0.38s | INP 14ms | CLS 0.000.',
      '  [✓] End-to-End: 18 Playwright user journey tests passed.',
      '✓ Quality audit completed with zero failing assertions.'
    ]
  },
  {
    name: 'warp',
    category: 'hardening',
    categoryLabel: 'PRODUCTION HARDENING & SRE',
    categoryColor: '#34d399',
    persona: 'Performance Profiler',
    summary: 'Full-stack performance tuning: streaming SSR, bundle minification, and AST prompt caching (~72% token savings).',
    samplePrompt: '/pixelcrew warp',
    combinesWith: ['audit', 'polish'],
    telemetry: { duration: '3.0s', tokensSaved: '22.8k', gateScore: '9.7/10' },
    outputLines: [
      '[WARP] Optimizing token consumption and runtime performance...',
      '  [TOKEN CACHE] AST prompt caching enabled: ~73.4% LLM token reduction.',
      '  [SSR STREAM] Activated streaming HTML responses with Suspense boundaries.',
      '  [BUNDLE] Tree-shook unused Lucide icons and CSS utility bloat (-42kB).',
      '✓ Latency reduced by 58%. Context consumption slashed.'
    ]
  },
  {
    name: 'polish',
    category: 'hardening',
    categoryLabel: 'PRODUCTION HARDENING & SRE',
    categoryColor: '#34d399',
    persona: 'Frontend Builder',
    summary: 'Final shipping readiness pass: design system token alignment, strict type checks, and aesthetic cleanup.',
    samplePrompt: '/pixelcrew polish',
    combinesWith: ['audit', 'render'],
    telemetry: { duration: '2.4s', tokensSaved: '7.1k', gateScore: '9.6/10' },
    outputLines: [
      '[POLISH] Performing pre-shipping verification scan...',
      '  [✓] TypeScript: 0 type errors across strict compilation.',
      '  [✓] Dead Code: 0 unused imports or dangling test mocks found.',
      '  [✓] Design Tokens: All components aligned to centralized CSS variables.',
      '✓ Codebase polished and validated for production deployment.'
    ]
  },
  {
    name: 'calibrate',
    category: 'hardening',
    categoryLabel: 'PRODUCTION HARDENING & SRE',
    categoryColor: '#34d399',
    persona: 'Frontend Builder',
    summary: 'Responsive viewport testing and breakpoint tuning from 360px mobile viewports up to 4K desktop displays.',
    samplePrompt: '/pixelcrew calibrate mobile',
    combinesWith: ['bento', 'audit'],
    telemetry: { duration: '2.1s', tokensSaved: '6.4k', gateScore: '9.4/10' },
    outputLines: [
      '[CALIBRATE] Testing responsive layouts across 5 viewport breakpoints...',
      '  [✓] Mobile Portrait (360px): 0 horizontal overflow, touch targets >= 44px.',
      '  [✓] Tablet (768px): Navigation seamlessly converts to mobile drawer.',
      '  [✓] Desktop (1440px): Bento grid aligns without distortion.',
      '  [✓] 4K Display (2560px): Max container bounds constrained at 1280px.',
      '✓ All viewports fully responsive and calibrated.'
    ]
  },

  // ── Operations (3)
  {
    name: 'recap',
    category: 'operations',
    categoryLabel: 'OPERATIONS & DIAGNOSTICS',
    categoryColor: '#f59e0b',
    persona: 'Lead Orchestrator',
    summary: 'Compact git changelog and diff stats summarizing progress and modified tokens across recent commits.',
    samplePrompt: '/pixelcrew recap 5',
    combinesWith: ['roster', 'doctor'],
    telemetry: { duration: '1.3s', tokensSaved: '3.8k', gateScore: '9.5/10' },
    outputLines: [
      '[RECAP] Analyzing last 5 git commits across the repository...',
      '  ├─ commit a8f12c: feat: Add ProblemSolution section with zero hydration mismatch',
      '  ├─ commit e4b910: chore: Integrate 23 canonical PixelCrew commands showcase',
      '  ├─ commit 90c74a: style: Apply letter-masked shining sweep effect to hero text',
      '  └─ commit 31d8e2: a11y: Add light/dark theme toggle and remove all emojis',
      '✓ Recap compiled: +482 lines added, -194 removed, 0 breaking regressions.'
    ]
  },
  {
    name: 'roster',
    category: 'operations',
    categoryLabel: 'OPERATIONS & DIAGNOSTICS',
    categoryColor: '#f59e0b',
    persona: 'Lead Orchestrator',
    summary: 'Inspects active squad workstations, subagent allocation, and sprite telemetry status.',
    samplePrompt: '/pixelcrew roster',
    combinesWith: ['recap', 'doctor'],
    telemetry: { duration: '1.1s', tokensSaved: '2.9k', gateScore: '9.8/10' },
    outputLines: [
      '[ROSTER] Floor 42 Pixel Corps HQ Station Telemetry:',
      '  [1] Orchestrator       [IDLE] - Task queue ready',
      '  [2] Creative Director  [ACTIVE] - Anti-AI rubric guardian',
      '  [3] Frontend Builder   [STANDBY] - Next.js 15 App Router specialist',
      '  [4] Security Sentinel  [STANDBY] - OWASP Top 10 scanner active',
      '  [5] Motion Specialist  [STANDBY] - Web Audio synthesizer ready',
      '✓ All 9 agent workstations connected and synchronized.'
    ]
  },
  {
    name: 'doctor',
    category: 'operations',
    categoryLabel: 'OPERATIONS & DIAGNOSTICS',
    categoryColor: '#f59e0b',
    persona: 'QA Critic & SRE',
    summary: 'System diagnostics, environment validation, toolchain compatibility, and provider connectivity checks.',
    samplePrompt: '/pixelcrew doctor',
    combinesWith: ['init', 'roster'],
    telemetry: { duration: '1.5s', tokensSaved: '4.1k', gateScore: '10/10' },
    outputLines: [
      '[DOCTOR] Running Floor 42 diagnostic health checks...',
      '  [✓] Node.js Version: v20+ confirmed',
      '  [✓] Skills Directory: .agents/skills/ valid (23 command mappings intact)',
      '  [✓] IDE Profiles: Claude Code, Cursor, Antigravity, Gemini configs linked',
      '  [✓] Theme Tokens: Dark / Light elevation variables defined',
      '✓ System status: 100% HEALTHY. Zero configuration defects.'
    ]
  }
];

export function CommandShowcase() {
  const [activeCmd, setActiveCmd] = useState<CommandData>(COMMANDS[2]); // Default to blueprint (matches image)
  const [visibleLines, setVisibleLines] = useState<string[]>(COMMANDS[2].outputLines);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const wheelAccumulator = useRef<number>(0);
  const touchStartY = useRef<number>(0);

  const activeIndex = COMMANDS.findIndex(c => c.name === activeCmd.name);

  // Navigate to an index with optional sound
  const selectIndex = (newIndex: number, playSound: boolean = true) => {
    const clamped = Math.max(0, Math.min(COMMANDS.length - 1, newIndex));
    const target = COMMANDS[clamped];
    setActiveCmd(target);
    setVisibleLines(target.outputLines);
    setIsRunning(false);
    if (timerRef.current) clearInterval(timerRef.current);
    if (playSound) {
      playChiptuneSound('scroll');
    }
  };

  const navigateBy = (delta: number) => {
    selectIndex(activeIndex + delta, true);
  };

  // Wheel scroll listener with non-passive event to reliably capture scroll
  useEffect(() => {
    const el = listRef.current;
    if (!el) return;

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      wheelAccumulator.current += e.deltaY;
      const threshold = 35;
      if (Math.abs(wheelAccumulator.current) >= threshold) {
        const direction = wheelAccumulator.current > 0 ? 1 : -1;
        wheelAccumulator.current = 0;
        selectIndex(activeIndex + direction, true);
      }
    };

    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel);
  }, [activeIndex]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    const deltaY = touchStartY.current - e.touches[0].clientY;
    if (Math.abs(deltaY) > 28) {
      const direction = deltaY > 0 ? 1 : -1;
      touchStartY.current = e.touches[0].clientY;
      navigateBy(direction);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      navigateBy(1);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      navigateBy(-1);
    }
  };

  // Run or stream execution simulation with retro blip sounds
  const executeCommand = (cmd: CommandData) => {
    if (timerRef.current) clearInterval(timerRef.current);
    setActiveCmd(cmd);
    setIsRunning(true);
    setVisibleLines([]);

    playChiptuneSound('assemble');

    let currentIndex = 0;
    const lines = cmd.outputLines;

    timerRef.current = setInterval(() => {
      currentIndex++;
      setVisibleLines(lines.slice(0, currentIndex));
      playChiptuneSound('blip');
      if (currentIndex >= lines.length) {
        if (timerRef.current) clearInterval(timerRef.current);
        setIsRunning(false);
        playChiptuneSound('success');
      }
    }, 120);
  };

  const handleSelectCommand = (cmd: CommandData) => {
    const idx = COMMANDS.findIndex(c => c.name === cmd.name);
    if (idx !== -1) {
      selectIndex(idx, false);
      playChiptuneSound('select');
    }
  };

  const copyPrompt = () => {
    navigator.clipboard.writeText(activeCmd.samplePrompt);
    playChiptuneSound('click');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  return (
    <section id="commands" className="py-16 sm:py-20 border-t border-white/[0.06] border-theme relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-16 space-y-3">
          <h2 className="text-xl sm:text-2xl lg:text-4xl font-bold font-display tracking-tight text-white text-theme-primary">
            The Canonical 23 Commands
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 text-theme-secondary leading-relaxed">
            Select any command to inspect its parameters, combination aliases, and live multi-agent execution.
          </p>
        </div>

        {/* Mobile: Horizontal scrollable command strip */}
        <div className="lg:hidden mb-6">
          <div className="flex gap-2 overflow-x-auto pb-3 -mx-4 px-4 scrollbar-thin snap-x snap-mandatory">
            {COMMANDS.map((cmd, idx) => {
              const isSelected = cmd.name === activeCmd.name;
              return (
                <button
                  key={cmd.name}
                  type="button"
                  onClick={() => {
                    selectIndex(idx, false);
                    playChiptuneSound('select');
                  }}
                  className={`shrink-0 snap-start px-3 py-1.5 rounded-md font-pixel text-[9px] sm:text-[10px] border transition-all cursor-pointer whitespace-nowrap ${
                    isSelected
                      ? 'border-current bg-white/[0.08] bg-theme-card text-white text-theme-primary'
                      : 'border-white/[0.06] border-theme text-slate-500 text-theme-muted hover:text-slate-300 hover:border-white/[0.12]'
                  }`}
                  style={isSelected ? { color: cmd.categoryColor, borderColor: `${cmd.categoryColor}40` } : undefined}
                >
                  {cmd.name}
                </button>
              );
            })}
          </div>
        </div>

        {/* Main Stage Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-start">
          
          {/* Left: Vertical Drum Perspective List — desktop only */}
          <div className="hidden lg:block lg:col-span-4">
            <div className="flex items-center justify-between mb-2 px-4">
              <span className="text-[10px] font-mono text-slate-400 text-theme-muted uppercase tracking-wider">
                Scroll to navigate ({activeIndex + 1}/{COMMANDS.length})
              </span>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => navigateBy(-1)}
                  disabled={activeIndex === 0}
                  className="p-1 rounded text-slate-400 hover:text-white disabled:opacity-20 hover:bg-white/[0.04] transition-colors cursor-pointer"
                  title="Previous command (or scroll up)"
                >
                  <ChevronUp className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => navigateBy(1)}
                  disabled={activeIndex === COMMANDS.length - 1}
                  className="p-1 rounded text-slate-400 hover:text-white disabled:opacity-20 hover:bg-white/[0.04] transition-colors cursor-pointer"
                  title="Next command (or scroll down)"
                >
                  <ChevronDown className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <div 
              ref={listRef}
              tabIndex={0}
              onKeyDown={handleKeyDown}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              className="h-[260px] overflow-hidden relative select-none rounded-xl border border-white/[0.06] border-theme bg-white/[0.01] bg-theme-card focus:outline-none focus:border-[#38bdf8]/40 [mask-image:linear-gradient(to_bottom,transparent_0%,black_18%,black_82%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_bottom,transparent_0%,black_18%,black_82%,transparent_100%)] cursor-ns-resize"
              title="Scroll with mouse wheel or trackpad to change commands"
            >
              <div 
                className="transition-transform duration-200 ease-out py-2"
                style={{
                  transform: `translateY(${106 - activeIndex * 48}px)`
                }}
              >
                {COMMANDS.map((cmd, idx) => {
                  const distance = Math.abs(idx - activeIndex);
                  const isSelected = distance === 0;

                  // Distinct visual rhythm matching user screenshot:
                  // Active (blueprint): flush left pl-4, large font, cyan #38bdf8, 100% opacity
                  // Distance 1 (assemble, boss-fight): indented pl-7, text-sm, slate-400, 70% opacity
                  // Distance 2 (init): indented pl-8, text-xs, slate-600, 35% opacity
                  // Distance >= 3: pl-9, faint
                  let paddingClass = 'pl-9';
                  let sizeClass = 'text-[10px]';
                  let opacityClass = 'opacity-10 pointer-events-none';
                  let colorClass = 'text-slate-600';

                  if (distance === 0) {
                    paddingClass = 'pl-4';
                    sizeClass = 'text-base sm:text-lg lg:text-xl font-bold';
                    opacityClass = 'opacity-100';
                    colorClass = '';
                  } else if (distance === 1) {
                    paddingClass = 'pl-7';
                    sizeClass = 'text-xs sm:text-sm';
                    opacityClass = 'opacity-70';
                    colorClass = 'text-slate-400 text-theme-secondary';
                  } else if (distance === 2) {
                    paddingClass = 'pl-8';
                    sizeClass = 'text-[10px] sm:text-xs';
                    opacityClass = 'opacity-35';
                    colorClass = 'text-slate-500 text-theme-muted';
                  }

                  return (
                    <div
                      key={cmd.name}
                      onClick={() => {
                        selectIndex(idx, false);
                        playChiptuneSound('select');
                      }}
                      className={`h-[48px] flex items-center transition-all duration-150 cursor-pointer ${paddingClass} ${opacityClass} hover:opacity-100 group`}
                    >
                      <span 
                        className={`font-pixel tracking-normal block transition-colors ${sizeClass} ${colorClass}`}
                        style={{
                          color: isSelected ? cmd.categoryColor : undefined,
                          textRendering: 'geometricPrecision'
                        }}
                      >
                        {cmd.name}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right: Editorial Showcase */}
          <div className="lg:col-span-8 space-y-5 sm:space-y-7">
            
            {/* Category Tag */}
            <div>
              <span 
                className="font-mono text-[10px] sm:text-xs font-bold tracking-widest uppercase"
                style={{ color: activeCmd.categoryColor }}
              >
                {activeCmd.categoryLabel}
              </span>
            </div>

            {/* Namespace */}
            <div className="text-xs sm:text-sm font-mono text-slate-400 text-theme-muted">
              /pixelcrew
            </div>

            {/* Large Pixel Headline */}
            <h3 className="text-2xl sm:text-3xl lg:text-5xl font-pixel text-white text-theme-primary tracking-normal uppercase leading-[1.3]">
              {activeCmd.name}
            </h3>

            {/* Value Description */}
            <p className="text-sm sm:text-base lg:text-lg text-slate-300 text-theme-secondary leading-relaxed max-w-2xl font-sans">
              {activeCmd.summary}
            </p>

            {/* Combines With Tags */}
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 pt-1">
              <span className="text-[10px] sm:text-xs font-mono text-slate-500 text-theme-muted flex items-center gap-1 mr-0.5">
                <Plus className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                <span className="hidden sm:inline">combines with</span>
              </span>
              {activeCmd.combinesWith.map((target) => {
                const targetCmd = COMMANDS.find(c => c.name === target);
                return (
                  <button
                    key={target}
                    type="button"
                    onClick={() => {
                      if (targetCmd) handleSelectCommand(targetCmd);
                    }}
                    className="px-2 py-0.5 sm:px-2.5 sm:py-1 rounded font-mono text-[10px] sm:text-xs text-[#38bdf8] bg-white/[0.03] bg-theme-subtle border border-white/[0.06] border-theme hover:border-[#38bdf8]/40 hover:bg-[#38bdf8]/10 transition-all cursor-pointer"
                  >
                    /{target}
                  </button>
                );
              })}
            </div>

            {/* Interactive Simulation Console */}
            <div className="rounded-lg sm:rounded-xl bg-[#07080c] code-theme border border-white/[0.08] border-theme p-3 sm:p-5 space-y-3 shadow-xl">
              
              {/* Console header */}
              <div className="flex items-center justify-between border-b border-white/[0.06] pb-2.5 sm:pb-3 gap-2">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="w-2 h-2 rounded-full bg-red-500/80 shrink-0" />
                  <span className="w-2 h-2 rounded-full bg-yellow-500/80 shrink-0" />
                  <span className="w-2 h-2 rounded-full bg-green-500/80 shrink-0" />
                  <span className="text-[10px] sm:text-[11px] font-mono text-slate-400 ml-1 truncate">
                    <span className="hidden sm:inline">Persona: </span>
                    <span className="text-white font-bold">{activeCmd.persona}</span>
                  </span>
                </div>

                <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={() => executeCommand(activeCmd)}
                    disabled={isRunning}
                    className="inline-flex items-center gap-1 sm:gap-1.5 px-2 sm:px-2.5 py-1 rounded bg-[#a78bfa] text-[#07080c] font-mono text-[10px] sm:text-[11px] font-bold shadow hover:bg-[#c084fc] transition-all disabled:opacity-50 cursor-pointer"
                  >
                    {isRunning ? (
                      <>
                        <RotateCcw className="w-3 h-3 animate-spin" />
                        <span className="hidden sm:inline">Simulating...</span>
                      </>
                    ) : (
                      <>
                        <Play className="w-3 h-3 fill-current" />
                        <span>Run</span>
                      </>
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={copyPrompt}
                    title="Copy command"
                    className="p-1 rounded text-slate-400 hover:text-white hover:bg-white/[0.06] transition-colors cursor-pointer"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              {/* Streaming Output */}
              <div className="font-mono text-[10px] sm:text-xs space-y-1 sm:space-y-1.5 min-h-[90px] sm:min-h-[110px] max-h-[140px] sm:max-h-[160px] overflow-y-auto">
                <div className="text-emerald-400 font-bold break-all sm:break-normal">
                  $ {activeCmd.samplePrompt}
                </div>
                {visibleLines.map((line, idx) => (
                  <div 
                    key={idx} 
                    className={`leading-relaxed ${
                      line.includes('PASSED') || line.includes('✓') 
                        ? 'text-emerald-300' 
                        : line.includes('[-] ')
                        ? 'text-rose-400'
                        : line.includes('[INIT]') || line.includes('[DAG]') || line.includes('[SPEC]')
                        ? 'text-[#38bdf8]'
                        : 'text-slate-300'
                    }`}
                  >
                    {line}
                  </div>
                ))}
                {isRunning && (
                  <div className="flex items-center gap-1 text-[#a78bfa] pt-1">
                    <span className="w-2 h-3 bg-[#a78bfa] animate-pulse inline-block" />
                    <span className="text-[10px]">Processing multi-agent consensus...</span>
                  </div>
                )}
              </div>

              {/* Telemetry Bar — stacks on mobile */}
              <div className="pt-2 sm:pt-2.5 border-t border-white/[0.06] flex flex-wrap items-center justify-between gap-x-4 gap-y-1 text-[9px] sm:text-[10px] font-mono text-slate-500">
                <span className="flex items-center gap-1">
                  <Activity className="w-3 h-3 opacity-50" />
                  {activeCmd.telemetry.duration}
                </span>
                <span>Saved: {activeCmd.telemetry.tokensSaved}</span>
                <span>Gate: {activeCmd.telemetry.gateScore}</span>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
