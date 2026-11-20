import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { RoundedBox } from "@react-three/drei";
import Segment from "../Segment.jsx";
import { createLabelTexture } from "../canvasTextures.js";

/**
 * Stylized procedural emblems for the tech-stack cards. Each fits roughly
 * inside a 2.4-unit sphere so they share one camera setup.
 */

const useLabel = (options) => {
  const texture = useMemo(() => createLabelTexture(options), [options.text, options.color, options.font]);
  useEffect(() => () => texture.dispose(), [texture]);
  return texture;
};

/* --------------------------------- C / C++ -------------------------------- */

export const CppEmblem = () => {
  const label = useLabel({ text: "C++", color: "#ffffff", font: "900 190px Arial Black, Arial, sans-serif" });

  return (
    <group>
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, -0.06]}>
        <cylinderGeometry args={[1.18, 1.18, 0.3, 6]} />
        <meshStandardMaterial color="#659ad2" metalness={0.5} roughness={0.3} />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[1.05, 1.05, 0.42, 6]} />
        <meshStandardMaterial color="#00599c" metalness={0.35} roughness={0.28} />
      </mesh>
      <mesh position={[0, 0, 0.215]}>
        <planeGeometry args={[1.7, 0.85]} />
        <meshBasicMaterial map={label} transparent toneMapped={false} depthWrite={false} />
      </mesh>
      <mesh position={[0, 0, -0.215]} rotation={[0, Math.PI, 0]}>
        <planeGeometry args={[1.7, 0.85]} />
        <meshBasicMaterial map={label} transparent toneMapped={false} depthWrite={false} />
      </mesh>
    </group>
  );
};

/* ------------------------------ OpenGL / GLSL ----------------------------- */

export const OpenGLEmblem = () => {
  const ringRef = useRef(null);

  useFrame((_, delta) => {
    if (ringRef.current) ringRef.current.rotation.z += delta * 0.6;
  });

  return (
    <group>
      <mesh>
        <torusKnotGeometry args={[0.62, 0.21, 200, 28, 2, 3]} />
        <meshPhysicalMaterial
          color="#5aa6c8"
          metalness={0.55}
          roughness={0.18}
          clearcoat={1}
          clearcoatRoughness={0.1}
          iridescence={1}
          iridescenceIOR={1.6}
          iridescenceThicknessRange={[200, 800]}
        />
      </mesh>
      <group ref={ringRef} rotation={[1.1, 0.3, 0]}>
        <mesh>
          <torusGeometry args={[1.15, 0.02, 12, 96]} />
          <meshStandardMaterial color="#a78bfa" emissive="#a78bfa" emissiveIntensity={1.4} />
        </mesh>
        <mesh position={[1.15, 0, 0]}>
          <sphereGeometry args={[0.07, 16, 16]} />
          <meshStandardMaterial color="#6ee7ff" emissive="#6ee7ff" emissiveIntensity={2} />
        </mesh>
      </group>
    </group>
  );
};

/* ---------------------------- Windows + Linux ----------------------------- */

const Penguin = (props) => (
  <group {...props}>
    <mesh position={[0, 0, 0]} castShadow>
      <capsuleGeometry args={[0.36, 0.48, 8, 24]} />
      <meshStandardMaterial color="#111116" roughness={0.45} />
    </mesh>
    <mesh position={[0, -0.08, 0.2]} scale={[0.27, 0.4, 0.2]}>
      <sphereGeometry args={[1, 24, 24]} />
      <meshStandardMaterial color="#f5f5f0" roughness={0.5} />
    </mesh>
    {[-0.12, 0.12].map((x) => (
      <group key={x} position={[x, 0.36, 0.28]}>
        <mesh>
          <sphereGeometry args={[0.075, 16, 16]} />
          <meshStandardMaterial color="#ffffff" roughness={0.3} />
        </mesh>
        <mesh position={[0, 0, 0.055]}>
          <sphereGeometry args={[0.035, 12, 12]} />
          <meshStandardMaterial color="#050505" roughness={0.2} />
        </mesh>
      </group>
    ))}
    <mesh position={[0, 0.22, 0.36]} rotation={[Math.PI / 2, 0, 0]}>
      <coneGeometry args={[0.07, 0.18, 16]} />
      <meshStandardMaterial color="#f5a524" roughness={0.4} />
    </mesh>
    {[-0.15, 0.15].map((x) => (
      <mesh key={x} position={[x, -0.6, 0.1]} scale={[0.14, 0.05, 0.2]}>
        <sphereGeometry args={[1, 16, 12]} />
        <meshStandardMaterial color="#f5a524" roughness={0.4} />
      </mesh>
    ))}
    {[-0.37, 0.37].map((x) => (
      <mesh key={x} position={[x, -0.05, 0]} rotation={[0, 0, x > 0 ? 0.25 : -0.25]} scale={[0.07, 0.36, 0.16]}>
        <sphereGeometry args={[1, 16, 12]} />
        <meshStandardMaterial color="#111116" roughness={0.45} />
      </mesh>
    ))}
  </group>
);

