import { Link, useSearchParams } from "react-router-dom";

import PageHeader from "../components/PageHeader.jsx";
import ProjectPreview from "../components/ProjectPreview.jsx";
import { ArrowRightIcon, Icon } from "../components/Icons.jsx";
import { OriginTarget, PlatformBadge, ProjectActions, ProjectTags } from "../components/ProjectBits.jsx";
import { projectFilters, projects } from "../constants/index.js";
import { renderInlineCode, softBreak } from "../utils/text.jsx";
import { usePageTitle } from "../utils/hooks.js";

const ArchiveCard = ({ project }) => (
  <article className="archive-card">
    <ProjectPreview art={project.art} image={project.image} alt={`${project.shortTitle} preview`} className="aspect-8/5" />
    <div className="flex flex-1 flex-col gap-4 p-6">
      <PlatformBadge project={project} className="w-fit" />
      <h2 className="text-xl font-semibold wrap-break-word md:text-2xl">{softBreak(project.shortTitle)}</h2>
      <OriginTarget project={project} />
      <p className="leading-relaxed text-white-50/75">{renderInlineCode(project.description)}</p>
      <ProjectTags tags={project.tags} />
      <div className="mt-auto pt-2">
        <ProjectActions project={project} />
      </div>
    </div>
  </article>
);

/** Two-column "before / after" table for one project. */
const ComparisonTable = ({ project }) => (
  <article className="card-border overflow-hidden rounded-2xl">
    <div className="flex flex-wrap items-center justify-between gap-4 border-b border-black-50 px-5 py-5 md:px-8">
      <div className="flex min-w-0 items-center gap-3">
        <PlatformBadge project={project} />
        <h3 className="min-w-0 text-lg font-semibold wrap-break-word md:text-xl">{project.shortTitle}</h3>
      </div>
      {project.caseStudy && (
        <Link to={project.caseStudy} className="inline-flex items-center gap-1.5 text-sm font-medium text-accent-cyan hover:text-white">
          Read Case Study
          <ArrowRightIcon className="size-4" />
        </Link>
      )}
    </div>
    <table className="compare-table">
      <caption className="sr-only">{`${project.shortTitle}: original 32-bit target compared with the modern native port`}</caption>
      <thead>
        <tr>
          <th scope="col" className="w-[24%]">
            Aspect
          </th>
          <th scope="col">
            <span className="inline-flex items-center gap-1.5 text-rose-300">
              <Icon name="broken" className="size-4 flex-none" />
              Original 32-bit target
            </span>
          </th>
          <th scope="col">
            <span className="inline-flex items-center gap-1.5 text-emerald-300">
              <Icon name="shield" className="size-4 flex-none" />
              Modern native port
            </span>
          </th>
        </tr>
      </thead>
      <tbody>
        {project.comparison.map((row) => (
          <tr key={row.aspect}>
            <th scope="row">{row.aspect}</th>
            <td className="text-white-50/60">{row.original}</td>
            <td className="text-white-50">{row.modern}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </article>
);

/** `/projects`: filterable catalog plus the architecture comparison tables. */
const Projects = () => {
  usePageTitle("Preservation Archive");
  const [params, setParams] = useSearchParams();
  const requested = params.get("filter");
  const active = projectFilters.includes(requested) ? requested : "All";
  const visible = active === "All" ? projects : projects.filter((project) => project.filters.includes(active));
  const compared = visible.filter((project) => project.comparison);

  const selectFilter = (filter) => {
    setParams(filter === "All" ? {} : { filter }, { replace: true });
  };

  return (
    <div className="page-enter">
      <PageHeader
        eyebrow="Preservation Archive"
        title="32-bit classics, rescued and documented"
        description="Every project here started as a game that modern iOS or macOS can no longer run. Filter by origin platform, compare the original target with the native port, and open each case study for the full technical breakdown."
      />

      <section className="padding-x-lg mt-12" aria-labelledby="catalog-title">
        <div className="mx-auto w-full max-w-[1600px]">
          <h2 id="catalog-title" className="sr-only">
            Project catalog
          </h2>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap gap-2" role="group" aria-label="Filter projects">
              {projectFilters.map((filter) => (
                <button
                  key={filter}
                  type="button"
                  aria-pressed={active === filter}
                  onClick={() => selectFilter(filter)}
                  className={`filter-chip ${active === filter ? "active" : ""}`}
                >
                  {filter}
                </button>
              ))}
            </div>
            <p className="font-mono text-xs text-blue-50" aria-live="polite">
              Showing {visible.length} of {projects.length} projects
            </p>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
            {visible.map((project) => (
              <ArchiveCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      </section>

      {compared.length > 0 && (
        <section className="padding-x-lg mt-20 md:mt-28" aria-labelledby="compare-title">
          <div className="mx-auto w-full max-w-[1600px]">
            <p className="font-mono text-xs tracking-widest text-accent-cyan uppercase">Architecture comparison</p>
            <h2 id="compare-title" className="mt-3 text-3xl font-semibold md:text-4xl">
              Original 32-Bit Target vs. Modern Native Port
            </h2>
            <p className="mt-4 max-w-3xl text-lg text-white-50/70">
              What each game was built for, and what it runs on now.
            </p>
            <div className="mt-10 grid grid-cols-1 gap-8 2xl:grid-cols-2">
              {compared.map((project) => (
                <ComparisonTable key={project.id} project={project} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default Projects;
