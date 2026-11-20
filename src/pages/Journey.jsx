import PageHeader from "../components/PageHeader.jsx";
import CareerOverview from "../sections/CareerOverview.jsx";
import ExperienceSection from "../sections/ExperienceSection.jsx";
import TechStack from "../sections/TechStack.jsx";
import Highlights from "../sections/Highlights.jsx";
import { scrollToId, usePageTitle } from "../utils/hooks.js";

const JUMPS = [
  { id: "overview", label: "Overview" },
  { id: "experience", label: "Timeline" },
  { id: "skills", label: "Tech Stack" },
  { id: "highlights", label: "Highlights" },
];

/** `/journey`: career overview, timeline, 3D tech stack and highlights. */
const Journey = () => {
  usePageTitle("Engineering Journey");

  return (
    <div className="page-enter">
      <PageHeader
        eyebrow="Career Timeline & Tech Stack"
        title="From harbor production systems to rescued 32-bit classics"
        description="Enterprise operations at PT ASDP Indonesia Ferry (Persero), the open-source preservation ports built alongside it, the toolchain behind both, and the verifiable highlights that shipped."
      >
        <div className="jump-nav mt-8" role="navigation" aria-label="On this page">
          {JUMPS.map((jump) => (
            <button key={jump.id} type="button" className="jump-chip" onClick={() => scrollToId(jump.id)}>
              {jump.label}
            </button>
          ))}
        </div>
      </PageHeader>
      <CareerOverview />
      <ExperienceSection />
      <TechStack />
      <Highlights />
    </div>
  );
};

export default Journey;
