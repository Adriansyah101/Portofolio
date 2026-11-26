import { Suspense, useCallback, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Bloom, EffectComposer, ToneMapping } from "@react-three/postprocessing";
import { ToneMappingMode } from "postprocessing";
import { useMediaQuery } from "react-responsive";

import HeroLights from "./HeroLights.jsx";
import DeveloperRoom, { ROOM_LAYOUT } from "./DeveloperRoom.jsx";
import DeveloperAvatar from "./DeveloperAvatar.jsx";
import WorkstationHotspots from "./WorkstationHotspots.jsx";
import CameraRig, { OVERVIEW } from "./CameraRig.jsx";
import GltfModel from "../Models/GltfModel.jsx";
import { Icon } from "../Icons.jsx";
import { useLocalized } from "../../context/LanguageContext.jsx";
import { heroScene, routes, ui } from "../../constants/index.js";
import { assetUrl } from "../../utils/assets.js";
import { heroPalettes, paletteFor } from "../Models/scenePalettes.js";

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

const PRESETS = [
  { id: "overview", icon: "layers" },
  { id: "desk", icon: "monitor" },
  { id: "telemetry", icon: "server" },
];

/**
 * Hero 3D workstation, kept as a quiet studio render: the procedural room (or
 * an optional `.glb`), a seated developer avatar who waves when greeted
 * (hover, click or "Wave back"), screens previewing (and opening)
 * `/journey`, `/projects` and `/notes`, a desk tablet that opens `/contact`,
 * and three camera presets. `theme` ("dark" |
 * "light") selects the room shell and lighting palette.
 */
const HeroExperience = ({ theme = "dark" }) => {
  const isTablet = useMediaQuery({ query: "(max-width: 1024px)" });
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  const palette = paletteFor(heroPalettes, theme);
  const { hero: text } = useLocalized(ui);
  const navigate = useNavigate();

  const controlsRef = useRef(null);
  const roomRef = useRef(null);
  const rigRef = useRef(null);
  const [preset, setPreset] = useState("overview");
  const [waveSignal, setWaveSignal] = useState(0);

  // Hotspot tooltip, following the pointer (the only text drawn over the scene).
  const tipRef = useRef(null);
  const [tip, setTip] = useState(null);
  const showTip = useCallback((label, x = 0, y = 0) => {
    setTip(label);
    if (label && tipRef.current) tipRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
  }, []);

  const selectPreset = (id) => {
    setPreset(id);
    rigRef.current?.goTo(id);
  };

  const onNavigate = (route) => navigate(routes[route] ?? routes.home);

  return (
    <div className="hero-scene">
      <div className="hero-canvas">
        <Canvas
          camera={{ position: OVERVIEW.position, fov: 45 }}
          dpr={[1, 1.5]}
          gl={{ antialias: true, powerPreference: "high-performance" }}
        >
          <HeroLights palette={palette} />

          {/* On phones the canvas stays non-interactive for dragging so page scrolling works. */}
          {!isMobile && (
            <OrbitControls
              ref={controlsRef}
              enablePan={false}
              enableZoom={!isTablet}
              maxDistance={20}
              minDistance={4}
              minPolarAngle={Math.PI / 5}
              maxPolarAngle={Math.PI / 2}
              target={OVERVIEW.target}
              onStart={() => {
                // A manual orbit takes over from any preset in flight.
                rigRef.current?.stop();
                setPreset(null);
              }}
            />
          )}
          <CameraRig rigRef={rigRef} controlsRef={controlsRef} roomRef={roomRef} />

          <Suspense fallback={null}>
            <SwayGroup position={[0, isMobile ? -2 : -2.6, 0]} scale={isMobile ? 0.78 : isTablet ? 0.9 : 1}>
              <group ref={roomRef} rotation={[0, -Math.PI / 4, 0]}>
                <GltfModel
                  url={assetUrl(heroScene.modelPath)}
                  scale={heroScene.scale}
                  position={heroScene.position}
                  rotation={heroScene.rotation}
                  fallback={<DeveloperRoom palette={palette} />}
                />
                <DeveloperAvatar
                  position={ROOM_LAYOUT.seat.position}
                  rotation={[0, ROOM_LAYOUT.seat.rotation[1] + Math.PI, 0]}
                  waveSignal={waveSignal}
                />
                <WorkstationHotspots text={text} onNavigate={onNavigate} onTip={showTip} />
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
      </div>

      {/* Hover tooltip for the screens and the tablet; its position is written by `showTip`. */}
      <div ref={tipRef} className="scene-anchor is-tip" aria-hidden="true">
        {tip && <span className="scene-tooltip">{tip}</span>}
      </div>

      <div className="scene-controls">
        <button type="button" className="scene-pill is-wave" onClick={() => setWaveSignal((value) => value + 1)}>
          {text.waveBack}
        </button>
        <div className="scene-presets" role="group" aria-label={text.presetsLabel}>
          {PRESETS.map(({ id, icon }) => (
            <button
              key={id}
              type="button"
              className={`scene-pill ${preset === id ? "active" : ""}`}
              aria-pressed={preset === id}
              onClick={() => selectPreset(id)}
            >
              <Icon name={icon} className="size-3.5 flex-none" />
              {text.presets[id]}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HeroExperience;
