import GlowCard from "../components/GlowCard.jsx";
import TechIcon from "../components/Models/TechLogos/TechIcon.jsx";
import { ExternalIcon, Icon } from "../components/Icons.jsx";
import { BrandLogo } from "../components/CompanyEmblems.jsx";
import { expCards as cardSource, highlights as highlightSource, techStackIcons, ui } from "../constants/index.js";
import { useLocalized } from "../context/LanguageContext.jsx";
import { useTheme } from "../context/ThemeContext.jsx";
import { renderInlineCode, softBreak } from "../utils/text.jsx";

/**
 * Panels of `/journey`: the experience card (left) and the three tab panels
 * beside it: operational impact, the enterprise stack as a list, and the same
 * stack as draggable 3D emblems. The tab panels lay out by their own width
 * (container queries), so they adapt to the split instead of the viewport.
 */

/** PT ASDP experience: logo, role, period, key achievements and the production system it ran. */
export const ExperiencePanel = () => {
  const cards = useLocalized(cardSource);
  const { experience: text } = useLocalized(ui);

  return (
    <section id="experience" className="panel scroll-pane p-5 md:p-7 lg:p-6 xl:p-7" aria-label={text.title}>
      {cards.map((card) => (
        <article key={card.id} className="exp-entry">
          <div className="exp-card-head">
            {card.logo ? (
              <BrandLogo brand={card.logo} className="h-12 w-[4.5rem] flex-none" decorative />
            ) : (
              <span className="exp-card-icon" aria-hidden="true">
                <Icon name={card.icon} className="size-6" />
              </span>
            )}
            <div className="min-w-0 flex-1">
              <p className={`exp-kind ${card.logo ? "is-pro" : ""}`}>{card.kind}</p>
              <p className="mt-1 text-sm font-medium wrap-break-word text-white-50">{softBreak(card.project)}</p>
            </div>
            <p className="exp-period">{card.period}</p>
          </div>

          <h2 className="text-xl leading-snug font-semibold text-balance md:text-2xl lg:text-xl xl:text-2xl">{card.title}</h2>

          <p className="mt-5 text-sm text-blue-50 italic lg:mt-4">{card.logo ? text.responsibilities : text.highlights}</p>
          <ul className="mt-3 ms-5 flex list-disc flex-col gap-3 text-body marker:text-blue-50/60 lg:gap-2.5">
            {card.responsibilities.map((item) => (
              <li key={item} className="leading-relaxed lg:text-sm 2xl:text-[0.9375rem]">
                {renderInlineCode(item)}
              </li>
            ))}
          </ul>

          {card.systems?.length > 0 && (
            <div className="mt-6 lg:mt-5">
              <p className="font-mono text-xs tracking-widest text-blue-50 uppercase">{text.productionSystems}</p>
              <ul className="mt-3 flex flex-wrap gap-3">
                {card.systems.map((system) => (
                  <li key={system.href}>
                    <a href={system.href} target="_blank" rel="noreferrer" className="system-link">
                      <BrandLogo brand={system.brand} className="h-9 w-[5.25rem]" decorative />
                      <span className="min-w-0">
                        <span className="flex items-center gap-1.5 font-medium text-white-50">
                          {system.label}
                          <ExternalIcon className="size-3.5 text-blue-50" />
                        </span>
                        <span className="block text-sm text-blue-50">{system.note}</span>
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </article>
      ))}
    </section>
  );
};

/** Production outcomes as cursor-lit GlowCards: one, two or three per row by panel width. */
export const ImpactGrid = () => {
  const highlights = useLocalized(highlightSource);
  return (
    <ul className="impact-grid">
      {highlights.map((item) => (
        <li key={item.id} className="min-w-0">
          <GlowCard rating={0} className="mb-0! flex h-full flex-col p-5!">
            <div className="flex items-center gap-3">
              {item.brand ? (
                <BrandLogo brand={item.brand} className="h-10 w-[5.5rem]" />
              ) : (
                <span className="icon-chip" aria-hidden="true">
                  <Icon name={item.icon} className="size-5" />
                </span>
              )}
              <p className="min-w-0 font-mono text-[11px] tracking-widest text-blue-50 uppercase">{item.release}</p>
            </div>
            <h3 className="mt-4 text-lg leading-snug font-semibold text-white-50">{item.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-body">{renderInlineCode(item.summary)}</p>

            <div className="mt-4 mb-4 flex flex-wrap gap-1.5 lg:mt-3 lg:mb-3">
              {item.tags.map((tag) => (
                <span key={tag} className="tag-pill">
                  {tag}
                </span>
              ))}
            </div>

            {/* On desktop the company sits in the panel beside, so the footer keeps only a link. */}
            <div className={`mt-auto flex flex-wrap items-center justify-between gap-2 border-t border-black-200 pt-3 ${item.link?.href ? "" : "lg:hidden"}`}>
              <p className="min-w-0 text-xs text-blue-50 wrap-break-word lg:hidden">{softBreak(item.project)}</p>
              {item.link?.href && (
                <a
                  href={item.link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-white-50 transition-colors hover:text-white"
                >
                  {item.link.label}
                  <ExternalIcon className="size-4" />
                </a>
              )}
            </div>
          </GlowCard>
        </li>
      ))}
    </ul>
  );
};

/** The stack as a scannable list, plus the systems the role covered. */
export const EnterpriseStack = () => {
  const icons = useLocalized(techStackIcons);
  const cards = useLocalized(cardSource);
  const { journey: text } = useLocalized(ui);
  const platforms = [...new Set(cards.flatMap((card) => card.platforms))];
  const platformsLabel = cards[0]?.platformsLabel;

  return (
    <div>
      <p className="text-sm leading-relaxed text-body">{text.stackIntro}</p>
      <ul className="mt-4 grid grid-cols-1 gap-3 @lg:grid-cols-2">
        {icons.map((item) => (
          <li key={item.emblem} className="stack-item">
            <span className="icon-chip" aria-hidden="true">
              <Icon name={item.icon} className="size-5" />
            </span>
            <span className="min-w-0">
              <span className="block font-semibold text-white-50">{item.name}</span>
              <span className="block text-sm text-blue-50">{item.subtitle}</span>
            </span>
          </li>
        ))}
      </ul>
      {platformsLabel && (
        <>
          <p className="mt-6 font-mono text-xs tracking-widest text-blue-50 uppercase">{platformsLabel}</p>
          <ul className="mt-3 flex flex-wrap gap-2">
            {platforms.map((platform) => (
              <li key={platform} className="tag-pill">
                {platform}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

/** The same stack as floating, draggable 3D emblems (each card is its own small canvas). */
export const TechCards = () => {
  const icons = useLocalized(techStackIcons);
  const { journey: text } = useLocalized(ui);
  const { theme } = useTheme();

  return (
    <div>
      <p className="hidden text-sm text-blue-50 md:block">{text.tech3dHint}</p>
      <ul className="tech-grid">
        {icons.map((model) => (
          // Keyed by emblem so switching language never remounts the WebGL canvas.
          <li key={model.emblem} className="tech-card group">
            <div className="tech-card-animated-bg" />
            <div className="tech-card-content">
              <div className="tech-icon-wrapper">
                <TechIcon model={model} theme={theme} />
              </div>
              <h3 className="font-semibold text-white-50 lg:text-[0.9375rem] xl:text-base">{model.name}</h3>
              <p className="mt-0.5 text-xs text-blue-50 xl:text-sm">{model.subtitle}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
