import { useEffect, useMemo } from "react";
import {
  Chair,
  Desk,
  DeskLamp,
  DeskMat,
  Gamepad,
  Keyboard,
  Monitor,
  Mouse,
  Mug,
  PCTower,
  Plant,
} from "../Models/DeskParts.jsx";
import { createLabelTexture, createPosterTexture } from "../Models/canvasTextures.js";

const ROOM = 7;
const WALL_HEIGHT = 5;
const WALL = 0.2;
const HALF = ROOM / 2;

// Over-bright linear colours (> 1) so the bloom pass picks up the LED strips.
const LED_VIOLET = [2.2, 0.9, 4];
const LED_CYAN = [0.8, 3, 3.6];

const SHELF_CASES = [
  { z: -2.1, color: "#2563eb", height: 0.42 },
  { z: -1.98, color: "#f472b6", height: 0.4 },
  { z: -1.86, color: "#facc15", height: 0.44 },
  { z: -1.74, color: "#22d3ee", height: 0.38 },
  { z: -1.62, color: "#a78bfa", height: 0.42 },
];

/**
 * Stylized isometric developer room: two-wall diorama with dual monitors
 * (live code + GLSL plasma), RGB keyboard, glass PC tower, lamp, chair,
 * shelf, neon sign and LED strips. Built entirely from procedural meshes.
 */
const DeveloperRoom = (props) => {
  const poster = useMemo(() => createPosterTexture(), []);
  const neon = useMemo(
    () =>
      createLabelTexture({
        text: "</>",
        color: "#e6fbff",
        glow: "#6ee7ff",
        font: "bold 200px monospace",
      }),
    [],
  );

  useEffect(
    () => () => {
      poster.dispose();
      neon.dispose();
    },
    [poster, neon],
  );

  const deskTop = 1.5;
  const deskZ = -HALF + 0.75;

  return (
    <group {...props}>
      {/* ---------------------------- Shell ---------------------------- */}
      <mesh position={[0, -0.125, 0]} receiveShadow>
        <boxGeometry args={[ROOM, 0.25, ROOM]} />
        <meshStandardMaterial color="#2a2a3d" roughness={0.8} />
      </mesh>
      {/* Floor edge LEDs */}
      <mesh position={[0, 0.005, HALF - 0.01]}>
        <boxGeometry args={[ROOM, 0.02, 0.02]} />
        <meshBasicMaterial color={LED_VIOLET} toneMapped={false} />
      </mesh>
      <mesh position={[HALF - 0.01, 0.005, 0]}>
        <boxGeometry args={[0.02, 0.02, ROOM]} />
        <meshBasicMaterial color={LED_CYAN} toneMapped={false} />
      </mesh>

      <mesh position={[-WALL / 2, WALL_HEIGHT / 2, -HALF - WALL / 2]} receiveShadow>
        <boxGeometry args={[ROOM + WALL, WALL_HEIGHT, WALL]} />
        <meshStandardMaterial color="#232334" roughness={0.85} />
      </mesh>
      <mesh position={[-HALF - WALL / 2, WALL_HEIGHT / 2, 0]} receiveShadow>
        <boxGeometry args={[WALL, WALL_HEIGHT, ROOM]} />
        <meshStandardMaterial color="#232334" roughness={0.85} />
      </mesh>

      {/* Ceiling LED strips */}
      <mesh position={[0, WALL_HEIGHT - 0.12, -HALF + 0.03]}>
        <boxGeometry args={[ROOM, 0.05, 0.05]} />
        <meshBasicMaterial color={LED_VIOLET} toneMapped={false} />
      </mesh>
      <mesh position={[-HALF + 0.03, WALL_HEIGHT - 0.12, 0]}>
        <boxGeometry args={[0.05, 0.05, ROOM]} />
        <meshBasicMaterial color={LED_CYAN} toneMapped={false} />
      </mesh>

      {/* Rug */}
      <mesh position={[-0.4, 0.01, -1.2]} receiveShadow>
        <cylinderGeometry args={[1.6, 1.6, 0.02, 64]} />
        <meshStandardMaterial color="#2d2d38" roughness={1} />
      </mesh>

      {/* --------------------------- Wall decor --------------------------- */}
      <group position={[-0.4, 3.85, -HALF + 0.02]}>
        <mesh position={[0, 0, -0.005]}>
          <boxGeometry args={[2.02, 1.16, 0.03]} />
          <meshStandardMaterial color="#0a0a0f" metalness={0.4} roughness={0.4} />
        </mesh>
        <mesh position={[0, 0, 0.012]}>
          <planeGeometry args={[1.9, 1.07]} />
          <meshStandardMaterial map={poster} emissiveMap={poster} emissive="#ffffff" emissiveIntensity={0.45} roughness={0.6} />
        </mesh>
      </group>

      <mesh position={[-HALF + 0.02, 3.35, 1.1]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[1, 0.5]} />
        <meshBasicMaterial map={neon} color={[1.8, 1.8, 1.8]} transparent toneMapped={false} depthWrite={false} />
      </mesh>
      <pointLight position={[-HALF + 0.5, 3.35, 1.1]} intensity={1.2} distance={3} decay={2} color="#6ee7ff" />

      {/* Wall shelf with game cases */}
      <group position={[-HALF + 0.22, 2.75, 0]}>
        <mesh position={[0, 0, -1.6]} castShadow receiveShadow>
          <boxGeometry args={[0.42, 0.05, 1.8]} />
          <meshStandardMaterial color="#3a2a20" roughness={0.6} />
        </mesh>
        {SHELF_CASES.map(({ z, color, height }) => (
          <mesh key={z} position={[0, 0.025 + height / 2, z]} castShadow>
            <boxGeometry args={[0.3, height, 0.08]} />
            <meshStandardMaterial color={color} roughness={0.45} />
          </mesh>
        ))}
        <mesh position={[0, 0.16, -1.0]} castShadow>
          <icosahedronGeometry args={[0.13, 0]} />
          <meshStandardMaterial color="#facc15" metalness={0.9} roughness={0.2} />
        </mesh>
      </group>

      {/* ----------------------------- Setup ----------------------------- */}
      <Desk position={[-0.4, 0, deskZ]} width={4.2} depth={1.4} height={deskTop} />

      <Monitor position={[-1.15, deskTop, deskZ - 0.3]} rotation={[0, 0.22, 0]} screen="code" seed={11} />
      <Monitor position={[0.45, deskTop, deskZ - 0.3]} rotation={[0, -0.22, 0]} screen="shader" />

      <DeskMat position={[-0.25, deskTop, deskZ + 0.3]} width={2.1} depth={0.62} />
      <Keyboard position={[-0.4, deskTop + 0.008, deskZ + 0.3]} />
      <Mouse position={[0.42, deskTop + 0.008, deskZ + 0.34]} />
      <Gamepad position={[1.3, deskTop, deskZ - 0.15]} rotation={[0, -0.5, 0]} />
      <Mug position={[1.4, deskTop, deskZ + 0.35]} />
      <DeskLamp position={[-2.2, deskTop, deskZ - 0.3]} rotation={[0, -0.45, 0]} />

      <PCTower position={[2.45, 0, deskZ - 0.05]} />
      <Chair position={[-0.35, 0, -1.4]} rotation={[0, 0.25, 0]} />
      <Plant position={[2.75, 0, -0.9]} scale={1.1} />
    </group>
  );
};

export default DeveloperRoom;
