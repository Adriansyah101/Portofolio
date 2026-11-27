import { useId } from "react";

/*
 * Monochrome architecture schematics for project cards and case studies:
 * flat slate ground, a faint blueprint grid, hairline boxes and arrows, one
 * muted accent. Each one draws what the project is built from, not a picture
 * of it. Like the Niskala splash, they use `meet` with an oversized backdrop,
 * so the drawing stays whole in a wide thumbnail row and in an 8:5 frame.
 */

const MONO = "JetBrains Mono, ui-monospace, monospace";
const C = {
  ground: "#0e1014",
  grid: "#1a1d23",
  node: "#14171c",
  stroke: "#2f343d",
  line: "#4a5160",
  accent: "#7c98b6",
  label: "#d4d8de",
  sub: "#8b93a1",
  faint: "#5b616d",
};

/** Ground, grid, a caption top left and a note bottom right. */
const Frame = ({ label, caption, note, children }) => {
  const grid = `grid-${useId().replace(/:/g, "")}`;
  return (
    <svg viewBox="0 0 800 500" preserveAspectRatio="xMidYMid meet" role="img" aria-label={label}>
      <defs>
        <pattern id={grid} width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M40 0H0V40" fill="none" stroke={C.grid} strokeWidth="1" />
        </pattern>
      </defs>
      <rect x="-4000" y="-4000" width="8800" height="8500" fill={C.ground} />
      <rect x="-4000" y="-4000" width="8800" height="8500" fill={`url(#${grid})`} />
      <g fontFamily={MONO}>
        <text x="40" y="58" fontSize="14" letterSpacing="0.12em" fill={C.sub}>
          {caption}
        </text>
        <rect x="40" y="70" width="36" height="2" fill={C.accent} />
        {note && (
          <text x="760" y="468" fontSize="12" letterSpacing="0.1em" fill={C.faint} textAnchor="end">
            {note}
          </text>
        )}
      </g>
      {children}
    </svg>
  );
};

/** A labelled box: `accent` outlines it in the accent colour, `dashed` marks a build-time step. */
const Node = ({ x, y, w, h, label, sub, accent = false, dashed = false }) => (
  <g fontFamily={MONO}>
    <rect
      x={x}
      y={y}
      width={w}
      height={h}
      rx="10"
      fill={C.node}
      stroke={accent ? C.accent : C.stroke}
      strokeWidth={accent ? 1.75 : 1.25}
      strokeDasharray={dashed ? "5 5" : undefined}
    />
    <text x={x + w / 2} y={y + h / 2 + (sub ? -4 : 5)} fontSize="15" fontWeight="600" fill={C.label} textAnchor="middle">
      {label}
    </text>
    {sub && (
      <text x={x + w / 2} y={y + h / 2 + 16} fontSize="11.5" fill={accent ? C.accent : C.sub} textAnchor="middle">
        {sub}
      </text>
    )}
  </g>
);

/** A line through `points` ([x, y] pairs) with an arrowhead at the last one. */
const Arrow = ({ points, dashed = false, color = C.line }) => {
  const [x1, y1] = points[points.length - 2];
  const [x2, y2] = points[points.length - 1];
  const angle = Math.atan2(y2 - y1, x2 - x1);
  const back = (d, side) => [
    x2 - d * Math.cos(angle) - side * Math.sin(angle),
    y2 - d * Math.sin(angle) + side * Math.cos(angle),
  ];
  const [ax, ay] = back(10, 5);
  const [bx, by] = back(10, -5);
  return (
    <g>
      <polyline
        points={points.map((point) => point.join(",")).join(" ")}
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        strokeLinejoin="round"
        strokeDasharray={dashed ? "5 5" : undefined}
      />
      <path d={`M${x2} ${y2}L${ax} ${ay}L${bx} ${by}Z`} fill={color} />
    </g>
  );
};

/** Small caption on a line or beside a group. */
const Tag = ({ x, y, children, anchor = "start", color = C.faint }) => (
  <text x={x} y={y} fontFamily={MONO} fontSize="11" letterSpacing="0.08em" fill={color} textAnchor={anchor}>
    {children}
  </text>
);

