import { useEffect, useState } from "react";
import { navLinks } from "../constants/index.js";

const NavBar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`navbar ${scrolled ? "scrolled" : "not-scrolled"}`}>
      <div className="navbar-inner">
        <a href="#hero" className="navbar-logo" aria-label="Back to top">
          ADRIANSYAH
        </a>

        <nav className="navbar-desktop" aria-label="Primary">
          <ul>
            {navLinks.map(({ link, name }) => (
              <li key={name} className="group">
                <a href={link}>
                  <span>{name}</span>
                  <span className="nav-underline" />
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <a href="#contact" className="contact-btn group">
          <div className="contact-btn-inner">
            <span>Contact me</span>
          </div>
        </a>
      </div>
    </header>
  );
};

export default NavBar;
