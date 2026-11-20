import { Link } from "react-router-dom";
import PageHeader from "../components/PageHeader.jsx";
import { routes, ui } from "../constants/index.js";
import { useLocalized } from "../context/LanguageContext.jsx";
import { usePageTitle } from "../utils/hooks.js";

const NotFound = () => {
  const { notFound: text, meta } = useLocalized(ui);
  usePageTitle(meta.notFound);

  return (
    <div className="page-enter min-h-screen">
      <PageHeader
        eyebrow={text.eyebrow}
        title={text.title}
        description={text.description}
      >
        <div className="mt-8 flex flex-wrap gap-3">
          <Link to={routes.home} className="project-link primary">
            {text.home}
          </Link>
          <Link to={routes.journey} className="project-link secondary">
            {text.journey}
          </Link>
        </div>
      </PageHeader>
    </div>
  );
};

export default NotFound;
