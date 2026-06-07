import React from 'react';
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig, Easing, Sequence } from 'remotion';
import { AnimatedLogo } from '../AnimatedLogo';
import { ATNA_THEME } from '../../theme';

const ROLES = [
  { title: 'Senior Software Engineer, Risk Platform', loc: 'Remote · Bangalore · NYC' },
  { title: 'ML Research Engineer, Adaptive Models', loc: 'Remote · London' },
  { title: 'Product Designer, Trust & Safety', loc: 'Remote · SF' },
  { title: 'Solutions Engineer, Onboarding', loc: 'NYC · Singapore' },
  { title: 'Engineering Manager, Decisioning', loc: 'Remote · Bangalore' },
];

const RolesList: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({
    fps,
    frame,
    config: { damping: 20, stiffness: 70 },
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#000000',
        fontFamily: ATNA_THEME.fontFamily,
        padding: '90px 120px',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      {/* Ambient glow */}
      <div
        style={{
          position: 'absolute',
          width: 900,
          height: 900,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${ATNA_THEME.mintTeal}12 0%, transparent 70%)`,
          top: '-20%',
          right: '-20%',
          filter: 'blur(50px)',
        }}
      />

      <div
        style={{
          opacity: entrance,
          transform: `translateY(${interpolate(entrance, [0, 1], [16, 0])}px)`,
        }}
      >
        <div
          style={{
            fontSize: 13,
            fontWeight: 800,
            color: ATNA_THEME.mintTeal,
            letterSpacing: '4px',
            marginBottom: 18,
          }}
        >
          OPEN ROLES
        </div>
        <h2
          style={{
            fontSize: 84,
            fontWeight: 800,
            color: '#FFFFFF',
            letterSpacing: '-3px',
            margin: '0 0 60px 0',
            lineHeight: 1.02,
            fontFamily: "'Plus Jakarta Sans', sans-serif",
          }}
        >
          Build with us.
        </h2>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
        {ROLES.map((role, i) => {
          const delay = 20 + i * 10;
          const op = interpolate(frame, [delay, delay + 20], [0, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          });
          const tx = interpolate(frame, [delay, delay + 20], [-30, 0], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          });

          return (
            <div
              key={role.title}
              style={{
                opacity: op,
                transform: `translateX(${tx}px)`,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '22px 0',
                borderBottom: '1px solid rgba(255,255,255,0.08)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 28 }}>
                <span
                  style={{
                    color: ATNA_THEME.mintTeal,
                    fontSize: 14,
                    fontWeight: 700,
                    fontVariantNumeric: 'tabular-nums',
                    letterSpacing: '2px',
                    width: 40,
                  }}
                >
                  0{i + 1}
                </span>
                <span
                  style={{
                    color: '#FFFFFF',
                    fontSize: 28,
                    fontWeight: 700,
                    letterSpacing: '-0.8px',
                  }}
                >
                  {role.title}
                </span>
              </div>
              <span
                style={{
                  color: '#94A3B8',
                  fontSize: 15,
                  fontWeight: 500,
                  letterSpacing: '0.3px',
                }}
              >
                {role.loc}
              </span>
            </div>
          );
        })}
      </div>

      <div
        style={{
          marginTop: 50,
          fontSize: 16,
          color: '#6B7280',
          fontWeight: 500,
          opacity: interpolate(frame, [80, 120], [0, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          }),
        }}
      >
        + 14 more roles across product, infra, and go-to-market.
      </div>
    </AbsoluteFill>
  );
};

const EndCard: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({
    fps,
    frame,
    config: { damping: 18, stiffness: 60 },
  });

  const headlineOp = interpolate(frame, [10, 35], [0, 1], { extrapolateRight: 'clamp' });
  const urlOp = interpolate(frame, [40, 65], [0, 1], { extrapolateRight: 'clamp' });
  const buttonPulse = 1 + Math.sin(frame * 0.08) * 0.025;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#FFFFFF',
        fontFamily: ATNA_THEME.fontFamily,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          position: 'absolute',
          width: 1000,
          height: 1000,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${ATNA_THEME.mintTeal}10 0%, transparent 70%)`,
          filter: 'blur(40px)',
        }}
      />

      <div
        style={{
          transform: `scale(${interpolate(entrance, [0, 1], [0.9, 1.3])})`,
          marginBottom: 56,
        }}
      >
        <AnimatedLogo fillColor={ATNA_THEME.blackTypography} />
      </div>

      <h1
        style={{
          fontSize: 88,
          fontWeight: 900,
          color: ATNA_THEME.blackTypography,
          letterSpacing: '-3.5px',
          margin: 0,
          textAlign: 'center',
          lineHeight: 1.05,
          opacity: headlineOp,
          transform: `translateY(${interpolate(headlineOp, [0, 1], [16, 0])}px)`,
          fontFamily: "'Plus Jakarta Sans', sans-serif",
        }}
      >
        Stop fraud at the door.<br />
        <span style={{ color: ATNA_THEME.mintTeal }}>Help us build it.</span>
      </h1>

      <div
        style={{
          marginTop: 50,
          opacity: urlOp,
          transform: `scale(${buttonPulse}) translateY(${interpolate(urlOp, [0, 1], [12, 0])}px)`,
        }}
      >
        <div
          style={{
            backgroundColor: ATNA_THEME.blackTypography,
            color: '#FFFFFF',
            padding: '22px 48px',
            borderRadius: 40,
            fontWeight: 700,
            fontSize: 20,
            display: 'flex',
            alignItems: 'center',
            gap: 16,
            boxShadow: `0 20px 50px ${ATNA_THEME.mintTeal}30`,
          }}
        >
          <span>atna.ai/careers</span>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={ATNA_THEME.mintTeal} strokeWidth="2.5">
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </div>
      </div>

      <div
        style={{
          marginTop: 36,
          fontSize: 13,
          color: '#9CA3AF',
          letterSpacing: '3px',
          fontWeight: 700,
          opacity: urlOp,
        }}
      >
        ATNA · ADAPTIVE RISK INTELLIGENCE
      </div>
    </AbsoluteFill>
  );
};

export const Scene6_CTA: React.FC = () => {
  return (
    <AbsoluteFill>
      <Sequence durationInFrames={180}>
        <RolesList />
      </Sequence>
      <Sequence from={180} durationInFrames={180}>
        <EndCard />
      </Sequence>
    </AbsoluteFill>
  );
};
