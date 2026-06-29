import React from 'react';
import { AbsoluteFill, Video, staticFile } from 'remotion';

export const BrandedReferenceVideo: React.FC = () => {
  return (
    <AbsoluteFill style={{
      // Soft pastel gradient background — light teal (top-left), light pink (top-right), white (center).
      background: 'radial-gradient(circle at 50% 50%, #ffffff 20%, transparent 100%), linear-gradient(135deg, rgba(73, 232, 195, 0.25) 0%, #FFFFFF 50%, rgba(255, 192, 203, 0.2) 100%)',
      fontFamily: "'Inter', sans-serif"
    }}>
      {/* We use mixBlendMode: 'multiply' to drop the white background of the original mp4,
          allowing the soft pastel gradient to show through and naturally re-tint the video.
          We also apply a subtle color rotation to align the generic cyan closer to Atna's #49E8C3 green-teal.
       */}
      <Video 
        src={staticFile("reference video.mp4")} 
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'contain',
          mixBlendMode: 'multiply',
          filter: 'hue-rotate(-5deg) saturate(1.1)' 
        }} 
      />
    </AbsoluteFill>
  );
};
