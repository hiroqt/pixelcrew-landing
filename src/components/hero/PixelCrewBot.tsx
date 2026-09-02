'use client';

import { useState, useEffect, useCallback, useRef } from 'react';

const SIGHTSEEING_MESSAGES = [
  'Sightseeing across Floor 42!',
  'Scanning horizon: 0 AI slop detected.',
  'Great view from up here!',
  'All IDE channels operational.',
  'Observing multi-agent swarm...',
  'Agents 01 through 05 online.',
  'Perimeter secure, no bloat found.',
  'Zero runtime dependencies confirmed.',
];

interface ColorPalette {
  helmet: string;
  helmetStroke: string;
  helmetHighlight: string;
  ear: string;
  earStroke: string;
  visorStroke: string;
  eyes: string;
  torso: string;
  torsoStroke: string;
  insignia: string;
  hands: string;
  handsStroke: string;
  feet: string;
  antennaStem: string;
  antennaTip: string;
  auraFrom: string;
  auraTo: string;
}

const PALETTES: Record<string, ColorPalette> = {
  purple: {
    helmet: '#6d28d9', helmetStroke: '#3b0764', helmetHighlight: '#c084fc',
    ear: '#581c87', earStroke: '#2e1065',
    visorStroke: '#4c1d95', eyes: '#38bdf8',
    torso: '#581c87', torsoStroke: '#2e1065',
    insignia: '#a78bfa', hands: '#a78bfa', handsStroke: '#3b0764',
    feet: '#4c1d95', antennaStem: '#4c1d95', antennaTip: '#38bdf8',
    auraFrom: 'rgba(167,139,250,0.25)', auraTo: 'rgba(56,189,248,0.25)',
  },
  teal: {
    helmet: '#0d9488', helmetStroke: '#134e4a', helmetHighlight: '#5eead4',
    ear: '#115e59', earStroke: '#042f2e',
    visorStroke: '#0f766e', eyes: '#fbbf24',
    torso: '#115e59', torsoStroke: '#042f2e',
    insignia: '#5eead4', hands: '#5eead4', handsStroke: '#134e4a',
    feet: '#0f766e', antennaStem: '#0f766e', antennaTip: '#fbbf24',
    auraFrom: 'rgba(94,234,212,0.25)', auraTo: 'rgba(251,191,36,0.25)',
  },
};

interface PixelCrewBotProps {
  position?: 'top-right' | 'top-left';
  variant?: 'purple' | 'teal';
}

