import { useEffect, useState } from "react";
import { githubSnapshot, githubUser } from "../constants/index.js";

const CACHE_KEY = `gh-stats:v1:${githubUser.toLowerCase()}`;
/** Unauthenticated GitHub API calls allow 60 requests per hour per IP, so one fetch per tab per half hour is plenty. */
const CACHE_TTL_MS = 30 * 60 * 1000;
const API_URL = `https://api.github.com/users/${githubUser}/repos?per_page=100&type=owner&sort=pushed`;

const fallback = { ...githubSnapshot, source: "snapshot" };

/** Public, non-fork repositories → counts, stars, the four most used primary languages and the latest push. */
export const summarizeRepos = (repos) => {
  const own = repos.filter((repo) => !repo.fork && !repo.private);
  const counts = new Map();
  for (const repo of own) {
    if (repo.language) counts.set(repo.language, (counts.get(repo.language) ?? 0) + 1);
  }
  const languages = [...counts]
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name))
    .slice(0, 4);
  const lastPush = own.reduce((latest, repo) => (repo.pushed_at > latest ? repo.pushed_at : latest), "");

  return {
    publicRepos: own.length,
    stars: own.reduce((sum, repo) => sum + (repo.stargazers_count ?? 0), 0),
    languages,
    lastPush: lastPush.slice(0, 10) || null,
    asOf: new Date().toISOString().slice(0, 10),
  };
};

const readCache = () => {
  try {
    const cached = JSON.parse(window.sessionStorage.getItem(CACHE_KEY));
    if (cached?.savedAt && Date.now() - cached.savedAt < CACHE_TTL_MS) return cached.stats;
  } catch {
    // Blocked or corrupt storage: fetch again.
  }
  return null;
};

const writeCache = (stats) => {
  try {
    window.sessionStorage.setItem(CACHE_KEY, JSON.stringify({ savedAt: Date.now(), stats }));
  } catch {
    // Storage unavailable: the numbers still show for this page view.
  }
};

/**
 * Public repository stats for `githubUser`, fetched from the GitHub REST API
 * at most once per tab every 30 minutes (cached in sessionStorage). Starts
 * with, and falls back to, `githubSnapshot` from constants when the API is
 * rate limited, offline or blocked. `source` is "live" or "snapshot".
 */
export const useGitHubStats = () => {
  const [stats, setStats] = useState(() => {
    const cached = readCache();
    return cached ? { ...cached, source: "live" } : fallback;
  });

  useEffect(() => {
    if (readCache()) return undefined;
    const controller = new AbortController();

    fetch(API_URL, { signal: controller.signal, headers: { Accept: "application/vnd.github+json" } })
      .then((response) => (response.ok ? response.json() : Promise.reject(new Error(`GitHub API ${response.status}`))))
      .then((repos) => {
        if (!Array.isArray(repos) || repos.length === 0) throw new Error("Unexpected GitHub API response");
        const summary = summarizeRepos(repos);
        writeCache(summary);
        setStats({ ...summary, source: "live" });
      })
      .catch(() => {
        // Keep the snapshot; nothing to surface to visitors.
      });

    return () => controller.abort();
  }, []);

  return stats;
};
