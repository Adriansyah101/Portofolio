import TitleHeader from "../components/TitleHeader.jsx";
import GlowCard from "../components/GlowCard.jsx";
import { ExternalIcon, Icon } from "../components/Icons.jsx";
import { highlights } from "../constants/index.js";
import { renderInlineCode, softBreak } from "../utils/text.jsx";

const ICON_GRADIENTS = ["from-sky-400 to-blue-600", "from-emerald-400 to-cyan-500", "from-cyan-300 to-sky-500"];

/** Operational impact cards on `/journey`, using the cursor-tracking GlowCard. */
const Highlights = () => (
  <section id="highlights" className="section-padding flex-center w-full">
    <div className="h-full w-full max-w-[1600px] md:px-10">
      <TitleHeader title="Operational Impact Highlights" sub="Production Outcomes" />

      <div className="impact-grid">
        {highlights.map((item, index) => (
          <GlowCard key={item.title} rating={0} className="mb-0! flex h-full flex-col">
            <div className="flex items-center gap-3">
              <div
                className={`flex-center size-11 flex-none rounded-full bg-linear-to-br text-black-100 ${
                  ICON_GRADIENTS[index % ICON_GRADIENTS.length]
                }`}
                aria-hidden="true"
              >
                <Icon name={item.icon} className="size-5" />
              </div>
              <p className="min-w-0 font-mono text-xs tracking-widest text-blue-50 uppercase">{item.release}</p>
            </div>
            <h3 className="mt-5 text-xl leading-snug font-semibold text-white-50 md:text-2xl">{item.title}</h3>

            <p className="mt-3 leading-relaxed text-white-50/80">{renderInlineCode(item.summary)}</p>

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
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-white-50 transition-colors hover:text-cyan-300"
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

export default Highlights;
