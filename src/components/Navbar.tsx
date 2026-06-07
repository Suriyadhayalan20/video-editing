import React from "react";
import { AnimatedLogo } from "./AnimatedLogo";
import { Sun, Moon } from "lucide-react";

export const Navbar: React.FC = () => {
  return (
    <div style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "32px 64px",
      width: "100%",
      position: "absolute",
      top: 0,
      left: 0,
      zIndex: 10
    }}>
      {/* Logo */}
      <div style={{ transform: "scale(1.5)", transformOrigin: "left center" }}>
        <AnimatedLogo />
      </div>

      {/* Links */}
      <div style={{ display: "flex", gap: "40px", fontWeight: 500, fontSize: "16px", color: "#111" }}>
        <span>How it Works</span>
        <span>Why TRU Series</span>
        <span>Testimonials</span>
      </div>

      {/* Right controls */}
      <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
        {/* Theme Toggle */}
        <div style={{
          display: "flex",
          backgroundColor: "rgba(255,255,255,0.4)",
          borderRadius: "30px",
          padding: "6px 12px",
          gap: "12px",
          border: "1px solid rgba(255,255,255,0.6)"
        }}>
          <Sun size={18} color="#111" />
          <Moon size={18} color="#666" />
        </div>
        
        {/* Talk to sales */}
        <div style={{
          backgroundColor: "#FFF",
          padding: "12px 24px",
          borderRadius: "8px",
          fontWeight: 600,
          color: "#111",
          boxShadow: "0 4px 12px rgba(0,0,0,0.05)"
        }}>
          Talk to sales
        </div>
      </div>
    </div>
  );
};
