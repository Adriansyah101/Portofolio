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

/** Wall poster for the hero room. */
export const createPosterTexture = () => {
  const width = 1024;
  const height = 576;
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext("2d");

  const gradient = ctx.createLinearGradient(0, 0, width, height);
  gradient.addColorStop(0, "#120a2e");
  gradient.addColorStop(0.55, "#3b1670");
  gradient.addColorStop(1, "#0b3b5c");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);

  // Perspective grid
  ctx.strokeStyle = "rgba(110, 231, 255, 0.35)";
  ctx.lineWidth = 2;
  for (let i = -10; i <= 10; i += 1) {
    ctx.beginPath();
    ctx.moveTo(width / 2, height * 0.58);
    ctx.lineTo(width / 2 + i * 120, height);
    ctx.stroke();
  }
  for (let i = 0; i < 6; i += 1) {
    const y = height * 0.58 + (i * i + 1) * 9;
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(width, y);
    ctx.stroke();
  }

  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.shadowColor = "#f472b6";
  ctx.shadowBlur = 30;
  ctx.fillStyle = "#ffffff";
  ctx.font = "900 150px Arial Black, Arial, sans-serif";
  ctx.fillText("RECOMP", width / 2, height * 0.36);

  ctx.shadowBlur = 0;
  ctx.fillStyle = "#6ee7ff";
  ctx.font = "600 34px monospace";
  ctx.fillText("NATIVE · 60 FPS · OPEN SOURCE", width / 2, height * 0.56);

  ctx.strokeStyle = "rgba(255, 255, 255, 0.6)";
  ctx.lineWidth = 6;
  ctx.strokeRect(18, 18, width - 36, height - 36);

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
