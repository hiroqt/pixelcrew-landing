'use client';

import Link from 'next/link';
import Image from 'next/image';
import { GithubIcon } from '@/components/ui/GithubIcon';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { FooterParticles } from '@/components/ui/FooterParticles';

export function Footer() {
  return (
    <footer className="w-full relative transition-colors duration-150">
      {/* Floating pixel embers */}
      <FooterParticles />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 font-mono text-xs text-slate-400 text-theme-secondary">

          {/* Left: Brand with Mini Pixel Logo */}
          <div className="flex items-center gap-3">
            <Image
              src="/Pixelcrew_logo.png"
              alt="PixelCrew"
              width={22}
              height={22}
              className="rounded"
            />
            <Link
              href="/"
              className="font-pixel text-[11px] text-white text-theme-primary uppercase tracking-tight hover:text-[#38bdf8] transition-colors"
            >
              PIXELCREW
            </Link>
            <span className="text-slate-600 text-theme-muted hidden sm:inline">•</span>
            <span className="text-[11px] text-slate-500 text-theme-muted hidden sm:inline">
              autonomous swarm
            </span>
          </div>

          {/* Center: Navigation Links */}
          <nav aria-label="Footer Navigation" className="flex items-center gap-6 sm:gap-8 text-xs font-mono">
            <Link
              href="/docs"
              className="text-slate-400 hover:text-white text-theme-secondary hover:text-theme-primary transition-colors"
            >
              Docs
            </Link>
            <Link
              href="/changelog"
              className="text-slate-400 hover:text-white text-theme-secondary hover:text-theme-primary transition-colors"
            >
              Changelog
            </Link>
            <a
              href="#commands"
              className="text-slate-400 hover:text-white text-theme-secondary hover:text-theme-primary transition-colors"
            >
              Commands
            </a>
            <Link
              href="/docs?tab=faq"
              className="text-slate-400 hover:text-white text-theme-secondary hover:text-theme-primary transition-colors"
            >
              FAQ
            </Link>
            <a
              href="https://github.com/hiroqt/PixelCrew"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-white text-theme-secondary hover:text-theme-primary transition-colors"
            >
              GitHub
            </a>
          </nav>

          {/* Right: Author & Seamless Socials (No Harsh Dividing Lines) */}
          <div className="flex items-center gap-5 text-xs font-mono text-slate-400 text-theme-secondary">
            <span>
              Created by{' '}
              <a
                href="https://github.com/hiroqt"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white text-theme-primary hover:text-[#38bdf8] transition-colors font-medium"
              >
                @hiroqt
              </a>
            </span>

            {/* Seamless Icons without Dividing Line */}
            <div className="flex items-center gap-3.5">
              {/* LinkedIn */}
              <a
                href="https://linkedin.com/in/hiroqt"
                target="_blank"
                rel="noopener noreferrer"
                title="LinkedIn"
                aria-label="LinkedIn"
                className="text-slate-400 hover:text-white text-theme-secondary hover:text-theme-primary transition-colors flex items-center justify-center"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>

              {/* GitHub */}
              <a
                href="https://github.com/hiroqt/PixelCrew"
                target="_blank"
                rel="noopener noreferrer"
                title="GitHub"
                aria-label="GitHub"
                className="text-slate-400 hover:text-white text-theme-secondary hover:text-theme-primary transition-colors flex items-center justify-center"
              >
                <GithubIcon className="w-3.5 h-3.5" />
              </a>

              {/* Theme Toggle */}
              <ThemeToggle />
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
}
