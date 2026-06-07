import React from 'react';
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig, Easing } from 'remotion';
import { ATNA_THEME } from '../../theme';

export const Scene1_ColdOpen: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const pulseScale = interpolate(
    frame % 60,
    [0, 30, 60],
    [1, 1.6, 1],
    { easing: Easing.bezier(0.4, 0, 0.2, 1) },
  );
  const pulseOpacity = interpolate(
    frame % 60,
    [0, 30, 60],
    [0.9, 0, 0.9],
  );

  const dotOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: 'clamp' });
  const dotScale = spring({ fps, frame, config: { damping: 14, stiffness: 90 } });

  const line1Reveal = interpolate(frame, [40, 75], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });
  const line1Out = interpolate(frame, [100, 115], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const line2Reveal = interpolate(frame, [115, 150], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  const line1Visible = frame < 115;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#000000',
        fontFamily: ATNA_THEME.fontFamily,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
      }}
    >
      {/* Subtle grain via radial gradient */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `radial-gradient(circle at 50% 50%, ${ATNA_THEME.mintTeal}10 0%, transparent 60%)`,
        }}
      />

      {/* Pulsing dot */}
      <div
        style={{
          position: 'absolute',
          width: 28,
          height: 28,
          borderRadius: '50%',
          backgroundColor: ATNA_THEME.mintTeal,
          opacity: dotOpacity,
          transform: `scale(${dotScale})`,
          boxShadow: `0 0 50px ${ATNA_THEME.mintTeal}`,
          top: '36%',
        }}
      />
      {/* Pulse ring */}
      <div
        style={{
          position: 'absolute',
          width: 28,
          height: 28,
          borderRadius: '50%',
          border: `2px solid ${ATNA_THEME.mintTeal}`,
          opacity: pulseOpacity * dotOpacity,
          transform: `scale(${pulseScale * 2.5})`,
          top: '36%',
        }}
      />

      {/* Typography */}
      <div
        style={{
          position: 'absolute',
          bottom: '32%',
          textAlign: 'center',
          width: '100%',
        }}
      >
        {line1Visible && (
          <h1
            style={{
              fontSize: 84,
              fontWeight: 200,
              color: '#FFFFFF',
              letterSpacing: '-3px',
              margin: 0,
              opacity: line1Reveal * line1Out,
              transform: `translateY(${interpolate(line1Reveal, [0, 1], [20, 0])}px)`,
              fontFamily: "'Plus Jakarta Sans', sans-serif",
            }}
          >
            We don't see customers.
          </h1>
        )}
        {!line1Visible && (
          <h1
            style={{
              fontSize: 96,
              fontWeight: 800,
              color: '#FFFFFF',
              letterSpacing: '-4px',
              margin: 0,
              opacity: line2Reveal,
              transform: `translateY(${interpolate(line2Reveal, [0, 1], [20, 0])}px)`,
              fontFamily: "'Plus Jakarta Sans', sans-serif",
            }}
          >
            We see <span style={{ color: ATNA_THEME.mintTeal }}>signals</span>.
          </h1>
        )}
      </div>
    </AbsoluteFill>
  );
};
