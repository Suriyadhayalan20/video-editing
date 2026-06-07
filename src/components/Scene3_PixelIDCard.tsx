import React from "react";
import { AbsoluteFill, interpolate, interpolateColors, spring, useCurrentFrame, useVideoConfig } from "remotion";

export const Scene3_PixelIDCard: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Glass position
  const xPos = interpolate(frame, [30, 70, 110, 150], [-150, 100, -80, 0], { extrapolateRight: "clamp", extrapolateLeft: "clamp" });
  const yPos = interpolate(frame, [30, 70, 110, 150], [-100, -80, 80, 0], { extrapolateRight: "clamp", extrapolateLeft: "clamp" });
  
  // Glass scale (springs at keyframes)
  const isHighlighting1 = frame > 60 && frame < 90;
  const isHighlighting2 = frame > 100 && frame < 130;
  const glassScale1 = spring({ frame: isHighlighting1 ? frame - 60 : 0, fps, config: { damping: 12 } });
  const glassScale2 = spring({ frame: isHighlighting2 ? frame - 100 : 0, fps, config: { damping: 12 } });
  const baseScale = 1;
  const glassScale = baseScale + glassScale1 * 0.5 + glassScale2 * 0.5;

  // Scan tint color
  const scanColor = interpolateColors(
    frame % 60,
    [0, 30, 60],
    ["rgba(74, 242, 161, 0.0)", "rgba(74, 242, 161, 0.15)", "rgba(74, 242, 161, 0.0)"]
  );

  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", backgroundColor: "#0A0A0A" }}>
      <div style={{
        position: "relative",
        width: "600px",
        height: "380px",
        backgroundColor: "#E0E0E0",
        borderRadius: "16px",
        padding: "32px",
        boxShadow: "0 20px 60px rgba(0,0,0,0.8)",
        overflow: "hidden",
        imageRendering: "pixelated" // gives a pixel art feel
      }}>
        {/* Scan line effect */}
        <div style={{
          position: "absolute",
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: scanColor,
          zIndex: 10,
          pointerEvents: "none"
        }} />
        
        {/* ID Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "4px solid #333", paddingBottom: "16px", marginBottom: "24px" }}>
          <div style={{ fontSize: "28px", fontWeight: "900", color: "#111", letterSpacing: "2px" }}>DRIVER LICENSE</div>
          <div style={{ width: "40px", height: "40px", backgroundColor: "#FF4500", borderRadius: "50%", border: "4px solid #111" }} /> {/* Seal */}
        </div>

        <div style={{ display: "flex", gap: "32px" }}>
          {/* Profile Vector (Pixelated style block) */}
          <div style={{ width: "160px", height: "200px", backgroundColor: "#999", border: "4px solid #111", position: "relative" }}>
            <div style={{ position: "absolute", bottom: 0, left: "20px", right: "20px", height: "80px", backgroundColor: "#555", borderRadius: "40px 40px 0 0" }} />
            <div style={{ position: "absolute", top: "30px", left: "40px", width: "80px", height: "80px", backgroundColor: "#CCC", borderRadius: "50%" }} />
          </div>

          {/* Details */}
          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "16px" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              <div style={{ width: "100%", height: "16px", backgroundColor: "#111" }} />
              <div style={{ width: "80%", height: "16px", backgroundColor: "#555" }} />
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginTop: "10px" }}>
              <div style={{ width: "40%", height: "12px", backgroundColor: "#777" }} />
              <div style={{ width: "60%", height: "12px", backgroundColor: "#777" }} />
            </div>
            
            {/* Barcode area */}
            <div style={{ display: "flex", gap: "4px", marginTop: "auto", height: "40px", alignItems: "flex-end" }}>
              {[...Array(20)].map((_, i) => (
                <div key={i} style={{ width: i % 3 === 0 ? "8px" : "4px", height: i % 2 === 0 ? "40px" : "30px", backgroundColor: "#111" }} />
              ))}
            </div>
          </div>
        </div>

        {/* Magnifying Glass */}
        <div style={{
          position: "absolute",
          top: "50%", left: "50%",
          transform: `translate(-50%, -50%) translate(${xPos}px, ${yPos}px) scale(${glassScale})`,
          zIndex: 20,
          width: "120px", height: "120px",
          border: "8px solid #4AF2A1",
          borderRadius: "50%",
          boxShadow: "0 0 0 9999px rgba(0,0,0,0.4), inset 0 0 20px rgba(74, 242, 161, 0.5), 0 0 30px #4AF2A1",
          backdropFilter: "blur(2px) contrast(1.5)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}>
          {/* Glass Handle */}
          <div style={{ position: "absolute", bottom: "-40px", right: "-40px", width: "16px", height: "60px", backgroundColor: "#4AF2A1", transform: "rotate(-45deg)", borderRadius: "8px" }} />
        </div>
      </div>
    </AbsoluteFill>
  );
};
