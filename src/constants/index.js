/**
 * Portfolio content for Adriansyah Prasetya Nugraha (adriansyah101).
 *
 * Every page of the site reads its data from this file, so updating copy,
 * links, screenshots or 3D models never requires touching component code.
 *
 * Optional assets: drop files into `/public` and reference them with a path
 * relative to `/public` (for example `images/gtracing-pc.png` or
 * `models/room.glb`). Leave a value as `null` to use the built-in procedural
 * artwork / 3D meshes instead.
 */

const env = import.meta.env;

/* -------------------------------------------------------------------------- */
/*                              Link configuration                            */
/* -------------------------------------------------------------------------- */

/** GitHub account that owns every repository linked from the site. */
export const githubUser = env.VITE_GITHUB_USERNAME?.trim() || "adriansyah101";

const GITHUB = `https://github.com/${githubUser}`;
const GT_RACING_REPO = "GTRacingMotorAcademyRecomp";
/** Exact Gangstar repo name. Without it, links open the filtered repository list. */
const GANGSTAR_REPO = env.VITE_GANGSTAR_REPO?.trim() || null;
const TWITTER_HANDLE = env.VITE_TWITTER_HANDLE?.trim().replace(/^@/, "") || null;

export const links = {
  githubProfile: GITHUB,
  gtRacingRepo: `${GITHUB}/${GT_RACING_REPO}`,
  gtRacingReleases: `${GITHUB}/${GT_RACING_REPO}/releases`,
  gtRacingReleaseNotes: "http://tiny.cc/gtracingpc",
  gangstarRepo: GANGSTAR_REPO ? `${GITHUB}/${GANGSTAR_REPO}` : `${GITHUB}?tab=repositories&q=gangstar`,
  gangstarReleases: GANGSTAR_REPO ? `${GITHUB}/${GANGSTAR_REPO}/releases` : null,
  twitter: TWITTER_HANDLE ? `https://x.com/${TWITTER_HANDLE}` : null,
};

/* -------------------------------------------------------------------------- */
/*                                   Routes                                   */
/* -------------------------------------------------------------------------- */

export const routes = {
  home: "/",
  projects: "/projects",
  gtRacing: "/projects/gt-racing",
  gangstar: "/projects/gangstar",
  journey: "/journey",
  contact: "/contact",
};

/** `end: true` keeps "Preservation Archive" from lighting up on case-study pages. */
export const navLinks = [
  { name: "Home", to: routes.home, end: true },
  { name: "Preservation Archive", to: routes.projects, end: true },
  { name: "GT Racing", to: routes.gtRacing },
  { name: "Gangstar", to: routes.gangstar },
  { name: "Journey", to: routes.journey },
  { name: "Contact", to: routes.contact },
];

/* -------------------------------------------------------------------------- */
/*                                    Hero                                    */
/* -------------------------------------------------------------------------- */

export const words = [
  { text: "32-Bit Games", icon: "chip" },
  { text: "iPad Racers", icon: "tablet" },
  { text: "Mac Classics", icon: "laptop" },
  { text: "ARMv7 Code", icon: "code" },
];

export const heroContent = {
  eyebrow: "32-Bit Game Preservation & Static Recompilation Engineer",
  headlineLines: ["Apple Left Behind", "as Native PC Ports"],
  bio: "Hi, I'm Adriansyah Prasetya Nugraha (adriansyah101), based in Semarang, Indonesia. I rescue delisted 32-bit mobile and desktop classics that stopped working when Apple dropped 32-bit apps in iOS 11 and macOS Catalina. I use static binary recompilation and modern OpenGL ES rendering pipelines, not fragile emulation.",
  ctaText: "Explore the Work",
};

/** Optional `.glb` that replaces the procedural developer room in the hero. */
export const heroScene = {
  modelPath: null, // e.g. "models/hero-room.glb"
  scale: 1,
  position: [0, 0, 0],
  rotation: [0, 0, 0],
};

/** Optional `.glb` that replaces the procedural desk on the contact page. */
export const contactScene = {
  modelPath: null, // e.g. "models/contact-desk.glb"
  scale: 1,
  position: [0, 0, 0],
  rotation: [0, 0, 0],
};

/* -------------------------------------------------------------------------- */
/*                               Counter metrics                              */
/* -------------------------------------------------------------------------- */

