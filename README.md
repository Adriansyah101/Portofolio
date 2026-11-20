# Adriansyah Prasetya Nugraha: Systems & Application Operations Portfolio

Multi-page 3D portfolio of **Adriansyah Prasetya Nugraha** ([`adriansyah101`](https://github.com/adriansyah101)),
a Systems & Application Operations Engineer based in Semarang, Indonesia.

- **Home (`/`)** presents the engineering identity: high-availability national ticketing
  infrastructure (`trip.ferizy.com`), hybrid cloud/on-premise port deployments, industrial
  hardware integration and low-level binary recompilation. It has no game titles or game artwork.
- **Journey (`/journey`)** is professional work experience only: Business Application Operational
  Support Staff at **PT ASDP Indonesia Ferry (Persero)** (2024 – 2026).
- **Projects (`/projects`)** holds five open-source projects in two separate categories:
  - **Original Projects**: **SIDAF** (PHP / CodeIgniter information system), **VR Simulation Airport**
    (Unity / C#, Oculus Quest 2) and **War Plane 1945** (GameMaker arcade air combat game).
  - **32-Bit Game Preservation Projects**:
    - **GTRacingMotorAcademyRecomp**: GT Racing: Motor Academy, from 32-bit iPad (ARMv7 / PowerVR) to a native Windows release (`v1.0.0`).
    - **Gangstar: Miami Vindication**: from a 32-bit x86 Mac binary to native Windows x86 and Linux (`V1.0.0`).

The whole site is **bilingual (English / Bahasa Indonesia)** and has a **dark (default) and light
theme**. Both choices are remembered in `localStorage`.

**Stack:** React 19 + Vite · React Router (`HashRouter`) · Three.js via `@react-three/fiber`,
`@react-three/drei` and `@react-three/postprocessing` · GSAP + ScrollTrigger · Tailwind CSS v4 ·
react-countup · react-responsive.

The 3D scenes (hero systems workstation, tech-stack emblems, contact desk) and the project previews
are drawn in code. The site needs no image or model files to render, and it makes no runtime
requests to third-party CDNs for assets: the tech-card reflections come from a procedural
`<Lightformer>` environment rather than a downloaded HDRI. The only external requests are
Google Fonts (with system-font fallbacks). The contact page has no form: it links to Gmail's
compose window (`mail.google.com`) and `mailto:`, so it needs no keys or mail service.

## Pages

| Route                 | Page                     | Contents                                                                 |
| --------------------- | ------------------------ | ------------------------------------------------------------------------ |
| `#/`                  | Home                     | 3D systems workstation hero, operations metrics, featured work (PT ASDP + preservation archive summary), tech marquee, core capabilities, contact teaser |
| `#/projects`          | Projects                 | Two separate sections (Original Projects, 32-Bit Game Preservation Projects) with `All / Original / 32-Bit Preservation` tabs (`?category=original` or `preservation`), plus the "Legacy 32-Bit iPad/Mac vs. Native Windows/Linux Port" tables |
| `#/projects/gt-racing`| GT Racing case study     | Why it was lost, recompilation & graphics pipeline, leaderboard architecture, controls & release info |
| `#/projects/gangstar` | Gangstar case study      | Why it was lost, Windows & Linux porting, V1.0.0 release packaging and checksum verification |
| `#/journey`           | Journey                  | Work experience at PT ASDP, six interactive 3D enterprise & systems tech-stack cards, operational impact highlights |
| `#/contact`           | Contact & Community      | Gmail contact card (compose, copy, mailto), warm 3D desk scene, GitHub links |

Routing uses `HashRouter`, so every URL looks like `https://adriansyah101.github.io/Portofolio/#/projects`.
Reloading or sharing any page always loads `index.html`, so GitHub Pages never returns a 404.
Because the hash belongs to the router, in-page jumps use buttons that scroll, not `#anchor` links.

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
| `VITE_GITHUB_USERNAME`         | no       | GitHub account for all links. Defaults to `adriansyah101`     |
| `VITE_GANGSTAR_REPO`           | no       | Exact repo name of the Gangstar port, for direct repo and release links |
| `VITE_TWITTER_HANDLE`          | no       | X/Twitter handle, without the `@`. The footer shows an X icon only when set |

Without `VITE_GANGSTAR_REPO`, Gangstar links open your GitHub profile (`https://github.com/adriansyah101`).

## Deploying to GitHub Pages

1. Push this project to a GitHub repository on the `main` branch.
2. In **Settings → Pages**, set **Source** to **GitHub Actions**.
3. Optionally, in **Settings → Secrets and variables → Actions**, add the **variables**
   `VITE_GANGSTAR_REPO`, `VITE_TWITTER_HANDLE` and `VITE_GITHUB_USERNAME`.
4. Every push to `main` runs [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml),
   which builds the site and publishes `dist/` to `https://<username>.github.io/<repo-name>/`.

`vite.config.js` uses `base: "./"`, so all asset paths are relative and work under any
repository sub-path.

## Editing content

All copy lives in [`src/constants/index.js`](src/constants/index.js). Every visible string is
written once in both languages as `tx("English", "Bahasa Indonesia")`. A plain string (a product
name or a version tag) shows the same text in both languages. Components read content through
`useLocalized(...)`, which swaps in the active language.

- `ui`: interface copy (navigation, buttons, page headers, form labels and placeholders,
  validation and status messages, page titles). `{name}` placeholders are filled by `format()`.
- `originalProjects` and `preservationProjects`: the two catalog categories (`projects` combines
  them). `projectCategories` defines the tabs and `projectSections` the section headings. Original
  projects link straight to GitHub (`View Source on GitHub →`). Preservation projects also have a
  case study and a comparison table (`comparison`).
- `caseStudies`: the two deep-dive pages. Each section is a list of typed blocks (`timeline`,
  `cards`, `flow`, `architecture`, `table`, `checklist`, `code`, `links`, `prose`).
- `caseStudies["gt-racing"]`: the default control bindings table. Keep it in sync with your release.
- `heroContent`, `words`, `counterItems`, `featuredWork`, `logoItems` and `abilities`: the Home page.
  A counter item with `text` (e.g. `"Dozens"`) shows that word instead of an animated number.
- `expCards`, `techStackIcons` and `highlights`: the Journey page (work experience only). Set `logo`
  on an `expCards` entry (or `brand` on a highlight) to a key of `brandLogos`.
- `brandLogos`: official company/product logos, read from `public/images/` with relative paths
  (`./images/asdp.png`, `./images/ferizy.svg`). Each lists fallback files in order (png → svg); if
  none loads, the drawn SVG emblem or a text wordmark is shown, never a broken image. Logos sit on a
  light pill so their brand colours stay readable on the dark theme.

## Adding your own screenshots and models

### Gameplay screenshots

`public/images/` is already in the repo (kept by an empty `.gitkeep`). To replace the SVG
artwork on a project card with a real capture:

1. Save the screenshot with the exact filename below.
2. Set the matching `image` value in `src/constants/index.js`. Also set it on the case study
   (`caseStudies[...].image`) to use it in the case-study header.

| Project card                         | File                              | Set in constants                          |
| ------------------------------------ | --------------------------------- | ----------------------------------------- |
| SIDAF                                | `public/images/sidaf.png`          | `originalProjects[0].image = "images/sidaf.png"`              |
| VR Simulation Airport                | `public/images/vr-airport.png`     | `originalProjects[1].image = "images/vr-airport.png"`         |
| War Plane 1945                       | `public/images/war-plane-1945.png` | `originalProjects[2].image = "images/war-plane-1945.png"`     |
| GTRacingMotorAcademyRecomp           | `public/images/gtracing-pc.png`    | `preservationProjects[0].image = "images/gtracing-pc.png"`    |
| Gangstar: Miami Vindication PC port  | `public/images/gangstar-mv-pc.png` | `preservationProjects[1].image = "images/gangstar-mv-pc.png"` |

- **Aspect ratio:** 16:9. Recommended size is 1920×1080 (at least 1280×720).
- **Format:** `.png` or `.jpg`/`.webp` (update the extension in the constant to match). Keep each
  file under about 500 KB so the page stays fast.
- The cards crop with `object-fit: cover` around the centre, so keep the HUD or key subject
  away from the outer edges.
- The `image` values default to `null` so the live site never requests a file that is not
  there. If a configured file fails to load, the SVG artwork is shown instead.

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
├── pages/                    # Home, Projects, CaseStudy, Journey, ContactPage, NotFound
├── components/
│   ├── NavBar.jsx            # NavLinks with active underline + mobile slide-down menu
│   ├── Preferences.jsx       # EN | ID pill and Sun/Moon theme toggle
│   ├── ScrollToTop.jsx       # Resets scroll and refreshes ScrollTrigger on route change
│   ├── PageHeader.jsx, ProjectBits.jsx, CaseStudyBlocks.jsx
│   ├── Button.jsx, AnimatedCounter.jsx, TitleHeader.jsx, GlowCard.jsx, Icons.jsx, ProjectPreview.jsx
│   ├── HeroModels/           # Hero canvas, lights, particles, procedural room
│   └── Models/               # Desk parts, contact scene, glTF loader, studio env, emblems
├── sections/                 # Hero, FeaturedWork, Logos, Features, ContactPreview, Experience,
│                             # TechStack, Highlights, Contact, Footer
├── utils/                    # i18n (tx/localize/format), asset URL, inline-code and page-title helpers
└── index.css                 # Tailwind v4 theme, custom utilities and keyframes
```
