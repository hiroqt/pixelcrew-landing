/**
 * PIXEL CREW Web Utility Helpers
 */

// Singleton Web Audio API Context to avoid multi-context limits and auto-play suspensions
let sharedAudioCtx: AudioContext | null = null;

export function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  try {
    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtx) return null;
    if (!sharedAudioCtx || sharedAudioCtx.state === 'closed') {
      sharedAudioCtx = new AudioCtx();
    }
    if (sharedAudioCtx.state === 'suspended') {
      sharedAudioCtx.resume().catch(() => {});
    }
    return sharedAudioCtx;
  } catch {
    return null;
  }
}

// Global audio preference state (defaults to true)
export function isAudioEnabled(): boolean {
  if (typeof window === 'undefined') return true;
  try {
    const stored = localStorage.getItem('pixelcrew-audio');
    if (stored !== null) return stored === 'true';
  } catch {
    // fallback
  }
  return true;
}

export function setAudioEnabled(enabled: boolean): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem('pixelcrew-audio', String(enabled));
  } catch {
    // fallback
  }
  window.dispatchEvent(new CustomEvent('pixelcrew-audio-change', { detail: { enabled } }));
}

export function toggleAudioEnabled(): boolean {
  const next = !isAudioEnabled();
  setAudioEnabled(next);
  if (next) {
    playChiptuneSound('select');
  }
  return next;
}

// Simple Web Audio API 8-bit chiptune sound generator for retro feedback
export function playChiptuneSound(type: 'click' | 'select' | 'assemble' | 'success' | 'alert' | 'scroll' | 'blip') {
  if (typeof window === 'undefined') return;
  if (!isAudioEnabled()) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    if (ctx.state === 'suspended') {
      ctx.resume().catch(() => {});
    }

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    if (type === 'scroll') {
      // Crisp 18ms tactile rotary tick
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(750, now);
      osc.frequency.exponentialRampToValueAtTime(320, now + 0.018);
      gain.gain.setValueAtTime(0.045, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.018);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.018);
      return;
    }

    if (type === 'blip') {
      // Gentle terminal teletype blip
      osc.type = 'square';
      osc.frequency.setValueAtTime(920, now);
      gain.gain.setValueAtTime(0.02, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.025);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.025);
      return;
    }

    osc.type = type === 'assemble' ? 'sawtooth' : 'square';

    if (type === 'click') {
      osc.frequency.setValueAtTime(440, now);
      gain.gain.setValueAtTime(0.05, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
      osc.start(now);
      osc.stop(now + 0.08);
    } else if (type === 'select') {
      osc.frequency.setValueAtTime(587.33, now);
      osc.frequency.setValueAtTime(880, now + 0.05);
      gain.gain.setValueAtTime(0.06, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
      osc.start(now);
      osc.stop(now + 0.12);
    } else if (type === 'assemble') {
      osc.frequency.setValueAtTime(220, now);
      osc.frequency.linearRampToValueAtTime(880, now + 0.25);
      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
      osc.start(now);
      osc.stop(now + 0.3);
    } else if (type === 'success') {
      osc.frequency.setValueAtTime(523.25, now);
      osc.frequency.setValueAtTime(659.25, now + 0.08);
      osc.frequency.setValueAtTime(783.99, now + 0.16);
      osc.frequency.setValueAtTime(1046.50, now + 0.24);
      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
      osc.start(now);
      osc.stop(now + 0.4);
    } else if (type === 'alert') {
      osc.frequency.setValueAtTime(300, now);
      osc.frequency.setValueAtTime(150, now + 0.1);
      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
      osc.start(now);
      osc.stop(now + 0.2);
    }
    
    osc.connect(gain);
    gain.connect(ctx.destination);
  } catch {
    // ignore audio errors if user interacted before context allowed
  }
}

export function formatTimestamp(date: Date = new Date()): string {
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');
  return `${hours}:${minutes}:${seconds}`;
}
