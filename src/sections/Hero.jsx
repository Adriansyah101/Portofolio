import { useRef } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

import AnimatedCounter from "../components/AnimatedCounter.jsx";
import HeroExperience from "../components/HeroModels/HeroExperience.jsx";
import { ArrowRightIcon } from "../components/Icons.jsx";
import { CvButton } from "../components/Resume.jsx";
import { useLocalized } from "../context/LanguageContext.jsx";
import { useTheme } from "../context/ThemeContext.jsx";
import { heroContent as heroSource, routes, ui } from "../constants/index.js";

/**
 * Home command center. From 1024px up it is one split screen between the
 * navbar and the footer: name, role, a two-sentence bio, metrics and calls to
 * action on the left, the
 * full-height 3D workstation (whose screens and tablet open the other pages)
 * on the right. Below 1024px the two stack and the page scrolls.
 */
const Hero = () => {
  const sectionRef = useRef(null);
  const heroContent = useLocalized(heroSource);
  const { hero } = useLocalized(ui);
  const { theme } = useTheme();

  useGSAP(
    () => {
      gsap.fromTo(
        ".hero-text > *",
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.18, duration: 0.9, ease: "power2.inOut" },
      );
      gsap.fromTo(
        ".hero-reveal",
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.12, duration: 0.8, delay: 0.5, ease: "power2.out" },
      );
    },
    { scope: sectionRef },
  );

  return (
    <section id="hero" ref={sectionRef} className="hero">
      <header className="hero-header scroll-pane">
        <div className="hero-copy">
          <p className="hero-eyebrow hero-reveal">{heroContent.eyebrow}</p>
          <div className="hero-text">
            <h1>{heroContent.name}</h1>
            <p className="hero-role">
              <span>{heroContent.role}</span>
              <span className="sr-only"> · </span>
              <span className="hero-focus">{heroContent.focus}</span>
            </p>
          </div>

          <p className="hero-bio hero-reveal">{heroContent.bio}</p>

          <AnimatedCounter className="hero-reveal" />

          <div className="hero-actions hero-reveal">
            <Link to={routes.projects} className="cta-wrapper hero-cta">
              <div className="cta-button group">
                <div className="bg-circle" />
                <p className="cta-text">{heroContent.ctaProjects}</p>
                <div className="arrow-wrapper">
                  <ArrowRightIcon className="size-5" />
                </div>
              </div>
            </Link>
            <Link to={routes.journey} className="hero-secondary">
              {heroContent.ctaJourney}
              <ArrowRightIcon className="size-4" />
            </Link>
            <CvButton />
          </div>
        </div>
      </header>

      <figure className="hero-3d-layout" aria-label={hero.sceneLabel}>
        <HeroExperience theme={theme} />
      </figure>
    </section>
  );
};

export default Hero;
