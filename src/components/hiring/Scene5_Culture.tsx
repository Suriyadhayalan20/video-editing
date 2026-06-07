import React from 'react';
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig, Easing } from 'remotion';
import { ATNA_THEME } from '../../theme';

interface Pillar {
  title: string;
  body: string;
  glyph: React.ReactNode;
}

const PILLARS: Pillar[] = [
  {
    title: 'Engineering',
    body: 'Realtime systems at millisecond budgets. Distributed scoring at planetary scale.',
    glyph: (
      <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
  },
  {
    title: 'Research',
    body: 'Adversarial ML, graph neural networks, synthetic identity defense — published, not buried.',
    glyph: (
      <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <circle cx="11" cy="11" r="7" />
        <line x1="21" y1="21" x2="16" y2="16" />
      </svg>
    ),
  },
  {
    title: 'Design',
    body: 'Make complex risk decisions feel obvious. Build the dashboards a CRO trusts at 3 a.m.',
    glyph: (
      <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <circle cx="12" cy="12" r="9" />
        <circle cx="12" cy="12" r="3" fill="currentColor" />
      </svg>
    ),
  },
];

export const Scene5_Culture: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const headEntrance = spring({
    fps,
    frame,
    config: { damping: 18, stiffness: 70 },
  });

  const exitFade = interpolate(frame, [270, 300], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#FFFFFF',
        fontFamily: ATNA_THEME.fontFamily,
        padding: '90px 120px',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        opacity: exitFade,
        overflow: 'hidden',
      }}
    >
      {/* Faint grid */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'linear-gradient(#0000000A 1px, transparent 1px), linear-gradient(90deg, #0000000A 1px, transparent 1px)',
          backgroundSize: '120px 120px',
          opacity: 0.5,
        }}
      />

      {/* Header */}
      <div
        style={{
          opacity: headEntrance,
          transform: `translateY(${interpolate(headEntrance, [0, 1], [12, 0])}px)`,
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
          THE TEAM
        </div>
        <h2
          style={{
            fontSize: 72,
            fontWeight: 800,
            color: ATNA_THEME.blackTypography,
            letterSpacing: '-3px',
            margin: 0,
            lineHeight: 1.05,
            maxWidth: 1100,
            fontFamily: "'Plus Jakarta Sans', sans-serif",
          }}
        >
          Built by people who refuse<br />
          to ship <span style={{ color: ATNA_THEME.mintTeal }}>good enough.</span>
        </h2>
      </div>

      {/* Pillar cards */}
      <div
        style={{
          marginTop: 70,
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 28,
          flex: 1,
        }}
      >
        {PILLARS.map((p, i) => {
          const cardDelay = 40 + i * 18;
          const op = interpolate(frame, [cardDelay, cardDelay + 25], [0, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          });
          const ty = interpolate(frame, [cardDelay, cardDelay + 25], [30, 0], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          });

          return (
            <div
              key={p.title}
              style={{
                backgroundColor: '#FAFAFA',
                border: '1px solid #EDEDED',
                borderRadius: 28,
                padding: 36,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                opacity: op,
                transform: `translateY(${ty}px)`,
                boxShadow: '0 20px 60px rgba(0,0,0,0.03)',
              }}
            >
              <div>
                <div
                  style={{
                    width: 56,
                    height: 56,
                    borderRadius: 16,
                    backgroundColor: `${ATNA_THEME.mintTeal}18`,
                    border: `1px solid ${ATNA_THEME.mintTeal}50`,
                    color: '#0F766E',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginBottom: 28,
                  }}
                >
                  {p.glyph}
                </div>
                <h3
                  style={{
                    fontSize: 36,
                    fontWeight: 800,
                    color: ATNA_THEME.blackTypography,
                    letterSpacing: '-1.5px',
                    margin: 0,
                  }}
                >
                  {p.title}.
                </h3>
                <p
                  style={{
                    marginTop: 14,
                    fontSize: 17,
                    lineHeight: 1.5,
                    color: '#4B5563',
                    margin: '14px 0 0 0',
                  }}
                >
                  {p.body}
                </p>
              </div>

              {/* Footer index */}
              <div
                style={{
                  marginTop: 32,
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  fontSize: 12,
                  color: '#9CA3AF',
                  fontWeight: 700,
                  letterSpacing: '2px',
                }}
              >
                <span>0{i + 1} / 03</span>
                <span style={{ color: ATNA_THEME.mintTeal }}>HIRING NOW</span>
              </div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
