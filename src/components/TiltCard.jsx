import { useEffect, useRef } from "react";

/** Largest tilt either way, in degrees, at the card's edges. */
const MAX_TILT = 6;

const reducedMotion = () => typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

/**
 * Flat card that tilts toward the cursor in CSS 3D (`.tilt-card` in index.css:
 * `perspective(900px) rotateX rotateY`, `preserve-3d`, a soft specular sheen).
 * The pointer position is written to CSS variables once per frame, so the
 * motion never re-renders React. It settles back on `pointerleave`, ignores
 * touch (a swipe should scroll, not tilt) and stays flat under
 * `prefers-reduced-motion: reduce`. Keyboard focus gets the same lift through
 * `:focus-visible`.
 */
const TiltCard = ({ as: Tag = "article", className = "", children, ...rest }) => {
  const ref = useRef(null);
  const frame = useRef(0);

  useEffect(() => () => cancelAnimationFrame(frame.current), []);

  const onPointerMove = (event) => {
    if (event.pointerType === "touch" || reducedMotion()) return;
    const node = ref.current;
    const { clientX, clientY } = event;
    cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      const rect = node.getBoundingClientRect();
      const x = Math.min(1, Math.max(0, (clientX - rect.left) / rect.width));
      const y = Math.min(1, Math.max(0, (clientY - rect.top) / rect.height));
      node.style.setProperty("--tilt-x", `${((0.5 - y) * 2 * MAX_TILT).toFixed(2)}deg`);
      node.style.setProperty("--tilt-y", `${((x - 0.5) * 2 * MAX_TILT).toFixed(2)}deg`);
      node.style.setProperty("--sheen-x", `${(x * 100).toFixed(1)}%`);
      node.style.setProperty("--sheen-y", `${(y * 100).toFixed(1)}%`);
      node.dataset.tilt = "";
    });
  };

  const onPointerLeave = () => {
    cancelAnimationFrame(frame.current);
    const node = ref.current;
    for (const name of ["--tilt-x", "--tilt-y", "--sheen-x", "--sheen-y"]) node.style.removeProperty(name);
    delete node.dataset.tilt;
  };

  return (
    <Tag ref={ref} className={`tilt-card ${className}`} onPointerMove={onPointerMove} onPointerLeave={onPointerLeave} {...rest}>
      {children}
    </Tag>
  );
};

export default TiltCard;