export const counterItems = [
  { value: 2, suffix: "", label: "32-Bit Classics Preserved" },
  { value: 2, suffix: "", label: "Lost Apple Platforms Rescued (iPad & Mac)" },
  { value: 2, suffix: "", label: "Modern Native Targets (Windows & Linux)" },
  { value: 100, suffix: "%", label: "Open-Source GitHub Releases" },
];

/* -------------------------------------------------------------------------- */
/*                           Preservation projects                            */
/* -------------------------------------------------------------------------- */

export const projectFilters = ["All", "32-Bit iPad", "32-Bit Mac", "OpenGL ES"];

/**
 * `art` selects the built-in SVG preview. Set `image` to a screenshot path
 * inside `/public` to show a real gameplay capture instead.
 * `comparison` feeds the "Original 32-Bit Target vs. Modern Native Port" table.
 */
export const projects = [
  {
    id: "gt-racing",
    layout: "primary",
    caseStudy: routes.gtRacing,
    title: "GTRacingMotorAcademyRecomp: 32-Bit iPad Racer, Preserved Natively on Windows",
    shortTitle: "GT Racing: Motor Academy",
    platform: "32-Bit iPad",
    platformIcon: "tablet",
    origin: "32-bit iPad · ARMv7 / PowerVR",
    target: "Native Windows · v1.0.0",
    filters: ["32-Bit iPad", "OpenGL ES"],
    description:
      "Gameloft's flagship simulation racer stopped launching when iOS 11 dropped 32-bit apps. This static recompilation preserves it as a native Windows executable (`v1.0.0`), without emulation. It adds custom OpenGL ES shaders with instant-apply PostFX and motion blur, PVRTC texture decoding, full keyboard and gamepad remapping, and a restored Cloudflare Workers + D1 leaderboard (`gt-redbull-board`).",
    tags: ["Static Recompilation", "ARMv7", "OpenGL ES", "PVRTC", "Cloudflare D1"],
    art: "racing",
    image: null, // drop a 16:9 capture at public/images/gtracing-pc.png, then set "images/gtracing-pc.png"
    links: [
      { label: "GitHub Repository", href: links.gtRacingRepo, icon: "github" },
      { label: "Release Notes", href: links.gtRacingReleaseNotes, icon: "tag" },
    ],
    comparison: [
      { aspect: "Platform", original: "32-bit iPad / iOS", modern: "Native Windows PC executable" },
      { aspect: "CPU code", original: "32-bit ARMv7 machine code", modern: "Statically recompiled native desktop code" },
      { aspect: "Graphics", original: "OpenGL ES 1.1/2.0 on PowerVR GPUs", modern: "Desktop OpenGL / ANGLE with custom shaders & PostFX" },
      { aspect: "Textures", original: "PVRTC (PowerVR-only compression)", modern: "Decoded for any desktop GPU" },
      { aspect: "Controls", original: "Touchscreen & tilt", modern: "Fully remappable keyboard & gamepad" },
      { aspect: "Online", original: "Legacy servers, now offline", modern: "Cloudflare Workers + D1 leaderboard" },
      { aspect: "Status", original: "Won't launch on iOS 11+", modern: "Playable today · v1.0.0" },
    ],
  },
  {
    id: "gangstar",
    layout: "secondary",
    caseStudy: routes.gangstar,
    title: "Gangstar: Miami Vindication: 32-Bit Mac Classic, Ported to Windows & Linux",
    shortTitle: "Gangstar: Miami Vindication",
    platform: "32-Bit Mac",
    platformIcon: "laptop",
    origin: "32-bit Mac · x86 OS X binary",
    target: "Windows x86 & Linux · V1.0.0",
    filters: ["32-Bit Mac", "OpenGL ES"],
    description:
      "The desktop edition of Gameloft's open-world action classic, unplayable on 64-bit-only macOS since Catalina. Binary analysis and cross-platform porting bring it natively to Windows x86 and Linux (`V1.0.0`), with a modernized OpenGL ES pipeline and SHA-256 verified, telemetry-free archives.",
    tags: ["Binary Analysis", "x86", "Windows", "Linux", "SHA-256"],
    art: "miami",
    image: null, // drop a 16:9 capture at public/images/gangstar-mv-pc.png, then set "images/gangstar-mv-pc.png"
    links: [
      { label: "GitHub Repository", href: links.gangstarRepo, icon: "github" },
      links.gangstarReleases && { label: "Releases", href: links.gangstarReleases, icon: "tag" },
    ].filter(Boolean),
    comparison: [
      { aspect: "Platform", original: "32-bit Mac (OS X)", modern: "Windows x86 & Linux" },
      { aspect: "Binary", original: "Legacy 32-bit x86 Mach-O app", modern: "Native Windows & Linux builds" },
      { aspect: "Graphics", original: "Legacy mobile-derived GL renderer", modern: "Modernized OpenGL ES: MSAA depth resolves, VBO caching" },
      { aspect: "Controls", original: "Original Mac input handling", modern: "Adapted desktop input controls" },
      { aspect: "Distribution", original: "32-bit only app bundle", modern: "SHA-256 verified .zip & tarball" },
      { aspect: "Status", original: "Blocked on macOS Catalina 10.15+", modern: "Playable today · V1.0.0" },
    ],
  },
  {
    id: "gles-architecture",
    layout: "secondary",
    caseStudy: null,
    title: "Shared OpenGL ES Graphics & Input Preservation Layer",
    shortTitle: "OpenGL ES Preservation Layer",
    platform: "OpenGL ES",
    platformIcon: "layers",
    origin: "Shared across both ports",
    target: "Reusable rendering & input systems",
    filters: ["OpenGL ES"],
    description:
      "The reusable rendering and control systems behind both ports: multi-pass MSAA depth resolves, VBO caching, PVRTC handling for legacy iOS assets, hybrid GPU execution and gamepad menu snap navigation.",
    tags: ["ANGLE", "VBO Caching", "MSAA", "PVRTC", "Gamepad Input"],
    art: "pipeline",
    image: null, // e.g. "images/pipeline.png"
    links: [
      { label: "GT Racing Source", href: links.gtRacingRepo, icon: "github" },
      { label: "Gangstar Source", href: links.gangstarRepo, icon: "github" },
    ],
    comparison: null,
  },
];

