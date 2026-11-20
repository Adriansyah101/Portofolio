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
import {
  createJourneyDashboardTexture,
  createNotesScreenTexture,
  createProjectsScreenTexture,
} from "../Models/canvasTextures.js";
import { useThemeTween } from "../Models/useThemeTween.js";
import { heroPalettes } from "../Models/scenePalettes.js";

const ROOM = 7;
const WALL_HEIGHT = 5;
const WALL = 0.2;
const HALF = ROOM / 2;
const DESK_TOP = 1.5;
const DESK_Z = -HALF + 0.75;

/**
 * Where things sit in the room (room-local units, before the hero's -45° turn).
 * HeroExperience reads this to seat the developer avatar, place the clickable
 * screens and the contact tablet, and aim the camera presets, so they stay
 * aligned with the meshes below. Each screen's `route` names the page it
 * previews. `seat.rotation` swivels the chair to face the visitor.
 */
export const ROOM_LAYOUT = {
  deskTop: DESK_TOP,
  monitors: [
    { id: "projects", route: "projects", position: [-1.15, DESK_TOP, DESK_Z - 0.3], rotation: [0, 0.22, 0], width: 1.5, height: 0.85 },
    { id: "notes", route: "notes", position: [0.45, DESK_TOP, DESK_Z - 0.3], rotation: [0, -0.22, 0], width: 1.5, height: 0.85 },
  ],
  /** Centre of the wall-mounted operations dashboard. */
  dashboard: { route: "journey", position: [-0.4, 3.85, -HALF + 0.02], width: 2.02, height: 1.16 },
  /** The contact tablet on its stand, at the right end of the desk, turned toward the visitor. */
  tablet: { route: "contact", position: [1.32, DESK_TOP, DESK_Z + 0.12], rotation: [0, 0.45, 0] },
  seat: { position: [-1.05, 0, -1.0], rotation: [0, -2.35, 0] },
};

// The room shell (floor, walls, cove light, rug) takes its colours from the
// theme palette; the cove stays below the bloom threshold in both themes so
// it reads as a soft studio fixture rather than an LED strip.
const ACCENT = "#94a3b8";
const TRIM = "#71717a";

/** Muted document binders on the wall shelf. */
const BINDERS = [
  { z: -2.1, color: "#27272a", height: 0.42 },
  { z: -1.98, color: "#3f3f46", height: 0.4 },
  { z: -1.86, color: "#475569", height: 0.44 },
  { z: -1.74, color: "#52525b", height: 0.38 },
];

/** Small 8-port network switch with green link LEDs. */
const NetworkSwitch = (props) => (
  <group {...props}>
    <mesh castShadow>
      <boxGeometry args={[0.3, 0.09, 0.6]} />
      <meshStandardMaterial color="#27272a" metalness={0.6} roughness={0.35} />
    </mesh>
    {Array.from({ length: 6 }, (_, index) => (
      <mesh key={index} position={[0.151, 0.015, -0.22 + index * 0.088]}>
        <boxGeometry args={[0.002, 0.02, 0.03]} />
        <meshBasicMaterial color={index === 4 ? "#94a3b8" : "#7fa38f"} />
      </mesh>
    ))}
  </group>
);

/**
 * Minimalist systems workstation styled like a calm architectural studio
 * render: dual monitors previewing the Projects and Engineering Notes pages, a
 * wall-mounted operations dashboard previewing the Journey page, a shelf with binders and a network switch,
 * neutral surfaces with a walnut desk, and one dim cove light. Built entirely
 * from procedural meshes. `palette` is a `heroPalettes` entry.
 */
