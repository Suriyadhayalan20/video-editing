import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig, Easing, spring } from 'remotion';

export const Scene5_Funnel: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 1. Overall Scene entrance (slight scale & fade in)
  const sceneOpacity = interpolate(frame, [0, 15], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const sceneExitOpacity = interpolate(frame, [235, 250], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const sceneScale = spring({
    fps,
    frame,
    config: {
      damping: 24,
      stiffness: 75,
      mass: 0.95,
    },
  });

  // 2. Bottom-to-Top segment reveal mask for the funnel wall
  // Reveals Layer 4 (Bottom Base, y:268-276) at 0-15, Layer 3 (y:186-268) at 40-55, Layer 2 (y:111-186) at 80-95, Layer 1 (Top, y:32-111) at 120-135
  const clipHeight = interpolate(
    frame,
    [0, 15, 40, 55, 80, 95, 120, 135],
    [0, 8, 8, 90, 90, 165, 165, 244],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.bezier(0.25, 1, 0.5, 1),
    }
  );

  // 3. Staggered scale & opacity for the rings (Bottom to Top)
  // Bottom Ring - Opens frames 0 to 15
  const bottomRingScale = interpolate(frame, [0, 15], [0.7, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.quad) });
  const bottomRingOpacity = interpolate(frame, [0, 15], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  // Ring 2 (Middle-Lower) - Opens frames 40 to 55
  const ring2Scale = interpolate(frame, [40, 55], [0.7, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.quad) });
  const ring2Opacity = interpolate(frame, [40, 55], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  // Ring 1 (Middle-Upper) - Opens frames 80 to 95
  const ring1Scale = interpolate(frame, [80, 95], [0.7, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.quad) });
  const ring1Opacity = interpolate(frame, [80, 95], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  // Top Ring (Ring 3) - Opens frames 120 to 135
  const ring3Scale = interpolate(frame, [120, 135], [0.7, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.quad) });
  const ring3Opacity = interpolate(frame, [120, 135], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  // Central data column scale from bottom to top (reveals early as bottom opens, frame 10 to 45)
  const centerScaleY = interpolate(frame, [10, 45], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.25, 1, 0.5, 1),
  });

  // Top opening glow and bottom shadow base transitions
  const topGlowOpacity = interpolate(frame, [120, 135], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const shadowOpacity = interpolate(frame, [0, 15], [0, 0.25], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  // 4. Connecting lines drawing animations (all cyan)
  // Bottom to Top drawing order
  const getLineDashoffset = (startFrame: number, length: number) => {
    return interpolate(frame, [startFrame, startFrame + 15], [length, 0], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.bezier(0.25, 1, 0.5, 1),
    });
  };

  const line5Dash = getLineDashoffset(20, 36);   // Bottom Right (starts y:271.2)
  const line4Dash = getLineDashoffset(60, 52);   // Lower Left (starts y:230.6)
  const line3Dash = getLineDashoffset(85, 38);   // Middle Right (starts y:167.6)
  const line2Dash = getLineDashoffset(120, 32);  // Upper Left (starts y:116.6)
  const line1Dash = getLineDashoffset(155, 20);  // Top Right (starts y:64.6)

  // 5. Label staggered entrances & counting values (Bottom to Top)
  const getLabelStyle = (startFrame: number, side: 'left' | 'right') => {
    const opacity = interpolate(frame, [startFrame, startFrame + 15], [0, 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    });
    const slideX = interpolate(frame, [startFrame, startFrame + 15], [side === 'left' ? -20 : 20, 0], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.bezier(0.25, 1, 0.5, 1),
    });
    return {
      opacity,
      transform: `translateY(-50%) translateX(${slideX}px)`,
    };
  };

  const label5Style = getLabelStyle(30, 'right'); // Bottom Right
  const label4Style = getLabelStyle(70, 'left');  // Lower Left
  const label3Style = getLabelStyle(95, 'right'); // Middle Right
  const label2Style = getLabelStyle(130, 'left');  // Upper Left
  const label1Style = getLabelStyle(165, 'right'); // Top Right

  // Numerical counters (Bottom to Top timing)
  const getCountVal = (startFrame: number, target: number) => {
    const progress = interpolate(frame, [startFrame, startFrame + 30], [0, 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.bezier(0.25, 1, 0.33, 1),
    });
    return Math.round(interpolate(progress, [0, 1], [0, target]));
  };

  const val5_safe = getCountVal(30, 860);
  const val5_risk = getCountVal(30, 285);
  const val4 = getCountVal(70, 1145);
  const val3 = getCountVal(95, 1470);
  const val2 = getCountVal(130, 10980);
  const val1 = getCountVal(165, 12450);

  // Constants
  const scaleFactor = 2.3;
  const svgWidth = 684 * scaleFactor;
  const svgHeight = 276 * scaleFactor;

  return (
    <AbsoluteFill style={{
      backgroundColor: '#EFF7F9',
      justifyContent: 'center',
      alignItems: 'center',
      fontFamily: "'Plus Jakarta Sans', sans-serif",
      opacity: sceneOpacity * sceneExitOpacity,
    }}>
      {/* Main Visual Area */}
      <div style={{
        position: 'relative',
        width: `${svgWidth}px`,
        height: `${svgHeight}px`,
        transform: `scale(${sceneScale})`,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '20px',
      }}>
        {/* Crisp HTML Title 'Funnel view' with increased size */}
        <div
          style={{
            position: 'absolute',
            left: `${19.4 * scaleFactor}px`,
            top: `${-30 * scaleFactor}px`,
            fontSize: '56px',
            fontWeight: 800,
            color: '#0A0A0A',
            fontFamily: "'Plus Jakarta Sans', sans-serif",
          }}
        >
          Funnel view
        </div>

        {/* Render SVG Vector Funnel */}
        <svg
          width={svgWidth}
          height={svgHeight}
          viewBox="0 0 684 276"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            overflow: 'visible',
          }}
        >
          <defs>
            {/* Top opening glow */}
            <linearGradient id="paint0_linear_2626_2269" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#2BEAF9" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#2BEAF9" stopOpacity="0.05" />
            </linearGradient>

            {/* Funnel wall glassmorphic gradient */}
            <linearGradient id="paint1_linear_2626_2269" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#2BEAF9" stopOpacity="0.22" />
              <stop offset="60%" stopColor="#2BEAF9" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#FF896B" stopOpacity="0.08" />
            </linearGradient>

            {/* Glowing central column */}
            <linearGradient id="paint2_linear_2626_2269" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#2BEAF9" stopOpacity="0.55" />
              <stop offset="100%" stopColor="#FF896B" stopOpacity="0.55" />
            </linearGradient>

            {/* Segmented bottom-to-top reveal clip path for the glass wall */}
            <clipPath id="funnelWallClip">
              <rect x="0" y={276 - clipHeight} width="684" height={clipHeight} />
            </clipPath>
          </defs>

          {/* Top opening glow ellipse */}
          <ellipse
            cx="342.471"
            cy="63.7479"
            rx="159.452"
            ry="32.1329"
            fill="url(#paint0_linear_2626_2269)"
            style={{
              opacity: topGlowOpacity,
            }}
          />

          {/* Bottom shadow base (soft red/pink) */}
          <path
            opacity={shadowOpacity}
            d="M342.472 260.08C359.681 260.08 375.24 261.841 386.48 264.678C392.104 266.098 396.613 267.779 399.7 269.622C402.827 271.488 404.312 273.404 404.312 275.237C404.311 277.07 402.827 278.986 399.7 280.852C396.613 282.695 392.104 284.376 386.48 285.796C375.24 288.633 359.681 290.393 342.472 290.393C325.263 290.393 309.702 288.633 298.463 285.796C292.839 284.376 288.33 282.695 285.242 280.852C282.116 278.986 280.631 277.07 280.631 275.237C280.631 273.07 282.116 271.488 285.242 269.622C288.33 267.779 292.839 266.098 298.463 264.678C309.702 261.841 325.263 260.08 342.472 260.08Z"
            fill="#FF896B"
            stroke="rgba(255, 137, 107, 0.4)"
            strokeWidth="1"
          />

          {/* Central data column - Grows bottom to top */}
          <rect
            x="280.025"
            y="156.509"
            width="123.681"
            height="118.831"
            fill="url(#paint2_linear_2626_2269)"
            style={{
              transform: `scaleY(${centerScaleY})`,
              transformOrigin: '280px 275.34px', // Scales from bottom to top
            }}
          />

          {/* Glass funnel wall - Clipped to reveal bottom-to-top */}
          <path
            d="M183.626 64.3544H501.317L401.281 268.065H281.843L183.626 64.3544Z"
            fill="url(#paint1_linear_2626_2269)"
            stroke="rgba(255, 255, 255, 0.45)"
            strokeWidth="1.2"
            clipPath="url(#funnelWallClip)"
          />

          {/* Ring 3 (top ellipse border) - Cyan - Staggered entrance */}
          <path
            d="M342.472 32.8279C386.448 32.828 426.227 36.4209 454.981 42.2156C469.369 45.115 480.933 48.5527 488.871 52.3348C492.843 54.2272 495.843 56.1758 497.833 58.1356C499.821 60.093 500.711 61.9671 500.711 63.7479C500.711 65.5286 499.821 67.4027 497.833 69.3602C495.843 71.32 492.843 73.2685 488.871 75.1609C480.933 78.943 469.369 82.3817 454.981 85.2811C426.227 91.0758 386.448 94.6678 342.472 94.6678C298.496 94.6678 258.717 91.0757 229.962 85.2811C215.574 82.3817 204.009 78.9431 196.071 75.1609C192.099 73.2685 189.099 71.32 187.109 69.3602C185.122 67.4027 184.232 65.5286 184.232 63.7479C184.232 61.9671 185.122 60.093 187.109 58.1356C189.099 56.1757 192.099 54.2272 196.071 52.3348C204.009 48.5527 215.574 45.115 229.962 42.2156C258.717 36.421 298.496 32.8279 342.472 32.8279Z"
            stroke="#2BEAF9"
            strokeWidth="2.42512"
            style={{
              transform: `scale(${ring3Scale})`,
              transformOrigin: '342px 64px',
              opacity: ring3Opacity,
            }}
          />

          {/* Ring 1 (middle-upper ring) - Cyan - Staggered entrance */}
          <path
            d="M342.471 111.038C376.767 111.038 407.8 113.615 430.245 117.775C441.473 119.856 450.521 122.328 456.748 125.057C459.864 126.423 462.239 127.839 463.826 129.276C465.415 130.715 466.153 132.118 466.153 133.471C466.152 134.823 465.415 136.225 463.826 137.664C462.239 139.102 459.864 140.517 456.748 141.883C450.521 144.612 441.473 147.084 430.245 149.165C407.8 153.325 376.767 155.902 342.471 155.902C308.176 155.902 277.143 153.325 254.698 149.165C243.47 147.084 234.422 144.612 228.195 141.883C225.079 140.517 222.703 139.102 221.115 137.664C219.527 136.225 218.79 134.823 218.79 133.471C218.79 132.118 219.527 130.715 221.115 129.276C222.703 127.838 225.079 126.423 228.195 125.057C234.422 122.328 243.47 119.856 254.698 117.775C277.143 113.615 308.176 111.038 342.471 111.038Z"
            stroke="#2BEAF9"
            strokeWidth="1.21256"
            style={{
              transform: `scale(${ring1Scale})`,
              transformOrigin: '342px 133px',
              opacity: ring1Opacity,
            }}
          />

          {/* Ring 2 (middle-lower ring) - Cyan - Staggered entrance */}
          <path
            d="M342.471 186.217C367.053 186.217 389.29 188.318 405.366 191.708C413.409 193.404 419.878 195.416 424.321 197.632C426.543 198.74 428.228 199.883 429.349 201.039C430.468 202.192 430.989 203.316 430.989 204.405C430.989 205.494 430.468 206.617 429.349 207.77C428.228 208.926 426.543 210.07 424.321 211.179C419.878 213.394 413.409 215.405 405.366 217.101C389.29 220.492 367.053 222.594 342.471 222.594C317.89 222.594 295.653 220.492 279.577 217.101C271.534 215.405 265.066 213.394 260.623 211.179C258.4 210.07 256.716 208.926 255.594 207.77C254.475 206.617 253.955 205.494 253.955 204.405C253.955 203.316 254.475 202.192 255.594 201.039C256.716 199.883 258.4 198.74 260.623 197.632C265.066 195.416 271.534 193.404 279.577 191.708C295.653 188.318 317.89 186.217 342.471 186.217Z"
            stroke="#2BEAF9"
            strokeWidth="1.21256"
            style={{
              transform: `scale(${ring2Scale})`,
              transformOrigin: '342px 204px',
              opacity: ring2Opacity,
            }}
          />

          {/* Bottom ellipse base - Red/pink - Staggered entrance */}
          <ellipse
            cx="342.471"
            cy="268.065"
            rx="59.7"
            ry="12"
            fill="none"
            stroke="#FF896B"
            strokeWidth="1.3"
            style={{
              transform: `scale(${bottomRingScale})`,
              transformOrigin: '342px 268px',
              opacity: bottomRingOpacity,
            }}
          />

          {/* 5 Connecting lines - All Cyan, with 12px margin gap to NOT touch/cross the funnel */}
          {/* Line 1: Top Right (y: 64.6151) - Starts at 513 (wall is at 501.2) */}
          <path
            d="M513 64.6151H533"
            stroke="#2BEAF9"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeDasharray="20"
            strokeDashoffset={line1Dash}
          />

          {/* Line 2: Upper Left (y: 116.615) - Starts at 197 (wall is at 208.8) */}
          <path
            d="M197 116.615H165"
            stroke="#2BEAF9"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeDasharray="32"
            strokeDashoffset={line2Dash}
          />

          {/* Line 3: Middle Right (y: 167.615) - Starts at 463 (wall is at 450.6) */}
          <path
            d="M463 167.615H501"
            stroke="#2BEAF9"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeDasharray="38"
            strokeDashoffset={line3Dash}
          />

          {/* Line 4: Lower Left (y: 230.615) - Starts at 252 (wall is at 263.7) */}
          <path
            d="M252 230.615H200"
            stroke="#2BEAF9"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeDasharray="52"
            strokeDashoffset={line4Dash}
          />

          {/* Line 5: Bottom Right (y: 271.237) - Starts at 414 (wall/base is at 402.17) */}
          <path
            d="M414 271.237H450"
            stroke="#2BEAF9"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeDasharray="36"
            strokeDashoffset={line5Dash}
          />
        </svg>

        {/* Absolute HTML Text Overlay for Labels */}
        {/* Label 1: Top Right */}
        <div
          style={{
            position: 'absolute',
            left: `${545 * scaleFactor}px`,
            top: `${64.6151 * scaleFactor}px`,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            minWidth: '400px',
            lineHeight: 1.25,
            ...label1Style,
          }}
        >
          <div>
            <span style={{ fontSize: '36px', fontWeight: 800, color: '#0A0A0A', fontFamily: "'Outfit', sans-serif" }}>
              {val1.toLocaleString()}
            </span>
            <span style={{ fontSize: '22px', fontWeight: 500, color: '#888', marginLeft: '8px' }}>
              verifications
            </span>
          </div>
          <span style={{ fontSize: '22px', fontWeight: 500, color: '#888' }}>
            requests initiated
          </span>
        </div>

        {/* Label 2: Upper Left */}
        <div
          style={{
            position: 'absolute',
            right: `${(684 - 153) * scaleFactor}px`,
            top: `${116.615 * scaleFactor}px`,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'flex-end',
            textAlign: 'right',
            minWidth: '400px',
            lineHeight: 1.25,
            ...label2Style,
          }}
        >
          <div>
            <span style={{ fontSize: '36px', fontWeight: 800, color: '#0A0A0A', fontFamily: "'Outfit', sans-serif" }}>
              {val2.toLocaleString()}
            </span>
            <span style={{ fontSize: '22px', fontWeight: 500, color: '#888', marginLeft: '8px' }}>
              verifications
            </span>
          </div>
          <span style={{ fontSize: '22px', fontWeight: 500, color: '#888' }}>
            cleared without any
          </span>
          <span style={{ fontSize: '22px', fontWeight: 500, color: '#888' }}>
            manual review
          </span>
        </div>

        {/* Label 3: Middle Right */}
        <div
          style={{
            position: 'absolute',
            left: `${513 * scaleFactor}px`,
            top: `${167.615 * scaleFactor}px`,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            minWidth: '450px',
            lineHeight: 1.25,
            ...label3Style,
          }}
        >
          <div>
            <span style={{ fontSize: '36px', fontWeight: 800, color: '#0A0A0A', fontFamily: "'Outfit', sans-serif" }}>
              {val3.toLocaleString()}
            </span>
            <span style={{ fontSize: '22px', fontWeight: 500, color: '#888', marginLeft: '8px' }}>
              verifications triggered
            </span>
          </div>
          <span style={{ fontSize: '22px', fontWeight: 500, color: '#888' }}>
            risk rules or low scores.
          </span>
        </div>

        {/* Label 4: Lower Left */}
        <div
          style={{
            position: 'absolute',
            right: `${(684 - 188) * scaleFactor}px`,
            top: `${230.615 * scaleFactor}px`,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'flex-end',
            textAlign: 'right',
            minWidth: '400px',
            lineHeight: 1.25,
            ...label4Style,
          }}
        >
          <div>
            <span style={{ fontSize: '36px', fontWeight: 800, color: '#0A0A0A', fontFamily: "'Outfit', sans-serif" }}>
              {val4.toLocaleString()}
            </span>
            <span style={{ fontSize: '22px', fontWeight: 500, color: '#888', marginLeft: '8px' }}>
              verifications sent
            </span>
          </div>
          <span style={{ fontSize: '22px', fontWeight: 500, color: '#888' }}>
            to Case Management
          </span>
        </div>

        {/* Label 5: Bottom Right */}
        <div
          style={{
            position: 'absolute',
            left: `${462 * scaleFactor}px`,
            top: `${271.237 * scaleFactor}px`,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            minWidth: '450px',
            lineHeight: 1.25,
            ...label5Style,
          }}
        >
          <div>
            <span style={{ fontSize: '36px', fontWeight: 800, color: '#0A0A0A', fontFamily: "'Outfit', sans-serif" }}>
              {val5_safe.toLocaleString()}
            </span>
            <span style={{ fontSize: '22px', fontWeight: 500, color: '#888', margin: '0 5px' }}>
              verifications
            </span>
            <span style={{ fontSize: '22px', fontWeight: 800, color: '#0A0A0A' }}>
              marked as
            </span>
          </div>
          <div>
            <span style={{ fontSize: '22px', fontWeight: 800, color: '#0A0A0A' }}>
              safe
            </span>
            <span style={{ fontSize: '22px', fontWeight: 500, color: '#888', margin: '0 5px' }}>
              &
            </span>
            <span style={{ fontSize: '36px', fontWeight: 800, color: '#0A0A0A', fontFamily: "'Outfit', sans-serif" }}>
              {val5_risk.toLocaleString()}
            </span>
            <span style={{ fontSize: '22px', fontWeight: 500, color: '#888', marginLeft: '5px' }}>
              verifications
            </span>
          </div>
          <span style={{ fontSize: '22px', fontWeight: 800, color: '#0A0A0A' }}>
            marked risk
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
