export interface PixelProvider {
  id: string;
  name: string;
  vendor: string;
  targetDir: string;
  adapterFile: string;
  icon: string;
  color: string;
  description: string;
  features: string[];
}

export const PROVIDERS_DATA: PixelProvider[] = [
  {
    id: 'antigravity',
    name: 'Google Antigravity',
    vendor: 'Google DeepMind',
    targetDir: '.agents/skills/',
    adapterFile: 'src/adapters/antigravity.js',
    icon: '🪐',
    color: '#4285F4',
    description: 'Agentic AI coding assistant environment & universal agent skill protocol with autonomous subagent delegation.',
    features: ['Subagent Delegation', 'Global & Workspace Customization', 'YAML Frontmatter Sync']
  },
  {
    id: 'claude-code',
    name: 'Claude Code',
    vendor: 'Anthropic',
    targetDir: '.claude/skills/',
    adapterFile: 'src/adapters/claude-code.js',
    icon: '🧠',
    color: '#D97706',
    description: 'Command-line tool for agentic coding with project instructions and slash-command workflow integrations.',
    features: ['Project Guidelines', 'CLAUDE.md Auto-Sync', 'Command Aliases']
  },
  {
    id: 'cursor',
    name: 'Cursor AI',
    vendor: 'Anysphere',
    targetDir: '.cursor/skills/',
    adapterFile: 'src/adapters/cursor.js',
    icon: '⚡',
    color: '#00F0FF',
    description: 'AI-first code editor supporting `.cursorrules` and modular agent skills for contextual generation.',
    features: ['Cursor Rules Mapping', 'Directory Indexing', 'Fast Inference Sync']
  },
  {
    id: 'gemini',
    name: 'Google Gemini CLI',
    vendor: 'Google',
    targetDir: '.gemini/skills/',
    adapterFile: 'src/adapters/generic.js',
    icon: '✨',
    color: '#8B5CF6',
    description: 'Command-line assistant utilizing Gemini Flash/Pro models for codebase analysis and refactoring.',
    features: ['Multimodal Inspection', 'Global Plugin Registry', 'FinOps Context Optimization']
  },
  {
    id: 'kiro',
    name: 'Kiro AI',
    vendor: 'Kiro Crew',
    targetDir: '.kiro/skills/',
    adapterFile: 'src/adapters/kiro.js',
    icon: '🎯',
    color: '#EC4899',
    description: 'Autonomous spec-driven AI coding assistant with breadcrumb logging and multi-agent coordination.',
    features: ['Spec-Driven Development', 'Breadcrumb Tracking', 'Automated Verification']
  },
  {
    id: 'codex',
    name: 'OpenAI Codex CLI',
    vendor: 'OpenAI',
    targetDir: '.codex/skills/',
    adapterFile: 'src/adapters/codex.js',
    icon: '🤖',
    color: '#10B981',
    description: 'Terminal-based coding agent leveraging OpenAI models for CLI command execution and synthesis.',
    features: ['Terminal Automation', 'Patch Verification', 'AST Code Synthesis']
  },
  {
    id: 'grok',
    name: 'xAI Grok',
    vendor: 'xAI',
    targetDir: '.grok/skills/',
    adapterFile: 'src/adapters/generic.js',
    icon: '⚡',
    color: '#FFFFFF',
    description: 'xAI Grok agentic coding integration supporting multi-agent swarms, deep reasoning, and system prompts.',
    features: ['System Prompt Ingestion', 'Reasoning Mode', 'Agent Skills Auto-Load']
  },
  {
    id: 'hermes',
    name: 'Nous Hermes',
    vendor: 'NousResearch',
    targetDir: '.hermes/skills/',
    adapterFile: 'src/adapters/generic.js',
    icon: '🏛️',
    color: '#38BDF8',
    description: 'Advanced open-weights reasoning agent by NousResearch with native tool use and structured function calling.',
    features: ['Function Calling', 'Local Inference Support', 'Open Spec Tooling']
  }
];
