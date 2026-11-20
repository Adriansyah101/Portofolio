import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

import TitleHeader from "../components/TitleHeader.jsx";
import { Icon } from "../components/Icons.jsx";
import { abilities as abilitySource, ui } from "../constants/index.js";
import { useLocalized } from "../context/LanguageContext.jsx";
import { renderInlineCode } from "../utils/text.jsx";

const FeatureCards = () => {
  const sectionRef = useRef(null);
  const abilities = useLocalized(abilitySource);
  const { capabilities } = useLocalized(ui);

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
    <section ref={sectionRef} id="capabilities" className="padding-x-lg w-full">
      <div className="mx-auto max-w-[1600px]">
        <TitleHeader title={capabilities.title} sub={capabilities.sub} />
        <div className="grid-3-cols mt-14">
          {abilities.map(({ id, icon, title, desc }) => (
            <div key={id} className="feature-card card-border flex flex-col gap-4 rounded-xl p-8">
              <div className="flex-center size-14 rounded-full bg-black-50 text-accent-cyan">
                <Icon name={icon} className="size-7" />
              </div>
              <h3 className="text-2xl font-semibold text-white-50">{title}</h3>
              <p className="text-lg leading-relaxed text-white-50/70">{renderInlineCode(desc)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureCards;
