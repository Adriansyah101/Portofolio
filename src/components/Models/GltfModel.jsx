import { Suspense, useEffect, useMemo } from "react";
import { useGLTF } from "@react-three/drei";
import ModelErrorBoundary from "./ModelErrorBoundary.jsx";

const LoadedModel = ({ url, shadows, ...props }) => {
  const { scene } = useGLTF(url);
  const model = useMemo(() => scene.clone(true), [scene]);

  useEffect(() => {
    if (!shadows) return;
    model.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
  }, [model, shadows]);

  return <primitive object={model} {...props} />;
};

/**
 * Optional `.glb` slot. With no `url` (the default in constants) the
 * procedural `fallback` renders immediately; with a `url`, the model loads
 * and the fallback is shown while loading or if the file is missing.
 */
const GltfModel = ({ url, fallback = null, shadows = false, ...props }) => {
  if (!url) return fallback;

  return (
    <ModelErrorBoundary fallback={fallback}>
      <Suspense fallback={fallback}>
        <LoadedModel url={url} shadows={shadows} {...props} />
      </Suspense>
    </ModelErrorBoundary>
  );
};

export default GltfModel;
