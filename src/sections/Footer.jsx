import { Icon } from "../components/Icons.jsx";
import { links, socialLinks } from "../constants/index.js";

const Footer = () => (
  <footer className="footer">
    <div className="footer-container">
      <div className="flex flex-col justify-center text-center md:text-start">
        <a
          href={links.githubProfile}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 font-semibold tracking-[0.2em] transition-colors hover:text-accent-cyan md:justify-start"
        >
          <Icon name="github" className="size-5" />
          ADRIANSYAH
        </a>
        <p className="mt-1 text-sm text-blue-50">Systems, Graphics & Reverse Engineering</p>
      </div>

      <div className="socials">
        {socialLinks.map((social) => (
          <a
            key={social.name}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            className="social-icon"
            aria-label={social.name}
            title={social.name}
          >
            <Icon name={social.icon} className="size-5" />
          </a>
        ))}
      </div>

      <div className="flex flex-col justify-center">
        <p className="text-center text-sm text-white-50/70 md:text-end">
          © {new Date().getFullYear()} Adriansyah Prasetya Nugraha. All rights reserved.
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
