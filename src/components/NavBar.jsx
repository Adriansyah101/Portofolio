import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";

import { CloseIcon, GitHubIcon, MenuIcon } from "./Icons.jsx";
import { LanguageToggle, ThemeToggle } from "./Preferences.jsx";
import { useLocalized } from "../context/LanguageContext.jsx";
import { githubUser, links, navLinks, routes, ui } from "../constants/index.js";

const NavBar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const items = useLocalized(navLinks);
  const { nav } = useLocalized(ui);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close the mobile menu whenever the route changes.
  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (event) => event.key === "Escape" && setOpen(false);
    const onResize = () => window.innerWidth >= 1024 && setOpen(false);
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [open]);

  const state = open ? "menu-open" : scrolled ? "scrolled" : "not-scrolled";

  return (
    <>
      <header className={`navbar ${state}`}>
        <div className="navbar-inner">
          <Link to={routes.home} className="navbar-logo" aria-label={nav.homeLabel}>
            ADRIANSYAH
          </Link>

          <nav className="navbar-desktop" aria-label={nav.primary}>
            <ul>
              {items.map(({ id, name, to, end }) => (
                <li key={id} className="group">
                  <NavLink to={to} end={end} className={({ isActive }) => (isActive ? "active" : undefined)}>
                    <span>{name}</span>
                    <span className="nav-underline" />
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className="navbar-actions">
            <LanguageToggle />
            <ThemeToggle />
            <a href={links.githubProfile} target="_blank" rel="noopener noreferrer" className="contact-btn group">
              <div className="contact-btn-inner">
                <GitHubIcon className="size-4" />
                <span>GitHub</span>
              </div>
            </a>
          </div>

          <button
            type="button"
            className="menu-toggle"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? nav.closeMenu : nav.openMenu}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <CloseIcon className="size-6" /> : <MenuIcon className="size-6" />}
          </button>
        </div>

        <div id="mobile-menu" className={`mobile-menu ${open ? "open" : ""}`} inert={!open}>
          <div className="mobile-menu-inner">
            <nav aria-label={nav.mobile}>
              <ul className="flex flex-col gap-1 pt-4">
                {items.map(({ id, name, to, end }) => (
                  <li key={id}>
                    <NavLink
                      to={to}
                      end={end}
                      onClick={() => setOpen(false)}
                      className={({ isActive }) => `mobile-link ${isActive ? "active" : ""}`}
                    >
                      {name}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="mobile-prefs" role="group" aria-label={nav.preferences}>
              <LanguageToggle />
              <ThemeToggle withLabel />
            </div>

            <a
              href={links.githubProfile}
              target="_blank"
              rel="noopener noreferrer"
              className="project-link secondary mt-4 mb-2 w-fit"
            >
              <GitHubIcon className="size-4" />
              github.com/{githubUser}
            </a>
          </div>
        </div>
      </header>

      {open && <div className="menu-backdrop" aria-hidden="true" onClick={() => setOpen(false)} />}
    </>
  );
};

export default NavBar;
