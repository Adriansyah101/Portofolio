import { Environment, Lightformer } from "@react-three/drei";

/**
 * Fully offline image-based lighting. Instead of streaming an HDR preset from
 * a CDN, drei renders these emissive Lightformer panels into a cube map once
 * (frames={1}), which then drives reflections on metallic / physical
 * materials. No network request is ever made.
 */
const StudioEnvironment = ({ resolution = 256 }) => (
  <Environment resolution={resolution} frames={1}>
    {/* Dark studio backdrop so the panels read as distinct highlights */}
    <color attach="background" args={["#0b0b14"]} />

    {/* Soft overhead softbox */}
    <Lightformer
      form="rect"
      intensity={2.2}
      color="#ffffff"
      position={[0, 5, 0]}
      rotation={[Math.PI / 2, 0, 0]}
      scale={[10, 6, 1]}
    />

    {/* Key panel, front-right */}
    <Lightformer
      form="rect"
      intensity={3}
      color="#f4f7ff"
      position={[4, 1.5, 4]}
      rotation={[0, Math.PI / 4, 0]}
      scale={[4, 3, 1]}
      target={[0, 0, 0]}
    />

    {/* Cool cyan rim strip, back-left */}
    <Lightformer
      form="rect"
      intensity={4}
      color="#4cc9f0"
      position={[-5, 1, -3]}
      scale={[1, 6, 1]}
      target={[0, 0, 0]}
    />

    {/* Violet accent strip, right */}
    <Lightformer
      form="rect"
      intensity={3}
      color="#a259ff"
      position={[5, 0, -2]}
      scale={[1, 5, 1]}
      target={[0, 0, 0]}
    />

    {/* Warm ring from below for subtle under-lighting */}
    <Lightformer
      form="ring"
      intensity={1.5}
      color="#ff9f5a"
      position={[0, -4, 2]}
      scale={3}
      target={[0, 0, 0]}
    />
  </Environment>
);

export default StudioEnvironment;
