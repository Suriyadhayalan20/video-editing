import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { AboutAtnaStyles } from "./AboutAtna_Styles";
import { UploadCloud, CheckCircle, AlertTriangle, Loader } from "lucide-react";

export const AboutAtna_Scene6_BulkLookup: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const containerOpacity = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: "clamp" });
  const containerScale = spring({ frame: frame - 5, fps, config: { damping: 14 } });

  const rows = [
    { email: "user1@example.com", delay: 10, targetProgress: 100, finalStatus: "Safe" },
    { email: "admin@suspicious.net", delay: 20, targetProgress: 100, finalStatus: "Risk" },
    { email: "test.account@corp.co", delay: 30, targetProgress: 100, finalStatus: "Safe" },
    { email: "info@temp-mail.org", delay: 40, targetProgress: 85, finalStatus: "Processing" },
  ];

  return (
    <AbsoluteFill style={{ opacity: containerOpacity, zIndex: 10, padding: "80px", boxSizing: "border-box" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "40px" }}>
        <div>
          <h2 style={AboutAtnaStyles.heading2}>Bulk Processing</h2>
          <p style={{ ...AboutAtnaStyles.subtitle, fontSize: "20px" }}>Analyze thousands of signals instantly</p>
        </div>
        
        <div
          style={{
            ...AboutAtnaStyles.glassCard,
            padding: "16px 32px",
            display: "flex",
            alignItems: "center",
            gap: "16px",
            transform: `scale(${containerScale})`,
          }}
        >
          <UploadCloud size={24} color="#52D8B9" />
          <span style={{ fontSize: "18px", fontWeight: 600 }}>batch_q3_users.csv</span>
        </div>
      </div>

      <div style={{ ...AboutAtnaStyles.glassCard, flex: 1, overflow: "hidden", transform: `scale(${containerScale})` }}>
        <table style={AboutAtnaStyles.table}>
          <thead>
            <tr>
              <th style={AboutAtnaStyles.th}>Identifier</th>
              <th style={AboutAtnaStyles.th}>Progress</th>
              <th style={AboutAtnaStyles.th}>Status</th>
              <th style={AboutAtnaStyles.th}>Action</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => {
              const rowY = spring({ frame: frame - row.delay, fps, config: { damping: 14 } });
              const progress = Math.floor(interpolate(frame - row.delay - 15, [0, 40], [0, row.targetProgress], { extrapolateRight: "clamp", extrapolateLeft: "clamp" }));
              
              const isDone = progress === 100;
              const displayStatus = isDone ? row.finalStatus : "Processing";

              return (
                <tr
                  key={index}
                  style={{
                    opacity: interpolate(rowY, [0, 1], [0, 1]),
                    transform: `translateY(${interpolate(rowY, [0, 1], [20, 0])}px)`,
                  }}
                >
                  <td style={AboutAtnaStyles.td}>{row.email}</td>
                  <td style={{ ...AboutAtnaStyles.td, width: "40%" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                      <div style={{ flex: 1, height: "8px", backgroundColor: "rgba(255,255,255,0.1)", borderRadius: "4px", overflow: "hidden" }}>
                        <div
                          style={{
                            height: "100%",
                            width: `${progress}%`,
                            backgroundColor: isDone && row.finalStatus === "Risk" ? "#FF4B4B" : "#52D8B9",
                            transition: "width 0.1s linear",
                          }}
                        />
                      </div>
                      <span style={{ fontSize: "16px", color: "rgba(255,255,255,0.5)", width: "40px" }}>
                        {progress}%
                      </span>
                    </div>
                  </td>
                  <td style={AboutAtnaStyles.td}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      {displayStatus === "Processing" && <Loader size={18} color="#357EC9" style={{ animation: "spin 2s linear infinite" }} />}
                      {displayStatus === "Safe" && <CheckCircle size={18} color="#52D8B9" />}
                      {displayStatus === "Risk" && <AlertTriangle size={18} color="#FF4B4B" />}
                      
                      <span style={{ 
                        color: displayStatus === "Safe" ? "#52D8B9" : 
                               displayStatus === "Risk" ? "#FF4B4B" : "#357EC9" 
                      }}>
                        {displayStatus}
                      </span>
                    </div>
                  </td>
                  <td style={AboutAtnaStyles.td}>
                    {isDone && row.finalStatus === "Risk" ? (
                      <span style={{ color: "#FF4B4B", cursor: "pointer", fontWeight: 600 }}>Block User</span>
                    ) : (
                      <span style={{ color: "rgba(255,255,255,0.3)" }}>-</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </AbsoluteFill>
  );
};
