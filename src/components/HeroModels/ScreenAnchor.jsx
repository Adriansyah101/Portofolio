import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Vector3 } from "three";

const projected = new Vector3();

/**
 * An empty point in the scene that keeps a DOM element (`targetRef`, living
 * in the HTML overlay above the canvas) pinned to its on-screen position.
 * Writing `transform` directly each frame avoids React re-renders. The
 * element is hidden while the point is behind the camera.
 *
 * `keepInside` (px margin): the element's first child is centred on the
 * point; when it would cross the canvas edge, `--anchor-shift` is set to the
 * horizontal offset that keeps it inside (CSS applies it to the bubble and,
 * reversed, to its tail so the tail still points at the anchor).
 */
const ScreenAnchor = ({ targetRef, keepInside = null, ...props }) => {
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
    if (keepInside !== null) {
      const half = (element.firstElementChild?.offsetWidth ?? 0) / 2;
      const min = keepInside + half;
      const max = size.width - keepInside - half;
      const shift = min > max ? 0 : Math.min(Math.max(x, min), max) - x;
      element.style.setProperty("--anchor-shift", `${shift.toFixed(1)}px`);
    }
  });

  return <group ref={anchor} {...props} />;
};

export default ScreenAnchor;
