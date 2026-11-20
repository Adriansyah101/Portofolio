import { useId, useState } from "react";
import { brandLogos } from "../constants/index.js";

/**
 * Inline SVG emblem for PT ASDP Indonesia Ferry (Persero): a stylised ferry
 * hull riding cyan waves on a deep-ocean badge. It is a portfolio illustration
 * drawn in code (not the official corporate logo), so it renders instantly and
 * can never become a broken image link.
 *
 * `shape="circle"` fits round slots such as the timeline marker.
 */
export const AsdpEmblem = ({ className = "", shape = "square", title }) => {
  const uid = useId().replace(/:/g, "");
  const sea = `${uid}-sea`;
  const hull = `${uid}-hull`;
  const labelled = Boolean(title);

  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      role={labelled ? "img" : undefined}
      aria-hidden={labelled ? undefined : true}
      focusable="false"
    >
      {labelled && <title>{title}</title>}
      <defs>
        <linearGradient id={sea} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#0e4c92" />
          <stop offset="1" stopColor="#061a3a" />
        </linearGradient>
        <linearGradient id={hull} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f0f9ff" />
          <stop offset="1" stopColor="#a5dcff" />
        </linearGradient>
      </defs>

      {shape === "circle" ? (
        <>
          <circle cx="32" cy="32" r="32" fill={`url(#${sea})`} />
          <circle cx="32" cy="32" r="31.25" fill="none" stroke="#6ee7ff" strokeOpacity="0.35" strokeWidth="1.5" />
        </>
      ) : (
        <>
          <rect x="2" y="2" width="60" height="60" rx="16" fill={`url(#${sea})`} />
          <rect x="2.75" y="2.75" width="58.5" height="58.5" rx="15.25" fill="none" stroke="#6ee7ff" strokeOpacity="0.35" strokeWidth="1.5" />
        </>
      )}

      {/* Mast and bridge deck */}
      <rect x="29" y="14" width="6" height="8" rx="1.5" fill="#6ee7ff" />
      <path d="M23 22h18l4 7H19z" fill="#d6f0ff" />
      <path d="M25.5 25.5h2.5M30.75 25.5h2.5M36 25.5h2.5" stroke="#0e4c92" strokeWidth="1.8" strokeLinecap="round" />

      {/* Geometric hull */}
      <path d="M11 30h42l-6.5 9.5h-29z" fill={`url(#${hull})`} />
      <path d="M14.5 34h35" stroke="#0e4c92" strokeOpacity="0.55" strokeWidth="1.4" strokeLinecap="round" />

      {/* Waves */}
      <path
        d="M11 45.5c3.5 0 3.5-3 7-3s3.5 3 7 3 3.5-3 7-3 3.5 3 7 3 3.5-3 7-3 3.5 3 7 3"
        fill="none"
        stroke="#6ee7ff"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
      <path
        d="M14 52c3 0 3-2.5 6-2.5s3 2.5 6 2.5 3-2.5 6-2.5 3 2.5 6 2.5 3-2.5 6-2.5 3 2.5 6 2.5"
        fill="none"
        stroke="#38bdf8"
        strokeOpacity="0.6"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
};

/** Company emblems by key, referenced from `expCards[n].logo`. */
export const emblemMap = {
  asdp: AsdpEmblem,
};

/** Renders the emblem for `logo`, or nothing when the key is unknown. */
export const CompanyEmblem = ({ logo, ...props }) => {
  const Component = emblemMap[logo];
  return Component ? <Component {...props} /> : null;
};

/**
 * Official brand logo loaded from `public/images/`, shown on a light pill so
 * the brand colours stay legible on the dark theme.
 *
 * Each brand in `brandLogos` lists candidate files (e.g. png, then svg). When
 * one fails to load the next is tried; if none load, the drawn emblem (ASDP)
 * or a text wordmark is shown instead, so a missing file never leaves a
 * broken-image icon.
 *
 * `shape`: "badge" (rounded rectangle, sized by `className`) or "circle".
 */
export const BrandLogo = ({ brand, shape = "badge", className = "", decorative = false }) => {
  const entry = brandLogos[brand];
  const [index, setIndex] = useState(0);
  if (!entry) return null;

  const source = entry.sources[index];
  const label = decorative ? undefined : entry.name;
  const frame = `brand-logo ${shape === "circle" ? "is-circle" : ""} ${className}`;

  if (!source) {
    const Emblem = emblemMap[entry.emblem];
    if (Emblem) {
      return (
        <Emblem
          shape={shape === "circle" ? "circle" : "square"}
          className={`flex-none ${className}`}
          title={label}
        />
      );
    }
    return (
      <span className={`${frame} brand-logo-text`} role={label ? "img" : undefined} aria-label={label} aria-hidden={label ? undefined : true}>
        {entry.wordmark}
      </span>
    );
  }

  return (
    <span className={frame}>
      <img
        src={source}
        alt={label ?? ""}
        width={entry.width}
        height={entry.height}
        decoding="async"
        draggable="false"
        onError={() => setIndex((value) => value + 1)}
      />
    </span>
  );
};
