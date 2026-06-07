import React from 'react';
import { AbsoluteFill, spring, useCurrentFrame, useVideoConfig, interpolate, Easing } from 'remotion';
import { Scene2_RiskMeter } from './Scene2_RiskMeter';

export const Scene4_Dashboard: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 1. Scene fade & scale-in entrance
  const sceneOpacity = interpolate(frame, [0, 15], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const sceneExitOpacity = interpolate(frame, [280, 295], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const sceneScale = spring({
    fps,
    frame,
    config: {
      damping: 24,
      stiffness: 75,
      mass: 0.95,
    },
  });

  // 2. Right Card: Staggered Intel Items Entrance
  const badgeOpacity = interpolate(frame, [125, 140], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  
  const badgeTranslateY = interpolate(frame, [125, 140], [15, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.25, 1, 0.5, 1),
  });

  const getIntelOpacity = (f: number, delay: number) => {
    return interpolate(f, [delay, delay + 15], [0, 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    });
  };

  const getIntelTranslateY = (f: number, delay: number) => {
    return interpolate(f, [delay, delay + 15], [15, 0], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.bezier(0.25, 1, 0.5, 1),
    });
  };

  // Staggered delays for list items (start after Risk Meter completes at ~130)
  const intelDelays = [135, 145, 155, 165, 175, 185];

  // 3. Bottom Row: Staggered Container Entrances & Counting scores
  const dlOpacity = interpolate(frame, [195, 215], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const dlTranslateY = interpolate(frame, [195, 215], [30, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.25, 1, 0.5, 1),
  });
  const dlCountProgress = interpolate(frame, [215, 245], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.25, 1, 0.5, 1),
  });
  const dlScore = Math.round(interpolate(dlCountProgress, [0, 1], [0, 85]));

  const passportOpacity = interpolate(frame, [225, 245], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const passportTranslateY = interpolate(frame, [225, 245], [30, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.25, 1, 0.5, 1),
  });
  const passportCountProgress = interpolate(frame, [245, 275], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.25, 1, 0.5, 1),
  });
  const passportScore = Math.round(interpolate(passportCountProgress, [0, 1], [0, 78]));

  const panOpacity = interpolate(frame, [255, 275], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const panTranslateY = interpolate(frame, [255, 275], [30, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.25, 1, 0.5, 1),
  });
  const panCountProgress = interpolate(frame, [275, 295], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.25, 1, 0.5, 1),
  });
  const panScore = Math.round(interpolate(panCountProgress, [0, 1], [0, 15]));

  return (
    <AbsoluteFill style={{
      backgroundColor: '#EFF7F9',
      justifyContent: 'center',
      alignItems: 'center',
      fontFamily: "'Plus Jakarta Sans', sans-serif",
      opacity: sceneOpacity * sceneExitOpacity,
    }}>
      {/* Full-width container filling the entire 1920x1080 screen with slightly reduced padding to prevent crop */}
      <div style={{
        transform: `scale(${sceneScale})`,
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '60px 80px 70px 80px',
        boxSizing: 'border-box',
      }}>
        {/* TOP ROW: Gauge (Left) & Intel List (Right) */}
        <div style={{
          display: 'flex',
          gap: '80px',
          height: '620px',
          alignItems: 'center',
        }}>
          {/* Top-Left Element: Semicircular Risk Meter (Stretches to fill visual space) */}
          <div style={{
            flex: 1.1,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'relative',
            height: '100%',
          }}>
            <div style={{
              width: '100%',
              height: '100%',
              maxHeight: '520px',
              position: 'relative',
              overflow: 'visible',
              transform: 'scale(1.18) translate(40px, 15px)', // Modest scale + translate to keep ATNA logo fully visible and safe from edges
            }}>
              <Scene2_RiskMeter isEmbedded />
            </div>
          </div>

          {/* Top-Right Element: Atna Score Intel */}
          <div style={{
            flex: 1.2,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            height: '100%',
            paddingLeft: '40px',
          }}>
            {/* Header Badge */}
            <div style={{ 
              alignSelf: 'flex-start', 
              display: 'flex', 
              alignItems: 'center', 
              gap: '8px', 
              backgroundColor: 'rgba(73, 232, 195, 0.15)', 
              padding: '8px 16px', 
              borderRadius: '24px', 
              marginBottom: '28px', 
              border: '1px solid rgba(73, 232, 195, 0.35)',
              opacity: badgeOpacity,
              transform: `translateY(${badgeTranslateY}px)`,
            }}>
              {/* Star Icon */}
              <svg width="14" height="14" viewBox="0 0 12 12" fill="none">
                <path d="M6 0L7.5 4.5L12 6L7.5 7.5L6 12L4.5 7.5L0 6L4.5 4.5L6 0Z" fill="#0da17d" />
              </svg>
              <span style={{ fontSize: '15px', fontWeight: 800, color: '#0da17d', letterSpacing: '-0.2px' }}>Atna Score Intel</span>
            </div>

            {/* Bullet Points Grid Layout */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '24px',
            }}>
              {/* Point 1 (Expired Passport) */}
              <div style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '16px',
                opacity: getIntelOpacity(frame, intelDelays[0]),
                transform: `translateY(${getIntelTranslateY(frame, intelDelays[0])}px)`,
              }}>
                <div style={{ minWidth: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#FF896B', marginTop: '13px' }} />
                <span style={{ fontSize: '24px', color: '#374151', lineHeight: '1.5' }}>
                  <strong style={{ color: '#FF896B', fontWeight: 700 }}>Expired</strong> Passport detected
                </span>
              </div>

              {/* Point 2 (Inconsistent naming) */}
              <div style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '16px',
                opacity: getIntelOpacity(frame, intelDelays[1]),
                transform: `translateY(${getIntelTranslateY(frame, intelDelays[1])}px)`,
              }}>
                <div style={{ minWidth: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#FF896B', marginTop: '13px' }} />
                <span style={{ fontSize: '24px', color: '#374151', lineHeight: '1.5' }}>
                  <strong style={{ color: '#0A0A0A', fontWeight: 700 }}>Identity has inconsistent naming</strong> formats across passport and PAN records.
                </span>
              </div>

              {/* Point 3 (Partial match first name) */}
              <div style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '16px',
                opacity: getIntelOpacity(frame, intelDelays[2]),
                transform: `translateY(${getIntelTranslateY(frame, intelDelays[2])}px)`,
              }}>
                <div style={{ minWidth: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#FFCC45', marginTop: '13px' }} />
                <span style={{ fontSize: '24px', color: '#374151', lineHeight: '1.5' }}>
                  <strong style={{ color: '#0A0A0A', fontWeight: 700 }}>Partial match</strong> in first name suggests cross-record verification is recommended.
                </span>
              </div>

              {/* Point 4 (PAN record variation) */}
              <div style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '16px',
                opacity: getIntelOpacity(frame, intelDelays[3]),
                transform: `translateY(${getIntelTranslateY(frame, intelDelays[3])}px)`,
              }}>
                <div style={{ minWidth: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#FFCC45', marginTop: '13px' }} />
                <span style={{ fontSize: '24px', color: '#374151', lineHeight: '1.5' }}>
                  <strong style={{ color: '#0A0A0A', fontWeight: 700 }}>PAN record</strong> shows a name variation that may require manual confirmation.
                </span>
              </div>

              {/* Point 5 (DL Validated) */}
              <div style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '16px',
                opacity: getIntelOpacity(frame, intelDelays[4]),
                transform: `translateY(${getIntelTranslateY(frame, intelDelays[4])}px)`,
              }}>
                <div style={{ minWidth: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#49e8c3', marginTop: '13px' }} />
                <span style={{ fontSize: '24px', color: '#374151', lineHeight: '1.5' }}>
                  <strong style={{ color: '#0da17d', fontWeight: 700 }}>Validated</strong> Driving License is confirmed to be valid.
                </span>
              </div>

              {/* Point 6 (Address hierarchy) */}
              <div style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '16px',
                opacity: getIntelOpacity(frame, intelDelays[5]),
                transform: `translateY(${getIntelTranslateY(frame, intelDelays[5])}px)`,
              }}>
                <div style={{ minWidth: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#49e8c3', marginTop: '13px' }} />
                <span style={{ fontSize: '24px', color: '#374151', lineHeight: '1.5' }}>
                  <strong style={{ color: '#0da17d', fontWeight: 700 }}>Verified</strong> Address matches source records, indicating a valid source trail.
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM ROW: Dynamic metrics formatted side-by-side with border anchors (No background card) */}
        <div style={{
          display: 'flex',
          gap: '60px',
          height: '180px',
        }}>
          {/* Card 1: Driving License Verification */}
          <div style={{
            flex: 1,
            paddingLeft: '32px',
            borderLeft: '4px solid #00C77E',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            position: 'relative',
            opacity: dlOpacity,
            transform: `translateY(${dlTranslateY}px)`,
          }}>
            {/* Right-aligned Icon */}
            <div style={{
              position: 'absolute',
              top: '50%',
              right: '40px',
              transform: 'translateY(-50%)',
              width: '56px',
              height: '56px',
              borderRadius: '50%',
              backgroundColor: 'rgba(0, 199, 126, 0.1)',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
              {/* Car Icon */}
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#00C77E" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2" />
                <circle cx="7" cy="17" r="2" />
                <path d="M9 17h6" />
                <circle cx="17" cy="17" r="2" />
              </svg>
            </div>

            <div>
              <span style={{ fontSize: '16px', fontWeight: 700, color: '#4B5563', display: 'block', marginBottom: '8px' }}>
                Driving license verification
              </span>
              <span style={{ fontSize: '56px', fontWeight: 800, color: '#0A0A0A', letterSpacing: '-1.5px', lineHeight: 1 }}>
                {dlScore}%
              </span>
            </div>
          </div>

          {/* Card 2: Passport Verification */}
          <div style={{
            flex: 1,
            paddingLeft: '32px',
            borderLeft: '4px solid #FFCC45',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            position: 'relative',
            opacity: passportOpacity,
            transform: `translateY(${passportTranslateY}px)`,
          }}>
            {/* Right-aligned Icon */}
            <div style={{
              position: 'absolute',
              top: '50%',
              right: '40px',
              transform: 'translateY(-50%)',
              width: '56px',
              height: '56px',
              borderRadius: '50%',
              backgroundColor: 'rgba(255, 204, 69, 0.1)',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
              {/* Globe Icon */}
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#FFCC45" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20M2 12h20" />
              </svg>
            </div>

            <div>
              <span style={{ fontSize: '16px', fontWeight: 700, color: '#4B5563', display: 'block', marginBottom: '8px' }}>
                Passport verification
              </span>
              <span style={{ fontSize: '56px', fontWeight: 800, color: '#0A0A0A', letterSpacing: '-1.5px', lineHeight: 1 }}>
                {passportScore}%
              </span>
            </div>
          </div>

          {/* Card 3: PAN Verification */}
          <div style={{
            flex: 1,
            paddingLeft: '32px',
            borderLeft: '4px solid #FF896B',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            position: 'relative',
            opacity: panOpacity,
            transform: `translateY(${panTranslateY}px)`,
          }}>
            {/* Right-aligned Icon */}
            <div style={{
              position: 'absolute',
              top: '50%',
              right: '40px',
              transform: 'translateY(-50%)',
              width: '56px',
              height: '56px',
              borderRadius: '50%',
              backgroundColor: 'rgba(255, 137, 107, 0.1)',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
              {/* ID Card Icon */}
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#FF896B" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="4" width="18" height="16" rx="2" />
                <line x1="7" y1="8" x2="17" y2="8" />
                <line x1="7" y1="12" x2="17" y2="12" />
                <line x1="7" y1="16" x2="13" y2="16" />
              </svg>
            </div>

            <div>
              <span style={{ fontSize: '16px', fontWeight: 700, color: '#4B5563', display: 'block', marginBottom: '8px' }}>
                PAN verification
              </span>
              <span style={{ fontSize: '56px', fontWeight: 800, color: '#0A0A0A', letterSpacing: '-1.5px', lineHeight: 1 }}>
                {panScore}%
              </span>
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
