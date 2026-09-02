'use client';

import Link from 'next/link';
import Image from 'next/image';
import { GithubIcon } from '@/components/ui/GithubIcon';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { AudioToggle } from '@/components/ui/AudioToggle';

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 header-theme bg-[#07080c]/90 backdrop-blur-md border-b border-white/[0.06] transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
        
        {/* Brand */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <Image
            src="/Pixelcrew_logo.png"
            alt="PixelCrew"
            width={28}
            height={28}
            className="rounded"
          />
          <span className="font-display font-bold text-sm tracking-tight text-white text-theme-primary">
            PixelCrew
          </span>
        </Link>

        {/* Navigation */}
        <nav className="flex items-center gap-2.5 sm:gap-3.5">
          <a
            href="#commands"
            className="text-xs font-medium text-slate-400 hover:text-white text-theme-secondary transition-colors hidden sm:block"
          >
            Commands
          </a>
          <Link
            href="/docs"
            className="text-xs font-medium text-slate-400 hover:text-white text-theme-secondary transition-colors hidden sm:block"
          >
            Docs
          </Link>
          <AudioToggle />
          <ThemeToggle />
          <a
            href="https://github.com/hiroqt/PixelCrew"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-white/[0.06] border border-white/[0.08] hover:bg-white/[0.1] hover:border-white/[0.14] text-slate-200 text-theme-primary text-xs font-medium transition-all"
          >
            <GithubIcon className="w-3.5 h-3.5" />
            <span>GitHub</span>
          </a>
        </nav>
      </div>
    </header>
  );
}
