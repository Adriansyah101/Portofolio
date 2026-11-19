/**
 * Resolves a path inside `/public` against Vite's configured base URL so the
 * asset loads correctly on GitHub Pages sub-paths. Returns `null` for empty
 * input, which components treat as "use the built-in fallback".
 */
export const assetUrl = (path) => {
  if (!path) return null;
  if (/^(https?:)?\/\//.test(path) || path.startsWith("data:")) return path;
  return `${import.meta.env.BASE_URL}${path.replace(/^\/+/, "")}`;
};
