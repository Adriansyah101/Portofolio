import { useState } from "react";
import { assetUrl } from "../utils/assets.js";
import { useLanguage } from "../context/LanguageContext.jsx";
import { tx } from "../utils/i18n.js";

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
          <text x="128" y="50" fontSize="14" fontWeight="700" fill="#d9ecff">GAMEPAD INPUT</text>
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

/* ---------------- Original projects: restrained slate artwork ---------------- */

const MONO = "JetBrains Mono, monospace";

/** SIDAF: an admin dashboard wireframe (sidebar, KPI tiles, records table, chart). */
const SidafArt = ({ label }) => (
  <svg viewBox="0 0 800 500" preserveAspectRatio="xMidYMid slice" role="img" aria-label={label}>
    <rect width="800" height="500" fill="#0e1014" />
    <rect x="40" y="36" width="720" height="428" rx="14" fill="#14161b" stroke="#262930" />
    {/* Window bar */}
    <path d="M40 50a14 14 0 0 1 14-14h692a14 14 0 0 1 14 14v18H40Z" fill="#191c22" />
    {["#3f4450", "#3f4450", "#3f4450"].map((fill, index) => (
      <circle key={index} cx={62 + index * 16} cy="52" r="4.5" fill={fill} />
    ))}
    <rect x="300" y="45" width="200" height="14" rx="7" fill="#22252c" />

    {/* Sidebar */}
    <rect x="40" y="68" width="150" height="396" fill="#111318" />
    <text x="62" y="104" fontFamily={MONO} fontSize="17" fontWeight="700" fill="#d4d8de">SIDAF</text>
    {[0, 1, 2, 3, 4, 5].map((index) => (
      <g key={index} transform={`translate(56 ${132 + index * 34})`}>
        {index === 1 && <rect x="-8" y="-12" width="134" height="26" rx="7" fill="#1d2129" />}
        <rect width="10" height="10" y="-4" rx="3" fill={index === 1 ? "#7c98b6" : "#3a3f49"} />
        <rect x="20" y="-2" width={index === 1 ? 72 : 56 + ((index * 17) % 30)} height="6" rx="3" fill={index === 1 ? "#a9b8c9" : "#4a505b"} />
      </g>
    ))}

    {/* Header */}
    <text x="220" y="106" fontFamily={MONO} fontSize="12" fill="#8b93a1">DATA · WORKFLOW · REPORTS</text>
    <rect x="626" y="88" width="108" height="28" rx="8" fill="#1d2129" stroke="#2f343d" />
    <rect x="642" y="99" width="76" height="6" rx="3" fill="#7c98b6" opacity="0.8" />

    {/* KPI tiles */}
    {[
      { x: 220, bar: 0.72, color: "#7c98b6" },
      { x: 392, bar: 0.46, color: "#94a3b8" },
      { x: 564, bar: 0.6, color: "#7fa38f" },
    ].map(({ x, bar, color }) => (
      <g key={x} transform={`translate(${x} 132)`}>
        <rect width="156" height="74" rx="10" fill="#181b21" stroke="#262930" />
        <rect x="16" y="18" width="54" height="6" rx="3" fill="#4a505b" />
        <rect x="16" y="34" width="84" height="12" rx="4" fill="#c4c9d1" opacity="0.85" />
        <rect x="16" y="56" width="124" height="4" rx="2" fill="#262930" />
        <rect x="16" y="56" width={124 * bar} height="4" rx="2" fill={color} />
      </g>
    ))}

    {/* Records table */}
    <g transform="translate(220 226)">
      <rect width="330" height="214" rx="10" fill="#181b21" stroke="#262930" />
      <rect x="0" y="0" width="330" height="34" rx="10" fill="#1d2129" />
      {[16, 112, 208].map((x) => (
        <rect key={x} x={x} y="14" width="58" height="6" rx="3" fill="#5b616d" />
      ))}
      {[0, 1, 2, 3, 4].map((row) => (
        <g key={row} transform={`translate(0 ${52 + row * 32})`}>
          <rect x="16" y="0" width={70 + ((row * 23) % 24)} height="6" rx="3" fill="#8b93a1" opacity="0.75" />
          <rect x="112" y="0" width={58 + ((row * 31) % 30)} height="6" rx="3" fill="#4a505b" />
          <rect x="208" y="-5" width="54" height="16" rx="8" fill={row % 3 === 1 ? "#3a332a" : "#22302a"} />
          <rect x="218" y="0" width="34" height="6" rx="3" fill={row % 3 === 1 ? "#b8a48c" : "#7fa38f"} />
          {row < 4 && <rect x="16" y="18" width="298" height="1" fill="#262930" />}
        </g>
      ))}
    </g>

    {/* Monthly report chart */}
    <g transform="translate(566 226)">
      <rect width="168" height="214" rx="10" fill="#181b21" stroke="#262930" />
      <rect x="16" y="18" width="70" height="6" rx="3" fill="#5b616d" />
      {[0.45, 0.62, 0.38, 0.74, 0.56, 0.82].map((height, index) => (
        <rect
          key={index}
          x={20 + index * 23}
          y={190 - height * 130}
          width="13"
          height={height * 130}
          rx="3"
          fill={index === 5 ? "#7c98b6" : "#3a4150"}
        />
      ))}
      <rect x="16" y="192" width="136" height="1" fill="#2f343d" />
    </g>
  </svg>
);

