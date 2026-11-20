import PageHeader from "../components/PageHeader.jsx";
import Contact from "../sections/Contact.jsx";
import { Icon, ExternalIcon } from "../components/Icons.jsx";
import { communityLinks, ui } from "../constants/index.js";
import { useLocalized } from "../context/LanguageContext.jsx";
import { usePageTitle } from "../utils/hooks.js";

/** `/contact`: Gmail contact card and direct GitHub links beside the warm 3D desk scene. */
const ContactPage = () => {
  const { contact: text } = useLocalized(ui);
  const community = useLocalized(communityLinks);
  usePageTitle(text.pageTitle);

  return (
    <div className="page-shell page-enter">
      <div className="hero-bg" aria-hidden="true" />
      <div className="page-frame">
        <Contact intro={<PageHeader eyebrow={text.eyebrow} title={text.title} description={text.description} />}>
          <section aria-labelledby="community-title">
            <h2 id="community-title" className="text-2xl font-semibold md:text-3xl lg:text-base lg:font-medium lg:text-blue-50">
              {text.communityTitle}
            </h2>
            <ul className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 lg:mt-2.5 lg:flex lg:flex-wrap lg:gap-2">
              {community.map((item) => (
                <li key={item.id} className="min-w-0">
                  <a href={item.url} target="_blank" rel="noopener noreferrer" className="community-card group">
                    <span className="community-icon">
                      <Icon name={item.icon} className="size-5 lg:size-4" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate font-semibold text-white-50 lg:text-sm">{item.name}</span>
                      <span className="block truncate font-mono text-xs text-blue-50 lg:hidden">{item.handle}</span>
                    </span>
                    <ExternalIcon className="size-4 flex-none text-blue-50 transition-colors group-hover:text-accent-cyan lg:size-3.5" />
                  </a>
                </li>
              ))}
            </ul>
          </section>
        </Contact>
      </div>
    </div>
  );
};

export default ContactPage;
