/**
 * Theme palettes for the three 3D scenes. The models themselves never change
 * between themes; only the room shell, the backdrop and the studio lighting
 * do, eased by `useThemeTween` when the visitor switches modes.
 *
 * Dark: a dim graphite studio on the obsidian page.
 * Light: a pale, softly daylit studio that sits calmly on the alabaster page.
 */

export const heroPalettes = {
  dark: {
    floor: "#26262a",
    wallBack: "#2c2c31",
    wallSide: "#29292e",
    cove: "#7d8087",
    rug: "#2c2a27",
    area: { color: "#e2e8f0", intensity: 5 },
    key: { color: "#f4f4f5", intensity: 210 },
    rim: { color: "#94a3b8", intensity: 40 },
    fill: { color: "#cbd5e1", intensity: 60 },
    warm: { color: "#e7c9a5", intensity: 3 },
    cool: { color: "#94a3b8", intensity: 2.5 },
    hemisphere: { color: "#e2e8f0", groundColor: "#141416", intensity: 1.5 },
    ambient: { color: "#52525b", intensity: 0.45 },
  },
  light: {
    floor: "#b9b6b1",
    wallBack: "#cfd2d7",
    wallSide: "#c6c9cf",
    cove: "#e2e8f0",
    rug: "#a39d94",
    area: { color: "#f8fafc", intensity: 3.5 },
    key: { color: "#fffaf2", intensity: 150 },
    rim: { color: "#cbd5e1", intensity: 30 },
    fill: { color: "#e2e8f0", intensity: 55 },
    warm: { color: "#f1d9bb", intensity: 2.5 },
    cool: { color: "#cbd5e1", intensity: 2 },
    hemisphere: { color: "#f8fafc", groundColor: "#8b8f97", intensity: 1.6 },
    ambient: { color: "#e2e8f0", intensity: 0.55 },
  },
};

export const techIconPalettes = {
  dark: {
    ambient: { color: "#e4e4e7", intensity: 0.35 },
    key: { color: "#f4f4f5", intensity: 1.4 },
    fill: { color: "#cbd5e1", intensity: 0.45 },
    accent: { color: "#94a3b8", intensity: 3 },
  },
  light: {
    ambient: { color: "#f8fafc", intensity: 0.7 },
    key: { color: "#ffffff", intensity: 1.6 },
    fill: { color: "#e2e8f0", intensity: 0.7 },
    accent: { color: "#cbd5e1", intensity: 2.2 },
  },
};

/**
 * `stage` is both the fog colour and the `.contact-canvas` background
 * (`--contact-stage` in index.css); keep the two in sync.
 */
export const contactPalettes = {
  dark: {
    stage: "#2a2825",
    floor: "#35322e",
    ambient: { color: "#f4f4f5", intensity: 0.5 },
    key: { color: "#f5eee6", intensity: 2.1 },
    fill: { color: "#cbd5e1", intensity: 0.7 },
    hemisphere: { color: "#e4e4e7", groundColor: "#3a3631", intensity: 0.35 },
  },
  light: {
    stage: "#e7e4df",
    floor: "#d9d5cf",
    ambient: { color: "#ffffff", intensity: 0.75 },
    key: { color: "#fff8ef", intensity: 2.2 },
    fill: { color: "#e2e8f0", intensity: 0.85 },
    hemisphere: { color: "#ffffff", groundColor: "#b9b3a9", intensity: 0.55 },
  },
};

export const paletteFor = (palettes, theme) => palettes[theme] ?? palettes.dark;
