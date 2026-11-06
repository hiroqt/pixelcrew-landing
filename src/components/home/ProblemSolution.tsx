import { Check } from 'lucide-react';

const benefits = [
  ['Stay organized', 'Keep work clear from start to finish.'],
  ['Share the work', 'Let agents handle different tasks.'],
  ['Ship with confidence', 'Check changes before they go live.'],
];

export function ProblemSolution() {
  return (
    <section id="problem-solution" className="py-16 sm:py-20 border-t border-white/[0.06] border-theme">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-10">
          <h2 className="font-pixel text-base sm:text-lg md:text-xl tracking-tight uppercase text-white text-theme-primary">A clearer way to work with AI</h2>
          <p className="mt-3 font-sans text-sm sm:text-base text-slate-400 text-theme-secondary leading-relaxed">
            AI can write code quickly. PixelCrew helps you plan the work, share it across agents, and check what they build.
          </p>
        </div>
        <ul className="grid gap-5 sm:grid-cols-3">
          {benefits.map(([title, description]) => (
            <li key={title} className="flex items-start gap-3 border-t border-white/[0.1] border-theme pt-4">
              <Check className="w-4 h-4 mt-0.5 text-emerald-400 shrink-0" aria-hidden="true" />
              <div>
                <h3 className="text-sm font-semibold text-white text-theme-primary">{title}</h3>
                <p className="mt-1 text-sm text-slate-400 text-theme-secondary">{description}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
