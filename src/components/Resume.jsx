import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

import { ArrowDownIcon, CloseIcon, GitHubIcon } from "./Icons.jsx";
import { useLocalized } from "../context/LanguageContext.jsx";
import { contactEmail, expCards, githubUser, links, projects, resume, siteUrl, ui } from "../constants/index.js";
import { assetUrl } from "../utils/assets.js";

const PDF_URL = assetUrl(resume.pdfPath);

/**
 * Resolves once per visit: true only when `public/cv-adriansyah.pdf` really
 * exists. The content-type check matters because dev servers answer unknown
 * paths with index.html (HTTP 200).
 */
let pdfCheck = null;
const checkPdf = () => {
  pdfCheck ??= fetch(PDF_URL, { method: "HEAD", cache: "no-store" })
    .then((response) => response.ok && (response.headers.get("content-type") ?? "").includes("pdf"))
    .catch(() => false);
  return pdfCheck;
};

const usePdfAvailable = () => {
  const [available, setAvailable] = useState(false);
  useEffect(() => {
    let alive = true;
    checkPdf().then((value) => alive && setAvailable(value));
    return () => {
      alive = false;
    };
  }, []);
  return available;
};

/** Strip the `backtick` markers used for inline code chips elsewhere on the site. */
const plain = (text) => text.replaceAll("`", "");

/** Print-ready résumé in a modal <dialog>. "Print / Save as PDF" prints only the sheet (see `@media print`). */
const ResumeDialog = ({ open, onClose, pdfAvailable }) => {
  const dialogRef = useRef(null);
  const { cv: text } = useLocalized(ui);
  const data = useLocalized(resume);
  const experience = useLocalized(expCards);
  const work = useLocalized(projects);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return undefined;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
    if (!open) return undefined;
    const root = document.documentElement;
    const previous = root.style.overflow;
    root.style.overflow = "hidden";
    return () => {
      root.style.overflow = previous;
    };
  }, [open]);

  return createPortal(
    <dialog
      ref={dialogRef}
      className="resume-dialog"
      aria-labelledby="resume-name"
      onClose={onClose}
      onClick={(event) => event.target === dialogRef.current && onClose()}
    >
      <div className="resume-toolbar">
        <p className="font-mono text-xs tracking-widest text-blue-50 uppercase">{text.dialogTitle}</p>
        <div className="flex flex-wrap items-center gap-2">
          {pdfAvailable && (
            <a href={PDF_URL} download className="project-link secondary">
              <ArrowDownIcon className="size-4" />
              {text.downloadPdf}
            </a>
          )}
          <button type="button" className="project-link primary" onClick={() => window.print()}>
            {text.print}
          </button>
          <button type="button" className="resume-close" onClick={onClose} aria-label={text.close} title={text.close}>
            <CloseIcon className="size-5" />
          </button>
        </div>
      </div>

      <article className="resume-sheet">
        <header className="resume-head">
          <div>
            <h2 id="resume-name">{data.name}</h2>
            <p className="resume-role">{data.role}</p>
            <p className="resume-meta">{data.location}</p>
          </div>
          <ul className="resume-links">
            <li>
              <a href={siteUrl}>{siteUrl.replace(/^https:\/\//, "").replace(/\/$/, "")}</a>
            </li>
            <li>
              <a href={links.githubProfile}>
                <GitHubIcon className="size-3.5" /> github.com/{githubUser}
              </a>
            </li>
          </ul>
        </header>

        <section>
          <h3>{text.summary}</h3>
          <p>{data.summary}</p>
        </section>

        <section>
          <h3>{text.experience}</h3>
          {experience.map((job) => (
            <div key={job.id} className="resume-entry">
              <div className="resume-entry-head">
                <p>
                  <strong>{job.title}</strong> · {job.project}
                </p>
                <p className="resume-meta">{job.period}</p>
              </div>
              <ul>
                {job.responsibilities.map((item) => (
                  <li key={item}>{plain(item)}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        <section>
          <h3>{text.projects}</h3>
          <ul className="resume-projects">
            {work.map((project) => (
              <li key={project.id}>
                <strong>{project.shortTitle}</strong>
                <span className="resume-meta"> · {project.category === "original" ? project.categoryLabel : project.platform}</span>
                <span className="block">{plain(project.description).split(". ")[0].replace(/\.$/, "")}.</span>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h3>{text.skills}</h3>
          <dl className="resume-skills">
            {data.skills.map((group) => (
              <div key={group.id}>
                <dt>{group.title}</dt>
                <dd>{group.items.join(" · ")}</dd>
              </div>
            ))}
          </dl>
        </section>

        <p className="resume-foot">
          {text.contactNote}: {contactEmail} · {siteUrl}#/contact · github.com/{githubUser}
        </p>
      </article>
    </dialog>,
    document.body,
  );
};

/**
 * "Download CV": downloads `public/cv-adriansyah.pdf` when that file exists,
 * otherwise opens the printable résumé (which can be saved as a PDF).
 */
/** "Download CV" button, or nothing while `resume.showButton` is off. */
export const CvButton = (props) => (resume.showButton ? <CvButtonInner {...props} /> : null);

const CvButtonInner = ({ className = "" }) => {
  const [open, setOpen] = useState(false);
  const pdfAvailable = usePdfAvailable();
  const { cv: text } = useLocalized(ui);
  const content = (
    <>
      <ArrowDownIcon className="size-4" />
      {text.download}
    </>
  );

  if (pdfAvailable) {
    return (
      <a href={PDF_URL} download className={`cv-button ${className}`}>
        {content}
      </a>
    );
  }

  return (
    <>
      <button type="button" className={`cv-button ${className}`} onClick={() => setOpen(true)} aria-haspopup="dialog">
        {content}
      </button>
      <ResumeDialog open={open} onClose={() => setOpen(false)} pdfAvailable={pdfAvailable} />
    </>
  );
};
