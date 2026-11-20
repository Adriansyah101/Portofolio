import { lazy, Suspense } from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import NavBar from "./components/NavBar.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx";
import Footer from "./sections/Footer.jsx";

gsap.registerPlugin(ScrollTrigger, useGSAP);

// Each page is its own chunk: the archive page never downloads Three.js, and
// leaving a 3D page unmounts its <Canvas>, which disposes the WebGL context.
const Home = lazy(() => import("./pages/Home.jsx"));
const Projects = lazy(() => import("./pages/Projects.jsx"));
const CaseStudy = lazy(() => import("./pages/CaseStudy.jsx"));
const Journey = lazy(() => import("./pages/Journey.jsx"));
const ContactPage = lazy(() => import("./pages/ContactPage.jsx"));
const NotFound = lazy(() => import("./pages/NotFound.jsx"));

const PageFallback = () => (
  <div className="flex-center min-h-screen" role="status" aria-label="Loading page">
    <span className="size-8 animate-spin rounded-full border-2 border-white/10 border-t-accent-cyan" />
  </div>
);

/**
 * HashRouter keeps every route under `#/…`, so reloading any page on GitHub
 * Pages always requests `index.html` and never hits a 404.
 */
const App = () => (
  <HashRouter>
    <ScrollToTop />
    <NavBar />
    <main id="main">
      <Suspense fallback={<PageFallback />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:slug" element={<CaseStudy />} />
          <Route path="/journey" element={<Journey />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </main>
    <Footer />
  </HashRouter>
);

export default App;
