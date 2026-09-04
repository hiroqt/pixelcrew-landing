import { Navbar } from '@/components/ui/Navbar';
import { Hero } from '@/components/hero/Hero';
import { ProblemSolution } from '@/components/home/ProblemSolution';
import { Features } from '@/components/features/Features';
import { CommandShowcase } from '@/components/commands/CommandShowcase';
import { ChangelogTeaser } from '@/components/changelog/ChangelogTeaser';
import { Footer } from '@/components/ui/Footer';
import { getChangelogData } from '@/lib/changelog';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function Home() {
  const changelogData = await getChangelogData();

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] relative transition-colors duration-150">
      <Navbar />
      <main>
        <Hero />
        <ProblemSolution />
        <Features />
        <CommandShowcase />
        <ChangelogTeaser initialData={changelogData} />
      </main>
      <Footer />
    </div>
  );
}
