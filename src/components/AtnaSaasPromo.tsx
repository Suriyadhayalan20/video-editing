import React from "react";
import { 
  AbsoluteFill, 
  Sequence, 
  interpolate, 
  useCurrentFrame, 
  useVideoConfig, 
  spring, 
  Audio, 
  staticFile, 
  Easing,
  Img
} from "remotion";
import { 
  Shield, 
  ShieldAlert, 
  AlertTriangle, 
  TrendingUp, 
  CheckCircle, 
  Phone, 
  Eye, 
  FileText, 
  Mic, 
  Activity, 
  ArrowRight, 
  Lock, 
  Gamepad, 
  Coins, 
  Check, 
  Landmark, 
  ShieldX 
} from "lucide-react";
import { AnimatedLogo } from "./AnimatedLogo";
import { ATNA_THEME } from "../theme";

// Helper for spring animations
const useSpring = (frame: number, from: number, config?: { damping?: number; mass?: number; stiffness?: number }) => {
  const { fps } = useVideoConfig();
  return spring({
    frame: frame - from,
    fps,
    config: {
      damping: 12,
      mass: 0.5,
      stiffness: 100,
      ...config,
    },
  });
};

/* ==========================================
   SCENE 1: HOOK & REVEAL (Frames 0 - 300)
   ========================================== */
