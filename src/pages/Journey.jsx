import { useId, useState } from "react";
import { Link } from "react-router-dom";

import PageHeader from "../components/PageHeader.jsx";
import { ArrowRightIcon } from "../components/Icons.jsx";
import { CvButton } from "../components/Resume.jsx";
import { TabList, TabPanel } from "../components/Tabs.jsx";
import { EnterpriseStack, ExperiencePanel, OperationalBreakdown, TechCards } from "../sections/JourneyPanels.jsx";
import { useLocalized } from "../context/LanguageContext.jsx";
import { routes, ui } from "../constants/index.js";
import { usePageTitle } from "../utils/hooks.js";

const TABS = [
  { id: "impact", icon: "layers", Panel: OperationalBreakdown },
  { id: "stack", icon: "server", Panel: EnterpriseStack },
  { id: "tech3d", icon: "cube", Panel: TechCards },
];

/**
 * `/journey`: work experience only (projects and preservation work live on
 * `/projects`). The PT ASDP executive summary sits beside a tabbed panel
 * (Operational Breakdown · Enterprise Stack · 3D Tech Cards); from 1024px up the
 * two share one viewport and each scrolls on its own if it has to.
 */
const Journey = () => {
  const { journey: text } = useLocalized(ui);
  usePageTitle(text.pageTitle);
  const [tab, setTab] = useState("impact");
  const base = useId();
  const tabs = TABS.map(({ id, icon }) => ({ id, icon, label: text.tabs[id] }));
  const { Panel } = TABS.find((item) => item.id === tab);

  return (
    <div className="page-shell page-enter">
      <div className="page-frame">
        <PageHeader
          eyebrow={text.eyebrow}
          title={text.title}
          description={text.description}
          aside={
            <div className="flex flex-wrap items-center gap-3">
              <Link to={routes.contact} className="project-link primary">
                {text.contactCta}
                <ArrowRightIcon className="size-4" />
              </Link>
              <CvButton />
            </div>
          }
        />

        <div className="page-split lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
          <ExperiencePanel />

          <section className="panel" aria-label={text.tabsLabel}>
            <div className="flex-none border-b border-black-50 p-3 md:p-4">
              <TabList tabs={tabs} value={tab} onChange={setTab} label={text.tabsLabel} base={base} />
            </div>
            <TabPanel base={base} value={tab} className="scroll-pane @container flex-1 p-4 md:p-6 lg:p-5 xl:p-6">
              <Panel />
            </TabPanel>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Journey;
