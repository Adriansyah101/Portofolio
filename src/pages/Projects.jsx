import { useId, useState } from "react";
import { useSearchParams } from "react-router-dom";

import PageHeader from "../components/PageHeader.jsx";
import GitHubStats from "../components/GitHubStats.jsx";
import ProjectPreview from "../components/ProjectPreview.jsx";
import { ArrowRightIcon, Icon } from "../components/Icons.jsx";
import {
  ComparisonTable,
  KindBadge,
  OriginTarget,
  PlatformBadge,
  ProjectActions,
  ProjectTags,
  ReleaseBadge,
} from "../components/ProjectBits.jsx";
import { TabList, TabPanel } from "../components/Tabs.jsx";
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

/**
 * One project. `compact` (the "All" overview on desktop) trims the card to a
 * scannable tile: shorter artwork, the full one- or two-sentence summary (never
 * clipped) and no tag list; the featured project runs across the top and
 * the other originals become a row of small tiles under it (`is-tile`). The
 * category views and every screen under 1024px show the full card. A
 * `featured` project spans its row, with the artwork beside the text from
 * tablet width up, and carries a "Featured Project" marker.
 */
const ArchiveCard = ({ project, badge, text, compact }) => {
  const tile = compact && !project.featured && project.category === "original";
  const classes = [
    "archive-card",
    compact && "is-compact",
    tile && "is-tile",
    project.featured && "is-featured",
  ].filter(Boolean);
  const alt = format(text.previewAlt, { title: project.shortTitle });
  // A tile with a one-row schematic (`compactArt`) swaps it in for the full diagram on desktop.
  const strip = compact && project.compactArt;
  return (
    <article className={classes.join(" ")}>
      <ProjectPreview
        art={project.art}
        // The overview tiles use the still frame (`poster`) and play the video in a dialog.
        image={compact && project.poster ? project.poster : project.image}
        imagePosition={project.imagePosition}
        video={project.video}
        videoMode={compact ? "dialog" : "inline"}
        alt={alt}
        className={`archive-art ${strip ? "lg:hidden" : ""}`}
      />
      {strip && <ProjectPreview art={project.compactArt} alt={alt} className="archive-art is-strip hidden lg:block" />}
      <div className="archive-body">
        <div className="flex flex-wrap items-center gap-2">
          {project.featured && (
            <span className="featured-badge">
              <Icon name="flag" className="size-3.5" />
              {text.featured}
            </span>
          )}
          <KindBadge kind={project.category} badge={badge} className="archive-kind" />
          {/* Originals name their discipline; preservation ports name the legacy platform they rescue. */}
          {project.category === "original" ? (
            project.categoryLabel && <span className="category-chip">{project.categoryLabel}</span>
          ) : (
            <PlatformBadge project={project} className="w-fit" />
          )}
          <ReleaseBadge projectId={project.id} />
        </div>
        <div>
          <h3 className="archive-title">{softBreak(project.shortTitle)}</h3>
          {project.subtitle && <p className="archive-subtitle">{softBreak(project.subtitle)}</p>}
        </div>
        {project.origin && <OriginTarget project={project} />}
        <p className="archive-description">{renderInlineCode(project.description)}</p>
        <div className="archive-tags">
          <ProjectTags tags={project.tags} />
        </div>
        <div className="mt-auto pt-1">
          <ProjectActions project={project} />
        </div>
      </div>
    </article>
  );
};

/** Legacy-vs-native comparison, one tab per preservation project. */
const Comparison = ({ projects, text, readCaseStudy }) => {
  const compared = projects.filter((project) => project.comparison);
  const [current, setCurrent] = useState(compared[0]?.id);
  const base = useId();
  if (!compared.length) return null;
  const project = compared.find((item) => item.id === current) ?? compared[0];

  return (
    <div className="comparison" role="group" aria-labelledby={`${base}-title`}>
      <p className="font-mono text-xs tracking-widest text-accent-cyan uppercase">{text.compareEyebrow}</p>
      <h3 id={`${base}-title`} className="mt-2 text-2xl font-semibold lg:text-xl xl:text-2xl">
        {text.compareTitle}
      </h3>
      <p className="mt-2 text-white-50/70">{text.compareDescription}</p>
      <TabList
        tabs={compared.map((item) => ({ id: item.id, label: item.shortTitle, icon: item.platformIcon }))}
        value={project.id}
        onChange={setCurrent}
        label={text.compareTitle}
        base={base}
        className="mt-5"
      />
      <TabPanel base={base} value={project.id} className="mt-4">
        <ComparisonTable project={project} readCaseStudy={readCaseStudy} />
      </TabPanel>
    </div>
  );
};

