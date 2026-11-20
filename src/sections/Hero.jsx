import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

import Button from "../components/Button.jsx";
import AnimatedCounter from "../components/AnimatedCounter.jsx";
import HeroExperience from "../components/HeroModels/HeroExperience.jsx";
import { Icon } from "../components/Icons.jsx";
import { heroContent, words } from "../constants/index.js";
import { renderInlineCode } from "../utils/text.jsx";

const Hero = () => {
  const sectionRef = useRef(null);

  useGSAP(
    () => {
      gsap.fromTo(
        ".hero-text > *",
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.2, duration: 1, ease: "power2.inOut" },
      );
      gsap.fromTo(
        ".hero-reveal",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.15, duration: 0.9, delay: 0.6, ease: "power2.out" },
      );
    },
    { scope: sectionRef },
  );

  // The list is rendered twice so the CSS slider can loop without a jump.
  const sliderWords = [...words, ...words];

  return (
    <section id="hero" ref={sectionRef} className="relative overflow-hidden">
      <div className="hero-bg" aria-hidden="true" />

      <div className="hero-layout">
        <header className="hero-header">
          <p className="hero-eyebrow hero-reveal">
            <span className="size-1.5 flex-none rounded-full bg-emerald-400/80" aria-hidden="true" />
            {heroContent.eyebrow}
          </p>
          <div className="hero-text">
            <h1>{heroContent.headline}</h1>
            <p className="hero-focus">
              <span className="sr-only">
                {heroContent.focusLabel} {words.map((word) => word.text).join(", ")}
              </span>
              <span aria-hidden="true">{heroContent.focusLabel} </span>
              <span className="slide" aria-hidden="true">
                <span className="slide-wrapper">
                  {sliderWords.map((word, index) => (
                    <span key={`${word.text}-${index}`} className="slide-item">
                      <span className="slide-icon">
                        <Icon name={word.icon} className="size-full" strokeWidth={2.4} />
                      </span>
                      <span className="slide-text">{word.text}</span>
                    </span>
                  ))}
                </span>
              </span>
            </p>
          </div>

          <p className="hero-bio hero-reveal">{renderInlineCode(heroContent.bio)}</p>

          <div className="hero-reveal">
            <Button text={heroContent.ctaText} className="h-12 w-64 md:h-16 md:w-80" id="button" targetId="work" />
          </div>
        </header>

        <figure className="hero-3d-layout" aria-label="Interactive 3D systems workstation">
          <HeroExperience />
        </figure>
      </div>

      <AnimatedCounter />
    </section>
  );
};

export default Hero;