const DeveloperRoom = ({ palette = heroPalettes.dark, ...props }) => {
  const dashboard = useMemo(() => createJourneyDashboardTexture(), []);
  const projectsScreen = useMemo(() => createProjectsScreenTexture(), []);
  const notesScreen = useMemo(() => createNotesScreenTexture(), []);
  const floor = useThemeTween({ color: palette.floor });
  const wallBack = useThemeTween({ color: palette.wallBack });
  const wallSide = useThemeTween({ color: palette.wallSide });
  const cove = useThemeTween({ color: palette.cove });
  const rug = useThemeTween({ color: palette.rug });

  useEffect(
    () => () => [dashboard, projectsScreen, notesScreen].forEach((texture) => texture.dispose()),
    [dashboard, projectsScreen, notesScreen],
  );

  const deskTop = DESK_TOP;
  const deskZ = DESK_Z;
  const [projects, notes] = ROOM_LAYOUT.monitors;

  return (
    <group {...props}>
      {/* ---------------------------- Shell ---------------------------- */}
      <mesh position={[0, -0.125, 0]} receiveShadow>
        <boxGeometry args={[ROOM, 0.25, ROOM]} />
        <meshStandardMaterial ref={floor} roughness={0.85} />
      </mesh>

      <mesh position={[-WALL / 2, WALL_HEIGHT / 2, -HALF - WALL / 2]} receiveShadow>
        <boxGeometry args={[ROOM + WALL, WALL_HEIGHT, WALL]} />
        <meshStandardMaterial ref={wallBack} roughness={0.9} />
      </mesh>
      <mesh position={[-HALF - WALL / 2, WALL_HEIGHT / 2, 0]} receiveShadow>
        <boxGeometry args={[WALL, WALL_HEIGHT, ROOM]} />
        <meshStandardMaterial ref={wallSide} roughness={0.9} />
      </mesh>

      {/* Ceiling cove light (back wall only) */}
      <mesh position={[0, WALL_HEIGHT - 0.12, -HALF + 0.03]}>
        <boxGeometry args={[ROOM, 0.035, 0.035]} />
        <meshBasicMaterial ref={cove} />
      </mesh>

      {/* Rug */}
      <mesh position={[-0.4, 0.01, -1.2]} receiveShadow>
        <cylinderGeometry args={[1.6, 1.6, 0.02, 64]} />
        <meshStandardMaterial ref={rug} roughness={1} />
      </mesh>

      {/* --------------------------- Wall decor --------------------------- */}
      {/* Wall-mounted status dashboard */}
      <group position={ROOM_LAYOUT.dashboard.position}>
        <mesh position={[0, 0, -0.005]}>
          <boxGeometry args={[2.02, 1.16, 0.03]} />
          <meshStandardMaterial color="#111114" metalness={0.4} roughness={0.4} />
        </mesh>
        <mesh position={[0, 0, 0.012]}>
          <planeGeometry args={[1.9, 1.07]} />
          <meshStandardMaterial map={dashboard} emissiveMap={dashboard} emissive="#ffffff" emissiveIntensity={0.35} roughness={0.6} />
        </mesh>
      </group>

      {/* Wall shelf with binders and a network switch */}
      <group position={[-HALF + 0.22, 2.75, 0]}>
        <mesh position={[0, 0, -1.6]} castShadow receiveShadow>
          <boxGeometry args={[0.42, 0.05, 1.8]} />
          <meshStandardMaterial color="#5a4636" roughness={0.6} />
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
      <Desk position={[-0.4, 0, deskZ]} width={4.2} depth={1.4} height={deskTop} topColor="#5c4838" frameColor="#27272a" />

      <Monitor position={projects.position} rotation={projects.rotation} screenTexture={projectsScreen} accent={ACCENT} />
      <Monitor position={notes.position} rotation={notes.rotation} screenTexture={notesScreen} accent="#7c98b6" />

      <DeskMat position={[-0.25, deskTop, deskZ + 0.3]} width={2.1} depth={0.62} color="#1c1c1f" edge="#3f3f46" />
      <Keyboard position={[-0.4, deskTop + 0.008, deskZ + 0.3]} glow="#3a3d44" />
      <Mouse position={[0.42, deskTop + 0.008, deskZ + 0.34]} accent={ACCENT} />
      <Mug position={[-1.62, deskTop, deskZ + 0.36]} />
      <DeskLamp position={[-2.2, deskTop, deskZ - 0.3]} rotation={[0, -0.45, 0]} color="#f3dcc0" intensity={3.5} />

      <PCTower position={[2.45, 0, deskZ - 0.05]} accent={ACCENT} trim={TRIM} />
      {/* Swivelled round to face the visitor: the developer avatar sits here. */}
      <Chair position={ROOM_LAYOUT.seat.position} rotation={ROOM_LAYOUT.seat.rotation} color="#26262b" accent={TRIM} />
      <Plant position={[2.75, 0, -0.9]} scale={1.1} />
    </group>
  );
};

export default DeveloperRoom;