/** One category of the catalog: numbered heading, badge, intro, its cards and any extra content beside them. */
const CatalogSection = ({ id, section, items, text, compact, children = null }) => (
  <section className={`catalog-section is-${id}`} aria-labelledby={`${id}-title`}>
    <div className="catalog-heading">
      <span className="catalog-index" aria-hidden="true">
        {section.index}
      </span>
      <div className="min-w-0">
        <KindBadge kind={id} badge={section.badge} className="mb-3 lg:mb-2" />
        <h2 id={`${id}-title`} className="catalog-title">
          {section.title}
          <span className="catalog-count">{items.length}</span>
        </h2>
        <p className="catalog-description">{section.description}</p>
      </div>
    </div>
    <div className="catalog-body">
      <div className={`archive-grid is-${id}`}>
        {items.map((project) => (
          <ArchiveCard key={project.id} project={project} badge={section.badge} text={text} compact={compact} />
        ))}
      </div>
      {children}
    </div>
  </section>
);

/**
 * `/projects`: Original Software and Legacy Software Preservation (the two
 * binary loaders, each linking to its case study) as two clearly
 * separated groups, filterable with `All / Original / 32-Bit` pills
 * (`?category=original|preservation`), with Niskala Utilities first as the
 * featured project. From 1024px up "All" is a one-screen overview of compact
 * tiles in two side-by-side groups; a category shows its
 * full cards (the preservation view adds the legacy-vs-native comparison
 * beside them), and the catalog pane scrolls on its own if it has to.
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
  const overview = active === "all";
  const total = originals.length + preserved.length;
  const visible = (showOriginal ? originals.length : 0) + (showPreservation ? preserved.length : 0);
  const counts = { all: total, original: originals.length, preservation: preserved.length };

  const selectCategory = (category) => {
    setParams(category === "all" ? {} : { category }, { replace: true });
  };

  return (
    <div className="page-shell page-enter">
      <div className="page-frame">
        <PageHeader
          eyebrow={text.eyebrow}
          title={text.title}
          description={text.description}
          aside={<GitHubStats className="is-compact" />}
        />

        <div className="mt-10 flex flex-wrap items-center justify-between gap-4 lg:mt-4 xl:mt-5">
          <h2 className="sr-only">{text.catalogTitle}</h2>
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
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            {overview && (
              <button type="button" onClick={() => selectCategory("preservation")} className="compare-link">
                <Icon name="layers" className="size-4" />
                {text.compareTitle}
                <ArrowRightIcon className="size-4" />
              </button>
            )}
            <p className="font-mono text-xs text-blue-50" aria-live="polite">
              {format(text.showing, { n: visible, total })}
            </p>
          </div>
        </div>

        {/* Keyed on the filter so switching replays the fade-in instead of snapping. */}
        <div key={active} className={`catalog scroll-pane is-${active}`}>
          {showOriginal && (
            <CatalogSection id="original" section={sections.original} items={originals} text={text} compact={overview} />
          )}
          {showPreservation && (
            <CatalogSection id="preservation" section={sections.preservation} items={preserved} text={text} compact={overview}>
              {/* On desktop the overview links here instead of showing the tables. */}
              <div className={overview ? "lg:hidden" : ""}>
                <Comparison projects={preserved} text={text} readCaseStudy={common.readCaseStudy} />
              </div>
            </CatalogSection>
          )}
        </div>
      </div>
    </div>
  );
};

export default Projects;
