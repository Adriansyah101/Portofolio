import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { DEFAULT_LANGUAGE, isLanguage, localize } from "../utils/i18n.js";

/** localStorage key; index.html reads the same key to set `<html lang>` before React loads. */
export const LANGUAGE_STORAGE_KEY = "portfolio-lang";

const readStoredLanguage = () => {
  try {
    const stored = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);
    return isLanguage(stored) ? stored : null;
  } catch {
    return null;
  }
};

const LanguageContext = createContext({
  lang: DEFAULT_LANGUAGE,
  setLang: () => {},
  toggleLang: () => {},
});

/**
 * Active site language, `"en"` (default) or `"id"`, persisted in localStorage
 * and mirrored to `<html lang>` for screen readers, hyphenation and search.
 */
export const LanguageProvider = ({ children }) => {
  const [lang, setLangState] = useState(() => readStoredLanguage() ?? DEFAULT_LANGUAGE);

  useEffect(() => {
    document.documentElement.lang = lang;
    try {
      window.localStorage.setItem(LANGUAGE_STORAGE_KEY, lang);
    } catch {
      // Private mode or blocked storage: the choice still applies to this visit.
    }
  }, [lang]);

  const setLang = useCallback((next) => {
    if (isLanguage(next)) setLangState(next);
  }, []);

  const toggleLang = useCallback(() => setLangState((current) => (current === "en" ? "id" : "en")), []);

  const value = useMemo(() => ({ lang, setLang, toggleLang }), [lang, setLang, toggleLang]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};

export const useLanguage = () => useContext(LanguageContext);

/** Returns `content` with every `tx("en", "id")` value resolved to the active language. */
export const useLocalized = (content) => {
  const { lang } = useLanguage();
  return useMemo(() => localize(content, lang), [content, lang]);
};
