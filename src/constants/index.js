/**
 * Portfolio content for Adriansyah Prasetya Nugraha.
 *
 * Every section of the site reads its data from this file, so updating copy,
 * links, screenshots or 3D models never requires touching component code.
 *
 * Optional assets: drop files into `/public` and reference them with a path
 * relative to `/public` (for example `images/gt-racing.png` or
 * `models/room.glb`). Leave a value as `null` to use the built-in procedural
 * artwork / 3D meshes instead.
 */

const env = import.meta.env;

/* -------------------------------------------------------------------------- */
/*                              Link configuration                            */
/* -------------------------------------------------------------------------- */

/**
 * Resolves the GitHub username in this order:
 * 1. `VITE_GITHUB_USERNAME` (set automatically by the GitHub Pages workflow)
 * 2. the `<username>.github.io` hostname when served from GitHub Pages
 * When neither is available, links fall back to GitHub search pages, which
 * always resolve and lead straight to the repositories.
 */
const resolveGithubUser = () => {
  if (env.VITE_GITHUB_USERNAME) return env.VITE_GITHUB_USERNAME.trim();
  if (typeof window !== "undefined") {
    const host = window.location.hostname;
    if (host.endsWith(".github.io")) return host.replace(".github.io", "");
  }
  return null;
};

export const githubUser = resolveGithubUser();

const GT_RACING_REPO = "GTRacingMotorAcademyRecomp";
const GANGSTAR_REPO = env.VITE_GANGSTAR_REPO?.trim() || null;
const TWITTER_HANDLE = env.VITE_TWITTER_HANDLE?.trim().replace(/^@/, "") || null;

const repoSearch = (query) =>
  `https://github.com/search?q=${encodeURIComponent(query)}&type=repositories`;

const repoUrl = (repo) =>
  githubUser ? `https://github.com/${githubUser}/${repo}` : repoSearch(repo);

export const links = {
  githubProfile: githubUser
    ? `https://github.com/${githubUser}`
    : repoSearch(GT_RACING_REPO),
  gtRacingRepo: repoUrl(GT_RACING_REPO),
  gtRacingReleases: githubUser
    ? `${repoUrl(GT_RACING_REPO)}/releases`
    : repoSearch(GT_RACING_REPO),
  gtRacingReleaseNotes: "http://tiny.cc/gtracingpc",
  gangstarRepo:
    GANGSTAR_REPO && githubUser
      ? repoUrl(GANGSTAR_REPO)
      : githubUser
        ? `https://github.com/${githubUser}?tab=repositories&q=gangstar`
        : repoSearch("Gangstar Miami Vindication PC port"),
  gangstarReleases:
    GANGSTAR_REPO && githubUser ? `${repoUrl(GANGSTAR_REPO)}/releases` : null,
  twitter: TWITTER_HANDLE
    ? `https://x.com/${TWITTER_HANDLE}`
    : `https://x.com/search?q=${encodeURIComponent(GT_RACING_REPO)}`,
};

/* -------------------------------------------------------------------------- */
/*                                   Navbar                                   */
/* -------------------------------------------------------------------------- */

export const navLinks = [
  { name: "Work", link: "#work" },
  { name: "Experience", link: "#experience" },
  { name: "Skills", link: "#skills" },
  { name: "Highlights", link: "#highlights" },
];

/* -------------------------------------------------------------------------- */
/*                                    Hero                                    */
/* -------------------------------------------------------------------------- */

export const words = [
  { text: "Engine Code", icon: "code" },
  { text: "Shaders", icon: "shader" },
  { text: "Recomp Ports", icon: "chip" },
  { text: "OpenGL ES", icon: "cube" },
];

export const heroContent = {
  headlineLines: ["into Native PC Ports", "that Deliver Results"],
  bio: "Hi, I'm Adriansyah Prasetya Nugraha — a Systems & Graphics Developer based in Semarang, Indonesia, specializing in static binary recompilation, OpenGL ES rendering optimization, and bringing classic mobile games natively to Windows & Linux.",
  ctaText: "See My Work",
};

/** Optional `.glb` that replaces the procedural developer room in the hero. */
export const heroScene = {
  modelPath: null, // e.g. "models/hero-room.glb"
  scale: 1,
  position: [0, 0, 0],
  rotation: [0, 0, 0],
};

/** Optional `.glb` that replaces the procedural desk in the contact section. */
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
  { value: 2, suffix: "", label: "Flagship PC Recomp Ports" },
  { value: 60, suffix: "+", label: "FPS Native Desktop Targets" },
  { value: 2, suffix: "", label: "Platforms Supported (Windows & Linux)" },
  { value: 100, suffix: "%", label: "Open-Source GitHub Releases" },
];

/* -------------------------------------------------------------------------- */
/*                              Featured projects                             */
/* -------------------------------------------------------------------------- */

/**
 * `art` selects the built-in SVG preview. Set `image` to a screenshot path
 * inside `/public` to show a real gameplay capture instead.
 */
