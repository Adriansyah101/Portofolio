import { Link } from "react-router-dom";
import { ArrowRightIcon, Icon } from "./Icons.jsx";
import { useLanguage, useLocalized } from "../context/LanguageContext.jsx";
import { engineeringNotes, routes, ui } from "../constants/index.js";
import { format, formatDate } from "../utils/i18n.js";

/** Rough reading time at ~200 words per minute, from every string in the note. */
export const readingMinutes = (note) => {
  const words = JSON.stringify(note.sections).split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
};

export const noteRoute = (slug) => `${routes.notes}/${slug}`;

/** Card linking to one note: kicker, title, summary, reading time. */
export const NoteCard = ({ note, headingLevel = "h3" }) => {
  const { lang } = useLanguage();
  const { notes: text } = useLocalized(ui);
  const Heading = headingLevel;

  return (
    <Link to={noteRoute(note.slug)} className="note-card group">
      <div className="flex items-center justify-between gap-3">
        <span className="flex-center size-10 rounded-lg bg-black-50 text-accent-cyan">
          <Icon name={note.icon} className="size-5" />
        </span>
        <span className="font-mono text-[11px] text-blue-50">
          {formatDate(note.published, lang)} · {format(text.minutes, { n: readingMinutes(note) })}
        </span>
      </div>
      <p className="mt-5 font-mono text-xs tracking-widest text-accent-cyan uppercase">{note.kicker}</p>
      <Heading className="mt-2 text-xl font-semibold text-balance text-white-50 md:text-2xl">{note.title}</Heading>
      <p className="mt-3 leading-relaxed text-body">{note.summary}</p>
      <span className="mt-auto inline-flex items-center gap-1.5 pt-6 text-sm font-medium text-white-50">
        {text.read}
        <ArrowRightIcon className="size-4 transition-transform group-hover:translate-x-1" />
      </span>
    </Link>
  );
};

/** "Engineering Notes" block at the end of /journey and /projects. `first` puts the most relevant note first. */
export const NotesTeaser = ({ first }) => {
  const notes = useLocalized(engineeringNotes);
  const { notes: text } = useLocalized(ui);
  const ordered = [...notes].sort((a, b) => (a.slug === first ? -1 : b.slug === first ? 1 : 0));

  return (
    <section className="padding-x-lg mt-20 md:mt-28" aria-labelledby="notes-teaser-title">
      <div className="mx-auto w-full max-w-[1600px]">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="font-mono text-xs tracking-widest text-accent-cyan uppercase">{text.teaserSub}</p>
            <h2 id="notes-teaser-title" className="mt-3 text-2xl font-semibold md:text-3xl">
              {text.teaserTitle}
            </h2>
          </div>
          <Link to={routes.notes} className="project-link secondary">
            {text.teaserAll}
            <ArrowRightIcon className="size-4" />
          </Link>
        </div>
        <div className="mt-8 grid grid-cols-1 gap-5 lg:grid-cols-2">
          {ordered.map((note) => (
            <NoteCard key={note.slug} note={note} />
          ))}
        </div>
      </div>
    </section>
  );
};