/* -------------------------------------------------------------------------- */
/*                                Case studies                                */
/* -------------------------------------------------------------------------- */

/**
 * Data for the two deep-dive pages. Each section renders a list of typed
 * blocks: `prose`, `cards`, `timeline`, `flow`, `architecture`, `table`,
 * `checklist`, `code` and `links`.
 */
export const caseStudies = {
  "gt-racing": {
    projectId: "gt-racing",
    eyebrow: "Case Study · 32-Bit iPad Preservation",
    title: "GT Racing: Motor Academy",
    repoName: "GTRacingMotorAcademyRecomp",
    summary:
      "How a 32-bit iPad simulation racer that modern iOS can no longer launch was statically recompiled into a native Windows release, with its graphics modernized and its online leaderboard rebuilt from scratch.",
    art: "racing",
    image: null,
    facts: [
      { label: "Original platform", value: "32-bit iPad · iOS" },
      { label: "Hardware era", value: "ARMv7 · PowerVR" },
      { label: "Lost with", value: "iOS 11 (2017)" },
      { label: "Preserved as", value: "Native Windows · v1.0.0" },
    ],
    links: [
      { label: "GitHub Repository", href: links.gtRacingRepo, icon: "github" },
      { label: "v1.0.0 Release Notes", href: links.gtRacingReleaseNotes, icon: "tag" },
    ],
    sections: [
      {
        id: "why-lost",
        title: "Why It Was Lost",
        intro:
          "GT Racing: Motor Academy shipped as a 32-bit ARMv7 binary tuned for early iPad hardware and PowerVR GPUs. When Apple went 64-bit only, the game didn't degrade. It stopped launching.",
        blocks: [
          {
            type: "timeline",
            items: [
              { when: "PowerVR era", title: "Built for 32-bit iPad", body: "Compiled for ARMv7 with PVRTC-compressed assets and an OpenGL ES 1.1/2.0 renderer." },
              { when: "iOS 10.3 · 2017", title: "32-bit warnings appear", body: "iOS starts warning that 32-bit apps won't work with future versions." },
              { when: "iOS 11 · 2017", title: "32-bit apps stop launching", body: "Support ends completely. The binary can no longer run on any updated iPhone or iPad." },
              { when: "Delisted", title: "Gone from the App Store", body: "With the store listing and the legacy online services gone, there was no official way left to play." },
            ],
          },
          {
            type: "cards",
            items: [
              { icon: "broken", title: "No 64-bit build", body: "No 64-bit update was ever shipped, so modern iOS devices have nothing they can run." },
              { icon: "lock", title: "No legal storefront", body: "Delisting removed the last way to download it, even for players who had bought it." },
              { icon: "shield", title: "Emulation isn't preservation", body: "Emulators are fragile and slow. A native port keeps the game playable on hardware people actually own." },
            ],
          },
        ],
      },
      {
        id: "pipeline",
        title: "Recompilation & Graphics Pipeline",
        intro:
          "Instead of interpreting ARM instructions at runtime, the original game code is translated ahead of time into a native Windows executable. iOS services are replaced with a desktop platform layer.",
        blocks: [
          {
            type: "flow",
            caption: "Static recompilation pipeline",
            steps: [
              { icon: "tablet", title: "32-bit ARMv7 binary", body: "Original iPad executable and game assets" },
              { icon: "terminal", title: "Analysis & lifting", body: "Recover functions and control flow from the binary" },
              { icon: "code", title: "Recompiled C/C++", body: "Translated code, built with a modern desktop toolchain" },
              { icon: "layers", title: "Platform layer", body: "Windowing, input and file I/O replace iOS services" },
              { icon: "monitor", title: "Native Windows build", body: "Shipped as the v1.0.0 release" },
            ],
          },
          {
            type: "cards",
            items: [
              { icon: "cube", title: "OpenGL ES 1.1/2.0 → desktop", body: "The game's original OpenGL ES 1.1/2.0 calls are served on the desktop through ANGLE or a desktop OpenGL context, so the renderer keeps its behaviour." },
              { icon: "shader", title: "Custom shaders & PostFX", body: "Rewritten OpenGL ES shaders add bloom, specular tuning and motion blur. Each setting applies instantly, without a restart." },
              { icon: "chip", title: "PVRTC texture decoding", body: "PowerVR-only PVRTC textures are decoded so any desktop GPU can render the original assets." },
              { icon: "gamepad", title: "Input modernization", body: "Touch and tilt controls become fully remappable keyboard and gamepad bindings, with menu snap navigation." },
            ],
          },
        ],
      },
      {
        id: "leaderboard",
        title: "Cloud Leaderboard Restoration",
        intro:
          "The original online leaderboards depended on servers that no longer exist. Rather than leave them dead, the PC release talks to a new serverless backend, `gt-redbull-board`, running on Cloudflare's edge.",
        blocks: [
          {
            type: "architecture",
            legacy: { icon: "server", title: "Legacy game servers", body: "Shut down. Original online features can't connect." },
            nodes: [
              { icon: "monitor", title: "GT Racing PC client", body: "v1.0.0 sends and reads leaderboard times over HTTPS" },
              { icon: "cloud", title: "Cloudflare Worker", body: "`gt-redbull-board` edge API for score submission and queries" },
              { icon: "database", title: "Cloudflare D1", body: "Serverless SQLite database storing leaderboard entries" },
            ],
          },
          {
            type: "cards",
            items: [
              { icon: "cloud", title: "Edge-first", body: "Workers run close to every player, so the leaderboard responds quickly wherever it's requested from." },
              { icon: "database", title: "Serverless storage", body: "D1 removes the need for a database server to provision, patch or keep online." },
              { icon: "shield", title: "Built to outlive its maker", body: "There's no dedicated server to shut down, which is how the original leaderboard was lost." },
            ],
          },
        ],
      },
      {
        id: "release",
        title: "Controls & Release Info",
        intro: "Every binding below is a default. Keyboard and gamepad controls can be remapped in-game.",
        blocks: [
          {
            type: "table",
            caption: "Default control bindings",
            // Defaults shown on the site. Update them if your release's defaults differ.
            columns: ["Action", "Keyboard", "Gamepad"],
            rows: [
              ["Steer", "A / D or ← / →", "Left stick"],
              ["Accelerate", "W or ↑", "Right trigger"],
              ["Brake / reverse", "S or ↓", "Left trigger"],
              ["Navigate menus", "Arrow keys", "D-pad (menu snap)"],
              ["Confirm", "Enter", "A / Cross"],
              ["Back / pause", "Esc", "B / Circle · Start"],
            ],
          },
          {
            type: "checklist",
            title: "Shipped in v1.0.0",
            items: [
              "Native Windows executable built by static recompilation, no emulator",
              "Instant-apply PostFX, specular and motion blur settings",
              "Full keyboard and gamepad remapping with menu snap navigation",
              "Restored online leaderboard on Cloudflare Workers + D1",
              "Privacy-hardened, clean public release build",
            ],
          },
          {
            type: "links",
            items: [
              { label: "Read the v1.0.0 release notes", href: links.gtRacingReleaseNotes, icon: "tag", primary: true },
              { label: "Browse the source on GitHub", href: links.gtRacingRepo, icon: "github" },
              { label: "All GitHub releases", href: links.gtRacingReleases, icon: "archive" },
            ],
          },
        ],
      },
    ],
  },

  gangstar: {
    projectId: "gangstar",
    eyebrow: "Case Study · 32-Bit Mac Preservation",
    title: "Gangstar: Miami Vindication",
    repoName: "Gangstar: Miami Vindication PC Port",
    summary:
      "How the desktop edition of an open-world action classic, stranded when macOS Catalina removed 32-bit support, was analysed and ported to Windows x86 and Linux as a verified V1.0.0 release.",
    art: "miami",
    image: null,
    facts: [
      { label: "Original platform", value: "32-bit Mac · OS X" },
      { label: "Binary", value: "x86 Mach-O" },
      { label: "Lost with", value: "macOS Catalina 10.15" },
      { label: "Preserved as", value: "Windows x86 & Linux · V1.0.0" },
    ],
    links: [
      { label: "GitHub Repository", href: links.gangstarRepo, icon: "github" },
      links.gangstarReleases && { label: "V1.0.0 Releases", href: links.gangstarReleases, icon: "tag" },
    ].filter(Boolean),
    sections: [
      {
        id: "why-lost",
        title: "Why It Was Lost",
        intro:
          "The Mac edition only ever shipped as a 32-bit x86 binary. Once macOS dropped 32-bit support entirely, every modern Mac refused to open it.",
        blocks: [
          {
            type: "timeline",
            items: [
              { when: "OS X era", title: "Shipped as 32-bit x86", body: "Built for Intel Macs as a legacy 32-bit Mach-O application." },
              { when: "macOS 10.13.4 · 2018", title: "Compatibility warnings", body: "macOS starts warning that 32-bit apps \"are not optimized for your Mac\"." },
              { when: "macOS 10.14 · 2018", title: "Last version to run it", body: "Mojave is the final macOS release that can still launch 32-bit apps." },
              { when: "macOS 10.15 · 2019", title: "Catalina removes 32-bit", body: "Catalina and every later macOS release refuse to launch the game." },
            ],
          },
          {
            type: "cards",
            items: [
              { icon: "broken", title: "64-bit only macOS", body: "Catalina removed the 32-bit runtime itself, so the original binary can't be worked around on modern Macs." },
              { icon: "laptop", title: "Apple Silicon makes it worse", body: "Newer ARM Macs add another architecture gap on top of the 32-bit removal." },
              { icon: "shield", title: "A port beats a VM", body: "A native build runs well on ordinary PCs without keeping an old macOS install alive." },
            ],
          },
        ],
      },
      {
        id: "porting",
        title: "Cross-Platform Windows & Linux Porting",
        intro:
          "The 32-bit x86 binary was analysed and lifted, then rebuilt on a portable platform layer so the same game code targets both Windows and Linux.",
        blocks: [
          {
            type: "flow",
            caption: "Porting pipeline",
            steps: [
              { icon: "laptop", title: "32-bit x86 Mach-O", body: "Original OS X application and assets" },
              { icon: "terminal", title: "Binary analysis & lifting", body: "Map functions, data and OS dependencies" },
              { icon: "layers", title: "Portable platform layer", body: "Windowing, input and file system for both targets" },
              { icon: "cube", title: "Modernized OpenGL ES", body: "Rendering fixes and performance passes" },
              { icon: "monitor", title: "Windows x86 & Linux", body: "Native builds for the V1.0.0 release" },
            ],
          },
          {
            type: "cards",
            items: [
              { icon: "terminal", title: "Binary lifting", body: "Recovering the game's logic from the shipped x86 binary so it can be rebuilt against non-Apple platforms." },
              { icon: "shader", title: "Multi-pass MSAA depth resolves", body: "Fixes depth-dependent effects so anti-aliasing and the original render passes work together correctly." },
              { icon: "cube", title: "VBO caching", body: "Geometry is kept in GPU vertex buffers instead of re-uploaded each frame, removing a major desktop bottleneck." },
              { icon: "keyboard", title: "Input adaptation", body: "Controls are adapted for desktop keyboards and controllers on both Windows and Linux." },
            ],
          },
        ],
      },
      {
        id: "release",
        title: "Release Packaging (V1.0.0)",
        intro:
          "V1.0.0 ships as two archives, one per platform. Each is published with a SHA-256 checksum, so anyone can verify their download is byte-for-byte the official build.",
        blocks: [
          {
            type: "cards",
            items: [
              { icon: "monitor", title: "Windows x86 · .zip", body: "Native Windows build. Extract and play, no installer required." },
              { icon: "terminal", title: "Linux · tarball", body: "Native Linux build packaged as a compressed .tar archive." },
              { icon: "shield", title: "SHA-256 checksums", body: "Published hashes for each archive so downloads can be verified before running." },
            ],
          },
          {
            type: "code",
            caption: "Verify a download",
            snippets: [
              { label: "Windows (PowerShell)", code: "Get-FileHash .\\<archive>.zip -Algorithm SHA256" },
              { label: "Linux", code: "sha256sum <archive>.tar.gz" },
            ],
            note: "Compare the printed hash with the one published next to the release.",
          },
          {
            type: "checklist",
            title: "Release hygiene",
            items: [
              "Clean, telemetry-free release packaging",
              "Development artifacts stripped from production builds",
              "Separate verified archives for Windows x86 and Linux",
              "Rendering bottlenecks audited for smooth desktop gameplay",
            ],
          },
          {
            type: "links",
            items: [
              {
                label: links.gangstarReleases ? "Download V1.0.0 from GitHub Releases" : "Find the release on GitHub",
                href: links.gangstarReleases ?? links.gangstarRepo,
                icon: "tag",
                primary: true,
              },
              { label: "Browse the source on GitHub", href: links.gangstarRepo, icon: "github" },
            ],
          },
        ],
      },
    ],
  },
};

