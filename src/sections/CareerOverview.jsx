import { CompanyEmblem } from "../components/CompanyEmblems.jsx";
import { Icon } from "../components/Icons.jsx";
import { careerThesis, careerTracks } from "../constants/index.js";
import { renderInlineCode } from "../utils/text.jsx";

/** Side-by-side summary of the enterprise and open-source tracks on `/journey`. */
const CareerOverview = () => (
  <section id="overview" className="padding-x-lg mt-12 md:mt-16" aria-labelledby="overview-title">
    <div className="mx-auto w-full max-w-[1600px]">
      <h2 id="overview-title" className="sr-only">
        Career overview
      </h2>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {careerTracks.map((track) => (
          <article key={track.id} className={`track-card ${track.logo ? "is-pro" : "is-oss"}`}>
            <div className="flex items-center gap-4">
              {track.logo ? (
                <CompanyEmblem logo={track.logo} className="size-14 flex-none" />
              ) : (
                <span className="exp-card-icon size-14!" aria-hidden="true">
                  <Icon name={track.icon} className="size-7" />
                </span>
              )}
              <div className="min-w-0">
                <p className={`exp-kind ${track.logo ? "is-pro" : ""}`}>{track.kind}</p>
                <h3 className="mt-1 text-xl font-semibold wrap-break-word text-white-50 md:text-2xl">{track.org}</h3>
                <p className="mt-1 font-mono text-xs text-blue-50">{track.period}</p>
              </div>
            </div>
            <p className="text-lg leading-relaxed text-white-50/80">{track.summary}</p>
            <ul className="track-points">
              {track.points.map((point) => (
                <li key={point}>
                  <span>{renderInlineCode(point)}</span>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
      <p className="track-thesis">{careerThesis}</p>
    </div>
  </section>
);

export default CareerOverview;
