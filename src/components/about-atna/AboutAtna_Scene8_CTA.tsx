import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { AboutAtnaStyles } from "./AboutAtna_Styles";
import { AnimatedLogo } from "../AnimatedLogo";

export const AboutAtna_Scene8_CTA: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  // Animation values
  const containerOpacity = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: "clamp" });
  
  // Fade out at the end of the video
  const fadeOutOpacity = interpolate(frame, [durationInFrames - 15, durationInFrames], [1, 0], { extrapolateLeft: "clamp" });

  const combinedOpacity = containerOpacity * fadeOutOpacity;

  const yOffset = spring({ frame, fps, config: { damping: 14 } });
  
  const textScale = spring({ frame: frame - 15, fps, config: { damping: 12 } });

  return (
    <AbsoluteFill style={{ opacity: combinedOpacity, zIndex: 10, justifyContent: "center", alignItems: "center", padding: "80px", boxSizing: "border-box" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "48px",
          transform: `translateY(${interpolate(yOffset, [0, 1], [40, 0])}px)`,
        }}
      >
        <div style={{ transform: "scale(1.5)" }}>
          {/* Logo animation might be playing, but we just need a static one or re-trigger it. 
              Since frame 0 of this component is frame 810 overall, AnimatedLogo uses useCurrentFrame() natively.
              We can either let it animate or pass a custom style. Let's let it animate in again.
          */}
          <AnimatedLogo />
        </div>

        <div style={{ textAlign: "center", transform: `scale(${textScale})` }}>
          <h2 style={{ ...AboutAtnaStyles.heading1, marginBottom: "16px" }}>
            Verify <span style={AboutAtnaStyles.tealText}>Smarter</span>
            <br />
            Prevent Fraud <span style={AboutAtnaStyles.aquaText}>Faster</span>
          </h2>
          <p style={{ ...AboutAtnaStyles.subtitle, fontSize: "28px", marginBottom: "48px" }}>
            Powered by Intelli Digital Footprinting
          </p>
          
          <div
            style={{
              display: "inline-block",
              padding: "16px 48px",
              border: "2px solid #52D8B9",
              borderRadius: "100px",
              color: "#52D8B9",
              fontSize: "24px",
              fontWeight: 600,
              letterSpacing: "2px",
            }}
          >
            WWW.ATNA.AI
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
