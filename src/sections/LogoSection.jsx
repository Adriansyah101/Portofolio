import { logoItems, ui } from "../constants/index.js";
import { useLocalized } from "../context/LanguageContext.jsx";

/** Short monogram shown in the glyph tile of each marquee item. */
const monogram = (name) =>
  name
    .replace(/[^A-Za-z0-9+ ]/g, "")
    .split(/\s+/)
    .filter(Boolean)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase() || name.slice(0, 2);

const LogoSection = () => {
  const items = useLocalized(logoItems);
  const { logos } = useLocalized(ui);
  // Duplicated so translating the track by -50% loops seamlessly.
  const track = [...items, ...items];

  return (
    <section className="relative my-16 md:my-24" aria-label={logos.label}>
      <div className="marquee">
        <div className="marquee-track">
          {track.map((item, index) => (
            <div key={`${item.id}-${index}`} className="marquee-item" aria-hidden={index >= items.length}>
              <span className="marquee-glyph" aria-hidden="true">
                {item.glyph ?? monogram(item.name)}
              </span>
              {item.name}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LogoSection;
