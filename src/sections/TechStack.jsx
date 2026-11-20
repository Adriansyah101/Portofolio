import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

import TitleHeader from "../components/TitleHeader.jsx";
import TechIcon from "../components/Models/TechLogos/TechIcon.jsx";
import { techStackIcons, ui } from "../constants/index.js";
import { useLocalized } from "../context/LanguageContext.jsx";
import { useTheme } from "../context/ThemeContext.jsx";

const TechStack = () => {
  const sectionRef = useRef(null);
  const icons = useLocalized(techStackIcons);
  const { techStack: text } = useLocalized(ui);
  const { theme } = useTheme();

  useGSAP(
    () => {
      gsap.fromTo(
        ".tech-card",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power2.inOut",
          stagger: 0.2,
          scrollTrigger: { trigger: sectionRef.current, start: "top center" },
        },
      );
    },
    { scope: sectionRef },
  );

  return (
    <section id="skills" ref={sectionRef} className="section-padding flex-center w-full">
      <div className="w-full max-w-[1600px] md:px-10">
        <TitleHeader title={text.title} sub={text.sub} />

        <div className="tech-grid">
          {icons.map((model) => (
            // Keyed by emblem so switching language never remounts the WebGL canvas.
            <div key={model.emblem} className="tech-card group">
              <div className="tech-card-animated-bg" />
              <div className="tech-card-content">
                <div className="tech-icon-wrapper">
                  <TechIcon model={model} theme={theme} />
                </div>
                <h3 className="text-xl font-semibold text-white-50">{model.name}</h3>
                <p className="mt-1 text-sm text-blue-50">{model.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechStack;
