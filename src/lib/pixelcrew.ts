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
    return sharedAudioCtx;
  } catch {
    return null;
  }
}

// Ensure the audio context is unlocked on user gesture (required by Chrome/Safari autoplay policies)
export function unlockAudioContext(): void {
  if (typeof window === 'undefined') return;
  const ctx = getAudioContext();
  if (ctx && ctx.state === 'suspended') {
    ctx.resume().catch(() => {});
  }
}

// Attach one-time unlock listeners on the browser window
if (typeof window !== 'undefined') {
  const handleUnlock = () => {
    unlockAudioContext();
  };
  window.addEventListener('pointerdown', handleUnlock, { once: true, capture: true, passive: true });
  window.addEventListener('keydown', handleUnlock, { once: true, capture: true, passive: true });
  window.addEventListener('touchstart', handleUnlock, { once: true, capture: true, passive: true });
  window.addEventListener('click', handleUnlock, { once: true, capture: true, passive: true });
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
  unlockAudioContext();
  const next = !isAudioEnabled();
  setAudioEnabled(next);
  if (next) {
    playChiptuneSound('select');
  }
  return next;
}

// Web Audio API 8-bit chiptune sound generator for retro feedback
export function playChiptuneSound(type: 'click' | 'select' | 'assemble' | 'success' | 'alert' | 'scroll' | 'blip') {
  if (typeof window === 'undefined') return;
  if (!isAudioEnabled()) return;

  const ctx = getAudioContext();
  if (!ctx) return;

  const runTone = () => {
    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      // Connect graph before starting playback
      osc.connect(gain);
      gain.connect(ctx.destination);

      if (type === 'scroll') {
        // Crisp 30ms tactile rotary tick
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(750, now);
        osc.frequency.exponentialRampToValueAtTime(320, now + 0.03);
        gain.gain.setValueAtTime(0.12, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.03);
        osc.start(now);
        osc.stop(now + 0.03);
        return;
      }

      if (type === 'blip') {
        // Clear teletype terminal typewriter blip
        osc.type = 'square';
        osc.frequency.setValueAtTime(920, now);
        gain.gain.setValueAtTime(0.08, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.035);
        osc.start(now);
        osc.stop(now + 0.035);
        return;
      }

      osc.type = type === 'assemble' ? 'sawtooth' : 'square';

      if (type === 'click') {
        osc.frequency.setValueAtTime(480, now);
        gain.gain.setValueAtTime(0.14, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.07);
        osc.start(now);
        osc.stop(now + 0.07);
      } else if (type === 'select') {
        osc.frequency.setValueAtTime(587.33, now);
        osc.frequency.setValueAtTime(880, now + 0.05);
        gain.gain.setValueAtTime(0.15, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
        osc.start(now);
        osc.stop(now + 0.12);
      } else if (type === 'assemble') {
        osc.frequency.setValueAtTime(220, now);
        osc.frequency.linearRampToValueAtTime(880, now + 0.22);
        gain.gain.setValueAtTime(0.16, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.28);
        osc.start(now);
        osc.stop(now + 0.28);
      } else if (type === 'success') {
        osc.frequency.setValueAtTime(523.25, now);
        osc.frequency.setValueAtTime(659.25, now + 0.08);
        osc.frequency.setValueAtTime(783.99, now + 0.16);
        osc.frequency.setValueAtTime(1046.50, now + 0.24);
        gain.gain.setValueAtTime(0.16, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.38);
        osc.start(now);
        osc.stop(now + 0.38);
      } else if (type === 'alert') {
        osc.frequency.setValueAtTime(320, now);
        osc.frequency.setValueAtTime(160, now + 0.09);
        gain.gain.setValueAtTime(0.16, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);
        osc.start(now);
        osc.stop(now + 0.18);
      }
    } catch {
      // ignore
    }
  };

  // If suspended, await resume resolution before starting oscillator so sound isn't dropped
  if (ctx.state === 'suspended') {
    ctx.resume().then(() => {
      runTone();
    }).catch(() => {
      runTone();
    });
  } else {
    runTone();
  }
}

export function formatTimestamp(date: Date = new Date()): string {
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');
  return `${hours}:${minutes}:${seconds}`;
}