/* -------------------------------------------------------------------------- */
/*                               Logo marquee                                 */
/* -------------------------------------------------------------------------- */

export const logoItems = [
  { name: "Static Recompilation", color: "#6ee7ff" },
  { name: "ARMv7", color: "#82aaff" },
  { name: "x86", color: "#a78bfa" },
  { name: "OpenGL ES", color: "#6ee7ff" },
  { name: "GLSL Shaders", color: "#c084fc" },
  { name: "ANGLE", color: "#f472b6" },
  { name: "C++", color: "#82aaff" },
  { name: "Win32 API", color: "#38bdf8" },
  { name: "Linux", color: "#facc15" },
  { name: "Cloudflare Workers", color: "#f38020" },
  { name: "D1 Database", color: "#fb923c" },
];

/* -------------------------------------------------------------------------- */
/*                                 Abilities                                  */
/* -------------------------------------------------------------------------- */

export const abilities = [
  {
    icon: "chip",
    title: "Static Binary Recompilation",
    desc: "Translating 32-bit ARMv7 iPad and x86 Mac binaries ahead of time into native Windows and Linux executables, with no emulator in the loop.",
  },
  {
    icon: "shader",
    title: "Legacy Graphics Modernization",
    desc: "Bringing OpenGL ES 1.1/2.0 renderers to desktop GPUs with PVRTC decoding, custom PostFX shaders, multi-pass MSAA depth resolves and VBO caching.",
  },
  {
    icon: "shield",
    title: "Preservation-Grade Releases",
    desc: "Remappable keyboard and gamepad controls, restored online features on Cloudflare Workers + D1, and SHA-256 verified, telemetry-free builds.",
  },
];

