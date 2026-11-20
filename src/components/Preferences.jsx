import { MoonIcon, SunIcon } from "./Icons.jsx";
import { useTheme } from "../context/ThemeContext.jsx";
import { useLanguage, useLocalized } from "../context/LanguageContext.jsx";
import { ui } from "../constants/index.js";
import { LANGUAGES } from "../utils/i18n.js";

/** Compact `EN | ID` pill. Each option is a toggle button; the active one is pressed. */
export const LanguageToggle = ({ className = "" }) => {
  const { lang, setLang } = useLanguage();
  const { nav } = useLocalized(ui);

  return (
    <div className={`lang-toggle ${className}`} role="group" aria-label={nav.language}>
      {LANGUAGES.map((code) => (
        <button
          key={code}
          type="button"
          lang={code}
          aria-pressed={lang === code}
          title={nav.languageNames[code]}
          onClick={() => setLang(code)}
          className={lang === code ? "active" : undefined}
        >
          <span aria-hidden="true">{code.toUpperCase()}</span>
          <span className="sr-only">{nav.languageNames[code]}</span>
        </button>
      ))}
    </div>
  );
};

/**
 * Sun / Moon button. It shows the mode you switch *to* (sun in dark mode);
 * `withLabel` adds the current mode's name for the mobile menu.
 */
export const ThemeToggle = ({ className = "", withLabel = false }) => {
  const { theme, toggleTheme } = useTheme();
  const { nav } = useLocalized(ui);
  const isDark = theme === "dark";
  const action = isDark ? nav.toLight : nav.toDark;

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={action}
      title={action}
      className={`theme-toggle ${withLabel ? "with-label" : ""} ${className}`}
    >
      {isDark ? <SunIcon className="size-[18px]" /> : <MoonIcon className="size-[18px]" />}
      {withLabel && <span aria-hidden="true">{isDark ? nav.lightMode : nav.darkMode}</span>}
    </button>
  );
};
