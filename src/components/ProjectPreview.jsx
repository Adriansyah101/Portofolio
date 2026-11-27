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

const RacingArt = ({ label }) => (
  <svg viewBox="0 0 800 500" preserveAspectRatio="xMidYMid slice" role="img" aria-label={label}>
    <defs>
      <linearGradient id="race-sky" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#05060f" />
        <stop offset="0.55" stopColor="#1b1145" />
        <stop offset="1" stopColor="#3a1660" />
      </linearGradient>
      <radialGradient id="race-sun" cx="0.5" cy="0.5" r="0.5">
        <stop offset="0" stopColor="#ffb86b" stopOpacity="0.95" />
        <stop offset="0.45" stopColor="#ff5e9a" stopOpacity="0.45" />
        <stop offset="1" stopColor="#ff5e9a" stopOpacity="0" />
      </radialGradient>
      <linearGradient id="race-road" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#141428" />
        <stop offset="1" stopColor="#07070d" />
      </linearGradient>
      <linearGradient id="race-car" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stopColor="#1e3a8a" />
        <stop offset="0.5" stopColor="#2563eb" />
        <stop offset="1" stopColor="#1e3a8a" />
      </linearGradient>
      <linearGradient id="race-speed" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stopColor="#6ee7ff" stopOpacity="0" />
        <stop offset="1" stopColor="#6ee7ff" stopOpacity="0.8" />
      </linearGradient>
    </defs>

    <rect width="800" height="500" fill="url(#race-sky)" />
    <circle cx="400" cy="235" r="170" fill="url(#race-sun)" />

    {/* Distant mountains */}
    <path d="M0 250 L90 200 L170 235 L260 180 L350 228 L430 195 L520 232 L610 188 L700 226 L800 200 V260 H0 Z" fill="#120c2e" />

    {/* Grid floor */}
    <g stroke="#a78bfa" strokeOpacity="0.25" strokeWidth="1">
      {[262, 275, 292, 316, 350, 396, 460].map((y) => (
        <line key={y} x1="0" y1={y} x2="800" y2={y} />
      ))}
      {[-600, -400, -200, 0, 200, 400, 600, 800, 1000, 1200, 1400].map((x) => (
        <line key={x} x1="400" y1="255" x2={x} y2="500" />
      ))}
    </g>

    {/* Road */}
    <path d="M370 255 L430 255 L700 500 L100 500 Z" fill="url(#race-road)" />
    <path d="M370 255 L100 500" stroke="#f472b6" strokeWidth="4" />
    <path d="M430 255 L700 500" stroke="#6ee7ff" strokeWidth="4" />
    {[
      [398, 268, 4, 10],
      [396, 292, 8, 18],
      [393, 330, 14, 30],
      [388, 392, 24, 50],
      [380, 470, 40, 40],
    ].map(([x, y, w, h]) => (
      <rect key={y} x={x} y={y} width={w} height={h} fill="#d9ecff" opacity="0.85" />
    ))}

    {/* Speed lines */}
    <g strokeLinecap="round">
      <line x1="40" y1="330" x2="220" y2="330" stroke="url(#race-speed)" strokeWidth="3" />
      <line x1="10" y1="380" x2="230" y2="380" stroke="url(#race-speed)" strokeWidth="2" />
      <line x1="560" y1="340" x2="760" y2="340" stroke="url(#race-speed)" strokeWidth="3" transform="rotate(180 660 340)" />
      <line x1="580" y1="400" x2="790" y2="400" stroke="url(#race-speed)" strokeWidth="2" transform="rotate(180 685 400)" />
    </g>

    {/* Car (rear view) */}
    <g transform="translate(400 420)">
      <ellipse cx="0" cy="48" rx="120" ry="12" fill="#000" opacity="0.6" />
      <path d="M-110 30 L-96 -6 L-60 -34 L60 -34 L96 -6 L110 30 L104 44 L-104 44 Z" fill="url(#race-car)" />
      <path d="M-56 -30 L56 -30 L80 -6 L-80 -6 Z" fill="#0b1020" opacity="0.9" />
      <rect x="-118" y="-46" width="236" height="10" rx="3" fill="#0f172a" />
      <rect x="-104" y="6" width="44" height="12" rx="3" fill="#ff3b5c" />
      <rect x="60" y="6" width="44" height="12" rx="3" fill="#ff3b5c" />
      <rect x="-30" y="22" width="60" height="12" rx="2" fill="#d9ecff" opacity="0.85" />
      <rect x="-116" y="30" width="34" height="18" rx="4" fill="#05050a" />
      <rect x="82" y="30" width="34" height="18" rx="4" fill="#05050a" />
    </g>

    {/* HUD */}
    <g fontFamily="JetBrains Mono, monospace" fill="#d9ecff">
      <rect x="24" y="22" width="148" height="58" rx="10" fill="#000" opacity="0.45" stroke="#6ee7ff" strokeOpacity="0.4" />
      <text x="40" y="47" fontSize="13" fill="#839cb5">FRAMERATE</text>
      <text x="40" y="70" fontSize="22" fontWeight="700" fill="#6ee7ff">60 FPS</text>

      <rect x="590" y="22" width="186" height="118" rx="10" fill="#000" opacity="0.45" stroke="#a78bfa" strokeOpacity="0.4" />
      <text x="606" y="46" fontSize="12" fill="#839cb5">CLOUD LEADERBOARD</text>
      {[
        ["01", "PC_RACER", "1:12.40"],
        ["02", "APEX_GL", "1:13.08"],
        ["03", "RECOMP", "1:13.91"],
      ].map(([pos, name, time], index) => (
        <g key={pos} transform={`translate(606 ${70 + index * 22})`}>
          <text fontSize="13" fill="#a78bfa">{pos}</text>
          <text x="30" fontSize="13">{name}</text>
          <text x="104" fontSize="13" fill="#6ee7ff">{time}</text>
        </g>
      ))}

      <rect x="14" y="460" width="256" height="26" rx="13" fill="#000" opacity="0.65" />
      <text x="28" y="478" fontSize="12" fill="#839cb5">POSTFX · MOTION BLUR · MSAA 4X</text>
      <rect x="640" y="460" width="146" height="26" rx="13" fill="#000" opacity="0.65" />
      <text x="772" y="478" fontSize="12" fill="#839cb5" textAnchor="end">v1.0.0 · WINDOWS</text>
    </g>
  </svg>
);

