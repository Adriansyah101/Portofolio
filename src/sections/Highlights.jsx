import TitleHeader from "../components/TitleHeader.jsx";
import GlowCard from "../components/GlowCard.jsx";
import { ExternalIcon, Icon } from "../components/Icons.jsx";
import { BrandLogo } from "../components/CompanyEmblems.jsx";
import { highlights as highlightSource, ui } from "../constants/index.js";
import { useLocalized } from "../context/LanguageContext.jsx";
import { renderInlineCode, softBreak } from "../utils/text.jsx";

/** Operational impact cards on `/journey`, using the cursor-tracking GlowCard. */
const Highlights = () => {
  const highlights = useLocalized(highlightSource);
  const { highlights: text } = useLocalized(ui);
  return (
    <section id="highlights" className="section-padding flex-center w-full">
      <div className="h-full w-full max-w-[1600px] md:px-10">
        <TitleHeader title={text.title} sub={text.sub} />

        <div className="impact-grid">
          {highlights.map((item) => (
            <GlowCard key={item.id} rating={0} className="mb-0! flex h-full flex-col">
              <div className="flex items-center gap-3">
                {item.brand ? (
                  <BrandLogo brand={item.brand} className="h-11 w-24" />
                ) : (
                  <span className="icon-chip" aria-hidden="true">
                    <Icon name={item.icon} className="size-5" />
                  </span>
                )}
                <p className="min-w-0 font-mono text-xs tracking-widest text-blue-50 uppercase">{item.release}</p>
              </div>
              <h3 className="mt-5 text-xl leading-snug font-semibold text-white-50 md:text-2xl">{item.title}</h3>

              <p className="mt-3 leading-relaxed text-body">{renderInlineCode(item.summary)}</p>

              <div className="mt-5 mb-6 flex flex-wrap gap-2">
                {item.tags.map((tag) => (
                  <span key={tag} className="tag-pill">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="mt-auto flex flex-wrap items-center justify-between gap-3 border-t border-black-200 pt-4">
                <p className="min-w-0 text-sm text-blue-50 wrap-break-word">{softBreak(item.project)}</p>
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
          ))}
        </div>
      </div>
    </section>
  );
};

export default Highlights;
