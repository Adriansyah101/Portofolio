import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Bloom, EffectComposer, ToneMapping } from "@react-three/postprocessing";
import { ToneMappingMode } from "postprocessing";
import { useMediaQuery } from "react-responsive";

import HeroLights from "./HeroLights.jsx";
import Particles from "./Particles.jsx";
import DeveloperRoom from "./DeveloperRoom.jsx";
import GltfModel from "../Models/GltfModel.jsx";
import { heroScene } from "../../constants/index.js";
import { assetUrl } from "../../utils/assets.js";

/** Gentle idle sway so the diorama feels alive even without interaction. */
const SwayGroup = ({ children, ...props }) => {
  const groupRef = useRef(null);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = Math.sin(clock.elapsedTime * 0.25) * 0.06;
  });

  return (
    <group ref={groupRef} {...props}>
      {children}
    </group>
  );
};

const HeroExperience = () => {
  const isTablet = useMediaQuery({ query: "(max-width: 1024px)" });
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  return (
    <Canvas
      camera={{ position: [0, 5.5, 13], fov: 45 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, powerPreference: "high-performance" }}
    >
      <HeroLights />
      <Particles count={isMobile ? 18 : 36} />

      {/* On phones the canvas stays non-interactive so page scrolling works. */}
      {!isMobile && (
        <OrbitControls
          enablePan={false}
          enableZoom={!isTablet}
          maxDistance={20}
          minDistance={7}
          minPolarAngle={Math.PI / 5}
          maxPolarAngle={Math.PI / 2}
          target={[0, 0, 0]}
        />
      )}

      <Suspense fallback={null}>
        <SwayGroup position={[0, isMobile ? -2 : -2.6, 0]} scale={isMobile ? 0.78 : isTablet ? 0.9 : 1}>
          <group rotation={[0, -Math.PI / 4, 0]}>
            <GltfModel
              url={assetUrl(heroScene.modelPath)}
              scale={heroScene.scale}
              position={heroScene.position}
              rotation={heroScene.rotation}
              fallback={<DeveloperRoom />}
            />
          </group>
        </SwayGroup>
      </Suspense>

      {!isMobile && (
        <EffectComposer multisampling={4}>
          <Bloom intensity={0.25} luminanceThreshold={0.95} luminanceSmoothing={0.2} mipmapBlur />
          <ToneMapping mode={ToneMappingMode.ACES_FILMIC} />
        </EffectComposer>
      )}
    </Canvas>
  );
};

export default HeroExperience;
