import { Metadata } from 'next';
import { Navbar } from '@/components/ui/Navbar';
import { Footer } from '@/components/ui/Footer';
import { ChangelogView } from '@/components/changelog/ChangelogView';
import { getChangelogData } from '@/lib/changelog';

export const metadata: Metadata = {
  title: 'Changelog & Sprint Activity — Pixel Crew',
  description: 'Live development activity, official releases, and commit telemetry synced directly from GitHub hiroqt/PixelCrew.',
  openGraph: {
    title: 'Changelog & Sprint Activity — Pixel Crew',
    description: 'Live development activity, official releases, and commit telemetry synced directly from GitHub hiroqt/PixelCrew.',
    url: 'https://pixelcrew.dev/changelog',
    siteName: 'Pixel Crew',
    locale: 'en_US',
    type: 'website',
  }
};

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function ChangelogPage() {
  const initialData = await getChangelogData();

  return (
    <div className="min-h-screen flex flex-col bg-[var(--background)] text-[var(--foreground)] transition-colors duration-150">
      <Navbar />
      <main className="flex-1">
        <ChangelogView initialData={initialData} />
      </main>
      <Footer />
    </div>
  );
}
