import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

/**
 * Web fonts used across the site. The first render waits (at most
 * FONT_WAIT_MS) until they have loaded, so text is laid out once with its
 * final metrics and the late `font-display: swap` never shifts the layout.
 * Repeat visits read the fonts from cache and render immediately; if the font
 * CDN is slow or blocked, the site renders with the system fallback fonts.
 */
const FONTS = ['400 16px "Mona Sans"', '600 16px "Mona Sans"', '400 16px "JetBrains Mono"'];
const FONT_WAIT_MS = 1500;

const fontsLoaded = () => {
  if (!document.fonts?.load) return Promise.resolve();
  const timeout = new Promise((resolve) => setTimeout(resolve, FONT_WAIT_MS));
  const load = Promise.all(FONTS.map((spec) => document.fonts.load(spec))).catch(() => {});
  return Promise.race([load, timeout]);
};

fontsLoaded().then(() => {
  createRoot(document.getElementById("root")).render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
});
