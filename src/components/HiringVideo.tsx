import React from 'react';
import { AbsoluteFill, Sequence } from 'remotion';
import { Scene1_ColdOpen } from './hiring/Scene1_ColdOpen';
import { Scene2_Stat } from './hiring/Scene2_Stat';
import { Scene3_Product } from './hiring/Scene3_Product';
import { Scene4_AdaptiveRisk } from './hiring/Scene4_AdaptiveRisk';
import { Scene5_Culture } from './hiring/Scene5_Culture';
import { Scene6_CTA } from './hiring/Scene6_CTA';

// Apple-style ATNA hiring film. 60s @ 30fps = 1800 frames.
//
// Beat sheet:
//   00.0–06.0s  (frames    0– 180)  Cold open      "We don't see customers. We see signals."
//   06.0–15.0s  (frames  180– 450)  Stat           "Every 39 seconds…"
//   15.0–28.0s  (frames  450– 840)  Product        Onboarding signals + adaptive risk score
//   28.0–38.0s  (frames  840–1140)  Intelligence   Adaptive network graph
//   38.0–48.0s  (frames 1140–1440)  Team           Eng · Research · Design pillars
//   48.0–60.0s  (frames 1440–1800)  CTA            Open roles + end card
export const HiringVideo: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: '#000000' }}>
      <Sequence durationInFrames={180}>
        <Scene1_ColdOpen />
      </Sequence>

      <Sequence from={180} durationInFrames={270}>
        <Scene2_Stat />
      </Sequence>

      <Sequence from={450} durationInFrames={390}>
        <Scene3_Product />
      </Sequence>

      <Sequence from={840} durationInFrames={300}>
        <Scene4_AdaptiveRisk />
      </Sequence>

      <Sequence from={1140} durationInFrames={300}>
        <Scene5_Culture />
      </Sequence>

      <Sequence from={1440} durationInFrames={360}>
        <Scene6_CTA />
      </Sequence>
    </AbsoluteFill>
  );
};
