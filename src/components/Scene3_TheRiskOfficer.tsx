/* eslint-disable @remotion/no-object-fit-on-media-video */
import React, { useState, useEffect } from 'react';
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig, Video, staticFile, Easing } from 'remotion';
import { ATNA_THEME } from '../theme';

interface SceneProps {
  globalFrame: number;
}

// Bounding box corner brackets for the HUD
const BoundingBox: React.FC<{ width: number; height: number; color: string; flash: boolean }> = ({ width, height, color, flash }) => {
  const borderSize = 3;
  const cornerLength = 24;
  return (
    <div style={{
      position: 'relative',
      width: `${width}px`,
      height: `${height}px`,
      transition: 'border-color 0.2s ease',
      opacity: flash ? 0.45 : 1,
    }}>
      {/* Top Left Corner */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: cornerLength, height: borderSize, backgroundColor: color }} />
      <div style={{ position: 'absolute', top: 0, left: 0, width: borderSize, height: cornerLength, backgroundColor: color }} />

      {/* Top Right Corner */}
      <div style={{ position: 'absolute', top: 0, right: 0, width: cornerLength, height: borderSize, backgroundColor: color }} />
      <div style={{ position: 'absolute', top: 0, right: 0, width: borderSize, height: cornerLength, backgroundColor: color }} />

      {/* Bottom Left Corner */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, width: cornerLength, height: borderSize, backgroundColor: color }} />
      <div style={{ position: 'absolute', bottom: 0, left: 0, width: borderSize, height: cornerLength, backgroundColor: color }} />

      {/* Bottom Right Corner */}
      <div style={{ position: 'absolute', bottom: 0, right: 0, width: cornerLength, height: borderSize, backgroundColor: color }} />
      <div style={{ position: 'absolute', bottom: 0, right: 0, width: borderSize, height: cornerLength, backgroundColor: color }} />
    </div>
  );
};

const ScanHUD: React.FC<{ frame: number; active: boolean }> = ({ frame, active }) => {
  const flash = frame % 20 < 10;
  const laserPosition = interpolate(frame % 90, [0, 45, 90], [10, 270, 10], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <div style={{
      position: 'absolute',
      top: '200px',
      left: '120px',
      zIndex: 60,
      display: 'flex',
      flexDirection: 'column',
      gap: '16px',
    }}>
      {/* Main scanner HUD block */}
      <div style={{ position: 'relative' }}>
        <BoundingBox width={460} height={280} color={ATNA_THEME.mintTeal} flash={flash && !active} />
        
        {/* Laser line sweeping */}
        <div style={{
          position: 'absolute',
          top: `${laserPosition}px`,
          left: '10px',
          width: '440px',
          height: '2px',
          backgroundColor: ATNA_THEME.mintTeal,
          boxShadow: `0 0 12px 2px ${ATNA_THEME.mintTeal}`,
          pointerEvents: 'none',
          opacity: 0.8,
        }} />

        {/* HUD Data overlays */}
        <div style={{
          position: 'absolute',
          top: '24px',
          left: '28px',
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
          fontFamily: "'Courier New', monospace",
          color: ATNA_THEME.mintTeal,
          fontSize: '13px',
          fontWeight: 'bold',
        }}>
          <div>SYS.LOC: NETWORK_CHANNEL_02</div>
          <div>SCAN_MODE: MULTI_MODAL_LIVE</div>
          <div>STREAM: INCOMING_V_SIGNATURE</div>
        </div>
      </div>

      {/* Flashing alerts based on senior creative editor directions */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        width: '460px',
      }}>
        {/* Tag 1: TRU IDV // SCANNING */}
        <div style={{
          backgroundColor: 'rgba(15, 23, 42, 0.85)',
          backdropFilter: 'blur(10px)',
          border: `1px solid ${ATNA_THEME.mintTeal}44`,
          borderRadius: '12px',
          padding: '12px 20px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
        }}>
          <span style={{ fontSize: '13px', color: '#FFF', fontWeight: 800, letterSpacing: '0.5px' }}>
            TRU IDV // ACTIVE AUDIT
          </span>
          <span style={{
            fontSize: '12px',
            color: ATNA_THEME.mintTeal,
            fontWeight: 800,
            opacity: flash ? 0.5 : 1,
          }}>
            ● SCANNING
          </span>
        </div>

        {/* Tag 2: SYNTHETIC VOICE DETECTED: 97% // TRANSACTION FROZEN */}
        <div style={{
          backgroundColor: 'rgba(239, 68, 68, 0.1)',
          backdropFilter: 'blur(10px)',
          border: `1px solid #EF444466`,
          borderRadius: '12px',
          padding: '12px 20px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
          opacity: frame >= 90 ? 1 : 0, // Reveals mid-scene
          transform: `scale(${frame >= 90 ? 1 : 0.95})`,
          transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        }}>
          <span style={{ fontSize: '13px', color: '#FFF', fontWeight: 800, letterSpacing: '0.5px' }}>
            SYNTHETIC VOICE DETECTED: <span style={{ color: '#EF4444' }}>97%</span>
          </span>
          <span style={{
            fontSize: '11px',
            color: '#EF4444',
            backgroundColor: 'rgba(239, 68, 68, 0.15)',
            padding: '2px 8px',
            borderRadius: '6px',
            fontWeight: 900,
          }}>
            TRANSACTION FROZEN
          </span>
        </div>
      </div>
    </div>
  );
};

