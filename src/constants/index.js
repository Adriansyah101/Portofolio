/**
 * Portfolio content for Adriansyah Prasetya Nugraha (adriansyah101).
 *
 * Every page of the site reads its data from this file, so updating copy,
 * links, screenshots or 3D models never requires touching component code.
 *
 * Bilingual copy: every visible string is `tx("English", "Bahasa Indonesia")`.
 * Components resolve it with `useLocalized(...)` (src/context/LanguageContext.jsx),
 * so a value written as a plain string (a product name, a version tag) simply
 * shows the same text in both languages.
 *
 * Optional assets: drop files into `/public` and reference them with a path
 * relative to `/public` (for example `images/gtracing-pc.png` or
 * `models/room.glb`). Leave a value as `null` to use the built-in procedural
 * artwork / 3D meshes instead.
 */

import { tx } from "../utils/i18n.js";

const env = import.meta.env;

/* -------------------------------------------------------------------------- */
/*                              Link configuration                            */
/* -------------------------------------------------------------------------- */

/** Public address of the deployed site (canonical URL, OpenGraph, résumé footer). */
export const siteUrl = "https://adriansyahpn.com/";

/** GitHub account that owns every repository linked from the site. */
export const githubUser = env.VITE_GITHUB_USERNAME?.trim() || "Adriansyah101";

const GITHUB = `https://github.com/${githubUser}`;
const NISKALA_REPO = "NiskalaUtilities";
const GT_RACING_REPO = "GTRacingMotorAcademy-PC-Port";
const GANGSTAR_REPO = "GangstarMiamiVindication-PC-Port";
const TWITTER_HANDLE = env.VITE_TWITTER_HANDLE?.trim().replace(/^@/, "") || null;

/** Public contact address. The contact page and the footer link to it. */
export const contactEmail = "adriansyahprasetyanugraha1@gmail.com";

/** Gmail's web compose window addressed to `contactEmail`, with an optional subject. */
export const gmailComposeUrl = (subject = "") =>
  `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(contactEmail)}` +
  (subject ? `&su=${encodeURIComponent(subject)}` : "");

export const links = {
  githubProfile: GITHUB,
  niskalaRepo: `${GITHUB}/${NISKALA_REPO}`,
  niskalaReleases: `${GITHUB}/${NISKALA_REPO}/releases`,
  sidafRepo: `${GITHUB}/sidaf`,
  vrAirportRepo: `${GITHUB}/VR-Simulation-Airport`,
  warPlaneRepo: `${GITHUB}/War-Plane-1945`,
  warPlaneWeb: "https://gx.games/games/t2k4q0/war-plane-1945/tracks/b60326ee-2d4f-4321-91a8-59299f6f4831",
  gtRacingRepo: `${GITHUB}/${GT_RACING_REPO}`,
  gtRacingReleases: `${GITHUB}/${GT_RACING_REPO}/releases`,
  gangstarRepo: `${GITHUB}/${GANGSTAR_REPO}`,
  gangstarReleases: `${GITHUB}/${GANGSTAR_REPO}/releases`,
  twitter: TWITTER_HANDLE ? `https://x.com/${TWITTER_HANDLE}` : null,
  ferizy: "https://trip.ferizy.com",
};

/**
 * Repositories whose latest GitHub release drives the version badges and
 * release links (src/hooks/useGitHubReleases.js), keyed by project id. The
 * fallback is shown while loading and whenever the API is unreachable or rate
 * limited; update it after a release if you like, but nothing breaks if not.
 */
export const releaseSources = {
  niskala: { repo: `${githubUser}/${NISKALA_REPO}`, fallbackTag: "V0.1.0", fallbackUrl: links.niskalaReleases },
  "gt-racing": { repo: `${githubUser}/${GT_RACING_REPO}`, fallbackTag: "V1.0.1", fallbackUrl: links.gtRacingReleases },
  gangstar: { repo: `${githubUser}/${GANGSTAR_REPO}`, fallbackTag: "V1.0.1", fallbackUrl: links.gangstarReleases },
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
  notes: "/notes",
  contact: "/contact",
};

/** "Projects" stays active on its case-study sub-routes (`/projects/*`). */
export const navLinks = [
  { id: "home", name: tx("Home", "Beranda"), to: routes.home, end: true },
  { id: "journey", name: tx("Journey", "Pengalaman"), to: routes.journey },
  { id: "projects", name: tx("Projects", "Proyek"), to: routes.projects },
  { id: "notes", name: tx("Notes", "Catatan"), to: routes.notes },
  { id: "contact", name: tx("Contact", "Kontak"), to: routes.contact },
];

/* -------------------------------------------------------------------------- */
/*                               Interface copy                               */
/* -------------------------------------------------------------------------- */

/**
 * Labels, buttons, headings and messages used by components (everything that
 * is not page content below). `{name}` placeholders are filled with `format()`.
 */
