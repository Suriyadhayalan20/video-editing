import React from "react";
import { AbsoluteFill } from "remotion";

export const AtnaBackground: React.FC = () => {
  return (
    <AbsoluteFill style={{ 
      background: "linear-gradient(100deg, #10438D 0%, #357EC9 25%, #EAF3F9 50%, #52D8B9 75%, #1D9D83 100%)",
      overflow: "hidden"
    }}>
      {/* Concentric borders */}
      <div style={{
        position: "absolute",
        top: "-10%", left: "4%", right: "-10%", bottom: "-10%",
        border: "1px solid rgba(255,255,255,0.3)",
        borderRadius: "80px",
        pointerEvents: "none"
      }} />
      <div style={{
        position: "absolute",
        top: "0%", left: "9%", right: "-10%", bottom: "-10%",
        border: "1px solid rgba(255,255,255,0.3)",
        borderRadius: "80px",
        pointerEvents: "none"
      }} />
      <div style={{
        position: "absolute",
        top: "15%", left: "15%", right: "-10%", bottom: "-10%",
        border: "1px solid rgba(255,255,255,0.4)",
        borderRadius: "60px",
        pointerEvents: "none",
        boxShadow: "inset 0 0 100px rgba(255,255,255,0.5)"
      }} />
      <div style={{
        position: "absolute",
        top: "20%", left: "20%", right: "20%", bottom: "-10%",
        border: "1px solid rgba(255,255,255,0.5)",
        borderRadius: "40px",
        pointerEvents: "none",
        boxShadow: "inset 0 0 150px rgba(255,255,255,0.7), 0 0 100px rgba(255,255,255,0.5)",
        background: "radial-gradient(ellipse at top, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 70%)"
      }} />
    </AbsoluteFill>
  );
};
