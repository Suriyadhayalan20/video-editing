import React from "react";
import { AbsoluteFill, Sequence } from "remotion";
import { AtnaBackground } from "./AtnaBackground";
import { AboutAtnaStyles } from "./about-atna/AboutAtna_Styles";

import { AboutAtna_Scene1_Intro } from "./about-atna/AboutAtna_Scene1_Intro";
import { AboutAtna_Scene2_Dashboard } from "./about-atna/AboutAtna_Scene2_Dashboard";
import { AboutAtna_Scene3_SingleLookup } from "./about-atna/AboutAtna_Scene3_SingleLookup";
import { AboutAtna_Scene4_Processing } from "./about-atna/AboutAtna_Scene4_Processing";
import { AboutAtna_Scene5_Results } from "./about-atna/AboutAtna_Scene5_Results";
import { AboutAtna_Scene6_BulkLookup } from "./about-atna/AboutAtna_Scene6_BulkLookup";
import { AboutAtna_Scene7_HighRisk } from "./about-atna/AboutAtna_Scene7_HighRisk";
import { AboutAtna_Scene8_CTA } from "./about-atna/AboutAtna_Scene8_CTA";

export const AboutAtnaVideo: React.FC = () => {
    return (
        <AbsoluteFill style={{ backgroundColor: "#07131f", overflow: "hidden", fontFamily: "Inter, Roboto, sans-serif" }}>
            {/* The base animated background from the project */}
            <AtnaBackground />
            
            {/* Dark overlay to make it fit the "Dark navy" Enterprise SaaS theme */}
            <div style={AboutAtnaStyles.overlay} />

            {/* Scene 1: Intro (0-3s -> 0-90 frames) */}
            <Sequence from={0} durationInFrames={90}>
                <AboutAtna_Scene1_Intro />
            </Sequence>

            {/* Scene 2: Dashboard (3-7s -> 90-210 frames) */}
            <Sequence from={90} durationInFrames={120}>
                <AboutAtna_Scene2_Dashboard />
            </Sequence>

            {/* Scene 3: Single Lookup (7-11s -> 210-330 frames) */}
            <Sequence from={210} durationInFrames={120}>
                <AboutAtna_Scene3_SingleLookup />
            </Sequence>

            {/* Scene 4: Processing (11-15s -> 330-450 frames) */}
            <Sequence from={330} durationInFrames={120}>
                <AboutAtna_Scene4_Processing />
            </Sequence>

            {/* Scene 5: Results (15-20s -> 450-600 frames) */}
            <Sequence from={450} durationInFrames={150}>
                <AboutAtna_Scene5_Results />
            </Sequence>

            {/* Scene 6: Bulk Lookup (20-24s -> 600-720 frames) */}
            <Sequence from={600} durationInFrames={120}>
                <AboutAtna_Scene6_BulkLookup />
            </Sequence>

            {/* Scene 7: High Risk (24-27s -> 720-810 frames) */}
            <Sequence from={720} durationInFrames={90}>
                <AboutAtna_Scene7_HighRisk />
            </Sequence>

            {/* Scene 8: CTA (27-30s -> 810-900 frames) */}
            <Sequence from={810} durationInFrames={90}>
                <AboutAtna_Scene8_CTA />
            </Sequence>
        </AbsoluteFill>
    );
};