const Scene1Intro: React.FC = () => {
  const frame = useCurrentFrame();
  
  // Text fades and translates
  const text1Opacity = interpolate(frame, [15, 35, 90, 110], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const text1TranslateY = interpolate(frame, [15, 35, 90, 110], [20, 0, 0, -25], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // Logo Reveal starts after frame 110
  const logoRevealOpacity = interpolate(frame, [115, 140], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const logoScale = interpolate(frame, [115, 150], [0.85, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1)
  });

  // Industry badges slide up in staggering fashion
  const badge1Y = interpolate(frame, [150, 170], [30, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const badge2Y = interpolate(frame, [155, 175], [30, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const badge3Y = interpolate(frame, [160, 180], [30, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const badge4Y = interpolate(frame, [165, 185], [30, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  const badgeOpacity = interpolate(frame, [150, 175], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // Background laser scan lines
  const scanLineY = interpolate(frame, [120, 270], [-200, 1280], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const scanLineOpacity = interpolate(frame, [120, 140, 250, 270], [0, 0.4, 0.4, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ overflow: "hidden", display: "flex", justifyContent: "center", alignItems: "center" }}>
      {/* Background Gradients */}
      <div style={{
        position: "absolute",
        width: "600px",
        height: "600px",
        background: "radial-gradient(circle, rgba(59, 130, 246, 0.15) 0%, rgba(0,0,0,0) 70%)",
        top: "10%",
        left: "15%",
        filter: "blur(80px)",
      }} />
      <div style={{
        position: "absolute",
        width: "700px",
        height: "700px",
        background: "radial-gradient(circle, rgba(6, 182, 212, 0.12) 0%, rgba(0,0,0,0) 70%)",
        bottom: "10%",
        right: "15%",
        filter: "blur(100px)",
      }} />

      {/* Grid Overlay */}
      <div style={{
        position: "absolute",
        width: "100%",
        height: "100%",
        opacity: 0.1,
        backgroundImage: `linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)`,
        backgroundSize: "60px 60px",
      }} />

      {/* Laser Scan Line */}
      <div style={{
        position: "absolute",
        top: scanLineY,
        left: 0,
        width: "100%",
        height: "10px",
        background: "linear-gradient(90deg, transparent, rgba(59, 130, 246, 0.8), rgba(6, 182, 212, 0.8), rgba(59, 130, 246, 0.8), transparent)",
        boxShadow: "0 0 20px rgba(59, 130, 246, 0.8), 0 0 40px rgba(6, 182, 212, 0.5)",
        opacity: scanLineOpacity,
        pointerEvents: "none"
      }} />

      {/* Ambient particles */}
      <div style={{
        position: "absolute",
        top: "40%",
        left: "25%",
        width: "6px",
        height: "6px",
        borderRadius: "50%",
        backgroundColor: "rgba(59, 130, 246, 0.6)",
        boxShadow: "0 0 10px rgba(59, 130, 246, 0.8)",
        transform: `translateY(${Math.sin(frame / 10) * 15}px)`
      }} />
      <div style={{
        position: "absolute",
        top: "65%",
        left: "75%",
        width: "8px",
        height: "8px",
        borderRadius: "50%",
        backgroundColor: "rgba(6, 182, 212, 0.6)",
        boxShadow: "0 0 12px rgba(6, 182, 212, 0.8)",
        transform: `translateY(${Math.cos(frame / 12) * 20}px)`
      }} />

      {/* Text block 1: The Hook */}
      <div style={{
        position: "absolute",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        opacity: text1Opacity,
        transform: `translateY(${text1TranslateY}px)`,
        textAlign: "center"
      }}>
        <div style={{
          fontSize: "24px",
          letterSpacing: "0.4em",
          color: "#3b82f6",
          fontWeight: 600,
          marginBottom: "16px",
          fontFamily: "'Outfit', sans-serif"
        }}>
          THE RISK LANDSCAPE HAS CHANGED
        </div>
        <h1 style={{
          fontSize: "72px",
          fontWeight: 800,
          color: "#FFF",
          margin: 0,
          fontFamily: "'Outfit', sans-serif",
          letterSpacing: "-0.03em",
          lineHeight: 1.1,
          background: "linear-gradient(135deg, #FFF 40%, #93c5fd 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent"
        }}>
          THE RISK IS SYNTHETIC.
        </h1>
        <p style={{
          fontSize: "20px",
          color: "#94a3b8",
          marginTop: "20px",
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontWeight: 400,
          maxWidth: "700px"
        }}>
          Deepfakes, voice clones, and document manipulation are breaching trust in real-time.
        </p>
      </div>

      {/* Brand Reveal block */}
      <div style={{
        position: "absolute",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        opacity: logoRevealOpacity,
        transform: `scale(${logoScale})`,
        textAlign: "center"
      }}>
        {/* Glowing Logo */}
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "24px",
          borderRadius: "32px",
          background: "rgba(15, 23, 42, 0.4)",
          border: "1px solid rgba(59, 130, 246, 0.2)",
          backdropFilter: "blur(12px)",
          boxShadow: "0 20px 50px rgba(0, 0, 0, 0.3), inset 0 0 15px rgba(59, 130, 246, 0.15)",
          marginBottom: "40px"
        }}>
          {/* Logo image from public/logo.png */}
          <Img 
            src={staticFile("logo.png")} 
            style={{ height: "90px", width: "90px", objectFit: "contain", filter: "drop-shadow(0 0 15px rgba(59,130,246,0.6))" }} 
            alt="ATNA Logo"
          />
          <div style={{ marginLeft: "24px", height: "40px" }}>
            <AnimatedLogo fillColor="#FFFFFF" style={{ transform: "scale(2.2)", transformOrigin: "left center" }} />
          </div>
        </div>

        <h2 style={{
          fontSize: "52px",
          fontWeight: 800,
          margin: 0,
          fontFamily: "'Outfit', sans-serif",
          letterSpacing: "-0.02em",
          color: "#FFFFFF",
          lineHeight: 1.2
        }}>
          High-Confidence Identity Trust
        </h2>
        <p style={{
          fontSize: "20px",
          color: "#94a3b8",
          margin: "12px 0 40px 0",
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          maxWidth: "800px"
        }}>
          A unified security suite protecting Banking, Fintech, Insurance, and Gaming.
        </p>

        {/* Industry Badges */}
        <div style={{
          display: "flex",
          gap: "20px",
          opacity: badgeOpacity
        }}>
          {[
            { text: "Banking", y: badge1Y, icon: <Landmark size={16} /> },
            { text: "Fintech", y: badge2Y, icon: <Coins size={16} /> },
            { text: "Insurance", y: badge3Y, icon: <Shield size={16} /> },
            { text: "Gaming", y: badge4Y, icon: <Gamepad size={16} /> }
          ].map((badge, idx) => (
            <div 
              key={idx}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                padding: "10px 24px",
                borderRadius: "30px",
                backgroundColor: "rgba(30, 41, 59, 0.5)",
                border: "1px solid rgba(59, 130, 246, 0.25)",
                color: "#60a5fa",
                fontWeight: 600,
                fontSize: "15px",
                fontFamily: "'Inter', sans-serif",
                transform: `translateY(${badge.y}px)`,
                boxShadow: "0 4px 12px rgba(59, 130, 246, 0.1)"
              }}
            >
              {badge.icon}
              {badge.text}
            </div>
          ))}
        </div>
      </div>
    </AbsoluteFill>
  );
};

/* ==========================================
   SCENE 2: THREAT MATRIX & STATS (Frames 300 - 600)
   ========================================== */
const Scene2Threats: React.FC = () => {
  const frame = useCurrentFrame();
  const frameOffset = frame;

  // Background gradient shift
  const bgGradientAngle = interpolate(frame, [0, 300], [135, 155]);

  // Card slide ins
  const card1X = interpolate(frameOffset, [10, 30], [-100, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const card1Opacity = interpolate(frameOffset, [10, 30], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  const card2X = interpolate(frameOffset, [25, 45], [-100, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const card2Opacity = interpolate(frameOffset, [25, 45], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  const card3X = interpolate(frameOffset, [40, 60], [-100, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const card3Opacity = interpolate(frameOffset, [40, 60], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  const card4X = interpolate(frameOffset, [55, 75], [-100, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const card4Opacity = interpolate(frameOffset, [55, 75], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // Right column stats card slide & pop
  const rightColX = interpolate(frameOffset, [35, 60], [100, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const rightColOpacity = interpolate(frameOffset, [35, 60], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // Count up animation from 10% to 92%
  const statVal = Math.round(interpolate(frameOffset, [35, 110], [10, 92], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.1, 0.8, 0.2, 1)
  }));

  return (
    <AbsoluteFill style={{
      background: `linear-gradient(${bgGradientAngle}deg, #020617 0%, #081125 50%, #030712 100%)`,
      overflow: "hidden",
      padding: "80px 100px",
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center"
    }}>
      {/* Background Gradients */}
      <div style={{
        position: "absolute",
        width: "500px",
        height: "500px",
        background: "radial-gradient(circle, rgba(239, 68, 68, 0.08) 0%, rgba(0,0,0,0) 70%)",
        top: "20%",
        right: "30%",
        filter: "blur(120px)",
      }} />

      {/* Grid lines */}
      <div style={{
        position: "absolute",
        width: "100%",
        height: "100%",
        opacity: 0.08,
        backgroundImage: `linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)`,
        backgroundSize: "80px 80px",
        top: 0, left: 0
      }} />

      {/* Left Column: The Threat List */}
      <div style={{ display: "flex", flexDirection: "column", width: "48%", gap: "24px" }}>
        <div>
          <span style={{
            fontSize: "14px",
            letterSpacing: "0.3em",
            color: "#f43f5e",
            fontWeight: 700,
            textTransform: "uppercase",
            fontFamily: "'Outfit', sans-serif"
          }}>
            SYSTEM THREAT MATRIX
          </span>
          <h2 style={{
            fontSize: "42px",
            fontWeight: 800,
            color: "#FFFFFF",
            margin: "8px 0 16px 0",
            fontFamily: "'Outfit', sans-serif",
            letterSpacing: "-0.01em"
          }}>
            AI-Driven Spoofing Channels
          </h2>
        </div>

        {/* Threat 1 */}
        <div style={{
          display: "flex",
          alignItems: "center",
          padding: "20px 24px",
          borderRadius: "16px",
          background: "rgba(15, 23, 42, 0.4)",
          border: "1px solid rgba(239, 68, 68, 0.2)",
          transform: `translateX(${card1X}px)`,
          opacity: card1Opacity,
          gap: "20px"
        }}>
          <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "48px",
            height: "48px",
            borderRadius: "12px",
            backgroundColor: "rgba(239, 68, 68, 0.15)",
            color: "#ef4444"
          }}>
            <Mic size={24} />
          </div>
          <div>
            <div style={{ fontWeight: 700, fontSize: "18px", color: "#FFF", fontFamily: "'Outfit', sans-serif" }}>
              Voice Clone Mimicry (TRU Yu)
            </div>
            <div style={{ fontSize: "14px", color: "#94a3b8", marginTop: "4px" }}>
              Synthetic audio files trained in seconds bypass traditional verification.
            </div>
          </div>
          <div style={{
            marginLeft: "auto",
            fontSize: "11px",
            fontWeight: 700,
            color: "#ef4444",
            padding: "4px 8px",
            borderRadius: "6px",
            backgroundColor: "rgba(239, 68, 68, 0.1)",
            border: "1px solid rgba(239, 68, 68, 0.2)",
            textTransform: "uppercase",
            letterSpacing: "0.05em"
          }}>
            Audio Hack
          </div>
        </div>

        {/* Threat 2 */}
        <div style={{
          display: "flex",
          alignItems: "center",
          padding: "20px 24px",
          borderRadius: "16px",
          background: "rgba(15, 23, 42, 0.4)",
          border: "1px solid rgba(239, 68, 68, 0.2)",
          transform: `translateX(${card2X}px)`,
          opacity: card2Opacity,
          gap: "20px"
        }}>
          <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "48px",
            height: "48px",
            borderRadius: "12px",
            backgroundColor: "rgba(239, 68, 68, 0.15)",
            color: "#ef4444"
          }}>
            <Eye size={24} />
          </div>
          <div>
            <div style={{ fontWeight: 700, fontSize: "18px", color: "#FFF", fontFamily: "'Outfit', sans-serif" }}>
              Deepfake Face-Swap (TRU IDV)
            </div>
            <div style={{ fontSize: "14px", color: "#94a3b8", marginTop: "4px" }}>
              Live virtual camera injection fools standard facial liveness checks.
            </div>
          </div>
          <div style={{
            marginLeft: "auto",
            fontSize: "11px",
            fontWeight: 700,
            color: "#ef4444",
            padding: "4px 8px",
            borderRadius: "6px",
            backgroundColor: "rgba(239, 68, 68, 0.15)",
            border: "1px solid rgba(239, 68, 68, 0.2)",
            textTransform: "uppercase",
            letterSpacing: "0.05em"
          }}>
            Video Injection
          </div>
        </div>

        {/* Threat 3 */}
        <div style={{
          display: "flex",
          alignItems: "center",
          padding: "20px 24px",
          borderRadius: "16px",
          background: "rgba(15, 23, 42, 0.4)",
          border: "1px solid rgba(239, 68, 68, 0.2)",
          transform: `translateX(${card3X}px)`,
          opacity: card3Opacity,
          gap: "20px"
        }}>
          <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "48px",
            height: "48px",
            borderRadius: "12px",
            backgroundColor: "rgba(239, 68, 68, 0.15)",
            color: "#ef4444"
          }}>
            <FileText size={24} />
          </div>
          <div>
            <div style={{ fontWeight: 700, fontSize: "18px", color: "#FFF", fontFamily: "'Outfit', sans-serif" }}>
              Digital Forged Documents (TRU Docs)
            </div>
            <div style={{ fontSize: "14px", color: "#94a3b8", marginTop: "4px" }}>
              Metadata alteration and digital manipulation in utility bills & claims.
            </div>
          </div>
          <div style={{
            marginLeft: "auto",
            fontSize: "11px",
            fontWeight: 700,
            color: "#ef4444",
            padding: "4px 8px",
            borderRadius: "6px",
            backgroundColor: "rgba(239, 68, 68, 0.15)",
            border: "1px solid rgba(239, 68, 68, 0.2)",
            textTransform: "uppercase",
            letterSpacing: "0.05em"
          }}>
            Metadata Edit
          </div>
        </div>

        {/* Threat 4 */}
        <div style={{
          display: "flex",
          alignItems: "center",
          padding: "20px 24px",
          borderRadius: "16px",
          background: "rgba(15, 23, 42, 0.4)",
          border: "1px solid rgba(239, 68, 68, 0.2)",
          transform: `translateX(${card4X}px)`,
          opacity: card4Opacity,
          gap: "20px"
        }}>
          <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "48px",
            height: "48px",
            borderRadius: "12px",
            backgroundColor: "rgba(239, 68, 68, 0.15)",
            color: "#ef4444"
          }}>
            <Phone size={24} />
          </div>
          <div>
            <div style={{ fontWeight: 700, fontSize: "18px", color: "#FFF", fontFamily: "'Outfit', sans-serif" }}>
              Social Scams (TRU Scribe)
            </div>
            <div style={{ fontSize: "14px", color: "#94a3b8", marginTop: "4px" }}>
              Real-time conversational coercion and social engineering attacks.
            </div>
          </div>
          <div style={{
            marginLeft: "auto",
            fontSize: "11px",
            fontWeight: 700,
            color: "#ef4444",
            padding: "4px 8px",
            borderRadius: "6px",
            backgroundColor: "rgba(239, 68, 68, 0.15)",
            border: "1px solid rgba(239, 68, 68, 0.2)",
            textTransform: "uppercase",
            letterSpacing: "0.05em"
          }}>
            Social Eng
          </div>
        </div>
      </div>

      {/* Right Column: Statistics */}
      <div style={{
        display: "flex",
        flexDirection: "column",
        width: "44%",
        height: "100%",
        justifyContent: "center",
        transform: `translateX(${rightColX}px)`,
        opacity: rightColOpacity
      }}>
        {/* High confidence stat card */}
        <div style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          padding: "48px",
          borderRadius: "24px",
          background: "linear-gradient(135deg, rgba(15, 23, 42, 0.8) 0%, rgba(30, 41, 59, 0.8) 100%)",
          border: "1px solid rgba(59, 130, 246, 0.3)",
          backdropFilter: "blur(20px)",
          boxShadow: "0 30px 60px rgba(0, 0, 0, 0.5), inset 0 0 20px rgba(59, 130, 246, 0.1)"
        }}>
          {/* Glowing dot */}
          <div style={{
            position: "absolute",
            top: "24px",
            right: "24px",
            width: "12px",
            height: "12px",
            borderRadius: "50%",
            backgroundColor: "#ef4444",
            boxShadow: "0 0 10px rgba(239, 68, 68, 0.8)",
            opacity: 0.4 + 0.6 * Math.abs(Math.sin(frameOffset / 15))
          }} />

          <span style={{
            fontSize: "14px",
            letterSpacing: "0.2em",
            color: "#3b82f6",
            fontWeight: 700,
            textTransform: "uppercase",
            fontFamily: "'Outfit', sans-serif"
          }}>
            IDENTITY CRISIS IN 2026
          </span>

          <div style={{ display: "flex", alignItems: "baseline", margin: "24px 0 16px 0" }}>
            <span style={{
              fontSize: "120px",
              fontWeight: 800,
              fontFamily: "'Outfit', sans-serif",
              color: "#FFFFFF",
              lineHeight: 0.9,
              letterSpacing: "-0.04em",
              background: "linear-gradient(135deg, #FFF 50%, #60a5fa 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent"
            }}>
              {statVal}%
            </span>
          </div>

          <h3 style={{
            fontSize: "24px",
            fontWeight: 700,
            color: "#FFF",
            margin: "0 0 16px 0",
            fontFamily: "'Outfit', sans-serif",
            lineHeight: 1.3
          }}>
            Increase in Synthetic Fraud Attempts
          </h3>

          <p style={{
            fontSize: "16px",
            color: "#94a3b8",
            margin: 0,
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            lineHeight: 1.6
          }}>
            AI has lowered the barrier for identity forgery. Standard KYC cannot detect live injections. Organizations need high-confidence verification.
          </p>

          <div style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            marginTop: "32px",
            paddingTop: "24px",
            borderTop: "1px solid rgba(255,255,255,0.08)",
            color: "#ef4444",
            fontWeight: 600,
            fontSize: "14px"
          }}>
            <AlertTriangle size={18} />
            <span>Legacy Biometrics and Document Scans Are No Longer Safe</span>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

/* ==========================================
   SCENE 3: ACTIVE DASHBOARD & ALERTS (Frames 600 - 1200)
   ========================================== */
const Scene3Dashboard: React.FC = () => {
  const frame = useCurrentFrame();
  const frameOffset = frame;

  // Spring transition for the dashboard container entering
  const enterSpring = useSpring(frame, 0);
  const dashboardY = interpolate(enterSpring, [0, 1], [50, 0]);
  const dashboardOpacity = interpolate(enterSpring, [0, 1], [0, 1]);

  // Alert triggers
  // Alert 1 (Deepfake block): Frame 150 to 350
  // Alert 2 (Voice clone block): Frame 380 to 580
  const isAlert1Active = frame >= 150 && frame < 350;
  const isAlert2Active = frame >= 380 && frame < 580;

  const alert1Spring = useSpring(frame, 150);
  const alert1Scale = interpolate(alert1Spring, [0, 1], [0.8, 1]);
  const alert1Opacity = interpolate(frame, [150, 165, 330, 350], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  const alert2Spring = useSpring(frame, 380);
  const alert2Scale = interpolate(alert2Spring, [0, 1], [0.8, 1]);
  const alert2Opacity = interpolate(frame, [380, 395, 560, 580], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // Scrolling logs index
  const scrollOffset = interpolate(frameOffset, [0, 150, 300, 450, 600], [0, -68, -136, -204, -272], {
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.25, 1, 0.5, 1)
  });

  // Chart line drawing animation
  const chartOffset = interpolate(frameOffset, [0, 300], [400, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // Concentric radar scan rotation
  const radarRotation = interpolate(frameOffset, [0, 600], [0, 360]);

  return (
    <AbsoluteFill style={{
      background: "linear-gradient(135deg, #020617 0%, #051026 50%, #01040a 100%)",
      overflow: "hidden",
      padding: "30px",
      display: "flex",
      flexDirection: "column",
      opacity: dashboardOpacity,
      transform: `translateY(${dashboardY}px)`
    }}>
      {/* Background radial highlights */}
      <div style={{
        position: "absolute",
        width: "800px",
        height: "800px",
        background: "radial-gradient(circle, rgba(59, 130, 246, 0.1) 0%, rgba(0,0,0,0) 70%)",
        top: "-20%",
        right: "-10%",
        filter: "blur(150px)",
      }} />

      {/* DASHBOARD HEADER */}
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        height: "60px",
        padding: "0 20px",
        borderBottom: "1px solid rgba(59, 130, 246, 0.15)",
        marginBottom: "24px"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <Img 
            src={staticFile("logo.png")} 
            style={{ height: "32px", width: "32px", objectFit: "contain" }} 
            alt="ATNA Logo" 
          />
          <div style={{ fontSize: "20px", fontWeight: 800, color: "#FFFFFF", fontFamily: "'Outfit', sans-serif" }}>
            ATNA Cloud Console
          </div>
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
            fontSize: "12px",
            fontWeight: 600,
            color: "#10b981",
            padding: "4px 10px",
            borderRadius: "30px",
            backgroundColor: "rgba(16, 185, 129, 0.1)",
            border: "1px solid rgba(16, 185, 129, 0.2)",
            marginLeft: "16px"
          }}>
            <div style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: "#10b981" }} />
            SECURE LIVE DEPLOYMENT
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "16px", color: "#94a3b8", fontSize: "14px" }}>
          <span>Active Nodes: <strong style={{ color: "#FFF" }}>4,891</strong></span>
          <span style={{ width: "1px", height: "14px", backgroundColor: "rgba(255,255,255,0.15)" }} />
          <span>System Status: <strong style={{ color: "#3b82f6" }}>Shielding Active</strong></span>
        </div>
      </div>

      {/* DASHBOARD LAYOUT */}
      <div style={{ display: "flex", flex: 1, gap: "24px", width: "100%", height: "calc(100% - 84px)" }}>
        
        {/* LEFT COLUMN: LIVE IDENTITY STREAM (Width 40%) */}
        <div style={{
          display: "flex",
          flexDirection: "column",
          width: "40%",
          backgroundColor: "rgba(15, 23, 42, 0.4)",
          border: "1px solid rgba(59, 130, 246, 0.15)",
          borderRadius: "20px",
          padding: "24px",
          backdropFilter: "blur(10px)",
          overflow: "hidden"
        }}>
          <h3 style={{
            fontSize: "16px",
            fontWeight: 700,
            color: "#FFF",
            margin: "0 0 16px 0",
            fontFamily: "'Outfit', sans-serif",
            display: "flex",
            alignItems: "center",
            gap: "8px"
          }}>
            <Activity size={18} color="#3b82f6" />
            Live Identity Stream
          </h3>

          {/* Table Header */}
          <div style={{
            display: "flex",
            fontSize: "12px",
            fontWeight: 700,
            color: "#64748b",
            textTransform: "uppercase",
            borderBottom: "1px solid rgba(255,255,255,0.08)",
            paddingBottom: "10px",
            marginBottom: "12px"
          }}>
            <div style={{ width: "20%" }}>User ID</div>
            <div style={{ width: "35%" }}>Check Type</div>
            <div style={{ width: "25%" }}>Industry</div>
            <div style={{ width: "20%", textAlign: "right" }}>Status</div>
          </div>

          {/* Scrolling items wrapper */}
          <div style={{ flex: 1, overflow: "hidden", position: "relative" }}>
            <div style={{
              transform: `translateY(${scrollOffset}px)`,
              display: "flex",
              flexDirection: "column",
              gap: "12px",
              position: "absolute",
              width: "100%",
              top: 0
            }}>
              {[
                { id: "USR-9801", type: "KYB Document Verify", ind: "Fintech", stat: "PASSED", color: "#10b981" },
                { id: "USR-9802", type: "Selfie Liveness check", ind: "Banking", stat: "PASSED", color: "#10b981" },
                { id: "USR-9803", type: "Consent Audio Auth", ind: "Insurance", stat: "PASSED", color: "#10b981" },
                { id: "USR-9804", type: "Face-Swap Biometrics", ind: "Gaming", stat: "PASSED", color: "#10b981" },
                { id: "USR-9805", type: "Utility Bill Scanning", ind: "Insurance", stat: "PASSED", color: "#10b981" },
                { id: "USR-9806", type: "Voice Recognition Check", ind: "Banking", stat: "FLAGGED", color: "#ef4444", alert: true },
                { id: "USR-9807", type: "Device ID verification", ind: "Fintech", stat: "PASSED", color: "#10b981" },
                { id: "USR-9808", type: "ID Card Liveness", ind: "Insurance", stat: "PASSED", color: "#10b981" },
                { id: "USR-9809", type: "Identity Injection Scan", ind: "Gaming", stat: "FLAGGED", color: "#ef4444", alert: true },
                { id: "USR-9810", type: "Metadata validation", ind: "Banking", stat: "PASSED", color: "#10b981" }
              ].map((row, idx) => (
                <div 
                  key={idx}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    padding: "12px 14px",
                    borderRadius: "10px",
                    backgroundColor: row.alert ? "rgba(239, 68, 68, 0.08)" : "rgba(255, 255, 255, 0.02)",
                    border: row.alert ? "1px solid rgba(239, 68, 68, 0.2)" : "1px solid rgba(255,255,255,0.04)",
                    fontSize: "14px",
                    height: "56px"
                  }}
                >
                  <div style={{ width: "20%", fontWeight: 600, color: "#93c5fd" }}>{row.id}</div>
                  <div style={{ width: "35%", color: "#f8fafc" }}>{row.type}</div>
                  <div style={{ width: "25%", color: "#94a3b8" }}>{row.ind}</div>
                  <div style={{
                    width: "20%",
                    textAlign: "right",
                    fontWeight: 700,
                    color: row.color,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-end",
                    gap: "6px"
                  }}>
                    {row.stat === "PASSED" ? <Check size={14} /> : <AlertTriangle size={14} />}
                    {row.stat}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* MIDDLE COLUMN: LIVE RISK METRICS & THREAT RADAR (Width 60%) */}
        <div style={{
          display: "flex",
          flexDirection: "column",
          width: "60%",
          gap: "24px"
        }}>
          {/* TOP HALF: LINE CHART */}
          <div style={{
            flex: 1,
            backgroundColor: "rgba(15, 23, 42, 0.4)",
            border: "1px solid rgba(59, 130, 246, 0.15)",
            borderRadius: "20px",
            padding: "24px",
            display: "flex",
            flexDirection: "column",
            backdropFilter: "blur(10px)"
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
              <h3 style={{
                fontSize: "16px",
                fontWeight: 700,
                color: "#FFF",
                margin: 0,
                fontFamily: "'Outfit', sans-serif",
                display: "flex",
                alignItems: "center",
                gap: "8px"
              }}>
                <TrendingUp size={18} color="#3b82f6" />
                Synthetic Attack Block Rate
              </h3>
              <span style={{ fontSize: "12px", color: "#64748b" }}>Live update: every 500ms</span>
            </div>

            {/* SVG graph */}
            <div style={{ flex: 1, position: "relative", minHeight: "150px" }}>
              <svg width="100%" height="100%" viewBox="0 0 500 150" preserveAspectRatio="none" style={{ overflow: "visible" }}>
                {/* Horizontal grid lines */}
                <line x1="0" y1="20" x2="500" y2="20" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
                <line x1="0" y1="75" x2="500" y2="75" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
                <line x1="0" y1="130" x2="500" y2="130" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />

                {/* Animated Glowing Area under graph line */}
                <path
                  d="M0 130 L 50 110 L 100 120 L 150 90 L 200 100 L 250 50 L 300 70 L 350 40 L 400 30 L 450 80 L 500 20 L 500 150 L 0 150 Z"
                  fill="url(#chartAreaGradient)"
                  opacity="0.15"
                />

                {/* Line chart path */}
                <path
                  d="M0 130 L 50 110 L 100 120 L 150 90 L 200 100 L 250 50 L 300 70 L 350 40 L 400 30 L 450 80 L 500 20"
                  fill="none"
                  stroke="#3b82f6"
                  strokeWidth="4"
                  strokeDasharray="400"
                  strokeDashoffset={chartOffset}
                  strokeLinecap="round"
                />

                <defs>
                  <linearGradient id="chartAreaGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#3b82f6" />
                    <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>

          {/* BOTTOM HALF: THREAT GEOLOCATION / RADAR MAP */}
          <div style={{
            display: "flex",
            gap: "24px",
            height: "50%"
          }}>
            {/* RADAR WIDGET */}
            <div style={{
              width: "40%",
              backgroundColor: "rgba(15, 23, 42, 0.4)",
              border: "1px solid rgba(59, 130, 246, 0.15)",
              borderRadius: "20px",
              padding: "20px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
              backdropFilter: "blur(10px)"
            }}>
              <div style={{
                position: "absolute",
                top: "16px",
                left: "16px",
                fontSize: "12px",
                fontWeight: 700,
                color: "#64748b",
                textTransform: "uppercase"
              }}>
                Signal Scan
              </div>

              {/* Animated Radar Radar Circle */}
              <div style={{
                position: "relative",
                width: "120px",
                height: "120px",
                borderRadius: "50%",
                border: "2px solid rgba(59, 130, 246, 0.15)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}>
                <div style={{
                  position: "absolute",
                  width: "80px",
                  height: "80px",
                  borderRadius: "50%",
                  border: "1px dashed rgba(59, 130, 246, 0.25)"
                }} />
                <div style={{
                  position: "absolute",
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  border: "1px solid rgba(59, 130, 246, 0.35)"
                }} />

                {/* Radar Sweep */}
                <div style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  background: "conic-gradient(from 0deg, rgba(59, 130, 246, 0.4), transparent 50%)",
                  borderRadius: "50%",
                  transform: `rotate(${radarRotation}deg)`,
                  pointerEvents: "none"
                }} />

                {/* Target Lock Icon */}
                <Shield size={28} color="#3b82f6" />
              </div>
            </div>

            {/* DETAILED STATS WIDGET */}
            <div style={{
              width: "60%",
              backgroundColor: "rgba(15, 23, 42, 0.4)",
              border: "1px solid rgba(59, 130, 246, 0.15)",
              borderRadius: "20px",
              padding: "20px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              backdropFilter: "blur(10px)"
            }}>
              <div>
                <div style={{ fontSize: "12px", fontWeight: 700, color: "#3b82f6", textTransform: "uppercase" }}>
                  Active Protection Feed
                </div>
                <h4 style={{ fontSize: "20px", fontWeight: 700, color: "#FFF", margin: "6px 0", fontFamily: "'Outfit', sans-serif" }}>
                  Automated Threat Response
                </h4>
                <p style={{ fontSize: "13px", color: "#94a3b8", margin: 0, lineHeight: 1.5 }}>
                  ATNA monitors call injection, media injection, and document metadata in real-time, blocking threats at the edge before they hit your core database.
                </p>
              </div>

              <div style={{ display: "flex", gap: "16px", marginTop: "10px" }}>
                <div>
                  <div style={{ fontSize: "11px", color: "#64748b" }}>Avg. Scan Time</div>
                  <div style={{ fontSize: "20px", fontWeight: 800, color: "#10b981" }}>45ms</div>
                </div>
                <div>
                  <div style={{ fontSize: "11px", color: "#64748b" }}>False Positive</div>
                  <div style={{ fontSize: "20px", fontWeight: 800, color: "#3b82f6" }}>&lt; 0.01%</div>
                </div>
                <div>
                  <div style={{ fontSize: "11px", color: "#64748b" }}>Deepfakes Blocked</div>
                  <div style={{ fontSize: "20px", fontWeight: 800, color: "#f59e0b" }}>124,912</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ==========================================
         CRITICAL FRAUD ALERTS (OVERLAYS)
         ========================================== */}
      
      {/* ALERT 1: DEEPFAKE FACE SWAP (TRU IDV) */}
      {isAlert1Active && (
        <div style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(2, 6, 17, 0.8)",
          backdropFilter: "blur(8px)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 100,
          opacity: alert1Opacity,
        }}>
          {/* Glassmorphic Alert Box */}
          <div style={{
            width: "600px",
            backgroundColor: "rgba(15, 23, 42, 0.95)",
            border: "2px solid #ef4444",
            borderRadius: "24px",
            padding: "40px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            boxShadow: "0 0 50px rgba(239, 68, 68, 0.4), inset 0 0 20px rgba(239, 68, 68, 0.15)",
            transform: `scale(${alert1Scale})`,
            textAlign: "center"
          }}>
            {/* Flashing Alert Indicator */}
            <div style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "72px",
              height: "72px",
              borderRadius: "50%",
              backgroundColor: "rgba(239, 68, 68, 0.15)",
              color: "#ef4444",
              border: "1px solid rgba(239, 68, 68, 0.3)",
              marginBottom: "24px",
              boxShadow: "0 0 15px rgba(239, 68, 68, 0.4)"
            }}>
              <ShieldAlert size={36} />
            </div>

            <div style={{
              fontSize: "14px",
              fontWeight: 800,
              color: "#ef4444",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              fontFamily: "'Outfit', sans-serif"
            }}>
              CRITICAL ATTACK BLOCKED
            </div>

            <h3 style={{
              fontSize: "32px",
              fontWeight: 800,
              color: "#FFFFFF",
              margin: "12px 0 24px 0",
              fontFamily: "'Outfit', sans-serif",
              letterSpacing: "-0.01em"
            }}>
              Deepfake Injection Blocked
            </h3>

            <div style={{
              width: "100%",
              backgroundColor: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.06)",
              borderRadius: "16px",
              padding: "20px",
              marginBottom: "32px",
              display: "flex",
              flexDirection: "column",
              gap: "12px",
              textAlign: "left"
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "14px" }}>
                <span style={{ color: "#64748b" }}>Detection Engine:</span>
                <span style={{ color: "#FFF", fontWeight: 600 }}>TRU IDV (Biometric)</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "14px" }}>
                <span style={{ color: "#64748b" }}>Threat Vector:</span>
                <span style={{ color: "#FFF", fontWeight: 600 }}>Virtual Camera Video Injection</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "14px" }}>
                <span style={{ color: "#64748b" }}>AI Confidence Score:</span>
                <strong style={{ color: "#ef4444" }}>99.7% Synthetic Match</strong>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "14px" }}>
                <span style={{ color: "#64748b" }}>Action Taken:</span>
                <span style={{ color: "#ef4444", fontWeight: 700, textTransform: "uppercase" }}>Session Terminated</span>
              </div>
            </div>

            {/* Block Action Badge */}
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              backgroundColor: "rgba(239, 68, 68, 0.2)",
              color: "#ef4444",
              fontWeight: 800,
              fontSize: "16px",
              padding: "12px 36px",
              borderRadius: "30px",
              border: "1px solid rgba(239, 68, 68, 0.4)",
              letterSpacing: "0.05em",
              textTransform: "uppercase"
            }}>
              <Lock size={18} />
              SYSTEM SECURED
            </div>
          </div>
        </div>
      )}

      {/* ALERT 2: SYNTHETIC VOICE INTENT (TRU YU) */}
      {isAlert2Active && (
        <div style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(2, 6, 17, 0.8)",
          backdropFilter: "blur(8px)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 100,
          opacity: alert2Opacity,
        }}>
          {/* Glassmorphic Alert Box */}
          <div style={{
            width: "600px",
            backgroundColor: "rgba(15, 23, 42, 0.95)",
            border: "2px solid #ef4444",
            borderRadius: "24px",
            padding: "40px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            boxShadow: "0 0 50px rgba(239, 68, 68, 0.4), inset 0 0 20px rgba(239, 68, 68, 0.15)",
            transform: `scale(${alert2Scale})`,
            textAlign: "center"
          }}>
            {/* Flashing Alert Indicator */}
            <div style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "72px",
              height: "72px",
              borderRadius: "50%",
              backgroundColor: "rgba(239, 68, 68, 0.15)",
              color: "#ef4444",
              border: "1px solid rgba(239, 68, 68, 0.3)",
              marginBottom: "24px",
              boxShadow: "0 0 15px rgba(239, 68, 68, 0.4)"
            }}>
              <ShieldX size={36} />
            </div>

            <div style={{
              fontSize: "14px",
              fontWeight: 800,
              color: "#ef4444",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              fontFamily: "'Outfit', sans-serif"
            }}>
              VOICE CLONE INTRUSION DETECTED
            </div>

            <h3 style={{
              fontSize: "32px",
              fontWeight: 800,
              color: "#FFFFFF",
              margin: "12px 0 24px 0",
              fontFamily: "'Outfit', sans-serif",
              letterSpacing: "-0.01em"
            }}>
              High-Value Wire Blocked
            </h3>

            <div style={{
              width: "100%",
              backgroundColor: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.06)",
              borderRadius: "16px",
              padding: "20px",
              marginBottom: "32px",
              display: "flex",
              flexDirection: "column",
              gap: "12px",
              textAlign: "left"
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "14px" }}>
                <span style={{ color: "#64748b" }}>Detection Engine:</span>
                <span style={{ color: "#FFF", fontWeight: 600 }}>TRU Yu (Voice Synthesis Detection)</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "14px" }}>
                <span style={{ color: "#64748b" }}>Channel:</span>
                <span style={{ color: "#FFF", fontWeight: 600 }}>API Voice Authorization Call</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "14px" }}>
                <span style={{ color: "#64748b" }}>Synthetic Pitch Probability:</span>
                <strong style={{ color: "#ef4444" }}>99.2% Artificial Tone Match</strong>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "14px" }}>
                <span style={{ color: "#64748b" }}>Action Taken:</span>
                <span style={{ color: "#ef4444", fontWeight: 700, textTransform: "uppercase" }}>Wire frozen & locked</span>
              </div>
            </div>

            {/* Block Action Badge */}
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              backgroundColor: "rgba(239, 68, 68, 0.2)",
              color: "#ef4444",
              fontWeight: 800,
              fontSize: "16px",
              padding: "12px 36px",
              borderRadius: "30px",
              border: "1px solid rgba(239, 68, 68, 0.4)",
              letterSpacing: "0.05em",
              textTransform: "uppercase"
            }}>
              <Lock size={18} />
              TRANSACTION FROZEN
            </div>
          </div>
        </div>
      )}
    </AbsoluteFill>
  );
};

