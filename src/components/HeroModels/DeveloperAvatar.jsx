import { useEffect, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { RoundedBox } from "@react-three/drei";
import { MathUtils, Vector3 } from "three";

/**
 * Smart-casual look: a black varsity jacket with yellow sleeves, striped rib
 * collar, cuffs and hem, yellow snaps and welt pockets, worn open over a white
 * crew-neck tee, with dark trousers and thick black side-swept hair. No
 * glasses, no jewellery, no company branding. Off-white and a slightly muted
 * yellow keep the bloom pass from flaring; the lighting, not the avatar,
 * changes with the theme.
 */
const COLORS = {
  jacket: "#1b1c20",
  sleeve: "#dcb815",
  rib: "#16171a",
  ribStripe: "#dcb815",
  snapLight: "#e5e7eb",
  tee: "#e4e7eb",
  pants: "#2a2b30",
  skin: "#c8946e",
  skinShade: "#b98562",
  hair: "#15110e",
  shoe: "#2b2b2f",
  sole: "#52525b",
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
/** Seconds of the screen ↔ visitor glance cycle (desk mode), and how much of it goes to the visitor. */
const GLANCE_CYCLE = 9;
const GLANCE_VISITOR = 3.2;
/** Desk mode: share of the turn toward the visitor done by swivelling the seat while waving, and the head's yaw limit. */
const SWIVEL_SHARE = 0.55;
const HEAD_YAW_LIMIT = 1.05;
const cameraLocal = new Vector3();

const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

/** Upper arm → elbow → forearm → hand. `side` is +1 for the avatar's left, -1 for its right. */
const Arm = ({ side, shoulderRef, elbowRef, handRef }) => (
  <group ref={shoulderRef} position={[0.36 * side, 0.9, 0]}>
    <mesh position={[0, -0.2, 0]} castShadow>
      <capsuleGeometry args={[0.1, 0.3, 6, 14]} />
      <meshStandardMaterial color={COLORS.sleeve} {...MATTE} />
    </mesh>
    <group ref={elbowRef} position={[0, -0.42, 0]}>
      <mesh position={[0, -0.17, 0]} castShadow>
        <capsuleGeometry args={[0.088, 0.26, 6, 14]} />
        <meshStandardMaterial color={COLORS.sleeve} {...MATTE} />
      </mesh>
      {/* Striped rib cuff */}
      <mesh position={[0, -0.33, 0]}>
        <cylinderGeometry args={[0.084, 0.084, 0.075, 16]} />
        <meshStandardMaterial color={COLORS.rib} {...MATTE} />
      </mesh>
      {[-0.315, -0.345].map((y) => (
        <mesh key={y} position={[0, y, 0]}>
          <cylinderGeometry args={[0.0855, 0.0855, 0.009, 16]} />
          <meshStandardMaterial color={COLORS.ribStripe} {...MATTE} />
        </mesh>
      ))}
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
    {/* Shoe */}
    <RoundedBox args={[0.22, 0.13, 0.4]} radius={0.05} smoothness={3} position={[0, 0.1, 0.72]} castShadow>
      <meshStandardMaterial color={COLORS.shoe} roughness={0.75} />
    </RoundedBox>
    <mesh position={[0, 0.025, 0.72]}>
      <boxGeometry args={[0.23, 0.05, 0.41]} />
      <meshStandardMaterial color={COLORS.sole} roughness={0.9} />
    </mesh>
  </group>
);

const Head = ({ headRef }) => (
  <group ref={headRef} position={[0, 1.09, 0]}>
    <mesh position={[0, 0.27, 0]} scale={[1, 1.08, 1]} castShadow>
      <sphereGeometry args={[0.25, 32, 24]} />
      <meshStandardMaterial color={COLORS.skin} roughness={0.68} />
    </mesh>
    {/* Thick black hair: a cap over the crown and back, volume on top, and a fringe swept to his left */}
    <mesh position={[0, 0.3, -0.02]} rotation={[-0.3, 0, 0]} scale={[1.05, 1.06, 1.06]}>
      <sphereGeometry args={[0.25, 32, 16, 0, Math.PI * 2, 0, Math.PI * 0.52]} />
      <meshStandardMaterial color={COLORS.hair} roughness={0.9} />
    </mesh>
    <mesh position={[0.01, 0.455, -0.005]} rotation={[0.1, 0, -0.08]} scale={[1.1, 0.42, 1.1]}>
      <sphereGeometry args={[0.2, 28, 16]} />
      <meshStandardMaterial color={COLORS.hair} roughness={0.9} />
    </mesh>
    <mesh position={[0.035, 0.425, 0.15]} rotation={[0.5, 0, -0.2]} scale={[1.55, 0.36, 0.6]}>
      <sphereGeometry args={[0.12, 20, 12]} />
      <meshStandardMaterial color={COLORS.hair} roughness={0.9} />
    </mesh>
    {/* Ears */}
    {[-1, 1].map((side) => (
      <mesh key={side} position={[0.245 * side, 0.25, 0]} scale={[0.45, 1, 0.75]}>
        <sphereGeometry args={[0.06, 12, 10]} />
        <meshStandardMaterial color={COLORS.skinShade} roughness={0.7} />
      </mesh>
    ))}
    {/* Eyebrows, eyes, nose and a small smile */}
    {[-1, 1].map((side) => (
      <mesh key={`brow${side}`} position={[0.095 * side, 0.318, 0.232]} rotation={[-0.1, 0, 0]}>
        <boxGeometry args={[0.08, 0.016, 0.014]} />
        <meshStandardMaterial color={COLORS.hair} roughness={0.9} />
      </mesh>
    ))}
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
      <torusGeometry args={[0.05, 0.008, 6, 20, Math.PI * 0.5]} />
      <meshStandardMaterial color="#6b3f2e" roughness={0.6} />
    </mesh>
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
 * (`waveSignal` increments).
 *
 * Desk mode (Contact page): set `screenYaw`, the head yaw (radians) that
 * looks at the screen on the desk. The head then glances between that screen
 * and the visitor (the camera, tracked live so orbiting works), and while
 * waving the seat swivels part of the way toward the visitor. `children` (the
 * chair) swivel with the figure. Every mesh casts and receives shadows, which
 * matters only in a canvas with `shadows` enabled.
 */
const DeveloperAvatar = ({ waveSignal = 0, screenYaw = null, children, ...props }) => {
  const root = useRef(null);
  const seat = useRef(null);
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
  const motion = useRef({
    start: null,
    raise: 0,
    wave: null,
    introDone: false,
    nodStart: -10,
    nextIdle: Infinity,
    headYaw: 0,
    turn: 0,
  });
  const reduced = useRef(prefersReducedMotion());
  const now = useRef(0);
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
  };

  // "Wave back" button outside the canvas.
  useEffect(() => {
    if (waveSignal > 0) respond();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [waveSignal]);

  useEffect(() => () => (gl.domElement.style.cursor = ""), [gl]);

  useEffect(() => {
    seat.current?.traverse((object) => {
      if (!object.isMesh || object.userData.hitVolume) return;
      object.castShadow = true;
      object.receiveShadow = true;
    });
  }, []);

  useFrame(({ clock, camera }, delta) => {
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
    }
    if (!calm && !state.wave && t >= state.nextIdle) {
      state.wave = { start: t, end: t + IDLE_LENGTH, lively: false };
      state.nextIdle = t + IDLE_LENGTH + IDLE_GAP;
    }
    if (state.wave && t >= state.wave.end) state.wave = null;

    const waving = Boolean(state.wave);
    const lively = waving && state.wave.lively;
    const step = Math.min(delta, 0.1);
    state.raise = MathUtils.damp(state.raise, waving ? 1 : 0, waving ? 5 : 3.5, step);
    const raise = state.raise;
    const ease = raise * raise * (3 - 2 * raise);

    // Breathing: a slight rise of the chest and shoulders.
    const breath = Math.sin(t * 1.6);
    if (torso.current) {
      torso.current.scale.y = 1 + breath * 0.012;
      torso.current.rotation.x = 0.04 + (lively ? 0.05 * ease : 0);
    }

    // Desk mode: where the visitor is, as a yaw in the avatar's own frame (it faces +Z).
    let visitorYaw = 0;
    if (screenYaw !== null && root.current) {
      root.current.worldToLocal(cameraLocal.copy(camera.position));
      visitorYaw = Math.atan2(cameraLocal.x, cameraLocal.z);
    }
    // Seat swivel toward the visitor while waving.
    state.turn = MathUtils.damp(state.turn, waving && screenYaw !== null ? visitorYaw * SWIVEL_SHARE : 0, 2.6, step);
    if (seat.current) seat.current.rotation.y = state.turn;

    // Head: slow idle sway (or monitor ↔ visitor glances), a nod when
    // responding, a friendly tilt while waving.
    const nodAge = t - state.nodStart;
    const nod = nodAge >= 0 && nodAge < 1.6 ? Math.sin(nodAge * 8) * 0.13 * (1 - nodAge / 1.6) : 0;
    let lookDown = 0;
    if (screenYaw === null) {
      state.headYaw = Math.sin(t * 0.35) * 0.14 * (1 - ease * 0.6);
    } else {
      const atVisitor = waving || t % GLANCE_CYCLE > GLANCE_CYCLE - GLANCE_VISITOR;
      // The swivel already turns part of the way, so the head adds only the rest.
      const goal = MathUtils.clamp((atVisitor ? visitorYaw : screenYaw) - state.turn, -HEAD_YAW_LIMIT, HEAD_YAW_LIMIT);
      state.headYaw = MathUtils.damp(state.headYaw, goal, calm ? 2 : 3.2, step);
      lookDown = atVisitor ? 0 : 0.07;
    }
    if (head.current) {
      head.current.rotation.y = state.headYaw;
      head.current.rotation.x = Math.sin(t * 0.9) * 0.02 + nod + lookDown;
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
    <group ref={root} {...props}>
      <group ref={seat}>
        {/* Invisible hit volume: one cheap raycast target for the whole figure. */}
        <mesh
          userData={{ hitVolume: true }}
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
          {/* Varsity jacket body */}
          <mesh position={[0, 0.5, 0]} scale={[1.08, 1, 0.72]} castShadow>
            <capsuleGeometry args={[0.3, 0.42, 8, 20]} />
            <meshStandardMaterial color={COLORS.jacket} {...MATTE} />
          </mesh>
          {/* White tee showing where the jacket hangs open */}
          {/* (a slightly deeper, narrower body, so it only breaks the surface down the open front) */}
          <mesh position={[0, 0.5, 0]} scale={[0.9, 1, 0.735]}>
            <capsuleGeometry args={[0.3, 0.42, 8, 20]} />
            <meshStandardMaterial color={COLORS.tee} {...MATTE} />
          </mesh>
          <mesh position={[0, 0.955, 0.03]} rotation={[Math.PI / 2 - 0.2, 0, 0]}>
            <torusGeometry args={[0.1, 0.018, 8, 24]} />
            <meshStandardMaterial color={COLORS.tee} {...MATTE} />
          </mesh>
          {/* Snap buttons: light on one placket, yellow on the other */}
          {[0.36, 0.5, 0.64, 0.78].map((y) => (
            <group key={y}>
              <mesh position={[-0.112, y, 0.205]}>
                <sphereGeometry args={[0.011, 8, 6]} />
                <meshStandardMaterial color={COLORS.snapLight} roughness={0.4} metalness={0.2} />
              </mesh>
              <mesh position={[0.112, y, 0.205]}>
                <sphereGeometry args={[0.012, 8, 6]} />
                <meshStandardMaterial color={COLORS.ribStripe} {...MATTE} />
              </mesh>
            </group>
          ))}
          {/* Yellow welt pockets */}
          {[-1, 1].map((side) => (
            <mesh key={side} position={[0.2 * side, 0.36, 0.172]} rotation={[0, 0.62 * side, 0.12 * side]}>
              <boxGeometry args={[0.03, 0.13, 0.008]} />
              <meshStandardMaterial color={COLORS.ribStripe} {...MATTE} />
            </mesh>
          ))}
          {/* Striped rib hem */}
          <mesh position={[0, 0.2, 0]} scale={[1.08, 1, 0.72]}>
            <cylinderGeometry args={[0.29, 0.29, 0.07, 28]} />
            <meshStandardMaterial color={COLORS.rib} {...MATTE} />
          </mesh>
          {[0.215, 0.188].map((y) => (
            <mesh key={y} position={[0, y, 0]} scale={[1.08, 1, 0.72]}>
              <cylinderGeometry args={[0.292, 0.292, 0.01, 28]} />
              <meshStandardMaterial color={COLORS.ribStripe} {...MATTE} />
            </mesh>
          ))}
          {/* Striped rib baseball collar */}
          <mesh position={[0, 0.975, -0.01]} rotation={[Math.PI / 2 - 0.15, 0, 0]}>
            <torusGeometry args={[0.13, 0.034, 10, 28]} />
            <meshStandardMaterial color={COLORS.rib} {...MATTE} />
          </mesh>
          {[0.992, 0.962].map((y) => (
            <mesh key={y} position={[0, y, -0.01]} rotation={[Math.PI / 2 - 0.15, 0, 0]}>
              <torusGeometry args={[0.135, 0.008, 6, 28]} />
              <meshStandardMaterial color={COLORS.ribStripe} {...MATTE} />
            </mesh>
          ))}
          {/* Neck */}
          <mesh position={[0, 1.04, 0]}>
            <cylinderGeometry args={[0.085, 0.095, 0.12, 16]} />
            <meshStandardMaterial color={COLORS.skinShade} roughness={0.7} />
          </mesh>
          <Head headRef={head} />
          <Arm side={-1} shoulderRef={rightShoulder} elbowRef={rightElbow} handRef={rightHand} />
          <Arm side={1} shoulderRef={leftShoulder} elbowRef={leftElbow} handRef={leftHand} />
        </group>

        {children}
      </group>
    </group>
  );
};

export default DeveloperAvatar;
