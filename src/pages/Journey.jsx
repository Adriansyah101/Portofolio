import { Link } from "react-router-dom";

import PageHeader from "../components/PageHeader.jsx";
import { ArrowRightIcon } from "../components/Icons.jsx";
import { NotesTeaser } from "../components/NoteBits.jsx";
import { CvButton } from "../components/Resume.jsx";
import ExperienceSection from "../sections/ExperienceSection.jsx";
import TechStack from "../sections/TechStack.jsx";
import Highlights from "../sections/Highlights.jsx";
import { useLocalized } from "../context/LanguageContext.jsx";
import { routes, ui } from "../constants/index.js";
import { scrollToId, usePageTitle } from "../utils/hooks.js";

/** `/journey`: professional work experience only (preservation work lives on `/projects`). */
const Journey = () => {
  const { journey: text, common } = useLocalized(ui);
  usePageTitle(text.pageTitle);

  return (
    <div className="page-enter">
      <PageHeader
        eyebrow={text.eyebrow}
        title={text.title}
        description={text.description}
      >
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <Link to={routes.contact} className="project-link primary">
            {text.contactCta}
            <ArrowRightIcon className="size-4" />
          </Link>
          <CvButton />
        </div>
        <div className="jump-nav mt-6" role="navigation" aria-label={common.onThisPage}>
          {text.jumps.map((jump) => (
            <button key={jump.id} type="button" className="jump-chip" onClick={() => scrollToId(jump.id)}>
              {jump.label}
            </button>
          ))}
        </div>
      </PageHeader>
      <ExperienceSection />
      <TechStack />
      <Highlights />
      <NotesTeaser first="hybrid-harbor-cloud-ticketing" />
    </div>
  );
};

export default Journey;
