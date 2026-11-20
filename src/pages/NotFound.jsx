import { Link } from "react-router-dom";
import PageHeader from "../components/PageHeader.jsx";
import { routes } from "../constants/index.js";
import { usePageTitle } from "../utils/hooks.js";

const NotFound = () => {
  usePageTitle("Page not found");

  return (
    <div className="page-enter min-h-screen">
      <PageHeader
        eyebrow="404 · Route Not Found"
        title="This page could not be found"
        description="The link may be old or mistyped. Head back home, or see my work experience."
      >
        <div className="mt-8 flex flex-wrap gap-3">
          <Link to={routes.home} className="project-link primary">
            Back to Home
          </Link>
          <Link to={routes.journey} className="project-link secondary">
            View Work Experience
          </Link>
        </div>
      </PageHeader>
    </div>
  );
};

export default NotFound;
