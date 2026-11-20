import { Link, useParams } from "react-router-dom";

import { ArrowLeftIcon, ArrowRightIcon } from "../components/Icons.jsx";
import { CaseStudyBlock } from "../components/CaseStudyBlocks.jsx";
import { noteRoute, readingMinutes } from "../components/NoteBits.jsx";
import { ProjectTags } from "../components/ProjectBits.jsx";
import NotFound from "./NotFound.jsx";
import { useLanguage, useLocalized } from "../context/LanguageContext.jsx";
import { engineeringNotes, routes, ui } from "../constants/index.js";
import { format, formatDate } from "../utils/i18n.js";
import { scrollToId, usePageTitle } from "../utils/hooks.js";

/** `/notes/:slug`: one Engineering Note, laid out like a case study. */
const NoteArticle = () => {
  const { slug } = useParams();
  const { lang } = useLanguage();
  const notes = useLocalized(engineeringNotes);
  const { notes: text, caseStudy: caseText, meta, common } = useLocalized(ui);
  const index = notes.findIndex((item) => item.slug === slug);
  const note = notes[index];
  usePageTitle(note ? note.title : meta.notFound);

  if (!note) return <NotFound />;
  const next = notes[(index + 1) % notes.length];

  return (
    <article className="page-enter" key={slug}>
      <header className="page-header">
        <div className="hero-bg" aria-hidden="true" />
        <div className="relative z-10 mx-auto w-full max-w-[1600px]">
          <nav aria-label={caseText.breadcrumb} className="mb-6">
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
          <h1 className="page-title text-balance">{note.title}</h1>
          <p className="page-description">{note.summary}</p>
          <p className="mt-6 font-mono text-xs text-blue-50">
            {text.published} {formatDate(note.published, lang, { day: "numeric", month: "long", year: "numeric" })} ·{" "}
            {format(text.minutes, { n: readingMinutes(note) })}
          </p>
          <div className="mt-5">
            <ProjectTags tags={note.tags} />
          </div>
        </div>
      </header>

      <nav className="padding-x-lg mt-12" aria-label={common.onThisPage}>
        <div className="jump-nav mx-auto w-full max-w-[1600px]">
          {note.sections.map((section, sectionIndex) => (
            <button key={section.id} type="button" className="jump-chip" onClick={() => scrollToId(section.id)}>
              <span className="font-mono text-accent-cyan">{String(sectionIndex + 1).padStart(2, "0")}</span>
              {section.title}
            </button>
          ))}
        </div>
      </nav>

      {note.sections.map((section, sectionIndex) => (
        <section key={section.id} id={section.id} className="case-section" aria-labelledby={`${section.id}-title`}>
          <div className="mx-auto w-full max-w-[1600px]">
            <p className="font-mono text-sm text-accent-cyan">{String(sectionIndex + 1).padStart(2, "0")}</p>
            <h2 id={`${section.id}-title`} className="mt-2 text-3xl font-semibold text-balance md:text-4xl">
              {section.title}
            </h2>
            <div className="mt-8 flex flex-col gap-8">
              {section.blocks.map((block, blockIndex) => (
                <CaseStudyBlock key={`${section.id}-${blockIndex}`} block={block} />
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* Related work */}
      <section className="padding-x-lg mt-16" aria-labelledby="note-related">
        <div className="mx-auto w-full max-w-[1600px]">
          <h2 id="note-related" className="font-mono text-xs tracking-widest text-blue-50 uppercase">
            {text.related}
          </h2>
          <div className="mt-4 flex flex-wrap gap-3">
            {note.related.map((item) => (
              <Link key={item.to} to={item.to} className="project-link secondary">
                {item.label}
                <ArrowRightIcon className="size-4" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="padding-x-lg mt-16 md:mt-20" aria-label={text.nextNote}>
        <div className="mx-auto grid w-full max-w-[1600px] grid-cols-1 gap-5 md:grid-cols-2">
          <Link to={routes.notes} className="next-card group">
            <ArrowLeftIcon className="size-5 text-blue-50 transition-transform group-hover:-translate-x-1" />
            <span>
              <span className="block font-mono text-xs tracking-widest text-blue-50 uppercase">{text.backTo}</span>
              <span className="mt-1 block text-xl font-semibold">{text.allNotes}</span>
            </span>
          </Link>
          {next.slug !== note.slug && (
            <Link to={noteRoute(next.slug)} className="next-card group justify-between">
              <span className="min-w-0">
                <span className="block font-mono text-xs tracking-widest text-blue-50 uppercase">{text.nextNote}</span>
                <span className="mt-1 block text-xl font-semibold text-balance">{next.title}</span>
              </span>
              <ArrowRightIcon className="size-5 flex-none text-accent-cyan transition-transform group-hover:translate-x-1" />
            </Link>
          )}
        </div>
      </section>
    </article>
  );
};

export default NoteArticle;
