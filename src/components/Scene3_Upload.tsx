import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { AtnaBackground } from "./AtnaBackground";
import { Navbar } from "./Navbar";

export const Scene3_Upload: React.FC = () => {
  const frame = useCurrentFrame();

  // Progress bar animation (animates over 90 frames)
  const progressPercent = interpolate(frame, [15, 105], [12, 100], { extrapolateRight: "clamp", extrapolateLeft: "clamp" });
  
  // File size calculation
  const totalMB = 12.6;
  const currentMB = (progressPercent / 100) * totalMB;

  return (
    <AbsoluteFill>
      <AtnaBackground />
      <Navbar />

      <div style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
      }}>
        <h1 style={{
          fontSize: "64px",
          fontWeight: 800,
          color: "#111",
          margin: "0 0 24px 0",
          letterSpacing: "-1px"
        }}>
          One TRU Series. Total Trust.
        </h1>
        <p style={{
          fontSize: "20px",
          color: "#555",
          maxWidth: "700px",
          textAlign: "center",
          lineHeight: 1.5,
          margin: "0 0 64px 0"
        }}>
          The ATNA TRU Series is a unified platform for fast, accurate, and compliant identity
          verification, document authentication, and intelligent data extraction.
        </p>

        {/* Uploading Card */}
        <div style={{
          width: "700px",
          height: "300px",
          backgroundColor: "rgba(255,255,255,0.4)",
          backdropFilter: "blur(20px)",
          borderRadius: "24px",
          border: "1px solid rgba(255,255,255,0.8)",
          boxShadow: "0 20px 40px rgba(0,0,0,0.05), inset 0 0 20px rgba(255,255,255,0.5)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "24px"
        }}>
          
          <div style={{ fontSize: "16px", color: "#333", fontWeight: 500 }}>
            Uploading your documents...
          </div>
          
          {/* Progress Container */}
          <div style={{
            width: "560px",
            backgroundColor: "#F3F4F6",
            borderRadius: "16px",
            padding: "20px 24px",
            display: "flex",
            alignItems: "center",
            gap: "20px",
            boxShadow: "inset 0 2px 4px rgba(255,255,255,0.5)"
          }}>
            {/* File Icon */}
            <div style={{ position: "relative", width: "40px", height: "48px" }}>
              {/* Document Base */}
              <div style={{ width: "100%", height: "100%", backgroundColor: "#E0E0E0", borderRadius: "4px" }} />
              {/* Folded Corner */}
              <div style={{ position: "absolute", top: 0, right: 0, borderBottom: "12px solid #CCC", borderRight: "12px solid transparent" }} />
              {/* Badge */}
              <div style={{ 
                position: "absolute", bottom: "4px", left: "-4px", 
                backgroundColor: "#4CAF50", color: "#FFF", fontSize: "10px", 
                fontWeight: 800, padding: "2px 4px", borderRadius: "4px"
              }}>
                XLS
              </div>
            </div>

            {/* Progress Details */}
            <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "8px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: "14px", fontWeight: 600, color: "#111" }}>Digital_Claim_Form_Copy.pdf</span>
                <span style={{ fontSize: "13px", fontWeight: 500, color: "#555" }}>{Math.floor(progressPercent)}%</span>
              </div>
              
              {/* Track */}
              <div style={{ width: "100%", height: "6px", backgroundColor: "#D1D5DB", borderRadius: "3px", overflow: "hidden" }}>
                {/* Fill */}
                <div style={{ width: `${progressPercent}%`, height: "100%", backgroundColor: "#0052CC", borderRadius: "3px" }} />
              </div>
              
              <div style={{ fontSize: "12px", color: "#6B7280", fontWeight: 500 }}>
                {currentMB.toFixed(1)} MB of {totalMB} MB
              </div>
            </div>
          </div>

          <div style={{
            backgroundColor: "transparent",
            color: "#0052CC",
            padding: "10px 24px",
            borderRadius: "8px",
            fontWeight: 600,
            fontSize: "14px",
            border: "1px solid #A0C4FF",
            cursor: "pointer"
          }}>
            Cancel upload
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
