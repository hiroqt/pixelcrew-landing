'use client';

import { useEffect } from 'react';
import { PixelSkill } from '@/data/skills';
import { playChiptuneSound } from '@/lib/pixelcrew';
import { X, CheckCircle2, Code, FileCode, ArrowUpRight } from 'lucide-react';

interface SkillDetailPanelProps {
  skill: PixelSkill | null;
  onClose: () => void;
}

export function SkillDetailPanel({ skill, onClose }: SkillDetailPanelProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!skill) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      
      {/* Modal Container */}
      <div 
        className="w-full max-w-2xl bg-[#0e1117] border border-white/15 p-6 sm:p-8 rounded-lg shadow-2xl space-y-6 relative max-h-[90vh] overflow-y-auto"
        role="dialog"
        aria-modal="true"
        aria-labelledby="skill-title"
      >
        
        {/* Modal Header */}
        <div className="flex items-start justify-between border-b border-white/[0.08] pb-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="px-2 py-0.5 bg-[#141822] text-slate-300 border border-white/[0.08] font-mono text-[10px] uppercase font-semibold">
                {skill.categoryLabel}
              </span>
              <span className="font-mono text-[10px] text-slate-400">
                ID: {skill.id}
              </span>
            </div>
            <h2 id="skill-title" className="text-2xl font-bold font-display text-white tracking-tight">
              {skill.name}
            </h2>
          </div>

          <button
            onClick={() => {
              playChiptuneSound('click');
              onClose();
            }}
            className="p-1.5 text-slate-400 hover:text-white rounded hover:bg-white/10 transition-colors"
            aria-label="Close skill panel"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Description */}
        <p className="text-sm text-slate-300 font-sans leading-relaxed">
          {skill.description}
        </p>

        {/* Command Badge */}
        <div className="bg-[#07080c] p-3.5 rounded border border-white/[0.08] space-y-1 font-mono text-xs">
          <div className="flex items-center justify-between text-slate-400 text-[10px]">
            <span>CLI COMMAND ALIAS</span>
            <span className="text-[#34d399]">SWARM READY</span>
          </div>
          <div className="text-[#38bdf8] font-bold">
            {skill.command}
          </div>
        </div>

        {/* Capabilities Checklist */}
        <div className="space-y-3">
          <div className="font-mono text-xs font-semibold text-slate-200 uppercase tracking-wider flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#34d399]" />
            <span>VERIFIED CAPABILITIES</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {skill.capabilities.map((cap, idx) => (
              <div key={idx} className="p-2.5 rounded bg-[#07080c] border border-white/[0.06] font-mono text-xs text-slate-300 flex items-center gap-2">
                <span className="text-[#34d399]">✓</span>
                <span>{cap}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Technologies List */}
        <div className="space-y-3">
          <div className="font-mono text-xs font-semibold text-slate-200 uppercase tracking-wider flex items-center gap-2">
            <Code className="w-4 h-4 text-[#f59e0b]" />
            <span>SUPPORTED TECHNOLOGIES</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {skill.technologies.map((tech, idx) => (
              <span key={idx} className="px-2.5 py-1 rounded bg-[#07080c] border border-white/[0.06] font-mono text-xs text-slate-300">
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Repository Source File Reference */}
        <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between font-mono text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <FileCode className="w-4 h-4 text-[#38bdf8]" />
            <span className="truncate max-w-[280px] sm:max-w-md">{skill.source}</span>
          </div>
          <a
            href={`https://github.com/hiroqt/PixelCrew/tree/main/${skill.source}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => playChiptuneSound('click')}
            className="flex items-center gap-1 text-[#38bdf8] hover:underline font-semibold"
          >
            <span>Source</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>

      </div>
    </div>
  );
}
