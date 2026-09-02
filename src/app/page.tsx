'use client';

import { Navbar } from '@/components/ui/Navbar';
import { Hero } from '@/components/hero/Hero';
import { ProblemSolution } from '@/components/home/ProblemSolution';
import { Features } from '@/components/features/Features';
import { CommandShowcase } from '@/components/commands/CommandShowcase';
import { Footer } from '@/components/ui/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] relative transition-colors duration-150">
      <Navbar />
      <main>
        <Hero />
        <ProblemSolution />
        <Features />
        <CommandShowcase />
      </main>
      <Footer />
    </div>
  );
}