const WindowTiles = (props) => (
  <group {...props}>
    {[
      [-0.25, 0.25, "#38bdf8"],
      [0.25, 0.25, "#0ea5e9"],
      [-0.25, -0.25, "#0284c7"],
      [0.25, -0.25, "#0369a1"],
    ].map(([x, y, color]) => (
      <RoundedBox key={`${x}-${y}`} args={[0.46, 0.46, 0.12]} radius={0.03} smoothness={3} position={[x, y, 0]}>
        <meshStandardMaterial color={color} metalness={0.35} roughness={0.25} />
      </RoundedBox>
    ))}
  </group>
);

export const PlatformsEmblem = () => (
  <group>
    <WindowTiles position={[-0.62, 0.05, 0]} rotation={[0, 0.35, -0.05]} />
    <Penguin position={[0.68, 0, 0.05]} rotation={[0, -0.35, 0]} scale={0.95} />
  </group>
);

/* ------------------------------- Cloudflare ------------------------------- */

export const CloudflareEmblem = () => {
  const orbitRef = useRef(null);

  useFrame((_, delta) => {
    if (orbitRef.current) orbitRef.current.rotation.y += delta * 0.9;
  });

  const puffs = [
    [-0.62, -0.05, 0, 0.44],
    [-0.1, 0.22, 0, 0.6],
    [0.55, 0.0, 0, 0.48],
    [0.95, -0.18, 0, 0.3],
  ];

  return (
    <group position={[0, -0.05, 0]}>
      {/* Back layer */}
      <group position={[0.25, 0.12, -0.35]} scale={0.8}>
        {puffs.map(([x, y, z, r]) => (
          <mesh key={`b-${x}`} position={[x, y, z]}>
            <sphereGeometry args={[r, 32, 32]} />
            <meshStandardMaterial color="#faae40" roughness={0.35} />
          </mesh>
        ))}
      </group>
      {/* Front layer */}
      {puffs.map(([x, y, z, r]) => (
        <mesh key={`f-${x}`} position={[x, y, z]}>
          <sphereGeometry args={[r, 32, 32]} />
          <meshStandardMaterial color="#f38020" roughness={0.3} />
        </mesh>
      ))}
      <mesh position={[0.12, -0.3, 0]} rotation={[0, 0, Math.PI / 2]}>
        <capsuleGeometry args={[0.3, 1.5, 8, 24]} />
        <meshStandardMaterial color="#f38020" roughness={0.3} />
      </mesh>

      {/* Edge nodes orbiting the cloud */}
      <group ref={orbitRef} rotation={[0.35, 0, 0]}>
        {[0, 1, 2].map((index) => {
          const angle = (index / 3) * Math.PI * 2;
          return (
            <mesh key={index} position={[Math.cos(angle) * 1.45, 0, Math.sin(angle) * 1.45]}>
              <sphereGeometry args={[0.08, 16, 16]} />
              <meshStandardMaterial color="#ffffff" emissive="#ffd29a" emissiveIntensity={1.6} />
            </mesh>
          );
        })}
      </group>
    </group>
  );
};

/* ---------------------------------- Git ----------------------------------- */

export const GitEmblem = () => {
  const nodes = {
    base: [-0.05, -0.5, 0.17],
    tip: [-0.05, 0.5, 0.17],
    fork: [-0.05, -0.1, 0.17],
    branch: [0.42, 0.18, 0.17],
  };
  const nodeMaterial = <meshStandardMaterial color="#ffffff" roughness={0.25} metalness={0.1} />;

  return (
    <group>
      <RoundedBox args={[1.55, 1.55, 0.26]} radius={0.16} smoothness={4} rotation={[0, 0, Math.PI / 4]}>
        <meshStandardMaterial color="#f05032" metalness={0.3} roughness={0.3} />
      </RoundedBox>

      <Segment start={nodes.base} end={nodes.tip} radius={0.06}>
        {nodeMaterial}
      </Segment>
      <Segment start={nodes.fork} end={nodes.branch} radius={0.06}>
        {nodeMaterial}
      </Segment>
      {[nodes.base, nodes.tip, nodes.branch].map((position) => (
        <mesh key={position.join()} position={position}>
          <sphereGeometry args={[0.15, 24, 24]} />
          {nodeMaterial}
        </mesh>
      ))}
    </group>
  );
};

