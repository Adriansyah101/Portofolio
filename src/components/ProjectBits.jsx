import { Link } from "react-router-dom";
import { ArrowRightIcon, Icon } from "./Icons.jsx";
import { useLocalized } from "../context/LanguageContext.jsx";
import { ui } from "../constants/index.js";
import { useRelease, useResolvedLinks, withTag } from "../hooks/useGitHubReleases.js";
import { format } from "../utils/i18n.js";

/** Pill naming where a project comes from: "32-Bit iPad", or "Original Software". */
export const PlatformBadge = ({ project, className = "" }) => (
  <span className={`platform-badge ${className}`}>
    <Icon name={project.platformIcon} className="size-3.5" />
    {project.platform}
  </span>
);

/** Calm category marker: "Original" vs "Legacy Preservation" (`kind` = section id). */
export const KindBadge = ({ kind, badge, className = "" }) => (
  <span className={`kind-badge ${className}`} data-kind={kind}>
    <Icon name={badge.icon} className="size-3.5" />
    {badge.label}
  </span>
);

/**
 * Monospace tag of a project's latest GitHub release (`V1.0.1`), linking to
 * that release. `detailed` adds the publish date and the number of files.
 * Renders nothing for projects without a repository in `releaseSources`.
 */
export const ReleaseBadge = ({ projectId, detailed = false, className = "" }) => {
  const release = useRelease(projectId);
  const { release: text } = useLocalized(ui);
  if (!release) return null;

  const details = detailed
    ? [release.publishedAt && format(text.published, { date: release.publishedAt }), release.assets && format(text.files, { n: release.assets })]
    : [];

  return (
    <a
      href={release.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`release-badge ${className}`}
      title={`${text.latest}: ${release.tag}`}
    >
      <Icon name="tag" className="size-3.5 flex-none" />
      <span className="sr-only">{text.latest}: </span>
      {release.tag}
      {details.filter(Boolean).map((detail) => (
        <span key={detail} className="release-badge-detail">
          {detail}
        </span>
      ))}
    </a>
  );
};

/** Origin platform → modern target, e.g. "32-bit iPad → Windows & Linux x86 · V1.0.1". */
export const OriginTarget = ({ project }) => {
  const release = useRelease(project.id);
  return (
    <p className="origin-target">
      <span className="text-rose-200/80">{project.origin}</span>
      <ArrowRightIcon className="size-4 flex-none text-accent-cyan" />
      <span className="text-emerald-200/90">{withTag(project.target, release)}</span>
    </p>
  );
};

export const ProjectTags = ({ tags }) => {
  const { common } = useLocalized(ui);
  return (
    <ul className="flex flex-wrap gap-2" aria-label={common.technologies}>
      {tags.map((tag) => (
        <li key={tag} className="tag-pill">
          {tag}
        </li>
      ))}
    </ul>
  );
};

/**
 * "Read Case Study →" (internal route) followed by the project's external
 * GitHub / release links. Without a case study, the first external link is
 * styled as the primary action. `arrow: true` on a link adds a trailing →;
 * `iconOnly: true` shows it as a compact icon button (label as tooltip and for
 * screen readers); `shortLabel` replaces the label on the compact overview tiles.
 * Inside a compact archive tile (desktop overview) the CSS turns secondary
 * links into icon buttons; their label stays for screen readers and as a tooltip.
 */
export const ProjectActions = ({ project }) => {
  const { common } = useLocalized(ui);
  const projectLinks = useResolvedLinks(project.links);
  return (
    <div className="project-actions">
      {project.caseStudy && (
        <Link to={project.caseStudy} className="project-link primary">
          {common.readCaseStudy}
          <ArrowRightIcon className="project-link-arrow size-4" />
        </Link>
      )}
      {projectLinks.map((link, index) => (
        <a
          key={link.href + index}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className={`project-link ${!project.caseStudy && index === 0 ? "primary" : "secondary"} ${link.iconOnly ? "is-icon" : ""}`}
          title={link.label}
        >
          <Icon name={link.icon} className="size-4 flex-none" />
          <span className={`project-link-label ${link.shortLabel ? "is-full" : ""}`}>{link.label}</span>
          {link.shortLabel && <span className="project-link-label is-short">{link.shortLabel}</span>}
          {link.arrow && <ArrowRightIcon className="project-link-arrow size-4" />}
        </a>
      ))}
    </div>
  );
};

/**
 * Legacy 32-bit target vs. native port for one preservation project, as a
 * table. `readCaseStudy` adds a link to the case study in the header (used on
 * `/projects`; the case study itself leaves it out).
 */
export const ComparisonTable = ({ project, readCaseStudy = null }) => {
  const { projects: text } = useLocalized(ui);
  const release = useRelease(project.id);

  return (
    <article className="card-border overflow-hidden rounded-xl">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-black-50 px-5 py-4 md:px-6">
        <div className="flex min-w-0 items-center gap-3">
          <PlatformBadge project={project} />
          <h4 className="min-w-0 text-lg font-semibold wrap-break-word">{project.shortTitle}</h4>
        </div>
        {readCaseStudy && project.caseStudy && (
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
              <td className="text-white-50">{withTag(row.modern, release)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </article>
  );
};
