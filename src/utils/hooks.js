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

/**
 * Smooth-scrolls to an element (in-page "#anchors" would add to the browser
 * history). Inside a desktop `.scroll-pane` that pane scrolls; elsewhere the
 * window does, leaving room for the fixed navbar.
 */
export const scrollToId = (id, offset = 96) => {
  const target = document.getElementById(id);
  if (!target) return;
  const pane = target.closest(".scroll-pane");
  if (pane && pane.scrollHeight > pane.clientHeight && getComputedStyle(pane).overflowY !== "visible") {
    const top = target.getBoundingClientRect().top - pane.getBoundingClientRect().top + pane.scrollTop - 16;
    pane.scrollTo({ top, behavior: "smooth" });
    return;
  }
  const top = target.getBoundingClientRect().top + window.scrollY - offset;
  window.scrollTo({ top, behavior: "smooth" });
};
