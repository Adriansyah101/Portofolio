import { useEffect } from "react";

const SITE_NAME = "Adriansyah Prasetya Nugraha";
const DEFAULT_TITLE = `${SITE_NAME} | Systems & Application Operations Engineer`;

/** Sets `document.title` for the current page. */
export const usePageTitle = (title) => {
  useEffect(() => {
    document.title = title ? `${title} | ${SITE_NAME}` : DEFAULT_TITLE;
  }, [title]);
};

/** Instantly scrolls to an element on the page (in-page "#anchors" would change the HashRouter route). */
export const scrollToId = (id, offset = 96) => {
  const target = document.getElementById(id);
  if (!target) return;
  const top = target.getBoundingClientRect().top + window.scrollY - offset;
  window.scrollTo({ top, behavior: "smooth" });
};
