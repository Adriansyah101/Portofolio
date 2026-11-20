import { Canvas } from "@react-three/fiber";
import { Float, OrbitControls } from "@react-three/drei";
import { useMediaQuery } from "react-responsive";

import GltfModel from "../GltfModel.jsx";
import StudioEnvironment from "../StudioEnvironment.jsx";
import { emblemMap, CppEmblem } from "./TechEmblems.jsx";
import { assetUrl } from "../../../utils/assets.js";

/**
 * Floating, draggable 3D emblem for a tech-stack card. Renders the
 * procedural emblem by default, or `model.glbPath` when one is configured.
 * Lighting is entirely local: direct lights plus a procedural Lightformer
 * environment for reflections (no remote HDRI).
 */
const TechIcon = ({ model }) => {
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  const Emblem = emblemMap[model.emblem] ?? CppEmblem;

  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 45 }} dpr={[1, 1.5]} gl={{ antialias: true, alpha: true }}>
      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 5, 5]} intensity={1.6} />
      <directionalLight position={[-4, -2, 3]} intensity={0.5} color="#93c5fd" />
      <pointLight position={[-3, 2, -2]} intensity={6} decay={2} color="#4cc9f0" />
      <StudioEnvironment resolution={256} />

      {!isMobile && <OrbitControls enableZoom={false} enablePan={false} />}

      <Float speed={5.5} rotationIntensity={0.5} floatIntensity={0.9}>
        <group scale={model.scale ?? 1} rotation={model.rotation ?? [0, 0, 0]}>
          <GltfModel url={assetUrl(model.glbPath)} fallback={<Emblem />} />
        </group>
      </Float>
    </Canvas>
  );
};

export default TechIcon;
