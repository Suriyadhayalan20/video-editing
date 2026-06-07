import React from 'react';
import { AbsoluteFill, Sequence, Video, interpolate, useCurrentFrame, Easing, staticFile, Audio } from 'remotion';
import { AnimatedLogo } from './AnimatedLogo';

export const LinkedInAdsVideo: React.FC = () => {
  const frame = useCurrentFrame();
  
  // video duration 14.931s = ~448 frames
  const videoDuration = 448;
  const textSlideDuration = 90; // 3 seconds
  const logoSlideDuration = 120; // 4 seconds
  
  const textOpacity = interpolate(
    frame - videoDuration,
    [0, 20],
    [0, 1],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
      easing: Easing.inOut(Easing.ease),
    }
  );


  const logoOpacity = interpolate(
    frame - (videoDuration + textSlideDuration),
    [0, 20],
    [0, 1],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
      easing: Easing.inOut(Easing.ease),
    }
  );

  return (
    <AbsoluteFill style={{ backgroundColor: '#000000' }}>
      <Sequence durationInFrames={videoDuration}>
        <Video src={staticFile("linkedin-ads.mp4")} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </Sequence>

      <Sequence from={videoDuration} durationInFrames={textSlideDuration}>
        <Sequence durationInFrames={65}>
          <Audio src={staticFile("text-animation.mp3")} />
        </Sequence>
        <AbsoluteFill style={{ 
          backgroundColor: '#000000', 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          flexDirection: 'column',
          // removing textOpacity fade since we are doing typewriter now
        }}>
          <h1 style={{ 
            color: '#FFFFFF', 
            fontSize: '64px', 
            textAlign: 'center', 
            fontFamily: 'system-ui, sans-serif',
            fontWeight: 400,
            lineHeight: 1.4,
            letterSpacing: '-0.02em'
          }}>
            <span>
              {"Are you recruiting whom you see?".split('').map((char, i) => (
                <span key={i} style={{ opacity: (frame - videoDuration) >= i ? 1 : 0 }}>
                  {char}
                </span>
              ))}
            </span>
            <br />
            <span>
              {"Or whom they are pretending to be?".split('').map((char, i) => (
                <span key={i} style={{ opacity: (frame - videoDuration) >= (32 + i) ? 1 : 0 }}>
                  {char}
                </span>
              ))}
            </span>
          </h1>
        </AbsoluteFill>
      </Sequence>

      <Sequence from={videoDuration + textSlideDuration} durationInFrames={logoSlideDuration}>
        <Audio src={staticFile("Logo Loading.mp3")} />
        <AbsoluteFill style={{ 
          backgroundColor: '#000000', 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          flexDirection: 'column',
          opacity: logoOpacity 
        }}>
          <div style={{ transform: 'scale(14)' }}>
            <AnimatedLogo />
          </div>
        </AbsoluteFill>
      </Sequence>
    </AbsoluteFill>
  );
};