/** VR Simulation Airport: terminal, tower and runway at dusk, seen through a VR gaze reticle. */
const AirportArt = ({ label }) => (
  <svg viewBox="0 0 800 500" preserveAspectRatio="xMidYMid slice" role="img" aria-label={label}>
    <defs>
      <linearGradient id="vr-sky" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#0d1117" />
        <stop offset="0.7" stopColor="#1c2430" />
        <stop offset="1" stopColor="#2a3240" />
      </linearGradient>
      <linearGradient id="vr-ground" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#1a1d22" />
        <stop offset="1" stopColor="#0f1114" />
      </linearGradient>
      <radialGradient id="vr-vignette" cx="0.5" cy="0.5" r="0.75">
        <stop offset="0.62" stopColor="#000" stopOpacity="0" />
        <stop offset="1" stopColor="#000" stopOpacity="0.7" />
      </radialGradient>
    </defs>

    <rect width="800" height="500" fill="url(#vr-sky)" />
    <rect y="250" width="800" height="250" fill="url(#vr-ground)" />

    {/* Terminal with glass facade */}
    <path d="M70 250V196l300-14 300 14v54Z" fill="#20252d" />
    <path d="M70 196l300-14 300 14" fill="none" stroke="#3a4150" strokeWidth="2" />
    {Array.from({ length: 18 }, (_, index) => (
      <rect key={index} x={88 + index * 32} y="206" width="22" height="32" rx="2" fill="#a9b8c9" opacity={0.12 + ((index * 7) % 5) * 0.04} />
    ))}

    {/* Control tower */}
    <rect x="690" y="132" width="16" height="118" fill="#20252d" />
    <path d="M676 132h44l-6-22h-32Z" fill="#2a303a" />
    <rect x="682" y="114" width="32" height="10" rx="2" fill="#a9b8c9" opacity="0.35" />

    {/* Runway in perspective */}
    <path d="M372 252h56l250 248H122Z" fill="#16181c" />
    <path d="M372 252 122 500M428 252l250 248" stroke="#3a4150" strokeWidth="2" />
    {[
      [398, 264, 4, 10],
      [397, 290, 6, 16],
      [395, 326, 10, 24],
      [392, 378, 16, 34],
      [388, 450, 24, 46],
    ].map(([x, y, w, h]) => (
      <rect key={y} x={x} y={y} width={w} height={h} fill="#c4c9d1" opacity="0.55" />
    ))}
    {[0.1, 0.25, 0.42, 0.62, 0.86].map((t) => (
      <g key={t} fill="#e7c9a5" opacity="0.7">
        <circle cx={372 - 250 * t} cy={252 + 248 * t} r={1.5 + t * 3} />
        <circle cx={428 + 250 * t} cy={252 + 248 * t} r={1.5 + t * 3} />
      </g>
    ))}

    {/* Parked aircraft */}
    <g transform="translate(170 262)" fill="#8b93a1">
      <path d="M0 14c0-5 6-8 14-8h120c10 0 18 4 22 8-4 4-12 8-22 8H14C6 22 0 19 0 14Z" />
      <path d="M62 14 40 -6h14l34 20Z" />
      <path d="M62 14 40 34h14l34-20Z" opacity="0.7" />
      <path d="M126 6 140-10h8l-6 20Z" />
    </g>

    {/* VR gaze reticle */}
    <g stroke="#e2e8f0" strokeOpacity="0.8" fill="none">
      <circle cx="400" cy="214" r="18" strokeWidth="1.5" />
      <circle cx="400" cy="214" r="3" fill="#e2e8f0" stroke="none" />
      <path d="M400 186v-10M400 252v-10M372 214h-10M438 214h-10" strokeWidth="1.5" />
    </g>

    <rect width="800" height="500" fill="url(#vr-vignette)" />

    <g fontFamily={MONO}>
      <rect x="24" y="22" width="168" height="34" rx="17" fill="#000" opacity="0.45" stroke="#94a3b8" strokeOpacity="0.35" />
      <text x="42" y="44" fontSize="13" fill="#d4d8de">VR · QUEST 2</text>
      <text x="776" y="478" fontSize="12" fill="#a1a1aa" textAnchor="end">TERMINAL · AIRSIDE</text>
    </g>
  </svg>
);

