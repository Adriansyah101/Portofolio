import PageHeader from "../components/PageHeader.jsx";
import Contact from "../sections/Contact.jsx";
import { Icon, ExternalIcon } from "../components/Icons.jsx";
import { communityLinks, ui } from "../constants/index.js";
import { useLocalized } from "../context/LanguageContext.jsx";
import { usePageTitle } from "../utils/hooks.js";

/** `/contact`: Gmail contact card, the warm 3D desk scene and direct GitHub links. */
const ContactPage = () => {
  const { contact: text } = useLocalized(ui);
  const community = useLocalized(communityLinks);
  usePageTitle(text.pageTitle);

  return (
    <div className="page-enter">
      <PageHeader
        eyebrow={text.eyebrow}
        title={text.title}
        description={text.description}
      />

      <Contact compact />

      <section className="padding-x-lg mt-16 md:mt-24" aria-labelledby="community-title">
        <div className="mx-auto w-full max-w-[1600px]">
          <h2 id="community-title" className="text-2xl font-semibold md:text-3xl">
            {text.communityTitle}
          </h2>
          <ul className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
            {community.map((item) => (
              <li key={item.id}>
                <a href={item.url} target="_blank" rel="noopener noreferrer" className="community-card group">
                  <span className="flex-center size-11 flex-none rounded-full bg-black-50 text-accent-cyan">
                    <Icon name={item.icon} className="size-5" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-semibold text-white-50">{item.name}</span>
                    <span className="block truncate font-mono text-xs text-blue-50">{item.handle}</span>
                  </span>
                  <ExternalIcon className="size-4 flex-none text-blue-50 transition-colors group-hover:text-accent-cyan" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
