import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Vector3 } from "three";

const projected = new Vector3();

/**
 * An empty point in the scene that keeps a DOM element (`targetRef`, living
 * in the HTML overlay above the canvas) pinned to its on-screen position.
 * Writing `transform` directly each frame avoids React re-renders. The
 * element is hidden while the point is behind the camera.
 */
const ScreenAnchor = ({ targetRef, ...props }) => {
  const anchor = useRef(null);
  const camera = useThree((state) => state.camera);
  const size = useThree((state) => state.size);

  useFrame(() => {
    const element = targetRef.current;
    if (!anchor.current || !element) return;
    projected.setFromMatrixPosition(anchor.current.matrixWorld).project(camera);
    const x = ((projected.x + 1) / 2) * size.width;
    const y = ((1 - projected.y) / 2) * size.height;
    element.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0)`;
    element.style.visibility = projected.z > 1 ? "hidden" : "";
  });

  return <group ref={anchor} {...props} />;
};

export default ScreenAnchor;
