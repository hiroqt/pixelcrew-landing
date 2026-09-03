export interface ArchitectureStage {
  step: number;
  id: string;
  title: string;
  module: string;
  description: string;
  icon: string;
  color: string;
  details: string[];
}

export const ARCHITECTURE_STAGES: ArchitectureStage[] = [
  {
    step: 1,
    id: 'intent',
    title: 'DEVELOPER INTENT',
    module: 'CLI Entry Point (bin/pixel-agents.js)',
    description: 'Developer submits a prompt via npx pixelcrew assemble "prompt" or /pixelcrew blueprint.',
    icon: '💬',
    color: '#00f0ff',
    details: ['Argument parsing & flags (--dry-run, --provider, --target)', 'Sanitizes intent parameters', 'Initializes workspace telemetry']
  },
  {
    step: 2,
    id: 'analysis',
    title: 'CODEBASE ANALYZER',
    module: 'src/scaffold/analyzer.js',
    description: 'Profiles repository to detect frameworks (Next.js/React/Vue/Svelte), ORMs (Prisma/Drizzle), and test runners.',
    icon: '🔍',
    color: '#38bdf8',
    details: ['Scans package.json & directory trees', 'Generates .pixel-crew/context.json', 'Tailors agent permissions & skills']
  },
  {
    step: 3,
    id: 'dag_planner',
    title: 'DAG TASK PLANNER',
    module: 'src/core/task-graph.js',
    description: 'Decomposes complex requests into a Directed Acyclic Graph (DAG) of dependent tasks with cycle detection.',
    icon: '🕸️',
    color: '#ffd700',
    details: ['Topological task sorting', 'Cycle detection & error handling', 'Parallel execution dependency mapping']
  },
  {
    step: 4,
    id: 'scheduler',
    title: 'CONCURRENCY LIMITER',
    module: 'src/core/scheduler.js',
    description: 'Schedules and throttles parallel agent execution managing memory and token budgets.',
    icon: '⚙️',
    color: '#ff9900',
    details: ['Max concurrency queue control', 'AST token-efficiency budgeting', 'Graceful retry & failure backoff']
  },
  {
    step: 5,
    id: 'swarm_roster',
    title: 'AGENT SWARM ROSTER',
    module: 'src/protocol/agent.js',
    description: 'Orchestrates 9 specialized agents (Orchestrator, Creative, Frontend, Backend, DB, Security, Perf, QA, Motion).',
    icon: '🐝',
    color: '#ff007f',
    details: ['State machine transitions (IDLE -> ANALYZING -> WORKING -> VERIFYING -> COMPLETED)', 'Filesystem & terminal access isolation', 'Workstation sprite updates']
  },
  {
    step: 6,
    id: 'event_pipeline',
    title: 'EVENT PIPELINE & SSE',
    module: 'src/core/event-bus.js + src/server/server.js',
    description: 'Broadcasts real-time events via Server-Sent Events (SSE) and appends to events.jsonl audit log.',
    icon: '📡',
    color: '#bd00ff',
    details: ['Zero-dependency Node.js HTTP/SSE server', 'events.jsonl append log', 'REST API /api/emit endpoints']
  },
  {
    step: 7,
    id: 'pixel_hq',
    title: 'PIXEL CORPS HQ DASHBOARD',
    module: 'src/dashboard/',
    description: 'Visual 960x420 HTML5 Canvas rendering Floor 42 startup office with 8-bit audio synth and #engineering-feed.',
    icon: '🏢',
    color: '#00ff88',
    details: ['60 FPS double-buffered canvas', 'Web Audio API chiptune sound effects', 'Real-time agent sprite state animations']
  },
  {
    step: 8,
    id: 'ide_sync',
    title: 'CROSS-IDE SKILL DISTRIBUTOR',
    module: 'src/adapters/registry.js',
    description: 'Distributes SKILL.md files with YAML frontmatter across 8+ AI IDE directories (.agents, .claude, .cursor, .grok, etc.).',
    icon: '🚀',
    color: '#ff3344',
    details: ['Sanitizes YAML frontmatter', 'Syncs to all detected IDE providers', 'Dry-run safety validation']
  }
];
