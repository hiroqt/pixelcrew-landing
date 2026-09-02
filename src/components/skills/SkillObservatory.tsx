'use client';

import { useSkillExplorer, CategoryFilter } from '@/hooks/useSkillExplorer';
import { SkillDetailPanel } from './SkillDetailPanel';
import { playChiptuneSound } from '@/lib/pixelcrew';
import { Search, Sparkles, ArrowUpRight } from 'lucide-react';

const CATEGORIES: { id: CategoryFilter; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'frontend', label: 'Frontend' },
  { id: 'backend', label: 'Backend' },
  { id: 'database', label: 'Database' },
  { id: 'security', label: 'Security' },
  { id: 'performance', label: 'Performance' },
  { id: 'orchestration', label: 'Orchestration' }
];

export function SkillObservatory() {
  const {
    activeCategory,
    setActiveCategory,
    selectedSkill,
    setSelectedSkill,
    searchQuery,
    setSearchQuery,
    filteredSkills
  } = useSkillExplorer();

  return (
    <section id="skills" className="py-24 bg-[#07080c] border-b border-white/[0.08] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="space-y-4 max-w-3xl">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#f59e0b]" />
            <span className="font-mono text-xs uppercase tracking-widest text-slate-400">
              Floor 42 // Canonical Skill Library
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold font-display tracking-tight text-white">
            Canonical Skill Observatory.
          </h2>
          <p className="text-sm sm:text-base text-slate-300 font-sans leading-relaxed">
            Explore the exact engineering capabilities and anti-AI design quality rubrics loaded into your agent workspace.
          </p>
        </div>

        {/* Filters & Search Controls Bar */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 p-2 rounded-lg bg-[#0e1117] border border-white/[0.08]">
          
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-1">
            {CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => {
                    playChiptuneSound('click');
                    setActiveCategory(cat.id);
                  }}
                  className={`px-3 py-1.5 rounded text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-white text-[#07080c] font-semibold'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-72">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter capabilities..."
              className="w-full bg-[#07080c] border border-white/[0.08] rounded pl-9 pr-3 py-1.5 font-mono text-xs text-slate-200 focus:outline-none focus:border-white/30"
            />
          </div>

        </div>

        {/* Asymmetric Bento Skill Matrix */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredSkills.map((skill) => {
            const isFeatured = skill.featured;
            return (
              <div
                key={skill.id}
                onClick={() => {
                  playChiptuneSound('select');
                  setSelectedSkill(skill);
                }}
                className={`craft-card p-6 rounded-lg cursor-pointer transition-all flex flex-col justify-between space-y-4 group ${
                  isFeatured
                    ? 'lg:col-span-2 border-white/20 bg-[#0c1017]'
                    : 'hover:border-white/20'
                }`}
              >
                <div className="space-y-3">
                  
                  {/* Category Header */}
                  <div className="flex items-center justify-between">
                    <span className="px-2 py-0.5 rounded bg-[#141822] text-slate-300 border border-white/[0.08] font-mono text-[10px]">
                      {skill.categoryLabel}
                    </span>
                    {isFeatured && (
                      <span className="px-2 py-0.5 rounded bg-[#f59e0b]/10 text-[#f59e0b] border border-[#f59e0b]/30 font-mono text-[10px] flex items-center gap-1 font-semibold">
                        <Sparkles className="w-3 h-3" /> Core Foundation
                      </span>
                    )}
                  </div>

                  {/* Title */}
                  <h3 className="font-display text-lg font-bold text-white group-hover:text-[#38bdf8] transition-colors flex items-center justify-between">
                    <span>{skill.name}</span>
                    <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-[#38bdf8] transition-colors" />
                  </h3>

                  {/* Description */}
                  <p className="text-xs text-slate-300 font-sans line-clamp-3 leading-relaxed">
                    {skill.description}
                  </p>

                </div>

                <div className="space-y-3 pt-3 border-t border-white/[0.06]">
                  
                  {/* Command Badge */}
                  <div className="flex items-center justify-between font-mono text-xs">
                    <span className="text-[#38bdf8] font-semibold">{skill.command}</span>
                    <span className="text-slate-400 text-[11px]">{skill.capabilities.length} Capabilities</span>
                  </div>

                  {/* Tech Badges */}
                  <div className="flex flex-wrap gap-1.5">
                    {skill.technologies.slice(0, 4).map((tech, tIdx) => (
                      <span key={tIdx} className="px-2 py-0.5 rounded bg-[#07080c] text-slate-300 font-mono text-[10px] border border-white/[0.06]">
                        {tech}
                      </span>
                    ))}
                  </div>

                </div>
              </div>
            );
          })}
        </div>

        {filteredSkills.length === 0 && (
          <div className="p-12 text-center craft-card rounded-lg font-mono text-xs text-slate-400">
            No matching capabilities found.
          </div>
        )}

      </div>

      {/* Detail Modal / Drawer */}
      <SkillDetailPanel
        skill={selectedSkill}
        onClose={() => setSelectedSkill(null)}
      />
    </section>
  );
}
