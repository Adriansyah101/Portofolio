import * as THREE from "three";

/**
 * Procedural CanvasTexture generators. Drawing labels and screens on a 2D
 * canvas keeps every 3D scene free of external font or image downloads.
 */

const createCanvas = (width, height) => {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  return canvas;
};

const toTexture = (canvas) => {
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 4;
  texture.needsUpdate = true;
  return texture;
};

/** Deterministic pseudo-random generator so screens look identical on reload. */
const seeded = (seed) => {
  let state = seed;
  return () => {
    state = (state * 16807) % 2147483647;
    return (state - 1) / 2147483646;
  };
};

/** Centered text label on a transparent background. */
export const createLabelTexture = ({
  text,
  color = "#ffffff",
  font = "bold 180px Arial, Helvetica, sans-serif",
  width = 512,
  height = 256,
  glow = null,
}) => {
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, width, height);
  ctx.font = font;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  if (glow) {
    ctx.shadowColor = glow;
    ctx.shadowBlur = 28;
  }
  ctx.fillStyle = color;
  ctx.fillText(text, width / 2, height / 2);
  if (glow) ctx.fillText(text, width / 2, height / 2);
  return toTexture(canvas);
};

/**
 * IDE-style code screen. The canvas holds two identical halves so scrolling
 * `texture.offset.y` with `repeat.y = 0.5` loops seamlessly.
 */
export const createCodeTexture = ({ seed = 7, accent = "#6ee7ff" } = {}) => {
  const width = 1024;
  const half = 640;
  const canvas = createCanvas(width, half * 2);
  const ctx = canvas.getContext("2d");
  const random = seeded(seed);

  const palette = ["#c792ea", "#82aaff", "#c3e88d", "#f78c6c", "#89ddff", "#ffcb6b", "#d9ecff"];
  const indents = [0, 1, 2, 2, 1, 2, 3, 3, 2, 1, 0, 0, 1, 2, 2, 3, 2, 1, 1, 0];
  const lineHeight = half / indents.length;

  ctx.fillStyle = "#0b0d17";
  ctx.fillRect(0, 0, width, half);

  // Gutter
  ctx.fillStyle = "#10131f";
  ctx.fillRect(0, 0, 76, half);
  ctx.fillStyle = accent;
  ctx.globalAlpha = 0.6;
  ctx.fillRect(76, 0, 2, half);
  ctx.globalAlpha = 1;

  indents.forEach((indent, line) => {
    const y = line * lineHeight + lineHeight / 2;

    ctx.fillStyle = "#3b4261";
    ctx.font = "18px monospace";
    ctx.textBaseline = "middle";
    ctx.fillText(String(line + 1).padStart(3, " "), 18, y);

    let x = 104 + indent * 36;
    const tokens = 2 + Math.floor(random() * 5);
    for (let t = 0; t < tokens; t += 1) {
      const tokenWidth = 28 + random() * 150;
      if (x + tokenWidth > width - 40) break;
      ctx.fillStyle = palette[Math.floor(random() * palette.length)];
      ctx.globalAlpha = 0.92;
      ctx.beginPath();
      ctx.roundRect(x, y - 7, tokenWidth, 14, 4);
      ctx.fill();
      x += tokenWidth + 14;
    }
    ctx.globalAlpha = 1;
  });

  // Cursor highlight line
  ctx.fillStyle = "rgba(110, 231, 255, 0.07)";
  ctx.fillRect(78, lineHeight * 6, width - 78, lineHeight);

  // Duplicate the first half for seamless vertical looping.
  ctx.drawImage(canvas, 0, 0, width, half, 0, half, width, half);

  const texture = toTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(1, 0.5);
  return texture;
};

/**
 * Terminal screen with ops-style shell output. Like the code texture it holds
 * two identical halves so it can scroll and loop seamlessly.
 */
// Muted palette: slate prompt, sage "ok" states, zinc output.
const T_PROMPT = "#94a3b8";
const T_OK = "#8fb3a0";
const T_CMD = "#d4d4d8";
const T_OUT = "#a1a1aa";

