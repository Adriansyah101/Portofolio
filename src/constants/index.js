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
export const siteUrl = "https://adriansyah101.github.io/Portofolio/";

/** GitHub account that owns every repository linked from the site. */
export const githubUser = env.VITE_GITHUB_USERNAME?.trim() || "adriansyah101";

const GITHUB = `https://github.com/${githubUser}`;
const GT_RACING_REPO = "GTRacingMotorAcademyRecomp";
/** Exact Gangstar repo name. Without it, links open the GitHub profile. */
const GANGSTAR_REPO = env.VITE_GANGSTAR_REPO?.trim() || null;
const TWITTER_HANDLE = env.VITE_TWITTER_HANDLE?.trim().replace(/^@/, "") || null;

export const links = {
  githubProfile: GITHUB,
  sidafRepo: `${GITHUB}/sidaf`,
  vrAirportRepo: `${GITHUB}/VR-Simulation-Airport`,
  warPlaneRepo: `${GITHUB}/War-Plane-1945`,
  warPlanePlay: "https://gx.games/games/t2k4q0/war-plane-1945/tracks/b60326ee-2d4f-4321-91a8-59299f6f4831",
  gtRacingRepo: `${GITHUB}/${GT_RACING_REPO}`,
  gtRacingReleases: `${GITHUB}/${GT_RACING_REPO}/releases`,
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
    greeting: tx("Hi! Welcome to my engineering workspace 👋", "Halo! Selamat datang di ruang kerja saya 👋"),
    waveBack: tx("Wave Back", "Sapa Balik"),
    presetsLabel: tx("Camera view", "Sudut kamera"),
    presets: {
      overview: tx("Overview", "Ringkasan"),
      desk: tx("Developer & Desk", "Meja Kerja"),
      telemetry: tx("System Telemetry", "Telemetri Sistem"),
    },
    openProjects: tx("Open Projects →", "Buka Proyek →"),
    openJourney: tx("View Work Experience →", "Lihat Pengalaman Kerja →"),
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
    contactNote: tx("Contact me through the form at", "Hubungi saya melalui formulir di"),
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
    eyebrow: tx("Engineering Notes", "Catatan Teknis"),
    title: tx("Notes from production and from preservation work", "Catatan dari operasional produksi dan pekerjaan preservasi"),
    description: tx(
      "Short technical write-ups on the problems behind the projects: translating legacy mobile graphics pipelines to the desktop, and keeping a hybrid harbor-and-cloud ticketing system steady.",
      "Tulisan teknis singkat tentang masalah di balik proyek-proyek saya: menerjemahkan pipeline grafis mobile lama ke desktop, dan menjaga sistem tiket hybrid pelabuhan-dan-cloud tetap stabil.",
    ),
    read: tx("Read note", "Baca catatan"),
    minutes: tx("{n} min read", "{n} menit baca"),
    published: tx("Published", "Diterbitkan"),
    allNotes: tx("All notes", "Semua catatan"),
    backTo: tx("Back to", "Kembali ke"),
    nextNote: tx("Next note", "Catatan berikutnya"),
    related: tx("Related work", "Karya terkait"),
    teaserTitle: tx("Engineering Notes", "Catatan Teknis"),
    teaserSub: tx("Technical deep-dives", "Pembahasan teknis mendalam"),
    teaserAll: tx("All engineering notes", "Semua catatan teknis"),
  },
  featured: {
    title: tx("Featured Work", "Karya Unggulan"),
    sub: tx("Operations & Systems Engineering", "Operasional & Rekayasa Sistem"),
    topologyLabel: tx("Systems operated", "Sistem yang dioperasikan"),
  },
  logos: {
    label: tx("Core technologies", "Teknologi inti"),
  },
  capabilities: {
    title: tx("Core Capabilities", "Kapabilitas Inti"),
    sub: tx("Operations · Field Systems · Low-Level Code", "Operasional · Sistem Lapangan · Kode Tingkat Rendah"),
  },
  contactPreview: {
    eyebrow: tx("Contact", "Kontak"),
    title: tx("Need critical systems that stay online?", "Butuh sistem kritis yang tetap online?"),
    body: tx(
      "I'm open to systems operations, infrastructure and application support roles, plus low-level C/C++ engineering work. Send a message, or browse my source code on GitHub.",
      "Saya terbuka untuk peran operasional sistem, infrastruktur, dan dukungan aplikasi, serta pekerjaan engineering C/C++ tingkat rendah. Kirim pesan, atau jelajahi source code saya di GitHub.",
    ),
    cta: tx("Get in Touch", "Hubungi Saya"),
    github: tx("View GitHub", "Lihat GitHub"),
  },
  journey: {
    contactCta: tx("Get in Touch", "Hubungi Saya"),
    pageTitle: tx("Work Experience", "Pengalaman Kerja"),
    eyebrow: tx("Career & Work Experience", "Karier & Pengalaman Kerja"),
    title: tx(
      "Keeping national ferry ticketing running in production",
      "Menjaga tiket kapal penyeberangan nasional tetap berjalan di produksi",
    ),
    description: tx(
      "Enterprise application operations at PT ASDP Indonesia Ferry (Persero): hybrid cloud and harbor server deployments across dozens of ports, Omron barrier gate integration, and the day-to-day reliability of trip.ferizy.com.",
      "Operasional aplikasi enterprise di PT ASDP Indonesia Ferry (Persero): deployment hybrid cloud dan server pelabuhan di puluhan pelabuhan, integrasi barrier gate Omron, serta keandalan harian trip.ferizy.com.",
    ),
    jumps: [
      { id: "experience", label: tx("Experience", "Pengalaman") },
      { id: "skills", label: tx("Tech Stack", "Tech Stack") },
      { id: "highlights", label: tx("Impact", "Dampak") },
    ],
  },
  experience: {
    title: tx("Professional Experience", "Pengalaman Profesional"),
    sub: tx("Enterprise Application Operations", "Operasional Aplikasi Enterprise"),
    responsibilities: tx("Key Responsibilities & Achievements", "Tanggung Jawab & Pencapaian Utama"),
    highlights: tx("Highlights", "Sorotan"),
    stackTargets: tx("Stack & Targets", "Stack & Target"),
    productionSystems: tx("Production systems", "Sistem produksi"),
  },
  techStack: {
    title: tx("Enterprise & Systems Tech Stack", "Tech Stack Enterprise & Sistem"),
    sub: tx("Tools I Run in Production", "Tools yang Saya Jalankan di Produksi"),
  },
  highlights: {
    title: tx("Operational Impact Highlights", "Sorotan Dampak Operasional"),
    sub: tx("Production Outcomes", "Hasil di Produksi"),
  },
  projects: {
    pageTitle: tx("Projects", "Proyek"),
    eyebrow: tx("Projects · Original & 32-Bit Preservation", "Proyek · Original & Preservasi 32-Bit"),
    title: tx("Original builds and preserved 32-bit software", "Karya original dan perangkat lunak 32-bit yang dipreservasi"),
    description: tx(
      "Three original projects built from scratch, alongside two 32-bit games that modern iOS and macOS can no longer run, rebuilt as native ports. Filter by category, compare each legacy target with its port, and open the case studies for the full technical breakdown.",
      "Tiga proyek original yang dibangun dari nol, bersama dua game 32-bit yang tak lagi bisa dijalankan iOS dan macOS modern, dibangun ulang sebagai port native. Filter berdasarkan kategori, bandingkan target lama dengan port-nya, dan buka studi kasus untuk rincian teknis lengkapnya.",
    ),
    catalogTitle: tx("Project catalog", "Katalog proyek"),
    filterLabel: tx("Filter projects by category", "Filter proyek berdasarkan kategori"),
    showing: tx("Showing {n} of {total} projects", "Menampilkan {n} dari {total} proyek"),
    compareEyebrow: tx("Architecture comparison", "Perbandingan arsitektur"),
    compareTitle: tx(
      "Legacy 32-Bit iPad/Mac vs. Native Windows/Linux Port",
      "iPad/Mac 32-Bit Lama vs. Port Native Windows/Linux",
    ),
    compareDescription: tx(
      "What each game was built for, and what it runs on now.",
      "Untuk apa setiap game dibuat, dan di mana game itu berjalan sekarang.",
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
    eyebrow: tx("Contact", "Kontak"),
    title: tx("Let's talk about systems that need to stay up", "Mari bicara tentang sistem yang harus tetap berjalan"),
    description: tx(
      "Systems operations, infrastructure and application support roles, or a C/C++ and low-level porting question: send a message, or find my source code and releases on GitHub.",
      "Peran operasional sistem, infrastruktur, dan dukungan aplikasi, atau pertanyaan seputar C/C++ dan porting tingkat rendah: kirim pesan, atau temukan source code dan rilis saya di GitHub.",
    ),
    communityTitle: tx("Source code & releases on GitHub", "Source code & rilis di GitHub"),
    sectionTitle: tx("Get in Touch – Let's Connect", "Hubungi Saya – Mari Terhubung"),
    sectionSub: tx("Have a systems or engineering role in mind?", "Punya peran sistem atau engineering yang cocok?"),
    form: {
      nameLabel: tx("Your name", "Nama Anda"),
      namePlaceholder: tx("What's your good name?", "Siapa nama Anda?"),
      emailLabel: tx("Your email", "Email Anda"),
      emailPlaceholder: tx("What's your email address?", "Apa alamat email Anda?"),
      messageLabel: tx("Your message", "Pesan Anda"),
      messagePlaceholder: tx("Tell me about the role, system or project...", "Ceritakan tentang peran, sistem, atau proyeknya..."),
      send: tx("Send Message", "Kirim Pesan"),
      sending: tx("Sending...", "Mengirim..."),
    },
    status: {
      missingName: tx("Please enter your name.", "Mohon isi nama Anda."),
      invalidEmail: tx("Please enter a valid email address.", "Mohon masukkan alamat email yang valid."),
      missingMessage: tx("Please write a short message.", "Mohon tulis pesan singkat."),
      notConfigured: tx(
        "The contact form isn't configured yet. Please reach out via GitHub in the meantime.",
        "Formulir kontak belum dikonfigurasi. Untuk sementara, silakan hubungi saya melalui GitHub.",
      ),
      success: tx(
        "Thanks! Your message is on its way — I'll get back to you soon.",
        "Terima kasih! Pesan Anda sedang dikirim — saya akan segera membalasnya.",
      ),
      error: tx(
        "Something went wrong while sending. Please try again in a moment.",
        "Terjadi kesalahan saat mengirim. Silakan coba lagi sebentar lagi.",
      ),
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

/** Rotating focus areas under the hero headline (`id` keeps React keys stable across languages). */
export const words = [
  { id: "cloud", text: "Cloud & Edge", icon: "cloud" },
  { id: "ops", text: tx("System Ops", "Operasi Sistem"), icon: "server" },
  { id: "native", text: "C/C++ & Win32", icon: "code" },
  { id: "infra", text: tx("Infrastructure", "Infrastruktur"), icon: "layers" },
];

export const heroContent = {
  eyebrow: tx("Systems & Application Operations Engineer", "Engineer Sistem & Operasional Aplikasi"),
  headline: tx(
    "Engineering Reliable Production Systems & Native Software Architecture",
    "Merekayasa Sistem Produksi yang Andal & Arsitektur Perangkat Lunak Native",
  ),
  focusLabel: tx("Focused on", "Berfokus pada"),
  bio: tx(
    "Hi, I'm Adriansyah Prasetya Nugraha — a Systems & Application Operations Engineer based in Semarang, Indonesia, experienced in high-availability national ticketing infrastructure (`trip.ferizy.com`), hybrid cloud/on-premise port deployments, industrial hardware integration, and low-level binary recompilation.",
    "Halo, saya Adriansyah Prasetya Nugraha — Engineer Sistem & Operasional Aplikasi asal Semarang, Indonesia, berpengalaman menangani infrastruktur tiket nasional berketersediaan tinggi (`trip.ferizy.com`), deployment hybrid cloud/on-premise di pelabuhan, integrasi perangkat keras industri, serta rekompilasi biner tingkat rendah.",
  ),
  ctaText: tx("View My Work", "Lihat Karya Saya"),
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

/** `text` shows a fixed word instead of an animated number; `note` is a small line under the label. */
export const counterItems = [
  {
    id: "years",
    text: "2024 – 2026", // non-breaking spaces keep the range on one line
    label: tx("Enterprise Operations Experience", "Pengalaman Operasional Enterprise"),
    note: "PT ASDP Indonesia Ferry (Persero)",
  },
  {
    id: "ports",
    text: tx("Dozens", "Puluhan"),
    label: tx("Harbor & Cloud Deployments", "Deployment Pelabuhan & Cloud"),
  },
  {
    id: "projects",
    value: 5,
    suffix: "",
    label: tx("Total GitHub Projects", "Total Proyek GitHub"),
    note: tx("3 original · 2 preservation ports", "3 original · 2 port preservasi"),
  },
  {
    id: "platforms",
    text: "Windows & Linux",
    label: tx("Supported Desktop Platforms", "Platform Desktop yang Didukung"),
    note: tx("Native preservation port targets", "Target native port preservasi"),
  },
];

/* -------------------------------------------------------------------------- */
/*                            Featured work (Home)                            */
/* -------------------------------------------------------------------------- */

/**
 * The two cards in the Home "Featured Work" section. The projects card is
 * framed as systems engineering; titles and artwork live on `/projects`.
 */
export const featuredWork = {
  enterprise: {
    logo: "asdp",
    kind: tx("Enterprise Application Operations", "Operasional Aplikasi Enterprise"),
    org: "PT ASDP Indonesia Ferry (Persero)",
    role: tx("Business Application Operational Support Staff", "Staf Dukungan Operasional Aplikasi Bisnis"),
    period: "2024 – 2026",
    summary: tx(
      "Managed mission-critical ferry ticketing infrastructure (`trip.ferizy.com`), hybrid cloud/on-premise port deployments across dozens of harbors, and industrial Omron barrier gate hardware integration.",
      "Mengelola infrastruktur tiket kapal penyeberangan yang kritis (`trip.ferizy.com`), deployment hybrid cloud/on-premise di puluhan pelabuhan, serta integrasi perangkat keras barrier gate industri Omron.",
    ),
    topology: [
      {
        icon: "cloud",
        title: tx("Cloud ticketing", "Tiket berbasis cloud"),
        body: tx("`trip.ferizy.com` online sales, kept highly available", "Penjualan online `trip.ferizy.com`, dijaga tetap berketersediaan tinggi"),
      },
      {
        icon: "server",
        title: tx("Harbor servers", "Server pelabuhan"),
        body: tx("Ticketing and counter apps on-prem at dozens of ports", "Aplikasi tiket dan loket on-prem di puluhan pelabuhan"),
      },
      {
        icon: "lock",
        title: tx("Barrier gates", "Barrier gate"),
        body: tx("Omron-based automated gates at the Surabaya port", "Gate otomatis berbasis Omron di Pelabuhan Surabaya"),
      },
    ],
    stats: [
      { id: "years", value: "2024 – 2026", label: tx("Production operations", "Operasional produksi") },
      { id: "ports", value: tx("Dozens", "Puluhan"), label: tx("Ferry ports deployed", "Pelabuhan ter-deploy") },
      { id: "hybrid", value: "Hybrid", label: tx("Cloud & on-premise", "Cloud & on-premise") },
    ],
    tags: ["Hybrid Cloud", tx("Linux & Windows Servers", "Server Linux & Windows"), "Omron PLC", "Production Support"],
    cta: { label: tx("View Work Experience", "Lihat Pengalaman Kerja"), to: routes.journey },
    link: { label: "trip.ferizy.com", href: links.ferizy, brand: "ferizy" },
  },
  projects: {
    icon: "chip",
    kind: tx("Engineering · Open Source", "Rekayasa · Open Source"),
    org: tx("Engineering & Preservation Projects", "Proyek Rekayasa & Preservasi"),
    summary: tx(
      "Five open-source projects: three original builds spanning a web information system, a VR simulation and real-time interactive software, plus two legacy 32-bit applications rebuilt as native Windows and Linux executables through static recompilation instead of emulation.",
      "Lima proyek open source: tiga karya original yang mencakup sistem informasi web, simulasi VR, dan perangkat lunak interaktif real-time, serta dua aplikasi 32-bit lama yang dibangun ulang menjadi executable Windows dan Linux native melalui rekompilasi statis, bukan emulasi.",
    ),
    stats: [
      { id: "original", value: "3", label: tx("Original projects", "Proyek original") },
      { id: "preservation", value: "2", label: tx("32-bit preservation ports", "Port preservasi 32-bit") },
    ],
    pipelineLabel: tx("Preservation pipeline", "Pipeline preservasi"),
    pipeline: [
      {
        icon: "chip",
        title: tx("32-bit ARMv7 / x86 binaries", "Biner ARMv7 / x86 32-bit"),
        body: tx("Original iPad and Mac executables", "Executable iPad dan Mac asli"),
      },
      {
        icon: "terminal",
        title: tx("Static recompilation", "Rekompilasi statis"),
        body: tx("Functions and control flow lifted to C/C++", "Fungsi dan control flow di-lift ke C/C++"),
      },
      {
        icon: "shader",
        title: tx("OpenGL ES translation", "Translasi OpenGL ES"),
        body: tx("Legacy GL ES 1.1/2.0 served on desktop GPUs", "GL ES 1.1/2.0 lama dijalankan di GPU desktop"),
      },
      {
        icon: "monitor",
        title: tx("Native Windows & Linux", "Windows & Linux native"),
        body: tx("SHA-256 verified, versioned releases", "Rilis berversi, terverifikasi SHA-256"),
      },
    ],
    tags: ["PHP & CodeIgniter", "Unity VR", "GameMaker", tx("Static Recompilation", "Rekompilasi Statis"), "OpenGL ES", "Win32 / Linux"],
    cta: { label: tx("Browse All Projects", "Lihat Semua Proyek"), to: routes.projects },
  },
};

/* -------------------------------------------------------------------------- */
/*                                  Projects                                  */
/* -------------------------------------------------------------------------- */

/** Tabs on `/projects`; `?category=<id>` in the URL selects one. */
export const projectCategories = [
  { id: "all", label: tx("All", "Semua") },
  { id: "original", label: tx("Original Projects", "Proyek Original") },
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
    title: tx("Original Projects", "Proyek Original"),
    badge: { label: tx("Original", "Original"), icon: "code" },
    description: tx(
      "Applications, 3D/VR simulations, and games engineered from scratch.",
      "Aplikasi web, simulasi 3D/VR, dan game yang dirancang serta dibangun dari nol.",
    ),
  },
  preservation: {
    index: "02",
    title: tx("32-Bit Game Preservation", "Preservasi Game 32-Bit"),
    badge: { label: tx("32-Bit Preservation", "Preservasi 32-Bit"), icon: "archive" },
    description: tx(
      "Static binary recompilation and graphics pipeline modernization rescuing unplayable 32-bit iPad and Mac classics for modern Windows and Linux systems.",
      "Rekompilasi biner statis dan modernisasi pipeline grafis untuk menyelamatkan game klasik iPad dan Mac 32-bit agar dapat berjalan secara native di Windows dan Linux modern.",
    ),
  },
};

const ORIGINAL_BADGE = tx("Original Project", "Proyek Original");
const VIEW_SOURCE = tx("View Source on GitHub", "Lihat Source di GitHub");
const GITHUB_REPOSITORY = tx("GitHub Repository", "Repositori GitHub");

/**
 * Category A: original work. `art` selects the built-in SVG preview; set
 * `image` to a 16:9 screenshot path inside `/public` to show a real capture
 * (for example `public/images/sidaf.png` → `image: "images/sidaf.png"`).
 * Tags come from each repository's actual languages and engine files.
 */
export const originalProjects = [
  {
    id: "sidaf",
    category: "original",
    caseStudy: null,
    shortTitle: "SIDAF",
    subtitle: tx("Information System / Web Application", "Sistem Informasi / Aplikasi Web"),
    platform: ORIGINAL_BADGE,
    platformIcon: "code",
    categoryLabel: tx("Information System", "Sistem Informasi"),
    description: tx(
      "Original full-stack web information system built to streamline structured data management, operational workflows, and administrative reporting.",
      "Sistem informasi web full-stack original yang dibangun untuk menyederhanakan pengelolaan data terstruktur, alur kerja operasional, dan pelaporan administratif.",
    ),
    tags: ["PHP", "CodeIgniter", "JavaScript", "HTML & CSS"],
    art: "sidaf",
    image: null, // e.g. "images/sidaf.png" (16:9)
    links: [{ label: VIEW_SOURCE, href: links.sidafRepo, icon: "github", arrow: true }],
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
      "Interactive virtual reality airport environment simulation featuring spatial 3D navigation, terminal/airside modeling, and real-time environmental interaction.",
      "Simulasi lingkungan bandara berbasis virtual reality interaktif dengan navigasi spasial 3D, pemodelan area terminal/sisi udara, serta interaksi lingkungan real-time.",
    ),
    tags: ["Unity", "C#", "Oculus Quest 2", "PCVR"],
    art: "airport",
    image: "images/vr-airport.jpg", // thumbnail of the demo video below
    video: { youtubeId: "oLm0qSSHeiM", title: "Demo Aplikasi Simulasi Prosedur Bandara Menggunakan Virtual Reality", kind: "demo" },
    links: [{ label: VIEW_SOURCE, href: links.vrAirportRepo, icon: "github", arrow: true }],
    comparison: null,
  },
  {
    id: "war-plane-1945",
    category: "original",
    caseStudy: null,
    shortTitle: "War Plane 1945",
    subtitle: tx("Arcade Air Combat Game", "Game Arcade Pertempuran Udara"),
    platform: ORIGINAL_BADGE,
    platformIcon: "gamepad",
    categoryLabel: tx("Game Development", "Pengembangan Game"),
    description: tx(
      "Original 1945-inspired aerial combat arcade game built from scratch with custom flight controls, projectile mechanics, enemy wave logic, and collision systems.",
      "Game arcade pertempuran udara bergaya 1945 yang dibuat dari awal dengan kontrol penerbangan kustom, mekanika proyektil, logika gelombang musuh, dan sistem deteksi tabrakan.",
    ),
    tags: ["GameMaker", "GML", "2D", "Windows"],
    art: "warplane",
    image: "images/war-plane-1945.jpg", // thumbnail of the gameplay video below
    video: { youtubeId: "LXDtVyzX5zQ", title: "War Plane 1945 - Gameplay" },
    links: [
      { label: tx("Play on GX.games", "Mainkan di GX.games"), href: links.warPlanePlay, icon: "gamepad", arrow: true },
      { label: VIEW_SOURCE, href: links.warPlaneRepo, icon: "github" },
    ],
    comparison: null,
  },
];

/**
 * Category B: 32-bit game preservation. `comparison` feeds the "Legacy 32-Bit
 * iPad/Mac vs. Native Windows/Linux Port" table.
 */
export const preservationProjects = [
  {
    id: "gt-racing",
    category: "preservation",
    caseStudy: routes.gtRacing,
    title: tx(
      "GTRacingMotorAcademyRecomp: 32-Bit iPad Racer, Preserved Natively on Windows",
      "GTRacingMotorAcademyRecomp: Game Balap iPad 32-Bit, Dipreservasi Native di Windows",
    ),
    shortTitle: "GT Racing: Motor Academy",
    subtitle: "GTRacingMotorAcademyRecomp",
    platform: "32-Bit iPad",
    platformIcon: "tablet",
    origin: "32-bit iPad · ARMv7 / PowerVR",
    target: tx("Native Windows · v1.0.0", "Windows native · v1.0.0"),
    description: tx(
      "Gameloft's flagship simulation racer stopped launching when iOS 11 dropped 32-bit apps. This static recompilation preserves it as a native Windows executable (`v1.0.0`), without emulation. It adds custom OpenGL ES shaders with instant-apply PostFX and motion blur, PVRTC texture decoding, full keyboard and gamepad remapping, and a restored Cloudflare Workers + D1 leaderboard (`gt-redbull-board`).",
      "Game balap simulasi andalan Gameloft berhenti bisa dijalankan saat iOS 11 menghentikan aplikasi 32-bit. Rekompilasi statis ini mempreservasinya sebagai executable Windows native (`v1.0.0`) tanpa emulasi, lengkap dengan shader OpenGL ES kustom dengan PostFX dan motion blur yang langsung berlaku, dekode tekstur PVRTC, remapping keyboard dan gamepad penuh, serta leaderboard Cloudflare Workers + D1 yang dipulihkan (`gt-redbull-board`).",
    ),
    tags: [tx("Static Recompilation", "Rekompilasi Statis"), "ARMv7", "OpenGL ES", "PVRTC", "Cloudflare D1"],
    art: "racing",
    image: "images/gtracing-pc.jpg", // thumbnail of the "GT Racing Motor Academy PC Port - Ferrari 288 GTO Gameplay" video
    imagePosition: "left center", // keeps the title text whole when the 16:9 thumbnail is cropped to 8:5
    video: { youtubeId: "cn-nsNnlO7E", title: "GT Racing Motor Academy PC Port - Ferrari 288 GTO Gameplay" }, // click-to-play on the card & case study
    links: [
      { label: GITHUB_REPOSITORY, href: links.gtRacingRepo, icon: "github" },
      { label: tx("Release Notes", "Catatan Rilis"), href: links.gtRacingReleases, icon: "tag" },
    ],
    comparison: [
      { id: "platform", aspect: "Platform", original: "32-bit iPad / iOS", modern: tx("Native Windows PC executable", "Executable PC Windows native") },
      {
        id: "cpu",
        aspect: tx("CPU code", "Kode CPU"),
        original: tx("32-bit ARMv7 machine code", "Kode mesin ARMv7 32-bit"),
        modern: tx("Statically recompiled native desktop code", "Kode desktop native hasil rekompilasi statis"),
      },
      {
        id: "graphics",
        aspect: tx("Graphics", "Grafis"),
        original: tx("OpenGL ES 1.1/2.0 on PowerVR GPUs", "OpenGL ES 1.1/2.0 di GPU PowerVR"),
        modern: tx("Desktop OpenGL / ANGLE with custom shaders & PostFX", "OpenGL desktop / ANGLE dengan shader kustom & PostFX"),
      },
      {
        id: "textures",
        aspect: tx("Textures", "Tekstur"),
        original: tx("PVRTC (PowerVR-only compression)", "PVRTC (kompresi khusus PowerVR)"),
        modern: tx("Decoded for any desktop GPU", "Didekode untuk GPU desktop apa pun"),
      },
      {
        id: "controls",
        aspect: tx("Controls", "Kontrol"),
        original: tx("Touchscreen & tilt", "Layar sentuh & kemiringan"),
        modern: tx("Fully remappable keyboard & gamepad", "Keyboard & gamepad yang bisa diatur ulang sepenuhnya"),
      },
      {
        id: "online",
        aspect: "Online",
        original: tx("Legacy servers, now offline", "Server lama, kini offline"),
        modern: tx("Cloudflare Workers + D1 leaderboard", "Leaderboard Cloudflare Workers + D1"),
      },
      {
        id: "status",
        aspect: "Status",
        original: tx("Won't launch on iOS 11+", "Tidak bisa berjalan di iOS 11+"),
        modern: tx("Playable today · v1.0.0", "Bisa dimainkan hari ini · v1.0.0"),
      },
    ],
  },
  {
    id: "gangstar",
    category: "preservation",
    caseStudy: routes.gangstar,
    title: tx(
      "Gangstar: Miami Vindication: 32-Bit Mac Classic, Ported to Windows & Linux",
      "Gangstar: Miami Vindication: Game Klasik Mac 32-Bit, Di-port ke Windows & Linux",
    ),
    shortTitle: "Gangstar: Miami Vindication",
    subtitle: tx("Windows & Linux PC Port", "Port PC Windows & Linux"),
    platform: "32-Bit Mac",
    platformIcon: "laptop",
    origin: tx("32-bit Mac · x86 OS X binary", "Mac 32-bit · biner x86 OS X"),
    target: "Windows x86 & Linux · V1.0.0",
    description: tx(
      "The desktop edition of Gameloft's open-world action classic, unplayable on 64-bit-only macOS since Catalina. Binary analysis and cross-platform porting bring it natively to Windows x86 and Linux (`V1.0.0`), with a modernized OpenGL ES pipeline and SHA-256 verified, telemetry-free archives.",
      "Edisi desktop dari game aksi open-world klasik Gameloft yang tidak bisa dimainkan di macOS khusus 64-bit sejak Catalina. Analisis biner dan porting lintas platform membawanya secara native ke Windows x86 dan Linux (`V1.0.0`), dengan pipeline OpenGL ES yang dimodernisasi serta arsip bebas telemetri yang terverifikasi SHA-256.",
    ),
    tags: [tx("Binary Analysis", "Analisis Biner"), "x86", "Windows", "Linux", "SHA-256"],
    art: "miami",
    image: null, // drop a 16:9 capture at public/images/gangstar-mv-pc.png, then set "images/gangstar-mv-pc.png"
    links: [
      { label: GITHUB_REPOSITORY, href: links.gangstarRepo, icon: "github" },
      links.gangstarReleases && { label: tx("Releases", "Rilis"), href: links.gangstarReleases, icon: "tag" },
    ].filter(Boolean),
    comparison: [
      { id: "platform", aspect: "Platform", original: "32-bit Mac (OS X)", modern: "Windows x86 & Linux" },
      {
        id: "binary",
        aspect: tx("Binary", "Biner"),
        original: tx("Legacy 32-bit x86 Mach-O app", "Aplikasi Mach-O x86 32-bit lama"),
        modern: tx("Native Windows & Linux builds", "Build Windows & Linux native"),
      },
      {
        id: "graphics",
        aspect: tx("Graphics", "Grafis"),
        original: tx("Legacy mobile-derived GL renderer", "Renderer GL lama turunan versi mobile"),
        modern: tx("Modernized OpenGL ES: MSAA depth resolves, VBO caching", "OpenGL ES termodernisasi: depth resolve MSAA, VBO caching"),
      },
      {
        id: "controls",
        aspect: tx("Controls", "Kontrol"),
        original: tx("Original Mac input handling", "Penanganan input Mac asli"),
        modern: tx("Adapted desktop input controls", "Kontrol input desktop yang disesuaikan"),
      },
      {
        id: "distribution",
        aspect: tx("Distribution", "Distribusi"),
        original: tx("32-bit only app bundle", "App bundle khusus 32-bit"),
        modern: tx("SHA-256 verified .zip & tarball", ".zip & tarball terverifikasi SHA-256"),
      },
      {
        id: "status",
        aspect: "Status",
        original: tx("Blocked on macOS Catalina 10.15+", "Diblokir di macOS Catalina 10.15+"),
        modern: tx("Playable today · V1.0.0", "Bisa dimainkan hari ini · V1.0.0"),
      },
    ],
  },
];

/** Every project, originals first (5 in total: 3 original + 2 preservation). */
export const projects = [...originalProjects, ...preservationProjects];

/* -------------------------------------------------------------------------- */
/*                                Case studies                                */
/* -------------------------------------------------------------------------- */

const BROWSE_SOURCE = tx("Browse the source on GitHub", "Jelajahi source di GitHub");

/**
 * Data for the two deep-dive pages. Each section renders a list of typed
 * blocks: `prose`, `cards`, `timeline`, `flow`, `architecture`, `table`,
 * `checklist`, `code` and `links`.
 */
export const caseStudies = {
  "gt-racing": {
    projectId: "gt-racing",
    eyebrow: tx("Case Study · 32-Bit iPad Preservation", "Studi Kasus · Preservasi iPad 32-Bit"),
    title: "GT Racing: Motor Academy",
    repoName: "GTRacingMotorAcademyRecomp",
    summary: tx(
      "How a 32-bit iPad simulation racer that modern iOS can no longer launch was statically recompiled into a native Windows release, with its graphics modernized and its online leaderboard rebuilt from scratch.",
      "Bagaimana game balap simulasi iPad 32-bit yang tak lagi bisa dijalankan iOS modern direkompilasi secara statis menjadi rilis Windows native, dengan grafis yang dimodernisasi dan leaderboard online yang dibangun ulang dari nol.",
    ),
    art: "racing",
    image: "images/gtracing-pc.jpg",
    facts: [
      { id: "platform", label: tx("Original platform", "Platform asli"), value: "32-bit iPad · iOS" },
      { id: "era", label: tx("Hardware era", "Era perangkat keras"), value: "ARMv7 · PowerVR" },
      { id: "lost", label: tx("Lost with", "Hilang sejak"), value: "iOS 11 (2017)" },
      { id: "preserved", label: tx("Preserved as", "Dipreservasi sebagai"), value: tx("Native Windows · v1.0.0", "Windows native · v1.0.0") },
    ],
    links: [
      { label: GITHUB_REPOSITORY, href: links.gtRacingRepo, icon: "github" },
      { label: tx("v1.0.0 Release Notes", "Catatan Rilis v1.0.0"), href: links.gtRacingReleases, icon: "tag" },
    ],
    sections: [
      {
        id: "why-lost",
        title: tx("Why It Was Lost", "Mengapa Game Ini Hilang"),
        intro: tx(
          "GT Racing: Motor Academy shipped as a 32-bit ARMv7 binary tuned for early iPad hardware and PowerVR GPUs. When Apple went 64-bit only, the game didn't degrade. It stopped launching.",
          "GT Racing: Motor Academy dirilis sebagai biner ARMv7 32-bit yang dioptimalkan untuk iPad generasi awal dan GPU PowerVR. Ketika Apple beralih sepenuhnya ke 64-bit, kualitas game ini tidak sekadar menurun — game ini berhenti bisa dijalankan.",
        ),
        blocks: [
          {
            type: "timeline",
            items: [
              {
                when: tx("PowerVR era", "Era PowerVR"),
                title: tx("Built for 32-bit iPad", "Dibuat untuk iPad 32-bit"),
                body: tx(
                  "Compiled for ARMv7 with PVRTC-compressed assets and an OpenGL ES 1.1/2.0 renderer.",
                  "Dikompilasi untuk ARMv7 dengan aset terkompresi PVRTC dan renderer OpenGL ES 1.1/2.0.",
                ),
              },
              {
                when: "iOS 10.3 · 2017",
                title: tx("32-bit warnings appear", "Peringatan 32-bit muncul"),
                body: tx(
                  "iOS starts warning that 32-bit apps won't work with future versions.",
                  "iOS mulai memperingatkan bahwa aplikasi 32-bit tidak akan berjalan di versi mendatang.",
                ),
              },
              {
                when: "iOS 11 · 2017",
                title: tx("32-bit apps stop launching", "Aplikasi 32-bit berhenti berjalan"),
                body: tx(
                  "Support ends completely. The binary can no longer run on any updated iPhone or iPad.",
                  "Dukungan berakhir total. Biner ini tidak bisa lagi dijalankan di iPhone atau iPad yang sudah diperbarui.",
                ),
              },
              {
                when: tx("Delisted", "Ditarik dari toko"),
                title: tx("Gone from the App Store", "Hilang dari App Store"),
                body: tx(
                  "With the store listing and the legacy online services gone, there was no official way left to play.",
                  "Dengan hilangnya listing di toko dan layanan online lama, tidak ada lagi cara resmi untuk memainkannya.",
                ),
              },
            ],
          },
          {
            type: "cards",
            items: [
              {
                icon: "broken",
                title: tx("No 64-bit build", "Tidak ada build 64-bit"),
                body: tx(
                  "No 64-bit update was ever shipped, so modern iOS devices have nothing they can run.",
                  "Update 64-bit tidak pernah dirilis, sehingga perangkat iOS modern tidak punya versi yang bisa dijalankan.",
                ),
              },
              {
                icon: "lock",
                title: tx("No legal storefront", "Tidak ada toko resmi"),
                body: tx(
                  "Delisting removed the last way to download it, even for players who had bought it.",
                  "Penarikan dari toko menghapus cara terakhir untuk mengunduhnya, bahkan bagi pemain yang sudah membelinya.",
                ),
              },
              {
                icon: "shield",
                title: tx("Emulation isn't preservation", "Emulasi bukan preservasi"),
                body: tx(
                  "Emulators are fragile and slow. A native port keeps the game playable on hardware people actually own.",
                  "Emulator rapuh dan lambat. Port native membuat game tetap bisa dimainkan di perangkat yang benar-benar dimiliki orang.",
                ),
              },
            ],
          },
        ],
      },
      {
        id: "pipeline",
        title: tx("Recompilation & Graphics Pipeline", "Pipeline Rekompilasi & Grafis"),
        intro: tx(
          "Instead of interpreting ARM instructions at runtime, the original game code is translated ahead of time into a native Windows executable. iOS services are replaced with a desktop platform layer.",
          "Alih-alih menerjemahkan instruksi ARM saat runtime, kode game asli diterjemahkan lebih dulu (ahead of time) menjadi executable Windows native. Layanan iOS digantikan oleh platform layer desktop.",
        ),
        blocks: [
          {
            type: "flow",
            caption: tx("Static recompilation pipeline", "Pipeline rekompilasi statis"),
            steps: [
              {
                icon: "tablet",
                title: tx("32-bit ARMv7 binary", "Biner ARMv7 32-bit"),
                body: tx("Original iPad executable and game assets", "Executable iPad asli dan aset game"),
              },
              {
                icon: "terminal",
                title: tx("Analysis & lifting", "Analisis & lifting"),
                body: tx("Recover functions and control flow from the binary", "Memulihkan fungsi dan control flow dari biner"),
              },
              {
                icon: "code",
                title: tx("Recompiled C/C++", "C/C++ hasil rekompilasi"),
                body: tx("Translated code, built with a modern desktop toolchain", "Kode terjemahan, di-build dengan toolchain desktop modern"),
              },
              {
                icon: "layers",
                title: "Platform layer",
                body: tx("Windowing, input and file I/O replace iOS services", "Windowing, input, dan file I/O menggantikan layanan iOS"),
              },
              {
                icon: "monitor",
                title: tx("Native Windows build", "Build Windows native"),
                body: tx("Shipped as the v1.0.0 release", "Dirilis sebagai versi v1.0.0"),
              },
            ],
          },
          {
            type: "cards",
            items: [
              {
                icon: "cube",
                title: "OpenGL ES 1.1/2.0 → desktop",
                body: tx(
                  "The game's original OpenGL ES 1.1/2.0 calls are served on the desktop through ANGLE or a desktop OpenGL context, so the renderer keeps its behaviour.",
                  "Panggilan OpenGL ES 1.1/2.0 asli dari game dilayani di desktop melalui ANGLE atau konteks OpenGL desktop, sehingga perilaku renderer tetap terjaga.",
                ),
              },
              {
                icon: "shader",
                title: tx("Custom shaders & PostFX", "Shader kustom & PostFX"),
                body: tx(
                  "Rewritten OpenGL ES shaders add bloom, specular tuning and motion blur. Each setting applies instantly, without a restart.",
                  "Shader OpenGL ES yang ditulis ulang menambahkan bloom, penyesuaian specular, dan motion blur. Setiap pengaturan langsung berlaku tanpa restart.",
                ),
              },
              {
                icon: "chip",
                title: tx("PVRTC texture decoding", "Dekode tekstur PVRTC"),
                body: tx(
                  "PowerVR-only PVRTC textures are decoded so any desktop GPU can render the original assets.",
                  "Tekstur PVRTC khusus PowerVR didekode agar GPU desktop apa pun bisa merender aset aslinya.",
                ),
              },
              {
                icon: "gamepad",
                title: tx("Input modernization", "Modernisasi input"),
                body: tx(
                  "Touch and tilt controls become fully remappable keyboard and gamepad bindings, with menu snap navigation.",
                  "Kontrol sentuh dan kemiringan diubah menjadi binding keyboard dan gamepad yang sepenuhnya bisa diatur ulang, dengan navigasi menu snap.",
                ),
              },
            ],
          },
        ],
      },
      {
        id: "leaderboard",
        title: tx("Cloud Leaderboard Restoration", "Pemulihan Leaderboard Cloud"),
        intro: tx(
          "The original online leaderboards depended on servers that no longer exist. Rather than leave them dead, the PC release talks to a new serverless backend, `gt-redbull-board`, running on Cloudflare's edge.",
          "Leaderboard online aslinya bergantung pada server yang sudah tidak ada. Alih-alih membiarkannya mati, rilis PC berkomunikasi dengan backend serverless baru, `gt-redbull-board`, yang berjalan di edge Cloudflare.",
        ),
        blocks: [
          {
            type: "architecture",
            legacy: {
              icon: "server",
              title: tx("Legacy game servers", "Server game lama"),
              body: tx("Shut down. Original online features can't connect.", "Sudah dimatikan. Fitur online asli tidak bisa terhubung."),
            },
            nodes: [
              {
                icon: "monitor",
                title: tx("GT Racing PC client", "Klien GT Racing PC"),
                body: tx("v1.0.0 sends and reads leaderboard times over HTTPS", "v1.0.0 mengirim dan membaca waktu leaderboard melalui HTTPS"),
              },
              {
                icon: "cloud",
                title: "Cloudflare Worker",
                body: tx(
                  "`gt-redbull-board` edge API for score submission and queries",
                  "API edge `gt-redbull-board` untuk pengiriman dan kueri skor",
                ),
              },
              {
                icon: "database",
                title: "Cloudflare D1",
                body: tx("Serverless SQLite database storing leaderboard entries", "Database SQLite serverless yang menyimpan entri leaderboard"),
              },
            ],
          },
          {
            type: "cards",
            items: [
              {
                icon: "cloud",
                title: "Edge-first",
                body: tx(
                  "Workers run close to every player, so the leaderboard responds quickly wherever it's requested from.",
                  "Worker berjalan dekat dengan setiap pemain, sehingga leaderboard merespons cepat dari mana pun diakses.",
                ),
              },
              {
                icon: "database",
                title: tx("Serverless storage", "Penyimpanan serverless"),
                body: tx(
                  "D1 removes the need for a database server to provision, patch or keep online.",
                  "D1 menghilangkan kebutuhan akan server database yang harus disiapkan, di-patch, atau dijaga tetap online.",
                ),
              },
              {
                icon: "shield",
                title: tx("Built to outlive its maker", "Dibuat untuk bertahan lama"),
                body: tx(
                  "There's no dedicated server to shut down, which is how the original leaderboard was lost.",
                  "Tidak ada server khusus yang bisa dimatikan — hal yang dulu membuat leaderboard aslinya hilang.",
                ),
              },
            ],
          },
        ],
      },
      {
        id: "release",
        title: tx("Controls & Release Info", "Kontrol & Info Rilis"),
        intro: tx(
          "Every binding below is a default. Keyboard and gamepad controls can be remapped in-game.",
          "Setiap binding di bawah adalah default. Kontrol keyboard dan gamepad bisa diatur ulang di dalam game.",
        ),
        blocks: [
          {
            type: "table",
            caption: tx("Default control bindings", "Binding kontrol default"),
            // Defaults shown on the site. Update them if your release's defaults differ.
            columns: [tx("Action", "Aksi"), "Keyboard", "Gamepad"],
            rows: [
              [tx("Steer", "Kemudi"), tx("A / D or ← / →", "A / D atau ← / →"), tx("Left stick", "Stik kiri")],
              [tx("Accelerate", "Akselerasi"), tx("W or ↑", "W atau ↑"), tx("Right trigger", "Trigger kanan")],
              [tx("Brake / reverse", "Rem / mundur"), tx("S or ↓", "S atau ↓"), tx("Left trigger", "Trigger kiri")],
              [tx("Navigate menus", "Navigasi menu"), tx("Arrow keys", "Tombol panah"), "D-pad (menu snap)"],
              [tx("Confirm", "Konfirmasi"), "Enter", "A / Cross"],
              [tx("Back / pause", "Kembali / jeda"), "Esc", "B / Circle · Start"],
            ],
          },
          {
            type: "checklist",
            title: tx("Shipped in v1.0.0", "Yang dirilis di v1.0.0"),
            items: [
              tx(
                "Native Windows executable built by static recompilation, no emulator",
                "Executable Windows native hasil rekompilasi statis, tanpa emulator",
              ),
              tx("Instant-apply PostFX, specular and motion blur settings", "Pengaturan PostFX, specular, dan motion blur yang langsung berlaku"),
              tx("Full keyboard and gamepad remapping with menu snap navigation", "Remapping keyboard dan gamepad penuh dengan navigasi menu snap"),
              tx("Restored online leaderboard on Cloudflare Workers + D1", "Leaderboard online yang dipulihkan di Cloudflare Workers + D1"),
              tx("Privacy-hardened, clean public release build", "Build rilis publik yang bersih dan diperkuat privasinya"),
            ],
          },
          {
            type: "links",
            items: [
              {
                label: tx("Read the v1.0.0 release notes", "Baca catatan rilis v1.0.0"),
                href: links.gtRacingReleases,
                icon: "tag",
                primary: true,
              },
              { label: BROWSE_SOURCE, href: links.gtRacingRepo, icon: "github" },
            ],
          },
        ],
      },
    ],
  },

  gangstar: {
    projectId: "gangstar",
    eyebrow: tx("Case Study · 32-Bit Mac Preservation", "Studi Kasus · Preservasi Mac 32-Bit"),
    title: "Gangstar: Miami Vindication",
    repoName: "Gangstar: Miami Vindication PC Port",
    summary: tx(
      "How the desktop edition of an open-world action classic, stranded when macOS Catalina removed 32-bit support, was analysed and ported to Windows x86 and Linux as a verified V1.0.0 release.",
      "Bagaimana edisi desktop dari game aksi open-world klasik — yang terdampar sejak macOS Catalina menghapus dukungan 32-bit — dianalisis dan di-port ke Windows x86 dan Linux sebagai rilis V1.0.0 yang terverifikasi.",
    ),
    art: "miami",
    image: null,
    facts: [
      { id: "platform", label: tx("Original platform", "Platform asli"), value: "32-bit Mac · OS X" },
      { id: "binary", label: tx("Binary", "Biner"), value: "x86 Mach-O" },
      { id: "lost", label: tx("Lost with", "Hilang sejak"), value: "macOS Catalina 10.15" },
      { id: "preserved", label: tx("Preserved as", "Dipreservasi sebagai"), value: "Windows x86 & Linux · V1.0.0" },
    ],
    links: [
      { label: GITHUB_REPOSITORY, href: links.gangstarRepo, icon: "github" },
      links.gangstarReleases && { label: tx("V1.0.0 Releases", "Rilis V1.0.0"), href: links.gangstarReleases, icon: "tag" },
    ].filter(Boolean),
    sections: [
      {
        id: "why-lost",
        title: tx("Why It Was Lost", "Mengapa Game Ini Hilang"),
        intro: tx(
          "The Mac edition only ever shipped as a 32-bit x86 binary. Once macOS dropped 32-bit support entirely, every modern Mac refused to open it.",
          "Edisi Mac hanya pernah dirilis sebagai biner x86 32-bit. Begitu macOS menghapus dukungan 32-bit sepenuhnya, setiap Mac modern menolak membukanya.",
        ),
        blocks: [
          {
            type: "timeline",
            items: [
              {
                when: tx("OS X era", "Era OS X"),
                title: tx("Shipped as 32-bit x86", "Dirilis sebagai x86 32-bit"),
                body: tx("Built for Intel Macs as a legacy 32-bit Mach-O application.", "Dibuat untuk Mac Intel sebagai aplikasi Mach-O 32-bit lama."),
              },
              {
                when: "macOS 10.13.4 · 2018",
                title: tx("Compatibility warnings", "Peringatan kompatibilitas"),
                body: tx(
                  'macOS starts warning that 32-bit apps "are not optimized for your Mac".',
                  'macOS mulai memperingatkan bahwa aplikasi 32-bit "tidak dioptimalkan untuk Mac Anda".',
                ),
              },
              {
                when: "macOS 10.14 · 2018",
                title: tx("Last version to run it", "Versi terakhir yang bisa menjalankannya"),
                body: tx(
                  "Mojave is the final macOS release that can still launch 32-bit apps.",
                  "Mojave adalah rilis macOS terakhir yang masih bisa menjalankan aplikasi 32-bit.",
                ),
              },
              {
                when: "macOS 10.15 · 2019",
                title: tx("Catalina removes 32-bit", "Catalina menghapus 32-bit"),
                body: tx(
                  "Catalina and every later macOS release refuse to launch the game.",
                  "Catalina dan semua rilis macOS setelahnya menolak menjalankan game ini.",
                ),
              },
            ],
          },
          {
            type: "cards",
            items: [
              {
                icon: "broken",
                title: tx("64-bit only macOS", "macOS khusus 64-bit"),
                body: tx(
                  "Catalina removed the 32-bit runtime itself, so the original binary can't be worked around on modern Macs.",
                  "Catalina menghapus runtime 32-bit itu sendiri, sehingga biner aslinya tidak bisa diakali di Mac modern.",
                ),
              },
              {
                icon: "laptop",
                title: tx("Apple Silicon makes it worse", "Apple Silicon memperparahnya"),
                body: tx(
                  "Newer ARM Macs add another architecture gap on top of the 32-bit removal.",
                  "Mac ARM yang lebih baru menambah celah arsitektur lain di atas penghapusan 32-bit.",
                ),
              },
              {
                icon: "shield",
                title: tx("A port beats a VM", "Port lebih baik daripada VM"),
                body: tx(
                  "A native build runs well on ordinary PCs without keeping an old macOS install alive.",
                  "Build native berjalan lancar di PC biasa tanpa harus mempertahankan instalasi macOS lama.",
                ),
              },
            ],
          },
        ],
      },
      {
        id: "porting",
        title: tx("Cross-Platform Windows & Linux Porting", "Porting Lintas Platform ke Windows & Linux"),
        intro: tx(
          "The 32-bit x86 binary was analysed and lifted, then rebuilt on a portable platform layer so the same game code targets both Windows and Linux.",
          "Biner x86 32-bit dianalisis dan di-lift, lalu dibangun ulang di atas platform layer portabel sehingga kode game yang sama menargetkan Windows sekaligus Linux.",
        ),
        blocks: [
          {
            type: "flow",
            caption: tx("Porting pipeline", "Pipeline porting"),
            steps: [
              {
                icon: "laptop",
                title: "32-bit x86 Mach-O",
                body: tx("Original OS X application and assets", "Aplikasi OS X asli beserta asetnya"),
              },
              {
                icon: "terminal",
                title: tx("Binary analysis & lifting", "Analisis & lifting biner"),
                body: tx("Map functions, data and OS dependencies", "Memetakan fungsi, data, dan dependensi OS"),
              },
              {
                icon: "layers",
                title: tx("Portable platform layer", "Platform layer portabel"),
                body: tx("Windowing, input and file system for both targets", "Windowing, input, dan file system untuk kedua target"),
              },
              {
                icon: "cube",
                title: tx("Modernized OpenGL ES", "OpenGL ES termodernisasi"),
                body: tx("Rendering fixes and performance passes", "Perbaikan rendering dan optimasi performa"),
              },
              {
                icon: "monitor",
                title: "Windows x86 & Linux",
                body: tx("Native builds for the V1.0.0 release", "Build native untuk rilis V1.0.0"),
              },
            ],
          },
          {
            type: "cards",
            items: [
              {
                icon: "terminal",
                title: "Binary lifting",
                body: tx(
                  "Recovering the game's logic from the shipped x86 binary so it can be rebuilt against non-Apple platforms.",
                  "Memulihkan logika game dari biner x86 yang dirilis agar bisa dibangun ulang untuk platform non-Apple.",
                ),
              },
              {
                icon: "shader",
                title: tx("Multi-pass MSAA depth resolves", "Depth resolve MSAA multi-pass"),
                body: tx(
                  "Fixes depth-dependent effects so anti-aliasing and the original render passes work together correctly.",
                  "Memperbaiki efek yang bergantung pada depth sehingga anti-aliasing dan render pass aslinya bekerja bersama dengan benar.",
                ),
              },
              {
                icon: "cube",
                title: "VBO caching",
                body: tx(
                  "Geometry is kept in GPU vertex buffers instead of re-uploaded each frame, removing a major desktop bottleneck.",
                  "Geometri disimpan di vertex buffer GPU alih-alih diunggah ulang setiap frame, sehingga menghilangkan bottleneck utama di desktop.",
                ),
              },
              {
                icon: "keyboard",
                title: tx("Input adaptation", "Adaptasi input"),
                body: tx(
                  "Controls are adapted for desktop keyboards and controllers on both Windows and Linux.",
                  "Kontrol disesuaikan untuk keyboard dan controller desktop di Windows maupun Linux.",
                ),
              },
            ],
          },
        ],
      },
      {
        id: "release",
        title: tx("Release Packaging (V1.0.0)", "Paket Rilis (V1.0.0)"),
        intro: tx(
          "V1.0.0 ships as two archives, one per platform. Each is published with a SHA-256 checksum, so anyone can verify their download is byte-for-byte the official build.",
          "V1.0.0 dirilis dalam dua arsip, satu untuk setiap platform. Masing-masing dipublikasikan dengan checksum SHA-256 sehingga siapa pun bisa memverifikasi bahwa unduhannya identik byte demi byte dengan build resmi.",
        ),
        blocks: [
          {
            type: "cards",
            items: [
              {
                icon: "monitor",
                title: "Windows x86 · .zip",
                body: tx(
                  "Native Windows build. Extract and play, no installer required.",
                  "Build Windows native. Ekstrak lalu mainkan, tanpa perlu installer.",
                ),
              },
              {
                icon: "terminal",
                title: "Linux · tarball",
                body: tx("Native Linux build packaged as a compressed .tar archive.", "Build Linux native yang dikemas sebagai arsip .tar terkompresi."),
              },
              {
                icon: "shield",
                title: tx("SHA-256 checksums", "Checksum SHA-256"),
                body: tx(
                  "Published hashes for each archive so downloads can be verified before running.",
                  "Hash yang dipublikasikan untuk setiap arsip agar unduhan bisa diverifikasi sebelum dijalankan.",
                ),
              },
            ],
          },
          {
            type: "code",
            caption: tx("Verify a download", "Verifikasi unduhan"),
            snippets: [
              { label: "Windows (PowerShell)", code: "Get-FileHash .\\<archive>.zip -Algorithm SHA256" },
              { label: "Linux", code: "sha256sum <archive>.tar.gz" },
            ],
            note: tx(
              "Compare the printed hash with the one published next to the release.",
              "Bandingkan hash yang tercetak dengan hash yang dipublikasikan di samping rilis.",
            ),
          },
          {
            type: "checklist",
            title: tx("Release hygiene", "Kebersihan rilis"),
            items: [
              tx("Clean, telemetry-free release packaging", "Paket rilis yang bersih dan bebas telemetri"),
              tx("Development artifacts stripped from production builds", "Artefak pengembangan dihapus dari build produksi"),
              tx("Separate verified archives for Windows x86 and Linux", "Arsip terverifikasi terpisah untuk Windows x86 dan Linux"),
              tx("Rendering bottlenecks audited for smooth desktop gameplay", "Bottleneck rendering diaudit untuk gameplay desktop yang mulus"),
            ],
          },
          {
            type: "links",
            items: [
              {
                label: links.gangstarReleases
                  ? tx("Download V1.0.0 from GitHub Releases", "Unduh V1.0.0 dari GitHub Releases")
                  : tx("Find the release on GitHub", "Temukan rilisnya di GitHub"),
                href: links.gangstarReleases ?? links.gangstarRepo,
                icon: "tag",
                primary: true,
              },
              { label: BROWSE_SOURCE, href: links.gangstarRepo, icon: "github" },
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

/** Core technologies. `glyph` sets the monogram tile (fixed, so it never changes with the language). */
export const logoItems = [
  { id: "linux", name: tx("Linux Servers", "Server Linux"), glyph: "LX" },
  { id: "windows", name: "Windows Server", glyph: "WS" },
  { id: "hybrid", name: "Hybrid Cloud", glyph: "HC" },
  { id: "omron", name: "Omron PLC / Barrier Gate", glyph: "OP" },
  { id: "ferizy", name: "trip.ferizy.com", glyph: "TF" },
  { id: "ops", name: tx("Production Ops", "Operasional Produksi"), glyph: "PO" },
  { id: "workers", name: "Cloudflare Workers", glyph: "CW" },
  { id: "d1", name: "D1 Database", glyph: "D1" },
  { id: "cpp", name: "C/C++", glyph: "C++" },
  { id: "win32", name: "Win32 API", glyph: "WA" },
  { id: "recomp", name: tx("Static Recompilation", "Rekompilasi Statis"), glyph: "SR" },
  { id: "armv7", name: "ARMv7", glyph: "AR" },
  { id: "x86", name: "x86", glyph: "X8" },
  { id: "gles", name: "OpenGL ES", glyph: "OE" },
  { id: "ci", name: "Git & CI/CD", glyph: "CI" },
];

/* -------------------------------------------------------------------------- */
/*                                 Abilities                                  */
/* -------------------------------------------------------------------------- */

export const abilities = [
  {
    id: "ops",
    icon: "cloud",
    title: tx("Enterprise Application & Cloud Operations", "Operasional Aplikasi Enterprise & Cloud"),
    desc: tx(
      "Hybrid server deployments, high-traffic web system reliability (`trip.ferizy.com`), and production incident resolution.",
      "Deployment server hybrid, keandalan sistem web bertrafik tinggi (`trip.ferizy.com`), dan penanganan insiden produksi.",
    ),
  },
  {
    id: "field",
    icon: "lock",
    title: tx("Hardware & Field Systems Integration", "Integrasi Perangkat Keras & Sistem Lapangan"),
    desc: tx(
      "End-to-end installation and configuration of industrial Omron automated barrier gate systems at major seaports.",
      "Instalasi dan konfigurasi end-to-end sistem barrier gate otomatis industri Omron di pelabuhan-pelabuhan besar.",
    ),
  },
  {
    id: "native",
    icon: "chip",
    title: tx("Low-Level Binary Recompilation & Graphics Systems", "Rekompilasi Biner Tingkat Rendah & Sistem Grafis"),
    desc: tx(
      "Static recompilation of legacy 32-bit ARM/x86 software into native Windows and Linux executables.",
      "Rekompilasi statis perangkat lunak ARM/x86 32-bit lama menjadi executable Windows dan Linux native.",
    ),
  },
];

/* -------------------------------------------------------------------------- */
/*                          Experience / milestones                           */
/* -------------------------------------------------------------------------- */

/**
 * Professional work experience on `/journey`, newest first. `logo` is a key of
 * `brandLogos` (official image, falling back to the drawn emblem, then `icon`).
 * `systems` lists production systems shown with their own logo.
 * Open-source projects live on `/projects`, not here.
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
    review: tx(
      "Managed mission-critical ferry ticketing infrastructure (`trip.ferizy.com`), hybrid cloud/on-premise port deployments across dozens of harbors, and industrial Omron barrier gate hardware integration.",
      "Mengelola infrastruktur tiket kapal penyeberangan yang kritis (`trip.ferizy.com`), deployment hybrid cloud/on-premise di puluhan pelabuhan, serta integrasi perangkat keras barrier gate industri Omron.",
    ),
    platformsLabel: tx("Systems & Operations", "Sistem & Operasional"),
    platforms: [
      "trip.ferizy.com",
      "Hybrid Cloud",
      tx("On-Prem Harbor Servers", "Server Pelabuhan On-Prem"),
      tx("Omron Barrier Gates", "Barrier Gate Omron"),
      tx("Production Ops", "Operasional Produksi"),
    ],
    responsibilities: [
      tx(
        "Deployed ticketing services and counter applications across both local harbor servers and cloud infrastructure spanning dozens of ferry ports nationwide.",
        "Men-deploy layanan tiket dan aplikasi loket di server lokal pelabuhan maupun infrastruktur cloud yang mencakup puluhan pelabuhan penyeberangan di seluruh Indonesia.",
      ),
      tx(
        "Installed, configured, and integrated Omron-based automated barrier gate hardware systems at the Surabaya port.",
        "Memasang, mengonfigurasi, dan mengintegrasikan sistem perangkat keras barrier gate otomatis berbasis Omron di Pelabuhan Surabaya.",
      ),
      tx(
        "Maintained high availability and operational stability for `trip.ferizy.com`, ensuring smooth, uninterrupted online ferry ticket transactions.",
        "Menjaga ketersediaan tinggi dan stabilitas operasional `trip.ferizy.com`, memastikan transaksi tiket kapal online berjalan lancar tanpa gangguan.",
      ),
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
 */
export const techStackIcons = [
  {
    name: tx("Linux & Windows Servers", "Server Linux & Windows"),
    subtitle: tx("Harbor & Cloud Hosts", "Host Pelabuhan & Cloud"),
    emblem: "servers",
    glbPath: null,
    scale: 1,
    rotation: [0, 0, 0],
  },
  {
    name: "Hybrid Cloud",
    subtitle: tx("Cloud + On-Prem Deployments", "Deployment Cloud + On-Prem"),
    emblem: "hybrid",
    glbPath: null,
    scale: 1,
    rotation: [0, 0, 0],
  },
  {
    name: tx("Omron PLC / Gate Integration", "Integrasi PLC / Gate Omron"),
    subtitle: tx("Industrial Field Hardware", "Perangkat Keras Lapangan Industri"),
    emblem: "gate",
    glbPath: null,
    scale: 1,
    rotation: [0, 0, 0],
  },
  {
    name: "C / C++",
    subtitle: tx("Native & Low-Level Systems", "Sistem Native & Tingkat Rendah"),
    emblem: "cpp",
    glbPath: null,
    scale: 1,
    rotation: [0, 0, 0],
  },
  {
    name: "Cloudflare Workers & D1",
    subtitle: tx("Edge Services & Storage", "Layanan Edge & Penyimpanan"),
    emblem: "cloudflare",
    glbPath: null,
    scale: 1,
    rotation: [0, 0, 0],
  },
  {
    name: "Git & CI/CD",
    subtitle: tx("Versioned, Repeatable Releases", "Rilis Berversi & Dapat Diulang"),
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
    id: "rollouts",
    icon: "server",
    title: tx("Nationwide port rollouts", "Rollout pelabuhan skala nasional"),
    project: "PT ASDP Indonesia Ferry (Persero)",
    release: tx("Deployment · Dozens of Ports", "Deployment · Puluhan Pelabuhan"),
    summary: tx(
      "Ticketing services and counter applications rolled out to local harbor servers and cloud infrastructure across dozens of ferry ports nationwide.",
      "Layanan tiket dan aplikasi loket di-rollout ke server lokal pelabuhan dan infrastruktur cloud di puluhan pelabuhan penyeberangan di seluruh Indonesia.",
    ),
    tags: ["Hybrid Cloud", tx("On-Prem Servers", "Server On-Prem"), tx("Counter Apps", "Aplikasi Loket")],
    link: null,
  },
  {
    id: "gates",
    icon: "lock",
    title: tx("Surabaya barrier gate integration", "Integrasi barrier gate Surabaya"),
    project: "PT ASDP Indonesia Ferry (Persero)",
    release: tx("Hardware · Surabaya Port", "Perangkat Keras · Pelabuhan Surabaya"),
    summary: tx(
      "Omron-based automated barrier gate hardware installed, configured and integrated on site at the Surabaya port.",
      "Perangkat keras barrier gate otomatis berbasis Omron dipasang, dikonfigurasi, dan diintegrasikan langsung di lokasi Pelabuhan Surabaya.",
    ),
    tags: ["Omron PLC", "Barrier Gate", tx("Field Integration", "Integrasi Lapangan")],
    link: null,
  },
  {
    id: "ferizy",
    icon: "shield",
    brand: "ferizy",
    title: tx("trip.ferizy.com reliability", "Keandalan trip.ferizy.com"),
    project: "PT ASDP Indonesia Ferry (Persero)",
    release: tx("Availability · Online Ticketing", "Ketersediaan · Tiket Online"),
    summary: tx(
      "High availability and operational stability maintained for `trip.ferizy.com`, keeping online ferry ticket transactions smooth and uninterrupted.",
      "Ketersediaan tinggi dan stabilitas operasional `trip.ferizy.com` terus terjaga, membuat transaksi tiket kapal online tetap lancar tanpa gangguan.",
    ),
    tags: ["High Availability", "Production Support", "Uptime"],
    link: { label: "trip.ferizy.com", href: links.ferizy },
  },
];

/* -------------------------------------------------------------------------- */
/*                            Contact & community                             */
/* -------------------------------------------------------------------------- */

export const communityLinks = [
  { id: "profile", name: tx("GitHub Profile", "Profil GitHub"), handle: `@${githubUser}`, icon: "github", url: links.githubProfile },
  { id: "sidaf", name: "SIDAF", handle: "sidaf", icon: "code", url: links.sidafRepo },
  { id: "vr-airport", name: "VR Simulation Airport", handle: "VR-Simulation-Airport", icon: "cube", url: links.vrAirportRepo },
  { id: "war-plane", name: "War Plane 1945", handle: "War-Plane-1945", icon: "gamepad", url: links.warPlaneRepo },
  { id: "gt-racing", name: "GT Racing Recomp", handle: GT_RACING_REPO, icon: "flag", url: links.gtRacingRepo },
  { id: "gangstar", name: "Gangstar PC Port", handle: GANGSTAR_REPO ?? "Miami Vindication", icon: "city", url: links.gangstarRepo },
  {
    id: "gt-notes",
    name: tx("GT Racing Release Notes", "Catatan Rilis GT Racing"),
    handle: "v1.0.0",
    icon: "tag",
    url: links.gtRacingReleases,
  },
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

/* -------------------------------------------------------------------------- */
/*                              Engineering notes                             */
/* -------------------------------------------------------------------------- */

/**
 * Articles on `/notes` and `/notes/:slug`. Sections reuse the case-study block
 * types (`prose`, `cards`, `flow`, `checklist`, ...). `related` links point at
 * internal routes. Reading time is estimated from the text.
 */
export const engineeringNotes = [
  {
    slug: "gles-ipad-to-windows",
    icon: "shader",
    published: "2026-11-20",
    kicker: tx("Graphics · Preservation", "Grafis · Preservasi"),
    title: tx(
      "Translating 32-Bit iPad OpenGL ES 1.1/2.0 Pipelines to Native Windows",
      "Menerjemahkan Pipeline OpenGL ES 1.1/2.0 iPad 32-Bit ke Windows Native",
    ),
    summary: tx(
      "What has to change when a renderer written for PowerVR iPads runs on a desktop GPU: PVRTC texture decoding, VBO caching, multi-pass MSAA depth resolves and instant-apply PostFX, from GTRacingMotorAcademyRecomp and the Gangstar port that shares its problems.",
      "Apa saja yang harus berubah saat renderer yang ditulis untuk iPad ber-GPU PowerVR dijalankan di GPU desktop: dekode tekstur PVRTC, VBO caching, depth resolve MSAA multi-pass, dan PostFX yang langsung berlaku, dari GTRacingMotorAcademyRecomp dan port Gangstar yang menghadapi masalah serupa.",
    ),
    tags: ["OpenGL ES 1.1/2.0", "PVRTC", "VBO", "MSAA", "PostFX"],
    related: [
      { label: tx("GT Racing case study", "Studi kasus GT Racing"), to: routes.gtRacing },
      { label: tx("Gangstar case study", "Studi kasus Gangstar"), to: routes.gangstar },
    ],
    sections: [
      {
        id: "starting-point",
        title: tx("The starting point", "Titik awal"),
        blocks: [
          {
            type: "prose",
            paragraphs: [
              tx(
                "GT Racing: Motor Academy was written for early iPads: a 32-bit ARMv7 binary, a PowerVR GPU and a renderer that speaks OpenGL ES 1.1 and 2.0. Static recompilation turns the ARM code into native Windows code, but it doesn't touch the assumptions baked into the rendering: which texture formats exist, how geometry reaches the GPU, and how many passes a frame takes.",
                "GT Racing: Motor Academy dibuat untuk iPad generasi awal: biner ARMv7 32-bit, GPU PowerVR, dan renderer yang berbicara dengan OpenGL ES 1.1 dan 2.0. Rekompilasi statis mengubah kode ARM menjadi kode Windows native, tetapi tidak menyentuh asumsi yang tertanam di rendering-nya: format tekstur apa yang tersedia, bagaimana geometri sampai ke GPU, dan berapa pass yang dibutuhkan satu frame.",
              ),
              tx(
                "Those assumptions are what this note is about. The goal throughout is to keep the original renderer's behaviour, not to rewrite it.",
                "Asumsi-asumsi itulah yang dibahas catatan ini. Tujuannya sejak awal adalah mempertahankan perilaku renderer aslinya, bukan menulis ulang.",
              ),
            ],
          },
          {
            type: "flow",
            caption: tx("Where a frame goes on the desktop", "Perjalanan satu frame di desktop"),
            steps: [
              {
                icon: "code",
                title: tx("Recompiled game code", "Kode game hasil rekompilasi"),
                body: tx("Still issues the original GL ES 1.1/2.0 calls", "Tetap memanggil GL ES 1.1/2.0 seperti aslinya"),
              },
              {
                icon: "layers",
                title: tx("GL ES on desktop", "GL ES di desktop"),
                body: tx("Served through ANGLE or a desktop OpenGL context", "Dilayani lewat ANGLE atau konteks OpenGL desktop"),
              },
              {
                icon: "chip",
                title: tx("Texture path", "Jalur tekstur"),
                body: tx("PVRTC assets decoded for any desktop GPU", "Aset PVRTC didekode untuk GPU desktop apa pun"),
              },
              {
                icon: "cube",
                title: tx("Geometry path", "Jalur geometri"),
                body: tx("Static geometry kept in GPU vertex buffers", "Geometri statis disimpan di vertex buffer GPU"),
              },
              {
                icon: "shader",
                title: "PostFX",
                body: tx("Bloom, specular and motion blur, applied live", "Bloom, specular, dan motion blur, langsung berlaku"),
              },
            ],
          },
        ],
      },
      {
        id: "gl-calls",
        title: tx("Keeping the OpenGL ES calls intact", "Menjaga panggilan OpenGL ES tetap utuh"),
        blocks: [
          {
            type: "prose",
            paragraphs: [
              tx(
                "The recompiled game still issues OpenGL ES 1.1/2.0 calls. Rather than rewriting each draw call, they're served on the desktop through ANGLE or a desktop OpenGL context, so state changes, blending and draw order behave the way the original renderer expects.",
                "Game hasil rekompilasi tetap memanggil OpenGL ES 1.1/2.0. Alih-alih menulis ulang setiap draw call, panggilan itu dilayani di desktop melalui ANGLE atau konteks OpenGL desktop, sehingga perubahan state, blending, dan urutan gambar berperilaku seperti yang diharapkan renderer aslinya.",
              ),
              tx(
                "The two API versions need different care. ES 1.1 is fixed-function: lighting, texture combiners and the matrix stack are part of the API rather than shaders, so that state machine has to be reproduced faithfully. ES 2.0 content brings its own GLSL ES shaders, which have to compile cleanly on desktop drivers that are stricter or looser than PowerVR's in different places.",
                "Dua versi API ini perlu perlakuan berbeda. ES 1.1 bersifat fixed-function: lighting, texture combiner, dan matrix stack adalah bagian dari API, bukan shader, sehingga state machine itu harus direproduksi dengan setia. Konten ES 2.0 membawa shader GLSL ES sendiri, yang harus bisa dikompilasi dengan bersih di driver desktop yang di beberapa bagian lebih ketat, di bagian lain lebih longgar, dibanding PowerVR.",
              ),
            ],
          },
        ],
      },
      {
        id: "pvrtc",
        title: tx("PVRTC: textures only PowerVR could read", "PVRTC: tekstur yang hanya bisa dibaca PowerVR"),
        blocks: [
          {
            type: "prose",
            paragraphs: [
              tx(
                "PVRTC is PowerVR's texture compression. Block formats such as DXT/BC compress each 4×4 tile on its own. PVRTC instead stores two low-resolution colour images plus a per-pixel modulation value, and rebuilds each texel by blending between upscaled versions of the two. That's why it looks smooth at 2 or 4 bits per pixel, and why no desktop GPU can sample it directly.",
                "PVRTC adalah kompresi tekstur milik PowerVR. Format blok seperti DXT/BC mengompresi setiap tile 4×4 secara terpisah. PVRTC justru menyimpan dua citra warna beresolusi rendah ditambah nilai modulasi per piksel, lalu membangun ulang setiap texel dengan memadukan versi yang diperbesar dari keduanya. Itulah sebabnya PVRTC tampak halus pada 2 atau 4 bit per piksel, dan sebabnya tidak ada GPU desktop yang bisa membacanya langsung.",
              ),
              tx(
                "So the port decodes PVRTC textures for the desktop. The original compressed assets stay untouched, and any desktop GPU receives data it can render.",
                "Karena itu port ini mendekode tekstur PVRTC untuk desktop. Aset terkompresi aslinya tetap utuh, dan GPU desktop apa pun menerima data yang bisa dirender.",
              ),
            ],
          },
          {
            type: "cards",
            items: [
              {
                icon: "archive",
                title: tx("Decode, don't re-author", "Dekode, jangan dibuat ulang"),
                body: tx(
                  "The shipped assets remain the source of truth. No texture is repainted or swapped for a remaster.",
                  "Aset yang dirilis tetap menjadi sumber kebenaran. Tidak ada tekstur yang dilukis ulang atau diganti versi remaster.",
                ),
              },
              {
                icon: "shield",
                title: tx("Watch the alpha", "Perhatikan alpha"),
                body: tx(
                  "PVRTC's blended reconstruction crosses texel boundaries, so alpha edges (foliage, UI, decals) are the first place a wrong decoder shows.",
                  "Rekonstruksi PVRTC yang dipadukan melewati batas texel, sehingga tepi alpha (dedaunan, UI, decal) menjadi tempat pertama kesalahan decoder terlihat.",
                ),
              },
              {
                icon: "layers",
                title: tx("Square, power-of-two", "Persegi, pangkat dua"),
                body: tx(
                  "PVRTC textures on iOS are square and power-of-two. Keeping those sizes after decoding avoids mip-chain and sampling surprises.",
                  "Tekstur PVRTC di iOS berbentuk persegi dan berukuran pangkat dua. Mempertahankan ukuran itu setelah didekode menghindari kejutan pada mip-chain dan sampling.",
                ),
              },
            ],
          },
        ],
      },
      {
        id: "vbo",
        title: tx("Geometry: caching vertex buffers", "Geometri: caching vertex buffer"),
        blocks: [
          {
            type: "prose",
            paragraphs: [
              tx(
                "Mobile renderers of that era often sent vertex data from client memory on every draw. That's cheap on an iPad, where CPU and GPU share memory, and expensive on a PC, where every upload crosses the bus and the driver.",
                "Renderer mobile pada era itu kerap mengirim data vertex dari memori klien di setiap draw. Itu murah di iPad, tempat CPU dan GPU berbagi memori, tetapi mahal di PC, tempat setiap unggahan harus melewati bus dan driver.",
              ),
              tx(
                "In the Gangstar: Miami Vindication port, geometry that doesn't change is kept in GPU vertex buffers (VBOs) instead of being re-uploaded every frame, which removed one of the biggest desktop bottlenecks. What makes caching safe is invalidation: a cached buffer is only valid while its source data is unchanged, so genuinely dynamic geometry keeps its streaming path.",
                "Di port Gangstar: Miami Vindication, geometri yang tidak berubah disimpan di vertex buffer GPU (VBO) alih-alih diunggah ulang setiap frame, sehingga salah satu bottleneck terbesar di desktop hilang. Kunci agar caching aman adalah invalidasi: buffer yang di-cache hanya valid selama data sumbernya tidak berubah, sehingga geometri yang memang dinamis tetap memakai jalur streaming.",
              ),
            ],
          },
        ],
      },
      {
        id: "msaa",
        title: tx("Multi-pass MSAA depth resolves", "Depth resolve MSAA multi-pass"),
        blocks: [
          {
            type: "prose",
            paragraphs: [
              tx(
                "Turning on MSAA for a renderer that was never designed for it breaks things quietly. A later pass that reads the depth buffer expects one depth value per pixel; a multisampled depth buffer holds several, and can't be sampled like an ordinary texture.",
                "Mengaktifkan MSAA pada renderer yang tidak pernah dirancang untuknya merusak hal-hal secara diam-diam. Pass berikutnya yang membaca depth buffer mengharapkan satu nilai depth per piksel, sedangkan depth buffer multisample menyimpan beberapa nilai dan tidak bisa dibaca seperti tekstur biasa.",
              ),
              tx(
                "The fix is to resolve depth explicitly between passes, so every depth-dependent pass reads a single-sample depth image while colour still gets anti-aliased. In the Gangstar port, that's what lets anti-aliasing and the original render passes work together.",
                "Solusinya adalah me-resolve depth secara eksplisit di antara pass, sehingga setiap pass yang bergantung pada depth membaca citra depth single-sample, sementara warna tetap mendapat anti-aliasing. Di port Gangstar, inilah yang membuat anti-aliasing dan render pass aslinya bisa bekerja bersama.",
              ),
            ],
          },
        ],
      },
      {
        id: "postfx",
        title: tx("PostFX tuning that applies instantly", "Penyesuaian PostFX yang langsung berlaku"),
        blocks: [
          {
            type: "prose",
            paragraphs: [
              tx(
                "On the GT Racing port, rewritten OpenGL ES shaders add bloom, specular tuning and motion blur on top of the original image. Every setting applies instantly: change a value in the menu and the next frame shows it, with no restart.",
                "Di port GT Racing, shader OpenGL ES yang ditulis ulang menambahkan bloom, penyesuaian specular, dan motion blur di atas gambar aslinya. Setiap pengaturan langsung berlaku: ubah nilainya di menu dan frame berikutnya sudah menampilkannya, tanpa restart.",
              ),
              tx(
                "Two rules keep that manageable. Effect strengths are inputs to the shaders rather than constants compiled into them, and the original look is the zero point: with every effect at its minimum, the game should still look like the iPad version.",
                "Dua aturan membuat hal ini tetap terkendali. Kekuatan efek menjadi input bagi shader, bukan konstanta yang dikompilasi ke dalamnya, dan tampilan asli menjadi titik nol: dengan semua efek di nilai minimum, game harus tetap terlihat seperti versi iPad-nya.",
              ),
            ],
          },
          {
            type: "checklist",
            title: tx("Lessons I'd reuse", "Pelajaran yang akan saya pakai lagi"),
            items: [
              tx("Treat the original renderer's look as the reference, effect by effect", "Jadikan tampilan renderer asli sebagai acuan, efek demi efek"),
              tx("Fix the data paths (textures, buffers) before tuning effects", "Perbaiki jalur data (tekstur, buffer) sebelum menyetel efek"),
              tx("Make every quality setting instant and reversible", "Buat setiap pengaturan kualitas langsung berlaku dan bisa dikembalikan"),
              tx("Measure first: on desktop, uploads cost more than shading", "Ukur dulu: di desktop, unggahan data lebih mahal daripada shading"),
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
      "Operational lessons from PT ASDP Indonesia Ferry (Persero): deploying ticketing services and counter applications to harbor servers and the cloud across dozens of ports, keeping trip.ferizy.com stable, and integrating Omron barrier gates at the Surabaya port.",
      "Pelajaran operasional dari PT ASDP Indonesia Ferry (Persero): men-deploy layanan tiket dan aplikasi loket ke server pelabuhan dan cloud di puluhan pelabuhan, menjaga stabilitas trip.ferizy.com, dan mengintegrasikan barrier gate Omron di Pelabuhan Surabaya.",
    ),
    tags: ["Hybrid Cloud", tx("Harbor Servers", "Server Pelabuhan"), "trip.ferizy.com", "Omron PLC"],
    related: [{ label: tx("Work experience", "Pengalaman kerja"), to: routes.journey }],
    sections: [
      {
        id: "two-places",
        title: tx("Two places a ticket gets sold", "Dua tempat tiket dijual"),
        blocks: [
          {
            type: "prose",
            paragraphs: [
              tx(
                "Ferry ticketing at ASDP runs in two places at once. Online, `trip.ferizy.com` sells tickets to the public. At the ports, counter applications serve the passengers and vehicles in the queue, running on local harbor servers as well as cloud infrastructure. My work covered deploying ticketing services and counter applications to both, across dozens of ferry ports.",
                "Tiket kapal penyeberangan di ASDP berjalan di dua tempat sekaligus. Secara online, `trip.ferizy.com` menjual tiket ke publik. Di pelabuhan, aplikasi loket melayani penumpang dan kendaraan yang mengantre, berjalan di server lokal pelabuhan maupun infrastruktur cloud. Pekerjaan saya mencakup deployment layanan tiket dan aplikasi loket ke keduanya, di puluhan pelabuhan penyeberangan.",
              ),
              tx(
                "That split is the heart of the architecture. The cloud carries the national, always-on storefront; the harbor side sits next to the counters and gates it serves. Production details such as hostnames and topology are left out on purpose: this note is about operating practice, not the internals of a state-owned company's systems.",
                "Pembagian itulah inti arsitekturnya. Cloud menjalankan etalase nasional yang selalu aktif, sedangkan sisi pelabuhan berada dekat dengan loket dan gate yang dilayaninya. Detail produksi seperti hostname dan topologi sengaja tidak dicantumkan: catatan ini membahas praktik operasional, bukan bagian dalam sistem milik BUMN.",
              ),
            ],
          },
          {
            type: "cards",
            items: [
              {
                icon: "cloud",
                title: tx("Cloud ticketing", "Tiket berbasis cloud"),
                body: tx("`trip.ferizy.com` online sales, kept highly available", "Penjualan online `trip.ferizy.com`, dijaga tetap berketersediaan tinggi"),
              },
              {
                icon: "server",
                title: tx("Harbor servers", "Server pelabuhan"),
                body: tx("Ticketing and counter apps on-prem at dozens of ports", "Aplikasi tiket dan loket on-prem di puluhan pelabuhan"),
              },
              {
                icon: "lock",
                title: tx("Barrier gates", "Barrier gate"),
                body: tx("Omron-based automated gates at the Surabaya port", "Gate otomatis berbasis Omron di Pelabuhan Surabaya"),
              },
            ],
          },
        ],
      },
      {
        id: "rollouts",
        title: tx("Rolling out to dozens of ports", "Rollout ke puluhan pelabuhan"),
        blocks: [
          {
            type: "prose",
            paragraphs: [
              tx(
                "A rollout across dozens of ports isn't one deployment repeated. Every harbor is its own environment, with its own hardware, network conditions and operating hours. These are the habits I'd recommend to anyone doing the same.",
                "Rollout ke puluhan pelabuhan bukanlah satu deployment yang diulang-ulang. Setiap pelabuhan adalah lingkungan tersendiri, dengan perangkat keras, kondisi jaringan, dan jam operasional masing-masing. Berikut kebiasaan yang saya sarankan bagi siapa pun yang melakukan hal serupa.",
              ),
            ],
          },
          {
            type: "cards",
            items: [
              {
                icon: "layers",
                title: tx("Same steps at every port", "Langkah yang sama di setiap pelabuhan"),
                body: tx(
                  "Install and configure each harbor the same way, so a problem at one port can be compared with a known-good one.",
                  "Pasang dan konfigurasikan setiap pelabuhan dengan cara yang sama, agar masalah di satu pelabuhan bisa dibandingkan dengan pelabuhan yang sudah berjalan baik.",
                ),
              },
              {
                icon: "shield",
                title: tx("Verify before handover", "Verifikasi sebelum serah terima"),
                body: tx(
                  "Run a ticket through the counter application end to end before the shift that depends on it begins.",
                  "Jalankan satu tiket melalui aplikasi loket dari awal sampai akhir sebelum shift yang bergantung padanya dimulai.",
                ),
              },
              {
                icon: "flag",
                title: tx("Work around the timetable", "Menyesuaikan jadwal kapal"),
                body: tx(
                  "Ports run on departures. Changes go into the quieter windows, never the other way round.",
                  "Pelabuhan berjalan mengikuti jadwal keberangkatan. Perubahan dilakukan di jam yang lebih sepi, bukan sebaliknya.",
                ),
              },
            ],
          },
        ],
      },
      {
        id: "stability",
        title: tx("Keeping trip.ferizy.com stable", "Menjaga trip.ferizy.com tetap stabil"),
        blocks: [
          {
            type: "prose",
            paragraphs: [
              tx(
                "For `trip.ferizy.com`, the job was high availability and operational stability, so online ticket transactions stay smooth and uninterrupted. Most of that work is unglamorous: watching the system, catching problems before passengers do, and resolving production incidents quickly and calmly when they happen.",
                "Untuk `trip.ferizy.com`, tugasnya adalah menjaga ketersediaan tinggi dan stabilitas operasional, agar transaksi tiket online tetap lancar tanpa gangguan. Sebagian besar pekerjaan itu tidak glamor: memantau sistem, menemukan masalah sebelum penumpang merasakannya, dan menyelesaikan insiden produksi dengan cepat dan tenang saat terjadi.",
              ),
            ],
          },
          {
            type: "cards",
            items: [
              {
                icon: "monitor",
                title: tx("Know what normal looks like", "Pahami kondisi normal"),
                body: tx(
                  "Ferry travel has strong seasonal peaks, such as the Lebaran holidays. A baseline makes it obvious whether a spike is demand or a fault.",
                  "Perjalanan kapal punya puncak musiman yang tajam, seperti libur Lebaran. Dengan baseline, mudah terlihat apakah lonjakan berasal dari permintaan atau gangguan.",
                ),
              },
              {
                icon: "terminal",
                title: tx("Calm, visible incident handling", "Penanganan insiden yang tenang dan terlihat"),
                body: tx(
                  "Say what's affected, what's being done and when the next update comes, even before the cause is known.",
                  "Sampaikan apa yang terdampak, apa yang sedang dikerjakan, dan kapan kabar berikutnya, bahkan sebelum penyebabnya diketahui.",
                ),
              },
              {
                icon: "shield",
                title: tx("Fix the cause afterwards", "Perbaiki akar masalah sesudahnya"),
                body: tx(
                  "Restoring service is step one. The follow-up that stops it recurring is the part that raises availability.",
                  "Memulihkan layanan adalah langkah pertama. Tindak lanjut yang mencegahnya terulang adalah bagian yang benar-benar menaikkan ketersediaan.",
                ),
              },
            ],
          },
        ],
      },
      {
        id: "barrier-gates",
        title: tx("Integrating Omron barrier gates in Surabaya", "Integrasi barrier gate Omron di Surabaya"),
        blocks: [
          {
            type: "prose",
            paragraphs: [
              tx(
                "At the Surabaya port I installed, configured and integrated Omron-based automated barrier gate hardware. Field integration is where software meets physical constraints: a gate has to open for a valid ticket, stay closed otherwise, and behave predictably when something upstream is unavailable.",
                "Di Pelabuhan Surabaya saya memasang, mengonfigurasi, dan mengintegrasikan perangkat keras barrier gate otomatis berbasis Omron. Integrasi lapangan adalah titik pertemuan perangkat lunak dengan batasan fisik: gate harus terbuka untuk tiket yang valid, tetap tertutup jika tidak, dan berperilaku dapat diprediksi saat ada sistem di hulu yang tidak tersedia.",
              ),
            ],
          },
          {
            type: "checklist",
            title: tx("What carries over to any hybrid system", "Yang berlaku untuk sistem hybrid mana pun"),
            items: [
              tx("Keep the critical path close to the people who are waiting", "Dekatkan jalur kritis dengan orang-orang yang sedang menunggu"),
              tx("Make every deployment repeatable and verifiable", "Buat setiap deployment dapat diulang dan diverifikasi"),
              tx("Plan for peaks as events, not surprises", "Rencanakan masa puncak sebagai agenda, bukan kejutan"),
              tx("Agree on hardware failure modes before go-live", "Sepakati mode kegagalan perangkat keras sebelum go-live"),
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
  pdfPath: "cv-adriansyah.pdf",
  name: "Adriansyah Prasetya Nugraha",
  role: tx("Systems & Application Operations Engineer", "Engineer Sistem & Operasional Aplikasi"),
  location: "Semarang, Indonesia",
  summary: tx(
    "Systems & Application Operations Engineer with production experience at PT ASDP Indonesia Ferry (Persero): high-availability national ferry ticketing (trip.ferizy.com), hybrid cloud and harbor server deployments across dozens of ports, and Omron barrier gate integration. Alongside operations, I build native C/C++ software, including static recompilation of legacy 32-bit iPad and Mac games into native Windows and Linux releases.",
    "Engineer Sistem & Operasional Aplikasi dengan pengalaman produksi di PT ASDP Indonesia Ferry (Persero): tiket kapal penyeberangan nasional berketersediaan tinggi (trip.ferizy.com), deployment hybrid cloud dan server pelabuhan di puluhan pelabuhan, serta integrasi barrier gate Omron. Di luar operasional, saya membangun perangkat lunak native C/C++, termasuk rekompilasi statis game iPad dan Mac 32-bit lama menjadi rilis Windows dan Linux native.",
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
      items: ["C / C++", "Win32 API", tx("Static recompilation", "Rekompilasi statis"), "ARMv7 / x86", "OpenGL ES"],
    },
    {
      id: "web",
      title: tx("Web, cloud & tools", "Web, cloud & tools"),
      items: ["Cloudflare Workers & D1", "PHP & CodeIgniter", "JavaScript / React", "Unity (C#)", "GameMaker", "Git & CI/CD"],
    },
  ],
};
