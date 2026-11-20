import PageHeader from "../components/PageHeader.jsx";
import ExperienceSection from "../sections/ExperienceSection.jsx";
import TechStack from "../sections/TechStack.jsx";
import Highlights from "../sections/Highlights.jsx";
import { scrollToId, usePageTitle } from "../utils/hooks.js";

const JUMPS = [
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Tech Stack" },
  { id: "highlights", label: "Impact" },
];

/** `/journey`: professional work experience only (preservation work lives on `/projects`). */
const Journey = () => {
  usePageTitle("Work Experience");

  return (
    <div className="page-enter">
      <PageHeader
        eyebrow="Career & Work Experience"
        title="Keeping national ferry ticketing running in production"
        description="Enterprise application operations at PT ASDP Indonesia Ferry (Persero): hybrid cloud and harbor server deployments across dozens of ports, Omron barrier gate integration, and the day-to-day reliability of trip.ferizy.com."
      >
        <div className="jump-nav mt-8" role="navigation" aria-label="On this page">
          {JUMPS.map((jump) => (
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