/* ==========================================
   SCENE 4: INDUSTRY VERTICALS (Frames 1200 - 1500)
   ========================================== */
const Scene4Verticals: React.FC = () => {
  const frame = useCurrentFrame();
  const frameOffset = frame;

  // Staggered slide and float animations for the 4 industry cards
  const slide1 = useSpring(frameOffset, 0);
  const slide2 = useSpring(frameOffset, 20);
  const slide3 = useSpring(frameOffset, 40);
  const slide4 = useSpring(frameOffset, 60);

  const card1Y = interpolate(slide1, [0, 1], [60, 0]);
  const card1Opacity = interpolate(slide1, [0, 1], [0, 1]);

  const card2Y = interpolate(slide2, [0, 1], [60, 0]);
  const card2Opacity = interpolate(slide2, [0, 1], [0, 1]);

  const card3Y = interpolate(slide3, [0, 1], [60, 0]);
  const card3Opacity = interpolate(slide3, [0, 1], [0, 1]);

  const card4Y = interpolate(slide4, [0, 1], [60, 0]);
  const card4Opacity = interpolate(slide4, [0, 1], [0, 1]);

  return (
    <AbsoluteFill style={{
      background: "linear-gradient(135deg, #020617 0%, #06112a 50%, #030712 100%)",
      overflow: "hidden",
      padding: "80px 100px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center"
    }}>
      {/* Background neon blurs */}
      <div style={{
        position: "absolute",
        width: "600px",
        height: "600px",
        background: "radial-gradient(circle, rgba(59, 130, 246, 0.12) 0%, rgba(0,0,0,0) 70%)",
        bottom: "-10%",
        left: "20%",
        filter: "blur(120px)",
      }} />

      {/* Grid overlay */}
      <div style={{
        position: "absolute",
        width: "100%",
        height: "100%",
        opacity: 0.08,
        backgroundImage: `linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)`,
        backgroundSize: "60px 60px",
        top: 0, left: 0
      }} />

      <div style={{ textAlign: "center", marginBottom: "60px" }}>
        <span style={{
          fontSize: "14px",
          letterSpacing: "0.3em",
          color: "#3b82f6",
          fontWeight: 700,
          textTransform: "uppercase",
          fontFamily: "'Outfit', sans-serif"
        }}>
          Multi-Industry Protection
        </span>
        <h2 style={{
          fontSize: "46px",
          fontWeight: 800,
          color: "#FFFFFF",
          margin: "8px 0 16px 0",
          fontFamily: "'Outfit', sans-serif",
          letterSpacing: "-0.01em"
        }}>
          One Unified Trust Engine
        </h2>
        <p style={{
          fontSize: "18px",
          color: "#94a3b8",
          margin: 0,
          maxWidth: "800px",
          fontFamily: "'Plus Jakarta Sans', sans-serif"
        }}>
          From transaction authorization to automated document scanning, ATNA secure shields integrate smoothly into major global industry platforms.
        </p>
      </div>

      {/* 4 Cards */}
      <div style={{
        display: "flex",
        gap: "24px",
        width: "100%",
        justifyContent: "center"
      }}>
        
        {/* Banking */}
        <div style={{
          display: "flex",
          flexDirection: "column",
          width: "23%",
          backgroundColor: "rgba(15, 23, 42, 0.65)",
          border: "1px solid rgba(59, 130, 246, 0.25)",
          borderRadius: "20px",
          padding: "30px 24px",
          transform: `translateY(${card1Y}px)`,
          opacity: card1Opacity,
          backdropFilter: "blur(10px)",
          boxShadow: "0 20px 40px rgba(0, 0, 0, 0.4), inset 0 0 10px rgba(59, 130, 246, 0.05)"
        }}>
          <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "48px",
            height: "48px",
            borderRadius: "12px",
            backgroundColor: "rgba(59, 130, 246, 0.15)",
            color: "#3b82f6",
            marginBottom: "24px"
          }}>
            <Landmark size={24} />
          </div>
          <h3 style={{ fontSize: "22px", fontWeight: 700, color: "#FFF", margin: "0 0 10px 0", fontFamily: "'Outfit', sans-serif" }}>
            Banking
          </h3>
          <p style={{ fontSize: "14px", color: "#94a3b8", margin: "0 0 24px 0", lineHeight: 1.5 }}>
            Verify high-value wire transfers against sophisticated AI voice clones and remote video feed injection attacks.
          </p>
          <div style={{
            marginTop: "auto",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            fontSize: "12px",
            fontWeight: 700,
            color: "#10b981"
          }}>
            <CheckCircle size={14} />
            TRU YU ACTIVE
          </div>
        </div>

        {/* Fintech */}
        <div style={{
          display: "flex",
          flexDirection: "column",
          width: "23%",
          backgroundColor: "rgba(15, 23, 42, 0.65)",
          border: "1px solid rgba(59, 130, 246, 0.25)",
          borderRadius: "20px",
          padding: "30px 24px",
          transform: `translateY(${card2Y}px)`,
          opacity: card2Opacity,
          backdropFilter: "blur(10px)",
          boxShadow: "0 20px 40px rgba(0, 0, 0, 0.4), inset 0 0 10px rgba(59, 130, 246, 0.05)"
        }}>
          <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "48px",
            height: "48px",
            borderRadius: "12px",
            backgroundColor: "rgba(59, 130, 246, 0.15)",
            color: "#3b82f6",
            marginBottom: "24px"
          }}>
            <Coins size={24} />
          </div>
          <h3 style={{ fontSize: "22px", fontWeight: 700, color: "#FFF", margin: "0 0 10px 0", fontFamily: "'Outfit', sans-serif" }}>
            Fintech
          </h3>
          <p style={{ fontSize: "14px", color: "#94a3b8", margin: "0 0 24px 0", lineHeight: 1.5 }}>
            Automate high-confidence user KYC onboarding by blocking fake digital injection and synthetic identities.
          </p>
          <div style={{
            marginTop: "auto",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            fontSize: "12px",
            fontWeight: 700,
            color: "#10b981"
          }}>
            <CheckCircle size={14} />
            TRU IDV ACTIVE
          </div>
        </div>

        {/* Insurance */}
        <div style={{
          display: "flex",
          flexDirection: "column",
          width: "23%",
          backgroundColor: "rgba(15, 23, 42, 0.65)",
          border: "1px solid rgba(59, 130, 246, 0.25)",
          borderRadius: "20px",
          padding: "30px 24px",
          transform: `translateY(${card3Y}px)`,
          opacity: card3Opacity,
          backdropFilter: "blur(10px)",
          boxShadow: "0 20px 40px rgba(0, 0, 0, 0.4), inset 0 0 10px rgba(59, 130, 246, 0.05)"
        }}>
          <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "48px",
            height: "48px",
            borderRadius: "12px",
            backgroundColor: "rgba(59, 130, 246, 0.15)",
            color: "#3b82f6",
            marginBottom: "24px"
          }}>
            <Shield size={24} />
          </div>
          <h3 style={{ fontSize: "22px", fontWeight: 700, color: "#FFF", margin: "0 0 10px 0", fontFamily: "'Outfit', sans-serif" }}>
            Insurance
          </h3>
          <p style={{ fontSize: "14px", color: "#94a3b8", margin: "0 0 24px 0", lineHeight: 1.5 }}>
            Scan uploaded claims, PDF invoices, and identification documents for digital alterations and metadata swaps.
          </p>
          <div style={{
            marginTop: "auto",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            fontSize: "12px",
            fontWeight: 700,
            color: "#10b981"
          }}>
            <CheckCircle size={14} />
            TRU DOCS ACTIVE
          </div>
        </div>

        {/* Gaming */}
        <div style={{
          display: "flex",
          flexDirection: "column",
          width: "23%",
          backgroundColor: "rgba(15, 23, 42, 0.65)",
          border: "1px solid rgba(59, 130, 246, 0.25)",
          borderRadius: "20px",
          padding: "30px 24px",
          transform: `translateY(${card4Y}px)`,
          opacity: card4Opacity,
          backdropFilter: "blur(10px)",
          boxShadow: "0 20px 40px rgba(0, 0, 0, 0.4), inset 0 0 10px rgba(59, 130, 246, 0.05)"
        }}>
          <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "48px",
            height: "48px",
            borderRadius: "12px",
            backgroundColor: "rgba(59, 130, 246, 0.15)",
            color: "#3b82f6",
            marginBottom: "24px"
          }}>
            <Gamepad size={24} />
          </div>
          <h3 style={{ fontSize: "22px", fontWeight: 700, color: "#FFF", margin: "0 0 10px 0", fontFamily: "'Outfit', sans-serif" }}>
            Gaming
          </h3>
          <p style={{ fontSize: "14px", color: "#94a3b8", margin: "0 0 24px 0", lineHeight: 1.5 }}>
            Stop Sybil attacks and multi-accounting farms trying to extract rewards with fake synthetic identities.
          </p>
          <div style={{
            marginTop: "auto",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            fontSize: "12px",
            fontWeight: 700,
            color: "#10b981"
          }}>
            <CheckCircle size={14} />
            TRU SCRIBE ACTIVE
          </div>
        </div>

      </div>
    </AbsoluteFill>
  );
};

