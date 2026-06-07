import React from 'react';
import { AbsoluteFill, Sequence, useCurrentFrame } from 'remotion';
import { Scene1_TheTrap } from './Scene1_TheTrap';
import { Scene2_TheDamage } from './Scene2_TheDamage';
import { Scene3_TheRiskOfficer } from './Scene3_TheRiskOfficer';
import { Scene4_TheNewStandard } from './Scene4_TheNewStandard';

export const CyberSecurityVideo: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={{ backgroundColor: '#050B14' }}>
      {/* 
        Act 1: The Trap Is Set (0 - 450 frames, 0 - 15 seconds)
      */}
      <Sequence durationInFrames={450}>
        <Scene1_TheTrap globalFrame={frame} />
      </Sequence>
      
      {/* 
        Act 2: The Damage Done (450 - 900 frames, 15 - 30 seconds)
      */}
      <Sequence from={450} durationInFrames={450}>
        <Scene2_TheDamage globalFrame={frame} />
      </Sequence>

      {/*
        Act 3: The Risk Officer Sees the Pattern (900 - 1350 frames, 30 - 45 seconds)
      */}
      <Sequence from={900} durationInFrames={450}>
        <Scene3_TheRiskOfficer globalFrame={frame} />
      </Sequence>

      {/*
        Act 4: tru.atna.ai - The New Standard (1350 - 1800 frames, 45 - 60 seconds)
      */}
      <Sequence from={1350} durationInFrames={450}>
        <Scene4_TheNewStandard globalFrame={frame} />
      </Sequence>
    </AbsoluteFill>
  );
};
