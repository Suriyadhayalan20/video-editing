/* eslint-disable @remotion/no-object-fit-on-media-video */
import React, { useState, useEffect } from 'react';
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig, Video, staticFile } from 'remotion';
import { ATNA_THEME } from '../theme';

interface SceneProps {
  globalFrame: number;
}

export const Scene1_TheTrap: React.FC<SceneProps> = ({ globalFrame }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const [videoExists, setVideoExists] = useState(false);
  const [videoError, setVideoError] = useState(false);

  useEffect(() => {
    fetch(staticFile("unit01.mp4"), { method: 'HEAD' })
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

  // Entrance spring for the overlay elements
  const overlayEntrance = spring({
    fps,
    frame,
    config: { damping: 18, stiffness: 60 },
  });

  // Waveform heights animation for fallback visual
  const getWaveHeight = (index: number) => {
    const freq = 0.15 + (index % 3) * 0.05;
    const amp = interpolate(
      Math.sin(frame * freq) * Math.cos(frame * 0.08), 
      [-1, 1], 
      [5, 45]
    );
    if (globalFrame < 150 || globalFrame > 240) {
      return 4; // Flat line
    }
    return amp;
  };

  // Subtitles logic (5s to 8s -> 150 to 240 global frames)
  const showSubtitles = globalFrame >= 150 && globalFrame <= 240;
  const subtitleOpacity = interpolate(globalFrame, [150, 160, 230, 240], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill style={{
      backgroundColor: ATNA_THEME.darkNavy,
      fontFamily: ATNA_THEME.fontFamily,
      overflow: 'hidden',
    }}>
      {/* 1. Video Player with fallback handling */}
      {videoExists && !videoError ? (
        <Video
          src={staticFile("unit01.mp4")}
          onError={() => setVideoError(true)}
          style={{
            width: '100%',
            height: '100%',
            position: 'absolute',
            objectFit: 'cover',
          }}
          startFrom={0}
          endAt={450}
        />
      ) : null}

      {/* 2. Fallback Visual: Cozy warm home study with floating phone */}
      {(!videoExists || videoError) && (
        <AbsoluteFill style={{
          background: 'linear-gradient(135deg, #FFFBF2 0%, #FFEBD1 100%)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          {/* Decorative Warm Ambient Circles */}
          <div style={{
            position: 'absolute',
            width: '800px',
            height: '800px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(254, 206, 133, 0.2) 0%, rgba(255,255,255,0) 70%)',
            top: '-20%',
            left: '-10%',
          }} />

          {/* Fallback Floating Smartphone Visual */}
          <div style={{
            width: '340px',
            height: '520px',
            backgroundColor: '#0F172A',
            borderRadius: '40px',
            border: '10px solid #1E293B',
            boxShadow: '0 30px 80px rgba(0,0,0,0.15)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '24px',
            transform: `translateY(${Math.sin(frame * 0.05) * 8}px)`,
          }}>
            <div style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              backgroundColor: 'rgba(255, 137, 107, 0.1)',
              border: '1px solid rgba(255, 137, 107, 0.3)',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#FF896B" strokeWidth="2">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
            </div>
            <div style={{ textAlign: 'center', color: '#FFF' }}>
              <div style={{ fontSize: '18px', fontWeight: 700 }}>Private Client Call</div>
              <div style={{ fontSize: '12px', color: '#64748B', marginTop: '4px' }}>Voice Channel [01]</div>
            </div>

            {/* Pulsing Waveform */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', height: '50px' }}>
              {Array.from({ length: 11 }).map((_, i) => (
                <div
                  key={i}
                  style={{
                    width: '4px',
                    height: `${getWaveHeight(i)}px`,
                    borderRadius: '2px',
                    backgroundColor: '#FFB74D',
                    transition: 'height 0.08s ease',
                  }}
                />
              ))}
            </div>
          </div>
        </AbsoluteFill>
      )}

      {/* 3. Programmatic Brand Overlay: Clean Call UI at the top */}
      <div style={{
        position: 'absolute',
        top: '60px',
        left: '50%',
        transform: `translateX(-50%) translateY(${interpolate(overlayEntrance, [0, 1], [-50, 0])}px)`,
        opacity: overlayEntrance,
        width: '640px',
        backgroundColor: 'rgba(15, 23, 42, 0.85)',
        backdropFilter: 'blur(20px)',
        border: `1px solid ${ATNA_THEME.mintTeal}33`,
        borderRadius: '24px',
        padding: '16px 28px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        boxShadow: '0 20px 50px rgba(0,0,0,0.15)',
        zIndex: 50,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          {/* Spoofed indicator */}
          <div style={{
            width: '44px',
            height: '44px',
            borderRadius: '12px',
            backgroundColor: 'rgba(45, 212, 191, 0.1)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            border: `1px solid ${ATNA_THEME.mintTeal}44`,
          }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={ATNA_THEME.mintTeal} strokeWidth="2.5">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
          </div>
          <div>
            <div style={{ fontSize: '16px', fontWeight: 800, color: '#FFFFFF', letterSpacing: '-0.3px' }}>
              Spoofed Voice Connection
            </div>
            <div style={{ fontSize: '12px', color: '#94A3B8', marginTop: '2px', fontWeight: 500 }}>
              Caller: Secure Verification System
            </div>
          </div>
        </div>

        <div style={{
          fontSize: '11px',
          color: ATNA_THEME.mintTeal,
          backgroundColor: `${ATNA_THEME.mintTeal}15`,
          border: `1px solid ${ATNA_THEME.mintTeal}44`,
          padding: '4px 10px',
          borderRadius: '12px',
          fontWeight: 800,
          letterSpacing: '0.5px',
        }}>
          LOGGING AUDIO
        </div>
      </div>

      {/* 4. Subtitles Overlay (5s - 8s / 150 - 240 global frames) */}
      {showSubtitles && (
        <div style={{
          position: 'absolute',
          bottom: '80px',
          left: '50%',
          transform: 'translateX(-50%)',
          backgroundColor: 'rgba(15, 23, 42, 0.9)',
          backdropFilter: 'blur(10px)',
          padding: '16px 36px',
          borderRadius: '24px',
          border: '1px solid rgba(255,255,255,0.08)',
          boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
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
            <span style={{ color: '#FDA4AF', fontWeight: 700 }}>Synthetic Voice: </span>
            "Mrs. Margaret, this is your bank's security team..."
          </p>
        </div>
      )}
    </AbsoluteFill>
  );
};
