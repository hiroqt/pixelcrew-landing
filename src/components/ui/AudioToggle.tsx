'use client';

import { useState, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { isAudioEnabled, toggleAudioEnabled } from '@/lib/pixelcrew';

export function AudioToggle({ className = '' }: { className?: string }) {
  const [enabled, setEnabled] = useState<boolean>(true);
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
    setEnabled(isAudioEnabled());

    const handleAudioChange = (e: Event) => {
      const custom = e as CustomEvent<{ enabled: boolean }>;
      if (custom.detail && typeof custom.detail.enabled === 'boolean') {
        setEnabled(custom.detail.enabled);
      } else {
        setEnabled(isAudioEnabled());
      }
    };

    window.addEventListener('pixelcrew-audio-change', handleAudioChange);
    return () => {
      window.removeEventListener('pixelcrew-audio-change', handleAudioChange);
    };
  }, []);

  const handleToggle = () => {
    const next = toggleAudioEnabled();
    setEnabled(next);
  };

  if (!mounted) {
    return (
      <button
        type="button"
        className={`p-2 rounded-md border border-white/[0.08] bg-white/[0.04] text-slate-400 ${className}`}
        aria-label="Toggle sound"
      >
        <Volume2 className="w-3.5 h-3.5 opacity-60" />
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={handleToggle}
      className={`p-2 rounded-md border transition-all cursor-pointer flex items-center justify-center ${
        enabled
          ? 'border-emerald-500/40 text-emerald-400 bg-emerald-500/10 hover:bg-emerald-500/20 shadow-sm shadow-emerald-500/10'
          : 'border-white/[0.08] bg-white/[0.04] hover:bg-white/[0.08] text-slate-400 hover:text-white text-theme-muted'
      } ${className}`}
      title={enabled ? 'Sound On (Click to mute)' : 'Sound Muted (Click to turn on)'}
      aria-label={enabled ? 'Sound On' : 'Sound Muted'}
    >
      {enabled ? (
        <Volume2 className="w-3.5 h-3.5 text-emerald-400" />
      ) : (
        <VolumeX className="w-3.5 h-3.5 opacity-75" />
      )}
    </button>
  );
}
