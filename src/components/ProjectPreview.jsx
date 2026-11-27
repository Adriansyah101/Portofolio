import { useState } from "react";
import { assetUrl } from "../utils/assets.js";
import { useLanguage } from "../context/LanguageContext.jsx";
import { tx } from "../utils/i18n.js";
import {
  AirportSchematic,
  IosLoaderSchematic,
  MacLoaderSchematic,
  SidafSchematic,
  WarplaneSchematic,
} from "./Schematics.jsx";

/* -------------------------------------------------------------------------- */
/*            Built-in SVG previews (used until a screenshot is set)          */
/* -------------------------------------------------------------------------- */

const PipelineArt = ({ label }) => {
  const stages = [
    { label: "VERTEX", sub: "GLES 2.0", color: "#6ee7ff" },
    { label: "VBO CACHE", sub: "reuse", color: "#82aaff" },
    { label: "MSAA", sub: "depth resolve", color: "#a78bfa" },
    { label: "POSTFX", sub: "bloom · spec", color: "#f472b6" },
    { label: "PRESENT", sub: "ANGLE", color: "#facc15" },
  ];

  return (
    <svg viewBox="0 0 800 500" preserveAspectRatio="xMidYMid slice" role="img" aria-label={label}>
      <defs>
        <pattern id="pipe-grid" width="32" height="32" patternUnits="userSpaceOnUse">
          <path d="M32 0H0V32" fill="none" stroke="#ffffff" strokeOpacity="0.05" />
        </pattern>
        <radialGradient id="pipe-glow" cx="0.5" cy="0.45" r="0.6">
          <stop offset="0" stopColor="#3b1d7a" stopOpacity="0.55" />
          <stop offset="1" stopColor="#000" stopOpacity="0" />
        </radialGradient>
        <marker id="pipe-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M0 0 L10 5 L0 10 Z" fill="#839cb5" />
        </marker>
      </defs>

      <rect width="800" height="500" fill="#07070c" />
      <rect width="800" height="500" fill="url(#pipe-grid)" />
      <rect width="800" height="500" fill="url(#pipe-glow)" />

      <g fontFamily="JetBrains Mono, monospace">
        {stages.map((stage, index) => {
          const x = 40 + index * 150;
          return (
            <g key={stage.label} transform={`translate(${x} 150)`}>
              <rect width="120" height="86" rx="14" fill="#0e0e10" stroke={stage.color} strokeOpacity="0.7" strokeWidth="1.5" />
              <rect x="14" y="14" width="22" height="4" rx="2" fill={stage.color} />
              <text x="14" y="50" fontSize="14" fontWeight="700" fill="#d9ecff">{stage.label}</text>
              <text x="14" y="70" fontSize="11" fill="#839cb5">{stage.sub}</text>
              {index < stages.length - 1 && (
                <line x1="124" y1="43" x2="146" y2="43" stroke="#839cb5" strokeWidth="2" markerEnd="url(#pipe-arrow)" />
              )}
            </g>
          );
        })}

        {/* Input branch */}
        <g transform="translate(250 300)">
          <rect width="300" height="120" rx="16" fill="#0e0e10" stroke="#2d2d38" />
          <g transform="translate(26 30)" stroke="#d9ecff" strokeWidth="2.4" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 8h44a20 20 0 0 1 19.6 24l-3.2 16a10 10 0 0 1-17.2 4.8L48 44H24l-9.2 8.8A10 10 0 0 1-2.4 48l-3.2-16A20 20 0 0 1 14 8Z" />
            <path d="M16 20v16M8 28h16" />
            <circle cx="56" cy="24" r="2" fill="#d9ecff" />
            <circle cx="64" cy="32" r="2" fill="#d9ecff" />
          </g>
          <text x="128" y="50" fontSize="14" fontWeight="700" fill="#d9ecff">CONTROLLER INPUT</text>
          <text x="128" y="72" fontSize="11" fill="#839cb5">menu snap navigation</text>
          <text x="128" y="90" fontSize="11" fill="#839cb5">rebindable keys & pads</text>
        </g>
        <path d="M400 300 V250" stroke="#839cb5" strokeWidth="2" strokeDasharray="5 5" markerEnd="url(#pipe-arrow)" />

        <text x="40" y="80" fontSize="13" fill="#839cb5">RENDER PIPELINE · SHARED ACROSS PORTS</text>
        <text x="40" y="104" fontSize="22" fontWeight="700" fill="#d9ecff">OpenGL ES → Desktop GPU</text>
        <text x="760" y="470" fontSize="12" fill="#839cb5" textAnchor="end">HYBRID GPU EXECUTION</text>
      </g>
    </svg>
  );
};