export function PixelCrewBot({ position = 'top-right', variant = 'purple' }: PixelCrewBotProps) {
  const [eyePosition, setEyePosition] = useState<'center' | 'left' | 'right' | 'binoculars'>('center');
  const [isBlinking, setIsBlinking] = useState(false);
  const [speechText, setSpeechText] = useState<string | null>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Walking state
  const [walkX, setWalkX] = useState(0); // 0-100 percent across banner
  const [facingRight, setFacingRight] = useState(position === 'top-left');
  const [walkFrame, setWalkFrame] = useState(0); // 0 or 1 for leg alternation
  const [isPaused, setIsPaused] = useState(false);
  const pauseTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const palette = PALETTES[variant] || PALETTES.purple;

  // Walking animation
  useEffect(() => {
    // Start position based on side
    const startX = position === 'top-left' ? 5 : 85;
    setWalkX(startX);
    setFacingRight(position === 'top-left');
  }, [position]);

  // Walk loop
  useEffect(() => {
    const speed = variant === 'teal' ? 0.12 : 0.1; // slightly different speeds
    const walkInterval = setInterval(() => {
      if (isPaused || isHovered) return;

      setWalkX(prev => {
        let next = facingRight ? prev + speed : prev - speed;

        // Boundary check — turn around at edges
        if (next >= 92) {
          setFacingRight(false);
          // Random pause at edge
          if (Math.random() < 0.3) {
            setIsPaused(true);
            setEyePosition('binoculars');
            pauseTimerRef.current = setTimeout(() => {
              setIsPaused(false);
              setEyePosition('center');
            }, 2000 + Math.random() * 2000);
          }
          next = 92;
        } else if (next <= 3) {
          setFacingRight(true);
          if (Math.random() < 0.3) {
            setIsPaused(true);
            setEyePosition('binoculars');
            pauseTimerRef.current = setTimeout(() => {
              setIsPaused(false);
              setEyePosition('center');
            }, 2000 + Math.random() * 2000);
          }
          next = 3;
        }
        return next;
      });
    }, 30);

    return () => clearInterval(walkInterval);
  }, [facingRight, isPaused, isHovered, variant]);

  // Leg frame animation (alternating every ~280ms when walking)
  useEffect(() => {
    const legInterval = setInterval(() => {
      if (!isPaused && !isHovered) {
        setWalkFrame(prev => (prev + 1) % 4);
      }
    }, 220);
    return () => clearInterval(legInterval);
  }, [isPaused, isHovered]);

  // Eye sightseeing & blink loops
  const lookDelay = position === 'top-left' ? 3600 : 3200;
  const blinkDelay = position === 'top-left' ? 3700 : 4200;

  useEffect(() => {
    const lookInterval = setInterval(() => {
      if (isPaused) return;
      const rand = Math.random();
      if (rand < 0.3) setEyePosition('left');
      else if (rand < 0.6) setEyePosition('right');
      else setEyePosition('center');
    }, lookDelay);

    const blinkInterval = setInterval(() => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 160);
    }, blinkDelay);

    return () => {
      clearInterval(lookInterval);
      clearInterval(blinkInterval);
    };
  }, [lookDelay, blinkDelay, isPaused]);

  // Cleanup pause timer
  useEffect(() => {
    return () => {
      if (pauseTimerRef.current) clearTimeout(pauseTimerRef.current);
    };
  }, []);

  const playChirp = useCallback(() => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'square';
      const baseFreq = variant === 'teal' ? 659.25 : 587.33;
      osc.frequency.setValueAtTime(baseFreq, ctx.currentTime);
      osc.frequency.setValueAtTime(baseFreq * 1.5, ctx.currentTime + 0.07);
      gain.gain.setValueAtTime(0.06, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.14);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.14);
    } catch { /* silent */ }
  }, [variant]);

  const handleBotClick = () => {
    playChirp();
    setSpeechText(SIGHTSEEING_MESSAGES[Math.floor(Math.random() * SIGHTSEEING_MESSAGES.length)]);
    setIsPaused(true);
    setEyePosition('binoculars');
    setTimeout(() => {
      setSpeechText(null);
      setIsPaused(false);
      setEyePosition('center');
    }, 3500);
  };

  // Walking bob offset (subtle vertical bounce)
  const bobY = isPaused || isHovered ? 0 : (walkFrame % 2 === 0 ? -1.5 : 0.5);

  // Leg positions for walk cycle (4 frames)
  const getLeftLegX = () => {
    if (isPaused || isHovered) return 18;
    switch (walkFrame) {
      case 0: return 16;
      case 1: return 18;
      case 2: return 20;
      case 3: return 18;
      default: return 18;
    }
  };
  const getRightLegX = () => {
    if (isPaused || isHovered) return 26;
    switch (walkFrame) {
      case 0: return 28;
      case 1: return 26;
      case 2: return 24;
      case 3: return 26;
      default: return 26;
    }
  };

  // Arm swing
  const getLeftArmY = () => {
    if (isPaused || isHovered) return 28;
    return walkFrame % 2 === 0 ? 27 : 29;
  };
  const getRightArmY = () => {
    if (isPaused || isHovered) return 28;
    return walkFrame % 2 === 0 ? 29 : 27;
  };

  // Speech bubble alignment follows bot
  const bubbleStyle: React.CSSProperties = {
    left: '50%',
    transform: 'translateX(-50%)',
  };

  return (
    <div
      className="absolute z-20 select-none cursor-pointer group"
      style={{
        left: `${walkX}%`,
        top: '-28px',
        transition: 'left 30ms linear',
      }}
      onClick={handleBotClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      title="PixelCrew Scout Bot"
    >
      {/* Speech bubble */}
      {(speechText || isHovered) && (
        <div
          className="absolute -top-11 pointer-events-none whitespace-nowrap z-30"
          style={bubbleStyle}
        >
          <div
            className="px-2 py-1.5 rounded shadow-xl text-[8px] font-pixel flex items-center gap-1.5"
            style={{
              background: '#0f172a',
              border: `1px solid ${palette.insignia}50`,
              color: palette.eyes,
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
            <span>{speechText || 'Sightseeing...'}</span>
          </div>
          <div
            className="w-2 h-2 mx-auto -mt-1"
            style={{
              background: '#0f172a',
              borderRight: `1px solid ${palette.insignia}50`,
              borderBottom: `1px solid ${palette.insignia}50`,
              transform: 'rotate(45deg)',
            }}
          />
        </div>
      )}

      {/* Bot SVG */}
      <div
        className="relative transition-transform duration-150 group-hover:scale-110"
        style={{
          transform: `scaleX(${facingRight ? 1 : -1}) translateY(${bobY}px)`,
          transition: 'transform 150ms ease',
        }}
      >
        <svg width="48" height="52" viewBox="0 0 48 52" fill="none" xmlns="http://www.w3.org/2000/svg"
          className="drop-shadow-[0_2px_6px_rgba(0,0,0,0.6)]"
        >
          {/* Antenna */}
          <rect x="23" y="2" width="2" height="4" fill={palette.antennaStem} />
          <circle cx="24" cy="2" r="2" fill={palette.antennaTip} className="animate-pulse" />

          {/* Helmet */}
          <rect x="12" y="6" width="24" height="20" rx="5" fill={palette.helmet} stroke={palette.helmetStroke} strokeWidth="1.5" />
          <rect x="16" y="7.5" width="8" height="1.5" rx="0.75" fill={palette.helmetHighlight} fillOpacity="0.55" />

          {/* Ears */}
          <rect x="9" y="13" width="3" height="6" rx="1.5" fill={palette.ear} stroke={palette.earStroke} strokeWidth="0.8" />
          <rect x="36" y="13" width="3" height="6" rx="1.5" fill={palette.ear} stroke={palette.earStroke} strokeWidth="0.8" />

          {/* Visor */}
          <rect x="15" y="12" width="18" height="11" rx="2.5" fill="#07080c" stroke={palette.visorStroke} strokeWidth="1" />
          <path d="M16.5 13 L21 13 L18 17 L16.5 17 Z" fill="white" fillOpacity="0.1" />

          {/* Eyes */}
          {eyePosition === 'binoculars' ? (
            <g>
              <rect x="16" y="14.5" width="6.5" height="5.5" rx="1.5" fill="#1e1b4b" stroke={palette.eyes} strokeWidth="1" />
              <rect x="25" y="14.5" width="6.5" height="5.5" rx="1.5" fill="#1e1b4b" stroke={palette.eyes} strokeWidth="1" />
              <circle cx="19.25" cy="17.25" r="1.5" fill={palette.eyes} opacity="0.85" />
              <circle cx="28.25" cy="17.25" r="1.5" fill={palette.eyes} opacity="0.85" />
              <rect x="22.5" y="16.5" width="2.5" height="1.5" fill={palette.eyes} />
            </g>
          ) : isBlinking ? (
            <g fill={palette.eyes}>
              <rect x="17.5" y="17.5" width="4" height="1" rx="0.5" />
              <rect x="26.5" y="17.5" width="4" height="1" rx="0.5" />
            </g>
          ) : (
            <g fill={palette.eyes}>
              <rect
                x={eyePosition === 'left' ? 16.5 : eyePosition === 'right' ? 19 : 17.5}
                y="15.5" width="3.5" height="3.5" rx="0.8"
              />
              <rect
                x={eyePosition === 'left' ? 25.5 : eyePosition === 'right' ? 28 : 26.5}
                y="15.5" width="3.5" height="3.5" rx="0.8"
              />
            </g>
          )}

          {/* Torso */}
          <rect x="16" y="26" width="16" height="10" rx="2.5" fill={palette.torso} stroke={palette.torsoStroke} strokeWidth="1" />
          {/* Chest insignia */}
          <rect x="22" y="29" width="4" height="4" rx="1" fill={palette.insignia} />
          <rect x="23" y="30" width="1.5" height="1.5" fill="#07080c" />

          {/* Arms (swing with walk) */}
          <rect x="12" y={getLeftArmY()} width="4" height="6" rx="2" fill={palette.hands} stroke={palette.handsStroke} strokeWidth="0.6" />
          <rect x="32" y={getRightArmY()} width="4" height="6" rx="2" fill={palette.hands} stroke={palette.handsStroke} strokeWidth="0.6" />

          {/* Legs (walk cycle) */}
          <rect x={getLeftLegX()} y="36" width="4" height="6" rx="1.5" fill={palette.feet} />
          <rect x={getRightLegX()} y="36" width="4" height="6" rx="1.5" fill={palette.feet} />

          {/* Little pixel shoes */}
          <rect x={getLeftLegX() - 0.5} y="41" width="5" height="2.5" rx="1" fill={palette.helmetStroke} />
          <rect x={getRightLegX() - 0.5} y="41" width="5" height="2.5" rx="1" fill={palette.helmetStroke} />
        </svg>
      </div>
    </div>
  );
}
