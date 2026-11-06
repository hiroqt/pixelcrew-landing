'use client';

import { useState } from 'react';
import { Check, Copy } from 'lucide-react';

const commands = [
  ['assemble', 'Plan and build a project with a team of agents.'],
  ['blueprint', 'Turn an idea into a clear implementation plan.'],
  ['audit', 'Review your project for quality and accessibility.'],
];

export function CommandShowcase() {
  const [copied, setCopied] = useState<string | null>(null);

  const copyCommand = async (name: string) => {
    const command = `/pixelcrew ${name}`;
    await navigator.clipboard.writeText(command);
    setCopied(name);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <section id="commands" className="py-16 sm:py-20 border-t border-white/[0.06] border-theme">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-8">
          <h2 className="font-pixel text-base sm:text-lg md:text-xl tracking-tight uppercase text-white text-theme-primary">Try a command</h2>
          <p className="mt-3 font-sans text-sm sm:text-base text-slate-400 text-theme-secondary leading-relaxed">
            Start with one of these common tasks. Copy a command and paste it into your coding assistant.
          </p>
        </div>
        <ul className="divide-y divide-white/[0.1] divide-theme">
          {commands.map(([name, description]) => (
            <li key={name} className="flex flex-col sm:flex-row sm:items-center gap-3 py-4">
              <code className="w-40 shrink-0 font-mono text-sm text-[#38bdf8]">/pixelcrew {name}</code>
              <p className="flex-1 text-sm text-slate-400 text-theme-secondary">{description}</p>
              <button
                type="button"
                onClick={() => copyCommand(name)}
                className="inline-flex items-center gap-2 self-start sm:self-auto text-xs text-slate-400 text-theme-secondary hover:text-white hover:text-theme-primary transition-colors cursor-pointer"
                aria-label={`Copy /pixelcrew ${name}`}
              >
                {copied === name ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                {copied === name ? 'Copied' : 'Copy'}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