export const ui = {
  meta: {
    siteName: "Adriansyah Prasetya Nugraha",
    role: tx("Systems & Application Operations Engineer", "Engineer Sistem & Operasional Aplikasi"),
    notFound: tx("Page not found", "Halaman tidak ditemukan"),
  },
  common: {
    loading: tx("Loading page", "Memuat halaman"),
    technologies: tx("Technologies", "Teknologi"),
    readCaseStudy: tx("Read Case Study", "Baca Studi Kasus"),
    viewSource: tx("View Source on GitHub", "Lihat Source di GitHub"),
    onThisPage: tx("On this page", "Di halaman ini"),
  },
  nav: {
    homeLabel: tx("Adriansyah, home", "Adriansyah, beranda"),
    primary: tx("Primary", "Utama"),
    mobile: tx("Mobile", "Seluler"),
    openMenu: tx("Open menu", "Buka menu"),
    closeMenu: tx("Close menu", "Tutup menu"),
    language: tx("Language", "Bahasa"),
    preferences: tx("Display preferences", "Preferensi tampilan"),
    toLight: tx("Switch to light mode", "Beralih ke mode terang"),
    toDark: tx("Switch to dark mode", "Beralih ke mode gelap"),
    lightMode: tx("Light mode", "Mode terang"),
    darkMode: tx("Dark mode", "Mode gelap"),
    languageNames: { en: "English", id: "Bahasa Indonesia" },
  },
  hero: {
    sceneLabel: tx("Interactive 3D systems workstation", "Workstation sistem 3D interaktif"),
    waveBack: tx("Wave Back", "Sapa Balik"),
    presetsLabel: tx("Camera view", "Sudut kamera"),
    presets: {
      overview: tx("Overview", "Ringkasan"),
      desk: tx("Developer & Desk", "Meja Kerja"),
      telemetry: tx("System Telemetry", "Telemetri Sistem"),
    },
    openProjects: tx("Explore Projects & Preservation →", "Jelajahi Proyek & Preservasi →"),
    openJourney: tx("View Work Experience →", "Lihat Pengalaman Kerja →"),
    openNotes: tx("Read Engineering Notes →", "Baca Catatan Teknis →"),
    openContact: tx("Open Contact Desk →", "Buka Halaman Kontak →"),
  },
  cv: {
    download: tx("Download CV", "Unduh CV"),
    dialogTitle: tx("Résumé", "Curriculum Vitae"),
    print: tx("Print / Save as PDF", "Cetak / Simpan PDF"),
    downloadPdf: tx("Download PDF", "Unduh PDF"),
    close: tx("Close", "Tutup"),
    summary: tx("Profile", "Profil"),
    experience: tx("Experience", "Pengalaman"),
    projects: tx("Selected Projects", "Proyek Pilihan"),
    skills: tx("Skills", "Keahlian"),
    links: tx("Links", "Tautan"),
    contactNote: tx("Contact", "Kontak"),
  },
  github: {
    label: tx("GitHub activity", "Aktivitas GitHub"),
    live: tx("Live from the GitHub API", "Langsung dari GitHub API"),
    snapshot: tx("Snapshot from {date}", "Snapshot per {date}"),
    repos: tx("Public repositories", "Repositori publik"),
    stars: tx("Stars", "Bintang"),
    languages: tx("Top languages", "Bahasa teratas"),
    lastPush: tx("Last push", "Push terakhir"),
    languageCount: tx("{n} repos", "{n} repo"),
  },
  notes: {
    pageTitle: tx("Engineering Notes", "Catatan Teknis"),
    eyebrow: tx("Notes", "Catatan"),
    title: tx("Engineering Notes", "Catatan Teknis"),
    description: tx(
      "Technical write-ups in three parts (context, approach, outcome): OpenGL ES translation for the iPad port, and hybrid harbor-and-cloud ticketing operations.",
      "Tulisan teknis dalam tiga bagian (konteks, pendekatan, hasil): translasi OpenGL ES untuk port iPad, dan operasional tiket hybrid pelabuhan-dan-cloud.",
    ),
    read: tx("Read note", "Baca catatan"),
    minutes: tx("{n} min read", "{n} menit baca"),
    published: tx("Published", "Diterbitkan"),
    allNotes: tx("All notes", "Semua catatan"),
    backTo: tx("Back to", "Kembali ke"),
    nextNote: tx("Next note", "Catatan berikutnya"),
    related: tx("Related work", "Karya terkait"),
  },
  journey: {
    contactCta: tx("Get in Touch", "Hubungi Saya"),
    pageTitle: tx("Work Experience", "Pengalaman Kerja"),
    eyebrow: tx("Journey", "Perjalanan Karier"),
    title: tx("Work Experience", "Pengalaman Kerja"),
    description: tx(
      "Business application operations at PT ASDP Indonesia Ferry (Persero), 2024 – 2026: harbor and cloud deployments, barrier gate integration and production support for trip.ferizy.com.",
      "Operasional aplikasi bisnis di PT ASDP Indonesia Ferry (Persero), 2024 – 2026: deployment pelabuhan dan cloud, integrasi barrier gate, serta dukungan produksi untuk trip.ferizy.com.",
    ),
    tabsLabel: tx("Experience details", "Detail pengalaman"),
    tabs: {
      impact: tx("Operational Breakdown", "Rincian Operasional"),
      stack: tx("Enterprise Stack", "Stack Enterprise"),
      tech3d: tx("3D Tech Cards", "Kartu Teknologi 3D"),
    },
    stackIntro: tx(
      "The systems and tools behind day-to-day production operations, from harbor servers to the edge.",
      "Sistem dan tools di balik operasional produksi sehari-hari, dari server pelabuhan hingga edge.",
    ),
    tech3dHint: tx("Drag an emblem to turn it.", "Geser emblem untuk memutarnya."),
  },
  experience: {
    title: tx("Professional Experience", "Pengalaman Profesional"),
    productionSystems: tx("Production systems", "Sistem produksi"),
  },
  release: {
    latest: tx("Latest release", "Rilis terbaru"),
    published: tx("Published {date}", "Dirilis {date}"),
    files: tx("{n} files", "{n} berkas"),
  },
  projects: {
    pageTitle: tx("Projects", "Proyek"),
    eyebrow: tx("Projects", "Proyek"),
    title: tx("Original software & 32-bit preservation", "Software original & preservasi 32-bit"),
    description: tx(
      "Four original applications built from scratch and two native PC ports of 32-bit iPad and Mac software. The case studies cover each port in technical detail.",
      "Empat aplikasi original yang dibangun dari nol dan dua port PC native untuk software iPad dan Mac 32-bit. Studi kasus membahas setiap port secara teknis.",
    ),
    featured: tx("Featured Project", "Proyek Unggulan"),
    catalogTitle: tx("Project catalog", "Katalog proyek"),
    filterLabel: tx("Filter projects by category", "Filter proyek berdasarkan kategori"),
    showing: tx("Showing {n} of {total} projects", "Menampilkan {n} dari {total} proyek"),
    compareEyebrow: tx("Architecture comparison", "Perbandingan arsitektur"),
    compareTitle: tx(
      "Legacy 32-Bit iPad/Mac vs. Native Windows/Linux Port",
      "iPad/Mac 32-Bit Lama vs. Port Native Windows/Linux",
    ),
    compareDescription: tx(
      "What each application was built for, and what it runs on now.",
      "Untuk apa setiap aplikasi dibuat, dan di mana aplikasi itu berjalan sekarang.",
    ),
    aspect: tx("Aspect", "Aspek"),
    legacyTarget: tx("Legacy 32-bit target", "Target 32-bit lama"),
    nativePort: tx("Native Windows/Linux port", "Port native Windows/Linux"),
    compareCaption: tx(
      "{title}: legacy 32-bit target compared with the native Windows/Linux port",
      "{title}: target 32-bit lama dibandingkan dengan port native Windows/Linux",
    ),
    previewAlt: tx("{title} preview", "Pratinjau {title}"),
  },
  caseStudy: {
    pageTitle: tx("{title} Case Study", "Studi Kasus {title}"),
    breadcrumb: tx("Breadcrumb", "Breadcrumb"),
    atAGlance: tx("At a glance", "Sekilas"),
    backTo: tx("Back to", "Kembali ke"),
    allProjects: tx("All Projects", "Semua Proyek"),
    next: tx("Next case study", "Studi kasus berikutnya"),
    more: tx("More case studies", "Studi kasus lainnya"),
    offline: tx("Offline", "Offline"),
    replacedBy: tx("replaced by", "digantikan oleh"),
    architectureLabel: tx("Leaderboard architecture", "Arsitektur leaderboard"),
    copy: tx("Copy", "Salin"),
    copied: tx("Copied", "Tersalin"),
  },
  contact: {
    pageTitle: tx("Contact", "Kontak"),
    sceneLabel: tx(
      "3D desk scene: the developer avatar waves when you hover it or open the email options",
      "Adegan meja 3D: avatar developer melambai saat disorot atau saat Anda membuka opsi email",
    ),
    eyebrow: tx("Email · GitHub", "Email · GitHub"),
    title: tx("Contact", "Kontak"),
    description: tx(
      "For systems operations, infrastructure or application support roles, and questions about Windows utilities or binary porting: write via Gmail, or review the source code and releases on GitHub.",
      "Untuk peran operasional sistem, infrastruktur, atau dukungan aplikasi, serta pertanyaan seputar utilitas Windows atau porting biner: kirim email lewat Gmail, atau lihat source code dan rilisnya di GitHub.",
    ),
    communityTitle: tx("Source code & releases on GitHub", "Source code & rilis di GitHub"),
    mail: {
      label: "Gmail",
      title: tx("Write to me on Gmail", "Kirim email lewat Gmail"),
      body: tx(
        "Tell me about the role, the system or the project. Gmail opens a new message already addressed to me.",
        "Ceritakan peran, sistem, atau proyeknya. Gmail akan membuka pesan baru yang sudah berisi alamat saya.",
      ),
      compose: tx("Write in Gmail", "Tulis di Gmail"),
      composeLabel: tx("Write in Gmail (opens in a new tab)", "Tulis di Gmail (membuka tab baru)"),
      subject: tx("Hello Adriansyah, from your portfolio", "Halo Adriansyah, dari portofolio Anda"),
      copy: tx("Copy email", "Salin email"),
      copied: tx("Email copied", "Email tersalin"),
      otherApp: tx("Other mail app", "Aplikasi email lain"),
    },
  },
  footer: {
    rights: tx("All rights reserved.", "Hak cipta dilindungi."),
    navLabel: tx("Footer", "Footer"),
  },
  notFound: {
    eyebrow: tx("404 · Route Not Found", "404 · Halaman Tidak Ditemukan"),
    title: tx("This page could not be found", "Halaman ini tidak dapat ditemukan"),
    description: tx(
      "The link may be old or mistyped. Head back home, or see my work experience.",
      "Tautan mungkin sudah lama atau salah ketik. Kembali ke beranda, atau lihat pengalaman kerja saya.",
    ),
    home: tx("Back to Home", "Kembali ke Beranda"),
    journey: tx("View Work Experience", "Lihat Pengalaman Kerja"),
  },
};

/* -------------------------------------------------------------------------- */
/*                                    Hero                                    */
/* -------------------------------------------------------------------------- */