export const Scene3_TheRiskOfficer: React.FC<SceneProps> = ({ globalFrame }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const [videoExists, setVideoExists] = useState(false);
  const [videoError, setVideoError] = useState(false);

  useEffect(() => {
    fetch(staticFile("unit03.mp4"), { method: 'HEAD' })
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

  // Fallback voice gauge scan
  const gaugePercentVal = interpolate(frame, [15, 90], [0, 97.4], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.25, 1, 0.5, 1),
  });

  const freezeTrigger = frame >= 90;
  const freezeSpring = spring({
    fps,
    frame: frame - 90,
    config: { damping: 15, stiffness: 80 },
  });

  // Waveform scan animation
  const getCmdWaveHeight = (index: number) => {
    const offset = index * 0.3;
    const wave = Math.sin(frame * 0.2 - offset) * Math.cos(frame * 0.05);
    const scale = freezeTrigger ? 0.25 : 1.0;
    return interpolate(wave, [-1, 1], [4, 60]) * scale;
  };

  // Subtitles (37s to 43s -> 1110 to 1290 global frames)
  const showSubtitles = globalFrame >= 1110 && globalFrame <= 1290;
  const subtitleOpacity = interpolate(globalFrame, [1110, 1125, 1275, 1290], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill style={{
      backgroundColor: '#050B14',
      fontFamily: ATNA_THEME.fontFamily,
      overflow: 'hidden',
    }}>
      {videoExists && !videoError ? (
        <Video
          src={staticFile("unit03.mp4")}
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

      {/* 2. Fallback Visual: Command Center HUD backdrop */}
      {(!videoExists || videoError) && (
        <AbsoluteFill style={{
          backgroundColor: '#030810',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          {/* Dashboard Frame Grid */}
          <div style={{
            position: 'absolute',
            top: 0, left: 0, right: 0, bottom: 0,
            backgroundImage: 'linear-gradient(rgba(45, 212, 191, 0.01) 1px, transparent 1px), linear-gradient(90deg, rgba(45, 212, 191, 0.01) 1px, transparent 1px)',
            backgroundSize: '30px 30px',
          }} />

          {/* Central Waveform Visualizer */}
          <div style={{
            width: '680px',
            height: '240px',
            backgroundColor: 'rgba(10, 20, 38, 0.4)',
            border: '1px solid rgba(255,255,255,0.04)',
            borderRadius: '24px',
            padding: '36px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            transform: 'translate(280px, -50px)',
          }}>
            {Array.from({ length: 18 }).map((_, idx) => (
              <div
                key={idx}
                style={{
                  width: '6px',
                  height: `${getCmdWaveHeight(idx)}px`,
                  borderRadius: '3px',
                  backgroundColor: freezeTrigger ? '#EF4444' : ATNA_THEME.mintTeal,
                  opacity: freezeTrigger ? 0.35 : 0.8,
                  transition: 'height 0.05s ease',
                }}
              />
            ))}
          </div>

          {/* Status Telemetry Card (Right) */}
          <div style={{
            position: 'absolute',
            top: '200px',
            right: '120px',
            width: '320px',
            backgroundColor: 'rgba(10, 20, 38, 0.6)',
            border: '1px solid rgba(255,255,255,0.06)',
            borderRadius: '20px',
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
          }}>
            <div style={{ fontSize: '11px', color: '#64748B', fontWeight: 800 }}>THREAT ANALYSIS</div>
            <div>
              <div style={{ fontSize: '20px', fontWeight: 800, color: '#FFF' }}>Voice Liveness</div>
              <div style={{ fontSize: '28px', color: '#EF4444', fontWeight: 800, marginTop: '8px' }}>
                {gaugePercentVal.toFixed(1)}%
              </div>
            </div>
            <div style={{ fontSize: '12px', color: '#94A3B8', lineHeight: 1.4 }}>
              Engine: Tru Yu Auditing <br />
              Status: Clone Detected
            </div>
          </div>
        </AbsoluteFill>
      )}

      {/* 3. Programmatic ScanHUD Overlay (Custom Bounding Box + laser scan lines) */}
      <ScanHUD frame={frame} active={freezeTrigger} />

      {/* 4. Overlay: Transaction Frozen confirmation (pops in when freezeTrigger becomes true) */}
      {freezeTrigger && (
        <div style={{
          position: 'absolute',
          bottom: '180px',
          right: '120px',
          width: '420px',
          backgroundColor: '#0F172A',
          border: `2px solid ${ATNA_THEME.mintTeal}`,
          boxShadow: '0 20px 50px rgba(45, 212, 191, 0.2)',
          borderRadius: '24px',
          padding: '28px 32px',
          zIndex: 100,
          opacity: freezeSpring,
          transform: `scale(${interpolate(freezeSpring, [0, 1], [0.9, 1])})`,
          transition: 'all 0.1s ease',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
            <div style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              backgroundColor: 'rgba(45, 212, 191, 0.1)',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={ATNA_THEME.mintTeal} strokeWidth="3">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <h4 style={{ fontSize: '18px', fontWeight: 800, color: '#FFF', margin: 0 }}>
              MITIGATION COMPLETED
            </h4>
          </div>
          <p style={{ fontSize: '14px', color: '#94A3B8', lineHeight: 1.45, margin: 0 }}>
            Atna Tru Suite successfully froze checking transfer transaction ****9402. Synthetic voice threat neutralized.
          </p>
        </div>
      )}

      {/* 5. Subtitles Overlay (37s to 43s -> 1110 to 1290 global frames) */}
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
          border: `1px solid ${ATNA_THEME.mintTeal}44`,
          boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
          opacity: subtitleOpacity,
          textAlign: 'center',
          maxWidth: '850px',
          zIndex: 200,
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
            "Flag it. Synthetic voice pattern — probability 97%. Freeze the transaction."
          </p>
        </div>
      )}
    </AbsoluteFill>
  );
};