/* ==========================================
   SCENE 5: OUTRO & CALL TO ACTION (Frames 1500 - 1800)
   ========================================== */
const Scene5Outro: React.FC = () => {
  const frame = useCurrentFrame();
  const frameOffset = frame;

  // Spring animations for logo scaling and entrance
  const springEntrance = useSpring(frameOffset, 15);
  const logoScale = interpolate(springEntrance, [0, 1], [0.8, 1]);
  const logoOpacity = interpolate(springEntrance, [0, 1], [0, 1]);

  // Outro Text elements shifting up sequentially
  const text1Y = interpolate(frameOffset, [40, 60], [30, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const text1Opacity = interpolate(frameOffset, [40, 55], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  const ctaY = interpolate(frameOffset, [70, 90], [30, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const ctaOpacity = interpolate(frameOffset, [70, 85], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // CTA Button pulse
  const btnScale = interpolate(frameOffset, [100, 115, 130], [1, 1.05, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp"
  });

  return (
    <AbsoluteFill style={{
      background: "radial-gradient(circle at 50% 50%, #03112c 0%, #01040a 100%)",
      overflow: "hidden",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      textAlign: "center"
    }}>
      {/* Dynamic Background Mesh */}
      <div style={{
        position: "absolute",
        width: "100%",
        height: "100%",
        opacity: 0.05,
        backgroundImage: `linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)`,
        backgroundSize: "40px 40px",
        top: 0, left: 0
      }} />

      {/* Main logo block */}
      <div style={{
        transform: `scale(${logoScale})`,
        opacity: logoOpacity,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginBottom: "32px"
      }}>
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "24px",
          borderRadius: "32px",
          background: "rgba(15, 23, 42, 0.5)",
          border: "1px solid rgba(59, 130, 246, 0.3)",
          backdropFilter: "blur(12px)",
          boxShadow: "0 25px 60px rgba(0, 0, 0, 0.4), inset 0 0 15px rgba(59, 130, 246, 0.2)",
          marginBottom: "20px"
        }}>
          <Img 
            src={staticFile("logo.png")} 
            style={{ height: "90px", width: "90px", objectFit: "contain", filter: "drop-shadow(0 0 15px rgba(59,130,246,0.6))" }} 
            alt="ATNA Logo"
          />
          <div style={{ marginLeft: "24px", height: "40px" }}>
            <AnimatedLogo fillColor="#FFFFFF" style={{ transform: "scale(2.2)", transformOrigin: "left center" }} />
          </div>
        </div>
      </div>

      {/* Title Message */}
      <div style={{
        opacity: text1Opacity,
        transform: `translateY(${text1Y}px)`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
      }}>
        <h2 style={{
          fontSize: "52px",
          fontWeight: 800,
          color: "#FFFFFF",
          margin: "0 0 12px 0",
          fontFamily: "'Outfit', sans-serif",
          letterSpacing: "-0.02em"
        }}>
          The New Standard in Identity Trust
        </h2>
        
        {/* Brand products list */}
        <div style={{
          display: "flex",
          gap: "16px",
          fontSize: "16px",
          fontWeight: 600,
          color: "#60a5fa",
          fontFamily: "'Inter', sans-serif",
          marginBottom: "36px"
        }}>
          <span>TRU Yu</span>
          <span>•</span>
          <span>TRU IDV</span>
          <span>•</span>
          <span>TRU Docs</span>
          <span>•</span>
          <span>TRU Scribe</span>
        </div>
      </div>

      {/* Call To Action Button & Links */}
      <div style={{
        opacity: ctaOpacity,
        transform: `translateY(${ctaY}px)`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
      }}>
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: "16px",
          backgroundColor: "#3b82f6",
          color: "#FFFFFF",
          fontWeight: 700,
          fontSize: "18px",
          padding: "16px 48px",
          borderRadius: "14px",
          boxShadow: "0 10px 30px rgba(59, 130, 246, 0.4), 0 0 15px rgba(6, 182, 212, 0.2)",
          cursor: "pointer",
          transform: `scale(${btnScale})`,
          fontFamily: "'Outfit', sans-serif",
          border: "1px solid rgba(255,255,255,0.15)"
        }}>
          Book a Security Demo
          <ArrowRight size={20} />
        </div>

        <div style={{
          marginTop: "32px",
          fontSize: "24px",
          fontWeight: 700,
          color: "#FFF",
          fontFamily: "'Outfit', sans-serif",
          letterSpacing: "0.05em"
        }}>
          Visit <span style={{ color: "#3b82f6" }}>tru.atna.ai</span>
        </div>
      </div>
    </AbsoluteFill>
  );
};

/* ==========================================
   MAIN VIDEO COMPOSITION: AtnaSaasPromo
   ========================================== */
export const AtnaSaasPromo: React.FC = () => {
  const frame = useCurrentFrame();

  // Scene transitions interpolation (fade/scale slides)
  // Transition between Scene 1 and Scene 2 (Frame 300)
  const scene1Opacity = interpolate(frame, [285, 300], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const scene2Opacity = interpolate(frame, [290, 315, 585, 600], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const scene3Opacity = interpolate(frame, [590, 615, 1185, 1200], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const scene4Opacity = interpolate(frame, [1190, 1215, 1485, 1500], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const scene5Opacity = interpolate(frame, [1490, 1515], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ backgroundColor: "#020617", fontFamily: ATNA_THEME.fontFamily }}>
      
      {/* 1. SOUNDTRACK AUDIO (Runs full 60 seconds) */}
      <Audio src={staticFile("soundtrack.mp3")} volume={0.4} />

      {/* 2. TRANSITIONAL SOUND EFFECTS */}
      {/* Whoosh transition between scenes */}
      <Sequence from={285} durationInFrames={30}>
        <Audio src={staticFile("whoosh.mp3")} volume={0.8} />
      </Sequence>
      <Sequence from={585} durationInFrames={30}>
        <Audio src={staticFile("whoosh.mp3")} volume={0.8} />
      </Sequence>
      <Sequence from={1185} durationInFrames={30}>
        <Audio src={staticFile("whoosh.mp3")} volume={0.8} />
      </Sequence>
      <Sequence from={1485} durationInFrames={30}>
        <Audio src={staticFile("whoosh.mp3")} volume={0.8} />
      </Sequence>

      {/* Alert beeps inside the dashboard scene */}
      <Sequence from={750} durationInFrames={40}>
        <Audio src={staticFile("beep.mp3")} volume={0.9} />
      </Sequence>
      <Sequence from={980} durationInFrames={40}>
        <Audio src={staticFile("beep.mp3")} volume={0.9} />
      </Sequence>

      {/* Button click sound effects */}
      <Sequence from={1600} durationInFrames={30}>
        <Audio src={staticFile("click.mp3")} volume={0.7} />
      </Sequence>

      {/* ==========================================
         SCENES SEQUENCING
         ========================================== */}
      
      {/* Scene 1: Hook & Reveal (0 - 300) */}
      <Sequence durationInFrames={300}>
        <div style={{ width: "100%", height: "100%", opacity: scene1Opacity }}>
          <Scene1Intro />
        </div>
      </Sequence>

      {/* Scene 2: Threat Matrix (300 - 600) */}
      <Sequence from={300} durationInFrames={300}>
        <div style={{ width: "100%", height: "100%", opacity: scene2Opacity }}>
          <Scene2Threats />
        </div>
      </Sequence>

      {/* Scene 3: Dashboard & Alerts (600 - 1200) */}
      <Sequence from={600} durationInFrames={600}>
        <div style={{ width: "100%", height: "100%", opacity: scene3Opacity }}>
          <Scene3Dashboard />
        </div>
      </Sequence>

      {/* Scene 4: Verticals (1200 - 1500) */}
      <Sequence from={1200} durationInFrames={300}>
        <div style={{ width: "100%", height: "100%", opacity: scene4Opacity }}>
          <Scene4Verticals />
        </div>
      </Sequence>

      {/* Scene 5: Outro & Call to Action (1500 - 1800) */}
      <Sequence from={1500} durationInFrames={300}>
        <div style={{ width: "100%", height: "100%", opacity: scene5Opacity }}>
          <Scene5Outro />
        </div>
      </Sequence>

    </AbsoluteFill>
  );
};
