'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import { AGENTS_DATA, PixelAgent } from '@/data/agents';
import { SKILLS_DATA, PixelSkill } from '@/data/skills';
import { playChiptuneSound } from '@/lib/pixelcrew';
import { ArrowRight, CheckCircle2, Layers, Cpu, ShieldCheck } from 'lucide-react';

interface NodeCategory {
  id: string;
  label: string;
  icon: string;
  color: string;
  description: string;
  agentId: string;
  x: number;
  y: number;
}

const CATEGORY_NODES: NodeCategory[] = [
  {
    id: 'frontend',
    label: 'Frontend & UX',
    icon: '🎨',
    color: '#38bdf8',
    description: 'React 19, Next.js App Router, Tailwind CSS v4, fluid clamp typography, & WCAG accessibility.',
    agentId: 'frontend',
    x: 50,
    y: 14
  },
  {
    id: 'backend',
    label: 'Backend & APIs',
    icon: '⚡',
    color: '#f43f5e',
    description: 'OpenAPI 3.1, RFC 7807 error envelopes, rate limiting, OAuth 2.1, & distributed tracing.',
    agentId: 'backend',
    x: 16,
    y: 50
  },
  {
    id: 'database',
    label: 'Database & Data',
    icon: '🗄️',
    color: '#f59e0b',
    description: 'B-Tree/GIN indexing, UUIDv7 PKs, Prisma & Drizzle ORMs, RLS policies, & pgvector.',
    agentId: 'database',
    x: 50,
    y: 86
  },
  {
    id: 'security',
    label: 'Security & SOC',
    icon: '🛡️',
    color: '#f43f5e',
    description: 'OWASP Top 10 audits, input sanitization, rate limiting, security headers, & dependency scans.',
    agentId: 'security',
    x: 84,
    y: 50
  },
  {
    id: 'performance',
    label: 'Performance & SRE',
    icon: '🚀',
    color: '#34d399',
    description: 'Core Web Vitals (LCP < 0.6s), SSR streaming, multi-tier caching (L1-L3), & k6 load testing.',
    agentId: 'performance',
    x: 25,
    y: 24
  },
  {
    id: 'orchestration',
    label: 'Orchestration',
    icon: '🐝',
    color: '#a855f7',
    description: '23 CLI command suite, Floor 42 startup office, DAG task planner, & zero-dependency runtime.',
    agentId: 'orchestrator',
    x: 75,
    y: 24
  }
];

