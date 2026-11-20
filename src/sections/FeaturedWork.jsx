import { useRef } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

import TitleHeader from "../components/TitleHeader.jsx";
import { BrandLogo } from "../components/CompanyEmblems.jsx";
import { ArrowRightIcon, ExternalIcon, Icon } from "../components/Icons.jsx";
import { ProjectTags } from "../components/ProjectBits.jsx";
import { useLocalized } from "../context/LanguageContext.jsx";
import { featuredWork, ui } from "../constants/index.js";
import { renderInlineCode } from "../utils/text.jsx";

/** Value-over-label stat tiles shared by both cards. */
const Stats = ({ stats, className = "" }) => (
  <dl className={`work-stats ${className}`}>
    {stats.map((stat) => (
      <div key={stat.id} className="work-stat">
        <dt className="text-xs text-blue-50">{stat.label}</dt>
        <dd className="counter-number mb-0! text-2xl! md:text-3xl!">{stat.value}</dd>
      </div>
    ))}
  </dl>
);

/** Enterprise operations card: org header, summary and a three-node system topology. */
const EnterpriseCard = ({ work, topologyLabel }) => (
  <article className="work-card is-pro">
    <div className="flex items-center gap-4">
      <BrandLogo brand={work.logo} className="h-14 w-20" decorative />
      <div className="min-w-0">
        <p className="exp-kind is-pro">{work.kind}</p>
        <h3 className="mt-1 text-xl font-semibold wrap-break-word text-white-50 md:text-2xl">{work.org}</h3>
        <p className="mt-1 text-sm text-blue-50">
          {work.role} <span className="font-mono text-xs">· {work.period}</span>
        </p>
      </div>
    </div>

    <p className="text-lg leading-relaxed text-body">{renderInlineCode(work.summary)}</p>

    <ol className="topology" aria-label={topologyLabel}>
      {work.topology.map((node) => (
        <li key={node.icon} className="topology-node">
          <span className="topology-icon" aria-hidden="true">
            <Icon name={node.icon} className="size-5" />
          </span>
          <span className="min-w-0">
            <span className="block font-semibold text-white-50">{node.title}</span>
            <span className="mt-1 block text-sm leading-relaxed text-white-50/65">{renderInlineCode(node.body)}</span>
          </span>
        </li>
      ))}
    </ol>

    <Stats stats={work.stats} />

    <ProjectTags tags={work.tags} />

    <div className="mt-auto flex flex-wrap gap-3 pt-2">
      <Link to={work.cta.to} className="project-link primary">
        {work.cta.label}
        <ArrowRightIcon className="size-4" />
      </Link>
      <a href={work.link.href} target="_blank" rel="noreferrer" className="project-link secondary">
        {work.link.brand && <BrandLogo brand={work.link.brand} className="-my-1 -ml-2 h-7 w-[3.75rem] rounded-full! px-2! py-1!" decorative />}
        {work.link.label}
        <ExternalIcon className="size-4" />
      </a>
    </div>
  </article>
);

/**
 * Projects card: the 3 original + 2 preservation split, then the preservation
 * pipeline as systems engineering (no game titles or artwork on Home).
 */
const ProjectsCard = ({ work }) => (
  <article className="work-card is-sys">
    <div className="flex items-center gap-4">
      <span className="exp-card-icon size-14!" aria-hidden="true">
        <Icon name={work.icon} className="size-7" />
      </span>
      <div className="min-w-0">
        <p className="exp-kind">{work.kind}</p>
        <h3 className="mt-1 text-xl font-semibold wrap-break-word text-white-50 md:text-2xl">{work.org}</h3>
      </div>
    </div>

    <p className="text-lg leading-relaxed text-body">{work.summary}</p>

    <Stats stats={work.stats} className="sm:grid-cols-2!" />

    <div>
      <p className="mb-3 font-mono text-xs tracking-widest text-blue-50 uppercase">{work.pipelineLabel}</p>
      <ol className="pipeline" aria-label={work.pipelineLabel}>
        {work.pipeline.map((step, index) => (
          <li key={step.icon} className="pipeline-step">
            <span className="pipeline-index" aria-hidden="true">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className="topology-icon" aria-hidden="true">
              <Icon name={step.icon} className="size-5" />
            </span>
            <span className="min-w-0">
              <span className="block font-semibold text-white-50">{step.title}</span>
              <span className="block text-sm text-white-50/65">{step.body}</span>
            </span>
          </li>
        ))}
      </ol>
    </div>

    <ProjectTags tags={work.tags} />

    <div className="mt-auto pt-2">
      <Link to={work.cta.to} className="project-link secondary">
        {work.cta.label}
        <ArrowRightIcon className="size-4" />
      </Link>
    </div>
  </article>
);

/** Home "Featured Work": enterprise operations first, then the projects summary. */
const FeaturedWork = () => {
  const sectionRef = useRef(null);
  const work = useLocalized(featuredWork);
  const { featured } = useLocalized(ui);

  useGSAP(
    () => {
      gsap.fromTo(
        ".work-card",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.2,
          ease: "power2.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top bottom-=100" },
        },
      );
    },
    { scope: sectionRef },
  );

  return (
    <section id="work" ref={sectionRef} className="section-padding flex-center w-full">
      <div className="w-full max-w-[1600px]">
        <TitleHeader title={featured.title} sub={featured.sub} />

        <div className="mt-16 grid grid-cols-1 gap-8 xl:grid-cols-5">
          <div className="xl:col-span-3">
            <EnterpriseCard work={work.enterprise} topologyLabel={featured.topologyLabel} />
          </div>
          <div className="xl:col-span-2">
            <ProjectsCard work={work.projects} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedWork;
