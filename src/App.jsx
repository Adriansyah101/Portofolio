import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import NavBar from "./components/NavBar.jsx";
import Hero from "./sections/Hero.jsx";
import ShowcaseSection from "./sections/ShowcaseSection.jsx";
import LogoSection from "./sections/LogoSection.jsx";
import FeatureCards from "./sections/FeatureCards.jsx";
import ExperienceSection from "./sections/ExperienceSection.jsx";
import TechStack from "./sections/TechStack.jsx";
import Highlights from "./sections/Highlights.jsx";
import Contact from "./sections/Contact.jsx";
import Footer from "./sections/Footer.jsx";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const App = () => (
  <>
    <NavBar />
    <main>
      <Hero />
      <ShowcaseSection />
      <LogoSection />
      <FeatureCards />
      <ExperienceSection />
      <TechStack />
      <Highlights />
      <Contact />
    </main>
    <Footer />
  </>
);

export default App;
