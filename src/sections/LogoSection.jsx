import { logoItems } from "../constants/index.js";

/** Short monogram shown in the coloured glyph tile of each marquee item. */
const monogram = (name) =>
  name
    .replace(/[^A-Za-z0-9+ ]/g, "")
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase() || name.slice(0, 2);

const LogoSection = () => {
  // Duplicated so translating the track by -50% loops seamlessly.
  const track = [...logoItems, ...logoItems];

  return (
    <section className="relative my-16 md:my-24" aria-label="Core technologies">
      <div className="marquee">
        <div className="marquee-track">
          {track.map((item, index) => (
            <div key={`${item.name}-${index}`} className="marquee-item" aria-hidden={index >= logoItems.length}>
              <span className="marquee-glyph" style={{ backgroundColor: item.color }}>
                {item.name === "C++" ? "C++" : monogram(item.name)}
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
