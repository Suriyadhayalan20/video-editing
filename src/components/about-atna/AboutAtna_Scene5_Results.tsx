import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { AboutAtnaStyles } from "./AboutAtna_Styles";
import { Mail, Phone, MapPin, Monitor, ShieldAlert, Activity } from "lucide-react";

export const AboutAtna_Scene5_Results: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Animation values
  const containerOpacity = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: "clamp" });
  
  // Staggered card animations
  const getCardScale = (delay: number) => spring({ frame: frame - delay, fps, config: { damping: 14 } });
  
  const signals = [
    { icon: <Mail size={24} color="#52D8B9" />, label: "Email Age", value: "3 Years", status: "Safe", delay: 10 },
    { icon: <Phone size={24} color="#52D8B9" />, label: "Phone Carrier", value: "Verizon", status: "Safe", delay: 15 },
    { icon: <MapPin size={24} color="#FFAA00" />, label: "IP Location", value: "Mismatched", status: "Warning", delay: 20 },
    { icon: <Monitor size={24} color="#FF4B4B" />, label: "Device Fingerprint", value: "Spoofed", status: "Risk", delay: 25 },
    { icon: <ShieldAlert size={24} color="#FF4B4B" />, label: "Velocity", value: "High", status: "Risk", delay: 30 },
    { icon: <Activity size={24} color="#FFAA00" />, label: "Behavioral", value: "Anomalous", status: "Warning", delay: 35 },
  ];

  const scoreScale = spring({ frame: frame - 5, fps, config: { damping: 12 } });
  const finalScore = Math.floor(interpolate(frame, [5, 45], [0, 84], { extrapolateRight: "clamp" }));

  return (
    <AbsoluteFill style={{ opacity: containerOpacity, zIndex: 10, padding: "80px", boxSizing: "border-box" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "40px" }}>
        <div>
          <h2 style={AboutAtnaStyles.heading2}>Entity Profile</h2>
          <p style={{ ...AboutAtnaStyles.subtitle, fontSize: "20px" }}>michael.j@suspicious-domain.net</p>
        </div>
      </div>

      <div style={{ display: "flex", gap: "40px", flex: 1 }}>
        {/* Left Column: Risk Score */}
        <div
          style={{
            ...AboutAtnaStyles.glassCard,
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            transform: `scale(${scoreScale})`,
          }}
        >
          <div style={{ fontSize: "24px", color: "rgba(255,255,255,0.7)", marginBottom: "20px" }}>
            Intelli Risk Score
          </div>
          <div
            style={{
              position: "relative",
              width: "240px",
              height: "240px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: "50%",
              border: "8px solid rgba(255, 75, 75, 0.2)",
              background: "radial-gradient(circle, rgba(255, 75, 75, 0.1) 0%, rgba(0,0,0,0) 70%)",
            }}
          >
            {/* Animated gauge segment (fake it with a clip or just leave border) */}
            <svg width="240" height="240" style={{ position: "absolute", top: -8, left: -8 }}>
              <circle
                cx="120"
                cy="120"
                r="116"
                fill="transparent"
                stroke="#FF4B4B"
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray={2 * Math.PI * 116}
                strokeDashoffset={2 * Math.PI * 116 * (1 - (finalScore / 100))}
                style={{
                  transform: "rotate(135deg)",
                  transformOrigin: "center",
                }}
              />
            </svg>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: "72px", fontWeight: 700, color: "#FF4B4B", lineHeight: 1 }}>
                {finalScore}
              </div>
              <div style={{ fontSize: "16px", color: "#FF4B4B", fontWeight: 600, marginTop: "8px", textTransform: "uppercase" }}>
                High Risk
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Signals Grid */}
        <div style={{ flex: 2, display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
          {signals.map((signal, index) => (
            <div
              key={index}
              style={{
                ...AboutAtnaStyles.glassCard,
                padding: "24px",
                transform: `scale(${getCardScale(signal.delay)})`,
                display: "flex",
                alignItems: "center",
                gap: "20px",
              }}
            >
              <div
                style={{
                  width: "60px",
                  height: "60px",
                  borderRadius: "16px",
                  backgroundColor: "rgba(255,255,255,0.05)",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {signal.icon}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: "14px", color: "rgba(255,255,255,0.5)" }}>{signal.label}</div>
                <div style={{ fontSize: "20px", fontWeight: 600, color: "#fff" }}>{signal.value}</div>
              </div>
              <div
                style={
                  signal.status === "Safe" ? AboutAtnaStyles.badgeSafe :
                  signal.status === "Warning" ? AboutAtnaStyles.badgeWarning :
                  AboutAtnaStyles.badgeRisk
                }
              >
                {signal.status}
              </div>
            </div>
          ))}
        </div>
      </div>
    </AbsoluteFill>
  );
};
