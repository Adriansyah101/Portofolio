# Adriansyah Prasetya Nugraha — 3D Developer Portfolio

Portfolio site for a Systems, Graphics & Reverse Engineering developer. It showcases the
**GTRacingMotorAcademyRecomp** and **Gangstar: Miami Vindication** native PC ports.

**Stack:** React 19 + Vite · Three.js via `@react-three/fiber`, `@react-three/drei` and
`@react-three/postprocessing` · GSAP + ScrollTrigger · Tailwind CSS v4 · react-countup ·
react-responsive · EmailJS.

The 3D scenes (hero developer room, tech-stack emblems, contact desk) and the project previews
are drawn in code. The site needs no image or model files to render, and it makes no runtime
requests to third-party CDNs for assets: the tech-card reflections come from a procedural
`<Lightformer>` environment rather than a downloaded HDRI. The only external requests are
Google Fonts (with system-font fallbacks) and EmailJS when the contact form is submitted.

## Getting started

```bash
npm install
cp .env.example .env   # then add your EmailJS keys
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
| `VITE_APP_EMAILJS_SERVICE_ID`  | yes\*    | EmailJS service ID                                            |
| `VITE_APP_EMAILJS_TEMPLATE_ID` | yes\*    | EmailJS template ID (variables: `{{name}}`, `{{email}}`, `{{message}}`) |
| `VITE_APP_EMAILJS_PUBLIC_KEY`  | yes\*    | EmailJS public key                                            |
| `VITE_GITHUB_USERNAME`         | no       | GitHub username used for repository links                     |
| `VITE_GANGSTAR_REPO`           | no       | Exact repo name of the Gangstar port, for direct repo and release links |
| `VITE_TWITTER_HANDLE`          | no       | X/Twitter handle, without the `@`                             |

\* If the EmailJS keys are missing, the form shows a friendly "not configured" message.

If `VITE_GITHUB_USERNAME` is empty, the username is taken from the `*.github.io` hostname.
Outside GitHub Pages, links fall back to GitHub search pages, so every link works.

## Deploying to GitHub Pages

1. Push this project to a GitHub repository on the `main` branch.
2. In **Settings → Pages**, set **Source** to **GitHub Actions**.
3. In **Settings → Secrets and variables → Actions**:
   - Add **secrets** `VITE_APP_EMAILJS_SERVICE_ID`, `VITE_APP_EMAILJS_TEMPLATE_ID` and
     `VITE_APP_EMAILJS_PUBLIC_KEY`.
   - Optionally add **variables** `VITE_GANGSTAR_REPO`, `VITE_TWITTER_HANDLE` and
     `VITE_GITHUB_USERNAME`. The username defaults to the repository owner.
4. Every push to `main` runs [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml),
   which builds the site and publishes `dist/` to `https://<username>.github.io/<repo-name>/`.

`vite.config.js` uses `base: "./"`, so all asset paths are relative and work under any
repository sub-path.

## Adding your own screenshots and models

### Gameplay screenshots

`public/images/` is already in the repo (kept by an empty `.gitkeep`). To replace the SVG
artwork on a project card with a real capture:

1. Save the screenshot with the exact filename below.
2. Set the matching `image` value in `src/constants/index.js`.

| Project card                         | File                              | Set in constants                          |
| ------------------------------------ | --------------------------------- | ----------------------------------------- |
| GTRacingMotorAcademyRecomp (large)   | `public/images/gtracing-pc.png`   | `projects[0].image = "images/gtracing-pc.png"`   |
| Gangstar: Miami Vindication PC port  | `public/images/gangstar-mv-pc.png` | `projects[1].image = "images/gangstar-mv-pc.png"` |
| OpenGL ES architecture (optional)    | e.g. `public/images/pipeline.png` | `projects[2].image = "images/pipeline.png"`      |

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
├── constants/index.js        # All content, links and asset hooks
├── components/
│   ├── NavBar.jsx, Button.jsx, AnimatedCounter.jsx, TitleHeader.jsx, GlowCard.jsx
│   ├── Icons.jsx, ProjectPreview.jsx
│   ├── HeroModels/           # Hero canvas, lights, particles, procedural room
│   └── Models/               # Desk parts, contact scene, glTF loader, studio env, emblems
├── sections/                 # Hero, Showcase, Logos, Features, Experience, TechStack,
│                             # Highlights, Contact, Footer
├── utils/                    # Asset URL + inline-code helpers
└── index.css                 # Tailwind v4 theme, custom utilities and keyframes
```
