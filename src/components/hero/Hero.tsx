'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Check, Copy } from 'lucide-react';

export function Hero() {
  const [copied, setCopied] = useState(false);

  const copyInstall = async () => {
    await navigator.clipboard.writeText('npx pixelcrew init');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="relative overflow-hidden py-16 sm:py-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-2xl mx-auto text-center space-y-5">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-pixel tracking-tight text-white text-theme-primary leading-tight uppercase">
            Build better software,
            <br />
            <span className="shining-text">with your AI tools</span>
          </h1>
          <p className="max-w-xl mx-auto text-sm sm:text-base text-slate-400 text-theme-secondary leading-relaxed">
            PixelCrew helps your AI tools plan, build, and check your code.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <button
              onClick={copyInstall}
              className="inline-flex items-center gap-2 border border-white/[0.12] border-theme bg-white/[0.06] bg-theme-card-hover px-4 py-2.5 rounded-md font-mono text-sm text-white text-theme-primary transition-colors hover:bg-white/[0.12] cursor-pointer"
              aria-label="Copy install command"
            >
              <span className="opacity-50">$</span>
              <span>npx pixelcrew init</span>
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 opacity-50" />}
            </button>
            <Link
              href="/docs"
              className="text-sm text-slate-400 text-theme-secondary hover:text-white hover:text-theme-primary transition-colors"
            >
              How it works
            </Link>
          </div>
        </div>

        <div className="mt-12 sm:mt-16 overflow-hidden rounded-lg border border-white/[0.08] shadow-2xl shadow-black/30">
          <Image
            src="/banner.png"
            alt="PixelCrew coding agents working together"
            width={1920}
            height={600}
            className="w-full h-auto block"
            priority
          />
        </div>
      </div>
    </section>
  );
}