/** War Plane 1945: a top-down arcade sky over the sea, player below, a wave above. */
const Plane = ({ fill, wing = fill }) => (
  <g>
    <path d="M0-26c4 0 6 6 6 14v34c0 4-2 6-6 6s-6-2-6-6v-34c0-8 2-14 6-14Z" fill={fill} />
    <path d="M-34-2h68c2 0 3 2 3 4v4c0 2-1 3-3 3h-68c-2 0-3-1-3-3v-4c0-2 1-4 3-4Z" fill={wing} />
    <path d="M-13 20h26c1 0 2 1 2 2v3c0 1-1 2-2 2h-26c-1 0-2-1-2-2v-3c0-1 1-2 2-2Z" fill={wing} />
    <rect x="-9" y="-30" width="18" height="2.5" rx="1.25" fill={fill} opacity="0.6" />
  </g>
);

const WarplaneArt = ({ label }) => (
  <svg viewBox="0 0 800 500" preserveAspectRatio="xMidYMid slice" role="img" aria-label={label}>
    <defs>
      <linearGradient id="wp-sea" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#0f1d24" />
        <stop offset="1" stopColor="#132a33" />
      </linearGradient>
    </defs>

    <rect width="800" height="500" fill="url(#wp-sea)" />
    <g stroke="#a9b8c9" strokeOpacity="0.08" strokeWidth="2" fill="none" strokeLinecap="round">
      {[60, 130, 205, 290, 360, 440].map((y, index) => (
        <path key={y} d={`M${(index * 97) % 160} ${y}c30-8 60 8 90 0s60-8 90 0`} />
      ))}
      {[95, 250, 400].map((y, index) => (
        <path key={y} d={`M${520 + ((index * 53) % 90)} ${y}c30-8 60 8 90 0s60-8 90 0`} />
      ))}
    </g>

    {/* Soft clouds */}
    <g fill="#e2e8f0" opacity="0.07">
      <ellipse cx="160" cy="150" rx="120" ry="34" />
      <ellipse cx="220" cy="134" rx="70" ry="26" />
      <ellipse cx="640" cy="330" rx="130" ry="36" />
      <ellipse cx="590" cy="312" rx="64" ry="24" />
    </g>

    {/* Enemy wave in a V formation, flying down the screen */}
    {[
      [400, 96],
      [340, 132],
      [460, 132],
      [280, 168],
      [520, 168],
    ].map(([x, y]) => (
      <g key={`${x}-${y}`} transform={`translate(${x} ${y}) rotate(180) scale(0.8)`}>
        <Plane fill="#6b7280" wing="#565c66" />
      </g>
    ))}

    {/* Player shots */}
    <g fill="#e7c9a5">
      {[0, 1, 2, 3].map((index) => (
        <g key={index} opacity={1 - index * 0.18}>
          <rect x="389" y={330 - index * 42} width="4" height="16" rx="2" />
          <rect x="407" y={330 - index * 42} width="4" height="16" rx="2" />
        </g>
      ))}
    </g>
    {/* Enemy shots */}
    <g fill="#c0504a" opacity="0.8">
      <circle cx="340" cy="190" r="3.5" />
      <circle cx="332" cy="226" r="3.5" />
      <circle cx="520" cy="206" r="3.5" />
    </g>

    {/* Player plane and its shadow on the water */}
    <g transform="translate(414 420) scale(1.25)" opacity="0.25">
      <Plane fill="#000" />
    </g>
    <g transform="translate(400 404) scale(1.25)">
      <Plane fill="#d4d8de" wing="#b4bac4" />
    </g>

    {/* HUD */}
    <g fontFamily={MONO}>
      <rect x="24" y="22" width="176" height="34" rx="17" fill="#000" opacity="0.4" stroke="#94a3b8" strokeOpacity="0.3" />
      <text x="42" y="44" fontSize="13" fill="#d4d8de">SCORE 004200</text>
      <rect x="664" y="22" width="112" height="34" rx="17" fill="#000" opacity="0.4" stroke="#94a3b8" strokeOpacity="0.3" />
      <text x="720" y="44" fontSize="13" fill="#d4d8de" textAnchor="middle">WAVE 03</text>
      {[0, 1, 2].map((index) => (
        <g key={index} transform={`translate(${44 + index * 24} 470) scale(0.32)`}>
          <Plane fill="#a9b8c9" />
        </g>
      ))}
      <text x="776" y="478" fontSize="12" fill="#a1a1aa" textAnchor="end">1945 · ARCADE</text>
    </g>
  </svg>
);

