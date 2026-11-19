const TitleHeader = ({ title, sub }) => (
  <div className="flex flex-col items-center gap-5">
    <div className="hero-badge">
      <p>{sub}</p>
    </div>
    <h2 className="max-w-4xl text-center text-3xl font-semibold md:text-5xl">
      {title}
    </h2>
  </div>
);

export default TitleHeader;
