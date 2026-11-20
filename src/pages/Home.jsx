import Hero from "../sections/Hero.jsx";
import ShowcaseSection from "../sections/ShowcaseSection.jsx";
import LogoSection from "../sections/LogoSection.jsx";
import FeatureCards from "../sections/FeatureCards.jsx";
import ContactPreview from "../sections/ContactPreview.jsx";
import { usePageTitle } from "../utils/hooks.js";

/** `/`: overview with the 3D hero, featured preservation work and a contact teaser. */
const Home = () => {
  usePageTitle(null);

  return (
    <div className="page-enter">
      <Hero />
      <ShowcaseSection />
      <LogoSection />
      <FeatureCards />
      <ContactPreview />
    </div>
  );
};

export default Home;
