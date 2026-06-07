/* eslint-disable @remotion/no-object-fit-on-media-video */
import React, { useState, useEffect } from 'react';
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig, Easing, Sequence, Video, staticFile } from 'remotion';
import { AnimatedLogo } from './AnimatedLogo';
import { ATNA_THEME } from '../theme';

interface SceneProps {
  globalFrame: number;
}

// Product Card for the Tru Suite features
const ProductCard: React.FC<{
  title: string;
  description: string;
  index: number;
  activeFrame: number;
}> = ({ title, description, index, activeFrame }) => {
  const delay = index * 8;
  const opacity = interpolate(activeFrame, [delay, delay + 15], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const translateY = interpolate(activeFrame, [delay, delay + 15], [15, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.25, 1, 0.5, 1),
  });

  return (
    <div style={{
      backgroundColor: 'rgba(255, 255, 255, 0.8)',
      border: `1px solid ${ATNA_THEME.mintTeal}25`,
      borderRadius: '20px',
      padding: '24px 28px',
      display: 'flex',
      flexDirection: 'column',
      gap: '8px',
      boxShadow: '0 10px 30px rgba(0,0,0,0.02)',
      opacity,
      transform: `translateY(${translateY}px)`,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <div style={{
          width: '8px',
          height: '8px',
          borderRadius: '50%',
          backgroundColor: ATNA_THEME.mintTeal,
        }} />
        <h3 style={{ fontSize: '18px', fontWeight: 800, color: ATNA_THEME.blackTypography, margin: 0 }}>
          {title}
        </h3>
      </div>
      <p style={{ fontSize: '14px', color: '#4B5563', lineHeight: 1.45, margin: 0 }}>
        {description}
      </p>
    </div>
  );
};

// Sub-sequence 1: Marcus Presentational/Product Grid (45s to 55s -> global 1350 to 1650)
const SuitePresentation: React.FC<{ globalFrame: number }> = ({ globalFrame }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const [videoExists, setVideoExists] = useState(false);
  const [videoError, setVideoError] = useState(false);

  useEffect(() => {
    fetch(staticFile("unit04.mp4"), { method: 'HEAD' })
      .then(res => {
        if (res.ok) {
          setVideoExists(true);
        } else {
          setVideoError(true);
        }
      })
      .catch(() => {
        setVideoError(true);
      });
  }, []);

  // Card entrance
  const entrance = spring({
    fps,
    frame,
    config: { damping: 20, stiffness: 60 },
  });

  const products = [
    { title: 'Tru Yu', description: 'Voice clone detection and biometric live verification.' },
    { title: 'Tru IDV', description: 'Tamper proofing and face-swap digital shields.' },
    { title: 'Tru Docs', description: 'Forensic audits for credentials and contract files.' },
    { title: 'Tru Scribe', description: 'Metadata verification and dialogue fraud flagging.' },
  ];

  // Subtitles timing: "At tru.atna.ai, we detect what the human ear cannot." (50s to 54s -> global 1500 to 1620)
  const showSubtitles = globalFrame >= 1500 && globalFrame <= 1620;
  const subtitleOpacity = interpolate(globalFrame, [1500, 1515, 1605, 1620], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill style={{
      backgroundColor: '#F9FAFB',
      fontFamily: ATNA_THEME.fontFamily,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      padding: '60px 100px',
      boxSizing: 'border-box',
    }}>
      {videoExists && !videoError ? (
        <Video
          src={staticFile("unit04.mp4")}
          onError={() => setVideoError(true)}
          style={{
            width: '100%',
            height: '100%',
            position: 'absolute',
            top: 0,
            left: 0,
            objectFit: 'cover',
          }}
          startFrom={0}
          endAt={300}
        />
      ) : null}

      {/* 2. Fallback Visual: Presenter Grid overlay */}
      {(!videoExists || videoError) && (
        <AbsoluteFill style={{
          background: 'linear-gradient(180deg, #F3F4F6 0%, #FFFFFF 100%)',
          padding: '60px 100px',
          boxSizing: 'border-box',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}>
          {/* Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', opacity: entrance }}>
            <div style={{ transform: 'scale(1.2)', transformOrigin: 'left center' }}>
              <AnimatedLogo fillColor={ATNA_THEME.blackTypography} />
            </div>
            <span style={{ fontSize: '13px', color: '#6B7280', fontWeight: 800, letterSpacing: '1px' }}>
              ATNA TRU SUITE
            </span>
          </div>

          {/* Grid Layout */}
          <div style={{
            display: 'flex',
            gap: '80px',
            alignItems: 'center',
            height: '420px',
            opacity: entrance,
            transform: `translateY(${interpolate(entrance, [0, 1], [20, 0])}px)`,
          }}>
            <div style={{ flex: 1 }}>
              <div style={{
                backgroundColor: `${ATNA_THEME.mintTeal}20`,
                border: `1px solid ${ATNA_THEME.mintTeal}60`,
                color: '#14B8A6',
                padding: '6px 14px',
                borderRadius: '16px',
                fontSize: '12px',
                fontWeight: 900,
                display: 'inline-block',
                marginBottom: '16px',
              }}>
                ENTERPRISE STACK
              </div>
              <h2 style={{ fontSize: '42px', fontWeight: 900, color: ATNA_THEME.blackTypography, lineHeight: 1.2, letterSpacing: '-1.5px', margin: '0 0 16px 0' }}>
                Secure your biometric border.
              </h2>
              <p style={{ fontSize: '16px', color: '#4B5563', lineHeight: 1.5, margin: 0 }}>
                Deploy comprehensive, AI-driven authentication modules against sophisticated biometrics, cloned voice scripts, and forged contracts.
              </p>
            </div>

            <div style={{
              flex: 1.2,
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '20px',
            }}>
              {products.map((p, idx) => (
                <ProductCard
                  key={idx}
                  index={idx}
                  title={p.title}
                  description={p.description}
                  activeFrame={frame}
                />
              ))}
            </div>
          </div>
        </AbsoluteFill>
      )}

      {/* 3. Subtitles Overlay (50s to 54s -> global 1500 to 1620) */}
      {showSubtitles && (
        <div style={{
          position: 'absolute',
          bottom: '80px',
          left: '50%',
          transform: 'translateX(-50%)',
          backgroundColor: 'rgba(15, 23, 42, 0.95)',
          backdropFilter: 'blur(10px)',
          padding: '16px 36px',
          borderRadius: '24px',
          border: '1px solid rgba(255,255,255,0.08)',
          boxShadow: '0 20px 40px rgba(0,0,0,0.25)',
          opacity: subtitleOpacity,
          textAlign: 'center',
          maxWidth: '800px',
          zIndex: 100,
        }}>
          <p style={{
            fontSize: '24px',
            color: '#FFFFFF',
            margin: 0,
            fontWeight: 500,
            letterSpacing: '-0.3px',
            lineHeight: '1.4',
          }}>
            <span style={{ color: ATNA_THEME.mintTeal, fontWeight: 700 }}>Marcus: </span>
            "At tru.atna.ai, we detect what the human ear cannot."
          </p>
        </div>
      )}
    </AbsoluteFill>
  );
};

// Sub-sequence 2: The Outro End Card (55s to 60s -> global 1650 to 1800)
const BrandEndCard: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Entrance scaling and opacity
  const contentEntrance = spring({
    fps,
    frame,
    config: { damping: 18, stiffness: 60 },
  });

  const logoScale = interpolate(contentEntrance, [0, 1], [0.8, 1.25], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const buttonPulse = Math.sin(frame * 0.05) * 0.03 + 1;

  return (
    <AbsoluteFill style={{
      backgroundColor: ATNA_THEME.cleanWhite,
      fontFamily: ATNA_THEME.fontFamily,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      overflow: 'hidden',
    }}>
      {/* Dynamic light background element */}
      <div style={{
        position: 'absolute',
        width: '800px',
        height: '800px',
        borderRadius: '50%',
        background: `radial-gradient(circle, ${ATNA_THEME.mintTeal}08 0%, rgba(255,255,255,0) 75%)`,
        pointerEvents: 'none',
      }} />

      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        zIndex: 20,
        opacity: contentEntrance,
        transform: `translateY(${interpolate(contentEntrance, [0, 1], [20, 0])}px)`,
      }}>
        {/* Atna Logo centered and scaled */}
        <div style={{
          transform: `scale(${logoScale})`,
          marginBottom: '56px',
          display: 'flex',
          justifyContent: 'center',
        }}>
          <AnimatedLogo fillColor={ATNA_THEME.blackTypography} />
        </div>

        {/* Main Tagline requested by Senior Creative Editor */}
        <h1 style={{
          fontSize: '46px',
          fontWeight: 900,
          color: ATNA_THEME.blackTypography,
          letterSpacing: '-1.5px',
          margin: '0 0 16px 0',
          maxWidth: '750px',
          lineHeight: 1.15,
        }}>
          They Couldn't Tell What Was Real.<br />Now You Can.
        </h1>

        <p style={{
          fontSize: '18px',
          color: '#4B5563',
          maxWidth: '560px',
          lineHeight: 1.5,
          margin: '0 0 44px 0',
        }}>
          Protect voice banking channels, verification workflows, and executive IDs with tru.atna.ai.
        </p>

        {/* CTA Button in ATNA_THEME.mintTeal */}
        <div style={{
          transform: `scale(${buttonPulse})`,
        }}>
          <div style={{
            backgroundColor: ATNA_THEME.mintTeal,
            color: ATNA_THEME.blackTypography,
            padding: '18px 40px',
            borderRadius: '32px',
            fontWeight: 800,
            fontSize: '18px',
            boxShadow: `0 15px 35px ${ATNA_THEME.mintTeal}25`,
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            border: `1px solid ${ATNA_THEME.mintTeal}`,
          }}>
            <span>Book a Demo // tru.atna.ai</span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={ATNA_THEME.blackTypography} strokeWidth="2.5">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

export const Scene4_TheNewStandard: React.FC<SceneProps> = ({ globalFrame }) => {
  return (
    <AbsoluteFill>
      {/* 1. Suite Presentation: 0 to 300 local frames (45s to 55s -> global 1350 to 1650) */}
      <Sequence durationInFrames={300}>
        <SuitePresentation globalFrame={globalFrame} />
      </Sequence>
      
      {/* 2. Brand Outro End Card: 300 to 450 local frames (55s to 60s -> global 1650 to 1800) */}
      <Sequence from={300} durationInFrames={150}>
        <BrandEndCard />
      </Sequence>
    </AbsoluteFill>
  );
};
