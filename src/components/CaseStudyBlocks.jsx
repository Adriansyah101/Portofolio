import { useState } from "react";
import { ArrowRightIcon, Icon } from "./Icons.jsx";
import { renderInlineCode } from "../utils/text.jsx";
import { useLocalized } from "../context/LanguageContext.jsx";
import { ui } from "../constants/index.js";

/* -------------------------------------------------------------------------- */
/*                         Case-study content blocks                          */
/* -------------------------------------------------------------------------- */

const cardGrid = (count) =>
  count === 3 ? "md:grid-cols-2 lg:grid-cols-3" : count >= 4 ? "md:grid-cols-2 xl:grid-cols-4" : "md:grid-cols-2";

const Cards = ({ items }) => (
  <ul className={`grid grid-cols-1 gap-5 ${cardGrid(items.length)}`}>
    {items.map((item, index) => (
      <li
        key={item.title}
        className={`card-border flex flex-col gap-3 rounded-xl p-6 ${
          items.length === 3 && index === 2 ? "md:col-span-2 lg:col-span-1" : ""
        }`}
      >
        <span className="flex-center size-11 rounded-full bg-black-50 text-accent-cyan">
          <Icon name={item.icon} className="size-5" />
        </span>
        <h3 className="text-lg font-semibold text-white-50">{item.title}</h3>
        <p className="leading-relaxed text-white-50/70">{renderInlineCode(item.body)}</p>
      </li>
    ))}
  </ul>
);

const Timeline = ({ items }) => (
  <ol className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
    {items.map((item, index) => (
      <li key={item.title} className="case-timeline-item">
        <span className={`case-timeline-dot ${index === items.length - 1 ? "lost" : ""}`} aria-hidden="true" />
        <p className="font-mono text-xs tracking-widest text-accent-cyan uppercase">{item.when}</p>
        <h3 className="mt-2 text-lg font-semibold text-white-50">{item.title}</h3>
        <p className="mt-2 leading-relaxed text-white-50/70">{item.body}</p>
      </li>
    ))}
  </ol>
);

/** Numbered pipeline: a horizontal row on wide screens, a stack on phones. */
const Flow = ({ steps, caption }) => (
  <figure>
    <figcaption className="mb-4 font-mono text-xs tracking-widest text-blue-50 uppercase">{caption}</figcaption>
    <ol className="grid grid-cols-1 gap-8 sm:grid-cols-2 xl:grid-cols-5 xl:gap-6">
      {steps.map((step, index) => (
        <li
          key={step.title}
          className={`flow-step ${steps.length % 2 === 1 && index === steps.length - 1 ? "sm:col-span-2 xl:col-span-1" : ""}`}
        >
          <div className="flex items-center justify-between">
            <span className="flex-center size-10 rounded-lg bg-black-50 text-accent-cyan">
              <Icon name={step.icon} className="size-5" />
            </span>
            <span className="font-mono text-xs text-blue-50">{String(index + 1).padStart(2, "0")}</span>
          </div>
          <h3 className="mt-4 font-semibold text-white-50">{step.title}</h3>
          <p className="mt-1 text-sm leading-relaxed text-white-50/65">{step.body}</p>
          {index < steps.length - 1 && (
            <span className="flow-connector" aria-hidden="true">
              <ArrowRightIcon className="size-4" />
            </span>
          )}
        </li>
      ))}
    </ol>
  </figure>
);

