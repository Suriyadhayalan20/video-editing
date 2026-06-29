import React from "react";
import { AbsoluteFill, Sequence } from "remotion";
import { SceneIntroOutro } from "./atna-ai/SceneIntroOutro";

const INTRO_FRAMES = 150; // 5 s
const OUTRO_FRAMES = 150; // 5 s

// Total grows as scenes are added between intro and outro
export const ATNA_AI_TOTAL_FRAMES = INTRO_FRAMES + OUTRO_FRAMES;
export const OUTRO_START = INTRO_FRAMES;

export const AtnaAiVideo: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#000000" }}>
      {/* Entry scene */}
      <Sequence from={0} durationInFrames={INTRO_FRAMES}>
        <SceneIntroOutro durationInFrames={INTRO_FRAMES} mode="intro" />
      </Sequence>

      {/* ── future scenes inserted here ── */}

      {/* Exit scene */}
      <Sequence from={OUTRO_START} durationInFrames={OUTRO_FRAMES}>
        <SceneIntroOutro durationInFrames={OUTRO_FRAMES} mode="outro" />
      </Sequence>
    </AbsoluteFill>
  );
};
