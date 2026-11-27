import { Link, NavLink } from "react-router-dom";
import { Icon } from "../components/Icons.jsx";
import { navLinks, routes, socialLinks, ui } from "../constants/index.js";
import { useLocalized } from "../context/LanguageContext.jsx";

/**
 * Stacked footer on phones and tablets; from 1024px up it collapses into one
 * slim bar (name · socials · copyright) under the viewport-locked page, and the
 * page links are dropped because the navbar already shows them.
 */
const Footer = () => {
  const items = useLocalized(navLinks);
  const { meta, footer } = useLocalized(ui);
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-brand">
          <Link to={routes.home} className="font-semibold tracking-[0.2em] transition-colors hover:text-accent-cyan">
            ADRIANSYAH
          </Link>
          <p className="footer-role">{meta.role}</p>
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
              <Icon name={social.icon} className="size-5 lg:size-4" />
            </a>
          ))}
        </div>

        <p className="footer-copy">
          © {new Date().getFullYear()} Adriansyah Prasetya Nugraha. {footer.rights}
        </p>
      </div>

      <nav aria-label={footer.navLabel} className="mt-8 lg:hidden">
        <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-blue-50">
          {items.map(({ id, name, to, end }) => (
            <li key={id}>
              {/* NavLink sets aria-current="page" on the active route. */}
              <NavLink
                to={to}
                end={end}
                className={({ isActive }) => `transition-colors hover:text-white ${isActive ? "text-white-50" : ""}`}
              >
                {name}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </footer>
  );
};

export default Footer;