/** SIDAF: a CodeIgniter MVC request cycle. */
export const SidafSchematic = ({ label }) => (
  <Frame label={label} caption="SIDAF · CODEIGNITER MVC" note="PHP · JAVASCRIPT">
    <rect x="222" y="150" width="398" height="282" rx="16" fill="none" stroke={C.stroke} strokeDasharray="6 6" />
    <Tag x="238" y="172">
      APPLICATION
    </Tag>
    <Node x={40} y={200} w={130} h={76} label="BROWSER" sub="HTTP" />
    <Node x={246} y={200} w={150} h={76} label="CONTROLLER" sub="routes · input" accent />
    <Node x={448} y={200} w={150} h={76} label="MODEL" sub="records" />
    <Node x={246} y={334} w={150} h={70} label="VIEW" sub="forms · reports" />
    {/* Data store as a cylinder */}
    <g>
      <path d="M660 214v66c0 9 22 16 50 16s50-7 50-16v-66" fill={C.node} stroke={C.stroke} strokeWidth="1.25" />
      <ellipse cx="710" cy="214" rx="50" ry="16" fill={C.node} stroke={C.stroke} strokeWidth="1.25" />
      <text x="710" y="262" fontFamily={MONO} fontSize="15" fontWeight="600" fill={C.label} textAnchor="middle">
        DATA
      </text>
    </g>
    <Arrow points={[[170, 238], [246, 238]]} />
    <Arrow points={[[396, 238], [448, 238]]} />
    <Arrow points={[[598, 238], [660, 238]]} />
    <Arrow points={[[321, 276], [321, 334]]} />
    <Arrow points={[[246, 369], [105, 369], [105, 276]]} />
    <Tag x="112" y="392">
      HTML
    </Tag>
  </Frame>
);

/** VR Simulation Airport: scene tree, XR rig and the two headset targets. */
export const AirportSchematic = ({ label }) => (
  <Frame label={label} caption="VR AIRPORT · UNITY XR" note="UNITY · C#">
    <Node x={40} y={104} w={210} h={60} label="AIRPORT SCENE" />
    <path d="M70 164v214M70 222h30M70 300h30M70 378h30" fill="none" stroke={C.line} strokeWidth="1.25" />
    <Node x={100} y={196} w={150} h={52} label="TERMINAL" />
    <Node x={100} y={274} w={150} h={52} label="AIRSIDE" />
    <Node x={100} y={352} w={150} h={52} label="PROCEDURES" />

    <Node x={340} y={214} w={160} h={92} label="XR RIG" sub="head · hands" accent />
    {/* Gaze reticle */}
    <g stroke={C.accent} fill="none" strokeWidth="1.25" opacity="0.8">
      <circle cx="420" cy="166" r="16" />
      <circle cx="420" cy="166" r="2.5" fill={C.accent} stroke="none" />
      <path d="M420 144v-8M420 188v8M398 166h-8M442 166h8" />
    </g>
    <Arrow points={[[420, 192], [420, 214]]} color={C.accent} />

    <Node x={590} y={166} w={170} h={60} label="QUEST 2" sub="standalone" />
    <Node x={590} y={294} w={170} h={60} label="PCVR" sub="link" />

    <Arrow points={[[250, 300], [295, 300], [295, 260], [340, 260]]} />
    <Arrow points={[[500, 246], [545, 246], [545, 196], [590, 196]]} />
    <Arrow points={[[500, 274], [545, 274], [545, 324], [590, 324]]} />
  </Frame>
);

/** War Plane 1945: the per-frame step loop around its systems. */
export const WarplaneSchematic = ({ label }) => {
  const cx = 400;
  const cy = 268;
  const rx = 262;
  const ry = 152;
  const nodes = ["INPUT", "KINEMATICS", "PROJECTILES", "WAVES", "COLLISION", "DRAW"];
  const at = (deg) => [cx + rx * Math.cos((deg * Math.PI) / 180), cy + ry * Math.sin((deg * Math.PI) / 180)];
  return (
    <Frame label={label} caption="WAR PLANE 1945 · STEP LOOP" note="GML · 2D">
      <ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill="none" stroke={C.line} strokeWidth="1.25" strokeDasharray="5 7" />
      {/* Direction of the loop: a small head between each pair of systems. */}
      {nodes.map((_, index) => {
        const deg = -60 + index * 60;
        const t = (deg * Math.PI) / 180;
        const [x, y] = at(deg);
        const angle = (Math.atan2(ry * Math.cos(t), -rx * Math.sin(t)) * 180) / Math.PI;
        return <path key={deg} d="M7 0L-5 -5.5L-5 5.5Z" fill={C.line} transform={`translate(${x} ${y}) rotate(${angle})`} />;
      })}
      {nodes.map((name, index) => {
        const [x, y] = at(-90 + index * 60);
        return (
          <g key={name}>
            <path d={`M${cx} ${cy}L${x} ${y}`} stroke={C.grid} strokeWidth="1.5" />
            <Node x={x - 78} y={y - 24} w={156} h={48} label={name} />
          </g>
        );
      })}
      <circle cx={cx} cy={cy} r="54" fill={C.node} stroke={C.accent} strokeWidth="1.75" />
      <text x={cx} y={cy - 2} fontFamily={MONO} fontSize="16" fontWeight="600" fill={C.label} textAnchor="middle">
        STEP
      </text>
      <text x={cx} y={cy + 18} fontFamily={MONO} fontSize="11.5" fill={C.accent} textAnchor="middle">
        per frame
      </text>
    </Frame>
  );
};

