import PageHeader from "../components/PageHeader.jsx";
import { NoteCard } from "../components/NoteBits.jsx";
import { useLocalized } from "../context/LanguageContext.jsx";
import { engineeringNotes, ui } from "../constants/index.js";
import { usePageTitle } from "../utils/hooks.js";

/** `/notes`: index of the Engineering Notes (Catatan Teknis). */
const Notes = () => {
  const { notes: text } = useLocalized(ui);
  const notes = useLocalized(engineeringNotes);
  usePageTitle(text.pageTitle);

  return (
    <div className="page-enter">
      <PageHeader eyebrow={text.eyebrow} title={text.title} description={text.description} />
      <section className="padding-x-lg mt-12" aria-label={text.pageTitle}>
        <div className="mx-auto grid w-full max-w-[1600px] grid-cols-1 gap-5 lg:grid-cols-2">
          {notes.map((note) => (
            <NoteCard key={note.slug} note={note} headingLevel="h2" />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Notes;
