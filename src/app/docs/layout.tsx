import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Documentation — PixelCrew',
  description: 'Complete documentation for PixelCrew: installation, commands, agent personas, skills, IDE configuration, and architecture reference.',
};

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