/* -------------------------------------------------------------------------- */
/*                          Experience / milestones                           */
/* -------------------------------------------------------------------------- */

export const expCards = [
  {
    title: "Lead Recompilation & Graphics Engineer",
    project: "GTRacingMotorAcademyRecomp",
    period: "v1.0.0 · 32-Bit iPad → Windows",
    icon: "flag",
    review:
      "Preserved a 32-bit iPad racer that iOS 11 left unplayable, as a native Windows build with modern graphics options, full controller support and a working online leaderboard.",
    platforms: ["ARMv7 → Windows", "OpenGL ES", "Cloudflare D1"],
    responsibilities: [
      "Statically recompiled the 32-bit ARMv7 iPad binary into the v1.0.0 native Windows release.",
      "Built custom OpenGL ES shaders with instant-apply PostFX and motion blur tuning, plus PVRTC decoding.",
      "Implemented full keyboard and gamepad controls with customizable bindings.",
      "Restored the online leaderboard on Cloudflare Workers + D1 (`gt-redbull-board`).",
    ],
  },
  {
    title: "Lead Porting & Systems Engineer",
    project: "Gangstar: Miami Vindication PC Port",
    period: "V1.0.0 · 32-Bit Mac → Windows x86 & Linux",
    icon: "city",
    review:
      "Rescued the desktop edition of an open-world classic from 64-bit-only macOS, shipping verified native packages for two platforms.",
    platforms: ["x86 Mach-O", "Windows x86", "Linux", "SHA-256"],
    responsibilities: [
      "Analysed and ported the 32-bit x86 OS X binary to native Windows (x86) and Linux builds.",
      "Modernized the rendering pipeline with multi-pass MSAA depth resolves and VBO caching.",
      "Published SHA-256 verified V1.0.0 archives so every download can be checked.",
      "Stripped development artifacts for clean, telemetry-free production builds.",
    ],
  },
  {
    title: "Graphics Pipeline & Input Systems Researcher",
    project: "32-Bit Game Preservation",
    period: "Shared Systems · Across Ports",
    icon: "layers",
    review:
      "Turned one-off fixes into reusable rendering and input building blocks that every preservation port can use.",
    platforms: ["MSAA", "VBO Caching", "PVRTC", "Gamepad"],
    responsibilities: [
      "Developed reusable OpenGL ES optimization passes: multi-pass MSAA depth resolves and VBO caching.",
      "Implemented PVRTC texture handling for legacy iOS assets on desktop GPUs.",
      "Designed responsive gamepad menu snap navigation shared across ports.",
    ],
  },
];

