import Link from 'next/link';

export function Footer() {
  return (
    <footer className="border-t border-white/[0.06] border-theme">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex items-center justify-between gap-4 text-xs text-slate-400 text-theme-secondary">
        <Link href="/" className="font-semibold text-white text-theme-primary">
          PixelCrew
        </Link>
        <nav aria-label="Footer navigation" className="flex items-center gap-5">
          <Link href="/docs" className="hover:text-white hover:text-theme-primary transition-colors">Docs</Link>
          <Link href="/changelog" className="hover:text-white hover:text-theme-primary transition-colors">Changelog</Link>
          <a href="https://github.com/hiroqt/PixelCrew" target="_blank" rel="noopener noreferrer" className="hover:text-white hover:text-theme-primary transition-colors">GitHub</a>
        </nav>
      </div>
    </footer>
  );
}
