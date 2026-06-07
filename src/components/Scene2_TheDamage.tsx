/* eslint-disable @remotion/no-object-fit-on-media-video */
import React, { useState, useEffect } from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame, Video, staticFile, Easing } from 'remotion';
import { ATNA_THEME } from '../theme';

interface SceneProps {
  globalFrame: number;
}

export const Scene2_TheDamage: React.FC<SceneProps> = ({ globalFrame }) => {
  const frame = useCurrentFrame();
  const [videoExists, setVideoExists] = useState(false);
  const [videoError, setVideoError] = useState(false);

  useEffect(() => {
    fetch(staticFile("unit02.mp4"), { method: 'HEAD' })
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

  // Stats Text Slide-in Opacity using the exact Senior Editor equation
  const opacity = interpolate(globalFrame, [660, 680], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const statsTranslateY = interpolate(globalFrame, [660, 680], [25, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.25, 1, 0.5, 1),
  });

  // Pulse animation for warning tags
  const pulse = Math.abs(Math.sin(frame * 0.08));

  // Counter logic for unauthorized transfer
  const countProgress = interpolate(frame, [0, 80], [0, 45200], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.quad),
  });
  const currentAmount = Math.floor(countProgress).toLocaleString();

  // Subtitles timing (15s to 20s overall -> 450 to 600 global frames)
  const showSubtitles = globalFrame >= 450 && globalFrame <= 600;
  const subtitleOpacity = interpolate(globalFrame, [450, 465, 585, 600], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill style={{
      backgroundColor: '#020617',
      fontFamily: ATNA_THEME.fontFamily,
      overflow: 'hidden',
    }}>
      {videoExists && !videoError ? (
        <Video
          src={staticFile("unit02.mp4")}
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

      {/* 2. Fallback Visual: Moody, cold dark blue dashboard */}
      {(!videoExists || videoError) && (
        <AbsoluteFill style={{
          background: 'radial-gradient(circle at center, #0B132B 0%, #020617 100%)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          {/* Grid Overlay to represent a system vulnerability state */}
          <div style={{
            position: 'absolute',
            top: 0, left: 0, right: 0, bottom: 0,
            backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.015) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
            opacity: 0.8,
          }} />

          {/* Drained Account Mock Card */}
          <div style={{
            width: '600px',
            backgroundColor: 'rgba(15, 23, 42, 0.65)',
            backdropFilter: 'blur(20px)',
            borderRadius: '32px',
            border: '1px solid rgba(239, 68, 68, 0.25)',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.4)',
            padding: '48px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            height: '420px',
            boxSizing: 'border-box',
          }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <span style={{ fontSize: '14px', color: '#64748B', fontWeight: 700, letterSpacing: '1px' }}>
                  WIRE TRANSFER OUTGOING
                </span>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  backgroundColor: 'rgba(239, 68, 68, 0.1)',
                  padding: '6px 12px',
                  borderRadius: '12px',
                  border: '1px solid rgba(239, 68, 68, 0.3)',
                }}>
                  <span style={{
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    backgroundColor: '#EF4444',
                    opacity: pulse * 0.5 + 0.5,
                  }} />
                  <span style={{ fontSize: '11px', color: '#EF4444', fontWeight: 800 }}>UNAUTHORIZED</span>
                </div>
              </div>

              <h3 style={{ fontSize: '28px', color: '#FFFFFF', fontWeight: 800, margin: '0 0 4px 0', letterSpacing: '-0.5px' }}>
                Margaret Sen-Gupta
              </h3>
              <p style={{ fontSize: '14px', color: '#475569', margin: '0 0 32px 0' }}>
                Checking Account **** 9402
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <span style={{ fontSize: '12px', color: '#94A3B8', fontWeight: 600 }}>Amount Transferred</span>
                <span style={{ fontSize: '56px', color: '#EF4444', fontWeight: 800, letterSpacing: '-1.5px', lineHeight: 1 }}>
                  -${currentAmount}.00
                </span>
              </div>
            </div>

            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              borderTop: '1px solid rgba(255, 255, 255, 0.06)',
              paddingTop: '20px',
              fontSize: '14px',
              color: '#475569',
            }}>
              <span>Routing: SWIFT-INTL-190</span>
              <span style={{ color: '#EF4444', fontWeight: 700 }}>Wire Settled</span>
            </div>
          </div>
        </AbsoluteFill>
      )}

      {/* 3. Programmatic Text Slide-in Stats Card (Sliding in at 22s / 660 frames) */}
      <div style={{
        position: 'absolute',
        top: '60px',
        right: '80px',
        width: '540px',
        backgroundColor: 'rgba(15, 23, 42, 0.85)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(239, 68, 68, 0.3)',
        borderRadius: '28px',
        padding: '36px',
        boxShadow: '0 30px 60px rgba(0,0,0,0.3)',
        opacity: opacity,
        transform: `translateY(${statsTranslateY}px)`,
        zIndex: 50,
      }}>
        {/* Exposure Banner */}
        <div style={{
          alignSelf: 'flex-start',
          backgroundColor: 'rgba(239, 68, 68, 0.1)',
          border: '1px solid rgba(239, 68, 68, 0.3)',
          color: '#EF4444',
          padding: '6px 12px',
          borderRadius: '16px',
          fontSize: '12px',
          fontWeight: 800,
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          marginBottom: '20px',
          letterSpacing: '0.5px',
        }}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
          </svg>
          CRITICAL FRAUD THREAT
        </div>

        <h3 style={{
          fontSize: '28px',
          color: '#FFFFFF',
          fontWeight: 800,
          lineHeight: 1.2,
          margin: '0 0 16px 0',
          letterSpacing: '-0.5px',
        }}>
          Deepfake fraud is escalating globally.
        </h3>

        <p style={{
          fontSize: '18px',
          color: '#94A3B8',
          lineHeight: 1.45,
          margin: '0 0 24px 0',
          fontWeight: 500,
        }}>
          Over <span style={{ color: '#EF4444', fontWeight: 700 }}>$40 Billion</span> lost in 2024 to digital identity and voice clone security exploits.
        </p>

        <div style={{
          fontSize: '11px',
          color: '#64748B',
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: '1px',
        }}>
          Source: Gartner / FBI IC3 Security Analysis
        </div>
      </div>

      {/* 4. Subtitles Overlay (15s to 20s -> 450 to 600 global frames) */}
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
          border: '1px solid rgba(239, 68, 68, 0.2)',
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
            fontStyle: 'italic',
          }}>
            <span style={{ color: '#F87171', fontWeight: 700, fontStyle: 'normal' }}>Margaret: </span>
            "It was my bank. I trusted the voice."
          </p>
        </div>
      )}
    </AbsoluteFill>
  );
};
