import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

const Word: React.FC<{ text: string; delay: number; highlight?: boolean }> = ({ text, delay, highlight }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = spring({
    frame: frame - delay,
    fps,
    config: { damping: 12 },
  });

  const opacity = interpolate(progress, [0, 1], [0, 1]);
  const blur = interpolate(progress, [0, 1], [10, 0]);
  const scale = interpolate(progress, [0, 1], [0.8, 1]);

  const highlightFlash = highlight 
    ? interpolate(spring({ frame: frame - delay - 10, fps, config: { damping: 10 } }), [0, 0.5, 1], [1, 1.2, 1]) 
    : 1;

  return (
    <span style={{
      display: "inline-block",
      opacity,
      filter: `blur(${blur}px)`,
      transform: `scale(${scale * highlightFlash})`,
      color: highlight ? "#4AF2A1" : "#FFF",
      marginRight: "16px",
      fontWeight: highlight ? 700 : 500,
      textShadow: highlight ? "0 0 20px rgba(74, 242, 161, 0.5)" : "none"
    }}>
      {text}
    </span>
  );
};

export const Scene2_KineticText: React.FC = () => {
  const words1 = ["They", "are", "no", "longer", "just"];
  const words2 = ["convincing."];
  const words3 = ["They", "are"];
  const words4 = ["impossible", "to", "detect."];

  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", backgroundColor: "#0A0A0A" }}>
      <div style={{
        fontSize: "72px",
        textAlign: "center",
        maxWidth: "1200px",
        lineHeight: 1.4,
        display: "flex",
        flexDirection: "column",
        gap: "24px"
      }}>
        <div>
          {words1.map((w, i) => <Word key={i} text={w} delay={i * 5} />)}
          {words2.map((w, i) => <Word key={i} text={w} delay={(words1.length + i) * 5} highlight />)}
        </div>
        <div style={{ marginTop: "20px" }}>
          {words3.map((w, i) => <Word key={i} text={w} delay={(words1.length + words2.length + i) * 5 + 30} />)}
          {words4.map((w, i) => <Word key={i} text={w} delay={(words1.length + words2.length + words3.length + i) * 5 + 30} highlight />)}
        </div>
      </div>
    </AbsoluteFill>
  );
};
