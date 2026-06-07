import React from 'react';
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig, Easing } from 'remotion';
import { ATNA_THEME } from '../../theme';

// A network/graph visualization that grows and connects nodes,
// representing adaptive risk intelligence learning across signals.

interface Node {
  x: number;
  y: number;
  delay: number;
  label?: string;
}

const NODES: Node[] = [
  { x: 50, y: 50, delay: 0, label: 'session' },
  { x: 20, y: 25, delay: 12, label: 'device' },
  { x: 80, y: 22, delay: 16, label: 'doc' },
  { x: 18, y: 75, delay: 20, label: 'graph' },
  { x: 78, y: 78, delay: 24, label: 'behavior' },
  { x: 35, y: 14, delay: 28 },
  { x: 65, y: 14, delay: 32 },
  { x: 12, y: 50, delay: 36 },
  { x: 88, y: 50, delay: 40 },
  { x: 38, y: 88, delay: 44 },
  { x: 62, y: 88, delay: 48 },
  { x: 28, y: 38, delay: 52 },
  { x: 72, y: 38, delay: 56 },
  { x: 30, y: 62, delay: 60 },
  { x: 70, y: 62, delay: 64 },
];

const EDGES: [number, number, number][] = [
  // [from, to, delay]
  [0, 1, 20], [0, 2, 24], [0, 3, 28], [0, 4, 32],
  [1, 5, 36], [1, 7, 40], [1, 11, 44],
  [2, 6, 36], [2, 8, 40], [2, 12, 44],
  [3, 9, 48], [3, 13, 52], [3, 7, 56],
  [4, 10, 48], [4, 14, 52], [4, 8, 56],
  [5, 6, 70], [7, 11, 74], [12, 8, 78],
  [11, 13, 84], [12, 14, 88], [13, 14, 92],
];

export const Scene4_AdaptiveRisk: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({
    fps,
    frame,
    config: { damping: 22, stiffness: 60 },
  });

  const headlineOpacity = interpolate(frame, [0, 25], [0, 1], { extrapolateRight: 'clamp' });

  const subheadOpacity = interpolate(frame, [180, 220], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const exitFade = interpolate(frame, [270, 300], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Convert percent coordinates to pixel positions inside a 900x540 viewport
  const W = 900;
  const H = 540;

  const px = (n: Node) => (n.x / 100) * W;
  const py = (n: Node) => (n.y / 100) * H;

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
      {/* Background glow */}
      <div
        style={{
          position: 'absolute',
          width: 900,
          height: 900,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${ATNA_THEME.mintTeal}10 0%, transparent 60%)`,
          top: '20%',
          left: '50%',
          transform: 'translateX(-50%)',
          filter: 'blur(50px)',
        }}
      />

      {/* Header */}
      <div
        style={{
          opacity: headlineOpacity,
          transform: `translateY(${interpolate(headlineOpacity, [0, 1], [10, 0])}px)`,
        }}
      >
        <div
          style={{
            fontSize: 13,
            fontWeight: 800,
            color: ATNA_THEME.mintTeal,
            letterSpacing: '4px',
            marginBottom: 14,
          }}
        >
          THE INTELLIGENCE
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
          A model that <span style={{ color: ATNA_THEME.mintTeal }}>adapts</span><br />
          to every new attack.
        </h2>
      </div>

      {/* Graph */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 20,
          opacity: entrance,
        }}
      >
        <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{ overflow: 'visible' }}>
          {/* Edges first so they sit behind nodes */}
          {EDGES.map(([a, b, delay], i) => {
            const op = interpolate(frame, [delay, delay + 25], [0, 0.5], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            });
            const dashOffset = interpolate(frame, [delay, delay + 30], [60, 0], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
              easing: Easing.bezier(0.16, 1, 0.3, 1),
            });
            const A = NODES[a];
            const B = NODES[b];
            return (
              <line
                key={i}
                x1={px(A)}
                y1={py(A)}
                x2={px(B)}
                y2={py(B)}
                stroke={ATNA_THEME.mintTeal}
                strokeWidth={1.2}
                opacity={op}
                strokeDasharray="4 4"
                strokeDashoffset={dashOffset}
              />
            );
          })}

          {/* Pulse traveling along central edges */}
          {[1, 2, 3, 4].map((targetIdx) => {
            const A = NODES[0];
            const B = NODES[targetIdx];
            const t = ((frame * 0.012) + targetIdx * 0.25) % 1;
            const cx = px(A) + (px(B) - px(A)) * t;
            const cy = py(A) + (py(B) - py(A)) * t;
            return (
              <circle
                key={`pulse-${targetIdx}`}
                cx={cx}
                cy={cy}
                r={4}
                fill={ATNA_THEME.mintTeal}
                opacity={interpolate(t, [0, 0.1, 0.9, 1], [0, 1, 1, 0])}
              />
            );
          })}

          {/* Nodes */}
          {NODES.map((node, i) => {
            const scale = interpolate(frame, [node.delay, node.delay + 18], [0, 1], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
              easing: Easing.bezier(0.34, 1.4, 0.64, 1),
            });
            const isCenter = i === 0;
            const isLabeled = Boolean(node.label);
            const radius = isCenter ? 22 : isLabeled ? 14 : 7;
            const ringPulse = isCenter
              ? interpolate(frame % 60, [0, 30, 60], [radius, radius * 2.2, radius])
              : null;
            const ringOp = isCenter
              ? interpolate(frame % 60, [0, 30, 60], [0.6, 0, 0.6])
              : 0;
            return (
              <g key={i} transform={`translate(${px(node)} ${py(node)}) scale(${scale})`}>
                {isCenter && ringPulse !== null && (
                  <circle r={ringPulse} fill="none" stroke={ATNA_THEME.mintTeal} strokeWidth={1.5} opacity={ringOp} />
                )}
                <circle
                  r={radius}
                  fill={isCenter ? ATNA_THEME.mintTeal : isLabeled ? `${ATNA_THEME.mintTeal}30` : '#FFFFFF20'}
                  stroke={isLabeled || isCenter ? ATNA_THEME.mintTeal : '#FFFFFF50'}
                  strokeWidth={1.5}
                />
                {isLabeled && node.label && (
                  <text
                    y={radius + 22}
                    textAnchor="middle"
                    fill="#94A3B8"
                    fontSize={12}
                    fontWeight={600}
                    letterSpacing={1}
                    style={{ textTransform: 'uppercase' }}
                  >
                    {node.label}
                  </text>
                )}
              </g>
            );
          })}
        </svg>
      </div>

      {/* Sub headline below graph */}
      <div
        style={{
          textAlign: 'center',
          opacity: subheadOpacity,
          transform: `translateY(${interpolate(subheadOpacity, [0, 1], [10, 0])}px)`,
          marginTop: 12,
        }}
      >
        <p
          style={{
            fontSize: 22,
            color: '#94A3B8',
            margin: 0,
            letterSpacing: '-0.3px',
            fontWeight: 500,
          }}
        >
          Adaptive risk intelligence —{' '}
          <span style={{ color: '#FFFFFF', fontWeight: 700 }}>
            learns continuously from every decision, every signal, every fraudster.
          </span>
        </p>
      </div>
    </AbsoluteFill>
  );
};
