import { Link, useSearchParams } from "react-router-dom";

import PageHeader from "../components/PageHeader.jsx";
import ProjectPreview from "../components/ProjectPreview.jsx";
import { ArrowRightIcon, Icon } from "../components/Icons.jsx";
import { OriginTarget, PlatformBadge, ProjectActions, ProjectTags } from "../components/ProjectBits.jsx";
import { useLocalized } from "../context/LanguageContext.jsx";
import {
  originalProjects,
  preservationProjects,
  projectCategories,
  projectSections,
  ui,
} from "../constants/index.js";
import { format } from "../utils/i18n.js";
import { renderInlineCode, softBreak } from "../utils/text.jsx";
import { usePageTitle } from "../utils/hooks.js";

const ArchiveCard = ({ project, text }) => (
  <article className="archive-card">
    <ProjectPreview
      art={project.art}
      image={project.image}
      alt={format(text.previewAlt, { title: project.shortTitle })}
      className="aspect-8/5"
    />
    <div className="flex flex-1 flex-col gap-4 p-6">
      <div className="flex flex-wrap items-center gap-2">
        <PlatformBadge project={project} className="w-fit" />
        {project.categoryLabel && <span className="category-chip">{project.categoryLabel}</span>}
      </div>
      <div>
        <h3 className="text-xl font-semibold wrap-break-word md:text-2xl">{softBreak(project.shortTitle)}</h3>
        {project.subtitle && <p className="mt-1 text-sm wrap-break-word text-blue-50">{softBreak(project.subtitle)}</p>}
      </div>
      {project.origin && <OriginTarget project={project} />}
      <p className="leading-relaxed text-body">{renderInlineCode(project.description)}</p>
      <ProjectTags tags={project.tags} />
      <div className="mt-auto pt-2">
        <ProjectActions project={project} />
      </div>
    </div>
  </article>
);

/** Two-column "before / after" table for one preservation project. */
const ComparisonTable = ({ project, text, readCaseStudy }) => (
  <article className="card-border overflow-hidden rounded-2xl">
    <div className="flex flex-wrap items-center justify-between gap-4 border-b border-black-50 px-5 py-5 md:px-8">
      <div className="flex min-w-0 items-center gap-3">
        <PlatformBadge project={project} />
        <h3 className="min-w-0 text-lg font-semibold wrap-break-word md:text-xl">{project.shortTitle}</h3>
      </div>
      {project.caseStudy && (
        <Link to={project.caseStudy} className="inline-flex items-center gap-1.5 text-sm font-medium text-accent-cyan hover:text-white">
          {readCaseStudy}
          <ArrowRightIcon className="size-4" />
        </Link>
      )}
    </div>
    <table className="compare-table">
      <caption className="sr-only">{format(text.compareCaption, { title: project.shortTitle })}</caption>
      <thead>
        <tr>
          <th scope="col" className="w-[24%]">
            {text.aspect}
          </th>
          <th scope="col">
            <span className="inline-flex items-center gap-1.5 text-rose-300">
              <Icon name="broken" className="size-4 flex-none" />
              {text.legacyTarget}
            </span>
          </th>
          <th scope="col">
            <span className="inline-flex items-center gap-1.5 text-emerald-300">
              <Icon name="shield" className="size-4 flex-none" />
              {text.nativePort}
            </span>
          </th>
        </tr>
      </thead>
      <tbody>
        {project.comparison.map((row) => (
          <tr key={row.id}>
            <th scope="row">{row.aspect}</th>
            <td className="text-white-50/60">{row.original}</td>
            <td className="text-white-50">{row.modern}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </article>
);

/** One category of the catalog: numbered heading, intro and its cards. */
const CatalogSection = ({ id, section, items, text }) => (
  <section className="catalog-section" aria-labelledby={`${id}-title`}>
    <div className="catalog-heading">
      <span className="catalog-index" aria-hidden="true">
        {section.index}
      </span>
      <div className="min-w-0">
        <h2 id={`${id}-title`} className="text-2xl font-semibold md:text-3xl">
          {section.title}
          <span className="catalog-count">{items.length}</span>
        </h2>
        <p className="mt-2 max-w-3xl text-body">{section.description}</p>
      </div>
    </div>
    <div className={`archive-grid ${items.length === 2 ? "is-pair" : ""}`}>
      {items.map((project) => (
        <ArchiveCard key={project.id} project={project} text={text} />
      ))}
    </div>
  </section>
);

/**
 * `/projects`: Original Projects and 32-Bit Game Preservation Projects as two
 * clearly separated sections, filterable with `All / Original / 32-Bit` tabs
 * (`?category=original|preservation`), plus the preservation comparison tables.
 */
const Projects = () => {
  const { projects: text, common } = useLocalized(ui);
  const categories = useLocalized(projectCategories);
  const sections = useLocalized(projectSections);
  const originals = useLocalized(originalProjects);
  const preserved = useLocalized(preservationProjects);
  usePageTitle(text.pageTitle);

  const [params, setParams] = useSearchParams();
  const requested = params.get("category");
  const active = categories.some((category) => category.id === requested) ? requested : "all";
  const showOriginal = active === "all" || active === "original";
  const showPreservation = active === "all" || active === "preservation";
  const total = originals.length + preserved.length;
  const visible = (showOriginal ? originals.length : 0) + (showPreservation ? preserved.length : 0);
  const counts = { all: total, original: originals.length, preservation: preserved.length };

  const selectCategory = (category) => {
    setParams(category === "all" ? {} : { category }, { replace: true });
  };

  return (
    <div className="page-enter">
      <PageHeader eyebrow={text.eyebrow} title={text.title} description={text.description} />

      <div className="padding-x-lg mt-12">
        <div className="mx-auto w-full max-w-[1600px]">
          <h2 className="sr-only">{text.catalogTitle}</h2>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="category-tabs" role="group" aria-label={text.filterLabel}>
              {categories.map((category) => (
                <button
                  key={category.id}
                  type="button"
                  aria-pressed={active === category.id}
                  onClick={() => selectCategory(category.id)}
                  className={`filter-chip ${active === category.id ? "active" : ""}`}
                >
                  {category.label}
                  <span className="filter-count">{counts[category.id]}</span>
                </button>
              ))}
            </div>
            <p className="font-mono text-xs text-blue-50" aria-live="polite">
              {format(text.showing, { n: visible, total })}
            </p>
          </div>

          {showOriginal && <CatalogSection id="original" section={sections.original} items={originals} text={text} />}
          {showPreservation && (
            <CatalogSection id="preservation" section={sections.preservation} items={preserved} text={text} />
          )}
        </div>
      </div>

      {showPreservation && (
        <section className="padding-x-lg mt-20 md:mt-28" aria-labelledby="compare-title">
          <div className="mx-auto w-full max-w-[1600px]">
            <p className="font-mono text-xs tracking-widest text-accent-cyan uppercase">{text.compareEyebrow}</p>
            <h2 id="compare-title" className="mt-3 text-3xl font-semibold md:text-4xl">
              {text.compareTitle}
            </h2>
            <p className="mt-4 max-w-3xl text-lg text-white-50/70">{text.compareDescription}</p>
            <div className="mt-10 grid grid-cols-1 gap-8 2xl:grid-cols-2">
              {preserved
                .filter((project) => project.comparison)
                .map((project) => (
                  <ComparisonTable key={project.id} project={project} text={text} readCaseStudy={common.readCaseStudy} />
                ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default Projects;
