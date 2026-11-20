import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

import TitleHeader from "../components/TitleHeader.jsx";
import GlowCard from "../components/GlowCard.jsx";
import { Icon } from "../components/Icons.jsx";
import { CompanyEmblem } from "../components/CompanyEmblems.jsx";
import { expCards } from "../constants/index.js";
import { renderInlineCode, softBreak } from "../utils/text.jsx";

const ExperienceSection = () => {
  const sectionRef = useRef(null);

  useGSAP(
    () => {
      const root = sectionRef.current;

      root.querySelectorAll(".exp-glow").forEach((card) => {
        gsap.fromTo(
          card,
          { x: -100, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 1,
            ease: "power2.inOut",
            scrollTrigger: { trigger: card, start: "top 80%" },
          },
        );
      });

      root.querySelectorAll(".exp-text").forEach((text) => {
        gsap.fromTo(
          text,
          { x: 60, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: { trigger: text, start: "top 70%" },
          },
        );
      });

      // Each milestone's timeline line fills as you scroll past it.
      root.querySelectorAll(".exp-card-wrapper").forEach((wrapper) => {
        const progress = wrapper.querySelector(".timeline-progress");
        gsap.fromTo(
          progress,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
              trigger: wrapper,
              start: "top 60%",
              end: "bottom 50%",
              scrub: true,
            },
          },
        );
      });
    },
    { scope: sectionRef },
  );

  return (
    <section id="experience" ref={sectionRef} className="section-padding flex-center w-full xl:px-0">
      <div className="h-full w-full max-w-[1600px] px-5 md:px-20">
        <TitleHeader title="Career & Engineering Timeline" sub="Enterprise Ops + Open-Source Preservation" />

        <div className="relative mt-20 md:mt-32">
          <div className="relative z-50 space-y-16 xl:space-y-32">
            {expCards.map((card) => (
              <div key={card.title} className="exp-card-wrapper">
                <div className="exp-glow xl:w-2/6">
                  <GlowCard
                    card={card}
                    rating={0}
                    header={
                      <div className="exp-card-head">
                        {card.logo ? (
                          <CompanyEmblem logo={card.logo} className="size-12 flex-none" />
                        ) : (
                          <span className="exp-card-icon" aria-hidden="true">
                            <Icon name={card.icon} className="size-6" />
                          </span>
                        )}
                        <div className="min-w-0">
                          <p className={`exp-kind ${card.logo ? "is-pro" : ""}`}>{card.kind}</p>
                          <p className="mt-1 text-sm font-medium wrap-break-word text-white-50">{softBreak(card.project)}</p>
                        </div>
                      </div>
                    }
                  >
                    <div className="flex flex-col gap-3">
                      <p className="font-mono text-xs tracking-widest text-blue-50 uppercase">
                        {card.platformsLabel ?? "Stack & Targets"}
                      </p>
                      <ul className="flex flex-wrap gap-2">
                        {card.platforms.map((platform) => (
                          <li key={platform} className="tag-pill">
                            {platform}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </GlowCard>
                </div>

                <div className="xl:w-4/6">
                  <div className="flex items-stretch gap-5 md:gap-10 xl:gap-14">
                    <div className="flex flex-col items-center">
                      <div className={`timeline-logo ${card.logo ? "has-emblem" : ""}`}>
                        {card.logo ? (
                          <CompanyEmblem logo={card.logo} shape="circle" className="size-full" title={card.project} />
                        ) : (
                          <Icon name={card.icon} className="size-6 md:size-7" />
                        )}
                      </div>
                      <div className="timeline-track">
                        <div className="timeline-progress" />
                      </div>
                    </div>

                    <div className="exp-text min-w-0 flex-1 pb-6 wrap-break-word">
                      <p className={`exp-kind ${card.logo ? "is-pro" : ""} mb-3`}>{card.kind}</p>
                      <h3 className="text-2xl font-semibold md:text-3xl">{card.title}</h3>
                      <p className="mt-2 text-lg font-medium text-accent-cyan">{softBreak(card.project)}</p>
                      <p className="my-4 flex items-center gap-2 font-mono text-sm text-white-50/70">
                        <span className="inline-block size-2 rounded-full bg-accent-violet" />
                        {card.period}
                      </p>
                      <p className="text-blue-50 italic">{card.logo ? "Key Responsibilities & Achievements" : "Highlights"}</p>
                      <ul className="mt-4 ms-5 flex list-disc flex-col gap-4 text-white-50/80 marker:text-accent-violet">
                        {card.responsibilities.map((item) => (
                          <li key={item} className="text-lg leading-relaxed">
                            {renderInlineCode(item)}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