/**
 * The two loaders share one three-stage layout: the legacy 32-bit input on the
 * left, the translation layer in the middle (accent), the native target on the
 * right, two rows each, with a figure from the repository top right.
 */
const LoaderFlow = ({ label, caption, stat, rows, link }) => (
  <Frame label={label} caption={caption} note="NO CPU EMULATION">
    <Tag x="760" y="58" anchor="end">
      {stat}
    </Tag>
    <Tag x="40" y="128">
      LEGACY 32-BIT
    </Tag>
    <Tag x="290" y="128">
      TRANSLATION
    </Tag>
    <Tag x="560" y="128">
      NATIVE TARGET
    </Tag>
    {rows.map(([from, via, to], index) => {
      const y = 146 + index * 126;
      const mid = y + 42;
      return (
        <g key={via.label}>
          <Node x={40} y={y} w={200} h={84} label={from.label} sub={from.sub} />
          <Node x={290} y={y} w={220} h={84} label={via.label} sub={via.sub} accent dashed={via.dashed} />
          <Node x={560} y={y} w={200} h={84} label={to.label} sub={to.sub} />
          <Arrow points={[[240, mid], [290, mid]]} />
          <Arrow points={[[510, mid], [560, mid]]} color={C.accent} />
        </g>
      );
    })}
    <Arrow points={[[400, 230], [400, 272]]} color={C.accent} />
    <Tag x="410" y="256" color={C.accent}>
      {link}
    </Tag>
    <path d="M40 410H760" stroke={C.stroke} strokeWidth="1" strokeDasharray="2 6" />
  </Frame>
);

/** 32-bit iOS loader: ARMv7 Mach-O + OpenGL ES → static recompiler & runtime bridge → native x86 / OpenGL 2.1. */
export const IosLoaderSchematic = ({ label }) => (
  <LoaderFlow
    label={label}
    caption="iOS LOADER · ARMv7 → x86"
    stat="23,873 FUNCTIONS"
    link="calls"
    rows={[
      [
        { label: "ARMv7 MACH-O", sub: "32-bit iPad · Thumb" },
        { label: "STATIC RECOMPILER", sub: "ARM → C · build time", dashed: true },
        { label: "NATIVE x86", sub: "Windows · Linux" },
      ],
      [
        { label: "OPENGL ES", sub: "1.1 / 2.0 · PVRTC" },
        { label: "RUNTIME BRIDGE", sub: "map · bind · ARM ABI" },
        { label: "OPENGL 2.1", sub: "GLSL 1.20 · RGBA" },
      ],
    ]}
  />
);

/** 32-bit Mac loader: i386 Mach-O / dyld → user-space loader & ABI shim → Windows / Linux x86. */
export const MacLoaderSchematic = ({ label }) => (
  <LoaderFlow
    label={label}
    caption="MAC LOADER · i386 → x86"
    stat="4,243 BIND SLOTS"
    link="imports"
    rows={[
      [
        { label: "i386 MACH-O", sub: "non-PIE · 0x1000" },
        { label: "USER-SPACE LOADER", sub: "map · patch · bind" },
        { label: "WINDOWS x86", sub: "PE · 0x10000" },
      ],
      [
        { label: "dyld INFO", sub: "bind · lazy · weak" },
        { label: "ABI SHIM", sub: "syscalls · Cocoa · GL" },
        { label: "LINUX x86", sub: "ELF · 0x08048000" },
      ],
    ]}
  />
);
