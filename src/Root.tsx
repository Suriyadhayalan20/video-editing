import "./index.css";
import { Composition } from "remotion";
import { CyberSecurityVideo } from "./components/CyberSecurityVideo";
import { HiringVideo } from "./components/HiringVideo";
import { LinkedInAdsVideo } from "./components/LinkedInAdsVideo";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="HiringVideo"
        component={HiringVideo}
        durationInFrames={1800}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="LinkedInAdsVideo"
        component={LinkedInAdsVideo}
        durationInFrames={658}
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};