/* ---------------- Original projects and loaders: schematics (Schematics.jsx) ---------------- */

/**
 * Niskala Utilities: the app's own splash screen (src/Niskala.UI/Views/SplashWindow.xaml
 * in the NiskalaUtilities repository), redrawn as SVG: the NiskalaBrandBrush
 * gradient, the NiskalaMark monogram (same path data, 110 × 100 canvas) and
 * the NISKALA / UTILITIES wordmark with the splash's letter spacing.
 */
const NiskalaArt = ({ label }) => (
  // The viewBox hugs the logo and `meet` keeps it whole in any frame shape; the
  // oversized backdrop fills whatever the frame adds around it.
  <svg viewBox="200 80 400 330" preserveAspectRatio="xMidYMid meet" role="img" aria-label={label}>
    <defs>
      <linearGradient id="niskala-brand" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="0" y2="500">
        <stop offset="0" stopColor="#183D66" />
        <stop offset="1" stopColor="#08111E" />
      </linearGradient>
    </defs>
    <rect x="-4000" y="-4000" width="8800" height="8500" fill="url(#niskala-brand)" />

    {/* NiskalaMark, scaled 1.5× and centred (the splash nudges it 16px right). */}
    <g transform="translate(329.5 112) scale(1.5)">
      <path
        d="M89,9 L89,5 L70,5 L70,61 L18,5 L5,5 L5,95 L24,95 L24,40 L75,95 L89,95 L89,44"
        fill="none"
        stroke="#FFFFFF"
        strokeWidth="10"
        strokeLinejoin="miter"
        strokeMiterlimit="4"
        strokeLinecap="butt"
      />
      <path d="M84,9 L94,9 L84,19 Z M94,34 L94,44 L84,44 Z" fill="#FFFFFF" />
      <path d="M95,24 L109,10 L109,22 L95,36 Z" fill="#FFFFFF" />
    </g>

    {/* Wordmark: CharacterSpacing 320 and 420 (thousandths of an em) as letter-spacing. */}
    <text
      x="400"
      y="350"
      dx="7"
      textAnchor="middle"
      fontFamily="'Segoe UI Variable Display', 'Segoe UI', Inter, sans-serif"
      fontSize="45"
      fontWeight="300"
      letterSpacing="0.32em"
      fill="#FFFFFF"
    >
      NISKALA
    </text>
    <text
      x="400"
      y="384"
      dx="4"
      textAnchor="middle"
      fontFamily="'Segoe UI Variable Text', 'Segoe UI', Inter, sans-serif"
      fontSize="18"
      fontWeight="600"
      letterSpacing="0.42em"
      fill="#C4D6E8"
    >
      UTILITIES
    </text>
  </svg>
);