const TERMINAL_LINES = [
  ["$ ", T_PROMPT, "systemctl status ticketing.service", T_CMD],
  ["● ", T_OK, "ticketing.service - Ticketing API", T_OUT],
  ["  ", null, "Active: active (running)", T_OK],
  ["$ ", T_PROMPT, "./deploy.sh counter-app --harbor all", T_CMD],
  ["[OK] ", T_OK, "harbor-node-01   counter-app   synced", T_OUT],
  ["[OK] ", T_OK, "harbor-node-02   counter-app   synced", T_OUT],
  ["[OK] ", T_OK, "cloud-edge       ticketing     healthy", T_OUT],
  ["$ ", T_PROMPT, "gatectl status --site surabaya", T_CMD],
  ["  ", null, "plc: online   gates: 4/4   mode: auto", T_OUT],
  ["$ ", T_PROMPT, "curl -s api/health | jq .status", T_CMD],
  ["  ", null, '"ok"', T_OK],
  ["$ ", T_PROMPT, "cat /proc/loadavg", T_CMD],
  ["  ", null, "0.42 0.38 0.35 1/312", "#71717a"],
  ["$ ", T_PROMPT, "_", T_CMD],
];

export const createTerminalTexture = ({ accent = "#94a3b8" } = {}) => {
  const width = 1024;
  const half = 640;
  const canvas = createCanvas(width, half * 2);
  const ctx = canvas.getContext("2d");
  const lineHeight = (half - 70) / TERMINAL_LINES.length;

  ctx.fillStyle = "#0c0d10";
  ctx.fillRect(0, 0, width, half);

  // Title bar
  ctx.fillStyle = "#16171b";
  ctx.fillRect(0, 0, width, 48);
  ["#334155", "#334155", "#334155"].forEach((color, index) => {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(28 + index * 26, 24, 7, 0, Math.PI * 2);
    ctx.fill();
  });
  ctx.fillStyle = "#94a3b8";
  ctx.font = "22px monospace";
  ctx.textBaseline = "middle";
  ctx.fillText("ops@harbor-gw: ~", 120, 25);
  ctx.fillStyle = accent;
  ctx.globalAlpha = 0.25;
  ctx.fillRect(0, 47, width, 2);
  ctx.globalAlpha = 1;

  ctx.font = "26px monospace";
  TERMINAL_LINES.forEach(([prefix, prefixColor, text, color], line) => {
    const y = 70 + line * lineHeight + lineHeight / 2;
    let x = 36;
    if (prefixColor) {
      ctx.fillStyle = prefixColor;
      ctx.fillText(prefix, x, y);
    }
    x += ctx.measureText(prefix).width;
    ctx.fillStyle = color;
    ctx.fillText(text, x, y);
  });

  ctx.drawImage(canvas, 0, 0, width, half, 0, half, width, half);

  const texture = toTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(1, 0.5);
  return texture;
};

/* -------------------------------------------------------------------------- */
/*            Hero navigation screens (one per page of the portfolio)          */
/* -------------------------------------------------------------------------- */

// Shared muted palette. Every value stays well under the hero's bloom
// threshold, so the screens read as calm displays in both themes.
const S = {
  bg: "#0d0e11",
  bgTop: "#121419",
  panel: "#16181d",
  border: "rgba(148, 163, 184, 0.22)",
  text: "#e4e4e7",
  soft: "#c4cad3",
  muted: "#94a3b8",
  dim: "#64748b",
  sage: "#8fb3a0",
  blue: "#7c98b6",
  sand: "#c8b27e",
};
const SANS = '"Segoe UI", Arial, Helvetica, sans-serif';
const MONO = "Consolas, ui-monospace, Menlo, monospace";

const font = (size, weight = 400, family = SANS) => `${weight} ${size}px ${family}`;

