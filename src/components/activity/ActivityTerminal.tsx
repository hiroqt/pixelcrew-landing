'use client';

import { useState, useEffect, useRef } from 'react';
import { playChiptuneSound, formatTimestamp } from '@/lib/pixelcrew';
import { Play, Pause, RotateCcw, CheckCircle2, Cpu, Sparkles, Activity } from 'lucide-react';

interface LogEntry {
  id: string;
  time: string;
  module: string;
  avatar: string;
  color: string;
  message: string;
}

const INITIAL_LOGS: LogEntry[] = [
  { id: '1', time: '13:42:01', module: 'CORE', avatar: '👔', color: '#ffd700', message: 'Swarm daemon initialized on Floor 42 Pixel Corps HQ' },
  { id: '2', time: '13:42:02', module: 'ANALYZER', avatar: '🔍', color: '#38bdf8', message: 'Codebase scanned: Next.js App Router, Tailwind CSS v4, Prisma ORM' },
  { id: '3', time: '13:42:03', module: 'PLANNER', avatar: '🕸️', color: '#ffd700', message: 'DAG graph compiled: 7 parallel agent tasks resolved (0 cycles)' },
  { id: '4', time: '13:42:04', module: 'CREATIVE', avatar: '✨', color: '#ff9900', message: 'Visual specs resolved: Editorial Asymmetric archetype, fluid clamp scales' },
  { id: '5', time: '13:42:05', module: 'FRONTEND', avatar: '🎨', color: '#00f0ff', message: 'Synthesized Bento layout, client boundaries & WCAG AA contrast' },
  { id: '6', time: '13:42:06', module: 'BACKEND', avatar: '⚡', color: '#ff007f', message: 'Generated API route handlers & RFC 7807 structured error envelopes' },
  { id: '7', time: '13:42:07', module: 'DATABASE', avatar: '🗄️', color: '#ffd700', message: 'Crafted Prisma PostgreSQL models, ULID PKs & partial B-Tree indexes' },
  { id: '8', time: '13:42:08', module: 'SECURITY', avatar: '🛡️', color: '#ff3344', message: 'OWASP Top 10 audit clean. Injected rate limits & CSP security headers' },
  { id: '9', time: '13:42:09', module: 'PERF SRE', avatar: '🚀', color: '#00ff88', message: 'Core Web Vitals optimized: LCP = 0.48s, INP = 12ms, zero CLS' },
  { id: '10', time: '13:42:10', module: 'QA CRITIC', avatar: '🧪', color: '#bd00ff', message: 'Anti-AI Rubric Score: 9.4/10.0 (PASS >= 8.5 threshold)' },
  { id: '11', time: '13:42:11', module: 'SYNC', avatar: '🚀', color: '#00f0ff', message: 'SKILL.md distributed to .agents, .claude, .cursor, .gemini, .kiro, .codex' },
  { id: '12', time: '13:42:12', module: 'CORE', avatar: '★', color: '#00ff88', message: 'Task orchestration complete in 11.2s. 0 npm dependencies written.' }
];

