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
  - **32-Bit Software Preservation** (two binary loaders, each with its own case study):
    - **32-Bit iOS (ARMv7) Binary Loader**: static binary recompilation and an OpenGL ES to desktop
      OpenGL 2.1 runtime bridge that run 32-bit iPad Mach-O binaries natively on Windows and Linux x86
      (repository `GTRacingMotorAcademy-PC-Port`).
    - **32-Bit Mac (i386) Native Loader**: a user-space Mach-O loader and ABI/syscall shim that run
      32-bit OS X binaries natively on Windows and Linux x86 without CPU emulation (repository
      `GangstarMiamiVindication-PC-Port`).

Three case studies (`/projects/niskala`, `/projects/ios-loader`, `/projects/mac-loader`) and three
engineering notes have a Copy Link button and Previous / Next links; notes also show a reading time.
The retired port pages `/projects/gt-racing` and `/projects/gangstar` redirect to the matching
loader case study (`legacyRedirects`).

Copy rules: the words "game" and "gaming" are not used anywhere in the site copy (EN or ID), there
are no emojis, and there are no unverified percentage claims. Technical facts in the case studies
and notes follow each repository's README, FIXES.md, PATCHNOTES.md, docs and source code.

The whole site is **bilingual (English / Bahasa Indonesia)** and has a **dark (default) and light
theme**. Both choices are remembered in `localStorage`.

**Stack:** React 19 + Vite · React Router (`BrowserRouter`) · Three.js via `@react-three/fiber`,
`@react-three/drei` and `@react-three/postprocessing` · GSAP · Tailwind CSS v4 ·
react-countup · react-responsive.

The 3D scenes (hero systems workstation, contact desk) and the project previews are drawn in
code. The site needs no model files to render, and it makes no runtime requests to third-party
CDNs for assets. The only external requests are
Google Fonts (Inter for prose, JetBrains Mono for versions, years and tech badges, with system-font
fallbacks) and the GitHub REST API (profile stats and latest release tags, cached in
`sessionStorage` for 30 minutes, with built-in fallbacks when it is unreachable). The contact page has no form: it links to Gmail's
compose window (`mail.google.com`) and `mailto:`, so it needs no keys or mail service.

## Pages

| Route                 | Page                     | Contents                                                                 |
| --------------------- | ------------------------ | ------------------------------------------------------------------------ |
| `/`                     | Home                     | Command center: name, role, bio, four-metric strip and calls to action beside the interactive 3D workstation (its screens and tablet open Journey, Projects, Notes and Contact; hover-only tooltips and three camera presets: Overview, Desk Setup, Telemetry) |
| `/projects`             | Projects                 | Two separate groups (Original Software with Niskala Utilities featured first, 32-Bit Software Preservation with the two loaders, each with "Read Case Study" and GitHub / release icon links) with `All / Original Software / 32-Bit Preservation` filters (`?category=original` or `preservation`). Live release badges and monochrome architecture schematics; "All" is a one-screen overview; the preservation view adds the legacy-vs-port comparison as tabs |
| `/projects/niskala`     | Niskala Utilities        | Modular architecture, PathGuard / RegistryGuard / PrivilegeScope, `.reg` backups, the closed DISM / SFC / netsh / ipconfig / chkdsk command list, release |
| `/projects/ios-loader`  | 32-bit iOS loader        | Why it stopped running, legacy-vs-native table, hybrid loading pipeline (recompiled code, Mach-O data), fixed address layout, symbol and stub resolution, the ARM calling-convention bridge, port engineering and leaderboard architecture, repository, release and SHA-256 verification |
| `/projects/mac-loader`  | 32-bit Mac loader        | Why it stopped running, legacy-vs-native table, memory layout and low-range patches, dyld binding without dyld, Darwin / Cocoa / OpenGL shims, i386 ABI and TLS compatibility, engineering fixes, repository, release and SHA-256 verification |
| `/journey`              | Journey                  | Executive summary of the PT ASDP role beside tabs: Operational Breakdown (three compact cards and the Field Documentation photo strip with its lightbox) · Enterprise Stack (four CSS 3D tilt cards); both tabs fit one viewport from 1280 × 800 |
| `/notes`, `/notes/:slug` | Engineering Notes     | Note list and reading pane side by side on desktop; list and article pages on phones. Three notes, each Context → Engineering Approach → Outcome |
| `/contact`              | Contact & Community      | Gmail contact card (compose, copy, mailto), warm 3D desk scene, GitHub links |

