/** Intro block at the top of every inner page. */
const PageHeader = ({ eyebrow, title, description, children }) => (
  <header className="page-header">
    <div className="hero-bg" aria-hidden="true" />
    <div className="relative z-10 mx-auto w-full max-w-[1600px]">
      {eyebrow && <p className="page-eyebrow">{eyebrow}</p>}
      <h1 className="page-title">{title}</h1>
      {description && <p className="page-description">{description}</p>}
      {children}
    </div>
  </header>
);

export default PageHeader;
