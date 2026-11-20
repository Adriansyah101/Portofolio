import Hero from "../sections/Hero.jsx";
import { usePageTitle } from "../utils/hooks.js";

/** `/`: the command center: intro, metrics and calls to action beside the interactive 3D workstation. */
const Home = () => {
  usePageTitle(null);

  return (
    <div className="page-enter flex flex-col lg:min-h-0 lg:flex-1">
      <Hero />
    </div>
  );
};

export default Home;
