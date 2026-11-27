import { useState } from "react";

import TechIcon from "../components/Models/TechLogos/TechIcon.jsx";
import { ExternalIcon, Icon } from "../components/Icons.jsx";
import { BrandLogo } from "../components/CompanyEmblems.jsx";
import Lightbox from "../components/Lightbox.jsx";
import { expCards as cardSource, fieldDocs, techStackIcons, ui } from "../constants/index.js";
import { useLocalized } from "../context/LanguageContext.jsx";
import { useTheme } from "../context/ThemeContext.jsx";
import { assetUrl } from "../utils/assets.js";
import { format } from "../utils/i18n.js";
import { renderInlineCode, softBreak } from "../utils/text.jsx";

/**
 * Panels of `/journey`: the executive summary of the role (left) and the
 * three tab panels beside it: the structured operational breakdown, the
 * enterprise stack as a list, and the same stack as draggable 3D emblems. The
 * tab panels lay out by their own width (container queries), so they adapt to
 * the split instead of the viewport.
 */

/** PT ASDP role: logo, title, period, one-paragraph summary, systems covered and the production site. */
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
          <p className="mt-4 leading-relaxed text-body lg:mt-3 lg:text-sm 2xl:text-[0.9375rem]">{renderInlineCode(card.summary)}</p>

          {card.platforms?.length > 0 && (
            <div className="mt-6 lg:mt-5">
              <p className="font-mono text-xs tracking-widest text-blue-50 uppercase">{card.platformsLabel}</p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {card.platforms.map((platform) => (
                  <li key={platform} className="tag-pill">
                    {platform}
                  </li>
                ))}
              </ul>
            </div>
          )}

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

/**
 * Field Documentation: four photos from the harbors in a 2 × 2 (phones) or
 * 1 × 4 strip, each opening the lightbox. Third-party faces in the files are
 * blurred.
 */
const FieldDocumentation = () => {
  const photos = useLocalized(fieldDocs);
  const { journey } = useLocalized(ui);
  const text = journey.fieldDocs;
  const [open, setOpen] = useState(null);

  return (
    <section className="field-docs" aria-labelledby="field-docs-title">
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <h3 id="field-docs-title" className="font-mono text-xs tracking-widest text-blue-50 uppercase">
          {text.title}
        </h3>
        <p className="text-xs text-blue-50">{text.note}</p>
      </div>
      <ul className="mt-3 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
        {photos.map((photo, index) => (
          <li key={photo.id} className="min-w-0">
            <button
              type="button"
              className="field-thumb group"
              onClick={() => setOpen(index)}
              aria-label={format(text.open, { caption: photo.caption })}
            >
              <img
                src={assetUrl(photo.src)}
                width={photo.width}
                height={photo.height}
                alt=""
                loading="lazy"
                decoding="async"
                style={photo.position ? { objectPosition: photo.position } : undefined}
              />
            </button>
            <p className="mt-1.5 font-mono text-[10px] leading-snug tracking-wider text-blue-50 uppercase">
              {photo.place}
            </p>
          </li>
        ))}
      </ul>
      <Lightbox items={photos} index={open} onChange={setOpen} onClose={() => setOpen(null)} labels={text} />
    </section>
  );
};

/** What the role covered, one flat card per area (one, two or three per row by panel width), then the field photos. */
export const OperationalBreakdown = () => (
  <>
    <BreakdownCards />
    <FieldDocumentation />
  </>
);

const BreakdownCards = () => {
  const cards = useLocalized(cardSource);
  const items = cards.flatMap((card) => card.breakdown ?? []);

  return (
    <ol className="breakdown-grid">
      {items.map((item, index) => (
        <li key={item.id} className="breakdown-card">
          <div className="flex items-center justify-between gap-3">
            <span className="icon-chip" aria-hidden="true">
              <Icon name={item.icon} className="size-5" />
            </span>
            <span className="font-mono text-xs text-blue-50" aria-hidden="true">
              {String(index + 1).padStart(2, "0")}
            </span>
          </div>
          <h3 className="mt-4 text-lg leading-snug font-semibold text-white-50">{item.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-body">{renderInlineCode(item.body)}</p>
          <ul className="mt-4 flex flex-wrap gap-1.5 lg:mt-3">
            {item.tags.map((tag) => (
              <li key={tag} className="tag-pill">
                {tag}
              </li>
            ))}
          </ul>
          {item.link?.href && (
            <a
              href={item.link.href}
              target="_blank"
              rel="noreferrer"
              className="mt-auto inline-flex items-center gap-1.5 pt-4 text-sm font-medium text-white-50 transition-colors hover:text-white"
            >
              {item.link.label}
              <ExternalIcon className="size-4" />
            </a>
          )}
        </li>
      ))}
    </ol>
  );
};

/** The stack as a scannable list. */
export const EnterpriseStack = () => {
  const icons = useLocalized(techStackIcons);
  const { journey: text } = useLocalized(ui);

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
    </div>
  );
};

/** The same stack as draggable 3D emblems (each card is its own small canvas). */
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
          <li key={model.emblem} className="tech-card">
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
