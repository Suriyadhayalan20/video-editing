import React from 'react';
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig, Easing } from 'remotion';
import { ATNA_THEME } from '../../theme';

export const Scene3_Product: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({
    fps,
    frame,
    config: { damping: 22, stiffness: 60 },
  });

  // Headline reveal
  const headlineOpacity = interpolate(frame, [0, 25], [0, 1], { extrapolateRight: 'clamp' });

  // Risk score animates: high (red) -> low (green) over time as signals are processed
  const riskScoreRaw = interpolate(
    frame,
    [60, 220],
    [87, 12],
    { easing: Easing.bezier(0.65, 0, 0.35, 1), extrapolateLeft: 'clamp', extrapolateRight: 'clamp' },
  );
  const riskScore = Math.round(riskScoreRaw);

  const riskColor = riskScore > 70 ? '#EF4444' : riskScore > 40 ? '#F59E0B' : ATNA_THEME.mintTeal;

  // Signal nodes appearing one by one
  const signals = [
    { label: 'Device fingerprint', delay: 30 },
    { label: 'Document liveness', delay: 50 },
    { label: 'Behavioral biometrics', delay: 70 },
    { label: 'Network graph', delay: 90 },
    { label: 'Synthetic ID model', delay: 110 },
    { label: 'Velocity heuristics', delay: 130 },
  ];

  // Camera-style parallax — slow drift
  const drift = interpolate(frame, [0, 390], [0, -10]);

  const exitFade = interpolate(frame, [360, 390], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#050B14',
        fontFamily: ATNA_THEME.fontFamily,
        padding: '60px 100px',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        opacity: exitFade,
        overflow: 'hidden',
      }}
    >
      {/* Ambient glow */}
      <div
        style={{
          position: 'absolute',
          width: 1000,
          height: 1000,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${ATNA_THEME.mintTeal}15 0%, transparent 70%)`,
          top: '-30%',
          right: '-15%',
          filter: 'blur(60px)',
        }}
      />

      {/* Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          opacity: headlineOpacity,
          transform: `translateY(${interpolate(headlineOpacity, [0, 1], [10, 0])}px)`,
        }}
      >
        <div>
          <div
            style={{
              fontSize: 13,
              fontWeight: 800,
              color: ATNA_THEME.mintTeal,
              letterSpacing: '4px',
              marginBottom: 14,
            }}
          >
            THE PLATFORM
          </div>
          <h2
            style={{
              fontSize: 72,
              fontWeight: 800,
              color: '#FFFFFF',
              letterSpacing: '-3px',
              margin: 0,
              lineHeight: 1.05,
              fontFamily: "'Plus Jakarta Sans', sans-serif",
            }}
          >
            Onboarding fraud,<br />
            <span style={{ color: ATNA_THEME.mintTeal }}>solved at the edge.</span>
          </h2>
        </div>
      </div>

      {/* Product mockup */}
      <div
        style={{
          marginTop: 60,
          flex: 1,
          display: 'grid',
          gridTemplateColumns: '1.2fr 1fr',
          gap: 32,
          opacity: entrance,
          transform: `translateY(${interpolate(entrance, [0, 1], [40, drift])}px)`,
        }}
      >
        {/* Left card: signals stream */}
        <div
          style={{
            backgroundColor: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: 24,
            padding: 32,
            backdropFilter: 'blur(20px)',
            display: 'flex',
            flexDirection: 'column',
            gap: 16,
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ fontSize: 14, color: '#94A3B8', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase' }}>
              Live signal stream
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                fontSize: 12,
                color: ATNA_THEME.mintTeal,
                fontWeight: 700,
              }}
            >
              <div
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  backgroundColor: ATNA_THEME.mintTeal,
                  opacity: 0.5 + Math.sin(frame * 0.2) * 0.5,
                }}
              />
              STREAMING
            </div>
          </div>

          {signals.map((sig, i) => {
            const localOp = interpolate(frame, [sig.delay, sig.delay + 20], [0, 1], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            });
            const localTx = interpolate(frame, [sig.delay, sig.delay + 20], [-20, 0], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
              easing: Easing.bezier(0.16, 1, 0.3, 1),
            });
            const confidence = Math.round(82 + Math.sin(frame * 0.08 + i) * 14);

            return (
              <div
                key={sig.label}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  backgroundColor: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.06)',
                  borderRadius: 14,
                  padding: '14px 18px',
                  opacity: localOp,
                  transform: `translateX(${localTx}px)`,
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                  <div
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: 10,
                      backgroundColor: `${ATNA_THEME.mintTeal}15`,
                      border: `1px solid ${ATNA_THEME.mintTeal}40`,
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <div
                      style={{
                        width: 10,
                        height: 10,
                        borderRadius: 3,
                        backgroundColor: ATNA_THEME.mintTeal,
                      }}
                    />
                  </div>
                  <div style={{ color: '#E5E7EB', fontSize: 16, fontWeight: 600 }}>{sig.label}</div>
                </div>
                <div
                  style={{
                    fontSize: 14,
                    color: ATNA_THEME.mintTeal,
                    fontWeight: 700,
                    fontVariantNumeric: 'tabular-nums',
                  }}
                >
                  {confidence}%
                </div>
              </div>
            );
          })}
        </div>

        {/* Right card: risk meter */}
        <div
          style={{
            backgroundColor: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: 24,
            padding: 40,
            backdropFilter: 'blur(20px)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <div>
            <div style={{ fontSize: 14, color: '#94A3B8', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase' }}>
              Adaptive risk score
            </div>
            <div style={{ fontSize: 12, color: '#64748B', marginTop: 6 }}>
              Session 0xA1F4 · re-scored every 80ms
            </div>
          </div>

          {/* Big risk number */}
          <div style={{ textAlign: 'center', padding: '20px 0' }}>
            <div
              style={{
                fontSize: 180,
                fontWeight: 900,
                color: riskColor,
                letterSpacing: '-6px',
                lineHeight: 1,
                fontVariantNumeric: 'tabular-nums',
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                textShadow: `0 0 60px ${riskColor}40`,
              }}
            >
              {riskScore}
            </div>
            <div
              style={{
                fontSize: 14,
                color: '#94A3B8',
                marginTop: 8,
                letterSpacing: '2px',
                fontWeight: 700,
              }}
            >
              RISK · 0–100
            </div>
          </div>

          {/* Gradient bar */}
          <div style={{ position: 'relative', height: 12, borderRadius: 6, overflow: 'hidden' }}>
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: `linear-gradient(90deg, ${ATNA_THEME.mintTeal} 0%, #F59E0B 50%, #EF4444 100%)`,
                opacity: 0.25,
              }}
            />
            <div
              style={{
                position: 'absolute',
                top: -4,
                bottom: -4,
                left: `${riskScore}%`,
                width: 4,
                backgroundColor: '#FFFFFF',
                boxShadow: `0 0 20px ${riskColor}`,
                transform: 'translateX(-2px)',
              }}
            />
          </div>

          {/* Decision tag */}
          <div
            style={{
              marginTop: 24,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              backgroundColor: `${riskColor}12`,
              border: `1px solid ${riskColor}60`,
              borderRadius: 12,
              padding: '14px 18px',
            }}
          >
            <div style={{ color: '#E5E7EB', fontSize: 14, fontWeight: 600 }}>Decision</div>
            <div style={{ color: riskColor, fontSize: 14, fontWeight: 800, letterSpacing: '1px' }}>
              {riskScore > 70 ? 'BLOCK' : riskScore > 40 ? 'STEP-UP' : 'APPROVE'}
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
