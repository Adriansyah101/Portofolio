import PageHeader from "../components/PageHeader.jsx";
import ExperienceSection from "../sections/ExperienceSection.jsx";
import TechStack from "../sections/TechStack.jsx";
import Highlights from "../sections/Highlights.jsx";
import { useLocalized } from "../context/LanguageContext.jsx";
import { ui } from "../constants/index.js";
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
        <div className="jump-nav mt-8" role="navigation" aria-label={common.onThisPage}>
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
    </div>
  );
};

export default Journey;
