import { useEffect, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { RoundedBox } from "@react-three/drei";
import { MathUtils } from "three";
import ScreenAnchor from "./ScreenAnchor.jsx";

/**
 * Matte, low-saturation materials so the avatar sits calmly in both the dark
 * graphite and the pale daylit studio (the lighting, not the avatar, changes
 * with the theme).
 */
const COLORS = {
  hoodie: "#4b5563",
  hoodieTrim: "#3f4651",
  pants: "#2a2b30",
  skin: "#c8946e",
  skinShade: "#b98562",
  hair: "#1f1b18",
  frames: "#18181b",
  shoe: "#e7e5e4",
  sole: "#3f3f46",
  headphones: "#26272c",
  headphonesAccent: "#94a3b8",
  cord: "#d4d4d8",
};

const MATTE = { roughness: 0.82, metalness: 0 };

/** Arm poses (radians) for the shoulder and elbow joints. */
const REST = {
  shoulder: { x: -0.42, z: 0.14 },
  elbow: { x: -1.25, z: 0 },
};
const WAVE = {
  shoulder: { x: -0.3, z: -2.45 },
  elbow: { x: 0, z: -0.72 },
};

/** Seconds: first greeting after mount, how long it lasts, idle gap between later waves. */
const INTRO_DELAY = 1.1;
const INTRO_LENGTH = 4.2;
const IDLE_GAP = 11;
const IDLE_LENGTH = 2.6;
const RESPONSE_LENGTH = 3.2;

const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

/** Upper arm → elbow → forearm → hand. `side` is +1 for the avatar's left, -1 for its right. */
const Arm = ({ side, shoulderRef, elbowRef, handRef }) => (
  <group ref={shoulderRef} position={[0.36 * side, 0.9, 0]}>
    <mesh position={[0, -0.2, 0]} castShadow>
      <capsuleGeometry args={[0.1, 0.3, 6, 14]} />
      <meshStandardMaterial color={COLORS.hoodie} {...MATTE} />
    </mesh>
    <group ref={elbowRef} position={[0, -0.42, 0]}>
      <mesh position={[0, -0.17, 0]} castShadow>
        <capsuleGeometry args={[0.088, 0.26, 6, 14]} />
        <meshStandardMaterial color={COLORS.hoodie} {...MATTE} />
      </mesh>
      {/* Ribbed cuff */}
      <mesh position={[0, -0.33, 0]}>
        <cylinderGeometry args={[0.082, 0.082, 0.05, 16]} />
        <meshStandardMaterial color={COLORS.hoodieTrim} {...MATTE} />
      </mesh>
      <group ref={handRef} position={[0, -0.42, 0]}>
        <mesh scale={[0.85, 1.15, 0.55]} castShadow>
          <sphereGeometry args={[0.085, 18, 14]} />
          <meshStandardMaterial color={COLORS.skin} roughness={0.7} />
        </mesh>
        {/* Thumb */}
        <mesh position={[0.06 * side, 0.01, 0.02]} rotation={[0, 0, 0.6 * side]} scale={[0.55, 1, 0.55]}>
          <capsuleGeometry args={[0.025, 0.05, 4, 8]} />
          <meshStandardMaterial color={COLORS.skin} roughness={0.7} />
        </mesh>
      </group>
    </group>
  </group>
);

const Leg = ({ side }) => (
  <group position={[0.16 * side, 0, 0]}>
    {/* Thigh, resting on the seat */}
    <mesh position={[0, 0.97, 0.3]} rotation={[Math.PI / 2, 0, 0]} castShadow>
      <capsuleGeometry args={[0.13, 0.48, 6, 14]} />
      <meshStandardMaterial color={COLORS.pants} {...MATTE} />
    </mesh>
    {/* Shin */}
    <mesh position={[0, 0.56, 0.62]} castShadow>
      <capsuleGeometry args={[0.11, 0.62, 6, 14]} />
      <meshStandardMaterial color={COLORS.pants} {...MATTE} />
    </mesh>
    {/* Sneaker */}
    <RoundedBox args={[0.22, 0.13, 0.4]} radius={0.05} smoothness={3} position={[0, 0.1, 0.72]} castShadow>
      <meshStandardMaterial color={COLORS.shoe} roughness={0.75} />
    </RoundedBox>
    <mesh position={[0, 0.025, 0.72]}>
      <boxGeometry args={[0.23, 0.05, 0.41]} />
      <meshStandardMaterial color={COLORS.sole} roughness={0.9} />
    </mesh>
  </group>
);

/** Two round lenses, a bridge and temple arms, sitting just in front of the eyes. */
const Glasses = () => (
  <group position={[0, 0.27, 0.235]}>
    {[-1, 1].map((side) => (
      <group key={side}>
        <mesh position={[0.095 * side, 0, 0.02]}>
          <torusGeometry args={[0.062, 0.011, 8, 28]} />
          <meshStandardMaterial color={COLORS.frames} roughness={0.4} metalness={0.3} />
        </mesh>
        <mesh position={[0.205 * side, 0.01, -0.12]} rotation={[0, Math.PI / 2, 0]}>
          <boxGeometry args={[0.24, 0.014, 0.012]} />
          <meshStandardMaterial color={COLORS.frames} roughness={0.4} />
        </mesh>
      </group>
    ))}
    <mesh position={[0, 0.012, 0.03]}>
      <boxGeometry args={[0.07, 0.012, 0.012]} />
      <meshStandardMaterial color={COLORS.frames} roughness={0.4} />
    </mesh>
  </group>
);

/** Closed-back headphones resting around the neck. */
const NeckHeadphones = () => (
  <group position={[0, 1.02, -0.02]}>
    <mesh rotation={[Math.PI / 2 - 0.25, 0, 0]}>
      <torusGeometry args={[0.235, 0.024, 10, 36, Math.PI]} />
      <meshStandardMaterial color={COLORS.headphones} roughness={0.5} />
    </mesh>
    {[-1, 1].map((side) => (
      <group key={side} position={[0.25 * side, -0.02, 0.07]} rotation={[0.3, 0.5 * side, Math.PI / 2]}>
        <mesh>
          <cylinderGeometry args={[0.085, 0.085, 0.06, 24]} />
          <meshStandardMaterial color={COLORS.headphones} roughness={0.45} />
        </mesh>
        <mesh position={[0, 0.032 * side, 0]}>
          <torusGeometry args={[0.06, 0.008, 6, 24]} />
          <meshStandardMaterial color={COLORS.headphonesAccent} roughness={0.5} />
        </mesh>
      </group>
    ))}
  </group>
);

const Head = ({ headRef }) => (
  <group ref={headRef} position={[0, 1.14, 0]}>
    <mesh position={[0, 0.27, 0]} scale={[1, 1.08, 1]} castShadow>
      <sphereGeometry args={[0.25, 32, 24]} />
      <meshStandardMaterial color={COLORS.skin} roughness={0.68} />
    </mesh>
    {/* Short hair: a cap over the crown and back of the head */}
    <mesh position={[0, 0.3, -0.025]} rotation={[-0.42, 0, 0]} scale={[1.05, 1.06, 1.06]}>
      <sphereGeometry args={[0.25, 32, 16, 0, Math.PI * 2, 0, Math.PI * 0.52]} />
      <meshStandardMaterial color={COLORS.hair} roughness={0.9} />
    </mesh>
    {/* Ears */}
    {[-1, 1].map((side) => (
      <mesh key={side} position={[0.245 * side, 0.25, 0]} scale={[0.45, 1, 0.75]}>
        <sphereGeometry args={[0.06, 12, 10]} />
        <meshStandardMaterial color={COLORS.skinShade} roughness={0.7} />
      </mesh>
    ))}
    {/* Eyes, nose and a small smile */}
    {[-1, 1].map((side) => (
      <mesh key={side} position={[0.095 * side, 0.265, 0.228]}>
        <sphereGeometry args={[0.022, 12, 10]} />
        <meshStandardMaterial color="#1c1917" roughness={0.4} />
      </mesh>
    ))}
    <mesh position={[0, 0.2, 0.25]} scale={[0.8, 1, 0.9]}>
      <sphereGeometry args={[0.032, 12, 10]} />
      <meshStandardMaterial color={COLORS.skinShade} roughness={0.7} />
    </mesh>
    <mesh position={[0, 0.155, 0.226]} rotation={[0.25, 0, -Math.PI / 2 - Math.PI * 0.26]}>
      <torusGeometry args={[0.055, 0.009, 6, 20, Math.PI * 0.52]} />
      <meshStandardMaterial color="#6b3f2e" roughness={0.6} />
    </mesh>
    <Glasses />
  </group>
);

/**
 * Stylised seated developer built from primitives, with an articulated rig
 * (torso → head, shoulders → elbows → hands). Swap the meshes for a rigged
 * `.glb` later by keeping the same joint refs.
 *
 * Motion, all in one `useFrame`: breathing, a slow idle head sway, a greeting
 * wave shortly after load, a gentle wave every few seconds, and a livelier
 * wave + nod when the visitor hovers, clicks or presses "Wave back"
 * (`waveSignal` increments). `onGreet` fires with the first wave and with
 * every response, so the parent can show the greeting bubble; `bubbleRef`
 * is that bubble's DOM element, kept pinned above the avatar's head.
 */
const DeveloperAvatar = ({ onGreet, bubbleRef, waveSignal = 0, ...props }) => {
  const torso = useRef(null);
  const head = useRef(null);
  const rightShoulder = useRef(null);
  const rightElbow = useRef(null);
  const rightHand = useRef(null);
  const leftShoulder = useRef(null);
  const leftElbow = useRef(null);
  const leftHand = useRef(null);

  // Times are seconds since the avatar's first rendered frame, so a slow first
  // frame (shader compilation) can't make it miss its greeting.
  const motion = useRef({ start: null, raise: 0, wave: null, introDone: false, nodStart: -10, nextIdle: Infinity });
  const reduced = useRef(prefersReducedMotion());
  const now = useRef(0);
  const greetRef = useRef(onGreet);
  greetRef.current = onGreet;
  const gl = useThree((state) => state.gl);

  /** Lively wave + nod; ignored while one is already playing so hovering doesn't restart it. */
  const respond = () => {
    const t = now.current;
    const state = motion.current;
    if (state.wave?.lively && t < state.wave.end - 0.6) return;
    state.wave = { start: t, end: t + RESPONSE_LENGTH, lively: true };
    state.introDone = true;
    state.nodStart = t;
    state.nextIdle = t + RESPONSE_LENGTH + IDLE_GAP;
    greetRef.current?.();
  };

  // "Wave back" button outside the canvas.
  useEffect(() => {
    if (waveSignal > 0) respond();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [waveSignal]);

  useEffect(() => () => (gl.domElement.style.cursor = ""), [gl]);

  useFrame(({ clock }, delta) => {
    const state = motion.current;
    state.start ??= clock.elapsedTime;
    const t = clock.elapsedTime - state.start;
    now.current = t;
    const calm = reduced.current;

    // Schedule the greeting wave and the occasional idle wave.
    if (!state.introDone && t >= INTRO_DELAY) {
      state.wave = { start: t, end: t + INTRO_LENGTH, lively: false };
      state.introDone = true;
      state.nextIdle = t + INTRO_LENGTH + IDLE_GAP;
      greetRef.current?.();
    }
    if (!calm && !state.wave && t >= state.nextIdle) {
      state.wave = { start: t, end: t + IDLE_LENGTH, lively: false };
      state.nextIdle = t + IDLE_LENGTH + IDLE_GAP;
    }
    if (state.wave && t >= state.wave.end) state.wave = null;

    const waving = Boolean(state.wave);
    const lively = waving && state.wave.lively;
    state.raise = MathUtils.damp(state.raise, waving ? 1 : 0, waving ? 5 : 3.5, Math.min(delta, 0.1));
    const raise = state.raise;
    const ease = raise * raise * (3 - 2 * raise);

    // Breathing: a slight rise of the chest and shoulders.
    const breath = Math.sin(t * 1.6);
    if (torso.current) {
      torso.current.scale.y = 1 + breath * 0.012;
      torso.current.rotation.x = 0.04 + (lively ? 0.05 * ease : 0);
    }

    // Head: slow idle sway, a nod when responding, a friendly tilt while waving.
    const nodAge = t - state.nodStart;
    const nod = nodAge >= 0 && nodAge < 1.6 ? Math.sin(nodAge * 8) * 0.13 * (1 - nodAge / 1.6) : 0;
    if (head.current) {
      head.current.rotation.y = Math.sin(t * 0.35) * 0.14 * (1 - ease * 0.6);
      head.current.rotation.x = Math.sin(t * 0.9) * 0.02 + nod;
      head.current.rotation.z = -0.1 * ease + Math.sin(t * 0.5) * 0.015;
    }

    // Right arm: rest on the lap ↔ raised, waving from the elbow.
    const speed = calm ? 3 : lively ? 10 : 6.5;
    const amp = calm ? 0.14 : lively ? 0.5 : 0.34;
    const swing = Math.sin(t * speed) * amp * ease;
    if (rightShoulder.current) {
      rightShoulder.current.rotation.x = MathUtils.lerp(REST.shoulder.x, WAVE.shoulder.x, ease);
      rightShoulder.current.rotation.z = MathUtils.lerp(-REST.shoulder.z, WAVE.shoulder.z, ease) + swing * 0.12;
    }
    if (rightElbow.current) {
      rightElbow.current.rotation.x = MathUtils.lerp(REST.elbow.x, WAVE.elbow.x, ease);
      rightElbow.current.rotation.z = MathUtils.lerp(REST.elbow.z, WAVE.elbow.z, ease) + swing;
    }
    if (rightHand.current) {
      rightHand.current.rotation.z = Math.sin(t * speed - 0.7) * amp * 0.45 * ease;
      rightHand.current.rotation.x = MathUtils.lerp(0.2, -0.15, ease);
    }

    // Left arm stays on the lap, moving only with the breath.
    if (leftShoulder.current) {
      leftShoulder.current.rotation.x = REST.shoulder.x + breath * 0.01;
      leftShoulder.current.rotation.z = REST.shoulder.z;
    }
    if (leftElbow.current) leftElbow.current.rotation.x = REST.elbow.x;
    if (leftHand.current) leftHand.current.rotation.x = 0.2;
  });

  const setCursor = (value) => {
    gl.domElement.style.cursor = value;
  };

  return (
    <group {...props}>
      {/* Invisible hit volume: one cheap raycast target for the whole figure. */}
      <mesh
        position={[0, 1.55, 0.2]}
        onPointerOver={(event) => {
          event.stopPropagation();
          setCursor("pointer");
          respond();
        }}
        onPointerOut={() => setCursor("")}
        onClick={(event) => {
          event.stopPropagation();
          respond();
        }}
      >
        <capsuleGeometry args={[0.55, 1.5, 4, 8]} />
        <meshBasicMaterial transparent opacity={0} depthWrite={false} />
      </mesh>

      <Leg side={1} />
      <Leg side={-1} />

      {/* Hips */}
      <mesh position={[0, 0.98, 0.02]} scale={[1, 0.7, 0.85]} castShadow>
        <sphereGeometry args={[0.3, 20, 16]} />
        <meshStandardMaterial color={COLORS.pants} {...MATTE} />
      </mesh>

      <group ref={torso} position={[0, 0.98, -0.02]}>
        {/* Hoodie */}
        <mesh position={[0, 0.5, 0]} scale={[1.08, 1, 0.72]} castShadow>
          <capsuleGeometry args={[0.3, 0.42, 8, 20]} />
          <meshStandardMaterial color={COLORS.hoodie} {...MATTE} />
        </mesh>
        {/* Front pocket */}
        <mesh position={[0, 0.3, 0.205]} rotation={[-0.12, 0, 0]}>
          <boxGeometry args={[0.36, 0.16, 0.02]} />
          <meshStandardMaterial color={COLORS.hoodieTrim} {...MATTE} />
        </mesh>
        {/* Hood folded behind the neck */}
        <mesh position={[0, 0.98, -0.1]} rotation={[Math.PI / 2 + 0.35, 0, 0]}>
          <torusGeometry args={[0.17, 0.075, 10, 28]} />
          <meshStandardMaterial color={COLORS.hoodie} {...MATTE} />
        </mesh>
        {/* Drawstrings */}
        {[-1, 1].map((side) => (
          <mesh key={side} position={[0.06 * side, 0.8, 0.2]} rotation={[-0.1, 0, 0]}>
            <cylinderGeometry args={[0.008, 0.008, 0.2, 6]} />
            <meshStandardMaterial color={COLORS.cord} roughness={0.8} />
          </mesh>
        ))}
        {/* Neck */}
        <mesh position={[0, 1.07, 0]}>
          <cylinderGeometry args={[0.085, 0.095, 0.16, 16]} />
          <meshStandardMaterial color={COLORS.skinShade} roughness={0.7} />
        </mesh>
        <NeckHeadphones />
        <Head headRef={head} />
        <Arm side={-1} shoulderRef={rightShoulder} elbowRef={rightElbow} handRef={rightHand} />
        <Arm side={1} shoulderRef={leftShoulder} elbowRef={leftElbow} handRef={leftHand} />
      </group>

      {/* Keeps the greeting bubble (HTML overlay) just above the head. */}
      <ScreenAnchor targetRef={bubbleRef} position={[0, 2.85, 0.1]} />
    </group>
  );
};

export default DeveloperAvatar;
