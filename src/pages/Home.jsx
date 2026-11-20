import Hero from "../sections/Hero.jsx";
import FeaturedWork from "../sections/FeaturedWork.jsx";
import LogoSection from "../sections/LogoSection.jsx";
import FeatureCards from "../sections/FeatureCards.jsx";
import ContactPreview from "../sections/ContactPreview.jsx";
import { usePageTitle } from "../utils/hooks.js";

/** `/`: systems-engineering overview: 3D hero, metrics, featured work, capabilities and a contact teaser. */
const Home = () => {
  usePageTitle(null);

  return (
    <div className="page-enter">
      <Hero />
      <FeaturedWork />
      <LogoSection />
      <FeatureCards />
      <ContactPreview />
    </div>
  );
};

export default Home;