/* -------------------------------------------------------------------------- */
/*                                 Tech stack                                 */
/* -------------------------------------------------------------------------- */

/**
 * `emblem` selects a procedural 3D emblem. Set `glbPath` (relative to
 * `/public`) to render your own `.glb` model in its place.
 */
export const techStackIcons = [
  {
    name: "C / C++ & Recomp",
    subtitle: "Binary & Native Systems",
    emblem: "cpp",
    glbPath: null,
    scale: 1,
    rotation: [0, 0, 0],
  },
  {
    name: "OpenGL ES & GLSL",
    subtitle: "Graphics & PostFX Shaders",
    emblem: "opengl",
    glbPath: null,
    scale: 1,
    rotation: [0, 0, 0],
  },
  {
    name: "ANGLE & Win32 / Linux",
    subtitle: "Cross-Platform Desktop",
    emblem: "platforms",
    glbPath: null,
    scale: 1,
    rotation: [0, 0, 0],
  },
  {
    name: "Cloudflare Workers & D1",
    subtitle: "Restored Online Services",
    emblem: "cloudflare",
    glbPath: null,
    scale: 1,
    rotation: [0, 0, 0],
  },
  {
    name: "Git & GitHub Releases",
    subtitle: "Verified Packaging",
    emblem: "git",
    glbPath: null,
    scale: 1,
    rotation: [0, 0, 0],
  },
];

