import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";

import { CloseIcon, GitHubIcon, MenuIcon } from "./Icons.jsx";
import { githubUser, links, navLinks, routes } from "../constants/index.js";

const NavBar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

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
    const onResize = () => window.innerWidth >= 1280 && setOpen(false);
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
          <Link to={routes.home} className="navbar-logo" aria-label="Adriansyah, home">
            ADRIANSYAH
          </Link>

          <nav className="navbar-desktop" aria-label="Primary">
            <ul>
              {navLinks.map(({ name, to, end }) => (
                <li key={name} className="group">
                  <NavLink to={to} end={end} className={({ isActive }) => (isActive ? "active" : undefined)}>
                    <span>{name}</span>
                    <span className="nav-underline" />
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          <a href={links.githubProfile} target="_blank" rel="noopener noreferrer" className="contact-btn group">
            <div className="contact-btn-inner">
              <GitHubIcon className="size-4" />
              <span>GitHub</span>
            </div>
          </a>

          <button
            type="button"
            className="menu-toggle"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <CloseIcon className="size-6" /> : <MenuIcon className="size-6" />}
          </button>
        </div>

        <div id="mobile-menu" className={`mobile-menu ${open ? "open" : ""}`} inert={!open}>
          <div className="mobile-menu-inner">
            <nav aria-label="Mobile">
              <ul className="flex flex-col gap-1 pt-4">
                {navLinks.map(({ name, to, end }) => (
                  <li key={name}>
                    <NavLink to={to} end={end} className={({ isActive }) => `mobile-link ${isActive ? "active" : ""}`}>
                      {name}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </nav>
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
