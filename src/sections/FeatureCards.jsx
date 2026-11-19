import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

import { Icon } from "../components/Icons.jsx";
import { abilities } from "../constants/index.js";

const FeatureCards = () => {
  const sectionRef = useRef(null);

  useGSAP(
    () => {
      gsap.fromTo(
        ".feature-card",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 85%" },
        },
      );
    },
    { scope: sectionRef },
  );

  return (
    <section ref={sectionRef} className="padding-x-lg w-full" aria-label="Core engineering strengths">
      <div className="grid-3-cols mx-auto max-w-[1600px]">
        {abilities.map(({ icon, title, desc }) => (
          <div key={title} className="feature-card card-border flex flex-col gap-4 rounded-xl p-8">
            <div className="flex-center size-14 rounded-full bg-black-50 text-accent-cyan">
              <Icon name={icon} className="size-7" />
            </div>
            <h3 className="text-2xl font-semibold text-white-50">{title}</h3>
            <p className="text-lg leading-relaxed text-white-50/70">{desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeatureCards;
