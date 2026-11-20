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

/**
 * `/projects/:slug`: deep-dive technical breakdown of one preservation port.
 * From 1024px up the intro (title, links, artwork) stays on the left and the
 * facts, numbered sections and next links read in a pane on the right that
 * scrolls on its own; below 1024px it is one scrolling page in the same order.
 */
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
    <article className="page-shell page-enter" key={slug}>
      <div className="hero-bg" aria-hidden="true" />
      <div className="page-frame">
        <div className="case-layout">
          <header className="case-intro scroll-pane">
            <nav aria-label={text.breadcrumb} className="mb-6 lg:mb-4">
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
            <p className="mt-3 font-mono text-sm wrap-break-word text-accent-cyan lg:mt-2 lg:text-xs xl:text-sm">
              {softBreak(study.repoName)}
            </p>
            <p className="page-description">{study.summary}</p>
            <div className="mt-8 flex flex-wrap gap-3 lg:mt-5">
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

            <div className="relative mt-10 min-w-0 lg:mt-6">
              <ProjectPreview
                art={study.art}
                image={study.image}
                imagePosition={project.imagePosition}
                video={project.video}
                alt={format(projectText.previewAlt, { title: study.title })}
                className="aspect-8/5 rounded-2xl"
                overlay={
                  // Screenshots carry their own title text up top, so the badge moves to the open bottom corner.
                  <PlatformBadge
                    project={project}
                    className={`pointer-events-none absolute left-3 z-10 ${study.image ? "bottom-3" : "top-3"}`}
                  />
                }
              />
            </div>
          </header>

          <div className="case-reader scroll-pane">
            <div className="@container">
              {/* At a glance */}
              <section aria-label={text.atAGlance}>
                <dl className="grid grid-cols-2 gap-4 @3xl:grid-cols-4 lg:gap-3">
                  {study.facts.map((fact) => (
                    <div key={fact.id} className="card-border min-w-0 rounded-xl p-5 md:p-6 lg:p-4">
                      <dt className="font-mono text-[11px] tracking-widest text-blue-50 uppercase">{fact.label}</dt>
                      <dd className="mt-2 font-semibold wrap-break-word text-white-50 md:text-lg lg:text-base">{fact.value}</dd>
                    </div>
                  ))}
                </dl>
                <div className="mt-5">
                  <ProjectTags tags={project.tags} />
                </div>
              </section>

              {/* On this page */}
              <nav className="jump-nav mt-10 lg:mt-6" aria-label={common.onThisPage}>
                {study.sections.map((section, index) => (
                  <button key={section.id} type="button" className="jump-chip" onClick={() => scrollToId(section.id)}>
                    <span className="font-mono text-accent-cyan">{String(index + 1).padStart(2, "0")}</span>
                    {section.title}
                  </button>
                ))}
              </nav>

              {study.sections.map((section, index) => (
                <section key={section.id} id={section.id} className="case-section" aria-labelledby={`${section.id}-title`}>
                  <p className="font-mono text-sm text-accent-cyan">{String(index + 1).padStart(2, "0")}</p>
                  <h2 id={`${section.id}-title`} className="mt-2 text-3xl font-semibold md:text-4xl lg:text-2xl xl:text-3xl">
                    {section.title}
                  </h2>
                  {section.intro && (
                    <p className="mt-4 max-w-3xl text-lg leading-relaxed text-body lg:text-base">{renderInlineCode(section.intro)}</p>
                  )}
                  <div className="mt-10 flex flex-col gap-8 lg:mt-6">
                    {section.blocks.map((block, blockIndex) => (
                      <CaseStudyBlock key={`${section.id}-${blockIndex}`} block={block} />
                    ))}
                  </div>
                </section>
              ))}

              {/* Next */}
              <nav className="mt-16 grid grid-cols-1 gap-5 @2xl:grid-cols-2 lg:mt-12" aria-label={text.more}>
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
              </nav>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

export default CaseStudy;
