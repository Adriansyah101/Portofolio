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
 * relative to `/public` (for example `images/niskala.png` or
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
// The two loaders live in these repositories (host/core), with their releases.
const IOS_LOADER_REPO = "GTRacingMotorAcademy-PC-Port";
const MAC_LOADER_REPO = "GangstarMiamiVindication-PC-Port";
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
  iosLoaderRepo: `${GITHUB}/${IOS_LOADER_REPO}`,
  iosLoaderReleases: `${GITHUB}/${IOS_LOADER_REPO}/releases`,
  iosLoaderSource: `${GITHUB}/${IOS_LOADER_REPO}/tree/main/host/core`,
  // This repository has no docs/NOTES.md; its architecture notes are the README's "How it works" section.
  iosLoaderNotes: `${GITHUB}/${IOS_LOADER_REPO}/blob/main/README.md#how-it-works`,
  macLoaderRepo: `${GITHUB}/${MAC_LOADER_REPO}`,
  macLoaderReleases: `${GITHUB}/${MAC_LOADER_REPO}/releases`,
  macLoaderSource: `${GITHUB}/${MAC_LOADER_REPO}/tree/main/host/core`,
  macLoaderNotes: `${GITHUB}/${MAC_LOADER_REPO}/blob/main/docs/NOTES.md`,
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
  "ios-loader": { repo: `${githubUser}/${IOS_LOADER_REPO}`, fallbackTag: "V1.0.1", fallbackUrl: links.iosLoaderReleases },
  "mac-loader": { repo: `${githubUser}/${MAC_LOADER_REPO}`, fallbackTag: "V1.0.1", fallbackUrl: links.macLoaderReleases },
};

/**
 * Official logos in `public/images/`, rendered by `<BrandLogo>`. Paths start
 * at the site root (`/images/...`), so they resolve on nested routes too.
 * Candidates are tried in order; `emblem` (a drawn SVG) or `wordmark` (text)
 * is the last resort when no file loads. `width`/`height` are the intrinsic
 * size, used to reserve space before the image arrives.
 */
export const brandLogos = {
  asdp: {
    name: "PT ASDP Indonesia Ferry (Persero)",
    sources: ["/images/asdp.png", "/images/asdp.svg"],
    width: 1773,
    height: 1220,
    emblem: "asdp",
  },
  ferizy: {
    name: "Ferizy",
    sources: ["/images/ferizy.svg", "/images/ferizy.png"],
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
  niskala: "/projects/niskala",
  iosLoader: "/projects/ios-loader",
  macLoader: "/projects/mac-loader",
  journey: "/journey",
  notes: "/notes",
  contact: "/contact",
};

/**
 * Retired case-study addresses and where they now live: the two port pages
 * were folded into the loader case studies, so old links redirect instead of
 * showing the 404 page.
 */
export const legacyRedirects = {
  "/projects/gt-racing": "/projects/ios-loader",
  "/projects/gangstar": "/projects/mac-loader",
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
    copyLink: tx("Copy Link", "Salin Tautan"),
    copyLinkLabel: tx("Copy the link to this page", "Salin tautan halaman ini"),
    linkCopied: tx("Copied", "Tersalin"),
    previous: tx("Previous", "Sebelumnya"),
    next: tx("Next", "Berikutnya"),
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
    presetsLabel: tx("Camera view", "Sudut kamera"),
    presets: {
      overview: tx("Overview", "Ringkasan"),
      desk: tx("Desk Setup", "Meja Kerja"),
      telemetry: tx("Telemetry", "Telemetri"),
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
      "Technical write-ups in three parts (context, approach, outcome): OpenGL ES translation for the iPad port, hybrid harbor-and-cloud ticketing operations, and safety guardrails for Windows maintenance.",
      "Tulisan teknis dalam tiga bagian (konteks, pendekatan, hasil): translasi OpenGL ES untuk port iPad, operasional tiket hybrid pelabuhan-dan-cloud, dan pengaman untuk pemeliharaan Windows.",
    ),
    read: tx("Read note", "Baca catatan"),
    minutes: tx("{n} min read", "{n} menit baca"),
    published: tx("Published", "Diterbitkan"),
    allNotes: tx("All notes", "Semua catatan"),
    backTo: tx("Back to", "Kembali ke"),
    pager: tx("More notes", "Catatan lainnya"),
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
      stack: tx("Business Operations Stack", "Stack Operasional Bisnis"),
    },
    stackIntro: tx(
      "Four production domains behind national ferry ticketing.",
      "Empat domain produksi di balik tiket kapal penyeberangan nasional.",
    ),
    fieldDocs: {
      title: tx("Field Documentation", "Dokumentasi Lapangan"),
      note: tx("Faces of other people are blurred for privacy.", "Wajah orang lain diburamkan demi privasi."),
      open: tx("Open photo: {caption}", "Buka foto: {caption}"),
      dialog: tx("Field documentation photo", "Foto dokumentasi lapangan"),
      previous: tx("Previous photo", "Foto sebelumnya"),
      next: tx("Next photo", "Foto berikutnya"),
      close: tx("Close", "Tutup"),
      counter: tx("{n} of {total}", "{n} dari {total}"),
    },
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
    title: tx("Original Software & Legacy Preservation", "Software Original & Preservasi Klasik"),
    description: tx(
      "Four original applications built from scratch, and two binary loaders that run 32-bit iPad and Mac software natively on Windows and Linux x86.",
      "Empat aplikasi original yang dibangun dari nol, serta dua loader biner yang menjalankan software iPad dan Mac 32-bit secara native di Windows dan Linux x86.",
    ),
    featured: tx("Featured Project", "Proyek Unggulan"),
    catalogTitle: tx("Project catalog", "Katalog proyek"),
    filterLabel: tx("Filter projects by category", "Filter proyek berdasarkan kategori"),
    showing: tx("Showing {n} of {total} projects", "Menampilkan {n} dari {total} proyek"),
    compareEyebrow: tx("Architecture comparison", "Perbandingan arsitektur"),
    compareTitle: tx(
      "Legacy Binaries vs. Native Windows/Linux Ports",
      "Biner Klasik vs. Port Native Windows/Linux",
    ),
    compareDescription: tx(
      "What each loader's input was built for, and what it runs on now.",
      "Untuk apa input setiap loader dibuat, dan di mana ia berjalan sekarang.",
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
    "Business Application Operations Support Staff at PT ASDP Indonesia Ferry (2024–2026), managing nationwide port counter deployments, Omron barrier gate integration, and trip.ferizy.com stability. Independently engineering Windows system utilities (Niskala Utilities) and native PC static recompilation ports for 32-bit legacy software.",
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
  { id: "preservation", label: tx("Legacy Preservation", "Preservasi Klasik") },
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
    title: tx("Legacy Software Preservation", "Preservasi Software Klasik"),
    badge: { label: tx("Legacy Preservation", "Preservasi Klasik"), icon: "archive" },
    description: tx(
      "Two Mach-O loaders that run 32-bit iPad (ARMv7) and Mac (i386) binaries natively on Windows and Linux x86, after current iOS and macOS dropped them.",
      "Dua loader Mach-O yang menjalankan biner iPad (ARMv7) dan Mac (i386) 32-bit secara native di Windows dan Linux x86, setelah iOS dan macOS terbaru meninggalkannya.",
    ),
  },
};

const ORIGINAL_BADGE = tx("Original Software", "Software Original");
const VIEW_SOURCE = tx("View Source on GitHub", "Lihat Source di GitHub");
/** Shorter label for the same link on the compact overview tiles (desktop "All"). */
const VIEW_SOURCE_SHORT = tx("GitHub Source", "Source GitHub");
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
    caseStudy: routes.niskala,
    shortTitle: "Niskala Utilities",
    subtitle: tx("Windows Desktop & CLI Utility", "Utilitas Desktop & CLI Windows"),
    platform: ORIGINAL_BADGE,
    platformIcon: "terminal",
    categoryLabel: tx("System Utility", "Utilitas Sistem"),
    description: tx(
      "Modular Windows system utility (WinUI & CLI) with ETW install tracing, .reg-backed cleanup, and DISM/SFC maintenance.",
      "Utilitas sistem Windows modular (WinUI & CLI) dengan pemantauan ETW, pembersihan ber-backup .reg, dan pemeliharaan DISM/SFC.",
    ),
    tags: ["C# / .NET", "WinUI & CLI", "Windows Internals / ETW", tx("System Maintenance", "Pemeliharaan Sistem")],
    art: "niskala",
    image: null, // e.g. "images/niskala.png" (16:9)
    links: [
      { label: VIEW_SOURCE, shortLabel: VIEW_SOURCE_SHORT, href: links.niskalaRepo, icon: "github" },
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
      "Full-stack web information system for structured data management and reporting.",
      "Sistem informasi web full-stack untuk pengelolaan data dan pelaporan terstruktur.",
    ),
    tags: ["PHP", "CodeIgniter", "JavaScript", "HTML & CSS"],
    art: "sidaf",
    image: null, // e.g. "images/sidaf.png" (16:9); without one the card shows its architecture schematic
    links: [{ label: VIEW_SOURCE, shortLabel: VIEW_SOURCE_SHORT, href: links.sidafRepo, icon: "github" }],
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
      "Interactive 3D airport ground-handling and operational procedure simulation.",
      "Simulasi interaktif 3D prosedur operasional dan layanan darat bandara.",
    ),
    tags: ["Unity", "C#", "Oculus Quest 2", "PCVR"],
    art: "airport",
    // The card shows the architecture schematic, with the demo video behind its play button.
    // Set "images/vr-airport.jpg" to use the video's thumbnail instead. `poster` is the still
    // used on the small overview tile, where the schematic would be too small to read.
    image: null,
    poster: "images/vr-airport.jpg",
    video: { youtubeId: "oLm0qSSHeiM", title: "Demo Aplikasi Simulasi Prosedur Bandara Menggunakan Virtual Reality" },
    links: [{ label: VIEW_SOURCE, shortLabel: VIEW_SOURCE_SHORT, href: links.vrAirportRepo, icon: "github" }],
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
      "Interactive 2D aerial action application built from scratch.",
      "Aplikasi interaktif 2D dengan mekanika pertempuran udara yang dibangun dari awal.",
    ),
    tags: ["GML", tx("2D Kinematics", "Kinematika 2D"), tx("Collision Detection", "Deteksi Tabrakan"), "Windows"],
    art: "warplane",
    // Architecture schematic with the recording behind its play button; "images/war-plane-1945.jpg" shows the thumbnail instead.
    image: null,
    video: { youtubeId: "LXDtVyzX5zQ", title: "War Plane 1945 - Demo" },
    links: [
      { label: VIEW_SOURCE, shortLabel: VIEW_SOURCE_SHORT, href: links.warPlaneRepo, icon: "github" },
      { label: tx("Open Web Build", "Buka Build Web"), href: links.warPlaneWeb, icon: "external" },
    ],
    comparison: null,
  },
];

