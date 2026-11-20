/**
 * Tiny bilingual content helpers (English `en` + Bahasa Indonesia `id`).
 *
 * Content in `src/constants/index.js` stays a single tree: every translatable
 * string is written as `tx("English", "Bahasa Indonesia")`, right next to the
 * data that never changes (links, icons, ids). `localize(tree, lang)` returns
 * a plain copy of that tree with each `tx()` value replaced by the active
 * language, so components keep reading ordinary strings.
 */

export const LANGUAGES = ["en", "id"];
export const DEFAULT_LANGUAGE = "en";

const BILINGUAL = Symbol("bilingual");

/** A translatable value. `id` falls back to `en` when omitted. */
export const tx = (en, id = en) => ({ [BILINGUAL]: true, en, id });

export const isLanguage = (value) => LANGUAGES.includes(value);

// Results are cached per source object so repeated renders reuse one copy.
const caches = Object.fromEntries(LANGUAGES.map((lang) => [lang, new WeakMap()]));

/** Deep-resolves every `tx()` value inside `value` for `lang`. */
export const localize = (value, lang) => {
  if (value === null || typeof value !== "object") return value;
  if (value[BILINGUAL]) return value[lang] ?? value.en;

  const cache = caches[lang];
  if (cache?.has(value)) return cache.get(value);

  const result = Array.isArray(value)
    ? value.map((item) => localize(item, lang))
    : Object.fromEntries(Object.entries(value).map(([key, item]) => [key, localize(item, lang)]));

  cache?.set(value, result);
  return result;
};

/** Fills `{name}` placeholders, e.g. `format("Showing {n}", { n: 3 })`. */
export const format = (template, values) =>
  template.replace(/\{(\w+)\}/g, (match, key) => (key in values ? String(values[key]) : match));

/** Localised calendar date for an ISO `YYYY-MM-DD` string (for example "20 Nov 2026"). */
export const formatDate = (iso, lang, options = { day: "numeric", month: "short", year: "numeric" }) => {
  if (!iso) return "—";
  try {
    return new Intl.DateTimeFormat(lang === "id" ? "id-ID" : "en-GB", options).format(new Date(`${iso}T00:00:00`));
  } catch {
    return iso;
  }
};