const panel = (ctx, x, y, w, h, { fill = S.panel, stroke = S.border, radius = 14 } = {}) => {
  ctx.beginPath();
  ctx.roundRect(x, y, w, h, radius);
  ctx.fillStyle = fill;
  ctx.fill();
  if (stroke) {
    ctx.strokeStyle = stroke;
    ctx.lineWidth = 2;
    ctx.stroke();
  }
};

const dot = (ctx, x, y, r, color) => {
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2);
  ctx.fillStyle = color;
  ctx.fill();
};

/** Window chrome: background, title bar with three dots and a title. */
const windowFrame = (ctx, width, height, title, accent = S.muted) => {
  const gradient = ctx.createLinearGradient(0, 0, 0, height);
  gradient.addColorStop(0, S.bgTop);
  gradient.addColorStop(1, S.bg);
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);

  ctx.fillStyle = "#17191e";
  ctx.fillRect(0, 0, width, 58);
  [0, 1, 2].forEach((index) => dot(ctx, 34 + index * 30, 29, 8, "#334155"));
  ctx.textBaseline = "middle";
  ctx.fillStyle = S.muted;
  ctx.font = font(24, 400, MONO);
  ctx.fillText(title, 140, 30);
  ctx.fillStyle = accent;
  ctx.globalAlpha = 0.35;
  ctx.fillRect(0, 57, width, 2);
  ctx.globalAlpha = 1;
};

/** "OPEN /route ›" chip in the bottom-right corner: the screen's call to action. */
const routeChip = (ctx, width, height, route, color) => {
  ctx.font = font(24, 600, MONO);
  const label = `OPEN ${route} ›`;
  const w = ctx.measureText(label).width + 40;
  const x = width - w - 28;
  const y = height - 66;
  panel(ctx, x, y, w, 44, { fill: "rgba(148, 163, 184, 0.08)", stroke: color, radius: 22 });
  ctx.fillStyle = color;
  ctx.textBaseline = "middle";
  ctx.fillText(label, x + 20, y + 23);
};

/**
 * Wall dashboard → `/journey`: the production estate Adriansyah operates.
 * Status words only; no uptime or throughput figures.
 */
export const createJourneyDashboardTexture = () => {
  const width = 1024;
  const height = 576;
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext("2d");

  const gradient = ctx.createLinearGradient(0, 0, width, height);
  gradient.addColorStop(0, "#0e0f12");
  gradient.addColorStop(1, "#16181c");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);
  ctx.textBaseline = "middle";

  // Header
  ctx.fillStyle = S.muted;
  ctx.font = font(25, 600, MONO);
  ctx.fillText("PT ASDP INDONESIA FERRY (PERSERO)", 44, 52);
  dot(ctx, width - 150, 52, 9, S.sage);
  ctx.fillStyle = S.sage;
  ctx.font = font(22, 600, MONO);
  ctx.fillText("LIVE OPS", width - 130, 53);

  ctx.fillStyle = S.text;
  ctx.font = font(62, 600);
  ctx.fillText("trip.ferizy.com", 44, 126);
  ctx.fillStyle = S.dim;
  ctx.font = font(23, 400, MONO);
  ctx.fillText("national ferry ticketing · production", 48, 178);

  // Deployment nodes
  panel(ctx, 36, 212, 520, 318);
  ctx.fillStyle = S.muted;
  ctx.font = font(21, 600, MONO);
  ctx.fillText("DEPLOYMENT NODES", 62, 248);
  const nodes = [
    ["cloud", "ticketing-api", "healthy"],
    ["cloud", "web · trip.ferizy", "healthy"],
    ["harbor", "harbor-node-01", "synced"],
    ["harbor", "harbor-node-02", "synced"],
  ];
  nodes.forEach(([kind, name, state], index) => {
    const y = 300 + index * 56;
    dot(ctx, 70, y, 8, S.sage);
    ctx.fillStyle = kind === "cloud" ? S.blue : S.sand;
    ctx.font = font(19, 600, MONO);
    ctx.fillText(kind.toUpperCase(), 92, y);
    ctx.fillStyle = S.soft;
    ctx.font = font(25, 400, MONO);
    ctx.fillText(name, 186, y);
    ctx.fillStyle = S.dim;
    ctx.font = font(21, 400, MONO);
    ctx.fillText(state, 446, y);
  });

  // Omron barrier gate (Surabaya)
  panel(ctx, 580, 212, 408, 318);
  ctx.fillStyle = S.muted;
  ctx.font = font(21, 600, MONO);
  ctx.fillText("SURABAYA · OMRON GATE", 604, 248);
  ["ENTRY", "EXIT"].forEach((lane, index) => {
    const x = 618 + index * 186;
    const y = 300;
    // Gate post and a raised barrier arm (kept clear of the panel title).
    ctx.fillStyle = "#2a2e36";
    ctx.fillRect(x, y + 34, 34, 82);
    ctx.save();
    ctx.translate(x + 26, y + 48);
    ctx.rotate(-0.7);
    ctx.fillStyle = S.soft;
    ctx.fillRect(0, -7, 104, 14);
    ctx.fillStyle = "#b45f5f";
    [26, 64].forEach((stripe) => ctx.fillRect(stripe, -7, 16, 14));
    ctx.restore();
    dot(ctx, x + 17, y + 66, 7, S.sage);
    ctx.fillStyle = S.text;
    ctx.font = font(21, 600, MONO);
    ctx.fillText(lane, x, y + 140);
    ctx.fillStyle = S.sage;
    ctx.font = font(19, 400, MONO);
    ctx.fillText("online", x, y + 166);
  });
  ctx.fillStyle = S.dim;
  ctx.font = font(19, 400, MONO);
  ctx.fillText("PLC link: up · mode: auto", 604, 506);

  ctx.strokeStyle = "rgba(148, 163, 184, 0.2)";
  ctx.lineWidth = 3;
  ctx.strokeRect(12, 12, width - 24, height - 24);
  return toTexture(canvas);
};

