import { createContext, useCallback, useContext, useLayoutEffect, useMemo, useState } from "react";

/** localStorage key; index.html reads the same key so the first paint already uses the saved theme. */
export const THEME_STORAGE_KEY = "portfolio-theme";
export const DEFAULT_THEME = "dark";

/** Browser UI colour (address bar on mobile), matching `--color-canvas`. */
const THEME_COLORS = { dark: "#09090b", light: "#f8fafc" };

const isTheme = (value) => value === "dark" || value === "light";

const readInitialTheme = () => {
  // The inline script in index.html has already resolved the stored theme.
  const fromDocument = document.documentElement.dataset.theme;
  if (isTheme(fromDocument)) return fromDocument;
  try {
    const stored = window.localStorage.getItem(THEME_STORAGE_KEY);
    return isTheme(stored) ? stored : DEFAULT_THEME;
  } catch {
    return DEFAULT_THEME;
  }
};

/** Applies the theme to `<html>`: `data-theme`, the `.dark` class and `color-scheme`. */
export const applyTheme = (theme) => {
  const root = document.documentElement;
  root.dataset.theme = theme;
  root.classList.toggle("dark", theme === "dark");
  root.style.colorScheme = theme;
  document.querySelector('meta[name="theme-color"]')?.setAttribute("content", THEME_COLORS[theme]);
};

const ThemeContext = createContext({
  theme: DEFAULT_THEME,
  setTheme: () => {},
  toggleTheme: () => {},
});

/**
 * `"dark"` (default) or `"light"`, persisted in localStorage. Colours are CSS
 * custom properties switched by `html[data-theme]` in index.css; the 3D
 * scenes read `theme` and ease their lighting toward the matching palette.
 */
export const ThemeProvider = ({ children }) => {
  const [theme, setThemeState] = useState(readInitialTheme);

  useLayoutEffect(() => {
    applyTheme(theme);
    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, theme);
    } catch {
      // Storage unavailable: the theme still applies to this visit.
    }
  }, [theme]);

  const setTheme = useCallback((next) => {
    if (isTheme(next)) setThemeState(next);
  }, []);

  const toggleTheme = useCallback(() => setThemeState((current) => (current === "dark" ? "light" : "dark")), []);

  const value = useMemo(() => ({ theme, setTheme, toggleTheme }), [theme, setTheme, toggleTheme]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => useContext(ThemeContext);
