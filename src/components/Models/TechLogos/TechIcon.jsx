import { Canvas } from "@react-three/fiber";
import { Float, OrbitControls } from "@react-three/drei";
import { useMediaQuery } from "react-responsive";

import GltfModel from "../GltfModel.jsx";
import StudioEnvironment from "../StudioEnvironment.jsx";
import { emblemMap, CppEmblem } from "./TechEmblems.jsx";
import { assetUrl } from "../../../utils/assets.js";
import { useThemeTween } from "../useThemeTween.js";
import { paletteFor, techIconPalettes } from "../scenePalettes.js";

/** Direct lights for one emblem; brighter and airier in light mode, eased on change. */
const EmblemLights = ({ palette }) => {
  const ambient = useThemeTween(palette.ambient);
  const key = useThemeTween(palette.key);
  const fill = useThemeTween(palette.fill);
  const accent = useThemeTween(palette.accent);

  return (
    <>
      <ambientLight ref={ambient} />
      <directionalLight ref={key} position={[5, 5, 5]} />
      <directionalLight ref={fill} position={[-4, -2, 3]} />
      <pointLight ref={accent} position={[-3, 2, -2]} decay={2} />
    </>
  );
};

/**
 * Floating, draggable 3D emblem for a tech-stack card. Renders the
 * procedural emblem by default, or `model.glbPath` when one is configured.
 * Lighting is entirely local: direct lights plus a procedural Lightformer
 * environment for reflections (no remote HDRI). `theme` selects the light palette.
 */
const TechIcon = ({ model, theme = "dark" }) => {
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  const Emblem = emblemMap[model.emblem] ?? CppEmblem;

  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 45 }} dpr={[1, 1.5]} gl={{ antialias: true, alpha: true }}>
      <EmblemLights palette={paletteFor(techIconPalettes, theme)} />
      <StudioEnvironment resolution={256} />

      {!isMobile && <OrbitControls enableZoom={false} enablePan={false} />}

      <Float speed={2.5} rotationIntensity={0.35} floatIntensity={0.6}>
        <group scale={model.scale ?? 1} rotation={model.rotation ?? [0, 0, 0]}>
          <GltfModel url={assetUrl(model.glbPath)} fallback={<Emblem />} />
        </group>
      </Float>
    </Canvas>
  );
};

export default TechIcon;
