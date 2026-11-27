import { useState } from "react";

import { ExternalIcon, Icon } from "../components/Icons.jsx";
import { BrandLogo } from "../components/CompanyEmblems.jsx";
import Lightbox from "../components/Lightbox.jsx";
import TiltCard from "../components/TiltCard.jsx";
import { expCards as cardSource, fieldDocs, stackDomains, ui } from "../constants/index.js";
import { useLocalized } from "../context/LanguageContext.jsx";
import { assetUrl } from "../utils/assets.js";
import { format } from "../utils/i18n.js";
import { renderInlineCode, softBreak } from "../utils/text.jsx";

/**
 * Panels of `/journey`: the executive summary of the role (left) and the two
 * tab panels beside it: the operational breakdown with its field photos, and
 * the enterprise stack as four tilt cards. The tab panels lay out by their own
 * width (container queries), so they adapt to the split instead of the
 * viewport.
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
 * 1 × 4 strip, each opening the lightbox. The caption under a thumbnail is cut
 * to one line; the lightbox shows it in full. Third-party faces in the files
 * are blurred.
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
            <p className="mt-1.5 truncate text-xs text-blue-50" title={photo.caption}>
              {photo.caption}
            </p>
          </li>
        ))}
      </ul>
      <Lightbox items={photos} index={open} onChange={setOpen} onClose={() => setOpen(null)} labels={text} />
    </section>
  );
};

/** What the role covered, one compact card per area (three in a row on wide panels), then the field photos. */
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
          <div className="flex items-start gap-2.5">
            <span className="icon-chip is-sm" aria-hidden="true">
              <Icon name={item.icon} className="size-4" />
            </span>
            <h3 className="min-w-0 flex-1 self-center leading-snug font-semibold text-white-50 lg:text-[0.9375rem]">{item.title}</h3>
            <span className="font-mono text-[11px] text-blue-50" aria-hidden="true">
              {String(index + 1).padStart(2, "0")}
            </span>
          </div>
          <p className="mt-2 text-sm leading-relaxed text-body lg:text-[0.8125rem] lg:leading-snug">{renderInlineCode(item.body)}</p>
          <ul className="breakdown-tags">
            {item.tags.map((tag) => (
              <li key={tag} className="tag-pill is-sm">
                {tag}
              </li>
            ))}
          </ul>
          {item.link?.href && (
            <a
              href={item.link.href}
              target="_blank"
              rel="noreferrer"
              className="mt-auto inline-flex items-center gap-1.5 pt-2.5 text-sm font-medium text-white-50 transition-colors hover:text-white"
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

/**
 * The four production domains of the role as tilt cards: one column on narrow
 * panels, 2 × 2 from 32rem of panel width. Each card takes keyboard focus so
 * the lift is reachable without a pointer.
 */
export const EnterpriseStack = () => {
  const domains = useLocalized(stackDomains);
  const { journey: text } = useLocalized(ui);

  return (
    <div>
      <p className="text-sm leading-relaxed text-body">{text.stackIntro}</p>
      <ul className="stack-grid">
        {domains.map((domain, index) => (
          <li key={domain.id} className="min-w-0">
            <TiltCard tabIndex={0} aria-labelledby={`stack-${domain.id}`}>
              <div className="tilt-card-layer flex items-center gap-3">
                <span className="icon-chip is-md" aria-hidden="true">
                  <Icon name={domain.icon} className="size-[1.125rem]" />
                </span>
                <h3 id={`stack-${domain.id}`} className="min-w-0 flex-1 leading-snug font-semibold text-white-50 2xl:text-lg">
                  {domain.title}
                </h3>
                <span className="self-start font-mono text-[11px] text-blue-50" aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>
              <p className="mt-2.5 text-sm leading-relaxed text-body lg:leading-snug">{domain.body}</p>
              <ul className="stack-tags">
                {domain.tags.map((tag) => (
                  <li key={tag} className="tag-pill is-sm">
                    {tag}
                  </li>
                ))}
              </ul>
            </TiltCard>
          </li>
        ))}
      </ul>
    </div>
  );
};
