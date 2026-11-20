import { Link } from "react-router-dom";
import { ArrowRightIcon, Icon } from "./Icons.jsx";

/** "32-Bit iPad"-style pill naming the platform a project was rescued from. */
export const PlatformBadge = ({ project, className = "" }) => (
  <span className={`platform-badge ${className}`}>
    <Icon name={project.platformIcon} className="size-3.5" />
    {project.platform}
  </span>
);

/** Origin platform → modern target, e.g. "32-bit iPad → Native Windows". */
export const OriginTarget = ({ project }) => (
  <p className="origin-target">
    <span className="text-rose-200/80">{project.origin}</span>
    <ArrowRightIcon className="size-4 flex-none text-accent-cyan" />
    <span className="text-emerald-200/90">{project.target}</span>
  </p>
);

export const ProjectTags = ({ tags }) => (
  <ul className="flex flex-wrap gap-2" aria-label="Technologies">
    {tags.map((tag) => (
      <li key={tag} className="tag-pill">
        {tag}
      </li>
    ))}
  </ul>
);

/**
 * "Read Case Study →" (internal route) followed by the project's external
 * GitHub / release links. Without a case study, the first external link is
 * styled as the primary action.
 */
export const ProjectActions = ({ project }) => (
  <div className="flex flex-wrap gap-3">
    {project.caseStudy && (
      <Link to={project.caseStudy} className="project-link primary">
        Read Case Study
        <ArrowRightIcon className="size-4" />
      </Link>
    )}
    {project.links.map((link, index) => (
      <a
        key={link.href + link.label}
        href={link.href}
        target="_blank"
        rel="noopener noreferrer"
        className={`project-link ${!project.caseStudy && index === 0 ? "primary" : "secondary"}`}
      >
        <Icon name={link.icon} className="size-4" />
        {link.label}
      </a>
    ))}
  </div>
);
