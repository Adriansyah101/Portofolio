import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

import TitleHeader from "../components/TitleHeader.jsx";
import ProjectPreview from "../components/ProjectPreview.jsx";
import { Icon } from "../components/Icons.jsx";
import { projects } from "../constants/index.js";
import { renderInlineCode, softBreak } from "../utils/text.jsx";

const ProjectLinks = ({ links }) => (
  <div className="flex flex-wrap gap-3">
    {links.map((link, index) => (
      <a
        key={link.href + link.label}
        href={link.href}
        target="_blank"
        rel="noopener noreferrer"
        className={`project-link ${index === 0 ? "primary" : "secondary"}`}
      >
        <Icon name={link.icon} className="size-4" />
        {link.label}
      </a>
    ))}
  </div>
);

const ProjectTags = ({ tags }) => (
  <ul className="flex flex-wrap gap-2" aria-label="Technologies">
    {tags.map((tag) => (
      <li key={tag} className="tag-pill">
        {tag}
      </li>
    ))}
  </ul>
);

const ProjectCard = ({ project, primary = false }) => (
  <article className="project-card">
    <ProjectPreview
      art={project.art}
      image={project.image}
      alt={`${project.title} preview`}
      className={primary ? "aspect-8/5 xl:aspect-auto xl:h-[56vh]" : "aspect-8/5 xl:aspect-auto xl:h-[26vh]"}
    />
    <div className="flex flex-col gap-4">
      <h3 className={`font-semibold wrap-break-word ${primary ? "text-2xl md:text-3xl lg:text-4xl" : "text-xl md:text-2xl"}`}>
        {softBreak(project.title)}
      </h3>
      <p className={`leading-relaxed text-white-50/75 ${primary ? "md:text-lg" : ""}`}>
        {renderInlineCode(project.description)}
      </p>
      <ProjectTags tags={project.tags} />
      <ProjectLinks links={project.links} />
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
        <TitleHeader title="Featured GitHub Projects" sub="Native PC Ports & Graphics Systems" />

        <div className="showcase-layout">
          <div className="xl:col-span-3">{primary && <ProjectCard project={primary} primary />}</div>
          <div className="flex flex-col gap-10 xl:col-span-2">
            {secondary.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShowcaseSection;
