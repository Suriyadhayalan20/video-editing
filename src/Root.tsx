import "./index.css";
import { Composition } from "remotion";
import { HiringVideo } from "./components/HiringVideo";
import { LinkedInAdsVideo } from "./components/LinkedInAdsVideo";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="AtnaAiVideo"
        component={AtnaAiVideo}
        durationInFrames={ATNA_AI_TOTAL_FRAMES}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="AtnaSaasPromo"
        component={AtnaSaasPromo}
        durationInFrames={1800}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="BrandedReferenceVideo"
        component={BrandedReferenceVideo}
        durationInFrames={2280}
        fps={30}
        width={1920}
        height={1080}
      />
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
      <Composition
        id="AboutAtnaVideo"
        component={AboutAtnaVideo}
        durationInFrames={900}
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};