export function ActivityTerminal() {
  const [logs, setLogs] = useState<LogEntry[]>(INITIAL_LOGS);
  const [isRunning, setIsRunning] = useState<boolean>(true);
  const feedEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      const modules = [
        { name: 'FRONTEND', avatar: '🎨', color: '#00f0ff', msg: 'Re-evaluating client component hydration boundaries...' },
        { name: 'BACKEND', avatar: '⚡', color: '#ff007f', msg: 'Verifying rate limiting sliding window token bucket...' },
        { name: 'DATABASE', avatar: '🗄️', color: '#ffd700', msg: 'Evaluating GIN composite index performance for vector search...' },
        { name: 'SECURITY', avatar: '🛡️', color: '#ff3344', msg: 'Running automated OWASP XSS & SQL injection sanity check...' },
        { name: 'PERF SRE', avatar: '🚀', color: '#00ff88', msg: 'LCP optimization check: image priority hints verified.' },
        { name: 'QA CRITIC', avatar: '🧪', color: '#bd00ff', msg: 'Anti-AI rubric visual check passed (Score: 9.3/10).' }
      ];

      const randMod = modules[Math.floor(Math.random() * modules.length)];
      const newEntry: LogEntry = {
        id: Date.now().toString(),
        time: formatTimestamp(),
        module: randMod.name,
        avatar: randMod.avatar,
        color: randMod.color,
        message: randMod.msg
      };

      setLogs(prev => [...prev.slice(-25), newEntry]);
    }, 2500);

    return () => clearInterval(interval);
  }, [isRunning]);

  useEffect(() => {
    feedEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  const handleClear = () => {
    playChiptuneSound('click');
    setLogs([]);
  };

  const handleReset = () => {
    playChiptuneSound('click');
    setLogs(INITIAL_LOGS);
  };

  return (
    <section id="telemetry" className="py-24 bg-[#0a0c14] border-b border-[#1e263c] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-[#111523] border border-[#1e263c] font-pixel text-[10px] text-[#00f0ff] shadow-[2px_2px_0px_#000]">
            <span>[ SYSTEM // REALTIME TELEMETRY MONITOR ]</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold font-display text-slate-100 uppercase tracking-tight">
            #ENGINEERING-FEED
          </h2>
          <p className="text-slate-300 font-sans text-sm sm:text-base leading-relaxed">
            Real-time SSE event pipeline streaming live agent states, file changes, and anti-AI rubric scoring.
          </p>
        </div>

        {/* Engineering Feed Container Card (NO TERMINAL CARDS!) */}
        <div className="bg-[#111523] border-2 border-[#1e263c] pixel-card overflow-hidden">
          
          {/* Feed Titlebar */}
          <div className="bg-[#0a0c14] px-6 py-4 border-b border-[#1e263c] flex flex-wrap items-center justify-between gap-4 font-mono text-xs">
            
            <div className="flex items-center gap-3">
              <Activity className="w-5 h-5 text-[#00f0ff]" />
              <span className="text-slate-100 font-display font-bold uppercase text-sm">
                FLOOR 42 // REALTIME SWARM TELEMETRY
              </span>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  playChiptuneSound('click');
                  setIsRunning(prev => !prev);
                }}
                className={`px-3 py-1.5 border font-pixel text-[9px] uppercase transition-all ${
                  isRunning
                    ? 'border-[#00ff88] bg-[#00ff88]/10 text-[#00ff88]'
                    : 'border-[#ffd700] bg-[#ffd700]/10 text-[#ffd700]'
                }`}
              >
                {isRunning ? 'STREAMING' : 'PAUSED'}
              </button>

              <button
                onClick={handleReset}
                className="px-3 py-1.5 bg-[#111523] border border-[#1e263c] hover:border-slate-300 font-pixel text-[9px] text-slate-300 transition-all flex items-center gap-1"
              >
                <RotateCcw className="w-3 h-3" />
                <span>RESET</span>
              </button>

              <button
                onClick={handleClear}
                className="px-3 py-1.5 bg-[#111523] border border-[#1e263c] hover:border-[#ff3344] font-pixel text-[9px] text-[#ff3344] transition-all"
              >
                CLEAR
              </button>
            </div>

          </div>

          {/* Timeline Feed Log Items */}
          <div className="p-6 font-mono text-xs bg-[#0a0c14] min-h-[380px] max-h-[480px] overflow-y-auto space-y-3">
            {logs.map((log) => (
              <div key={log.id} className="p-3 bg-[#111523] border border-[#1e263c] flex items-center gap-3 hover:border-slate-400 transition-all">
                <span className="text-lg">{log.avatar}</span>
                <span className="text-slate-500 text-[10px] shrink-0">{log.time}</span>
                <span 
                  className="font-display font-bold text-xs shrink-0 w-28 uppercase"
                  style={{ color: log.color }}
                >
                  [{log.module}]
                </span>
                <span className="text-slate-200 font-sans text-xs leading-relaxed">
                  {log.message}
                </span>
              </div>
            ))}
            <div ref={feedEndRef} />
          </div>

          {/* Feed Footer Statusbar */}
          <div className="bg-[#0a0c14] px-6 py-3 border-t border-[#1e263c] font-mono text-[11px] text-slate-400 flex items-center justify-between">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#00ff88] animate-ping" />
              <span>SSE STREAMING PORT 4747 // REALTIME BROADCAST</span>
            </span>
            <span className="text-[#00f0ff] font-bold">
              LOG FILE: events.jsonl
            </span>
          </div>

        </div>

      </div>
    </section>
  );
}
