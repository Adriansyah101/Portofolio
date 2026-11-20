import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { createDotTexture } from "../Models/canvasTextures.js";
import { useThemeTween } from "../Models/useThemeTween.js";

const TOP = 7;
const BOTTOM = -3;

/** A few faint, slow-rising dust motes that give the scene depth (`tone` = { color, opacity }). */
const Particles = ({ count = 40, spread = 10, tone = { color: "#e4e4e7", opacity: 0.3 } }) => {
  const pointsRef = useRef(null);
  const material = useThemeTween(tone);
  const sprite = useMemo(() => createDotTexture(), []);

  const { positions, speeds } = useMemo(() => {
    const positionArray = new Float32Array(count * 3);
    const speedArray = new Float32Array(count);
    for (let i = 0; i < count; i += 1) {
      positionArray[i * 3] = (Math.random() - 0.5) * spread;
      positionArray[i * 3 + 1] = BOTTOM + Math.random() * (TOP - BOTTOM);
      positionArray[i * 3 + 2] = (Math.random() - 0.5) * spread;
      speedArray[i] = 0.12 + Math.random() * 0.35;
    }
    return { positions: positionArray, speeds: speedArray };
  }, [count, spread]);

  useEffect(() => () => sprite.dispose(), [sprite]);

  useFrame(({ clock }, delta) => {
    const geometry = pointsRef.current?.geometry;
    if (!geometry) return;
    const array = geometry.attributes.position.array;
    const t = clock.elapsedTime;

    for (let i = 0; i < count; i += 1) {
      const y = i * 3 + 1;
      array[y] += speeds[i] * delta;
      array[i * 3] += Math.sin(t * 0.5 + i) * 0.0015;
      if (array[y] > TOP) array[y] = BOTTOM;
    }
    geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        ref={material}
        map={sprite}
        size={0.05}
        sizeAttenuation
        transparent
        depthWrite={false}
        toneMapped={false}
      />
    </points>
  );
};

export default Particles;
