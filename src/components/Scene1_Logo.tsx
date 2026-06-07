import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { AnimatedLogo } from "./AnimatedLogo";


export const Scene1_Logo: React.FC<{ isOutro?: boolean }> = ({ isOutro = false }) => {
  const frame = useCurrentFrame();

  // Opacity: Fade out at the end of Scene 1, or fade in and stay for the Outro Scene
  const opacity = isOutro
    ? interpolate(frame, [0, 15], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })
    : interpolate(frame, [80, 100], [1, 0], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ backgroundColor: "#FFF", opacity }}>
      <div style={{
        position: "absolute",
        top: "50%", left: "50%",
        transform: "translate(-50%, -50%) scale(6.5)",
      }}>
        <AnimatedLogo fillColor="#000000" />
      </div>
    </AbsoluteFill>
  );
};
