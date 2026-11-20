import { GitHubIcon } from "./Icons.jsx";
import { useLanguage, useLocalized } from "../context/LanguageContext.jsx";
import { githubUser, links, ui } from "../constants/index.js";
import { format, formatDate } from "../utils/i18n.js";
import { useGitHubStats } from "../utils/useGitHubStats.js";


/** Compact strip of public GitHub numbers: repositories, stars, top languages and last push. */
const GitHubStats = ({ className = "" }) => {
  const stats = useGitHubStats();
  const { lang } = useLanguage();
  const { github: text } = useLocalized(ui);
  const live = stats.source === "live";

  return (
    <section className={`gh-stats ${className}`} aria-label={text.label}>
      <a href={links.githubProfile} target="_blank" rel="noopener noreferrer" className="gh-stats-profile">
        <GitHubIcon className="size-5 flex-none" />
        <span className="min-w-0">
          <span className="block truncate font-medium text-white-50">github.com/{githubUser}</span>
          <span className="flex items-center gap-1.5 font-mono text-[11px] text-blue-50">
            <span className={`gh-stats-dot ${live ? "is-live" : ""}`} aria-hidden="true" />
            {live ? text.live : format(text.snapshot, { date: formatDate(stats.asOf, lang) })}
          </span>
        </span>
      </a>

      <dl className="gh-stats-figures">
        <div>
          <dt>{text.repos}</dt>
          <dd>{stats.publicRepos}</dd>
        </div>
        <div>
          <dt>{text.stars}</dt>
          <dd>{stats.stars}</dd>
        </div>
        <div>
          <dt>{text.lastPush}</dt>
          <dd>{formatDate(stats.lastPush, lang)}</dd>
        </div>
        <div className="gh-stats-languages">
          <dt>{text.languages}</dt>
          <dd>
            <ul className="flex flex-wrap gap-1.5">
              {stats.languages.map((language) => (
                <li
                  key={language.name}
                  className="tag-pill"
                  title={format(text.languageCount, { n: language.count })}
                >
                  {language.name} <span className="text-white-50/50">· {language.count}</span>
                </li>
              ))}
            </ul>
          </dd>
        </div>
      </dl>
    </section>
  );
};

export default GitHubStats;