/** Left desk monitor → `/projects`: the original / preservation split. */
export const createProjectsScreenTexture = () => {
  const width = 1024;
  const height = 548;
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext("2d");
  windowFrame(ctx, width, height, "~/projects", S.sage);

  ctx.fillStyle = S.text;
  ctx.font = font(44, 600);
  ctx.fillText("Projects", 40, 108);
  ctx.fillStyle = S.dim;
  ctx.font = font(22, 400, MONO);
  ctx.fillText("original builds · legacy preservation", 240, 110);

  const columns = [
    { x: 36, title: "ORIGINAL", color: S.sage, items: ["SIDAF", "VR Airport", "War Plane 1945"] },
    { x: 524, title: "LEGACY PRESERVATION", color: S.blue, items: ["iOS Loader · ARMv7", "Mac Loader · i386"] },
  ];
  columns.forEach(({ x, title, color, items }) => {
    panel(ctx, x, 146, 464, 290);
    ctx.fillStyle = color;
    ctx.fillRect(x + 24, 178, 6, 30);
    ctx.font = font(24, 700, MONO);
    ctx.fillText(title, x + 44, 194);
    items.forEach((item, index) => {
      const y = 254 + index * 62;
      panel(ctx, x + 24, y - 21, 42, 42, { fill: "rgba(148, 163, 184, 0.1)", stroke: null, radius: 9 });
      ctx.fillStyle = color;
      ctx.fillRect(x + 37, y - 8, 16, 16);
      ctx.fillStyle = S.text;
      ctx.font = font(32, 500);
      ctx.fillText(item, x + 84, y + 1);
    });
  });

  routeChip(ctx, width, height, "/projects", S.sage);
  return toTexture(canvas);
};