/** Accessible names for the artwork, in both languages. */
const artLabels = {
  pipeline: tx("OpenGL ES render pipeline diagram", "Diagram pipeline render OpenGL ES"),
  sidaf: tx(
    "Architecture schematic: browser, CodeIgniter controller, model, view and data store",
    "Skema arsitektur: browser, controller CodeIgniter, model, view, dan penyimpanan data",
  ),
  airport: tx(
    "Architecture schematic: airport scene tree, XR rig, Quest 2 and PCVR targets",
    "Skema arsitektur: scene tree bandara, XR rig, target Quest 2 dan PCVR",
  ),
  warplane: tx(
    "Architecture schematic: the per-frame step loop through input, kinematics, projectiles, waves, collision and drawing",
    "Skema arsitektur: loop step per frame melalui input, kinematika, proyektil, gelombang, tabrakan, dan penggambaran",
  ),
  iosloader: tx(
    "Architecture schematic: an ARMv7 Mach-O and its OpenGL ES calls pass through the static recompiler and runtime bridge to native x86 code on OpenGL 2.1",
    "Skema arsitektur: Mach-O ARMv7 dan panggilan OpenGL ES-nya melewati rekompiler statis dan runtime bridge menjadi kode x86 native di OpenGL 2.1",
  ),
  macloader: tx(
    "Architecture schematic: an i386 Mach-O and its dyld bind information pass through the user-space loader and ABI shim to Windows and Linux x86",
    "Skema arsitektur: Mach-O i386 dan informasi bind dyld-nya melewati loader user-space dan shim ABI menuju Windows dan Linux x86",
  ),
  niskala: tx("Niskala Utilities splash screen: the N monogram above the NISKALA UTILITIES wordmark", "Layar splash Niskala Utilities: monogram N di atas wordmark NISKALA UTILITIES"),
};

const artMap = {
  pipeline: PipelineArt,
  sidaf: SidafSchematic,
  airport: AirportSchematic,
  warplane: WarplaneSchematic,
  iosloader: IosLoaderSchematic,
  macloader: MacLoaderSchematic,
  niskala: NiskalaArt,
};

const videoText = {
  play: tx("Play video: {title}", "Putar video: {title}"),
  demo: tx("Watch demo", "Tonton demo"),
};

/**
 * Shows the project's screenshot when `image` is set and loads correctly;
 * otherwise renders the matching built-in SVG artwork.
 *
 * With `video` ({ youtubeId, title, kind?: "demo" }) the preview becomes a click-to-play
 * facade: the YouTube player (privacy-enhanced, no cookies until played) only
 * loads after the visitor presses play. `overlay` (for example a badge) is
 * shown on top of the poster and hidden while the video plays.
 */
const ProjectPreview = ({ art, image, imagePosition, video, alt, overlay = null, className = "" }) => {
  const [failed, setFailed] = useState(false);
  const [playing, setPlaying] = useState(false);
  const { lang } = useLanguage();
  const Art = artMap[art] ?? PipelineArt;
  const label = (artLabels[art] ?? artLabels.pipeline)[lang];
  const src = assetUrl(image);

  const poster =
    src && !failed ? (
      <img
        src={src}
        alt={video ? "" : alt}
        loading="lazy"
        style={imagePosition ? { objectPosition: imagePosition } : undefined}
        onError={() => setFailed(true)}
      />
    ) : (
      <Art label={label} />
    );

  if (!video) {
    return (
      <div className={`project-preview ${className}`}>
        {poster}
        {overlay}
      </div>
    );
  }

  return (
    <div className={`project-preview is-video ${className}`}>
      {playing ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${video.youtubeId}?autoplay=1&rel=0&playsinline=1`}
          title={video.title}
          allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      ) : (
        <>
          <button
            type="button"
            className="video-facade"
            onClick={() => setPlaying(true)}
            aria-label={videoText.play[lang].replace("{title}", video.title)}
          >
            {poster}
            <span className="video-play" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5.14v13.72a1 1 0 0 0 1.52.85l10.6-6.86a1 1 0 0 0 0-1.7L9.52 4.29A1 1 0 0 0 8 5.14Z" />
              </svg>
            </span>
            <span className="video-chip" aria-hidden="true">
              {(videoText[video.kind] ?? videoText.demo)[lang]}
            </span>
          </button>
          {overlay}
        </>
      )}
    </div>
  );
};

export default ProjectPreview;
