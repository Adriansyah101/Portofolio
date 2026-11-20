import { useLayoutEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Color } from "three";

/** Easing rate per second: about 95% of the way in half a second, in step with the CSS colour transition. */
const RATE = 6;
const COLOR_KEYS = new Set(["color", "groundColor", "emissive"]);
const scratch = new Color();

const assign = (object, goals, colors) => {
  for (const key of Object.keys(goals)) {
    if (COLOR_KEYS.has(key)) object[key]?.copy(colors[key]);
    else object[key] = goals[key];
  }
};

/**
 * Eases a Three.js object's colours and numeric properties toward `goals`
 * (for example `{ color: "#e2e8f0", intensity: 4 }`) whenever they change,
 * so a theme switch fades the lighting instead of snapping it. The first
 * values are applied before the first frame, so nothing animates on mount.
 *
 * Attach the returned ref to a light, material or fog, and leave the tweened
 * props off the JSX element (React would otherwise overwrite them). Pass an
 * existing object (e.g. a RectAreaLight created with `new`) as `object`.
 */
export const useThemeTween = (goals, object = null) => {
  const ref = useRef(object);
  const goalsRef = useRef(goals);
  const colorsRef = useRef({});
  const settled = useRef(false);
  const applied = useRef(false);

  if (object) ref.current = object;

  // Refresh targets on every render; parsing a few hex strings is cheap.
  goalsRef.current = goals;
  for (const key of Object.keys(goals)) {
    if (!COLOR_KEYS.has(key)) continue;
    colorsRef.current[key] ??= new Color();
    colorsRef.current[key].set(goals[key]);
  }
  settled.current = false;

  useLayoutEffect(() => {
    if (!ref.current || applied.current) return;
    assign(ref.current, goalsRef.current, colorsRef.current);
    applied.current = true;
    settled.current = true;
  }, []);

  useFrame((_, delta) => {
    const target = ref.current;
    if (!target || settled.current) return;

    if (!applied.current) {
      assign(target, goalsRef.current, colorsRef.current);
      applied.current = true;
      settled.current = true;
      return;
    }

    const t = 1 - Math.exp(-RATE * Math.min(delta, 0.1));
    let done = true;

    for (const [key, goal] of Object.entries(goalsRef.current)) {
      if (COLOR_KEYS.has(key)) {
        const current = target[key];
        if (!current) continue;
        const wanted = colorsRef.current[key];
        current.lerp(wanted, t);
        scratch.copy(current).sub(wanted);
        if (Math.abs(scratch.r) + Math.abs(scratch.g) + Math.abs(scratch.b) > 0.002) done = false;
        else current.copy(wanted);
      } else if (typeof goal === "number") {
        const next = target[key] + (goal - target[key]) * t;
        if (Math.abs(goal - next) > Math.max(1e-3, Math.abs(goal) * 1e-3)) {
          target[key] = next;
          done = false;
        } else {
          target[key] = goal;
        }
      }
    }

    settled.current = done;
  });

  return ref;
};