export function CrewNetwork() {
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('frontend');

  const activeCategory = hoveredCategory || selectedCategory;

  const currentCategoryData = CATEGORY_NODES.find(c => c.id === activeCategory) || CATEGORY_NODES[0];
  const assignedAgent = AGENTS_DATA.find(a => a.id === currentCategoryData.agentId) || AGENTS_DATA[0];
  const activeSkills = SKILLS_DATA.filter(s => s.category === activeCategory);

  const handleNodeClick = (catId: string) => {
    playChiptuneSound('select');
    setSelectedCategory(catId);
    
    const el = document.getElementById('skills');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="crew" className="py-24 bg-[#07080c] border-b border-white/[0.08] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="space-y-4 max-w-3xl">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#f59e0b]" />
            <span className="font-mono text-xs uppercase tracking-widest text-slate-400">
              Floor 42 // Specialized Engineering Roster
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold font-display tracking-tight text-white">
            The Swarm Network.
          </h2>
          <p className="text-sm sm:text-base text-slate-300 font-sans leading-relaxed">
            Hover over domain nodes to inspect agent state machines, canonical capabilities, and specialized workstation responsibilities.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left / Central Canvas: Interactive Vector Network Graph */}
          <div className="lg:col-span-7 craft-card rounded-lg p-6 relative min-h-[460px] flex items-center justify-center border border-white/10 bg-[#0b0e14]">
            
            {/* SVG Connecting Vector Lines */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              {CATEGORY_NODES.map((node) => {
                const isConnected = activeCategory === node.id;
                return (
                  <g key={node.id}>
                    <line
                      x1="50%"
                      y1="50%"
                      x2={`${node.x}%`}
                      y2={`${node.y}%`}
                      stroke={isConnected ? node.color : 'rgba(255, 255, 255, 0.1)'}
                      strokeWidth={isConnected ? '2' : '1'}
                      strokeDasharray={isConnected ? 'none' : '3 3'}
                    />
                  </g>
                );
              })}
            </svg>

            {/* Central Master Node: PIXEL CREW */}
            <div className="relative z-10 p-5 rounded-lg bg-[#07080c] border border-white/20 text-center shadow-2xl">
              <div className="font-display text-sm font-bold text-white tracking-wider">
                PixelCrew Core
              </div>
              <div className="font-mono text-[10px] text-slate-400 mt-0.5">
                Floor 42 Master CPU
              </div>
              <div className="flex items-center justify-center gap-1.5 mt-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#34d399]" />
                <span className="font-mono text-[9px] text-[#34d399]">ONLINE</span>
              </div>
            </div>

            {/* Outer Category Domain Nodes */}
            {CATEGORY_NODES.map((node) => {
              const isActive = activeCategory === node.id;
              return (
                <button
                  key={node.id}
                  type="button"
                  onMouseEnter={() => {
                    playChiptuneSound('click');
                    setHoveredCategory(node.id);
                  }}
                  onMouseLeave={() => setHoveredCategory(null)}
                  onClick={() => handleNodeClick(node.id)}
                  style={{
                    left: `${node.x}%`,
                    top: `${node.y}%`,
                    transform: 'translate(-50%, -50%)'
                  }}
                  className={`absolute z-20 p-3 rounded-lg bg-[#0e1117] border transition-all text-left cursor-pointer shadow-md ${
                    isActive
                      ? 'border-white text-white shadow-[0_0_15px_rgba(255,255,255,0.15)]'
                      : 'border-white/[0.08] text-slate-400 hover:border-white/30'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-xl">{node.icon}</span>
                    <div>
                      <div className="font-display text-xs font-bold tracking-tight text-white">
                        {node.label}
                      </div>
                      <div className="font-mono text-[9px] text-slate-500">
                        {node.id}
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}

          </div>

          {/* Right Column: Editorial Persona Inspector */}
          <div className="lg:col-span-5">
            <div className="craft-card rounded-lg p-6 sm:p-8 space-y-6 border border-white/10 bg-[#0e1117]">
              
              {/* Category Header */}
              <div className="flex items-center justify-between border-b border-white/[0.08] pb-4">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{currentCategoryData.icon}</span>
                  <div>
                    <h3 className="font-display text-lg font-bold text-white">
                      {currentCategoryData.label}
                    </h3>
                    <div className="font-mono text-[10px] text-slate-400">
                      Domain Inspector // {currentCategoryData.id}
                    </div>
                  </div>
                </div>

                <span className="px-2.5 py-1 rounded bg-[#07080c] border border-white/[0.08] font-mono text-[10px] text-slate-300">
                  {activeSkills.length} Canonical Skills
                </span>
              </div>

              <p className="text-xs text-slate-300 font-sans leading-relaxed">
                {currentCategoryData.description}
              </p>

              {/* Assigned Persona Card */}
              <div className="p-4 rounded bg-[#07080c] border border-white/[0.08] space-y-2">
                <div className="font-mono text-[10px] text-slate-400 flex items-center justify-between">
                  <span>ASSIGNED SQUAD PERSONA</span>
                  <span className="font-mono text-[10px] text-[#34d399]">
                    ACTIVE
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{assignedAgent.icon}</span>
                  <div>
                    <div className="font-display text-sm font-bold text-white">
                      {assignedAgent.name}
                    </div>
                    <div className="font-mono text-[10px] text-slate-400">
                      {assignedAgent.title}
                    </div>
                  </div>
                </div>
              </div>

              {/* Responsibilities List */}
              <div className="space-y-2">
                <div className="font-mono text-[10px] text-slate-400 uppercase tracking-wider">
                  CANONICAL RESPONSIBILITIES:
                </div>
                <div className="space-y-1.5">
                  {assignedAgent.responsibilities.map((resp, rIdx) => (
                    <div key={rIdx} className="p-2.5 rounded bg-[#07080c] border border-white/[0.06] font-mono text-xs text-slate-300 flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#34d399] shrink-0" />
                      <span>{resp}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                type="button"
                onClick={() => handleNodeClick(currentCategoryData.id)}
                className="w-full btn-primary text-xs flex items-center justify-center gap-2"
              >
                <span>Explore Skills in Observatory</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
