import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame, Easing } from 'remotion';

export const Scene3_Text: React.FC = () => {
  const frame = useCurrentFrame();

  // Entrance animation for the container
  const sceneOpacity = interpolate(frame, [0, 10], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Smooth, slow interpolation animations for each word
  const getWordOpacity = (f: number, delay: number) => {
    return interpolate(f, [delay, delay + 18], [0, 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    });
  };

  const getWordTranslateY = (f: number, delay: number) => {
    return interpolate(f, [delay, delay + 18], [20, 0], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.bezier(0.25, 1, 0.5, 1),
    });
  };

  // Trailing spaces included inside the words to ensure perfect word wrapping and standard browser spacing
  const line1Words = ["We ", "go ", "beyond ", "just ", "Scores"];
  const line2Words = ["Enhance ", "user ", "experience ", "with "];

  // Subtle background pulse effect
  const bgScale = interpolate(frame, [0, 70], [0.98, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.25, 1, 0.5, 1),
  });

  return (
    <AbsoluteFill style={{
      backgroundColor: '#EFF7F9',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      opacity: sceneOpacity,
      fontFamily: "'Plus Jakarta Sans', sans-serif",
    }}>
      <div style={{
        textAlign: 'center',
        transform: `scale(${bgScale})`,
        padding: '0 40px',
      }}>
        {/* Main Title (Word-by-word staggered entrance with pre-wrapped spacing) */}
        <h1 style={{
          fontSize: '92px',
          fontWeight: 800,
          color: '#0A0A0A',
          margin: 0,
          marginBottom: '32px',
          letterSpacing: '-2px',
          lineHeight: 1.1,
        }}>
          {line1Words.map((word, i) => {
            const delay = 10 + i * 8;
            const opacity = getWordOpacity(frame, delay);
            const translateY = getWordTranslateY(frame, delay);
            return (
              <span key={i} style={{
                display: 'inline-block',
                opacity,
                transform: `translateY(${translateY}px)`,
                whiteSpace: 'pre',
              }}>
                {word}
              </span>
            );
          })}
        </h1>

        {/* Subtitle with dynamic highlight (Word-by-word staggered entrance with pre-wrapped spacing) */}
        <p style={{
          fontSize: '68px',
          fontWeight: 500,
          color: '#4B5563',
          margin: 0,
          letterSpacing: '-0.8px',
        }}>
          {line2Words.map((word, i) => {
            const delay = 60 + i * 8;
            const opacity = getWordOpacity(frame, delay);
            const translateY = getWordTranslateY(frame, delay);
            return (
              <span key={i} style={{
                display: 'inline-block',
                opacity,
                transform: `translateY(${translateY}px)`,
                whiteSpace: 'pre',
              }}>
                {word}
              </span>
            );
          })}
          <span style={{
            display: 'inline-block',
            background: "#49e8c3",
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontWeight: 700,
            opacity: getWordOpacity(frame, 60 + line2Words.length * 8),
            transform: `translateY(${getWordTranslateY(frame, 60 + line2Words.length * 8)}px)`,
          }}>
            explainability
          </span>
        </p>
      </div>
    </AbsoluteFill>
  );
};
