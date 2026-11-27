import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import { ArrowLeftIcon, ArrowRightIcon, CheckIcon, Icon, LinkIcon } from "./Icons.jsx";
import { useLocalized } from "../context/LanguageContext.jsx";
import { siteUrl, ui } from "../constants/index.js";

/**
 * Copies text with the async clipboard, falling back to `execCommand` where it
 * is missing or refused (an unfocused document, an older browser).
 */
const copyText = async (text) => {
  try {
    await navigator.clipboard.writeText(text);
    return;
  } catch {
    // Fall through to the selection-based copy.
  }
  const field = document.createElement("textarea");
  field.value = text;
  field.setAttribute("readonly", "");
  field.style.position = "fixed";
  field.style.opacity = "0";
  document.body.appendChild(field);
  field.select();
  const ok = document.execCommand("copy");
  field.remove();
  if (!ok) throw new Error("Copy failed");
};

/**
 * "Copy Link": copies the clean public URL of the current page
 * (`https://adriansyahpn.com/projects/niskala`), or of `path` when given (the
 * note shown on `/notes`), and says "Copied" for a moment.
 */
export const CopyLinkButton = ({ path = null, className = "" }) => {
  const { pathname } = useLocation();
  const { common } = useLocalized(ui);
  const [copied, setCopied] = useState(false);
  const timer = useRef(null);
  const url = new URL(path ?? pathname, siteUrl).href;

  useEffect(() => () => clearTimeout(timer.current), []);

  const copy = async () => {
    try {
      await copyText(url);
      setCopied(true);
      clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  return (
    <button
      type="button"
      onClick={copy}
      className={`copy-link ${copied ? "is-copied" : ""} ${className}`}
      aria-label={copied ? common.linkCopied : common.copyLinkLabel}
      title={url}
    >
      {copied ? <CheckIcon className="size-3.5 flex-none" /> : <LinkIcon className="size-3.5 flex-none" />}
      <span aria-hidden="true">{copied ? common.linkCopied : common.copyLink}</span>
      <span className="sr-only" aria-live="polite">
        {copied ? common.linkCopied : ""}
      </span>
    </button>
  );
};

/**
 * Previous / Next links at the end of a reader. `items` is the ordered list of
 * `{ to, title, meta }`; `index` is the current page's place in it. The list
 * wraps around, so every page has both links. `extra` (`{ to, label, icon }`)
 * adds an internal cross-link on its own row underneath, such as the sibling
 * case study to compare with.
 */
export const PagerNav = ({ items, index, label, extra = null, className = "" }) => {
  const { common } = useLocalized(ui);
  if (items.length < 2) return null;
  const previous = items[(index - 1 + items.length) % items.length];
  const next = items[(index + 1) % items.length];

  return (
    <nav className={`pager ${className}`} aria-label={label}>
      <Link to={previous.to} className="pager-link group" rel="prev">
        <ArrowLeftIcon className="size-5 flex-none text-blue-50 transition-transform group-hover:-translate-x-1" />
        <span className="min-w-0">
          <span className="pager-meta">
            {common.previous}
            {previous.meta ? ` · ${previous.meta}` : ""}
          </span>
          <span className="pager-title">{previous.title}</span>
        </span>
      </Link>
      <Link to={next.to} className="pager-link is-next group" rel="next">
        <span className="min-w-0">
          <span className="pager-meta">
            {common.next}
            {next.meta ? ` · ${next.meta}` : ""}
          </span>
          <span className="pager-title">{next.title}</span>
        </span>
        <ArrowRightIcon className="size-5 flex-none text-accent-cyan transition-transform group-hover:translate-x-1" />
      </Link>
      {extra && (
        <Link to={extra.to} className="pager-compare group">
          {extra.icon && <Icon name={extra.icon} className="size-4 flex-none text-blue-50" />}
          {extra.label}
          <ArrowRightIcon className="size-4 flex-none text-accent-cyan transition-transform group-hover:translate-x-1" />
        </Link>
      )}
    </nav>
  );
};
