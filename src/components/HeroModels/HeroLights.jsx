import { useMemo } from "react";
import * as THREE from "three";
import { RectAreaLightUniformsLib } from "three/examples/jsm/lights/RectAreaLightUniformsLib.js";

// RectAreaLight needs its LTC lookup textures registered once per app.
RectAreaLightUniformsLib.init();

/**
 * Soft, natural studio rig: a neutral key, slate fill and rim, one large
 * softbox (area light) and a warm desk bounce. No saturated colours.
 */
const HeroLights = () => {
  const areaLight = useMemo(() => {
    const light = new THREE.RectAreaLight("#e2e8f0", 5, 4, 3);
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
        intensity={210}
        decay={2}
        color="#f4f4f5"
      />
      {/* Slate rim */}
      <spotLight
        position={[6, 6, 2]}
        angle={0.45}
        penumbra={0.6}
        intensity={40}
        decay={2}
        color="#94a3b8"
      />
      {/* Neutral fill */}
      <spotLight
        position={[-5, 7, 6]}
        angle={0.5}
        penumbra={1}
        intensity={60}
        decay={2}
        color="#cbd5e1"
      />

      <primitive object={areaLight} />

      {/* Warm bounce off the desk */}
      <pointLight position={[0, 1.5, 1]} intensity={3} decay={2} color="#e7c9a5" />
      <pointLight position={[1, 3, -2]} intensity={2.5} decay={2} color="#94a3b8" />

      <hemisphereLight args={["#e2e8f0", "#141416", 1.5]} />
      <ambientLight intensity={0.45} color="#52525b" />
    </>
  );
};

export default HeroLights;
