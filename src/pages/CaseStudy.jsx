import { Link, useParams } from "react-router-dom";

import ProjectPreview from "../components/ProjectPreview.jsx";
import { ArrowLeftIcon, ArrowRightIcon, Icon } from "../components/Icons.jsx";
import { PlatformBadge, ProjectTags } from "../components/ProjectBits.jsx";
import { CaseStudyBlock } from "../components/CaseStudyBlocks.jsx";
import NotFound from "./NotFound.jsx";
import { useLocalized } from "../context/LanguageContext.jsx";
import { caseStudies, projects, routes, ui } from "../constants/index.js";
import { format } from "../utils/i18n.js";
import { renderInlineCode, softBreak } from "../utils/text.jsx";
import { scrollToId, usePageTitle } from "../utils/hooks.js";

/** `/projects/:slug`: deep-dive technical breakdown of one preservation port. */
const CaseStudy = () => {
  const { slug } = useParams();
  const studies = useLocalized(caseStudies);
  const allProjects = useLocalized(projects);
  const { caseStudy: text, projects: projectText, meta, common } = useLocalized(ui);
  const study = studies[slug];
  usePageTitle(study ? format(text.pageTitle, { title: study.title }) : meta.notFound);

  if (!study) return <NotFound />;

  const project = allProjects.find((item) => item.id === study.projectId);
  const [nextSlug, next] = Object.entries(studies).find(([key]) => key !== slug);
  const nextProject = allProjects.find((item) => item.id === next.projectId);

  return (
    <article className="page-enter" key={slug}>
      {/* Header */}
      <header className="page-header">
        <div className="hero-bg" aria-hidden="true" />
        <div className="relative z-10 mx-auto grid w-full max-w-[1600px] grid-cols-1 items-center gap-10 xl:grid-cols-2 xl:gap-16">
          <div className="min-w-0">
            <nav aria-label={text.breadcrumb} className="mb-6">
              <ol className="flex flex-wrap items-center gap-2 text-sm text-blue-50">
                <li>
                  <Link to={routes.projects} className="hover:text-white">
                    {projectText.pageTitle}
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li aria-current="page" className="text-white-50">
                  {study.title}
                </li>
              </ol>
            </nav>
            <p className="page-eyebrow">{study.eyebrow}</p>
            <h1 className="page-title wrap-break-word">{study.title}</h1>
            <p className="mt-3 font-mono text-sm wrap-break-word text-accent-cyan">{softBreak(study.repoName)}</p>
            <p className="page-description">{study.summary}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              {study.links.map((link, index) => (
                <a
                  key={link.href}
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
          </div>

          <div className="relative min-w-0">
            <ProjectPreview art={study.art} image={study.image} alt={format(projectText.previewAlt, { title: study.title })} className="aspect-8/5" />
            <PlatformBadge project={project} className="absolute top-3 left-3" />
          </div>
        </div>
      </header>

      {/* At a glance */}
      <section className="padding-x-lg mt-12" aria-label={text.atAGlance}>
        <dl className="mx-auto grid w-full max-w-[1600px] grid-cols-2 gap-4 xl:grid-cols-4">
          {study.facts.map((fact) => (
            <div key={fact.id} className="card-border min-w-0 rounded-xl p-5 md:p-6">
              <dt className="font-mono text-[11px] tracking-widest text-blue-50 uppercase">{fact.label}</dt>
              <dd className="mt-2 font-semibold wrap-break-word text-white-50 md:text-lg">{fact.value}</dd>
            </div>
          ))}
        </dl>
        <div className="mx-auto mt-6 w-full max-w-[1600px]">
          <ProjectTags tags={project.tags} />
        </div>
      </section>

      {/* On this page */}
      <nav className="padding-x-lg mt-12" aria-label={common.onThisPage}>
        <div className="jump-nav mx-auto w-full max-w-[1600px]">
          {study.sections.map((section, index) => (
            <button key={section.id} type="button" className="jump-chip" onClick={() => scrollToId(section.id)}>
              <span className="font-mono text-accent-cyan">{String(index + 1).padStart(2, "0")}</span>
              {section.title}
            </button>
          ))}
        </div>
      </nav>

      {/* Sections */}
      {study.sections.map((section, index) => (
        <section key={section.id} id={section.id} className="case-section" aria-labelledby={`${section.id}-title`}>
          <div className="mx-auto w-full max-w-[1600px]">
            <p className="font-mono text-sm text-accent-cyan">{String(index + 1).padStart(2, "0")}</p>
            <h2 id={`${section.id}-title`} className="mt-2 text-3xl font-semibold md:text-4xl">
              {section.title}
            </h2>
            {section.intro && (
              <p className="mt-4 max-w-3xl text-lg leading-relaxed text-body">{renderInlineCode(section.intro)}</p>
            )}
            <div className="mt-10 flex flex-col gap-8">
              {section.blocks.map((block, blockIndex) => (
                <CaseStudyBlock key={`${section.id}-${blockIndex}`} block={block} />
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* Next */}
      <section className="padding-x-lg mt-20 md:mt-28" aria-label={text.more}>
        <div className="mx-auto grid w-full max-w-[1600px] grid-cols-1 gap-5 md:grid-cols-2">
          <Link to={routes.projects} className="next-card group">
            <ArrowLeftIcon className="size-5 text-blue-50 transition-transform group-hover:-translate-x-1" />
            <span>
              <span className="block font-mono text-xs tracking-widest text-blue-50 uppercase">{text.backTo}</span>
              <span className="mt-1 block text-xl font-semibold">{text.allProjects}</span>
            </span>
          </Link>
          <Link to={`${routes.projects}/${nextSlug}`} className="next-card group justify-between">
            <span className="min-w-0">
              <span className="block font-mono text-xs tracking-widest text-blue-50 uppercase">
                {text.next} · {nextProject.platform}
              </span>
              <span className="mt-1 block text-xl font-semibold wrap-break-word">{next.title}</span>
            </span>
            <ArrowRightIcon className="size-5 flex-none text-accent-cyan transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </section>
    </article>
  );
};

export default CaseStudy;