Routing uses `BrowserRouter`, so URLs are clean (`https://adriansyahpn.com/projects/niskala`).
GitHub Pages has no rewrite rules: a direct load or refresh of a client route finds no file and is
answered with `404.html`. The build writes `dist/404.html` as a copy of `index.html` (the
`spa-404-fallback` plugin in [`vite.config.js`](vite.config.js)), so the app boots on any route and
React Router renders it. The HTTP status of that first response is 404 (GitHub Pages' behaviour);
visitors see the page as normal. Old links from the hash-routing days (`/#/projects`) are rewritten
to their clean URL before the router starts ([`src/main.jsx`](src/main.jsx)). In-page jumps use
buttons that scroll, not `#anchor` links, so the browser history stays clean.

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
Asset paths start at `/`, so they resolve on nested routes such as `/projects/niskala`. Absolute URLs for crawlers (`canonical`, `og:*`, `twitter:*` in
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
  projects link straight to GitHub (`View Source on GitHub`); Niskala Utilities also has a case
  study. Preservation projects (the two loaders) have a case study and a comparison table
  (`comparison`); `iconOnly: true` on a link shows it as a compact icon button on the card.
- `releaseSources`: the repositories whose latest GitHub release drives the version badges and
  release links ([`src/hooks/useGitHubReleases.js`](src/hooks/useGitHubReleases.js)), with a
  fallback tag and URL each. In project and case-study data, a link with `release: "<project id>"`
  points at that release, and `{tag}` in a label, target, fact or table cell becomes the tag.
- `caseStudies`: the three deep-dive pages, in reading order (Previous / Next follow it). Each
  section is a list of typed blocks (`timeline`, `cards`, `flow`, `architecture`, `table`
  (`plain: true` for text cells), `comparison`, `checklist`, `code`, `links`, `prose`). A link with
  `to` is an internal route, used to cross-link the loaders and the notes.
- `heroContent` and `counterItems`: the Home page. A counter item with `text` (e.g.
  `"Dozens of ports"`) shows that text instead of an animated number; the project count is every
  project (4 original, 2 loaders).
- `expCards` and `stackDomains`: the Journey page (work experience only). `breakdown` on an
  `expCards` entry feeds the Operational Breakdown tab and the résumé; `stackDomains` are the four
  tilt cards of the Enterprise Stack tab (`TiltCard.jsx`). On desktop windows shorter than 860px
  the tags on both tabs are hidden so everything fits without scrolling. Set `logo` on an
  `expCards` entry to a key of `brandLogos`.
- `fieldDocs`: the Field Documentation photos on `/journey` (`public/images/journey/`), with place and
  caption. The files are web exports in which every face except the site owner's is blurred and
  all EXIF/GPS data is removed; process any new photo the same way before adding it.
- `engineeringNotes`: the notes, each with three sections (Context, Engineering Approach, Outcome).
- `brandLogos`: official company/product logos, read from `public/images/` with root paths
  (`/images/asdp.png`, `/images/ferizy.svg`). Each lists fallback files in order (png → svg); if
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
| VR Simulation Airport                | `public/images/vr-airport.jpg`     | `originalProjects[2].image = "images/vr-airport.jpg"`         |
| War Plane 1945                       | `public/images/war-plane-1945.jpg` | `originalProjects[3].image = "images/war-plane-1945.jpg"`     |

- **Aspect ratio:** 16:9. Recommended size is 1920×1080 (at least 1280×720).
- **Format:** `.png` or `.jpg`/`.webp` (update the extension in the constant to match). Keep each
  file under about 500 KB so the page stays fast.
- The cards crop with `object-fit: cover` around the centre, so keep the HUD or key subject
  away from the outer edges.
- The `image` values default to `null` so the live site never requests a file that is not
  there. If a configured file fails to load, the SVG artwork is shown instead.
- Niskala Utilities has no screenshot by default: its artwork is the app's own splash screen
  (`SplashWindow.xaml`: brand gradient, NiskalaMark monogram and wordmark) redrawn as SVG.
- SIDAF, VR Simulation Airport, War Plane 1945 and the two loaders show monochrome architecture
  schematics ([`src/components/Schematics.jsx`](src/components/Schematics.jsx)) so every card has
  the same visual weight. The VR and War Plane video thumbnails are still in `public/images/`
  (`.jpg`) if you prefer them; the demo videos play from the schematic either way.

### 3D models

| What                          | Constant                    | Example                  |
| ----------------------------- | --------------------------- | ------------------------ |
| Hero room model (`.glb`)      | `heroScene.modelPath`       | `"models/hero-room.glb"` |
| Contact desk model (`.glb`)   | `contactScene.modelPath`    | `"models/desk.glb"`      |

Paths are relative to `public/`. If a model is missing or fails to load, the built-in
procedural mesh is shown instead.

## Project structure

```
src/
├── App.jsx                   # BrowserRouter, lazy routes, persistent NavBar + Footer
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
│   ├── ReaderBits.jsx        # Copy Link button and Previous / Next links for case studies and notes
│   ├── Schematics.jsx        # Monochrome architecture schematics for project cards
│   ├── AnimatedCounter.jsx, Icons.jsx, ProjectPreview.jsx, Resume.jsx, Lightbox.jsx, TiltCard.jsx
│   ├── HeroModels/           # Hero canvas, lights, avatar, hotspots, procedural room
│   └── Models/               # Desk parts, contact scene, glTF loader
├── sections/                 # Hero, JourneyPanels (summary, breakdown and photos, stack tilt cards),
│                             # Contact, Footer
├── utils/                    # i18n (tx/localize/format), asset URL, inline-code and page-title helpers
└── index.css                 # Tailwind v4 theme, custom utilities and keyframes
```
