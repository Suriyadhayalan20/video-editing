import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

const BaseIDCard: React.FC<{ label: string; faceColor: string; style?: React.CSSProperties }> = ({ label, faceColor, style }) => {
  return (
    <div style={{
      width: "500px",
      height: "320px",
      backgroundColor: "#E0E0E0",
      borderRadius: "16px",
      padding: "24px",
      boxShadow: "0 20px 60px rgba(0,0,0,0.8)",
      overflow: "hidden",
      imageRendering: "pixelated",
      ...style
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "4px solid #333", paddingBottom: "12px", marginBottom: "20px" }}>
        <div style={{ fontSize: "24px", fontWeight: "900", color: "#FF3333", letterSpacing: "1px" }}>{label}</div>
        <div style={{ width: "32px", height: "32px", backgroundColor: "#FF4500", borderRadius: "50%", border: "4px solid #111" }} />
      </div>

      <div style={{ display: "flex", gap: "24px" }}>
        <div style={{ width: "120px", height: "160px", backgroundColor: "#999", border: "4px solid #111", position: "relative" }}>
          <div style={{ position: "absolute", bottom: 0, left: "15px", right: "15px", height: "60px", backgroundColor: "#555", borderRadius: "30px 30px 0 0" }} />
          <div style={{ position: "absolute", top: "20px", left: "30px", width: "60px", height: "60px", backgroundColor: faceColor, borderRadius: "50%" }} />
        </div>

        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "12px" }}>
          <div style={{ width: "100%", height: "12px", backgroundColor: "#111" }} />
          <div style={{ width: "80%", height: "12px", backgroundColor: "#555" }} />
          <div style={{ width: "40%", height: "8px", backgroundColor: "#777", marginTop: "10px" }} />
          <div style={{ width: "60%", height: "8px", backgroundColor: "#777" }} />
          
          <div style={{ display: "flex", gap: "4px", marginTop: "auto", height: "30px", alignItems: "flex-end" }}>
            {[...Array(15)].map((_, i) => (
              <div key={i} style={{ width: i % 3 === 0 ? "6px" : "3px", height: i % 2 === 0 ? "30px" : "20px", backgroundColor: "#111" }} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export const Scene6_IDMatrix: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Rapid cycling (Frames 0 to 180)
  const isCycling = frame < 180;
  const cycleIndex = Math.floor(frame / 10) % 3; // Change every 10 frames

  const labels = ["MANIPULATED", "SYNTHETICALLY FORGED", "DEEPFAKED"];
  const colors = ["#FF5555", "#55FF55", "#5555FF"];
  
  const currentLabel = labels[cycleIndex];
  const currentColor = colors[cycleIndex];

  // Climax duplication (Frames 180+)
  const duplicateProgress = spring({
    frame: frame - 180,
    fps,
    config: { damping: 14 }
  });

  const gap = interpolate(duplicateProgress, [0, 1], [0, 100]); // gap between cards
  const textOpacity = interpolate(duplicateProgress, [0, 1], [0, 1]);
  const textScale = interpolate(duplicateProgress, [0, 1], [0.8, 1]);

  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", backgroundColor: "#0A0A0A" }}>
      {isCycling ? (
        <BaseIDCard label={currentLabel} faceColor={currentColor} style={{ transform: `scale(1.2)` }} />
      ) : (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "60px" }}>
          <div style={{ display: "flex", gap: `${gap}px` }}>
            <BaseIDCard label="DEEPFAKED" faceColor="#CCC" />
            <BaseIDCard label="REAL ID" faceColor="#CCC" style={{ opacity: duplicateProgress }} />
          </div>
          
          <div style={{
            opacity: textOpacity,
            transform: `scale(${textScale})`,
            fontSize: "48px",
            color: "#FFF",
            fontWeight: 700,
            display: "flex",
            alignItems: "center",
            gap: "16px"
          }}>
            looks exactly like the <span style={{ color: "#4AF2A1", fontWeight: 900 }}>TRU.th</span>
          </div>
        </div>
      )}
    </AbsoluteFill>
  );
};
