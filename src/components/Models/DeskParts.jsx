import { useEffect, useLayoutEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { RoundedBox } from "@react-three/drei";
import * as THREE from "three";
import Segment from "./Segment.jsx";
import { createCodeTexture, createTerminalTexture } from "./canvasTextures.js";

/**
 * Procedural developer-setup building blocks shared by the hero room and the
 * contact desk. Units: 1 unit ≈ 0.5 m. Every component's origin sits on the
 * surface it rests on (floor or desktop).
 */

const METAL = { metalness: 0.7, roughness: 0.32 };

/* -------------------------------------------------------------------------- */
/*                                    Desk                                    */
/* -------------------------------------------------------------------------- */

export const Desk = ({
  width = 4.2,
  depth = 1.4,
  height = 1.5,
  topColor = "#3a2a20",
  frameColor = "#16161c",
  ...props
}) => {
  const legX = width / 2 - 0.14;
  const legZ = depth / 2 - 0.14;
  const legHeight = height - 0.08;

  return (
    <group {...props}>
      <RoundedBox
        args={[width, 0.08, depth]}
        radius={0.02}
        smoothness={3}
        position={[0, height - 0.04, 0]}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial color={topColor} roughness={0.55} metalness={0.08} />
      </RoundedBox>

      {[
        [-legX, -legZ],
        [legX, -legZ],
        [-legX, legZ],
        [legX, legZ],
      ].map(([x, z]) => (
        <mesh key={`${x}-${z}`} position={[x, legHeight / 2, z]} castShadow>
          <boxGeometry args={[0.08, legHeight, 0.08]} />
          <meshStandardMaterial color={frameColor} {...METAL} />
        </mesh>
      ))}

      {/* Rear cross-bar and side rails */}
      <mesh position={[0, 0.4, -legZ]} castShadow>
        <boxGeometry args={[width - 0.28, 0.06, 0.04]} />
        <meshStandardMaterial color={frameColor} {...METAL} />
      </mesh>
      {[-legX, legX].map((x) => (
        <mesh key={x} position={[x, height - 0.14, 0]} castShadow>
          <boxGeometry args={[0.05, 0.08, depth - 0.28]} />
          <meshStandardMaterial color={frameColor} {...METAL} />
        </mesh>
      ))}
    </group>
  );
};

/* -------------------------------------------------------------------------- */
/*                                  Screens                                   */
/* -------------------------------------------------------------------------- */

/** Scrolling canvas screen: an IDE (`variant="code"`) or an ops shell (`"terminal"`). */
const CodeScreen = ({ width, height, seed, accent, variant = "code" }) => {
  const texture = useMemo(
    () => (variant === "terminal" ? createTerminalTexture({ accent }) : createCodeTexture({ seed, accent })),
    [variant, seed, accent],
  );

  useEffect(() => () => texture.dispose(), [texture]);

  useFrame((_, delta) => {
    texture.offset.y = (texture.offset.y + delta * 0.02) % 1;
  });

  return (
    <mesh>
      <planeGeometry args={[width, height]} />
      <meshBasicMaterial map={texture} toneMapped={false} />
    </mesh>
  );
};

const screenVertex = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

// Calm system-telemetry view: a fine grid, two live metric curves and a
// slowly rotating hexagon outline. Low saturation, no scanlines.
const telemetryFragment = /* glsl */ `
  uniform float uTime;
  varying vec2 vUv;

  float lineMask(float distance, float width) {
    return smoothstep(width, 0.0, abs(distance));
  }

  float hexagon(vec2 p, float radius) {
    p = abs(p);
    return max(dot(p, normalize(vec2(1.0, 1.732))), p.x) - radius;
  }

  void main() {
    vec2 uv = vUv;
    vec3 color = mix(vec3(0.016, 0.03, 0.07), vec3(0.03, 0.07, 0.13), uv.y);

    vec2 cell = abs(fract(uv * vec2(14.0, 8.0)) - 0.5);
    color += smoothstep(0.47, 0.5, max(cell.x, cell.y)) * vec3(0.03, 0.08, 0.12);

    float x = uv.x * 6.2831 + uTime * 0.45;
    float primary = 0.6 + 0.09 * sin(x) + 0.03 * sin(x * 2.7 + 1.3);
    float secondary = 0.3 + 0.05 * sin(x * 0.8 + 2.0) + 0.02 * sin(x * 3.1);
    color += smoothstep(0.0, primary, uv.y) * step(uv.y, primary) * 0.05 * vec3(0.43, 0.9, 1.0);
    color += lineMask(uv.y - primary, 0.007) * vec3(0.43, 0.9, 1.0) * 0.9;
    color += lineMask(uv.y - secondary, 0.006) * vec3(0.22, 0.74, 0.97) * 0.7;

    vec2 p = (uv - vec2(0.84, 0.8)) * vec2(1.75, 1.0);
    float angle = uTime * 0.2;
    p = mat2(cos(angle), -sin(angle), sin(angle), cos(angle)) * p;
    color += lineMask(hexagon(p, 0.09), 0.004) * vec3(0.43, 0.9, 1.0) * 0.6;

    float vignette = smoothstep(1.05, 0.35, length(uv - 0.5));
    gl_FragColor = vec4(color * mix(0.8, 1.0, vignette), 1.0);
  }
`;

/** Live GLSL telemetry view: a real fragment shader running on the second monitor. */
const TelemetryScreen = ({ width, height }) => {
  const uniforms = useMemo(() => ({ uTime: { value: 0 } }), []);

  useFrame((_, delta) => {
    uniforms.uTime.value += delta;
  });

  return (
    <mesh>
      <planeGeometry args={[width, height]} />
      <shaderMaterial
        uniforms={uniforms}
        vertexShader={screenVertex}
        fragmentShader={telemetryFragment}
        toneMapped={false}
      />
    </mesh>
  );
};

export const Monitor = ({
  width = 1.5,
  height = 0.85,
  screen = "code",
  seed = 7,
  glowLight = true,
  ...props
}) => {
  const screenY = 0.55 + height / 2;
  const accent = screen === "telemetry" ? "#38bdf8" : "#6ee7ff";

  return (
    <group {...props}>
      {/* Stand */}
      <mesh position={[0, 0.015, -0.02]} castShadow receiveShadow>
        <boxGeometry args={[0.5, 0.03, 0.3]} />
        <meshStandardMaterial color="#1a1a20" {...METAL} />
      </mesh>
      <mesh position={[0, 0.3, -0.11]} castShadow>
        <boxGeometry args={[0.07, 0.56, 0.04]} />
        <meshStandardMaterial color="#1a1a20" {...METAL} />
      </mesh>

      {/* Housing */}
      <RoundedBox args={[width, height, 0.05]} radius={0.015} smoothness={3} position={[0, screenY, -0.06]} castShadow>
        <meshStandardMaterial color="#0c0c11" metalness={0.5} roughness={0.35} />
      </RoundedBox>

      {/* Bottom bezel accent */}
      <mesh position={[0, screenY - height / 2 + 0.012, -0.033]}>
        <boxGeometry args={[0.12, 0.006, 0.002]} />
        <meshBasicMaterial color={accent} toneMapped={false} />
      </mesh>

      {/* Display */}
      <group position={[0, screenY + 0.01, -0.034]}>
        {screen === "telemetry" ? (
          <TelemetryScreen width={width - 0.06} height={height - 0.08} />
        ) : (
          <CodeScreen width={width - 0.06} height={height - 0.08} seed={seed} accent={accent} variant={screen} />
        )}
      </group>

      {glowLight && (
        <pointLight position={[0, screenY, 0.45]} intensity={0.9} distance={3} decay={2} color={accent} />
      )}
    </group>
  );
};

/* -------------------------------------------------------------------------- */
/*                                 Peripherals                                */
/* -------------------------------------------------------------------------- */

const KEY_COLS = 15;
const KEY_ROWS = 5;
const KEY_PITCH = 0.07;
const KEY_COUNT = KEY_COLS * KEY_ROWS;

/**
 * Mechanical keyboard with per-key underglow: an animated RGB wave by default,
 * or one steady colour when `glow` is set.
 */
export const Keyboard = ({ glow = null, ...props }) => {
  const rgb = !glow;
  const capsRef = useRef(null);
  const glowRef = useRef(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const color = useMemo(() => new THREE.Color(), []);

  useLayoutEffect(() => {
    let index = 0;
    for (let row = 0; row < KEY_ROWS; row += 1) {
      for (let col = 0; col < KEY_COLS; col += 1) {
        const x = (col - (KEY_COLS - 1) / 2) * KEY_PITCH;
        const z = (row - (KEY_ROWS - 1) / 2) * KEY_PITCH;

        dummy.position.set(x, 0.065, z);
        dummy.updateMatrix();
        capsRef.current.setMatrixAt(index, dummy.matrix);

        dummy.position.set(x, 0.05, z);
        dummy.updateMatrix();
        glowRef.current.setMatrixAt(index, dummy.matrix);
        glowRef.current.setColorAt(index, glow ? color.set(glow) : color.setHSL(col / KEY_COLS, 0.9, 0.55));
        index += 1;
      }
    }
    capsRef.current.instanceMatrix.needsUpdate = true;
    glowRef.current.instanceMatrix.needsUpdate = true;
    glowRef.current.instanceColor.needsUpdate = true;
  }, [dummy, color, glow]);

  useFrame(({ clock }) => {
    if (!rgb || !glowRef.current) return;
    const t = clock.elapsedTime * 0.12;
    let index = 0;
    for (let row = 0; row < KEY_ROWS; row += 1) {
      for (let col = 0; col < KEY_COLS; col += 1) {
        glowRef.current.setColorAt(index, color.setHSL((col / KEY_COLS + row * 0.02 + t) % 1, 0.9, 0.55));
        index += 1;
      }
    }
    glowRef.current.instanceColor.needsUpdate = true;
  });

  return (
    <group {...props}>
      <RoundedBox args={[1.14, 0.05, 0.42]} radius={0.015} smoothness={3} position={[0, 0.025, 0]} castShadow receiveShadow>
        <meshStandardMaterial color="#121218" {...METAL} />
      </RoundedBox>
      <instancedMesh ref={glowRef} args={[undefined, undefined, KEY_COUNT]}>
        <boxGeometry args={[0.064, 0.012, 0.064]} />
        <meshBasicMaterial toneMapped={false} />
      </instancedMesh>
      <instancedMesh ref={capsRef} args={[undefined, undefined, KEY_COUNT]} castShadow>
        <boxGeometry args={[0.054, 0.03, 0.054]} />
        <meshStandardMaterial color="#1d1d26" roughness={0.6} />
      </instancedMesh>
    </group>
  );
};

export const Mouse = ({ accent = "#6ee7ff", ...props }) => (
  <group {...props}>
    <mesh position={[0, 0.026, 0]} scale={[0.06, 0.03, 0.1]} castShadow>
      <sphereGeometry args={[1, 24, 16]} />
      <meshStandardMaterial color="#15151b" metalness={0.4} roughness={0.35} />
    </mesh>
    <mesh position={[0, 0.054, -0.035]}>
      <boxGeometry args={[0.008, 0.006, 0.03]} />
      <meshBasicMaterial color={accent} toneMapped={false} />
    </mesh>
  </group>
);

export const DeskMat = ({ width = 2, depth = 0.65, color = "#101018", edge = "#a78bfa", ...props }) => (
  <group {...props}>
    <mesh position={[0, 0.004, 0]} receiveShadow>
      <boxGeometry args={[width, 0.008, depth]} />
      <meshStandardMaterial color={color} roughness={0.95} />
    </mesh>
    <mesh position={[0, 0.0045, depth / 2 - 0.004]}>
      <boxGeometry args={[width, 0.009, 0.008]} />
      <meshBasicMaterial color={edge} toneMapped={false} />
    </mesh>
  </group>
);

export const Gamepad = ({ color = "#1b1b24", ...props }) => (
  <group {...props}>
    <RoundedBox args={[0.3, 0.06, 0.16]} radius={0.025} smoothness={3} position={[0, 0.04, 0]} castShadow>
      <meshStandardMaterial color={color} roughness={0.5} />
    </RoundedBox>
    {[-0.12, 0.12].map((x) => (
      <mesh key={x} position={[x, 0.035, 0.05]} scale={[0.07, 0.05, 0.09]} castShadow>
        <sphereGeometry args={[1, 16, 12]} />
        <meshStandardMaterial color={color} roughness={0.5} />
      </mesh>
    ))}
    {[
      [0.08, -0.02, "#6ee7ff"],
      [0.105, 0.005, "#f472b6"],
      [0.055, 0.005, "#facc15"],
      [0.08, 0.03, "#a3e635"],
    ].map(([x, z, buttonColor]) => (
      <mesh key={`${x}-${z}`} position={[x, 0.073, z]}>
        <cylinderGeometry args={[0.011, 0.011, 0.01, 12]} />
        <meshBasicMaterial color={buttonColor} toneMapped={false} />
      </mesh>
    ))}
    {[-0.04, 0.03].map((x) => (
      <mesh key={x} position={[x, 0.078, 0.02]}>
        <cylinderGeometry args={[0.02, 0.02, 0.02, 16]} />
        <meshStandardMaterial color="#0a0a0f" roughness={0.8} />
      </mesh>
    ))}
  </group>
);

export const Mug = ({ color = "#e8e1d6", ...props }) => (
  <group {...props}>
    <mesh position={[0, 0.07, 0]} castShadow>
      <cylinderGeometry args={[0.065, 0.06, 0.14, 24]} />
      <meshStandardMaterial color={color} roughness={0.4} />
    </mesh>
    <mesh position={[0.07, 0.075, 0]} castShadow>
      <torusGeometry args={[0.035, 0.01, 8, 18]} />
      <meshStandardMaterial color={color} roughness={0.4} />
    </mesh>
    <mesh position={[0, 0.132, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <circleGeometry args={[0.057, 24]} />
      <meshStandardMaterial color="#3b2416" roughness={0.2} />
    </mesh>
  </group>
);

/* -------------------------------------------------------------------------- */
/*                                  PC tower                                  */
/* -------------------------------------------------------------------------- */

const TOWER = { width: 0.45, height: 0.95, depth: 0.9 };

/**
 * Glass-panel PC case (glass faces +X, front faces +Z) with spinning fans.
 * `trim` recolours the GPU strip and cooler ring (multi-colour RGB by default).
 */
export const PCTower = ({ accent = "#6ee7ff", trim = null, ...props }) => {
  const fansRef = useRef([]);
  const { width: W, height: H, depth: D } = TOWER;

  useFrame((_, delta) => {
    fansRef.current.forEach((fan) => {
      if (fan) fan.rotation.z += delta * 5;
    });
  });

  return (
    <group {...props}>
      {/* Chassis panels */}
      {[
        { position: [-W / 2 + 0.01, H / 2, 0], args: [0.02, H, D] },
        { position: [0, H - 0.01, 0], args: [W, 0.02, D] },
        { position: [0, 0.03, 0], args: [W, 0.04, D] },
        { position: [0, H / 2, D / 2 - 0.015], args: [W, H, 0.03] },
        { position: [0, H / 2, -D / 2 + 0.01], args: [W, H, 0.02] },
      ].map(({ position, args }) => (
        <mesh key={position.join()} position={position} castShadow receiveShadow>
          <boxGeometry args={args} />
          <meshStandardMaterial color="#0e0e13" metalness={0.6} roughness={0.35} />
        </mesh>
      ))}

      {/* Tempered glass side */}
      <mesh position={[W / 2 - 0.004, H / 2, 0]}>
        <boxGeometry args={[0.008, H - 0.04, D - 0.04]} />
        <meshStandardMaterial color="#9ec5ff" transparent opacity={0.12} metalness={0.9} roughness={0.05} depthWrite={false} />
      </mesh>

      {/* Front RGB strip */}
      <mesh position={[0, H / 2, D / 2 + 0.002]}>
        <boxGeometry args={[0.02, H * 0.78, 0.004]} />
        <meshBasicMaterial color={accent} toneMapped={false} />
      </mesh>

      {/* Motherboard */}
      <mesh position={[-W / 2 + 0.03, H * 0.55, -0.02]}>
        <boxGeometry args={[0.01, H * 0.7, D * 0.72]} />
        <meshStandardMaterial color="#121826" roughness={0.7} />
      </mesh>

      {/* GPU */}
      <group position={[-0.07, H * 0.42, -0.02]}>
        <mesh castShadow>
          <boxGeometry args={[0.24, 0.07, 0.6]} />
          <meshStandardMaterial color="#1b1b22" metalness={0.6} roughness={0.3} />
        </mesh>
        <mesh position={[0.121, 0, 0]}>
          <boxGeometry args={[0.002, 0.012, 0.5]} />
          <meshBasicMaterial color={trim ?? "#a78bfa"} toneMapped={false} />
        </mesh>
      </group>

      {/* CPU cooler ring */}
      <mesh position={[-0.12, H * 0.72, -0.1]} rotation={[0, Math.PI / 2, 0]}>
        <torusGeometry args={[0.07, 0.01, 10, 32]} />
        <meshBasicMaterial color={trim ?? "#f472b6"} toneMapped={false} />
      </mesh>

      {/* Front intake fans */}
      {[0.24, 0.5, 0.76].map((y, index) => (
        <group key={y} position={[0.02, H * y, D / 2 - 0.06]}>
          <mesh>
            <torusGeometry args={[0.11, 0.012, 10, 36]} />
            <meshBasicMaterial color={accent} toneMapped={false} />
          </mesh>
          <group ref={(node) => (fansRef.current[index] = node)}>
            {[0, 1, 2].map((blade) => (
              <mesh key={blade} rotation={[0, 0, (blade / 3) * Math.PI * 2]} position={[0, 0, 0]}>
                <boxGeometry args={[0.03, 0.19, 0.006]} />
                <meshStandardMaterial color="#2a2a35" metalness={0.3} roughness={0.5} />
              </mesh>
            ))}
          </group>
        </group>
      ))}

      {/* Feet */}
      {[
        [-W / 2 + 0.06, D / 2 - 0.08],
        [W / 2 - 0.06, D / 2 - 0.08],
        [-W / 2 + 0.06, -D / 2 + 0.08],
        [W / 2 - 0.06, -D / 2 + 0.08],
      ].map(([x, z]) => (
        <mesh key={`${x}-${z}`} position={[x, 0.005, z]}>
          <boxGeometry args={[0.06, 0.01, 0.06]} />
          <meshStandardMaterial color="#050507" />
        </mesh>
      ))}

      <pointLight position={[0.08, H * 0.5, 0]} intensity={0.8} distance={1.6} decay={2} color={accent} />
    </group>
  );
};

/* -------------------------------------------------------------------------- */
/*                                 Desk lamp                                  */
/* -------------------------------------------------------------------------- */

/** Articulated lamp; the head tilts toward local +X. */
export const DeskLamp = ({ intensity = 4, color = "#ffd6a0", castShadow = false, ...props }) => {
  const base = [0, 0.05, 0];
  const elbow = [0.12, 0.62, 0.02];
  const head = [0.48, 0.74, 0.06];

  return (
    <group {...props}>
      <mesh position={[0, 0.02, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.16, 0.18, 0.04, 32]} />
        <meshStandardMaterial color="#202028" {...METAL} />
      </mesh>
      <Segment start={base} end={elbow} radius={0.016} castShadow>
        <meshStandardMaterial color="#2a2a33" {...METAL} />
      </Segment>
      <mesh position={elbow}>
        <sphereGeometry args={[0.03, 16, 16]} />
        <meshStandardMaterial color="#2a2a33" {...METAL} />
      </mesh>
      <Segment start={elbow} end={head} radius={0.014} castShadow>
        <meshStandardMaterial color="#2a2a33" {...METAL} />
      </Segment>

      <group position={head} rotation={[0, 0, -0.5]}>
        <mesh position={[0, -0.06, 0]} castShadow>
          <coneGeometry args={[0.12, 0.16, 32, 1, true]} />
          <meshStandardMaterial color="#2a2a33" metalness={0.6} roughness={0.3} side={THREE.DoubleSide} />
        </mesh>
        <mesh position={[0, -0.11, 0]}>
          <sphereGeometry args={[0.045, 16, 16]} />
          <meshBasicMaterial color={color} toneMapped={false} />
        </mesh>
        <pointLight
          position={[0, -0.2, 0]}
          intensity={intensity}
          distance={4}
          decay={2}
          color={color}
          castShadow={castShadow}
          shadow-mapSize={[512, 512]}
          shadow-bias={-0.002}
        />
      </group>
    </group>
  );
};

/* -------------------------------------------------------------------------- */
/*                                   Chair                                    */
/* -------------------------------------------------------------------------- */

/** Office chair; the backrest sits at +Z, so the sitter faces -Z. */
export const Chair = ({ color = "#1f1f2a", accent = "#a78bfa", ...props }) => (
  <group {...props}>
    {Array.from({ length: 5 }, (_, index) => (
      <group key={index} rotation={[0, (index / 5) * Math.PI * 2, 0]}>
        <mesh position={[0.22, 0.1, 0]} castShadow>
          <boxGeometry args={[0.44, 0.05, 0.07]} />
          <meshStandardMaterial color="#18181e" {...METAL} />
        </mesh>
        <mesh position={[0.42, 0.045, 0]} castShadow>
          <sphereGeometry args={[0.045, 12, 12]} />
          <meshStandardMaterial color="#0c0c10" roughness={0.6} />
        </mesh>
      </group>
    ))}

    <mesh position={[0, 0.42, 0]} castShadow>
      <cylinderGeometry args={[0.04, 0.05, 0.62, 16]} />
      <meshStandardMaterial color="#26262e" {...METAL} />
    </mesh>

    <RoundedBox args={[0.9, 0.12, 0.85]} radius={0.05} smoothness={3} position={[0, 0.78, 0]} castShadow receiveShadow>
      <meshStandardMaterial color={color} roughness={0.75} />
    </RoundedBox>

    <group position={[0, 1.38, 0.4]} rotation={[-0.12, 0, 0]}>
      <RoundedBox args={[0.85, 1.05, 0.1]} radius={0.05} smoothness={3} castShadow>
        <meshStandardMaterial color={color} roughness={0.75} />
      </RoundedBox>
      <mesh position={[0, 0.05, 0.052]}>
        <boxGeometry args={[0.07, 0.8, 0.004]} />
        <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={0.8} />
      </mesh>
    </group>

    {[-0.45, 0.45].map((x) => (
      <group key={x} position={[x, 0, 0.05]}>
        <mesh position={[0, 0.95, 0]} castShadow>
          <boxGeometry args={[0.05, 0.24, 0.05]} />
          <meshStandardMaterial color="#18181e" {...METAL} />
        </mesh>
        <mesh position={[0, 1.08, -0.02]} castShadow>
          <boxGeometry args={[0.09, 0.04, 0.38]} />
          <meshStandardMaterial color={color} roughness={0.75} />
        </mesh>
      </group>
    ))}
  </group>
);

/* -------------------------------------------------------------------------- */
/*                                   Plant                                    */
/* -------------------------------------------------------------------------- */

export const Plant = ({ potColor = "#d9d4cc", ...props }) => (
  <group {...props}>
    <mesh position={[0, 0.25, 0]} castShadow receiveShadow>
      <cylinderGeometry args={[0.28, 0.22, 0.5, 24]} />
      <meshStandardMaterial color={potColor} roughness={0.8} />
    </mesh>
    <mesh position={[0, 0.49, 0]}>
      <cylinderGeometry args={[0.26, 0.26, 0.03, 24]} />
      <meshStandardMaterial color="#3b2a1d" roughness={1} />
    </mesh>
    {Array.from({ length: 9 }, (_, index) => (
      <group key={index} position={[0, 0.5, 0]} rotation={[0, (index / 9) * Math.PI * 2, 0]}>
        <mesh
          position={[0.16, 0.34 + (index % 3) * 0.09, 0]}
          rotation={[0, 0, -0.5 - (index % 2) * 0.22]}
          scale={[0.11, 0.42, 0.045]}
          castShadow
        >
          <sphereGeometry args={[1, 12, 12]} />
          <meshStandardMaterial color={index % 2 ? "#2f7d4f" : "#3fa86a"} roughness={0.6} />
        </mesh>
      </group>
    ))}
  </group>
);