export const projects = [
  {
    id: "gt-racing",
    layout: "primary",
    title: "GTRacingMotorAcademyRecomp — Native Windows PC Recompilation Port",
    description:
      "Full static recompilation and PC port of Gameloft's GT Racing: Motor Academy for Windows (v1.0.0 release). Engineered with custom OpenGL ES shaders, real-time PostFX & motion blur tuning, customizable keyboard & gamepad bindings, and a Cloudflare Workers + D1 cloud leaderboard backend (`gt-redbull-board`).",
    tags: ["C/C++", "OpenGL ES", "GLSL Shaders", "Cloudflare Workers", "D1 Database"],
    art: "racing",
    image: null, // drop a 16:9 capture at public/images/gtracing-pc.png, then set "images/gtracing-pc.png"
    links: [
      { label: "GitHub Repository", href: links.gtRacingRepo, icon: "github" },
      { label: "Release Notes", href: links.gtRacingReleaseNotes, icon: "tag" },
    ],
  },
  {
    id: "gangstar",
    layout: "secondary",
    title: "Gangstar: Miami Vindication — Cross-Platform PC Port (Windows & Linux)",
    description:
      "Native x86 Windows and Linux desktop port of Gameloft's classic open-world title (`V1.0.0` release with SHA-256 verified archives). Features optimized rendering pipelines, custom input controls, and clean release packaging.",
    tags: ["C/C++", "OpenGL ES", "Windows x86", "Linux", "Reverse Engineering"],
    art: "miami",
    image: null, // drop a 16:9 capture at public/images/gangstar-mv-pc.png, then set "images/gangstar-mv-pc.png"
    links: [
      { label: "GitHub Repository", href: links.gangstarRepo, icon: "github" },
      links.gangstarReleases && {
        label: "Releases",
        href: links.gangstarReleases,
        icon: "tag",
      },
    ].filter(Boolean),
  },
  {
    id: "gles-architecture",
    layout: "secondary",
    title: "OpenGL ES Graphics & Input Optimization Architecture",
    description:
      "Reusable rendering and control systems built across the GT Racing and Gangstar ports, featuring multi-pass MSAA depth resolves, VBO caching, hybrid GPU execution, and native gamepad menu snap navigation.",
    tags: ["ANGLE", "VBO Caching", "MSAA", "Gamepad Input", "PostFX"],
    art: "pipeline",
    image: null, // e.g. "images/pipeline.png"
    links: [
      { label: "GT Racing Source", href: links.gtRacingRepo, icon: "github" },
      { label: "Gangstar Source", href: links.gangstarRepo, icon: "github" },
    ],
  },
];

/* -------------------------------------------------------------------------- */
/*                               Logo marquee                                 */
/* -------------------------------------------------------------------------- */

export const logoItems = [
  { name: "OpenGL ES", color: "#6ee7ff" },
  { name: "C++", color: "#82aaff" },
  { name: "GLSL Shaders", color: "#a78bfa" },
  { name: "ANGLE", color: "#f472b6" },
  { name: "Win32 API", color: "#38bdf8" },
  { name: "Linux", color: "#facc15" },
  { name: "Cloudflare Workers", color: "#f38020" },
  { name: "D1 Database", color: "#fb923c" },
  { name: "Three.js", color: "#d9ecff" },
];

/* -------------------------------------------------------------------------- */
/*                                 Abilities                                  */
/* -------------------------------------------------------------------------- */

export const abilities = [
  {
    icon: "chip",
    title: "Static Binary Recompilation",
    desc: "Translating legacy iOS/iPad ARM mobile titles into native, high-framerate desktop builds for Windows and Linux without emulation overhead.",
  },
  {
    icon: "shader",
    title: "Low-Level Graphics & Shader Tuning",
    desc: "Optimizing OpenGL ES 1.1/2.0 rendering pipelines with custom PostFX bloom/specular passes, multi-pass MSAA depth resolves, and VBO caching.",
  },
  {
    icon: "gamepad",
    title: "Modern PC Quality-of-Life & Edge Backends",
    desc: "Adding full keyboard/gamepad remapping, instant graphics toggles, privacy-hardened release builds, and Cloudflare Workers + D1 online leaderboards.",
  },
];

/* -------------------------------------------------------------------------- */
/*                          Experience / milestones                           */
/* -------------------------------------------------------------------------- */