/** Right desk monitor → `/notes`: an architecture-diagram style notes window. */
export const createNotesScreenTexture = () => {
  const width = 1024;
  const height = 548;
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext("2d");
  windowFrame(ctx, width, height, "engineering-notes.md", S.blue);

  ctx.fillStyle = S.text;
  ctx.font = font(40, 700, MONO);
  ctx.fillText("ENGINEERING NOTES", 40, 108);

  const box = (x, y, w, label, sub, color) => {
    panel(ctx, x, y, w, 92, { stroke: color });
    ctx.fillStyle = S.text;
    ctx.font = font(27, 600);
    ctx.fillText(label, x + 20, y + 34);
    ctx.fillStyle = S.dim;
    ctx.font = font(19, 400, MONO);
    ctx.fillText(sub, x + 20, y + 68);
  };
  const arrow = (x1, x2, y, both = false) => {
    ctx.strokeStyle = S.muted;
    ctx.fillStyle = S.muted;
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(x1, y);
    ctx.lineTo(x2, y);
    ctx.stroke();
    const head = (x, dir) => {
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x - 14 * dir, y - 9);
      ctx.lineTo(x - 14 * dir, y + 9);
      ctx.closePath();
      ctx.fill();
    };
    head(x2, 1);
    if (both) head(x1, -1);
  };

  // Note 1: OpenGL ES 32-bit → Win32
  ctx.fillStyle = S.muted;
  ctx.font = font(20, 600, MONO);
  ctx.fillText("01  OpenGL ES 32-Bit → Win32", 40, 158);
  box(40, 178, 380, "OpenGL ES · iPad", "armv7 · 32-bit binary", S.sand);
  arrow(432, 562, 224);
  box(574, 178, 410, "Win32 · native", "static recompilation · C/C++", S.blue);

  // Note 2: hybrid harbor / cloud ops
  ctx.fillStyle = S.muted;
  ctx.font = font(20, 600, MONO);
  ctx.fillText("02  Hybrid Harbor/Cloud Ops", 40, 310);
  box(40, 330, 380, "Harbor · on-prem", "counter apps · gates", S.sand);
  arrow(432, 562, 376, true);
  box(574, 330, 410, "Cloud · ticketing", "sync · health checks", S.blue);

  routeChip(ctx, width, height, "/notes", S.blue);
  return toTexture(canvas);
};

/** Desk tablet → `/contact`: an inbox with a compose button. */
export const createContactScreenTexture = () => {
  const width = 768;
  const height = 540;
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext("2d");

  const gradient = ctx.createLinearGradient(0, 0, 0, height);
  gradient.addColorStop(0, "#14161b");
  gradient.addColorStop(1, S.bg);
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);
  ctx.textBaseline = "middle";

  // Status bar
  ctx.fillStyle = S.dim;
  ctx.font = font(20, 600, MONO);
  ctx.fillText("09:41", 30, 30);
  ctx.fillRect(width - 74, 22, 40, 16);

  ctx.fillStyle = S.muted;
  ctx.font = font(24, 700, MONO);
  ctx.fillText("CONTACT", 34, 86);
  ctx.fillStyle = S.text;
  ctx.font = font(52, 600);
  ctx.fillText("Send a Message", 32, 142);

  // Inbox rows: avatar dot and placeholder lines, no real names or addresses.
  [S.sage, S.blue, S.sand].forEach((color, index) => {
    const y = 196 + index * 84;
    panel(ctx, 28, y, width - 56, 70, { radius: 12 });
    dot(ctx, 68, y + 35, 18, color);
    ctx.fillStyle = index === 0 ? S.soft : "#3a3f48";
    ctx.fillRect(102, y + 20, 220 - index * 30, 12);
    ctx.fillStyle = "#2b3038";
    ctx.fillRect(102, y + 42, 380 - index * 50, 10);
    if (index === 0) dot(ctx, width - 62, y + 35, 8, S.sage);
  });

  // Compose button
  panel(ctx, 28, height - 74, width - 56, 54, { fill: "rgba(143, 179, 160, 0.16)", stroke: S.sage, radius: 27 });
  ctx.fillStyle = S.text;
  ctx.font = font(26, 600);
  ctx.textAlign = "center";
  ctx.fillText("Compose", width / 2, height - 46);
  ctx.textAlign = "left";

  return toTexture(canvas);
};
