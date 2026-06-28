import React from "react";
import { AbsoluteFill, useCurrentFrame, spring, interpolate, useVideoConfig } from "remotion";
import { AnimatedLogo } from "../AnimatedLogo";
import { AboutAtnaStyles } from "./AboutAtna_Styles";

export const AboutAtna_Scene1_Intro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Animations
  const logoScale = spring({
    frame,
    fps,
    config: { damping: 14, mass: 0.8 },
  });

  const logoTranslateY = interpolate(frame, [0, 30], [20, 0], {
    extrapolateRight: "clamp",
  });

  const textOpacity = interpolate(frame, [15, 30], [0, 1], {
    extrapolateRight: "clamp",
  });

  const textTranslateY = spring({
    frame: frame - 15,
    fps,
    config: { damping: 14 },
  });

  const textY = interpolate(textTranslateY, [0, 1], [40, 0]);

  return (
    <AbsoluteFill style={{ zIndex: 10, justifyContent: "center", alignItems: "center" }}>
      <div
        style={{
          transform: `scale(${logoScale}) translateY(${logoTranslateY}px)`,
          marginBottom: "40px",
        }}
      >
        {/* AnimatedLogo already has a scale animation inside it, but we wrap it to position it */}
        <AnimatedLogo style={{ transform: "scale(2.5)", transformOrigin: "center" }} />
      </div>

      <div
        style={{
          opacity: textOpacity,
          transform: `translateY(${textY}px)`,
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          gap: "24px",
        }}
      >
        <h1 style={AboutAtnaStyles.heading1}>
          Intelli Digital <span style={AboutAtnaStyles.tealText}>Footprinting</span>
        </h1>
        <p style={AboutAtnaStyles.subtitle}>
          Know every digital signal before fraud happens.
        </p>
      </div>
    </AbsoluteFill>
  );
};
