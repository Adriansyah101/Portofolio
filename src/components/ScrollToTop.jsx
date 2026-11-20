import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Jumps to the top of the page on every route change (below 1024px the
 * document scrolls; above it each page's own panes start at the top because
 * the page remounts).
 */
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname]);

  return null;
};

export default ScrollToTop;
