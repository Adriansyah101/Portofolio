import { lazy, Suspense } from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

import NavBar from "./components/NavBar.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx";
import Footer from "./sections/Footer.jsx";
import { useLocalized } from "./context/LanguageContext.jsx";
import { ui } from "./constants/index.js";

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
 * HashRouter keeps every route under `#/…`, so reloading any page on GitHub
 * Pages always requests `index.html` and never hits a 404.
 */
const App = () => (
  <HashRouter>
    <ScrollToTop />
    {/* From 1024px up the shell is one viewport tall: navbar, the page, a one-line footer. */}
    <div className="app-shell">
      <NavBar />
      <main id="main" className="app-main">
        <Suspense fallback={<PageFallback />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<Projects />} />
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
  </HashRouter>
);

export default App;
