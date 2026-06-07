import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { AtnaBackground } from "./AtnaBackground";
import { Navbar } from "./Navbar";
import { Upload } from "lucide-react";

export const Cursor: React.FC<{ x: number; y: number; clicked: boolean }> = ({ x, y, clicked }) => {
  return (
    <div style={{
      position: "absolute",
      left: x,
      top: y,
      transform: `scale(${clicked ? 0.8 : 1})`,
      transition: "transform 0.1s",
      zIndex: 9999,
      pointerEvents: "none"
    }}>
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M5.5 3L18.5 13.5L12 14.5L9.5 21L5.5 3Z" fill="#111" stroke="#FFF" strokeWidth="2" strokeLinejoin="round"/>
      </svg>
    </div>
  );
};

export const Scene2_Home: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  // Entrance animation for entire scene
  const opacity = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: "clamp" });
  const yOffset = interpolate(spring({ frame, fps, config: { damping: 14 } }), [0, 1], [40, 0]);

  // Cursor animation
  // Cursor starts at bottom right, moves to "Start Verification" button
  const buttonX = width / 2;
  const buttonY = height / 2 + 180; // approximate center of button

  const cursorProgress = spring({
    frame: frame - 30, // Start moving at frame 30
    fps,
    config: { damping: 16 }
  });

  const cursorX = interpolate(cursorProgress, [0, 1], [width - 200, buttonX + 10]);
  const cursorY = interpolate(cursorProgress, [0, 1], [height - 100, buttonY + 10]);
  const isClicked = frame > 75 && frame < 85;

  return (
    <AbsoluteFill style={{ opacity }}>
      <AtnaBackground />
      <Navbar />

      <div style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
        transform: `translateY(${yOffset}px)`
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

        {/* Upload Card */}
        <div style={{
          width: "800px",
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
          gap: "16px"
        }}>
          <Upload color="#2196F3" size={48} strokeWidth={1} style={{ marginBottom: "8px" }} />
          
          <div style={{ fontSize: "16px", color: "#333", fontWeight: 500 }}>
            Choose a file or drag & drop it here or <span style={{ color: "#21C998", textDecoration: "underline" }}>browse</span>
          </div>
          
          <div style={{ fontSize: "14px", color: "#4A90E2", marginBottom: "16px" }}>
            JPEG, PNG, PDG, and MP4 formats, up to 50MB
          </div>

          <div style={{
            backgroundColor: isClicked ? "#003F9E" : "#0052CC",
            color: "#FFF",
            padding: "14px 32px",
            borderRadius: "8px",
            fontWeight: 600,
            fontSize: "15px",
            boxShadow: "0 4px 12px rgba(0, 82, 204, 0.3)"
          }}>
            Start Verification
          </div>
        </div>
      </div>

      {frame > 30 && <Cursor x={cursorX} y={cursorY} clicked={isClicked} />}
    </AbsoluteFill>
  );
};
