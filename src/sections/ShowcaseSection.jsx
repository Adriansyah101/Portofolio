import { useRef } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

import TitleHeader from "../components/TitleHeader.jsx";
import ProjectPreview from "../components/ProjectPreview.jsx";
import { ArrowRightIcon } from "../components/Icons.jsx";
import { OriginTarget, PlatformBadge, ProjectActions, ProjectTags } from "../components/ProjectBits.jsx";
import { projects, routes } from "../constants/index.js";
import { renderInlineCode, softBreak } from "../utils/text.jsx";

const ProjectCard = ({ project, primary = false }) => (
  <article className="project-card">
    <ProjectPreview
      art={project.art}
      image={project.image}
      alt={`${project.shortTitle} preview`}
      className={primary ? "aspect-8/5 xl:aspect-auto xl:h-[56vh]" : "aspect-8/5 xl:aspect-auto xl:h-[26vh]"}
    />
    <div className="flex flex-col gap-4">
      <PlatformBadge project={project} className="w-fit" />
      <h3 className={`font-semibold wrap-break-word ${primary ? "text-2xl md:text-3xl lg:text-4xl" : "text-xl md:text-2xl"}`}>
        {softBreak(project.title)}
      </h3>
      <OriginTarget project={project} />
      <p className={`leading-relaxed text-white-50/75 ${primary ? "md:text-lg" : ""}`}>
        {renderInlineCode(project.description)}
      </p>
      <ProjectTags tags={project.tags} />
      <ProjectActions project={project} />
    </div>
  </article>
);

const ShowcaseSection = () => {
  const sectionRef = useRef(null);

  useGSAP(
    () => {
      gsap.fromTo(sectionRef.current, { opacity: 0 }, { opacity: 1, duration: 1.5 });

      sectionRef.current.querySelectorAll(".project-card").forEach((card, index) => {
        gsap.fromTo(
          card,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            delay: 0.25 * (index + 1),
            ease: "power2.out",
            scrollTrigger: { trigger: card, start: "top bottom-=100" },
          },
        );
      });
    },
    { scope: sectionRef },
  );

  const primary = projects.find((project) => project.layout === "primary");
  const secondary = projects.filter((project) => project.layout !== "primary");

  return (
    <section id="work" ref={sectionRef} className="section-padding flex-center w-full">
      <div className="w-full max-w-[1600px]">
        <TitleHeader title="Featured Preservation Projects" sub="Rescued from 32-Bit Obsolescence" />

        <div className="showcase-layout">
          <div className="xl:col-span-3">{primary && <ProjectCard project={primary} primary />}</div>
          <div className="flex flex-col gap-10 xl:col-span-2">
            {secondary.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>

        <div className="mt-14 flex justify-center">
          <Link to={routes.projects} className="project-link secondary">
            Explore the full Preservation Archive
            <ArrowRightIcon className="size-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ShowcaseSection;
