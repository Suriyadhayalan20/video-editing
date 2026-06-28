import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { AboutAtnaStyles } from "./AboutAtna_Styles";
import { AlertOctagon, TrendingUp, Crosshair } from "lucide-react";

export const AboutAtna_Scene7_HighRisk: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const containerOpacity = interpolate(frame, [0, 10], [0, 1], { extrapolateRight: "clamp" });
  const containerScale = spring({ frame, fps, config: { damping: 14 } });

  // Pulse animation for the alert card
  const pulse = Math.sin(frame / 5) * 0.05 + 1; // Pulses between ~0.95 and 1.05
  const alertOpacity = Math.sin(frame / 5) * 0.3 + 0.7; // Pulses between 0.4 and 1.0

  // Rising chart animation
  const chartHeight = spring({ frame: frame - 10, fps, config: { damping: 12, mass: 2 } });
  
  // Risk Score gauge
  const finalScore = Math.floor(interpolate(frame, [5, 45], [0, 98], { extrapolateRight: "clamp" }));

  return (
    <AbsoluteFill style={{ opacity: containerOpacity, zIndex: 10, justifyContent: "center", alignItems: "center", padding: "80px", boxSizing: "border-box" }}>
      <div style={{ display: "flex", width: "100%", height: "100%", gap: "40px" }}>
        
        {/* Left Column: Alerts & Indicators */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "40px", transform: `scale(${containerScale})` }}>
          
          {/* Main Alert Card */}
          <div
            style={{
              ...AboutAtnaStyles.glassCard,
              backgroundColor: "rgba(255, 75, 75, 0.15)",
              border: "2px solid rgba(255, 75, 75, 0.4)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: "48px",
              flex: 1,
              transform: `scale(${pulse})`,
              boxShadow: `0 0 ${interpolate(pulse, [0.95, 1.05], [20, 60])}px rgba(255, 75, 75, 0.3)`,
            }}
          >
            <AlertOctagon size={80} color="#FF4B4B" style={{ marginBottom: "24px", opacity: alertOpacity }} />
            <h2 style={{ ...AboutAtnaStyles.heading2, color: "#FF4B4B", textAlign: "center" }}>
              FRAUD DETECTED
            </h2>
            <div style={{ fontSize: "24px", color: "rgba(255,255,255,0.8)", marginTop: "16px", textAlign: "center" }}>
              Automated blocking initiated
            </div>
          </div>

          {/* Indicators Grid */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
            <div style={{ ...AboutAtnaStyles.glassCard, display: "flex", alignItems: "center", gap: "16px" }}>
              <TrendingUp color="#FF4B4B" size={32} />
              <div>
                <div style={{ fontSize: "14px", color: "rgba(255,255,255,0.6)" }}>Velocity Spike</div>
                <div style={{ fontSize: "24px", fontWeight: 600 }}>+450%</div>
              </div>
            </div>
            <div style={{ ...AboutAtnaStyles.glassCard, display: "flex", alignItems: "center", gap: "16px" }}>
              <Crosshair color="#FF4B4B" size={32} />
              <div>
                <div style={{ fontSize: "14px", color: "rgba(255,255,255,0.6)" }}>Target Vector</div>
                <div style={{ fontSize: "24px", fontWeight: 600 }}>Checkout API</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Chart & Score */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "40px", transform: `scale(${containerScale})` }}>
          
          <div style={{ ...AboutAtnaStyles.glassCard, flex: 1, display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: "24px", fontWeight: 600, marginBottom: "24px" }}>Risk Concentration</div>
            
            <div style={{ flex: 1, position: "relative", display: "flex", alignItems: "flex-end" }}>
              {/* Danger Zone background */}
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "40%", backgroundColor: "rgba(255, 75, 75, 0.1)", borderBottom: "2px dashed rgba(255, 75, 75, 0.5)", zIndex: 0 }} />
              <div style={{ position: "absolute", top: "40%", left: "16px", color: "#FF4B4B", fontSize: "14px", transform: "translateY(-10px)", fontWeight: 600 }}>Critical Threshold</div>
              
              {/* Chart Line/Area */}
              <svg width="100%" height="100%" preserveAspectRatio="none" style={{ position: "absolute", zIndex: 1 }}>
                <path
                  d={`M 0,${100 - interpolate(chartHeight, [0, 1], [20, 20])}% 
                      C 20%,${100 - interpolate(chartHeight, [0, 1], [25, 25])}% 
                        40%,${100 - interpolate(chartHeight, [0, 1], [30, 30])}% 
                        60%,${100 - interpolate(chartHeight, [0, 1], [45, 45])}% 
                        80%,${100 - interpolate(chartHeight, [0, 1], [60, 95])}% 
                        100%,${100 - interpolate(chartHeight, [0, 1], [65, 100])}% 
                      L 100%,100% L 0,100% Z`}
                  fill="url(#chartGradient)"
                />
                <path
                  d={`M 0,${100 - interpolate(chartHeight, [0, 1], [20, 20])}% 
                      C 20%,${100 - interpolate(chartHeight, [0, 1], [25, 25])}% 
                        40%,${100 - interpolate(chartHeight, [0, 1], [30, 30])}% 
                        60%,${100 - interpolate(chartHeight, [0, 1], [45, 45])}% 
                        80%,${100 - interpolate(chartHeight, [0, 1], [60, 95])}% 
                        100%,${100 - interpolate(chartHeight, [0, 1], [65, 100])}%`}
                  fill="none"
                  stroke="#FF4B4B"
                  strokeWidth="4"
                />
                <defs>
                  <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="rgba(255, 75, 75, 0.4)" />
                    <stop offset="100%" stopColor="rgba(255, 75, 75, 0)" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>

          <div style={{ ...AboutAtnaStyles.glassCard, padding: "32px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ fontSize: "24px", color: "rgba(255,255,255,0.7)" }}>Confidence Score</div>
            <div style={{ fontSize: "64px", fontWeight: 700, color: "#FF4B4B" }}>{finalScore}%</div>
          </div>

        </div>
      </div>
    </AbsoluteFill>
  );
};
