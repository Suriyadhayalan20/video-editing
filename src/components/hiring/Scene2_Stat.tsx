import React from 'react';
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig, Easing } from 'remotion';
import { ATNA_THEME } from '../../theme';

export const Scene2_Stat: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Counter animation: 0 -> 39 over 60 frames
  const counterRaw = interpolate(frame, [10, 70], [0, 39], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });
  const counter = Math.round(counterRaw);

  const containerEntrance = spring({
    fps,
    frame,
    config: { damping: 18, stiffness: 70 },
  });

  // Tick marks ascending
  const tickCount = 39;

  const captionOpacity = interpolate(frame, [70, 100], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const subOpacity = interpolate(frame, [120, 150], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const exitFade = interpolate(frame, [240, 270], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#FFFFFF',
        fontFamily: ATNA_THEME.fontFamily,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        opacity: exitFade,
        overflow: 'hidden',
      }}
    >
      {/* Background grid */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'linear-gradient(#0000000A 1px, transparent 1px), linear-gradient(90deg, #0000000A 1px, transparent 1px)',
          backgroundSize: '80px 80px',
          opacity: 0.6,
        }}
      />

      {/* Top eyebrow label */}
      <div
        style={{
          fontSize: 13,
          fontWeight: 800,
          color: ATNA_THEME.mintTeal,
          letterSpacing: '4px',
          marginBottom: 32,
          opacity: containerEntrance,
          transform: `translateY(${interpolate(containerEntrance, [0, 1], [10, 0])}px)`,
        }}
      >
        THE PROBLEM
      </div>

      {/* Huge counter */}
      <div
        style={{
          display: 'flex',
          alignItems: 'baseline',
          gap: 20,
          opacity: containerEntrance,
          transform: `scale(${interpolate(containerEntrance, [0, 1], [0.92, 1])})`,
        }}
      >
        <span
          style={{
            fontSize: 280,
            fontWeight: 900,
            color: ATNA_THEME.blackTypography,
            letterSpacing: '-12px',
            lineHeight: 1,
            fontVariantNumeric: 'tabular-nums',
            fontFamily: "'Plus Jakarta Sans', sans-serif",
          }}
        >
          {counter}
        </span>
        <span
          style={{
            fontSize: 64,
            fontWeight: 500,
            color: '#6B7280',
            letterSpacing: '-2px',
          }}
        >
          seconds
        </span>
      </div>

      {/* Caption */}
      <p
        style={{
          fontSize: 28,
          fontWeight: 500,
          color: ATNA_THEME.blackTypography,
          marginTop: 24,
          letterSpacing: '-0.5px',
          opacity: captionOpacity,
          transform: `translateY(${interpolate(captionOpacity, [0, 1], [10, 0])}px)`,
        }}
      >
        That's how often a new synthetic identity is created.
      </p>

      {/* Sub stat */}
      <div
        style={{
          marginTop: 80,
          display: 'flex',
          gap: 80,
          opacity: subOpacity,
          transform: `translateY(${interpolate(subOpacity, [0, 1], [12, 0])}px)`,
        }}
      >
        {[
          { val: '$8.6B', label: 'Onboarding fraud, 2025' },
          { val: '1 in 4', label: 'Applications flagged' },
          { val: '94%', label: 'Pass legacy KYC' },
        ].map((item) => (
          <div key={item.label} style={{ textAlign: 'center' }}>
            <div
              style={{
                fontSize: 52,
                fontWeight: 800,
                color: ATNA_THEME.blackTypography,
                letterSpacing: '-1.5px',
              }}
            >
              {item.val}
            </div>
            <div
              style={{
                fontSize: 14,
                color: '#6B7280',
                marginTop: 6,
                letterSpacing: '0.5px',
                textTransform: 'uppercase',
                fontWeight: 600,
              }}
            >
              {item.label}
            </div>
          </div>
        ))}
      </div>

      {/* Tick row at the bottom */}
      <div
        style={{
          position: 'absolute',
          bottom: 60,
          display: 'flex',
          gap: 4,
          opacity: containerEntrance * 0.7,
        }}
      >
        {Array.from({ length: tickCount }).map((_, i) => {
          const litThreshold = (i / tickCount) * 70 + 10;
          const lit = frame >= litThreshold;
          return (
            <div
              key={i}
              style={{
                width: 12,
                height: lit ? 24 : 12,
                borderRadius: 2,
                backgroundColor: lit ? ATNA_THEME.mintTeal : '#E5E7EB',
              }}
            />
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
