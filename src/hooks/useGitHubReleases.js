import { useEffect, useState } from "react";
import { releaseSources } from "../constants/index.js";

/**
 * Latest GitHub release of each repository in `releaseSources`, so version
 * badges and download links follow new releases without a code change.
 *
 * Each repository is fetched once per tab (`/repos/{owner}/{repo}/releases/latest`)
 * and kept in sessionStorage for 30 minutes: unauthenticated API calls are
 * limited to 60 an hour per IP, and every page that shows a badge reads the
 * same cache. When the API is unreachable or rate limited, the entry falls
 * back to the tag and releases page written in `releaseSources`.
 */

const CACHE_PREFIX = "gh-release:v1:";
const CACHE_TTL_MS = 30 * 60 * 1000;

const fallbackFor = (source) => ({
  tag: source.fallbackTag,
  url: source.fallbackUrl,
  publishedAt: null,
  assets: null,
  live: false,
});

const readCache = (repo) => {
  try {
    const cached = JSON.parse(window.sessionStorage.getItem(CACHE_PREFIX + repo));
    if (cached?.savedAt && Date.now() - cached.savedAt < CACHE_TTL_MS) return cached.release;
  } catch {
    // Blocked or corrupt storage: fetch again.
  }
  return null;
};

const writeCache = (repo, release) => {
  try {
    window.sessionStorage.setItem(CACHE_PREFIX + repo, JSON.stringify({ savedAt: Date.now(), release }));
  } catch {
    // Storage unavailable: the badge still shows for this page view.
  }
};

const fetchRelease = async (source) => {
  const response = await fetch(`https://api.github.com/repos/${source.repo}/releases/latest`, {
    headers: { Accept: "application/vnd.github+json" },
  });
  if (!response.ok) throw new Error(`GitHub API ${response.status}`);
  const data = await response.json();
  if (!data?.tag_name) throw new Error("No release tag");
  return {
    tag: data.tag_name,
    url: data.html_url || source.fallbackUrl,
    publishedAt: data.published_at?.slice(0, 10) ?? null,
    assets: Array.isArray(data.assets) ? data.assets.length : null,
    live: true,
  };
};

/** One request per repository per page load, shared by every component that asks. */
const pending = new Map();
const loadRelease = (id) => {
  const source = releaseSources[id];
  if (!pending.has(id)) {
    pending.set(
      id,
      fetchRelease(source)
        .then((release) => {
          writeCache(source.repo, release);
          return release;
        })
        .catch(() => fallbackFor(source)),
    );
  }
  return pending.get(id);
};

const initialState = () =>
  Object.fromEntries(
    Object.entries(releaseSources).map(([id, source]) => [id, readCache(source.repo) ?? fallbackFor(source)]),
  );

/** `{ [projectId]: { tag, url, publishedAt, assets, live } }` for every repository in `releaseSources`. */
export const useGitHubReleases = () => {
  const [releases, setReleases] = useState(initialState);

  useEffect(() => {
    let active = true;
    for (const [id, source] of Object.entries(releaseSources)) {
      if (readCache(source.repo)) continue;
      loadRelease(id).then((release) => {
        if (active) setReleases((current) => ({ ...current, [id]: release }));
      });
    }
    return () => {
      active = false;
    };
  }, []);

  return releases;
};

/** The release of one project, or `null` when it has no repository in `releaseSources`. */
export const useRelease = (projectId) => useGitHubReleases()[projectId] ?? null;

/** Fills `{tag}` in a string with the release tag (strings without it pass through). */
export const withTag = (text, release) =>
  typeof text === "string" && release ? text.replaceAll("{tag}", release.tag) : text;

/**
 * Links with `release: "<project id>"` point at that repository's latest
 * release and fill `{tag}` in their label; every other link passes through.
 */
export const useResolvedLinks = (items = []) => {
  const releases = useGitHubReleases();
  return items.map((link) => {
    const release = link.release && releases[link.release];
    return release ? { ...link, href: release.url, label: withTag(link.label, release) } : link;
  });
};