const MiamiArt = ({ label }) => (
  <svg viewBox="0 0 800 500" preserveAspectRatio="xMidYMid slice" role="img" aria-label={label}>
    <defs>
      <linearGradient id="miami-sky" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#12062b" />
        <stop offset="0.45" stopColor="#5b1a6e" />
        <stop offset="0.75" stopColor="#e2557b" />
        <stop offset="1" stopColor="#ffb36b" />
      </linearGradient>
      <linearGradient id="miami-sun" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#ffe29a" />
        <stop offset="1" stopColor="#ff5e9a" />
      </linearGradient>
      <linearGradient id="miami-water" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#2a0f4a" />
        <stop offset="1" stopColor="#07030f" />
      </linearGradient>
      <clipPath id="miami-sun-clip">
        <circle cx="400" cy="300" r="130" />
      </clipPath>
    </defs>

    <rect width="800" height="500" fill="url(#miami-sky)" />

    {/* Striped retro sun */}
    <g clipPath="url(#miami-sun-clip)">
      <rect x="270" y="170" width="260" height="260" fill="url(#miami-sun)" />
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <rect key={i} x="270" y={262 + i * 14} width="260" height={3 + i * 1.6} fill="#5b1a6e" />
      ))}
    </g>

    {/* Skyline */}
    <g fill="#14072a">
      {[
        [40, 230, 50],
        [96, 200, 38],
        [140, 250, 60],
        [206, 180, 34],
        [246, 225, 46],
        [520, 210, 44],
        [570, 170, 36],
        [612, 236, 58],
        [676, 196, 40],
        [722, 244, 60],
      ].map(([x, y, w]) => (
        <rect key={x} x={x} y={y} width={w} height={340 - y} />
      ))}
    </g>
    <g fill="#ffd166" opacity="0.75">
      {Array.from({ length: 40 }, (_, i) => {
        const columns = [52, 70, 106, 154, 176, 214, 256, 274, 530, 548, 580, 624, 646, 686, 734, 756];
        const x = columns[i % columns.length];
        const y = 240 + ((i * 37) % 90);
        return <rect key={i} x={x} y={y} width="6" height="8" />;
      })}
    </g>

    {/* Water + reflections */}
    <rect x="0" y="340" width="800" height="160" fill="url(#miami-water)" />
    {[352, 366, 382, 400, 422].map((y, i) => (
      <rect key={y} x={330 + i * 8} y={y} width={140 - i * 16} height="3" rx="1.5" fill="#ff8fab" opacity={0.8 - i * 0.12} />
    ))}

    {/* Palm trees */}
    {[
      { x: 110, scale: 1 },
      { x: 690, scale: 1.15, flip: true },
    ].map(({ x, scale, flip }) => (
      <g key={x} transform={`translate(${x} 340) scale(${flip ? -scale : scale} ${scale})`} fill="#0a0418">
        <path d="M0 0 C 6 -60 14 -120 30 -170 L 38 -168 C 24 -118 16 -60 12 0 Z" />
        <path d="M34 -170 C 0 -200 -50 -196 -80 -170 C -46 -182 -10 -178 34 -164 Z" />
        <path d="M34 -170 C 70 -206 120 -200 150 -170 C 110 -184 74 -180 36 -162 Z" />
        <path d="M34 -170 C 20 -214 -10 -236 -40 -240 C -16 -220 8 -196 30 -164 Z" />
        <path d="M34 -170 C 58 -220 92 -236 120 -236 C 92 -214 66 -194 38 -162 Z" />
        <path d="M34 -170 C -10 -150 -40 -120 -50 -90 C -24 -120 4 -144 36 -164 Z" />
        <path d="M34 -170 C 78 -150 104 -122 112 -94 C 86 -122 60 -144 32 -164 Z" />
      </g>
    ))}

    {/* Release HUD */}
    <g fontFamily="JetBrains Mono, monospace">
      <rect x="24" y="22" width="232" height="38" rx="19" fill="#000" opacity="0.45" stroke="#f472b6" strokeOpacity="0.5" />
      <text x="40" y="46" fontSize="14" fill="#ffd1e8">V1.0.0 · WIN x86 · LINUX</text>
      <text x="776" y="478" fontSize="12" fill="#ffd1e8" opacity="0.8" textAnchor="end">SHA-256 VERIFIED</text>
    </g>
  </svg>
);

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
  racing: tx("Stylized night race track with a 60 FPS HUD", "Ilustrasi lintasan balap malam dengan HUD 60 FPS"),
  miami: tx("Neon sunset city skyline with palm trees", "Ilustrasi siluet kota saat matahari terbenam dengan pohon palem"),
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
    "Architecture schematic: ARMv7 code recompiled at build time; Mach-O data mapped and bound to host bridges at run time",
    "Skema arsitektur: kode ARMv7 direkompilasi saat build; data Mach-O dipetakan dan ditautkan ke host bridge saat runtime",
  ),
  macloader: tx(
    "Architecture schematic: the reserved address range beside the parse, copy, patch and bind sequence and the host shims",
    "Skema arsitektur: rentang alamat cadangan di samping urutan parse, copy, patch, dan bind serta host shim",
  ),
  niskala: tx("Niskala Utilities splash screen: the N monogram above the NISKALA UTILITIES wordmark", "Layar splash Niskala Utilities: monogram N di atas wordmark NISKALA UTILITIES"),
};

const artMap = {
  racing: RacingArt,
  miami: MiamiArt,
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
