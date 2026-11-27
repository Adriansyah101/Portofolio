import { Link, useParams } from "react-router-dom";

import PageHeader from "../components/PageHeader.jsx";
import { ArrowLeftIcon, ArrowRightIcon } from "../components/Icons.jsx";
import { CaseStudyBlock } from "../components/CaseStudyBlocks.jsx";
import { NoteCard, noteRoute, readingMinutes } from "../components/NoteBits.jsx";
import { CopyLinkButton, PagerNav } from "../components/ReaderBits.jsx";
import { ProjectTags } from "../components/ProjectBits.jsx";
import NotFound from "./NotFound.jsx";
import { useLanguage, useLocalized } from "../context/LanguageContext.jsx";
import { engineeringNotes, routes, ui } from "../constants/index.js";
import { format, formatDate } from "../utils/i18n.js";
import { scrollToId, usePageTitle } from "../utils/hooks.js";

/**
 * The full text of one note: header (date, reading time, Copy Link), "on this
 * page" chips, sections, related work and the Previous / Next notes.
 */
const NoteReader = ({ note, pager, index, isPageTitle }) => {
  const { lang } = useLanguage();
  const { notes: text, caseStudy: caseText, common } = useLocalized(ui);
  // On `/notes` the list owns the page's h1, so the note title steps down one level.
  const Title = isPageTitle ? "h1" : "h2";
  const Heading = isPageTitle ? "h2" : "h3";
  const titleId = `note-${note.slug}-title`;

  return (
    <article className="notes-reader scroll-pane" aria-labelledby={titleId}>
      <div className="@container">
        <nav aria-label={caseText.breadcrumb} className="mb-6 lg:hidden">
          <ol className="flex flex-wrap items-center gap-2 text-sm text-blue-50">
            <li>
              <Link to={routes.notes} className="hover:text-white">
                {text.pageTitle}
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="min-w-0 text-white-50">
              {note.kicker}
            </li>
          </ol>
        </nav>
        <p className="page-eyebrow">{note.kicker}</p>
        <Title id={titleId} className="page-title lg:text-[clamp(1.5rem,3.2vh,2.125rem)]">
          {note.title}
        </Title>
        <p className="page-description">{note.summary}</p>
        <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-2">
          <p className="font-mono text-xs text-blue-50">
            {text.published} {formatDate(note.published, lang, { day: "numeric", month: "long", year: "numeric" })} ·{" "}
            <span className="reading-time">{format(text.minutes, { n: readingMinutes(note) })}</span>
          </p>
          <CopyLinkButton path={noteRoute(note.slug)} />
        </div>
        <div className="mt-4">
          <ProjectTags tags={note.tags} />
        </div>

        <nav className="jump-nav mt-8 lg:mt-6" aria-label={common.onThisPage}>
          {note.sections.map((section, index) => (
            <button key={section.id} type="button" className="jump-chip" onClick={() => scrollToId(section.id)}>
              <span className="font-mono text-accent-cyan">{String(index + 1).padStart(2, "0")}</span>
              {section.title}
            </button>
          ))}
        </nav>

        {note.sections.map((section, index) => (
          <section key={section.id} id={section.id} className="case-section" aria-labelledby={`${section.id}-title`}>
            <p className="font-mono text-sm text-accent-cyan">{String(index + 1).padStart(2, "0")}</p>
            <Heading id={`${section.id}-title`} className="mt-2 text-3xl font-semibold text-balance md:text-4xl lg:text-2xl xl:text-3xl">
              {section.title}
            </Heading>
            <div className="mt-8 flex flex-col gap-8 lg:mt-6">
              {section.blocks.map((block, blockIndex) => (
                <CaseStudyBlock key={`${section.id}-${blockIndex}`} block={block} />
              ))}
            </div>
          </section>
        ))}

        <section className="mt-16 lg:mt-12" aria-labelledby={`${titleId}-related`}>
          <Heading id={`${titleId}-related`} className="font-mono text-xs tracking-widest text-blue-50 uppercase">
            {text.related}
          </Heading>
          <div className="mt-4 flex flex-wrap gap-3">
            {note.related.map((item) => (
              <Link key={item.to} to={item.to} className="project-link secondary">
                {item.label}
                <ArrowRightIcon className="size-4" />
              </Link>
            ))}
          </div>
        </section>

        <PagerNav items={pager} index={index} label={text.pager} className="mt-12 lg:mt-10" />

        <Link to={routes.notes} className="back-link group mt-6 mb-0 lg:hidden">
          <ArrowLeftIcon className="size-4 transition-transform group-hover:-translate-x-0.5" />
          {text.allNotes}
        </Link>
      </div>
    </article>
  );
};

/**
 * `/notes` and `/notes/:slug`: the Engineering Notes (Catatan Teknis).
 * From 1024px up this is a master-detail view: the note list on the left and
 * the selected note (the first one on `/notes`) in a reading pane on the right
 * that scrolls on its own. Below 1024px `/notes` is the list and
 * `/notes/:slug` is the note as a normal scrolling page.
 */
const Notes = () => {
  const { slug } = useParams();
  const notes = useLocalized(engineeringNotes);
  const { notes: text, meta } = useLocalized(ui);
  const index = slug ? notes.findIndex((item) => item.slug === slug) : 0;
  const note = notes[index];
  usePageTitle(slug ? (note ? note.title : meta.notFound) : text.pageTitle);

  if (!note) return <NotFound />;
  const pager = notes.map((item) => ({ to: noteRoute(item.slug), title: item.title, meta: item.kicker }));

  return (
    <div className="page-shell page-enter">
      <div className="page-frame">
        <div className="notes-layout">
          <aside className={`notes-sidebar scroll-pane ${slug ? "hidden lg:flex" : "flex"}`} aria-label={text.pageTitle}>
            <PageHeader
              eyebrow={text.eyebrow}
              title={text.title}
              description={text.description}
              titleAs={slug ? "p" : "h1"}
              className="notes-intro"
            />
            <ul className="notes-list">
              {notes.map((item) => (
                <li key={item.slug} className="min-w-0">
                  <NoteCard note={item} headingLevel={slug ? "p" : "h2"} selected={item.slug === note.slug} current={item.slug === slug} />
                </li>
              ))}
            </ul>
          </aside>

          {/* On phones the index shows only the list; the note opens as its own page. */}
          <div className={`min-w-0 lg:flex lg:min-h-0 ${slug ? "" : "hidden"}`} key={note.slug}>
            <NoteReader note={note} pager={pager} index={index} isPageTitle={Boolean(slug)} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notes;
