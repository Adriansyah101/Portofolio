import { Link } from "react-router-dom";
import { ArrowRightIcon, GitHubIcon } from "../components/Icons.jsx";
import { links, routes } from "../constants/index.js";

/** Home-page teaser that points to the dedicated contact page. */
const ContactPreview = () => (
  <section id="contact-preview" className="section-padding flex-center w-full" aria-labelledby="contact-preview-title">
    <div className="contact-preview w-full max-w-[1600px]">
      <div className="hero-bg" aria-hidden="true" />
      <div className="relative z-10 flex flex-col gap-8 xl:flex-row xl:items-end xl:justify-between">
        <div className="max-w-3xl">
          <p className="page-eyebrow">Contact & Community</p>
          <h2 id="contact-preview-title" className="mt-5 text-3xl font-semibold md:text-5xl">
            Know a 32-bit classic worth saving?
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-white-50/75">
            I&apos;m always interested in preservation leads, recompilation challenges and legacy graphics work.
            Send a message, or follow the releases on GitHub.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link to={routes.contact} className="project-link primary">
            Get in Touch
            <ArrowRightIcon className="size-4" />
          </Link>
          <a href={links.githubProfile} target="_blank" rel="noopener noreferrer" className="project-link secondary">
            <GitHubIcon className="size-4" />
            Follow on GitHub
          </a>
        </div>
      </div>
    </div>
  </section>
);

export default ContactPreview;
