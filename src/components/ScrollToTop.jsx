import { useEffect, useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Jumps to the top of the page on every route change. It runs as a layout
 * effect before the new page's GSAP triggers are created, so their start and
 * end positions are measured from the top. A refresh on the next frame picks
 * up late layout changes such as canvases sizing themselves.
 */
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname]);

  useEffect(() => {
    const frame = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => cancelAnimationFrame(frame);
  }, [pathname]);

  return null;
};

export default ScrollToTop;