export const heroContent = {
  eyebrow: "Semarang, Indonesia",
  name: "Adriansyah Prasetya Nugraha",
  role: tx("Systems & Application Operations Engineer", "Engineer Sistem & Operasional Aplikasi"),
  focus: tx("Windows Systems & Binary Recompilation", "Sistem Windows & Rekompilasi Biner"),
  bio: tx(
    "Business Application Operational Support at PT ASDP Indonesia Ferry (2024–2026), managing nationwide port counter deployments, Omron barrier gate integration, and trip.ferizy.com stability. Independently engineering Windows system utilities (Niskala Utilities) and native PC static recompilation ports for 32-bit legacy software.",
    "Staf Dukungan Operasional Aplikasi Bisnis di PT ASDP Indonesia Ferry (2024–2026) yang menangani deployment layanan loket di puluhan pelabuhan, integrasi barrier gate Omron, dan operasional trip.ferizy.com. Secara independen mengembangkan utilitas sistem Windows (Niskala Utilities) serta port native PC berbasis rekompilasi biner statis untuk perangkat lunak klasik 32-bit.",
  ),
  ctaProjects: tx("Projects", "Proyek"),
  ctaJourney: tx("Journey", "Pengalaman"),
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
/*                                  Projects                                  */
/* -------------------------------------------------------------------------- */

/** Tabs on `/projects`; `?category=<id>` in the URL selects one. */
export const projectCategories = [
  { id: "all", label: tx("All", "Semua") },
  { id: "original", label: tx("Original Software", "Software Original") },
  { id: "preservation", label: tx("32-Bit Preservation", "Preservasi 32-Bit") },
];

/**
 * Heading, intro and category badge for each catalog section. The same `badge`
 * is repeated on every card in the section, so original work and binary
 * preservation work stay distinguishable at a glance.
 */
export const projectSections = {
  original: {
    index: "01",
    title: tx("Original Software", "Software Original"),
    badge: { label: tx("Original", "Original"), icon: "code" },
    description: tx(
      "A Windows system utility, an information system and interactive 3D and 2D applications, written from scratch.",
      "Utilitas sistem Windows, sistem informasi, serta aplikasi interaktif 3D dan 2D yang ditulis dari nol.",
    ),
  },
  preservation: {
    index: "02",
    title: tx("32-Bit Software Preservation", "Preservasi Software 32-Bit"),
    badge: { label: tx("32-Bit Preservation", "Preservasi 32-Bit"), icon: "archive" },
    description: tx(
      "Native PC ports of 32-bit iPad (ARMv7) and Mac (x86) applications that current iOS and macOS no longer run.",
      "Port PC native untuk aplikasi iPad (ARMv7) dan Mac (x86) 32-bit yang tidak lagi bisa dijalankan iOS dan macOS terbaru.",
    ),
  },
};

const ORIGINAL_BADGE = tx("Original Software", "Software Original");
const VIEW_SOURCE = tx("View Source on GitHub", "Lihat Source di GitHub");
const GITHUB_REPOSITORY = tx("GitHub Repository", "Repositori GitHub");
/** `{tag}` is filled with the latest GitHub release tag (src/hooks/useGitHubReleases.js). */
const RELEASE_TAG = tx("Release {tag}", "Rilis {tag}");

/**
 * Category A: original work, in display order (`featured` marks the top
 * project). `art` selects the built-in SVG preview; set `image` to a 16:9
 * screenshot path inside `/public` to show a real capture. A link with
 * `release` takes its URL and `{tag}` from that repository's latest release.
 */
export const originalProjects = [
  {
    id: "niskala",
    category: "original",
    featured: true,
    caseStudy: null,
    shortTitle: "Niskala Utilities",
    subtitle: tx("Windows Desktop & CLI Utility", "Utilitas Desktop & CLI Windows"),
    platform: ORIGINAL_BADGE,
    platformIcon: "terminal",
    categoryLabel: tx("System Utility", "Utilitas Sistem"),
    description: tx(
      "Modular Windows system utility combining WinUI & CLI interfaces, ETW installation monitoring and rollback, guarded leftover/registry cleanup with .reg backups, and non-destructive system maintenance (DISM, SFC, CHKDSK /scan).",
      "Utilitas sistem Windows modular dengan antarmuka WinUI & CLI, pemantauan instalasi berbasis ETW dan rollback, pembersihan sisa file/registry terproteksi dengan backup .reg, serta pemeliharaan sistem non-destruktif (DISM, SFC, CHKDSK /scan).",
    ),
    tags: ["C# / .NET", "WinUI & CLI", "Windows Internals / ETW", tx("System Maintenance", "Pemeliharaan Sistem")],
    art: "niskala",
    image: null, // e.g. "images/niskala.png" (16:9)
    links: [
      { label: VIEW_SOURCE, href: links.niskalaRepo, icon: "github" },
      { release: "niskala", label: RELEASE_TAG, href: links.niskalaReleases, icon: "tag" },
    ],
    comparison: null,
  },
  {
    id: "sidaf",
    category: "original",
    caseStudy: null,
    shortTitle: "SIDAF",
    subtitle: tx("Web Information System", "Sistem Informasi Web"),
    platform: ORIGINAL_BADGE,
    platformIcon: "code",
    categoryLabel: tx("Information System", "Sistem Informasi"),
    description: tx(
      "Full-stack web information system for structured data management, operational workflows and administrative reporting.",
      "Sistem informasi web full-stack untuk pengelolaan data terstruktur, alur kerja operasional, dan pelaporan administratif.",
    ),
    tags: ["PHP", "CodeIgniter", "JavaScript", "HTML & CSS"],
    art: "sidaf",
    image: null, // e.g. "images/sidaf.png" (16:9)
    links: [{ label: VIEW_SOURCE, href: links.sidafRepo, icon: "github" }],
    comparison: null,
  },
  {
    id: "vr-airport",
    category: "original",
    caseStudy: null,
    shortTitle: "VR Simulation Airport",
    subtitle: tx("Interactive 3D / Virtual Reality Simulation", "Simulasi 3D Interaktif / Virtual Reality"),
    platform: ORIGINAL_BADGE,
    platformIcon: "cube",
    categoryLabel: tx("VR & 3D Simulation", "Simulasi VR & 3D"),
    description: tx(
      "Virtual reality simulation of airport procedures, with spatial 3D navigation through terminal and airside areas on Oculus Quest 2 and PCVR.",
      "Simulasi prosedur bandara berbasis virtual reality, dengan navigasi spasial 3D di area terminal dan sisi udara pada Oculus Quest 2 dan PCVR.",
    ),
    tags: ["Unity", "C#", "Oculus Quest 2", "PCVR"],
    art: "airport",
    image: "images/vr-airport.jpg", // thumbnail of the demo video below
    video: { youtubeId: "oLm0qSSHeiM", title: "Demo Aplikasi Simulasi Prosedur Bandara Menggunakan Virtual Reality" },
    links: [{ label: VIEW_SOURCE, href: links.vrAirportRepo, icon: "github" }],
    comparison: null,
  },
  {
    id: "war-plane-1945",
    category: "original",
    caseStudy: null,
    shortTitle: "War Plane 1945",
    subtitle: tx("Custom 2D kinematics and collision systems", "Kinematika 2D dan sistem tabrakan kustom"),
    platform: ORIGINAL_BADGE,
    platformIcon: "controller",
    categoryLabel: tx("Interactive 2D Application", "Aplikasi Interaktif 2D"),
    description: tx(
      "Interactive 2D application built from scratch, with custom 2D movement kinematics, projectile logic, entity wave management and collision detection.",
      "Aplikasi interaktif 2D yang dibangun dari nol, dengan kinematika gerak 2D kustom, logika proyektil, manajemen gelombang entitas, dan deteksi tabrakan.",
    ),
    tags: ["GML", tx("2D Kinematics", "Kinematika 2D"), tx("Collision Detection", "Deteksi Tabrakan"), "Windows"],
    art: "warplane",
    image: "images/war-plane-1945.jpg", // thumbnail of the recording below
    video: { youtubeId: "LXDtVyzX5zQ", title: "War Plane 1945 - Demo" },
    links: [
      { label: VIEW_SOURCE, href: links.warPlaneRepo, icon: "github" },
      { label: tx("Open Web Build", "Buka Build Web"), href: links.warPlaneWeb, icon: "external" },
    ],
    comparison: null,
  },
];

/**
 * Category B: 32-bit software preservation. `comparison` feeds the "Legacy
 * 32-bit target vs. native port" table on `/projects` and in each case study.
 * `{tag}` is the repository's latest release tag.
 */
export const preservationProjects = [
  {
    id: "gt-racing",
    category: "preservation",
    caseStudy: routes.gtRacing,
    shortTitle: "GT Racing: Motor Academy",
    subtitle: tx("Native PC Software Port · Static Binary Recompilation", "Port Software PC Native · Rekompilasi Biner Statis"),
    platform: "32-Bit iPad",
    platformIcon: "tablet",
    origin: "32-bit iPad · ARMv7 / iOS",
    target: "Windows & Linux x86 · {tag}",
    description: tx(
      "Static binary recompilation of the 32-bit iPad (ARMv7) application into native Windows and Linux x86 builds, with no emulation at run time. Adds an OpenGL ES translation layer with live PostFX and motion blur, widescreen UI scaling, MSAA, remappable controls and a Cloudflare Workers + D1 leaderboard.",
      "Rekompilasi biner statis aplikasi iPad 32-bit (ARMv7) menjadi build Windows dan Linux x86 native, tanpa emulasi saat runtime. Dilengkapi lapisan translasi OpenGL ES dengan PostFX dan motion blur yang langsung berlaku, skala UI layar lebar, MSAA, kontrol yang bisa diatur ulang, serta leaderboard Cloudflare Workers + D1.",
    ),
    tags: [tx("Static Recompilation", "Rekompilasi Statis"), "ARMv7 → x86", "OpenGL ES", "Cloudflare D1"],
    art: "racing",
    image: "images/gtracing-pc.jpg", // thumbnail of the recording below
    imagePosition: "left center", // keeps the title text whole when the 16:9 thumbnail is cropped to 8:5
    video: { youtubeId: "cn-nsNnlO7E", title: "GT Racing Motor Academy PC Port - Ferrari 288 GTO" },
    links: [
      { label: GITHUB_REPOSITORY, href: links.gtRacingRepo, icon: "github" },
      { release: "gt-racing", label: RELEASE_TAG, href: links.gtRacingReleases, icon: "tag" },
    ],
    comparison: [
      { id: "platform", aspect: "Platform", original: "32-bit iPad / iOS", modern: "Windows & Linux (x86)" },
      {
        id: "cpu",
        aspect: tx("CPU code", "Kode CPU"),
        original: tx("32-bit ARMv7 and Thumb machine code", "Kode mesin ARMv7 dan Thumb 32-bit"),
        modern: tx("23,873 functions recompiled ahead of time to C, built for x86", "23.873 fungsi direkompilasi lebih dulu ke C, di-build untuk x86"),
      },
      {
        id: "graphics",
        aspect: tx("Graphics", "Grafis"),
        original: tx("OpenGL ES 1.1/2.0 on PowerVR GPUs", "OpenGL ES 1.1/2.0 di GPU PowerVR"),
        modern: tx("Desktop OpenGL 2.1 through a translation layer; PostFX, MSAA", "OpenGL 2.1 desktop melalui lapisan translasi; PostFX, MSAA"),
      },
      {
        id: "textures",
        aspect: tx("Textures", "Tekstur"),
        original: tx("PVRTC (PowerVR-only compression)", "PVRTC (kompresi khusus PowerVR)"),
        modern: tx("Decoded to RGBA at upload for any desktop GPU", "Didekode ke RGBA saat diunggah, untuk GPU desktop apa pun"),
      },
      {
        id: "display",
        aspect: tx("Display", "Tampilan"),
        original: tx("4:3 iPad screen", "Layar iPad 4:3"),
        modern: tx("Any resolution; 16:10, 16:9 and 21:9 with the UI kept in shape", "Resolusi apa pun; 16:10, 16:9, dan 21:9 dengan UI tetap proporsional"),
      },
      {
        id: "controls",
        aspect: tx("Controls", "Kontrol"),
        original: tx("Touchscreen & tilt", "Layar sentuh & kemiringan"),
        modern: tx("Keyboard, mouse and controllers, remappable", "Keyboard, mouse, dan controller yang bisa diatur ulang"),
      },
      {
        id: "online",
        aspect: "Online",
        original: tx("Original servers, shut down", "Server asli, sudah dimatikan"),
        modern: tx("Leaderboard on Cloudflare Workers + D1", "Leaderboard di Cloudflare Workers + D1"),
      },
      {
        id: "status",
        aspect: "Status",
        original: tx("Does not launch on iOS 11+", "Tidak bisa berjalan di iOS 11+"),
        modern: tx("Runs today · {tag}", "Berjalan hari ini · {tag}"),
      },
    ],
  },
  {
    id: "gangstar",
    category: "preservation",
    caseStudy: routes.gangstar,
    shortTitle: "Gangstar: Miami Vindication",
    subtitle: tx("Native PC Software Port · Mach-O Loader & Graphics Modernization", "Port Software PC Native · Loader Mach-O & Modernisasi Grafis"),
    platform: "32-Bit Mac",
    platformIcon: "laptop",
    origin: tx("32-bit Mac · x86 OS X (i386)", "Mac 32-bit · x86 OS X (i386)"),
    target: "Windows & Linux x86 · {tag}",
    description: tx(
      "Native Windows and Linux x86 port of the 32-bit Mac (i386 OS X) application: a custom Mach-O loader runs the original executable while host shims replace the macOS libraries it imports. Adds MSAA, VBO caching, bloom and reflection fixes, and SHA-256 verified release archives.",
      "Port native Windows dan Linux x86 dari aplikasi Mac 32-bit (i386 OS X): loader Mach-O kustom menjalankan executable aslinya, sementara host shim menggantikan pustaka macOS yang diimpornya. Dilengkapi MSAA, VBO caching, perbaikan bloom dan refleksi, serta arsip rilis terverifikasi SHA-256.",
    ),
    tags: [tx("Mach-O Loader", "Loader Mach-O"), "x86", "OpenGL 2.1", "SHA-256"],
    art: "miami",
    image: null, // drop a 16:9 capture at public/images/gangstar-mv-pc.png, then set "images/gangstar-mv-pc.png"
    links: [
      { label: GITHUB_REPOSITORY, href: links.gangstarRepo, icon: "github" },
      { release: "gangstar", label: RELEASE_TAG, href: links.gangstarReleases, icon: "tag" },
    ],
    comparison: [
      { id: "platform", aspect: "Platform", original: "32-bit Mac (OS X)", modern: "Windows & Linux (x86)" },
      {
        id: "binary",
        aspect: tx("Executable", "Executable"),
        original: tx("i386 Mach-O application", "Aplikasi Mach-O i386"),
        modern: tx("Original executable run by a custom Mach-O loader, no CPU emulation", "Executable asli dijalankan loader Mach-O kustom, tanpa emulasi CPU"),
      },
      {
        id: "libraries",
        aspect: tx("System libraries", "Pustaka sistem"),
        original: tx("macOS frameworks", "Framework macOS"),
        modern: tx("Host shims over SDL3 and OpenGL 2.1", "Host shim di atas SDL3 dan OpenGL 2.1"),
      },
      {
        id: "graphics",
        aspect: tx("Graphics", "Grafis"),
        original: tx("30 fps, original renderer", "30 fps, renderer asli"),
        modern: tx("60 fps default; MSAA, FXAA, ambient occlusion, dynamic shadows", "60 fps default; MSAA, FXAA, ambient occlusion, bayangan dinamis"),
      },
      {
        id: "controls",
        aspect: tx("Controls", "Kontrol"),
        original: tx("Mac keyboard and mouse", "Keyboard dan mouse Mac"),
        modern: tx("Keyboard plus Xbox and PlayStation controllers", "Keyboard serta controller Xbox dan PlayStation"),
      },
      {
        id: "distribution",
        aspect: tx("Distribution", "Distribusi"),
        original: tx("32-bit-only app bundle", "App bundle khusus 32-bit"),
        modern: tx("Windows .zip and Linux .tar.gz with SHA256SUMS.txt", ".zip Windows dan .tar.gz Linux dengan SHA256SUMS.txt"),
      },
      {
        id: "status",
        aspect: "Status",
        original: tx("Blocked since macOS Catalina 10.15", "Diblokir sejak macOS Catalina 10.15"),
        modern: tx("Runs today · {tag}", "Berjalan hari ini · {tag}"),
      },
    ],
  },
];

/** Every project, originals first (6 in total: 4 original + 2 preservation). */
export const projects = [...originalProjects, ...preservationProjects];

/* -------------------------------------------------------------------------- */
/*                               Counter metrics                              */
/* -------------------------------------------------------------------------- */

/** Home metric strip. `text` shows a fixed word instead of an animated number; `note` is a small line under the label. */
export const counterItems = [
  {
    id: "years",
    text: "2024 – 2026", // non-breaking spaces keep the range on one line
    label: tx("Enterprise operations", "Operasional enterprise"),
    note: "PT ASDP Indonesia Ferry (Persero)",
  },
  {
    id: "ports",
    text: tx("Dozens of ports", "Puluhan pelabuhan"),
    label: tx("Harbor & cloud deployments", "Deployment pelabuhan & cloud"),
  },
  {
    id: "projects",
    value: projects.length,
    suffix: "",
    label: tx("Engineering projects", "Proyek engineering"),
    note: tx(
      `${originalProjects.length} original · ${preservationProjects.length} preservation ports`,
      `${originalProjects.length} original · ${preservationProjects.length} port preservasi`,
    ),
  },
  {
    id: "platforms",
    text: "Windows & Linux",
    label: tx("Native port targets", "Target port native"),
  },
];

/* -------------------------------------------------------------------------- */
/*                                Case studies                                */
/* -------------------------------------------------------------------------- */

const BROWSE_SOURCE = tx("Browse the source on GitHub", "Jelajahi source di GitHub");
const DOWNLOAD_RELEASE = tx("Download {tag} from GitHub Releases", "Unduh {tag} dari GitHub Releases");

/**
 * Data for the two deep-dive pages. Each section renders a list of typed
 * blocks: `prose`, `cards`, `timeline`, `flow`, `architecture`, `table`,
 * `comparison` (the project's legacy-vs-port table), `checklist`, `code` and
 * `links`. Facts and links may hold `{tag}` (the latest release tag).
 * Technical details follow each repository's README, FIXES.md and PATCHNOTES.md.
 */
export const caseStudies = {
  "gt-racing": {
    projectId: "gt-racing",
    eyebrow: tx("Case Study · 32-Bit iPad Software Preservation", "Studi Kasus · Preservasi Software iPad 32-Bit"),
    title: "GT Racing: Motor Academy — PC Port",
    repoName: `${githubUser}/${GT_RACING_REPO}`,
    summary: tx(
      "Static binary recompilation of a 32-bit iPad (ARMv7) application that iOS 11 and later no longer launch. Every function is translated ahead of time to C, built for x86 and linked with a host layer that replaces the iOS libraries, so the same code runs natively on Windows and Linux.",
      "Rekompilasi biner statis untuk aplikasi iPad 32-bit (ARMv7) yang tidak lagi bisa dijalankan iOS 11 ke atas. Setiap fungsi diterjemahkan lebih dulu ke C, di-build untuk x86, dan ditautkan dengan host layer pengganti pustaka iOS, sehingga kode yang sama berjalan native di Windows dan Linux.",
    ),
    art: "racing",
    image: "images/gtracing-pc.jpg",
    facts: [
      { id: "platform", label: tx("Original platform", "Platform asli"), value: "32-bit iPad · ARMv7" },
      { id: "lost", label: tx("Stopped running on", "Berhenti berjalan di"), value: "iOS 11 (2017)" },
      { id: "functions", label: tx("Recompiled functions", "Fungsi direkompilasi"), value: tx("23,873", "23.873") },
      { id: "preserved", label: tx("Runs on", "Berjalan di"), value: "Windows & Linux x86 · {tag}" },
    ],
    links: [
      { label: GITHUB_REPOSITORY, href: links.gtRacingRepo, icon: "github" },
      { release: "gt-racing", label: RELEASE_TAG, href: links.gtRacingReleases, icon: "tag" },
    ],
    sections: [
      {
        id: "context",
        title: tx("Why it stopped running", "Mengapa aplikasi ini berhenti berjalan"),
        intro: tx(
          "The application shipped only as a 32-bit ARMv7 binary tuned for PowerVR iPads. iOS 11 removed 32-bit support, so it no longer launches on any updated device.",
          "Aplikasi ini hanya dirilis sebagai biner ARMv7 32-bit yang dioptimalkan untuk iPad ber-GPU PowerVR. iOS 11 menghapus dukungan 32-bit, sehingga aplikasi ini tidak lagi bisa dijalankan di perangkat yang sudah diperbarui.",
        ),
        blocks: [
          {
            type: "timeline",
            items: [
              {
                when: tx("PowerVR era", "Era PowerVR"),
                title: tx("Built for 32-bit iPad", "Dibuat untuk iPad 32-bit"),
                body: tx(
                  "ARMv7 code, PVRTC-compressed assets and an OpenGL ES 1.1/2.0 renderer.",
                  "Kode ARMv7, aset terkompresi PVRTC, dan renderer OpenGL ES 1.1/2.0.",
                ),
              },
              {
                when: "iOS 10.3 · 2017",
                title: tx("32-bit warnings", "Peringatan 32-bit"),
                body: tx("iOS warns that 32-bit apps will stop working.", "iOS memperingatkan bahwa aplikasi 32-bit akan berhenti berjalan."),
              },
              {
                when: "iOS 11 · 2017",
                title: tx("32-bit support removed", "Dukungan 32-bit dihapus"),
                body: tx("The binary no longer launches on updated iPhones or iPads.", "Biner tidak lagi bisa dijalankan di iPhone atau iPad yang sudah diperbarui."),
              },
            ],
          },
        ],
      },
      {
        id: "comparison",
        title: tx("Legacy target vs. native port", "Target lama vs. port native"),
        blocks: [{ type: "comparison" }],
      },
      {
        id: "engineering",
        title: tx("Key engineering work", "Pekerjaan teknis utama"),
        blocks: [
          {
            type: "cards",
            items: [
              {
                icon: "terminal",
                title: tx("Static recompilation", "Rekompilasi statis"),
                body: tx(
                  "23,873 ARM and Thumb functions (1.8 million instructions) are discovered and translated to one C function each, then compiled for x86. Every instruction form is tested against a Cortex-A8 reference.",
                  "23.873 fungsi ARM dan Thumb (1,8 juta instruksi) ditemukan dan diterjemahkan masing-masing menjadi satu fungsi C, lalu dikompilasi untuk x86. Setiap bentuk instruksi diuji terhadap referensi Cortex-A8.",
                ),
              },
              {
                icon: "layers",
                title: tx("iOS host layer", "Host layer iOS"),
                body: tx(
                  "The Objective-C runtime, Foundation, UIKit, OpenAL and the other imported iOS libraries are replaced by host shims; SDL3 provides the window, input and audio on both platforms.",
                  "Runtime Objective-C, Foundation, UIKit, OpenAL, dan pustaka iOS lain yang diimpor digantikan host shim; SDL3 menyediakan jendela, input, dan audio di kedua platform.",
                ),
              },
              {
                icon: "shader",
                title: tx("OpenGL ES translation", "Translasi OpenGL ES"),
                body: tx(
                  "OpenGL ES 1.1/2.0 runs on desktop OpenGL 2.1: GLSL ES shaders are rewritten to GLSL 1.20, and the four PVRTC formats are decoded to RGBA at upload.",
                  "OpenGL ES 1.1/2.0 berjalan di OpenGL 2.1 desktop: shader GLSL ES ditulis ulang ke GLSL 1.20, dan empat format PVRTC didekode ke RGBA saat diunggah.",
                ),
              },
              {
                icon: "monitor",
                title: tx("PostFX & display", "PostFX & tampilan"),
                body: tx(
                  "PostFX (`GT_POSTFX=4`, Enhanced by default), motion blur, MSAA and anisotropic filtering change without a restart. Widescreen UI scaling keeps menus and HUD in shape at 16:10, 16:9 and 21:9.",
                  "PostFX (`GT_POSTFX=4`, Enhanced sebagai default), motion blur, MSAA, dan anisotropic filtering berubah tanpa restart. Skala UI layar lebar menjaga menu dan HUD tetap proporsional di 16:10, 16:9, dan 21:9.",
                ),
              },
              {
                icon: "keyboard",
                title: tx("Input & add-ons", "Input & add-on"),
                body: tx(
                  "Keyboard, mouse and Xbox or PlayStation controllers with remappable keys. Add-on vehicles built from Android editions the user owns load from an `add-on` folder.",
                  "Keyboard, mouse, serta controller Xbox atau PlayStation dengan tombol yang bisa diatur ulang. Kendaraan add-on yang dibuat dari edisi Android milik pengguna dimuat dari folder `add-on`.",
                ),
              },
              {
                icon: "cloud",
                title: tx("Leaderboard", "Leaderboard"),
                body: tx(
                  "The Red Bull leaderboard is kept locally and shared through `gt-redbull-board`, a Cloudflare Worker backed by D1, replacing the shut-down original servers.",
                  "Leaderboard Red Bull disimpan lokal dan dibagikan lewat `gt-redbull-board`, Cloudflare Worker berbasis D1, menggantikan server asli yang sudah dimatikan.",
                ),
              },
            ],
          },
          {
            type: "architecture",
            legacy: {
              icon: "server",
              title: tx("Original online servers", "Server online asli"),
              body: tx("Shut down; the original online features cannot connect.", "Sudah dimatikan; fitur online aslinya tidak bisa terhubung."),
            },
            nodes: [
              {
                icon: "monitor",
                title: tx("PC client", "Klien PC"),
                body: tx("Submits and reads lap times over HTTPS", "Mengirim dan membaca waktu lap melalui HTTPS"),
              },
              {
                icon: "cloud",
                title: "Cloudflare Worker",
                body: tx("`gt-redbull-board` API for submissions and queries", "API `gt-redbull-board` untuk pengiriman dan kueri"),
              },
              {
                icon: "database",
                title: "Cloudflare D1",
                body: tx("Serverless SQLite storing leaderboard entries", "SQLite serverless yang menyimpan entri leaderboard"),
              },
            ],
          },
        ],
      },
      {
        id: "controls",
        title: tx("Default controls", "Kontrol default"),
        intro: tx(
          "Defaults from the release. Every key can be remapped in Options > Controls.",
          "Default dari rilis. Setiap tombol bisa diatur ulang di Options > Controls.",
        ),
        blocks: [
          {
            type: "table",
            caption: tx("Default control bindings", "Binding kontrol default"),
            columns: [tx("Action", "Aksi"), "Keyboard", "Controller"],
            rows: [
              [tx("Steer", "Kemudi"), "A / D, ← / →", tx("Left stick", "Stik kiri")],
              [tx("Throttle / brake", "Gas / rem"), "W / S, ↑ / ↓", "RT / LT (R2 / L2)"],
              [tx("Gear up / down", "Naik / turun gigi"), "Shift / Ctrl", "A / X (Cross / Square)"],
              [tx("Change camera", "Ganti kamera"), "C", "RB (R1)"],
              [tx("Look back", "Lihat belakang"), tx("V (hold)", "V (tahan)"), tx("LB (L1), hold", "LB (L1), tahan")],
              [tx("Pause", "Jeda"), "Esc", "Menu (Options)"],
              [tx("Full screen / window", "Layar penuh / jendela"), "Alt+Enter", "—"],
            ],
          },
        ],
      },
      {
        id: "release",
        title: tx("Release", "Rilis"),
        blocks: [
          {
            type: "checklist",
            title: tx("What a release contains", "Isi setiap rilis"),
            items: [
              tx(
                "Windows x86 .zip and Linux x86 .tar.gz archives, each with a published SHA-256 checksum",
                "Arsip .zip Windows x86 dan .tar.gz Linux x86, masing-masing dengan checksum SHA-256 yang dipublikasikan",
              ),
              tx(
                "No assets or code of the original application: the port runs from the user's own copy of the iPad release 1.3.4b",
                "Tanpa aset atau kode aplikasi asli: port berjalan dari salinan rilis iPad 1.3.4b milik pengguna sendiri",
              ),
              tx(
                "No build-machine paths; the leaderboard receives only a random player number, the name, the vehicle and the lap time",
                "Tanpa path mesin build; leaderboard hanya menerima nomor pemain acak, nama, kendaraan, dan waktu lap",
              ),
            ],
          },
          {
            type: "code",
            caption: tx("Verify a download", "Verifikasi unduhan"),
            snippets: [
              { label: "Windows", code: "certutil -hashfile <archive>.zip SHA256" },
              { label: "Linux", code: "sha256sum <archive>.tar.gz" },
            ],
            note: tx(
              "Compare the result with the SHA-256 listed in PATCHNOTES.md for that release.",
              "Bandingkan hasilnya dengan SHA-256 yang tercantum di PATCHNOTES.md untuk rilis tersebut.",
            ),
          },
          {
            type: "links",
            items: [
              { release: "gt-racing", label: DOWNLOAD_RELEASE, href: links.gtRacingReleases, icon: "tag", primary: true },
              { label: BROWSE_SOURCE, href: links.gtRacingRepo, icon: "github" },
            ],
          },
        ],
      },
    ],
  },

  gangstar: {
    projectId: "gangstar",
    eyebrow: tx("Case Study · 32-Bit Mac Software Preservation", "Studi Kasus · Preservasi Software Mac 32-Bit"),
    title: "Gangstar: Miami Vindication — PC Port",
    repoName: `${githubUser}/${GANGSTAR_REPO}`,
    summary: tx(
      "A Windows and Linux x86 port of the 32-bit Mac (i386 OS X) application, stranded since macOS Catalina removed 32-bit support. The original code is already x86, so a custom Mach-O loader runs the official executable at its own addresses while host shims supply the macOS libraries it imports, with no CPU emulation.",
      "Port Windows dan Linux x86 dari aplikasi Mac 32-bit (i386 OS X) yang terhenti sejak macOS Catalina menghapus dukungan 32-bit. Kode aslinya sudah x86, sehingga loader Mach-O kustom menjalankan executable resminya di alamat aslinya, sementara host shim menyediakan pustaka macOS yang diimpornya, tanpa emulasi CPU.",
    ),
    art: "miami",
    image: null,
    facts: [
      { id: "platform", label: tx("Original platform", "Platform asli"), value: "32-bit Mac · i386 OS X" },
      { id: "lost", label: tx("Stopped running on", "Berhenti berjalan di"), value: "macOS 10.15 (2019)" },
      { id: "approach", label: tx("Approach", "Pendekatan"), value: tx("Custom Mach-O loader", "Loader Mach-O kustom") },
      { id: "preserved", label: tx("Runs on", "Berjalan di"), value: "Windows & Linux x86 · {tag}" },
    ],
    links: [
      { label: GITHUB_REPOSITORY, href: links.gangstarRepo, icon: "github" },
      { release: "gangstar", label: RELEASE_TAG, href: links.gangstarReleases, icon: "tag" },
    ],
    sections: [
      {
        id: "context",
        title: tx("Why it stopped running", "Mengapa aplikasi ini berhenti berjalan"),
        intro: tx(
          "The Mac edition shipped only as a 32-bit i386 Mach-O binary. Once macOS dropped 32-bit support, every current Mac refused to open it.",
          "Edisi Mac hanya dirilis sebagai biner Mach-O i386 32-bit. Begitu macOS menghapus dukungan 32-bit, setiap Mac terbaru menolak membukanya.",
        ),
        blocks: [
          {
            type: "timeline",
            items: [
              {
                when: tx("OS X era", "Era OS X"),
                title: tx("Shipped as 32-bit x86", "Dirilis sebagai x86 32-bit"),
                body: tx("Built for Intel Macs as an i386 Mach-O application.", "Dibuat untuk Mac Intel sebagai aplikasi Mach-O i386."),
              },
              {
                when: "macOS 10.13.4 · 2018",
                title: tx("Compatibility warnings", "Peringatan kompatibilitas"),
                body: tx('macOS warns that 32-bit apps "are not optimized for your Mac".', 'macOS memperingatkan bahwa aplikasi 32-bit "tidak dioptimalkan untuk Mac Anda".'),
              },
              {
                when: "macOS 10.14 · 2018",
                title: tx("Last version to run it", "Versi terakhir yang menjalankannya"),
                body: tx("Mojave is the final macOS release that launches 32-bit apps.", "Mojave adalah rilis macOS terakhir yang menjalankan aplikasi 32-bit."),
              },
              {
                when: "macOS 10.15 · 2019",
                title: tx("32-bit support removed", "Dukungan 32-bit dihapus"),
                body: tx("Catalina and every later release refuse to launch it.", "Catalina dan semua rilis setelahnya menolak menjalankannya."),
              },
            ],
          },
        ],
      },
      {
        id: "comparison",
        title: tx("Legacy target vs. native port", "Target lama vs. port native"),
        blocks: [{ type: "comparison" }],
      },
      {
        id: "approach",
        title: tx("Porting approach", "Pendekatan porting"),
        blocks: [
          {
            type: "flow",
            caption: tx("From Mach-O executable to a native PC process", "Dari executable Mach-O ke proses PC native"),
            steps: [
              {
                icon: "laptop",
                title: "i386 Mach-O",
                body: tx("The official Mac executable, read from the user's copy", "Executable Mac resmi, dibaca dari salinan milik pengguna"),
              },
              {
                icon: "terminal",
                title: tx("Mach-O loader", "Loader Mach-O"),
                body: tx("Maps the code at its original addresses", "Memetakan kode di alamat aslinya"),
              },
              {
                icon: "layers",
                title: tx("Host shims", "Host shim"),
                body: tx("Stand in for the macOS libraries it imports", "Menggantikan pustaka macOS yang diimpornya"),
              },
              {
                icon: "cube",
                title: "SDL3 + OpenGL 2.1",
                body: tx("Window, input, audio and rendering", "Jendela, input, audio, dan rendering"),
              },
              {
                icon: "monitor",
                title: "Windows & Linux x86",
                body: tx("One code base for both targets", "Satu basis kode untuk kedua target"),
              },
            ],
          },
        ],
      },
      {
        id: "fixes",
        title: tx("Key engineering fixes", "Perbaikan teknis utama"),
        blocks: [
          {
            type: "cards",
            items: [
              {
                icon: "shader",
                title: tx("Graphics & visibility", "Grafis & visibilitas"),
                body: tx(
                  "MSAA with alpha to coverage, FXAA drawn under the HUD, ambient occlusion and dynamic shadows. Checkpoint domes and markers no longer bloom over the road, and the car and sea reflection passes were corrected.",
                  "MSAA dengan alpha to coverage, FXAA yang digambar di bawah HUD, ambient occlusion, dan bayangan dinamis. Kubah dan penanda checkpoint tidak lagi menimbulkan bloom di atas jalan, dan pass refleksi mobil serta laut telah diperbaiki.",
                ),
              },
              {
                icon: "cube",
                title: tx("Physics & entities", "Fisika & entitas"),
                body: tx(
                  "Stuck traffic backs up or is removed instead of gridlocking, helicopter rotor wear follows the physics tick rate (`PHYSICS_SYNC`), collision near the map centre holds at longer draw distances, and AI vehicles no longer weave on straight roads.",
                  "Lalu lintas yang macet mundur atau dihapus alih-alih terkunci, keausan rotor helikopter mengikuti laju tick fisika (`PHYSICS_SYNC`), tabrakan di pusat peta tetap berfungsi pada jarak pandang lebih jauh, dan kendaraan AI tidak lagi berkelok di jalan lurus.",
                ),
              },
              {
                icon: "chip",
                title: tx("Performance", "Performa"),
                body: tx(
                  "Static geometry stays on the GPU (`STATIC_VBO`), cutting time inside draw calls from 185 to 77 ms per second. The frame rate is configurable up to 400 fps, with 60 fps by default.",
                  "Geometri statis tetap berada di GPU (`STATIC_VBO`), memangkas waktu di dalam draw call dari 185 menjadi 77 ms per detik. Frame rate bisa diatur hingga 400 fps, dengan default 60 fps.",
                ),
              },
              {
                icon: "archive",
                title: tx("Original mode", "Mode asli"),
                body: tx(
                  "`ORIGINAL_MAC_EXPERIENCE=1` turns every enhancement off and runs the application as the Mac edition did.",
                  "`ORIGINAL_MAC_EXPERIENCE=1` mematikan semua peningkatan dan menjalankan aplikasi seperti edisi Mac aslinya.",
                ),
              },
            ],
          },
        ],
      },
      {
        id: "release",
        title: tx("Release", "Rilis"),
        blocks: [
          {
            type: "checklist",
            title: tx("What a release contains", "Isi setiap rilis"),
            items: [
              tx(
                "Windows x86 .zip and Linux x86 .tar.gz archives, listed with their hashes in SHA256SUMS.txt",
                "Arsip .zip Windows x86 dan .tar.gz Linux x86, dengan hash masing-masing di SHA256SUMS.txt",
              ),
              tx(
                "No files of the original application: the port runs from the user's own copy of the Mac release 1.0.0",
                "Tanpa berkas aplikasi asli: port berjalan dari salinan rilis Mac 1.0.0 milik pengguna sendiri",
              ),
            ],
          },
          {
            type: "code",
            caption: tx("Verify a download", "Verifikasi unduhan"),
            snippets: [
              { label: "Windows", code: "certutil -hashfile <file> SHA256" },
              { label: "Linux", code: "sha256sum -c SHA256SUMS.txt --ignore-missing" },
            ],
            note: tx(
              "On Windows, compare the result with the matching line of SHA256SUMS.txt.",
              "Di Windows, bandingkan hasilnya dengan baris yang sesuai di SHA256SUMS.txt.",
            ),
          },
          {
            type: "links",
            items: [
              { release: "gangstar", label: DOWNLOAD_RELEASE, href: links.gangstarReleases, icon: "tag", primary: true },
              { label: BROWSE_SOURCE, href: links.gangstarRepo, icon: "github" },
            ],
          },
        ],
      },
    ],
  },
};

/* -------------------------------------------------------------------------- */
/*                                  Experience                                */
/* -------------------------------------------------------------------------- */

/**
 * Professional work experience on `/journey`. `logo` is a key of `brandLogos`
 * (official image, falling back to the drawn emblem, then `icon`). `breakdown`
 * is the structured list of what the role covered (the "Operational
 * Breakdown" tab and the résumé). `systems` lists production systems shown
 * with their own logo. Projects live on `/projects`, not here.
 */
export const expCards = [
  {
    id: "asdp",
    kind: tx("Professional Experience", "Pengalaman Profesional"),
    title: tx("Business Application Operational Support Staff", "Staf Dukungan Operasional Aplikasi Bisnis"),
    project: "PT ASDP Indonesia Ferry (Persero)",
    period: "2024 – 2026",
    logo: "asdp",
    icon: "server",
    summary: tx(
      "Operational support for the business applications behind national ferry ticketing: counter applications and backend services on harbor servers and in the cloud, automated gates in the field, and the online ticketing site trip.ferizy.com.",
      "Dukungan operasional untuk aplikasi bisnis di balik tiket kapal penyeberangan nasional: aplikasi loket dan layanan backend di server pelabuhan maupun cloud, gate otomatis di lapangan, dan situs tiket online trip.ferizy.com.",
    ),
    platformsLabel: tx("Systems & Operations", "Sistem & Operasional"),
    platforms: [
      "trip.ferizy.com",
      "Hybrid Cloud",
      tx("On-Prem Harbor Servers", "Server Pelabuhan On-Prem"),
      tx("Omron Barrier Gates", "Barrier Gate Omron"),
      tx("Production Support", "Dukungan Produksi"),
    ],
    breakdown: [
      {
        id: "deployments",
        icon: "server",
        title: tx("Harbor & Cloud Deployments", "Deployment Pelabuhan & Cloud"),
        body: tx(
          "Counter applications and backend services deployed across local port servers and cloud infrastructure in dozens of harbors.",
          "Aplikasi loket dan layanan backend di-deploy ke server lokal pelabuhan dan infrastruktur cloud di puluhan pelabuhan.",
        ),
        tags: ["Hybrid Cloud", tx("On-Prem Servers", "Server On-Prem"), tx("Counter Apps", "Aplikasi Loket")],
      },
      {
        id: "hardware",
        icon: "lock",
        title: tx("Hardware Integration", "Integrasi Perangkat Keras"),
        body: tx(
          "Installation and configuration of Omron automated barrier gate systems at Surabaya port.",
          "Pemasangan dan konfigurasi sistem barrier gate otomatis Omron di Pelabuhan Surabaya.",
        ),
        tags: ["Omron PLC", "Barrier Gate", tx("Field Integration", "Integrasi Lapangan")],
      },
      {
        id: "ticketing",
        icon: "shield",
        brand: "ferizy",
        title: tx("Production Ticketing Operations", "Operasional Tiket Produksi"),
        body: tx(
          "Operational stability and transaction continuity for trip.ferizy.com.",
          "Stabilitas operasional dan kelangsungan transaksi untuk trip.ferizy.com.",
        ),
        tags: [tx("Production Support", "Dukungan Produksi"), tx("Online Ticketing", "Tiket Online")],
        link: { label: "trip.ferizy.com", href: links.ferizy },
      },
    ],
    systems: [
      {
        brand: "ferizy",
        label: "trip.ferizy.com",
        note: tx("National online ferry ticketing", "Tiket kapal penyeberangan online nasional"),
        href: links.ferizy,
      },
    ],
  },
];

/* -------------------------------------------------------------------------- */
/*                                 Tech stack                                 */
/* -------------------------------------------------------------------------- */

/**
 * `emblem` selects a procedural 3D emblem (and is the stable React key). Set
 * `glbPath` (relative to `/public`) to render your own `.glb` model instead.
 * `icon` is the flat icon used in the "Enterprise Stack" list on `/journey`.
 */
export const techStackIcons = [
  {
    name: tx("Linux & Windows Servers", "Server Linux & Windows"),
    subtitle: tx("Harbor & Cloud Hosts", "Host Pelabuhan & Cloud"),
    emblem: "servers",
    icon: "server",
    glbPath: null,
    scale: 1,
    rotation: [0, 0, 0],
  },
  {
    name: "Hybrid Cloud",
    subtitle: tx("Cloud + On-Prem Deployments", "Deployment Cloud + On-Prem"),
    emblem: "hybrid",
    icon: "cloud",
    glbPath: null,
    scale: 1,
    rotation: [0, 0, 0],
  },
  {
    name: tx("Omron PLC / Gate Integration", "Integrasi PLC / Gate Omron"),
    subtitle: tx("Industrial Field Hardware", "Perangkat Keras Lapangan Industri"),
    emblem: "gate",
    icon: "lock",
    glbPath: null,
    scale: 1,
    rotation: [0, 0, 0],
  },
  {
    name: "C / C++",
    subtitle: tx("Native & Low-Level Systems", "Sistem Native & Tingkat Rendah"),
    emblem: "cpp",
    icon: "code",
    glbPath: null,
    scale: 1,
    rotation: [0, 0, 0],
  },
  {
    name: "Cloudflare Workers & D1",
    subtitle: tx("Edge Services & Storage", "Layanan Edge & Penyimpanan"),
    emblem: "cloudflare",
    icon: "database",
    glbPath: null,
    scale: 1,
    rotation: [0, 0, 0],
  },
  {
    name: "Git & CI/CD",
    subtitle: tx("Versioned, Repeatable Releases", "Rilis Berversi & Dapat Diulang"),
    emblem: "git",
    icon: "layers",
    glbPath: null,
    scale: 1,
    rotation: [0, 0, 0],
  },
];

/* -------------------------------------------------------------------------- */
/*                            Contact & community                             */
/* -------------------------------------------------------------------------- */

export const communityLinks = [
  { id: "profile", name: tx("GitHub Profile", "Profil GitHub"), handle: `@${githubUser}`, icon: "github", url: links.githubProfile },
  { id: "niskala", name: "Niskala Utilities", handle: NISKALA_REPO, icon: "terminal", url: links.niskalaRepo },
  { id: "sidaf", name: "SIDAF", handle: "sidaf", icon: "code", url: links.sidafRepo },
  { id: "vr-airport", name: "VR Simulation Airport", handle: "VR-Simulation-Airport", icon: "cube", url: links.vrAirportRepo },
  { id: "war-plane", name: "War Plane 1945", handle: "War-Plane-1945", icon: "controller", url: links.warPlaneRepo },
  { id: "gt-racing", name: "GT Racing PC Port", handle: GT_RACING_REPO, icon: "flag", url: links.gtRacingRepo },
  { id: "gangstar", name: "Gangstar PC Port", handle: GANGSTAR_REPO, icon: "city", url: links.gangstarRepo },
];

/* -------------------------------------------------------------------------- */
/*                                   Footer                                   */
/* -------------------------------------------------------------------------- */

export const socialLinks = [
  { name: "GitHub", icon: "github", url: links.githubProfile },
  { name: "Gmail", icon: "mail", url: gmailComposeUrl() },
  links.twitter && { name: "X / Twitter", icon: "x", url: links.twitter },
].filter(Boolean);

/* -------------------------------------------------------------------------- */
/*                              Engineering notes                             */
/* -------------------------------------------------------------------------- */

/**
 * Articles on `/notes` and `/notes/:slug`, each in three parts: Context,
 * Engineering Approach, Outcome. Sections reuse the case-study block types
 * (`prose`, `cards`, `flow`, `checklist`, ...). `related` links point at
 * internal routes. Reading time is estimated from the text.
 */
const NOTE_PARTS = {
  context: tx("Context", "Konteks"),
  approach: tx("Engineering Approach", "Pendekatan Teknis"),
  outcome: tx("Outcome", "Hasil"),
};

export const engineeringNotes = [
  {
    slug: "gles-ipad-to-windows",
    icon: "shader",
    published: "2026-11-20",
    kicker: tx("Graphics · Preservation", "Grafis · Preservasi"),
    title: tx(
      "Translating 32-Bit iPad OpenGL ES 1.1/2.0 Pipelines to Native Windows & Linux",
      "Menerjemahkan Pipeline OpenGL ES 1.1/2.0 iPad 32-Bit ke Windows & Linux Native",
    ),
    summary: tx(
      "How the GT Racing: Motor Academy port serves an iPad-era OpenGL ES renderer on desktop OpenGL 2.1: shader rewriting, PVRTC decoding and live PostFX, plus the vertex-buffer work shared with the Gangstar port.",
      "Bagaimana port GT Racing: Motor Academy menjalankan renderer OpenGL ES era iPad di OpenGL 2.1 desktop: penulisan ulang shader, dekode PVRTC, dan PostFX yang langsung berlaku, ditambah pekerjaan vertex buffer yang juga dipakai di port Gangstar.",
    ),
    tags: ["OpenGL ES 1.1/2.0", "GLSL 1.20", "PVRTC", "VBO"],
    related: [
      { label: tx("GT Racing case study", "Studi kasus GT Racing"), to: routes.gtRacing },
      { label: tx("Gangstar case study", "Studi kasus Gangstar"), to: routes.gangstar },
    ],
    sections: [
      {
        id: "context",
        title: NOTE_PARTS.context,
        blocks: [
          {
            type: "prose",
            paragraphs: [
              tx(
                "Static recompilation turns the application's ARMv7 code into x86 code, but the recompiled code still issues OpenGL ES 1.1 and 2.0 calls written for PowerVR iPad GPUs. Desktop drivers offer neither PVRTC textures nor the GLSL ES dialect, and they pay far more for geometry sent from client memory on every draw.",
                "Rekompilasi statis mengubah kode ARMv7 aplikasi menjadi kode x86, tetapi kode hasil rekompilasi tetap memanggil OpenGL ES 1.1 dan 2.0 yang ditulis untuk GPU PowerVR di iPad. Driver desktop tidak menyediakan tekstur PVRTC maupun dialek GLSL ES, dan jauh lebih mahal untuk geometri yang dikirim dari memori klien di setiap draw.",
              ),
              tx(
                "The constraint was to keep the original renderer's behaviour: no draw call rewritten by hand and no asset re-authored.",
                "Batasannya adalah mempertahankan perilaku renderer aslinya: tidak ada draw call yang ditulis ulang manual dan tidak ada aset yang dibuat ulang.",
              ),
            ],
          },
          {
            type: "flow",
            caption: tx("Path of one frame on the desktop", "Perjalanan satu frame di desktop"),
            steps: [
              {
                icon: "code",
                title: tx("Recompiled code", "Kode hasil rekompilasi"),
                body: tx("Issues the original GL ES 1.1/2.0 calls", "Memanggil GL ES 1.1/2.0 seperti aslinya"),
              },
              {
                icon: "layers",
                title: tx("GL ES shim", "Shim GL ES"),
                body: tx("Translates state, shaders and textures", "Menerjemahkan state, shader, dan tekstur"),
              },
              {
                icon: "chip",
                title: "OpenGL 2.1",
                body: tx("Any desktop GPU on Windows or Linux", "GPU desktop apa pun di Windows atau Linux"),
              },
              {
                icon: "shader",
                title: "PostFX",
                body: tx("Bloom and motion blur, applied live", "Bloom dan motion blur, langsung berlaku"),
              },
              {
                icon: "monitor",
                title: "SDL3",
                body: tx("Window, input and audio", "Jendela, input, dan audio"),
              },
            ],
          },
        ],
      },
      {
        id: "approach",
        title: NOTE_PARTS.approach,
        blocks: [
          {
            type: "cards",
            items: [
              {
                icon: "layers",
                title: tx("ES 1.1 and 2.0 on desktop GL 2.1", "ES 1.1 dan 2.0 di GL 2.1 desktop"),
                body: tx(
                  "OpenGL 2.1 still has a fixed-function pipeline, so ES 1.1 lighting, texture combiners and the matrix stack map onto it, while ES 2.0 content goes through shaders.",
                  "OpenGL 2.1 masih memiliki pipeline fixed-function, sehingga lighting, texture combiner, dan matrix stack ES 1.1 bisa dipetakan ke sana, sementara konten ES 2.0 melewati shader.",
                ),
              },
              {
                icon: "code",
                title: tx("Shader dialect", "Dialek shader"),
                body: tx(
                  "GLSL ES shaders are rewritten to GLSL 1.20 and OES names are mapped. Shader patches register through the host's GL header, so the shim itself knows no application shader.",
                  "Shader GLSL ES ditulis ulang ke GLSL 1.20 dan nama OES dipetakan. Patch shader didaftarkan melalui header GL milik host, sehingga shim itu sendiri tidak mengenal shader aplikasi mana pun.",
                ),
              },
              {
                icon: "archive",
                title: tx("PVRTC decoding", "Dekode PVRTC"),
                body: tx(
                  "The four PVRTC formats (2 and 4 bits per pixel, RGB and RGBA) are decoded to RGBA in software at upload. The shipped assets stay the source of truth.",
                  "Empat format PVRTC (2 dan 4 bit per piksel, RGB dan RGBA) didekode ke RGBA secara software saat diunggah. Aset yang dirilis tetap menjadi sumber kebenaran.",
                ),
              },
              {
                icon: "cube",
                title: tx("Geometry and driver syncs", "Geometri dan sinkronisasi driver"),
                body: tx(
                  "GL state and vertex arrays are cached and streamed through VBOs to avoid driver syncs. The Gangstar port keeps static geometry in GPU buffers for the same reason.",
                  "State GL dan vertex array di-cache dan dialirkan melalui VBO untuk menghindari sinkronisasi driver. Port Gangstar menyimpan geometri statis di buffer GPU dengan alasan yang sama.",
                ),
              },
              {
                icon: "shader",
                title: tx("PostFX as shader inputs", "PostFX sebagai input shader"),
                body: tx(
                  "Effect strengths are inputs to the shaders, not constants compiled into them. `GT_POSTFX=0` is the as-shipped image and `4` (Enhanced) is the default.",
                  "Kekuatan efek menjadi input shader, bukan konstanta yang dikompilasi ke dalamnya. `GT_POSTFX=0` adalah gambar seperti rilis aslinya dan `4` (Enhanced) adalah default.",
                ),
              },
            ],
          },
        ],
      },
      {
        id: "outcome",
        title: NOTE_PARTS.outcome,
        blocks: [
          {
            type: "checklist",
            title: tx("Result", "Hasil"),
            items: [
              tx("The original assets are untouched: decoding happens at upload", "Aset asli tetap utuh: dekode terjadi saat diunggah"),
              tx(
                "PostFX, motion blur, MSAA and anisotropic filtering change live; only resolution and aspect ratio need a restart",
                "PostFX, motion blur, MSAA, dan anisotropic filtering berubah langsung; hanya resolusi dan rasio aspek yang perlu restart",
              ),
              tx(
                "One code path for Windows and Linux; Linux adds a small platform layer",
                "Satu jalur kode untuk Windows dan Linux; Linux hanya menambahkan platform layer kecil",
              ),
              tx(
                "In the Gangstar port, static VBOs cut time inside draw calls from 185 to 77 ms per second",
                "Di port Gangstar, VBO statis memangkas waktu di dalam draw call dari 185 menjadi 77 ms per detik",
              ),
            ],
          },
        ],
      },
    ],
  },
  {
    slug: "hybrid-harbor-cloud-ticketing",
    icon: "server",
    published: "2026-11-20",
    kicker: tx("Operations · Infrastructure", "Operasional · Infrastruktur"),
    title: tx(
      "Hybrid Local-Harbor & Cloud Architecture for High-Traffic Ferry Ticketing",
      "Arsitektur Hybrid Server Pelabuhan Lokal & Cloud untuk Tiket Kapal Bertrafik Tinggi",
    ),
    summary: tx(
      "Operating practice from PT ASDP Indonesia Ferry (Persero): deploying counter applications and backend services to harbor servers and the cloud across dozens of ports, integrating Omron barrier gates at Surabaya, and keeping trip.ferizy.com stable.",
      "Praktik operasional dari PT ASDP Indonesia Ferry (Persero): deployment aplikasi loket dan layanan backend ke server pelabuhan dan cloud di puluhan pelabuhan, integrasi barrier gate Omron di Surabaya, dan menjaga stabilitas trip.ferizy.com.",
    ),
    tags: ["Hybrid Cloud", tx("Harbor Servers", "Server Pelabuhan"), "trip.ferizy.com", "Omron PLC"],
    related: [{ label: tx("Work experience", "Pengalaman kerja"), to: routes.journey }],
    sections: [
      {
        id: "context",
        title: NOTE_PARTS.context,
        blocks: [
          {
            type: "prose",
            paragraphs: [
              tx(
                "Ferry tickets are sold in two places. Online, `trip.ferizy.com` serves the public. At the ports, counter applications serve the queue, running on local harbor servers as well as cloud infrastructure, and at Surabaya automated barrier gates control entry. Every harbor is its own environment, with its own hardware, network conditions and departure schedule.",
                "Tiket kapal dijual di dua tempat. Secara online, `trip.ferizy.com` melayani publik. Di pelabuhan, aplikasi loket melayani antrean, berjalan di server lokal pelabuhan maupun infrastruktur cloud, dan di Surabaya barrier gate otomatis mengatur akses masuk. Setiap pelabuhan adalah lingkungan tersendiri, dengan perangkat keras, kondisi jaringan, dan jadwal keberangkatan masing-masing.",
              ),
              tx(
                "Production details such as hostnames and topology are left out on purpose: this note covers operating practice, not the internals of a state-owned company's systems.",
                "Detail produksi seperti hostname dan topologi sengaja tidak dicantumkan: catatan ini membahas praktik operasional, bukan bagian dalam sistem milik BUMN.",
              ),
            ],
          },
          {
            type: "cards",
            items: [
              {
                icon: "cloud",
                title: tx("Cloud ticketing", "Tiket berbasis cloud"),
                body: tx("`trip.ferizy.com` online sales", "Penjualan online `trip.ferizy.com`"),
              },
              {
                icon: "server",
                title: tx("Harbor servers", "Server pelabuhan"),
                body: tx("Counter applications on-prem at dozens of ports", "Aplikasi loket on-prem di puluhan pelabuhan"),
              },
              {
                icon: "lock",
                title: tx("Barrier gates", "Barrier gate"),
                body: tx("Omron-based automated gates at Surabaya port", "Gate otomatis berbasis Omron di Pelabuhan Surabaya"),
              },
            ],
          },
        ],
      },
      {
        id: "approach",
        title: NOTE_PARTS.approach,
        blocks: [
          {
            type: "cards",
            items: [
              {
                icon: "layers",
                title: tx("Same steps at every port", "Langkah yang sama di setiap pelabuhan"),
                body: tx(
                  "Each harbor is installed and configured the same way, so a fault at one port can be compared with a known-good one.",
                  "Setiap pelabuhan dipasang dan dikonfigurasi dengan cara yang sama, sehingga gangguan di satu pelabuhan bisa dibandingkan dengan pelabuhan yang berjalan normal.",
                ),
              },
              {
                icon: "shield",
                title: tx("Verify before handover", "Verifikasi sebelum serah terima"),
                body: tx(
                  "A ticket goes through the counter application end to end before the shift that depends on it begins.",
                  "Satu tiket dijalankan melalui aplikasi loket dari awal sampai akhir sebelum shift yang bergantung padanya dimulai.",
                ),
              },
              {
                icon: "flag",
                title: tx("Changes follow the timetable", "Perubahan mengikuti jadwal"),
                body: tx(
                  "Ports run on departures, so changes go into the quieter windows.",
                  "Pelabuhan berjalan mengikuti keberangkatan, sehingga perubahan dilakukan di jam yang lebih sepi.",
                ),
              },
              {
                icon: "monitor",
                title: tx("A baseline for peaks", "Baseline untuk masa puncak"),
                body: tx(
                  "Ferry travel has seasonal peaks such as the Lebaran holidays. A known baseline shows whether a spike is demand or a fault.",
                  "Perjalanan kapal punya puncak musiman seperti libur Lebaran. Baseline yang jelas menunjukkan apakah lonjakan berasal dari permintaan atau gangguan.",
                ),
              },
              {
                icon: "terminal",
                title: tx("Incident updates first", "Kabar insiden lebih dulu"),
                body: tx(
                  "State what is affected, what is being done and when the next update comes, even before the cause is known; fix the cause afterwards.",
                  "Sampaikan apa yang terdampak, apa yang sedang dikerjakan, dan kapan kabar berikutnya, bahkan sebelum penyebabnya diketahui; perbaiki akar masalahnya sesudahnya.",
                ),
              },
              {
                icon: "lock",
                title: tx("Predictable gates", "Gate yang dapat diprediksi"),
                body: tx(
                  "A gate opens for a valid ticket, stays closed otherwise, and behaves predictably when an upstream system is unavailable.",
                  "Gate terbuka untuk tiket yang valid, tetap tertutup jika tidak, dan berperilaku dapat diprediksi saat sistem di hulu tidak tersedia.",
                ),
              },
            ],
          },
        ],
      },
      {
        id: "outcome",
        title: NOTE_PARTS.outcome,
        blocks: [
          {
            type: "checklist",
            title: tx("Result", "Hasil"),
            items: [
              tx(
                "Counter applications and backend services deployed to harbor servers and the cloud across dozens of ports",
                "Aplikasi loket dan layanan backend ter-deploy ke server pelabuhan dan cloud di puluhan pelabuhan",
              ),
              tx(
                "Omron barrier gates installed, configured and integrated at Surabaya port",
                "Barrier gate Omron terpasang, terkonfigurasi, dan terintegrasi di Pelabuhan Surabaya",
              ),
              tx(
                "Operational stability and transaction continuity maintained for trip.ferizy.com",
                "Stabilitas operasional dan kelangsungan transaksi trip.ferizy.com tetap terjaga",
              ),
              tx(
                "Repeatable, verifiable deployments as the habit that carries over to any hybrid system",
                "Deployment yang dapat diulang dan diverifikasi sebagai kebiasaan yang berlaku untuk sistem hybrid mana pun",
              ),
            ],
          },
        ],
      },
    ],
  },
];

/* -------------------------------------------------------------------------- */
/*                               GitHub snapshot                              */
/* -------------------------------------------------------------------------- */

/**
 * Shown until (or instead of, when the API is rate limited or offline) the
 * live numbers from `https://api.github.com/users/<user>/repos`. Refresh it
 * now and then so the fallback stays close to the real profile.
 */
export const githubSnapshot = {
  asOf: "2026-11-20",
  publicRepos: 16,
  stars: 5,
  lastPush: "2026-11-20",
  languages: [
    { name: "JavaScript", count: 6 },
    { name: "C", count: 2 },
    { name: "PHP", count: 2 },
    { name: "C#", count: 1 },
  ],
};

/* -------------------------------------------------------------------------- */
/*                                   Résumé                                   */
/* -------------------------------------------------------------------------- */

/**
 * Printable résumé opened by "Download CV" while `public/cv-adriansyah.pdf`
 * doesn't exist (once it does, the button downloads that file instead).
 * Experience and projects come from `expCards` and `projects` above; only the
 * profile and the skill groups live here. Contact is limited to public links.
 */
export const resume = {
  /** Shows the "Download CV" buttons (Home hero and Journey). `false` hides them everywhere. */
  showButton: false,
  pdfPath: "cv-adriansyah.pdf",
  name: "Adriansyah Prasetya Nugraha",
  role: tx("Systems & Application Operations Engineer", "Engineer Sistem & Operasional Aplikasi"),
  location: "Semarang, Indonesia",
  summary: tx(
    "Business Application Operational Support Staff at PT ASDP Indonesia Ferry (Persero), 2024–2026: counter application and backend deployments to harbor servers and the cloud across dozens of ports, Omron barrier gate integration at Surabaya port, and production support for trip.ferizy.com. Independently builds Windows system utilities (Niskala Utilities) and native PC ports of 32-bit legacy software by static binary recompilation.",
    "Staf Dukungan Operasional Aplikasi Bisnis di PT ASDP Indonesia Ferry (Persero), 2024–2026: deployment aplikasi loket dan layanan backend ke server pelabuhan dan cloud di puluhan pelabuhan, integrasi barrier gate Omron di Pelabuhan Surabaya, serta dukungan produksi untuk trip.ferizy.com. Secara independen mengembangkan utilitas sistem Windows (Niskala Utilities) dan port PC native untuk perangkat lunak klasik 32-bit melalui rekompilasi biner statis.",
  ),
  skills: [
    {
      id: "ops",
      title: tx("Operations & infrastructure", "Operasional & infrastruktur"),
      items: [
        tx("Linux & Windows servers", "Server Linux & Windows"),
        "Hybrid cloud / on-premise",
        tx("Production support & incident handling", "Dukungan produksi & penanganan insiden"),
        "High availability",
      ],
    },
    {
      id: "field",
      title: tx("Field systems", "Sistem lapangan"),
      items: [tx("Omron PLC / barrier gate integration", "Integrasi PLC / barrier gate Omron"), tx("On-site installation", "Instalasi di lokasi")],
    },
    {
      id: "native",
      title: tx("Systems programming", "Pemrograman sistem"),
      items: ["C / C++", "C# / .NET", "Win32 API / ETW", tx("Static recompilation", "Rekompilasi statis"), "ARMv7 / x86", "OpenGL ES"],
    },
    {
      id: "web",
      title: tx("Web, cloud & tools", "Web, cloud & tools"),
      items: ["Cloudflare Workers & D1", "PHP & CodeIgniter", "JavaScript / React", "Unity (C#)", "GML", "Git & CI/CD"],
    },
  ],
};
