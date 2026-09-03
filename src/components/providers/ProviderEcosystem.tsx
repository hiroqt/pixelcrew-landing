'use client';

import { PROVIDERS_DATA } from '@/data/providers';
import { playChiptuneSound } from '@/lib/pixelcrew';
import { Folder, Terminal, CheckCircle2, Cpu } from 'lucide-react';

export function ProviderEcosystem() {
  return (
    <section id="providers" className="py-24 bg-[#07080c] border-b border-white/[0.08] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Banner Callout */}
        <div className="craft-card rounded-lg p-8 sm:p-10 border border-white/10 bg-[#0c0f16] text-center space-y-4 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#141822] border border-white/[0.08] font-mono text-xs text-slate-300">
            <Cpu className="w-3.5 h-3.5 text-[#f59e0b]" />
            <span>MODEL-AGNOSTIC ARCHITECTURE</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-white tracking-tight">
            The Crew is not the model.
          </h2>

          <p className="text-slate-300 font-sans text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            PixelCrew orchestrates canonical software-engineering capabilities and anti-AI rubrics independently from the underlying LLM. Sync your skills across 8+ AI IDE environments and agent runtimes simultaneously with a single command.
          </p>

          <div className="pt-2 flex justify-center">
            <div className="bg-[#07080c] px-4 py-2 rounded border border-white/[0.08] font-mono text-xs text-slate-200 flex items-center gap-2">
              <Terminal className="w-3.5 h-3.5 text-slate-400" />
              <span>npx pixelcrew install --global</span>
            </div>
          </div>
        </div>

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <h3 className="text-2xl sm:text-3xl font-extrabold font-display text-white">
            Supported AI IDE Environments
          </h3>
          <p className="text-slate-400 font-sans text-sm">
            Discovered from actual provider adapter contracts in <code className="text-[#38bdf8]">src/adapters/</code>.
          </p>
        </div>

        {/* Provider Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PROVIDERS_DATA.map((provider) => (
            <div
              key={provider.id}
              onClick={() => playChiptuneSound('click')}
              className="craft-card p-6 rounded-lg transition-all space-y-4 group hover:border-white/20 bg-[#0c0f16]"
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{provider.icon}</span>
                  <div>
                    <h4 className="font-display text-base font-bold text-white group-hover:text-[#38bdf8] transition-colors">
                      {provider.name}
                    </h4>
                    <div className="font-mono text-[10px] text-slate-400">
                      {provider.vendor}
                    </div>
                  </div>
                </div>

                <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-[#34d399]/10 text-[#34d399] border border-[#34d399]/20">
                  Ready
                </span>
              </div>

              {/* Description */}
              <p className="text-xs text-slate-300 font-sans line-clamp-2 leading-relaxed">
                {provider.description}
              </p>

              {/* Directory Target & Adapter Path */}
              <div className="bg-[#07080c] p-3 rounded border border-white/[0.06] space-y-2 font-mono text-[11px]">
                <div className="flex items-center justify-between text-slate-400">
                  <span className="flex items-center gap-1">
                    <Folder className="w-3 h-3 text-[#38bdf8]" />
                    <span>TARGET DIR</span>
                  </span>
                  <code className="text-[#38bdf8]">{provider.targetDir}</code>
                </div>

                <div className="flex items-center justify-between text-slate-400 border-t border-white/[0.06] pt-2">
                  <span className="flex items-center gap-1">
                    <Terminal className="w-3 h-3 text-[#f59e0b]" />
                    <span>ADAPTER</span>
                  </span>
                  <code className="text-slate-300 text-[10px]">{provider.adapterFile}</code>
                </div>
              </div>

              {/* Features checklist */}
              <div className="space-y-1.5 pt-1">
                {provider.features.map((feat, idx) => (
                  <div key={idx} className="font-mono text-[10px] text-slate-300 flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#34d399]" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
