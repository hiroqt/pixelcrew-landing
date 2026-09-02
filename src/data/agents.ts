export interface PixelAgent {
  id: string;
  name: string;
  role: string;
  title: string;
  color: string;
  icon: string;
  expressionIdle: string;
  expressionActive: string;
  workstation: string;
  responsibilities: string[];
  skills: string[];
  avatarStyle: string;
}

export const AGENTS_DATA: PixelAgent[] = [
  {
    id: 'orchestrator',
    name: 'Orchestrator',
    role: 'Tech Lead / Master CPU',
    title: 'Staff Swarm Architect & Project Lead',
    color: '#ffd700', // Gold
    icon: '👔',
    expressionIdle: '●_●',
    expressionActive: '★_★',
    workstation: 'Executive Suite (Pod 1)',
    responsibilities: [
      'Decomposes prompts into DAG tasks',
      'Resolves inter-task dependencies & cycle detection',
      'Coordinates multi-agent sprint execution',
      'Enforces architectural compliance & quality gates'
    ],
    skills: ['pixelcrew-master', 'codebase-intelligence', 'token-efficiency'],
    avatarStyle: 'gold-crown'
  },
  {
    id: 'creativeDirector',
    name: 'Creative Director',
    role: 'Aesthetic Strategist',
    title: 'Lead Aesthetic Strategist & Brand Architect',
    color: '#ff9900', // Orange
    icon: '✨',
    expressionIdle: '●_●',
    expressionActive: '◉_⊙',
    workstation: 'Design Studio (Pod 2)',
    responsibilities: [
      'Defines authentic visual personality and concept',
      'Establishes asymmetric layout specifications',
      'Configures fluid clamp typography scales',
      'Enforces Anti-AI visual quality boundaries'
    ],
    skills: ['design-director', 'anti-ai-patterns', 'frontend-engineering'],
    avatarStyle: 'orange-spark'
  },
  {
    id: 'frontend',
    name: 'Frontend Builder',
    role: 'UI/UX Builder',
    title: 'Senior UI/UX & Component Engineer',
    color: '#00f0ff', // Cyan
    icon: '🎨',
    expressionIdle: '●_●',
    expressionActive: '◉▂◉',
    workstation: 'Frontend Bay (Pod 3)',
    responsibilities: [
      'React 19 & Next.js App Router components',
      'Design systems & Tailwind v4 token architecture',
      'Responsive asymmetric Bento grid layouts',
      'WCAG AA/AAA accessibility implementation'
    ],
    skills: ['frontend-engineering', 'anti-ai-patterns', 'design-director'],
    avatarStyle: 'cyan-brush'
  },
  {
    id: 'backend',
    name: 'Backend Engineer',
    role: 'API & Logic',
    title: 'Principal API & Distributed Systems Engineer',
    color: '#ff007f', // Magenta
    icon: '⚡',
    expressionIdle: '●_●',
    expressionActive: '◉▂◉',
    workstation: 'Backend Lab (Pod 4)',
    responsibilities: [
      'API route handlers, server actions, and middleware',
      'RFC 7807 error envelopes & OpenAPI 3.1 specs',
      'OAuth 2.1 / OIDC auth flows & security headers',
      'Token bucket rate limiting & idempotency keys'
    ],
    skills: ['backend-engineering', 'codebase-intelligence'],
    avatarStyle: 'magenta-lightning'
  },
  {
    id: 'database',
    name: 'Database Architect',
    role: 'Data Layer',
    title: 'Principal DBA & Query Performance Engineer',
    color: '#ffd700', // Gold
    icon: '🗄️',
    expressionIdle: '●_●',
    expressionActive: '🔍_🔍',
    workstation: 'DB Vault (Pod 5)',
    responsibilities: [
      'Schema design & ORM models (Prisma / Drizzle)',
      'Composite & partial indexing optimization',
      'Row-Level Security (RLS) multi-tenant policies',
      'Connection pooling & pgvector indexing'
    ],
    skills: ['database-engineering'],
    avatarStyle: 'gold-vault'
  },
  {
    id: 'security',
    name: 'Security Sentinel',
    role: 'Security Guard',
    title: 'InfoSec Lead & OWASP Auditor',
    color: '#ff3344', // Red
    icon: '🛡️',
    expressionIdle: '●_●',
    expressionActive: '🔍_🔍',
    workstation: 'Security SOC (Pod 6)',
    responsibilities: [
      'Input validation & XSS/CSRF sanitization',
      'OWASP Top 10 automated vulnerability audits',
      'Dependency vulnerability scanning',
      'Rate limiting & anti-brute force enforcement'
    ],
    skills: ['security-sentinel', 'backend-engineering'],
    avatarStyle: 'red-shield'
  },
  {
    id: 'performance',
    name: 'Performance Profiler',
    role: 'Optimization',
    title: 'Core Web Vitals & Runtime Optimizer',
    color: '#00ff88', // Green
    icon: '🚀',
    expressionIdle: '●_●',
    expressionActive: '◉▂◉',
    workstation: 'Perf Lab (Pod 7)',
    responsibilities: [
      'Core Web Vitals optimization (LCP < 0.6s)',
      'SSR streaming & main thread yielding',
      'Multi-tier caching (L1-L3) & stampede protection',
      'k6 automated load testing & heap profiling'
    ],
    skills: ['performance-engineering'],
    avatarStyle: 'green-rocket'
  },
  {
    id: 'qa',
    name: 'QA & Visual Critic',
    role: 'Quality Gate',
    title: 'Lead Verification & Anti-AI Rubric Guardian',
    color: '#bd00ff', // Purple
    icon: '🧪',
    expressionIdle: '●_●',
    expressionActive: '🔍_🔍',
    workstation: 'QA Bay (Pod 8)',
    responsibilities: [
      'Automated test suite generation (node:test, Vitest)',
      'Playwright E2E journey verification',
      'Anti-AI 6-dimension visual rubric scoring (>= 8.5)',
      'Dry-run file safety & regression verification'
    ],
    skills: ['anti-ai-patterns', 'token-efficiency'],
    avatarStyle: 'purple-beaker'
  },
  {
    id: 'motionSpecialist',
    name: 'Motion Specialist',
    role: 'Kinetic Choreographer',
    title: 'Senior Kinetic Choreographer & Micro-Interactions',
    color: '#38bdf8', // Sky Blue
    icon: '🎬',
    expressionIdle: '●_●',
    expressionActive: '^_^',
    workstation: 'Kinetic Lounge (Pod 9)',
    responsibilities: [
      'Micro-interactions & tactile UI feedback',
      'HTML5 2D canvas double-buffered sprite rendering',
      'CSS & Framer Motion page transitions',
      'Web Audio API 8-bit chiptune sound synthesis'
    ],
    skills: ['frontend-engineering', 'design-director'],
    avatarStyle: 'sky-clapper'
  }
];
