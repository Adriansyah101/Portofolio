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
    <color attach="background" args={["#0c0c0e"]} />

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

    {/* Slate rim strip, back-left */}
    <Lightformer
      form="rect"
      intensity={2.5}
      color="#cbd5e1"
      position={[-5, 1, -3]}
      scale={[1, 6, 1]}
      target={[0, 0, 0]}
    />

    {/* Soft neutral strip, right */}
    <Lightformer
      form="rect"
      intensity={2}
      color="#94a3b8"
      position={[5, 0, -2]}
      scale={[1, 5, 1]}
      target={[0, 0, 0]}
    />

    {/* Faint warm ring from below for subtle under-lighting */}
    <Lightformer
      form="ring"
      intensity={0.8}
      color="#e7c9a5"
      position={[0, -4, 2]}
      scale={3}
      target={[0, 0, 0]}
    />
  </Environment>
);

export default StudioEnvironment;