/** Accessible names for the artwork, in both languages. */
const artLabels = {
  racing: tx("Stylized night race track with a 60 FPS HUD", "Ilustrasi lintasan balap malam dengan HUD 60 FPS"),
  miami: tx("Neon sunset city skyline with palm trees", "Ilustrasi siluet kota saat matahari terbenam dengan pohon palem"),
  pipeline: tx("OpenGL ES render pipeline diagram", "Diagram pipeline render OpenGL ES"),
  sidaf: tx("Information system dashboard wireframe", "Wireframe dashboard sistem informasi"),
  airport: tx("Virtual reality airport terminal and runway", "Terminal dan landasan bandara dalam virtual reality"),
  warplane: tx("Top-down arcade air combat scene over the sea", "Adegan pertempuran udara arcade dari atas, di atas laut"),
};

const artMap = {
  racing: RacingArt,
  miami: MiamiArt,
  pipeline: PipelineArt,
  sidaf: SidafArt,
  airport: AirportArt,
  warplane: WarplaneArt,
};

const videoText = {
  play: tx("Play video: {title}", "Putar video: {title}"),
  watch: tx("Watch gameplay", "Tonton gameplay"),
};

/**
 * Shows the project's screenshot when `image` is set and loads correctly;
 * otherwise renders the matching built-in SVG artwork.
 *
 * With `video` ({ youtubeId, title }) the preview becomes a click-to-play
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
              {videoText.watch[lang]}
            </span>
          </button>
          {overlay}
        </>
      )}
    </div>
  );
};

export default ProjectPreview;