/* ------------------------------ Server rack ------------------------------- */

const STATUS_GREEN = [0.4, 2.4, 1.1];
const STATUS_CYAN = [0.6, 2.2, 2.8];

/** One rack-mount server: chassis, front vents and status LEDs. */
const ServerUnit = ({ y, row, ledsRef }) => (
  <group position={[0, y, 0]}>
    <RoundedBox args={[1.9, 0.42, 1.2]} radius={0.04} smoothness={3}>
      <meshStandardMaterial color="#1e293b" metalness={0.6} roughness={0.3} />
    </RoundedBox>
    {[-0.45, -0.25, -0.05, 0.15].map((x) => (
      <mesh key={x} position={[x, 0, 0.605]}>
        <boxGeometry args={[0.12, 0.22, 0.01]} />
        <meshStandardMaterial color="#0f172a" roughness={0.8} />
      </mesh>
    ))}
    {[0.45, 0.6, 0.75].map((x, index) => (
      <mesh
        key={x}
        ref={(node) => {
          ledsRef.current[row * 3 + index] = node;
        }}
        position={[x, 0.06, 0.61]}
      >
        <boxGeometry args={[0.07, 0.07, 0.01]} />
        <meshBasicMaterial color={index === 0 ? STATUS_CYAN : STATUS_GREEN} toneMapped={false} />
      </mesh>
    ))}
    <mesh position={[0.6, -0.09, 0.61]}>
      <boxGeometry args={[0.38, 0.03, 0.01]} />
      <meshBasicMaterial color="#38bdf8" toneMapped={false} />
    </mesh>
  </group>
);

/** Three stacked servers whose activity LEDs flicker like live traffic. */
export const ServersEmblem = () => {
  const ledsRef = useRef([]);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    ledsRef.current.forEach((led, index) => {
      // The first LED of each unit is a steady power light.
      if (led) led.visible = index % 3 === 0 || Math.sin(t * (3 + index * 0.7) + index) > -0.3;
    });
  });

  return (
    <group rotation={[0.15, -0.45, 0]}>
      {[0.5, 0, -0.5].map((y, row) => (
        <ServerUnit key={y} y={y} row={row} ledsRef={ledsRef} />
      ))}
      {/* Rack rails */}
      {[-1.0, 1.0].map((x) => (
        <mesh key={x} position={[x, 0, 0.55]}>
          <boxGeometry args={[0.08, 1.6, 0.08]} />
          <meshStandardMaterial color="#475569" metalness={0.8} roughness={0.25} />
        </mesh>
      ))}
    </group>
  );
};

/* ------------------------------ Hybrid cloud ------------------------------ */

const CLOUD_PUFFS = [
  [-0.55, 0.55, 0, 0.38],
  [-0.05, 0.78, 0, 0.5],
  [0.5, 0.58, 0, 0.4],
];

/** Cloud above an on-prem server, linked by two data lines with travelling packets. */
export const HybridCloudEmblem = () => {
  const packetsRef = useRef([]);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    packetsRef.current.forEach((packet, index) => {
      if (!packet) return;
      const progress = (t * 0.6 + index / 4) % 1;
      // Even packets travel up, odd packets travel down: traffic both ways.
      packet.position.y = index % 2 === 0 ? -0.55 + progress : 0.45 - progress;
    });
  });

  return (
    <group position={[0, 0.05, 0]} rotation={[0.1, -0.3, 0]}>
      {CLOUD_PUFFS.map(([x, y, z, r]) => (
        <mesh key={x} position={[x, y, z]}>
          <sphereGeometry args={[r, 32, 32]} />
          <meshStandardMaterial color="#7dd3fc" roughness={0.3} metalness={0.1} />
        </mesh>
      ))}
      <mesh position={[-0.02, 0.42, 0]} rotation={[0, 0, Math.PI / 2]}>
        <capsuleGeometry args={[0.26, 1.1, 8, 24]} />
        <meshStandardMaterial color="#7dd3fc" roughness={0.3} metalness={0.1} />
      </mesh>

      {[-0.25, 0.25].map((x) => (
        <mesh key={x} position={[x, -0.05, 0]}>
          <cylinderGeometry args={[0.025, 0.025, 1.0, 12]} />
          <meshStandardMaterial color="#38bdf8" emissive="#0ea5e9" emissiveIntensity={0.6} />
        </mesh>
      ))}
      {[0, 1, 2, 3].map((index) => (
        <mesh
          key={index}
          ref={(node) => {
            packetsRef.current[index] = node;
          }}
          position={[index % 2 === 0 ? -0.25 : 0.25, 0, 0]}
        >
          <sphereGeometry args={[0.06, 16, 16]} />
          <meshBasicMaterial color={STATUS_CYAN} toneMapped={false} />
        </mesh>
      ))}

      <group position={[0, -0.85, 0]}>
        <RoundedBox args={[1.5, 0.5, 0.9]} radius={0.05} smoothness={3}>
          <meshStandardMaterial color="#1e293b" metalness={0.6} roughness={0.3} />
        </RoundedBox>
        {[0.35, 0.5].map((x) => (
          <mesh key={x} position={[x, 0.05, 0.455]}>
            <boxGeometry args={[0.07, 0.07, 0.01]} />
            <meshBasicMaterial color={STATUS_GREEN} toneMapped={false} />
          </mesh>
        ))}
        <mesh position={[-0.3, 0, 0.455]}>
          <boxGeometry args={[0.6, 0.05, 0.01]} />
          <meshBasicMaterial color="#38bdf8" toneMapped={false} />
        </mesh>
      </group>
    </group>
  );
};

