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

/** Wall-mounted operations dashboard for the hero room (replaces the old poster). */
export const createDashboardTexture = () => {
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
  ctx.fillStyle = "#94a3b8";
  ctx.font = "600 26px monospace";
  ctx.fillText("PRODUCTION · LIVE TELEMETRY", 48, 56);
  ctx.fillStyle = "#8fb3a0";
  ctx.beginPath();
  ctx.arc(width - 70, 56, 10, 0, Math.PI * 2);
  ctx.fill();

  // Headline label (neutral; no metric claims)
  ctx.fillStyle = "#e4e4e7";
  ctx.font = "600 84px Arial, Helvetica, sans-serif";
  ctx.fillText("SYSTEM STATUS", 48, 160);
  ctx.fillStyle = "#94a3b8";
  ctx.font = "26px monospace";
  ctx.fillText("ticketing · harbor · gates", 52, 236);

  // Service list
  const services = ["ticketing-api", "counter-apps", "harbor-sync", "gate-control"];
  ctx.font = "26px monospace";
  services.forEach((name, index) => {
    const y = 300 + index * 58;
    ctx.fillStyle = "#8fb3a0";
    ctx.beginPath();
    ctx.arc(60, y, 8, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#d4d4d8";
    ctx.fillText(name, 86, y);
    ctx.fillStyle = "#64748b";
    ctx.fillText("OK", 400, y);
  });

  // Throughput chart
  const chart = { x: 520, y: 120, w: 450, h: 380 };
  ctx.strokeStyle = "rgba(148, 163, 184, 0.15)";
  ctx.lineWidth = 2;
  for (let i = 0; i <= 4; i += 1) {
    const y = chart.y + (chart.h / 4) * i;
    ctx.beginPath();
    ctx.moveTo(chart.x, y);
    ctx.lineTo(chart.x + chart.w, y);
    ctx.stroke();
  }
  const random = seeded(19);
  const points = Array.from({ length: 24 }, (_, index) => {
    const t = index / 23;
    const value = 0.55 + 0.22 * Math.sin(t * Math.PI * 2.2) + (random() - 0.5) * 0.12;
    return [chart.x + t * chart.w, chart.y + chart.h * (1 - value)];
  });
  const fill = ctx.createLinearGradient(0, chart.y, 0, chart.y + chart.h);
  fill.addColorStop(0, "rgba(148, 163, 184, 0.22)");
  fill.addColorStop(1, "rgba(148, 163, 184, 0)");
  ctx.beginPath();
  ctx.moveTo(points[0][0], chart.y + chart.h);
  points.forEach(([x, y]) => ctx.lineTo(x, y));
  ctx.lineTo(points[points.length - 1][0], chart.y + chart.h);
  ctx.closePath();
  ctx.fillStyle = fill;
  ctx.fill();
  ctx.beginPath();
  points.forEach(([x, y], index) => (index === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y)));
  ctx.strokeStyle = "#a9b8c9";
  ctx.lineWidth = 3;
  ctx.stroke();
  ctx.fillStyle = "#64748b";
  ctx.font = "22px monospace";
  ctx.fillText("transactions / min", chart.x, chart.y + chart.h + 34);

  ctx.strokeStyle = "rgba(148, 163, 184, 0.2)";
  ctx.lineWidth = 3;
  ctx.strokeRect(14, 14, width - 28, height - 28);

  return toTexture(canvas);
};

/** Soft round sprite for particles. */
export const createDotTexture = () => {
  const size = 64;
  const canvas = createCanvas(size, size);
  const ctx = canvas.getContext("2d");
  const gradient = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  gradient.addColorStop(0, "rgba(255,255,255,1)");
  gradient.addColorStop(0.4, "rgba(255,255,255,0.6)");
  gradient.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, size, size);
  return toTexture(canvas);
};