/** Legacy service (offline) replaced by a chain of new components. */
const Architecture = ({ legacy, nodes }) => {
  const { caseStudy: text } = useLocalized(ui);
  return (
    <figure className="arch-diagram" aria-label={text.architectureLabel}>
      <div className="arch-legacy">
        <div className="flex items-center justify-between gap-3">
          <span className="flex-center size-10 rounded-lg bg-rose-400/10 text-rose-300">
            <Icon name={legacy.icon} className="size-5" />
          </span>
          <span className="rounded-full border border-rose-400/30 px-2.5 py-0.5 font-mono text-[11px] text-rose-300 uppercase">
            {text.offline}
          </span>
        </div>
        <h3 className="mt-4 font-semibold text-white-50/70 line-through decoration-rose-400/60">{legacy.title}</h3>
        <p className="mt-1 text-sm text-white-50/70">{legacy.body}</p>
      </div>

      <div className="arch-replaced" aria-hidden="true">
        <span>{text.replacedBy}</span>
        <ArrowRightIcon className="size-5 rotate-90 xl:rotate-0" />
      </div>

      <ol className="arch-chain">
        {nodes.map((node, index) => (
          <li key={node.title} className="arch-node">
            <span className="flex-center size-10 rounded-lg bg-accent-cyan/10 text-accent-cyan">
              <Icon name={node.icon} className="size-5" />
            </span>
            <h3 className="mt-4 font-semibold text-white-50">{node.title}</h3>
            <p className="mt-1 text-sm leading-relaxed text-white-50/70">{renderInlineCode(node.body)}</p>
            {index < nodes.length - 1 && (
              <span className="arch-connector" aria-hidden="true">
                <ArrowRightIcon className="size-4" />
              </span>
            )}
          </li>
        ))}
      </ol>
    </figure>
  );
};

export const DataTable = ({ caption, columns, rows }) => (
  <div className="data-table-wrap">
    <table className="data-table" style={{ "--cols": columns.length - 1 }}>
      {caption && <caption>{caption}</caption>}
      <thead>
        <tr>
          {columns.map((column) => (
            <th key={column} scope="col">
              {column}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row) => (
          <tr key={row[0]}>
            {row.map((cell, index) =>
              index === 0 ? (
                <th key={index} scope="row">
                  {cell}
                </th>
              ) : (
                <td key={index}>
                  <kbd className="kbd-text">{cell}</kbd>
                </td>
              ),
            )}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const Checklist = ({ title, items }) => (
  <div className="card-border rounded-xl p-6 md:p-8">
    <h3 className="text-lg font-semibold text-white-50">{title}</h3>
    <ul className="mt-5 grid grid-cols-1 gap-3 md:grid-cols-2">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3 text-body">
          <Icon name="shield" className="mt-0.5 size-5 flex-none text-emerald-300" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  </div>
);

const CopyButton = ({ text }) => {
  const [copied, setCopied] = useState(false);
  const { caseStudy: labels } = useLocalized(ui);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  };

  return (
    <button type="button" onClick={copy} className="copy-btn">
      <span aria-live="polite">{copied ? labels.copied : labels.copy}</span>
    </button>
  );
};

const Code = ({ caption, snippets, note }) => (
  <div className="card-border rounded-xl p-6 md:p-8">
    <h3 className="text-lg font-semibold text-white-50">{caption}</h3>
    <div className="mt-5 grid grid-cols-1 gap-4 lg:grid-cols-2">
      {snippets.map((snippet) => (
        <div key={snippet.label} className="min-w-0">
          <div className="mb-2 flex items-center justify-between gap-3">
            <p className="font-mono text-xs tracking-widest text-blue-50 uppercase">{snippet.label}</p>
            <CopyButton text={snippet.code} />
          </div>
          <pre className="code-block">
            <code>{snippet.code}</code>
          </pre>
        </div>
      ))}
    </div>
    {note && <p className="mt-4 text-sm text-white-50/60">{note}</p>}
  </div>
);

const Links = ({ items }) => (
  <div className="flex flex-wrap gap-3">
    {items.map((item) => (
      <a
        key={item.href}
        href={item.href}
        target="_blank"
        rel="noopener noreferrer"
        className={`project-link ${item.primary ? "primary" : "secondary"}`}
      >
        <Icon name={item.icon} className="size-4" />
        {item.label}
      </a>
    ))}
  </div>
);

const Prose = ({ paragraphs }) => (
  <div className="flex max-w-3xl flex-col gap-4 text-lg leading-relaxed text-body">
    {paragraphs.map((paragraph) => (
      <p key={paragraph}>{renderInlineCode(paragraph)}</p>
    ))}
  </div>
);

const blockMap = {
  prose: Prose,
  cards: Cards,
  timeline: Timeline,
  flow: Flow,
  architecture: Architecture,
  table: DataTable,
  checklist: Checklist,
  code: Code,
  links: Links,
};

export const CaseStudyBlock = ({ block }) => {
  const Component = blockMap[block.type];
  return Component ? <Component {...block} /> : null;
};
