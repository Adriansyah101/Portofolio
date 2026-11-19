import { useMemo } from "react";
import * as THREE from "three";
import { RectAreaLightUniformsLib } from "three/examples/jsm/lights/RectAreaLightUniformsLib.js";

// RectAreaLight needs its LTC lookup textures registered once per app.
RectAreaLightUniformsLib.init();

/** Studio lighting rig: key + fill spotlights, a soft area light and accents. */
const HeroLights = () => {
  const areaLight = useMemo(() => {
    const light = new THREE.RectAreaLight("#a259ff", 6, 4, 3);
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
      {/* Violet fill */}
      <spotLight
        position={[-5, 7, 6]}
        angle={0.5}
        penumbra={1}
        intensity={90}
        decay={2}
        color="#9d4edd"
      />

      <primitive object={areaLight} />

      <pointLight position={[0, 1.5, 1]} intensity={6} decay={2} color="#7209b7" />
      <pointLight position={[1, 3, -2]} intensity={6} decay={2} color="#3a0ca3" />

      <hemisphereLight args={["#5a5aa8", "#0a0a14", 1.4]} />
      <ambientLight intensity={0.35} color="#2a2a60" />
    </>
  );
};

export default HeroLights;
