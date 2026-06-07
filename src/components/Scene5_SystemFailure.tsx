import React, { useMemo } from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { TriangleAlert } from "lucide-react";

const Shape: React.FC<{ index: number }> = ({ index }) => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  // Randomize based on index
  const random = useMemo(() => {
    const seed = index * 12345;
    return {
      xStart: (seed % width) - width / 2,
      yStart: ((seed * 7) % height) - height / 2,
      xTarget: ((seed * 13) % (width * 2)) - width,
      yTarget: ((seed * 17) % (height * 2)) - height,
      rotation: (seed * 23) % 360,
      size: 20 + ((seed * 31) % 60),
      isTriangle: seed % 2 === 0
    };
  }, [index, width, height]);

  const progress = spring({
    frame,
    fps,
    config: { damping: 200, mass: 1 } // slow drift
  });

  const explodeProgress = spring({
    frame: frame - 120, // Explode at frame 120
    fps,
    config: { damping: 12, mass: 0.5 }
  });

  const x = random.xStart + interpolate(progress, [0, 1], [0, random.xTarget * 0.2]) + interpolate(explodeProgress, [0, 1], [0, random.xTarget * 2]);
  const y = random.yStart + interpolate(progress, [0, 1], [0, random.yTarget * 0.2]) + interpolate(explodeProgress, [0, 1], [0, random.yTarget * 2]);
  const rot = random.rotation + interpolate(progress, [0, 1], [0, 90]) + interpolate(explodeProgress, [0, 1], [0, 360]);

  return (
    <div style={{
      position: "absolute",
      top: "50%", left: "50%",
      transform: `translate(-50%, -50%) translate(${x}px, ${y}px) rotate(${rot}deg)`,
      width: `${random.size}px`,
      height: `${random.size}px`,
      backgroundColor: random.isTriangle ? "transparent" : "rgba(74, 242, 161, 0.2)",
      borderLeft: random.isTriangle ? `${random.size / 2}px solid transparent` : "none",
      borderRight: random.isTriangle ? `${random.size / 2}px solid transparent` : "none",
      borderBottom: random.isTriangle ? `${random.size}px solid rgba(255, 255, 255, 0.1)` : "none",
      borderRadius: random.isTriangle ? "0" : "8px",
      opacity: interpolate(explodeProgress, [0, 1], [1, 0])
    }} />
  );
};

export const Scene5_SystemFailure: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const modalProgress = spring({
    frame: frame - 120, // Appears at frame 120
    fps,
    config: { damping: 12 }
  });

  const modalScale = interpolate(modalProgress, [0, 1], [0, 1]);
  const pulse = Math.sin((frame - 120) * 0.2) * 0.5 + 0.5; // 0 to 1
  const redShadow = `0 0 ${40 + pulse * 60}px rgba(255, 50, 50, ${0.4 + pulse * 0.4})`;

  return (
    <AbsoluteFill style={{ backgroundColor: "#0A0A0A", overflow: "hidden" }}>
      {/* Background Shapes */}
      {[...Array(50)].map((_, i) => (
        <Shape key={i} index={i} />
      ))}

      {/* Screen flash on alert */}
      {frame > 120 && frame < 125 && (
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: "rgba(255,0,0,0.3)", zIndex: 5 }} />
      )}

      {/* Alert Modal */}
      {frame >= 120 && (
        <div style={{
          position: "absolute",
          top: "50%", left: "50%",
          transform: `translate(-50%, -50%) scale(${modalScale})`,
          backgroundColor: "#111",
          border: "2px solid #FF3333",
          padding: "40px 60px",
          borderRadius: "16px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "24px",
          boxShadow: redShadow,
          zIndex: 10
        }}>
          <TriangleAlert size={80} color="#FF3333" />
          <h1 style={{ margin: 0, color: "#FFF", fontSize: "48px", fontWeight: 900, letterSpacing: "2px", textTransform: "uppercase" }}>
            You are exposed!
          </h1>
          <p style={{ margin: 0, color: "#AAA", fontSize: "24px" }}>
            Unverified actors have breached the perimeter.
          </p>
        </div>
      )}
    </AbsoluteFill>
  );
};
