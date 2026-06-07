import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { Briefcase, User, ShieldCheck } from "lucide-react";

const personas = [
  { name: "Roger Kenter", role: "Finance Manager", action: "Approving claims manually" },
  { name: "Allison Levin", role: "Compliance Officer", action: "Validating critical information" },
  { name: "David Chen", role: "Risk Analyst", action: "Reviewing vendor applications" }
];

const PersonaBadge: React.FC<{ index: number; data: typeof personas[0] }> = ({ index, data }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  
  // Each persona stays in center for 100 frames. 
  // Entrance: index * 100
  const enterFrame = index * 120 + 30;
  
  const yPos = interpolate(frame, [enterFrame - 30, enterFrame, enterFrame + 90, enterFrame + 120], [200, 0, 0, -200], { extrapolateRight: "clamp", extrapolateLeft: "clamp" });
  const opacity = interpolate(frame, [enterFrame - 30, enterFrame, enterFrame + 90, enterFrame + 120], [0, 1, 1, 0], { extrapolateRight: "clamp", extrapolateLeft: "clamp" });
  const scale = interpolate(frame, [enterFrame - 30, enterFrame, enterFrame + 90, enterFrame + 120], [0.8, 1, 1, 0.8], { extrapolateRight: "clamp", extrapolateLeft: "clamp" });

  const textProgress = spring({
    frame: frame - (enterFrame + 15),
    fps,
    config: { damping: 14 }
  });

  const textY = interpolate(textProgress, [0, 1], [40, 0]);
  const textOpacity = interpolate(textProgress, [0, 1], [0, 1]);

  return (
    <div style={{
      position: "absolute",
      top: "50%", left: "50%",
      transform: `translate(-50%, -50%) translateY(${yPos}px) scale(${scale})`,
      opacity,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "24px"
    }}>
      {/* Badge */}
      <div style={{
        display: "flex",
        alignItems: "center",
        gap: "24px",
        backgroundColor: "#1A1A1A",
        border: "1px solid #333",
        padding: "24px 40px",
        borderRadius: "100px",
        boxShadow: "0 20px 40px rgba(0,0,0,0.5), inset 0 0 20px rgba(255,255,255,0.05)"
      }}>
        <div style={{ width: "64px", height: "64px", backgroundColor: "#333", borderRadius: "50%", display: "flex", justifyContent: "center", alignItems: "center" }}>
          <User size={32} color="#AAA" />
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <span style={{ fontSize: "32px", fontWeight: 700, color: "#FFF" }}>{data.name}</span>
          <span style={{ fontSize: "20px", color: "#4AF2A1", display: "flex", alignItems: "center", gap: "8px" }}>
            <Briefcase size={16} /> {data.role}
          </span>
        </div>
      </div>

      {/* Kinetic Text Underneath */}
      <div style={{
        transform: `translateY(${textY}px)`,
        opacity: textOpacity,
        fontSize: "32px",
        color: "#CCC",
        fontWeight: 400,
        display: "flex",
        alignItems: "center",
        gap: "12px",
        backgroundColor: "rgba(0,0,0,0.5)",
        padding: "12px 24px",
        borderRadius: "16px",
        border: "1px solid #222"
      }}>
        <ShieldCheck size={28} color="#4AF2A1" />
        {data.action}
      </div>
    </div>
  );
};

export const Scene4_PersonaCard: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#0A0A0A" }}>
      {personas.map((p, i) => (
        <PersonaBadge key={i} index={i} data={p} />
      ))}
    </AbsoluteFill>
  );
};
