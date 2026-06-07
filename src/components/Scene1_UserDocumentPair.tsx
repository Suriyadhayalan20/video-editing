import React from "react";
import { AbsoluteFill, interpolate, interpolateColors, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { User, FileText } from "lucide-react";

export const Scene1_UserDocumentPair: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = spring({
    frame: frame - 30, // Start transition at 1 second
    fps,
    config: { damping: 12, mass: 0.5 },
  });

  const rotateY = interpolate(progress, [0, 1], [0, 25]);
  const rotateX = interpolate(progress, [0, 1], [0, 10]);
  const scale = interpolate(progress, [0, 1], [1, 0.9]);
  
  const ambientColor = interpolateColors(
    progress,
    [0, 1],
    ["rgba(255, 255, 255, 0.0)", "rgba(255, 50, 50, 0.15)"]
  );

  const glowOpacity = interpolate(progress, [0, 1], [0, 1]);

  return (
    <AbsoluteFill style={{ 
      justifyContent: "center", 
      alignItems: "center",
      perspective: "1200px"
    }}>
      <div style={{
        position: "absolute",
        top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: ambientColor,
        transition: "background-color 0.1s"
      }} />
      
      <div style={{
        display: "flex",
        gap: "40px",
        transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${scale})`,
        transformStyle: "preserve-3d",
      }}>
        {/* Portrait Card */}
        <div style={{
          width: "300px",
          height: "400px",
          backgroundColor: "#1A1A1A",
          borderRadius: "24px",
          border: "1px solid #333",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: `0 20px 50px rgba(0,0,0,0.5), 0 0 40px rgba(255, 50, 50, ${glowOpacity * 0.3})`,
          position: "relative",
          overflow: "hidden"
        }}>
          <div style={{
            width: "150px", height: "150px", borderRadius: "50%",
            backgroundColor: "#2A2A2A", display: "flex", alignItems: "center", justifyContent: "center",
            marginBottom: "20px"
          }}>
            <User size={80} color="#666" />
          </div>
          <div style={{ width: "60%", height: "12px", backgroundColor: "#333", borderRadius: "6px", marginBottom: "10px" }} />
          <div style={{ width: "40%", height: "12px", backgroundColor: "#333", borderRadius: "6px" }} />
        </div>

        {/* Form UI */}
        <div style={{
          width: "400px",
          height: "500px",
          backgroundColor: "#111",
          borderRadius: "16px",
          border: "1px solid #333",
          padding: "32px",
          boxShadow: `0 20px 50px rgba(0,0,0,0.5), 0 0 40px rgba(255, 50, 50, ${glowOpacity * 0.3})`,
          display: "flex",
          flexDirection: "column",
          gap: "16px"
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
            <FileText size={24} color="#4AF2A1" />
            <h2 style={{ margin: 0, fontSize: "20px", color: "#FFF", fontWeight: 600 }}>
              Application for New Residential Service
            </h2>
          </div>
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              <div style={{ width: "30%", height: "8px", backgroundColor: "#444", borderRadius: "4px" }} />
              <div style={{ width: "100%", height: "32px", backgroundColor: "#222", borderRadius: "4px", border: "1px solid #333" }} />
            </div>
          ))}
        </div>
      </div>
    </AbsoluteFill>
  );
};
