'use client';

import { useState } from 'react';
import { playChiptuneSound } from '@/lib/pixelcrew';
import { Wrench, Check, Copy, Sparkles, Layers } from 'lucide-react';

export function StackBuilder() {
  const [frontend, setFrontend] = useState('Next.js App Router');
  const [backend, setBackend] = useState('Route Handlers');
  const [database, setDatabase] = useState('PostgreSQL + Prisma');
  const [security, setSecurity] = useState('OWASP Hardened');
  const [copied, setCopied] = useState(false);

  const assembleCommand = `npx pixelcrew assemble "Build app with ${frontend}, ${backend}, ${database}, ${security}"`;

  const contextJson = JSON.stringify(
    {
      projectName: 'my-custom-app',
      stack: {
        frontend,
        backend,
        database,
        security
      },
      squad: [
        'orchestrator',
        'creativeDirector',
        'frontend',
        'backend',
        'database',
        'security',
        'performance',
        'qa'
      ]
    },
    null,
    2
  );

  const copyAssembleCommand = () => {
    playChiptuneSound('assemble');
    navigator.clipboard.writeText(assembleCommand);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section id="stack-builder" className="py-24 bg-[#07080c] border-b border-white/[0.08] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="space-y-4 max-w-3xl">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#f59e0b]" />
            <span className="font-mono text-xs uppercase tracking-widest text-slate-400">
              Floor 42 // Interactive Swarm Assembler
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold font-display tracking-tight text-white">
            Build your tailored crew.
          </h2>
          <p className="text-sm sm:text-base text-slate-300 font-sans leading-relaxed">
            Select your architectural stack parameters to generate a tailored workspace configuration and execution command.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Stack Parameter Selectors */}
          <div className="lg:col-span-6 craft-card rounded-lg p-6 sm:p-8 space-y-6 border border-white/10 bg-[#0c0f16]">
            
            <div className="font-display text-base font-bold text-white border-b border-white/[0.08] pb-3 flex items-center justify-between">
              <span className="flex items-center gap-2">
                <Wrench className="w-4 h-4 text-[#f59e0b]" />
                Configure Stack Parameters
              </span>
              <span className="font-mono text-xs text-slate-400">4 Architecture Tiers</span>
            </div>

            {/* Frontend Selection */}
            <div className="space-y-2">
              <label className="block font-mono text-xs text-[#38bdf8] font-medium uppercase">1. Frontend Framework</label>
              <div className="grid grid-cols-2 gap-2">
                {['Next.js App Router', 'React 19 + Vite', 'Vue 3 + Nuxt', 'Svelte 5 Runes'].map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => {
                      playChiptuneSound('click');
                      setFrontend(item);
                    }}
                    className={`p-3 font-mono text-xs text-left rounded border transition-all ${
                      frontend === item
                        ? 'bg-[#38bdf8]/10 border-[#38bdf8] text-[#38bdf8] font-bold'
                        : 'bg-[#07080c] border-white/[0.08] text-slate-300 hover:border-white/20'
                    }`}
                  >
                    [{frontend === item ? '✓' : ' '}] {item}
                  </button>
                ))}
              </div>
            </div>

            {/* Backend Selection */}
            <div className="space-y-2">
              <label className="block font-mono text-xs text-[#f43f5e] font-medium uppercase">2. Backend & API Architecture</label>
              <div className="grid grid-cols-2 gap-2">
                {['Route Handlers', 'Express.js', 'FastAPI Python', 'Go Microservices'].map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => {
                      playChiptuneSound('click');
                      setBackend(item);
                    }}
                    className={`p-3 font-mono text-xs text-left rounded border transition-all ${
                      backend === item
                        ? 'bg-[#f43f5e]/10 border-[#f43f5e] text-[#f43f5e] font-bold'
                        : 'bg-[#07080c] border-white/[0.08] text-slate-300 hover:border-white/20'
                    }`}
                  >
                    [{backend === item ? '✓' : ' '}] {item}
                  </button>
                ))}
              </div>
            </div>

            {/* Database Selection */}
            <div className="space-y-2">
              <label className="block font-mono text-xs text-[#f59e0b] font-medium uppercase">3. Database & Persistence</label>
              <div className="grid grid-cols-2 gap-2">
                {['PostgreSQL + Prisma', 'Supabase RLS', 'Neon Serverless', 'Drizzle + SQLite'].map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => {
                      playChiptuneSound('click');
                      setDatabase(item);
                    }}
                    className={`p-3 font-mono text-xs text-left rounded border transition-all ${
                      database === item
                        ? 'bg-[#f59e0b]/10 border-[#f59e0b] text-[#f59e0b] font-bold'
                        : 'bg-[#07080c] border-white/[0.08] text-slate-300 hover:border-white/20'
                    }`}
                  >
                    [{database === item ? '✓' : ' '}] {item}
                  </button>
                ))}
              </div>
            </div>

            {/* Security Selection */}
            <div className="space-y-2">
              <label className="block font-mono text-xs text-[#34d399] font-medium uppercase">4. Security Profile</label>
              <div className="grid grid-cols-2 gap-2">
                {['OWASP Hardened', 'Standard Audit', 'Zero Trust OAuth', 'Strict CSP Guards'].map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => {
                      playChiptuneSound('click');
                      setSecurity(item);
                    }}
                    className={`p-3 font-mono text-xs text-left rounded border transition-all ${
                      security === item
                        ? 'bg-[#34d399]/10 border-[#34d399] text-[#34d399] font-bold'
                        : 'bg-[#07080c] border-white/[0.08] text-slate-300 hover:border-white/20'
                    }`}
                  >
                    [{security === item ? '✓' : ' '}] {item}
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: Tailored Squad Config Card */}
          <div className="lg:col-span-6 space-y-6">
            
            <div className="craft-card rounded-lg p-6 sm:p-8 space-y-6 border border-white/10 bg-[#0c0f16]">
              
              <div className="flex items-center justify-between border-b border-white/[0.08] pb-3 font-mono text-xs">
                <span className="flex items-center gap-2 text-white font-display font-bold text-sm">
                  <Sparkles className="w-4 h-4 text-[#f59e0b]" />
                  Tailored Squad Configuration
                </span>
                <span className="text-[#34d399] font-semibold">8 Personas Ready</span>
              </div>

              {/* Stack Preview Tiles */}
              <div className="grid grid-cols-2 gap-2 font-mono text-xs">
                <div className="p-3 rounded bg-[#07080c] border border-white/[0.06]">
                  <span className="text-slate-400 text-[10px] block">FRONTEND:</span>
                  <span className="text-[#38bdf8] font-bold">{frontend}</span>
                </div>

                <div className="p-3 rounded bg-[#07080c] border border-white/[0.06]">
                  <span className="text-slate-400 text-[10px] block">BACKEND:</span>
                  <span className="text-[#f43f5e] font-bold">{backend}</span>
                </div>

                <div className="p-3 rounded bg-[#07080c] border border-white/[0.06]">
                  <span className="text-slate-400 text-[10px] block">DATABASE:</span>
                  <span className="text-[#f59e0b] font-bold">{database}</span>
                </div>

                <div className="p-3 rounded bg-[#07080c] border border-white/[0.06]">
                  <span className="text-slate-400 text-[10px] block">SECURITY:</span>
                  <span className="text-[#34d399] font-bold">{security}</span>
                </div>
              </div>

              {/* Context JSON Preview Box */}
              <div className="space-y-2">
                <div className="font-mono text-xs text-slate-400">Generated .pixel-crew/context.json:</div>
                <pre className="bg-[#07080c] p-4 rounded border border-white/[0.08] font-mono text-xs text-slate-300 max-h-44 overflow-y-auto">
                  {contextJson}
                </pre>
              </div>

              {/* Action Button */}
              <button
                type="button"
                onClick={copyAssembleCommand}
                className="w-full btn-primary text-xs py-3.5 flex items-center justify-center gap-2"
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? 'Command Copied to Clipboard!' : 'Assemble This Crew (Copy Command)'}</span>
              </button>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
