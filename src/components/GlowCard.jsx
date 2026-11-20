import { useRef } from "react";
import { StarIcon } from "./Icons.jsx";
import { renderInlineCode } from "../utils/text.jsx";

/**
 * Dark card whose border lights up with a conic gradient that points at the
 * cursor. The angle between the card centre and the pointer is computed with
 * Math.atan2 and written to the `--start` CSS variable consumed by `.glow`.
 */
const GlowCard = ({ card, header, children, rating = 5, className = "" }) => {
  const cardRef = useRef(null);

  const handleMouseMove = (event) => {
    const element = cardRef.current;
    if (!element) return;

    const rect = element.getBoundingClientRect();
    const x = event.clientX - rect.left - rect.width / 2;
    const y = event.clientY - rect.top - rect.height / 2;

    // atan2 measures from the +X axis; conic gradients start at 12 o'clock,
    // so shift by 90deg to align the highlight with the pointer.
    let angle = Math.atan2(y, x) * (180 / Math.PI);
    angle = (angle + 360) % 360;
    element.style.setProperty("--start", String(angle + 90));
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className={`timeline-card mb-5 break-inside-avoid-column rounded-xl p-6 md:p-8 ${className}`}
    >
      <div className="glow" />

      {header}

      {rating > 0 && (
        <div className="mb-5 flex items-center gap-1 text-amber-300" aria-label={`${rating} out of 5 stars`}>
          {Array.from({ length: 5 }, (_, index) => (
            <StarIcon key={index} className={`size-5 ${index < rating ? "" : "opacity-20"}`} />
          ))}
        </div>
      )}

      {card?.review && (
        <div className="mb-5">
          <p className="text-lg leading-relaxed text-white-50">{renderInlineCode(card.review)}</p>
        </div>
      )}

      {children}
    </div>
  );
};

export default GlowCard;
