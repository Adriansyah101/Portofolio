import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useMediaQuery } from "react-responsive";

import GltfModel from "./GltfModel.jsx";
import {
  Chair,
  Desk,
  DeskLamp,
  DeskMat,
  Keyboard,
  Monitor,
  Mouse,
  Mug,
  PCTower,
  Plant,
} from "./DeskParts.jsx";
import { contactScene } from "../../constants/index.js";
import { assetUrl } from "../../utils/assets.js";

const WARM_BACKGROUND = "#cd7c2e";
const FLOOR_Y = -1.5;

/** Warm, cosy single-monitor workstation. */
const ContactDesk = () => (
  <group>
    <Desk width={3.2} depth={1.3} topColor="#8a5a33" frameColor="#2b2118" />
    <Monitor position={[0, 1.5, -0.32]} width={1.7} height={0.95} screen="code" seed={23} glowLight={false} />
    <DeskMat position={[0, 1.5, 0.27]} width={1.9} depth={0.58} color="#2a1d14" edge="#ffb36b" />
    <Keyboard position={[-0.15, 1.508, 0.27]} />
    <Mouse position={[0.68, 1.508, 0.3]} accent="#ffb36b" />
    <DeskLamp position={[-1.3, 1.5, -0.3]} rotation={[0, -0.35, 0]} intensity={5} color="#ffcf8f" castShadow />
    <Mug position={[1.25, 1.5, 0.22]} color="#f3efe6" />
    <Plant position={[1.25, 1.5, -0.35]} scale={0.42} potColor="#efe7da" />
    <PCTower position={[2.0, 0, -0.15]} rotation={[0, -0.25, 0]} accent="#ffb36b" />
    <Chair position={[-0.85, 0, 1.25]} rotation={[0, 0.7, 0]} color="#3a2a22" accent="#ffb36b" />
  </group>
);

const ContactExperience = () => {
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  return (
    // `flat` disables tone mapping so the fog and floor match the CSS panel colour exactly.
    <Canvas shadows flat camera={{ position: [0, 3, 7], fov: 45 }} dpr={[1, 1.75]}>
      <fog attach="fog" args={[WARM_BACKGROUND, 9, 22]} />

      <ambientLight intensity={0.55} color="#fff4e6" />
      <directionalLight
        position={[5, 6, 3]}
        intensity={2.4}
        color="#ffd9b3"
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-bias={-0.0005}
        shadow-camera-left={-6}
        shadow-camera-right={6}
        shadow-camera-top={6}
        shadow-camera-bottom={-6}
        shadow-camera-near={0.5}
        shadow-camera-far={25}
      />
      <directionalLight position={[-5, 4, 5]} intensity={0.8} color="#ffb070" />
      <hemisphereLight args={["#ffe3c2", "#7a4a1f", 0.35]} />

      {!isMobile && (
        <OrbitControls
          enablePan={false}
          enableZoom={false}
          minPolarAngle={Math.PI / 5}
          maxPolarAngle={Math.PI / 2}
          minAzimuthAngle={-Math.PI / 3}
          maxAzimuthAngle={Math.PI / 3}
        />
      )}

      {/* Shadow-receiving floor */}
      <mesh position={[0, FLOOR_Y, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[40, 40]} />
        <meshStandardMaterial color="#a46b2d" roughness={0.95} />
      </mesh>

      <Suspense fallback={null}>
        <group position={[0, FLOOR_Y, 0]} rotation={[0, -0.45, 0]} scale={isMobile ? 0.85 : 1}>
          <GltfModel
            url={assetUrl(contactScene.modelPath)}
            scale={contactScene.scale}
            position={contactScene.position}
            rotation={contactScene.rotation}
            shadows
            fallback={<ContactDesk />}
          />
        </group>
      </Suspense>
    </Canvas>
  );
};

export default ContactExperience;