/* --------------------------- Barrier gate (PLC) --------------------------- */

const BOOM_LENGTH = 1.8;
const BOOM_STRIPES = 6;
const LAMP_STOP = [2.6, 0.5, 0.4];
const LAMP_GO = [0.4, 2.4, 1.1];

/** Automated barrier gate: PLC cabinet with a striped boom that lifts and lowers. */
export const GateEmblem = () => {
  const boomRef = useRef(null);
  const lampRef = useRef(null);

  useFrame(({ clock }) => {
    // Smooth ~6 s cycle: hold closed, lift, hold open, lower.
    const cycle = (Math.sin(clock.elapsedTime * 1.05) + 1) / 2;
    const lift = Math.min(1, Math.max(0, (cycle - 0.2) / 0.6));
    if (boomRef.current) boomRef.current.rotation.z = lift * (Math.PI / 3);
    if (lampRef.current) lampRef.current.color.setRGB(...(lift > 0.5 ? LAMP_GO : LAMP_STOP));
  });

  return (
    <group position={[-0.75, -0.35, 0]} rotation={[0.12, 0.35, 0]}>
      {/* Cabinet with controller display and status lamp */}
      <RoundedBox args={[0.6, 1.3, 0.5]} radius={0.05} smoothness={3} position={[0, -0.1, 0]}>
        <meshStandardMaterial color="#e2e8f0" metalness={0.3} roughness={0.35} />
      </RoundedBox>
      <mesh position={[0, 0.12, 0.255]}>
        <boxGeometry args={[0.36, 0.2, 0.01]} />
        <meshStandardMaterial color="#0f172a" roughness={0.4} />
      </mesh>
      <mesh position={[0, -0.25, 0.255]}>
        <boxGeometry args={[0.36, 0.04, 0.01]} />
        <meshBasicMaterial color="#38bdf8" toneMapped={false} />
      </mesh>
      <mesh position={[0, 0.6, 0]}>
        <sphereGeometry args={[0.09, 16, 16]} />
        <meshBasicMaterial ref={lampRef} color={LAMP_STOP} toneMapped={false} />
      </mesh>
      <mesh position={[0, -0.78, 0]}>
        <boxGeometry args={[0.8, 0.06, 0.7]} />
        <meshStandardMaterial color="#475569" metalness={0.6} roughness={0.4} />
      </mesh>

      {/* Boom arm, pivoting at the top edge of the cabinet */}
      <group ref={boomRef} position={[0.2, 0.32, 0.3]}>
        {Array.from({ length: BOOM_STRIPES }, (_, index) => {
          const segment = BOOM_LENGTH / BOOM_STRIPES;
          return (
            <mesh key={index} position={[segment * index + segment / 2, 0, 0]}>
              <boxGeometry args={[segment, 0.12, 0.08]} />
              <meshStandardMaterial color={index % 2 === 0 ? "#f8fafc" : "#ef4444"} roughness={0.4} />
            </mesh>
          );
        })}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.09, 0.09, 0.14, 20]} />
          <meshStandardMaterial color="#334155" metalness={0.7} roughness={0.3} />
        </mesh>
      </group>
    </group>
  );
};

export const emblemMap = {
  servers: ServersEmblem,
  hybrid: HybridCloudEmblem,
  gate: GateEmblem,
  cpp: CppEmblem,
  opengl: OpenGLEmblem,
  platforms: PlatformsEmblem,
  cloudflare: CloudflareEmblem,
  git: GitEmblem,
};
