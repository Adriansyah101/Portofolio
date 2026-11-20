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
/** Exact Gangstar repo name. Without it, links open the GitHub profile. */
const GANGSTAR_REPO = env.VITE_GANGSTAR_REPO?.trim() || null;
const TWITTER_HANDLE = env.VITE_TWITTER_HANDLE?.trim().replace(/^@/, "") || null;

export const links = {
  githubProfile: GITHUB,
  gtRacingRepo: `${GITHUB}/${GT_RACING_REPO}`,
  gtRacingReleases: `${GITHUB}/${GT_RACING_REPO}/releases`,
  gtRacingReleaseNotes: "http://tiny.cc/gtracingpc",
  gangstarRepo: GANGSTAR_REPO ? `${GITHUB}/${GANGSTAR_REPO}` : GITHUB,
  gangstarReleases: GANGSTAR_REPO ? `${GITHUB}/${GANGSTAR_REPO}/releases` : null,
  twitter: TWITTER_HANDLE ? `https://x.com/${TWITTER_HANDLE}` : null,
  ferizy: "https://trip.ferizy.com",
};

/**
 * Official logos in `public/images/`, rendered by `<BrandLogo>`. Paths are
 * relative (`./images/...`) so they resolve under any GitHub Pages sub-path.
 * Candidates are tried in order; `emblem` (a drawn SVG) or `wordmark` (text)
 * is the last resort when no file loads. `width`/`height` are the intrinsic
 * size, used to reserve space before the image arrives.
 */
