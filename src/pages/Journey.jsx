import PageHeader from "../components/PageHeader.jsx";
import ExperienceSection from "../sections/ExperienceSection.jsx";
import TechStack from "../sections/TechStack.jsx";
import Highlights from "../sections/Highlights.jsx";
import { scrollToId, usePageTitle } from "../utils/hooks.js";

const JUMPS = [
  { id: "experience", label: "Timeline" },
  { id: "skills", label: "Tech Stack" },
  { id: "highlights", label: "Highlights" },
];

/** `/journey`: engineering timeline, 3D tech stack and release highlights. */
const Journey = () => {
  usePageTitle("Engineering Journey");

  return (
    <div className="page-enter">
      <PageHeader
        eyebrow="Engineering Timeline & Tech Stack"
        title="The journey behind every rescued release"
        description="Milestones from each preservation port, the toolchain that makes static recompilation possible, and the verifiable highlights that shipped."
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
