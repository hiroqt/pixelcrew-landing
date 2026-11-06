const steps = [
  ['01', 'Describe', 'Tell your assistant what you want to build.'],
  ['02', 'Create', 'Let PixelCrew organize the work for your agents.'],
  ['03', 'Review', 'Check the changes before you ship.'],
];

export function Features() {
  return (
    <section id="features" className="py-16 sm:py-20 border-t border-white/[0.06] border-theme">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-10">
          <h2 className="font-pixel text-base sm:text-lg md:text-xl tracking-tight uppercase text-white text-theme-primary">From idea to reviewed code</h2>
          <p className="mt-3 font-sans text-sm sm:text-base text-slate-400 text-theme-secondary leading-relaxed">
            Follow a simple workflow. You stay in control at every step.
          </p>
        </div>
        <ol className="divide-y divide-white/[0.1] divide-theme">
          {steps.map(([number, title, description]) => (
            <li key={number} className="grid grid-cols-[3rem_1fr] sm:grid-cols-[4rem_10rem_1fr] gap-3 py-5">
              <span className="font-mono text-sm text-slate-500">{number}</span>
              <h3 className="text-base font-semibold text-white text-theme-primary">{title}</h3>
              <p className="col-start-2 sm:col-start-auto text-sm text-slate-400 text-theme-secondary">{description}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
