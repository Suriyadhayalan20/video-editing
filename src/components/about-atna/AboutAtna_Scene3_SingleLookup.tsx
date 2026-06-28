import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { AboutAtnaStyles } from "./AboutAtna_Styles";
import { Search } from "lucide-react";

export const AboutAtna_Scene3_SingleLookup: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Animation values
  const containerOpacity = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: "clamp" });
  
  // Scale in the search container
  const searchScale = spring({ frame: frame - 15, fps, config: { damping: 14 } });
  
  // Typing animation
  const textToType = "michael.j@suspicious-domain.net";
  const typingProgress = Math.floor(interpolate(frame, [30, 70], [0, textToType.length], { extrapolateRight: "clamp", extrapolateLeft: "clamp" }));
  const typedText = textToType.substring(0, typingProgress);
  
  // Cursor blink
  const cursorOpacity = Math.floor(frame / 15) % 2 === 0 ? 1 : 0;

  // Button click / Popup scale
  const buttonScale = spring({ frame: frame - 80, fps, config: { damping: 12 } });
  const finalButtonScale = interpolate(buttonScale, [0, 1], [1, 0.95]); // Slight press effect
  
  const popupScale = spring({ frame: frame - 90, fps, config: { damping: 14 } });

  return (
    <AbsoluteFill style={{ opacity: containerOpacity, zIndex: 10, justifyContent: "center", alignItems: "center" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "40px",
          width: "100%",
          maxWidth: "800px",
        }}
      >
        <h2 style={{ ...AboutAtnaStyles.heading2, transform: `scale(${searchScale})` }}>
          Investigate Entity
        </h2>

        {/* Search Bar Container */}
        <div
          style={{
            ...AboutAtnaStyles.glassCard,
            width: "100%",
            display: "flex",
            alignItems: "center",
            padding: "16px 24px",
            gap: "16px",
            transform: `scale(${searchScale})`,
            borderRadius: "100px",
          }}
        >
          <Search size={32} color="rgba(255,255,255,0.5)" />
          <div style={{ flex: 1, display: "flex", alignItems: "center" }}>
            <span style={{ fontSize: "28px", color: "#fff", fontFamily: "monospace" }}>
              {typedText}
              <span style={{ opacity: typingProgress < textToType.length ? cursorOpacity : 0 }}>|</span>
            </span>
            {typingProgress === 0 && (
              <span style={{ fontSize: "28px", color: "rgba(255,255,255,0.3)", position: "absolute" }}>
                Enter email, phone, or IP...
              </span>
            )}
          </div>
          
          {/* Analyze Button */}
          <div
            style={{
              backgroundColor: "#52D8B9",
              color: "#07131f",
              padding: "16px 32px",
              borderRadius: "100px",
              fontSize: "20px",
              fontWeight: 600,
              transform: `scale(${frame > 80 && frame < 90 ? finalButtonScale : 1})`,
            }}
          >
            Analyze
          </div>
        </div>

        {/* Verification Popup (shows after clicking Analyze) */}
        {frame > 90 && (
          <div
            style={{
              ...AboutAtnaStyles.glassCardDark,
              position: "absolute",
              top: "50%",
              transform: `translateY(-50%) scale(${popupScale})`,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "24px",
              padding: "48px 64px",
              zIndex: 30,
            }}
          >
            <div style={{ ...AboutAtnaStyles.badge, ...AboutAtnaStyles.badgeNeutral, fontSize: "24px" }}>
              Initiating Deep Scan
            </div>
            <div style={{ fontSize: "32px", fontWeight: 600 }}>
              {textToType}
            </div>
            <div style={{ color: "rgba(255,255,255,0.6)", fontSize: "20px" }}>
              Connecting to Intelli Digital Footprinting engine...
            </div>
          </div>
        )}
      </div>
    </AbsoluteFill>
  );
};
