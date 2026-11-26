# Adriansyah Prasetya Nugraha: Systems & Application Operations Portfolio

Multi-page 3D portfolio of **Adriansyah Prasetya Nugraha** ([`Adriansyah101`](https://github.com/Adriansyah101)),
a Systems & Application Operations Engineer based in Semarang, Indonesia.

- **Home (`/`)**: name, role (Systems & Application Operations Engineer · Windows Systems &
  Binary Recompilation), a two-sentence bio, four factual metrics and the 3D workstation.
- **Journey (`/journey`)** is professional work experience only: Business Application Operational
  Support Staff at **PT ASDP Indonesia Ferry (Persero)** (2024 – 2026).
- **Projects (`/projects`)** holds six open-source projects in two separate categories:
  - **Original Software**: **Niskala Utilities** (featured: Windows WinUI & CLI system utility,
    C# / .NET), **SIDAF** (PHP / CodeIgniter information system), **VR Simulation Airport**
    (Unity / C#, Oculus Quest 2) and **War Plane 1945** (interactive 2D application).
  - **32-Bit Software Preservation** (native PC software ports):
    - **GTRacingMotorAcademy-PC-Port**: static binary recompilation of a 32-bit iPad (ARMv7) application to native Windows and Linux x86.
    - **GangstarMiamiVindication-PC-Port**: a custom Mach-O loader that runs a 32-bit Mac (i386) application natively on Windows and Linux x86.

Copy rules: the words "game" and "gaming" are not used anywhere in the site copy (EN or ID), there
are no emojis, and there are no unverified percentage claims. Technical facts in the case studies
and notes follow each repository's README, FIXES.md and PATCHNOTES.md.

The whole site is **bilingual (English / Bahasa Indonesia)** and has a **dark (default) and light
theme**. Both choices are remembered in `localStorage`.

**Stack:** React 19 + Vite · React Router (`HashRouter`) · Three.js via `@react-three/fiber`,
`@react-three/drei` and `@react-three/postprocessing` · GSAP · Tailwind CSS v4 ·
react-countup · react-responsive.

The 3D scenes (hero systems workstation, tech-stack emblems, contact desk) and the project previews
are drawn in code. The site needs no image or model files to render, and it makes no runtime
requests to third-party CDNs for assets: the tech-card reflections come from a procedural
`<Lightformer>` environment rather than a downloaded HDRI. The only external requests are
Google Fonts (Inter for prose, JetBrains Mono for versions, years and tech badges, with system-font
fallbacks) and the GitHub REST API (profile stats and latest release tags, cached in
`sessionStorage` for 30 minutes, with built-in fallbacks when it is unreachable). The contact page has no form: it links to Gmail's
compose window (`mail.google.com`) and `mailto:`, so it needs no keys or mail service.

## Pages

| Route                 | Page                     | Contents                                                                 |
| --------------------- | ------------------------ | ------------------------------------------------------------------------ |
| `#/`                  | Home                     | Command center: name, role, bio, four-metric strip and calls to action beside the interactive 3D workstation (its screens and tablet open Journey, Projects, Notes and Contact; hover-only tooltips, no particles or speech bubbles) |
| `#/projects`          | Projects                 | Two separate groups (Original Software with Niskala Utilities featured first, 32-Bit Software Preservation) with `All / Original Software / 32-Bit Preservation` filters (`?category=original` or `preservation`). Live release badges; "All" is a one-screen overview; the preservation view adds the legacy-vs-port comparison as tabs |
| `#/projects/gt-racing`| GT Racing case study     | Back link, live release badge, why it stopped running, legacy-vs-port table, key engineering work, leaderboard architecture, default controls, release and checksum verification |
| `#/projects/gangstar` | Gangstar case study      | Back link, live release badge, why it stopped running, legacy-vs-port table, Mach-O loader approach, key engineering fixes, release and checksum verification |
| `#/journey`           | Journey                  | Executive summary of the PT ASDP role beside tabs: Operational Breakdown · Enterprise Stack · 3D Tech Cards |
| `#/notes`, `#/notes/:slug` | Engineering Notes   | Note list and reading pane side by side on desktop; list and article pages on phones. Each note is Context → Engineering Approach → Outcome |
| `#/contact`           | Contact & Community      | Gmail contact card (compose, copy, mailto), warm 3D desk scene, GitHub links |

Routing uses `HashRouter`, so every URL looks like `https://adriansyahpn.com/#/projects`.
Reloading or sharing any page always loads `index.html`, so GitHub Pages never returns a 404.
Because the hash belongs to the router, in-page jumps use buttons that scroll, not `#anchor` links.

### Layout: viewport-locked desktop, scrolling phones

From 1024px wide (`lg`) the app shell (`.app-shell`) is exactly one viewport tall: a slim navbar,
the page, and a one-line footer, with no page scrollbar. Every page is split into panels that fill
that space; a panel whose content is taller than the screen (a long note or case study, the 3D tech
cards on a short window) scrolls on its own (`.scroll-pane`). Below 1024px nothing is locked: the
page scrolls normally, panels stack, and the 3D canvases are 340px tall (420px from 640px).
Grids inside panels use container queries (`@xl:` …) so they follow the panel's width, not the
window's.

Each page is lazy-loaded. Pages without 3D (projects and case studies) never download Three.js.
Leaving a 3D page unmounts its `<Canvas>`, which disposes the renderer and releases the WebGL
context. Every canvas caps its device pixel ratio at `dpr={[1, 1.5]}`.

## Theme and language

| Setting  | Values           | Default | Stored as (`localStorage`) | Where                             |
| -------- | ---------------- | ------- | -------------------------- | --------------------------------- |
| Theme    | `dark` / `light` | `dark`  | `portfolio-theme`          | `src/context/ThemeContext.jsx`    |
| Language | `en` / `id`      | `en`    | `portfolio-lang`           | `src/context/LanguageContext.jsx` |

- Both toggles sit in the navbar on desktop and in the mobile menu.
- A small inline script in `index.html` applies the saved theme and language before the first
  paint, so the page never flashes the wrong theme.
- **Surfaces** are flat: `#111215` (dark) or `#ffffff` (light) with 1px hairline borders
  (`rgba(255,255,255,0.08)` / `rgba(15,23,42,0.08)`). No glows, radial backgrounds or shadows.
- **Colours** are CSS custom properties. `@theme` in `src/index.css` holds the dark values and
  `:root[data-theme="light"]` re-points the same tokens. In light mode `--color-white` is the ink
  colour, so `white/8` borders and `hover:text-white` keep working on light surfaces. Anything that
  must stay literally white (the logo pills) uses `#fff`.
- **3D scenes** keep the same models in both themes. The room shell, backdrop and studio lights
  come from `src/components/Models/scenePalettes.js` and ease to the new palette over about half a
  second (`useThemeTween`). The contact scene's `stage` colour must match `--contact-stage` in
  `index.css`.

### Catatan singkat (Bahasa Indonesia)

- Tema gelap adalah default. Pilihan tema dan bahasa disimpan di `localStorage`
  (`portfolio-theme`, `portfolio-lang`).
- Semua teks ada di `src/constants/index.js` dalam bentuk `tx("English", "Bahasa Indonesia")`.
  Untuk mengubah atau menambah teks, edit kedua bahasa di tempat yang sama.
- Teks antarmuka (tombol, label, judul halaman) ada di objek `ui`.
- Alamat email kontak ada di `contactEmail` (`src/constants/index.js`). Halaman Kontak dan footer
  membuka jendela tulis Gmail ke alamat itu.

## Getting started

```bash
npm install
cp .env.example .env   # optional link settings
npm run dev
```

| Script            | Purpose                                 |
| ----------------- | --------------------------------------- |
| `npm run dev`     | Start the dev server with hot reload    |
| `npm run build`   | Build the production site into `dist/`  |
| `npm run preview` | Serve the production build locally      |

## Environment variables

| Variable                       | Required | Description                                                   |
| ------------------------------ | -------- | ------------------------------------------------------------- |
| `VITE_GITHUB_USERNAME`         | no       | GitHub account for all links. Defaults to `Adriansyah101`     |
| `VITE_TWITTER_HANDLE`          | no       | X/Twitter handle, without the `@`. The footer shows an X icon only when set |

## Deploying to GitHub Pages

1. Push this project to a GitHub repository on the `main` branch.
2. In **Settings → Pages**, set **Source** to **GitHub Actions**.
3. Optionally, in **Settings → Secrets and variables → Actions**, add the **variables**
   `VITE_TWITTER_HANDLE` and `VITE_GITHUB_USERNAME`.
4. In **Settings → Pages → Custom domain**, enter `adriansyahpn.com`, save, and tick
   **Enforce HTTPS** once the certificate is issued. With the GitHub Actions source this setting
   is what binds the domain; `public/CNAME` (copied to `dist/CNAME`) keeps the same value in
   every build.
5. At the DNS provider, point the apex `adriansyahpn.com` at GitHub Pages: `A` records
   `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153` (and optionally
   the `AAAA` records `2606:50c0:8000::153` … `8003::153`), plus a `CNAME` for `www` →
   `adriansyah101.github.io`.
6. Every push to `main` runs [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml),
   which builds the site and publishes `dist/` to `https://adriansyahpn.com/`.

`vite.config.js` uses `base: "/"` because the site is served from the root of the custom domain.
Routing is hash-based, so the document is always `/index.html` and root-relative asset paths
resolve on every route. Absolute URLs for crawlers (`canonical`, `og:*`, `twitter:*` in
`index.html`) and `siteUrl` in `src/constants/index.js` all use `https://adriansyahpn.com/`.

## Editing content

All copy lives in [`src/constants/index.js`](src/constants/index.js). Every visible string is
written once in both languages as `tx("English", "Bahasa Indonesia")`. A plain string (a product
name or a version tag) shows the same text in both languages. Components read content through
`useLocalized(...)`, which swaps in the active language.

- `ui`: interface copy (navigation, buttons, page headers, form labels and placeholders,
  validation and status messages, page titles). `{name}` placeholders are filled by `format()`.
- `originalProjects` and `preservationProjects`: the two catalog categories (`projects` combines
  them), in display order. `featured: true` marks the top project (Niskala Utilities).
  `projectCategories` defines the tabs and `projectSections` the section headings. Original
  projects link straight to GitHub (`View Source on GitHub`). Preservation projects also have a
  case study and a comparison table (`comparison`).
- `releaseSources`: the repositories whose latest GitHub release drives the version badges and
  release links ([`src/hooks/useGitHubReleases.js`](src/hooks/useGitHubReleases.js)), with a
  fallback tag and URL each. In project and case-study data, a link with `release: "<project id>"`
  points at that release, and `{tag}` in a label, target, fact or table cell becomes the tag.
- `caseStudies`: the two deep-dive pages. Each section is a list of typed blocks (`timeline`,
  `cards`, `flow`, `architecture`, `table`, `comparison`, `checklist`, `code`, `links`, `prose`).
- `caseStudies["gt-racing"]`: the default control bindings table. Keep it in sync with your release.
- `heroContent` and `counterItems`: the Home page. A counter item with `text` (e.g.
  `"Dozens of ports"`) shows that text instead of an animated number; the project count follows
  `projects.length`.
- `expCards` and `techStackIcons`: the Journey page (work experience only). `breakdown` on an
  `expCards` entry feeds the Operational Breakdown tab and the résumé. `icon` on a
  `techStackIcons` entry is its flat icon in the Enterprise Stack tab. Set `logo`
  on an `expCards` entry to a key of `brandLogos`.
- `engineeringNotes`: the notes, each with three sections (Context, Engineering Approach, Outcome).
- `brandLogos`: official company/product logos, read from `public/images/` with relative paths
  (`./images/asdp.png`, `./images/ferizy.svg`). Each lists fallback files in order (png → svg); if
  none loads, the drawn SVG emblem or a text wordmark is shown, never a broken image. Logos sit on a
  light pill so their brand colours stay readable on the dark theme.

## Adding your own screenshots and models

### Screenshots

`public/images/` is already in the repo (kept by an empty `.gitkeep`). To replace the SVG
artwork on a project card with a real capture:

1. Save the screenshot with the exact filename below.
2. Set the matching `image` value in `src/constants/index.js`. Also set it on the case study
   (`caseStudies[...].image`) to use it in the case-study header.

| Project card                         | File                              | Set in constants                          |
| ------------------------------------ | --------------------------------- | ----------------------------------------- |
| Niskala Utilities                    | `public/images/niskala.png`        | `originalProjects[0].image = "images/niskala.png"`            |
| SIDAF                                | `public/images/sidaf.png`          | `originalProjects[1].image = "images/sidaf.png"`              |
| VR Simulation Airport                | `public/images/vr-airport.png`     | `originalProjects[2].image = "images/vr-airport.png"`         |
| War Plane 1945                       | `public/images/war-plane-1945.png` | `originalProjects[3].image = "images/war-plane-1945.png"`     |
| GT Racing: Motor Academy PC port     | `public/images/gtracing-pc.png`    | `preservationProjects[0].image = "images/gtracing-pc.png"`    |
| Gangstar: Miami Vindication PC port  | `public/images/gangstar-mv-pc.png` | `preservationProjects[1].image = "images/gangstar-mv-pc.png"` |

- **Aspect ratio:** 16:9. Recommended size is 1920×1080 (at least 1280×720).
- **Format:** `.png` or `.jpg`/`.webp` (update the extension in the constant to match). Keep each
  file under about 500 KB so the page stays fast.
- The cards crop with `object-fit: cover` around the centre, so keep the HUD or key subject
  away from the outer edges.
- The `image` values default to `null` so the live site never requests a file that is not
  there. If a configured file fails to load, the SVG artwork is shown instead.
- Niskala Utilities has no screenshot by default: its artwork is the app's own splash screen
  (`SplashWindow.xaml`: brand gradient, NiskalaMark monogram and wordmark) redrawn as SVG.

### 3D models

| What                          | Constant                    | Example                  |
| ----------------------------- | --------------------------- | ------------------------ |
| Hero room model (`.glb`)      | `heroScene.modelPath`       | `"models/hero-room.glb"` |
| Contact desk model (`.glb`)   | `contactScene.modelPath`    | `"models/desk.glb"`      |
| Tech-stack emblem (`.glb`)    | `techStackIcons[n].glbPath` | `"models/cpp.glb"`       |

Paths are relative to `public/`. If a model is missing or fails to load, the built-in
procedural mesh is shown instead.

## Project structure

```
src/
├── App.jsx                   # HashRouter, lazy routes, persistent NavBar + Footer
├── constants/index.js        # All bilingual content, UI copy, routes, links and asset hooks
├── context/                  # ThemeContext (dark/light) and LanguageContext (en/id)
├── hooks/useGitHubReleases.js # Latest GitHub release per repo (sessionStorage cache, fallbacks)
├── pages/                    # Home, Projects, CaseStudy, Journey, Notes, ContactPage, NotFound
├── components/
│   ├── NavBar.jsx            # NavLinks with active underline + mobile slide-down menu
│   ├── Preferences.jsx       # EN | ID pill and Sun/Moon theme toggle
│   ├── ScrollToTop.jsx       # Resets the window scroll on route change
│   ├── Tabs.jsx              # Accessible tab list + panel (Journey, project comparison)
│   ├── PageHeader.jsx, ProjectBits.jsx, CaseStudyBlocks.jsx, NoteBits.jsx, GitHubStats.jsx
│   ├── AnimatedCounter.jsx, Icons.jsx, ProjectPreview.jsx, Resume.jsx
│   ├── HeroModels/           # Hero canvas, lights, avatar, hotspots, procedural room
│   └── Models/               # Desk parts, contact scene, glTF loader, studio env, emblems
├── sections/                 # Hero, JourneyPanels (summary, breakdown, stack, 3D cards),
│                             # Contact, Footer
├── utils/                    # i18n (tx/localize/format), asset URL, inline-code and page-title helpers
└── index.css                 # Tailwind v4 theme, custom utilities and keyframes
```