/* -------------------------------------------------------------------------- */
/*                     Release & technical highlights                         */
/* -------------------------------------------------------------------------- */

/**
 * Verifiable facts from the shipped releases. There are no third-party quotes;
 * each entry links to the public release or source it describes.
 */
export const highlights = [
  {
    icon: "flag",
    title: "A lost iPad racer, playable again on Windows",
    project: "GTRacingMotorAcademyRecomp",
    release: "v1.0.0 · Windows",
    summary:
      "A full static recompilation of Gameloft's GT Racing: Motor Academy. iOS 11 made the 32-bit iPad version unplayable; it now runs as a native Windows executable instead of under emulation.",
    tags: ["Static Recompilation", "ARMv7", "Windows"],
    link: { label: "Release Notes", href: links.gtRacingReleaseNotes },
  },
  {
    icon: "shader",
    title: "Instant-apply PostFX & motion blur",
    project: "GTRacingMotorAcademyRecomp",
    release: "v1.0.0 · Graphics",
    summary:
      "Custom OpenGL ES shader passes for bloom, specular and motion blur, with graphics toggles that apply in-game without a restart.",
    tags: ["OpenGL ES", "GLSL", "PostFX"],
    link: { label: "Release Notes", href: links.gtRacingReleaseNotes },
  },
  {
    icon: "gamepad",
    title: "Touch controls → full keyboard & gamepad",
    project: "GTRacingMotorAcademyRecomp",
    release: "v1.0.0 · Input",
    summary:
      "The original touch and tilt controls become customizable keyboard and controller bindings, plus gamepad menu snap navigation so every screen is reachable from a controller.",
    tags: ["Input Systems", "Gamepad", "QoL"],
    link: { label: "GitHub Repository", href: links.gtRacingRepo },
  },
  {
    icon: "cloud",
    title: "Dead servers, restored leaderboard",
    project: "GTRacingMotorAcademyRecomp",
    release: "Edge Backend",
    summary:
      "The original online servers are gone, so the leaderboard was rebuilt on Cloudflare Workers with a D1 database (`gt-redbull-board`), serving results from the edge.",
    tags: ["Cloudflare Workers", "D1 Database"],
    link: { label: "GitHub Repository", href: links.gtRacingRepo },
  },
  {
    icon: "city",
    title: "Gangstar escapes 64-bit-only macOS",
    project: "Gangstar: Miami Vindication PC Port",
    release: "V1.0.0 · Windows x86 & Linux",
    summary:
      "The 32-bit Mac edition, blocked since macOS Catalina, now ships as native Windows x86 and Linux packages published as SHA-256 verified archives.",
    tags: ["x86", "Windows", "Linux", "SHA-256"],
    link: {
      label: links.gangstarReleases ? "Releases" : "GitHub Repository",
      href: links.gangstarReleases ?? links.gangstarRepo,
    },
  },
  {
    icon: "layers",
    title: "Shared OpenGL ES preservation layer",
    project: "GT Racing & Gangstar ports",
    release: "Shared Systems · Across Ports",
    summary:
      "Reusable rendering work used by both ports: multi-pass MSAA depth resolves, VBO caching and PVRTC texture handling for legacy iOS assets.",
    tags: ["MSAA", "VBO Caching", "PVRTC"],
    link: { label: "GT Racing Source", href: links.gtRacingRepo },
  },
];

