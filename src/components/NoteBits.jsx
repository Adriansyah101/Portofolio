import { Link } from "react-router-dom";
import { ArrowRightIcon, Icon } from "./Icons.jsx";
import { useLanguage, useLocalized } from "../context/LanguageContext.jsx";
import { routes, ui } from "../constants/index.js";
import { format, formatDate } from "../utils/i18n.js";

/** Rough reading time at ~200 words per minute, from every string in the note. */
export const readingMinutes = (note) => {
  const words = JSON.stringify(note.sections).split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
};

export const noteRoute = (slug) => `${routes.notes}/${slug}`;

/**
 * Card linking to one note: kicker, title, summary, reading time. `selected`
 * marks the note open in the desktop reading pane; `current` adds
 * `aria-current` when that note is also the page's route.
 */
export const NoteCard = ({ note, headingLevel = "h3", selected = false, current = false }) => {
  const { lang } = useLanguage();
  const { notes: text } = useLocalized(ui);
  const Heading = headingLevel;

  return (
    <Link
      to={noteRoute(note.slug)}
      className={`note-card group ${selected ? "is-selected" : ""}`}
      aria-current={current ? "page" : undefined}
    >
      <div className="flex items-center justify-between gap-3">
        <span className="flex-center size-10 rounded-lg bg-black-50 text-accent-cyan lg:size-9">
          <Icon name={note.icon} className="size-5" />
        </span>
        <span className="font-mono text-[11px] text-blue-50">
          {formatDate(note.published, lang)} · {format(text.minutes, { n: readingMinutes(note) })}
        </span>
      </div>
      <p className="mt-5 font-mono text-xs tracking-widest text-accent-cyan uppercase lg:mt-4">{note.kicker}</p>
      <Heading className="mt-2 text-xl font-semibold text-balance text-white-50 md:text-2xl lg:text-lg">{note.title}</Heading>
      <p className="mt-3 leading-relaxed text-body lg:mt-2 lg:text-sm">{note.summary}</p>
      <span className="note-read">
        {text.read}
        <ArrowRightIcon className="size-4 transition-transform group-hover:translate-x-1" />
      </span>
    </Link>
  );
};