/**
 * Category B: 32-bit software preservation, the two binary loaders.
 * `comparison` feeds the "Legacy 32-bit target vs. native port" table on
 * `/projects` and in each case study. `{tag}` is the repository's latest
 * release tag. `iconOnly` links show as compact icon buttons on the card (the
 * label stays for screen readers and as a tooltip).
 */
export const preservationProjects = [
  {
    id: "ios-loader",
    category: "preservation",
    caseStudy: routes.iosLoader,
    // U+2011 (non-breaking hyphen) keeps "32-Bit" whole on a narrow tile.
    shortTitle: tx("32‑Bit iOS (ARMv7) Binary Loader", "Loader iOS 32‑Bit"),
    subtitle: tx("Static Recompiler & OpenGL ES Runtime Bridge", "Rekompiler Statis & Runtime Bridge OpenGL ES"),
    platform: "32-Bit iPad",
    platformIcon: "tablet",
    origin: "32-bit iPad · ARMv7 Mach-O",
    target: "Windows & Linux x86 · {tag}",
    description: tx(
      "Static binary recompilation and OpenGL ES to OpenGL 2.1 runtime bridge for native Windows & Linux x86 execution.",
      "Rekompilasi biner statis dan jembatan runtime OpenGL ES ke OpenGL 2.1 untuk eksekusi native di Windows & Linux x86.",
    ),
    tags: [tx("Static Recompilation", "Rekompilasi Statis"), "ARMv7 → x86", "Mach-O", "OpenGL ES → GL 2.1"],
    art: "iosloader",
    compactArt: "iosloader-strip",
    image: null,
    links: [
      { label: GITHUB_REPOSITORY, href: links.iosLoaderRepo, icon: "github", iconOnly: true },
      { release: "ios-loader", label: RELEASE_TAG, href: links.iosLoaderReleases, icon: "tag", iconOnly: true },
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
    id: "mac-loader",
    category: "preservation",
    caseStudy: routes.macLoader,
    shortTitle: tx("32‑Bit Mac (i386) Native Loader", "Loader Mac 32‑Bit"),
    subtitle: tx("User-Space Mach-O Loader & ABI/Syscall Shim", "Loader Mach-O User-Space & Shim ABI/Syscall"),
    platform: "32-Bit Mac",
    platformIcon: "laptop",
    origin: tx("32-bit Mac · i386 Mach-O", "Mac 32-bit · Mach-O i386"),
    target: "Windows & Linux x86 · {tag}",
    description: tx(
      "User-space Mach-O loader and ABI/syscall shim running legacy OS X i386 binaries natively without CPU emulation.",
      "Loader Mach-O user-space dan jembatan ABI/syscall untuk menjalankan biner klasik OS X i386 secara native tanpa emulasi CPU.",
    ),
    tags: [tx("Mach-O Loader", "Loader Mach-O"), "i386 ABI", tx("dyld binding", "Binding dyld"), "SHA-256"],
    art: "macloader",
    compactArt: "macloader-strip",
    image: null,
    links: [
      { label: GITHUB_REPOSITORY, href: links.macLoaderRepo, icon: "github", iconOnly: true },
      { release: "mac-loader", label: RELEASE_TAG, href: links.macLoaderReleases, icon: "tag", iconOnly: true },
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

/** Every project, originals first: 4 original applications and the 2 binary loaders. */
export const projects = [...originalProjects, ...preservationProjects];

/* -------------------------------------------------------------------------- */
/*                               Counter metrics                              */
/* -------------------------------------------------------------------------- */

/** Home metric strip. `text` shows a fixed word instead of an animated number; `note` is a small line under the label. */
export const counterItems = [
  {
    id: "years",
    text: "2024 – 2026", // non-breaking spaces keep the range on one line
    label: tx("Business application operations", "Operasional aplikasi bisnis"),
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
      `${originalProjects.length} original · ${preservationProjects.length} preservation loaders`,
      `${originalProjects.length} original · ${preservationProjects.length} loader preservasi`,
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

/*
 * The loaders have no standalone repository: each one lives in host/core of
 * the production port it runs and ships inside that port's releases. These
 * labels say so ("target implementation") instead of suggesting a bare loader
 * download.
 */
const IMPLEMENTATION_REPO = tx("Implementation Repository (GitHub)", "Repositori Implementasi (GitHub)");
const LOADER_CORE = tx("Loader Core Module (host/core)", "Modul Inti Loader (host/core)");
const TARGET_RELEASE = tx("Target Release {tag}", "Rilis Target {tag}");
const DOWNLOAD_TARGET = tx("Download Target Release ({tag})", "Unduh Rilis Target ({tag})");
const TARGET_ONE = tx("Target Implementation #1", "Implementasi Target #1");

/**
 * Data for the deep-dive pages, in reading order (the Previous / Next links at
 * the bottom of each page follow it). Each section renders a list of typed
 * blocks: `prose`, `cards`, `timeline`, `flow`, `architecture`, `table`
 * (`plain: true` for text cells instead of key caps), `comparison` (the
 * project's legacy-vs-port table), `checklist`, `code` and `links`. A link with
 * `to` is an internal route. Facts and links may hold `{tag}` (the latest
 * release tag). Technical details follow each repository's README, FIXES.md,
 * PATCHNOTES.md, docs/NOTES.md and source code.
 */
export const caseStudies = {
  niskala: {
    projectId: "niskala",
    eyebrow: tx("Case Study · Windows System Utility", "Studi Kasus · Utilitas Sistem Windows"),
    title: "Niskala Utilities",
    repoName: `${githubUser}/${NISKALA_REPO}`,
    summary: tx(
      "A Windows uninstaller, cleaner, resource control and maintenance toolkit: one C# engine with two front ends, the niskala.exe command line and the Niskala.exe WinUI 3 app. Every removal passes a path or registry guard twice and runs as a journaled transaction with a registry backup, and system repair runs only Windows' own tools from a closed list.",
      "Uninstaller, pembersih, kontrol resource, dan toolkit pemeliharaan Windows: satu engine C# dengan dua antarmuka, command line niskala.exe dan aplikasi WinUI 3 Niskala.exe. Setiap penghapusan melewati pengaman path atau registry dua kali dan berjalan sebagai transaksi berjurnal dengan backup registry, sedangkan perbaikan sistem hanya menjalankan tools bawaan Windows dari daftar tertutup.",
    ),
    art: "niskala",
    image: null,
    facts: [
      { id: "platform", label: tx("Platform", "Platform"), value: "Windows 10 & 11" },
      { id: "front", label: tx("Front ends", "Antarmuka"), value: "WinUI 3 & CLI" },
      { id: "build", label: "Build", value: "C# · Native AOT" },
      { id: "release", label: tx("Latest release", "Rilis terbaru"), value: "{tag} · GPL-3.0" },
    ],
    links: [
      { label: GITHUB_REPOSITORY, href: links.niskalaRepo, icon: "github" },
      { release: "niskala", label: RELEASE_TAG, href: links.niskalaReleases, icon: "tag" },
    ],
    sections: [
      {
        id: "architecture",
        title: tx("Modular architecture", "Arsitektur modular"),
        intro: tx(
          "The goal was a maintenance tool in which every action names what it touches, refuses protected locations and can be undone wherever Windows allows it. Each concern is its own project in `Niskala.sln`, and every module that removes or changes something goes through the same safety layer and journal.",
          "Tujuannya adalah tool pemeliharaan yang setiap aksinya menyebut apa yang disentuh, menolak lokasi terlindungi, dan bisa dibatalkan selama Windows mengizinkan. Setiap fungsi menjadi proyek tersendiri di `Niskala.sln`, dan setiap modul yang menghapus atau mengubah sesuatu melewati lapisan pengaman dan jurnal yang sama.",
        ),
        blocks: [
          {
            type: "cards",
            items: [
              {
                icon: "terminal",
                title: "Niskala.Repair",
                body: tx(
                  "Runs DISM, SFC, netsh, ipconfig and chkdsk from a closed list of commands with fixed arguments, and maps their exit codes to a diagnostic.",
                  "Menjalankan DISM, SFC, netsh, ipconfig, dan chkdsk dari daftar perintah tertutup dengan argumen tetap, lalu memetakan exit code-nya ke diagnosis.",
                ),
              },
              {
                icon: "archive",
                title: "Niskala.Cleaner",
                body: tx(
                  "Cleans system junk and browser traces from declarative rules in `rules/*.json`, and compacts SQLite databases only after `PRAGMA integrity_check` answers `ok`.",
                  "Membersihkan sampah sistem dan jejak browser dari aturan deklaratif di `rules/*.json`, dan memadatkan database SQLite hanya setelah `PRAGMA integrity_check` menjawab `ok`.",
                ),
              },
              {
                icon: "chip",
                title: "Niskala.Optimizer",
                body: tx(
                  "Resource Control for startup entries, third-party services, scheduled tasks and context-menu handlers, each switch recorded before and after.",
                  "Resource Control untuk entri startup, layanan pihak ketiga, scheduled task, dan context-menu handler, dengan setiap perubahan dicatat sebelum dan sesudahnya.",
                ),
              },
              {
                icon: "layers",
                title: "Niskala.Toolkit",
                body: tx(
                  "Storage Map, Duplicate Scan and Secure Wipe. Storage Map counts a folder that is a reparse point as a link and never enters it, so junction loops cannot happen.",
                  "Storage Map, Duplicate Scan, dan Secure Wipe. Storage Map menghitung folder yang berupa reparse point sebagai tautan dan tidak pernah memasukinya, sehingga loop junction tidak mungkin terjadi.",
                ),
              },
              {
                icon: "shield",
                title: "Niskala.Core",
                body: tx(
                  "The safety layer: `PathGuard` for files and folders, `RegistryGuard` for keys and values.",
                  "Lapisan pengaman: `PathGuard` untuk file dan folder, `RegistryGuard` untuk key dan value.",
                ),
              },
              {
                icon: "database",
                title: "Niskala.Guardian",
                body: tx(
                  "Runs every removal as a journaled transaction in `%LocalAppData%\\Niskala\\transactions`, so `restore` can put it back.",
                  "Menjalankan setiap penghapusan sebagai transaksi berjurnal di `%LocalAppData%\\Niskala\\transactions`, sehingga `restore` bisa mengembalikannya.",
                ),
              },
            ],
          },
        ],
      },
      {
        id: "guardrails",
        title: tx("Safety guardrails", "Pengaman"),
        intro: tx(
          "Every removal must pass a guard twice: when the scanner proposes it, and again right before the Guardian acts.",
          "Setiap penghapusan harus melewati pengaman dua kali: saat scanner mengusulkannya, dan lagi tepat sebelum Guardian bertindak.",
        ),
        blocks: [
          {
            type: "flow",
            caption: tx("PathGuard checks, in order", "Urutan pemeriksaan PathGuard"),
            steps: [
              {
                icon: "code",
                title: tx("Syntax", "Sintaks"),
                body: tx(
                  "UNC and device paths, alternate data streams, . and .. segments, trailing dots or spaces, DOS device names",
                  "Path UNC dan device, alternate data stream, segmen . dan .., titik atau spasi di akhir, nama device DOS",
                ),
              },
              {
                icon: "shield",
                title: tx("Lexical rules", "Aturan leksikal"),
                body: tx("Protection rules on the path as written", "Aturan proteksi pada path seperti yang ditulis"),
              },
              {
                icon: "layers",
                title: tx("Physical resolution", "Resolusi fisik"),
                body: tx(
                  "Through a handle: junctions, symbolic links, SUBST drives, 8.3 names and network drives resolved",
                  "Melalui handle: junction, symbolic link, drive SUBST, nama 8.3, dan network drive diresolusi",
                ),
              },
              {
                icon: "lock",
                title: tx("Physical rules", "Aturan fisik"),
                body: tx("The same protection rules again on the resolved path", "Aturan proteksi yang sama sekali lagi pada path hasil resolusi"),
              },
            ],
          },
          {
            type: "cards",
            items: [
              {
                icon: "lock",
                title: "RegistryGuard",
                body: tx(
                  "All of `HKLM` is a protected tree, with named rules for `SYSTEM`, `SAM`, `SECURITY`, `BCD00000000` and `HARDWARE` so a denial names the hive. `HKCR` is refused because it merges two hives, and keys are opened with `REG_OPTION_OPEN_LINK` so a registry symbolic link is refused.",
                  "Seluruh `HKLM` adalah tree terlindungi, dengan aturan bernama untuk `SYSTEM`, `SAM`, `SECURITY`, `BCD00000000`, dan `HARDWARE` sehingga penolakan menyebut hive-nya. `HKCR` ditolak karena menggabungkan dua hive, dan key dibuka dengan `REG_OPTION_OPEN_LINK` sehingga symbolic link registry ditolak.",
                ),
              },
              {
                icon: "shield",
                title: "PrivilegeScope",
                body: tx(
                  "When elevated, `SeBackupPrivilege` and `SeRestorePrivilege` are enabled for the removal loop only and released afterwards. PathGuard, the owner check and the signature check still decide what may go.",
                  "Saat elevated, `SeBackupPrivilege` dan `SeRestorePrivilege` hanya diaktifkan selama loop penghapusan lalu dilepas. PathGuard, pemeriksaan owner, dan pemeriksaan tanda tangan tetap menentukan apa yang boleh dihapus.",
                ),
              },
              {
                icon: "archive",
                title: tx(".reg backups", "Backup .reg"),
                body: tx(
                  "Before anything is removed, the Guardian saves `registry.json.gz`, with every value's type and bytes, and `registry.reg` in Registry Editor format (UTF-16, version 5.00) for use without Niskala.",
                  "Sebelum apa pun dihapus, Guardian menyimpan `registry.json.gz`, berisi tipe dan byte setiap value, serta `registry.reg` dalam format Registry Editor (UTF-16, versi 5.00) yang bisa dipakai tanpa Niskala.",
                ),
              },
              {
                icon: "terminal",
                title: tx("Handle-bound decisions", "Keputusan terikat handle"),
                body: tx(
                  "The final check opens the object and binds the decision to that handle: the same physical path as scanned, not owned by TrustedInstaller, not a Microsoft-signed program.",
                  "Pemeriksaan terakhir membuka objeknya dan mengikat keputusan ke handle itu: path fisik yang sama dengan saat dipindai, bukan milik TrustedInstaller, dan bukan program bertanda tangan Microsoft.",
                ),
              },
            ],
          },
        ],
      },
      {
        id: "maintenance",
        title: tx("Non-destructive maintenance scope", "Cakupan pemeliharaan non-destruktif"),
        intro: tx(
          "`Niskala.Repair` runs Windows' own repair tools and nothing else. `RepairCommandId` is a closed enum, and each value resolves to a program in the system directory with fixed arguments.",
          "`Niskala.Repair` hanya menjalankan tools perbaikan bawaan Windows. `RepairCommandId` adalah enum tertutup, dan setiap nilainya diresolusi ke program di direktori sistem dengan argumen tetap.",
        ),
        blocks: [
          {
            type: "table",
            plain: true,
            caption: tx("The closed command list", "Daftar perintah tertutup"),
            columns: [tx("Command", "Perintah"), tx("Runs", "Menjalankan"), tx("Notes", "Catatan")],
            rows: [
              ["dism-check-health", "`DISM /Online /Cleanup-Image /CheckHealth`", tx("Reads only", "Hanya membaca")],
              [
                "dism-restore-health",
                "`DISM /Online /Cleanup-Image /RestoreHealth`",
                tx("Repairs the component store from Windows Update", "Memperbaiki component store dari Windows Update"),
              ],
              ["sfc-scan", "`sfc /scannow`", tx("Replaces damaged protected files", "Mengganti file terlindungi yang rusak")],
              [
                "dism-component-cleanup",
                "`DISM /Online /Cleanup-Image /StartComponentCleanup`",
                tx("Never `/ResetBase`, so updates stay uninstallable", "Tidak pernah `/ResetBase`, jadi update tetap bisa di-uninstall"),
              ],
              ["winsock-reset", "`netsh winsock reset`", tx("Needs a restart", "Perlu restart")],
              ["ip-reset", "`netsh int ip reset`", tx("Needs a restart", "Perlu restart")],
              ["flush-dns", "`ipconfig /flushdns`", tx("Clears the DNS cache", "Mengosongkan cache DNS")],
              [
                "chkdsk-scan",
                "`chkdsk C: /scan`",
                tx(
                  "Online scan; the drive is the system drive Windows reports. Never `/f`, `/r`, `/x` or `/spotfix`",
                  "Pemindaian online; drive-nya adalah drive sistem dari Windows. Tidak pernah `/f`, `/r`, `/x`, atau `/spotfix`",
                ),
              ],
            ],
          },
          {
            type: "checklist",
            title: tx("Hard limits", "Batasan tetap"),
            items: [
              tx(
                "Every command needs elevation; without it the runner returns NotElevated and starts nothing",
                "Setiap perintah butuh elevasi; tanpanya runner mengembalikan NotElevated dan tidak menjalankan apa pun",
              ),
              tx(
                "The resolved invocation accepts only these programs and argument tokens, and refuses destructive switches by name",
                "Invocation yang diresolusi hanya menerima program dan token argumen ini, dan menolak switch destruktif berdasarkan namanya",
              ),
              tx(
                "A program that is missing or is a reparse point is not started",
                "Program yang hilang atau berupa reparse point tidak dijalankan",
              ),
              tx(
                "Cancelling kills the whole process tree; exit codes such as 3010 and 0x800F081F map to a diagnostic",
                "Pembatalan menghentikan seluruh process tree; exit code seperti 3010 dan 0x800F081F dipetakan ke diagnosis",
              ),
            ],
          },
          {
            type: "code",
            caption: tx("From the command line", "Dari command line"),
            snippets: [
              { label: tx("List the repairs", "Daftar perbaikan"), code: "niskala repair list" },
              { label: tx("Run one", "Jalankan satu"), code: "niskala repair run dism-check-health" },
            ],
            note: tx(
              "A repair that changes Windows asks first (--yes skips the question); the exit code is 3010 when a restart is needed.",
              "Perbaikan yang mengubah Windows akan bertanya dulu (--yes melewati pertanyaan); exit code 3010 berarti perlu restart.",
            ),
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
                "Native AOT builds of niskala.exe and Niskala.exe for win-x64 and win-arm64",
                "Build Native AOT untuk niskala.exe dan Niskala.exe, untuk win-x64 dan win-arm64",
              ),
              tx(
                "A clean-room implementation: no code or binaries of other system utilities analysed or reused",
                "Implementasi clean-room: tidak ada kode atau biner utilitas sistem lain yang dianalisis atau dipakai ulang",
              ),
              tx("Released under the GNU General Public License v3.0", "Dirilis dengan lisensi GNU General Public License v3.0"),
            ],
          },
          {
            type: "links",
            items: [
              { release: "niskala", label: DOWNLOAD_RELEASE, href: links.niskalaReleases, icon: "tag", primary: true },
              { label: BROWSE_SOURCE, href: links.niskalaRepo, icon: "github" },
              { to: "/notes/windows-system-guardrails", label: tx("Engineering note: safety guardrails", "Catatan teknis: pengaman"), icon: "book" },
            ],
          },
        ],
      },
    ],
  },

  "ios-loader": {
    projectId: "ios-loader",
    eyebrow: tx("Case Study · 32-Bit iOS Software Preservation", "Studi Kasus · Preservasi Software iOS 32-Bit"),
    title: tx("32-Bit iOS (ARMv7) Binary Loader & Runtime Bridge", "Loader Biner iOS 32-Bit (ARMv7) & Runtime Bridge"),
    repoName: `${githubUser}/${IOS_LOADER_REPO}`,
    summary: tx(
      "A static recompiler and runtime bridge that keeps a 32-bit iPad (ARMv7) application running after iOS 11 dropped 32-bit support. All 23,873 guest functions are translated ahead of time to C and built for x86; at start-up a loader maps the original Mach-O at its own addresses, binds every import to a host bridge that speaks the iOS ARM calling convention and registers the Objective-C metadata, while OpenGL ES runs on desktop OpenGL 2.1. No iOS and no CPU emulation run underneath.",
      "Rekompiler statis dan runtime bridge yang membuat aplikasi iPad 32-bit (ARMv7) tetap berjalan setelah iOS 11 menghapus dukungan 32-bit. Ke-23.873 fungsi guest diterjemahkan lebih dulu ke C dan di-build untuk x86; saat start-up, loader memetakan Mach-O aslinya di alamat aslinya, menautkan setiap import ke host bridge yang memakai konvensi pemanggilan ARM iOS, dan mendaftarkan metadata Objective-C, sementara OpenGL ES berjalan di OpenGL 2.1 desktop. Tidak ada iOS maupun emulasi CPU di bawahnya.",
    ),
    art: "iosloader",
    image: null,
    facts: [
      { id: "platform", label: tx("Original platform", "Platform asli"), value: "32-bit iPad · ARMv7" },
      { id: "functions", label: tx("Recompiled functions", "Fungsi direkompilasi"), value: tx("23,873", "23.873") },
      { id: "imports", label: tx("Import signatures", "Signature import"), value: "747 · imports.sig" },
      { id: "host", label: tx("Runs on", "Berjalan di"), value: "Windows & Linux x86 · {tag}" },
    ],
    links: [
      { label: IMPLEMENTATION_REPO, href: links.iosLoaderRepo, icon: "github" },
      { release: "ios-loader", label: TARGET_RELEASE, href: links.iosLoaderReleases, icon: "tag" },
      { label: LOADER_CORE, href: links.iosLoaderSource, icon: "code" },
    ],
    // Shown in the reader navigation beside Previous / Next.
    compare: { to: routes.macLoader, label: tx("Compare: 32-Bit Mac Loader", "Bandingkan: Loader Mac 32-Bit"), icon: "laptop" },
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
        id: "pipeline",
        title: tx("Hybrid loading pipeline", "Pipeline loading hybrid"),
        intro: tx(
          "Code and data take different paths. The instructions were translated at build time (`recomp/`, one C function `F_<addr>(CPU *c)` per guest function); the data, symbol tables and Objective-C metadata are read from the user's own Mach-O when the program starts (`host/core/loader.c`, `macho.c`).",
          "Kode dan data menempuh jalur berbeda. Instruksi diterjemahkan saat build (`recomp/`, satu fungsi C `F_<addr>(CPU *c)` per fungsi guest); data, tabel simbol, dan metadata Objective-C dibaca dari Mach-O milik pengguna saat program dimulai (`host/core/loader.c`, `macho.c`).",
        ),
        blocks: [
          {
            type: "flow",
            caption: tx("From the iOS Mach-O to running code", "Dari Mach-O iOS ke kode yang berjalan"),
            steps: [
              {
                icon: "code",
                title: tx("Parse", "Parse"),
                body: tx(
                  "Header, LC_SEGMENT, LC_SYMTAB, LC_DYSYMTAB, LC_DYLD_INFO and the linked dylibs; anything but CPU_TYPE_ARM is refused",
                  "Header, LC_SEGMENT, LC_SYMTAB, LC_DYSYMTAB, LC_DYLD_INFO, dan dylib yang ditautkan; selain CPU_TYPE_ARM ditolak",
                ),
              },
              {
                icon: "layers",
                title: tx("Map segments", "Petakan segmen"),
                body: tx(
                  "__TEXT and __DATA copied to their own addresses; a segment that does not fit the reserved range stops the load",
                  "__TEXT dan __DATA disalin ke alamat aslinya; segmen yang tidak muat di rentang cadangan menghentikan proses load",
                ),
              },
              {
                icon: "terminal",
                title: tx("Bind", "Bind"),
                body: tx(
                  "Regular, lazy and weak bind opcodes: functions to ARM-ABI bridges, data to host objects, missing data to guard slots",
                  "Opcode bind regular, lazy, dan weak: fungsi ke bridge ABI ARM, data ke objek host, data yang hilang ke slot guard",
                ),
              },
              {
                icon: "cube",
                title: "Objective-C",
                body: tx(
                  "Selectors in __objc_selrefs interned, classes in __objc_classlist registered beside the host classes",
                  "Selector di __objc_selrefs di-intern, kelas di __objc_classlist didaftarkan di samping kelas host",
                ),
              },
              {
                icon: "chip",
                title: tx("Run", "Jalankan"),
                body: tx(
                  "The __mod_init_func initializers, then the entry point, all as recompiled native code",
                  "Initializer __mod_init_func, lalu entry point, semuanya sebagai kode native hasil rekompilasi",
                ),
              },
            ],
          },
          {
            type: "table",
            plain: true,
            caption: tx("Fixed address layout (layout.h)", "Layout alamat tetap (layout.h)"),
            columns: [tx("Range", "Rentang"), tx("Holds", "Isi")],
            rows: [
              ["`0x00011000 – 0x008B5000`", tx("The Mach-O image at its own addresses", "Image Mach-O di alamat aslinya")],
              [
                "`0x008C0000`",
                tx(
                  "Copy of the image's first 64 KB (0x1000 – 0x11000): Windows maps nothing below 0x10000 and the executable's own header sits there. Header pointers in __program_vars and __nl_symbol_ptr are redirected to the copy",
                  "Salinan 64 KB pertama image (0x1000 – 0x11000): Windows tidak memetakan apa pun di bawah 0x10000 dan header executable sendiri ada di sana. Pointer header di __program_vars dan __nl_symbol_ptr dialihkan ke salinan ini",
                ),
              ],
              ["`0x008D0000`", tx("Import slots, one per bound host function", "Slot import, satu per fungsi host yang ditautkan")],
              ["`0x008D4000`", tx("16-byte guard slots for data imports the host does not provide", "Slot guard 16 byte untuk import data yang tidak disediakan host")],
              ["`0x008D8000`", tx("Host function addresses handed to the guest", "Alamat fungsi host yang diberikan ke guest")],
            ],
          },
        ],
      },
      {
        id: "resolution",
        title: tx("Symbol & stub resolution", "Resolusi simbol & stub"),
        intro: tx(
          "Every bind slot must land inside the image, or the load stops with an error. After binding, the import, guard and host-function pages are made no-access, so a stray read or call faults and is reported with the symbol's name.",
          "Setiap slot bind harus berada di dalam image, atau proses load berhenti dengan error. Setelah binding, halaman import, guard, dan fungsi host dibuat no-access, sehingga baca atau panggilan yang nyasar memicu fault dan dilaporkan beserta nama simbolnya.",
        ),
        blocks: [
          {
            type: "table",
            plain: true,
            caption: tx("How an import is resolved", "Cara sebuah import diresolusi"),
            columns: [tx("Import", "Import"), tx("Resolved to", "Diresolusi ke")],
            rows: [
              [
                tx("Function", "Fungsi"),
                tx(
                  "An ARM-ABI bridge, found by binary search in the sorted bridge table (`rt_bridge_by_name`) and given an import slot",
                  "Bridge ABI ARM, dicari dengan binary search di tabel bridge yang terurut (`rt_bridge_by_name`) lalu diberi slot import",
                ),
              ],
              [
                tx("Data symbol", "Simbol data"),
                tx(
                  "A host object (`rt_data_import`): class and metaclass objects, C++ vtables and type info, `k…` constants, `…Notification` and `…Key` strings",
                  "Objek host (`rt_data_import`): objek class dan metaclass, vtable dan type info C++, konstanta `k…`, string `…Notification` dan `…Key`",
                ),
              ],
              [
                tx("Missing data", "Data yang hilang"),
                tx("A no-access guard slot, logged at load with its address", "Slot guard no-access, dicatat saat load beserta alamatnya"),
              ],
              [
                tx("Weak import the image defines", "Import weak yang didefinisikan image"),
                tx("Kept as the image's own definition", "Tetap memakai definisi milik image"),
              ],
              [
                "`dladdr`, `dlsym`, `_dyld_*`",
                tx(
                  "Answered by the host (`dyld.c`): one image, the original executable",
                  "Dijawab host (`dyld.c`): satu image, yaitu executable aslinya",
                ),
              ],
            ],
          },
          {
            type: "cards",
            items: [
              {
                icon: "cube",
                title: tx("Objective-C runtime", "Runtime Objective-C"),
                body: tx(
                  "`objc_msgSend`, `objc_msgSend_stret` and the `Super2` variants are bridges over a host class registry. When an application class subclasses a host class, the host class takes its instance size from the subclass's instance start, so the two layouts line up.",
                  "`objc_msgSend`, `objc_msgSend_stret`, dan varian `Super2` adalah bridge di atas registry kelas host. Saat kelas aplikasi menurunkan kelas host, kelas host mengambil ukuran instance dari awal instance subclass-nya, sehingga kedua layout tetap sejajar.",
                ),
              },
              {
                icon: "layers",
                title: tx("iOS libraries", "Pustaka iOS"),
                body: tx(
                  "Foundation, UIKit, OpenAL, CoreFoundation, libc, libstdc++ and the rest live in `host/shims/`; OpenGL ES and EAGL run on desktop OpenGL, with SDL3 for the window, input and audio.",
                  "Foundation, UIKit, OpenAL, CoreFoundation, libc, libstdc++, dan lainnya ada di `host/shims/`; OpenGL ES dan EAGL berjalan di OpenGL desktop, dengan SDL3 untuk jendela, input, dan audio.",
                ),
              },
            ],
          },
        ],
      },
      {
        id: "abi",
        title: tx("Calling-convention bridge", "Jembatan konvensi pemanggilan"),
        intro: tx(
          "Recompiled functions take a `CPU *` that holds the ARM registers, flags and VFP/NEON state. A call to an imported function lands in a bridge generated from its signature in `host/core/imports.sig` by `recomp/bridgegen.py`.",
          "Fungsi hasil rekompilasi menerima `CPU *` yang menyimpan register ARM, flag, dan state VFP/NEON. Panggilan ke fungsi impor masuk ke bridge yang dihasilkan dari signature-nya di `host/core/imports.sig` oleh `recomp/bridgegen.py`.",
        ),
        blocks: [
          {
            type: "cards",
            items: [
              {
                icon: "code",
                title: tx("Arguments", "Argumen"),
                body: tx(
                  "The first four words come from `r0`–`r3`, the rest from the guest stack at `sp`. 64-bit integers and doubles take two words; variadic calls read up to 96 words.",
                  "Empat word pertama diambil dari `r0`–`r3`, sisanya dari stack guest di `sp`. Integer 64-bit dan double memakai dua word; panggilan variadic membaca hingga 96 word.",
                ),
              },
              {
                icon: "terminal",
                title: tx("Returns", "Nilai balik"),
                body: tx(
                  "Integers and floats return in `r0`, 64-bit values and doubles in `r0:r1`. The bridges also cover VFP arguments and structure returns.",
                  "Integer dan float dikembalikan di `r0`, nilai 64-bit dan double di `r0:r1`. Bridge juga menangani argumen VFP dan structure return.",
                ),
              },
              {
                icon: "chip",
                title: tx("Indirect calls", "Panggilan tidak langsung"),
                body: tx(
                  "A call through a pointer goes through a direct-mapped dispatch table from guest address to recompiled function (`rt_lookup`).",
                  "Panggilan melalui pointer melewati tabel dispatch direct-mapped dari alamat guest ke fungsi hasil rekompilasi (`rt_lookup`).",
                ),
              },
              {
                icon: "shield",
                title: tx("Exceptions", "Exception"),
                body: tx(
                  "The binary uses SjLj exceptions. The runtime keeps the SjLj frame list across host frames, and guest `setjmp` / `longjmp` restore `r4`–`r11`, `sp`, `d8` and that list.",
                  "Biner ini memakai exception SjLj. Runtime menjaga daftar frame SjLj melintasi frame host, dan `setjmp` / `longjmp` guest memulihkan `r4`–`r11`, `sp`, `d8`, serta daftar itu.",
                ),
              },
            ],
          },
        ],
      },
      {
        id: "execution",
        title: tx("Native execution, no OS emulation", "Eksekusi native, tanpa emulasi OS"),
        blocks: [
          {
            type: "checklist",
            title: tx("What runs at run time", "Apa yang berjalan saat runtime"),
            items: [
              tx(
                "No iOS kernel, no dyld and no CPU interpreter: the recompiled C functions are ordinary x86 code",
                "Tanpa kernel iOS, tanpa dyld, dan tanpa interpreter CPU: fungsi C hasil rekompilasi adalah kode x86 biasa",
              ),
              tx(
                "gt.ld (Windows) and gt_linux.ld (a fixed-address ELF) reserve the range from 0x11000, so the image loads with no relocation",
                "gt.ld (Windows) dan gt_linux.ld (ELF beralamat tetap) mencadangkan rentang mulai 0x11000, sehingga image dimuat tanpa relokasi",
              ),
              tx(
                "Each emitted instruction form is tested against Unicorn (Cortex-A8) in tests/difftest.py",
                "Setiap bentuk instruksi yang dihasilkan diuji terhadap Unicorn (Cortex-A8) di tests/difftest.py",
              ),
              tx(
                "The shims reach the application-specific code through a single hooks header, so the loader itself knows no application",
                "Shim menjangkau kode khusus aplikasi melalui satu header hook, sehingga loader sendiri tidak mengenal aplikasi mana pun",
              ),
            ],
          },
        ],
      },
      {
        id: "engineering",
        title: tx("Port engineering on top of the loader", "Rekayasa port di atas loader"),
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
                  "Keyboard, mouse and Xbox or PlayStation controllers with remappable keys. Add-on content built from editions the user owns loads from an `add-on` folder.",
                  "Keyboard, mouse, serta controller Xbox atau PlayStation dengan tombol yang bisa diatur ulang. Konten add-on yang dibuat dari edisi milik pengguna dimuat dari folder `add-on`.",
                ),
              },
              {
                icon: "cloud",
                title: tx("Leaderboard", "Leaderboard"),
                body: tx(
                  "The in-app leaderboard is kept locally and shared through a Cloudflare Worker backed by D1, replacing the shut-down original servers.",
                  "Leaderboard di aplikasi disimpan lokal dan dibagikan lewat Cloudflare Worker berbasis D1, menggantikan server asli yang sudah dimatikan.",
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
                body: tx("Leaderboard API for submissions and queries", "API leaderboard untuk pengiriman dan kueri"),
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
        id: "targets",
        title: tx("Verified target implementations", "Implementasi target terverifikasi"),
        intro: tx(
          "The loader runtime is maintained directly inside production preservation releases rather than as a standalone bare repository. Source modules and compiled builds are verified below:",
          "Runtime loader dipelihara langsung di dalam rilis preservasi produksi (bukan sebagai repositori polos terpisah). Modul source dan rilis biner terverifikasi tersedia di bawah:",
        ),
        blocks: [
          {
            type: "targets",
            items: [
              {
                id: "target-1",
                kicker: TARGET_ONE,
                title: tx("32-Bit iPad (ARMv7) Simulation Workload", "Beban Simulasi 3D iPad ARMv7"),
                repo: `${githubUser}/${IOS_LOADER_REPO}`,
                download: { release: "ios-loader", label: DOWNLOAD_TARGET, href: links.iosLoaderReleases, icon: "tag" },
                links: [
                  { label: IMPLEMENTATION_REPO, href: links.iosLoaderRepo, icon: "github" },
                  { label: LOADER_CORE, href: links.iosLoaderSource, icon: "code" },
                  { label: tx("Architecture & Recompilation Notes (README · How it works)", "Catatan Rekompilasi (README · How it works)"), href: links.iosLoaderNotes, icon: "book" },
                ],
              },
            ],
          },
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
        ],
      },
    ],
  },

  "mac-loader": {
    projectId: "mac-loader",
    eyebrow: tx("Case Study · 32-Bit Mac Software Preservation", "Studi Kasus · Preservasi Software Mac 32-Bit"),
    title: tx("32-Bit Mac (i386) Native Loader & ABI Bridge", "Loader Native Mac 32-Bit (i386) & ABI Bridge"),
    repoName: `${githubUser}/${MAC_LOADER_REPO}`,
    summary: tx(
      "A user-space Mach-O loader and ABI/syscall shim that runs a 32-bit OS X (i386) application on Windows and Linux x86 after macOS Catalina removed 32-bit support. The executable is a non-PIE i386 Mach-O linked at 0x1000 with no rebase information, so the host reserves that range, copies the segments in, patches the small low range it cannot occupy, binds every import itself and calls the original x86 code directly, with no CPU emulation and no macOS underneath.",
      "Loader Mach-O user-space dan shim ABI/syscall yang menjalankan aplikasi OS X 32-bit (i386) di Windows dan Linux x86 setelah macOS Catalina menghapus dukungan 32-bit. Executable-nya adalah Mach-O i386 non-PIE yang ditautkan di 0x1000 tanpa informasi rebase, sehingga host mencadangkan rentang itu, menyalin segmennya, mem-patch rentang rendah kecil yang tidak bisa ditempatinya, menautkan setiap import sendiri, dan memanggil kode x86 aslinya secara langsung, tanpa emulasi CPU dan tanpa macOS di bawahnya.",
    ),
    art: "macloader",
    image: null,
    facts: [
      { id: "input", label: tx("Input", "Input"), value: "i386 Mach-O · non-PIE" },
      { id: "binds", label: tx("Bind slots", "Slot bind"), value: tx("4,243 · 528 imports", "4.243 · 528 import") },
      { id: "shims", label: tx("Imports with a shim", "Import dengan shim"), value: tx("477 of 528", "477 dari 528") },
      { id: "host", label: tx("Runs on", "Berjalan di"), value: "Windows & Linux x86 · {tag}" },
    ],
    links: [
      { label: IMPLEMENTATION_REPO, href: links.macLoaderRepo, icon: "github" },
      { release: "mac-loader", label: TARGET_RELEASE, href: links.macLoaderReleases, icon: "tag" },
      { label: LOADER_CORE, href: links.macLoaderSource, icon: "code" },
    ],
    // Shown in the reader navigation beside Previous / Next.
    compare: { to: routes.iosLoader, label: tx("Compare: 32-Bit iOS Loader", "Bandingkan: Loader iOS 32-Bit"), icon: "tablet" },
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
        id: "layout",
        title: tx("Memory layout & loading", "Layout memori & loading"),
        intro: tx(
          "The host executable is based at `0x10000`, the lowest address Windows allows, and its first section (`.gmvimg`, from `reserve.S`) reserves the application's whole range so nothing else can be mapped there. On Linux the program is linked at `0x08048000` and maps the range with `MAP_FIXED_NOREPLACE` as it starts, so the layout and the patch table are the same on both.",
          "Executable host berbasis di `0x10000`, alamat terendah yang diizinkan Windows, dan section pertamanya (`.gmvimg`, dari `reserve.S`) mencadangkan seluruh rentang aplikasi sehingga tidak ada yang lain bisa dipetakan di sana. Di Linux, program ditautkan di `0x08048000` dan memetakan rentang itu dengan `MAP_FIXED_NOREPLACE` saat mulai, sehingga layout dan tabel patch-nya sama di keduanya.",
        ),
        blocks: [
          {
            type: "flow",
            caption: tx("Load sequence (host/core)", "Urutan load (host/core)"),
            steps: [
              {
                icon: "code",
                title: tx("Parse", "Parse"),
                body: tx(
                  "LC_SEGMENT, LC_SYMTAB, LC_DYSYMTAB, LC_DYLD_INFO, LC_UNIXTHREAD and LC_LOAD_DYLIB; i386, MH_EXECUTE and non-PIE are required",
                  "LC_SEGMENT, LC_SYMTAB, LC_DYSYMTAB, LC_DYLD_INFO, LC_UNIXTHREAD, dan LC_LOAD_DYLIB; wajib i386, MH_EXECUTE, dan non-PIE",
                ),
              },
              {
                icon: "layers",
                title: tx("Copy", "Salin"),
                body: tx(
                  "Segments into the reserved range; the code below 0x11000, where the PE header sits, into a copy at 0xC70000",
                  "Segmen ke rentang cadangan; kode di bawah 0x11000, tempat header PE berada, ke salinan di 0xC70000",
                ),
              },
              {
                icon: "terminal",
                title: tx("Patch", "Patch"),
                body: tx(
                  "4,360 branches and PIC references from gmv_patch.bin, CRC-locked to the binary and checked byte by byte first",
                  "4.360 branch dan referensi PIC dari gmv_patch.bin, terkunci CRC ke binernya dan diperiksa byte demi byte lebih dulu",
                ),
              },
              {
                icon: "database",
                title: tx("Bind", "Bind"),
                body: tx(
                  "All 4,243 bind slots written up front: a host shim, a name-reporting thunk, or a no-access stand-in",
                  "Semua 4.243 slot bind ditulis di awal: host shim, thunk yang melaporkan nama, atau pengganti no-access",
                ),
              },
              {
                icon: "chip",
                title: tx("Run", "Jalankan"),
                body: tx(
                  "451 static initializers one at a time, the Objective-C registry, then main()",
                  "451 static initializer satu per satu, registry Objective-C, lalu main()",
                ),
              },
            ],
          },
          {
            type: "table",
            plain: true,
            caption: tx("Low-range patch kinds (image.c)", "Jenis patch rentang rendah (image.c)"),
            columns: [tx("Kind", "Jenis"), tx("What it fixes", "Yang diperbaiki")],
            rows: [
              [
                "`REL32_OUT`",
                tx(
                  "A call, jmp or jcc in the low copy that leaves it: the displacement is shifted by the copy's offset",
                  "call, jmp, atau jcc di salinan rendah yang keluar darinya: displacement digeser sebesar offset salinan",
                ),
              ],
              [
                "`PIC_POP`",
                tx(
                  "A `call $+5; pop reg` sequence in the low copy: rewritten as `mov reg, <original address>` plus a `nop`",
                  "Urutan `call $+5; pop reg` di salinan rendah: ditulis ulang menjadi `mov reg, <alamat asli>` ditambah `nop`",
                ),
              ],
              [
                "`REL32_IN`",
                tx("A call or jmp from the image into low-range code: retargeted to the copy", "call atau jmp dari image ke kode rentang rendah: diarahkan ke salinan"),
              ],
              [
                "`PTR_IN`",
                tx("A data word holding a low-range code address: retargeted to the copy", "Word data yang berisi alamat kode rentang rendah: diarahkan ke salinan"),
              ],
            ],
          },
        ],
      },
      {
        id: "dyld",
        title: tx("dyld binding without dyld", "Binding dyld tanpa dyld"),
        intro: tx(
          "No dyld runs. The loader reads the `LC_DYLD_INFO` bind, lazy-bind and weak-bind opcode streams itself and writes every slot before the first instruction runs, so `dyld_stub_binder` and the `__stub_helper` code are never reached.",
          "Tidak ada dyld yang berjalan. Loader membaca sendiri stream opcode bind, lazy-bind, dan weak-bind dari `LC_DYLD_INFO`, lalu menulis setiap slot sebelum instruksi pertama berjalan, sehingga `dyld_stub_binder` dan kode `__stub_helper` tidak pernah tercapai.",
        ),
        blocks: [
          {
            type: "cards",
            items: [
              {
                icon: "database",
                title: tx("Ordinals & slots", "Ordinal & slot"),
                body: tx(
                  "Each import keeps its library ordinal. A symbol bound from two dylibs, a special ordinal, or a slot that is not an aligned data word outside `__TEXT` stops the load.",
                  "Setiap import menyimpan ordinal pustakanya. Simbol yang ditautkan dari dua dylib, ordinal khusus, atau slot yang bukan word data teralign di luar `__TEXT` menghentikan proses load.",
                ),
              },
              {
                icon: "shield",
                title: tx("Missing imports", "Import yang hilang"),
                body: tx(
                  "The 49 functions without a shim get a thunk that logs `[MISSING]` `unimplemented import <name>` and exits with code 3; the 2 data symbols get a no-access stand-in. A static audit of their callers found none reachable in this build.",
                  "49 fungsi tanpa shim mendapat thunk yang mencatat `[MISSING]` `unimplemented import <name>` lalu keluar dengan kode 3; 2 simbol data mendapat pengganti no-access. Audit statis terhadap pemanggilnya tidak menemukan satu pun yang bisa tercapai di build ini.",
                ),
              },
              {
                icon: "lock",
                title: tx("Faults stay contained", "Fault tetap terkendali"),
                body: tx(
                  "The code always runs under page protections and a vectored exception handler (`veh.c`; signal handlers on Linux). A stray jump into the original low range is redirected to its copy, and any other fault is reported with the live initializer or `main`.",
                  "Kode selalu berjalan di bawah proteksi halaman dan vectored exception handler (`veh.c`; signal handler di Linux). Lompatan nyasar ke rentang rendah asli dialihkan ke salinannya, dan fault lain dilaporkan beserta initializer yang sedang berjalan atau `main`.",
                ),
              },
            ],
          },
        ],
      },
      {
        id: "shims",
        title: tx("Darwin, Cocoa & OpenGL shims", "Shim Darwin, Cocoa & OpenGL"),
        intro: tx(
          "The shims in `host/shims/` implement the macOS libraries the binary imports and know no application; the fixes for this one live in a separate folder of their own.",
          "Shim di `host/shims/` mengimplementasikan pustaka macOS yang diimpor biner ini dan tidak mengenal aplikasi mana pun; perbaikan untuk aplikasi ini ada di folder tersendiri.",
        ),
        blocks: [
          {
            type: "table",
            plain: true,
            caption: tx("Imported libraries and their shims", "Pustaka yang diimpor dan shim-nya"),
            columns: [tx("Library", "Pustaka"), tx("Implementation", "Implementasi")],
            rows: [
              [
                tx("libSystem (BSD layer)", "libSystem (lapisan BSD)"),
                tx(
                  "libc, pthread, mmap, time, stdio, wchar and setjmp over Win32 or Linux calls (`shims.c`, `shimsw.c`)",
                  "libc, pthread, mmap, time, stdio, wchar, dan setjmp di atas panggilan Win32 atau Linux (`shims.c`, `shimsw.c`)",
                ),
              ],
              [
                "libobjc",
                tx(
                  "Objective-C 1.0: `objc_msgSend`, `_stret` and `Super` in assembly, over a class registry parsed from `__OBJC`",
                  "Objective-C 1.0: `objc_msgSend`, `_stret`, dan `Super` dalam assembly, di atas registry kelas yang di-parse dari `__OBJC`",
                ),
              ],
              [
                "Foundation / AppKit",
                tx(
                  "`{class, selector, imp}` tables; `NSApplicationMain` runs a host message loop, timers and the deferred-selector queue",
                  "Tabel `{class, selector, imp}`; `NSApplicationMain` menjalankan message loop host, timer, dan antrean selector tertunda",
                ),
              ],
              [
                "NSOpenGL / CGL / OpenGL",
                tx(
                  "`NSOpenGLContext` on SDL3's GL context; about 112 GL imports bound lazily, through a cdecl to stdcall adapter on Windows",
                  "`NSOpenGLContext` di atas konteks GL SDL3; sekitar 112 import GL ditautkan secara lazy, melalui adapter cdecl ke stdcall di Windows",
                ),
              ],
              [
                "CoreAudio AudioUnit",
                tx("The render callback is pulled for PCM and played on an SDL3 stream", "Render callback ditarik untuk PCM dan diputar di stream SDL3"),
              ],
              [
                "libstdc++",
                tx(
                  "Copy-on-write `std::string`, tree and list operations from libstdc++ 4.2, and an `ostringstream` accumulator",
                  "`std::string` copy-on-write, operasi tree dan list dari libstdc++ 4.2, serta akumulator `ostringstream`",
                ),
              ],
            ],
          },
        ],
      },
      {
        id: "abi",
        title: tx("ABI & thread-state compatibility", "Kompatibilitas ABI & state thread"),
        intro: tx(
          "Calls are mostly identical cdecl on both sides, and `int`, `long`, pointers, `float` and `double` have the same widths. The differences are handled one by one:",
          "Sebagian besar panggilan sama-sama cdecl di kedua sisi, dan `int`, `long`, pointer, `float`, serta `double` punya lebar yang sama. Perbedaannya ditangani satu per satu:",
        ),
        blocks: [
          {
            type: "cards",
            items: [
              {
                icon: "layers",
                title: tx("16-byte stack alignment", "Alignment stack 16 byte"),
                body: tx(
                  "The code assumes `esp` is 16-byte aligned at every call (SSE `movaps` on stack locals). Every host function that calls into it is marked `force_align_arg_pointer`, and on Linux the Objective-C dispatchers realign before calling C.",
                  "Kode ini mengasumsikan `esp` teralign 16 byte di setiap panggilan (SSE `movaps` pada variabel lokal stack). Setiap fungsi host yang memanggil ke dalamnya ditandai `force_align_arg_pointer`, dan di Linux dispatcher Objective-C menyelaraskan ulang sebelum memanggil C.",
                ),
              },
              {
                icon: "code",
                title: tx("Struct returns", "Struct return"),
                body: tx(
                  "macOS i386 returns a struct through a hidden pointer the callee pops (`ret $4`), and so does a one-word C++ class such as `std::string`. MinGW returns small aggregates in `eax`, so those returns are written in assembly.",
                  "macOS i386 mengembalikan struct melalui pointer tersembunyi yang di-pop callee (`ret $4`), begitu pula kelas C++ satu word seperti `std::string`. MinGW mengembalikan aggregate kecil di `eax`, sehingga return tersebut ditulis dalam assembly.",
                ),
              },
              {
                icon: "database",
                title: tx("Type widths", "Lebar tipe"),
                body: tx(
                  "`wchar_t` is 4 bytes on macOS; `time_t`, `off_t` and `jmp_buf` differ and are converted in `shimsw.c`. glibc's `pthread_cond_t` is 48 bytes against the Mac's 28, so on Linux the Mac-sized condition holds a pointer to one on the heap.",
                  "`wchar_t` berukuran 4 byte di macOS; `time_t`, `off_t`, dan `jmp_buf` berbeda dan dikonversi di `shimsw.c`. `pthread_cond_t` glibc berukuran 48 byte sedangkan milik Mac 28, sehingga di Linux condition berukuran Mac menyimpan pointer ke condition di heap.",
                ),
              },
              {
                icon: "chip",
                title: tx("Segment registers & TLS", "Register segmen & TLS"),
                body: tx(
                  "The binary does not use `%gs` for thread-local storage, or it could not run on Windows, so glibc's own `%gs`-based TLS on Linux does not conflict. `NSThread` and the pthread shims start ordinary host threads through aligned trampolines.",
                  "Biner ini tidak memakai `%gs` untuk thread-local storage, karena jika ya ia tidak bisa berjalan di Windows, sehingga TLS glibc berbasis `%gs` di Linux tidak bertabrakan. `NSThread` dan shim pthread menjalankan thread host biasa melalui trampoline yang teralign.",
                ),
              },
            ],
          },
        ],
      },
      {
        id: "fixes",
        title: tx("Engineering fixes in the port", "Perbaikan teknis di port"),
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
        id: "targets",
        title: tx("Verified target implementations", "Implementasi target terverifikasi"),
        intro: tx(
          "The Mach-O user-space loader and ABI shim are maintained directly inside production preservation releases rather than as a standalone bare repository:",
          "Loader Mach-O user-space dan jembatan ABI dipelihara langsung di dalam rilis preservasi produksi (bukan sebagai repositori polos terpisah):",
        ),
        blocks: [
          {
            type: "targets",
            items: [
              {
                id: "target-1",
                kicker: TARGET_ONE,
                title: tx("32-Bit OS X (i386) Open-World Workload", "Beban 3D Open-World OS X i386"),
                repo: `${githubUser}/${MAC_LOADER_REPO}`,
                download: { release: "mac-loader", label: DOWNLOAD_TARGET, href: links.macLoaderReleases, icon: "tag" },
                links: [
                  { label: IMPLEMENTATION_REPO, href: links.macLoaderRepo, icon: "github" },
                  { label: LOADER_CORE, href: links.macLoaderSource, icon: "code" },
                  { label: tx("Technical Notes (docs/NOTES.md)", "Catatan Teknis (docs/NOTES.md)"), href: links.macLoaderNotes, icon: "book" },
                ],
              },
            ],
          },
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
    title: tx("Business Application Operations Support Staff", "Staf Dukungan Operasional Aplikasi Bisnis"),
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

/**
 * Field Documentation on `/journey` (under the Operational Breakdown), in
 * display order. The files in `public/images/journey/` are web exports with
 * every face but the owner's blurred and no EXIF or GPS data; keep it that way
 * when adding photos. `width` / `height` are the files' pixel sizes. Thumbnails
 * frame the top of each photo; `position` (CSS object-position) moves the frame
 * to the people when the top is only sky.
 */
export const fieldDocs = [
  {
    id: "taa-golive-field",
    src: "images/journey/taa-golive-field.jpg",
    position: "center 68%",
    width: 1200,
    height: 1600,
    place: tx("Tanjung Api-Api Harbor", "Pelabuhan Tanjung Api-Api"),
    caption: tx(
      "On-site operational coordination with port officers during trip.ferizy.com go-live at Tanjung Api-Api Harbor.",
      "Koordinasi operasional lapangan bersama petugas pelabuhan saat go-live trip.ferizy.com di Pelabuhan Tanjung Api-Api.",
    ),
  },
  {
    id: "taa-golive-warroom",
    src: "images/journey/taa-golive-warroom.jpg",
    width: 1600,
    height: 1200,
    place: tx("Tanjung Api-Api Harbor", "Pelabuhan Tanjung Api-Api"),
    caption: tx(
      "Cross-team go-live monitoring and deployment command room at Tanjung Api-Api Harbor.",
      "Ruang koordinasi dan pemantauan deployment lintas tim saat go-live di Pelabuhan Tanjung Api-Api.",
    ),
  },
  {
    id: "sby-port-overview",
    src: "images/journey/sby-port-overview.jpg",
    width: 1280,
    height: 960,
    place: tx("Surabaya Harbor", "Pelabuhan Surabaya"),
    caption: tx(
      "Operational site readiness and port lane infrastructure at Surabaya Harbor.",
      "Kesiapan lokasi operasional dan infrastruktur lajur di Pelabuhan Surabaya.",
    ),
  },
  {
    id: "sby-omron-barrier-install",
    src: "images/journey/sby-omron-barrier-install.jpg",
    position: "center 30%",
    width: 1200,
    height: 1600,
    place: tx("Surabaya Harbor", "Pelabuhan Surabaya"),
    caption: tx(
      "Hardware installation and commissioning of Omron automated barrier gate units at Surabaya Harbor.",
      "Pemasangan dan pengujian perangkat keras barrier gate otomatis berbasis Omron di Pelabuhan Surabaya.",
    ),
  },
];

/* -------------------------------------------------------------------------- */
/*                          Business operations stack                         */
/* -------------------------------------------------------------------------- */

/**
 * Business Operations Stack tab on `/journey`: the four production domains of the PT
 * ASDP role, each a tilt card (2 × 2 on wide panels). `icon` is a key of the
 * icon map in `components/Icons.jsx`.
 */
export const stackDomains = [
  {
    id: "harbor-cloud",
    icon: "cloud",
    title: tx("Harbor & Cloud Deployment", "Deployment Pelabuhan & Cloud"),
    body: tx(
      "Local port servers, hybrid cloud backend services and multi-harbor rollout architecture.",
      "Server lokal pelabuhan, layanan backend hybrid cloud, dan arsitektur rollout ke banyak pelabuhan.",
    ),
    tags: [tx("Port Servers", "Server Pelabuhan"), "Hybrid Cloud", tx("Multi-Harbor Rollout", "Rollout Multi-Pelabuhan")],
  },
  {
    id: "gate-hardware",
    icon: "lock",
    title: tx("Industrial Gate Hardware", "Perangkat Keras Gate Industri"),
    body: tx(
      "Omron PLC and automated barrier gate systems, with port lane hardware integration in Surabaya.",
      "PLC Omron dan sistem barrier gate otomatis, beserta integrasi perangkat keras lajur pelabuhan di Surabaya.",
    ),
    tags: ["Omron PLC", "Barrier Gate", tx("Surabaya Harbor", "Pelabuhan Surabaya")],
  },
  {
    id: "ticketing-pos",
    icon: "tag",
    title: tx("Ticketing & POS Production", "Produksi Tiket & POS"),
    body: tx(
      "The trip.ferizy.com transaction pipeline, harbor counter applications and high-availability operations.",
      "Alur transaksi trip.ferizy.com, aplikasi loket pelabuhan, dan operasional ketersediaan tinggi.",
    ),
    tags: ["trip.ferizy.com", tx("Counter Apps", "Aplikasi Loket"), tx("High Availability", "Ketersediaan Tinggi")],
  },
  {
    id: "system-network",
    icon: "terminal",
    title: tx("System & Network Operations", "Operasional Sistem & Jaringan"),
    body: tx(
      "Service health diagnostics, incident triage, network troubleshooting and release rollout verification.",
      "Diagnosis kesehatan layanan, triase insiden, troubleshooting jaringan, dan verifikasi rollout rilis.",
    ),
    tags: [tx("Health Checks", "Cek Kesehatan"), tx("Incident Triage", "Triase Insiden"), tx("Release Verification", "Verifikasi Rilis")],
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
  { id: "ios-loader", name: tx("32-Bit iOS Loader", "Loader iOS 32-Bit"), handle: IOS_LOADER_REPO, icon: "tablet", url: links.iosLoaderRepo },
  { id: "mac-loader", name: tx("32-Bit Mac Loader", "Loader Mac 32-Bit"), handle: MAC_LOADER_REPO, icon: "laptop", url: links.macLoaderRepo },
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
      { label: tx("32-bit iOS loader case study", "Studi kasus loader iOS 32-bit"), to: routes.iosLoader },
      { label: tx("32-bit Mac loader case study", "Studi kasus loader Mac 32-bit"), to: routes.macLoader },
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
  {
    slug: "windows-system-guardrails",
    icon: "shield",
    published: "2026-11-27",
    kicker: tx("Windows · Safety", "Windows · Keamanan"),
    title: tx(
      "Deterministic Safety Guardrails for Non-Destructive Windows Maintenance",
      "Pengaman Deterministik untuk Pemeliharaan Windows yang Non-Destruktif",
    ),
    summary: tx(
      "How Niskala Utilities decides what it may remove or repair: PathGuard and RegistryGuard checks that run twice, decisions bound to open handles, .reg snapshots before any registry change, and a closed list of Windows repair commands.",
      "Bagaimana Niskala Utilities menentukan apa yang boleh dihapus atau diperbaiki: pemeriksaan PathGuard dan RegistryGuard yang berjalan dua kali, keputusan yang terikat ke handle terbuka, snapshot .reg sebelum perubahan registry, dan daftar tertutup perintah perbaikan Windows.",
    ),
    tags: ["PathGuard", "RegistryGuard", tx(".reg snapshots", "Snapshot .reg"), "DISM / SFC"],
    related: [
      { label: tx("Niskala Utilities case study", "Studi kasus Niskala Utilities"), to: routes.niskala },
      { label: tx("All projects", "Semua proyek"), to: routes.projects },
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
                "A maintenance tool runs with administrator rights and acts on files, keys and services it did not create. A wrong decision costs a damaged Windows installation, not a failed test, so the question is less what the tool can remove than what it must refuse.",
                "Tool pemeliharaan berjalan dengan hak administrator dan bertindak atas file, key, dan layanan yang tidak dibuatnya. Keputusan yang salah berakibat instalasi Windows rusak, bukan sekadar tes yang gagal, sehingga pertanyaannya bukan apa yang bisa dihapus, melainkan apa yang harus ditolak.",
              ),
              tx(
                "Three situations shaped the design: a path that looks harmless as written but resolves somewhere protected, an object that changes between the scan and the removal, and registry views that merge or redirect hives. The rule set had to be deterministic: the same input always gets the same verdict, and every refusal names the rule behind it.",
                "Tiga situasi membentuk desainnya: path yang tampak aman saat ditulis tetapi mengarah ke lokasi terlindungi, objek yang berubah antara pemindaian dan penghapusan, serta tampilan registry yang menggabungkan atau mengalihkan hive. Aturannya harus deterministik: input yang sama selalu mendapat putusan yang sama, dan setiap penolakan menyebut aturan di baliknya.",
              ),
            ],
          },
          {
            type: "cards",
            items: [
              {
                icon: "layers",
                title: tx("Paths that resolve elsewhere", "Path yang mengarah ke tempat lain"),
                body: tx(
                  "Junctions, symbolic links, SUBST drives and 8.3 short names can point a safe-looking path into the Windows folder.",
                  "Junction, symbolic link, drive SUBST, dan nama pendek 8.3 bisa mengarahkan path yang tampak aman ke folder Windows.",
                ),
              },
              {
                icon: "terminal",
                title: tx("Time between check and use", "Jeda antara pemeriksaan dan penggunaan"),
                body: tx(
                  "A folder checked during the scan can be swapped for a junction before the removal starts.",
                  "Folder yang diperiksa saat pemindaian bisa ditukar dengan junction sebelum penghapusan dimulai.",
                ),
              },
              {
                icon: "database",
                title: tx("Merged registry views", "Tampilan registry gabungan"),
                body: tx(
                  "`HKCR` merges two hives and `WOW6432Node` redirects 32-bit keys, so the key a removal names is not always the key it changes.",
                  "`HKCR` menggabungkan dua hive dan `WOW6432Node` mengalihkan key 32-bit, sehingga key yang disebut sebuah penghapusan tidak selalu key yang diubahnya.",
                ),
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
                icon: "shield",
                title: tx("Two checks, two moments", "Dua pemeriksaan, dua waktu"),
                body: tx(
                  "Every removal passes a guard when the scanner proposes it and again right before the Guardian acts, so nothing is removed on the strength of an old answer.",
                  "Setiap penghapusan melewati pengaman saat scanner mengusulkannya dan lagi tepat sebelum Guardian bertindak, sehingga tidak ada yang dihapus berdasarkan jawaban lama.",
                ),
              },
              {
                icon: "code",
                title: tx("Lexical, then physical", "Leksikal, lalu fisik"),
                body: tx(
                  "`PathGuard` checks syntax, then the protection rules on the path as written, then resolves it through a handle (`CreateFileW` + `GetFinalPathNameByHandleW`) and applies the rules again to the physical path.",
                  "`PathGuard` memeriksa sintaks, lalu aturan proteksi pada path seperti yang ditulis, kemudian meresolusinya melalui handle (`CreateFileW` + `GetFinalPathNameByHandleW`) dan menerapkan aturan lagi pada path fisiknya.",
                ),
              },
              {
                icon: "layers",
                title: tx("Tree and Self rules", "Aturan Tree dan Self"),
                body: tx(
                  "`Tree` protects a location and everything below it; `Self` protects only the location itself, so its children may go. The deepest matching rule wins, and a path that contains a protected location is denied as well.",
                  "`Tree` melindungi sebuah lokasi beserta semua isinya; `Self` hanya melindungi lokasi itu sendiri, sehingga isinya boleh dihapus. Aturan terdalam yang cocok menang, dan path yang memuat lokasi terlindungi juga ditolak.",
                ),
              },
              {
                icon: "lock",
                title: tx("Registry rules", "Aturan registry"),
                body: tx(
                  "`RegistryGuard` treats all of `HKLM` as a tree with named rules for `SYSTEM`, `SAM`, `SECURITY`, `BCD00000000` and `HARDWARE`, folds `WOW6432Node` into the 32-bit view and refuses `HKCR`, because a removal must name the physical hive.",
                  "`RegistryGuard` memperlakukan seluruh `HKLM` sebagai tree dengan aturan bernama untuk `SYSTEM`, `SAM`, `SECURITY`, `BCD00000000`, dan `HARDWARE`, melipat `WOW6432Node` ke tampilan 32-bit, dan menolak `HKCR`, karena penghapusan harus menyebut hive fisiknya.",
                ),
              },
              {
                icon: "terminal",
                title: tx("Decisions bound to handles", "Keputusan terikat handle"),
                body: tx(
                  "The final check opens the object with `FILE_FLAG_OPEN_REPARSE_POINT` and decides on that handle; registry keys are opened with `REG_OPTION_OPEN_LINK`. A folder swapped for a junction after the check is removed as a link, and its target is never visited.",
                  "Pemeriksaan terakhir membuka objek dengan `FILE_FLAG_OPEN_REPARSE_POINT` dan memutuskan berdasarkan handle itu; key registry dibuka dengan `REG_OPTION_OPEN_LINK`. Folder yang ditukar dengan junction setelah pemeriksaan dihapus sebagai tautan, dan targetnya tidak pernah dikunjungi.",
                ),
              },
              {
                icon: "archive",
                title: tx("Snapshots before changes", "Snapshot sebelum perubahan"),
                body: tx(
                  "Each transaction records its intent, creates a restore point when elevated, and saves `registry.json.gz` (every value's type and bytes) and `registry.reg` (UTF-16, version 5.00) before anything is removed.",
                  "Setiap transaksi mencatat niatnya, membuat restore point saat elevated, lalu menyimpan `registry.json.gz` (tipe dan byte setiap value) dan `registry.reg` (UTF-16, versi 5.00) sebelum apa pun dihapus.",
                ),
              },
            ],
          },
          {
            type: "flow",
            caption: tx("One guarded removal", "Satu penghapusan yang dijaga"),
            steps: [
              {
                icon: "flag",
                title: tx("Intent", "Niat"),
                body: tx("Every item recorded as Pending in transaction.json", "Setiap item dicatat sebagai Pending di transaction.json"),
              },
              {
                icon: "shield",
                title: tx("Restore point", "Restore point"),
                body: tx("Created through WMI when elevated", "Dibuat melalui WMI saat elevated"),
              },
              {
                icon: "archive",
                title: tx("Backup", "Backup"),
                body: tx("Keys, values, firewall rules and task XML saved first", "Key, value, aturan firewall, dan XML task disimpan lebih dulu"),
              },
              {
                icon: "lock",
                title: tx("Check again", "Periksa ulang"),
                body: tx("Guard, owner and signature checks on the open handle", "Pemeriksaan pengaman, owner, dan tanda tangan pada handle terbuka"),
              },
              {
                icon: "terminal",
                title: tx("Remove", "Hapus"),
                body: tx("Through the handle; restore puts back what can come back", "Melalui handle; restore mengembalikan apa yang bisa kembali"),
              },
            ],
          },
          {
            type: "prose",
            paragraphs: [
              tx(
                "System repair follows the same idea from the other side. `RepairCommandId` is a closed enum: each value resolves to `Dism.exe`, `sfc.exe`, `netsh.exe`, `ipconfig.exe` or `chkdsk.exe` in the system directory with fixed arguments, from `/CheckHealth` and `/RestoreHealth` to `/StartComponentCleanup` without `/ResetBase` and `chkdsk /scan` without `/f`. No caller can build another command line.",
                "Perbaikan sistem mengikuti gagasan yang sama dari sisi lain. `RepairCommandId` adalah enum tertutup: setiap nilainya diresolusi ke `Dism.exe`, `sfc.exe`, `netsh.exe`, `ipconfig.exe`, atau `chkdsk.exe` di direktori sistem dengan argumen tetap, mulai dari `/CheckHealth` dan `/RestoreHealth` hingga `/StartComponentCleanup` tanpa `/ResetBase` dan `chkdsk /scan` tanpa `/f`. Tidak ada pemanggil yang bisa menyusun command line lain.",
              ),
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
                "A refusal names the rule, and the hive or folder, that blocked it",
                "Setiap penolakan menyebut aturan, serta hive atau folder, yang memblokirnya",
              ),
              tx(
                "Removals are journaled transactions; restore puts back what can come back without overwriting anything that exists now",
                "Penghapusan adalah transaksi berjurnal; restore mengembalikan apa yang bisa kembali tanpa menimpa apa pun yang ada sekarang",
              ),
              tx(
                "Repair is limited to Windows' own tools with fixed arguments, and every command requires elevation",
                "Perbaikan dibatasi pada tools bawaan Windows dengan argumen tetap, dan setiap perintah membutuhkan elevasi",
              ),
              tx(
                "SeBackupPrivilege and SeRestorePrivilege are held only for the removal loop (PrivilegeScope)",
                "SeBackupPrivilege dan SeRestorePrivilege hanya dipegang selama loop penghapusan (PrivilegeScope)",
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
    "Business Application Operations Support Staff at PT ASDP Indonesia Ferry (Persero), 2024–2026: counter application and backend deployments to harbor servers and the cloud across dozens of ports, Omron barrier gate integration at Surabaya port, and production support for trip.ferizy.com. Independently builds Windows system utilities (Niskala Utilities) and native PC ports of 32-bit legacy software by static binary recompilation.",
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
