import { Link, useParams } from "react-router-dom";

import ProjectPreview from "../components/ProjectPreview.jsx";
import { ArrowLeftIcon, Icon } from "../components/Icons.jsx";
import { ComparisonTable, PlatformBadge, ProjectTags, ReleaseBadge } from "../components/ProjectBits.jsx";
import { CaseStudyBlock } from "../components/CaseStudyBlocks.jsx";
import { CopyLinkButton, PagerNav } from "../components/ReaderBits.jsx";
import NotFound from "./NotFound.jsx";
import { useLocalized } from "../context/LanguageContext.jsx";
import { caseStudies, projects, routes, ui } from "../constants/index.js";
import { useRelease, useResolvedLinks, withTag } from "../hooks/useGitHubReleases.js";
import { format } from "../utils/i18n.js";
import { renderInlineCode, softBreak } from "../utils/text.jsx";
import { scrollToId, usePageTitle } from "../utils/hooks.js";

/** A header action: an internal route (`to`) or an external link. */
const StudyLink = ({ link, primary }) => {
  const className = `project-link ${primary ? "primary" : "secondary"}`;
  const content = (
    <>
      <Icon name={link.icon} className="size-4 flex-none" />
      {link.label}
    </>
  );
  return link.to ? (
    <Link to={link.to} className={className}>
      {content}
    </Link>
  ) : (
    <a href={link.href} target="_blank" rel="noopener noreferrer" className={className}>
      {content}
    </a>
  );
};

/**
 * `/projects/:slug`: technical specification of one project (Niskala
 * Utilities and the two 32-bit binary loaders). From 1024px up
 * the intro (back link, title, live release badge, Copy Link, summary, links,
 * artwork) stays on the left and the facts, numbered sections and the
 * Previous / Next links read in a pane on the right that scrolls on its own;
 * below 1024px it is one scrolling page in the same order.
 */
const CaseStudy = () => {
  const { slug } = useParams();
  const studies = useLocalized(caseStudies);
  const allProjects = useLocalized(projects);
  const { caseStudy: text, projects: projectText, meta, common } = useLocalized(ui);
  const study = studies[slug];
  usePageTitle(study ? format(text.pageTitle, { title: study.title }) : meta.notFound);
  const release = useRelease(study?.projectId);
  const studyLinks = useResolvedLinks(study?.links);

  if (!study) return <NotFound />;

  const project = allProjects.find((item) => item.id === study.projectId);
  const order = Object.entries(studies).map(([key, item]) => ({
    to: `${routes.projects}/${key}`,
    title: item.title,
    meta: allProjects.find((entry) => entry.id === item.projectId)?.platform,
  }));
  const position = Object.keys(studies).indexOf(slug);

  return (
    <article className="page-shell page-enter" key={slug}>
      <div className="page-frame">
        <div className="case-layout">
          <header className="case-intro scroll-pane">
            <Link to={routes.projects} className="back-link group">
              <ArrowLeftIcon className="size-4 transition-transform group-hover:-translate-x-0.5" />
              {text.allProjects}
            </Link>
            <p className="page-eyebrow">{study.eyebrow}</p>
            <h1 className="page-title wrap-break-word">{study.title}</h1>
            <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-2 lg:mt-2">
              <p className="min-w-0 font-mono text-sm wrap-break-word text-accent-cyan lg:text-xs xl:text-sm">{softBreak(study.repoName)}</p>
              <ReleaseBadge projectId={study.projectId} detailed />
              <CopyLinkButton />
            </div>
            <p className="page-description">{study.summary}</p>
            <div className="mt-8 flex flex-wrap gap-3 lg:mt-5">
              {studyLinks.map((link, index) => (
                <StudyLink key={(link.to ?? link.href) + index} link={link} primary={index === 0} />
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
                  // Screenshots and the loader schematics carry their own caption up top, so the badge moves to the open bottom corner.
                  <PlatformBadge
                    project={project}
                    className={`pointer-events-none absolute left-3 z-10 ${study.image || project.category === "preservation" ? "bottom-3" : "top-3"}`}
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
                      <dd className="mt-2 font-mono text-sm font-medium wrap-break-word text-white-50 md:text-base lg:text-sm">
                        {withTag(fact.value, release)}
                      </dd>
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
                    {section.blocks.map((block, blockIndex) =>
                      block.type === "comparison" ? (
                        <ComparisonTable key={`${section.id}-${blockIndex}`} project={project} />
                      ) : (
                        <CaseStudyBlock key={`${section.id}-${blockIndex}`} block={block} />
                      ),
                    )}
                  </div>
                </section>
              ))}

              <PagerNav items={order} index={position} label={text.more} className="mt-16 lg:mt-12" />
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

export default CaseStudy;
