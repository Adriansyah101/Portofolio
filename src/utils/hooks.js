import { useEffect } from "react";
import { useLocalized } from "../context/LanguageContext.jsx";
import { ui } from "../constants/index.js";

/** Sets `document.title` for the current page (pass an already localized title, or null for Home). */
export const usePageTitle = (title) => {
  const { siteName, role } = useLocalized(ui.meta);
  useEffect(() => {
    document.title = title ? `${title} | ${siteName}` : `${siteName} | ${role}`;
  }, [title, siteName, role]);
};

/** Instantly scrolls to an element on the page (in-page "#anchors" would change the HashRouter route). */
export const scrollToId = (id, offset = 96) => {
  const target = document.getElementById(id);
  if (!target) return;
  const top = target.getBoundingClientRect().top + window.scrollY - offset;
  window.scrollTo({ top, behavior: "smooth" });
};
