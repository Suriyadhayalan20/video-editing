import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  interpolate,
  Easing,
  spring,
  useVideoConfig,
} from "remotion";
import { AnimatedLogo } from "../AnimatedLogo";

const TEAL = "#49e8c3";
const BAR_H = 6; // top/bottom bar height in px

// ── Logo with a single spring reveal (scale + fade, no stagger) ────────────
const CenteredLogo: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const sp = spring({
    frame: frame - 10,
    fps,
    config: { damping: 14, mass: 0.7, stiffness: 85 },
  });

  const scale   = interpolate(sp, [0, 1], [0.55, 1]);
  const opacity = interpolate(frame, [10, 35], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  return (
    <div
      style={{
        opacity,
        transform: `scale(${scale})`,
        transformOrigin: "center center",
        // reserve space for the 8× up-scaled 107×28 SVG
        width: 856,
        height: 224,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
      }}
    >
      <div
        style={{
          position: "absolute",
          transform: "scale(8)",
          transformOrigin: "center center",
        }}
      >
        <AnimatedLogo fillColor="#FFFFFF" />
      </div>
    </div>
  );
};

// ── Teal bar that slides in from one edge ──────────────────────────────────
const TealBar: React.FC<{ position: "top" | "bottom"; delay: number }> = ({
  position,
  delay,
}) => {
  const frame = useCurrentFrame();
  const width = interpolate(frame, [delay, delay + 35], [0, 1920], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  return (
    <div
      style={{
        position: "absolute",
        [position]: 0,
        left: 0,
        width,
        height: BAR_H,
        background: TEAL,
      }}
    />
  );
};

// ── Main scene ─────────────────────────────────────────────────────────────
export const SceneIntroOutro: React.FC<{
  durationInFrames: number;
  mode?: "intro" | "outro";
}> = ({ durationInFrames, mode = "intro" }) => {
  const frame = useCurrentFrame();

  const containerOpacity =
    mode === "outro"
      ? interpolate(
          frame,
          [durationInFrames - 28, durationInFrames - 6],
          [1, 0],
          {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.7, 0, 0.84, 0),
          }
        )
      : 1;

  return (
    <AbsoluteFill
      style={{ backgroundColor: "#000000", opacity: containerOpacity }}
    >
      {/* Top teal bar */}
      <TealBar position="top" delay={0} />

      {/* Bottom teal bar */}
      <TealBar position="bottom" delay={8} />

      {/* Centered logo */}
      <AbsoluteFill
        style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <CenteredLogo />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
