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

/** 32-bit iOS loader: code recompiled at build time, data loaded and bound at run time. */
export const IosLoaderSchematic = ({ label }) => (
  <Frame label={label} caption="iOS LOADER · ARMv7 MACH-O → x86" note="0x11000 – 0x8B5000">
    <Tag x="40" y="118">
      BUILD TIME
    </Tag>
    <Tag x="40" y="300">
      RUN TIME
    </Tag>
    <path d="M40 262H760" stroke={C.stroke} strokeWidth="1" />

    <Node x={40} y={136} w={150} h={76} label="__TEXT" sub="ARM · Thumb" dashed />
    <Node x={240} y={136} w={150} h={76} label="recomp/" sub="ARM → C" dashed />
    <Node x={440} y={136} w={150} h={76} label="F_<addr>" sub="(CPU *c)" dashed />
    <Node x={640} y={136} w={120} h={76} label="x86" sub="exe · ELF" dashed />
    <Arrow points={[[190, 174], [240, 174]]} dashed />
    <Arrow points={[[390, 174], [440, 174]]} dashed />
    <Arrow points={[[590, 174], [640, 174]]} dashed />

    <Node x={40} y={318} w={150} h={76} label="__DATA" sub="symbols · objc" />
    <Node x={240} y={318} w={150} h={76} label="LOADER" sub="map · bind" accent />
    <Node x={440} y={318} w={150} h={76} label="BRIDGES" sub="r0–r3 · sp" />
    <Node x={640} y={318} w={120} h={76} label="SHIMS" sub="UIKit · GL ES" />
    <Arrow points={[[190, 356], [240, 356]]} />
    <Arrow points={[[390, 356], [440, 356]]} />
    <Arrow points={[[590, 356], [640, 356]]} />

    <Arrow points={[[515, 212], [515, 318]]} color={C.accent} />
    <Tag x="525" y="284" color={C.accent}>
      calls
    </Tag>
  </Frame>
);

/** 32-bit Mac loader: the reserved address range beside the load sequence and the host shims. */
export const MacLoaderSchematic = ({ label }) => {
  const shims = ["libSystem", "libobjc", "AppKit", "OpenGL", "AudioUnit"];
  return (
    <Frame label={label} caption="MAC LOADER · i386 MACH-O" note="NO CPU EMULATION">
      <Tag x="40" y="104">
        RESERVED RANGE
      </Tag>
      <Node x={40} y={118} w={170} h={54} label="LOW COPY" sub="0xC70000" accent />
      <Node x={40} y={180} w={170} h={64} label="__DATA" sub="4,243 bind slots" />
      <Node x={40} y={252} w={170} h={104} label="__TEXT" sub="i386 code" />
      <Node x={40} y={364} w={170} h={54} label="PE HEADER" sub="0x10000" />

      <Node x={262} y={222} w={112} h={64} label="PARSE" sub="LC_*" />
      <Node x={392} y={222} w={112} h={64} label="COPY" sub="segments" />
      <Node x={522} y={222} w={112} h={64} label="PATCH" sub="4,360" accent />
      <Node x={652} y={222} w={108} h={64} label="BIND" sub="dyld info" />
      <Arrow points={[[374, 254], [392, 254]]} />
      <Arrow points={[[504, 254], [522, 254]]} />
      <Arrow points={[[634, 254], [652, 254]]} />
      <Arrow points={[[578, 222], [578, 145], [210, 145]]} color={C.accent} />
      <Tag x="590" y="176" color={C.accent}>
        low range
      </Tag>

      <Arrow points={[[706, 286], [706, 340]]} />
      <Tag x="262" y="334">
        HOST SHIMS
      </Tag>
      {shims.map((name, index) => (
        <g key={name} fontFamily={MONO}>
          <rect x={262 + index * 100} y={346} width="90" height="34" rx="17" fill={C.node} stroke={C.stroke} />
          <text x={307 + index * 100} y={368} fontSize="11.5" fill={C.label} textAnchor="middle">
            {name}
          </text>
        </g>
      ))}
    </Frame>
  );
};
