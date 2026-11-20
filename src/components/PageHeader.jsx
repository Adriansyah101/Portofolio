/**
 * Intro block at the top of an inner page: eyebrow, title, description and
 * optional `children` under them. `aside` (actions, stats) stacks below on
 * phones and sits to the right of the text from 1024px up. `titleAs` lets a
 * page that shows a more specific heading elsewhere demote this one.
 */
const PageHeader = ({ eyebrow, title, description, children, aside = null, titleAs: Title = "h1", className = "" }) => (
  <header className={`page-header ${aside ? "lg:flex lg:items-end lg:justify-between lg:gap-10" : ""} ${className}`}>
    <div className="min-w-0">
      {eyebrow && <p className="page-eyebrow">{eyebrow}</p>}
      <Title className="page-title">{title}</Title>
      {description && <p className="page-description">{description}</p>}
      {children}
    </div>
    {aside && <div className="mt-8 min-w-0 lg:mt-0 lg:flex-none">{aside}</div>}
  </header>
);

export default PageHeader;
