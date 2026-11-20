import { useMemo } from "react";
import * as THREE from "three";
import { RectAreaLightUniformsLib } from "three/examples/jsm/lights/RectAreaLightUniformsLib.js";

// RectAreaLight needs its LTC lookup textures registered once per app.
RectAreaLightUniformsLib.init();

/** Studio lighting rig: key + fill spotlights, a soft area light and accents. */
const HeroLights = () => {
  const areaLight = useMemo(() => {
    const light = new THREE.RectAreaLight("#5b8def", 5, 4, 3);
    light.position.set(1.5, 5, 5);
    light.lookAt(0, 0, 0);
    return light;
  }, []);

  return (
    <>
      {/* Key light */}
      <spotLight
        position={[3, 9, 7]}
        angle={0.5}
        penumbra={0.4}
        intensity={260}
        decay={2}
        color="#ffffff"
      />
      {/* Cool rim */}
      <spotLight
        position={[6, 6, 2]}
        angle={0.45}
        penumbra={0.6}
        intensity={70}
        decay={2}
        color="#4cc9f0"
      />
      {/* Cool blue fill */}
      <spotLight
        position={[-5, 7, 6]}
        angle={0.5}
        penumbra={1}
        intensity={90}
        decay={2}
        color="#3b82f6"
      />

      <primitive object={areaLight} />

      <pointLight position={[0, 1.5, 1]} intensity={5} decay={2} color="#1d4ed8" />
      <pointLight position={[1, 3, -2]} intensity={5} decay={2} color="#0e4c92" />

      <hemisphereLight args={["#5a6f9e", "#0a0d14", 1.4]} />
      <ambientLight intensity={0.35} color="#24324f" />
    </>
  );
};

export default HeroLights;
