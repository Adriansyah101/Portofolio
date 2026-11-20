import { Link } from "react-router-dom";
import { Icon } from "../components/Icons.jsx";
import { navLinks, routes, socialLinks } from "../constants/index.js";

const Footer = () => (
  <footer className="footer">
    <div className="footer-container">
      <div className="flex flex-col justify-center text-center md:text-start">
        <Link to={routes.home} className="font-semibold tracking-[0.2em] transition-colors hover:text-accent-cyan">
          ADRIANSYAH
        </Link>
        <p className="mt-1 text-sm text-blue-50">Systems & Application Operations Engineer</p>
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

    <nav aria-label="Footer" className="mt-8">
      <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-blue-50">
        {navLinks.map(({ name, to }) => (
          <li key={name}>
            <Link to={to} className="transition-colors hover:text-white">
              {name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  </footer>
);

export default Footer;
