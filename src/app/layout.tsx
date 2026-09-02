import type { Metadata } from "next";
import { Press_Start_2P, Space_Grotesk, JetBrains_Mono, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const pressStart2P = Press_Start_2P({
  weight: "400",
  variable: "--font-pixel",
  subsets: ["latin"],
  display: "swap"
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap"
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap"
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap"
});

export const metadata: Metadata = {
  title: "Pixel Crew — Universal Software Engineering Swarm",
  description: "Pixel Crew orchestrates specialized software engineering skills and AI agents to build modern software across 6+ AI IDE providers.",
  keywords: [
    "Pixel Crew",
    "Multi-Agent Swarm",
    "AI Software Engineering",
    "Impeccable Design",
    "Anti-AI Rubric",
    "Antigravity",
    "Claude Code",
    "Cursor AI",
    "Orchestration"
  ],
  authors: [{ name: "Arnel (@hiroqt)", url: "https://github.com/hiroqt" }],
  openGraph: {
    title: "Pixel Crew — Universal Software Engineering Swarm",
    description: "Pixel Crew orchestrates specialized software engineering skills and AI agents to build modern software.",
    url: "https://pixelcrew.dev",
    siteName: "Pixel Crew",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pixel Crew — Universal Software Engineering Swarm",
    description: "Pixel Crew orchestrates specialized software engineering skills and AI agents to build modern software.",
    creator: "@hiroqt"
  },
  robots: {
    index: true,
    follow: true,
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${pressStart2P.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} ${plusJakartaSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[var(--background)] text-[var(--foreground)] font-sans selection:bg-[#f59e0b] selection:text-[#07080c] transition-colors duration-150">
        <div className="grain-overlay" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}
