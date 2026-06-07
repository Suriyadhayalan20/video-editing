import React from 'react';
import { AbsoluteFill, spring, useCurrentFrame, useVideoConfig, interpolate, Easing } from 'remotion';

export const Scene2_RiskMeter: React.FC<{ isEmbedded?: boolean }> = ({ isEmbedded = false }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 1. Overall Scene entrance (slight scale & fade in)
  const sceneScale = spring({
    fps,
    frame,
    config: {
      damping: 20,
      stiffness: 70,
      mass: 0.8,
    },
  });

  const sceneOpacity = interpolate(frame, [0, 15], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // 2. Gauge reveal sweep wipe (slow and smooth)
  const gaugeSweepWidth = interpolate(frame, [15, 75], [0, 100], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.25, 1, 0.5, 1),
  });

  // Override parameters if embedded in Scene 4
  const targetScore = isEmbedded ? 82 : 12;
  const warningLabel = isEmbedded ? "Mid risk profile" : "High risk profile";
  const warningLabelColor = isEmbedded ? "#D65A15" : "#D65A15"; // Midrisk color in ref is Orange/Coral, let's match design.
  
  // Timings: if embedded in Scene 4, let it sync with Scene 4 start.
  // Scene 4 starts at frame 250 in the main composition.
  // The frame variable inside the component runs from 0 to 150 (since it's a 150 frame Sequence).
  // Settle at 82% (0.82)
  const getBubbleProgress = (f: number) => {
    if (f < 75) {
      const t = interpolate(f, [15, 75], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      });
      return Easing.bezier(0.25, 1, 0.5, 1)(t); // 0 -> 1
    } else {
      const t = interpolate(f, [75, 110], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      });
      const eased = Easing.bezier(0.25, 1, 0.5, 1)(t);
      return interpolate(eased, [0, 1], [1, targetScore / 100]); // 1 -> targetScore
    }
  };

  const bubbleProgress = getBubbleProgress(frame);
  const bubbleAngleDeg = interpolate(bubbleProgress, [0, 1], [10, 170]);
  const animatedScore = interpolate(bubbleProgress, [0, 1], [0, 100]);
  const displayScore = Math.round(animatedScore);

  // Bubble path calculations
  // Semicircle center: (261.5, 247.0), Radius: 158.2
  const bubbleAngleRad = (bubbleAngleDeg * Math.PI) / 180;
  const bubbleX = 261.5 - 158.2 * Math.cos(bubbleAngleRad);
  const bubbleY = 247.0 - 158.2 * Math.sin(bubbleAngleRad);

  const bubbleOpacity = interpolate(frame, [10, 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Dynamic Color Interpolation based on current score
  const getDynamicColor = (score: number) => {
    if (score < 33) {
      const ratio = score / 33;
      const h = 12 + ratio * 32;
      const s = 94 + ratio * 6;
      const l = 65 - ratio * 2;
      return `hsl(${h}, ${s}%, ${l}%)`;
    } else if (score < 66) {
      const ratio = (score - 33) / 33;
      const h = 44 + ratio * 114;
      const s = 100 - ratio * 9;
      const l = 63 + ratio * 5;
      return `hsl(${h}, ${s}%, ${l}%)`;
    } else {
      const h = 158;
      const s = 91;
      const l = 68;
      return `hsl(${h}, ${s}%, ${l}%)`;
    }
  };

  const bubbleColor = getDynamicColor(animatedScore);

  // 4. Center warning dot & warning text animations
  const warningProgress = interpolate(frame, [95, 115], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.25, 1, 0.5, 1),
  });

  const centerDotScale = warningProgress;
  const centerDotOpacity = warningProgress;
  const warningTextOpacity = warningProgress;
  const warningTextTranslateY = interpolate(warningProgress, [0, 1], [15, 0]);

  // 5. Legends fade-in sequence (Slow slide up, staggered one by one)
  const legend1Progress = interpolate(frame, [100, 120], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.25, 1, 0.5, 1),
  });
  const legend1Opacity = legend1Progress * 0.7;
  const legend1TranslateY = interpolate(legend1Progress, [0, 1], [15, 0]);

  const legend2Progress = interpolate(frame, [105, 125], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.25, 1, 0.5, 1),
  });
  const legend2Opacity = legend2Progress * 0.7;
  const legend2TranslateY = interpolate(legend2Progress, [0, 1], [15, 0]);

  const legend3Progress = interpolate(frame, [110, 130], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.25, 1, 0.5, 1),
  });
  const legend3Opacity = legend3Progress * 0.7;
  const legend3TranslateY = interpolate(legend3Progress, [0, 1], [15, 0]);

  const content = (
    <div style={{
      opacity: sceneOpacity,
      transform: `scale(${sceneScale})`,
      width: '100%',
      height: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 518 338"
        fill="none"
        style={{ overflow: 'visible' }}
      >
        <defs>
          {/* Green Segment Gradient */}
          <linearGradient id="segment-green" x1="275.4" x2="425.9" y1="42.9" y2="258.7" gradientUnits="userSpaceOnUse">
            <stop stopColor="#E5FFF6" />
            <stop offset="0.61" stopColor="#65F8C2" />
          </linearGradient>

          {/* Yellow Segment Gradient */}
          <linearGradient id="segment-yellow" x1="321.8" x2="179.6" y1="121.6" y2="135.3" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FFCC45" />
            <stop offset="1" stopColor="#FFD35D" />
          </linearGradient>

          {/* Coral Segment Gradient */}
          <linearGradient id="segment-coral" x1="150.4" x2="150.4" y1="107.1" y2="249.6" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FF896B" />
            <stop offset="1" stopColor="#F97554" />
          </linearGradient>

          {/* Gauge Reveal Sweep Wipe */}
          <clipPath id="gauge-sweep-clip">
            <rect x="0" y="0" width={`${gaugeSweepWidth}%`} height="338" />
          </clipPath>

          {/* Bubble Soft Outer Glow */}
          <filter id="bubble-glow" x="-30%" y="-30%" width="160%" height="160%">
            <feDropShadow dx="0" dy="12" stdDeviation="8" floodColor={bubbleColor} floodOpacity="0.35" />
            <feDropShadow dx="0" dy="3" stdDeviation="3" floodColor="#000000" floodOpacity="0.08" />
          </filter>
        </defs>

        {/* Header Title & Icon */}
        <g transform="translate(10, 20)">
          <path
            stroke="#0A0A0A"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 12a7 7 0 0 1 .646 2.942 7 7 0 0 1-.759 3.173M5 12a7 7 0 0 0-.646 2.942 7 7 0 0 0 .759 3.173M12 5a7 7 0 0 1 7 7M12 5a7 7 0 0 0-7 7m7-7v4M12 12a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3Zm0 0 4.5-4.5"
          />
          <text
            x="30"
            y="18"
            fill="#0A0A0A"
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontWeight: 700,
              fontSize: '18px',
              letterSpacing: '-0.3px',
            }}
          >
            ATNA score
          </text>
        </g>

        {/* Sweep Clip Applied to Colored Tracks */}
        <g clipPath="url(#gauge-sweep-clip)">
          <path
            fill="#fff"
            strokeWidth={9.877}
            d="M261.537 80.057a169.56 169.56 0 0 1 119.897 49.662 169.57 169.57 0 0 1 49.628 116.505l-.002.432c-.141 4.442-3.817 7.898-8.195 7.898h-42.802c-4.581 0-8.149-3.692-8.275-8.09a110.3 110.3 0 0 0-32.26-74.84 110.29 110.29 0 0 0-120.199-23.909 110.3 110.3 0 0 0-68.042 98.749c-.126 4.398-3.694 8.09-8.275 8.09H100.21c-4.52 0-8.29-3.682-8.196-8.33A169.55 169.55 0 0 1 196.65 92.964a169.6 169.6 0 0 1 64.887-12.907Z"
            style={{ opacity: 0.25 }}
          />
          
          {/* Green Arc (Right) */}
          <path
            fill="url(#segment-green)"
            strokeWidth={4.468}
            d="M261.538 82.762a166.86 166.86 0 0 1 117.983 48.87 166.86 166.86 0 0 1 48.808 113.455c.102 3.763-2.955 6.762-6.64 6.762h-40.45c-3.722 0-6.647-3.005-6.787-6.614a113 113 0 0 0-8.516-38.864 113 113 0 0 0-61.155-61.154 113 113 0 0 0-123.146 24.495 113 113 0 0 0-33.012 75.523c-.14 3.609-3.065 6.614-6.787 6.614h-40.45c-3.685 0-6.743-2.999-6.64-6.762a166.85 166.85 0 0 1 48.809-113.455 166.83 166.83 0 0 1 117.983-48.87Z"
          />

          {/* Yellow Arc (Middle/Left Overlap) */}
          <path
            fill="url(#segment-yellow)"
            strokeWidth={4.468}
            d="M261.433 82.762a166.86 166.86 0 0 1 79.457 20.076c3.311 1.791 4.382 5.937 2.543 9.13l-20.196 35.048c-1.858 3.225-5.922 4.258-9.119 2.578a113.005 113.005 0 0 0-150.453 43.542 113 113 0 0 0-15.042 52.099c-.14 3.608-3.064 6.614-6.787 6.614h-40.45c-3.685 0-6.743-2.999-6.64-6.762a166.85 166.85 0 0 1 83.305-139.936 166.85 166.85 0 0 1 83.382-22.389Z"
          />

          {/* Coral Arc (Left Overlap) */}
          <path
            fill="url(#segment-coral)"
            strokeWidth={4.468}
            d="M174.16 107.469c3.207-1.972 7.334-.826 9.178 2.365l20.239 35.023c1.863 3.223.724 7.258-2.33 9.185a113 113 0 0 0-52.624 91.192c-.14 3.609-3.065 6.613-6.787 6.613h-40.45c-3.685 0-6.743-2.998-6.64-6.761a166.85 166.85 0 0 1 79.414-137.617Z"
          />
        </g>

        {/* Center Warning Dot Symbol */}
        <g 
          transform={`translate(262.104, 197.436) scale(${centerDotScale})`} 
          style={{ opacity: centerDotOpacity }}
        >
          <circle cx="0" cy="0" r="10" fill="#D65A15" />
          <line x1="0" y1="-5" x2="0" y2="-1" stroke="#FFFFFF" strokeWidth="1.6" strokeLinecap="round" />
          <circle cx="0" cy="3" r="1" fill="#FFFFFF" />
        </g>

        {/* Warning Profile Text */}
        <text
          x="262"
          y="230"
          textAnchor="middle"
          fill={warningLabelColor}
          style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontWeight: 700,
            fontSize: '14px',
            opacity: warningTextOpacity,
            transform: `translateY(${warningTextTranslateY}px)`,
          }}
        >
          {warningLabel}
        </text>

        {/* Dynamic Score Indicator Bubble */}
        <g 
          transform={`translate(${bubbleX}, ${bubbleY})`} 
          style={{ opacity: bubbleOpacity }}
        >
          <circle cx="0" cy="0" r="30" fill={bubbleColor} filter="url(#bubble-glow)" />
          <circle cx="0" cy="0" r="26.5" stroke="#FFFFFF" strokeWidth="6.5" fill="none" />
          <text
            x="0"
            y="5"
            textAnchor="middle"
            fill="#FFFFFF"
            style={{
              fontFamily: "'Outfit', sans-serif",
              fontWeight: 800,
              fontSize: '16px',
            }}
          >
            {displayScore}%
          </text>
        </g>

        {/* Legend 1: High Risk */}
        <g transform={`translate(0, ${legend1TranslateY})`} style={{ opacity: legend1Opacity }}>
          <circle cx="123" cy="292.8" r="4.5" fill="#DD2746" />
          <text
            x="134"
            y="297"
            fill="#0A0A0A"
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontWeight: 600,
              fontSize: '13px',
            }}
          >
            {isEmbedded ? "High risk (0%)" : "High risk (12%)"}
          </text>
        </g>

        {/* Legend 2: Mid Risk */}
        <g transform={`translate(0, ${legend2TranslateY})`} style={{ opacity: legend2Opacity }}>
          <circle cx="254.5" cy="292.8" r="4.5" fill="#DEB228" />
          <text
            x="265.5"
            y="297"
            fill="#0A0A0A"
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontWeight: 600,
              fontSize: '13px',
            }}
          >
            {isEmbedded ? "Mid risk (82%)" : "Mid risk (0%)"}
          </text>
        </g>

        {/* Legend 3: Low Risk */}
        <g transform={`translate(0, ${legend3TranslateY})`} style={{ opacity: legend3Opacity }}>
          <circle cx="385.7" cy="292.8" r="4.5" fill="#56F2BF" />
          <text
            x="396.7"
            y="297"
            fill="#0A0A0A"
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontWeight: 600,
              fontSize: '13px',
            }}
          >
            Low risk (0%)
          </text>
        </g>
      </svg>
    </div>
  );

  if (isEmbedded) {
    return content;
  }

  return (
    <AbsoluteFill style={{ 
      backgroundColor: '#EFF7F9', // Premium light-blue aesthetic
      justifyContent: 'center', 
      alignItems: 'center',
      perspective: '1200px',
    }}>
      <div style={{ width: '90%', height: '90%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        {content}
      </div>
    </AbsoluteFill>
  );
};