export const expCards = [
  {
    title: "Lead Recompilation & Graphics Engineer",
    project: "GTRacingMotorAcademyRecomp",
    period: "v1.0.0 · Windows Release",
    icon: "flag",
    review:
      "Took a mobile-only racer to a native high-framerate Windows build with modern PC graphics options, full controller support and an online leaderboard.",
    platforms: ["Windows", "OpenGL ES", "Cloudflare D1"],
    responsibilities: [
      "Shipped the v1.0.0 Windows release with instant-apply PostFX and motion blur tuning.",
      "Implemented full keyboard and gamepad controls with customizable bindings.",
      "Deployed the Cloudflare Workers + D1 cloud leaderboard backend (`gt-redbull-board`).",
      "Hardened release builds for privacy-respecting, clean public distribution.",
    ],
  },
  {
    title: "Lead Porting & Systems Engineer",
    project: "Gangstar: Miami Vindication PC Port",
    period: "V1.0.0 · Windows x86 & Linux",
    icon: "city",
    review:
      "Delivered a classic open-world title as verified native packages for two desktop platforms, with production-clean builds on both.",
    platforms: ["Windows x86", "Linux", "SHA-256"],
    responsibilities: [
      "Built and verified V1.0.0 cross-platform release packages for Windows (x86) and Linux.",
      "Published SHA-256 verified archives so every download can be checked.",
      "Stripped development artifacts for clean production builds.",
      "Audited rendering bottlenecks to keep desktop gameplay smooth.",
    ],
  },
  {
    title: "Graphics Pipeline & Input Systems Researcher",
    project: "Gameloft Legacy Preservation",
    period: "Shared Systems · Across Ports",
    icon: "layers",
    review:
      "Turned one-off fixes into reusable rendering and input building blocks that every port benefits from.",
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
    subtitle: "Edge Leaderboards",
    emblem: "cloudflare",
    glbPath: null,
    scale: 1,
    rotation: [0, 0, 0],
  },
  {
    name: "Git & GitHub Releases",
    subtitle: "CI/CD & Packaging",
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
 * Verifiable facts from the shipped releases — no third-party quotes.
 * Each entry links to the public release it describes.
 */
export const highlights = [
  {
    icon: "flag",
    title: "GT Racing v1.0.0 ships natively on Windows",
    project: "GTRacingMotorAcademyRecomp",
    release: "v1.0.0 · Windows",
    summary:
      "A full static recompilation of Gameloft's GT Racing: Motor Academy, running as a native high-framerate Windows build instead of under emulation.",
    tags: ["Static Recompilation", "Windows", "C/C++"],
    link: { label: "Release Notes", href: links.gtRacingReleaseNotes },
  },
  {
    icon: "shader",
    title: "Instant-apply PostFX & motion blur",
    project: "GTRacingMotorAcademyRecomp",
    release: "v1.0.0 · Graphics",
    summary:
      "Custom OpenGL ES shader passes for PostFX bloom, specular and motion blur, with graphics toggles that apply in-game without a restart.",
    tags: ["OpenGL ES", "GLSL", "PostFX"],
    link: { label: "Release Notes", href: links.gtRacingReleaseNotes },
  },
  {
    icon: "gamepad",
    title: "Full keyboard & gamepad remapping",
    project: "GTRacingMotorAcademyRecomp",
    release: "v1.0.0 · Input",
    summary:
      "Customizable keyboard and controller bindings plus gamepad menu snap navigation, so every screen is reachable from a controller.",
    tags: ["Input Systems", "Gamepad", "QoL"],
    link: { label: "GitHub Repository", href: links.gtRacingRepo },
  },
  {
    icon: "cloud",
    title: "Edge-hosted cloud leaderboard",
    project: "GTRacingMotorAcademyRecomp",
    release: "Edge Backend",
    summary:
      "An online leaderboard backend built on Cloudflare Workers with a D1 database (`gt-redbull-board`), serving results from the edge.",
    tags: ["Cloudflare Workers", "D1 Database"],
    link: { label: "GitHub Repository", href: links.gtRacingRepo },
  },
  {
    icon: "city",
    title: "Gangstar V1.0.0 for Windows x86 & Linux",
    project: "Gangstar: Miami Vindication PC Port",
    release: "V1.0.0 · Windows x86 & Linux",
    summary:
      "Cross-platform release packages for two desktop platforms, published as SHA-256 verified archives so every download can be checked.",
    tags: ["Windows x86", "Linux", "SHA-256"],
    link: {
      label: links.gangstarReleases ? "Releases" : "GitHub Repository",
      href: links.gangstarReleases ?? links.gangstarRepo,
    },
  },
  {
    icon: "layers",
    title: "Shared OpenGL ES optimization layer",
    project: "GT Racing & Gangstar ports",
    release: "Shared Systems · Across Ports",
    summary:
      "Reusable rendering work used by both ports: multi-pass MSAA depth resolves, VBO caching and PVRTC texture handling for legacy iOS assets.",
    tags: ["MSAA", "VBO Caching", "PVRTC"],
    link: { label: "GT Racing Source", href: links.gtRacingRepo },
  },
];

/* -------------------------------------------------------------------------- */
/*                                   Footer                                   */
/* -------------------------------------------------------------------------- */

export const socialLinks = [
  { name: "GitHub", icon: "github", url: links.githubProfile },
  { name: "GT Racing Release Notes", icon: "tag", url: links.gtRacingReleaseNotes },
  { name: "X / Twitter", icon: "x", url: links.twitter },
];

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
