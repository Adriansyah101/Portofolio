import { useEffect, useMemo } from "react";
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
} from "../Models/DeskParts.jsx";
import { createDashboardTexture } from "../Models/canvasTextures.js";

const ROOM = 7;
const WALL_HEIGHT = 5;
const WALL = 0.2;
const HALF = ROOM / 2;

// Soft, slightly over-bright cool white so the bloom pass picks up the strips
// without the room reading as a neon gaming setup.
const LED_COOL = [0.5, 0.85, 1.25];
const ACCENT = "#6ee7ff";
const TRIM = "#38bdf8";

/** Muted document binders on the wall shelf. */
const BINDERS = [
  { z: -2.1, color: "#1e293b", height: 0.42 },
  { z: -1.98, color: "#334155", height: 0.4 },
  { z: -1.86, color: "#0e4c92", height: 0.44 },
  { z: -1.74, color: "#475569", height: 0.38 },
];

/** Small 8-port network switch with green link LEDs. */
const NetworkSwitch = (props) => (
  <group {...props}>
    <mesh castShadow>
      <boxGeometry args={[0.3, 0.09, 0.6]} />
      <meshStandardMaterial color="#1e293b" metalness={0.6} roughness={0.35} />
    </mesh>
    {Array.from({ length: 6 }, (_, index) => (
      <mesh key={index} position={[0.151, 0.015, -0.22 + index * 0.088]}>
        <boxGeometry args={[0.002, 0.02, 0.03]} />
        <meshBasicMaterial color={index === 4 ? [0.6, 2.2, 2.8] : [0.4, 2.4, 1.1]} toneMapped={false} />
      </mesh>
    ))}
  </group>
);

/**
 * Minimalist dark-mode systems workstation: dual monitors (ops terminal and a
 * live GLSL telemetry view), a wall-mounted status dashboard, a shelf with
 * binders and a network switch, and soft cool LED strips. Built entirely from
 * procedural meshes.
 */
const DeveloperRoom = (props) => {
  const dashboard = useMemo(() => createDashboardTexture(), []);

  useEffect(() => () => dashboard.dispose(), [dashboard]);

  const deskTop = 1.5;
  const deskZ = -HALF + 0.75;

  return (
    <group {...props}>
      {/* ---------------------------- Shell ---------------------------- */}
      <mesh position={[0, -0.125, 0]} receiveShadow>
        <boxGeometry args={[ROOM, 0.25, ROOM]} />
        <meshStandardMaterial color="#1f2533" roughness={0.8} />
      </mesh>
      {/* Floor edge LEDs */}
      <mesh position={[0, 0.005, HALF - 0.01]}>
        <boxGeometry args={[ROOM, 0.02, 0.02]} />
        <meshBasicMaterial color={LED_COOL} toneMapped={false} />
      </mesh>
      <mesh position={[HALF - 0.01, 0.005, 0]}>
        <boxGeometry args={[0.02, 0.02, ROOM]} />
        <meshBasicMaterial color={LED_COOL} toneMapped={false} />
      </mesh>

      <mesh position={[-WALL / 2, WALL_HEIGHT / 2, -HALF - WALL / 2]} receiveShadow>
        <boxGeometry args={[ROOM + WALL, WALL_HEIGHT, WALL]} />
        <meshStandardMaterial color="#1c2230" roughness={0.85} />
      </mesh>
      <mesh position={[-HALF - WALL / 2, WALL_HEIGHT / 2, 0]} receiveShadow>
        <boxGeometry args={[WALL, WALL_HEIGHT, ROOM]} />
        <meshStandardMaterial color="#1c2230" roughness={0.85} />
      </mesh>

      {/* Ceiling LED strips */}
      <mesh position={[0, WALL_HEIGHT - 0.12, -HALF + 0.03]}>
        <boxGeometry args={[ROOM, 0.05, 0.05]} />
        <meshBasicMaterial color={LED_COOL} toneMapped={false} />
      </mesh>
      <mesh position={[-HALF + 0.03, WALL_HEIGHT - 0.12, 0]}>
        <boxGeometry args={[0.05, 0.05, ROOM]} />
        <meshBasicMaterial color={LED_COOL} toneMapped={false} />
      </mesh>

      {/* Rug */}
      <mesh position={[-0.4, 0.01, -1.2]} receiveShadow>
        <cylinderGeometry args={[1.6, 1.6, 0.02, 64]} />
        <meshStandardMaterial color="#262b36" roughness={1} />
      </mesh>

      {/* --------------------------- Wall decor --------------------------- */}
      {/* Wall-mounted status dashboard */}
      <group position={[-0.4, 3.85, -HALF + 0.02]}>
        <mesh position={[0, 0, -0.005]}>
          <boxGeometry args={[2.02, 1.16, 0.03]} />
          <meshStandardMaterial color="#0a0a0f" metalness={0.4} roughness={0.4} />
        </mesh>
        <mesh position={[0, 0, 0.012]}>
          <planeGeometry args={[1.9, 1.07]} />
          <meshStandardMaterial map={dashboard} emissiveMap={dashboard} emissive="#ffffff" emissiveIntensity={0.5} roughness={0.6} />
        </mesh>
      </group>

      {/* Wall shelf with binders and a network switch */}
      <group position={[-HALF + 0.22, 2.75, 0]}>
        <mesh position={[0, 0, -1.6]} castShadow receiveShadow>
          <boxGeometry args={[0.42, 0.05, 1.8]} />
          <meshStandardMaterial color="#2a2f3a" roughness={0.6} />
        </mesh>
        {BINDERS.map(({ z, color, height }) => (
          <mesh key={z} position={[0, 0.025 + height / 2, z]} castShadow>
            <boxGeometry args={[0.3, height, 0.08]} />
            <meshStandardMaterial color={color} roughness={0.55} />
          </mesh>
        ))}
        <NetworkSwitch position={[0, 0.07, -1.05]} />
      </group>

      {/* ----------------------------- Setup ----------------------------- */}
      <Desk position={[-0.4, 0, deskZ]} width={4.2} depth={1.4} height={deskTop} topColor="#2b2f38" />

      <Monitor position={[-1.15, deskTop, deskZ - 0.3]} rotation={[0, 0.22, 0]} screen="terminal" />
      <Monitor position={[0.45, deskTop, deskZ - 0.3]} rotation={[0, -0.22, 0]} screen="telemetry" />

      <DeskMat position={[-0.25, deskTop, deskZ + 0.3]} width={2.1} depth={0.62} edge={TRIM} />
      <Keyboard position={[-0.4, deskTop + 0.008, deskZ + 0.3]} glow="#1e6fa8" />
      <Mouse position={[0.42, deskTop + 0.008, deskZ + 0.34]} accent={ACCENT} />
      <Mug position={[1.4, deskTop, deskZ + 0.35]} />
      <DeskLamp position={[-2.2, deskTop, deskZ - 0.3]} rotation={[0, -0.45, 0]} color="#f1f5f9" />

      <PCTower position={[2.45, 0, deskZ - 0.05]} accent={ACCENT} trim={TRIM} />
      <Chair position={[-0.35, 0, -1.4]} rotation={[0, 0.25, 0]} accent={TRIM} />
      <Plant position={[2.75, 0, -0.9]} scale={1.1} />
    </group>
  );
};

export default DeveloperRoom;
