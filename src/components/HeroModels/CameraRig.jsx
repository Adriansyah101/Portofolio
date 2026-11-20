import { useEffect, useImperativeHandle, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { gsap } from "gsap";
import { Quaternion, Vector3 } from "three";

/** Default view: the camera's mount position and the point it orbits. */
export const OVERVIEW = { position: [0, 5.5, 13], target: [0, 0, 0] };

/**
 * Close-up framings, written in room-local space (the room is turned -45° and
 * scaled per breakpoint, so local values stay meaningful): look at `target`
 * from `distance` units away along the `from` direction.
 */
const CLOSE_UPS = {
  desk: { target: [-0.55, 2.25, -1.85], from: [0.5, 0.34, 0.8], distance: 8.2 },
  telemetry: { target: [-0.4, 3.7, -3.48], from: [0.12, 0.1, 0.99], distance: 5.4 },
};

const scratch = { position: new Vector3(), quaternion: new Quaternion(), scale: new Vector3(), dir: new Vector3() };

/**
 * Animates the camera (and the OrbitControls target, when there is one)
 * between the hero presets with GSAP. `rigRef.current.goTo(id)` is called by
 * the HTML pills outside the canvas; `roomRef` is the room group, used to turn
 * room-local framings into world space. Without controls (phones), the rig
 * keeps the camera aimed at the tweened target itself.
 */
const CameraRig = ({ rigRef, controlsRef, roomRef }) => {
  const camera = useThree((state) => state.camera);
  const target = useRef(new Vector3(...OVERVIEW.target));
  const tween = useRef(null);

  const resolve = (id) => {
    const room = roomRef.current;
    const close = CLOSE_UPS[id];
    if (!close || !room) return { position: new Vector3(...OVERVIEW.position), target: new Vector3(...OVERVIEW.target) };

    room.updateWorldMatrix(true, false);
    room.matrixWorld.decompose(scratch.position, scratch.quaternion, scratch.scale);
    const focus = new Vector3(...close.target).applyMatrix4(room.matrixWorld);
    const dir = scratch.dir.set(...close.from).normalize().applyQuaternion(scratch.quaternion);
    const position = focus.clone().addScaledVector(dir, close.distance * scratch.scale.x);
    return { position, target: focus };
  };

  const goTo = (id) => {
    const goal = resolve(id);
    const controls = controlsRef.current;
    const from = controls ? controls.target : target.current;
    const state = {
      px: camera.position.x,
      py: camera.position.y,
      pz: camera.position.z,
      tx: from.x,
      ty: from.y,
      tz: from.z,
    };
    const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

    tween.current?.kill();
    tween.current = gsap.to(state, {
      px: goal.position.x,
      py: goal.position.y,
      pz: goal.position.z,
      tx: goal.target.x,
      ty: goal.target.y,
      tz: goal.target.z,
      duration: reduced ? 0 : 1.4,
      ease: "power2.inOut",
      onUpdate: () => {
        camera.position.set(state.px, state.py, state.pz);
        target.current.set(state.tx, state.ty, state.tz);
        if (controlsRef.current) {
          controlsRef.current.target.copy(target.current);
          controlsRef.current.update();
        } else {
          camera.lookAt(target.current);
        }
      },
    });
  };

  useImperativeHandle(rigRef, () => ({ goTo, stop: () => tween.current?.kill() }));
  useEffect(() => () => tween.current?.kill(), []);

  // Phones have no OrbitControls: keep looking at the current target.
  useFrame(() => {
    if (!controlsRef.current) camera.lookAt(target.current);
  });

  return null;
};

export default CameraRig;