export const brandLogos = {
  asdp: {
    name: "PT ASDP Indonesia Ferry (Persero)",
    sources: ["./images/asdp.png", "./images/asdp.svg"],
    width: 1773,
    height: 1220,
    emblem: "asdp",
  },
  ferizy: {
    name: "Ferizy",
    sources: ["./images/ferizy.svg", "./images/ferizy.png"],
    width: 99,
    height: 42,
    wordmark: "ferizy",
  },
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

/** "Preservation" stays active on its case-study sub-routes (`/projects/*`). */
export const navLinks = [
  { name: "Home", to: routes.home, end: true },
  { name: "Journey", to: routes.journey },
  { name: "Preservation", to: routes.projects },
  { name: "Contact", to: routes.contact },
];

/* -------------------------------------------------------------------------- */
/*                                    Hero                                    */
/* -------------------------------------------------------------------------- */

/** Rotating focus areas under the hero headline. */
export const words = [
  { text: "Cloud & Edge", icon: "cloud" },
  { text: "System Ops", icon: "server" },
  { text: "C/C++ & Win32", icon: "code" },
  { text: "Infrastructure", icon: "layers" },
];

export const heroContent = {
  eyebrow: "Systems & Application Operations Engineer",
  headline: "Engineering Reliable Production Systems & Native Software Architecture",
  focusLabel: "Focused on",
  bio: "Hi, I'm Adriansyah Prasetya Nugraha — a Systems & Application Operations Engineer based in Semarang, Indonesia, experienced in high-availability national ticketing infrastructure (`trip.ferizy.com`), hybrid cloud/on-premise port deployments, industrial hardware integration, and low-level binary recompilation.",
  ctaText: "View My Work",
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

/** `text` shows a fixed word instead of an animated number. */
export const counterItems = [
  { value: 2, suffix: "+ Years", label: "Enterprise Production Operations" },
  { text: "Dozens", label: "Harbor & Cloud Deployments" },
  { value: 99.9, decimals: 1, suffix: "%", label: "Ticketing System Stability (`trip.ferizy.com`)" },
  { value: 2, suffix: "", label: "32-Bit Software Preservation Ports" },
];

/* -------------------------------------------------------------------------- */
/*                            Featured work (Home)                            */
/* -------------------------------------------------------------------------- */

/**
 * The two cards in the Home "Featured Work" section. The preservation card is
 * framed as systems engineering; game titles and artwork live on `/projects`.
 */
export const featuredWork = {
  enterprise: {
    logo: "asdp",
    kind: "Enterprise Application Operations",
    org: "PT ASDP Indonesia Ferry (Persero)",
    role: "Business Application Operational Support Staff",
    period: "2024 – 2026",
    summary:
      "Managed mission-critical ferry ticketing infrastructure (`trip.ferizy.com`), hybrid cloud/on-premise port deployments across dozens of harbors, and industrial Omron barrier gate hardware integration.",
    topology: [
      { icon: "cloud", title: "Cloud ticketing", body: "`trip.ferizy.com` online sales, kept highly available" },
      { icon: "server", title: "Harbor servers", body: "Ticketing and counter apps on-prem at dozens of ports" },
      { icon: "lock", title: "Barrier gates", body: "Omron-based automated gates at the Surabaya port" },
    ],
    stats: [
      { value: "2+ yrs", label: "Production operations" },
      { value: "Dozens", label: "Ferry ports deployed" },
      { value: "99.9%", label: "Ticketing stability" },
    ],
    tags: ["Hybrid Cloud", "Linux & Windows Servers", "Omron PLC", "Production Support"],
    cta: { label: "View Work Experience", to: routes.journey },
    link: { label: "trip.ferizy.com", href: links.ferizy, brand: "ferizy" },
  },
  preservation: {
    icon: "chip",
    kind: "Systems Engineering · Open Source",
    org: "32-Bit Software Preservation Archive",
    summary:
      "Legacy 32-bit applications that modern iOS and macOS can no longer launch, rebuilt as native Windows and Linux executables through static binary recompilation instead of emulation.",
    pipeline: [
      { icon: "chip", title: "32-bit ARMv7 / x86 binaries", body: "Original iPad and Mac executables" },
      { icon: "terminal", title: "Static recompilation", body: "Functions and control flow lifted to C/C++" },
      { icon: "shader", title: "OpenGL ES translation", body: "Legacy GL ES 1.1/2.0 served on desktop GPUs" },
      { icon: "monitor", title: "Native Windows & Linux", body: "SHA-256 verified, versioned releases" },
    ],
    tags: ["Static Recompilation", "ARMv7", "x86", "OpenGL ES", "Win32", "Linux"],
    cta: { label: "Open the Preservation Archive", to: routes.projects },
  },
};

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

/** Core technologies. `glyph` overrides the auto-generated monogram tile. */
export const logoItems = [
  { name: "Linux Servers", glyph: "LX" },
  { name: "Windows Server", glyph: "WS" },
  { name: "Hybrid Cloud" },
  { name: "Omron PLC / Barrier Gate", glyph: "OP" },
  { name: "trip.ferizy.com", glyph: "TF" },
  { name: "Production Ops" },
  { name: "Cloudflare Workers" },
  { name: "D1 Database" },
  { name: "C/C++", glyph: "C++" },
  { name: "Win32 API" },
  { name: "Static Recompilation" },
  { name: "ARMv7" },
  { name: "x86" },
  { name: "OpenGL ES" },
  { name: "Git & CI/CD", glyph: "CI" },
];

/* -------------------------------------------------------------------------- */
/*                                 Abilities                                  */
/* -------------------------------------------------------------------------- */

export const abilities = [
  {
    icon: "cloud",
    title: "Enterprise Application & Cloud Operations",
    desc: "Hybrid server deployments, high-traffic web system reliability (`trip.ferizy.com`), and production incident resolution.",
  },
  {
    icon: "lock",
    title: "Hardware & Field Systems Integration",
    desc: "End-to-end installation and configuration of industrial Omron automated barrier gate systems at major seaports.",
  },
  {
    icon: "chip",
    title: "Low-Level Binary Recompilation & Graphics Systems",
    desc: "Static recompilation of legacy 32-bit ARM/x86 software into native Windows and Linux executables.",
  },
];

/* -------------------------------------------------------------------------- */
/*                          Experience / milestones                           */
/* -------------------------------------------------------------------------- */

/**
 * Professional work experience on `/journey`, newest first. `logo` is a key of
 * `brandLogos` (official image, falling back to the drawn emblem, then `icon`).
 * `systems` lists production systems shown with their own logo.
 * Open-source preservation work lives on `/projects`, not here.
 */
export const expCards = [
  {
    kind: "Professional Experience",
    title: "Business Application Operational Support Staff",
    project: "PT ASDP Indonesia Ferry (Persero)",
    period: "2024 – 2026",
    logo: "asdp",
    icon: "server",
    review:
      "Managed mission-critical ferry ticketing infrastructure (`trip.ferizy.com`), hybrid cloud/on-premise port deployments across dozens of harbors, and industrial Omron barrier gate hardware integration.",
    platformsLabel: "Systems & Operations",
    platforms: ["trip.ferizy.com", "Hybrid Cloud", "On-Prem Harbor Servers", "Omron Barrier Gates", "Production Ops"],
    responsibilities: [
      "Deployed ticketing services and counter applications across both local harbor servers and cloud infrastructure spanning dozens of ferry ports nationwide.",
      "Installed, configured, and integrated Omron-based automated barrier gate hardware systems at the Surabaya port.",
      "Maintained high availability and operational stability for `trip.ferizy.com`, ensuring smooth, uninterrupted online ferry ticket transactions.",
    ],
    systems: [{ brand: "ferizy", label: "trip.ferizy.com", note: "National online ferry ticketing", href: links.ferizy }],
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
    name: "Linux & Windows Servers",
    subtitle: "Harbor & Cloud Hosts",
    emblem: "servers",
    glbPath: null,
    scale: 1,
    rotation: [0, 0, 0],
  },
  {
    name: "Hybrid Cloud",
    subtitle: "Cloud + On-Prem Deployments",
    emblem: "hybrid",
    glbPath: null,
    scale: 1,
    rotation: [0, 0, 0],
  },
  {
    name: "Omron PLC / Gate Integration",
    subtitle: "Industrial Field Hardware",
    emblem: "gate",
    glbPath: null,
    scale: 1,
    rotation: [0, 0, 0],
  },
  {
    name: "C / C++",
    subtitle: "Native & Low-Level Systems",
    emblem: "cpp",
    glbPath: null,
    scale: 1,
    rotation: [0, 0, 0],
  },
  {
    name: "Cloudflare Workers & D1",
    subtitle: "Edge Services & Storage",
    emblem: "cloudflare",
    glbPath: null,
    scale: 1,
    rotation: [0, 0, 0],
  },
  {
    name: "Git & CI/CD",
    subtitle: "Versioned, Repeatable Releases",
    emblem: "git",
    glbPath: null,
    scale: 1,
    rotation: [0, 0, 0],
  },
];

/* -------------------------------------------------------------------------- */
/*                       Operational impact highlights                        */
/* -------------------------------------------------------------------------- */

/** Production outcomes from PT ASDP, shown as GlowCards on `/journey`. */
export const highlights = [
  {
    icon: "server",
    title: "Nationwide port rollouts",
    project: "PT ASDP Indonesia Ferry (Persero)",
    release: "Deployment · Dozens of Ports",
    summary:
      "Ticketing services and counter applications rolled out to local harbor servers and cloud infrastructure across dozens of ferry ports nationwide.",
    tags: ["Hybrid Cloud", "On-Prem Servers", "Counter Apps"],
    link: null,
  },
  {
    icon: "lock",
    title: "Surabaya barrier gate integration",
    project: "PT ASDP Indonesia Ferry (Persero)",
    release: "Hardware · Surabaya Port",
    summary:
      "Omron-based automated barrier gate hardware installed, configured and integrated on site at the Surabaya port.",
    tags: ["Omron PLC", "Barrier Gate", "Field Integration"],
    link: null,
  },
  {
    icon: "shield",
    brand: "ferizy",
    title: "trip.ferizy.com reliability",
    project: "PT ASDP Indonesia Ferry (Persero)",
    release: "Availability · Online Ticketing",
    summary:
      "High availability and operational stability maintained for `trip.ferizy.com`, keeping online ferry ticket transactions smooth and uninterrupted.",
    tags: ["High Availability", "Production Support", "Uptime"],
    link: { label: "trip.ferizy.com", href: links.ferizy },
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
