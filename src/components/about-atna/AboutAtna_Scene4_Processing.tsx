import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { AboutAtnaStyles } from "./AboutAtna_Styles";

export const AboutAtna_Scene4_Processing: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Animation values
  const containerScale = spring({ frame, fps, config: { damping: 14 } });
  
  // Progress animation (0 to 100)
  const progress = Math.floor(interpolate(frame, [15, 105], [0, 100], { extrapolateRight: "clamp", extrapolateLeft: "clamp" }));
  
  // Status text animation
  const statusIndex = Math.floor(interpolate(frame, [0, 40, 80], [0, 1, 2], { extrapolateRight: "clamp" }));
  const statuses = [
    "Analyzing footprint...",
    "Correlating signals...",
    "Finalizing risk score..."
  ];

  // Circle animation
  const strokeDasharray = 2 * Math.PI * 120; // radius is 120
  const strokeDashoffset = interpolate(progress, [0, 100], [strokeDasharray, 0]);
  const rotation = interpolate(frame, [0, 120], [0, 360]);

  return (
    <AbsoluteFill style={{ zIndex: 10, justifyContent: "center", alignItems: "center" }}>
      <div
        style={{
          ...AboutAtnaStyles.glassCardDark,
          transform: `scale(${containerScale})`,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "40px",
          padding: "64px",
          width: "600px",
        }}
      >
        <div style={{ position: "relative", width: "260px", height: "260px", display: "flex", justifyContent: "center", alignItems: "center" }}>
          {/* Background circle */}
          <svg width="260" height="260" style={{ position: "absolute" }}>
            <circle
              cx="130"
              cy="130"
              r="120"
              fill="transparent"
              stroke="rgba(255,255,255,0.1)"
              strokeWidth="12"
            />
            {/* Progress circle */}
            <circle
              cx="130"
              cy="130"
              r="120"
              fill="transparent"
              stroke="#52D8B9"
              strokeWidth="12"
              strokeLinecap="round"
              strokeDasharray={strokeDasharray}
              strokeDashoffset={strokeDashoffset}
              style={{
                transform: `rotate(-90deg)`,
                transformOrigin: "center",
              }}
            />
            {/* Spinner circle */}
            <circle
              cx="130"
              cy="130"
              r="120"
              fill="transparent"
              stroke="#357EC9"
              strokeWidth="4"
              strokeLinecap="round"
              strokeDasharray={strokeDasharray / 4}
              strokeDashoffset={0}
              style={{
                transform: `rotate(${rotation}deg)`,
                transformOrigin: "center",
              }}
            />
          </svg>
          
          <div style={{ fontSize: "64px", fontWeight: 700, color: "#fff" }}>
            {progress}%
          </div>
        </div>

        <div style={{ fontSize: "24px", color: "rgba(255,255,255,0.7)", textAlign: "center" }}>
          {statuses[statusIndex]}
        </div>
      </div>
    </AbsoluteFill>
  );
};
