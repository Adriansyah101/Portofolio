import { Link } from "react-router-dom";
import PageHeader from "../components/PageHeader.jsx";
import { routes } from "../constants/index.js";
import { usePageTitle } from "../utils/hooks.js";

const NotFound = () => {
  usePageTitle("Page not found");

  return (
    <div className="page-enter min-h-[60vh]">
      <PageHeader
        eyebrow="404 · Lost Route"
        title="This page didn't survive the 64-bit transition"
        description="The link may be old or mistyped. Everything that was preserved is still in the archive."
      >
        <div className="mt-8 flex flex-wrap gap-3">
          <Link to={routes.projects} className="project-link primary">
            Open the Preservation Archive
          </Link>
          <Link to={routes.home} className="project-link secondary">
            Back to Home
          </Link>
        </div>
      </PageHeader>
    </div>
  );
};

export default NotFound;
