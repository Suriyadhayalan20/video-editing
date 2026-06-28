import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { Navbar } from "../Navbar";
import { AboutAtnaStyles } from "./AboutAtna_Styles";

export const AboutAtna_Scene2_Dashboard: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Animation values
  const containerOpacity = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: "clamp" });
  const containerY = spring({ frame, fps, config: { damping: 14 } });
  const yOffset = interpolate(containerY, [0, 1], [40, 0]);

  // Animated counter
  const totalLookups = Math.floor(interpolate(frame, [15, 60], [0, 15420], { extrapolateRight: "clamp", extrapolateLeft: "clamp" }));
  const riskScore = Math.floor(interpolate(frame, [30, 70], [0, 85], { extrapolateRight: "clamp", extrapolateLeft: "clamp" }));

  return (
    <AbsoluteFill style={{ opacity: containerOpacity, zIndex: 10 }}>
      {/* Dark overlay for navbar since it expects a light background in the original, or we just render it */}
      <div style={{ position: "relative", zIndex: 20 }}>
        {/* Provide a container that scales down navbar slightly and overrides some colors if needed, but we'll use as is for now */}
        <Navbar />
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          padding: "120px 64px 40px",
          gap: "32px",
          transform: `translateY(${yOffset}px)`,
          width: "100%",
          height: "100%",
          boxSizing: "border-box",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
          <div>
            <h2 style={AboutAtnaStyles.heading2}>Overview</h2>
            <p style={{ ...AboutAtnaStyles.subtitle, fontSize: "20px" }}>Real-time signal analysis</p>
          </div>
        </div>

        <div style={{ display: "flex", gap: "32px", flex: 1 }}>
          {/* Main Column */}
          <div style={{ flex: 2, display: "flex", flexDirection: "column", gap: "32px" }}>
            {/* Top Cards */}
            <div style={{ display: "flex", gap: "32px" }}>
              <div style={{ ...AboutAtnaStyles.glassCard, flex: 1 }}>
                <div style={{ fontSize: "16px", color: "rgba(255,255,255,0.6)", marginBottom: "8px" }}>Total Lookups (24h)</div>
                <div style={{ fontSize: "48px", fontWeight: 700, color: "#fff" }}>
                  {totalLookups.toLocaleString()}
                </div>
              </div>
              <div style={{ ...AboutAtnaStyles.glassCard, flex: 1 }}>
                <div style={{ fontSize: "16px", color: "rgba(255,255,255,0.6)", marginBottom: "8px" }}>Average Risk Score</div>
                <div style={{ fontSize: "48px", fontWeight: 700, color: "#52D8B9" }}>
                  {riskScore}
                </div>
              </div>
            </div>

            {/* Chart Area */}
            <div style={{ ...AboutAtnaStyles.glassCard, flex: 1, display: "flex", flexDirection: "column" }}>
              <div style={{ fontSize: "18px", fontWeight: 600, marginBottom: "24px" }}>Verification Volume</div>
              <div style={{ flex: 1, display: "flex", alignItems: "flex-end", gap: "16px", padding: "16px 0" }}>
                {[40, 60, 30, 80, 50, 90, 70, 100, 40, 60, 85].map((height, i) => {
                  const barScale = spring({
                    frame: frame - 20 - i * 2,
                    fps,
                    config: { damping: 12 },
                  });
                  return (
                    <div
                      key={i}
                      style={{
                        flex: 1,
                        backgroundColor: i === 10 ? "#52D8B9" : "rgba(82, 216, 185, 0.3)",
                        height: `${height}%`,
                        borderRadius: "4px 4px 0 0",
                        transform: `scaleY(${barScale})`,
                        transformOrigin: "bottom",
                      }}
                    />
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column - Recent Lookups */}
          <div style={{ ...AboutAtnaStyles.glassCard, flex: 1, display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: "18px", fontWeight: 600, marginBottom: "24px" }}>Recent Activity</div>
            <div style={{ display: "flex", flexDirection: "column", gap: "16px", flex: 1 }}>
              {[
                { email: "j.doe@example.com", risk: "Low", score: 12, delay: 30 },
                { email: "a.smith@company.co", risk: "Low", score: 24, delay: 35 },
                { email: "unknown@proxy.net", risk: "High", score: 94, delay: 40 },
                { email: "m.jones@gmail.com", risk: "Medium", score: 45, delay: 45 },
              ].map((item, i) => {
                const itemY = spring({ frame: frame - item.delay, fps, config: { damping: 14 } });
                const opacity = interpolate(frame - item.delay, [0, 10], [0, 1], { extrapolateRight: "clamp" });
                return (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "16px",
                      backgroundColor: "rgba(255,255,255,0.05)",
                      borderRadius: "12px",
                      opacity,
                      transform: `translateY(${interpolate(itemY, [0, 1], [20, 0])}px)`,
                    }}
                  >
                    <div>
                      <div style={{ fontWeight: 500, fontSize: "16px" }}>{item.email}</div>
                      <div style={{ fontSize: "14px", color: "rgba(255,255,255,0.5)" }}>Score: {item.score}</div>
                    </div>
                    <div style={
                      item.risk === "Low" ? AboutAtnaStyles.badgeSafe :
                      item.risk === "High" ? AboutAtnaStyles.badgeRisk :
                      AboutAtnaStyles.badgeWarning
                    }>
                      {item.risk}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
