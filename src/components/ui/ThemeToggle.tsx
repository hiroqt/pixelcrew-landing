'use client';

import { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';

export function ThemeToggle({ className = '' }: { className?: string }) {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem('pixelcrew-theme') as 'dark' | 'light' | null;
    const initialTheme = stored || (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
    setTheme(initialTheme);
    document.documentElement.classList.remove('dark', 'light');
    document.documentElement.classList.add(initialTheme);
    if (document.body) {
      document.body.classList.remove('dark', 'light');
      document.body.classList.add(initialTheme);
    }

    const handleThemeChange = () => {
      const updated = (localStorage.getItem('pixelcrew-theme') as 'dark' | 'light') || 'dark';
      setTheme(updated);
      document.documentElement.classList.remove('dark', 'light');
      document.documentElement.classList.add(updated);
      if (document.body) {
        document.body.classList.remove('dark', 'light');
        document.body.classList.add(updated);
      }
    };

    window.addEventListener('storage', handleThemeChange);
    window.addEventListener('pixelcrew-theme-change', handleThemeChange);
    return () => {
      window.removeEventListener('storage', handleThemeChange);
      window.removeEventListener('pixelcrew-theme-change', handleThemeChange);
    };
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    localStorage.setItem('pixelcrew-theme', nextTheme);
    document.documentElement.classList.remove('dark', 'light');
    document.documentElement.classList.add(nextTheme);
    if (document.body) {
      document.body.classList.remove('dark', 'light');
      document.body.classList.add(nextTheme);
    }
    window.dispatchEvent(new Event('pixelcrew-theme-change'));
  };

  if (!mounted) {
    return (
      <button
        type="button"
        className={`p-2 rounded-md border border-white/[0.08] bg-white/[0.04] text-slate-400 ${className}`}
        aria-label="Toggle theme"
      >
        <Moon className="w-3.5 h-3.5" />
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-md border text-xs font-medium transition-all ${
        theme === 'dark'
          ? 'border-white/[0.08] bg-white/[0.04] hover:bg-white/[0.08] text-slate-300'
          : 'border-slate-300 bg-slate-100 hover:bg-slate-200 text-slate-800'
      } ${className}`}
      title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      {theme === 'dark' ? (
        <>
          <Sun className="w-3.5 h-3.5 text-[#f59e0b]" />
          <span className="hidden sm:inline font-mono text-[11px]">Light</span>
        </>
      ) : (
        <>
          <Moon className="w-3.5 h-3.5 text-[#6366f1]" />
          <span className="hidden sm:inline font-mono text-[11px]">Dark</span>
        </>
      )}
    </button>
  );
}
