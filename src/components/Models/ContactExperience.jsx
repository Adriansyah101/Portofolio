import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useMediaQuery } from "react-responsive";

import GltfModel from "./GltfModel.jsx";
import DeveloperAvatar from "../HeroModels/DeveloperAvatar.jsx";
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
import { contactScene, ui } from "../../constants/index.js";
import { useLocalized } from "../../context/LanguageContext.jsx";
import { assetUrl } from "../../utils/assets.js";
import { useThemeTween } from "./useThemeTween.js";
import { contactPalettes, paletteFor } from "./scenePalettes.js";

const FLOOR_Y = -1.5;

/**
 * Where the developer sits (desk-local): at the front-left corner, turned
 * toward the room so the visitor sees a three-quarter view, with the monitor
 * `screenYaw` radians to his left. The chair rides inside the avatar so it
 * swivels with him; it faces the opposite way to the figure.
 */
const SEAT = { position: [-0.95, 0, 1.05], rotation: [0, 1.87, 0], screenYaw: 0.67 };

/** Quiet single-monitor workstation: walnut desk, neutral studio light. */
const ContactDesk = () => (
  <group>
    <Desk width={3.2} depth={1.3} topColor="#6b5442" frameColor="#27272a" />
    <Monitor position={[0, 1.5, -0.32]} width={1.7} height={0.95} screen="terminal" accent="#a8a29e" glowLight={false} />
    <DeskMat position={[0, 1.5, 0.27]} width={1.9} depth={0.58} color="#232220" edge="#57534e" />
    <Keyboard position={[-0.15, 1.508, 0.27]} glow="#4a4640" />
    <Mouse position={[0.68, 1.508, 0.3]} accent="#a8a29e" />
    <DeskLamp position={[-1.3, 1.5, -0.3]} rotation={[0, -0.35, 0]} intensity={4} color="#f3dcc0" castShadow />
    <Mug position={[1.25, 1.5, 0.22]} color="#e7e5e4" />
    <Plant position={[1.25, 1.5, -0.35]} scale={0.42} potColor="#d6d3d1" />
    <PCTower position={[2.0, 0, -0.15]} rotation={[0, -0.25, 0]} accent="#a8a29e" trim="#78716c" />
  </group>
);

/**
 * Fog, floor and studio lights, eased toward the theme palette. The fog
 * colour (`palette.stage`) matches the `.contact-canvas` background, which
 * fades with a CSS transition at the same pace.
 */
const Studio = ({ palette }) => {
  const fog = useThemeTween({ color: palette.stage });
  const floor = useThemeTween({ color: palette.floor });
  const ambient = useThemeTween(palette.ambient);
  const key = useThemeTween(palette.key);
  const fill = useThemeTween(palette.fill);
  const hemisphere = useThemeTween(palette.hemisphere);

  return (
    <>
      <fog ref={fog} attach="fog" args={["#000000", 9, 22]} />

      <ambientLight ref={ambient} />
      <directionalLight
        ref={key}
        position={[5, 6, 3]}
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
      <directionalLight ref={fill} position={[-5, 4, 5]} />
      <hemisphereLight ref={hemisphere} />

      {/* Shadow-receiving floor */}
      <mesh position={[0, FLOOR_Y, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[40, 40]} />
        <meshStandardMaterial ref={floor} roughness={0.95} />
      </mesh>
    </>
  );
};

/**
 * Contact desk with the seated developer avatar, who waves on load, when
 * hovered or clicked, and whenever `waveSignal` increments (the visitor
 * reaches for one of the Gmail options). No text is drawn over the scene.
 * `theme` ("dark" | "light") selects the studio palette.
 */
const ContactExperience = ({ theme = "dark", waveSignal = 0 }) => {
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  const { contact: text } = useLocalized(ui);

  return (
    // `flat` disables tone mapping so the fog and floor match the CSS panel colour exactly.
    <Canvas shadows flat camera={{ position: [0, 3, 7], fov: 45 }} dpr={[1, 1.5]} aria-label={text.sceneLabel}>
      <Studio palette={paletteFor(contactPalettes, theme)} />

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
          <DeveloperAvatar
            position={SEAT.position}
            rotation={SEAT.rotation}
            screenYaw={SEAT.screenYaw}
            waveSignal={waveSignal}
          >
            <Chair rotation={[0, Math.PI, 0]} color="#2f2d2a" accent="#57534e" />
          </DeveloperAvatar>
        </group>
      </Suspense>
    </Canvas>
  );
};

export default ContactExperience;
