import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

export const Scene7_LogoReveal: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Background radial wipe from center
  const wipeProgress = spring({
    frame,
    fps,
    config: { damping: 20, mass: 2 }
  });

  const wipeSize = interpolate(wipeProgress, [0, 1], [0, 3000]); // expands beyond 1920x1080

  // Loader spinning and locking
  const lockProgress = spring({
    frame: frame - 20, // starts after wipe
    fps,
    config: { damping: 12 }
  });

  const loaderRotation = interpolate(lockProgress, [0, 1], [0, 720]);
  const logoScale = interpolate(lockProgress, [0, 0.8, 1], [0, 1.2, 1]);
  const textOpacity = interpolate(lockProgress, [0.5, 1], [0, 1], { extrapolateLeft: "clamp" });

  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", backgroundColor: "#0A0A0A", overflow: "hidden" }}>
      {/* Radial Wipe */}
      <div style={{
        position: "absolute",
        top: "50%", left: "50%",
        transform: "translate(-50%, -50%)",
        width: `${wipeSize}px`,
        height: `${wipeSize}px`,
        backgroundColor: "#FFFFFF",
        borderRadius: "50%",
        zIndex: 1
      }} />

      {/* Brand Mark & Text */}
      <div style={{ zIndex: 10, display: "flex", alignItems: "center", gap: "24px" }}>
        {/* Animated Brand Mark */}
        <div style={{
          width: "120px", height: "120px",
          position: "relative",
          transform: `scale(${logoScale}) rotate(${loaderRotation}deg)`
        }}>
          {/* Outer Ring / Loader */}
          <div style={{
            position: "absolute", top: 0, left: 0, right: 0, bottom: 0,
            border: "12px solid #4AF2A1",
            borderTopColor: "transparent",
            borderRadius: "50%",
            transform: `rotate(${loaderRotation * 2}deg)`
          }} />
          {/* Inner Logo Lock */}
          <div style={{
            position: "absolute", top: "50%", left: "50%",
            transform: "translate(-50%, -50%)",
            width: "40px", height: "40px",
            backgroundColor: "#111",
            borderRadius: "50%",
            opacity: interpolate(lockProgress, [0.8, 1], [0, 1], { extrapolateLeft: "clamp" })
          }} />
        </div>

        {/* Text */}
        <div style={{
          fontSize: "96px",
          fontWeight: 900,
          color: "#111",
          letterSpacing: "-2px",
          opacity: textOpacity,
          transform: `translateY(${interpolate(textOpacity, [0, 1], [20, 0])}px)`
        }}>
          Atna
        </div>
      </div>
    </AbsoluteFill>
  );
};