/* -------------------------------------------------------------------------- */
/*                            Contact & community                             */
/* -------------------------------------------------------------------------- */

export const communityLinks = [
  { name: "GitHub Profile", handle: `@${githubUser}`, icon: "github", url: links.githubProfile },
  { name: "GT Racing Recomp", handle: GT_RACING_REPO, icon: "flag", url: links.gtRacingRepo },
  { name: "Gangstar PC Port", handle: GANGSTAR_REPO ?? "Miami Vindication", icon: "city", url: links.gangstarRepo },
  { name: "GT Racing Release Notes", handle: "v1.0.0", icon: "tag", url: links.gtRacingReleaseNotes },
];

/* -------------------------------------------------------------------------- */
/*                                   Footer                                   */
/* -------------------------------------------------------------------------- */

export const socialLinks = [
  { name: "GitHub", icon: "github", url: links.githubProfile },
  { name: "GT Racing Release Notes", icon: "tag", url: links.gtRacingReleaseNotes },
  links.twitter && { name: "X / Twitter", icon: "x", url: links.twitter },
].filter(Boolean);

/* -------------------------------------------------------------------------- */
/*                                   EmailJS                                  */
/* -------------------------------------------------------------------------- */

export const emailConfig = {
  serviceId: env.VITE_APP_EMAILJS_SERVICE_ID,
  templateId: env.VITE_APP_EMAILJS_TEMPLATE_ID,
  publicKey: env.VITE_APP_EMAILJS_PUBLIC_KEY,
};

export const isEmailConfigured = Boolean(
  emailConfig.serviceId && emailConfig.templateId && emailConfig.publicKey,
);
