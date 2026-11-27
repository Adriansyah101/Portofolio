import { lazy, Suspense } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

import NavBar from "./components/NavBar.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx";
import Footer from "./sections/Footer.jsx";
import { useLocalized } from "./context/LanguageContext.jsx";
import { legacyRedirects, ui } from "./constants/index.js";

gsap.registerPlugin(useGSAP);

// Each page is its own chunk: the archive page never downloads Three.js, and
// leaving a 3D page unmounts its <Canvas>, which disposes the WebGL context.
const Home = lazy(() => import("./pages/Home.jsx"));
const Projects = lazy(() => import("./pages/Projects.jsx"));
const CaseStudy = lazy(() => import("./pages/CaseStudy.jsx"));
const Journey = lazy(() => import("./pages/Journey.jsx"));
const Notes = lazy(() => import("./pages/Notes.jsx"));
const ContactPage = lazy(() => import("./pages/ContactPage.jsx"));
const NotFound = lazy(() => import("./pages/NotFound.jsx"));

const PageFallback = () => {
  const { common } = useLocalized(ui);
  return (
    <div className="flex-center min-h-screen flex-1 lg:min-h-0" role="status" aria-label={common.loading}>
      <span className="size-8 animate-spin rounded-full border-2 border-white/10 border-t-accent-cyan" />
    </div>
  );
};

/**
 * Clean URLs (`/projects`, `/notes/:slug`). GitHub Pages answers a direct load
 * of any of them with `404.html`, a copy of `index.html` written at build time
 * (vite.config.js), so the app boots and renders the route.
 */
const App = () => (
  <BrowserRouter>
    <ScrollToTop />
    {/* From 1024px up the shell is one viewport tall: navbar, the page, a one-line footer. */}
    <div className="app-shell">
      <NavBar />
      <main id="main" className="app-main">
        <Suspense fallback={<PageFallback />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<Projects />} />
            {/* Retired port pages, folded into the loader case studies. */}
            {Object.entries(legacyRedirects).map(([from, to]) => (
              <Route key={from} path={from} element={<Navigate to={to} replace />} />
            ))}
            <Route path="/projects/:slug" element={<CaseStudy />} />
            <Route path="/journey" element={<Journey />} />
            <Route path="/notes" element={<Notes />} />
            <Route path="/notes/:slug" element={<Notes />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </div>
  </BrowserRouter>
);

export default App;
