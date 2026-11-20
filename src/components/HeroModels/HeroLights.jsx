import { useMemo } from "react";
import * as THREE from "three";
import { RectAreaLightUniformsLib } from "three/examples/jsm/lights/RectAreaLightUniformsLib.js";

import { useThemeTween } from "../Models/useThemeTween.js";

// RectAreaLight needs its LTC lookup textures registered once per app.
RectAreaLightUniformsLib.init();

/**
 * Soft, natural studio rig: a neutral key, slate fill and rim, one large
 * softbox (area light) and a warm desk bounce. No saturated colours. Colours
 * and intensities come from the active theme palette and ease on change.
 */
const HeroLights = ({ palette }) => {
  const areaLight = useMemo(() => {
    const light = new THREE.RectAreaLight("#ffffff", 0, 4, 3);
    light.position.set(1.5, 5, 5);
    light.lookAt(0, 0, 0);
    return light;
  }, []);

  useThemeTween(palette.area, areaLight);
  const key = useThemeTween(palette.key);
  const rim = useThemeTween(palette.rim);
  const fill = useThemeTween(palette.fill);
  const warm = useThemeTween(palette.warm);
  const cool = useThemeTween(palette.cool);
  const hemisphere = useThemeTween(palette.hemisphere);
  const ambient = useThemeTween(palette.ambient);

  return (
    <>
      {/* Key light */}
      <spotLight ref={key} position={[3, 9, 7]} angle={0.5} penumbra={0.4} decay={2} />
      {/* Slate rim */}
      <spotLight ref={rim} position={[6, 6, 2]} angle={0.45} penumbra={0.6} decay={2} />
      {/* Neutral fill */}
      <spotLight ref={fill} position={[-5, 7, 6]} angle={0.5} penumbra={1} decay={2} />

      <primitive object={areaLight} />

      {/* Warm bounce off the desk */}
      <pointLight ref={warm} position={[0, 1.5, 1]} decay={2} />
      <pointLight ref={cool} position={[1, 3, -2]} decay={2} />

      <hemisphereLight ref={hemisphere} />
      <ambientLight ref={ambient} />
    </>
  );
};

export default HeroLights;
