"use client";

import dynamic from "next/dynamic";
import { useBackground } from "@/providers/BackgroundProvider";

const NeuralParticles = dynamic(() => import("./NeuralParticles"), { ssr: false });
const AuroraWaves = dynamic(() => import("./AuroraWaves"), { ssr: false });
const Constellation = dynamic(() => import("./Constellation"), { ssr: false });
const MorphingMesh = dynamic(() => import("./MorphingMesh"), { ssr: false });
const FloatingOrbs = dynamic(() => import("./FloatingOrbs"), { ssr: false });
const MatrixRain = dynamic(() => import("./MatrixRain"), { ssr: false });
const SwirlParticles = dynamic(() => import("./SwirlParticles"), { ssr: false });

export default function BackgroundRenderer() {
  const { config, accentRgb } = useBackground();

  const props = { accentRgb };

  switch (config.style) {
    case "neural":
      return (
        <NeuralParticles
          count={config.neural.count}
          connectionDist={config.neural.connectionDist}
          speed={config.neural.speed}
          nodeOpacity={config.neural.nodeOpacity}
          connectOpacity={config.neural.connectOpacity}
          cursorInteract={config.neural.cursorInteract}
          clickBurst={config.neural.clickBurst}
          accentRgb={accentRgb}
        />
      );
    case "aurora":
      return (
        <AuroraWaves
          waveCount={config.aurora.waveCount}
          speed={config.aurora.speed}
          height={config.aurora.height}
          opacity={config.aurora.opacity}
          blendColor={config.aurora.blendColor}
          accentRgb={accentRgb}
        />
      );
    case "constellation":
      return (
        <Constellation
          starCount={config.constellation.starCount}
          twinkleSpeed={config.constellation.twinkleSpeed}
          connectDist={config.constellation.connectDist}
          shootingStars={config.constellation.shootingStars}
          starOpacity={config.constellation.starOpacity}
          accentRgb={accentRgb}
        />
      );
    case "mesh":
      return (
        <MorphingMesh
          resolution={config.mesh.resolution}
          speed={config.mesh.speed}
          amplitude={config.mesh.amplitude}
          opacity={config.mesh.opacity}
          accentRgb={accentRgb}
        />
      );
    case "orbs":
      return (
        <FloatingOrbs
          orbCount={config.orbs.orbCount}
          maxSize={config.orbs.maxSize}
          speed={config.orbs.speed}
          opacity={config.orbs.opacity}
          accentRgb={accentRgb}
        />
      );
    case "rain":
      return (
        <MatrixRain
          density={config.rain.density}
          speed={config.rain.speed}
          charSize={config.rain.charSize}
          opacity={config.rain.opacity}
          accentRgb={accentRgb}
        />
      );
    case "swirl":
      return (
        <SwirlParticles
          density={config.swirl.density}
          speed={config.swirl.speed}
          particleSize={config.swirl.particleSize}
          opacity={config.swirl.opacity}
          accentRgb={accentRgb}
        />
      );
    default:
      return null;
  }
}