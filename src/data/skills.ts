export interface PixelSkill {
  id: string;
  name: string;
  category: 'frontend' | 'backend' | 'database' | 'security' | 'performance' | 'orchestration';
  categoryLabel: string;
  description: string;
  capabilities: string[];
  technologies: string[];
  command: string;
  source: string;
  featured?: boolean;
}

export const SKILLS_DATA: PixelSkill[] = [
  {
    id: 'anti-ai-patterns',
    name: 'Anti-AI Design Guardian',
    category: 'frontend',
    categoryLabel: 'FRONTEND & UX',
    description: 'Strict Anti-AI Design Critic & Quality Guardian. Enforces a 6-dimension design rubric (>= 8.5/10). Detects monotonous card grids, purple gradient blobs, fake AI sparkles, and cliché copywriting.',
    capabilities: [
      '6-Dimension Visual Scoring Rubric',
      'Asymmetric Layout Enforcement',
      'Cliché Copywriting Stripping',
      'Fluid Typography Curve Audit',
      'Zero-Slop Color Contrast Verification'
    ],
    technologies: ['Next.js', 'React', 'Tailwind CSS', 'Motion', 'Aesthetic Scoring'],
    command: '/pixelcrew render',
    source: '.agents/skills/anti-ai-patterns/SKILL.md',
    featured: true
  },
  {
    id: 'frontend-engineering',
    name: 'Frontend Engineering & UI Synthesis',
    category: 'frontend',
    categoryLabel: 'FRONTEND & UX',
    description: 'Comprehensive modern frontend engineering across React 19, Next.js App Router, Vue 3, Svelte 5, and Tailwind CSS v4. Enforces strict design tokens, fluid typography, and WCAG AA/AAA accessibility.',
    capabilities: [
      'React 19 & Next.js App Router Patterns',
      'Fluid Clamp Typography Architecture',
      'Asymmetric Bento Matrix Layouts',
      'WCAG 2.2 AA/AAA Accessibility Compliance',
      'Client Component Boundaries & SSR'
    ],
    technologies: ['React 19', 'Next.js', 'Vue 3', 'Svelte 5', 'Tailwind CSS v4', 'TypeScript'],
    command: '/pixelcrew craft',
    source: '.agents/skills/frontend-engineering/SKILL.md',
    featured: true
  },
  {
    id: 'design-director',
    name: 'Creative Direction & Visual Strategy',
    category: 'frontend',
    categoryLabel: 'FRONTEND & UX',
    description: 'Defines visual personality, architectural concept, typography strategy, asymmetric layout rules, and strict anti-AI constraints before any code is generated.',
    capabilities: [
      'Brand Personality Definition',
      'Asymmetric Layout Specifications',
      'Fluid Clamp Type Scales',
      'HSL Color Palette Contracts',
      'Anti-AI Visual Constraints'
    ],
    technologies: ['CSS Design Tokens', 'Fluid Clamp Scales', 'HSL Color Architectures'],
    command: '/pixelcrew chromatic',
    source: '.agents/skills/design-director/SKILL.md',
    featured: false
  },
  {
    id: 'backend-engineering',
    name: 'Enterprise Backend Engineering',
    category: 'backend',
    categoryLabel: 'BACKEND & APIS',
    description: 'Enterprise backend patterns (Clean Architecture, Hexagonal, Modular Monoliths). Covers REST with OpenAPI 3.1 & RFC 7807, GraphQL, gRPC, tRPC, WebSockets, rate limiting, and OAuth 2.1 / OIDC.',
    capabilities: [
      'OpenAPI 3.1 & RFC 7807 Error Envelopes',
      'Token Bucket & Redis Sliding Window Rate Limits',
      'Idempotency Keys & Circuit Breakers',
      'OAuth 2.1, OIDC & PASETO Security',
      'OpenTelemetry Distributed Tracing'
    ],
    technologies: ['Node.js', 'Express', 'FastAPI', 'Go', 'REST', 'GraphQL', 'tRPC', 'WebSockets'],
    command: '/pixelcrew sentinel',
    source: '.agents/skills/backend-engineering/SKILL.md',
    featured: true
  },
  {
    id: 'codebase-intelligence',
    name: 'Codebase Intelligence & Profiling',
    category: 'backend',
    categoryLabel: 'BACKEND & APIS',
    description: 'Static codebase analysis engine. Profiles dependencies, directory structures, ORMs (Prisma, Drizzle), API routes, and test runners to automatically configure agent permissions and skills.',
    capabilities: [
      'AST Symbol-Graph Analysis',
      'Framework & ORM Auto-Detection',
      'Dynamic Agent Permission Scoping',
      'Context JSON Generation',
      'Toolchain Compatibility Checks'
    ],
    technologies: ['Node.js Built-ins', 'AST Parsers', 'Static Profiling', 'JSON Schemas'],
    command: '/pixelcrew init',
    source: '.agents/skills/codebase-intelligence/SKILL.md',
    featured: false
  },
  {
    id: 'database-engineering',
    name: 'Database Architecture & Query Tuning',
    category: 'database',
    categoryLabel: 'DATABASE & DATA',
    description: 'Advanced indexing strategies (B-Tree, GIN, GiST, Partial), PK architecture (UUIDv7 vs ULID), Row-Level Security (RLS), connection pooling, migrations, and vector databases (pgvector, Supabase, Neon).',
    capabilities: [
      'B-Tree / GIN / GiST / Partial Indexing',
      'UUIDv7 & ULID PK Architecture',
      'Multi-Tenant Row-Level Security (RLS)',
      'PgBouncer & RDS Connection Pooling',
      'Vector DB Tuning (pgvector, Supabase, Neon)'
    ],
    technologies: ['PostgreSQL', 'Supabase', 'Neon', 'Prisma', 'Drizzle', 'pgvector', 'Redis'],
    command: '/pixelcrew retrofit',
    source: '.agents/skills/database-engineering/SKILL.md',
    featured: true
  },
  {
    id: 'security-sentinel',
    name: 'Security Sentinel & OWASP Audit',
    category: 'security',
    categoryLabel: 'SECURITY & HARDENING',
    description: 'Automated security auditing: OWASP Top 10 prevention, SQL injection protection, CSRF/XSS sanitization, rate limit enforcement, dependency scanning, and security header injection.',
    capabilities: [
      'OWASP Top 10 Vulnerability Scanning',
      'Input Sanitization & XSS Guards',
      'Dependency Vulnerability Auditing',
      'Rate Limiting & Anti-Brute Force',
      'Security Headers & CSP Injection'
    ],
    technologies: ['OWASP Audit', 'Security Headers', 'Rate Limiting', 'Sanitization'],
    command: '/pixelcrew sentinel',
    source: '.agents/skills/anti-ai-patterns/SKILL.md',
    featured: true
  },
  {
    id: 'performance-engineering',
    name: 'Full-Stack Performance Engineering',
    category: 'performance',
    categoryLabel: 'PERFORMANCE & SRE',
    description: 'Full-stack performance profiling: Core Web Vitals (LCP < 0.6s, INP, CLS), SSR streaming, event loop lag detection, multi-tier caching (L1-L3), N+1 query elimination, and k6 stress testing.',
    capabilities: [
      'Core Web Vitals Optimization (LCP < 0.6s)',
      'SSR Streaming & Priority Hints',
      'Multi-Tier Caching (L1 Memory, L2 Redis, L3 CDN)',
      'Event Loop Lag & Heap Profiling',
      'Automated k6 Load & Stress Testing'
    ],
    technologies: ['Core Web Vitals', 'SSR Streaming', 'Heap Profiling', 'k6', 'Redis'],
    command: '/pixelcrew warp',
    source: '.agents/skills/performance-engineering/SKILL.md',
    featured: false
  },
  {
    id: 'pixelcrew-master',
    name: 'Master Swarm Orchestration',
    category: 'orchestration',
    categoryLabel: 'ORCHESTRATION & SWARM',
    description: 'Floor 42 Pixel Corps HQ master controller. Manages 23 CLI commands across 9 agent personas, real-time 2D pixel-art startup office canvas, zero-dependency Node.js engine, and cross-IDE skill distribution.',
    capabilities: [
      '23 Swarm CLI Command Suite',
      'Floor 42 2D Pixel Office Canvas',
      'DAG Task Dependency Graph Resolver',
      'Zero-Dependency Node.js Runtime',
      'Simultaneous 6+ IDE Provider Sync'
    ],
    technologies: ['Node.js Built-ins', 'SSE Broadcasting', 'DAG Task Planner', 'Web Audio Synth'],
    command: '/pixelcrew assemble',
    source: '.agents/skills/pixelcrew/SKILL.md',
    featured: true
  },
  {
    id: 'token-efficiency',
    name: 'Token Efficiency & Context Pruning',
    category: 'orchestration',
    categoryLabel: 'ORCHESTRATION & SWARM',
    description: 'Universal token optimization engine cutting token usage by 50%-75% via AST symbol-graph extraction, multi-turn context pruning, prompt caching, compact diffs, and minified JSON payloads.',
    capabilities: [
      '50%-75% Token Budget Reduction',
      'AST Symbol-Graph Extraction',
      'Multi-Turn Context Pruning',
      'AST Prompt Caching Strategies',
      'Compact Diff & Payload Minification'
    ],
    technologies: ['AST Symbol Graph', 'Context Pruning', 'Prompt Caching', 'Token Budgeting'],
    command: 'npx pixelcrew sync',
    source: '.agents/skills/token-efficiency/SKILL.md',
    featured: false
  }
];
